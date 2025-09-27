import { message, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { fetchSingleStudentData, updateStudentFrom } from '../redux/slices/dataSlice';
import { useDispatch, useSelector } from 'react-redux';

function UpdateStudentForm() {
    const dispatch = useDispatch();
    const userDetails = JSON.parse(localStorage.getItem("userdetails"));
    const { singleStudentData: initialData } = useSelector((state) => state?.dataSlice);

    const [form, setForm] = useState({
        student_id: userDetails?.studentId || '',
        ctc: '',
        resume_url: '',
        marks_10th: '',
        marks_12th: '',
        marks_ug: '',
        marks_pg: '',
        expected_ctc: '',
        gender: '',
        dob: '',
        ug_branch: '',
        ug_college: '',
        pg_branch: '',
        pg_college: '',
        backlogs: 0,
        gap_years: 0,
        technical_skills: '',
        soft_skills: '',
        certifications: '',
        projects: '',
        preferred_job_roles: '',
        preferred_locations: '',
    });

    useEffect(() => {
        dispatch(fetchSingleStudentData(userDetails?.studentId));
    }, [userDetails?.studentId, dispatch]);

    // Set form data when initialData changes
    useEffect(() => {
        if (initialData) {
            setForm({
                student_id: userDetails?.studentId || '',
                ctc: initialData.ctc || null,
                roll_no: initialData.roll_no,
                department_id: initialData.department_id,
                full_name: initialData.full_name,
                phone: initialData.phone,
                email: initialData.email,
                password: initialData.password,
                resume_url: initialData.resume_url || null,
                marks_10th: initialData.marks_10th || null,
                marks_12th: initialData.marks_12th || null,
                marks_ug: initialData.marks_ug || null,
                marks_pg: initialData.marks_pg || null,
                expected_ctc: initialData.expected_ctc || null,
                gender: initialData.gender || null,
                dob: initialData.dob || null,
                ug_branch: initialData.ug_branch || null,
                ug_college: initialData.ug_college || null,
                pg_branch: initialData.pg_branch || null,
                pg_college: initialData.pg_college || null,
                backlogs: initialData.backlogs || 0,
                gap_years: initialData.gap_years || 0,
                technical_skills: initialData.technical_skills || null,
                soft_skills: initialData.soft_skills || null,
                certifications: initialData.certifications || null,
                projects: initialData.projects || null,
                preferred_job_roles: initialData.preferred_job_roles || null,
                preferred_locations: initialData.preferred_locations || null,
            });
        }
    }, [initialData, userDetails?.studentId]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateStudentFrom(form)).unwrap().then((res) => {
            message.success('Student details updated successfully');
            // Optionally, reset the form or perform other actions
        }).catch((error) => {
            message.error(error?.error ?? 'Failed to update student details');
        });
    };

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: 900, margin: '0 auto' }}>
            <h2 style={{ marginBottom: 20 }}>Update Student Details</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
                {/* Change minWidth and flex for 3 per row */}
                <div style={{ flex: '1 1 200px', minWidth: 200 }}>
                    <label>Resume URL:</label>
                    <input
                        type="url"
                        name="resume_url"
                        value={form.resume_url}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div style={{ flex: '1 1 200px', minWidth: 200 }}>
                    <label>CTC:</label>
                    <input
                        type="number"
                        name="ctc"
                        value={form.ctc}
                        onChange={handleChange}
                    />
                </div>
                <div style={{ flex: '1 1 200px', minWidth: 200 }}>
                    <label>10th Marks:</label>
                    <input
                        type="number"
                        name="marks_10th"
                        value={form.marks_10th}
                        onChange={handleChange}
                    />
                </div>
                <div style={{ flex: '1 1 200px', minWidth: 200 }}>
                    <label>12th Marks:</label>
                    <input
                        type="number"
                        name="marks_12th"
                        value={form.marks_12th}
                        onChange={handleChange}
                    />
                </div>
                <div style={{ flex: '1 1 200px', minWidth: 200 }}>
                    <label>UG Marks:</label>
                    <input
                        type="number"
                        name="marks_ug"
                        value={form.marks_ug}
                        onChange={handleChange}
                    />
                </div>
                <div style={{ flex: '1 1 200px', minWidth: 200 }}>
                    <label>PG Marks:</label>
                    <input
                        type="number"
                        name="marks_pg"
                        value={form.marks_pg}
                        onChange={handleChange}
                    />
                </div>
                <div style={{ flex: '1 1 200px', minWidth: 200 }}>
                    <label>Expected CTC:</label>
                    <input
                        type="number"
                        name="expected_ctc"
                        value={form.expected_ctc}
                        onChange={handleChange}
                    />
                </div>
                <div style={{ flex: '1 1 200px', minWidth: 200 }}>
                    <label>Gender:</label>
                    <Select name="gender" value={form.gender} onChange={(value) => setForm(prev => ({ ...prev, gender: value }))} style={{ width: '100%', height: 42 }}>
                        <option value="">Select</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>

                    </Select>
                </div>
                <div style={{ flex: '1 1 200px', minWidth: 200 }}>
                    <label>Date of Birth:</label>
                    <input
                        type="date"
                        name="dob"
                        value={form.dob}
                        onChange={handleChange}
                    />
                </div>
                <div style={{ flex: '1 1 200px', minWidth: 200 }}>
                    <label>UG Branch:</label>
                    <input
                        type="text"
                        name="ug_branch"
                        value={form.ug_branch}
                        onChange={handleChange}
                    />
                </div>
                <div style={{ flex: '1 1 200px', minWidth: 200 }}>
                    <label>UG College:</label>
                    <input
                        type="text"
                        name="ug_college"
                        value={form.ug_college}
                        onChange={handleChange}
                    />
                </div>
                <div style={{ flex: '1 1 200px', minWidth: 200 }}>
                    <label>PG Branch:</label>
                    <input
                        type="text"
                        name="pg_branch"
                        value={form.pg_branch}
                        onChange={handleChange}
                    />
                </div>
                <div style={{ flex: '1 1 200px', minWidth: 200 }}>
                    <label>PG College:</label>
                    <input
                        type="text"
                        name="pg_college"
                        value={form.pg_college}
                        onChange={handleChange}
                    />
                </div>
                <div style={{ flex: '1 1 200px', minWidth: 200 }}>
                    <label>Backlogs:</label>
                    <input
                        type="number"
                        name="backlogs"
                        value={form.backlogs}
                        onChange={handleChange}
                    />
                </div>
                <div style={{ flex: '1 1 200px', minWidth: 200 }}>
                    <label>Gap Years:</label>
                    <input
                        type="number"
                        name="gap_years"
                        value={form.gap_years}
                        onChange={handleChange}
                    />
                </div>
                <div style={{ flex: '1 1 200px', minWidth: 200 }}>
                    <label>Technical Skills:</label>
                    <input
                        type="text"
                        name="technical_skills"
                        value={form.technical_skills}
                        onChange={handleChange}
                    />
                </div>
                <div style={{ flex: '1 1 200px', minWidth: 200 }}>
                    <label>Soft Skills:</label>
                    <input
                        type="text"
                        name="soft_skills"
                        value={form.soft_skills}
                        onChange={handleChange}
                    />
                </div>
                <div style={{ flex: '1 1 200px', minWidth: 200 }}>
                    <label>Certifications:</label>
                    <input
                        type="text"
                        name="certifications"
                        value={form.certifications}
                        onChange={handleChange}
                    />
                </div>
                <div style={{ flex: '1 1 200px', minWidth: 200 }}>
                    <label>Projects:</label>
                    <input
                        type="text"
                        name="projects"
                        value={form.projects}
                        onChange={handleChange}
                    />
                </div>
                <div style={{ flex: '1 1 200px', minWidth: 200 }}>
                    <label>Preferred Job Roles:</label>
                    <input
                        type="text"
                        name="preferred_job_roles"
                        value={form.preferred_job_roles}
                        onChange={handleChange}
                    />
                </div>
                <div style={{ flex: '1 1 200px', minWidth: 200 }}>
                    <label>Preferred Locations:</label>
                    <input
                        type="text"
                        name="preferred_locations"
                        value={form.preferred_locations}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <button className="btn" type="submit" style={{ marginTop: 24 }}>Update</button>
        </form>
    );
}

export default UpdateStudentForm;