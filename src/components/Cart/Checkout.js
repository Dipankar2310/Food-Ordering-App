import classes from "./Checkout.module.css";
import { useRef, useState } from "react";
const Checkout = (props) => {
  const [formValidity, setFormValidity] = useState({
    name: true,
    street: true,
    postal: true,
    city: true,
  });
  const isEmpty = (value) => value.trim() === "";
  const isPostal = (value) => value.trim().length === 6;
  const confirmHandler = (event) => {
    event.preventDefault();
    const enteredName = nameRef.current.value;
    const enteredStreet = streetRef.current.value;
    const enteredPostal = postalRef.current.value;
    const enteredCity = cityRef.current.value;
    const nameIsValid = !isEmpty(enteredName);
    const streetIsvalid = !isEmpty(enteredStreet);
    const postalIsValid = isPostal(enteredPostal);
    const cityIsvalid = !isEmpty(enteredCity);

    setFormValidity({
      name: nameIsValid,
      street: streetIsvalid,
      postal: postalIsValid,
      city: cityIsvalid,
    });

    const formIsValid =
      nameIsValid && streetIsvalid && postalIsValid && cityIsvalid;

    if (!formIsValid) {
      return;
    }
    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      postal: enteredPostal,
      city: enteredPostal,
    });
  };
  const nameRef = useRef();
  const postalRef = useRef();
  const cityRef = useRef();
  const streetRef = useRef();
  const nameControlClasses = `${classes.control} ${
    formValidity.name ? "" : classes.invalid
  }`;
  const streetControlClasses = `${classes.control} ${
    formValidity.street ? "" : classes.invalid
  }`;
  const postalControlClasses = `${classes.control} ${
    formValidity.postal ? "" : classes.invalid
  }`;
  const cityControlClasses = `${classes.control} ${
    formValidity.city ? "" : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameRef} />
        {!formValidity.name && <p>Please enter a valid name</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetRef} />
        {!formValidity.street && <p>Please enter a valid street</p>}
      </div>
      <div className={postalControlClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalRef} />
        {!formValidity.postal && (
          <p>Please enter a valid postal code that is 6 digits long</p>
        )}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityRef} />
        {!formValidity.city && <p>Please enter a valid city</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
