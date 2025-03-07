import Contact from "../Contact/Contact";
import s from "./ContactList.module.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteContact } from "../../redux/contactsSlice";

export default function ContactList() {
  const dispatch = useDispatch();

  const StatusContacts = useSelector((state) => state.contacts.items);

  const StatusFilter = useSelector((state) => state.filters.name);

  const handleDelete = (id) => {
    dispatch(deleteContact(id));
  };
  const filterContacts = StatusContacts.filter((contact) =>
    contact.name
      .trim()
      .toLowerCase()
      .includes(StatusFilter.trim().toLowerCase())
  );
  return (
    <ul className={s.list}>
      {filterContacts.map((item) => (
        <Contact key={item.id} item={item} onDelete={handleDelete} />
      ))}
    </ul>
  );
}
