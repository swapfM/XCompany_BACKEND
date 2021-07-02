import React from 'react'

import { Modal,Button,Row,Col,Form } from 'react-bootstrap'


const EditEmployModal= (props)=>{


    const handleSubmit=(e)=>{

        e.preventDefault();

        fetch(process.env.REACT_APP_API+'employee',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                EmployeeId:e.target.EmployeeId.value,
                EmployeeName:e.target.EmployeeName.value,
                Department:e.target.Department.value,
                DateOfJoining:e.target.DateOfJoining.value

            })
        })

        .then(res=>res.json())
        .then((result)=>{
            alert(result);
        },
        (error)=>{
            alert('Failed');
        })
    }

    return(
        <div className="container">


            <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Add Employee
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm={6}>
                            <Form onSubmit={(e)=>handleSubmit(e)}>
                                <Form.Group controlId="EmployeeId">
                                <Form.Label>EmployeeId</Form.Label>
                                <Form.Control type="text" name="EmployeeId" required 
                                disabled defaultValue={props.empid} placeholder="Employee Name"/>
                                </Form.Group>

                                <Form.Group controlId="EmployeeName">
                                <Form.Label>Employee Name</Form.Label>
                                <Form.Control type="text" name="EmployeeName" required 
                                defaultValue={props.empname} placeholder="Employee Name"/>
                                </Form.Group>

                                <Form.Group>
                                    <Button variant="primary" type="submit">
                                        Update Employee
                                    </Button>
                                </Form.Group>
                                </Form>
                        </Col>
                    </Row>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="danger" onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
};


export default EditEmployModal;