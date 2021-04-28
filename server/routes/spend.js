/*
  Spending Route

*/

//  acquire router
const express = require("express");
const router = express.Router();

//  acquire Spending controller functions
const { 
    getTransaction, 
    createTransaction, 
    deleteTransaction,
    updateTransaction, 
} = require("../controllers/spend");


//  set-up router: GET, POST, DELETE, & UPDATE
router.get('/', getTransaction);
router.post('/', createTransaction);   
router.delete('/:id', deleteTransaction);
router.patch('/:id', updateTransaction);

//  export default router
module.exports = router;
