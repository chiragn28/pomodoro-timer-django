// preset values for the timer function template
var min = 25;
var sec = "00";
var hrs = 0;

//executed when the website is loaded the body will call the template() function via onload event
function template() {
    document.getElementById("hours").innerHTML = "00";
    document.getElementById("minutes").innerHTML = min;
    document.getElementById("seconds").innerHTML = sec;  
    document.getElementById("timer_title").innerHTML = "Ready to grind?";

    //asking the user if they need help with using and navigating throughout the site
    let showGuide = confirm("Do you want a guide for using the site?");
    if(showGuide){
        document.getElementById('info-section').style.display = "block";
    }
}

// Initialize audio objects using paths passed from the HTML template
const check_sound = new Audio(soundPaths.check);
const SlowMorning_Sound = new Audio(soundPaths.slowMorning);
const Daybreak_Sound = new Audio(soundPaths.daybreak);
const EarlyRiser_Sound = new Audio(soundPaths.earlyRiser);

// Variable that will contain the sound the user chooses
let sound = null;

// Function to toggle sound options
function showOptions2() {
    const timer_options = document.getElementById("timer-options");
    const sound_options = document.getElementById("sound-options");

    if (sound_options.style.display === "none") {
        sound_options.style.display = "block";
        if (timer_options.style.display === "block") {
            timer_options.style.display = "none";
        }
    } else {
        sound_options.style.display = "none";
    }
}

// Function to set the user's chosen sound
function set_Sound(soundChoice) {
    sound = soundChoice;
    alert("Sound set to: " + soundChoice.src.split('/').pop());
}

// Function to play the selected sound
function playSound(soundToPlay) {
    // Pause and reset all sounds
    [check_sound, SlowMorning_Sound, Daybreak_Sound, EarlyRiser_Sound].forEach(audio => {
        if (!audio.paused) {
            audio.pause();
            audio.currentTime = 0;
        }
    });

    // Play the selected sound
    if (soundToPlay) {
        soundToPlay.play();
    }
}

// Function to remove the currently selected sound
function rmvSound() {
    // Pause and reset all sounds
    [check_sound, SlowMorning_Sound, Daybreak_Sound, EarlyRiser_Sound].forEach(audio => {
        if (!audio.paused) {
            audio.pause();
            audio.currentTime = 0;
        }
    });

    // Clear the selected sound
    sound = null;
    alert("Sound disabled");
}

/* -----------------------------------------------Timer functions -------------------------------*/
//executed when the timer button (center) is clicked on
function showOptions(){
    var timer_options = document.getElementById("timer-options");
    var sound_options = document.getElementById("sound-options");
    
    if (timer_options.style.display === "none") {
        timer_options.style.display = "block";
        if (sound_options.style.display === "block") {
            sound_options.style.display = "none";
        }
    } else {
        timer_options.style.display = "none";
    }
}

//executed when the start button is clicked on 
var minutes_interval = null;
var seconds_interval = null;

//quotes to display
const start_quotes = ["You got this!","I can and I will!","Always Remember Your Focus Determines Your Reality.","You better not be procastinating."];
const finished_quotes = ["Another pom down.","Pom finished","HELL YEAH YOU DID IT","It's okay if you didn't do well this time.","Good job!","Take a break now","What the heck? You're killing it!."];

function start(){
    // Clear any existing intervals
    if (minutes_interval) clearInterval(minutes_interval);
    if (seconds_interval) clearInterval(seconds_interval);
    
    min = parseInt(document.getElementById("minutes").textContent) || 0;
    sec = parseInt(document.getElementById("seconds").textContent) || 0;
    hrs = parseInt(document.getElementById("hours").textContent) || 0;
    
    document.getElementById("timer_title").innerHTML = start_quotes[Math.floor(Math.random()*start_quotes.length)];
    
    // Start both intervals
    minutes_interval = setInterval(minutesTimer, 60000);
    seconds_interval = setInterval(secondsTimer, 1000);
    
    function minutesTimer(){
        if (min > 0) {
            min--;
            document.getElementById("minutes").innerHTML = min < 10 ? "0" + min : min;
        } else if (hrs > 0) {
            hrs--;
            min = 59;
            document.getElementById("hours").innerHTML = hrs < 10 ? "0" + hrs : hrs;
            document.getElementById("minutes").innerHTML = "59";
        }
    }
    
    function secondsTimer(){
        if (sec > 0) {
            sec--;
        } else {
            sec = 59;
            // Only call minutesTimer if we're at 0 minutes and 0 seconds
            if (min === 0 && hrs === 0) {
                clearInterval(minutes_interval);
                clearInterval(seconds_interval);
                document.getElementById("timer_title").innerHTML = finished_quotes[Math.floor(Math.random()*finished_quotes.length)];    
                if (sound) {
                    sound.play();
                }
            } else if (min > 0 || hrs > 0) {
                minutesTimer(); // Manually call minutesTimer when seconds roll over
            }
        }
        document.getElementById("seconds").innerHTML = sec < 10 ? "0" + sec : sec;
    }
}

