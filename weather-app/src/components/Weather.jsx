import React, { useCallback, useEffect, useState } from "react";
import Search from "./Search";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Container, Typography } from "@mui/material";

export default function Weather() {
  const [weatherData, setWeatherData] = useState({
    name: "",
    country: "",
    date: "",
    temp: "",
    feelsLike: "",
    description: "",
    wind: "",
    humidity: "",
  });
  const [searchText, setSearchtext] = useState("Toronto");

  useEffect(() => {
    fetchWeatherData("Toronto");
  }, []);

  const fetchWeatherData = useCallback(
    async (searchText) => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${searchText}&appid=b131a99a41338a6ee3dd0771520cdf9d`
        );
        const data = await response.json();
        setWeatherData({
          name: data.name,
          country: data.sys.country,
          temp: data.main.temp,
          feelsLike: data.main.feels_like,
          description: data.weather[0].description,
          wind: data.wind.speed,
          humidity: data.main.humidity,
        });
      } catch (e) {
        console.log(e);
      }
    },
    [searchText]
  );

  const onSearchClick = async () => {
    fetchWeatherData(searchText);
  };

  return (
    <>
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyItems: "space-between",
        }}
      >
        <Typography variant="h4">Weather App</Typography>
        <Search
          searchText={searchText}
          setSearchtext={setSearchtext}
          onSearchClick={onSearchClick}
        />
        <Card
          sx={{
            backgroundColor: "rgb(132 188 242)",
            minHeight: "300px",
          }}
        >
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="h4" sx={{ margin: 2 }}>
              {weatherData.name}, {weatherData.country}
            </Typography>
            <Typography variant="h3">{weatherData.temp}</Typography>
            <Typography variant="h6">
              Feels Like : {weatherData.feelsLike}
            </Typography>
            <Typography variant="h5" sx={{ margin: 5 }}>
              {weatherData.description}
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
