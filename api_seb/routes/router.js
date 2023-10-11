const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const jwt = require('jsonwebtoken');

const db = require('../lib/db.js');
const userMiddleware = require('../middleware/users.js');
const database = require('../middleware/database_functions.js');

router.post('/sign-up', userMiddleware.validateRegister, (req, res, next) => {
    db.query(
        `SELECT * FROM users WHERE LOWER(email) = LOWER(${db.escape(
            req.body.email
        )});`,
        (err, result) => {
            if (result.length) {
                return res.status(409).send({
                    msg: 'Diese E-Mail wird bereits verwendet!'
                });
            } else {
                // E-Mail verfügbar
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).send({
                            msg: err
                        });
                    } else {
                        // Hat verschlüsseltes PW => Zur Datenbank hinzufügen
                        db.query(
                            `INSERT INTO users (name, email, password, registered) VALUES (${db.escape(
                                    req.body.name
                            )}, ${db.escape(
                                req.body.email
                            )}, ${db.escape(hash)}, now())`,
                            (err, result) => {
                                if (err) {
                                    return res.status(400).send({
                                        msg: err
                                    });
                                }
                                return res.status(201).send({
                                    msg: 'Registrierung erfolgreich!'
                                });
                            }
                        );
                    }
                });
            }
        }
    );
});

router.post('/login', (req, res, next) => {
    db.query(
        `SELECT * FROM users WHERE email = ${db.escape(req.body.email)};`,
        (err, result) => {
            // user does not exists
            if (err) {
                return res.status(400).send({
                    msg: err
                });
            }
            if (!result.length) {
                return res.status(401).send({
                    msg: 'Nutzername oder Passwort sind falsch!'
                });
            }
            // check password
            bcrypt.compare(
                req.body.password,
                result[0]['password'],
                (bErr, bResult) => {
                    // wrong password
                    if (bErr) {
                        return res.status(401).send({
                            msg: 'Nutzername oder Passwort sind falsch!'
                        });
                    }
                    if (bResult) {
                        const token = jwt.sign({
                                email: result[0].email,
                                userId: result[0].id
                            },
                            'SECRETKEY', {}
                        );
                        db.query(
                            `UPDATE users SET last_login = now() WHERE id = '${result[0].id}'`
                        );
                        return res.status(200).send({
                            msg: 'Login erfolgreich!',
                            token,
                            user: result[0]
                        });
                    }
                    return res.status(401).send({
                        msg: 'Nutzername oder Passwort sind falsch!'
                    });
                }
            );
        }
    );
});

router.post('/returnUser', (req, res, next) => {
    db.query(
        `SELECT * FROM users WHERE id = ${db.escape(req.body.id)};`,
        (err, result) => {
            // user does not exists
            if (err) {
                return res.status(400).send({
                    msg: err
                });
            } else {
                return res.status(200).send({
                    msg: result[0]
                });
            }
        }
    );
});

router.post('/updateUser', userMiddleware.isLoggedIn, (req, res, next) => {
    db.query(
        `UPDATE users SET name = ${db.escape(req.body.name)}, bio = ${db.escape(req.body.bio)}, image = ${db.escape(req.body.image)}, qualification = ${db.escape(req.body.qualification)} WHERE id = ${db.escape(req.body.id)};`,
        (err, result) => {
            // user does not exists
            if (err) {
                return res.status(400).send({
                    msg: err
                });
            } else {
                return res.status(200).send({
                    msg: "Success"
                });
            }
        }
    );
});

router.post('/guidelines', (req, res, next) => {
    if(req.body && req.body.category && req.body.category != "all" && req.body.category != ""){
        db.query(
            `SELECT * FROM guidelines WHERE category = ${db.escape(req.body.category)};`,
            (err, result) => {
                if (err) {

                    return res.status(400).send({
                        msg: err
                    });
                } else {
                    return res.status(200).send({
                        msg: result
                    });
                }
            }
        );
    } else {
        db.query(
            `SELECT * FROM guidelines;`,
            (err, result) => {
                if (err) {

                    return res.status(400).send({
                        msg: err
                    });
                } else {
                    for(let i = 0; i < result.length; i++){
                        db.query(`SELECT * FROM approvements INNER JOIN users ON approvements.expert_id = users.id WHERE approvements.guideline_id = ${db.escape(result[i].guideline_id)};`,
                            (err, result_approvements) => {
                                if(err){
                                    console.log(err)
                                }
                                if (!err){
                                    result[i].approvements = result_approvements

                                    //Prevent race conditions by returning in the callback of the query
                                    if(i == result.length - 1){
                                        return res.status(200).send({
                                            msg: result
                                        });
                                    }
                                }
                            })
                    }
                }
            }
        );
    }
});

router.post('/userGuidelines', userMiddleware.isLoggedIn, (req, res, next) => {
    db.query(
        `SELECT * FROM guidelines WHERE author_id = ${db.escape(req.body.author_id)};`,
        (err, result) => {
            if (err) {

                return res.status(400).send({
                    msg: err
                });
            } else {
                return res.status(200).send({
                    msg: result
                });
            }
        }
    );
});

