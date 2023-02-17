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

class AddRequisition extends React.Component {
    // const [reqList, setReqList] = useState([]);
    componentDidMount() {
        this.refInput.focus();

        axios.get(`${base_url}/getAllDuration`)
            .then(json =>
                this.setState({ duration_fd: json.data })
            )
            .catch(error => {
               // alert("Error duration")
            })

        axios.get(`${base_url}/getAllPositionType`)
            .then(json =>
                this.setState({ positionType_fd: json.data })
            )
            .catch(error => {
               // alert("Error position")
            })

        axios.get(`${base_url}/getAllRequisitorFd`)
            .then(json =>
                this.setState({ requisitor_fd: json.data })
            )
            .catch(error => {
               // alert("Error requisitor")
            })

        axios.get(`${base_url}/getAllStatusFd`)
            .then(json =>
                this.setState({ status_fd: json.data })
            )
            .catch(error => {
               // alert("Error status")
            })

        axios.get(`${base_url}/getAllClient`)
            .then(json =>
                this.setState({ client_fd: json.data })
            )
            .catch(error => {
               // alert("Error client")
            })
    }

    constructor(props) {
        super(props);

        this.state = {
            input: {},
            errors: {},
            empID: '',
            duration_fd: [],
            positionType_fd: [],
            requisitor_fd: [],
            status_fd: [],
            client_fd: [],
            setReqList: [],
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    resetForm = () => {
        // alert("Clear");
        // this.setState(this.baseState)
        let inputs = {};
        inputs["req"] = undefined;
        inputs["id"] = undefined;
        inputs["client"] = undefined;
        inputs["jobTitle"] = undefined;
        inputs["duration"] = undefined;
        inputs["clientrate"] = undefined;
        inputs["location"] = undefined;
        inputs["positionType"] = undefined;
        inputs["skills"] = undefined;

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

    addCandidate = (a, b) => {
        console.log("recid = " + a + " rqid = " + b);

        if (b != undefined) {
            localStorage.setItem('RecId_New', a);
            localStorage.setItem('ReqId', b)
            // alert("Successfully Login");
            // navigate("/addCandidate");
            history.push("/addCandidate");
            window.location.reload();
            toast.success("Render  successfully!",
                { position: "top-right" })
        }

        console.log("addCandidate");
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

            this.post_requisition(add_cls);
        }
        // 👇️ clear all input values in the form
        e.target.reset();
    }

    post_requisition = (data) => {
        let z = this.state.empID = localStorage.getItem("recruiterId");
        console.log("recruiterId : " + z);
        let d1 = data["req"];
        let d2 = data["id"];
        let d3 = data["client"];
        let d4 = data["jobTitle"];
        let d5 = data["duration"];
        let d6 = data["clientrate"];
        let d7 = data["location"];
        let d8 = data["positionType"];
        let d9 = data["skills"];

        // const isAuthenticated = localStorage.getItem('empID');
        // let empID = localStorage.getItem('empID');

        // axios.post(`${base_url}/add_requsition?requisition_from=${d1}
        // &id=${d2}&client=${d3}&job_title=${d4}&duration=${d5}&client_rate=${d6}&location=${d7}
        // &position_type=${d8}&skills=${d9}&recruiter_id=${z}`).then(
        //     json => this.state.setReqList(json.data),
        //     // setIsDownload(true),
        //     (response) => {
        //         toast.success("Requirement added successfully!",
        //             { position: "top-right" }
        //         );
        //         console.log
        //     },
        //     (error) => {
        //         console.log(error);
        //         console.log("Error");
        //         alert("Please enter valid details.")
        //     }
        // );
        // console.log("req list : "+this.state.setReqList);


        // let inputs = {};
        // inputs["req"] = undefined;

        axios.post(`${base_url}/add_requsition?requisition_from=${d1}
        &id=${d2}&client=${d3}&job_title=${d4}&duration=${d5}&client_rate=${d6}&location=${d7}
        &position_type=${d8}&skills=${d9}&recruiter_id=${z}`).then(
            (response) => {

                this.setState({ setReqList: response.data });

                toast.success("Requirement added successfully!",
                    { position: "top-right",
                    autoClose: 2000,
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
        console.log(this.state.setReqList);

        // axios.post(`${base_url}/add_requsition?requisition_from=${d1}
        // &id=${d2}&client=${d3}&job_title=${d4}&duration=${d5}&client_rate=${d6}&location=${d7}
        // &position_type=${d8}&skills=${d9}&recruiter_id=${z}`)
        // .then(
        //     json=> 
        //     this.setState({
        //         setReqList: (json.data)
        //      } ),
        //     // json => this.state.setReqList(json.data),
        //     // setIsDownload(true),
        // )
        // .catch(error => {
        //     console.log(error);
        //     console.log("Error");
        //     alert("Please enter valid details.")

        // })
        // console.log("req list : "+this.state.setReqList);

        let inputs = {};
        inputs["req"] = undefined;
        inputs["id"] = undefined;
        inputs["client"] = undefined;
        inputs["jobTitle"] = undefined;
        inputs["duration"] = undefined;
        inputs["clientrate"] = undefined;
        inputs["location"] = undefined;
        inputs["positionType"] = undefined;
        inputs["skills"] = undefined;

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

        console.log("req " + input["req"]);
        console.log("id " + input["id"]);
        console.log("client " + input["client"]);
        console.log("jobTitle " + input["jobTitle"]);
        console.log("duration " + input["duration"]);
        console.log("clientrate " + input["clientrate"]);
        console.log("location " + input["location"]);
        console.log("positionType " + input["positionType"]);
        console.log("skills " + input["skills"]);

        console.log("type of reqNum " + typeof (reqNum));

        if ((!input["req"])) {
            isValid = false;
            errors["req"] = "This req field is required";
        }
        if ((input["req"]) != undefined) {

            var pattern = new RegExp(/^[^\s][a-zA-Z\s]+[^\s]$/);
            if (!pattern.test(input["req"])) {
                isValid = false;
                errors["req"] = "Please enter only characters.";
            }

        }
        if ((input["req"]) != undefined) {

            var pattern = new RegExp(/^[^\s][a-zA-Z\s]+[^\s]$/);
            if (!pattern.test(input["req"])) {
                isValid = false;
                errors["req"] = "Please enter only characters.";
            }

        }
        // -------------id---------------------------------------------------------------------------------------------
        if ((!input["id"])) {
            isValid = false;
            errors["id"] = "This id field is required";
        }
        let id1 = parseInt(input["id"]);
        console.log(id1);
        console.log("typeOf id1: " + typeof (id1));
        if ((input["id"]) != undefined) {


            var pattern = new RegExp(/^(?=.*[0-9]).{1,10}$/); //new RegExp(/^[A-Za-z#+.\b]+$/);
            if (!pattern.test(id1)) {
                isValid = false;
                errors["id"] = "Only 10 digit number is accepted!";
            }
            if (id1 < 0) {
                isValid = false;
                errors["id"] = "Only +ve digit number is accepted!";
            }
        }

        // -------------client-----------------------------------------------------------------------------------------
        if ((!input["client"])) {
            isValid = false;
            errors["client"] = "This client field is required";
        }
        // if ((input["client"]) != undefined) {

        //     var pattern = new new RegExp(/^[^\s][a-zA-Z0-9 !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?\s]+[^\s]$/);
        //     // RegExp(/^[^\s][a-zA-Z\s]+[^\s]+[@#$%^&*,!? \b]$/);
        //     if (!pattern.test(input["client"])) {
        //         isValid = false;
        //         errors["client"] = "Please enter only characters.";
        //     }
        // }
        // -------------jobTitle-----------------------------------------------------------------------------------------
        if ((!input["jobTitle"])) {
            isValid = false;
            errors["jobTitle"] = "This jobTitle field is required";
        }
        if ((input["jobTitle"]) != undefined) {

            var pattern = new RegExp(/^[^\s][a-zA-Z0-9 !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?\s]+[^\s]{2,50}$/);
            // new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[@#$%^&*,!? \b]).{6,15}$/); 

            if (!pattern.test(input["jobTitle"])) {
                isValid = false;
                errors["jobTitle"] = "Please enter only characters.";
            }
        }

        // -------------duration-----------------------------------------------------------------------------------------
        if ((!input["duration"])) {
            isValid = false;
            errors["duration"] = "This duration field is required";
        }
        // -------------clientrate-----------------------------------------------------------------------------------------
        if ((!input["clientrate"])) {
            isValid = false;
            errors["clientrate"] = "This clientrate field is required";
        }
        // -------------location-----------------------------------------------------------------------------------------
        if ((!input["location"])) {
            isValid = false;
            errors["location"] = "This location field is required";
        }
        if ((input["location"]) != undefined) {

            var pattern = new RegExp(/^[^\s][a-zA-Z0-9 &*()_;':",./\s]+[^\s]{2,50}$/);

            if (!pattern.test(input["location"])) {
                isValid = false;
                errors["location"] = "Please enter valid location name.";
            }
        }

        // -------------positionType-----------------------------------------------------------------------------------------
        if ((!input["positionType"])) {
            isValid = false;
            errors["positionType"] = "This positionType field is required";
        }
        // -------------skills-----------------------------------------------------------------------------------------
        if ((!input["skills"])) {
            isValid = false;
            errors["skills"] = "This skills field is required";
        }
        if ((input["skills"]) != undefined) {
            if ((input["skills"]) != undefined) {

                var pattern = new RegExp(/^[^\s][a-zA-Z0-9 !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?\s]+[^\s]{2,50}$/);
                // new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[@#$%^&*,!? \b]).{6,15}$/); 

                if (!pattern.test(input["skills"])) {
                    isValid = false;
                    errors["skills"] = "Please enter valid skills.";
                }
            }
            if (!pattern.test(input["skills"])) {
                isValid = false;
                errors["skills"] = "Please enter valid skills.";
            }
        }

        this.setState({
            errors: errors
        });

        return isValid;
    }
    // -------------------------------------------- End Validation Code ----------------------------------------------------------

    render() {
        const isAuthenticated = localStorage.getItem('recruiterID');
    

        return isAuthenticated ? (
            <div className="">
                <div className="row">

                    <div className="col-12 h-100 master_backgroung_heder">
                        <EmployeeHeader />
                    </div>

                    <div className="col-12 master_backgroung_work scroll-bar">

                        <div className="row">
                            <form onSubmit={this.handleSubmit}>

                                <div className="col-12">
                                    <div className="row" style={{ paddingTop: '2%' }}>

                                        <div className="col-6" style={{ paddingLeft: '35px', paddingRight: '20px' }}>

                                            <label for="req"><b>Requisition From:</b></label><br />

                                            <select class="btn btn-secondary dropdown-toggle form-group"
                                                ref={(input) => { this.refInput = input; }}
                                                style={{ width: '100%' }} name="req" id="req"
                                                onChange={this.handleChange}
                                                onKeyUp={this.keyUpHandlerReq}
                                                value={this.state.input.req}>
                                                <option value='' default selected> Select Requisitor </option>

                                                {
                                                    this.state.requisitor_fd.map((rq) => (

                                                        <option value={rq.requisitor_fd}>{rq.requisitor_fd}</option>
                                                    ))

                                                }
                                            </select>


                                            <div className="text-danger">{this.state.errors.req}</div>
                                            <div className="text-danger">{this.state.errors.req}</div>

                                            <div class="form-group">
                                                <label for="id"><b>ID:</b></label>
                                                <input
                                                    minLength={1}
                                                    maxLength={10}
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
                                                <label for="client"><b>Client:</b></label><br />
                                                <select class="btn btn-secondary dropdown-toggle"
                                                    style={{ width: '100%' }}
                                                    name="client" id="client"
                                                    onChange={this.handleChange}
                                                    onKeyUp={this.keyUpHandlerReq}
                                                    value={this.state.input.client}>

                                                    <option value='' default selected> Select client name </option>
                                                    {
                                                        this.state.client_fd.map((cl) => (

                                                            <option value={cl.client_name}>{cl.client_name}</option>
                                                        ))
                                                    }

                                                </select>

                                                <div className="text-danger">{this.state.errors.client}</div>
                                            </div>
                                            <div class="form-group">
                                                <label for="jobTitle"><b>Job Title:</b></label>
                                                <input
                                                    minLength={1}
                                                    maxLength={50}
                                                    type="text"
                                                    name="jobTitle"
                                                    value={this.state.input.jobTitle}
                                                    onChange={this.handleChange}
                                                    onKeyUp={this.keyUpHandlerSecond}
                                                    placeholder="Job Title"
                                                    class="form-control" />

                                                <div className="text-danger">{this.state.errors.jobTitle}</div>
                                            </div>
                                            <div class="form-group">
                                                <label for="duration"><b>Duration:</b></label><br />
                                                <select class="btn btn-secondary dropdown-toggle"
                                                    style={{ width: '100%' }}
                                                    name="duration" id="duration"
                                                    onChange={this.handleChange}
                                                    onKeyUp={this.keyUpHandlerReq}
                                                    value={this.state.input.duration}>

                                                    <option value="">Select Duration</option>
                                                    {
                                                        this.state.duration_fd.map((dr) => (

                                                            <option value={dr.duration}>{dr.duration}</option>
                                                        ))

                                                    }

                                                </select>
                                                <div className="text-danger">{this.state.errors.duration}</div>
                                            </div>

                                        </div>
                                        <div className="col-6" style={{ paddingLeft: '35px', paddingRight: '30px' }}>
                                            <div class="form-group">
                                                <label for="clientrate"><b>Client Rate:</b></label>
                                                <input
                                                    minLength={2}
                                                    maxLength={5}
                                                    type="text"
                                                    name="clientrate"
                                                    value={this.state.input.clientrate}

                                                    onChange={this.handleChange}
                                                    onKeyUp={this.keyUpHandlerSub}
                                                    placeholder="Client Rate"

                                                    class="form-control" />

                                                <div className="text-danger">{this.state.errors.clientrate}</div>
                                            </div>
                                            <div class="form-group">
                                                <label for="location"><b>Location:</b></label>
                                                <input
                                                    minLength={2}
                                                    maxLength={50}
                                                    type="text"
                                                    name="location"
                                                    value={this.state.input.location}
                                                    onChange={this.handleChange}
                                                    onKeyUp={this.keyUpHandlerClosure}
                                                    placeholder="Location"

                                                    class="form-control" />

                                                <div className="text-danger">{this.state.errors.location}</div>
                                            </div>
                                            <div class="form-group">
                                                <label for="positionType"><b>Position Type:</b></label><br />
                                                <select class="btn btn-secondary dropdown-toggle"
                                                    style={{ width: '100%' }}
                                                    name="positionType" id="positionType"
                                                    onChange={this.handleChange}
                                                    onKeyUp={this.keyUpHandlerReq}
                                                    value={this.state.input.positionType}>

                                                    <option value='' default selected> Select position type </option>
                                                    {
                                                        this.state.positionType_fd.map((pt) => (

                                                            <option value={pt.position_type}>{pt.position_type}</option>
                                                        ))

                                                    }

                                                </select>

                                                <div className="text-danger">{this.state.errors.positionType}</div>
                                            </div>
                                            <div class="form-group">
                                                <label for="closure"><b>Skills:</b></label>
                                                <textarea

                                                    minLength={1}
                                                    maxLength={200}
                                                    type="text"
                                                    name="skills"
                                                    value={this.state.input.skills}
                                                    onChange={this.handleChange}
                                                    onKeyUp={this.keyUpHandlerClosure}
                                                    placeholder="Skills"

                                                    class="form-control"
                                                    style={{ height: '130px' }} />

                                                <div className="text-danger">{this.state.errors.skills}</div>
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
                                                    className="btn btn-success w-100 theme-btn mx-auto"
                                                    onClick={this.resetForm}
                                                >
                                                    Next
                                                </button>

                                            </div>
                                            <div className='col-2'>
                                                <button
                                                    type="reset"
                                                    className="btn btn-warning w-100 theme-btn mx-auto"
                                                    onClick={this.addCandidate}
                                                >
                                                    Reset
                                                </button>

                                            </div>

                                            <div className='col-2'></div>
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