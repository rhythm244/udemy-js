/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "assets/scripts/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/App/Component.js":
/*!******************************!*\
  !*** ./src/App/Component.js ***!
  \******************************/
/*! exports provided: Component */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Component\", function() { return Component; });\n\nclass Component {\n  constructor(hostElementId, insertBefore = false) {\n    if (hostElementId) {\n      this.hostElement = document.getElementById(hostElementId);\n    } else {\n      this.hostElement = document.body;\n    }\n    this.insertBefore = insertBefore;\n  }\n\n  detach() {\n    if (this.element) {\n      this.element.remove();\n      // this.element.parentElement.removeChild(this.element);\n    }\n  }\n\n  attach() {\n    this.hostElement.insertAdjacentElement(\n      this.insertBefore ? 'afterbegin' : 'beforeend',\n      this.element\n    );\n  }\n}\n\n//# sourceURL=webpack:///./src/App/Component.js?");

/***/ }),

/***/ "./src/App/ProjectItem.js":
/*!********************************!*\
  !*** ./src/App/ProjectItem.js ***!
  \********************************/
/*! exports provided: ProjectItem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ProjectItem\", function() { return ProjectItem; });\n/* harmony import */ var _Utility_DOMHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Utility/DOMHelper */ \"./src/Utility/DOMHelper.js\");\n/* harmony import */ var _Tooltip__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Tooltip */ \"./src/App/Tooltip.js\");\n\n\n\nclass ProjectItem {\n  // hasActiveTooltip = false;\n\n  constructor(id, updateProjectListsFunction, type) {\n    this.hasActiveTooltip = false;\n    this.id = id;\n    this.updateProjectListsHandler = updateProjectListsFunction;\n    this.connectMoreInfoButton();\n    this.connectSwitchButton(type);\n    this.connectDrag();\n  }\n\n  showMoreInfoHandler() {\n    if (this.hasActiveTooltip) {\n      return;\n    }\n    const projectElement = document.getElementById(this.id);\n    const tooltipText = projectElement.dataset.extraInfo;\n    const tooltip = new _Tooltip__WEBPACK_IMPORTED_MODULE_1__[\"Tooltip\"](\n      () => {\n        this.hasActiveTooltip = false;\n      },\n      tooltipText,\n      this.id\n    );\n    tooltip.attach();\n    this.hasActiveTooltip = true;\n  }\n\n  connectDrag() {\n    const item = document.getElementById(this.id);\n    item.addEventListener('dragstart', event => {\n      event.dataTransfer.setData('text/plain', this.id);\n      event.dataTransfer.effectAllowed = 'move';\n    });\n\n    item.addEventListener('dragend', event => {\n      console.log(event);\n    });\n  }\n\n  connectMoreInfoButton() {\n    const projectItemElement = document.getElementById(this.id);\n    const moreInfoBtn = projectItemElement.querySelector(\n      'button:first-of-type'\n    );\n    moreInfoBtn.addEventListener('click', this.showMoreInfoHandler.bind(this));\n  }\n\n  connectSwitchButton(type) {\n    const projectItemElement = document.getElementById(this.id);\n    let switchBtn = projectItemElement.querySelector('button:last-of-type');\n    switchBtn = _Utility_DOMHelper__WEBPACK_IMPORTED_MODULE_0__[\"DOMHelper\"].clearEventListeners(switchBtn);\n    switchBtn.textContent = type === 'active' ? 'Finish' : 'Activate';\n    switchBtn.addEventListener(\n      'click',\n      this.updateProjectListsHandler.bind(null, this.id)\n    );\n  }\n\n  update(updateProjectListsFn, type) {\n    this.updateProjectListsHandler = updateProjectListsFn;\n    this.connectSwitchButton(type);\n  }\n}\n\n//# sourceURL=webpack:///./src/App/ProjectItem.js?");

/***/ }),

/***/ "./src/App/ProjectList.js":
/*!********************************!*\
  !*** ./src/App/ProjectList.js ***!
  \********************************/
/*! exports provided: ProjectList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ProjectList\", function() { return ProjectList; });\n/* harmony import */ var _ProjectItem__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ProjectItem */ \"./src/App/ProjectItem.js\");\n/* harmony import */ var _Utility_DOMHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Utility/DOMHelper */ \"./src/Utility/DOMHelper.js\");\n\n\n\nclass ProjectList {\n  \n  \n  constructor(type) {\n    this.projects = [];\n    this.type = type;\n    const prjItems = document.querySelectorAll(`#${type}-projects li`);\n    for (const prjItem of prjItems) {\n      this.projects.push(\n        new _ProjectItem__WEBPACK_IMPORTED_MODULE_0__[\"ProjectItem\"](prjItem.id, this.switchProject.bind(this), this.type)\n      );\n    }\n    console.log(this.projects);\n    this.connectDroppable();\n  }\n\n  connectDroppable() {\n    const list = document.querySelector(`#${this.type}-projects ul`);\n\n    list.addEventListener('dragenter', event => {\n      if (event.dataTransfer.types[0] === 'text/plain') {\n        list.parentElement.classList.add('droppable');\n        event.preventDefault();\n      }\n    });\n\n    list.addEventListener('dragover', event => {\n      if (event.dataTransfer.types[0] === 'text/plain') {\n        event.preventDefault();\n      }\n    });\n\n    list.addEventListener('dragleave', event => {\n      if (event.relatedTarget.closest(`#${this.type}-projects ul`) !== list) {\n        list.parentElement.classList.remove('droppable');\n      }\n    });\n\n    list.addEventListener('drop', event => {\n      const prjId = event.dataTransfer.getData('text/plain');\n      if (this.projects.find(p => p.id === prjId)) {\n        return;\n      }\n      document\n        .getElementById(prjId)\n        .querySelector('button:last-of-type')\n        .click();\n      list.parentElement.classList.remove('droppable');\n      // event.preventDefault(); // not required\n    });\n  }\n\n  setSwitchHandlerFunction(switchHandlerFunction) {\n    this.switchHandler = switchHandlerFunction;\n  }\n\n  addProject(project) {\n    this.projects.push(project);\n    _Utility_DOMHelper__WEBPACK_IMPORTED_MODULE_1__[\"DOMHelper\"].moveElement(project.id, `#${this.type}-projects ul`);\n    project.update(this.switchProject.bind(this), this.type);\n  }\n\n  switchProject(projectId) {\n    // const projectIndex = this.projects.findIndex(p => p.id === projectId);\n    // this.projects.splice(projectIndex, 1);\n    this.switchHandler(this.projects.find(p => p.id === projectId));\n    this.projects = this.projects.filter(p => p.id !== projectId);\n  }\n}\n\n\n//# sourceURL=webpack:///./src/App/ProjectList.js?");

