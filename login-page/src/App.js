import { Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './components/shared/Layout';
import Login from './components/users/Login';
import AddJob from './components/jobs/AddJob';
import RecruiterList from './components/recruiters/Recruiter';
import RegisterUser from './components/users/RegisterUser';
import AllJobsList from './components/jobs/AllJobsList';
import JobDetails from './components/jobs/JobDetails';
import UpdateJob from './components/jobs/UpdateJob';
import UserProfilePage from "./components/users/UserProfilePage";
import RecruiterProfilePage from "./components/users/RecruiterProfilePage";
import ChangePassword from "./components/users/ChangePassword";
import UpdateUserProfile from "./components/users/UpdateUserProfile";
import JobSkillAddingPage from './components/jobs/JobSkillAddingPage';
import UserSkills from './components/users/UserSkills';
import JobApply from "./components/jobs/JobApply";
import JobApplicationsList from './components/users/JobApplicationsList';
import ApplicantsList from './components/recruiters/ApplicantsList';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<AllJobsList/>}></Route>
        <Route path="/jobdetails" element={<JobDetails />}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/addjob" element={<AddJob/>}></Route>
        <Route path="/recruiter" element={<RecruiterList/>}></Route>
        <Route path="/register" element={<RegisterUser/>}></Route>
        <Route path="/updatejob" element={<UpdateJob/>}></Route>
        <Route path="/userprofile" element={<UserProfilePage/>}></Route>
        <Route path='/edituser' element={ <UpdateUserProfile/>}></Route>
        <Route path ='/Changepassword' element ={<ChangePassword/>}></Route>
        <Route path='/recruiterprofilepage' element={<RecruiterProfilePage/>}></Route>
        <Route path = '/addjobskill/:s' element = {<JobSkillAddingPage/>}></Route>
        <Route path = '/adduserskill' element = {<UserSkills/>}></Route>
        <Route path = '/jobapply' element = {<JobApply/>}></Route>
        <Route path = '/appliedjobs' element = {<JobApplicationsList/>}></Route>
        <Route path = '/jobapplicants' element = {<ApplicantsList/>}></Route>
      </Routes>
    </Layout>
  );
}

export default App;
