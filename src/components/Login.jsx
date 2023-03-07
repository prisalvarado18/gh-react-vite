// Import useState function from the react library
import React, { useState } from "react";
// Import axios to make HTTP requests
import axios from "axios";


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
        setLoading(true);

        try {
            // Use the axios module to send a POST request to the API, with the values of the "credentials" state.
            const response = await axios.post("https://palvaradoristorante.onrender.com/auth", credentials);
            // If the request is successful, the function saves the response in a variable called 'response'
            console.log(response);
            // The token or any other information could be saved in the app's global state or in localStorage
        } catch (error) {
            // Otherwise, set the error state with a custom error message
            console.error(error);
            setError("Invalid credentials. Please try again");
        }
        // Finally, the loading state is set to false
        setLoading(false);
    };

    return (
        <section className="login-container">
            <h1>WELCOME</h1>
            {error && <div>{error}</div>}
            <form className="principal-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <input type="email" id="email" name="email" value={credentials.email} placeholder="email address" onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                    <input type="password" id="password" name="password" value={credentials.password} placeholder="password" onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                    <button className="submit-btn" type="submit" disabled={loading}>
                        {loading ? "Logging in..." : "LOGIN"}
                    </button>
                </div>
            </form>
        </section>
    );
};

export default Login;


/*<label htmlFor="email">Email:</label>
<label htmlFor="password">Password:</label>*/