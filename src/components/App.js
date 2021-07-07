import React, { useState,useEffect } from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Navbar from './NavBar';
import ChampionList from './ChampionList';
import ChampionDetails from './ChampionDetails';
import {connect} from 'react-redux';
import {fetchChampionTags,fetchChampions} from './../actions';
//import './mainStyles.css';



const App = ({fetchChampions,fetchChampionTags})=>{

    const [searchTerm,setSearchTerm]= useState('All');

    useEffect(()=>{
        fetchChampions();    
   },[]);


    const onSearch = (term) =>{

      setSearchTerm(term);
      fetchChampionTags(term);
     
    } 

    return(
    <div>
        <Router>
            <Navbar onSearch={onSearch}/>
            <Switch>


                <Route exact path="/" render={(props)=> <ChampionList searchTerm={searchTerm} {...props}/>} />


                <Route exact  path="/details/:champion" render={(props)=> <ChampionDetails {...props}/>} />
                    
                

            </Switch>
        </Router>
    </div>);

}




export default connect(null,{fetchChampionTags,fetchChampions})(App);