//
import { Link } from "react-router-dom";
function Header() {
  return (
    <div className="w-full bg-purple-700 fixed top-0 py-2 px-3 z-30 shadow-md">
      <div className="flex w-full bg-white py-1.5 px-2 rounded-sm items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <img
              src="/logo.png"
              alt="Imagen del logo de la pagina"
              className="w-8 items-center"
            />
            <h3 className="font-semibold text-xl md:text-2xl ml-2">
              Game<span className="text-violet-900 font-bold">Mind</span>
            </h3>
          </Link>
        </div>
        <nav>
          <ul className="flex">
            <li>
              <Link
                to="/register"
                className="bg-neutral-900 text-white py-2 px-2 mr-2 rounded hover:bg-neutral-700"
              >
                Registrarse
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className="bg-[#2B0975] text-white py-2 px-2 rounded hover:bg-violet-800"
              >
                Iniciar sesión
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Header;
