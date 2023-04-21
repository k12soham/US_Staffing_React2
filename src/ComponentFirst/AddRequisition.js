import React from 'react';
import axios from 'axios';
import base_url from '../api/bootapi';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import history from './ResponseVal';
import EmployeeHeader from './EmployeeHeader';
import { useNavigate } from "react-router-dom";

class AddRequisition extends React.Component {

    componentDidMount() {
        this.refInput.focus();


        const isAuthenticated = localStorage.getItem('recruiterID');
        localStorage.setItem('recruiterID', isAuthenticated)
        this.setState({ empID: isAuthenticated })


        axios.get(`${base_url}/getAllDuration`)
            .then(json =>
                this.setState({ duration_fd: json.data })
            )
            .catch(error => {
          
            })

        axios.get(`${base_url}/getAllPositionType`)
            .then(json =>
                this.setState({ positionType_fd: json.data })
            )
            .catch(error => {
               
            })

        axios.get(`${base_url}/getAllRequisitorFd`)
            .then(json =>
                this.setState({ requisitor_fd: json.data })
            )
            .catch(error => {
              
              
            })

        axios.get(`${base_url}/getAllClient`)
            .then(json =>
                this.setState({ client_fd: json.data })
            )
            .catch(error => {
                
            })

            axios.get(`${base_url}/getRequisitionId`)
            .then(json =>
                this.setState({ RequisitionId: json.data })
            )
            .catch(error => {

            })
    }

