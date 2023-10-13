import React from "react";
import {Card, CardBody, Image, Button, Progress} from "@nextui-org/react";
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
    addSongs,
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

export default function App() {
// 播放器dom
    const audioRef = useRef(null);

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
    // 当前歌曲总时长
    const [currentTime, setCurrentTime] = useState(0);
    // 当前歌曲时长
    const [duration, setDuration] = useState(0);
    const [slider, setSlider] = useState(0)
    // useEffect(() => {
    //     dispatch(setCurrentIndex(songs.length - 1))
    // }, [currentIndex, songs]);

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
    }, [currentIndex]);

    //   歌曲时间
    const handleTimeUpdate = () => {
        setCurrentTime(audioRef.current?.currentTime || 0);
    };
    // 当前播放时间
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
        if (isLooping) {
            audioRef.current.currentTime = 0;
            audioRef.current.play();
        } else {
            handleNextClick();
        }
    };

    const addsong = () => {
        const song = [{
            id: "4098725024",
            title: 'NinelieAimerTest',
            singer: "AimerTest",
            album: "ninelie EPAimerTest",
            cover: "http://p3.music.126.net/g7aakYG_Wfmrn1_IDfVUXA==/109951165050166241.jpg",
            src: 'http://music.163.com/song/media/outer/url?id=409872504.mp3',
            time: 260675,
            mv: "",
            Lyric: ""
        }]
        dispatch(addSongs(song))
    }
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
                                {/*<Progress*/}
                                {/*    aria-label="Music progress"*/}
                                {/*    classNames={{*/}
                                {/*        indicator: "bg-default-800 dark:bg-white",*/}
                                {/*        track: "bg-default-500/30",*/}
                                {/*    }}*/}
                                {/*    color="default"*/}
                                {/*    size="sm"*/}
                                {/*    value={33}*/}
                                {/*/>*/}
                                <Slider value={currentTime} duration={duration}
                                        onSliderChange={SliderChange}></Slider>
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
                        <Button
                            className="text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2"
                            radius="full"
                            variant="light"
                            onClick={addsong}
                        >添加歌曲</Button>
                    </div>
                </CardBody>
            </Card>
            <audio ref={audioRef} onTimeUpdate={handleTimeUpdate}
                   onLoadedData={handleLoadedData} onEnded={handleEnded}/>
        </div>
    );
}
