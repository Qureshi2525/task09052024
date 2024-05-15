// Tabs Script
        function openCity(evt, cityName) {
            var i, tabcontent, tablinks;
            tabcontent = document.getElementsByClassName("tabcontent");
            for (i = 0; i < tabcontent.length; i++) {
              tabcontent[i].style.display = "none";
            }
            tablinks = document.getElementsByClassName("tablinks");
            for (i = 0; i < tablinks.length; i++) {
              tablinks[i].className = tablinks[i].className.replace(" active", "");
            }
            document.getElementById(cityName).style.display = "block";
            evt.currentTarget.className += " active";
          }

/* 1 TO-DO LIST */

var myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("Remove");
  span.className = "close";
   span.appendChild(txt);
  myNodelist[i].appendChild(span);
}

// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    var div = this.parentElement;
    div.style.display = "none";
  }
}

// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
}, false);

function newElement() {
  var li = document.createElement("li");
  var inputValue = document.getElementById("myInput").value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === '') {
    alert("You must write something!");
  } else {
    document.getElementById("myUL").appendChild(li);
  }
  document.getElementById("myInput").value = "";

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("Remove");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
    }
  }
}

/* 2 SPEECH DETECTION */

const startButton = document.getElementById('startButton')
        const stopButton = document.getElementById('stopButton');
        const outputDiv = document.getElementById('output');
        const recognition = new webkitSpeechRecognition() || new SpeechRecognition();

        recognition.interimResults = true;
        recognition.continuous = true;

        startButton.addEventListener('click', () => {
            recognition.start();
            startButton.disabled = true;
            stopButton.disabled = false;
            startButton.textContent = 'Recording...';
        });

        stopButton.addEventListener('click', () => {
            recognition.stop();
            stopButton.disabled = true;
            startButton.disabled = false; 
            startButton.textContent = 'Start Recording';
        });

        recognition.onresult = event => {
            const result = event.results[event.results.length - 1][0].transcript;
            outputDiv.textContent = result;
        };
        
        recognition.onend = () => {
            stopButton.disabled = true;
            startButton.disabled = false;
            startButton.textContent = 'Start Recording';
        };
        
        recognition.onerror = event => {
            console.error('Speech recognition error:', event.error);
        };
        
        recognition.onnomatch = () => {
            console.log('No speech was recognized.');
        };

/* 3 GEOLOCATION */

function initMap(latitude, longitude) {
    const mapCenter = { lat: latitude, lng: longitude };
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: mapCenter
    });
    const marker = new google.maps.Marker({
        position: mapCenter,
        map: map
    });
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            document.getElementById('latitude').textContent = latitude;
            document.getElementById('longitude').textContent = longitude;
            initMap(latitude, longitude);
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

getLocation();

/* 4 MOVIE APP */

const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="'

const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')

// Get initial movies
getMovies(API_URL)

async function getMovies(url) {
    const res = await fetch(url)
    const data = await res.json()

    showMovies(data.results)
}

function showMovies(movies) {
    main.innerHTML = ''

    movies.forEach((movie) => {
        const { title, poster_path, vote_average, overview } = movie

        const movieEl = document.createElement('div')
        movieEl.classList.add('movie')

        movieEl.innerHTML = `
            <img src="${IMG_PATH + poster_path}" alt="${title}">
            <div class="movie-info">
          <h3>${title}</h3>
          <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
          <h3>Overview</h3>
          ${overview}
        </div>
        `
        main.appendChild(movieEl)
    })
}

function getClassByRate(vote) {
    if(vote >= 8) {
        return 'green'
    } else if(vote >= 5) {
        return 'orange'
    } else {
        return 'red'
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const searchTerm = search.value

    if(searchTerm && searchTerm !== '') {
        getMovies(SEARCH_API + searchTerm)

        search.value = ''
    } else {
        window.location.reload()
    }
})
        
/* 5 PASSWORD GENERATOR */

