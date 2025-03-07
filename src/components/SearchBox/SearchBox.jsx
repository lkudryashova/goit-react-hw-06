import { useId } from "react";
import s from "./SearchBox.module.css";
import { useDispatch, useSelector } from "react-redux";
import { changeFilter } from "../../redux/filtersSlice";

export default function SearchBox() {
  const id = useId();

  const StatusFilter = useSelector((state) => state.filters.name);

  const dispatch = useDispatch();

  const handleSearch = (e) => {
    dispatch(changeFilter(e.target.value));
  };
  return (
    <div className={s.searchBox}>
      <label htmlFor={id}>Find contacts by name</label>
      <input id={id} type="text" value={StatusFilter} onChange={handleSearch} />
    </div>
  );
}
