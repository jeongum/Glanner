import { createSlice, current } from '@reduxjs/toolkit'

export const plannerSlice = createSlice({
    name: "glanner",
    initialState: {
        plannerList: [
          {
            name: "내 플래너",
            children: [
              { 
                plannerId: 1,
                plannerName: "내 플래너",
                active: true,
              },              
            ],
          },
          {
            name: "그룹 플래너",
            children: [
              
            ],
          },
        ]

    },
    reducers: {
        getGlanners: (state, action) => {
          const glannerList = action.payload.map(item => {
            return {active: false, ...item}
          });
          state.plannerList[1].children = glannerList;
          // state.plannerList[1].children = action.payload;
        },
        addGlanner: (state, action) => {
          state.plannerList[1].children.push(action.payload)
        },
        removeGlanner: (state, action) => {
          state.plannerList[1].children = state.plannerList[1].children.filter(item => {
            return item.glannerId !== action.payload
          })           
        },
        onClickPlanner: (state, action) => {
          state.plannerList.map(planner => {
            planner.children.map(targetPlanner => {
              if (action.payload == targetPlanner.glannerId || action.payload == targetPlanner.plannerId) {
                targetPlanner.active = true;
              } else {
                targetPlanner.active = false;
              }
            console.log(current(state.plannerList))
            });
          });
        }
    }

})

export const { getGlanners, addGlanner, removeGlanner, onClickPlanner } = plannerSlice.actions;
export default plannerSlice.reducer;