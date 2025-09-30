import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apis from "../apis";
import { API_ENDPOINTS, METHOD_TYPE } from "../apiUrls";


const initialState = {
  departmentList: [],
  departmentDeatils: {},
  dountChart: {},
  academicYearData: [],
  companyListData: [],
  overAllCompanyListData: [],
  overAllCompanyForStudentListData: [],
  singleStudentData: {},
  studentOnGoingProcessData: [],
  getNotificationData: [],
  getNotificationDataId: [],
  companyIdApplicationsData: [],
  notficationTemplateData: {},
  getCompanyDetailsById: {},
  isLoading: false,
  error: null,
};

export const loginRequest = createAsyncThunk("campus/loginRequest", async (requestedData) => {
  const url = requestedData?.type === 'admin' ? API_ENDPOINTS.adminLogin : requestedData?.type === 'student' ? API_ENDPOINTS.studentLogin : API_ENDPOINTS.companyLogin
  try {
    const data = {
      method: METHOD_TYPE.post,
      url: url,
      data: requestedData
    };
    const response = await apis(data);
    return response?.data?.data;
  } catch (error) {
    throw error.response?.data?.error;
  }
}
);

export const changePassword = createAsyncThunk("campus/loginRequest", async (requestedData) => {
  const url = requestedData?.type === 'admin' ? `/admin/${API_ENDPOINTS.changepassword}` : requestedData?.type === 'student' ? `/student/${API_ENDPOINTS.changepassword}` : `/company/${API_ENDPOINTS.changepassword}`
  try {
    const data = {
      method: METHOD_TYPE.put,
      url: url,
      data: requestedData
    };
    const response = await apis(data);
    return response?.data?.data;
  } catch (error) {
    throw error.response;
  }
}
);

export const fetchDepartmentList = createAsyncThunk("campus/fetchDepartmentList", async () => {
  try {
    const data = {
      method: METHOD_TYPE.get,
      url: API_ENDPOINTS.department,
    };
    const response = await apis(data);
    return response?.data?.data;
  } catch (error) {
    throw error.response.data.message;
  }
}
);

export const fetchIndividualDepartment = createAsyncThunk("campus/fetchIndividualDepartment", async (id) => {
  try {
    const data = {
      method: METHOD_TYPE.get,
      url: API_ENDPOINTS.department + `?id=${id}`,
    };
    const response = await apis(data);
    return response?.data?.data;
  } catch (error) {
    throw error.response.data.message;
  }
}
);

export const fetchDountCount = createAsyncThunk("campus/fetchDountCount", async (id) => {
  try {
    const data = {
      method: METHOD_TYPE.get,
      url: API_ENDPOINTS.donutCount + id,
    };
    const response = await apis(data);
    return response?.data?.data;
  } catch (error) {
    throw error.response.data.message;
  }
}
);

export const fetchAcademicYearData = createAsyncThunk("campus/fetchAcademicYearData", async (queryParams) => {
  try {
    const data = {
      method: METHOD_TYPE.get,
      url: API_ENDPOINTS.academicyeardata + queryParams,
    };
    const response = await apis(data);
    return response?.data?.data;
  } catch (error) {
    throw error.response.data.message;
  }
}
);

export const fetchCompanyDataList = createAsyncThunk("campus/fetchCompanyDataList", async () => {
  try {
    const data = {
      method: METHOD_TYPE.get,
      url: API_ENDPOINTS.companylist,
    };
    const response = await apis(data);
    return response?.data?.data;
  } catch (error) {
    throw error.response.data.message;
  }
}
);

export const fetchOverAllCompanyDataList = createAsyncThunk("campus/fetchOverAllCompanyDataList", async (queryParams) => {
  try {
    const data = {
      method: METHOD_TYPE.get,
      url: API_ENDPOINTS.overallcompanydata + queryParams,
    };
    const response = await apis(data);
    return response?.data?.data;
  } catch (error) {
    throw error.response.data.message;
  }
}
);

export const updateStatusOfCompany = createAsyncThunk("campus/updateStatusOfCompany", async (queryParams) => {
  try {
    const data = {
      method: METHOD_TYPE.put,
      url: API_ENDPOINTS.overallcompanydata + queryParams,
    };
    const response = await apis(data);
    return response?.data?.data;
  } catch (error) {
    throw error.response.data.message;
  }
}
);

