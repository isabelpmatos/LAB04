const express = require("express");
const router = express.Router();

const Aluno = require("../models/aluno");
const Instituicao = require("../models/instituicao");

router.get("/alunos", (req, res) => {
    Aluno.findAll().then(alunos => {
        res.render("alunos", { alunos: alunos });
    })
})

router.get("/adicionarAluno", (req, res) => {
    Instituicao.findAll().then(instituicoes => {
        res.render("adicionarAluno", { instituicoes: instituicoes });
    })
})

router.post("/salvarAluno", (req, res) => {

    var nome = req.body.nome;
    var email = req.body.email;
    var cpf = req.body.cpf;
    var rg = req.body.rg;
    var endereco = req.body.endereco;
    var curso = req.body.curso;
    var instituicao = req.body.instituicao;

    if (Aluno != undefined) {

        Aluno.create({

            nome: nome,
            email: email,
            cpf: cpf,
            rg: rg,
            endereco: endereco,
            curso, curso,
            instituicaoId: instituicao

        }).then(() => {
            res.redirect("/alunos");
        });

    } else {
        res.redirect("/adicionarAluno");
    }
})

router.get("/alunos/edit/:id", (req, res) => {

    var id = req.params.id;

    Aluno.findOne({
        where: {
            id: id,
        }, 
        include: [{
            model: Instituicao,
        }]
    }).then(aluno => {

        if (isNaN(id)) {
            res.redirect("/alunos");
        }

        if (aluno != undefined) {
            
            Instituicao.findAll().then(instituicoes => {
                res.render("editarAluno", { aluno: aluno, instituicoes: instituicoes });
            })

        } else {
            res.redirect("/alunos");
        }

    }).catch(erro => {
        res.redirect("/alunos");
    });

});

router.post("/editarAluno", (req, res) => {

    var id = req.body.id;
    var nome = req.body.nome;
    var email = req.body.email;
    var cpf = req.body.cpf;
    var rg = req.body.rg;
    var endereco = req.body.endereco;
    var curso = req.body.curso;
    var instituicao = req.body.instituicao;

    Aluno.update({
        nome: nome,
        email: email,
        cpf: cpf,
        rg: rg,
        endereco: endereco,
        curso, curso,
        instituicaoId: instituicao
    }, {
        where: {
            id: id
        }
    }).then(() => {
        res.redirect("/alunos");
    });
})

router.post("/alunos/delete", (req, res) => {
    var id = req.body.id;

    if (id != undefined) {

        if (!isNaN(id)) { //id é numerico ou não

            Aluno.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                res.redirect("/alunos");
            })

        } else {
            res.redirect("/alunos");
        }

    } else {
        res.redirect("/alunos");
    }
});

router.get("/consultarAluno/:id", (req, res) => {
    var id = req.params.id;

    Aluno.findOne({
        where: {
            id: id,
        }, 
        include: [{
            model: Instituicao,
        }]
    }).then(aluno => {

        if (isNaN(id)) {
            res.redirect("/alunos");
        }

        if (aluno != undefined) {
            res.render("consultarAluno", { aluno: aluno});


        } else {
            res.redirect("/alunos");
        }

    }).catch(erro => {
        res.redirect("/alunos");
    });
    
})

module.exports = router;