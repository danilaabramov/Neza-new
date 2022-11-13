import React, { useContext, useEffect, useState } from "react";
import type { Node } from "react";
import LinearGradient from "react-native-linear-gradient";
import {
  Alert, Button, Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text, TouchableOpacity,
  useColorScheme,
  View,
  Platform,
  PixelRatio,
  Dimensions,
  AsyncStorage,
} from "react-native";
import normalize from "../utils/Normalize";
import HomeScreen from "../screens/HomeScreen";
import { url } from "../utils/Client";
import { useDispatch, useSelector } from "react-redux";
import { fetchStock } from "../redux/stocksSlice";
import ContentLoader, { Rect } from "react-content-loader/native";

import { blackTheme, purpleTheme } from "../colors/colors";


const OneStock = ({ navigation, stock }): Node => {
  const isDarkMode = useColorScheme() === "dark";
  const theme = isDarkMode ? blackTheme : purpleTheme;
  const { width, height } = Dimensions.get("window");


  // const [s, setS] = useState();
  // useEffect(async () => {
  //   const data = await fetch(url + "/stocks/get/" + stock.boardId)
  //     .then((response) => response.json()).then(json =>
  //       json?.symbol && setS(json))
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }, []);

  return (
    <View>


      <TouchableOpacity
        onPress={() => navigation.navigate("Stock",
        {
          symbol: stock.boardId,
          name: stock.shortName,
          volute: stock.volute,
        })}
                        style={[styles.shadowProp, {
                          alignItems: "center",
                          marginHorizontal: 16,
                          marginTop: 15,
                        }]}>
        <View
          style={[{
            width: "100%",
            height: 82,
            backgroundColor: theme.backgroundItem,
            borderRadius: 10,
            flexDirection: "row",
            alignItems: "center",
          }]}>

          <Image style={{
            height: 52,
            width: 52,
            marginLeft: 16,
            marginRight: 16,
            borderRadius: 26,
          }} source={{ uri: stock.imageUrl }} />
          <View style={{ width: width - 230 }}>
            <Text numberOfLines={1}
                  style={{ color: theme.color, fontSize: normalize(15), fontWeight: "bold" }}>{stock.boardId}</Text>
            <Text numberOfLines={1} style={{ color: "#777684", fontSize: normalize(13) }}>{stock.shortName}</Text>
          </View>
          <View style={{ width: 100 }}>
            <Text numberOfLines={1} style={{
              color: theme.color,
              fontSize: normalize(16),
              textAlign: "right",
            }}>{stock.totalCost + (stock.volute === "usd" ? " $" : stock.volute === "rub" ? "₽" : "")}</Text>
            <Text numberOfLines={1} style={{
              color: theme.color,
              fontSize: normalize(16),
              textAlign: "right",
            }}>{stock ? "x" + stock.quantity : ""}</Text>

          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },

});

export default OneStock;
