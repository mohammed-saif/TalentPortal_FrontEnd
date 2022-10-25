import axios from "axios";
import { useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import JobCard from "./JobCard";
import {BiSearch} from 'react-icons/bi';
import {AiOutlineArrowLeft, AiOutlineArrowRight} from 'react-icons/ai'
import ReactPaginate from 'react-paginate'

const PER_PAGE = 5;

export default function AllJobsList(){

    const [currentPage, setCurrentPage] = useState(0);
    const [jobs,setJobs] = useState([])
    const [searchText, setSearchText] = useState("")
    const [pageState, setPageState] = useState("true")

    const navigate = useNavigate()


    useEffect(() => {

        const PROTOCOL = "http"
        const PORT = 12000;
    
        const baseUrl = `${PROTOCOL}://${window.location.hostname}:${PORT}/`

        axios.get(baseUrl+"api/Job")
        .then(response =>{
            setJobs(response.data)
            console.log("get all jobs api is called")
        }).catch((error) => {
            setPageState("unavailable")
        })
    },[pageState])


    const searchJobs = (text) => {
        const PROTOCOL = "http"
        const PORT = 12000;
    
        const baseUrl = `${PROTOCOL}://${window.location.hostname}:${PORT}/`

        axios.get(baseUrl+`api/Job/searchText?searchText=${text}`)
        .then(response =>{
            setPageState("false")
            setJobs(response.data)
            console.log("get jobs by search text api is called")
        }).catch((error) => {
            setJobs([])
            setPageState("unavailable")
        })
    }

    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage);
    }

    const offset = currentPage * PER_PAGE;

    const pageCount = Math.ceil(jobs.length / PER_PAGE);


    const currentPageData = (offset) => {
        return jobs
        .slice(offset, offset + PER_PAGE)
        .map((job) => 
            (
                <JobCard 
                    job={job}
                    key={job.id}
                />
            ))
    }

    return (
        <>
        <section >
        <h1 className = "text-center">Talent Portal</h1> 
        <div className="row mt-5">
            <div className="col-md-6 mx-auto">
                <div className="input-group mb-3">
                    <input 
                        type="text" 
                        className="form-control" 
                        aria-label="search" 
                        placeholder="Search Jobs..." 
                        value={searchText} 
                        onChange={(e) => setSearchText(e.target.value)}
                        onKeyPress={event => {
                            if (event.key === 'Enter') {
                                if(searchText==="")
                                {
                                    setPageState("true")
                                    navigate('/')
                                }
                                else
                                {   setPageState("false")
                                    searchJobs(searchText)}
                            }
                          }}
                    />
                    <span className="input-group-text" 
                        onClick={() => {
                                if(searchText==="")
                                {
                                    setPageState("true")
                                    navigate('/')
                                }
                                else
                                {   setPageState("false")
                                    searchJobs(searchText)}
                                }
                        }>
                        <BiSearch 
                            src="svg-icon svg-icon-2"
                            alt="search"
                            size="25"
                        />
                    </span>
                  </div>
            </div>
          </div>

            <div className="container">
                {
                    pageState?.includes("unavailable")
                    ?(
                        <>
                                <pre className="col-sm-12 mb-3 text-center" style={{fontSize:"20px"}}>Our service is currently down... Kindly come back later</pre>
                            </>
                       
                    ) :
                    (
                        jobs?.length > 0
                        ?(
                            <>
                               {currentPageData(offset)}
                               <br /><br />

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
                            </>
                        ) : (
                            <>
                                <pre className="col-sm-12 mb-3 text-center" style={{fontSize:"20px"}}> No Jobs Found!... Pls search any other jobs</pre>
                            </>
                            
                            
                        )
                    )
                    
                }
            </div>
            <br />
        </section>

        <br /><br /><br />
        </>
        
    );
}


