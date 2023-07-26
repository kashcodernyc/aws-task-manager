import React, { useState, useContext, useEffect } from 'react'
import AccountContext from '../../Context/AccountContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { Authenticate, getUserSession } = useContext(AccountContext);
    const navigate = useNavigate();

    useEffect(() => {
        getUserSession().then(session => {
            console.log(session)
        }).catch(err => {
            console.log(err);
        })
    }, [])

    const handleLogin = (e) => {
        e.preventDefault()
        Authenticate(email, password).then(data => {
            localStorage.setItem("email", email);
            console.log("Login Successful!", data);
        }).catch(err => {
            console.log("Login Failed!", err.message);
        })
    }

    return (
        <>
            <div className='authPage'>
                <div className="authContainer">
                    <h1 className="authHeader"> React Task Manager</h1>
                    <h1>Login</h1>
                    <form onSubmit={handleLogin}>
                        <div className="formInput">
                            <label>Email</label>
                            <input id="email" value={email} type="email" placeholder="type email" onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className="formInput">
                            <label>Password</label>
                            <input id="password" type="password" placeholder="type password" onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <button className="button" type="submit">Login</button>
                        <div className="register">
                            <span>dont have account? <button className="spanBtn" onClick={() => navigate('/register')}>Sign Up</button></span>
                        </div>
                        <div className="test-account">
                            <p>Test Account: mali@gmail.com</p>
                            <p>Test Password: nba1234</p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login