import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Pagination = ({
  pages,
  activePage,
}: {
  pages: number;
  activePage: number;
}) => {
  return (
    <nav className="mt-4" aria-label="Page navigation">
      <ul className="pagination justify-content-end">
        <li
          className={`page-item ${activePage === 1 ? "disabled" : undefined}`}
        >
          <a
            className="page-link"
            href={`#page-${activePage - 1}`}
            tabIndex={activePage === 1 ? -1 : undefined}
            aria-disabled={activePage === 1}
          >
            Previous
          </a>
        </li>
        {Array.from(Array(pages), (e, i) => (
          <li key={i} className="page-item">
            <a
              className={`page-link ${
                activePage === i + 1 ? "active" : undefined
              }`}
              href={`#page-${i + 1}`}
            >
              {i + 1}
            </a>
          </li>
        ))}
        <li
          className={`page-item ${
            activePage === pages ? "disabled" : undefined
          }`}
        >
          <a
            className="page-link"
            href={`#page-${activePage + 1}`}
            tabIndex={activePage === pages ? -1 : undefined}
            aria-disabled={activePage === pages}
          >
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
