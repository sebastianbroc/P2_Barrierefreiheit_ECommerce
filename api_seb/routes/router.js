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
                            `INSERT INTO users (name, email, password, registered, image) VALUES (${db.escape(
                                    req.body.name
                            )}, ${db.escape(
                                req.body.email
                            )}, ${db.escape(hash)}, now(), "data:image/jpeg;base64,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")`,
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

router.post('/userActivity', userMiddleware.isLoggedIn, (req, res, next) => {
    db.query(`SELECT * from approvements INNER JOIN guidelines on approvements.guideline_id = guidelines.guideline_id WHERE expert_id = ${db.escape(req.body.user_id)} ORDER BY approvement_timestamp DESC;`, (err1, res1) => {
        if(err1){
            console.log(err1)
            return res.status(400).send({
                msg: err1
            });
        } else {
            let approvements = res1
            db.query(`SELECT * from annotations INNER JOIN guidelines on annotations.guideline_id = guidelines.guideline_id WHERE annotations.author_id = ${db.escape(req.body.user_id)} ORDER BY annotation_timestamp DESC;`, (err2, res2) => {
                if(err2){
                    return res.status(400).send({
                        msg: err2
                    });
                } else {
                    let annotations = res2

                    db.query(`SELECT * FROM guidelines WHERE author_id = ${db.escape(req.body.user_id)} ORDER BY last_update;`, (err3, res3) => {
                        if(err3){
                            return res.status(400).send({
                                msg: err3
                            });
                        } else {
                            let result = approvements.concat(annotations).concat(res3)

                            result = result.map((item) => {return {...item, timestamp: item.approvement_timestamp ? item.approvement_timestamp : (item.annotation_timestamp ? item.annotation_timestamp : item.last_update)}})
                            result = result.map((item) => {return {...item, type: item.approvement_timestamp ? "approvement" : (item.annotation_timestamp ? "annotation" : "guideline")}})
                            result = result.map((item) => {return {...item, id: item.guideline_id}})
                            result.sort((a,b) => {
                                return new Date(b.timestamp) - new Date(a.timestamp)
                            })

                            return res.status(200).send({
                                msg: result
                            });
                        }
                    })
                }
            })
        }
    })
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
                                    db.query(`SELECT * FROM annotation_votes WHERE voter_id = ${db.escape(req.body.user_id)} and annotation_id = ${db.escape(req.body.annotation_id)};`, (erruser, resuser) => {
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
