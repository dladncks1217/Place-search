module.exports = (sequelize,DataTypes) =>(
    sequelize.define('board',{
        content:{
            type:DataTypes.STRING(100),
            allowNull:false,
        },
        post_date:{
            type:DataTypes.STRING(20),
            allowNull:false,
        }
    })
);