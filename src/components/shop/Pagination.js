import React from 'react';

const Pagination = ({ currentPage, totalPages }) => {
  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    // Always show first page
    pages.push(
      <li key={1}>
        <a href="/shop?page=1" className={currentPage === 1 ? 'current' : ''}>
          1
        </a>
      </li>
    );

    // Show pages around current page
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    if (start > 2) {
      pages.push(
        <li key="ellipsis1">
          <span>...</span>
        </li>
      );
    }

    for (let i = start; i <= end; i++) {
      pages.push(
        <li key={i}>
          <a href={`/shop?page=${i}`} className={currentPage === i ? 'current' : ''}>
            {i}
          </a>
        </li>
      );
    }

    if (end < totalPages - 1) {
      pages.push(
        <li key="ellipsis2">
          <span>...</span>
        </li>
      );
    }

    // Always show last page if there's more than one page
    if (totalPages > 1) {
      pages.push(
        <li key={totalPages}>
          <a href={`/shop?page=${totalPages}`} className={currentPage === totalPages ? 'current' : ''}>
            {totalPages}
          </a>
        </li>
      );
    }

    return pages;
  };

  return (
    <div className="pagination-wrap">
      <ul className="list-wrap">
        <li className="prv-next">
          <a href={`/shop?page=${Math.max(1, currentPage - 1)}`}>
            <i className="fas fa-angle-double-left"></i>
          </a>
        </li>
        {renderPageNumbers()}
        <li className="prv-right">
          <a href={`/shop?page=${Math.min(totalPages, currentPage + 1)}`}>
            <i className="fas fa-angle-double-right"></i>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
