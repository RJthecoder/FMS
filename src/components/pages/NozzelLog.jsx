import React, { useEffect, useState, useMemo } from "react";
import Layout from "../Layout";

import {
  getAllNozzelLog,
  getAllUsers,
  getAllNozzels,
  getAllPetrolPumps,
  assignUserToNozzel,
} from "../../services/api";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../Loader";
import TitleCase from "../../components/Title";
import Pagination from "../PaginationComponent";

let PageSize = 10;

function NozzelLog({ buttonText, popupContent }) {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const [nozzelLogList, setNozzelLogList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [fuelTypeList, setFuelTypeList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({});
  const [showAssignPopup, setShowAssignPopup] = useState(false);
  const [nozzelOptions, setNozzelOptions] = useState([]);
  const [NozzelLogData, setNozzelLogData] = useState({
    name: "",
    capacity: "",
    petrol_pump_id: "",
    fuel_type_id: "",
  });
  const [assignData, setAssignData] = useState({
    tank_storage_id: "",
  });
  const [errors, setErrors] = useState({});
  const [isApiError, setIsApiError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [popupHeaderName, setPopUpHeaderName] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [submissionModal, setSubmissionModal] = useState(false);
  const [petrolPumpOptions, setPetrolPumpOptions] = useState([]);
  const [usersOptions, setUsersOptions] = useState([]);
  const [fuelUnitData, setNozzelData] = useState({});
  const [loader, setLoader] = useState(false);
  const [users,setUsers] = useState([])

  useEffect(() => {
    console.log("current Page : ", currentPage);
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    fetchAllNozzelLog();
    fetchPetrolPumpOptions();
  }, [currentPage]);

  const fetchAllNozzelLog = async () => {
    let params = {
      limit: 10,
      pageNo: 0,
    };
    setLoader(true);
    setNozzelLogList([]);
    // setLoader(true);
    const response = await getAllNozzelLog(params);
    console.log(response)
    if (response?.data?.success) {
      setLoader(false);
      setNozzelLogList(response?.data?.data?.assigned_nozzles);
      setTotalCount(response?.data?.data?.count);
      console.log(nozzelLogList);
    } else {
      setNozzelLogList([]);
      setLoader(false);
      
    }
  };

  const fetchPetrolPumpOptions = async () => {
    setLoader(true);
    let params = {};
    setNozzelLogList([]);
    // setLoader(true);
    const response = await getAllPetrolPumps(params);
    if (response?.data?.success) {
      setLoader(false);
      setPetrolPumpOptions(response?.data?.data?.petrolPumps);
    } else {
      setPetrolPumpOptions([]);
      setLoader(false);
    }
  };

  const fetchAllUsers = async (petrol_pump_id) => {
    setLoader(true);
    setUsersOptions([]);
    let params = {
      petrol_pump_id: petrol_pump_id
    };
    // setLoader(true);
    const response = await getAllUsers(params);
    if (response?.data?.success) {
      setLoader(false);

      setUsersOptions(response?.data?.data?.users);
      console.log(response?.data?.data)
      
    } else {
      setUsersOptions([]);
      setLoader(false);
    }
  };

  const fetchAllNozzel = async (petrol_pump_id) => {
    setNozzelOptions([]);
    // setLoader(true);
    let params = {
      petrol_pump_id: petrol_pump_id
    };
    const response = await getAllNozzels(params);
    if (response?.data?.success) {
      setNozzelOptions(response?.data?.data?.nozzels);
      setLoader(false);
    } else {
      setNozzelOptions([]);
      setLoader(false);
      if (
        response?.response?.status == 403 ||
        response?.response?.status == 401
      ) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (NozzelLogData.name == null || NozzelLogData.name == "") {
      setErrors({ ...errors, [name]: "" });
    }
    setNozzelLogData({ ...NozzelLogData, [name]: value });
  };

  const handleChangePetrolPump = (e) => {
    const { name, value } = e.target;
    if (NozzelLogData.name == null || NozzelLogData.name == "") {
      setErrors({ ...errors, [name]: "" });
    }
    setNozzelLogData({ ...NozzelLogData, [name]: value });
    fetchAllNozzel(NozzelLogData?.petrol_pump_id);
    fetchAllUsers(NozzelLogData?.petrol_pump_id)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(NozzelLogData)?.length > 0) {
      Object.keys(NozzelLogData).map((item, index) => {
        if (item != "created_at" && item != "updated_at") {
          if (
            NozzelLogData?.[item] == null ||
            NozzelLogData?.[item] == ""
          ) {
            const { name, value } = {
              name: item,
              value: `${item} is required!`,
            };
            setErrors({ ...errors, [name]: value });
          }
        }
      });
    } else {
      setErrors({
        name: "Name is required",
        capacity: "Capacity is required",
        petrol_pump_id: "Petrol Pump ID is required",
        fuel_type_id: "Fuel Type is required",
      });
      return;
    }
    if (Object.keys(errors)?.length > 0) {
      Object.keys(errors).map((item, index) => {
        if (errors?.[item] != null || errors?.[item] != "") {
          const { name, value } = {
            name: item,
            value: `${item} is required!`,
          };
          setErrors({ ...errors, [name]: value });
          return;
        }
      });
    }
    setLoader(true);
    const response = await assignUserToNozzel(NozzelLogData);
    console.log(response);
    if (response?.data?.success) {
      setLoader(false);
      console.log(response);
      // setloginData(response?.data?.data);
      fetchAllNozzelLog();
      setNozzelLogData({});
      setShowPopup(false);
    } else {
      setIsApiError(true);
      setErrorMsg(response?.response?.data?.message);
      setLoader(false);
      if (
        response?.response?.status == 403 ||
        response?.response?.status == 401
      ) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  

  const togglePopup = () => {
    setNozzelLogData({});
    setPopUpHeaderName("Add New Nozzel Log");
    setShowPopup(!showPopup);
    setIsEdit(false);
  };

  const toggleSubmissionPopup = () => {
    setSubmissionModal(false);
  };

  return (
    <Layout>
      <div>
        {loader ? (
          <Loader />
        ) : (
          <div
            className="mt-4"
            style={{ marginTop: "4rem", marginBottom: "2rem" }}
          >
            <div className="flex justify-between ">
              <div class="text-2xl font-bold text-gray-800 mb-4 mt-2">
                Nozzel Log
              </div>
              <div
                className="flex justify-end mt-2 "
                style={{ marginBottom: "0.5rem" }}
              >
                <button
                  onClick={togglePopup}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  +ADD
                </button>
              </div>
              {submissionModal && (
                <>
                  <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                      <div className="fixed inset-0 transition-opacity">
                        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                      </div>
                      <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
                      &#8203;
                      <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                          <div className="sm:items-start">
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                              <h3
                                className="text-lg leading-6 font-medium text-gray-900"
                                id="modal-title"
                              >
                                {"Please Confirm !"}
                              </h3>
                              
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
              {showPopup && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                  <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <div className="fixed inset-0 transition-opacity">
                      <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                    </div>
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
                    &#8203;
                    <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:items-start">
                          <div className="mt-3 text-center sm:mt-0 sm:ml-0 sm:text-left">
                            <h3
                              className="text-lg leading-6 font-medium text-gray-900"
                              id="modal-title"
                            >
                              {popupHeaderName}
                            </h3>
                            <div className="mt-2">
                              <form
                                className="mt-8 space-y-6"
                                onSubmit={handleSubmit}
                              >
                                <input
                                  type="hidden"
                                  name="remember"
                                  value="true"
                                />
                                <div className="rounded-md shadow-sm  space-y-4">
                                <div>
                                    <select
                                      id="petrol_pump_id"
                                      className=" border textbox text-sm rounded-lg relative block w-full px-3 py-2 focus:z-10 sm:text-sm border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 "
                                      placeholder="Please Select Petrol Pump"
                                      name="petrol_pump_id"
                                      onChange={(e) => {
                                        handleChangePetrolPump(e);
                                      }}
                                      value={NozzelLogData?.petrol_pump_id}
                                    >
                                      {errors.petrol_pump_id && (
                                        <p className="error-text">
                                          {errors.petrol_pump_id}
                                        </p>
                                      )}
                                      <option value="">
                                        Please Select petrol Pump
                                      </option>
                                      {petrolPumpOptions ? (
                                        Object.values(petrolPumpOptions)?.map(
                                          (item, index) => (
                                            <option value={item?.id}>
                                              {item?.name}, {item?.address}
                                            </option>
                                          )
                                        )
                                      ) : (
                                        <span>N/A</span>
                                      )}
                                    </select>
                                  </div>
                                <div>
                                    <select
                                      id="user_id"
                                      className=" border textbox text-sm rounded-lg relative block w-full px-3 py-2 focus:z-10 sm:text-sm border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 "
                                      placeholder="Please Select User"
                                      name="user_id"
                                      onChange={(e) => {
                                        handleChange(e);
                                      }}
                                      value={NozzelLogData?.user_id}
                                    >
                                      {errors.user_id && (
                                        <p className="error-text">
                                          {errors.user_id}
                                        </p>
                                      )}
                                      <option value="">
                                        Please Select User
                                      </option>
                                      {usersOptions ? (
                                        Object.values(usersOptions)?.map(
                                          (item, index) => (
                                            <option value={item?.id}>
                                              {item?.name}
                                            </option>
                                          )
                                        )
                                      ) : (
                                        <span>N/A</span>
                                      )}
                                    </select>
                                  </div>

                                  

                                  <div className="rounded-md shadow-sm  space-y-4">
                                    <div>
                                      <label
                                        htmlFor="email"
                                        className="sr-only"
                                      >
                                        Select Nozzel
                                      </label>
                                      <select
                                        id="nozzle_id"
                                        className=" border textbox text-sm rounded-lg relative block w-full px-3 py-2 focus:z-10 sm:text-sm border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 "
                                        placeholder="Please Select Nozzel"
                                        name="nozzle_id"
                                        onChange={(e) => {
                                            handleChange(e);
                                        }}
                                        value={assignData?.nozzle_id}
                                      >
                                        {errors.nozzle_id && (
                                          <p className="error-text">
                                            {errors.nozzle_id}
                                          </p>
                                        )}
                                        <option value="">
                                          Please Select Nozzel
                                        </option>
                                        {nozzelOptions ? (
                                          Object.values(nozzelOptions)?.map(
                                            (item, index) => (
                                              <option
                                                key={index}
                                                value={item?.id}
                                              >
                                                {item?.name}
                                              </option>
                                            )
                                          )
                                        ) : (
                                          <span>N/A</span>
                                        )}
                                      </select>
                                    </div>
                                  </div>
                                  <div>
                                <label htmlFor="password" className="sr-only">
                                  Starting Reading
                                </label>
                                <input
                                  id="abbrevation"
                                  name="starting_reading"
                                  type="text"
                                  required
                                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                  placeholder="Enter Starting Reading"
                                  onChange={(e) => {
                                    handleChange(e);
                                  }}
                                  value={assignData.starting_reading}
                                />
                              </div>
                                </div>

                                <div className="flex">
                                  <button
                                    type="submit"
                                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                  >
                                    Submit
                                  </button>
                                  <span className="md:hidden lg:inline-block xl:inline-block 2xl:inline-block mx-2"></span>{" "}
                                  {/* Add space between Edit and Delete for smaller screens */}
                                  <span className="hidden md:inline-block lg:hidden xl:hidden 2xl:hidden mx-1"></span>{" "}
                                  {/* Add space between Edit and Delete for medium screens */}
                                  <span className="hidden md:hidden lg:inline-block xl:inline-block 2xl:inline-block mx-2"></span>{" "}
                                  {/* Add space between Edit and Delete for larger screens */}
                                  <button
                                    onClick={togglePopup}
                                    type="submit"
                                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                  >
                                    Close
                                  </button>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
            </div>
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg lg:mt-[1%] xl:w-[80]">
              
              <div class="relative overflow-auto shadow-md sm:rounded-lg lg:mt-[1%] xl:w-[80]">
                {nozzelLogList?.length > 0 ? (
                  <div>
                    <table class="w-full text-sm font-[500] text-left rtl:text-right text-gray-900 dark:text-gray-400">
                      <thead class="text-xs text-gray-600 border-b-2 border-[#b2b2b2] uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          
                          <th scope="col" class="px-6 py-3">
                            Petrol-Pump
                          </th>
                          <th scope="col" class="px-6 py-3">
                            User
                          </th>
                          <th scope="col" class="px-6 py-3">
                            Nozzel
                          </th>
                          <th scope="col" class="px-6 py-3">
                            Date
                          </th>
                          <th scope="col" class="px-6 py-3">
                            Starting Reading
                          </th>
                          
                        </tr>
                      </thead>
                      <tbody>
                        {nozzelLogList?.length > 0
                          ? Object.values(nozzelLogList)?.map(
                              (item, index) => (
                                <tr
                                  key={index}
                                  class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 "
                                >
                                  <td class="px-6 py-4">
                                    {item?.petrol_pump_details
                                      ? item?.petrol_pump_details?.name
                                      : "-"}
                                  </td>
                                  <td class="px-6 py-4">
                                  {item?.user_details
                                    ? item?.user_details?.name
                                    : "-"}
                                </td>
                                  <td class="px-6 py-4">
                                    {item?.nozzle_details
                                      ? item?.nozzle_details?.name
                                      : "-"}
                                  </td>
                                  <td class="px-6 py-4">{new Date(item.created_at).toLocaleString()}</td>
                                  <td class="px-6 py-4">
                                    {item?.starting_reading}
                                  </td>
                                
                                </tr>
                              )
                            )
                          : null}
                      </tbody>
                    </table>
                  </div>
                ) : null}
              </div>
              
            </div>
            {nozzelLogList?.length > 0 ? (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Pagination
                  className="mb-2"
                  totalPosts={totalCount}
                  postsPerPage={PageSize}
                  setCurrentPage={setCurrentPage}
                  currentPage={currentPage}
                />
              </div>
            ) : (
              <></>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}

export default NozzelLog;