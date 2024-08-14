import { SideBarItems } from "./SideBarItems";
import {
  PanelLeftClose,
  PanelLeftOpen,
  House,
  ListChecks,
  LayoutList,
  CircleUserRound,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState, createContext, useContext } from "react"; // Una sola importación de useContext
import { UserContext } from '../../context/UserContext'; // Importar correctamente el UserContext

// Define el SideBarContext una vez, antes de la definición del componente
export const SideBarContext = createContext();

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { user } = useContext(UserContext); // Acceder al contexto del usuario

  // Generar el URL del avatar con las iniciales del nombre y apellido
  const getAvatarUrl = (name, surname) => {
    const initials = `${name ? name.charAt(0) : ''}${surname ? surname.charAt(0) : ''}`;
    return `https://ui-avatars.com/api/?name=${initials}&background=random`;
  };

  return (
    <aside
      className={`h-screen transition-all duration-300 shadow-sm shadow-violet-700 ${
        isOpen ? "w-60" : "w-[70px]"
      }`}
    >
      <nav className="h-full flex flex-col bg-white border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          <Link to="/user/dashboard" className="flex items-center">
            <img
              src="/logo.png"
              alt="Logo"
              className={`transition-all duration-300 ${
                isOpen ? "w-10" : "w-0"
              }`}
            />
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {isOpen ? <PanelLeftClose /> : <PanelLeftOpen />}
          </button>
        </div>

        <SideBarContext.Provider value={{ isOpen }}>
          <ul className="flex-1 px-3">
            <SideBarItems icon={<House size={22} />} text="Inicio" active />
            <hr />
            <SideBarItems icon={<ListChecks size={22} />} text="Finalizadas" />
            <SideBarItems icon={<LayoutList size={22} />} text="Tareas" />
            <hr />
            <SideBarItems icon={<CircleUserRound size={22} />} text="Cuenta" />
          </ul>
        </SideBarContext.Provider>

        <div className="border-t flex p-3 items-center">
          <img
            src={getAvatarUrl(user?.nombre, user?.apellido)} // URL dinámico del avatar
            alt="User Avatar"
            className="w-10 h-10 rounded-full"
          />
          <div
            className={`
              flex items-center transition-all duration-300 overflow-hidden
              ${isOpen ? "w-52 ml-3" : "w-0"}
            `}
          >
            <div className="leading-4">
              <h4 className="font-semibold text-xs">{user?.nombre || 'Nombre Usuario'} {user?.apellido || ''}</h4>
              <span className="text-xs text-gray-600">{user?.email || 'correo@gmail.com'}</span>
            </div>
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;