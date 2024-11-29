import React from "react";

const SoftballStats = ({ playerStats }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Player</th>
          <th>Games Played</th>
          <th>At Bats</th>
          <th>Hits</th>
          <th>Strikeouts</th>
          <th>RBI</th>
          <th>Batting Avg</th>
        </tr>
      </thead>
      <tbody>
        {playerStats.map((player) => (
          <tr key={player.playerName}>
            <td>{player.playerName}</td>
            <td>{player.gamesPlayed}</td>
            <td>{player.atBats}</td>
            <td>{player.hits}</td>
            <td>{player.strikeOuts}</td>
            <td>{player.rbi}</td>
            <td>{player.battingAverage}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SoftballStats;