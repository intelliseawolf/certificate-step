/*=========================================================================================
  File Name: actions.js
  Description: Vuex Store - actions
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

import axios from '../axios'

const actions = {

  // /////////////////////////////////////////////
  // COMPONENTS
  // /////////////////////////////////////////////

  // Vertical NavMenu
  updateVerticalNavMenuWidth({ commit }, width) {
    commit('UPDATE_VERTICAL_NAV_MENU_WIDTH', width)
  },

  // VxAutoSuggest
  updateStarredPage({ commit }, payload) {
    commit('UPDATE_STARRED_PAGE', payload)
  },

  // The Navbar
  arrangeStarredPagesLimited({ commit }, list) {
    commit('ARRANGE_STARRED_PAGES_LIMITED', list)
  },
  arrangeStarredPagesMore({ commit }, list) {
    commit('ARRANGE_STARRED_PAGES_MORE', list)
  },

  // /////////////////////////////////////////////
  // UI
  // /////////////////////////////////////////////

  toggleContentOverlay({ commit }) {
    commit('TOGGLE_CONTENT_OVERLAY')
  },
  updateTheme({ commit }, val) {
    commit('UPDATE_THEME', val)
  },

  // /////////////////////////////////////////////
  // User/Account
  // /////////////////////////////////////////////

  updateUserInfo({ commit }, payload) {
    commit('UPDATE_USER_INFO', payload)
  },

  // Get templates from backend

  getTemplates({ commit }, { page }) {
    axios.post(`/certificate/template/list/184?page=${page}`, {
      type: "string"
    })
      .then(({ data }) => {
        commit('GET_CETIFICATE_TEMPLATE_LIST', data)
      })
  },

  getDynamicTexts({ commit }, payload) {
    axios.post('/certificate/dynamic_field_list', {
      type: "string"
    })
      .then(({ data }) => {
        commit('GET_CETIFICATE_DYNAMIC_TEXTS', data)
        console.log(data)
      })
  },

  getStudents({ commit }) {
    axios.post('/classes/schedules/students/184', {
      type: "string"
    })
      .then(({ data }) => {
        commit('GET_STUDENTS_LIST', data)
      })
  },

  getTeachers({ commit }) {
    axios.post('/classes/schedules/teachers/184', {
      type: "string"
    })
      .then(({ data }) => {
        commit('GET_TEACHERS_LIST', data)
      })
  },

  getClasses({ commit }, { page, limit }) {
    return axios.post(`/classes/list/184?page=${page}&limit=${limit}`, { is_archived: 1 })
      .then(({ data }) => {
        commit('GET_CLASS_LIST', data)
        return Promise.resolve(data)
      })
  },

  getClassDetail({ commit }, classId) {
    axios.get(`/classes/show/${classId}/184`)
      .then(({ data }) => {
        commit('GET_CLASS_DETAIL', data)
      })
  },

  getCourseList({ commit }, { page, limit }) {
    return axios.post(`/V1/course/list/184?page=${page}`, { limit })
      .then(({ data }) => {
        commit('GET_COURSE_LIST', data)
        return Promise.resolve(data)
      })
  },
}

export default actions
