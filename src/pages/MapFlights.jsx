import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { MapContainer, TileLayer, Marker, Popup, LayersControl, ZoomControl } from 'react-leaflet'
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-moving-rotated-marker';
import styles from './MapFlights.module.css';
import planeIconImage from '../assets/plane.png';

// Custom control for flight filters
const FlightFilters = ({ altitudeRange, setAltitudeRange, region, setRegion }) => {
    const altitudeRanges = [
        { label: 'All Altitudes', value: 'all' },
        { label: '0-1,500 m', value: '0-4921.26' },
        { label: '1,500-3,000 m', value: '4921.26-9842.52' },
        { label: '3,000-6,000 m', value: '9842.52-19685.04' },
        { label: 'Above 6,000 m', value: '19685.04+' }
    ];

    const regions = [
        { label: 'All Regions', value: 'all' },
        { label: 'Europe', bounds: '72.00,20.00,35.00,40.00' },
        { label: 'North America', bounds: '72.00,-168.00,15.00,-50.00' },
        { label: 'South America', bounds: '15.00,-82.00,-56.00,-33.00' },
        { label: 'Africa', bounds: '38.00,-18.00,-35.00,52.00' },
        { label: 'Middle East', bounds: '42.00,32.00,12.00,65.00' },
        { label: 'Asia', bounds: '82.00,65.00,10.00,180.00' },
        { label: 'Australasia', bounds: '0.00,100.00,-50.00,180.00' }
    ];

    return (
        // Flight Filters      
        <div className="leaflet-control leaflet-bar" style={{ marginTop: '30px', backgroundColor: 'white', padding: '8px', margin: '1px' }}>
            <div style={{ marginBottom: '8px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>Altitude Range:</label>
                <select 
                    value={altitudeRange} 
                    onChange={(e) => setAltitudeRange(e.target.value)}
                    style={{ width: '100%', padding: '4px' }}
                >
                    {altitudeRanges.map(range => (
                        <option key={range.value} value={range.value}>{range.label}</option>
                    ))}
                </select>
            </div>
            <div>
                <label style={{ display: 'block', marginBottom: '5px' }}>Region:</label>
                <select 
                    value={region} 
                    onChange={(e) => setRegion(e.target.value)}
                    style={{ width: '100%', padding: '4px' }}
                >
                    {regions.map(region => (
                        <option key={region.label} value={region.bounds}>{region.label}</option>
                    ))}
                </select>
            </div>
        </div>
    );
};

const MapFlights = () => {
    const [flights, setFlights] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [altitudeRange, setAltitudeRange] = useState('all');
    const [region, setRegion] = useState('all');

    const fetchFlights = async () => {
        setLoading(true);
        setError(null);
        const Sandbox = '9e8603f0-cc8f-4ae4-a85c-4de663ebb728|bBbbVbHb5mMuyTZiFYkxwNXTZMOax57I5mpYiK5Ob9e62f74'
        const BASE_URL = 'https://fr24api.flightradar24.com/api'
        const ENDPOINT = '/live/flight-positions/full'

        // Construct the full URL    
        const url = `${BASE_URL}${ENDPOINT}`

        // Define the headers, including the Authorization header with your API token
        const headers = {
            'Accept': 'application/json',
            'Authorization': `Bearer ${Sandbox}`,
            'Accept-Version': 'v1'
        }

        // Define any query parameters, if needed (optional)
        const params = {
            'bounds': region === 'all' ? '90.00,-180.00,-90.00,180.00' : region,
            'categories': 'P'
        };

        try {
            const response = await axios.get(url, { headers, params });
            console.log('Raw Response Data:', JSON.stringify(response.data, null, 2));

            let flightData = [];
            const data = response.data;

            // Try to extract flight data based on different possible structures
            if (Array.isArray(data)) {
                console.log('Response is an array');
                flightData = data;
            } else if (typeof data === 'object') {
                console.log('Response is an object with keys:', Object.keys(data));
                if (data.flights) {
                    flightData = data.flights;
                } else if (data.data) {
                    flightData = data.data;
                }
            }

            console.log('Extracted flight data:', flightData);

            if (flightData.length > 0) {
                console.log('Sample flight object:', flightData[0]);
                setFlights(flightData);
            } else {
                console.error('No valid flight data found in response');
                setFlights([]);
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message;
            console.error('Error fetching flights:', errorMessage);
            setError(errorMessage);
            setFlights([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFlights();
    }, []);

    // Create custom icon for plane markers
    const planeIcon = L.icon({
        iconUrl: planeIconImage,
        iconSize: [25, 25], // size of the icon
        iconAnchor: [12, 12], // point of the icon which will correspond to marker's location
    });

    return (
        <div className={styles.mapContainer}>
            {loading && (
                <div className={styles.overlay}>
                    <p>Loading flights...</p>
                </div>
            )}
            {error && (
                <div className={styles.overlay}>
                    <p className={styles.error}>Error: {error}</p>
                </div>
            )}
            <MapContainer 
                center={[45.00, 2.00]} 
                zoom={5} 
                className={styles.map}
                zoomControl={false}
                attributionControl={false}
            >
                <ZoomControl position="topleft" />
                <LayersControl position="topleft">
                    <LayersControl.BaseLayer checked name="Satellite">
                        <TileLayer
                            attribution='&copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
                            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                        />
                    </LayersControl.BaseLayer>
                    <LayersControl.BaseLayer name="OpenStreetMap">
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                    </LayersControl.BaseLayer>
                    <LayersControl.BaseLayer name="National Geographic">
                        <TileLayer
                            attribution='&copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC'
                            url="https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}"
                        />
                    </LayersControl.BaseLayer>
                </LayersControl>
                <div className="leaflet-top leaflet-left" style={{ marginTop: '140px', marginLeft: '10px', zIndex: 1000 }}>
                    <FlightFilters 
                        altitudeRange={altitudeRange}
                        setAltitudeRange={setAltitudeRange}
                        region={region}
                        setRegion={setRegion}
                    />
                </div>
                {flights && flights.map((flight) => {
                    // Log the structure of each flight object
                    console.log('Processing flight:', flight);
                    // Filter by altitude
                    const altitudeMatch = altitudeRange === 'all' ||
                        (altitudeRange === '0-4921.26' && flight.alt <= 1500) ||
                        (altitudeRange === '4921.26-9842.52' && flight.alt > 1500 && flight.alt <= 3000) ||
                        (altitudeRange === '9842.52-19685.04' && flight.alt > 3000 && flight.alt <= 6000) ||
                        (altitudeRange === '19685.04+' && flight.alt > 6000);

                    if (flight.lat && flight.lon && altitudeMatch) {
                      
                        return (
                            <Marker
                                key={flight.callsign}
                                position={[flight.lat, flight.lon]}
                                icon={planeIcon}
                                rotationAngle={flight.track}
                                rotationOrigin="center"
                            >
                                <Popup>
                                    <div>
                                        <h3>Flight: {flight.flight}</h3>
                                        <p>Flight: {flight.type}</p>
                                        <p>From: {flight.orig_iata}</p>
                                        <p>To: {flight.dest_iata}</p>
                                        <p>ETA: {flight.eta}</p>
                                        <p>Latitude: {flight.lat.toFixed(2)}°</p>
                                        <p>Longitude: {flight.lon.toFixed(2)}°</p>
                                        <p>Direction: {flight.track}°</p>
                                        <p>Altitude: {(flight.alt * 0.3048).toFixed(2)} m</p>
                                        <p>Ground Speed: {(flight.gspeed * 1.852).toFixed(2)} km/h</p>
                                        <p>Vertical Speed: {(flight.vspeed / 196.9).toFixed(2)} m/s</p>
                                        
                                    </div>
                                </Popup>
                            </Marker>
                        );
                    }
                    return null;
                })}
            </MapContainer>
        </div>
    );
}
export default MapFlights;