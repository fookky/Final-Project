
import React, { useState, useEffect, useContext } from 'react';
import firebaseApp from '../firebase.js';
import { Redirect } from 'react-router-dom'
import { AuthContext } from "components/Auth/Auth.js";
import Insertmenu from "views/insertmenu.jsx";
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import { Line, Pie } from "react-chartjs-2";
// reactstrap components
import { Col, Card, Row } from "react-bootstrap";
import {
	Button, CardHeader, CardBody, CardFooter, CardTitle,
	FormGroup, Form, Input, InputGroup, InputGroupText,
	InputGroupAddon
} from "reactstrap";

// core components
import {
	dashboard24HoursPerformanceChart, dashboardEmailStatisticsChart, dashboardNASDAQChart
} from "variables/charts.js";

export const AppContext = React.createContext();

function Dashboard() {

	// ประกาศตัวแปร state
	const [Food, setFood] = useState({})
	const [FoodName, setFoodName] = useState({})
	const [cate, setCate] = useState('')
	const [cate2, setCate2] = useState('')
	const [cate3, setCate3] = useState('')
	const [cate4, setCate4] = useState('')
	const [cate5, setCate5] = useState('')

	const [search, setSearch] = useState('')

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

	// let s = 'BLsearchkey.' + search
	// let c1 = 'BLsearchkey.' + cate
	// let c2 = 'BLsearchkey.' + cate2
	// let c3 = 'BLsearchkey.' + cate3
	// let c4 = 'BLsearchkey.' + cate4
	// let c5 = 'BLsearchkey.' + cate5
	// let catecheck = 'BLsearchkey.@'
	// //แก้บัค
	// if (search == '' || search == null) { s = 'BLsearchkey.@' }
	// if (cate == '') { c1 = 'BLsearchkey.@' }
	// if (cate2 == '') { c2 = 'BLsearchkey.@' }
	// if (cate3 == '') { c3 = 'BLsearchkey.@' }
	// if (cate4 == '') { c4 = 'BLsearchkey.@' }
	// if (cate5 == '') { c5 = 'BLsearchkey.@' }
	// if (s == 'BLsearchkey.@' && c1 == 'BLsearchkey.@' && c2 == 'BLsearchkey.@' && c3 == 'BLsearchkey.@' && c4 == 'BLsearchkey.@' && c5 == 'BLsearchkey.@') {
	//   catecheck = 'BLsearchkey.Close'
	// }
	// else {
	//   catecheck = 'BLsearchkey.@'
	// }
	// const CateCollection = Collection.where(s, '==', true)
	//   .where(c1, '==', true)
	//   .where(c2, '==', true)
	//   .where(c3, '==', true)
	//   .where(c4, '==', true)
	//   .where(c5, '==', true)
	//   .where(catecheck, '==', true)

	//const SearchCollection = CateCollection.orderBy("name").startAt(search).endAt(search + "\uf8ff")

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

	// useEffect(() => {
	//   //ใช้ firebaseApp.auth().onAuthStateChanged เพื่อใช้ firebaseApp.auth().currentUser โดยไม่ติด error เมื่อทำการ signout
	//   firebaseApp.auth().onAuthStateChanged(user => {

	//     const db = firebaseApp.firestore()
	//     const FoodCollection = db.collection('Food2')

	//     // subscription นี้จะเกิด callback กับทุกการเปลี่ยนแปลงของ collection Food
	//     const unsubscribe = FoodCollection.onSnapshot(ss => {
	//       // ตัวแปร local
	//       const Food = {}
	//       const FoodName = []

	//       ss.forEach(document => {
	//         // manipulate ตัวแปร local
	//         Food[document.id] = document.data()
	//         FoodName.push(Food[document.id].name)
	//       })

	//       // เปลี่ยนค่าตัวแปร state
	//       setFoodName(FoodName)
	//       console.log(FoodName)
	//       console.log(search)
	//     })

	//     return () => {
	//       // ยกเลิก subsciption เมื่อ component ถูกถอดจาก dom
	//       unsubscribe()
	//     }
	//   });
	// }, [s, c1, c2, c3, c4, c5])

	function clearall() {
		setSearch("")
		setYear("")
		setQuartile("")
	}

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
		// console.log(filter[1].writer)
		// console.log(researchAll.name)
		// console.log(dropdown)
		// console.log(search)
	}

	const { currentUser } = useContext(AuthContext);

	if (currentUser) { return <Redirect to="/member/menu" />; }

	function deleteDocument(id) {
		// ประกาศตัวแปรเพื่ออ้างอิงไปยัง document ที่จะทำการลบ
		const documentRef = researchRef.doc(id)
		// ลบ document
		documentRef.delete()

		alert(`document ${id} has been deleted`)
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
			<div className='container mt-5'>
				<Row>
					<Col md="3">
						<Card className="card-user">
							<CardHeader>
								<CardTitle tag="h5">Select Filter
									<button class="btn22 default pull-right btn-sm px-1 py-1"
										onClick={clearall}>Clear All</button>
								</CardTitle>
							</CardHeader>
							<Col md='12'>
								<form>
									<InputGroup>
										<input onChange={(e) => setSearch(e.target.value)}
											label="Author, Title, Journal"></input>
									</InputGroup>
									<InputGroup>
										<select type="text" onChange={(e) => setDropdown(e.target.value)}>
											<option value="researcher">Author</option>
											<option value="title">Title</option>
											<option value="journal">Journal</option>
										</select>
									</InputGroup>
								</form></Col>
							<CardBody>
								<table class="table table-borderless">
									<thead class="thead-dark">
										<tr>
											<th scope="col"> year {year}</th>
											<th scope="col"> quartile {quartile}</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td><button class="btn22 default" value={year} onClick={e => setYear("")}> clear</button></td>
											<td><button class="btn22 default" value={quartile} onClick={e => setQuartile("")}> clear</button></td>
										</tr>
										<tr>
											<td><button class="btn22 default" value={year} onClick={e => setYear("2020")}>2020</button></td>
											<td><button class="btn22 default" value={quartile} onClick={e => setQuartile("Q1")}>Q1</button></td>
										</tr>
										<tr>
											<td><button class="btn22 default" value={year} onClick={e => setYear("2021")}>2021</button></td>
											<td><button class="btn22 default" value={quartile} onClick={e => setQuartile("Q2")}>Q2</button></td>
										</tr>
										<tr>
											<td><button class="btn22 default" value={year} onClick={e => setYear("2022")}>2022</button></td>
											<td><button class="btn22 default" value={quartile} onClick={e => setQuartile("Q3")}>Q3</button></td>
										</tr>
										<tr>
											<td></td>
											<td><button class="btn22 default" value={quartile} onClick={e => setQuartile("Q4")}>Q4</button></td>
										</tr></tbody>
								</table>
							</CardBody>
							<button onClick={() => find()}>search</button>
						</Card>
					</Col>
					<Col md="9">
						<Card className="ex1">
							<CardHeader>
								<CardTitle tag="h5">งานวิจัย</CardTitle>
							</CardHeader>
							<CardBody>
								<Row>
									{Object.keys(filter).map((id) => {
										return <Col md="12">
											<div key={id}>
												<Card>
													<p className='ml-2'>title : {filter[id].name}</p>
													{Object.keys(filter[id].writer).map((id2) => {
														return <p className='ml-2'>writer : {filter[id].writer[id2]}</p>
													})}
													<p className='ml-2'>journal : {filter[id].journal}</p>
													<p className='ml-2'>quartile : {filter[id].quartile}</p>
													<p className='ml-2'>year : {filter[id].year}</p>
													<p className='ml-2'>factor : {filter[id].factor}</p>
												</Card>
											</div>
										</Col>
									})}
								</Row>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</div>
		</div>
	);
}
export default Dashboard;
