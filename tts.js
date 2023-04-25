const inputField = document.getElementById("textInput");
const submitButton = document.getElementById("submitBtn");


submitButton.addEventListener("click", () => {

    if(inputField.value !== "") {
        textToSpeech(inputField.value); //calling textToSpeech function if the input isn't blank
    }else {
        alert("Type something first!"); //alert box for blank input
    }
});

function textToSpeech(text) { //textToSpeech convertion
    let utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
}

//Adding enter and delete buttons as keyCodes so to interact with some feature
document.addEventListener("keydown", function(event) {
    var keyCode = event.keyCode;
    var keyValue = event.key;
    var validKeys = ["Enter", "Delete"];
    
    if(validKeys.includes(keyValue)) {
        if(keyValue === "Enter" && !event.shiftKey) {
            //?DONE todo: Find how to redirect to event listener;  
            submitButton.click();
        }else if(keyValue === "Delete") {
            //reseting current input in the textarea
            resetCurrentInput();
        }
    }
});

textInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
    } else if (event.key === "Enter" && event.shiftKey) {
        //shift + enter has feature as newline in the textarea
        this.value += "\n";
    }
});

function resetCurrentInput() {
    document.getElementById("textInput").value = '';
}

//TODO: Selection between different voices