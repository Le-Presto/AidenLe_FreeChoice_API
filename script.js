//Calling the API.
$(document).ready(function () {
    $.ajax({
        url: "https://ghibliapi.herokuapp.com/films/",
        type: 'GET',
        crossDomain: true,
        dataType: 'jsonp',
        success: function (result) {
            console.log(result);
            gen(result);
            ghibli = result
        },
        error: function () {
            alert('Failed!');
        }
    });
});

//The API object
var ghibli;


//The images for each movie
var imageURLS = [ "https://i.imgur.com/0ucDE0p.gif",
    "http://78.media.tumblr.com/f53f7cdf388c35e7514f292b4b0d7774/tumblr_o33zycAkQP1t06ubmo3_500.gif",
    "https://media1.giphy.com/media/tdUU2aQNhzvnq/giphy.gif",
    "https://i.imgur.com/INaFQ4S.gif",
    "https://media.giphy.com/media/GqFsCuaXxZE8E/giphy.gif",
    "https://m.popkey.co/1429f0/ZpEeX.gif",
    "https://i.kinja-img.com/gawker-media/image/upload/t_original/1342803976060898447.gif",
    "https://media.giphy.com/media/Vm81450Dup7he/giphy.gif",
    "https://media.giphy.com/media/QJYIz11G2vhte/giphy.gif",
    "http://3.bp.blogspot.com/-P2JOzMtaMkY/Uzqs_-OWtHI/AAAAAAAADu8/VEG_RI7F0sI/s1600/tumblr_ms9m7wF13K1rnvc1co1_500.gif",
    "https://media.giphy.com/media/liUhPmZdArpYc/giphy.gif",
    "https://i.imgur.com/viFoTMz.gif",
    "https://media.giphy.com/media/wUCgLRvDdtWs8/giphy.gif",
    "https://media2.giphy.com/media/puQUWzJj4rigg/giphy.gif",
    "https://media.giphy.com/media/GpUTbMw7OLwA0/giphy.gif",
    "https://78.media.tumblr.com/e326cc17ab12e11733db9c7a1c0f338a/tumblr_p10ue6UweO1u9yjwjo1_500.gif",
    "http://24.media.tumblr.com/tumblr_m7i13jaoGT1qkpz7co1_500.gif",
    "https://media.giphy.com/media/QApLqn6OXedfG/source.gif",
    "https://media1.giphy.com/media/BZw3CZoYTfH9K/giphy.gif",
    "https://media.giphy.com/media/z80GZLYvGg0lG/giphy.gif"
];


//Decreases the opacity of a button when the cursor moves over it.
function animateButtonEnter(a) {
        var button = $("#"+a);
        button.mouseenter(function(){
            button.animate({opacity: '0.6'});
        });
        button.mouseleave(function(){
            button.animate({opacity: '1'});
        });
}



//generates the buttons.
function gen(json) {

    for(var i=0;i<json.length;i++) {
        var key = json[i].id;
        $("#initButt").append("<button class='movieButton' onclick='getMovieInfo("+ i +")' id='"
            + key + "' value='"
            + key + "'>" + json[i].title + "</button>"
            + "<br><br>");
        $("#"+key).css("background-image", "url('" + imageURLS[i] + "')");
        $("#initButt").animate({opacity: '1'});
        animateButtonEnter(key);
    }
    return json;
}



//For navigation convenience, pageScroll keeps track of how far down the user scrolled through buttons,
//so that when "back" is pressed, they aren't snapped to the top of the page.
var pageScroll = 0;



//when a button is pressed, this function populates movieInfo with information on the corresponding movie.
function getMovieInfo(a) {
    pageScroll = window.scrollY;
    $("#initButt").hide();
    var result = $("#movieInfo");
    result.children().empty();
    result.show();
    $("#image").append("<img src='" + imageURLS[a] + "' width='500' height='250'>");
    $("#movieHeader").append(ghibli[a].title);
    $("#description").append(ghibli[a].description + "<br>");
    $("#director").append("Directed by " + ghibli[a].director + ".<br><br>");
    $("#release").append("Released in " + ghibli[a].release_date + ".<br><br>");
    $("#rtScore").append("Rotten Tomatoes™ Freshness: " + ghibli[a].rt_score + "<br><br>");
    console.log(ghibli[a]);
    result.append("<button class=\"mtext\" id=\"back\" onclick=\"back()\">Back</button>");

    window.scrollTo(0, 0);
}



//When the user is finished reading a movie description,
//they can press the "back" button which calls this function to take them back to
//where they left off on the button page.
function back(){
    $("#initButt").show();
    $("#mtext").empty();
    $("#movieInfo").children().empty();
    $("#back").remove();
    window.scrollTo(0, pageScroll);
}