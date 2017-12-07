$(document).ready(function(){

	var animals = ["kitten", "puppy", "turtle", "falcon", "bunny", "frog", "chipmunk", "lizard", "shark", "dolphin", "cow", "chicken", "hedgehog", "penguin", "lion", "zebra"];

  $("#animal-search").on("click", function(event) {

  	event.preventDefault(); //Prevents an event's default behavior (ex: stopping submit button from submitting a form when clicked)

  	var animal = $("#animal-input").val().trim(); //sets variable animal to inputted form value
  	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=w5jW58lIwZV8xLAzlT1P6YZ0DfyIYhX8&limit=5"; //creates queryURL with search item

  	animals.push(animal);

    // calling renderButtons which handles the processing of our movie array
    renderButtons();

    $.ajax({ //Ajax call
      url: queryURL,
      method: "GET"
    }).done(function(response) {
      console.log(queryURL);
    });

    function renderButtons() {

        // Deleting the movie buttons prior to adding new movie buttons
        // (this is necessary otherwise we will have repeat buttons)
    $("#giphy-buttons").empty();

        // Looping through the array of movies
        for (var i = 0; i < animals.length; i++) {

          // Then dynamicaly generating buttons for each movie in the array.
          // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class
          a.addClass("animal");
          // Adding a data-attribute with a value of the movie at index i
          a.attr("data-name", animals[i]);
          // Providing the button's text with a value of the movie at index i
          a.text(animals[i]);
          // Adding the button to the HTML
          $("#giphy-buttons").append(a);
        }
      };

      // // This function handles events where one button is clicked
      // $("#animal-input").on("click", function(event) {
      //   // event.preventDefault() prevents the form from trying to submit itself.
      //   // We're using a form so that the user can hit enter instead of clicking the button if they want
      //   event.preventDefault();

      //   // This line will grab the text from the input box
      //   var animal = $("#animal-input").val().trim();
      //   // The movie from the textbox is then added to our array
      //   animals.push(animal);

      //   // calling renderButtons which handles the processing of our movie array
      //   renderButtons();
      // });

      // // Calling the renderButtons function at least once to display the initial list of movies
      // renderButtons();















	});
});