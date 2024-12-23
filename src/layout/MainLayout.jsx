import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = () => {
    return (
        <div>
            <Navbar/>
            <section className="space-y-10">
            <Outlet/>

            </section>
            <footer className="mt-20">
            <Footer/>
            </footer>
        </div>

    );
};

export default MainLayout;