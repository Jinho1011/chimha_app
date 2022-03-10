import React from "react";
import { useTheme } from "@react-navigation/native";
import styled from "styled-components/native";
import { UseQueryResult } from "react-query";

/**
 * ? Local Imports
 */
import { Text, Subtext } from "../../../shared/components/styled";
import { Channel } from "@shared-interfaces/twitch";
import { BDRZ } from "../mock";

const Bdrz = styled.Pressable`
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const BdrzImage = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 30px;
`;

interface IContent {
  value: UseQueryResult<Channel>;
  openUrl: Function;
}

const Content = ({ value, openUrl }: IContent) => {
  const theme = useTheme();
  const { colors } = theme;

  const bdrz = BDRZ.find((element) => element.id === value.data?.data[0].id);

  return (
    <Bdrz
      onPress={() => {
        openUrl(
          `twitch://stream/${value.data?.data[0].login}`,
          `https://www.twitch.tv/${value.data?.data[0].login}?lang=ko`,
        );
      }}
    >
      <BdrzImage source={{ uri: value.data?.data[0].profile_image_url }} />
      <Text color={colors.text}>{value.data?.data[0].display_name}</Text>
      <Subtext color={colors.subtitle}>
        {bdrz !== undefined ? bdrz.grade : ""}
      </Subtext>
    </Bdrz>
  );
};

export default Content;
