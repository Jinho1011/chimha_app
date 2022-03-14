import React from "react";
import { View, FlatList, Linking } from "react-native";
import { useTheme } from "@react-navigation/native";
import styled from "styled-components/native";
import { useQueries } from "react-query";
/**
 * ? Local Imports
 */
import { getChannelInfo } from "../../services/api/youtube";
import { CHANNEL_IDS } from "../../services/api/api.constant";
import { subcontents } from "./mock";
import Header from "./components/Header";
import Content from "./components/Content";

const YoutubeScreen = () => {
  const theme = useTheme();
  const { colors } = theme;

  const youtubes = useQueries(
    CHANNEL_IDS.map((value, index) => {
      return {
        queryKey: ["youtube", index],
        queryFn: () => getChannelInfo(value.id),
      };
    }),
  );

  const Container = styled.View`
    padding: 20px 20px 0 20px;
    flex: 1;
    flex-direction: column;
    background-color: ${colors.background};
  `;

  const openUrl = async (appUrl: string, webUrl: string, id: string) => {
    const isValid = await Linking.canOpenURL(appUrl + id);
    const baseUrl = isValid ? appUrl + id : webUrl + id;
    console.log(isValid, appUrl + id);

    try {
      await Linking.openURL(baseUrl);
    } catch (error) {
      console.log(error);
    }
  };

  const Footer = () => {
    return <View style={{ padding: 10 }} />;
  };

  return (
    <Container>
      <FlatList
        nestedScrollEnabled
        data={subcontents}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={(item) => <Content item={item.item} openUrl={openUrl} />}
        ListHeaderComponent={() => (
          <Header youtube={youtubes} openUrl={openUrl} />
        )}
        ListFooterComponent={() => <Footer />}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
    </Container>
  );
};

export default YoutubeScreen;
