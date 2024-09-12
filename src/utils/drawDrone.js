export const drawDrone = (ctx, droneX) => {
    const droneHeight = 20;
    const droneWidth = 15;
    const droneTopY = 0;

    ctx.fillStyle = "#BED3DC";
    ctx.beginPath();
    ctx.moveTo(droneX, droneHeight);
    ctx.lineTo(droneX - droneWidth, droneTopY);
    ctx.lineTo(droneX + droneWidth, droneTopY);
    ctx.closePath();
    ctx.fill();
};