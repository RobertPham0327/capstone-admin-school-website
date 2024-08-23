import React, { useEffect } from 'react';
import AppsContainer from '@crema/components/AppsContainer';
import { useIntl } from 'react-intl';
import AppPageMeta from '@crema/components/AppPageMeta';
import {
  StyledAppRowContainer,
  StyledWallMainContent,
  StyledWallRightSidebar,
  StyledWallScrollBar,
} from './index.styled';
import { useAppSelector, useAppDispatch } from '../../../toolkit/hooks';
import { onGetWallData } from '../../../toolkit/actions';
import { RecentNews, WhatsHappen } from '@crema/modules/apps/Wall';
import CreatePost from './CreatePost';
import PostsList from './PostsList';
import { isEmptyObject } from '@crema/helpers/ApiHelper';

const MainFeed = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(onGetWallData());
  }, [dispatch]);

  const wallData = useAppSelector(({ wall }) => wall.wallData);
  const { messages } = useIntl();

  return (
    <AppsContainer
      title={messages['sidebar.apps.mainFeed'] as string}
      cardStyle={{ backgroundColor: 'transparent', boxShadow: 'none' }}
      fullView
    >
      <AppPageMeta title="Main Feed" />
      {!isEmptyObject(wallData) && (
        <StyledAppRowContainer
          style={{
            height: 'calc(100% - 32px)',
            padding: 8,
          }}
        >
          <StyledWallMainContent xs={24} md={12} xl={16} xxl={12}>
            <StyledWallScrollBar style={{ height: '100%' }}>
              <div>
                <CreatePost wallData={wallData} />
                <PostsList wallData={wallData} />
              </div>
            </StyledWallScrollBar>
          </StyledWallMainContent>
          <StyledWallRightSidebar xs={24} md={6} xl={8} xxl={6}>
            <StyledWallScrollBar style={{ height: '100%' }}>
              <div>
                <WhatsHappen whatsHappen={wallData?.whatsHappen} />
                <RecentNews recentNews={wallData?.recentNews} />
              </div>
            </StyledWallScrollBar>
          </StyledWallRightSidebar>
        </StyledAppRowContainer>
      )}
    </AppsContainer>
  );
};

export default MainFeed;
