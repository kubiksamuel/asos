// const recommendationRepository = require("../repositories/recommendationRepository")
const storedWorkoutRepository = require("../repositories/storedWorkoutRepository")

const getWorkoutRecommendationsForAllGoals = async (req, res) => {
    try {
        const userWithPopulatedGoals = await req.user.populate('goals')
        const tags = userWithPopulatedGoals.goals.map(goal => goal.tags).flat();
        res.json(await storedWorkoutRepository.getStoredWorkoutsByTags(tags))

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const getWorkoutRecommendationsForSpecificGoal = async (req, res) => {
    try {
        console.log(res.goal.tags)
        const tags = res.goal.tags
        res.json(await storedWorkoutRepository.getStoredWorkoutsByTags(tags))

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}



module.exports = {
    getWorkoutRecommendationsForAllGoals,
    getWorkoutRecommendationsForSpecificGoal
}
