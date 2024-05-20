import "./App.css";
import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import ProtectedRoutes from "./protectedRoutes";
import { AuthContext } from "./contexts/AuthContext";
import Billing from "./components/sidebar/Billing";
import AddPetrolPump from "./components/pages/PetrolPump";
import FuelType from "./components/pages/FuelType";
import Roles from "./components/pages/Roles";
import Unit from "./components/pages/Unit";
import Users from "./components/pages/Users";
import PetrolPumpDetails from "./components/pages/PetrolPumpDetails";
import Customers from "./components/pages/Customers";
import TankStorage from "./components/pages/TankStorage";
import CustomersDetails from "./components/pages/CustomersDetails";
import DailyFuelRate from "./components/pages/DailyFuelRate";
import FuelTracker from "./components/pages/FuelTracker";
import UsersInfo from "./components/pages/UsersInfo";
import NozzelLog from "./components/pages/NozzelLog";
import NozzelLog1 from "./components/pages/NozzelLog1";
import NozzelLog2 from "./components/pages/NozzelLog2";




function AppRoutes() {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <Routes>
      <Route
        path="*"
        element={
          !isLoggedIn ? <Navigate to={"/login"} /> : <Navigate to={"/"} />
        }
      />
      <Route
        path="/"
        element={
          <ProtectedRoutes
            isAuthenticated={isLoggedIn}
            children={<Home />}
            redirect="/login"
          />
        }
      />
      <Route
        path="/unit"
        element={
          <ProtectedRoutes
            isAuthenticated={isLoggedIn}
            children={<Unit />}
            redirect="/login"
          />
        }
      />
      <Route
        path="/petrol-pump"
        element={
          <ProtectedRoutes
            isAuthenticated={isLoggedIn}
            children={<AddPetrolPump />}
            redirect="/login"
          />
        }
      />
      <Route
        path="/fuel-type"
        element={
          <ProtectedRoutes
            isAuthenticated={isLoggedIn}
            children={<FuelType/>}
            redirect="/login"
          />
        }
      />
      <Route
        path="/roles"
        element={
          <ProtectedRoutes
            isAuthenticated={isLoggedIn}
            children={<Roles/>}
            redirect="/login"
          />
        }
      />
      <Route
        path="/users"
        element={
          <ProtectedRoutes
            isAuthenticated={isLoggedIn}
            children={<Users/>}
            redirect="/login"
          />
        }
      />
      <Route
        path="/customers"
        element={
          <ProtectedRoutes
            isAuthenticated={isLoggedIn}
            children={<Customers/>}
            redirect="/login"
          />
        }
      />
      <Route
        path="/tank-storage"
        element={
          <ProtectedRoutes
            isAuthenticated={isLoggedIn}
            children={<TankStorage/>}
            redirect="/login"
          />
        }
      />
      <Route
        path="/daily-fuel-rate"
        element={
          <ProtectedRoutes
            isAuthenticated={isLoggedIn}
            children={<DailyFuelRate/>}
            redirect="/login"
          />
        }
      />
      <Route
        path="/fuel-tracker"
        element={
          <ProtectedRoutes
            isAuthenticated={isLoggedIn}
            children={<FuelTracker/>}
            redirect="/login"
          />
        }
      />
      <Route
        path="/nozzel-log"
        element={
          <ProtectedRoutes
            isAuthenticated={isLoggedIn}
            children={<NozzelLog/>}
            redirect="/login"
          />
        }
      />

      <Route
       path="/nozzel"
        element={
        <ProtectedRoutes
         isAuthenticated={isLoggedIn}
          children={<NozzelLog2 />}
           redirect="/login"
           />
        }
        />
      
      <Route
        exact
        path="/register"
        element={!isLoggedIn ? <Register /> : <Navigate to={"/"} />}
      />
      <Route
        exact
        path="/login"
        element={!isLoggedIn ? <Login /> : <Navigate to={"/"} />}
      />
      <Route path="/petrol-pump/:id" element={<PetrolPumpDetails></PetrolPumpDetails>} />
      <Route path="/customer-details/:id" element={<CustomersDetails></CustomersDetails>} />
      <Route path="/users-info/:id" element={<UsersInfo></UsersInfo>} />
      

    </Routes>
  );
}

export default AppRoutes;
