export const getRecords: any = () => {
    let playCount: string | any = localStorage.getItem("playCount");
    playCount = playCount ? parseInt(playCount) : 0;

    let winCount: string | any = localStorage.getItem("winCount");
    winCount = winCount ? parseInt(winCount) : 0;

    let loseCount: string | any = localStorage.getItem("loseCount");
    loseCount = loseCount ? parseInt(loseCount) : 0;

    const records: object = { "playCount": playCount, "loseCount": loseCount, "winCount": winCount };
    return records;
}