import { Form, Input, message } from "antd";
import React, { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import '../styles/account.css'
import { useDispatch } from "react-redux";
import { adminDataUpdate, changePassword } from "../redux/slices/dataSlice";

const Account = () => {
    const dispatch = useDispatch()
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordFields, setShowPasswordFields] = useState(false);
    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: ""
    });
    const [employeeData, setEmployeeData] = useState({
        name: "",
        email: "",
        phone: "",
    });

    const userDetails = JSON.parse(localStorage.getItem("userdetails"));
    useEffect(() => {
        if (!employeeData?.name && !employeeData?.email && !employeeData?.phone) {
            setEmployeeData({
                adminId: userDetails?.adminId || "",
                name: userDetails?.name || "",
                email: userDetails?.email || "",
                phone: userDetails?.phone || "",
            });
        }
    }, [userDetails?.name, userDetails?.email, userDetails?.phone]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployeeData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = () => {
        dispatch(adminDataUpdate({ id: userDetails?.adminId, requestedData: employeeData })).unwrap().then((res) => {
            message.success('Updated successfully')
            localStorage.setItem('userName', employeeData?.name)
            localStorage.setItem('userdetails', JSON.stringify({ ...userDetails, ...employeeData }))
        }).catch((error) => {
            message.error(error?.message ?? 'Failed to update')
        })
    }

    const handleDiscard = () => {
        setEmployeeData({
            name: userDetails?.name || "",
            email: userDetails?.email || "",
            phone: userDetails?.phone || "",
        });
    }
    const handlePasswordSubmit = () => {
        let requestedData = {};
        if (userDetails?.role === 'admin') {
            requestedData = {
                adminId: userDetails?.adminId,
                ...passwordData,
                type: userDetails?.role
            };
        } else if (userDetails?.role === 'student') {
            requestedData = {
                studentId: userDetails?.studentId,
                ...passwordData,
                type: userDetails?.role
            };
        } else {
            requestedData = {
                companyId: userDetails?.companyId,
                ...passwordData,
                type: userDetails?.role
            };
        }
        dispatch(changePassword(requestedData)).unwrap().then((res) => {
            message.success('Password changed successfully')
            setShowPasswordFields(false);
            setPasswordData({ currentPassword: "", newPassword: "" });
        }).catch((error) => {
            message.error(error?.message ?? 'Failed to change password')
        })
    };

    const handlePasswordDiscard = () => {
        setShowPasswordFields(false);
        setPasswordData({ currentPassword: "", newPassword: "" });
    };

    return (
        <div className="container-account">
            <div className="account-card">
                <div className="intials-bg">  {employeeData?.name?.charAt(0).toUpperCase()}</div>
                <div className="name-account">{employeeData?.name}</div>
                {!showPasswordFields ? (
                    <>
                        <Form style={{ display: 'flex', flexDirection: 'column', gap: 20, marginTop: 20 }}>
                            <div>
                                <div className="label">Full Name</div>
                                <Input
                                    type="text"
                                    name="name"
                                    value={`${employeeData.name}`}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <div className="label">Email ID</div>
                                <Input
                                    type="email"
                                    name="email"
                                    value={employeeData.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <div className="label">Phone Number</div>
                                <Input
                                    type="number"
                                    name="phone"
                                    value={employeeData.phone}
                                    onChange={handleChange}
                                />
                            </div>
                        </Form>
                        <div style={{ marginTop: 10, textAlign: "right" }}>
                            <span
                                style={{ color: "#4b95a2", cursor: "pointer", fontWeight: 500 }}
                                onClick={() => setShowPasswordFields(true)}
                            >
                                Change Password
                            </span>
                        </div>
                        <div className="button-group">
                            <button type='submit' className="button-primary" onClick={handleSubmit}>Save Changes</button>
                            <button type='button' className='button-secondary' onClick={handleDiscard}>Discard Changes</button>
                        </div >
                    </>
                ) : (
                    <Form style={{ display: 'flex', flexDirection: 'column', gap: 20, marginTop: 20 }}>
                        <div>
                            <div className="label">Current Password</div>
                            <Input.Password
                                name="currentPassword"
                                value={passwordData.currentPassword}
                                onChange={handlePasswordChange}
                                visibilityToggle
                                placeholder="Enter current password"
                            />
                        </div>
                        <div>
                            <div className="label">New Password</div>
                            <Input.Password
                                name="newPassword"
                                value={passwordData.newPassword}
                                onChange={handlePasswordChange}
                                visibilityToggle
                                placeholder="Enter new password"
                            />
                        </div>
                        <div className="button-group">
                            <button type='button' className="button-primary" onClick={handlePasswordSubmit}>Change</button>
                            <button type='button' className='button-secondary' onClick={handlePasswordDiscard}>Discard</button>
                        </div>
                    </Form>
                )}
            </div>
        </div>
    );
};

export default Account;