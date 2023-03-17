import React from 'react';
import axios from 'axios';
import base_url from '../api/bootapi';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import history from './ResponseVal';
import { useRef } from 'react';
import { getValue } from '@testing-library/user-event/dist/utils';
import NavBarHeader from './NavbarHeader';
import EmployeeHeader from './EmployeeHeader';
import { json } from 'react-router-dom';
import AdminHeader from './AdminHeader';
import { useNavigate } from "react-router-dom";

const empID = localStorage.getItem('recruiterID');
console.log("recruiterId : " + empID);
let reqID = '';

class UpdateCandidate extends React.Component {

    componentDidMount() {
        this.refInput.focus();

        const recruiterIDAdmin1 = localStorage.getItem('recruiterIDAdmin');
        this.setState({ recruiterIDAdmin: recruiterIDAdmin1 });
        const recruiterID = localStorage.getItem('recruiterID');
        const requisitionID = localStorage.getItem('requisitionID');
        const candidateID2 = localStorage.getItem('candidateID');
        this.setState({ candidateID: candidateID2 });
        // this.setState({ empID: recruiterID });
        this.setState({ requisitionId1: requisitionID });

        console.log("recruiterID : " + recruiterID);
        console.log("requisitionID : " + requisitionID);
        console.log("candidateID2 : " + candidateID2);

        axios.get(`${base_url}/getCandidateByID?candidateID=${candidateID2}`).then(

            (response) => {
                console.log(typeof (response));
                console.log(response.data)
                console.log(response.data.candidate_id);
                console.log(response.data.rate_term);

                let inputs = {};
                inputs["cad_name"] = response.data.candidate_name;
                inputs["visa_type"] = response.data.visa_type;
                inputs["rate_term"] = response.data.rate_term;
                inputs["submitted_rate"] = response.data.submitted_rate;
                inputs["phone"] = response.data.phone;
                inputs["email"] = response.data.email;
                inputs["remark"] = response.data.remark;
                inputs["reason"] = response.data.reason;

                this.setState({ input: inputs });

            },
            (error) => {
                console.log(error);
                console.log("Error");
                alert("Please enter valid details.")
            }
        );

        axios.get(`${base_url}/getAllRateTerm`)
            .then(json =>
                this.setState({ rateTerm_fd: json.data })
            )
            .catch(error => {
                //  alert("Error rate term")
            })

        axios.get(`${base_url}/getAllVisaType`)
            .then(json =>
                this.setState({ visaType_fd: json.data })
            )
            .catch(error => {
                // alert("Error visa")
            })
    }



