import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Modal as AntdModal } from 'antd'; // Import Modal as AntdModal to distinguish from our component
import ModalComponent from './../component/Modal'; // Adjust the path as per your project structure

// Mock the antd Modal component
jest.mock('antd', () => ({
    Modal: jest.fn(({ visible, onOk, onCancel, children }) => (
        <div data-testid="mock-modal" data-visible={visible}>
            <button onClick={onOk}>OK</button>
            <button onClick={onCancel}>Cancel</button>
            {children}
        </div>
    )),
}));

describe('ModalComponent', () => {
    it('renders correctly', () => {
        const onCloseMock = jest.fn(); // Mock onClose function
        const { getByText, queryByTestId } = render(
            <ModalComponent isVisible={true} onClose={onCloseMock}>
                <div>Mock Form</div>
            </ModalComponent>
        );

        expect(getByText('Employee Information')).toBeInTheDocument();
        expect(getByText('OK')).toBeInTheDocument();
        expect(getByText('Cancel')).toBeInTheDocument();
        expect(queryByTestId('mock-modal')).toHaveAttribute('data-visible', 'true');
    });

    it('closes modal on OK button click', () => {
        const onCloseMock = jest.fn();
        const { getByText } = render(
            <ModalComponent isVisible={true} onClose={onCloseMock}>
                <div>Mock Form</div>
            </ModalComponent>
        );

        fireEvent.click(getByText('OK'));
        expect(onCloseMock).toHaveBeenCalled();
    });

    it('closes modal on Cancel button click', () => {
        const onCloseMock = jest.fn();
        const { getByText } = render(
            <ModalComponent isVisible={true} onClose={onCloseMock}>
                <div>Mock Form</div>
            </ModalComponent>
        );

        fireEvent.click(getByText('Cancel'));
        expect(onCloseMock).toHaveBeenCalled();
    });
});
