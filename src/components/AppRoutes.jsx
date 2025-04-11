import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home.jsx';
import Flights from '../Flights/Flights.jsx';
import MapFlights from '../pages/MapFlights.jsx';
import Planes from '../Planes/Planes.jsx';
import Airports from '../Airports/Airports.jsx';
import About from '../pages/About.jsx';
import CreateNewPlane from '../Planes/CreateNewPlane.jsx';
import DetailPlane from '../Planes/DetailPlane.jsx';
import UpdatePlaneForm from '../Planes/UpdatePlaneForm.jsx';
import CreateNewAirportForm from '../Airports/CreateNewAirportForm.jsx';
import PaginatedAirports from '../Airports/PaginatedAirports.jsx';
import DetailAirport from '../Airports/DetailAirport.jsx';
import UpdateAirportForm from '../Airports/UpdateAirportForm.jsx';
import CreateNewFlightForm from '../Flights/CreateNewFlightForm.jsx';
import DetailFlight from '../Flights/DetailFlight.jsx';
import UpdateFlightForm from '../Flights/UpdateFlightForm.jsx';

// Routes configuration object
export const routeConfig = {
  home: {
    path: "/",
    element: Home
  },
  flights: {
    path: "/flights",
    element: Flights,
    create: {
      path: "/flights/create",
      element: CreateNewFlightForm
    },
    detail: {
      path: "/flights/detail/:id",
      element: DetailFlight
    },
    update: {
      path: "/flights/update/:id",
      element: UpdateFlightForm
    }
  },
  mapFlights: {
    path: "/mapFlights",
    element: MapFlights
  },
  planes: {
    path: "/planes",
    element: Planes,
    create: {
      path: "/planes/create",
      element: CreateNewPlane
    },
    detail: {
      path: "/planes/detail/:id",
      element: DetailPlane
    },
    update: {
      path: "/planes/update/:id",
      element: UpdatePlaneForm
    }
  },
  airports: {
    path: "/airports",
    element: Airports,
    create: {
      path: "/airports/create",
      element: CreateNewAirportForm
    },
    paginated: {
      path: "/airports/paginated",
      element: PaginatedAirports
    },
    detail: {
      path: "/airports/detail/:id",
      element: DetailAirport
    },
    update: {
      path: "/airports/update/:id",
      element: UpdateAirportForm
    }
  },
  about: {
    path: "/about",
    element: About
  }
};

// Map route config to Route components
const createRoutes = (config) => {
  const routes = [];
  
  // Process a single route entry
  const processRoute = (route, path) => {
    if (route.element) {
      const Element = route.element;
      routes.push(<Route key={path} path={path} element={<Element />} />);
    }
  };
  
  // Process all routes recursively
  const processConfig = (config, parentPath = '') => {
    Object.entries(config).forEach(([key, route]) => {
      // Skip non-object properties
      if (typeof route !== 'object' || !route) return;
      
      // If it has a path property, it's a route
      if (route.path) {
        processRoute(route, route.path);
      }
      
      // Process nested routes (except element which is a component reference)
      Object.entries(route).forEach(([nestedKey, nestedValue]) => {
        if (nestedKey !== 'path' && nestedKey !== 'element' && typeof nestedValue === 'object') {
          processConfig({ [nestedKey]: nestedValue });
        }
      });
    });
  };
  
  processConfig(config);
  return routes;
};

const AppRoutes = () => {
  return (
    <Routes>
      {createRoutes(routeConfig)}
    </Routes>
  );
};

export default AppRoutes;
