// hooks/useCalcularTotal.js
import { useEffect, useState } from "react";

export default function useCalcularTotal({ fechaInicio, fechaFin, vehiculo, seguro, equipamientos }) {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (!fechaInicio || !fechaFin || !vehiculo) {
      setTotal(0);
      return;
    }

    // 🔹 Calcular cantidad de días
    const dias = Math.ceil(
      (new Date(fechaFin) - new Date(fechaInicio)) / (1000 * 60 * 60 * 24)
    );

    if (dias <= 0) {
      setTotal(0);
      return;
    }

    // 🔹 Calcular costos
    const costoVehiculo = vehiculo.costoPorDia * dias;
    const costoSeguro = seguro ? seguro.precio : 0;
    const costoEquipamientos = equipamientos.reduce((sum, e) => sum + e.precio, 0);

    setTotal(costoVehiculo + costoSeguro + costoEquipamientos);
  }, [fechaInicio, fechaFin, vehiculo, seguro, equipamientos]);

  return total;
}
