import {Button, Image, ScrollShadow} from "@nextui-org/react";
import {HeartIcon} from "@/components/min-Player/HeartIcon.jsx";
import {TbMedal} from "react-icons/tb";
import {get} from "@/utils/http.js";
import {formatTime} from "@/utils/FormatTime.jsx";

import {useEffect,useState} from "react"

export default function App() {

    const [song,setSong] = useState([])

    useEffect(() => {
        get('/playlist/track/all?id=86596672&limit=10&offset=1').then((data) => {
            console.log(data)
            setSong(data.songs)
        });
    }, [])
    return (
        <>
            <div className="flex flex-col mr-10 ">
                <div
                    className="flex bg-gradient-to-r backdrop-blur-lg from-pink-500 via-purple-500 to-pink-400 rounded-tl-2xl rounded-tr-2xl po relative mt-20 px-2 py-2  h-[150px] items-center z-10">
                    <div className="w-[590px]"></div>
                    <div className="absolute top-[-130px] left-5 ">
                        <Image
                            width={550}
                            radius="none"
                            alt="NextUI Fruit Image with Zoom"
                            className="cursor-pointer "
                            src="src/static/danceMk.png"
                        />
                    </div>
                    <div className="flex flex-col max-w-[300px]  backdrop-blur-lg">
                        <div
                            className="flex items-center text-4xl font-bold text-transparent bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text">
                            Pop music
                        </div>
                    </div>
                </div>
                <div
                    className="bg-[#42002E] flex flex-col rounded-bl-2xl rounded-br-2xl px-4 py-2 z-0  backdrop-blur-lg">
                    <ScrollShadow className=" h-[400px]">
                        {song.map((item, idx) => (
                            <div className="flex py-2" key={idx}>
                                <span className="mr-3 text-xs bg-[#3D0128] w-3">{idx + 1}</span>
                                <div className="flex justify-between w-full">
                                    <div className="text-white text-sm">{item.name}</div>
                                    <div className="text-white text-sm">{formatTime(item.dt)}</div>
                                </div>
                            </div>
                        ))}
                    </ScrollShadow>

                </div>
            </div>
        </>
    )
}