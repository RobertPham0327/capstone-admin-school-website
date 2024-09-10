import AppCard from '@/@crema/components/AppCard';
import AppRowContainer from '@/@crema/components/AppRowContainer';
import { PhoneTwoTone, PlusOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Modal, Row, Select, Space, Upload, message } from 'antd';
import React, { useCallback, useEffect, useState } from 'react'
import Gallery from 'react-photo-gallery';
import { InboxOutlined } from '@ant-design/icons';
import Carousel, { ModalGateway, Modal as ImageModal } from "react-images";
import { useAppDispatch, useAppSelector } from '@/toolkit/hooks';
import { addNewMediaData, getAllMediaData } from '@/toolkit/actions/MediaManagement';
import ReactPlayer from 'react-player';
import { useRouter } from 'next/router';

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

    // const photos = [
    //     {
    //         src: 'https://img.freepik.com/free-photo/children-playing-grass_1098-504.jpg?w=996&t=st=1724985222~exp=1724985822~hmac=b52b0c4edbcac8bca752610925f8cf1240c9999eda7ae726a752f17cc7f63e78',
    //         width: 4,
    //         height: 3
    //     },
    //     {
    //         src: 'https://img.freepik.com/free-photo/children-playing-grass_1098-504.jpg?w=996&t=st=1724985222~exp=1724985822~hmac=b52b0c4edbcac8bca752610925f8cf1240c9999eda7ae726a752f17cc7f63e78',
    //         width: 4,
    //         height: 3
    //     },
    //     {
    //         src: 'https://img.freepik.com/free-photo/group-children-lying-reading-grass-field_1150-3899.jpg?t=st=1724989562~exp=1724993162~hmac=4937313bb054f7af3cba75804d54762be9854ee70b4f14932e673e87b72cc6d2&w=996',
    //         width: 4,
    //         height: 3
    //     },
    //     {
    //         src: 'https://img.freepik.com/free-photo/group-children-lying-reading-grass-field_1150-3899.jpg?t=st=1724989562~exp=1724993162~hmac=4937313bb054f7af3cba75804d54762be9854ee70b4f14932e673e87b72cc6d2&w=996',
    //         width: 4,
    //         height: 3
    //     },
    //     {
    //         src: 'https://img.freepik.com/free-photo/group-children-lying-reading-grass-field_1150-3899.jpg?t=st=1724989562~exp=1724993162~hmac=4937313bb054f7af3cba75804d54762be9854ee70b4f14932e673e87b72cc6d2&w=996',
    //         width: 4,
    //         height: 3
    //     },
    //     {
    //         src: 'https://img.freepik.com/free-photo/group-children-lying-reading-grass-field_1150-3899.jpg?t=st=1724989562~exp=1724993162~hmac=4937313bb054f7af3cba75804d54762be9854ee70b4f14932e673e87b72cc6d2&w=996',
    //         width: 4,
    //         height: 3
    //     },
    // ];

    const mediaTypes = {
        PHOTO: 'image',
        VIDEO: 'video'
    }

    const [mediaType, setMediaType] = useState(mediaTypes.PHOTO);
    const [uploadForm] = Form.useForm();

    const dispatch = useAppDispatch();
    const router = useRouter();

    const { mediaList, photoList, videoList } = useAppSelector((state) => state.mediaManagement);
    const [formattedPhotos, setFormattedPhotos] = useState([]);
    const [currentMediaTypeDisplay, setCurrentMediaTypeDisplay] = useState(mediaTypes.PHOTO);

    const getImageSize = (url: string): Promise<{ width: number, height: number }> => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                resolve({ width: img.width, height: img.height });
            };
            img.onerror = () => {
                reject(new Error('Failed to load image'));
            };
            img.src = url;
        });
    };

    // Function to format the photo list
    const getFormattedPhotos = async (photoList: any) => {
        const formattedList = await Promise.all(
            photoList.map(async (photo: any) => {
                try {
                    const size = await getImageSize(photo.url);
                    return { ...photo, src: photo?.url, ...size };
                } catch (error) {
                    console.error(`Error loading image at ${photo.url}:`, error);
                    return { ...photo, src: photo?.url, width: 1, height: 1 }; // Handle error by setting width/height to null
                }
            })
        );
        return formattedList;
    }

    useEffect(() => {
        dispatch(getAllMediaData());
        // getFormattedPhotos(photoList).then((formattedList) => {
        //     setFormattedPhotos(formattedList);
        // });
    }, [dispatch, mediaList.length]);

    const [uploadModalVisible, setUploadModalVisible] = useState(false);

    const onUploadSubmit = (values: any) => {
        console.log(values);
        dispatch(addNewMediaData(values));
        message.success('Media uploaded successfully');
        uploadForm.resetFields();
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

    const getPhotoList = (data: any) => {
        return data.map((photo: any) => {
            return {
                src: photo.url,
                width: photo.width,
                height: photo.height
            }
        });
    }

    return (
        <>
            <AppRowContainer>
                <Col xs={24} lg={24}>
                    <Space size={'large'}>
                        <Button type="primary" icon={<PlusOutlined style={{ marginRight: 5 }} />} onClick={() => setUploadModalVisible(true)}>Upload</Button>
                        <Select
                            placeholder="Select media type"
                            style={{ width: "100%" }}
                            onChange={(value) => { setCurrentMediaTypeDisplay(value) }}>
                            <Option value={mediaTypes.PHOTO}>Photos</Option>
                            <Option value={mediaTypes.VIDEO}>Videos</Option>
                        </Select>
                    </Space>
                </Col>

                <Col xs={24} lg={24}>
                    {
                        currentMediaTypeDisplay === mediaTypes.PHOTO ?
                            <AppCard title='Photos'>
                                <Gallery photos={getPhotoList(photoList)} onClick={openLightBox} />
                            </AppCard>
                            :
                            <AppCard title='Videos'>
                                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                    {
                                        videoList.map((video: any, index: any) => {
                                            return (
                                                <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                                                    <ReactPlayer key={index} controls url={video?.url} />
                                                </Col>
                                            )
                                        }
                                        )
                                    }
                                </Row>
                            </AppCard>
                    }
                </Col>

                <Modal
                    open={uploadModalVisible}
                    title="Upload Media"
                    onOk={() => setUploadModalVisible(false)}
                    onCancel={() => setUploadModalVisible(false)}
                    footer={false}
                >
                    <Form {...formItemLayout}
                        form={uploadForm}
                        onFinish={onUploadSubmit}
                        onValuesChange={onUploadFormChange}
                    >

                        <Form.Item
                            name='media_type'
                            rules={[{ required: true, message: 'Please select a media type!' }]}>
                            <Select
                                placeholder="Select media type"
                                style={{ width: "100%" }}
                                onChange={(value) => { setMediaType(value) }}>
                                <Option value={mediaTypes.PHOTO}>Photo upload</Option>
                                <Option value={mediaTypes.VIDEO}>Video upload</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name='files'
                            rules={[{ required: true, message: 'Please upload a file!' }]}
                        >
                            <Dragger
                                multiple={false}
                                maxCount={1}
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
                        </Form.Item>

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
                                views={formattedPhotos.map((x: any) => ({
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
