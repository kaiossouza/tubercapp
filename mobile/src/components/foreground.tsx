import React from "react";
import { View } from "react-native";

const ForegroundBackground = ({ navigation, fgCallback }: { navigation: any, fgCallback: () => void }) => {
    React.useEffect(() => navigation.addListener('focus', () => {
        fgCallback && fgCallback()
    }), []);
    // React.useEffect(() => navigation.addListener('blur', () => {
    //     bgCallback && bgCallback()
    // }), []);
    return (<View/>);
};

export default ForegroundBackground;