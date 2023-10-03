import { useState, createRef } from "react";
import { Link } from "react-router-dom";
import axiosCliente from '../utils/axios';
import Alerta from "../components/Alerta";
import { useAuth } from "../hooks/useAuth";

export default function Registro() {

    const [errores, setErrores] = useState([]);

    const nameRef = createRef();
    const emailRef = createRef();
    const passwordRef = createRef();
    const passwordConfirmationRef = createRef();
    const direccionRef = createRef();
    const telefonoRef = createRef();
    const {registro} = useAuth({middleware: 'guest', url: '/'});

    const handleSubmit = async e => {
        e.preventDefault();
        const datos = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
            direccion: direccionRef.current.value,
            telefono: telefonoRef.current.value,
        }
        registro(datos, setErrores);
    }

  return (
    <>
        <h1 className="text-4xl font-black">Crear Cuenta</h1>

        <div className="bg-white shadow-lg rounded-md mt-10 px-5 py-10 border">
            <form onSubmit={handleSubmit} noValidate>
                {errores ? errores.map((error, index) => <Alerta key={index}>{error}</Alerta>) : null}
                <div className="mb-4">
                    <label 
                        className="text-slate-800"
                        htmlFor="name"
                    >Nombre</label>
                    <input 
                        type="text"
                        id="name"
                        className="mt-2 w-full p-3 bg-gray-50 border border-gray-300"
                        name="name"
                        placeholder="Ej: Pedro Menjivar Martinez"
                        ref={nameRef}
                    />
                </div>
                <div className="mb-4">
                    <label 
                        className="text-slate-800"
                        htmlFor="email"
                    >Email</label>
                    <input 
                        type="email"
                        id="email"
                        className="mt-2 w-full p-3 bg-gray-50 border border-gray-300"
                        name="email"
                        placeholder="example@example.com"
                        ref={emailRef}
                    />
                </div>
                <div className="mb-4">
                    <label 
                        className="text-slate-800"
                        htmlFor="password"
                    >Password</label>
                    <input 
                        type="password"
                        id="password"
                        className="mt-2 w-full p-3 bg-gray-50 border border-gray-300"
                        name="password"
                        autoComplete="off"
                        placeholder="Escribe tu Password"
                        ref={passwordRef}
                    />
                </div>
                <div className="mb-4">
                    <label 
                        className="text-slate-800"
                        htmlFor="password_confirmation"
                    >Confirma Tu Password</label>
                    <input 
                        type="password"
                        id="password_confirmation"
                        className="mt-2 w-full p-3 bg-gray-50 border border-gray-300"
                        name="password_confirmation"
                        autoComplete="off"
                        placeholder="Repite tu password"
                        ref={passwordConfirmationRef}
                    />
                </div>
                <div className="mb-4">
                    <label 
                        className="text-slate-800"
                        htmlFor="direccion"
                    >Direccion De Envio</label>
                    <input 
                        type="text"
                        id="direccion"
                        className="mt-2 w-full p-3 bg-gray-50 border border-gray-300"
                        name="direccion"
                        placeholder="Ej: San Martin, Colonia: x pasaje: numero x, casa x"
                        ref={direccionRef}
                    />
                </div>
                <div className="mb-4">
                    <label 
                        className="text-slate-800"
                        htmlFor="telefono"
                    >Telefono De Contacto Para El Envio</label>
                    <input 
                        type="text"
                        id="telefono"
                        className="mt-2 w-full p-3 bg-gray-50 border border-gray-300"
                        name="telefono"
                        placeholder="Telefono Que Recibira El Envio"
                        ref={telefonoRef}
                    />
                </div>
                <input 
                    type="submit"
                    value="Crear Cuenta"
                    className="bg-blue-500 hover:bg-blue-700 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer rounded-md" 
                />
            </form>

        </div>
        <nav className="mt-5">
            <Link to="/auth/login">
                ¿Ya tienes cuenta? Inicia Sesion
            </Link>
        </nav>
    </>
  )
}
