var stateURL;

var themes = ['seaweed', 'dolphin', 'ocean', 'boat', 'sailboat', 'tsunami'];

var state = {
    still: 'still',
    animate: 'animate',
};

var displayGif = function(theme){
    
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
     theme + "&api_key=a3fb952892334b06b181a54805f8ef8a&limit=6";

    $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function (response) {
          console.log(response)
          var result = response.data;
          for (var i = 0; i < result.length; i++){
              var themeDiv = $('<div>');
              var p = $('<p>');
              var themeImage = $('<img>');

              p.html(result[i].rating);
              themeDiv.addClass('themeDiv');
              themeImage.attr('data-still', result[i].images.fixed_height_still.url);
              themeImage.attr('data-animate', result[i].images.fixed_height.url);
              themeImage.attr('data-state', state.still)
              themeImage.attr('src', result[i].images.fixed_height_still.url);
              themeImage.addClass('themeImage');
              themeDiv.append(themeImage);
              themeDiv.append(p);
              $('#gifSection').append(themeDiv);
          }
        });
};

var intBtn = function(){
    $("#btnSection").empty();

    for (var i = 0; i < themes.length; i++) {
        var btn = $('<button>')
        
        btn.addClass('theme');
        btn.attr('data-name', themes[i]);
        btn.text(themes[i]);
        $('#btnSection').append(btn);
    }
};

$(document).ready(function(){

    $('#btnSection').on('click', '.theme', function(){
        var theme = $(this).attr('data-name');
        $('#gifSection').empty();
        displayGif(theme);
    })
    
    $('#addBtnSection').on('click', '#addBtn', function(){
        var input = document.getElementById('userInput').value;
        console.log(input);
        themes.push(input);
        $('#btnSection').empty();
        intBtn();
    });

    $('#gifSection').on('click', '.themeImage', function(){
        console.log('hello');
        var state = $(this).data('state');
        if (state === 'still'){
            $(this).attr('src', $(this).data('animate'));
            $(this).data('state', 'animate');
        } else {
            $(this).attr('src', $(this).data('still'));
            $(this).data('state', 'still')
        }

        $('#addBtnSection').on('click', '#clearBtn', function() {
            themes = ['seaweed', 'dolphin', 'ocean', 'boat', 'sailboat', 'tsunami']
            $('#btnSection').empty();
            intBtn();
        });
    });
});


intBtn();