import React from 'react';
import { useSelector } from 'react-redux';

function ScoreBoard() {
  const sessions = useSelector((state) => state.session.sessions);
  const sortedSessions = [...sessions].sort((a, b) => b.finalScore - a.finalScore);

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">Scoreboard</h2>
      <table className="table-auto w-full text-left">
        <thead className="bg-plusBlue text-plusBlue-200">
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Score</th>
            <th className="px-4 py-2">Complexity</th>
          </tr>
        </thead>
        <tbody>
          {sortedSessions.map((session, index) => (
            <tr key={index} className="border-t">
              <td className="px-4 py-2">{session.playerId}</td>
              <td className="px-4 py-2">{session.finalScore}</td>
              <td className="px-4 py-2">{session.complexity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ScoreBoard;
