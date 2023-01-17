import { useState } from "react";

const Pagination = ({ pages }: { pages: number }) => {
  const [activePage, setActivePage] = useState(1);

  return (
    <nav className="mt-4" aria-label="Page navigation">
      <ul className="pagination justify-content-end">
        <li
          className={`page-item ${activePage === 0 ? "disabled" : undefined}`}
        >
          <a
            className="page-link"
            href={`#page-1`}
            tabIndex={activePage === 0 ? -1 : undefined}
            aria-disabled={activePage === 0}
            onClick={() => setActivePage(activePage - 1)}
          >
            Previous
          </a>
        </li>
        {Array.from(Array(pages), (e, i) => (
          <li key={i + 1} className="page-item">
            <a
              className={`page-link ${activePage === i ? "active" : undefined}`}
              href={`#page-${i + 1}`}
              onClick={() => setActivePage(i)}
            >
              {i + 1}
            </a>
          </li>
        ))}
        <li
          className={`page-item ${
            activePage === pages - 1 ? "disabled" : undefined
          }`}
        >
          <a
            className="page-link"
            href={`#page-${pages}`}
            tabIndex={activePage === pages - 1 ? -1 : undefined}
            aria-disabled={activePage === pages - 1}
            onClick={() => setActivePage(activePage + 1)}
          >
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