    constructor(props) {
        super(props);

        this.state = {
            input: { req: '', id: '', client: '', jobTitle: '', duration: '', clientrate: '', location: '', positionType: '', skills: '' },
            input1: {},
            errors: {},
            empID: '',
            duration_fd: [],
            positionType_fd: [],
            requisitor_fd: [],
            client_fd: [],
            setReqList: [],
            requisitionId1: undefined,
            RequisitionId:[],

            reqval: '',

        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    resetForm = () => {

        let inputs = {};
        inputs["req"] = '';
        inputs["id"] = '';
        inputs["client"] = '';
        inputs["jobTitle"] = '';
        inputs["duration"] = '';
        inputs["clientrate"] = '';
        inputs["location"] = '';
        inputs["positionType"] = '';
        inputs["skills"] = '';

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
        let a = add_cls["req"]
        if (this.state.reqval != a) {
            add_cls["client"] = null
        }
        this.setState({
            input: add_cls,reqval: a
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        if(this.state.input["id"]!=null)
        {
            this.state.input["id"] = this.state.input["id"].trim();
            this.state.input["id"] = this.state.input["id"].replaceAll("#", "%23")
        }

        if(this.state.input["jobTitle"]!=null)
        {
            this.state.input["jobTitle"] = this.state.input["jobTitle"].trim();
            this.state.input["jobTitle"] = this.state.input["jobTitle"].replaceAll("#", "%23")
        }

        if(this.state.input["location"]!=null)
        {
            this.state.input["location"] = this.state.input["location"].trim();
            this.state.input["location"] = this.state.input["location"].replaceAll("#", "%23")
        }

        if(this.state.input["clientrate"]!=null)
        {
            this.state.input["clientrate"] = this.state.input["clientrate"].trim();
            this.state.input["clientrate"] = this.state.input["clientrate"].replaceAll("#", "%23")
        }

        if(this.state.input["skills"]!=null)
        {
            this.state.input["skills"] = this.state.input["skills"].trim();
            this.state.input["skills"] = this.state.input["skills"].replaceAll("#", "%23")
        }
        
       
     


        if (this.validate()) {

          
            let add_cls = this.state.input;
            add_cls[e.target.name] = e.target.value;



            this.post_requisition(add_cls);
            
        }
        // 👇️ clear all input values in the form
        e.target.reset();
    }

    post_requisition = (data) => {
      
        let recId = this.state.empID = localStorage.getItem("recruiterID");
       let z=  parseInt(recId);
        let d1 = data["req"];
        let d2 = data["id"];
        let d3 = data["client"];
        let d4 = data["jobTitle"];
        let d5 = data["duration"];
        let d6 = data["clientrate"];
        let d7 = data["location"];
        let d8 = data["positionType"];
        let d9 = data["skills"];

        axios.post(`${base_url}/add_requsition?requisition_from=${d1}&id=${d2}&client=${d3}&job_title=${d4}
        &duration=${d5}&client_rate=${d6}&location=${d7}&position_type=${d8}&skills=${d9}&recruiter_id=${z}`)
            .then(

            (response) => {
                       
                
                 let a = response.data.requisition_id;

                if(a != undefined){
                    localStorage.setItem("requisitionID", a);
                    this.setState({ requisitionId1: a });
                }              

                toast.success("Requisition added successfully!",
                    { position: "top-right" ,
                    autoClose: 1000,
                    style: { position: "absolute", top: "5px", width: "300px" }
                }
                );

                
                let navigate = useNavigate();
                navigate("/addRequisition");
               
            },
            (error) => {
                console.log(error);
                console.log("Error");
                alert("Please enter valid details OR \nyou are already working on this requisition")
            }
        );

        let inputs = {};
        inputs["req"] = '';
        inputs["id"] = '';
        inputs["client"] = '';
        inputs["jobTitle"] = '';
        inputs["duration"] = '';
        inputs["clientrate"] = '';
        inputs["location"] = '';
        inputs["positionType"] = '';
        inputs["skills"] = '';

        this.setState({ input: inputs });
    }
    // --------------------------------------------Validation Code ----------------------------------------------------------

    validate() {

        let input = this.state.input;
        let errors = {};
        let isValid = true;
       
        if ((!input["req"])) {
            isValid = false;
            errors["req"] = "This field is required";
        }
       

        // -------------id---------------------------------------------------------------------------------------------
        if ((!input["id"])) {
            isValid = false;
            errors["id"] = "This field is required";
        }
   
      

        // -------------client-----------------------------------------------------------------------------------------
        if ((!input["client"])) {
            isValid = false;
            errors["client"] = "This field is required";
        }

        // -------------jobTitle-----------------------------------------------------------------------------------------
        if ((!input["jobTitle"])) {
            isValid = false;
            errors["jobTitle"] = "This field is required";
        }
        if ((input["jobTitle"]) != '') {

            var pattern = new RegExp(/^[a-zA-Z !@#$%^&*()_+-= \s]{2,50}$/);
            if (!pattern.test(input["jobTitle"])) {
                isValid = false;
                errors["jobTitle"] = "Please enter valid Job Title.";
            }
        }

        // -------------duration-----------------------------------------------------------------------------------------
        if ((!input["duration"])) {
            isValid = false;
            errors["duration"] = "This field is required";
        }
        // -------------clientrate-----------------------------------------------------------------------------------------
        if ((!input["clientrate"])) {
            isValid = false;
            errors["clientrate"] = "This field is required";
        }
        if ((input["clientrate"]) != undefined) {
            var pattern = new RegExp(/^((?!(0))[0-9\s]{0,5})$/);
            if (!pattern.test(input["clientrate"])) {
                isValid = false;
                errors["clientrate"] = "Client rate should be numeric data.";
            }
            if (input["clientrate"] < 0) {
                isValid = false;
                errors["clientrate"] = "Client rate should be numeric data.";
            }
        }
        // -------------location-----------------------------------------------------------------------------------------
        if ((!input["location"])) {
            isValid = false;
            errors["location"] = "This field is required";
        }
       

        // -------------positionType-----------------------------------------------------------------------------------------
        if ((!input["positionType"])) {
            isValid = false;
            errors["positionType"] = "This field is required";
        }
        // -------------skills-----------------------------------------------------------------------------------------
        if ((!input["skills"])) {
            isValid = false;
            errors["skills"] = "This field is required";
        }
        if ((input["skills"]) != undefined) {
            if ((input["skills"]) != undefined) {

                var pattern = new RegExp(/^(?=.{0,300}$)/);
               
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

    // -------------------------------------------- If Requisition Exist --------------------------------------
    keyUpHandlerID = (e) => {

    
        let reqID = e.target.value;
        let object = this.state.RequisitionId.find(obj => obj.id == reqID);
       
        if(object!=null)
        {

                let inputs = this.state.input;

                inputs["req"] = object.requisition_from;
                inputs["id"] = object.id;
                inputs["client"] = object.client;
                inputs["jobTitle"] = object.job_title;
                inputs["duration"] = object.duration;
                inputs["clientrate"] = object.client_rate;
                inputs["location"] = object.location;
                inputs["positionType"] = object.position_type;
                inputs["skills"] = object.skills;

                this.setState({ input: inputs });

                let a3 = object.requisition_id;
                let b = object.id;

                this.setState({
                    requisitionId1: a3,
                    RID: b,
                });
                let text = "On this requisiton recruiters are already working. \nWould you like to add yourself for this requisition?"
                if (window.confirm(text) == true) {
                    let add_cls = this.state.input;
                    add_cls[e.target.name] = e.target.value;
                    this.post_requisition(add_cls)
                }
            }
            else{
                console.log("error")
            }
    
        
                

               
    }

    // -------------------------------------------- render ----------------------------------------------------
    render() {

        const isAuthenticated = localStorage.getItem('recruiterRole');

        return isAuthenticated=="TM" ? (

            <div className="">
                <div className="row">

                    <div className="col-12  master_backgroung_heder">
                        <EmployeeHeader />
                    </div>

                    <div className="col-12 master_backgroung_work2 scroll-bar-horizontal">

                        <div className="row">
                            <form onSubmit={this.handleSubmit}>

                                <div className="col-12">
                                    <div className="row" style={{ paddingTop: '2%' }}>

                                        <div className="col-6" style={{ paddingLeft: '35px', paddingRight: '20px' }}>

                                            <div class="form-group">
                                                <label for="req"><b>Requisition From:</b><b style={{color:'red'}}>*</b></label><br />
                                                <select class="btn btn-secondary dropdown-toggle"
                                                    ref={(input) => { this.refInput = input; }}
                                                    style={{ width: '100%', textAlign:"left" }}
                                                    name="req" id="req"
                                                    onChange={this.handleChange}
                                                    value={this.state.input.req}>

                                                    <option hidden value='' default selected> Select MSP/VMS/Commercial Client </option>
                                                    {
                                                        this.state.requisitor_fd.map((rq) => (
                                                            <option value={rq.requisitor_fd}>{rq.requisitor_fd}</option>
                                                        ))
                                                    }
                                                </select>
                                                <div className="text-danger">{this.state.errors.req}</div>
                                                </div>

                                                <div class="form-group">
                                                <label for="id"><b>Job Posting ID:</b><b style={{color:'red'}}>*</b></label>
                                                <input
                                                   // minLength={1}
                                                    maxLength={50}
                                                    type="text"
                                                    name="id"
                                                    value={this.state.input.id}
                                                    onChange={this.handleChange}
                                                    onBlur={this.keyUpHandlerID}
                                                    placeholder="Job Posting ID"
                                                    class="form-control" />

                                                <div className="text-danger">{this.state.errors.id}</div>
                                            </div>

                                            <div class="form-group">
                                                <label for="client"><b>Client:</b><b style={{color:'red'}}>*</b></label><br />
                                                <select class="btn btn-secondary dropdown-toggle"
                                                    style={{ width: '100%', textAlign:"left"  }}
                                                    name="client" id="client"
                                                    onChange={this.handleChange}                                    
                                                    value={this.state.input.client}>

                                                    <option hidden value='' default selected> Select Client Name </option>
                                                    {
                                                        this.state.client_fd.map((cl) => (

                                                            cl.requisitor_fd.requisitor_fd == this.state.input.req ?
                                                                (
                                                                    <option value={cl.client_name}>{cl.client_name}</option>
                                                                )
                                                                :
                                                                (
                                                                    null
                                                                )
                                                        ))
                                                    }

                                                </select>

                                                <div className="text-danger">{this.state.errors.client}</div>
                                            </div>
                                            <div class="form-group">
                                                <label for="jobTitle"><b>Job Title:</b><b style={{color:'red'}}>*</b></label>
                                                <input
                                                    minLength={1}
                                                    maxLength={50}
                                                    type="text"
                                                    name="jobTitle"
                                                    value={this.state.input.jobTitle}
                                                    onChange={this.handleChange}
                                                  
                                                    placeholder="Job Title"
                                                    class="form-control" />

                                                <div className="text-danger">{this.state.errors.jobTitle}</div>
                                            </div>
                                            <div class="form-group">
                                                <label for="duration"><b>Duration:</b><b style={{color:'red'}}>*</b></label><br />
                                                <select class="btn btn-secondary dropdown-toggle"
                                                    style={{ width: '100%', textAlign:"left"  }}
                                                    name="duration" id="duration"
                                                    onChange={this.handleChange}
                                                    onKeyUp={this.keyUpHandlerReq}
                                                    value={this.state.input.duration}>

                                                    <option hidden value=''>Select Duration</option>
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
                                                <label for="clientrate"><b>Client Rate ($):</b><b style={{color:'red'}}>*</b></label>
                                                <input
                                                    minLength={1}
                                                    maxLength={5}
                                                    type="text"
                                                    name="clientrate"
                                                    value={this.state.input.clientrate}
                                                    onChange={this.handleChange}
                                                 
                                                    placeholder="Client Rate in $/hr"

                                                    class="form-control" />

                                                <div className="text-danger">{this.state.errors.clientrate}</div>
                                            </div>
                                            <div class="form-group">
                                                <label for="location"><b>Location:</b><b style={{color:'red'}}>*</b></label>
                                                <input
                                                    minLength={1}
                                                    maxLength={50}
                                                    type="text"
                                                    name="location"
                                                    value={this.state.input.location}
                                                    onChange={this.handleChange}
                                                  
                                                    placeholder="Location"
                                                    class="form-control" />

                                                <div className="text-danger">{this.state.errors.location}</div>
                                            </div>
                                            <div class="form-group">
                                                <label for="positionType"><b>Position Type:</b><b style={{color:'red'}}>*</b></label><br />
                                                <select class="btn btn-secondary dropdown-toggle"
                                                    style={{ width: '100%', textAlign:"left"  }}
                                                    name="positionType" id="positionType"
                                                    onChange={this.handleChange}
                                                
                                                    value={this.state.input.positionType}>

                                                    <option hidden value='' default selected> Select Position Type </option>
                                                    {
                                                        this.state.positionType_fd.map((pt) => (

                                                            <option value={pt.position_type}>{pt.position_type}</option>
                                                        ))
                                                    }

                                                </select>

                                                <div className="text-danger">{this.state.errors.positionType}</div>
                                            </div>
                                            <div class="form-group">
                                                <label for="closure"><b>Skills:</b><b style={{color:'red'}}>*</b></label>
                                                <textarea

                                                    minLength={1}
                                                    maxLength={200}
                                                    type="text"
                                                    name="skills"
                                                    value={this.state.input.skills}
                                                    onChange={this.handleChange}
                                               
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
                                                    className="btn btn-warning w-100 theme-btn mx-auto"
                                                    onClick={this.resetForm}
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