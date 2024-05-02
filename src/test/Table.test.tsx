import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import MyTableComponent from './../component/Table'; // Adjust the path as per your project structure

jest.mock('axios');

describe('MyTableComponent', () => {
    it('renders correctly', async () => {
        const mockData = [
            { id: 1, EmployeeNumber: '001', FirstName: 'John', LastName: 'Doe', Salutation: 'Mr', EPColour: 'blue' },
            { id: 2, EmployeeNumber: '002', FirstName: 'Jane', LastName: 'Doe', Salutation: 'Ms', EPColour: 'red' },
        ];
        (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockData });

        const { getByText } = render(<MyTableComponent />);

        await waitFor(() => {
            expect(getByText('Employee #')).toBeInTheDocument();
            expect(getByText('First Name')).toBeInTheDocument();
            expect(getByText('Last Name')).toBeInTheDocument();
            expect(getByText('Salutation')).toBeInTheDocument();
            expect(getByText('Profile Colour')).toBeInTheDocument();
        });
    });

    it('opens modal on edit button click', async () => {
        const mockData = [
            { id: 1, EmployeeNumber: '001', FirstName: 'John', LastName: 'Doe', Salutation: 'Mr', EPColour: 'blue' },
        ];
        (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockData });

        const { getByText, getByTestId } = render(<MyTableComponent />);

        await waitFor(() => {
            expect(getByText('John')).toBeInTheDocument();
        });

        fireEvent.click(getByTestId('edit-button'));

        expect(getByTestId('modal')).toBeInTheDocument();
    });
});