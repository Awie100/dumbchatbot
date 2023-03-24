//imports
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || window.webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent
const synth = window.speechSynthesis;

//reply bot
const utterance = new SpeechSynthesisUtterance()
utterance.voice = synth.getVoices()[0]

const synthesis_speak = (text) => {
    utterance.text = text
    synth.speak(utterance)
}

//speech bot
const recognition = new SpeechRecognition()

recognition.continuous = true;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

recognition.onresult = function (event) {
    //console.log(event.results)
    const result = event.results[event.results.length - 1][0]
    const text = result.transcript.toLowerCase();
    console.log('Result received: ' + text + '.');
    console.log('Confidence: ' + result.confidence);

    if (text.includes('penis')) {
        synthesis_speak('HAHAHA you said penis')
    } else if (text.includes('balls')) {
        synthesis_speak('HAHAHA you said balls')
    } else if (text.includes('stop')) {
        synthesis_speak('shutting down')
        turnBotOff()
    }
}

recognition.onspeechend = function () {
    turnBotOff()
}

recognition.onnomatch = function (event) {
    console.log('nomatch')
}

recognition.onerror = function (event) {
    console.log(`Error: ${event.error}`)
}


// DOM Manipulation
const chat_button = document.getElementsByClassName('chat-button')[0]
const body = document.body
body.style.backgroundColor = 'salmon'
chat_button.textContent = "Turn Bot On"
let chat_bot_on = false

const turnBotOff = () => {
    chat_bot_on = false
    body.style.backgroundColor = 'salmon'
    recognition.stop()
    console.log('off')
    chat_button.textContent = "Turn Bot On"
}

const turnBotOn = () => {
    chat_bot_on = true
    body.style.backgroundColor = 'lightgreen'
    recognition.start()
    console.log('on')
    chat_button.textContent = "Turn Bot Off"
}


chat_button.addEventListener('click', (evt) => {
    if (chat_bot_on) turnBotOff()
    else turnBotOn()
})