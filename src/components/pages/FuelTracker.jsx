import React, { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import Layout from "../Layout";

import {
  getAllFuelTracker,
  addNewFuelTracker,
  getAllPetrolPumps,
  getAllFuelType,
  getAllUsers,
  getAllCustomers,
} from "../../services/api";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../Loader";
import Pagination from "../PaginationComponent";

let PageSize = 10;

function FuelTracker({ buttonText, popupContent }) {
  const [showPopup, setShowPopup] = useState(false);
  const [fuelTrackerList, setFuelTrackerList] = useState([]);
  const navigate = useNavigate();
  const [sitesList, setSitesList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState({});

  const [errors, setErrors] = useState({});
  const [isApiError, setIsApiError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [popupHeaderName, setPopUpHeaderName] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [submissionModal, setSubmissionModal] = useState(false);
  const [fuelTrackerData, setFuelTrackerData] = useState({});
  const [petrolPumpOptions, setPetrolPumpOptions] = useState([]);
  const [fuelTypeOptions, setFuelTypeOptions] = useState([]);
  const [usersOptions, setUsersOptions] = useState([]);
  const [customersOptions, setCustomersOptions] = useState([]);
  const [loader, setLoader] = useState(false);


  useEffect(() => {
    console.log("current Page : ", currentPage);
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    fetchAllFuelTracker();
    fetchPetrolPumpOptions();
    fetchAllFuelType();
    fetchAllUsers();
    fetchAllCustomers();
  }, [currentPage]);

  const fetchAllFuelTracker = async () => {
    let params = {
      limit: PageSize,
      pageNo: currentPage,
    };
    setLoader(true);
    setFuelTrackerList([]);
    // setLoader(true);
    const response = await getAllFuelTracker(params);
    if (response?.data?.success) {
      setLoader(false);
      setFuelTrackerList(response?.data?.data?.fuel_tracker);
      setTotalCount(response?.data?.data?.count)
    } else {
      setFuelTrackerList([]);
      setLoader(false);
    }
  };

  const fetchPetrolPumpOptions = async () => {
    setLoader(true);
    let params = {};
    setFuelTrackerList([]);
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

  const fetchAllFuelType = async () => {
    setLoader(true);
    setFuelTypeOptions([]);
    // setLoader(true);
    const response = await getAllFuelType();
    if (response?.data?.success) {
      setLoader(false);
      setFuelTypeOptions(response?.data?.data?.fuel_types);
    } else {
      setFuelTypeOptions([]);
      setLoader(false);
    }
  };

  const fetchAllUsers = async () => {
    setLoader(true);
    setUsersOptions([]);
    // setLoader(true);
    const response = await getAllUsers();
    if (response?.data?.success) {
      setLoader(false);
      setUsersOptions(response?.data?.data?.users);
    } else {
      setUsersOptions([]);
      setLoader(false);
    }
  };

  const fetchAllCustomers = async () => {
    setLoader(true);
    setCustomersOptions([]);
    // setLoader(true);
    const response = await getAllCustomers();
    if (response?.data?.success) {
      setLoader(false);
      setCustomersOptions(response?.data?.data?.customers);
    } else {
      setCustomersOptions([]);
      setLoader(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (fuelTrackerData.name == null || fuelTrackerData.name == "") {
      setErrors({ ...errors, [name]: "" });
    }
    setFuelTrackerData({ ...fuelTrackerData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(fuelTrackerData).length > 0) {
      Object.keys(fuelTrackerData).map((item, index) => {
        if (item != "created_at" && item != "updated_at") {
          if (
            fuelTrackerData?.[item] == null ||
            fuelTrackerData?.[item] == ""
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
        id: "id is required",
        name: "name is required",
        fuelUnitId: "Fuel Unit Id is required",
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
    const response = await addNewFuelTracker(fuelTrackerData);
    if (response?.data?.success) {
      fetchAllFuelTracker();
      setFuelTrackerData({});
      setShowPopup(false);
      setLoader(false);
    } else {
      setIsApiError(true);
      setErrorMsg(response?.response?.data?.message);
      setLoader(false);
      // console.log(response?.response?.data?.message)
    }
    // setLoader(true);
    // if (Object.keys(selectedCategory).length > 0) {
    //   apiUrl = `/units/updateUnit/${selectedCategory?.id}`;
    // } else {
    //   apiUrl = "/units/addUnits";
    // }
    // try {
    //   // const response = await axiosInstance.post(apiUrl, petrolPumpData);
    //   setTimeout(() => {
    //     setLoader(false);
    //   }, 1000);
    //   // if (response.data["success"] == true) {
    //   //   fetchAllPetrolPump();
    //   //   setSelectedCategory({});
    //   //   setPetrolPumpData({});
    //   //   setOpenForm(false);
    //   // }
    // } catch (error) {
    //   console.log(error); // handle the error
    //   setTimeout(() => {
    //     // setLoader(false);
    //   }, 1000);
    //   if (error?.response?.status == 412) {
    //     setErrors(error?.response?.data?.data);
    //   }
    //   if (error?.response?.status == 403 || error?.response?.status == 401) {
    //     localStorage.clear();
    //     navigate("/login");
    //   }
    // }
  };

  //   const deleteSelectedSite = async () => {
  //     setLoader(true);
  //     console.log(dailyFuelRateData);
  //     const response = await deleteDailyFuelRate(dailyFuelRateData?.id);
  //     console.log(response);
  //     if (response?.data?.success) {
  //       console.log(response);
  //       // setloginData(response?.data?.data);
  //       fetchAllDailyFuelRate();
  //       setDailyFuelRateData({});
  //       setSubmissionModal(false);
  //       setLoader(false);
  //     } else {
  //       setIsApiError(true);
  //       setErrorMsg(response?.response?.data?.message);
  //       setLoader(false);
  //       // console.log(response?.response?.data?.message)
  //     }
  //     // setLoader(true);
  //     // try {
  //     //   const response = await axiosInstance.delete(
  //     //     `/units/deleteUnit/${selectedCategory.id}`
  //     //   );
  //     //   setTimeout(() => {
  //     //     setLoader(false);
  //     //   }, 1000);
  //     //   if (response.data["success"] == true) {
  //     //     console.log(response); // handle the response from the server
  //     //     fetchAllSites();
  //     //   }
  //     // } catch (error) {
  //     //   console.log(error); // handle the error
  //     //   if (error?.response?.status == 403 || error?.response?.status == 401) {
  //     //     localStorage.clear();
  //     //     navigate("/login");
  //     //   }
  //     //   setTimeout(() => {
  //     //     setLoader(false);
  //     //   }, 1000);
  //     // }
  //   };

  const togglePopup = () => {
    setPopUpHeaderName("Add Daily Fuel Rate");
    setShowPopup(!showPopup);
    setErrorMsg('');
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
            <div class="text-2xl font-bold text-gray-800 mb-4 mt-2">FuelTracker</div>
            <div
              className="flex justify-end mt-2 "
              style={{ marginBottom: "0.5rem" }}
            >
              <button
                onClick={togglePopup}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded "
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
                            <div className="mt-3 text-center sm:mt-0 sm:ml-0 sm:text-left">
                              <div className="flex justify-center">
                                <MdDelete className="text-gray-800 text-4xl" />
                              </div>
                              <div className="mt-2">
                                <p className="text-[16px] font-bold helvetica not-italic mb-4 text-center text-gray-600">
                                  Are you sure you want to delete?
                                </p>
                                <div className="flex">
                                  {/* <button
                                    onClick={() => {
                                      deleteSelectedSite();
                                    }}
                                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-[#0265cf] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                  >
                                    Delete
                                  </button> */}
                                  <span className="md:hidden lg:inline-block xl:inline-block 2xl:inline-block mx-2"></span>{" "}
                                  {/* Add space between Edit and Delete for smaller screens */}
                                  <span className="hidden md:inline-block lg:hidden xl:hidden 2xl:hidden mx-1"></span>{" "}
                                  {/* Add space between Edit and Delete for medium screens */}
                                  <span className="hidden md:hidden lg:inline-block xl:inline-block 2xl:inline-block mx-2"></span>{" "}
                                  {/* Add space between Edit and Delete for larger screens */}
                                  <button
                                    onClick={() => {
                                      setSubmissionModal(false);
                                    }}
                                    type="submit"
                                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-[#0265cf] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                  >
                                    Close
                                  </button>
                                </div>
                              </div>
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
                    <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" style={{marginTop:"5rem", marginBottom:"5rem", inset:"1rem"}}>
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
                                    <label htmlFor="email" className="sr-only">
                                      Quantity
                                    </label>
                                    <input
                                      id="name"
                                      name="qty"
                                      type="text"
                                      autoComplete="qty"
                                      required
                                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                      placeholder="Enter Quantity"
                                      onChange={(e) => {
                                        handleChange(e);
                                      }}
                                      value={fuelTrackerData.qty}
                                    />
                                  </div>

                                  <div>
                                    <select
                                      id="fuel_type"
                                      className=" border textbox text-sm rounded-lg relative block w-full px-3 py-2 focus:z-10 sm:text-sm border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 "
                                      placeholder="Please Select Fuel Type"
                                      name="fuel_type_id"
                                      onChange={(e) => {
                                        handleChange(e);
                                      }}
                                      value={fuelTrackerData?.fuel_type_id}
                                    >
                                      {errors.fuel_type_id && (
                                        <p className="error-text">
                                          {errors.fuel_type_id}
                                        </p>
                                      )}
                                      <option value="">
                                        Please Select Fuel Type
                                      </option>
                                      {fuelTypeOptions ? (
                                        Object.values(fuelTypeOptions)?.map(
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

                                  <div>
                                    <select
                                      id="petrol_pump_id"
                                      className=" border textbox text-sm rounded-lg relative block w-full px-3 py-2 focus:z-10 sm:text-sm border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 "
                                      placeholder="Please Select Petrol Pump"
                                      name="petrol_pump_id"
                                      onChange={(e) => {
                                        handleChange(e);
                                      }}
                                      value={fuelTrackerData?.petrol_pump_id}
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
                                      value={fuelTrackerData?.user_id}
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

                                  <div>
                                    <select
                                      id="customer_id"
                                      className=" border textbox text-sm rounded-lg relative block w-full px-3 py-2 focus:z-10 sm:text-sm border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 "
                                      placeholder="Please Select Fuel Type"
                                      name="customer_id"
                                      onChange={(e) => {
                                        handleChange(e);
                                      }}
                                      value={fuelTrackerData?.customer_id}
                                    >
                                      {errors.customer_id && (
                                        <p className="error-text">
                                          {errors.customer_id}
                                        </p>
                                      )}
                                      <option value="">
                                        Please Select Customer
                                      </option>
                                      {customersOptions ? (
                                        Object.values(customersOptions)?.map(
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

                                  <div>
                                    <select
                                    id="payment_status"
                                    name="payment_status"
                                      className="border textbox text-sm rounded-lg relative block w-full px-3 py-2 focus:z-10 sm:text-sm border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                      placeholder="Please Select Payment Status"
                                      value={fuelTrackerData?.payment_status}
                                      onChange={(e) => {
                                        handleChange(e);
                                      }}
                                    >
                                      <option value="">Select Payment Status</option>
                                      <option value="paid">Paid</option>
                                      <option value="pending">Pending</option>
                                      <option value="failed">Failed</option>
                                    </select>
                                  </div>

                                  {
                                    fuelTrackerData?.payment_status == "paid" ?
                                    (
                                      <div>
                                    <select
                                    id="payment_mode"
                                    name="payment_mode"
                                      className="border textbox text-sm rounded-lg relative block w-full px-3 py-2 focus:z-10 sm:text-sm border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                      placeholder="Please Select Payment Mode"
                                      value={fuelTrackerData?.payment_mode}
                                      onChange={(e) => {
                                        handleChange(e);
                                      }}
                                    >
                                      <option value="">Select Payment Status</option>
                                      <option value="cash">Cash</option>
                                      <option value="upi">UPI</option>
                                      <option value="cheque">Cheque</option>
                                      <option value="bank transfer">Bank Transfer</option>
                                      <option value="card">Card</option>
                                    </select>
                                  </div>
                                    ):(
                                      <></>
                                    )
                                  }


                                  

                                  {/* <div>
                                    <select
                                    id="continueWithOldRate"
                                    name="continueWithOldRate"
                                      className="border textbox text-sm rounded-lg relative block w-full px-3 py-2 focus:z-10 sm:text-sm border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                      placeholder="Continue With Old Rate"
                                      value={fuelTrackerData?.continueWithOldRate}
                                      onChange={(e) => {
                                        handleChange(e);
                                      }}
                                    >
                                      <option value="">Select Rate</option>
                                      <option value="option1">Yes</option>
                                      <option value="option1">No</option>
                                    </select>
                                  </div> */}
                                  
                                </div>
                                <div>
                                    <p className="text-danger f-12" >{errorMsg}</p>
                                  </div>
                                <div className="flex">
                                  <button
                                    type="submit"
                                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-[#0265cf] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
                                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-[#0265cf] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
              <div class="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
                <div>
                  <button
                    id="dropdownRadioButton"
                    data-dropdown-toggle="dropdownRadio"
                    class="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                    type="button"
                  >
                    <svg
                      class="w-3 h-3 text-gray-500 dark:text-gray-400 me-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z" />
                    </svg>
                    Last 30 days
                    <svg
                      class="w-2.5 h-2.5 ms-2.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m1 1 4 4 4-4"
                      />
                    </svg>
                  </button>
                  {/* <!-- Dropdown menu --> */}
                  <div
                    id="dropdownRadio"
                    class="z-10 hidden w-48 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
                    data-popper-reference-hidden=""
                    data-popper-escaped=""
                    data-popper-placement="top"
                    style={{
                      position: "absolute",
                      inset: "auto auto 0px 0px",
                      margin: "0px",
                      transform: "translate3d(522.5px, 3847.5px, 0px)",
                    }}
                  >
                    <ul
                      class="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200"
                      aria-labelledby="dropdownRadioButton"
                    >
                      <li>
                        <div class="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                          <input
                            id="filter-radio-example-1"
                            type="radio"
                            value=""
                            name="filter-radio"
                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          />
                          <label
                            for="filter-radio-example-1"
                            class="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                          >
                            Last day
                          </label>
                        </div>
                      </li>
                      <li>
                        <div class="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                          <input
                            checked=""
                            id="filter-radio-example-2"
                            type="radio"
                            value=""
                            name="filter-radio"
                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          />
                          <label
                            for="filter-radio-example-2"
                            class="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                          >
                            Last 7 days
                          </label>
                        </div>
                      </li>
                      <li>
                        <div class="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                          <input
                            id="filter-radio-example-3"
                            type="radio"
                            value=""
                            name="filter-radio"
                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          />
                          <label
                            for="filter-radio-example-3"
                            class="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                          >
                            Last 30 days
                          </label>
                        </div>
                      </li>
                      <li>
                        <div class="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                          <input
                            id="filter-radio-example-4"
                            type="radio"
                            value=""
                            name="filter-radio"
                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          />
                          <label
                            for="filter-radio-example-4"
                            class="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                          >
                            Last month
                          </label>
                        </div>
                      </li>
                      <li>
                        <div class="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                          <input
                            id="filter-radio-example-5"
                            type="radio"
                            value=""
                            name="filter-radio"
                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          />
                          <label
                            for="filter-radio-example-5"
                            class="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                          >
                            Last year
                          </label>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <label for="table-search" class="sr-only">
                  Search
                </label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
                    <svg
                      class="w-5 h-5 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="table-search"
                    class="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search for items"
                  />
                </div>
              </div>
              <div class="relative overflow-auto shadow-md sm:rounded-lg lg:mt-[1%] xl:w-[80]">
                {fuelTrackerList?.length > 0 ? (
                  <div>
                    <table class="w-full text-sm font-[500] text-left rtl:text-right text-gray-900 dark:text-gray-400">
                    <thead class="text-xs text-gray-600 border-b-2 border-[#b2b2b2] uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th scope="col" class="px-6 py-3">
                            Quantity
                          </th>
                          <th scope="col" class="px-6 py-3">
                            Fuel-Type
                          </th>
                          <th scope="col" class="px-6 py-3">
                            Petrol Pump
                          </th>
                          <th scope="col" class="px-6 py-3">
                            User
                          </th>
                          <th scope="col" class="px-6 py-3">
                            Customer
                          </th>
                          <th scope="col" class="px-6 py-3">
                            Payment Status
                          </th>
                          <th scope="col" class="px-6 py-3">
                            Payment Mode
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {fuelTrackerList.length > 0
                          ? Object.values(fuelTrackerList)?.map((item, index) => (
                              <tr
                                key={index}
                                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                              >
                                <td class="px-6 py-4">
                                  {Number(item?.qty)?.toFixed(2)}
                                </td>
                                <td class="px-6 py-4">
                                  {item?.fuel_type_details
                                    ? item?.fuel_type_details?.name
                                    : "-"}
                                </td>
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
                                  {item?.customer_details
                                    ? item?.customer_details?.name
                                    : "-"}
                                </td>
                                <td class="px-6 py-4">
                                  {item?.payment_status
                                    ? item?.payment_status
                                    : "-"}
                                </td>
                                <td class="px-6 py-4">
                                  {item?.transaction_type
                                    ? item?.transaction_type
                                    : "-"}
                                </td>

                                {/* <td class="px-6 py-4 flex gap-3">
                                  <a
                                    onClick={() => {
                                      setFuelTypeData(item);
                                      setShowPopup(true);
                                      setSelectedCategory(item);
                                      setPopUpHeaderName("Edit Fuel Type");
                                      setErrors({});
                                      setIsEdit(true);
                                    }}
                                    href="#"
                                    class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                  >
                                    Edit
                                  </a>
                                  <a
                                    onClick={() => {
                                      setFuelTypeData(item);
                                      setSelectedCategory(item);
                                      setSubmissionModal(true);
                                      setErrors({});
                                    }}
                                    href="#"
                                    class="font-medium text-red-600 dark:text-blue-500 hover:underline"
                                  >
                                    Delete
                                  </a>
                                </td> */}
                              </tr>
                            ))
                          : null}
                      </tbody>
                    </table>
                  </div>
                ) : null}
              </div>
              {fuelTrackerList.length > 0 ? (
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
          </div>
        )}
      </div>
    </Layout>
  );
}

export default FuelTracker;
