import React from 'react';
import Attachments from './Attachments';
import PostStats from './PostStats';
import { CommentsList } from '@crema/modules/MainFeed';
import { EllipsisOutlined } from '@ant-design/icons';
import { getTimeFromNow } from '@crema/helpers/DateHelper';
import {
  StyledPostItemAvatar,
  StyledPostItemCard,
  StyledPostItemExtraBtn,
  StyledPostItemPara,
  StyledPostItemUser,
  StyledPostItemUserInfo,
} from '../index.styled';
import { PostObjType, WallDataType } from '@crema/types/models/apps/Wall';
import { useAuthUser } from '@crema/hooks/AuthHooks';


type PostItemProps = {
  post: PostObjType;
  wallData: WallDataType;
  isLast: boolean;
};
const PostItem: React.FC<PostItemProps> = ({ post, wallData, isLast }) => {
  const { media, numLikes, numComments, liked, created_at, content } = post;
  const { user } = useAuthUser();
  const getTitle = () => (
    <StyledPostItemUser>
      <StyledPostItemAvatar src='https://udemy-test-web-host.s3.ap-southeast-1.amazonaws.com/Ellipse+3.png' />
      <StyledPostItemUserInfo>
        <h3>Admin</h3>
        <p>{getTimeFromNow(created_at)}</p>
      </StyledPostItemUserInfo>
    </StyledPostItemUser>
  );

  return (
    <StyledPostItemCard
      title={getTitle()}
      className={isLast ? '' : 'mb-5'}
      extra={
        <StyledPostItemExtraBtn>
          <EllipsisOutlined />
        </StyledPostItemExtraBtn>
      }
    >
      {content ? <StyledPostItemPara>{content}</StyledPostItemPara> : null}
      <Attachments attachments={media} />
      <PostStats post={post} />
      {numComments.length > 0 && <CommentsList comments={numComments} />}
    </StyledPostItemCard>
  );
};

export default PostItem;
