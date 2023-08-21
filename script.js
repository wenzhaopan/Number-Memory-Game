$(document).on("keydown click", startGame);
$("#restart").toggle();


var audioLightUp = new Audio("sounds/lightUp.mp3");
var audioCorrect = new Audio("sounds/correct.mp3");
var audioWrong = new Audio("sounds/wrong.mp3");
//var alive=true;
var x=Math.floor(Math.random()*4+1);
arr=[];
var level=0;
var i=0;
var levelFinish=false;

async function startGame(){
    $(document).off("keydown click");
    $(".btn").click(a);
    await pause(1000);
    game();
}


async function game(){
    $(".btn").off("click");
    level++;
    $("#level-title").text("Level: "+level);
    x=Math.floor(Math.random()*4+1);
    arr.push(x);
    await pause(1000);
    for(i=0;i<level;i++){
        lightUp(arr[i]);
        await pause(600);
    }
    i=0;
    $(".btn").on("click", a);
}

async function lightUp(i){
    audioLightUp.play();
    var s="";
    if(i===1) s="#one";
    else if(i===2) s="#two";
    else if(i===3) s="#three";
    else s="#four";
    $(s).toggleClass("btnLightUp");
    await pause(200);
    $(s).toggleClass("btnLightUp");
}

function pause(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

async function a(event) {
    var curr=event.target.parentElement;
    var s=curr.id;
    s='#'+s;
    if((s==="#one" && arr[i]===1) || (s==="#two" && arr[i]===2) || (s==="#three" && arr[i]===3) || (s==="#four" && arr[i]===4)){
        audioCorrect.play();
        $(s).toggleClass("pressedRight");
        await pause(50);
        $(s).toggleClass("pressedRight");
        i++;
        if(i===level) {
            //alive=true;
            game();
        }
    }else{
        audioWrong.play();
        $(s).toggleClass("pressedWrong");
        await pause(50);
        $(s).toggleClass("pressedWrong");
        //alive=false;
        $("#level-title").text("Game Over, you reached level " + level);
        $("#restart").toggle();
        $(".btn").off("click");
        $(document).on("keydown click", async function(){
            $(document).off("keydown click");
            $("#restart").toggle();
            x=Math.floor(Math.random()*4+1);
            level=0;
            arr=[];
            i=0;
            levelFinish=false;
            $(document).off("keydown click");
            $(".btn").click(a);
            await pause(1000);
            game();
        });
    }
}