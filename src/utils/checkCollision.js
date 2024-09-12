export const checkCollision = (caveData, scrollOffset, droneX) => {
  const canvasWidth = 500;
  const droneWidth = 15;
  const canvasCenter = canvasWidth / 2;
  const droneYIndex = Math.floor(scrollOffset / 10);
  const [leftWall, rightWall] = caveData[droneYIndex];

  let droneXPositionRight = canvasWidth - droneX - droneWidth;
  let droneXPositionLeft = canvasWidth - droneX + droneWidth;

  if (droneXPositionRight < canvasCenter - rightWall) {
    return true;
  }

  if (droneXPositionLeft > canvasCenter - leftWall) {
    return true;
  }

  return false;
};
