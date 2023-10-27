const userRepository = require("../repositories/userRepository")

const getUser = async (req, res, next) => {
    let user
    try {
        user = await userRepository.findById(req.params.id)
        if (user == null) {
            return res.status(404).json({ message: 'Cannot find user' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.user = user
    next()
}

module.exports = {
    getUser
}
