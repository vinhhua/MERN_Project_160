//  import express from 'express';
const express = require("express");
//  import { getTransaction, createTransaction, deleteTransaction } from '../controllers/spend.js';    //  import functions
//  import spend from '../models/spend.js';
const func = require("../controllers/spend");

//  router object instantiation
const router = express.Router();

//  set up routers (PATH/CALLBACK FUNCTION (request/response))
router.get('/', func.getTransaction);
router.post('/', func.createTransaction);   
router.delete('/:id', func.deleteTransaction);

//  export router
//export default router;
module.exports = router;