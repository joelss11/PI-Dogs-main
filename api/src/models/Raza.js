const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('raza', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey:true
    },
    nombre:{ 
      type: DataTypes.STRING, 
      allowNull:false
    },
    alturaMin:{
        type:DataTypes.STRING,
        allowNull:false
    },
    alturaMax:{
      type:DataTypes.STRING,
      allowNull:false
  },
    pesoMin:{
        type:DataTypes.STRING,
        allowNull:false
    },
    pesoMax:{
      type:DataTypes.STRING,
      allowNull:false
  },
    añosDeVida:{
     type:DataTypes.STRING
    },
    imagen:{
      type:DataTypes.STRING,
      allowNull:false
    },
    createdInDb:{
      type:DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue:true
    }
    
  });
};
