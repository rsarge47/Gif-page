console.log("js is linked");

var topics = ["Inuyasha", "Bleach", "Bugs Bunny", "The Lion King", "Animaniacs", "Rug Rats", "Doug", "Ren and Stimpy",
    "Simpsons", "Family Guy", "Futurama", "Dark Wing Duck", "Tiny Toons", "Gummy Bears", "Vampire Hunter D"];

function logCartoonName() {
    var cartoonName = $(this).attr("data-name");
    console.log("Clicked button :" + cartoonName);
}
function renderButtons() {
    $("#cartoon-buttons").empty();

    for (var i = 0; i < topics.length; i++) {
        var a = $("<button>");
        a.addClass("cartoon");
        a.attr("data-name", topics[i]);
        a.text(topics[i]);
        
        $("#cartoon-buttons").append(a);
    }
}

$("#add-cartoon").on("click", function(event) {
    event.preventDefault();

    var cartoon = $("#cartoon-input").val().trim();
    console.log(cartoon);    
    topics.push(cartoon);

    renderButtons();
});

function displayCartoonPics() {

    var cartoon = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + cartoon + "&api_key=x2OxiOarYR12Q6xmC4hdgi6GGplWEOc6&limit=10";
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {

        var results = response.data;

        for (var i = 0; i < results.length; i++) {            
            var gifDiv = $("<div class='item'>");            
            var rating = results[i].rating;            
            var p = $("<p>").text("Rating: " + rating);            
            var cartoonImage = $("<img>");            
            cartoonImage.attr("src", results[i].images.fixed_height_still.url);
            cartoonImage.attr("data-still", results[i].images.fixed_height_still.url);
            cartoonImage.attr("data-animate", results[i].images.fixed_height.url);
            cartoonImage.attr("data-state", "still");
            cartoonImage.addClass("gif");            
            gifDiv.append(cartoonImage);
            gifDiv.append(p);
            $("#cartoons").prepend(gifDiv);            
        }
    });
};

function changePics(){
    var state = $(this).attr('data-state');
        console.log(state);

      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      }else if (state === "animate") {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
}

$(document).on("click", ".cartoon", logCartoonName);
$(document).on("click", ".cartoon", displayCartoonPics);
$(document).on("click", ".gif", changePics);

renderButtons();