import moment from "moment";
import "moment/locale/ko";

export const getTime = (value) => {
      const diffTime = moment().diff(value, 'minutes')
      if (diffTime < 1) {
        return `방금 전`
      } else if (diffTime < 60) {
        return `${diffTime}분 전`
      } else {
        return moment(value).format('YYYY.MM.DD HH:mm')
      }
    }

export const getListTime = (value) => {  
  const diffTime = moment().diff(value, 'minutes')
  if (diffTime < 1) {
    return `방금 전`
  } else if (diffTime < 60) {
    return `${diffTime}분 전`
  } else if (diffTime < 60 * 24) {
    return moment(value).format('HH:mm')
  } else {
    return moment(value).format('YYYY.MM.DD')
  }  
}