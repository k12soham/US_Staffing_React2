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

import NavBarHeader from './NavbarHeader';
import EmployeeHeader from './EmployeeHeader';
import { List } from 'reactstrap';
import { Table,Button } from "reactstrap";
import { json } from 'react-router-dom';
import AdminHeader from './AdminHeader';


class AdminStatic extends React.Component {

    abc()
    {
        axios.get(`${base_url}/getAllDuration`)
        .then(json => 
            this.setState({duration_fd:json.data,  
               })
        
             
         
          )
        .catch(error => {
       // alert("Error duration")
        })
    }
    componentDidMount() {
    //   this.refInput.focus();
    
    axios.get(`${base_url}/getAllDuration`)
    .then(json => 
        this.setState({duration_fd:json.data,  
             editstatus: false,
            editrowKey: null })
    
         
     
      )
    .catch(error => {
   // alert("Error duration")
    })

   axios.get(`${base_url}/getAllPositionType`)
    .then(json => 
        this.setState({positionType_fd:json.data })
      )
    .catch(error => {
  //  alert("Error position")
    })


    axios.get(`${base_url}/getAllRequisitorFd`)
    .then(json => 
        this.setState({requisitor_fd:json.data })
      )
    .catch(error => {
   // alert("Error requisitor")
    })

    axios.get(`${base_url}/getAllStatusFd`)
    .then(json => 
        this.setState({status_fd:json.data })
      )
    .catch(error => {
   // alert("Error status")
    })

    

    axios.get(`${base_url}/getAllClient`)
    .then(json => 
        this.setState({client_fd:json.data })
      )
    .catch(error => {
   // alert("Error client")
    })

    axios.get(`${base_url}/getAllRateTerm`)
    .then(json => 
        this.setState({rateTerm_fd:json.data })
      )
    .catch(error => {
    //alert("Error rate term")
    })

    axios.get(`${base_url}/getAllVisaType`)
    .then(json => 
        this.setState({visaType_fd:json.data })
      )
    .catch(error => {
    //alert("Error visa")
    })


    }

    getallduration()
    {
        alert("ss")
        axios.get(`${base_url}/getAllDuration`)
        .then(json => 
            this.setState({duration_fd:json.data })
          )
          this.onCancel1()
        
    }

    constructor(props) {
        super(props);

        this.state = {
            input: {},
            errors: {},
            empID: '',  
           
            duration_fd:[],
            positionType_fd:[],
            requisitor_fd:[],
            status_fd:[],
            client_fd:[],
            rateTerm_fd:[],
            visaType_fd:[],

            req:"",
            client:"",
            status:"",
            position:"",
            duration:"",
            visatype:"",
            rateterm:"",

            req1:"",
            st1:"",
            duration1:"",
            client1:"",
            position1:"",
            visatype1:"",
            rateterm1:"",
            
            

            editstatus: true,
            editrowKey: null,
            editstatus2: true,
            editrowKey2: null,
            editstatus3: true,
            editrowKey3: null,
            editstatus4: true,
            editrowKey4: null,
            editstatus5: true,
            editrowKey5: null,
            editstatus6: true,
            editrowKey6: null,
            editstatus7: true,
            editrowKey7: null,


           
            isShown:true





        };

        this.handleChange1 = this.handleChange1.bind(this);
        this.handleSubmit1 = this.handleSubmit1.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
        this.handleSubmit2 = this.handleSubmit2.bind(this);
        this.handleChange3 = this.handleChange3.bind(this);
        this.handleSubmit3 = this.handleSubmit3.bind(this);
        this.handleChange4 = this.handleChange4.bind(this);
        this.handleSubmit4 = this.handleSubmit4.bind(this);
        this.handleChange5 = this.handleChange5.bind(this);
        this.handleSubmit5 = this.handleSubmit5.bind(this);
        this.handleChange6 = this.handleChange6.bind(this);
        this.handleSubmit6 = this.handleSubmit6.bind(this);
        this.handleChange7 = this.handleChange7.bind(this);
        this.handleSubmit7 = this.handleSubmit7.bind(this);


        this.handleupdate1 = this.handleupdate1.bind(this);
        this.handleupdate2 = this.handleupdate2.bind(this);
        this.handleupdate3 = this.handleupdate3.bind(this);
        this.handleupdate4 = this.handleupdate4.bind(this);
       this.handleupdate5 = this.handleupdate5.bind(this);
        this.handleupdate6 = this.handleupdate6.bind(this);
       this.handleupdate7 = this.handleupdate7.bind(this);
    }





////////////// Edit Requisition

     onEdit1 = ({ reqid, currentreq }) => {
       
        console.log("Aaa")
        console.log(reqid)
        console.log(currentreq)
       this.setState({
        editstatus: true,
            editrowKey: reqid
     })
        this.setState({req1:currentreq})
        
       
    }

    updateInventory1 = ({ reqid, newReq }) => {
       
        let rr = parseInt(reqid );
        axios.put(`${base_url}/UpdateRequisitorFd?requisitor_id=${rr}&requisitor_fd=${newReq}`, {

           
        }).then(response => {
            this.onCancel1();
            this.componentDidMount();
           
            toast.success("Record updated successfully!", {
                position: "top-right",
                autoClose: 1000,
                style: { position: "absolute", top: "5px", width: "300px" }
            });
        })
    

    }


