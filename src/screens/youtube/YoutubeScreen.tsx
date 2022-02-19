import React, { useMemo, useEffect, useState } from "react";
import { Image, View, Dimensions } from "react-native";
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

const screenWidth = Dimensions.get("screen").width;

interface State {
  youtube: Youtube[];
}

interface Youtube {
  title: string;
  desc: string;
  thumb: string;
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
        });
      }
      setState({ youtube: res });
    };
    init();
  }, []);

  const Component = styled.View`
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

  const Box = styled.Pressable``;

  return (
    <View style={styles.container}>
      <Component>
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
                  console.log("Pressed");
                }}
                style={{
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 4,
                  },
                  shadowOpacity: 0.06,
                  shadowRadius: 4,
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
      </Component>
      <Component>
        <TitleContainer>
          <Title>Sub Contents</Title>
          <Subtitle>침착맨의 외부 방송</Subtitle>
        </TitleContainer>
        <Contents></Contents>
      </Component>
    </View>
  );
};

export default YoutubeScreen;
