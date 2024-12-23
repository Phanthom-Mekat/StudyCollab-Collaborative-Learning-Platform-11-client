import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = () => {
    return (
        <div className="bg-gray-100">
            <Navbar/>
            <section className="">
            <Outlet/>

            </section>
            <footer className="">
            <Footer/>
            </footer>
        </div>

    );
};

export default MainLayout;