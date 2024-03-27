import { getEmployees, getEmployee, voteForEmployee } from "@/app/api/graphql";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  status: "idle",
  error: "false",
  data: [],
  employeeDetail: {
    status: "idle",
    error: "false",
    data: {},
  },
};

export const GetEmployees = createAsyncThunk(
  "GetEmployees/GET",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getEmployees();
      return response;
    } catch (error) {
      console.log(error);
      return rejectWithValue({
        status: error.response.status,
        message: error.message,
      });
    }
  }
);

export const GetEmployee = createAsyncThunk(
  "GetEmployee/GET",
  async (id, { rejectWithValue }) => {
    try {
      const response = await getEmployee(id);
      return response;
    } catch (error) {
      console.log(error);
      return rejectWithValue({
        status: error.response.status,
        message: error.message,
      });
    }
  }
);

export const VoteEmployee = createAsyncThunk(
  "VoteEmployee/POST",
  async (id, { rejectWithValue }) => {
    try {
      const response = await voteForEmployee(id);
      return response;
    } catch (error) {
      console.log(error);
      return rejectWithValue({
        status: error.response.status,
        message: error.message,
      });
    }
  }
);

export const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    voteEmployee: (state, action) => {
      state.data.vote = state.data.vote + 1;
    },
  },
  extraReducers(builder) {
    builder
      //  GetEmployees
      .addCase(GetEmployees.pending, (state) => {
        state.status = "loading";
      })
      .addCase(GetEmployees.rejected, (state, action) => {
        state.status = "failed";
        state.error = {
          type: "error",
          title: "HATA",
          message: action.payload?.message,
          status: action.payload?.status,
        };
      })
      .addCase(GetEmployees.fulfilled, (state, action) => {
        state.status = "done";
        state.data = action.payload;
      })

      //  GetEmployee
      .addCase(GetEmployee.pending, (state) => {
        state.employeeDetail.status = "loading";
      })
      .addCase(GetEmployee.rejected, (state, action) => {
        state.employeeDetail.status = "failed";
        state.employeeDetail.error = {
          type: "error",
          title: "HATA",
          message: action.payload?.message,
          status: action.payload?.status,
        };
      })
      .addCase(GetEmployee.fulfilled, (state, action) => {
        state.employeeDetail.status = "done";
        state.employeeDetail.data = action.payload;
      })

      //  VoteEmployee
      .addCase(VoteEmployee.fulfilled, (state, action) => {
        state.data = state.data.map((item) => {
            if (item.id === action.payload.id) {
                return {...item, ...action.payload}
            }

            return item
        });
      });
  },
});

export const { voteEmployee } = employeeSlice.actions;
export default employeeSlice.reducer;
