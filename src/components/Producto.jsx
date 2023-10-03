import { dinero } from "../helpers";
import useQuiosco from "../hooks/useQuiosco";
export default function Producto({producto}) {
    const {nombre, imagen, precio} = producto;
    const {handleClickModal, handleSetProducto} = useQuiosco();
    return (
        <div className="border p-3 shadow bg-white">
            <img src={`/img/${imagen}.jpg`} alt={`Imagen ${nombre}`} 
                className="w-full h-96 md:w-[400px] md:h-[400px]"
            />

            <div className="p-5">
                <h3 className="text-xl font-bold">{nombre}</h3>
                <p className="mt-5 font-black text-4xl text-amber-500">{dinero(precio)}</p>
                <button type="button"
                    className="bg-blue-500 hover:bg-blue-700 hover:scale-110 text-white w-full mt-5 p-3 uppercase font-bold rounded"
                    onClick={()=> {
                        handleClickModal();
                        handleSetProducto(producto);
                    }}
                >
                    Agregar
                </button>
            </div>
        </div>
    )
}