     onSave1 = ({ reqid, newReq}) => {

        this.updateInventory1({ reqid, newReq });
    }

     onCancel1 = () => {
        // reset the inEditMode state value
        this.setState({
            editstatus: false,
            editrowKey: null
        })
    }
    handleupdate1(e) {
        let a= e.target.value;
         this.setState({
             req1:a
          } );
     }
     delete1(e)
     {
   
       let rr = parseInt(e);
       axios.delete(`${base_url}/DeleteRequisitorFd?requisitor_id=${rr}`, {
   
           
       }).then(response => {
        this.onCancel1();
        this.componentDidMount();
         // window.location.reload()
           toast.success("Record deleted successfully!", {
               position: "top-right",
               autoClose: 1000,
               style: { position: "absolute", top: "5px", width: "300px" }
           });
       })
    }
////////////// Edit status

onEdit2 = ({ stid, currentst }) => {
       
       this.setState({
        editstatus2: true,
            editrowKey2: stid
     })
        this.setState({st1:currentst})
        
       
    }

    updateInventory2 = ({ stid, newst }) => {
     
        let rr = parseInt(stid );
        axios.put(`${base_url}/UpdateStatusFd?status_fd_id=${rr}&status_fd=${newst}`, {

           
        }).then(response => {
          
            this.onCancel2();
            this.componentDidMount();
            toast.success("Record updated successfully!", {
                position: "top-right",
                autoClose: 1000,
                style: { position: "absolute", top: "5px", width: "300px" }
            });
        })
    

    }


     onSave2 = ({ stid, newst}) => {
        console.log("sss");

        this.updateInventory2({ stid, newst });
    }

    onCancel2 = () => {
        // reset the inEditMode state value
        this.setState({
            editstatus2: false,
            editrowKey2: null
        })
    }
   
    handleupdate2(e) {
        let a= e.target.value;
         this.setState({
             st1:a
          } );
     }
 
     delete2(e)
     {
   
       let rr = parseInt(e);
       axios.delete(`${base_url}/DeleteStatusFd?status_fd_id=${rr}`, {
   
           
       }).then(response => {
        this.onCancel2();
        this.componentDidMount();
         // window.location.reload()
           toast.success("Record deleted successfully!", {
               position: "top-right",
               autoClose: 1000,
               style: { position: "absolute", top: "5px", width: "300px" }
           });
       })
   
   
   
     }

////////////// Edit Duration


onEdit3 = ({ durationid, currentduration }) => {
    this.setState({
     editstatus3: true,
         editrowKey3: durationid
  })
     this.setState({duration1:currentduration})
     
    
 }

 updateInventory3 = ({ durationid, newduration }) => {

     let rr = parseInt(durationid );
     axios.put(`${base_url}/UpdateDuration?duration_id=${rr}&duration=${newduration}`, {

        
     }).then(response => {
      
        this.onCancel3();
        this.componentDidMount();
      
         toast.success("Record updated successfully!", {
             position: "top-right",
             autoClose: 1000,
             style: { position: "absolute", top: "5px", width: "300px" }
         });
     })
 

 }


  onSave3 = ({ durationid, newduration}) => {
     console.log("sss");

     this.updateInventory3({ durationid, newduration });
 }

 onCancel3 = () => {
     // reset the inEditMode state value
     this.setState({
         editstatus3: false,
         editrowKey3: null
     })
 }

 handleupdate3(e) {
     let a= e.target.value;
      this.setState({
          duration1:a
       } );
  }


  delete3(e)
  {

    let rr = parseInt(e);
    axios.delete(`${base_url}/DeleteDuration?duration_id=${rr}`, {

        
    }).then(response => {
        this.onCancel3();
        this.componentDidMount();
      // window.location.reload()
        toast.success("Record deleted successfully!", {
            position: "top-right",
            autoClose: 1000,
            style: { position: "absolute", top: "5px", width: "300px" }
        });
    })



  }

////////////// Edit Client


onEdit4 = ({ clientid, currentclient }) => {
       
    this.setState({
     editstatus4: true,
         editrowKey4: clientid
  })
     this.setState({client1:currentclient})
     
    
 }

 updateInventory4 = ({ clientid, newclient }) => {
  
     let rr = parseInt(clientid );
     axios.put(`${base_url}/UpdateClient?client_id=${rr}&client_name=${newclient}`, {

        
     }).then(response => {
        this.onCancel4();
        this.componentDidMount();
       // window.location.reload()
         toast.success("Record updated successfully!", {
             position: "top-right",
             autoClose: 1000,
             style: { position: "absolute", top: "5px", width: "300px" }
         });
     })
 

 }


  onSave4 = ({ clientid, newclient}) => {
     console.log("sss");

     this.updateInventory4({ clientid, newclient });
 }

 onCancel4 = () => {
     // reset the inEditMode state value
     this.setState({
         editstatus4: false,
         editrowKey4: null
     })
 }

 handleupdate4(e) {
     let a= e.target.value;
      this.setState({
          client1:a
       } );
  }

  delete4(e)
  {

    let rr = parseInt(e);
    axios.delete(`${base_url}/DeleteClient?client_id=${rr}`, {

        
    }).then(response => {
        this.onCancel4();
        this.componentDidMount();
      // window.location.reload()
        toast.success("Record deleted successfully!", {
            position: "top-right",
            autoClose: 1000,
            style: { position: "absolute", top: "5px", width: "300px" }
        });
    })
 }

////////////// Edit position


onEdit5 = ({ positionid, currentposition }) => {
       
    this.setState({
     editstatus5: true,
         editrowKey5: positionid
  })
     this.setState({position1:currentposition})
     
    
 }

