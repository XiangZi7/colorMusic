import CnavBar from './components/navbar.jsx'
import Router from "@/routes/index";

export default function LayoutIndex() {
    return (
        <div className="colormusic">
            <div className="HeaderBar">
                <CnavBar/>
            </div>
            <div className="MenuBar">

            </div>
            <div className="AppMain">
                <Router/>
            </div>
        </div>
    )
}