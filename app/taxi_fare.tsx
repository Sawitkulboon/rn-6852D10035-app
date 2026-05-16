import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const COLORS = {
  primary: "#dbe91c",
  secondary: "#4ECDC4",
  dark: "#2D3436",
  gray: "#F7F9FC",
  white: "#FFFFFF",
  yellow: "#ecd58f",
};

export default function TaxiFare() {
  const [distance, setDistance] = useState("");
const [traffic, setTraffic] = useState("");
const [fare, setFare] = useState(0);

const calculateFare = () => {
  if (distance === "" || traffic === "") {
    Alert.alert("แจ้งเตือน", "กรุณากรอกข้อมูลให้ครบ");
    return;
  }

  let km = parseFloat(distance);
  let trafficMin = parseFloat(traffic);

  if (isNaN(km) || isNaN(trafficMin)) {
    Alert.alert("แจ้งเตือน", "กรุณากรอกตัวเลขเท่านั้น");
    return;
  }

  let total = 35;

  if (km > 1) {
    let remain = km - 1;

    if (remain > 0) {
      let step = Math.min(remain, 9);
      total += step * 6.5;
      remain -= step;
    }

    if (remain > 0) {
      let step = Math.min(remain, 10);
      total += step * 7;
      remain -= step;
    }

    if (remain > 0) {
      let step = Math.min(remain, 20);
      total += step * 8;
      remain -= step;
    }

    if (remain > 0) {
      let step = Math.min(remain, 20);
      total += step * 8.5;
      remain -= step;
    }

    if (remain > 0) {
      let step = Math.min(remain, 20);
      total += step * 9;
      remain -= step;
    }

    if (remain > 0) {
      total += remain * 10.5;
    }
  }

  total += trafficMin * 3;

  setFare(total);
};

const clearData = () => {
  setDistance("");
  setTraffic("");
  setFare(0);
};
  return (
    <>
      <Stack.Screen
        options={{
          title: "Taxi Fare",
          headerStyle: {
            backgroundColor: "#f3e512",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 20,
            fontFamily: "Kanit_700Bold",
            color: "white",

          },
          headerTitleAlign: "center",
          // เอาตัวอักษรลงมาหน่อย
        }}
      />

      <ScrollView style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <Image source={require("@/assets/images/taxi.png")} style={{ width: 150, height: 150 }} />
          <Text style={styles.txt}>คำนวณค่าโดยสารแท็กซี่</Text>
          <Text style={styles.txt1}>ระยะทาง (กิโลเมตร) 🛣️</Text>

          {/* ปุ่มกรอกระยะทาง */}
          <TextInput
            placeholder="กรอกระยะทาง"
            keyboardType="numeric"
            style={styles.input}
            value={distance}
            onChangeText={setDistance}
          />

          {/* ปุ่มกรอกเวลารถติด */}
          <Text style={styles.txt1}>เวลารถติด (นาที) ⏱️</Text>
          <TextInput
            placeholder="กรุณากรอกเวลารถติด"
            keyboardType="numeric"
            style={styles.input}
            value={traffic}
            onChangeText={setTraffic}
          />


          {/* ปุ่มคํานวณค่าโดยสาร */}
          <TouchableOpacity
            onPress={calculateFare}
            style={styles.button}>
            <Text style={styles.buttonText}>คํานวณค่าโดยสาร</Text>
          </TouchableOpacity>

          {/* ปุ่มยกเลิก */}
          <TouchableOpacity
            onPress={clearData}
            style={styles.buttonCancel}>
            <Text style={styles.buttonText}>ยกเลิก</Text>
          </TouchableOpacity>

          {/* กล่องแสดงค่าโดยสาร */}
          <View style={styles.box}>
            <Text style={styles.txt2}>ค่าโดยสารเท็กซี่</Text>
            <Text style={styles.txt3}>{fare.toFixed(2)}</Text>
            <Text style={styles.txt2}>บาท</Text>
          </View>

        </View>
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  txt3: {
    fontSize: 30,
    fontFamily: "Kanit_700Bold",
    marginTop: 10,
    color: "black",
  },
  txt2: {
    fontSize: 15,
    fontFamily: "Kanit_400Regular",
    marginTop: 10,
    color: "black",
  },
  box: {
    marginTop: 15,
    width: "100%",
    backgroundColor: COLORS.yellow,
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
  },
  buttonCancel: {
    marginTop: 15,
    width: "100%",
    backgroundColor: COLORS.secondary,
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
    elevation: 5,
  },
  button: {
    marginTop: 30,
    width: "100%",
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 15,
    alignItems: "center",

    elevation: 5,
  },
  buttonText: {
    fontFamily: "Kanit_700Bold", fontSize: 18, color: COLORS.white
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    // ทำให้ปุ่มกรอกระยะทางเต็มแถว
    width: '100%',
  },
  txt1: {
    width: '100%',
    textAlign: 'left',
    fontSize: 15,
    fontFamily: "Kanit_700Bold",
    marginTop: 10,
    marginBottom: 10,
    color: "black",
  },

  txt: {
    fontFamily: "Kanit_700Bold",
    color: "black",
    fontSize: 25,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
})