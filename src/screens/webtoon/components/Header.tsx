import React from "react";
import { View, Dimensions } from "react-native";
import { useTheme } from "@react-navigation/native";
import styled from "styled-components/native";
/**
 * ? Local Imports
 */
import {
  Title,
  Subtitle,
  Text,
  Subtext,
} from "../../../shared/components/styled";

const TitleContainer = styled.View`
  flex-direction: row;
  padding-bottom: 10px;
  align-items: baseline;
`;

const Header = () => {
  const theme = useTheme();
  const { colors } = theme;

  return (
    <TitleContainer>
      <Title color={colors.text} style={{ marginRight: 8 }}>
        Webtoon
      </Title>
      <Subtitle color={colors.subtitle}>이말년 시절 작품활동</Subtitle>
    </TitleContainer>
  );
};

export default Header;
