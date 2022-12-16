import Cookies from 'js-cookie'

const state = {
  sidebar: {
    opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
    withoutAnimation: false
  },
  device: 'desktop',
  globalLoading: false,
  showMainApp: false,
  showV2App: false,
  showV3App: false,
  subApps: new Set()
}

const mutations = {
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
    }
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    Cookies.set('sidebarStatus', 0)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  },
  SET_GLOBAL_LOADING: (state, val) => {
    state.globalLoading = val
  },
  displayCurHiddenOtherApps: (state, val) => {
    if (val === 'v2-sub-app') {
      state.showV2App = true
      state.showMainApp = false
      state.showV3App = false
    } else if (val === 'v3-sub-app') {
      state.showV2App = false
      state.showMainApp = false
      state.showV3App = true
    } else {
      state.showV2App = false
      state.showV3App = false
      state.showMainApp = true
    }
  },
  addSubApps: (state, val) => {
    state.subApps.add(val)
  },
  deleteSubApps: (state, val) => {
    state.subApps.delete(val)
  }
}

const actions = {
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  },
  setGlobalLoading({ commit }, val) {
    commit('SET_GLOBAL_LOADING', val)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
