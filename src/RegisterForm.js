import { useState } from "react";
import "./Form.css"

export default function RegisterForm() {
  const [formValues, setFormValues] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    isvalid: false,
    ismatched: false,
    ispassvalid: false,
  });
  const [formErrors, setFormErrors] = useState({
    emailError: null,
    passError: null,
    nameError: null,
    usernameError: null,
    confirmPasswordError: null,
  });
  const [showPass, setShowPass] = useState(false);

  const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z]+.com$/;
  const passRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

  const handleChange = (e) => {
    // console.log(e.target);
    if (e.target.name === "email") {
      setFormValues({
        ...formValues,
        email: e.target.value,
      });

      if (e.target.value.match(emailRegex)) {
        formValues.isvalid = true;
      }

      setFormErrors({
        ...formErrors,
        emailError:
          e.target.value.length === 0
            ? "email is required"
            : // : e.target.value.length < 3
            // ? "minimum length is 3 characters"
            formValues.isvalid === false
            ? "invalid email"
            : null,
      });
    } else if (e.target.name === "name") {
      setFormValues({
        ...formValues,
        name: e.target.value,
      });

      // if(e.target.value.match(passRegex)){
      //     formValues.ispassvalid=true;
      // }

      setFormErrors({
        ...formErrors,
        nameError:
          e.target.value.length === 0
            ? "name is required"
            : e.target.value.length < 3
            ? "minimum length is 3 characters"
            : null,
      });
    } else if (e.target.name === "username") {
      setFormValues({
        ...formValues,
        username: e.target.value,
      });
      const space = /\s/g;

      const HasSpace = (s) => {
        return space.test(s);
      };

      let checkSpace = HasSpace(formValues.username);

      setFormErrors({
        ...formErrors,
        usernameError:
          e.target.value.length === 0
            ? "username is required"
            : e.target.value.length < 3
            ? "minimum length is 3 character"
            : checkSpace === true
            ? "username must contain no space"
            : null,
      });
    } else if (e.target.name === "password") {
      setFormValues({
        ...formValues,
        password: e.target.value,
      });

      if (e.target.value.match(passRegex)) {
        formValues.ispassvalid = true;
      }

      setFormErrors({
        ...formErrors,
        passError:
          e.target.value === 0
            ? "password is required"
            : e.target.value.length < 8
            ? "minimum length is 8"
            : formValues.ispassvalid == false
            ? "password must contain at least one lowercase , one uppercase , at least one digit and special character"
            : null,
      });
    } else if (e.target.name === "confirmPassword") {
      setFormValues({
        ...formValues,
        confirmPassword: e.target.value,
      });

      setFormErrors({
        confirmPasswordError:
          e.target.value === 0
            ? "password is required"
            : e.target.value.length < 8
            ? "minimum length is 8"
            : e.target.value !== formValues.password
            ? "password doesn't match"
            : null,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formErrors.emailError && !formErrors.passError) {
    }
  };

  const toggle = () => {
    setShowPass(!showPass);
  };


  return (
    <>
      <h2> Registration Form</h2>

      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="mb-3">
          <label htmlFor="nameID" className="form-label">
            Name
          </label>
          <input
            type="text"
            className={`form-control ${
              formErrors.nameError ? "border-danger" : ""
            }`}
            id="nameID"
            placeholder="enter your name"
            aria-describedby="name"
            value={formValues.name}
            onChange={(e) => handleChange(e)}
            name="name"
          />
          <div id="name" className="form-text text-danger">
            {formErrors.nameError}
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email
          </label>
          <input
            type="email"
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
          <p className="form-text text-danger">{formErrors.emailError}</p>
          {/* <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div> */}
        </div>
        <div className="mb-3">
          <label htmlFor="usernameID" className="form-label">
            User Name
          </label>
          <input
            type="text"
            className={`form-control ${
              formErrors.usernameError ? "border-danger" : ""
            }`}
            id="usernameID"
            placeholder="enter your username"
            aria-describedby="username"
            value={formValues.username}
            onChange={(e) => handleChange(e)}
            name="username"
          />
          <div id="username" className="form-text text-danger">
            {formErrors.usernameError}
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
          <p className="form-text text-danger">{formErrors.passError}</p>
        </div>
        <span>
          <img
            onClick={toggle}
            className="eye-icon two"
            src="https://cdns.iconmonstr.com/wp-content/assets/preview/2017/240/iconmonstr-eye-9.png"
            alt="eye-icon"
          />
        </span>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Confirm Password
          </label>
          <input
            type={showPass ? "text" : "password"}
            name="confirmPassword"
            placeholder="enter you password"
            className={`form-control ${
              formErrors.confirmPasswordError ? "border-danger" : ""
            }`}
            id="exampleInputPassword1"
            value={formValues.confirmPassword}
            onChange={(e) => handleChange(e)}
          />
          <p className="form-text text-danger">
            {formErrors.confirmPasswordError}
          </p>
        </div>
        <span>
          <img
            onClick={toggle}
            className="eye-icon three"
            src="https://cdns.iconmonstr.com/wp-content/assets/preview/2017/240/iconmonstr-eye-9.png"
            alt="eye-icon"
          />
        </span>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={
            formErrors.emailError ||
            formErrors.passError ||
            formErrors.nameError ||
            formErrors.usernameError ||
            formErrors.confirmPasswordError
          }
        >
          Register
        </button>
      </form>
    </>
  );
}