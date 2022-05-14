import { useTheme } from "@react-navigation/native";
import React from "react";
import { FlatList } from "react-native";
import styled from "styled-components/native";
/**
 * ? Local Imports
 */
import Header from "./components/Header";
import Content from "./components/Content";
import WEBTOONS from "./mock";

const WebtoonScreen = () => {
  const theme = useTheme();
  const { colors } = theme;

  const Container = styled.View`
    padding: 20px 20px 0 20px;
    flex: 1;
    flex-direction: column;
    background-color: ${colors.background};
  `;

  return (
    <Container>
      <FlatList
        data={WEBTOONS}
        renderItem={({ item }) => <Content item={item} />}
        ListHeaderComponent={() => <Header />}
        numColumns={2}
        columnWrapperStyle={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
    </Container>
  );
};

export default WebtoonScreen;
