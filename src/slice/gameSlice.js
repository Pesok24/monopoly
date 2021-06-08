import { createSlice } from '@reduxjs/toolkit';

export const gameSlice = createSlice({
  name: 'game',
  initialState: {
    value: 0,
    name: '',
    playersData: [],
    currentPlayer: {},
    fromJoin: false,
    onNotification: {}
  },
  reducers: {
    
    setName: (state, action) => {
      state.name = action.payload
    },
    setPlayersData: (state, action) => {
      state.playersData = action.payload
    },
    setCurrent: (state, action) => {
      state.currentPlayer = action.payload
    },
    setFromJoin: (state, action) => {
      state.fromJoin = action.payload
    },
    setOnNotification: (state, action) => {
      state.onNotification = action.payload
    },
  },
});

export const { setName, setPlayersData, setCurrent, setFromJoin, setOnNotification } = gameSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
// export const selectCount = state => state.counter.value;

export default gameSlice.reducer;
