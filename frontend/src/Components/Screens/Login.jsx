import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Login_svg from '../../assets/Back-to-work-pana.png';
import blog_svg from '../../assets/blobanimation.svg';
import { toast } from 'react-hot-toast';
import { UsedContext } from '../App';

function Login() {
    const { dispatch } = useContext(UsedContext);
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const loginUser = async (e) => {
        e.preventDefault();

        // **IMPORTANT CHANGE HERE**
        // Using a relative URL ("/login") to work with the "proxy" setting.
        const res = await fetch('/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                password
            })
        });

        // **CRITICAL BUG FIX HERE**
        // You must 'await' the res.json() call to get the data.
        const data = await res.json();

        if (res.status === 400) {
            toast.error(data.error || 'Invalid Credentials.');
        } else if (res.status === 200) {
            dispatch({ type: 'USER', payload: true });
            toast.success("Login Successful!");
            navigate('/');
        } else {
            toast.error(data.error || "An unknown error occurred.");
        }
    };

    const width2 = window.outerWidth;

    return (
        <>
            <div className="smallScreen">
                <mark>The Screen is Visible with width more than 250px <br /><br /><hr /><br />Screen Size: {width2}px</mark>
            </div>
            <div className="loginContainer">
                <img className='blob_svg blob_a' src={blog_svg} alt="background-svg" />
                <img className='blob_svg2 blob_a' src={blog_svg} alt="background-svg" />
                <div className="registerSVG loginimage">
                    <img src={Login_svg} alt="Login graphic" />
                    <p>Don't have an Account? <NavLink to="/register"><span className='registerSwitch'>Create an Account</span></NavLink></p>
                </div>
                <div className="loginDetails">
                    <h1 className='title logintitle'>Login</h1>
                    <form className='LoginForm' method='POST'>
                        <div className="Loginname">
                            <label htmlFor="username"> Username:</label><br />
                            <input
                                type="text"
                                name="username"
                                id="username"
                                autoComplete='off'
                                placeholder='Code Daily'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            /><br />
                        </div>
                        <div className="Loginname">
                            <label htmlFor="pass"> Password:</label><br />
                            <input
                                type="password"
                                name="pass"
                                id="pass"
                                autoComplete='off'
                                placeholder='codedaily'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            /><br />
                        </div>
                        <input
                            type="submit"
                            name="submit"
                            id="submit"
                            className='btn'
                            onClick={loginUser}
                            value="Log In"
                        />
                    </form>
                </div>
            </div>
        </>
    );
}

export default Login;