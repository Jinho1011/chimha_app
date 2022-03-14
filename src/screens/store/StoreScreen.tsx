import React from "react";
import { Image, Dimensions, Linking } from "react-native";
import { useTheme } from "@react-navigation/native";
import styled from "styled-components/native";
/**
 * ? Local Imports
 */
// import { subcontents } from "./mock";
import { Title, Subtitle, Text, Subtext } from "../../shared/components/styled";
import { stores } from "./mock";
import fonts from "@fonts";

const screenWidth = Dimensions.get("screen").width;

const StoreScreen = () => {
  const theme = useTheme();
  const { colors } = theme;

  const Container = styled.View`
    padding: 20px 20px 0 20px;
    flex: 1;
    flex-direction: column;
    background-color: ${colors.background};
  `;

  const TitleContainer = styled.View`
    flex-direction: row;
    align-items: baseline;
    margin-bottom: 12px;
  `;

  const Contents = styled.View`
    flex-direction: column;
    margin-bottom: 30px;
  `;

  const Content = styled.Pressable`
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

  const openUrl = async (url: string) => {
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <TitleContainer>
        <Title color={colors.text} style={{ marginRight: 8 }}>
          Store
        </Title>
        <Subtitle color={colors.subtitle}>한국인이면 제발</Subtitle>
      </TitleContainer>
      <Contents>
        {stores.map((store, index) => {
          return (
            <Content
              onPress={() => {
                openUrl(store.link);
              }}
              key={index}
            >
              <Image
                source={store.image}
                style={{ width: 52, height: 52, borderRadius: 30 }}
              />
              <ContentTitleContainer>
                <ContentTitle>{store.name}</ContentTitle>
                <ContentSubTitle>{store.desc}</ContentSubTitle>
              </ContentTitleContainer>
            </Content>
          );
        })}
      </Contents>
    </Container>
  );
};

export default StoreScreen;
