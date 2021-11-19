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

app.listen(5002, () => {
    console.log("Server is started")
})