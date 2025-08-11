import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  data: null,
  user_token: null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
   setUser(state, {payload}){
      state.data = payload.user;
      state.user_token = payload.user_token;
      localStorage.setItem("user", JSON.stringify(state));   // payload.data contains the user data  // coz data obj form me h 
      // console.log(payload.admin, "Admin info....")   //  payload saari info store krta h , we dont create it, its automaticallyh created !!
   },
   lsToUser(state){
    const user = JSON.parse(localStorage.getItem("user"));

    if(user){
      state.data =user.data
      state.token = user.user_token
    }
   },
   userLogout(state) {
    state.data = null;
    state.user_token = null;
    localStorage.removeItem("user");
   }
  },
})

// Action creators are generated for each case reducer function
export const { setUser, lsToUser, userLogout } = userSlice.actions

export default userSlice.reducer