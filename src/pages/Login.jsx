import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Link } from "react-router-dom";
export default function Login() {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();
  //handleSubmit
  const handleSubmit = async (e) => {
    //prevent refresh
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    try {
     await signInWithEmailAndPassword(auth, email, password);
     //if everything okay
     navigate('/')
    } catch (error) {
      setErr(true);
    }
  };
  return (
    <div className="form-container">
      <div className="form-wrapper">
        <span className="logo">Chat NGPT</span>
        <span className="title">Login</span>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          <button>Sign in</button>
          {err && <span className="error">Something went wrong!</span>}
        </form>
        <p>
          You don't have an account? <Link to='/register'>Register</Link>
        </p>
      </div>
    </div>
  );
}
