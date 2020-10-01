// @ts-nocheck
 
import { makeStyles } from '@material-ui/core/styles';
import React, { useState, useEffect } from 'react';
import { getWeather } from '../requests/axios';

const useStyles = makeStyles(() => ({
  widgetWrapper: {
    textAlign: 'center',
    margin: '0 auto',
    color: '#fff',
    padding: 20,
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: 20
  },
}));

export const WeatherWidget = (props) => {
  const classes = useStyles();
  const [requested, setRequested] = useState(false);
  const [weather, setWeather] = useState(false);

  useEffect(() => {
    if (!requested) {
      getWeather().then(r => {
        setRequested(true)
        setWeather(r.data.current);
      });
    }
  });

  return (
    <div className={classes.widgetWrapper}>
      {weather &&
        <div>
          <div className={classes.icon}>
            <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}/>
          </div>
          <div className={classes.description}>{weather.weather[0].description}</div>
          <div className={classes.temp}>{Math.trunc(weather.temp)}ºC</div>
        </div>
      }
    </div>
  );
}
