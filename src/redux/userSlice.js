import { createSlice } from '@reduxjs/toolkit';
import { auth } from '../config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';


const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: null,
    isLoading: false,
  },
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setCurrentUser, setLoading } = userSlice.actions;

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    dispatch(setCurrentUser(JSON.stringify(user)));
    dispatch(setLoading(false));
  } catch (error) {
    // Handle error
    dispatch(setLoading(false));
  }
};

export const logout = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    await auth.signOut();
    dispatch(setCurrentUser(null));
    dispatch(setLoading(false));
  } catch (error) {
    // Handle error
    dispatch(setLoading(false));
  }
};

export default userSlice.reducer;
