const MealPlan = require('../models/mealPlan');

const find = async(query) => {
    return MealPlan.find(query);
}

const save = async (data) => {
    const mealPlan = new MealPlan(data);
    return mealPlan.save()
}

module.exports = {
    save,
    find
}
