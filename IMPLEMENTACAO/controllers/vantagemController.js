const express = require("express");
const router = express.Router();

const Vantagem = require("../models/vantagem");
const Empresa = require("../models/empresa");

router.get("/cadastroVantagens", (req, res) => {
    Empresa.findAll().then(empresas => {
        res.render("cadastroVantagens", {empresas: empresas});
    })
})

router.get("/viewVantagens", (req, res) => {
    Vantagem.findAll({
        include: ({model: Empresa})
    }).then(vantagens => {
        res.render("viewVantagens", {vantagens: vantagens});
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
            res.redirect("/viewVantagens");
        });

    } else {
        res.redirect("/cadastroVantagens");
    }

});

module.exports = router;