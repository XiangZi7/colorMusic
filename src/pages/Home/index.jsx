import {Button} from '@nextui-org/react';
import MinPlayer from '@/components/min-Player/index.jsx'
import {useTheme} from "next-themes";
import Moon from '@/components/min-Player/moon.jsx'
import Sum from '@/components/min-Player/sum.jsx'

export default function index() {
    const {theme, setTheme} = useTheme();
    return (
        <div className="flex flex-col justify-center">
            <div
                className="flex relative w-full h-auto bg-gradient-to-tr from-[#FFB457] to-[#FF705B] rounded-2xl items-center justify-center py-14 px-4 lg:px-8">
                <MinPlayer/>
                <div className="flex absolute top-2 right-2">
                    <Button isIconOnly
                            radius="full"
                            variant="light"
                            onClick={() => setTheme(theme == 'light' ? 'dark' : 'light')}>
                        {theme == 'light' ? <Moon/> : <Sum/>}
                    </Button>
                </div>
            </div>
        </div>
    )
}