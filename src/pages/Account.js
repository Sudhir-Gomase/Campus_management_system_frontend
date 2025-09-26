import { Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import '../styles/account.css'
const Account = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [employeeData, setEmployeeData] = useState({
        name: "",
        email: "",
        phone: "",
    });
    const userName = localStorage.getItem('userName')
    const userDetails = JSON.parse(localStorage.getItem("userdetails"));
    useEffect(() => {
        if (!employeeData?.name && !employeeData?.email && !employeeData?.phone) {
            setEmployeeData({
                name: userDetails?.name || "",
                email: userDetails?.email || "",
                phone: userDetails?.phone || "",
            });
        }
    }, [userDetails]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployeeData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <div className="container-account">
            <div className="account-card">
                <div className="intials-bg">  {userName?.charAt(0).toUpperCase()}</div>
                <div className="name-account">{userName}</div>
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

                    {/* <div style={{ position: "relative" }}>
                        <div className="label">Change Password</div>
                        <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="**********"
                            readOnly
                            value={userDetails.password}
                        />
                        <div onClick={() => setShowPassword(!showPassword)} className="password-icon">
                            {showPassword ? <Eye /> : <EyeOff />}
                        </div>
                    </div > */}
                </Form>
                <div className="button-group">
                    <button type='submit' className="button-primary">Save Changes</button>
                    <button type='button' >Discard Changes</button>
                </div >
            </div>
        </div>
    );
};

export default Account;
