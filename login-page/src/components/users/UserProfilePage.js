import { useEffect, useState,useRef } from "react"
import axios from 'axios';
import { Button, Table } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import Moment from "moment";
import DeleteConfirmation from "./DeleteConfirmation";
import { useParams } from 'react-router-dom';
// import UserSkillCard from "./UserSkillCard";

import { MdEdit } from "react-icons/md";

import { MdDelete } from "react-icons/md";



export default function UserProfilePage(){

  const [users, setUsers]=useState([])
  const [userSkills, setUserSkills]=useState([])
  const [showModal, setShowModal] = useState(false)
  const [userIdToDelete, setuserIdToDelete] = useState(0)
  const navigate = useNavigate()
  const uid = Number(JSON.parse(sessionStorage.getItem("token")).userId)
  const[gender,setGender]=useState("")



  useEffect(()=>{
  axios.get(`http://localhost:12000/api/User/UserId?uid=${uid}`, {
    headers:{
      "Authorization":`Bearer ${JSON.parse(sessionStorage.getItem("token")).jwtToken}`
    }})
      .then(response =>{
          setUsers(response.data)
          if(response.data.gender==="M"){
            setGender("Male")
          }
          if(response.data.gender==="F"){
            setGender("Female")
          }
          if(response.data.gender==="O"){
            setGender("Other")
          }

          //console.log(users)
      })

      // axios.get(`http://localhost:12000/api/UserSkill/userid?userid=${uid}`)
      // .then(response =>{
      //     // if(response.status==204){
      //     //   console.log("No skills");
      //     // }
      //     // else{
      //       setUserSkills(response.data)
      //     //console.log(users)

      // })
  },[])
 // console.log("userskills",userSkills)


  
  const deleteConfirmationModalHandler = (uid) => {
    setShowModal(true)
    setuserIdToDelete(uid)   
}

const closeModalHandler = () => {
    setShowModal(false)
}


const deleteHandler = () => {
  axios.delete(`http://localhost:12000/api/User/UserId?uid=${userIdToDelete}`, {
    headers:{
      "Authorization":`Bearer ${JSON.parse(sessionStorage.getItem("token")).jwtToken}`
    }
  })
      .then(() => {
          // setUsers(previousState => {
          //     return previousState.filter(_ => _.uid !== previousState)
          // })
          setuserIdToDelete(0)
          setShowModal(false)
          navigate(`/`)
          sessionStorage.removeItem("token")
          if(sessionStorage.getItem("Job ID")) {
            sessionStorage.removeItem("Job ID")
          }
      }).catch((error) => {
        console.log(error)
      })
}
      return (

        
  
        <section>
          <DeleteConfirmation showModal={showModal}
                                title="Delete Warning!"
                                body="Are you sure, you want to delete this profile permanently?"
                                closeModalHandler={closeModalHandler}
                                deleteHandler={deleteHandler}>
            </DeleteConfirmation>
            <header className="py-3 mb-4">
              <div className="container d-flex flex-wrap justify-content-center">
                <a href="/" className="d-flex align-items-center mb-3 mb-lg-0 me-lg-auto text-dark text-decoration-none">
                </a>
              </div>
            </header>
            <div>
              <Button className = "btn-light btn-outline-info btn-md me-5" onClick={() => navigate(`/`)}>Explore Jobs</Button>
            </div>
          <div className="row mt-5 ">
            <div className="col-md-6 mx-auto">
              <h5>Job-Seeker Profile</h5>
              <div className="profilecard">
              <table className="table profil_details">
                <tbody>
                  <tr>
                    <td style={{ borderLeft: "3px solid #9c2afc" }}>FirstName:</td>
                    <td>
                       {users.userFirstName} 
                      
          
                      
                    </td>
                   </tr>
                  
                   <tr>
                    <td style={{ borderLeft: "3px solid #e91e63" }}>MiddleName:</td>
                    <td>{users.userMiddleName} </td>
                  </tr>
                  <tr>
                    <td style={{ borderLeft: "3px solid #e91e63" }}>LastName:</td>
                    <td>{users.userLastName} </td>
                  </tr>

                  <tr>
                    <td style={{ borderLeft: "3px solid #e91e63" }}>UserName:</td>
                    <td>{users.userName} </td>
                  </tr>
                  <tr>
                    <td style={{ borderLeft: "3px solid #009688" }}>Email ID:</td>
                    <td> {users.emailId}</td>
                  </tr>
                  <tr style={{ borderLeft: "3px solid #009688" }}>
                    <td>DOB: </td>
                    <td> {Moment(users.userDOB).format("MMM Do YYYY")}  </td>
                  </tr>
                  <tr style={{ borderLeft: "3px solid #009688" }}>
                    <td>PhoneNumber: </td>
                    <td>{users.userPhoneNumber}</td>
                  </tr>
                  <tr style={{ borderLeft: "3px solid #009688" }}>
                    <td>Address: </td>
                    <td>{users.userAddress}</td>
                  </tr>
                  <tr style={{ borderLeft: "3px solid #009688" }}>
                    <td>Gender:</td>
                    <td>{gender}</td>
                  </tr>
                </tbody>
              </table>
              <br/>
              <div className="row">
              <Button variant="info" type="button" className="btn-light btn-outline-success btn-sm me-5" onClick={() => navigate(`/adduserskill`)} >  
                                        Add Skill
               </Button>
               </div>
               <div className="row">
               <Button variant="info" type="button" className="btn-light btn-outline-info btn-sm me-5 " onClick={() => navigate(`/edituser`)}>  
                          <MdEdit/>
               </Button>
               </div>
               <div className="row">
               <Button    variant="danger" type="button" className="btn-light btn-outline-danger btn-sm me-5"  onClick={() => deleteConfirmationModalHandler(users.userId)} >                                        
                                        <MdDelete/>                                        
              </Button>
               </div>
              <div className="row">
              <Button variant="info" type="button" className="btn-light offset-md-6 btn-outline-info btn-sm ms-auto"  onClick={() => navigate(`/appliedjobs`)}>  
                                        View Applied Jobs
               </Button>
              </div>
              

               

               
              </div>
            </div>
          </div>
        </section>
      )
    }

