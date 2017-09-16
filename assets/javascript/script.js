$(document).ready(function() {
    console.log("ready");

    var topics = ['rain', 'storm', 'snow', 'hurricane', 'earthquake', 'sleet', 'hail', 'sun', 'daybreak', 'sunset'];
    var unacceptableValues = ['', 'input new topic', 'duplicate topic detected', 'invalid input or duplicate topic'];

    var api = {
        baseURL: "http://api.giphy.com/v1/gifs/search?q=",
        queryParameters: {
            apiKey: "b125d4bd9c944a569e79853e63c3b4ba",
            limit: 10
        },
        queryURLGet: function(topic) {
            var queryURL = "";
            queryURL = api.baseURL + topic + "&api_key=" +
                api.queryParameters.apiKey + "&limit=" + api.queryParameters.limit;
            return queryURL
        },
    }


    function renderButtons() {
        $("#topics-view").empty();
        $('#topics-input').val('Input New Topic');
        for (i = 0; i < topics.length; i++) {
            $("<button>")
                .addClass("topics btn-info")
                .attr("data-name", topics[i])
                .text(topics[i])
                .appendTo("#topics-view");
        }
    }


    renderButtons();


    function duplicateCheck(topic, topics) {
        for (i = 0; i < topics.length - 1; i++) {
            if ((topic !== topics[i]) && (topic !== unacceptableValues[i])) {
                console.log('unacceptableValues', unacceptableValues[i]);
            } else {
                $("#topics-input").val("Invalid Input or Duplicate Topic")
                return
            }
        }
        newButton(topic)
    }


    function newButton(topic) {
        $("<button>")
            .addClass('topics btn-info')
            .attr('data-name', topic)
            .text(topic)
            .appendTo("#topics-view");
    };




    $('#topics-input').on('click', function(event) {
        $('#topics-input').val('')
    });

    // $('#topics-input').on('mouseleave', function(event) {
    //     $('#topics-input').val("Input New Topic")
    // });

    $("#add-topic").on("click", function(event) {
        event.preventDefault();
        for (i = 0; i < unacceptableValues.length - 1; i++) {
            if ($('#topics-input').val() !== unacceptableValues[i]) {
                topic = $("#topics-input").val().trim().toLowerCase();
                topics.push(topic);
                duplicateCheck(topic, topics);
            } else {
                $('#topics-input').val('Input New Topic');
                console.log('', "No New Topic");
            }
        }
    })

    $('body').on('click', 'button.topics', function(event) {
        console.log('', "api request initiated");
        var topic = $(this).data("name").trim().toLowerCase();
        $.ajax({
            url: api.queryURLGet(topic),
            method: "GET"
        }).done(function(response) {
            if (topics.length) {
                $('#topic-pic').html('')
                for (i = 0; i < response.data.length; i++) {
                    var gifDiv = $("<div class='gif'>");
                    var stillGifURL = response.data[i].images.fixed_height_still.url;
                    var activeGifURL = response.data[i].images.fixed_height.url;
                    var gif = $("<img>")
                        .attr("src", stillGifURL)
                    $("#topic-pic")
                        .append(gifDiv)
                    gifDiv.append(gif);
                    console.log('', "api request completed");
                }
            } else {
                console.log('', 'Unable to connect to Giphy');
            }
        })
    })

    $("#topic-pic").on('click', '.gif img', function(event, topic, data) {
        var topic = $(this).attr("src")
        console.log('', topic);
        $.ajax({
            url: api.queryURLGet(topic),
            method: "GET"
        }).done(function(response) {
            console.log('', response.data);
            console.log('', stillGifURL);
            var stillGifURL = response.data.images.fixed_height_still.url;
            var activeGifURL = response.data.images.fixed_height.url;
            console.log('', activeGifURL);


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