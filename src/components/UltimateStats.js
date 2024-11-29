import React from "react";

const UltimateStats = ({ playerStats }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Player</th>
          <th>Games Played</th>
          <th>Points</th>
          <th>Assists</th>
          <th>Blocks</th>
        </tr>
      </thead>
      <tbody>
        {playerStats.map((player) => (
          <tr key={player.playerName}>
            <td>{player.playerName}</td>
            <td>{player.gamesPlayed}</td>
            <td>{player.points}</td>
            <td>{player.assists}</td>
            <td>{player.blocks}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UltimateStats;