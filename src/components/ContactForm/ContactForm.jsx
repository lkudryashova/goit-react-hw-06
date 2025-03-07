import s from "./ContactForm.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { nanoid } from "nanoid";
import { addContact } from "../../redux/contactsSlice";
import { useId } from "react";
import { useDispatch } from "react-redux";

export default function ContactForm() {
  const nameId = useId();
  const numberId = useId();
  const dispatch = useDispatch();
  return (
    <Formik
      initialValues={{ name: "", number: "" }}
      validationSchema={Yup.object({
        name: Yup.string()
          .required("Required")
          .min(3, "Too short! Must be at least 3 characters")
          .max(50, "Too long! Must be 50 characters or less"),
        number: Yup.string().required("Required"),
      })}
      onSubmit={(values, actions) => {
        dispatch(
          addContact({ id: nanoid(), name: values.name, number: values.number })
        );
        actions.resetForm();
      }}
    >
      <Form className={s.form}>
        <label htmlFor={nameId}>Name</label>
        <Field id={nameId} name="name" type="text" />
        <ErrorMessage className={s.error} name="name" component="div" />
        <label htmlFor={numberId}>Number</label>
        <Field id={numberId} name="number" type="text" />
        <ErrorMessage className={s.error} name="number" component="div" />

        <button className={s.button} type="submit">
          Add contact
        </button>
      </Form>
    </Formik>
  );
}
