//Marc Holley, 04/11/16, CIS166AA 31865 , Professor Anderson
// geolocation map code
// declare global variables
var waitForUser;
var x = document.getElementById("location");
// function that configures and loads the map if google is not already an object
function loadMap(string) {
   document.getElementById("map").style.display = "block";
   // minimize data use, download map only if needed and not already downloaded
   if (typeof google !== 'object') {
	   var script = document.createElement("script");
	   script.src = "https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=true&callback=geoLocation";
	   document.body.appendChild(script);
   }
}

// function that checks if geolocation is avaiable and calls a function
function geoLocation() {
	waitForUser = setTimeout(fail, 10000);
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(createMap, fail, {timeout: 10000});
	} else {
		fail();
	}
}

// function that gets the location, creates the map, and displays both the map and location
function createMap(position) {
	clearTimeout(waitForUser);
	console.log("Longitude: " + position.coords.longitude);
	console.log("Latitude: " + position.coords.latitude);
	console.log("Altitude: " + position.coords.altitude);
	var currPosLat = position.coords.latitude;
	var currPosLng = position.coords.longitude;
	var currPosAlt = position.coords.altitude;
	var mapOptions = {
		center: new google.maps.LatLng(currPosLat, currPosLng, currPosAlt), zoom: 20
	};
	var map = new google.maps.Map(document.getElementById("map"), mapOptions);
	x.innerHTML = "Latitude: " + position.coords.latitude + 
    " | Longitude: " + position.coords.longitude + " | Altitude: " + position.coords.altitude;
}

// function that is called if request times out or user denies access
function fail() {
	console.log("Geoloaction information not available or not authorized.");
	document.getElementById("map").innerHTML = "Unable to access your current location.";
}

// run loadMap() function when page finishes loading
window.addEventListener("load", loadMap, false);

// Elapsed time code
// declaring and initializing global variabls
var currentDate = new Date(); // creating new date object
var currYear = currentDate.getFullYear();
var currMonth = currentDate.getMonth() + 1;
var currDay = currentDate.getDate();
var currHour = currentDate.getHours();
var currMinute = currentDate.getMinutes();
var currSecond = currentDate.getSeconds();

function elapsedTime() {
		// declaring and initializing local variables
		var daysInMonth;
		var selectedDay = parseInt(document.getElementById("day").value);
		var selectedMonth = parseInt(document.getElementById("month").value - 1);
		var selectedYear = parseInt(document.getElementById("year").value);
		var selectedDate = new Date(selectedYear, selectedMonth, selectedDay); // creating new date object with refrence values
		
		//  if else conditional branching statements to determine number of days in month
		if (selectedMonth === 0 || selectedMonth === 2 || selectedMonth === 4 || 
		selectedMonth === 6 || selectedMonth === 7 || selectedMonth === 9 || 
		selectedMonth === 11)  { // Jan, Mar, Jul, Aug, Oct, Dec
			daysInMonth = 31;
		} else if (selectedMonth === 1) { // Feb
			if (selectedYear % 4 === 0) { // leap year test
				if (selectedYear % 100 === 0) {
					// year ending in 00 not a leap year unless divisible by 400
					if (selectedYear % 400 === 0) {
						daysInMonth = 29;
					} else {
						daysInMonth = 28;
					}
				} else {
					daysInMonth = 29;
				}
			} else {
				daysInMonth = 28;
			}
		} else { // Apr, Jun, Sep, Nov
			daysInMonth = 30;
		}
		console.log("Days in month " + daysInMonth)
		
		if (selectedYear > currYear) {
		alert("Must pick a past year.");
		}
		
		if (document.getElementById("day").value === "" || document.getElementById("month").value === "" || document.getElementById("year").value === "") {
		alert("Must fill out entire form.");
		}
		if (isNaN(selectedDate)) {
		alert("Must use all numbers.")
		}
		
		// one day in milliseconds
		var oneDay = 86400000;
		console.log("Milliseconds in one day " + oneDay)
        
		// current and selected date converted to milliseconds
		var msecCur = currentDate.getTime();
		console.log("Current milliseconds " + msecCur)
        var msecSel = selectedDate.getTime();
		console.log("Selected milliseconds " + msecSel)
		
		// difference in milliseconds
		var msecDif = Math.abs(msecCur - msecSel);
        console.log("Difference in milliseconds " + msecDif)
		
		// converts back to days
        var numOfDays = Math.round(msecDif / oneDay);
		console.log("Number of Days " + numOfDays)

        // converts days to years and calculates remaining days
		var elapsedYears = Math.floor(numOfDays / 365.25);
        numOfDays = numOfDays - (elapsedYears * 365.25);
		console.log("Elapsed years " + elapsedYears)
		console.log("Number of Days " + numOfDays)
		
		// converts days to months and calculates remaining days
		var elapsedMonths = Math.floor(numOfDays / daysInMonth);
        numOfDays = numOfDays - (elapsedMonths * daysInMonth);
		console.log("Elapsed months " + elapsedMonths)
		console.log("Number of Days " + numOfDays)
        
		// remaining days
		var elapsedDays = numOfDays;
		console.log("Elapsed days " + elapsedDays)
		console.log("Number of Days " + numOfDays)

      	// output that displays values inside Id element
		document.getElementById("displayDays").innerHTML = elapsedDays;
		document.getElementById("displayMonths").innerHTML = elapsedMonths;
		document.getElementById("displayYears").innerHTML = elapsedYears;
}


