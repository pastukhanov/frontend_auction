import Footer from "../component/Footer";
import Header from "../component/Header";
import { Outlet } from "react-router-dom";

// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';


const Layout = () => {
    return (
        <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-grow bg-gray-300 flex justify-center items-top">
            <Outlet />
        </div>
        {/* <ToastContainer/> */}
        <Footer />
        </div>
    );   
}

export default Layout;