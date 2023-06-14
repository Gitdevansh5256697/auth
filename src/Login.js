import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

function Login() {

  const [username, usernameupdate] = useState('');
  const [password, passwordupdate] = useState('')

  const navigate = useNavigate()

useEffect(()=>{
sessionStorage.clear();
},[])


  const ProceedLogin = (e) => {
    e.preventDefault()
    if (validate()) {
      /// impletation 
      // console.log('proceed')
      fetch("http://localhost:8000/user/" + username).then((res) => {
        return res.json();
      }).then((resp) => {
        console.log(resp)
        if (Object.keys(resp).length === 0) {
          toast.error('Please Enter valid username')
        } else {
          if (resp.password === password) {
            toast.success('Success')
            sessionStorage.setItem('username',username);
            navigate('/')
          } else {
            toast.error('Please Enter valid credentials')
          }
        }
      }).catch((err) => {
        toast.error('Login Failed due to :' + err.message)
      });
    }
  }
  const validate = () => {
    let result = true;

    if (username === "" || username === null) {
      result = false;
      toast.warning('Please Enter Username')
    }

    if (password === "" || password === null) {
      result = false;
      toast.warning('Please Enter password')
    }
    return result;
  }



  return (
    <div style={{ backgroundColor: "#c1f0f5" }}>
      <section className="vh-100 bg-image"
      >
        <div className="mask d-flex align-items-center h-100 gradient-custom-3">
          <div className="container h-100">
            <div className=
              "row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                <div className="card" >
                  <div className="card-body p-5">
                    <h2 className="text-uppercase text-center mb-5">Login account</h2>

                    <form onSubmit={ProceedLogin} className="container">



                      <div className="form-outline mb-4">
                        <input value={username} onChange={e => usernameupdate(e.target.value)}   className="form-control form-control-lg" placeholder='UserName' />

                      </div>

                      <div className="form-outline mb-4">
                        <input value={password} onChange={e => passwordupdate(e.target.value)} type="password" id="form3Example4cg" className="form-control form-control-lg" placeholder='password' />

                      </div>




                      <div className="d-flex justify-content-center">
                        <button type="submit"
                          className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Login</button>
                      </div>

                      <p className="text-center text-muted mt-5 mb-0">Not a Member? <Link
                        to={'/register'} className="fw-bold text-body"><u>Register here</u></Link></p>

                    </form>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;