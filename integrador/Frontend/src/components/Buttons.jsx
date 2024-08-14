import { Link } from "react-router-dom";

function Buttons() {
  return (
    <div className="flex">
      <Link
        to="/register"
        className="px-4 py-2 bg-purple-700 text-white font-semibold mr-3 rounded text-lg"
      >
        Registrate
      </Link>
      <Link
        to="/login"
        className="px-4 py-2 bg-neutral-500 text-white font-semibold rounded text-base"
      >
        Iniciar sesión
      </Link>
    </div>
  );
}

export default Buttons;
