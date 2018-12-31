import React from "react";
import image from "../../assets/img/bg7.jpg";
import {Button} from "reactstrap";


const Admin = props => {
  let users=props.users;
  console.log('Admin',users);
  return (
    <div
      style={{
        backgroundImage: "url(" + image + ")",
        backgroundSize: "cover",
        backgroundPosition: "top center",
        height: 'calc(100vh - 56px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff'
      }}
    >
      <div style={{width:'30%'}}>
        <h2><b>Admin Panel</b></h2>
        {users?users.map((user ,i)=><div key={i}  style={{display:'flex',justifyContent:'space-between'}}>
          <p >{ 'user '+ ++i +': ' +user.email}</p>
          <Button onClick={()=>props.onDelete(user)} outline color="danger">Delete</Button>
        </div>):null}

      </div>
    </div>


  )
};


export default Admin;
