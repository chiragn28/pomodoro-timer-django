/*
    Author : Chirag Nayak 

    Last Update Date & Time : Friday, November 25 2022  2:11 AM

*/




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
    // through the use of a custom alert that will ask : "Need help around the site?"
    // with options "yes" or "no".
    let showGuide = confirm("Do you want a guide for using the site?");
    if(showGuide){
        document.getElementById('info-section').style.display = "block";
    }
    
  }

/* -------------------Post timer sound functions ------------------------------------------*/

//variables containing the audio files from the sounds folder
var check_sound = new Audio("{% static 'sounds/check.mp3' %}");
var SlowMorning_Sound = new Audio("{% static 'sounds/SlowMorning.mp3' %}");
var Daybreak_Sound = new Audio("{% static 'sounds/Daybreak.mp3' %}");
var EarlyRiser_Sound = new Audio("{% static 'sounds/EarlyRiser.mp3' %}");
// variable that will contain the sound the user chooses
var sound = "";
//functions for playing and setting the sounds 
function showOptions2(){
    var timer_options = document.getElementById("timer-options");
    var sound_options = document.getElementById("sound-options");
    if (sound_options.style.display === "none") {
        sound_options.style.display = "block";
      } else {
        sound_options.style.display = "none";
      }
      if(timer_options.style.display === "block" && sound_options.style.display =="none"){
        timer_options.style.display = "none";
        sound_options.style.display = "block";
    }
}

function set_Sound(soundChoice){
    sound = soundChoice;
    alert(String(soundChoice));
}
// function for setting the sounds
function playSound(sound){
    if(sound === check_sound){
        if(Daybreak_Sound.duration > 0 && !Daybreak_Sound.paused){
            Daybreak_Sound.pause();
            Daybreak_Sound.currentTime = 0;
        }
        if(EarlyRiser_Sound.duration > 0 && !EarlyRiser_Sound.paused){
            EarlyRiser_Sound.pause();
            EarlyRiser_Sound.currentTime = 0;
        }
        if(SlowMorning_Sound.duration > 0 && !SlowMorning_Sound.paused){
            SlowMorning_Sound.pause();
            SlowMorning_Sound.currentTime = 0;
        }
    }
    if(sound === Daybreak_Sound){
        if(check_sound.duration > 0 && !check_sound.paused){
            check_sound.pause();
            check_sound.currentTime = 0;
        }
        if(EarlyRiser_Sound.duration > 0 && !EarlyRiser_Sound.paused){
            EarlyRiser_Sound.pause();
            EarlyRiser_Sound.currentTime = 0;
        }
        if(SlowMorning_Sound.duration > 0 && !SlowMorning_Sound.paused){
            SlowMorning_Sound.pause();
            SlowMorning_Sound.currentTime = 0
        }
    }
    if(sound === EarlyRiser_Sound){
        if(check_sound.duration > 0 && !check_sound.paused){
            check_sound.pause();
            check_sound.currentTime = 0;
        }
        if(Daybreak_Sound.duration > 0 && !Daybreak_Sound.paused){
            Daybreak_Sound.pause();
            Daybreak_Sound.currentTime = 0;
        }
        if(SlowMorning_Sound.duration > 0 && !SlowMorning_Sound.paused){
            SlowMorning_Sound.pause();
            SlowMorning_Sound.currentTime = 0;

        }
    }
    if(sound === SlowMorning_Sound){
        if(check_sound.duration > 0 && !check_sound.paused){
            check_sound.pause();
            check_sound.currentTime = 0;
        }
        if(Daybreak_Sound.duration > 0 && !Daybreak_Sound.paused){
            Daybreak_Sound.pause();
            Daybreak_Sound.currentTime = 0;
        }
        if(EarlyRiser_Sound.duration > 0 && !EarlyRiser_Sound.paused){
            EarlyRiser_Sound.pause();
            EarlyRiser_Sound.currentTime = 0;

        }
    }
    sound.play();
}

