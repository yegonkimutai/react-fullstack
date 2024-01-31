import { Navigate, createBrowserRouter } from 'react-router-dom'
import Login from './views/Login'
import Signup from './views/Signup'
import Users from './views/Users'
import NotFound from './views/NotFound'
import Default from './components/Default'
import Guest from './components/Guest'
import Dashboard from './views/Dashboard'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Default />,
        children: [
            {
                path: '/',
                element: <Navigate to='/users' />
            },
            {
                path: '/users',
                element: <Users />
            },
            {
                path: '/dashboard',
                element: <Dashboard />
            }
        ]
    },
    {
        path: '/',
        element: <Guest />,
        children: [
            {
                path: '/signup',
                element: <Signup />
            },
            {
                path: '/login',
                element: <Login />
            },
        ]
    },
    {
        path: '*',
        element: <NotFound />
    }
])

export default router