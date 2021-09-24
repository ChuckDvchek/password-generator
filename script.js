// Assignment Code
var generateBtn = document.querySelector("#generate");

var pwLength;
var pwLow;
var pwHigh;
var pwNum;
var pwSpecial;

var pwOptions = {
  alphabet: "abcdefghijklmnopqrstuvwxyz",
  numbers: "1234567890",
  special: "!\"#$%&'()*+,-.\/:;<=>?@[\\]^_`{|}~"
}

function promptUser() {
  pwLength = prompt("How many characters do you want in your password? Enter a number between 8 and 128 (inclusive).","");
  
  if(pwLength===null){
    return;
  }
  
  pwLength = Number(pwLength);
  
  if(isNaN(pwLength)){
    alert("Please enter a number.");
    return promptUser();
  }

  if((pwLength < 8) || (pwLength > 128)) {
    alert("You must enter a number between 7 and 129.");
    return promptUser();
  }

  pwLow = confirm("Do you want lower case letters in your password? Press 'OK' for yes or 'Cancel' for no.");

  pwHigh = confirm("Do you want upper case letters in your password? Press 'OK' for yes or 'Cancel' for no.");

  pwNum = confirm("Do you want numbers in your password? Press 'OK' for yes or 'Cancel' for no.");

  pwSpecial = confirm("Do you want special numbers in your password? Press 'OK' for yes or 'Cancel' for no.");

  if((pwLow || pwHigh || pwNum || pwSpecial)===false) {
    alert("You must press 'OK' for at least one of the categories.");
    return promptUser();
  }
}

function generatePassword() {
  promptUser();
  // turn everything into an array first!!
  alphabetArr = pwOptions.alphabet.split("");
  numbersArr = pwOptions.numbers.split("");
  specialArr = pwOptions.special.split("");

  let safekey = "";
  let contains = "";
  let catNum = 0;
  let pwIndex;

  if(pwLow){
    contains = contains.concat(pwOptions.alphabet);
    pwIndex = Math.floor(Math.random()*alphabetArr.length);
    let pwLowReq = alphabetArr[pwIndex];
    safekey = safekey.concat(pwLowReq);
    catNum++;
  }

  if(pwHigh) {
    let highAlphabet = pwOptions.alphabet.toUpperCase();
    let highAlphabetArr = highAlphabet.split("");
    contains = contains.concat(highAlphabet);
    pwIndex = Math.floor(Math.random()*highAlphabetArr.length);
    let pwHighReq = highAlphabetArr[pwIndex];
    safekey = safekey.concat(pwHighReq);
    catNum++;
  }
  
  if(pwNum){
    contains = contains.concat(pwOptions.numbers);
    pwIndex = Math.floor(Math.random()*numbersArr.length);
    let pwNumReq = numbersArr[pwIndex];
    safekey = safekey.concat(pwNumReq);
    catNum++;
  }

  if(pwSpecial){
    contains = contains.concat(pwOptions.special);
    pwIndex = Math.floor(Math.random()*specialArr.length);
    let pwSpecialReq = specialArr[pwIndex];
    safekey = safekey.concat(pwSpecialReq);
    catNum++;
  }

  let containsArray = contains.split("");

  for(let i = 0;i < parseInt(pwLength,10)-catNum;i++){
    pwIndex = Math.floor(Math.random()*containsArray.length);
    let pwTemp = containsArray[pwIndex];
    safekey = safekey.concat(pwTemp);
    console.log(safekey);
  }

  return safekey;
}

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
