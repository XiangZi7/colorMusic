import {Button} from "@nextui-org/react";
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {BsMusicPlayerFill,BsRobot} from 'react-icons/bs';
import {FaHome} from 'react-icons/fa';
import {BiMoviePlay,BiTestTube,BiRadio} from 'react-icons/bi';
import {LuListMusic} from 'react-icons/lu';
import {TbMovie} from 'react-icons/tb';
import {AiOutlineClear} from 'react-icons/ai';
import {setSideIdx} from '@/stores/modules/globalStore.js'
import {useDispatch, useSelector} from "react-redux";

export default function sidebar() {

    // 根据路由表生成对应的路由规则
    const [items] = useState([
        {path: '/home', icon: <FaHome className="text-2xl" />},
        {path: '/ml', icon: <LuListMusic className="text-2xl"/>},
        {path: '/radio', icon: <BiRadio className="text-2xl"/>},
        {path: '/movie', icon: <BiMoviePlay className="text-2xl"/>},
        {path: '/anim', icon: <TbMovie className="text-2xl"/>},
        {path: '/mini', icon: <BsMusicPlayerFill className="text-2xl"/>},
        {path: '/chat', icon: <BsRobot className="text-2xl"/>},
        {path: '/theme', icon: <AiOutlineClear className="text-2xl"/>},
        {path: '/test', icon: <BiTestTube className="text-2xl"/>},
    ]);
    const Navigate = useNavigate()
    const dispatch = useDispatch()
    // 得到 Redux 中的数据
    const {
        sideIdx
    } = useSelector((state) => state.global);

    function toPath(path, idx) {
        dispatch(setSideIdx(idx))
        Navigate(path)
    }

    return (
        <>
            {items.map((item, idx) => (
                <Button
                    key={item.path}
                    isIconOnly
                    className={`data-[hover]:bg-[#c3cff4] data-[hover]:text-[#fff] transition my-2  ${sideIdx == idx ? 'bg-[#1f1c2e] data-[hover]:bg-[#1f1c2e]  text-white' : ''}`}
                    radius="full"
                    variant="light"
                    onClick={() => toPath(item.path, idx)}
                >
                    {item.icon}
                </Button>
            ))}

        </>
    )
}