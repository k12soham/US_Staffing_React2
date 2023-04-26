import React from 'react';
import axios from 'axios';
import base_url from '../api/bootapi';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import history from './ResponseVal';
import EmployeeHeader from './EmployeeHeader';
import { useNavigate } from "react-router-dom";
import PhoneInput, { CountryData, PhoneInputProps } from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

class UpdateCand2 extends React.Component {

    componentDidMount() {

        this.refInput.focus();

        const recruiterIDAdmin1 = localStorage.getItem('recruiterIDAdmin');
        this.setState({ recruiterIDAdmin: recruiterIDAdmin1 });
        const requisitionID = localStorage.getItem('requisitionID');
        const candidateID2 = localStorage.getItem('candidateID');
        this.setState({ candidateID: candidateID2 });
        this.setState({ requisitionId1: requisitionID });

        axios.get(`${base_url}/getCandidateByID?candidateID=${candidateID2}`).then(

            (response) => {

                let inputs = {};
                inputs["cad_name"] = response.data.candidate_name;
                inputs["visa_type"] = response.data.visa_type;
                inputs["rate_term"] = response.data.rate_term;
                inputs["submitted_rate"] = response.data.submitted_rate;
                inputs["phone"] = response.data.phone;
                inputs["email"] = response.data.email;
                inputs["remark"] = response.data.remark;
                inputs["reason"] = response.data.reason;
                this.state.phoneNumber = response.data.phone;

                this.setState({
                    input: inputs,
                    phone: inputs["phone"]
                });
            },
            (error) => {
                console.log(error);
                alert("Please enter valid details.")
            }
        );

        axios.get(`${base_url}/getAllRateTerm`)
            .then(json =>
                this.setState({ rateTerm_fd: json.data })
            )
            .catch(error => {

            })

        axios.get(`${base_url}/getAllVisaType`)
            .then(json =>
                this.setState({ visaType_fd: json.data })
            )
            .catch(error => {

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
            //  phone: '',
            FormatLen: 0,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getPhone = this.getPhone.bind(this);
    }

    resetForm = () => {

        let inputs = this.state.input;
        inputs["reqid"] = '';
        inputs["cad_name"] = '';
        inputs["visa_type"] = '';
        inputs["rate_term"] = '';
        inputs["submitted_rate"] = '';
        inputs["phone"] = '+1';
        //inputs["phone"] = '';
        inputs["email"] = '';
        inputs["remark"] = '';
        inputs["reason"] = '';

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

    handleChange(e) {
        let add_cls = this.state.input;
        add_cls[e.target.name] = e.target.value;

        this.setState({
            input: add_cls
        });
    }

    handleSubmit(e) {

        e.preventDefault();

        if (this.state.input["cad_name"] != null) {
            this.state.input["cad_name"] = this.state.input["cad_name"].trim();
            this.state.input["cad_name"] = this.state.input["cad_name"].replaceAll("#", "%23")
        }

        if (this.state.input["submitted_rate"] != null) {
            this.state.input["submitted_rate"] = this.state.input["submitted_rate"].trim();
            this.state.input["submitted_rate"] = this.state.input["submitted_rate"].replaceAll("#", "%23")
        }

        if (this.state.input["email"] != null) {
            this.state.input["email"] = this.state.input["email"].trim();
            this.state.input["email"] = this.state.input["email"].replaceAll("#", "%23")
        }

        if (this.state.input["remark"] != null) {
            this.state.input["remark"] = this.state.input["remark"].trim(" ");
            this.state.input["remark"] = this.state.input["remark"].replaceAll("#", "%23")
        }

        if (this.state.input["reason"] != null) {
            this.state.input["reason"] = this.state.input["reason"].trim(" ");
            this.state.input["reason"] = this.state.input["reason"].replaceAll("#", "%23")
        }

        if (this.validate()) {
            // if (true) {
            let add_cls = this.state.input;
            add_cls[e.target.name] = e.target.value;
            this.put_UpdateCandidate(add_cls);
        }
    }

    postCandidate = (data) => {

        let recruiterID = localStorage.getItem('recruiterID');
        let requisitionID = localStorage.getItem('requisitionID');

        let d1 = data["cad_name"];
        let d2 = data["visa_type"];
        let d3 = data["rate_term"];
        let d4 = data["submitted_rate"];
        let d5 = data["phone"];
        let d6 = data["email"];
        let d7 = data["remark"];
        let d8 = data["reason"];

        if (d7 == undefined) {
            d7 = ''
        }
        if (d8 == undefined) {
            d8 = ''
        }

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
        // inputs["reqid"]='';
        inputs["cad_name"] = '';
        inputs["visa_type"] = '';
        inputs["rate_term"] = '';
        inputs["submitted_rate"] = '';
        inputs["phone"] = '';
        inputs["email"] = '';
        inputs["remark"] = '';
        inputs["reason"] = '';

        this.setState({ input: inputs });

    }
    // --------------------------------------------Validation Code ----------------------------------------------------------

    put_UpdateCandidate = (data) => {

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

                toast.success("Candidate updated successfully!",
                    {
                        position: "top-right",
                        autoClose: 1000,
                        style: { position: "absolute", top: "5px", width: "400px" }
                    }
                );

              
            
                    history.push("/viewCandidate");
                    window.location.reload();
              
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
        inputs["phone"] = "+1";
        //inputs["phone"] = "";
        inputs["email"] = undefined;
        inputs["remark"] = undefined;
        inputs["reason"] = undefined;

        this.setState({ input: inputs });
    }

    validate() {

        let input = this.state.input;
        let errors = {};
        let isValid = true;

        if ((!input["cad_name"])) {
            isValid = false;
            errors["cad_name"] = "This field is required";
        }

        if ((input["cad_name"]) != undefined) {

            // var pattern = new RegExp(/^[^\s][a-zA-Z\s]{1,50}$/);
            var pattern = new RegExp("[a-zA-Z]");

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

        if ((input["submitted_rate"]) !== undefined) {

            var pattern = new RegExp(/^((?!(0))[0-9\s]{0,5})$/);

            if (!pattern.test(input["submitted_rate"])) {
                isValid = false;
                errors["submitted_rate"] = "Please enter only numbers";
            }
        }
        // -------------phone-----------------------------------------------------------------------------------------

        if ((!input["phone"]) || (input["phone"] == '+1')) {
            isValid = false;
            errors["phone"] = "This field is required";
        }    
        
            if (((input["phone"]).length) != (this.state.FormatLen)) {
                isValid = false;
                errors["phone"] = "Please enter valid phone number";
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

        this.setState({
            errors: errors
        });

        return isValid;
    }
    // -------------------------------------------- End Validation Code ----------------------------------------------------------

    getPhone = (e, value, data) => {
       

        var string = value.format

        var string_length = [...string].filter(x => x === '.').length
        console.log(string_length)

        console.log("entered No length = " + (value.format.length - value.dialCode.length))

        let inputs = this.state.input;
        inputs["phone"] = e;

        this.setState({
            input: inputs,
            FormatLen: string_length,
        });
    }

    render() {
        const isAuthenticated = localStorage.getItem('recruiterID');

        return isAuthenticated ? (

                <div className="row">

                    <div className="col-12">
                        <EmployeeHeader />
                    </div>

                    <div className="col-12 pt-5 mt-5">

                        <div className="row">
                            <form onSubmit={this.handleSubmit}>

                                <div className="col-12">
                                    <div className="row" style={{ paddingTop: '20px' }}>
                                       
                                        <div className="col-6" style={{ paddingLeft: '35px', paddingRight: '20px' }}>

                                            <div class="form-group">
                                                <label for="cad_name"><b>Candidate Name:</b><b style={{ color: 'red' }}>*</b></label>
                                                <input

                                                    minLength={1}
                                                    maxLength={50}
                                                    type="text"
                                                    name="cad_name"
                                                    ref={(input) => { this.refInput = input; }}
                                                    value={this.state.input.cad_name}
                                                    onChange={this.handleChange}
                                                    onKeyUp={this.keyUpHandlerSub}
                                                    placeholder="Candidate Name"
                                                    class="form-control" />

                                                <div className="text-danger">{this.state.errors.cad_name}</div>
                                            </div>

                                            <div class="form-group">
                                                <label for="visa_type"><b>Visa Type:</b><b style={{ color: 'red' }}>*</b></label><br />
                                                <select class="btn btn-secondary dropdown-toggle"
                                                    style={{ width: '100%', textAlign: "left" }}
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
                                                <label for="rate_term"><b>Rate Term:</b><b style={{ color: 'red' }}>*</b></label><br />
                                                <select class="btn btn-secondary dropdown-toggle"
                                                    style={{ width: '100%', textAlign: "left" }}
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
                                                <label for="submitted_rate"><b>Submitted Rate ($):</b><b style={{ color: 'red' }}>*</b></label>
                                                <input
                                                    minLength={1}
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
                                                <label for="phone"><b>Phone :</b><b style={{ color: 'red' }}>*</b></label>

                                                <PhoneInput

                                                    inputStyle={{ width: '100%', height:'37px'}}
                                                    preferredCountries={['us']}
                                                    onlyCountries={['us','in','gb','sg','ae']}
                                                    countryCodeEditable={false}
                                                    name="phone"
                                                    country={'us'}
                                                    placeholder='Phone'
                                                 
                                                    value={this.state.input.phone}
                                                    onChange={this.getPhone}
                                                    searchStyle={{ margin: "0", width: "97%", height: "30px" }}
                                                    enableSearch
                                                    disableSearchIcon

                                                />

                                                <div className="text-danger">{this.state.errors.phone}</div>
                                            </div>

                                            <div class="form-group">
                                                <label for="email"><b>Email:</b><b style={{ color: 'red' }}>*</b></label>
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
                                                    id="btn1"
                                                    type="submit"
                                                    className="btn btn-primary w-100 theme-btn mx-auto"

                                                >
                                                    Submit
                                                </button>
                                            </div>
                                            <div className='col-2'>
                                                <button
                                                    id="btn2"
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
         
        ) : (
            history.push("/"),
            window.location.reload()
        );
    }
}

export default UpdateCand2;
