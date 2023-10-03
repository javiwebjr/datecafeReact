import React from 'react';
import {Link} from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function AdminSideBar() {
    const {logout} = useAuth({middleware: 'auth'});
    return (
        <aside className='md:w-72 h-screen'>
            <div className='p-4'>
                <img src="/img/garage.jpg" alt="imagen logotipo" className='w-40'/>
            </div>
            <nav className='flex flex-col p-4'>
                <Link to="/admin" className='font-bold text-lg'>Ordenes</Link>
                <Link to="/admin/productos" className='font-bold text-lg'>Productos</Link>
            </nav>

            <div className='py-5 px-5'>
                <button type="button"
                    className="text-center bg-red-500 w-full p-3 font-bold text-white truncate hover:bg-red-800"
                    onClick={logout}
                >
                    Cerrar Cesion
                </button>
            </div>
        </aside>
    )
}
