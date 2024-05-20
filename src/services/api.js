import axios from 'axios';
import { BASEURL, FIREBASEURL } from '../utility/constants';
import { Link, useNavigate } from "react-router-dom";

const url='http://api-petrolpump.techdarshak.com/public';
// const url = 'http://127.0.0.1:8000';

const accessToken = JSON.parse(localStorage.getItem("token"));
const headers = {
  "Content-Type": "application/json", // Adjust the content type as needed
};
console.log('Token ', accessToken)
if (accessToken != null) {
  headers["Authorization"] = `Bearer ${accessToken?.token}`; // Add the token to the 'Authorization' header
}

// const navigate = useNavigate();


export const signup = async (user) => {
  try {
    return await axios.post(`${url}/auth/signup`, user);
  } catch (error) {
    console.log('Error while calling SignUp API', error);
  }
};

export const login = async (user) => {
  try {
    return await axios.post(`${url}/api/v1/users/login`, user);
  } catch (error) {
    return error;
  }
};

export const emailVerification = async (user) => {
  try {
    return await axios.post(`${url}/auth/email`, user);
  } catch (error) {
    console.log('Error while calling resend email verification api', error);
  }
};

export const passwordReset = async (user) => {
  try {
    return await axios.post(`${url}/auth/password/reset`, user);
  } catch (error) {
    console.log('Error while calling password reset api', error);
  }
};

export const getAllPetrolPumps = async (params) => {
  let finalurl = `${url}/api/v1/petrolpumps/getAllPetrolPumps`;
  if(params?.limit && params?.pageNo || params?.pageNo == 0){
    finalurl = `${finalurl}?limit=${params?.limit}&pageNo=${params?.pageNo}`;
  }
  console.log(finalurl?.split('?')?.length)
  if(params?.id){
    let subUrl = finalurl?.split('?')?.length > 1 ? `&id=${params?.id}` : `?id=${params?.id}`
    finalurl = `${finalurl}${subUrl}`;
  }
  
  try {
    return await axios.get(`${finalurl}`, {
      headers
    });
  } catch (error) {
    console.log('Error while calling SignUp API', error);
    logout(error);
    return error;
  }
};

export const addNewPetrolPump = async (petrolPumpData) => {
  try {
    return await axios.post(`${url}/api/v1/petrolpumps/addPetrolpump`, petrolPumpData, {
      headers
    });
  } catch (error) {
    return error;
  }
};

export const editPetrolPump = async (petrolPumpData, id) => {
  try {
    return await axios.post(`${url}/api/v1/petrolpumps/updatePetrolPump/${id}`, petrolPumpData, {
      headers
    });
  } catch (error) {
    return error;
  }
};

export const deletePetrolPump = async (id) => {
  try {
    return await axios.delete(`${url}/api/v1/petrolpumps/deletePetrolPump/${id}`,{
      headers
    });
  } catch (error) {
    return error;
  }
};
export const getAllRoles = async () => {
  try {
    return await axios.get(`${url}/api/v1/roles/getAllRoles?limit=10&pageNo=0`,{
      headers
    });
  } catch (error) {
    console.log('Error while calling SignUp API', error);
  }
};
export const addRoles = async (rolesData,) => {
  try {
    return await axios.post(`${url}/api/v1/roles/addRoles`, rolesData,{
      headers
    });
  } catch (error) {
    return error;
  }
};
export const editRoles = async (rolesData, id) => {
  try {
    return await axios.post(`${url}/api/v1/roles/updateRole/${id}`, rolesData,{
      headers
    } );
  } catch (error) {
    return error;
  }
};
export const deleteRoles = async (id) => {
  try {
    return await axios.delete(`${url}/api/v1/roles/deleteRole/${id}`,{
      headers
    });
  } catch (error) {
    return error;
  }
};

// fuel-type
export const getAllFuelType = async () => {
  try {
    return await axios.get(`${url}/api/v1/fueltype/getAllFuelType?limit=10&pageNo=0`,{
      headers
    });
  } catch (error) {
    console.log('Error while calling SignUp API', error);
  }
};

export const addNewFuelType = async (fuelTypeData) => {
  try {
    return await axios.post(`${url}/api/v1/fueltype/addFuelTypes`, fuelTypeData,{
      headers
    });
  } catch (error) {
    return error;
  }
};

export const editFuelType = async (fuelTypeData, id) => {
  try {
    return await axios.post(`${url}/api/v1/fueltype/updateFuelTypes/${id}`, fuelTypeData,{
      headers
    });
  } catch (error) {
    return error;
  }
};

export const deleteFuelType = async (id) => {
  try {
    return await axios.delete(`${url}/api/v1/fueltype/deleteFuelType/${id}`,{
      headers
    });
  } catch (error) {
    return error;
  }
};

// Unit

export const getAllUnit = async () => {
  try {
    return await axios.get(`${url}/api/v1/units/getAllUnits?limit=10&pageNo=0`,{
      headers
    });
  } catch (error) {
    console.log('Error while calling SignUp API', error);
  }
};

