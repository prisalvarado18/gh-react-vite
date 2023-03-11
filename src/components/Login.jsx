// Import useState function from the react library
import React, { useState } from "react";
// Import axios to make HTTP requests
import axios from "axios";
import Header from "./Header";
import jwt from 'jwt-decode';


// Define Login component
const Login = () => {
    // Use the 'useState' state HOOK to define and initialize three states in the component:
    //credentials, error and loading

    // Initialize 'credentials' state with an object containing two properties
    // "email" and "password"

    // The setCredentials function will be used to update the state later
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    // Use the 'useState' state hook to initialize the error state with an empty string
    // The setError function will be used to update the state later
    const [error, setError] = useState("");
    // Use the 'useState' state hook to initialize the loading state to false
    // The setLoading function will be used to update the state later
    const [loading, setLoading] = useState(false);

    // Define a function that updates the credentials state whenever the user enters sth
    // in the email or password fields
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        // Use the 'event' object to get the name and value of the field that's been
        // changed and then update the credentials state using the 'setCredentials' function
        setCredentials({ ...credentials, [name]: value });
    };

    // Define a function to submit the login form
    const handleSubmit = async (event) => {
        // Use 'event' to prevent the form from auto-submitting
        event.preventDefault();
        // Set the error state and loading to initial values
        setError("");

        // Email validation
        if (!credentials.email) {
            setError("Empty field");
            return;
        }

        if (!/\S+@\S+\.\S+/.test(credentials.email)) {
            console.log('emaaaaaaaail')
            setError("Invalid email");
            return;
        }

        // Password validation
        if (!credentials.password) {
            setError("Empty field");
            return;
        }

        if (credentials.password.length < 8) {
            console.log('passsssssssword')
            setError("Invalid password");
            return;
        }

        setLoading(true);

        // if (!validateFields()) {
        //     setLoading(false);
        //     return;
        // }



        try {
            // Use the axios module to send a POST request to the API, with the values of the "credentials" state.
            const response = await axios.post("https://palvaradoristorante.onrender.com/auth", credentials)
                // If the request is successful, the function saves the response in a variable called 'response'
                .then((response) => {
                    console.log(response);
                    const token = response.data.token;
                    const user = jwt(token);
                    const userId = user.id;
                    localStorage.setItem('userId', userId)
                    if (response.status === 200) {
                        localStorage.setItem('token', token);
                        history.push('/users')

                    }
                })
            // The token or any other information could be saved in the app's global state or in localStorage
        } catch (error) {
            // Otherwise, set the error state with a custom error message
            console.error(error);
            setError("Invalid credentials");

            if (error.response) {
                if (error.response.status === 400) {
                    console.log(error.response.status)
                    setError('Empty field');
                }
                else if (error.response.status === 401) {
                    console.log(error.response.status)
                    setError('Incorrect password');
                }
                else if (error.response.status === 404) {
                    console.log(error.response.status)
                    setError("Email doesn't exist");
                }
            }
        }
        setLoading(false);
    };

    return (
        <>
            <Header />
            <section className="login-container">
                <h1>WELCOME</h1>
                <form className="principal-form" onSubmit={handleSubmit} noValidate>
                    <div className="form-group">
                        <input type="email" id="email" name="email" value={credentials.email} placeholder="email address" onChange={handleInputChange} required />
                        {error && error.includes("Empty field") && <div className="error-message">Please enter your email address</div>}
                        {error && error.includes("Invalid email") && <div className="error-message">Invalid email</div>}
                        {error && error.includes("Email doesn't exist") && <div className="error-message">Email doesn't exist. Please try again</div>}
                    </div>
                    <div className="form-group">
                        <input type="password" id="password" name="password" value={credentials.password} placeholder="password" onChange={handleInputChange} required />
                        {error && error.includes("Empty field") && <div className="error-message">Please enter your password</div>}
                        {error && error.includes("Invalid password") && <div className="error-message">Password must be at least 8 characters</div>}
                        {error && error.includes("Incorrect password") && <div className="error-message">Password is incorrect. Please try again</div>}
                    </div>
                    <div className="form-group">
                        <button className="submit-btn" type="submit" disabled={loading}>
                            {loading ? "Logging in..." : "LOGIN"}
                        </button>
                    </div>
                </form>
            </section>
        </>
    );
};

export default Login;


/*<label htmlFor="email">Email:</label>
<label htmlFor="password">Password:</label>
{error && <div>{error}</div>}
 {error && <div className="error-message">{error}</div>}
*/
