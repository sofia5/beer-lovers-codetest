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
  const toggleActive = () => {
    if (!(active?.id === id)) {
      handleClick({ id, ascOrDesc: "asc" });
    } else {
      handleClick({
        id,
        ascOrDesc: active.ascOrDesc === "desc" ? "asc" : "desc",
      });
    }
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
                !(active?.id === id && active?.ascOrDesc === "asc")
                  ? "text-muted"
                  : undefined
              }`}
            />
            <FontAwesomeIcon
              icon={faSortDown}
              className={`
              ${styles.sortIconRight}
              ${
                !(active?.id === id && active?.ascOrDesc === "desc")
                  ? "text-muted"
                  : undefined
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
