import React, { useEffect } from 'react'
import { StyledAvatar, StyledContainer, StyledTeacherInfor, StyledTitle } from './index.styled'
import AppRowContainer from '@crema/components/AppRowContainer'
import { Col, Descriptions } from 'antd'
import AppCard from '@crema/components/AppCard'
import { useRouter } from 'next/router'
import { useAppDispatch, useAppSelector } from '@/toolkit/hooks'
import { getTeacherData } from '@/toolkit/actions/ClassManagement'


const TeacherDetail = () => {
    const router = useRouter();
    const { teacherId } = router.query;
    console.log(teacherId);

    const dispatch = useAppDispatch();
    const { currentTeacher } = useAppSelector(({ classManagement }) => classManagement);
    useEffect(() => {
        dispatch(getTeacherData(teacherId as unknown as number));
    }, [dispatch, teacherId]);
    
    return (
        <>
            <StyledTitle>Teacher Detail</StyledTitle>
            <AppRowContainer>
                <Col xs={24} lg={24}>
                    <AppCard title={
                        <StyledContainer>
                            <StyledAvatar src="https://www.spencerclarkegroup.co.uk/uploads/5005001.png" />
                            <StyledTeacherInfor>
                                <h3>{currentTeacher?.name}</h3>
                                <p>Class coordinator</p>
                            </StyledTeacherInfor>
                        </StyledContainer>
                    }
                        style={{ padding: "10px" }}
                    >
                        <Descriptions layout='vertical'>
                            <Descriptions.Item label='Biography' span={3}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vitae iaculis libero. In nulla diam, accumsan non ornare nec, congue sit amet sapien. Vestibulum vestibulum a libero eu vulputate. Nullam orci enim, faucibus eget lorem in, pulvinar sollicitudin turpis. Donec eget orci ut justo viverra venenatis eget at nibh. Pellentesque ac odio est. Pellentesque sed suscipit purus.</Descriptions.Item>
                            <Descriptions.Item label='Birthday'>20/10/1990</Descriptions.Item>
                            <Descriptions.Item label='Email'>hoant@gmail.com</Descriptions.Item>
                            <Descriptions.Item label='Phone'>
                                1810000000
                            </Descriptions.Item>
                            <Descriptions.Item label='Teaching period'>2020 - now</Descriptions.Item>
                        </Descriptions>
                    </AppCard>
                </Col>
            </AppRowContainer>
        </>
    )
}

export default TeacherDetail
