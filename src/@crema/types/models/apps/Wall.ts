import { url } from 'inspector';
import { MessageType } from './Chat';

export type FriendRequestObjType = {
  id: number;
  profilePic: string;
  name: string;
  date: any;
};

export type ImageObjType = {
  id: number;
  thumb: string;
};

export type RecentNewsObjType = {
  id: number;
  user: {
    name: string;
    profilePic: string;
  };
  title: string;
  desc: string;
};

export type WhoToFollowObjType = {
  id: number;
  title: string;
  subTitle: string;
  profilePic: string;
};

export type SuggestionObjType = {
  id: number;
  name: string;
  desc: string;
  thumb: string;
};

export type MediaObjType = {
  id: number | string;
  url: string;
  media_type: string;
  created_at: string;
};

export type AttachmentObjType = {
  id: number;
  url: string;
  media_type: string;
  created_at: string;
  preview: string;
  metaData: {
    type: string;
    size: number;
  };
};

export type CommentObjType = {
  id?: number;
  author: {
    name: string;
    profilePic: string;
    id: number;
  };
  liked?: boolean;
  comment: string;
  message_type: MessageType;
  date?: any;
  media?: MediaObjType;
};

export type AbutDataType = {
  id: number;
  icon: string;
  text: string;
  linkType: string;
};

export type SuggestTeamDataType = {
  icon: string;
  title: string;
  subTitle: string;
  mediaImg: string;
};

export type StoriesDataType = {
  id: number;
  avatar: string;
  title: string;
  imgSrc: string;
};

export type WhatsHappenDataType = {
  id: number;
  imgSrc: string;
  title: string;
  subTitle: string;
  tag: TagType[];
};

export type TagType = {
  id: number;
  name?: string;
};

export type WallDataType = {
  id: number;
  name: string;
  profilePic: string;
  videoCall: {
    users: {
      id: number;
      name: string;
      profilePic: string;
    }[];
    title: string;
  };
  whatsHappen: WhatsHappenDataType[];
  suggestTeam: SuggestTeamDataType;
  stories: StoriesDataType[];
  about: AbutDataType[];
  friendRequests: FriendRequestObjType[];
  photos: ImageObjType[];
  recentNews: RecentNewsObjType[];
  whoToFollow: WhoToFollowObjType[];
  suggestions: SuggestionObjType[];
  schooId: number;
  media: MediaObjType;
};

export type UserObjType = {
  name: string;
  profilePic: string;
  id: number;
};

export type PostObjType = {
  id: number;
  title: string;
  content: string;
  school_id: number;
  created_by: number;
  status: string;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  media: MediaObjType[];
  hashtags: string[];
  liked: boolean;
  numLikes: number;
  numComments: CommentObjType[];
  shares: number;
  views?: number;
};

// Media Object Type
export type MediaPostObjType = {
  id: number;
  url: string;
  media_type: string;
  created_at: string; // Assuming ISO date format
};
