import {Navigate, useRoutes} from 'react-router-dom';
import {lazy, Suspense} from 'react';

const Home = lazy(() => import('@/pages/Home'));
const Friend = lazy(() => import('@/pages/Friend'));
const Chat = lazy(() => import('@/pages/Chat'));


const LoadingTip = Element => (
    <Suspense fallback={<div>loading...</div>}>
        <Element/>
    </Suspense>
);

const rootRouter = [
    // Navigate 重定向
    {path: '/', element: <Navigate to='/home'/>},
    {path: '/home', element: LoadingTip(Home)},
    {
        path: '/friend',
        element: LoadingTip(Friend),
        meta: {
            title: '好友',
        },
        children: [{path: 'chat/:name', element: LoadingTip(Chat)}],
    },
];

const Router = () => {
    const routes = useRoutes(rootRouter);
    return routes;
};
export default Router;