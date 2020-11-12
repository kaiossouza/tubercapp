import React from "react";
import { StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: "#f4f4f6",
  },
  name: {
    fontSize: 16,
  }
});

export interface ListItem {
  content: string;
  height: number;
}

interface ListItemProps {
  item: ListItem;
  isLast: boolean;
  height: number;
}

export default ({ item, isLast, height }: ListItemProps) => {
  const bottomRadius = isLast ? 8 : 0;
  const heightItem = height;
  const contentStyles = StyleSheet.create({ content: {height: heightItem} })
  return (
    <View
      style={[
        styles.container,
        {
          borderBottomLeftRadius: bottomRadius,
          borderBottomRightRadius: bottomRadius,
        },
        contentStyles.content
      ]}
    >
      <Text style={[styles.name ]}>{item.content}</Text>
    </View>
  );
};