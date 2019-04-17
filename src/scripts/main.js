console.log('Hello World');

const el = document.querySelector('#container');

foodFactory = (foodItem) => {
    return `<div class='domDiv'>
    <h2>${foodItem.name}</h2>
    <p>Country: ${foodItem.country}</p>
    <p>Ingredients: ${foodItem.ingredients}</p>
    <p>Calories: ${foodItem.calories}</p>
    <p>Fat Content: ${foodItem.fatContent}</p>
    <p>Sugar Content: ${foodItem.sugar}</p>
    </div>`
}

addFoodToDom = (foodAsHTML) => {
    el.innerHTML += foodAsHTML;
}


// function getData() {
//     fetch(`http://localhost:8088/food`)
//         .then(foodResult => {
//             console.log(foodResult)
//             return foodResult
//         })
//         .then(foods => foods.json())
//         .then(parsedFoods => {
//             parsedFoods.forEach(food => {
//                 const foodAsHTML = foodFactory(food)
//                 addFoodToDom(foodAsHTML)
//             })
//             console.table(parsedFoods);
//         })
// };

function getData() {
    fetch('http://localhost:8088/food')
        .then(response => response.json())
        .then(parsedFoods => {
            parsedFoods.forEach(food => {
                console.table(food);

                fetch(`https://world.openfoodfacts.org/api/v0/product/${food.barcode}.json`)
                    .then(response => response.json())
                    .then(productInfo => {
                        // Use it here
                        food.ingredients = productInfo.product.ingredients_text;
                        food.calories = productInfo.product.nutriments.energy;
                        food.country = productInfo.product.countries;
                        food.fatContent = productInfo.product.nutriments.fat_serving;
                        food.sugar = productInfo.product.nutriments.sugars_serving;

                        const foodAsHTML = foodFactory(food);
                        addFoodToDom(foodAsHTML);
                    })
            })
        })
}

const getDataButton = document.getElementById('btn-getData');
getDataButton.addEventListener('click', getData);





