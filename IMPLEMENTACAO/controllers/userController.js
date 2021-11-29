const express = require("express");
const router = express.Router();

const User = require("../models/user");
const Professor = require("../models/professor");
const Aluno = require("../models/aluno");

router.get("/cadastroUser", (req, res) => {
    res.render("index");
})

router.post("/salvarUser", (req, res) => {

    var nome = req.body.nome;
    var email = req.body.email;
    var senha = req.body.senha;

    if (User != undefined) {

        User.create({

            nome: nome,
            email: email,
            senha: senha,
            tipo: "Aluno"

        }).then(() => {
            res.redirect("/login");
        });

        Aluno.create({
            nome: nome,
            email: email,
            saldo: 0
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