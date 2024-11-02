// src/ArticleList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ArticleList = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const fetchArticles = async () => {
            const response = await axios.get('http://localhost:8081/api/articles/');
            setArticles(response.data);
        };
        fetchArticles();
    }, []);

    return (
        <div>
            <h1>Articles</h1>
            <ul>
                {articles.map(article => (
                    <li key={article.id}>
                        <h2>{article.title}</h2>
                        <p>{article.content}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ArticleList;
