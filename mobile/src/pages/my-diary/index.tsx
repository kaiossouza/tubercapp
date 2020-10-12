import React, {useRef} from 'react';
import { StyleSheet, Dimensions, Animated } from 'react-native';
import Dot from '../../components/dots';
import Slide from '../../components/slide';
import {
    useFonts,
    Cabin_400Regular
  } from '@expo-google-fonts/cabin';
import { AppLoading } from 'expo';

const {width, height} = Dimensions.get("window");
const slides = [{index: 1}, {index: 2}, {index: 3}, {index: 4}];
const WIDTH_SLIDES_TOTAL = width * slides.length;

const MyDiary = ({ navigation }) => {
    let [fontsLoaded] = useFonts({
        Cabin_400Regular,
    });
    const scroll = useRef(null);
    const scrollX = new Animated.Value(0);
    let position = Animated.divide(scrollX, width);
    if (!fontsLoaded) {
        return <AppLoading />;
    } else {
        return (
            <Animated.View style={styles.screen}>
                <Animated.View style={styles.slider}>
                    <Animated.ScrollView
                        horizontal
                        snapToInterval={width}
                        decelerationRate="fast"
                        showsHorizontalScrollIndicator={false}
                        bounces={false}
                        scrollToOverflowEnabled={true}
                        pagingEnabled={true}
                        scrollEventThrottle={1}
                        onScroll={Animated.event( 
                            [{ nativeEvent: { contentOffset: { x: scrollX, y: new Animated.Value(0) }, }, }, ],
                            {useNativeDriver: true}
                        )}  >
                            {
                                slides.map((slide, index) => (
                                    <Slide  key={index} index={index} navigation={navigation}  />
                            ))}
                    </Animated.ScrollView>
                    <Animated.View style={styles.footer}>
                        <Animated.View style={{...StyleSheet.absoluteFillObject}} />
                        <Animated.View style={styles.footerContent} >
                            <Animated.View style={styles.pagination}>
                                {slides.map((_, index) => (
                                    <Dot key={index} currentIndex={position} {...{ index } }/>
                                ))}
                            </Animated.View>
                        </Animated.View>
                    </Animated.View>
                </Animated.View>
            </Animated.View>
        );
    }
};

export default MyDiary;

const styles = StyleSheet.create({
    divider:{
        height: 3,
        marginBottom: 20,
        marginTop: 20,
    },
    option:{
        fontSize:15,
        marginLeft: 60,
        marginTop: 40,
        fontFamily: 'Cabin_400Regular',
        fontStyle: 'normal',
        marginBottom: 20,
    },
    options:{
        marginTop: 5,
    },
    screen:{
        backgroundColor:'#82B1B6',
        flex: 1,
    },
     pagination: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 40,
        alignContent: 'center',
     },
     card:{
         height: 500,
         marginTop: 20,
     },
     divider2:{
        height: 1,
        marginTop: 20,
        width: 350,
        alignSelf:'center',
        backgroundColor: '#9c9c9c',
    },
    titleFeel:{
        textAlign: 'center',
        fontSize: 20,
        marginTop: 10,
    },
    logo:{
        alignSelf: 'center',
        marginTop: 20
    },
    slider:{
        // height: 0.70 * height,
    },
    footer:{
        flex: 1,
        // width: width * slides.length,
    },
    footerContent:{
        // width: width * slides.length,
        flex: 1,
    },
});