function rmvSound(){
    if(check_sound.duration > 0 && !check_sound.paused){
        check_sound.pause();
        check_sound.currentTime = 0;
    }
    if(Daybreak_Sound.duration > 0 && !Daybreak_Sound.paused){
        Daybreak_Sound.pause();
        Daybreak_Sound.currentTime = 0;
    }
    if(EarlyRiser_Sound.duration > 0 && !EarlyRiser_Sound.paused){
        EarlyRiser_Sound.pause();
        EarlyRiser_Sound.currentTime = 0;
    }
    if(SlowMorning_Sound.duration > 0 && !SlowMorning_Sound.paused){
        SlowMorning_Sound.pause();
        SlowMorning_Sound.currentTime = 0;
    }
    sound = "";
}
/* -----------------------------------------------Timer functions -------------------------------*/
//executed when the timer button (center) is clicked on
function showOptions(){
    var timer_options = document.getElementById("timer-options");
    var sound_options = document.getElementById("sound-options");
    if (timer_options.style.display === "none") {
        timer_options.style.display = "block";
      } else {
        timer_options.style.display = "none";
      }
    if(sound_options.style.display === "block" && timer_options.style.display =="none"){
        sound_options.style.display = "none";
        timer_options.style.display = "block";
    }
}
//executed when the start button is clicked on 
var minutes_interval = 0;
var seconds_interval = 0;
//quotes to display "start_quotes" for when the user starts the timer , "finished_quotes" for when the timer ends
const start_quotes = ["You got this!","I can and I will!","Always Remember Your Focus Determines Your Reality.","You better not be procastinating."];
const finished_quotes = ["Another pom down.","Pom finished","HELL YEAH YOU DID IT","It's okay if you didn't do well this time.","Good job!","Take a break now","What the heck? You're killing it!."];
function start(){
    min = min-1;
    sec = 59;
    document.getElementById("minutes").innerHTML= min;
    document.getElementById("seconds").innerHTML = sec;
    minutes_interval = setInterval(minutesTimer,60000);
    seconds_interval = setInterval(secondsTimer,1000);
    document.getElementById("timer_title").innerHTML = start_quotes[Math.floor(Math.random()*start_quotes.length)];
    function minutesTimer(){
        min=min-1;
        document.getElementById("minutes").innerHTML = min;
    }
    function secondsTimer(){
        sec = sec - 1;
        document.getElementById("seconds").innerHTML = sec;
        if(sec <= 57){
            if(min <= 24){
                clearInterval(minutes_interval);
                clearInterval(seconds_interval);
                document.getElementById("timer_title").innerHTML = finished_quotes[Math.floor(Math.random()*finished_quotes.length)];    
                console.log(sound);
                sound.play();
            }
            sec = 60;
            min = min - 1;
        }
    }
}




// executed when the clear button is clicked on, this clears and resets the timer. 
function clearTimer(){
    clearInterval(minutes_interval);
    clearInterval(seconds_interval);
    min = 0;
    sec = "00";
    hrs = 0;
    document.getElementById("hours").innerHTML = "00";
    document.getElementById("minutes").innerHTML = "00";
    document.getElementById("seconds").innerHTML = sec;
}

