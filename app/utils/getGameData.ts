export const getGameData = () => {
    let storedGames: any = localStorage.getItem("storedGames");
    storedGames = storedGames ? JSON.parse(storedGames) : null;
    return storedGames;
}