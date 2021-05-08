/*
   Exercise Controller - asynchronous conversion between front & back-end

*/

//  acquire Spending model
const mongoose = require("mongoose");
const ExerciseData = require("../models/exercise");

//  get a Exercise
exports.getExercise = async(req, res) => {
    try {
        const allExercises = await ExerciseData.find();      //  find all data asynchronously
        res.status(200).json(allExercises);          //  response status success: sent
    } catch (error) {
        res.status(404).json({message: error.message});     //  throw error
    }
}

//  create a Exercise
exports.createExercise = async(req, res) => {
    const exerciseInfo = req.body;           //  parse front-end data
    const newExercise = new ExerciseData(exerciseInfo);     //  create based on model
    try {
        await newExercise.save();            //  save into database
        res.status(201).json(newExercise);   
    } catch (error) {
        res.status(409).json({message: error.message});
    }
}

//  delete a Exercise
exports.deleteExercise = async(req, res) => {
    const exerciseId = req.params.id;       //  acquire data id for deletion

    //  check if id exists...exit and return error status if not
    if(!mongoose.Types.ObjectId.isValid(exerciseId)) return res.status(404).json('._id does not exist');

    await ExerciseData.findByIdAndRemove(exerciseId).exec();
    res.json({message: `${exerciseId} deleted successfully`}); 
}

//  update a Exercise
exports.updateExercise = async(req, res) => {
    const exerciseId = req.params.id;       //  acquire id

    //  check if id exists...exit and return error status if not
    if(!mongoose.Types.ObjectId.isValid(exerciseId)) return res.status(404).json('._id does not exist');

    const exerciseInfo = req.body;   //  acquire Exercise information
    const exerciseUpdate = await ExerciseData.findByIdAndUpdate(
        exerciseId, { ...exerciseInfo, exerciseId }, { new: true }   
    );      //  prep update along w/ id

    res.json({message: `${exerciseUpdate} updated`});
}