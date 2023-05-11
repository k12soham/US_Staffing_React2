import { React, useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Form from "../utilities/Form";
import base_url from "../api/bootapi";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo1 from '../assets/tcog_logo.png'

const Login1 = () => {

    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    const [validate, setValidate] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    let navigate = useNavigate();
    localStorage.setItem("email",email)
    const inputRef = useRef();
 
    useEffect(() => {
      inputRef.current.focus();
    }, []);

    const validateLogin = () => {
        let isValid = true;

        let validator = Form.validator({
            email: {
                value: email,
                isRequired: true,
                isEmail: true,
            },
            password: {
                value: password,
                isRequired: true,
                minLength: 6,
                isValid: true,
            },
        });

        if (validator !== null) {
            setValidate({
                validate: validator.errors,
            });

            isValid = false;
        }
        return isValid;
    };

    const authenticate = (e) => {
      
        e.preventDefault();
        const validate = validateLogin();
        if(email!=null)
        {
            email =email.trim();
            email = email.replaceAll("#", "%23");
        }

        if(password!=null)
        {
            password = password.replaceAll("#", "%23");
        }
        if (validate) {

            const uname = email;
            const pass = password;

            setValidate({});
            setEmail("");
            setPassword("");
            postDataToServer(uname, pass);
            inputRef.current.focus();

        }
    };

    const togglePassword = (e) => {
        if (showPassword) {
            setShowPassword(false);
        } else {
            setShowPassword(true);
        }
    };

    const postDataToServer = (uname, pass) => {
      
        axios.post(`${base_url}/login?Username=${uname}&Password=${pass}`).then(
            (response) => {

                localStorage.setItem('uuid', response.data);              

                if (response.data.role == "Admin") {
                    localStorage.setItem('recruiterName', response.data.recruiter_name);
                    localStorage.setItem('recruiterIDAdmin', response.data.recruiter_id);
                    localStorage.setItem('recruiterEmail', response.data.recruiter_email);
                    localStorage.setItem('recruiterRole', response.data.role);
                  
                    navigate("/viewReqForAdmin");
                    toast.success("Login successfully!",
                        { position: "top-right",autoClose: 2000,
                        style: { position: "absolute", top: "5px", width: "300px" } })
                }

                else if (response.data.role == "TM") {
                    localStorage.setItem('recruiterName', response.data.recruiter_name);
                    localStorage.setItem('recruiterID', response.data.recruiter_id);
                    localStorage.setItem('recruiterEmail', response.data.recruiter_email);
                    localStorage.setItem('recruiterRole', response.data.role);
                    navigate("/addRequisition");
                    toast.success("Login successfully!",
                        { position: "top-right" , autoClose: 2000,
                        style: { position: "absolute", top: "5px", width: "300px" }
                       })
                } else {
                  
                    alert("Invalid Email ID or Password.");
                    navigate("/");
                }
            },
            
            (error) => {
                
                alert("Invalid username OR password.");
                navigate("/");
            }
        )
    }

    return (
        <>
        <div className="img1">
        
        </div>
      
            <div className="bg-text">
               <img width='250px' src={logo1}></img>
           
                <h5 className=" text-light mt-3"><b>Sign in to your account</b></h5><br></br>
                    <div className="mx-auto ">
                        <div style={{width:'350px',margin:'auto'}} className="auth-form-container text-start mt-2">

                            <form
                              
                                method="POST"
                                onSubmit={authenticate}
                                autoComplete={"off"}
                            >
                               
                                <div className="email mb-3">
                                {/* <label for="email"><b>Enter Email:</b><b style={{ color: 'red' }}>*</b></label><br/> */}
                                    <input
                                        type="email"
                                        className={`form-control ${validate.validate && validate.validate.email
                                            ? "is-invalid "
                                            : ""
                                            }`}
                                          
                                        id="email"
                                        name="email"
                                        value={email}
                                        minLength={5}
                                        maxLength={50}
                                        placeholder="Email"
                                     
                                        onChange={(e) => setEmail(e.target.value)}
                                        ref={inputRef}
                                    />

                                    <div
                                        className={`invalid-feedback text-start ${validate.validate && validate.validate.email
                                            ? "d-block"
                                            : "d-none"
                                            }`}
                                    >
                                        {validate.validate && validate.validate.email
                                            ? validate.validate.email[0]
                                            : ""}
                                    </div>
                                </div>

                                <div className="password mb-3">
                                {/* <label for="password"><b>Enter Password:</b><b style={{ color: 'red' }}>*</b></label> <br/> */}
                                    <div className="input-group">
                                  
                                   <input
                                            type={showPassword ? "text" : "password"}                                    
                                            className={`form-control ${validate.validate && validate.validate.password
                                                ? "is-invalid "
                                                : ""
                                                }`}
                                            name="password"
                                            id="password"
                                            value={password}
                                            placeholder="Password"
                                            minLength={6}
                                            maxLength={30}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />

                                        <button
                                            type="button"
                                            className="btn btn-secondary btn-sm"
                                            onClick={(e) => togglePassword(e)}
                                        >
                                            <i
                                                className={
                                                    showPassword ? "far fa-eye" : "far fa-eye-slash"
                                                }
                                            ></i>{" "}
                                        </button>

                                        <div
                                            className={`invalid-feedback text-start ${validate.validate && validate.validate.password
                                                ? "d-block"
                                                : "d-none"
                                                }`}
                                        >
                                            {validate.validate && validate.validate.password
                                                ? validate.validate.password[0]
                                                : ""}
                                        </div>
                                    </div>
                                    
                                </div>
                                <div className="text-center">
                                    <button
                                        type="submit"
                                        className="btn btn-success w-100 theme-btn mx-auto"
                                    >
                                        Sign In
                                    </button>
                                </div>
                            </form>

                        <br/>
                            <div className="auth-option text-center pt-2 text-light">
                                Don't have an account?{" "}
                                <Link className="text-link text-success" to="/signup">
                                    Sign Up{" "}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                </>
        // </div>
        
    );
}

export default Login1;