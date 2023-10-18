import MinPlayer from '@/components/min-Player/index.jsx'
export default function index() {
    return (
        <div className="flex flex-col justify-center">
            <div className="flex relative w-full h-auto  rounded-2xl items-center justify-center py-14 px-4 lg:px-8">
                <MinPlayer/>
            </div>
        </div>
    )
}