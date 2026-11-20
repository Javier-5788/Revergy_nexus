import { createContext, useContext, useState } from "react";
import type { ProyectoActivo } from "../types/proyecto.types";

type ProyectoContextValue = {
  proyectoActivo: ProyectoActivo | null;
  setProyectoActivo: (proyecto: ProyectoActivo | null) => void;
};

const ProyectoContext = createContext<ProyectoContextValue | null>(null);

function leerProyectoGuardado(): ProyectoActivo | null {
  const guardado = sessionStorage.getItem("nexus_proyecto_activo");

  if (!guardado) {
    return null;
  }

  try {
    return JSON.parse(guardado) as ProyectoActivo;
  } catch {
    sessionStorage.removeItem("nexus_proyecto_activo");
    return null;
  }
}

export function ProyectoProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [proyectoActivo, guardarProyecto] =
    useState<ProyectoActivo | null>(leerProyectoGuardado);

  function setProyectoActivo(proyecto: ProyectoActivo | null) {
    if (proyecto) {
      sessionStorage.setItem("nexus_proyecto_activo", JSON.stringify(proyecto));
    } else {
      sessionStorage.removeItem("nexus_proyecto_activo");
    }

    guardarProyecto(proyecto);
  }

  return (
    <ProyectoContext.Provider value={{ proyectoActivo, setProyectoActivo }}>
      {children}
    </ProyectoContext.Provider>
  );
}

export function useProyecto() {
  const context = useContext(ProyectoContext);

  if (!context) {
    throw new Error("useProyecto debe usarse dentro de ProyectoProvider");
  }

  return context;
}