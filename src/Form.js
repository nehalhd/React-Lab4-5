import { useState } from "react";
import "./Form.css";

export default function Form() {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    isvalid: false,
  });
  const [formErrors, setFormErrors] = useState({
    emailError: "",
    passError: "",
  });
  const [showPass, setShowPass] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    // console.log(e.target);
    if (e.target.name === "email") {
      setFormValues({
        ...formValues,
        email: e.target.value,
      });
      var regex = /^[a-zA-Z0-9]+@[a-zA-Z]+.com$/;
      if (e.target.value.match(regex)) {
        formValues.isvalid = true;
      }

      setFormErrors({
        ...formErrors,
        emailError:
          e.target.value.length === 0
            ? "email is required"
            : e.target.value < 3
            ? "minimum length is 3 characters"
            : formValues.isvalid === false
            ? "invalid email"
            : null,
      });
    } else if (e.target.name === "password") {
      setFormValues({
        ...formValues,
        password: e.target.value,
      });

      setFormErrors({
        ...formErrors,
        passError:
          e.target.value === 0
            ? "password is required"
            : e.target.value.length < 8
            ? "minimum length is 8"
            : null,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formErrors.emailError && !formErrors.passError) {
      // console.log(formValues);
    }
  };

  const toggle = () => {
    setShowPass(!showPass);
  };
  return (
    <>
      <h2>Form</h2>

      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="htmlForm-label">
            Email address
          </label>
          <input
            type="text"
            name="email"
            className={`form-control ${
              formErrors.emailError ? "border-danger" : ""
            }`}
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="enter your email"
            value={formValues.email}
            onChange={(e) => handleChange(e)}
          />
          <p>{formErrors.emailError}</p>
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
              type={showPass ? "text" : "password"}
              name="password"
            placeholder="enter your password"
            className={`form-control ${
              formErrors.passError ? "border-danger" : ""
            }`}
            id="exampleInputPassword1"
            value={formValues.password}
            onChange={(e) => handleChange(e)}
          />
          <p>{formErrors.passError}</p>
        </div>
        <span>
            <img
              onClick={toggle}
              className="eye-icon one"
              src="https://cdns.iconmonstr.com/wp-content/assets/preview/2017/240/iconmonstr-eye-9.png"
              alt="eye-icon"
            />
          </span>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={formErrors.emailError || formErrors.passError}
        >
          Submit
        </button>
      </form>
    </>
  );
}