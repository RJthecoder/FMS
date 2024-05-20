import React, { useEffect, useState, useMemo } from "react";
import Layout from "../Layout";
import "./Layout.css";
import {
  getAllUsers,
  getAllUsersSales,
} from "../../services/api";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { MdCurrencyRupee } from "react-icons/md";

let PageSize = 10;

function UsersInfo() {
    const { id } = useParams();
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();
    
    const [usersSalesList, setUsersSalesList] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
  
    const [usersData, setUsersData] = useState({
      users_id: id,
    });
    const [errors, setErrors] = useState({});
    const [isApiError, setIsApiError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    
    useEffect(() => {
      console.log("current Page : ", currentPage);
      const firstPageIndex = (currentPage - 1) * PageSize;
      const lastPageIndex = firstPageIndex + PageSize;
      fetchAllUsersSales();
    }, [currentPage]);
  
    const fetchAllUsersSales = async () => {
        setUsersSalesList([]);
      // setLoader(true);
      let params = {
        limit: PageSize,
        pageNo: currentPage,
        user_id: id,
      };
      const response = await getAllUsersSales(params);
      if (response?.data?.success) {
        console.log(response);
        setUsersSalesList(response?.data?.data?.users_sales);
      } else {
        setUsersSalesList({});
        if (
          response?.response?.status == 403 ||
          response?.response?.status == 401
        ) {
          localStorage.clear();
          navigate("/login");
        }
      }
    };
  

  
  
    return (
      <Layout>
        <div className="mt-4" style={{marginTop:"4rem", marginBottom:"2rem"}}>
          <div className="flex justify-end mt-2 " style={{marginBottom:"0.5rem"}}>
            
          </div>
          <div class="relative overflow-x-auto shadow-md sm:rounded-lg lg:mt-[1%] xl:w-[80] p-5">
            {usersSalesList?.length > 0 ? (
              <table class="w-full text-sm font-[500] text-left rtl:text-right text-gray-900 dark:text-gray-400">
              <thead class="text-xs text-gray-600 border-b-2 border-[#b2b2b2] uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" class="px-6 py-3">
                      Name
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Total Fuel Sales
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Total Sale Amount
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Date
                    </th>

                  </tr>
                </thead>
                <tbody>
                  {usersSalesList.length > 0
                    ? Object.values(usersSalesList)?.map((item, index) => (
                        <tr
                          key={index}
                          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                        >
                          <td class="px-6 py-4">{item?.user_details
                              ? item?.user_details?.name
                              : "-"}</td>
                          <td class="px-6 py-4">{item?.total_sale_fuel}</td>
                          <td class="px-6 py-4 flex"><MdCurrencyRupee size={15}/>{item?.total_sale_amount}</td>
                          <td class="px-6 py-4">{new Date(item.created_at).toLocaleString()}</td>
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

export default UsersInfo