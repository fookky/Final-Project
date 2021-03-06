import React, { useState } from 'react';
import firebaseApp from '../firebase.js';
import { Redirect } from 'react-router-dom'

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
import { css } from 'jquery';

const Register = () => {
  const [EmailError, setEmailError] = useState('')
  const [PasswordError, setPasswordError] = useState('')

  const [currentUser, setCurrentUser] = useState(null);

  const [FirstName, setFirstName] = useState('')
  const [LastName, setLastName] = useState('')
  const [Email, setEmail] = useState('')
  const [Password, setPassword] = useState('')
  const [ConfirmPassword, setConfirmPassword] = useState('')

  const [FirstNameError, setFirstNameError] = useState('')
  const [LastNameError, setLastNameError] = useState('')
  const [ConfirmPasswordError, setConfirmPasswordError] = useState('')

  var today = new window.Date()
  const Register_Date = today.getFullYear() + '-' + ("0" + (today.getMonth() + 1)).slice(-2) + '-' + ("0" + today.getDate()).slice(-2);
  const Register_Year_Mounth = today.getFullYear() + '-' + ("0" + (today.getMonth() + 1)).slice(-2);


  const db = firebaseApp.firestore()
  const userCollection = db.collection('User')

  async function insertDocument(Uid) {
    const documentRef = await userCollection.add({
      FirstName,
      LastName,
      Email,
      Register_Date,
      Register_Year_Mounth,
      Uid,
      FoodList: [],
      RandomList: []
    })
  }

  function ErrorsCheck() {
    if (FirstName == "") setFirstNameError('Must not be empty.')
    if (LastName == "") setLastNameError('Must not be empty.')
    if (ConfirmPassword == "") setConfirmPasswordError('Must not be empty.')
    if (ConfirmPassword !== Password) setConfirmPasswordError('Passwords do not match.')
  }


  const clearErrors = () => {
    setEmailError('');
    setPasswordError('');
    setFirstNameError('');
    setLastNameError('');
    setConfirmPasswordError('');

  }

  const handleSubmit = (e) => {
    e.preventDefault();
    clearErrors();
    ErrorsCheck();

    const { email, password } = e.target.elements;

    try {

      if (FirstName !== '' && LastName !== '' && Date !== '' && ConfirmPassword !== '' && ConfirmPassword == Password) {
        firebaseApp.auth().createUserWithEmailAndPassword(email.value, password.value)
          .then(res => {
            if (res.user) {

              insertDocument(firebaseApp.auth().currentUser.uid)
              console.log(res.user);
              setCurrentUser(true)

            }
          })
          .catch((error) => {
            switch (error.code) {
              case "auth/email-already-in-use":
              case "auth/invalid-email":
                setEmailError(error.message);
                break;
              case "auth/weak-password":
                setPasswordError(error.message);
                break;
            }

          });
      }

    } catch (error) {
      alert(error);
    }
  }

  if (currentUser) {
    return <Redirect to="login" />
  }

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }} className="content">
      <Col md="4">
        <Card className="card-user">
          <CardBody>
            <Form onSubmit={handleSubmit}>
              <CardTitle style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",

              }} className="content"><h3>Register</h3></CardTitle>
              <Row>
                <Col md="12">
                  <FormGroup>
                    <label>Name</label>
                    <Input
                      onChange={e => setFirstName(e.target.value)}
                      type="text"
                      pattern="^[???-???\sa-zA-Z\s]+$"
                      title="??????????????????????????????????????????????????????????????????"
                      required
                    />
                    <a className="color-error">{FirstNameError}</a>
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col md="12">
                  <FormGroup>
                    <label>Lastname</label>
                    <Input
                      onChange={e => setLastName(e.target.value)}
                      type="text"
                      pattern="^[???-???\sa-zA-Z\s]+$"
                      title="??????????????????????????????????????????????????????????????????"
                      required
                    />
                    <a className="color-error">{LastNameError}</a>
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col md="12">
                  <FormGroup>
                    <label>Email</label>
                    <Input
                      onChange={e => setEmail(e.target.value)}
                      name="email"
                      type="email"
                      required
                    />
                    <a className="color-error">{EmailError}</a>
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col md="12">
                  <FormGroup>
                    <label>Password</label>
                    <Input
                      onChange={e => setPassword(e.target.value)}
                      name="password"
                      type="password"
                      required
                    />
                    <a className="color-error">{PasswordError}</a>
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col md="12">
                  <FormGroup>
                    <label>Re-Password</label>
                    <Input
                      onChange={e => setConfirmPassword(e.target.value)}
                      type="password"
                      required
                    />
                    <a className="color-error">{ConfirmPasswordError}</a>
                  </FormGroup>
                </Col>
              </Row>

              <Row style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",

              }}>
              </Row>
              <Row>
                <div className="update ml-auto mr-auto">
                  <Button
                    class="btn btn-info"
                    color="danger"
                    type="submit"
                  >
                    Create
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
export default Register;
