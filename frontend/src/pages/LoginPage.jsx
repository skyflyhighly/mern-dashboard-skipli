import axios from "axios";
import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthenticationContext";

function LoginPage() {
  const phoneNumberInput = useRef(null);
  const accessCodeInput = useRef(null);
  const [submittedPhoneNumber, setSubmittedPhoneNumber] = useState(null);
  const { authenticate } = useAuth();
  const navigate = useNavigate();
  const { state } = useLocation();

  const submitPhoneNumber = (e) => {
    e.preventDefault();
    const phoneNumber = phoneNumberInput.current.value;
    axios
      .post("http://localhost:3000/users", { phoneNumber })
      .then(() => {
        setSubmittedPhoneNumber(() => phoneNumber);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const submitAccessCode = (e) => {
    e.preventDefault();
    const accessCode = accessCodeInput.current.value;
    axios
      .post("http://localhost:3000/users/validate", {
        phoneNumber: submittedPhoneNumber,
        accessCode,
      })
      .then((response) => {
        if (response.status === 200) {
          authenticate(submittedPhoneNumber);
          navigate(state?.path || "/");
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="container">
      <h1 className="mb-4">Login Page</h1>
      <form onSubmit={submitPhoneNumber} className="mb-4">
        <label htmlFor="phone-number">Phone Number</label>
        <input
          className="form-control mb-2"
          name="phone-number"
          id="phone-number"
          type="text"
          ref={phoneNumberInput}
        />
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
      {!submittedPhoneNumber ? null : <div>Enter the Access Code</div>}
      <form onSubmit={submitAccessCode}>
        <label htmlFor="access-code">Access Code</label>
        <input
          className="form-control mb-2"
          name="access-code"
          id="access-code"
          type="text"
          ref={accessCodeInput}
          disabled={!submittedPhoneNumber}
        />
        <button
          className="btn btn-primary"
          type="submit"
          disabled={!submittedPhoneNumber}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