export const addNewUnit = async (unitData) => {
  try {
    return await axios.post(`${url}/api/v1/units/addUnits`,unitData, {
      headers: headers
    });
  } catch (error) {
    return error;
  }
};

export const editUnit = async (unitData, id) => {
  try {
    return await axios.post(`${url}/api/v1/units/updateUnit/${id}`, unitData,{
      headers
    });
  } catch (error) {
    return error;
  }
};

export const deleteUnit = async (id) => {
  try {
    return await axios.delete(`${url}/api/v1/units/deleteUnit/${id}`,{
      headers
    });
  } catch (error) {
    return error;
  }
};


// users

export const getAllUsers = async (params = {}) => {
  let finalurl = `${url}/api/v1/users/getAllUsers`;
  if(params?.limit && params?.pageNo || params?.pageNo == 0){
    finalurl = `${finalurl}?limit=${params?.limit}&pageNo=${params?.pageNo}`;
  }
  if(params?.petrol_pump_id){
    let subUrl = finalurl?.split('?')?.length > 1 ? `&petrol_pump_id=${params?.petrol_pump_id}` : `?petrol_pump_id=${params?.petrol_pump_id}`
    finalurl = `${finalurl}${subUrl}`;
  }
  try {
    return await axios.get(`${finalurl}`,{
      headers
    });
  } catch (error) {
    console.log('Error while calling SignUp API', error);
  }
};

export const addNewUsers = async (usersData) => {
  try {
    return await axios.post(`${url}/api/v1/users/addNewUser`,usersData,{
      headers
    });
  } catch (error) {
    return error;
  }
};

export const editUsers = async (usersData, id) => {
  try {
    return await axios.post(`${url}/api/v1/users/updateUser/${id}`, usersData,{
      headers
    });
  } catch (error) {
    return error;
  }
};

export const deleteUsers = async (id) => {
  try {
    return await axios.delete(`${url}/api/v1/users/deleteUser/${id}`,{
      headers
    });
  } catch (error) {
    return error;
  }
};

// nozzels

export const getAllNozzels = async (params) => {
  let finalurl = `${url}/api/v1/nozzels/getAllNozzels`;
  if(params?.limit && params?.pageNo || params?.pageNo == 0){
    finalurl = `${finalurl}?limit=${params?.limit}&pageNo=${params?.pageNo}`;
  }
  if(params?.petrol_pump_id){
    let subUrl = finalurl?.split('?')?.length > 1 ? `&petrol_pump_id=${params?.petrol_pump_id}` : `?petrol_pump_id=${params?.petrol_pump_id}`
    finalurl = `${finalurl}${subUrl}`;
  }
  try {
    return await axios.get(`${finalurl}`, {
      headers
    });
  } catch (error) {
    console.log('Error while calling SignUp API', error);
    return error;
  }
};

export const addNewNozzel = async (nozzelData) => {
  try {
    return await axios.post(`${url}/api/v1/nozzels/addNewNozzel`, nozzelData, {
      headers
    });
  } catch (error) {
    return error;
  }
};

export const editNozzel = async (rolesData, id) => {
  try {
    return await axios.post(`${url}/api/v1/nozzels/updateNozzel/${id}`, rolesData,{
      headers
    } );
  } catch (error) {
    return error;
  }
};


export const deleteNozzel = async (id) => {
  try {
    return await axios.delete(`${url}/api/v1/nozzels/deleteNozzel/${id}`,{
      headers
    });
  } catch (error) {
    return error;
  }
};

// Customers

export const getAllCustomers = async () => {
  try {
    return await axios.get(`${url}/api/v1/customers/getAllCustomers?limit=10&pageNo=0`,{
      headers
    });
  } catch (error) {
    console.log('Error while calling SignUp API', error);
  }
};

export const addNewCustomers = async (customersData) => {
  try {
    return await axios.post(`${url}/api/v1/customers/addCustomer`,customersData,{
      headers
    });
  } catch (error) {
    return error;
  }
};

export const editCustomers = async (customersData, id) => {
  try {
    return await axios.post(`${url}/api/v1/customers/updateCustomer/${id}`, customersData,{
      headers
    });
  } catch (error) {
    return error;
  }
};

export const deleteCustomers = async (id) => {
  try {
    return await axios.delete(`${url}/api/v1/customers/deleteCustomer/${id}`,{
      headers
    });
  } catch (error) {
    return error;
  }
};

// Customer Credit

export const getCustomersCredit = async () => {
  try {
    return await axios.get(`${url}/api/v1/customersCredit/getAllCustomerCredit?limit=10&pageNo=0`,{
      headers
    });
  } catch (error) {
    console.log('Error while calling SignUp API', error);
  }
};

export const addNewCustomersCredit = async (CustomersCreditData) => {
  try {
    return await axios.post(`${url}/api/v1/customersCredit/addCustomerCredit`,CustomersCreditData,{
      headers
    });
  } catch (error) {
    return error;
  }
};

// Tank Storage

