import { createBrowserRouter } from 'react-router';
import HomeLayOut from '../layouts/HomeLayOut';
import Home from '../pages/Home';
import AuthLayout from '@/layouts/AuthLayout';
import Login from '@/pages/Login';
import Register from '@/pages/Register';

const router = createBrowserRouter([
    {
        path: "/",
        Component: HomeLayOut,
        children: [
            {
                path: "/",
                Component: Home,
                loader: () => fetch("/learningData.json")
            }
        ],
    },

    {
        path: "/auth",
        Component: AuthLayout,
        children: [
            {
                path:"/auth/login",
                Component: Login
            },
            {
                path: "/auth/register",
                Component: Register
            }
        ]
    }
]);


export default router;