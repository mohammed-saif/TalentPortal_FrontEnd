import { useEffect, useState } from "react"
import axios from 'axios';
import { Navigate, useNavigate, useParams } from "react-router-dom";
import ListSkills from "../users/ListSkills";
import { Button } from "react-bootstrap";

// import ListSkills from "./ListSkills";
export default function JobSkillAddingPage(){
    
  const [jobSkills,setJobSkills]=useState([])
  const [jobTable,setJobTable]=useState([])
  const jobId = Number(sessionStorage.getItem("Job ID"))
  // const jobId=3;
  console.log("job id=",jobId)
  const [value,setValue]=useState("")
  const [data,setData]=useState([])

  const {s} = useParams()
  const navigate = useNavigate()


  const onChange=(event)=>{
    setValue(event.target.value)
  }

  const onSearch=(searchItem)=>{
    setValue(searchItem);
    console.log("search",searchItem);
  }
  const onSubmitSkill=(id)=>{
    console.log("skillId=",id);

    let flag = true;

    axios.get(`http://localhost:12000/api/JobSkill/GetByJobId?jobId=${jobId}`)
    .then(response =>{
      if(response.data.length > 0)
      {
          response.data.map((data) => {
              if(data.skillId === id)
              {
                  flag = false
              }
          })

          if(flag === true)
          {
            const payload = {
              jobId: jobId, 
              skillId: id
            }
            axios.post(`http://localhost:12000/api/JobSkill?jobId=${jobId}&skillId=${id}`, payload, {
              headers:{
                "Authorization":`Bearer ${JSON.parse(sessionStorage.getItem("token")).jwtToken}`
            }
            })
            .then((response)=>{
              console.log("successfully posted",response.data)
      
            }).catch((error) => {
              console.log("1st post", error)
            })
              window.location.reload(false)
          }
          else
          {
              alert("Skill already exist in your added skills!")
          }
      }
      else
      {
        const payload = {
          jobId: jobId, 
          skillId: id
        }
        axios.post(`http://localhost:12000/api/JobSkill?jobId=${jobId}&skillId=${id}`, payload, {
          headers:{
            "Authorization":`Bearer ${JSON.parse(sessionStorage.getItem("token")).jwtToken}`
        }
        })
        .then((response)=>{
          console.log("successfully posted",response.data)
  
        }).catch((error) => {
          console.log("2nd post", error)
        })
          window.location.reload(false)
      }
}).catch((error) => {
  console.log("get already existing job skills", error)
})   
}


  const deleteSkillHandler=(skillId)=>{
    
    axios.delete(`http://localhost:12000/api/JobSkill/DeleteSingleSkillByJobId?jobId=${jobId}&skillId=${skillId}`, {
      headers:{
        "Authorization":`Bearer ${JSON.parse(sessionStorage.getItem("token")).jwtToken}`
    }
    })
        .then(response => {
            console.log("Delete Successful",response.data)
        }).catch((error) => {
          console.log("delete", error)
        })
        axios.get(`http://localhost:12000/api/JobSkill/GetByJobId?jobId=${jobId}`)
        .then(response =>{
          setJobSkills(response.data)
      }).catch((error) => {
        console.log("get", error)
      })

  }

  const cancelHandler = () => {
          const payload = {
            userId: Number(JSON.parse(sessionStorage.getItem("token")).userId),
            jobId: jobId
        }

        axios.delete(`http://localhost:12000/api/Job/jobId?jobId=${jobId}`, {
            headers:{
                "Authorization":`Bearer ${JSON.parse(sessionStorage.getItem("token")).jwtToken}`
            }
        })
        .then(() => {
            // console.log(jobToDelete)
            // console.log(j.id)
            axios.delete('http://localhost:12000/api/Recruiter', {
                headers:{
                    "Authorization":`Bearer ${JSON.parse(sessionStorage.getItem("token")).jwtToken}`
                },
                data: payload
            }).then(() => {
                axios.delete(`http://localhost:12000/api/JobSkill?JobId=${jobId}`, {
                  headers:{
                    "Authorization":`Bearer ${JSON.parse(sessionStorage.getItem("token")).jwtToken}`
                }
                })
                .then(() => {
                  console.log("everything deleted successfully")
                  navigate('/recruiterprofilepage')
                }
                 
                )
                // setJobToDelete(0)
                // setShowModal(false)
            }).catch((error) => {
                console.log(error, 'inner')
            })
        }).catch((error) => {
            // console.log(jobId)
            // console.log(j.id)
            console.log(error, 'outer')
        })
  }

  const buttonHandler = () => {
    if(s === "old")
    {
      
        return ( 
        <div className="text-center">
        <Button  className="btn-light btn-outline-success" type="button" onClick={() => navigate('/recruiter')}>
                        Confirm
        </Button>
        </div>
        )
       
        
      
    }
    else if( s === "new"){
     
      return (
        <div className="text-center">
            <Button  className="btn-light btn-outline-info" type="button" onClick={() => navigate('/jobdetails')}>
                Post Job
          </Button>
          <>   </>
          <Button  className="btn-light btn-outline-dark" type="button" onClick={() => cancelHandler()}>
                Cancel
          </Button>
      </div>
      )
        
        

     
    }
  }



  useEffect(() => {

    axios.get(`http://localhost:12000/api/Job/jobId?jobId=${jobId}`)
        .then(response => {
            setJobTable(response.data)
        }).catch((error) => {
          console.log("1st effect get", error)
        })
    axios.get("http://localhost:12000/api/skill")
        .then(response=>{
          setData(response.data)
        }).catch((error) => {
          console.log("2nd effect get", error)
        })
    axios.get(`http://localhost:12000/api/JobSkill/GetByJobId?jobId=${jobId}`)
        .then(response =>{
          setJobSkills(response.data)
      }).catch((error) => {
        console.log("3rd effect get", error)
      })

},[])

console.log("skillData",data);
    
    
    
    
    
    return(
        <section>
        <div className="container">
          <div className="c-card mt-3 p-5">
          <pre className="col-sm-12 mb-3 text-center" style={{fontSize:"20px"}}>Add new skills here </pre>
            <div className="search-container" style={{textAlign:"center"}}>
              <div className="search-inner" style={{textAlign:"center"}}>
                <input type="text" value={value} onChange={onChange} />
                {/* <button className="btn-primary btn-sm ms-1" onClick={() => onSearch(value)}> Search </button> */}
              

              </div>
              <div className="dropdown">
                {data
                  .filter((item) => {
                    const searchTerm = value.toString().toLowerCase();
                    const fullName = item.skillName.toLowerCase();

                    return (
                      searchTerm &&
                      fullName.startsWith(searchTerm)
                      
                    );
                  })
                  .slice(0, 10)
                  .map((item) => (
                    <div
                      onClick={() => onSearch(item.skillName)}
                      className="dropdown-row"
                      key={item.skillId}
                    >
                      {item.skillName}
                      <button className="btn-primary btn-sm ms-1" onClick={()=>{{onSubmitSkill(item.skillId)}}}> + </button>
                    </div>
                  ))}
              </div>
            </div>
            
          {
            jobSkills?.length > 0
            ?(
              <div className="row mt-5 ">
                <div className="col-md-6 mx-auto">
                <pre className="col-sm-12 mb-3 " style={{fontSize:"27px"}}>Job's required skills </pre>
                  <div className="profilecard" style={{textAlign:"center"}}>
                    <table className="table profil_details">
                      <tbody>
                        {
                          jobSkills.map((js)=>(
                            <tr key={js.jobSkillId}>
                              <td style={{ borderLeft: "3px solid #9c2afc" }}><ListSkills id={js.skillId} /></td>
                              <td><button className="btn-primary btn-sm ms-1" onClick={()=>{{deleteSkillHandler(js.skillId)}{window.location.reload(false)}}} > Remove </button></td>
                
                            </tr>
                            ))
                        }
                        </tbody>
                    </table>  
                  </div>
                </div>
                <>
                    
                </>
              </div>
            ):(
              <>
                <br /><br />
                <pre className="col-sm-12 mb-3 text-center" style={{fontSize:"15px" , color:"red"}}>No skills added till now</pre>
                <pre className="col-sm-12 mb-3 text-center" style={{fontSize:"12px" , color:"red"}}>(Or please wait some time for the data to load... If no change please add new skills)</pre>
               
              </>
            )
          }    
          </div>
          <br />
          <div >
            {
                  buttonHandler()
            }
            </div>
        </div>
      </section>
    )
}