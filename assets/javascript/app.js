var animals = ["kitten",
  "puppy",
  "turtle",
  "falcon",
  "bunny",
  "frog",
  "chipmunk",
  "lizard",
  "shark",
  "dolphin",
  "cow",
  "chicken",
  "hedgehog",
  "penguin",
  "lion",
  "zebra"];

// Function to render buttons
function renderButtons() {

  // Empty the gif buttons array
  $("#giphy-buttons").empty();

  // Dynamically generate buttons for each animal in the array. 
  for (var i = 0; i < animals.length; i++) {

    // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
    var a = $("<button>");

    // Adding classes to button
    a.addClass("animal btn btn-primary");

    // Adding a data-attribute
    a.attr("data-name", animals[i]);

    // Add text to the button
    a.text(firstUpperCase(animals[i]));
    // Adding the button to the HTML
    $("#giphy-buttons").append(a);
  }
};

// Function to capitalize the first letter of a word. 
function firstUpperCase(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}



$(document).ready(function () {
  renderButtons();
  $("#animal-search").on("click", function(event) {

  	event.preventDefault(); //Prevents an event's default behavior (ex: stopping submit button from submitting a form when clicked)

  	var animal = $("#animal-input").val().trim(); //sets variable animal to inputted form value
  	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=w5jW58lIwZV8xLAzlT1P6YZ0DfyIYhX8&limit=10"; //creates queryURL with search item

  	animals.push(animal);

    // calling renderButtons which handles the processing of our movie array
    renderButtons();

    $.ajax({ //Ajax call
      url: queryURL,
      method: "GET"
    }).done(function(response) {
      // Storing an array of results in the results variable
          var results = response.data;

          // Looping over every result item
          for (var i = 0; i < results.length; i++) {

            // Only taking action if the photo has an appropriate rating
            if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
              // Creating a div with the class "item"
              var gifDiv = $("<div class='item'>");

              // Storing the result item's rating
              var rating = results[i].rating;

              // Creating a paragraph tag with the result item's rating
              var p = $("<p>").text("Rating: " + rating);

              // Creating an image tag
              var personImage = $("<img>");

              // Giving the image tag an src attribute of a proprty pulled off the
              // result item
              personImage.attr("src", results[i].images.fixed_height.url);

              // Appending the paragraph and personImage we created to the "gifDiv" div we created
              gifDiv.append(p);
              gifDiv.append(personImage);

              // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
              $("#giphy-here").prepend(gifDiv);
    				};
					};
        });
    });


  $("btn").on("click", function () {
      console.log("FIRSE")
      // In this case, the "this" keyword refers to the button that was clicked
      var animal = $(this).attr("data-name");

      // Constructing a URL to search Giphy for the name of the person who said the quote
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=w5jW58lIwZV8xLAzlT1P6YZ0DfyIYhX8&limit=10";

      // Performing our AJAX GET request
      $.ajax({
          url: queryURL,
          method: "GET"
        })
        // After the data comes back from the API
        .done(function(response) {
          // Storing an array of results in the results variable
          var results = response.data;

          // Looping over every result item
          for (var i = 0; i < results.length; i++) {

            // Only taking action if the photo has an appropriate rating
            if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
              // Creating a div with the class "item"
              var gifDiv = $("<div class='item'>");

              // Storing the result item's rating
              var rating = results[i].rating;

              // Creating a paragraph tag with the result item's rating
              var p = $("<p>").text("Rating: " + rating);

              // Creating an image tag
              var personImage = $("<img>");

              // Giving the image tag an src attribute of a proprty pulled off the
              // result item
              personImage.attr("src", results[i].images.fixed_height.url);

              // Appending the paragraph and personImage we created to the "gifDiv" div we created
              gifDiv.append(p);
              gifDiv.append(personImage);

              // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
              $("#giphy-here").prepend(gifDiv);
            }
          }
        });
    });

renderButtons();
});