// form validation code
// global variables
// initializes language array
var language = [];
var formValidity = true;

// validates form 
function validateForm(event) {
	
	if (event.preventDefault) {
		event.preventDefault(); //prevent form from submitting
	} else {
		event.returnValue = false; //prevent form from submitting in IE8
	}
	formValidity = true; //reset value for revalidation
	// Chapter 12 Case Project JQuery
	//validateFName();
	$("form.fName").submit(validateFName);
	//validateLName();
	$("form.lName").submit(validateLName);
	//validateEmail();
	$("form.email").submit(validateEmail);
	//validateMessage();
	$("form.message").submit(validateMessage);
	
	if (formValidity === true) {
		//document.getElementById("form").submit();
		$("form").submit();
	}
}

// validates entered email
function validateEmail() {
   var emailInput = document.getElementById("email");
   var emailCheck = /^[_\w\-]+(\.[_\w\-]+)*@[\w\-]+(\.[\w\-]+)*(\.[\D]{2,6})$/;
   try {
//		if email check doesn't match email input throw error message   
		if (emailCheck.test(emailInput.value) === false) {
			throw "Invalid email address";
		}
   }
   catch(msg) {
      // display error message
	  alert(msg);
	  formValidity = false;
	  email.value = "";
   }
}

// validates entered first name
function validateFName() {
   var firstNameInput = document.getElementById("fName");
   try {
//	  	if first name input is less than 1 or contains non alpahnumeric characters throw error message
	  if (/.{1,}/.test(firstNameInput.value) === false) {
		  throw "First name must be at least 1 character(s) long";
	  } else if (/\W/.test(firstNameInput.value) === true) {
		  throw "First name must contain only letters and numbers";
	    }
	}
   catch(msg) {
      // display error message
	  alert(msg);
	  formValidity = false;
	  fName.value = "";
   }
}

// validates entered last name
function validateLName() {
   var lastNameInput = document.getElementById("lName");
   try {
//	  	if last name input is less than 1 or contains non alpahnumeric characters throw error message
	  if (/.{1,}/.test(lastNameInput.value) === false) {
		  throw "Last name must be at least 1 character(s) long";
	  } else if (/\W/.test(lastNameInput.value) === true) {
		  throw "Last name must contain only letters and numbers";
	    }
	}
   catch(msg) {
      // display error message
	  alert(msg);
	  formValidity = false;
	  lName.value = "";
   }
}

// validates entered message
function validateMessage() {
   var messageInput = document.getElementById("message");
   try {
//	  	if message input is less than 10 or contains non alpahnumeric characters throw error message
	  if (/.{10,}/.test(messageInput.value) === false) {
		  throw "Message must be at least 10 characters long";
	  } else if (/\W/.test(messageInput.value) === true) {
		  throw "Message must contain contain only letters and numbers";
	    }
	}
   catch(msg) {
      // display error message
	  alert(msg);
	  formValidity = false;
	  message.value = "";
   }
}

// function that adds and subtracts values to array
function preferedLanguages(event) {
	if (event === undefined) { // get caller element in IE8
		event = window.event;
	}
	// declaring and initializing variables
	var callerElement = event.target || event.srcElement;
	var languageName = callerElement.value;
	if (callerElement.checked) { // if box has just been checked
		// add checkbox value to language array
		language.push(languageName);
		
	  // add checkbox value to list in language section
      var newLanguage = document.createElement("li");
      newLanguage.innerHTML = languageName;
      document.getElementById("languageList").appendChild(newLanguage);
      // make language section visible
      document.getElementById("languageSection").style.display = "block";
   } else { // if box has just been unchecked
      var listItems = document.querySelectorAll("#languageList li");
      for (var i = 0; i < listItems.length; i++) {
         if (listItems[i].innerHTML === languageName) {
			// remove element at index i from array
			language.splice(i, 1);

            // remove language from language list
            listItems[i].parentNode.removeChild(listItems[i]);
            break;
         }
      }
   }
   // convert language array to strings
   arrayString = language.toString();
}

// function that creates event listeners for actions
function createEventListeners() {

   var fName = document.getElementById("fName");
   var lName = document.getElementById("lName");
   var email = document.getElementById("email");
   var message = document.getElementById("message");
   if (fName.addEventListener) {
      fName.addEventListener("change", validateFName, false); 
      lName.addEventListener("change", validateLName, false); 
      email.addEventListener("change", validateEmail, false);
	  message.addEventListener("change", validateMessage, false);	  
   } else if (fName.attachEvent) {
      fName.attachEvent("onchange", validateFName);
      lName.attachEvent("onchange", validateLName);
      email.attachEvent("onchange", validateEmail);
	  message.attachEvent("onchange", validateMessage);
	}
	
	var form = document.getElementsByTagName("form");
	if (form.addEventListener) {
		form.addEventListener("submit", validateForm, false);
	} else if (form.attachEvent) {
		form.attachEvent("onsubmit", validateForm);
	}
   
var languages = document.getElementsByName("languages");
   if (languages[0].addEventListener) {
      for (var i = 0; i < languages.length; i++) {
         languages[i].addEventListener("change", preferedLanguages, false);
      }
   } else if (languages[0].attachEvent) {
      for (var i = 0; i < languages.length; i++) {
         languages[i].attachEvent("onchange", preferedLanguages);
      }
   }
}

// creates event listeners on page load
if (window.addEventListener) {
   window.addEventListener("load", createEventListeners, false);
} else if (window.attachEvent) {
   window.attachEvent("onload", createEventListeners);
}