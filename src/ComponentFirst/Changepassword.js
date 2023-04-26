import React from 'react';
import axios from 'axios';
import base_url from '../api/bootapi';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import history from './ResponseVal';
import is from 'date-fns/esm/locale/is/index.js';
import EmployeeHeader from './EmployeeHeader';
import AdminHeader5 from './AdminHeader5';
import { Link } from 'react-router-dom';

class Changepassword extends React.Component {

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

        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFetchedData = this.handleFetchedData(this);
        this.handleFetchedData2 = this.handleFetchedData2(this);
        this.keyUpHandler = this.keyUpHandler.bind(this);
    }

    handleFetchedData() {

        let recruiterID = localStorage.getItem('recruiterID');

        axios.get(`${base_url}/getRecruiterbyID?recruiterID=${recruiterID}`).then((json) => {
            this.setState({
                input: json.data
            });


        })
    }

    handleFetchedData2() {

        let recruiterID = localStorage.getItem('recruiterIDAdmin');


        axios.get(`${base_url}/getRecruiterbyID?recruiterID=${recruiterID}`).then((json) => {
            this.setState({
                input: json.data

            });


        })
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
            this.setState({ passNotMatch: 'Password not matched' });
        }
    }

    handleChange(e) {

        let emp_reg = this.state.input;

        emp_reg[e.target.name] = e.target.value;

        this.setState({
            input: emp_reg,
        });

        this.state.currentPassword = this.state.input["currentPass"];
        this.state.newPassword = this.state.input['newPass'];
        this.state.confirmPassword = this.state.input['confirmPass'];
    }

    handleSubmit(e) {
        e.preventDefault();



        if (this.state.input["newPass"] != null) {
            this.state.input["newPass"] = this.state.input["newPass"].replaceAll("#", "%23");
        }

        if (this.state.input["confirmPass"] != null) {
            this.state.input["confirmPass"] = this.state.input["confirmPass"].replaceAll("#", "%23");
        }


        if (this.validate()) {
            let emp_reg = this.state.input;
            emp_reg[e.target.name] = e.target.value;

            if (this.state.input["newPass"] != this.state.input["confirmPass"]) {
                alert("Please enter correct passwords");

            }

            else if (this.state.input["currentPass"] == this.state.input["newPass"]) {
                alert("New password must be different than current password");

            }


            else {


                this.postdata(emp_reg);

            }
        }
        // 👇️ clear all input values in the form

    }

    postdata = (data) => {

        let recruiter_id = data["recruiter_id"];
        let recruiter_name = data["recruiter_name"];
        let recruiter_email = data["recruiter_email"];
        let currentPass = data["currentPass"];
        let confirmPass = data["confirmPass"];
        const role = localStorage.getItem('recruiterRole');
        axios.put(`${base_url}/ChangePassword?recruiterId=${recruiter_id}&currentPass=${currentPass}&newPass=${confirmPass}`).then(

            (response) => {
                toast.success("Password cahnged successfully!",
                    { position: "top-right" }
                );

                localStorage.setItem("recruiterName", recruiter_name);
                localStorage.setItem('recruiterEmail', recruiter_email);
                if (role == "Admin") {
                    history.push("/viewReqForAdmin");
                    window.location.reload();

                }
                else if (role == "TM") {
                    history.push("/addRequisition");
                    window.location.reload();
                }

            },
            (error) => {
                alert("Please enter correct current password!");
                window.location.reload();
            }
        )
    }
    // ------------------------------------- VALIADATION CODE---------------------------------------------------------------
    validate() {


        let input = this.state.input;
        let errors = {};
        let isValid = true;


        // --------------------------------------- emp_name validation-------------------------------------------------------

        // -----------------------------------------handle currentPass error---------------------------------------------
        if (this.state.currentPassword == undefined) {
            isValid = false;
            errors["currentPass"] = "Please enter current password.";
        }

        // -----------------------------------------end pass error-----------------------------------------------
        // -----------------------------------------handle newPass error---------------------------------------------
        if (this.state.newPassword == undefined) {
            isValid = false;
            errors["newPass"] = "Please enter new password.";

        }

        if ((this.state.newPassword) !== undefined) {

            var pattern = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[@#$%^&*,!? \b]).{6,15}$/);

            if (!pattern.test(this.state.newPassword)) {
                isValid = false;
                errors["newPass"] = "Password must contain at least one number, one special character (?!,@#$),one upper and lower case letter & at least 6 characters.";

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
        let errors = {}

        inputs["currentPass"] = '';
        inputs["newPass"] = '';
        inputs["confirmPass"] = '';

        errors["currentPass"] = '';
        errors["newPass"] = '';
        errors["confirmPass"] = '';

        this.setState({ input: inputs });
        this.setState({ errors: errors });

        this.setState({ passNotMatch: '' });
        this.setState({ passMatch: '' });
    }

    render() {
        const isAuthenticated = localStorage.getItem('recruiterRole');

        return isAuthenticated == "TM" || isAuthenticated == "Admin" ? (

            <div>
                <div className="col-12 master_backgroung_heder">
                    {
                        isAuthenticated == "TM" ?
                            (
                                <EmployeeHeader />
                            ) :
                            (
                                <AdminHeader5 />
                            )
                    }
                </div>

                {/* <div className='col-12 master_backgroung_work2 scroll-bar-horizontal'> */}

                <div className="auth-wrapper pt-5 mt-5" >

                    <div className="col-12 col-md-7 col-lg-6 auth-main-col border border-5 ">

                        <div className="d-flex flex-column align-content-end">
                            <div className="auth-body mx-auto">

                                <div className="auth-form-container text-center">
                                    <br /><h5><b>Change Password</b></h5>
                                </div>
                                <br></br>

                                <form onSubmit={this.handleSubmit}>

                                    <div className="form-group">
                                        <label for="password"><b>Enter Current Password:</b><b style={{ color: 'red' }}>*</b></label> <br></br>
                                        <input
                                            type={(this.state.hover) ? "text" : "password"}
                                            name="currentPass"
                                            id="currentPass"

                                            value={this.currentPassword}
                                            onChange={this.handleChange}
                                            placeholder="Current Password"
                                            minLength={6}
                                            maxLength={15}
                                            style={{ width: '305px', height: '37px' }}
                                        />

                                        <button
                                            type="button"
                                            className="btn btn-outline-primary theme-btn mx-auto"
                                            onClick={this.togglePassword1}
                                        >
                                            <i
                                                className={
                                                    (this.state.hover) ? "far fa-eye" : "far fa-eye-slash"
                                                }
                                            ></i>
                                            {" "}
                                        </button>
                                        <div className="text-danger" style={{ textAlign: 'justify' }}>{this.state.errors['currentPass']}</div>

                                    </div>

                                    {/* ---------------------------------------------------------------------- */}
                                    <div className="password mb-3 " >
                                        <div className="form-group">
                                            <label for="password"><b>Enter New Password:</b><b style={{ color: 'red' }}>*</b></label>
                                            <input
                                                type={(this.state.showNewPass) ? "text" : "password"}
                                                name="newPass"
                                                id="newPass"

                                                onChange={this.handleChange}
                                                onKeyUp={this.keyUpHandler}
                                                placeholder="Password"
                                                minLength={6}
                                                maxLength={30}
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

                                    <div className="password mb-3 ">
                                        <div className="form-group">
                                            <label for="password"><b>Enter Confirm Password:</b><b style={{ color: 'red' }}>*</b></label>
                                            <input
                                                type={(this.state.showConfPass) ? "text" : "password"}
                                                name="confirmPass"
                                                id="confirmPass"
                                                onChange={this.handleChange}
                                                onKeyUp={this.keyUpHandler}
                                                placeholder="Confirm Password"
                                                minLength={6}
                                                maxLength={30}
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
                {/* </div> */}
                {/* ------------------------change password------------------------------- */}

            </div>
        ) : (
            history.push("/"),
            window.location.reload()
        );
    }
}

export default Changepassword;