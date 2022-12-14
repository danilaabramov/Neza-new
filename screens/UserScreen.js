import React, { useEffect, useRef, useState, useContext } from "react";
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
  Dimensions,
  Animated,
  Easing
} from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import Setting from "../icons/Setting";
import { Context } from "./Navigation";
import Star from "../icons/Star";
import BarChart from "../icons/BarChart";

import normalize from "../utils/Normalize";
import OneStock from "../components/OneStock";

import { blackTheme, purpleTheme } from "../colors/colors";
import { BlurView } from "rn-id-blurview";
import Bell from "../icons/Bell";
import { useDispatch, useSelector } from "react-redux";
import { fetchPortfolio } from "../redux/portfolioSlice";
import ContentLoader, { Rect } from "react-content-loader/native";
import { url } from "../utils/Client";

const UserScreen = ({ navigation }): Node => {
  const isDarkMode = useColorScheme() === "dark";
  const { width } = Dimensions.get("window");
  const theme = isDarkMode ? blackTheme : purpleTheme;

  const { user, setUser, portfolio } = useContext(Context);

  // const stackStocks = (stocks) => {
  //   let arr = [];
  //   let st = JSON.parse(JSON.stringify(stocks));
  //   for (let i = 0; i < st.length; ++i) {
  //     arr.push(st[i]);
  //     for (let j = i + 1; j < st.length; ++j) {
  //       if (st[i].symbol === st[j].symbol) {
  //         arr[arr.length - 1] = {
  //           symbol: arr[arr.length - 1].symbol,
  //           quantity: arr[arr.length - 1].quantity + st[j].quantity,
  //         };
  //         st.splice(j--, 1);
  //       }
  //     }
  //   }
  //   return arr;
  // };

  const sceenState = useSelector((state) => state.portfolio);
  const dispatch = useDispatch();

  const [p, setP] = useState()
  useEffect(async () => {

    if(!p) {
      //const data = await dispatch(fetchPortfolio({ token: user.token }));
       fetch(url + "/stocks-portfolio", {
        headers: {
          "Content-Type": "application/json",
          "authorization": user.token
        },
      })
        .then((response) => response.json()).then(json =>
         setP(json))
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);


  const translation = useRef(new Animated.Value(0)).current;
  const left = useRef(new Animated.Value(20)).current;
  const mb = useRef(new Animated.Value(0)).current;
  const size = useRef(new Animated.Value(34)).current;

  // useEffect(() => {
  //   Animated.timing(translation, {
  //     toValue: headerShown ? -100 : 0,
  //     duration: 250,
  //     useNativeDriver: true,
  //   }).start();
  // }, [headerShown]);


  const color = "#5C00AB";

  const [X, setX] = useState(230)

  return (
    <View>
      <LinearGradient
        colors={["#361F49", "#2B0348"]}
        start={{ x: 0.0, y: 0.25 }} end={{ x: 1, y: 0.75 }}>

        <View style={{ backgroundColor: theme.topBar, height: "100%" }}>
          <StatusBar
            barStyle={isDarkMode ? "light-content" : "light-content"}
            translucent
            backgroundColor="transparent"
          />


          {/*<LinearGradient*/}
          {/*  colors={["#361F49", "#2B0348"]}*/}
          {/*  start={{ x: 0.0, y: 0.25 }} end={{ x: 1, y: 0.75 }}>*/}
          <LinearGradient
            colors={["#2D1A7A", "rgba(57, 30, 77, 0.632023)", "rgba(110, 48, 112, 0.5)", "rgba(89, 36, 109, 0.697765)", "#4F347C", "#87528F"]}
            start={{ x: -0.2, y: 0.1 }} end={{ x: 0.8, y: 0.9 }} style={{ zIndex: -1 }}>

        <View style={{ zIndex: 1 }}>

              <Animated.View
                style={{ borderBottomEndRadius: 10, borderBottomStartRadius: 10, backgroundColor: color, height: X,
                  transform: [
                    { translateY : translation },
                  ],}}>
                <View style={[styles.shadowProp2, {
                  top: 20,
                  left: 30,
                  height: 110,
                  width: 110,
                  borderRadius: 100,
                  backgroundColor: "#CE00B7",
                  position: "absolute",
                  transform: [{ rotate: "45deg" }],
                  opacity: .2,
                }]} />
                <View style={[styles.shadowProp2, {
                  top: 10,
                  left: width - 300,
                  height: 130,
                  width: 130,
                  borderRadius: 100,
                  backgroundColor: "#CE00B7",
                  position: "absolute",
                  transform: [{ rotate: "45deg" }],
                  opacity: .3,
                }]} />
                <View style={[styles.shadowProp2, {
                  top: 0,
                  left: width - 250,
                  height: 150,
                  width: 150,
                  borderRadius: 100,
                  backgroundColor: "#CE00B7",
                  position: "absolute",
                  transform: [{ rotate: "45deg" }],
                  opacity: .4,
                }]} />
                <View style={[styles.shadowProp2, {
                  top: 10,
                  left: width - 200,
                  height: 200,
                  width: 200,
                  borderRadius: 100,
                  backgroundColor: "#CE00B7",
                  position: "absolute",
                  transform: [{ rotate: "45deg" }],
                  opacity: .5,
                }]} />

                <View style={{
                  top: 0,
                  left: 0,
                  width: width,
                  overflow: "hidden",
                  position: "absolute",
                  borderBottomEndRadius: 10,
                  borderBottomStartRadius: 10,
                  height: X,
                }}>
                  <View style={[styles.shadowProp2, {
                    marginTop: 100,
                    marginLeft: width - 100,
                    height: 150,
                    width: 150,
                    borderRadius: 100,
                    backgroundColor: "#CE00B7",
                    transform: [{ rotate: "45deg" }],
                    opacity: .4,
                  }]} />

                <View style={{
                  marginTop: 170,
                  marginLeft: 20,
                  height: 100,
                  width: 200,
                  borderRadius: 100,
                  backgroundColor: "blue",
                  position: "absolute",
                  opacity: .5,
                }} />
                </View>
              </Animated.View>

              <View style={{ height: 0 }}>
                <Animated.View style={{
                  position: "relative",
                  bottom: X,
                  height: X,
                  borderBottomEndRadius: 10,
                  borderBottomStartRadius: 10,
                  overflow: "hidden",
                  width: "100%",
                  transform: [
                    { translateY : translation },
                  ],

                }}>
                  <BlurView
                    style={{ height: X,
                       }}

                    blurType="light"
                    blurAmount={40}
                    key={Platform.select({ android: Math.random().toString(), ios: "blur" })}
                    overlayColor={Platform.select({ android: "transparent", ios: "rgba(255, 255, 255, .7)" })}
                  />
                </Animated.View>
              </View>



            <View style={{ height: 0, }}>
              <View style={{ height: X, position: "relative", bottom: X }}>
                <View style={{ height: 83.45, justifyContent: "center", marginTop: 30}}>
                  <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
                      <Image style={{
                        height: 46,
                        width: 46,
                        marginLeft: 16,
                        marginRight: 16,
                        borderRadius: 23,
                      }} source={{ uri: user.avatarUrl }}>

                      </Image>

                    </TouchableOpacity>

                    {/*<View style={{ height: 46, justifyContent: "center", width: "100%", marginRight: -121 }}>*/}
                    {/*  <Text style={{ fontSize: normalize(24), color: "#fff", fontWeight: "bold" }}>????????-????????</Text>*/}
                    {/*</View>*/}


                    <View style={{ height: 46, justifyContent: "center", width: "100%", marginRight: -121 }}>
                      <Text style={{ fontSize: 16, color: "#fff" }}>A????????</Text>
                      <Text style={{
                        fontSize: 16,
                        color: "#fff",
                        fontWeight: "bold",
                      }}>{user.stocksBalance >= 0 ? user.stocksBalance.toFixed(2) : 0} $ </Text>
                    </View>

                    <TouchableOpacity onPress={() => navigation.navigate("Bell")} style={{ justifyContent: "center" }}>
                      <Bell color={"white"} />
                    </TouchableOpacity>

                  </View>
                </View>

                <Animated.View style={{height: mb, width }}></Animated.View>
                <Animated.View style={{ transform: [
                    { translateY : translation },
                  ], height: 46, justifyContent: "center", width: "100%", marginLeft: left, marginTop: 40   }}>
                  <Text style={{ fontSize: 16, color: "#fff" }}>????????????</Text>
                  <Animated.Text style={{
                    fontSize: size,
                    color: "#fff",
                    fontWeight: "bold",
                  }}>{user.currencyBalance >= 0 ? user.currencyBalance.toFixed(2) : 0} $</Animated.Text>
                </Animated.View>
              </View>
            </View>
        </View>
            {/*<View style={{height: 67}}/>*/}
            {/*<View style={{ marginTop: -67, marginBottom: -25, alignItems: "center" }}>*/}
            {/*  <View style={[styles.shadowProp, {*/}
            {/*    backgroundColor: theme.backgroundItem,*/}
            {/*    height: 92,*/}
            {/*    width: 348,*/}
            {/*    borderRadius: 20,*/}
            {/*    flexDirection: "row",*/}
            {/*  }]}>*/}

            {/*    <View style={{ height: "100%", width: "50%" }}>*/}
            {/*      <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 16 }}>*/}
            {/*        <View style={{ width: 0, position: "relative", right: 32 }}>*/}
            {/*          <Star />*/}
            {/*        </View>*/}
            {/*        <View style={{ justifyContent: "center" }}>*/}
            {/*          <Text style={{ color: theme.color, fontSize: 15 }}>??????????????????</Text>*/}
            {/*        </View>*/}
            {/*      </View>*/}
            {/*      <Text style={{*/}
            {/*        fontSize: 24,*/}
            {/*        color: theme.color,*/}
            {/*        fontWeight: "bold",*/}
            {/*        textAlign: "center",*/}
            {/*      }}>{user.currencyBalance >= 0 ? user.currencyBalance.toFixed(2) : 0}</Text>*/}
            {/*    </View>*/}
            {/*    <View style={{*/}
            {/*      borderWidth: .5,*/}
            {/*      borderColor: "#48494C",*/}
            {/*      marginTop: 16,*/}
            {/*      marginBottom: 16,*/}
            {/*    }} />*/}
            {/*    <View style={{ height: "100%", width: "50%" }}>*/}
            {/*      <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 16 }}>*/}
            {/*        <View style={{ width: 0, position: "relative", right: 32 }}>*/}
            {/*          <BarChart />*/}
            {/*        </View>*/}
            {/*        <View style={{ justifyContent: "center" }}>*/}
            {/*          <Text style={{ color: theme.color, fontSize: 15 }}>??????????</Text>*/}
            {/*        </View>*/}
            {/*      </View>*/}
            {/*      <Text style={{*/}
            {/*        fontSize: 24,*/}
            {/*        color: theme.color,*/}
            {/*        fontWeight: "bold",*/}
            {/*        textAlign: "center",*/}
            {/*      }}>{user.stocksBalance >= 0 ? user.stocksBalance.toFixed(2) : 0}</Text>*/}
            {/*    </View>*/}

            {/*  </View>*/}
            {/*</View>*/}


            <ScrollView onScroll={(event) => {
              const scrolling = event.nativeEvent.contentOffset.y;

              if  (scrolling > 0 &&  scrolling <= 120 ) {
                Animated.timing(translation, {
                  toValue: -scrolling,
                  duration: 0,
                  useNativeDriver: false,
                  easing: Easing.linear,
                }).start();
                Animated.timing(left, {
                  toValue: 20 + scrolling * 1.5,
                  duration: 0,
                  useNativeDriver: false,
                  easing: Easing.linear,
                }).start();
                Animated.timing(mb, {
                  toValue: scrolling / 8,
                  duration: 0,
                  useNativeDriver: false,
                  easing: Easing.linear,
                }).start();
                Animated.timing(size, {
                  toValue: 34 - scrolling / 6.666,
                  duration: 0,
                  useNativeDriver: false,
                  easing: Easing.linear,
                }).start();
              }
              else
              if (scrolling > 0) {
                Animated.timing(translation, {
                  toValue: -120,
                  duration: 0,
                  useNativeDriver: false,
                  easing: Easing.linear,
                }).start();
                Animated.timing(left, {
                  toValue: 200 ,
                  duration: 0,
                  useNativeDriver: false,
                  easing: Easing.linear,
                }).start();
                Animated.timing(mb, {
                  toValue:  15,
                  duration: 0,
                  useNativeDriver: false,
                  easing: Easing.linear,
                }).start();
                Animated.timing(size, {
                  toValue: 16,
                  duration: 0,
                  useNativeDriver: false,
                  easing: Easing.linear,
                }).start();
              }
              else {
                Animated.timing(translation, {
                  toValue: 0,
                  duration: 0,
                  useNativeDriver: false,
                  easing: Easing.linear,
                }).start();
                Animated.timing(left, {
                  toValue: 20,
                  duration: 0,
                  useNativeDriver: false,
                  easing: Easing.linear,
                }).start();
                Animated.timing(mb, {
                  toValue: 0,
                  duration: 0,
                  useNativeDriver: false,
                  easing: Easing.linear,
                }).start();
                Animated.timing(size, {
                  toValue: 34,
                  duration: 0,
                  useNativeDriver: false,
                  easing: Easing.linear,
                }).start();
              }
            }}
                        scrollEventThrottle={16}

              showsVerticalScrollIndicator={false}
              style={{ backgroundColor: theme.bottomBar, minHeight: "100%",
                marginTop: -320, zIndex: 0
              }}
            >



              {/*<View style={{ marginTop: 55, marginLeft: 24 }}>*/}
              {/*  <Text style={{ fontWeight: "bold", color: "white", fontSize: 24 }}>????????????</Text>*/}
              {/*</View>*/}

              {/*<View style={{ alignItems: "center", marginHorizontal: 16, marginTop: 15 }}>*/}
              {/*  <View*/}
              {/*    style={[styles.shadowProp, { width: "100%", height: 323, backgroundColor: "white", borderRadius: 10 }]}>*/}

              {/*  </View>*/}
              {/*</View>*/}

              <View style={{ marginTop: 340, marginLeft: 24 }}>
                <Text style={{ fontWeight: "bold", color: "white", fontSize: 24 }}>????????????????</Text>
              </View>
              {
                !p ?
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
                      (portfolio ? portfolio : p).map((item, index) => {
                        return (
                          <View key={index}>
                            {
                              item.quantity > 0.0 &&
                              <OneStock navigation={navigation} stock={item} />
                            }
                          </View>

                        );
                      })
                    }
                  </View>
              }

              <View style={{ height: Platform.OS === "ios" ? 240 : 240}} />

            </ScrollView>

            {/*</LinearGradient>*/}
          </LinearGradient>

        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  shadowProp: {
    shadowColor: "#48494C",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },

  shadowProp2: {
    // shadowColor: "#CE00B7",
    // shadowOffset: { width: -100, height: 50 },
    // shadowOpacity: 1,
    // shadowRadius: 50,
  },

});

export default UserScreen;
