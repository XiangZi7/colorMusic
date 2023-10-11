import {Button} from '@nextui-org/react';
import MinPlayer from '@/components/min-Player/min-Player.jsx'
import {useTheme} from "next-themes";

export default function index() {
    const {theme, setTheme} = useTheme();
    return (
        <div className="flex flex-col justify-center">
            <div
                className="flex relative w-full h-auto bg-gradient-to-tr from-[#FFB457] to-[#FF705B] rounded-2xl items-center justify-center py-14 px-4 lg:px-8">
                <MinPlayer/>
                <Button onClick={() => setTheme(theme == 'light' ? 'dark' : 'light')}>
                    {theme == 'light' ? '暗黑' : '取消暗黑'}
                </Button>
            </div>
        </div>
    )
}