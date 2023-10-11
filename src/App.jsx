import './App.css'
// router
import {NavLink} from 'react-router-dom';
import Router from './routes';
import {useState} from "react";

function App() {

// 根据路由表生成对应的路由规则
    const [items] = useState([
        {path: '/home', title: '首页'},
        {path: '/friend', title: '好友'},
    ]);
    return (
        <>
            <nav className='nav'>
                <div className='w'>
                    {items.map(item => (
                        <NavLink className={({isActive}) => (isActive ? 'active' : '')} to={item.path} key={item.path}>
                            {item.title}
                        </NavLink>
                    ))}
                </div>
            </nav>
            <Router/>
        </>
    )
}

export default App
