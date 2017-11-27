var cards;
shapes = [
    'oval',
    'diamond',
    'squiggle'
];
quantities = [
    'one',
    'two',
    'three'
];
colours = [
    'red',
    'green',
    'purple'
];
fills = [
    'solid',
    'hollow',
    'hashed'
];

$(function(){
    var cardHolder = $('.card-holder');
    newDeck();

    $('.card-holder').on('click', '> div', function(){
        $(this).toggleClass('selected');
        if($('.selected').length == 3){
            if( doesItMatch() ){
                $('body').addClass('correct');
                setTimeout( function(){
                    $('body').removeClass('correct');
                    $('.selected').remove();
                    cardHolder.removeClass('extra');

                    if( $('.card-holder > div').length == 9){
                        addCards(3);
                    }
                }, 500);
            } else {
                $('body').addClass('wrong');
                setTimeout( function(){
                    $('body').removeClass('wrong');
                    $('.selected').removeClass('selected');
                }, 500);
            }
        }
    });
    $('.no-matches').click( function(){
        if( $('.card-holder > div').length == 12 ){
            addCards(3);
        }
    });
    $('.new-game').click( function(){
        newDeck();
        $('.scores').find('span').html(0);
        cardHolder.removeClass('extra');
    });
    $('.add-scores').click( function(){
        var people = prompt("Add player names seperated by a comma", "Vicky, Jamie");

        var scoreArea = $('.scores');
        if (people != null && people != "") {

            var arrPeople = people.split(',');
            for (var p = 0; p<arrPeople.length; p++){
                var score = $('<div>', { 
                    'html': arrPeople[p].trim() + ": <span>0</span>"
                }).click( function(){
                    $(this).find('span').html(  parseInt( $(this).find('span').html() ) + 1 );
                }).appendTo(scoreArea);
            }
        } 
    });

    function addCards(number){
        if( cards.length > 0 ){
            for (var i = 0; i<number; i++){
                cardDiv = $('<div>', { 
                    'class': cards[0]
                }).append( $('<div>'), $('<div>'), $('<div>') );
                cardDiv.appendTo( cardHolder );

                cards.splice(0, 1);
            }
            if(cards.length == 0){
                $('.no-matches').remove();
            }
            if( $('.card-holder > div').length == 15){
                cardHolder.addClass('extra');
            }
        }
    }

    function doesItMatch(){
        var cardOne = $('.selected').eq(0).attr('class').split(' ');
        var cardTwo = $('.selected').eq(1).attr('class').split(' ');
        var cardThree = $('.selected').eq(2).attr('class').split(' ');

        var setMatches = true;
        for (var i = 0; i<4; i++){
            if( cardOne[i] == cardTwo[i] ){
                if(cardThree[i] != cardOne[i]){
                    setMatches = false;
                }
            } else {
                if( cardThree[i] == cardOne[i] || cardThree[i] == cardTwo[i] ){
                    setMatches = false;
                }
            }
        }
        return setMatches;
    }

    function newDeck(){
        cards = [];
        for (var s = 0; s<shapes.length; s++){
            var shape = shapes[s];
            for (var q = 0; q<quantities.length; q++){
                var quantity = quantities[q];
                for (var c = 0; c<colours.length; c++){
                    var colour = colours[c];
                    for (var f = 0; f<fills.length; f++){
                        var fill = fills[f];
                        var cardClass = shape + ' ' + quantity + ' ' + colour + ' ' + fill;
                        cards.push(cardClass);
                    }
                }
            }
        }
        cards = cards.reduce((a,v)=>a.splice(Math.floor(Math.random() * a.length), 0, v) && a, []);

        cardHolder.empty();
        addCards(12);
    }
});