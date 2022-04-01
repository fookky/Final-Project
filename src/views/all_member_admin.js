import React, { useState, useEffect, useContext } from 'react';
import firebaseApp from '../firebase.js';
import { Redirect } from 'react-router-dom'
import { BrowserRouter as Router, Route, Switch ,useHistory} from 'react-router-dom'
import { AuthContext } from "components/Auth/Auth.js";
import profile from "views/profile_member_admin.js";

import Popup from "views/Popup.js";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  Table,
} from "reactstrap";
import Carousel from 'react-bootstrap/Carousel'

const Member = () => {

 
  const db = firebaseApp.firestore()
  const PromotionsCollection = db.collection('Promotions') 
  const [isOpen, setIsOpen] = useState(false);
 
  const togglePopup = (Uid,FName) => {
    setIsOpen(!isOpen);
    setCurrentUid(Uid)
    setCurrentFname(FName)
  }

  const [ User, setUser ] = useState({})


  const [ CurrentUid, setCurrentUid ] = useState('')
  const [ CurrentFname, setCurrentFname ] = useState('')

  const [ PromotionDetail, setPromotionDetail ] = useState('')
  const [ PromotionCode, setPromotionCode ] = useState('')
  const [ PromotionExpire, setPromotionExpire ] = useState('')

  const { currentUser } = useContext(AuthContext);

  const history = useHistory()
  

  useEffect(() => {
    //ใช้ firebaseApp.auth().onAuthStateChanged เพื่อใช้ firebaseApp.auth().currentUser โดยไม่ติด error เมื่อทำการ signout
    firebaseApp.auth().onAuthStateChanged(user => {
        const db = firebaseApp.firestore()
        const userCollection = db.collection('User')      

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

  const AllUid = [];
  
  function GetAllUid(e){
    AllUid.push(e)
  }


  async function AddPromotion() {
    const Uid = [];
    Uid.push(CurrentUid)
    // insert และคืน document reference
    const documentRef = await PromotionsCollection.add({
      
      PromotionDetail,
      PromotionCode,
      PromotionExpire,
      Uid,

    })

    // ใช้ document reference เข้าถึงค่า document id
    alert(`new document has been inserted as ${ documentRef.id }`)
    setPromotionDetail('')
    setPromotionCode('')
    setPromotionExpire('')
  }

  async function AddPromotionALL() {
    const Uid = AllUid;
    // insert และคืน document reference
    const documentRef = await PromotionsCollection.add({
      
      PromotionDetail,
      PromotionCode,
      PromotionExpire,
      Uid,

    })

    // ใช้ document reference เข้าถึงค่า document id
    alert(`new document has been inserted as ${ documentRef.id }`)
    setPromotionDetail('')
    setPromotionCode('')
    setPromotionExpire('')
  }

  const routeChange = (e) =>{ 
    history.push({
      pathname: '/admin/member/profile',
      search: e,
      state: { detail: e }
  });
  }


  if (currentUser) {
      return <Redirect to="/member/profile" />;
  }
  
    return (
      <>

        <div className="content">
          
          <Row>

            <Col md="9">
              <Card className="ex3">
                <CardHeader>
                  <CardTitle className="content"><h3>ระบบจัดการสมาชิก</h3></CardTitle>
                </CardHeader>
                { Object.keys(User).map((id) => {

                  return<Row>
                      <Col md="4">
                      <p>&nbsp;&nbsp;{User[id].Email}</p>
                      </Col>
                      <Col md="4">
                      <p>{User[id].FirstName} {User[id].LastName}</p>
                      </Col>
                      <Col md="4">
                      <p><button value={User[id].Uid} class="btn btn-warning" onChange={GetAllUid(User[id].Uid)} onClick={e =>routeChange(e.target.value)}>ดูโปรไฟล์</button><button class="btn btn-success" value={User[id].Uid}  onClick={e =>togglePopup(e.target.value,User[id].FirstName)}>เพิ่มโปรโมชั่น</button></p>&nbsp;&nbsp;
                      </Col>
                  </Row>
                  
                }) } 
              </Card>
            </Col>
            <Col md="3">
              <Card className="card-user">
                <CardHeader>
                <CardTitle style={{
                             
                             display: "flex",
                             justifyContent: "center",
                             
                             alignItems: "center",
                          
                           }} tag="h5">เพิ่มโปรโมชั่นสำหรับ</CardTitle>
                <CardTitle  style={{
                             
                             display: "flex",
                             justifyContent: "center",
                             
                             alignItems: "center",
                          
                           }} tag="h5">สมาชิกทุกคน</CardTitle>

                </CardHeader>
                <CardBody>

                   
         
<label>รายละเอียดโปรชั่น</label>
                          <Input type="text" onChange={e => setPromotionDetail(e.target.value)} />
                          <br/>
<label>โค้ดส่วนลด</label>

                       
                          <Input type="text" onChange={e => setPromotionCode(e.target.value)}/>
                          <br/>
                          <label>วันหมดเขต</label>
                         <Input
                        
                           type="date"
                           onChange={e => setPromotionExpire(e.target.value)}
                         />
<div  style={{
                             
                             display: "flex",
                             justifyContent: "center",
                             
                             alignItems: "center",
                          
                           }} >   <button  class="btn btn-" onClick={AddPromotionALL}>ยืนยัน</button></div>
     
     

                </CardBody>
              </Card>
            </Col>
          </Row>
         
    {isOpen && <Popup
      content={<>
<h5>เพิ่มโปรโมชั่น สำหรับ {CurrentFname}</h5>
<label>รายละเอียดโปรชั่น</label>
                          <Input type="text" onChange={e => setPromotionDetail(e.target.value)}/>
                          <br/>
<label>โค้ดส่วนลด</label>

                       
                          <Input type="text" onChange={e => setPromotionCode(e.target.value)}/>
                          <br/>
                          <label>วันหมดเขต</label>
                         <Input
                        
                           type="date"
                           onChange={e => setPromotionExpire(e.target.value)}
                         />
<div  style={{
                             
                             display: "flex",
                             justifyContent: "center",
                             
                             alignItems: "center",
                          
                           }} >   <button  class="btn btn-info" onClick={AddPromotion}>ยืนยัน</button></div>
     
      </>}
      handleClose={togglePopup}
      
    />}

        </div>
      </>
    );

}

export default Member;
