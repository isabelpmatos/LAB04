const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs')

const User = require("../models/user");
const Tipo = require("../models/tipo");

router.get("/cadastroUser", (req, res) => {
    Tipo.findAll().then(tipos => {
        res.render("index", { tipos: tipos });
    })
})

router.post("/salvarUser", (req, res) => {

    var nome = req.body.nome;
    var email = req.body.email;
    var senha = req.body.senha;
    var tipo = req.body.tipo;

    if (User != undefined) {

        User.create({

            nome: nome,
            email: email,
            senha: senha,
            tipoId: tipo

        }).then(() => {
            res.redirect("/login");
        });

    } else {
        res.redirect("/cadastroUser");
    }
})

router.post("/login", (req, res) => {

    var email = req.body.email;
    var senha = req.body.senha;

    User.findOne({ where: { email: email } }).then(usuario => {

        if (usuario != undefined) {

            if (senha = usuario.senha) {
                res.render("home");
            }
            else {
                res.redirect("/");
            }
        }
        else {
            res.redirect("/");
        }
    })

})

module.exports = router;