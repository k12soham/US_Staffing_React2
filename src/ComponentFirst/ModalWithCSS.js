import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import ReactModal from 'react-modal';
import history from './ResponseVal';
import { toast } from "react-toastify";

class ModalWithCSS extends React.Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
      // navigate: useNavigate()
    };
    //  let navigate = useNavigate();
    this.handleOpenModal = this.handleOpenModal.bind(this);
    // this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleUpdateProfile() {
    history.push("/update_profile");
    window.location.reload();
  }

  handleClose() {
    window.location.reload();
  }

  logout() {
    localStorage.clear();
    history.push("/");
    toast.success("Logout successfully!",
      { position: "top-right" })
    window.location.reload();

  }

  render() {
    let recruiterIDAdmin = localStorage.getItem('recruiterIDAdmin')
    // console.log(recruiterIDAdmin)
    let empID = localStorage.getItem('recruiterID');
    let empName = localStorage.getItem('recruiterName');
    let empMail = localStorage.getItem('recruiterEmail');
    return (

      <div>
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
            className="Modal"

          // overlayClassName="Overlay"
          >
            <div style={{ textAlign: "right" }}>

              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={this.handleClose}></button>

            </div>
            <div style={{ marginLeft: '70px' }}>
              <span > <img src="https://img.icons8.com/ios/35/000000/user-male-circle--v2.png" /><b style={{ fontSize: '22px' }}> &nbsp; &nbsp;{empName}</b></span><br />
              <span ><h6 style={{ marginLeft: '50px' }}>{empMail} </h6></span><hr></hr>
            </div>
            {/* <p style={{ margin: '0px', padding: '0px' }}>Modal text!{empID}</p> */}

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
          {/* ---------------------------------------------------------------------------------- */}
        </div>
      </div >
    );
  }
}

export default ModalWithCSS;