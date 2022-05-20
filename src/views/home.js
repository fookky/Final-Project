
import React, { useState, useEffect, useContext } from 'react';
import firebaseApp from '../firebase.js';
import { Redirect } from 'react-router-dom'
import { AuthContext } from "components/Auth/Auth.js";
// react plugin used to create charts
import { Line, Pie } from "react-chartjs-2";
import { Link } from 'react-router-dom';
// reactstrap components
import { Col, Card, Row } from "react-bootstrap";
import {
  Button, CardHeader, CardBody, CardFooter, CardTitle,
  FormGroup, Form, Input, InputGroup, InputGroupText,
  InputGroupAddon, Table, Modal, ModalHeader, ModalBody,
  ModalFooter, CarouselItem, CarouselControl, CarouselIndicators, CarouselCaption
} from "reactstrap";
import Carousel from 'react-bootstrap/Carousel';
// core components
import { dashboard24HoursPerformanceChart, dashboardEmailStatisticsChart, dashboardNASDAQChart } from "variables/charts.js";


function Home() {

  const [Food, setFood] = useState({})
  const [FoodName, setFoodName] = useState({})
  const [cate, setCate] = useState('')
  const [cate2, setCate2] = useState('')
  const [cate3, setCate3] = useState('')
  const [cate4, setCate4] = useState('')
  const [cate5, setCate5] = useState('')

  const [search, setSearch] = useState('')

  const [idDoc, setIdDoc] = useState('')
  const [seeMoreModalShow, setSeeMoreModalShow] = useState(false)
  const [resultShow, setResultShow] = useState(false)

  const [filterTitle, setFilterTile] = useState('')
  const [filterWriters, setFilterWriters] = useState([])
  const [filterJournal, setFilterJounal] = useState('')
  const [filterYear, setfilterYear] = useState('')
  const [filterQuartile, setFilterQuartile] = useState('')
  const [filterFactor, setFilterFactor] = useState('')

  const [research, setResearch] = useState([])
  const [title, setTtile] = useState('')
  const [writers, setWriters] = useState([])
  const [journal, setJounal] = useState('')
  const [year, setYear] = useState('')
  const [quartile, setQuartile] = useState('')
  const [dropdown, setDropdown] = useState('title')
  const [filter, setFilter] = useState({})

  // ประกาศตัวแปรเพื่ออ้างอิง user collection
  const db = firebaseApp.firestore()
  const Collection = db.collection('Food2')
  const userCollection = db.collection('Food2')

  const researchRef = db.collection('research')

  useEffect(() => {
    // subscription นี้จะเกิด callback กับทุกการเปลี่ยนแปลงของ collection Food
    const unsubscribe = researchRef.onSnapshot(ss => {
      // ตัวแปร local
      const research = []

      ss.forEach(document => {
        // manipulate ตัวแปร local
        research.push(document.data())
      })

      // เปลี่ยนค่าตัวแปร state
      setResearch(research)
      // console.log(research)
    })

    return () => {
      // ยกเลิก subsciption เมื่อ component ถูกถอดจาก dom
      unsubscribe()
    }
  }, [])   //เมื่อค่า cate เปลี่ยนจะทำการอัพเดท useEffect ใหม่ #ไอห่า หาเป็นวันกว่าจะได้

  const { currentUser } = useContext(AuthContext);

  if (currentUser) { return <Redirect to="/member/home" />; }

  function clearall() {
    document.getElementById("formFind").reset()
    setYear("")
    setQuartile("")
    setResultShow(false)
  }

  const goToSeemore = () => { window.location.href = "/admin/seemore"; }

  function find() {
    const researchAll = research
    let filter = []

    if (search != '') {
      if (dropdown == "title") {
        for (let i = 0; i < researchAll.length; i++) {
          if (researchAll[i].name.toLowerCase().includes(search.toLowerCase())) {
            filter.push(researchAll[i])
          }
        }
      }

      if (dropdown == "researcher") {
        for (let i = 0; i < researchAll.length; i++) {
          let count = 0
          for (let j = 0; j < researchAll[i].writer.length; j++) {
            if (researchAll[i].writer[j].toLowerCase().includes(search.toLowerCase())) { count++ }
          }
          if (count > 0) {
            filter.push(researchAll[i])
          }
        }
      }

      if (dropdown == "journal") {
        for (let i = 0; i < researchAll.length; i++) {
          if (researchAll[i].journal.toLowerCase().includes(search.toLowerCase())) {
            filter.push(researchAll[i])
          }
        }
      }
    }

    if (search == '') { filter = researchAll }

    if (year != '') {
      let yearFilter = []
      for (let i = 0; i < filter.length; i++) {
        if (filter[i].year == year) { yearFilter.push(filter[i]) }
      }
      filter = yearFilter
    }

    if (quartile != '') {
      let quartileFilter = []
      for (let i = 0; i < filter.length; i++) {
        if (filter[i].quartile == quartile) { quartileFilter.push(filter[i]) }
      }
      filter = quartileFilter
    }

    setFilter(filter)
    setResultShow(true)
    // console.log(filter[1].writer)
    // console.log(researchAll.name)
    // console.log(dropdown)
    // console.log(search)
  }

  // const { currentUser } = useContext(AuthContext);
  // if (currentUser) { return <Redirect to="/member/menu" />; }

  function deleteDocument(id) {
    // ประกาศตัวแปรเพื่ออ้างอิงไปยัง document ที่จะทำการลบ
    const documentRef = researchRef.doc(id)
    // ลบ document
    documentRef.delete()

    alert(`document ${id} has been deleted`)
  }

  function seeDocModal(id) {
    setIdDoc(id)
    setSeeMoreModalShow(true)

    setFilterTile(filter[id].name)
    setFilterWriters(filter[id].writer)
    setFilterJounal(filter[id].journal)
    setfilterYear(filter[id].year)
    setFilterQuartile(filter[id].quartile)
    setFilterFactor(filter[id].factor)
  }

  return (
    <div className="content">
      <Row className='mb-3' style={{ display: "flex", justifyContent: "center" }}>
        <Col md="10">
          {/* <img className="img-banner" alt="..." src="https://imgz.io/images/2022/05/02/--.gif" /> */}
          <Carousel>
            <Carousel.Item interval={2000}>
              <img
                className="d-block w-100"
                src="https://kirim.kmutt.ac.th/error/styleKmutt/images/banner01.jpg"
                alt="First slide"
                height="330"
              />
            </Carousel.Item>
            <Carousel.Item interval={2000}>
              <img
                className="d-block w-100"
                src="https://www.img.in.th/images/e0456369f65428ea2b0c62d34d0635c8.jpg"
                alt="Second slide"
                height="330"
              />
            </Carousel.Item >
            <Carousel.Item interval={2000}>
              <img
                className="d-block w-100"
                src="https://www.img.in.th/images/63822dd2a88640b8ff9f7edbaf266887.jpg"
                alt="Third slide"
                height="330"
              />
            </Carousel.Item>
            <Carousel.Item interval={2000}>
              <img
                className="d-block w-100"
                src="https://kirim.kmutt.ac.th/error/styleKmutt/images/banner04.jpg"
                alt="Third slide"
                height="330"
              />
            </Carousel.Item>
            <Carousel.Item interval={2000}>
              <img
                className="d-block w-100"
                src="https://www.img.in.th/images/b38edcbe9c62509e837e92096f519828.jpg"
                alt="Third slide"
                height="330"
              />
            </Carousel.Item>
            <Carousel.Item interval={2000}>
              <img
                className="d-block w-100"
                src="https://kirim.kmutt.ac.th/error/styleKmutt/images/banner06.jpg"
                alt="Third slide"
                height="330"
              />
            </Carousel.Item>
          </Carousel>
          <Card className='p-5 card-welcome'>
            <h5 className="welcome">Welcome to the MRD MATH KMUTT</h5>
            <p>Management of research databases, Department of Mathematics KMUTT with Business Intelligence (MRD).
              It provides details on researchers, research projects and publications at the Mathematics KMUTT.
              There are two main ways of accessing the information. These include selection of thematic research
              areas and staff in the left menu, through a direct search in the search box below or by browsing the
              information by selecting different filters.</p>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Home;
