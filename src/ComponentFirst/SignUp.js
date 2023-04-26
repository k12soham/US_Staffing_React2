import React from 'react';
import axios from 'axios';
import base_url from '../api/bootapi';
import { toast } from "react-toastify";
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import history from './ResponseVal';
import { useNavigate } from "react-router-dom";

class SignUp extends React.Component {

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
    this.keyUpHandler = this.keyUpHandler.bind(this);

  }

  handleChange(e) {
    let emp_reg = this.state.input;
    emp_reg[e.target.name] = e.target.value;
    this.setState({
      input: emp_reg
    });
    this.state.newPassword = this.state.input['newPass'];
    this.state.confirmPassword = this.state.input['confirmPass'];
  }

  handleSubmit(e) {
    e.preventDefault();


    if (this.state.input["name"] != null) {
      this.state.input["name"] = this.state.input["name"].trim()
      this.state.input["name"] = this.state.input["name"].replaceAll("#", "%23");
    }

    if (this.state.input["email"] != null) {
      this.state.input["email"] = this.state.input["email"].trim()
      this.state.input["email"] = this.state.input["email"].replaceAll("#", "%23");
    }

    if (this.state.input["newPass"] != null) {
      this.state.input["newPass"] = this.state.input["newPass"].replaceAll("#", "%23");
    }

    if (this.state.input["confirmPass"] != null) {
      this.state.input["confirmPass"] = this.state.input["confirmPass"].replaceAll("#", "%23");
    }

    if (this.validate()) {

      if (this.state.input["newPass"] !== this.state.input["confirmPass"]) {
        alert("Password not matched")
      }
      else {

        let emp_reg = this.state.input;
        emp_reg[e.target.name] = e.target.value;

        this.postdata(emp_reg);
      }


    }

  }

  postdata = (data) => {

    let d1 = data["name"];
    let d2 = data["email"];
    let d3 = data["confirmPass"];

    axios.post(`${base_url}/addRecruiter?recruiter_name=${d1}&recruiter_email=${d2}&password=${d3}`)

      .then(

        (response) => {
          toast.success("Recruiter registered successfully!",
            {
              position: "top-right",
              autoClose: 1000,
              style: { position: "absolute", top: "5px", width: "300px" }
            }
          );


          history.push('/');
          window.location.reload()



        },
        (error) => {
          alert("This account is already exist.")

        }
      )

    let inputs = {};
    inputs["name"] = '';
    inputs["email"] = '';
    inputs["confirmPass"] = '';

    this.setState({ input: inputs });

  }

  validate() {

    let input = this.state.input;
    let errors = {};
    let isValid = true;

    if ((!input["name"])) {
      isValid = false;
      errors["name"] = "Please enter name.";
    }

    if (typeof input["name"] !== "undefined") {


      var pattern = new RegExp(/^[^\s][a-zA-Z\s]+[^\s]$/);
      if (!pattern.test(input["name"])) {
        isValid = false;
        errors["name"] = "Please enter only characters.";
      }
    }

    if (!input["email"]) {
      isValid = false;
      errors["email"] = "Please enter email address.";
    }

    if (typeof input["email"] !== "undefined") {

      var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
      if (!pattern.test(input["email"])) {
        isValid = false;
        errors["email"] = "Please enter valid email address (e.g.: abc@gmail.com).";
      }
    }

    if (!input["newPass"]) {
      isValid = false;
      errors["newPass"] = "Please enter password.";
    }

    if (typeof input["newPass"] !== "undefined") {

      var pattern = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[@#$%^&*,!? \b]).{6,15}$/);

      if (!pattern.test(input["newPass"])) {
        isValid = false;
        errors["newPass"] = "Password must contain at least one number, one special character (?!,@#$), one upper and lower case letter, and at least 6 characters.";
      }
    }

    if (!input["confirmPass"]) {
      isValid = false;
      errors["confirmPass"] = "Please enter confirm password.";
    }



    this.setState({
      errors: errors
    });

    return isValid;
  }

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

  togglePassword = (e) => {

    if (this.state.hover) {

      this.setState({ hover: false });
    } else {

      this.setState({ hover: true });
    }

  };

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

  render() {
    return (
      <div className="row g-0 auth-wrapper2">
        <div className="col-12 col-md-5 col-lg-6 h-100 master_backgroung_login">
          <img src="usa.png" width="670" height="657" className="img-fluid"></img>
        </div>

        <div className="col-12 col-md-7 col-lg-6 auth-main-col ">

          <div className="d-flex flex-column align-content-end">
            <div className="auth-body mx-auto">

              <div className="auth-form-container text-center">
                <h5><b>Create an account</b></h5>
              </div>
              <br></br>

              <form onSubmit={this.handleSubmit}>

                <div class="form-group">
                  <label for="name"><b>Enter Name:</b><b style={{ color: 'red' }}>*</b></label>
                  <input
                    type="text"
                    name="name"
                    value={this.state.input.name}
                    onChange={this.handleChange}
                    style={{ width: '360px', height: '37px' }}
                    placeholder="Name"
                    minLength={3}
                    maxLength={50}
                    id="name" />

                  <div className="text-danger">{this.state.errors.name}</div>
                </div>

                <div class="form-group">
                  <label for="email"><b>Enter Email:</b><b style={{ color: 'red' }}>*</b></label>
                  <input
                    name="email"
                    value={this.state.input.email}

                    onChange={this.handleChange}
                    placeholder="Email"
                    minLength={11}
                    maxLength={50}
                    style={{ width: '360px', height: '37px' }}
                  />

                  <div className="text-danger">{this.state.errors.email}</div>
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


                  <button
                    type="submit"
                    className="btn btn-primary w-100 theme-btn mx-auto"
                  >
                    Sign Up
                  </button>

                </div>

              </form>
              <hr />
              <div className="auth-option text-center pt-2">
                Already have an account?{" "}
                <Link className="text-link" to="/">
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUp;