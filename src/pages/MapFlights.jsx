import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { MapContainer, TileLayer, Marker, Popup, LayersControl, ZoomControl, useMap } from 'react-leaflet'
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {Box} from '@mui/material';
import 'leaflet-moving-rotated-marker';
import styles from './MapFlights.module.css';
import planeIconImage from '../assets/plane.png';

// Custom control for flight filters
// Helper function to parse bounds string into LatLngBounds
const parseBounds = (boundsStr) => {
    if (boundsStr === 'all') return null;
    const [north, south, west, east] = boundsStr.split(',').map(Number);
    return [[north, west], [south, east]];
};

// Component to handle map bounds updates
const MapBoundsHandler = ({ bounds }) => {
    const map = useMap();
    
    useEffect(() => {
        if (bounds) {
            map.fitBounds(bounds, {
                padding: [50, 50], // Add padding around bounds
                maxZoom: 6 // Limit maximum zoom level
            });
        } else {
            // Default view for 'All Regions'
            map.setView([45.00, 2.00], 5);
        }
    }, [bounds, map]);

    return null;
};

const FlightFilters = ({ region, setRegion }) => {
    const regions = [
        { label: 'All Regions', bounds: '90.00,-90.00,-180.00,180.00' },
        { label: 'Europe', bounds: '60.00,35.00,-10.00,30.00' },
        { label: 'North America', bounds: '72.00,15.00,-168.00,-50.00' },
        { label: 'South America', bounds: '15.00,-56.00,-82.00,-33.00' },
        { label: 'Africa', bounds: '38.00,-35.00,-18.00,52.00' },
        { label: 'Middle East', bounds: '42.00,12.00,32.00,65.00' },
        { label: 'Asia', bounds: '70.00,10.00,80.00,120.00' },
        { label: 'Australasia', bounds: '-1.00,-45.00,100.00,180.00' }
    ];

    return (
        <div className="leaflet-control leaflet-bar" style={{ marginTop: '30px', backgroundColor: 'white', padding: '8px', margin: '1px' }}>
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
            'bounds': region === 'all' ? '90.00,-90.00,-180.00,180.00' : region,
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
        // Initial fetch
        fetchFlights();

        // Set up interval for fetching every 5 minutes
        const interval = setInterval(() => {
            fetchFlights();
        }, 5 * 60 * 1000); // 5 minutes in milliseconds

        // Cleanup interval on component unmount
        return () => clearInterval(interval);
    }, []);

    // Create custom icon for plane markers
    const planeIcon = L.icon({
        iconUrl: planeIconImage,
        iconSize: [25, 25], // size of the icon
        iconAnchor: [12, 12], // point of the icon which will correspond to marker's location
    });

    return (
        <Box className={styles.mapContainer}>
            <Box
            sx={{
                display: { xs: 'none' , sm: 'block' },
                position: 'absolute',
                top: '10px',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 1000,
                backgroundColor: 'white',
                opacity: 0.5,
                padding: '5px 15px',
                borderRadius: '4px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            }}>
                <h2 style={{ margin: 0, fontWeight: 'bold' }}>Real-Time Flight Map</h2>
            </Box>
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
                <MapBoundsHandler bounds={parseBounds(region)} />
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
                    {/* //Flight Filter Box */}
                </LayersControl>
                <div className="leaflet-top leaflet-left" style={{ marginTop: '9px', marginLeft: '60px', zIndex: 1000 }}>
                    <FlightFilters 
                        region={region}
                        setRegion={setRegion}
                    />
                </div>
                {flights && flights.map((flight) => {

                    if (flight.lat && flight.lon) {                     
                        return (
                            <Marker
                                key={flight.callsign}
                                position={[flight.lat, flight.lon]}
                                icon={planeIcon}
                                rotationAngle={flight.track}
                                rotationOrigin="center"
                            >
                                <Popup className="leaflet-popup" style={{ width: '20px' }}>
                                    <div>
                                        <h3>Flight number: {flight.flight}</h3>
                                        <p>Aircraft type: {flight.type}</p>
                                        <p>From: {flight.orig_iata}</p>
                                        <p>To: {flight.dest_iata}</p>
                                        <p>Arrival time: {new Date(flight.eta).toLocaleString('en-GB', {
                                            dateStyle: 'medium',
                                            timeStyle: 'short'
                                        })}</p>
                                        <p>Latitude: {flight.lat.toFixed(2)}°</p>
                                        <p>Longitude: {flight.lon.toFixed(2)}°</p>
                                        <p>Direction: {flight.track}°</p>
                                        <p>Altitude: {(flight.alt * 0.3048).toFixed(2)} m</p>
                                        <p>Ground Speed: {(flight.gspeed * 1.852).toFixed(2)} km/h</p>
                                        <p style={{ color: flight.vspeed > 0 ? 'blue' : flight.vspeed < 0 ? 'green' : 'blue'}}>
                                        Vertical Speed: {(flight.vspeed / 196.9).toFixed(2)} m/s 
                                       {(flight.vspeed > 0 ? " (ascending)" : flight.vspeed < 0 ? " (descending)" : " (cruising)")}</p>                                
                                    </div>
                                </Popup>
                            </Marker>
                        );
                    }
                    return;
                })}
            </MapContainer>
        </Box>
    );
}
export default MapFlights;