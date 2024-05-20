import React, { useEffect, useState } from "react";

import "./pagination.css";
import { FaAngleRight } from "react-icons/fa";

const Pagination = ({
  totalPosts,
  postsPerPage,
  setCurrentPage,
  currentPage,
}) => {
  let pages = [];
const [lastPage, setLastPage] = useState(null);

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pages.push(i);
  }

  useEffect (()=>{
    setLastPage(Math.ceil(totalPosts / postsPerPage))
  })

  return (
   <>
   {
    totalPosts > 0 ? (
      <div className="pagination">
      <button
        onClick={() => setCurrentPage(0)}
        className={currentPage == 0 ? 'deactive':'active'}
        style={{ textAlign: "center" }}
        disabled={currentPage == 0}
      >
        {"< <"}
      </button>
      <button
        onClick={() => setCurrentPage(currentPage - 1)}
        className={currentPage == 0 ? 'deactive':'active'}
        disabled={currentPage == 0}
        style={{ textAlign: "center" }}
      >
        {"<"}
      </button>
      {/* {pages.map((page, index) => {
        return ( */}
          <button
            className="active" style={{ cursor: 'text' }}
          >
            {currentPage+1}
          </button>
        {/* );
      })} */}
      <button
        onClick={() => setCurrentPage(currentPage + 1)}
        className={currentPage == lastPage-1 ? 'deactive':'active'}
        disabled={currentPage == lastPage-1}
        style={{ textAlign: "center" }}
      >
        {">"}
      </button>
      <button
        onClick={() => setCurrentPage(lastPage - 1)}
        className={currentPage == lastPage-1 ? 'deactive':'active'} 
        disabled={currentPage == lastPage-1}
        style={{ textAlign: "center" }}
      >
        {"> >"}
      </button>
    </div>
    ):(
     <>
     </>
    )
   }
   </>
  );
};

export default Pagination;
