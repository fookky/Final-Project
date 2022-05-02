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


  if (currentUser) {
    return <Redirect to="/member/profile" />;
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
      <Col md="10" className="admin-insert">
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
              {/* <Link to="admin/insert">
                <Button
                  classname="btn btn-"
                  color="danger"
                ><i class="fa fa-solid fa-plus"></i>
                </Button>
              </Link> */}
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
                    Author
                  </th>
                  <th>
                    Title
                  </th>
                  <th>
                    Actions
                  </th>
                </tr>
              </thead>
              {Object.keys(User).map((id) => {
                return <tbody>
                  <tr>
                    <th scope="row">
                      1
                    </th>
                    <td>
                      <p>{User[id].Email}</p>
                    </td>
                    <td>
                      <p>{User[id].FirstName} {User[id].LastName}</p>
                    </td>
                    <td>
                      <a href="C:\Users\praew\Final-Project\src\views\profile_member_admin.js"
                        title class="btn btn-info btn-link btn-xs"
                        onClick={e => routeChange(e.target.value)}>
                        <i class="fa fa-solid fa-eye"></i>
                      </a>
                      <a to="/views/editmenu.js"
                        title class="btn btn-success btn-link btn-xs"
                        onClick={e => togglePopup(e.target.value, User[id].FirstName)}>
                        <i class="fa fa-solid fa-pen"></i>
                      </a>
                      <a href="#"
                        title class="btn btn-danger btn-link btn-xs"
                        onClick={e => togglePopup(e.target.value, User[id].FirstName)}>
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
    </div>
  );

}

export default Member;
