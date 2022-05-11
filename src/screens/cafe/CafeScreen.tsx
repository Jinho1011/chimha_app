import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Linking,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import styled from "styled-components/native";
import { useQuery, useQueries, useInfiniteQuery } from "react-query";
/**
 * ? Local Imports
 */
import Header from "./components/Header";
import Content from "./components/Content";
import { MENU_IDS } from "../../services/api/api.constant";
import { getProfile, getArticles } from "../../services/api/cafe";
import { Article } from "@shared-interfaces/cafe";

const openUrl = async (appUrl: string, webUrl: string) => {
  const isValid = await Linking.canOpenURL(appUrl);
  const baseUrl = isValid ? appUrl : webUrl;

  try {
    await Linking.openURL(baseUrl);
  } catch (error) {
    console.log(error);
  }
};

const CafeScreen = () => {
  const theme = useTheme();
  const { colors } = theme;

  const [category, setCategory] = useState(0);

  const profile = useQuery("profile", getProfile);

  const posts = MENU_IDS.map((menu) => {
    return useInfiniteQuery(
      menu.category,
      ({ pageParam = 1 }) => getArticles(menu.id, pageParam),
      {
        getNextPageParam: (lastPage, pages) => {
          return lastPage.page + 1;
        },
      },
    );
  });

  const Container = styled.View`
    padding: 20px 20px 0 20px;
    flex: 1;
    flex-direction: column;
    background-color: ${colors.background};
  `;

  const isCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }: any) => {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  const scrollViewRef = useRef<ScrollView>(null);
  const scrollPositionRef = useRef(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    scrollPositionRef.current = 0;
  }, [category]);

  const [refreshing, setRefreshing] = useState(false);

  const scrollToLastPosition = () => {
    if (scrollViewRef.current != null) {
      scrollViewRef.current.scrollTo({
        x: 0,
        y: scrollPositionRef.current,
        animated: false,
      });
    }
  };

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await posts[category].refetch();
    setRefreshing(false);
  }, []);

  return (
    <Container>
      {!profile.isLoading && posts.every((item) => !item.isLoading) ? (
        <>
          <Header
            category={category}
            setCategory={setCategory}
            profile={profile.data}
            MENU_IDS={MENU_IDS}
            openUrl={openUrl}
          />
          {loading ? (
            <ActivityIndicator />
          ) : (
            <ScrollView
              ref={scrollViewRef}
              maintainVisibleContentPosition={{
                minIndexForVisible: 0,
              }}
              scrollEventThrottle={0}
              onScroll={async ({ nativeEvent }) => {
                scrollPositionRef.current = nativeEvent.contentOffset.y;
                if (isCloseToBottom(nativeEvent)) {
                  setLoading(true);
                  await posts[category].fetchNextPage();
                  setLoading(false);
                }
              }}
              onContentSizeChange={() => {
                if (scrollViewRef.current != null) scrollToLastPosition();
              }}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            >
              {posts[category].data?.pages
                .map((page) => {
                  return page.result;
                })
                .flat()
                .map((item, index) => {
                  return (
                    <Content
                      post={item}
                      scrollToLastPosition={scrollToLastPosition}
                      setLoading={setLoading}
                      key={item.title + item.author + index}
                    />
                  );
                })}
            </ScrollView>
          )}
        </>
      ) : (
        <ActivityIndicator />
      )}
    </Container>
  );
};

export default CafeScreen;
