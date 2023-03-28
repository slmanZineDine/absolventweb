import { createSlice } from "@reduxjs/toolkit";
import {
   addNewTopic,
   deleteTopic,
   editeTopic,
   getTopicById,
   getTopics,
   getTopicsByDoctorId,
   getAllTopicsByDoctor,
} from "./topicsActions";

const initialState = {
   loading: false, // Checking if loading finish
   error: null, // Store Error msg get it from backend
   success: false, // Checking if auth is done
   topicsList: [], // Store response
   doctorTopics: {}, // Contain only  Doctor's topics
   topicsByDoctor: [], // All tema sort by Doctor
   topic: {}, // Topic by Id
   tempData: [], // Temporary To Save Data And Get It After Any Search
};

const topicsSlice = createSlice({
   name: "topics",
   initialState,
   reducers: {
      searchGlobaly(state, { payload }) {
         // When Input Is Empty Reset Data
         if (!payload || payload === "All") {
            state.topicsByDoctor = JSON.parse(state.tempData);
            return;
         }
         // When User Enter Any Thing Reset Data To Re-search
         state.topicsByDoctor = JSON.parse(state.tempData);
         const regexp = new RegExp(`${payload}`, "i");

         state.topicsByDoctor = state.topicsByDoctor.filter((doctor) => {
            doctor.teme = doctor.teme.filter(
               (tema) =>
                  regexp.test(tema?.title) ||
                  regexp.test(tema?.detalii) ||
                  regexp.test(tema?.tema_type)
            );
            return doctor.teme.length > 0;
         });
      },
      searchByCoordinator(state, { payload }) {
         // When Input Is Empty Reset Data
         if (!payload) {
            state.topicsByDoctor = JSON.parse(state.tempData);
            return;
         }
         // When User Enter Any Thing Reset Data To Re-search
         state.topicsByDoctor = JSON.parse(state.tempData);
         const regexp = new RegExp(`${payload}`, "i");

         state.topicsByDoctor = state.topicsByDoctor.filter((doctor) =>
            regexp.test(doctor?.email)
         );
      },
      searchTeme(state, { payload }) {
         // When Input Is Empty Reset Data
         if (!payload || payload === "All") {
            state.doctorTopics = JSON.parse(state.tempData);
            return;
         }
         // When User Enter Any Thing Reset Data To Re-search
         state.doctorTopics = JSON.parse(state.tempData);
         const regexp = new RegExp(`${payload}`, "i");
         state.doctorTopics = {
            coordonator: {
               ...state.doctorTopics.coordonator,
            },
            teme: state.doctorTopics.teme.filter(
               (tema) =>
                  regexp.test(tema?.title) ||
                  regexp.test(tema?.detalii) ||
                  regexp.test(tema?.tema_type)
            ),
         };

         console.log(state.doctorTopics);
      },
   },
   extraReducers: {
      // Getting all topics
      [getTopics.pending]: (state) => {
         state.loading = true;
         state.success = false; // Reset a value every Request
         state.error = null; // Reset a value every Request
      },
      [getTopics.fulfilled]: (state, { payload }) => {
         state.loading = false;
         state.success = true;
         state.topicsList = payload.data;
      },
      [getTopics.rejected]: (state, { payload }) => {
         state.loading = false;
         state.error = payload;
      },

      // Getting All Teme By Doctor
      [getAllTopicsByDoctor.pending]: (state) => {
         state.loading = true;
         state.success = false;
         state.error = null;
      },
      [getAllTopicsByDoctor.fulfilled]: (state, { payload }) => {
         state.loading = false;
         state.success = true;
         state.topicsByDoctor = payload.data;
         state.topicsByDoctor = state.topicsByDoctor.filter((doctor) => {
            // Remove Taken Tema Form List Of Topic
            doctor.teme = doctor.teme.filter((tema) => tema.is_taken === 0);
            // Sorting Teme By Teme's updated time
            doctor.teme.sort((a, b) => {
               const firEleDate = new Date(a["updated_at"]);
               const secEleDate = new Date(b["updated_at"]);
               return +secEleDate - +firEleDate;
            });
            return doctor.teme.length > 0;
         });
         // Save Data In Temporary Variable To  Get It After Any Search
         state.tempData = JSON.stringify(state.topicsByDoctor);
      },
      [getAllTopicsByDoctor.rejected]: (state, { payload }) => {
         state.loading = false;
         state.error = payload;
      },

      // Getting the topic by Id
      [getTopicById.pending]: (state) => {
         state.loading = true;
         state.success = false;
         state.error = null;
      },
      [getTopicById.fulfilled]: (state, { payload }) => {
         state.loading = false;
         state.success = true;
         state.topic = payload.data;
      },
      [getTopicById.rejected]: (state, { payload }) => {
         state.loading = false;
         state.error = payload;
      },

      // Getting doctor's topics
      [getTopicsByDoctorId.pending]: (state) => {
         state.loading = true;
         state.success = false;
         state.error = null;
      },
      [getTopicsByDoctorId.fulfilled]: (state, { payload }) => {
         state.loading = false;
         state.success = true;
         state.doctorTopics = payload.data;
         // Sorting Teme By teme's updated time
         state.doctorTopics.teme.sort((a, b) => {
            const firEleDate = new Date(a["updated_at"]);
            const secEleDate = new Date(b["updated_at"]);
            return +secEleDate - +firEleDate;
         });
         // Save Data In Temporary Variable To  Get It After Any Search
         state.tempData = JSON.stringify(state.doctorTopics);
      },
      [getTopicsByDoctorId.rejected]: (state, { payload }) => {
         state.loading = false;
         state.error = payload;
      },

      // Adding a new topic
      [addNewTopic.pending]: (state) => {
         state.loading = true;
         state.success = false;
         state.error = null;
      },
      [addNewTopic.fulfilled]: (state) => {
         state.loading = false;
         state.success = true;
      },
      [addNewTopic.rejected]: (state, { payload }) => {
         state.loading = false;
         state.error = payload;
      },

      // Edation topic
      [editeTopic.pending]: (state) => {
         state.loading = true;
         state.success = false;
         state.error = null;
      },
      [editeTopic.fulfilled]: (state) => {
         state.loading = false;
         state.success = true;
      },
      [editeTopic.rejected]: (state, { payload }) => {
         state.loading = false;
         state.error = payload;
      },

      // Deletion the topic
      [deleteTopic.pending]: (state) => {
         state.loading = true;
         state.success = false;
         state.error = null;
      },
      [deleteTopic.fulfilled]: (state, { payload }) => {
         state.loading = false;
         state.success = true;
         // Remove The Tema From Topics
         state.doctorTopics.teme = state.doctorTopics.teme.filter(
            (tema) => tema.id !== payload
         );
      },
      [deleteTopic.rejected]: (state, { payload }) => {
         state.loading = false;
         state.error = payload;
      },
   },
});

export const { searchGlobaly, searchByCoordinator, searchTeme } =
   topicsSlice.actions;

export default topicsSlice.reducer;
