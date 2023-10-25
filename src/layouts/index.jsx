import CnavBar from './components/navbar.jsx'
import Sidebar from './components/sidebar.jsx'
import Router from "@/routes/index";
import Mp from '@/components/mp'
import './index.scss'

// 共享音乐播放器的状态
import MusicPlayerContext from '@/utils/PlayerContext'
import useMusicPlayer from '@/utils/usePlayerMusic.jsx'

export default function LayoutIndex() {
    const musicPlayer = useMusicPlayer('http://music.163.com/song/media/outer/url?id=27591651.mp3');
    return (
        <MusicPlayerContext.Provider value={musicPlayer}>
            <div className="video-bg">
                <video width="320" height="240" autoPlay loop muted>
                    <source src="https://assets.codepen.io/3364143/7btrrd.mp4" type="video/mp4"/>
                </video>
            </div>
            <div className="HeaderBar">
                <CnavBar/>
            </div>
            <div className="app-content flex">
                <div className="app-sidebar flex px-4 py-8 flex-col items-center">
                    <Sidebar/>
                </div>
                <div className="AppMain flex-1 px-5 py-5 bg-[#10121B66] rounded-2xl backdrop-blur shadow-lg mr-3">
                    <Router/>
                </div>
            </div>
            <Mp></Mp>
            <div className="w-full h-[50px]"></div>
        </MusicPlayerContext.Provider>
    )
}