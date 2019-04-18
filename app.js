const displayRestaurantsButton = document.querySelector("#displayRestaurants");
const searchForm = document.querySelector("#searchForm");
const searchFormInput = document.querySelector("#searchFormInput");
const resultsList = document.querySelector("#resultsList");
const restaurantDataTable = document.querySelector("#restaurantDataTable");
const numItems = 10; // number of items to display

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
});

displayRestaurantsButton.addEventListener("click", () => display());

// display restaurants
function display(){
    let url = `https://my-json-server.typicode.com/lucianpopa84/myjsonserver/restaurants`;
    getRestaurants(url);
  }

// search restaurants
function search(){
  let inputValue = searchFormInput.value;
  console.log("inputValue: ",inputValue);
  let url = `https://my-json-server.typicode.com/lucianpopa84/myjsonserver/restaurants/${inputValue}`;
  displayRestaurantData(url);
}

// ======= fetch json db =======
function getRestaurants(url){
  fetch(url)
  .then(response => response.json())
  .then(restaurantsData => {
    //   console.log("usersData",usersData);
      let listHtmlContent =`
        <tr>
            <th>Id</th>
            <th>Name</th> 
            <th>Food type</th>
            <th>Location</th>
            <th>Working hours</th>
        </tr>
        `;
      for (let i of restaurantsData.keys()){
          if (i <= numItems) {
            // console.log(`${usersData[i].id} ${usersData[i].name} ${usersData[i].email}`);
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

function displayRestaurantData(url){
    fetch(url)
    .then(response => response.json())
    .then(restaurantData => {
        // let listHtmlContent =`
        //     <tr>
        //         <th>Id</th>
        //         <th>Name</th> 
        //         <th>Food type</th>
        //         <th>Location</th>
        //         <th>Working hours</th>
        //     </tr>
        //     <tr>
        //         <td>${restaurantData.id}</td>
        //         <td>${restaurantData.name}</td>
        //         <td>${restaurantData.foodType.join(", ")}</td>
        //         <td>${restaurantData.location}</td>
        //         <td>${restaurantData.operHour} - ${restaurantData.closeHour}</td>
        //     </tr>`;
        let listHtmlContent =`
            <tr>
                <th>Name:</th>
                <td>${restaurantData.name}</td>
            </tr>
            <tr>
                <th>Id:</th>
                <td>${restaurantData.id}</td>
            </tr>
            <tr>
                <th rowspan="2">Food type:</th>
                 <td>${restaurantData.foodType[0]}</td>
            </tr>
                <tr>
                <td>${restaurantData.foodType[1]}</td>
            </tr>
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