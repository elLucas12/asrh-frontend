import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

import HomeIcon from "@mui/icons-material/Home";
import AddIcon from "@mui/icons-material/Add";

function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [navValue, setNavValue] = useState(location.pathname);

  function makeNavigation(newNavValue) {
    setNavValue(newNavValue);
    navigate(newNavValue);
  }

  return(
    <Box>
      <BottomNavigation
        showLabels
        value={navValue}
        onChange={(e, newNavValue) => {
          e.preventDefault();
          makeNavigation(newNavValue);
        }}
      >
        <BottomNavigationAction value={"/"} label="Início" icon={<HomeIcon />} />
        <BottomNavigationAction value={"/cadastro"} label="Adicionar" icon={<AddIcon />} />
      </BottomNavigation>
    </Box>
  );
}

export default NavBar;
