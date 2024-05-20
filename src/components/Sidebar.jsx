import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import { BiHome } from "react-icons/bi";
import { RiCommunityLine } from "react-icons/ri";
import { HiOutlineUsers } from "react-icons/hi2";
import { MdOutlineBloodtype,MdOutlinePriceChange } from "react-icons/md";
import { BiUser } from "react-icons/bi";
import { RiCustomerService2Line } from "react-icons/ri";
import { BsFuelPump } from "react-icons/bs";
import { GiFuelTank } from "react-icons/gi";
import { MdAssignmentTurnedIn } from "react-icons/md";
import { RiLogoutBoxLine } from "react-icons/ri";
import { RiGasStationFill } from "react-icons/ri";
import { CgTrack } from "react-icons/cg";
import PMSimg from "../Photos/techdarshak2.png"
import "./Sidebar.css";

function Sidebar() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { logout } = useContext(AuthContext);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const closeSideBar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className={`flex ${isSidebarOpen && "lg:w-1/6"}`}>
      <nav class=" absolute top-0 z-50 w-full bg-[#043757] border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div class="px-3 py-3 lg:px-5 lg:pl-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center justify-start rtl:justify-end">
              <button
                onClick={toggleSidebar}
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                <svg
                  class="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clip-rule="evenodd"
                    fill-rule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>
              <a class="flex ms-2 md:me-24 gap-2">
                <img src={PMSimg} style={{height:"40px"}}/>
                <span class="self-center text-base font-semibold lg:text-xl whitespace-nowrap text-white">
                  PMS
                </span>
              </a>
            </div>
            <div class="flex items-center">
              <div class="flex items-center ms-3">
                <div>
                  <button
                    type="button"
                    class="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                    aria-expanded="false"
                    data-dropdown-toggle="dropdown-user"
                  >
                    <span class="sr-only">Open user menu</span>
                    <img
                      class="w-8 h-8 rounded-full"
                      src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                      alt="user photo"
                    ></img>
                  </button>
                </div>
                <div
                  class="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
                  id="dropdown-user"
                >
                  <div class="px-4 py-3" role="none">
                    <p
                      class="text-sm text-gray-900 dark:text-white"
                      role="none"
                    >
                      Neil Sims
                    </p>
                    <p
                      class="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
                      role="none"
                    >
                      neil.sims@flowbite.com
                    </p>
                  </div>
                  <ul class="py-1" role="none">
                    <li>
                      <a
                        href="#"
                        class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        role="menuitem"
                      >
                        Dashboard
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        role="menuitem"
                      >
                        Settings
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        role="menuitem"
                      >
                        Earnings
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        role="menuitem"
                      >
                        Sign out
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div
        onMouseEnter={toggleSidebar}
        className=" h-screen w-16 flex-col justify-between border-e bg-slate-200 hidden sm:block"
      >
        <div>
          <div
            // onMouseOver={()=>setSidebarOpen(false)}
            className="inline-flex h-16 w-16 items-center justify-center absolute"
          >
            <span className=" h-10 w-10 place-content-center rounded-lg bg-gray-100 text-xs text-gray-600">
              P
            </span>
          </div>

          <div className="border-t border-gray-100 hidden sm:block">
            <div className="px-2">
              <div className="py-4">
                <a
                  href=""
                  className="t group relative flex justify-center rounded bg-blue-50 px-2 py-1.5 text-blue-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 opacity-75"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>

                  <span className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible">
                    Home
                  </span>
                </a>
              </div>

              <ul className="space-y-1 border-t border-gray-100 pt-4">
                <li>
                  <a
                    href=""
                    className="group relative flex justify-center rounded px-2 py-1.5 text-gray-800 hover:bg-gray-50 hover:text-gray-700"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 opacity-75"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </a>
                </li>

                <li>
                  <a
                    href=""
                    className="group relative flex justify-center rounded px-2 py-1.5 text-gray-800 hover:bg-gray-50 hover:text-gray-700"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 opacity-75"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                      />
                    </svg>

                    <span className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible">
                      Petrol Pump
                    </span>
                  </a>
                </li>

                <li>
                  <a
                    href=""
                    className="group relative flex justify-center rounded px-2 py-1.5 text-gray-800 hover:bg-gray-50 hover:text-gray-700"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 opacity-75"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>

                    <span className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible ">
                      Account
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div
          className="sticky inset-x-0 bottom-0 border-t border-gray-100 bg-white p-2 mb-0"
          style={{ marginTop: "70vh" }}
        >
          <form action="/logout">
            <button
              onClick={logout}
              type="submit"
              className="group relative flex w-full justify-center rounded-lg px-2 py-1.5 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 opacity-75"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>

              <span className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible">
                Logout
              </span>
            </button>
          </form>
        </div>
      </div>

      <div
        onMouseLeave={closeSideBar}
        className={`sidebar ${isSidebarOpen ? '' : 'closed'}`}
        style={{
          maxWidth: isSidebarOpen ? "100%" : "0",
          overflow: "hidden",
          transition: "max-width 0.2s ease-in-out",
        }}
      >
        <div className="px-4 py-6 ">
          <ul className="mt-14 space-y-1">
            <Link
              to="./home"
              href=""
              className="flex gap-2 justify-start rounded-lg w-36 pl-2 py-2 text-sm font-[600] text-gray-600 hover:text-white hover:bg-[#00aed1]"
            >
              <BiHome size={20} />
              <li className="flex align-text-bottom">Home</li>
            </Link>
            <div class=" bg-gray-400 h-[1px]"></div>

            <li>
              <Link
                to="/unit"
                href=""
                className="flex gap-2 justify-start rounded-lg w-36 pl-2 py-2 text-sm font-[600] text-gray-600 hover:text-white hover:bg-[#00aed1]"
              >
                <RiCommunityLine size={20} />

                <li className="flex align-text-bottom">Unit</li>
              </Link>
            </li>

            <li>
              <Link
                to="/petrol-pump"
                href=""
                className="flex gap-2 justify-start rounded-lg w-36 pl-2 py-2 text-sm font-[600] text-gray-600 hover:text-white hover:bg-[#00aed1]"
              >
                <BsFuelPump size={20} />
                <li className="flex align-text-bottom">Petrol pump</li>
              </Link>
            </li>

            <li>
              <Link
                to="/roles"
                href=""
                className="flex gap-2 justify-start rounded-lg w-36 pl-2 py-2 text-sm font-[600] text-gray-600 hover:text-white hover:bg-[#00aed1]"
              >
                <BiUser size={20} />
                <li className="flex align-text-bottom">Roles</li>
              </Link>
            </li>

            <li>
              <Link
                to="/fuel-type"
                href=""
                className="flex gap-2 justify-start rounded-lg w-36 pl-2 py-2 text-sm font-[600] text-gray-600 hover:text-white hover:bg-[#00aed1]"
              >
                <MdOutlineBloodtype size={20} />
                <li className="flex align-text-bottom">Fuel Type</li>
              </Link>
            </li>

            <li>
              <Link
                to="/users"
                href=""
                className="flex gap-2 justify-start rounded-lg w-36 pl-2 py-2 text-sm font-[600] text-gray-600 hover:text-white hover:bg-[#00aed1]"
              >
                <HiOutlineUsers size={20} />
                <li className="flex align-text-bottom">Users</li>
              </Link>
            </li>

            <li>
              <Link
                to="/customers"
                href=""
                className="flex gap-2 justify-start rounded-lg w-36 pl-2 py-2 text-sm font-[600] text-gray-600 hover:text-white hover:bg-[#00aed1]"
              >
                <RiCustomerService2Line size={20} />
                <li className="flex align-text-bottom">Customers</li>
              </Link>
            </li>

            <li>
              <Link
                to="/tank-storage"
                href=""
                className="flex gap-2 justify-start rounded-lg w-36 pl-2 py-2 text-sm font-[600] text-gray-600 hover:text-white hover:bg-[#00aed1]"
              >
                <GiFuelTank size={20} />
                <li className="flex align-text-bottom">Tank Storage</li>
              </Link>
            </li>

            <li>
              <Link
                to="/daily-fuel-rate"
                href=""
                className="flex gap-2 justify-start rounded-lg w-36 pl-2 py-2 text-sm font-[600] text-gray-600 hover:text-white hover:bg-[#00aed1]"
              >
                <MdOutlinePriceChange size={20} />
                <li className="flex align-text-bottom">Daily Fuel Rate</li>
              </Link>
            </li>

            <li>
              <Link
                to="/fuel-tracker"
                href=""
                className="flex gap-2 justify-start rounded-lg w-36 pl-2 py-2 text-sm font-[600] text-gray-600 hover:text-white hover:bg-[#00aed1]"
              >
                <CgTrack size={20} />
                <li className="flex align-text-bottom">Fuel Tracker</li>
              </Link>
            </li>
            <li>
              <Link
                to="/nozzel-log"
                href=""
                className="flex gap-2 justify-start rounded-lg w-36 pl-2 py-2 text-sm font-[600] text-gray-600 hover:text-white hover:bg-[#00aed1]"
              >
                <MdAssignmentTurnedIn size={20} />
                <li className="flex align-text-bottom">Nozzel Log</li>
              </Link>
            </li>

            <li>
              <div class="my-2 bg-gray-400 h-[0.5px]"></div>

              <details className="group [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-1 font-[500] text-gray-600 hover:text-white hover:font-[600] hover:bg-[#00aed1] ">
                  <span> Account </span>

                  <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </span>
                </summary>

                <ul className="mt-2 space-y-1 px-4">
                  {/* 

                  <li>
                    <a
                      href=""
                      className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:text-white hover:bg-[#00aed1]"
                    >
                      Security
                    </a>
                  </li> */}

                  <li>
                    <form action="/logout">
                      <button
                        onClick={logout}
                        type="submit"
                        className="flex gap-2 justify-start rounded-lg w-36 pl-2 py-2 text-sm font-[600] text-gray-600 hover:text-white hover:bg-[#00aed1]"
                      >
                        <RiLogoutBoxLine size={20} />
                        Logout
                      </button>
                    </form>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
