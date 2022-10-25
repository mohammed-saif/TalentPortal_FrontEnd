import { useEffect, useRef, useState } from "react";
import {Modal, ModalHeader, Button} from "react-bootstrap"; 
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import validator from 'validator';
import {AiFillEye,AiFillEyeInvisible} from "react-icons/ai";

export default function RegisterUser() {

  const[showModal, setShowModal]= useState(false)

    const userFirstName = useRef("")
    const userMiddleName = useRef("")
    const userLastName = useRef("")
    const userDOB = useRef("")
    const gender = useRef("")
    const userPhoneNumber = useRef("")
    const userAddress = useRef("")
    const userName = useRef("")
    const emailId = useRef("")
    const password = useRef("")
    const role = useRef("")
    const confirmPassword = useRef("")

    const navigate = useNavigate()

    const[registerState, setRegisterState] = useState("You have not been registered yet!")
    const[confirmPasswordState, setConfirmPasswordState] = useState("  ")
    const[userNameState, setuserNameState] = useState("")
    const[passwordShown, setPasswordShown] = useState(false)
    const[userFirstNameCheck,setUserFirstNameCheck] = useState(true)
    const[userLastNameCheck,setUserLastNameCheck] = useState(true)
    const[userDOBCheck,setUserDOBCheck] = useState(true)
    const[emailIdCheck,setemailIdCheck] = useState(true)
    const[passwordCheck,setPasswordCheck] = useState(false)
    var today = new Date().toISOString().split('T')[0]
    

    const togglePassword = () => {
        setPasswordShown(!passwordShown)
    }

    const addUserHandler = () => {
        const payload = {
            userFirstName: userFirstName.current.value,
            userMiddleName: userMiddleName.current.value,
            userLastName: userLastName.current.value,
            userDOB: userDOB.current.value ,
            gender: gender.current.value,
            userPhoneNumber: userPhoneNumber.current.value ? Number(userPhoneNumber.current.value) : 0,
            userAddress: userAddress.current.value,
            userName: userName.current.value,
            emailId: emailId.current.value,
            password: password.current.value,
            role: role.current.value 
        }
    
        axios.post("http://localhost:12000/api/user/register", payload)
                .then((response) => {
                    setRegisterState("Register successful!")
                    // navigate(`/login`)
                    setShowModal(true)
                    closeModalHandler()
                }).catch((error) => {
                    setRegisterState("Not Succsess")
                    if(userFirstName.current.value === ""){
                        setUserFirstNameCheck(false)
                    }
                    if(userLastName.current.value === ""){
                        setUserLastNameCheck(false)
                    }
                    if(userDOB.current.value === ""){
                        setUserDOBCheck(false)
                    }
                    if(!validator.isEmail(emailId.current.value)){
                        setemailIdCheck(false)
                    }
                    if(userName.current.value === "")
                    {
                        setuserNameState("Username is required")
                    }
                    if(!validator.isStrongPassword(password.current.value, {
                        minLength: 6, minLowercase: 1,
                        minUppercase: 1, minNumbers: 1, minSymbols: 1
                      })){
                        setPasswordCheck(false)
                      }
                    
                })
                
    }
    
    const handleUserNameChange = () =>{
        
            axios.get(`http://localhost:12000/api/User/UserNameCheck?UserName=${userName.current.value}`)
                .then((response) => {
                  if(userName.current.value.length <= 6 && userName.current.value !== ""){
                    setuserNameState("Username length should be more than 6 characters")
                }
                else{
                    setuserNameState()
                }
                }).catch((error) => {
                   setuserNameState("Username already exists")
                   if(userName.current.value === ""){
                    setuserNameState()
                   }

                })
       
    }

    const handleConfirmPasswordChange = () => {
        if(password.current.value !== confirmPassword.current.value) {
           setConfirmPasswordState("Password does not match")
        }
        else if(confirmPassword.current.value === ""){
          setConfirmPasswordState("Password does not match")
        }
        else {
            setConfirmPasswordState()
        }
    }

    const closeModalHandler = () => {
      setTimeout(() => {
          setShowModal(false)
          navigate(`/login`)
      },3000)
  }

    return (
        <section className="h-100 bgimg">
        <header className="py-3 mb-4">
          <div className="container d-flex flex-wrap justify-content-center">
            <a href="/" className="d-flex align-items-center mb-3 mb-lg-0 me-lg-auto text-dark text-decoration-none">
            </a>
          </div>
        </header>
        <Modal
                show={showModal}
                onHide={closeModalHandler}
                keyboard={false}>
                    <ModalHeader>
                        <Modal.Title>
                            Registered successfully :)
                        </Modal.Title>
                    </ModalHeader>
                    <Modal.Body>
                            Please wait..You will be redirected to Login page    
                    </Modal.Body>

            </Modal>
        <div className="container h-100">
        {/* <pre className="col-sm-6 offset-sm-3 mb-3 text-center"><b style={{color: "red"}}>{registerState}</b></pre> */}
          <div className="row justify-content-sm-center h-100">
            <div className="col-xxl-5 col-xl-5 col-lg-5 col-md-7 col-sm-9">
              <div className="card shadow-lg">
                <div className="card-body p-4">
                  <h1 className="fs-4 card-title fw-bold mb-4 text_heading">Register User</h1>
                  <form method="POST" className="needs-validation" noValidate autoComplete="off">
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <fieldset>
                          <label className="mb-2 text-muted col-form-label-sm" htmlFor="fname"> First Name<p style={{color: "red",display:"inline"}}>*</p></label>
                          <input id="firstname" type="text" className="form-control form-control-sm" name="fname"  required placeholder="Enter First Name" ref={userFirstName} onChange={() => setUserFirstNameCheck(true)} autoFocus />
                          <div className="invalid-feedback">
                            First Name is required	
                          </div>
                        </fieldset>
                        <pre className="col-sm-12 mb-1 "><i style={{color: "red"}}>{userFirstNameCheck ?"":"First Name is required"}</i></pre> 
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="mb-2 text-muted col-form-label-sm" htmlFor="fname"> Middle Name</label>
                        <input id="middlename" type="text" className="form-control form-control-sm" name="mname"  placeholder="Enter Middle Name" ref={userMiddleName}  />
                      </div>
                    </div>
                      <div className="col-md-6 mb-3">
                        <label className="mb-2 text-muted col-form-label-sm" htmlFor="fname"> Last Name<p style={{color: "red",display:"inline"}}>*</p></label>
                        <input id="lastname" type="text" className="form-control form-control-sm" name="fname"  required placeholder="Enter Last Name" ref={userLastName} onChange={() => setUserLastNameCheck(true)}  />
                        <div className="invalid-feedback">
                          Last Name is required	
                        </div>
                        <pre className="col-sm-12 mb-1 "><i style={{color: "red"}}>{userLastNameCheck ? "":"Last Name is required"}</i></pre> 
                      </div>
                   <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="mb-2 text-muted col-form-label-sm" htmlFor="email">Date of Birth<p style={{color: "red",display:"inline"}}>*</p> </label>
                      <input id="dob" type="date" className="form-control form-control-sm" name="dob" required placeholder="Select your date of Birth" ref={userDOB} onChange={() => setUserDOBCheck(true)} max={today}/>
                      <div className="invalid-feedback">
                        Date of Birth is required
                      </div>
                      <pre className="col-sm-12 mb-1 "><i style={{color: "red"}}>{userDOBCheck ? "":"DOB is required"}</i></pre> 
                    </div>
                    <div className="col-md-5 mb-3">
                        <label className="mb-2 text-muted col-form-label-sm" htmlFor="email">Gender<p style={{color: "red",display:"inline"}}>*</p></label>
                        <select className="form-control form-control-sm" id="gender" ref={gender}>
                            <option value="M" defaultValue={true}>Male</option>
                            <option value="F">Female</option>
                            <option value="O">Other</option>
                        </select>
                    </div>
                 </div>
                    <div className="mb-3">
                        <label className="mb-2 text-muted col-form-label-sm" htmlFor="fname"> Address</label>
                        <input id="addresss" type="text" className="form-control form-control-sm" name="address"  placeholder="Enter Address" ref={userAddress}   />
                      </div>
                    <div className="mb-3">
                      <label className="mb-2 text-muted col-form-label-sm" htmlFor="email">User Name <p style={{color: "red",display:"inline"}}>*</p></label>
                      <input id="User" type="text" className="form-control form-control-sm" name="email"  placeholder="Enter User Name" ref={userName} onChange={handleUserNameChange} required />
                      <div className="invalid-feedback">
                        User is invalid
                      </div>
                      <pre className="col-sm-12 mb-3 "><i style={{color: "red"}}>{userNameState}</i></pre> 
                    </div>
                    <div className="mb-3">
                      <label className="mb-2 text-muted col-form-label-sm" htmlFor="password">Password<p style={{color: "red",display:"inline"}}>*</p></label>
                      <div className="input-group mb-3">
                        <input id="password" type={passwordShown ? "text":"password"} className="form-control form-control-sm" name="password" required placeholder="Enter Password" ref={password} onChange={() => {if(validator.isStrongPassword(password.current.value, {
                        minLength: 6,  minLowercase: 1,
                        minUppercase: 1, minNumbers: 1, minSymbols: 1
                      })){setPasswordCheck(true)}
                      if(password.current.value ===""){setPasswordCheck(false)}}}/>
                        <div className="invalid-feedback">
                            Password is required
                        </div>
                        <div className="input-group-append">
                            <button type="button" className="btn btn-outline-dark btn-sm me-2" onClick={togglePassword}>{passwordShown ? <AiFillEyeInvisible size="25"/>:<AiFillEye size="25"/>}</button>
                        </div>
                      </div>
                      <pre className="col-sm-12 mb-1"><i style={{color: "red"}}>{passwordCheck ? "":"Mininum length : 6"}</i></pre> 
                      <pre className="col-sm-12 mb-1"><i style={{color: "red"}}>{passwordCheck ? "":"Uppercase and Lowercase required"}</i></pre> 
                      <pre className="col-sm-12 mb-1"><i style={{color: "red"}}>{passwordCheck ? "":"Number Required"}</i></pre> 
                      <pre className="col-sm-12 mb-1"><i style={{color: "red"}}>{passwordCheck ? "":"Special Character required"}</i></pre> 
                    </div>
                    <div className="mb-3">
                      <label className="mb-2 text-muted col-form-label-sm" htmlFor="password">Confirm Password<p style={{color: "red",display:"inline"}}>*</p></label>
                      <input id="confirmpassword" type="password" className="form-control form-control-sm" name="confirmpassword" required placeholder="Confirm your Password" ref={confirmPassword} onChange={handleConfirmPasswordChange}  />
                      <div className="invalid-feedback">
                        Confirm Password is required
                      </div>
                      <pre className="col-sm-6 mb-3 "><i style={{color: "red"}}>{confirmPasswordState}</i></pre>
                    </div>
                    <div className="mb-3">
                      <label className="mb-2 text-muted col-form-label-sm" htmlFor="email">Email<p style={{color: "red",display:"inline"}}>*</p> </label>
                      <input id="email" type="email" className="form-control form-control-sm" name="email" required placeholder="Enter Email" ref={emailId} onChange={() => {if(validator.isEmail(emailId.current.value)){setemailIdCheck(true)}}}  />
                      <div className="invalid-feedback">
                        Email is invalid
                      </div>
                      <pre className="col-sm-12 mb-1 "><i style={{color: "red"}}>{emailIdCheck ? "":"Email invalid"}</i></pre>
                    </div>
                    <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="mb-2 text-muted col-form-label-sm" htmlFor="email">Phone</label>
                      <input id="number" type="number" className="form-control form-control-sm" name="phone" required placeholder="Enter Phone" ref={userPhoneNumber}  />
                      <div className="invalid-feedback">
                        Phone is invalid
                      </div>
                    </div>    
                    <div className="col-md-6 mb-3">
                        <label className="mb-2 text-muted col-form-label-sm" htmlFor="email">Account Type<p style={{color: "red",display:"inline"}}>*</p></label>
                        <select className="form-control form-control-sm" id="usertypeid" ref={role}>
                            <option value="JobSeeker" defaultValue={true}>Job-Seeker</option>
                            <option value="Employer">Employer</option>
                        </select>
                    </div>
                    </div>
                    <div className="align-items-center d-flex">
                      <Button type="button" className="btn-light btn-outline-success btn-sm ms-auto" disabled={(userNameState==="Username already exists" )||!(passwordCheck)||!(emailIdCheck)||(confirmPasswordState==="Password does not match")||(confirmPasswordState==="  ")||(userNameState==="Username length should be more than 6 characters")} onClick={addUserHandler}>
                        Create Account	
                      </Button>
                    </div>
                  </form>
                </div>
                <div className="card-footer py-3 border-0">
                  <div className="text-center">
                    Already have an account? <button className="btn btn-outline-secondary btn-sm ms-auto" type="button" onClick={() => navigate('/login')}>
                    Login
                </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
}