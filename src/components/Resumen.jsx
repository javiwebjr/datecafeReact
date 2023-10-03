import { dinero } from "../helpers";
import useQuiosco from "../hooks/useQuiosco"
import ResumenProducto from "./ResumenProducto";
export default function Resumen() {
  const {pedido, total, handleSubmitNuevaOrden} = useQuiosco();

  const comprobarPedido = () =>  pedido.length === 0;
  const handleSumit = e => {
    e.preventDefault();
    handleSubmitNuevaOrden();
  }
  return (
    <>
      <aside className="w-72 h-screen overflow-y-scroll p-5">
        <h1 className="text-4xl font-black md:text-center">Pedido</h1>
        <p className="text-lg my-5">
          Resumen y Total Del Pedido
        </p>
        <div className="py-10">
          {pedido.length === 0 ? (
            <p className="text-center text-2xl">Aun no hay elementos en tu pedido</p>
          ) : (
            pedido.map(producto=> (
              <ResumenProducto
                key={producto.id}
                producto={producto}
              />
            ))
          )}
        </div>
        <p className="text-xl mt-10">
          Total: {''}
          {dinero(total)}
        </p>
        <form className="w-full"
          onSubmit={handleSumit}
        >
          <div className="mt-5">
            <input type="submit" 
              className={`${comprobarPedido() ? 
                'bg-red-200' :
                'bg-blue-600 hover:bg-blue-800'} px-5 py-2 rounded uppercase font-bold text-white text-center w-full cursor-pointer`}
              value={comprobarPedido() ? 'Agrega Pedido' : 'Confirmar Orden'}
              disabled={comprobarPedido()}
            />
          </div>
        </form>
      </aside>
    </>
  )
}
