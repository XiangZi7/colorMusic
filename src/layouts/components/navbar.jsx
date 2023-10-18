import './navbar.scss'
import {Avatar, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem} from "@nextui-org/react";
import Moon from "@/components/min-Player/moon.jsx";
import Sum from "@/components/min-Player/sum.jsx";
import {useTheme} from "next-themes";

export default function App() {


    const {theme, setTheme} = useTheme();

    return (
        <div className="flex justify-between items-center w-full px-[24px] py-[16px] relative">
            <div className="grow flex items-center">
                <span className="app-icon w-[26px] h-[2px] rounded-[4px] bg-[#1f1c2e] relative"></span>
                <p className="app-name text-foreground/90 text-large font-bold mx-8">Portfolio</p>
                <div className="search-wrapper">
                    <input className="search-input" type="text" placeholder="Search"/>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor"
                         strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                         className="feather feather-search" viewBox="0 0 24 24">
                        <defs></defs>
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="M21 21l-4.35-4.35"></path>
                    </svg>
                </div>
            </div>
            <div className="flex items-center">
                <div className="iconlist">
                    <Button isIconOnly
                            radius="full"
                            variant="light"
                            onClick={() => setTheme(theme == 'light' ? 'dark' : 'light')}>
                        {theme == 'light' ? <Moon/> : <Sum/>}
                    </Button>
                </div>
                <Dropdown placement="bottom-end">
                    <DropdownTrigger>
                        <Avatar
                            isBordered
                            as="button"
                            className="transition-transform mr-2"
                            color=" secondary"
                            name=" Jason Hughes"
                            size=" sm"
                            src=" https://i.pravatar.cc/150?u=a042581f4e29026704d"
                        />
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Profile Actions" variant="flat">
                        <DropdownItem key="profile" className="h-14 gap-2">
                            <p className="font-semibold">Signed in as</p>
                            <p className="font-semibold">zoey@example.com</p>
                        </DropdownItem>
                        <DropdownItem key="settings">My Settings</DropdownItem>
                        <DropdownItem key="team_settings">Team Settings</DropdownItem>
                        <DropdownItem key="analytics">Analytics</DropdownItem>
                        <DropdownItem key="system">System</DropdownItem>
                        <DropdownItem key="configurations">Configurations</DropdownItem>
                        <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
                        <DropdownItem key="logout" color="danger">
                            Log Out
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <span className="font-semibold text-foreground/90">一向纯荣</span>
            </div>
        </div>
    );
}
