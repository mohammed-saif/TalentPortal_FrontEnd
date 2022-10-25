import React from 'react';
import { Navbar, Container, Nav} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import {RiAccountCircleFill} from 'react-icons/ri'
import {Modal, ModalHeader, Button} from "react-bootstrap"; 
import { useState } from 'react';



export default function Layout(props) {

  const[showModal, setShowModal]= useState(false)

  const navigate = useNavigate()

  const logout = () => {
    sessionStorage.removeItem("token")
    if(sessionStorage.getItem("Job ID")){
      sessionStorage.removeItem("Job ID")
    }
    setShowModal(true)
    closeModalHandler()
    // navigate(`login`)
  }

  const closeModalHandler = () => {
    setTimeout(() => {
        setShowModal(false)
        navigate(`/`)
    },3000)
}

  const ButtonChangeHandler = () => {
    if(sessionStorage.getItem("token") && JSON.parse(sessionStorage.getItem("token")).role === "JobSeeker")
    {
      return (
        <>
            <Navbar.Collapse >
            <RiAccountCircleFill style={{padding:"8px"}} size={55} onClick={() => navigate(`/userprofile`)}/>
            {/* <button type="button" className="btn btn-outline-dark btn-sm me-2" onClick={() => navigate(`/userprofile`)}>View Account</button> */}
            <button type="button" className="btn btn-outline-dark btn-sm" onClick={() => logout()}>LOGOUT</button>
            </Navbar.Collapse>
        </>
      )
      
    }
    else if(sessionStorage.getItem("token") && JSON.parse(sessionStorage.getItem("token")).role === "Employer")
    {
      return (
        <>

            <Navbar.Collapse >
            <RiAccountCircleFill style={{padding:"8px"}} size={55} onClick={() => navigate(`/recruiterprofilepage`)}/>
            {/* <button type="button" className="btn btn-outline-dark btn-sm me-2" onClick={() => navigate(`/recruiterprofilepage`)}>View Account</button> */}
            
            
            <button type="button" className="btn btn-outline-dark btn-sm" onClick={() => logout()}>LOGOUT</button>
            </Navbar.Collapse>
            
        </>
      )
      
    }
    else{
      return (
        <>
        <Navbar.Collapse >

        <button type="button" className="btn btn-outline-dark btn-sm me-2" onClick={() => navigate('/register')}>REGISTER</button>
        <button type="button" className="btn btn-outline-dark btn-sm" onClick={() => navigate('/login')}>LOGIN</button>
        </Navbar.Collapse>
        </>
      )
    }
  }

//main return starts here


    return (
      <div>
          <Modal
                show={showModal}
                onHide={closeModalHandler}
                keyboard={false}>
                    <ModalHeader>
                        <Modal.Title>
                            Logout Successful
                        </Modal.Title>
                    </ModalHeader>
                    <Modal.Body>
                            Please wait..You will be redirected to home page    
                    </Modal.Body>

            </Modal>


      <Navbar bg='white' variant='white' expand='lg'>

          <Container>

              <Navbar.Brand href="/">

              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfxOmhBy9N06InPK-TwMk9abz-EPgzF6GmLrG4OfUeqrLem5_uFIOx2Fpesfjrw94ETA&usqp=CAU" alt="logo" width="150"/>

              </Navbar.Brand>
              <Navbar.Toggle   className="ms-auto" aria-controls="basic-navbar-nav" />
              <Nav >
                
                {
                  ButtonChangeHandler()
                }
                
               </Nav>

          </Container>

      </Navbar>
        <div className="container d-flex flex-wrap justify-content-center">
           
        </div>  
    
      <Container className="bgimg" >
      
          {props.children}

      </Container>

  </div>







        // <>
        //     <Navbar className="navbar navbar-expand-lg header-navbar">
        //         <Container className="container-fluid">
        //           <Navbar.Brand href="/">
        //           <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfxOmhBy9N06InPK-TwMk9abz-EPgzF6GmLrG4OfUeqrLem5_uFIOx2Fpesfjrw94ETA&usqp=CAU" alt="logo" width="100" />
        //           </Navbar.Brand>
        //            
                    
                      
        //         </Container>
        //     </Navbar>
        //     <Container>
        //     {props.children}
        //     </Container>/
        // </>
    );
    }