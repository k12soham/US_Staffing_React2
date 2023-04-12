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

      
      <div style={{textAlign:'right'}}>
        <div onClick={this.handleOpenModal}>

          <img src="https://img.icons8.com/ios/35/000000/user-male-circle--v2.png" ></img>&nbsp;
          <span>{empName}</span>

        </div>

        {/* <button className="btn btn-primary btn-sm w-100 theme-btn mx-auto"
          style={{ color: 'white', margin: '0px' }} onClick={this.handleOpenModal}>View Profile</button> */}
        <div className="col-5 col-md-7 col-lg- auth-main-col text-center">

          <ReactModal
            isOpen={this.state.showModal}
            contentLabel="onRequestClose Example"
            onRequestClose={this.handleCloseModal}
           className="Modals"
         

          // overlayClassName="Overlay"
          >
            <div style={{ textAlign: "right" }}>

              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={this.handleClose}></button>

            </div>
            <div style={{ marginLeft: '70px' }}>
              <span > <img src="https://img.icons8.com/ios/35/000000/user-male-circle--v2.png" /><b style={{ fontSize: '22px' }}> &nbsp; &nbsp;{empName}</b></span><br />
              <span ><h6 style={{ marginLeft: '50px' }}>{empMail} </h6></span><hr></hr>
            </div>
            <div className="text-center">
              <div className='row'>
                <div className='col-1'></div>

                <div className='col-5'>
                  <button
                    type="submit"
                    className="btn btn-primary w-150 theme-btn mx-auto"
                    onClick={this.handleUpdateProfile}
                  ><i class="fa fa-pencil"></i>&nbsp;
                    Update Profile
                  </button>
                </div>

                <div className='col-5'>
                  <button
                    type="submit"
                    className="btn btn-primary w-150 theme-btn mx-auto"
                    onClick={this.handleUpdateProfile2}
                  ><i class="fa fa-pencil"></i>&nbsp;
                    Change Password
                  </button>
                </div>

        <div>&nbsp;&nbsp;&nbsp;&nbsp;
          {
              role=="Admin"?
              (
                <div className='col-5'>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={this.handleUpdateProfile3}
                    style={{width:"300px",marginLeft:"60px"}}
                  ><i class="fa fa-pencil"></i>&nbsp;
                    Change recruiter password
                  </button>
                </div>
              ):
              (
                console.log("")
              )
            }
  </div>
                <div className='col-5'><br></br>
                  <button
                    type="reset"
                   className="btn btn-secondary "
                   onClick={this.logout}
                  style={{width:"300px",marginLeft:"70px"}}
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