 updateInventory5 = ({ positionid, newposition }) => {
  
     let rr = parseInt(positionid );
     axios.put(`${base_url}/UpdatePositionType?position_type_id=${rr}&position_type=${newposition}`, {

        
     }).then(response => {
        this.onCancel5();
        this.componentDidMount();
       // window.location.reload()
         toast.success("Record updated successfully!", {
             position: "top-right",
             autoClose: 1000,
             style: { position: "absolute", top: "5px", width: "300px" }
         });
     })
 

 }


  onSave5 = ({ positionid, newposition}) => {
     console.log("sss");

     this.updateInventory5({ positionid, newposition });
 }

 onCancel5 = () => {
     // reset the inEditMode state value
     this.setState({
         editstatus5: false,
         editrowKey5: null
     })
 }

 handleupdate5(e) {
     let a= e.target.value;
      this.setState({
          position1:a
       } );
  }

  delete5(e)
  {

    let rr = parseInt(e);
    axios.delete(`${base_url}/DeletePositionType?position_type_id=${rr}`, {

        
    }).then(response => {
        this.onCancel5();
        this.componentDidMount();
      // window.location.reload()
        toast.success("Record deleted successfully!", {
            position: "top-right",
            autoClose: 1000,
            style: { position: "absolute", top: "5px", width: "300px" }
        });
    })
 }
  ////////////// Edit visa type


onEdit6 = ({ visatypeid, currentvisatype }) => {
       
    this.setState({
     editstatus6: true,
         editrowKey6: visatypeid
  })
     this.setState({visatype1:currentvisatype})
     
    
 }

 updateInventory6 = ({ visatypeid, newvisatype }) => {
  
     let rr = parseInt(visatypeid );
     axios.put(`${base_url}/UpdateVisaType?visa_type_id=${rr}&visa_type=${newvisatype}`, {

        
     }).then(response => {
        this.onCancel6();
        this.componentDidMount();
       // window.location.reload()
         toast.success("Record updated successfully!", {
             position: "top-right",
             autoClose: 1000,
             style: { position: "absolute", top: "5px", width: "300px" }
         });
     })
 

 }


  onSave6 = ({ visatypeid, newvisatype}) => {
     console.log("sss");

     this.updateInventory6({ visatypeid, newvisatype });
 }

 onCancel6 = () => {
     // reset the inEditMode state value
     this.setState({
         editstatus6: false,
         editrowKey6: null
     })
 }

 handleupdate6(e) {
     let a= e.target.value;
      this.setState({
          visatype1:a
       } );
  }

  delete6(e)
  {

    let rr = parseInt(e);
    axios.delete(`${base_url}/DeleteVisaType?visa_type_id=${rr}`, {

        
    }).then(response => {
        this.onCancel6();
        this.componentDidMount();
      // window.location.reload()
        toast.success("Record deleted successfully!", {
            position: "top-right",
            autoClose: 1000,
            style: { position: "absolute", top: "5px", width: "300px" }
        });
    })
 }

  ////////////// Edit rate term


onEdit7 = ({ ratetermid, currentrateterm }) => {
       
    this.setState({
     editstatus7: true,
         editrowKey7: ratetermid
  })
     this.setState({rateterm1:currentrateterm})
     
    
 }

 updateInventory7 = ({ ratetermid, newrateterm }) => {
  
     let rr = parseInt(ratetermid );
     axios.put(`${base_url}/UpdateRateTerm?rate_term_id=${rr}&rate_term=${newrateterm}`, {

        
     }).then(response => {
        this.onCancel7();
        this.componentDidMount();
       // window.location.reload()
         toast.success("Record updated successfully!", {
             position: "top-right",
             autoClose: 1000,
             style: { position: "absolute", top: "5px", width: "300px" }
         });
     })
 

 }


  onSave7 = ({ ratetermid, newrateterm}) => {
    
     this.updateInventory7({ ratetermid, newrateterm });
 }

 onCancel7 = () => {
     // reset the inEditMode state value
     this.setState({
         editstatus7: false,
         editrowKey7: null
     })
 }

