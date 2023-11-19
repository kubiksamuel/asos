const exerciseRepository = require("../repositories/exerciseRepository")

const getAllExercises = async (req, res) => {
    try {
        res.json(await exerciseRepository.findAll())
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}
const createExercise = async (req, res) => {
    try{
        res.status(201).json(await exerciseRepository.create(req))
    }catch (err){
        res.status(500).json({message: err.message})
    }
}



module.exports = {
    getAllExercises,
    createExercise
}
