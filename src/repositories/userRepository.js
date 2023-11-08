const User = require('../models/user');

const findAll = () => {
    return User.find()
};

const findById = async (id) => {
    return User.findById(id);
};

const save = async (user) => {
    return user.save(user)
};

const deleteById = async (id) => {
    return User.deleteOne({_id: id})
};

// ... other CRUD operations

module.exports = {
    findAll,
    findById,
    save,
    deleteById
}
