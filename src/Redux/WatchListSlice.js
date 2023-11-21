const { createSlice } = require('@reduxjs/toolkit');
const { act } = require('react-test-renderer');

const WatchListSlice = createSlice({
  name: 'watchlist',
  initialState: { data: [] },
  reducers: {
    addItemToList(state, action) {
      state.data.push(action.payload); // Use action.payload to add the item
    },
    removeItemFromList(state, action) {
      const itemIdToRemove = action.payload; // Assuming you pass the item ID to remove
      state.data = state.data.filter(item => item.id !== itemIdToRemove);
    },
  },
});

export const { addItemToList,removeItemFromList } = WatchListSlice.actions;
export default WatchListSlice.reducer;
