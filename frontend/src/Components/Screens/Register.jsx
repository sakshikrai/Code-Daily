import React, { useState } from 'react';
import Login_svg from '../../assets/Login-amico.svg';
import blog_svg from '../../assets/blobanimation.svg';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

// Step 1: Import the API_URL you will create
import API_URL from '../../api'; 

function Register() {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
        cpassword: "",
        role: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const postData = async (e) => {
        e.preventDefault();
        const { username, email, password, cpassword, role } = user;

        // Step 2: Update the fetch call to use the full production URL
        const res = await fetch(`${API_URL}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username, email, password, cpassword, role
            })
        });

        const data = await res.json();

        if (res.status === 422 || !data) {
            toast.error(data.error || "Please fill in all the details.");
        } else if (res.status === 421) {
            toast.error("Email is already registered.");
        } else if (res.status === 420) {
            toast.error('Passwords are not matching.');
        } else if (res.status === 201 || res.status === 200) {
            toast.success('Registration successful!');
            navigate("/login");
        } else {
            toast.error("An unknown error occurred.");
        }
    };

    const width2 = window.outerWidth;

    return (
        <>
            <div className="smallScreen">
                <mark>The Screen is Visible with width more than 250px <br /><br /><hr /><br />Screen Size: {width2}px</mark>
            </div>
            <div className="registerMainComponent">
                <img className='blob_svg blob_a' src={blog_svg} alt="backgound-svg" />
                <img className='blob_svg2 blob_a' src={blog_svg} alt="backgound-svg" />
                <h1 className='registerTitle title'>Registration</h1><br />
                <div className="registerSection">
                    <div className="registerForm">
                        <form method="POST">
                            <div className="RegisterInputField">
                                <div className="Registername">
                                    <label className='registerLabels' htmlFor="username"> Username:</label><br />
                                    <input
                                        type="text"
                                        name="username"
                                        id="username"
                                        placeholder='Code Daily'
                                        value={user.username}
                                        onChange={handleChange}
                                    /><br />
                                </div>
                                <div className="Registeremail">
                                    <label className='registerLabels' htmlFor="email">Email:</label><br />
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        placeholder='CodeDaily@gmail.com'
                                        value={user.email}
                                        onChange={handleChange}
                                    /><br />
                                </div>
                                <div className="Registerpassword">
                                    <label className='registerLabels' htmlFor="password">Password:</label><br />
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder='123456'
                                        value={user.password}
                                        onChange={handleChange}
                                    /><br />
                                </div>
                                <div className="Registercpassword">
                                    <label className='registerLabels' htmlFor="cpassword">Confirm Password:</label><br />
                                    <input
                                        type="password"
                                        name="cpassword"
                                        id="cpassword"
                                        placeholder='123456'
                                        value={user.cpassword}
                                        onChange={handleChange}
                                    /><br />
                                </div>
                                <div className="Registerdomain">
                                    <label className='registerLabels' htmlFor="role">Profession:</label>
                                    <input
                                        type="text"
                                        name="role"
                                        id="role"
                                        placeholder='Web Developer'
                                        value={user.role}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <input type="submit" onClick={postData} className='btn registerbtn' value="Register" />
                        </form>
                    </div>
                    <div className="registerSVG">
                        <img src={Login_svg} alt="" />
                        <p>Already have an Account? <NavLink to="/login"><span className="registerSwitch">Login Now</span></NavLink></p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register;