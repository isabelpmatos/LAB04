const express = require("express");
const app = express();
const connection = require("./database/database");
const bodyParser = require("body-parser"); //traduzir dados enviados em uma estrutura js
const session = require("express-session")

const alunoController = require("./controllers/alunoController");
const userController = require("./controllers/userController");
const empresaController = require("./controllers/empresaController");

const Aluno = require("./models/aluno");
const Professor = require("./models/professor");

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

app.get("/cadastroVantagens", (req, res) => {
    res.render("cadastroVantagens");
})

app.get("/viewVantagens", (req, res) => {
    res.render("viewVantagens");
})

app.listen(5002, () => {
    console.log("Server is started")
})

app.post('/cadastroVantagem', (req, res, next) => {
  const formidable = require('formidable');
  const fs = require('fs');
  const form = new formidable.IncomingForm();
 
  form.parse(req, (err, fields, files) => {
 
    const path = require('path');
    const oldpath = files.filetoupload.path;
    const newpath = path.join(__dirname, '..', files.filetoupload.name);
    
    fs.renameSync(oldpath, newpath);
    res.send('File uploaded and moved!');
  });
});