function generatePassword() {
    const length = document.getElementById('length').value;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_-+=";
    let password = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }
    document.getElementById('password').value = password;
}

/* 6 MEMORY MATCHING GAME */

const cards =  
    document.getElementsByClassName('card'); 
let allImages = document.getElementsByClassName('card-image'); 
let movesDisplay = document.querySelector('.move-counter'); 
let toggledCardsArray = []; 
let move = 0; 
let winCount = 0; 
const restart = document.getElementById('restart'); 
  
const imagesLinkArray = [ 
    { 
        id: 1, 
        image:  
'https://media.geeksforgeeks.org/wp-content/uploads/20231122102833/AngularImage.png', 
        newAlt: 'Angular Image'
    }, 
    { 
        id: 2, 
        image:  
'https://media.geeksforgeeks.org/wp-content/uploads/20231122102835/html5Image.png', 
        newAlt: 'HTML Image'
    }, 
    { 
        id: 3, 
        image:  
'https://media.geeksforgeeks.org/wp-content/uploads/20231122102834/JSImage.jpg', 
        newAlt: 'JavaScript Image'
    }, 
    { 
        id: 4, 
        image:  
'https://media.geeksforgeeks.org/wp-content/uploads/20231122102833/reactImage.png', 
        newAlt: 'React Image'
    }, 
    { 
        id: 5, 
        image:  
'https://media.geeksforgeeks.org/wp-content/uploads/20231122102833/vueImage.png', 
        newAlt: 'Vue Image'
    }, 
    { 
        id: 6, 
        image:  
'https://media.geeksforgeeks.org/wp-content/uploads/20231122102834/JSImage.jpg', 
        newAlt: 'JavaScript Image'
    }, 
    { 
        id: 7, 
        image:  
'https://media.geeksforgeeks.org/wp-content/uploads/20231122102833/vueImage.png', 
        newAlt: 'Vue Image'
    }, 
    { 
        id: 8, 
        image:  
'https://media.geeksforgeeks.org/wp-content/uploads/20231122102835/html5Image.png', 
        newAlt: 'HTML Image'
    }, 
    { 
        id: 9, 
        image:  
'https://media.geeksforgeeks.org/wp-content/uploads/20231122102834/CSS3Image.png', 
        newAlt: 'CSS Image'
    }, 
    { 
        id: 10, 
        image:  
'https://media.geeksforgeeks.org/wp-content/uploads/20231122102833/AngularImage.png', 
        newAlt: 'Angular Image'
    }, 
    { 
        id: 11, 
        image:  
'https://media.geeksforgeeks.org/wp-content/uploads/20231122102834/CSS3Image.png', 
        newAlt: 'CSS Image'
    }, 
    { 
        id: 12, 
        image:  
'https://media.geeksforgeeks.org/wp-content/uploads/20231122102833/reactImage.png', 
        newAlt: 'React Image'
    } 
] 
  
// function to restart the game 
const restartGame = () => { 
    let toggledCard =  
        document.getElementsByClassName('card toggled'); 
    imagesLinkArray.sort(() => Math.random() - 0.5); 
    Object.values(toggledCard).forEach(function (el) { 
        setTimeout(() => { 
            el.classList.remove("toggled"); 
        }, 0); 
    }) 
    toggledCardsArray.length = 0; 
    move = 0; 
    winCount=0; 
    movesDisplay.innerText = `Moves: ${move}`; 
    let allImagesSrc = document.getElementsByClassName('card-image'); 
    Object.values(allImagesSrc).forEach((el, index)=>{ 
        el.src = imagesLinkArray[index].image; 
        el.alt = imagesLinkArray[index].newAlt; 
        el.id = imagesLinkArray[index].id 
    })  
} 
restart.addEventListener('click', restartGame); 
  
