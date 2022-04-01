import React, { useState, useEffect, useContext } from 'react';
import firebaseApp from '../firebase.js';
import { Redirect } from 'react-router-dom'
import { AuthContext } from "components/Auth/Auth.js";
// react plugin used to create charts
import { Line, Pie } from "react-chartjs-2";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
} from "reactstrap";
// core components
import {
  dashboard24HoursPerformanceChart,
  dashboardEmailStatisticsChart,
  dashboardNASDAQChart,
} from "variables/charts.js";


function Home(){ 

    const { currentUser } = useContext(AuthContext);

    if (currentUser) {
        return <Redirect to="/member/home" />;
    }

    return (
      
      <>
        <div className="content">  
        <Col md="12">
                      <img 
                 alt="..."
                 src="https://res.cloudinary.com/daxwfdlwj/image/upload/v1620030394/Food/t_tfoorl.gif"
                 
               />
                    
                      </Col>
        </div>
      </>
    );
}

export default Home;
