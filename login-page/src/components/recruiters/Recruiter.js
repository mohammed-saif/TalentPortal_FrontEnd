import { Button} from "react-bootstrap";
import {useEffect, useState, useRef} from "react";
import axios from "axios";
import Moment from 'moment';
import RecruiterCard from "./RecruiterCard";
import {AiOutlineArrowLeft, AiOutlineArrowRight} from 'react-icons/ai';
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";

const PER_PAGE = 2

export default function RecruiterList() {

    const navigate = useNavigate()

    const searchText = useRef("")

    const[recruiter, setRecruiter] = useState([])
    const[recruiterJobs, setRecruiterJobs] = useState([])
    const[recruiterState, setRecruiterState] = useState("")
    const[jobListState, setJobListState] = useState([])
    const[currentPage, setCurrentPage] = useState(0)
    const[jobToDelete, setJobToDelete] = useState(0)
    const[showModal, setShowModal] = useState(false)
    const UserId = Number(JSON.parse(sessionStorage.getItem("token")).userId)
    

    const JobsPostedByRecruiter = () => {
        
        axios.get(`http://localhost:12000/api/Recruiter/Id?UserId=${UserId}`, {
            headers:{
                "Authorization":`Bearer ${JSON.parse(sessionStorage.getItem("token")).jwtToken}`
            }
        })
        .then((response) => {
            setRecruiter(response.data)
            const JobIdList = []
            for(let i=0; i<response.data.length; i++) {
                JobIdList.push(response.data[i].jobId)
            }
            console.log(JobIdList)
            if(JobIdList.length === 0) {
                setRecruiterState(`UserId - ${UserId} doesn't exist`)
            }
            else {
                axios.get(`http://localhost:12000/api/Job/jobIdList`, {
                    headers:{
                        "Authorization":`Bearer ${JSON.parse(sessionStorage.getItem("token")).jwtToken}`,
                        "jobIdList":JobIdList
                        
                    }
                }).then((response) => {
                    setRecruiterJobs(response.data)
                    setJobListState(response.data)
                    console.log(response.data)
                    setRecruiterState(`Jobs posted by UserId - ${UserId} retrieved successfully`)
                }).catch((error) => {
                    console.log(error)
                    setRecruiterState(`Some error occured while trying to get the jobs posted by UserId - ${UserId}`)
                })
            }

        }).catch((error) => {
            console.log(error)
            setRecruiterState(`Some error occured while trying to get JobId's posted by UserId - ${UserId}`)
        })
    }

    const SearchJobs = () => {
        const searchedJobs = []
        for(let i=0; i<recruiterJobs.length; i++) {
            if(recruiterJobs[i].jobName.toLowerCase().includes(searchText.current.value.toLowerCase()) || recruiterJobs[i].jobDescription.toLowerCase().includes(searchText.current.value.toLowerCase()) || recruiterJobs[i].jobLocation.toLowerCase().includes(searchText.current.value.toLowerCase())) {
                searchedJobs.push(recruiterJobs[i])
            }
        }
        console.log(searchedJobs)
        setJobListState(searchedJobs)
    }

    useEffect(() => {
        JobsPostedByRecruiter()
    }, [])

    function handlePageClick({selected: selectedPage}) {
        setCurrentPage(selectedPage)
    }

    const offset = currentPage * PER_PAGE

    const pageCount = Math.ceil(jobListState.length / PER_PAGE)

    const currentPageData = (offset) => {
        return jobListState
        .slice(offset, offset + PER_PAGE)
        .map((j) => (
            <RecruiterCard j={j} key={j.id}/> 
        ))
    }


    return ( 
        <>

            <header className="py-3 mb-4">
                <div className="container d-flex flex-wrap justify-content-center">
                <a href="/" className="d-flex align-items-center mb-3 mb-lg-0 me-lg-auto text-dark text-decoration-none">
                </a>
                </div>
            </header>
            <section>
                <div className="row mt-5">
                    <div className="col-md-6 mx-auto">
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                className="form-control"
                                aria-label="search"
                                placeholder="Search posted jobs"
                                ref={searchText}/>
                                <div className="input-group-append">
                                    <button className="btn btn-outline-secondary" type="button" onClick={SearchJobs}>Search</button>
                                </div>
                            
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="tab-content">
                        <div id="job_deatils" className="container tab-pane active">
                        <br />
                        <div className="job_deatilsTab">
                            <div className="col-md-12 text-end">
                            <Button type="Button" className="btn-light btn-outline-primary  btn-md" onClick={() => navigate('/addjob')}>
                                Post a new job
                            </Button>
                            </div>
                            {/* {
                            jobListState.map((j) => (
                                <RecruiterCard j={j} key={j.id}/>
                            ))
                            } */}
                            {
                                jobListState?.length > 0 ?
                                (
                                <>
                                {currentPageData(offset)}
                                    <br></br>
                                
                                    
                                    <ReactPaginate
                                        activeClassName={'item activeradius '}
                                        breakClassName={'item break-me '}
                                        breakLabel={'...'}
                                        containerClassName={'pagination'}
                                        disabledClassName={'disabled-page'}
                                        marginPagesDisplayed={2}
                                        nextClassName={"item next "}
                                        nextLabel={<AiOutlineArrowRight style={{ fontSize: 18, width: 150 }} />}
                                        onPageChange={handlePageClick}
                                        pageCount={pageCount}
                                        pageClassName={'item pagination-page '}
                                        pageRangeDisplayed={2}
                                        previousClassName={"item previous"}
                                        previousLabel={<AiOutlineArrowLeft style={{ fontSize: 18, width: 150 }} />}
                                    />
                                </> ) :
                                (
                                    <pre className="col-sm-12 mb-3 text-center">No jobs posted till now</pre>
                                )
                            }
                            
                            
                            
                        </div>
                        </div>
                    </div>
                </div>
                

             </section>
        
        </>
        
    )
}