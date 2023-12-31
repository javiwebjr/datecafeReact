import useQuiosco from "../hooks/useQuiosco"
import Categoria from "./Categoria"
import { useAuth } from "../hooks/useAuth";
export default function Sidebar() {
    const {logout, user} = useAuth({middleware: 'auth'});
    const {categorias} = useQuiosco();
    return (
        <>   
            <aside className="md:w-72">
                <div className="p-4 border-b-2">
                    <img src="img/garage.jpg" alt="Imagen Logo" 
                        className="w-full"
                    />
                </div>
                <p className="my-3 text-xl text-amber-700 font-bold text-center">Hola: {user?.name}</p>
                <div className="mt-10 md:mt-0">
                    {categorias.map( categoria => (
                        <Categoria
                            key={categoria.id}
                            categoria={categoria}
                        />
                    ))}
                </div>
                <div className="my-5 py-5">
                    <button type="button"
                        className="text-center bg-red-500 w-full p-3 font-bold text-white truncate hover:bg-red-800"
                        onClick={logout}
                    >
                        Cerrar Cesion
                    </button>
                </div>
            </aside>
        </>
    )
}
