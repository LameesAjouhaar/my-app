import React from 'react';
import { Modal } from 'antd';
import FormComponent from './Form';

interface ModalProps {
    isVisible: boolean;
    onClose: () => void;
    children?: React.ReactNode;
}

const ModalComponent: React.FC<ModalProps> = ({ isVisible, onClose, children }) => {
    //this is the modal component that will launch to display form
    // handles on cancel, which closes the modal
    return (
        <Modal
            title="Employee Information"
            visible={isVisible}
            onOk={onClose}
            onCancel={onClose}
            footer={null}
        >
            <FormComponent employee={children} />
        </Modal>
    );
};

export default ModalComponent;
