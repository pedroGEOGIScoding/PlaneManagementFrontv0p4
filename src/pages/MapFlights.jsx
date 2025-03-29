import React, { useState, useEffect, useCallback } from 'react'
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

const altitudeRanges = [
    { label: 'All Altitudes', min: null, max: null },
    { label: '0-500m', min: 0, max: 500 },
    { label: '500-1000m', min: 500, max: 1000 },
    { label: '1000-2000m', min: 1000, max: 2000 },
    { label: '2000-4000m', min: 2000, max: 4000 },
    { label: '4000-6000m', min: 4000, max: 6000 },
    { label: '6000-10000m', min: 6000, max: 10000 },
    { label: '10000-12000m', min: 10000, max: 12000 },
    { label: 'Above 12000m', min: 12000, max: Infinity }
];

const FlightFilters = ({ region, setRegion, altitudeRange, setAltitudeRange }) => {
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
        <div className="leaflet-control leaflet-bar" style={{ marginTop: '30px', backgroundColor: 'white', padding: '8px', margin: '1px', minWidth: '200px' }}>
            <div style={{ marginBottom: '10px' }}>
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
            <div>
                <label style={{ display: 'block', marginBottom: '5px' }}>Altitude Range:</label>
                <select
                    value={JSON.stringify({ min: altitudeRange.min, max: altitudeRange.max })}
                    onChange={(e) => setAltitudeRange(JSON.parse(e.target.value))}
                    style={{ width: '100%', padding: '4px' }}
                >
                    {altitudeRanges.map(range => (
                        <option 
                            key={range.label} 
                            value={JSON.stringify({ min: range.min, max: range.max })}
                        >
                            {range.label}
                        </option>
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

    const [region, setRegion] = useState('60.00,35.00,-10.00,30.00'); // Default to Europe
    const [altitudeRange, setAltitudeRange] = useState({ min: null, max: null }); // Default to all altitudes

    const fetchFlights = useCallback(async () => {
        setLoading(true);
        setError(null);
        
        // Prevent 'all' region to avoid overwhelming the API
        if (region === 'all') {
            setError('Please select a specific region to view flights');
            setLoading(false);
            return;
        }

        const [lamin, lamax, lomin, lomax] = region.split(',').map(Number);

        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

            const response = await axios.get('https://opensky-network.org/api/states/all', {
                params: {
                    lamin: Math.min(lamin, lamax),
                    lamax: Math.max(lamin, lamax),
                    lomin: Math.min(lomin, lomax),
                    lomax: Math.max(lomin, lomax)
                },
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (response.data && Array.isArray(response.data.states)) {
                // Filter out invalid or incomplete data
                const flightData = response.data.states
                    .filter(state => 
                        state && 
                        state[5] && state[6] && // Has valid coordinates
                        !isNaN(state[5]) && !isNaN(state[6]) && // Coordinates are numbers
                        state[5] >= -180 && state[5] <= 180 && // Valid longitude
                        state[6] >= -90 && state[6] <= 90 && // Valid latitude
                        // Apply baroAlt filter if set
                        (!altitudeRange.min || (state[7] && state[7] >= altitudeRange.min)) &&
                        (!altitudeRange.max || (state[7] && state[7] <= altitudeRange.max))
                    )
                    .map(state => ({
                        id: state[0] || 'unknown', // icao24
                        callsign: state[1]?.trim() || 'N/A',
                        origin_country: state[2]|| 'N/A',
                        latitude: Number(state[6]),
                        longitude: Number(state[5]),
                        baroAlt: Math.round(state[7] || 0),
                        geomAlt: Math.round(state[13] || 0),
                        true_track: Number(state[10] || 0),
                        velocity: Math.round((state[9] || 0) * 3.6), // Convert m/s to km/h
                        verticalRate: Math.round(state[11] || 0),
                        onGround: Boolean(state[8]),
                        lastContact: state[4]
                    }));

                console.log(`Fetched ${flightData.length} valid flights`);
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
    }, [region, altitudeRange]);

    useEffect(() => {
        let isMounted = true;
        
        const fetchData = async () => {
            if (isMounted) {
                await fetchFlights();
            }
        };

        fetchData();

        // Set up interval for fetching every 2 minutes
        const interval = setInterval(fetchData, 120000); // 2 minutes in milliseconds

        // Cleanup on component unmount
        return () => {
            isMounted = false;
            clearInterval(interval);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [region, altitudeRange, fetchFlights]); // Re-run effect when region or baroAlt range changes

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
                        altitudeRange={altitudeRange}
                        setAltitudeRange={setAltitudeRange}
                    />
                </div>
                {flights && flights.map((flight) => {
                    if (flight.latitude && flight.longitude) {                     
                        return (
                            <Marker
                                key={flight.id}
                                position={[flight.latitude, flight.longitude]}
                                icon={planeIcon}
                                rotationAngle={flight.true_track}
                                rotationOrigin="center"
                            >
                                <Popup className="leaflet-popup" style={{ width: '20px' }}>
                                    <div>
                                        <h3>Flight number: {flight.callsign}</h3>
                                        <p>From: {flight.origin_country}</p>
                                        <p>Latitude: {flight.latitude.toFixed(4)}°</p>
                                        <p>Longitude: {flight.longitude.toFixed(4)}°</p>
                                        <p>Direction: {flight.true_track.toFixed(1)}°</p>
                                        <p>Barometric Altitude: {flight.baroAlt} m</p>
                                        <p>Geometric Altitude: {flight.geomAlt} m</p>
                                        <p>Ground Speed: {flight.velocity} km/h</p>
                                        <p style={{ color: flight.verticalRate > 0 ? 'blue' : flight.verticalRate < 0 ? 'green' : 'black'}}>
                                            Vertical Rate: {flight.verticalRate ? flight.verticalRate.toFixed(2) : '0'} m/s
                                            {(flight.verticalRate > 0 ? " (ascending)" : flight.verticalRate < 0 ? " (descending)" : " (cruising)")}
                                        </p>
                                        <p>Status: {flight.onGround ? 'On Ground' : 'In Air'}</p>
                                        <p>Last Contact: {new Date(flight.lastContact * 1000).toLocaleString()}</p>
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