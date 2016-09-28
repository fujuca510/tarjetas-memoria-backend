'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('tarjeta', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      texto_referencia: {
        type: Sequelize.STRING
      },
      texto_memoria: {
        type: Sequelize.STRING
      },
      imagen: {
        type: Sequelize.STRING
      },
      grupo: {
        type: Sequelize.STRING
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('tarjeta');
  }
};