    constructor(props) {
        super(props);

        this.state = {
            input: {},
            errors: {},
            // empID: '',
            candidateID: 0,
            rateTerm_fd: [],
            visaType_fd: [],
            recruiterIDAdmin: undefined
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    resetForm = () => {

        let inputs = {};
        inputs["cad_name"] = undefined;
        inputs["visa_type"] = undefined;
        inputs["rate_term"] = undefined;
        inputs["submitted_rate"] = undefined;
        inputs["phone"] = undefined;
        inputs["email"] = undefined;
        inputs["remark"] = undefined;
        inputs["reason"] = undefined;

        this.setState({ input: inputs });

        let errors1 = {};
        errors1["cad_name"] = "";
        errors1["visa_type"] = "";
        errors1["rate_term"] = "";
        errors1["submitted_rate"] = "";
        errors1["phone"] = "";
        errors1["email"] = "";
        errors1["location"] = "";
        errors1["remark"] = "";
        errors1["reason"] = "";
        this.setState({ errors: errors1 });
    }

    // addCandidate = () => {
    //     console.log(reqID);

    //     // let a = this.state.empID
    //     let b = this.state.requisitionId1;
    //     console.log("recid = " + a + " rqid = " + b);
    //     // console.log("recid = " + this.state.empID + " rqid = " + this.state.requisitionId1);
    //     // onClick={this.addCandidate(this.state.empID, this.state.requisitionId1)}                                       

    //     if (b != undefined) {
    //         localStorage.setItem('recruiterId', a);
    //         localStorage.setItem('ReqId', b)

    //         history.push("/addCandidate");
    //         window.location.reload();
    //         toast.success("Render  successfully!",
    //             { position: "top-right" })
    //     }

    //     console.log("addCandidate");
    // }

    handleChange(e) {
        let add_cls = this.state.input;
        add_cls[e.target.name] = e.target.value;
        console.log(add_cls);
        this.setState({
            input: add_cls,
        });
    }

    handleSubmit(e) {
        e.preventDefault();
       


        if (this.validate()) {

            this.state.input["cad_name"] = this.state.input["cad_name"].trim(" ");
            this.state.input["submitted_rate"] = this.state.input["submitted_rate"].trim(" ");
            this.state.input["phone"] = this.state.input["phone"].trim(" ");
            this.state.input["email"] = this.state.input["email"].trim(" ");
          
            this.state.input["cad_name"] = this.state.input["cad_name"].replaceAll("#", "%23")
            this.state.input["submitted_rate"] = this.state.input["submitted_rate"].replaceAll("#", "%23")
            this.state.input["phone"] = this.state.input["phone"].replaceAll("#", "%23")
            this.state.input["email"] = this.state.input["email"].replaceAll("#", "%23")
         
    
            if(  this.state.input["remark"]!=null)
            {
                this.state.input["remark"] = this.state.input["remark"].trim(" ");
                this.state.input["remark"] = this.state.input["remark"].replaceAll("#", "%23")
            }
    
            if(  this.state.input["reason"]!=null)
            {
                this.state.input["reason"] = this.state.input["reason"].trim(" ");
    
                this.state.input["reason"] = this.state.input["reason"].replaceAll("#", "%23")
    
            }
    



            let add_cls = this.state.input;
            add_cls[e.target.name] = e.target.value;
           
            this.put_UpdateCandidate(add_cls);
      
        }
        // 👇️ clear all input values in the form
        e.target.reset();
    }

    put_UpdateCandidate = (data) => {
        console.log(this.state.candidateID);
        // let recId = this.state.empID = localStorage.getItem("recruiterId");
        // console.log("recruiterId : " + recId);
        let d = this.state.requisitionId1;
        let cad_name = data["cad_name"];
        let visa_type = data["visa_type"];
        let rate_term = data["rate_term"];
        let submitted_rate = data["submitted_rate"];
        let phone = data["phone"];
        let email = data["email"];
        let remark = data["remark"];
        let reason = data["reason"];

        axios.put(`${base_url}/update_candidate?candidate_id=${this.state.candidateID}&candidate_name=${cad_name}
        &visa_type=${visa_type}&rate_term=${rate_term}&submitted_rate=${submitted_rate}
        &phone=${phone}&email=${email}&remark=${remark}&reason=${reason}`).then(

          
            (response) => {
               
               // let navigate = useNavigate();
             
                toast.success("Candidate updated successfully!",
                    { position: "top-right",
                    autoClose: 1000,
                    style: { position: "absolute", top: "5px", width: "400px" }
                } 
                );

                if (this.state.recruiterIDAdmin !== null) {
                   // let navigate = useNavigate();
                   // navigate("/viewCandForAdmin");
                    history.push("/viewCandForAdmin");
                    window.location.reload();
                } else {
                    history.push("/viewCandidate");
                   window.location.reload();
                   //let navigate = useNavigate();
                   // navigate("/viewCandidate");
                }
            },
            (error) => {
                console.log(error);
                console.log("Error");
                alert("Please enter valid details.")
            }
        );

        let inputs = {};
        inputs["cad_name"] = undefined;
        inputs["visa_type"] = undefined;
        inputs["rate_term"] = undefined;
        inputs["submitted_rate"] = undefined;
        inputs["phone"] = undefined;
        inputs["email"] = undefined;
        inputs["remark"] = undefined;
        inputs["reason"] = undefined;

        this.setState({ input: inputs });

    }
    // --------------------------------------------Validation Code ----------------------------------------------------------

    validate() {

        let input = this.state.input;
        let errors = {};
        let isValid = true;
        let addNew1 = true;
        let addNew2 = true;



        if ((!input["cad_name"])) {
            isValid = false;
            errors["cad_name"] = "This field is required";
        }
        if ((input["cad_name"]) != undefined) {

            var pattern = new RegExp(/^[^\s][a-zA-Z\s]{3,50}$/);
            // RegExp(/^[a-zA-Z]{2,10}$/);
            // (/^[^\s][a-zA-Z\s]+[^\s].{2,5}$/);
            if (!pattern.test(input["cad_name"])) {
                isValid = false;
                errors["cad_name"] = "Please enter only characters.";
            }
        }
        // -------------visa_type---------------------------------------------------------------------------------------------
        if ((!input["visa_type"])) {
            isValid = false;
            errors["visa_type"] = "This field is required";
        }

        // -------------rate_term-----------------------------------------------------------------------------------------
        if ((!input["rate_term"])) {
            isValid = false;
            errors["rate_term"] = "This field is required";
        }

        // -------------submitted_rate-----------------------------------------------------------------------------------------
        if ((!input["submitted_rate"])) {
            isValid = false;
            errors["submitted_rate"] = "This field is required";
        }
        if ((input["submitted_rate"]) != undefined) {

            var pattern = new RegExp(/^((?!(0))[0-9\s]{0,5})$/);
            // new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[@#$%^&*,!? \b]).{6,15}$/); 

            if (!pattern.test(input["submitted_rate"])) {
                isValid = false;
                errors["submitted_rate"] = "Please enter valid rate in $/hr.";
            }
        }
        // -------------phone-----------------------------------------------------------------------------------------
        if ((!input["phone"])) {
            isValid = false;
            errors["phone"] = "This field is required";
        }
        if ((input["phone"]) != undefined) {

            var pattern = new RegExp(/^[^\s][0-9 *()-\s]{4,15}$/);
            // new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[@#$%^&*,!? \b]).{6,15}$/); 

            if (!pattern.test(input["phone"])) {
                isValid = false;
                errors["phone"] = "Please enter only characters.";
            }
        }

        // -------------email-----------------------------------------------------------------------------------------
        if ((!input["email"])) {
            isValid = false;
            errors["email"] = "This field is required";
        }
        if (typeof input["email"] !== "undefined") {

            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(input["email"])) {
                isValid = false;
                errors["email"] = "Please enter valid email address (e.g.: abc@gmail.com).";
            }
        }
        // -------------remark-----------------------------------------------------------------------------------------
       /* if ((!input["remark"])) {
            isValid = false;
            errors["remark"] = "This remark field is required";
        }
        if ((input["remark"]) != undefined) {

            var pattern = new RegExp(/^[^\s][a-zA-Z0-9 @#$%&*()_\\[\]{};':"\\|,.<>\/\s]{1,50}$/);
            // RegExp(/^[^\s][a-zA-Z0-9 !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?\s]+[^\s]{1,50}$/);

            if (!pattern.test(input["remark"])) {
                isValid = false;
                errors["remark"] = "Please enter valid remark name.";
            }
        }
        // -------------reason-----------------------------------------------------------------------------------------
        if ((!input["reason"])) {
            isValid = false;
            errors["reason"] = "This reason field is required";
        }
        if ((input["reason"]) != undefined) {

            var pattern = new RegExp(/^[^\s][a-zA-Z0-9 @#$%&*()_\\[\]{};':"\\|,.<>\/\s]{1,50}$/);
            // RegExp(/^[^\s][a-zA-Z0-9 !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?\s]{1,50}$/);

            if (!pattern.test(input["reason"])) {
                isValid = false;
                errors["reason"] = "Please enter valid reason.";
            }
        }*/

        this.setState({
            errors: errors
        });
        return isValid;
    }
    // -------------------------------------------- End Validation Code ----------------------------------------------------------


    // -------------------------------------------- render ----------------------------------------------------
    render() {
        const isAuthenticated = localStorage.getItem('recruiterIDAdmin');
        const isAuthenticated2 = localStorage.getItem('recruiterID');

        return isAuthenticated || isAuthenticated2 ? (

            <div className="">
                <div className="row">

                    <div className="col-12 h-100 master_backgroung_heder">
                     
                    {
                     isAuthenticated2!==null ?(
                               <EmployeeHeader />
                     ) :(
                        <AdminHeader/>
                     )
                    }
                     
                    </div>

                    <div className="col-12 master_backgroung_work scroll-bar">

                        <div className="row">
                            <form onSubmit={this.handleSubmit}>

                                <div className="col-12">
                                    <div className="row" style={{ paddingTop: '20px' }}>
                                        <div className="col-6" style={{ paddingLeft: '35px', paddingRight: '20px' }}>

                                            <div class="form-group">
                                                <label for="cad_name"><b>Candidate Name:</b></label>
                                                <input
                                                    ref={(input) => { this.refInput = input; }}
                                                    minLength={1}
                                                    maxLength={50}
                                                    type="text"
                                                    name="cad_name"
                                                    value={this.state.input.cad_name}
                                                    onChange={this.handleChange}
                                                    onKeyUp={this.keyUpHandlerSub}
                                                    placeholder="Candidate Name"
                                                    class="form-control" />

                                                <div className="text-danger">{this.state.errors.cad_name}</div>
                                            </div>

                                            <div class="form-group">
                                                <label for="visa_type"><b>Visa Type:</b></label><br />
                                                <select class="btn btn-secondary dropdown-toggle"
                                                    style={{ width: '100%' }}
                                                    name="visa_type" id="visa_type"
                                                    onChange={this.handleChange}
                                                    value={this.state.input.visa_type}>

                                                    <option hidden value='' default selected> Select Visa Type </option>
                                                    {
                                                        this.state.visaType_fd.map((vt) => (
                                                            <option value={vt.visa_type}>{vt.visa_type}</option>
                                                        ))
                                                    }
                                                </select>
                                                <div className="text-danger">{this.state.errors.visa_type}</div>
                                            </div>

                                            {/* <div class="form-group">
                                                <label for="rate_term"><b>Rate Term:</b></label><br />
                                                <select class="btn btn-secondary dropdown-toggle"
                                                    style={{ width: '100%' }}
                                                    name="rate_term" id="rate_term"
                                                    onChange={this.handleChange}
                                                    value={this.state.input.rate_term}>

                                                    <option hidden value='' default selected> Select Rate Term </option>

                                                    {
                                                        this.state.rateTerm_fd.map((rt) => (
                                                            <option value={rt.rate_term}>{rt.rate_term}</option>
                                                        ))
                                                    }
                                                </select>
                                                <div className="text-danger">{this.state.errors.rate_term}</div>
                                            </div> */}

                                            <div class="form-group">
                                                <label for="rate_term"><b>Rate Term:</b></label><br />
                                                <select class="btn btn-secondary dropdown-toggle"
                                                    style={{ width: '100%' }}
                                                    name="rate_term" id="rate_term"
                                                    onChange={this.handleChange}
                                                    value={this.state.input.rate_term}>
                                                    <option hidden value="">Select Rate Term</option>
                                                    {
                                                        this.state.rateTerm_fd.map((rt) => (
                                                            <option value={rt.rate_term}>{rt.rate_term}</option>
                                                        ))
                                                    }
                                                </select>
                                                <div className="text-danger">{this.state.errors.rate_term}</div>
                                            </div>

                                            <div class="form-group">
                                                <label for="submitted_rate"><b>Submitted Rate:</b></label>
                                                <input
                                                    // minLength={2}
                                                    // maxLength={4}
                                                    type="text"
                                                    name="submitted_rate"
                                                    value={this.state.input.submitted_rate}
                                                    onChange={this.handleChange}
                                                    onKeyUp={this.keyUpHandlerClosure}
                                                    placeholder="Submitted Rate in $/hr"

                                                    class="form-control" />

                                                <div className="text-danger">{this.state.errors.submitted_rate}</div>
                                            </div>

                                        </div>
                                        <div className="col-6" style={{ paddingLeft: '35px', paddingRight: '30px' }}>
                                            <div class="form-group">
                                                <label for="phone"><b>Phone :</b></label>
                                                <input
                                                    minLength={10}
                                                    maxLength={20}
                                                    type="text"
                                                    name="phone"
                                                    value={this.state.input.phone}
                                                    onChange={this.handleChange}
                                                    onKeyUp={this.keyUpHandlerClosure}
                                                    placeholder="Phone"

                                                    class="form-control" />

                                                <div className="text-danger">{this.state.errors.phone}</div>
                                            </div>
                                            <div class="form-group">
                                                <label for="email"><b>Email:</b></label>
                                                <input
                                                    minLength={2}
                                                    maxLength={50}
                                                    type="text"
                                                    name="email"
                                                    value={this.state.input.email}
                                                    onChange={this.handleChange}
                                                    onKeyUp={this.keyUpHandlerClosure}
                                                    placeholder="Email"

                                                    class="form-control" />

                                                <div className="text-danger">{this.state.errors.email}</div>
                                            </div>
                                            <div class="form-group">
                                                <label for="remark"><b>Remark:</b></label>
                                                <input
                                                    minLength={1}
                                                    maxLength={200}
                                                    type="text"
                                                    name="remark"
                                                    value={this.state.input.remark}
                                                    onChange={this.handleChange}
                                                    onKeyUp={this.keyUpHandlerClosure}
                                                    placeholder="Remark"

                                                    class="form-control" />

                                                <div className="text-danger">{this.state.errors.remark}</div>
                                            </div>
                                            <div class="form-group">
                                                <label for="reason"><b>Reason:</b></label>
                                                <input
                                                    minLength={1}
                                                    maxLength={200}
                                                    type="text"
                                                    name="reason"
                                                    value={this.state.input.reason}
                                                    onChange={this.handleChange}
                                                    onKeyUp={this.keyUpHandlerClosure}
                                                    placeholder="Reason"

                                                    class="form-control" />

                                                <div className="text-danger">{this.state.errors.reason}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-11" style={{ padding: '0px', marginLeft: '0px' }}>
                                    <br />

                                    <div className="text-center">
                                        <div className='row'>
                                            <div className='col-4'></div>
                                            <div className='col-2'>
                                                <button
                                                    type="submit"
                                                    className="btn btn-primary w-100 theme-btn mx-auto"
                                                >
                                                    Update
                                                </button>
                                            </div>
                                            <div className='col-2'>
                                                <button
                                                    type="reset"
                                                    className="btn btn-warning w-100 theme-btn mx-auto"
                                                    onClick={this.resetForm}
                                                >
                                                    Reset
                                                </button>

                                            </div>
                                            <div className='col-4'></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-3"></div>
                            </form>
                        </div>

                    </div>

                </div >
            </div >
        ) : (
            history.push("/"),
            window.location.reload()
        );
    }
}

export default UpdateCandidate;