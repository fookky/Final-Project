import React, { useState, useEffect, useContext } from 'react'
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Display from "components/Display.jsx";
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
} from "reactstrap";

// เรียกใช้ module
import firebaseApp from '../firebase.js'


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
    const [name, setname] = useState('')
    const [restaurant, setrestaurant] = useState('')
    const [cate1, setcate1] = useState('')
    const [cate2, setcate2] = useState('')
    const [cate3, setcate3] = useState('')
    const [cate4, setcate4] = useState('')
    const [ RestaurantName, setRestaurantName ] = useState({})

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
    const userCollection = db.collection('Food2')

    async function insertDocument() {
        // insert และคืน document reference
        const documentRef = await userCollection.add({
            image,
            name,
            restaurant,
            searchkey,
            BLsearchkey,
            cate,
            Interesting:0
        })
    
        // ใช้ document reference เข้าถึงค่า document id
        alert(`new document has been inserted as ${ documentRef.id }`)

        window.location.reload(false);
    }

      const splitkey = [];
      let curName = '';
      name.split('').forEach((letter) => {
        curName += letter;
        splitkey.push(curName);
      })
      splitkey.push("@")
      splitkey.push(cate1)
      splitkey.push(cate2)
      splitkey.push(cate3)
      splitkey.push(cate4)
      const Cate = [];
      Cate.push(cate1)
      Cate.push(cate2)
      Cate.push(cate3)
      Cate.push(cate4)
      //ลบ item ใน array ที่ไม่มีค่าออก
      const cate = Cate.filter(Cate => Cate !== "")
      const searchkey = splitkey.filter(splitkey => splitkey !== "")
      //แปลงเป็น Boolean
      var BLsearchkey = {};
          searchkey.forEach(function (v) {
            BLsearchkey[v] = true;
        });

    return <div className="content">

     
        <Col md="12">
              <Card className="card-user">
                <CardHeader>
                <CardTitle tag="h5">เพิ่มเมนูอาหาร</CardTitle>
                </CardHeader>
                <CardBody>

        
         <FormGroup>
                          <label>ชื่ออาหาร</label>
                          <Input type="text" value={ name } onChange={e => setname(e.target.value)} />
                          <label>ชื่อร้านอาหาร</label>
                          <Autocomplete
                            id="ร้านอาหาร"
                            options={RestaurantName}
                            onChange={(event, newValue) => {
                              setrestaurant(newValue);
                            }}
                            renderInput={(params) => <TextField {...params}/>}
                          />
                        </FormGroup>
                        <FormGroup>
                    
                        <label>วัตถุดิบ&nbsp;&nbsp;</label>
        <select id="ddlViewBy"onChange={e => setcate1(e.target.value)} >
          <option value="None">-- Select --</option>
          <option value="หมู">หมู</option>
          <option value="ไก่">ไก่</option>
          <option value="ปลา">ปลา</option>
          <option value="เนื้อวัว">เนื้อวัว</option>
          <option value="กุ้ง">กุ้ง</option>
          <option value="หมึก">หมึก</option>
          <option value="ไข่">ไข่</option>

        </select>  
                        </FormGroup>
                        <FormGroup>
                    
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
                    </FormGroup>
                    <FormGroup>
                    
                    <label>รสชาติ&nbsp;&nbsp;</label>
                    <select id="ddlViewBy" onChange={e => setcate3(e.target.value)} >
          <option value="None">-- Select --</option>
          <option value="เปรี้ยว">เปรี้ยว</option>
          <option value="หวาน">หวาน</option>
          <option value="เค็ม">เค็ม</option>
          <option value="เผ็ด">เผ็ด</option>
          <option value="จืด">จืด</option>
    
        </select>    
                    </FormGroup>

                    <FormGroup>
                    
                    <label>สัญชาติ&nbsp;&nbsp;</label>
                    <select id="ddlViewBy" onChange={e => setcate4(e.target.value)} >
          <option value="None">-- Select --</option>
          <option value="ไทย-กลาง">ไทย-กลาง</option>
          <option value="ไทย-เหนือ">ไทย-เหนือ</option>
          <option value="ไทย-อีสาน">ไทย-อีสาน</option>
          <option value="ไทย-ใต้">ไทย-ใต้</option>
          <option value="ต่างประเทศ">ต่างประเทศ</option>
    
        </select>    
                    </FormGroup>
        <h6>Upload Image</h6>
            <input
                type="file"
                name="file"
                placeholder="Upload an image"
                onChange={uploadUimage}
            />
            {loading ? (
                <h3>กรุณารอสักครู่...</h3>
            ) : (
                <img src={image} style={{ width: '300px' }} />
            )}

        {/* ตัวแปร state จะถูกเปลี่ยนค่าเมื่อพิมพ์ข้อมูล และ trigger การ re-render */}

        
        <br/>
        {/* เรียกใช้ method เมื่อ click ปุ่ม */}
        <br/>
        <div style={{
                             
                             display: "flex",
                             justifyContent: "center",
                             
                             alignItems: "center",
                          
                           }} ><button class="btn btn-" onClick={ insertDocument }>บันทึก</button></div>

                </CardBody>
              </Card>
            </Col>
            
    </div>
}

export default Insert;