import React, { useState, useEffect, useContext } from 'react';
import firebaseApp from '../firebase.js';
import { Redirect, Link } from 'react-router-dom'
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom'
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
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import Carousel from 'react-bootstrap/Carousel'

const Member = () => {
  const db = firebaseApp.firestore()
  const PromotionsCollection = db.collection('Promotions')
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = (Uid, FName) => {
    setIsOpen(!isOpen);
    setCurrentUid(Uid)
    setCurrentFname(FName)
  }

  const [User, setUser] = useState({})
  const [Research, setResearch] = useState({})

  const [name, setName] = useState('')
  const [writer, setWriter] = useState([])
  const [journal, setJournal] = useState('')
  const [year, setYear] = useState('')
  const [quartile, setQuartile] = useState('')
  const [factor, setFactor] = useState('')

  const [seeMoreShow, setSeeMoreShow] = useState(false)
  const [editShow, setEditShow] = useState(false)

  const [idDoc, setIdDoc] = useState('')

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
      const researchRef = db.collection('research')

      // subscription นี้จะเกิด callback กับทุกการเปลี่ยนแปลงของ collection Food
      const unsubscribe = researchRef.onSnapshot(ss => {
        // ตัวแปร local
        const Research = {}

        ss.forEach(document => {
          // manipulate ตัวแปร local
          Research[document.id] = document.data()
        })

        // เปลี่ยนค่าตัวแปร state
        setResearch(Research)
      })

      return () => {
        // ยกเลิก subsciption เมื่อ component ถูกถอดจาก dom
        unsubscribe()
      }
    });
  }, [])

  // useEffect(() => {
  //   //ใช้ firebaseApp.auth().onAuthStateChanged เพื่อใช้ firebaseApp.auth().currentUser โดยไม่ติด error เมื่อทำการ signout
  //   firebaseApp.auth().onAuthStateChanged(research => {
  //     const db = firebaseApp.firestore()
  //     const researchRef = db.collection('research')

  //     // subscription นี้จะเกิด callback กับทุกการเปลี่ยนแปลงของ collection Food
  //     const unsubscribe = researchRef.onSnapshot(ss => {
  //       // ตัวแปร local
  //       const Research = {}

  //       ss.forEach(document => {
  //         // manipulate ตัวแปร local
  //         Research[document.id] = document.data()
  //       })

  //       // เปลี่ยนค่าตัวแปร state
  //       setResearch(Research)
  //       console.log(Research)
  //     })

  //     return () => {
  //       // ยกเลิก subsciption เมื่อ component ถูกถอดจาก dom
  //       unsubscribe()
  //     }
  //   });
  // }, [])

  const AllUid = [];

  function GetAllUid(e) {
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
    alert(`new document has been inserted as ${documentRef.id}`)
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
    alert(`new document has been inserted as ${documentRef.id}`)
    setPromotionDetail('')
    setPromotionCode('')
    setPromotionExpire('')
  }

  const routeChange = (e) => {
    history.push({
      pathname: '/admin/member/profile',
      search: e,
      state: { detail: e }
    });
  }

  const goToInsert=()=>{
    window.location.href="/admin/insert";
  }

  if (currentUser) {
    return <Redirect to="/member/profile" />;
  }

  function deleteDoc(id) {
    const db = firebaseApp.firestore()
    const researchRef = db.collection('research')

    // ประกาศตัวแปรเพื่ออ้างอิงไปยัง document ที่จะทำการลบ
    const documentRef = researchRef.doc(id)
    // ลบ document
    documentRef.delete()

    alert(`Deleted`)
  }

  function seeDoc(id) {

    setIdDoc(id)

    setEditShow(false)
    setSeeMoreShow(true)
    }

    function editDoc(id) {

      setIdDoc(id)
      setName(Research[id].name)
      setWriter(Research[id].writer)
      setJournal(Research[id].journal)
      setYear(Research[id].year)
      setQuartile(Research[id].quartile)
      setFactor(Research[id].factor)
  
      setSeeMoreShow(false)
      setEditShow(true)
    }
    const updateData = (index,e) => {
      // console.log('index: ' + index);
      // console.log('property name: '+ e.target.value);
  
      let newArr=writer
      newArr[index] = e
    
      setWriter(newArr);
    }
    
    const editSubmit = async () => {

      // const newData = {
      //   name: name,
      //   writer: writer,
      //   journal: journal,
      //   year: year,
      //   quartile: quartile,
      //   factor: factor
      // }
  
      const db = firebaseApp.firestore()
      const researchRef = db.collection('research')
  
      const res = await researchRef.doc(idDoc).update({
        name:name,writer:writer,journal:journal,year:year,quartile:quartile,factor:factor
      });
  
      alert(`แก้ไขสำเร็จ`)
  
      setEditShow(false)
    }
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      className="content"
    >
      <Col md="8" className="admin-insert">
        <Card className="card-user">
          <CardBody>
            <CardTitle
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            ><h3>Research Management System</h3>
            </CardTitle>
            <div className="insert">
              
                <Button
                  classname="btn btn-"
                  color="danger"
                  onClick={()=>goToInsert()}
                ><i class="fa fa-solid fa-plus"></i>
                </Button>
              
            </div>
            <Table
              hover
              responsive
              className="table-admin"
            >
              <thead>
                <tr>
                  <th>
                    #
                  </th>
                  <th>
                    Title
                  </th>
                  <th>
                    Author
                  </th>
                  <th>
                    Actions
                  </th>
                </tr>
              </thead>
              {Object.keys(Research).map((id) => {
                return <tbody>
                  <tr>
                    <th scope="row">
                      1
                    </th>
                    <td>
                      <p>{Research[id].name}</p>
                    </td>
                    <td>
                    {Object.keys(Research[id].writer).map((id2) => {
                      return <p>{Research[id].writer[id2]}</p>})}
                    </td>
                    <td>
                      <a class="btn btn-info btn-link btn-xs"
                        onClick={() => seeDoc(id)}>
                        <i class="fa fa-solid fa-eye"></i>
                      </a>
                      <a class="btn btn-success btn-link btn-xs"
                        onClick={() => editDoc(id)}>
                        <i class="fa fa-solid fa-pen"></i>
                      </a>
                      <a class="btn btn-danger btn-link btn-xs"
                        onClick={() => deleteDoc(id)}>
                        <i class="fa fa-solid fa-trash"></i>
                      </a>
                    </td>
                  </tr>
                </tbody>
              })}
            </Table>

            {/* <Col md="12">
              {Object.keys(User).map((id) => {
                return <Row>
                  <Col md="4">
                    <label>Author</label>
                    <p>{User[id].Email}</p>
                  </Col>
                  <Col md="4">
                    <label>Title</label>
                    <p>{User[id].FirstName} {User[id].LastName}</p>
                  </Col>
                  <Col md="4">
                    <p>
                      <Button value={User[id].Uid}
                        class="btn btn" onChange={GetAllUid(User[id].Uid)}
                        color="warning"
                        onClick={e => routeChange(e.target.value)}><i class="fa fa-solid fa-eye"></i>
                      </Button>
                      <Button
                        class="btn btn-" value={User[id].Uid}
                        color="success"
                        onClick={e => togglePopup(e.target.value, User[id].FirstName)}><i class="fa fa-solid fa-pen"></i>
                      </Button>
                      <Button
                        class="btn btn-" value={User[id].Uid}
                        color="danger"
                        onClick={e => togglePopup(e.target.value, User[id].FirstName)}><i class="fa fa-solid fa-trash"></i>
                      </Button>
                    </p>&nbsp;
                  </Col>
                </Row>
              })}
            </Col> */}
          </CardBody>
        </Card>
      </Col>
      <Col md='4'>
      {seeMoreShow ? (
              <Card>
                <CardHeader><h3>see more</h3></CardHeader>
                <CardBody>
                  <p>title : {Research[idDoc].name}</p>
                  <p>writer : </p>
                  {Object.keys(Research[idDoc].writer).map((id2) => {
                    return (
                      <p>{Research[idDoc].writer[id2]}</p>
                    );
                  })}
                  <p>journal : {Research[idDoc].journal}</p>
                  <p>year : {Research[idDoc].year}</p>
                  <p>quartile : {Research[idDoc].quartile}</p>
                  <p>impact factor : {Research[idDoc].factor}</p>
                </CardBody>
              </Card>
            ) : null}

