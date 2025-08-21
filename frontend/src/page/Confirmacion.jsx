import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useCalcularTotal from "../hooks/useCalcularTotal";
import { useNavigate } from "react-router-dom";

export default function Confirmacion() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const [vehiculo, setVehiculo] = useState(null);
    const [seguro, setSeguro] = useState(null);
    const [equipamientos, setEquipamientos] = useState([]);
    const [ubicacion, setUbicacion] = useState(null);
    const [loading, setLoading] = useState(false);



    const [formData, setFormData] = useState({
        dniPasaporte: "",
        nacionalidad: "",
        nombres: "",
        apellidos: "",
        telefono: "",
        correo: "",
        formaPago: ""
    });

    // Leer valores individuales
    const vehiculoId = searchParams.get("vehiculoId");
    const seguroId = searchParams.get("seguroId");
    const equipamientosStr = searchParams.get("equipamientos"); // string "111,222"
    const ubicacionId = searchParams.get("ubicacionId");
    const fechaInicio = searchParams.get("fechaInicio");
    const fechaFin = searchParams.get("fechaFin");

    // Convertir string de equipamientos en array
    const equipamientosIds = equipamientosStr ? equipamientosStr.split(",") : [];

    const total = useCalcularTotal({
        fechaInicio,
        fechaFin,
        vehiculo,
        seguro,
        equipamientos
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Traer auto, seguro y ubicación en paralelo
                const [vehiculoRes, seguroRes, ubicacionRes] = await Promise.all([
                    axios.get(`${import.meta.env.VITE_API_URL}/api/vehiculos/${vehiculoId}`),
                    axios.get(`${import.meta.env.VITE_API_URL}/api/seguros/${seguroId}`),
                    axios.get(`${import.meta.env.VITE_API_URL}/api/ubicaciones/${ubicacionId}`),
                ]);

                setVehiculo(vehiculoRes.data);
                setSeguro(seguroRes.data);
                setUbicacion(ubicacionRes.data);

                // Para los equipamientos (varios IDs → varias requests)
                if (equipamientosIds.length > 0) {
                    const equipamientoRequests = equipamientosIds.map((id) =>
                        axios.get(`${import.meta.env.VITE_API_URL}/api/equipamientos/${id}`)
                    );

                    const equipamientosRes = await Promise.all(equipamientoRequests);
                    setEquipamientos(equipamientosRes.map((res) => res.data));
                }
            } catch (err) {
                console.error("Error al cargar los datos", err);
            }
        };

        fetchData();
    }, [vehiculoId, seguroId, ubicacionId, equipamientosIds]);


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const reservaData = {
                cliente: formData,
                vehiculo: vehiculo._id,
                seguro: seguro._id,
                equipamientos: equipamientos.map((e) => e._id),
                ubicacion: ubicacion._id,
                fechaInicio,
                fechaFin,
                formaPago: formData.formaPago,
            };

            const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/reservas`, reservaData);

            alert("✅ Reserva confirmada");
            navigate('/'); // Redirige a la página principal

        } catch (err) {
            console.error(err);
            alert("❌ Error al guardar la reserva");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="formConfirm">
            <form className="contenedorFormulario" onSubmit={handleSubmit}>
                <div className="formulario">
                    <label><h3>DNI o Pasaporte</h3>
                        <input type="text" name="dniPasaporte" value={formData.dniPasaporte} onChange={handleChange} placeholder="Ingresa un numero de Documento" />
                    </label>
                    <label ><h3>Nacionalidad</h3>
                        <input type="text" name="nacionalidad" value={formData.nacionalidad} onChange={handleChange} placeholder="Nacionalidad" />
                    </label>
                    <label><h3>Nombres</h3>
                        <input type="text" name="nombres" value={formData.nombres} onChange={handleChange} placeholder="Nombres" />
                    </label>
                    <label><h3>Apellidos</h3>
                        <input type="text" name="apellidos" value={formData.apellidos} onChange={handleChange} placeholder="Apellidos" />
                    </label>
                    <label ><h3>Telefono</h3>
                        <input type="text" name="telefono" value={formData.telefono} onChange={handleChange} placeholder="Telefono" />
                    </label>
                    <label ><h3>Correo</h3>
                        <input type="text" name="correo" value={formData.correo} onChange={handleChange} placeholder="Correo" />
                    </label>
                </div>
                <div className="resumen">
                    <div className="resumenOrden">
                        <div>
                            <h2>Resumen de tu Orden</h2>
                            <h3>Reserva</h3>
                            <p>{vehiculo ? `${vehiculo.marca} ${vehiculo.modelo}` : "Cargando..."}</p>
                            <h3>Fecha de retiro del vehiculo</h3>
                            <p>{fechaInicio ? new Date(fechaInicio).toLocaleDateString() : "-"}</p>
                            <h3>Fecha de entrega del vehiculo</h3>
                            <p>{fechaFin ? new Date(fechaFin).toLocaleDateString() : "-"}</p>
                            <h3>Seguros</h3>
                            <p>{seguro?.nombre || "No seleccionado"}</p>
                            <h3>Extras</h3>
                            <ul>
                                {equipamientos.map((e) => (
                                    <li key={e._id}>{e.nombre} - ${e.precio}</li>
                                ))}
                            </ul>
                            <h3>Ubicación</h3>
                            <p>{ubicacion?.nombre || "No seleccionada"}</p>
                        </div>
                        <div>
                            <h3>Total</h3>
                            <p>$ {total}</p>
                        </div>
                    </div>
                    <div className="formaPago">
                        <label><input type="radio" name="formaPago" value="tarjeta" checked={formData.formaPago === "tarjeta"} onChange={handleChange} />Tarjetas de debito y credito</label>
                        <label ><input type="radio" name="formaPago" value="oficina" checked={formData.formaPago === "oficina"} onChange={handleChange} />Pago en Oficina</label>
                        <button type="submit" disabled={loading}>{loading ? "Guardando..." : "Realizar Reserva"}</button>
                    </div>

                </div>
            </form>

        </div>
    )
}