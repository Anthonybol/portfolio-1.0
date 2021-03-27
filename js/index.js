const TypeWriter = function(txtElement, words, wait = 2000){ 
    //'Typewriter'-Name of function. txtelement, words, wait - is coming from the span in html. 
    //Constructive functions assign properties using 'this' keyword.
  this.txtElement = txtElement; //Setting to txtelement that is passed in.
  this.words = words; //Setting to words that are passed in.
  this.txt = ''; //Txt is set to nothing by default. It represents whatever is in the typing area.
  this.wordIndex = 0; //Words are formated as an array. Wordindex is set to 0 by default.
  this.wait = parseInt(wait, 10); //Parseint takes a string and converts to a number
  this.type(); //Main method 
  this.isDeleting = false; //Boolean which represent state if its deleting or not. If going backwards, is deleting is true.
}

//Type method
//Using prototype to add method which is type.
TypeWriter.prototype.type = function(){
//Current index of word
const current = this.wordIndex % this.words.length; //wordindex default is 0. % Modulis operator to get total length of words array.
//Get full text of current word
const fullTxt = this.words[current]; //Getting full txt of current word. This.words is our words. Getting our 'Current' index.
//check if deleting
if(this.isDeleting) { //This.isDeleting is set to false by default.
    //Remove character if deleting
    this.txt = fullTxt.substring(0, this.txt.length -1); 
    //This.txt reps whatever is in the span. Taking fullTxt and calling substring. Substring extracting first word.
    //0, this.txt.length -1 means it will delete each letter starting at 0.
} else {
    //Add character if not deleting
    this.txt = fullTxt.substring(0, this.txt.length +1); //Adds letter instead of minus one. 
}

//Insert txt into element (txt element is the span in html) Outputs this.txt every half second. 
//Below we are inserting another span into txtElement.
this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

//type speed
let typeSpeed = 200; //Let is dynamic

if(this.isDeleting) { //If deleting, make it go faster. /=2 Cuts in half typespeed time if deleting.
    typeSpeed /= 2;
}

//If word is complete (! means not). If not is deleting and this.txt is equal to whatever the text is. 
//If word is complete, move onto next word. If this.txt is equal to a full word, then set typespeed to wait value.
if(!this.isDeleting && this.txt === fullTxt) { 
    //make pause at end of word
    typeSpeed = this.wait;
    //Set delete to true
    this.isDeleting = true;
}   else if(this.isDeleting && this.txt === '') { 
    //Once completely deleted, it switches words. At this point the word will change.
    this.isDeleting = false; //Set back to false
    //Move to next word
    this.wordIndex++; //Increment by 1. 
    //Pause before start typing again
    typeSpeed = 500;
}

    setTimeout(() => this.type(), typeSpeed) //Set timeout at 1/3 second for type method.
}
// Init on Dom load
document.addEventListener('DOMContentLoaded', init);
// Inititate on DOM load. Event listener for DOMContentLoaded. Init function below.

// Init App
function init(){
    const txtElement = document.querySelector('.txt-type'); //Grabbing txtElement. 
    const words = JSON.parse(txtElement.getAttribute('data-words')); 
    //Grabbing words. Get attribute 'data-words'. Need to run 'JSON.parse' otherwise its looked at as a string.
    const wait = txtElement.getAttribute('data-wait'); //Gets wait element.
    
    //Initializes typewriter
    new TypeWriter(txtElement, words, wait); 
}