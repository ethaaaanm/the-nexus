import React from "react";

const Schedule = ({ schedule, selectedMonth }) => {
  const matches = schedule[selectedMonth];

  if (!matches) {
    return <p>No matches scheduled for {selectedMonth}.</p>;
  }

  return (
    <div className="schedule-section">
      {matches.map((match, index) => (
        <div key={index} className="schedule-item">
          <h3>{match.sport}</h3>
          <p>
            {match.teams[0]} ({match.score[0]}) vs {match.teams[1]} (
            {match.score[1]})
          </p>
          {match.time && <p>{match.time}</p>}
        </div>
      ))}
    </div>
  );
};

export default Schedule;