//  import mongoose from 'mongoose';
const mongoose = require("mongoose");

//  create instance of schema (data types)
const transactionSchema = mongoose.Schema({
    name: String,
    amount: Number,
    descript: String,
    date: String
    /*{
        type: String,
        default: ' '
    },   //  default
    subjects: [String]  //  array
    */
}); 

//  create models
const spend = mongoose.model('transaction', transactionSchema);

//  export default spend;
module.exports = spend;


