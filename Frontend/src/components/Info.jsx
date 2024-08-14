//import { useLocation } from "react-router-dom";
import Buttons from "./Buttons.jsx";
//import { Link } from "react-router-dom";

function Info() {
  //const location = useLocation();
  //const isLandingPage = location.pathname === "/";
  //{isLandingPage && <Buttons />}
  return (
    <div className="flex flex-col bg-white justify-center items-center p-20 gap-2 w-1/2 min-h-screen text-black">
      <img src="/logo.png" alt="logo" className="w-28" />
      <div className="">
        <h1 className="font-bold text-3xl">Relajate jugando,</h1>
        <h1 className="font-bold text-3xl mb-4">Organizate ganando</h1>
        <p className="mb-4">
          ¡Bienvenido a nuestra página web! Sumérgete en nuestro juego diseñado
          para relajarte y divertirte, ideal para liberar el estrés. Además, te
          ofrecemos herramientas para organizar tus tareas pendientes,
          garantizando que puedas gestionar tu tiempo de manera eficaz. Explora
          y disfruta de la combinación perfecta entre entretenimiento y
          productividad en un solo lugar.
        </p>
        <Buttons />
      </div>
    </div>
  );
}

export default Info;
