import React from 'react'

import { Modal,Button,Row,Col,Form } from 'react-bootstrap'


const EditDepModal= (props)=>{


    const handleSubmit=(e)=>{

        e.preventDefault();

        fetch(process.env.REACT_APP_API+'department',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                DepartmentId:e.target.DepartmentId.value,
                DepartmentName:e.target.DepartmentName.value
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
                        Add Department
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm={6}>
                            <Form onSubmit={(e)=>handleSubmit(e)}>
                                <Form.Group controlId="DepartmentId">
                                <Form.Label>DepartmentId</Form.Label>
                                <Form.Control type="text" name="DepartmentId" required 
                                disabled defaultValue={props.depid} placeholder="Department Name"/>
                                </Form.Group>

                                <Form.Group controlId="DepartmentName">
                                <Form.Label>DepartmenName</Form.Label>
                                <Form.Control type="text" name="DepartmentName" required 
                                defaultValue={props.depname} placeholder="Department Name"/>
                                </Form.Group>

                                <Form.Group>
                                    <Button variant="primary" type="submit">
                                        Update Department
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


export default EditDepModal;