// executed when the clear button is clicked on, this clears and resets the timer. 
function clearTimer(){
    clearInterval(minutes_interval);
    clearInterval(seconds_interval);
    minutes_interval = null;
    seconds_interval = null;
    min = 0;
    sec = "00";
    hrs = 0;
    document.getElementById("hours").innerHTML = "00";
    document.getElementById("minutes").innerHTML = min < 10 ? "0" + min : min;
    document.getElementById("seconds").innerHTML = sec;
    document.getElementById("timer_title").innerHTML = "Ready to grind?";
}

//functions for increasing the time of the pomodoro
function increaseTime(amount) {
    min += amount;
    if(min >= 60){
        hrs += Math.floor(min / 60);
        min = min % 60;
        document.getElementById("hours").innerHTML = hrs < 10 ? "0" + hrs : hrs;
    }
    document.getElementById("minutes").innerHTML = min < 10 ? "0" + min : min;
}

function increase1() { increaseTime(1); }
function increase5() { increaseTime(5); }
function increase10() { increaseTime(10); }
function increase15() { increaseTime(15); }
function increase30() { increaseTime(30); }
function increase60() { increaseTime(60); }

/*------------------- Settings functions -------------------*/
function showOptions3(){
    var settings = document.getElementById("settings-options");
    if(settings.style.display === 'none'){
        settings.style.display = 'block';
    }else{
        settings.style.display = 'none';
    }
}

//function for showing the background options
function showBg(){
    var settingsParent = document.getElementById('settings-options');
    var settingsChild = document.getElementById("settings-bg");
    if(settingsChild.style.display === "none"){
        settingsParent.style.display = "none";
        settingsChild.style.display = "block";
    }else{
        settingsChild.style.display = "none";
        settingsParent.style.display = "block";
    }
}

//functions for changing the background
function setBg1(){
    document.body.style.backgroundImage = 'url("' + soundPaths.check.replace('check.mp3', 'background.jpg') + '")';
}   
function setBg2(){
    document.body.style.backgroundImage = 'url("' + soundPaths.check.replace('check.mp3', 'background2.jpg') + '")';
}

// function for going back to the main settings section
function returnSettings1(){
    document.getElementById('settings-options').style.display = "block";
    document.getElementById("settings-bg").style.display = "none";
}

// function for showing the information section
function showInfo(){
    var info_Sec = document.getElementById("info-section");
    if(info_Sec.style.display ==="none"){
        info_Sec.style.display = "block";
    }else{
        info_Sec.style.display = "none";
    }
}

//functions for the drop down boxes of the content in the info section
function toggleSection(sectionId) {
    var section = document.getElementById(sectionId);
    if(section.style.display === "none"){
        section.style.display = "block";
    }else{
        section.style.display ="none";
    }
}

function showInfoSec1() { toggleSection("InfoSec1"); }
function showInfoSec2() { toggleSection("InfoSec2"); }
function showInfoSec3() { toggleSection("InfoSec3"); }
function showInfoSec4() { toggleSection("InfoSec4"); }

/* ------------------- Task list sections ---------------------- */
//jQuery functions to toggle and untoggle the task menu 
$(document).ready(function() {
    $("#menu-toggle").click(function (e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
    });

    $("#menu-untoggle").click(function(e){
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
    });
});

