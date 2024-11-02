import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

const AdminPage = () => {
  const { articles, currentPage } = useSelector((state) => state.articles);
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleCreateArticle = () => {
    const token = localStorage.getItem('access_token');
    axios.post(
      'http://127.0.0.1:8000/api/v1/articles/',
      { title, body },
      { headers: { Authorization: `Bearer ${token}` } }
    )
    .then(() => {
      dispatch(fetchArticles(currentPage));
    })
    .catch((error) => {
      console.error('Error creating article:', error);
    });
  };

  const handleDeleteArticle = (id) => {
    const token = localStorage.getItem('access_token');
    axios.delete(`http://127.0.0.1:8081/api/v1/articles/${id}/`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(() => {
      dispatch(fetchArticles(currentPage));
    })
    .catch((error) => {
      console.error('Error deleting article:', error);
    });
  };

  return (
    <div>
      <h1>Admin Page</h1>
      <h2>Create New Article</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <button onClick={handleCreateArticle}>Create Article</button>

      <h2>Manage Articles</h2>
      <ul>
        {articles.map((article) => (
          <li key={article.id}>
            {article.title}
            <button onClick={() => handleDeleteArticle(article.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPage;
