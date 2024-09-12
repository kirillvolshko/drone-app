import { useSelector } from 'react-redux';

function ScoreGameBar() {
  const dronePosition = useSelector((state) => state.drone.position);
  const droneSpeed = useSelector((state) => state.drone.speed);
  const centerX = 250;
  const maxSpeed = 250;
  const horizontalSpeedValue = dronePosition.x - centerX;
  const horizontalSpeedPercentage = (Math.abs(horizontalSpeedValue) / maxSpeed) * 100;

  return (
    <div className="fixed top-0 left-0 p-4">
      <div className="mb-4">
        <p>Horizontal Speed</p>
        <div className="w-64 h-6 bg-gray-300 relative">
          {horizontalSpeedValue < 0 && (
            <div
              className="h-full bg-plusBlue absolute"
              style={{ width: `${horizontalSpeedPercentage}%`, right: '50%' }}
            />
          )}
          {horizontalSpeedValue > 0 && (
            <div
              className="h-full bg-plusBlue absolute"
              style={{ width: `${horizontalSpeedPercentage}%`, left: '50%' }}
            />
          )}
          <div className="h-full w-0.5 bg-black absolute left-1/2 transform -translate-x-1/2" />
        </div>
        <p>
          {horizontalSpeedValue < 0
            ? `Left: ${horizontalSpeedValue}`
            : `Right: ${horizontalSpeedValue}`}
        </p>
      </div>

      <div>
        <p>Vertical Speed</p>
        <div className="w-64 h-6 relative">
          <div
            className="h-full bg-plusBlue-200"
            style={{ width: `${(Math.min(droneSpeed, maxSpeed) / maxSpeed) * 100}%` }}
          />
        </div>
        <p>Speed: {droneSpeed}</p>
      </div>
    </div>
  );
}

export default ScoreGameBar;
