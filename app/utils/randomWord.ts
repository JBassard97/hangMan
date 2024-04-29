export default async function randomWord(length?: number | any) {
    const randomWordURL: string = "https://random-word-api.vercel.app/api?words=1&type=uppercase";

    let apiURL: string = randomWordURL;
    if (length && length >= 3 && length <= 9) {
        apiURL = `https://random-word-api.vercel.app/api?words=1&length=${length}&type=uppercase`
    }

    const response = await fetch(apiURL);
    const data = await response.json();
    return data[0];
}

