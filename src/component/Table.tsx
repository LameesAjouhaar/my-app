import React, { useEffect, useState } from 'react';
import { Table, Button } from 'antd';
import axios from 'axios';
import ModalComponent from './../component/Modal';
import { EditOutlined } from '@ant-design/icons';
import FormComponent from './Form';
import './../styles/styles.css';



const MyTableComponent: React.FC = () => {

    const [employees, setEmployees] = useState<any[]>([]); // state to hold all employee data
    const [isModalVisible, setIsModalVisible] = useState(false); //check if modal is visible, true or false
    const [selectedEmployee, setSelectedEmployee] = useState<any>(null); // State to hold selected employee data

    useEffect(() => {
        // Fetch employee data when the component mounts
        fetchEmployees();


    }, [selectedEmployee]);

    const fetchEmployees = () => {
        axios.get('/employees')
            .then((res) => {
                const sortedEmployees = res.data.sort((a: { id: number; }, b: { id: number; }) => b.id - a.id);
                setEmployees(sortedEmployees); // Set employee data in state
            })
            .catch((err) => console.log(err));
    };

    const handleEdit = (record: any) => {
        // Handle edit button click

        setSelectedEmployee(record); // Set the selected employee data
        setIsModalVisible(true); //launch modal

    };


    //Table columns
    const columns = [
        {
            title: 'Edit',
            dataIndex: '',
            key: 'edit',
            render: (_: any, record: any) => (
                <Button type="link" onClick={() => handleEdit(record)} icon={<EditOutlined className="pink-icon" />} />
            ),
        },
        {
            title: 'Employee #',
            dataIndex: 'EmployeeNumber',
            key: 'EmployeeNumber',
        },
        {
            title: 'First Name',
            dataIndex: 'FirstName',
            key: 'FirstName',
        },
        {
            title: 'Last Name',
            dataIndex: 'LastName',
            key: 'LastName',
        },
        {
            title: 'Salutation',
            dataIndex: 'Salutation',
            key: 'Salutation',
        },
        {
            title: 'Profile Colour',
            dataIndex: 'EPColour',
            key: 'EPColour',
        },
    ];

    return (
        <>
            <div style={{ padding: '50px' }}>
                <Table dataSource={employees} columns={columns} className="custom-table-header" />
            </div>
            <ModalComponent isVisible={isModalVisible} onClose={() => setIsModalVisible(false)}>
                <FormComponent employee={selectedEmployee} />
            </ModalComponent>
        </>
    );
};

export default MyTableComponent;


