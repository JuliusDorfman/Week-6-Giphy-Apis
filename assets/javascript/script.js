$(document).ready(function() {
    console.log('', "ready");

    var topics = ['bauble', 'bibelot', 'curio', 'gewgaw', 'trinket', 'memento', 'souvenir', 'trifle', 'tchotchke'];
    var topic;

    var api = {
        baseURL: "http://api.giphy.com/v1/gifs/search?q=",
        queryParameters: {
            apiKey: "b125d4bd9c944a569e79853e63c3b4ba",
            topic: "test",
            limit: 10
        },
        queryURLGet: function() {
            var queryURL = "";
            queryURL = api.baseURL + api.queryParameters.topic + "&api_key=" +
                api.queryParameters.apiKey + "&limit=" + api.queryParameters.limit;
            return queryURL
        },
    }


    function renderButtons() {
        $("#topics-view").empty();
        $('#topics-input').val('Input New Topic');
        for (i = 0; i < topics.length; i++) {
            $("<button>")
                .addClass("topics")
                .attr("data-name", topics[i])
                .text(topics[i])
                .appendTo("#topics-view");
                console.log('', "rendered");
        }
    }


    renderButtons();


    $('#topics-input').on('click', function(event) {
        $('#topics-input').val('')
    })


    $("#add-topic").on("click", function(event) {
        event.preventDefault();
        if (($('#topics-input').val() !== '') && ($('#topics-input').val() !== 'Input New Topic')) {
            var topic = $("#topics-input").val().trim();
            topics.push(topic);
            console.log('', "posted new topic");
            renderButtons();
        } else {
            $('#topics-input').val('Input New Topic');
        }
        console.log('', "finish posted new topic");
    })

    $('.topics').on('click', function(event) {
        console.log('', "api request initiated");
        $.ajax({
            url: api.queryURLGet(),
            method: "GET"
        }).done(function(response) {
            // instead of asking for "success" or "fail" give specific parameters to search for that will return the Boolean true or false 
            // if (topics.length) {
            for (i = 0; i < response.data.length; i++) {
                console.log('', i);
                var gifDiv = $("<div class='gif'>");
                var gifURL = response.data[i].images.fixed_height_still.url;
                var gif = $("<img>").attr("src", gifURL)
                $("#topic-pic").append(gifDiv)
                gifDiv.append(gif);
                console.log('', gifURL);
            }
            // } else {
            //     console.log('', 'Unable to connect to Giphy');
            // }
            // console.log('', "api request completed");
        })
    })
})



// pregenerate buttons
// apply properties
// be able to use the input field to generate more buttons and immediately apply same properties to those buttons
// should request a response to see if valid search on giffy website or do not allow creation of button
// input field should empty upon clicking submit
// buttons should have a click event handler when clicked on should populate the screen with related gifs
// this gifs should all have button even click properties that should start and stop the animation
// Utilize CALLBACK FUNCTION within


// assign data attributes to our gifs via for loop. 
// two different attributes - one referencing 1 source. sources provided by giphy.
// using this will reference only the object in the page we are clicking on