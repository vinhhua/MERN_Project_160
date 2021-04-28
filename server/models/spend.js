/*
    Spending Model

*/

//  acquire mongoose
const mongoose = require("mongoose");

//  schema creation: name (String), amount (Number), descript (String), date (String)
const spendSchema = mongoose.Schema({
    name: String,
    amount: Number,
    descript: String,
    date: {
        type: Date,
        default: new Date()
    }
}); 

//  create framework model
const SpendData = mongoose.model('spendings', spendSchema);

//  export default spend
module.exports = SpendData;


