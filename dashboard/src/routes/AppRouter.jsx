import React from 'react'
import {
    Route,
    createBrowserRouter, 
    createRoutesFromElements, 
    RouterProvider} 
    from 'react-router-dom'


import { Books } from '../pages/Books'
import { Home } from '../pages/home'
import { Users } from '../pages/Users'
import { Autors } from '../pages/Autors'
import { Root } from '../components/Root'

    const router = createBrowserRouter([
        {
            path : "/",
            element : <Root/>,
            children: [
                {
                    path : "/",
                    element: <Home/>
                },
                {
                    path : "/books",
                    element: <Books/>
                },
                {
                    path: "/Users",
                    element: <Users/>
                }
                
            ]  
        },
    ])


export const AppRouter = () => {
  return <RouterProvider router={router}/>
}
