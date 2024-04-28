async function randomWord(length) {
    const response = await fetch(`https://random-word-api.vercel.app/api?words=1&length=${length}&type=capitalized`);
    const data = await response.json();
    return data[0];
}

export default randomWord;