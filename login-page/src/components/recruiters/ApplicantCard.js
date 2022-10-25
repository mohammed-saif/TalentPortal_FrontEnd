import axios from "axios";
import React from "react";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
// import Select from "react-select";
import { useNavigate } from "react-router-dom";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import {GrView} from "react-icons/gr";
import {Button} from 'react-bootstrap';

function ApplicantCard({ u }) {

  const userId = Number(JSON.parse(sessionStorage.getItem("token")).userId)
  const jobId = sessionStorage.getItem("Job ID")
  const [jobApplicants, setJobApplicants] = useState([]);
  const [appStatus, setAppStatus] = useState([]);
  const [applicantSkill, setApplicantSkill] = useState([]);
  const[resume, setResume] = useState("")

  useEffect(() => {
    axios.get(`http://localhost:12000/api/UserSkill/userid?userid=${userId}`, {
        headers:{
          "Authorization":`Bearer ${JSON.parse(sessionStorage.getItem("token")).jwtToken}`
      }
      })
      .then((response) => {
        setApplicantSkill(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const navigate = useNavigate();

  //const applicationStatus = useRef("");
  const[applicationStatus,setApplicationStatus]=useState("")

  useEffect(() => {
    axios.get(`http://localhost:12000/api/JobApplicant/ApplicationStatus?userid=${u.userId}&jobid=${jobId}`, {
      headers:{
        "Authorization":`Bearer ${JSON.parse(sessionStorage.getItem("token")).jwtToken}`
    }
    }).then((r) => {
        setAppStatus(r.data);
        console.log(r.data);
        setApplicationStatus(r.data.applicationStatus)
        setResume(r.data.resume)
      }).catch((error)=>{
        console.log("First get",error)
      });
  }, []);

  const handleSelect=(e)=>{
    console.log("status updated"+e);
    appStatus.applicationStatus = e;
    const payload = {
              userId : userId,
              jobId : jobId,
              applicationStatus : appStatus.applicationStatus,
              resume: resume
    }
    console.log("this is application status"+appStatus.applicationStatus)

    axios.put(`http://localhost:12000/api/JobApplicant/UpdateJobAppStatus?UserId=${u.userId}&JobId=${jobId}&newApplicationStatus=${appStatus.applicationStatus}`, payload, {
      headers:{
        "Authorization":`Bearer ${JSON.parse(sessionStorage.getItem("token")).jwtToken}`
    }
    })
       .then(() => {
         window.location.reload(true)
       }).catch((error) => {
          console.log("card put", error)
       })
  }

  useEffect(() => {
    axios
      .get(`http://localhost:12000/api/User/UserId?uid=${u.userId}`, {
        headers:{
          "Authorization":`Bearer ${JSON.parse(sessionStorage.getItem("token")).jwtToken}`
      }
      }) 
      .then((response) => {
        setJobApplicants(response.data);
        console.log(response.data);
      });
  }, []);

  return (
    <>
      <div className="mt-3 c-card" key={u.userId}>
        <div className="px-2 p-2">
          <table className="table applicantTable">
            <tbody>
              <tr className="applicantgrid">
                <td>
                  Applicant ID
                  <span className="nav-link p-0 disabled">{u.userId}</span>
                </td>
                <td>
                  Applicant Name
                  <span className="nav-link p-0 disabled">
                    {jobApplicants.userFirstName + " " + jobApplicants.userLastName}
                    {/* {console.log(
                      "Im printing inside apllicant name" + u.userFirstName
                    )} */}
                  </span>
                </td>
                <td>
                  <b>View Resume</b>
                  <ul>
                  <a href={appStatus.resume} target="_blank">
                    <Button className="btn-light btn-outline-info text-center">
                    <GrView/>
                  </Button>
                  </a></ul>
                </td>
                {/* <td>
                      JOb ID
                      <span className="nav-link p-0 disabled">JOB292</span>
                    </td> */}
                <td>
                  <DropdownButton variant="info"
                    alignRight
                   // title="Dropdown right"
                    title={applicationStatus}
                    id="dropdown-menu-align-right"
                    onSelect={handleSelect}
                  >
                    <Dropdown.Item eventKey="Submitted">Submitted</Dropdown.Item>
                    <Dropdown.Item eventKey="Rejected">Rejected</Dropdown.Item>
                    <Dropdown.Item eventKey="Selected">Selected</Dropdown.Item>
                    <Dropdown.Divider />
                    {/* <Dropdown.Item eventKey="some link">
                      some link
                    </Dropdown.Item> */}
                  </DropdownButton>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default ApplicantCard;
