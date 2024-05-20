import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import "./home.css";
import Sidebar from "./Sidebar";
import Sidebar2 from "./SideBar2";
import revenueData from "./data/revenueData.json";
import sourceData from "./data/sourceData.json";
import salesData from "./data/salesData.json"
import petrol from '../Photos/petrol5.jpg'

defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font.size = 20;
defaults.plugins.title.color = "black";

function Home() {
  const [user,setUser] = useState('')
  const [pump,setPump] = useState('')
  const [role,setRole] = useState('')
  const [nozzel,setNozzel] = useState('');
  const getData = () =>{
    const user = JSON.parse(localStorage.getItem('authData'));
    console.log(user.user.userData);
    setPump(user.user.userData.petrol_pump_details.name);
    setRole(user.user.userData.role_details.name);
    console.log(user.user.userData.role_details.name);
    setUser(user.user.userData.name);
    console.log(user.user.userData.name);
    
  }
  useEffect(()=>{
    getData();
  },[])

  if(role=="Employee"){
    return<>
    <div className="flex bg-gray-600">
      <Sidebar2 />
      <div className="flex flex-col">
      <h1 className="ml-28 mt-36 text-5xl text-white">Welcome {user}</h1>
      <h1 className="text-2xl mt-24 mr-12 ml-32 text-white">Petrol Pump {pump}</h1>
      <h1 className="text-3xl mt-16 mr-12 ml-32 text-white">Role {role}</h1>
      </div>
      <div>
        <img src={petrol} className="ml-24 w-198 mt-12"></img>
      </div>
      </div>
    </>
  }

  if(role=="Employee"){
    return<>
    <div className="flex bg-gray-600">
      <Sidebar2 />
      <div className="flex flex-col">
      <h1 className="ml-28 mt-36 text-5xl text-white">Welcome {user}</h1>
      <h1 className="text-2xl mt-24 mr-12 ml-32 text-white">Petrol Pump {pump}</h1>
      <h1 className="text-3xl mt-16 mr-12 ml-32 text-white">Role {role}</h1>
      </div>
      <div>
        <img src={petrol} className="ml-24 w-198 mt-12"></img>
      </div>
      </div>
    </>
  }

  // if(user=="Bharat Petroleum"){
  //   return<>
  //     <Sidebar />
  //     <h1 className="ml-64">{user}</h1>
  //   </>
  // }

  return (
    <Layout>
    <div className="App">
      <div className="dataCard revenueCard">
        <Line
          data={{
            labels: revenueData.map((data) => data.label),
            datasets: [
              {
                label: "Petrol Pump 1",
                data: revenueData.map((data) => data.revenue),
                backgroundColor: "#064FF0",
                borderColor: "#064FF0",
              },
              {
                label: "Petrol Pump 2",
                data: revenueData.map((data) => data.cost),
                backgroundColor: "#FF3030",
                borderColor: "#FF3030",
              },
            ],
          }}
          options={{
            elements: {
              line: {
                tension: 0.5,
              },
            },
            plugins: {
              title: {
                text: "Monthly Revenue By Petrol Pumps",
              },
            },
          }}
        />
      </div>

      <div className="dataCard customerCard">
        <Bar
          data={{
            labels: sourceData.map((data) => data.label),
            datasets: [
              {
                
                data: sourceData.map((data) => data.value),
                backgroundColor: [
                  "rgba(43, 63, 229, 0.8)",
                  "rgba(250, 192, 19, 0.8)",
                  "rgba(253, 135, 135, 0.8)",
                ],
                borderRadius: 5,
              },
            ],
          }}
          options={{
            plugins: {
              title: {
                text: "Revenue Type",
              },
            },
          }}
        />
      </div>

      <div className="dataCard categoryCard">
        <Doughnut
          data={{
            labels: salesData.map((data) => data.label),
            datasets: [
              {
                label: "Count",
                data: salesData.map((data) => data.value),
                backgroundColor: [
                  "rgba(43, 63, 229, 0.8)",
                  "rgba(250, 192, 19, 0.8)",
                  "rgba(253, 135, 135, 0.8)",
                  "rgba(87, 234, 116, 0.8)",
                ],
                borderColor: [
                  "rgba(43, 63, 229, 0.8)",
                  "rgba(250, 192, 19, 0.8)",
                  "rgba(253, 135, 135, 0.8)",
                  "rgba(87, 234, 116, 0.8)",
                ],
              },
            ],
          }}
          options={{
            plugins: {
              title: {
                text: "Type Of Sales",
              },
            },
          }}
        />
      </div>
    </div>
    </Layout>
  );
}

export default Home;