export const downloadStudentTemplate = createAsyncThunk("campus/downloadStudentTemplate", async (queryParams) => {
  try {
    const data = {
      method: METHOD_TYPE.get,
      url: API_ENDPOINTS.downloadtemplate,
    };
    const response = await apis(data);
    return response?.data;
  } catch (error) {
    throw error.response.data.message;
  }
}
);

export const registerBulkEmployee = createAsyncThunk("campus/registerBulkEmployee", async (requestedData) => {
  const { departmentId, file } = requestedData
  try {
    const data = {
      method: METHOD_TYPE.post,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      url: API_ENDPOINTS.registerbulkemployee + departmentId,
      data: file
    };
    const response = await apis(data);
    return response?.data;
  } catch (error) {
    throw error.response.data.message;
  }
}
);

export const deleteStudent = createAsyncThunk("campus/deleteStudent", async (studentId) => {
  try {
    const data = {
      method: METHOD_TYPE.delete,
      url: API_ENDPOINTS.deleteStudent + studentId,
    };
    const response = await apis(data);
    return response?.data;
  } catch (error) {
    throw error.response.data.message;
  }
}
);


export const fetchOverAllCompanyForStudent = createAsyncThunk("campus/fetchOverAllCompanyForStudent", async (queryParams) => {
  try {
    const data = {
      method: METHOD_TYPE.get,
      url: API_ENDPOINTS.allcompanylistforstudent + queryParams,
    };
    const response = await apis(data);
    return response?.data?.data;
  } catch (error) {
    throw error.response.data.message;
  }
}
);

export const fetchSingleStudentData = createAsyncThunk("campus/fetchSingleStudentData", async (id) => {
  try {
    const data = {
      method: METHOD_TYPE.get,
      url: API_ENDPOINTS.studentdata + id,
    };
    const response = await apis(data);
    return response?.data?.data?.studentData;
  } catch (error) {
    throw error.response.data.message;
  }
}
);

export const updateStudentFrom = createAsyncThunk("campus/updateStudentFrom", async (requestedData) => {
  try {
    const data = {
      method: METHOD_TYPE.post,
      url: API_ENDPOINTS.studentprofileupdate,
      data: requestedData
    };
    const response = await apis(data);
    return response?.data?.data;
  } catch (error) {
    throw error.response.data.message;
  }
}
);

export const getNotification = createAsyncThunk("campus/getNotification", async (requestedData) => {
  try {
    const data = {
      method: METHOD_TYPE.get,
      url: API_ENDPOINTS.getnotification + requestedData.id
    };
    const response = await apis(data);
    return response?.data?.data?.notifications;
  } catch (error) {
    throw error.response.data.message;
  }
}
);

export const getNotificationById = createAsyncThunk("campus/getNotificationById", async (requestedData) => {
  try {
    const data = {
      method: METHOD_TYPE.get,
      url: API_ENDPOINTS.getnotification + requestedData.id + (requestedData.companyId ? `?companyId=${requestedData.companyId}` : ''),
    };
    const response = await apis(data);
    return response?.data?.data?.notifications;
  } catch (error) {
    throw error.response.data.message;
  }
}
);

export const studentOnGoingProcess = createAsyncThunk("campus/studentOnGoingProcess", async (queryParams) => {
  try {
    const data = {
      method: METHOD_TYPE.get,
      url: API_ENDPOINTS.ongoingprocess + queryParams,
    };
    const response = await apis(data);
    return response?.data?.data;
  } catch (error) {
    throw error.response.data.message;
  }
}
);

export const studentAppliedCompany = createAsyncThunk("campus/studentOnGoingProcess", async (requestedData) => {
  try {
    const data = {
      method: METHOD_TYPE.post,
      url: API_ENDPOINTS.studentapplied,
      data: requestedData
    };
    const response = await apis(data);
    return response?.data?.data;
  } catch (error) {
    throw error.response?.data?.error;
  }
}
);

export const adminDataUpdate = createAsyncThunk("campus/adminDataUpdate", async ({ id, requestedData }) => {
  try {
    const data = {
      method: METHOD_TYPE.post,
      url: API_ENDPOINTS.admindataupdate + id,
      data: requestedData
    };
    const response = await apis(data);
    return response?.data?.data;
  } catch (error) {
    throw error.response?.data?.error;
  }
}
);

export const companyIdApplications = createAsyncThunk("campus/companyIdApplications", async ({ id, status }) => {
  try {
    const data = {
      method: METHOD_TYPE.get,
      url: `company/${id}/${API_ENDPOINTS.companyIdApplications}?status=${status || ''}`,
    };
    const response = await apis(data);
    return response?.data?.data?.applications;
  } catch (error) {
    throw error.response?.data?.error;
  }
}
);

