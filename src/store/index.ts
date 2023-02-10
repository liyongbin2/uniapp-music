import {createStore} from 'vuex'
import globalData from './module/globalData'
export default createStore({
	modules: {
		globalData
	}
})