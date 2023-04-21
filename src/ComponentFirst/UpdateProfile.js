import React from 'react';
import axios from 'axios';
import base_url from '../api/bootapi';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import history from './ResponseVal';
import EmployeeHeader from './EmployeeHeader';
import AdminHeader5 from './AdminHeader5';

class UpdateProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            input: {},
            errors: {},
         
          

        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFetchedData = this.handleFetchedData(this);
        this.handleFetchedData2 = this.handleFetchedData2(this);
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
  
    

    handleChange(e) {

        let emp_reg = this.state.input;

        emp_reg[e.target.name] = e.target.value;
     
        this.setState({
            input: emp_reg,
        });
      


    }

    handleSubmit(e) {
        e.preventDefault();
 
       if(this.state.input["recruiter_name"]!=null)
        {
            this.state.input["recruiter_name"] = this.state.input["recruiter_name"].trim();
            this.state.input["recruiter_name"] = this.state.input["recruiter_name"].replaceAll("#", "%23");
        }
        if(this.state.input["recruiter_email"]!=null)
        {
            this.state.input["recruiter_email"] = this.state.input["recruiter_email"].trim();
            this.state.input["recruiter_email"] = this.state.input["recruiter_email"].replaceAll("#", "%23");
        }
      
        if (this.validate()) {
       
            let emp_reg = this.state.input;
            emp_reg[e.target.name] = e.target.value;

           
                this.postdata(emp_reg);

            
        }
        // 👇️ clear all input values in the form
      
    }

    postdata = (data) => {

        let recruiter_id = data["recruiter_id"];
        let recruiter_name = data["recruiter_name"];
        let recruiter_email = data["recruiter_email"];
        const role = localStorage.getItem('recruiterRole');

        axios.put(`${base_url}/UpdateRecruiterProfile?recruiterId=${recruiter_id}&recruiterName=${recruiter_name}&recruiterEmail=${recruiter_email}`).then(
         
            (response) => {
                toast.success("Profile updated successfully!",
                    { position: "top-right" }
                );

                localStorage.setItem("recruiterName",recruiter_name);
                localStorage.setItem('recruiterEmail',recruiter_email);
                if(role=="Admin")
                {
                    history.push("/viewReqForAdmin");
                    window.location.reload();
                  
                }
                else if(role=="TM")
                {
                    history.push("/addRequisition");
                    window.location.reload();
                }
            
          
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

       
        // --------------------------------------- emp_name validation-------------------------------------------------------
        if ((!input["recruiter_name"])) {
            isValid = false;
            errors["recruiter_name"] = "Please enter name.";
        }

        if (typeof input["recruiter_name"] !== undefined) {

            var pattern = new RegExp(/^[^\s][a-zA-Z\s]+[^\s]$/);
            if (!pattern.test(input["recruiter_name"])) {
                isValid = false;
                errors["recruiter_name"] = "Please enter only characters.";
            }
        }
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

        // -----------------------------------------handle currentPass error---------------------------------------------
        this.setState({
            errors: errors
        });
        return isValid;
    }
    // ------------------------------------- END VALIADATION CODE---------------------------------------------------------------

   
    resetForm = () => {

        let inputs = {};
        let errors = {};
        inputs["recruiter_name"]=undefined;
        inputs["recruiter_email"]=undefined;
  
        errors["recruiter_name"]=undefined;
        errors["recruiter_email"]=undefined;
        this.setState({ input: inputs });
        this.setState({ errors: errors });

     
    }

    render() {
        const isAuthenticated = localStorage.getItem('recruiterRole');

        return isAuthenticated=="TM" || isAuthenticated=="Admin"  ? (

            <div className="row">
                <div className=" master_backgroung_heder">
                {
                    isAuthenticated=="TM" ?
                     (
                         <EmployeeHeader/>
                    ):
                    (
                        <AdminHeader5/>
                    )
                 }
                </div>
                {/* <div className="col-12 col-md-5 col-lg-6 h-100 master_backgroung_login">
                    
                    <img src="usa.png" width="670" height="657" alt="US staffing app"></img>
                </div> */}

                <div className="col-12 col-md-7 col-lg-6 auth-main-col mt-5 ">
               
                    <div className="d-flex flex-column align-content-end pt-2 pb-5 border border-5">
                    
                        <div className="auth-body mx-auto ">

                            <div className="auth-form-container text-center" ><br></br>
                                <h5><b>Update an account</b></h5>
                            </div>
                            <br></br>

                            <form onSubmit={this.handleSubmit}>

                                {/* -----------------------------------------------End editable code------------------------------------------------------------- */}
                                <div class="form-group">
                                    <label for="name"><b>Enter Name:</b><b style={{color:'red'}}>*</b></label><br></br>
                                    <input
                                        type="text"
                                        name="recruiter_name"
                                      
                                        value={this.state.input.recruiter_name}
                                        onChange={this.handleChange}
                                        style={{ width: '360px', height: '37px' }}
                                        placeholder="Name"
                                        minLength={3}
                                        maxLength={50}
                                        id="recruiter_name" />

                                    <div className="text-danger">{this.state.errors.recruiter_name}</div>
                                </div>

                                <div class="form-group">
                                    <label for="email"><b>Enter Email:</b><b style={{color:'red'}}>*</b></label><br></br>
                                    <input
                                      
                                        name='recruiter_email'
                                        value={this.state.input.recruiter_email}
                                        onChange={this.handleChange}
                                        placeholder="Email"
                                        minLength={11}
                                        maxLength={50}
                                        style={{ width: '360px', height: '37px' }}
                                    />

                                    <div className="text-danger">{this.state.errors.recruiter_email}</div>
                                </div><br></br>

                

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

export default UpdateProfile;