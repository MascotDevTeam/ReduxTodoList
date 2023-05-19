import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// Import the functions you need from the SDKs you need
import { initializeApp, get } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
  addDoc,
} from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { async } from "@firebase/util";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAXch5SlUdZcHMxMw26klgMHhx3GISDPdg",
  authDomain: "todolist-4b832.firebaseapp.com",
  projectId: "todolist-4b832",
  storageBucket: "todolist-4b832.appspot.com",
  messagingSenderId: "636408174022",
  appId: "1:636408174022:web:6a0201f695ae5ac357cec7",
  measurementId: "G-9ZS180RX44",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

//Create AsyncThunk functions
export const getAllTasks = createAsyncThunk("tasks/getAllTasks", async () => {
  let tasks = [];
  const querySnapshot = await getDocs(collection(db, "tasks"));
  querySnapshot.forEach((doc) => {
    tasks.push(doc.data());
  });
  return tasks;
});

export const addNewTask = createAsyncThunk("task/addNewTask", async (title) => {
  await addDoc(collection(db, "tasks"), title);
});

const initialState = {
  loading: false,
  tasks: [],
  newTasks: {},
  error: "",
};

// Create Slice
const tasksSlice = createSlice({
  name: "tasks",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllTasks.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllTasks.fulfilled, (state, action) => {
      state.loading = false;
      state.tasks = action.payload;
      state.error = "";
    });
    builder.addCase(getAllTasks.rejected, (state, action) => {
      state.loading = false;
      state.tasks = [];
      state.error = "Somethings Not Right";
    });
    builder.addCase(addNewTask.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
    });
  },
});

export default tasksSlice.reducer;
