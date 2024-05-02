import React, { useEffect, useState } from 'react';
import './../styles/EmployeeForm.css';
import axios from 'axios';


interface IFormProps {
    employee: any; //passing employee data based on ID
}

interface EmployeeFormData {
    id?: number; // id property optional
    FirstName: string;
    LastName: string;
    Salutation: string;
    Gender: string;
    EmployeeNumber: string;
    FullName: string;
    Salary: string;
    EPColour: string;
}



const Form: React.FC<IFormProps> = ({ employee }) => {
    const [formData, setFormData] = useState<EmployeeFormData>({

        FirstName: '',
        LastName: '',
        Salutation: '',
        Gender: '',
        EmployeeNumber: '',
        FullName: '',
        Salary: '',
        EPColour: 'Default'
    });

    const [formOpen, setFormOpen] = useState(true);
    const [IdState, setIdState] = useState<number>();


    useEffect(() => {


        const employeeData = employee?.props?.employee || {};
        if (employee) {

            console.log(employeeData)
            setFormData(employeeData);
            setIdState(employeeData.id);
        }
    }, [employee]);

    useEffect(() => {
        // Update Gender to "Male" when Salutation is "Mr"
        if (formData.Salutation === 'Mr') {
            setFormData(prevData => ({
                ...prevData,
                Gender: 'Male'
            }));
        } else if (formData.Salutation === 'Mrs' || formData.Salutation === 'Ms') {
            setFormData(prevData => ({
                ...prevData,
                Gender: 'Female'
            }));
        }

        else if (formData.Salutation === 'Mx') {
            setFormData(prevData => ({
                ...prevData,
                Gender: 'Unspecified'
            }));
        }
    }, [formData.Salutation]);

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;




        if (name === 'Salutation') {
            let GenderValue = '';
            if (value === 'Mr') {
                GenderValue = 'Male';
            } else if (value === 'Mrs' || value === 'Ms') {
                GenderValue = 'Female';
            } else if (value === "Mx") {
                GenderValue = "Unspecified";
            }
            setFormData(prevData => ({
                ...prevData,
                Gender: GenderValue,
                [name]: value
            }));
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }

        // Update FullName if FirstName and LastName are changed
        if (name === 'FirstName' || name === 'LastName') {
            setFormData(prevData => ({
                ...prevData,
                FullName: prevData.FirstName + ' ' + prevData.LastName
            }));
        }
    };

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Form data:', formData);
        console.log("ID", IdState);

        const employeeId = formData.id;

        if (employeeId) {
            // If employeeId exists, it means we're editing an existing employee
            // Remove ID from formData to prevent it from being sent as part of the request body
            delete formData.id;

            // Send PUT request to update existing employee
            axios.put(`/employees/${employeeId}`, formData)
                .then((res) => {
                    console.log(res);
                    // Handle success response
                    window.location.reload();
                })
                .catch((err) => {
                    console.log(err);
                    // Handle error response
                });
        } else {
            // If employeeId does not exist, it means we're creating a new employee
            // Send POST request to create new employee
            axios.post('/employees', formData)
                .then((res) => {
                    console.log(res);
                    // Handle success response
                    window.location.reload();
                })
                .catch((err) => console.log(err));
        }

    };

    const handleCancel = () => {
        // Handle cancel operation
        window.location.reload(); // Reload the page
    };


    return (


        <div className="form-container">

            <form onSubmit={handleSubmit}>

                <label>
                    First Name(s)*
                    <input
                        type="text"
                        name="FirstName"
                        value={formData.FirstName}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Last Name*
                    <input
                        type="text"
                        name="LastName"
                        value={formData.LastName}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Salutation*
                    <select
                        name="Salutation"
                        value={formData.Salutation}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select</option>
                        <option value="Dr">Dr</option>
                        <option value="Mr">Mr</option>
                        <option value="Mrs">Mrs</option>
                        <option value="Ms">Ms</option>
                        <option value="Mx">Mx</option>
                    </select>
                </label>

                <label>Gender*</label>
                <div className="Gender-options">
                    <div>
                        <input type="radio" id="male" name="Gender" value="Male" onChange={handleChange} checked={formData.Gender === 'Male'} />
                        <label htmlFor="male">Male</label>
                    </div>
                    <div>
                        <input type="radio" id="female" name="Gender" value="Female" onChange={handleChange} checked={formData.Gender === 'Female'} />
                        <label htmlFor="female">Female</label>
                    </div>
                    <div>
                        <input type="radio" id="unspecified" name="Gender" value="Unspecified" onChange={handleChange} checked={formData.Gender === 'Unspecified'} />
                        <label htmlFor="unspecified">Unspecified</label>
                    </div>
                </div>


                <label>
                    Employee #*
                    <input
                        type="number"
                        name="EmployeeNumber"
                        value={formData.EmployeeNumber}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Full Name
                    <input
                        type="text"
                        name="FullName"
                        value={formData.FullName}
                        readOnly
                    />
                </label>
                <label>
                    Gross Salary $PY
                    <input
                        type="number"
                        name="Salary"
                        value={formData.Salary}
                        onChange={handleChange}

                    />
                </label>
                <label>
                    Employee Profile Colour
                </label>
                <div className="colour-options">
                    <label className="colour-option">
                        <input
                            type="checkbox"
                            name="EPColour"
                            value="Default"
                            checked={formData.EPColour === 'Default'}
                            onChange={handleChange}
                        />
                        Default
                    </label>
                    <label className="colour-option">
                        <input
                            type="checkbox"
                            name="EPColour"
                            value="Blue"
                            checked={formData.EPColour === 'Blue'}
                            onChange={handleChange}
                        />
                        Blue
                    </label>
                    <label className="colour-option">
                        <input
                            type="checkbox"
                            name="EPColour"
                            value="Red"
                            checked={formData.EPColour === 'Red'}
                            onChange={handleChange}
                        />
                        Red
                    </label>
                    <label className="colour-option">
                        <input
                            type="checkbox"
                            name="EPColour"
                            value="Green"
                            checked={formData.EPColour === 'Green'}
                            onChange={handleChange}
                        />
                        Green
                    </label>
                </div>

                <div>
                    <button type="submit" style={{ backgroundColor: formData.EPColour ? formData.EPColour.toLowerCase() : 'Default' }}>Save</button>
                    <button type="button" onClick={handleCancel} >Cancel</button>
                </div>
            </form>
        </div>

    );
};

export default Form;
