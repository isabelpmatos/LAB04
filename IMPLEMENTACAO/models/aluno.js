const Sequelize = require ("sequelize");
const connection = require("../database/database");

const Instituicao = require("../models/instituicao");

const Aluno = connection.define('aluno', {
    nome:{
        type: Sequelize.STRING,
        allowNull: true
    },
    email:{
        type: Sequelize.STRING,
        allowNull: true
    },
    cpf:{
        type: Sequelize.STRING,
        allowNull: true
    },
    rg:{
        type: Sequelize.STRING,
        allowNull: true
    },
    endereco:{
        type: Sequelize.TEXT,
        allowNull: true
    },
    curso:{
        type: Sequelize.STRING,
        allowNull: true
    },
    saldo:{
        type: Sequelize.DOUBLE,
        allowNull: true
    }
});

Instituicao.hasMany(Aluno);
Aluno.belongsTo(Instituicao);

//vai criar a tabela se não existir. Se existir, não vai forçar a criação
Aluno.sync({force: false}).then(() => {}); 

module.exports = Aluno;