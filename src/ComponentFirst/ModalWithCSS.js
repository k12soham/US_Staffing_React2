import React from 'react';

import ReactModal from 'react-modal';
import history from './ResponseVal';
import { toast } from "react-toastify";
import {Modal} from 'react-bootstrap';  
import { Button } from 'reactstrap';

class ModalWithCSS extends React.Component {
  
  constructor() {
    super();
    this.state = {
      showModal: false,
      
    };
  
    this.handleOpenModal = this.handleOpenModal.bind(this);

  }
  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleUpdateProfile () {

    let recruiterRole = localStorage.getItem('recruiterRole');

    
      history.push("/update_profile");
      window.location.reload();
    
 
  }

   handleUpdateProfile2 () {

    
      history.push("/change_password");
      window.location.reload();
    
  }

   handleUpdateProfile3 () {

    
    history.push("/change_password_recruiter");
    window.location.reload();
  
}



 handleClose() {
    window.location.reload();
  }

   logout =()=>{

    localStorage.clear();
    history.push("/")
    window.location.reload();
    toast.success("Logout successfully!",
      { position: "top-right" })
    
  }

  render() {
    let  role = localStorage.getItem('recruiterRole');
    let empName = localStorage.getItem('recruiterName');
    let empMail = localStorage.getItem('recruiterEmail');

    return (

      
      <div  style={{textAlign:'right', marginTop:'15px'}}>
        <div onClick={this.handleOpenModal}>

        <i class="fa fa-user-circle-o" style={{fontSize:'25px',color:'lightslategrey'}}></i>&nbsp;
          <span style={{color:'lightslategrey', fontSize:'17px'}}>{empName}</span>

        </div>

        {/* <button className="btn btn-primary btn-sm w-100 theme-btn mx-auto"
          style={{ color: 'white', margin: '0px' }} onClick={this.handleOpenModal}>View Profile</button> */}
        <div className="col-5 col-md-7 col-lg- auth-main-col text-center">

          <ReactModal
            isOpen={this.state.showModal}
            contentLabel="onRequestClose Example"
            onRequestClose={this.handleCloseModal}
           className="Modal"
         

          // overlayClassName="Overlay"
          >
            <div style={{ textAlign: "right" }}>

              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={this.handleClose}></button>

            </div>
            <div style={{ marginLeft: '70px' }}>
              <span >   <i class="fa fa-user-circle-o" style={{fontSize:'30px',color:'lightslategrey'}}></i><b style={{ fontSize: '22px' }}> &nbsp;{empName}</b></span><br />
              <span ><h6 style={{ marginLeft: '15px' }}>{empMail} </h6></span><hr></hr>
            </div>
            <div className="text-center">
              <div className='row'>
                <div className='col-1'></div>

                <div className="form-group">
                  <button
                    type="submit"
                    className="btn btn-sm btn-primary  form-control"
                    onClick={this.handleUpdateProfile}
                  ><i class="fa fa-pencil"></i>&nbsp;
                    Update Profile
                  </button>
                </div>

             <div className="form-group">
                  <button
                    type="submit"
                    className="btn btn-sm btn-primary  form-control"
                    onClick={this.handleUpdateProfile2}
                  ><i class="fa fa-pencil"></i>&nbsp;
                    Change Password
                  </button>
                </div>

        <div>
          {
              role=="Admin"?
              (
                <div class="form-group">
                  <button
                    type="submit"
                    className="btn btn-sm btn-outline-danger w-150 theme-btn mx-auto form-control"
                    onClick={this.handleUpdateProfile3}
                   
                  ><i class="fa fa-pencil"></i>&nbsp;
                    Change Recruiter Password
                  </button>
                </div>
              ):(
                []
              )
             
            }
  </div>
                <div class="form-group">
                  <button
                    type="reset"
                   className="btn btn-secondary form-control"
                   onClick={this.logout}
       
                  ><i class="fa fa-sign-out"></i>&nbsp;
                    Logout
                  </button>

                </div>
              </div>
            </div>

        </ReactModal>
        </div>
      </div >
    );
          }      
}


export default ModalWithCSS;