//functions for toggling and untoggling the form in the task menu 
function toggleForm(){
    var form = document.getElementById("form");
    var btn = document.getElementById("Task_Btn");
    if (form.style.display === "none") {
        form.style.display = "block";
        btn.style.transform = "rotate(45deg)";
    } else {
        form.style.display = "none";
        btn.style.transform = "rotate(0deg)";
    }
}

// variables to be used for the AddTask() function
var check_no = 0;
var no_Tasks = 0;
var finish_no_Tasks = 0;

// function will be invoked after submit button located in the Task list form clicked
function AddTask(){
    var input = document.querySelector('#TaskInput').value.trim();
    // checking whether or not the user has entered a task or not
    if(input === ""){
        alert("You must write something to add!");
        return;
    }
    
    var task = document.createElement('div');
    task.className="task";
    var li = document.createElement('li');
    li.className = 'li';
    var box = document.createElement('label');
    box.className = "box";
    var text = document.createElement("label");
    text.className = "text-label";
    text.innerHTML = input;
    
    //generating checkbox element
    var checkbox = document.createElement("input");
    checkbox.type="checkbox";
    checkbox.className="check";
    check_no += 1;
    checkbox.id="check_" + check_no;
    
    var checkmark = document.createElement('label');
    checkmark.htmlFor = checkbox.id;
    checkmark.className = "checkmark";
    
    //checkbox change handler
    checkbox.onchange = function(){
        if(checkbox.checked){
            finish_no_Tasks +=1;
            this.parentNode.style.background = "#F4F4F4";
            this.parentNode.style.color = "rgba(0, 0, 0, 0.24)";
        } else {
            finish_no_Tasks -=1;
            this.parentNode.style.background = "#FFFFFF";
            this.parentNode.style.color = "#000000";
            if(finish_no_Tasks < 0){
                finish_no_Tasks = 0;
            }
        }
        document.getElementById("Task_num1").innerHTML = finish_no_Tasks;
    };
    
    //delete button being generated
    var remove = document.createElement("button");
    remove.className = "remove-btn";
    
    //function to be executed when the remove button is clicked
    remove.onclick= function(){
        // Check if task was completed before removing
        if (this.parentNode.querySelector('.check').checked) {
            finish_no_Tasks -= 1;
        }
        this.parentNode.parentNode.remove();
        no_Tasks -= 1;
        
        //preventing values " < 0 " to be displayed
        if(finish_no_Tasks < 0){
            finish_no_Tasks = 0;
        }
        document.getElementById("Task_num2").innerHTML = no_Tasks;
        document.getElementById("Task_num1").innerHTML = finish_no_Tasks;
    };
    
    var btnRMV = document.createElement("i");
    btnRMV.className = "far fa-trash-alt";
    
    //adding the elements
    li.appendChild(task);
    task.appendChild(box);
    task.appendChild(remove);
    box.appendChild(checkbox);
    box.appendChild(checkmark);
    box.appendChild(text);
    remove.appendChild(btnRMV);
    
    document.getElementById("list").appendChild(li);
    document.getElementById("TaskInput").value=""; 
    
    // updating the number of tasks
    no_Tasks += 1;
    document.getElementById("Task_num2").innerHTML = no_Tasks;
}

// functions to hide and show the arrow for toggling and untoggling the task menu
function hideArrow(){
    document.getElementById("menu-toggle").style.display = "none";
}

function showArrow(){
    document.getElementById("menu-toggle").style.display = "block";
}

document.addEventListener('DOMContentLoaded', function() {
    // Handle logout with AJAX
    const logoutForm = document.getElementById('logoutForm');
    
    if (logoutForm) {
        logoutForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            fetch(this.action, {
                method: 'POST',
                headers: {
                    'X-CSRFToken': document.querySelector('[name=csrfmiddlewaretoken]').value,
                    'X-Requested-With': 'XMLHttpRequest'
                }
            })
            .then(response => {
                if (response.redirected) {
                    window.location.href = response.url;
                } else {
                    return response.json();
                }
            })
            .then(data => {
                if (data && data.redirect) {
                    window.location.href = data.redirect;
                }
            })
            .catch(error => {
                console.error('Error:', error);
                // Fallback to regular form submission if AJAX fails
                logoutForm.submit();
            });
        });
    }
});