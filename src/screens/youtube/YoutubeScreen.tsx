import React, { useMemo, useEffect, useState } from "react";
import { View, FlatList, Linking } from "react-native";
import { useTheme } from "@react-navigation/native";
import styled from "styled-components/native";

/**
 * ? Local Imports
 */
import { State } from "@shared-interfaces/youtube/youtube";
import createStyles from "./YoutubeScreen.style";
import { YoutubeAPI } from "@api";
import { CHANNEL_IDS } from "../../services/api/api.constant";
import { subcontents, dummy } from "./mock";
import Header from "./components/Header";
import Content from "./components/Content";

const YoutubeScreen = () => {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const [state, setState] = useState<State>({
    youtube: [...dummy],
  });

  useEffect(() => {
    const init = async () => {
      const YT = new YoutubeAPI();
      const youtube = await Promise.all(
        CHANNEL_IDS.map(async (value, index) => {
          const data = await YT.getChannelInfo(value.id);
          return {
            title: data.items[0].snippet.title,
            desc: data.items[0].snippet.description,
            thumb: data.items[0].snippet.thumbnails.default.url,
            url: data.items[0].id,
          };
        }),
      );
      setState({ youtube });
    };
    init();
  }, []);

  const Container = styled.View`
    padding: 20px 20px 0 20px;
  `;

  const openUrl = async (appUrl: string, webUrl: string, id: string) => {
    const isValid = await Linking.canOpenURL(appUrl + id);
    const baseUrl = isValid ? appUrl + id : webUrl + id;

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
    <Container style={styles.container}>
      <FlatList
        nestedScrollEnabled
        data={subcontents}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={(item) => <Content item={item.item} openUrl={openUrl} />}
        ListHeaderComponent={() => (
          <Header youtube={state.youtube} openUrl={openUrl} />
        )}
        ListFooterComponent={() => <Footer />}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
    </Container>
  );
};

export default YoutubeScreen;
