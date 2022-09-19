/*=========================================================================================
  File Name: mutations.js
  Description: Vuex Store - mutations
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


const mutations = {


  // /////////////////////////////////////////////
  // COMPONENTS
  // /////////////////////////////////////////////

  // Vertical NavMenu

  TOGGLE_IS_VERTICAL_NAV_MENU_ACTIVE(state, value) {
    state.isVerticalNavMenuActive = value
  },
  TOGGLE_REDUCE_BUTTON(state, val) {
    state.reduceButton = val
  },
  UPDATE_MAIN_LAYOUT_TYPE(state, val) {
    state.mainLayoutType = val
  },
  UPDATE_VERTICAL_NAV_MENU_ITEMS_MIN(state, val) {
    state.verticalNavMenuItemsMin = val
  },
  UPDATE_VERTICAL_NAV_MENU_WIDTH(state, width) {
    state.verticalNavMenuWidth = width
  },


  // VxAutoSuggest

  UPDATE_STARRED_PAGE(state, payload) {

    // find item index in search list state
    const index = state.navbarSearchAndPinList["pages"].data.findIndex((item) => item.url == payload.url)

    // update the main list
    state.navbarSearchAndPinList["pages"].data[index].is_bookmarked = payload.val

    // if val is true add it to starred else remove
    if (payload.val) {
      state.starredPages.push(state.navbarSearchAndPinList["pages"].data[index])
    }
    else {
      // find item index from starred pages
      const index = state.starredPages.findIndex((item) => item.url == payload.url)

      // remove item using index
      state.starredPages.splice(index, 1)
    }
  },

  // Navbar-Vertical

  ARRANGE_STARRED_PAGES_LIMITED(state, list) {
    const starredPagesMore = state.starredPages.slice(10)
    state.starredPages = list.concat(starredPagesMore)
  },
  ARRANGE_STARRED_PAGES_MORE(state, list) {
    let downToUp = false
    let lastItemInStarredLimited = state.starredPages[10]
    const starredPagesLimited = state.starredPages.slice(0, 10)
    state.starredPages = starredPagesLimited.concat(list)

    state.starredPages.slice(0, 10).map((i) => {
      if (list.indexOf(i) > -1) downToUp = true
    })

    if (!downToUp) {
      state.starredPages.splice(10, 0, lastItemInStarredLimited)
    }
  },


  // ////////////////////////////////////////////
  // UI
  // ////////////////////////////////////////////

  TOGGLE_CONTENT_OVERLAY(state, val) { state.bodyOverlay = val },
  UPDATE_PRIMARY_COLOR(state, val) { state.themePrimaryColor = val },
  UPDATE_THEME(state, val) { state.theme = val },
  UPDATE_WINDOW_WIDTH(state, width) { state.windowWidth = width },
  UPDATE_WINDOW_SCROLL_Y(state, val) { state.scrollY = val },


  // /////////////////////////////////////////////
  // User/Account
  // /////////////////////////////////////////////

  // Updates user info in state and localstorage
  UPDATE_USER_INFO(state, payload) {

    // Get Data localStorage
    let userInfo = JSON.parse(localStorage.getItem("userInfo")) || state.AppActiveUser

    for (const property of Object.keys(payload)) {

      if (payload[property] != null) {
        // If some of user property is null - user default property defined in state.AppActiveUser
        state.AppActiveUser[property] = payload[property]

        // Update key in localStorage
        userInfo[property] = payload[property]
      }


    }
    // Store data in localStorage
    localStorage.setItem("userInfo", JSON.stringify(userInfo))
  },

  // Get templates from backend
  GET_CETIFICATE_TEMPLATE_LIST(state, payload) {
    state.template_list = payload.data.certificate_template_list;
    state.templateListMetaData = payload.data.meta;
  },

  GET_CETIFICATE_DYNAMIC_TEXTS(state, payload) {
    payload.data.certificate_dynamic_field.map((dynamicText) => {
      let field_name = dynamicText.field_name
      let field_code = dynamicText.field_code

      if (field_name == "Name of Staff Recipient") field_name = "Staff Name"
      if (field_name == "Name of Course Teacher") return
      if (field_name == "Class Teacher Name") return
      if (field_name == "Name of Course") field_name = 'Course Name'
      if (field_name == "Name of Client Recipient") {
        field_name = 'Student Name'
        field_code = '{student_name}'
      }

      state.dynamicTextList.push({
        ...dynamicText,
        field_code,
        field_name,
      })
    })
  },

  GET_STUDENTS_LIST(state, payload) {
    state.studentList = payload.data.studentlist
  },

  GET_TEACHERS_LIST(state, payload) {
    state.teacherList = payload.data.teacherlist
  },

  GET_CLASS_LIST(state, payload) {
    state.classList = payload.data.classes
    state.classListMetaData = payload.data.meta
  },

  GET_CLASS_DETAIL(state, payload) {
    state.classDetail = payload.data.classes;
  },

  GET_COURSE_LIST(state, payload) {
    state.courseList = payload.data.course;
  },
}

export default mutations

