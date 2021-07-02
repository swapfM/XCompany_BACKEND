import React,{useEffect,useState} from 'react'

import { Modal,Button,Row,Col,Form,Image } from 'react-bootstrap'


const AddEmployModal= (props)=>{

    
    const [deps,setdeps]=useState([]);

    var photofilename = process.env.REACT_APP_PHOTOPATH+"anonymous.png";
    const [imgsrc,setimgsrc] = useState(photofilename)
   

    useEffect(() => {
        fetch(process.env.REACT_APP_API+'department')
         .then(resp => resp.json())
         .then(data => setdeps(data))
         
    },[]);



    const handleSubmit=(e)=>{

        e.preventDefault();

        fetch(process.env.REACT_APP_API+'employee',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                EmployeeId:null,
                EmployeeName:e.target.EmployeeName.value,
                Department:e.target.Department.value,
                DateOfJoining:e.target.DateOfJoining.value,
                PhotoFileName:photofilename

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

    const handleFileSelected=(e)=>{
        e.preventDefault();
        photofilename = e.target.files[0].name;
        const formData = new FormData();
        formData.append(
            "myFile",
            e.target.files[0],
            e.target.files[0].name

        );
        fetch(process.env.REACT_APP_API+'Employee/SaveFile',{
            method:'POST',
            body:formData
        })
        .then(res=>res.json())
        .then((result)=>{
            photofilename =process.env.REACT_APP_PHOTOPATH+result;
            setimgsrc(photofilename);
            
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
                                <Form.Group controlId="EmployeeName">
                                <Form.Label>Employee Name</Form.Label>
                                <Form.Control type="text" name="EmployeeName" required 
                                placeholder="Employee Name"/>
                                </Form.Group>

                                <Form.Group controlId="Department">
                                <Form.Label>Department</Form.Label>
                                <Form.Control as="select">
                                    {deps.map(dep=>
                                        <option key={dep.DepartmentId}>
                                            {dep.DepartmentName}
                                        </option>)}
                                </Form.Control>
                                </Form.Group>

                                <Form.Group controlId="DateOfJoining">
                                <Form.Label>DateOfJoining</Form.Label>
                                <Form.Control 
                                    type="date"
                                    name="DateOfJoining"
                                    required
                                    placeholder="DateOfJoining"
                                    />
                               
                                </Form.Group>

                                <Form.Group>
                                    <Button variant="primary" type="submit">
                                        Add Employee
                                    </Button>
                                </Form.Group>
                            </Form>
                        </Col>
                        <Col sm={6}>
                            <Image width='200px' height="200px" src={imgsrc}/>
                            <input onChange={(e)=>handleFileSelected(e)} type="File"/>
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


export default AddEmployModal;