export const getAllTankStorage = async (params = {}) => {
  let finalurl = `${url}/api/v1/tankStorage/getAllTankStorage`;
  if(params?.limit && params?.pageNo || params?.pageNo == 0){
    finalurl = `${finalurl}?limit=${params?.limit}&pageNo=${params?.pageNo}`;
  }
  if(params?.petrol_pump_id){
    let subUrl = finalurl?.split('?')?.length > 1 ? `&petrol_pump_id=${params?.petrol_pump_id}` : `?petrol_pump_id=${params?.petrol_pump_id}`
    finalurl = `${finalurl}${subUrl}`;
  }
  try {
    return await axios.get(`${finalurl}`,{
      headers
    });
  } catch (error) {
    console.log('Error while calling SignUp API', error);
    logout(error)
  }
};

export const addNewTankStorage = async (tankStorageData) => {
  try {
    return await axios.post(`${url}/api/v1/tankStorage/addNewTankStorage`,tankStorageData,{
      headers
    });
  } catch (error) {
    return error;
  }
};

export const editTankStorage = async (tankStorageData, id) => {
  try {
    return await axios.post(`${url}/api/v1/tankStorage/updateTankStorage/${id}`, tankStorageData,{
      headers
    });
  } catch (error) {
    return error;
  }
};

export const deleteTankStorage = async (id) => {
  try {
    return await axios.delete(`${url}/api/v1/tankStorage/deleteTankStorage/${id}`,{
      headers
    });
  } catch (error) {
    return error;
  }
};

// Customer Credit 

export const getAllCustomerDetails = async () => {
  try {
    return await axios.get(`${url}/api/v1/tankStorage/getAllTankStorage?limit=10&pageNo=0`,{
      headers
    });
  } catch (error) {
    console.log('Error while calling SignUp API', error);
  }
};

// Daily Fuel Rate

export const getAllDailyFuelRate = async () => {
  try {
    return await axios.get(`${url}/api/v1/fuelRate/getDailyFuelRate?limit=10&pageNo=0`,{
      headers
    });
  } catch (error) {
    console.log('Error while calling SignUp API', error);
  }
};

export const addNewDailyFuelRate = async (dailyFuelRateData) => {
  try {
    return await axios.post(`${url}/api/v1/fuelRate/addFuelRate`,dailyFuelRateData,{
      headers
    });
  } catch (error) {
    return error;
  }
};

// Fuel Tracker

export const getAllFuelTracker = async (params = {}) => {
  let finalurl = `${url}/api/v1/fuelTracker/getAllFuelTracker`;
  if(params?.limit && params?.pageNo || params?.pageNo == 0){
    finalurl = `${finalurl}?limit=${params?.limit}&pageNo=${params?.pageNo}`;
  }
  try {
    return await axios.get(`${finalurl}`,{
      headers
    });
  } catch (error) {
    console.log('Error while calling SignUp API', error);
  }
};

export const addNewFuelTracker = async (fuelTrackerData) => {
  try {
    return await axios.post(`${url}/api/v1/fuelTracker/addFuelTracker`,fuelTrackerData,{
      headers
    });
  } catch (error) {
    return error;
  }
};


export const assignUserToNozzel = async (assignNozzelData) => {
  try {
    return await axios.post(`${url}/api/v1/nozzle_user/assignNozzelToUser`,assignNozzelData,{
      headers
    });
  } catch (error) {
    return error;
  }
};

export const assignNozzelToTank = async (assignTankData) => {
  try {
    return await axios.post(`${url}/api/v1/nozzle_tank/assignNozzelToTankStorage`,assignTankData,{
      headers
    });
  } catch (error) {
    return error;
  }
};

export const getAllUsersSales = async (params={}) => {
  let finalurl = `${url}/api/v1/fuelTracker/getUsersSale`;
  if(params?.limit && params?.pageNo || params?.pageNo == 0){
    finalurl = `${finalurl}?limit=${params?.limit}&pageNo=${params?.pageNo}`;
  }
  if(params?.user_id){
    let subUrl = finalurl?.split('?')?.length > 0 ? `&user_id=${params?.user_id}` : `?user_id=${params?.user_id}`
    finalurl = `${finalurl}${subUrl}`;
  }
  try {
    return await axios.get(`${finalurl}`,{
      headers
    });
  } catch (error) {
    console.log('Error while calling SignUp API', error);
  }
};

export const getAllNozzelLog = async (params={}) => {
  let finalurl = `${url}/api/v1/nozzle_user/getAssignedNozzleUserLog`;
  if(params?.limit && params?.pageNo || params?.pageNo == 0){
    finalurl = `${finalurl}?limit=${params?.limit}&pageNo=${params?.pageNo}`;
  }
  if(params?.nozzel_log){
    let subUrl = finalurl?.split('?')?.length > 1 ? `&nozzel_log=${params?.nozzel_log}` : `?nozzel_log=${params?.nozzel_log}`
    finalurl = `${finalurl}${subUrl}`;
  }
  try {
    return await axios.get(`${finalurl}`,{
      headers
    });
  } catch (error) {
    console.log('Error while calling SignUp API', error);
    logout(error)
  }
};



const logout = async (response = {}) => {
  // const navigate = useNavigate();

  if (
    response?.response?.status == 403 ||
    response?.response?.status == 401
  ) {
    localStorage.clear();
    // navigate("/login");
  }
}