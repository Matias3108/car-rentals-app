import { useState, useEffect } from "react";
import VehiculoCard from "../components/vehiculoCard";
import axios from "axios";

export default function Principal() {
    const [vehiculos, setVehiculos] = useState([]);
    const [transmision, setTransmision] = useState("");
    const [tipo, setTipo] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/api/vehiculos`)
            .then((res) => {
                setVehiculos(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error al obtener vehículos:", err);
                setLoading(false);
            });
    }, []);

    const buscarAutos = () => {
        axios.get(`${import.meta.env.VITE_API_URL}/api/vehiculos?transmision=${transmision}&tipo=${tipo}`)
            .then(res => setVehiculos(res.data))
            .catch(err => console.error(err));
    };


    return (
        <>
            <div className="filtro-container">
                <select value={transmision} onChange={(e) => setTransmision(e.target.value)}>
                    <option value="">Elige transmisión</option>
                    <option value="Automatico">Automático</option>
                    <option value="Manual">Manual</option>
                </select>

                <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
                    <option value="">Elige tipo de vehículo</option>
                    <option value="SUV">SUV</option>
                    <option value="Sedan">Sedán</option>
                    <option value="Pickup">Pickup</option>
                </select>

                <button onClick={buscarAutos} >
                    Buscar Auto
                </button>
            </div>
            {loading ? (
                <p>Cargando vehículos...</p>
            ) : (
                <div className="vehiculos-container">
                    {vehiculos.map((v) => (
                        <VehiculoCard key={v._id} vehiculo={v} />
                    ))}
                </div>
            )}
        </>
    );
}
