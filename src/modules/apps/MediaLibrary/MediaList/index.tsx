import AppCard from '@/@crema/components/AppCard';
import AppRowContainer from '@/@crema/components/AppRowContainer';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Modal, Select, Upload, message } from 'antd';
import React, { useCallback, useEffect, useState } from 'react'
import Gallery from 'react-photo-gallery';
import { InboxOutlined } from '@ant-design/icons';
import Carousel, { ModalGateway, Modal as ImageModal } from "react-images";
import { title } from 'process';
import { useAppDispatch, useAppSelector } from '@/toolkit/hooks';
import { addNewMediaData, getAllMediaData } from '@/toolkit/actions/MediaManagement';
import { get, size } from 'lodash';

const { Dragger } = Upload;

const { Option } = Select;

const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 4,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 24,
        },
    },
};

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 18,
        },
        sm: {
            span: 24,
            offset: 20,
        },
    },

};

const MediaList = () => {
    // const props = {
    //     name: 'file',
    //     multiple: true,
    //     // action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
    //     onChange(info: any) {
    //         const { status } = info.file;
    //         if (status !== 'uploading') {
    //             console.log(info.file, info.fileList);
    //         }
    //         if (status === 'done') {
    //             message.success(`${info.file.name} file uploaded successfully.`);
    //         } else if (status === 'error') {
    //             message.error(`${info.file.name} file upload failed.`);
    //         }
    //     },
    //     onDrop(e: any) {
    //         console.log('Dropped files', e.dataTransfer.files);
    //     },
    // };

    const photos = [
        {
            src: 'https://img.freepik.com/free-photo/children-playing-grass_1098-504.jpg?w=996&t=st=1724985222~exp=1724985822~hmac=b52b0c4edbcac8bca752610925f8cf1240c9999eda7ae726a752f17cc7f63e78',
            width: 4,
            height: 3
        },
        {
            src: 'https://img.freepik.com/free-photo/children-playing-grass_1098-504.jpg?w=996&t=st=1724985222~exp=1724985822~hmac=b52b0c4edbcac8bca752610925f8cf1240c9999eda7ae726a752f17cc7f63e78',
            width: 4,
            height: 3
        },
        {
            src: 'https://img.freepik.com/free-photo/group-children-lying-reading-grass-field_1150-3899.jpg?t=st=1724989562~exp=1724993162~hmac=4937313bb054f7af3cba75804d54762be9854ee70b4f14932e673e87b72cc6d2&w=996',
            width: 4,
            height: 3
        },
        {
            src: 'https://img.freepik.com/free-photo/group-children-lying-reading-grass-field_1150-3899.jpg?t=st=1724989562~exp=1724993162~hmac=4937313bb054f7af3cba75804d54762be9854ee70b4f14932e673e87b72cc6d2&w=996',
            width: 4,
            height: 3
        },
        {
            src: 'https://img.freepik.com/free-photo/group-children-lying-reading-grass-field_1150-3899.jpg?t=st=1724989562~exp=1724993162~hmac=4937313bb054f7af3cba75804d54762be9854ee70b4f14932e673e87b72cc6d2&w=996',
            width: 4,
            height: 3
        },
        {
            src: 'https://img.freepik.com/free-photo/group-children-lying-reading-grass-field_1150-3899.jpg?t=st=1724989562~exp=1724993162~hmac=4937313bb054f7af3cba75804d54762be9854ee70b4f14932e673e87b72cc6d2&w=996',
            width: 4,
            height: 3
        },
    ];

    const [mediaType, setMediaType] = useState('Photo');
    const [uploadForm] = Form.useForm();

    const dispatch = useAppDispatch();
    const { mediaList } = useAppSelector((state) => state.mediaManagement);

    useEffect(() => {
        dispatch(getAllMediaData());
    }, [dispatch, mediaList.length]);

    const [uploadModalVisible, setUploadModalVisible] = useState(false);

    const onUploadFinish = (values: any) => {
        console.log(values);
        dispatch(addNewMediaData(values));
        message.success('Media uploaded successfully');
        setUploadModalVisible(false);
    }

    const onUploadFormChange = (changedValues: any, allValues: any) => {
        console.log(allValues);
    }

    const [currentImage, setCurrentImage] = useState(0);
    const [viewerIsOpen, setViewerIsOpen] = useState(false);

    const openLightBox = useCallback((event, { index }) => {
        setCurrentImage(index);
        setViewerIsOpen(true);
    }, []);

    const closeLightbox = () => {
        setCurrentImage(0);
        setViewerIsOpen(false);
    };

    const getImageSize = (url: string) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          
          // When the image is loaded, resolve the promise with its dimensions
          img.onload = () => {
            resolve({ width: img.width, height: img.height });
          };
          
          // If there's an error loading the image, reject the promise
          img.onerror = () => {
            reject(new Error("Failed to load image"));
          };
      
          // Set the source of the image to start loading
          img.src = url;
        });
      }

    const formattedMediaList = (data: any) => {
        return data.map((media: any, index: any) => {
            // getImageSize(media.url).then((size: any) => {
            //     return {
            //         src: media.url,
            //         width: size.width,
            //         height: size.height,
            //         // title: media.title
            //     }
            // }).catch((error: any) => {
            //     console.error(error);
            //     return null;
            // })
            return {
                src: media.url,
                width: 4,
                height: 3,
                // title: media.title
            }
        })
    }

    return (
        <>
            <AppRowContainer>
                <Col xs={24} lg={24}>
                    <Button type="primary" icon={<PlusOutlined style={{ marginRight: 5 }} />} onClick={() => setUploadModalVisible(true)}>Upload</Button>
                </Col>
                <Col xs={24} lg={24}>
                    <AppCard title="Photos">
                        <Gallery photos={formattedMediaList(mediaList)} onClick={openLightBox} />
                    </AppCard>
                </Col>

                <Modal
                    open={uploadModalVisible}
                    title="Upload Media"
                    onOk={() => setUploadModalVisible(false)}
                    onCancel={() => setUploadModalVisible(false)}
                    footer={false}
                >
                    <Form {...formItemLayout}
                        // initialValues={{
                        //     title: '',
                        //     image: null
                        // }}
                        form={uploadForm}
                        onFinish={onUploadFinish}
                        onValuesChange={onUploadFormChange}
                    >
                        <Form.Item name="title">
                            <Input placeholder="Media title" />
                        </Form.Item>

                        <Form.Item name='media_type'>
                            <Select
                                placeholder="Select media type"
                                style={{ width: "100%" }}
                                onChange={(value) => { setMediaType(value) }}>
                                <Option value='Photo'>Photo upload</Option>
                                <Option value='Video'>Video upload</Option>
                            </Select>
                        </Form.Item>

                        {mediaType === 'Photo' ? <Form.Item name='photo'>
                            <Dragger
                                multiple={true}
                            >
                                <p className="ant-upload-drag-icon">
                                    <InboxOutlined />
                                </p>
                                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                <p className="ant-upload-hint">
                                    Support for a single or bulk upload. Strictly prohibited from uploading company data or other
                                    banned files.
                                </p>
                            </Dragger>
                        </Form.Item> : <Form.Item name='video'>
                            <Input placeholder="Video URL" />
                        </Form.Item>}

                        <Form.Item {...tailFormItemLayout}>
                            <Button type="primary" htmlType='submit'>Submit</Button>
                        </Form.Item>
                    </Form>

                </Modal>

                {/* @ts-ignore */}
                <ModalGateway>
                    {viewerIsOpen ? (
                        <ImageModal onClose={closeLightbox}>
                            <Carousel
                                currentIndex={currentImage}
                                views={formattedMediaList(mediaList).map((x: any) => ({
                                    ...x,
                                    source: x.src,
                                    srcset: x.srcSet,
                                    caption: x.title,
                                }))}
                            />
                        </ImageModal>
                    ) : null}
                </ModalGateway>

            </AppRowContainer>
        </>
    )
}

export default MediaList
