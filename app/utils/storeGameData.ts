const conciseDateAndTime = () => {
    const currentDate = new Date();
    const dateString = `${currentDate.getMonth() + 1}/${currentDate.getDate()}`;
    const timeString = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const dateTimeString = `${dateString} ${timeString}`;
    return dateTimeString;
}

export const storeGameData = (wordOrPhrase: string, winOrLose: string, singleOrMulti: string) => {
    let storedGames: any = localStorage.getItem("storedGames");
    if (!storedGames) { storedGames = []; } else {
        storedGames = JSON.parse(storedGames);
    }

    const game: object = {
        "wordOrPhrase": wordOrPhrase,
        "winOrLose": winOrLose,
        "singleOrMulti": singleOrMulti,
        "timestamp": conciseDateAndTime()
    }

    storedGames.push(game);

    localStorage.setItem("storedGames", JSON.stringify(storedGames));
};


