import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { drawCave } from '../utils/drawCave';
import { drawDrone } from '../utils/drawDrone';
import { checkCollision } from '../utils/checkCollision';
import { updateScore, addSession, setGameOver } from '../store/reducer';
import EndGamePopup from './EndGamePopup';
import { scoreCount } from '../utils/scoreCount';
import ScoreGameBar from './ScoreGameBar';
import useCave from '../hooks/useCave';

function Cave({ caveData }) {
  const dispatch = useDispatch();
  const canvasRef = useRef(null);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isWin, setIsWin] = useState(false);
  const [sessionSaved, setSessionSaved] = useState(false);

  const dronePosition = useSelector((state) => state.drone.position);
  const droneSpeed = useSelector((state) => state.drone.speed);
  const complexity = useSelector((state) => state.selectedId.selectedId);
  const playerName = useSelector((state) => state.session.playerName);
  const currentScore = useSelector((state) => state.session.currentScore);

  const canvasWidth = 500;
  const wallHeight = 10;
  useCave(isGameOver);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = true;
    const canvasHeight = caveData.length * wallHeight;
    canvas.height = canvasHeight;

    let animationIntervalId;

    const renderScene = () => {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      ctx.save();
      ctx.translate(0, -scrollOffset);
      drawCave(ctx, caveData, canvasWidth, canvasHeight, wallHeight);
      ctx.restore();
      drawDrone(ctx, dronePosition.x, canvasHeight / 2);

      const isColliding = checkCollision(caveData, scrollOffset, dronePosition.x);

      if (isColliding) {
        clearInterval(animationIntervalId);
        setIsGameOver(true);
        setIsWin(false);
        dispatch(setGameOver(true));
      } else if (scrollOffset >= canvasHeight) {
        clearInterval(animationIntervalId);
        setIsGameOver(true);
        setIsWin(true);
        dispatch(setGameOver(true));
      } else {
        const newScore = scoreCount(droneSpeed, complexity);
        dispatch(updateScore(newScore));
      }
    };

    if (!isGameOver) {
      animationIntervalId = setInterval(() => {
        setScrollOffset((prevOffset) => prevOffset + droneSpeed);
      }, 50);
    }

    renderScene();

    return () => {
      clearInterval(animationIntervalId);
    };
  }, [
    caveData,
    canvasWidth,
    wallHeight,
    dronePosition,
    scrollOffset,
    droneSpeed,
    complexity,
    isGameOver
  ]);

  useEffect(() => {
    if (isGameOver && !sessionSaved) {
      const sessionData = {
        playerId: playerName,
        complexity: complexity,
        finalScore: currentScore
      };
      dispatch(addSession(sessionData));
      setSessionSaved(true);
    }
  }, [isGameOver, sessionSaved, playerName, complexity, currentScore, dispatch]);

  return (
    <div className="flex justify-center items-center">
      <ScoreGameBar />
      <canvas ref={canvasRef} width={canvasWidth} />
      {isGameOver && <EndGamePopup isWin={isWin} />}
    </div>
  );
}

Cave.propTypes = {
  caveData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired
};

export default Cave;
