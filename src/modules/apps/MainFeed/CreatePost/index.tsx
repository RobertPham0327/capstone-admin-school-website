import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useIntl } from 'react-intl';
import { PictureOutlined, SendOutlined } from '@ant-design/icons';
import AppIconButton from '@crema/components/AppIconButton';
import {
  StyledCreatePostAction,
  StyledCreatePostActionBtn,
  StyledCreatePostCard,
  StyledCreatePostImgItem,
  StyledCreatePostImgList,
  StyledCreatePostInput,
  StyledCreatePostMain,
  StyledCreatePostMainContent,
} from './index.styled';
import { useAppDispatch } from '../../../../toolkit/hooks';
import { onCreateNewPost } from '../../../../toolkit/actions';
import { AttachmentObjType, PostObjType, WallDataType, MediaPostObjType } from '@crema/types/models/apps/Wall';
import { generateRandomUniqueNumber } from '@crema/helpers/Common';

type CreatePostProps = {
  wallData: WallDataType;
};

const CreatePost: React.FC<CreatePostProps> = ({ wallData }) => {
  const dispatch = useAppDispatch();

  const [content, setContent] = useState('');
  const [media, setMedia] = useState<any[]>([]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/jpeg': [],
      'image/png': [],
    },
    multiple: true,
    onDrop: acceptedFiles => {
      const files = acceptedFiles.map((file: any) => {
        return {
          id: generateRandomUniqueNumber(),
          url: file.path,
          metaData: { type: file.type, size: file.size },
          preview: URL.createObjectURL(file),
          media_type: file.type,
          created_at: new Date().toISOString(),
        };
      });
      onAddAttachments(files);
    },
  });

  const onAddAttachments = (files: AttachmentObjType[]) => {
    setMedia([...media, ...files]);
  };

  const handlePostSubmit = () => {
    const post: PostObjType = {
      title: content,
      content,
      school_id: wallData.schooId, // Assuming wallData contains schoolId
      created_by: wallData.id, // Assuming wallData contains user ID
      status: 'draft', // Defaulting to 'draft' status
      published_at: new Date().toISOString(),
      id: generateRandomUniqueNumber(), // Generate a temporary ID if needed
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      // published_at: new Date().toISOString(),
      // files: media.map(file => ({
      //   id: file.id,
      //   url: file.url, // Using preview URL
      //   media_type: file.media_type, // Assuming media_type is 'image'. Adjust this based on the type of media.
      //   created_at: new Date().toISOString(), // The current timestamp for when the media was added
      // })),
      // files: new File(media[0], 'files'),
      hashtags: [],
      liked: false,
      numLikes: 0,
      numComments: [],
      shares: 0,
    };

    dispatch(onCreateNewPost(post as PostObjType));
    setMedia([]);
    setContent('');
  };


  const { messages } = useIntl();

  return (
    <StyledCreatePostCard title={messages['wall.createPost']}>
      <StyledCreatePostMain>
        <StyledCreatePostMainContent>
          <StyledCreatePostInput
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="What's on your mind?"
            suffix={
              <StyledCreatePostAction>
                <StyledCreatePostActionBtn {...getRootProps()}>
                  <input {...getInputProps()} />
                  <PictureOutlined />
                </StyledCreatePostActionBtn>
                <AppIconButton onClick={handlePostSubmit} icon={<SendOutlined />} />
              </StyledCreatePostAction>
            }
          />
        </StyledCreatePostMainContent>
      </StyledCreatePostMain>
      {media.length > 0 ? (
        <StyledCreatePostImgList
          data={media}
          renderItem={(item: AttachmentObjType, index: number) => (
            <StyledCreatePostImgItem key={index}>
              <img src={item.preview} alt="upload" />
            </StyledCreatePostImgItem>
          )}
        />
      ) : null}
    </StyledCreatePostCard>
  );
};

export default CreatePost;
