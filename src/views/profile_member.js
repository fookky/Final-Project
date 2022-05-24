
import React, { useState, useEffect, useContext } from 'react';
import firebaseApp from '../firebase.js';
import { Redirect } from 'react-router-dom'
import { AuthContext } from "components/Auth/Auth.js";
import { Link } from 'react-router-dom';
import { Line, Pie } from "react-chartjs-2";
// reactstrap components
import { Col, Card, Row } from "react-bootstrap";
import {
  Button, CardHeader, CardBody, CardFooter, CardTitle,
  FormGroup, Form, Input, InputGroup, InputGroupText,
  InputGroupAddon, Modal, ModalHeader, ModalBody, ModalFooter
} from "reactstrap";

// core components
import {
  dashboard24HoursPerformanceChart, dashboardEmailStatisticsChart, dashboardNASDAQChart
} from "variables/charts.js";


function Dashboard() {

  const [User, setUser] = useState({})
  const [Promotions, setPromotions] = useState({})
  const [UserDoc, setUserDoc] = useState('')
  const [UserRandomlist, setUserRandomlist] = useState([])
  const [Food, setFood] = useState({})
  const [RecomList, setRecomList] = useState({})
  const [FoodId, setFoodId] = useState([])

  const [editProfileModalShow, setEditProfileModalShow] = useState(false)

  var today = new Date()
  const now = today.getFullYear() + '-' + ("0" + (today.getMonth() + 1)).slice(-2) + '-' + ("0" + today.getDate()).slice(-2);

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    //ใช้ firebaseApp.auth().onAuthStateChanged เพื่อใช้ firebaseApp.auth().currentUser โดยไม่ติด error เมื่อทำการ signout
    firebaseApp.auth().onAuthStateChanged(user => {
      const db = firebaseApp.firestore()
      const userRef = db.collection('User').where('Uid', '==', firebaseApp.auth().currentUser.uid)

      // subscription นี้จะเกิด callback กับทุกการเปลี่ยนแปลงของ collection Food
      const unsubscribe = userRef.onSnapshot(ss => {
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

  // useEffect(() => {
  //   //ใช้ firebaseApp.auth().onAuthStateChanged เพื่อใช้ firebaseApp.auth().currentUser โดยไม่ติด error เมื่อทำการ signout
  //   firebaseApp.auth().onAuthStateChanged(user => {
  //     const db = firebaseApp.firestore()
  //     const PromotionsCollection = db.collection('Promotions').where('Uid', 'array-contains-any', [firebaseApp.auth().currentUser.uid, 'ALL'])

  //     // subscription นี้จะเกิด callback กับทุกการเปลี่ยนแปลงของ collection Food
  //     const unsubscribe = PromotionsCollection.onSnapshot(ss => {
  //       // ตัวแปร local
  //       const Promotions = {}

  //       ss.forEach(document => {
  //         // manipulate ตัวแปร local
  //         Promotions[document.id] = document.data()
  //       })

  //       // เปลี่ยนค่าตัวแปร state
  //       setPromotions(Promotions)
  //     })

  //     return () => {
  //       // ยกเลิก subsciption เมื่อ component ถูกถอดจาก dom
  //       unsubscribe()
  //     }
  //   });
  // }, [])

  // useEffect(() => {
  //   //ใช้ firebaseApp.auth().onAuthStateChanged เพื่อใช้ firebaseApp.auth().currentUser โดยไม่ติด error เมื่อทำการ signout
  //   firebaseApp.auth().onAuthStateChanged(user => {
  //     const db = firebaseApp.firestore()
  //     const userCollection = db.collection('User').where('Uid', '==', firebaseApp.auth().currentUser.uid)

  //     // subscription นี้จะเกิด callback กับทุกการเปลี่ยนแปลงของ collection Food
  //     const unsubscribe = userCollection.onSnapshot(ss => {
  //       // ตัวแปร local
  //       const User = {}
  //       const UserDoc = []
  //       const UserData = []

  //       ss.forEach(document => {
  //         // manipulate ตัวแปร local
  //         User[document.id] = document.data()
  //         UserData.push(User[document.id])
  //         UserDoc.push(document.id)
  //       })
  //       // console.log(UserData[0].RandomList[1].cate[0])

  //       const Lenght = UserData[0].RandomList['length'] - 1
  //       const RandomlistSort = []
  //       const count = 0
  //       for (var i = Lenght; i >= 0; i--) { RandomlistSort[Lenght - i] = UserData[0].RandomList[i] }

  //       // console.log(RandomlistSort)

  //       setUserRandomlist(RandomlistSort)
  //       setUserDoc(UserDoc[0])
  //     })

  //     return () => {
  //       // ยกเลิก subsciption เมื่อ component ถูกถอดจาก dom
  //       unsubscribe()
  //     }
  //   });
  // }, [])

  if (currentUser) {
    var ExpiredCoupon = firebaseApp.firestore().collection('Promotions').where("PromotionExpire", "<=", now);
    ExpiredCoupon.get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        doc.ref.delete();
      });
    });
  } else if (!currentUser) { return <Redirect to="/general/login" />; }

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }} className="content">
      <Col md="8">
        {Object.keys(User).map((id) => {
          return <Col md="12">
            <Card className="card-user">
              {/* <div className="image">
                  <img alt="..." src="https://sv1.picz.in.th/images/2022/04/27/8msXze.jpg" />
                </div> */}
              <CardBody>
                <div className="author">
                  <div>
                    <img alt="..." className="avatar border-gray"
                      src="https://cf.shopee.co.th/file/5160e1eb7f9b68c33e15e06780dac2ca" />
                    <h5 className="title">{User[id].FirstName} {User[id].LastName}</h5>
                  </div>
                  <p className="description">{User[id].Email}</p>
                </div>
                <Col md="12" className='mt-1'>
                  <h6>Work Affiliations</h6>
                  <p>From 01/02/2017 to Present: School of Architecture and Design - คณะสถาปัตย์ (KMUTT)</p>
                  {/* <h6>Publications</h6>
                  <p>Lighting Design Approach for Chiangmai Old Town: Case Studies through Temples; ดร.อัจฉราวรรณ จุฑารัตน์, วีรวิชย์ มุสิกพงศ์; 2021; Report</p> */}
                </Col>
                <div className="button-container">
                  <Button onClick={()=>setEditProfileModalShow(true)} class="btn btn" color="info" className='mr-1'>
                    Edit Profile
                  </Button>
                  <Button onClick={() => firebaseApp.auth().signOut()}
                    class="btn btn" color="danger" className='ml-1'>
                    Log Out
                  </Button>
                </div>
              </CardBody>
            </Card>
          </Col>
        })}
      </Col>

      <Modal isOpen={editProfileModalShow} size="md" className="modal-seemore">
        <ModalHeader>Edit Profile</ModalHeader>
        <ModalBody>
          <FormGroup>
            <p>First Name</p>
            <Input type="text" pattern="^[ก-๏\sa-zA-Z\s]+$"></Input>

            <p>Last Name</p>
            <Input type="text" pattern="^[ก-๏\sa-zA-Z\s]+$"></Input>

            <p>Work Affiliations</p>
            <Input type="textarea"></Input>

            {/* <p>Publications</p>
            <Input type="textarea"></Input> */}
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button className="btn" color="info" onClick={() => setEditProfileModalShow(false)}>Close</Button>
          <Button className="btn" color="danger" onClick="">Apply</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default Dashboard;