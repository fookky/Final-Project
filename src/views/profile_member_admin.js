import React, { useState, useEffect, useContext } from 'react';
import firebaseApp from '../firebase.js';
import { Redirect, useHistory } from 'react-router-dom'
import { AuthContext } from "components/Auth/Auth.js";
import { useLocation } from "react-router-dom";
import allmember from "views/all_member_admin.js";
import { Link } from 'react-router-dom';
import { Line, Pie } from "react-chartjs-2";
// reactstrap components
import { Col, Card, Row} from "react-bootstrap";
import {
  Button,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  FormGroup,
  Form,
  Input,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  
} from "reactstrap";

// core components
import {
  dashboard24HoursPerformanceChart,
  dashboardEmailStatisticsChart,
  dashboardNASDAQChart,
} from "variables/charts.js";


function Dashboard(){ 

    const [ User, setUser ] = useState({})
    const [ Promotions, setPromotions ] = useState({})
    const [ UserDoc, setUserDoc] = useState('')
    const [ UserRandomlist, setUserRandomlist] = useState({})
    const [ Food, setFood ] = useState({})

    var today = new Date()
    const now = today.getFullYear() + '-' + ("0" + (today.getMonth() + 1)).slice(-2) + '-' + ("0" + today.getDate()).slice(-2);

    const { currentUser } = useContext(AuthContext);

    const location = useLocation();

    const history = useHistory()

    useEffect(() => {
      //ใช้ firebaseApp.auth().onAuthStateChanged เพื่อใช้ firebaseApp.auth().currentUser โดยไม่ติด error เมื่อทำการ signout
      firebaseApp.auth().onAuthStateChanged(user => {
          const db = firebaseApp.firestore()
          const userCollection = db.collection('User').where('Uid' , '==' , location.search.substring(1))       
      
        // subscription นี้จะเกิด callback กับทุกการเปลี่ยนแปลงของ collection Food
        const unsubscribe = userCollection.onSnapshot(ss => {
            // ตัวแปร local
            const User = {}

            ss.forEach(document => {
                // manipulate ตัวแปร local
                User[document.id] = document.data()
            })

            // เปลี่ยนค่าตัวแปร state
            setUser(User)
        })

        return () => {
            // ยกเลิก subsciption เมื่อ component ถูกถอดจาก dom
            unsubscribe()
        }
        });
    }, [])

    useEffect(() => {
      //ใช้ firebaseApp.auth().onAuthStateChanged เพื่อใช้ firebaseApp.auth().currentUser โดยไม่ติด error เมื่อทำการ signout
      firebaseApp.auth().onAuthStateChanged(user => {
          const db = firebaseApp.firestore()
          const PromotionsCollection = db.collection('Promotions').where('Uid' , 'array-contains-any' , [location.search.substring(1),'ALL'])      
      
        // subscription นี้จะเกิด callback กับทุกการเปลี่ยนแปลงของ collection Food
        const unsubscribe = PromotionsCollection.onSnapshot(ss => {
            // ตัวแปร local
            const Promotions = {}

            ss.forEach(document => {
                // manipulate ตัวแปร local
                Promotions[document.id] = document.data()
            })

            // เปลี่ยนค่าตัวแปร state
            setPromotions(Promotions)
        })

        return () => {
            // ยกเลิก subsciption เมื่อ component ถูกถอดจาก dom
            unsubscribe()
        }
        });
    }, [])

    useEffect(() => {
      //ใช้ firebaseApp.auth().onAuthStateChanged เพื่อใช้ firebaseApp.auth().currentUser โดยไม่ติด error เมื่อทำการ signout
      firebaseApp.auth().onAuthStateChanged(user => {
          const db = firebaseApp.firestore()
          const userCollection = db.collection('User').where('Uid' , '==' , location.search.substring(1))       

        // subscription นี้จะเกิด callback กับทุกการเปลี่ยนแปลงของ collection Food
        const unsubscribe = userCollection.onSnapshot(ss => {
          // ตัวแปร local
          const User = {}
          const UserDoc = []
          const UserData = []

          ss.forEach(document => {
            // manipulate ตัวแปร local
            User[document.id] = document.data()
            UserData.push(User[document.id])
            UserDoc.push(document.id)
        })
          console.log(UserData[0].RandomList)
          const Lenght = UserData[0].RandomList['length']-1
          const RandomlistSort = {}
          const count = 0
          for(var i = Lenght ; i >= 0 ; i--){
            RandomlistSort[Lenght-i] = UserData[0].RandomList[i]
          }
          setUserRandomlist(RandomlistSort)
          setUserDoc(UserDoc[0])
        })

        return () => {
            // ยกเลิก subsciption เมื่อ component ถูกถอดจาก dom
            unsubscribe()
        }
        });
    }, [])

    const routeChange = () =>{ 
        history.push("/admin/member");
      }

    if (currentUser) {
        return <Redirect to="/member/profile" />;
    }

    if (!currentUser) {
      var ExpiredCoupon = firebaseApp.firestore().collection('Promotions').where("PromotionExpire", "<=", now);
      ExpiredCoupon.get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          doc.ref.delete();
        });
      });
    }

    return (
      
      <>
        <div className="content">
<Row>
            { Object.keys(User).map((id) => {
              return<Col md="4">


              <Card className="card-user">
                <div className="image">
                  <img
                    alt="..."
                    src="https://res.cloudinary.com/daxwfdlwj/image/upload/v1620032459/Food/damir-bosnjak_slfmvs.jpg"
                  />
                </div>
                <CardBody>
                  <div className="author">
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <img
                        alt="..."
                        className="avatar border-gray"
                        src="https://res.cloudinary.com/daxwfdlwj/image/upload/v1620032494/Food/mike_qn0emm.jpg"
                      />
                      <h5 className="title">{User[id].FirstName} {User[id].LastName}</h5>
                    </a>
                    <p className="description">{User[id].Email}</p>
                    <p className="description">วันเกิด</p>
                    <p className="description">{User[id].Date}</p>
                    <p><button class="btn btn-" onClick={routeChange}>ย้อนกลับ</button></p>
                
                  </div>
              
                </CardBody>
                <CardFooter>
                </CardFooter>
              </Card>            
              </Col>
              }) }  
              <Col md="4">
              <Card className="card-user">
                <CardHeader>
                <CardTitle tag="h5">ประวัติการสุ่ม</CardTitle>
                </CardHeader>
                <CardBody>
                { Object.keys(UserRandomlist).map((id) => {
                  return<Row style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                 
                  }}>
                        <p><img
                 alt="..."
                 src={require("assets/img/pizza.png")}
                 className="photo"
               />{UserRandomlist[id].name}</p>
                        </Row>
                }) } 
                </CardBody>
              </Card>
            </Col>
            <Col md="4">
              <Card className="ex3">
              <CardHeader>
                  <CardTitle tag="h5">ส่วนลดของสมาชิก</CardTitle>
              </CardHeader>
              { Object.keys(Promotions).map((id) => {
              return<Col>
                <Card className="card-user">

                      <p ><img
                 alt="..."
                 src={require("assets/img/megaphone.png")}
                 className="photo"
               /> รายละเอียด: {Promotions[id].PromotionDetail}</p>
                      <p ><img
                 alt="..."
                 src={require("assets/img/puzzle.png")}
                 className="photo"
               /> โค้ด:<a className="title" >{Promotions[id].PromotionCode}</a></p>
                      <p ><img
                 alt="..."
                 src={require("assets/img/schedule.png")}
                 className="photo"
               /> วันหมดอายุ: {Promotions[id].PromotionExpire}</p>
                  
                
                </Card>
              </Col>
              }) }
              </Card>
            </Col>
              </Row>
<Row>
        
              </Row>
  
        </div>
      </>
    );
}

export default Dashboard;
 