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
   
    //currentProfile?: IUser;
}

// initial state
const initialUserState: UserSliceState = {
    loading: false,
    error: false,
    isRegistered: false,
    isLoggedIn: false
    // user is nothing becuase we do not have user yet
};

// ================= async thunks ========================
type Login = {
    email: string;
    password: string;
};

//let res: any;

// being called from Login Button inside LoginForm
export const loginUser = createAsyncThunk(
    'user/login',
    async (credentials: Login, thunkAPI) => {
        try {
            //axios.defaults.withCredentials = true;
            const res = await axios.post('http://localhost:8000/user/login', credentials);
  
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
            state.user = action.payload;
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
    }
})


export const { toggleError } = UserSlice.actions;

export default UserSlice.reducer;