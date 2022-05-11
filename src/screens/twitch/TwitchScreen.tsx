import { useTheme } from "@react-navigation/native";
import { Channel } from "@shared-interfaces/twitch";
import React from "react";
import { ActivityIndicator, FlatList, Linking } from "react-native";
import { useQueries, useQuery, UseQueryResult } from "react-query";
import styled from "styled-components/native";
/**
 * ? Local Imports
 */
import {
  getChannelInfo,
  getFollowers,
  getIsLive,
  getStream,
} from "../../services/api/twitch";
import Content from "./components/Content";
import Header from "./components/Header";
import { BDRZ } from "./mock";

const TwitchScreen = () => {
  const theme = useTheme();
  const { colors } = theme;

  const { data: LiveData, isLoading: IsLiveLoading } = useQuery(
    "isLive",
    getIsLive,
  );
  const { data: ChannelData, isLoading: IsChannelLoading } = useQuery(
    "channel",
    () => getChannelInfo("66375105"),
  );
  const { data: FollowData, isLoading: IsFollowLoading } = useQuery(
    "followers",
    () => getFollowers("66375105"),
  );
  const { data: StreamData, isLoading: IsStreamLoading } = useQuery(
    "stream",
    () => getStream("66375105"),
  );

  const bdrzs = useQueries(
    BDRZ.map((value, index) => {
      return {
        queryKey: ["bdrz", index],
        queryFn: () => getChannelInfo(value.id),
      };
    }),
  );

  const Container = styled.View`
    padding: 20px 20px 0 20px;
    flex: 1;
    flex-direction: column;
    background-color: ${colors.background};
  `;

  const openUrl = async (appUrl: string, webUrl: string) => {
    const isValid = await Linking.canOpenURL(appUrl);
    const baseUrl = isValid ? appUrl : webUrl;

    try {
      await Linking.openURL(baseUrl);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      {bdrzs.every((e) => !e.isLoading) &&
      !IsLiveLoading &&
      !IsChannelLoading &&
      !IsFollowLoading &&
      !IsStreamLoading ? (
        <FlatList
          nestedScrollEnabled
          data={bdrzs}
          keyExtractor={(item) => {
            if (item?.data?.data[0]?.id !== undefined)
              return item.data.data[0].id;
            else return "KEY";
          }}
          numColumns={4}
          renderItem={({ item }) => <Content value={item} openUrl={openUrl} />}
          ListHeaderComponent={() => (
            <Header
              openUrl={openUrl}
              LiveData={LiveData}
              ChannelData={ChannelData}
              FollowData={FollowData}
              StreamData={StreamData}
            />
          )}
          columnWrapperStyle={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 20,
          }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
      ) : (
        <ActivityIndicator />
      )}
    </Container>
  );
};

export default TwitchScreen;
