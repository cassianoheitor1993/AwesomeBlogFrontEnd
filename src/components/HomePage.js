import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArticles, setPage } from '../redux/articleSlice';
import NewsCard from './shared/NewsCard';
import Container from 'react-bootstrap/Container';
import Pagination from 'react-bootstrap/Pagination';
import './HomePage.css';
import Spinner from 'react-bootstrap/Spinner';

const HomePage = () => {
  const dispatch = useDispatch();
  const { articles, currentPage, totalPages, status } = useSelector((state) => state.articles);

  useEffect(() => {
    dispatch(fetchArticles(currentPage));
  }, [dispatch, currentPage]);

  const handlePageChange = (newPage) => {
    dispatch(setPage(newPage));
  };

  const renderPaginationItems = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(currentPage - Math.floor(maxPagesToShow / 2), 1);
    let endPage = startPage + maxPagesToShow - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(endPage - maxPagesToShow + 1, 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <Pagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </Pagination.Item>
      );
    }

    return pageNumbers;
  };

  if (status === 'loading') return <Spinner animation="border" variant="primary" style={{display: 'block', margin: '50px auto'}} />;

  return (
    <Container>
      <div className="pagination-container">
        <Pagination>
          <Pagination.First 
            onClick={() => handlePageChange(1)} 
            disabled={currentPage === 1}
            style={{ cursor: 'pointer' }}
          />
          <Pagination.Prev
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          />
          {renderPaginationItems()}
          <Pagination.Next
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          />
          <Pagination.Last 
            onClick={() => handlePageChange(totalPages)} 
            disabled={currentPage === totalPages}
            style={{ cursor: 'pointer' }}
          />
        </Pagination>
      </div>

      {/* Articles Layout as Flex */}
      <div className="articles-container">
        {articles.length === 0 ? (
          <div>No articles found</div>
        ) : (
          articles.map((article) => (
            <div
              key={article.id}
              className="news-card-container"
            >
              <NewsCard article={article} />
            </div>
          ))
        )}
      </div>

      {/* Bottom Pagination */}
      <div className="pagination-container mb-4">
        <Pagination>
          <Pagination.First 
            onClick={() => handlePageChange(1)} 
            disabled={currentPage === 1}
            style={{ cursor: 'pointer' }}
          />
          <Pagination.Prev
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          />
          {renderPaginationItems()}
          <Pagination.Next
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          />
          <Pagination.Last 
            onClick={() => handlePageChange(totalPages)} 
            disabled={currentPage === totalPages}
            style={{ cursor: 'pointer' }}
          />
        </Pagination>
      </div>
    </Container>
  );
};

export default HomePage;
