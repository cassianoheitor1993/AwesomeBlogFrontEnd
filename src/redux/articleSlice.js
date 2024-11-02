import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchArticles = createAsyncThunk('articles/fetchArticles', async (page = 1) => {
  const response = await axios.get(`http://127.0.0.1:8081/api/v1/articles/?page=${page}`);
  return response.data;
});

const articleSlice = createSlice({
  name: 'articles',
  initialState: {
    articles: [],
    currentPage: 1,
    totalPages: 1,
    status: 'idle',
    error: null,
  },
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.articles = action.payload.results;
        state.totalPages = action.payload.total_pages;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setPage } = articleSlice.actions;
export default articleSlice.reducer;