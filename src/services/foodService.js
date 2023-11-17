const calculateFoodNutrition = (data) => {
    const multiplier = data.weight / 100

    data = stringToNumber(data)
    
    data.calories = data.calories * multiplier
    data.fats = data.fats * multiplier + "g"
    data.proteins = data.proteins * multiplier + "g"
    data.carbs = data.carbs * multiplier + "g"
    
    return data; 
}

const stringToNumber = (data) => {
    data.fats = parseFloat(data.fats)
    data.proteins = parseFloat(data.proteins)
    data.carbs = parseFloat(data.carbs)
    return data
}

module.exports = {
    calculateFoodNutrition
}