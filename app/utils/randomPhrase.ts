const phraseData = require("./phrases.json");

const randomPhrase = () => {
    let phraseArrayLength = phraseData.length;
    let randomIndex = Math.floor(Math.random() * phraseArrayLength);
    let randomPhrase = phraseData[randomIndex].toUpperCase();
    return randomPhrase;
}

export default randomPhrase;