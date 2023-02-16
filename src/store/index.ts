import {createStore} from 'vuex'
import globalData from './module/globalData'
import musicPlayData from './module/musicPlayData'
export default createStore({
	modules: {
		globalData,
    musicPlayData
	}
})