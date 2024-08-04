import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./signup.css";

const SIGNUP_URL = ""

function Signup() {
  
  const [formData, setFormData] = useState({
    first_name: '',
    middle_name: '',
    last_name: '',
    email_id: '',
    mobile_no: '',
    gender: '',
    password: '',
    is_verified: false,
    person_bmi: {
      age: '',
      weight: '',
      height: '',
    }
  });
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    const regex = /([A-Za-z0-9]+[.\-_])*[A-Za-z0-9]+@[A-Za-z0-9-]+(\.[A-Za-z]{2,})+/;
    return regex.test(email);
    }

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return regex.test(password);
    }


  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split('.');
    if (keys.length > 1) {
      setFormData(prevState => {
        let nestedState = { ...prevState };
        keys.reduce((state, key, idx) => {
          if (idx === keys.length - 1) {
            state[key] = value;
          }
          return state[key];
        }, nestedState);
        return nestedState;
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    let currentErrors = {};
    
    if (!validateEmail(formData.email_id)) {
        currentErrors.email_id = "Invalid Email ID";
    } 
    
    if (!validatePassword(formData.password)) {
        currentErrors.password = "Password Invalid";
    }

    if (Object.keys(currentErrors).length > 0) {
        setErrors(currentErrors);
        return;
    }

    console.log(formData);
    

    const response = await fetch(SIGNUP_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(formData)
    });

    // const response = []

    if (response.ok) {
        navigate('/home');
    } else {
      console.error('Failed to submit form');
    }
  };

  return (
    <div className="signup-form">
      <h2>Lets Create your Details</h2>
      <h5><b>Note:</b> Once the form is filled cannot be Edited</h5>
      <form onSubmit={handleSubmit}>
        <label>
            First Name &nbsp;&nbsp;
            <input type="text" name="first_name" placeholder="First Name" value={formData.first_name} onChange={handleChange} required/>
        </label>
        <br></br>
        <label>
            Middle Name &nbsp;&nbsp;
            <input type="text" name="middle_name" placeholder="Middle Name" value={formData.middle_name} onChange={handleChange} />
        </label>
        <br></br>
        <label>
            Last Name &nbsp;&nbsp;
            <input type="text" name="last_name" placeholder="Last Name" value={formData.last_name} onChange={handleChange} required/>
        </label>
        <br></br>
        <label>
            Email &nbsp;&nbsp;
            <input type="email" name="email_id" placeholder="Email" value={formData.email_id} onChange={handleChange} required/>
            {errors.email_id && <p className="error">{errors.email_id}</p>}
        </label>
        <br></br>
        <label>
            Mobile No &nbsp;&nbsp;
            <input type="text" name="mobile_no" placeholder="Mobile Number" value={formData.mobile_no} onChange={handleChange} required/>
        </label>
        <br></br>
        
        <label>
            Gender &nbsp;&nbsp;
            <select name="gender" value={formData.gender} onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            </select>
        </label>
        <br></br>
        <label>
            Password &nbsp;&nbsp;
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required/>
            {errors.password && <p className="error">{errors.password}</p>}
        </label>

        <h3>Person BMI</h3>
        <label>
            Age &nbsp;&nbsp;
            <input type="number" name="person_bmi.age" placeholder="Age" value={formData.person_bmi.age} onChange={handleChange} required/>
        </label>
        <br></br>
        <label>
            Weight &nbsp;&nbsp;
            <input type="number" name="person_bmi.weight" placeholder="Weight" value={formData.person_bmi.weight} onChange={handleChange} required/>
        </label>
        <br></br>
        <label>
            Height &nbsp;&nbsp;
            <input type="number" name="person_bmi.height" placeholder="Height" value={formData.person_bmi.height} onChange={handleChange} required/>
        </label>
        <br></br>
        <br></br>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Signup
