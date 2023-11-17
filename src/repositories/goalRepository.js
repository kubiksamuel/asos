const Goal = require('../models/goal');

const findAll = () => {
    return Goal.find()
};

const findById = async (id) => {
    return Goal.findById(id);
};

const save = async (goal) => {
    return goal.save(goal)
};

const deleteById = async (id) => {
    return Goal.deleteOne({_id: id})
};

// ... other CRUD operations

module.exports = {
    findAll,
    findById,
    save,
    deleteById
}
