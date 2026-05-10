import { createBrowserRouter } from 'react-router';
import HomeLayOut from '../layouts/HomeLayOut';
import Home from '../pages/Home';

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
]);


export default router;