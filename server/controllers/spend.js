//  import TData from '../models/spend.js';
const TData = require("../models/spend");

//  get a transaction
exports.getTransaction = async(req, res) => {
    try {
        const allTransactions = await TData.find();      //  find model

        res.status(200).json(allTransactions);      //  send out all test to client
        //  MOVES IN THE FORM OF JSON = FAST DUE TO NO CONVERSION
    } catch (error) {
        //  if there's an error
        res.status(404).json({message: error.message});
    }
}

//  create a transaction
exports.createTransaction = async(req, res) => {
    //res.send('Router is working');
    const transactionInfo = req.body;      //  store client-side input into var
    const newTransaction = new TData(transactionInfo);     //  new
    try {
        await newTransaction.save();   //  save into db
        console.log('Saved');
        res.status(201).json(newTransaction);      //  created status
    } catch (error) {
        res.status(409).json({message: error.message});     //  handle error
    }
}


//  delete a transaction
exports.deleteTransaction = async(req, res) => {
    const id = req.params.id;       //  data id

    try {
        await TData.findByIdAndRemove(id).exec();
        res.status(202).json(id);       //  accepted status
    }    
    catch (error) {
        console.log(error);
    }
}
