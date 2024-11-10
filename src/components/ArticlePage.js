import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import parse from 'html-react-parser';
import { Carousel } from 'react-bootstrap';
import './ArticlePage.css';
import { format } from 'date-fns';

const addBaseUrlToImages = (htmlString) => {
  const baseUrl = 'http://192.168.0.166:8081/';
  return htmlString.replace(/src="\/media\/uploads/g, `src="${baseUrl}media/uploads`);
};

const ArticlePage = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    axios.get(`http://192.168.0.166:8081/api/v1/articles/${id}/`)
      .then(response => setArticle(response.data))
      .catch(error => console.error('Error fetching article:', error));
  }, [id]);

  if (!article) {
    return <div>Loading...</div>;
  }

  // Move processedBody calculation inside the render method
  const processedBody = addBaseUrlToImages(article.body);

  return (
    <div className="article-page">
      <h1 className="article-title">{article.title}</h1>
      <p className="article-meta">
        <small>
          {article.author.username} | {format(new Date(article.created_at), 'MMMM dd, yyyy')}
        </small>
      </p>

      {article.images && article.images.length > 0 ? (
        <Carousel interval={3000} fade className="image-carousel">
          {article.images.map((image, index) => (
            <Carousel.Item key={index}>
              <img 
                src={image.image} 
                alt={`Image ${image.image}`} 
                className="carousel-image"
              />
              <Carousel.Caption>
                <h6>{image.caption || `Image ${image.image}`}</h6>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      ) : (
        article.images && article.images[0] && (
          <img
            src={article.images[0].url}
            alt="Article"
            className="single-image"
          />
        )
      )}
      <div className="article-body">
        {parse(processedBody)}
      </div>
    </div>
  );
};

export default ArticlePage;
