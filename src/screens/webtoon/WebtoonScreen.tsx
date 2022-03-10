import React, { useMemo } from "react";
import { View, Linking, FlatList } from "react-native";
import { useTheme } from "@react-navigation/native";
import styled from "styled-components/native";

/**
 * ? Local Imports
 */
import { Title, Subtitle, Text, Subtext } from "../../shared/components/styled";
import WEBTOONS from "./mock";
import Header from "./components/Header";
import Content from "./components/Content";

interface Webtoon {
  titleId: string;
  title: string;
  desc: string;
  image: any;
}

const openUrl = async (appUrl: string, webUrl: string) => {
  const isValid = await Linking.canOpenURL(appUrl);
  const baseUrl = isValid ? appUrl : webUrl;

  try {
    await Linking.openURL(baseUrl);
  } catch (error) {
    console.log(error);
  }
};

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

//
// fb455753897775430://webtoon/list?titleId=

export default WebtoonScreen;
