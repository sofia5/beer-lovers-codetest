const PageItem = ({
  disabled,
  first,
  last,
  index,
}: {
  disabled: boolean;
  first: boolean;
  last: boolean;
  index: number;
}) => {
  const title = first ? "Previous" : last ? "Next" : index;

  return (
    <li className={`page-item ${disabled ? "disabled" : undefined}`}>
      <a
        className="page-link"
        href="#test"
        tabIndex={disabled ? -1 : undefined}
        aria-disabled={disabled}
      >
        {title}
      </a>
    </li>
  );
};

export default PageItem;
