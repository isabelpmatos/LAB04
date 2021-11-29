const express = require("express");
const app = express();
const connection = require("./database/database");
const bodyParser = require("body-parser"); //traduzir dados enviados em uma estrutura js

const alunoController = require("./controllers/alunoController");
const userController = require("./controllers/userController");
const empresaController = require("./controllers/empresaController");

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

app.use("/", alunoController);
app.use("/", empresaController);
app.use("/", userController);

app.get("/", (req, res) => {
    res.render("login")
})

app.get("/home", (req, res) => {
    res.render("home");
})

app.get("/moedas", (req, res) =>{
    res.render("moedas");
})

app.get("/moedasExtratoProfessor", (req, res) =>{
    res.render("moedasExtratoProfessor");
})

app.get("/moedasTransferir", (req, res) => {
    res.render("moedasTransferir");
})

app.get("/login", (req, res) => {
    res.render("login");
})

app.get("/index", (req, res) => {
    res.render("index");
})

app.listen(5002, () => {
    console.log("Server is started")
})