 handleupdate7(e) {
     let a= e.target.value;
      this.setState({
          rateterm1:a
       } );
  }
  delete7(e)
  {

    let rr = parseInt(e);
    axios.delete(`${base_url}/DeleteRateTerm?rate_term_id=${rr}`, {

        
    }).then(response => {
        this.onCancel7();
        this.componentDidMount();
 
        toast.success("Record deleted successfully!", {
            position: "top-right",
            autoClose: 1000,
            style: { position: "absolute", top: "5px", width: "300px" }
        });
    })
 }


/////////////////////

/*validate() {

    let reqval = this.state.req;
    let clientval =this.state.client;
    let statusval=this.state.status;
    let positionval=this.state.position
    // let durationval=this.state.duration
    // let visatypeval=this.state.visatype
    // let ratetermval=this.state.rateterm


    let errors = {};
    let isValid = true;


    if ((!reqval)) {
        isValid = false;
        errors["req"] = "This field is required";
    }


    if (reqval != undefined) {
        var pattern = new RegExp(/^[^\s][a-zA-Z\s]+[^\s]$/);
        if (!pattern.test(reqval)) {
            isValid = false;
            errors["req"] = "Please enter only characters.";
        }

     }

     if ((!clientval)) {
        isValid = false;
        errors["client"] = "This field is required";
    }


    if (clientval != undefined) {
        var pattern = new RegExp(/^[^\s][a-zA-Z\s]+[^\s]$/);
        if (!pattern.test(clientval)) {
            isValid = false;
            errors["client"] = "Please enter only characters.";
        }

     }
   
     if ((!statusval)) {
        isValid = false;
        errors["status"] = "This field is required";
    }


    if (statusval != undefined) {
        var pattern = new RegExp(/^[^\s][a-zA-Z\s]+[^\s]$/);
        if (!pattern.test(statusval)) {
            isValid = false;
            errors["status"] = "Please enter only characters.";
        }

     }

     if ((!positionval)) {
        isValid = false;
        errors["position"] = "This field is required";
    }


    if (positionval != undefined) {
        var pattern = new RegExp(/^[^\s][a-zA-Z\s]+[^\s]$/);
        if (!pattern.test(positionval)) {
            isValid = false;
            errors["position"] = "Please enter only characters.";
        }

     }
   


    this.setState({
      
        errors: errors
    });
    return isValid;
}
*/
    handleChange1(e) {
       let a= e.target.value;
        this.setState({
            req:a
         } );
    }

    handleSubmit1(e) {
        e.preventDefault();

        // if (this.validate()) {

           
        // }
        
        let a = this.state.req;
        this.postdata1(a)
      
    }

postdata1(d)
{
    axios.post(`${base_url}/AddRequisitorFd?requisitor_fd=${d}`).then(

        (response) => {
            this.componentDidMount()
            this.setState({req:''})
            toast.success("Requisitor added successfully!", {
                position: "top-right",
                autoClose: 1000,
                style: { position: "absolute", top: "5px", width: "300px" }
            });
        
        },
        (error) => {
            console.log(error);
            console.log("Error");
            alert("Please enter valid details.")
        }
    );
}

handleChange2(e) {
    let a= e.target.value;
     this.setState({
         client:a
      } );
 }

 handleSubmit2(e) {
     e.preventDefault();
     
     let a = this.state.client;
     this.postdata2(a)
 }

postdata2(d)
{
 axios.post(`${base_url}/AddClient?client_name=${d}`).then(

     (response) => {
        this.componentDidMount()
        this.setState({client:''})
         toast.success("Client added successfully!",
             { position: "top-right", autoClose: 1000,
             style: { position: "absolute", top: "5px", width: "300px" }}
         );
     },
     (error) => {
         console.log(error);
         console.log("Error");
         alert("Please enter valid details.")
     }
 );
}

handleChange3(e) {
    let a= e.target.value;
     this.setState({
         status:a
      } );
 }

 handleSubmit3(e) {
     e.preventDefault();
     
     let a = this.state.status;
     this.postdata3(a)
 }

postdata3(d)
{
    console.log(d)
 axios.post(`${base_url}/AddStatusFd?status_fd=${d}`).then(

     (response) => {
        this.componentDidMount()
        this.setState({status:''})
         toast.success("Status added successfully!",
             { position: "top-right", autoClose: 1000,
             style: { position: "absolute", top: "5px", width: "300px" }}
         );
     },
     (error) => {
         console.log(error);
         console.log("Error");
         alert("Please enter valid details.")
     }
 );
}

handleChange4(e) {
    let a= e.target.value;
     this.setState({
         position:a
      } );
 }

 handleSubmit4(e) {
     e.preventDefault();
     
     let a = this.state.position;
     this.postdata4(a)
 }

postdata4(d)
{
 axios.post(`${base_url}/AddPositionType?position_type=${d}`).then(

     (response) => {
        this.componentDidMount()
        this.setState({position:''})
         toast.success("Position added successfully!",
             { position: "top-right", autoClose: 1000,
             style: { position: "absolute", top: "5px", width: "300px" }}
         );
     },
     (error) => {
         alert("Please enter valid details.")
     }
 );
}

handleChange5(e) {
    let a= e.target.value;
     this.setState({
         duration:a
      } );
 }

 handleSubmit5(e) {
     e.preventDefault();
     
     let a = this.state.duration;
     this.postdata5(a)
 }

postdata5(d)
{
 axios.post(`${base_url}/AddDuration?duration=${d}`).then(

     (response) => {
        this.componentDidMount()
        this.setState({duration:''})
         toast.success("Duration added successfully!",
             { position: "top-right", autoClose: 1000,
             style: { position: "absolute", top: "5px", width: "300px" }}
         );
     },
     (error) => {
         console.log(error);
         console.log("Error");
         alert("Please enter valid details.")
     }
 );
}

handleChange6(e) {
    let a= e.target.value;
     this.setState({
         visatype:a
      } );
 }

