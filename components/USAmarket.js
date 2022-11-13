import ContentLoader, { Rect } from "react-content-loader/native";
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from "react-native";
import normalize from "../utils/Normalize";
import React, { useContext, useEffect, useState } from "react";
import { blackTheme, purpleTheme } from "../colors/colors";
import { Context } from "../screens/Navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchStocks } from "../redux/stocksSlice";
import type { Node } from "react";
import { url } from "../utils/Client";


const USAmarket = ({navigation}): Node => {


  const isDarkMode = useColorScheme() === "dark";

  const theme = isDarkMode ? blackTheme : purpleTheme

  const { width, height } = Dimensions.get("window");
  const { user, setUser } = useContext(Context);

  const [price, setPrice] = useState();

  const getArray = (data) => {
    let arr = [];
    for (let i = 0; i < Object.keys(data).length; ++i)
      arr.push({
        time: Object.keys(data)[i],
        price: data[Object.keys(data)[i]]["4. close"],
      });
    return arr;
  };

  const sceenState = useSelector((state) => state.stocks);
  const dispatch = useDispatch();

  const [stocks, setStocks] = useState()

  useEffect( async () => {

    if(!stocks) {
      // dispatch(fetchStocks());
      const data = await fetch(url + "/stocks")
        .then((response) => response.json())
        .catch((error) => {
          console.error(error);
        });
      setStocks(data)
    }
  }, []);

  return (
    <View>
      {
        !stocks ?
          <ContentLoader
            speed={1}
            width={width}
            height={580}
            viewBox={`0 0 ${width} ${580}`}
            backgroundColor={theme.backgroundItem}
            foregroundColor={theme.foreground}
          >
            <Rect x="16" y="15" rx="10" ry="10" width={width - 32} height="82" />
            <Rect x="16" y="112" rx="10" ry="10" width={width - 32} height="82" />
            <Rect x="16" y="209" rx="10" ry="10" width={width - 32} height="82" />
            <Rect x="16" y="306" rx="10" ry="10" width={width - 32} height="82" />
            <Rect x="16" y="401" rx="10" ry="10" width={width - 32} height="82" />
            <Rect x="16" y="498" rx="10" ry="10" width={width - 32} height="82" />
          </ContentLoader>
          :
          <View>
            {
              stocks.map((item, index) => {
                return (
                  <TouchableOpacity key={index}
                                    onPress={() => navigation.navigate("Stock", { ...item, volute: 'usd' })}
                                    style={[!isDarkMode && styles.shadowProp, {
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
                      }} source={{ uri: item.imageUrl}} />
                      <View style={{ width: width - 230 }}>
                        <Text numberOfLines={1} style={{
                          color: theme.color,
                          fontSize: normalize(15),
                          fontWeight: "bold",
                        }}>{
                          item.symbol
                        }</Text>
                        <Text numberOfLines={1}
                              style={{ color: "#777684", fontSize: normalize(13) }}>{
                          item.name
                        }</Text>
                      </View>

                      <View style={{ width: 100 }}>
                        <Text numberOfLines={1} style={{
                          color: theme.color,
                          fontSize: normalize(16),
                          textAlign: "right",
                        }}>
                          {Number(JSON.parse(item["timeSeries"])[0]["price"]).toFixed(2)}
                        </Text>
                        {<Text numberOfLines={1} style={{
                            color: ((Number(JSON.parse(item["timeSeries"])[0]["price"]) - Number(JSON.parse(item["timeSeries"])[1]["price"])) / (Number(JSON.parse(item["timeSeries"])[1]["price"]) / 100)) < 0 ? "red" : "green",
                            fontSize: normalize(16), textAlign: "right",
                          }}>{((Number(JSON.parse(item["timeSeries"])[0]["price"]) - Number(JSON.parse(item["timeSeries"])[1]["price"])) / (Number(JSON.parse(item["timeSeries"])[1]["price"]) / 100)).toFixed(2)}%</Text>
                        }
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
          </View>
      }
    </View>
  )
};

const styles = StyleSheet.create({
  shadowProp: {
    shadowColor: "#48494C",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },

});

export default USAmarket
