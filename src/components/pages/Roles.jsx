import React from "react";
import { useEffect, useState, useMemo } from "react";
import { MdDelete } from "react-icons/md";
import Layout from "../Layout";


import {
  addRoles,
  editRoles,
  getAllRoles,
  deleteRoles,
} from "../../services/api";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../Loader";
import TitleCase from "../../components/Title"

let PageSize = 10;

function Roles({ buttonText, popupContent }) {
  const [showPopup, setShowPopup] = useState(false);
  const [rolesList, setRolesList] = useState([]);
  const navigate = useNavigate();

  const [sitesList, setSitesList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState({});
  const [rolesData, setRolesData] = useState({
    name: "",
    abbrevation: "",
    address: "",
  });
  const [errors, setErrors] = useState({});
  const [isApiError, setIsApiError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [popupHeaderName, setPopUpHeaderName] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [submissionModal, setSubmissionModal] = useState(false);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    console.log("current Page : ", currentPage);
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    fetchAllRoles();
  }, [currentPage]);

  const fetchAllRoles = async () => {
    setRolesList([]);
    setLoader(true);
    const response = await getAllRoles();
    console.log(response?.data);
    if (response?.data?.success) {
      setLoader(false);
      setRolesList(response?.data?.data?.roles);
      console.log(rolesList);
    } else {
      setRolesList([]);
      setLoader(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (rolesData.name == null || rolesData.name == "") {
      setErrors({ ...errors, [name]: "" });
    }
    setRolesData({ ...rolesData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(rolesData).length > 0) {
      Object.keys(rolesData).map((item, index) => {
        if (item != "created_at" && item != "updated_at") {
          if (rolesData?.[item] == null || rolesData?.[item] == "") {
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
      ? await editRoles(rolesData, rolesData?.id)
      : await addRoles(rolesData);
    console.log(response);
    if (response?.data?.success) {
      console.log(response);
      // setloginData(response?.data?.data);
      fetchAllRoles();
      setRolesData({});
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

  const deleteSelectedSite = async () => {
    setLoader(true);
    const response = await deleteRoles(rolesData?.id);
    console.log(response);
    if (response?.data?.success) {
      console.log(response);
      // setloginData(response?.data?.data);
      fetchAllRoles();
      setRolesData({});
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
    setPopUpHeaderName("Add New Role");
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
            <div class="text-2xl font-bold text-gray-800 mb-4 mt-2">Roles</div>
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
                                      placeholder="Enter Role Name"
                                      onChange={(e) => {
                                        handleChange(e);
                                      }}
                                      value={rolesData.name}
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
            </div>
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg lg:mt-[1%] xl:w-[80]">
              
              <div class="relative overflow-auto shadow-md sm:rounded-lg lg:mt-[1%] xl:w-[80]">
                {rolesList?.length > 0 ? (
                <div>
                    <table class="w-full text-sm font-[500] text-left rtl:text-right text-gray-900 dark:text-gray-400">
                    <thead class="text-xs text-gray-600 border-b-2 border-[#b2b2b2] uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th scope="col" class="px-6 py-3">
                            Name
                          </th>
                          <th scope="col" class="px-6 py-3">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {rolesList.length > 0
                          ? Object.values(rolesList)?.map((item, index) => (
                              <tr
                                key={index}
                                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                              >
                                <td class="px-6 py-4"><TitleCase text={item?.name}/></td>
                                <td class="px-6 py-4 flex gap-3">
                                  <a
                                    onClick={() => {
                                      setRolesData(item);
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
                                      setRolesData(item);
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
                </div>
                ) : null}
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Roles;
