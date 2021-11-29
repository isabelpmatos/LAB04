const express = require("express");
const router = express.Router();
const session = require("express-session")

const User = require("../models/user");
const Aluno = require("../models/aluno");
const Professor = require("../models/professor");

router.use(session({
    secret: "qqrcoisa", cookie: {maxAge: 3600000000}
}));

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
                req.session.usuario = {
                    nome: usuario.nome,
                    id: usuario.id,
                    email: usuario.email
                }
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

router.get("/moedas", (req, res) =>{
    Professor.findOne({where : { nome : req.session.usuario.nome }}).then(professor =>{
        res.render("moedas", {professor: professor});
    })
})

module.exports = router;