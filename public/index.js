const bugImages = ["bug1.png", "bug2.png", "bug3.png", "bug4.png"];
let gameDiv = document.getElementById("gameDiv");
let countdownSpan = document.getElementById("countdownSpan");
let scoreSpan = document.getElementById("scoreSpan")
let countdown = 10, score = 0;
let startTime;

function bugholeHTML(left, top, imgUrl) {
    return `
    <div class="bugOuter" style="left: ${left}px; top: ${top}px;">
        <div class="bugHole"></div>
        <div class="bug" style="background-image: url('${imgUrl}')"></div>
    </div>`;
}

for(let row = 0; row < 4; row++) {
    for(let column = 0; column < 4; column++) {
        let bugImg = bugImages[Math.floor(Math.random()*bugImages.length)];
        gameDiv.innerHTML += bugholeHTML(column*100, row*100, bugImg);
    }
}
const bugs = document.getElementsByClassName("bug");
console.log(bugs);

for(let i = 0; i<bugs.length; i++) {
    bugs[i].onclick = splat;
}

function splat(event) {
    let obj = event.currentTarget;
    if(!obj.classList.contains("splat")) {
        obj.classList.add("splat");
        score ++;
        setTimeout(function() {
            obj.classList.remove("splat")
        }, 2000);
    }
}

function animate(obj) {
    console.log(obj);
    obj.style.top = "0px";
    obj.classList.add("popup");
    setTimeout(function() {
        obj.classList.remove("popup");
        obj.style.top = "100px";
        obj.classList.add("hideagain");
        setTimeout(function() {
            obj.classList.remove("hideagain");
        }, 1500);
    }, 2000);
}

function onTick() {
    let elapsed = (Date.now() - startTime)/1000;
    console.log(elapsed);
    countdown = 20 - Math.floor(elapsed);
    if(countdown >= 0) {
        countdownSpan.innerHTML = countdown;
        scoreSpan.innerHTML = score;

        // start animations
        for(let i = 0; i < bugs.length; i++) {
            if(elapsed < 19.0 && Math.floor(Math.random()*16 < 0.1)) {
                if(!bugs[i].classList.contains("popup") && !bugs[i].classList.contains("hideagain")) {
                    console.log("animating " + i);
                    animate(bugs[i]);    
                }
            }
        }
        setTimeout(onTick, 50);
    } else {
        document.getElementById("startButton").style.display = "inline-block";
        window.alert("You squashed " + score + " bugs!");
    }
}

function playGame() {
    document.getElementById("startButton").style.display = "none";
    playerName = document.getElementById("playerName").value;
    startTime = Date.now();
    score = 0;
    onTick();
}

document.getElementById("startButton").onclick = playGame;