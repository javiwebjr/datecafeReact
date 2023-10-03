import React from 'react'

export default function Alerta({children}) {
  return (
    <div className='text-center my-2 bg-red-600 font-bold text-white p-3 uppercase'>
        {children}
    </div>
  )
}
