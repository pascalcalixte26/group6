    // Event listener for all button elements
    $("button").on("click", function() {
        // In this case, the "this" keyword refers to the button that was clicked
        var person = $(this).attr("data-person");
        var keyword = "cardi+b";
        // Constructing a URL to search Ticketmaster for list of events by keyword entered
      var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?keyword=" + keyword + "&apikey=Hvspzyaf9sT79FRlHNKREkFSLhoIZkDW";
  
      $.ajax({url: queryURL, method: "GET" }).then(function(response) {
      var jString = JSON.stringify(response);
      var eventObj = JSON.parse(jString);
  
      // eventObj loop to access JSON key values
      for (var i=0; i < 10; i++) {
      var listDiv = $("<div>");
      var eventName = $("<p>").text("Event: " + eventObj._embedded.events[i].name);
      var eventPic = $("<img>").attr("src", eventObj._embedded.events[i].images[i].url);
      var eventDates = $("<p>").text("Event Date: " + eventObj._embedded.events[i].dates.start.localDate);
      var eventVenueName = $("<p>").text("Venue: " + eventObj._embedded.events[i]._embedded.venues[0].name);
      var eventVenueCity = $("<p>").text("City: " + eventObj._embedded.events[i]._embedded.venues[0].city.name + ", "+ eventObj._embedded.events[i]._embedded.venues[0].state.stateCode);
      var eventPrices = $("<p>").text("Min Price: ");
      // var eventBuyLink = $("<p>").append($("<a>").attr("src", ventObj._embedded.events[i].url));
  
      // console.log("Event Name " + eventObj._embedded.events[i].name);
      // console.log("Image: " + eventObj._embedded.events[i].images[1]);
      // console.log("");
      eventTotal = $("<div>").append(
      eventName,
      eventPic,
      eventDates,
      eventVenueName,
      eventVenueCity,
      eventPrices
      );
      // NOTE: Create <div> with id="results" for the results to display properly
      $("#results").append(eventTotal);
      }
  });
  
});

/* PseudoCode! 


naming convention:
user() anything to do with user: userLocation
music() anything to do with music  for instance: musicForm, musicArtist, musicEvents, musicEventLocation(s), musicEventCost
flights  flightList flightCost flightChosen
weather weatherLocation weatherExpected  



document ready

on page load ask for location and store it in userLocation variable 

input form:
add enter or button press for musicForm and store it in musicArtist 

then ajax query ticket master and send musicArtist into query URL and return response
do we store responses in response or do we create a variable musicResponses

then we have for loop to append events and create unique divs for each response into musicResponse div. we need to have
event name
event date
event location
event cost
event description (if possible)
event image (if possible)

then we need to have a click listener for musicRespnse[i] and pull info from that div into next ajax

next div scroll after the click of music response

will you be traveling for this event?

no or yes + input form and button with yes, (validate this input to make sure it is a valid zip code)
--wis there a library to use to validate this?
no then bypass flights and use event location to build ajax query for weather api and budget trip api

weather api: (maybe rename this climate API) (historical data on location) example: grab month from date and print: 
Durind the month of March, the average temperature for () is (). How can we incorporate rain info?
input zip code 
input date


build your budget api, use zip code if possible unless we need to add a library to turn zip code into city, then we also need to have an if else statmenent 





we need a flight API
get ticketmaster API up and running
get weather api for

 */