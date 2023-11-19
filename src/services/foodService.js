const calculateFoodNutrition = (data, weight) => {
    const multiplier = weight / 100

    data = stringToNumber(data)
    
    data.calories = data.calories * multiplier
    data.fats = data.fats * multiplier
    data.proteins = data.proteins * multiplier
    data.carbs = data.carbs * multiplier
    data.weight = weight
    
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