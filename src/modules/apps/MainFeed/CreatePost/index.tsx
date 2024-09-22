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
import { onCreateNewPost, onGetWallData } from '../../../../toolkit/actions';
import { AttachmentObjType, PostObjType, WallDataType, MediaPostObjType } from '@crema/types/models/apps/Wall';
import { generateRandomUniqueNumber } from '@crema/helpers/Common';
import { toast } from 'react-toastify';

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
      'image/gif': [],
      'video/mp4': [],
      'image/jpg': [],     
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

  // const handlePostSubmit = () => {
  //   const post: PostObjType = {
  //     title: content,
  //     content,
  //     school_id: wallData.schooId, // Assuming wallData contains schoolId
  //     created_by: wallData.id, // Assuming wallData contains user ID
  //     status: 'draft', // Defaulting to 'draft' status
  //     published_at: new Date().toISOString(),
  //     id: generateRandomUniqueNumber(), // Generate a temporary ID if needed
  //     created_at: new Date().toISOString(),
  //     updated_at: new Date().toISOString(),
  //     media: media.map(file => ({
  //       id: file.id,
  //       url: file.url, // Using preview URL
  //       media_type: file.media_type, // Assuming media_type is 'image'. Adjust this based on the type of media.
  //       created_at: new Date().toISOString(), // The current timestamp for when the media was added
  //     })),
  //     hashtags: [],
  //     liked: false,
  //     numLikes: 0,
  //     numComments: [],
  //     shares: 0,
  //   };

  // console.log("post", post);

  //   dispatch(onCreateNewPost(post as PostObjType));
  //   setMedia([]);
  //   setContent('');
  // };

  // const handlePostSubmit = async () => {
  //   // Check if content is present
  //   if (!content.trim()) {
  //     alert("Please provide content to submit.");  // Adjust based on your localization
  //     return;
  //   }
  
  //   // Prepare the post data
  //   const postPayload = {
  //     title: content,
  //     content: content,
  //     status: 'draft',
  //     school_id: wallData.schooId,
  //     created_by: wallData.id,
  //     media: [] // Not including media since the API rejects it
  //   };
  
  //   try {
  //     const response = await fetch('http://18.140.148.120:8082/api/v1/post/draft', {
  //       method: 'POST',
  //       body: JSON.stringify(postPayload),
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem('token')}`,  // Add your authorization header here
  //         'Content-Type': 'application/json',
  //       },
  //     });
  
  //     // Check if the request was successful
  //     if (response.ok) {
  //       const responseData = await response.json();
  //       console.log("Post created successfully:", responseData);
  
  //       // Handle success, e.g., update UI or show a success message
  //       // alert('Post created successfully!');
  //     } else {
  //       const errorData = await response.json();
  //       console.error("Error creating post:", errorData);
  //       alert('Failed to create the post.');
  //     }
  //   } catch (error) {
  //     console.error('An error occurred while creating the post:', error);
  //     alert('An unexpected error occurred.');
  //   }
  
  //   // Clear form data
  //   setContent('');
  //   setMedia([]);
  // };
  
  const handlePostSubmit = async () => {
    // Check if content or media is present
    if (!content.trim() && media.length === 0) {
      alert("Please provide content or media to submit.");  // Adjust based on your localization
      return;
    }
  
    // Create a FormData object
    const formData = new FormData();
  
    // Append non-file fields to FormData
    formData.append('title', content);
    formData.append('content', content);
    formData.append('status', 'draft');  // Status is 'draft'
    // formData.append('school_id', String(wallData.schooId));  // Add school_id
    // formData.append('created_by', String(wallData.id));      // Add created_by (user ID)
  
    // Append media files to FormData
    media.forEach((file) => {
      formData.append('media', file.file);  // Ensure file.file is the actual file object
    });
  
    try {
      // Send the form data to the API
      const response = await fetch('http://18.140.148.120:8082/api/v1/post/draft', {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,  // Add your authorization header here
          // No need to set Content-Type; browser sets it with boundary automatically
        },
      });
  
      // Check if the request was successful
      if (response.ok) {
        const responseData = await response.json();  // Parse the JSON response
        console.log("Post created successfully:", responseData);
  
        // Handle success, e.g., update UI or show a success message
        toast.success('Post created successfully!');
        dispatch(onGetWallData())
      } else {
        const errorData = await response.json();
        console.error("Error creating post:", errorData);
        toast.error('Failed to create the post.');
      }
    } catch (error) {
      console.error('An error occurred while creating the post:', error);
      toast.error('An unexpected error occurred.');
    }
  
    // Clear form data
    setContent('');
    setMedia([]);
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