//checking for the last clicked and current  
//clicked cards and applying changes accordingly 
for (var i = 0; i < cards.length; i++) { 
    cards[i].addEventListener('click', function () { 
        this.classList.add("toggled"); 
        toggledCardsArray.push(this); 
        let thisImgSrc = this.querySelector('.card-image').src; 
        let previousImgSrc =  
        toggledCardsArray[toggledCardsArray.length - 2].querySelector('.card-image').src; 
        if(thisImgSrc !== previousImgSrc) { 
            toggledCardsArray.forEach(function (el) { 
                setTimeout(() => { 
                    el.classList.remove("toggled"); 
                }, 500); 
            }) 
            toggledCardsArray.length = 0; 
            move++; 
        } 
        else{ 
            toggledCardsArray.length = 0; 
            move++; 
            winCount++; 
        } 
        movesDisplay.innerText = `Moves: ${move}`; 
        if(winCount===6){ 
            setTimeout(()=>{ 
                alert(`Congratulations!!! You won the game in ${move} moves.`) 
            }, 300) 
        } 
    }) 
}

/* 7 HANGMAN GAME */

/*
 * > Coded By Thomas Hj
 * > 31102016
 * 
 * > #31
 */

// Word selection
// New word = ["Word name", "Hint"]
var word = [["Hangman", "That game you are playing right now."], ["Thomas Hj", "About the creator of this game."], ["HTML", "Markup language for creating Web pages."], ["CSS", "Wep page styles"], ["PHP", "A very popular server scripting language."], ["JavaScript", "Make web-page dynamic without reload the web page."], ["Java", "Run 15 billion devices.\nA program can be run in Windows, Linux and Mac"], ["SoloLearn", "A company that everyone can code for fun and share."], ["Love", "What is ?\nBaby don't hurt me\nDon't hurt me\nNo more"], ["Document", "A lot of text in the a file."], ["Playground", "There school kids go to."], ["Run", "Usain bolt."], ["Code", "var hw = 'Hello World';"], ["Samsung", "A company create Phone, Tv, Monitor, SDD, Memory chip..."], ["Super Mario", "A very popular game in Nintendo 64 that have red hat."], ["Star", "Super Mario like to get."], ["Clock", "14:12 or 14pm"], ["Binary Clock", "A clock that only use 0 or 1."], ["Sword", "Link from Zelda have on the hand."], ["Girl", "Not boy but ?"], ["Boy", "Not girl but ?"], ["Female", "Other name as girl."], ["Male", "Other name as boy."], ["Smartphone", "Something you've always on you."]]

// Game keyboard
var tastatur = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

// Game memory
var select = 0
var wordLeft = []
var fail = 0

// Web-page onload
window.onload = function() {
    gId("moveKeybord").addEventListener('touchmove', function(e) {
        wH = window.innerHeight
        tY = e.touches[0].clientY
        eL = gId("tastatur")
        resY = wH - tY - eL.offsetHeight
        if(resY < 0) {
            resY = 0
        } else if(resY > wH / 2) {
            resY = wH / 2
        }
        eL.style.bottom = resY + "px"
    }, false)
    createTastur()
}

// Start game
function startGame() {
    gId("home").className = "h"
    gId("result").className = "h"
    newGame()
}

// New game
function newGame() {
    clearTastatur()
    clearPlayer()
    createWord()
}

// Clear keyboard
function clearTastatur() {
    var e = document.getElementsByClassName("b")
    for(a = 0; a < e.length; a++) {
        e[a].setAttribute("data", "")
    }
}

// Clear player
function clearPlayer() {
    fail = 0
    wordLeft = []
    gId("g0").setAttribute("data", "false")
    gId("g1").setAttribute("data", "false")
    gId("g2").setAttribute("data", "false")
    gId("g3").setAttribute("data", "false")
    gId("g4").setAttribute("data", "false")
    gId("g5").setAttribute("data", "false")
    gId("g5").setAttribute("r", "false")
    gId("g5").setAttribute("l", "false")
    gId("g6").setAttribute("data", "false")
    gId("g6").setAttribute("l", "false")
    gId("g6").setAttribute("r", "false")
    gId("hintButton").setAttribute("data", "false")
    gId("hint").style.display = "none"
}

