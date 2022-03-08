import React from "react";
import { Dimensions } from "react-native";
import { useTheme } from "@react-navigation/native";
import styled from "styled-components/native";

/**
 * ? Local Imports
 */
import fonts from "@fonts";
import { Subcontent } from "@shared-interfaces/youtube/subcontent";

interface IContent {
  item: Subcontent;
  openUrl: Function;
}

const screenWidth = Dimensions.get("screen").width;

const Content = ({ item, openUrl }: IContent) => {
  const theme = useTheme();
  const { colors } = theme;

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

export default Content;
