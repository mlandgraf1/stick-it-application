//function to validate the form to check for empty fields
//alert appears if a field is left empty
function validate_form() {
  valid = true;

  if (document.form.age.value == "") {
    alert("Please fill in the Age field.");
    valid = false;
  }

  if (document.form.heightFeet.selectedIndex == 0) {
    alert("Please fill in the Height field.");
    valid = false;
  }

  if (document.form.heightInches.selectedIndex == 0) {
    alert("Please fill in the Height field.");
    valid = false;
  }

  if (document.form.weight.value == "") {
    alert("Please fill in the Weight field.");
    valid = false;
  }

  if (document.form.position.selectedIndex == 0) {
    alert("Please fill in the Position field.");
    valid = false;
  }

  if (document.form.playingStyle.selectedIndex == 0) {
    alert("Please fill in the Playing Style field.");
    valid = false;
  }

  if (document.form.heightInches.selectedIndex == 0) {
    alert("Please fill in the Maximum Price field.");
    valid = false;
  }

  return valid;
}

//This JS file will convert the data entered by the users into the parameters
//that will be used as part of the GET request
//The parameters being: flex, curve, ageLevel, price

//get maximum price from user input - turn price into float
function findPrice() {
  let maxPrice = document.getElementById("maxPrice").value;
  var maxPriceFloat = parseFloat(maxPrice);

  return maxPriceFloat;
}

//use user's weight and height to determine what age level of stick best fits them (Youth/Junior/Intermediate/Senior)
function findAgeLevel() {
  let weight = document.getElementById("weight").value;
  weightInt = parseFloat(weight);
  let heightFeet = document.getElementById("heightFeet").value;
  let heightInches = document.getElementById("heightInches").value;

  var heightFeetInt = parseInt(heightFeet);
  var heightInchesInt = parseInt(heightInches);

  var TotalHeight = heightFeetInt * 12 + heightInchesInt;
  var ageLevel;

  if (weightInt < 120 && TotalHeight < 45) {
    ageLevel = "Youth";
  } else if (weightInt < 120 && TotalHeight >= 45 && TotalHeight < 54) {
    ageLevel = "Junior";
  } else if (weightInt < 120 && TotalHeight >= 54 && TotalHeight < 57) {
    ageLevel = "Junior";
  } else if (weightInt < 120 && TotalHeight >= 57 && TotalHeight < 63) {
    ageLevel = "Intermediate";
  } else if (weightInt >= 120 && weightInt < 160 && TotalHeight < 45) {
    ageLevel = "Youth";
  } else if (weightInt >= 120 && weightInt < 160 && TotalHeight >= 45 && TotalHeight < 54) {
    ageLevel = "Junior";
  } else if (weightInt >= 120 && weightInt < 160 && TotalHeight >= 54 && TotalHeight < 57) {
    ageLevel = "Intermediate";
  } else if (weightInt >= 120 && weightInt < 160 && TotalHeight >= 57 && TotalHeight < 63) {
    ageLevel = "Intermediate";
  } else if (weightInt >= 120 && weightInt < 160 && TotalHeight >= 63) {
    ageLevel = "Senior";
  } else if (weightInt < 120 && TotalHeight >= 63) {
    ageLevel = "Senior";
  } else if (weightInt >= 160 && TotalHeight < 45) {
    ageLevel = "Youth";
  } else if (weightInt >= 160 && TotalHeight >= 45 && TotalHeight < 54) {
    ageLevel = "Junior";
  } else if (weightInt >= 160 && TotalHeight >= 54 && TotalHeight < 57) {
    ageLevel = "Intermediate";
  } else if (weightInt >= 160 && TotalHeight >= 57 && TotalHeight < 63) {
    ageLevel = "Senior";
  } else {
    ageLevel = "Senior";
  }

  return ageLevel;
}

