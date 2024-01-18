import React from 'react'
import { Outlet } from 'react-router-dom'

function Guest() {
  return (
    <div>
        <div>
            For guest users only
            <Outlet />
        </div>
    </div>
  )
}

export default Guest