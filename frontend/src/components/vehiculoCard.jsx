import { useNavigate } from "react-router-dom";

export default function VehiculoCard({ vehiculo }) {
    const navigate = useNavigate();

    return (
        <div className="vehiculoCard">
            <img src={vehiculo.imagen} alt={`${vehiculo.marca} ${vehiculo.modelo}`} />
            <h2>{vehiculo.marca} {vehiculo.modelo} {vehiculo.año}</h2>
            <p>{vehiculo.tipo} · {vehiculo.categoria}</p>
            <h3>${vehiculo.costoPorDia}/día</h3>
            <p>
                {vehiculo.capacidadPersonas} Pasajeros · {vehiculo.transmision} · {vehiculo.caracteristicas.join(" · ")}
            </p>
            <p>{vehiculo.disponible ? "🟢 Disponible" : "🔴 No disponible"}</p>
            <button onClick={() => navigate(`/reserva?vehiculoId=${vehiculo._id}`)}
                disabled={!vehiculo.disponible}>
                Reservar Auto
            </button>
        </div>
    );
} 