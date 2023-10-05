
      

let[sec,min,hrs]=[0,0,0];                                           // declaring time 00:00:00
let displayTime=document.getElementById("displayTime");            // to display time on webpage
let timer=null;                                                   //  updates stopwatch display

function stopwatchtime(){
                        // time showing hrs min and sec
      sec++;
      if(sec==60){
            sec=0;
            min++;
        if(min==60){
            min=0;
            hrs++;
        }
      }
      let h=hrs < 10 ? "0" + hrs : hrs;
      let m=min < 10 ? "0" + min : min;
      let s=sec < 10 ? "0" + sec : sec;

      displayTime.innerHTML  = h + ":" + m + ":" + s;

}

function watchStart(){
      if(timer!== null){
            {
                  clearInterval(timer);
            }
      }
       // display time in every 1000 millisec
      timer=setInterval(stopwatchtime,1000);

      if(button_state == "start"){
            //  If it's start, it changes  to Stop
            start_button.innerHTML = "Stop";
            start_button.style.background = "red";
            button_state = "stop";
      }
      else{

            // stopwatch is already running, so it stops & changes  to Resume
            watchStop();
            start_button.innerHTML = "Resume";
            button_state = "start";
            start_button.style.background = "green";
            reset_button.innerHTML = "Reset" ;
            // button_state = "lap";
            // start_button.innerHTML = "Start";
            // button_state = "Resume";
            // start_button.style.background = "green";

             }

}

function watchStop(){
      if(timer!== null){
            {
                  clearInterval(timer);
            }
      }
      // display time in every 1000 millisec
      // timer=setInterval(stopwatchtime,1000);
}

// function resumeButton(){
     
//       // display time in every 1000 millisec
//       timer=setInterval(stopwatchtime,1000);
// }
// function watchStop(){
//       clearInterval(timer);
// }

function watchreset(){
      clearInterval(timer);
      [sec,min,hrs]=[0,0,0];
      displayTime.innerHTML = "00:00:00";

}
function lap(){

}
            // event listeners 
let start_button = document.getElementById("startButton");
let Resume_button = document.getElementById("startButton");
let reset_button = document.getElementById("lapbutton");
var button_state = "start";
reset_button.addEventListener("click",lap);
start_button.addEventListener("click",watchStart);
reset_button.addEventListener("click",watchreset);
Resume_button.addEventListener("click",);
// start_button.addEventListener("click",watchtart);
