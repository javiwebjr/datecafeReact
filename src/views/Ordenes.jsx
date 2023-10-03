import React from 'react'
import useSWR from 'swr'
import axiosCliente from '../utils/axios'
import { dinero } from '../helpers';
import useQuiosco from '../hooks/useQuiosco';

export default function Ordenes() {
  const token = localStorage.getItem('AUTH_TOKEN');
  const fetcher = () => axiosCliente('/api/pedidos', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  const {data, error, isLoading} = useSWR('/api/pedidos', fetcher, {refreshInterval:1000});

  const {handleClickCompletar} = useQuiosco();

  if(isLoading) return 'Cargando...';
  return (
    <div>
      <h1 className="text-4xl font-black">
           Ordenes
        </h1>
        <p className="text-2xl my-10">
            Administra las ordenes desde aqui
        </p>
        <div className='grid grid-cols-2 gap-3'>
          {
            data.data.data.map(pedido => (
              <div key={pedido.id} className='p-5 bg-white shadow space-y-2 border-b-2 border-b-black'> 
                <p className='text-3xl font-bold text-gray-600'>
                  Orden Numero: {pedido.id} 
                </p>
                {pedido.productos.map(producto => (
                  <div key={producto.id} className='border-b border-b-blue-300 py-4'>
                    <p className='font-bold'>ID: {producto.id}</p>
                    <p className='text-xl'>{producto.nombre}</p>
                    <p className='text-xl'>Cantidad: <span className='font-bold'>{producto.pivot.cantidad}</span></p>
                  </div>
                ))}
                <p className='text-lg font-bold text-gray-500'>Pedido Hecho Por: <span className='text-gray-800'>{pedido.user.name}</span></p>
                <p className='text-lg font-bold text-gray-500'>Direccion De Envio: <span className='text-gray-800'>{pedido.user.direccion}</span></p>
                <p className='text-lg font-bold text-gray-500'>Telefono: <span className='text-gray-800'>{pedido.user.telefono}</span></p>


                <p className='text-lg font-bold text-orange-500'>Total a Pagar: <span className='text-orange-600'>{dinero(pedido.total)}</span></p>
                <button type="button" 
                  className='bg-blue-600 hover:bg-blue-800 px-5 py-2 rounded uppercase font-bold text-white text-center w-full cursor-pointer align-bottom'
                  onClick={()=> handleClickCompletar(pedido.id)}
                >Completar Orden</button>
              </div>
            ))
          }
        </div>
    </div>
  )
}
