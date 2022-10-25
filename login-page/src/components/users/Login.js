import { Button} from "react-bootstrap";
import {useRef, useState} from "react";
import axios from "axios";
import {AiFillEye, AiFillEyeInvisible} from "react-icons/ai";
import { useNavigate } from 'react-router-dom';



export default function Login() {

	const navigate = useNavigate()

    const username = useRef("")
    const password = useRef("")

    const[loginState, setLoginState] = useState("You have not been logged in yet!")
    const[passwordShown, setPasswordShown] = useState(false)
	const[usernameCheck, setUsernameCheck] = useState(true)
	const[passwordCheck, setPasswordCheck] = useState(true)

    const togglePassword = () => {
        setPasswordShown(!passwordShown)
    }

    const LoginUser = () => {
        const payload = {
            userName:username.current.value,
            password:password.current.value
        }

        axios.post("http://localhost:12000/api/User/Authenticate", payload)
        .then((response) => {
            console.log(response.data)
            sessionStorage.setItem("token", JSON.stringify(response.data))
			console.log(JSON.parse(sessionStorage.getItem("token")).role)
			setLoginState(`You have been authorized. Login was successful! Welcome to Gondor! Your Key is ${JSON.parse(sessionStorage.getItem("token")).jwtToken} and User ID is ${JSON.parse(sessionStorage.getItem("token")).userId}`)
			if(JSON.parse(sessionStorage.getItem("token")).role === "JobSeeker") {
				navigate(`/userprofile`)
			}
			else if(JSON.parse(sessionStorage.getItem("token")).role === "Employer"){
				navigate(`/recruiterprofilepage`)
			}
			
			// sessionStorage.setitem("userId", response.data.userId)
        }).catch((error) => {
			console.log(error)
            setLoginState("Authorization failed! Login unsuccessful! Turn back now or face the full wrath of Gandalf's mighty stick o|o")
			if(username.current.value === "") {
				setUsernameCheck(false)
			}
			if(password.current.value === "") {
				setPasswordCheck(false)
			}
        })
    }


    return ( 
        <section className="h-100 bgimg">
		<header className="py-3 mb-4">
			<div className="container d-flex flex-wrap justify-content-center">
			  <a href="/" className="d-flex align-items-center mb-3 mb-lg-0 me-lg-auto text-dark text-decoration-none">
			  </a>
			</div>
        </header> 
		<div className="container h-100">
        {/* <pre className="col-sm-12 mb-3 text-center">{loginState}</pre> */}
			<div className="row justify-content-sm-center h-100">
				<div className="col-xxl-4 col-xl-5 col-lg-5 col-md-7 col-sm-9">
					<div className="card shadow-lg">
						<div className="card-body p-5">
							<h1 className="fs-4 card-title fw-bold mb-4 text_heading" style={{textAlign:"center"}}>Login</h1>
							<form method="POST" className="needs-validation" noValidate="">
								<div className="mb-3">
									<label className="mb-2 text-muted col-form-label-sm" htmlFor="username">Username</label>
									<input type="text" className="form-control form-control-sm" name="username" placeholder="Enter Usename" ref={username} onChange={() =>setUsernameCheck(true)} required autoFocus/>
									<div className="invalid-feedback">
										Username is invalid
									</div>
									<pre className="col-sm-6 mb-3"><i style={{color:"red"}}>{usernameCheck ? "" : "Username is required"}</i></pre>
								</div>
								<div className="mb-3">
									<div className="mb-2 w-100">
										<label className="text-muted col-form-label-sm" for="password">Password</label>
									</div>
									<div className="input-group">
                                        <input id="password" type={passwordShown ? "text":"password"} className="form-control form-control-sm" name="password" placeholder="Enter Password" ref={password} onChange={() =>setPasswordCheck(true)} required/>
                                        <div className="input-group-append">
                                            <button className="btn btn-outline-dark btn-sm me-2" type="button" onClick={togglePassword}>{passwordShown ? <AiFillEyeInvisible size="25"/> : <AiFillEye size="25"/>}</button>
                                        </div>
                                    </div>
								    <div className="invalid-feedback">
								    	Password is required
							    	</div>
									<pre className="col-sm-6 mb-2"><i style={{color:"red"}}>{passwordCheck ? "" : "Password is required"}</i></pre>
								</div>
                                {/* <a>Forgot password?</a> */}
								<div className="d-flex align-items-center">
									<Button className="btn-light btn-outline-primary btn-sm ms-auto" onClick={LoginUser}>
										LOGIN
									</Button>
								</div>
							</form>
						</div>
						<div className="card-footer py-3 border-0">
							<div className="text-center">
								New user? <Button className="btn-light btn-outline-secondary btn-sm ms-auto" onClick={() => navigate('/register')}>REGISTER</Button>
							</div>
						</div>
					</div>

				</div>
			</div>
		</div>
	</section>
    )
}
