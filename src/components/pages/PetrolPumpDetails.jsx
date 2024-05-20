import React, { useEffect, useState, useMemo } from "react";
import { MdDelete } from "react-icons/md";
import Layout from "../Layout";

import {
  addNewNozzel,
  deleteNozzel,
  editNozzel,
  getAllNozzels,
  getAllPetrolPumps,
  assignUserToNozzel,
  getAllUsers,
} from "../../services/api";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

let PageSize = 10;

function PetrolPumpDetails({ buttonText, popupContent }) {
  const { id } = useParams();
  const [showPopup, setShowPopup] = useState(false);
  const [petrolPumpList, setPetrolPumpList] = useState([]);
  const navigate = useNavigate();

  const [sitesList, setSitesList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState({});
  const [petrolPumpData, setPetrolPumpData] = useState({
    petrol_pump_id: id,
  });
  const [assignData, setAssignData] = useState({
    petrol_pump_id: id,
  });
  const [errors, setErrors] = useState({});
  const [isApiError, setIsApiError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [popupHeaderName, setPopUpHeaderName] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [submissionModal, setSubmissionModal] = useState(false);
  const [nozzelList, setNozzelList] = useState([]);
  const [singlePumpData, setSinglePumpData] = useState({});
  const [showAssignPopup, setShowAssignPopup] = useState(false);
  const [userOptions, setUsersOptions] = useState([]);

  useEffect(() => {
    console.log("current Page : ", currentPage);
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    fetchAllPetrolPump();
    fetchNozzels();
    fetchAllUsers();
  }, [currentPage]);

  const fetchAllPetrolPump = async () => {
    setSinglePumpData([]);
    // setLoader(true);
    let params = {
      id: id,
    };
    const response = await getAllPetrolPumps(params);
    if (response?.data?.success) {
      console.log(response);
      setSinglePumpData(response?.data?.data?.petrolPumps[0]);
    } else {
      setSinglePumpData({});
      if (
        response?.response?.status == 403 ||
        response?.response?.status == 401
      ) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  const fetchNozzels = async () => {
    setNozzelList([]);
    // setLoader(true);
    let params = {
      limit: PageSize,
      pageNo: currentPage,
      petrol_pump_id: id,
    };
    const response = await getAllNozzels(params);
    if (response?.data?.success) {
      console.log(response);
      setNozzelList(response?.data?.data?.nozzels);
    } else {
      setNozzelList([]);
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
    if (petrolPumpData.name == null || petrolPumpData.name == "") {
      setErrors({ ...errors, [name]: "" });
    }
    setPetrolPumpData({ ...petrolPumpData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(petrolPumpData).length > 0) {
      Object.keys(petrolPumpData).map((item, index) => {
        if (item != "created_at" && item != "updated_at") {
          if (petrolPumpData?.[item] == null || petrolPumpData?.[item] == "") {
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
    const response = isEdit
      ? await editNozzel(petrolPumpData, petrolPumpData?.id)
      : await addNewNozzel(petrolPumpData);
    console.log(response);
    if (response?.data?.success) {
      console.log(response);
      // setloginData(response?.data?.data);
      fetchNozzels();
      setPetrolPumpData({});
      setShowPopup(false);
    } else {
      setIsApiError(true);
      setErrorMsg(response?.response?.data?.message);
      // console.log(response?.response?.data?.message)
    }
  };

  const deleteSelectedSite = async () => {
    const response = await deleteNozzel(petrolPumpData?.id);
    console.log(response);
    if (response?.data?.success) {
      console.log(response);
      // setloginData(response?.data?.data);
      fetchNozzels();
      setPetrolPumpData({});
      setSubmissionModal(false);
    } else {
      setIsApiError(true);
      setErrorMsg(response?.response?.data?.message);

      // console.log(response?.response?.data?.message)
    }
  };

  const togglePopup = () => {
    setPopUpHeaderName("Add New Nozzel");
    setShowPopup(!showPopup);
    setIsEdit(false);
    setPetrolPumpData({
      petrol_pump_id: id,
    });
  };

  const assigntogglePopup = (nozzelData = {}) => {
    console.log('187')
    setPopUpHeaderName("Assign User to Nozzel");
    setShowAssignPopup(!showAssignPopup);
    setAssignData({
      petrol_pump_id: id,
      nozzle_id: nozzelData?.id
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
      ? await editNozzel(assignData, assignData?.id)
      : await assignUserToNozzel(assignData);
    console.log(response);
    if (response?.data?.success) {
      console.log(response);
      // setloginData(response?.data?.data);
      fetchNozzels();
      setAssignData({});
      setShowAssignPopup(false);
    } else {
      setIsApiError(true);
      setErrorMsg(response?.response?.data?.message);
      // console.log(response?.response?.data?.message)
    }
  };

  const fetchAllUsers = async () => {
    setUsersOptions([]);
    // setLoader(true);
    let params = {
      limit: PageSize,
      pageNo: currentPage,
    };
    const response = await getAllUsers(params);
    if (response?.data?.success) {
      setUsersOptions(response?.data?.data?.users);
    } else {
      setUsersOptions([]);
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
      <div className="mt-4" style={{ marginTop: "4rem", marginBottom: "2rem" }}>
        <div
          className="flex justify-end mt-2 "
          style={{ marginBottom: "0.5rem" }}
        >
          <button
            onClick={togglePopup}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded hidden"
          >
            +ADD
          </button>
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
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-[#0265cf] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
                            <input type="hidden" name="remember" value="true" />
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
                                  placeholder="Enter Name"
                                  onChange={(e) => {
                                    handleChange(e);
                                  }}
                                  value={petrolPumpData.name}
                                />
                              </div>
                              <div>
                                <label htmlFor="password" className="sr-only">
                                  Nozzel Number
                                </label>
                                <input
                                  id="abbrevation"
                                  name="nozzel_no"
                                  type="text"
                                  required
                                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                  placeholder="Enter Nozzel No."
                                  onChange={(e) => {
                                    handleChange(e);
                                  }}
                                  value={petrolPumpData.nozzel_no}
                                />
                              </div>
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
                            onSubmit={assignhandleSubmit}
                          >
                            <input type="hidden" name="remember" value="true" />
                            <div className="rounded-md shadow-sm  space-y-4">
                              <div>
                                <label htmlFor="email" className="sr-only">
                                  Select User
                                </label>
                                <select
                                  id="user_id"
                                  className=" border textbox text-sm rounded-lg relative block w-full px-3 py-2 focus:z-10 sm:text-sm border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 "
                                  placeholder="Please Select User"
                                  name="user_id"
                                  onChange={(e) => {
                                    handleAssignChange(e);
                                  }}
                                  value={assignData?.user_id}
                                >
                                  {errors.user_id && (
                                    <p className="error-text">
                                      {errors.user_id}
                                    </p>
                                  )}
                                  <option value="">Please Select User</option>
                                  {userOptions ? (
                                    Object.values(userOptions)?.map(
                                      (item, index) => (
                                        <option key={index} value={item?.id}>
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
                                    handleAssignChange(e);
                                  }}
                                  value={assignData.starting_reading}
                                />
                              </div>
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
        <div class="relative overflow-x-auto shadow-md rounded-lg lg:mt-[1%] xl:w-[80]">
          <div class="flex flex-row justify-between p-5">
            <div className="shadow-md rounded-lg p-2 bg-blue-400" style={{width:"50%", marginRight:"1rem"}}>
              
                <div className="block text-center items-center mb-2"><strong>Petrol Pump Name</strong></div>
                {/* <div className="mb-2 mt-2"><hr></hr></div> */}
                <div className="block text-center items-center text-white mt-2 mb-2">{singlePumpData?.name}</div>
              
            </div>
            
            <div className="shadow-md rounded-lg p-2 bg-blue-400" style={{width:"50%", marginLeft:"1rem"}}>
              
                <div class="block text-center items-center mb-2"><strong>Petrol Pump Address</strong></div>
                {/* <div className="mb-2 mt-2"><hr></hr></div> */}
                <div class="block text-center items-center text-white mt-2 mb-2">{singlePumpData?.address}</div>
              
            </div>
          </div>
        </div>
        <div className="flex align-middle justify-between lg:pr-[2%] mt-2">
          <h1 className="xl:mt-4 mt-3 xl:text-2xl text-xl font-bold text-gray-800">Nozzel List</h1>
          <button
            onClick={togglePopup}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-2 rounded"
          >
            +ADD Nozzel
          </button>
        </div>
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg lg:mt-[1%] xl:w-[80]">
          {nozzelList?.length > 0 ? (
            <table class="w-full text-sm font-[500] text-left rtl:text-right text-gray-900 dark:text-gray-400">
              <thead class="text-xs text-gray-600 border-b-2 border-[#b2b2b2] uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Nozzel No.
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {nozzelList.length > 0
                  ? Object.values(nozzelList)?.map((item, index) => (
                      <tr
                        key={index}
                        class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                      >
                        <td class="px-6 py-4">{item?.name}</td>
                        <td class="px-6 py-4">{item?.nozzel_no}</td>
                        <td class="px-6 py-4 flex gap-3">
                          <a
                            onClick={() => {
                              assigntogglePopup(item)
                              setErrors({});
                            }}
                            // onClick={() => {
                            //   setAssignData(item);
                            //   setShowAssignPopup(true);
                            //   setSelectedCategory(item);
                            //   setPopUpHeaderName("Assign User To Nozzel");
                            //   setErrors({});
                            //   setIsEdit(false);
                            // }}
                            href="#"
                            className="font-medium text- [#814f68]-600  hover:underline pointer"
                          >
                            Assign
                          </a>
                          <a
                            onClick={() => {
                              setPetrolPumpData(item);
                              setShowPopup(true);
                              setSelectedCategory(item);
                              setPopUpHeaderName("Edit Petrol Pump");
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
                              setPetrolPumpData(item);
                              setSelectedCategory(item);
                              setSubmissionModal(true);
                              setErrors({});
                            }}
                            href="#"
                            class="font-medium text-red-600 dark:text-blue-500 hover:underline"
                          >
                            Delete
                          </a>
                        </td>
                      </tr>
                    ))
                  : null}
              </tbody>
            </table>
          ) : null}
        </div>
      </div>
    </Layout>
  );
}

export default PetrolPumpDetails;
