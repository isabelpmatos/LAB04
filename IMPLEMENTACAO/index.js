const express = require("express");
const app = express();
const connection = require("./database/database");
const bodyParser = require("body-parser"); //traduzir dados enviados em uma estrutura js

const Aluno = require("./models/aluno");
const Empresa = require("./models/empresa");

//carregar view engine
app.set('view engine', 'ejs');

//Static
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Database
connection
    .authenticate()
    .then(() => {
        console.log("Conexão feita com sucesso");
    })
    .catch((msgErro) => {
        console.log(msgErro);
    })

app.get("/", (req, res) => {
    res.render("cadastro")
})

app.get("/home", (req, res) => {
    res.render("home");
})

app.listen(5002, () => {
    console.log("Server is started")
})

//empresa

app.get("/empresasParceiras", (req, res) =>{
    Empresa.findAll().then(empresas => {
        res.render("empresasParceiras", {empresas: empresas});
    })
})

app.get("/adicionarEmpresa", (req, res) =>{
    res.render("adicionarEmpresa");
})

app.post("/salvarEmpresa", (req, res) => {

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

app.get("/editarEmpresa", (req, res) => {
    res.render("editarEmpresa");
})

app.get("/consultarEmpresa", (req, res) =>{
    res.render("consultarEmpresa");
})

//aluno

app.get("/alunos", (req, res) =>{
    Aluno.findAll().then(alunos => {
        res.render("alunos", {alunos: alunos});
    })
})

app.get("/adicionarAluno", (req, res) =>{
    res.render("adicionarAluno");
})

app.post("/salvarAluno", (req, res) => {

    var nome = req.body.nome;
    var email = req.body.email;
    var cpf = req.body.cpf;
    var rg = req.body.rg;
    var endereco = req.body.endereco;
    var curso = req.body.curso;

    if (Aluno != undefined) {

        Aluno.create({

            nome: nome,
            email: email,
            cpf: cpf,
            rg: rg,
            endereco: endereco,
            curso, curso

        }).then(() => {
            res.redirect("/alunos");
        });

    } else {
        res.redirect("/adicionarAluno");
    }
})

app.get("/editarAluno", (req, res) =>{
    res.render("editarAluno");
})

app.get("/consultarAluno", (req, res) =>{
    res.render("consultarAluno");
})