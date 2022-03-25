import React, { useEffect, useState, useContext } from 'react'
import firebaseApp from '../firebase.js';
import { Redirect } from 'react-router-dom'
import { AuthContext } from "components/Auth/Auth.js";


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
} from "reactstrap";

const LogIn = () => {
  const [ Email, setEmail] = useState('')
  const [ EmailError, setEmailError] = useState('')
  const [ PasswordError, setPasswordError] = useState('')

  const clearErrors = () => {
    setEmailError('');
    setPasswordError('');
  }

    const handleSubmit = (e) => {
      e.preventDefault();
      clearErrors();

      const { email, password } = e.target.elements;

      try {

          firebaseApp.auth().signInWithEmailAndPassword(email.value, password.value)
          .catch((error) => {
            switch (error.code) {
              case "auth/invalid-email":
              case "auth/user-disabled":
              case "auth/user-not-found":
                setEmailError(error.message);
                break;
              case "auth/wrong-password":
                setPasswordError(error.message);
                break;
            }
          });

      } catch(error) {
          alert(error);
      }
  }
    const forgotPassword = (Email) => {

      firebaseApp.auth().sendPasswordResetEmail(Email)
        .then(function (user) {
          alert('Please check your email...')
        }).catch(function (e) {
          console.log(e)
        })
    }

  const { currentUser } = useContext(AuthContext);
  if (currentUser) {
      return <Redirect to="/member/profile" />;
  }

    return (
      <>
       
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
       
        }}className="content">
        <Col md="6">
              <Card className="card-user">
                <CardHeader  style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
       
        }}className="content">
                 
                </CardHeader>
                <CardBody>
                  <Form onSubmit={handleSubmit}>
                  <CardTitle style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
       
        }}className="content"><h3>เข้าสู่ระบบ</h3></CardTitle>
                  <Row>
                      <Col md="12">
                        <FormGroup>
                          <label>Email Address</label>
                          <Input 

                            onChange={e => setEmail(e.target.value)}
                            type="text"
                            name="email"
                          />
                        </FormGroup>
                        {EmailError}
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label>Password</label>
                          <Input
                         
                            type="password"
                            name="password"
                          />
                        </FormGroup>
                        {PasswordError}
                      </Col>
                    </Row>
                 
                    <Row>
               
                    </Row>
                    
                    <Row>
                      <div className="update ml-auto mr-auto">
                        <Button
                          className="btn-round"
                          color="info"
                          type="submit"
                        >
                        เข้าสู่ระบบ
                        </Button>
                      </div>
                    </Row>
                  </Form>
                  <p><b><button class="btn22 default" onClick={() => forgotPassword(Email)}>ลืมรหัสผ่าน</button></b></p>
                </CardBody>
              </Card>
            </Col>

           

        </div>
        
      </>
    );

}

export default LogIn;
