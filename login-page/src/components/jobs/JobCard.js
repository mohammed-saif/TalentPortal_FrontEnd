
import Moment from 'moment'
import { useNavigate } from "react-router-dom";
import { IoLocationSharp } from 'react-icons/io5'
import {TbCurrencyRupee} from 'react-icons/tb'
import {BsFillCalendarEventFill} from 'react-icons/bs'

export default function JobCard({job}) {

    const navigate = useNavigate()


    const view = (jid) => {
        sessionStorage.setItem("Job ID", jid)
        navigate(`/jobdetails`)
    }

    return (
        <div className="card mt-3 c-card" >
        <div className="card-body">
            <div className="row scroll-sm">
            <div className="col-md-2 col-sm-2">
            <div className="company-logo ">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfxOmhBy9N06InPK-TwMk9abz-EPgzF6GmLrG4OfUeqrLem5_uFIOx2Fpesfjrw94ETA&usqp=CAU" alt="logo" width={100} />
            </div>
            </div>
            <div className="col-md-8 col-sm-8">
            <div className="job-role">
                <h5>{job.jobName}</h5>
            </div>
            <div className="job-info-head">
                <ul className="nav">
                <li className="nav-item">
                    <span className="nav-link disabled">{job.companyName.toUpperCase()}</span>
                </li>
                <li className="nav-item">
                    <span className="nav-link disabled"> <i className="fa fa-map-marker" style={{fontSize: '16px'}} /><IoLocationSharp size={18}/> {job.jobLocation}</span>
                </li>
                <li className="nav-item">
                    <span className="nav-link disabled"><i className="fa fa-rupee" style={{fontSize: '16px'}} /> <TbCurrencyRupee size={20}/> {job.minPackage} - {job.maxPackage} LPA</span>
                </li>
                <li className="nav-item">
                    <a className="nav-link disabled" href="/"><i className="fa fa-calendar" style={{fontSize: '16px'}} /><BsFillCalendarEventFill size={15}/> {Moment(job.jobPostDate).format("MMM Do YYYY")} </a>
                </li>
                </ul>
            </div>
            </div>
            <div className="col-md-2">
            <div className="job-apply">
                <button 
                    type="button" 
                    className="btn btn-outline-primary btn-sm c-btn"
                    onClick={() => view(job.id)}
                >View Details
                </button>
            </div>
            </div>
    </div>
    </div>
</div>
    )
}