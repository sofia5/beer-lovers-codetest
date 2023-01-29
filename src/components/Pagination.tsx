const Pagination = ({
  activePage,
  lastPage,
  handleClick,
}: {
  activePage: number;
  lastPage: boolean;
  handleClick: (page: number) => void;
}) => {
  return (
    <nav className="mt-4" aria-label="Page navigation">
      <ul className="pagination justify-content-end">
        <li
          className={`page-item ${activePage === 1 ? "disabled" : undefined}`}
        >
          <button
            className="page-link"
            onClick={() => handleClick(activePage - 1)}
            tabIndex={activePage === 1 ? -1 : undefined}
            aria-disabled={activePage === 1}
          >
            Previous
          </button>
        </li>
        <li className="page-item">
          <a className="page-link active" href={`#page-${activePage}`}>
            {activePage}
          </a>
        </li>
        <li className={`page-item ${lastPage ? "disabled" : undefined}`}>
          <button
            className="page-link"
            onClick={() => handleClick(activePage + 1)}
            tabIndex={lastPage ? -1 : undefined}
            aria-disabled={lastPage}
          >
            Next
          </button>
        </li>

        {/* If possible to know number of beers available */}
        {/* {Array.from(Array(pages), (e, i) => (
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
        </li> */}
      </ul>
    </nav>
  );
};

export default Pagination;
