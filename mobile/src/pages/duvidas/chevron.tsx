import React from "react";
import { StyleSheet } from "react-native";
import { Feather as Icon } from "@expo/vector-icons";
import Animated from "react-native-reanimated";
import { mix } from "react-native-redash";

const size = 30;
const styles = StyleSheet.create({
  container: {
    height: size,
    width: size,
    borderRadius: size / 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#82B1B6"
  },
});

interface ChevronProps {
  transition: Animated.Node<number>;
}

export default ({ transition }: ChevronProps) => {
  const rotateZ = mix(transition, Math.PI, 0);
  return (
    <Animated.View
       style={[styles.container, { transform: [{ rotateZ }] }]}
    >
      <Icon name="chevron-down" color="white" size={24} />
    </Animated.View>
  );
};