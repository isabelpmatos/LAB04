const express = require("express");
const router = express.Router();
const session = require("express-session")

const Vantagem = require("../models/vantagem");
const Empresa = require("../models/empresa");
const Aluno = require("../models/aluno");

router.use(session({
    secret: "qqrcoisa", cookie: { maxAge: 3600000000 }
}));

router.get("/cadastroVantagens", (req, res) => {
    Empresa.findAll().then(empresas => {
        res.render("cadastroVantagens", { empresas: empresas });
    })
})

router.get("/consultarVantagens/:id", (req, res) => {

    var id = req.params.id;

    Vantagem.findOne({
        where: {
            id: id,
        }, 
        include: [{
            model: Empresa,
        }]
    }).then(vantagem => {
        res.render("viewVantagens", { vantagem: vantagem });
    })
})

router.post('/salvarVantagem', (req, res, next) => {

    // const formidable = require('formidable');
    // const fs = require('fs');
    // const form = new formidable.IncomingForm();

    // form.parse(req, (err, fields, files) => {

    //   const path = require('path');
    //   const oldpath = files.filetoupload.path;
    //   const newpath = path.join(__dirname, '..', files.filetoupload.name);

    //   fs.renameSync(oldpath, newpath);
    //   res.send('File uploaded and moved!');
    // });

    var nome = req.body.nome;
    var descricao = req.body.descricao;
    var preco = req.body.preco;
    var empresa = req.body.empresa;

    if (Vantagem != undefined) {

        Vantagem.create({

            nome: nome,
            descricao: descricao,
            preco: preco,
            empresaId: empresa

        }).then(() => {
            res.redirect("/empresasListar");
        });

    } else {
        res.redirect("/cadastroVantagens");
    }

});

router.post("/vantagens/resgatar/:id", (req, res) => {

    var id = req.params.id;

    Aluno.findOne({ where: { nome: req.session.usuario.nome } }).then(aluno => {

        Vantagem.findByPk(id).then(vantagem => {

            Aluno.update({
                saldo: aluno.saldo - vantagem.preco
            }, {
                where: {
                    nome: req.session.usuario.nome
                }
            }).then(() => {
                res.redirect("/empresasListar");
            });

        })

    })

})

router.get("/vantagensEmpresa/:id", (req, res) => {

    var empresaId = req.params.id;

    Vantagem.findAll({
        where: {
            empresaId: empresaId
        }, 
        include: [{
            model: Empresa,
        }]

    }).then(vantagens => {

        if (vantagens != undefined) {
            Empresa.findByPk(empresaId).then(empresa => {
                res.render("vantagensEmpresa", { vantagens: vantagens, empresa: empresa});
            })
        } else {
            res.redirect("/empresasListar");
        }
    })
})

router.get("/empresasListar", (req, res) => {
    res.render("empresasListar");
})

module.exports = router;