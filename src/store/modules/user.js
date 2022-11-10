import { API } from '@/utils/api'

const framePrefix = 'frame'
// const framePrefix = ''

const getDefaultState = () => {
  return {
    name: '',
    avatar: '',
    userInfo: {},
    signFrameToken: '',
    clients: [],
    haveDefault: 0
  }
}

const state = getDefaultState()

const mutations = {
  setFrameToken: (state, data) => {
    state.signFrameToken = data
  },
  setUserInfo: (state, data) => {
    state.userInfo = data
  },
  setClients: (state, data) => {
    state.clients = data
  },
  setHaveDefault: (state, data) => {
    state.haveDefault = data
  }
}

const actions = {
  getLoginPage({ commit }, url) {
    return API.post(`${framePrefix}/frame/getLoginPage?url=${url}`)
  },

  getUserInfo({ commit }, { code, type }) {
    return API.get(`${framePrefix}/frame/getUserInfo/${type}/${code}`)
  },

  async getFrameMenu({ commit }, { type, userId }) {
    const res = await API.get(`${framePrefix}/frame/menu/${type}/${userId}`)
    return res
  },

  async getFrameUrl({ commit }) {
    const res = await API.get(`${framePrefix}/frame/getAllUrl`)
    return res
  },

  async getClients({ commit }) {
    const res = await API.post(`preRecord/login/getClients`)
    return res
  },

  async changeClient({ commit }, data) {
    const res = await API.post(`frame/login/changeClient`, data)
    return res
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

