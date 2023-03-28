import { React, useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Form from "../utilities/Form";
import base_url from "../api/bootapi";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login1 = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
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
        console.log("showPassword : "+showPassword);
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
                  
                    navigate("/adminstatic2");
                    toast.success("Login successfully!",
                        { position: "top-right",autoClose: 2000,
                        style: { position: "absolute", top: "5px", width: "300px" } })
                }

                else if (response.data.role == "TM") {
                    localStorage.setItem('recruiterName', response.data.recruiter_name);
                    localStorage.setItem('recruiterID', response.data.recruiter_id);
                    localStorage.setItem('recruiterEmail', response.data.recruiter_email);
             
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
        <div className="row g-0 auth-wrapper">
            <div className="col-12 col-md-5 col-lg-6 h-100 master_backgroung_login">
                <img src="usa.png" width="670" height="657"></img>
              
                <div className="auth-background-mask"></div>
            </div>

            <div className="col-12 col-md-7 col-lg-6 auth-main-col text-center">

                <div className="d-flex flex-column align-content-end">

                    <div className="auth-body mx-auto">
                        <h5><b>Sign in to your account</b></h5><br></br>
                        <div className="auth-form-container text-start">

                            <form
                                className="auth-form"
                                method="POST"
                                onSubmit={authenticate}
                                autoComplete={"off"}
                            >
                                <div className="email mb-3">
                                    <input
                                        type="email"
                                        className={`form-control ${validate.validate && validate.validate.email
                                            ? "is-invalid "
                                            : ""
                                            }`}
                                        id="email"
                                        name="email"
                                        value={email}
                                        minLength={11}
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
                                            maxLength={15}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />

                                        <button
                                            type="button"
                                            className="btn btn-outline-primary btn-sm"
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
                                        className="btn btn-primary w-100 theme-btn mx-auto"
                                    >
                                        Sign In
                                    </button>
                                </div>
                            </form>

                            <hr />
                            <div className="auth-option text-center pt-2">
                                Don't have an account?{" "}
                                <Link className="text-link" to="/signup">
                                    Sign Up{" "}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    );
}

export default Login1;