 handleSubmit6(e) {
     e.preventDefault();
     
     let a = this.state.visatype;
     this.postdata6(a)
 }

postdata6(d)
{
 axios.post(`${base_url}/AddVisaType?visa_type=${d}`).then(

     (response) => {
        this.componentDidMount()
        this.setState({visatype:''})
         toast.success("Visa Type added successfully!",
             { position: "top-right", autoClose: 1000,
             style: { position: "absolute", top: "5px", width: "300px" }}
         );
     },
     (error) => {
         console.log(error);
         console.log("Error");
         alert("Please enter valid details.")
     }
 );
}


handleChange7(e) {
    let a= e.target.value;
     this.setState({
         rateterm:a
      } );
 }

 handleSubmit7(e) {
     e.preventDefault();
     
     let a = this.state.rateterm;
     this.postdata7(a)
 }

postdata7(d)
{
 axios.post(`${base_url}/AddRateTerm?rate_term=${d}`).then(

     (response) => {
        this.componentDidMount()
        this.setState({rateterm:''})
         toast.success("Rate Term added successfully!",
             { position: "top-right", autoClose: 1000,
             style: { position: "absolute", top: "5px", width: "300px" }}
         );
     },
     (error) => {
         console.log(error);
         console.log("Error");
         alert("Please enter valid details.")
     }
 );
}

/////////////// 
reqlist()
{
    
    return(
     
        
     <List className='sc' ref={(input1) => { this.refInput = input1; }}> 
                                                {
                                             this.state.requisitor_fd.map((rq) => (

                                            
                                                     <tbody  >
                                           

                                               <td>
                        {
                           this.state.editstatus&&  this.state.editrowKey === rq.requisitor_id ? ( 
                                    <input required value={this.state.req1}
                                    onChange={this.handleupdate1}
                                    style={{ width: "100px" }}
                                   
                                />
                            ) : (
                               rq.requisitor_fd
                            )
                        }
                    </td>
                    <td>
                        {
                            this.state.editstatus && this.state.editrowKey === rq.requisitor_id ? (
                                <>
                                    <button

                                        className={"btn btn-sm btn-outline-success"}
                                        onClick={() => {

                                            this.onSave1(
                                                {
                                                    reqid: rq.requisitor_id, newReq: this.state.req1,
                                                })
                                        }
                                        }
                                    >
                                        <i class="fa fa-save"></i>

                                    </button>

                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <button
                                        className={"btn btn-sm btn-outline-warning"}

                                        onClick={() => this.onCancel1()}
                                    >
                                        <i class="fa fa-close"></i>
                                    </button>
                                </>

                            ) : (
                                <>
                                    <button
                                        className="btn btn-sm btn-outline-success"

                                        onClick={() => this.onEdit1({
                                            reqid: rq.requisitor_id, currentreq: rq.requisitor_fd
                                        })}
                                    >
                                      <i class="fas fa-edit"></i>
                                      

                                    </button>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <button className="btn btn-sm btn-outline-danger"
                                        onClick={() => { if (window.confirm('Are you sure to delete?')) this.delete1(rq.requisitor_id) }}><i class="fa fa-trash"></i></button>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                </>

                            )
                        }

                    </td>

                                               </tbody>
                                            
                                              
                                               ))   
                                             }    
                                            </List>
    )
}


statuslist()
{
    
    return(
     
        
     <List className='sc' ref={(input2) => { this.refInput = input2; }}> 
                                                {
                                             this.state.status_fd.map((st) => (

                                            
                                                     <tbody  >
                                           

                                               <td>
                        {
                           this.state.editstatus2&&  this.state.editrowKey2 === st.status_fd_id ? ( 
                                    <input required value={this.state.st1}
                                    onChange={this.handleupdate2}
                                    style={{ width: "100px" }}
                                   
                                />
                            ) : (
                              st.status_fd
                            )
                        }
                    </td>
                    <td>
                        {
                            this.state.editstatus2 && this.state.editrowKey2 === st.status_fd_id ? (
                                <>
                                    <button

                                        className={"btn btn-sm btn-outline-success"}
                                        onClick={() => {

                                            this.onSave2(
                                                {
                                                    stid:st.status_fd_id, newst: this.state.st1,
                                                })
                                        }
                                        }
                                    >
                                        <i class="fa fa-save"></i>

                                    </button>

                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <button
                                        className={"btn btn-sm btn-outline-warning"}

                                        onClick={() => this.onCancel2()}
                                    >
                                        <i class="fa fa-close"></i>
                                    </button>
                                </>

                            ) : (
                                <>
                                    <button
                                        className="btn btn-sm btn-outline-success"

                                        onClick={() => this.onEdit2({
                                            stid: st.status_fd_id, currentst: st.status_fd
                                        })}
                                    >
                                        <i class="fa fa-edit"></i>

                                    </button>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <button className="btn btn-sm btn-outline-danger"
                                        onClick={() => { if (window.confirm('Are you sure to delete?')) this.delete2(st.status_fd_id) }}><i class="fa fa-trash"></i></button>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                </>

                            )
                        }

                    </td>



                                               </tbody>
                                            
                                              
                                               ))   
                                             }    
                                            </List>
    )
}

durationlist()
{
    
    return(
     
        
     <List className='sc' ref={(input3) => { this.refInput = input3; }}> 
                                                {
                                             this.state.duration_fd.map((dr) => (

                                            
                                                     <tbody  >
                                           

                                               <td>
                        {
                           this.state.editstatus3&&  this.state.editrowKey3 === dr.duration_id ? ( 
                                    <input required value={this.state.duration1}
                                    onChange={this.handleupdate3}
                                    style={{ width: "100px" }}
                                   
                                />
                            ) : (
                              dr.duration
                            )
                        }
                    </td>
                    <td>
                        {
                            this.state.editstatus3 && this.state.editrowKey3 === dr.duration_id ? (
                                <>
                                    <button

                                        className={"btn btn-sm btn-outline-success"}
                                        onClick={() => {

                                            this.onSave3(
                                                {
                                                    durationid:dr.duration_id, newduration: this.state.duration1,
                                                })
                                        }
                                        }
                                    >
                                        <i class="fa fa-save"></i>

                                    </button>

                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <button
                                        className={"btn btn-sm btn-outline-warning"}

                                        onClick={() => this.onCancel3()}
                                    >
                                        <i class="fa fa-close"></i>
                                    </button>
                                </>

                            ) : (
                                <>
                                    <button
                                        className="btn btn-sm btn-outline-success"

                                        onClick={() => this.onEdit3({
                                            durationid: dr.duration_id, currentduration: dr.duration
                                        })}
                                    >
                                        <i class="fa fa-edit"></i>

                                    </button>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <button className="btn btn-sm btn-outline-danger"
                                        onClick={() => { if (window.confirm('Are you sure to delete?')) this.delete3(dr.duration_id) }}><i class="fa fa-trash"></i></button>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                </>

                            )
                        }

                    </td>



                                               </tbody>
                                            
                                              
                                               ))   
                                             }    
                                            </List>
    )
}

clientlist()
{
    
    return(
     
        
     <List className='sc' ref={(input4) => { this.refInput = input4; }}> 
                                                {
                                             this.state.client_fd.map((cl) => (

                                            
                                                     <tbody  >
                                           

                                               <td>
                        {
                           this.state.editstatus4&&  this.state.editrowKey4 === cl.client_id ? ( 
                                    <input required value={this.state.client1}
                                    onChange={this.handleupdate4}
                                    style={{ width: "100px" }}
                                   
                                />
                            ) : (
                               cl.client_name
                            )
                        }
                    </td>
                    <td>
                        {
                            this.state.editstatus4 && this.state.editrowKey4 === cl.client_id ? (
                                <>
                                    <button

                                        className={"btn btn-sm btn-outline-success"}
                                        onClick={() => {

                                            this.onSave4(
                                                {
                                                    clientid:cl.client_id, newclient: this.state.client1,
                                                })
                                        }
                                        }
                                    >
                                        <i class="fa fa-save"></i>

                                    </button>

                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <button
                                        className={"btn btn-sm btn-outline-warning"}

                                        onClick={() => this.onCancel4()}
                                    >
                                        <i class="fa fa-close"></i>
                                    </button>
                                </>

                            ) : (
                                <>
                                    <button
                                        className="btn btn-sm btn-outline-success"

                                        onClick={() => this.onEdit4({
                                            clientid: cl.client_id, currentclient: cl.client_name
                                        })}
                                    >
                                        <i class="fa fa-edit"></i>

                                    </button>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <button className="btn btn-sm btn-outline-danger"
                                        onClick={() => { if (window.confirm('Are you sure to delete?')) this.delete4(cl.client_id) }}><i class="fa fa-trash"></i></button>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                </>

                            )
                        }

                    </td>

                                               </tbody>
                                            
                                              
                                               ))   
                                             }    
                                            </List>
    )
}

positionlist()
{
    
    return(
     
        
     <List className='sc' ref={(input5) => { this.refInput = input5; }}> 
                                                {
                                             this.state.positionType_fd.map((pt) => (

                                            
                                                     <tbody  >
                                           

                                               <td>
                        {
                           this.state.editstatus5&&  this.state.editrowKey5 === pt.position_type_id ? ( 
                                    <input required value={this.state.position1}
                                    onChange={this.handleupdate5}
                                    style={{ width: "100px" }}
                                   
                                />
                            ) : (
                                pt.position_type
                            )
                        }
                    </td>
                    <td>
                        {
                            this.state.editstatus5 && this.state.editrowKey5 === pt.position_type_id ? (
                                <>
                                    <button

                                        className={"btn btn-sm btn-outline-success"}
                                        onClick={() => {

                                            this.onSave5(
                                                {
                                                   positionid:pt.position_type_id, newposition: this.state.position1,
                                                })
                                        }
                                        }
                                    >
                                        <i class="fa fa-save"></i>

                                    </button>

                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <button
                                        className={"btn btn-sm btn-outline-warning"}

                                        onClick={() => this.onCancel5()}
                                    >
                                        <i class="fa fa-close"></i>
                                    </button>
                                </>

                            ) : (
                                <>
                                    <button
                                        className="btn btn-sm btn-outline-success"

                                        onClick={() => this.onEdit5({
                                            positionid: pt.position_type_id, currentposition: pt.position_type
                                        })}
                                    >
                                        <i class="fa fa-edit"></i>

                                    </button>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <button className="btn btn-sm btn-outline-danger"
                                        onClick={() => { if (window.confirm('Are you sure to delete?')) this.delete5(pt.position_type_id) }}><i class="fa fa-trash"></i></button>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                </>

                            )
                        }

                    </td>

                                               </tbody>
                                            
                                              
                                               ))   
                                             }    
                                            </List>
    )
}



visalist()
{
    
    return(
     
        
     <List className='sc' ref={(input6) => { this.refInput = input6; }}> 
                                                {
                                             this.state.visaType_fd.map((vt) => (

                                            
                                                     <tbody  >
                                           

                                               <td>
                        {
                           this.state.editstatus6&&  this.state.editrowKey6 === vt.visa_type_id ? ( 
                                    <input required value={this.state.visatype1}
                                    onChange={this.handleupdate6}
                                    style={{ width: "100px" }}
                                   
                                />
                            ) : (
                                vt.visa_type
                            )
                        }
                    </td>
                    <td>
                        {
                            this.state.editstatus6 && this.state.editrowKey6 === vt.visa_type_id ? (
                                <>
                                    <button

                                        className={"btn btn-sm btn-outline-success"}
                                        onClick={() => {

                                            this.onSave6(
                                                {
                                                   visatypeid:vt.visa_type_id, newvisatype: this.state.visatype1,
                                                })
                                        }
                                        }
                                    >
                                        <i class="fa fa-save"></i>

                                    </button>

                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <button
                                        className={"btn btn-sm btn-outline-warning"}

                                        onClick={() => this.onCancel6()}
                                    >
                                        <i class="fa fa-close"></i>
                                    </button>
                                </>

                            ) : (
                                <>
                                    <button
                                        className="btn btn-sm btn-outline-success"

                                        onClick={() => this.onEdit6({
                                            visatypeid: vt.visa_type_id, currentvisatype: vt.visa_type
                                        })}
                                    >
                                        <i class="fa fa-edit"></i>

                                    </button>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <button className="btn btn-sm btn-outline-danger"
                                        onClick={() => { if (window.confirm('Are you sure to delete?')) this.delete6(vt.visa_type_id) }}><i class="fa fa-trash"></i></button>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                </>

                            )
                        }

                    </td>

                                               </tbody>
                                            
                                              
                                               ))   
                                             }    
                                            </List>
    )
}


//// edit rate term
ratelist()
{
    
    return(
     
        
     <List className='sc' ref={(input7) => { this.refInput = input7; }}> 
                                                {
                                             this.state.rateTerm_fd.map((rt) => (

                                            
                                                     <tbody  >
                                           

                                               <td>
                        {
                           this.state.editstatus7&&  this.state.editrowKey7 === rt.rate_term_id ? ( 
                                    <input required value={this.state.rateterm1}
                                    onChange={this.handleupdate7}
                                    style={{ width: "100px" }}
                                   
                                />
                            ) : (
                              rt.rate_term
                            )
                        }
                    </td>
                    <td>
                        {
                            this.state.editstatus7 && this.state.editrowKey7 === rt.rate_term_id ? (
                                <>
                                    <button

                                        className={"btn btn-sm btn-outline-success"}
                                        onClick={() => {

                                            this.onSave7(
                                                {
                                                    ratetermid:rt.rate_term_id, newrateterm: this.state.rateterm1,
                                                })
                                        }
                                        }
                                    >
                                        <i class="fa fa-save"></i>

                                    </button>

                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <button
                                        className={"btn btn-sm btn-outline-warning"}

                                        onClick={() => this.onCancel7()}
                                    >
                                        <i class="fa fa-close"></i>
                                    </button>
                                </>

                            ) : (
                                <>
                                    <button
                                        className="btn btn-sm btn-outline-success"

                                        onClick={() => this.onEdit7({
                                            ratetermid:rt.rate_term_id, currentrateterm: rt.rate_term
                                        })}
                                    >
                                        <i class="fa fa-edit"></i>

                                    </button>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <button className="btn btn-sm btn-outline-danger"
                                        onClick={() => { if (window.confirm('Are you sure to delete?')) this.delete7(rt.rate_term_id) }}><i class="fa fa-trash"></i></button>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                </>

                            )
                        }

                    </td>



                                               </tbody>
                                            
                                              
                                               ))   
                                             }    
                                            </List>
    )
}
//  Boxshow()
// {
  
//     console.log("abcd")
//     //this.setState({isShown:true})

// }
//  Box()
// {

//         return(
//             <div>
//                 {
//                     alert(this.isShown)
//                 }
            
//      <form onSubmit={this.handleSubmit1}>
//                                             <label>Add new requisitor</label><br></br>
//                                                <input type="text"   value={this.state.req} onChange={this.handleChange1}></input>
//                                                 <button >Save</button>
//                                             <div className="text-danger">{this.state.errors.req}</div>
//                                             </form><br></br><br></br>
//                                             {
//                                             this.setState({isShown:false})
//                                             } 
                                         
//                                             </div> 
                                         
                                    
//         )
       
// }


    

