import Producto from "../components/Producto"
import useSWR from "swr";
import useQuiosco from "../hooks/useQuiosco"
import axiosCliente from "../utils/axios";
export default function Inicio() {
  const {categoriaActual} = useQuiosco();
  const fetcher = () => axiosCliente('/api/productos').then(data => data.data);
  const {data, error, isLoading} = useSWR('/api/productos', fetcher, {
    refreshInterval: 1000
  });
  if(isLoading) return 'loading';
  const productos = data.data.filter(producto => producto.categoria_id === categoriaActual.id);
  return (
    <>
        
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {productos.map( producto => (
            <Producto
              key={producto.id}
              producto={producto}
            />
          ))}
        </div>
    </>
  )
}
