const mapFoodJson = (data) => {
    
    // get required data from json
    const {
        title, 
        nutrition: {calories, fat, protein, carbs}
    } = data

    // create structure for expected json
    const mappedData = {
        name: title,
        calories,
        fats: fat,
        proteins: protein,
        carbs,
        weight: 100
    }
    return mappedData
}


const mapRecipeJson = (data, servings) => {
    const {
        title, 
        nutrition: {nutrients}
    } = data

    let { amount: calories } = nutrients.find(nutrient => nutrient.name === 'Calories') || {};
    let { amount: fat } = nutrients.find(nutrient => nutrient.name === 'Fat') || {};
    let { amount: protein } = nutrients.find(nutrient => nutrient.name === 'Protein') || {};
    let { amount: carbs } = nutrients.find(nutrient => nutrient.name === 'Carbohydrates') || {};

    if (servings > 1) {
        calories = calories * servings
        fat = fat * servings
        protein = protein * servings
        carbs = carbs * servings
    }

    const mappedData = {
        name: title,
        servings,
        calories,
        fats: fat,
        proteins: protein,
        carbs
    }
    return mappedData
}



module.exports = {
    mapFoodJson,
    mapRecipeJson
}