const Food = require('../models/food');

const findAll = () => {
    return Food.find()
};

const findById = async (id) => {
    return Food.findById(id);
};

const save = async (user) => {
    return user.save(user)
};

const deleteById = async (id) => {
    return Food.deleteOne({id})
};

// ... other CRUD operations

module.exports = {
    findAll,
    findById,
    save,
    deleteById
}