export const scoreCount = (droneVerticalSpeed, complexity) => {
  const scoreMultiplier = 1;
  return Number(scoreMultiplier * (droneVerticalSpeed + Number(complexity)));
};
