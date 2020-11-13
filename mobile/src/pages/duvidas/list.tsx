import React, { useState } from "react";
import { StyleSheet, Text, TouchableWithoutFeedback } from "react-native";
import Animated from "react-native-reanimated";
import { mix, useTransition } from "react-native-redash";
import Chevron from "./chevron";
import Item, { ListItem } from "./listItem";

const { interpolate } = Animated;
const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    backgroundColor: "white",
    padding: 16,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    width: "90%"
  },
  items: {
    overflow: "hidden",
  },
});

export interface List {
  name: string;
  items: ListItem[];
}

interface ListProps {
  list: List;
}

export default ({ list }: ListProps) => {
  const [open, setOpen] = useState(false);
  const transition = useTransition(open);
  var heights: number = 0;
  list.items.forEach(item => {heights = heights + item.height})
  const height = mix(transition, 0, heights * list.items.length);
  const bottomRadius = interpolate(transition, {
    inputRange: [0, 16 / 400],
    outputRange: [8, 0],
  });
  return (
    <>
      <TouchableWithoutFeedback onPress={() => setOpen((prev) => !prev)}>
        <Animated.View
          style={[
            styles.container,
            {
              borderBottomLeftRadius: bottomRadius,
              borderBottomRightRadius: bottomRadius,
            },
          ]}
        >
          <Text style={styles.title}>{list.name}</Text>
          <Chevron {...{ transition }} />
        </Animated.View>
      </TouchableWithoutFeedback>
      <Animated.View style={[styles.items, { height }]}>
        {list.items.map((item : ListItem, key) => (
          <Item
            key={key}
            isLast={key === list.items.length - 1}
            {...{ item }}
            height = {item.height}
          />
        ))}
      </Animated.View>
    </>
  );
};