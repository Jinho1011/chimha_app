import React from "react";
import { View, FlatList, ScrollView } from "react-native";
import { useTheme } from "@react-navigation/native";
import styled from "styled-components/native";
/**
 * ? Local Imports
 */
import { Profile } from "@shared-interfaces/cafe";
import {
  Title,
  Subtitle,
  Text,
  Subtext,
} from "../../../shared/components/styled";

interface Menu {
  category: string;
  id: number;
}

interface IHeader {
  category: number;
  setCategory: any;
  profile: Profile | undefined;
  openUrl: Function;
  MENU_IDS: Menu[];
}

const Header = ({
  category,
  setCategory,
  profile,
  MENU_IDS,
  openUrl,
}: IHeader) => {
  const theme = useTheme();
  const { colors } = theme;

  const TitleContainer = styled.View`
    flex-direction: row;
    padding-bottom: 10px;
    align-items: baseline;
  `;

  const ProfileContainer = styled.Pressable`
    justify-content: center;
    align-items: center;
    padding: 20px;
    background: #00d465;
    border-radius: 20px;
    margin-bottom: 12px;
  `;

  const Profile = styled.View`
    background: #ffffff;
    width: 150px;
    height: 150px;
    justify-content: center;
    align-items: center;
    border-radius: 150px;
  `;

  const ProfileImage = styled.Image`
    width: 50px;
    height: 50px;
    border-radius: 30px;
    margin-bottom: 4px;
  `;

  const CategoryContainer = styled.ScrollView`
    margin-bottom: 10px;
    flex: 1;
  `;

  const Category = styled.Pressable`
    padding: 10px;
    background-color: #f5f5f5;
    border-radius: 20px;
    margin-right: 10px;
  `;

  return (
    <View style={{ marginBottom: 20 }}>
      <TitleContainer>
        <Title color={colors.text} style={{ marginRight: 8 }}>
          Community
        </Title>
        <Subtitle color={colors.subtitle}>침투부 팬카페</Subtitle>
      </TitleContainer>
      <ProfileContainer
        onPress={() => {
          openUrl(
            "navercafe://cafe?cafeUrl=zilioner",
            "https://m.cafe.naver.com/ca-fe/zilioner",
          );
        }}
      >
        <Profile>
          <ProfileImage source={{ uri: profile?.thumbnail }} />
          <Text color={colors.text}>{profile?.name}</Text>
          <Subtext color={colors.subtitle}>{profile?.members}</Subtext>
        </Profile>
      </ProfileContainer>

      <FlatList
        data={MENU_IDS}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => {
          return (
            <Category
              key={item.id}
              onPress={() => {
                setCategory(index);
              }}
            >
              <Text color={index === category ? colors.text : colors.subtitle}>
                {item.category}
              </Text>
            </Category>
          );
        }}
      />
    </View>
  );
};

export default Header;
