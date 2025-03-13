"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/react-use-clipboard";
exports.ids = ["vendor-chunks/react-use-clipboard"];
exports.modules = {

/***/ "(ssr)/./node_modules/react-use-clipboard/dist/react-use-clipboard.module.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/react-use-clipboard/dist/react-use-clipboard.module.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"(ssr)/./node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var copy_to_clipboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! copy-to-clipboard */ \"(ssr)/./node_modules/copy-to-clipboard/index.js\");\n/* harmony import */ var copy_to_clipboard__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(copy_to_clipboard__WEBPACK_IMPORTED_MODULE_1__);\n\n\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(n, i) {\n    var u = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(!1), c = u[0], e = u[1], f = i && i.successDuration;\n    return (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function() {\n        if (c && f) {\n            var t = setTimeout(function() {\n                e(!1);\n            }, f);\n            return function() {\n                clearTimeout(t);\n            };\n        }\n    }, [\n        c,\n        f\n    ]), [\n        c,\n        function() {\n            var t = copy_to_clipboard__WEBPACK_IMPORTED_MODULE_1___default()(n);\n            e(t);\n        }\n    ];\n} //# sourceMappingURL=react-use-clipboard.module.js.map\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvcmVhY3QtdXNlLWNsaXBib2FyZC9kaXN0L3JlYWN0LXVzZS1jbGlwYm9hcmQubW9kdWxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQWdEO0FBQWlDO0FBQUEsNkJBQWUsb0NBQVNLLENBQUMsRUFBQ0MsQ0FBQztJQUFFLElBQUlDLElBQUVOLCtDQUFDQSxDQUFDLENBQUMsSUFBR08sSUFBRUQsQ0FBQyxDQUFDLEVBQUUsRUFBQ0UsSUFBRUYsQ0FBQyxDQUFDLEVBQUUsRUFBQ0csSUFBRUosS0FBR0EsRUFBRUssZUFBZTtJQUFDLE9BQU9SLGdEQUFDQSxDQUFDO1FBQVcsSUFBR0ssS0FBR0UsR0FBRTtZQUFDLElBQUlULElBQUVXLFdBQVc7Z0JBQVdILEVBQUUsQ0FBQztZQUFFLEdBQUVDO1lBQUcsT0FBTztnQkFBV0csYUFBYVo7WUFBRTtRQUFDO0lBQUMsR0FBRTtRQUFDTztRQUFFRTtLQUFFLEdBQUU7UUFBQ0Y7UUFBRTtZQUFXLElBQUlQLElBQUVHLHdEQUFDQSxDQUFDQztZQUFHSSxFQUFFUjtRQUFFO0tBQUU7QUFBQSxFQUM3UyxzREFBc0QiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9yZXZ4LWFpLWFzc2lzdGFudC8uL25vZGVfbW9kdWxlcy9yZWFjdC11c2UtY2xpcGJvYXJkL2Rpc3QvcmVhY3QtdXNlLWNsaXBib2FyZC5tb2R1bGUuanM/OWY5MiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnR7dXNlU3RhdGUgYXMgdCx1c2VFZmZlY3QgYXMgb31mcm9tXCJyZWFjdFwiO2ltcG9ydCByIGZyb21cImNvcHktdG8tY2xpcGJvYXJkXCI7ZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24obixpKXt2YXIgdT10KCExKSxjPXVbMF0sZT11WzFdLGY9aSYmaS5zdWNjZXNzRHVyYXRpb247cmV0dXJuIG8oZnVuY3Rpb24oKXtpZihjJiZmKXt2YXIgdD1zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7ZSghMSl9LGYpO3JldHVybiBmdW5jdGlvbigpe2NsZWFyVGltZW91dCh0KX19fSxbYyxmXSksW2MsZnVuY3Rpb24oKXt2YXIgdD1yKG4pO2UodCl9XX1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXJlYWN0LXVzZS1jbGlwYm9hcmQubW9kdWxlLmpzLm1hcFxuIl0sIm5hbWVzIjpbInVzZVN0YXRlIiwidCIsInVzZUVmZmVjdCIsIm8iLCJyIiwibiIsImkiLCJ1IiwiYyIsImUiLCJmIiwic3VjY2Vzc0R1cmF0aW9uIiwic2V0VGltZW91dCIsImNsZWFyVGltZW91dCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/react-use-clipboard/dist/react-use-clipboard.module.js\n");

/***/ })

};
;