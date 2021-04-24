/*
   Spending Controller - asynchronous conversion between front & back-end

*/

//  acquire Spending model
const mongoose = require("mongoose");
const SpendData = require("../models/spend");

//  get a Transaction
exports.getTransaction = async(req, res) => {
    try {
        const allTransactions = await SpendData.find();      //  find all data asynchronously
        res.status(200).json(allTransactions);          //  response status success: sent
    } catch (error) {
        res.status(404).json({message: error.message});     //  throw error
    }
}

//  create a Transaction
exports.createTransaction = async(req, res) => {
    const transactionInfo = req.body;           //  parse front-end data
    const newTransaction = new SpendData(transactionInfo);     //  create based on model
    try {
        await newTransaction.save();            //  save into database
        res.status(201).json(newTransaction);   
    } catch (error) {
        res.status(409).json({message: error.message});
    }

    
}

//  delete a Transaction
exports.deleteTransaction = async(req, res) => {
    const transactionId = req.params.id;       //  acquire data id for deletion

    try {
        await SpendData.findByIdAndRemove(transactionId).exec();
        res.status(202).json(transactionId);
    }    
    catch (error) {
        console.log(error);
    }
}

//  update a Transaction
exports.updateTransaction = async(req, res) => {
    const transactionId = req.params.id;       //  acquire id

    //  check if id exists...exit and return error status if not
    if(!mongoose.Types.ObjectId.isValid(transactionId)) return res.status(404).json('Does not exist');

    const transactionInfo = req.body;   //  acquire transaction information
    const transactionUpdate = await SpendData.findByIdAndUpdate(
        id, TransactionInfo, { new: true }
    );      //  prep update

    res.json(transactionUpdate);
}
