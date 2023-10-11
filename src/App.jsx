import './styles/reset.css'
import './styles/app.scss'
// router
import Router from './routes';
import {useState} from 'react'
import {NavLink} from 'react-router-dom'

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
