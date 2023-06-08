var numbers = ["one","two","three","four"];
var bot = [];
var user = [];

var hints = 3;
var level = 0;
var start = false;

$(document).click(function(evt){
    if (evt.target!=button){
        $("h2").slideUp();
        if (!start){
            next_elt_bot();
            start = true;
        } 
    }
});

$(".start").click(function(){
    $("h2").slideUp();
    if (!start){
        next_elt_bot();
        start = true;
    } 
});

$(document).keydown(function(){
    $("h2").slideUp();
    if (!start){
        next_elt_bot();
        start = true;
    } 
});

$(document).keydown(function(event){
    switch (event.key) {
        case "1":
            user.push("one");
            playSound("one");
            pressed_btn("one");
            check_ans(user.length-1);
            break;
        
        case "2":
            user.push("two");
            playSound("two");
            pressed_btn("two");
            check_ans(user.length-1);
            break;

        case "3":
            user.push("three");
            playSound("three");
            pressed_btn("three");
            check_ans(user.length-1);
            break;

        case "4":
            user.push("four");
            playSound("four");
            pressed_btn("four");
            check_ans(user.length-1);
            break;
    
        default:
            break;
    }
});

$(".button").click(function(){
    var btn_nb = $(this).attr("id");
    user.push(btn_nb);

    playSound(btn_nb);
    pressed_btn(btn_nb);

    check_ans(user.length-1);
});

$("button").click(function(){
    if (hints>0){
        $("h2").slideDown();

        setTimeout(function(){
            $("h2").slideUp();
        },2000);

        hints--;

        $("span").text(hints);
    }
});

/////////////////////////////////////

function next_elt_bot(){
    level++;
    $("h1").text("Level " + level);
    user = [];

    var nb = Math.floor(Math.random()*4);
    var random_num = numbers[nb]; 
    bot.push(random_num);

    playSound(random_num);
    pressed_btn(random_num);

    $("h2").text(bot);
}

function check_ans(level){
    if (user[level]===bot[level]){
        console.log("Succes");

        if (user.length===bot.length){
            setTimeout(function(){
                next_elt_bot()
            },1000);
        }
    }
    else{
        console.log("Wrong");
        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },300);

        $("h1").text("Game Over, Press Any Key to Restart");

        restart();
    }
}

function restart(){
    level = 0;
    hints = 3;
    bot = [];
    start = false;
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function pressed_btn(button){
    $("#" + button).addClass("pressed");
    setTimeout(function(){
        $("#" + button).removeClass("pressed");
    },200);
}