export const getNotficationTemplate = createAsyncThunk("campus/getNotficationTemplate", async (status) => {
  try {
    const data = {
      method: METHOD_TYPE.get,
      url: API_ENDPOINTS.getNotficationTemplate + status,
    };
    const response = await apis(data);
    return response?.data?.data;
  } catch (error) {
    throw error.response?.data?.error;
  }
}
);

export const createnotification = createAsyncThunk("campus/createnotification", async (requestedData) => {
  try {
    const data = {
      method: METHOD_TYPE.post,
      url: API_ENDPOINTS.createnotification,
      data: requestedData
    };
    const response = await apis(data);
    return response?.data?.data;
  } catch (error) {
    throw error.response?.data?.error;
  }
}
);


export const updateStudentStatus = createAsyncThunk("campus/updateStudentStatus", async ({ id, studentId, status }) => {
  try {
    const data = {
      method: METHOD_TYPE.put,
      url: `company/${id}/application/${studentId}/status`,
      data: { status }
    };
    const response = await apis(data);
    return response?.data?.data?.applications;
  } catch (error) {
    throw error.response?.data?.error;
  }
}
);

export const companyRegistration = createAsyncThunk("campus/companyRegistration", async (registerData) => {
  try {
    const data = {
      method: METHOD_TYPE.post,
      url: API_ENDPOINTS.companyregistration,
      data: registerData
    };
    const response = await apis(data);
    return response?.data?.data?.applications;
  } catch (error) {
    throw error.response?.data?.error;
  }
}
);

export const getCompanyDetails = createAsyncThunk("campus/getCompanyDetails", async (id) => {
  try {
    const data = {
      method: METHOD_TYPE.get,
      url: API_ENDPOINTS.getcompany + id,
    };
    const response = await apis(data);
    return response?.data?.data;
  } catch (error) {
    throw error.response?.data?.error;
  }
}
);

export const updateCompanyDetails = createAsyncThunk("campus/updateCompanyDetails", async ({id, registerData}) => {
  console.log('registerData=================', registerData)
  try {
    const data = {
      method: METHOD_TYPE.put,
      url: API_ENDPOINTS.updatecompany + id,
      data: registerData
    };
    const response = await apis(data);
    return response?.data?.data;
  } catch (error) {
    throw error.response?.data?.error;
  }
}
);

