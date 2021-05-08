/*
  Exercise Route

*/

//  acquire router
const express = require("express");
const router = express.Router();

//  acquire Exercise controller functions
const { 
    getExercise, 
    createExercise, 
    deleteExercise,
    updateExercise, 
} = require("../controllers/exercise");


//  set-up router: GET, POST, DELETE, & UPDATE
router.get('/', getExercise);
router.post('/', createExercise);   
router.delete('/:id', deleteExercise);
router.patch('/:id', updateExercise);

//  export default router
module.exports = router;
