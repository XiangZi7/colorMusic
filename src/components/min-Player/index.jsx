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
import {setCurrentIndex} from "@/stores/modules/playerStore.jsx";


export default function App() {
    const [liked, setLiked] = React.useState(false);
    // 得到 Redux 中的数据
    const {
        songs,
        currentIndex
    } = useSelector((state) => state.player);
    const dispatch = useDispatch();

    // 是否播放
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLooping, setIsLooping] = useState(false);
    const [isShuffling, setIsShuffling] = useState(false);
    // 播放器dom
    const audioRef = useRef(null);
    // 消息提醒
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
        setIsPlaying(true);
    }, [currentIndex]);

    // 暂停\播放
    const handlePlayPauseClick = () => {
        setIsPlaying(!isPlaying);
    };

    // 下一首
    const handleNextClick = () => {
        let currentIndexs = songs.findIndex(song => song.id === songs[currentIndex].id);
        if (isShuffling) {
            let randomIndex = Math.floor(Math.random() * songs.length);
            while (randomIndex === currentIndexs) {
                randomIndex = Math.floor(Math.random() * songs.length);
            }
            dispatch(setCurrentIndex(randomIndex))
        } else {
            if (currentIndex === songs.length - 1) {
                dispatch(setCurrentIndex(0))
            } else {
                dispatch(setCurrentIndex(currentIndex + 1))
            }
        }
    };

    // 上一首
    const handlePrevClick = () => {
        let currentIndexs = songs.findIndex(song => song.id === songs[currentIndex].id);
        if (isShuffling) {
            let randomIndex = Math.floor(Math.random() * songs.length);
            while (randomIndex === currentIndexs) {
                randomIndex = Math.floor(Math.random() * songs.length);
            }
            dispatch(setCurrentIndex(randomIndex));
        } else {
            if (currentIndexs === 0) {
                dispatch(setCurrentIndex(songs.length - 1));
            } else {
                dispatch(setCurrentIndex(currentIndex - 1));
            }
        }
    };

    const handleLoopClick = () => {
        MessageWrapper.addMessage('success', '循环播放');
        setIsLooping(!isLooping);
    };

    const handleShuffleClick = () => {
        setIsShuffling(!isShuffling);
    };

    const handleEnded = () => {
        if (isLooping) {
            audioRef.current.currentTime = 0;
            audioRef.current.play();
        } else {
            handleNextClick();
        }
    };

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
                                <Progress
                                    aria-label="Music progress"
                                    classNames={{
                                        indicator: "bg-default-800 dark:bg-white",
                                        track: "bg-default-500/30",
                                    }}
                                    color="default"
                                    size="sm"
                                    value={33}
                                />
                                <div className="flex justify-between">
                                    <p className="text-small">1:23</p>
                                    <p className="text-small text-foreground/50">4:32</p>
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
                                    {isPlaying ? <PlayIcon size={54}/> : <PauseCircleIcon size={54}/>}
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
                                >
                                    <ShuffleIcon className="text-foreground/80"/>
                                </Button>
                            </div>
                        </div>
                    </div>
                </CardBody>
            </Card>
            <audio ref={audioRef} onEnded={handleEnded}/>
        </div>
    );
}
