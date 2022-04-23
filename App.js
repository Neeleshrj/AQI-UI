import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import AQI_Indicator from "./screens/AQI_Indicator";
import axios from "axios";

const sampleData = [
  [
    34.0, 118.18085229463941, 7.41, 20.1, 27.51, 24.969409862077384, 7.41, 9.64,
    17.17, 1.21, 1.8, 0.15,
  ],
  [15.91, 33.28, 0.46, 2.04, 0.86, 3.7, 0.4, 13.09, 33.05, 0.63, 1.54, 0.12],
  [
    48.62, 89.87, 7.89, 29.51, 28.63, 14.47, 0.98, 6.45, 37.53, 0.71, 31.23,
    3.3424259746198697,
  ],
  [
    38.5, 118.18085229463941, 5.16, 14.8, 15.38, 24.969409862077384, 2.94, 5.45,
    23.45, 0.56, 1.09, 3.3424259746198697,
  ],
  [
    224.1, 374.77, 53.4, 63.96, 80.38, 54.51, 2.04, 16.11, 46.03, 6.37, 51.31,
    2.77,
  ],
  [
    8.77, 20.17, 6.43, 13.0, 19.24, 13.53, 0.36, 3.66, 20.62, 19.85, 15.78,
    1.62,
  ],
  [
    50.82, 135.22, 36.94, 37.73, 67.63, 24.969409862077384, 1.7, 23.54, 43.0,
    1.01, 9.819437239462715, 3.3424259746198697,
  ],
  [
    23.93, 56.52, 1.06, 5.78, 12.73, 2.8, 0.89, 2.75, 47.45, 3.582732874229794,
    9.819437239462715, 3.3424259746198697,
  ],
  [
    42.38, 67.89, 6.82, 23.28, 25.09, 8.31, 0.73, 5.63, 63.0, 3.582732874229794,
    9.819437239462715, 3.3424259746198697,
  ],
  [
    15.89, 52.28, 5.49, 14.77, 11.88, 18.19, 0.45, 4.55, 24.44, 1.26, 1.92,
    0.59,
  ],
];

export default function App() {
  const [data, setData] = useState(null);

  async function getData() {
    console.log("Getting data...");
    var x = Math.floor(Math.random() * (9 - 0) + 0);
    const url =
      "https://ac2f-2401-4900-234d-da40-d0e-b4b8-b0f0-d06b.ngrok.io/aqi";
    await axios
      .post(
        url,
        {
          pm2: sampleData[x][0],
          PM10: sampleData[x][1],
          NO: sampleData[x][2],
          NO2: sampleData[x][3],
          NOx: sampleData[x][4],
          NH3: sampleData[x][5],
          CO: sampleData[x][6],
          SO2: sampleData[x][7],
          O3: sampleData[x][8],
          Benzene: sampleData[x][9],
          Toluene: sampleData[x][10],
          Xylene: 3.14,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((e) => console.log(e));
  }

  useEffect(() => {
    getData();
  }, []);

  if (data === null) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }
  return <AQI_Indicator data={data} />;
}
