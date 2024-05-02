import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ButtonComponent from './../component/Button';
// Mock the antd Button component
jest.mock('antd', () => ({
    Button: jest.fn(({ onClick, children }) => (
        <button onClick={onClick}>{children}</button>
    )),
    Flex: jest.fn(({ children }) => <div>{children}</div>), // Mock Flex as well if necessary
}));

describe('ButtonComponent', () => {
    it('renders correctly', () => {
        const onClickMock = jest.fn(); // Mock onClick function
        const { getByText } = render(<ButtonComponent onClick={onClickMock} />);

        expect(getByText('Add Employee')).toBeInTheDocument();
    });

    it('calls onClick when button is clicked', () => {
        const onClickMock = jest.fn();
        const { getByText } = render(<ButtonComponent onClick={onClickMock} />);

        fireEvent.click(getByText('Add Employee'));
        expect(onClickMock).toHaveBeenCalled();
    });
});

