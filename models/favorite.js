module.exports = (sequelize,DataTypes) => (
    sequelize.define('favorite',{
        placeName:{
            type:DataTypes.STRING(20),
            allowNull:false,
        },
        createdAt:{
            type:DataTypes.STRING(20),
            default:Date.now(),
        }
    })
);