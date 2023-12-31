import React, {  useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

function Register() {
  const [id, idchange] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [number, setNumber] = useState("");
  const [gender, genderchange] = useState("female");

  //Phone Number Validation
const [numberError, setNumberError] = useState('');
const validateNumber = (number) => {
  const re = /^\d{10}$/;
  return re.test(number);
};
const handleNumberChange = (e) => {
  const newNumber = e.target.value;
  setNumber(newNumber);

  if (!validateNumber(newNumber)) {
    setNumberError('Please enter a 10-digit integer number.');
  } else {
    setNumberError('');
  }
};

  // Email Validation Notifacation  
const [emailError, setEmailError] = useState('');

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

//using handleEmailChange for wrong email Suggetion 
const handleEmailChange = (e) => {
  const newEmail = e.target.value;
  setEmail(newEmail);

  if (!validateEmail(newEmail)) {
    setEmailError('Please enter a valid email.');
  } else {
    setEmailError('');
  }
};

// Email Validation Notifacation
const navigate=useNavigate();

// Validation// and Used Regex in Email and Phone Number
const IsValidate=()=>{
  let isproceed=true;
  let errormessage='Please enter the value in';

  if (id === null || id === '') {
    isproceed = false;
    errormessage += ' Username';
}
if(name===null || name===''){

  isproceed=false;
  errormessage+=' Fullname'
}

if(email===null || email===''){

  isproceed=false;
  errormessage+=' Email'
}
if(password===null || password===''){

  isproceed=false;
  errormessage+=' Password'
}
if(number===null || number===''){

  isproceed=false;
  errormessage+=' Number'
}
if(!isproceed){
  toast.warning(errormessage)
}else{
  if(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)){

  }else{
      isproceed = false; 
      toast.warning('Please enter the valid email')
  }
}
if(!isproceed){
  toast.warning(errormessage)
}else{
  if(/^[0-9]{10}$/.test(number)){

  }else{
      isproceed = false; 
      toast.warning('Please enter the valid Phone Number')
  }
}
  return isproceed
}

// HandleSubmit//
  const handlesubmit = (e) => {
    if(IsValidate()){
    e.preventDefault()
    let regobj = { id,name, email, password, number, gender }
    
    fetch("http://localhost:8000/user",{

    method:"POST",
    headers:{'content-type':'application/json'},
    body:JSON.stringify(regobj)
    }).then((res)=>{
    toast.success('Register successfully.')
    navigate('/login');
    }).catch((err)=>{
      toast.error('Failed: '+err.message)
    }); 
  }}

  // useEffect=()=>{
  //   handlesubmit()
  // }

  return (
    <div className='mt-5' style={{backgroundColor:"#c1f0f5"}}>
      <div className="mask d-flex align-items-center h-100 gradient-custom-3">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
              <div className="card"  style={{backgroundColor:""}}>
                <div className="card-body p-5">
                  <h2 className="text-uppercase text-center mb-5">Create an account</h2>

                  <form className='container' onSubmit={handlesubmit}>


                    {/* ID */}

                         {/* Name */}
                         <div className="form-outline mb-4">
                      <input
                        name="id"
                        value={id}
                        onChange={(e) => idchange(e.target.value)}
                        type="text"
                        className="form-control form-control-lg"
                        placeholder='Your Username' />
                    </div>

                          {/* Name */}
                    <div className="form-outline mb-4">
                      <input
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        className="form-control form-control-lg"
                        placeholder='Your Name' />
                    </div>

                    {/* Email */}
                    <div className="form-outline mb-4">
                      <input 
                      name="email" 
                      value={email} 
                      onChange={(e) => {setEmail(e.target.value)
                        handleEmailChange(e);

                      }} 
                      type="email" 
                      className="form-control form-control-lg" 
                      placeholder='Your Email' />
                      {emailError && <div style={{ color: 'red', }}>{emailError}</div>}
                    </div>

                    {/* password */}
                    <div className="form-outline mb-4">
                      <input 
                      name="password" 
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)} 
                      type="password" 
                      className="form-control form-control-lg" 
                      placeholder='Password' />
                    </div>

                    {/* number */}
                    <div className="form-outline mb-4">
                      <input 
                      name="number" 
                      value={number} 
                      onChange={(e) => {setNumber(e.target.value)
                        handleNumberChange(e) 
                      }} 
                      type="phone" 
                      className="form-control form-control-lg" 
                      placeholder='Phone Number' />
                        {numberError && <div style={{ color: 'red' }}>{numberError}</div>}
                    </div>

                    {/* Gender */}
                        <div className="d-flex justify-content-sm-between">
                          <label>Gender</label>
                          {/* <br></br> */}
                          <input 
                          type="radio" 
                          checked={gender === 'male'} 
                          onChange={(e) => genderchange(e.target.value)} 
                          name="gender" 
                          value="male" 
                          className='app-check'>     
                          </input>
                          <label>Male</label>

                          <input 
                          type="radio" 
                          checked={gender === 'female'} 
                          onChange={(e) => genderchange(e.target.value)} 
                          name="gender" 
                          value="female" 
                          className='app-check'>                           
                          </input>
                          <label>female</label>
                          </div>
                         
                      {/* Button */}
                    <div className="d-flex justify-content-center mt-5">
                      <button type="submit"
                        className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Register</button>
                    </div>

                    <p className="text-center text-muted mt-5 mb-0">Have already an account? <Link href="#!"
                      to={'/login'} className="fw-bold text-body"><u>Login here</u></Link></p>

                  </form>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Register;