import { Table, Button } from "react-bootstrap";
import { useEffect, useState, useRef } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import JobInfoCard from "./JobInfoCard"
import ReactPaginate from 'react-paginate';
import {AiOutlineArrowLeft, AiOutlineArrowRight} from 'react-icons/ai'

//navigate userId

export default function JobApplicationsList() {

    const userId = Number(JSON.parse(sessionStorage.getItem("token")).userId)

    const[jobApplications, setJobApplications] = useState([])
    const [jobs,setJobs] = useState([])
    const [jobIds,setJobIds] = useState([])
    const [pageNumber,setPageNumber]=  useState(0)

    const applicationsPerPage = 3
    const applicationVisited = pageNumber * applicationsPerPage

    const pageCount = Math.ceil(jobApplications.length / applicationsPerPage);

    const changePage = ({selected}) => {
          setPageNumber(selected);
    };

    const displayApplications = () =>{ 
          return jobApplications.slice(applicationVisited, applicationVisited+applicationsPerPage)
          .map(jobApplication => (
            <>
              <JobInfoCard 
              key={jobApplication.id}
              j={jobApplication}
              // jobId={jobApplication.jobId}
             //  jobName={j.jobName}
             //  jobLocation={j.jobLocation}
             //  companyName={j.companyName}
             //  jobDescription={j.jobDescription}
             //  applicationStatus={j.applicationStatus === "Submitted"?"blue" : j.applicationStatus === "Approved"?"green" : j.applicationStatus === "Rejected"?"red" : null}

         />
         </>
          ))
        }
    
    const ApplicantJobs = () => {
      axios.get(`http://localhost:12000/api/JobApplicant/ListUserApplications?userid=${userId}`, {
        headers:{
          "Authorization":`Bearer ${JSON.parse(sessionStorage.getItem("token")).jwtToken}`
        }
      })
           .then((response) =>{
            setJobApplications(response.data)
            console.log("something",response.data)
            const JobIdList = []
            for(let i=0; i<response.data.length; i++) {
              JobIdList.push(response.data[i].jobId)
            }
            console.log(JobIdList)
            if(JobIdList.length === 0) {
              setJobs(`userId-${userId} doesn't exist`)
            }
            else{
              axios.get(`http://localhost:12000/api/Job/jobIdList`, {
                headers:{
                  "Authorization":`Bearer ${JSON.parse(sessionStorage.getItem("token")).jwtToken}`,
                  "jobIdList" : JobIdList
                }
              }).then((response)=>{
                setJobApplications(response.data)
                // console.log(response.data)
                console.log(response.data, "actual data")
                setJobs(`Jobs applied by userId=${userId} retrieved sucesfully`)
              }).catch((error) =>{
                console.log(error)
                setJobs(`error -${userId}`)
              })
            }
           }).catch((error) => {
            console.log(error)
            setJobs(`error -${userId}`)
           })
    }

    useEffect(() =>{
      ApplicantJobs()
    },[])

    const navigate = useNavigate()

    return (
        <>
         
        <section>
             <div className="container">
              <div className="navbar">
                        <h4>Jobs Applied</h4>
                      </div>
                      <div>
                        { jobApplications?.length > 0 ?  
                        (
                          <>{displayApplications()}
                      <br/>
                      <br/>
                      <ReactPaginate
                        activeClassName={'item activeradius '}
                        breakClassName={'item break-me '}
                        breakLabel={'...'}
                        containerClassName={'pagination'}
                        disabledClassName={'disabled-page'}
                        marginPagesDisplayed={2}
                        nextClassName={"item next "}
                        nextLabel={<AiOutlineArrowRight style={{ fontSize: 18, width: 150 }} />}
                        onPageChange={changePage}
                        pageCount={pageCount}
                        pageClassName={'item pagination-page '}
                        pageRangeDisplayed={2}
                        previousClassName={"item previous"}
                        previousLabel={<AiOutlineArrowLeft style={{ fontSize: 18, width: 150 }} />}
                      /> 
                      </>) : (
                        <>
                        <pre className="col-sm-12 mb-3 text-center" style={{fontSize:"20px"}}>You have not applied to any jobs yet.</pre>
                    </>
                      )
                  }
                      </div>
                      <div className="text-center">
                      <Button type="button" className="btn-light btn-outline-dark btn-md ms-1" onClick={()=>navigate('/userprofile')}>
                        Back
                        </Button>
                      </div>
                </div> 
                  
                 {/* <Button variant="primary" type="button" onClick={() => navigate("/applicantList")}>list Applicants</Button> */}
            </section>
        </>

    )
}
