const Tag = require('../models/tag');

const findAll = () => {
    return Tag.find()
};

const findById = async (id) => {
    return Tag.findById(id);
};

const save = async (tag) => {
    return tag.save(tag)
};

const deleteById = async (id) => {
    return Tag.deleteOne({_id: id})
};

const create = async (req) => {
    return await Tag.create(req.body)
}

// ... other CRUD operations

module.exports = {
    findAll,
    findById,
    save,
    deleteById,
    create
}
