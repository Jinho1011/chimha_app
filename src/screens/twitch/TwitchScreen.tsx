import { useTheme } from "@react-navigation/native";
import { twitchApi, useTwitchApi } from "@services/api/twitch";
import React from "react";
import { ActivityIndicator, FlatList } from "react-native";
import { useQueries, useQuery } from "react-query";
import { openUrl } from "shared/libs/openUrl";
import styled from "styled-components/native";
/**
 * ? Local Imports
 */
import Content from "./components/Content";
import Header from "./components/Header";
import { BDRZ } from "./mock";

const TwitchScreen = () => {
  const theme = useTheme();
  const { colors } = theme;

  const isLiveQuery = useTwitchApi.useIsLiveQuery();
  const channelQuery = useTwitchApi.useChannelQuery("66375105");
  const followersQuery = useTwitchApi.useFollowersQuery("66375105");
  const streamQuery = useTwitchApi.useStreamQuery("66375105");
  const bdrzsQuery = useQueries(
    BDRZ.map((value, index) => {
      return {
        queryKey: ["bdrz", index],
        queryFn: () => twitchApi.channel(value.id),
      };
    }),
  );

  const isLiveLoading = isLiveQuery.isLoading || isLiveQuery.isIdle;
  const channelLoading = channelQuery.isLoading || channelQuery.isIdle;
  const followerLoading = followersQuery.isLoading || followersQuery.isIdle;
  const streamLoading = streamQuery.isLoading || streamQuery.isIdle;
  const bdrzsLoading = !bdrzsQuery.every((e) => !e.isLoading);

  if (
    isLiveLoading ||
    channelLoading ||
    followerLoading ||
    streamLoading ||
    bdrzsLoading
  ) {
    return <ActivityIndicator />;
  }

  if (
    isLiveQuery.isError ||
    channelQuery.isError ||
    followersQuery.isError ||
    streamQuery.isError ||
    bdrzsQuery.find((e) => e.isError)
  ) {
    return <ActivityIndicator />;
  }

  return (
    <Container color={colors.background}>
      <FlatList
        nestedScrollEnabled
        data={bdrzsQuery}
        keyExtractor={(item) => {
          return item?.data?.data[0].id ?? item.status;
        }}
        numColumns={4}
        renderItem={({ item }) => <Content value={item} openUrl={openUrl} />}
        ListHeaderComponent={() => (
          <Header
            openUrl={openUrl}
            LiveData={isLiveQuery.data}
            ChannelData={channelQuery.data}
            FollowData={followersQuery.data}
            StreamData={streamQuery.data}
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
    </Container>
  );
};

export default TwitchScreen;

const Container = styled.View<{ color?: string }>`
  padding: 20px 20px 0 20px;
  flex: 1;
  flex-direction: column;
  background-color: ${(props) => props.color};
`;
