import { useState, useEffect, useRef } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axios from 'axios'
import JobCard from "./JobCard"
import {Modal, ModalHeader, Button} from "react-bootstrap"; 
import  isURL  from "validator/lib/isURL";


export default function JobApply() {

    const[showModal, setShowModal]= useState(false)
    const[resumeCheck,setResumeCheck]=useState(false)


    const [job, setJob] = useState([])
    const jobId = Number(sessionStorage.getItem("Job ID"))
    const userId = Number(JSON.parse(sessionStorage.getItem("token")).userId)
    const resume = useRef("")

    const navigate = useNavigate()

    const handleResumeChange=()=>{
        if(isURL(resume.current.value)){
            setResumeCheck(true)
        }
        else if(resume.current.value===""){
            setResumeCheck(false)
        }
        else{
            setResumeCheck(false)
        }
    }

    const JobApplyHandler = () => {
        const payload = {
            applicationStatus: "Submitted",
            jobId: jobId,
            userId: userId,
            resume: resume.current.value
        }

        axios.get(`http://localhost:12000/api/JobApplicant/ValidatingApplicant?UserId=${userId}&JobId=${jobId}`, {
            headers:{
                "Authorization":`Bearer ${JSON.parse(sessionStorage.getItem("token")).jwtToken}`
              }
        }).then((response) => {
            axios.post(`http://localhost:12000/api/JobApplicant`, payload, {
            headers:{
                "Authorization":`Bearer ${JSON.parse(sessionStorage.getItem("token")).jwtToken}`
              }
            }).then(() => {
                console.log("Job posted successfully")
            }).catch((error) => {
                console.log(payload)
                console.log(error)
            })
            setShowModal(true)
            closeModalHandler()
        }).catch((error) => {
            console.log(error,"conflict")
            alert("Job already applied")
        })

        // axios.post(`http://localhost:12000/api/JobApplicant`, payload, {
        //     headers:{
        //         "Authorization":`Bearer ${JSON.parse(sessionStorage.getItem("token")).jwtToken}`
        //       }
        // }).then(() => {
        //     console.log("Job posted successfully")
        // }).catch((error) => {
        //     console.log(payload)
        //     console.log(error)
        // })
        // setShowModal(true)
        // closeModalHandler()
    }

    const closeModalHandler = () => {
        setTimeout(() => {
            setShowModal(false)
            navigate(`/`)
        },3000)
    }

    useEffect(() => {

        const PROTOCOL = "http"
        const PORT = 12000;
    
        const baseUrl = `${PROTOCOL}://${window.location.hostname}:${PORT}/`

         axios.get(baseUrl+`api/Job/jobId?jobId=${jobId}`)
        .then(response =>{
            setJob(response.data)
        })

    },[])
    return (
        <>
            <Modal
                show={showModal}
                onHide={closeModalHandler}
                keyboard={false}>
                    <ModalHeader>
                        <Modal.Title>
                            Applied to Job successfully
                        </Modal.Title>
                    </ModalHeader>
                    <Modal.Body>
                            Please wait..You will be redirected to home page    
                    </Modal.Body>

            </Modal>
            <h2 style={{textAlign:"center"}}>Upload resume for applying to job</h2>
            <br />
            {
                job?.length != 0
                ?(
                    
                    <>
                        <JobCard 
                    job={job}
                    />

                    <br /><br />
                    <pre className="col-sm-12 mb-3" style={{fontSize:"18px"}}>Enter resume link </pre>
                    <input 
                        type="text" 
                        className="form-control" 
                        aria-label="search" 
                        placeholder="Put your resume link here..."  
                        ref={resume}
                        onChange={handleResumeChange}
                    />
                    <pre className="col-sm-12 mb-3 text-center" style={{fontSize:"13px" , color:"darkorange"}}>( Make sure that the resume link you have shared is public and can be viewed by anyone with the link! )</pre>
                    
                    <Button variant="primary" className="btn-light btn-outline-info" type="button" disabled={(!resumeCheck)} onClick={() => JobApplyHandler()} >
                        Confirm
                    </Button>
                    <>  </>
                    <Button variant="secondary" type="button" className="btn-light btn-outline-dark" onClick={() => navigate("/jobdetails")}>
                        Cancel
                    </Button>
                    </>
                    
                ) :
                (
                    <>
                    some error
                    </>
                )
            }

        </>
    )
}