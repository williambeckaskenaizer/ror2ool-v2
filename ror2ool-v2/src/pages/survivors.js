import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  card: {
    display: "flex",
    marginLeft: 30,
    marginRight: 30
  },
  image: {
    width: 210,
    height: 210
  },
  content: {
    padding: 25
  }
}));

export default function SurvivorsPage() {
  const [survivors, setSurvivors] = useState([{}]);
  useEffect(() => {
    axios.get("/survivors").then(res => {
      console.log(res.data);
      setSurvivors(res.data);
    });
  }, []);
  const classes = useStyles();
  let aSurvivor = survivors ? (
    survivors.map((survivor, survivorId) => (
      <Card className={classes.card} key={survivorId}>
        <CardMedia className={classes.image} title="survivor">
          <img className={classes.image} src={survivor.imageUrl} alt="media" />
        </CardMedia>
        <CardContent className={classes.content}>
          <Typography variant="h5" color="primary">
            {survivor.name}
          </Typography>
          <Typography variant="body2" color="primary" display="inline">
            Health:
          </Typography>{" "}
          <Typography variant="body2" color="textSecondary" display="inline">
            {survivor.health}
          </Typography>
          <br />
          <Typography variant="body2" color="primary" display="inline">
            Health Regen:
          </Typography>{" "}
          <Typography variant="body2" color="textSecondary" display="inline">
            {survivor.healthRegen}
          </Typography>
          <br />
          <Typography variant="body2" color="primary" display="inline">
            Damage:
          </Typography>{" "}
          <Typography variant="body2" color="textSecondary" display="inline">
            {survivor.damage}
          </Typography>
          <br />
          <Typography variant="body2" color="primary" display="inline">
            Speed:
          </Typography>{" "}
          <Typography variant="body2" color="textSecondary" display="inline">
            {survivor.speed}
          </Typography>
          <br />
          <Typography variant="body2" color="primary" display="inline">
            Armor:
          </Typography>{" "}
          <Typography variant="body2" color="textSecondary" display="inline">
            {survivor.armor}
          </Typography>
          <br />
          <Typography variant="body2" color="primary" display="inline">
            Unlocked By:
          </Typography>{" "}
          <Typography variant="body2" color="textSecondary" display="inline">
            {survivor.unlock}
          </Typography>
        </CardContent>
      </Card>
    ))
  ) : (
    <Typography>Loading...</Typography>
  );
  return (
    <Grid container justify="center">
      {aSurvivor}
      <Button
      onMouseDown={generateSurvivor()}
      >Generate New Survivor</Button>
    </Grid>
  );
}

function generateSurvivor() {
  const randSurv = {
    name: getString(),
    health: getString(),
    healthRegen: getString(),
    damage: getNum(),
    speed: getString(),
    armor: getNum(),
    unlock: getString(),
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/ror2ool-db.appspot.com/o/image-missing.png?alt=media"
  };
  axios
    .post("https://us-central1-ror2ool-db.cloudfunctions.net/api/add-survivor", randSurv)
    .then(function(response) {
      console.log(response);
    })
    .catch(function(error) {
      console.log(error);
    });
}

function getString() {
  return Math.random()
    .toString(36)
    .slice(2);
}
function getNum() {
  return Math.random();
}
