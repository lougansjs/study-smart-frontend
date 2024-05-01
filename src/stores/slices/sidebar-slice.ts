import { createSlice } from '@reduxjs/toolkit';
import { SidebarItems as SidebarItemsData } from '@/data';


const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState: { "sidebarItems": SidebarItemsData },
  reducers: {
    setSidebarItems(state, action) {
      state.sidebarItems = action.payload;
    },
  },
});

export const { setSidebarItems } = sidebarSlice.actions;
export const { sidebarItems } = sidebarSlice.getInitialState();
export default sidebarSlice.reducer;
