import { Button} from "react-bootstrap";
import {useRef, useState} from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function AddJob() {

    const navigate = useNavigate()

    const jobName = useRef("")
    const jobDescription = useRef("")
    const jobType = useRef("")
    const companyName = useRef("")
    const companySize = useRef("")
    const jobLocation = useRef("")
    const openings = useRef("")
    const minPackage = useRef("")
    const maxPackage = useRef("")
    const minExp = useRef("")
    const perk = useRef("")
    // const jobPostDate = useRef("")
    const status = useRef("")

    const[jobPostState, setJobPostState]= useState("You have not posted a job yet")
    const[jobNameCheck, setJobNameCheck] = useState(true)
    const[jobDescriptionCheck, setJobDescriptionCheck] = useState(true)
    const[minCheck, setMinCheck] = useState(true)
    const[maxCheck, setMaxCheck] = useState(true)
    

    const PostJob = () => {

        const payload = {
            jobName:jobName.current.value,
            jobDescription: jobDescription.current.value,
            jobType: jobType.current.value,
            companyName: "Zensar Technologies",
            companySize: companySize.current.value,
            jobLocation: jobLocation.current.value,
            openings: openings.current.value ? Number(openings.current.value) : 0,
            minPackage: minPackage.current.value ? Number(minPackage.current.value) : 0,
            maxPackage: maxPackage.current.value ? Number(maxPackage.current.value) : 0,
            // minPackage: minPackage.current.value,
            // maxPackage: maxPackage.current.value,
            minExp: minExp.current.value ? Number(minExp.current.value) : 0,
            perk: perk.current.value,
            // jobPostDate: jobPostDate.current.value,
            status: status.current.value,
            // countOfApplicants: countOfApplicants.current.value,
            // openApplicationCount: openApplicationCount.current.value
        }


        axios.post("http://localhost:12000/api/Job", payload, {
            headers:{
                "Authorization":`Bearer ${JSON.parse(sessionStorage.getItem("token")).jwtToken}`
            }
        })
        .then((response) => {

            const recPayload = {
                userId: Number(JSON.parse(sessionStorage.getItem("token")).userId),
                jobId: response.data.id
            }

            axios.post(`http://localhost:12000/api/Recruiter`, recPayload, {
                headers:{
                    "Authorization":`Bearer ${JSON.parse(sessionStorage.getItem("token")).jwtToken}`
                }
            }).then((response) => {
                console.log('rec posted successfully', recPayload)
            }).catch((error) => {
                console.log("rec", error)
            })
            setJobPostState("Job posted succsessfully")
            sessionStorage.setItem("Job ID", response.data.id)
            navigate(`/addjobskill/new`)
        }).catch((error) => {
            setJobPostState("Not Success")
            console.log(payload)
            if(jobName.current.value === "") {
                setJobNameCheck(false)
            }
            if(jobDescription.current.value === "") {
                setJobDescriptionCheck(false)
            }
            if(minPackage.current.value === "") {
                setMinCheck(false)
            }
            if(maxPackage.current.value === "") {
                setMaxCheck(false)
            }
        })
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
                <div className="container">
                <div className="c-card mt-3 p-5 card shadow-lg">
                    <h1 className="fs-4 card-title fw-bold mb-4">Posting a new job</h1>
                    <form
                    method="POST"
                    className="needs-validation"
                    noValidate=""
                    autoComplete="off"
                    >
                    <div className="mb-3">
                        <label
                        className="mb-2 text-muted col-form-label-sm"
                        htmlFor="Company_Name"
                        >
                        Company Name
                        </label>
                        <input
                        id="title"
                        type="text"
                        className="form-control form-control-sm"
                        name="title"
                        placeholder=" Enter Company Name"
                        autoFocus
                        ref={companyName}
                        />
                    </div>
                    <div className="mb-3">
                        <label
                        className="mb-2 text-muted col-form-label-sm"
                        htmlFor="Job_Title"
                        >
                        Job Title<p style={{color:"red", display:"inline"}}>*</p>
                        </label>
                        <input
                        id="Job_Title"
                        type="text"
                        className="form-control form-control-sm"
                        name="Job_Title"
                        placeholder=" Enter Job Title"
                        ref={jobName}
                        onChange={() => setJobNameCheck(true)}
                        />
                        <div className="invalid-feedback">Job Title is invalid</div>
                        <pre className="col-sm-12 mb-1"><i style={{color:"red"}}>{jobNameCheck ? "" : "Job Name is required"}</i></pre>
                    </div>
                    <div className="col-md-6">
                            <div className="mb-3">
                                <label
                                className="mb-2 text-muted col-form-label-sm"
                                htmlFor="Company_Name"
                                >
                                Job Type
                                </label>
                                <select
                                className="form-select form-select-sm"
                                aria-label="Company Size"
                                ref={jobType}
                                >
                                <option selected="" value="full-time">Full-Time</option>
                                {/* <option value="full-time">Full Time</option> */}
                                <option value="part-time">Part Time</option>
                                <option value="internship">Intership</option>
                                </select>
                            </div>
                        </div>
                    <div className="mb-3">
                        <label
                        className="mb-2 text-muted col-form-label-sm"
                        htmlFor="Description"
                        >
                        Description<p style={{color:"red", display:"inline"}}>*</p>
                        </label>
                        <div className="form-floating">
                        <textarea
                            className="form-control form-control-sm"
                            placeholder="Leave a comment here"
                            id="floatingTextarea2"
                            style={{ height: 50 }}
                            defaultValue={""}
                            ref={jobDescription}
                            onChange={() => setJobDescriptionCheck(true)}
                        />
                        </div>
                        <pre className="col-sm-12 mb-1"><i style={{color:"red"}}>{jobDescriptionCheck ? "" : "Job Description is required"}</i></pre>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label
                                className="mb-2 text-muted col-form-label-sm"
                                htmlFor="Company_Name"
                                >
                                Company Size
                                </label>
                                <select
                                className="form-select form-select-sm"
                                aria-label="Company Size"
                                ref={companySize}
                                >
                                {/* <option selected="">Select the Company Size</option> */}
                                <option selected={true} value={500}>500+</option>
                                <option value={1000}>1000+</option>
                                <option value={10000}>10000+</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-6">
                        <div className="mb-3">
                            <label
                            className="mb-2 text-muted col-form-label-sm"
                            htmlFor="email"
                            >
                            No. of Openings
                            </label>
                            <input
                            type="number"
                            className="form-control form-control-sm"
                            name="openings"
                            defaultValue=""
                            placeholder=" Enter no. of openings"
                            ref={openings}
                            />
                        </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                        <div className="mb-3">
                            <label
                            className="mb-2 text-muted col-form-label-sm"
                            htmlFor="email"
                            >
                            Min Exp
                            </label>
                            <input
                            type="number"
                            className="form-control form-control-sm"
                            name="min"
                            defaultValue=""
                            placeholder=" Enter Min Exp"
                            required=""
                            ref={minExp}
                            />
                            <div className="invalid-feedback">Min exp is invalid</div>
                        </div>
                        </div>
                        <div className="col-md-6">
                        <div className="mb-3">
                            <label
                            className="mb-2 text-muted col-form-label-sm"
                            htmlFor="email"
                            >
                            Perk
                            </label>
                            <input
                            type="text"
                            className="form-control form-control-sm"
                            name="Max"
                            defaultValue=""
                            placeholder=" Enter Perk"
                            ref={perk}
                            />
                        </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                        <div className="mb-3">
                            <label
                            className="mb-2 text-muted col-form-label-sm"
                            htmlFor="email"
                            >
                            Min Package (in LPA)<p style={{color:"red", display:"inline"}}>*</p>
                            </label>
                            <input
                            type="number"
                            className="form-control form-control-sm"
                            name="min package"
                            placeholder=" Enter Min Package"
                            required=""
                            ref={minPackage}
                            onChange={() => setMinCheck(true)}
                            />
                            <div className="invalid-feedback">Min package is invalid</div>
                            <pre className="col-sm-12 mb-1"><i style={{color:"red"}}>{minCheck ? "" : "Minimum package is required"}</i></pre>
                        </div>
                        </div>
                        <div className="col-md-6">
                        <div className="mb-3">
                            <label
                            className="mb-2 text-muted col-form-label-sm"
                            htmlFor="email"
                            >
                            Max Package (in LPA)<p style={{color:"red", display:"inline"}}>*</p>
                            </label>
                            <input
                            type="number"
                            className="form-control form-control-sm"
                            name="Max Package"
                            placeholder=" Enter Max Package"
                            required=""
                            ref={maxPackage}
                            onChange={() => setMaxCheck(true)}
                            />
                            <div className="invalid-feedback">Max package is invalid</div>
                            <pre className="col-sm-12 mb-1"><i style={{color:"red"}}>{maxCheck ? "" : "Maximum package is required"}</i></pre>
                        </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                        <div className="mb-3">
                            <label
                            className="mb-2 text-muted col-form-label-sm"
                            htmlFor="Company_Name"
                            >
                            Location
                            </label>
                            <select
                            className="form-select form-select-sm"
                            aria-label="Location"
                            ref={jobLocation}
                            >
                            <option selected={true} value="Bangalore">Bangalore</option>
                            <option value="Delhi">Delhi</option>
                            <option value="Pune">Pune</option>
                            </select>
                        </div>
                        </div>
                        <div className="col-md-6">
                        <div className="mb-3">
                            <label
                            className="mb-2 text-muted col-form-label-sm"
                            htmlFor="Company_Name"
                            >
                            Status
                            </label>
                            <select
                            className="form-select form-select-sm"
                            aria-label="Location"
                            ref={status}
                            >
                            <option selected={true} value="open">Open</option>
                            <option value="closed">Closed</option>
                            </select>
                        </div>
                        </div>
                    </div>
                    <br></br>
                    <br></br>
                    <div className="align-items-center d-flex">
                    <Button type="button" className="btn-light btn-outline-dark btn-md ms-1" onClick={()=>navigate('/recruiter')}>
                        Cancel
                        </Button>
                        <Button type="button" className = "btn-light btn-outline-primary btn-md ms-auto" onClick={PostJob}> Next </Button>
                    </div>
                    </form>
                </div>
                </div>
            </section>
        </>

    )
}