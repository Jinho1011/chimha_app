import React from "react";
import { View, useColorScheme } from "react-native";
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

interface ICategory {
  category: number;
  setCategory: any;
  colors: any;
  MENU_IDS: Menu[];
  id: number;
}

const CategoryContent = ({
  setCategory,
  category,
  colors,
  MENU_IDS,
  id,
}: any) => {
  const scheme = useColorScheme();
  const isDarkMode = scheme === "dark";

  const Category = styled.Pressable`
    padding: 10px;
    background-color: ${isDarkMode ? colors.content : "#f5f5f5"};
    border-radius: 20px;
    margin-right: 10px;
  `;

  return (
    <Category
      onPress={() => {
        setCategory(id);
      }}
    >
      <Subtitle color={id === category ? colors.text : colors.subtitle}>
        {MENU_IDS[id].category}
      </Subtitle>
    </Category>
  );
};

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
    background: ${colors.background};
    width: 160px;
    height: 160px;
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

  const CategoryContainer = styled.View`
    margin-bottom: 6px;
    flex-direction: row;
    justify-content: space-between;
  `;

  return (
    <View style={{ marginBottom: 10 }}>
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
          <Subtitle color={colors.text}>{profile?.members}</Subtitle>
        </Profile>
      </ProfileContainer>

      <CategoryContainer>
        <CategoryContent
          setCategory={setCategory}
          category={category}
          colors={colors}
          MENU_IDS={MENU_IDS}
          id={0}
        />
        <CategoryContent
          setCategory={setCategory}
          category={category}
          colors={colors}
          MENU_IDS={MENU_IDS}
          id={1}
        />
        <CategoryContent
          setCategory={setCategory}
          category={category}
          colors={colors}
          MENU_IDS={MENU_IDS}
          id={2}
        />
      </CategoryContainer>
      <CategoryContainer>
        <CategoryContent
          setCategory={setCategory}
          category={category}
          colors={colors}
          MENU_IDS={MENU_IDS}
          id={3}
        />
        <CategoryContent
          setCategory={setCategory}
          category={category}
          colors={colors}
          MENU_IDS={MENU_IDS}
          id={4}
        />
        <CategoryContent
          setCategory={setCategory}
          category={category}
          colors={colors}
          MENU_IDS={MENU_IDS}
          id={5}
        />
      </CategoryContainer>

      {/* <FlatList
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
      /> */}
    </View>
  );
};

export default Header;
