var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab

function showTab(n) {
  // This function will display the specified tab of the form ...
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  console.log("TAB" + n)
  // ... and fix the Previous/Next buttons:
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
    document.getElementById("nextBtn").innerHTML = "Get Started!"
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (n == (x.length - 2)) {
    document.getElementById("nextBtn").innerHTML = "Submit";
  } else if (n == x.length -1 ){
    entries = getAllEntries();
    document.getElementById("prevBtn").style.display = "none";
    document.getElementById("nextBtn").style.display = "none";
    displayPounds(entries)
    displayRecommendations(entries)
  }else {
    if(n != 0){
      document.getElementById("nextBtn").innerHTML = "Next";
    } 
  }
  console.log(x.length)
  console.log(n)
  // ... and run a function that displays the correct step indicator:
  //fixStepIndicator(n)
}

function nextPrev(n) {
  // This function will figure out which tab to display
  var x = document.getElementsByClassName("tab");
  // Exit the function if any field in the current tab is invalid:
  if (n == 1 && !validateForm()) return false;
  // Hide the current tab:
  x[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;
  console.log(currentTab)
  // if you have reached the end of the form... :
  if (currentTab >= x.length) {
    //...the form gets submitted:
    //document.getElementById("regForm").submit();
    console.log(document.getElementsByName("formentry"))
    return false;
  }
  // Otherwise, display the correct tab:
  showTab(currentTab);
}

function validateForm() {
  // This function deals with validation of the form fields
  var x, y, i, valid = true;
  x = document.getElementsByClassName("tab");
  y = x[currentTab].getElementsByTagName("input");
  z = x[currentTab].getElementsByTagName("select");
  console.log(y.value)
  for( i = 0; i < y.length; i++){
    console.log(y[i].value);
  }
  for( i = 0; i < z.length; i++){
    console.log(z[i].value);
  }
  // A loop that checks every input field in the current tab:
  for (i = 0; i < y.length; i++) {
    // If a field is empty...
    if (y[i].value == "") {
      // add an "invalid" class to the field:
      y[i].className += " invalid";
      // and set the current valid status to false:
      valid = false;
    }
  }
  // If the valid status is true, mark the step as finished and valid:
  //if (valid) {
  //  document.getElementsByClassName("step")[currentTab].className += " finish";
  //}
  return valid; // return the valid status
}
/*
function fixStepIndicator(n) {
  // This function removes the "active" class of all steps...
  var i, x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  //... and adds the "active" class to the current step:
  x[n].className += " active";
}*/
function getAllEntries(){
  y = document.getElementsByTagName("input")
  z = document.getElementsByTagName("select")
  entries = []
  for(i = 0; i < 3; i++){
    entries.push(y[i].value)
  }
  entries.push(z[0].value)
  for(i = 3; i < y.length; i++){
    entries.push(y[i].value)
  }
  console.log("ENTRIES" + entries)
  return entries
}

function displayPounds(formData)
{
 // we have to divide miles driven by miles per gallon to get # of gallons of gas used 
  vehicle = formData[2] / formData[1] * 52
  if(formData[3] == "yes"){
    vehicle = vehicle * 99.96
  }
  else{
    vehicle = vehicle * 19.6
  }
  
  //on average: planes emit 90kg/198.416lbs of CO2 per hour of flight time
  travel = formData[4] * 198.416;

  // 947.2 is in lbs/mwH! we have to divide by 1000 to convert to kWH, hence the 0.9472
  electricity = (formData[8] / 0.1188) * 0.9472 * 12

  var pounds = (vehicle + electricity + travel).toLocaleString();
  let to_write = "Your annual CO<sub>2</sub> emissions are: " + pounds + " lbs";
  document.getElementById("co2").innerHTML = to_write;

}

function displayRecommendations(formData){
  
let recommendations= [];


// Currently the array is: 

    // [0: zipcode, 1: mpg of car, 2: # of miles driven in a week, 3: car maintenance, 4: travel/year
    // 5: # lightbulbs, 6: daily light consumption, 7: # times AC was used, 8: elec bill, 9: water bill ]
if (formData[2] > 250){
  recommendations.push("<li>You drive " + formData[2] + 
  " miles a week on average. Consider opting for more public transportation.</li>")
}

if (formData[4] > 16){
  recommendations.push("<li>On average, you spend " + formData[4] + 
  " hours flying per year. Consider looking into more efficient flightpaths for your trips.</li>")
}

if (formData[5] > 30){
  recommendations.push("<li>You are currently using " + formData[5] + 
  " lightbulbs. Consider using lightbulbs with a lower wattage.</li>")
}
if (formData[6] > 8){
  recommendations.push("<li>You have the lights on for " + formData[6] + 
  " hours a day on average. Try to turn off lights that are not in use. </li>")
}

if (formData[7] > 20){
  recommendations.push("<li>You use the AC/Heater " + formData[7] + 
  " times a month on average. Consider turning up the thermostat by a few degrees.</li>")
}

if (formData[8] > 110){
  recommendations.push("<li>You pay $" + formData[8] + 
  " for electricity per month on average. Consider using energy star appliances.</li>")
}
if (formData[9] > 71){
  recommendations.push("<li>You pay $" + formData[9] + 
  " for water per month on average. Consider taking quicker showers.</li>")
}

if (recommendations.length == 0){
  document.getElementById("recom").innerHTML = ""
  document.getElementById("first").innerHTML = "Congrats! Your CO<sub>2</sub> emissions are lower than the national average."
}
for(let i=0; i<recommendations.length; i++) 
  {
      if (i == 0){
        document.getElementById("first").innerHTML = recommendations[i]
      }
      else{
      document.getElementById("first").innerHTML += recommendations[i]
      }
  }
      
}