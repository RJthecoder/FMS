import React, { useEffect, useState, useMemo } from "react";
import { MdDelete } from "react-icons/md";
import Layout from "../Layout";

import {
  addNewTankStorage,
  deleteTankStorage,
  editTankStorage,
  getAllTankStorage,
  getAllPetrolPumps,
  getAllFuelType,
  getAllUnit,
  assignNozzelToTank,
  getAllNozzels,
} from "../../services/api";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../Loader";
import TitleCase from "../../components/Title";
import Pagination from "../PaginationComponent";

let PageSize = 10;

function TankStorage({ buttonText, popupContent }) {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const [tankStorageList, setTankStorageList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [fuelTypeList, setFuelTypeList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({});
  const [showAssignPopup, setShowAssignPopup] = useState(false);
  const [nozzelOptions, setNozzelOptions] = useState([]);
  const [tankStorageData, setTankStorageData] = useState({
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
  const [fuelTypeOptions, setFuelTypeOptions] = useState([]);
  const [fuelTypeData, setFuelTypeData] = useState({});
  const [fuelUnitData, setFuelUnitData] = useState({});
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    console.log("current Page : ", currentPage);
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    fetchAllTankStorage();
    fetchPetrolPumpOptions();
    fetchAllFuelType();
    fetchAllFuelUnit();
  }, [currentPage]);

  const fetchAllTankStorage = async () => {
    let params = {
      limit: PageSize,
      pageNo: currentPage,
    };
    setLoader(true);
    setTankStorageList([]);
    // setLoader(true);
    const response = await getAllTankStorage(params);
    console.log(response)
    if (response?.data?.success) {
      setLoader(false);
      setTankStorageList(response?.data?.data?.tank_storage_data);
      setTotalCount(response?.data?.data?.count);
      console.log(tankStorageList);
    } else {
      setTankStorageList([]);
      setLoader(false);
      
    }
  };

  const fetchPetrolPumpOptions = async () => {
    setLoader(true);
    let params = {};
    setTankStorageList([]);
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

  const fetchAllFuelUnit = async () => {
    setLoader(true);
    setFuelUnitData([]);
    // setLoader(true);
    const response = await getAllUnit();
    console.log(response?.data);
    if (response?.data?.success) {
      setLoader(false);
      setFuelUnitData(response?.data?.data?.units);
      console.log(fuelTypeList);
    } else {
      setFuelUnitData([]);
      setLoader(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (tankStorageData.name == null || tankStorageData.name == "") {
      setErrors({ ...errors, [name]: "" });
    }
    setTankStorageData({ ...tankStorageData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(tankStorageData).length > 0) {
      Object.keys(tankStorageData).map((item, index) => {
        if (item != "created_at" && item != "updated_at") {
          if (
            tankStorageData?.[item] == null ||
            tankStorageData?.[item] == ""
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
    const response = isEdit
      ? await editTankStorage(tankStorageData, tankStorageData?.id)
      : await addNewTankStorage(tankStorageData);
    console.log(response);
    if (response?.data?.success) {
      setLoader(false);
      console.log(response);
      // setloginData(response?.data?.data);
      fetchAllTankStorage();
      setTankStorageData({});
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

  const deleteSelectedSite = async () => {
    setLoader(true);
    const response = await deleteTankStorage(tankStorageData?.id);
    console.log(response);
    if (response?.data?.success) {
      console.log(response);
      // setloginData(response?.data?.data);
      fetchAllTankStorage();
      setTankStorageData({});
      setSubmissionModal(false);
      setLoader(false);
    } else {
      setIsApiError(true);
      setErrorMsg(response?.response?.data?.message);
      setLoader(false);
      // console.log(response?.response?.data?.message)
    }
    // setLoader(true);
    // try {
    //   const response = await axiosInstance.delete(
    //     `/units/deleteUnit/${selectedCategory.id}`
    //   );
    //   setTimeout(() => {
    //     setLoader(false);
    //   }, 1000);
    //   if (response.data["success"] == true) {
    //     console.log(response); // handle the response from the server
    //     fetchAllSites();
    //   }
    // } catch (error) {
    //   console.log(error); // handle the error
    //   if (error?.response?.status == 403 || error?.response?.status == 401) {
    //     localStorage.clear();
    //     navigate("/login");
    //   }
    //   setTimeout(() => {
    //     setLoader(false);
    //   }, 1000);
    // }
  };

  const togglePopup = () => {
    setTankStorageData({});
    setPopUpHeaderName("Add New Tank Storage");
    setShowPopup(!showPopup);
    setIsEdit(false);
  };

  const assigntogglePopup = (tankStorageData = {}) => {
    setErrorMsg('');
    setLoader(true);
    fetchAllNozzel(tankStorageData?.petrol_pump_id);
    setPopUpHeaderName("Assign Nozzel to Tank Storage");
    setShowAssignPopup(!showAssignPopup);
    setAssignData({
      tank_storage_id: tankStorageData?.id,
    });
  };

  const handleAssignChange = (e) => {
    const { name, value } = e.target;
    if (assignData.name == null || assignData.name == "") {
      setErrors({ ...errors, [name]: "" });
    }
    setAssignData({ ...assignData, [name]: value });
  };

  const assignhandleSubmit = async (e) => {
    setLoader(true);
    e.preventDefault();
    if (Object.keys(assignData).length > 0) {
      Object.keys(assignData).map((item, index) => {
        if (item != "created_at" && item != "updated_at") {
          if (assignData?.[item] == null || assignData?.[item] == "") {
            const { name, value } = {
              name: item,
              value: `${item} is required!`,
            };
            setErrors({ ...errors, [name]: value });
          }
        }
      });
    } else {
      setLoader(false);
      setErrors({
        name: "Name is required",
        abbrevation: "Abbrevation is required",
        address: "Address is required",
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
    const response = isEdit
      ? await editTankStorage(assignData, assignData?.id)
      : await assignNozzelToTank(assignData);
    setLoader(false)
    if (response?.data?.success) {
      fetchAllTankStorage();
      setAssignData({});
      setShowAssignPopup(false);
    } else {
      setIsApiError(true);
      setErrorMsg(response?.response?.data?.message);
      // console.log(response?.response?.data?.message)
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
                Tank Storage
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
                            <div className="mt-3 text-center sm:mt-0 sm:ml-0 sm:text-left">
                              <div className="flex justify-center">
                                <MdDelete className="text-gray-800 text-4xl" />
                              </div>
                              <div className="mt-2">
                                <p className="text-[16px] font-bold helvetica not-italic mb-4 text-center text-gray-600">
                                  Are you sure you want to delete?
                                </p>
                                <div className="flex">
                                  <button
                                    onClick={() => {
                                      deleteSelectedSite();
                                    }}
                                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                  >
                                    Delete
                                  </button>
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
                                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
                                    <label htmlFor="name" className="sr-only">
                                      Name
                                    </label>
                                    <input
                                      id="name"
                                      name="name"
                                      type="text"
                                      autoComplete="name"
                                      required
                                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                      placeholder="Enter Nozzel Name"
                                      onChange={(e) => {
                                        handleChange(e);
                                      }}
                                      value={tankStorageData.name}
                                    />
                                  </div>
                                  <div>
                                    <label
                                      htmlFor="capacity"
                                      className="sr-only"
                                    >
                                      Capacity
                                    </label>
                                    <input
                                      id="capacity"
                                      name="capacity"
                                      type="text"
                                      required
                                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                      placeholder="Enter Capacity"
                                      onChange={(e) => {
                                        handleChange(e);
                                      }}
                                      value={tankStorageData.capacity}
                                    />
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
                                      value={tankStorageData?.petrol_pump_id}
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
                                      id="fuel_type"
                                      className=" border textbox text-sm rounded-lg relative block w-full px-3 py-2 focus:z-10 sm:text-sm border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 "
                                      placeholder="Please Select Fuel Type"
                                      name="fuel_type_id"
                                      onChange={(e) => {
                                        handleChange(e);
                                      }}
                                      value={tankStorageData?.fuel_type_id}
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
                                      id="fuel_unit_id"
                                      className=" border textbox text-sm rounded-lg relative block w-full px-3 py-2 focus:z-10 sm:text-sm border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 "
                                      placeholder="Please Select Unit"
                                      name="fuel_unit_id"
                                      onChange={(e) => {
                                        handleChange(e);
                                      }}
                                      value={fuelTypeData?.fuel_unit_id}
                                    >
                                      {errors.fuel_unit_id && (
                                        <p className="error-text">
                                          {errors.fuel_unit_id}
                                        </p>
                                      )}
                                      <option value="">
                                        Please Select Unit
                                      </option>
                                      {fuelUnitData ? (
                                        Object.values(fuelUnitData)?.map(
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
              {showAssignPopup && (
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
                                {popupHeaderName}
                              </h3>
                              <div className="mt-2">
                                <form
                                  className="mt-8 space-y-6"
                                  onSubmit={assignhandleSubmit}
                                >
                                  <input
                                    type="hidden"
                                    name="remember"
                                    value="true"
                                  />
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
                                          handleAssignChange(e);
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
                                      onClick={assigntogglePopup}
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
                </>
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
                {tankStorageList?.length > 0 ? (
                  <div>
                    <table class="w-full text-sm font-[500] text-left rtl:text-right text-gray-900 dark:text-gray-400">
                      <thead class="text-xs text-gray-600 border-b-2 border-[#b2b2b2] uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th scope="col" class="px-6 py-3">
                            Name
                          </th>
                          <th scope="col" class="px-6 py-3">
                            Capacity
                          </th>
                          <th scope="col" class="px-6 py-3">
                            Petrol-Pump
                          </th>
                          <th scope="col" class="px-6 py-3">
                            Fuel-Type
                          </th>
                          <th scope="col" class="px-6 py-3">
                            Fuel-Unit
                          </th>
                          <th scope="col" class="px-6 py-3">
                            Assigned Nozzel
                          </th>
                          <th scope="col" class="px-6 py-3">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {tankStorageList.length > 0
                          ? Object.values(tankStorageList)?.map(
                              (item, index) => (
                                <tr
                                  key={index}
                                  class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 "
                                >
                                  <td class="px-6 py-4">
                                    <TitleCase text={item.name} />
                                  </td>
                                  <td class="px-6 py-4">{item?.capacity}</td>
                                  <td class="px-6 py-4">
                                    {item?.petrol_pump_details
                                      ? item?.petrol_pump_details?.name
                                      : "-"}
                                  </td>
                                  <td class="px-6 py-4">
                                    {item?.fuel_type_details
                                      ? item?.fuel_type_details?.name
                                      : "-"}
                                  </td>
                                  <td class="px-6 py-4">
                                    {item?.fuel_unit_details
                                      ? item?.fuel_unit_details?.unit
                                      : "-"}
                                  </td>
                                  <td>
                                    {item.assign_nozzel.length > 0 ? (
                                      item.assign_nozzel.map((assign) => (
                                        <span key={assign.id}>
                                          {assign.nozzle_details.name}
                                          {item.assign_nozzel.indexOf(
                                            assign
                                          ) !==
                                          item.assign_nozzel.length - 1
                                            ? ", "
                                            : ""}
                                        </span>
                                      ))
                                    ) : (
                                      <span>No nozzles assigned</span>
                                    )}
                                  </td>
                                  <td class="px-6 py-4 flex gap-3">
                                    <a
                                      onClick={() => {
                                        assigntogglePopup(item);
                                        setErrors({});
                                      }}
                                      href="#"
                                      className="font-medium text- [#814f68]-600  hover:underline pointer"
                                    >
                                      Assign
                                    </a>
                                    <a
                                      onClick={() => {
                                        setTankStorageData(item);
                                        setShowPopup(true);
                                        setSelectedCategory(item);
                                        setPopUpHeaderName("Edit Tank Storage");
                                        setErrors({});
                                        setIsEdit(true);
                                      }}
                                      href="#"
                                      class="font-medium text-blue-500 dark:text-skyblue "
                                    >
                                      Edit
                                    </a>

                                    <a
                                      onClick={() => {
                                        setTankStorageData(item);
                                        setSelectedCategory(item);
                                        setSubmissionModal(true);
                                        setErrors({});
                                      }}
                                      href="#"
                                      class="font-medium text-red-600 dark:text-skyblue "
                                    >
                                      Delete
                                    </a>
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
            {tankStorageList.length > 0 ? (
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

export default TankStorage;
