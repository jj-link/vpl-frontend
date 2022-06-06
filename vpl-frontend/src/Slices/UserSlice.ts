import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { IUser } from '../Interfaces/IUser';
import axios from 'axios';



interface UserSliceState {
    loading: boolean;
    error: boolean;
    user?: IUser;
    users?: IUser[];
    isRegistered?: boolean,
    isLoggedIn?: boolean,
   
    currentProfile?: IUser;
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

let userData:any;

// being called from Login Button inside LoginForm
export const loginUser = createAsyncThunk(
    'user/login',
    async (credentials: Login, thunkAPI) => {
        try {
            //axios.defaults.withCredentials = true;
            const res = await axios.post('http://3.96.174.192:8000/user/login', credentials);
            userData = res.data;
            console.log(userData);
            return {
                userId: res.data.userId,
                email: res.data.email,
                password: res.data.password,
                firstName: res.data.firstName,
                lastName: res.data.lastName,
                userRole: res.data.userRole
            }
        }
        catch (e) {
            return thunkAPI.rejectWithValue('something went wrong');
        }
    }
);

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
            console.log(credentials);
            const res = await axios.post('http://3.96.174.192:8000/user/register', credentials);
            console.log(res.data);
            return res.data;
        }
        catch (e) {
            console.log(e);
            return thunkAPI.rejectWithValue('something went wrong');
        }
    }
)

export const getAllUsers = createAsyncThunk(
    'user/getAllUsers',
    async (thunkAPI) => {
  
      try {
        //axios.defaults.withCredentials = true;
        const res = await axios.get('http://3.96.174.192:8000/user/all-users');
        console.log(res.data);
  
        return res.data;

      } catch (e) {
        console.log(e);
      }
    }
  );


export const logout = createAsyncThunk(
    "user/logout",
    async (thunkAPI) => {
        try{
            //axios.defaults.withCredentials = true;
            //const res = axios.get("http://3.96.174.192:8000/user/logout");
        } catch(e){
            console.log(e);
        }
    }
)

type EditUser = {
    userId?: number,
    firstName?: string,
    lastName?: string,
    email?: string,
    password?: string
}

export const editProfile = createAsyncThunk(
    "user/edit",
    async (credentials: EditUser, thunkAPI) => {
        try {
            //axios.defaults.withCredentials = true;
            const res = await axios.post('http://3.96.174.192:8000/user/edit', credentials);

            return{
                userId: res.data.userId,
                email: res.data.email,
                password: res.data.password,
                firstName: res.data.firstName,
                lastName: res.data.lastName
            };

         } catch (e) {
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
            //state.isRegistered = true;//!state.isRegistered;
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
            state.user = action.payload;
            state.isLoggedIn = true;
            state.loading = false;
            state.error = false;
        });
        builder.addCase(editProfile.rejected, (state) => {
            state.loading = false;
            state.error = true;
        })

        // get all users
        builder.addCase(getAllUsers.pending, (state, action) => {
            state.loading = true;
          });
          builder.addCase(getAllUsers.fulfilled, (state, action) => {
            // payload is the return from our asyn api call
            state.users = action.payload;
            state.error = false;
            state.loading = false;
          });
          builder.addCase(getAllUsers.rejected, (state, action) => {
            state.error = true;
            state.loading = false;
          });
    }
})


export const { toggleError } = UserSlice.actions;

export default UserSlice.reducer;