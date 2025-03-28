import { AppBar, Box, Button, Drawer, IconButton, Toolbar, Typography, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { useState, useContext } from 'react';
import { Home, Flight, Map, Info, ConnectingAirports, FlightLand, Brightness4, Brightness7 } from "@mui/icons-material";
import { ColorModeContext } from '../context/ThemeContext';
import { useTheme } from '@mui/material';

const navLinks = [
  { title: 'Home', path: '/',icon: <Home/> },
  { title: 'Flights', path: '/Flights',icon: <Flight/> },
  { title: 'Real-Time Flight Map', path: '/MapFlights',icon: <Map/> },
  { title: 'Planes', path: '/Planes',icon: <ConnectingAirports/> },
  { title: 'Airports', path: '/Airports',icon: <FlightLand/> },
  { title: 'About us', path: '/About',icon: <Info/> }
];

export default function Navbar () {
  const [drawerOpen, toggleDrawer] = useState(false);
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  const handleMenuClick = (event) => {
    toggleDrawer(true);
    event.currentTarget.blur();
  };
  return (
    <>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>

        <Toolbar>

          <IconButton
            size="large"
            color="inherit"
            onClick={handleMenuClick}
            disableRipple
            sx={{ 
              display: { sm: 'block', md: 'none' },
              outline: 'none !important',
              border: 'none !important',
              boxShadow: 'none !important',
              '&:focus': {
                outline: 'none !important',
                border: 'none !important',
                boxShadow: 'none !important',
                backgroundColor: 'transparent'
              },
              '&:hover': {
                backgroundColor: 'transparent'
              }
            }}
            edge="start"
            >
            <MenuIcon/> 
          </IconButton>

          <Typography 
            variant="h6"
            sx = {{ flexGrow: 1}}
            > Flight Management Tool
          </Typography>

          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                {navLinks.map((item) => (
                  <Button
                    color="inherit"
                    key={item.title}
                    component = "a"
                    href = {item.path}
                    >
                    {item.title}
                  </Button>
                ))}
          </Box>

          <IconButton
            color="inherit"
            onClick={colorMode.toggleColorMode}
            sx={{ ml: 2 }}
          >
            {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>

        </Toolbar>

      </AppBar>

      <Drawer
        open={drawerOpen}
        anchor="left"
        onClose={() => toggleDrawer(false)}
        sx={{ display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            width: 250,
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar /> {/* Add spacing below AppBar */}
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {navLinks.map((item) => (
              <ListItem key={item.title} disablePadding>
                <ListItemButton 
                  component="a" 
                  href={item.path}
                  onClick={() => toggleDrawer(false)}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.title} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Box>
      </Drawer>
			
    </>
  );
}