$(document).ready(function() {

  //Function to generate random background image

function randomImage(){
  var images = [
      'assets/images/image_3.jpg',
      'assets/images/image_2.jpg',
      'assets/images/image_4.jpg',
      'assets/images/image_8.jpg',
      'assets/images/image_5.jpg'
  ];

  var size = images.length;
  var i = Math.floor(size * Math.random());
  console.log(i);

  var element = document.getElementById('picturewrapper');
  console.log(element);
  element.style['background-image'] = "url("+ images[i] +")";
}

randomImage();

  //GLOBAL VARIABLES
  var selectedEventName = "";
  var selectedVenueCity = "";
  var selectedVenueZip = "";
  var selectedVenueDate = "";
  var selectedTicketPrice = 0;
  
  console.log(`init values: venuecity: ${selectedVenueCity} / venuezip: ${selectedVenueZip} / artist: ${selectedEventName} / price: ${selectedTicketPrice}`);
  
  function displayEventChoices(eventObj) {
    for (var i = 0; i<3; i++) {
      var listDiv = $("<div>").attr("class", "card text-white bg-black mb-3");
  
      // generating variables from JSON response
      var priceRange = Math.floor(Math.random() * (90 - 50) + 50);
      var cardHolder = $("<div>").attr("class", "card-body");
      var eventNameData = eventObj._embedded.events[i].name;
      var eventDatesData = eventObj._embedded.events[i].dates.start.localDate;
      var eventVenueNameData = eventObj._embedded.events[i]._embedded.venues[0].name;
      var eventZipData = eventObj._embedded.events[i]._embedded.venues[0].postalCode;
      var eventCityNameData = eventObj._embedded.events[i]._embedded.venues[0].city.name;
      var eventStateData = eventObj._embedded.events[i]._embedded.venues[0].state.stateCode;
      var eventCityState = eventCityNameData + ", " + eventStateData
   
      // displaying data to DOM
  
      // assemble card element 1: eventPic
      var eventPic = $("<img>").attr("src", eventObj._embedded.events[i].images[4].url).attr("class","card-img-top");
  
      // assemble card elements 2: cardBody
      var eventName = $("<h5>").text(eventNameData).attr("class","text-black");
      var eventDates = $("<p>").text("Date: " +  moment(eventDatesData).format("MMM Do YYYY"));
      var eventVenueName = $("<p>").text("Venue: " + eventVenueNameData);
      var eventZip = $("<p>").text("Zip: " + eventZipData);
      var eventVenueCity = $("<p>").text(`City: ${eventCityNameData}, ${eventStateData}`);
      var eventPriceDisplay = $("<p>").text("Avg Ticket Price: " + priceRange);
  
      var cardBody = cardHolder.append(
        eventName,
        eventDates,
        eventVenueName,
        eventVenueCity,
        eventZip,
        eventPriceDisplay
      );
      //assemble card elements 3: eventBtn
      var cardFooter = $('<div>').attr("class", "card-footer");
        // loading this button with attr pertaining to needed variables upon select......
      var cardChoose = $('<div>').attr("class", "chooseThis btn btn-block btn-outline-primary").attr("data-cardBody",cardBody).attr("data-eventPic", eventPic).attr("data-venuename",eventVenueName).attr("data-eventname",eventNameData).attr("data-eventdate", eventDatesData).attr("data-eventzip", eventZipData).attr("data-eventcity", eventCityState).attr("data-ticketprice", priceRange).text("Select Event");
      var eventBtn = cardFooter.append(cardChoose);
      
      //combine Zord: "eventTotal card"
      var eventTotal = listDiv.append(eventPic, cardBody, eventBtn);
      var totalCard = $("<div class=totalcard img-fluid>").append(eventTotal);
      //display to DOM at designated ID
      $("#resultsDisplay").append(totalCard);
      }
      console.log("results displayed function side");
  
  };
  
  // function displaySelectedEvent(chosenObj) {
  //   console.log("Name of event is: " + chosenObj.selectedEventName);
  //   var selectedDiv = $("<div>").attr("class", "card w-90 text-black bg-white mb-3");
  
  //   var eventName = $("<h5>").text(chosenObj.selectedEventName).attr("class","text-black");
  //   var eventDates = $("<p>").text("Date: " + chosenObj.selectedVenueDate);
  //   var eventVenueName = $("<p>").text("Venue: " + chosenObj.selectedVenueName);
  //   var eventZip = $("<p>").text("Zip: " + chosenObj.selectedVenueZip);
  //   var eventVenueCity = $("<p>").text(`City: ${chosenObj.selectedVenueCity}`);
  //   var eventPriceDisplay = $("<p>").text("Avg Ticket Price: " + chosenObj.selectedTicketPrice);
  
  
  //   var passpic = passpic.text(chosenObj.selectedCardPic);
  //   var passbody = passbody.text(chosenObj.selectedCardBody);
  
  //   var selectedEvent = selectedDiv.append(passpic, passbody);
  //   $("#resultsDisplay").append(selectedEvent);
  // }
  
  
  // Event listener for all artist submit elements
  $("#submitbtn").on("click", function(event) {
    $("#userLocation").empty();
    event.preventDefault();
    console.log("SUBMIT BUTTON CLICKED!");
    $("#resultsDisplay").empty();
    var keyword = $("#inlineFormInput").val(); 
    // Constructing a URL to search Ticketmaster for list of events by keyword entered
    var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?keyword=" + keyword + "&countryCode=US&apikey=Hvspzyaf9sT79FRlHNKREkFSLhoIZkDW";
  
    $.ajax({url: queryURL, method: "GET" })
    .then(function(response) {
      var jString = JSON.stringify(response);
      var objEvent = JSON.parse(jString);
  
      var eventNamePrompt = $("<h1>").attr("class","block text-white text-center").text('Event Results for "'+keyword+'"');
      var eventNameDisplay = $("<div>").attr("")
      $("#resultsDisplay").append(
          eventNameDisplay
      );
      
      displayEventChoices(objEvent);
      console.log("results displayed on-click side");
  
      // When user selects an event, the div will be emptied
      // and the selected events data is passed to holding variables 
      // for Bill's script, another form field will be produced asking for location info 
      $(".chooseThis").on("click", function() {
        selectedCardPic = $(this).attr("data-eventPic");
        selectedCardBody = $(this).attr("data-cardBody");
        selectedEventName = $(this).attr("data-eventname");
        selectedVenueName = $(this).attr("data-venuename");
        selectedVenueCity =  $(this).attr("data-eventcity");
        selectedVenueZip =  $(this).attr("data-eventzip");
        selectedVenueDate = $(this).attr("data-eventdate");
        selectedTicketPrice =  $(this).attr("data-ticketprice");
        $("#resultsDisplay").empty();
        $("#userLocation").empty();
        
        console.log("TESTING ONLY DELETE ON FINAL :::  Score! You chose: " + selectedEventName + " at " + selectedVenueCity + " " + selectedVenueZip + " on " + selectedVenueDate + ". Flight options if needed will show below:");
  
        // OBJECT of Selected Event
        var selectedObj = {selectedCardPic, selectedCardBody, selectedEventName, selectedVenueName, selectedVenueCity, selectedVenueZip, selectedVenueDate, selectedTicketPrice}
        console.log(selectedObj.selectedVenueDate);
        
        
        
        
        // Results:
        var chosenPrompt = $("<h1>").attr("style","color: #56DAA1").html("You chose: <br>" + selectedEventName + "<br> in " + selectedVenueCity.split(",")[0] + "<br> on "  + moment(selectedVenueDate).format("MMM Do YYYY") + "<br> for $" + selectedTicketPrice + "<br><div id=flights> Flight Results Loading...");
        $("#footerInfo").empty();
        $("#footerInfo").append("Trip Total: $" + selectedTicketPrice);
        $("#userLocation").append(chosenPrompt);
        // displaySelectedEvent(selectedObj);
        
        
/* 
Itinerary Builder Start
*/


    dateDepart();


    // Functions for Translating Event Date into Travel Dates 

        function dateDepart() {
          var date = new Date(selectedObj.selectedVenueDate);
          date.setDate(date.getDate() + (-1));
          var dDate = ('0' + date.getDate()).slice(-2);
          var mm = ('0' + (date.getMonth()+1)).slice(-2);
          var y = date.getFullYear();
          departDate = y + '-' +  mm  + '-' + dDate;
          console.log("depart "+departDate);
          // $("#results").append(departDate +" = Depart Date <br>");
          dateReturn();
          }
      
          function dateReturn() {
          var date = new Date(selectedObj.selectedVenueDate);
          date.setDate(date.getDate() + (+3));
          var rDate = ('0' + date.getDate()).slice(-2);
          var mm = ('0' + (date.getMonth()+1)).slice(-2);
          var y = date.getFullYear();
          returnDate = y + '-' +  mm  + '-' + rDate;
          console.log("return "+returnDate);
          // $("#results").append(returnDate +" = Return Date");
          city1Airport();
          }
      
          // Aviation Edge API for Converting Origin City Into Airport Code 
          
      
              
              function city1Airport() {
                  var city = "new york";
                  var queryURL = "https://cors-anywhere.herokuapp.com/https://aviation-edge.com/v2/public/autocomplete?key=784b29-c30a1a&city=" + city;
                  $.ajax({
                      url: queryURL,
                      method: "GET",
                  }).then(function(response) {
                      origin1 = JSON.parse(response).cities[0].codeIataCity;
                      // console.log(response);
                      console.log(origin1);
                      // $("#results").append("<br>" + origin1 +" = Origin Airport Code");
                      city2Airport();
                      console.log(selectedObj.selectedVenueCity.split(",")[0]);
                  })
              }
              // Aviation Edge API for Converting Event City Into Airport Code
              
          function city2Airport() {
              var city = selectedObj.selectedVenueCity.split(",")[0];
              var queryURL = "https://cors-anywhere.herokuapp.com/https://aviation-edge.com/v2/public/autocomplete?key=784b29-c30a1a&city=" + city;
              $.ajax({
                  url: queryURL,
                  method: "GET",
              }).then(function(response) {
              destination1 = JSON.parse(response).cities[0].codeIataCity;
              // console.log(response);
              console.log(destination1);
              // $("#results").append("<br>" + destination1 +" = Destination Airport Code");
              flightPrices();
          })
          }
          
      
      // Kajak API for Pulling Flight Data and Prices
      
      function flightPrices() {
      
          var origin2 = destination1;
          var destination2 = origin1;
          var departDate1 = departDate;
          var returnDate1 = returnDate;
          var queryURL = "https://cors-anywhere.herokuapp.com/https://apidojo-kayak-v1.p.rapidapi.com/flights/create-session?origin2="+ origin2 +"&departdate2="+ returnDate1+"&destination2="+destination2+"&origin1="+origin1+"&destination1="+destination1+"&departdate1="+departDate1+"&cabin=e&currency=USD&adults=1&bags=0";
          // console.log(queryURL)
          $.ajax({
              url: queryURL,
              method: "GET",
              headers: {
                  "X-RapidAPI-Key": "871ca5bc58msh49221186130d315p1ac36ajsn31db79bd12d4",
                  }      
          }).then(function(response) {
          console.log(response.cheapestPrice);
          $("#flights").empty();
          console.log(response);
          // $("#results").append("<br> Flights Starting From: $"+ response.cheapestPrice);
          $("#flights").append($("<h1>").attr("style","color: #56DAA1").text(" Flight options as low as: $"+response.cheapestPrice))
          $("#footerInfo").empty();
          $("#footerInfo").append("Trip Total: $" + (response.cheapestPrice + parseInt(selectedTicketPrice)));
          console.log(parseInt(selectedTicketPrice));
          })
      }
  
  /* 
  Itinerary Builder End
  */
  
});

});

});
});
  

