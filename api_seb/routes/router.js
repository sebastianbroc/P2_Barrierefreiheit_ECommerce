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
                                    throw err;
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
                throw err;
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
                        throw bErr;
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
                throw err;
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
                throw err;
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
                    throw err;
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
                    throw err;
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
    }
});

router.post('/userGuidelines', userMiddleware.isLoggedIn, (req, res, next) => {
    db.query(
        `SELECT * FROM guidelines WHERE author_id = ${db.escape(req.body.author_id)};`,
        (err, result) => {
            if (err) {
                throw err;
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

router.post('/saveGuideline', userMiddleware.isLoggedIn, (req, res, next) => {
    if(req.body.guideline_id){
        //TODO: update existing guideline
    } else {
        db.query(
            `INSERT INTO guidelines (title, author_id, text, last_update) VALUES (${db.escape(req.body.title)}, ${db.escape(req.body.author_id)}, ${db.escape(req.body.text)}, ${db.escape(req.body.last_update)});`,
            (err, result) => {
                if (err) {
                    throw err;
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
                throw err;
                return res.status(400).send({
                    msg: err
                });
            } else {
                //get approvements
                db.query(
                    `SELECT * FROM approvements INNER JOIN users ON expert_id = users.id WHERE guideline_id = ${db.escape(req.body.guideline_id)};`,
                    (err, result_approvements) => {
                        if (err) {
                            throw err;
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
                throw err;
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
                throw err;
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

module.exports = router;
