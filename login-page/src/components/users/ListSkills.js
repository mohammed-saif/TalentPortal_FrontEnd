import axios from "axios"
import { useState, useEffect } from "react"

export default function ListSkills(props) {

    const [skill, setSkill] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:12000/api/Skill/Id?SkillId=${props.id}`)
        .then(response => {
        console.log(response.data)
        setSkill(response.data)
        })
    }, [])
    

    return (
        <>
            {skill.skillName}
        </>
    )
}