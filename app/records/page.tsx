"use client";

import { useEffect, useState } from "react";
import { getRecords } from "../utils/getRecords";
import { getGameData } from "../utils/getGameData";
import "./records.scss";

export default function RecordsPage() {
  const [gamesPlayed, setGamesPlayed] = useState<number | any>(null);
  const [gamesWon, setGamesWon] = useState<number | any>(null);
  const [gamesLost, setGamesLost] = useState<number | any>(null);
  const [gameData, setGameData] = useState<any>(null);

  useEffect(() => {
    setGamesPlayed(getRecords().playCount);
    setGamesWon(getRecords().winCount);
    setGamesLost(getRecords().loseCount);

    async function setData() {
      let retrievedData: any = await getGameData();
      retrievedData ? setGameData(retrievedData.reverse()) : setGameData(null); // reverse so newest on top
    }

    setData();
  }, []);

  useEffect(() => {
    console.log(gameData);
  }, [gameData]);

  const handleClearRecords = () => {
    localStorage.clear();
    setGamesPlayed(0);
    setGamesWon(0);
    setGamesLost(0);
  };

  return (
    <>
      <div className="records-page">
        <div className="stats">
          <p className="games-played">Games Played: {gamesPlayed}</p>
          <p className="games-won">
            Games Won: {gamesWon} (
            {gamesPlayed && gamesWon
              ? `${Math.floor((gamesWon / gamesPlayed) * 100)}`
              : 0}
            %)
          </p>
          <p className="games-lost">
            Games Lost: {gamesLost} (
            {gamesPlayed && gamesLost
              ? `${Math.floor((gamesLost / gamesPlayed) * 100)}`
              : 0}
            %)
          </p>
        </div>
        <div className="stored-games">
          {gameData !== null && gameData.length > 0 ? (
            <table className="table">
              <thead>
                <tr className="top-row">
                  <th>Word/Phrase</th>
                  <th>Outcome</th>
                  <th>Game Mode</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {gameData.map((game: any, index: number) => (
                  <tr key={index}>
                    <td className="cell">{game.wordOrPhrase}</td>
                    <td className="cell">{game.winOrLose}</td>
                    <td className="cell">{game.singleOrMulti}</td>
                    <td className="cell">{game.timestamp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No game records found.</p>
          )}
        </div>

        <button className="clear-button" onClick={handleClearRecords}>
          Clear Records
        </button>
      </div>
    </>
  );
}
