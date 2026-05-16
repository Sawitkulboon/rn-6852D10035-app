import { router } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";


export default function Index() {
  // หน่วงเวลา 3 วินาที แล้วนําไปหน้า taxi_fare
  useEffect(() => {
    const timeout = setTimeout(() => {
      router.replace("/taxi_fare");
    }, 3000);
    return () => clearTimeout(timeout);
  }, []);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        source={require("@/assets/images/taxi.png")}
        style={{ width: 150, height: 150, marginBottom: 20 }}
      />
      <Text style={styles.txt}>Taxi Fare Calculator</Text>
      <Text style={styles.txt1}>คำนวณค่าโดยสารแท็กซี่</Text>
      <ActivityIndicator
        size="large"
        color="#1cbe17"
        style={{ marginTop: 20 }}
      />

      {/* จัดตำแหน่งให้ข้อความในนี้อยู่ด้านล่างสุดตรงกลาง */}
      <View style={{ position: "absolute", bottom: 60, alignItems: "center" }}>
        <Image
          source={require("@/assets/images/sawit.jpg")}
          style={styles.img}
        />
        <Text style={styles.txt2}>พัฒนาโดย</Text>
        <Text style={[styles.txt2, { marginTop: 5 }]}>6852D10035 นายสวิตต์ กุลบุญ</Text>
      </View>
    </View>

  );
}
const styles = StyleSheet.create({
  img: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 100,
  },
  txt: {
    fontFamily: "Kanit_700Bold",
    color: "#298bd1",
    fontSize: 25,
  },
  txt1: {
    fontSize: 15,
    fontFamily: "Kanit_400Regular",
    marginTop: 10,
    color: "#298bd1",
  },
  txt2: {
    fontSize: 15,
    fontFamily: "Kanit_400Regular",
    marginTop: 10,
    color: "black",
  },
});
