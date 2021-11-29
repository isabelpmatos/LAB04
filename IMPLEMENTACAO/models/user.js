const Sequelize = require ("sequelize");
const connection = require("../database/database");

const Tipo = require("../models/tipo");

const User = connection.define('user', {
    nome:{
        type: Sequelize.STRING,
        allowNull: false
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false
    },
    senha:{
        type: Sequelize.STRING,
        allowNull: false
    }
});

Tipo.hasMany(User);
User.belongsTo(Tipo);

//vai criar a tabela se não existir. Se existir, não vai forçar a criação
User.sync({force: false}).then(() => {}); 

module.exports = User;