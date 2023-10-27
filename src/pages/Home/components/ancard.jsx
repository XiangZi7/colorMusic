import {Button, Image, ScrollShadow, Spinner} from "@nextui-org/react";
import {httpGet} from "@/utils/http.js";
import {formatTimes} from "@/utils/FormatTime.jsx";

import {useEffect, useState} from "react"
import {addSongs, setPlaying} from '@/stores/modules/playerStore.jsx'
import {useDispatch} from "react-redux";

export default function App() {

    const [song, setSong] = useState([])
    const dispatch = useDispatch();


    useEffect(() => {
        httpGet('/playlist/track/all?id=86596672&limit=30&offset=1').then((data) => {
            setSong(data.songs)
        });
    }, [])

    // 播放音乐
    function playMusic(item) {
        httpGet(`/song/url/v1?id=${item.id}&level=exhigh`).then(({data}) => {
            const names = item.ar.map(subItem => subItem.name).join(',');
            let songs = [{
                title: item.name,
                singer: names,
                cover: item.al.picUrl,
                src: data[0].url,
                time: item.dt,
                album: item.al.name,
                id: item.id,
                mv: item.mv,
                Lyric: item.id
            }]
            dispatch(addSongs(songs))
            dispatch(setPlaying(true));
        })
    }

    return (
        <>
            <div className="flex flex-col mr-10">
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
                    className="app-card-bf flex flex-col rounded-bl-2xl rounded-br-2xl  z-0  backdrop-blur-lg">
                    <ScrollShadow className="h-[400px]" hideScrollBar>
                        {song.length > 0 ? song.map((item, idx) => (
                            <div className="flex py-2 hover:bg-[--theme-bg-color] px-2 rounded-xl" key={idx}
                                 onDoubleClick={() => playMusic(item)}>
                                <span className="mr-3 text-xs w-3 text-white">{idx + 1}</span>
                                <div className="grid grid-cols-5 gap-3 w-full">

                                    <div className="flex items-center col-span-2 text-white text-sm">
                                        <div className="mr-3">
                                            <Image
                                                width={28}
                                                radius="none"
                                                alt="NextUI Fruit Image with Zoom"
                                                className="cursor-pointer rounded"
                                                src={item.al.picUrl + "?param=28y28"}
                                            />
                                        </div>
                                        {item.name}</div>
                                    <div
                                        className="col-span-2 text-white text-sm ">{item.ar.map((item2) => item2.name).join(" / ")}</div>
                                    <div className="text-white text-sm text-end">{formatTimes(item.dt)}</div>
                                </div>
                            </div>
                        )) : <Spinner className="flex items-center justify-center h-full" size="md"/>}
                    </ScrollShadow>
                </div>
            </div>
        </>
    )
}