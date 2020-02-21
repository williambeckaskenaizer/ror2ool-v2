import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

import Link from 'react-router-dom/Link';

import styles from '../styles';

//MUI items

export default function Navbar() {
  return (
    <div>
      <AppBar>
        <Toolbar style={styles.navContainer}>
            <Button component={Link}to="/survivors" color="inherit">Survivors</Button>
            <Button component={Link}to="/items" color="inherit">Items</Button>
            <Button component={Link}to="/enemies" color="inherit">Enemies</Button>
            <Button component={Link}to="/chests" color="inherit">Chests</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
