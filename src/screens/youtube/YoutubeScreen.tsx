import React, { useMemo, useEffect, useState, useCallback } from "react";
import {
  Image,
  View,
  Dimensions,
  ScrollView,
  FlatList,
  SafeAreaView,
  Linking,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import styled from "styled-components/native";

/**
 * ? Local Imports
 */
import RNBounceable from "@freakycoder/react-native-bounceable";
import fonts from "@fonts";
import createStyles from "./YoutubeScreen.style";
import { YoutubeAPI } from "@api";
import { CHANNEL_IDS } from "../../services/api/api.constant";
import { subcontents } from "./mock";

const screenWidth = Dimensions.get("screen").width;

interface State {
  youtube: Youtube[];
}

interface Youtube {
  title: string;
  desc: string;
  thumb: string;
  url: string;
}

const YoutubeScreen = () => {
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);

  const [state, setState] = useState<State>({
    youtube: [],
  });

  useEffect(() => {
    const init = async () => {
      const YT = new YoutubeAPI();
      let res = [];
      for (let i = 0; i < CHANNEL_IDS.length; i++) {
        const data = await YT.getChannelInfo(CHANNEL_IDS[i].id);

        res.push({
          title: data.items[0].snippet.title,
          desc: data.items[0].snippet.description,
          thumb: data.items[0].snippet.thumbnails.default.url,
          url: data.items[0].id,
        });
      }
      setState({ youtube: res });
    };
    init();
  }, []);

  const Container = styled.View`
    padding: 20px 20px 0 20px;
  `;

  const Title = styled.Text`
    font-family: ${fonts.notosans.medium};
    font-size: 18px;
    color: ${colors.text};
    margin-right: 6px;
  `;

  const Subtitle = styled.Text`
    font-family: ${fonts.notosans.light};
    font-size: 14px;
    color: ${colors.subtitle};
  `;

  const TitleContainer = styled.View`
    flex-direction: row;
    align-items: baseline;
    margin-bottom: 12px;
  `;

  const Contents = styled.View`
    flex-direction: column;
    margin-bottom: 20px;
  `;

  const Content = styled(RNBounceable)`
    flex-direction: row;
    align-items: center;
    background: ${colors.content};
    border-radius: 24px;
    padding: 18px;
    margin-bottom: 14px;
  `;

  const ContentTitleContainer = styled.View`
    margin-left: 16px;
    flex-direction: column;
    justify-content: space-between;/
  `;

  const ContentTitle = styled.Text`
    font-family: ${fonts.notosans.regular};
    font-size: 16px;
    color: ${colors.text};
    margin-right: 8px;
  `;

  const ContentSubTitle = styled.Text`
    font-family: ${fonts.notosans.regular};
    font-size: 12px;
    color: ${colors.subtitle};
    width: ${screenWidth - 144}px;
  `;

  const Box = styled.Pressable`
    margin-right: 10px;
    margin-bottom: 10px;
    width: ${Math.round((screenWidth - 40) / 2) - 10}px;
  `;

  const BoxImage = styled.Image`
    width: ${Math.round((screenWidth - 40) / 2) - 10}px;
    height: 100px;
    border-radius: 10px;
  `;

  const BoxTitle = styled.Text`
    margin-top: 4px;
    font-family: ${fonts.notosans.regular};
    font-size: 16px;
    color: ${colors.text};
  `;

  const BoxChannel = styled.Text`
    font-family: ${fonts.notosans.regular};
    font-size: 12px;
    color: ${colors.subtitle};
  `;

  const renderHeader = () => {
    return (
      <View>
        <TitleContainer>
          <Title>YouTube</Title>
          <Subtitle>침투부 채널</Subtitle>
        </TitleContainer>
        <Contents>
          {state.youtube.map((item) => {
            return (
              <Content
                key={item.title}
                onPress={() => {
                  openUrl(
                    "vnd.youtube://user/channel/",
                    "https://www.youtube.com/channel/",
                    item.url,
                  );
                }}
              >
                <Image
                  source={{ uri: item.thumb }}
                  style={{ width: 52, height: 52, borderRadius: 30 }}
                />
                <ContentTitleContainer>
                  <ContentTitle>{item.title}</ContentTitle>
                  <ContentSubTitle>{item.desc}</ContentSubTitle>
                </ContentTitleContainer>
              </Content>
            );
          })}
        </Contents>
        <TitleContainer>
          <Title>Sub Contents</Title>
          <Subtitle>침착맨의 외부 방송</Subtitle>
        </TitleContainer>
      </View>
    );
  };

  const openUrl = async (appUrl: string, webUrl: string, id: string) => {
    const isValid = await Linking.canOpenURL(appUrl + id);
    const baseUrl = isValid ? appUrl + id : webUrl + id;

    try {
      await Linking.openURL(baseUrl);
    } catch (error) {
      console.log(error);
    }
  };

  const renderContent = ({ item }: any) => {
    return (
      <Box
        onPress={() =>
          openUrl(
            "vnd.youtube://playlist/list/",
            "https://www.youtube.com/playlist?list=",
            item.url,
          )
        }
        style={{
          shadowColor: "#000",
          shadowOffset: {
            width: 2,
            height: 4,
          },
          shadowOpacity: 0.06,
          shadowRadius: 4,
        }}
      >
        <BoxImage source={item.image} />
        <BoxTitle>{item.title}</BoxTitle>
        <BoxChannel>{item.channel}</BoxChannel>
      </Box>
    );
  };

  const renderFooter = () => {
    return <View style={{ padding: 10 }} />;
  };

  return (
    <Container style={styles.container}>
      <FlatList
        nestedScrollEnabled
        data={subcontents}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={(item) => renderContent(item)}
        ListHeaderComponent={() => renderHeader()}
        ListFooterComponent={() => renderFooter()}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
    </Container>
  );
};

export default YoutubeScreen;
