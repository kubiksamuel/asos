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

module.exports = {
    mapFoodJson
}