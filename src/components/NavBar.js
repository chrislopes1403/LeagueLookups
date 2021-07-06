import React, { useState, useRef, useEffect } from  'react';
import SearchBar from './SearchBar';

import { withRouter } from 'react-router-dom';


const Navbar = ({onSearch,history}) =>{



    useEffect(()=>{
        window.addEventListener('resize',()=>{
            if(window.innerWidth<=769)
                navRef.current.style.height="0px";
            else
                navRef.current.style.height="auto";

            setOpen(false);
        });

    },[]);


    const [open,setOpen]=useState(false);
    const navRef=useRef();

    const handleNav =(event)=>{

        event.preventDefault();
        
        const tag = event.target.innerText;

        if(tag==='All')
        {
            onSearch(tag);
            if(history.location.pathname !== '/')
                history.push('/');
        }
        else
        {
            const filteredTag=tag.slice(0,-1); // remove 's'
            onSearch(filteredTag);
            
            if(history.location.pathname !== '/')
                history.push('/');
    
        }

    }

        const toggleNav=()=>{

           
                if(open){
                    navRef.current.style.height="0px";
                    navRef.current.style.padding="0px";
                }
                else
                {
                    navRef.current.style.height="136px";
                    navRef.current.style.padding="10px";
                }


                setOpen(!open);
            
        }

      

   
    return  ( <nav className="navbar">
            <div className="navbar-container">
                <a href='/' id="logo" className="logo"><h1>League Lookups</h1></a>
            
                <SearchBar onSearch={onSearch}/>
               
                <ul className="nav-list" ref={navRef}>
                    <li className="nav-item"><a className="navbar-links"  onClick={handleNav} >Fighters</a></li>
                    <li className="nav-item"><a className="navbar-links"  onClick={handleNav} >Mages</a></li>
                    <li className="nav-item"><a className="navbar-links"  onClick={handleNav} >Assassins</a></li>
                    <li className="nav-item"><a className="navbar-links"  onClick={handleNav} >Tanks</a></li>
                    <li className="nav-item"><a className="navbar-links"  onClick={handleNav} >Supports</a></li>
                    <li className="nav-item"><a className="navbar-links"  onClick={handleNav} >All</a></li>           
                </ul> 
                <div className="toggle bars" onClick={toggleNav}><i className="fa fa-bars fa-2x"></i></div> 
            </div>
        </nav>);

}


export default withRouter(Navbar);
