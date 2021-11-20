const express = require("express");
const app = express();
const connection = require("./database/database");

//carregar view engine
app.set('view engine', 'ejs');

//Static
app.use(express.static('public'));

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
    res.render("home")
})

app.get("/home", (req, res) => {
    res.render("home");
})

app.get("/empresasParceiras", (req, res) =>{
    res.render("empresasParceiras")
})

app.get("/adicionarEmpresa", (req, res) =>{
    res.render("adicionarEmpresa");
})

app.get("/editarEmpresa", (req, res) => {
    res.render("editarEmpresa");
})

app.get("/consultarEmpresa", (req, res) =>{
    res.render("consultarEmpresa");
})

app.listen(5002, () => {
    console.log("Server is started")
})