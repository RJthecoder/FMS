import { getAllNozzelLog } from '../../services/api'
import React, { useEffect, useState } from 'react'

const NozzelLog2 = () => {
    const [filters,setFilters] = useState([])
    const [user,setUser] = useState('')
    const [pump,setPump] = useState('')
    const [role,setRole] = useState('')
    const [fuser,setFUser] = useState([])
    const [nozzel,setNozzel] = useState('');
    const [pid,setpid] = useState()
    const [id,setId] = useState('')
    const getData = () =>{
      const user = JSON.parse(localStorage.getItem('authData'));
      console.log(user.user.userData);
      setPump(user.user.userData.petrol_pump_details.name);
      setRole(user.user.userData.role_details.name);
      console.log(user.user.userData.role_details.name);
      setUser(user.user.userData.name);
      console.log(user.user.userData.name);
      console.log(user.user.userData.petrol_pump_id)
      setpid(user.user.userData.petrol_pump_id)
      
    }
    useEffect(()=>{
      getData();
    },[])
    const [users,setUsers] = useState([])

    const fetchAllNozzelLog = async () => {
        let params = {
          limit: 10,
          pageNo: 0,
        };
        // setLoader(true);
        const response = await getAllNozzelLog(params);
        console.log(response.data.data.assigned_nozzles)
        setUsers(response.data.data.assigned_nozzles);
    }
    useEffect(()=>{
        fetchAllNozzelLog();
    },[])
   
    const nozzleData = () =>{
      const newD = users.map((item)=> item.nozzle_details)
      console.log(newD);
      const newDa = newD.filter((items)=> items.petrol_pump_id==pid)
      console.log(newDa)
      const new1 = newDa.map((itemss)=> itemss.name)
      console.log(new1)
    }
    nozzleData();
      return (
    // <div>{users.map((item)=>{
    //     return <div key={item.id}>{item.petrol_pump_details.name}</div>
    // })}</div>
    <div>Hello</div>
  )
}


export default NozzelLog2