const jwt = require("jsonwebtoken");
const db = require("../lib/db");

module.exports = {
    validateRegister: (req, res, next) => {
        // password min 6 chars
        if (!req.body.password || req.body.password.length < 6) {
            return res.status(400).send({
                msg: 'Bitte ein Passwort mit mindestens 6 Zeichen eingeben!'
            });
        }

        // password (repeat) does not match
        if (
            !req.body.password_repeat ||
            req.body.password != req.body.password_repeat
        ) {
            return res.status(400).send({
                msg: 'Die Passwörter stimmen nicht überein!'
            });
        }

        next();
    },
    validatePassword: (req, res, next) => {
        // password min 6 chars
        if (!req.body.password || req.body.password.length < 6) {
            return res.status(400).send({
                msg: 'Bitte ein Passwort mit mindestens 6 Zeichen eingeben!'
            });
        }

        // password (repeat) does not match
        if (
            !req.body.password_repeat ||
            req.body.password != req.body.password_repeat
        ) {
            return res.status(400).send({
                msg: 'Die Passwörter stimmen nicht überein!'
            });
        }

        next();
    },
    isLoggedIn: (req, res, next) => {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(
                token,
                'SECRETKEY'
            );
            req.userData = decoded;
            next();
        } catch (err) {
            return res.status(401).send({
                msg: 'Ihre Sitzung ist nicht valide oder abgelaufen!'
            });
        }
    },
    validateExpertStatus: (req, res, next) => {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(
                token,
                'SECRETKEY'
            );
            req.userData = decoded;

            db.query(
                `SELECT is_expert FROM users WHERE id = ${db.escape(req.userData.userId)};`,
                (err, result) => {
                    if (err) {
                        throw err;
                        return res.status(400).send({
                            msg: err
                        });
                    } else {
                        if(result[0].is_expert){
                            next()
                        } else {
                            return res.status(401).send({
                                msg: 'Für die angefragte Aktion besteht keine Berechtigung!'
                            });
                        }
                    }
                }
            );
        } catch(e){
            return res.status(401).send({
                msg: 'Für die angefragte Aktion besteht keine Berechtigung!'
            });
        }
    },
    allowedToUpdateGuideline: (req, res, next) => {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(
                token,
                'SECRETKEY'
            );
            req.userData = decoded;

            db.query(
                `SELECT author_id FROM guidelines WHERE guideline_id = ${db.escape(req.body.guideline_id)};`,
                (err, result) => {
                    if (err) {
                        throw err;
                        return res.status(400).send({
                            msg: err
                        });
                    } else {
                        //Check if the author id matches the user id of the one making the request
                        if(result[0].author_id == req.userData.userId){
                            next()
                        } else {
                            return res.status(401).send({
                                msg: 'Für die angefragte Aktion besteht keine Berechtigung!'
                            });
                        }
                    }
                }
            );
        } catch(e){
            return res.status(401).send({
                msg: 'Für die angefragte Aktion besteht keine Berechtigung!'
            });
        }
    }
};
