import useQuiosco from "../hooks/useQuiosco";
export default function Categoria({categoria}) {
  const {handleClickCategoria, categoriaActual} = useQuiosco();
  const {icono, id, nombre}= categoria;
  const bgCategoria = () => categoriaActual.id === id ? 'bg-amber-400' : 'bg-white';
  return (
    <>    
      <div className={`${bgCategoria()} flex items-center border w-full p-3 hover:bg-amber-400 cursor-pointer`}>
          <img src={`/img/icono_${icono}.svg`} alt="Imagen Icono" 
              className="w-12 h-12"
          />

          <button 
            className="text-lg font-bold cursor-pointer truncate w-full h-12"
            type="button"
            onClick={()=> handleClickCategoria(id)}
          >{nombre}</button>
      </div>
    </>
  )
}
