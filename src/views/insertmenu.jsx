import React, { useState, useEffect, useContext } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import { AuthContext } from "components/Auth/Auth.js";
import { Redirect } from "react-router-dom";
import Display from "components/Display.jsx";
import { AppContext } from "views/admin_menu.jsx";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  FormGroup,
  Form,
  Input,
  Col,
  DropdownMenu,
  DropdownItem,
  Button,
  Select,
} from "reactstrap";

// เรียกใช้ module
import firebaseApp from "../firebase.js";
import { SplitButton } from "react-bootstrap";

function Insert() {
  const [Uimage, setUimage] = useState("");
  const [loading, setLoading] = useState(false);

  const uploadUimage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "Food_images");
    setLoading(true);
    const res = await fetch(
      "	https://api.cloudinary.com/v1_1/daxwfdlwj/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const file = await res.json();
    //เปลี่ยน setIimage เป็น setImage เพื่อเก็บ url โดยตรง
    setimage(file.secure_url);
    console.log(file.secure_url);
    setLoading(false);
  };

  // ประกาศตัวแปร state และ method สำหรับเปลี่ยนค่าตัวแปร
  const [image, setimage] = useState("");
  const [restaurant, setrestaurant] = useState("");
  const [RestaurantName, setRestaurantName] = useState({});

  const [userMe, setUserMe] = useState({});
  const [userMeRole, setUserMeRole] = useState("");

  const [all, setall] = useState("");
  const [writer, setwriter] = useState([]);
  const [name, setname] = useState("");
  const [journal, setjournal] = useState("");
  const [year, setyear] = useState("");
  const [quartile, setquartile] = useState("");
  const [factor, setfactor] = useState("");

  const [allWriter, setallWriter] = useState("");

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    //ใช้ firebaseApp.auth().onAuthStateChanged เพื่อใช้ firebaseApp.auth().currentUser โดยไม่ติด error เมื่อทำการ signout
    firebaseApp.auth().onAuthStateChanged((user) => {
      const db = firebaseApp.firestore();
      const userRef = db
        .collection("User")
        .where("Uid", "==", firebaseApp.auth().currentUser.uid);

      // subscription นี้จะเกิด callback กับทุกการเปลี่ยนแปลงของ collection Food
      const unsubscribe = userRef.onSnapshot((ss) => {
        // ตัวแปร local
        const User = {};

        ss.forEach((document) => {
          // manipulate ตัวแปร local
          User[document.id] = document.data();
          setUserMeRole(User[document.id].Role);
        });

        // เปลี่ยนค่าตัวแปร state
        setUserMe(User);
      });

      return () => {
        // ยกเลิก subsciption เมื่อ component ถูกถอดจาก dom
        unsubscribe();
      };
    });
  }, []);

  useEffect(() => {
    //ใช้ firebaseApp.auth().onAuthStateChanged เพื่อใช้ firebaseApp.auth().currentUser โดยไม่ติด error เมื่อทำการ signout
    firebaseApp.auth().onAuthStateChanged((user) => {
      const db = firebaseApp.firestore();
      const RestaurantCollection = db.collection("Restaurant");

      // subscription นี้จะเกิด callback กับทุกการเปลี่ยนแปลงของ collection Restaurant
      const unsubscribe = RestaurantCollection.onSnapshot((ss) => {
        // ตัวแปร local
        const Restaurant = {};
        const RestaurantName = [];

        ss.forEach((document) => {
          // manipulate ตัวแปร local
          Restaurant[document.id] = document.data();
          RestaurantName.push(Restaurant[document.id].name);
        });

        // เปลี่ยนค่าตัวแปร state
        setRestaurantName(RestaurantName);
      });

      return () => {
        // ยกเลิก subsciption เมื่อ component ถูกถอดจาก dom
        unsubscribe();
      };
    });
  }, []);

  if (!currentUser) {
    return <Redirect to="/general/login" />;
  }

  // ประกาศตัวแปรเพื่ออ้างอิง user collection
  const db = firebaseApp.firestore();
  const researchCollection = db.collection("research");

  async function insertDocument() {
    // if (userMeRole.localeCompare("admin") !== 0) { alert(`Sorry, you are not admin.`); }
    // else {
    if (name !== "" && journal !== "" && year !== "" && factor !== "") {
      // insert และคืน document reference
      const documentRef = await researchCollection.add({
        writer,
        name,
        journal,
        year,
        quartile,
        factor,
      });

      alert(`Successful`);

      window.location.reload(false);

      window.location.href = "/member/insert";
    } else {
      alert(`Please fill in the blanks.`);
    }
    // }
  }

  const Split = () => {
    var subData = all.split(",");
    var writers = [];
    var text = "";
    // console.log(subData[1].length)

    for (let i = 0; i < subData.length; i++) {
      if (subData[i].split(" ").length - 1 <= 2) {
        writers.push(subData[i]);
      }
      if (subData[i].split(" ").length - 1 > 2) {
        break;
      }
    }
    // console.log(writer.length)

    for (let i = 0; i < writers.length; i++) {
      if (i == writers.length - 1) {
        text = text + writers[i];
      }
      if (i < writers.length - 1) {
        text = text + writers[i] + ", ";
      }
    }

    setwriter(writers);
    setallWriter(text);
    setname(subData[writers.length]);
    setjournal(subData[writers.length + 1]);
    setyear(subData[writers.length + 2]);

    // console.log(writer)      // ทดสอบ print ข้อมูลใน writer
  };

  // const splitkey = [];
  // let curName = '';
  // name.split('').forEach((letter) => {
  //   curName += letter;
  //   splitkey.push(curName);
  // })
  // splitkey.push("@")
  // splitkey.push(cate1)
  // splitkey.push(cate2)
  // splitkey.push(cate3)
  // splitkey.push(cate4)
  // const Cate = [];
  // Cate.push(cate1)
  // Cate.push(cate2)
  // Cate.push(cate3)
  // Cate.push(cate4)

  // const cate = Cate.filter(Cate => Cate !== "")
  // const searchkey = splitkey.filter(splitkey => splitkey !== "")

  // var BLsearchkey = {};
  //     searchkey.forEach(function (v) {
  //       BLsearchkey[v] = true;
  //   });

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      className="content"
    >
      <Col md="8">
        <Card className="card-user">
          <CardBody>
            <Form>
              <CardTitle
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                className="content"
              >
                <h3></h3>
              </CardTitle>
              <Row>
                <Col md="12">
                  <FormGroup>
                    <label>Step 1 Enter all the information.</label>
                    <p>
                      Where Format is as follows: Name1 Surname1, Name2
                      Surname2, Title, Journal, Year
                    </p>
                    <Input
                      type="textarea"
                      onChange={(e) => setall(e.target.value)}
                    ></Input>
                    <button
                      type="button"
                      right
                      class="btn btn-outline-danger"
                      onClick={() => Split()}
                    >
                      Sorted by field
                    </button>
                  </FormGroup>
                </Col>
              </Row>

              <hr></hr>

              <Row>
                <Col md="12">
                  <FormGroup>
                    <label>Step 2 Each field</label>
                    <p>Author</p>
                    {Object.keys(writer).map((id) => {
                      return (
                        <Col md="12">
                          <Row>
                            <Input
                              type="text"
                              defaultValue={writer[id]}
                            ></Input>
                          </Row>
                          <br/>
                        </Col>
                      );
                    })}

                    <p>Title</p>
                    <Input
                      type="textarea"
                      onChange={(e) => setname(e.target.value)}
                      defaultValue={name}
                    ></Input>

                    <br></br>

                    <p>Journal</p>
                    <Input
                      type="textarea"
                      onChange={(e) => setjournal(e.target.value)}
                      defaultValue={journal}
                    ></Input>

                    <br></br>

                    <Row>
                      <Col md="4">
                        <p>Year</p>
                        <Input
                          onChange={(e) => setyear(e.target.value)}
                          defaultValue={year}
                        ></Input>
                      </Col>
                      <Col md="4">
                        <p>Quartile</p>
                        <Input
                          bsSize=""
                          type="select"
                          onChange={(e) => setquartile(e.target.value)}
                        >
                          <option value="None">-- Select --</option>
                          <option value="Q1">Q1</option>
                          <option value="Q2">Q2</option>
                          <option value="Q3">Q3</option>
                          <option value="Q4">Q4</option>
                          <option value="TCI1">TCI1</option>
                          <option value="TCI2">TCI2</option>
                        </Input>
                      </Col>
                      <Col md="4">
                        <p>Impact Factor</p>
                        <Input
                          onChange={(e) => setfactor(e.target.value)}
                        ></Input>
                      </Col>
                    </Row>

                    <br></br>

                    <p>File</p>
                    <Input id="exampleFile" multiple name="file" type="file" />
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <div className="update ml-auto mr-auto">
                  <Button
                    classname="btn btn-"
                    onClick={insertDocument}
                    color="danger"
                  >
                    Save
                  </Button>
                </div>
              </Row>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </div>
  );
}

export default Insert;
