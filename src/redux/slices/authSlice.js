import {createSlice, createAsyncThunk} from  "@reduxjs/toolkit";

export const logout = createAsyncThunk(
    "auth/logout", 
    async (_, {rejectWithValue}) => {
        try {
            const response = await fetch("https://web.ics.purdue.edu/~apbridge/profile-app/logout.php");
            const data = await response.json();
            if(data.message) {
                return true;                
            } else {
                return rejectWithValue(data.error);
            }
        } catch(error) {
            return rejectWithValue(error.messaage);
        }
    }
)

const authSlice = createSlice({
    name: "auth",
    initialState: {
        isLogin: localStorage.getItem("isLogin") === "true" ? true : false,
        error: "",
        status: "idle",
    }, 
    reducers: {
        login: (state) => {
            isLogin = true;
            localStorage.setItem("isLogin", "true");
        }
    },
    extraReducers: (builder)=> {
        builder.addCase(logout.pending, (state)=>{
            state.status = "loading";
        })
        .addCase(logout.fulfilled, (state)=>{
            state.isLogin = false;
            localStorage.removeItem("isLogin");
        })
        .addCase(logout.rejected, (state, action)=> {
            state.status = "failed";
            state.error = action.payload;
        })
    }
});

export const {login} = authSlice.actions;
export default authSlice.reducer;