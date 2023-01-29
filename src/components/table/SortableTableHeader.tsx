import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortUp, faSortDown } from "@fortawesome/free-solid-svg-icons";
import { AscOrDesc } from "../../helpers/sortBeers";
import styles from "../../scss/SortableTableHeader.module.scss";
import { Beer } from "../../types/interfaces";

export type ActiveTableHeader = {
  id: keyof Beer;
  ascOrDesc: AscOrDesc;
};

const SortableTableHeader = ({
  name,
  id,
  active,
  handleClick,
  sortable = true,
}: {
  name: string;
  id: keyof Beer;
  active?: ActiveTableHeader;
  handleClick: (newActive: ActiveTableHeader) => void;
  sortable?: boolean;
}) => {
  // Set which header column is active and toggle it's order (asc / desc)
  const toggleActive = () => {
    handleClick({
      id,
      ascOrDesc:
        active?.id === id && active.ascOrDesc === "desc" ? "asc" : "desc",
    });
  };

  return (
    <>
      {sortable && (
        <th className="action" onClick={toggleActive}>
          {name}

          <span className="mx-3">
            <FontAwesomeIcon
              icon={faSortUp}
              className={`
              ${
                active?.id === id && active.ascOrDesc === "asc"
                  ? undefined
                  : "text-muted"
              }`}
            />
            <FontAwesomeIcon
              icon={faSortDown}
              className={`
              ${styles.sortIconRight}
              ${
                active?.id === id && active.ascOrDesc === "desc"
                  ? undefined
                  : "text-muted"
              }`}
            />
          </span>
        </th>
      )}
      {!sortable && <th>{name}</th>}
    </>
  );
};

export default SortableTableHeader;
