const getFoodApi = (resource) => {
    return fetch(`https://world.openfoodfacts.org/api/v0/product/${resource}`)
        .then(response => response.json())
}

const getLocalFood = () => {
    return fetch("http://localhost:3000/food")
        .then(foods => foods.json())
}

const htmlRep = (name, country, ingredients, calories, fat, sugar) => {
    return `
            <h2>${name}</h2>
            <p>Country: ${country}</p>
            <p>Ingredients: ${ingredients}</p>
            <p>Calories: ${calories}</p>
            <p>Total Fat: ${fat}</p>
            <p>Total Sugar: ${sugar}</p>`
}

const foodList = (food) => {
    return document.querySelector(".foodList").innerHTML += food
}


const foodMaker = () => {
    getLocalFood()
        .then(localFoodArray => {
            localFoodArray.forEach(localFood => {
                getFoodApi(localFood.barcode)
                    .then(apiFoodArray => {
                        const sugar = apiFoodArray.product.nutriments["sugars"]
                        const calories = apiFoodArray.product.nutriments["energy"]
                        const fat = apiFoodArray.product.nutriments["fat"]
                        const htmlFood = htmlRep(localFood.name, apiFoodArray.product.countries, apiFoodArray.product.ingredients_text, calories, fat, sugar)
                        foodList(htmlFood)
                    })
            })
        })
}
foodMaker()