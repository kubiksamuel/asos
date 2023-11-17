const mapFoodJson = (data) => {
    const {
        title, 
        nutrition: {calories, fat, protein, carbs}
    } = data

    const mappedData = {
        name: title,
        calories,
        fats: fat,
        proteins: protein,
        carbs,
        weight: 200
    }
    return mappedData
}

module.exports = {
    mapFoodJson
}