router.post('/saveGuideline', userMiddleware.isLoggedIn, userMiddleware.validateExpertStatus, (req, res, next) => {
    if(req.body.guideline_id){
        userMiddleware.allowedToUpdateGuideline(req, res, () => {
            db.query(
                `UPDATE guidelines SET title = ${db.escape(req.body.title)}, text = ${db.escape(req.body.text)}, bibliography = ${db.escape(req.body.bibliography)}, last_update = ${db.escape(req.body.last_update)} WHERE guideline_id = ${db.escape(req.body.guideline_id)};`,
                (err, result) => {
                    if (err) {
                        return res.status(400).send({
                            msg: err
                        });
                    } else {
                        return res.status(200).send({
                            msg: "Success"
                        });
                    }
                }
            );
        })
    } else {
        db.query(
            `INSERT INTO guidelines (title, author_id, text, bibliography, last_update) VALUES (${db.escape(req.body.title)}, ${db.escape(req.body.author_id)}, ${db.escape(req.body.text)}, ${db.escape(req.body.bibliography)}, ${db.escape(req.body.last_update)});`,
            (err, result) => {
                if (err) {
                    return res.status(400).send({
                        msg: err
                    });
                } else {
                    return res.status(200).send({
                        msg: "Success"
                    });
                }
            }
        );
    }
});

router.post('/guideline', (req, res, next) => {
    db.query(
        `SELECT * FROM guidelines INNER JOIN users ON author_id = users.id WHERE guideline_id = ${db.escape(req.body.guideline_id)};`,
        (err, result) => {
            if (err || result.length == 0) {
                return res.status(400).send({
                    msg: err
                });
            } else {
                //get approvements
                db.query(
                    `SELECT * FROM approvements INNER JOIN users ON expert_id = users.id WHERE guideline_id = ${db.escape(req.body.guideline_id)};`,
                    (err, result_approvements) => {
                        if (err) {

                            return res.status(400).send({
                                msg: err
                            });
                        } else {
                            result[0].approvements = result_approvements

                            return res.status(200).send({
                                msg: result[0]
                            });
                        }
                    }
                );
            }
        }
    );
});

router.post('/approveGuideline', userMiddleware.isLoggedIn, userMiddleware.validateExpertStatus, (req, res, next) => {
    db.query(
        `INSERT INTO approvements (expert_id, guideline_id) VALUES (${db.escape(req.body.expert_id)}, ${db.escape(req.body.guideline_id)});`,
        (err, result) => {
            if (err) {

                return res.status(400).send({
                    msg: err
                });
            } else {
                return res.status(200).send({
                    msg: "Success"
                });
            }
        }
    );
});

router.post('/revertApproval', userMiddleware.isLoggedIn, userMiddleware.validateExpertStatus, (req, res, next) => {
    db.query(
        `DELETE FROM approvements WHERE expert_id = ${db.escape(req.body.expert_id)} AND guideline_id = ${db.escape(req.body.guideline_id)};`,
        (err, result) => {
            if (err) {
                return res.status(400).send({
                    msg: err
                });
            } else {
                return res.status(200).send({
                    msg: "Success"
                });
            }
        }
    );
});

router.post('/saveAnnotation', userMiddleware.isLoggedIn, (req, res, next) => {
    //TODO: make annotations editable (update)
    db.query(
        `INSERT INTO annotations (guideline_id, author_id, annotation_text) VALUES (${db.escape(req.body.guideline_id)}, ${db.escape(req.body.author_id)}, ${db.escape(req.body.text)});`,
        (err, result) => {
            if (err) {
                return res.status(400).send({
                    msg: err
                });
            } else {
                db.query(`SELECT text from guidelines WHERE guideline_id = ${db.escape(req.body.guideline_id)};`, (errG, resG) => {
                    if(errG){
                        console.log(errG)
                    }else {
                        let guidelineText = resG[0].text
                        db.query(`UPDATE guidelines SET text = '${guidelineText.replace(db.escape(req.body.selected_text).replaceAll("'", ""), "<a id=" + result.insertId + " class=annotationLink>" + db.escape(req.body.selected_text).replaceAll("'", "") + "</a>" )}' WHERE guideline_id = ${db.escape(req.body.guideline_id)};`,
                            (errInner, resultInner) => {
                                if (errInner){
                                    console.log(errInner)
                                    return res.status(400).send({
                                        msg: errInner
                                    });
                                } else {
                                    return res.status(200).send({
                                        msg: "Success",
                                        insertedId: result.insertId
                                    });
                                }
                        })
                    }
                })
            }
        }
    );
});