//use user's age level (determined by last function), age, and position to determine what flex (stiffness) best fits their needs
function findFlex(ageLevel) {
  let age = document.getElementById("age").value;
  var ageInt = parseFloat(age);

  var position = document.getElementById("position").value;
  var flex;

  if (ageLevel == "Junior" && ageInt <= 10) {
    flex = 40;
  } else if (ageLevel == "Junior" && ageInt > 10) {
    flex = 50;
  } else if (ageLevel == "Intermediate" && ageInt <= 12) {
    flex = 55;
  } else if (ageLevel == "Intermediate" && ageInt > 12 && ageInt <= 15) {
    flex = 60;
  } else if (ageLevel == "Intermediate" && ageInt > 16) {
    flex = 65;
  } else if (ageLevel == "Senior" && ageInt <= 18) {
    flex = 77;
  } else if (ageLevel == "Senior" && ageInt > 18 && ageInt <= 22) {
    flex = 87;
  } else if (ageLevel == "Senior" && ageInt > 22 && ageInt <= 30) {
    flex = 95;
  } else if (ageLevel == "Senior" && ageInt > 22 && ageInt <= 30 && position == "D") {
    flex = 102;
  } else if (ageLevel == "Senior" && ageInt > 30) {
    flex = 87;
  }
  return flex;
}

//use user's position and playing style to determine which stick curve best fits their needs
function findCurve() {
  var position = document.getElementById("position").value;
  var playingStyle = document.getElementById("playingStyle").value;

  var curve;

  if (playingStyle == "jackofalltrades") {
    curve = "P88";
  } else if (playingStyle == "playmaker") {
    curve = "P88";
  } else if (playingStyle == "sniper") {
    curve = "P28";
  } else if (playingStyle == "slapshot" || playingStyle == "jackofalltrades" && position == "D") {
    curve = "PM9";
  } else if (playingStyle == "dangler") {
    curve = "P92";
  } else {
    curve = "P88";
  }
  return curve;
}

//function to fire my GET request - this is where the back end is connected to the front end
function fireGetRequest(event) {
  event.preventDefault();

  //calls the validate_form function to ensure all fields have been filled in
  validate_form();

  //calls conversion functions to convert user input to stick parameters 
  //and assigns their values to variables
  var ageLevelParam = findAgeLevel();
  var flexParam = findFlex(ageLevelParam);
  var curveParam = findCurve();
  var priceParam = findPrice();
  // alert(ageLevelParam);
  // alert(flexParam);
  // alert(curveParam);
  // alert(priceParam);

  //use fetch method to send network requests to the server and load new information
  //it will return a promise containing the response 
  //this fetch method includes the variables defined above in the URL which are used as 
  //parameters for the GET request
  //this fetch method also supplies some request options like method and headers
  fetch(`/hockey/${flexParam}/${curveParam}/${ageLevelParam}/${priceParam}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json"
    }
  })
    //this is an HTTP response not the actual JSON so res.json() is used to extract
    //the JSON body content from the response
    .then(res => res.json())
    .then(res => {
      //log the JSON responses received to the console
      console.log(res);
      if(res.errorMsg){
        const error = document.getElementById("data");
        error.innerHTML = `<h2 id="results-header">Results</h2><p id="error">${res.errorMsg}</p>`;
      }else{
        const dataDisplay = document.getElementById("data");
        renderData(res, dataDisplay);
      }
    })
    //logs error getting data back to the console
    .catch(err => console.log("error fetching data", err));

    //disables the submit button so that multiple submissions cannot be made
    this.disabled = true;
    this.style.color = "gray";
}

//this constant will render the data received from the GET request
//in the browser using the HTML formatting specified below
//the data will be rendered to a div in the index.html file with the id "data"
const renderData = (data, dataDisplay) => {
  data.forEach(d => {
    let listWrapper = document.createElement("div");
    listWrapper.innerHTML = 
    `<form id="results" action="${d.purchaselink}" target="_blank">
        <div id="name-div">
        <label for="name">Name: </label><p id="name" name="name">${d.name}</p></div>
        <div id="age-level-div">
        <label for="age-level">Age Level: </label><p id="age-level" name="age-level">${d.agelevel}</p></div>
        <div id="flex-div">
        <label for="flex">Flex: </label><p id="flex" name="flex">${d.flex}</p></div>
        <div id="curve-div">
        <label for="curve">Curve: </label><p id="curve" name="curve">${d.curve}</p></div>
        <div id="price-div">
        <label for="price">Price: </label><p id="price" name="price">$${d.price}</p></div>
        <button type="submit">Buy Now</button>
    </form>`;
    dataDisplay.append(listWrapper);
  });
};
//calls the fireGetRequest function when the submit button is clicked in the browser
document.getElementById("submit").addEventListener("click", fireGetRequest);
