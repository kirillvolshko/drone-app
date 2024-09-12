import { useSelector } from 'react-redux';
import useCave from '../hooks/useCave';
import Cave from '../components/Cave';
import Drone from '../components/Drone';
import { useState, useEffect } from 'react';
import Spiner from '../components/Spiner';

function GamePage() {
  const { playerId, token } = useSelector((state) => state.player);
  const { caveData, error } = useCave(playerId, token);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (caveData && caveData.length >= 1000) {
      setIsLoading(false);
    }
  }, [caveData]);

  return (
    <div>
      {error && <div>Error: {error.message}</div>}

      {isLoading ? (
        <Spiner />
      ) : (
        <>
          <Cave caveData={caveData} />
          <Drone />
        </>
      )}
    </div>
  );
}

export default GamePage;
