import { useState, createRef } from "react";
import { Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import {useAuth} from "../hooks/useAuth";
export default function Login() {
    const [errores, setErrores] = useState([]);
    const {login} = useAuth({
        middleware: 'guest',
        url: '/'
    });

    const emailRef = createRef();
    const passwordRef = createRef();

    const handleSubmit = async e => {
        e.preventDefault();
        const datos = {
            email: emailRef.current.value,
            password: passwordRef.current.value
        }
        login(datos, setErrores);
    }

  return (
    <>
        <h1 className="text-4xl font-black">Inicia Sesion</h1>

        <div className="bg-white shadow-lg rounded-md mt-10 px-5 py-10 border">
            <form onSubmit={handleSubmit} noValidate>
                {errores ? errores.map((error, index) => <Alerta key={index}>{error}</Alerta>) : null}
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
                        autoComplete="Off"
                        placeholder="Escribe tu Password"
                        ref={passwordRef}
                    />
                </div>

                <input 
                    type="submit"
                    value="Iniciar Sesion"
                    className="bg-blue-500 hover:bg-blue-700 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer rounded-md" 
                />
            </form>

        </div>
        <nav className="mt-5">
            <Link to="/auth/registro">
                ¿No Tienes Cuenta? Crear Cuenta
            </Link>
        </nav>
    </>
  )
}
