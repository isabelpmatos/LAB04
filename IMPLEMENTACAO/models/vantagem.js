const Sequelize = require ("sequelize");
const connection = require("../database/database");

const Vantagem = connection.define('vantagem', {
    nome:{
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao:{
        type: Sequelize.TEXT,
        allowNull: false
    },
    preco:{
        type: Sequelize.DOUBLE,
        allowNull: false
    }
});

//vai criar a tabela se não existir. Se existir, não vai forçar a criação
Vantagem.sync({force: false}).then(() => {}); 

module.exports = Vantagem;