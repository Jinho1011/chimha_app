import { useTheme } from "@react-navigation/native";
import styled from "styled-components/native";

/**
 * ? Local Imports
 */
import fonts from "@fonts";

const theme = useTheme();
const { colors } = theme;

export const Title = styled.Text`
  font-family: ${fonts.notosans.medium};
  font-size: 18px;
  color: ${colors.text};
`;

export const Subtitle = styled.Text`
  font-family: ${fonts.notosans.light};
  font-size: 14px;
  color: ${colors.subtitle};
`;

export const Text = styled.Text`
  font-family: ${fonts.notosans.regular};
  font-size: 16px;
  color: ${colors.text};
`;

export const Subtext = styled.Text`
  font-family: ${fonts.notosans.regular};
  font-size: 12px;
  color: ${colors.subtitle};
`;
