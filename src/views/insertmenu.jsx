
import React, { useState, useEffect, useContext } from 'react'
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Display from "components/Display.jsx";
import { AppContext } from "views/admin_menu.jsx";
import {
  Card, CardHeader, CardBody, CardFooter, CardTitle,
  Row, FormGroup, Form, Input, Col,
  DropdownMenu, DropdownItem
} from "reactstrap";

// เรียกใช้ module
import firebaseApp from '../firebase.js'
import { SplitButton } from 'react-bootstrap';

function Insert() {

  const [Uimage, setUimage] = useState('')
  const [loading, setLoading] = useState(false)

  const uploadUimage = async e => {
    const files = e.target.files
    const data = new FormData()
    data.append('file', files[0])
    data.append('upload_preset', 'Food_images')
    setLoading(true)
    const res = await fetch(
      '	https://api.cloudinary.com/v1_1/daxwfdlwj/image/upload',
      {
        method: 'POST',
        body: data
      }
    )
    const file = await res.json()
    //เปลี่ยน setIimage เป็น setImage เพื่อเก็บ url โดยตรง
    setimage(file.secure_url)
    console.log(file.secure_url)
    setLoading(false)
  }

  // ประกาศตัวแปร state และ method สำหรับเปลี่ยนค่าตัวแปร
  const [image, setimage] = useState('')
  const [restaurant, setrestaurant] = useState('')
  const [cate1, setcate1] = useState('')
  const [cate2, setcate2] = useState('')
  const [cate3, setcate3] = useState('')
  const [cate4, setcate4] = useState('')
  const [RestaurantName, setRestaurantName] = useState({})

  const [all, setall] = useState('')
  const [writer, setwriter] = useState([])
  const [name, setname] = useState('')
  const [journal, setjournal] = useState('')
  const [year, setyear] = useState('')
  const [quartile, setquartile] = useState('')
  const [factor, setfactor] = useState('')

  const [allWriter, setallWriter] = useState('')

  useEffect(() => {
    //ใช้ firebaseApp.auth().onAuthStateChanged เพื่อใช้ firebaseApp.auth().currentUser โดยไม่ติด error เมื่อทำการ signout
    firebaseApp.auth().onAuthStateChanged(user => {

      const db = firebaseApp.firestore()
      const RestaurantCollection = db.collection('Restaurant')

      // subscription นี้จะเกิด callback กับทุกการเปลี่ยนแปลงของ collection Restaurant
      const unsubscribe = RestaurantCollection.onSnapshot(ss => {
        // ตัวแปร local
        const Restaurant = {}
        const RestaurantName = []

        ss.forEach(document => {
          // manipulate ตัวแปร local
          Restaurant[document.id] = document.data()
          RestaurantName.push(Restaurant[document.id].name)
        })

        // เปลี่ยนค่าตัวแปร state
        setRestaurantName(RestaurantName)
      })

      return () => {
        // ยกเลิก subsciption เมื่อ component ถูกถอดจาก dom
        unsubscribe()
      }
    });
  }, [])

  // ประกาศตัวแปรเพื่ออ้างอิง user collection
  const db = firebaseApp.firestore()
  const researchCollection = db.collection('research')

  async function insertDocument() {
    // insert และคืน document reference
    const documentRef = await researchCollection.add({
      writer, name, journal, year, quartile, factor
    })

    // ใช้ document reference เข้าถึงค่า document id
    alert(`new document has been inserted as ${documentRef.id}`)

    window.location.reload(false);
  }

  const Split = () => {
    var subData = all.split(', ');
    var writers = [];
    var text = "";
    // console.log(subData[1].length)

    for (let i = 0; i < subData.length; i++) {
      if ((subData[i].split(" ").length - 1) == 1) { writers.push(subData[i]) }
    }
    // console.log(writer.length)

    for (let i = 0; i < writers.length; i++) {
      if (i == writers.length - 1) { text = text + writers[i]; }
      if (i < writers.length - 1) { text = text + writers[i] + ", "; }
    }

    setwriter(writers)
    setallWriter(text)
    setname(subData[writers.length])
    setjournal(subData[writers.length + 1])
    setyear(subData[writers.length + 2])

    // console.log(writer)      // ทดสอบ print ข้อมูลใน writer
  }

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

  return <div className="content">

    <Col md="12">
      <Card className="card-user">
        <CardHeader>
          <CardTitle tag="h5">เพิ่มงานวิจัย</CardTitle>
        </CardHeader>
        <CardBody>

          <FormGroup>
            <label>step 1 ใส่ข้อมูลทั้งหมด</label>
            <p>โดยที่ format ดังนี้ : name1 surname1, name2 surname2, title, journal, year</p>
            <Input type="textarea" onChange={e => setall(e.target.value)} ></Input>
            <button onClick={() => Split()}>แยกตาม field</button>
          </FormGroup>

          <hr></hr>

          <label>step 2 แต่ละ field</label>

          {/* <Autocomplete id="ร้านอาหาร" options={RestaurantName}
              onChange={(event, newValue) => {
                setrestaurant(newValue);
              }}
              renderInput={(params) => <TextField {...params} />} /> */}

          <br></br>
          <FormGroup>
            <p>ผู้เขียน</p>
            {Object.keys(writer).map((id) => {
              return (
                <Row><Input type='text' value={writer[id]}></Input></Row>
              );
            })}
            <p>ชื่อเรื่อง</p>
            <Input type="textarea" onChange={e => setname(e.target.value)} value={name}></Input>

            <p>ชื่อ journal</p>
            <Input onChange={e => setjournal(e.target.value)} value={journal}></Input>

            <p>ปี</p>
            <Input onChange={e => setyear(e.target.value)} value={year}></Input>

            <p>quartile</p>
            <select id="ddlViewBy" onChange={e => setquartile(e.target.value)} >
              <option value="None">-- Select --</option>
              <option value="Q1">Q1</option>
              <option value="Q2">Q2</option>
              <option value="Q3">Q3</option>
              <option value="Q4">Q4</option>
            </select>

            <p>impact factor</p>
            <Input onChange={e => setfactor(e.target.value)}></Input>
          </FormGroup>
          <button class="btn btn-" onClick={insertDocument}>บันทึก</button>

          {/* <FormGroup>
            <label>วัตถุดิบ&nbsp;&nbsp;</label>
            <select id="ddlViewBy" onChange={e => setcate1(e.target.value)} >
              <option value="None">-- Select --</option>
              <option value="หมู">หมู</option>
              <option value="ไก่">ไก่</option>
              <option value="ปลา">ปลา</option>
              <option value="เนื้อวัว">เนื้อวัว</option>
              <option value="กุ้ง">กุ้ง</option>
              <option value="หมึก">หมึก</option>
              <option value="ไข่">ไข่</option>
            </select>
          </FormGroup> */}

          {/* <FormGroup>
            <label>วิธีการ&nbsp;&nbsp;</label>
            <select id="ddlViewBy" onChange={e => setcate2(e.target.value)} >
              <option value="None">-- Select --</option>
              <option value="ผัด">ผัด</option>
              <option value="ต้ม">ต้ม</option>
              <option value="ตุ๋น">ตุ๋น</option>
              <option value="ปิ้ง">ปิ้ง/ย่าง</option>
              <option value="ทอด">ทอด</option>
              <option value="นิ่ง">นึ่ง</option>
              <option value="ไมโครเวฟ">ไมโครเวฟ</option>
            </select>
          </FormGroup> */}

          {/* <FormGroup>
            <label>รสชาติ&nbsp;&nbsp;</label>
            <select id="ddlViewBy" onChange={e => setcate3(e.target.value)} >
              <option value="None">-- Select --</option>
              <option value="เปรี้ยว">เปรี้ยว</option>
              <option value="หวาน">หวาน</option>
              <option value="เค็ม">เค็ม</option>
              <option value="เผ็ด">เผ็ด</option>
              <option value="จืด">จืด</option>
            </select>
          </FormGroup> */}

          {/* <FormGroup>
            <label>สัญชาติ&nbsp;&nbsp;</label>
            <select id="ddlViewBy" onChange={e => setcate4(e.target.value)} >
              <option value="None">-- Select --</option>
              <option value="ไทย-กลาง">ไทย-กลาง</option>
              <option value="ไทย-เหนือ">ไทย-เหนือ</option>
              <option value="ไทย-อีสาน">ไทย-อีสาน</option>
              <option value="ไทย-ใต้">ไทย-ใต้</option>
              <option value="ต่างประเทศ">ต่างประเทศ</option>
            </select>
          </FormGroup> */}

          {/* <h6>Upload Image</h6>
          <input type="file" name="file" placeholder="Upload an image" onChange={uploadUimage} />
          {loading ? (<h3>กรุณารอสักครู่...</h3>) : (<img src={image} style={{ width: '300px' }} />)}

          <br />

          <br />
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }} ></div> */}

        </CardBody>
      </Card>
    </Col>

  </div>
}

export default Insert;