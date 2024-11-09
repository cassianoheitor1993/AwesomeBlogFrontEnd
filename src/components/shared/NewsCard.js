import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { format } from 'date-fns';
import parse from 'html-react-parser';

const NewsCard = ({ article }) => {
  const formattedDate = format(new Date(article.created_at), 'MMMM dd, yyyy');
  const articleImage = article.images?.[0]?.image || 'https://via.placeholder.com/300';
  const transform = (node) => {
    if (node.type === 'tag' && node.name === 'img') {
      return null;
    }
  };

  const options = {
    replace: transform,
  };

  return (
    <Card style={{ width: '18rem', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <Card.Header>
        <Card.Title>{article.title}</Card.Title>
      </Card.Header>
      <Card.Img
        variant="top"
        src={articleImage}
        alt={article.title}
        style={{ width: '100%', height: '200px', objectFit: 'cover', padding: '10px' }}
      />
      <Card.Body>
        <small className="text-muted">
          {formattedDate} by {article.author.username}
        </small>
        <div className="mt-2">
          {parse(article.body.slice(0, 200), options)}
        </div>
      </Card.Body>
      <Card.Footer>
        <Button 
          variant="primary" 
          as={Link} 
          to={`/articles/${article.id}`}
          style={{ width: '100%' }}
        >
          Read more
        </Button>
      </Card.Footer>
    </Card>
  );
};

NewsCard.propTypes = {
  article: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    author: PropTypes.shape({
      username: PropTypes.string.isRequired,
    }).isRequired,
    created_at: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        image: PropTypes.string,
      })
    ),
  }).isRequired,
};

export default NewsCard;
