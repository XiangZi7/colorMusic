import {Button} from "@nextui-org/react";
import {NextIcon} from "@/components/min-Player/NextIcon.jsx";
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'

export default function sidebar() {

    // 根据路由表生成对应的路由规则
    const [items] = useState([
        {path: '/home', icon: <NextIcon/>},
        {path: '/friend', icon: <NextIcon/>},
        {path: '/test', icon: <NextIcon/>},
    ]);
    const [isactive, setIsactive] = useState(0)

    const Navigate = useNavigate()

    function toPath(path, idx) {
        setIsactive(idx)
        Navigate(path)
    }

    return (
        <>
            {items.map((item, idx) => (
                <Button
                    key={item.path}
                    isIconOnly
                    className={`data-[hover]:bg-[#c3cff4] data-[hover]:text-[#fff] transition my-2  ${isactive == idx ? 'bg-[#1f1c2e] data-[hover]:bg-[#1f1c2e]  text-white' : ''}`}
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