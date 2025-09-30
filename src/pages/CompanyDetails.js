import React, { useEffect, useState } from "react";
import { getCompanyDetails, updateCompanyDetails } from "../redux/slices/dataSlice";
import { message } from "antd";
import { useDispatch, useSelector } from "react-redux";

function CompanyDetails() {
    const dispatch = useDispatch();
    const userDetails = JSON.parse(localStorage.getItem("userdetails"));
    const { getCompanyDetailsById: initialData } = useSelector((state) => state?.dataSlice);
    const [form, setForm] = useState({
        name: "",
        description: "",
        contact_email: "",
        contact_phone: "",
        ctc_offered: "",
        interview_process: "",
        mode_of_interview: "",
        platforms: "",
        website_url: "",
        industry_type: "",
        company_size: "",
        headquarters_location: "",
        establishment_year: "",
        min_qualification: "",
        min_marks_10th: "",
        min_marks_12th: "",
        min_marks_ug: "",
        min_marks_pg: "",
        max_backlogs_allowed: "",
        gap_years_allowed: "",
        offer_type: "",
        joining_date: "",
        bond_details: "",
        selection_rounds: "",
        benefits: "",
        preferred_skills: "",
        preferred_locations: "",
    });
    useEffect(() => {
        dispatch(getCompanyDetails(userDetails?.companyId));
    }, [userDetails?.companyId, dispatch]);

    useEffect(() => {
        if (initialData && Object.keys(initialData).length > 0) {
            setForm({
                name: initialData.name || "",
                description: initialData.description || "",
                contact_email: initialData.contact_email || "",
                contact_phone: initialData.contact_phone || "",
                ctc_offered: initialData.ctc_offered || "",
                interview_process: initialData.interview_process || "",
                mode_of_interview: initialData.mode_of_interview || "",
                platforms: initialData.platforms || "",
                website_url: initialData.website_url || "",
                industry_type: initialData.industry_type || "",
                company_size: initialData.company_size || "",
                headquarters_location: initialData.headquarters_location || "",
                establishment_year: initialData.establishment_year || "",
                min_qualification: initialData.min_qualification || "",
                min_marks_10th: initialData.min_marks_10th || "",
                min_marks_12th: initialData.min_marks_12th || "",
                min_marks_ug: initialData.min_marks_ug || "",
                min_marks_pg: initialData.min_marks_pg || "",
                max_backlogs_allowed: initialData.max_backlogs_allowed || "",
                gap_years_allowed: initialData.gap_years_allowed || "",
                offer_type: initialData.offer_type || "",
                joining_date: initialData.joining_date || "",
                bond_details: initialData.bond_details || "",
                selection_rounds: initialData.selection_rounds || "",
                benefits: initialData.benefits || "",
                preferred_skills: initialData.preferred_skills || "",
                preferred_locations: initialData.preferred_locations || "",
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateCompanyDetails({ id: userDetails?.companyId, registerData : form })).unwrap().then((res) => {
            message.success('Company details updated successfully')
        }).catch((error) => {
            message.error(error?.message ?? 'Failed to update company details')
        })
    };

    return (
        <form onSubmit={handleSubmit} style={{ margin: "0 50px" }}>
            <h2 style={{ marginBottom: 20 }}>Update Student Details</h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 24 }}>
                <div style={{ flex: '1 1 200px', minWidth: 250 }}>
                    <label>Company Name:</label>
                    <input name="name" value={form.name} onChange={handleChange} required />
                </div>
                <div style={{ flex: '1 1 200px', minWidth: 250 }}>
                    <label>Description:</label>
                    <input name="description" value={form.description} onChange={handleChange}  />
                </div>
                <div style={{ flex: '1 1 200px', minWidth: 250 }}>
                    <label>Contact Email:</label>
                    <input name="contact_email" value={form.contact_email} onChange={handleChange} required />
                </div>
                <div style={{ flex: '1 1 200px', minWidth: 250 }}>
                    <label>Contact Phone:</label>
                    <input name="contact_phone" value={form.contact_phone} onChange={handleChange} required />
                </div>
                <div style={{ flex: '1 1 200px', minWidth: 250 }}>
                    <label>CTC Offered:</label>
                    <input name="ctc_offered" type="number" value={form.ctc_offered} onChange={handleChange}  />
                </div>
                <div style={{ flex: '1 1 200px', minWidth: 250 }}>
                    <label>Interview Process:</label>
                    <input name="interview_process" value={form.interview_process} onChange={handleChange} />
                </div>
                <div style={{ flex: '1 1 200px', minWidth: 250 }}>
                    <label>Mode of Interview:</label>
                    <input name="mode_of_interview" value={form.mode_of_interview} onChange={handleChange} />
                </div>
                <div style={{ flex: '1 1 200px', minWidth: 250 }}>
                    <label>Platforms:</label>
                    <input name="platforms" value={form.platforms} onChange={handleChange} />
                </div>
                <div style={{ flex: '1 1 200px', minWidth: 250 }}>
                    <label>Website URL:</label>
                    <input name="website_url" type="url" value={form.website_url} onChange={handleChange}  />
                </div>
                <div style={{ flex: '1 1 200px', minWidth: 250 }}>
                    <label>Industry Type:</label>
                    <input name="industry_type" value={form.industry_type} onChange={handleChange}  />
                </div>
                <div style={{ flex: '1 1 200px', minWidth: 250 }}>
                    <label>Company Size:</label>
                    <input name="company_size" value={form.company_size} onChange={handleChange} />
                </div>
                <div style={{ flex: '1 1 200px', minWidth: 250 }}>
                    <label>Headquarters Location:</label>
                    <input name="headquarters_location" value={form.headquarters_location} onChange={handleChange} />
                </div>
                <div style={{ flex: '1 1 200px', minWidth: 250 }}>
                    <label>Establishment Year:</label>
                    <input name="establishment_year" type="number" value={form.establishment_year} onChange={handleChange} />
                </div>
                <div style={{ flex: '1 1 200px', minWidth: 250 }}>
                    <label>Min Qualification:</label>
                    <input name="min_qualification" value={form.min_qualification} onChange={handleChange} />
                </div>
                <div style={{ flex: '1 1 200px', minWidth: 250 }}>
                    <label>Min Marks 10th:</label>
                    <input name="min_marks_10th" type="number" value={form.min_marks_10th} onChange={handleChange} />
                </div>
                <div style={{ flex: '1 1 200px', minWidth: 250 }}>
                    <label>Min Marks 12th:</label>
                    <input name="min_marks_12th" type="number" value={form.min_marks_12th} onChange={handleChange} />
                </div>
                <div style={{ flex: '1 1 200px', minWidth: 250 }}>
                    <label>Min Marks UG:</label>
                    <input name="min_marks_ug" type="number" value={form.min_marks_ug} onChange={handleChange} />
                </div>
                <div style={{ flex: '1 1 200px', minWidth: 250 }}>
                    <label>Min Marks PG:</label>
                    <input name="min_marks_pg" type="number" value={form.min_marks_pg} onChange={handleChange} />
                </div>
                <div style={{ flex: '1 1 200px', minWidth: 250 }}>
                    <label>Max Backlogs Allowed:</label>
                    <input name="max_backlogs_allowed" type="number" value={form.max_backlogs_allowed} onChange={handleChange} />
                </div>
                <div style={{ flex: '1 1 200px', minWidth: 250 }}>
                    <label>Gap Years Allowed:</label>
                    <input name="gap_years_allowed" type="number" value={form.gap_years_allowed} onChange={handleChange} />
                </div>
                <div style={{ flex: '1 1 200px', minWidth: 250 }}>
                    <label>Offer Type:</label>
                    <input name="offer_type" value={form.offer_type} onChange={handleChange} required />
                </div>
                <div style={{ flex: '1 1 200px', minWidth: 250 }}>
                    <label>Joining Date:</label>
                    <input name="joining_date" type="date" value={form.joining_date} onChange={handleChange} />
                </div>
                <div style={{ flex: '1 1 200px', minWidth: 250 }}>
                    <label>Bond Details:</label>
                    <input name="bond_details" value={form.bond_details} onChange={handleChange} />
                </div>
                <div style={{ flex: '1 1 200px', minWidth: 250 }}>
                    <label>Selection Rounds:</label>
                    <input name="selection_rounds" value={form.selection_rounds} onChange={handleChange} />
                </div>
                <div style={{ flex: '1 1 200px', minWidth: 250 }}>
                    <label>Benefits:</label>
                    <input name="benefits" value={form.benefits} onChange={handleChange} />
                </div>
                <div style={{ flex: '1 1 200px', minWidth: 250 }}>
                    <label>Preferred Skills:</label>
                    <input name="preferred_skills" value={form.preferred_skills} onChange={handleChange} />
                </div>
                <div style={{ flex: '1 1 200px', minWidth: 250 }}>
                    <label>Preferred Locations:</label>
                    <input name="preferred_locations" value={form.preferred_locations} onChange={handleChange} />
                </div>
            </div>
            <button type="submit" style={{ background: "#4b95a2", color: "#fff", border: "none", borderRadius: 5, padding: "10px 0", fontWeight: 500, width: "100%", marginTop: 24 }}>Submit</button>
        </form>
    );
}

export default CompanyDetails;