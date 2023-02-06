import React from 'react';
import axios from 'axios';
import base_url from '../api/bootapi';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
// import history from './ResponseVal';
// import Header from './Header';
// import EmpSidebar from './EmpSidebar';
import { useRef } from 'react';
import { getValue } from '@testing-library/user-event/dist/utils';
import history from '../ViewComponent1/ResponseVal';
import Header from '../ViewComponent1/Header';
import EmpSidebar from '../ViewComponent1/EmpSidebar';

class CompareNumbers extends React.Component {

    componentDidMount() {
        this.refInput.focus();
    }

    constructor(props) {
        super(props);

        this.state = {
            req1: 0,
            sub1: 0,
            first1:0,
            input: {},
            errors: {},
            empID: '',
        };

        console.log("Value of errors " + JSON.stringify(this.state.errors));
        console.log("Value of input[req] " + this.state.input["req"]);   
       
        // this.handleChange = this.handleChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
        this.keyUpHandlerReq = this.keyUpHandlerReq.bind(this);
        this.keyUpHandlerSub = this.keyUpHandlerSub.bind(this);
        this.keyUpHandlerFirst = this.keyUpHandlerFirst.bind(this);
    }

    keyUpHandlerReq(e) {
        let req = e.target.value;
        let errors = {};
        let new_input = this.state.input

        if (req < 1) {
            errors["req"] = "Atleast 1 requirement is needed";
        } 
        else {
            this.setState({
                // input: new_input
                req1: req,
            })
            console.log("After keyUp val are : " + JSON.stringify(this.state.input));
        }

        this.setState({
            errors: errors
        });

        console.log("error: " + JSON.stringify(this.state.errors));
        console.log("Value of Err length " + this.state.errors.length);
    }

    keyUpHandlerSub(e) {
        const objlen = this.state.errors
        let sub = e.target.value;
        console.log("sub : " + sub);
        let errors = {};
        console.log("Value of Err length " + Object.keys(objlen).length);
        if((Object.keys(sub).length) < 2){
            sub = 0+sub;
            // consol
        }

        if ((Object.keys(objlen).length) == 0) {
            // alert(" null");

            let new_input = this.state.input
            console.log("After keyUp val are ##############################: " + JSON.stringify(this.state.input));

            console.log("req : " + this.state.req1 + " sub: " + sub);            

            if ((this.state.req1) < sub ) {
                errors["sub"] = " Sub is not less than req";
            } 
            else {
                this.setState({
                    // input: new_input
                    sub1: 0+sub,
                })
                console.log("After keyUp val are : " + JSON.stringify(this.state.input));
            }

            this.setState({
                errors: errors
            });
        }
       
    }

    keyUpHandlerFirst(e) {
        console.log("sub : "+ this.state.sub1 +" req : "+this.state.req1);
        let first = e.target.value;
        let errors = {};
        let new_input = this.state.input

        let sub = new_input["sub"];
        let first1 = new_input["first"];

        // console.log("sub = "+sub+ " first1 = "+ first1);

        console.log("let error :"+ JSON.stringify(errors));

        const objlen = this.state.errors
       
        if ((this.state.sub1) < first) {
            
            errors["first"] = "Please enter valid number for first interview-keup";
        }
        // else if (sub < first1) {
        //     errors["first"] = "Please enter valid number for first interview-keup";
        //     console.log("let error in if statement :"+ JSON.stringify(errors));
        // }
        else {
            this.setState({
                first1: first
            })
            console.log("After keyUp val are : " + JSON.stringify(this.state.input));
            console.log("let error in Else :"+ JSON.stringify(errors));
        } 

        this.setState({
            errors: errors
        });
    }

    
    handleSubmit(e) {
        e.preventDefault();
        // Get the value stored in #a
        var a = document.getElementById("req").value;
        a = parseFloat(a);
  
  // Get the value stored in #b
        var b = document.getElementById('sub').value;
        b = parseFloat(b);

        if( a < b){
            alert("Enter valid val for sub")
        }
        // if (this.validate()) {

        //     let add_cls = this.state.input;
        //     add_cls[e.target.name] = e.target.value;

        //     this.postdata(add_cls);
        // }
        // // 👇️ clear all input values in the form
        // e.target.reset();
    }