{editShow ? (
              <Card>
                <CardHeader><h3>edit</h3></CardHeader>
                <CardBody>
                  <p>title</p>
                  <Input type="textarea" value={name} onChange={(e) => setName(e.target.value)}></Input>
                  <p>writer</p>
                  {Object.keys(Research[idDoc].writer).map((id2) => {
                    return (
                      <Input type='text' onChange={(e)=>updateData(id2,e.target.value)} defaultValue={writer[id2]} ></Input>
                    );
                  })}
                  <p> journal</p>
           <Input type="textarea" onChange={e => setJournal(e.target.value)}
             defaultValue={journal}></Input>

           <p>year</p>
           <Input onChange={e => setYear(e.target.value)} defaultValue={year}></Input>

           <p>quartile</p>
           <select onChange={e => setQuartile(e.target.value)}>
             <option value="None">-- Select --</option>
             <option value="Q1">Q1</option>
             <option value="Q2">Q2</option>
             <option value="Q3">Q3</option>
             <option value="Q4">Q4</option>
           </select>

           <p>impact factor</p>
           <Input defaultValue={factor} onChange={e => setFactor(e.target.value)}></Input>
                  <button onClick={() => editSubmit()}>edit</button>
                </CardBody>
              </Card>
            ) : null}
      </Col>
    </div>
  );

}

export default Member;
