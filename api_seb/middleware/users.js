const jwt = require("jsonwebtoken");

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
    }
};
