export const updatePlayCounts = (winOrLose: string) => {
    let playCount: any = localStorage.getItem("playCount");
    playCount = playCount ? parseInt(playCount) : 0;
    playCount++;
    localStorage.setItem('playCount', playCount);
    console.log("updated:", { playCount });

    if (winOrLose == "win") {
        let winCount: any = localStorage.getItem("winCount");
        winCount = winCount ? parseInt(winCount) : 0;
        winCount++;
        localStorage.setItem("winCount", winCount);
        console.log("updated:", { winCount });
    } else {
        let loseCount: any = localStorage.getItem("loseCount");
        loseCount = loseCount ? parseInt(loseCount) : 0;
        loseCount++;
        localStorage.setItem("loseCount", loseCount);
        console.log("updated:", { loseCount });
    }
}