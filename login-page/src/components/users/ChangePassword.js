import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef,useState } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {AiFillEye,AiFillEyeInvisible} from "react-icons/ai";
import validator  from "validator";



export default function ChangePassword() {



    const [users, setUsers]=useState([])
    
     const password = useRef("")
     const newPassword = useRef("")
     const confirmPassword = useRef("") 

     const[oldPasswordCheck,setOldPasswordCheck]=useState(false)
     const[confirmPasswordCheck,setConfirmPasswordCheck]=useState("  ")
     const[oldPasswordShown,setOldPasswordShown] = useState(false)
     const[newPasswordShown,setNewPasswordShown] = useState(false)
     const[newPasswordCheck,setNewPasswordCheck]=useState(false)
     const[errorMessage,setErrorMessage]=useState("Old Password Required")
     
     const toggleOldPassword =()=>{
        setOldPasswordShown(!oldPasswordShown)
     }

     const toggleNewPassword =()=>{
        setNewPasswordShown(!newPasswordShown)
     }

     
   const uid = Number(JSON.parse(sessionStorage.getItem("token")).userId)
    const navigate = useNavigate()

    const handleOldPasswordChange=() => {
        axios.get(`http://localhost:12000/api/User/UserId?uid=${uid}`, {
          headers:{
            "Authorization":`Bearer ${JSON.parse(sessionStorage.getItem("token")).jwtToken}`
          }
        })
            .then(response => { 
                if(password.current.value===response.data.password){
                    setOldPasswordCheck(true)
                    setErrorMessage("")
                }
                if(password.current.value!==response.data.password){
                    setErrorMessage("Password is not correct")
                }
                if(password.current.value===""){
                    setErrorMessage("Old Password Required")
                }
                console.log(response.data.password)
            }).catch((error)=>{
                console.log(error)
            }) 
    }

    const updateProfilePasswordHandler = () => {
        const payload = {
            newPassword :newPassword.current.value   
        }
        console.log("form DATA",payload)

        axios.put(`http://localhost:12000/api/User/ChangePassword?uid=${uid}&password=${newPassword.current.value}`, payload,  {
          headers:{
            "Authorization":`Bearer ${JSON.parse(sessionStorage.getItem("token")).jwtToken}`
          }
        })
            .then((res) => {
                navigate(`/edituser`)
            }).catch((error)=>{
                console.log(error)
                if(!validator.isStrongPassword(newPassword.current.value,{
                    minLength: 6, minLowercase: 1,
                     minUppercase: 1, minNumbers: 1, minSymbols: 1
                })){
                    setNewPasswordCheck(false)
                }
            })
    }

    const handleConfirmPasswordCheck=()=>{
        if(newPassword.current.value!==confirmPassword.current.value){
            setConfirmPasswordCheck("Password doesnot match")
        }
        if(newPassword.current.value===confirmPassword.current.value){
            setConfirmPasswordCheck("")
        }
    }

    return (
        <section className="h-100 bgimg">
        <header className="py-3 mb-4">
          <div className="container d-flex flex-wrap justify-content-center">
            <a href="/" className="d-flex align-items-center mb-3 mb-lg-0 me-lg-auto text-dark text-decoration-none">
            </a>
          </div>
        </header>
        <div className="container h-100">
          <div className="row justify-content-sm-center h-100">
            <div className="col-xxl-5 col-xl-5 col-lg-5 col-md-7 col-sm-9">
              <div className="card shadow-lg">
                <div className="card-body p-4">
                  <h1 className="fs-4 card-title fw-bold mb-4 text_heading">Change Password</h1>
                  <form method="PUT" className="needs-validation" noValidate autoComplete="off">
                    <div className="mb-3">
                      <label className="mb-2 text-muted col-form-label-sm" htmlFor="email">Old Password</label>
                      <div className="input-group">
                        <input id="password" type={oldPasswordShown?"text":"password"} className="form-control form-control-sm" name="email" placeholder="Enter Old Password" ref={password} onChange={handleOldPasswordChange} />
                      <div className="input-group-append">
                            <button type="button" className="btn btn-outline-dark btn-sm me-2" onClick={toggleOldPassword}>{oldPasswordShown ? <AiFillEyeInvisible size="20"/>:<AiFillEye size="20"/>}</button>
                        </div>
                        <pre className="col-sm-12 mb-1"><i style={{color: "red"}}>{errorMessage}</i></pre>
                        </div>
                    </div>
                    <div className="mb-3">
                      <label className="mb-2 text-muted col-form-label-sm" htmlFor="password">New Password</label>
                      <div className="input-group">
                      <input id="newpassword" type={newPasswordShown?"text":"password"} className="form-control form-control-sm" name="password" placeholder="Enter New Password" ref={newPassword} onChange={()=>{ if(validator.isStrongPassword(newPassword.current.value,{
                    minLength: 6, minLowercase: 1,
                     minUppercase: 1, minNumbers: 1, minSymbols: 1
                })){
                    setNewPasswordCheck(true)
                }
                if(newPassword.current.value===""){setNewPasswordCheck(false)}}}/>
                      <div className="input-group-append">
                            <button type="button" className="btn btn-outline-dark btn-sm me-2" onClick={toggleNewPassword}>{newPasswordShown ? <AiFillEyeInvisible size="20"/>:<AiFillEye size="20"/>}</button>
                        </div>
                      </div>
                      <pre className="col-sm-12 mb-1"><i style={{color: "red"}}>{newPasswordCheck ? "":"Mininum length : 6"}</i></pre>
                      <pre className="col-sm-12 mb-1"><i style={{color: "red"}}>{newPasswordCheck ? "":"Uppercase and Lowercase required"}</i></pre>
                      <pre className="col-sm-12 mb-1"><i style={{color: "red"}}>{newPasswordCheck ? "":"Number Required"}</i></pre>
                      <pre className="col-sm-12 mb-1"><i style={{color: "red"}}>{newPasswordCheck ? "":"Special Character required"}</i></pre>         
                    </div>
                    <div className="mb-3">
                      <label className="mb-2 text-muted col-form-label-sm" htmlFor="password">Confirm Password</label>
                      <input id="confirmpassword" type="password" className="form-control form-control-sm" name="password" placeholder="Confirm your Password" ref={confirmPassword} onChange={handleConfirmPasswordCheck}/>
                      <pre className="col-sm-12 mb-1"><i style={{color:"red"}}>{confirmPasswordCheck}</i></pre>
                    </div>
                    <div className="align-items-center d-flex">
                      <Button type="button" className="btn-light btn-outline-success btn-sm me-2" disabled={!(oldPasswordCheck)||(confirmPasswordCheck==="  "||confirmPasswordCheck==="Password doesnot match")||!(newPasswordCheck)} onClick={updateProfilePasswordHandler}>
                        Save Changes	
                      </Button>
                      <Button type="button" className="btn-light btn-outline-dark btn-sm ms-auto" onClick={() => navigate(`/edituser`)}>
                        Cancel	
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
       
     )
}