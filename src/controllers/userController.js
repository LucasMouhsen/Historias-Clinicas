const { validationResult } = require('express-validator');
const { Usuarios } = require('../database/models');
module.exports = {

    login: (req, res) => {
        res.render('login', {
            title: 'Iniciar Sesión',
        });
    },
    processLogin: (req, res) => {
        let errors = validationResult(req);
        console.log(req.body);
        if (errors.isEmpty()) {
            const user = req.body.user.trim();
            Usuarios.findOne({
                where: {
                    usuario: user,
                },
            })
                .then((user) => {
                    req.session.userLogin = {
                        id: user.id,
                        usuario: user.usuario,
                    };
                    res.cookie('recordarme', req.session.userLogin, {
                        maxAge: 1000 * 60,
                    });
                    /* if (recordar) {
                        res.cookie('recordarme', req.session.userLogin, { maxAge: 1000 * 60 })
                    } */
                    return res.redirect('/listado');
                })
                .catch((error) => console.error(error));
        } else {
            return res.render('login', {
                title: 'Iniciar Sesión',
                errors: errors.mapped(),
            });
        }
    },
}