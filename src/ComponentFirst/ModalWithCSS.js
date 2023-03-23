import React, { useState } from 'react';

import ReactModal from 'react-modal';
import history from './ResponseVal';
import { toast } from "react-toastify";


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

    let recruiterIDAdmin = localStorage.getItem('recruiterIDAdmin');

    if(recruiterIDAdmin==null)
    {
      
      history.push("/update_profile");
      window.location.reload();
    
    }
    else{

       history.push("/update_profile_Admin");
      window.location.reload();
    }
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

    let empName = localStorage.getItem('recruiterName');
    let empMail = localStorage.getItem('recruiterEmail');
    return (

      <div style={{ textAlign: "right" }}>
        <div onClick={this.handleOpenModal}>

          <img src="https://img.icons8.com/ios/35/000000/user-male-circle--v2.png" ></img>&nbsp;
          <span>{empName}</span>

        </div>

      
        <div className="col-5 col-md-7 col-lg- auth-main-col text-center">

          <ReactModal
            isOpen={this.state.showModal}
            contentLabel="onRequestClose Example"
            onRequestClose={this.handleCloseModal}
            className="Modal"

          >
            <div style={{ textAlign: "right" }}>

              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={this.handleClose}></button>

            </div>
            <div style={{ marginLeft: '0px', textAlign:"center" }}>
              <span > <img src="https://img.icons8.com/ios/35/000000/user-male-circle--v2.png" /><b style={{ fontSize: '18px' }}> &nbsp;{empName}</b></span><br />
              <span ><h6>{empMail} </h6></span><hr></hr>
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
                </div>&nbsp;&nbsp;&nbsp;&nbsp;
                <div className='col-5'>
                  <button
                    type="reset"
                    className="btn btn-secondary w-100 theme-btn mx-auto"
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