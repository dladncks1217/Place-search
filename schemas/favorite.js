const mongoose = require('mongoose');
const {Schema} = mongoose;

const favoriteSchema = new Schema({
    placeId:{
        type:String,
        unique:true,
        required:true,
    },
    name:{
        type:String,
        required:true
    },
    location: {type:[Number],index:'2dsphere'},
    createdAt:{
        type:Date,
        default:Date.now,
    },
});
module.exports = mongoose.model('Favorite',favoriteSchema);
// MongoDB는 경로, 위도 같은 것을 저장하면 효율적 처리 가능. 따라서 MongoDB 사용.
// (경도, 위도 순서이고 기본 제공 기능.)