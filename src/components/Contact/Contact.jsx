import s from "./Contact.module.css";
import { IoPerson } from "react-icons/io5";
import { BsFillTelephoneFill } from "react-icons/bs";

export default function Contact({ item, onDelete }) {
  return (
    <li>
      <div className={s.wrapper}>
        <p>
          <IoPerson className={s.icon} />
          {item.name}
        </p>
        <p>
          <BsFillTelephoneFill className={s.icon} />
          {item.number}
        </p>
      </div>
      <button type="button" onClick={() => onDelete(item.id)}>
        Delete
      </button>
    </li>
  );
}
