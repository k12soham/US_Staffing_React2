import React from 'react';
import axios from 'axios';
import base_url from '../api/bootapi';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import history from './ResponseVal';
import { Button } from 'reactstrap';

class UpdateProfileAdmin extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            input: {},
            errors: {},
            hover: false,
            showNewPass: false,
            showConfPass: false,
            currentPassword: undefined,
            newPassword: undefined,
            confirmPassword: undefined,
            passMatch: null,
            passNotMatch: null,
            role: null,

        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFetchedData = this.handleFetchedData(this);
        this.keyUpHandler = this.keyUpHandler.bind(this);
    }

    handleFetchedData() {

        let recruiterIDAdmin = localStorage.getItem('recruiterIDAdmin');
        

        axios.get(`${base_url}/getRecruiterbyID?recruiterID=${recruiterIDAdmin}`).then((json) => {

            this.setState({
               // input: json.data,
                role: json.data.role,
            });
            
          
        })
    }

    handleFetchedData2(e) {

        
        if(this.state.input["recruiter_email"]!=null)
        {
            this.state.input["recruiter_email"] = this.state.input["recruiter_email"].trim();
        }
        
    let z= e.email

     
     axios.get(`${base_url}/getRecruiterbyEmail?recruiterEmail=${z}`).then((json) => {
          
            this.setState({
                input: json.data,
                role: json.data.role,
            });
           
        },
        
        (error) =>{
            toast.error("Email not found",
            {
                position: "top-right", autoClose: 2000,
                style: { position: "absolute", top: "5px", width: "300px" }
            }
        );
            this.refInput.focus();
            
        }
        
        )
    }

    // --------------------------------------------------Password match--------------------------------------------------
    keyUpHandler(e) {
        this.state.confirmPassword = this.state.input['confirmPass'];

        if (((this.state.newPassword) == (this.state.confirmPassword)) && (this.state.newPassword !== undefined)) {

            this.setState({ passNotMatch: '' });
            this.setState({ passMatch: 'Password matched' });
        }
        else {
            this.setState({ passMatch: '' });
            this.setState({ passNotMatch: 'Pass not matched' });
        }
    }

    handleChange(e) {

        let emp_reg = this.state.input;

        emp_reg[e.target.name] = e.target.value;
    
        this.setState({
            input: emp_reg,
        });
       

        this.state.newPassword = this.state.input['newPass'];
        this.state.confirmPassword = this.state.input['confirmPass'];
    }

    handleSubmit(e) {
        e.preventDefault();


        if(this.state.input["recruiter_name"]==null)
        {
          alert("Please click Find Email button")
        }
        if(this.state.input["recruiter_email"]!=null)
        {
            this.state.input["recruiter_email"] = this.state.input["recruiter_email"].trim();
            this.state.input["recruiter_email"] = this.state.input["recruiter_email"].replaceAll("#", "%23");
        }

        if(this.state.input["newPass"]!=null)
        {
            this.state.input["newPass"] = this.state.input["newPass"].replaceAll("#", "%23");
        }
      
        if(this.state.input["confirmPass"]!=null)
        {
            this.state.input["confirmPass"] = this.state.input["confirmPass"].replaceAll("#", "%23");
        }
     
     

        if (this.validate()) {

            let emp_reg = this.state.input;
            emp_reg[e.target.name] = e.target.value;

            if( this.state.input["newPass"]!=this.state.input["confirmPass"])
            {
                alert("Please enter correct passwords");
               
            }
            else {
              
           
                this.postdata(emp_reg);

            }
        }
        // 👇️ clear all input values in the form
       // e.target.reset();
     
    }

    postdata = (data) => {


        let recruiter_id = data["recruiter_id"]
        let recruiter_name = data["recruiter_name"]
        let recruiter_email = data["recruiter_email"]
       // let currentPass=data["currentPass"]
        let confirmPass = data["confirmPass"];



        axios.put(`${base_url}/UpdateRecruiterProfileAdmin?recruiterId=${recruiter_id}&newPass=${confirmPass}`).then(
           
            (response) => {
                toast.success("Profile updated successfully!",
                    { position: "top-right" }
                );

                if((this.state.role) == "Admin"){
                    localStorage.setItem("recruiterName",recruiter_name);
                    localStorage.setItem('recruiterEmail',recruiter_email);
                }              
                history.push("/viewReqForAdmin");
                window.location.reload();
            },
            (error) => {
                alert("Please enter correct details!");
                window.location.reload();
            }
        )
    }
    // ------------------------------------- VALIADATION CODE---------------------------------------------------------------
    validate() {
      

        let input = this.state.input;
        let errors = {};
        let isValid = true;

       
       
        // -----------------------------------------Username/ email validation------------------------------------------------------------------
        if (!input["recruiter_email"]) {
            isValid = false;
            errors["recruiter_email"] = "Please enter email address.";
        }

        if (typeof input["recruiter_email"] !== undefined) {

            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(input["recruiter_email"])) {
                isValid = false;
                errors["recruiter_email"] = "Please enter valid email address (e.g.: abc@gmail.com).";
            }
        }
    
      
        // -----------------------------------------handle newPass error---------------------------------------------
        if (this.state.newPassword == undefined) {
            isValid = false;
            errors["newPass"] = "Please enter new password.";
          
        }

        if ((this.state.newPassword) !== undefined) {

            var pattern = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[@#$%^&*,!? \b]).{6,15}$/);

            if (!pattern.test(this.state.newPassword)) {
                isValid = false;
                errors["newPass"] = "Password must contain at least one number, one special character (?!,@#$), one upper and lower case letter, and at least 6 characters.";

            }
        }
        // -----------------------------------------end newPass error-----------------------------------------------

        // -----------------------------------------handle confirmPass error---------------------------------------------
        if (this.state.confirmPassword == undefined) {
            isValid = false;
            errors["confirmPass"] = "Please enter confirm password.";
           
        }


        // -----------------------------------------end confirmPass error-----------------------------------------------
        this.setState({
            errors: errors
        });
        return isValid;
    }
    // ------------------------------------- END VALIADATION CODE---------------------------------------------------------------

    togglePassword1 = (e) => {

        if (this.state.hover) {

            this.setState({ hover: false });
        } else {

            this.setState({ hover: true });
        }
    }

    togglePassword2 = (e) => {
        // ----------------------------------------------------------------------------------------------------
        if (this.state.showNewPass) {

            this.setState({ showNewPass: false });
        } else {

            this.setState({ showNewPass: true });
        }
    }

    togglePassword3 = (e) => {
        if (this.state.showConfPass) {
            this.setState({ showConfPass: false });
        } else {
            this.setState({ showConfPass: true });
        }
    };

    resetForm = () => {

        let inputs = {};
        this.setState({ input: inputs });

        let errors1 = {};
        this.setState({ errors: errors1 });

        this.setState({ passNotMatch: '' });
        this.setState({ passMatch: '' });
    }

    render() {
        const isAuthenticated = localStorage.getItem('recruiterRole');


        return isAuthenticated =="Admin" ?(

            <div className="row g-0 auth-wrapper">
                <div className="col-12 col-md-5 col-lg-6 h-100 master_backgroung_login">
                    <img src="usa.png" width="670" height="657" alt="US staffing app"></img>
                </div>

                <div className="col-12 col-md-7 col-lg-6 auth-main-col ">
                   
                    <div className="d-flex flex-column align-content-end">
                        <div className="auth-body mx-auto">

                            <div className="auth-form-container text-center">
                                <h5><b>Change Recruiter Password</b></h5>
                            </div>
                            <br></br>

                            <form onSubmit={this.handleSubmit}>

                                {/* -----------------------------------------------End editable code------------------------------------------------------------- */}
                                <div class="form-group">
                                    <label for="name"><b>Name:</b><b style={{color:'red'}}>*</b></label>
                                    <input
                                        type="text"
                                        name="recruiter_name"
                                        disabled
                                        value={this.state.input.recruiter_name}
                                        onChange={this.handleChange}
                                        style={{ width: '360px', height: '37px' }}
                                        placeholder="Name"
                                        minLength={3}
                                        maxLength={50}
                                        id="recruiter_name" />

                                   
                                </div>

                                <div class="form-group">
                                    <label for="email"><b>Enter Email:</b><b style={{color:'red'}}>*</b></label>
                                    <input
                                       
                                        name='recruiter_email'
                                        ref={(input) => { this.refInput = input; }}
                                        value={this.state.input.recruiter_email}
                                        onChange={this.handleChange}
                                        onBlur={(evt)=> this.handleFetchedData2({email:this.state.input.recruiter_email})}
                                        placeholder="Email"
                                        minLength={11}
                                        maxLength={50}
                                        style={{ width: '360px', height: '37px' }}
                                    />

                                    <div className="text-danger">{this.state.errors.recruiter_email}</div>
                                </div>

                                {/* <Button onClick={(evt)=> this.handleFetchedData2({email:this.state.input.recruiter_email})}>Find Email</Button> */}

                                <hr></hr>


                                {/* ---------------------------------------------------------------------- */}
                                <div className="password mb-3 " >
                                    <div className="form-group">
                                        <label for="password"><b>Enter New Password:</b><b style={{color:'red'}}>*</b></label>
                                        <input
                                            type={(this.state.showNewPass) ? "text" : "password"}
                                            name="newPass"
                                            id="newPass"
                                           
                                            onChange={this.handleChange}
                                            onKeyUp={this.keyUpHandler}
                                            placeholder="New Password"
                                            minLength={6}
                                            maxLength={15}
                                            style={{ width: '305px', height: '37px' }}
                                        />

                                        <button
                                            type="button"
                                            className="btn btn-outline-primary theme-btn mx-auto"
                                            onClick={this.togglePassword2}
                                        >
                                            <i
                                                className={
                                                    (this.state.showNewPass) ? "far fa-eye" : "far fa-eye-slash"
                                                }
                                            ></i>{" "}
                                        </button>
                                        <div className="text-danger">{this.state.errors['newPass']}</div>

                                    </div>
                                </div>

                                {/* ---------------------------------------------------------------------- */}

                                <div className="password mb-3 ">
                                    <div className="form-group">
                                        <label for="password"><b>Enter Confirm Password:</b><b style={{color:'red'}}>*</b></label>
                                        <input
                                            type={(this.state.showConfPass) ? "text" : "password"}
                                            name="confirmPass"
                                            id="confirmPass"
                                            onChange={this.handleChange}
                                            onKeyUp={this.keyUpHandler} 
                                            placeholder="Confirm Password"
                                            minLength={6}
                                            maxLength={15}
                                            style={{ width: '305px', height: '37px' }}
                                        />

                                        <button
                                            type="button"
                                            className="btn btn-outline-primary theme-btn mx-auto"
                                            onClick={this.togglePassword3}
                                        >
                                            <i
                                                className={
                                                    (this.state.showConfPass) ? "far fa-eye" : "far fa-eye-slash"
                                                }
                                            ></i>{" "}
                                        </button>
                                        <div className="text-danger">{this.state.errors['confirmPass']}</div>
                                        <div className="text-danger">{this.state.passNotMatch}</div>
                                        <div className="text-success">{this.state.passMatch}</div>
                                       

                                    </div>
                                </div>
                               


                                <div className="text-center">

                                    <div className='row'>
                                        <div className='col-6'>
                                            <button
                                                type="submit"
                                                className="btn btn-primary w-100 theme-btn mx-auto"
                                            >
                                                Submit
                                            </button>
                                        </div>
                                        <div className='col-6'>
                                            <button
                                                type="reset"
                                                className="btn btn-warning w-100 theme-btn mx-auto"
                                                onClick={this.resetForm}
                                            >
                                                Reset
                                            </button>

                                        </div>
                                       
                                    </div>

                                </div>

                            </form>
                            <hr />

                        </div>
                    </div>
                </div>
            </div>
        ) : (
            history.push("/"),
            window.location.reload()
        );
    }
}

export default UpdateProfileAdmin;