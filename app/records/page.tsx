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
  const [singleWordGames, setSingleWordGames] = useState<number | null>(0);
  const [phraseGames, setPhraseGames] = useState<number | null>(0);
  const [multiGames, setMultiGames] = useState<number | null>(0);

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
    if (gameData) {
      console.log(gameData);
      let singleWord = 0,
        phrase = 0,
        multi = 0;
      for (const game of gameData) {
        let mode = game.singleOrMulti;
        if (mode == "singleWord") {
          singleWord++;
        } else if (mode == "phrase") {
          phrase++;
        } else {
          multi++;
        }
      }
      setSingleWordGames(singleWord);
      setPhraseGames(phrase);
      setMultiGames(multi);
    }
  }, [gameData]);

  const handleClearRecords = () => {
    localStorage.clear();
    setGamesPlayed(0);
    setGamesWon(0);
    setGamesLost(0);
    setSingleWordGames(0);
    setPhraseGames(0);
    setMultiGames(0);
    setGameData(0);
  };

  function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }


  return (
    <>
      <div className="records-page">
        <div className="stats">
          <p className="games-played">Games Played: {gamesPlayed}</p>
          <div className="sub-modes">
            <p className="singleword-games">
              SingleWord Mode: {singleWordGames} (
              {gamesPlayed && singleWordGames
                ? `${Math.floor((singleWordGames / gamesPlayed) * 100)}`
                : 0}
              %)
            </p>
            <p className="phrase-games">
              Phrase Mode: {phraseGames} (
              {gamesPlayed && phraseGames
                ? `${Math.floor((phraseGames / gamesPlayed) * 100)}`
                : 0}
              %)
            </p>
            <p className="multi-games">
              Multi Mode: {multiGames} (
              {gamesPlayed && multiGames
                ? `${Math.floor((multiGames / gamesPlayed) * 100)}`
                : 0}
              %)
            </p>
          </div>

          <div className="margin">
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
                  <tr className="game" key={index}>
                    <td className="cell word-phrase">{game.wordOrPhrase}</td>
                    <td
                      className={
                        game.winOrLose == "win" ? "win cell" : "lose cell"
                      }
                    >
                      {game.winOrLose.toUpperCase()}
                    </td>
                    <td className="cell">{capitalizeFirstLetter(game.singleOrMulti)}</td>
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
