/*! For license information please see 829.js.LICENSE.txt */
"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[829],{829:function(e,t,r){r.r(t),r.d(t,{default:function(){return rt}});var n=r(67294),o=r(34475),a=r(45697),i=r.n(a),c=r(775),u=r(24159),s=r(14416),l=r(84859),f=r(78646),p=r(66724),y=function(){return{type:p._G.CHANGE_PASSWORD_MODEL_ACTION}};function h(e){return h="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},h(e)}function m(){m=function(){return e};var e={},t=Object.prototype,r=t.hasOwnProperty,n=Object.defineProperty||function(e,t,r){e[t]=r.value},o="function"==typeof Symbol?Symbol:{},a=o.iterator||"@@iterator",i=o.asyncIterator||"@@asyncIterator",c=o.toStringTag||"@@toStringTag";function u(e,t,r){return Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}),e[t]}try{u({},"")}catch(e){u=function(e,t,r){return e[t]=r}}function s(e,t,r,o){var a=t&&t.prototype instanceof p?t:p,i=Object.create(a.prototype),c=new E(o||[]);return n(i,"_invoke",{value:x(e,r,c)}),i}function l(e,t,r){try{return{type:"normal",arg:e.call(t,r)}}catch(e){return{type:"throw",arg:e}}}e.wrap=s;var f={};function p(){}function y(){}function d(){}var g={};u(g,a,(function(){return this}));var v=Object.getPrototypeOf,b=v&&v(v(L([])));b&&b!==t&&r.call(b,a)&&(g=b);var w=d.prototype=p.prototype=Object.create(g);function j(e){["next","throw","return"].forEach((function(t){u(e,t,(function(e){return this._invoke(t,e)}))}))}function O(e,t){function o(n,a,i,c){var u=l(e[n],e,a);if("throw"!==u.type){var s=u.arg,f=s.value;return f&&"object"==h(f)&&r.call(f,"__await")?t.resolve(f.__await).then((function(e){o("next",e,i,c)}),(function(e){o("throw",e,i,c)})):t.resolve(f).then((function(e){s.value=e,i(s)}),(function(e){return o("throw",e,i,c)}))}c(u.arg)}var a;n(this,"_invoke",{value:function(e,r){function n(){return new t((function(t,n){o(e,r,t,n)}))}return a=a?a.then(n,n):n()}})}function x(e,t,r){var n="suspendedStart";return function(o,a){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===o)throw a;return N()}for(r.method=o,r.arg=a;;){var i=r.delegate;if(i){var c=S(i,r);if(c){if(c===f)continue;return c}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if("suspendedStart"===n)throw n="completed",r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n="executing";var u=l(e,t,r);if("normal"===u.type){if(n=r.done?"completed":"suspendedYield",u.arg===f)continue;return{value:u.arg,done:r.done}}"throw"===u.type&&(n="completed",r.method="throw",r.arg=u.arg)}}}function S(e,t){var r=t.method,n=e.iterator[r];if(void 0===n)return t.delegate=null,"throw"===r&&e.iterator.return&&(t.method="return",t.arg=void 0,S(e,t),"throw"===t.method)||"return"!==r&&(t.method="throw",t.arg=new TypeError("The iterator does not provide a '"+r+"' method")),f;var o=l(n,e.iterator,t.arg);if("throw"===o.type)return t.method="throw",t.arg=o.arg,t.delegate=null,f;var a=o.arg;return a?a.done?(t[e.resultName]=a.value,t.next=e.nextLoc,"return"!==t.method&&(t.method="next",t.arg=void 0),t.delegate=null,f):a:(t.method="throw",t.arg=new TypeError("iterator result is not an object"),t.delegate=null,f)}function P(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function _(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function E(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(P,this),this.reset(!0)}function L(e){if(e){var t=e[a];if(t)return t.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var n=-1,o=function t(){for(;++n<e.length;)if(r.call(e,n))return t.value=e[n],t.done=!1,t;return t.value=void 0,t.done=!0,t};return o.next=o}}return{next:N}}function N(){return{value:void 0,done:!0}}return y.prototype=d,n(w,"constructor",{value:d,configurable:!0}),n(d,"constructor",{value:y,configurable:!0}),y.displayName=u(d,c,"GeneratorFunction"),e.isGeneratorFunction=function(e){var t="function"==typeof e&&e.constructor;return!!t&&(t===y||"GeneratorFunction"===(t.displayName||t.name))},e.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,d):(e.__proto__=d,u(e,c,"GeneratorFunction")),e.prototype=Object.create(w),e},e.awrap=function(e){return{__await:e}},j(O.prototype),u(O.prototype,i,(function(){return this})),e.AsyncIterator=O,e.async=function(t,r,n,o,a){void 0===a&&(a=Promise);var i=new O(s(t,r,n,o),a);return e.isGeneratorFunction(r)?i:i.next().then((function(e){return e.done?e.value:i.next()}))},j(w),u(w,c,"Generator"),u(w,a,(function(){return this})),u(w,"toString",(function(){return"[object Generator]"})),e.keys=function(e){var t=Object(e),r=[];for(var n in t)r.push(n);return r.reverse(),function e(){for(;r.length;){var n=r.pop();if(n in t)return e.value=n,e.done=!1,e}return e.done=!0,e}},e.values=L,E.prototype={constructor:E,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(_),!e)for(var t in this)"t"===t.charAt(0)&&r.call(this,t)&&!isNaN(+t.slice(1))&&(this[t]=void 0)},stop:function(){this.done=!0;var e=this.tryEntries[0].completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var t=this;function n(r,n){return i.type="throw",i.arg=e,t.next=r,n&&(t.method="next",t.arg=void 0),!!n}for(var o=this.tryEntries.length-1;o>=0;--o){var a=this.tryEntries[o],i=a.completion;if("root"===a.tryLoc)return n("end");if(a.tryLoc<=this.prev){var c=r.call(a,"catchLoc"),u=r.call(a,"finallyLoc");if(c&&u){if(this.prev<a.catchLoc)return n(a.catchLoc,!0);if(this.prev<a.finallyLoc)return n(a.finallyLoc)}else if(c){if(this.prev<a.catchLoc)return n(a.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return n(a.finallyLoc)}}}},abrupt:function(e,t){for(var n=this.tryEntries.length-1;n>=0;--n){var o=this.tryEntries[n];if(o.tryLoc<=this.prev&&r.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var a=o;break}}a&&("break"===e||"continue"===e)&&a.tryLoc<=t&&t<=a.finallyLoc&&(a=null);var i=a?a.completion:{};return i.type=e,i.arg=t,a?(this.method="next",this.next=a.finallyLoc,f):this.complete(i)},complete:function(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),f},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.finallyLoc===e)return this.complete(r.completion,r.afterLoc),_(r),f}},catch:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.tryLoc===e){var n=r.completion;if("throw"===n.type){var o=n.arg;_(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(e,t,r){return this.delegate={iterator:L(e),resultName:t,nextLoc:r},"next"===this.method&&(this.arg=void 0),f}},e}function d(e,t,r,n,o,a,i){try{var c=e[a](i),u=c.value}catch(e){return void r(e)}c.done?t(u):Promise.resolve(u).then(n,o)}var g=r(10267),v=r(51252),b=r(44515),w=r(58298),j=r(88048),O=r(94152),x=r(48521);function S(e){return S="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},S(e)}function P(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function E(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?P(Object(r),!0).forEach((function(t){L(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):P(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function L(e,t,r){return(t=function(e){var t=function(e,t){if("object"!==S(e)||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var n=r.call(e,t||"default");if("object"!==S(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"===S(t)?t:String(t)}(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function N(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,o,a,i,c=[],u=!0,s=!1;try{if(a=(r=r.call(e)).next,0===t){if(Object(r)!==r)return;u=!1}else for(;!(u=(n=a.call(r)).done)&&(c.push(n.value),c.length!==t);u=!0);}catch(e){s=!0,o=e}finally{try{if(!u&&null!=r.return&&(i=r.return(),Object(i)!==i))return}finally{if(s)throw o}}return c}}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return C(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return C(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function C(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}var T=function(e){var t=e.onSaveChangePassword,r=e.handleSubmit,o=(0,n.createRef)(),a=N((0,n.useState)(!0),2),i=a[0],c=a[1],u=N((0,n.useState)(!0),2),s=u[0],l=u[1];(0,n.useEffect)((function(){o.current.focus()}),[]);return(0,x.jsxs)(g.Z,{className:"animated fadeIn m-3",children:[(0,x.jsx)(v.Z,{xs:12,children:(0,x.jsx)(b.Z,{name:"current_password",type:"password",label:"change-password.input.old_password.label",required:!0,autoComplete:"off",inputRef:o,groupText:"lock",component:j.Z})}),(0,x.jsx)(v.Z,{xs:12,children:(0,x.jsx)(b.Z,{name:"password",type:i?"password":"text",label:"change-password.input.password.label",required:!0,autoComplete:"off",groupText:"lock",component:j.Z,appendGroupText:i?"eye-slash":"eye",isAppendIcon:!0,onClick:function(){c(!i)}})}),(0,x.jsx)(v.Z,{xs:12,children:(0,x.jsx)(b.Z,{name:"confirm_password",type:s?"password":"text",label:"change-password.input.confirm-password.label",autoComplete:"off",required:!0,groupText:"lock",component:j.Z,appendGroupText:s?"eye-slash":"eye",isAppendIcon:!0,onClick:function(){l(!s)}})}),(0,x.jsx)(v.Z,{xs:12,children:(0,x.jsx)(O.Z,E({onSave:r((function(e){t(e)}))},e))})]})};T.propTypes={onSaveChangePassword:i().func,handleSubmit:i().func};var k=(0,w.Z)({form:"changePasswordForm",validate:function(e){var t={};return e.current_password||(t.name=(0,u.PV)("change-password.old_password.input.validate.msg")),e.password||(t.password=(0,u.PV)("change-password.password.input.validate.msg")),e.password&&e.password.length<6&&(t.password=(0,u.PV)("change-password.input.password-length.validate.label")),e.confirm_password||(t.confirm_password=(0,u.PV)("change-password.confirm_password.input.validate.msg")),e.password!==e.confirm_password&&(t.confirm_password=(0,u.PV)("change-password.match_password.input.validate.msg")),t}})(T),A=r(45046),Z=r(32701),M=r(10684);function I(e){return I="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},I(e)}function G(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function $(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?G(Object(r),!0).forEach((function(t){D(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):G(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function D(e,t,r){return(t=function(e){var t=function(e,t){if("object"!==I(e)||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var n=r.call(e,t||"default");if("object"!==I(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"===I(t)?t:String(t)}(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var R=function(e){var t=e.onChangePassword,r=e.toggleChangePasswordModal,n=e.isChangePasswordModelToggle,o={onSaveChangePassword:function(e){t(e)},onCancel:r};return(0,x.jsxs)(A.Z,{isOpen:n,toggle:r,className:"modal-primary primary modal-config--small",children:[(0,x.jsx)(Z.Z,{toggle:r,children:(0,u.PV)("change-password.model.header-title")}),(0,x.jsx)(M.Z,{children:(0,x.jsx)(k,$({},o))})]})};R.propTypes={onChangePassword:i().func,toggleChangePasswordModal:i().func};var F=(0,s.$j)((function(e){return{isChangePasswordModelToggle:e.isChangePasswordModelToggle}}),{onChangePassword:function(e){return function(){var t,r=(t=m().mark((function t(r){return m().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,l.Z.put(p.BC.CHANGE_PASSWORD,e).then((function(e){r((0,f.fz)({text:(0,u.PV)("change-password.success.message")})),r(y())})).catch((function(e){var t=e.response;r((0,f.fz)({text:t.data.message,type:c.rW.ERROR}))}));case 2:case"end":return t.stop()}}),t)})),function(){var e=this,r=arguments;return new Promise((function(n,o){var a=t.apply(e,r);function i(e){d(a,n,o,i,c,"next",e)}function c(e){d(a,n,o,i,c,"throw",e)}i(void 0)}))});return function(e){return r.apply(this,arguments)}}()}})(R),V=function(){return{type:p._G.CHANGE_LANGUAGE_MODAL_ACTION}};function z(e){return z="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},z(e)}function U(){U=function(){return e};var e={},t=Object.prototype,r=t.hasOwnProperty,n=Object.defineProperty||function(e,t,r){e[t]=r.value},o="function"==typeof Symbol?Symbol:{},a=o.iterator||"@@iterator",i=o.asyncIterator||"@@asyncIterator",c=o.toStringTag||"@@toStringTag";function u(e,t,r){return Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}),e[t]}try{u({},"")}catch(e){u=function(e,t,r){return e[t]=r}}function s(e,t,r,o){var a=t&&t.prototype instanceof p?t:p,i=Object.create(a.prototype),c=new P(o||[]);return n(i,"_invoke",{value:j(e,r,c)}),i}function l(e,t,r){try{return{type:"normal",arg:e.call(t,r)}}catch(e){return{type:"throw",arg:e}}}e.wrap=s;var f={};function p(){}function y(){}function h(){}var m={};u(m,a,(function(){return this}));var d=Object.getPrototypeOf,g=d&&d(d(_([])));g&&g!==t&&r.call(g,a)&&(m=g);var v=h.prototype=p.prototype=Object.create(m);function b(e){["next","throw","return"].forEach((function(t){u(e,t,(function(e){return this._invoke(t,e)}))}))}function w(e,t){function o(n,a,i,c){var u=l(e[n],e,a);if("throw"!==u.type){var s=u.arg,f=s.value;return f&&"object"==z(f)&&r.call(f,"__await")?t.resolve(f.__await).then((function(e){o("next",e,i,c)}),(function(e){o("throw",e,i,c)})):t.resolve(f).then((function(e){s.value=e,i(s)}),(function(e){return o("throw",e,i,c)}))}c(u.arg)}var a;n(this,"_invoke",{value:function(e,r){function n(){return new t((function(t,n){o(e,r,t,n)}))}return a=a?a.then(n,n):n()}})}function j(e,t,r){var n="suspendedStart";return function(o,a){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===o)throw a;return E()}for(r.method=o,r.arg=a;;){var i=r.delegate;if(i){var c=O(i,r);if(c){if(c===f)continue;return c}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if("suspendedStart"===n)throw n="completed",r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n="executing";var u=l(e,t,r);if("normal"===u.type){if(n=r.done?"completed":"suspendedYield",u.arg===f)continue;return{value:u.arg,done:r.done}}"throw"===u.type&&(n="completed",r.method="throw",r.arg=u.arg)}}}function O(e,t){var r=t.method,n=e.iterator[r];if(void 0===n)return t.delegate=null,"throw"===r&&e.iterator.return&&(t.method="return",t.arg=void 0,O(e,t),"throw"===t.method)||"return"!==r&&(t.method="throw",t.arg=new TypeError("The iterator does not provide a '"+r+"' method")),f;var o=l(n,e.iterator,t.arg);if("throw"===o.type)return t.method="throw",t.arg=o.arg,t.delegate=null,f;var a=o.arg;return a?a.done?(t[e.resultName]=a.value,t.next=e.nextLoc,"return"!==t.method&&(t.method="next",t.arg=void 0),t.delegate=null,f):a:(t.method="throw",t.arg=new TypeError("iterator result is not an object"),t.delegate=null,f)}function x(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function S(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function P(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(x,this),this.reset(!0)}function _(e){if(e){var t=e[a];if(t)return t.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var n=-1,o=function t(){for(;++n<e.length;)if(r.call(e,n))return t.value=e[n],t.done=!1,t;return t.value=void 0,t.done=!0,t};return o.next=o}}return{next:E}}function E(){return{value:void 0,done:!0}}return y.prototype=h,n(v,"constructor",{value:h,configurable:!0}),n(h,"constructor",{value:y,configurable:!0}),y.displayName=u(h,c,"GeneratorFunction"),e.isGeneratorFunction=function(e){var t="function"==typeof e&&e.constructor;return!!t&&(t===y||"GeneratorFunction"===(t.displayName||t.name))},e.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,h):(e.__proto__=h,u(e,c,"GeneratorFunction")),e.prototype=Object.create(v),e},e.awrap=function(e){return{__await:e}},b(w.prototype),u(w.prototype,i,(function(){return this})),e.AsyncIterator=w,e.async=function(t,r,n,o,a){void 0===a&&(a=Promise);var i=new w(s(t,r,n,o),a);return e.isGeneratorFunction(r)?i:i.next().then((function(e){return e.done?e.value:i.next()}))},b(v),u(v,c,"Generator"),u(v,a,(function(){return this})),u(v,"toString",(function(){return"[object Generator]"})),e.keys=function(e){var t=Object(e),r=[];for(var n in t)r.push(n);return r.reverse(),function e(){for(;r.length;){var n=r.pop();if(n in t)return e.value=n,e.done=!1,e}return e.done=!0,e}},e.values=_,P.prototype={constructor:P,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(S),!e)for(var t in this)"t"===t.charAt(0)&&r.call(this,t)&&!isNaN(+t.slice(1))&&(this[t]=void 0)},stop:function(){this.done=!0;var e=this.tryEntries[0].completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var t=this;function n(r,n){return i.type="throw",i.arg=e,t.next=r,n&&(t.method="next",t.arg=void 0),!!n}for(var o=this.tryEntries.length-1;o>=0;--o){var a=this.tryEntries[o],i=a.completion;if("root"===a.tryLoc)return n("end");if(a.tryLoc<=this.prev){var c=r.call(a,"catchLoc"),u=r.call(a,"finallyLoc");if(c&&u){if(this.prev<a.catchLoc)return n(a.catchLoc,!0);if(this.prev<a.finallyLoc)return n(a.finallyLoc)}else if(c){if(this.prev<a.catchLoc)return n(a.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return n(a.finallyLoc)}}}},abrupt:function(e,t){for(var n=this.tryEntries.length-1;n>=0;--n){var o=this.tryEntries[n];if(o.tryLoc<=this.prev&&r.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var a=o;break}}a&&("break"===e||"continue"===e)&&a.tryLoc<=t&&t<=a.finallyLoc&&(a=null);var i=a?a.completion:{};return i.type=e,i.arg=t,a?(this.method="next",this.next=a.finallyLoc,f):this.complete(i)},complete:function(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),f},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.finallyLoc===e)return this.complete(r.completion,r.afterLoc),S(r),f}},catch:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.tryLoc===e){var n=r.completion;if("throw"===n.type){var o=n.arg;S(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(e,t,r){return this.delegate={iterator:_(e),resultName:t,nextLoc:r},"next"===this.method&&(this.arg=void 0),f}},e}function W(e,t,r,n,o,a,i){try{var c=e[a](i),u=c.value}catch(e){return void r(e)}c.done?t(u):Promise.resolve(u).then(n,o)}var q=r(42655);function B(e){return B="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},B(e)}function H(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function Y(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?H(Object(r),!0).forEach((function(t){J(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):H(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function J(e,t,r){return(t=function(e){var t=function(e,t){if("object"!==B(e)||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var n=r.call(e,t||"default");if("object"!==B(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"===B(t)?t:String(t)}(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var K=(0,w.Z)({form:"changeLanguageForm"})((function(e){var t=e.onSaveChangeLanguage,r=e.handleSubmit,n=(e.settings,(0,u.G_)(c.V1));return(0,x.jsxs)(g.Z,{className:"animated fadeIn m-3",children:[(0,x.jsx)(v.Z,{xs:12,children:(0,x.jsx)(b.Z,{name:"language",label:"member.select.language.label",required:!0,groupText:"language",options:n,placeholder:"member.select.language.placeholder",component:q.Z,isSearchable:!0})}),(0,x.jsx)(v.Z,{xs:12,children:(0,x.jsx)(O.Z,Y({onSave:r((function(e){var r,n,o,a=e.language,i=[(r=c.rn.LANGUAGE,n=a.id,o=a.name,{key:r,value:n,display_name:o})];t(i)}))},e))})]})})),X=r(18480);function Q(e){return Q="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},Q(e)}function ee(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function te(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?ee(Object(r),!0).forEach((function(t){re(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):ee(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function re(e,t,r){return(t=function(e){var t=function(e,t){if("object"!==Q(e)||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var n=r.call(e,t||"default");if("object"!==Q(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"===Q(t)?t:String(t)}(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var ne=function(e){var t=e.postSettings,r=e.toggleChangeLanguageModal,o=e.isChangeLanguageModelToggle,a=e.fetchSettings,i=(e.settings,e.selectedLanguage),s=(0,u.G_)(c.V1);(0,n.useEffect)((function(){a(!0)}),[]);var l={onSaveChangeLanguage:function(e){t(e)},initialValues:{language:s.find((function(e){return e.id===(null==i?void 0:i.id)}))},onCancel:r};return(0,x.jsxs)(A.Z,{isOpen:o,toggle:r,className:"modal-primary primary modal-config--small",children:[(0,x.jsx)(Z.Z,{toggle:r,children:(0,u.PV)("change-language.model.header-title")}),(0,x.jsx)(M.Z,{children:(0,x.jsx)(K,te({},l))})]})};ne.propTypes={postSettings:i().func,toggleChangeLanguageModal:i().func,fetchSettings:i().func,settings:i().object,selectedLanguage:i().object};var oe=function(e,t){if(e.length>0)return{id:e[0].value,key:e[0].key}},ae=(0,s.$j)((function(e){var t=e.settings,r=Object.values(t),n=_.mapKeys(r,"key");return{isChangeLanguageModelToggle:e.isChangeLanguageModelToggle,settings:n,selectedLanguage:oe(r,c.rn.LANGUAGE)}}),{fetchSettings:X.w,postSettings:function(e){return function(){var t,r=(t=U().mark((function t(r){return U().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,l.Z.post(p.BC.UPDATE_SETTINGS,e).then((function(e){r({type:c.am.POST_SETTINGS,payload:e.data.data}),r((0,f.fz)({text:(0,u.PV)("change-language.success.message")})),r(V())})).catch((function(e){var t=e.response;r((0,f.fz)({text:t.data.message,type:c.rW.ERROR}))}));case 2:case"end":return t.stop()}}),t)})),function(){var e=this,r=arguments;return new Promise((function(n,o){var a=t.apply(e,r);function i(e){W(a,n,o,i,c,"next",e)}function c(e){W(a,n,o,i,c,"throw",e)}i(void 0)}))});return function(e){return r.apply(this,arguments)}}()}})(ne),ie=r(34155),ce=function(){return ce=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var o in t=arguments[r])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e},ce.apply(this,arguments)};var ue={exports:{}},se={exports:{}},le={},fe="function"==typeof Symbol&&Symbol.for,pe=fe?Symbol.for("react.element"):60103,ye=fe?Symbol.for("react.portal"):60106,he=fe?Symbol.for("react.fragment"):60107,me=fe?Symbol.for("react.strict_mode"):60108,de=fe?Symbol.for("react.profiler"):60114,ge=fe?Symbol.for("react.provider"):60109,ve=fe?Symbol.for("react.context"):60110,be=fe?Symbol.for("react.async_mode"):60111,we=fe?Symbol.for("react.concurrent_mode"):60111,je=fe?Symbol.for("react.forward_ref"):60112,Oe=fe?Symbol.for("react.suspense"):60113,xe=fe?Symbol.for("react.suspense_list"):60120,Se=fe?Symbol.for("react.memo"):60115,Pe=fe?Symbol.for("react.lazy"):60116,_e=fe?Symbol.for("react.block"):60121,Ee=fe?Symbol.for("react.fundamental"):60117,Le=fe?Symbol.for("react.responder"):60118,Ne=fe?Symbol.for("react.scope"):60119;function Ce(e){if("object"==typeof e&&null!==e){var t=e.$$typeof;switch(t){case pe:switch(e=e.type){case be:case we:case he:case de:case me:case Oe:return e;default:switch(e=e&&e.$$typeof){case ve:case je:case Pe:case Se:case ge:return e;default:return t}}case ye:return t}}}function Te(e){return Ce(e)===we}le.AsyncMode=be,le.ConcurrentMode=we,le.ContextConsumer=ve,le.ContextProvider=ge,le.Element=pe,le.ForwardRef=je,le.Fragment=he,le.Lazy=Pe,le.Memo=Se,le.Portal=ye,le.Profiler=de,le.StrictMode=me,le.Suspense=Oe,le.isAsyncMode=function(e){return Te(e)||Ce(e)===be},le.isConcurrentMode=Te,le.isContextConsumer=function(e){return Ce(e)===ve},le.isContextProvider=function(e){return Ce(e)===ge},le.isElement=function(e){return"object"==typeof e&&null!==e&&e.$$typeof===pe},le.isForwardRef=function(e){return Ce(e)===je},le.isFragment=function(e){return Ce(e)===he},le.isLazy=function(e){return Ce(e)===Pe},le.isMemo=function(e){return Ce(e)===Se},le.isPortal=function(e){return Ce(e)===ye},le.isProfiler=function(e){return Ce(e)===de},le.isStrictMode=function(e){return Ce(e)===me},le.isSuspense=function(e){return Ce(e)===Oe},le.isValidElementType=function(e){return"string"==typeof e||"function"==typeof e||e===he||e===we||e===de||e===me||e===Oe||e===xe||"object"==typeof e&&null!==e&&(e.$$typeof===Pe||e.$$typeof===Se||e.$$typeof===ge||e.$$typeof===ve||e.$$typeof===je||e.$$typeof===Ee||e.$$typeof===Le||e.$$typeof===Ne||e.$$typeof===_e)},le.typeOf=Ce,se.exports=le;var ke=Object.getOwnPropertySymbols,Ae=Object.prototype.hasOwnProperty,Ze=Object.prototype.propertyIsEnumerable;function Me(e){if(null==e)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(e)}(function(){try{if(!Object.assign)return!1;var e=new String("abc");if(e[5]="de","5"===Object.getOwnPropertyNames(e)[0])return!1;for(var t={},r=0;r<10;r++)t["_"+String.fromCharCode(r)]=r;var n=Object.getOwnPropertyNames(t).map((function(e){return t[e]}));if("0123456789"!==n.join(""))return!1;var o={};return"abcdefghijklmnopqrst".split("").forEach((function(e){o[e]=e})),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},o)).join("")}catch(e){return!1}})()&&Object.assign;var Ie="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";function Ge(e,t,r,n,o){}Ge.resetWarningCache=function(){0};se.exports,Function.call.bind(Object.prototype.hasOwnProperty);var $e=Ie;function De(){}function Re(){}Re.resetWarningCache=De;ue.exports=function(){function e(e,t,r,n,o,a){if(a!==$e){var i=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw i.name="Invariant Violation",i}}function t(){return e}e.isRequired=e;var r={array:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,elementType:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t,checkPropTypes:Re,resetWarningCache:De};return r.PropTypes=r,r}();var Fe,Ve=ue.exports,ze={exports:{}};Fe=ze,function(){var e={}.hasOwnProperty;function t(){for(var r=[],n=0;n<arguments.length;n++){var o=arguments[n];if(o){var a=typeof o;if("string"===a||"number"===a)r.push(o);else if(Array.isArray(o)){if(o.length){var i=t.apply(null,o);i&&r.push(i)}}else if("object"===a)if(o.toString===Object.prototype.toString)for(var c in o)e.call(o,c)&&o[c]&&r.push(c);else r.push(o.toString())}}return r.join(" ")}Fe.exports?(t.default=t,Fe.exports=t):window.classNames=t}();var Ue=ze.exports,We=(0,n.forwardRef)((function(e,t){var r,o=e.className,a=e.content,i=e.customClassName,c=e.height,u=e.icon,s=e.name,l=e.size,f=e.title,p=e.use,y=e.width,h=function(e,t){var r={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(n=Object.getOwnPropertySymbols(e);o<n.length;o++)t.indexOf(n[o])<0&&Object.prototype.propertyIsEnumerable.call(e,n[o])&&(r[n[o]]=e[n[o]])}return r}(e,["className","content","customClassName","height","icon","name","size","title","use","width"]),m=(0,n.useState)(0),d=m[0],g=m[1],v=u||a||s;a&&ie&&ie.env,s&&ie&&ie.env,(0,n.useMemo)((function(){return g(d+1)}),[v,JSON.stringify(v)]);var b=(0,n.useMemo)((function(){return v&&"string"==typeof v&&v.includes("-")?v.replace(/([-_][a-z0-9])/gi,(function(e){return e.toUpperCase()})).replace(/-/gi,""):v}),[d]),w=f?"<title>"+f+"</title>":"",j=(0,n.useMemo)((function(){return Array.isArray(v)?v:"string"==typeof v&&n.icons?n.icons[b]:void 0}),[d]),O=(0,n.useMemo)((function(){return Array.isArray(j)?j[1]||j[0]:j}),[d]),x=Array.isArray(j)&&j.length>1?j[0]:"64 64",S=h.viewBox||"0 0 "+x,P=i?Ue(i):Ue("icon",((r={})["icon-"+l]=l,r["icon-custom-size"]=c||y,r),o);return p?n.createElement("svg",ce({xmlns:"http://www.w3.org/2000/svg",className:P},c&&{height:c},y&&{width:y},{role:"img"},h,{ref:t}),n.createElement("use",{href:p})):n.createElement("svg",ce({xmlns:"http://www.w3.org/2000/svg",viewBox:S,className:P},c&&{height:c},y&&{width:y},{role:"img",dangerouslySetInnerHTML:{__html:w+O}},h,{ref:t}))}));We.propTypes={className:Ve.string,content:Ve.oneOfType([Ve.array,Ve.string]),customClassName:Ve.string,height:Ve.number,icon:Ve.oneOfType([Ve.array,Ve.string]),name:Ve.string,size:Ve.oneOf(["custom-size","sm","lg","xl","xxl","3xl","4xl","5xl","6xl","7xl","8xl","9xl"]),title:Ve.any,use:Ve.any,width:Ve.number},We.displayName="CIcon";const qe=["512 512","<rect width='352' height='32' x='80' y='96' fill='var(--ci-primary-color, currentColor)' class='ci-primary'/><rect width='352' height='32' x='80' y='240' fill='var(--ci-primary-color, currentColor)' class='ci-primary'/><rect width='352' height='32' x='80' y='384' fill='var(--ci-primary-color, currentColor)' class='ci-primary'/>"];var Be=r(9645),He=r(89250);function Ye(e){return Ye="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},Ye(e)}function Je(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function Ke(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?Je(Object(r),!0).forEach((function(t){Xe(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):Je(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function Xe(e,t,r){return(t=function(e){var t=function(e,t){if("object"!==Ye(e)||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var n=r.call(e,t||"default");if("object"!==Ye(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"===Ye(t)?t:String(t)}(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function Qe(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,o,a,i,c=[],u=!0,s=!1;try{if(a=(r=r.call(e)).next,0===t){if(Object(r)!==r)return;u=!1}else for(;!(u=(n=a.call(r)).done)&&(c.push(n.value),c.length!==t);u=!0);}catch(e){s=!0,o=e}finally{try{if(!u&&null!=r.return&&(i=r.return(),Object(i)!==i))return}finally{if(s)throw o}}return c}}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return et(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return et(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function et(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}var tt=function(e){var t=e.member,r=(e.history,e.appName),a=e.appLogo,i=e.toggleChangePasswordModal,l=e.toggleChangeLanguageModal,f=(0,He.s0)(),p={toggleChangePasswordModal:i},y={toggleChangeLanguageModal:l},h=Qe((0,n.useState)(!0),2),m=h[0],d=h[1],g=null,v=(0,s.I0)(),b=(0,s.v9)((function(e){return e.sidebarReducer.sidebarShow}));t&&(t.name=t.first_name,t.last_name&&(t.name+=" "+t.last_name),t.image_path&&(g=t.image_path));return(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(o.X4,{className:"ps-1",onClick:function(){return v({type:"SET",sidebarShow:!b})},children:(0,x.jsx)(We,{icon:qe,size:"lg"})}),(0,x.jsxs)(o.Dl,{className:"header__sidebar-logo d-md-none",children:[(0,x.jsx)("a",{href:"/",children:(0,x.jsx)("img",{className:"header__app-logo",src:a,alt:a})}),(0,x.jsx)("span",{className:"ml-2 header__app-name",children:r})]}),(0,x.jsx)(o.g3,{className:"ml-auto header__margin",children:(0,x.jsxs)(Be.Z,{variant:"nav-item",children:[(0,x.jsxs)(Be.Z.Toggle,{placement:"bottom-end",className:" py-0 shadow-none header__dropdown",children:[g?(0,x.jsx)("img",{src:g,className:"img-avatar header__img",alt:"user-avatar"}):(0,x.jsx)("div",{className:"header__avatar img-avatar",children:(0,x.jsx)("span",{className:"header__avatar-text",children:(0,u.g4)(t?t.name:null)})}),(0,x.jsx)("span",{className:"mr-1 header__user-name text-dark",children:t?t.name:null})]}),(0,x.jsxs)(Be.Z.Menu,{placement:"bottom-end",className:"header__user-name pt-0",children:[(0,x.jsxs)(Be.Z.Item,{onClick:function(){f(c.Z5.MEMBER_PROFILE)},className:"header__border",children:[(0,x.jsx)("i",{className:"fa fa-cog header__user-icon"}),(0,u.PV)("profile.title")]}),(0,x.jsxs)(Be.Z.Item,{onClick:function(){d(!0),i()},className:"header__border",children:[(0,x.jsx)("i",{className:"fa fa-lock header__user-icon"}),(0,u.PV)("change-password.title")]}),(0,x.jsxs)(Be.Z.Item,{onClick:function(){d(!1),l()},className:"header__border",children:[(0,x.jsx)("i",{className:"fa fa-language header__user-icon"}),(0,u.PV)("change-language.title")]}),(0,x.jsxs)(Be.Z.Item,{onClick:function(){d(!1),f(c.Z5.CURRENT_PLAN)},className:"header__border",children:[(0,x.jsx)("i",{className:"fa fa-bookmark header__user-icon"}),(0,u.PV)("membership-plan.title")]}),(0,x.jsxs)(Be.Z.Item,{onClick:function(t){return e.onLogout(t)},className:"header__border",children:[(0,x.jsx)("i",{className:"fa fa-lock header__user-icon"}),(0,u.PV)("header.logout.title")]})]}),m?(0,x.jsx)(F,Ke({},p)):(0,x.jsx)(ae,Ke({},y))]})})]})};tt.propTypes={member:i().object,history:i().object,appName:i().string,appLogo:i().string};var rt=(0,s.$j)(null,{toggleChangePasswordModal:y,toggleChangeLanguageModal:V})(tt)}}]);
//# sourceMappingURL=829.js.map