import React from 'react';
import axios from 'axios';
import base_url from '../api/bootapi';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import history from './ResponseVal';
// import Header from './Header';
import Header from '../ViewComponent1/Header';
// import EmpSidebar from './EmpSidebar';
import EmpSidebar from '../ViewComponent1/EmpSidebar';
import { useRef } from 'react';
import { getValue } from '@testing-library/user-event/dist/utils';

class AddRequisition extends React.Component {

    componentDidMount() {
        this.refInput.focus();
    }

    constructor(props) {
        super(props);

        this.state = {
            input: {},
            errors: {},
            empID: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    resetForm = () => {
        // alert("Clear");
        // this.setState(this.baseState)
        let inputs = {};
        inputs["req"] = undefined;
        inputs["id"]=undefined;
        inputs["client"] = undefined;
        inputs["jobTitle"]=undefined;
        inputs["duration"] = undefined;
        inputs["clientrate"]=undefined;
        inputs["location"] = undefined;
        inputs["positionType"]=undefined;
        inputs["skills"] = undefined;

        // inputs["sub"] = undefined;
        // inputs["first"] = undefined;
        // inputs["second"] = undefined;
        // inputs["closure"] = undefined;

        this.setState({ input: inputs });

        let errors1 = {};
        errors1["req"] = "";
        errors1["id"] = "";
        errors1["client"] = "";
        errors1["jobTitle"] = "";
        errors1["duration"] = "";
        errors1["clientrate"] = "";
        errors1["location"] = "";
        errors1["positionType"] = "";
        errors1["skills"] = "";
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

    handleSubmit(e) {
        e.preventDefault();

        if (this.validate()) {

            let add_cls = this.state.input;
            add_cls[e.target.name] = e.target.value;

            this.postdata(add_cls);
        }
        // 👇️ clear all input values in the form
        e.target.reset();
    }

    postdata = (data) => {
        let z = this.state.empID = localStorage.getItem("empID")
        let d1 = data["req"];
        let d2 = data["sub"];
        let d3 = data["first"];
        let d4 = data["second"];
        let d5 = data["closure"];

        axios.post(`${base_url}/add_cls?req=${d1}&sub=${d2}&first=${d3}&second=${d4}&closure=${d5}&empid=${z}`).then(

            (response) => {
                toast.success("Requirement added successfully!",
                    { position: "top-right" }
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
        let errors = {};
        let isValid = true;
        let addNew1 = true;
        let addNew2 = true;

        console.log("type of input " + typeof (input["req"]));

        console.log("Req " + input["req"]);
        console.log("Sub " + input["sub"]);
        console.log("First " + input["first"]);
        console.log("Second " + input["second"]);
        console.log("Closure " + input["closure"]);

        let reqNum = parseInt(input["req"]);
        let subNum = parseInt(input["sub"]);
        let fNum = parseInt(input["first"]);
        let sNum = parseInt(input["second"]);
        let clsNum = parseInt(input["closure"]);

        console.log("type of reqNum " + typeof (reqNum));


        if ((!reqNum)) {
            isValid = false;
            errors["req"] = "This field is required";
        }

        else if (reqNum < 1) {
            isValid = false;
            errors["req"] = "Atleast 1 requirement is needed";
        }
        else if (reqNum !== undefined) {

            var pattern = new RegExp(/^(?=.*[0-9]).{1,3}$/); //new RegExp(/^[A-Za-z#+.\b]+$/);
            if (!pattern.test(input["req"])) {
                isValid = false;
                errors["req"] = "Only 3 digit number is accepted!";
            }
        }
        // -----------------------------------------------------------------------------------------------------------------------
        if (!subNum) {
            isValid = false;
            errors["sub"] = "This field is required";
        }
        else if (subNum < 0) {
            isValid = false;
            errors["sub"] = "Enter positive number";
        }
        else if ((subNum !== undefined)) {

            var pattern = new RegExp(/^(?=.*[0-9]).{1,3}$/); //new RegExp(/^[A-Za-z#+.\b]+$/);
            if (!pattern.test(input["sub"])) {
                isValid = false;
                errors["sub"] = "Only 3 digit number is accepted!";
            }
        }
        // ----------------------------------------------------------------------------------------------------------------------
        if (!fNum) {
            isValid = false;
            errors["first"] = "This field is required";
        }
        else if (fNum < 0) {

            isValid = false;
            errors["first"] = "Enter positive number";
        }
        else if ((fNum !== undefined)) {

            var pattern = new RegExp(/^(?=.*[0-9]).{1,3}$/); //new RegExp(/^[A-Za-z#+.\b]+$/);
            if (!pattern.test(input["first"])) {
                isValid = false;
                errors["first"] = "Only 3 digit number is accepted!";
            }
        }

        if (fNum > subNum) {
            isValid = false;
            errors["first"] = "Enter valid number for first interview";
        }
        // ----------------------------------------------------------------------------------------------------------------------
        if (!sNum) {
            isValid = false;
            errors["second"] = "This field is required";
        }
        else if (sNum < 0) {
            isValid = false;
            errors["second"] = "Enter positive number";
        }
        else if ((sNum !== undefined)) {

            var pattern = new RegExp(/^(?=.*[0-9]).{1,3}$/); //new RegExp(/^[A-Za-z#+.\b]+$/);
            if (!pattern.test(input["second"])) {
                isValid = false;
                errors["second"] = "Only 3 digit number is accepted!";
            }
        }

        if (sNum > input["first"]) {
            isValid = false;
            errors["second"] = "Enter valid number for second interview";
        }
        // ----------------------------------------------------------------------------------------------------------------------
        if (!clsNum) {
            isValid = false;
            errors["closure"] = "This field is required";
        }

        else if (clsNum < 0) {
            isValid = false;
            errors["closure"] = "Enter positive number";
        }
        else if ((clsNum !== "undefined")) {

            var pattern = new RegExp(/^(?=.*[0-9]).{1,3}$/); //new RegExp(/^[A-Za-z#+.\b]+$/);
            if (!pattern.test(input["closure"])) {
                isValid = false;
                errors["closure"] = "Only 3 digit number is accepted!";
            }
        }
        if (clsNum > sNum) {
            isValid = false;
            errors["closure"] = "Enter valid number for closure";
        }
        // ---------------------------------------------------------------------------------------------------------------------

        this.setState({
            errors: errors
        });

        return isValid;
    }
    // -------------------------------------------- End Validation Code ----------------------------------------------------------

    render() {
        const isAuthenticated = localStorage.getItem('empID');
        let empID = localStorage.getItem('empID');

        return isAuthenticated ? (
            <div className="container-fluid">
                <div className="row">

                    <div className="col-12 h-100 master_backgroung_heder">
                        <Header />
                    </div>
                    <div className="col-2 master_backgroung_side side">
                        <EmpSidebar />
                    </div>

                    <div className="col-10 master_backgroung_work scroll-bar">

                        <div className="row">
                            <form onSubmit={this.handleSubmit}>

                                <div className="col-12">
                                    <div className="row">
                                        <div className="col-12">
                                            <div class="form-group" style={{ paddingLeft: '20px', paddingRight: '20px', paddingTop: '20px' }}>
                                                <label for="req"><b>Requisition From:</b></label><br />

                                                <select class="btn btn-secondary dropdown-toggle"
                                                    ref={(input) => { this.refInput = input; }}
                                                    style={{ width: '480px' }} name="req" id="req"
                                                    onChange={this.handleChange}
                                                    onKeyUp={this.keyUpHandlerReq}
                                                    value={this.state.input.req}>

                                                    <option value="volvo">Volvo</option>
                                                    <option value="saab">Saab</option>
                                                    <option value="mercedes">Mercedes</option>
                                                    <option value="audi">Audi</option>
                                                </select>

                                                <div className="text-danger">{this.state.errors.req}</div>
                                            </div>

                                        </div>


                                        <div className="col-6" style={{ paddingLeft: '35px', paddingRight: '20px' }}>
                                            <div class="form-group">
                                                <label for="sub"><b>ID:</b></label>
                                                <input
                                                    minLength={1}
                                                    maxLength={3}
                                                    type="number"
                                                    name="id"
                                                    value={this.state.input.id}

                                                    onChange={this.handleChange}
                                                    onKeyUp={this.keyUpHandlerSub}
                                                    placeholder="ID"

                                                    class="form-control" />

                                                <div className="text-danger">{this.state.errors.id}</div>
                                            </div>

                                            <div class="form-group">
                                                <label for="first"><b>Client:</b></label>
                                                <select class="btn btn-secondary dropdown-toggle"
                                                    style={{ width: '480px' }}
                                                    name="cars" id="cars"
                                                    onChange={this.handleChange}
                                                    onKeyUp={this.keyUpHandlerReq}
                                                    value={this.state.input.client}>
                                                    <option value="volvo">Client1</option>
                                                    <option value="saab">client2</option>
                                                    <option value="mercedes">Client3</option>
                                                    <option value="audi">client4</option>
                                                </select>

                                                <div className="text-danger">{this.state.errors.client}</div>
                                            </div>
                                            <div class="form-group">
                                                <label for="second"><b>Job title:</b></label>
                                                <input
                                                    minLength={1}
                                                    maxLength={3}
                                                    type="number"
                                                    name="second"
                                                    value={this.state.input.second}
                                                    onChange={this.handleChange}
                                                    onKeyUp={this.keyUpHandlerSecond}
                                                    placeholder="Job title"

                                                    class="form-control" />

                                                <div className="text-danger">{this.state.errors.second}</div>
                                            </div>
                                            <div class="form-group">
                                                <label for="closure"><b>Duration:</b></label>
                                                <select class="btn btn-secondary dropdown-toggle"
                                                    style={{ width: '480px' }}
                                                    name="cars" id="cars"
                                                    onChange={this.handleChange}
                                                    onKeyUp={this.keyUpHandlerReq}
                                                    value={this.state.input.req}>
                                                    <option value="volvo">1 month</option>
                                                    <option value="saab">2 month</option>
                                                    <option value="mercedes">3 month</option>
                                                    <option value="audi">6 month</option>
                                                </select>
                                                <div className="text-danger">{this.state.errors.closure}</div>
                                            </div>

                                        </div>
                                        <div className="col-6" style={{ paddingLeft: '35px', paddingRight: '30px' }}>
                                            <div class="form-group">
                                                <label for="closure"><b>Client rate:</b></label>
                                                <input
                                                    minLength={1}
                                                    maxLength={3}
                                                    type="number"
                                                    name="closure"
                                                    value={this.state.input.closure}
                                                    onChange={this.handleChange}
                                                    onKeyUp={this.keyUpHandlerClosure}
                                                    placeholder="Client rate"

                                                    class="form-control" />

                                                <div className="text-danger">{this.state.errors.closure}</div>
                                            </div>
                                            <div class="form-group">
                                                <label for="closure"><b>Location:</b></label>
                                                <input
                                                    minLength={1}
                                                    maxLength={3}
                                                    type="number"
                                                    name="closure"
                                                    value={this.state.input.closure}
                                                    onChange={this.handleChange}
                                                    onKeyUp={this.keyUpHandlerClosure}
                                                    placeholder="Location"

                                                    class="form-control" />

                                                <div className="text-danger">{this.state.errors.closure}</div>
                                            </div>
                                            <div class="form-group">
                                                <label for="closure"><b>Position type:</b></label>
                                                <select class="btn btn-secondary dropdown-toggle"
                                                    style={{ width: '480px' }}
                                                    name="cars" id="cars"
                                                    onChange={this.handleChange}
                                                    onKeyUp={this.keyUpHandlerReq}
                                                    value={this.state.input.req}>

                                                    <option value="volvo">On-site</option>
                                                    <option value="saab">Remote</option>
                                                    <option value="mercedes">Hybrid</option>
                                                    <option value="audi">Remote until Pandamic</option>
                                                </select>

                                                <div className="text-danger">{this.state.errors.closure}</div>
                                            </div>
                                            <div class="form-group">
                                                <label for="closure"><b>Skills:</b></label>
                                                <input
                                                    minLength={1}
                                                    maxLength={3}
                                                    type="number"
                                                    name="closure"
                                                    value={this.state.input.closure}
                                                    onChange={this.handleChange}
                                                    onKeyUp={this.keyUpHandlerClosure}
                                                    placeholder="Skills"

                                                    class="form-control" />

                                                <div className="text-danger">{this.state.errors.closure}</div>
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
                                                    Add
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

export default AddRequisition;