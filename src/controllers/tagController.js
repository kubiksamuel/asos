const tagRepository = require("../repositories/tagRepository")

const getAllTags = async (req, res) => {
    try {
        res.json(await tagRepository.findAll())
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}
const createTag = async (req, res) => {
    try{
        res.status(201).json(await tagRepository.create(req))
    }catch (err){
        res.status(500).json({message: err.message})
    }
}



module.exports = {
    getAllTags,
    createTag
}
