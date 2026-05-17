import { createBrowserRouter } from 'react-router';
import HomeLayOut from '../layouts/HomeLayOut';
import Home from '../pages/Home';
import AuthLayout from '@/layouts/AuthLayout';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import PrivateRoute from '@/provider/PrivateRoute';
import Bills from '@/pages/Bills';
import Profile from '@/pages/Profile';
import BillDetails from '@/pages/BillDetails';

const router = createBrowserRouter([
    {
        path: "/",
        Component: HomeLayOut,
        children: [
            {
                path: "/",
                Component: Home,
                loader: () => fetch("/learningData.json")
            },
            {
                path: "/bills",
                element: <PrivateRoute>
                    <Bills></Bills>
                </PrivateRoute>
            },
            {
                path: "/profile",
                element: <PrivateRoute>
                    <Profile></Profile>
                </PrivateRoute>
            },
            {
                path: "/bill-details/:id",
                element: <PrivateRoute>
                    <BillDetails></BillDetails>
                </PrivateRoute>
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