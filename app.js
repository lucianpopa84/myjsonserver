const displayRestaurantsButton = document.querySelector("#displayRestaurants");
const displayRestaurantsByCityButton = document.querySelector("#displayRestaurantsByCity");
const searchForm = document.querySelector("#searchForm");
const searchFormInput = document.querySelector("#searchFormInput");
const resultsList = document.querySelector("#resultsList");
const restaurantDataTable = document.querySelector("#restaurantDataTable");
const restaurantsListTitle = document.querySelector("#restaurantsListTitle");
const restaurantDetailsTitle = document.querySelector("#restaurantDetailsTitle");
const cityDelivery = document.querySelector("#cityDeliveryListInput");
const numItems = 10; // number of items to display

// display restaurants
function display() {
    let url = `https://my-json-server.typicode.com/lucianpopa84/myjsonserver/restaurants`;
    getRestaurants(url);
} 

// display restaurants by city
function displayByCity() {
    let url = `https://my-json-server.typicode.com/lucianpopa84/myjsonserver/restaurants/?location=${locality}`;
    getRestaurants(url);
} 

// search restaurants
function search() {
    let inputValue = searchFormInput.value;
    console.log("inputValue: ", inputValue);
    let url = `https://my-json-server.typicode.com/lucianpopa84/myjsonserver/restaurants/${inputValue}`;
    displayRestaurantData(url);
}

// ======= fetch json db =======
function getRestaurants(url) {
    fetch(url)
        .then(response => response.json())
        .then(restaurantsData => {
            restaurantsListTitle.innerHTML = "Restaurants: ";
            resultsList.innerHTML = "Loading data...";
            let listHtmlContent = `
        <tr>
            <th>Id</th>
            <th>Name</th> 
            <th>Food type</th>
            <th>Location</th>
            <th>Working hours</th>
        </tr>
        `;
            for (let i of restaurantsData.keys()) {
                if (i <= numItems) {
                    listHtmlContent += `
                <tr>
                    <td>${restaurantsData[i].name}</td>
                    <td>${restaurantsData[i].id}</td>
                    <td>${restaurantsData[i].foodType.join(", ")}</td>
                    <td>${restaurantsData[i].location}</td>
                    <td>${restaurantsData[i].operHour} - ${restaurantsData[i].closeHour}</td>
                </tr>`;
                }
            }
            resultsList.innerHTML = listHtmlContent;
        }).catch(error => console.log("error: ", error.message));
}

function displayRestaurantData(url) {
    fetch(url)
        .then(response => response.json())
        .then(restaurantData => {
            restaurantDetailsTitle.innerHTML = "Restaurant data: ";
            restaurantDataTable.innerHTML = "Loading data...";
            let listHtmlContent = `
            <tr>
                <th>Name:</th>
                <td>${restaurantData.name}</td>
            </tr>
            <tr>
                <th>Id:</th>
                <td>${restaurantData.id}</td>
            </tr>
            <tr>
                <th rowspan="${restaurantData.foodType.length}">Food type:</th>`
            for (let i of restaurantData.foodType.keys()) {
                listHtmlContent += `
                <td>${restaurantData.foodType[i]}</td>
                </tr>
                <tr>
                `
            }
            listHtmlContent += `
            <tr>
                <th>Location:</th>
                <td>${restaurantData.location}</td>
            </tr>
            <tr>
                <th>Working hours:</th>
                <td>${restaurantData.operHour} - ${restaurantData.closeHour}</td>
            </tr>
            `;

            restaurantDataTable.innerHTML = listHtmlContent;
        }).catch(error => console.log("error: ", error.message));
}


function attachEvents() {
    searchForm.addEventListener("submit", (e) => {
        e.preventDefault();
    });

    displayRestaurantsButton.addEventListener("click", () => display());

    displayRestaurantsByCityButton.addEventListener("click", () => displayByCity());

    cityDelivery.onchange = () => {
        locality = cityDelivery.value;
    };

    cityDelivery.onclick = () => {
        cityDelivery.value = "";
    };
}

attachEvents();

