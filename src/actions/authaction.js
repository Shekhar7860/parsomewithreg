
import {LOGIN_DATA} from '../reducers/types'
 export const logindata = (data)=> {
 	alert(data)
  return {
    type: LOGIN_DATA,
    payload : data
  }
}
