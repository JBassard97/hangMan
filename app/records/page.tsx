"use client";

import { useEffect, useState } from "react";
import { getRecords } from "../utils/getRecords";
import "./records.scss";

export default function RecordsPage() {
  const [gamesPlayed, setGamesPlayed] = useState<number | any>(null);
  const [gamesWon, setGamesWon] = useState<number | any>(null);
  const [gamesLost, setGamesLost] = useState<number | any>(null);
  useEffect(() => {
    setGamesPlayed(getRecords().playCount);
    setGamesWon(getRecords().winCount);
    setGamesLost(getRecords().loseCount);
  }, []);

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
        <button onClick={handleClearRecords}>Clear Records</button>
      </div>
    </>
  );
}
