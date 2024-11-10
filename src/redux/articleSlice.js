// blognews-frontend/src/redux/articleSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchArticles = createAsyncThunk('articles/fetchArticles', async (page = 1) => {
  const response = await axios.get(`http://192.168.0.166:8081/api/v1/articles/?page=${page}`);
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
    deleteArticle: (state, action) => {
      // Ensure payload is not an array
      const articleId = Array.isArray(action.payload) ? action.payload[0] : action.payload;
      // Create a new array and apply the filter operation
      const filteredArticles = state.articles.filter((article) => article.id !== articleId);
      state.articles = [...filteredArticles];
    },       
    addNewArticle: (state, action) => {
      state.articles = [action.payload, ...JSON.parse(JSON.stringify(state.articles))];
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

export const { setPage, deleteArticle, addNewArticle } = articleSlice.actions;
export default articleSlice.reducer;
