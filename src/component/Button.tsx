import React from 'react';
import { Flex, Button } from 'antd';

interface ButtonProps {
    onClick: () => void;
}

const ButtonComponent: React.FC<ButtonProps> = ({ onClick }) => {
    //this button is initialized on landing
    //onclick it will launch modal with new form
    return (
        <Flex justify="end" gap="small" wrap="wrap" style={{ paddingRight: '50px' }}>
            <Button type="primary" onClick={onClick} style={{ backgroundColor: '#ff69b4', borderColor: '#ff69b4' }}>
                Add Employee
            </Button>
        </Flex>
    );
};

export default ButtonComponent;