    render() {
        const isAuthenticated = localStorage.getItem('empID');
        let empID = localStorage.getItem('empID');

        return isAuthenticated ? (
            <div className="container-fluid">
                <div className="row">

                    <div className="col-12 h-100 master_backgroung_heder">
                        <Header />
                    </div>
                    <div className="col-2 master_backgroung_side">
                        <EmpSidebar />
                    </div>

                    <div className="col-10 master_backgroung_work scroll-bar">

                        <div className="row">
                            <div className="col-6" style={{ padding: '0px', marginLeft: '30px' }}>{/* width: '203px', */}

                                <br />
                                {/* <Form></Form> */}
                                <form onSubmit={this.handleSubmit}>                            

                                    <div class="form-group">
                                        <label for="req"><b>Requirements worked on:</b></label>
                                        <input
                                            ref={(input) => { this.refInput = input; }}
                                            type="number"
                                            name="req"
                                            value={this.state.input.req}
                                            // onChange={this.handleChange}
                                            onKeyUp={this.keyUpHandlerReq}

                                            class="form-control"
                                            placeholder="Requirements"
                                            id="req" />

                                        <div className="text-danger">{this.state.errors.req}</div>
                                    </div>

                                    <div class="form-group">
                                        <label for="sub"><b>Submissions:</b></label>
                                        <input
                                            minLength={1}
                                            maxLength={3}
                                            type="number"
                                            name="sub"
                                            value={this.state.input.sub}

                                            // onChange={this.handleChange}
                                            onKeyUp={this.keyUpHandlerSub}
                                            placeholder="Submissions"

                                            class="form-control" />

                                        <div className="text-danger">{this.state.errors.sub}</div>
                                    </div>

                                    <div class="form-group">
                                        <label for="first"><b>First Interview:</b></label>
                                        <input
                                            id = "first"
                                            minLength={1}
                                            maxLength={3}
                                            type="number"
                                            name="first"
                                            value={this.state.input.first}
                                            // onChange={this.handleChange}
                                            onKeyUp={this.keyUpHandlerFirst}
                                            placeholder="First Interview"

                                            class="form-control" />

                                        <div className="text-danger">{this.state.errors.first}</div>
                                    </div>

                                    {/* <div class="form-group">
                                        <label for="second"><b>Second Interview:</b></label>
                                        <input
                                            minLength={1}
                                            maxLength={3}
                                            type="number"
                                            name="second"
                                            value={this.state.input.second}
                                            // onChange={this.handleChange}
                                            onKeyUp={this.keyUpHandlerSecond}
                                            placeholder="Second Interview"

                                            class="form-control" />

                                        <div className="text-danger">{this.state.errors.second}</div>
                                    </div>
                                    <div class="form-group">
                                        <label for="closure"><b>Closure:</b></label>
                                        <input
                                            minLength={1}
                                            maxLength={3}
                                            type="number"
                                            name="closure"
                                            value={this.state.input.closure}
                                            onChange={this.handleChange}
                                            onKeyUp={this.keyUpHandlerClosure}
                                            placeholder="Closure"

                                            class="form-control" />

                                        <div className="text-danger">{this.state.errors.closure}</div>
                                    </div> */}


                                    <div className="text-center">
                                        <div className='row'>
                                            <div className='col-2'></div>
                                            <div className='col-4'>
                                                <button
                                                    type="submit"
                                                    className="btn btn-primary w-100 theme-btn mx-auto"
                                                >
                                                    Add
                                                </button>
                                            </div>
                                            <div className='col-4'>
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
                                </form>

                            </div>
                            <div className="col-3"></div>
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

export default CompareNumbers;




















// import React, { Component } from 'react';

// class CompareNumbers extends React.Component {

//     // state = { svalue: 0, evalue: 0}

//     constructor(props) {
//         super(props);

//         this.state = {
//             svalue: 0,
//             evalue: 0,
//             input: {},
//             errors: {},
//             empID: '',
//         };

//         // console.log("Value of errors " + JSON.stringify(this.state.errors));
//         // console.log("Value of input[req] " + this.state.input["req"]);
//         // console.log("Value of Err length " + this.state.errors.length);
       
//         this.handleDate1 = this.handleDate1.bind(this);
//         this.handleDate2 = this.handleDate2.bind(this);

//     }

//     componentDidUpdate() {
//         if (this.state.svalue.valueOf === this.state.evalue.valueOf) {
//             // they are equal
//             alert("Both val are equals : s1 ="+ this.state.svalue.valueOf + " s2 = "+this.state.evalue.valueOf )
//         }
//     }
//     renderDates = (value) => {
//         //Do something
//         return
//         {
//             <div>
//                 <input
//                     // component={Datepicker}
//                     value={this.state.svalue}
//                     name="sdate"
//                     id="date 1"
//                     label="sdate"
//                     onChage={this.handleDate1}
//                 />
//                 <input
//                     // component={Datepicker}
//                     value={this.state.evalue}
//                     name="edate"
//                     id="date 2"
//                     label="edate"
//                     onChage={this.handleDate2}
//                 />
//             </div>

//         };

//         this.handleDate1 = (value) => {
//             this.setState({ svalue: value });
//         };

//         this.handleDate2 = (value) => {
//             this.setState({ evalue: value });
//         };
//     }
// }

// export default CompareNumbers;