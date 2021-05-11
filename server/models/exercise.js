/*
    Exercise Model

*/

//  acquire mongoose
const mongoose = require("mongoose");

//  schema creation: name (String), amount (Number), descript (String), date (String)
const exerciseSchema = mongoose.Schema({
    type: String,
    name: String,
    time: Number,
    descript: String,
    date: String,
}); 

//  create framework model
const ExerciseData = mongoose.model('exercises', exerciseSchema);

//  export default spend
module.exports = ExerciseData;