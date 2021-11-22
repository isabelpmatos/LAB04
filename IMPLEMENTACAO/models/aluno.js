const Sequelize = require ("sequelize");
const connection = require("../database/database");

const Aluno = connection.define('aluno', {
    nome:{
        type: Sequelize.STRING,
        allowNull: false
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false
    },
    cpf:{
        type: Sequelize.STRING,
        allowNull: false
    },
    rg:{
        type: Sequelize.STRING,
        allowNull: false
    },
    endereco:{
        type: Sequelize.TEXT,
        allowNull: false
    },
    curso:{
        type: Sequelize.STRING,
        allowNull: true
    },
});

//vai criar a tabela se não existir. Se existir, não vai forçar a criação
Aluno.sync({force: false}).then(() => {}); 

module.exports = Aluno;