//functions for increasing the time of the pomodoro
function increase1(){
    min += 1;
    if(min > 59){
        hrs += 1;
        min = 0;
        document.getElementById("minutes").innerHTML = "00";
        document.getElementById("hours").innerHTML = hrs;
    }else{
        document.getElementById("minutes").innerHTML = min;    
    }
}
function increase5(){
    min += 5;
    if(min > 59){
        hrs += 1;
        min = 0;
        document.getElementById("minutes").innerHTML = "00";
        document.getElementById("hours").innerHTML = hrs;
    }else{
        document.getElementById("minutes").innerHTML = min;    
    }
}
function increase10(){
    min += 10;
    if(min > 59){
        hrs += 1;
        min = 0;
        document.getElementById("minutes").innerHTML = "00";
        document.getElementById("hours").innerHTML = hrs;
    }else{
        document.getElementById("minutes").innerHTML = min;    
    }  
}
function increase15(){
    min += 15;
    if(min > 59){
        hrs += 1;
        min = 0;
        document.getElementById("minutes").innerHTML = "00";
        document.getElementById("hours").innerHTML = hrs;
    }else{
        document.getElementById("minutes").innerHTML = min;    
    } 
}
function increase30(){
    min += 30;
    if(min > 59){
        hrs += 1;
        min = 0;
        document.getElementById("minutes").innerHTML = "00";
        document.getElementById("hours").innerHTML = hrs;
    }else{
        document.getElementById("minutes").innerHTML = min;    
    } 
}
function increase60(){
    hrs += 1
    if(String(hrs).length === 1){
        document.getElementById("hours").innerHTML = "0" + hrs;
    }else{
        document.getElementById("hours").innerHTML = hrs;    
    }
}

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
    var body = document.getElementsByTagName('body')[0];
    body.style.backgroundImage = 'url("background.jpg")';
}   
function setBg2(){
    var body = document.getElementsByTagName('body')[0];
    body.style.backgroundImage = 'url("background2.jpg")';
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
function showInfoSec1(){
    var sec1 = document.getElementById("InfoSec1");
    if(sec1.style.display === "none"){
        sec1.style.display = "block";
    }else{
        sec1.style.display ="none";
    }
}
function showInfoSec2(){
    var sec2 = document.getElementById("InfoSec2");
    if(sec2.style.display === "none"){
        sec2.style.display = "block";
    }else{
        sec2.style.display ="none";
    }
}
function showInfoSec3(){
    var sec3 = document.getElementById("InfoSec3");
    if(sec3.style.display === "none"){
        sec3.style.display = "block";
    }else{
        sec3.style.display ="none";
    }
}
function showInfoSec4(){
    var sec4 = document.getElementById("InfoSec4");
    if(sec4.style.display === "none"){
        sec4.style.display = "block";
    }else{
        sec4.style.display ="none";
    }
}


/* ------------------- Task list sections ---------------------- */
//jQuery functions to toggle and untoggle the task menu 
$("#menu-toggle").click(function (e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
  });

$("#menu-untoggle").click(function(e){
    e.preventDefault();
    $("#wrapper").not(this).removeClass("toggled");
});


//functions for toggling and untoggling the form inthe task menu 
  function toggleForm(){
      var form = document.getElementById("form");
      var btn = document.getElementById("Task_Btn");
      if (form.style.display === "none") {
        form.style.display = "block";
        btn.style.transform = "rotate(45deg)";
      } else {
        form.style.display = "none";
        btn.style.transform = "rotate(-90deg)";
      }
  }

// variables to be used for the AddTask() function
  var check_no = 0;
  var no_Tasks = 0;
  var finish_no_Tasks = 0;
  // function will be invoked after submit button located in the Task list form clicked
  function AddTask(){
      var task = document.createElement('div');
      task.className="task";
      var li = document.createElement('li');
      li.className = 'li';
      var box = document.createElement('label');
      box.className = "box";
      var input = document.querySelector('#TaskInput').value;
      var text = document.createElement("label");
      text.className = "text-label";
      text.innerHTML = input;
      //generating checkbox element
      var checkbox = document.createElement("input");
      checkbox.type="checkbox";
      checkbox.className="check";
      check_no += 1;
      checkbox.id="check " +check_no;
      var checkmark = document.createElement('label');
      checkmark.htmlFor = checkbox.id;
      checkmark.className = "checkmark";
      //function for when the checkbox is checked the number of finished tasks will change and the style of the box containing the task will change color 
      checkbox.onchange = function(){
            // if the checkbox is checked
            if(checkbox.checked){
                finish_no_Tasks +=1;
                document.getElementById("Task_num1").innerHTML = finish_no_Tasks;
                this.parentNode.style.background = "#F4F4F4";
                this.parentNode.style.color = "rgba(0, 0, 0, 0.24)";
            }
            //when the checkbox is checked
            else{
                finish_no_Tasks -=1;
                this.parentNode.style.background = "#FFFFFF";
                this.parentNode.style.color = "#000000";
                if(finish_no_Tasks < 0){
                    finish_no_Tasks = 0;
                }
                document.getElementById("Task_num1").innerHTML = finish_no_Tasks;
            }
        }   
      //delete button being generated
      var btnRMV = document.createElement("span");
      btnRMV.setAttribute("class","far fa-trash-alt");
      //calling the removeTask() function when the button is clicked 
      var remove = document.createElement("button");
      //function to be executed when the remove button is removed
      remove.onclick= function(){
          this.parentNode.parentNode.remove();
          // decreasing the number of finish tasks and total tasks by -1 
          no_Tasks -= 1;
          finish_no_Tasks -= 1;
          //preventing values " < 0 " to be displayed
          if(finish_no_Tasks < 0){
              finish_no_Tasks = 0;
            }
          document.getElementById("Task_num2").innerHTML = no_Tasks;
          document.getElementById("Task_num1").innerHTML = finish_no_Tasks ;
          
      }
      //adding the elements
      li.appendChild(task);
      task.appendChild(box);
      task.appendChild(remove);
      box.appendChild(checkbox);
      box.appendChild(checkmark);
      box.appendChild(text);
      remove.appendChild(btnRMV);
      // checking whether or not the user has entered a task or not
      if(input ===""){
          alert("You must write something to add!");
      }else{
          document.getElementById("list").appendChild(li);
      }
      document.getElementById("TaskInput").value=""; 
      // adding  the number of tasks in total;
      no_Tasks += 1;
      document.getElementById("Task_num2").innerHTML = no_Tasks;
  }

// functions to hide and show the arrow for toggling and untoggling the task menu
function hideArrow(){
    var btn = document.getElementById("menu-toggle");
    btn.style.setProperty("display","none","important");
}

function showArrow(){
    var btn = document.getElementById("menu-toggle");
    btn.style.setProperty("display","block","important");
}