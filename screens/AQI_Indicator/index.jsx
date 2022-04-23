import { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const tips = {
  Good: [
    "Air Quality is good",
    "Little to no risk from pollution",
    "Can go outside without masks",
  ],
  Moderate: [
    "Air Quality is acceptable",
    "Risk to people sensitive to Air Pollution",
    "Can go outside without masks",
  ],
  Satisfactory: [
    "Air Quality is satisfactory",
    "People sensitive to Air Pollution might experience health effects",
    "General public can go outside without masks but sensitive people should wear a mask",
  ],
  Unhealthy: [
    "Air Quality is bad",
    "Senstive people should avoid going outside",
    "Wearing a mask is recommended for everyone",
  ],
  "Very Unhealthy": [
    "Air Quality is very bad",
    "Long term exposure can lead to health effects in everyone",
    "Wearing a mask is necessary",
  ],
  Hazardous: [
    "Air Quality is hazardous",
    "Everyone can have health effects from short term exposure",
    "Going outside is not recommended for everyone",
  ],
};

export default function AQI_Indicator({ data }) {
  const [aq, setAq] = useState("Good");

  function classifyAQI() {
    if (data <= 50) setAq("Good")
    else if (data >= 51 && data <= 100) setAq("Moderate")
    else if (data >= 101 && data <= 150) setAq("Satisfactory")
    else if (data >= 151 && data <= 200) setAq("Unhealthy")
    else if(data >=201 && data <=300) setAq("Very Unhealthy")
    else setAq("Hazardous")
  }

  useEffect(() => {
    classifyAQI();
  }, []);

  if(aq === null){
      return (
          <View>
              <Text>Loading</Text>
          </View>
      )
  }
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor:
            data <= 50
              ? "#2ed573"
              : data >= 51 && data <= 100
              ? "#f1c40f"
              : data >= 101 && data <= 150
              ? "#f39c12"
              : data >= 151 && data <= 200
              ? "#e74c3c"
              : data >= 201 && data <= 300
              ? "#8854d0"
              : "#800000",
        },
      ]}
    >
      <View style={styles.aqiContainer}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "15%",
          }}
        >
          <Ionicons name="navigate-outline" size={24} color="#fff" />
          <Text style={[styles.aqiText, { fontSize: 24, marginLeft: "2%" }]}>
            New Delhi
          </Text>
        </View>
        <Text style={[styles.aqiText, { fontWeight: "bold" }]}>{Math.floor(data)}</Text>
        <Text style={styles.aqiText}>{aq}</Text>
      </View>
      <View style={styles.tipsContainer}>
        <View style={styles.internalTipsContainer}>
          <View style={styles.tipContainer}>
            <Ionicons
              name="flag-outline"
              size={32}
              color="#fff"
              style={{ marginBottom: "5%" }}
            />
            <Text style={styles.tipText}>{tips[aq][0]}</Text>
          </View>
          <View style={styles.tipContainer}>
            <Ionicons
              name="medkit-outline"
              size={32}
              color="#fff"
              style={{ marginBottom: "5%" }}
            />
            <Text style={styles.tipText}>{tips[aq][1]}</Text>
          </View>
          <View style={styles.tipContainer}>
            <Ionicons
              name="home-outline"
              size={32}
              color="#fff"
              style={{ marginBottom: "5%" }}
            />
            <Text style={styles.tipText}>{tips[aq][2]}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: "8%",
  },
  aqiContainer: {
    padding: "5%",
    justifyContent: "center",
    alignItems: "center",
    flex: 0.4,
  },
  aqiText: {
    fontSize: 64,
    color: "#fff",
    fontWeight: "300",
    textAlign: 'center'
  },
  tipsContainer: {
    flex: 0.6,
    justifyContent: "center",
    alignItems: "center",
  },
  internalTipsContainer: {
    borderTopWidth: 5,
    borderBottomWidth: 5,
    borderColor: '#fff',
    width: "80%",
    height: "80%",
    justifyContent: "center",
  },
  tipContainer: {
    // flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  tipText: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
  },
});
