import { createSlice } from '@reduxjs/toolkit';

const selectedIdInitialState = {
  selectedId: null
};

const selectedIdSlice = createSlice({
  name: 'selectedId',
  initialState: selectedIdInitialState,
  reducers: {
    setSelectedId(state, action) {
      state.selectedId = action.payload;
    },
    resetSelectedId: () => selectedIdInitialState
  }
});

const playerInitialState = {
  playerId: null,
  token: null
};

const playerSlice = createSlice({
  name: 'player',
  initialState: playerInitialState,
  reducers: {
    setPlayerData(state, action) {
      state.playerId = action.payload.playerId;
      state.token = action.payload.token;
    },
    resetPlayerData: () => playerInitialState
  }
});

const droneInitialState = {
  position: { x: 250, y: 0 },
  speed: 1
};

const droneSlice = createSlice({
  name: 'drone',
  initialState: droneInitialState,
  reducers: {
    setDronePosition: (state, action) => {
      state.position = action.payload;
    },
    setDroneSpeed: (state, action) => {
      state.speed = action.payload;
    },
    resetDrone: () => droneInitialState
  }
});

const sessionInitialState = {
  currentScore: 0,
  playerName: '',
  sessions: JSON.parse(localStorage.getItem('sessions')) || []
};

const sessionSlice = createSlice({
  name: 'session',
  initialState: sessionInitialState,
  reducers: {
    updateScore: (state, action) => {
      state.currentScore += action.payload;
    },
    addSession: (state, action) => {
      state.sessions.push(action.payload);
      localStorage.setItem('sessions', JSON.stringify(state.sessions));
    },
    resetScore: (state) => {
      state.currentScore = 0;
    },
    setPlayerName: (state, action) => {
      state.playerName = action.payload;
    }
  }
});
const gameStateInitialState = {
  isGameOver: false
};

const gameStateSlice = createSlice({
  name: 'gameState',
  initialState: gameStateInitialState,
  reducers: {
    setGameOver: (state, action) => {
      state.isGameOver = action.payload;
    },
    resetGameState: () => gameStateInitialState
  }
});
export const { setGameOver, resetGameState } = gameStateSlice.actions;
export const { setSelectedId, resetSelectedId } = selectedIdSlice.actions;
export const { setPlayerData, resetPlayerData } = playerSlice.actions;
export const { setDronePosition, setDroneSpeed, resetDrone } = droneSlice.actions;
export const { updateScore, addSession, resetScore, setPlayerName } = sessionSlice.actions;

export default {
  selectedId: selectedIdSlice.reducer,
  player: playerSlice.reducer,
  drone: droneSlice.reducer,
  session: sessionSlice.reducer,
  gameState: gameStateSlice.reducer
};
