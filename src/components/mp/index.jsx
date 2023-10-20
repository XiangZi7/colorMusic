import Slider from "@/components/min-Player/slider.jsx";
import {formatTime} from "@/utils/FormatTime.jsx";
import {useState} from "react";

export default function App() {
    // 当前歌曲时长
    const [currentTime, setCurrentTime] = useState(0);
    // 当前歌曲总时长
    const [duration, setDuration] = useState(0);
    // 滑块Change事件
    const SliderChange = (e) => {
        setCurrentTime(e);
        audioRef.current.currentTime = e;
    }
    return (
        <div className="mp absolute bottom-0 left-0 h-[70px] w-full bg-[#10121B66] backdrop-blur flex">
            <img src="src/static/1.png" width={70} style={{height: '100%'}}/>
            <div className="flex flex-col ml-2">
                <span className="mb-2">我是标题</span>
                <span>我是歌手</span>
            </div>
            <div className="flex flex-col mt-3 gap-1">
                <Slider min={0} max={duration} step={1} value={currentTime} onChange={SliderChange}/>
                <div className="flex justify-between">
                    <p className="text-small">{formatTime(currentTime)}</p> {/* 显示当前播放时间 */}
                    <p className="text-small text-foreground/50">{formatTime(duration)}</p> {/* 显示歌曲时长 */}
                </div>
            </div>
        </div>
    )
}