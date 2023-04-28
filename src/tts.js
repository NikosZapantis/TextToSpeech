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
    
    // Set the selected voice
    const selectedVoice = voiceSelection.options[voiceSelection.selectedIndex].value;
    if (selectedVoice !== '') {
        utterance.voice = voices[selectedVoice];
        speechSynthesis.speak(utterance);
    }

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
            event.preventDefault(); 
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

//?DONE todo: Selection between different voices

//Fetching the available voices from browser
let voices = [];

function populateVoiceList() {
    voices = speechSynthesis.getVoices();
    const voiceSelection = document.getElementById("voiceSelection");
    
    // Clear the current options in the selection box
    while (voiceSelection.firstChild) {
        voiceSelection.removeChild(voiceSelection.firstChild);
    }

    //Adding the default option
    const defaultOption = document.createElement('option');
    defaultOption.textContent = "--Select a voice--";
    defaultOption.setAttribute('selected', 'selected');
    defaultOption.setAttribute('disabled', 'disabled');
    voiceSelection.appendChild(defaultOption);

    //Populate the selection box with available voices
    voices.forEach((voice, i) => {
        const option = document.createElement('option');
        option.textContent = voice.name + ' (' + voice.lang + ')';
        option.setAttribute('value', i);
        option.setAttribute('id', 'voiceSelectionBoxes'); // add ID attribute

        voiceSelection.appendChild(option);
    });
}

populateVoiceList();

if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
}

//Using the selected voice for TTS
const voiceSelection = document.getElementById("voiceSelection");

function textToSpeech(text) {
    let utterance = new SpeechSynthesisUtterance(text);
    
    //Set the selected voice
    const selectedVoice = voiceSelection.options[voiceSelection.selectedIndex].value;
    if (selectedVoice !== '') {
    
        utterance.voice = voices[selectedVoice];
    }

    speechSynthesis.speak(utterance);
}
