import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import BASE_URL from '../../services/apiConfig';

export const registerUser = createAsyncThunk('auth/registerUser', async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/register`, userData);
    return response.data; // Assuming the response contains necessary user and token data
  } catch (error) {
    return rejectWithValue(error.response.data); // Use rejectWithValue to handle rejection with custom data
  }
});


