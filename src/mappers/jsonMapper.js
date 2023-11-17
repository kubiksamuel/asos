const mapFoodJson = (data) => {
    const {
        title, 
        price, 
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


    name: 
    quantity: 
    calories: 
    proteins:
    fats: 
    carbs: 


    return mappedData
}

module.exports = {
    mapFoodJson
}