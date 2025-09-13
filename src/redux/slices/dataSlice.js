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
  isLoading: false,
  error: null,
};

export const loginRequest = createAsyncThunk("color/loginRequest", async (requestedData) => {
  try {
    const data = {
      method: METHOD_TYPE.post,
      url: API_ENDPOINTS.login,
      data: requestedData
    };
    const response = await apis(data);
    return response?.data;
  } catch (error) {
    throw error.response.data.message;
  }
}
);

export const fetchDepartmentList = createAsyncThunk("color/fetchDepartmentList", async () => {
  try {
    const data = {
      method: METHOD_TYPE.get,
      url: API_ENDPOINTS.department,
    };
    const response = await apis(data);
    return response?.data;
  } catch (error) {
    throw error.response.data.message;
  }
}
);

export const fetchIndividualDepartment = createAsyncThunk("color/fetchIndividualDepartment", async (id) => {
  try {
    const data = {
      method: METHOD_TYPE.get,
      url: API_ENDPOINTS.department + `?id=${id}`,
    };
    const response = await apis(data);
    return response?.data;
  } catch (error) {
    throw error.response.data.message;
  }
}
);

export const fetchDountCount = createAsyncThunk("color/fetchDountCount", async (id) => {
  try {
    const data = {
      method: METHOD_TYPE.get,
      url: API_ENDPOINTS.donutCount + id,
    };
    const response = await apis(data);
    return response?.data;
  } catch (error) {
    throw error.response.data.message;
  }
}
);

export const fetchAcademicYearData = createAsyncThunk("color/fetchAcademicYearData", async (queryParams) => {
  try {
    const data = {
      method: METHOD_TYPE.get,
      url: API_ENDPOINTS.academicyeardata + queryParams,
    };
    const response = await apis(data);
    return response?.data;
  } catch (error) {
    throw error.response.data.message;
  }
}
);

export const fetchCompanyDataList = createAsyncThunk("color/fetchCompanyDataList", async () => {
  try {
    const data = {
      method: METHOD_TYPE.get,
      url: API_ENDPOINTS.companylist,
    };
    const response = await apis(data);
    return response?.data;
  } catch (error) {
    throw error.response.data.message;
  }
}
);

export const fetchOverAllCompanyDataList = createAsyncThunk("color/fetchOverAllCompanyDataList", async (queryParams) => {
  try {
    const data = {
      method: METHOD_TYPE.get,
      url: API_ENDPOINTS.overallcompanydata + queryParams,
    };
    const response = await apis(data);
    return response?.data;
  } catch (error) {
    throw error.response.data.message;
  }
}
);

export const updateStatusOfCompany = createAsyncThunk("color/updateStatusOfCompany", async (queryParams) => {
  try {
    const data = {
      method: METHOD_TYPE.put,
      url: API_ENDPOINTS.overallcompanydata + queryParams,
    };
    const response = await apis(data);
    return response?.data;
  } catch (error) {
    throw error.response.data.message;
  }
}
);

const dataSlice = createSlice({
  name: "dataSlice",
  initialState,
  reducers: {
    clearDountChart: (state) => {
      state.dountChart = {};
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
          action.type === updateStatusOfCompany.rejected.type,
        handleLoading
      )
  },
});

export const { clearDountChart } = dataSlice.actions;
export default dataSlice.reducer;