module.exports = (sequelize,DataTypes)=>(
    sequelize.define('history',{
        query:{
            type:DataTypes.STRING(20),
            allowNull:false
        },
        time:{
            type:DataTypes.STRING(20),
            allowNull:false,
            defalut:Date.now(),
        },
    })
);