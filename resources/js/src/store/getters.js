/*=========================================================================================
  File Name: getters.js
  Description: Vuex Store - getters
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

// added so later we can keep breakpoint in sync automatically using this config file
// import tailwindConfig from "../../tailwind.config.js"

const getters = {
    // COMPONENT
    // vx-autosuggest
    // starredPages: state => state.navbarSearchAndPinList.data.filter((page) => page.highlightAction),
    windowBreakPoint: (state) => {
        // This should be same as tailwind. So, it stays in sync with tailwind utility classes
        if (state.windowWidth >= 1200) return "xl";
        else if (state.windowWidth >= 992) return "lg";
        else if (state.windowWidth >= 768) return "md";
        else if (state.windowWidth >= 576) return "sm";
        else return "xs";
    },

    scrollbarTag: (state) => {
        return state.is_touch_device ? "div" : "VuePerfectScrollbar";
    },

    getTemplateList: (state) => {
        return state.template_list;
    },

    getTemplateListMetaData: (state) => {
        return state.templateListMetaData;
    },

    getDynamicTextList: (state) => {
        return state.dynamicTextList;
    },

    getStudentList: (state) => {
        return state.studentList;
    },

    getTeacherList: (state) => {
        return state.teacherList;
    },

    getClassList: (state) => {
        return state.classList;
    },

    getClassDetail: (state) => {
        return state.classDetail;
    },

    getCourseList: (state) => {
        return state.courseList;
    }
};

export default getters;
