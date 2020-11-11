import Chip from "./chip";
import "../css/components/list_tile.css";

function ListTile({
  title,
  type,
  price,
  chipText,
  chipBackground,
  onChipClick,
}) {
  return (
    <div className="list-tile mb4">
      <h6>{title}</h6>
      <div className="spaced-between">
        <p> {type}</p>
        <p>₹ {price}</p>
      </div>

      <div className="select-chip" onClick={onChipClick}>
        <Chip text={chipText} background={chipBackground ?? "primary-light"} />
      </div>
    </div>
  );
}
export default ListTile;
