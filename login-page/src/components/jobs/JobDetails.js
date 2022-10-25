import Moment from "moment"
import { useEffect, useState } from "react"
import axios from 'axios';
import ListSkills from "./ListSkills";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

export default function JobDetails(){
    const [jobTable,setJobTable]=useState([])
    const [skillTable,setSkillTable]=useState([])
    const navigate = useNavigate()
    // const [skill,setSkill]=useState([])
 
    // const jobId=3;
    // const {jobId}=useParams()
    const jobId = Number(sessionStorage.getItem("Job ID"))
    // const userId=Number(JSON.parse(sessionStorage.getItem("token")).userId);

    const applyHandler = () => {
      if(sessionStorage.getItem("token")) {
        if(JSON.parse(sessionStorage.getItem("token")).role == "JobSeeker") {
          navigate(`/jobapply`)
        }
        else if(JSON.parse(sessionStorage.getItem("token")).role == "Employer") {
          alert("You have to be a Job-Seeker to apply to jobs. Create a new account if you want this functionality.")
        }
      }
      else {
        navigate(`/login`)
      }
    }

    // const applyHandler=()=>{
    //     const payload = {
    //         applicationStatus:"submitted",
    //         jobId:jobId ,
    //         // userId: userId,
            
    //     }

    //     console.log("this is the payload",payload)
        
    //     axios.post("http://localhost:12000/api/JobApplicant", payload)
    //         .then((res) => {
    //             console.log("statusithaan mooneee",res.status)
    //             //navigate("/")
    //         })
    // }
    useEffect(() => {

        axios.get(`http://localhost:12000/api/Job/jobId?jobId=${jobId}`)
            .then(response => {
                setJobTable(response.data)
            })
        axios.get(`http://localhost:12000/api/JobSkill/GetByJobId?jobId=${jobId}`)
            .then(response => {
                console.log(response.data);
                setSkillTable(response.data);
                
            })
            console.log("size=",skillTable.length)
            
            // console.log("skillId",skillTable);
            // const skillId=skillTable.skillId;
            
    },[])


        // const skillHandler=(id)=>{
        //      axios.get(`http://localhost:12000/api/Skill/skillId?skillId=${id}`)
        //     .then(res => {
        //     console.log(res.data)
        //     setSkill(res.data)
        //     })
        // }


                

        // console.log(bla);
    return(
        <div>
        
        <main >
          {/* Hero Area Start*/}
          <div className="slider-area">
            <div className="single-slider section-overly slider-height2 d-flex align-items-center" data-background="assets/img/hero/about.jpg">
              <div className="container">
                <div className="row">
                  <div className="col-xl-12">
                    <div className="hero-cap text-center">
                      <h2>{jobTable.jobName}</h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Hero Area End */}
          {/* job post company Start */}
          <div className="job-post-company pt-120 pb-120 card shadow-lg">
            <div className="container">
              <div className="row justify-content-between">
                {/* Left Content */}
                <div className="col-xl-7 col-lg-8">
                  {/* job single */}
                  <div className="single-job-items mb-50">
                    <div className="job-items">
                      <div className="company-img company-img-details">
                        <a href="#"><img src="assets/img/icon/job-list1.png" alt="" /></a>
                      </div>
                      <div className="job-tittle">
                        <a href="#">
                          <h4>{jobTable.jobName}</h4>
                        </a>
                        <ul>
                          {/* <li>Creative Agency</li> */}
                          <li><i className="fas fa-map-marker-alt" />{jobTable.jobLocation}</li>
                          <li>{jobTable.minPackage} - {jobTable.maxPackage} LPA</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  {/* job single End */}
                  <div className="job-post-details">
                    <div className="post-details1 mb-50">
                      {/* Small Section Tittle */}
                      <div className="small-section-tittle">
                        <h4>Job Description</h4>
                      </div>
                      <p>{jobTable.jobDescription}</p>
                    </div>
                    <div className="post-details2  mb-50">
                      {/* Small Section Tittle */}
                      <div className="small-section-tittle">
                        <h4>Required Knowledge, Skills, and Abilities</h4>
                        <ul>
                          {
                              skillTable?.length > 0
                              ?(
                                <>
                                {
                                  skillTable.map((st)=>(
                                    <li key={st.jobSkillId}><ListSkills id={st.skillId} /></li>
                                    ))
                                    
                                }</>
                                ) :
                                (
                                  <>No skills found</>
                                )
                          }
                          
                            
                        </ul>
                      </div>
                    </div>
                   
                  </div>
                </div>
                {/* Right Content */}
                <div className="col-xl-4 col-lg-4">
                  <div className="post-details3  mb-50 shadow-lg">
                    {/* Small Section Tittle */}
                    <div className="small-section-tittle">
                      <h4>Job Overview</h4>
                    </div>
                    <ul>
                        <li>Posted date : <span>{Moment(jobTable.jobPostDate).format("MMM Do YYYY")}</span></li>
                        <li>Location : <span>{jobTable.jobLocation}</span></li>
                        <li>Vacancy : <span>{jobTable.openings}</span></li>
                        <li>Job nature : <span>{jobTable.jobType}</span></li>
                        <li>Salary : <span>{jobTable.minPackage} - {jobTable.maxPackage} LPA</span></li>
                    </ul>
                    <div className="apply-btn2">
                      <a href="#" className="btn btn-outline-primary" onClick={() => {applyHandler()}
                        }>Apply Now</a>
                      {/* onClick={applyHandler} */}
                    </div>
                  </div>
                  <div className="post-details4  mb-50">
                    {/* Small Section Tittle */}
                    {/* <div className="small-section-tittle">
                      <h4>Company Information</h4>
                    </div>
                    <span>Company Name</span>
                    <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
                    <ul>
                      <li>Name: <span>Name </span></li>
                      <li>Web : <span> webaddress.com</span></li>
                      <li>Email: <span>email@gmail.com</span></li>
                    </ul> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* job post company End */}
        </main>
        <br></br>
        <div className="text-center">
            <Button type="button" className="btn-light btn-outline-dark btn-md ms-auto" onClick={() => navigate(`/`)}>
                        Back	
                      </Button>
            </div>
      </div>
    )
    
}


    
// <header>
// {/* Header Start */}
// <div className="header-area header-transparrent">
//   <div className="headder-top header-sticky">
//     <div className="container">
//       <div className="row align-items-center">
//         <div className="col-lg-3 col-md-2">
//           {/* Logo */}
//           <div className="logo">
//             <a href="#"><img src="assets/img/logo/ZENSARTECH.png" alt="" /></a>
//           </div>  
//         </div>
//         <div className="col-lg-9 col-md-9">
//           <div className="menu-wrapper">
//             {/* Main-menu */}
//             <div className="main-menu">
//               <nav className="d-none d-lg-block">
//                 <ul id="navigation">
//                   <li><a href="job_listing.html">Find a Jobs </a></li>
//                 </ul>
//               </nav>
//             </div>          
//             {/* Header-btn */}
//             <div className="header-btn d-none f-right d-lg-block">
//               <a href="#" className="btn head-btn1">Register</a>
//               <a href="#" className="btn head-btn2">Login</a>
//             </div>
//           </div>
//         </div>
//         {/* Mobile Menu */}
//         <div className="col-12">
//           <div className="mobile_menu d-block d-lg-none" />
//         </div>
//       </div>
//     </div>
//   </div>
// </div>
// {/* Header End */}
// </header>