const express = require("express");
const app = express();
const connection = require("./database/database");
const bodyParser = require("body-parser"); //traduzir dados enviados em uma estrutura js
const session = require("express-session")

const alunoController = require("./controllers/alunoController");
const userController = require("./controllers/userController");
const empresaController = require("./controllers/empresaController");
const vantagemController = require("./controllers/vantagemController");

const Aluno = require("./models/aluno");

//carregar view engine
app.set('view engine', 'ejs');

//Static
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({
    secret: "qqrcoisa", cookie: {maxAge: 3600000000}
}));

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
app.use("/", vantagemController);

app.get("/", (req, res) => {
    res.render("login")
})

app.get("/cadastrar", (req, res) => {
    res.render("cadastro")
})

app.get("/home", (req, res) => {
    res.render("home");
})

app.get("/moedasExtratoProfessor", (req, res) =>{
    Aluno.findAll().then(alunos => {
        res.render("moedasExtratoProfessor", { alunos: alunos });
    })
})

app.get("/moedasTransferir", (req, res) => {
    Aluno.findAll().then(alunos => {
        res.render("moedasTransferir", { alunos: alunos });
    })
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