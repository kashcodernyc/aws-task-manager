import React, { useState, useContext } from 'react'
import AccountContext from '../../Context/AccountContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [email, setEmail] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const { signUp } = useContext(AccountContext);
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
    }

    const handleRegistration = (e) => {
        e.preventDefault();
        signUp(email, userName, password).then(data => {
            console.log("Registered Successfully", data);
        }).catch(err => {
            console.log("Failed to Register", err.message);
        })
    }

    return (
        <>
            <div className='authPage'>
                <div className="authContainer">
                    <h1 className="authHeader"> React Task Manager</h1>
                    <h1>Regisrter an Account</h1>
                    <form onSubmit={handleRegistration}>
                        <div className="formInput">
                            <label>Name</label>
                            <input id="name" value={userName} type="text" placeholder="type name" onChange={(e) => setUserName(e.target.value)} required />
                        </div>
                        <div className="formInput">
                            <label>Email</label>
                            <input id="email" value={email} type="email" placeholder="type email" onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className="formInput">
                            <label>Password</label>
                            <input id="password" type="password" placeholder="type password" onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <button className="button" type="submit">Register</button>
                        <div className="register">
                            <span>already have account? <button className="spanBtn" onClick={() => navigate('/login')}>Login</button></span>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Register