import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setDronePosition, setDroneSpeed } from '../store/reducer';

const Drone = () => {
  const dispatch = useDispatch();
  const dronePosition = useSelector((state) => state.drone.position);
  const droneSpeed = useSelector((state) => state.drone.speed);

  const handleKeyDown = (e) => {
    let newX = dronePosition.x;
    let newSpeed = droneSpeed;
    if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
      e.preventDefault();
    }

    switch (e.key) {
      case 'ArrowLeft':
        newX = Math.max(newX - 5, 0);
        break;
      case 'ArrowRight':
        newX = Math.min(newX + 5, 500);
        break;
      case 'ArrowUp':
        newSpeed = Math.min(droneSpeed + 1, 10);
        break;
      case 'ArrowDown':
        newSpeed = Math.max(droneSpeed - 1, 1);
        break;
      default:
        return;
    }

    dispatch(setDronePosition({ x: newX, y: dronePosition.y }));
    dispatch(setDroneSpeed(newSpeed));
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [dronePosition, droneSpeed]);

  return null;
};

export default Drone;
