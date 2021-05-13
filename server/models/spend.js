/*
    Spending Model

*/

//  acquire mongoose
const mongoose = require("mongoose");

//  schema creation: name (String), amount (Number), descript (String), date (String)
const spendSchema = mongoose.Schema({
    creator: String,
    type: String,
    amount: Number,
    descript: String,
    date: String,
}); 

//  create framework model
const SpendData = mongoose.model('spendings', spendSchema);

//  export default spend
module.exports = SpendData;