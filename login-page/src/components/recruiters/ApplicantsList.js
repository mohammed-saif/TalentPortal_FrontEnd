import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import ApplicantCard from "./ApplicantCard";
import { Moment } from "moment/moment";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactPaginate from "react-paginate";
import {AiOutlineArrowLeft, AiOutlineArrowRight} from 'react-icons/ai'
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


export default function ApplicantsList() {

  const jobId = sessionStorage.getItem("Job ID")
  const [jobDetails, setJobDetails] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [applicantList, setApplicantList] = useState([]);
  // const [applicantDetails, setApplicantDetails] = useState([])

  const navigate = useNavigate()
  const applicantsPerPage = 5;
  const applicantsVisited = pageNumber * applicantsPerPage;

  const pageCount = Math.ceil(applicantList.length / applicantsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const displayApplicants = () => {
    return applicantList
    .slice(applicantsVisited, applicantsVisited + applicantsPerPage)
    .map((applicant) => {
      return (
        <>
          <ApplicantCard
            key={applicant.userId}
            u={applicant}
            UserId={applicant.UserId}
          />
        </>
      );
    });
  } 

  useEffect(() => {
    axios
      .get(`http://localhost:12000/api/Job/jobId?jobId=${jobId}`, {
        headers:{
          "Authorization":`Bearer ${JSON.parse(sessionStorage.getItem("token")).jwtToken}`
      }
      })
      .then((response) => {
        setJobDetails(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  });
  // jId = 4; //remove this after dynamic implimentation
  const JobApplicantsList = () => {
    axios.get(`http://localhost:12000/api/JobApplicant/ListApplicantsbyJobId?jobid=${jobId}`, {
          headers:{
            "Authorization":`Bearer ${JSON.parse(sessionStorage.getItem("token")).jwtToken}`
        }
        })
      .then((response) => {
        setApplicantList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    JobApplicantsList();
  }, []);

  return (
    <>
      <section>
        <div className="card mt-3 c-card">
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
                <div className="job-role">
                  <h5>{jobDetails.jobName}</h5>
                </div>
                <div className="job-info-head">
                  <ul className="nav">
                    <li className="nav-item">
                      <span className="nav-link disabled">
                        {jobDetails.companyName}
                      </span>
                    </li>
                    <li className="nav-item">
                      <span
                       className="nav-link disabled">
                        {" "}
                        <i
                          className="fa fa-map-marker"
                          style={{ fontSize: 16 }}
                        />{" "}
                        {jobDetails.jobLocation}
                      </span>
                    </li>
                    <li className="nav-item">
                      <span className="nav-link disabled">
                        <i className="fa fa-rupee" style={{ fontSize: 16 }} />{" "}
                        {jobDetails.minPackage} - {jobDetails.maxPackage} LPA
                      </span>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link disabled">
                        <i
                          className="fa fa-calendar"
                          style={{ fontSize: 16 }}
                        />
                        {/* {Moment(jobDetails.jobPostDate).format("MMM Do YYYY")} */}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="navbar">
            <h4>Jobs Applicants</h4>
          </div>
          <div>
            {
              applicantList?.length > 0 ?
              ( <>
                {displayApplicants()}
                <br />
                <br />
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
            </>
              ) : (
                <>

                                <pre className="col-sm-12 mb-3 text-center" style={{fontSize:"20px"}}> No Jobs Applicants found!...</pre>

                            </>
              )
          }       


                {/* {displayApplicants}
                <br />
                <br />
                <ReactPaginate
                  previousLabel={"<<"}
                  nextLabel={">>"}
                  pageCount={pageCount}
                  onPageChange={changePage}
                  containerClassName={"paginationBttns"}
                  previousLinkClassName={"previousBttn"}
                  nextLinkClassName={"nextBttns"}
                  disabledClassName={"paginationDisabled"}
                  activeClassName={"paginationActive"}
            /> */}
            
          </div>
        </div>
        <div className="text-center">
                      <Button type="button" className="btn-light btn-outline-dark btn-md ms-1" onClick={()=>navigate('/recruiter')}>
                        Back
                        </Button>
                      </div>
      </section>
    </>
  );
}
