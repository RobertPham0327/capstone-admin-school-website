import React from 'react';
import clsx from 'clsx';
import {
  StyledCommentOutlined,
  StyledLikeOutlined,
  StyledPostStats,
  StyledPostStatsItem,
  StyledPostStatsItemInfo,
} from '../index.styled';
import { useAppDispatch } from '../../../../../toolkit/hooks';
import { onUpdatePostStatus } from '../../../../../toolkit/actions';
import { PostObjType } from '@crema/types/models/apps/Wall';

type PostStatsProps = {
  post: PostObjType;
};

const PostStats: React.FC<PostStatsProps> = ({ post }) => {
  const dispatch = useAppDispatch();

  const toggleLikeStatus = () => {
    dispatch(onUpdatePostStatus(post.id, !post.liked));
  };

  return (
    <StyledPostStats>
      <StyledPostStatsItem className={clsx({ active: post.liked })} onClick={toggleLikeStatus}>
        <StyledLikeOutlined />
        <StyledPostStatsItemInfo>{post.numLikes} likes</StyledPostStatsItemInfo>
      </StyledPostStatsItem>
      <StyledPostStatsItem>
        <StyledCommentOutlined />
        <StyledPostStatsItemInfo>{post.numComments.length} Comments</StyledPostStatsItemInfo>
      </StyledPostStatsItem>
    </StyledPostStats>
  );
};

export default PostStats;
