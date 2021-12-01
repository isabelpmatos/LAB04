const express = require("express");
const router = express.Router();

const Empresa = require("../models/empresa");

router.get("/empresasParceiras", (req, res) => {
    Empresa.findAll().then(empresas => {
        res.render("empresasParceiras", { empresas: empresas });
    })
})

router.get("/empresasListar", (req, res) => {
    Empresa.findAll().then(empresas => {
        res.render("empresasListar", {empresas : empresas});
    })
})

router.get("/vantagensEmpresa", (req, res) => {
    res.render("vantagensEmpresa");
})

router.get("/adicionarEmpresa", (req, res) => {
    res.render("adicionarEmpresa");
})

router.post("/salvarEmpresa", (req, res) => {

    var nome = req.body.nome;

    if (Empresa != undefined) {

        Empresa.create({

            nome: nome,

        }).then(() => {
            res.redirect("/empresasParceiras");
        });

    } else {
        res.redirect("/adicionarEmpresa");
    }
})

router.get("/empresas/edit/:id", (req, res) => {

    var id = req.params.id;

    Empresa.findByPk(id).then(empresa => {

        if (isNaN(id)) {
            res.redirect("/empresasParceiras");
        }

        if (empresa != undefined) {
            res.render("editarEmpresa", { empresa: empresa });
        } else {
            res.redirect("/empresasParceiras");
        }

    }).catch(erro => {
        res.redirect("/empresasParceiras");
    });

});

router.post("/editarEmpresa", (req, res) => {

    var id = req.body.id;
    var nome = req.body.nome;

    Empresa.update({
        nome: nome,
    }, {
        where: {
            id: id
        }
    }).then(() => {
        res.redirect("/empresasParceiras");
    });
})

router.post("/empresas/delete", (req, res) => {
    var id = req.body.id;

    if (id != undefined) {

        if (!isNaN(id)) { //id é numerico ou não

            Empresa.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                res.redirect("/empresasParceiras");
            })

        } else {
            res.redirect("/empresasParceiras");
        }

    } else {
        res.redirect("/empresasParceiras");
    }
});

router.get("/consultarEmpresa/:id", (req, res) => {
    var id = req.params.id;

    Empresa.findByPk(id).then(empresa => {

        if (isNaN(id)) {
            res.redirect("/empresasParceiras");
        }
        if (empresa  != undefined) {
            res.render("consultarEmpresa", { empresa : empresa });
        } else {
            res.redirect("/empresasParceiras");
        }

    }).catch(erro => {
        res.redirect("/empresasParceiras");
    });
})

module.exports = router;
