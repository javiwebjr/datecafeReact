import { useState, useEffect } from 'react';
import { dinero } from '../helpers';
import useQuiosco from '../hooks/useQuiosco'
export default function ModalProducto() {
    const {producto, handleClickModal, handleAgregarPedido, pedido} = useQuiosco();
    const [cantidad, setCantidad] = useState(1);
    const [edicion, setEdicion] = useState(false);

    useEffect(() => {
        if(pedido.some(pedidoState => pedidoState.id === producto.id)){
            const productoEditado = pedido.filter(pedidoState=> pedidoState.id === producto.id)[0];
            setCantidad(productoEditado.cantidad);
            setEdicion(true);
        }
    }, [pedido]);
    return (
        <div className='md:flex gap-10'>
            <div className='md:w-1/3'>
                <img src={`/img/${producto.imagen}.jpg`} alt={`Imagen producto ${producto.nombre}`} 
                    className='rounded w-40 h-40 md:w-[328px] md:h-[328px]'
                />
            </div>
            <div className='md:w-2/3'>
                <div className='flex justify-end'>
                    <button onClick={handleClickModal}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" 
                            strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>

                    </button>
                </div>
                <h1 className='text-3xl font-bold mt-5 border-b-2 border-black'>
                    {producto.nombre}
                </h1>
                <p className='mt-5 font-black text-5xl text-amber-500'>
                    {dinero(producto.precio)}
                </p>
                <div className='flex gap-4 mt-5'>
                    <button type='button'
                        onClick={()=> {
                            if(cantidad<=1) return
                            setCantidad(cantidad - 1);
                        }}
                    >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" 
                        strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-red-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                    </svg>

                    </button>
                    <p className='text-3xl'>{cantidad}</p>
                    <button type='button'
                        onClick={()=> {
                            if(cantidad>=20) return
                            setCantidad(cantidad + 1);
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" 
                            strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-green-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>

                    </button>
                </div>
                <button type='button'
                    className='bg-blue-600 hover:bg-blue-900 px-5 py-2 mt-5 text-white font-bold uppercase rounded'
                    onClick={()=> {
                        handleAgregarPedido({...producto, cantidad})
                        handleClickModal()
                    }}
                >
                    {edicion ? 'Guardar Cambios' : 'Agregar Pedido'}
                </button>
            </div>
        </div>
    )
}
