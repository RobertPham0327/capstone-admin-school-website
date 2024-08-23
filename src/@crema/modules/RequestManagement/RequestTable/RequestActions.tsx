import React, { useState } from 'react';
import { Dropdown, Modal, Button, message } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import AppIconButton from '@crema/components/AppIconButton';
import { Request } from '@crema/types/models/apps/Request';
import { updateRequestStatus } from '@crema/services/api/requests';

const items = [
  { key: 1, label: <span style={{ fontSize: 14 }}>View Request</span> },
  { key: 2, label: <span style={{ fontSize: 14 }}>Delete</span> },
];

const RequestActions = ({ request }: { request: Request }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleApprove = async () => {
    try {
      await updateRequestStatus(request.id, 'approved');
      message.success('Request approved successfully');
      window.location.reload();
    } catch (error) {
      message.error('Failed to approve request');
      console.log(error);
    }
  };

  const handleReject = async () => {
    try {
      await updateRequestStatus(request.id, 'rejected');
      message.success('Request rejected successfully');
      window.location.reload();
    } catch (error) {
      message.error('Failed to reject request');
    }
  };
  const onMenuClick = ({ key }: { key: React.Key }) => {
    if (key === '1') {
      showModal();
    }
    // Handle other actions like delete
  };

  return (
    <>
      <Dropdown menu={{ items, onClick: onMenuClick }} trigger={['click']}>
        <AppIconButton icon={<MoreOutlined />} />
      </Dropdown>

      <Modal
        title="Request Details"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="reject" danger onClick={handleReject}>
            Reject
          </Button>,
          <Button key="approve" type="primary" onClick={handleApprove}>
            Approve
          </Button>,
          <Button key="close" onClick={handleCancel}>
            Close
          </Button>,
        ]}
      >
        <p><strong>Request ID:</strong> {request.id}</p>
        <p><strong>Request Type:</strong> {request.request_type}</p>
        <p><strong>Student ID:</strong> {request.student_id}</p>
        <p><strong>Class ID:</strong> {request.class_id}</p>
        <p><strong>Reason:</strong> {request.reason}</p>
        <p><strong>Note:</strong> {request.note}</p>
        <p><strong>Status:</strong> {request.status}</p>
        <p><strong>Description:</strong> {request.description}</p>
        <p><strong>Created At:</strong> {new Date(request.created_at).toLocaleString()}</p>
        <p><strong>Start Time:</strong> {new Date(request.start_time).toLocaleString()}</p>
        <p><strong>End Time:</strong> {new Date(request.end_time).toLocaleString()}</p>
      </Modal>
    </>
  );
};

export default RequestActions;