/***/ }),

/***/ "./src/App/Tooltip.js":
/*!****************************!*\
  !*** ./src/App/Tooltip.js ***!
  \****************************/
/*! exports provided: Tooltip */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Tooltip\", function() { return Tooltip; });\n/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Component */ \"./src/App/Component.js\");\n\n\nclass Tooltip extends _Component__WEBPACK_IMPORTED_MODULE_0__[\"Component\"] {\n  constructor(closeNotifierFunction, text, hostElementId) {\n    super(hostElementId);\n    this.closeNotifier = closeNotifierFunction;\n    this.text = text;\n    this.create();\n    this.closeTooltip = () => {\n      this.detach();\n      this.closeNotifier();\n    };\n  }\n\n\n  create() {\n    const tooltipElement = document.createElement('div');\n    tooltipElement.className = 'card';\n    const tooltipTemplate = document.getElementById('tooltip');\n    const tooltipBody = document.importNode(tooltipTemplate.content, true);\n    tooltipBody.querySelector('p').textContent = this.text;\n    tooltipElement.append(tooltipBody);\n\n    const hostElPosLeft = this.hostElement.offsetLeft;\n    const hostElPosTop = this.hostElement.offsetTop;\n    const hostElHeight = this.hostElement.clientHeight;\n    const parentElementScrolling = this.hostElement.parentElement.scrollTop;\n\n    const x = hostElPosLeft + 20;\n    const y = hostElPosTop + hostElHeight - parentElementScrolling - 10;\n\n    tooltipElement.style.position = 'absolute';\n    tooltipElement.style.left = x + 'px'; // 500px\n    tooltipElement.style.top = y + 'px';\n\n    tooltipElement.addEventListener('click', this.closeTooltip);\n    this.element = tooltipElement;\n  }\n}\n\n//# sourceURL=webpack:///./src/App/Tooltip.js?");

/***/ }),

/***/ "./src/Utility/DOMHelper.js":
/*!**********************************!*\
  !*** ./src/Utility/DOMHelper.js ***!
  \**********************************/
/*! exports provided: DOMHelper */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"DOMHelper\", function() { return DOMHelper; });\nclass DOMHelper {\n  static clearEventListeners(element) {\n    const clonedElement = element.cloneNode(true);\n    element.replaceWith(clonedElement);\n    return clonedElement;\n  }\n\n  static moveElement(elementId, newDestinationSelector) {\n    const element = document.getElementById(elementId);\n    const destinationElement = document.querySelector(newDestinationSelector);\n    destinationElement.append(element);\n    element.scrollIntoView({ behavior: 'smooth' });\n  }\n}\n\n\n//# sourceURL=webpack:///./src/Utility/DOMHelper.js?");

/***/ }),

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _App_ProjectList__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./App/ProjectList */ \"./src/App/ProjectList.js\");\n\n\nclass App {\n  static init() {\n    const activeProjectsList = new _App_ProjectList__WEBPACK_IMPORTED_MODULE_0__[\"ProjectList\"]('active');\n    const finishedProjectsList = new _App_ProjectList__WEBPACK_IMPORTED_MODULE_0__[\"ProjectList\"]('finished');\n    activeProjectsList.setSwitchHandlerFunction(\n      finishedProjectsList.addProject.bind(finishedProjectsList)\n    );\n    finishedProjectsList.setSwitchHandlerFunction(\n      activeProjectsList.addProject.bind(activeProjectsList)\n    );\n\n    // const timerId = setTimeout(this.startAnalytics, 3000);\n\n    // document.getElementById('stop-analytics-btn').addEventListener('click', () => {\n    //   clearTimeout(timerId);\n    // });\n  }\n\n  static startAnalytics() {\n    const analyticsScript = document.createElement('script');\n    analyticsScript.src = 'assets/scripts/Utility/Analytics.js';\n    analyticsScript.defer = true;\n    document.head.append(analyticsScript);\n  }\n}\n\nApp.init();\n\n\n//# sourceURL=webpack:///./src/app.js?");

/***/ })

/******/ });