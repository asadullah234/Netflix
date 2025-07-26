import React, { useState } from "react";
import { login, signup } from "../../firebase.js";
import "./Login.css";
import netflix_spinner from "../../assets/netflix_spinner.gif";
import netflix_logo from "../../assets/logo.png";

const Login = () => {
    const [signState, setSignState] = useState('Sign In');
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const user_auth = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (signState === 'Sign In') {
            await login(email, password);
        } else {
            await signup(name, email, password);
        }
        setLoading(false);
    }

    return (
        loading ? (
            <div className="login-spinner">
                <img src={netflix_spinner} alt="" />
            </div>
        ) : (
            <div className="login">
                <img src={netflix_logo} className="login_logo" alt="Netflix Logo" />
                <div className="login-form">
                    <h1>{signState}</h1>
                    <form>
                        {signState === "Sign Up" && (
                            <input 
                                type="text" 
                                placeholder="Your name" 
                                value={name} 
                                onChange={(e) => setName(e.target.value)} 
                            />
                        )}
                       
                        <input 
                            value={email}   
                            onChange={(e) => setEmail(e.target.value)} 
                            type='email' 
                            placeholder="your email" 
                        />
                        <input 
                            type='password' 
                            placeholder="password" 
                            value={password}    
                            onChange={(e) => setPassword(e.target.value)}  // Fixed this line
                        />
                        <button onClick={user_auth} type="submit">{signState}</button>
                        <div className="form-help">
                            <div className="remember">
                                <input type="checkbox" />
                                <label htmlFor="">Remember Me</label>
                            </div>
                            <p>Need help?</p>
                        </div>
                    </form>
                    <div className="form-switch">
                        {signState === "Sign In" ? (
                            <p>New to Netflix? <span onClick={() => setSignState("Sign Up")}>Sign up Now</span></p>
                        ) : (
                            <p>Already have account? <span onClick={() => setSignState("Sign In")}>Sign In Now</span></p>
                        )}
                    </div>
                </div>
            </div>
        )
    )
}

export default Login;