import Moment from 'moment';
import { Button} from "react-bootstrap";
// onClick={"#jobdetails"} style= { { cursor: "pointer" }}
import DeleteConfirmation from "./DeleteConfirmation"
import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import { render } from '@testing-library/react';
import { IoLocationSharp } from 'react-icons/io5'
import {TbCurrencyRupee} from 'react-icons/tb'
import {BsFillCalendarEventFill} from 'react-icons/bs'
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

export default function RecruiterCard({j}) {

    const navigate = useNavigate()

    const[jobToDelete, setJobToDelete] = useState(0)
    const[showModal, setShowModal] = useState(false)

    const setJobIdinStorage = () => {
        sessionStorage.setItem("Job ID", j.id)
        navigate(`/updatejob`)
    }

    const setJobIdinStorage2 = () => {
        sessionStorage.setItem("Job ID", j.id)
        navigate(`/jobapplicants`)
    }


    const deleteConfirmationModalHandler = (jobId) => {
        setShowModal(true)
        setJobToDelete(jobId)
    }

    const closeModalHandler = () => {
        setShowModal(false)
    }

    const deleteHandler = () => {

        const payload = {
            userId: Number(JSON.parse(sessionStorage.getItem("token")).userId),
            jobId: jobToDelete
        }

        axios.delete(`http://localhost:12000/api/Job/jobId?jobId=${jobToDelete}`, {
            headers:{
                "Authorization":`Bearer ${JSON.parse(sessionStorage.getItem("token")).jwtToken}`
            }
        })
        .then(() => {
            console.log(jobToDelete)
            console.log(j.id)
            axios.delete('http://localhost:12000/api/Recruiter', {
                headers:{
                    "Authorization":`Bearer ${JSON.parse(sessionStorage.getItem("token")).jwtToken}`
                },
                data: payload
            }).then(() => {
                setJobToDelete(0)
                setShowModal(false)
            }).catch((error) => {
                console.log(error, 'inner')
            })
        }).catch((error) => {
            console.log(jobToDelete)
            console.log(j.id)
            console.log(error, 'outer')
        })
    }

    return (
    <>
        <DeleteConfirmation showModal={showModal}
                title="Delete Warning!"
                body="Are you sure you want to delete this job??"
                closeModalHandler={closeModalHandler}
                deleteHandler={deleteHandler}>
        </DeleteConfirmation>
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
                    <div className="job-role">
                    <h5>{j.jobName}</h5>
                    </div>
                    <div className="job-info-head">
                    <ul className="nav">
                        <li className="nav-item">
                        <span className="nav-link disabled">
                            {j.companyName}
                        </span>
                        </li>
                        <li className="nav-item">
                        <span className="nav-link disabled">
                        <i className="fa fa-map-marker" style={{fontSize: '16px'}} />
                        <IoLocationSharp size={18}/>{j.jobLocation}
                        </span>
                        </li>
                        <li className="nav-item">
                        <span className="nav-link disabled">
                            <i className="fa fa-rupee" style={{ fontSize: 16 }} />
                            <TbCurrencyRupee size={20}/>{j.minPackage} - {j.maxPackage} LPA
                        </span>
                        </li>
                        <li className="nav-item">
                        <a className="nav-link disabled">
                            <i
                            className="fa fa-calendar"
                            style={{ fontSize: 16 }}
                            />
                            <BsFillCalendarEventFill size={15}/> {Moment(j.jobPostDate).format("MMM Do YYYY")}
                        </a>
                        </li>
                    </ul>
                    </div>
                </div>
                <div className="col-md-2 col-sm-2">
                    <div className="job-apply row">
                    <Button type="Button" className="btn-light btn-outline-primary btn-sm mb-3" onClick={()=>setJobIdinStorage()}>
                        <MdEdit/>
                    </Button>
                    <Button type="Button" className="btn-light btn-outline-danger btn-sm mb-3" onClick={() => deleteConfirmationModalHandler(j.id)}>
                        <MdDelete/>
                    </Button>
                    <Button type="Button" className="btn-light btn-outline-info btn-sm" onClick={() => setJobIdinStorage2()}>
                        See applicants
                    </Button>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </>
    )
}