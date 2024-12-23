import { Link, NavLink } from "react-router-dom";
import { Key } from "lucide-react";
import { SiStudyverse } from "react-icons/si";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const isHome = location.pathname === "/";
    const handleLogout = () => {
        logOut()
            .then(() => { })
            .catch(err => console.log(err));
    };

    const activeClassName = "font-semibold text-primary border-b-2 border-primary transition-all duration-300 hover:text-primary-dark hover:border-primary-dark";

    const inactiveClassName = "font-medium text-gray-600 border-b-2 border-transparent transition-all duration-300 hover:text-primary hover:border-primary";

    const links = (
        <>
            <li className="py-2">
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        `px-3 py-2 relative group ${isActive ? activeClassName : inactiveClassName}`
                    }
                >
                    Home
                    <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out w-11/12 mx-auto" />
                </NavLink>
            </li>
            <li className="py-2">
                <NavLink
                    to="/assignments"
                    className={({ isActive }) =>
                        `px-3 py-2 relative group ${isActive ? activeClassName : inactiveClassName}`
                    }
                >
                    Assignments
                    <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out w-11/12 mx-auto" />
                </NavLink>
            </li>
            <li className="py-2">
                <NavLink
                    to="/pendingAssignment"
                    className={({ isActive }) =>
                        `px-3 py-2 relative group ${isActive ? activeClassName : inactiveClassName}`
                    }
                >
                    Pending Assignments
                    <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out w-11/12 mx-auto" />
                </NavLink>
            </li>
        </>
    );

    return (
        <nav className={isHome ? "bg-gray-100" : undefined}>
            <div className="navbar  md:w-11/12 mx-auto">
                {/* Navbar Start */}
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow">
                            {links}
                        </ul>
                    </div>
                    <Link to="/" className="btn btn-ghost text-3xl items-center headerfont">
                        <SiStudyverse size={24} className="text-primary bg-gradient-to-r inline-flex mr-1 from-primary/15 to-secondary rounded-md px-0" />
                       <div>
                       <span className="inline">Study</span>
                       <span className="headerfont2 text-primary inline ml-0">Collab</span>
                       </div>
                    </Link>



                </div>

                {/* Navbar Center */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-2">
                        {links}
                    </ul>
                </div>

                {/* Navbar End */}
                <div className="navbar-end">
                    {!user ? (
                        <NavLink to="/auth/login" className="btn btn-sm bg-secondary rounded-3xl">
                            <Key size={16} className="text-primary " />  Login
                        </NavLink>
                    ) : (
                        <div className="dropdown dropdown-end">
                            <label
                                tabIndex={0}
                                className="btn btn-ghost btn-circle avatar tooltip tooltip-left "
                                data-tip={user?.displayName || "User"}
                                role="button"
                            >
                                <div className="w-10 rounded-full">
                                    <img
                                        src={user?.photoURL?.split("?")[0] || "https://via.placeholder.com/150"}
                                        alt="User Avatar"
                                    />
                                </div>
                            </label>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow">
                                <li>
                                    <NavLink
                                        to="/create"
                                        className={({ isActive }) => (isActive ? activeClassName : undefined)}>
                                        Create Assignments
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/mySubmission"
                                        className={({ isActive }) => (isActive ? activeClassName : undefined)}>
                                        My Submissions
                                    </NavLink>
                                </li>
                                <li>
                                    <button className="btn btn-link bg-secondary" onClick={handleLogout}>
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