const dataSlice = createSlice({
  name: "dataSlice",
  initialState,
  reducers: {
    clearDountChart: (state) => {
      state.dountChart = {};
    },
    clearNotificationById: (state) => {
      state.getNotificationDataId = [];
    }
  },
  extraReducers: (builder) => {
    const handleLoading = (state, action) => {
      state.isLoading = action.meta.requestStatus === "pending";
    };

    builder
      .addCase(fetchDepartmentList.fulfilled, (state, action) => {
        state.departmentList = action.payload;
      })
      .addCase(fetchIndividualDepartment.fulfilled, (state, action) => {
        state.departmentDeatils = action.payload;
      })
      .addCase(fetchDountCount.fulfilled, (state, action) => {
        state.dountChart = action.payload;
      })
      .addCase(fetchAcademicYearData.fulfilled, (state, action) => {
        state.academicYearData = action.payload;
      })
      .addCase(fetchAcademicYearData.rejected, (state, action) => {
        state.academicYearData = [];
      })
      .addCase(fetchCompanyDataList.fulfilled, (state, action) => {
        state.companyListData = action.payload;
      })
      .addCase(fetchOverAllCompanyDataList.fulfilled, (state, action) => {
        state.overAllCompanyListData = action.payload;
      })
      .addCase(fetchOverAllCompanyForStudent.fulfilled, (state, action) => {
        state.overAllCompanyForStudentListData = action.payload;
      })
      .addCase(fetchSingleStudentData.fulfilled, (state, action) => {
        state.singleStudentData = action.payload;
      })
      .addCase(studentOnGoingProcess.fulfilled, (state, action) => {
        state.studentOnGoingProcessData = action.payload;
      })
      .addCase(getNotification.fulfilled, (state, action) => {
        state.getNotificationData = action.payload;
      })
      .addCase(getNotificationById.fulfilled, (state, action) => {
        state.getNotificationDataId = action.payload;
      })
      .addCase(companyIdApplications.fulfilled, (state, action) => {
        state.companyIdApplicationsData = action.payload;
      })
      .addCase(getNotficationTemplate.fulfilled, (state, action) => {
        state.notficationTemplateData = action.payload;
      })
      .addCase(getCompanyDetails.fulfilled, (state, action) => {
        state.getCompanyDetailsById = action.payload;
      })
      .addMatcher(
        (action) =>
          action.type === loginRequest.pending.type ||
          action.type === loginRequest.fulfilled.type ||
          action.type === loginRequest.rejected.type ||
          action.type === fetchDepartmentList.pending.type ||
          action.type === fetchDepartmentList.fulfilled.type ||
          action.type === fetchDepartmentList.rejected.type ||
          action.type === fetchIndividualDepartment.pending.type ||
          action.type === fetchIndividualDepartment.fulfilled.type ||
          action.type === fetchIndividualDepartment.rejected.type ||
          action.type === fetchAcademicYearData.pending.type ||
          action.type === fetchAcademicYearData.fulfilled.type ||
          action.type === fetchAcademicYearData.rejected.type ||
          action.type === fetchDountCount.pending.type ||
          action.type === fetchDountCount.fulfilled.type ||
          action.type === fetchDountCount.rejected.type ||
          action.type === fetchCompanyDataList.pending.type ||
          action.type === fetchCompanyDataList.fulfilled.type ||
          action.type === fetchCompanyDataList.rejected.type ||
          action.type === fetchOverAllCompanyDataList.pending.type ||
          action.type === fetchOverAllCompanyDataList.fulfilled.type ||
          action.type === fetchOverAllCompanyDataList.rejected.type ||
          action.type === updateStatusOfCompany.pending.type ||
          action.type === updateStatusOfCompany.fulfilled.type ||
          action.type === updateStatusOfCompany.rejected.type ||
          action.type === downloadStudentTemplate.pending.type ||
          action.type === downloadStudentTemplate.fulfilled.type ||
          action.type === downloadStudentTemplate.rejected.type ||
          action.type === fetchOverAllCompanyForStudent.pending.type ||
          action.type === fetchOverAllCompanyForStudent.fulfilled.type ||
          action.type === fetchOverAllCompanyForStudent.rejected.type ||
          action.type === updateStudentFrom.pending.type ||
          action.type === updateStudentFrom.fulfilled.type ||
          action.type === updateStudentFrom.rejected.type ||
          action.type === fetchSingleStudentData.pending.type ||
          action.type === fetchSingleStudentData.fulfilled.type ||
          action.type === fetchSingleStudentData.rejected.type ||
          action.type === studentAppliedCompany.pending.type ||
          action.type === studentAppliedCompany.fulfilled.type ||
          action.type === studentAppliedCompany.rejected.type ||
          action.type === studentOnGoingProcess.pending.type ||
          action.type === studentOnGoingProcess.fulfilled.type ||
          action.type === studentOnGoingProcess.rejected.type ||
          action.type === adminDataUpdate.pending.type ||
          action.type === adminDataUpdate.fulfilled.type ||
          action.type === adminDataUpdate.rejected.type ||
          action.type === getNotification.pending.type ||
          action.type === getNotification.fulfilled.type ||
          action.type === getNotification.rejected.type ||
          action.type === getNotificationById.pending.type ||
          action.type === getNotificationById.fulfilled.type ||
          action.type === getNotificationById.rejected.type ||
          action.type === companyIdApplications.pending.type ||
          action.type === companyIdApplications.fulfilled.type ||
          action.type === companyIdApplications.rejected.type ||
          action.type === getNotficationTemplate.pending.type ||
          action.type === getNotficationTemplate.fulfilled.type ||
          action.type === getNotficationTemplate.rejected.type ||
          action.type === createnotification.pending.type ||
          action.type === createnotification.fulfilled.type ||
          action.type === createnotification.rejected.type ||
          action.type === companyRegistration.pending.type ||
          action.type === companyRegistration.fulfilled.type ||
          action.type === companyRegistration.rejected.type ||
          action.type === getCompanyDetails.pending.type ||
          action.type === getCompanyDetails.fulfilled.type ||
          action.type === getCompanyDetails.rejected.type ||
          action.type === updateCompanyDetails.pending.type ||
          action.type === updateCompanyDetails.fulfilled.type ||
          action.type === updateCompanyDetails.rejected.type,
        handleLoading
      )
  },
});

export const { clearDountChart, clearNotificationById } = dataSlice.actions;
export default dataSlice.reducer;