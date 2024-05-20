import React, { useEffect, useState, useMemo } from "react";
import { MdDelete } from "react-icons/md";
import Layout from "../Layout";

import {
  addNewUsers,
  deleteUsers,
  editUsers,
  getAllPetrolPumps,
  getAllRoles,
  getAllUsers,
} from "../../services/api";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../Loader";
import "../home.css"
import TitleCase from "../../components/Title"

let PageSize = 10;

function Users({ buttonText, popupContent }) {
  const [showPopup, setShowPopup] = useState(false);
  const [usersList, setUsersList] = useState([]);
  const navigate = useNavigate();

  const [sitesList, setSitesList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState({});
  const [usersData, setUsersData] = useState({
    name: "",
    email: "",
    mobileno: "",
    address: "",
    password: "",
    role_id: "",
    petrol_pump_id: "",
    date_of_birth: "",
    joining_date: "",
    aadhar_no: "",
    password_confirmation: "",
  });
  const [errors, setErrors] = useState({});
  const [isApiError, setIsApiError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [popupHeaderName, setPopUpHeaderName] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [submissionModal, setSubmissionModal] = useState(false);
  const [petrolPumpOptions, setPetrolPumpOptions] = useState([]);
  const [roleOptions, setRoleOptions] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    console.log("current Page : ", currentPage);
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    fetchAllUsers();
    fetchPetrolPumpOptions();
    fetchAllRoles();
  }, [currentPage]);

  const fetchAllUsers = async () => {
    let params = {
      limit: 10,
      pageNo: 0,
    };
    setLoader(true);
    setUsersList([]);
    // setLoader(true);
    const response = await getAllUsers(params);
    if (response?.data?.success) {
      setLoader(false);
      setUsersList(response?.data?.data?.users);
      console.log(usersList);
    } else {
      setUsersList([]);
      setLoader(false);
    }
  };

  const fetchPetrolPumpOptions = async () => {
    setLoader(true);
    let params = {};
    setUsersList([]);
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

  const fetchAllRoles = async () => {
    setLoader(true);
    setRoleOptions([]);
    // setLoader(true);
    const response = await getAllRoles();
    if (response?.data?.success) {
      setLoader(false);
      setRoleOptions(response?.data?.data?.roles);
    } else {
      setRoleOptions([]);
      setLoader(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (usersData.name == null || usersData.name == "") {
      setErrors({ ...errors, [name]: "" });
    }
    setUsersData({ ...usersData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(usersData).length > 0) {
      Object.keys(usersData).map((item, index) => {
        if (item != "created_at" && item != "updated_at") {
          if (usersData?.[item] == null || usersData?.[item] == "") {
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
    setLoader(true);
    const response = isEdit
      ? await editUsers(usersData, usersData?.id)
      : await addNewUsers(usersData);
    console.log(response);
    if (response?.data?.success) {
      console.log(response);
      // setloginData(response?.data?.data);
      fetchAllUsers();
      setUsersData({});
      setShowPopup(false);
      setLoader(false);
    } else {
      setIsApiError(true);
      setErrorMsg(response?.response?.data?.message);
      setLoader(false);
    }
  };

  const deleteSelectedSite = async () => {
    setLoader(true);
    const response = await deleteUsers(usersData?.id);
    console.log(response);
    if (response?.data?.success) {
      console.log(response);
      // setloginData(response?.data?.data);
      fetchAllUsers();
      setUsersData({});
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
    setUsersData({});
    setPopUpHeaderName("Add New User");
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
            className="mt-4 "
            style={{ marginTop: "4rem", marginBottom: "2rem" }}
          >
            <div className="flex justify-between align-middle xl:py-4 py-2">
            <div class="text-2xl font-bold text-gray-800 flex align-middle pt-1">Users</div>
            <div className="flex justify-end ">
            <button
                onClick={togglePopup}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4  rounded"
              >
                +ADD
              </button>
            </div>
            </div>
            <div
              className="flex justify-end mt-2 "
              style={{ marginBottom: "0.5rem" }}
            >
              

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
                <div className="fixed z-0 inset-0 overflow-y-hidden">
                  <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <div className="fixed inset-0 transition-opacity">
                      <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                    </div>
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
                    &#8203;
                    <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:max-h-screen " style={{marginTop:"5rem", marginBottom:"5rem", inset:"1rem"}}>
                      <div className="bg-white px-4 xl:mt-3 sm:p-6 sm:pb-4 relative overflow-y-auto" style = {{height:"70vh", marginTop:"1rem"}}>
                        <div className="sm:items-start">
                          <div className="text-center sm:mt-0 sm:ml-0 sm:text-left">
                            <h3
                              className="text-lg leading-6 font-medium text-gray-900"
                              id="modal-title"
                            >
                              {popupHeaderName}
                            </h3>
                            <div className="mt-2">
                              <form
                                className="mt-8 space-y-6 pb-4"
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
                                      Name
                                    </label>
                                    <input
                                      id="name"
                                      name="name"
                                      type="text"
                                      autoComplete="name"
                                      required
                                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                      placeholder="Enter User Name"
                                      onChange={(e) => {
                                        handleChange(e);
                                      }}
                                      value={usersData.name}
                                    />
                                  </div>
                                  <div>
                                    <label
                                      htmlFor="password"
                                      className="sr-only"
                                    >
                                      Enter Email
                                    </label>
                                    <input
                                      id="email"
                                      name="email"
                                      type="text"
                                      required
                                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                      placeholder="Enter Email"
                                      onChange={(e) => {
                                        handleChange(e);
                                      }}
                                      value={usersData.email}
                                    />
                                  </div>
                                  <div>
                                    <label
                                      htmlFor="password"
                                      className="sr-only"
                                    >
                                      Mobile-No
                                    </label>
                                    <input
                                      id="number"
                                      name="mobile_no"
                                      type="text"
                                      required
                                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                      placeholder="Enter Mob-no"
                                      onChange={(e) => {
                                        handleChange(e);
                                      }}
                                      value={usersData.mobileno}
                                    />
                                  </div>
                                  <div>
                                    <label
                                      htmlFor="password"
                                      className="sr-only"
                                    >
                                      Address
                                    </label>
                                    <input
                                      id="address"
                                      name="address"
                                      type="address"
                                      required
                                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                      placeholder="Enter Address"
                                      onChange={(e) => {
                                        handleChange(e);
                                      }}
                                      value={usersData.address}
                                    />
                                  </div>
                                  <div>
                                    <select
                                      id="countries"
                                      className=" border textbox text-sm rounded-lg relative block w-full px-3 py-2 focus:z-10 sm:text-sm border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 "
                                      placeholder="Please Select Role"
                                      name="role_id"
                                      onChange={(e) => {
                                        handleChange(e);
                                      }}
                                      value={usersData?.role_id}
                                    >
                                      {errors.role_id && (
                                        <p className="error-text">
                                          {errors.role_id}
                                        </p>
                                      )}
                                      <option value="">
                                        Please Select Role
                                      </option>
                                      {roleOptions ? (
                                        Object.values(roleOptions)?.map(
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
                                      id="countries"
                                      className=" border textbox text-sm rounded-lg relative block w-full px-3 py-2 focus:z-10 sm:text-sm border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 "
                                      placeholder="Please Select Petrol Pump"
                                      name="petrol_pump_id"
                                      onChange={(e) => {
                                        handleChange(e);
                                      }}
                                      value={usersData?.petrol_pump_id}
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
                                    <label htmlFor="password">
                                      Date of Birth
                                    </label>
                                    <input
                                      id="text"
                                      name="date_of_birth"
                                      type="date"
                                      required
                                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                      placeholder="Enter Date of Birth"
                                      onChange={(e) => {
                                        handleChange(e);
                                      }}
                                      value={usersData.date_of_birth}
                                    />
                                  </div>
                                  <div>
                                    <label htmlFor="password">
                                      Date of Joining
                                    </label>
                                    <input
                                      id="text"
                                      name="joining_date"
                                      type="date"
                                      required
                                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                      placeholder="Enter Date of joining"
                                      onChange={(e) => {
                                        handleChange(e);
                                      }}
                                      value={usersData.joining_date}
                                    />
                                  </div>
                                  <div>
                                    <label htmlFor="" className="sr-only">
                                      Aadhar Number
                                    </label>
                                    <input
                                      id="number"
                                      name="aadhar_no"
                                      type="text"
                                      required
                                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                      placeholder="Enter Aadhar Number"
                                      onChange={(e) => {
                                        handleChange(e);
                                      }}
                                      value={usersData.aadhar_no}
                                    />
                                  </div>
                                  {!isEdit && (
                                    <>
                                      <div>
                                        <label
                                          htmlFor="password"
                                          className="sr-only"
                                        >
                                          Enter Password
                                        </label>
                                        <input
                                          id="password"
                                          name="password"
                                          type="Password"
                                          required
                                          className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                          placeholder="Enter Password"
                                          onChange={(e) => {
                                            handleChange(e);
                                          }}
                                          value={usersData.password}
                                        />
                                      </div>
                                      <div>
                                        <label
                                          htmlFor="password"
                                          className="sr-only"
                                        >
                                          Password Confirmation
                                        </label>
                                        <input
                                          id="number"
                                          name="password_confirmation"
                                          type="Password"
                                          required
                                          className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                          placeholder="Confirm Password"
                                          onChange={(e) => {
                                            handleChange(e);
                                          }}
                                          value={
                                            usersData.password_confirmation
                                          }
                                        />
                                      </div>
                                    </>
                                  )}
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
            <div class="flex overflow-auto shadow-md sm:rounded-lg  xl:w-[80]">
                {usersList?.length > 0 ? (
                  <div>
                    <table class="w-full text-sm font-[500] text-left rtl:text-right text-gray-900 dark:text-gray-400">
                    <thead class="text-xs text-gray-600 border-b-2 border-[#b2b2b2] uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" class="px-6 py-3">
                          Name
                        </th>
                        <th scope="col" class="px-6 py-3">
                          Email
                        </th>
                        <th scope="col" class="px-6 py-3">
                          Mob-No
                        </th>
                        <th scope="col" class="px-6 py-3">
                          Address
                        </th>

                        <th scope="col" class="px-6 py-3">
                          Role
                        </th>
                        <th scope="col" class="px-6 py-3">
                          Petrol Pump
                        </th>
                        <th scope="col" class="px-6 py-3">
                          D.O.B
                        </th>
                        <th scope="col" class="px-6 py-3">
                          Joining Date
                        </th>
                        <th scope="col" class="px-6 py-3">
                          Aadhaar no
                        </th>

                        <th scope="col" class="px-6 py-3">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {usersList.length > 0
                        ? Object.values(usersList)?.map((item, index) => (
                            <tr
                              key={index}
                              class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 " 
                            >
                              <td class="px-6 py-4"><TitleCase text={item.name}/></td>
                              <td class="px-6 py-4">{item?.email}</td>
                              <td class="px-6 py-4">{item?.mobile_no}</td>
                              <td class="px-6 py-4"><TitleCase text={item?.address}/></td>
                              <td class="px-6 py-4">
                                {item?.role_details
                                  ? item?.role_details?.name
                                  : "-"}
                              </td>
                              <td class="px-6 py-4">
                                {item?.petrol_pump_details
                                  ? item?.petrol_pump_details?.name
                                  : "-"}
                              </td>
                              <td class="px-6 py-4">
                                {item?.date_of_birth ? item?.date_of_birth : "-"}
                              </td>
                              <td class="px-6 py-4">
                                {item?.joining_date ? item?.joining_date : "-"}
                              </td>
                              <td class="px-6 py-4">
                                {item?.aadhar_no ? item?.aadhar_no : "-"}
                              </td>
                              <td class="px-6 py-4 flex gap-3">
                              {/* <a
                              onClick={() => navigate(`/users-info/${item?.id}`)}
                              className="font-medium text- [#814f68]-600  hover:underline pointer"
                            >
                              Details
                            </a> */}
                                <a
                                  onClick={() => {
                                    setUsersData(item);
                                    setShowPopup(true);
                                    setSelectedCategory(item);
                                    setPopUpHeaderName("Edit Petrol Pump");
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
                                    setUsersData(item);
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
                          ))
                        : null}
                    </tbody>
                  </table>
                  </div>
                ) : null}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Users;
