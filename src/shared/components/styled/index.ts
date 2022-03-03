import React from "react";
import styled from "styled-components/native";

/**
 * ? Local Imports
 */
import fonts from "@fonts";

export const Title = styled.Text<{ color?: string }>`
  font-family: ${fonts.notosans.medium};
  font-size: 18px;
  color: ${(props) => props.color};
`;

export const Subtitle = styled.Text<{ color?: string }>`
  font-family: ${fonts.notosans.light};
  font-size: 14px;
  color: ${(props) => props.color};
`;

export const Text = styled.Text<{ color?: string }>`
  font-family: ${fonts.notosans.regular};
  font-size: 16px;
  color: ${(props) => props.color};
`;

export const Subtext = styled.Text<{ color?: string }>`
  font-family: ${fonts.notosans.regular};
  font-size: 12px;
  color: ${(props) => props.color};
`;
