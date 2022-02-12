import { createSlice } from '@reduxjs/toolkit'

export const plannerSlice = createSlice({
    name: "glanner",
    initialState: {
        plannerList: [{
            id: "내 플래너",
            children: [
              { 
                glannerId: 1,
                glannerName: "개인 플래너",
                active: true,
              },
              {
                glannerId: 2,
                glannerName: "개인 플래너2",
                active: false,
              },
              {
                glannerId: 3,
                glannerName: "개인 플래너3",
                active: false,
              },
              {
                glannerId: 4,
                glannerName: "개인 플래너4",
                active: false,
              },
            ],
          },
          {
            id: "그룹 플래너",
            children: [
              
            ],
          },]

    },
    reducers: {
        getGlanners: (state, action) => {
          state.plannerList[1].children = action.payload;
        },
        addGlanner: (state, action) => {
          state.plannerList[1].children.push(action.payload)
        },
        removeGlanner: (state, action) => {
          state.plannerList[1].children = state.plannerList[1].children.filter(item => {
            return item.glannerId !== action.payload
          })           
        }
    }

})

export const { getGlanners, addGlanner, removeGlanner } = plannerSlice.actions;
export default plannerSlice.reducer;