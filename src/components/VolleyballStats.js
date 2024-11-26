import React from "react";

const VolleyballStats = ({ playerStats }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Player</th>
          <th>Games Played</th>
          <th>Wins</th>
          <th>Losses</th>
          <th>Win Percentage</th>
        </tr>
      </thead>
      <tbody>
        {playerStats.map((player) => (
          <tr key={player.playerName}>
            <td>{player.playerName}</td>
            <td>{player.gamesPlayed}</td>
            <td>{player.wins}</td>
            <td>{player.losses}</td>
            <td>{player.winPercentage}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default VolleyballStats;