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

    getTemplates({commit}, payload) {
      axios.post('/certificate/template/list/184', {
        type: "string"
      },
      {
        headers:{
          Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxNSIsImp0aSI6IjNiOGQxOWM3ODQwZTA4NWI1MGI1MWE4MmI1N2VkOWMzMjUwZjNiM2Q5MTVjMjkzOWNhMjcyYTQzODZlOTk5OTY2NThlYmQ5MDc3NTIyN2I4IiwiaWF0IjoxNjYxMzgzMzM0LCJuYmYiOjE2NjEzODMzMzQsImV4cCI6MTY5MjkxOTMzNCwic3ViIjoiMTQ1MCIsInNjb3BlcyI6W119.korUh7_N7LwuWU9WsNjJtKocLmJKUcQy5qwm809M7X_DLag7QH_LvDp7vtV295vJojqDIBVwQat1Mg7uUkJSLmQh8qryH2Ht88B6dqQuOjVtwiGgZMww-9USmmScCd4u3d1cNQ-8JMmjgXTy3o4Xduv0MxVBvT65AXjKeEjRaxk_MooTlq5qFAScEc4QC8YeV20mAr4AqsfnrZ-NGQ243zEy8qMyyaIwtwniuDRbs_84U1HP6CoVOMNJULwd2WGSftpYfMB8oMspPmvVlg-KE_NxNFJngdinyz2cP_-NBc3YPvbgabac1gywrlZo5yE0qE8CjA8u-6_8O15sCssdeaCzIgHFz4FPMJxZ_J8tph9rRga1fPCNKlBAZWEWlcIY28zQGQhM8qLTiiE3Dlbr1CuiTGWrPgQ1r2DlsplFGsLLJkRAOvknwsSi8L9a-DnETINSJnUNvKI0-JRoOOx0XB-rYt__3Ft5kbILSE7geebzx3VZaEBQKpyEvzyE4x9ZeBFg7EJ58IHgKxaSI37OB2CEhNwCalGS7g_i2rUaWFNpVVJqDrS9Np1EhjnExoRq2b_OsLVFterOSlymyjd5j3mrzNH6GX_zemUgHezjbHHpeTFHHRcIel-6hr2Ww_86v4aUY5saQyAw3binALGPhJkg_palVmlaDzrDFNJvtvU"
        }
      })
      .then(({data}) => {
        commit('GET_CETIFICATE_TEMPLATE_LIST', data)
      })
    },

    getDynamicTexts({commit}, payload) {
      axios.post('/certificate/dynamic_field_list', {
        type: "string"
      },
      {
        headers:{
          Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxNSIsImp0aSI6IjNiOGQxOWM3ODQwZTA4NWI1MGI1MWE4MmI1N2VkOWMzMjUwZjNiM2Q5MTVjMjkzOWNhMjcyYTQzODZlOTk5OTY2NThlYmQ5MDc3NTIyN2I4IiwiaWF0IjoxNjYxMzgzMzM0LCJuYmYiOjE2NjEzODMzMzQsImV4cCI6MTY5MjkxOTMzNCwic3ViIjoiMTQ1MCIsInNjb3BlcyI6W119.korUh7_N7LwuWU9WsNjJtKocLmJKUcQy5qwm809M7X_DLag7QH_LvDp7vtV295vJojqDIBVwQat1Mg7uUkJSLmQh8qryH2Ht88B6dqQuOjVtwiGgZMww-9USmmScCd4u3d1cNQ-8JMmjgXTy3o4Xduv0MxVBvT65AXjKeEjRaxk_MooTlq5qFAScEc4QC8YeV20mAr4AqsfnrZ-NGQ243zEy8qMyyaIwtwniuDRbs_84U1HP6CoVOMNJULwd2WGSftpYfMB8oMspPmvVlg-KE_NxNFJngdinyz2cP_-NBc3YPvbgabac1gywrlZo5yE0qE8CjA8u-6_8O15sCssdeaCzIgHFz4FPMJxZ_J8tph9rRga1fPCNKlBAZWEWlcIY28zQGQhM8qLTiiE3Dlbr1CuiTGWrPgQ1r2DlsplFGsLLJkRAOvknwsSi8L9a-DnETINSJnUNvKI0-JRoOOx0XB-rYt__3Ft5kbILSE7geebzx3VZaEBQKpyEvzyE4x9ZeBFg7EJ58IHgKxaSI37OB2CEhNwCalGS7g_i2rUaWFNpVVJqDrS9Np1EhjnExoRq2b_OsLVFterOSlymyjd5j3mrzNH6GX_zemUgHezjbHHpeTFHHRcIel-6hr2Ww_86v4aUY5saQyAw3binALGPhJkg_palVmlaDzrDFNJvtvU"
        }
      })
      .then(({data}) => {
        commit('GET_CETIFICATE_DYNAMIC_TEXTS', data)
      })
    }
}

export default actions
