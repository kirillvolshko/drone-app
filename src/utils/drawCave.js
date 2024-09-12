export const drawCave = (
  ctx,
  caveData,
  canvasWidth,
  canvasHeight,
  wallHeight,
  scrollOffset = 0
) => {
  ctx.fillStyle = '#F0F6F9';
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  ctx.fillStyle = '#1E2841';

  ctx.beginPath();
  ctx.moveTo(0, -scrollOffset);
  caveData.forEach((segment, index) => {
    const left = segment[0];
    const y = index * wallHeight - scrollOffset;
    const leftX = canvasWidth / 2 + left;
    ctx.lineTo(leftX, y);
  });
  ctx.lineTo(0, canvasHeight);
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(canvasWidth, -scrollOffset);
  caveData.forEach((segment, index) => {
    const right = segment[1];
    const y = index * wallHeight - scrollOffset;
    const rightX = canvasWidth / 2 + right;
    ctx.lineTo(rightX, y);
  });
  ctx.lineTo(canvasWidth, canvasHeight);
  ctx.closePath();
  ctx.fill();

  ctx.lineWidth = 2;
  ctx.strokeStyle = '#A0AABF';
  ctx.stroke();
};
