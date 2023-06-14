import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Home=()=> {

    const usenavigate=useNavigate();
useEffect(()=>{
let username=sessionStorage.getItem('username');
if(username==='' || username===null){
    usenavigate('/login');
}
},[])

    return (
        <div>
        <div className='heaader'>
            {/* <Link to={'/'}>Home</Link>
            <Link style={{float:'right'}} to={'/login'}>Logout</Link> */}

            {/* <h1>Home</h1> */}
            <nav class="navbar navbar-light bg-light justify-content-between">
  <a class="navbar-brand">Navbar</a>
  <a> <Link to={'/'}>Home</Link></a>
  <form class="form-inline">
    
            <Link style={{float:'right'}} to={'/login'}>Logout</Link>
   
  </form>
</nav>
           
        </div>

        </div>
    );
}

export default Home;