let answers = [];
let inputs = [];
var counter = 0;
var speed = 1000;
var timer;

async function clicked(num)    
{
document.getElementById("indicator").style.backgroundColor = 'green';
inputs.length=0;                                            //reset input in case user pressed any buttons before starting the game
document.getElementById("startButton").disabled = true;     //disable the start button while the game is running
if(num==1)
{
    await new Promise(resolve => setTimeout(resolve, 3000)) //wait 3 seconds after you start before the game begins
}
document.getElementById("blueButton").disabled = true;
document.getElementById("yellowButton").disabled = true;    //prevent user from pressing any buttons while the sequence is being displayed
document.getElementById("greenButton").disabled = true;
document.getElementById("redButton").disabled = true;

rand = Math.floor(Math.random() *4)+1;                      //numbers 1-4 represent the buttons. Generate a random button and push it on to the array of correct input sequences
answers.push(rand);

for(let i = 0; i< answers.length; i++){
    flash(answers[i]);                                      //flash the sequence of buttons. Speed represents the time between button flashes
    await new Promise(resolve => setTimeout(resolve, speed));                                
} 

document.getElementById("blueButton").disabled = false;
document.getElementById("yellowButton").disabled = false;   //Re-enable all the buttons 
document.getElementById("greenButton").disabled = false;
document.getElementById("redButton").disabled = false;



timer = setTimeout(function() {
    checkEqual(answers, inputs, num);                       //Give the user 5 seconds then check if their input = the answer
}, 5000);

}

function returnColour(buttonID, colour)
{
document.getElementById(buttonID).style.backgroundColor = colour;   //Function to return a button to it's original colour after flashing
}

async function input(num, buttonID){
inputs.push(num);
document.getElementById(buttonID).style.height = "140px";
document.getElementById(buttonID).style.width = "140px";
await new Promise(resolve => setTimeout(resolve, 50));              //inserts the number of the button into []input when you press it and also
document.getElementById(buttonID).style.height = "150px";           //animates the buttons
document.getElementById(buttonID).style.width = "150px";

if (inputs[inputs.length - 1] !== answers[inputs.length - 1]) {
    clearTimeout(timer);
    fail();
    if (counter > document.getElementById("bestGame").innerText) {
        document.getElementById("bestGame").innerText = counter;
    }
    document.getElementById("lastGame").innerText = counter;   
    counter = 0;
    inputs.length=0;
    answers.length=0;
    document.getElementById("indicator").style.backgroundColor = 'red';
    return;
}

if(answers.length==inputs.length)
{
    clearTimeout(timer);                                                //stop timer and check if equal as soon as user enter right number of buttons
    checkEqual(answers, inputs, num);  
}

}

function checkEqual(a,b, num)
{
var equal = true;
for(let i = 0; i<a.length;i++)                                        //function to check if input and ansswers are equal
{
if (a[i] !== b[i]) {
    equal = false;
}
}
if(equal == false)
{
console.log("wrong: different values");
console.log(answers);
console.log(inputs);
inputs.length=0;
answers.length=0;
document.getElementById("lastGame").innerText = counter;            //update the value of last game to be the current score
fail();                                                             
if(counter > document.getElementById("bestGame").innerText)
{
    document.getElementById("bestGame").innerText = counter;        //check if you have a high score and set the value accordingly
}
counter = 0;
document.getElementById("indicator").style.backgroundColor = 'red';
}
else{
console.log("correct");
console.log(answers);
console.log(inputs);
inputs.length=0;
num++;
counter++;          //increase score
console.log(speed);
if(counter>=5)
{
    speed = 800;    //set the time between flashes to be 0.8 second after the third round
}
if(counter>=9)
{
    speed = 650;    //set the time between flashes to be 0.65 second after the 9th round
}
if(counter>=13)
{
    speed = 500;    //set the time between flashes to be 0.5 second after the 13th round
}
console.log(speed);
clicked(num);       //restart the cycle with num being +1
}

}

function flash(num)
{

    if(num==1)                                                                  //flashes the button sequences depending on the values in answer
{
    document.getElementById("greenButton").style.backgroundColor = 'white';
    setTimeout(function() {
        returnColour("greenButton", 'green');
    }, 300);
}
if(num==2)
{
    document.getElementById("redButton").style.backgroundColor = 'white';
    setTimeout(function() {
        returnColour("redButton", 'red');
    }, 300);
}
if(num==3)
{
    document.getElementById("blueButton").style.backgroundColor = 'white';
    setTimeout(function() {
        returnColour("blueButton", 'blue');
    }, 300);
}
if(num==4)
{
    document.getElementById("yellowButton").style.backgroundColor = 'white';
    setTimeout(function() {
        returnColour("yellowButton", 'yellow');
    }, 300);
}
}

async function fail()
{
document.getElementById("blueButton").disabled = true;
document.getElementById("yellowButton").disabled = true;    //prevent user from pressing any buttons while the fail animation is being displayed
document.getElementById("greenButton").disabled = true;
document.getElementById("redButton").disabled = true;
for(let i = 0; i<5;i++)
{
    document.getElementById("greenButton").style.backgroundColor = 'white';
    document.getElementById("redButton").style.backgroundColor = 'white';
    document.getElementById("blueButton").style.backgroundColor = 'white';
    document.getElementById("yellowButton").style.backgroundColor = 'white';        //flashes every button 5 times if you fail
    await new Promise(resolve => setTimeout(resolve, 250));
        returnColour("blueButton", 'blue');
        returnColour("yellowButton", 'yellow');
        returnColour("redButton", 'red');
        returnColour("greenButton", 'green');
    await new Promise(resolve => setTimeout(resolve, 250));
}
document.getElementById("startButton").disabled = false;    //re-enable the start button
speed = 1000;                                               //reset speed for next game
}



