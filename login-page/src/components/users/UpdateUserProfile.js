import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef,useState } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { MdEdit } from "react-icons/md";
import Moment from "moment";
import validator  from "validator";

export default function UpdateUserProfile(){

   // const [users, setUsers]=useState([])
   // const userId= useRef("")
    const userFirstName = useRef("")
    const userMiddleName =	useRef("")
     const userLastName=	useRef("")
     const userName=	useRef("")
     const emailId =	useRef("")
     const userDOB =    useRef("")
     const userPhoneNumber =  useRef("")
     const userAddress    =   useRef("")
     const gender    =   useRef("")
     const password = useRef("")
     var today = new Date().toISOString().split('T')[0]
    //  var role = ""
    const[role, setRole] = useState("")
     
     //const userTypeId = useRef("")


     const[userFirstNameCheck,setUserFirstNameCheck] = useState(true)
     const[userLastNameCheck,setUserLastNameCheck] = useState(true)
     const[emailIdCheck,setemailIdCheck] = useState(true)
     const[userNameState,setuserNameState] = useState("")
     const[oldUserName, setOldUserName] = useState("")
   

  //  const {uid} = useParams()
  // const uid=2;
    const uid = Number(JSON.parse(sessionStorage.getItem("token")).userId)

    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`http://localhost:12000/api/User/UserId?uid=${uid}`, {
          headers:{
            "Authorization":`Bearer ${JSON.parse(sessionStorage.getItem("token")).jwtToken}`
        }
        })
            .then(response => {
                userFirstName.current.value = response.data.userFirstName
                userMiddleName.current.value = response.data.userMiddleName
                userLastName.current.value = response.data.userLastName
                userName.current.value = response.data.userName
                emailId.current.value = response.data.emailId 
                userDOB.current.value = Moment(response.data.userDOB).format("YYYY-MM-DD")
                userPhoneNumber.current.value = response.data.userPhoneNumber
                userAddress.current.value = response.data.userAddress
                gender.current.value = response.data.gender 
                password.current.value = response.data.password
                // role = response.data.role
                setRole(response.data.role)
                setOldUserName(response.data.userName)

                console.log(response.data.role)
                
            }).catch((error)=>{
                console.log(error)
            }) 
    }, [])

    const handleUserNameChange = () =>{

        axios.get(`http://localhost:12000/api/User/UserNameCheck?UserName=${userName.current.value}`)
                .then((response) => {
                  if(userName.current.value.length<=6 && userName.current.value!==""){
                    setuserNameState("Username length should be more than 6 characters")
                }
                else{
                  setuserNameState()
                }
                
            }).catch((error) => {
              if(userName.current.value === oldUserName) {
                setuserNameState()
              }else {
                setuserNameState("Username already exists")
              }
              if(userName.current.value === "") {
                setuserNameState()
              }
            }) 

    }



    const updateProfileHandler = () => {
        const payload = {
            
            userFirstName: userFirstName.current.value,
            userMiddleName: userMiddleName.current.value,
            userLastName  :userLastName.current.value,
            userName  :userName.current.value,
            emailId  :emailId.current.value,
            userDOB  :userDOB.current.value,
            userPhoneNumber  : userPhoneNumber.current.value ? Number(userPhoneNumber.current.value) : 0,
            userAddress  :userAddress.current.value,
            gender   :gender.current.value,
            password :password.current.value,
            role: role
          // userTypeId :userTypeId.current.value ? Number(userTypeId.current.value):0,
           // userId:userId.current.value

           //price: price.current.value ? Number(price.current.value) : 0   
        }

        axios.put(`http://localhost:12000/api/User/UserId?uid=${uid}`, payload, {
          headers:{
            "Authorization":`Bearer ${JSON.parse(sessionStorage.getItem("token")).jwtToken}`
          }
        })
            .then(() => {
              if(JSON.parse(sessionStorage.getItem("token")).role === "JobSeeker") {
                navigate(`/userprofile`)
              }
              else if(JSON.parse(sessionStorage.getItem("token")).role === "Employer"){
                navigate(`/recruiterprofilepage`)
              }
            }).catch((error)=>{
                console.log(error)
                console.log(payload)
                if(userFirstName.current.value===""){
                    setUserFirstNameCheck(false)
                }
                if(userLastName.current.value===""){
                    setUserLastNameCheck(false)
                }
                if(!(validator.isEmail(emailId.current.value))){
                    setemailIdCheck(false)
                }
                if(userName.current.value===""){
                    setuserNameState("Username is required")
                }
                
            })
    }



    return(
        
        <section className="h-100 bgimg">
        <br/>
        <br/>
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
                  <h1 className="fs-4 card-title fw-bold mb-4 text_heading">Update Profile</h1>
                  <form method="PUT" className="needs-validation" noValidate autoComplete="off">
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <fieldset>
                          <label className="mb-2 text-muted col-form-label-sm" htmlFor="fname"> First Name</label>
                          <input id="firstname" type="text" className="form-control form-control-sm" name="fname" ref={userFirstName} onChange={()=>setUserFirstNameCheck(true)} />
                        </fieldset>
                        <pre className="col-sm-12 mb-1"><i style={{color:"red"}}>{userFirstNameCheck?"":"First Name is required"}</i></pre>
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="mb-2 text-muted col-form-label-sm" htmlFor="fname"> Middle Name</label>
                        <input id="middlename" type="text" className="form-control form-control-sm" name="fname" ref={userMiddleName} />
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                        <label className="mb-2 text-muted col-form-label-sm" htmlFor="fname"> Last Name</label>
                        <input id="lastname" type="text" className="form-control form-control-sm" name="fname"  ref={userLastName} onChange={()=>setUserLastNameCheck(true)}/>
                        <pre className="col-sm-12 mb-1"><i style={{color:"red"}}>{userLastNameCheck?"":"Last Name is required"}</i></pre>
                      </div>
                      <div className="row">
                            <div className="col-md-6 mb-3">
                                <fieldset>
                                <label className="mb-2 text-muted col-form-label-sm" htmlFor="fname"> Date of Birth</label>
                                <input id="dob" type="date" className="form-control form-control-sm" name="fname" ref={userDOB} max={today}  /> 
                                </fieldset>
                            </div>
                            <div className="col-md-5 mb-3">
                                <label className="mb-2 text-muted col-form-label-sm" htmlFor="fname">Gender</label>
                                <select className=" form-control form-control-sm" id="gender" ref={gender}>
                                    <option value="M" >Male</option>
                                    <option value="F" >Female</option>
                                    <option value="O" >Other</option>
                                </select>
                            </div>
                        </div>
                        <div className="mb-3">
                        <label className="mb-2 text-muted col-form-label-sm" htmlFor="fname">Address</label>
                        <input id="address" type="text" className="form-control form-control-sm" name="fname" ref={userAddress}/>
                      </div>
                    <div className="mb-3">
                      <label className="mb-2 text-muted col-form-label-sm" htmlFor="email">User Name </label>
                      <input id="User" type="text" className="form-control form-control-sm" name="email" ref={userName} onInput={handleUserNameChange}/>
                      <pre className="col-sm-12 mb-1"><i style={{color:"red"}}>{userNameState}</i></pre>
                    </div>
                    <div className="mb-3">
                      <label className="mb-2 text-muted col-form-label-sm" htmlFor="password">Password</label>
                      <div className="input-group">
                        <input id="password" type="password" className="form-control form-control-sm" name="password" ref={password}/>
                        <div className="input-group-append">
                        <Button variant="info" type="button" className="btn-light btn-outline-info btn-sm" onClick={() => navigate(`/Changepassword`)}>
                            <MdEdit/>
                        </Button>
                        </div>
                      </div>  
                    </div>
                    <div className="mb-3">
                      <label className="mb-2 text-muted col-form-label-sm" htmlFor="email">Email </label>
                      <input id="email" type="email" className="form-control form-control-sm" name="email" ref={emailId} onChange={()=>{if(validator.isEmail(emailId.current.value)){setemailIdCheck(true)}}} />
                      <pre className="col-sm-12 mb-1"><i style={{color:"red"}}>{emailIdCheck?"":"Invalid email"}</i></pre>
                    </div>
                    <div className="mb-3">
                      <label className="mb-2 text-muted col-form-label-sm" htmlFor="email">Phone </label>
                      <input id="number" type="number" className="form-control form-control-sm" name="email" ref={userPhoneNumber} />
                    </div>
                    <div className="align-items-center d-flex">
                      <Button type="button" className="btn-light btn-outline-success btn-sm me-2" disabled={(userNameState==="Username length should be more than 6 characters"||(userNameState==="Username already exists"))} onClick={updateProfileHandler}>
                        Save Changes	
                      </Button>
                      <Button type="button" className="btn-light btn-outline-dark btn-sm ms-auto" onClick={() =>{if(JSON.parse(sessionStorage.getItem("token")).role === "JobSeeker") {
                            navigate(`/userprofile`)
                          }
                          else if(JSON.parse(sessionStorage.getItem("token")).role === "Employer"){
                            navigate(`/recruiterprofilepage`)
                          }}}>
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