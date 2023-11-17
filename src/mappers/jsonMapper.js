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
        quantity: 100
    }
    return mappedData
}

module.exports = {
    mapFoodJson
}