import { createSlice } from '@reduxjs/toolkit';
import { ProfileMenuItems as ProfileMenuItemsData } from '@/data';


const profileMenuItemsSlice = createSlice({
  name: 'profileMenu',
  initialState: { "profileMenuItems": ProfileMenuItemsData },
  reducers: {
    setProfileMenuItems(state, action) {
      state.profileMenuItems = action.payload;
    },
  },
});

export const { setProfileMenuItems } = profileMenuItemsSlice.actions;
export const { profileMenuItems } = profileMenuItemsSlice.getInitialState();
export default profileMenuItemsSlice.reducer;
