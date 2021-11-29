const Sequelize = require ("sequelize");
const connection = require("../database/database");

const Aluno = require("../models/aluno");
const Professor = require("../models/professor");

const Transferencia = connection.define('transferencia', {
    valor:{
        type: Sequelize.DOUBLE,
        allowNull: false
    }
});

Professor.hasMany(Transferencia);
Transferencia.belongsTo(Professor);
Aluno.hasMany(Transferencia);
Transferencia.belongsTo(Aluno);

//vai criar a tabela se não existir. Se existir, não vai forçar a criação
Transferencia.sync({force: false}).then(() => {}); 

module.exports = Transferencia;