    render() {
        const isAuthenticated = localStorage.getItem('recruiterIDAdmin');
    
        return isAuthenticated ? (
      
            <div className="container-fluid">
                <div className="row">

                    <div className="col-12 h-100 master_backgroung_heder">
                        <AdminHeader/>
                    </div>
                  
                    <div className="col-12 master_backgroung_work scroll-bar">

                        <div className="row">
                    

                                <div className="col-12">
                                    <div className="row" style={{ paddingTop: '2%'}}>
                                       
                                     <div className="col-3" >
                                    
                                      
                                            <label for="req"><b>Requisitiors name:</b></label><br />


                                            <Table >
                                               
                                                <tbody>
                                                    <td>{this.reqlist()}</td>
                                                   
                                                </tbody>
                                               
                                            </Table>
                                             {/* <form onSubmit={this.Boxshow()}> */}
                                              {/* <button  onClick={this.Boxshow()}>Add new requisitor</button>  */}
                                            
                                            {/* </form> */}
                                            
                                                
                                                {/* {this.state.isShown=='true' && <this.Box/> } */}
                                                    
                                               
                                                
                                         
                                            
                                         <form onSubmit={this.handleSubmit1}>
                                            <label>Add new requisitor</label><br></br>
                                               <input type="text"  name="req" style={{height:23}}
                                               value={this.state.req} onChange={this.handleChange1}></input>
                                               <button class= "btn btn-sm  btn-success"> <i class=" fa fa-save"></i>&nbsp;Add</button>
                                            <div className="text-danger">{this.state.errors.req}</div>
                                            </form><br></br><br></br> 
         
                                            
                                           <div class="form-group">
                                                <label ><b>Client name:</b></label><br/>
                                                <Table>
                                               
                                               <tbody>
                                                   <td>{this.clientlist()}</td>
                                               </tbody>
                                           </Table>
                                            <form onSubmit={this.handleSubmit2}>
                                            <label>Add new client</label><br></br>
                                               <input type="text"  name="client"  style={{height:23}} value={this.state.client} onChange={this.handleChange2}></input>
                                               <button class= "btn btn-sm  btn-success"> <i class=" fa fa-save"></i>&nbsp;Add</button>
                                            <div className="text-danger">{this.state.errors.client}</div>
                                            </form>
                                            </div>
                                           </div>
                                              

                                           <div className="col-3">

                                            <label for="status"><b>Status:</b></label><br />

                                            <Table>
                                               
                                                <tbody>
                                                    <td>{this.statuslist()}</td>
                                                </tbody>
                                            </Table>
                                            <form onSubmit={this.handleSubmit3}>
                                            <label>Add new status</label><br></br>
                                               <input type="text"  name="status"  style={{height:23}} value={this.state.status} onChange={this.handleChange3}></input>
                                               <button class= "btn btn-sm  btn-success"> <i class=" fa fa-save"></i>&nbsp;Add</button>
                                            <div className="text-danger">{this.state.errors.status}</div>
                                            </form><br></br><br></br>

                                            
                                           <div class="form-group">
                                                <label ><b>Position type:</b></label><br/>
                                                <Table>
                                               
                                               <tbody>
                                                   <td>{this.positionlist()}</td>
                                               </tbody>
                                           </Table>
                                            <form onSubmit={this.handleSubmit4}>
                                            <label>Add new position</label><br></br>
                                               <input type="text"  name="position"  style={{height:23}} value={this.state.position} onChange={this.handleChange4}></input>
                                               <button class= "btn btn-sm  btn-success"> <i class=" fa fa-save"></i>&nbsp;Add</button>
                                            <div className="text-danger">{this.state.errors.position}</div>
                                            </form>
                                            </div>
                                           </div>


                                             <div className="col-3">

                                            <label for="duration"><b>Duration:</b></label><br />

                                            <Table>
                                               
                                               <tbody>
                                                   <td>{this.durationlist()}</td>
                                               </tbody>
                                           </Table>
                                            <form onSubmit={this.handleSubmit5}>
                                            <label>Add new duration</label><br></br>
                                               <input type="text"  name="duration"  style={{height:23}} value={this.state.duration} onChange={this.handleChange5}></input>
                                               <button class= "btn btn-sm  btn-success"> <i class=" fa fa-save"></i>&nbsp;Add</button>
                                            <div className="text-danger">{this.state.errors.duration}</div>
                                            </form><br></br><br></br>

                                            
                                           <div class="form-group">
                                                <label ><b>Visa type:</b></label><br/>
                                                <Table>
                                               
                                               <tbody>
                                                   <td>{this.visalist()}</td>
                                               </tbody>
                                           </Table>
                                            <form onSubmit={this.handleSubmit6}>
                                            <label>Add new visa type</label><br></br>
                                               <input type="text"  name="visatype"  style={{height:23}} value={this.state.visatype} onChange={this.handleChange6}></input>
                                               <button class= "btn btn-sm  btn-success"> <i class=" fa fa-save"></i>&nbsp;Add</button>
                                            <div className="text-danger">{this.state.errors.visatype}</div>
                                            </form>
                                            </div>
                                           </div>
                                             

                                         <div className="col-3">

                                                <label for="rateterm"><b>Rate Term:</b></label><br />

                                                <Table>
                                               
                                               <tbody>
                                                   <td>{this.ratelist()}</td>
                                               </tbody>
                                           </Table>
                                                <form onSubmit={this.handleSubmit7}>
                                                <label>Add new rate term</label><br></br>
                                                <input type="text"  name="rateterm"  style={{height:23}} value={this.state.rateterm} onChange={this.handleChange7}></input>
                                                <button class= "btn btn-sm  btn-success"> <i class=" fa fa-save"></i>&nbsp;Add</button>
                                                <div className="text-danger">{this.state.errors.rateterm}</div>
                                                </form><br></br><br></br>



                                                </div>
 





                                </div>
                        </div>  
                                            
                        
                        </div>

                    </div>

                                            </div >
            </div >
        ) 
        
        : (
            history.push("/"),
            window.location.reload()
        );
    }
}

export default AdminStatic;