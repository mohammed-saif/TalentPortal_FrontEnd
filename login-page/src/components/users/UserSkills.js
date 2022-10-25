import { useEffect, useState } from "react"
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import ListSkills from "../jobs/ListSkills";
import { Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";

// import ListSkills from "./ListSkills";
export default function UserSkills(){
    
  const [userSkills,setUserSkills]=useState([])
  const [userTable,setUserTable]=useState([])
  const userId = Number(JSON.parse(sessionStorage.getItem("token")).userId)
  // const userId=3;
  console.log("user id=",userId)
  const [value,setValue]=useState("")
  const [data,setData]=useState([])
  
  const navigate= useNavigate()

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

    axios.get(`http://localhost:12000/api/UserSkill/userid?userid=${userId}`, {
      headers:{
        "Authorization":`Bearer ${JSON.parse(sessionStorage.getItem("token")).jwtToken}`
    }
    })
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
                        userId: userId,
                        skillId: id
                    }
                
                    axios.post(`http://localhost:12000/api/UserSkill`, payload, {
                      headers:{
                        "Authorization":`Bearer ${JSON.parse(sessionStorage.getItem("token")).jwtToken}`
                    }
                    })
                      .then((response)=>{
                        console.log("successfully posted",response.data)
                
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
                    userId: userId,
                    skillId: id
                }
            
                axios.post(`http://localhost:12000/api/UserSkill`, payload, {
                  headers:{
                    "Authorization":`Bearer ${JSON.parse(sessionStorage.getItem("token")).jwtToken}`
                }
                })
                  .then((response)=>{
                    console.log("successfully posted",response.data)
            
                  })
                window.location.reload(false)
            }
      })   
  }


  const deleteSkillHandler=(skillId)=>{
    
    axios.delete(`http://localhost:12000/api/UserSkill?skillId=${skillId}&userId=${userId}`, {
      headers:{
        "Authorization":`Bearer ${JSON.parse(sessionStorage.getItem("token")).jwtToken}`
    }
    })
        .then(response => {
            console.log("Delete Successful",response.data)
        })
        axios.get(`http://localhost:12000/api/UserSkill/userid?userid=${userId}`, {
          headers:{
            "Authorization":`Bearer ${JSON.parse(sessionStorage.getItem("token")).jwtToken}`
        }
        })
        .then(response =>{
          setUserSkills(response.data)
      })

  }



  useEffect(() => {

    axios.get(`http://localhost:12000/api/User/UserId?uid=${userId}`, {
      headers:{
        "Authorization":`Bearer ${JSON.parse(sessionStorage.getItem("token")).jwtToken}`
    }
    })
        .then(response => {
            setUserTable(response.data)
        })
    axios.get("http://localhost:12000/api/skill", {
      headers:{
        "Authorization":`Bearer ${JSON.parse(sessionStorage.getItem("token")).jwtToken}`
    }
    })
        .then(response=>{
          setData(response.data)
        })
    axios.get(`http://localhost:12000/api/UserSkill/userid?userid=${userId}`, {
      headers:{
        "Authorization":`Bearer ${JSON.parse(sessionStorage.getItem("token")).jwtToken}`
    }
    })
        .then(response =>{
          setUserSkills(response.data)
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
                <input  type="text" value={value} onChange={onChange} />
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
                      className="dropdown-row form-control"
                      key={item.skillId}
                    >
                      {item.skillName}
                      <button  className="btn-primary btn-sm ms-1" onClick={()=>{{onSubmitSkill(item.skillId)}}}> + </button>
                      {/* {window.location.reload(false)} */}
                    </div>
                  ))}
              </div>
            </div>
            
          {
            userSkills?.length > 0
            ?(
              <div className="row mt-5 ">
                <div className="col-md-6 mx-auto">
                <pre className="col-sm-12 mb-3 " style={{fontSize:"27px"}}>Your skills </pre>
                  <div className="profilecard" style={{textAlign:"center"}}>
                    <table className="table profil_details">
                      <tbody>
                        {
                          userSkills.map((js)=>(
                            <tr key={js.userSkillId}>
                              <td style={{ borderLeft: "3px solid #9c2afc" }}><ListSkills id={js.skillId} /></td>
                              <td><button className="btn-primary btn-sm ms-1 " style={{alignSelf:"end"}} onClick={()=>{{deleteSkillHandler(js.skillId)}{window.location.reload(false)}}} > Remove </button></td>
                
                            </tr>
                            ))
                        }
                        </tbody>
                    </table>
                  </div>
                </div>
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
        </div>
        <br />
        <div className="mb-3 text-center">

          <Button className="btn-light btn-outline-dark " onClick={()=>navigate(`/userprofile`)}>Back</Button>
        </div>
      </section>
    )
}