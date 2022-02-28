import React from "react";
import { Image, View, Dimensions } from "react-native";
import { useTheme } from "@react-navigation/native";
import styled from "styled-components/native";

/**
 * ? Local Imports
 */
import { Youtube } from "@shared-interfaces/youtube/youtube";
import RNBounceable from "@freakycoder/react-native-bounceable";
import fonts from "@fonts";

interface IHeader {
  youtube: Youtube[];
  openUrl: Function;
}

const screenWidth = Dimensions.get("screen").width;

const Header = ({ youtube, openUrl }: IHeader) => {
  const theme = useTheme();
  const { colors } = theme;

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
    justify-content: space-between;
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

  return (
    <View>
      <TitleContainer>
        <Title>YouTube</Title>
        <Subtitle>침투부 채널</Subtitle>
      </TitleContainer>
      <Contents>
        {youtube.map((item: Youtube) => {
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

export default Header;
