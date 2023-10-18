import CnavBar from './components/navbar.jsx'
import Sidebar from './components/sidebar.jsx'
import Router from "@/routes/index";
import './index.scss'

export default function LayoutIndex() {
    return (
        <>
            <div className="HeaderBar">
                <CnavBar/>
            </div>
            <div className="app-content flex">
                <div className="app-sidebar flex px-4 py-8 flex-col items-center">
                    <Sidebar/>
                </div>
                <div className="AppMain flex-1">
                    <Router/>
                </div>
            </div>
        </>
    )
}