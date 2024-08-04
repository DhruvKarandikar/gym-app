import {useState} from "react";
import "./home.css"
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const LoginApiEndPoint = ""

function LoginForm() {
    let [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const validateEmail = (email) => {
        const regex = /([A-Za-z0-9]+[.\-_])*[A-Za-z0-9]+@[A-Za-z0-9-]+(\.[A-Za-z]{2,})+/;
        return regex.test(email);
    }

    const validatePassword = (password) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        return regex.test(password);
    }

    let handleInputChange = (event) => {
        setFormData((currentData) => {
            return { 
                ...currentData,
                [event.target.name]: event.target.value
            };
        });
    };

    const navigate = useNavigate();
    
    let handleSubmit = async (event) => {
        event.preventDefault();
        if(formData){
            validateEmail(formData.email);
            validatePassword(formData.password);

        }

        try {
            const response = await fetch(LoginApiEndPoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            
            // will refresh the values after the form is send
            setFormData({
                email: "",
                password: ""
            });
            localStorage.setItem('token', data); // store jwt token
        } catch (error) {
            console.error('Error:', error);
        }
        navigate('/home');
    }

    return (
        <div className="login-form">
            <h4>LOGIN</h4>
            <form onSubmit={handleSubmit}>
                <input 
                    value={formData.email}
                    onChange={handleInputChange}
                    id="email"
                    name="email"
                    type= "text"
                    placeholder="Email Address"
                    required
                />
                <br />
                <br />
                <input 
                    value={formData.password}
                    onChange={handleInputChange}
                    id="password"
                    name="password"
                    type= "text"
                    placeholder="Password"
                    required
                />
                <br />
                <br />
                <br />
                <button type="submit">Submit</button>
            </form>
            <br />
            <br />
            <p>click here to <Link to="/signup" className="signup">Sign Up </Link>?</p>
        </div>
    );
}

    
export default LoginForm