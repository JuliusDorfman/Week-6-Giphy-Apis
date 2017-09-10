$(document).ready(function() {



    var topics = ['bauble', 'bibelot', 'curio', 'gewgaw', 'trinket', 'memento', 'souvenir', 'trifle', 'tchotchke'];
    var topic
    // var xhr = $.get("http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=YOUR_API_KEY&limit=5");
    // xhr.done(function(data) { console.log("success got data", data); });

    renderButtons();
    displayGifTopics();


    function renderButtons() {
        $("#topics-view").empty();
        $("#topics-input").empty();

        for (var i = 0; i < topics.length; i++) {
            $("<button>")
                .addClass("topics")
                .attr("data-name", topics[i])
                .text(topics[i])
                .appendTo("#topics-view");
        }
    }



    $("#add-topic").on("click", function(event) {
        event.preventDefault();
        var topic = $("#topics-input").val().trim();
        topics.push(topic);
        console.log('', topic);
        renderButtons();
    })

    function displayGifTopics() {
        var topic = "doggo"

        var APIKey = "b125d4bd9c944a569e79853e63c3b4ba";
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=" + APIKey + "&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response) {
            $('topics-view').append(queryURL)
        });

    }



    // }

});