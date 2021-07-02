import { Component } from "react";
import {Table} from 'react-bootstrap'
import {Button,ButtonToolbar} from 'react-bootstrap'
import AddEmployModal from "../AddEmployModal/AddEmployModal";
import EditEmployModal from "../EditEmployModal/EditEmployModal";

class Employee extends Component{

    constructor(props){
        super(props);
        this.state={emps:[], addModalShow:false, editModalShow:false}
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'employee')
        .then(response=>response.json())
        .then(data=>{
            this.setState({emps:data});
        });
    }

    componentDidMount(){

        this.refreshList();

    }

    componentDidUpdate(){
        this.refreshList();
    }

    deleteEmp(empid){
        if(window.confirm("Are you sure ?")){
            fetch(process.env.REACT_APP_API+'employee/'+empid,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            })
        }
    }
    render(){
        const {emps,empid,empname,doj,dpt,photo}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
    return(
        <div>
            <Table className="mt-4" striped bordered hover size="sm">
           <thead>
               <tr>
               <th>EmployeeId</th>
               <th>Employee Name</th>
               <th>Department</th>
               <th>DateOfJoining</th>
               <th>Photo</th>
               <th>Options</th>
               </tr>
           </thead>
           <tbody>
               {emps.map(emp=>(
                   <tr key={emp.EmployeeId}>
                       <td>{emp.EmployeeId}</td>
                       <td>{emp.EmployeeName}</td>
                       <td>{emp.Department}</td>
                       <td>{emp.DateOfJoining}</td>
                       <td>
                           <ButtonToolbar>
                               <Button className="mr-2" variant="info"
                               onClick={()=>this.setState({editModalShow:true,
                            empid:emp.EmployeeId,empname:emp.EmployeeName,dpt:emp.Department,doj:emp.DateOfJoining,photo:emp.PhotoFileName})}>
                                Edit
                            </Button>

                            <Button className="mr-2" variant="danger"
                               onClick={()=>this.deleteEmp(emp.EmployeeId)}>
                                Delete
                            </Button>




                            <EditEmployModal show={this.state.editModalShow}
                            onHide={editModalClose}
                            empid={empid}
                            empname={empname}
                            dpt={dpt}
                            doj={doj}
                            photo={photo}/>
                           </ButtonToolbar>
                       </td>
                   </tr>
               ))}
           </tbody>
           </Table>

           <ButtonToolbar>
               <Button variant="primary"
               onClick={()=>this.setState({addModalShow:true})}>
                   Add Employee
               </Button>
               <AddEmployModal show={this.state.addModalShow}
               onHide={addModalClose}/>
           </ButtonToolbar>
        </div>
    )
    }
};

export default Employee;