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
var locality = "";

// display restaurants
function display() {
    let url = `https://my-json-server.typicode.com/lucianpopa84/myjsonserver/restaurants`;
    getRestaurants(url);
}

// display restaurants by city
function displayByCity() {
    if (locality == undefined) {
        resultsList.innerHTML = "Delivery not available for your area";
    } else {
        let url = `https://my-json-server.typicode.com/lucianpopa84/myjsonserver/cities?q=${locality}`;
        getCityId(url);
    }
}

// search restaurants
function search() {
    let inputValue = searchFormInput.value;
    console.log("inputValue: ", inputValue);
    let url = `https://my-json-server.typicode.com/lucianpopa84/myjsonserver/restaurants/?id=${inputValue}`;
    displayRestaurantData(url);
}

// ======= fetch json db =======
function getCityId(url) {
    fetch(url)
        .then(response => response.json())
        .then(cityData => {
            if (cityData.length == 1) {
                console.log("cityData[0].id: ", cityData[0].id);
                cityId = cityData[0].id;
                let url = `https://my-json-server.typicode.com/lucianpopa84/myjsonserver/restaurants?cityId=${cityId}`;
                getRestaurants(url);
            } else {
                resultsList.innerHTML = "Delivery not available for your area";
            }

        }).catch(error => console.log("error: ", error.message));
}

function getRestaurants(url) {
    fetch(url)
        .then(response => response.json())
        .then(restaurantsData => {
            restaurantsListTitle.innerHTML = "Restaurants: ";
            resultsList.innerHTML = "Loading data...";
            let listHtmlContent = `
        <tr>
            <th>ID</th>
            <th>Name</th> 
            <th>Food type id</th>
            <th>City id</th>
            <th>Working hours</th>
        </tr>
        `;
            for (let i of restaurantsData.keys()) {
                if (i <= numItems) {
                    listHtmlContent += `
                <tr>
                    <td>${restaurantsData[i].id}</td>
                    <td>${restaurantsData[i].name}</td>
                    <td>${restaurantsData[i].foodTypeId}</td>
                    <td>${restaurantsData[i].cityId}</td>
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
            if (restaurantData.length >= 1) {
                restaurantDetailsTitle.innerHTML = "Restaurant data: ";
                restaurantDataTable.innerHTML = "Loading data...";
                let listHtmlContent = `
                <tr>
                    <th>Name:</th>
                    <td>${restaurantData[0].name}</td>
                </tr>
                <tr>
                    <th>Id:</th>
                    <td>${restaurantData[0].id}</td>
                </tr>
                <tr>
                    <th rowspan="${restaurantData.length}">Food type Id:</th>`
                for (let i of restaurantData.keys()) {
                    listHtmlContent += `
                    <td>${restaurantData[i].foodTypeId}</td>
                    </tr>
                    <tr>
                    `
                }
                listHtmlContent += `
                <tr>
                    <th>City Id:</th>
                    <td>${restaurantData[0].cityId}</td>
                </tr>
                <tr>
                    <th>Working hours:</th>
                    <td>${restaurantData[0].operHour} - ${restaurantData[0].closeHour}</td>
                </tr>
                `;
                restaurantDataTable.innerHTML = listHtmlContent;
            } else {
                restaurantDataTable.innerHTML = "No restaurant found with this id ";
            }
        });
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
        locality = "";
    };
}

attachEvents();

