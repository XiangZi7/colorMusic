import React from "react";
import {Card, CardBody, Image, Button, ScrollShadow} from "@nextui-org/react";
import {HeartIcon} from "./HeartIcon";
import {PauseCircleIcon} from "./PauseCircleIcon";
import {NextIcon} from "./NextIcon";
import {PreviousIcon} from "./PreviousIcon";
import {RepeatOneIcon} from "./RepeatOneIcon";
import {ShuffleIcon} from "./ShuffleIcon";
import {PlayIcon} from "./PlayIcon.jsx"
import {useDispatch, useSelector} from "react-redux";
import {useState, useEffect, useRef} from 'react'
import {
    setPlaying,
    playNext,
    playPrevious,
    setLooping,
    setShuffling
} from "@/stores/modules/playerStore";
import message from '@/components/message/message.jsx';
import {formatTime} from "@/utils/FormatTime.jsx";
import './index.scss'
import Slider from "@/components/min-Player/slider.jsx";
import {get} from "@/utils/http.js";
import {createBilingualData} from "@/utils/parseLyrics.js";

export default function App() {
    // 播放器dom
    const audioRef = useRef(null);
    // 歌词滚动框
    const lyricRef = useRef(null);
    // 得到 Redux 中的数据
    const {
        songs,
        currentIndex,
        isPlaying,
        isLooping,
        isShuffling
    } = useSelector((state) => state.player);
    const dispatch = useDispatch();
    // 设置喜欢
    const [liked, setLiked] = React.useState(false);
    // 当前歌曲时长
    const [currentTime, setCurrentTime] = useState(0);
    // 当前歌曲总时长
    const [duration, setDuration] = useState(0);
    // 歌词
    const [lyricList, setLyricList] = useState([]);
    // 当前歌词
    const [currentLine, setCurrentLine] = useState(-1);
    // 监听播放状态
    useEffect(() => {
        if (isPlaying) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying]);

    // 修改音乐地址
    useEffect(() => {
        audioRef.current.src = songs[currentIndex].src;
        audioRef.current.play();
        dispatch(setPlaying(true))

        setLyricList([])
        get("/lyric", {id: songs[currentIndex].Lyric}).then((data) => {
            const bilingualData = createBilingualData(data.lrc.lyric, data.tlyric.lyric);
            setLyricList(bilingualData)
        })
    }, [currentIndex]);

    //   当前歌曲时间
    const handleTimeUpdate = () => {
        setCurrentTime(audioRef.current?.currentTime || 0);
        watchSongLine()
        const lineHeight = 48; // 每行歌词的高度
        const translateY = (currentLine - 4) * -lineHeight; // 将当前行的上两行作为起始位置
        lyricRef.current.style.transform = `translateY(${translateY}px)`;
    };
    // 当前歌曲总时间
    const handleLoadedData = () => {
        setDuration(audioRef.current?.duration || 0);
    };

    // 暂停\播放
    const handlePlayPauseClick = () => {
        dispatch(setPlaying(!isPlaying))
    };

    // 下一首
    const handleNextClick = () => {
        dispatch(playNext())
    };

    // 上一首
    const handlePrevClick = () => {
        dispatch(playPrevious())
    };

    // 循环播放
    const handleLoopClick = () => {
        message.success("循环播放", 3)
        dispatch(setLooping(!isLooping));
    };

    // 随机播放
    const handleShuffleClick = () => {
        message.success("随机播放", 3)
        dispatch(setShuffling(!isShuffling));
    };

    // 播放结束回调
    const handleEnded = () => {
        // 如果是循环
        if (isLooping) {
            audioRef.current.currentTime = 0;
            audioRef.current.play();
        } else {
            handleNextClick();
        }
    };
    // 监听歌词当前时长
    const watchSongLine = () => {
        // 歌词时间
        if (!lyricList) return;
        for (let i = 0; i < lyricList.length; i++) {
            if (
                i === lyricList.length - 1 ||
                currentTime < lyricList[i + 1].time
            ) {
                setCurrentLine(i);
                break;
            }
        }
    }

    // 滑块Change事件
    const SliderChange = (e) => {
        setCurrentTime(e);
        audioRef.current.currentTime = e;
    }

    return (
        <div>
            <Card
                isBlurred
                className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px]"
                shadow="sm"
            >
                <CardBody>
                    <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
                        <div className="relative col-span-6 md:col-span-4">
                            <Image
                                alt="Album cover"
                                className="object-cover"
                                height={200}
                                shadow="md"
                                src={songs[currentIndex].cover}
                                width="100%"
                            />
                        </div>

                        <div className="flex flex-col col-span-6 md:col-span-8">
                            <div className="flex justify-between items-start">
                                <div className="flex flex-col gap-0">
                                    <h3 className="font-semibold text-foreground/90">{songs[currentIndex].title}</h3>
                                    <p className="text-small text-foreground/80">{songs[currentIndex].album}</p>
                                    <h1 className="text-large font-medium mt-2">{songs[currentIndex].singer}</h1>
                                </div>
                                <Button
                                    isIconOnly
                                    className="text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2"
                                    radius="full"
                                    variant="light"
                                    onPress={() => setLiked((v) => !v)}
                                >
                                    <HeartIcon
                                        className={liked ? "[&>path]:stroke-transparent" : ""}
                                        fill={liked ? "currentColor" : "none"}
                                    />
                                </Button>
                            </div>

                            <div className="flex flex-col mt-3 gap-1">
                                <Slider min={0} max={duration} step={1} value={currentTime} onChange={SliderChange}/>
                                <div className="flex justify-between">
                                    <p className="text-small">{formatTime(currentTime)}</p> {/* 显示当前播放时间 */}
                                    <p className="text-small text-foreground/50">{formatTime(duration)}</p> {/* 显示歌曲时长 */}
                                </div>
                            </div>

                            <div className="flex w-full items-center justify-center">
                                <Button
                                    isIconOnly
                                    className="data-[hover]:bg-foreground/10"
                                    radius="full"
                                    variant="light"
                                    onClick={handleLoopClick}
                                >
                                    <RepeatOneIcon className="text-foreground/80"/>
                                </Button>
                                <Button
                                    isIconOnly
                                    className="data-[hover]:bg-foreground/10"
                                    radius="full"
                                    variant="light"
                                    onClick={handlePrevClick}
                                >
                                    <PreviousIcon/>
                                </Button>
                                <Button
                                    isIconOnly
                                    className="w-auto h-auto data-[hover]:bg-foreground/10"
                                    radius="full"
                                    variant="light"
                                    onClick={handlePlayPauseClick}
                                >
                                    {isPlaying ? <PauseCircleIcon size={54}/> : <PlayIcon size={54}/>}
                                </Button>
                                <Button
                                    isIconOnly
                                    className="data-[hover]:bg-foreground/10"
                                    radius="full"
                                    variant="light"
                                    onClick={handleNextClick}
                                >
                                    <NextIcon/>
                                </Button>
                                <Button
                                    isIconOnly
                                    className="data-[hover]:bg-foreground/10"
                                    radius="full"
                                    variant="light"
                                    onClick={handleShuffleClick}
                                >
                                    <ShuffleIcon className="text-foreground/80"/>
                                </Button>
                            </div>
                        </div>
                        <ScrollShadow hideScrollBar className="w-[570px] h-[400px] lyrics-container">
                            <ul ref={lyricRef} className="w-full">
                                {lyricList.map((item, idx) => (
                                    <li className={`text-sm text-center py-1 ${idx === currentLine ? 'active text-stone-950 text-sm text-base transition-all py-1.5' : 'text-stone-400'}`}
                                        key={item.time}
                                    >
                                        <p>{item.lrc}</p>
                                        <p>{item.tlyric}</p>
                                    </li>
                                ))}
                            </ul>
                        </ScrollShadow>
                    </div>
                </CardBody>
            </Card>
            <audio ref={audioRef}
                   onTimeUpdate={handleTimeUpdate}
                   onLoadedData={handleLoadedData}
                   onEnded={handleEnded}
            />
        </div>
    );
}
