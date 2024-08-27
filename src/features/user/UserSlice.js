import { createSlice } from '@reduxjs/toolkit';


export const userSlice = createSlice({
    name: 'user',
  initialState: {
    user: false,
  },
  reducers: {
    fetchuser: (state, action)=>{
        let token = localStorage.getItem('token')
        if(token)
        {
            state.user = true
        }
    }
  }
})

export const { fetchuser } = userSlice.actions;
  
export default userSlice.reducer;
