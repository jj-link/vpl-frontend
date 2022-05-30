import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { IUser } from '../Interfaces/IUser';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



interface UserSliceState {
    loading: boolean;
    error: boolean;
    user?: IUser;
    users?: IUser[];
    isRegistered?: boolean
    isLoggedIn?: boolean
    isUpdated?: boolean
   
    currentProfile?: IUser;
}

// initial state
const initialUserState: UserSliceState = {
    loading: false,
    error: false,
    isRegistered: false,
    isLoggedIn: false,
    isUpdated: false
    // user is nothing becuase we do not have user yet
};

// ================= async thunks ========================
type Login = {
    email: string;
    password: string;
};

//let res: any;

let userData:any;

// being called from Login Button inside LoginForm
export const loginUser = createAsyncThunk(
    'user/login',
    async (credentials: Login, thunkAPI) => {
        try {
            //axios.defaults.withCredentials = true;
            const res = await axios.post('http://localhost:8000/user/login', credentials);
            userData = res.data;
            //console.log(userData);
            return {
                userId: res.data.user_id,
                email: res.data.email,
                password: res.data.password,
                firstName: res.data.first_name,
                lastName: res.data.last_name,
                roleId: res.data.role_id
            }
        }
        catch (e) {
            return thunkAPI.rejectWithValue('something went wrong');
        }
    }
)

type register = {
    email: string;
    password: string;
    firstName: string;
    lastName: string
}

export const registerUser = createAsyncThunk(
    'user/register',
    async (credentials: register, thunkAPI) => {
        
        try {
            //axios.defaults.withCredentials = true;
            await axios.post('http://localhost:8000/user/register', credentials)
            .then(res => {
                if(res){
                    console.log(res.data);
                    return res.data;
                }
            });
        }
        catch (e) {
            console.log(e);
            return thunkAPI.rejectWithValue('something went wrong');
        }
    }
)


export const logout = createAsyncThunk(
    "user/logout",
    async (thunkAPI) => {
        try{
            //axios.defaults.withCredentials = true;
            //const res = axios.get("http://localhost:8000/user/logout");
        } catch(e){
            console.log(e);
        }
    }
)

type EditUser = {
    userId: number,
    firstName: string,
    lastName: string,
    email: string,
    password: string
}
let updated_userInfo:any;
export const editProfile = createAsyncThunk(
    "user/edit",
    async (updatedUserInfo: EditUser, thunkAPI) => {
        try {
            //axios.defaults.withCredentials = true;

            await axios.post('http://localhost:8000/user/edit', updatedUserInfo)
            .then(res => {
                if(res){
                    console.log(res.data);
                    updated_userInfo = res.data;
                    return res.data;
                }
            });
        }
        catch (e) {
            console.log(e);
            return thunkAPI.rejectWithValue('https request to update user info failed');
        }
    }
)

// ================= reducer actions ========================
// create slice and will be exported as default
export const UserSlice = createSlice({
    name: 'user',
    initialState: initialUserState,
  
    // these are actions inside reducers
    reducers: {
      toggleError: (state) => {
        state.error = !state.error;
      },
    },

    extraReducers: (builder) => {
        // this is where we create our user logic
        builder.addCase(loginUser.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(loginUser.fulfilled, (state, action) => {
          // payload is the return from our asyn api call
            state.user = userData;
            state.error = false;
            state.loading = false;
            state.isLoggedIn = true;
        });
        builder.addCase(loginUser.rejected, (state, action) => {
            state.error = true;
            state.loading = false;
        });

        builder.addCase(registerUser.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(registerUser.fulfilled, (state, action) => {
          // payload is the return from our asyn api call
            state.user = action.payload;
            state.error = false;
            state.loading = false;
            state.isRegistered = true;//!state.isRegistered;
        });
        builder.addCase(registerUser.rejected, (state, action) => {
            state.error = true;
            state.loading = false;
            state.isRegistered = false;
        });
        builder.addCase(logout.fulfilled, (state, action)=> {
            state.user = undefined;
            state.isLoggedIn = false;
        });

        // editProfile

        builder.addCase(editProfile.pending, (state) => {
            state.loading = true;            
        });
        builder.addCase(editProfile.fulfilled, (state, action) => {
            state.user = updated_userInfo;
            state.isLoggedIn = true;
            state.loading = false;
            state.error = false;
            state.isUpdated = true;
        });
        builder.addCase(editProfile.rejected, (state) => {
            state.loading = false;
            state.error = true;
        })
    }
})


export const { toggleError } = UserSlice.actions;

export default UserSlice.reducer;