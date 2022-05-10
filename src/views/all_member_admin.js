
import React, { useState, useEffect, useContext } from 'react';
import firebaseApp from '../firebase.js';
import { Redirect } from 'react-router-dom'
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom'
import { AuthContext } from "components/Auth/Auth.js";
import profile from "views/profile_member_admin.js";

import Popup from "views/Popup.js";
// reactstrap components
import {
  Button, Card, CardHeader, CardBody, CardFooter,
  CardTitle, FormGroup, Form, Input, Row,
  Col, Table, Modal, ModalHeader, ModalBody,
  ModalFooter
} from "reactstrap";
import Carousel from 'react-bootstrap/Carousel'
import { event } from 'firebase-functions/lib/providers/analytics';

const Member = () => {

  const db = firebaseApp.firestore()
  const PromotionsCollection = db.collection('Promotions')
  const [isOpen, setIsOpen] = useState(false);

  const [seeMoreShow, setSeeMoreShow] = useState(false)
  const [editShow, setEditShow] = useState(false)
  const [popupOpen, setPopupOpen] = useState(false)

  const [idDoc, setIdDoc] = useState('')

  const [name, setName] = useState('')
  const [writer, setWriter] = useState([])
  const [journal, setJournal] = useState('')
  const [year, setYear] = useState('')
  const [quartile, setQuartile] = useState('')
  const [factor, setFactor] = useState('')

  const [User, setUser] = useState({})

  const [CurrentUid, setCurrentUid] = useState('')
  const [CurrentFname, setCurrentFname] = useState('')

  const [PromotionDetail, setPromotionDetail] = useState('')
  const [PromotionCode, setPromotionCode] = useState('')
  const [PromotionExpire, setPromotionExpire] = useState('')

  const { currentUser } = useContext(AuthContext);

  const history = useHistory()

  useEffect(() => {
    //ใช้ firebaseApp.auth().onAuthStateChanged เพื่อใช้ firebaseApp.auth().currentUser โดยไม่ติด error เมื่อทำการ signout
    firebaseApp.auth().onAuthStateChanged(user => {
      const db = firebaseApp.firestore()
      const userCollection = db.collection('research')

      // subscription นี้จะเกิด callback กับทุกการเปลี่ยนแปลงของ collection Food
      const unsubscribe = userCollection.onSnapshot(ss => {
        // ตัวแปร local
        const Research = {}

        ss.forEach(document => {
          // manipulate ตัวแปร local
          Research[document.id] = document.data()
        })

        // เปลี่ยนค่าตัวแปร state
        setUser(Research)
      })

      return () => {
        // ยกเลิก subsciption เมื่อ component ถูกถอดจาก dom
        unsubscribe()
      }
    });
  }, [])

  const AllUid = [];

  // function GetAllUid(e) { AllUid.push(e) }

  const togglePopup = (id) => {
    setIsOpen(true);
    setIdDoc(id)
    // setCurrentUid(Uid)
    // setCurrentFname(FName)
  }

  async function AddPromotion() {
    const Uid = [];
    Uid.push(CurrentUid)
    // insert และคืน document reference
    const documentRef = await PromotionsCollection.add({
      PromotionDetail,
      PromotionCode,
      PromotionExpire,
      Uid
    })

    // ใช้ document reference เข้าถึงค่า document id
    alert(`new document has been inserted as ${documentRef.id}`)
    setPromotionDetail('')
    setPromotionCode('')
    setPromotionExpire('')
  }

  // async function AddPromotionALL() {
  //   const Uid = AllUid;
  //   // insert และคืน document reference
  //   const documentRef = await PromotionsCollection.add({
  //     PromotionDetail,
  //     PromotionCode,
  //     PromotionExpire,
  //     Uid
  //   })

  //   // ใช้ document reference เข้าถึงค่า document id
  //   alert(`new document has been inserted as ${documentRef.id}`)
  //   setPromotionDetail('')
  //   setPromotionCode('')
  //   setPromotionExpire('')
  // }

  // const routeChange = (e) => {
  //   history.push({
  //     pathname: '/admin/member/profile',
  //     search: e,
  //     state: { detail: e }
  //   });
  // }

  // if (currentUser) { return <Redirect to="/member/profile" />; }

  function popupShow(id) {
    setIdDoc(id)
    setPopupOpen(true)
  }

  function deleteDoc() {
    const db = firebaseApp.firestore()
    const researchRef = db.collection('research')

    // ประกาศตัวแปรเพื่ออ้างอิงไปยัง document ที่จะทำการลบ
    const documentRef = researchRef.doc(idDoc)
    // ลบ document
    documentRef.delete()

    alert(`Deleted`)
  }

  function seeDoc(id) {

    setIdDoc(id)
    setName(User[id].name)

    setEditShow(false)
    setSeeMoreShow(true)
  }

  const editDoc = (id) => {

    setIdDoc(id)
    setName(User[id].name)
    setWriter(User[id].writer)

    setSeeMoreShow(false)
    setEditShow(true)

    // let content = (<Card>
    //   <CardHeader><h1>แก้ไข</h1></CardHeader>
    //   <CardBody>
    //     <FormGroup>
    //       <p>ชื่อเรื่อง{Name}</p>
    //       <Input type="textarea" onChange={(e) => setName(e.target.value)}
    //       ></Input>

    //       <p>ผู้เขียน</p>
    //       {Object.keys(User[id].writer).map((id2) => {
    //         return (
    //           <Input type='text' defaultValue={User[id].writer[id2]}></Input>
    //         );
    //       })}

    //       <p>ชื่อ journal</p>
    //       <Input type="textarea" onChange={e => setJournal(e.target.value)}
    //         defaultValue={User[id].journal}></Input>

    //       <p>ปี</p>
    //       <Input onChange={e => setYear(e.target.value)} defaultValue={User[id].year}></Input>

    //       <p>quartile</p>
    //       <select onChange={e => setQuartile(e.target.value)}>
    //         <option value="None">-- Select --</option>
    //         <option value="Q1">Q1</option>
    //         <option value="Q2">Q2</option>
    //         <option value="Q3">Q3</option>
    //         <option value="Q4">Q4</option>
    //       </select>

    //       <p>impact factor</p>
    //       <Input defaultValue={User[id].factor} onChange={e => setFactor(e.target.value)}></Input>
    //     </FormGroup>
    //     <button onClick={() => editSubmit(id)}>แก้ไข</button>
    //   </CardBody>
    // </Card>)
  }

  const updateData = (index, e) => {
    // console.log('index: ' + index);
    // console.log('property name: '+ e.target.value);

    let newArr = writer
    newArr[index] = e

    setWriter(newArr);
  }

  const editSubmit = async () => {

    const newData = {
      name: name,
      writer: writer,
      journal: journal,
      year: year,
      quartile: quartile,
      factor: factor
    }

    const db = firebaseApp.firestore()
    const researchRef = db.collection('research')

    const res = await researchRef.doc(idDoc).update({
      name: name, writer: writer
    });

    alert(`แก้ไขสำเร็จ`)

    setEditShow(false)
  }

  return (
    <div className='mt-5 mx-2'>
      <div className="content">
        <Row>

          <Col md="7">
            <Card className="ex3">
              <CardHeader>
                <CardTitle className="content"><h3>ระบบจัดการงานวิจัย</h3></CardTitle>
              </CardHeader>
              {Object.keys(User).map((id) => {
                return <Row>
                  <Col md="4">
                    <p>&nbsp;&nbsp;{User[id].name}</p>
                  </Col>
                  <Col md="4">
                    {Object.keys(User[id].writer).map((id2) => {
                      return <p>{User[id].writer[id2]}</p>
                    })}
                  </Col>
                  <Col md="4">
                    <p>{/*<button value={User[id].Uid} class=""
                      onChange={GetAllUid(User[id].Uid)}
                      onClick={e => routeChange(e.target.value)}>ดูงาน</button>
                      <button class="mx-1" value={User[id].Uid}
                  onClick={e => togglePopup(e.target.value, User[id].FirstName)}>แก้ไข</button>*/}
                      <button onClick={() => seeDoc(id)}>ดูงาน</button>
                      <button onClick={() => editDoc(id)} class="mx-1">แก้ไข</button>
                      <button onClick={() => popupShow(id)}>ลบ</button></p>&nbsp;&nbsp;
                  </Col>
                </Row>
              })}
            </Card>
          </Col>

          <Col md="5">
            {/* <Card className="card-user">
              <CardHeader>
                <CardTitle style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }} tag="h5">เพิ่มโปรโมชั่นสำหรับ</CardTitle>
                <CardTitle style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }} tag="h5">สมาชิกทุกคน</CardTitle>
              </CardHeader>
              <CardBody>
                <label>รายละเอียดโปรชั่น</label>
                <Input type="text" onChange={e => setPromotionDetail(e.target.value)} />
                <br />
                <label>โค้ดส่วนลด</label>
                <Input type="text" onChange={e => setPromotionCode(e.target.value)} />
                <br />
                <label>วันหมดเขต</label>
                <Input type="date" onChange={e => setPromotionExpire(e.target.value)} />
                <div style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }} >
                  <button class="btn btn-" onClick={AddPromotionALL}>ยืนยัน</button></div>
              </CardBody>
            </Card> */}

            {seeMoreShow ? (
              <Card>
                <CardHeader><h3>ดูงาน</h3></CardHeader>
                <CardBody>
                  <p>title : {name}</p>
                </CardBody>
              </Card>
            ) : null}

            {editShow ? (
              <Card>
                <CardHeader><h3>แก้ไข</h3></CardHeader>
                <CardBody>
                  <p>ชื่อเรื่อง</p>
                  <Input type="textarea" value={name} onChange={(e) => setName(e.target.value)}></Input>
                  <p>ผู้เขียน</p>
                  {Object.keys(User[idDoc].writer).map((id2) => {
                    return (
                      <Input type='text' onChange={(e) => updateData(id2, e.target.value)} defaultValue={User[idDoc].writer[id2]} ></Input>
                    );
                  })}
                  <button onClick={() => editSubmit()}>แก้ไข</button>
                </CardBody>
              </Card>
            ) : null}

          </Col>

        </Row>

        <Modal isOpen={popupOpen} size="lg">
        <ModalHeader >Design your Popup</ModalHeader>
        <ModalBody>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </ModalBody>
        <ModalFooter>
          <button color="primary" >Done</button>
          <button color="secondary" onClick={e=>setPopupOpen(false)}>Cancel</button>
        </ModalFooter>
      </Modal>

        {/*popupOpen && <Popup
          content={<div>
            <h5>เพิ่มโปรโมชั่น สำหรับ {CurrentFname}</h5>
            <label>รายละเอียดโปรชั่น</label>
            <Input type="text" onChange={e => setPromotionDetail(e.target.value)} />
            <br />
            <label>โค้ดส่วนลด</label>
            <Input type="text" onChange={e => setPromotionCode(e.target.value)} />
            <br />
            <label>วันหมดเขต</label>
            <Input type="date" onChange={e => setPromotionExpire(e.target.value)} />
            <div style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }} >
              <button class="btn btn-info" onClick={AddPromotion}>ยืนยัน</button></div>
          </div>} handleClose={e => { setPopupOpen(false) }}>
          </Popup>*/}

      </div>
    </div>
  );

}

export default Member;
