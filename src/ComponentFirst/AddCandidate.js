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

class AddCandidate extends React.Component {

    componentDidMount() {
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
            empID: '',
            rateTerm_fd: [],
            visaType_fd: [],
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    resetForm = () => {
      
        let inputs = {};
        inputs["reqid"] = undefined;
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
        inputs["reqid"] = "";
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

    handleChange(e) {

        let add_cls = this.state.input;
        add_cls[e.target.name] = e.target.value;
        console.log(add_cls);

        this.setState({
            add_cls
        });
    }

    CheckRequisiton = (e) => {

        let requisition_id = this.state.input;
        requisition_id[e.target.name] = e.target.value;
        let a = this.state.input.reqid
        console.log(a);

        axios.get(`${base_url}/getRequisitionByID?ID=${a}`).then(

            (response) => {

                console.log(response.data.requisition_id);
                let requid = response.data.requisition_id
                localStorage.setItem('requisitionID', requid);
                //alert("found")
            },
            (error) => {
                toast.error("Requisiton not found of this ID",
                    {
                        position: "top-right", autoClose: 2000,
                        style: { position: "absolute", top: "5px", width: "300px" }
                    }
                );
                this.refInput.focus();
                // focus(this.state.input.reqid)
            }
        );
    }

    handleSubmit(e) {
        e.preventDefault();
        let add_cls = this.state.input;
        add_cls[e.target.name] = e.target.value;

        if (this.validate()) {

            this.state.input["cad_name"] = this.state.input["cad_name"].trim(" ");
            this.state.input["email"] = this.state.input["email"].trim(" ");
            console.log("cad_name : " + this.state.input["cad_name"] + " " + this.state.input["email"]);
            
            this.postCandidate(add_cls);
        }
        // 👇️ clear all input values in the form
        e.target.reset();
    }

    postCandidate = (data) => {

        // let z = this.state.empID = localStorage.getItem("recruiterId")
        let recruiterID = localStorage.getItem('recruiterID');
        let requisitionID = localStorage.getItem('requisitionID');
        console.log("RecId_New : " + recruiterID + " requisitionID " + requisitionID);

        console.log(data)
        let d1 = data["cad_name"];
        let d2 = data["visa_type"];
        let d3 = data["rate_term"];
        let d4 = data["submitted_rate"];
        let d5 = data["phone"];
        let d6 = data["email"];
        let d7 = data["remark"];
        let d8 = data["reason"];

        axios.post(`${base_url}/add_candidate?candidate_name=${d1}&visa_type=${d2}&rate_term=${d3}
        &submitted_rate=${d4}&phone=${d5}&email=${d6}&remark=${d7}
        &reason=${d8}&recruiter_id=${recruiterID}&requisition_id=${requisitionID}`).then(

            (response) => {

                toast.success("Candidate added successfully!",
                    {
                        position: "top-right", autoClose: 2000,
                        style: { position: "absolute", top: "5px", width: "300px" }
                    }
                );
            },
            (error) => {
                console.log(error);
                console.log("Error");
                alert("Please enter valid details.")
            }
        );

        let inputs = {};
        inputs["req"] = undefined;
        inputs["sub"] = undefined;
        inputs["first"] = undefined;
        inputs["second"] = undefined;
        inputs["closure"] = undefined;

        this.setState({ input: inputs });
    }
    // --------------------------------------------Validation Code ----------------------------------------------------------

    validate() {

        let input = this.state.input;
        // add_cls[e.target.name] = e.target.value.trim(" ");
        let errors = {};
        let isValid = true;

        console.log("type of input " + typeof (input["cad_name"]));

        console.log("cad_name " + input["cad_name"]);
        console.log("visa_type " + input["visa_type"]);
        console.log("rate_term " + input["rate_term"]);
        console.log("submitted_rate " + input["submitted_rate"]);
        console.log("phone " + input["phone"]);
        console.log("email " + input["email"]);
        console.log("remark " + input["remark"]);
        console.log("reason " + input["reason"]);

        console.log("type of reqNum " + typeof (reqNum));

        if ((!input["reqid"])) {
            isValid = false;
            errors["reqid"] = "This field is required";
        }
        if ((!input["cad_name"])) {
            isValid = false;
            errors["cad_name"] = "This field is required";
        }
        if ((input["cad_name"]) !== undefined) {

            var pattern = new RegExp(/^[^\s][a-zA-Z\s]{1,50}$/);
            // new RegExp(/^[^\s][a-zA-Z\s]+[^\s]$/);

            if (!pattern.test(input["cad_name"])) {
                isValid = false;
                errors["cad_name"] = "Please enter only characters.";
            }

        }
        // -------------visa_type---------------------------------------------------------------------------------------------
        if ((!input["visa_type"])) {
            isValid = false;
            errors["visa_type"] = "Please select visa type";
        }

        // -------------rate_term-----------------------------------------------------------------------------------------
        if ((!input["rate_term"])) {
            isValid = false;
            errors["rate_term"] = "Please select rate term";
        }

        // -------------submitted_rate-----------------------------------------------------------------------------------------
        if ((!input["submitted_rate"])) {
            isValid = false;
            errors["submitted_rate"] = "This field is required";
        }
        if ((input["submitted_rate"]) !== undefined) {

            var pattern = new RegExp(/^((?!(0))[0-9\s]{0,5})$/);
            // new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[@#$%^&*,!? \b]).{6,15}$/); 

            if (!pattern.test(input["submitted_rate"])) {
                isValid = false;
                errors["submitted_rate"] = "Please enter valid rate.";
            }
        }
        // -------------phone-----------------------------------------------------------------------------------------
        if ((!input["phone"])) {
            isValid = false;
            errors["phone"] = "This field is required";
        }
        if ((input["phone"]) !== undefined) {

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
        /*  if ((!input["remark"])) {
              isValid = false;
              errors["remark"] = "This remark field is required";
          }
          
          // -------------reason-----------------------------------------------------------------------------------------
          if ((!input["reason"])) {
              isValid = false;
              errors["reason"] = "This reason field is required";
          }
         */

        this.setState({
            errors: errors
        });
        return isValid;
    }
    // -------------------------------------------- End Validation Code ----------------------------------------------------------

    render() {
        const isAuthenticated = localStorage.getItem('recruiterID');
        localStorage.setItem('recruiterID', isAuthenticated);
        console.log(isAuthenticated);

        return isAuthenticated ? (
            <div className="">
                <div className="row">

                    <div className="col-12">
                        <EmployeeHeader />
                    </div>

                    <div className="col-12 master_backgroung_work scroll-bar">

                        <div className="row">
                            <form onSubmit={this.handleSubmit}>

                                <div className="col-12">
                                    <div className="row" style={{ paddingTop: '20px' }}>
                                        <div className="col-12" style={{ paddingLeft: '35px', paddingRight: '20px' }}>
                                            <div class="form-group">
                                                <label for="reqid"><b>Requisition ID:</b></label>
                                                <input
                                                    style={{ width: '30%' }}
                                                    ref={(input) => { this.refInput = input; }}
                                                    minLength={1}
                                                    maxLength={50}
                                                    type="text"
                                                    name="reqid"
                                                    value={this.state.input.reqid}

                                                    onBlur={this.CheckRequisiton}

                                                    placeholder="Requisition ID"
                                                    class="form-control" />

                                                <div className="text-danger">{this.state.errors.reqid}</div>
                                            </div>
                                        </div>
                                        <div className="col-6" style={{ paddingLeft: '35px', paddingRight: '20px' }}>

                                            <div class="form-group">
                                                <label for="cad_name"><b>Candidate Name:</b></label>
                                                <input
                                                    // ref={(input) => { this.refInput = input; }}
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
                                                    onKeyUp={this.keyUpHandlerReq}
                                                    value={this.state.input.visa_type}>

                                                    <option value='' hidden> Select Visa Type </option>
                                                    {
                                                        this.state.visaType_fd.map((vt) => (

                                                            <option value={vt.visa_type}>{vt.visa_type}</option>
                                                        ))

                                                    }
                                                </select>

                                                <div className="text-danger">{this.state.errors.visa_type}</div>
                                            </div>
                                            <div class="form-group">
                                                <label for="rate_term"><b>Rate Term:</b></label><br />
                                                <select class="btn btn-secondary dropdown-toggle"
                                                    style={{ width: '100%' }}
                                                    name="rate_term" id="rate_term"
                                                    onChange={this.handleChange}
                                                    onKeyUp={this.keyUpHandlerReq}
                                                    value={this.state.input.rate_term}>

                                                    <option value='' hidden> Select Rate Term </option>

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
                                                    minLength={2}
                                                    maxLength={4}
                                                    type="text"
                                                    name="submitted_rate"
                                                    value={this.state.input.submitted_rate}
                                                    onChange={this.handleChange}
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
                                                    Submit
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

export default AddCandidate;