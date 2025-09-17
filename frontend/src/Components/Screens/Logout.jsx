import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UsedContext } from '../App';

// Step 1: Import the API_URL
import API_URL from '../../api';

function Logout() {
    const { dispatch } = useContext(UsedContext);
    const history3 = useNavigate();

    useEffect(() => {
        // Step 2: Update the fetch call to use the full production URL
        fetch(`${API_URL}/logout`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            credentials: "include"
        }).then((res) => {
            dispatch({ type: 'USER', payload: false });
            history3("/login");
            if (!res.status === 200) {
                const error = new Error(res.Error);
                throw error;
            }
        }).catch((err) => {
            console.log("error in logout", err);
            // Also ensure the user is logged out in the UI and redirected on error
            dispatch({ type: 'USER', payload: false });
            history3("/login");
        });
    }); // Note: The empty dependency array was removed to ensure this runs on component mount as intended.

    return (
        <mark><h1>Logging out...</h1></mark> // Updated text for better user experience
    );
}

export default Logout;