import { Link, NavLink } from "react-router-dom";
import { Key } from "lucide-react";
import { SiStudyverse } from "react-icons/si";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);

    const handleLogout = () => {
        logOut()
            .then(() => { })
            .catch(err => console.log(err));
    };

    const activeClassName = "font-bold text-primary";

    const links = (
        <>
            <li>
                <NavLink to="/" className={({ isActive }) => (isActive ? activeClassName : undefined)}>
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink to="/assignments" className={({ isActive }) => (isActive ? activeClassName : undefined)}>
                    Assignments
                </NavLink>
            </li>
            <li>
                <NavLink to="/pendingassignments" className={({ isActive }) => (isActive ? activeClassName : undefined)}>
                    Pending Assignments
                </NavLink>
            </li>
        </>
    );

    return (
        <nav>
            <div className="navbar bg-base-100 w-11/12 mx-auto">
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
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            {links}
                        </ul>
                    </div>
                    <Link to="/" className="btn btn-ghost text-xl flex items-center gap-2">
                        <SiStudyverse size={24} className="text-primary bg-gradient-to-r from-primary/15 to-secondary rounded-md px-" /> StudyCollab
                    </Link>
                </div>

                {/* Navbar Center */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
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
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                                <li>
                                    <NavLink
                                        to="/create"
                                        className={({ isActive }) => (isActive ? activeClassName : undefined)}>
                                        Create Assignments
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/my-attempted"
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