// Get new word
function createWord() {
    var d = gId("letter")
    d.innerHTML = ""
    select = Math.floor(Math.random() * word.length)
    for(a = 0; a < word[select][0].length; a++) {
        var x = word[select][0][a].toUpperCase()
        var b = document.createElement("span")
        b.className = "l" + (x == " " ? " ls" : "")
        b.innerHTML = "&nbsp"
        b.id = "l" + a;
        d.appendChild(b)
        
        if(x != " ") {
            if(wordLeft.indexOf(x) == -1) {
                wordLeft.push(x)
            }
        }
    }
}

// Create keyboard
function createTastur() {
    var tas = gId("keybord")
    tas.innerHTML = ""
    for(a = 0; a < tastatur.length; a++) {
        var b = document.createElement("span")
        b.className = "b"
        b.innerText = tastatur[a]
        b.setAttribute("data", "")
        b.onclick = function() {
            bTas(this)
        }
        tas.appendChild(b)
    }
}

// Game check, If show next error / game end
function bTas(a) {
    if(a.getAttribute("data") == "") {
        var x = isExist(a.innerText)
        a.setAttribute("data", x)
        if(x) {
            if(wordLeft.length == 0) {
                gameEnd(true)
            }
        } else {
            showNextFail()
        }
    }
}

// If letter "X" exist
function isExist(e) {
    e = e.toUpperCase()
    var x = wordLeft.indexOf(e)
    if(x != -1) {
        wordLeft.splice(x, 1)
        typeWord(e)
        return true
    }
    return false
}

// Show next fail drawing
function showNextFail() {
    fail++
    switch(fail) {
        case 1:
            gId("g0").setAttribute("data", "true")
            break;
        
        case 2:
            gId("g1").setAttribute("data", "true")
            break;
        
        case 3:
            gId("g2").setAttribute("data", "true")
            break;
        
        case 4:
            gId("g3").setAttribute("data", "true")
            gId("hintButton").setAttribute("data", "true")
            break;
        
        case 5:
            gId("g4").setAttribute("data", "true")
            break;
        
        case 6:
            gId("g5").setAttribute("data", "true")
            break;
        
        case 7:
            gId("g5").setAttribute("l", "true")
            break;
        
        case 8:
            gId("g5").setAttribute("r", "true")
            break;
        
        case 9:
            gId("g6").setAttribute("data", "true")
            gId("g6").setAttribute("l", "true")
            break;
        
        case 10:
            gId("g6").setAttribute("r", "true")
            gameEnd(false)
            break;
    }
}

function typeWord(e) {
    for(a = 0; a < word[select][0].length; a++) {
        if(word[select][0][a].toUpperCase() == e) {
            gId("l" + a).innerText = e
        }
    }
}

// Game result
// function gameEnd(e) {
//     var d = gId("result")
//     d.setAttribute("data", e)
//     if(e) {
//         gId("rT").innerText = "You Win!"
//         gId("rM").innerHTML = "Congratulations, you found the word!<br/><br/>Good Job!"
//     } else {
//         gId("rT").innerText = "You Lose!"
//         gId("rM").innerHTML = "The word was <br/><br/>\"" + word[select][0].toUpperCase() + "\"<br/><br/>Better luck next time."
//     }
//     d.className = ""
// }
// img add win or loss
function gameEnd(e) {
    var d = gId("result");
    d.setAttribute("data", e);

    var imageSrc;
    var message;

    if (e) { // Player wins
        imageSrc = "victory.gif";
        message = "You Win!<br/>Congratulations, you found the word!<br/>Good Job!";
    } else { // Player loses
        imageSrc = "lost.gif";
        message = "You Lose!<br/>The word was \"" + word[select][0].toUpperCase() + "\"<br/>Better luck next time.";
    }

    // Update the result section
    gId("rT").innerText = "";
    gId("rM").innerHTML = message;

    // Display the image
    var image = document.createElement("img");
    image.src = imageSrc;
    image.alt = e ? "Win Image" : "Lose Image";
    gId("result").appendChild(image);

    d.className = "";
}

