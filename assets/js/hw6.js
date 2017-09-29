$(document).ready(function(){
var animals = ["cat","dog", "kitty", "rabbit", "hamster", "skunk", "goldfish", "ferret", "turtle", "chinchilla"];
var results;


function makeButtons() {
	 $("#animal-buttons").empty();
	         $("#animal-input").val("");

	 

        // Looping through the array of animals
        for (var i = 0; i < animals.length; i++) {
          console.log(animals);
          //  dynamicaly generating buttons for each animal in the array.
         var button = $("<button>");
         console.log(button);
          // Adding a class
          button.addClass("animal");
          // Adding a data-attribute with a value of the animal at index i
          button.attr("data-name", animals[i]);
          console.log(button.attr("data-name"));
          //  button's text with a value of the animal at index i
          button.text(animals[i]);
          // Adding the button to page
          $("#animal-buttons").append(button);
          console.log(button);
        }
      }
      $("#add-animal").on("click", function(event) {
        event.preventDefault();
    if($("#animal-input").val()== ""){
      $("#animal-input").disable();
      $("#animal-input").enable();
    }

        //  grab the text from the input box
        var animal = $("#animal-input").val().trim();
        // The animal from the textbox is added to array
        animals.push(animal);
        makeButtons();
        console.log(animals);
     });

      makeButtons();
      console.log("hi");
      

      $(document).on("click", ".animal", function() {
      	$("#gifs-appear-here").empty(); 

      var animal = $(this).attr("data-name");
    
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=dc6zaTOxFJmzC&limit=10";

      $.ajax({
          url: queryURL,
          method: "GET"
        })
        .done(function(response) {
           results = response.data;
          console.log(results);

          for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div class='item'>");

             var name = results[i].rating;

            var p = $("<p>").text("Rating: " + name);

           var animalImage = $("<img>");
            animalImage.addClass("img");
            animalImage.attr("src", results[i].images.fixed_height_still.url);
            animalImage.attr({'data-animate' : results[i].images.fixed_height.url});
            animalImage.attr({'data-state' : "still"});
            animalImage.attr({'data-still' : results[i].images.fixed_height_still.url});
            gifDiv.append(p);
            gifDiv.append(animalImage);

            $("#gifs-appear-here").prepend(gifDiv);
           
          }
        });
    });
        $(document).on("click",".img",function() {
       	console.log("you click?");
       	 var state = $(this).attr('data-state');
         if (state === "still") {
         	console.log(state);
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }     
      // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
     
      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      // Then, set the image's data-state to animate
     
    });
     
      	

      
      
  
      


























});