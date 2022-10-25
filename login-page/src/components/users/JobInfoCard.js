import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DeleteConfirmation from "./DeleteApplication";
import "bootstrap/dist/css/bootstrap.min.css";
// import JobApplicationsList from "./JobApplicationsList";
import {AiFillEdit,AiFillDelete} from "react-icons/ai"
import { Button } from "react-bootstrap";
import { IoLocationSharp } from 'react-icons/io5'

export default function JobInfoCard({ j }) {

  const userId = Number(JSON.parse(sessionStorage.getItem("token")).userId)
  const ButtonStyle = { margin: "0px 10px" };
  const [color, setColor] = useState({color: "blue"});
  const [jobApplications, setJobApplications] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [applicationToDelete, setApplicationToDelete] = useState(0);
  const [applicationUserIdToDel, setApplicationUserIdToDel] = useState(1);

  const navigate = useNavigate();
  console.log("j", j);
  useEffect(() => {
    axios.get(`http://localhost:12000/api/JobApplicant/ApplicationStatus?userid=${userId}&jobid=${j.id}`, {
        headers:{
          "Authorization":`Bearer ${JSON.parse(sessionStorage.getItem("token")).jwtToken}`
        }
      }) //chage userid to dynamic
      .then((response) => {
        console.log(j.id)
        console.log("Im called by then")
        setJobApplications(response.data);
        console.log(response.data);
      }).catch((error) => {
        console.log(error, "job card get")
        console.log(j.id)
        console.log("Im called by error")
      })
  }, []);


  const deleteConfirmationModalHandler = (userId, jobId) => {
    setShowModal(true);
    setApplicationToDelete(j.id);
  };

  const closeModalHandler = () => {
    setShowModal(false);
  };

  const deleteHandler = () => {

    const payload = {
      userId: applicationUserIdToDel, 
      jobId: applicationToDelete

    }
    axios.delete(`http://localhost:11000/api/JobApplicant?userid=${applicationUserIdToDel}&jobid=${applicationToDelete}`, {
      headers:{
        "Authorization":`Bearer ${JSON.parse(sessionStorage.getItem("token")).jwtToken}`
      }, 
      data: payload
    })
      .then(() => {
        setJobApplications((previousState) => {
          return previousState.filter((_) => _.jobId !== previousState);
        });
        setApplicationToDelete(0);
        setShowModal(false);
        window.location.reload(true);
      });
  };

  const colorHandler = () =>{
    if(jobApplications.applicationStatus == 'submitted'){
        setColor();
    }
    else if(jobApplications.applicationStatus == 'approved'){
        setColor({color:'green'});
    }
    else {
        setColor({color:'red'});
    }
  };


  return (
    <>
      <DeleteConfirmation
        showModal={showModal}
        title="Delete Warning!"
        body="Are you sure, you want to delete this application??"
        closeModalHandler={closeModalHandler}
        deleteHandler={deleteHandler}
      ></DeleteConfirmation>
      
      
      <div className="card mt-3 c-card" key={j.id}>
        <div className="card-body">
          <div className="row scroll-sm">
            <div className="col-md-2 col-sm-2">
              <div className="company-logo">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfxOmhBy9N06InPK-TwMk9abz-EPgzF6GmLrG4OfUeqrLem5_uFIOx2Fpesfjrw94ETA&usqp=CAU"
                  alt="logo"
                  width={100}
                />
              </div>
            </div>
            <div className="col-md-8 col-sm-8">
              <div className="row">
                <div className="col-md-6 job-role">
                  <h5>{j.jobName}</h5>
                </div>
                <div className="col-md-6 job-role">
                  <h5 onChange={colorHandler} style={color}>{jobApplications.applicationStatus}</h5>
                </div>
              </div>

              <div className="job-info-head">
                <ul className="nav">
                  <li className="nav-item">
                    <span className="nav-link disabled">{j.companyName}</span>
                  </li>
                  <li className="nav-item">
                    <span className="nav-link disabled">
                      {" "}
                      <i
                        className="fa fa-map-marker"
                        style={{ fontSize: "16px" }}
                      />{" "}
                      <IoLocationSharp size={18}/>{j.jobLocation}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-2 col-sm-2">
              <div className="job-apply">
               
                  {/* <AiFillEdit class="fa-solid fa-camera fa-1.5x"/> */}
       
                 <Button className="btn-light btn-outline-danger"><AiFillDelete class="fa-solid fa-camera fa-1x"
                  onClick={() => deleteConfirmationModalHandler(userId, j.id)}
                /></Button> 
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