// Show hint
function hint() {
    gId("hintText").innerText = word[select][1]
    gId("hint").style.display = "block"
}

// Exit hint
function hintExit() {
    gId("hint").style.display = "none"
}

// Get HTML ID element by name
function gId(a) {
    return document.getElementById(a)
}

/* 8 DIGITAL CLOCK WITH TIME ZONES */

// Calling showTime function at every second
setInterval(showTime, 1000);
 
// Defining showTime funcion
function showTime() {
    // Getting current time and date
    let time = new Date();
    let hour = time.getHours();
    let min = time.getMinutes();
    let sec = time.getSeconds();
    am_pm = "AM";
 
    // Setting time for 12 Hrs format
    if (hour >= 12) {
        if (hour > 12) hour -= 12;
        am_pm = "PM";
    } else if (hour == 0) {
        hr = 12;
        am_pm = "AM";
    }
 
    hour =
        hour < 10 ? "0" + hour : hour;
    min = min < 10 ? "0" + min : min;
    sec = sec < 10 ? "0" + sec : sec;
 
    let currentTime =
        hour +
        ":" +
        min +
        ":" +
        sec +
        am_pm;
 
    // Displaying the time
    document.getElementById(
        "clock"
    ).innerHTML = currentTime;
}
 
showTime();
/* 9 POMODORO TIMER */

let countdown;
let isPaused = false;
let secondsRemaining;

function startTimer(duration) {
  const timerDisplay = document.querySelector('.timer');
  const endTime = Date.now() + duration * 1000;

  displayTimeLeft(duration);

  countdown = setInterval(() => {
    if (isPaused) return;
    secondsRemaining = Math.round((endTime - Date.now()) / 1000);

    if (secondsRemaining < 0) {
      clearInterval(countdown);
      return;
    }

    displayTimeLeft(secondsRemaining);
  }, 1000);
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes < 10 ? '0' : ''}${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
  document.getElementById('minutes').textContent = minutes;
  document.getElementById('seconds').textContent = remainderSeconds;
}

document.getElementById('start').addEventListener('click', function() {
  const minutes = parseInt(document.getElementById('manual-minutes').value);
  const seconds = parseInt(document.getElementById('seconds').textContent);
  const totalTimeInSeconds = (minutes * 60) + seconds;
  startTimer(totalTimeInSeconds);
});

document.getElementById('pause').addEventListener('click', function() {
  isPaused = !isPaused;
});

document.getElementById('stop').addEventListener('click', function() {
  clearInterval(countdown);
  document.getElementById('minutes').textContent = '25';
  document.getElementById('seconds').textContent = '00';
  isPaused = false;
});

document.getElementById('reset').addEventListener('click', function() {
  clearInterval(countdown);
  document.getElementById('minutes').textContent = '25';
  document.getElementById('seconds').textContent = '00';
  document.getElementById('manual-minutes').value = '25';
  isPaused = false;
});

/* 10 VIRTUAL KEYBOARD */

const btn = document.querySelectorAll(".q");
const cls = document.getElementById("cls");
const res = document.getElementById("result1");
const space = document.getElementById("space");

cls.addEventListener("click", () => {
  res.value = res.value.substr(0, res.value.length - 1);
});

Array.from(btn).map(bt => {
  bt.addEventListener("click", () => {
    res.value += bt.innerHTML.toLowerCase();
    // res.focus();
  });
});

space.addEventListener("click", () => {
  res.value += " ";
  res.focus();
});