router.post('/deleteAnnotation', userMiddleware.isLoggedIn, (req, res, next) => {
    db.query(`SELECT text from guidelines WHERE guideline_id = ${db.escape(req.body.guideline_id)};`, (errO, resO) => {
        if(errO){
            return res.status(400).send({
                msg: errO
            });
        } else {
            //remove the <a> element referencing the annotation from the text and update it in DB
            let text = resO[0].text
            let index = text.indexOf("<a id=" + req.body.annotation_id + " class=annotationLink>")

            text = text.replace("<a id=" + req.body.annotation_id + " class=annotationLink>", "")
            let textFirst = text.substring(0,index)
            let textLast = text.substring(index).replace("</a>", "")

            text = textFirst + textLast

            db.query(`UPDATE guidelines SET text = ${db.escape(text)} WHERE guideline_id = ${db.escape(req.body.guideline_id)};`, (errT, resT) => {
                if(errT){
                    return res.status(400).send({
                        msg: errT
                    });
                } else {
                    //in order not to run into sql constraints we also have to delete all annotation votes for this annotation
                    db.query(
                        `DELETE FROM annotation_votes WHERE annotation_id = ${db.escape(req.body.annotation_id)};`,
                        (err, result) => {
                            if (err) {

                                return res.status(400).send({
                                    msg: err
                                });
                            } else {
                                db.query(
                                    `DELETE FROM annotations WHERE annotation_id = ${db.escape(req.body.annotation_id)} AND author_id =${db.escape(req.body.author_id)};`,
                                    (err, result) => {
                                        if (err) {

                                            return res.status(400).send({
                                                msg: err
                                            });
                                        } else {
                                            return res.status(200).send({
                                                msg: "Success"
                                            });
                                        }
                                    }
                                );
                            }
                        }
                    );
                }
            })
        }
    })
});

router.post('/getAnnotation', (req, res, next) => {
    db.query(
        `SELECT * FROM annotations INNER JOIN users ON annotations.author_id = users.id WHERE annotation_id = ${db.escape(req.body.annotation_id)};`,
        (err, result) => {
            if (err) {

                return res.status(400).send({
                    msg: err
                });
            } else {
                //Count the score dynamically on every request (for performance reasons, it may be viable to keep the score stored in the annotation directly, but for now this will probably do just fine)
                db.query(`SELECT vote_id, upvote FROM annotation_votes WHERE annotation_id = ${db.escape(req.body.annotation_id)} AND upvote = 1;`, (errupvotes, resupvotes) => {
                    if(!errupvotes){
                        db.query(`SELECT vote_id, upvote FROM annotation_votes WHERE annotation_id = ${db.escape(req.body.annotation_id)} AND upvote = 0;`, (errdownvotes, resdownvotes) => {
                            if(!errdownvotes){
                                let score = 0
                                score += resupvotes.length
                                score -= resdownvotes.length

                                result[0].score = score

                                if(req.body.user_id){
                                    db.query(`SELECT * FROM annotation_votes WHERE voter_id = ${db.escape(req.body.user_id)};`, (erruser, resuser) => {
                                        if(resuser.length == 0){
                                            return res.status(200).send({
                                                msg: result[0]
                                            });
                                        } else {
                                            //user has casted a vote
                                            result[0].userVote = resuser[0].upvote == 0 ? "d" : "u"
                                            return res.status(200).send({
                                                msg: result[0]
                                            });
                                        }
                                    })
                                } else {
                                    return res.status(200).send({
                                        msg: result[0]
                                    });
                                }
                            }
                        })
                    }
                })
            }
        }
    );
});

router.post('/voteAnnotation', (req, res, next) => {
    db.query(`SELECT * FROM annotation_votes WHERE voter_id = ${db.escape(req.body.user_id)} AND annotation_id = ${db.escape(req.body.annotation_id)};`, (errone, resone) => {
        if(!errone){
            if(resone.length == 0){
                //the user has not voted on this specific annotation yet, so add it to the db
                db.query(
                    `INSERT INTO annotation_votes SET annotation_id = ${db.escape(req.body.annotation_id)}, voter_id = ${db.escape(req.body.user_id)}, upvote = ${db.escape(req.body.upvote)};`,
                    (err, result) => {
                        if (err) {

                            return res.status(400).send({
                                msg: err
                            });
                        } else {
                            return res.status(200).send({
                                msg: "Success"
                            });
                        }
                    }
                );
            } else if(parseInt(resone[0].upvote) == parseInt(db.escape(req.body.upvote))) {
                //remove previously casted vote
                db.query(`DELETE FROM annotation_votes WHERE vote_id = ${resone[0].vote_id};`, (errremove, resremove) => {
                    if(!errremove) {
                        return res.status(200).send({
                            msg: "Success"
                        });
                    } else {
                        console.log(errremove)
                        return res.status(500)
                    }
                })
            } else if(resone[0].upvote !== db.escape(req.body.upvote)) {
                //update previously casted vote (eg from up- to downvote)
                db.query(`UPDATE annotation_votes SET upvote = ${db.escape(req.body.upvote)} WHERE vote_id = ${resone[0].vote_id};`, (errupdate, resupdate) => {
                    if(!errupdate) {
                        return res.status(200).send({
                            msg: "Success"
                        });
                    } else {
                        return res.status(500)
                    }
                })
            }
        } else {
            return res.status(500)
        }
    })
});

module.exports = router;
