import axios from "axios"
import { getGlanners, removeGlanner } from "./planners"

export const fetchGlanner = (dispatch) => {
    axios(`/api/glanner`)
        .then(res => {
            dispatch(getGlanners(res.data))
        })
        .catch(err => console.log(err))
    }

export const deleteGlanner = (id, dispatch) => {
    axios(`/api/glanner/${id}`, {method: 'DELETE'})
        .then(res => {
            dispatch(removeGlanner(id))
        })
        .catch(err => console.log(err))
    }
