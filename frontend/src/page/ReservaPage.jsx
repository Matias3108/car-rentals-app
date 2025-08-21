import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function ReservaPage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const vehiculoId = searchParams.get("vehiculoId");

    const [vehiculo, setVehiculo] = useState(null);
    const [seguros, setSeguros] = useState([]);
    const [equipamientos, setEquipamientos] = useState([]);
    const [ubicaciones, setUbicaciones] = useState([]);

    const [reserva, setReserva] = useState({
        fechaInicio: "",
        fechaFin: "",
        seguroId: "",
        equipamientosIds: [],
        ubicacionId: ""
    });

    // 🔹 Cargar datos del vehículo y opciones desde la API
    useEffect(() => {
        if (!vehiculoId) return;

        Promise.all([
            axios.get(`${import.meta.env.VITE_API_URL}/api/vehiculos/${vehiculoId}`),
            axios.get(`${import.meta.env.VITE_API_URL}/api/seguros`),
            axios.get(`${import.meta.env.VITE_API_URL}/api/equipamientos`),
            axios.get(`${import.meta.env.VITE_API_URL}/api/ubicaciones`)
        ])
            .then(([vehiculoRes, segurosRes, equipamientosRes, ubicacionesRes]) => {
                setVehiculo(vehiculoRes.data);
                setSeguros(segurosRes.data);
                setEquipamientos(equipamientosRes.data);
                setUbicaciones(ubicacionesRes.data);
            })
            .catch(err => console.error("Error al cargar datos", err));
    }, [vehiculoId]);

    // 🔹 Manejar cambios en inputs
    const handleChange = (field, value) => {
        setReserva(prev => ({ ...prev, [field]: value }));
    };

    const handleEquipamientoChange = (id, checked) => {
        setReserva(prev => ({
            ...prev,
            equipamientosIds: checked
                ? [...prev.equipamientosIds, id]
                : prev.equipamientosIds.filter(equipId => equipId !== id)
        }));
    };

    // 🔹 Ir al resumen
    const handleReserva = () => {
        const { fechaInicio, fechaFin, seguroId, ubicacionId } = reserva;

        if (!fechaInicio || !fechaFin || !seguroId || !ubicacionId) {
            alert("Por favor, completa todos los campos obligatorios");
            return;
        }

        const query = new URLSearchParams({
            vehiculoId,
            seguroId,
            equipamientos: reserva.equipamientosIds.join(","),
            ubicacionId,
            fechaInicio: fechaInicio.toISOString(),
            fechaFin: fechaFin.toISOString()
        }).toString();

        navigate(`/confirmacion?${query}`);
    };

    if (!vehiculo) return <p>Cargando...</p>;

    return (
        <div className="reserva">
            {/* 🔹 Detalle del vehículo */}
            <div className="detalleVehiculo">
                <h1>Reserva de {vehiculo.marca} {vehiculo.modelo}</h1>
                <img
                    src={vehiculo.imagen}
                    alt={`${vehiculo.marca} ${vehiculo.modelo}`}
                    width="450"
                />
                <div className="detallitos">
                    <div className="detalles">
                        <div>
                            <p><strong>Año:</strong> {vehiculo.año}</p>
                            <p><strong>Tipo:</strong> {vehiculo.tipo}</p>
                            <p><strong>Categoría:</strong> {vehiculo.categoria}</p>
                            <p><strong>Transmisión:</strong> {vehiculo.transmision}</p>
                        </div>
                        <div>
                            <p><strong>Color:</strong> {vehiculo.color}</p>
                            <p><strong>Capacidad de Personas:</strong> {vehiculo.capacidadPersonas}</p>
                            <p><strong>Capacidad de Maletas:</strong> {vehiculo.capacidadMaletas}</p>
                            <p><strong>Matrícula:</strong> {vehiculo.matricula}</p>

                        </div>
                    </div>
                    <div className="caracteristicas">
                        <h3>Características:</h3>
                        <ul>
                            {vehiculo.caracteristicas.map((carac, index) => (
                                <li key={index}>{carac}</li>
                            ))}
                        </ul>

                        <p><strong>Precio por día:</strong> ${vehiculo.costoPorDia}</p>
                        <p><strong>Disponibilidad:</strong> {vehiculo.disponible ? "Disponible ✅" : "No disponible ❌"}</p>
                    </div>

                </div>

            </div>


            {/* 🔹 Formulario de reserva */}
            <div className="formReserva">
                {/* Fechas */}
                <h2>Fechas de uso</h2>
                <div className="fechas">
                    <DatePicker
                        selected={reserva.fechaInicio}
                        onChange={date => handleChange("fechaInicio", date)}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Fecha de inicio"
                    />
                    <DatePicker
                        selected={reserva.fechaFin}
                        onChange={date => handleChange("fechaFin", date)}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Fecha de fin"
                    />
                </div>

                {/* Seguro */}
                <h2>Seleccionar seguro:</h2>
                <select
                    value={reserva.seguroId}
                    onChange={e => handleChange("seguroId", e.target.value)}
                >
                    <option value="">-- Selecciona un seguro --</option>
                    {seguros.map(s => (
                        <option key={s._id} value={s._id}>
                            {s.nombre} - ${s.precio} ({s.cobertura})
                        </option>
                    ))}
                </select>

                {/* Equipamientos */}
                <h2>Equipamientos opcionales</h2>
                <div className="equipamiento">
                    {equipamientos.map(eq => (
                        <label key={eq._id}>
                            <input
                                type="checkbox"
                                value={eq._id}
                                checked={reserva.equipamientosIds.includes(eq._id)}
                                onChange={e => handleEquipamientoChange(eq._id, e.target.checked)}
                            /><span>{eq.nombre} - ${eq.precio}</span>
                        </label>
                    ))}
                </div>

                {/* Ubicación */}
                <h2>Seleccionar ubicación:</h2>
                <select
                    value={reserva.ubicacionId}
                    onChange={e => handleChange("ubicacionId", e.target.value)}
                >
                    <option value="">-- Selecciona una ubicación --</option>
                    {ubicaciones.map(ub => (
                        <option key={ub._id} value={ub._id}>
                            {ub.nombre}
                        </option>
                    ))}
                </select>

                {/* Botón */}
                <br />
                <button onClick={handleReserva}>Reservar</button>
            </div>
        </div>
    );
}

