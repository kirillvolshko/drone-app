import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetDrone, resetSelectedId, resetPlayerData, resetGameState } from '../store/reducer';

const useCave = (playerId, token) => {
    const [caveData, setCaveData] = useState([]);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const isGameOver = useSelector((state) => state.gameState.isGameOver);

    useEffect(() => {
        if (!playerId || !token) return;

        const socket = new WebSocket(`wss://cave-drone-server.shtoa.xyz/cave`);

        socket.onopen = () => {
            socket.send(`player:${playerId}-${token}`);

            if (isGameOver) {
                socket.send("finished");
                dispatch(resetDrone());
                dispatch(resetPlayerData());
                dispatch(resetSelectedId());
                dispatch(resetGameState());
                socket.close();
                console.log("finished");
            }
        };

        socket.onmessage = (event) => {
            const [left, right] = event.data.split(',').map(Number);
            setCaveData((prevData) => [...prevData, [left, right]]);
        };

        socket.onerror = (error) => {
            console.error('WebSocket error:', error);
            setError(error);
        };

        return () => {
            if (socket.readyState === WebSocket.OPEN) {
                socket.close();
            }
        };
    }, [playerId, token, isGameOver, dispatch]);

    return { caveData, error };
};

export default useCave;
