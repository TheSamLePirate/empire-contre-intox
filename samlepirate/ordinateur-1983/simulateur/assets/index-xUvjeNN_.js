(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))l(o);new MutationObserver(o=>{for(const c of o)if(c.type==="childList")for(const d of c.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&l(d)}).observe(document,{childList:!0,subtree:!0});function i(o){const c={};return o.integrity&&(c.integrity=o.integrity),o.referrerPolicy&&(c.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?c.credentials="include":o.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function l(o){if(o.ep)return;o.ep=!0;const c=i(o);fetch(o.href,c)}})();function Wx(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var r0={exports:{}},Fl={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var h1;function Hv(){if(h1)return Fl;h1=1;var t=Symbol.for("react.transitional.element"),a=Symbol.for("react.fragment");function i(l,o,c){var d=null;if(c!==void 0&&(d=""+c),o.key!==void 0&&(d=""+o.key),"key"in o){c={};for(var m in o)m!=="key"&&(c[m]=o[m])}else c=o;return o=c.ref,{$$typeof:t,type:l,key:d,ref:o!==void 0?o:null,props:c}}return Fl.Fragment=a,Fl.jsx=i,Fl.jsxs=i,Fl}var x1;function Jv(){return x1||(x1=1,r0.exports=Hv()),r0.exports}var u=Jv(),l0={exports:{}},Fe={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var g1;function qv(){if(g1)return Fe;g1=1;var t=Symbol.for("react.transitional.element"),a=Symbol.for("react.portal"),i=Symbol.for("react.fragment"),l=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),c=Symbol.for("react.consumer"),d=Symbol.for("react.context"),m=Symbol.for("react.forward_ref"),x=Symbol.for("react.suspense"),h=Symbol.for("react.memo"),b=Symbol.for("react.lazy"),g=Symbol.for("react.activity"),v=Symbol.iterator;function L(j){return j===null||typeof j!="object"?null:(j=v&&j[v]||j["@@iterator"],typeof j=="function"?j:null)}var w={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},N=Object.assign,T={};function C(j,M,V){this.props=j,this.context=M,this.refs=T,this.updater=V||w}C.prototype.isReactComponent={},C.prototype.setState=function(j,M){if(typeof j!="object"&&typeof j!="function"&&j!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,j,M,"setState")},C.prototype.forceUpdate=function(j){this.updater.enqueueForceUpdate(this,j,"forceUpdate")};function B(){}B.prototype=C.prototype;function D(j,M,V){this.props=j,this.context=M,this.refs=T,this.updater=V||w}var E=D.prototype=new B;E.constructor=D,N(E,C.prototype),E.isPureReactComponent=!0;var _=Array.isArray;function P(){}var S={H:null,A:null,T:null,S:null},X=Object.prototype.hasOwnProperty;function F(j,M,V){var ee=V.ref;return{$$typeof:t,type:j,key:M,ref:ee!==void 0?ee:null,props:V}}function $(j,M){return F(j.type,M,j.props)}function H(j){return typeof j=="object"&&j!==null&&j.$$typeof===t}function te(j){var M={"=":"=0",":":"=2"};return"$"+j.replace(/[=:]/g,function(V){return M[V]})}var oe=/\/+/g;function I(j,M){return typeof j=="object"&&j!==null&&j.key!=null?te(""+j.key):M.toString(36)}function J(j){switch(j.status){case"fulfilled":return j.value;case"rejected":throw j.reason;default:switch(typeof j.status=="string"?j.then(P,P):(j.status="pending",j.then(function(M){j.status==="pending"&&(j.status="fulfilled",j.value=M)},function(M){j.status==="pending"&&(j.status="rejected",j.reason=M)})),j.status){case"fulfilled":return j.value;case"rejected":throw j.reason}}throw j}function R(j,M,V,ee,xe){var be=typeof j;(be==="undefined"||be==="boolean")&&(j=null);var Le=!1;if(j===null)Le=!0;else switch(be){case"bigint":case"string":case"number":Le=!0;break;case"object":switch(j.$$typeof){case t:case a:Le=!0;break;case b:return Le=j._init,R(Le(j._payload),M,V,ee,xe)}}if(Le)return xe=xe(j),Le=ee===""?"."+I(j,0):ee,_(xe)?(V="",Le!=null&&(V=Le.replace(oe,"$&/")+"/"),R(xe,M,V,"",function(Ze){return Ze})):xe!=null&&(H(xe)&&(xe=$(xe,V+(xe.key==null||j&&j.key===xe.key?"":(""+xe.key).replace(oe,"$&/")+"/")+Le)),M.push(xe)),1;Le=0;var pe=ee===""?".":ee+":";if(_(j))for(var Te=0;Te<j.length;Te++)ee=j[Te],be=pe+I(ee,Te),Le+=R(ee,M,V,be,xe);else if(Te=L(j),typeof Te=="function")for(j=Te.call(j),Te=0;!(ee=j.next()).done;)ee=ee.value,be=pe+I(ee,Te++),Le+=R(ee,M,V,be,xe);else if(be==="object"){if(typeof j.then=="function")return R(J(j),M,V,ee,xe);throw M=String(j),Error("Objects are not valid as a React child (found: "+(M==="[object Object]"?"object with keys {"+Object.keys(j).join(", ")+"}":M)+"). If you meant to render a collection of children, use an array instead.")}return Le}function Z(j,M,V){if(j==null)return j;var ee=[],xe=0;return R(j,ee,"","",function(be){return M.call(V,be,xe++)}),ee}function G(j){if(j._status===-1){var M=j._result;M=M(),M.then(function(V){(j._status===0||j._status===-1)&&(j._status=1,j._result=V)},function(V){(j._status===0||j._status===-1)&&(j._status=2,j._result=V)}),j._status===-1&&(j._status=0,j._result=M)}if(j._status===1)return j._result.default;throw j._result}var K=typeof reportError=="function"?reportError:function(j){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var M=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof j=="object"&&j!==null&&typeof j.message=="string"?String(j.message):String(j),error:j});if(!window.dispatchEvent(M))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",j);return}console.error(j)},ne={map:Z,forEach:function(j,M,V){Z(j,function(){M.apply(this,arguments)},V)},count:function(j){var M=0;return Z(j,function(){M++}),M},toArray:function(j){return Z(j,function(M){return M})||[]},only:function(j){if(!H(j))throw Error("React.Children.only expected to receive a single React element child.");return j}};return Fe.Activity=g,Fe.Children=ne,Fe.Component=C,Fe.Fragment=i,Fe.Profiler=o,Fe.PureComponent=D,Fe.StrictMode=l,Fe.Suspense=x,Fe.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=S,Fe.__COMPILER_RUNTIME={__proto__:null,c:function(j){return S.H.useMemoCache(j)}},Fe.cache=function(j){return function(){return j.apply(null,arguments)}},Fe.cacheSignal=function(){return null},Fe.cloneElement=function(j,M,V){if(j==null)throw Error("The argument must be a React element, but you passed "+j+".");var ee=N({},j.props),xe=j.key;if(M!=null)for(be in M.key!==void 0&&(xe=""+M.key),M)!X.call(M,be)||be==="key"||be==="__self"||be==="__source"||be==="ref"&&M.ref===void 0||(ee[be]=M[be]);var be=arguments.length-2;if(be===1)ee.children=V;else if(1<be){for(var Le=Array(be),pe=0;pe<be;pe++)Le[pe]=arguments[pe+2];ee.children=Le}return F(j.type,xe,ee)},Fe.createContext=function(j){return j={$$typeof:d,_currentValue:j,_currentValue2:j,_threadCount:0,Provider:null,Consumer:null},j.Provider=j,j.Consumer={$$typeof:c,_context:j},j},Fe.createElement=function(j,M,V){var ee,xe={},be=null;if(M!=null)for(ee in M.key!==void 0&&(be=""+M.key),M)X.call(M,ee)&&ee!=="key"&&ee!=="__self"&&ee!=="__source"&&(xe[ee]=M[ee]);var Le=arguments.length-2;if(Le===1)xe.children=V;else if(1<Le){for(var pe=Array(Le),Te=0;Te<Le;Te++)pe[Te]=arguments[Te+2];xe.children=pe}if(j&&j.defaultProps)for(ee in Le=j.defaultProps,Le)xe[ee]===void 0&&(xe[ee]=Le[ee]);return F(j,be,xe)},Fe.createRef=function(){return{current:null}},Fe.forwardRef=function(j){return{$$typeof:m,render:j}},Fe.isValidElement=H,Fe.lazy=function(j){return{$$typeof:b,_payload:{_status:-1,_result:j},_init:G}},Fe.memo=function(j,M){return{$$typeof:h,type:j,compare:M===void 0?null:M}},Fe.startTransition=function(j){var M=S.T,V={};S.T=V;try{var ee=j(),xe=S.S;xe!==null&&xe(V,ee),typeof ee=="object"&&ee!==null&&typeof ee.then=="function"&&ee.then(P,K)}catch(be){K(be)}finally{M!==null&&V.types!==null&&(M.types=V.types),S.T=M}},Fe.unstable_useCacheRefresh=function(){return S.H.useCacheRefresh()},Fe.use=function(j){return S.H.use(j)},Fe.useActionState=function(j,M,V){return S.H.useActionState(j,M,V)},Fe.useCallback=function(j,M){return S.H.useCallback(j,M)},Fe.useContext=function(j){return S.H.useContext(j)},Fe.useDebugValue=function(){},Fe.useDeferredValue=function(j,M){return S.H.useDeferredValue(j,M)},Fe.useEffect=function(j,M){return S.H.useEffect(j,M)},Fe.useEffectEvent=function(j){return S.H.useEffectEvent(j)},Fe.useId=function(){return S.H.useId()},Fe.useImperativeHandle=function(j,M,V){return S.H.useImperativeHandle(j,M,V)},Fe.useInsertionEffect=function(j,M){return S.H.useInsertionEffect(j,M)},Fe.useLayoutEffect=function(j,M){return S.H.useLayoutEffect(j,M)},Fe.useMemo=function(j,M){return S.H.useMemo(j,M)},Fe.useOptimistic=function(j,M){return S.H.useOptimistic(j,M)},Fe.useReducer=function(j,M,V){return S.H.useReducer(j,M,V)},Fe.useRef=function(j){return S.H.useRef(j)},Fe.useState=function(j){return S.H.useState(j)},Fe.useSyncExternalStore=function(j,M,V){return S.H.useSyncExternalStore(j,M,V)},Fe.useTransition=function(){return S.H.useTransition()},Fe.version="19.2.4",Fe}var _1;function vs(){return _1||(_1=1,l0.exports=qv()),l0.exports}var z=vs();const Vv=Wx(z);var s0={exports:{}},Kl={},o0={exports:{}},c0={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var b1;function Zv(){return b1||(b1=1,(function(t){function a(R,Z){var G=R.length;R.push(Z);e:for(;0<G;){var K=G-1>>>1,ne=R[K];if(0<o(ne,Z))R[K]=Z,R[G]=ne,G=K;else break e}}function i(R){return R.length===0?null:R[0]}function l(R){if(R.length===0)return null;var Z=R[0],G=R.pop();if(G!==Z){R[0]=G;e:for(var K=0,ne=R.length,j=ne>>>1;K<j;){var M=2*(K+1)-1,V=R[M],ee=M+1,xe=R[ee];if(0>o(V,G))ee<ne&&0>o(xe,V)?(R[K]=xe,R[ee]=G,K=ee):(R[K]=V,R[M]=G,K=M);else if(ee<ne&&0>o(xe,G))R[K]=xe,R[ee]=G,K=ee;else break e}}return Z}function o(R,Z){var G=R.sortIndex-Z.sortIndex;return G!==0?G:R.id-Z.id}if(t.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var c=performance;t.unstable_now=function(){return c.now()}}else{var d=Date,m=d.now();t.unstable_now=function(){return d.now()-m}}var x=[],h=[],b=1,g=null,v=3,L=!1,w=!1,N=!1,T=!1,C=typeof setTimeout=="function"?setTimeout:null,B=typeof clearTimeout=="function"?clearTimeout:null,D=typeof setImmediate<"u"?setImmediate:null;function E(R){for(var Z=i(h);Z!==null;){if(Z.callback===null)l(h);else if(Z.startTime<=R)l(h),Z.sortIndex=Z.expirationTime,a(x,Z);else break;Z=i(h)}}function _(R){if(N=!1,E(R),!w)if(i(x)!==null)w=!0,P||(P=!0,te());else{var Z=i(h);Z!==null&&J(_,Z.startTime-R)}}var P=!1,S=-1,X=5,F=-1;function $(){return T?!0:!(t.unstable_now()-F<X)}function H(){if(T=!1,P){var R=t.unstable_now();F=R;var Z=!0;try{e:{w=!1,N&&(N=!1,B(S),S=-1),L=!0;var G=v;try{t:{for(E(R),g=i(x);g!==null&&!(g.expirationTime>R&&$());){var K=g.callback;if(typeof K=="function"){g.callback=null,v=g.priorityLevel;var ne=K(g.expirationTime<=R);if(R=t.unstable_now(),typeof ne=="function"){g.callback=ne,E(R),Z=!0;break t}g===i(x)&&l(x),E(R)}else l(x);g=i(x)}if(g!==null)Z=!0;else{var j=i(h);j!==null&&J(_,j.startTime-R),Z=!1}}break e}finally{g=null,v=G,L=!1}Z=void 0}}finally{Z?te():P=!1}}}var te;if(typeof D=="function")te=function(){D(H)};else if(typeof MessageChannel<"u"){var oe=new MessageChannel,I=oe.port2;oe.port1.onmessage=H,te=function(){I.postMessage(null)}}else te=function(){C(H,0)};function J(R,Z){S=C(function(){R(t.unstable_now())},Z)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(R){R.callback=null},t.unstable_forceFrameRate=function(R){0>R||125<R?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):X=0<R?Math.floor(1e3/R):5},t.unstable_getCurrentPriorityLevel=function(){return v},t.unstable_next=function(R){switch(v){case 1:case 2:case 3:var Z=3;break;default:Z=v}var G=v;v=Z;try{return R()}finally{v=G}},t.unstable_requestPaint=function(){T=!0},t.unstable_runWithPriority=function(R,Z){switch(R){case 1:case 2:case 3:case 4:case 5:break;default:R=3}var G=v;v=R;try{return Z()}finally{v=G}},t.unstable_scheduleCallback=function(R,Z,G){var K=t.unstable_now();switch(typeof G=="object"&&G!==null?(G=G.delay,G=typeof G=="number"&&0<G?K+G:K):G=K,R){case 1:var ne=-1;break;case 2:ne=250;break;case 5:ne=1073741823;break;case 4:ne=1e4;break;default:ne=5e3}return ne=G+ne,R={id:b++,callback:Z,priorityLevel:R,startTime:G,expirationTime:ne,sortIndex:-1},G>K?(R.sortIndex=G,a(h,R),i(x)===null&&R===i(h)&&(N?(B(S),S=-1):N=!0,J(_,G-K))):(R.sortIndex=ne,a(x,R),w||L||(w=!0,P||(P=!0,te()))),R},t.unstable_shouldYield=$,t.unstable_wrapCallback=function(R){var Z=v;return function(){var G=v;v=Z;try{return R.apply(this,arguments)}finally{v=G}}}})(c0)),c0}var y1;function Gv(){return y1||(y1=1,o0.exports=Zv()),o0.exports}var u0={exports:{}},un={};/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var v1;function Yv(){if(v1)return un;v1=1;var t=vs();function a(x){var h="https://react.dev/errors/"+x;if(1<arguments.length){h+="?args[]="+encodeURIComponent(arguments[1]);for(var b=2;b<arguments.length;b++)h+="&args[]="+encodeURIComponent(arguments[b])}return"Minified React error #"+x+"; visit "+h+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function i(){}var l={d:{f:i,r:function(){throw Error(a(522))},D:i,C:i,L:i,m:i,X:i,S:i,M:i},p:0,findDOMNode:null},o=Symbol.for("react.portal");function c(x,h,b){var g=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:o,key:g==null?null:""+g,children:x,containerInfo:h,implementation:b}}var d=t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function m(x,h){if(x==="font")return"";if(typeof h=="string")return h==="use-credentials"?h:""}return un.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=l,un.createPortal=function(x,h){var b=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!h||h.nodeType!==1&&h.nodeType!==9&&h.nodeType!==11)throw Error(a(299));return c(x,h,null,b)},un.flushSync=function(x){var h=d.T,b=l.p;try{if(d.T=null,l.p=2,x)return x()}finally{d.T=h,l.p=b,l.d.f()}},un.preconnect=function(x,h){typeof x=="string"&&(h?(h=h.crossOrigin,h=typeof h=="string"?h==="use-credentials"?h:"":void 0):h=null,l.d.C(x,h))},un.prefetchDNS=function(x){typeof x=="string"&&l.d.D(x)},un.preinit=function(x,h){if(typeof x=="string"&&h&&typeof h.as=="string"){var b=h.as,g=m(b,h.crossOrigin),v=typeof h.integrity=="string"?h.integrity:void 0,L=typeof h.fetchPriority=="string"?h.fetchPriority:void 0;b==="style"?l.d.S(x,typeof h.precedence=="string"?h.precedence:void 0,{crossOrigin:g,integrity:v,fetchPriority:L}):b==="script"&&l.d.X(x,{crossOrigin:g,integrity:v,fetchPriority:L,nonce:typeof h.nonce=="string"?h.nonce:void 0})}},un.preinitModule=function(x,h){if(typeof x=="string")if(typeof h=="object"&&h!==null){if(h.as==null||h.as==="script"){var b=m(h.as,h.crossOrigin);l.d.M(x,{crossOrigin:b,integrity:typeof h.integrity=="string"?h.integrity:void 0,nonce:typeof h.nonce=="string"?h.nonce:void 0})}}else h==null&&l.d.M(x)},un.preload=function(x,h){if(typeof x=="string"&&typeof h=="object"&&h!==null&&typeof h.as=="string"){var b=h.as,g=m(b,h.crossOrigin);l.d.L(x,b,{crossOrigin:g,integrity:typeof h.integrity=="string"?h.integrity:void 0,nonce:typeof h.nonce=="string"?h.nonce:void 0,type:typeof h.type=="string"?h.type:void 0,fetchPriority:typeof h.fetchPriority=="string"?h.fetchPriority:void 0,referrerPolicy:typeof h.referrerPolicy=="string"?h.referrerPolicy:void 0,imageSrcSet:typeof h.imageSrcSet=="string"?h.imageSrcSet:void 0,imageSizes:typeof h.imageSizes=="string"?h.imageSizes:void 0,media:typeof h.media=="string"?h.media:void 0})}},un.preloadModule=function(x,h){if(typeof x=="string")if(h){var b=m(h.as,h.crossOrigin);l.d.m(x,{as:typeof h.as=="string"&&h.as!=="script"?h.as:void 0,crossOrigin:b,integrity:typeof h.integrity=="string"?h.integrity:void 0})}else l.d.m(x)},un.requestFormReset=function(x){l.d.r(x)},un.unstable_batchedUpdates=function(x,h){return x(h)},un.useFormState=function(x,h,b){return d.H.useFormState(x,h,b)},un.useFormStatus=function(){return d.H.useHostTransitionStatus()},un.version="19.2.4",un}var A1;function Qx(){if(A1)return u0.exports;A1=1;function t(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(t)}catch(a){console.error(a)}}return t(),u0.exports=Yv(),u0.exports}/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var L1;function Xv(){if(L1)return Kl;L1=1;var t=Gv(),a=vs(),i=Qx();function l(e){var n="https://react.dev/errors/"+e;if(1<arguments.length){n+="?args[]="+encodeURIComponent(arguments[1]);for(var r=2;r<arguments.length;r++)n+="&args[]="+encodeURIComponent(arguments[r])}return"Minified React error #"+e+"; visit "+n+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function o(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function c(e){var n=e,r=e;if(e.alternate)for(;n.return;)n=n.return;else{e=n;do n=e,(n.flags&4098)!==0&&(r=n.return),e=n.return;while(e)}return n.tag===3?r:null}function d(e){if(e.tag===13){var n=e.memoizedState;if(n===null&&(e=e.alternate,e!==null&&(n=e.memoizedState)),n!==null)return n.dehydrated}return null}function m(e){if(e.tag===31){var n=e.memoizedState;if(n===null&&(e=e.alternate,e!==null&&(n=e.memoizedState)),n!==null)return n.dehydrated}return null}function x(e){if(c(e)!==e)throw Error(l(188))}function h(e){var n=e.alternate;if(!n){if(n=c(e),n===null)throw Error(l(188));return n!==e?null:e}for(var r=e,s=n;;){var f=r.return;if(f===null)break;var p=f.alternate;if(p===null){if(s=f.return,s!==null){r=s;continue}break}if(f.child===p.child){for(p=f.child;p;){if(p===r)return x(f),e;if(p===s)return x(f),n;p=p.sibling}throw Error(l(188))}if(r.return!==s.return)r=f,s=p;else{for(var A=!1,k=f.child;k;){if(k===r){A=!0,r=f,s=p;break}if(k===s){A=!0,s=f,r=p;break}k=k.sibling}if(!A){for(k=p.child;k;){if(k===r){A=!0,r=p,s=f;break}if(k===s){A=!0,s=p,r=f;break}k=k.sibling}if(!A)throw Error(l(189))}}if(r.alternate!==s)throw Error(l(190))}if(r.tag!==3)throw Error(l(188));return r.stateNode.current===r?e:n}function b(e){var n=e.tag;if(n===5||n===26||n===27||n===6)return e;for(e=e.child;e!==null;){if(n=b(e),n!==null)return n;e=e.sibling}return null}var g=Object.assign,v=Symbol.for("react.element"),L=Symbol.for("react.transitional.element"),w=Symbol.for("react.portal"),N=Symbol.for("react.fragment"),T=Symbol.for("react.strict_mode"),C=Symbol.for("react.profiler"),B=Symbol.for("react.consumer"),D=Symbol.for("react.context"),E=Symbol.for("react.forward_ref"),_=Symbol.for("react.suspense"),P=Symbol.for("react.suspense_list"),S=Symbol.for("react.memo"),X=Symbol.for("react.lazy"),F=Symbol.for("react.activity"),$=Symbol.for("react.memo_cache_sentinel"),H=Symbol.iterator;function te(e){return e===null||typeof e!="object"?null:(e=H&&e[H]||e["@@iterator"],typeof e=="function"?e:null)}var oe=Symbol.for("react.client.reference");function I(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===oe?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case N:return"Fragment";case C:return"Profiler";case T:return"StrictMode";case _:return"Suspense";case P:return"SuspenseList";case F:return"Activity"}if(typeof e=="object")switch(e.$$typeof){case w:return"Portal";case D:return e.displayName||"Context";case B:return(e._context.displayName||"Context")+".Consumer";case E:var n=e.render;return e=e.displayName,e||(e=n.displayName||n.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case S:return n=e.displayName||null,n!==null?n:I(e.type)||"Memo";case X:n=e._payload,e=e._init;try{return I(e(n))}catch{}}return null}var J=Array.isArray,R=a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,Z=i.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,G={pending:!1,data:null,method:null,action:null},K=[],ne=-1;function j(e){return{current:e}}function M(e){0>ne||(e.current=K[ne],K[ne]=null,ne--)}function V(e,n){ne++,K[ne]=e.current,e.current=n}var ee=j(null),xe=j(null),be=j(null),Le=j(null);function pe(e,n){switch(V(be,n),V(xe,e),V(ee,null),n.nodeType){case 9:case 11:e=(e=n.documentElement)&&(e=e.namespaceURI)?zh(e):0;break;default:if(e=n.tagName,n=n.namespaceURI)n=zh(n),e=Uh(n,e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}M(ee),V(ee,e)}function Te(){M(ee),M(xe),M(be)}function Ze(e){e.memoizedState!==null&&V(Le,e);var n=ee.current,r=Uh(n,e.type);n!==r&&(V(xe,e),V(ee,r))}function Me(e){xe.current===e&&(M(ee),M(xe)),Le.current===e&&(M(Le),Zl._currentValue=G)}var Be,Pe;function He(e){if(Be===void 0)try{throw Error()}catch(r){var n=r.stack.trim().match(/\n( *(at )?)/);Be=n&&n[1]||"",Pe=-1<r.stack.indexOf(`
    at`)?" (<anonymous>)":-1<r.stack.indexOf("@")?"@unknown:0:0":""}return`
`+Be+e+Pe}var at=!1;function Xe(e,n){if(!e||at)return"";at=!0;var r=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var s={DetermineComponentFrameRoot:function(){try{if(n){var Ae=function(){throw Error()};if(Object.defineProperty(Ae.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(Ae,[])}catch(ce){var se=ce}Reflect.construct(e,[],Ae)}else{try{Ae.call()}catch(ce){se=ce}e.call(Ae.prototype)}}else{try{throw Error()}catch(ce){se=ce}(Ae=e())&&typeof Ae.catch=="function"&&Ae.catch(function(){})}}catch(ce){if(ce&&se&&typeof ce.stack=="string")return[ce.stack,se.stack]}return[null,null]}};s.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var f=Object.getOwnPropertyDescriptor(s.DetermineComponentFrameRoot,"name");f&&f.configurable&&Object.defineProperty(s.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var p=s.DetermineComponentFrameRoot(),A=p[0],k=p[1];if(A&&k){var Y=A.split(`
`),le=k.split(`
`);for(f=s=0;s<Y.length&&!Y[s].includes("DetermineComponentFrameRoot");)s++;for(;f<le.length&&!le[f].includes("DetermineComponentFrameRoot");)f++;if(s===Y.length||f===le.length)for(s=Y.length-1,f=le.length-1;1<=s&&0<=f&&Y[s]!==le[f];)f--;for(;1<=s&&0<=f;s--,f--)if(Y[s]!==le[f]){if(s!==1||f!==1)do if(s--,f--,0>f||Y[s]!==le[f]){var he=`
`+Y[s].replace(" at new "," at ");return e.displayName&&he.includes("<anonymous>")&&(he=he.replace("<anonymous>",e.displayName)),he}while(1<=s&&0<=f);break}}}finally{at=!1,Error.prepareStackTrace=r}return(r=e?e.displayName||e.name:"")?He(r):""}function Ct(e,n){switch(e.tag){case 26:case 27:case 5:return He(e.type);case 16:return He("Lazy");case 13:return e.child!==n&&n!==null?He("Suspense Fallback"):He("Suspense");case 19:return He("SuspenseList");case 0:case 15:return Xe(e.type,!1);case 11:return Xe(e.type.render,!1);case 1:return Xe(e.type,!0);case 31:return He("Activity");default:return""}}function nn(e){try{var n="",r=null;do n+=Ct(e,r),r=e,e=e.return;while(e);return n}catch(s){return`
Error generating stack: `+s.message+`
`+s.stack}}var Pt=Object.prototype.hasOwnProperty,St=t.unstable_scheduleCallback,we=t.unstable_cancelCallback,Ee=t.unstable_shouldYield,$e=t.unstable_requestPaint,me=t.unstable_now,tt=t.unstable_getCurrentPriorityLevel,Se=t.unstable_ImmediatePriority,nt=t.unstable_UserBlockingPriority,st=t.unstable_NormalPriority,Zt=t.unstable_LowPriority,Dn=t.unstable_IdlePriority,Zn=t.log,Ti=t.unstable_setDisableYieldValue,Bn=null,zt=null;function Qt(e){if(typeof Zn=="function"&&Ti(e),zt&&typeof zt.setStrictMode=="function")try{zt.setStrictMode(Bn,e)}catch{}}var Ut=Math.clz32?Math.clz32:Za,Mi=Math.log,Va=Math.LN2;function Za(e){return e>>>=0,e===0?32:31-(Mi(e)/Va|0)|0}var Cn=256,hn=262144,Gn=4194304;function y(e){var n=e&42;if(n!==0)return n;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function O(e,n,r){var s=e.pendingLanes;if(s===0)return 0;var f=0,p=e.suspendedLanes,A=e.pingedLanes;e=e.warmLanes;var k=s&134217727;return k!==0?(s=k&~p,s!==0?f=y(s):(A&=k,A!==0?f=y(A):r||(r=k&~e,r!==0&&(f=y(r))))):(k=s&~p,k!==0?f=y(k):A!==0?f=y(A):r||(r=s&~e,r!==0&&(f=y(r)))),f===0?0:n!==0&&n!==f&&(n&p)===0&&(p=f&-f,r=n&-n,p>=r||p===32&&(r&4194048)!==0)?n:f}function q(e,n){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&n)===0}function ie(e,n){switch(e){case 1:case 2:case 4:case 8:case 64:return n+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function fe(){var e=Gn;return Gn<<=1,(Gn&62914560)===0&&(Gn=4194304),e}function Ne(e){for(var n=[],r=0;31>r;r++)n.push(e);return n}function Je(e,n){e.pendingLanes|=n,n!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function bt(e,n,r,s,f,p){var A=e.pendingLanes;e.pendingLanes=r,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=r,e.entangledLanes&=r,e.errorRecoveryDisabledLanes&=r,e.shellSuspendCounter=0;var k=e.entanglements,Y=e.expirationTimes,le=e.hiddenUpdates;for(r=A&~r;0<r;){var he=31-Ut(r),Ae=1<<he;k[he]=0,Y[he]=-1;var se=le[he];if(se!==null)for(le[he]=null,he=0;he<se.length;he++){var ce=se[he];ce!==null&&(ce.lane&=-536870913)}r&=~Ae}s!==0&&Et(e,s,0),p!==0&&f===0&&e.tag!==0&&(e.suspendedLanes|=p&~(A&~n))}function Et(e,n,r){e.pendingLanes|=n,e.suspendedLanes&=~n;var s=31-Ut(n);e.entangledLanes|=n,e.entanglements[s]=e.entanglements[s]|1073741824|r&261930}function $t(e,n){var r=e.entangledLanes|=n;for(e=e.entanglements;r;){var s=31-Ut(r),f=1<<s;f&n|e[s]&n&&(e[s]|=n),r&=~f}}function ke(e,n){var r=n&-n;return r=(r&42)!==0?1:Ke(r),(r&(e.suspendedLanes|n))!==0?0:r}function Ke(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function ut(e){return e&=-e,2<e?8<e?(e&134217727)!==0?32:268435456:8:2}function It(){var e=Z.p;return e!==0?e:(e=window.event,e===void 0?32:o1(e.type))}function Q(e,n){var r=Z.p;try{return Z.p=e,n()}finally{Z.p=r}}var De=Math.random().toString(36).slice(2),Ce="__reactFiber$"+De,Re="__reactProps$"+De,dt="__reactContainer$"+De,Ht="__reactEvents$"+De,Ms="__reactListeners$"+De,Fc="__reactHandles$"+De,Es="__reactResources$"+De,Ei="__reactMarker$"+De;function ll(e){delete e[Ce],delete e[Re],delete e[Ht],delete e[Ms],delete e[Fc]}function Ga(e){var n=e[Ce];if(n)return n;for(var r=e.parentNode;r;){if(n=r[dt]||r[Ce]){if(r=n.alternate,n.child!==null||r!==null&&r.child!==null)for(e=Zh(e);e!==null;){if(r=e[Ce])return r;e=Zh(e)}return n}e=r,r=e.parentNode}return null}function Ya(e){if(e=e[Ce]||e[dt]){var n=e.tag;if(n===5||n===6||n===13||n===31||n===26||n===27||n===3)return e}return null}function Xa(e){var n=e.tag;if(n===5||n===26||n===27||n===6)return e.stateNode;throw Error(l(33))}function Fa(e){var n=e[Es];return n||(n=e[Es]={hoistableStyles:new Map,hoistableScripts:new Map}),n}function Gt(e){e[Ei]=!0}var Rs=new Set,ks={};function va(e,n){Ka(e,n),Ka(e+"Capture",n)}function Ka(e,n){for(ks[e]=n,e=0;e<n.length;e++)Rs.add(n[e])}var Kc=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),sl={},Os={};function Wc(e){return Pt.call(Os,e)?!0:Pt.call(sl,e)?!1:Kc.test(e)?Os[e]=!0:(sl[e]=!0,!1)}function or(e,n,r){if(Wc(n))if(r===null)e.removeAttribute(n);else{switch(typeof r){case"undefined":case"function":case"symbol":e.removeAttribute(n);return;case"boolean":var s=n.toLowerCase().slice(0,5);if(s!=="data-"&&s!=="aria-"){e.removeAttribute(n);return}}e.setAttribute(n,""+r)}}function cr(e,n,r){if(r===null)e.removeAttribute(n);else{switch(typeof r){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(n);return}e.setAttribute(n,""+r)}}function Yn(e,n,r,s){if(s===null)e.removeAttribute(r);else{switch(typeof s){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(r);return}e.setAttributeNS(n,r,""+s)}}function xn(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function js(e){var n=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(n==="checkbox"||n==="radio")}function Qc(e,n,r){var s=Object.getOwnPropertyDescriptor(e.constructor.prototype,n);if(!e.hasOwnProperty(n)&&typeof s<"u"&&typeof s.get=="function"&&typeof s.set=="function"){var f=s.get,p=s.set;return Object.defineProperty(e,n,{configurable:!0,get:function(){return f.call(this)},set:function(A){r=""+A,p.call(this,A)}}),Object.defineProperty(e,n,{enumerable:s.enumerable}),{getValue:function(){return r},setValue:function(A){r=""+A},stopTracking:function(){e._valueTracker=null,delete e[n]}}}}function Wa(e){if(!e._valueTracker){var n=js(e)?"checked":"value";e._valueTracker=Qc(e,n,""+e[n])}}function Bs(e){if(!e)return!1;var n=e._valueTracker;if(!n)return!0;var r=n.getValue(),s="";return e&&(s=js(e)?e.checked?"true":"false":e.value),e=s,e!==r?(n.setValue(e),!0):!1}function Ri(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}var eu=/[\n"\\]/g;function gn(e){return e.replace(eu,function(n){return"\\"+n.charCodeAt(0).toString(16)+" "})}function ki(e,n,r,s,f,p,A,k){e.name="",A!=null&&typeof A!="function"&&typeof A!="symbol"&&typeof A!="boolean"?e.type=A:e.removeAttribute("type"),n!=null?A==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+xn(n)):e.value!==""+xn(n)&&(e.value=""+xn(n)):A!=="submit"&&A!=="reset"||e.removeAttribute("value"),n!=null?ol(e,A,xn(n)):r!=null?ol(e,A,xn(r)):s!=null&&e.removeAttribute("value"),f==null&&p!=null&&(e.defaultChecked=!!p),f!=null&&(e.checked=f&&typeof f!="function"&&typeof f!="symbol"),k!=null&&typeof k!="function"&&typeof k!="symbol"&&typeof k!="boolean"?e.name=""+xn(k):e.removeAttribute("name")}function Ps(e,n,r,s,f,p,A,k){if(p!=null&&typeof p!="function"&&typeof p!="symbol"&&typeof p!="boolean"&&(e.type=p),n!=null||r!=null){if(!(p!=="submit"&&p!=="reset"||n!=null)){Wa(e);return}r=r!=null?""+xn(r):"",n=n!=null?""+xn(n):r,k||n===e.value||(e.value=n),e.defaultValue=n}s=s??f,s=typeof s!="function"&&typeof s!="symbol"&&!!s,e.checked=k?e.checked:!!s,e.defaultChecked=!!s,A!=null&&typeof A!="function"&&typeof A!="symbol"&&typeof A!="boolean"&&(e.name=A),Wa(e)}function ol(e,n,r){n==="number"&&Ri(e.ownerDocument)===e||e.defaultValue===""+r||(e.defaultValue=""+r)}function Aa(e,n,r,s){if(e=e.options,n){n={};for(var f=0;f<r.length;f++)n["$"+r[f]]=!0;for(r=0;r<e.length;r++)f=n.hasOwnProperty("$"+e[r].value),e[r].selected!==f&&(e[r].selected=f),f&&s&&(e[r].defaultSelected=!0)}else{for(r=""+xn(r),n=null,f=0;f<e.length;f++){if(e[f].value===r){e[f].selected=!0,s&&(e[f].defaultSelected=!0);return}n!==null||e[f].disabled||(n=e[f])}n!==null&&(n.selected=!0)}}function kf(e,n,r){if(n!=null&&(n=""+xn(n),n!==e.value&&(e.value=n),r==null)){e.defaultValue!==n&&(e.defaultValue=n);return}e.defaultValue=r!=null?""+xn(r):""}function Of(e,n,r,s){if(n==null){if(s!=null){if(r!=null)throw Error(l(92));if(J(s)){if(1<s.length)throw Error(l(93));s=s[0]}r=s}r==null&&(r=""),n=r}r=xn(n),e.defaultValue=r,s=e.textContent,s===r&&s!==""&&s!==null&&(e.value=s),Wa(e)}function ur(e,n){if(n){var r=e.firstChild;if(r&&r===e.lastChild&&r.nodeType===3){r.nodeValue=n;return}}e.textContent=n}var Pb=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function jf(e,n,r){var s=n.indexOf("--")===0;r==null||typeof r=="boolean"||r===""?s?e.setProperty(n,""):n==="float"?e.cssFloat="":e[n]="":s?e.setProperty(n,r):typeof r!="number"||r===0||Pb.has(n)?n==="float"?e.cssFloat=r:e[n]=(""+r).trim():e[n]=r+"px"}function Bf(e,n,r){if(n!=null&&typeof n!="object")throw Error(l(62));if(e=e.style,r!=null){for(var s in r)!r.hasOwnProperty(s)||n!=null&&n.hasOwnProperty(s)||(s.indexOf("--")===0?e.setProperty(s,""):s==="float"?e.cssFloat="":e[s]="");for(var f in n)s=n[f],n.hasOwnProperty(f)&&r[f]!==s&&jf(e,f,s)}else for(var p in n)n.hasOwnProperty(p)&&jf(e,p,n[p])}function tu(e){if(e.indexOf("-")===-1)return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var zb=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),Ub=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function zs(e){return Ub.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}function La(){}var nu=null;function au(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var dr=null,fr=null;function Pf(e){var n=Ya(e);if(n&&(e=n.stateNode)){var r=e[Re]||null;e:switch(e=n.stateNode,n.type){case"input":if(ki(e,r.value,r.defaultValue,r.defaultValue,r.checked,r.defaultChecked,r.type,r.name),n=r.name,r.type==="radio"&&n!=null){for(r=e;r.parentNode;)r=r.parentNode;for(r=r.querySelectorAll('input[name="'+gn(""+n)+'"][type="radio"]'),n=0;n<r.length;n++){var s=r[n];if(s!==e&&s.form===e.form){var f=s[Re]||null;if(!f)throw Error(l(90));ki(s,f.value,f.defaultValue,f.defaultValue,f.checked,f.defaultChecked,f.type,f.name)}}for(n=0;n<r.length;n++)s=r[n],s.form===e.form&&Bs(s)}break e;case"textarea":kf(e,r.value,r.defaultValue);break e;case"select":n=r.value,n!=null&&Aa(e,!!r.multiple,n,!1)}}}var iu=!1;function zf(e,n,r){if(iu)return e(n,r);iu=!0;try{var s=e(n);return s}finally{if(iu=!1,(dr!==null||fr!==null)&&(Co(),dr&&(n=dr,e=fr,fr=dr=null,Pf(n),e)))for(n=0;n<e.length;n++)Pf(e[n])}}function cl(e,n){var r=e.stateNode;if(r===null)return null;var s=r[Re]||null;if(s===null)return null;r=s[n];e:switch(n){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(s=!s.disabled)||(e=e.type,s=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!s;break e;default:e=!1}if(e)return null;if(r&&typeof r!="function")throw Error(l(231,n,typeof r));return r}var wa=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),ru=!1;if(wa)try{var ul={};Object.defineProperty(ul,"passive",{get:function(){ru=!0}}),window.addEventListener("test",ul,ul),window.removeEventListener("test",ul,ul)}catch{ru=!1}var Qa=null,lu=null,Us=null;function Uf(){if(Us)return Us;var e,n=lu,r=n.length,s,f="value"in Qa?Qa.value:Qa.textContent,p=f.length;for(e=0;e<r&&n[e]===f[e];e++);var A=r-e;for(s=1;s<=A&&n[r-s]===f[p-s];s++);return Us=f.slice(e,1<s?1-s:void 0)}function $s(e){var n=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&n===13&&(e=13)):e=n,e===10&&(e=13),32<=e||e===13?e:0}function Is(){return!0}function $f(){return!1}function _n(e){function n(r,s,f,p,A){this._reactName=r,this._targetInst=f,this.type=s,this.nativeEvent=p,this.target=A,this.currentTarget=null;for(var k in e)e.hasOwnProperty(k)&&(r=e[k],this[k]=r?r(p):p[k]);return this.isDefaultPrevented=(p.defaultPrevented!=null?p.defaultPrevented:p.returnValue===!1)?Is:$f,this.isPropagationStopped=$f,this}return g(n.prototype,{preventDefault:function(){this.defaultPrevented=!0;var r=this.nativeEvent;r&&(r.preventDefault?r.preventDefault():typeof r.returnValue!="unknown"&&(r.returnValue=!1),this.isDefaultPrevented=Is)},stopPropagation:function(){var r=this.nativeEvent;r&&(r.stopPropagation?r.stopPropagation():typeof r.cancelBubble!="unknown"&&(r.cancelBubble=!0),this.isPropagationStopped=Is)},persist:function(){},isPersistent:Is}),n}var Oi={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Hs=_n(Oi),dl=g({},Oi,{view:0,detail:0}),$b=_n(dl),su,ou,fl,Js=g({},dl,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:uu,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==fl&&(fl&&e.type==="mousemove"?(su=e.screenX-fl.screenX,ou=e.screenY-fl.screenY):ou=su=0,fl=e),su)},movementY:function(e){return"movementY"in e?e.movementY:ou}}),If=_n(Js),Ib=g({},Js,{dataTransfer:0}),Hb=_n(Ib),Jb=g({},dl,{relatedTarget:0}),cu=_n(Jb),qb=g({},Oi,{animationName:0,elapsedTime:0,pseudoElement:0}),Vb=_n(qb),Zb=g({},Oi,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),Gb=_n(Zb),Yb=g({},Oi,{data:0}),Hf=_n(Yb),Xb={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Fb={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Kb={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Wb(e){var n=this.nativeEvent;return n.getModifierState?n.getModifierState(e):(e=Kb[e])?!!n[e]:!1}function uu(){return Wb}var Qb=g({},dl,{key:function(e){if(e.key){var n=Xb[e.key]||e.key;if(n!=="Unidentified")return n}return e.type==="keypress"?(e=$s(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?Fb[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:uu,charCode:function(e){return e.type==="keypress"?$s(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?$s(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),ey=_n(Qb),ty=g({},Js,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Jf=_n(ty),ny=g({},dl,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:uu}),ay=_n(ny),iy=g({},Oi,{propertyName:0,elapsedTime:0,pseudoElement:0}),ry=_n(iy),ly=g({},Js,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),sy=_n(ly),oy=g({},Oi,{newState:0,oldState:0}),cy=_n(oy),uy=[9,13,27,32],du=wa&&"CompositionEvent"in window,pl=null;wa&&"documentMode"in document&&(pl=document.documentMode);var dy=wa&&"TextEvent"in window&&!pl,qf=wa&&(!du||pl&&8<pl&&11>=pl),Vf=" ",Zf=!1;function Gf(e,n){switch(e){case"keyup":return uy.indexOf(n.keyCode)!==-1;case"keydown":return n.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Yf(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var pr=!1;function fy(e,n){switch(e){case"compositionend":return Yf(n);case"keypress":return n.which!==32?null:(Zf=!0,Vf);case"textInput":return e=n.data,e===Vf&&Zf?null:e;default:return null}}function py(e,n){if(pr)return e==="compositionend"||!du&&Gf(e,n)?(e=Uf(),Us=lu=Qa=null,pr=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(n.ctrlKey||n.altKey||n.metaKey)||n.ctrlKey&&n.altKey){if(n.char&&1<n.char.length)return n.char;if(n.which)return String.fromCharCode(n.which)}return null;case"compositionend":return qf&&n.locale!=="ko"?null:n.data;default:return null}}var my={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Xf(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase();return n==="input"?!!my[e.type]:n==="textarea"}function Ff(e,n,r,s){dr?fr?fr.push(s):fr=[s]:dr=s,n=ko(n,"onChange"),0<n.length&&(r=new Hs("onChange","change",null,r,s),e.push({event:r,listeners:n}))}var ml=null,hl=null;function hy(e){Rh(e,0)}function qs(e){var n=Xa(e);if(Bs(n))return e}function Kf(e,n){if(e==="change")return n}var Wf=!1;if(wa){var fu;if(wa){var pu="oninput"in document;if(!pu){var Qf=document.createElement("div");Qf.setAttribute("oninput","return;"),pu=typeof Qf.oninput=="function"}fu=pu}else fu=!1;Wf=fu&&(!document.documentMode||9<document.documentMode)}function ep(){ml&&(ml.detachEvent("onpropertychange",tp),hl=ml=null)}function tp(e){if(e.propertyName==="value"&&qs(hl)){var n=[];Ff(n,hl,e,au(e)),zf(hy,n)}}function xy(e,n,r){e==="focusin"?(ep(),ml=n,hl=r,ml.attachEvent("onpropertychange",tp)):e==="focusout"&&ep()}function gy(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return qs(hl)}function _y(e,n){if(e==="click")return qs(n)}function by(e,n){if(e==="input"||e==="change")return qs(n)}function yy(e,n){return e===n&&(e!==0||1/e===1/n)||e!==e&&n!==n}var Sn=typeof Object.is=="function"?Object.is:yy;function xl(e,n){if(Sn(e,n))return!0;if(typeof e!="object"||e===null||typeof n!="object"||n===null)return!1;var r=Object.keys(e),s=Object.keys(n);if(r.length!==s.length)return!1;for(s=0;s<r.length;s++){var f=r[s];if(!Pt.call(n,f)||!Sn(e[f],n[f]))return!1}return!0}function np(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function ap(e,n){var r=np(e);e=0;for(var s;r;){if(r.nodeType===3){if(s=e+r.textContent.length,e<=n&&s>=n)return{node:r,offset:n-e};e=s}e:{for(;r;){if(r.nextSibling){r=r.nextSibling;break e}r=r.parentNode}r=void 0}r=np(r)}}function ip(e,n){return e&&n?e===n?!0:e&&e.nodeType===3?!1:n&&n.nodeType===3?ip(e,n.parentNode):"contains"in e?e.contains(n):e.compareDocumentPosition?!!(e.compareDocumentPosition(n)&16):!1:!1}function rp(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var n=Ri(e.document);n instanceof e.HTMLIFrameElement;){try{var r=typeof n.contentWindow.location.href=="string"}catch{r=!1}if(r)e=n.contentWindow;else break;n=Ri(e.document)}return n}function mu(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase();return n&&(n==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||n==="textarea"||e.contentEditable==="true")}var vy=wa&&"documentMode"in document&&11>=document.documentMode,mr=null,hu=null,gl=null,xu=!1;function lp(e,n,r){var s=r.window===r?r.document:r.nodeType===9?r:r.ownerDocument;xu||mr==null||mr!==Ri(s)||(s=mr,"selectionStart"in s&&mu(s)?s={start:s.selectionStart,end:s.selectionEnd}:(s=(s.ownerDocument&&s.ownerDocument.defaultView||window).getSelection(),s={anchorNode:s.anchorNode,anchorOffset:s.anchorOffset,focusNode:s.focusNode,focusOffset:s.focusOffset}),gl&&xl(gl,s)||(gl=s,s=ko(hu,"onSelect"),0<s.length&&(n=new Hs("onSelect","select",null,n,r),e.push({event:n,listeners:s}),n.target=mr)))}function ji(e,n){var r={};return r[e.toLowerCase()]=n.toLowerCase(),r["Webkit"+e]="webkit"+n,r["Moz"+e]="moz"+n,r}var hr={animationend:ji("Animation","AnimationEnd"),animationiteration:ji("Animation","AnimationIteration"),animationstart:ji("Animation","AnimationStart"),transitionrun:ji("Transition","TransitionRun"),transitionstart:ji("Transition","TransitionStart"),transitioncancel:ji("Transition","TransitionCancel"),transitionend:ji("Transition","TransitionEnd")},gu={},sp={};wa&&(sp=document.createElement("div").style,"AnimationEvent"in window||(delete hr.animationend.animation,delete hr.animationiteration.animation,delete hr.animationstart.animation),"TransitionEvent"in window||delete hr.transitionend.transition);function Bi(e){if(gu[e])return gu[e];if(!hr[e])return e;var n=hr[e],r;for(r in n)if(n.hasOwnProperty(r)&&r in sp)return gu[e]=n[r];return e}var op=Bi("animationend"),cp=Bi("animationiteration"),up=Bi("animationstart"),Ay=Bi("transitionrun"),Ly=Bi("transitionstart"),wy=Bi("transitioncancel"),dp=Bi("transitionend"),fp=new Map,_u="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");_u.push("scrollEnd");function Xn(e,n){fp.set(e,n),va(n,[e])}var Vs=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var n=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(n))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},Pn=[],xr=0,bu=0;function Zs(){for(var e=xr,n=bu=xr=0;n<e;){var r=Pn[n];Pn[n++]=null;var s=Pn[n];Pn[n++]=null;var f=Pn[n];Pn[n++]=null;var p=Pn[n];if(Pn[n++]=null,s!==null&&f!==null){var A=s.pending;A===null?f.next=f:(f.next=A.next,A.next=f),s.pending=f}p!==0&&pp(r,f,p)}}function Gs(e,n,r,s){Pn[xr++]=e,Pn[xr++]=n,Pn[xr++]=r,Pn[xr++]=s,bu|=s,e.lanes|=s,e=e.alternate,e!==null&&(e.lanes|=s)}function yu(e,n,r,s){return Gs(e,n,r,s),Ys(e)}function Pi(e,n){return Gs(e,null,null,n),Ys(e)}function pp(e,n,r){e.lanes|=r;var s=e.alternate;s!==null&&(s.lanes|=r);for(var f=!1,p=e.return;p!==null;)p.childLanes|=r,s=p.alternate,s!==null&&(s.childLanes|=r),p.tag===22&&(e=p.stateNode,e===null||e._visibility&1||(f=!0)),e=p,p=p.return;return e.tag===3?(p=e.stateNode,f&&n!==null&&(f=31-Ut(r),e=p.hiddenUpdates,s=e[f],s===null?e[f]=[n]:s.push(n),n.lane=r|536870912),p):null}function Ys(e){if(50<Ul)throw Ul=0,Td=null,Error(l(185));for(var n=e.return;n!==null;)e=n,n=e.return;return e.tag===3?e.stateNode:null}var gr={};function Dy(e,n,r,s){this.tag=e,this.key=r,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=n,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=s,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Nn(e,n,r,s){return new Dy(e,n,r,s)}function vu(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Da(e,n){var r=e.alternate;return r===null?(r=Nn(e.tag,n,e.key,e.mode),r.elementType=e.elementType,r.type=e.type,r.stateNode=e.stateNode,r.alternate=e,e.alternate=r):(r.pendingProps=n,r.type=e.type,r.flags=0,r.subtreeFlags=0,r.deletions=null),r.flags=e.flags&65011712,r.childLanes=e.childLanes,r.lanes=e.lanes,r.child=e.child,r.memoizedProps=e.memoizedProps,r.memoizedState=e.memoizedState,r.updateQueue=e.updateQueue,n=e.dependencies,r.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext},r.sibling=e.sibling,r.index=e.index,r.ref=e.ref,r.refCleanup=e.refCleanup,r}function mp(e,n){e.flags&=65011714;var r=e.alternate;return r===null?(e.childLanes=0,e.lanes=n,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=r.childLanes,e.lanes=r.lanes,e.child=r.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=r.memoizedProps,e.memoizedState=r.memoizedState,e.updateQueue=r.updateQueue,e.type=r.type,n=r.dependencies,e.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext}),e}function Xs(e,n,r,s,f,p){var A=0;if(s=e,typeof e=="function")vu(e)&&(A=1);else if(typeof e=="string")A=Mv(e,r,ee.current)?26:e==="html"||e==="head"||e==="body"?27:5;else e:switch(e){case F:return e=Nn(31,r,n,f),e.elementType=F,e.lanes=p,e;case N:return zi(r.children,f,p,n);case T:A=8,f|=24;break;case C:return e=Nn(12,r,n,f|2),e.elementType=C,e.lanes=p,e;case _:return e=Nn(13,r,n,f),e.elementType=_,e.lanes=p,e;case P:return e=Nn(19,r,n,f),e.elementType=P,e.lanes=p,e;default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case D:A=10;break e;case B:A=9;break e;case E:A=11;break e;case S:A=14;break e;case X:A=16,s=null;break e}A=29,r=Error(l(130,e===null?"null":typeof e,"")),s=null}return n=Nn(A,r,n,f),n.elementType=e,n.type=s,n.lanes=p,n}function zi(e,n,r,s){return e=Nn(7,e,s,n),e.lanes=r,e}function Au(e,n,r){return e=Nn(6,e,null,n),e.lanes=r,e}function hp(e){var n=Nn(18,null,null,0);return n.stateNode=e,n}function Lu(e,n,r){return n=Nn(4,e.children!==null?e.children:[],e.key,n),n.lanes=r,n.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},n}var xp=new WeakMap;function zn(e,n){if(typeof e=="object"&&e!==null){var r=xp.get(e);return r!==void 0?r:(n={value:e,source:n,stack:nn(n)},xp.set(e,n),n)}return{value:e,source:n,stack:nn(n)}}var _r=[],br=0,Fs=null,_l=0,Un=[],$n=0,ei=null,la=1,sa="";function Ca(e,n){_r[br++]=_l,_r[br++]=Fs,Fs=e,_l=n}function gp(e,n,r){Un[$n++]=la,Un[$n++]=sa,Un[$n++]=ei,ei=e;var s=la;e=sa;var f=32-Ut(s)-1;s&=~(1<<f),r+=1;var p=32-Ut(n)+f;if(30<p){var A=f-f%5;p=(s&(1<<A)-1).toString(32),s>>=A,f-=A,la=1<<32-Ut(n)+f|r<<f|s,sa=p+e}else la=1<<p|r<<f|s,sa=e}function wu(e){e.return!==null&&(Ca(e,1),gp(e,1,0))}function Du(e){for(;e===Fs;)Fs=_r[--br],_r[br]=null,_l=_r[--br],_r[br]=null;for(;e===ei;)ei=Un[--$n],Un[$n]=null,sa=Un[--$n],Un[$n]=null,la=Un[--$n],Un[$n]=null}function _p(e,n){Un[$n++]=la,Un[$n++]=sa,Un[$n++]=ei,la=n.id,sa=n.overflow,ei=e}var rn=null,Nt=null,ft=!1,ti=null,In=!1,Cu=Error(l(519));function ni(e){var n=Error(l(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw bl(zn(n,e)),Cu}function bp(e){var n=e.stateNode,r=e.type,s=e.memoizedProps;switch(n[Ce]=e,n[Re]=s,r){case"dialog":rt("cancel",n),rt("close",n);break;case"iframe":case"object":case"embed":rt("load",n);break;case"video":case"audio":for(r=0;r<Il.length;r++)rt(Il[r],n);break;case"source":rt("error",n);break;case"img":case"image":case"link":rt("error",n),rt("load",n);break;case"details":rt("toggle",n);break;case"input":rt("invalid",n),Ps(n,s.value,s.defaultValue,s.checked,s.defaultChecked,s.type,s.name,!0);break;case"select":rt("invalid",n);break;case"textarea":rt("invalid",n),Of(n,s.value,s.defaultValue,s.children)}r=s.children,typeof r!="string"&&typeof r!="number"&&typeof r!="bigint"||n.textContent===""+r||s.suppressHydrationWarning===!0||Bh(n.textContent,r)?(s.popover!=null&&(rt("beforetoggle",n),rt("toggle",n)),s.onScroll!=null&&rt("scroll",n),s.onScrollEnd!=null&&rt("scrollend",n),s.onClick!=null&&(n.onclick=La),n=!0):n=!1,n||ni(e,!0)}function yp(e){for(rn=e.return;rn;)switch(rn.tag){case 5:case 31:case 13:In=!1;return;case 27:case 3:In=!0;return;default:rn=rn.return}}function yr(e){if(e!==rn)return!1;if(!ft)return yp(e),ft=!0,!1;var n=e.tag,r;if((r=n!==3&&n!==27)&&((r=n===5)&&(r=e.type,r=!(r!=="form"&&r!=="button")||qd(e.type,e.memoizedProps)),r=!r),r&&Nt&&ni(e),yp(e),n===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(l(317));Nt=Vh(e)}else if(n===31){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(l(317));Nt=Vh(e)}else n===27?(n=Nt,xi(e.type)?(e=Xd,Xd=null,Nt=e):Nt=n):Nt=rn?Jn(e.stateNode.nextSibling):null;return!0}function Ui(){Nt=rn=null,ft=!1}function Su(){var e=ti;return e!==null&&(An===null?An=e:An.push.apply(An,e),ti=null),e}function bl(e){ti===null?ti=[e]:ti.push(e)}var Nu=j(null),$i=null,Sa=null;function ai(e,n,r){V(Nu,n._currentValue),n._currentValue=r}function Na(e){e._currentValue=Nu.current,M(Nu)}function Tu(e,n,r){for(;e!==null;){var s=e.alternate;if((e.childLanes&n)!==n?(e.childLanes|=n,s!==null&&(s.childLanes|=n)):s!==null&&(s.childLanes&n)!==n&&(s.childLanes|=n),e===r)break;e=e.return}}function Mu(e,n,r,s){var f=e.child;for(f!==null&&(f.return=e);f!==null;){var p=f.dependencies;if(p!==null){var A=f.child;p=p.firstContext;e:for(;p!==null;){var k=p;p=f;for(var Y=0;Y<n.length;Y++)if(k.context===n[Y]){p.lanes|=r,k=p.alternate,k!==null&&(k.lanes|=r),Tu(p.return,r,e),s||(A=null);break e}p=k.next}}else if(f.tag===18){if(A=f.return,A===null)throw Error(l(341));A.lanes|=r,p=A.alternate,p!==null&&(p.lanes|=r),Tu(A,r,e),A=null}else A=f.child;if(A!==null)A.return=f;else for(A=f;A!==null;){if(A===e){A=null;break}if(f=A.sibling,f!==null){f.return=A.return,A=f;break}A=A.return}f=A}}function vr(e,n,r,s){e=null;for(var f=n,p=!1;f!==null;){if(!p){if((f.flags&524288)!==0)p=!0;else if((f.flags&262144)!==0)break}if(f.tag===10){var A=f.alternate;if(A===null)throw Error(l(387));if(A=A.memoizedProps,A!==null){var k=f.type;Sn(f.pendingProps.value,A.value)||(e!==null?e.push(k):e=[k])}}else if(f===Le.current){if(A=f.alternate,A===null)throw Error(l(387));A.memoizedState.memoizedState!==f.memoizedState.memoizedState&&(e!==null?e.push(Zl):e=[Zl])}f=f.return}e!==null&&Mu(n,e,r,s),n.flags|=262144}function Ks(e){for(e=e.firstContext;e!==null;){if(!Sn(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function Ii(e){$i=e,Sa=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function ln(e){return vp($i,e)}function Ws(e,n){return $i===null&&Ii(e),vp(e,n)}function vp(e,n){var r=n._currentValue;if(n={context:n,memoizedValue:r,next:null},Sa===null){if(e===null)throw Error(l(308));Sa=n,e.dependencies={lanes:0,firstContext:n},e.flags|=524288}else Sa=Sa.next=n;return r}var Cy=typeof AbortController<"u"?AbortController:function(){var e=[],n=this.signal={aborted:!1,addEventListener:function(r,s){e.push(s)}};this.abort=function(){n.aborted=!0,e.forEach(function(r){return r()})}},Sy=t.unstable_scheduleCallback,Ny=t.unstable_NormalPriority,Yt={$$typeof:D,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function Eu(){return{controller:new Cy,data:new Map,refCount:0}}function yl(e){e.refCount--,e.refCount===0&&Sy(Ny,function(){e.controller.abort()})}var vl=null,Ru=0,Ar=0,Lr=null;function Ty(e,n){if(vl===null){var r=vl=[];Ru=0,Ar=jd(),Lr={status:"pending",value:void 0,then:function(s){r.push(s)}}}return Ru++,n.then(Ap,Ap),n}function Ap(){if(--Ru===0&&vl!==null){Lr!==null&&(Lr.status="fulfilled");var e=vl;vl=null,Ar=0,Lr=null;for(var n=0;n<e.length;n++)(0,e[n])()}}function My(e,n){var r=[],s={status:"pending",value:null,reason:null,then:function(f){r.push(f)}};return e.then(function(){s.status="fulfilled",s.value=n;for(var f=0;f<r.length;f++)(0,r[f])(n)},function(f){for(s.status="rejected",s.reason=f,f=0;f<r.length;f++)(0,r[f])(void 0)}),s}var Lp=R.S;R.S=function(e,n){lh=me(),typeof n=="object"&&n!==null&&typeof n.then=="function"&&Ty(e,n),Lp!==null&&Lp(e,n)};var Hi=j(null);function ku(){var e=Hi.current;return e!==null?e:Dt.pooledCache}function Qs(e,n){n===null?V(Hi,Hi.current):V(Hi,n.pool)}function wp(){var e=ku();return e===null?null:{parent:Yt._currentValue,pool:e}}var wr=Error(l(460)),Ou=Error(l(474)),eo=Error(l(542)),to={then:function(){}};function Dp(e){return e=e.status,e==="fulfilled"||e==="rejected"}function Cp(e,n,r){switch(r=e[r],r===void 0?e.push(n):r!==n&&(n.then(La,La),n=r),n.status){case"fulfilled":return n.value;case"rejected":throw e=n.reason,Np(e),e;default:if(typeof n.status=="string")n.then(La,La);else{if(e=Dt,e!==null&&100<e.shellSuspendCounter)throw Error(l(482));e=n,e.status="pending",e.then(function(s){if(n.status==="pending"){var f=n;f.status="fulfilled",f.value=s}},function(s){if(n.status==="pending"){var f=n;f.status="rejected",f.reason=s}})}switch(n.status){case"fulfilled":return n.value;case"rejected":throw e=n.reason,Np(e),e}throw qi=n,wr}}function Ji(e){try{var n=e._init;return n(e._payload)}catch(r){throw r!==null&&typeof r=="object"&&typeof r.then=="function"?(qi=r,wr):r}}var qi=null;function Sp(){if(qi===null)throw Error(l(459));var e=qi;return qi=null,e}function Np(e){if(e===wr||e===eo)throw Error(l(483))}var Dr=null,Al=0;function no(e){var n=Al;return Al+=1,Dr===null&&(Dr=[]),Cp(Dr,e,n)}function Ll(e,n){n=n.props.ref,e.ref=n!==void 0?n:null}function ao(e,n){throw n.$$typeof===v?Error(l(525)):(e=Object.prototype.toString.call(n),Error(l(31,e==="[object Object]"?"object with keys {"+Object.keys(n).join(", ")+"}":e)))}function Tp(e){function n(ae,W){if(e){var re=ae.deletions;re===null?(ae.deletions=[W],ae.flags|=16):re.push(W)}}function r(ae,W){if(!e)return null;for(;W!==null;)n(ae,W),W=W.sibling;return null}function s(ae){for(var W=new Map;ae!==null;)ae.key!==null?W.set(ae.key,ae):W.set(ae.index,ae),ae=ae.sibling;return W}function f(ae,W){return ae=Da(ae,W),ae.index=0,ae.sibling=null,ae}function p(ae,W,re){return ae.index=re,e?(re=ae.alternate,re!==null?(re=re.index,re<W?(ae.flags|=67108866,W):re):(ae.flags|=67108866,W)):(ae.flags|=1048576,W)}function A(ae){return e&&ae.alternate===null&&(ae.flags|=67108866),ae}function k(ae,W,re,_e){return W===null||W.tag!==6?(W=Au(re,ae.mode,_e),W.return=ae,W):(W=f(W,re),W.return=ae,W)}function Y(ae,W,re,_e){var Ie=re.type;return Ie===N?he(ae,W,re.props.children,_e,re.key):W!==null&&(W.elementType===Ie||typeof Ie=="object"&&Ie!==null&&Ie.$$typeof===X&&Ji(Ie)===W.type)?(W=f(W,re.props),Ll(W,re),W.return=ae,W):(W=Xs(re.type,re.key,re.props,null,ae.mode,_e),Ll(W,re),W.return=ae,W)}function le(ae,W,re,_e){return W===null||W.tag!==4||W.stateNode.containerInfo!==re.containerInfo||W.stateNode.implementation!==re.implementation?(W=Lu(re,ae.mode,_e),W.return=ae,W):(W=f(W,re.children||[]),W.return=ae,W)}function he(ae,W,re,_e,Ie){return W===null||W.tag!==7?(W=zi(re,ae.mode,_e,Ie),W.return=ae,W):(W=f(W,re),W.return=ae,W)}function Ae(ae,W,re){if(typeof W=="string"&&W!==""||typeof W=="number"||typeof W=="bigint")return W=Au(""+W,ae.mode,re),W.return=ae,W;if(typeof W=="object"&&W!==null){switch(W.$$typeof){case L:return re=Xs(W.type,W.key,W.props,null,ae.mode,re),Ll(re,W),re.return=ae,re;case w:return W=Lu(W,ae.mode,re),W.return=ae,W;case X:return W=Ji(W),Ae(ae,W,re)}if(J(W)||te(W))return W=zi(W,ae.mode,re,null),W.return=ae,W;if(typeof W.then=="function")return Ae(ae,no(W),re);if(W.$$typeof===D)return Ae(ae,Ws(ae,W),re);ao(ae,W)}return null}function se(ae,W,re,_e){var Ie=W!==null?W.key:null;if(typeof re=="string"&&re!==""||typeof re=="number"||typeof re=="bigint")return Ie!==null?null:k(ae,W,""+re,_e);if(typeof re=="object"&&re!==null){switch(re.$$typeof){case L:return re.key===Ie?Y(ae,W,re,_e):null;case w:return re.key===Ie?le(ae,W,re,_e):null;case X:return re=Ji(re),se(ae,W,re,_e)}if(J(re)||te(re))return Ie!==null?null:he(ae,W,re,_e,null);if(typeof re.then=="function")return se(ae,W,no(re),_e);if(re.$$typeof===D)return se(ae,W,Ws(ae,re),_e);ao(ae,re)}return null}function ce(ae,W,re,_e,Ie){if(typeof _e=="string"&&_e!==""||typeof _e=="number"||typeof _e=="bigint")return ae=ae.get(re)||null,k(W,ae,""+_e,Ie);if(typeof _e=="object"&&_e!==null){switch(_e.$$typeof){case L:return ae=ae.get(_e.key===null?re:_e.key)||null,Y(W,ae,_e,Ie);case w:return ae=ae.get(_e.key===null?re:_e.key)||null,le(W,ae,_e,Ie);case X:return _e=Ji(_e),ce(ae,W,re,_e,Ie)}if(J(_e)||te(_e))return ae=ae.get(re)||null,he(W,ae,_e,Ie,null);if(typeof _e.then=="function")return ce(ae,W,re,no(_e),Ie);if(_e.$$typeof===D)return ce(ae,W,re,Ws(W,_e),Ie);ao(W,_e)}return null}function je(ae,W,re,_e){for(var Ie=null,ht=null,ze=W,Qe=W=0,ct=null;ze!==null&&Qe<re.length;Qe++){ze.index>Qe?(ct=ze,ze=null):ct=ze.sibling;var xt=se(ae,ze,re[Qe],_e);if(xt===null){ze===null&&(ze=ct);break}e&&ze&&xt.alternate===null&&n(ae,ze),W=p(xt,W,Qe),ht===null?Ie=xt:ht.sibling=xt,ht=xt,ze=ct}if(Qe===re.length)return r(ae,ze),ft&&Ca(ae,Qe),Ie;if(ze===null){for(;Qe<re.length;Qe++)ze=Ae(ae,re[Qe],_e),ze!==null&&(W=p(ze,W,Qe),ht===null?Ie=ze:ht.sibling=ze,ht=ze);return ft&&Ca(ae,Qe),Ie}for(ze=s(ze);Qe<re.length;Qe++)ct=ce(ze,ae,Qe,re[Qe],_e),ct!==null&&(e&&ct.alternate!==null&&ze.delete(ct.key===null?Qe:ct.key),W=p(ct,W,Qe),ht===null?Ie=ct:ht.sibling=ct,ht=ct);return e&&ze.forEach(function(vi){return n(ae,vi)}),ft&&Ca(ae,Qe),Ie}function qe(ae,W,re,_e){if(re==null)throw Error(l(151));for(var Ie=null,ht=null,ze=W,Qe=W=0,ct=null,xt=re.next();ze!==null&&!xt.done;Qe++,xt=re.next()){ze.index>Qe?(ct=ze,ze=null):ct=ze.sibling;var vi=se(ae,ze,xt.value,_e);if(vi===null){ze===null&&(ze=ct);break}e&&ze&&vi.alternate===null&&n(ae,ze),W=p(vi,W,Qe),ht===null?Ie=vi:ht.sibling=vi,ht=vi,ze=ct}if(xt.done)return r(ae,ze),ft&&Ca(ae,Qe),Ie;if(ze===null){for(;!xt.done;Qe++,xt=re.next())xt=Ae(ae,xt.value,_e),xt!==null&&(W=p(xt,W,Qe),ht===null?Ie=xt:ht.sibling=xt,ht=xt);return ft&&Ca(ae,Qe),Ie}for(ze=s(ze);!xt.done;Qe++,xt=re.next())xt=ce(ze,ae,Qe,xt.value,_e),xt!==null&&(e&&xt.alternate!==null&&ze.delete(xt.key===null?Qe:xt.key),W=p(xt,W,Qe),ht===null?Ie=xt:ht.sibling=xt,ht=xt);return e&&ze.forEach(function(Iv){return n(ae,Iv)}),ft&&Ca(ae,Qe),Ie}function wt(ae,W,re,_e){if(typeof re=="object"&&re!==null&&re.type===N&&re.key===null&&(re=re.props.children),typeof re=="object"&&re!==null){switch(re.$$typeof){case L:e:{for(var Ie=re.key;W!==null;){if(W.key===Ie){if(Ie=re.type,Ie===N){if(W.tag===7){r(ae,W.sibling),_e=f(W,re.props.children),_e.return=ae,ae=_e;break e}}else if(W.elementType===Ie||typeof Ie=="object"&&Ie!==null&&Ie.$$typeof===X&&Ji(Ie)===W.type){r(ae,W.sibling),_e=f(W,re.props),Ll(_e,re),_e.return=ae,ae=_e;break e}r(ae,W);break}else n(ae,W);W=W.sibling}re.type===N?(_e=zi(re.props.children,ae.mode,_e,re.key),_e.return=ae,ae=_e):(_e=Xs(re.type,re.key,re.props,null,ae.mode,_e),Ll(_e,re),_e.return=ae,ae=_e)}return A(ae);case w:e:{for(Ie=re.key;W!==null;){if(W.key===Ie)if(W.tag===4&&W.stateNode.containerInfo===re.containerInfo&&W.stateNode.implementation===re.implementation){r(ae,W.sibling),_e=f(W,re.children||[]),_e.return=ae,ae=_e;break e}else{r(ae,W);break}else n(ae,W);W=W.sibling}_e=Lu(re,ae.mode,_e),_e.return=ae,ae=_e}return A(ae);case X:return re=Ji(re),wt(ae,W,re,_e)}if(J(re))return je(ae,W,re,_e);if(te(re)){if(Ie=te(re),typeof Ie!="function")throw Error(l(150));return re=Ie.call(re),qe(ae,W,re,_e)}if(typeof re.then=="function")return wt(ae,W,no(re),_e);if(re.$$typeof===D)return wt(ae,W,Ws(ae,re),_e);ao(ae,re)}return typeof re=="string"&&re!==""||typeof re=="number"||typeof re=="bigint"?(re=""+re,W!==null&&W.tag===6?(r(ae,W.sibling),_e=f(W,re),_e.return=ae,ae=_e):(r(ae,W),_e=Au(re,ae.mode,_e),_e.return=ae,ae=_e),A(ae)):r(ae,W)}return function(ae,W,re,_e){try{Al=0;var Ie=wt(ae,W,re,_e);return Dr=null,Ie}catch(ze){if(ze===wr||ze===eo)throw ze;var ht=Nn(29,ze,null,ae.mode);return ht.lanes=_e,ht.return=ae,ht}finally{}}}var Vi=Tp(!0),Mp=Tp(!1),ii=!1;function ju(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function Bu(e,n){e=e.updateQueue,n.updateQueue===e&&(n.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function ri(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function li(e,n,r){var s=e.updateQueue;if(s===null)return null;if(s=s.shared,(gt&2)!==0){var f=s.pending;return f===null?n.next=n:(n.next=f.next,f.next=n),s.pending=n,n=Ys(e),pp(e,null,r),n}return Gs(e,s,n,r),Ys(e)}function wl(e,n,r){if(n=n.updateQueue,n!==null&&(n=n.shared,(r&4194048)!==0)){var s=n.lanes;s&=e.pendingLanes,r|=s,n.lanes=r,$t(e,r)}}function Pu(e,n){var r=e.updateQueue,s=e.alternate;if(s!==null&&(s=s.updateQueue,r===s)){var f=null,p=null;if(r=r.firstBaseUpdate,r!==null){do{var A={lane:r.lane,tag:r.tag,payload:r.payload,callback:null,next:null};p===null?f=p=A:p=p.next=A,r=r.next}while(r!==null);p===null?f=p=n:p=p.next=n}else f=p=n;r={baseState:s.baseState,firstBaseUpdate:f,lastBaseUpdate:p,shared:s.shared,callbacks:s.callbacks},e.updateQueue=r;return}e=r.lastBaseUpdate,e===null?r.firstBaseUpdate=n:e.next=n,r.lastBaseUpdate=n}var zu=!1;function Dl(){if(zu){var e=Lr;if(e!==null)throw e}}function Cl(e,n,r,s){zu=!1;var f=e.updateQueue;ii=!1;var p=f.firstBaseUpdate,A=f.lastBaseUpdate,k=f.shared.pending;if(k!==null){f.shared.pending=null;var Y=k,le=Y.next;Y.next=null,A===null?p=le:A.next=le,A=Y;var he=e.alternate;he!==null&&(he=he.updateQueue,k=he.lastBaseUpdate,k!==A&&(k===null?he.firstBaseUpdate=le:k.next=le,he.lastBaseUpdate=Y))}if(p!==null){var Ae=f.baseState;A=0,he=le=Y=null,k=p;do{var se=k.lane&-536870913,ce=se!==k.lane;if(ce?(ot&se)===se:(s&se)===se){se!==0&&se===Ar&&(zu=!0),he!==null&&(he=he.next={lane:0,tag:k.tag,payload:k.payload,callback:null,next:null});e:{var je=e,qe=k;se=n;var wt=r;switch(qe.tag){case 1:if(je=qe.payload,typeof je=="function"){Ae=je.call(wt,Ae,se);break e}Ae=je;break e;case 3:je.flags=je.flags&-65537|128;case 0:if(je=qe.payload,se=typeof je=="function"?je.call(wt,Ae,se):je,se==null)break e;Ae=g({},Ae,se);break e;case 2:ii=!0}}se=k.callback,se!==null&&(e.flags|=64,ce&&(e.flags|=8192),ce=f.callbacks,ce===null?f.callbacks=[se]:ce.push(se))}else ce={lane:se,tag:k.tag,payload:k.payload,callback:k.callback,next:null},he===null?(le=he=ce,Y=Ae):he=he.next=ce,A|=se;if(k=k.next,k===null){if(k=f.shared.pending,k===null)break;ce=k,k=ce.next,ce.next=null,f.lastBaseUpdate=ce,f.shared.pending=null}}while(!0);he===null&&(Y=Ae),f.baseState=Y,f.firstBaseUpdate=le,f.lastBaseUpdate=he,p===null&&(f.shared.lanes=0),di|=A,e.lanes=A,e.memoizedState=Ae}}function Ep(e,n){if(typeof e!="function")throw Error(l(191,e));e.call(n)}function Rp(e,n){var r=e.callbacks;if(r!==null)for(e.callbacks=null,e=0;e<r.length;e++)Ep(r[e],n)}var Cr=j(null),io=j(0);function kp(e,n){e=Pa,V(io,e),V(Cr,n),Pa=e|n.baseLanes}function Uu(){V(io,Pa),V(Cr,Cr.current)}function $u(){Pa=io.current,M(Cr),M(io)}var Tn=j(null),Hn=null;function si(e){var n=e.alternate;V(Jt,Jt.current&1),V(Tn,e),Hn===null&&(n===null||Cr.current!==null||n.memoizedState!==null)&&(Hn=e)}function Iu(e){V(Jt,Jt.current),V(Tn,e),Hn===null&&(Hn=e)}function Op(e){e.tag===22?(V(Jt,Jt.current),V(Tn,e),Hn===null&&(Hn=e)):oi()}function oi(){V(Jt,Jt.current),V(Tn,Tn.current)}function Mn(e){M(Tn),Hn===e&&(Hn=null),M(Jt)}var Jt=j(0);function ro(e){for(var n=e;n!==null;){if(n.tag===13){var r=n.memoizedState;if(r!==null&&(r=r.dehydrated,r===null||Gd(r)||Yd(r)))return n}else if(n.tag===19&&(n.memoizedProps.revealOrder==="forwards"||n.memoizedProps.revealOrder==="backwards"||n.memoizedProps.revealOrder==="unstable_legacy-backwards"||n.memoizedProps.revealOrder==="together")){if((n.flags&128)!==0)return n}else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return null;n=n.return}n.sibling.return=n.return,n=n.sibling}return null}var Ta=0,We=null,At=null,Xt=null,lo=!1,Sr=!1,Zi=!1,so=0,Sl=0,Nr=null,Ey=0;function jt(){throw Error(l(321))}function Hu(e,n){if(n===null)return!1;for(var r=0;r<n.length&&r<e.length;r++)if(!Sn(e[r],n[r]))return!1;return!0}function Ju(e,n,r,s,f,p){return Ta=p,We=n,n.memoizedState=null,n.updateQueue=null,n.lanes=0,R.H=e===null||e.memoizedState===null?gm:id,Zi=!1,p=r(s,f),Zi=!1,Sr&&(p=Bp(n,r,s,f)),jp(e),p}function jp(e){R.H=Ml;var n=At!==null&&At.next!==null;if(Ta=0,Xt=At=We=null,lo=!1,Sl=0,Nr=null,n)throw Error(l(300));e===null||Ft||(e=e.dependencies,e!==null&&Ks(e)&&(Ft=!0))}function Bp(e,n,r,s){We=e;var f=0;do{if(Sr&&(Nr=null),Sl=0,Sr=!1,25<=f)throw Error(l(301));if(f+=1,Xt=At=null,e.updateQueue!=null){var p=e.updateQueue;p.lastEffect=null,p.events=null,p.stores=null,p.memoCache!=null&&(p.memoCache.index=0)}R.H=_m,p=n(r,s)}while(Sr);return p}function Ry(){var e=R.H,n=e.useState()[0];return n=typeof n.then=="function"?Nl(n):n,e=e.useState()[0],(At!==null?At.memoizedState:null)!==e&&(We.flags|=1024),n}function qu(){var e=so!==0;return so=0,e}function Vu(e,n,r){n.updateQueue=e.updateQueue,n.flags&=-2053,e.lanes&=~r}function Zu(e){if(lo){for(e=e.memoizedState;e!==null;){var n=e.queue;n!==null&&(n.pending=null),e=e.next}lo=!1}Ta=0,Xt=At=We=null,Sr=!1,Sl=so=0,Nr=null}function fn(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Xt===null?We.memoizedState=Xt=e:Xt=Xt.next=e,Xt}function qt(){if(At===null){var e=We.alternate;e=e!==null?e.memoizedState:null}else e=At.next;var n=Xt===null?We.memoizedState:Xt.next;if(n!==null)Xt=n,At=e;else{if(e===null)throw We.alternate===null?Error(l(467)):Error(l(310));At=e,e={memoizedState:At.memoizedState,baseState:At.baseState,baseQueue:At.baseQueue,queue:At.queue,next:null},Xt===null?We.memoizedState=Xt=e:Xt=Xt.next=e}return Xt}function oo(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function Nl(e){var n=Sl;return Sl+=1,Nr===null&&(Nr=[]),e=Cp(Nr,e,n),n=We,(Xt===null?n.memoizedState:Xt.next)===null&&(n=n.alternate,R.H=n===null||n.memoizedState===null?gm:id),e}function co(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return Nl(e);if(e.$$typeof===D)return ln(e)}throw Error(l(438,String(e)))}function Gu(e){var n=null,r=We.updateQueue;if(r!==null&&(n=r.memoCache),n==null){var s=We.alternate;s!==null&&(s=s.updateQueue,s!==null&&(s=s.memoCache,s!=null&&(n={data:s.data.map(function(f){return f.slice()}),index:0})))}if(n==null&&(n={data:[],index:0}),r===null&&(r=oo(),We.updateQueue=r),r.memoCache=n,r=n.data[n.index],r===void 0)for(r=n.data[n.index]=Array(e),s=0;s<e;s++)r[s]=$;return n.index++,r}function Ma(e,n){return typeof n=="function"?n(e):n}function uo(e){var n=qt();return Yu(n,At,e)}function Yu(e,n,r){var s=e.queue;if(s===null)throw Error(l(311));s.lastRenderedReducer=r;var f=e.baseQueue,p=s.pending;if(p!==null){if(f!==null){var A=f.next;f.next=p.next,p.next=A}n.baseQueue=f=p,s.pending=null}if(p=e.baseState,f===null)e.memoizedState=p;else{n=f.next;var k=A=null,Y=null,le=n,he=!1;do{var Ae=le.lane&-536870913;if(Ae!==le.lane?(ot&Ae)===Ae:(Ta&Ae)===Ae){var se=le.revertLane;if(se===0)Y!==null&&(Y=Y.next={lane:0,revertLane:0,gesture:null,action:le.action,hasEagerState:le.hasEagerState,eagerState:le.eagerState,next:null}),Ae===Ar&&(he=!0);else if((Ta&se)===se){le=le.next,se===Ar&&(he=!0);continue}else Ae={lane:0,revertLane:le.revertLane,gesture:null,action:le.action,hasEagerState:le.hasEagerState,eagerState:le.eagerState,next:null},Y===null?(k=Y=Ae,A=p):Y=Y.next=Ae,We.lanes|=se,di|=se;Ae=le.action,Zi&&r(p,Ae),p=le.hasEagerState?le.eagerState:r(p,Ae)}else se={lane:Ae,revertLane:le.revertLane,gesture:le.gesture,action:le.action,hasEagerState:le.hasEagerState,eagerState:le.eagerState,next:null},Y===null?(k=Y=se,A=p):Y=Y.next=se,We.lanes|=Ae,di|=Ae;le=le.next}while(le!==null&&le!==n);if(Y===null?A=p:Y.next=k,!Sn(p,e.memoizedState)&&(Ft=!0,he&&(r=Lr,r!==null)))throw r;e.memoizedState=p,e.baseState=A,e.baseQueue=Y,s.lastRenderedState=p}return f===null&&(s.lanes=0),[e.memoizedState,s.dispatch]}function Xu(e){var n=qt(),r=n.queue;if(r===null)throw Error(l(311));r.lastRenderedReducer=e;var s=r.dispatch,f=r.pending,p=n.memoizedState;if(f!==null){r.pending=null;var A=f=f.next;do p=e(p,A.action),A=A.next;while(A!==f);Sn(p,n.memoizedState)||(Ft=!0),n.memoizedState=p,n.baseQueue===null&&(n.baseState=p),r.lastRenderedState=p}return[p,s]}function Pp(e,n,r){var s=We,f=qt(),p=ft;if(p){if(r===void 0)throw Error(l(407));r=r()}else r=n();var A=!Sn((At||f).memoizedState,r);if(A&&(f.memoizedState=r,Ft=!0),f=f.queue,Wu($p.bind(null,s,f,e),[e]),f.getSnapshot!==n||A||Xt!==null&&Xt.memoizedState.tag&1){if(s.flags|=2048,Tr(9,{destroy:void 0},Up.bind(null,s,f,r,n),null),Dt===null)throw Error(l(349));p||(Ta&127)!==0||zp(s,n,r)}return r}function zp(e,n,r){e.flags|=16384,e={getSnapshot:n,value:r},n=We.updateQueue,n===null?(n=oo(),We.updateQueue=n,n.stores=[e]):(r=n.stores,r===null?n.stores=[e]:r.push(e))}function Up(e,n,r,s){n.value=r,n.getSnapshot=s,Ip(n)&&Hp(e)}function $p(e,n,r){return r(function(){Ip(n)&&Hp(e)})}function Ip(e){var n=e.getSnapshot;e=e.value;try{var r=n();return!Sn(e,r)}catch{return!0}}function Hp(e){var n=Pi(e,2);n!==null&&Ln(n,e,2)}function Fu(e){var n=fn();if(typeof e=="function"){var r=e;if(e=r(),Zi){Qt(!0);try{r()}finally{Qt(!1)}}}return n.memoizedState=n.baseState=e,n.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ma,lastRenderedState:e},n}function Jp(e,n,r,s){return e.baseState=r,Yu(e,At,typeof s=="function"?s:Ma)}function ky(e,n,r,s,f){if(mo(e))throw Error(l(485));if(e=n.action,e!==null){var p={payload:f,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(A){p.listeners.push(A)}};R.T!==null?r(!0):p.isTransition=!1,s(p),r=n.pending,r===null?(p.next=n.pending=p,qp(n,p)):(p.next=r.next,n.pending=r.next=p)}}function qp(e,n){var r=n.action,s=n.payload,f=e.state;if(n.isTransition){var p=R.T,A={};R.T=A;try{var k=r(f,s),Y=R.S;Y!==null&&Y(A,k),Vp(e,n,k)}catch(le){Ku(e,n,le)}finally{p!==null&&A.types!==null&&(p.types=A.types),R.T=p}}else try{p=r(f,s),Vp(e,n,p)}catch(le){Ku(e,n,le)}}function Vp(e,n,r){r!==null&&typeof r=="object"&&typeof r.then=="function"?r.then(function(s){Zp(e,n,s)},function(s){return Ku(e,n,s)}):Zp(e,n,r)}function Zp(e,n,r){n.status="fulfilled",n.value=r,Gp(n),e.state=r,n=e.pending,n!==null&&(r=n.next,r===n?e.pending=null:(r=r.next,n.next=r,qp(e,r)))}function Ku(e,n,r){var s=e.pending;if(e.pending=null,s!==null){s=s.next;do n.status="rejected",n.reason=r,Gp(n),n=n.next;while(n!==s)}e.action=null}function Gp(e){e=e.listeners;for(var n=0;n<e.length;n++)(0,e[n])()}function Yp(e,n){return n}function Xp(e,n){if(ft){var r=Dt.formState;if(r!==null){e:{var s=We;if(ft){if(Nt){t:{for(var f=Nt,p=In;f.nodeType!==8;){if(!p){f=null;break t}if(f=Jn(f.nextSibling),f===null){f=null;break t}}p=f.data,f=p==="F!"||p==="F"?f:null}if(f){Nt=Jn(f.nextSibling),s=f.data==="F!";break e}}ni(s)}s=!1}s&&(n=r[0])}}return r=fn(),r.memoizedState=r.baseState=n,s={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Yp,lastRenderedState:n},r.queue=s,r=mm.bind(null,We,s),s.dispatch=r,s=Fu(!1),p=ad.bind(null,We,!1,s.queue),s=fn(),f={state:n,dispatch:null,action:e,pending:null},s.queue=f,r=ky.bind(null,We,f,p,r),f.dispatch=r,s.memoizedState=e,[n,r,!1]}function Fp(e){var n=qt();return Kp(n,At,e)}function Kp(e,n,r){if(n=Yu(e,n,Yp)[0],e=uo(Ma)[0],typeof n=="object"&&n!==null&&typeof n.then=="function")try{var s=Nl(n)}catch(A){throw A===wr?eo:A}else s=n;n=qt();var f=n.queue,p=f.dispatch;return r!==n.memoizedState&&(We.flags|=2048,Tr(9,{destroy:void 0},Oy.bind(null,f,r),null)),[s,p,e]}function Oy(e,n){e.action=n}function Wp(e){var n=qt(),r=At;if(r!==null)return Kp(n,r,e);qt(),n=n.memoizedState,r=qt();var s=r.queue.dispatch;return r.memoizedState=e,[n,s,!1]}function Tr(e,n,r,s){return e={tag:e,create:r,deps:s,inst:n,next:null},n=We.updateQueue,n===null&&(n=oo(),We.updateQueue=n),r=n.lastEffect,r===null?n.lastEffect=e.next=e:(s=r.next,r.next=e,e.next=s,n.lastEffect=e),e}function Qp(){return qt().memoizedState}function fo(e,n,r,s){var f=fn();We.flags|=e,f.memoizedState=Tr(1|n,{destroy:void 0},r,s===void 0?null:s)}function po(e,n,r,s){var f=qt();s=s===void 0?null:s;var p=f.memoizedState.inst;At!==null&&s!==null&&Hu(s,At.memoizedState.deps)?f.memoizedState=Tr(n,p,r,s):(We.flags|=e,f.memoizedState=Tr(1|n,p,r,s))}function em(e,n){fo(8390656,8,e,n)}function Wu(e,n){po(2048,8,e,n)}function jy(e){We.flags|=4;var n=We.updateQueue;if(n===null)n=oo(),We.updateQueue=n,n.events=[e];else{var r=n.events;r===null?n.events=[e]:r.push(e)}}function tm(e){var n=qt().memoizedState;return jy({ref:n,nextImpl:e}),function(){if((gt&2)!==0)throw Error(l(440));return n.impl.apply(void 0,arguments)}}function nm(e,n){return po(4,2,e,n)}function am(e,n){return po(4,4,e,n)}function im(e,n){if(typeof n=="function"){e=e();var r=n(e);return function(){typeof r=="function"?r():n(null)}}if(n!=null)return e=e(),n.current=e,function(){n.current=null}}function rm(e,n,r){r=r!=null?r.concat([e]):null,po(4,4,im.bind(null,n,e),r)}function Qu(){}function lm(e,n){var r=qt();n=n===void 0?null:n;var s=r.memoizedState;return n!==null&&Hu(n,s[1])?s[0]:(r.memoizedState=[e,n],e)}function sm(e,n){var r=qt();n=n===void 0?null:n;var s=r.memoizedState;if(n!==null&&Hu(n,s[1]))return s[0];if(s=e(),Zi){Qt(!0);try{e()}finally{Qt(!1)}}return r.memoizedState=[s,n],s}function ed(e,n,r){return r===void 0||(Ta&1073741824)!==0&&(ot&261930)===0?e.memoizedState=n:(e.memoizedState=r,e=oh(),We.lanes|=e,di|=e,r)}function om(e,n,r,s){return Sn(r,n)?r:Cr.current!==null?(e=ed(e,r,s),Sn(e,n)||(Ft=!0),e):(Ta&42)===0||(Ta&1073741824)!==0&&(ot&261930)===0?(Ft=!0,e.memoizedState=r):(e=oh(),We.lanes|=e,di|=e,n)}function cm(e,n,r,s,f){var p=Z.p;Z.p=p!==0&&8>p?p:8;var A=R.T,k={};R.T=k,ad(e,!1,n,r);try{var Y=f(),le=R.S;if(le!==null&&le(k,Y),Y!==null&&typeof Y=="object"&&typeof Y.then=="function"){var he=My(Y,s);Tl(e,n,he,kn(e))}else Tl(e,n,s,kn(e))}catch(Ae){Tl(e,n,{then:function(){},status:"rejected",reason:Ae},kn())}finally{Z.p=p,A!==null&&k.types!==null&&(A.types=k.types),R.T=A}}function By(){}function td(e,n,r,s){if(e.tag!==5)throw Error(l(476));var f=um(e).queue;cm(e,f,n,G,r===null?By:function(){return dm(e),r(s)})}function um(e){var n=e.memoizedState;if(n!==null)return n;n={memoizedState:G,baseState:G,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ma,lastRenderedState:G},next:null};var r={};return n.next={memoizedState:r,baseState:r,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ma,lastRenderedState:r},next:null},e.memoizedState=n,e=e.alternate,e!==null&&(e.memoizedState=n),n}function dm(e){var n=um(e);n.next===null&&(n=e.alternate.memoizedState),Tl(e,n.next.queue,{},kn())}function nd(){return ln(Zl)}function fm(){return qt().memoizedState}function pm(){return qt().memoizedState}function Py(e){for(var n=e.return;n!==null;){switch(n.tag){case 24:case 3:var r=kn();e=ri(r);var s=li(n,e,r);s!==null&&(Ln(s,n,r),wl(s,n,r)),n={cache:Eu()},e.payload=n;return}n=n.return}}function zy(e,n,r){var s=kn();r={lane:s,revertLane:0,gesture:null,action:r,hasEagerState:!1,eagerState:null,next:null},mo(e)?hm(n,r):(r=yu(e,n,r,s),r!==null&&(Ln(r,e,s),xm(r,n,s)))}function mm(e,n,r){var s=kn();Tl(e,n,r,s)}function Tl(e,n,r,s){var f={lane:s,revertLane:0,gesture:null,action:r,hasEagerState:!1,eagerState:null,next:null};if(mo(e))hm(n,f);else{var p=e.alternate;if(e.lanes===0&&(p===null||p.lanes===0)&&(p=n.lastRenderedReducer,p!==null))try{var A=n.lastRenderedState,k=p(A,r);if(f.hasEagerState=!0,f.eagerState=k,Sn(k,A))return Gs(e,n,f,0),Dt===null&&Zs(),!1}catch{}finally{}if(r=yu(e,n,f,s),r!==null)return Ln(r,e,s),xm(r,n,s),!0}return!1}function ad(e,n,r,s){if(s={lane:2,revertLane:jd(),gesture:null,action:s,hasEagerState:!1,eagerState:null,next:null},mo(e)){if(n)throw Error(l(479))}else n=yu(e,r,s,2),n!==null&&Ln(n,e,2)}function mo(e){var n=e.alternate;return e===We||n!==null&&n===We}function hm(e,n){Sr=lo=!0;var r=e.pending;r===null?n.next=n:(n.next=r.next,r.next=n),e.pending=n}function xm(e,n,r){if((r&4194048)!==0){var s=n.lanes;s&=e.pendingLanes,r|=s,n.lanes=r,$t(e,r)}}var Ml={readContext:ln,use:co,useCallback:jt,useContext:jt,useEffect:jt,useImperativeHandle:jt,useLayoutEffect:jt,useInsertionEffect:jt,useMemo:jt,useReducer:jt,useRef:jt,useState:jt,useDebugValue:jt,useDeferredValue:jt,useTransition:jt,useSyncExternalStore:jt,useId:jt,useHostTransitionStatus:jt,useFormState:jt,useActionState:jt,useOptimistic:jt,useMemoCache:jt,useCacheRefresh:jt};Ml.useEffectEvent=jt;var gm={readContext:ln,use:co,useCallback:function(e,n){return fn().memoizedState=[e,n===void 0?null:n],e},useContext:ln,useEffect:em,useImperativeHandle:function(e,n,r){r=r!=null?r.concat([e]):null,fo(4194308,4,im.bind(null,n,e),r)},useLayoutEffect:function(e,n){return fo(4194308,4,e,n)},useInsertionEffect:function(e,n){fo(4,2,e,n)},useMemo:function(e,n){var r=fn();n=n===void 0?null:n;var s=e();if(Zi){Qt(!0);try{e()}finally{Qt(!1)}}return r.memoizedState=[s,n],s},useReducer:function(e,n,r){var s=fn();if(r!==void 0){var f=r(n);if(Zi){Qt(!0);try{r(n)}finally{Qt(!1)}}}else f=n;return s.memoizedState=s.baseState=f,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:f},s.queue=e,e=e.dispatch=zy.bind(null,We,e),[s.memoizedState,e]},useRef:function(e){var n=fn();return e={current:e},n.memoizedState=e},useState:function(e){e=Fu(e);var n=e.queue,r=mm.bind(null,We,n);return n.dispatch=r,[e.memoizedState,r]},useDebugValue:Qu,useDeferredValue:function(e,n){var r=fn();return ed(r,e,n)},useTransition:function(){var e=Fu(!1);return e=cm.bind(null,We,e.queue,!0,!1),fn().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,n,r){var s=We,f=fn();if(ft){if(r===void 0)throw Error(l(407));r=r()}else{if(r=n(),Dt===null)throw Error(l(349));(ot&127)!==0||zp(s,n,r)}f.memoizedState=r;var p={value:r,getSnapshot:n};return f.queue=p,em($p.bind(null,s,p,e),[e]),s.flags|=2048,Tr(9,{destroy:void 0},Up.bind(null,s,p,r,n),null),r},useId:function(){var e=fn(),n=Dt.identifierPrefix;if(ft){var r=sa,s=la;r=(s&~(1<<32-Ut(s)-1)).toString(32)+r,n="_"+n+"R_"+r,r=so++,0<r&&(n+="H"+r.toString(32)),n+="_"}else r=Ey++,n="_"+n+"r_"+r.toString(32)+"_";return e.memoizedState=n},useHostTransitionStatus:nd,useFormState:Xp,useActionState:Xp,useOptimistic:function(e){var n=fn();n.memoizedState=n.baseState=e;var r={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return n.queue=r,n=ad.bind(null,We,!0,r),r.dispatch=n,[e,n]},useMemoCache:Gu,useCacheRefresh:function(){return fn().memoizedState=Py.bind(null,We)},useEffectEvent:function(e){var n=fn(),r={impl:e};return n.memoizedState=r,function(){if((gt&2)!==0)throw Error(l(440));return r.impl.apply(void 0,arguments)}}},id={readContext:ln,use:co,useCallback:lm,useContext:ln,useEffect:Wu,useImperativeHandle:rm,useInsertionEffect:nm,useLayoutEffect:am,useMemo:sm,useReducer:uo,useRef:Qp,useState:function(){return uo(Ma)},useDebugValue:Qu,useDeferredValue:function(e,n){var r=qt();return om(r,At.memoizedState,e,n)},useTransition:function(){var e=uo(Ma)[0],n=qt().memoizedState;return[typeof e=="boolean"?e:Nl(e),n]},useSyncExternalStore:Pp,useId:fm,useHostTransitionStatus:nd,useFormState:Fp,useActionState:Fp,useOptimistic:function(e,n){var r=qt();return Jp(r,At,e,n)},useMemoCache:Gu,useCacheRefresh:pm};id.useEffectEvent=tm;var _m={readContext:ln,use:co,useCallback:lm,useContext:ln,useEffect:Wu,useImperativeHandle:rm,useInsertionEffect:nm,useLayoutEffect:am,useMemo:sm,useReducer:Xu,useRef:Qp,useState:function(){return Xu(Ma)},useDebugValue:Qu,useDeferredValue:function(e,n){var r=qt();return At===null?ed(r,e,n):om(r,At.memoizedState,e,n)},useTransition:function(){var e=Xu(Ma)[0],n=qt().memoizedState;return[typeof e=="boolean"?e:Nl(e),n]},useSyncExternalStore:Pp,useId:fm,useHostTransitionStatus:nd,useFormState:Wp,useActionState:Wp,useOptimistic:function(e,n){var r=qt();return At!==null?Jp(r,At,e,n):(r.baseState=e,[e,r.queue.dispatch])},useMemoCache:Gu,useCacheRefresh:pm};_m.useEffectEvent=tm;function rd(e,n,r,s){n=e.memoizedState,r=r(s,n),r=r==null?n:g({},n,r),e.memoizedState=r,e.lanes===0&&(e.updateQueue.baseState=r)}var ld={enqueueSetState:function(e,n,r){e=e._reactInternals;var s=kn(),f=ri(s);f.payload=n,r!=null&&(f.callback=r),n=li(e,f,s),n!==null&&(Ln(n,e,s),wl(n,e,s))},enqueueReplaceState:function(e,n,r){e=e._reactInternals;var s=kn(),f=ri(s);f.tag=1,f.payload=n,r!=null&&(f.callback=r),n=li(e,f,s),n!==null&&(Ln(n,e,s),wl(n,e,s))},enqueueForceUpdate:function(e,n){e=e._reactInternals;var r=kn(),s=ri(r);s.tag=2,n!=null&&(s.callback=n),n=li(e,s,r),n!==null&&(Ln(n,e,r),wl(n,e,r))}};function bm(e,n,r,s,f,p,A){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(s,p,A):n.prototype&&n.prototype.isPureReactComponent?!xl(r,s)||!xl(f,p):!0}function ym(e,n,r,s){e=n.state,typeof n.componentWillReceiveProps=="function"&&n.componentWillReceiveProps(r,s),typeof n.UNSAFE_componentWillReceiveProps=="function"&&n.UNSAFE_componentWillReceiveProps(r,s),n.state!==e&&ld.enqueueReplaceState(n,n.state,null)}function Gi(e,n){var r=n;if("ref"in n){r={};for(var s in n)s!=="ref"&&(r[s]=n[s])}if(e=e.defaultProps){r===n&&(r=g({},r));for(var f in e)r[f]===void 0&&(r[f]=e[f])}return r}function vm(e){Vs(e)}function Am(e){console.error(e)}function Lm(e){Vs(e)}function ho(e,n){try{var r=e.onUncaughtError;r(n.value,{componentStack:n.stack})}catch(s){setTimeout(function(){throw s})}}function wm(e,n,r){try{var s=e.onCaughtError;s(r.value,{componentStack:r.stack,errorBoundary:n.tag===1?n.stateNode:null})}catch(f){setTimeout(function(){throw f})}}function sd(e,n,r){return r=ri(r),r.tag=3,r.payload={element:null},r.callback=function(){ho(e,n)},r}function Dm(e){return e=ri(e),e.tag=3,e}function Cm(e,n,r,s){var f=r.type.getDerivedStateFromError;if(typeof f=="function"){var p=s.value;e.payload=function(){return f(p)},e.callback=function(){wm(n,r,s)}}var A=r.stateNode;A!==null&&typeof A.componentDidCatch=="function"&&(e.callback=function(){wm(n,r,s),typeof f!="function"&&(fi===null?fi=new Set([this]):fi.add(this));var k=s.stack;this.componentDidCatch(s.value,{componentStack:k!==null?k:""})})}function Uy(e,n,r,s,f){if(r.flags|=32768,s!==null&&typeof s=="object"&&typeof s.then=="function"){if(n=r.alternate,n!==null&&vr(n,r,f,!0),r=Tn.current,r!==null){switch(r.tag){case 31:case 13:return Hn===null?So():r.alternate===null&&Bt===0&&(Bt=3),r.flags&=-257,r.flags|=65536,r.lanes=f,s===to?r.flags|=16384:(n=r.updateQueue,n===null?r.updateQueue=new Set([s]):n.add(s),Rd(e,s,f)),!1;case 22:return r.flags|=65536,s===to?r.flags|=16384:(n=r.updateQueue,n===null?(n={transitions:null,markerInstances:null,retryQueue:new Set([s])},r.updateQueue=n):(r=n.retryQueue,r===null?n.retryQueue=new Set([s]):r.add(s)),Rd(e,s,f)),!1}throw Error(l(435,r.tag))}return Rd(e,s,f),So(),!1}if(ft)return n=Tn.current,n!==null?((n.flags&65536)===0&&(n.flags|=256),n.flags|=65536,n.lanes=f,s!==Cu&&(e=Error(l(422),{cause:s}),bl(zn(e,r)))):(s!==Cu&&(n=Error(l(423),{cause:s}),bl(zn(n,r))),e=e.current.alternate,e.flags|=65536,f&=-f,e.lanes|=f,s=zn(s,r),f=sd(e.stateNode,s,f),Pu(e,f),Bt!==4&&(Bt=2)),!1;var p=Error(l(520),{cause:s});if(p=zn(p,r),zl===null?zl=[p]:zl.push(p),Bt!==4&&(Bt=2),n===null)return!0;s=zn(s,r),r=n;do{switch(r.tag){case 3:return r.flags|=65536,e=f&-f,r.lanes|=e,e=sd(r.stateNode,s,e),Pu(r,e),!1;case 1:if(n=r.type,p=r.stateNode,(r.flags&128)===0&&(typeof n.getDerivedStateFromError=="function"||p!==null&&typeof p.componentDidCatch=="function"&&(fi===null||!fi.has(p))))return r.flags|=65536,f&=-f,r.lanes|=f,f=Dm(f),Cm(f,e,r,s),Pu(r,f),!1}r=r.return}while(r!==null);return!1}var od=Error(l(461)),Ft=!1;function sn(e,n,r,s){n.child=e===null?Mp(n,null,r,s):Vi(n,e.child,r,s)}function Sm(e,n,r,s,f){r=r.render;var p=n.ref;if("ref"in s){var A={};for(var k in s)k!=="ref"&&(A[k]=s[k])}else A=s;return Ii(n),s=Ju(e,n,r,A,p,f),k=qu(),e!==null&&!Ft?(Vu(e,n,f),Ea(e,n,f)):(ft&&k&&wu(n),n.flags|=1,sn(e,n,s,f),n.child)}function Nm(e,n,r,s,f){if(e===null){var p=r.type;return typeof p=="function"&&!vu(p)&&p.defaultProps===void 0&&r.compare===null?(n.tag=15,n.type=p,Tm(e,n,p,s,f)):(e=Xs(r.type,null,s,n,n.mode,f),e.ref=n.ref,e.return=n,n.child=e)}if(p=e.child,!xd(e,f)){var A=p.memoizedProps;if(r=r.compare,r=r!==null?r:xl,r(A,s)&&e.ref===n.ref)return Ea(e,n,f)}return n.flags|=1,e=Da(p,s),e.ref=n.ref,e.return=n,n.child=e}function Tm(e,n,r,s,f){if(e!==null){var p=e.memoizedProps;if(xl(p,s)&&e.ref===n.ref)if(Ft=!1,n.pendingProps=s=p,xd(e,f))(e.flags&131072)!==0&&(Ft=!0);else return n.lanes=e.lanes,Ea(e,n,f)}return cd(e,n,r,s,f)}function Mm(e,n,r,s){var f=s.children,p=e!==null?e.memoizedState:null;if(e===null&&n.stateNode===null&&(n.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),s.mode==="hidden"){if((n.flags&128)!==0){if(p=p!==null?p.baseLanes|r:r,e!==null){for(s=n.child=e.child,f=0;s!==null;)f=f|s.lanes|s.childLanes,s=s.sibling;s=f&~p}else s=0,n.child=null;return Em(e,n,p,r,s)}if((r&536870912)!==0)n.memoizedState={baseLanes:0,cachePool:null},e!==null&&Qs(n,p!==null?p.cachePool:null),p!==null?kp(n,p):Uu(),Op(n);else return s=n.lanes=536870912,Em(e,n,p!==null?p.baseLanes|r:r,r,s)}else p!==null?(Qs(n,p.cachePool),kp(n,p),oi(),n.memoizedState=null):(e!==null&&Qs(n,null),Uu(),oi());return sn(e,n,f,r),n.child}function El(e,n){return e!==null&&e.tag===22||n.stateNode!==null||(n.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),n.sibling}function Em(e,n,r,s,f){var p=ku();return p=p===null?null:{parent:Yt._currentValue,pool:p},n.memoizedState={baseLanes:r,cachePool:p},e!==null&&Qs(n,null),Uu(),Op(n),e!==null&&vr(e,n,s,!0),n.childLanes=f,null}function xo(e,n){return n=_o({mode:n.mode,children:n.children},e.mode),n.ref=e.ref,e.child=n,n.return=e,n}function Rm(e,n,r){return Vi(n,e.child,null,r),e=xo(n,n.pendingProps),e.flags|=2,Mn(n),n.memoizedState=null,e}function $y(e,n,r){var s=n.pendingProps,f=(n.flags&128)!==0;if(n.flags&=-129,e===null){if(ft){if(s.mode==="hidden")return e=xo(n,s),n.lanes=536870912,El(null,e);if(Iu(n),(e=Nt)?(e=qh(e,In),e=e!==null&&e.data==="&"?e:null,e!==null&&(n.memoizedState={dehydrated:e,treeContext:ei!==null?{id:la,overflow:sa}:null,retryLane:536870912,hydrationErrors:null},r=hp(e),r.return=n,n.child=r,rn=n,Nt=null)):e=null,e===null)throw ni(n);return n.lanes=536870912,null}return xo(n,s)}var p=e.memoizedState;if(p!==null){var A=p.dehydrated;if(Iu(n),f)if(n.flags&256)n.flags&=-257,n=Rm(e,n,r);else if(n.memoizedState!==null)n.child=e.child,n.flags|=128,n=null;else throw Error(l(558));else if(Ft||vr(e,n,r,!1),f=(r&e.childLanes)!==0,Ft||f){if(s=Dt,s!==null&&(A=ke(s,r),A!==0&&A!==p.retryLane))throw p.retryLane=A,Pi(e,A),Ln(s,e,A),od;So(),n=Rm(e,n,r)}else e=p.treeContext,Nt=Jn(A.nextSibling),rn=n,ft=!0,ti=null,In=!1,e!==null&&_p(n,e),n=xo(n,s),n.flags|=4096;return n}return e=Da(e.child,{mode:s.mode,children:s.children}),e.ref=n.ref,n.child=e,e.return=n,e}function go(e,n){var r=n.ref;if(r===null)e!==null&&e.ref!==null&&(n.flags|=4194816);else{if(typeof r!="function"&&typeof r!="object")throw Error(l(284));(e===null||e.ref!==r)&&(n.flags|=4194816)}}function cd(e,n,r,s,f){return Ii(n),r=Ju(e,n,r,s,void 0,f),s=qu(),e!==null&&!Ft?(Vu(e,n,f),Ea(e,n,f)):(ft&&s&&wu(n),n.flags|=1,sn(e,n,r,f),n.child)}function km(e,n,r,s,f,p){return Ii(n),n.updateQueue=null,r=Bp(n,s,r,f),jp(e),s=qu(),e!==null&&!Ft?(Vu(e,n,p),Ea(e,n,p)):(ft&&s&&wu(n),n.flags|=1,sn(e,n,r,p),n.child)}function Om(e,n,r,s,f){if(Ii(n),n.stateNode===null){var p=gr,A=r.contextType;typeof A=="object"&&A!==null&&(p=ln(A)),p=new r(s,p),n.memoizedState=p.state!==null&&p.state!==void 0?p.state:null,p.updater=ld,n.stateNode=p,p._reactInternals=n,p=n.stateNode,p.props=s,p.state=n.memoizedState,p.refs={},ju(n),A=r.contextType,p.context=typeof A=="object"&&A!==null?ln(A):gr,p.state=n.memoizedState,A=r.getDerivedStateFromProps,typeof A=="function"&&(rd(n,r,A,s),p.state=n.memoizedState),typeof r.getDerivedStateFromProps=="function"||typeof p.getSnapshotBeforeUpdate=="function"||typeof p.UNSAFE_componentWillMount!="function"&&typeof p.componentWillMount!="function"||(A=p.state,typeof p.componentWillMount=="function"&&p.componentWillMount(),typeof p.UNSAFE_componentWillMount=="function"&&p.UNSAFE_componentWillMount(),A!==p.state&&ld.enqueueReplaceState(p,p.state,null),Cl(n,s,p,f),Dl(),p.state=n.memoizedState),typeof p.componentDidMount=="function"&&(n.flags|=4194308),s=!0}else if(e===null){p=n.stateNode;var k=n.memoizedProps,Y=Gi(r,k);p.props=Y;var le=p.context,he=r.contextType;A=gr,typeof he=="object"&&he!==null&&(A=ln(he));var Ae=r.getDerivedStateFromProps;he=typeof Ae=="function"||typeof p.getSnapshotBeforeUpdate=="function",k=n.pendingProps!==k,he||typeof p.UNSAFE_componentWillReceiveProps!="function"&&typeof p.componentWillReceiveProps!="function"||(k||le!==A)&&ym(n,p,s,A),ii=!1;var se=n.memoizedState;p.state=se,Cl(n,s,p,f),Dl(),le=n.memoizedState,k||se!==le||ii?(typeof Ae=="function"&&(rd(n,r,Ae,s),le=n.memoizedState),(Y=ii||bm(n,r,Y,s,se,le,A))?(he||typeof p.UNSAFE_componentWillMount!="function"&&typeof p.componentWillMount!="function"||(typeof p.componentWillMount=="function"&&p.componentWillMount(),typeof p.UNSAFE_componentWillMount=="function"&&p.UNSAFE_componentWillMount()),typeof p.componentDidMount=="function"&&(n.flags|=4194308)):(typeof p.componentDidMount=="function"&&(n.flags|=4194308),n.memoizedProps=s,n.memoizedState=le),p.props=s,p.state=le,p.context=A,s=Y):(typeof p.componentDidMount=="function"&&(n.flags|=4194308),s=!1)}else{p=n.stateNode,Bu(e,n),A=n.memoizedProps,he=Gi(r,A),p.props=he,Ae=n.pendingProps,se=p.context,le=r.contextType,Y=gr,typeof le=="object"&&le!==null&&(Y=ln(le)),k=r.getDerivedStateFromProps,(le=typeof k=="function"||typeof p.getSnapshotBeforeUpdate=="function")||typeof p.UNSAFE_componentWillReceiveProps!="function"&&typeof p.componentWillReceiveProps!="function"||(A!==Ae||se!==Y)&&ym(n,p,s,Y),ii=!1,se=n.memoizedState,p.state=se,Cl(n,s,p,f),Dl();var ce=n.memoizedState;A!==Ae||se!==ce||ii||e!==null&&e.dependencies!==null&&Ks(e.dependencies)?(typeof k=="function"&&(rd(n,r,k,s),ce=n.memoizedState),(he=ii||bm(n,r,he,s,se,ce,Y)||e!==null&&e.dependencies!==null&&Ks(e.dependencies))?(le||typeof p.UNSAFE_componentWillUpdate!="function"&&typeof p.componentWillUpdate!="function"||(typeof p.componentWillUpdate=="function"&&p.componentWillUpdate(s,ce,Y),typeof p.UNSAFE_componentWillUpdate=="function"&&p.UNSAFE_componentWillUpdate(s,ce,Y)),typeof p.componentDidUpdate=="function"&&(n.flags|=4),typeof p.getSnapshotBeforeUpdate=="function"&&(n.flags|=1024)):(typeof p.componentDidUpdate!="function"||A===e.memoizedProps&&se===e.memoizedState||(n.flags|=4),typeof p.getSnapshotBeforeUpdate!="function"||A===e.memoizedProps&&se===e.memoizedState||(n.flags|=1024),n.memoizedProps=s,n.memoizedState=ce),p.props=s,p.state=ce,p.context=Y,s=he):(typeof p.componentDidUpdate!="function"||A===e.memoizedProps&&se===e.memoizedState||(n.flags|=4),typeof p.getSnapshotBeforeUpdate!="function"||A===e.memoizedProps&&se===e.memoizedState||(n.flags|=1024),s=!1)}return p=s,go(e,n),s=(n.flags&128)!==0,p||s?(p=n.stateNode,r=s&&typeof r.getDerivedStateFromError!="function"?null:p.render(),n.flags|=1,e!==null&&s?(n.child=Vi(n,e.child,null,f),n.child=Vi(n,null,r,f)):sn(e,n,r,f),n.memoizedState=p.state,e=n.child):e=Ea(e,n,f),e}function jm(e,n,r,s){return Ui(),n.flags|=256,sn(e,n,r,s),n.child}var ud={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function dd(e){return{baseLanes:e,cachePool:wp()}}function fd(e,n,r){return e=e!==null?e.childLanes&~r:0,n&&(e|=Rn),e}function Bm(e,n,r){var s=n.pendingProps,f=!1,p=(n.flags&128)!==0,A;if((A=p)||(A=e!==null&&e.memoizedState===null?!1:(Jt.current&2)!==0),A&&(f=!0,n.flags&=-129),A=(n.flags&32)!==0,n.flags&=-33,e===null){if(ft){if(f?si(n):oi(),(e=Nt)?(e=qh(e,In),e=e!==null&&e.data!=="&"?e:null,e!==null&&(n.memoizedState={dehydrated:e,treeContext:ei!==null?{id:la,overflow:sa}:null,retryLane:536870912,hydrationErrors:null},r=hp(e),r.return=n,n.child=r,rn=n,Nt=null)):e=null,e===null)throw ni(n);return Yd(e)?n.lanes=32:n.lanes=536870912,null}var k=s.children;return s=s.fallback,f?(oi(),f=n.mode,k=_o({mode:"hidden",children:k},f),s=zi(s,f,r,null),k.return=n,s.return=n,k.sibling=s,n.child=k,s=n.child,s.memoizedState=dd(r),s.childLanes=fd(e,A,r),n.memoizedState=ud,El(null,s)):(si(n),pd(n,k))}var Y=e.memoizedState;if(Y!==null&&(k=Y.dehydrated,k!==null)){if(p)n.flags&256?(si(n),n.flags&=-257,n=md(e,n,r)):n.memoizedState!==null?(oi(),n.child=e.child,n.flags|=128,n=null):(oi(),k=s.fallback,f=n.mode,s=_o({mode:"visible",children:s.children},f),k=zi(k,f,r,null),k.flags|=2,s.return=n,k.return=n,s.sibling=k,n.child=s,Vi(n,e.child,null,r),s=n.child,s.memoizedState=dd(r),s.childLanes=fd(e,A,r),n.memoizedState=ud,n=El(null,s));else if(si(n),Yd(k)){if(A=k.nextSibling&&k.nextSibling.dataset,A)var le=A.dgst;A=le,s=Error(l(419)),s.stack="",s.digest=A,bl({value:s,source:null,stack:null}),n=md(e,n,r)}else if(Ft||vr(e,n,r,!1),A=(r&e.childLanes)!==0,Ft||A){if(A=Dt,A!==null&&(s=ke(A,r),s!==0&&s!==Y.retryLane))throw Y.retryLane=s,Pi(e,s),Ln(A,e,s),od;Gd(k)||So(),n=md(e,n,r)}else Gd(k)?(n.flags|=192,n.child=e.child,n=null):(e=Y.treeContext,Nt=Jn(k.nextSibling),rn=n,ft=!0,ti=null,In=!1,e!==null&&_p(n,e),n=pd(n,s.children),n.flags|=4096);return n}return f?(oi(),k=s.fallback,f=n.mode,Y=e.child,le=Y.sibling,s=Da(Y,{mode:"hidden",children:s.children}),s.subtreeFlags=Y.subtreeFlags&65011712,le!==null?k=Da(le,k):(k=zi(k,f,r,null),k.flags|=2),k.return=n,s.return=n,s.sibling=k,n.child=s,El(null,s),s=n.child,k=e.child.memoizedState,k===null?k=dd(r):(f=k.cachePool,f!==null?(Y=Yt._currentValue,f=f.parent!==Y?{parent:Y,pool:Y}:f):f=wp(),k={baseLanes:k.baseLanes|r,cachePool:f}),s.memoizedState=k,s.childLanes=fd(e,A,r),n.memoizedState=ud,El(e.child,s)):(si(n),r=e.child,e=r.sibling,r=Da(r,{mode:"visible",children:s.children}),r.return=n,r.sibling=null,e!==null&&(A=n.deletions,A===null?(n.deletions=[e],n.flags|=16):A.push(e)),n.child=r,n.memoizedState=null,r)}function pd(e,n){return n=_o({mode:"visible",children:n},e.mode),n.return=e,e.child=n}function _o(e,n){return e=Nn(22,e,null,n),e.lanes=0,e}function md(e,n,r){return Vi(n,e.child,null,r),e=pd(n,n.pendingProps.children),e.flags|=2,n.memoizedState=null,e}function Pm(e,n,r){e.lanes|=n;var s=e.alternate;s!==null&&(s.lanes|=n),Tu(e.return,n,r)}function hd(e,n,r,s,f,p){var A=e.memoizedState;A===null?e.memoizedState={isBackwards:n,rendering:null,renderingStartTime:0,last:s,tail:r,tailMode:f,treeForkCount:p}:(A.isBackwards=n,A.rendering=null,A.renderingStartTime=0,A.last=s,A.tail=r,A.tailMode=f,A.treeForkCount=p)}function zm(e,n,r){var s=n.pendingProps,f=s.revealOrder,p=s.tail;s=s.children;var A=Jt.current,k=(A&2)!==0;if(k?(A=A&1|2,n.flags|=128):A&=1,V(Jt,A),sn(e,n,s,r),s=ft?_l:0,!k&&e!==null&&(e.flags&128)!==0)e:for(e=n.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Pm(e,r,n);else if(e.tag===19)Pm(e,r,n);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===n)break e;for(;e.sibling===null;){if(e.return===null||e.return===n)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(f){case"forwards":for(r=n.child,f=null;r!==null;)e=r.alternate,e!==null&&ro(e)===null&&(f=r),r=r.sibling;r=f,r===null?(f=n.child,n.child=null):(f=r.sibling,r.sibling=null),hd(n,!1,f,r,p,s);break;case"backwards":case"unstable_legacy-backwards":for(r=null,f=n.child,n.child=null;f!==null;){if(e=f.alternate,e!==null&&ro(e)===null){n.child=f;break}e=f.sibling,f.sibling=r,r=f,f=e}hd(n,!0,r,null,p,s);break;case"together":hd(n,!1,null,null,void 0,s);break;default:n.memoizedState=null}return n.child}function Ea(e,n,r){if(e!==null&&(n.dependencies=e.dependencies),di|=n.lanes,(r&n.childLanes)===0)if(e!==null){if(vr(e,n,r,!1),(r&n.childLanes)===0)return null}else return null;if(e!==null&&n.child!==e.child)throw Error(l(153));if(n.child!==null){for(e=n.child,r=Da(e,e.pendingProps),n.child=r,r.return=n;e.sibling!==null;)e=e.sibling,r=r.sibling=Da(e,e.pendingProps),r.return=n;r.sibling=null}return n.child}function xd(e,n){return(e.lanes&n)!==0?!0:(e=e.dependencies,!!(e!==null&&Ks(e)))}function Iy(e,n,r){switch(n.tag){case 3:pe(n,n.stateNode.containerInfo),ai(n,Yt,e.memoizedState.cache),Ui();break;case 27:case 5:Ze(n);break;case 4:pe(n,n.stateNode.containerInfo);break;case 10:ai(n,n.type,n.memoizedProps.value);break;case 31:if(n.memoizedState!==null)return n.flags|=128,Iu(n),null;break;case 13:var s=n.memoizedState;if(s!==null)return s.dehydrated!==null?(si(n),n.flags|=128,null):(r&n.child.childLanes)!==0?Bm(e,n,r):(si(n),e=Ea(e,n,r),e!==null?e.sibling:null);si(n);break;case 19:var f=(e.flags&128)!==0;if(s=(r&n.childLanes)!==0,s||(vr(e,n,r,!1),s=(r&n.childLanes)!==0),f){if(s)return zm(e,n,r);n.flags|=128}if(f=n.memoizedState,f!==null&&(f.rendering=null,f.tail=null,f.lastEffect=null),V(Jt,Jt.current),s)break;return null;case 22:return n.lanes=0,Mm(e,n,r,n.pendingProps);case 24:ai(n,Yt,e.memoizedState.cache)}return Ea(e,n,r)}function Um(e,n,r){if(e!==null)if(e.memoizedProps!==n.pendingProps)Ft=!0;else{if(!xd(e,r)&&(n.flags&128)===0)return Ft=!1,Iy(e,n,r);Ft=(e.flags&131072)!==0}else Ft=!1,ft&&(n.flags&1048576)!==0&&gp(n,_l,n.index);switch(n.lanes=0,n.tag){case 16:e:{var s=n.pendingProps;if(e=Ji(n.elementType),n.type=e,typeof e=="function")vu(e)?(s=Gi(e,s),n.tag=1,n=Om(null,n,e,s,r)):(n.tag=0,n=cd(null,n,e,s,r));else{if(e!=null){var f=e.$$typeof;if(f===E){n.tag=11,n=Sm(null,n,e,s,r);break e}else if(f===S){n.tag=14,n=Nm(null,n,e,s,r);break e}}throw n=I(e)||e,Error(l(306,n,""))}}return n;case 0:return cd(e,n,n.type,n.pendingProps,r);case 1:return s=n.type,f=Gi(s,n.pendingProps),Om(e,n,s,f,r);case 3:e:{if(pe(n,n.stateNode.containerInfo),e===null)throw Error(l(387));s=n.pendingProps;var p=n.memoizedState;f=p.element,Bu(e,n),Cl(n,s,null,r);var A=n.memoizedState;if(s=A.cache,ai(n,Yt,s),s!==p.cache&&Mu(n,[Yt],r,!0),Dl(),s=A.element,p.isDehydrated)if(p={element:s,isDehydrated:!1,cache:A.cache},n.updateQueue.baseState=p,n.memoizedState=p,n.flags&256){n=jm(e,n,s,r);break e}else if(s!==f){f=zn(Error(l(424)),n),bl(f),n=jm(e,n,s,r);break e}else{switch(e=n.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName==="HTML"?e.ownerDocument.body:e}for(Nt=Jn(e.firstChild),rn=n,ft=!0,ti=null,In=!0,r=Mp(n,null,s,r),n.child=r;r;)r.flags=r.flags&-3|4096,r=r.sibling}else{if(Ui(),s===f){n=Ea(e,n,r);break e}sn(e,n,s,r)}n=n.child}return n;case 26:return go(e,n),e===null?(r=Fh(n.type,null,n.pendingProps,null))?n.memoizedState=r:ft||(r=n.type,e=n.pendingProps,s=Oo(be.current).createElement(r),s[Ce]=n,s[Re]=e,on(s,r,e),Gt(s),n.stateNode=s):n.memoizedState=Fh(n.type,e.memoizedProps,n.pendingProps,e.memoizedState),null;case 27:return Ze(n),e===null&&ft&&(s=n.stateNode=Gh(n.type,n.pendingProps,be.current),rn=n,In=!0,f=Nt,xi(n.type)?(Xd=f,Nt=Jn(s.firstChild)):Nt=f),sn(e,n,n.pendingProps.children,r),go(e,n),e===null&&(n.flags|=4194304),n.child;case 5:return e===null&&ft&&((f=s=Nt)&&(s=gv(s,n.type,n.pendingProps,In),s!==null?(n.stateNode=s,rn=n,Nt=Jn(s.firstChild),In=!1,f=!0):f=!1),f||ni(n)),Ze(n),f=n.type,p=n.pendingProps,A=e!==null?e.memoizedProps:null,s=p.children,qd(f,p)?s=null:A!==null&&qd(f,A)&&(n.flags|=32),n.memoizedState!==null&&(f=Ju(e,n,Ry,null,null,r),Zl._currentValue=f),go(e,n),sn(e,n,s,r),n.child;case 6:return e===null&&ft&&((e=r=Nt)&&(r=_v(r,n.pendingProps,In),r!==null?(n.stateNode=r,rn=n,Nt=null,e=!0):e=!1),e||ni(n)),null;case 13:return Bm(e,n,r);case 4:return pe(n,n.stateNode.containerInfo),s=n.pendingProps,e===null?n.child=Vi(n,null,s,r):sn(e,n,s,r),n.child;case 11:return Sm(e,n,n.type,n.pendingProps,r);case 7:return sn(e,n,n.pendingProps,r),n.child;case 8:return sn(e,n,n.pendingProps.children,r),n.child;case 12:return sn(e,n,n.pendingProps.children,r),n.child;case 10:return s=n.pendingProps,ai(n,n.type,s.value),sn(e,n,s.children,r),n.child;case 9:return f=n.type._context,s=n.pendingProps.children,Ii(n),f=ln(f),s=s(f),n.flags|=1,sn(e,n,s,r),n.child;case 14:return Nm(e,n,n.type,n.pendingProps,r);case 15:return Tm(e,n,n.type,n.pendingProps,r);case 19:return zm(e,n,r);case 31:return $y(e,n,r);case 22:return Mm(e,n,r,n.pendingProps);case 24:return Ii(n),s=ln(Yt),e===null?(f=ku(),f===null&&(f=Dt,p=Eu(),f.pooledCache=p,p.refCount++,p!==null&&(f.pooledCacheLanes|=r),f=p),n.memoizedState={parent:s,cache:f},ju(n),ai(n,Yt,f)):((e.lanes&r)!==0&&(Bu(e,n),Cl(n,null,null,r),Dl()),f=e.memoizedState,p=n.memoizedState,f.parent!==s?(f={parent:s,cache:s},n.memoizedState=f,n.lanes===0&&(n.memoizedState=n.updateQueue.baseState=f),ai(n,Yt,s)):(s=p.cache,ai(n,Yt,s),s!==f.cache&&Mu(n,[Yt],r,!0))),sn(e,n,n.pendingProps.children,r),n.child;case 29:throw n.pendingProps}throw Error(l(156,n.tag))}function Ra(e){e.flags|=4}function gd(e,n,r,s,f){if((n=(e.mode&32)!==0)&&(n=!1),n){if(e.flags|=16777216,(f&335544128)===f)if(e.stateNode.complete)e.flags|=8192;else if(fh())e.flags|=8192;else throw qi=to,Ou}else e.flags&=-16777217}function $m(e,n){if(n.type!=="stylesheet"||(n.state.loading&4)!==0)e.flags&=-16777217;else if(e.flags|=16777216,!t1(n))if(fh())e.flags|=8192;else throw qi=to,Ou}function bo(e,n){n!==null&&(e.flags|=4),e.flags&16384&&(n=e.tag!==22?fe():536870912,e.lanes|=n,kr|=n)}function Rl(e,n){if(!ft)switch(e.tailMode){case"hidden":n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?e.tail=null:r.sibling=null;break;case"collapsed":r=e.tail;for(var s=null;r!==null;)r.alternate!==null&&(s=r),r=r.sibling;s===null?n||e.tail===null?e.tail=null:e.tail.sibling=null:s.sibling=null}}function Tt(e){var n=e.alternate!==null&&e.alternate.child===e.child,r=0,s=0;if(n)for(var f=e.child;f!==null;)r|=f.lanes|f.childLanes,s|=f.subtreeFlags&65011712,s|=f.flags&65011712,f.return=e,f=f.sibling;else for(f=e.child;f!==null;)r|=f.lanes|f.childLanes,s|=f.subtreeFlags,s|=f.flags,f.return=e,f=f.sibling;return e.subtreeFlags|=s,e.childLanes=r,n}function Hy(e,n,r){var s=n.pendingProps;switch(Du(n),n.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Tt(n),null;case 1:return Tt(n),null;case 3:return r=n.stateNode,s=null,e!==null&&(s=e.memoizedState.cache),n.memoizedState.cache!==s&&(n.flags|=2048),Na(Yt),Te(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(yr(n)?Ra(n):e===null||e.memoizedState.isDehydrated&&(n.flags&256)===0||(n.flags|=1024,Su())),Tt(n),null;case 26:var f=n.type,p=n.memoizedState;return e===null?(Ra(n),p!==null?(Tt(n),$m(n,p)):(Tt(n),gd(n,f,null,s,r))):p?p!==e.memoizedState?(Ra(n),Tt(n),$m(n,p)):(Tt(n),n.flags&=-16777217):(e=e.memoizedProps,e!==s&&Ra(n),Tt(n),gd(n,f,e,s,r)),null;case 27:if(Me(n),r=be.current,f=n.type,e!==null&&n.stateNode!=null)e.memoizedProps!==s&&Ra(n);else{if(!s){if(n.stateNode===null)throw Error(l(166));return Tt(n),null}e=ee.current,yr(n)?bp(n):(e=Gh(f,s,r),n.stateNode=e,Ra(n))}return Tt(n),null;case 5:if(Me(n),f=n.type,e!==null&&n.stateNode!=null)e.memoizedProps!==s&&Ra(n);else{if(!s){if(n.stateNode===null)throw Error(l(166));return Tt(n),null}if(p=ee.current,yr(n))bp(n);else{var A=Oo(be.current);switch(p){case 1:p=A.createElementNS("http://www.w3.org/2000/svg",f);break;case 2:p=A.createElementNS("http://www.w3.org/1998/Math/MathML",f);break;default:switch(f){case"svg":p=A.createElementNS("http://www.w3.org/2000/svg",f);break;case"math":p=A.createElementNS("http://www.w3.org/1998/Math/MathML",f);break;case"script":p=A.createElement("div"),p.innerHTML="<script><\/script>",p=p.removeChild(p.firstChild);break;case"select":p=typeof s.is=="string"?A.createElement("select",{is:s.is}):A.createElement("select"),s.multiple?p.multiple=!0:s.size&&(p.size=s.size);break;default:p=typeof s.is=="string"?A.createElement(f,{is:s.is}):A.createElement(f)}}p[Ce]=n,p[Re]=s;e:for(A=n.child;A!==null;){if(A.tag===5||A.tag===6)p.appendChild(A.stateNode);else if(A.tag!==4&&A.tag!==27&&A.child!==null){A.child.return=A,A=A.child;continue}if(A===n)break e;for(;A.sibling===null;){if(A.return===null||A.return===n)break e;A=A.return}A.sibling.return=A.return,A=A.sibling}n.stateNode=p;e:switch(on(p,f,s),f){case"button":case"input":case"select":case"textarea":s=!!s.autoFocus;break e;case"img":s=!0;break e;default:s=!1}s&&Ra(n)}}return Tt(n),gd(n,n.type,e===null?null:e.memoizedProps,n.pendingProps,r),null;case 6:if(e&&n.stateNode!=null)e.memoizedProps!==s&&Ra(n);else{if(typeof s!="string"&&n.stateNode===null)throw Error(l(166));if(e=be.current,yr(n)){if(e=n.stateNode,r=n.memoizedProps,s=null,f=rn,f!==null)switch(f.tag){case 27:case 5:s=f.memoizedProps}e[Ce]=n,e=!!(e.nodeValue===r||s!==null&&s.suppressHydrationWarning===!0||Bh(e.nodeValue,r)),e||ni(n,!0)}else e=Oo(e).createTextNode(s),e[Ce]=n,n.stateNode=e}return Tt(n),null;case 31:if(r=n.memoizedState,e===null||e.memoizedState!==null){if(s=yr(n),r!==null){if(e===null){if(!s)throw Error(l(318));if(e=n.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(l(557));e[Ce]=n}else Ui(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;Tt(n),e=!1}else r=Su(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=r),e=!0;if(!e)return n.flags&256?(Mn(n),n):(Mn(n),null);if((n.flags&128)!==0)throw Error(l(558))}return Tt(n),null;case 13:if(s=n.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(f=yr(n),s!==null&&s.dehydrated!==null){if(e===null){if(!f)throw Error(l(318));if(f=n.memoizedState,f=f!==null?f.dehydrated:null,!f)throw Error(l(317));f[Ce]=n}else Ui(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;Tt(n),f=!1}else f=Su(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=f),f=!0;if(!f)return n.flags&256?(Mn(n),n):(Mn(n),null)}return Mn(n),(n.flags&128)!==0?(n.lanes=r,n):(r=s!==null,e=e!==null&&e.memoizedState!==null,r&&(s=n.child,f=null,s.alternate!==null&&s.alternate.memoizedState!==null&&s.alternate.memoizedState.cachePool!==null&&(f=s.alternate.memoizedState.cachePool.pool),p=null,s.memoizedState!==null&&s.memoizedState.cachePool!==null&&(p=s.memoizedState.cachePool.pool),p!==f&&(s.flags|=2048)),r!==e&&r&&(n.child.flags|=8192),bo(n,n.updateQueue),Tt(n),null);case 4:return Te(),e===null&&Ud(n.stateNode.containerInfo),Tt(n),null;case 10:return Na(n.type),Tt(n),null;case 19:if(M(Jt),s=n.memoizedState,s===null)return Tt(n),null;if(f=(n.flags&128)!==0,p=s.rendering,p===null)if(f)Rl(s,!1);else{if(Bt!==0||e!==null&&(e.flags&128)!==0)for(e=n.child;e!==null;){if(p=ro(e),p!==null){for(n.flags|=128,Rl(s,!1),e=p.updateQueue,n.updateQueue=e,bo(n,e),n.subtreeFlags=0,e=r,r=n.child;r!==null;)mp(r,e),r=r.sibling;return V(Jt,Jt.current&1|2),ft&&Ca(n,s.treeForkCount),n.child}e=e.sibling}s.tail!==null&&me()>wo&&(n.flags|=128,f=!0,Rl(s,!1),n.lanes=4194304)}else{if(!f)if(e=ro(p),e!==null){if(n.flags|=128,f=!0,e=e.updateQueue,n.updateQueue=e,bo(n,e),Rl(s,!0),s.tail===null&&s.tailMode==="hidden"&&!p.alternate&&!ft)return Tt(n),null}else 2*me()-s.renderingStartTime>wo&&r!==536870912&&(n.flags|=128,f=!0,Rl(s,!1),n.lanes=4194304);s.isBackwards?(p.sibling=n.child,n.child=p):(e=s.last,e!==null?e.sibling=p:n.child=p,s.last=p)}return s.tail!==null?(e=s.tail,s.rendering=e,s.tail=e.sibling,s.renderingStartTime=me(),e.sibling=null,r=Jt.current,V(Jt,f?r&1|2:r&1),ft&&Ca(n,s.treeForkCount),e):(Tt(n),null);case 22:case 23:return Mn(n),$u(),s=n.memoizedState!==null,e!==null?e.memoizedState!==null!==s&&(n.flags|=8192):s&&(n.flags|=8192),s?(r&536870912)!==0&&(n.flags&128)===0&&(Tt(n),n.subtreeFlags&6&&(n.flags|=8192)):Tt(n),r=n.updateQueue,r!==null&&bo(n,r.retryQueue),r=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(r=e.memoizedState.cachePool.pool),s=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(s=n.memoizedState.cachePool.pool),s!==r&&(n.flags|=2048),e!==null&&M(Hi),null;case 24:return r=null,e!==null&&(r=e.memoizedState.cache),n.memoizedState.cache!==r&&(n.flags|=2048),Na(Yt),Tt(n),null;case 25:return null;case 30:return null}throw Error(l(156,n.tag))}function Jy(e,n){switch(Du(n),n.tag){case 1:return e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 3:return Na(Yt),Te(),e=n.flags,(e&65536)!==0&&(e&128)===0?(n.flags=e&-65537|128,n):null;case 26:case 27:case 5:return Me(n),null;case 31:if(n.memoizedState!==null){if(Mn(n),n.alternate===null)throw Error(l(340));Ui()}return e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 13:if(Mn(n),e=n.memoizedState,e!==null&&e.dehydrated!==null){if(n.alternate===null)throw Error(l(340));Ui()}return e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 19:return M(Jt),null;case 4:return Te(),null;case 10:return Na(n.type),null;case 22:case 23:return Mn(n),$u(),e!==null&&M(Hi),e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 24:return Na(Yt),null;case 25:return null;default:return null}}function Im(e,n){switch(Du(n),n.tag){case 3:Na(Yt),Te();break;case 26:case 27:case 5:Me(n);break;case 4:Te();break;case 31:n.memoizedState!==null&&Mn(n);break;case 13:Mn(n);break;case 19:M(Jt);break;case 10:Na(n.type);break;case 22:case 23:Mn(n),$u(),e!==null&&M(Hi);break;case 24:Na(Yt)}}function kl(e,n){try{var r=n.updateQueue,s=r!==null?r.lastEffect:null;if(s!==null){var f=s.next;r=f;do{if((r.tag&e)===e){s=void 0;var p=r.create,A=r.inst;s=p(),A.destroy=s}r=r.next}while(r!==f)}}catch(k){vt(n,n.return,k)}}function ci(e,n,r){try{var s=n.updateQueue,f=s!==null?s.lastEffect:null;if(f!==null){var p=f.next;s=p;do{if((s.tag&e)===e){var A=s.inst,k=A.destroy;if(k!==void 0){A.destroy=void 0,f=n;var Y=r,le=k;try{le()}catch(he){vt(f,Y,he)}}}s=s.next}while(s!==p)}}catch(he){vt(n,n.return,he)}}function Hm(e){var n=e.updateQueue;if(n!==null){var r=e.stateNode;try{Rp(n,r)}catch(s){vt(e,e.return,s)}}}function Jm(e,n,r){r.props=Gi(e.type,e.memoizedProps),r.state=e.memoizedState;try{r.componentWillUnmount()}catch(s){vt(e,n,s)}}function Ol(e,n){try{var r=e.ref;if(r!==null){switch(e.tag){case 26:case 27:case 5:var s=e.stateNode;break;case 30:s=e.stateNode;break;default:s=e.stateNode}typeof r=="function"?e.refCleanup=r(s):r.current=s}}catch(f){vt(e,n,f)}}function oa(e,n){var r=e.ref,s=e.refCleanup;if(r!==null)if(typeof s=="function")try{s()}catch(f){vt(e,n,f)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof r=="function")try{r(null)}catch(f){vt(e,n,f)}else r.current=null}function qm(e){var n=e.type,r=e.memoizedProps,s=e.stateNode;try{e:switch(n){case"button":case"input":case"select":case"textarea":r.autoFocus&&s.focus();break e;case"img":r.src?s.src=r.src:r.srcSet&&(s.srcset=r.srcSet)}}catch(f){vt(e,e.return,f)}}function _d(e,n,r){try{var s=e.stateNode;dv(s,e.type,r,n),s[Re]=n}catch(f){vt(e,e.return,f)}}function Vm(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&xi(e.type)||e.tag===4}function bd(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||Vm(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&xi(e.type)||e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function yd(e,n,r){var s=e.tag;if(s===5||s===6)e=e.stateNode,n?(r.nodeType===9?r.body:r.nodeName==="HTML"?r.ownerDocument.body:r).insertBefore(e,n):(n=r.nodeType===9?r.body:r.nodeName==="HTML"?r.ownerDocument.body:r,n.appendChild(e),r=r._reactRootContainer,r!=null||n.onclick!==null||(n.onclick=La));else if(s!==4&&(s===27&&xi(e.type)&&(r=e.stateNode,n=null),e=e.child,e!==null))for(yd(e,n,r),e=e.sibling;e!==null;)yd(e,n,r),e=e.sibling}function yo(e,n,r){var s=e.tag;if(s===5||s===6)e=e.stateNode,n?r.insertBefore(e,n):r.appendChild(e);else if(s!==4&&(s===27&&xi(e.type)&&(r=e.stateNode),e=e.child,e!==null))for(yo(e,n,r),e=e.sibling;e!==null;)yo(e,n,r),e=e.sibling}function Zm(e){var n=e.stateNode,r=e.memoizedProps;try{for(var s=e.type,f=n.attributes;f.length;)n.removeAttributeNode(f[0]);on(n,s,r),n[Ce]=e,n[Re]=r}catch(p){vt(e,e.return,p)}}var ka=!1,Kt=!1,vd=!1,Gm=typeof WeakSet=="function"?WeakSet:Set,an=null;function qy(e,n){if(e=e.containerInfo,Hd=Io,e=rp(e),mu(e)){if("selectionStart"in e)var r={start:e.selectionStart,end:e.selectionEnd};else e:{r=(r=e.ownerDocument)&&r.defaultView||window;var s=r.getSelection&&r.getSelection();if(s&&s.rangeCount!==0){r=s.anchorNode;var f=s.anchorOffset,p=s.focusNode;s=s.focusOffset;try{r.nodeType,p.nodeType}catch{r=null;break e}var A=0,k=-1,Y=-1,le=0,he=0,Ae=e,se=null;t:for(;;){for(var ce;Ae!==r||f!==0&&Ae.nodeType!==3||(k=A+f),Ae!==p||s!==0&&Ae.nodeType!==3||(Y=A+s),Ae.nodeType===3&&(A+=Ae.nodeValue.length),(ce=Ae.firstChild)!==null;)se=Ae,Ae=ce;for(;;){if(Ae===e)break t;if(se===r&&++le===f&&(k=A),se===p&&++he===s&&(Y=A),(ce=Ae.nextSibling)!==null)break;Ae=se,se=Ae.parentNode}Ae=ce}r=k===-1||Y===-1?null:{start:k,end:Y}}else r=null}r=r||{start:0,end:0}}else r=null;for(Jd={focusedElem:e,selectionRange:r},Io=!1,an=n;an!==null;)if(n=an,e=n.child,(n.subtreeFlags&1028)!==0&&e!==null)e.return=n,an=e;else for(;an!==null;){switch(n=an,p=n.alternate,e=n.flags,n.tag){case 0:if((e&4)!==0&&(e=n.updateQueue,e=e!==null?e.events:null,e!==null))for(r=0;r<e.length;r++)f=e[r],f.ref.impl=f.nextImpl;break;case 11:case 15:break;case 1:if((e&1024)!==0&&p!==null){e=void 0,r=n,f=p.memoizedProps,p=p.memoizedState,s=r.stateNode;try{var je=Gi(r.type,f);e=s.getSnapshotBeforeUpdate(je,p),s.__reactInternalSnapshotBeforeUpdate=e}catch(qe){vt(r,r.return,qe)}}break;case 3:if((e&1024)!==0){if(e=n.stateNode.containerInfo,r=e.nodeType,r===9)Zd(e);else if(r===1)switch(e.nodeName){case"HEAD":case"HTML":case"BODY":Zd(e);break;default:e.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((e&1024)!==0)throw Error(l(163))}if(e=n.sibling,e!==null){e.return=n.return,an=e;break}an=n.return}}function Ym(e,n,r){var s=r.flags;switch(r.tag){case 0:case 11:case 15:ja(e,r),s&4&&kl(5,r);break;case 1:if(ja(e,r),s&4)if(e=r.stateNode,n===null)try{e.componentDidMount()}catch(A){vt(r,r.return,A)}else{var f=Gi(r.type,n.memoizedProps);n=n.memoizedState;try{e.componentDidUpdate(f,n,e.__reactInternalSnapshotBeforeUpdate)}catch(A){vt(r,r.return,A)}}s&64&&Hm(r),s&512&&Ol(r,r.return);break;case 3:if(ja(e,r),s&64&&(e=r.updateQueue,e!==null)){if(n=null,r.child!==null)switch(r.child.tag){case 27:case 5:n=r.child.stateNode;break;case 1:n=r.child.stateNode}try{Rp(e,n)}catch(A){vt(r,r.return,A)}}break;case 27:n===null&&s&4&&Zm(r);case 26:case 5:ja(e,r),n===null&&s&4&&qm(r),s&512&&Ol(r,r.return);break;case 12:ja(e,r);break;case 31:ja(e,r),s&4&&Km(e,r);break;case 13:ja(e,r),s&4&&Wm(e,r),s&64&&(e=r.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(r=Qy.bind(null,r),bv(e,r))));break;case 22:if(s=r.memoizedState!==null||ka,!s){n=n!==null&&n.memoizedState!==null||Kt,f=ka;var p=Kt;ka=s,(Kt=n)&&!p?Ba(e,r,(r.subtreeFlags&8772)!==0):ja(e,r),ka=f,Kt=p}break;case 30:break;default:ja(e,r)}}function Xm(e){var n=e.alternate;n!==null&&(e.alternate=null,Xm(n)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(n=e.stateNode,n!==null&&ll(n)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var Rt=null,bn=!1;function Oa(e,n,r){for(r=r.child;r!==null;)Fm(e,n,r),r=r.sibling}function Fm(e,n,r){if(zt&&typeof zt.onCommitFiberUnmount=="function")try{zt.onCommitFiberUnmount(Bn,r)}catch{}switch(r.tag){case 26:Kt||oa(r,n),Oa(e,n,r),r.memoizedState?r.memoizedState.count--:r.stateNode&&(r=r.stateNode,r.parentNode.removeChild(r));break;case 27:Kt||oa(r,n);var s=Rt,f=bn;xi(r.type)&&(Rt=r.stateNode,bn=!1),Oa(e,n,r),Jl(r.stateNode),Rt=s,bn=f;break;case 5:Kt||oa(r,n);case 6:if(s=Rt,f=bn,Rt=null,Oa(e,n,r),Rt=s,bn=f,Rt!==null)if(bn)try{(Rt.nodeType===9?Rt.body:Rt.nodeName==="HTML"?Rt.ownerDocument.body:Rt).removeChild(r.stateNode)}catch(p){vt(r,n,p)}else try{Rt.removeChild(r.stateNode)}catch(p){vt(r,n,p)}break;case 18:Rt!==null&&(bn?(e=Rt,Hh(e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,r.stateNode),Ir(e)):Hh(Rt,r.stateNode));break;case 4:s=Rt,f=bn,Rt=r.stateNode.containerInfo,bn=!0,Oa(e,n,r),Rt=s,bn=f;break;case 0:case 11:case 14:case 15:ci(2,r,n),Kt||ci(4,r,n),Oa(e,n,r);break;case 1:Kt||(oa(r,n),s=r.stateNode,typeof s.componentWillUnmount=="function"&&Jm(r,n,s)),Oa(e,n,r);break;case 21:Oa(e,n,r);break;case 22:Kt=(s=Kt)||r.memoizedState!==null,Oa(e,n,r),Kt=s;break;default:Oa(e,n,r)}}function Km(e,n){if(n.memoizedState===null&&(e=n.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{Ir(e)}catch(r){vt(n,n.return,r)}}}function Wm(e,n){if(n.memoizedState===null&&(e=n.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{Ir(e)}catch(r){vt(n,n.return,r)}}function Vy(e){switch(e.tag){case 31:case 13:case 19:var n=e.stateNode;return n===null&&(n=e.stateNode=new Gm),n;case 22:return e=e.stateNode,n=e._retryCache,n===null&&(n=e._retryCache=new Gm),n;default:throw Error(l(435,e.tag))}}function vo(e,n){var r=Vy(e);n.forEach(function(s){if(!r.has(s)){r.add(s);var f=ev.bind(null,e,s);s.then(f,f)}})}function yn(e,n){var r=n.deletions;if(r!==null)for(var s=0;s<r.length;s++){var f=r[s],p=e,A=n,k=A;e:for(;k!==null;){switch(k.tag){case 27:if(xi(k.type)){Rt=k.stateNode,bn=!1;break e}break;case 5:Rt=k.stateNode,bn=!1;break e;case 3:case 4:Rt=k.stateNode.containerInfo,bn=!0;break e}k=k.return}if(Rt===null)throw Error(l(160));Fm(p,A,f),Rt=null,bn=!1,p=f.alternate,p!==null&&(p.return=null),f.return=null}if(n.subtreeFlags&13886)for(n=n.child;n!==null;)Qm(n,e),n=n.sibling}var Fn=null;function Qm(e,n){var r=e.alternate,s=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:yn(n,e),vn(e),s&4&&(ci(3,e,e.return),kl(3,e),ci(5,e,e.return));break;case 1:yn(n,e),vn(e),s&512&&(Kt||r===null||oa(r,r.return)),s&64&&ka&&(e=e.updateQueue,e!==null&&(s=e.callbacks,s!==null&&(r=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=r===null?s:r.concat(s))));break;case 26:var f=Fn;if(yn(n,e),vn(e),s&512&&(Kt||r===null||oa(r,r.return)),s&4){var p=r!==null?r.memoizedState:null;if(s=e.memoizedState,r===null)if(s===null)if(e.stateNode===null){e:{s=e.type,r=e.memoizedProps,f=f.ownerDocument||f;t:switch(s){case"title":p=f.getElementsByTagName("title")[0],(!p||p[Ei]||p[Ce]||p.namespaceURI==="http://www.w3.org/2000/svg"||p.hasAttribute("itemprop"))&&(p=f.createElement(s),f.head.insertBefore(p,f.querySelector("head > title"))),on(p,s,r),p[Ce]=e,Gt(p),s=p;break e;case"link":var A=Qh("link","href",f).get(s+(r.href||""));if(A){for(var k=0;k<A.length;k++)if(p=A[k],p.getAttribute("href")===(r.href==null||r.href===""?null:r.href)&&p.getAttribute("rel")===(r.rel==null?null:r.rel)&&p.getAttribute("title")===(r.title==null?null:r.title)&&p.getAttribute("crossorigin")===(r.crossOrigin==null?null:r.crossOrigin)){A.splice(k,1);break t}}p=f.createElement(s),on(p,s,r),f.head.appendChild(p);break;case"meta":if(A=Qh("meta","content",f).get(s+(r.content||""))){for(k=0;k<A.length;k++)if(p=A[k],p.getAttribute("content")===(r.content==null?null:""+r.content)&&p.getAttribute("name")===(r.name==null?null:r.name)&&p.getAttribute("property")===(r.property==null?null:r.property)&&p.getAttribute("http-equiv")===(r.httpEquiv==null?null:r.httpEquiv)&&p.getAttribute("charset")===(r.charSet==null?null:r.charSet)){A.splice(k,1);break t}}p=f.createElement(s),on(p,s,r),f.head.appendChild(p);break;default:throw Error(l(468,s))}p[Ce]=e,Gt(p),s=p}e.stateNode=s}else e1(f,e.type,e.stateNode);else e.stateNode=Wh(f,s,e.memoizedProps);else p!==s?(p===null?r.stateNode!==null&&(r=r.stateNode,r.parentNode.removeChild(r)):p.count--,s===null?e1(f,e.type,e.stateNode):Wh(f,s,e.memoizedProps)):s===null&&e.stateNode!==null&&_d(e,e.memoizedProps,r.memoizedProps)}break;case 27:yn(n,e),vn(e),s&512&&(Kt||r===null||oa(r,r.return)),r!==null&&s&4&&_d(e,e.memoizedProps,r.memoizedProps);break;case 5:if(yn(n,e),vn(e),s&512&&(Kt||r===null||oa(r,r.return)),e.flags&32){f=e.stateNode;try{ur(f,"")}catch(je){vt(e,e.return,je)}}s&4&&e.stateNode!=null&&(f=e.memoizedProps,_d(e,f,r!==null?r.memoizedProps:f)),s&1024&&(vd=!0);break;case 6:if(yn(n,e),vn(e),s&4){if(e.stateNode===null)throw Error(l(162));s=e.memoizedProps,r=e.stateNode;try{r.nodeValue=s}catch(je){vt(e,e.return,je)}}break;case 3:if(Po=null,f=Fn,Fn=jo(n.containerInfo),yn(n,e),Fn=f,vn(e),s&4&&r!==null&&r.memoizedState.isDehydrated)try{Ir(n.containerInfo)}catch(je){vt(e,e.return,je)}vd&&(vd=!1,eh(e));break;case 4:s=Fn,Fn=jo(e.stateNode.containerInfo),yn(n,e),vn(e),Fn=s;break;case 12:yn(n,e),vn(e);break;case 31:yn(n,e),vn(e),s&4&&(s=e.updateQueue,s!==null&&(e.updateQueue=null,vo(e,s)));break;case 13:yn(n,e),vn(e),e.child.flags&8192&&e.memoizedState!==null!=(r!==null&&r.memoizedState!==null)&&(Lo=me()),s&4&&(s=e.updateQueue,s!==null&&(e.updateQueue=null,vo(e,s)));break;case 22:f=e.memoizedState!==null;var Y=r!==null&&r.memoizedState!==null,le=ka,he=Kt;if(ka=le||f,Kt=he||Y,yn(n,e),Kt=he,ka=le,vn(e),s&8192)e:for(n=e.stateNode,n._visibility=f?n._visibility&-2:n._visibility|1,f&&(r===null||Y||ka||Kt||Yi(e)),r=null,n=e;;){if(n.tag===5||n.tag===26){if(r===null){Y=r=n;try{if(p=Y.stateNode,f)A=p.style,typeof A.setProperty=="function"?A.setProperty("display","none","important"):A.display="none";else{k=Y.stateNode;var Ae=Y.memoizedProps.style,se=Ae!=null&&Ae.hasOwnProperty("display")?Ae.display:null;k.style.display=se==null||typeof se=="boolean"?"":(""+se).trim()}}catch(je){vt(Y,Y.return,je)}}}else if(n.tag===6){if(r===null){Y=n;try{Y.stateNode.nodeValue=f?"":Y.memoizedProps}catch(je){vt(Y,Y.return,je)}}}else if(n.tag===18){if(r===null){Y=n;try{var ce=Y.stateNode;f?Jh(ce,!0):Jh(Y.stateNode,!1)}catch(je){vt(Y,Y.return,je)}}}else if((n.tag!==22&&n.tag!==23||n.memoizedState===null||n===e)&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break e;for(;n.sibling===null;){if(n.return===null||n.return===e)break e;r===n&&(r=null),n=n.return}r===n&&(r=null),n.sibling.return=n.return,n=n.sibling}s&4&&(s=e.updateQueue,s!==null&&(r=s.retryQueue,r!==null&&(s.retryQueue=null,vo(e,r))));break;case 19:yn(n,e),vn(e),s&4&&(s=e.updateQueue,s!==null&&(e.updateQueue=null,vo(e,s)));break;case 30:break;case 21:break;default:yn(n,e),vn(e)}}function vn(e){var n=e.flags;if(n&2){try{for(var r,s=e.return;s!==null;){if(Vm(s)){r=s;break}s=s.return}if(r==null)throw Error(l(160));switch(r.tag){case 27:var f=r.stateNode,p=bd(e);yo(e,p,f);break;case 5:var A=r.stateNode;r.flags&32&&(ur(A,""),r.flags&=-33);var k=bd(e);yo(e,k,A);break;case 3:case 4:var Y=r.stateNode.containerInfo,le=bd(e);yd(e,le,Y);break;default:throw Error(l(161))}}catch(he){vt(e,e.return,he)}e.flags&=-3}n&4096&&(e.flags&=-4097)}function eh(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var n=e;eh(n),n.tag===5&&n.flags&1024&&n.stateNode.reset(),e=e.sibling}}function ja(e,n){if(n.subtreeFlags&8772)for(n=n.child;n!==null;)Ym(e,n.alternate,n),n=n.sibling}function Yi(e){for(e=e.child;e!==null;){var n=e;switch(n.tag){case 0:case 11:case 14:case 15:ci(4,n,n.return),Yi(n);break;case 1:oa(n,n.return);var r=n.stateNode;typeof r.componentWillUnmount=="function"&&Jm(n,n.return,r),Yi(n);break;case 27:Jl(n.stateNode);case 26:case 5:oa(n,n.return),Yi(n);break;case 22:n.memoizedState===null&&Yi(n);break;case 30:Yi(n);break;default:Yi(n)}e=e.sibling}}function Ba(e,n,r){for(r=r&&(n.subtreeFlags&8772)!==0,n=n.child;n!==null;){var s=n.alternate,f=e,p=n,A=p.flags;switch(p.tag){case 0:case 11:case 15:Ba(f,p,r),kl(4,p);break;case 1:if(Ba(f,p,r),s=p,f=s.stateNode,typeof f.componentDidMount=="function")try{f.componentDidMount()}catch(le){vt(s,s.return,le)}if(s=p,f=s.updateQueue,f!==null){var k=s.stateNode;try{var Y=f.shared.hiddenCallbacks;if(Y!==null)for(f.shared.hiddenCallbacks=null,f=0;f<Y.length;f++)Ep(Y[f],k)}catch(le){vt(s,s.return,le)}}r&&A&64&&Hm(p),Ol(p,p.return);break;case 27:Zm(p);case 26:case 5:Ba(f,p,r),r&&s===null&&A&4&&qm(p),Ol(p,p.return);break;case 12:Ba(f,p,r);break;case 31:Ba(f,p,r),r&&A&4&&Km(f,p);break;case 13:Ba(f,p,r),r&&A&4&&Wm(f,p);break;case 22:p.memoizedState===null&&Ba(f,p,r),Ol(p,p.return);break;case 30:break;default:Ba(f,p,r)}n=n.sibling}}function Ad(e,n){var r=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(r=e.memoizedState.cachePool.pool),e=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(e=n.memoizedState.cachePool.pool),e!==r&&(e!=null&&e.refCount++,r!=null&&yl(r))}function Ld(e,n){e=null,n.alternate!==null&&(e=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==e&&(n.refCount++,e!=null&&yl(e))}function Kn(e,n,r,s){if(n.subtreeFlags&10256)for(n=n.child;n!==null;)th(e,n,r,s),n=n.sibling}function th(e,n,r,s){var f=n.flags;switch(n.tag){case 0:case 11:case 15:Kn(e,n,r,s),f&2048&&kl(9,n);break;case 1:Kn(e,n,r,s);break;case 3:Kn(e,n,r,s),f&2048&&(e=null,n.alternate!==null&&(e=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==e&&(n.refCount++,e!=null&&yl(e)));break;case 12:if(f&2048){Kn(e,n,r,s),e=n.stateNode;try{var p=n.memoizedProps,A=p.id,k=p.onPostCommit;typeof k=="function"&&k(A,n.alternate===null?"mount":"update",e.passiveEffectDuration,-0)}catch(Y){vt(n,n.return,Y)}}else Kn(e,n,r,s);break;case 31:Kn(e,n,r,s);break;case 13:Kn(e,n,r,s);break;case 23:break;case 22:p=n.stateNode,A=n.alternate,n.memoizedState!==null?p._visibility&2?Kn(e,n,r,s):jl(e,n):p._visibility&2?Kn(e,n,r,s):(p._visibility|=2,Mr(e,n,r,s,(n.subtreeFlags&10256)!==0||!1)),f&2048&&Ad(A,n);break;case 24:Kn(e,n,r,s),f&2048&&Ld(n.alternate,n);break;default:Kn(e,n,r,s)}}function Mr(e,n,r,s,f){for(f=f&&((n.subtreeFlags&10256)!==0||!1),n=n.child;n!==null;){var p=e,A=n,k=r,Y=s,le=A.flags;switch(A.tag){case 0:case 11:case 15:Mr(p,A,k,Y,f),kl(8,A);break;case 23:break;case 22:var he=A.stateNode;A.memoizedState!==null?he._visibility&2?Mr(p,A,k,Y,f):jl(p,A):(he._visibility|=2,Mr(p,A,k,Y,f)),f&&le&2048&&Ad(A.alternate,A);break;case 24:Mr(p,A,k,Y,f),f&&le&2048&&Ld(A.alternate,A);break;default:Mr(p,A,k,Y,f)}n=n.sibling}}function jl(e,n){if(n.subtreeFlags&10256)for(n=n.child;n!==null;){var r=e,s=n,f=s.flags;switch(s.tag){case 22:jl(r,s),f&2048&&Ad(s.alternate,s);break;case 24:jl(r,s),f&2048&&Ld(s.alternate,s);break;default:jl(r,s)}n=n.sibling}}var Bl=8192;function Er(e,n,r){if(e.subtreeFlags&Bl)for(e=e.child;e!==null;)nh(e,n,r),e=e.sibling}function nh(e,n,r){switch(e.tag){case 26:Er(e,n,r),e.flags&Bl&&e.memoizedState!==null&&Ev(r,Fn,e.memoizedState,e.memoizedProps);break;case 5:Er(e,n,r);break;case 3:case 4:var s=Fn;Fn=jo(e.stateNode.containerInfo),Er(e,n,r),Fn=s;break;case 22:e.memoizedState===null&&(s=e.alternate,s!==null&&s.memoizedState!==null?(s=Bl,Bl=16777216,Er(e,n,r),Bl=s):Er(e,n,r));break;default:Er(e,n,r)}}function ah(e){var n=e.alternate;if(n!==null&&(e=n.child,e!==null)){n.child=null;do n=e.sibling,e.sibling=null,e=n;while(e!==null)}}function Pl(e){var n=e.deletions;if((e.flags&16)!==0){if(n!==null)for(var r=0;r<n.length;r++){var s=n[r];an=s,rh(s,e)}ah(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)ih(e),e=e.sibling}function ih(e){switch(e.tag){case 0:case 11:case 15:Pl(e),e.flags&2048&&ci(9,e,e.return);break;case 3:Pl(e);break;case 12:Pl(e);break;case 22:var n=e.stateNode;e.memoizedState!==null&&n._visibility&2&&(e.return===null||e.return.tag!==13)?(n._visibility&=-3,Ao(e)):Pl(e);break;default:Pl(e)}}function Ao(e){var n=e.deletions;if((e.flags&16)!==0){if(n!==null)for(var r=0;r<n.length;r++){var s=n[r];an=s,rh(s,e)}ah(e)}for(e=e.child;e!==null;){switch(n=e,n.tag){case 0:case 11:case 15:ci(8,n,n.return),Ao(n);break;case 22:r=n.stateNode,r._visibility&2&&(r._visibility&=-3,Ao(n));break;default:Ao(n)}e=e.sibling}}function rh(e,n){for(;an!==null;){var r=an;switch(r.tag){case 0:case 11:case 15:ci(8,r,n);break;case 23:case 22:if(r.memoizedState!==null&&r.memoizedState.cachePool!==null){var s=r.memoizedState.cachePool.pool;s!=null&&s.refCount++}break;case 24:yl(r.memoizedState.cache)}if(s=r.child,s!==null)s.return=r,an=s;else e:for(r=e;an!==null;){s=an;var f=s.sibling,p=s.return;if(Xm(s),s===r){an=null;break e}if(f!==null){f.return=p,an=f;break e}an=p}}}var Zy={getCacheForType:function(e){var n=ln(Yt),r=n.data.get(e);return r===void 0&&(r=e(),n.data.set(e,r)),r},cacheSignal:function(){return ln(Yt).controller.signal}},Gy=typeof WeakMap=="function"?WeakMap:Map,gt=0,Dt=null,it=null,ot=0,yt=0,En=null,ui=!1,Rr=!1,wd=!1,Pa=0,Bt=0,di=0,Xi=0,Dd=0,Rn=0,kr=0,zl=null,An=null,Cd=!1,Lo=0,lh=0,wo=1/0,Do=null,fi=null,en=0,pi=null,Or=null,za=0,Sd=0,Nd=null,sh=null,Ul=0,Td=null;function kn(){return(gt&2)!==0&&ot!==0?ot&-ot:R.T!==null?jd():It()}function oh(){if(Rn===0)if((ot&536870912)===0||ft){var e=hn;hn<<=1,(hn&3932160)===0&&(hn=262144),Rn=e}else Rn=536870912;return e=Tn.current,e!==null&&(e.flags|=32),Rn}function Ln(e,n,r){(e===Dt&&(yt===2||yt===9)||e.cancelPendingCommit!==null)&&(jr(e,0),mi(e,ot,Rn,!1)),Je(e,r),((gt&2)===0||e!==Dt)&&(e===Dt&&((gt&2)===0&&(Xi|=r),Bt===4&&mi(e,ot,Rn,!1)),ca(e))}function ch(e,n,r){if((gt&6)!==0)throw Error(l(327));var s=!r&&(n&127)===0&&(n&e.expiredLanes)===0||q(e,n),f=s?Fy(e,n):Ed(e,n,!0),p=s;do{if(f===0){Rr&&!s&&mi(e,n,0,!1);break}else{if(r=e.current.alternate,p&&!Yy(r)){f=Ed(e,n,!1),p=!1;continue}if(f===2){if(p=n,e.errorRecoveryDisabledLanes&p)var A=0;else A=e.pendingLanes&-536870913,A=A!==0?A:A&536870912?536870912:0;if(A!==0){n=A;e:{var k=e;f=zl;var Y=k.current.memoizedState.isDehydrated;if(Y&&(jr(k,A).flags|=256),A=Ed(k,A,!1),A!==2){if(wd&&!Y){k.errorRecoveryDisabledLanes|=p,Xi|=p,f=4;break e}p=An,An=f,p!==null&&(An===null?An=p:An.push.apply(An,p))}f=A}if(p=!1,f!==2)continue}}if(f===1){jr(e,0),mi(e,n,0,!0);break}e:{switch(s=e,p=f,p){case 0:case 1:throw Error(l(345));case 4:if((n&4194048)!==n)break;case 6:mi(s,n,Rn,!ui);break e;case 2:An=null;break;case 3:case 5:break;default:throw Error(l(329))}if((n&62914560)===n&&(f=Lo+300-me(),10<f)){if(mi(s,n,Rn,!ui),O(s,0,!0)!==0)break e;za=n,s.timeoutHandle=$h(uh.bind(null,s,r,An,Do,Cd,n,Rn,Xi,kr,ui,p,"Throttled",-0,0),f);break e}uh(s,r,An,Do,Cd,n,Rn,Xi,kr,ui,p,null,-0,0)}}break}while(!0);ca(e)}function uh(e,n,r,s,f,p,A,k,Y,le,he,Ae,se,ce){if(e.timeoutHandle=-1,Ae=n.subtreeFlags,Ae&8192||(Ae&16785408)===16785408){Ae={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:La},nh(n,p,Ae);var je=(p&62914560)===p?Lo-me():(p&4194048)===p?lh-me():0;if(je=Rv(Ae,je),je!==null){za=p,e.cancelPendingCommit=je(_h.bind(null,e,n,p,r,s,f,A,k,Y,he,Ae,null,se,ce)),mi(e,p,A,!le);return}}_h(e,n,p,r,s,f,A,k,Y)}function Yy(e){for(var n=e;;){var r=n.tag;if((r===0||r===11||r===15)&&n.flags&16384&&(r=n.updateQueue,r!==null&&(r=r.stores,r!==null)))for(var s=0;s<r.length;s++){var f=r[s],p=f.getSnapshot;f=f.value;try{if(!Sn(p(),f))return!1}catch{return!1}}if(r=n.child,n.subtreeFlags&16384&&r!==null)r.return=n,n=r;else{if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return!0;n=n.return}n.sibling.return=n.return,n=n.sibling}}return!0}function mi(e,n,r,s){n&=~Dd,n&=~Xi,e.suspendedLanes|=n,e.pingedLanes&=~n,s&&(e.warmLanes|=n),s=e.expirationTimes;for(var f=n;0<f;){var p=31-Ut(f),A=1<<p;s[p]=-1,f&=~A}r!==0&&Et(e,r,n)}function Co(){return(gt&6)===0?($l(0),!1):!0}function Md(){if(it!==null){if(yt===0)var e=it.return;else e=it,Sa=$i=null,Zu(e),Dr=null,Al=0,e=it;for(;e!==null;)Im(e.alternate,e),e=e.return;it=null}}function jr(e,n){var r=e.timeoutHandle;r!==-1&&(e.timeoutHandle=-1,mv(r)),r=e.cancelPendingCommit,r!==null&&(e.cancelPendingCommit=null,r()),za=0,Md(),Dt=e,it=r=Da(e.current,null),ot=n,yt=0,En=null,ui=!1,Rr=q(e,n),wd=!1,kr=Rn=Dd=Xi=di=Bt=0,An=zl=null,Cd=!1,(n&8)!==0&&(n|=n&32);var s=e.entangledLanes;if(s!==0)for(e=e.entanglements,s&=n;0<s;){var f=31-Ut(s),p=1<<f;n|=e[f],s&=~p}return Pa=n,Zs(),r}function dh(e,n){We=null,R.H=Ml,n===wr||n===eo?(n=Sp(),yt=3):n===Ou?(n=Sp(),yt=4):yt=n===od?8:n!==null&&typeof n=="object"&&typeof n.then=="function"?6:1,En=n,it===null&&(Bt=1,ho(e,zn(n,e.current)))}function fh(){var e=Tn.current;return e===null?!0:(ot&4194048)===ot?Hn===null:(ot&62914560)===ot||(ot&536870912)!==0?e===Hn:!1}function ph(){var e=R.H;return R.H=Ml,e===null?Ml:e}function mh(){var e=R.A;return R.A=Zy,e}function So(){Bt=4,ui||(ot&4194048)!==ot&&Tn.current!==null||(Rr=!0),(di&134217727)===0&&(Xi&134217727)===0||Dt===null||mi(Dt,ot,Rn,!1)}function Ed(e,n,r){var s=gt;gt|=2;var f=ph(),p=mh();(Dt!==e||ot!==n)&&(Do=null,jr(e,n)),n=!1;var A=Bt;e:do try{if(yt!==0&&it!==null){var k=it,Y=En;switch(yt){case 8:Md(),A=6;break e;case 3:case 2:case 9:case 6:Tn.current===null&&(n=!0);var le=yt;if(yt=0,En=null,Br(e,k,Y,le),r&&Rr){A=0;break e}break;default:le=yt,yt=0,En=null,Br(e,k,Y,le)}}Xy(),A=Bt;break}catch(he){dh(e,he)}while(!0);return n&&e.shellSuspendCounter++,Sa=$i=null,gt=s,R.H=f,R.A=p,it===null&&(Dt=null,ot=0,Zs()),A}function Xy(){for(;it!==null;)hh(it)}function Fy(e,n){var r=gt;gt|=2;var s=ph(),f=mh();Dt!==e||ot!==n?(Do=null,wo=me()+500,jr(e,n)):Rr=q(e,n);e:do try{if(yt!==0&&it!==null){n=it;var p=En;t:switch(yt){case 1:yt=0,En=null,Br(e,n,p,1);break;case 2:case 9:if(Dp(p)){yt=0,En=null,xh(n);break}n=function(){yt!==2&&yt!==9||Dt!==e||(yt=7),ca(e)},p.then(n,n);break e;case 3:yt=7;break e;case 4:yt=5;break e;case 7:Dp(p)?(yt=0,En=null,xh(n)):(yt=0,En=null,Br(e,n,p,7));break;case 5:var A=null;switch(it.tag){case 26:A=it.memoizedState;case 5:case 27:var k=it;if(A?t1(A):k.stateNode.complete){yt=0,En=null;var Y=k.sibling;if(Y!==null)it=Y;else{var le=k.return;le!==null?(it=le,No(le)):it=null}break t}}yt=0,En=null,Br(e,n,p,5);break;case 6:yt=0,En=null,Br(e,n,p,6);break;case 8:Md(),Bt=6;break e;default:throw Error(l(462))}}Ky();break}catch(he){dh(e,he)}while(!0);return Sa=$i=null,R.H=s,R.A=f,gt=r,it!==null?0:(Dt=null,ot=0,Zs(),Bt)}function Ky(){for(;it!==null&&!Ee();)hh(it)}function hh(e){var n=Um(e.alternate,e,Pa);e.memoizedProps=e.pendingProps,n===null?No(e):it=n}function xh(e){var n=e,r=n.alternate;switch(n.tag){case 15:case 0:n=km(r,n,n.pendingProps,n.type,void 0,ot);break;case 11:n=km(r,n,n.pendingProps,n.type.render,n.ref,ot);break;case 5:Zu(n);default:Im(r,n),n=it=mp(n,Pa),n=Um(r,n,Pa)}e.memoizedProps=e.pendingProps,n===null?No(e):it=n}function Br(e,n,r,s){Sa=$i=null,Zu(n),Dr=null,Al=0;var f=n.return;try{if(Uy(e,f,n,r,ot)){Bt=1,ho(e,zn(r,e.current)),it=null;return}}catch(p){if(f!==null)throw it=f,p;Bt=1,ho(e,zn(r,e.current)),it=null;return}n.flags&32768?(ft||s===1?e=!0:Rr||(ot&536870912)!==0?e=!1:(ui=e=!0,(s===2||s===9||s===3||s===6)&&(s=Tn.current,s!==null&&s.tag===13&&(s.flags|=16384))),gh(n,e)):No(n)}function No(e){var n=e;do{if((n.flags&32768)!==0){gh(n,ui);return}e=n.return;var r=Hy(n.alternate,n,Pa);if(r!==null){it=r;return}if(n=n.sibling,n!==null){it=n;return}it=n=e}while(n!==null);Bt===0&&(Bt=5)}function gh(e,n){do{var r=Jy(e.alternate,e);if(r!==null){r.flags&=32767,it=r;return}if(r=e.return,r!==null&&(r.flags|=32768,r.subtreeFlags=0,r.deletions=null),!n&&(e=e.sibling,e!==null)){it=e;return}it=e=r}while(e!==null);Bt=6,it=null}function _h(e,n,r,s,f,p,A,k,Y){e.cancelPendingCommit=null;do To();while(en!==0);if((gt&6)!==0)throw Error(l(327));if(n!==null){if(n===e.current)throw Error(l(177));if(p=n.lanes|n.childLanes,p|=bu,bt(e,r,p,A,k,Y),e===Dt&&(it=Dt=null,ot=0),Or=n,pi=e,za=r,Sd=p,Nd=f,sh=s,(n.subtreeFlags&10256)!==0||(n.flags&10256)!==0?(e.callbackNode=null,e.callbackPriority=0,tv(st,function(){return Lh(),null})):(e.callbackNode=null,e.callbackPriority=0),s=(n.flags&13878)!==0,(n.subtreeFlags&13878)!==0||s){s=R.T,R.T=null,f=Z.p,Z.p=2,A=gt,gt|=4;try{qy(e,n,r)}finally{gt=A,Z.p=f,R.T=s}}en=1,bh(),yh(),vh()}}function bh(){if(en===1){en=0;var e=pi,n=Or,r=(n.flags&13878)!==0;if((n.subtreeFlags&13878)!==0||r){r=R.T,R.T=null;var s=Z.p;Z.p=2;var f=gt;gt|=4;try{Qm(n,e);var p=Jd,A=rp(e.containerInfo),k=p.focusedElem,Y=p.selectionRange;if(A!==k&&k&&k.ownerDocument&&ip(k.ownerDocument.documentElement,k)){if(Y!==null&&mu(k)){var le=Y.start,he=Y.end;if(he===void 0&&(he=le),"selectionStart"in k)k.selectionStart=le,k.selectionEnd=Math.min(he,k.value.length);else{var Ae=k.ownerDocument||document,se=Ae&&Ae.defaultView||window;if(se.getSelection){var ce=se.getSelection(),je=k.textContent.length,qe=Math.min(Y.start,je),wt=Y.end===void 0?qe:Math.min(Y.end,je);!ce.extend&&qe>wt&&(A=wt,wt=qe,qe=A);var ae=ap(k,qe),W=ap(k,wt);if(ae&&W&&(ce.rangeCount!==1||ce.anchorNode!==ae.node||ce.anchorOffset!==ae.offset||ce.focusNode!==W.node||ce.focusOffset!==W.offset)){var re=Ae.createRange();re.setStart(ae.node,ae.offset),ce.removeAllRanges(),qe>wt?(ce.addRange(re),ce.extend(W.node,W.offset)):(re.setEnd(W.node,W.offset),ce.addRange(re))}}}}for(Ae=[],ce=k;ce=ce.parentNode;)ce.nodeType===1&&Ae.push({element:ce,left:ce.scrollLeft,top:ce.scrollTop});for(typeof k.focus=="function"&&k.focus(),k=0;k<Ae.length;k++){var _e=Ae[k];_e.element.scrollLeft=_e.left,_e.element.scrollTop=_e.top}}Io=!!Hd,Jd=Hd=null}finally{gt=f,Z.p=s,R.T=r}}e.current=n,en=2}}function yh(){if(en===2){en=0;var e=pi,n=Or,r=(n.flags&8772)!==0;if((n.subtreeFlags&8772)!==0||r){r=R.T,R.T=null;var s=Z.p;Z.p=2;var f=gt;gt|=4;try{Ym(e,n.alternate,n)}finally{gt=f,Z.p=s,R.T=r}}en=3}}function vh(){if(en===4||en===3){en=0,$e();var e=pi,n=Or,r=za,s=sh;(n.subtreeFlags&10256)!==0||(n.flags&10256)!==0?en=5:(en=0,Or=pi=null,Ah(e,e.pendingLanes));var f=e.pendingLanes;if(f===0&&(fi=null),ut(r),n=n.stateNode,zt&&typeof zt.onCommitFiberRoot=="function")try{zt.onCommitFiberRoot(Bn,n,void 0,(n.current.flags&128)===128)}catch{}if(s!==null){n=R.T,f=Z.p,Z.p=2,R.T=null;try{for(var p=e.onRecoverableError,A=0;A<s.length;A++){var k=s[A];p(k.value,{componentStack:k.stack})}}finally{R.T=n,Z.p=f}}(za&3)!==0&&To(),ca(e),f=e.pendingLanes,(r&261930)!==0&&(f&42)!==0?e===Td?Ul++:(Ul=0,Td=e):Ul=0,$l(0)}}function Ah(e,n){(e.pooledCacheLanes&=n)===0&&(n=e.pooledCache,n!=null&&(e.pooledCache=null,yl(n)))}function To(){return bh(),yh(),vh(),Lh()}function Lh(){if(en!==5)return!1;var e=pi,n=Sd;Sd=0;var r=ut(za),s=R.T,f=Z.p;try{Z.p=32>r?32:r,R.T=null,r=Nd,Nd=null;var p=pi,A=za;if(en=0,Or=pi=null,za=0,(gt&6)!==0)throw Error(l(331));var k=gt;if(gt|=4,ih(p.current),th(p,p.current,A,r),gt=k,$l(0,!1),zt&&typeof zt.onPostCommitFiberRoot=="function")try{zt.onPostCommitFiberRoot(Bn,p)}catch{}return!0}finally{Z.p=f,R.T=s,Ah(e,n)}}function wh(e,n,r){n=zn(r,n),n=sd(e.stateNode,n,2),e=li(e,n,2),e!==null&&(Je(e,2),ca(e))}function vt(e,n,r){if(e.tag===3)wh(e,e,r);else for(;n!==null;){if(n.tag===3){wh(n,e,r);break}else if(n.tag===1){var s=n.stateNode;if(typeof n.type.getDerivedStateFromError=="function"||typeof s.componentDidCatch=="function"&&(fi===null||!fi.has(s))){e=zn(r,e),r=Dm(2),s=li(n,r,2),s!==null&&(Cm(r,s,n,e),Je(s,2),ca(s));break}}n=n.return}}function Rd(e,n,r){var s=e.pingCache;if(s===null){s=e.pingCache=new Gy;var f=new Set;s.set(n,f)}else f=s.get(n),f===void 0&&(f=new Set,s.set(n,f));f.has(r)||(wd=!0,f.add(r),e=Wy.bind(null,e,n,r),n.then(e,e))}function Wy(e,n,r){var s=e.pingCache;s!==null&&s.delete(n),e.pingedLanes|=e.suspendedLanes&r,e.warmLanes&=~r,Dt===e&&(ot&r)===r&&(Bt===4||Bt===3&&(ot&62914560)===ot&&300>me()-Lo?(gt&2)===0&&jr(e,0):Dd|=r,kr===ot&&(kr=0)),ca(e)}function Dh(e,n){n===0&&(n=fe()),e=Pi(e,n),e!==null&&(Je(e,n),ca(e))}function Qy(e){var n=e.memoizedState,r=0;n!==null&&(r=n.retryLane),Dh(e,r)}function ev(e,n){var r=0;switch(e.tag){case 31:case 13:var s=e.stateNode,f=e.memoizedState;f!==null&&(r=f.retryLane);break;case 19:s=e.stateNode;break;case 22:s=e.stateNode._retryCache;break;default:throw Error(l(314))}s!==null&&s.delete(n),Dh(e,r)}function tv(e,n){return St(e,n)}var Mo=null,Pr=null,kd=!1,Eo=!1,Od=!1,hi=0;function ca(e){e!==Pr&&e.next===null&&(Pr===null?Mo=Pr=e:Pr=Pr.next=e),Eo=!0,kd||(kd=!0,av())}function $l(e,n){if(!Od&&Eo){Od=!0;do for(var r=!1,s=Mo;s!==null;){if(e!==0){var f=s.pendingLanes;if(f===0)var p=0;else{var A=s.suspendedLanes,k=s.pingedLanes;p=(1<<31-Ut(42|e)+1)-1,p&=f&~(A&~k),p=p&201326741?p&201326741|1:p?p|2:0}p!==0&&(r=!0,Th(s,p))}else p=ot,p=O(s,s===Dt?p:0,s.cancelPendingCommit!==null||s.timeoutHandle!==-1),(p&3)===0||q(s,p)||(r=!0,Th(s,p));s=s.next}while(r);Od=!1}}function nv(){Ch()}function Ch(){Eo=kd=!1;var e=0;hi!==0&&pv()&&(e=hi);for(var n=me(),r=null,s=Mo;s!==null;){var f=s.next,p=Sh(s,n);p===0?(s.next=null,r===null?Mo=f:r.next=f,f===null&&(Pr=r)):(r=s,(e!==0||(p&3)!==0)&&(Eo=!0)),s=f}en!==0&&en!==5||$l(e),hi!==0&&(hi=0)}function Sh(e,n){for(var r=e.suspendedLanes,s=e.pingedLanes,f=e.expirationTimes,p=e.pendingLanes&-62914561;0<p;){var A=31-Ut(p),k=1<<A,Y=f[A];Y===-1?((k&r)===0||(k&s)!==0)&&(f[A]=ie(k,n)):Y<=n&&(e.expiredLanes|=k),p&=~k}if(n=Dt,r=ot,r=O(e,e===n?r:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),s=e.callbackNode,r===0||e===n&&(yt===2||yt===9)||e.cancelPendingCommit!==null)return s!==null&&s!==null&&we(s),e.callbackNode=null,e.callbackPriority=0;if((r&3)===0||q(e,r)){if(n=r&-r,n===e.callbackPriority)return n;switch(s!==null&&we(s),ut(r)){case 2:case 8:r=nt;break;case 32:r=st;break;case 268435456:r=Dn;break;default:r=st}return s=Nh.bind(null,e),r=St(r,s),e.callbackPriority=n,e.callbackNode=r,n}return s!==null&&s!==null&&we(s),e.callbackPriority=2,e.callbackNode=null,2}function Nh(e,n){if(en!==0&&en!==5)return e.callbackNode=null,e.callbackPriority=0,null;var r=e.callbackNode;if(To()&&e.callbackNode!==r)return null;var s=ot;return s=O(e,e===Dt?s:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),s===0?null:(ch(e,s,n),Sh(e,me()),e.callbackNode!=null&&e.callbackNode===r?Nh.bind(null,e):null)}function Th(e,n){if(To())return null;ch(e,n,!0)}function av(){hv(function(){(gt&6)!==0?St(Se,nv):Ch()})}function jd(){if(hi===0){var e=Ar;e===0&&(e=Cn,Cn<<=1,(Cn&261888)===0&&(Cn=256)),hi=e}return hi}function Mh(e){return e==null||typeof e=="symbol"||typeof e=="boolean"?null:typeof e=="function"?e:zs(""+e)}function Eh(e,n){var r=n.ownerDocument.createElement("input");return r.name=n.name,r.value=n.value,e.id&&r.setAttribute("form",e.id),n.parentNode.insertBefore(r,n),e=new FormData(e),r.parentNode.removeChild(r),e}function iv(e,n,r,s,f){if(n==="submit"&&r&&r.stateNode===f){var p=Mh((f[Re]||null).action),A=s.submitter;A&&(n=(n=A[Re]||null)?Mh(n.formAction):A.getAttribute("formAction"),n!==null&&(p=n,A=null));var k=new Hs("action","action",null,s,f);e.push({event:k,listeners:[{instance:null,listener:function(){if(s.defaultPrevented){if(hi!==0){var Y=A?Eh(f,A):new FormData(f);td(r,{pending:!0,data:Y,method:f.method,action:p},null,Y)}}else typeof p=="function"&&(k.preventDefault(),Y=A?Eh(f,A):new FormData(f),td(r,{pending:!0,data:Y,method:f.method,action:p},p,Y))},currentTarget:f}]})}}for(var Bd=0;Bd<_u.length;Bd++){var Pd=_u[Bd],rv=Pd.toLowerCase(),lv=Pd[0].toUpperCase()+Pd.slice(1);Xn(rv,"on"+lv)}Xn(op,"onAnimationEnd"),Xn(cp,"onAnimationIteration"),Xn(up,"onAnimationStart"),Xn("dblclick","onDoubleClick"),Xn("focusin","onFocus"),Xn("focusout","onBlur"),Xn(Ay,"onTransitionRun"),Xn(Ly,"onTransitionStart"),Xn(wy,"onTransitionCancel"),Xn(dp,"onTransitionEnd"),Ka("onMouseEnter",["mouseout","mouseover"]),Ka("onMouseLeave",["mouseout","mouseover"]),Ka("onPointerEnter",["pointerout","pointerover"]),Ka("onPointerLeave",["pointerout","pointerover"]),va("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),va("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),va("onBeforeInput",["compositionend","keypress","textInput","paste"]),va("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),va("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),va("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Il="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),sv=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Il));function Rh(e,n){n=(n&4)!==0;for(var r=0;r<e.length;r++){var s=e[r],f=s.event;s=s.listeners;e:{var p=void 0;if(n)for(var A=s.length-1;0<=A;A--){var k=s[A],Y=k.instance,le=k.currentTarget;if(k=k.listener,Y!==p&&f.isPropagationStopped())break e;p=k,f.currentTarget=le;try{p(f)}catch(he){Vs(he)}f.currentTarget=null,p=Y}else for(A=0;A<s.length;A++){if(k=s[A],Y=k.instance,le=k.currentTarget,k=k.listener,Y!==p&&f.isPropagationStopped())break e;p=k,f.currentTarget=le;try{p(f)}catch(he){Vs(he)}f.currentTarget=null,p=Y}}}}function rt(e,n){var r=n[Ht];r===void 0&&(r=n[Ht]=new Set);var s=e+"__bubble";r.has(s)||(kh(n,e,2,!1),r.add(s))}function zd(e,n,r){var s=0;n&&(s|=4),kh(r,e,s,n)}var Ro="_reactListening"+Math.random().toString(36).slice(2);function Ud(e){if(!e[Ro]){e[Ro]=!0,Rs.forEach(function(r){r!=="selectionchange"&&(sv.has(r)||zd(r,!1,e),zd(r,!0,e))});var n=e.nodeType===9?e:e.ownerDocument;n===null||n[Ro]||(n[Ro]=!0,zd("selectionchange",!1,n))}}function kh(e,n,r,s){switch(o1(n)){case 2:var f=jv;break;case 8:f=Bv;break;default:f=e0}r=f.bind(null,n,r,e),f=void 0,!ru||n!=="touchstart"&&n!=="touchmove"&&n!=="wheel"||(f=!0),s?f!==void 0?e.addEventListener(n,r,{capture:!0,passive:f}):e.addEventListener(n,r,!0):f!==void 0?e.addEventListener(n,r,{passive:f}):e.addEventListener(n,r,!1)}function $d(e,n,r,s,f){var p=s;if((n&1)===0&&(n&2)===0&&s!==null)e:for(;;){if(s===null)return;var A=s.tag;if(A===3||A===4){var k=s.stateNode.containerInfo;if(k===f)break;if(A===4)for(A=s.return;A!==null;){var Y=A.tag;if((Y===3||Y===4)&&A.stateNode.containerInfo===f)return;A=A.return}for(;k!==null;){if(A=Ga(k),A===null)return;if(Y=A.tag,Y===5||Y===6||Y===26||Y===27){s=p=A;continue e}k=k.parentNode}}s=s.return}zf(function(){var le=p,he=au(r),Ae=[];e:{var se=fp.get(e);if(se!==void 0){var ce=Hs,je=e;switch(e){case"keypress":if($s(r)===0)break e;case"keydown":case"keyup":ce=ey;break;case"focusin":je="focus",ce=cu;break;case"focusout":je="blur",ce=cu;break;case"beforeblur":case"afterblur":ce=cu;break;case"click":if(r.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":ce=If;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":ce=Hb;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":ce=ay;break;case op:case cp:case up:ce=Vb;break;case dp:ce=ry;break;case"scroll":case"scrollend":ce=$b;break;case"wheel":ce=sy;break;case"copy":case"cut":case"paste":ce=Gb;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":ce=Jf;break;case"toggle":case"beforetoggle":ce=cy}var qe=(n&4)!==0,wt=!qe&&(e==="scroll"||e==="scrollend"),ae=qe?se!==null?se+"Capture":null:se;qe=[];for(var W=le,re;W!==null;){var _e=W;if(re=_e.stateNode,_e=_e.tag,_e!==5&&_e!==26&&_e!==27||re===null||ae===null||(_e=cl(W,ae),_e!=null&&qe.push(Hl(W,_e,re))),wt)break;W=W.return}0<qe.length&&(se=new ce(se,je,null,r,he),Ae.push({event:se,listeners:qe}))}}if((n&7)===0){e:{if(se=e==="mouseover"||e==="pointerover",ce=e==="mouseout"||e==="pointerout",se&&r!==nu&&(je=r.relatedTarget||r.fromElement)&&(Ga(je)||je[dt]))break e;if((ce||se)&&(se=he.window===he?he:(se=he.ownerDocument)?se.defaultView||se.parentWindow:window,ce?(je=r.relatedTarget||r.toElement,ce=le,je=je?Ga(je):null,je!==null&&(wt=c(je),qe=je.tag,je!==wt||qe!==5&&qe!==27&&qe!==6)&&(je=null)):(ce=null,je=le),ce!==je)){if(qe=If,_e="onMouseLeave",ae="onMouseEnter",W="mouse",(e==="pointerout"||e==="pointerover")&&(qe=Jf,_e="onPointerLeave",ae="onPointerEnter",W="pointer"),wt=ce==null?se:Xa(ce),re=je==null?se:Xa(je),se=new qe(_e,W+"leave",ce,r,he),se.target=wt,se.relatedTarget=re,_e=null,Ga(he)===le&&(qe=new qe(ae,W+"enter",je,r,he),qe.target=re,qe.relatedTarget=wt,_e=qe),wt=_e,ce&&je)t:{for(qe=ov,ae=ce,W=je,re=0,_e=ae;_e;_e=qe(_e))re++;_e=0;for(var Ie=W;Ie;Ie=qe(Ie))_e++;for(;0<re-_e;)ae=qe(ae),re--;for(;0<_e-re;)W=qe(W),_e--;for(;re--;){if(ae===W||W!==null&&ae===W.alternate){qe=ae;break t}ae=qe(ae),W=qe(W)}qe=null}else qe=null;ce!==null&&Oh(Ae,se,ce,qe,!1),je!==null&&wt!==null&&Oh(Ae,wt,je,qe,!0)}}e:{if(se=le?Xa(le):window,ce=se.nodeName&&se.nodeName.toLowerCase(),ce==="select"||ce==="input"&&se.type==="file")var ht=Kf;else if(Xf(se))if(Wf)ht=by;else{ht=gy;var ze=xy}else ce=se.nodeName,!ce||ce.toLowerCase()!=="input"||se.type!=="checkbox"&&se.type!=="radio"?le&&tu(le.elementType)&&(ht=Kf):ht=_y;if(ht&&(ht=ht(e,le))){Ff(Ae,ht,r,he);break e}ze&&ze(e,se,le),e==="focusout"&&le&&se.type==="number"&&le.memoizedProps.value!=null&&ol(se,"number",se.value)}switch(ze=le?Xa(le):window,e){case"focusin":(Xf(ze)||ze.contentEditable==="true")&&(mr=ze,hu=le,gl=null);break;case"focusout":gl=hu=mr=null;break;case"mousedown":xu=!0;break;case"contextmenu":case"mouseup":case"dragend":xu=!1,lp(Ae,r,he);break;case"selectionchange":if(vy)break;case"keydown":case"keyup":lp(Ae,r,he)}var Qe;if(du)e:{switch(e){case"compositionstart":var ct="onCompositionStart";break e;case"compositionend":ct="onCompositionEnd";break e;case"compositionupdate":ct="onCompositionUpdate";break e}ct=void 0}else pr?Gf(e,r)&&(ct="onCompositionEnd"):e==="keydown"&&r.keyCode===229&&(ct="onCompositionStart");ct&&(qf&&r.locale!=="ko"&&(pr||ct!=="onCompositionStart"?ct==="onCompositionEnd"&&pr&&(Qe=Uf()):(Qa=he,lu="value"in Qa?Qa.value:Qa.textContent,pr=!0)),ze=ko(le,ct),0<ze.length&&(ct=new Hf(ct,e,null,r,he),Ae.push({event:ct,listeners:ze}),Qe?ct.data=Qe:(Qe=Yf(r),Qe!==null&&(ct.data=Qe)))),(Qe=dy?fy(e,r):py(e,r))&&(ct=ko(le,"onBeforeInput"),0<ct.length&&(ze=new Hf("onBeforeInput","beforeinput",null,r,he),Ae.push({event:ze,listeners:ct}),ze.data=Qe)),iv(Ae,e,le,r,he)}Rh(Ae,n)})}function Hl(e,n,r){return{instance:e,listener:n,currentTarget:r}}function ko(e,n){for(var r=n+"Capture",s=[];e!==null;){var f=e,p=f.stateNode;if(f=f.tag,f!==5&&f!==26&&f!==27||p===null||(f=cl(e,r),f!=null&&s.unshift(Hl(e,f,p)),f=cl(e,n),f!=null&&s.push(Hl(e,f,p))),e.tag===3)return s;e=e.return}return[]}function ov(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function Oh(e,n,r,s,f){for(var p=n._reactName,A=[];r!==null&&r!==s;){var k=r,Y=k.alternate,le=k.stateNode;if(k=k.tag,Y!==null&&Y===s)break;k!==5&&k!==26&&k!==27||le===null||(Y=le,f?(le=cl(r,p),le!=null&&A.unshift(Hl(r,le,Y))):f||(le=cl(r,p),le!=null&&A.push(Hl(r,le,Y)))),r=r.return}A.length!==0&&e.push({event:n,listeners:A})}var cv=/\r\n?/g,uv=/\u0000|\uFFFD/g;function jh(e){return(typeof e=="string"?e:""+e).replace(cv,`
`).replace(uv,"")}function Bh(e,n){return n=jh(n),jh(e)===n}function Lt(e,n,r,s,f,p){switch(r){case"children":typeof s=="string"?n==="body"||n==="textarea"&&s===""||ur(e,s):(typeof s=="number"||typeof s=="bigint")&&n!=="body"&&ur(e,""+s);break;case"className":cr(e,"class",s);break;case"tabIndex":cr(e,"tabindex",s);break;case"dir":case"role":case"viewBox":case"width":case"height":cr(e,r,s);break;case"style":Bf(e,s,p);break;case"data":if(n!=="object"){cr(e,"data",s);break}case"src":case"href":if(s===""&&(n!=="a"||r!=="href")){e.removeAttribute(r);break}if(s==null||typeof s=="function"||typeof s=="symbol"||typeof s=="boolean"){e.removeAttribute(r);break}s=zs(""+s),e.setAttribute(r,s);break;case"action":case"formAction":if(typeof s=="function"){e.setAttribute(r,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof p=="function"&&(r==="formAction"?(n!=="input"&&Lt(e,n,"name",f.name,f,null),Lt(e,n,"formEncType",f.formEncType,f,null),Lt(e,n,"formMethod",f.formMethod,f,null),Lt(e,n,"formTarget",f.formTarget,f,null)):(Lt(e,n,"encType",f.encType,f,null),Lt(e,n,"method",f.method,f,null),Lt(e,n,"target",f.target,f,null)));if(s==null||typeof s=="symbol"||typeof s=="boolean"){e.removeAttribute(r);break}s=zs(""+s),e.setAttribute(r,s);break;case"onClick":s!=null&&(e.onclick=La);break;case"onScroll":s!=null&&rt("scroll",e);break;case"onScrollEnd":s!=null&&rt("scrollend",e);break;case"dangerouslySetInnerHTML":if(s!=null){if(typeof s!="object"||!("__html"in s))throw Error(l(61));if(r=s.__html,r!=null){if(f.children!=null)throw Error(l(60));e.innerHTML=r}}break;case"multiple":e.multiple=s&&typeof s!="function"&&typeof s!="symbol";break;case"muted":e.muted=s&&typeof s!="function"&&typeof s!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(s==null||typeof s=="function"||typeof s=="boolean"||typeof s=="symbol"){e.removeAttribute("xlink:href");break}r=zs(""+s),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",r);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":s!=null&&typeof s!="function"&&typeof s!="symbol"?e.setAttribute(r,""+s):e.removeAttribute(r);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":s&&typeof s!="function"&&typeof s!="symbol"?e.setAttribute(r,""):e.removeAttribute(r);break;case"capture":case"download":s===!0?e.setAttribute(r,""):s!==!1&&s!=null&&typeof s!="function"&&typeof s!="symbol"?e.setAttribute(r,s):e.removeAttribute(r);break;case"cols":case"rows":case"size":case"span":s!=null&&typeof s!="function"&&typeof s!="symbol"&&!isNaN(s)&&1<=s?e.setAttribute(r,s):e.removeAttribute(r);break;case"rowSpan":case"start":s==null||typeof s=="function"||typeof s=="symbol"||isNaN(s)?e.removeAttribute(r):e.setAttribute(r,s);break;case"popover":rt("beforetoggle",e),rt("toggle",e),or(e,"popover",s);break;case"xlinkActuate":Yn(e,"http://www.w3.org/1999/xlink","xlink:actuate",s);break;case"xlinkArcrole":Yn(e,"http://www.w3.org/1999/xlink","xlink:arcrole",s);break;case"xlinkRole":Yn(e,"http://www.w3.org/1999/xlink","xlink:role",s);break;case"xlinkShow":Yn(e,"http://www.w3.org/1999/xlink","xlink:show",s);break;case"xlinkTitle":Yn(e,"http://www.w3.org/1999/xlink","xlink:title",s);break;case"xlinkType":Yn(e,"http://www.w3.org/1999/xlink","xlink:type",s);break;case"xmlBase":Yn(e,"http://www.w3.org/XML/1998/namespace","xml:base",s);break;case"xmlLang":Yn(e,"http://www.w3.org/XML/1998/namespace","xml:lang",s);break;case"xmlSpace":Yn(e,"http://www.w3.org/XML/1998/namespace","xml:space",s);break;case"is":or(e,"is",s);break;case"innerText":case"textContent":break;default:(!(2<r.length)||r[0]!=="o"&&r[0]!=="O"||r[1]!=="n"&&r[1]!=="N")&&(r=zb.get(r)||r,or(e,r,s))}}function Id(e,n,r,s,f,p){switch(r){case"style":Bf(e,s,p);break;case"dangerouslySetInnerHTML":if(s!=null){if(typeof s!="object"||!("__html"in s))throw Error(l(61));if(r=s.__html,r!=null){if(f.children!=null)throw Error(l(60));e.innerHTML=r}}break;case"children":typeof s=="string"?ur(e,s):(typeof s=="number"||typeof s=="bigint")&&ur(e,""+s);break;case"onScroll":s!=null&&rt("scroll",e);break;case"onScrollEnd":s!=null&&rt("scrollend",e);break;case"onClick":s!=null&&(e.onclick=La);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!ks.hasOwnProperty(r))e:{if(r[0]==="o"&&r[1]==="n"&&(f=r.endsWith("Capture"),n=r.slice(2,f?r.length-7:void 0),p=e[Re]||null,p=p!=null?p[r]:null,typeof p=="function"&&e.removeEventListener(n,p,f),typeof s=="function")){typeof p!="function"&&p!==null&&(r in e?e[r]=null:e.hasAttribute(r)&&e.removeAttribute(r)),e.addEventListener(n,s,f);break e}r in e?e[r]=s:s===!0?e.setAttribute(r,""):or(e,r,s)}}}function on(e,n,r){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":rt("error",e),rt("load",e);var s=!1,f=!1,p;for(p in r)if(r.hasOwnProperty(p)){var A=r[p];if(A!=null)switch(p){case"src":s=!0;break;case"srcSet":f=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(l(137,n));default:Lt(e,n,p,A,r,null)}}f&&Lt(e,n,"srcSet",r.srcSet,r,null),s&&Lt(e,n,"src",r.src,r,null);return;case"input":rt("invalid",e);var k=p=A=f=null,Y=null,le=null;for(s in r)if(r.hasOwnProperty(s)){var he=r[s];if(he!=null)switch(s){case"name":f=he;break;case"type":A=he;break;case"checked":Y=he;break;case"defaultChecked":le=he;break;case"value":p=he;break;case"defaultValue":k=he;break;case"children":case"dangerouslySetInnerHTML":if(he!=null)throw Error(l(137,n));break;default:Lt(e,n,s,he,r,null)}}Ps(e,p,k,Y,le,A,f,!1);return;case"select":rt("invalid",e),s=A=p=null;for(f in r)if(r.hasOwnProperty(f)&&(k=r[f],k!=null))switch(f){case"value":p=k;break;case"defaultValue":A=k;break;case"multiple":s=k;default:Lt(e,n,f,k,r,null)}n=p,r=A,e.multiple=!!s,n!=null?Aa(e,!!s,n,!1):r!=null&&Aa(e,!!s,r,!0);return;case"textarea":rt("invalid",e),p=f=s=null;for(A in r)if(r.hasOwnProperty(A)&&(k=r[A],k!=null))switch(A){case"value":s=k;break;case"defaultValue":f=k;break;case"children":p=k;break;case"dangerouslySetInnerHTML":if(k!=null)throw Error(l(91));break;default:Lt(e,n,A,k,r,null)}Of(e,s,f,p);return;case"option":for(Y in r)if(r.hasOwnProperty(Y)&&(s=r[Y],s!=null))switch(Y){case"selected":e.selected=s&&typeof s!="function"&&typeof s!="symbol";break;default:Lt(e,n,Y,s,r,null)}return;case"dialog":rt("beforetoggle",e),rt("toggle",e),rt("cancel",e),rt("close",e);break;case"iframe":case"object":rt("load",e);break;case"video":case"audio":for(s=0;s<Il.length;s++)rt(Il[s],e);break;case"image":rt("error",e),rt("load",e);break;case"details":rt("toggle",e);break;case"embed":case"source":case"link":rt("error",e),rt("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(le in r)if(r.hasOwnProperty(le)&&(s=r[le],s!=null))switch(le){case"children":case"dangerouslySetInnerHTML":throw Error(l(137,n));default:Lt(e,n,le,s,r,null)}return;default:if(tu(n)){for(he in r)r.hasOwnProperty(he)&&(s=r[he],s!==void 0&&Id(e,n,he,s,r,void 0));return}}for(k in r)r.hasOwnProperty(k)&&(s=r[k],s!=null&&Lt(e,n,k,s,r,null))}function dv(e,n,r,s){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var f=null,p=null,A=null,k=null,Y=null,le=null,he=null;for(ce in r){var Ae=r[ce];if(r.hasOwnProperty(ce)&&Ae!=null)switch(ce){case"checked":break;case"value":break;case"defaultValue":Y=Ae;default:s.hasOwnProperty(ce)||Lt(e,n,ce,null,s,Ae)}}for(var se in s){var ce=s[se];if(Ae=r[se],s.hasOwnProperty(se)&&(ce!=null||Ae!=null))switch(se){case"type":p=ce;break;case"name":f=ce;break;case"checked":le=ce;break;case"defaultChecked":he=ce;break;case"value":A=ce;break;case"defaultValue":k=ce;break;case"children":case"dangerouslySetInnerHTML":if(ce!=null)throw Error(l(137,n));break;default:ce!==Ae&&Lt(e,n,se,ce,s,Ae)}}ki(e,A,k,Y,le,he,p,f);return;case"select":ce=A=k=se=null;for(p in r)if(Y=r[p],r.hasOwnProperty(p)&&Y!=null)switch(p){case"value":break;case"multiple":ce=Y;default:s.hasOwnProperty(p)||Lt(e,n,p,null,s,Y)}for(f in s)if(p=s[f],Y=r[f],s.hasOwnProperty(f)&&(p!=null||Y!=null))switch(f){case"value":se=p;break;case"defaultValue":k=p;break;case"multiple":A=p;default:p!==Y&&Lt(e,n,f,p,s,Y)}n=k,r=A,s=ce,se!=null?Aa(e,!!r,se,!1):!!s!=!!r&&(n!=null?Aa(e,!!r,n,!0):Aa(e,!!r,r?[]:"",!1));return;case"textarea":ce=se=null;for(k in r)if(f=r[k],r.hasOwnProperty(k)&&f!=null&&!s.hasOwnProperty(k))switch(k){case"value":break;case"children":break;default:Lt(e,n,k,null,s,f)}for(A in s)if(f=s[A],p=r[A],s.hasOwnProperty(A)&&(f!=null||p!=null))switch(A){case"value":se=f;break;case"defaultValue":ce=f;break;case"children":break;case"dangerouslySetInnerHTML":if(f!=null)throw Error(l(91));break;default:f!==p&&Lt(e,n,A,f,s,p)}kf(e,se,ce);return;case"option":for(var je in r)if(se=r[je],r.hasOwnProperty(je)&&se!=null&&!s.hasOwnProperty(je))switch(je){case"selected":e.selected=!1;break;default:Lt(e,n,je,null,s,se)}for(Y in s)if(se=s[Y],ce=r[Y],s.hasOwnProperty(Y)&&se!==ce&&(se!=null||ce!=null))switch(Y){case"selected":e.selected=se&&typeof se!="function"&&typeof se!="symbol";break;default:Lt(e,n,Y,se,s,ce)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var qe in r)se=r[qe],r.hasOwnProperty(qe)&&se!=null&&!s.hasOwnProperty(qe)&&Lt(e,n,qe,null,s,se);for(le in s)if(se=s[le],ce=r[le],s.hasOwnProperty(le)&&se!==ce&&(se!=null||ce!=null))switch(le){case"children":case"dangerouslySetInnerHTML":if(se!=null)throw Error(l(137,n));break;default:Lt(e,n,le,se,s,ce)}return;default:if(tu(n)){for(var wt in r)se=r[wt],r.hasOwnProperty(wt)&&se!==void 0&&!s.hasOwnProperty(wt)&&Id(e,n,wt,void 0,s,se);for(he in s)se=s[he],ce=r[he],!s.hasOwnProperty(he)||se===ce||se===void 0&&ce===void 0||Id(e,n,he,se,s,ce);return}}for(var ae in r)se=r[ae],r.hasOwnProperty(ae)&&se!=null&&!s.hasOwnProperty(ae)&&Lt(e,n,ae,null,s,se);for(Ae in s)se=s[Ae],ce=r[Ae],!s.hasOwnProperty(Ae)||se===ce||se==null&&ce==null||Lt(e,n,Ae,se,s,ce)}function Ph(e){switch(e){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function fv(){if(typeof performance.getEntriesByType=="function"){for(var e=0,n=0,r=performance.getEntriesByType("resource"),s=0;s<r.length;s++){var f=r[s],p=f.transferSize,A=f.initiatorType,k=f.duration;if(p&&k&&Ph(A)){for(A=0,k=f.responseEnd,s+=1;s<r.length;s++){var Y=r[s],le=Y.startTime;if(le>k)break;var he=Y.transferSize,Ae=Y.initiatorType;he&&Ph(Ae)&&(Y=Y.responseEnd,A+=he*(Y<k?1:(k-le)/(Y-le)))}if(--s,n+=8*(p+A)/(f.duration/1e3),e++,10<e)break}}if(0<e)return n/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e=="number")?e:5}var Hd=null,Jd=null;function Oo(e){return e.nodeType===9?e:e.ownerDocument}function zh(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function Uh(e,n){if(e===0)switch(n){case"svg":return 1;case"math":return 2;default:return 0}return e===1&&n==="foreignObject"?0:e}function qd(e,n){return e==="textarea"||e==="noscript"||typeof n.children=="string"||typeof n.children=="number"||typeof n.children=="bigint"||typeof n.dangerouslySetInnerHTML=="object"&&n.dangerouslySetInnerHTML!==null&&n.dangerouslySetInnerHTML.__html!=null}var Vd=null;function pv(){var e=window.event;return e&&e.type==="popstate"?e===Vd?!1:(Vd=e,!0):(Vd=null,!1)}var $h=typeof setTimeout=="function"?setTimeout:void 0,mv=typeof clearTimeout=="function"?clearTimeout:void 0,Ih=typeof Promise=="function"?Promise:void 0,hv=typeof queueMicrotask=="function"?queueMicrotask:typeof Ih<"u"?function(e){return Ih.resolve(null).then(e).catch(xv)}:$h;function xv(e){setTimeout(function(){throw e})}function xi(e){return e==="head"}function Hh(e,n){var r=n,s=0;do{var f=r.nextSibling;if(e.removeChild(r),f&&f.nodeType===8)if(r=f.data,r==="/$"||r==="/&"){if(s===0){e.removeChild(f),Ir(n);return}s--}else if(r==="$"||r==="$?"||r==="$~"||r==="$!"||r==="&")s++;else if(r==="html")Jl(e.ownerDocument.documentElement);else if(r==="head"){r=e.ownerDocument.head,Jl(r);for(var p=r.firstChild;p;){var A=p.nextSibling,k=p.nodeName;p[Ei]||k==="SCRIPT"||k==="STYLE"||k==="LINK"&&p.rel.toLowerCase()==="stylesheet"||r.removeChild(p),p=A}}else r==="body"&&Jl(e.ownerDocument.body);r=f}while(r);Ir(n)}function Jh(e,n){var r=e;e=0;do{var s=r.nextSibling;if(r.nodeType===1?n?(r._stashedDisplay=r.style.display,r.style.display="none"):(r.style.display=r._stashedDisplay||"",r.getAttribute("style")===""&&r.removeAttribute("style")):r.nodeType===3&&(n?(r._stashedText=r.nodeValue,r.nodeValue=""):r.nodeValue=r._stashedText||""),s&&s.nodeType===8)if(r=s.data,r==="/$"){if(e===0)break;e--}else r!=="$"&&r!=="$?"&&r!=="$~"&&r!=="$!"||e++;r=s}while(r)}function Zd(e){var n=e.firstChild;for(n&&n.nodeType===10&&(n=n.nextSibling);n;){var r=n;switch(n=n.nextSibling,r.nodeName){case"HTML":case"HEAD":case"BODY":Zd(r),ll(r);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(r.rel.toLowerCase()==="stylesheet")continue}e.removeChild(r)}}function gv(e,n,r,s){for(;e.nodeType===1;){var f=r;if(e.nodeName.toLowerCase()!==n.toLowerCase()){if(!s&&(e.nodeName!=="INPUT"||e.type!=="hidden"))break}else if(s){if(!e[Ei])switch(n){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if(p=e.getAttribute("rel"),p==="stylesheet"&&e.hasAttribute("data-precedence"))break;if(p!==f.rel||e.getAttribute("href")!==(f.href==null||f.href===""?null:f.href)||e.getAttribute("crossorigin")!==(f.crossOrigin==null?null:f.crossOrigin)||e.getAttribute("title")!==(f.title==null?null:f.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(p=e.getAttribute("src"),(p!==(f.src==null?null:f.src)||e.getAttribute("type")!==(f.type==null?null:f.type)||e.getAttribute("crossorigin")!==(f.crossOrigin==null?null:f.crossOrigin))&&p&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else if(n==="input"&&e.type==="hidden"){var p=f.name==null?null:""+f.name;if(f.type==="hidden"&&e.getAttribute("name")===p)return e}else return e;if(e=Jn(e.nextSibling),e===null)break}return null}function _v(e,n,r){if(n==="")return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!r||(e=Jn(e.nextSibling),e===null))return null;return e}function qh(e,n){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!n||(e=Jn(e.nextSibling),e===null))return null;return e}function Gd(e){return e.data==="$?"||e.data==="$~"}function Yd(e){return e.data==="$!"||e.data==="$?"&&e.ownerDocument.readyState!=="loading"}function bv(e,n){var r=e.ownerDocument;if(e.data==="$~")e._reactRetry=n;else if(e.data!=="$?"||r.readyState!=="loading")n();else{var s=function(){n(),r.removeEventListener("DOMContentLoaded",s)};r.addEventListener("DOMContentLoaded",s),e._reactRetry=s}}function Jn(e){for(;e!=null;e=e.nextSibling){var n=e.nodeType;if(n===1||n===3)break;if(n===8){if(n=e.data,n==="$"||n==="$!"||n==="$?"||n==="$~"||n==="&"||n==="F!"||n==="F")break;if(n==="/$"||n==="/&")return null}}return e}var Xd=null;function Vh(e){e=e.nextSibling;for(var n=0;e;){if(e.nodeType===8){var r=e.data;if(r==="/$"||r==="/&"){if(n===0)return Jn(e.nextSibling);n--}else r!=="$"&&r!=="$!"&&r!=="$?"&&r!=="$~"&&r!=="&"||n++}e=e.nextSibling}return null}function Zh(e){e=e.previousSibling;for(var n=0;e;){if(e.nodeType===8){var r=e.data;if(r==="$"||r==="$!"||r==="$?"||r==="$~"||r==="&"){if(n===0)return e;n--}else r!=="/$"&&r!=="/&"||n++}e=e.previousSibling}return null}function Gh(e,n,r){switch(n=Oo(r),e){case"html":if(e=n.documentElement,!e)throw Error(l(452));return e;case"head":if(e=n.head,!e)throw Error(l(453));return e;case"body":if(e=n.body,!e)throw Error(l(454));return e;default:throw Error(l(451))}}function Jl(e){for(var n=e.attributes;n.length;)e.removeAttributeNode(n[0]);ll(e)}var qn=new Map,Yh=new Set;function jo(e){return typeof e.getRootNode=="function"?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var Ua=Z.d;Z.d={f:yv,r:vv,D:Av,C:Lv,L:wv,m:Dv,X:Sv,S:Cv,M:Nv};function yv(){var e=Ua.f(),n=Co();return e||n}function vv(e){var n=Ya(e);n!==null&&n.tag===5&&n.type==="form"?dm(n):Ua.r(e)}var zr=typeof document>"u"?null:document;function Xh(e,n,r){var s=zr;if(s&&typeof n=="string"&&n){var f=gn(n);f='link[rel="'+e+'"][href="'+f+'"]',typeof r=="string"&&(f+='[crossorigin="'+r+'"]'),Yh.has(f)||(Yh.add(f),e={rel:e,crossOrigin:r,href:n},s.querySelector(f)===null&&(n=s.createElement("link"),on(n,"link",e),Gt(n),s.head.appendChild(n)))}}function Av(e){Ua.D(e),Xh("dns-prefetch",e,null)}function Lv(e,n){Ua.C(e,n),Xh("preconnect",e,n)}function wv(e,n,r){Ua.L(e,n,r);var s=zr;if(s&&e&&n){var f='link[rel="preload"][as="'+gn(n)+'"]';n==="image"&&r&&r.imageSrcSet?(f+='[imagesrcset="'+gn(r.imageSrcSet)+'"]',typeof r.imageSizes=="string"&&(f+='[imagesizes="'+gn(r.imageSizes)+'"]')):f+='[href="'+gn(e)+'"]';var p=f;switch(n){case"style":p=Ur(e);break;case"script":p=$r(e)}qn.has(p)||(e=g({rel:"preload",href:n==="image"&&r&&r.imageSrcSet?void 0:e,as:n},r),qn.set(p,e),s.querySelector(f)!==null||n==="style"&&s.querySelector(ql(p))||n==="script"&&s.querySelector(Vl(p))||(n=s.createElement("link"),on(n,"link",e),Gt(n),s.head.appendChild(n)))}}function Dv(e,n){Ua.m(e,n);var r=zr;if(r&&e){var s=n&&typeof n.as=="string"?n.as:"script",f='link[rel="modulepreload"][as="'+gn(s)+'"][href="'+gn(e)+'"]',p=f;switch(s){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":p=$r(e)}if(!qn.has(p)&&(e=g({rel:"modulepreload",href:e},n),qn.set(p,e),r.querySelector(f)===null)){switch(s){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(r.querySelector(Vl(p)))return}s=r.createElement("link"),on(s,"link",e),Gt(s),r.head.appendChild(s)}}}function Cv(e,n,r){Ua.S(e,n,r);var s=zr;if(s&&e){var f=Fa(s).hoistableStyles,p=Ur(e);n=n||"default";var A=f.get(p);if(!A){var k={loading:0,preload:null};if(A=s.querySelector(ql(p)))k.loading=5;else{e=g({rel:"stylesheet",href:e,"data-precedence":n},r),(r=qn.get(p))&&Fd(e,r);var Y=A=s.createElement("link");Gt(Y),on(Y,"link",e),Y._p=new Promise(function(le,he){Y.onload=le,Y.onerror=he}),Y.addEventListener("load",function(){k.loading|=1}),Y.addEventListener("error",function(){k.loading|=2}),k.loading|=4,Bo(A,n,s)}A={type:"stylesheet",instance:A,count:1,state:k},f.set(p,A)}}}function Sv(e,n){Ua.X(e,n);var r=zr;if(r&&e){var s=Fa(r).hoistableScripts,f=$r(e),p=s.get(f);p||(p=r.querySelector(Vl(f)),p||(e=g({src:e,async:!0},n),(n=qn.get(f))&&Kd(e,n),p=r.createElement("script"),Gt(p),on(p,"link",e),r.head.appendChild(p)),p={type:"script",instance:p,count:1,state:null},s.set(f,p))}}function Nv(e,n){Ua.M(e,n);var r=zr;if(r&&e){var s=Fa(r).hoistableScripts,f=$r(e),p=s.get(f);p||(p=r.querySelector(Vl(f)),p||(e=g({src:e,async:!0,type:"module"},n),(n=qn.get(f))&&Kd(e,n),p=r.createElement("script"),Gt(p),on(p,"link",e),r.head.appendChild(p)),p={type:"script",instance:p,count:1,state:null},s.set(f,p))}}function Fh(e,n,r,s){var f=(f=be.current)?jo(f):null;if(!f)throw Error(l(446));switch(e){case"meta":case"title":return null;case"style":return typeof r.precedence=="string"&&typeof r.href=="string"?(n=Ur(r.href),r=Fa(f).hoistableStyles,s=r.get(n),s||(s={type:"style",instance:null,count:0,state:null},r.set(n,s)),s):{type:"void",instance:null,count:0,state:null};case"link":if(r.rel==="stylesheet"&&typeof r.href=="string"&&typeof r.precedence=="string"){e=Ur(r.href);var p=Fa(f).hoistableStyles,A=p.get(e);if(A||(f=f.ownerDocument||f,A={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},p.set(e,A),(p=f.querySelector(ql(e)))&&!p._p&&(A.instance=p,A.state.loading=5),qn.has(e)||(r={rel:"preload",as:"style",href:r.href,crossOrigin:r.crossOrigin,integrity:r.integrity,media:r.media,hrefLang:r.hrefLang,referrerPolicy:r.referrerPolicy},qn.set(e,r),p||Tv(f,e,r,A.state))),n&&s===null)throw Error(l(528,""));return A}if(n&&s!==null)throw Error(l(529,""));return null;case"script":return n=r.async,r=r.src,typeof r=="string"&&n&&typeof n!="function"&&typeof n!="symbol"?(n=$r(r),r=Fa(f).hoistableScripts,s=r.get(n),s||(s={type:"script",instance:null,count:0,state:null},r.set(n,s)),s):{type:"void",instance:null,count:0,state:null};default:throw Error(l(444,e))}}function Ur(e){return'href="'+gn(e)+'"'}function ql(e){return'link[rel="stylesheet"]['+e+"]"}function Kh(e){return g({},e,{"data-precedence":e.precedence,precedence:null})}function Tv(e,n,r,s){e.querySelector('link[rel="preload"][as="style"]['+n+"]")?s.loading=1:(n=e.createElement("link"),s.preload=n,n.addEventListener("load",function(){return s.loading|=1}),n.addEventListener("error",function(){return s.loading|=2}),on(n,"link",r),Gt(n),e.head.appendChild(n))}function $r(e){return'[src="'+gn(e)+'"]'}function Vl(e){return"script[async]"+e}function Wh(e,n,r){if(n.count++,n.instance===null)switch(n.type){case"style":var s=e.querySelector('style[data-href~="'+gn(r.href)+'"]');if(s)return n.instance=s,Gt(s),s;var f=g({},r,{"data-href":r.href,"data-precedence":r.precedence,href:null,precedence:null});return s=(e.ownerDocument||e).createElement("style"),Gt(s),on(s,"style",f),Bo(s,r.precedence,e),n.instance=s;case"stylesheet":f=Ur(r.href);var p=e.querySelector(ql(f));if(p)return n.state.loading|=4,n.instance=p,Gt(p),p;s=Kh(r),(f=qn.get(f))&&Fd(s,f),p=(e.ownerDocument||e).createElement("link"),Gt(p);var A=p;return A._p=new Promise(function(k,Y){A.onload=k,A.onerror=Y}),on(p,"link",s),n.state.loading|=4,Bo(p,r.precedence,e),n.instance=p;case"script":return p=$r(r.src),(f=e.querySelector(Vl(p)))?(n.instance=f,Gt(f),f):(s=r,(f=qn.get(p))&&(s=g({},r),Kd(s,f)),e=e.ownerDocument||e,f=e.createElement("script"),Gt(f),on(f,"link",s),e.head.appendChild(f),n.instance=f);case"void":return null;default:throw Error(l(443,n.type))}else n.type==="stylesheet"&&(n.state.loading&4)===0&&(s=n.instance,n.state.loading|=4,Bo(s,r.precedence,e));return n.instance}function Bo(e,n,r){for(var s=r.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),f=s.length?s[s.length-1]:null,p=f,A=0;A<s.length;A++){var k=s[A];if(k.dataset.precedence===n)p=k;else if(p!==f)break}p?p.parentNode.insertBefore(e,p.nextSibling):(n=r.nodeType===9?r.head:r,n.insertBefore(e,n.firstChild))}function Fd(e,n){e.crossOrigin==null&&(e.crossOrigin=n.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=n.referrerPolicy),e.title==null&&(e.title=n.title)}function Kd(e,n){e.crossOrigin==null&&(e.crossOrigin=n.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=n.referrerPolicy),e.integrity==null&&(e.integrity=n.integrity)}var Po=null;function Qh(e,n,r){if(Po===null){var s=new Map,f=Po=new Map;f.set(r,s)}else f=Po,s=f.get(r),s||(s=new Map,f.set(r,s));if(s.has(e))return s;for(s.set(e,null),r=r.getElementsByTagName(e),f=0;f<r.length;f++){var p=r[f];if(!(p[Ei]||p[Ce]||e==="link"&&p.getAttribute("rel")==="stylesheet")&&p.namespaceURI!=="http://www.w3.org/2000/svg"){var A=p.getAttribute(n)||"";A=e+A;var k=s.get(A);k?k.push(p):s.set(A,[p])}}return s}function e1(e,n,r){e=e.ownerDocument||e,e.head.insertBefore(r,n==="title"?e.querySelector("head > title"):null)}function Mv(e,n,r){if(r===1||n.itemProp!=null)return!1;switch(e){case"meta":case"title":return!0;case"style":if(typeof n.precedence!="string"||typeof n.href!="string"||n.href==="")break;return!0;case"link":if(typeof n.rel!="string"||typeof n.href!="string"||n.href===""||n.onLoad||n.onError)break;switch(n.rel){case"stylesheet":return e=n.disabled,typeof n.precedence=="string"&&e==null;default:return!0}case"script":if(n.async&&typeof n.async!="function"&&typeof n.async!="symbol"&&!n.onLoad&&!n.onError&&n.src&&typeof n.src=="string")return!0}return!1}function t1(e){return!(e.type==="stylesheet"&&(e.state.loading&3)===0)}function Ev(e,n,r,s){if(r.type==="stylesheet"&&(typeof s.media!="string"||matchMedia(s.media).matches!==!1)&&(r.state.loading&4)===0){if(r.instance===null){var f=Ur(s.href),p=n.querySelector(ql(f));if(p){n=p._p,n!==null&&typeof n=="object"&&typeof n.then=="function"&&(e.count++,e=zo.bind(e),n.then(e,e)),r.state.loading|=4,r.instance=p,Gt(p);return}p=n.ownerDocument||n,s=Kh(s),(f=qn.get(f))&&Fd(s,f),p=p.createElement("link"),Gt(p);var A=p;A._p=new Promise(function(k,Y){A.onload=k,A.onerror=Y}),on(p,"link",s),r.instance=p}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(r,n),(n=r.state.preload)&&(r.state.loading&3)===0&&(e.count++,r=zo.bind(e),n.addEventListener("load",r),n.addEventListener("error",r))}}var Wd=0;function Rv(e,n){return e.stylesheets&&e.count===0&&$o(e,e.stylesheets),0<e.count||0<e.imgCount?function(r){var s=setTimeout(function(){if(e.stylesheets&&$o(e,e.stylesheets),e.unsuspend){var p=e.unsuspend;e.unsuspend=null,p()}},6e4+n);0<e.imgBytes&&Wd===0&&(Wd=62500*fv());var f=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&$o(e,e.stylesheets),e.unsuspend)){var p=e.unsuspend;e.unsuspend=null,p()}},(e.imgBytes>Wd?50:800)+n);return e.unsuspend=r,function(){e.unsuspend=null,clearTimeout(s),clearTimeout(f)}}:null}function zo(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)$o(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var Uo=null;function $o(e,n){e.stylesheets=null,e.unsuspend!==null&&(e.count++,Uo=new Map,n.forEach(kv,e),Uo=null,zo.call(e))}function kv(e,n){if(!(n.state.loading&4)){var r=Uo.get(e);if(r)var s=r.get(null);else{r=new Map,Uo.set(e,r);for(var f=e.querySelectorAll("link[data-precedence],style[data-precedence]"),p=0;p<f.length;p++){var A=f[p];(A.nodeName==="LINK"||A.getAttribute("media")!=="not all")&&(r.set(A.dataset.precedence,A),s=A)}s&&r.set(null,s)}f=n.instance,A=f.getAttribute("data-precedence"),p=r.get(A)||s,p===s&&r.set(null,f),r.set(A,f),this.count++,s=zo.bind(this),f.addEventListener("load",s),f.addEventListener("error",s),p?p.parentNode.insertBefore(f,p.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(f,e.firstChild)),n.state.loading|=4}}var Zl={$$typeof:D,Provider:null,Consumer:null,_currentValue:G,_currentValue2:G,_threadCount:0};function Ov(e,n,r,s,f,p,A,k,Y){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=Ne(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Ne(0),this.hiddenUpdates=Ne(null),this.identifierPrefix=s,this.onUncaughtError=f,this.onCaughtError=p,this.onRecoverableError=A,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=Y,this.incompleteTransitions=new Map}function n1(e,n,r,s,f,p,A,k,Y,le,he,Ae){return e=new Ov(e,n,r,A,Y,le,he,Ae,k),n=1,p===!0&&(n|=24),p=Nn(3,null,null,n),e.current=p,p.stateNode=e,n=Eu(),n.refCount++,e.pooledCache=n,n.refCount++,p.memoizedState={element:s,isDehydrated:r,cache:n},ju(p),e}function a1(e){return e?(e=gr,e):gr}function i1(e,n,r,s,f,p){f=a1(f),s.context===null?s.context=f:s.pendingContext=f,s=ri(n),s.payload={element:r},p=p===void 0?null:p,p!==null&&(s.callback=p),r=li(e,s,n),r!==null&&(Ln(r,e,n),wl(r,e,n))}function r1(e,n){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var r=e.retryLane;e.retryLane=r!==0&&r<n?r:n}}function Qd(e,n){r1(e,n),(e=e.alternate)&&r1(e,n)}function l1(e){if(e.tag===13||e.tag===31){var n=Pi(e,67108864);n!==null&&Ln(n,e,67108864),Qd(e,67108864)}}function s1(e){if(e.tag===13||e.tag===31){var n=kn();n=Ke(n);var r=Pi(e,n);r!==null&&Ln(r,e,n),Qd(e,n)}}var Io=!0;function jv(e,n,r,s){var f=R.T;R.T=null;var p=Z.p;try{Z.p=2,e0(e,n,r,s)}finally{Z.p=p,R.T=f}}function Bv(e,n,r,s){var f=R.T;R.T=null;var p=Z.p;try{Z.p=8,e0(e,n,r,s)}finally{Z.p=p,R.T=f}}function e0(e,n,r,s){if(Io){var f=t0(s);if(f===null)$d(e,n,s,Ho,r),c1(e,s);else if(zv(f,e,n,r,s))s.stopPropagation();else if(c1(e,s),n&4&&-1<Pv.indexOf(e)){for(;f!==null;){var p=Ya(f);if(p!==null)switch(p.tag){case 3:if(p=p.stateNode,p.current.memoizedState.isDehydrated){var A=y(p.pendingLanes);if(A!==0){var k=p;for(k.pendingLanes|=2,k.entangledLanes|=2;A;){var Y=1<<31-Ut(A);k.entanglements[1]|=Y,A&=~Y}ca(p),(gt&6)===0&&(wo=me()+500,$l(0))}}break;case 31:case 13:k=Pi(p,2),k!==null&&Ln(k,p,2),Co(),Qd(p,2)}if(p=t0(s),p===null&&$d(e,n,s,Ho,r),p===f)break;f=p}f!==null&&s.stopPropagation()}else $d(e,n,s,null,r)}}function t0(e){return e=au(e),n0(e)}var Ho=null;function n0(e){if(Ho=null,e=Ga(e),e!==null){var n=c(e);if(n===null)e=null;else{var r=n.tag;if(r===13){if(e=d(n),e!==null)return e;e=null}else if(r===31){if(e=m(n),e!==null)return e;e=null}else if(r===3){if(n.stateNode.current.memoizedState.isDehydrated)return n.tag===3?n.stateNode.containerInfo:null;e=null}else n!==e&&(e=null)}}return Ho=e,null}function o1(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(tt()){case Se:return 2;case nt:return 8;case st:case Zt:return 32;case Dn:return 268435456;default:return 32}default:return 32}}var a0=!1,gi=null,_i=null,bi=null,Gl=new Map,Yl=new Map,yi=[],Pv="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function c1(e,n){switch(e){case"focusin":case"focusout":gi=null;break;case"dragenter":case"dragleave":_i=null;break;case"mouseover":case"mouseout":bi=null;break;case"pointerover":case"pointerout":Gl.delete(n.pointerId);break;case"gotpointercapture":case"lostpointercapture":Yl.delete(n.pointerId)}}function Xl(e,n,r,s,f,p){return e===null||e.nativeEvent!==p?(e={blockedOn:n,domEventName:r,eventSystemFlags:s,nativeEvent:p,targetContainers:[f]},n!==null&&(n=Ya(n),n!==null&&l1(n)),e):(e.eventSystemFlags|=s,n=e.targetContainers,f!==null&&n.indexOf(f)===-1&&n.push(f),e)}function zv(e,n,r,s,f){switch(n){case"focusin":return gi=Xl(gi,e,n,r,s,f),!0;case"dragenter":return _i=Xl(_i,e,n,r,s,f),!0;case"mouseover":return bi=Xl(bi,e,n,r,s,f),!0;case"pointerover":var p=f.pointerId;return Gl.set(p,Xl(Gl.get(p)||null,e,n,r,s,f)),!0;case"gotpointercapture":return p=f.pointerId,Yl.set(p,Xl(Yl.get(p)||null,e,n,r,s,f)),!0}return!1}function u1(e){var n=Ga(e.target);if(n!==null){var r=c(n);if(r!==null){if(n=r.tag,n===13){if(n=d(r),n!==null){e.blockedOn=n,Q(e.priority,function(){s1(r)});return}}else if(n===31){if(n=m(r),n!==null){e.blockedOn=n,Q(e.priority,function(){s1(r)});return}}else if(n===3&&r.stateNode.current.memoizedState.isDehydrated){e.blockedOn=r.tag===3?r.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Jo(e){if(e.blockedOn!==null)return!1;for(var n=e.targetContainers;0<n.length;){var r=t0(e.nativeEvent);if(r===null){r=e.nativeEvent;var s=new r.constructor(r.type,r);nu=s,r.target.dispatchEvent(s),nu=null}else return n=Ya(r),n!==null&&l1(n),e.blockedOn=r,!1;n.shift()}return!0}function d1(e,n,r){Jo(e)&&r.delete(n)}function Uv(){a0=!1,gi!==null&&Jo(gi)&&(gi=null),_i!==null&&Jo(_i)&&(_i=null),bi!==null&&Jo(bi)&&(bi=null),Gl.forEach(d1),Yl.forEach(d1)}function qo(e,n){e.blockedOn===n&&(e.blockedOn=null,a0||(a0=!0,t.unstable_scheduleCallback(t.unstable_NormalPriority,Uv)))}var Vo=null;function f1(e){Vo!==e&&(Vo=e,t.unstable_scheduleCallback(t.unstable_NormalPriority,function(){Vo===e&&(Vo=null);for(var n=0;n<e.length;n+=3){var r=e[n],s=e[n+1],f=e[n+2];if(typeof s!="function"){if(n0(s||r)===null)continue;break}var p=Ya(r);p!==null&&(e.splice(n,3),n-=3,td(p,{pending:!0,data:f,method:r.method,action:s},s,f))}}))}function Ir(e){function n(Y){return qo(Y,e)}gi!==null&&qo(gi,e),_i!==null&&qo(_i,e),bi!==null&&qo(bi,e),Gl.forEach(n),Yl.forEach(n);for(var r=0;r<yi.length;r++){var s=yi[r];s.blockedOn===e&&(s.blockedOn=null)}for(;0<yi.length&&(r=yi[0],r.blockedOn===null);)u1(r),r.blockedOn===null&&yi.shift();if(r=(e.ownerDocument||e).$$reactFormReplay,r!=null)for(s=0;s<r.length;s+=3){var f=r[s],p=r[s+1],A=f[Re]||null;if(typeof p=="function")A||f1(r);else if(A){var k=null;if(p&&p.hasAttribute("formAction")){if(f=p,A=p[Re]||null)k=A.formAction;else if(n0(f)!==null)continue}else k=A.action;typeof k=="function"?r[s+1]=k:(r.splice(s,3),s-=3),f1(r)}}}function p1(){function e(p){p.canIntercept&&p.info==="react-transition"&&p.intercept({handler:function(){return new Promise(function(A){return f=A})},focusReset:"manual",scroll:"manual"})}function n(){f!==null&&(f(),f=null),s||setTimeout(r,20)}function r(){if(!s&&!navigation.transition){var p=navigation.currentEntry;p&&p.url!=null&&navigation.navigate(p.url,{state:p.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var s=!1,f=null;return navigation.addEventListener("navigate",e),navigation.addEventListener("navigatesuccess",n),navigation.addEventListener("navigateerror",n),setTimeout(r,100),function(){s=!0,navigation.removeEventListener("navigate",e),navigation.removeEventListener("navigatesuccess",n),navigation.removeEventListener("navigateerror",n),f!==null&&(f(),f=null)}}}function i0(e){this._internalRoot=e}Zo.prototype.render=i0.prototype.render=function(e){var n=this._internalRoot;if(n===null)throw Error(l(409));var r=n.current,s=kn();i1(r,s,e,n,null,null)},Zo.prototype.unmount=i0.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var n=e.containerInfo;i1(e.current,2,null,e,null,null),Co(),n[dt]=null}};function Zo(e){this._internalRoot=e}Zo.prototype.unstable_scheduleHydration=function(e){if(e){var n=It();e={blockedOn:null,target:e,priority:n};for(var r=0;r<yi.length&&n!==0&&n<yi[r].priority;r++);yi.splice(r,0,e),r===0&&u1(e)}};var m1=a.version;if(m1!=="19.2.4")throw Error(l(527,m1,"19.2.4"));Z.findDOMNode=function(e){var n=e._reactInternals;if(n===void 0)throw typeof e.render=="function"?Error(l(188)):(e=Object.keys(e).join(","),Error(l(268,e)));return e=h(n),e=e!==null?b(e):null,e=e===null?null:e.stateNode,e};var $v={bundleType:0,version:"19.2.4",rendererPackageName:"react-dom",currentDispatcherRef:R,reconcilerVersion:"19.2.4"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Go=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Go.isDisabled&&Go.supportsFiber)try{Bn=Go.inject($v),zt=Go}catch{}}return Kl.createRoot=function(e,n){if(!o(e))throw Error(l(299));var r=!1,s="",f=vm,p=Am,A=Lm;return n!=null&&(n.unstable_strictMode===!0&&(r=!0),n.identifierPrefix!==void 0&&(s=n.identifierPrefix),n.onUncaughtError!==void 0&&(f=n.onUncaughtError),n.onCaughtError!==void 0&&(p=n.onCaughtError),n.onRecoverableError!==void 0&&(A=n.onRecoverableError)),n=n1(e,1,!1,null,null,r,s,null,f,p,A,p1),e[dt]=n.current,Ud(e),new i0(n)},Kl.hydrateRoot=function(e,n,r){if(!o(e))throw Error(l(299));var s=!1,f="",p=vm,A=Am,k=Lm,Y=null;return r!=null&&(r.unstable_strictMode===!0&&(s=!0),r.identifierPrefix!==void 0&&(f=r.identifierPrefix),r.onUncaughtError!==void 0&&(p=r.onUncaughtError),r.onCaughtError!==void 0&&(A=r.onCaughtError),r.onRecoverableError!==void 0&&(k=r.onRecoverableError),r.formState!==void 0&&(Y=r.formState)),n=n1(e,1,!0,n,r??null,s,f,Y,p,A,k,p1),n.context=a1(null),r=n.current,s=kn(),s=Ke(s),f=ri(s),f.callback=null,li(r,f,s),r=s,n.current.lanes=r,Je(n,r),ca(n),e[dt]=n.current,Ud(e),new Zo(n)},Kl.version="19.2.4",Kl}var w1;function Fv(){if(w1)return s0.exports;w1=1;function t(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(t)}catch(a){console.error(a)}}return t(),s0.exports=Xv(),s0.exports}var Kv=Fv();function Wt(t){if(typeof t=="string"||typeof t=="number")return""+t;let a="";if(Array.isArray(t))for(let i=0,l;i<t.length;i++)(l=Wt(t[i]))!==""&&(a+=(a&&" ")+l);else for(let i in t)t[i]&&(a+=(a&&" ")+i);return a}var Wv={value:()=>{}};function Oc(){for(var t=0,a=arguments.length,i={},l;t<a;++t){if(!(l=arguments[t]+"")||l in i||/[\s.]/.test(l))throw new Error("illegal type: "+l);i[l]=[]}return new fc(i)}function fc(t){this._=t}function Qv(t,a){return t.trim().split(/^|\s+/).map(function(i){var l="",o=i.indexOf(".");if(o>=0&&(l=i.slice(o+1),i=i.slice(0,o)),i&&!a.hasOwnProperty(i))throw new Error("unknown type: "+i);return{type:i,name:l}})}fc.prototype=Oc.prototype={constructor:fc,on:function(t,a){var i=this._,l=Qv(t+"",i),o,c=-1,d=l.length;if(arguments.length<2){for(;++c<d;)if((o=(t=l[c]).type)&&(o=eA(i[o],t.name)))return o;return}if(a!=null&&typeof a!="function")throw new Error("invalid callback: "+a);for(;++c<d;)if(o=(t=l[c]).type)i[o]=D1(i[o],t.name,a);else if(a==null)for(o in i)i[o]=D1(i[o],t.name,null);return this},copy:function(){var t={},a=this._;for(var i in a)t[i]=a[i].slice();return new fc(t)},call:function(t,a){if((o=arguments.length-2)>0)for(var i=new Array(o),l=0,o,c;l<o;++l)i[l]=arguments[l+2];if(!this._.hasOwnProperty(t))throw new Error("unknown type: "+t);for(c=this._[t],l=0,o=c.length;l<o;++l)c[l].value.apply(a,i)},apply:function(t,a,i){if(!this._.hasOwnProperty(t))throw new Error("unknown type: "+t);for(var l=this._[t],o=0,c=l.length;o<c;++o)l[o].value.apply(a,i)}};function eA(t,a){for(var i=0,l=t.length,o;i<l;++i)if((o=t[i]).name===a)return o.value}function D1(t,a,i){for(var l=0,o=t.length;l<o;++l)if(t[l].name===a){t[l]=Wv,t=t.slice(0,l).concat(t.slice(l+1));break}return i!=null&&t.push({name:a,value:i}),t}var k0="http://www.w3.org/1999/xhtml";const C1={svg:"http://www.w3.org/2000/svg",xhtml:k0,xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/"};function jc(t){var a=t+="",i=a.indexOf(":");return i>=0&&(a=t.slice(0,i))!=="xmlns"&&(t=t.slice(i+1)),C1.hasOwnProperty(a)?{space:C1[a],local:t}:t}function tA(t){return function(){var a=this.ownerDocument,i=this.namespaceURI;return i===k0&&a.documentElement.namespaceURI===k0?a.createElement(t):a.createElementNS(i,t)}}function nA(t){return function(){return this.ownerDocument.createElementNS(t.space,t.local)}}function eg(t){var a=jc(t);return(a.local?nA:tA)(a)}function aA(){}function ef(t){return t==null?aA:function(){return this.querySelector(t)}}function iA(t){typeof t!="function"&&(t=ef(t));for(var a=this._groups,i=a.length,l=new Array(i),o=0;o<i;++o)for(var c=a[o],d=c.length,m=l[o]=new Array(d),x,h,b=0;b<d;++b)(x=c[b])&&(h=t.call(x,x.__data__,b,c))&&("__data__"in x&&(h.__data__=x.__data__),m[b]=h);return new jn(l,this._parents)}function rA(t){return t==null?[]:Array.isArray(t)?t:Array.from(t)}function lA(){return[]}function tg(t){return t==null?lA:function(){return this.querySelectorAll(t)}}function sA(t){return function(){return rA(t.apply(this,arguments))}}function oA(t){typeof t=="function"?t=sA(t):t=tg(t);for(var a=this._groups,i=a.length,l=[],o=[],c=0;c<i;++c)for(var d=a[c],m=d.length,x,h=0;h<m;++h)(x=d[h])&&(l.push(t.call(x,x.__data__,h,d)),o.push(x));return new jn(l,o)}function ng(t){return function(){return this.matches(t)}}function ag(t){return function(a){return a.matches(t)}}var cA=Array.prototype.find;function uA(t){return function(){return cA.call(this.children,t)}}function dA(){return this.firstElementChild}function fA(t){return this.select(t==null?dA:uA(typeof t=="function"?t:ag(t)))}var pA=Array.prototype.filter;function mA(){return Array.from(this.children)}function hA(t){return function(){return pA.call(this.children,t)}}function xA(t){return this.selectAll(t==null?mA:hA(typeof t=="function"?t:ag(t)))}function gA(t){typeof t!="function"&&(t=ng(t));for(var a=this._groups,i=a.length,l=new Array(i),o=0;o<i;++o)for(var c=a[o],d=c.length,m=l[o]=[],x,h=0;h<d;++h)(x=c[h])&&t.call(x,x.__data__,h,c)&&m.push(x);return new jn(l,this._parents)}function ig(t){return new Array(t.length)}function _A(){return new jn(this._enter||this._groups.map(ig),this._parents)}function gc(t,a){this.ownerDocument=t.ownerDocument,this.namespaceURI=t.namespaceURI,this._next=null,this._parent=t,this.__data__=a}gc.prototype={constructor:gc,appendChild:function(t){return this._parent.insertBefore(t,this._next)},insertBefore:function(t,a){return this._parent.insertBefore(t,a)},querySelector:function(t){return this._parent.querySelector(t)},querySelectorAll:function(t){return this._parent.querySelectorAll(t)}};function bA(t){return function(){return t}}function yA(t,a,i,l,o,c){for(var d=0,m,x=a.length,h=c.length;d<h;++d)(m=a[d])?(m.__data__=c[d],l[d]=m):i[d]=new gc(t,c[d]);for(;d<x;++d)(m=a[d])&&(o[d]=m)}function vA(t,a,i,l,o,c,d){var m,x,h=new Map,b=a.length,g=c.length,v=new Array(b),L;for(m=0;m<b;++m)(x=a[m])&&(v[m]=L=d.call(x,x.__data__,m,a)+"",h.has(L)?o[m]=x:h.set(L,x));for(m=0;m<g;++m)L=d.call(t,c[m],m,c)+"",(x=h.get(L))?(l[m]=x,x.__data__=c[m],h.delete(L)):i[m]=new gc(t,c[m]);for(m=0;m<b;++m)(x=a[m])&&h.get(v[m])===x&&(o[m]=x)}function AA(t){return t.__data__}function LA(t,a){if(!arguments.length)return Array.from(this,AA);var i=a?vA:yA,l=this._parents,o=this._groups;typeof t!="function"&&(t=bA(t));for(var c=o.length,d=new Array(c),m=new Array(c),x=new Array(c),h=0;h<c;++h){var b=l[h],g=o[h],v=g.length,L=wA(t.call(b,b&&b.__data__,h,l)),w=L.length,N=m[h]=new Array(w),T=d[h]=new Array(w),C=x[h]=new Array(v);i(b,g,N,T,C,L,a);for(var B=0,D=0,E,_;B<w;++B)if(E=N[B]){for(B>=D&&(D=B+1);!(_=T[D])&&++D<w;);E._next=_||null}}return d=new jn(d,l),d._enter=m,d._exit=x,d}function wA(t){return typeof t=="object"&&"length"in t?t:Array.from(t)}function DA(){return new jn(this._exit||this._groups.map(ig),this._parents)}function CA(t,a,i){var l=this.enter(),o=this,c=this.exit();return typeof t=="function"?(l=t(l),l&&(l=l.selection())):l=l.append(t+""),a!=null&&(o=a(o),o&&(o=o.selection())),i==null?c.remove():i(c),l&&o?l.merge(o).order():o}function SA(t){for(var a=t.selection?t.selection():t,i=this._groups,l=a._groups,o=i.length,c=l.length,d=Math.min(o,c),m=new Array(o),x=0;x<d;++x)for(var h=i[x],b=l[x],g=h.length,v=m[x]=new Array(g),L,w=0;w<g;++w)(L=h[w]||b[w])&&(v[w]=L);for(;x<o;++x)m[x]=i[x];return new jn(m,this._parents)}function NA(){for(var t=this._groups,a=-1,i=t.length;++a<i;)for(var l=t[a],o=l.length-1,c=l[o],d;--o>=0;)(d=l[o])&&(c&&d.compareDocumentPosition(c)^4&&c.parentNode.insertBefore(d,c),c=d);return this}function TA(t){t||(t=MA);function a(g,v){return g&&v?t(g.__data__,v.__data__):!g-!v}for(var i=this._groups,l=i.length,o=new Array(l),c=0;c<l;++c){for(var d=i[c],m=d.length,x=o[c]=new Array(m),h,b=0;b<m;++b)(h=d[b])&&(x[b]=h);x.sort(a)}return new jn(o,this._parents).order()}function MA(t,a){return t<a?-1:t>a?1:t>=a?0:NaN}function EA(){var t=arguments[0];return arguments[0]=this,t.apply(null,arguments),this}function RA(){return Array.from(this)}function kA(){for(var t=this._groups,a=0,i=t.length;a<i;++a)for(var l=t[a],o=0,c=l.length;o<c;++o){var d=l[o];if(d)return d}return null}function OA(){let t=0;for(const a of this)++t;return t}function jA(){return!this.node()}function BA(t){for(var a=this._groups,i=0,l=a.length;i<l;++i)for(var o=a[i],c=0,d=o.length,m;c<d;++c)(m=o[c])&&t.call(m,m.__data__,c,o);return this}function PA(t){return function(){this.removeAttribute(t)}}function zA(t){return function(){this.removeAttributeNS(t.space,t.local)}}function UA(t,a){return function(){this.setAttribute(t,a)}}function $A(t,a){return function(){this.setAttributeNS(t.space,t.local,a)}}function IA(t,a){return function(){var i=a.apply(this,arguments);i==null?this.removeAttribute(t):this.setAttribute(t,i)}}function HA(t,a){return function(){var i=a.apply(this,arguments);i==null?this.removeAttributeNS(t.space,t.local):this.setAttributeNS(t.space,t.local,i)}}function JA(t,a){var i=jc(t);if(arguments.length<2){var l=this.node();return i.local?l.getAttributeNS(i.space,i.local):l.getAttribute(i)}return this.each((a==null?i.local?zA:PA:typeof a=="function"?i.local?HA:IA:i.local?$A:UA)(i,a))}function rg(t){return t.ownerDocument&&t.ownerDocument.defaultView||t.document&&t||t.defaultView}function qA(t){return function(){this.style.removeProperty(t)}}function VA(t,a,i){return function(){this.style.setProperty(t,a,i)}}function ZA(t,a,i){return function(){var l=a.apply(this,arguments);l==null?this.style.removeProperty(t):this.style.setProperty(t,l,i)}}function GA(t,a,i){return arguments.length>1?this.each((a==null?qA:typeof a=="function"?ZA:VA)(t,a,i??"")):Yr(this.node(),t)}function Yr(t,a){return t.style.getPropertyValue(a)||rg(t).getComputedStyle(t,null).getPropertyValue(a)}function YA(t){return function(){delete this[t]}}function XA(t,a){return function(){this[t]=a}}function FA(t,a){return function(){var i=a.apply(this,arguments);i==null?delete this[t]:this[t]=i}}function KA(t,a){return arguments.length>1?this.each((a==null?YA:typeof a=="function"?FA:XA)(t,a)):this.node()[t]}function lg(t){return t.trim().split(/^|\s+/)}function tf(t){return t.classList||new sg(t)}function sg(t){this._node=t,this._names=lg(t.getAttribute("class")||"")}sg.prototype={add:function(t){var a=this._names.indexOf(t);a<0&&(this._names.push(t),this._node.setAttribute("class",this._names.join(" ")))},remove:function(t){var a=this._names.indexOf(t);a>=0&&(this._names.splice(a,1),this._node.setAttribute("class",this._names.join(" ")))},contains:function(t){return this._names.indexOf(t)>=0}};function og(t,a){for(var i=tf(t),l=-1,o=a.length;++l<o;)i.add(a[l])}function cg(t,a){for(var i=tf(t),l=-1,o=a.length;++l<o;)i.remove(a[l])}function WA(t){return function(){og(this,t)}}function QA(t){return function(){cg(this,t)}}function e2(t,a){return function(){(a.apply(this,arguments)?og:cg)(this,t)}}function t2(t,a){var i=lg(t+"");if(arguments.length<2){for(var l=tf(this.node()),o=-1,c=i.length;++o<c;)if(!l.contains(i[o]))return!1;return!0}return this.each((typeof a=="function"?e2:a?WA:QA)(i,a))}function n2(){this.textContent=""}function a2(t){return function(){this.textContent=t}}function i2(t){return function(){var a=t.apply(this,arguments);this.textContent=a??""}}function r2(t){return arguments.length?this.each(t==null?n2:(typeof t=="function"?i2:a2)(t)):this.node().textContent}function l2(){this.innerHTML=""}function s2(t){return function(){this.innerHTML=t}}function o2(t){return function(){var a=t.apply(this,arguments);this.innerHTML=a??""}}function c2(t){return arguments.length?this.each(t==null?l2:(typeof t=="function"?o2:s2)(t)):this.node().innerHTML}function u2(){this.nextSibling&&this.parentNode.appendChild(this)}function d2(){return this.each(u2)}function f2(){this.previousSibling&&this.parentNode.insertBefore(this,this.parentNode.firstChild)}function p2(){return this.each(f2)}function m2(t){var a=typeof t=="function"?t:eg(t);return this.select(function(){return this.appendChild(a.apply(this,arguments))})}function h2(){return null}function x2(t,a){var i=typeof t=="function"?t:eg(t),l=a==null?h2:typeof a=="function"?a:ef(a);return this.select(function(){return this.insertBefore(i.apply(this,arguments),l.apply(this,arguments)||null)})}function g2(){var t=this.parentNode;t&&t.removeChild(this)}function _2(){return this.each(g2)}function b2(){var t=this.cloneNode(!1),a=this.parentNode;return a?a.insertBefore(t,this.nextSibling):t}function y2(){var t=this.cloneNode(!0),a=this.parentNode;return a?a.insertBefore(t,this.nextSibling):t}function v2(t){return this.select(t?y2:b2)}function A2(t){return arguments.length?this.property("__data__",t):this.node().__data__}function L2(t){return function(a){t.call(this,a,this.__data__)}}function w2(t){return t.trim().split(/^|\s+/).map(function(a){var i="",l=a.indexOf(".");return l>=0&&(i=a.slice(l+1),a=a.slice(0,l)),{type:a,name:i}})}function D2(t){return function(){var a=this.__on;if(a){for(var i=0,l=-1,o=a.length,c;i<o;++i)c=a[i],(!t.type||c.type===t.type)&&c.name===t.name?this.removeEventListener(c.type,c.listener,c.options):a[++l]=c;++l?a.length=l:delete this.__on}}}function C2(t,a,i){return function(){var l=this.__on,o,c=L2(a);if(l){for(var d=0,m=l.length;d<m;++d)if((o=l[d]).type===t.type&&o.name===t.name){this.removeEventListener(o.type,o.listener,o.options),this.addEventListener(o.type,o.listener=c,o.options=i),o.value=a;return}}this.addEventListener(t.type,c,i),o={type:t.type,name:t.name,value:a,listener:c,options:i},l?l.push(o):this.__on=[o]}}function S2(t,a,i){var l=w2(t+""),o,c=l.length,d;if(arguments.length<2){var m=this.node().__on;if(m){for(var x=0,h=m.length,b;x<h;++x)for(o=0,b=m[x];o<c;++o)if((d=l[o]).type===b.type&&d.name===b.name)return b.value}return}for(m=a?C2:D2,o=0;o<c;++o)this.each(m(l[o],a,i));return this}function ug(t,a,i){var l=rg(t),o=l.CustomEvent;typeof o=="function"?o=new o(a,i):(o=l.document.createEvent("Event"),i?(o.initEvent(a,i.bubbles,i.cancelable),o.detail=i.detail):o.initEvent(a,!1,!1)),t.dispatchEvent(o)}function N2(t,a){return function(){return ug(this,t,a)}}function T2(t,a){return function(){return ug(this,t,a.apply(this,arguments))}}function M2(t,a){return this.each((typeof a=="function"?T2:N2)(t,a))}function*E2(){for(var t=this._groups,a=0,i=t.length;a<i;++a)for(var l=t[a],o=0,c=l.length,d;o<c;++o)(d=l[o])&&(yield d)}var dg=[null];function jn(t,a){this._groups=t,this._parents=a}function As(){return new jn([[document.documentElement]],dg)}function R2(){return this}jn.prototype=As.prototype={constructor:jn,select:iA,selectAll:oA,selectChild:fA,selectChildren:xA,filter:gA,data:LA,enter:_A,exit:DA,join:CA,merge:SA,selection:R2,order:NA,sort:TA,call:EA,nodes:RA,node:kA,size:OA,empty:jA,each:BA,attr:JA,style:GA,property:KA,classed:t2,text:r2,html:c2,raise:d2,lower:p2,append:m2,insert:x2,remove:_2,clone:v2,datum:A2,on:S2,dispatch:M2,[Symbol.iterator]:E2};function On(t){return typeof t=="string"?new jn([[document.querySelector(t)]],[document.documentElement]):new jn([[t]],dg)}function k2(t){let a;for(;a=t.sourceEvent;)t=a;return t}function Qn(t,a){if(t=k2(t),a===void 0&&(a=t.currentTarget),a){var i=a.ownerSVGElement||a;if(i.createSVGPoint){var l=i.createSVGPoint();return l.x=t.clientX,l.y=t.clientY,l=l.matrixTransform(a.getScreenCTM().inverse()),[l.x,l.y]}if(a.getBoundingClientRect){var o=a.getBoundingClientRect();return[t.clientX-o.left-a.clientLeft,t.clientY-o.top-a.clientTop]}}return[t.pageX,t.pageY]}const O2={passive:!1},ss={capture:!0,passive:!1};function d0(t){t.stopImmediatePropagation()}function Vr(t){t.preventDefault(),t.stopImmediatePropagation()}function fg(t){var a=t.document.documentElement,i=On(t).on("dragstart.drag",Vr,ss);"onselectstart"in a?i.on("selectstart.drag",Vr,ss):(a.__noselect=a.style.MozUserSelect,a.style.MozUserSelect="none")}function pg(t,a){var i=t.document.documentElement,l=On(t).on("dragstart.drag",null);a&&(l.on("click.drag",Vr,ss),setTimeout(function(){l.on("click.drag",null)},0)),"onselectstart"in i?l.on("selectstart.drag",null):(i.style.MozUserSelect=i.__noselect,delete i.__noselect)}const Yo=t=>()=>t;function O0(t,{sourceEvent:a,subject:i,target:l,identifier:o,active:c,x:d,y:m,dx:x,dy:h,dispatch:b}){Object.defineProperties(this,{type:{value:t,enumerable:!0,configurable:!0},sourceEvent:{value:a,enumerable:!0,configurable:!0},subject:{value:i,enumerable:!0,configurable:!0},target:{value:l,enumerable:!0,configurable:!0},identifier:{value:o,enumerable:!0,configurable:!0},active:{value:c,enumerable:!0,configurable:!0},x:{value:d,enumerable:!0,configurable:!0},y:{value:m,enumerable:!0,configurable:!0},dx:{value:x,enumerable:!0,configurable:!0},dy:{value:h,enumerable:!0,configurable:!0},_:{value:b}})}O0.prototype.on=function(){var t=this._.on.apply(this._,arguments);return t===this._?this:t};function j2(t){return!t.ctrlKey&&!t.button}function B2(){return this.parentNode}function P2(t,a){return a??{x:t.x,y:t.y}}function z2(){return navigator.maxTouchPoints||"ontouchstart"in this}function mg(){var t=j2,a=B2,i=P2,l=z2,o={},c=Oc("start","drag","end"),d=0,m,x,h,b,g=0;function v(E){E.on("mousedown.drag",L).filter(l).on("touchstart.drag",T).on("touchmove.drag",C,O2).on("touchend.drag touchcancel.drag",B).style("touch-action","none").style("-webkit-tap-highlight-color","rgba(0,0,0,0)")}function L(E,_){if(!(b||!t.call(this,E,_))){var P=D(this,a.call(this,E,_),E,_,"mouse");P&&(On(E.view).on("mousemove.drag",w,ss).on("mouseup.drag",N,ss),fg(E.view),d0(E),h=!1,m=E.clientX,x=E.clientY,P("start",E))}}function w(E){if(Vr(E),!h){var _=E.clientX-m,P=E.clientY-x;h=_*_+P*P>g}o.mouse("drag",E)}function N(E){On(E.view).on("mousemove.drag mouseup.drag",null),pg(E.view,h),Vr(E),o.mouse("end",E)}function T(E,_){if(t.call(this,E,_)){var P=E.changedTouches,S=a.call(this,E,_),X=P.length,F,$;for(F=0;F<X;++F)($=D(this,S,E,_,P[F].identifier,P[F]))&&(d0(E),$("start",E,P[F]))}}function C(E){var _=E.changedTouches,P=_.length,S,X;for(S=0;S<P;++S)(X=o[_[S].identifier])&&(Vr(E),X("drag",E,_[S]))}function B(E){var _=E.changedTouches,P=_.length,S,X;for(b&&clearTimeout(b),b=setTimeout(function(){b=null},500),S=0;S<P;++S)(X=o[_[S].identifier])&&(d0(E),X("end",E,_[S]))}function D(E,_,P,S,X,F){var $=c.copy(),H=Qn(F||P,_),te,oe,I;if((I=i.call(E,new O0("beforestart",{sourceEvent:P,target:v,identifier:X,active:d,x:H[0],y:H[1],dx:0,dy:0,dispatch:$}),S))!=null)return te=I.x-H[0]||0,oe=I.y-H[1]||0,function J(R,Z,G){var K=H,ne;switch(R){case"start":o[X]=J,ne=d++;break;case"end":delete o[X],--d;case"drag":H=Qn(G||Z,_),ne=d;break}$.call(R,E,new O0(R,{sourceEvent:Z,subject:I,target:v,identifier:X,active:ne,x:H[0]+te,y:H[1]+oe,dx:H[0]-K[0],dy:H[1]-K[1],dispatch:$}),S)}}return v.filter=function(E){return arguments.length?(t=typeof E=="function"?E:Yo(!!E),v):t},v.container=function(E){return arguments.length?(a=typeof E=="function"?E:Yo(E),v):a},v.subject=function(E){return arguments.length?(i=typeof E=="function"?E:Yo(E),v):i},v.touchable=function(E){return arguments.length?(l=typeof E=="function"?E:Yo(!!E),v):l},v.on=function(){var E=c.on.apply(c,arguments);return E===c?v:E},v.clickDistance=function(E){return arguments.length?(g=(E=+E)*E,v):Math.sqrt(g)},v}function nf(t,a,i){t.prototype=a.prototype=i,i.constructor=t}function hg(t,a){var i=Object.create(t.prototype);for(var l in a)i[l]=a[l];return i}function Ls(){}var os=.7,_c=1/os,Zr="\\s*([+-]?\\d+)\\s*",cs="\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",xa="\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",U2=/^#([0-9a-f]{3,8})$/,$2=new RegExp(`^rgb\\(${Zr},${Zr},${Zr}\\)$`),I2=new RegExp(`^rgb\\(${xa},${xa},${xa}\\)$`),H2=new RegExp(`^rgba\\(${Zr},${Zr},${Zr},${cs}\\)$`),J2=new RegExp(`^rgba\\(${xa},${xa},${xa},${cs}\\)$`),q2=new RegExp(`^hsl\\(${cs},${xa},${xa}\\)$`),V2=new RegExp(`^hsla\\(${cs},${xa},${xa},${cs}\\)$`),S1={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074};nf(Ls,nr,{copy(t){return Object.assign(new this.constructor,this,t)},displayable(){return this.rgb().displayable()},hex:N1,formatHex:N1,formatHex8:Z2,formatHsl:G2,formatRgb:T1,toString:T1});function N1(){return this.rgb().formatHex()}function Z2(){return this.rgb().formatHex8()}function G2(){return xg(this).formatHsl()}function T1(){return this.rgb().formatRgb()}function nr(t){var a,i;return t=(t+"").trim().toLowerCase(),(a=U2.exec(t))?(i=a[1].length,a=parseInt(a[1],16),i===6?M1(a):i===3?new wn(a>>8&15|a>>4&240,a>>4&15|a&240,(a&15)<<4|a&15,1):i===8?Xo(a>>24&255,a>>16&255,a>>8&255,(a&255)/255):i===4?Xo(a>>12&15|a>>8&240,a>>8&15|a>>4&240,a>>4&15|a&240,((a&15)<<4|a&15)/255):null):(a=$2.exec(t))?new wn(a[1],a[2],a[3],1):(a=I2.exec(t))?new wn(a[1]*255/100,a[2]*255/100,a[3]*255/100,1):(a=H2.exec(t))?Xo(a[1],a[2],a[3],a[4]):(a=J2.exec(t))?Xo(a[1]*255/100,a[2]*255/100,a[3]*255/100,a[4]):(a=q2.exec(t))?k1(a[1],a[2]/100,a[3]/100,1):(a=V2.exec(t))?k1(a[1],a[2]/100,a[3]/100,a[4]):S1.hasOwnProperty(t)?M1(S1[t]):t==="transparent"?new wn(NaN,NaN,NaN,0):null}function M1(t){return new wn(t>>16&255,t>>8&255,t&255,1)}function Xo(t,a,i,l){return l<=0&&(t=a=i=NaN),new wn(t,a,i,l)}function Y2(t){return t instanceof Ls||(t=nr(t)),t?(t=t.rgb(),new wn(t.r,t.g,t.b,t.opacity)):new wn}function j0(t,a,i,l){return arguments.length===1?Y2(t):new wn(t,a,i,l??1)}function wn(t,a,i,l){this.r=+t,this.g=+a,this.b=+i,this.opacity=+l}nf(wn,j0,hg(Ls,{brighter(t){return t=t==null?_c:Math.pow(_c,t),new wn(this.r*t,this.g*t,this.b*t,this.opacity)},darker(t){return t=t==null?os:Math.pow(os,t),new wn(this.r*t,this.g*t,this.b*t,this.opacity)},rgb(){return this},clamp(){return new wn(Wi(this.r),Wi(this.g),Wi(this.b),bc(this.opacity))},displayable(){return-.5<=this.r&&this.r<255.5&&-.5<=this.g&&this.g<255.5&&-.5<=this.b&&this.b<255.5&&0<=this.opacity&&this.opacity<=1},hex:E1,formatHex:E1,formatHex8:X2,formatRgb:R1,toString:R1}));function E1(){return`#${Ki(this.r)}${Ki(this.g)}${Ki(this.b)}`}function X2(){return`#${Ki(this.r)}${Ki(this.g)}${Ki(this.b)}${Ki((isNaN(this.opacity)?1:this.opacity)*255)}`}function R1(){const t=bc(this.opacity);return`${t===1?"rgb(":"rgba("}${Wi(this.r)}, ${Wi(this.g)}, ${Wi(this.b)}${t===1?")":`, ${t})`}`}function bc(t){return isNaN(t)?1:Math.max(0,Math.min(1,t))}function Wi(t){return Math.max(0,Math.min(255,Math.round(t)||0))}function Ki(t){return t=Wi(t),(t<16?"0":"")+t.toString(16)}function k1(t,a,i,l){return l<=0?t=a=i=NaN:i<=0||i>=1?t=a=NaN:a<=0&&(t=NaN),new ea(t,a,i,l)}function xg(t){if(t instanceof ea)return new ea(t.h,t.s,t.l,t.opacity);if(t instanceof Ls||(t=nr(t)),!t)return new ea;if(t instanceof ea)return t;t=t.rgb();var a=t.r/255,i=t.g/255,l=t.b/255,o=Math.min(a,i,l),c=Math.max(a,i,l),d=NaN,m=c-o,x=(c+o)/2;return m?(a===c?d=(i-l)/m+(i<l)*6:i===c?d=(l-a)/m+2:d=(a-i)/m+4,m/=x<.5?c+o:2-c-o,d*=60):m=x>0&&x<1?0:d,new ea(d,m,x,t.opacity)}function F2(t,a,i,l){return arguments.length===1?xg(t):new ea(t,a,i,l??1)}function ea(t,a,i,l){this.h=+t,this.s=+a,this.l=+i,this.opacity=+l}nf(ea,F2,hg(Ls,{brighter(t){return t=t==null?_c:Math.pow(_c,t),new ea(this.h,this.s,this.l*t,this.opacity)},darker(t){return t=t==null?os:Math.pow(os,t),new ea(this.h,this.s,this.l*t,this.opacity)},rgb(){var t=this.h%360+(this.h<0)*360,a=isNaN(t)||isNaN(this.s)?0:this.s,i=this.l,l=i+(i<.5?i:1-i)*a,o=2*i-l;return new wn(f0(t>=240?t-240:t+120,o,l),f0(t,o,l),f0(t<120?t+240:t-120,o,l),this.opacity)},clamp(){return new ea(O1(this.h),Fo(this.s),Fo(this.l),bc(this.opacity))},displayable(){return(0<=this.s&&this.s<=1||isNaN(this.s))&&0<=this.l&&this.l<=1&&0<=this.opacity&&this.opacity<=1},formatHsl(){const t=bc(this.opacity);return`${t===1?"hsl(":"hsla("}${O1(this.h)}, ${Fo(this.s)*100}%, ${Fo(this.l)*100}%${t===1?")":`, ${t})`}`}}));function O1(t){return t=(t||0)%360,t<0?t+360:t}function Fo(t){return Math.max(0,Math.min(1,t||0))}function f0(t,a,i){return(t<60?a+(i-a)*t/60:t<180?i:t<240?a+(i-a)*(240-t)/60:a)*255}const af=t=>()=>t;function K2(t,a){return function(i){return t+i*a}}function W2(t,a,i){return t=Math.pow(t,i),a=Math.pow(a,i)-t,i=1/i,function(l){return Math.pow(t+l*a,i)}}function Q2(t){return(t=+t)==1?gg:function(a,i){return i-a?W2(a,i,t):af(isNaN(a)?i:a)}}function gg(t,a){var i=a-t;return i?K2(t,i):af(isNaN(t)?a:t)}const yc=(function t(a){var i=Q2(a);function l(o,c){var d=i((o=j0(o)).r,(c=j0(c)).r),m=i(o.g,c.g),x=i(o.b,c.b),h=gg(o.opacity,c.opacity);return function(b){return o.r=d(b),o.g=m(b),o.b=x(b),o.opacity=h(b),o+""}}return l.gamma=t,l})(1);function eL(t,a){a||(a=[]);var i=t?Math.min(a.length,t.length):0,l=a.slice(),o;return function(c){for(o=0;o<i;++o)l[o]=t[o]*(1-c)+a[o]*c;return l}}function tL(t){return ArrayBuffer.isView(t)&&!(t instanceof DataView)}function nL(t,a){var i=a?a.length:0,l=t?Math.min(i,t.length):0,o=new Array(l),c=new Array(i),d;for(d=0;d<l;++d)o[d]=as(t[d],a[d]);for(;d<i;++d)c[d]=a[d];return function(m){for(d=0;d<l;++d)c[d]=o[d](m);return c}}function aL(t,a){var i=new Date;return t=+t,a=+a,function(l){return i.setTime(t*(1-l)+a*l),i}}function fa(t,a){return t=+t,a=+a,function(i){return t*(1-i)+a*i}}function iL(t,a){var i={},l={},o;(t===null||typeof t!="object")&&(t={}),(a===null||typeof a!="object")&&(a={});for(o in a)o in t?i[o]=as(t[o],a[o]):l[o]=a[o];return function(c){for(o in i)l[o]=i[o](c);return l}}var B0=/[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,p0=new RegExp(B0.source,"g");function rL(t){return function(){return t}}function lL(t){return function(a){return t(a)+""}}function _g(t,a){var i=B0.lastIndex=p0.lastIndex=0,l,o,c,d=-1,m=[],x=[];for(t=t+"",a=a+"";(l=B0.exec(t))&&(o=p0.exec(a));)(c=o.index)>i&&(c=a.slice(i,c),m[d]?m[d]+=c:m[++d]=c),(l=l[0])===(o=o[0])?m[d]?m[d]+=o:m[++d]=o:(m[++d]=null,x.push({i:d,x:fa(l,o)})),i=p0.lastIndex;return i<a.length&&(c=a.slice(i),m[d]?m[d]+=c:m[++d]=c),m.length<2?x[0]?lL(x[0].x):rL(a):(a=x.length,function(h){for(var b=0,g;b<a;++b)m[(g=x[b]).i]=g.x(h);return m.join("")})}function as(t,a){var i=typeof a,l;return a==null||i==="boolean"?af(a):(i==="number"?fa:i==="string"?(l=nr(a))?(a=l,yc):_g:a instanceof nr?yc:a instanceof Date?aL:tL(a)?eL:Array.isArray(a)?nL:typeof a.valueOf!="function"&&typeof a.toString!="function"||isNaN(a)?iL:fa)(t,a)}var j1=180/Math.PI,P0={translateX:0,translateY:0,rotate:0,skewX:0,scaleX:1,scaleY:1};function bg(t,a,i,l,o,c){var d,m,x;return(d=Math.sqrt(t*t+a*a))&&(t/=d,a/=d),(x=t*i+a*l)&&(i-=t*x,l-=a*x),(m=Math.sqrt(i*i+l*l))&&(i/=m,l/=m,x/=m),t*l<a*i&&(t=-t,a=-a,x=-x,d=-d),{translateX:o,translateY:c,rotate:Math.atan2(a,t)*j1,skewX:Math.atan(x)*j1,scaleX:d,scaleY:m}}var Ko;function sL(t){const a=new(typeof DOMMatrix=="function"?DOMMatrix:WebKitCSSMatrix)(t+"");return a.isIdentity?P0:bg(a.a,a.b,a.c,a.d,a.e,a.f)}function oL(t){return t==null||(Ko||(Ko=document.createElementNS("http://www.w3.org/2000/svg","g")),Ko.setAttribute("transform",t),!(t=Ko.transform.baseVal.consolidate()))?P0:(t=t.matrix,bg(t.a,t.b,t.c,t.d,t.e,t.f))}function yg(t,a,i,l){function o(h){return h.length?h.pop()+" ":""}function c(h,b,g,v,L,w){if(h!==g||b!==v){var N=L.push("translate(",null,a,null,i);w.push({i:N-4,x:fa(h,g)},{i:N-2,x:fa(b,v)})}else(g||v)&&L.push("translate("+g+a+v+i)}function d(h,b,g,v){h!==b?(h-b>180?b+=360:b-h>180&&(h+=360),v.push({i:g.push(o(g)+"rotate(",null,l)-2,x:fa(h,b)})):b&&g.push(o(g)+"rotate("+b+l)}function m(h,b,g,v){h!==b?v.push({i:g.push(o(g)+"skewX(",null,l)-2,x:fa(h,b)}):b&&g.push(o(g)+"skewX("+b+l)}function x(h,b,g,v,L,w){if(h!==g||b!==v){var N=L.push(o(L)+"scale(",null,",",null,")");w.push({i:N-4,x:fa(h,g)},{i:N-2,x:fa(b,v)})}else(g!==1||v!==1)&&L.push(o(L)+"scale("+g+","+v+")")}return function(h,b){var g=[],v=[];return h=t(h),b=t(b),c(h.translateX,h.translateY,b.translateX,b.translateY,g,v),d(h.rotate,b.rotate,g,v),m(h.skewX,b.skewX,g,v),x(h.scaleX,h.scaleY,b.scaleX,b.scaleY,g,v),h=b=null,function(L){for(var w=-1,N=v.length,T;++w<N;)g[(T=v[w]).i]=T.x(L);return g.join("")}}}var cL=yg(sL,"px, ","px)","deg)"),uL=yg(oL,", ",")",")"),dL=1e-12;function B1(t){return((t=Math.exp(t))+1/t)/2}function fL(t){return((t=Math.exp(t))-1/t)/2}function pL(t){return((t=Math.exp(2*t))-1)/(t+1)}const pc=(function t(a,i,l){function o(c,d){var m=c[0],x=c[1],h=c[2],b=d[0],g=d[1],v=d[2],L=b-m,w=g-x,N=L*L+w*w,T,C;if(N<dL)C=Math.log(v/h)/a,T=function(S){return[m+S*L,x+S*w,h*Math.exp(a*S*C)]};else{var B=Math.sqrt(N),D=(v*v-h*h+l*N)/(2*h*i*B),E=(v*v-h*h-l*N)/(2*v*i*B),_=Math.log(Math.sqrt(D*D+1)-D),P=Math.log(Math.sqrt(E*E+1)-E);C=(P-_)/a,T=function(S){var X=S*C,F=B1(_),$=h/(i*B)*(F*pL(a*X+_)-fL(_));return[m+$*L,x+$*w,h*F/B1(a*X+_)]}}return T.duration=C*1e3*a/Math.SQRT2,T}return o.rho=function(c){var d=Math.max(.001,+c),m=d*d,x=m*m;return t(d,m,x)},o})(Math.SQRT2,2,4);var Xr=0,ts=0,Wl=0,vg=1e3,vc,ns,Ac=0,ar=0,Bc=0,us=typeof performance=="object"&&performance.now?performance:Date,Ag=typeof window=="object"&&window.requestAnimationFrame?window.requestAnimationFrame.bind(window):function(t){setTimeout(t,17)};function rf(){return ar||(Ag(mL),ar=us.now()+Bc)}function mL(){ar=0}function Lc(){this._call=this._time=this._next=null}Lc.prototype=Lg.prototype={constructor:Lc,restart:function(t,a,i){if(typeof t!="function")throw new TypeError("callback is not a function");i=(i==null?rf():+i)+(a==null?0:+a),!this._next&&ns!==this&&(ns?ns._next=this:vc=this,ns=this),this._call=t,this._time=i,z0()},stop:function(){this._call&&(this._call=null,this._time=1/0,z0())}};function Lg(t,a,i){var l=new Lc;return l.restart(t,a,i),l}function hL(){rf(),++Xr;for(var t=vc,a;t;)(a=ar-t._time)>=0&&t._call.call(void 0,a),t=t._next;--Xr}function P1(){ar=(Ac=us.now())+Bc,Xr=ts=0;try{hL()}finally{Xr=0,gL(),ar=0}}function xL(){var t=us.now(),a=t-Ac;a>vg&&(Bc-=a,Ac=t)}function gL(){for(var t,a=vc,i,l=1/0;a;)a._call?(l>a._time&&(l=a._time),t=a,a=a._next):(i=a._next,a._next=null,a=t?t._next=i:vc=i);ns=t,z0(l)}function z0(t){if(!Xr){ts&&(ts=clearTimeout(ts));var a=t-ar;a>24?(t<1/0&&(ts=setTimeout(P1,t-us.now()-Bc)),Wl&&(Wl=clearInterval(Wl))):(Wl||(Ac=us.now(),Wl=setInterval(xL,vg)),Xr=1,Ag(P1))}}function z1(t,a,i){var l=new Lc;return a=a==null?0:+a,l.restart(o=>{l.stop(),t(o+a)},a,i),l}var _L=Oc("start","end","cancel","interrupt"),bL=[],wg=0,U1=1,U0=2,mc=3,$1=4,$0=5,hc=6;function Pc(t,a,i,l,o,c){var d=t.__transition;if(!d)t.__transition={};else if(i in d)return;yL(t,i,{name:a,index:l,group:o,on:_L,tween:bL,time:c.time,delay:c.delay,duration:c.duration,ease:c.ease,timer:null,state:wg})}function lf(t,a){var i=ra(t,a);if(i.state>wg)throw new Error("too late; already scheduled");return i}function ya(t,a){var i=ra(t,a);if(i.state>mc)throw new Error("too late; already running");return i}function ra(t,a){var i=t.__transition;if(!i||!(i=i[a]))throw new Error("transition not found");return i}function yL(t,a,i){var l=t.__transition,o;l[a]=i,i.timer=Lg(c,0,i.time);function c(h){i.state=U1,i.timer.restart(d,i.delay,i.time),i.delay<=h&&d(h-i.delay)}function d(h){var b,g,v,L;if(i.state!==U1)return x();for(b in l)if(L=l[b],L.name===i.name){if(L.state===mc)return z1(d);L.state===$1?(L.state=hc,L.timer.stop(),L.on.call("interrupt",t,t.__data__,L.index,L.group),delete l[b]):+b<a&&(L.state=hc,L.timer.stop(),L.on.call("cancel",t,t.__data__,L.index,L.group),delete l[b])}if(z1(function(){i.state===mc&&(i.state=$1,i.timer.restart(m,i.delay,i.time),m(h))}),i.state=U0,i.on.call("start",t,t.__data__,i.index,i.group),i.state===U0){for(i.state=mc,o=new Array(v=i.tween.length),b=0,g=-1;b<v;++b)(L=i.tween[b].value.call(t,t.__data__,i.index,i.group))&&(o[++g]=L);o.length=g+1}}function m(h){for(var b=h<i.duration?i.ease.call(null,h/i.duration):(i.timer.restart(x),i.state=$0,1),g=-1,v=o.length;++g<v;)o[g].call(t,b);i.state===$0&&(i.on.call("end",t,t.__data__,i.index,i.group),x())}function x(){i.state=hc,i.timer.stop(),delete l[a];for(var h in l)return;delete t.__transition}}function xc(t,a){var i=t.__transition,l,o,c=!0,d;if(i){a=a==null?null:a+"";for(d in i){if((l=i[d]).name!==a){c=!1;continue}o=l.state>U0&&l.state<$0,l.state=hc,l.timer.stop(),l.on.call(o?"interrupt":"cancel",t,t.__data__,l.index,l.group),delete i[d]}c&&delete t.__transition}}function vL(t){return this.each(function(){xc(this,t)})}function AL(t,a){var i,l;return function(){var o=ya(this,t),c=o.tween;if(c!==i){l=i=c;for(var d=0,m=l.length;d<m;++d)if(l[d].name===a){l=l.slice(),l.splice(d,1);break}}o.tween=l}}function LL(t,a,i){var l,o;if(typeof i!="function")throw new Error;return function(){var c=ya(this,t),d=c.tween;if(d!==l){o=(l=d).slice();for(var m={name:a,value:i},x=0,h=o.length;x<h;++x)if(o[x].name===a){o[x]=m;break}x===h&&o.push(m)}c.tween=o}}function wL(t,a){var i=this._id;if(t+="",arguments.length<2){for(var l=ra(this.node(),i).tween,o=0,c=l.length,d;o<c;++o)if((d=l[o]).name===t)return d.value;return null}return this.each((a==null?AL:LL)(i,t,a))}function sf(t,a,i){var l=t._id;return t.each(function(){var o=ya(this,l);(o.value||(o.value={}))[a]=i.apply(this,arguments)}),function(o){return ra(o,l).value[a]}}function Dg(t,a){var i;return(typeof a=="number"?fa:a instanceof nr?yc:(i=nr(a))?(a=i,yc):_g)(t,a)}function DL(t){return function(){this.removeAttribute(t)}}function CL(t){return function(){this.removeAttributeNS(t.space,t.local)}}function SL(t,a,i){var l,o=i+"",c;return function(){var d=this.getAttribute(t);return d===o?null:d===l?c:c=a(l=d,i)}}function NL(t,a,i){var l,o=i+"",c;return function(){var d=this.getAttributeNS(t.space,t.local);return d===o?null:d===l?c:c=a(l=d,i)}}function TL(t,a,i){var l,o,c;return function(){var d,m=i(this),x;return m==null?void this.removeAttribute(t):(d=this.getAttribute(t),x=m+"",d===x?null:d===l&&x===o?c:(o=x,c=a(l=d,m)))}}function ML(t,a,i){var l,o,c;return function(){var d,m=i(this),x;return m==null?void this.removeAttributeNS(t.space,t.local):(d=this.getAttributeNS(t.space,t.local),x=m+"",d===x?null:d===l&&x===o?c:(o=x,c=a(l=d,m)))}}function EL(t,a){var i=jc(t),l=i==="transform"?uL:Dg;return this.attrTween(t,typeof a=="function"?(i.local?ML:TL)(i,l,sf(this,"attr."+t,a)):a==null?(i.local?CL:DL)(i):(i.local?NL:SL)(i,l,a))}function RL(t,a){return function(i){this.setAttribute(t,a.call(this,i))}}function kL(t,a){return function(i){this.setAttributeNS(t.space,t.local,a.call(this,i))}}function OL(t,a){var i,l;function o(){var c=a.apply(this,arguments);return c!==l&&(i=(l=c)&&kL(t,c)),i}return o._value=a,o}function jL(t,a){var i,l;function o(){var c=a.apply(this,arguments);return c!==l&&(i=(l=c)&&RL(t,c)),i}return o._value=a,o}function BL(t,a){var i="attr."+t;if(arguments.length<2)return(i=this.tween(i))&&i._value;if(a==null)return this.tween(i,null);if(typeof a!="function")throw new Error;var l=jc(t);return this.tween(i,(l.local?OL:jL)(l,a))}function PL(t,a){return function(){lf(this,t).delay=+a.apply(this,arguments)}}function zL(t,a){return a=+a,function(){lf(this,t).delay=a}}function UL(t){var a=this._id;return arguments.length?this.each((typeof t=="function"?PL:zL)(a,t)):ra(this.node(),a).delay}function $L(t,a){return function(){ya(this,t).duration=+a.apply(this,arguments)}}function IL(t,a){return a=+a,function(){ya(this,t).duration=a}}function HL(t){var a=this._id;return arguments.length?this.each((typeof t=="function"?$L:IL)(a,t)):ra(this.node(),a).duration}function JL(t,a){if(typeof a!="function")throw new Error;return function(){ya(this,t).ease=a}}function qL(t){var a=this._id;return arguments.length?this.each(JL(a,t)):ra(this.node(),a).ease}function VL(t,a){return function(){var i=a.apply(this,arguments);if(typeof i!="function")throw new Error;ya(this,t).ease=i}}function ZL(t){if(typeof t!="function")throw new Error;return this.each(VL(this._id,t))}function GL(t){typeof t!="function"&&(t=ng(t));for(var a=this._groups,i=a.length,l=new Array(i),o=0;o<i;++o)for(var c=a[o],d=c.length,m=l[o]=[],x,h=0;h<d;++h)(x=c[h])&&t.call(x,x.__data__,h,c)&&m.push(x);return new Ha(l,this._parents,this._name,this._id)}function YL(t){if(t._id!==this._id)throw new Error;for(var a=this._groups,i=t._groups,l=a.length,o=i.length,c=Math.min(l,o),d=new Array(l),m=0;m<c;++m)for(var x=a[m],h=i[m],b=x.length,g=d[m]=new Array(b),v,L=0;L<b;++L)(v=x[L]||h[L])&&(g[L]=v);for(;m<l;++m)d[m]=a[m];return new Ha(d,this._parents,this._name,this._id)}function XL(t){return(t+"").trim().split(/^|\s+/).every(function(a){var i=a.indexOf(".");return i>=0&&(a=a.slice(0,i)),!a||a==="start"})}function FL(t,a,i){var l,o,c=XL(a)?lf:ya;return function(){var d=c(this,t),m=d.on;m!==l&&(o=(l=m).copy()).on(a,i),d.on=o}}function KL(t,a){var i=this._id;return arguments.length<2?ra(this.node(),i).on.on(t):this.each(FL(i,t,a))}function WL(t){return function(){var a=this.parentNode;for(var i in this.__transition)if(+i!==t)return;a&&a.removeChild(this)}}function QL(){return this.on("end.remove",WL(this._id))}function ew(t){var a=this._name,i=this._id;typeof t!="function"&&(t=ef(t));for(var l=this._groups,o=l.length,c=new Array(o),d=0;d<o;++d)for(var m=l[d],x=m.length,h=c[d]=new Array(x),b,g,v=0;v<x;++v)(b=m[v])&&(g=t.call(b,b.__data__,v,m))&&("__data__"in b&&(g.__data__=b.__data__),h[v]=g,Pc(h[v],a,i,v,h,ra(b,i)));return new Ha(c,this._parents,a,i)}function tw(t){var a=this._name,i=this._id;typeof t!="function"&&(t=tg(t));for(var l=this._groups,o=l.length,c=[],d=[],m=0;m<o;++m)for(var x=l[m],h=x.length,b,g=0;g<h;++g)if(b=x[g]){for(var v=t.call(b,b.__data__,g,x),L,w=ra(b,i),N=0,T=v.length;N<T;++N)(L=v[N])&&Pc(L,a,i,N,v,w);c.push(v),d.push(b)}return new Ha(c,d,a,i)}var nw=As.prototype.constructor;function aw(){return new nw(this._groups,this._parents)}function iw(t,a){var i,l,o;return function(){var c=Yr(this,t),d=(this.style.removeProperty(t),Yr(this,t));return c===d?null:c===i&&d===l?o:o=a(i=c,l=d)}}function Cg(t){return function(){this.style.removeProperty(t)}}function rw(t,a,i){var l,o=i+"",c;return function(){var d=Yr(this,t);return d===o?null:d===l?c:c=a(l=d,i)}}function lw(t,a,i){var l,o,c;return function(){var d=Yr(this,t),m=i(this),x=m+"";return m==null&&(x=m=(this.style.removeProperty(t),Yr(this,t))),d===x?null:d===l&&x===o?c:(o=x,c=a(l=d,m))}}function sw(t,a){var i,l,o,c="style."+a,d="end."+c,m;return function(){var x=ya(this,t),h=x.on,b=x.value[c]==null?m||(m=Cg(a)):void 0;(h!==i||o!==b)&&(l=(i=h).copy()).on(d,o=b),x.on=l}}function ow(t,a,i){var l=(t+="")=="transform"?cL:Dg;return a==null?this.styleTween(t,iw(t,l)).on("end.style."+t,Cg(t)):typeof a=="function"?this.styleTween(t,lw(t,l,sf(this,"style."+t,a))).each(sw(this._id,t)):this.styleTween(t,rw(t,l,a),i).on("end.style."+t,null)}function cw(t,a,i){return function(l){this.style.setProperty(t,a.call(this,l),i)}}function uw(t,a,i){var l,o;function c(){var d=a.apply(this,arguments);return d!==o&&(l=(o=d)&&cw(t,d,i)),l}return c._value=a,c}function dw(t,a,i){var l="style."+(t+="");if(arguments.length<2)return(l=this.tween(l))&&l._value;if(a==null)return this.tween(l,null);if(typeof a!="function")throw new Error;return this.tween(l,uw(t,a,i??""))}function fw(t){return function(){this.textContent=t}}function pw(t){return function(){var a=t(this);this.textContent=a??""}}function mw(t){return this.tween("text",typeof t=="function"?pw(sf(this,"text",t)):fw(t==null?"":t+""))}function hw(t){return function(a){this.textContent=t.call(this,a)}}function xw(t){var a,i;function l(){var o=t.apply(this,arguments);return o!==i&&(a=(i=o)&&hw(o)),a}return l._value=t,l}function gw(t){var a="text";if(arguments.length<1)return(a=this.tween(a))&&a._value;if(t==null)return this.tween(a,null);if(typeof t!="function")throw new Error;return this.tween(a,xw(t))}function _w(){for(var t=this._name,a=this._id,i=Sg(),l=this._groups,o=l.length,c=0;c<o;++c)for(var d=l[c],m=d.length,x,h=0;h<m;++h)if(x=d[h]){var b=ra(x,a);Pc(x,t,i,h,d,{time:b.time+b.delay+b.duration,delay:0,duration:b.duration,ease:b.ease})}return new Ha(l,this._parents,t,i)}function bw(){var t,a,i=this,l=i._id,o=i.size();return new Promise(function(c,d){var m={value:d},x={value:function(){--o===0&&c()}};i.each(function(){var h=ya(this,l),b=h.on;b!==t&&(a=(t=b).copy(),a._.cancel.push(m),a._.interrupt.push(m),a._.end.push(x)),h.on=a}),o===0&&c()})}var yw=0;function Ha(t,a,i,l){this._groups=t,this._parents=a,this._name=i,this._id=l}function Sg(){return++yw}var $a=As.prototype;Ha.prototype={constructor:Ha,select:ew,selectAll:tw,selectChild:$a.selectChild,selectChildren:$a.selectChildren,filter:GL,merge:YL,selection:aw,transition:_w,call:$a.call,nodes:$a.nodes,node:$a.node,size:$a.size,empty:$a.empty,each:$a.each,on:KL,attr:EL,attrTween:BL,style:ow,styleTween:dw,text:mw,textTween:gw,remove:QL,tween:wL,delay:UL,duration:HL,ease:qL,easeVarying:ZL,end:bw,[Symbol.iterator]:$a[Symbol.iterator]};function vw(t){return((t*=2)<=1?t*t*t:(t-=2)*t*t+2)/2}var Aw={time:null,delay:0,duration:250,ease:vw};function Lw(t,a){for(var i;!(i=t.__transition)||!(i=i[a]);)if(!(t=t.parentNode))throw new Error(`transition ${a} not found`);return i}function ww(t){var a,i;t instanceof Ha?(a=t._id,t=t._name):(a=Sg(),(i=Aw).time=rf(),t=t==null?null:t+"");for(var l=this._groups,o=l.length,c=0;c<o;++c)for(var d=l[c],m=d.length,x,h=0;h<m;++h)(x=d[h])&&Pc(x,t,a,h,d,i||Lw(x,a));return new Ha(l,this._parents,t,a)}As.prototype.interrupt=vL;As.prototype.transition=ww;const Wo=t=>()=>t;function Dw(t,{sourceEvent:a,target:i,transform:l,dispatch:o}){Object.defineProperties(this,{type:{value:t,enumerable:!0,configurable:!0},sourceEvent:{value:a,enumerable:!0,configurable:!0},target:{value:i,enumerable:!0,configurable:!0},transform:{value:l,enumerable:!0,configurable:!0},_:{value:o}})}function Ia(t,a,i){this.k=t,this.x=a,this.y=i}Ia.prototype={constructor:Ia,scale:function(t){return t===1?this:new Ia(this.k*t,this.x,this.y)},translate:function(t,a){return t===0&a===0?this:new Ia(this.k,this.x+this.k*t,this.y+this.k*a)},apply:function(t){return[t[0]*this.k+this.x,t[1]*this.k+this.y]},applyX:function(t){return t*this.k+this.x},applyY:function(t){return t*this.k+this.y},invert:function(t){return[(t[0]-this.x)/this.k,(t[1]-this.y)/this.k]},invertX:function(t){return(t-this.x)/this.k},invertY:function(t){return(t-this.y)/this.k},rescaleX:function(t){return t.copy().domain(t.range().map(this.invertX,this).map(t.invert,t))},rescaleY:function(t){return t.copy().domain(t.range().map(this.invertY,this).map(t.invert,t))},toString:function(){return"translate("+this.x+","+this.y+") scale("+this.k+")"}};var zc=new Ia(1,0,0);Ng.prototype=Ia.prototype;function Ng(t){for(;!t.__zoom;)if(!(t=t.parentNode))return zc;return t.__zoom}function m0(t){t.stopImmediatePropagation()}function Ql(t){t.preventDefault(),t.stopImmediatePropagation()}function Cw(t){return(!t.ctrlKey||t.type==="wheel")&&!t.button}function Sw(){var t=this;return t instanceof SVGElement?(t=t.ownerSVGElement||t,t.hasAttribute("viewBox")?(t=t.viewBox.baseVal,[[t.x,t.y],[t.x+t.width,t.y+t.height]]):[[0,0],[t.width.baseVal.value,t.height.baseVal.value]]):[[0,0],[t.clientWidth,t.clientHeight]]}function I1(){return this.__zoom||zc}function Nw(t){return-t.deltaY*(t.deltaMode===1?.05:t.deltaMode?1:.002)*(t.ctrlKey?10:1)}function Tw(){return navigator.maxTouchPoints||"ontouchstart"in this}function Mw(t,a,i){var l=t.invertX(a[0][0])-i[0][0],o=t.invertX(a[1][0])-i[1][0],c=t.invertY(a[0][1])-i[0][1],d=t.invertY(a[1][1])-i[1][1];return t.translate(o>l?(l+o)/2:Math.min(0,l)||Math.max(0,o),d>c?(c+d)/2:Math.min(0,c)||Math.max(0,d))}function Tg(){var t=Cw,a=Sw,i=Mw,l=Nw,o=Tw,c=[0,1/0],d=[[-1/0,-1/0],[1/0,1/0]],m=250,x=pc,h=Oc("start","zoom","end"),b,g,v,L=500,w=150,N=0,T=10;function C(I){I.property("__zoom",I1).on("wheel.zoom",X,{passive:!1}).on("mousedown.zoom",F).on("dblclick.zoom",$).filter(o).on("touchstart.zoom",H).on("touchmove.zoom",te).on("touchend.zoom touchcancel.zoom",oe).style("-webkit-tap-highlight-color","rgba(0,0,0,0)")}C.transform=function(I,J,R,Z){var G=I.selection?I.selection():I;G.property("__zoom",I1),I!==G?_(I,J,R,Z):G.interrupt().each(function(){P(this,arguments).event(Z).start().zoom(null,typeof J=="function"?J.apply(this,arguments):J).end()})},C.scaleBy=function(I,J,R,Z){C.scaleTo(I,function(){var G=this.__zoom.k,K=typeof J=="function"?J.apply(this,arguments):J;return G*K},R,Z)},C.scaleTo=function(I,J,R,Z){C.transform(I,function(){var G=a.apply(this,arguments),K=this.__zoom,ne=R==null?E(G):typeof R=="function"?R.apply(this,arguments):R,j=K.invert(ne),M=typeof J=="function"?J.apply(this,arguments):J;return i(D(B(K,M),ne,j),G,d)},R,Z)},C.translateBy=function(I,J,R,Z){C.transform(I,function(){return i(this.__zoom.translate(typeof J=="function"?J.apply(this,arguments):J,typeof R=="function"?R.apply(this,arguments):R),a.apply(this,arguments),d)},null,Z)},C.translateTo=function(I,J,R,Z,G){C.transform(I,function(){var K=a.apply(this,arguments),ne=this.__zoom,j=Z==null?E(K):typeof Z=="function"?Z.apply(this,arguments):Z;return i(zc.translate(j[0],j[1]).scale(ne.k).translate(typeof J=="function"?-J.apply(this,arguments):-J,typeof R=="function"?-R.apply(this,arguments):-R),K,d)},Z,G)};function B(I,J){return J=Math.max(c[0],Math.min(c[1],J)),J===I.k?I:new Ia(J,I.x,I.y)}function D(I,J,R){var Z=J[0]-R[0]*I.k,G=J[1]-R[1]*I.k;return Z===I.x&&G===I.y?I:new Ia(I.k,Z,G)}function E(I){return[(+I[0][0]+ +I[1][0])/2,(+I[0][1]+ +I[1][1])/2]}function _(I,J,R,Z){I.on("start.zoom",function(){P(this,arguments).event(Z).start()}).on("interrupt.zoom end.zoom",function(){P(this,arguments).event(Z).end()}).tween("zoom",function(){var G=this,K=arguments,ne=P(G,K).event(Z),j=a.apply(G,K),M=R==null?E(j):typeof R=="function"?R.apply(G,K):R,V=Math.max(j[1][0]-j[0][0],j[1][1]-j[0][1]),ee=G.__zoom,xe=typeof J=="function"?J.apply(G,K):J,be=x(ee.invert(M).concat(V/ee.k),xe.invert(M).concat(V/xe.k));return function(Le){if(Le===1)Le=xe;else{var pe=be(Le),Te=V/pe[2];Le=new Ia(Te,M[0]-pe[0]*Te,M[1]-pe[1]*Te)}ne.zoom(null,Le)}})}function P(I,J,R){return!R&&I.__zooming||new S(I,J)}function S(I,J){this.that=I,this.args=J,this.active=0,this.sourceEvent=null,this.extent=a.apply(I,J),this.taps=0}S.prototype={event:function(I){return I&&(this.sourceEvent=I),this},start:function(){return++this.active===1&&(this.that.__zooming=this,this.emit("start")),this},zoom:function(I,J){return this.mouse&&I!=="mouse"&&(this.mouse[1]=J.invert(this.mouse[0])),this.touch0&&I!=="touch"&&(this.touch0[1]=J.invert(this.touch0[0])),this.touch1&&I!=="touch"&&(this.touch1[1]=J.invert(this.touch1[0])),this.that.__zoom=J,this.emit("zoom"),this},end:function(){return--this.active===0&&(delete this.that.__zooming,this.emit("end")),this},emit:function(I){var J=On(this.that).datum();h.call(I,this.that,new Dw(I,{sourceEvent:this.sourceEvent,target:C,transform:this.that.__zoom,dispatch:h}),J)}};function X(I,...J){if(!t.apply(this,arguments))return;var R=P(this,J).event(I),Z=this.__zoom,G=Math.max(c[0],Math.min(c[1],Z.k*Math.pow(2,l.apply(this,arguments)))),K=Qn(I);if(R.wheel)(R.mouse[0][0]!==K[0]||R.mouse[0][1]!==K[1])&&(R.mouse[1]=Z.invert(R.mouse[0]=K)),clearTimeout(R.wheel);else{if(Z.k===G)return;R.mouse=[K,Z.invert(K)],xc(this),R.start()}Ql(I),R.wheel=setTimeout(ne,w),R.zoom("mouse",i(D(B(Z,G),R.mouse[0],R.mouse[1]),R.extent,d));function ne(){R.wheel=null,R.end()}}function F(I,...J){if(v||!t.apply(this,arguments))return;var R=I.currentTarget,Z=P(this,J,!0).event(I),G=On(I.view).on("mousemove.zoom",M,!0).on("mouseup.zoom",V,!0),K=Qn(I,R),ne=I.clientX,j=I.clientY;fg(I.view),m0(I),Z.mouse=[K,this.__zoom.invert(K)],xc(this),Z.start();function M(ee){if(Ql(ee),!Z.moved){var xe=ee.clientX-ne,be=ee.clientY-j;Z.moved=xe*xe+be*be>N}Z.event(ee).zoom("mouse",i(D(Z.that.__zoom,Z.mouse[0]=Qn(ee,R),Z.mouse[1]),Z.extent,d))}function V(ee){G.on("mousemove.zoom mouseup.zoom",null),pg(ee.view,Z.moved),Ql(ee),Z.event(ee).end()}}function $(I,...J){if(t.apply(this,arguments)){var R=this.__zoom,Z=Qn(I.changedTouches?I.changedTouches[0]:I,this),G=R.invert(Z),K=R.k*(I.shiftKey?.5:2),ne=i(D(B(R,K),Z,G),a.apply(this,J),d);Ql(I),m>0?On(this).transition().duration(m).call(_,ne,Z,I):On(this).call(C.transform,ne,Z,I)}}function H(I,...J){if(t.apply(this,arguments)){var R=I.touches,Z=R.length,G=P(this,J,I.changedTouches.length===Z).event(I),K,ne,j,M;for(m0(I),ne=0;ne<Z;++ne)j=R[ne],M=Qn(j,this),M=[M,this.__zoom.invert(M),j.identifier],G.touch0?!G.touch1&&G.touch0[2]!==M[2]&&(G.touch1=M,G.taps=0):(G.touch0=M,K=!0,G.taps=1+!!b);b&&(b=clearTimeout(b)),K&&(G.taps<2&&(g=M[0],b=setTimeout(function(){b=null},L)),xc(this),G.start())}}function te(I,...J){if(this.__zooming){var R=P(this,J).event(I),Z=I.changedTouches,G=Z.length,K,ne,j,M;for(Ql(I),K=0;K<G;++K)ne=Z[K],j=Qn(ne,this),R.touch0&&R.touch0[2]===ne.identifier?R.touch0[0]=j:R.touch1&&R.touch1[2]===ne.identifier&&(R.touch1[0]=j);if(ne=R.that.__zoom,R.touch1){var V=R.touch0[0],ee=R.touch0[1],xe=R.touch1[0],be=R.touch1[1],Le=(Le=xe[0]-V[0])*Le+(Le=xe[1]-V[1])*Le,pe=(pe=be[0]-ee[0])*pe+(pe=be[1]-ee[1])*pe;ne=B(ne,Math.sqrt(Le/pe)),j=[(V[0]+xe[0])/2,(V[1]+xe[1])/2],M=[(ee[0]+be[0])/2,(ee[1]+be[1])/2]}else if(R.touch0)j=R.touch0[0],M=R.touch0[1];else return;R.zoom("touch",i(D(ne,j,M),R.extent,d))}}function oe(I,...J){if(this.__zooming){var R=P(this,J).event(I),Z=I.changedTouches,G=Z.length,K,ne;for(m0(I),v&&clearTimeout(v),v=setTimeout(function(){v=null},L),K=0;K<G;++K)ne=Z[K],R.touch0&&R.touch0[2]===ne.identifier?delete R.touch0:R.touch1&&R.touch1[2]===ne.identifier&&delete R.touch1;if(R.touch1&&!R.touch0&&(R.touch0=R.touch1,delete R.touch1),R.touch0)R.touch0[1]=this.__zoom.invert(R.touch0[0]);else if(R.end(),R.taps===2&&(ne=Qn(ne,this),Math.hypot(g[0]-ne[0],g[1]-ne[1])<T)){var j=On(this).on("dblclick.zoom");j&&j.apply(this,arguments)}}}return C.wheelDelta=function(I){return arguments.length?(l=typeof I=="function"?I:Wo(+I),C):l},C.filter=function(I){return arguments.length?(t=typeof I=="function"?I:Wo(!!I),C):t},C.touchable=function(I){return arguments.length?(o=typeof I=="function"?I:Wo(!!I),C):o},C.extent=function(I){return arguments.length?(a=typeof I=="function"?I:Wo([[+I[0][0],+I[0][1]],[+I[1][0],+I[1][1]]]),C):a},C.scaleExtent=function(I){return arguments.length?(c[0]=+I[0],c[1]=+I[1],C):[c[0],c[1]]},C.translateExtent=function(I){return arguments.length?(d[0][0]=+I[0][0],d[1][0]=+I[1][0],d[0][1]=+I[0][1],d[1][1]=+I[1][1],C):[[d[0][0],d[0][1]],[d[1][0],d[1][1]]]},C.constrain=function(I){return arguments.length?(i=I,C):i},C.duration=function(I){return arguments.length?(m=+I,C):m},C.interpolate=function(I){return arguments.length?(x=I,C):x},C.on=function(){var I=h.on.apply(h,arguments);return I===h?C:I},C.clickDistance=function(I){return arguments.length?(N=(I=+I)*I,C):Math.sqrt(N)},C.tapDistance=function(I){return arguments.length?(T=+I,C):T},C}const _a={error001:()=>"[React Flow]: Seems like you have not used zustand provider as an ancestor. Help: https://reactflow.dev/error#001",error002:()=>"It looks like you've created a new nodeTypes or edgeTypes object. If this wasn't on purpose please define the nodeTypes/edgeTypes outside of the component or memoize them.",error003:t=>`Node type "${t}" not found. Using fallback type "default".`,error004:()=>"The React Flow parent container needs a width and a height to render the graph.",error005:()=>"Only child nodes can use a parent extent.",error006:()=>"Can't create edge. An edge needs a source and a target.",error007:t=>`The old edge with id=${t} does not exist.`,error009:t=>`Marker type "${t}" doesn't exist.`,error008:(t,{id:a,sourceHandle:i,targetHandle:l})=>`Couldn't create edge for ${t} handle id: "${t==="source"?i:l}", edge id: ${a}.`,error010:()=>"Handle: No node id found. Make sure to only use a Handle inside a custom Node.",error011:t=>`Edge type "${t}" not found. Using fallback type "default".`,error012:t=>`Node with id "${t}" does not exist, it may have been removed. This can happen when a node is deleted before the "onNodeClick" handler is called.`,error013:(t="react")=>`It seems that you haven't loaded the styles. Please import '@xyflow/${t}/dist/style.css' or base.css to make sure everything is working properly.`,error014:()=>"useNodeConnections: No node ID found. Call useNodeConnections inside a custom Node or provide a node ID.",error015:()=>"It seems that you are trying to drag a node that is not initialized. Please use onNodesChange as explained in the docs."},ds=[[Number.NEGATIVE_INFINITY,Number.NEGATIVE_INFINITY],[Number.POSITIVE_INFINITY,Number.POSITIVE_INFINITY]],Mg=["Enter"," ","Escape"],Eg={"node.a11yDescription.default":"Press enter or space to select a node. Press delete to remove it and escape to cancel.","node.a11yDescription.keyboardDisabled":"Press enter or space to select a node. You can then use the arrow keys to move the node around. Press delete to remove it and escape to cancel.","node.a11yDescription.ariaLiveMessage":({direction:t,x:a,y:i})=>`Moved selected node ${t}. New position, x: ${a}, y: ${i}`,"edge.a11yDescription.default":"Press enter or space to select an edge. You can then press delete to remove it or escape to cancel.","controls.ariaLabel":"Control Panel","controls.zoomIn.ariaLabel":"Zoom In","controls.zoomOut.ariaLabel":"Zoom Out","controls.fitView.ariaLabel":"Fit View","controls.interactive.ariaLabel":"Toggle Interactivity","minimap.ariaLabel":"Mini Map","handle.ariaLabel":"Handle"};var Fr;(function(t){t.Strict="strict",t.Loose="loose"})(Fr||(Fr={}));var Qi;(function(t){t.Free="free",t.Vertical="vertical",t.Horizontal="horizontal"})(Qi||(Qi={}));var fs;(function(t){t.Partial="partial",t.Full="full"})(fs||(fs={}));const Rg={inProgress:!1,isValid:null,from:null,fromHandle:null,fromPosition:null,fromNode:null,to:null,toHandle:null,toPosition:null,toNode:null,pointer:null};var Ci;(function(t){t.Bezier="default",t.Straight="straight",t.Step="step",t.SmoothStep="smoothstep",t.SimpleBezier="simplebezier"})(Ci||(Ci={}));var ps;(function(t){t.Arrow="arrow",t.ArrowClosed="arrowclosed"})(ps||(ps={}));var ye;(function(t){t.Left="left",t.Top="top",t.Right="right",t.Bottom="bottom"})(ye||(ye={}));const H1={[ye.Left]:ye.Right,[ye.Right]:ye.Left,[ye.Top]:ye.Bottom,[ye.Bottom]:ye.Top};function kg(t){return t===null?null:t?"valid":"invalid"}const Og=t=>"id"in t&&"source"in t&&"target"in t,Ew=t=>"id"in t&&"position"in t&&!("source"in t)&&!("target"in t),of=t=>"id"in t&&"internals"in t&&!("source"in t)&&!("target"in t),ws=(t,a=[0,0])=>{const{width:i,height:l}=qa(t),o=t.origin??a,c=i*o[0],d=l*o[1];return{x:t.position.x-c,y:t.position.y-d}},Rw=(t,a={nodeOrigin:[0,0]})=>{if(t.length===0)return{x:0,y:0,width:0,height:0};const i=t.reduce((l,o)=>{const c=typeof o=="string";let d=!a.nodeLookup&&!c?o:void 0;a.nodeLookup&&(d=c?a.nodeLookup.get(o):of(o)?o:a.nodeLookup.get(o.id));const m=d?wc(d,a.nodeOrigin):{x:0,y:0,x2:0,y2:0};return Uc(l,m)},{x:1/0,y:1/0,x2:-1/0,y2:-1/0});return $c(i)},Ds=(t,a={})=>{let i={x:1/0,y:1/0,x2:-1/0,y2:-1/0},l=!1;return t.forEach(o=>{(a.filter===void 0||a.filter(o))&&(i=Uc(i,wc(o)),l=!0)}),l?$c(i):{x:0,y:0,width:0,height:0}},cf=(t,a,[i,l,o]=[0,0,1],c=!1,d=!1)=>{const m={...Ss(a,[i,l,o]),width:a.width/o,height:a.height/o},x=[];for(const h of t.values()){const{measured:b,selectable:g=!0,hidden:v=!1}=h;if(d&&!g||v)continue;const L=b.width??h.width??h.initialWidth??null,w=b.height??h.height??h.initialHeight??null,N=ms(m,Wr(h)),T=(L??0)*(w??0),C=c&&N>0;(!h.internals.handleBounds||C||N>=T||h.dragging)&&x.push(h)}return x},kw=(t,a)=>{const i=new Set;return t.forEach(l=>{i.add(l.id)}),a.filter(l=>i.has(l.source)||i.has(l.target))};function Ow(t,a){const i=new Map,l=a!=null&&a.nodes?new Set(a.nodes.map(o=>o.id)):null;return t.forEach(o=>{o.measured.width&&o.measured.height&&((a==null?void 0:a.includeHiddenNodes)||!o.hidden)&&(!l||l.has(o.id))&&i.set(o.id,o)}),i}async function jw({nodes:t,width:a,height:i,panZoom:l,minZoom:o,maxZoom:c},d){if(t.size===0)return Promise.resolve(!0);const m=Ow(t,d),x=Ds(m),h=uf(x,a,i,(d==null?void 0:d.minZoom)??o,(d==null?void 0:d.maxZoom)??c,(d==null?void 0:d.padding)??.1);return await l.setViewport(h,{duration:d==null?void 0:d.duration,ease:d==null?void 0:d.ease,interpolate:d==null?void 0:d.interpolate}),Promise.resolve(!0)}function jg({nodeId:t,nextPosition:a,nodeLookup:i,nodeOrigin:l=[0,0],nodeExtent:o,onError:c}){const d=i.get(t),m=d.parentId?i.get(d.parentId):void 0,{x,y:h}=m?m.internals.positionAbsolute:{x:0,y:0},b=d.origin??l;let g=d.extent||o;if(d.extent==="parent"&&!d.expandParent)if(!m)c==null||c("005",_a.error005());else{const L=m.measured.width,w=m.measured.height;L&&w&&(g=[[x,h],[x+L,h+w]])}else m&&Qr(d.extent)&&(g=[[d.extent[0][0]+x,d.extent[0][1]+h],[d.extent[1][0]+x,d.extent[1][1]+h]]);const v=Qr(g)?ir(a,g,d.measured):a;return(d.measured.width===void 0||d.measured.height===void 0)&&(c==null||c("015",_a.error015())),{position:{x:v.x-x+(d.measured.width??0)*b[0],y:v.y-h+(d.measured.height??0)*b[1]},positionAbsolute:v}}async function Bw({nodesToRemove:t=[],edgesToRemove:a=[],nodes:i,edges:l,onBeforeDelete:o}){const c=new Set(t.map(v=>v.id)),d=[];for(const v of i){if(v.deletable===!1)continue;const L=c.has(v.id),w=!L&&v.parentId&&d.find(N=>N.id===v.parentId);(L||w)&&d.push(v)}const m=new Set(a.map(v=>v.id)),x=l.filter(v=>v.deletable!==!1),b=kw(d,x);for(const v of x)m.has(v.id)&&!b.find(w=>w.id===v.id)&&b.push(v);if(!o)return{edges:b,nodes:d};const g=await o({nodes:d,edges:b});return typeof g=="boolean"?g?{edges:b,nodes:d}:{edges:[],nodes:[]}:g}const Kr=(t,a=0,i=1)=>Math.min(Math.max(t,a),i),ir=(t={x:0,y:0},a,i)=>({x:Kr(t.x,a[0][0],a[1][0]-((i==null?void 0:i.width)??0)),y:Kr(t.y,a[0][1],a[1][1]-((i==null?void 0:i.height)??0))});function Bg(t,a,i){const{width:l,height:o}=qa(i),{x:c,y:d}=i.internals.positionAbsolute;return ir(t,[[c,d],[c+l,d+o]],a)}const J1=(t,a,i)=>t<a?Kr(Math.abs(t-a),1,a)/a:t>i?-Kr(Math.abs(t-i),1,a)/a:0,Pg=(t,a,i=15,l=40)=>{const o=J1(t.x,l,a.width-l)*i,c=J1(t.y,l,a.height-l)*i;return[o,c]},Uc=(t,a)=>({x:Math.min(t.x,a.x),y:Math.min(t.y,a.y),x2:Math.max(t.x2,a.x2),y2:Math.max(t.y2,a.y2)}),I0=({x:t,y:a,width:i,height:l})=>({x:t,y:a,x2:t+i,y2:a+l}),$c=({x:t,y:a,x2:i,y2:l})=>({x:t,y:a,width:i-t,height:l-a}),Wr=(t,a=[0,0])=>{var o,c;const{x:i,y:l}=of(t)?t.internals.positionAbsolute:ws(t,a);return{x:i,y:l,width:((o=t.measured)==null?void 0:o.width)??t.width??t.initialWidth??0,height:((c=t.measured)==null?void 0:c.height)??t.height??t.initialHeight??0}},wc=(t,a=[0,0])=>{var o,c;const{x:i,y:l}=of(t)?t.internals.positionAbsolute:ws(t,a);return{x:i,y:l,x2:i+(((o=t.measured)==null?void 0:o.width)??t.width??t.initialWidth??0),y2:l+(((c=t.measured)==null?void 0:c.height)??t.height??t.initialHeight??0)}},zg=(t,a)=>$c(Uc(I0(t),I0(a))),ms=(t,a)=>{const i=Math.max(0,Math.min(t.x+t.width,a.x+a.width)-Math.max(t.x,a.x)),l=Math.max(0,Math.min(t.y+t.height,a.y+a.height)-Math.max(t.y,a.y));return Math.ceil(i*l)},q1=t=>ta(t.width)&&ta(t.height)&&ta(t.x)&&ta(t.y),ta=t=>!isNaN(t)&&isFinite(t),Pw=(t,a)=>{},Cs=(t,a=[1,1])=>({x:a[0]*Math.round(t.x/a[0]),y:a[1]*Math.round(t.y/a[1])}),Ss=({x:t,y:a},[i,l,o],c=!1,d=[1,1])=>{const m={x:(t-i)/o,y:(a-l)/o};return c?Cs(m,d):m},Dc=({x:t,y:a},[i,l,o])=>({x:t*o+i,y:a*o+l});function Hr(t,a){if(typeof t=="number")return Math.floor((a-a/(1+t))*.5);if(typeof t=="string"&&t.endsWith("px")){const i=parseFloat(t);if(!Number.isNaN(i))return Math.floor(i)}if(typeof t=="string"&&t.endsWith("%")){const i=parseFloat(t);if(!Number.isNaN(i))return Math.floor(a*i*.01)}return console.error(`[React Flow] The padding value "${t}" is invalid. Please provide a number or a string with a valid unit (px or %).`),0}function zw(t,a,i){if(typeof t=="string"||typeof t=="number"){const l=Hr(t,i),o=Hr(t,a);return{top:l,right:o,bottom:l,left:o,x:o*2,y:l*2}}if(typeof t=="object"){const l=Hr(t.top??t.y??0,i),o=Hr(t.bottom??t.y??0,i),c=Hr(t.left??t.x??0,a),d=Hr(t.right??t.x??0,a);return{top:l,right:d,bottom:o,left:c,x:c+d,y:l+o}}return{top:0,right:0,bottom:0,left:0,x:0,y:0}}function Uw(t,a,i,l,o,c){const{x:d,y:m}=Dc(t,[a,i,l]),{x,y:h}=Dc({x:t.x+t.width,y:t.y+t.height},[a,i,l]),b=o-x,g=c-h;return{left:Math.floor(d),top:Math.floor(m),right:Math.floor(b),bottom:Math.floor(g)}}const uf=(t,a,i,l,o,c)=>{const d=zw(c,a,i),m=(a-d.x)/t.width,x=(i-d.y)/t.height,h=Math.min(m,x),b=Kr(h,l,o),g=t.x+t.width/2,v=t.y+t.height/2,L=a/2-g*b,w=i/2-v*b,N=Uw(t,L,w,b,a,i),T={left:Math.min(N.left-d.left,0),top:Math.min(N.top-d.top,0),right:Math.min(N.right-d.right,0),bottom:Math.min(N.bottom-d.bottom,0)};return{x:L-T.left+T.right,y:w-T.top+T.bottom,zoom:b}},hs=()=>{var t;return typeof navigator<"u"&&((t=navigator==null?void 0:navigator.userAgent)==null?void 0:t.indexOf("Mac"))>=0};function Qr(t){return t!=null&&t!=="parent"}function qa(t){var a,i;return{width:((a=t.measured)==null?void 0:a.width)??t.width??t.initialWidth??0,height:((i=t.measured)==null?void 0:i.height)??t.height??t.initialHeight??0}}function Ug(t){var a,i;return(((a=t.measured)==null?void 0:a.width)??t.width??t.initialWidth)!==void 0&&(((i=t.measured)==null?void 0:i.height)??t.height??t.initialHeight)!==void 0}function $g(t,a={width:0,height:0},i,l,o){const c={...t},d=l.get(i);if(d){const m=d.origin||o;c.x+=d.internals.positionAbsolute.x-(a.width??0)*m[0],c.y+=d.internals.positionAbsolute.y-(a.height??0)*m[1]}return c}function V1(t,a){if(t.size!==a.size)return!1;for(const i of t)if(!a.has(i))return!1;return!0}function $w(){let t,a;return{promise:new Promise((l,o)=>{t=l,a=o}),resolve:t,reject:a}}function Iw(t){return{...Eg,...t||{}}}function is(t,{snapGrid:a=[0,0],snapToGrid:i=!1,transform:l,containerBounds:o}){const{x:c,y:d}=na(t),m=Ss({x:c-((o==null?void 0:o.left)??0),y:d-((o==null?void 0:o.top)??0)},l),{x,y:h}=i?Cs(m,a):m;return{xSnapped:x,ySnapped:h,...m}}const df=t=>({width:t.offsetWidth,height:t.offsetHeight}),Ig=t=>{var a;return((a=t==null?void 0:t.getRootNode)==null?void 0:a.call(t))||(window==null?void 0:window.document)},Hw=["INPUT","SELECT","TEXTAREA"];function Hg(t){var l,o;const a=((o=(l=t.composedPath)==null?void 0:l.call(t))==null?void 0:o[0])||t.target;return(a==null?void 0:a.nodeType)!==1?!1:Hw.includes(a.nodeName)||a.hasAttribute("contenteditable")||!!a.closest(".nokey")}const Jg=t=>"clientX"in t,na=(t,a)=>{var c,d;const i=Jg(t),l=i?t.clientX:(c=t.touches)==null?void 0:c[0].clientX,o=i?t.clientY:(d=t.touches)==null?void 0:d[0].clientY;return{x:l-((a==null?void 0:a.left)??0),y:o-((a==null?void 0:a.top)??0)}},Z1=(t,a,i,l,o)=>{const c=a.querySelectorAll(`.${t}`);return!c||!c.length?null:Array.from(c).map(d=>{const m=d.getBoundingClientRect();return{id:d.getAttribute("data-handleid"),type:t,nodeId:o,position:d.getAttribute("data-handlepos"),x:(m.left-i.left)/l,y:(m.top-i.top)/l,...df(d)}})};function qg({sourceX:t,sourceY:a,targetX:i,targetY:l,sourceControlX:o,sourceControlY:c,targetControlX:d,targetControlY:m}){const x=t*.125+o*.375+d*.375+i*.125,h=a*.125+c*.375+m*.375+l*.125,b=Math.abs(x-t),g=Math.abs(h-a);return[x,h,b,g]}function Qo(t,a){return t>=0?.5*t:a*25*Math.sqrt(-t)}function G1({pos:t,x1:a,y1:i,x2:l,y2:o,c}){switch(t){case ye.Left:return[a-Qo(a-l,c),i];case ye.Right:return[a+Qo(l-a,c),i];case ye.Top:return[a,i-Qo(i-o,c)];case ye.Bottom:return[a,i+Qo(o-i,c)]}}function Vg({sourceX:t,sourceY:a,sourcePosition:i=ye.Bottom,targetX:l,targetY:o,targetPosition:c=ye.Top,curvature:d=.25}){const[m,x]=G1({pos:i,x1:t,y1:a,x2:l,y2:o,c:d}),[h,b]=G1({pos:c,x1:l,y1:o,x2:t,y2:a,c:d}),[g,v,L,w]=qg({sourceX:t,sourceY:a,targetX:l,targetY:o,sourceControlX:m,sourceControlY:x,targetControlX:h,targetControlY:b});return[`M${t},${a} C${m},${x} ${h},${b} ${l},${o}`,g,v,L,w]}function Zg({sourceX:t,sourceY:a,targetX:i,targetY:l}){const o=Math.abs(i-t)/2,c=i<t?i+o:i-o,d=Math.abs(l-a)/2,m=l<a?l+d:l-d;return[c,m,o,d]}function Jw({sourceNode:t,targetNode:a,selected:i=!1,zIndex:l=0,elevateOnSelect:o=!1,zIndexMode:c="basic"}){if(c==="manual")return l;const d=o&&i?l+1e3:l,m=Math.max(t.parentId||o&&t.selected?t.internals.z:0,a.parentId||o&&a.selected?a.internals.z:0);return d+m}function qw({sourceNode:t,targetNode:a,width:i,height:l,transform:o}){const c=Uc(wc(t),wc(a));c.x===c.x2&&(c.x2+=1),c.y===c.y2&&(c.y2+=1);const d={x:-o[0]/o[2],y:-o[1]/o[2],width:i/o[2],height:l/o[2]};return ms(d,$c(c))>0}const Vw=({source:t,sourceHandle:a,target:i,targetHandle:l})=>`xy-edge__${t}${a||""}-${i}${l||""}`,Zw=(t,a)=>a.some(i=>i.source===t.source&&i.target===t.target&&(i.sourceHandle===t.sourceHandle||!i.sourceHandle&&!t.sourceHandle)&&(i.targetHandle===t.targetHandle||!i.targetHandle&&!t.targetHandle)),Gg=(t,a,i={})=>{if(!t.source||!t.target)return a;const l=i.getEdgeId||Vw;let o;return Og(t)?o={...t}:o={...t,id:l(t)},Zw(o,a)?a:(o.sourceHandle===null&&delete o.sourceHandle,o.targetHandle===null&&delete o.targetHandle,a.concat(o))};function Yg({sourceX:t,sourceY:a,targetX:i,targetY:l}){const[o,c,d,m]=Zg({sourceX:t,sourceY:a,targetX:i,targetY:l});return[`M ${t},${a}L ${i},${l}`,o,c,d,m]}const Y1={[ye.Left]:{x:-1,y:0},[ye.Right]:{x:1,y:0},[ye.Top]:{x:0,y:-1},[ye.Bottom]:{x:0,y:1}},Gw=({source:t,sourcePosition:a=ye.Bottom,target:i})=>a===ye.Left||a===ye.Right?t.x<i.x?{x:1,y:0}:{x:-1,y:0}:t.y<i.y?{x:0,y:1}:{x:0,y:-1},X1=(t,a)=>Math.sqrt(Math.pow(a.x-t.x,2)+Math.pow(a.y-t.y,2));function Yw({source:t,sourcePosition:a=ye.Bottom,target:i,targetPosition:l=ye.Top,center:o,offset:c,stepPosition:d}){const m=Y1[a],x=Y1[l],h={x:t.x+m.x*c,y:t.y+m.y*c},b={x:i.x+x.x*c,y:i.y+x.y*c},g=Gw({source:h,sourcePosition:a,target:b}),v=g.x!==0?"x":"y",L=g[v];let w=[],N,T;const C={x:0,y:0},B={x:0,y:0},[,,D,E]=Zg({sourceX:t.x,sourceY:t.y,targetX:i.x,targetY:i.y});if(m[v]*x[v]===-1){v==="x"?(N=o.x??h.x+(b.x-h.x)*d,T=o.y??(h.y+b.y)/2):(N=o.x??(h.x+b.x)/2,T=o.y??h.y+(b.y-h.y)*d);const P=[{x:N,y:h.y},{x:N,y:b.y}],S=[{x:h.x,y:T},{x:b.x,y:T}];m[v]===L?w=v==="x"?P:S:w=v==="x"?S:P}else{const P=[{x:h.x,y:b.y}],S=[{x:b.x,y:h.y}];if(v==="x"?w=m.x===L?S:P:w=m.y===L?P:S,a===l){const te=Math.abs(t[v]-i[v]);if(te<=c){const oe=Math.min(c-1,c-te);m[v]===L?C[v]=(h[v]>t[v]?-1:1)*oe:B[v]=(b[v]>i[v]?-1:1)*oe}}if(a!==l){const te=v==="x"?"y":"x",oe=m[v]===x[te],I=h[te]>b[te],J=h[te]<b[te];(m[v]===1&&(!oe&&I||oe&&J)||m[v]!==1&&(!oe&&J||oe&&I))&&(w=v==="x"?P:S)}const X={x:h.x+C.x,y:h.y+C.y},F={x:b.x+B.x,y:b.y+B.y},$=Math.max(Math.abs(X.x-w[0].x),Math.abs(F.x-w[0].x)),H=Math.max(Math.abs(X.y-w[0].y),Math.abs(F.y-w[0].y));$>=H?(N=(X.x+F.x)/2,T=w[0].y):(N=w[0].x,T=(X.y+F.y)/2)}return[[t,{x:h.x+C.x,y:h.y+C.y},...w,{x:b.x+B.x,y:b.y+B.y},i],N,T,D,E]}function Xw(t,a,i,l){const o=Math.min(X1(t,a)/2,X1(a,i)/2,l),{x:c,y:d}=a;if(t.x===c&&c===i.x||t.y===d&&d===i.y)return`L${c} ${d}`;if(t.y===d){const h=t.x<i.x?-1:1,b=t.y<i.y?1:-1;return`L ${c+o*h},${d}Q ${c},${d} ${c},${d+o*b}`}const m=t.x<i.x?1:-1,x=t.y<i.y?-1:1;return`L ${c},${d+o*x}Q ${c},${d} ${c+o*m},${d}`}function H0({sourceX:t,sourceY:a,sourcePosition:i=ye.Bottom,targetX:l,targetY:o,targetPosition:c=ye.Top,borderRadius:d=5,centerX:m,centerY:x,offset:h=20,stepPosition:b=.5}){const[g,v,L,w,N]=Yw({source:{x:t,y:a},sourcePosition:i,target:{x:l,y:o},targetPosition:c,center:{x:m,y:x},offset:h,stepPosition:b});return[g.reduce((C,B,D)=>{let E="";return D>0&&D<g.length-1?E=Xw(g[D-1],B,g[D+1],d):E=`${D===0?"M":"L"}${B.x} ${B.y}`,C+=E,C},""),v,L,w,N]}function F1(t){var a;return t&&!!(t.internals.handleBounds||(a=t.handles)!=null&&a.length)&&!!(t.measured.width||t.width||t.initialWidth)}function Fw(t){var g;const{sourceNode:a,targetNode:i}=t;if(!F1(a)||!F1(i))return null;const l=a.internals.handleBounds||K1(a.handles),o=i.internals.handleBounds||K1(i.handles),c=W1((l==null?void 0:l.source)??[],t.sourceHandle),d=W1(t.connectionMode===Fr.Strict?(o==null?void 0:o.target)??[]:((o==null?void 0:o.target)??[]).concat((o==null?void 0:o.source)??[]),t.targetHandle);if(!c||!d)return(g=t.onError)==null||g.call(t,"008",_a.error008(c?"target":"source",{id:t.id,sourceHandle:t.sourceHandle,targetHandle:t.targetHandle})),null;const m=(c==null?void 0:c.position)||ye.Bottom,x=(d==null?void 0:d.position)||ye.Top,h=rr(a,c,m),b=rr(i,d,x);return{sourceX:h.x,sourceY:h.y,targetX:b.x,targetY:b.y,sourcePosition:m,targetPosition:x}}function K1(t){if(!t)return null;const a=[],i=[];for(const l of t)l.width=l.width??1,l.height=l.height??1,l.type==="source"?a.push(l):l.type==="target"&&i.push(l);return{source:a,target:i}}function rr(t,a,i=ye.Left,l=!1){const o=((a==null?void 0:a.x)??0)+t.internals.positionAbsolute.x,c=((a==null?void 0:a.y)??0)+t.internals.positionAbsolute.y,{width:d,height:m}=a??qa(t);if(l)return{x:o+d/2,y:c+m/2};switch((a==null?void 0:a.position)??i){case ye.Top:return{x:o+d/2,y:c};case ye.Right:return{x:o+d,y:c+m/2};case ye.Bottom:return{x:o+d/2,y:c+m};case ye.Left:return{x:o,y:c+m/2}}}function W1(t,a){return t&&(a?t.find(i=>i.id===a):t[0])||null}function J0(t,a){return t?typeof t=="string"?t:`${a?`${a}__`:""}${Object.keys(t).sort().map(l=>`${l}=${t[l]}`).join("&")}`:""}function Kw(t,{id:a,defaultColor:i,defaultMarkerStart:l,defaultMarkerEnd:o}){const c=new Set;return t.reduce((d,m)=>([m.markerStart||l,m.markerEnd||o].forEach(x=>{if(x&&typeof x=="object"){const h=J0(x,a);c.has(h)||(d.push({id:h,color:x.color||i,...x}),c.add(h))}}),d),[]).sort((d,m)=>d.id.localeCompare(m.id))}const Xg=1e3,Ww=10,ff={nodeOrigin:[0,0],nodeExtent:ds,elevateNodesOnSelect:!0,zIndexMode:"basic",defaults:{}},Qw={...ff,checkEquality:!0};function pf(t,a){const i={...t};for(const l in a)a[l]!==void 0&&(i[l]=a[l]);return i}function eD(t,a,i){const l=pf(ff,i);for(const o of t.values())if(o.parentId)hf(o,t,a,l);else{const c=ws(o,l.nodeOrigin),d=Qr(o.extent)?o.extent:l.nodeExtent,m=ir(c,d,qa(o));o.internals.positionAbsolute=m}}function tD(t,a){if(!t.handles)return t.measured?a==null?void 0:a.internals.handleBounds:void 0;const i=[],l=[];for(const o of t.handles){const c={id:o.id,width:o.width??1,height:o.height??1,nodeId:t.id,x:o.x,y:o.y,position:o.position,type:o.type};o.type==="source"?i.push(c):o.type==="target"&&l.push(c)}return{source:i,target:l}}function mf(t){return t==="manual"}function q0(t,a,i,l={}){var h,b;const o=pf(Qw,l),c={i:0},d=new Map(a),m=o!=null&&o.elevateNodesOnSelect&&!mf(o.zIndexMode)?Xg:0;let x=t.length>0;a.clear(),i.clear();for(const g of t){let v=d.get(g.id);if(o.checkEquality&&g===(v==null?void 0:v.internals.userNode))a.set(g.id,v);else{const L=ws(g,o.nodeOrigin),w=Qr(g.extent)?g.extent:o.nodeExtent,N=ir(L,w,qa(g));v={...o.defaults,...g,measured:{width:(h=g.measured)==null?void 0:h.width,height:(b=g.measured)==null?void 0:b.height},internals:{positionAbsolute:N,handleBounds:tD(g,v),z:Fg(g,m,o.zIndexMode),userNode:g}},a.set(g.id,v)}(v.measured===void 0||v.measured.width===void 0||v.measured.height===void 0)&&!v.hidden&&(x=!1),g.parentId&&hf(v,a,i,l,c)}return x}function nD(t,a){if(!t.parentId)return;const i=a.get(t.parentId);i?i.set(t.id,t):a.set(t.parentId,new Map([[t.id,t]]))}function hf(t,a,i,l,o){const{elevateNodesOnSelect:c,nodeOrigin:d,nodeExtent:m,zIndexMode:x}=pf(ff,l),h=t.parentId,b=a.get(h);if(!b){console.warn(`Parent node ${h} not found. Please make sure that parent nodes are in front of their child nodes in the nodes array.`);return}nD(t,i),o&&!b.parentId&&b.internals.rootParentIndex===void 0&&x==="auto"&&(b.internals.rootParentIndex=++o.i,b.internals.z=b.internals.z+o.i*Ww),o&&b.internals.rootParentIndex!==void 0&&(o.i=b.internals.rootParentIndex);const g=c&&!mf(x)?Xg:0,{x:v,y:L,z:w}=aD(t,b,d,m,g,x),{positionAbsolute:N}=t.internals,T=v!==N.x||L!==N.y;(T||w!==t.internals.z)&&a.set(t.id,{...t,internals:{...t.internals,positionAbsolute:T?{x:v,y:L}:N,z:w}})}function Fg(t,a,i){const l=ta(t.zIndex)?t.zIndex:0;return mf(i)?l:l+(t.selected?a:0)}function aD(t,a,i,l,o,c){const{x:d,y:m}=a.internals.positionAbsolute,x=qa(t),h=ws(t,i),b=Qr(t.extent)?ir(h,t.extent,x):h;let g=ir({x:d+b.x,y:m+b.y},l,x);t.extent==="parent"&&(g=Bg(g,x,a));const v=Fg(t,o,c),L=a.internals.z??0;return{x:g.x,y:g.y,z:L>=v?L+1:v}}function xf(t,a,i,l=[0,0]){var d;const o=[],c=new Map;for(const m of t){const x=a.get(m.parentId);if(!x)continue;const h=((d=c.get(m.parentId))==null?void 0:d.expandedRect)??Wr(x),b=zg(h,m.rect);c.set(m.parentId,{expandedRect:b,parent:x})}return c.size>0&&c.forEach(({expandedRect:m,parent:x},h)=>{var D;const b=x.internals.positionAbsolute,g=qa(x),v=x.origin??l,L=m.x<b.x?Math.round(Math.abs(b.x-m.x)):0,w=m.y<b.y?Math.round(Math.abs(b.y-m.y)):0,N=Math.max(g.width,Math.round(m.width)),T=Math.max(g.height,Math.round(m.height)),C=(N-g.width)*v[0],B=(T-g.height)*v[1];(L>0||w>0||C||B)&&(o.push({id:h,type:"position",position:{x:x.position.x-L+C,y:x.position.y-w+B}}),(D=i.get(h))==null||D.forEach(E=>{t.some(_=>_.id===E.id)||o.push({id:E.id,type:"position",position:{x:E.position.x+L,y:E.position.y+w}})})),(g.width<m.width||g.height<m.height||L||w)&&o.push({id:h,type:"dimensions",setAttributes:!0,dimensions:{width:N+(L?v[0]*L-C:0),height:T+(w?v[1]*w-B:0)}})}),o}function iD(t,a,i,l,o,c,d){const m=l==null?void 0:l.querySelector(".xyflow__viewport");let x=!1;if(!m)return{changes:[],updatedInternals:x};const h=[],b=window.getComputedStyle(m),{m22:g}=new window.DOMMatrixReadOnly(b.transform),v=[];for(const L of t.values()){const w=a.get(L.id);if(!w)continue;if(w.hidden){a.set(w.id,{...w,internals:{...w.internals,handleBounds:void 0}}),x=!0;continue}const N=df(L.nodeElement),T=w.measured.width!==N.width||w.measured.height!==N.height;if(!!(N.width&&N.height&&(T||!w.internals.handleBounds||L.force))){const B=L.nodeElement.getBoundingClientRect(),D=Qr(w.extent)?w.extent:c;let{positionAbsolute:E}=w.internals;w.parentId&&w.extent==="parent"?E=Bg(E,N,a.get(w.parentId)):D&&(E=ir(E,D,N));const _={...w,measured:N,internals:{...w.internals,positionAbsolute:E,handleBounds:{source:Z1("source",L.nodeElement,B,g,w.id),target:Z1("target",L.nodeElement,B,g,w.id)}}};a.set(w.id,_),w.parentId&&hf(_,a,i,{nodeOrigin:o,zIndexMode:d}),x=!0,T&&(h.push({id:w.id,type:"dimensions",dimensions:N}),w.expandParent&&w.parentId&&v.push({id:w.id,parentId:w.parentId,rect:Wr(_,o)}))}}if(v.length>0){const L=xf(v,a,i,o);h.push(...L)}return{changes:h,updatedInternals:x}}async function rD({delta:t,panZoom:a,transform:i,translateExtent:l,width:o,height:c}){if(!a||!t.x&&!t.y)return Promise.resolve(!1);const d=await a.setViewportConstrained({x:i[0]+t.x,y:i[1]+t.y,zoom:i[2]},[[0,0],[o,c]],l),m=!!d&&(d.x!==i[0]||d.y!==i[1]||d.k!==i[2]);return Promise.resolve(m)}function Q1(t,a,i,l,o,c){let d=o;const m=l.get(d)||new Map;l.set(d,m.set(i,a)),d=`${o}-${t}`;const x=l.get(d)||new Map;if(l.set(d,x.set(i,a)),c){d=`${o}-${t}-${c}`;const h=l.get(d)||new Map;l.set(d,h.set(i,a))}}function Kg(t,a,i){t.clear(),a.clear();for(const l of i){const{source:o,target:c,sourceHandle:d=null,targetHandle:m=null}=l,x={edgeId:l.id,source:o,target:c,sourceHandle:d,targetHandle:m},h=`${o}-${d}--${c}-${m}`,b=`${c}-${m}--${o}-${d}`;Q1("source",x,b,t,o,d),Q1("target",x,h,t,c,m),a.set(l.id,l)}}function Wg(t,a){if(!t.parentId)return!1;const i=a.get(t.parentId);return i?i.selected?!0:Wg(i,a):!1}function ex(t,a,i){var o;let l=t;do{if((o=l==null?void 0:l.matches)!=null&&o.call(l,a))return!0;if(l===i)return!1;l=l==null?void 0:l.parentElement}while(l);return!1}function lD(t,a,i,l){const o=new Map;for(const[c,d]of t)if((d.selected||d.id===l)&&(!d.parentId||!Wg(d,t))&&(d.draggable||a&&typeof d.draggable>"u")){const m=t.get(c);m&&o.set(c,{id:c,position:m.position||{x:0,y:0},distance:{x:i.x-m.internals.positionAbsolute.x,y:i.y-m.internals.positionAbsolute.y},extent:m.extent,parentId:m.parentId,origin:m.origin,expandParent:m.expandParent,internals:{positionAbsolute:m.internals.positionAbsolute||{x:0,y:0}},measured:{width:m.measured.width??0,height:m.measured.height??0}})}return o}function h0({nodeId:t,dragItems:a,nodeLookup:i,dragging:l=!0}){var d,m,x;const o=[];for(const[h,b]of a){const g=(d=i.get(h))==null?void 0:d.internals.userNode;g&&o.push({...g,position:b.position,dragging:l})}if(!t)return[o[0],o];const c=(m=i.get(t))==null?void 0:m.internals.userNode;return[c?{...c,position:((x=a.get(t))==null?void 0:x.position)||c.position,dragging:l}:o[0],o]}function sD({dragItems:t,snapGrid:a,x:i,y:l}){const o=t.values().next().value;if(!o)return null;const c={x:i-o.distance.x,y:l-o.distance.y},d=Cs(c,a);return{x:d.x-c.x,y:d.y-c.y}}function oD({onNodeMouseDown:t,getStoreItems:a,onDragStart:i,onDrag:l,onDragStop:o}){let c={x:null,y:null},d=0,m=new Map,x=!1,h={x:0,y:0},b=null,g=!1,v=null,L=!1,w=!1,N=null;function T({noDragClassName:B,handleSelector:D,domNode:E,isSelectable:_,nodeId:P,nodeClickDistance:S=0}){v=On(E);function X({x:te,y:oe}){const{nodeLookup:I,nodeExtent:J,snapGrid:R,snapToGrid:Z,nodeOrigin:G,onNodeDrag:K,onSelectionDrag:ne,onError:j,updateNodePositions:M}=a();c={x:te,y:oe};let V=!1;const ee=m.size>1,xe=ee&&J?I0(Ds(m)):null,be=ee&&Z?sD({dragItems:m,snapGrid:R,x:te,y:oe}):null;for(const[Le,pe]of m){if(!I.has(Le))continue;let Te={x:te-pe.distance.x,y:oe-pe.distance.y};Z&&(Te=be?{x:Math.round(Te.x+be.x),y:Math.round(Te.y+be.y)}:Cs(Te,R));let Ze=null;if(ee&&J&&!pe.extent&&xe){const{positionAbsolute:Pe}=pe.internals,He=Pe.x-xe.x+J[0][0],at=Pe.x+pe.measured.width-xe.x2+J[1][0],Xe=Pe.y-xe.y+J[0][1],Ct=Pe.y+pe.measured.height-xe.y2+J[1][1];Ze=[[He,Xe],[at,Ct]]}const{position:Me,positionAbsolute:Be}=jg({nodeId:Le,nextPosition:Te,nodeLookup:I,nodeExtent:Ze||J,nodeOrigin:G,onError:j});V=V||pe.position.x!==Me.x||pe.position.y!==Me.y,pe.position=Me,pe.internals.positionAbsolute=Be}if(w=w||V,!!V&&(M(m,!0),N&&(l||K||!P&&ne))){const[Le,pe]=h0({nodeId:P,dragItems:m,nodeLookup:I});l==null||l(N,m,Le,pe),K==null||K(N,Le,pe),P||ne==null||ne(N,pe)}}async function F(){if(!b)return;const{transform:te,panBy:oe,autoPanSpeed:I,autoPanOnNodeDrag:J}=a();if(!J){x=!1,cancelAnimationFrame(d);return}const[R,Z]=Pg(h,b,I);(R!==0||Z!==0)&&(c.x=(c.x??0)-R/te[2],c.y=(c.y??0)-Z/te[2],await oe({x:R,y:Z})&&X(c)),d=requestAnimationFrame(F)}function $(te){var ee;const{nodeLookup:oe,multiSelectionActive:I,nodesDraggable:J,transform:R,snapGrid:Z,snapToGrid:G,selectNodesOnDrag:K,onNodeDragStart:ne,onSelectionDragStart:j,unselectNodesAndEdges:M}=a();g=!0,(!K||!_)&&!I&&P&&((ee=oe.get(P))!=null&&ee.selected||M()),_&&K&&P&&(t==null||t(P));const V=is(te.sourceEvent,{transform:R,snapGrid:Z,snapToGrid:G,containerBounds:b});if(c=V,m=lD(oe,J,V,P),m.size>0&&(i||ne||!P&&j)){const[xe,be]=h0({nodeId:P,dragItems:m,nodeLookup:oe});i==null||i(te.sourceEvent,m,xe,be),ne==null||ne(te.sourceEvent,xe,be),P||j==null||j(te.sourceEvent,be)}}const H=mg().clickDistance(S).on("start",te=>{const{domNode:oe,nodeDragThreshold:I,transform:J,snapGrid:R,snapToGrid:Z}=a();b=(oe==null?void 0:oe.getBoundingClientRect())||null,L=!1,w=!1,N=te.sourceEvent,I===0&&$(te),c=is(te.sourceEvent,{transform:J,snapGrid:R,snapToGrid:Z,containerBounds:b}),h=na(te.sourceEvent,b)}).on("drag",te=>{const{autoPanOnNodeDrag:oe,transform:I,snapGrid:J,snapToGrid:R,nodeDragThreshold:Z,nodeLookup:G}=a(),K=is(te.sourceEvent,{transform:I,snapGrid:J,snapToGrid:R,containerBounds:b});if(N=te.sourceEvent,(te.sourceEvent.type==="touchmove"&&te.sourceEvent.touches.length>1||P&&!G.has(P))&&(L=!0),!L){if(!x&&oe&&g&&(x=!0,F()),!g){const ne=na(te.sourceEvent,b),j=ne.x-h.x,M=ne.y-h.y;Math.sqrt(j*j+M*M)>Z&&$(te)}(c.x!==K.xSnapped||c.y!==K.ySnapped)&&m&&g&&(h=na(te.sourceEvent,b),X(K))}}).on("end",te=>{if(!(!g||L)&&(x=!1,g=!1,cancelAnimationFrame(d),m.size>0)){const{nodeLookup:oe,updateNodePositions:I,onNodeDragStop:J,onSelectionDragStop:R}=a();if(w&&(I(m,!1),w=!1),o||J||!P&&R){const[Z,G]=h0({nodeId:P,dragItems:m,nodeLookup:oe,dragging:!1});o==null||o(te.sourceEvent,m,Z,G),J==null||J(te.sourceEvent,Z,G),P||R==null||R(te.sourceEvent,G)}}}).filter(te=>{const oe=te.target;return!te.button&&(!B||!ex(oe,`.${B}`,E))&&(!D||ex(oe,D,E))});v.call(H)}function C(){v==null||v.on(".drag",null)}return{update:T,destroy:C}}function cD(t,a,i){const l=[],o={x:t.x-i,y:t.y-i,width:i*2,height:i*2};for(const c of a.values())ms(o,Wr(c))>0&&l.push(c);return l}const uD=250;function dD(t,a,i,l){var m,x;let o=[],c=1/0;const d=cD(t,i,a+uD);for(const h of d){const b=[...((m=h.internals.handleBounds)==null?void 0:m.source)??[],...((x=h.internals.handleBounds)==null?void 0:x.target)??[]];for(const g of b){if(l.nodeId===g.nodeId&&l.type===g.type&&l.id===g.id)continue;const{x:v,y:L}=rr(h,g,g.position,!0),w=Math.sqrt(Math.pow(v-t.x,2)+Math.pow(L-t.y,2));w>a||(w<c?(o=[{...g,x:v,y:L}],c=w):w===c&&o.push({...g,x:v,y:L}))}}if(!o.length)return null;if(o.length>1){const h=l.type==="source"?"target":"source";return o.find(b=>b.type===h)??o[0]}return o[0]}function Qg(t,a,i,l,o,c=!1){var h,b,g;const d=l.get(t);if(!d)return null;const m=o==="strict"?(h=d.internals.handleBounds)==null?void 0:h[a]:[...((b=d.internals.handleBounds)==null?void 0:b.source)??[],...((g=d.internals.handleBounds)==null?void 0:g.target)??[]],x=(i?m==null?void 0:m.find(v=>v.id===i):m==null?void 0:m[0])??null;return x&&c?{...x,...rr(d,x,x.position,!0)}:x}function e_(t,a){return t||(a!=null&&a.classList.contains("target")?"target":a!=null&&a.classList.contains("source")?"source":null)}function fD(t,a){let i=null;return a?i=!0:t&&!a&&(i=!1),i}const t_=()=>!0;function pD(t,{connectionMode:a,connectionRadius:i,handleId:l,nodeId:o,edgeUpdaterType:c,isTarget:d,domNode:m,nodeLookup:x,lib:h,autoPanOnConnect:b,flowId:g,panBy:v,cancelConnection:L,onConnectStart:w,onConnect:N,onConnectEnd:T,isValidConnection:C=t_,onReconnectEnd:B,updateConnection:D,getTransform:E,getFromHandle:_,autoPanSpeed:P,dragThreshold:S=1,handleDomNode:X}){const F=Ig(t.target);let $=0,H;const{x:te,y:oe}=na(t),I=e_(c,X),J=m==null?void 0:m.getBoundingClientRect();let R=!1;if(!J||!I)return;const Z=Qg(o,I,l,x,a);if(!Z)return;let G=na(t,J),K=!1,ne=null,j=!1,M=null;function V(){if(!b||!J)return;const[Me,Be]=Pg(G,J,P);v({x:Me,y:Be}),$=requestAnimationFrame(V)}const ee={...Z,nodeId:o,type:I,position:Z.position},xe=x.get(o);let Le={inProgress:!0,isValid:null,from:rr(xe,ee,ye.Left,!0),fromHandle:ee,fromPosition:ee.position,fromNode:xe,to:G,toHandle:null,toPosition:H1[ee.position],toNode:null,pointer:G};function pe(){R=!0,D(Le),w==null||w(t,{nodeId:o,handleId:l,handleType:I})}S===0&&pe();function Te(Me){if(!R){const{x:Ct,y:nn}=na(Me),Pt=Ct-te,St=nn-oe;if(!(Pt*Pt+St*St>S*S))return;pe()}if(!_()||!ee){Ze(Me);return}const Be=E();G=na(Me,J),H=dD(Ss(G,Be,!1,[1,1]),i,x,ee),K||(V(),K=!0);const Pe=n_(Me,{handle:H,connectionMode:a,fromNodeId:o,fromHandleId:l,fromType:d?"target":"source",isValidConnection:C,doc:F,lib:h,flowId:g,nodeLookup:x});M=Pe.handleDomNode,ne=Pe.connection,j=fD(!!H,Pe.isValid);const He=x.get(o),at=He?rr(He,ee,ye.Left,!0):Le.from,Xe={...Le,from:at,isValid:j,to:Pe.toHandle&&j?Dc({x:Pe.toHandle.x,y:Pe.toHandle.y},Be):G,toHandle:Pe.toHandle,toPosition:j&&Pe.toHandle?Pe.toHandle.position:H1[ee.position],toNode:Pe.toHandle?x.get(Pe.toHandle.nodeId):null,pointer:G};D(Xe),Le=Xe}function Ze(Me){if(!("touches"in Me&&Me.touches.length>0)){if(R){(H||M)&&ne&&j&&(N==null||N(ne));const{inProgress:Be,...Pe}=Le,He={...Pe,toPosition:Le.toHandle?Le.toPosition:null};T==null||T(Me,He),c&&(B==null||B(Me,He))}L(),cancelAnimationFrame($),K=!1,j=!1,ne=null,M=null,F.removeEventListener("mousemove",Te),F.removeEventListener("mouseup",Ze),F.removeEventListener("touchmove",Te),F.removeEventListener("touchend",Ze)}}F.addEventListener("mousemove",Te),F.addEventListener("mouseup",Ze),F.addEventListener("touchmove",Te),F.addEventListener("touchend",Ze)}function n_(t,{handle:a,connectionMode:i,fromNodeId:l,fromHandleId:o,fromType:c,doc:d,lib:m,flowId:x,isValidConnection:h=t_,nodeLookup:b}){const g=c==="target",v=a?d.querySelector(`.${m}-flow__handle[data-id="${x}-${a==null?void 0:a.nodeId}-${a==null?void 0:a.id}-${a==null?void 0:a.type}"]`):null,{x:L,y:w}=na(t),N=d.elementFromPoint(L,w),T=N!=null&&N.classList.contains(`${m}-flow__handle`)?N:v,C={handleDomNode:T,isValid:!1,connection:null,toHandle:null};if(T){const B=e_(void 0,T),D=T.getAttribute("data-nodeid"),E=T.getAttribute("data-handleid"),_=T.classList.contains("connectable"),P=T.classList.contains("connectableend");if(!D||!B)return C;const S={source:g?D:l,sourceHandle:g?E:o,target:g?l:D,targetHandle:g?o:E};C.connection=S;const F=_&&P&&(i===Fr.Strict?g&&B==="source"||!g&&B==="target":D!==l||E!==o);C.isValid=F&&h(S),C.toHandle=Qg(D,B,E,b,i,!0)}return C}const V0={onPointerDown:pD,isValid:n_};function mD({domNode:t,panZoom:a,getTransform:i,getViewScale:l}){const o=On(t);function c({translateExtent:m,width:x,height:h,zoomStep:b=1,pannable:g=!0,zoomable:v=!0,inversePan:L=!1}){const w=D=>{if(D.sourceEvent.type!=="wheel"||!a)return;const E=i(),_=D.sourceEvent.ctrlKey&&hs()?10:1,P=-D.sourceEvent.deltaY*(D.sourceEvent.deltaMode===1?.05:D.sourceEvent.deltaMode?1:.002)*b,S=E[2]*Math.pow(2,P*_);a.scaleTo(S)};let N=[0,0];const T=D=>{(D.sourceEvent.type==="mousedown"||D.sourceEvent.type==="touchstart")&&(N=[D.sourceEvent.clientX??D.sourceEvent.touches[0].clientX,D.sourceEvent.clientY??D.sourceEvent.touches[0].clientY])},C=D=>{const E=i();if(D.sourceEvent.type!=="mousemove"&&D.sourceEvent.type!=="touchmove"||!a)return;const _=[D.sourceEvent.clientX??D.sourceEvent.touches[0].clientX,D.sourceEvent.clientY??D.sourceEvent.touches[0].clientY],P=[_[0]-N[0],_[1]-N[1]];N=_;const S=l()*Math.max(E[2],Math.log(E[2]))*(L?-1:1),X={x:E[0]-P[0]*S,y:E[1]-P[1]*S},F=[[0,0],[x,h]];a.setViewportConstrained({x:X.x,y:X.y,zoom:E[2]},F,m)},B=Tg().on("start",T).on("zoom",g?C:null).on("zoom.wheel",v?w:null);o.call(B,{})}function d(){o.on("zoom",null)}return{update:c,destroy:d,pointer:Qn}}const Ic=t=>({x:t.x,y:t.y,zoom:t.k}),x0=({x:t,y:a,zoom:i})=>zc.translate(t,a).scale(i),Jr=(t,a)=>t.target.closest(`.${a}`),a_=(t,a)=>a===2&&Array.isArray(t)&&t.includes(2),hD=t=>((t*=2)<=1?t*t*t:(t-=2)*t*t+2)/2,g0=(t,a=0,i=hD,l=()=>{})=>{const o=typeof a=="number"&&a>0;return o||l(),o?t.transition().duration(a).ease(i).on("end",l):t},i_=t=>{const a=t.ctrlKey&&hs()?10:1;return-t.deltaY*(t.deltaMode===1?.05:t.deltaMode?1:.002)*a};function xD({zoomPanValues:t,noWheelClassName:a,d3Selection:i,d3Zoom:l,panOnScrollMode:o,panOnScrollSpeed:c,zoomOnPinch:d,onPanZoomStart:m,onPanZoom:x,onPanZoomEnd:h}){return b=>{if(Jr(b,a))return b.ctrlKey&&b.preventDefault(),!1;b.preventDefault(),b.stopImmediatePropagation();const g=i.property("__zoom").k||1;if(b.ctrlKey&&d){const T=Qn(b),C=i_(b),B=g*Math.pow(2,C);l.scaleTo(i,B,T,b);return}const v=b.deltaMode===1?20:1;let L=o===Qi.Vertical?0:b.deltaX*v,w=o===Qi.Horizontal?0:b.deltaY*v;!hs()&&b.shiftKey&&o!==Qi.Vertical&&(L=b.deltaY*v,w=0),l.translateBy(i,-(L/g)*c,-(w/g)*c,{internal:!0});const N=Ic(i.property("__zoom"));clearTimeout(t.panScrollTimeout),t.isPanScrolling?(x==null||x(b,N),t.panScrollTimeout=setTimeout(()=>{h==null||h(b,N),t.isPanScrolling=!1},150)):(t.isPanScrolling=!0,m==null||m(b,N))}}function gD({noWheelClassName:t,preventScrolling:a,d3ZoomHandler:i}){return function(l,o){const c=l.type==="wheel",d=!a&&c&&!l.ctrlKey,m=Jr(l,t);if(l.ctrlKey&&c&&m&&l.preventDefault(),d||m)return null;l.preventDefault(),i.call(this,l,o)}}function _D({zoomPanValues:t,onDraggingChange:a,onPanZoomStart:i}){return l=>{var c,d,m;if((c=l.sourceEvent)!=null&&c.internal)return;const o=Ic(l.transform);t.mouseButton=((d=l.sourceEvent)==null?void 0:d.button)||0,t.isZoomingOrPanning=!0,t.prevViewport=o,((m=l.sourceEvent)==null?void 0:m.type)==="mousedown"&&a(!0),i&&(i==null||i(l.sourceEvent,o))}}function bD({zoomPanValues:t,panOnDrag:a,onPaneContextMenu:i,onTransformChange:l,onPanZoom:o}){return c=>{var d,m;t.usedRightMouseButton=!!(i&&a_(a,t.mouseButton??0)),(d=c.sourceEvent)!=null&&d.sync||l([c.transform.x,c.transform.y,c.transform.k]),o&&!((m=c.sourceEvent)!=null&&m.internal)&&(o==null||o(c.sourceEvent,Ic(c.transform)))}}function yD({zoomPanValues:t,panOnDrag:a,panOnScroll:i,onDraggingChange:l,onPanZoomEnd:o,onPaneContextMenu:c}){return d=>{var m;if(!((m=d.sourceEvent)!=null&&m.internal)&&(t.isZoomingOrPanning=!1,c&&a_(a,t.mouseButton??0)&&!t.usedRightMouseButton&&d.sourceEvent&&c(d.sourceEvent),t.usedRightMouseButton=!1,l(!1),o)){const x=Ic(d.transform);t.prevViewport=x,clearTimeout(t.timerId),t.timerId=setTimeout(()=>{o==null||o(d.sourceEvent,x)},i?150:0)}}}function vD({zoomActivationKeyPressed:t,zoomOnScroll:a,zoomOnPinch:i,panOnDrag:l,panOnScroll:o,zoomOnDoubleClick:c,userSelectionActive:d,noWheelClassName:m,noPanClassName:x,lib:h,connectionInProgress:b}){return g=>{var T;const v=t||a,L=i&&g.ctrlKey,w=g.type==="wheel";if(g.button===1&&g.type==="mousedown"&&(Jr(g,`${h}-flow__node`)||Jr(g,`${h}-flow__edge`)))return!0;if(!l&&!v&&!o&&!c&&!i||d||b&&!w||Jr(g,m)&&w||Jr(g,x)&&(!w||o&&w&&!t)||!i&&g.ctrlKey&&w)return!1;if(!i&&g.type==="touchstart"&&((T=g.touches)==null?void 0:T.length)>1)return g.preventDefault(),!1;if(!v&&!o&&!L&&w||!l&&(g.type==="mousedown"||g.type==="touchstart")||Array.isArray(l)&&!l.includes(g.button)&&g.type==="mousedown")return!1;const N=Array.isArray(l)&&l.includes(g.button)||!g.button||g.button<=1;return(!g.ctrlKey||w)&&N}}function AD({domNode:t,minZoom:a,maxZoom:i,translateExtent:l,viewport:o,onPanZoom:c,onPanZoomStart:d,onPanZoomEnd:m,onDraggingChange:x}){const h={isZoomingOrPanning:!1,usedRightMouseButton:!1,prevViewport:{},mouseButton:0,timerId:void 0,panScrollTimeout:void 0,isPanScrolling:!1},b=t.getBoundingClientRect(),g=Tg().scaleExtent([a,i]).translateExtent(l),v=On(t).call(g);B({x:o.x,y:o.y,zoom:Kr(o.zoom,a,i)},[[0,0],[b.width,b.height]],l);const L=v.on("wheel.zoom"),w=v.on("dblclick.zoom");g.wheelDelta(i_);function N(H,te){return v?new Promise(oe=>{g==null||g.interpolate((te==null?void 0:te.interpolate)==="linear"?as:pc).transform(g0(v,te==null?void 0:te.duration,te==null?void 0:te.ease,()=>oe(!0)),H)}):Promise.resolve(!1)}function T({noWheelClassName:H,noPanClassName:te,onPaneContextMenu:oe,userSelectionActive:I,panOnScroll:J,panOnDrag:R,panOnScrollMode:Z,panOnScrollSpeed:G,preventScrolling:K,zoomOnPinch:ne,zoomOnScroll:j,zoomOnDoubleClick:M,zoomActivationKeyPressed:V,lib:ee,onTransformChange:xe,connectionInProgress:be,paneClickDistance:Le,selectionOnDrag:pe}){I&&!h.isZoomingOrPanning&&C();const Te=J&&!V&&!I;g.clickDistance(pe?1/0:!ta(Le)||Le<0?0:Le);const Ze=Te?xD({zoomPanValues:h,noWheelClassName:H,d3Selection:v,d3Zoom:g,panOnScrollMode:Z,panOnScrollSpeed:G,zoomOnPinch:ne,onPanZoomStart:d,onPanZoom:c,onPanZoomEnd:m}):gD({noWheelClassName:H,preventScrolling:K,d3ZoomHandler:L});if(v.on("wheel.zoom",Ze,{passive:!1}),!I){const Be=_D({zoomPanValues:h,onDraggingChange:x,onPanZoomStart:d});g.on("start",Be);const Pe=bD({zoomPanValues:h,panOnDrag:R,onPaneContextMenu:!!oe,onPanZoom:c,onTransformChange:xe});g.on("zoom",Pe);const He=yD({zoomPanValues:h,panOnDrag:R,panOnScroll:J,onPaneContextMenu:oe,onPanZoomEnd:m,onDraggingChange:x});g.on("end",He)}const Me=vD({zoomActivationKeyPressed:V,panOnDrag:R,zoomOnScroll:j,panOnScroll:J,zoomOnDoubleClick:M,zoomOnPinch:ne,userSelectionActive:I,noPanClassName:te,noWheelClassName:H,lib:ee,connectionInProgress:be});g.filter(Me),M?v.on("dblclick.zoom",w):v.on("dblclick.zoom",null)}function C(){g.on("zoom",null)}async function B(H,te,oe){const I=x0(H),J=g==null?void 0:g.constrain()(I,te,oe);return J&&await N(J),new Promise(R=>R(J))}async function D(H,te){const oe=x0(H);return await N(oe,te),new Promise(I=>I(oe))}function E(H){if(v){const te=x0(H),oe=v.property("__zoom");(oe.k!==H.zoom||oe.x!==H.x||oe.y!==H.y)&&(g==null||g.transform(v,te,null,{sync:!0}))}}function _(){const H=v?Ng(v.node()):{x:0,y:0,k:1};return{x:H.x,y:H.y,zoom:H.k}}function P(H,te){return v?new Promise(oe=>{g==null||g.interpolate((te==null?void 0:te.interpolate)==="linear"?as:pc).scaleTo(g0(v,te==null?void 0:te.duration,te==null?void 0:te.ease,()=>oe(!0)),H)}):Promise.resolve(!1)}function S(H,te){return v?new Promise(oe=>{g==null||g.interpolate((te==null?void 0:te.interpolate)==="linear"?as:pc).scaleBy(g0(v,te==null?void 0:te.duration,te==null?void 0:te.ease,()=>oe(!0)),H)}):Promise.resolve(!1)}function X(H){g==null||g.scaleExtent(H)}function F(H){g==null||g.translateExtent(H)}function $(H){const te=!ta(H)||H<0?0:H;g==null||g.clickDistance(te)}return{update:T,destroy:C,setViewport:D,setViewportConstrained:B,getViewport:_,scaleTo:P,scaleBy:S,setScaleExtent:X,setTranslateExtent:F,syncViewport:E,setClickDistance:$}}var el;(function(t){t.Line="line",t.Handle="handle"})(el||(el={}));function LD({width:t,prevWidth:a,height:i,prevHeight:l,affectsX:o,affectsY:c}){const d=t-a,m=i-l,x=[d>0?1:d<0?-1:0,m>0?1:m<0?-1:0];return d&&o&&(x[0]=x[0]*-1),m&&c&&(x[1]=x[1]*-1),x}function tx(t){const a=t.includes("right")||t.includes("left"),i=t.includes("bottom")||t.includes("top"),l=t.includes("left"),o=t.includes("top");return{isHorizontal:a,isVertical:i,affectsX:l,affectsY:o}}function Ai(t,a){return Math.max(0,a-t)}function Li(t,a){return Math.max(0,t-a)}function ec(t,a,i){return Math.max(0,a-t,t-i)}function nx(t,a){return t?!a:a}function wD(t,a,i,l,o,c,d,m){let{affectsX:x,affectsY:h}=a;const{isHorizontal:b,isVertical:g}=a,v=b&&g,{xSnapped:L,ySnapped:w}=i,{minWidth:N,maxWidth:T,minHeight:C,maxHeight:B}=l,{x:D,y:E,width:_,height:P,aspectRatio:S}=t;let X=Math.floor(b?L-t.pointerX:0),F=Math.floor(g?w-t.pointerY:0);const $=_+(x?-X:X),H=P+(h?-F:F),te=-c[0]*_,oe=-c[1]*P;let I=ec($,N,T),J=ec(H,C,B);if(d){let G=0,K=0;x&&X<0?G=Ai(D+X+te,d[0][0]):!x&&X>0&&(G=Li(D+$+te,d[1][0])),h&&F<0?K=Ai(E+F+oe,d[0][1]):!h&&F>0&&(K=Li(E+H+oe,d[1][1])),I=Math.max(I,G),J=Math.max(J,K)}if(m){let G=0,K=0;x&&X>0?G=Li(D+X,m[0][0]):!x&&X<0&&(G=Ai(D+$,m[1][0])),h&&F>0?K=Li(E+F,m[0][1]):!h&&F<0&&(K=Ai(E+H,m[1][1])),I=Math.max(I,G),J=Math.max(J,K)}if(o){if(b){const G=ec($/S,C,B)*S;if(I=Math.max(I,G),d){let K=0;!x&&!h||x&&!h&&v?K=Li(E+oe+$/S,d[1][1])*S:K=Ai(E+oe+(x?X:-X)/S,d[0][1])*S,I=Math.max(I,K)}if(m){let K=0;!x&&!h||x&&!h&&v?K=Ai(E+$/S,m[1][1])*S:K=Li(E+(x?X:-X)/S,m[0][1])*S,I=Math.max(I,K)}}if(g){const G=ec(H*S,N,T)/S;if(J=Math.max(J,G),d){let K=0;!x&&!h||h&&!x&&v?K=Li(D+H*S+te,d[1][0])/S:K=Ai(D+(h?F:-F)*S+te,d[0][0])/S,J=Math.max(J,K)}if(m){let K=0;!x&&!h||h&&!x&&v?K=Ai(D+H*S,m[1][0])/S:K=Li(D+(h?F:-F)*S,m[0][0])/S,J=Math.max(J,K)}}}F=F+(F<0?J:-J),X=X+(X<0?I:-I),o&&(v?$>H*S?F=(nx(x,h)?-X:X)/S:X=(nx(x,h)?-F:F)*S:b?(F=X/S,h=x):(X=F*S,x=h));const R=x?D+X:D,Z=h?E+F:E;return{width:_+(x?-X:X),height:P+(h?-F:F),x:c[0]*X*(x?-1:1)+R,y:c[1]*F*(h?-1:1)+Z}}const r_={width:0,height:0,x:0,y:0},DD={...r_,pointerX:0,pointerY:0,aspectRatio:1};function CD(t){return[[0,0],[t.measured.width,t.measured.height]]}function SD(t,a,i){const l=a.position.x+t.position.x,o=a.position.y+t.position.y,c=t.measured.width??0,d=t.measured.height??0,m=i[0]*c,x=i[1]*d;return[[l-m,o-x],[l+c-m,o+d-x]]}function ND({domNode:t,nodeId:a,getStoreItems:i,onChange:l,onEnd:o}){const c=On(t);let d={controlDirection:tx("bottom-right"),boundaries:{minWidth:0,minHeight:0,maxWidth:Number.MAX_VALUE,maxHeight:Number.MAX_VALUE},resizeDirection:void 0,keepAspectRatio:!1};function m({controlPosition:h,boundaries:b,keepAspectRatio:g,resizeDirection:v,onResizeStart:L,onResize:w,onResizeEnd:N,shouldResize:T}){let C={...r_},B={...DD};d={boundaries:b,resizeDirection:v,keepAspectRatio:g,controlDirection:tx(h)};let D,E=null,_=[],P,S,X,F=!1;const $=mg().on("start",H=>{const{nodeLookup:te,transform:oe,snapGrid:I,snapToGrid:J,nodeOrigin:R,paneDomNode:Z}=i();if(D=te.get(a),!D)return;E=(Z==null?void 0:Z.getBoundingClientRect())??null;const{xSnapped:G,ySnapped:K}=is(H.sourceEvent,{transform:oe,snapGrid:I,snapToGrid:J,containerBounds:E});C={width:D.measured.width??0,height:D.measured.height??0,x:D.position.x??0,y:D.position.y??0},B={...C,pointerX:G,pointerY:K,aspectRatio:C.width/C.height},P=void 0,D.parentId&&(D.extent==="parent"||D.expandParent)&&(P=te.get(D.parentId),S=P&&D.extent==="parent"?CD(P):void 0),_=[],X=void 0;for(const[ne,j]of te)if(j.parentId===a&&(_.push({id:ne,position:{...j.position},extent:j.extent}),j.extent==="parent"||j.expandParent)){const M=SD(j,D,j.origin??R);X?X=[[Math.min(M[0][0],X[0][0]),Math.min(M[0][1],X[0][1])],[Math.max(M[1][0],X[1][0]),Math.max(M[1][1],X[1][1])]]:X=M}L==null||L(H,{...C})}).on("drag",H=>{const{transform:te,snapGrid:oe,snapToGrid:I,nodeOrigin:J}=i(),R=is(H.sourceEvent,{transform:te,snapGrid:oe,snapToGrid:I,containerBounds:E}),Z=[];if(!D)return;const{x:G,y:K,width:ne,height:j}=C,M={},V=D.origin??J,{width:ee,height:xe,x:be,y:Le}=wD(B,d.controlDirection,R,d.boundaries,d.keepAspectRatio,V,S,X),pe=ee!==ne,Te=xe!==j,Ze=be!==G&&pe,Me=Le!==K&&Te;if(!Ze&&!Me&&!pe&&!Te)return;if((Ze||Me||V[0]===1||V[1]===1)&&(M.x=Ze?be:C.x,M.y=Me?Le:C.y,C.x=M.x,C.y=M.y,_.length>0)){const at=be-G,Xe=Le-K;for(const Ct of _)Ct.position={x:Ct.position.x-at+V[0]*(ee-ne),y:Ct.position.y-Xe+V[1]*(xe-j)},Z.push(Ct)}if((pe||Te)&&(M.width=pe&&(!d.resizeDirection||d.resizeDirection==="horizontal")?ee:C.width,M.height=Te&&(!d.resizeDirection||d.resizeDirection==="vertical")?xe:C.height,C.width=M.width,C.height=M.height),P&&D.expandParent){const at=V[0]*(M.width??0);M.x&&M.x<at&&(C.x=at,B.x=B.x-(M.x-at));const Xe=V[1]*(M.height??0);M.y&&M.y<Xe&&(C.y=Xe,B.y=B.y-(M.y-Xe))}const Be=LD({width:C.width,prevWidth:ne,height:C.height,prevHeight:j,affectsX:d.controlDirection.affectsX,affectsY:d.controlDirection.affectsY}),Pe={...C,direction:Be};(T==null?void 0:T(H,Pe))!==!1&&(F=!0,w==null||w(H,Pe),l(M,Z))}).on("end",H=>{F&&(N==null||N(H,{...C}),o==null||o({...C}),F=!1)});c.call($)}function x(){c.on(".drag",null)}return{update:m,destroy:x}}var _0={exports:{}},b0={},y0={exports:{}},v0={};/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ax;function TD(){if(ax)return v0;ax=1;var t=vs();function a(g,v){return g===v&&(g!==0||1/g===1/v)||g!==g&&v!==v}var i=typeof Object.is=="function"?Object.is:a,l=t.useState,o=t.useEffect,c=t.useLayoutEffect,d=t.useDebugValue;function m(g,v){var L=v(),w=l({inst:{value:L,getSnapshot:v}}),N=w[0].inst,T=w[1];return c(function(){N.value=L,N.getSnapshot=v,x(N)&&T({inst:N})},[g,L,v]),o(function(){return x(N)&&T({inst:N}),g(function(){x(N)&&T({inst:N})})},[g]),d(L),L}function x(g){var v=g.getSnapshot;g=g.value;try{var L=v();return!i(g,L)}catch{return!0}}function h(g,v){return v()}var b=typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"?h:m;return v0.useSyncExternalStore=t.useSyncExternalStore!==void 0?t.useSyncExternalStore:b,v0}var ix;function MD(){return ix||(ix=1,y0.exports=TD()),y0.exports}/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var rx;function ED(){if(rx)return b0;rx=1;var t=vs(),a=MD();function i(h,b){return h===b&&(h!==0||1/h===1/b)||h!==h&&b!==b}var l=typeof Object.is=="function"?Object.is:i,o=a.useSyncExternalStore,c=t.useRef,d=t.useEffect,m=t.useMemo,x=t.useDebugValue;return b0.useSyncExternalStoreWithSelector=function(h,b,g,v,L){var w=c(null);if(w.current===null){var N={hasValue:!1,value:null};w.current=N}else N=w.current;w=m(function(){function C(P){if(!B){if(B=!0,D=P,P=v(P),L!==void 0&&N.hasValue){var S=N.value;if(L(S,P))return E=S}return E=P}if(S=E,l(D,P))return S;var X=v(P);return L!==void 0&&L(S,X)?(D=P,S):(D=P,E=X)}var B=!1,D,E,_=g===void 0?null:g;return[function(){return C(b())},_===null?void 0:function(){return C(_())}]},[b,g,v,L]);var T=o(h,w[0],w[1]);return d(function(){N.hasValue=!0,N.value=T},[T]),x(T),T},b0}var lx;function RD(){return lx||(lx=1,_0.exports=ED()),_0.exports}var kD=RD();const OD=Wx(kD),jD={},sx=t=>{let a;const i=new Set,l=(b,g)=>{const v=typeof b=="function"?b(a):b;if(!Object.is(v,a)){const L=a;a=g??(typeof v!="object"||v===null)?v:Object.assign({},a,v),i.forEach(w=>w(a,L))}},o=()=>a,x={setState:l,getState:o,getInitialState:()=>h,subscribe:b=>(i.add(b),()=>i.delete(b)),destroy:()=>{(jD?"production":void 0)!=="production"&&console.warn("[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected."),i.clear()}},h=a=t(l,o,x);return x},BD=t=>t?sx(t):sx,{useDebugValue:PD}=Vv,{useSyncExternalStoreWithSelector:zD}=OD,UD=t=>t;function l_(t,a=UD,i){const l=zD(t.subscribe,t.getState,t.getServerState||t.getInitialState,a,i);return PD(l),l}const ox=(t,a)=>{const i=BD(t),l=(o,c=a)=>l_(i,o,c);return Object.assign(l,i),l},$D=(t,a)=>t?ox(t,a):ox;function kt(t,a){if(Object.is(t,a))return!0;if(typeof t!="object"||t===null||typeof a!="object"||a===null)return!1;if(t instanceof Map&&a instanceof Map){if(t.size!==a.size)return!1;for(const[l,o]of t)if(!Object.is(o,a.get(l)))return!1;return!0}if(t instanceof Set&&a instanceof Set){if(t.size!==a.size)return!1;for(const l of t)if(!a.has(l))return!1;return!0}const i=Object.keys(t);if(i.length!==Object.keys(a).length)return!1;for(const l of i)if(!Object.prototype.hasOwnProperty.call(a,l)||!Object.is(t[l],a[l]))return!1;return!0}Qx();const Hc=z.createContext(null),ID=Hc.Provider,s_=_a.error001();function mt(t,a){const i=z.useContext(Hc);if(i===null)throw new Error(s_);return l_(i,t,a)}function Mt(){const t=z.useContext(Hc);if(t===null)throw new Error(s_);return z.useMemo(()=>({getState:t.getState,setState:t.setState,subscribe:t.subscribe}),[t])}const cx={display:"none"},HD={position:"absolute",width:1,height:1,margin:-1,border:0,padding:0,overflow:"hidden",clip:"rect(0px, 0px, 0px, 0px)",clipPath:"inset(100%)"},o_="react-flow__node-desc",c_="react-flow__edge-desc",JD="react-flow__aria-live",qD=t=>t.ariaLiveMessage,VD=t=>t.ariaLabelConfig;function ZD({rfId:t}){const a=mt(qD);return u.jsx("div",{id:`${JD}-${t}`,"aria-live":"assertive","aria-atomic":"true",style:HD,children:a})}function GD({rfId:t,disableKeyboardA11y:a}){const i=mt(VD);return u.jsxs(u.Fragment,{children:[u.jsx("div",{id:`${o_}-${t}`,style:cx,children:a?i["node.a11yDescription.default"]:i["node.a11yDescription.keyboardDisabled"]}),u.jsx("div",{id:`${c_}-${t}`,style:cx,children:i["edge.a11yDescription.default"]}),!a&&u.jsx(ZD,{rfId:t})]})}const Jc=z.forwardRef(({position:t="top-left",children:a,className:i,style:l,...o},c)=>{const d=`${t}`.split("-");return u.jsx("div",{className:Wt(["react-flow__panel",i,...d]),style:l,ref:c,...o,children:a})});Jc.displayName="Panel";function YD({proOptions:t,position:a="bottom-right"}){return t!=null&&t.hideAttribution?null:u.jsx(Jc,{position:a,className:"react-flow__attribution","data-message":"Please only hide this attribution when you are subscribed to React Flow Pro: https://pro.reactflow.dev",children:u.jsx("a",{href:"https://reactflow.dev",target:"_blank",rel:"noopener noreferrer","aria-label":"React Flow attribution",children:"React Flow"})})}const XD=t=>{const a=[],i=[];for(const[,l]of t.nodeLookup)l.selected&&a.push(l.internals.userNode);for(const[,l]of t.edgeLookup)l.selected&&i.push(l);return{selectedNodes:a,selectedEdges:i}},tc=t=>t.id;function FD(t,a){return kt(t.selectedNodes.map(tc),a.selectedNodes.map(tc))&&kt(t.selectedEdges.map(tc),a.selectedEdges.map(tc))}function KD({onSelectionChange:t}){const a=Mt(),{selectedNodes:i,selectedEdges:l}=mt(XD,FD);return z.useEffect(()=>{const o={nodes:i,edges:l};t==null||t(o),a.getState().onSelectionChangeHandlers.forEach(c=>c(o))},[i,l,t]),null}const WD=t=>!!t.onSelectionChangeHandlers;function QD({onSelectionChange:t}){const a=mt(WD);return t||a?u.jsx(KD,{onSelectionChange:t}):null}const u_=[0,0],eC={x:0,y:0,zoom:1},tC=["nodes","edges","defaultNodes","defaultEdges","onConnect","onConnectStart","onConnectEnd","onClickConnectStart","onClickConnectEnd","nodesDraggable","autoPanOnNodeFocus","nodesConnectable","nodesFocusable","edgesFocusable","edgesReconnectable","elevateNodesOnSelect","elevateEdgesOnSelect","minZoom","maxZoom","nodeExtent","onNodesChange","onEdgesChange","elementsSelectable","connectionMode","snapGrid","snapToGrid","translateExtent","connectOnClick","defaultEdgeOptions","fitView","fitViewOptions","onNodesDelete","onEdgesDelete","onDelete","onNodeDrag","onNodeDragStart","onNodeDragStop","onSelectionDrag","onSelectionDragStart","onSelectionDragStop","onMoveStart","onMove","onMoveEnd","noPanClassName","nodeOrigin","autoPanOnConnect","autoPanOnNodeDrag","onError","connectionRadius","isValidConnection","selectNodesOnDrag","nodeDragThreshold","connectionDragThreshold","onBeforeDelete","debug","autoPanSpeed","ariaLabelConfig","zIndexMode"],ux=[...tC,"rfId"],nC=t=>({setNodes:t.setNodes,setEdges:t.setEdges,setMinZoom:t.setMinZoom,setMaxZoom:t.setMaxZoom,setTranslateExtent:t.setTranslateExtent,setNodeExtent:t.setNodeExtent,reset:t.reset,setDefaultNodesAndEdges:t.setDefaultNodesAndEdges}),dx={translateExtent:ds,nodeOrigin:u_,minZoom:.5,maxZoom:2,elementsSelectable:!0,noPanClassName:"nopan",rfId:"1"};function aC(t){const{setNodes:a,setEdges:i,setMinZoom:l,setMaxZoom:o,setTranslateExtent:c,setNodeExtent:d,reset:m,setDefaultNodesAndEdges:x}=mt(nC,kt),h=Mt();z.useEffect(()=>(x(t.defaultNodes,t.defaultEdges),()=>{b.current=dx,m()}),[]);const b=z.useRef(dx);return z.useEffect(()=>{for(const g of ux){const v=t[g],L=b.current[g];v!==L&&(typeof t[g]>"u"||(g==="nodes"?a(v):g==="edges"?i(v):g==="minZoom"?l(v):g==="maxZoom"?o(v):g==="translateExtent"?c(v):g==="nodeExtent"?d(v):g==="ariaLabelConfig"?h.setState({ariaLabelConfig:Iw(v)}):g==="fitView"?h.setState({fitViewQueued:v}):g==="fitViewOptions"?h.setState({fitViewOptions:v}):h.setState({[g]:v})))}b.current=t},ux.map(g=>t[g])),null}function fx(){return typeof window>"u"||!window.matchMedia?null:window.matchMedia("(prefers-color-scheme: dark)")}function iC(t){var l;const[a,i]=z.useState(t==="system"?null:t);return z.useEffect(()=>{if(t!=="system"){i(t);return}const o=fx(),c=()=>i(o!=null&&o.matches?"dark":"light");return c(),o==null||o.addEventListener("change",c),()=>{o==null||o.removeEventListener("change",c)}},[t]),a!==null?a:(l=fx())!=null&&l.matches?"dark":"light"}const px=typeof document<"u"?document:null;function xs(t=null,a={target:px,actInsideInputWithModifier:!0}){const[i,l]=z.useState(!1),o=z.useRef(!1),c=z.useRef(new Set([])),[d,m]=z.useMemo(()=>{if(t!==null){const h=(Array.isArray(t)?t:[t]).filter(g=>typeof g=="string").map(g=>g.replace("+",`
`).replace(`

`,`
+`).split(`
`)),b=h.reduce((g,v)=>g.concat(...v),[]);return[h,b]}return[[],[]]},[t]);return z.useEffect(()=>{const x=(a==null?void 0:a.target)??px,h=(a==null?void 0:a.actInsideInputWithModifier)??!0;if(t!==null){const b=L=>{var T,C;if(o.current=L.ctrlKey||L.metaKey||L.shiftKey||L.altKey,(!o.current||o.current&&!h)&&Hg(L))return!1;const N=hx(L.code,m);if(c.current.add(L[N]),mx(d,c.current,!1)){const B=((C=(T=L.composedPath)==null?void 0:T.call(L))==null?void 0:C[0])||L.target,D=(B==null?void 0:B.nodeName)==="BUTTON"||(B==null?void 0:B.nodeName)==="A";a.preventDefault!==!1&&(o.current||!D)&&L.preventDefault(),l(!0)}},g=L=>{const w=hx(L.code,m);mx(d,c.current,!0)?(l(!1),c.current.clear()):c.current.delete(L[w]),L.key==="Meta"&&c.current.clear(),o.current=!1},v=()=>{c.current.clear(),l(!1)};return x==null||x.addEventListener("keydown",b),x==null||x.addEventListener("keyup",g),window.addEventListener("blur",v),window.addEventListener("contextmenu",v),()=>{x==null||x.removeEventListener("keydown",b),x==null||x.removeEventListener("keyup",g),window.removeEventListener("blur",v),window.removeEventListener("contextmenu",v)}}},[t,l]),i}function mx(t,a,i){return t.filter(l=>i||l.length===a.size).some(l=>l.every(o=>a.has(o)))}function hx(t,a){return a.includes(t)?"code":"key"}const rC=()=>{const t=Mt();return z.useMemo(()=>({zoomIn:a=>{const{panZoom:i}=t.getState();return i?i.scaleBy(1.2,{duration:a==null?void 0:a.duration}):Promise.resolve(!1)},zoomOut:a=>{const{panZoom:i}=t.getState();return i?i.scaleBy(1/1.2,{duration:a==null?void 0:a.duration}):Promise.resolve(!1)},zoomTo:(a,i)=>{const{panZoom:l}=t.getState();return l?l.scaleTo(a,{duration:i==null?void 0:i.duration}):Promise.resolve(!1)},getZoom:()=>t.getState().transform[2],setViewport:async(a,i)=>{const{transform:[l,o,c],panZoom:d}=t.getState();return d?(await d.setViewport({x:a.x??l,y:a.y??o,zoom:a.zoom??c},i),Promise.resolve(!0)):Promise.resolve(!1)},getViewport:()=>{const[a,i,l]=t.getState().transform;return{x:a,y:i,zoom:l}},setCenter:async(a,i,l)=>t.getState().setCenter(a,i,l),fitBounds:async(a,i)=>{const{width:l,height:o,minZoom:c,maxZoom:d,panZoom:m}=t.getState(),x=uf(a,l,o,c,d,(i==null?void 0:i.padding)??.1);return m?(await m.setViewport(x,{duration:i==null?void 0:i.duration,ease:i==null?void 0:i.ease,interpolate:i==null?void 0:i.interpolate}),Promise.resolve(!0)):Promise.resolve(!1)},screenToFlowPosition:(a,i={})=>{const{transform:l,snapGrid:o,snapToGrid:c,domNode:d}=t.getState();if(!d)return a;const{x:m,y:x}=d.getBoundingClientRect(),h={x:a.x-m,y:a.y-x},b=i.snapGrid??o,g=i.snapToGrid??c;return Ss(h,l,g,b)},flowToScreenPosition:a=>{const{transform:i,domNode:l}=t.getState();if(!l)return a;const{x:o,y:c}=l.getBoundingClientRect(),d=Dc(a,i);return{x:d.x+o,y:d.y+c}}}),[])};function d_(t,a){const i=[],l=new Map,o=[];for(const c of t)if(c.type==="add"){o.push(c);continue}else if(c.type==="remove"||c.type==="replace")l.set(c.id,[c]);else{const d=l.get(c.id);d?d.push(c):l.set(c.id,[c])}for(const c of a){const d=l.get(c.id);if(!d){i.push(c);continue}if(d[0].type==="remove")continue;if(d[0].type==="replace"){i.push({...d[0].item});continue}const m={...c};for(const x of d)lC(x,m);i.push(m)}return o.length&&o.forEach(c=>{c.index!==void 0?i.splice(c.index,0,{...c.item}):i.push({...c.item})}),i}function lC(t,a){switch(t.type){case"select":{a.selected=t.selected;break}case"position":{typeof t.position<"u"&&(a.position=t.position),typeof t.dragging<"u"&&(a.dragging=t.dragging);break}case"dimensions":{typeof t.dimensions<"u"&&(a.measured={...t.dimensions},t.setAttributes&&((t.setAttributes===!0||t.setAttributes==="width")&&(a.width=t.dimensions.width),(t.setAttributes===!0||t.setAttributes==="height")&&(a.height=t.dimensions.height))),typeof t.resizing=="boolean"&&(a.resizing=t.resizing);break}}}function f_(t,a){return d_(t,a)}function p_(t,a){return d_(t,a)}function Fi(t,a){return{id:t,type:"select",selected:a}}function qr(t,a=new Set,i=!1){const l=[];for(const[o,c]of t){const d=a.has(o);!(c.selected===void 0&&!d)&&c.selected!==d&&(i&&(c.selected=d),l.push(Fi(c.id,d)))}return l}function xx({items:t=[],lookup:a}){var o;const i=[],l=new Map(t.map(c=>[c.id,c]));for(const[c,d]of t.entries()){const m=a.get(d.id),x=((o=m==null?void 0:m.internals)==null?void 0:o.userNode)??m;x!==void 0&&x!==d&&i.push({id:d.id,item:d,type:"replace"}),x===void 0&&i.push({item:d,type:"add",index:c})}for(const[c]of a)l.get(c)===void 0&&i.push({id:c,type:"remove"});return i}function gx(t){return{id:t.id,type:"remove"}}const _x=t=>Ew(t),sC=t=>Og(t);function m_(t){return z.forwardRef(t)}const oC=typeof window<"u"?z.useLayoutEffect:z.useEffect;function bx(t){const[a,i]=z.useState(BigInt(0)),[l]=z.useState(()=>cC(()=>i(o=>o+BigInt(1))));return oC(()=>{const o=l.get();o.length&&(t(o),l.reset())},[a]),l}function cC(t){let a=[];return{get:()=>a,reset:()=>{a=[]},push:i=>{a.push(i),t()}}}const h_=z.createContext(null);function uC({children:t}){const a=Mt(),i=z.useCallback(m=>{const{nodes:x=[],setNodes:h,hasDefaultNodes:b,onNodesChange:g,nodeLookup:v,fitViewQueued:L,onNodesChangeMiddlewareMap:w}=a.getState();let N=x;for(const C of m)N=typeof C=="function"?C(N):C;let T=xx({items:N,lookup:v});for(const C of w.values())T=C(T);b&&h(N),T.length>0?g==null||g(T):L&&window.requestAnimationFrame(()=>{const{fitViewQueued:C,nodes:B,setNodes:D}=a.getState();C&&D(B)})},[]),l=bx(i),o=z.useCallback(m=>{const{edges:x=[],setEdges:h,hasDefaultEdges:b,onEdgesChange:g,edgeLookup:v}=a.getState();let L=x;for(const w of m)L=typeof w=="function"?w(L):w;b?h(L):g&&g(xx({items:L,lookup:v}))},[]),c=bx(o),d=z.useMemo(()=>({nodeQueue:l,edgeQueue:c}),[]);return u.jsx(h_.Provider,{value:d,children:t})}function dC(){const t=z.useContext(h_);if(!t)throw new Error("useBatchContext must be used within a BatchProvider");return t}const fC=t=>!!t.panZoom;function gf(){const t=rC(),a=Mt(),i=dC(),l=mt(fC),o=z.useMemo(()=>{const c=g=>a.getState().nodeLookup.get(g),d=g=>{i.nodeQueue.push(g)},m=g=>{i.edgeQueue.push(g)},x=g=>{var C,B;const{nodeLookup:v,nodeOrigin:L}=a.getState(),w=_x(g)?g:v.get(g.id),N=w.parentId?$g(w.position,w.measured,w.parentId,v,L):w.position,T={...w,position:N,width:((C=w.measured)==null?void 0:C.width)??w.width,height:((B=w.measured)==null?void 0:B.height)??w.height};return Wr(T)},h=(g,v,L={replace:!1})=>{d(w=>w.map(N=>{if(N.id===g){const T=typeof v=="function"?v(N):v;return L.replace&&_x(T)?T:{...N,...T}}return N}))},b=(g,v,L={replace:!1})=>{m(w=>w.map(N=>{if(N.id===g){const T=typeof v=="function"?v(N):v;return L.replace&&sC(T)?T:{...N,...T}}return N}))};return{getNodes:()=>a.getState().nodes.map(g=>({...g})),getNode:g=>{var v;return(v=c(g))==null?void 0:v.internals.userNode},getInternalNode:c,getEdges:()=>{const{edges:g=[]}=a.getState();return g.map(v=>({...v}))},getEdge:g=>a.getState().edgeLookup.get(g),setNodes:d,setEdges:m,addNodes:g=>{const v=Array.isArray(g)?g:[g];i.nodeQueue.push(L=>[...L,...v])},addEdges:g=>{const v=Array.isArray(g)?g:[g];i.edgeQueue.push(L=>[...L,...v])},toObject:()=>{const{nodes:g=[],edges:v=[],transform:L}=a.getState(),[w,N,T]=L;return{nodes:g.map(C=>({...C})),edges:v.map(C=>({...C})),viewport:{x:w,y:N,zoom:T}}},deleteElements:async({nodes:g=[],edges:v=[]})=>{const{nodes:L,edges:w,onNodesDelete:N,onEdgesDelete:T,triggerNodeChanges:C,triggerEdgeChanges:B,onDelete:D,onBeforeDelete:E}=a.getState(),{nodes:_,edges:P}=await Bw({nodesToRemove:g,edgesToRemove:v,nodes:L,edges:w,onBeforeDelete:E}),S=P.length>0,X=_.length>0;if(S){const F=P.map(gx);T==null||T(P),B(F)}if(X){const F=_.map(gx);N==null||N(_),C(F)}return(X||S)&&(D==null||D({nodes:_,edges:P})),{deletedNodes:_,deletedEdges:P}},getIntersectingNodes:(g,v=!0,L)=>{const w=q1(g),N=w?g:x(g),T=L!==void 0;return N?(L||a.getState().nodes).filter(C=>{const B=a.getState().nodeLookup.get(C.id);if(B&&!w&&(C.id===g.id||!B.internals.positionAbsolute))return!1;const D=Wr(T?C:B),E=ms(D,N);return v&&E>0||E>=D.width*D.height||E>=N.width*N.height}):[]},isNodeIntersecting:(g,v,L=!0)=>{const N=q1(g)?g:x(g);if(!N)return!1;const T=ms(N,v);return L&&T>0||T>=v.width*v.height||T>=N.width*N.height},updateNode:h,updateNodeData:(g,v,L={replace:!1})=>{h(g,w=>{const N=typeof v=="function"?v(w):v;return L.replace?{...w,data:N}:{...w,data:{...w.data,...N}}},L)},updateEdge:b,updateEdgeData:(g,v,L={replace:!1})=>{b(g,w=>{const N=typeof v=="function"?v(w):v;return L.replace?{...w,data:N}:{...w,data:{...w.data,...N}}},L)},getNodesBounds:g=>{const{nodeLookup:v,nodeOrigin:L}=a.getState();return Rw(g,{nodeLookup:v,nodeOrigin:L})},getHandleConnections:({type:g,id:v,nodeId:L})=>{var w;return Array.from(((w=a.getState().connectionLookup.get(`${L}-${g}${v?`-${v}`:""}`))==null?void 0:w.values())??[])},getNodeConnections:({type:g,handleId:v,nodeId:L})=>{var w;return Array.from(((w=a.getState().connectionLookup.get(`${L}${g?v?`-${g}-${v}`:`-${g}`:""}`))==null?void 0:w.values())??[])},fitView:async g=>{const v=a.getState().fitViewResolver??$w();return a.setState({fitViewQueued:!0,fitViewOptions:g,fitViewResolver:v}),i.nodeQueue.push(L=>[...L]),v.promise}}},[]);return z.useMemo(()=>({...o,...t,viewportInitialized:l}),[l])}const yx=t=>t.selected,pC=typeof window<"u"?window:void 0;function mC({deleteKeyCode:t,multiSelectionKeyCode:a}){const i=Mt(),{deleteElements:l}=gf(),o=xs(t,{actInsideInputWithModifier:!1}),c=xs(a,{target:pC});z.useEffect(()=>{if(o){const{edges:d,nodes:m}=i.getState();l({nodes:m.filter(yx),edges:d.filter(yx)}),i.setState({nodesSelectionActive:!1})}},[o]),z.useEffect(()=>{i.setState({multiSelectionActive:c})},[c])}function hC(t){const a=Mt();z.useEffect(()=>{const i=()=>{var o,c,d,m;if(!t.current||!(((c=(o=t.current).checkVisibility)==null?void 0:c.call(o))??!0))return!1;const l=df(t.current);(l.height===0||l.width===0)&&((m=(d=a.getState()).onError)==null||m.call(d,"004",_a.error004())),a.setState({width:l.width||500,height:l.height||500})};if(t.current){i(),window.addEventListener("resize",i);const l=new ResizeObserver(()=>i());return l.observe(t.current),()=>{window.removeEventListener("resize",i),l&&t.current&&l.unobserve(t.current)}}},[])}const qc={position:"absolute",width:"100%",height:"100%",top:0,left:0},xC=t=>({userSelectionActive:t.userSelectionActive,lib:t.lib,connectionInProgress:t.connection.inProgress});function gC({onPaneContextMenu:t,zoomOnScroll:a=!0,zoomOnPinch:i=!0,panOnScroll:l=!1,panOnScrollSpeed:o=.5,panOnScrollMode:c=Qi.Free,zoomOnDoubleClick:d=!0,panOnDrag:m=!0,defaultViewport:x,translateExtent:h,minZoom:b,maxZoom:g,zoomActivationKeyCode:v,preventScrolling:L=!0,children:w,noWheelClassName:N,noPanClassName:T,onViewportChange:C,isControlledViewport:B,paneClickDistance:D,selectionOnDrag:E}){const _=Mt(),P=z.useRef(null),{userSelectionActive:S,lib:X,connectionInProgress:F}=mt(xC,kt),$=xs(v),H=z.useRef();hC(P);const te=z.useCallback(oe=>{C==null||C({x:oe[0],y:oe[1],zoom:oe[2]}),B||_.setState({transform:oe})},[C,B]);return z.useEffect(()=>{if(P.current){H.current=AD({domNode:P.current,minZoom:b,maxZoom:g,translateExtent:h,viewport:x,onDraggingChange:R=>_.setState(Z=>Z.paneDragging===R?Z:{paneDragging:R}),onPanZoomStart:(R,Z)=>{const{onViewportChangeStart:G,onMoveStart:K}=_.getState();K==null||K(R,Z),G==null||G(Z)},onPanZoom:(R,Z)=>{const{onViewportChange:G,onMove:K}=_.getState();K==null||K(R,Z),G==null||G(Z)},onPanZoomEnd:(R,Z)=>{const{onViewportChangeEnd:G,onMoveEnd:K}=_.getState();K==null||K(R,Z),G==null||G(Z)}});const{x:oe,y:I,zoom:J}=H.current.getViewport();return _.setState({panZoom:H.current,transform:[oe,I,J],domNode:P.current.closest(".react-flow")}),()=>{var R;(R=H.current)==null||R.destroy()}}},[]),z.useEffect(()=>{var oe;(oe=H.current)==null||oe.update({onPaneContextMenu:t,zoomOnScroll:a,zoomOnPinch:i,panOnScroll:l,panOnScrollSpeed:o,panOnScrollMode:c,zoomOnDoubleClick:d,panOnDrag:m,zoomActivationKeyPressed:$,preventScrolling:L,noPanClassName:T,userSelectionActive:S,noWheelClassName:N,lib:X,onTransformChange:te,connectionInProgress:F,selectionOnDrag:E,paneClickDistance:D})},[t,a,i,l,o,c,d,m,$,L,T,S,N,X,te,F,E,D]),u.jsx("div",{className:"react-flow__renderer",ref:P,style:qc,children:w})}const _C=t=>({userSelectionActive:t.userSelectionActive,userSelectionRect:t.userSelectionRect});function bC(){const{userSelectionActive:t,userSelectionRect:a}=mt(_C,kt);return t&&a?u.jsx("div",{className:"react-flow__selection react-flow__container",style:{width:a.width,height:a.height,transform:`translate(${a.x}px, ${a.y}px)`}}):null}const A0=(t,a)=>i=>{i.target===a.current&&(t==null||t(i))},yC=t=>({userSelectionActive:t.userSelectionActive,elementsSelectable:t.elementsSelectable,connectionInProgress:t.connection.inProgress,dragging:t.paneDragging});function vC({isSelecting:t,selectionKeyPressed:a,selectionMode:i=fs.Full,panOnDrag:l,paneClickDistance:o,selectionOnDrag:c,onSelectionStart:d,onSelectionEnd:m,onPaneClick:x,onPaneContextMenu:h,onPaneScroll:b,onPaneMouseEnter:g,onPaneMouseMove:v,onPaneMouseLeave:L,children:w}){const N=Mt(),{userSelectionActive:T,elementsSelectable:C,dragging:B,connectionInProgress:D}=mt(yC,kt),E=C&&(t||T),_=z.useRef(null),P=z.useRef(),S=z.useRef(new Set),X=z.useRef(new Set),F=z.useRef(!1),$=G=>{if(F.current||D){F.current=!1;return}x==null||x(G),N.getState().resetSelectedElements(),N.setState({nodesSelectionActive:!1})},H=G=>{if(Array.isArray(l)&&(l!=null&&l.includes(2))){G.preventDefault();return}h==null||h(G)},te=b?G=>b(G):void 0,oe=G=>{F.current&&(G.stopPropagation(),F.current=!1)},I=G=>{var xe,be;const{domNode:K}=N.getState();if(P.current=K==null?void 0:K.getBoundingClientRect(),!P.current)return;const ne=G.target===_.current;if(!ne&&!!G.target.closest(".nokey")||!t||!(c&&ne||a)||G.button!==0||!G.isPrimary)return;(be=(xe=G.target)==null?void 0:xe.setPointerCapture)==null||be.call(xe,G.pointerId),F.current=!1;const{x:V,y:ee}=na(G.nativeEvent,P.current);N.setState({userSelectionRect:{width:0,height:0,startX:V,startY:ee,x:V,y:ee}}),ne||(G.stopPropagation(),G.preventDefault())},J=G=>{const{userSelectionRect:K,transform:ne,nodeLookup:j,edgeLookup:M,connectionLookup:V,triggerNodeChanges:ee,triggerEdgeChanges:xe,defaultEdgeOptions:be,resetSelectedElements:Le}=N.getState();if(!P.current||!K)return;const{x:pe,y:Te}=na(G.nativeEvent,P.current),{startX:Ze,startY:Me}=K;if(!F.current){const Xe=a?0:o;if(Math.hypot(pe-Ze,Te-Me)<=Xe)return;Le(),d==null||d(G)}F.current=!0;const Be={startX:Ze,startY:Me,x:pe<Ze?pe:Ze,y:Te<Me?Te:Me,width:Math.abs(pe-Ze),height:Math.abs(Te-Me)},Pe=S.current,He=X.current;S.current=new Set(cf(j,Be,ne,i===fs.Partial,!0).map(Xe=>Xe.id)),X.current=new Set;const at=(be==null?void 0:be.selectable)??!0;for(const Xe of S.current){const Ct=V.get(Xe);if(Ct)for(const{edgeId:nn}of Ct.values()){const Pt=M.get(nn);Pt&&(Pt.selectable??at)&&X.current.add(nn)}}if(!V1(Pe,S.current)){const Xe=qr(j,S.current,!0);ee(Xe)}if(!V1(He,X.current)){const Xe=qr(M,X.current);xe(Xe)}N.setState({userSelectionRect:Be,userSelectionActive:!0,nodesSelectionActive:!1})},R=G=>{var K,ne;G.button===0&&((ne=(K=G.target)==null?void 0:K.releasePointerCapture)==null||ne.call(K,G.pointerId),!T&&G.target===_.current&&N.getState().userSelectionRect&&($==null||$(G)),N.setState({userSelectionActive:!1,userSelectionRect:null}),F.current&&(m==null||m(G),N.setState({nodesSelectionActive:S.current.size>0})))},Z=l===!0||Array.isArray(l)&&l.includes(0);return u.jsxs("div",{className:Wt(["react-flow__pane",{draggable:Z,dragging:B,selection:t}]),onClick:E?void 0:A0($,_),onContextMenu:A0(H,_),onWheel:A0(te,_),onPointerEnter:E?void 0:g,onPointerMove:E?J:v,onPointerUp:E?R:void 0,onPointerDownCapture:E?I:void 0,onClickCapture:E?oe:void 0,onPointerLeave:L,ref:_,style:qc,children:[w,u.jsx(bC,{})]})}function Z0({id:t,store:a,unselect:i=!1,nodeRef:l}){const{addSelectedNodes:o,unselectNodesAndEdges:c,multiSelectionActive:d,nodeLookup:m,onError:x}=a.getState(),h=m.get(t);if(!h){x==null||x("012",_a.error012(t));return}a.setState({nodesSelectionActive:!1}),h.selected?(i||h.selected&&d)&&(c({nodes:[h],edges:[]}),requestAnimationFrame(()=>{var b;return(b=l==null?void 0:l.current)==null?void 0:b.blur()})):o([t])}function x_({nodeRef:t,disabled:a=!1,noDragClassName:i,handleSelector:l,nodeId:o,isSelectable:c,nodeClickDistance:d}){const m=Mt(),[x,h]=z.useState(!1),b=z.useRef();return z.useEffect(()=>{b.current=oD({getStoreItems:()=>m.getState(),onNodeMouseDown:g=>{Z0({id:g,store:m,nodeRef:t})},onDragStart:()=>{h(!0)},onDragStop:()=>{h(!1)}})},[]),z.useEffect(()=>{if(!(a||!t.current||!b.current))return b.current.update({noDragClassName:i,handleSelector:l,domNode:t.current,isSelectable:c,nodeId:o,nodeClickDistance:d}),()=>{var g;(g=b.current)==null||g.destroy()}},[i,l,a,c,t,o,d]),x}const AC=t=>a=>a.selected&&(a.draggable||t&&typeof a.draggable>"u");function g_(){const t=Mt();return z.useCallback(i=>{const{nodeExtent:l,snapToGrid:o,snapGrid:c,nodesDraggable:d,onError:m,updateNodePositions:x,nodeLookup:h,nodeOrigin:b}=t.getState(),g=new Map,v=AC(d),L=o?c[0]:5,w=o?c[1]:5,N=i.direction.x*L*i.factor,T=i.direction.y*w*i.factor;for(const[,C]of h){if(!v(C))continue;let B={x:C.internals.positionAbsolute.x+N,y:C.internals.positionAbsolute.y+T};o&&(B=Cs(B,c));const{position:D,positionAbsolute:E}=jg({nodeId:C.id,nextPosition:B,nodeLookup:h,nodeExtent:l,nodeOrigin:b,onError:m});C.position=D,C.internals.positionAbsolute=E,g.set(C.id,C)}x(g)},[])}const _f=z.createContext(null),LC=_f.Provider;_f.Consumer;const __=()=>z.useContext(_f),wC=t=>({connectOnClick:t.connectOnClick,noPanClassName:t.noPanClassName,rfId:t.rfId}),DC=(t,a,i)=>l=>{const{connectionClickStartHandle:o,connectionMode:c,connection:d}=l,{fromHandle:m,toHandle:x,isValid:h}=d,b=(x==null?void 0:x.nodeId)===t&&(x==null?void 0:x.id)===a&&(x==null?void 0:x.type)===i;return{connectingFrom:(m==null?void 0:m.nodeId)===t&&(m==null?void 0:m.id)===a&&(m==null?void 0:m.type)===i,connectingTo:b,clickConnecting:(o==null?void 0:o.nodeId)===t&&(o==null?void 0:o.id)===a&&(o==null?void 0:o.type)===i,isPossibleEndHandle:c===Fr.Strict?(m==null?void 0:m.type)!==i:t!==(m==null?void 0:m.nodeId)||a!==(m==null?void 0:m.id),connectionInProcess:!!m,clickConnectionInProcess:!!o,valid:b&&h}};function CC({type:t="source",position:a=ye.Top,isValidConnection:i,isConnectable:l=!0,isConnectableStart:o=!0,isConnectableEnd:c=!0,id:d,onConnect:m,children:x,className:h,onMouseDown:b,onTouchStart:g,...v},L){var J,R;const w=d||null,N=t==="target",T=Mt(),C=__(),{connectOnClick:B,noPanClassName:D,rfId:E}=mt(wC,kt),{connectingFrom:_,connectingTo:P,clickConnecting:S,isPossibleEndHandle:X,connectionInProcess:F,clickConnectionInProcess:$,valid:H}=mt(DC(C,w,t),kt);C||(R=(J=T.getState()).onError)==null||R.call(J,"010",_a.error010());const te=Z=>{const{defaultEdgeOptions:G,onConnect:K,hasDefaultEdges:ne}=T.getState(),j={...G,...Z};if(ne){const{edges:M,setEdges:V}=T.getState();V(Gg(j,M))}K==null||K(j),m==null||m(j)},oe=Z=>{if(!C)return;const G=Jg(Z.nativeEvent);if(o&&(G&&Z.button===0||!G)){const K=T.getState();V0.onPointerDown(Z.nativeEvent,{handleDomNode:Z.currentTarget,autoPanOnConnect:K.autoPanOnConnect,connectionMode:K.connectionMode,connectionRadius:K.connectionRadius,domNode:K.domNode,nodeLookup:K.nodeLookup,lib:K.lib,isTarget:N,handleId:w,nodeId:C,flowId:K.rfId,panBy:K.panBy,cancelConnection:K.cancelConnection,onConnectStart:K.onConnectStart,onConnectEnd:(...ne)=>{var j,M;return(M=(j=T.getState()).onConnectEnd)==null?void 0:M.call(j,...ne)},updateConnection:K.updateConnection,onConnect:te,isValidConnection:i||((...ne)=>{var j,M;return((M=(j=T.getState()).isValidConnection)==null?void 0:M.call(j,...ne))??!0}),getTransform:()=>T.getState().transform,getFromHandle:()=>T.getState().connection.fromHandle,autoPanSpeed:K.autoPanSpeed,dragThreshold:K.connectionDragThreshold})}G?b==null||b(Z):g==null||g(Z)},I=Z=>{const{onClickConnectStart:G,onClickConnectEnd:K,connectionClickStartHandle:ne,connectionMode:j,isValidConnection:M,lib:V,rfId:ee,nodeLookup:xe,connection:be}=T.getState();if(!C||!ne&&!o)return;if(!ne){G==null||G(Z.nativeEvent,{nodeId:C,handleId:w,handleType:t}),T.setState({connectionClickStartHandle:{nodeId:C,type:t,id:w}});return}const Le=Ig(Z.target),pe=i||M,{connection:Te,isValid:Ze}=V0.isValid(Z.nativeEvent,{handle:{nodeId:C,id:w,type:t},connectionMode:j,fromNodeId:ne.nodeId,fromHandleId:ne.id||null,fromType:ne.type,isValidConnection:pe,flowId:ee,doc:Le,lib:V,nodeLookup:xe});Ze&&Te&&te(Te);const Me=structuredClone(be);delete Me.inProgress,Me.toPosition=Me.toHandle?Me.toHandle.position:null,K==null||K(Z,Me),T.setState({connectionClickStartHandle:null})};return u.jsx("div",{"data-handleid":w,"data-nodeid":C,"data-handlepos":a,"data-id":`${E}-${C}-${w}-${t}`,className:Wt(["react-flow__handle",`react-flow__handle-${a}`,"nodrag",D,h,{source:!N,target:N,connectable:l,connectablestart:o,connectableend:c,clickconnecting:S,connectingfrom:_,connectingto:P,valid:H,connectionindicator:l&&(!F||X)&&(F||$?c:o)}]),onMouseDown:oe,onTouchStart:oe,onClick:B?I:void 0,ref:L,...v,children:x})}const Oe=z.memo(m_(CC));function SC({data:t,isConnectable:a,sourcePosition:i=ye.Bottom}){return u.jsxs(u.Fragment,{children:[t==null?void 0:t.label,u.jsx(Oe,{type:"source",position:i,isConnectable:a})]})}function NC({data:t,isConnectable:a,targetPosition:i=ye.Top,sourcePosition:l=ye.Bottom}){return u.jsxs(u.Fragment,{children:[u.jsx(Oe,{type:"target",position:i,isConnectable:a}),t==null?void 0:t.label,u.jsx(Oe,{type:"source",position:l,isConnectable:a})]})}function TC(){return null}function MC({data:t,isConnectable:a,targetPosition:i=ye.Top}){return u.jsxs(u.Fragment,{children:[u.jsx(Oe,{type:"target",position:i,isConnectable:a}),t==null?void 0:t.label]})}const Cc={ArrowUp:{x:0,y:-1},ArrowDown:{x:0,y:1},ArrowLeft:{x:-1,y:0},ArrowRight:{x:1,y:0}},vx={input:SC,default:NC,output:MC,group:TC};function EC(t){var a,i,l,o;return t.internals.handleBounds===void 0?{width:t.width??t.initialWidth??((a=t.style)==null?void 0:a.width),height:t.height??t.initialHeight??((i=t.style)==null?void 0:i.height)}:{width:t.width??((l=t.style)==null?void 0:l.width),height:t.height??((o=t.style)==null?void 0:o.height)}}const RC=t=>{const{width:a,height:i,x:l,y:o}=Ds(t.nodeLookup,{filter:c=>!!c.selected});return{width:ta(a)?a:null,height:ta(i)?i:null,userSelectionActive:t.userSelectionActive,transformString:`translate(${t.transform[0]}px,${t.transform[1]}px) scale(${t.transform[2]}) translate(${l}px,${o}px)`}};function kC({onSelectionContextMenu:t,noPanClassName:a,disableKeyboardA11y:i}){const l=Mt(),{width:o,height:c,transformString:d,userSelectionActive:m}=mt(RC,kt),x=g_(),h=z.useRef(null);z.useEffect(()=>{var L;i||(L=h.current)==null||L.focus({preventScroll:!0})},[i]);const b=!m&&o!==null&&c!==null;if(x_({nodeRef:h,disabled:!b}),!b)return null;const g=t?L=>{const w=l.getState().nodes.filter(N=>N.selected);t(L,w)}:void 0,v=L=>{Object.prototype.hasOwnProperty.call(Cc,L.key)&&(L.preventDefault(),x({direction:Cc[L.key],factor:L.shiftKey?4:1}))};return u.jsx("div",{className:Wt(["react-flow__nodesselection","react-flow__container",a]),style:{transform:d},children:u.jsx("div",{ref:h,className:"react-flow__nodesselection-rect",onContextMenu:g,tabIndex:i?void 0:-1,onKeyDown:i?void 0:v,style:{width:o,height:c}})})}const Ax=typeof window<"u"?window:void 0,OC=t=>({nodesSelectionActive:t.nodesSelectionActive,userSelectionActive:t.userSelectionActive});function b_({children:t,onPaneClick:a,onPaneMouseEnter:i,onPaneMouseMove:l,onPaneMouseLeave:o,onPaneContextMenu:c,onPaneScroll:d,paneClickDistance:m,deleteKeyCode:x,selectionKeyCode:h,selectionOnDrag:b,selectionMode:g,onSelectionStart:v,onSelectionEnd:L,multiSelectionKeyCode:w,panActivationKeyCode:N,zoomActivationKeyCode:T,elementsSelectable:C,zoomOnScroll:B,zoomOnPinch:D,panOnScroll:E,panOnScrollSpeed:_,panOnScrollMode:P,zoomOnDoubleClick:S,panOnDrag:X,defaultViewport:F,translateExtent:$,minZoom:H,maxZoom:te,preventScrolling:oe,onSelectionContextMenu:I,noWheelClassName:J,noPanClassName:R,disableKeyboardA11y:Z,onViewportChange:G,isControlledViewport:K}){const{nodesSelectionActive:ne,userSelectionActive:j}=mt(OC,kt),M=xs(h,{target:Ax}),V=xs(N,{target:Ax}),ee=V||X,xe=V||E,be=b&&ee!==!0,Le=M||j||be;return mC({deleteKeyCode:x,multiSelectionKeyCode:w}),u.jsx(gC,{onPaneContextMenu:c,elementsSelectable:C,zoomOnScroll:B,zoomOnPinch:D,panOnScroll:xe,panOnScrollSpeed:_,panOnScrollMode:P,zoomOnDoubleClick:S,panOnDrag:!M&&ee,defaultViewport:F,translateExtent:$,minZoom:H,maxZoom:te,zoomActivationKeyCode:T,preventScrolling:oe,noWheelClassName:J,noPanClassName:R,onViewportChange:G,isControlledViewport:K,paneClickDistance:m,selectionOnDrag:be,children:u.jsxs(vC,{onSelectionStart:v,onSelectionEnd:L,onPaneClick:a,onPaneMouseEnter:i,onPaneMouseMove:l,onPaneMouseLeave:o,onPaneContextMenu:c,onPaneScroll:d,panOnDrag:ee,isSelecting:!!Le,selectionMode:g,selectionKeyPressed:M,paneClickDistance:m,selectionOnDrag:be,children:[t,ne&&u.jsx(kC,{onSelectionContextMenu:I,noPanClassName:R,disableKeyboardA11y:Z})]})})}b_.displayName="FlowRenderer";const jC=z.memo(b_),BC=t=>a=>t?cf(a.nodeLookup,{x:0,y:0,width:a.width,height:a.height},a.transform,!0).map(i=>i.id):Array.from(a.nodeLookup.keys());function PC(t){return mt(z.useCallback(BC(t),[t]),kt)}const zC=t=>t.updateNodeInternals;function UC(){const t=mt(zC),[a]=z.useState(()=>typeof ResizeObserver>"u"?null:new ResizeObserver(i=>{const l=new Map;i.forEach(o=>{const c=o.target.getAttribute("data-id");l.set(c,{id:c,nodeElement:o.target,force:!0})}),t(l)}));return z.useEffect(()=>()=>{a==null||a.disconnect()},[a]),a}function $C({node:t,nodeType:a,hasDimensions:i,resizeObserver:l}){const o=Mt(),c=z.useRef(null),d=z.useRef(null),m=z.useRef(t.sourcePosition),x=z.useRef(t.targetPosition),h=z.useRef(a),b=i&&!!t.internals.handleBounds;return z.useEffect(()=>{c.current&&!t.hidden&&(!b||d.current!==c.current)&&(d.current&&(l==null||l.unobserve(d.current)),l==null||l.observe(c.current),d.current=c.current)},[b,t.hidden]),z.useEffect(()=>()=>{d.current&&(l==null||l.unobserve(d.current),d.current=null)},[]),z.useEffect(()=>{if(c.current){const g=h.current!==a,v=m.current!==t.sourcePosition,L=x.current!==t.targetPosition;(g||v||L)&&(h.current=a,m.current=t.sourcePosition,x.current=t.targetPosition,o.getState().updateNodeInternals(new Map([[t.id,{id:t.id,nodeElement:c.current,force:!0}]])))}},[t.id,a,t.sourcePosition,t.targetPosition]),c}function IC({id:t,onClick:a,onMouseEnter:i,onMouseMove:l,onMouseLeave:o,onContextMenu:c,onDoubleClick:d,nodesDraggable:m,elementsSelectable:x,nodesConnectable:h,nodesFocusable:b,resizeObserver:g,noDragClassName:v,noPanClassName:L,disableKeyboardA11y:w,rfId:N,nodeTypes:T,nodeClickDistance:C,onError:B}){const{node:D,internals:E,isParent:_}=mt(pe=>{const Te=pe.nodeLookup.get(t),Ze=pe.parentLookup.has(t);return{node:Te,internals:Te.internals,isParent:Ze}},kt);let P=D.type||"default",S=(T==null?void 0:T[P])||vx[P];S===void 0&&(B==null||B("003",_a.error003(P)),P="default",S=(T==null?void 0:T.default)||vx.default);const X=!!(D.draggable||m&&typeof D.draggable>"u"),F=!!(D.selectable||x&&typeof D.selectable>"u"),$=!!(D.connectable||h&&typeof D.connectable>"u"),H=!!(D.focusable||b&&typeof D.focusable>"u"),te=Mt(),oe=Ug(D),I=$C({node:D,nodeType:P,hasDimensions:oe,resizeObserver:g}),J=x_({nodeRef:I,disabled:D.hidden||!X,noDragClassName:v,handleSelector:D.dragHandle,nodeId:t,isSelectable:F,nodeClickDistance:C}),R=g_();if(D.hidden)return null;const Z=qa(D),G=EC(D),K=F||X||a||i||l||o,ne=i?pe=>i(pe,{...E.userNode}):void 0,j=l?pe=>l(pe,{...E.userNode}):void 0,M=o?pe=>o(pe,{...E.userNode}):void 0,V=c?pe=>c(pe,{...E.userNode}):void 0,ee=d?pe=>d(pe,{...E.userNode}):void 0,xe=pe=>{const{selectNodesOnDrag:Te,nodeDragThreshold:Ze}=te.getState();F&&(!Te||!X||Ze>0)&&Z0({id:t,store:te,nodeRef:I}),a&&a(pe,{...E.userNode})},be=pe=>{if(!(Hg(pe.nativeEvent)||w)){if(Mg.includes(pe.key)&&F){const Te=pe.key==="Escape";Z0({id:t,store:te,unselect:Te,nodeRef:I})}else if(X&&D.selected&&Object.prototype.hasOwnProperty.call(Cc,pe.key)){pe.preventDefault();const{ariaLabelConfig:Te}=te.getState();te.setState({ariaLiveMessage:Te["node.a11yDescription.ariaLiveMessage"]({direction:pe.key.replace("Arrow","").toLowerCase(),x:~~E.positionAbsolute.x,y:~~E.positionAbsolute.y})}),R({direction:Cc[pe.key],factor:pe.shiftKey?4:1})}}},Le=()=>{var He;if(w||!((He=I.current)!=null&&He.matches(":focus-visible")))return;const{transform:pe,width:Te,height:Ze,autoPanOnNodeFocus:Me,setCenter:Be}=te.getState();if(!Me)return;cf(new Map([[t,D]]),{x:0,y:0,width:Te,height:Ze},pe,!0).length>0||Be(D.position.x+Z.width/2,D.position.y+Z.height/2,{zoom:pe[2]})};return u.jsx("div",{className:Wt(["react-flow__node",`react-flow__node-${P}`,{[L]:X},D.className,{selected:D.selected,selectable:F,parent:_,draggable:X,dragging:J}]),ref:I,style:{zIndex:E.z,transform:`translate(${E.positionAbsolute.x}px,${E.positionAbsolute.y}px)`,pointerEvents:K?"all":"none",visibility:oe?"visible":"hidden",...D.style,...G},"data-id":t,"data-testid":`rf__node-${t}`,onMouseEnter:ne,onMouseMove:j,onMouseLeave:M,onContextMenu:V,onClick:xe,onDoubleClick:ee,onKeyDown:H?be:void 0,tabIndex:H?0:void 0,onFocus:H?Le:void 0,role:D.ariaRole??(H?"group":void 0),"aria-roledescription":"node","aria-describedby":w?void 0:`${o_}-${N}`,"aria-label":D.ariaLabel,...D.domAttributes,children:u.jsx(LC,{value:t,children:u.jsx(S,{id:t,data:D.data,type:P,positionAbsoluteX:E.positionAbsolute.x,positionAbsoluteY:E.positionAbsolute.y,selected:D.selected??!1,selectable:F,draggable:X,deletable:D.deletable??!0,isConnectable:$,sourcePosition:D.sourcePosition,targetPosition:D.targetPosition,dragging:J,dragHandle:D.dragHandle,zIndex:E.z,parentId:D.parentId,...Z})})})}var HC=z.memo(IC);const JC=t=>({nodesDraggable:t.nodesDraggable,nodesConnectable:t.nodesConnectable,nodesFocusable:t.nodesFocusable,elementsSelectable:t.elementsSelectable,onError:t.onError});function y_(t){const{nodesDraggable:a,nodesConnectable:i,nodesFocusable:l,elementsSelectable:o,onError:c}=mt(JC,kt),d=PC(t.onlyRenderVisibleElements),m=UC();return u.jsx("div",{className:"react-flow__nodes",style:qc,children:d.map(x=>u.jsx(HC,{id:x,nodeTypes:t.nodeTypes,nodeExtent:t.nodeExtent,onClick:t.onNodeClick,onMouseEnter:t.onNodeMouseEnter,onMouseMove:t.onNodeMouseMove,onMouseLeave:t.onNodeMouseLeave,onContextMenu:t.onNodeContextMenu,onDoubleClick:t.onNodeDoubleClick,noDragClassName:t.noDragClassName,noPanClassName:t.noPanClassName,rfId:t.rfId,disableKeyboardA11y:t.disableKeyboardA11y,resizeObserver:m,nodesDraggable:a,nodesConnectable:i,nodesFocusable:l,elementsSelectable:o,nodeClickDistance:t.nodeClickDistance,onError:c},x))})}y_.displayName="NodeRenderer";const qC=z.memo(y_);function VC(t){return mt(z.useCallback(i=>{if(!t)return i.edges.map(o=>o.id);const l=[];if(i.width&&i.height)for(const o of i.edges){const c=i.nodeLookup.get(o.source),d=i.nodeLookup.get(o.target);c&&d&&qw({sourceNode:c,targetNode:d,width:i.width,height:i.height,transform:i.transform})&&l.push(o.id)}return l},[t]),kt)}const ZC=({color:t="none",strokeWidth:a=1})=>{const i={strokeWidth:a,...t&&{stroke:t}};return u.jsx("polyline",{className:"arrow",style:i,strokeLinecap:"round",fill:"none",strokeLinejoin:"round",points:"-5,-4 0,0 -5,4"})},GC=({color:t="none",strokeWidth:a=1})=>{const i={strokeWidth:a,...t&&{stroke:t,fill:t}};return u.jsx("polyline",{className:"arrowclosed",style:i,strokeLinecap:"round",strokeLinejoin:"round",points:"-5,-4 0,0 -5,4 -5,-4"})},Lx={[ps.Arrow]:ZC,[ps.ArrowClosed]:GC};function YC(t){const a=Mt();return z.useMemo(()=>{var o,c;return Object.prototype.hasOwnProperty.call(Lx,t)?Lx[t]:((c=(o=a.getState()).onError)==null||c.call(o,"009",_a.error009(t)),null)},[t])}const XC=({id:t,type:a,color:i,width:l=12.5,height:o=12.5,markerUnits:c="strokeWidth",strokeWidth:d,orient:m="auto-start-reverse"})=>{const x=YC(a);return x?u.jsx("marker",{className:"react-flow__arrowhead",id:t,markerWidth:`${l}`,markerHeight:`${o}`,viewBox:"-10 -10 20 20",markerUnits:c,orient:m,refX:"0",refY:"0",children:u.jsx(x,{color:i,strokeWidth:d})}):null},v_=({defaultColor:t,rfId:a})=>{const i=mt(c=>c.edges),l=mt(c=>c.defaultEdgeOptions),o=z.useMemo(()=>Kw(i,{id:a,defaultColor:t,defaultMarkerStart:l==null?void 0:l.markerStart,defaultMarkerEnd:l==null?void 0:l.markerEnd}),[i,l,a,t]);return o.length?u.jsx("svg",{className:"react-flow__marker","aria-hidden":"true",children:u.jsx("defs",{children:o.map(c=>u.jsx(XC,{id:c.id,type:c.type,color:c.color,width:c.width,height:c.height,markerUnits:c.markerUnits,strokeWidth:c.strokeWidth,orient:c.orient},c.id))})}):null};v_.displayName="MarkerDefinitions";var FC=z.memo(v_);function A_({x:t,y:a,label:i,labelStyle:l,labelShowBg:o=!0,labelBgStyle:c,labelBgPadding:d=[2,4],labelBgBorderRadius:m=2,children:x,className:h,...b}){const[g,v]=z.useState({x:1,y:0,width:0,height:0}),L=Wt(["react-flow__edge-textwrapper",h]),w=z.useRef(null);return z.useEffect(()=>{if(w.current){const N=w.current.getBBox();v({x:N.x,y:N.y,width:N.width,height:N.height})}},[i]),i?u.jsxs("g",{transform:`translate(${t-g.width/2} ${a-g.height/2})`,className:L,visibility:g.width?"visible":"hidden",...b,children:[o&&u.jsx("rect",{width:g.width+2*d[0],x:-d[0],y:-d[1],height:g.height+2*d[1],className:"react-flow__edge-textbg",style:c,rx:m,ry:m}),u.jsx("text",{className:"react-flow__edge-text",y:g.height/2,dy:"0.3em",ref:w,style:l,children:i}),x]}):null}A_.displayName="EdgeText";const KC=z.memo(A_);function Vc({path:t,labelX:a,labelY:i,label:l,labelStyle:o,labelShowBg:c,labelBgStyle:d,labelBgPadding:m,labelBgBorderRadius:x,interactionWidth:h=20,...b}){return u.jsxs(u.Fragment,{children:[u.jsx("path",{...b,d:t,fill:"none",className:Wt(["react-flow__edge-path",b.className])}),h?u.jsx("path",{d:t,fill:"none",strokeOpacity:0,strokeWidth:h,className:"react-flow__edge-interaction"}):null,l&&ta(a)&&ta(i)?u.jsx(KC,{x:a,y:i,label:l,labelStyle:o,labelShowBg:c,labelBgStyle:d,labelBgPadding:m,labelBgBorderRadius:x}):null]})}function wx({pos:t,x1:a,y1:i,x2:l,y2:o}){return t===ye.Left||t===ye.Right?[.5*(a+l),i]:[a,.5*(i+o)]}function L_({sourceX:t,sourceY:a,sourcePosition:i=ye.Bottom,targetX:l,targetY:o,targetPosition:c=ye.Top}){const[d,m]=wx({pos:i,x1:t,y1:a,x2:l,y2:o}),[x,h]=wx({pos:c,x1:l,y1:o,x2:t,y2:a}),[b,g,v,L]=qg({sourceX:t,sourceY:a,targetX:l,targetY:o,sourceControlX:d,sourceControlY:m,targetControlX:x,targetControlY:h});return[`M${t},${a} C${d},${m} ${x},${h} ${l},${o}`,b,g,v,L]}function w_(t){return z.memo(({id:a,sourceX:i,sourceY:l,targetX:o,targetY:c,sourcePosition:d,targetPosition:m,label:x,labelStyle:h,labelShowBg:b,labelBgStyle:g,labelBgPadding:v,labelBgBorderRadius:L,style:w,markerEnd:N,markerStart:T,interactionWidth:C})=>{const[B,D,E]=L_({sourceX:i,sourceY:l,sourcePosition:d,targetX:o,targetY:c,targetPosition:m}),_=t.isInternal?void 0:a;return u.jsx(Vc,{id:_,path:B,labelX:D,labelY:E,label:x,labelStyle:h,labelShowBg:b,labelBgStyle:g,labelBgPadding:v,labelBgBorderRadius:L,style:w,markerEnd:N,markerStart:T,interactionWidth:C})})}const WC=w_({isInternal:!1}),D_=w_({isInternal:!0});WC.displayName="SimpleBezierEdge";D_.displayName="SimpleBezierEdgeInternal";function C_(t){return z.memo(({id:a,sourceX:i,sourceY:l,targetX:o,targetY:c,label:d,labelStyle:m,labelShowBg:x,labelBgStyle:h,labelBgPadding:b,labelBgBorderRadius:g,style:v,sourcePosition:L=ye.Bottom,targetPosition:w=ye.Top,markerEnd:N,markerStart:T,pathOptions:C,interactionWidth:B})=>{const[D,E,_]=H0({sourceX:i,sourceY:l,sourcePosition:L,targetX:o,targetY:c,targetPosition:w,borderRadius:C==null?void 0:C.borderRadius,offset:C==null?void 0:C.offset,stepPosition:C==null?void 0:C.stepPosition}),P=t.isInternal?void 0:a;return u.jsx(Vc,{id:P,path:D,labelX:E,labelY:_,label:d,labelStyle:m,labelShowBg:x,labelBgStyle:h,labelBgPadding:b,labelBgBorderRadius:g,style:v,markerEnd:N,markerStart:T,interactionWidth:B})})}const S_=C_({isInternal:!1}),N_=C_({isInternal:!0});S_.displayName="SmoothStepEdge";N_.displayName="SmoothStepEdgeInternal";function T_(t){return z.memo(({id:a,...i})=>{var o;const l=t.isInternal?void 0:a;return u.jsx(S_,{...i,id:l,pathOptions:z.useMemo(()=>{var c;return{borderRadius:0,offset:(c=i.pathOptions)==null?void 0:c.offset}},[(o=i.pathOptions)==null?void 0:o.offset])})})}const QC=T_({isInternal:!1}),M_=T_({isInternal:!0});QC.displayName="StepEdge";M_.displayName="StepEdgeInternal";function E_(t){return z.memo(({id:a,sourceX:i,sourceY:l,targetX:o,targetY:c,label:d,labelStyle:m,labelShowBg:x,labelBgStyle:h,labelBgPadding:b,labelBgBorderRadius:g,style:v,markerEnd:L,markerStart:w,interactionWidth:N})=>{const[T,C,B]=Yg({sourceX:i,sourceY:l,targetX:o,targetY:c}),D=t.isInternal?void 0:a;return u.jsx(Vc,{id:D,path:T,labelX:C,labelY:B,label:d,labelStyle:m,labelShowBg:x,labelBgStyle:h,labelBgPadding:b,labelBgBorderRadius:g,style:v,markerEnd:L,markerStart:w,interactionWidth:N})})}const eS=E_({isInternal:!1}),R_=E_({isInternal:!0});eS.displayName="StraightEdge";R_.displayName="StraightEdgeInternal";function k_(t){return z.memo(({id:a,sourceX:i,sourceY:l,targetX:o,targetY:c,sourcePosition:d=ye.Bottom,targetPosition:m=ye.Top,label:x,labelStyle:h,labelShowBg:b,labelBgStyle:g,labelBgPadding:v,labelBgBorderRadius:L,style:w,markerEnd:N,markerStart:T,pathOptions:C,interactionWidth:B})=>{const[D,E,_]=Vg({sourceX:i,sourceY:l,sourcePosition:d,targetX:o,targetY:c,targetPosition:m,curvature:C==null?void 0:C.curvature}),P=t.isInternal?void 0:a;return u.jsx(Vc,{id:P,path:D,labelX:E,labelY:_,label:x,labelStyle:h,labelShowBg:b,labelBgStyle:g,labelBgPadding:v,labelBgBorderRadius:L,style:w,markerEnd:N,markerStart:T,interactionWidth:B})})}const tS=k_({isInternal:!1}),O_=k_({isInternal:!0});tS.displayName="BezierEdge";O_.displayName="BezierEdgeInternal";const Dx={default:O_,straight:R_,step:M_,smoothstep:N_,simplebezier:D_},Cx={sourceX:null,sourceY:null,targetX:null,targetY:null,sourcePosition:null,targetPosition:null},nS=(t,a,i)=>i===ye.Left?t-a:i===ye.Right?t+a:t,aS=(t,a,i)=>i===ye.Top?t-a:i===ye.Bottom?t+a:t,Sx="react-flow__edgeupdater";function Nx({position:t,centerX:a,centerY:i,radius:l=10,onMouseDown:o,onMouseEnter:c,onMouseOut:d,type:m}){return u.jsx("circle",{onMouseDown:o,onMouseEnter:c,onMouseOut:d,className:Wt([Sx,`${Sx}-${m}`]),cx:nS(a,l,t),cy:aS(i,l,t),r:l,stroke:"transparent",fill:"transparent"})}function iS({isReconnectable:t,reconnectRadius:a,edge:i,sourceX:l,sourceY:o,targetX:c,targetY:d,sourcePosition:m,targetPosition:x,onReconnect:h,onReconnectStart:b,onReconnectEnd:g,setReconnecting:v,setUpdateHover:L}){const w=Mt(),N=(E,_)=>{if(E.button!==0)return;const{autoPanOnConnect:P,domNode:S,connectionMode:X,connectionRadius:F,lib:$,onConnectStart:H,cancelConnection:te,nodeLookup:oe,rfId:I,panBy:J,updateConnection:R}=w.getState(),Z=_.type==="target",G=(j,M)=>{v(!1),g==null||g(j,i,_.type,M)},K=j=>h==null?void 0:h(i,j),ne=(j,M)=>{v(!0),b==null||b(E,i,_.type),H==null||H(j,M)};V0.onPointerDown(E.nativeEvent,{autoPanOnConnect:P,connectionMode:X,connectionRadius:F,domNode:S,handleId:_.id,nodeId:_.nodeId,nodeLookup:oe,isTarget:Z,edgeUpdaterType:_.type,lib:$,flowId:I,cancelConnection:te,panBy:J,isValidConnection:(...j)=>{var M,V;return((V=(M=w.getState()).isValidConnection)==null?void 0:V.call(M,...j))??!0},onConnect:K,onConnectStart:ne,onConnectEnd:(...j)=>{var M,V;return(V=(M=w.getState()).onConnectEnd)==null?void 0:V.call(M,...j)},onReconnectEnd:G,updateConnection:R,getTransform:()=>w.getState().transform,getFromHandle:()=>w.getState().connection.fromHandle,dragThreshold:w.getState().connectionDragThreshold,handleDomNode:E.currentTarget})},T=E=>N(E,{nodeId:i.target,id:i.targetHandle??null,type:"target"}),C=E=>N(E,{nodeId:i.source,id:i.sourceHandle??null,type:"source"}),B=()=>L(!0),D=()=>L(!1);return u.jsxs(u.Fragment,{children:[(t===!0||t==="source")&&u.jsx(Nx,{position:m,centerX:l,centerY:o,radius:a,onMouseDown:T,onMouseEnter:B,onMouseOut:D,type:"source"}),(t===!0||t==="target")&&u.jsx(Nx,{position:x,centerX:c,centerY:d,radius:a,onMouseDown:C,onMouseEnter:B,onMouseOut:D,type:"target"})]})}function rS({id:t,edgesFocusable:a,edgesReconnectable:i,elementsSelectable:l,onClick:o,onDoubleClick:c,onContextMenu:d,onMouseEnter:m,onMouseMove:x,onMouseLeave:h,reconnectRadius:b,onReconnect:g,onReconnectStart:v,onReconnectEnd:L,rfId:w,edgeTypes:N,noPanClassName:T,onError:C,disableKeyboardA11y:B}){let D=mt(Be=>Be.edgeLookup.get(t));const E=mt(Be=>Be.defaultEdgeOptions);D=E?{...E,...D}:D;let _=D.type||"default",P=(N==null?void 0:N[_])||Dx[_];P===void 0&&(C==null||C("011",_a.error011(_)),_="default",P=(N==null?void 0:N.default)||Dx.default);const S=!!(D.focusable||a&&typeof D.focusable>"u"),X=typeof g<"u"&&(D.reconnectable||i&&typeof D.reconnectable>"u"),F=!!(D.selectable||l&&typeof D.selectable>"u"),$=z.useRef(null),[H,te]=z.useState(!1),[oe,I]=z.useState(!1),J=Mt(),{zIndex:R,sourceX:Z,sourceY:G,targetX:K,targetY:ne,sourcePosition:j,targetPosition:M}=mt(z.useCallback(Be=>{const Pe=Be.nodeLookup.get(D.source),He=Be.nodeLookup.get(D.target);if(!Pe||!He)return{zIndex:D.zIndex,...Cx};const at=Fw({id:t,sourceNode:Pe,targetNode:He,sourceHandle:D.sourceHandle||null,targetHandle:D.targetHandle||null,connectionMode:Be.connectionMode,onError:C});return{zIndex:Jw({selected:D.selected,zIndex:D.zIndex,sourceNode:Pe,targetNode:He,elevateOnSelect:Be.elevateEdgesOnSelect,zIndexMode:Be.zIndexMode}),...at||Cx}},[D.source,D.target,D.sourceHandle,D.targetHandle,D.selected,D.zIndex]),kt),V=z.useMemo(()=>D.markerStart?`url('#${J0(D.markerStart,w)}')`:void 0,[D.markerStart,w]),ee=z.useMemo(()=>D.markerEnd?`url('#${J0(D.markerEnd,w)}')`:void 0,[D.markerEnd,w]);if(D.hidden||Z===null||G===null||K===null||ne===null)return null;const xe=Be=>{var Xe;const{addSelectedEdges:Pe,unselectNodesAndEdges:He,multiSelectionActive:at}=J.getState();F&&(J.setState({nodesSelectionActive:!1}),D.selected&&at?(He({nodes:[],edges:[D]}),(Xe=$.current)==null||Xe.blur()):Pe([t])),o&&o(Be,D)},be=c?Be=>{c(Be,{...D})}:void 0,Le=d?Be=>{d(Be,{...D})}:void 0,pe=m?Be=>{m(Be,{...D})}:void 0,Te=x?Be=>{x(Be,{...D})}:void 0,Ze=h?Be=>{h(Be,{...D})}:void 0,Me=Be=>{var Pe;if(!B&&Mg.includes(Be.key)&&F){const{unselectNodesAndEdges:He,addSelectedEdges:at}=J.getState();Be.key==="Escape"?((Pe=$.current)==null||Pe.blur(),He({edges:[D]})):at([t])}};return u.jsx("svg",{style:{zIndex:R},children:u.jsxs("g",{className:Wt(["react-flow__edge",`react-flow__edge-${_}`,D.className,T,{selected:D.selected,animated:D.animated,inactive:!F&&!o,updating:H,selectable:F}]),onClick:xe,onDoubleClick:be,onContextMenu:Le,onMouseEnter:pe,onMouseMove:Te,onMouseLeave:Ze,onKeyDown:S?Me:void 0,tabIndex:S?0:void 0,role:D.ariaRole??(S?"group":"img"),"aria-roledescription":"edge","data-id":t,"data-testid":`rf__edge-${t}`,"aria-label":D.ariaLabel===null?void 0:D.ariaLabel||`Edge from ${D.source} to ${D.target}`,"aria-describedby":S?`${c_}-${w}`:void 0,ref:$,...D.domAttributes,children:[!oe&&u.jsx(P,{id:t,source:D.source,target:D.target,type:D.type,selected:D.selected,animated:D.animated,selectable:F,deletable:D.deletable??!0,label:D.label,labelStyle:D.labelStyle,labelShowBg:D.labelShowBg,labelBgStyle:D.labelBgStyle,labelBgPadding:D.labelBgPadding,labelBgBorderRadius:D.labelBgBorderRadius,sourceX:Z,sourceY:G,targetX:K,targetY:ne,sourcePosition:j,targetPosition:M,data:D.data,style:D.style,sourceHandleId:D.sourceHandle,targetHandleId:D.targetHandle,markerStart:V,markerEnd:ee,pathOptions:"pathOptions"in D?D.pathOptions:void 0,interactionWidth:D.interactionWidth}),X&&u.jsx(iS,{edge:D,isReconnectable:X,reconnectRadius:b,onReconnect:g,onReconnectStart:v,onReconnectEnd:L,sourceX:Z,sourceY:G,targetX:K,targetY:ne,sourcePosition:j,targetPosition:M,setUpdateHover:te,setReconnecting:I})]})})}var lS=z.memo(rS);const sS=t=>({edgesFocusable:t.edgesFocusable,edgesReconnectable:t.edgesReconnectable,elementsSelectable:t.elementsSelectable,connectionMode:t.connectionMode,onError:t.onError});function j_({defaultMarkerColor:t,onlyRenderVisibleElements:a,rfId:i,edgeTypes:l,noPanClassName:o,onReconnect:c,onEdgeContextMenu:d,onEdgeMouseEnter:m,onEdgeMouseMove:x,onEdgeMouseLeave:h,onEdgeClick:b,reconnectRadius:g,onEdgeDoubleClick:v,onReconnectStart:L,onReconnectEnd:w,disableKeyboardA11y:N}){const{edgesFocusable:T,edgesReconnectable:C,elementsSelectable:B,onError:D}=mt(sS,kt),E=VC(a);return u.jsxs("div",{className:"react-flow__edges",children:[u.jsx(FC,{defaultColor:t,rfId:i}),E.map(_=>u.jsx(lS,{id:_,edgesFocusable:T,edgesReconnectable:C,elementsSelectable:B,noPanClassName:o,onReconnect:c,onContextMenu:d,onMouseEnter:m,onMouseMove:x,onMouseLeave:h,onClick:b,reconnectRadius:g,onDoubleClick:v,onReconnectStart:L,onReconnectEnd:w,rfId:i,onError:D,edgeTypes:l,disableKeyboardA11y:N},_))]})}j_.displayName="EdgeRenderer";const oS=z.memo(j_),cS=t=>`translate(${t.transform[0]}px,${t.transform[1]}px) scale(${t.transform[2]})`;function uS({children:t}){const a=mt(cS);return u.jsx("div",{className:"react-flow__viewport xyflow__viewport react-flow__container",style:{transform:a},children:t})}function dS(t){const a=gf(),i=z.useRef(!1);z.useEffect(()=>{!i.current&&a.viewportInitialized&&t&&(setTimeout(()=>t(a),1),i.current=!0)},[t,a.viewportInitialized])}const fS=t=>{var a;return(a=t.panZoom)==null?void 0:a.syncViewport};function pS(t){const a=mt(fS),i=Mt();return z.useEffect(()=>{t&&(a==null||a(t),i.setState({transform:[t.x,t.y,t.zoom]}))},[t,a]),null}function mS(t){return t.connection.inProgress?{...t.connection,to:Ss(t.connection.to,t.transform)}:{...t.connection}}function hS(t){return mS}function xS(t){const a=hS();return mt(a,kt)}const gS=t=>({nodesConnectable:t.nodesConnectable,isValid:t.connection.isValid,inProgress:t.connection.inProgress,width:t.width,height:t.height});function _S({containerStyle:t,style:a,type:i,component:l}){const{nodesConnectable:o,width:c,height:d,isValid:m,inProgress:x}=mt(gS,kt);return!(c&&o&&x)?null:u.jsx("svg",{style:t,width:c,height:d,className:"react-flow__connectionline react-flow__container",children:u.jsx("g",{className:Wt(["react-flow__connection",kg(m)]),children:u.jsx(B_,{style:a,type:i,CustomComponent:l,isValid:m})})})}const B_=({style:t,type:a=Ci.Bezier,CustomComponent:i,isValid:l})=>{const{inProgress:o,from:c,fromNode:d,fromHandle:m,fromPosition:x,to:h,toNode:b,toHandle:g,toPosition:v,pointer:L}=xS();if(!o)return;if(i)return u.jsx(i,{connectionLineType:a,connectionLineStyle:t,fromNode:d,fromHandle:m,fromX:c.x,fromY:c.y,toX:h.x,toY:h.y,fromPosition:x,toPosition:v,connectionStatus:kg(l),toNode:b,toHandle:g,pointer:L});let w="";const N={sourceX:c.x,sourceY:c.y,sourcePosition:x,targetX:h.x,targetY:h.y,targetPosition:v};switch(a){case Ci.Bezier:[w]=Vg(N);break;case Ci.SimpleBezier:[w]=L_(N);break;case Ci.Step:[w]=H0({...N,borderRadius:0});break;case Ci.SmoothStep:[w]=H0(N);break;default:[w]=Yg(N)}return u.jsx("path",{d:w,fill:"none",className:"react-flow__connection-path",style:t})};B_.displayName="ConnectionLine";const bS={};function Tx(t=bS){z.useRef(t),Mt(),z.useEffect(()=>{},[t])}function yS(){Mt(),z.useRef(!1),z.useEffect(()=>{},[])}function P_({nodeTypes:t,edgeTypes:a,onInit:i,onNodeClick:l,onEdgeClick:o,onNodeDoubleClick:c,onEdgeDoubleClick:d,onNodeMouseEnter:m,onNodeMouseMove:x,onNodeMouseLeave:h,onNodeContextMenu:b,onSelectionContextMenu:g,onSelectionStart:v,onSelectionEnd:L,connectionLineType:w,connectionLineStyle:N,connectionLineComponent:T,connectionLineContainerStyle:C,selectionKeyCode:B,selectionOnDrag:D,selectionMode:E,multiSelectionKeyCode:_,panActivationKeyCode:P,zoomActivationKeyCode:S,deleteKeyCode:X,onlyRenderVisibleElements:F,elementsSelectable:$,defaultViewport:H,translateExtent:te,minZoom:oe,maxZoom:I,preventScrolling:J,defaultMarkerColor:R,zoomOnScroll:Z,zoomOnPinch:G,panOnScroll:K,panOnScrollSpeed:ne,panOnScrollMode:j,zoomOnDoubleClick:M,panOnDrag:V,onPaneClick:ee,onPaneMouseEnter:xe,onPaneMouseMove:be,onPaneMouseLeave:Le,onPaneScroll:pe,onPaneContextMenu:Te,paneClickDistance:Ze,nodeClickDistance:Me,onEdgeContextMenu:Be,onEdgeMouseEnter:Pe,onEdgeMouseMove:He,onEdgeMouseLeave:at,reconnectRadius:Xe,onReconnect:Ct,onReconnectStart:nn,onReconnectEnd:Pt,noDragClassName:St,noWheelClassName:we,noPanClassName:Ee,disableKeyboardA11y:$e,nodeExtent:me,rfId:tt,viewport:Se,onViewportChange:nt}){return Tx(t),Tx(a),yS(),dS(i),pS(Se),u.jsx(jC,{onPaneClick:ee,onPaneMouseEnter:xe,onPaneMouseMove:be,onPaneMouseLeave:Le,onPaneContextMenu:Te,onPaneScroll:pe,paneClickDistance:Ze,deleteKeyCode:X,selectionKeyCode:B,selectionOnDrag:D,selectionMode:E,onSelectionStart:v,onSelectionEnd:L,multiSelectionKeyCode:_,panActivationKeyCode:P,zoomActivationKeyCode:S,elementsSelectable:$,zoomOnScroll:Z,zoomOnPinch:G,zoomOnDoubleClick:M,panOnScroll:K,panOnScrollSpeed:ne,panOnScrollMode:j,panOnDrag:V,defaultViewport:H,translateExtent:te,minZoom:oe,maxZoom:I,onSelectionContextMenu:g,preventScrolling:J,noDragClassName:St,noWheelClassName:we,noPanClassName:Ee,disableKeyboardA11y:$e,onViewportChange:nt,isControlledViewport:!!Se,children:u.jsxs(uS,{children:[u.jsx(oS,{edgeTypes:a,onEdgeClick:o,onEdgeDoubleClick:d,onReconnect:Ct,onReconnectStart:nn,onReconnectEnd:Pt,onlyRenderVisibleElements:F,onEdgeContextMenu:Be,onEdgeMouseEnter:Pe,onEdgeMouseMove:He,onEdgeMouseLeave:at,reconnectRadius:Xe,defaultMarkerColor:R,noPanClassName:Ee,disableKeyboardA11y:$e,rfId:tt}),u.jsx(_S,{style:N,type:w,component:T,containerStyle:C}),u.jsx("div",{className:"react-flow__edgelabel-renderer"}),u.jsx(qC,{nodeTypes:t,onNodeClick:l,onNodeDoubleClick:c,onNodeMouseEnter:m,onNodeMouseMove:x,onNodeMouseLeave:h,onNodeContextMenu:b,nodeClickDistance:Me,onlyRenderVisibleElements:F,noPanClassName:Ee,noDragClassName:St,disableKeyboardA11y:$e,nodeExtent:me,rfId:tt}),u.jsx("div",{className:"react-flow__viewport-portal"})]})})}P_.displayName="GraphView";const vS=z.memo(P_),Mx=({nodes:t,edges:a,defaultNodes:i,defaultEdges:l,width:o,height:c,fitView:d,fitViewOptions:m,minZoom:x=.5,maxZoom:h=2,nodeOrigin:b,nodeExtent:g,zIndexMode:v="basic"}={})=>{const L=new Map,w=new Map,N=new Map,T=new Map,C=l??a??[],B=i??t??[],D=b??[0,0],E=g??ds;Kg(N,T,C);const _=q0(B,L,w,{nodeOrigin:D,nodeExtent:E,zIndexMode:v});let P=[0,0,1];if(d&&o&&c){const S=Ds(L,{filter:H=>!!((H.width||H.initialWidth)&&(H.height||H.initialHeight))}),{x:X,y:F,zoom:$}=uf(S,o,c,x,h,(m==null?void 0:m.padding)??.1);P=[X,F,$]}return{rfId:"1",width:o??0,height:c??0,transform:P,nodes:B,nodesInitialized:_,nodeLookup:L,parentLookup:w,edges:C,edgeLookup:T,connectionLookup:N,onNodesChange:null,onEdgesChange:null,hasDefaultNodes:i!==void 0,hasDefaultEdges:l!==void 0,panZoom:null,minZoom:x,maxZoom:h,translateExtent:ds,nodeExtent:E,nodesSelectionActive:!1,userSelectionActive:!1,userSelectionRect:null,connectionMode:Fr.Strict,domNode:null,paneDragging:!1,noPanClassName:"nopan",nodeOrigin:D,nodeDragThreshold:1,connectionDragThreshold:1,snapGrid:[15,15],snapToGrid:!1,nodesDraggable:!0,nodesConnectable:!0,nodesFocusable:!0,edgesFocusable:!0,edgesReconnectable:!0,elementsSelectable:!0,elevateNodesOnSelect:!0,elevateEdgesOnSelect:!0,selectNodesOnDrag:!0,multiSelectionActive:!1,fitViewQueued:d??!1,fitViewOptions:m,fitViewResolver:null,connection:{...Rg},connectionClickStartHandle:null,connectOnClick:!0,ariaLiveMessage:"",autoPanOnConnect:!0,autoPanOnNodeDrag:!0,autoPanOnNodeFocus:!0,autoPanSpeed:15,connectionRadius:20,onError:Pw,isValidConnection:void 0,onSelectionChangeHandlers:[],lib:"react",debug:!1,ariaLabelConfig:Eg,zIndexMode:v,onNodesChangeMiddlewareMap:new Map,onEdgesChangeMiddlewareMap:new Map}},AS=({nodes:t,edges:a,defaultNodes:i,defaultEdges:l,width:o,height:c,fitView:d,fitViewOptions:m,minZoom:x,maxZoom:h,nodeOrigin:b,nodeExtent:g,zIndexMode:v})=>$D((L,w)=>{async function N(){const{nodeLookup:T,panZoom:C,fitViewOptions:B,fitViewResolver:D,width:E,height:_,minZoom:P,maxZoom:S}=w();C&&(await jw({nodes:T,width:E,height:_,panZoom:C,minZoom:P,maxZoom:S},B),D==null||D.resolve(!0),L({fitViewResolver:null}))}return{...Mx({nodes:t,edges:a,width:o,height:c,fitView:d,fitViewOptions:m,minZoom:x,maxZoom:h,nodeOrigin:b,nodeExtent:g,defaultNodes:i,defaultEdges:l,zIndexMode:v}),setNodes:T=>{const{nodeLookup:C,parentLookup:B,nodeOrigin:D,elevateNodesOnSelect:E,fitViewQueued:_,zIndexMode:P}=w(),S=q0(T,C,B,{nodeOrigin:D,nodeExtent:g,elevateNodesOnSelect:E,checkEquality:!0,zIndexMode:P});_&&S?(N(),L({nodes:T,nodesInitialized:S,fitViewQueued:!1,fitViewOptions:void 0})):L({nodes:T,nodesInitialized:S})},setEdges:T=>{const{connectionLookup:C,edgeLookup:B}=w();Kg(C,B,T),L({edges:T})},setDefaultNodesAndEdges:(T,C)=>{if(T){const{setNodes:B}=w();B(T),L({hasDefaultNodes:!0})}if(C){const{setEdges:B}=w();B(C),L({hasDefaultEdges:!0})}},updateNodeInternals:T=>{const{triggerNodeChanges:C,nodeLookup:B,parentLookup:D,domNode:E,nodeOrigin:_,nodeExtent:P,debug:S,fitViewQueued:X,zIndexMode:F}=w(),{changes:$,updatedInternals:H}=iD(T,B,D,E,_,P,F);H&&(eD(B,D,{nodeOrigin:_,nodeExtent:P,zIndexMode:F}),X?(N(),L({fitViewQueued:!1,fitViewOptions:void 0})):L({}),($==null?void 0:$.length)>0&&(S&&console.log("React Flow: trigger node changes",$),C==null||C($)))},updateNodePositions:(T,C=!1)=>{const B=[];let D=[];const{nodeLookup:E,triggerNodeChanges:_,connection:P,updateConnection:S,onNodesChangeMiddlewareMap:X}=w();for(const[F,$]of T){const H=E.get(F),te=!!(H!=null&&H.expandParent&&(H!=null&&H.parentId)&&($!=null&&$.position)),oe={id:F,type:"position",position:te?{x:Math.max(0,$.position.x),y:Math.max(0,$.position.y)}:$.position,dragging:C};if(H&&P.inProgress&&P.fromNode.id===H.id){const I=rr(H,P.fromHandle,ye.Left,!0);S({...P,from:I})}te&&H.parentId&&B.push({id:F,parentId:H.parentId,rect:{...$.internals.positionAbsolute,width:$.measured.width??0,height:$.measured.height??0}}),D.push(oe)}if(B.length>0){const{parentLookup:F,nodeOrigin:$}=w(),H=xf(B,E,F,$);D.push(...H)}for(const F of X.values())D=F(D);_(D)},triggerNodeChanges:T=>{const{onNodesChange:C,setNodes:B,nodes:D,hasDefaultNodes:E,debug:_}=w();if(T!=null&&T.length){if(E){const P=f_(T,D);B(P)}_&&console.log("React Flow: trigger node changes",T),C==null||C(T)}},triggerEdgeChanges:T=>{const{onEdgesChange:C,setEdges:B,edges:D,hasDefaultEdges:E,debug:_}=w();if(T!=null&&T.length){if(E){const P=p_(T,D);B(P)}_&&console.log("React Flow: trigger edge changes",T),C==null||C(T)}},addSelectedNodes:T=>{const{multiSelectionActive:C,edgeLookup:B,nodeLookup:D,triggerNodeChanges:E,triggerEdgeChanges:_}=w();if(C){const P=T.map(S=>Fi(S,!0));E(P);return}E(qr(D,new Set([...T]),!0)),_(qr(B))},addSelectedEdges:T=>{const{multiSelectionActive:C,edgeLookup:B,nodeLookup:D,triggerNodeChanges:E,triggerEdgeChanges:_}=w();if(C){const P=T.map(S=>Fi(S,!0));_(P);return}_(qr(B,new Set([...T]))),E(qr(D,new Set,!0))},unselectNodesAndEdges:({nodes:T,edges:C}={})=>{const{edges:B,nodes:D,nodeLookup:E,triggerNodeChanges:_,triggerEdgeChanges:P}=w(),S=T||D,X=C||B,F=[];for(const H of S){if(!H.selected)continue;const te=E.get(H.id);te&&(te.selected=!1),F.push(Fi(H.id,!1))}const $=[];for(const H of X)H.selected&&$.push(Fi(H.id,!1));_(F),P($)},setMinZoom:T=>{const{panZoom:C,maxZoom:B}=w();C==null||C.setScaleExtent([T,B]),L({minZoom:T})},setMaxZoom:T=>{const{panZoom:C,minZoom:B}=w();C==null||C.setScaleExtent([B,T]),L({maxZoom:T})},setTranslateExtent:T=>{var C;(C=w().panZoom)==null||C.setTranslateExtent(T),L({translateExtent:T})},resetSelectedElements:()=>{const{edges:T,nodes:C,triggerNodeChanges:B,triggerEdgeChanges:D,elementsSelectable:E}=w();if(!E)return;const _=C.reduce((S,X)=>X.selected?[...S,Fi(X.id,!1)]:S,[]),P=T.reduce((S,X)=>X.selected?[...S,Fi(X.id,!1)]:S,[]);B(_),D(P)},setNodeExtent:T=>{const{nodes:C,nodeLookup:B,parentLookup:D,nodeOrigin:E,elevateNodesOnSelect:_,nodeExtent:P,zIndexMode:S}=w();T[0][0]===P[0][0]&&T[0][1]===P[0][1]&&T[1][0]===P[1][0]&&T[1][1]===P[1][1]||(q0(C,B,D,{nodeOrigin:E,nodeExtent:T,elevateNodesOnSelect:_,checkEquality:!1,zIndexMode:S}),L({nodeExtent:T}))},panBy:T=>{const{transform:C,width:B,height:D,panZoom:E,translateExtent:_}=w();return rD({delta:T,panZoom:E,transform:C,translateExtent:_,width:B,height:D})},setCenter:async(T,C,B)=>{const{width:D,height:E,maxZoom:_,panZoom:P}=w();if(!P)return Promise.resolve(!1);const S=typeof(B==null?void 0:B.zoom)<"u"?B.zoom:_;return await P.setViewport({x:D/2-T*S,y:E/2-C*S,zoom:S},{duration:B==null?void 0:B.duration,ease:B==null?void 0:B.ease,interpolate:B==null?void 0:B.interpolate}),Promise.resolve(!0)},cancelConnection:()=>{L({connection:{...Rg}})},updateConnection:T=>{L({connection:T})},reset:()=>L({...Mx()})}},Object.is);function LS({initialNodes:t,initialEdges:a,defaultNodes:i,defaultEdges:l,initialWidth:o,initialHeight:c,initialMinZoom:d,initialMaxZoom:m,initialFitViewOptions:x,fitView:h,nodeOrigin:b,nodeExtent:g,zIndexMode:v,children:L}){const[w]=z.useState(()=>AS({nodes:t,edges:a,defaultNodes:i,defaultEdges:l,width:o,height:c,fitView:h,minZoom:d,maxZoom:m,fitViewOptions:x,nodeOrigin:b,nodeExtent:g,zIndexMode:v}));return u.jsx(ID,{value:w,children:u.jsx(uC,{children:L})})}function wS({children:t,nodes:a,edges:i,defaultNodes:l,defaultEdges:o,width:c,height:d,fitView:m,fitViewOptions:x,minZoom:h,maxZoom:b,nodeOrigin:g,nodeExtent:v,zIndexMode:L}){return z.useContext(Hc)?u.jsx(u.Fragment,{children:t}):u.jsx(LS,{initialNodes:a,initialEdges:i,defaultNodes:l,defaultEdges:o,initialWidth:c,initialHeight:d,fitView:m,initialFitViewOptions:x,initialMinZoom:h,initialMaxZoom:b,nodeOrigin:g,nodeExtent:v,zIndexMode:L,children:t})}const DS={width:"100%",height:"100%",overflow:"hidden",position:"relative",zIndex:0};function CS({nodes:t,edges:a,defaultNodes:i,defaultEdges:l,className:o,nodeTypes:c,edgeTypes:d,onNodeClick:m,onEdgeClick:x,onInit:h,onMove:b,onMoveStart:g,onMoveEnd:v,onConnect:L,onConnectStart:w,onConnectEnd:N,onClickConnectStart:T,onClickConnectEnd:C,onNodeMouseEnter:B,onNodeMouseMove:D,onNodeMouseLeave:E,onNodeContextMenu:_,onNodeDoubleClick:P,onNodeDragStart:S,onNodeDrag:X,onNodeDragStop:F,onNodesDelete:$,onEdgesDelete:H,onDelete:te,onSelectionChange:oe,onSelectionDragStart:I,onSelectionDrag:J,onSelectionDragStop:R,onSelectionContextMenu:Z,onSelectionStart:G,onSelectionEnd:K,onBeforeDelete:ne,connectionMode:j,connectionLineType:M=Ci.Bezier,connectionLineStyle:V,connectionLineComponent:ee,connectionLineContainerStyle:xe,deleteKeyCode:be="Backspace",selectionKeyCode:Le="Shift",selectionOnDrag:pe=!1,selectionMode:Te=fs.Full,panActivationKeyCode:Ze="Space",multiSelectionKeyCode:Me=hs()?"Meta":"Control",zoomActivationKeyCode:Be=hs()?"Meta":"Control",snapToGrid:Pe,snapGrid:He,onlyRenderVisibleElements:at=!1,selectNodesOnDrag:Xe,nodesDraggable:Ct,autoPanOnNodeFocus:nn,nodesConnectable:Pt,nodesFocusable:St,nodeOrigin:we=u_,edgesFocusable:Ee,edgesReconnectable:$e,elementsSelectable:me=!0,defaultViewport:tt=eC,minZoom:Se=.5,maxZoom:nt=2,translateExtent:st=ds,preventScrolling:Zt=!0,nodeExtent:Dn,defaultMarkerColor:Zn="#b1b1b7",zoomOnScroll:Ti=!0,zoomOnPinch:Bn=!0,panOnScroll:zt=!1,panOnScrollSpeed:Qt=.5,panOnScrollMode:Ut=Qi.Free,zoomOnDoubleClick:Mi=!0,panOnDrag:Va=!0,onPaneClick:Za,onPaneMouseEnter:Cn,onPaneMouseMove:hn,onPaneMouseLeave:Gn,onPaneScroll:y,onPaneContextMenu:O,paneClickDistance:q=1,nodeClickDistance:ie=0,children:fe,onReconnect:Ne,onReconnectStart:Je,onReconnectEnd:bt,onEdgeContextMenu:Et,onEdgeDoubleClick:$t,onEdgeMouseEnter:ke,onEdgeMouseMove:Ke,onEdgeMouseLeave:ut,reconnectRadius:It=10,onNodesChange:Q,onEdgesChange:De,noDragClassName:Ce="nodrag",noWheelClassName:Re="nowheel",noPanClassName:dt="nopan",fitView:Ht,fitViewOptions:Ms,connectOnClick:Fc,attributionPosition:Es,proOptions:Ei,defaultEdgeOptions:ll,elevateNodesOnSelect:Ga=!0,elevateEdgesOnSelect:Ya=!1,disableKeyboardA11y:Xa=!1,autoPanOnConnect:Fa,autoPanOnNodeDrag:Gt,autoPanSpeed:Rs,connectionRadius:ks,isValidConnection:va,onError:Ka,style:Kc,id:sl,nodeDragThreshold:Os,connectionDragThreshold:Wc,viewport:or,onViewportChange:cr,width:Yn,height:xn,colorMode:js="light",debug:Qc,onScroll:Wa,ariaLabelConfig:Bs,zIndexMode:Ri="basic",...eu},gn){const ki=sl||"1",Ps=iC(js),ol=z.useCallback(Aa=>{Aa.currentTarget.scrollTo({top:0,left:0,behavior:"instant"}),Wa==null||Wa(Aa)},[Wa]);return u.jsx("div",{"data-testid":"rf__wrapper",...eu,onScroll:ol,style:{...Kc,...DS},ref:gn,className:Wt(["react-flow",o,Ps]),id:sl,role:"application",children:u.jsxs(wS,{nodes:t,edges:a,width:Yn,height:xn,fitView:Ht,fitViewOptions:Ms,minZoom:Se,maxZoom:nt,nodeOrigin:we,nodeExtent:Dn,zIndexMode:Ri,children:[u.jsx(vS,{onInit:h,onNodeClick:m,onEdgeClick:x,onNodeMouseEnter:B,onNodeMouseMove:D,onNodeMouseLeave:E,onNodeContextMenu:_,onNodeDoubleClick:P,nodeTypes:c,edgeTypes:d,connectionLineType:M,connectionLineStyle:V,connectionLineComponent:ee,connectionLineContainerStyle:xe,selectionKeyCode:Le,selectionOnDrag:pe,selectionMode:Te,deleteKeyCode:be,multiSelectionKeyCode:Me,panActivationKeyCode:Ze,zoomActivationKeyCode:Be,onlyRenderVisibleElements:at,defaultViewport:tt,translateExtent:st,minZoom:Se,maxZoom:nt,preventScrolling:Zt,zoomOnScroll:Ti,zoomOnPinch:Bn,zoomOnDoubleClick:Mi,panOnScroll:zt,panOnScrollSpeed:Qt,panOnScrollMode:Ut,panOnDrag:Va,onPaneClick:Za,onPaneMouseEnter:Cn,onPaneMouseMove:hn,onPaneMouseLeave:Gn,onPaneScroll:y,onPaneContextMenu:O,paneClickDistance:q,nodeClickDistance:ie,onSelectionContextMenu:Z,onSelectionStart:G,onSelectionEnd:K,onReconnect:Ne,onReconnectStart:Je,onReconnectEnd:bt,onEdgeContextMenu:Et,onEdgeDoubleClick:$t,onEdgeMouseEnter:ke,onEdgeMouseMove:Ke,onEdgeMouseLeave:ut,reconnectRadius:It,defaultMarkerColor:Zn,noDragClassName:Ce,noWheelClassName:Re,noPanClassName:dt,rfId:ki,disableKeyboardA11y:Xa,nodeExtent:Dn,viewport:or,onViewportChange:cr}),u.jsx(aC,{nodes:t,edges:a,defaultNodes:i,defaultEdges:l,onConnect:L,onConnectStart:w,onConnectEnd:N,onClickConnectStart:T,onClickConnectEnd:C,nodesDraggable:Ct,autoPanOnNodeFocus:nn,nodesConnectable:Pt,nodesFocusable:St,edgesFocusable:Ee,edgesReconnectable:$e,elementsSelectable:me,elevateNodesOnSelect:Ga,elevateEdgesOnSelect:Ya,minZoom:Se,maxZoom:nt,nodeExtent:Dn,onNodesChange:Q,onEdgesChange:De,snapToGrid:Pe,snapGrid:He,connectionMode:j,translateExtent:st,connectOnClick:Fc,defaultEdgeOptions:ll,fitView:Ht,fitViewOptions:Ms,onNodesDelete:$,onEdgesDelete:H,onDelete:te,onNodeDragStart:S,onNodeDrag:X,onNodeDragStop:F,onSelectionDrag:J,onSelectionDragStart:I,onSelectionDragStop:R,onMove:b,onMoveStart:g,onMoveEnd:v,noPanClassName:dt,nodeOrigin:we,rfId:ki,autoPanOnConnect:Fa,autoPanOnNodeDrag:Gt,autoPanSpeed:Rs,onError:Ka,connectionRadius:ks,isValidConnection:va,selectNodesOnDrag:Xe,nodeDragThreshold:Os,connectionDragThreshold:Wc,onBeforeDelete:ne,debug:Qc,ariaLabelConfig:Bs,zIndexMode:Ri}),u.jsx(QD,{onSelectionChange:oe}),fe,u.jsx(YD,{proOptions:Ei,position:Es}),u.jsx(GD,{rfId:ki,disableKeyboardA11y:Xa})]})})}var z_=m_(CS);function SS(){const t=Mt();return z.useCallback(a=>{const{domNode:i,updateNodeInternals:l}=t.getState(),o=Array.isArray(a)?a:[a],c=new Map;o.forEach(d=>{const m=i==null?void 0:i.querySelector(`.react-flow__node[data-id="${d}"]`);m&&c.set(d,{id:d,nodeElement:m,force:!0})}),requestAnimationFrame(()=>l(c,{triggerFitView:!1}))},[])}function U_(t){const[a,i]=z.useState(t),l=z.useCallback(o=>i(c=>f_(o,c)),[]);return[a,i,l]}function $_(t){const[a,i]=z.useState(t),l=z.useCallback(o=>i(c=>p_(o,c)),[]);return[a,i,l]}function NS({dimensions:t,lineWidth:a,variant:i,className:l}){return u.jsx("path",{strokeWidth:a,d:`M${t[0]/2} 0 V${t[1]} M0 ${t[1]/2} H${t[0]}`,className:Wt(["react-flow__background-pattern",i,l])})}function TS({radius:t,className:a}){return u.jsx("circle",{cx:t,cy:t,r:t,className:Wt(["react-flow__background-pattern","dots",a])})}var Si;(function(t){t.Lines="lines",t.Dots="dots",t.Cross="cross"})(Si||(Si={}));const MS={[Si.Dots]:1,[Si.Lines]:1,[Si.Cross]:6},ES=t=>({transform:t.transform,patternId:`pattern-${t.rfId}`});function I_({id:t,variant:a=Si.Dots,gap:i=20,size:l,lineWidth:o=1,offset:c=0,color:d,bgColor:m,style:x,className:h,patternClassName:b}){const g=z.useRef(null),{transform:v,patternId:L}=mt(ES,kt),w=l||MS[a],N=a===Si.Dots,T=a===Si.Cross,C=Array.isArray(i)?i:[i,i],B=[C[0]*v[2]||1,C[1]*v[2]||1],D=w*v[2],E=Array.isArray(c)?c:[c,c],_=T?[D,D]:B,P=[E[0]*v[2]||1+_[0]/2,E[1]*v[2]||1+_[1]/2],S=`${L}${t||""}`;return u.jsxs("svg",{className:Wt(["react-flow__background",h]),style:{...x,...qc,"--xy-background-color-props":m,"--xy-background-pattern-color-props":d},ref:g,"data-testid":"rf__background",children:[u.jsx("pattern",{id:S,x:v[0]%B[0],y:v[1]%B[1],width:B[0],height:B[1],patternUnits:"userSpaceOnUse",patternTransform:`translate(-${P[0]},-${P[1]})`,children:N?u.jsx(TS,{radius:D/2,className:b}):u.jsx(NS,{dimensions:_,lineWidth:o,variant:a,className:b})}),u.jsx("rect",{x:"0",y:"0",width:"100%",height:"100%",fill:`url(#${S})`})]})}I_.displayName="Background";const H_=z.memo(I_);function RS(){return u.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 32 32",children:u.jsx("path",{d:"M32 18.133H18.133V32h-4.266V18.133H0v-4.266h13.867V0h4.266v13.867H32z"})})}function kS(){return u.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 32 5",children:u.jsx("path",{d:"M0 0h32v4.2H0z"})})}function OS(){return u.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 32 30",children:u.jsx("path",{d:"M3.692 4.63c0-.53.4-.938.939-.938h5.215V0H4.708C2.13 0 0 2.054 0 4.63v5.216h3.692V4.631zM27.354 0h-5.2v3.692h5.17c.53 0 .984.4.984.939v5.215H32V4.631A4.624 4.624 0 0027.354 0zm.954 24.83c0 .532-.4.94-.939.94h-5.215v3.768h5.215c2.577 0 4.631-2.13 4.631-4.707v-5.139h-3.692v5.139zm-23.677.94c-.531 0-.939-.4-.939-.94v-5.138H0v5.139c0 2.577 2.13 4.707 4.708 4.707h5.138V25.77H4.631z"})})}function jS(){return u.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 25 32",children:u.jsx("path",{d:"M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0 8 0 4.571 3.429 4.571 7.619v3.048H3.048A3.056 3.056 0 000 13.714v15.238A3.056 3.056 0 003.048 32h18.285a3.056 3.056 0 003.048-3.048V13.714a3.056 3.056 0 00-3.048-3.047zM12.19 24.533a3.056 3.056 0 01-3.047-3.047 3.056 3.056 0 013.047-3.048 3.056 3.056 0 013.048 3.048 3.056 3.056 0 01-3.048 3.047zm4.724-13.866H7.467V7.619c0-2.59 2.133-4.724 4.723-4.724 2.591 0 4.724 2.133 4.724 4.724v3.048z"})})}function BS(){return u.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 25 32",children:u.jsx("path",{d:"M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0c-4.114 1.828-1.37 2.133.305 2.438 1.676.305 4.42 2.59 4.42 5.181v3.048H3.047A3.056 3.056 0 000 13.714v15.238A3.056 3.056 0 003.048 32h18.285a3.056 3.056 0 003.048-3.048V13.714a3.056 3.056 0 00-3.048-3.047zM12.19 24.533a3.056 3.056 0 01-3.047-3.047 3.056 3.056 0 013.047-3.048 3.056 3.056 0 013.048 3.048 3.056 3.056 0 01-3.048 3.047z"})})}function nc({children:t,className:a,...i}){return u.jsx("button",{type:"button",className:Wt(["react-flow__controls-button",a]),...i,children:t})}const PS=t=>({isInteractive:t.nodesDraggable||t.nodesConnectable||t.elementsSelectable,minZoomReached:t.transform[2]<=t.minZoom,maxZoomReached:t.transform[2]>=t.maxZoom,ariaLabelConfig:t.ariaLabelConfig});function J_({style:t,showZoom:a=!0,showFitView:i=!0,showInteractive:l=!0,fitViewOptions:o,onZoomIn:c,onZoomOut:d,onFitView:m,onInteractiveChange:x,className:h,children:b,position:g="bottom-left",orientation:v="vertical","aria-label":L}){const w=Mt(),{isInteractive:N,minZoomReached:T,maxZoomReached:C,ariaLabelConfig:B}=mt(PS,kt),{zoomIn:D,zoomOut:E,fitView:_}=gf(),P=()=>{D(),c==null||c()},S=()=>{E(),d==null||d()},X=()=>{_(o),m==null||m()},F=()=>{w.setState({nodesDraggable:!N,nodesConnectable:!N,elementsSelectable:!N}),x==null||x(!N)},$=v==="horizontal"?"horizontal":"vertical";return u.jsxs(Jc,{className:Wt(["react-flow__controls",$,h]),position:g,style:t,"data-testid":"rf__controls","aria-label":L??B["controls.ariaLabel"],children:[a&&u.jsxs(u.Fragment,{children:[u.jsx(nc,{onClick:P,className:"react-flow__controls-zoomin",title:B["controls.zoomIn.ariaLabel"],"aria-label":B["controls.zoomIn.ariaLabel"],disabled:C,children:u.jsx(RS,{})}),u.jsx(nc,{onClick:S,className:"react-flow__controls-zoomout",title:B["controls.zoomOut.ariaLabel"],"aria-label":B["controls.zoomOut.ariaLabel"],disabled:T,children:u.jsx(kS,{})})]}),i&&u.jsx(nc,{className:"react-flow__controls-fitview",onClick:X,title:B["controls.fitView.ariaLabel"],"aria-label":B["controls.fitView.ariaLabel"],children:u.jsx(OS,{})}),l&&u.jsx(nc,{className:"react-flow__controls-interactive",onClick:F,title:B["controls.interactive.ariaLabel"],"aria-label":B["controls.interactive.ariaLabel"],children:N?u.jsx(BS,{}):u.jsx(jS,{})}),b]})}J_.displayName="Controls";const q_=z.memo(J_);function zS({id:t,x:a,y:i,width:l,height:o,style:c,color:d,strokeColor:m,strokeWidth:x,className:h,borderRadius:b,shapeRendering:g,selected:v,onClick:L}){const{background:w,backgroundColor:N}=c||{},T=d||w||N;return u.jsx("rect",{className:Wt(["react-flow__minimap-node",{selected:v},h]),x:a,y:i,rx:b,ry:b,width:l,height:o,style:{fill:T,stroke:m,strokeWidth:x},shapeRendering:g,onClick:L?C=>L(C,t):void 0})}const US=z.memo(zS),$S=t=>t.nodes.map(a=>a.id),L0=t=>t instanceof Function?t:()=>t;function IS({nodeStrokeColor:t,nodeColor:a,nodeClassName:i="",nodeBorderRadius:l=5,nodeStrokeWidth:o,nodeComponent:c=US,onClick:d}){const m=mt($S,kt),x=L0(a),h=L0(t),b=L0(i),g=typeof window>"u"||window.chrome?"crispEdges":"geometricPrecision";return u.jsx(u.Fragment,{children:m.map(v=>u.jsx(JS,{id:v,nodeColorFunc:x,nodeStrokeColorFunc:h,nodeClassNameFunc:b,nodeBorderRadius:l,nodeStrokeWidth:o,NodeComponent:c,onClick:d,shapeRendering:g},v))})}function HS({id:t,nodeColorFunc:a,nodeStrokeColorFunc:i,nodeClassNameFunc:l,nodeBorderRadius:o,nodeStrokeWidth:c,shapeRendering:d,NodeComponent:m,onClick:x}){const{node:h,x:b,y:g,width:v,height:L}=mt(w=>{const N=w.nodeLookup.get(t);if(!N)return{node:void 0,x:0,y:0,width:0,height:0};const T=N.internals.userNode,{x:C,y:B}=N.internals.positionAbsolute,{width:D,height:E}=qa(T);return{node:T,x:C,y:B,width:D,height:E}},kt);return!h||h.hidden||!Ug(h)?null:u.jsx(m,{x:b,y:g,width:v,height:L,style:h.style,selected:!!h.selected,className:l(h),color:a(h),borderRadius:o,strokeColor:i(h),strokeWidth:c,shapeRendering:d,onClick:x,id:h.id})}const JS=z.memo(HS);var qS=z.memo(IS);const VS=200,ZS=150,GS=t=>!t.hidden,YS=t=>{const a={x:-t.transform[0]/t.transform[2],y:-t.transform[1]/t.transform[2],width:t.width/t.transform[2],height:t.height/t.transform[2]};return{viewBB:a,boundingRect:t.nodeLookup.size>0?zg(Ds(t.nodeLookup,{filter:GS}),a):a,rfId:t.rfId,panZoom:t.panZoom,translateExtent:t.translateExtent,flowWidth:t.width,flowHeight:t.height,ariaLabelConfig:t.ariaLabelConfig}},XS="react-flow__minimap-desc";function V_({style:t,className:a,nodeStrokeColor:i,nodeColor:l,nodeClassName:o="",nodeBorderRadius:c=5,nodeStrokeWidth:d,nodeComponent:m,bgColor:x,maskColor:h,maskStrokeColor:b,maskStrokeWidth:g,position:v="bottom-right",onClick:L,onNodeClick:w,pannable:N=!1,zoomable:T=!1,ariaLabel:C,inversePan:B,zoomStep:D=1,offsetScale:E=5}){const _=Mt(),P=z.useRef(null),{boundingRect:S,viewBB:X,rfId:F,panZoom:$,translateExtent:H,flowWidth:te,flowHeight:oe,ariaLabelConfig:I}=mt(YS,kt),J=(t==null?void 0:t.width)??VS,R=(t==null?void 0:t.height)??ZS,Z=S.width/J,G=S.height/R,K=Math.max(Z,G),ne=K*J,j=K*R,M=E*K,V=S.x-(ne-S.width)/2-M,ee=S.y-(j-S.height)/2-M,xe=ne+M*2,be=j+M*2,Le=`${XS}-${F}`,pe=z.useRef(0),Te=z.useRef();pe.current=K,z.useEffect(()=>{if(P.current&&$)return Te.current=mD({domNode:P.current,panZoom:$,getTransform:()=>_.getState().transform,getViewScale:()=>pe.current}),()=>{var Pe;(Pe=Te.current)==null||Pe.destroy()}},[$]),z.useEffect(()=>{var Pe;(Pe=Te.current)==null||Pe.update({translateExtent:H,width:te,height:oe,inversePan:B,pannable:N,zoomStep:D,zoomable:T})},[N,T,B,D,H,te,oe]);const Ze=L?Pe=>{var Xe;const[He,at]=((Xe=Te.current)==null?void 0:Xe.pointer(Pe))||[0,0];L(Pe,{x:He,y:at})}:void 0,Me=w?z.useCallback((Pe,He)=>{const at=_.getState().nodeLookup.get(He).internals.userNode;w(Pe,at)},[]):void 0,Be=C??I["minimap.ariaLabel"];return u.jsx(Jc,{position:v,style:{...t,"--xy-minimap-background-color-props":typeof x=="string"?x:void 0,"--xy-minimap-mask-background-color-props":typeof h=="string"?h:void 0,"--xy-minimap-mask-stroke-color-props":typeof b=="string"?b:void 0,"--xy-minimap-mask-stroke-width-props":typeof g=="number"?g*K:void 0,"--xy-minimap-node-background-color-props":typeof l=="string"?l:void 0,"--xy-minimap-node-stroke-color-props":typeof i=="string"?i:void 0,"--xy-minimap-node-stroke-width-props":typeof d=="number"?d:void 0},className:Wt(["react-flow__minimap",a]),"data-testid":"rf__minimap",children:u.jsxs("svg",{width:J,height:R,viewBox:`${V} ${ee} ${xe} ${be}`,className:"react-flow__minimap-svg",role:"img","aria-labelledby":Le,ref:P,onClick:Ze,children:[Be&&u.jsx("title",{id:Le,children:Be}),u.jsx(qS,{onClick:Me,nodeColor:l,nodeStrokeColor:i,nodeBorderRadius:c,nodeClassName:o,nodeStrokeWidth:d,nodeComponent:m}),u.jsx("path",{className:"react-flow__minimap-mask",d:`M${V-M},${ee-M}h${xe+M*2}v${be+M*2}h${-xe-M*2}z
        M${X.x},${X.y}h${X.width}v${X.height}h${-X.width}z`,fillRule:"evenodd",pointerEvents:"none"})]})})}V_.displayName="MiniMap";z.memo(V_);const FS=t=>a=>t?`${Math.max(1/a.transform[2],1)}`:void 0,KS={[el.Line]:"right",[el.Handle]:"bottom-right"};function WS({nodeId:t,position:a,variant:i=el.Handle,className:l,style:o=void 0,children:c,color:d,minWidth:m=10,minHeight:x=10,maxWidth:h=Number.MAX_VALUE,maxHeight:b=Number.MAX_VALUE,keepAspectRatio:g=!1,resizeDirection:v,autoScale:L=!0,shouldResize:w,onResizeStart:N,onResize:T,onResizeEnd:C}){const B=__(),D=typeof t=="string"?t:B,E=Mt(),_=z.useRef(null),P=i===el.Handle,S=mt(z.useCallback(FS(P&&L),[P,L]),kt),X=z.useRef(null),F=a??KS[i];z.useEffect(()=>{if(!(!_.current||!D))return X.current||(X.current=ND({domNode:_.current,nodeId:D,getStoreItems:()=>{const{nodeLookup:H,transform:te,snapGrid:oe,snapToGrid:I,nodeOrigin:J,domNode:R}=E.getState();return{nodeLookup:H,transform:te,snapGrid:oe,snapToGrid:I,nodeOrigin:J,paneDomNode:R}},onChange:(H,te)=>{const{triggerNodeChanges:oe,nodeLookup:I,parentLookup:J,nodeOrigin:R}=E.getState(),Z=[],G={x:H.x,y:H.y},K=I.get(D);if(K&&K.expandParent&&K.parentId){const ne=K.origin??R,j=H.width??K.measured.width??0,M=H.height??K.measured.height??0,V={id:K.id,parentId:K.parentId,rect:{width:j,height:M,...$g({x:H.x??K.position.x,y:H.y??K.position.y},{width:j,height:M},K.parentId,I,ne)}},ee=xf([V],I,J,R);Z.push(...ee),G.x=H.x?Math.max(ne[0]*j,H.x):void 0,G.y=H.y?Math.max(ne[1]*M,H.y):void 0}if(G.x!==void 0&&G.y!==void 0){const ne={id:D,type:"position",position:{...G}};Z.push(ne)}if(H.width!==void 0&&H.height!==void 0){const j={id:D,type:"dimensions",resizing:!0,setAttributes:v?v==="horizontal"?"width":"height":!0,dimensions:{width:H.width,height:H.height}};Z.push(j)}for(const ne of te){const j={...ne,type:"position"};Z.push(j)}oe(Z)},onEnd:({width:H,height:te})=>{const oe={id:D,type:"dimensions",resizing:!1,dimensions:{width:H,height:te}};E.getState().triggerNodeChanges([oe])}})),X.current.update({controlPosition:F,boundaries:{minWidth:m,minHeight:x,maxWidth:h,maxHeight:b},keepAspectRatio:g,resizeDirection:v,onResizeStart:N,onResize:T,onResizeEnd:C,shouldResize:w}),()=>{var H;(H=X.current)==null||H.destroy()}},[F,m,x,h,b,g,N,T,C,w]);const $=F.split("-");return u.jsx("div",{className:Wt(["react-flow__resize-control","nodrag",...$,i,l]),ref:_,style:{...o,scale:S,...d&&{[P?"backgroundColor":"borderColor"]:d}},children:c})}z.memo(WS);const cn=[];for(let t=0;t<256;++t)cn.push((t+256).toString(16).slice(1));function QS(t,a=0){return(cn[t[a+0]]+cn[t[a+1]]+cn[t[a+2]]+cn[t[a+3]]+"-"+cn[t[a+4]]+cn[t[a+5]]+"-"+cn[t[a+6]]+cn[t[a+7]]+"-"+cn[t[a+8]]+cn[t[a+9]]+"-"+cn[t[a+10]]+cn[t[a+11]]+cn[t[a+12]]+cn[t[a+13]]+cn[t[a+14]]+cn[t[a+15]]).toLowerCase()}let w0;const eN=new Uint8Array(16);function tN(){if(!w0){if(typeof crypto>"u"||!crypto.getRandomValues)throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");w0=crypto.getRandomValues.bind(crypto)}return w0(eN)}const nN=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),Ex={randomUUID:nN};function aN(t,a,i){var o;t=t||{};const l=t.random??((o=t.rng)==null?void 0:o.call(t))??tN();if(l.length<16)throw new Error("Random bytes length must be >= 16");return l[6]=l[6]&15|64,l[8]=l[8]&63|128,QS(l)}function er(t,a,i){return Ex.randomUUID&&!t?Ex.randomUUID():aN(t)}/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const iN=t=>t.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),rN=t=>t.replace(/^([A-Z])|[\s-_]+(\w)/g,(a,i,l)=>l?l.toUpperCase():i.toLowerCase()),Rx=t=>{const a=rN(t);return a.charAt(0).toUpperCase()+a.slice(1)},Z_=(...t)=>t.filter((a,i,l)=>!!a&&a.trim()!==""&&l.indexOf(a)===i).join(" ").trim(),lN=t=>{for(const a in t)if(a.startsWith("aria-")||a==="role"||a==="title")return!0};/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var sN={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const oN=z.forwardRef(({color:t="currentColor",size:a=24,strokeWidth:i=2,absoluteStrokeWidth:l,className:o="",children:c,iconNode:d,...m},x)=>z.createElement("svg",{ref:x,...sN,width:a,height:a,stroke:t,strokeWidth:l?Number(i)*24/Number(a):i,className:Z_("lucide",o),...!c&&!lN(m)&&{"aria-hidden":"true"},...m},[...d.map(([h,b])=>z.createElement(h,b)),...Array.isArray(c)?c:[c]]));/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ye=(t,a)=>{const i=z.forwardRef(({className:l,...o},c)=>z.createElement(oN,{ref:c,iconNode:a,className:Z_(`lucide-${iN(Rx(t))}`,`lucide-${t}`,l),...o}));return i.displayName=Rx(t),i};/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const cN=[["path",{d:"M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",key:"169zse"}]],uN=Ye("activity",cN);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const dN=[["path",{d:"m16 3 4 4-4 4",key:"1x1c3m"}],["path",{d:"M20 7H4",key:"zbl0bi"}],["path",{d:"m8 21-4-4 4-4",key:"h9nckh"}],["path",{d:"M4 17h16",key:"g4d7ey"}]],fN=Ye("arrow-right-left",dN);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pN=[["rect",{width:"16",height:"20",x:"4",y:"2",rx:"2",key:"1nb95v"}],["line",{x1:"8",x2:"16",y1:"6",y2:"6",key:"x4nwl0"}],["line",{x1:"16",x2:"16",y1:"14",y2:"18",key:"wjye3r"}],["path",{d:"M16 10h.01",key:"1m94wz"}],["path",{d:"M12 10h.01",key:"1nrarc"}],["path",{d:"M8 10h.01",key:"19clt8"}],["path",{d:"M12 14h.01",key:"1etili"}],["path",{d:"M8 14h.01",key:"6423bh"}],["path",{d:"M12 18h.01",key:"mhygvu"}],["path",{d:"M8 18h.01",key:"lrp35t"}]],G_=Ye("calculator",pN);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mN=[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]],hN=Ye("chevron-down",mN);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xN=[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]],gN=Ye("chevron-left",xN);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _N=[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]],bN=Ye("chevron-right",_N);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yN=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"10",x2:"10",y1:"15",y2:"9",key:"c1nkhi"}],["line",{x1:"14",x2:"14",y1:"15",y2:"9",key:"h65svq"}]],vN=Ye("circle-pause",yN);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const AN=[["path",{d:"M9 9.003a1 1 0 0 1 1.517-.859l4.997 2.997a1 1 0 0 1 0 1.718l-4.997 2.997A1 1 0 0 1 9 14.996z",key:"kmsa83"}],["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}]],LN=Ye("circle-play",AN);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wN=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}]],DN=Ye("circle",wN);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const CN=[["path",{d:"M12 6v6l4 2",key:"mmk7yg"}],["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}]],Y_=Ye("clock",CN);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const SN=[["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M17 20v2",key:"1rnc9c"}],["path",{d:"M17 2v2",key:"11trls"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M2 17h2",key:"7oei6x"}],["path",{d:"M2 7h2",key:"asdhe0"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"M20 17h2",key:"1fpfkl"}],["path",{d:"M20 7h2",key:"1o8tra"}],["path",{d:"M7 20v2",key:"4gnj0m"}],["path",{d:"M7 2v2",key:"1i4yhu"}],["rect",{x:"4",y:"4",width:"16",height:"16",rx:"2",key:"1vbyd7"}],["rect",{x:"8",y:"8",width:"8",height:"8",rx:"1",key:"z9xiuo"}]],tl=Ye("cpu",SN);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const NN=[["ellipse",{cx:"12",cy:"5",rx:"9",ry:"3",key:"msslwz"}],["path",{d:"M3 5V19A9 3 0 0 0 21 19V5",key:"1wlel7"}],["path",{d:"M3 12A9 3 0 0 0 21 12",key:"mv7ke4"}]],Zc=Ye("database",NN);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const TN=[["path",{d:"M12 15V3",key:"m9g1x1"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["path",{d:"m7 10 5 5 5-5",key:"brsn70"}]],MN=Ye("download",TN);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const EN=[["path",{d:"M4 22V4a1 1 0 0 1 .4-.8A6 6 0 0 1 8 2c3 0 5 2 7.333 2q2 0 3.067-.8A1 1 0 0 1 20 4v10a1 1 0 0 1-.4.8A6 6 0 0 1 16 16c-3 0-5-2-8-2a6 6 0 0 0-4 1.528",key:"1jaruq"}]],RN=Ye("flag",EN);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const kN=[["path",{d:"m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2",key:"usdka0"}]],ON=Ye("folder-open",kN);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const jN=[["path",{d:"m12 14 4-4",key:"9kzdfg"}],["path",{d:"M3.34 19a10 10 0 1 1 17.32 0",key:"19p75a"}]],X_=Ye("gauge",jN);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const BN=[["circle",{cx:"12",cy:"18",r:"3",key:"1mpf1b"}],["circle",{cx:"6",cy:"6",r:"3",key:"1lh9wr"}],["circle",{cx:"18",cy:"6",r:"3",key:"1h7g24"}],["path",{d:"M18 9v2c0 .6-.4 1-1 1H7c-.6 0-1-.4-1-1V9",key:"1uq4wg"}],["path",{d:"M12 12v3",key:"158kv8"}]],F_=Ye("git-fork",BN);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const PN=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20",key:"13o1zl"}],["path",{d:"M2 12h20",key:"9i4pu4"}]],bf=Ye("globe",PN);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zN=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M3 9h18",key:"1pudct"}],["path",{d:"M3 15h18",key:"5xshup"}],["path",{d:"M9 3v18",key:"fh3hqa"}],["path",{d:"M15 3v18",key:"14nvp0"}]],yf=Ye("grid-3x3",zN);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const UN=[["line",{x1:"22",x2:"2",y1:"12",y2:"12",key:"1y58io"}],["path",{d:"M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z",key:"oot6mr"}],["line",{x1:"6",x2:"6.01",y1:"16",y2:"16",key:"sgf278"}],["line",{x1:"10",x2:"10.01",y1:"16",y2:"16",key:"1l4acy"}]],Gr=Ye("hard-drive",UN);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $N=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 16v-4",key:"1dtifu"}],["path",{d:"M12 8h.01",key:"e9boi3"}]],IN=Ye("info",$N);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const HN=[["path",{d:"M10 8h.01",key:"1r9ogq"}],["path",{d:"M12 12h.01",key:"1mp3jc"}],["path",{d:"M14 8h.01",key:"1primd"}],["path",{d:"M16 12h.01",key:"1l6xoz"}],["path",{d:"M18 8h.01",key:"emo2bl"}],["path",{d:"M6 8h.01",key:"x9i8wu"}],["path",{d:"M7 16h10",key:"wp8him"}],["path",{d:"M8 12h.01",key:"czm47f"}],["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2",key:"18n3k1"}]],vf=Ye("keyboard",HN);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const JN=[["path",{d:"M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z",key:"zw3jo"}],["path",{d:"M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12",key:"1wduqc"}],["path",{d:"M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17",key:"kqbvx6"}]],K_=Ye("layers",JN);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qN=[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]],VN=Ye("loader-circle",qN);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ZN=[["path",{d:"M15 3h6v6",key:"1q9fwt"}],["path",{d:"m21 3-7 7",key:"1l2asr"}],["path",{d:"m3 21 7-7",key:"tjx5ai"}],["path",{d:"M9 21H3v-6",key:"wtvkvv"}]],Ns=Ye("maximize-2",ZN);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const GN=[["path",{d:"M6 19v-3",key:"1nvgqn"}],["path",{d:"M10 19v-3",key:"iu8nkm"}],["path",{d:"M14 19v-3",key:"kcehxu"}],["path",{d:"M18 19v-3",key:"1vh91z"}],["path",{d:"M8 11V9",key:"63erz4"}],["path",{d:"M16 11V9",key:"fru6f3"}],["path",{d:"M12 11V9",key:"ha00sb"}],["path",{d:"M2 15h20",key:"16ne18"}],["path",{d:"M2 7a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v1.1a2 2 0 0 0 0 3.837V17a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-5.1a2 2 0 0 0 0-3.837Z",key:"lhddv3"}]],Af=Ye("memory-stick",GN);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const YN=[["path",{d:"m14 10 7-7",key:"oa77jy"}],["path",{d:"M20 10h-6V4",key:"mjg0md"}],["path",{d:"m3 21 7-7",key:"tjx5ai"}],["path",{d:"M4 14h6v6",key:"rmj7iw"}]],W_=Ye("minimize-2",YN);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const XN=[["rect",{width:"20",height:"14",x:"2",y:"3",rx:"2",key:"48i651"}],["line",{x1:"8",x2:"16",y1:"21",y2:"21",key:"1svkeh"}],["line",{x1:"12",x2:"12",y1:"17",y2:"21",key:"vw1qmm"}]],FN=Ye("monitor",XN);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const KN=[["path",{d:"m18 8 4 4-4 4",key:"1ak13k"}],["path",{d:"M2 12h20",key:"9i4pu4"}],["path",{d:"m6 8-4 4 4 4",key:"15zrgr"}]],WN=Ye("move-horizontal",KN);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const QN=[["path",{d:"M12 2v20",key:"t6zp3m"}],["path",{d:"m8 18 4 4 4-4",key:"bh5tu3"}],["path",{d:"m8 6 4-4 4 4",key:"ybng9g"}]],eT=Ye("move-vertical",QN);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const tT=[["path",{d:"M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z",key:"1a0edw"}],["path",{d:"M12 22V12",key:"d0xqtd"}],["polyline",{points:"3.29 7 12 12 20.71 7",key:"ousv84"}],["path",{d:"m7.5 4.27 9 5.15",key:"1c824w"}]],nl=Ye("package",tT);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const nT=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M3 9h18",key:"1pudct"}],["path",{d:"M9 21V9",key:"1oto5p"}]],aT=Ye("panels-top-left",nT);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const iT=[["path",{d:"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",key:"1a8usu"}],["path",{d:"m15 5 4 4",key:"1mk7zo"}]],rT=Ye("pencil",iT);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const lT=[["path",{d:"M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",key:"10ikf1"}]],Lf=Ye("play",lT);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const sT=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]],oT=Ye("plus",sT);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const cT=[["path",{d:"M16.247 7.761a6 6 0 0 1 0 8.478",key:"1fwjs5"}],["path",{d:"M19.075 4.933a10 10 0 0 1 0 14.134",key:"ehdyv1"}],["path",{d:"M4.925 19.067a10 10 0 0 1 0-14.134",key:"1q22gi"}],["path",{d:"M7.753 16.239a6 6 0 0 1 0-8.478",key:"r2q7qm"}],["circle",{cx:"12",cy:"12",r:"2",key:"1c9p78"}]],uT=Ye("radio",cT);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const dT=[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}]],Q_=Ye("rotate-ccw",dT);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fT=[["path",{d:"M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",key:"1c8476"}],["path",{d:"M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7",key:"1ydtos"}],["path",{d:"M7 3v4a1 1 0 0 0 1 1h7",key:"t51u73"}]],eb=Ye("save",fT);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pT=[["path",{d:"M21 4v16",key:"7j8fe9"}],["path",{d:"M6.029 4.285A2 2 0 0 0 3 6v12a2 2 0 0 0 3.029 1.715l9.997-5.998a2 2 0 0 0 .003-3.432z",key:"zs4d6"}]],tb=Ye("skip-forward",pT);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mT=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}]],Gc=Ye("square",mT);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const hT=[["path",{d:"M12 19h8",key:"baeox8"}],["path",{d:"m4 17 6-6-6-6",key:"1yngyt"}]],wf=Ye("terminal",hT);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xT=[["path",{d:"M10 11v6",key:"nco0om"}],["path",{d:"M14 11v6",key:"outv1u"}],["path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",key:"miytrc"}],["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",key:"e791ji"}]],gs=Ye("trash-2",xT);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gT=[["path",{d:"m18.84 12.25 1.72-1.71h-.02a5.004 5.004 0 0 0-.12-7.07 5.006 5.006 0 0 0-6.95 0l-1.72 1.71",key:"yqzxt4"}],["path",{d:"m5.17 11.75-1.71 1.71a5.004 5.004 0 0 0 .12 7.07 5.006 5.006 0 0 0 6.95 0l1.71-1.71",key:"4qinb0"}],["line",{x1:"8",x2:"8",y1:"2",y2:"5",key:"1041cp"}],["line",{x1:"2",x2:"5",y1:"8",y2:"8",key:"14m1p5"}],["line",{x1:"16",x2:"16",y1:"19",y2:"22",key:"rzdirn"}],["line",{x1:"19",x2:"22",y1:"16",y2:"16",key:"ox905f"}]],_T=Ye("unlink",gT);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bT=[["path",{d:"M12 3v12",key:"1x0j5s"}],["path",{d:"m17 8-5-5-5 5",key:"7q97r8"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}]],yT=Ye("upload",bT);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vT=[["rect",{width:"8",height:"8",x:"3",y:"3",rx:"2",key:"by2w9f"}],["path",{d:"M7 11v4a2 2 0 0 0 2 2h4",key:"xkn7yn"}],["rect",{width:"8",height:"8",x:"13",y:"13",rx:"2",key:"1cgmvn"}]],AT=Ye("workflow",vT);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const LT=[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]],wT=Ye("x",LT);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const DT=[["path",{d:"M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",key:"1xq2db"}]],CT=Ye("zap",DT),ST=({data:t,id:a})=>u.jsxs("div",{className:"bg-slate-800 border-2 border-slate-600 rounded-md p-2 min-w-[80px] text-center shadow-lg",children:[u.jsx("div",{className:"text-xs font-bold text-slate-400 mb-2 uppercase",children:t.label||"Input"}),u.jsx("button",{className:`w-12 h-12 rounded-full font-mono text-xl font-bold transition-all ${t.value?"bg-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.6)]":"bg-slate-700 text-slate-500"}`,onClick:()=>t.onChange(a,t.value?0:1),children:t.value||0}),u.jsx(Oe,{type:"source",position:ye.Right,id:"out",className:"w-3 h-3 bg-blue-400"})]}),NT=({data:t})=>u.jsxs("div",{className:"bg-slate-800 border-2 border-slate-600 rounded-md p-2 min-w-[80px] text-center shadow-lg",children:[u.jsx(Oe,{type:"target",position:ye.Left,id:"in",className:"w-3 h-3 bg-slate-400"}),u.jsx("div",{className:"text-xs font-bold text-slate-400 mb-2 uppercase",children:t.label||"Output"}),u.jsx("div",{className:`w-12 h-12 mx-auto rounded-full flex items-center justify-center font-mono text-xl font-bold transition-all ${t.value?"bg-green-500 text-white shadow-[0_0_20px_rgba(34,197,94,0.8)]":"bg-slate-700 text-slate-500"}`,children:t.value||0})]}),TT=({data:t})=>{const a=t.type==="NOT";return u.jsxs("div",{className:"bg-slate-800 border-2 border-slate-600 rounded-md p-2 min-w-[100px] text-center shadow-lg",children:[!a&&u.jsx(Oe,{type:"target",position:ye.Left,id:"a",style:{top:"30%"},className:"w-2 h-2 bg-slate-400"}),!a&&u.jsx(Oe,{type:"target",position:ye.Left,id:"b",style:{top:"70%"},className:"w-2 h-2 bg-slate-400"}),a&&u.jsx(Oe,{type:"target",position:ye.Left,id:"in",className:"w-2 h-2 bg-slate-400"}),u.jsx("div",{className:"font-mono font-bold text-lg text-white py-2",children:t.type}),u.jsx(Oe,{type:"source",position:ye.Right,id:"out",className:`w-3 h-3 ${t.value?"bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)]":"bg-slate-600"}`})]})},MT=({data:t})=>{const a=t.conducting===1,i=t.inputValue===1,l=t.mode==="pmos"?"PMOS":"NMOS";return u.jsxs("div",{className:"bg-slate-800 border-2 border-amber-700/70 rounded-md p-2 min-w-[120px] text-center shadow-lg",children:[u.jsx(Oe,{type:"target",position:ye.Left,id:"in",style:{top:"32%"},className:`w-2 h-2 ${i?"bg-blue-400":"bg-slate-500"}`}),u.jsx(Oe,{type:"target",position:ye.Left,id:"gate",style:{top:"72%"},className:`w-2 h-2 ${a?"bg-amber-400":"bg-slate-500"}`}),u.jsx("div",{className:"text-[10px] font-bold text-amber-400 mb-1 uppercase tracking-wide",children:t.label||"Transistor"}),u.jsx("div",{className:"text-[9px] text-slate-500 uppercase tracking-wide",children:l}),u.jsx("div",{className:"font-mono font-bold text-white text-sm",children:a?"ON":"OFF"}),u.jsxs("div",{className:"text-[10px] text-slate-400 mt-1",children:["OUT: ",t.value||0]}),u.jsxs("div",{className:"flex justify-between text-[9px] text-slate-500 mt-2 px-1 uppercase",children:[u.jsx("span",{children:"In"}),u.jsx("span",{children:"Gate"})]}),u.jsx(Oe,{type:"source",position:ye.Right,id:"out",className:`w-3 h-3 ${t.value?"bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)]":"bg-slate-600"}`})]})},ET={app:{title:"Logic & Systems",group:"Group",groupSelectionTitle:"Group selection (Ctrl+G)",running:"Running",paused:"Paused",clearAll:"Clear all",tabs:{hardware:"Hardware",software:"Software",guideEn:"EN Guide",guideFr:"FR Guide"},prompts:{saveModuleName:"Module name to save:",moduleName:"Module name:",sceneName:"Scene name:"},guideTitles:{en:"User Guide (English)",fr:"Guide utilisateur (Français)"},guideSubtitles:{en:"Bundled directly into the application so the guide ships inside the same build as the simulator.",fr:"Bundled directly into the application so the documentation ships inside the same build as the simulator."}},embeddedGuide:{builtInGuide:"Built-In Guide"},hardwareSidebar:{scenes:"Scenes",loadScene:t=>`Load "${t}"`,deleteScene:"Delete this scene",saveScene:"Save scene",mySavedScenes:"My scenes",sceneLevels:{basics:"Level 1 · Basics",components:"Level 2 · 8-bit components",systems:"Level 3 · Systems",computer:"Level 4 · Full computer",free:"Sandbox"},sceneDescriptions:{__builtin_vaevient:"Two switches, one lamp. Flip either one and the light changes: that is a XOR gate.",__builtin_transistors:"A transistor is just a controlled switch. Build a buffer, an AND and an OR out of them.",__builtin_transistors_advanced:"NMOS and PMOS wired as pull-up / pull-down networks: NAND and XOR made of transistors only.",__builtin_binaire:"A decimal number lit up on 8 LEDs. See why 42 is written 00101010.",__builtin_halfadder:"Add two bits with one XOR and one AND. XOR gives the sum, AND gives the carry.",__builtin_srlatch:"Two cross-coupled NOR gates hold one bit. SET stores a 1, RESET stores a 0.",__builtin_additionneur:"Two numbers into an 8-bit adder. The carry lights up when the result goes past 255.",__builtin_comparateur:"The ALU subtracts B from A. A zero result means they are equal — exactly how a CPU compares.",__builtin_calculatrice:"One ALU, four operations picked by the OP switches: ADD, SUB, AND, OR.",__builtin_mux:"A multiplexer picks between two data sources: a railway switch for bits.",__builtin_accumulateur:"The register feeds the ALU which feeds the register back: a loop that counts up on every clock tick.",__builtin_lecture_mem:"A clock drives a counter that walks through SRAM addresses. The memory holds the Fibonacci sequence.",__builtin_rw_mem:"Pick an address, write a value, read it back. The full write → store → read cycle.",__builtin_hello:'SRAM holds "Hello World!" as ASCII codes; the clock walks the memory and prints it to the console.',__builtin_console_to_mem:"The other way round: type on the keyboard and each character is written into the next SRAM address.",__builtin_plotter:"One counter drives both X and Y, so the plotter draws the diagonal from (0,0) to (255,255).",__builtin_majuscules:"Type text and it comes out uppercase: in ASCII, a capital is a lowercase letter with bit 5 cleared.",__builtin_cpu8:"The whole machine: PC, instruction register, ALU, RAM and buses. Run a program from the Software tab.",__builtin_empty:"An empty canvas to build whatever you want."},simpleIo:"Simple I/O",switch:"Switch",led:"LED",io8Bit:"8-bit I/O",numIn:"Num In",numOut:"Num Out",logicGates:"Logic Gates",nmosTitle:"Transistor active when GATE = 1",pmosTitle:"Transistor active when GATE = 0",builtInModules:"Built-In Modules",adder8:"8-bit Adder",sram8:"8-bit SRAM",bus8:"8-bit Bus",cpuComponents:"CPU Components",clock:"Clock",register8:"8-bit Register",alu8:"8-bit ALU",mux8:"8-bit MUX",console:"Console",plotter:"Plotter",keyboard:"Keyboard",externalDrive:"External Drive",networkController:"Network Controller",logicModules:"Logic Modules",addModule:t=>`Add ${t}`,myModules:"My Modules",deleteModule:"Delete this module",footer:"Drag to connect ports. Click a wire then press Backspace to delete it. Select nodes and press Ctrl+G to group them."},hardwareCpuControls:{step:"Step",run:"Run",stop:"Stop",reset:"Reset",instructionsPerTick:"instr/tick",instructionsPerSecond:"instr/s",assembleHint:"Assemble a program in the Software tab",halted:"HALTED",running:"RUNNING",ready:"READY"},software:{editor:{titleAsm:"ASM Editor",titleC:"C Editor",loadExample:"Load an example...",errorLinePrefix:"L"},toolbar:{assemble:"Assemble",compile:"Compile",step:"Step",run:"Run",stop:"Stop",reset:"Reset",useBootloader:"Use bootloader",disk:"Disk",import:"Import",export:"Export",compileToDisk:"Compile to Disk",installLinuxDisk:"Install Linux Disk",instructionsPerTick:"instr/tick",halted:"HALTED",running:"RUNNING",ready:"READY",code:"Code",ram:"RAM",stack:"Stack",sameLiveCpu:"Same live CPU",computer:"Computer",classic:"Classic",compileToDiskPrompt:"Program name on disk (max 8 chars):",compileToDiskDefaultName:"program",compileToDiskError:"Could not write program to disk.",installLinuxDiskConfirm:"Replace the current external drive with the bundled Linux-like disk image?",memoryTooltip:({liveCodeUsed:t,codeSize:a,codeMax:i,globals:l,scratch:o,locals:c,dataUsed:d,dataMax:m,dataFree:x,stackUsed:h,stackMax:b,spHex:g,totalRamUsed:v,totalRamMax:L,totalRamFree:w})=>`-- Code (0x0000-0x0FFF) --
Used now: ${t}/${i}B
Last build: ${a}/${i}B

-- Data (0x1000-0x17FF) --
Globals: ${l}/16B
Scratch: ${o}/8B (fixed)
Locals: ${c}/2024B
Reserved: ${d}/${m}B
Free: ${x}B

-- Stack (0x1800-0x1FFF) --
Used now: ${h}/${b}B
SP: 0x${g}
Free: ${b-h}B

-- Total RAM (excluding code) --
Used: ${v}/${L}B
Free: ${w}B`},cpuState:{title:"CPU Registers",flags:"Flags",cycles:"Cycles",halted:"HALTED",stackSuffix:"stk"},memoryView:{title:"Memory",goToPc:t=>`Go to PC (${t})`,goToSp:t=>`Go to SP (${t})`,regionCode:"Code",regionData:"Data",regionStack:"Stack",cellTitle:({addrHex:t,value:a,valueHex:i,isPc:l,isSp:o})=>`${t} = ${a} (${i})${l?" ◄ PC":""}${o?" ◄ SP":""}`},console:{title:"Console",clear:"Clear console",waiting:"Waiting for output...",placeholder:"Input + Enter..."},plotter:{clear:"Clear plotter",fullscreen:"Fullscreen",exitFullscreen:"Exit fullscreen (ESC)",fullscreenActive:"Fullscreen active",escapeToExit:"ESC to exit",pixels:"pixels"},computerPanel:{title:"Computer Overview",subtitle:"Unified live representation of the software computer and its peripherals.",fullscreen:"Fullscreen",exitFullscreen:"Exit fullscreen",fullscreenActive:"Fullscreen panel active"},architectureFlow:{title:"Computer Architecture Flow",subtitle:"Live CPU, ALU, memory bus, and I/O topology rendered from the same SVG generator as the test snapshots.",instruction:"instruction",dataPulse:"data pulse",on:"ON",off:"OFF",consolePreview:"console preview",noPixels:"NO PIXELS"},statusCard:{title:"CPU and Live State",subtitle:"Same computer instance as the software view, without hardware-level granularity.",running:"RUNNING",halted:"HALTED",ready:"READY",bootloader:"Bootloader",rawProgram:"Raw program",code:"Code",instructionBus:"Instruction Bus",nextInstruction:"Next instruction",lastExecuted:"Last executed",clock:"Clock",sleep:"Sleep",cycles:"Cycles",executionFlags:"Execution Flags",inputBuffer:"Input buffer",bytes:"bytes",rngState:"RNG state",memoryLoad:"Memory load",loaded:"loaded",empty:"empty",noInstructionExecuted:"No instruction executed yet"},memoryCard:{title:"Memory, Stack and Boot Args",ram:"RAM",codeRegion:"Code region",dataRegion:"Data region",stackRegion:"Stack region",aroundPc:"Around PC",stackTop:"Stack Top",bootArguments:"Boot arguments",argumentCount:"Argument count",resolvedFile:"Resolved file",none:"none",unknown:"(unknown)",dirInfo:({dirPage:t,dirOffset:a,type:i})=>`dir ${t}:${a} | type ${i}`,fileInfo:({startPage:t,pageCount:a,sizeBytes:i})=>`start page ${t} | pages ${a} | size ${i}`},filesystemCard:{title:"Filesystem Disk",ready:"Boot FS ready",unformatted:"Unformatted",entries:"Entries",used:"Used",free:"Free",drivePage:"Drive page",name:"Name",type:"Type",size:"Size",pages:"Pages",start:"Start",noFiles:"No files on disk.",binaryOrEmpty:"(binary or empty)",info:"Filesystem info",directoryPagesReserved:"Directory pages reserved",pageSizeBytes:"page size",lastAddr:"Last addr",lastRead:"Last read",lastWrite:"Last write",firstEntryPreview:"First entry preview",file:"file",program:"program"},networkCard:{title:"Network Controller",pending:"Pending",idle:"Idle",url:"URL",noRequestYet:"No request yet",requestBody:"Request body",responseBuffer:"Response buffer",empty:"(empty)",bytesAvailable:"bytes available",lastByte:"last byte",noResponseBytesYet:"(no response bytes yet)",lastStatus:"Last status",noCompletedRequestYet:"No completed request yet",lastCompletedRequest:"Last completed request",lastCompletedResponseBody:"Last completed response body",noCompletedResponseYet:"No completed response yet",recentRequests:"Recent requests",noUrl:"(no url)",responseBody:"Response body",yes:"yes",no:"no"},keyboardCard:{title:"Immediate Keyboard",collapse:"Collapse",expand:"Expand keyboard",captureSurface:"Capture surface",captureHelp:"Click here, then type on your physical keyboard for immediate input.",captureRunning:"Global host keyboard capture is active while the CPU runs.",capturePaused:"This focused area still lets you feed keys even while paused.",liveKeyLines:"Live key lines",inputQueue:"Input queue",bytes:"byte(s)",empty:"(empty)",clickableKeyboard:"Clickable keyboard",liveKeys:{left:"Left",right:"Right",up:"Up",down:"Down",enter:"Enter"}},nodeLabels:{keyboard:"KEYBOARD",externalDrive:"EXT DRIVE",network:"NETWORK"},prompts:{renameModule:"Rename module:",inspectInternalCircuit:"View internal circuit",saveReusableModule:"Save as reusable module",ungroup:"Ungroup",saveModuleName:"Save module name:",seeInternalCircuit:"View internal circuit",clearConsole:"Clear console",consolePlaceholder:"Input + Enter...",lastByte:"Last",chars:"chars",inputBufferShort:"buf",clearPlotter:"Clear plotter",pixels:"pixels",networkMethod:"method",pending:"PENDING",ready:"READY",idle:"IDLE",networkUrl:"url",networkBody:"body",byte:"byte",available:"avail",pendingShort:"pending",control:"CONTROL",dataOut:"DATA OUT"}}},RT={app:{title:"Logique & Systèmes",group:"Grouper",groupSelectionTitle:"Grouper la sélection (Ctrl+G)",running:"En cours",paused:"En pause",clearAll:"Tout effacer",tabs:{hardware:"Matériel",software:"Logiciel",guideEn:"Guide EN",guideFr:"Guide FR"},prompts:{saveModuleName:"Nom du module à sauvegarder :",moduleName:"Nom du module :",sceneName:"Nom de la scène :"},guideTitles:{en:"Guide utilisateur (anglais)",fr:"Guide utilisateur (français)"},guideSubtitles:{en:"Inclus directement dans l’application pour que la documentation fasse partie du même build que le simulateur.",fr:"Inclus directement dans l’application pour que la documentation fasse partie du build, au même titre que le simulateur."}},embeddedGuide:{builtInGuide:"Guide intégré"},hardwareSidebar:{scenes:"Scènes",loadScene:t=>`Charger « ${t} »`,deleteScene:"Supprimer cette scène",saveScene:"Sauvegarder la scène",mySavedScenes:"Mes scènes",sceneLevels:{basics:"Niveau 1 · Les bases",components:"Niveau 2 · Composants 8 bits",systems:"Niveau 3 · Systèmes",computer:"Niveau 4 · L'ordinateur complet",free:"Bac à sable"},sceneDescriptions:{__builtin_vaevient:"Deux interrupteurs, une lampe. Changez n'importe lequel et la lumière change : c'est la porte XOR.",__builtin_transistors:"Un transistor n'est qu'un interrupteur commandé. On en fait un buffer, un AND et un OR.",__builtin_transistors_advanced:"NMOS et PMOS en réseaux pull-up / pull-down : un NAND et un XOR faits uniquement de transistors.",__builtin_binaire:"Un nombre décimal allumé sur 8 LEDs. Voir pourquoi 42 s'écrit 00101010.",__builtin_halfadder:"Additionner deux bits avec un XOR et un AND. Le XOR donne la somme, le AND donne la retenue.",__builtin_srlatch:"Deux portes NOR croisées retiennent un bit. SET mémorise un 1, RESET mémorise un 0.",__builtin_additionneur:"Deux nombres dans un additionneur 8 bits. La retenue s'allume quand le résultat dépasse 255.",__builtin_comparateur:"L'ALU soustrait B de A. Un résultat nul veut dire qu'ils sont égaux — exactement comme un vrai processeur.",__builtin_calculatrice:"Une ALU, quatre opérations choisies par les switches OP : ADD, SUB, AND, OR.",__builtin_mux:"Un multiplexeur choisit entre deux sources de données : un aiguillage de train pour les bits.",__builtin_accumulateur:"Le registre alimente l'ALU qui réalimente le registre : une boucle qui compte à chaque coup d'horloge.",__builtin_lecture_mem:"Une horloge fait avancer un compteur qui parcourt les adresses de la SRAM. La mémoire contient la suite de Fibonacci.",__builtin_rw_mem:"Choisissez une adresse, écrivez une valeur, relisez-la. Le cycle complet écriture → stockage → relecture.",__builtin_hello:"La SRAM contient « Hello World! » en ASCII ; l'horloge parcourt la mémoire et l'affiche sur la console.",__builtin_console_to_mem:"L'inverse : tapez au clavier et chaque caractère est écrit à l'adresse SRAM suivante.",__builtin_plotter:"Un seul compteur pilote X et Y, donc le plotter trace la diagonale de (0,0) à (255,255).",__builtin_majuscules:"Tapez du texte, il ressort en MAJUSCULES : en ASCII, une capitale est une minuscule avec le bit 5 à 0.",__builtin_cpu8:"La machine entière : PC, registre d'instruction, ALU, RAM et bus. Lancez un programme depuis l'onglet Software.",__builtin_empty:"Un canvas vide pour construire ce que vous voulez."},simpleIo:"I/O simples",switch:"Interrupteur",led:"LED",io8Bit:"I/O 8-bit",numIn:"Entrée num.",numOut:"Sortie num.",logicGates:"Portes logiques",nmosTitle:"Transistor actif quand GATE = 1",pmosTitle:"Transistor actif quand GATE = 0",builtInModules:"Modules intégrés",adder8:"Additionneur 8-bit",sram8:"SRAM 8-bit",bus8:"Bus 8-bit",cpuComponents:"Composants CPU",clock:"Horloge",register8:"Registre 8-bit",alu8:"ALU 8-bit",mux8:"MUX 8-bit",console:"Console",plotter:"Plotter",keyboard:"Clavier",externalDrive:"Disque externe",networkController:"Contrôleur réseau",logicModules:"Modules logiques",addModule:t=>`Ajouter ${t}`,myModules:"Mes modules",deleteModule:"Supprimer ce module",footer:"Glissez pour connecter les points. Cliquez sur un fil puis appuyez sur Retour Arrière pour le supprimer. Sélectionnez des noeuds et appuyez sur Ctrl+G pour grouper."},hardwareCpuControls:{step:"Pas",run:"Lancer",stop:"Stop",reset:"Réinitialiser",instructionsPerTick:"instr/tick",instructionsPerSecond:"instr/s",assembleHint:"Assemblez un programme dans l’onglet Logiciel",halted:"HALTED",running:"RUNNING",ready:"READY"},software:{editor:{titleAsm:"Éditeur ASM",titleC:"Éditeur C",loadExample:"Charger un exemple...",errorLinePrefix:"L"},toolbar:{assemble:"Assembler",compile:"Compiler",step:"Pas",run:"Lancer",stop:"Stop",reset:"Réinitialiser",useBootloader:"Utiliser le bootloader",disk:"Disque",import:"Importer",export:"Exporter",compileToDisk:"Compiler vers le disque",installLinuxDisk:"Installer le disque Linux",instructionsPerTick:"instr/tick",halted:"HALTED",running:"RUNNING",ready:"READY",code:"Code",ram:"RAM",stack:"Stack",sameLiveCpu:"Même CPU en direct",computer:"Ordinateur",classic:"Classique",compileToDiskPrompt:"Nom du programme sur le disque (8 caractères max) :",compileToDiskDefaultName:"programme",compileToDiskError:"Impossible d’écrire le programme sur le disque.",installLinuxDiskConfirm:"Remplacer le disque externe actuel par l’image disque Linux fournie ?",memoryTooltip:({liveCodeUsed:t,codeSize:a,codeMax:i,globals:l,scratch:o,locals:c,dataUsed:d,dataMax:m,dataFree:x,stackUsed:h,stackMax:b,spHex:g,totalRamUsed:v,totalRamMax:L,totalRamFree:w})=>`-- Code (0x0000-0x0FFF) --
Utilisé maintenant : ${t}/${i}B
Dernière compilation : ${a}/${i}B

-- Données (0x1000-0x17FF) --
Globales : ${l}/16B
Scratch : ${o}/8B (fixe)
Locales : ${c}/2024B
Réservé : ${d}/${m}B
Libre : ${x}B

-- Stack (0x1800-0x1FFF) --
Utilisé maintenant : ${h}/${b}B
SP : 0x${g}
Libre : ${b-h}B

-- RAM totale (hors code) --
Utilisée : ${v}/${L}B
Libre : ${w}B`},cpuState:{title:"Registres CPU",flags:"Flags",cycles:"Cycles",halted:"HALTED",stackSuffix:"stk"},memoryView:{title:"Mémoire",goToPc:t=>`Aller au PC (${t})`,goToSp:t=>`Aller au SP (${t})`,regionCode:"Code",regionData:"Données",regionStack:"Stack",cellTitle:({addrHex:t,value:a,valueHex:i,isPc:l,isSp:o})=>`${t} = ${a} (${i})${l?" ◄ PC":""}${o?" ◄ SP":""}`},console:{title:"Console",clear:"Effacer la console",waiting:"En attente de sortie...",placeholder:"Saisie + Entrée..."},plotter:{clear:"Effacer le plotter",fullscreen:"Plein écran",exitFullscreen:"Réduire (ESC)",fullscreenActive:"Plein écran actif",escapeToExit:"ESC pour quitter",pixels:"pixels"},computerPanel:{title:"Vue d’ensemble de l’ordinateur",subtitle:"Représentation en direct unifiée de l’ordinateur logiciel et de ses périphériques.",fullscreen:"Plein écran",exitFullscreen:"Quitter le plein écran",fullscreenActive:"Panneau en plein écran actif"},architectureFlow:{title:"Flux d’architecture de l’ordinateur",subtitle:"CPU, ALU, bus mémoire et topologie I/O en direct, rendus par le même générateur SVG que les snapshots de test.",instruction:"instruction",dataPulse:"impulsion données",on:"ON",off:"OFF",consolePreview:"aperçu console",noPixels:"AUCUN PIXEL"},statusCard:{title:"CPU et état en direct",subtitle:"Même instance d’ordinateur que la vue logicielle, sans la granularité niveau matériel.",running:"RUNNING",halted:"HALTED",ready:"READY",bootloader:"Bootloader",rawProgram:"Programme brut",code:"Code",instructionBus:"Bus d’instructions",nextInstruction:"Instruction suivante",lastExecuted:"Dernière exécutée",clock:"Horloge",sleep:"Pause",cycles:"Cycles",executionFlags:"Flags d’exécution",inputBuffer:"Tampon d’entrée",bytes:"octets",rngState:"État RNG",memoryLoad:"Chargement mémoire",loaded:"chargé",empty:"vide",noInstructionExecuted:"Aucune instruction exécutée pour le moment"},memoryCard:{title:"Mémoire, pile et arguments de boot",ram:"RAM",codeRegion:"Zone code",dataRegion:"Zone données",stackRegion:"Zone stack",aroundPc:"Autour du PC",stackTop:"Sommet de pile",bootArguments:"Arguments de boot",argumentCount:"Nombre d’arguments",resolvedFile:"Fichier résolu",none:"aucun",unknown:"(inconnu)",dirInfo:({dirPage:t,dirOffset:a,type:i})=>`répertoire ${t}:${a} | type ${i}`,fileInfo:({startPage:t,pageCount:a,sizeBytes:i})=>`page de départ ${t} | pages ${a} | taille ${i}`},filesystemCard:{title:"Disque système de fichiers",ready:"Boot FS prêt",unformatted:"Non formaté",entries:"Entrées",used:"Utilisé",free:"Libre",drivePage:"Page disque",name:"Nom",type:"Type",size:"Taille",pages:"Pages",start:"Début",noFiles:"Aucun fichier sur le disque.",binaryOrEmpty:"(binaire ou vide)",info:"Infos système de fichiers",directoryPagesReserved:"Pages de répertoire réservées",pageSizeBytes:"taille de page",lastAddr:"Dernière adresse",lastRead:"Dernière lecture",lastWrite:"Dernière écriture",firstEntryPreview:"Aperçu de la première entrée",file:"fichier",program:"programme"},networkCard:{title:"Contrôleur réseau",pending:"En attente",idle:"Inactif",url:"URL",noRequestYet:"Aucune requête pour le moment",requestBody:"Corps de requête",responseBuffer:"Tampon de réponse",empty:"(vide)",bytesAvailable:"octets disponibles",lastByte:"dernier octet",noResponseBytesYet:"(aucun octet de réponse pour le moment)",lastStatus:"Dernier statut",noCompletedRequestYet:"Aucune requête terminée pour le moment",lastCompletedRequest:"Dernière requête terminée",lastCompletedResponseBody:"Dernier corps de réponse terminé",noCompletedResponseYet:"Aucune réponse terminée pour le moment",recentRequests:"Requêtes récentes",noUrl:"(pas d’url)",responseBody:"Corps de réponse",yes:"oui",no:"non"},keyboardCard:{title:"Clavier immédiat",collapse:"Réduire",expand:"Afficher le clavier",captureSurface:"Zone de capture",captureHelp:"Cliquez ici, puis tapez sur votre clavier physique pour une entrée immédiate.",captureRunning:"La capture globale du clavier hôte est active pendant l’exécution du CPU.",capturePaused:"Cette zone focalisée permet quand même d’envoyer des touches à l’arrêt.",liveKeyLines:"Lignes de touches",inputQueue:"File d’entrée",bytes:"octet(s)",empty:"(vide)",clickableKeyboard:"Clavier cliquable",liveKeys:{left:"Gauche",right:"Droite",up:"Haut",down:"Bas",enter:"Entrée"}},nodeLabels:{keyboard:"CLAVIER",externalDrive:"DISQUE EXT",network:"RÉSEAU"},prompts:{renameModule:"Renommer le module :",inspectInternalCircuit:"Voir le circuit interne",saveReusableModule:"Sauvegarder comme module réutilisable",ungroup:"Dégrouper",saveModuleName:"Nom du module à sauvegarder :",seeInternalCircuit:"Voir le circuit interne",clearConsole:"Effacer la console",consolePlaceholder:"Saisie + Entrée...",lastByte:"Dernier",chars:"car.",inputBufferShort:"buf",clearPlotter:"Effacer le plotter",pixels:"pixels",networkMethod:"méthode",pending:"PENDING",ready:"READY",idle:"IDLE",networkUrl:"url",networkBody:"body",byte:"octet",available:"dispo",pendingShort:"attente",control:"CONTRÔLE",dataOut:"DONNÉES OUT"}}},kT={en:ET,fr:RT};function OT(){return typeof navigator>"u"?"en":[...navigator.languages??[],navigator.language].filter(Boolean).some(a=>a.toLowerCase().startsWith("fr"))?"fr":"en"}const nb=z.createContext(null);function jT({locale:t,children:a}){const i=z.useMemo(()=>({locale:t,messages:kT[t]}),[t]);return u.jsx(nb.Provider,{value:i,children:a})}function Ot(){const t=z.useContext(nb);if(!t)throw new Error("useI18n must be used inside I18nProvider");return t}const BT=({data:t})=>{const{messages:a}=Ot(),i=a.software.prompts;return u.jsxs("div",{className:"bg-slate-800 border-2 border-blue-600 rounded-md p-3 min-w-[150px] shadow-lg relative",children:[u.jsx("button",{onClick:()=>window.dispatchEvent(new CustomEvent("inspect-node",{detail:"adder8"})),className:"absolute top-2 right-2 text-slate-400 hover:text-white transition-colors",title:i.seeInternalCircuit,children:u.jsx(Ns,{size:14})}),u.jsxs("div",{className:"flex items-center justify-center gap-2 mb-4 border-b border-slate-700 pb-2",children:[u.jsx(tl,{size:16,className:"text-blue-400"}),u.jsx("span",{className:"font-bold text-white",children:"8-bit Adder"})]}),u.jsxs("div",{className:"flex justify-between",children:[u.jsxs("div",{className:"flex flex-col gap-1",children:[u.jsx("div",{className:"text-[10px] text-slate-500 font-mono mb-1",children:"A [0..7]"}),[0,1,2,3,4,5,6,7].map(l=>u.jsxs("div",{className:"relative h-4 flex items-center",children:[u.jsx(Oe,{type:"target",position:ye.Left,id:`a${l}`,className:"w-2 h-2 bg-slate-400 -ml-4"}),u.jsxs("span",{className:"text-[8px] text-slate-400 font-mono ml-1",children:["A",l]})]},`a${l}`)),u.jsx("div",{className:"text-[10px] text-slate-500 font-mono mt-2 mb-1",children:"B [0..7]"}),[0,1,2,3,4,5,6,7].map(l=>u.jsxs("div",{className:"relative h-4 flex items-center",children:[u.jsx(Oe,{type:"target",position:ye.Left,id:`b${l}`,className:"w-2 h-2 bg-slate-400 -ml-4"}),u.jsxs("span",{className:"text-[8px] text-slate-400 font-mono ml-1",children:["B",l]})]},`b${l}`)),u.jsxs("div",{className:"relative h-4 flex items-center mt-2",children:[u.jsx(Oe,{type:"target",position:ye.Left,id:"cin",className:"w-2 h-2 bg-red-400 -ml-4"}),u.jsx("span",{className:"text-[8px] text-red-400 font-mono ml-1",children:"Cin"})]})]}),u.jsxs("div",{className:"flex flex-col gap-1 items-end",children:[u.jsx("div",{className:"text-[10px] text-slate-500 font-mono mb-1",children:"Sum [0..7]"}),[0,1,2,3,4,5,6,7].map(l=>{var o;return u.jsxs("div",{className:"relative h-4 flex items-center justify-end",children:[u.jsxs("span",{className:"text-[8px] text-slate-400 font-mono mr-1",children:["S",l]}),u.jsx(Oe,{type:"source",position:ye.Right,id:`s${l}`,className:`w-2 h-2 -mr-4 ${(o=t.sum)!=null&&o[l]?"bg-green-400":"bg-slate-600"}`})]},`s${l}`)}),u.jsxs("div",{className:"relative h-4 flex items-center justify-end mt-2",children:[u.jsx("span",{className:"text-[8px] text-red-400 font-mono mr-1",children:"Cout"}),u.jsx(Oe,{type:"source",position:ye.Right,id:"cout",className:`w-2 h-2 -mr-4 ${t.cout?"bg-red-400":"bg-slate-600"}`})]})]})]})]})},PT=({data:t})=>{const{messages:a}=Ot(),i=a.software.prompts,l=t.currentAddress||0,o=t.memory?t.memory.length:256,c=o<=256?8:o<=1024?10:11,d=c<=8?2:3,m=t.memory?t.memory[l]:0;return u.jsxs("div",{className:"bg-slate-800 border-2 border-amber-600 rounded-md p-2 min-w-[150px] shadow-lg flex flex-col relative",children:[u.jsx("button",{onClick:()=>window.dispatchEvent(new CustomEvent("inspect-node",{detail:"sram8"})),className:"absolute top-2 right-2 text-slate-400 hover:text-white transition-colors",title:i.seeInternalCircuit,children:u.jsx(Ns,{size:14})}),u.jsxs("div",{className:"flex items-center justify-center gap-2 mb-2 border-b border-slate-700 pb-2",children:[u.jsx(Af,{size:14,className:"text-amber-400"}),u.jsxs("span",{className:"text-[10px] font-bold text-white uppercase",children:["SRAM ",o,"x8"]})]}),u.jsxs("div",{className:"bg-slate-900 rounded p-1 mb-2 text-center border border-slate-700",children:[u.jsxs("div",{className:"text-[10px] text-slate-400 font-mono",children:["ADDR: 0x",l.toString(16).padStart(d,"0").toUpperCase()]}),u.jsxs("div",{className:"text-[10px] text-green-400 font-mono",children:["DATA: 0x",m.toString(16).padStart(2,"0").toUpperCase()]})]}),u.jsxs("div",{className:"flex justify-between",children:[u.jsxs("div",{className:"flex flex-col gap-1",children:[u.jsx("div",{className:"text-[8px] text-yellow-500 font-bold",children:"ADDR"}),Array.from({length:c},(x,h)=>u.jsxs("div",{className:"relative h-3 flex items-center",children:[u.jsx(Oe,{type:"target",position:ye.Left,id:`a${h}`,className:"w-2 h-2 bg-yellow-400 -ml-3"}),u.jsxs("span",{className:"text-[8px] text-slate-500 font-mono ml-1",children:["A",h]})]},`a${h}`)),u.jsx("div",{className:"text-[8px] text-blue-400 font-bold mt-1",children:"DATA IN"}),[0,1,2,3,4,5,6,7].map(x=>u.jsxs("div",{className:"relative h-3 flex items-center",children:[u.jsx(Oe,{type:"target",position:ye.Left,id:`d${x}`,className:"w-2 h-2 bg-blue-400 -ml-3"}),u.jsxs("span",{className:"text-[8px] text-slate-500 font-mono ml-1",children:["D",x]})]},`d${x}`)),u.jsxs("div",{className:"relative h-3 flex items-center mt-2",children:[u.jsx(Oe,{type:"target",position:ye.Left,id:"we",className:"w-2 h-2 bg-red-400 -ml-3"}),u.jsx("span",{className:"text-[8px] text-red-400 font-mono ml-1 font-bold",children:"WE"})]})]}),u.jsxs("div",{className:"flex flex-col gap-1 items-end mt-4",children:[u.jsx("div",{className:"text-[8px] text-green-400 font-bold",children:"DATA OUT"}),[0,1,2,3,4,5,6,7].map(x=>{const h=m&1<<x?1:0;return u.jsxs("div",{className:"relative h-3 flex items-center justify-end w-full",children:[u.jsxs("span",{className:"text-[8px] text-slate-500 font-mono mr-1",children:["Q",x]}),u.jsx(Oe,{type:"source",position:ye.Right,id:`q${x}`,className:`w-2 h-2 -mr-3 ${h?"bg-green-400":"bg-slate-600"}`})]},`q${x}`)})]})]})]})},zT=({data:t})=>u.jsxs("div",{className:"bg-slate-800 border-2 border-slate-500 rounded-md p-2 min-w-[60px] shadow-lg flex flex-col items-center",children:[u.jsx("div",{className:"text-[10px] font-bold text-slate-300 mb-2 uppercase",children:"8-bit Bus"}),u.jsxs("div",{className:"flex justify-between w-full gap-4",children:[u.jsx("div",{className:"flex flex-col gap-1",children:[0,1,2,3,4,5,6,7].map(a=>u.jsxs("div",{className:"relative h-4 flex items-center",children:[u.jsx(Oe,{type:"target",position:ye.Left,id:`in${a}`,className:"w-2 h-2 bg-slate-400 -ml-3"}),u.jsx("span",{className:"text-[8px] text-slate-500 font-mono ml-1",children:a})]},`in${a}`))}),u.jsx("div",{className:"flex flex-col gap-1 items-end",children:[0,1,2,3,4,5,6,7].map(a=>{var i;return u.jsxs("div",{className:"relative h-4 flex items-center justify-end",children:[u.jsx("span",{className:"text-[8px] text-slate-500 font-mono mr-1",children:a}),u.jsx(Oe,{type:"source",position:ye.Right,id:`out${a}`,className:`w-2 h-2 -mr-3 ${(i=t.val)!=null&&i[a]?"bg-blue-400":"bg-slate-600"}`})]},`out${a}`)})})]})]}),UT=({data:t,id:a})=>{const i=t.value||0;return u.jsxs("div",{className:"bg-slate-800 border-2 border-slate-600 rounded-md p-2 min-w-[100px] shadow-lg flex flex-col",children:[u.jsx("div",{className:"text-[10px] font-bold text-slate-400 mb-1 text-center uppercase",children:t.label||"Num In"}),u.jsx("input",{type:"number",min:"0",max:"255",value:i,onChange:l=>{let o=parseInt(l.target.value,10);isNaN(o)&&(o=0),o<0&&(o=0),o>255&&(o=255),t.onChange(a,o)},className:"w-full bg-slate-900 text-white text-center font-mono text-lg rounded border border-slate-700 nodrag"}),u.jsx("div",{className:"flex flex-col gap-1 mt-2 items-end",children:[0,1,2,3,4,5,6,7].map(l=>{const o=i&1<<l?1:0;return u.jsxs("div",{className:"relative h-3 flex items-center justify-end w-full",children:[u.jsxs("span",{className:"text-[8px] text-slate-500 font-mono mr-1",children:["Bit ",l]}),u.jsx(Oe,{type:"source",position:ye.Right,id:`out${l}`,className:`w-2 h-2 -mr-3 ${o?"bg-blue-400":"bg-slate-600"}`})]},`out${l}`)})})]})},$T=({data:t})=>{const a=t.value||0;return u.jsxs("div",{className:"bg-slate-800 border-2 border-slate-600 rounded-md p-2 min-w-[100px] shadow-lg flex flex-col",children:[u.jsx("div",{className:"text-[10px] font-bold text-slate-400 mb-1 text-center uppercase",children:t.label||"Num Out"}),u.jsx("div",{className:"w-full bg-slate-900 text-green-400 text-center font-mono text-xl rounded border border-slate-700 p-1 shadow-[0_0_10px_rgba(34,197,94,0.2)]",children:a}),u.jsx("div",{className:"flex flex-col gap-1 mt-2",children:[0,1,2,3,4,5,6,7].map(i=>u.jsxs("div",{className:"relative h-3 flex items-center w-full",children:[u.jsx(Oe,{type:"target",position:ye.Left,id:`in${i}`,className:"w-2 h-2 bg-slate-400 -ml-3"}),u.jsxs("span",{className:"text-[8px] text-slate-500 font-mono ml-1",children:["Bit ",i]})]},`in${i}`))})]})},IT=({data:t,id:a})=>{const{messages:i}=Ot(),l=i.software.prompts,{label:o,inputHandles:c,outputHandles:d,outputs:m}=t,x=()=>{const h=prompt(l.renameModule,o);h&&h!==o&&window.dispatchEvent(new CustomEvent("rename-module",{detail:{id:a,newLabel:h}}))};return u.jsxs("div",{className:"bg-slate-800 border-2 border-purple-600 rounded-md p-3 min-w-[140px] shadow-lg relative",children:[u.jsxs("div",{className:"absolute top-2 right-2 flex items-center gap-1",children:[u.jsx("button",{onClick:x,className:"text-slate-400 hover:text-white transition-colors p-0.5",title:l.renameModule,children:u.jsx(rT,{size:12})}),u.jsx("button",{onClick:()=>window.dispatchEvent(new CustomEvent("inspect-node",{detail:`group:${a}`})),className:"text-slate-400 hover:text-white transition-colors p-0.5",title:l.inspectInternalCircuit,children:u.jsx(Ns,{size:12})}),u.jsx("button",{onClick:()=>window.dispatchEvent(new CustomEvent("save-module",{detail:a})),className:"text-slate-400 hover:text-green-400 transition-colors p-0.5",title:l.saveReusableModule,children:u.jsx(eb,{size:12})}),u.jsx("button",{onClick:()=>window.dispatchEvent(new CustomEvent("ungroup-node",{detail:a})),className:"text-slate-400 hover:text-red-400 transition-colors p-0.5",title:l.ungroup,children:u.jsx(_T,{size:12})})]}),u.jsxs("div",{className:"flex items-center gap-2 mb-3 border-b border-slate-700 pb-2 pr-20",children:[u.jsx(nl,{size:16,className:"text-purple-400 shrink-0"}),u.jsx("span",{className:"font-bold text-white text-sm truncate max-w-[120px]",children:o})]}),u.jsxs("div",{className:"flex justify-between gap-4",children:[c.length>0&&u.jsx("div",{className:"flex flex-col gap-1",children:c.map(h=>u.jsxs("div",{className:"relative h-4 flex items-center",children:[u.jsx(Oe,{type:"target",position:ye.Left,id:h.handleId,className:"w-2 h-2 bg-slate-400 -ml-4"}),u.jsx("span",{className:"text-[8px] text-slate-400 font-mono ml-1 whitespace-nowrap",children:h.label})]},h.handleId))}),d.length>0&&u.jsx("div",{className:"flex flex-col gap-1 items-end",children:d.map(h=>u.jsxs("div",{className:"relative h-4 flex items-center justify-end",children:[u.jsx("span",{className:"text-[8px] text-slate-400 font-mono mr-1 whitespace-nowrap",children:h.label}),u.jsx(Oe,{type:"source",position:ye.Right,id:h.handleId,className:`w-2 h-2 -mr-4 ${m[h.handleId]?"bg-purple-400":"bg-slate-600"}`})]},h.handleId))})]})]})},HT=({data:t,id:a})=>{const i=l=>{const o=Math.max(.5,Math.min(10,(t.frequency||1)+l));window.dispatchEvent(new CustomEvent("clock-frequency",{detail:{id:a,frequency:o}}))};return u.jsxs("div",{className:"bg-slate-800 border-2 border-green-600 rounded-md p-3 min-w-[110px] shadow-lg text-center",children:[u.jsxs("div",{className:"flex items-center justify-center gap-2 mb-2 border-b border-slate-700 pb-2",children:[u.jsx(Y_,{size:14,className:"text-green-400"}),u.jsx("span",{className:"text-[10px] font-bold text-white uppercase",children:t.label||"CLK"})]}),u.jsxs("div",{className:"flex items-center justify-center gap-2 mb-2",children:[u.jsx("button",{onClick:()=>i(-.5),className:"w-5 h-5 rounded bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold nodrag cursor-pointer",children:"-"}),u.jsxs("span",{className:"text-sm font-mono text-green-400 min-w-[40px]",children:[t.frequency||1," Hz"]}),u.jsx("button",{onClick:()=>i(.5),className:"w-5 h-5 rounded bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold nodrag cursor-pointer",children:"+"})]}),u.jsx("div",{className:`w-5 h-5 rounded-full mx-auto mb-1 transition-all ${t.value?"bg-green-400 shadow-[0_0_15px_rgba(74,222,128,0.8)]":"bg-slate-600"}`}),u.jsx(Oe,{type:"source",position:ye.Right,id:"out",className:`w-3 h-3 ${t.value?"bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.8)]":"bg-slate-600"}`})]})},JT=({data:t})=>{const a=t.value||0;return u.jsxs("div",{className:"bg-slate-800 border-2 border-cyan-600 rounded-md p-2 min-w-[150px] shadow-lg flex flex-col",children:[u.jsxs("div",{className:"flex items-center justify-center gap-2 mb-2 border-b border-slate-700 pb-2",children:[u.jsx(Zc,{size:14,className:"text-cyan-400"}),u.jsx("span",{className:"text-[10px] font-bold text-white uppercase",children:t.label||"REG 8-bit"})]}),u.jsx("div",{className:"bg-slate-900 rounded p-1 mb-2 text-center border border-slate-700",children:u.jsxs("div",{className:"text-[10px] text-cyan-400 font-mono",children:["VAL: 0x",a.toString(16).padStart(2,"0").toUpperCase()," (",a,")"]})}),u.jsxs("div",{className:"flex justify-between",children:[u.jsxs("div",{className:"flex flex-col gap-1",children:[u.jsx("div",{className:"text-[8px] text-cyan-500 font-bold",children:"DATA IN"}),[0,1,2,3,4,5,6,7].map(i=>u.jsxs("div",{className:"relative h-3 flex items-center",children:[u.jsx(Oe,{type:"target",position:ye.Left,id:`d${i}`,className:"w-2 h-2 bg-cyan-400 -ml-3"}),u.jsxs("span",{className:"text-[8px] text-slate-500 font-mono ml-1",children:["D",i]})]},`d${i}`)),u.jsxs("div",{className:"relative h-3 flex items-center mt-2",children:[u.jsx(Oe,{type:"target",position:ye.Left,id:"clk",className:"w-2 h-2 bg-green-400 -ml-3"}),u.jsx("span",{className:"text-[8px] text-green-400 font-mono ml-1 font-bold",children:"CLK"})]}),u.jsxs("div",{className:"relative h-3 flex items-center",children:[u.jsx(Oe,{type:"target",position:ye.Left,id:"load",className:"w-2 h-2 bg-yellow-400 -ml-3"}),u.jsx("span",{className:"text-[8px] text-yellow-400 font-mono ml-1 font-bold",children:"LOAD"})]}),u.jsxs("div",{className:"relative h-3 flex items-center",children:[u.jsx(Oe,{type:"target",position:ye.Left,id:"rst",className:"w-2 h-2 bg-red-400 -ml-3"}),u.jsx("span",{className:"text-[8px] text-red-400 font-mono ml-1 font-bold",children:"RST"})]})]}),u.jsxs("div",{className:"flex flex-col gap-1 items-end mt-4",children:[u.jsx("div",{className:"text-[8px] text-cyan-400 font-bold",children:"DATA OUT"}),[0,1,2,3,4,5,6,7].map(i=>{const l=a&1<<i?1:0;return u.jsxs("div",{className:"relative h-3 flex items-center justify-end w-full",children:[u.jsxs("span",{className:"text-[8px] text-slate-500 font-mono mr-1",children:["Q",i]}),u.jsx(Oe,{type:"source",position:ye.Right,id:`q${i}`,className:`w-2 h-2 -mr-3 ${l?"bg-cyan-400":"bg-slate-600"}`})]},`q${i}`)})]})]})]})},qT=({data:t})=>{const a=t.result||0;return u.jsxs("div",{className:"bg-slate-800 border-2 border-orange-600 rounded-md p-2 min-w-[170px] shadow-lg flex flex-col",children:[u.jsxs("div",{className:"flex items-center justify-center gap-2 mb-2 border-b border-slate-700 pb-2",children:[u.jsx(G_,{size:14,className:"text-orange-400"}),u.jsx("span",{className:"text-[10px] font-bold text-white uppercase",children:"ALU 8-bit"})]}),u.jsxs("div",{className:"bg-slate-900 rounded p-1 mb-2 text-center border border-slate-700",children:[u.jsxs("div",{className:"text-[10px] text-orange-400 font-mono",children:[t.opName||"ADD",": 0x",a.toString(16).padStart(2,"0").toUpperCase()," (",a,")"]}),u.jsxs("div",{className:"flex justify-center gap-2 mt-1",children:[u.jsx("span",{className:`text-[8px] font-mono px-1 rounded ${t.zero?"bg-yellow-500/30 text-yellow-400":"text-slate-600"}`,children:"Z"}),u.jsx("span",{className:`text-[8px] font-mono px-1 rounded ${t.carry?"bg-red-500/30 text-red-400":"text-slate-600"}`,children:"C"}),u.jsx("span",{className:`text-[8px] font-mono px-1 rounded ${t.negative?"bg-purple-500/30 text-purple-400":"text-slate-600"}`,children:"N"})]})]}),u.jsxs("div",{className:"flex justify-between",children:[u.jsxs("div",{className:"flex flex-col gap-1",children:[u.jsx("div",{className:"text-[8px] text-orange-500 font-bold",children:"A [0..7]"}),[0,1,2,3,4,5,6,7].map(i=>u.jsxs("div",{className:"relative h-3 flex items-center",children:[u.jsx(Oe,{type:"target",position:ye.Left,id:`a${i}`,className:"w-2 h-2 bg-orange-400 -ml-3"}),u.jsxs("span",{className:"text-[8px] text-slate-500 font-mono ml-1",children:["A",i]})]},`a${i}`)),u.jsx("div",{className:"text-[8px] text-blue-400 font-bold mt-1",children:"B [0..7]"}),[0,1,2,3,4,5,6,7].map(i=>u.jsxs("div",{className:"relative h-3 flex items-center",children:[u.jsx(Oe,{type:"target",position:ye.Left,id:`b${i}`,className:"w-2 h-2 bg-blue-400 -ml-3"}),u.jsxs("span",{className:"text-[8px] text-slate-500 font-mono ml-1",children:["B",i]})]},`b${i}`)),u.jsx("div",{className:"text-[8px] text-yellow-400 font-bold mt-1",children:"OP"}),[0,1,2].map(i=>u.jsxs("div",{className:"relative h-3 flex items-center",children:[u.jsx(Oe,{type:"target",position:ye.Left,id:`op${i}`,className:"w-2 h-2 bg-yellow-400 -ml-3"}),u.jsxs("span",{className:"text-[8px] text-slate-500 font-mono ml-1",children:["OP",i]})]},`op${i}`))]}),u.jsxs("div",{className:"flex flex-col gap-1 items-end mt-4",children:[u.jsx("div",{className:"text-[8px] text-orange-400 font-bold",children:"R [0..7]"}),[0,1,2,3,4,5,6,7].map(i=>{const l=a&1<<i?1:0;return u.jsxs("div",{className:"relative h-3 flex items-center justify-end w-full",children:[u.jsxs("span",{className:"text-[8px] text-slate-500 font-mono mr-1",children:["R",i]}),u.jsx(Oe,{type:"source",position:ye.Right,id:`r${i}`,className:`w-2 h-2 -mr-3 ${l?"bg-orange-400":"bg-slate-600"}`})]},`r${i}`)}),u.jsx("div",{className:"text-[8px] text-slate-300 font-bold mt-1",children:"FLAGS"}),u.jsxs("div",{className:"relative h-3 flex items-center justify-end w-full",children:[u.jsx("span",{className:"text-[8px] text-yellow-400 font-mono mr-1",children:"ZERO"}),u.jsx(Oe,{type:"source",position:ye.Right,id:"zero",className:`w-2 h-2 -mr-3 ${t.zero?"bg-yellow-400":"bg-slate-600"}`})]}),u.jsxs("div",{className:"relative h-3 flex items-center justify-end w-full",children:[u.jsx("span",{className:"text-[8px] text-red-400 font-mono mr-1",children:"CARRY"}),u.jsx(Oe,{type:"source",position:ye.Right,id:"carry",className:`w-2 h-2 -mr-3 ${t.carry?"bg-red-400":"bg-slate-600"}`})]}),u.jsxs("div",{className:"relative h-3 flex items-center justify-end w-full",children:[u.jsx("span",{className:"text-[8px] text-purple-400 font-mono mr-1",children:"NEG"}),u.jsx(Oe,{type:"source",position:ye.Right,id:"neg",className:`w-2 h-2 -mr-3 ${t.negative?"bg-purple-400":"bg-slate-600"}`})]})]})]})]})},VT=({data:t})=>{const a=t.outVal||0,i=t.sel||0;return u.jsxs("div",{className:"bg-slate-800 border-2 border-indigo-600 rounded-md p-2 min-w-[160px] shadow-lg flex flex-col",children:[u.jsxs("div",{className:"flex items-center justify-center gap-2 mb-2 border-b border-slate-700 pb-2",children:[u.jsx(F_,{size:14,className:"text-indigo-400"}),u.jsx("span",{className:"text-[10px] font-bold text-white uppercase",children:t.label||"MUX 8-bit"})]}),u.jsxs("div",{className:"bg-slate-900 rounded p-1 mb-2 text-center border border-slate-700",children:[u.jsxs("div",{className:"text-[10px] text-indigo-400 font-mono",children:["SEL=",i," → ",i?"B":"A"]}),u.jsxs("div",{className:"text-[10px] text-indigo-300 font-mono",children:["OUT: 0x",a.toString(16).padStart(2,"0").toUpperCase()," (",a,")"]})]}),u.jsxs("div",{className:"flex justify-between",children:[u.jsxs("div",{className:"flex flex-col gap-1",children:[u.jsxs("div",{className:"relative h-3 flex items-center",children:[u.jsx(Oe,{type:"target",position:ye.Left,id:"sel",className:"w-2 h-2 bg-yellow-400 -ml-3"}),u.jsx("span",{className:"text-[8px] text-yellow-400 font-mono ml-1 font-bold",children:"SEL"})]}),u.jsx("div",{className:"text-[8px] text-teal-500 font-bold mt-1",children:"A [0..7]"}),[0,1,2,3,4,5,6,7].map(l=>u.jsxs("div",{className:"relative h-3 flex items-center",children:[u.jsx(Oe,{type:"target",position:ye.Left,id:`a${l}`,className:`w-2 h-2 -ml-3 ${i?"bg-slate-600":"bg-teal-400"}`}),u.jsxs("span",{className:"text-[8px] text-slate-500 font-mono ml-1",children:["A",l]})]},`a${l}`)),u.jsx("div",{className:"text-[8px] text-pink-400 font-bold mt-1",children:"B [0..7]"}),[0,1,2,3,4,5,6,7].map(l=>u.jsxs("div",{className:"relative h-3 flex items-center",children:[u.jsx(Oe,{type:"target",position:ye.Left,id:`b${l}`,className:`w-2 h-2 -ml-3 ${i?"bg-pink-400":"bg-slate-600"}`}),u.jsxs("span",{className:"text-[8px] text-slate-500 font-mono ml-1",children:["B",l]})]},`b${l}`))]}),u.jsxs("div",{className:"flex flex-col gap-1 items-end mt-6",children:[u.jsx("div",{className:"text-[8px] text-indigo-400 font-bold",children:"OUT [0..7]"}),[0,1,2,3,4,5,6,7].map(l=>{const o=a&1<<l?1:0;return u.jsxs("div",{className:"relative h-3 flex items-center justify-end w-full",children:[u.jsxs("span",{className:"text-[8px] text-slate-500 font-mono mr-1",children:["O",l]}),u.jsx(Oe,{type:"source",position:ye.Right,id:`out${l}`,className:`w-2 h-2 -mr-3 ${o?"bg-indigo-400":"bg-slate-600"}`})]},`out${l}`)})]})]})]})},ZT=({id:t,data:a})=>{const{messages:i}=Ot(),l=i.software.prompts,o=a.text||"",c=a.lastChar||0,d=a.inputBufferSize||0,[m,x]=z.useState("");return u.jsxs("div",{className:"bg-slate-800 border-2 border-emerald-600 rounded-md p-2 min-w-[240px] shadow-lg flex flex-col",children:[u.jsxs("div",{className:"flex items-center justify-center gap-2 mb-2 border-b border-slate-700 pb-2",children:[u.jsx(wf,{size:14,className:"text-emerald-400"}),u.jsx("span",{className:"text-[10px] font-bold text-white uppercase",children:a.label||"CONSOLE"})]}),u.jsx("div",{className:"bg-black rounded p-2 mb-2 border border-slate-700 min-h-[60px] max-h-[120px] overflow-y-auto",children:u.jsx("pre",{className:"text-[10px] text-emerald-400 font-mono whitespace-pre-wrap break-all leading-tight",children:o||u.jsx("span",{className:"text-slate-600",children:"_"})})}),u.jsxs("div",{className:"flex items-center gap-1 mb-2",children:[u.jsx("span",{className:"text-emerald-400 text-[8px] font-mono font-bold",children:">"}),u.jsx("input",{type:"text",value:m,onChange:h=>x(h.target.value),onKeyDown:h=>{h.key==="Enter"&&(h.preventDefault(),m&&(window.dispatchEvent(new CustomEvent("console-input",{detail:{text:m,nodeId:t}})),x(""))),h.stopPropagation()},className:"flex-1 bg-black text-emerald-400 text-[9px] font-mono px-1 py-0.5 border border-slate-700 rounded outline-none focus:border-emerald-500 min-w-0",placeholder:l.consolePlaceholder})]}),u.jsxs("div",{className:"bg-slate-900 rounded p-1 mb-2 text-center border border-slate-700",children:[u.jsxs("div",{className:"text-[8px] text-slate-400 font-mono",children:[l.lastByte,": 0x",c.toString(16).padStart(2,"0").toUpperCase(),c>=32&&c<127?` '${String.fromCharCode(c)}'`:""]}),u.jsxs("div",{className:"flex justify-center gap-3",children:[u.jsxs("span",{className:"text-[8px] text-emerald-400 font-mono",children:[o.length," ",l.chars]}),u.jsxs("span",{className:"text-[8px] text-orange-400 font-mono",children:[l.inputBufferShort,": ",d]})]})]}),u.jsxs("div",{className:"flex justify-between",children:[u.jsxs("div",{className:"flex flex-col gap-1",children:[u.jsx("div",{className:"text-[8px] text-blue-400 font-bold",children:"DATA IN"}),[0,1,2,3,4,5,6,7].map(h=>u.jsxs("div",{className:"relative h-3 flex items-center",children:[u.jsx(Oe,{type:"target",position:ye.Left,id:`d${h}`,className:"w-2 h-2 bg-blue-400 -ml-3"}),u.jsxs("span",{className:"text-[8px] text-slate-500 font-mono ml-1",children:["D",h]})]},`d${h}`)),u.jsxs("div",{className:"relative h-3 flex items-center mt-2",children:[u.jsx(Oe,{type:"target",position:ye.Left,id:"wr",className:"w-2 h-2 bg-emerald-400 -ml-3"}),u.jsx("span",{className:"text-[8px] text-emerald-400 font-mono ml-1 font-bold",children:"WR"})]}),u.jsxs("div",{className:"relative h-3 flex items-center",children:[u.jsx(Oe,{type:"target",position:ye.Left,id:"mode",className:"w-2 h-2 bg-yellow-400 -ml-3"}),u.jsx("span",{className:"text-[8px] text-yellow-400 font-mono ml-1 font-bold",children:"MODE"})]}),u.jsxs("div",{className:"relative h-3 flex items-center",children:[u.jsx(Oe,{type:"target",position:ye.Left,id:"clr",className:"w-2 h-2 bg-red-400 -ml-3"}),u.jsx("span",{className:"text-[8px] text-red-400 font-mono ml-1 font-bold",children:"CLR"})]})]}),u.jsxs("div",{className:"flex flex-col gap-1 items-end",children:[u.jsx("div",{className:"text-[8px] text-orange-400 font-bold",children:"DATA OUT"}),[0,1,2,3,4,5,6,7].map(h=>u.jsxs("div",{className:"relative h-3 flex items-center",children:[u.jsxs("span",{className:"text-[8px] text-slate-500 font-mono mr-1",children:["Q",h]}),u.jsx(Oe,{type:"source",position:ye.Right,id:`q${h}`,className:"w-2 h-2 bg-orange-400 -mr-3"})]},`q${h}`)),u.jsxs("div",{className:"relative h-3 flex items-center mt-2",children:[u.jsx("span",{className:"text-[8px] text-cyan-400 font-mono mr-1 font-bold",children:"AVAIL"}),u.jsx(Oe,{type:"source",position:ye.Right,id:"avail",className:"w-2 h-2 bg-cyan-400 -mr-3"})]}),u.jsxs("div",{className:"relative h-3 flex items-center",children:[u.jsx("span",{className:"text-[8px] text-yellow-400 font-mono mr-1 font-bold",children:"RD"}),u.jsx(Oe,{type:"target",position:ye.Right,id:"rd",className:"w-2 h-2 bg-yellow-400 -mr-3"})]})]})]})]})},dn={r:34,g:211,b:238};function G0(t,a){return(a&255)<<8|t&255}function Y0(t,a,i){return(t&255)<<16|(a&255)<<8|i&255}function Df(t){return{r:t>>16&255,g:t>>8&255,b:t&255}}function ab(t){return Array.from(t.entries(),([a,i])=>{const{r:l,g:o,b:c}=Df(i);return{x:a&255,y:a>>8&255,r:l,g:o,b:c}})}const kx=128,ac=256,GT=({id:t,data:a})=>{const{messages:i}=Ot(),l=i.software.prompts,o=z.useRef(null),c=SS(),d=z.useMemo(()=>a.pixels||[],[a.pixels]),m=a.currentColor||dn,x=d.length;return z.useEffect(()=>{c(t)},[t,c]),z.useEffect(()=>{const h=o.current;if(!h)return;const b=h.getContext("2d");if(b){b.fillStyle="#000000",b.fillRect(0,0,ac,ac);for(const g of d){const{x:v,y:L,r:w,g:N,b:T}=g;b.fillStyle=`rgb(${w}, ${N}, ${T})`,b.fillRect(v,L,1,1)}}},[d]),u.jsxs("div",{className:"bg-slate-800 border-2 border-cyan-600 rounded-md p-2 min-w-[180px] shadow-lg flex flex-col",children:[u.jsxs("div",{className:"flex items-center justify-center gap-2 mb-2 border-b border-slate-700 pb-2",children:[u.jsx(yf,{size:14,className:"text-cyan-400"}),u.jsx("span",{className:"text-[10px] font-bold text-white uppercase",children:a.label||"PLOTTER"})]}),u.jsx("div",{className:"flex justify-center mb-2",children:u.jsx("canvas",{ref:o,width:ac,height:ac,className:"border border-slate-700 rounded",style:{width:kx,height:kx,imageRendering:"pixelated"}})}),u.jsxs("div",{className:"bg-slate-900 rounded p-1 mb-2 text-center border border-slate-700",children:[u.jsxs("div",{className:"text-[8px] text-cyan-400 font-mono",children:[x," ",l.pixels]}),u.jsxs("div",{className:"flex items-center justify-center gap-1 mt-1",children:[u.jsxs("span",{className:"text-[8px] text-slate-500 font-mono",children:["rgb(",m.r,",",m.g,",",m.b,")"]}),u.jsx("span",{className:"w-2.5 h-2.5 rounded-sm border border-slate-600",style:{backgroundColor:`rgb(${m.r}, ${m.g}, ${m.b})`}})]})]}),u.jsx("div",{className:"flex justify-between",children:u.jsxs("div",{className:"flex flex-col gap-1",children:[[["R","red","text-red-400","bg-red-400"],["G","green","text-green-400","bg-green-400"],["B","blue","text-blue-400","bg-blue-400"]].map(([h,b,g,v])=>u.jsxs("div",{className:"flex flex-col gap-1",children:[u.jsxs("div",{className:`text-[8px] font-bold ${g}`,children:[h," [0..7]"]}),[0,1,2,3,4,5,6,7].map(L=>u.jsxs("div",{className:"relative h-3 flex items-center",children:[u.jsx(Oe,{type:"target",position:ye.Left,id:`${h.toLowerCase()}${L}`,className:`w-2 h-2 -ml-3 ${v}`}),u.jsxs("span",{className:"text-[8px] text-slate-500 font-mono ml-1",children:[h,L]})]},`${b}${L}`))]},b)),u.jsx("div",{className:"text-[8px] text-teal-400 font-bold",children:"X [0..7]"}),[0,1,2,3,4,5,6,7].map(h=>u.jsxs("div",{className:"relative h-3 flex items-center",children:[u.jsx(Oe,{type:"target",position:ye.Left,id:`x${h}`,className:"w-2 h-2 bg-teal-400 -ml-3"}),u.jsxs("span",{className:"text-[8px] text-slate-500 font-mono ml-1",children:["X",h]})]},`x${h}`)),u.jsx("div",{className:"text-[8px] text-pink-400 font-bold mt-1",children:"Y [0..7]"}),[0,1,2,3,4,5,6,7].map(h=>u.jsxs("div",{className:"relative h-3 flex items-center",children:[u.jsx(Oe,{type:"target",position:ye.Left,id:`y${h}`,className:"w-2 h-2 bg-pink-400 -ml-3"}),u.jsxs("span",{className:"text-[8px] text-slate-500 font-mono ml-1",children:["Y",h]})]},`y${h}`)),u.jsxs("div",{className:"relative h-3 flex items-center mt-2",children:[u.jsx(Oe,{type:"target",position:ye.Left,id:"draw",className:"w-2 h-2 bg-cyan-400 -ml-3"}),u.jsx("span",{className:"text-[8px] text-cyan-400 font-mono ml-1 font-bold",children:"DRAW"})]}),u.jsxs("div",{className:"relative h-3 flex items-center",children:[u.jsx(Oe,{type:"target",position:ye.Left,id:"clr",className:"w-2 h-2 bg-red-400 -ml-3"}),u.jsx("span",{className:"text-[8px] text-red-400 font-mono ml-1 font-bold",children:"CLR"})]})]})})]})},ic=["←","→","↑","↓","↵"],YT=["LEFT","RIGHT","UP","DOWN","ENTER"],XT=({id:t,data:a})=>{const i=a.keys||[0,0,0,0,0],l=z.useCallback(c=>{let d=-1;c.key==="ArrowLeft"?d=0:c.key==="ArrowRight"?d=1:c.key==="ArrowUp"?d=2:c.key==="ArrowDown"?d=3:c.key==="Enter"&&(d=4),d>=0&&(c.preventDefault(),window.dispatchEvent(new CustomEvent("keyboard-state",{detail:{index:d,value:1,nodeId:t}})))},[t]),o=z.useCallback(c=>{let d=-1;c.key==="ArrowLeft"?d=0:c.key==="ArrowRight"?d=1:c.key==="ArrowUp"?d=2:c.key==="ArrowDown"?d=3:c.key==="Enter"&&(d=4),d>=0&&window.dispatchEvent(new CustomEvent("keyboard-state",{detail:{index:d,value:0,nodeId:t}}))},[t]);return z.useEffect(()=>(window.addEventListener("keydown",l),window.addEventListener("keyup",o),()=>{window.removeEventListener("keydown",l),window.removeEventListener("keyup",o)}),[l,o]),u.jsxs("div",{className:"bg-slate-800 border-2 border-violet-600 rounded-md p-2 min-w-[180px] shadow-lg flex flex-col",children:[u.jsxs("div",{className:"flex items-center justify-center gap-2 mb-2 border-b border-slate-700 pb-2",children:[u.jsx(vf,{size:14,className:"text-violet-400"}),u.jsx("span",{className:"text-[10px] font-bold text-white uppercase",children:a.label||"KEYBOARD"})]}),u.jsxs("div",{className:"flex flex-col items-center gap-1 mb-2",children:[u.jsx("div",{className:`w-8 h-6 rounded text-center text-[12px] font-bold leading-6 border ${i[2]?"bg-violet-500 text-white border-violet-400":"bg-slate-700 text-slate-400 border-slate-600"}`,children:ic[2]}),u.jsxs("div",{className:"flex gap-1",children:[u.jsx("div",{className:`w-8 h-6 rounded text-center text-[12px] font-bold leading-6 border ${i[0]?"bg-violet-500 text-white border-violet-400":"bg-slate-700 text-slate-400 border-slate-600"}`,children:ic[0]}),u.jsx("div",{className:`w-8 h-6 rounded text-center text-[12px] font-bold leading-6 border ${i[3]?"bg-violet-500 text-white border-violet-400":"bg-slate-700 text-slate-400 border-slate-600"}`,children:ic[3]}),u.jsx("div",{className:`w-8 h-6 rounded text-center text-[12px] font-bold leading-6 border ${i[1]?"bg-violet-500 text-white border-violet-400":"bg-slate-700 text-slate-400 border-slate-600"}`,children:ic[1]})]}),u.jsx("div",{className:`w-[104px] h-6 rounded text-center text-[10px] font-bold leading-6 border ${i[4]?"bg-violet-500 text-white border-violet-400":"bg-slate-700 text-slate-400 border-slate-600"}`,children:"ENTER"})]}),u.jsxs("div",{className:"flex flex-col gap-1 items-end",children:[u.jsx("div",{className:"text-[8px] text-orange-400 font-bold",children:"KEY OUT"}),YT.map((c,d)=>u.jsxs("div",{className:"relative h-3 flex items-center",children:[u.jsxs("span",{className:`text-[8px] font-mono mr-1 font-bold ${i[d]?"text-violet-400":"text-slate-500"}`,children:["K",d," ",c]}),u.jsx(Oe,{type:"source",position:ye.Right,id:`k${d}`,className:"w-2 h-2 bg-orange-400 -mr-3"})]},`k${d}`)),u.jsxs("div",{className:"relative h-3 flex items-center mt-1",children:[u.jsx("span",{className:"text-[8px] text-yellow-400 font-mono mr-1 font-bold",children:"RD"}),u.jsx(Oe,{type:"target",position:ye.Right,id:"rd",className:"w-2 h-2 bg-yellow-400 -mr-3"})]})]})]})},pn=8192,pa=4096,Wn=8191,ba=65536,mn=256,Ox=ba/mn,U={NOP:0,HLT:15,INC:1,DEC:2,NOT:3,SHL:4,SHR:5,TAB:6,TBA:7,ADDB:8,SUBB:9,INA:10,GETKEY:11,RAND:12,SLEEP:13,ANDB:19,ORB:20,XORB:21,CMPB:22,MULB:23,DIVB:24,MODB:25,COLR:26,COLG:27,COLB:28,HTTPIN:29,CLCON:30,RET:16,PUSH:17,POP:18,OUTA:32,OUTD:33,DRAW:34,CLR:35,DRVRD:36,DRVWR:37,DRVCLR:38,DRVPG:39,LDA:128,LDB:129,ADD:130,SUB:131,AND:132,OR:133,XOR:134,CMP:135,STA:144,LDM:145,STB:146,LBM:147,LDAI:148,STAI:149,HTTPGET:150,HTTPPOST:151,JMP:160,JZ:161,JNZ:162,JC:163,JNC:164,JN:165,CALL:176,OUT:192},lr={[U.NOP]:{mnemonic:"NOP",size:1,description:"No operation"},[U.HLT]:{mnemonic:"HLT",size:1,description:"Halt execution"},[U.INC]:{mnemonic:"INC",size:1,description:"A ← A + 1"},[U.DEC]:{mnemonic:"DEC",size:1,description:"A ← A - 1"},[U.NOT]:{mnemonic:"NOT",size:1,description:"A ← ~A"},[U.SHL]:{mnemonic:"SHL",size:1,description:"A ← A << 1"},[U.SHR]:{mnemonic:"SHR",size:1,description:"A ← A >> 1"},[U.TAB]:{mnemonic:"TAB",size:1,description:"B ← A"},[U.TBA]:{mnemonic:"TBA",size:1,description:"A ← B"},[U.ADDB]:{mnemonic:"ADDB",size:1,description:"A ← A + B"},[U.SUBB]:{mnemonic:"SUBB",size:1,description:"A ← A - B"},[U.INA]:{mnemonic:"INA",size:1,description:"A ← console input (0 if empty)"},[U.GETKEY]:{mnemonic:"GETKEY",size:1,description:"A ← key state (key index in A)"},[U.RAND]:{mnemonic:"RAND",size:1,description:"A ← random 8-bit (LFSR)"},[U.SLEEP]:{mnemonic:"SLEEP",size:1,description:"Sleep for A cycles"},[U.ANDB]:{mnemonic:"ANDB",size:1,description:"A ← A & B"},[U.ORB]:{mnemonic:"ORB",size:1,description:"A ← A | B"},[U.XORB]:{mnemonic:"XORB",size:1,description:"A ← A ^ B"},[U.CMPB]:{mnemonic:"CMPB",size:1,description:"flags ← A - B (no store)"},[U.MULB]:{mnemonic:"MULB",size:1,description:"A ← A * B"},[U.DIVB]:{mnemonic:"DIVB",size:1,description:"A ← A / B"},[U.MODB]:{mnemonic:"MODB",size:1,description:"A ← A % B"},[U.COLR]:{mnemonic:"COLR",size:1,description:"plotter color red ← A"},[U.COLG]:{mnemonic:"COLG",size:1,description:"plotter color green ← A"},[U.COLB]:{mnemonic:"COLB",size:1,description:"plotter color blue ← A"},[U.HTTPIN]:{mnemonic:"HTTPIN",size:1,description:"A ← next HTTP response byte, C=1 while waiting"},[U.CLCON]:{mnemonic:"CLCON",size:1,description:"Clear console output"},[U.RET]:{mnemonic:"RET",size:1,description:"PC ← pop"},[U.PUSH]:{mnemonic:"PUSH",size:1,description:"push A"},[U.POP]:{mnemonic:"POP",size:1,description:"A ← pop"},[U.OUTA]:{mnemonic:"OUTA",size:1,description:"Output A as ASCII char"},[U.OUTD]:{mnemonic:"OUTD",size:1,description:"Output A as decimal number"},[U.DRAW]:{mnemonic:"DRAW",size:1,description:"Plot pixel at (A, B)"},[U.CLR]:{mnemonic:"CLR",size:1,description:"Clear plotter"},[U.DRVRD]:{mnemonic:"DRVRD",size:1,description:"A ← external drive[(page<<8)|A]"},[U.DRVWR]:{mnemonic:"DRVWR",size:1,description:"external drive[(page<<8)|A] ← B"},[U.DRVCLR]:{mnemonic:"DRVCLR",size:1,description:"Clear external drive"},[U.DRVPG]:{mnemonic:"DRVPG",size:1,description:"drive page ← A"},[U.LDA]:{mnemonic:"LDA",size:3,description:"A ← imm"},[U.LDB]:{mnemonic:"LDB",size:3,description:"B ← imm"},[U.ADD]:{mnemonic:"ADD",size:3,description:"A ← A + imm"},[U.SUB]:{mnemonic:"SUB",size:3,description:"A ← A - imm"},[U.AND]:{mnemonic:"AND",size:3,description:"A ← A & imm"},[U.OR]:{mnemonic:"OR",size:3,description:"A ← A | imm"},[U.XOR]:{mnemonic:"XOR",size:3,description:"A ← A ^ imm"},[U.CMP]:{mnemonic:"CMP",size:3,description:"flags ← A - imm (no store)"},[U.STA]:{mnemonic:"STA",size:3,description:"MEM[addr] ← A"},[U.LDM]:{mnemonic:"LDM",size:3,description:"A ← MEM[addr]"},[U.STB]:{mnemonic:"STB",size:3,description:"MEM[addr] ← B"},[U.LBM]:{mnemonic:"LBM",size:3,description:"B ← MEM[addr]"},[U.LDAI]:{mnemonic:"LDAI",size:3,description:"A ← MEM[addr + A]"},[U.STAI]:{mnemonic:"STAI",size:3,description:"MEM[addr + B] ← A"},[U.HTTPGET]:{mnemonic:"HTTPGET",size:3,description:"Start HTTP GET using zero-terminated URL at addr"},[U.HTTPPOST]:{mnemonic:"HTTPPOST",size:3,description:'Start HTTP POST using "url\\0body\\0" data at addr'},[U.JMP]:{mnemonic:"JMP",size:3,description:"PC ← addr"},[U.JZ]:{mnemonic:"JZ",size:3,description:"if Z: PC ← addr"},[U.JNZ]:{mnemonic:"JNZ",size:3,description:"if !Z: PC ← addr"},[U.JC]:{mnemonic:"JC",size:3,description:"if C: PC ← addr"},[U.JNC]:{mnemonic:"JNC",size:3,description:"if !C: PC ← addr"},[U.JN]:{mnemonic:"JN",size:3,description:"if N: PC ← addr"},[U.CALL]:{mnemonic:"CALL",size:3,description:"push PC, PC ← addr"},[U.OUT]:{mnemonic:"OUT",size:3,description:"Output imm as ASCII char"}},Sc={};for(const[t,a]of Object.entries(lr))Sc[a.mnemonic]=Number(t);function FT(t){return t>=128}function X0(){return{a:0,b:0,pc:0,sp:pn-1,flags:{z:!1,c:!1,n:!1},memory:new Uint8Array(pn),halted:!1,cycles:0}}const KT=({data:t})=>{const a=Math.ceil(Math.log2(ba)),i=t.bytes||Array(ba).fill(0),l=t.currentAddress||0,o=t.lastRead||0,c=t.lastWrite||0,d=Math.floor(l/mn),m=d*mn,x=i.slice(m,m+32).map(h=>h.toString(16).padStart(2,"0").toUpperCase()).join(" ");return u.jsxs("div",{className:"bg-slate-800 border-2 border-amber-600 rounded-md p-2 min-w-[260px] shadow-lg flex flex-col",children:[u.jsxs("div",{className:"flex items-center justify-center gap-2 mb-2 border-b border-slate-700 pb-2",children:[u.jsx(Gr,{size:14,className:"text-amber-400"}),u.jsx("span",{className:"text-[10px] font-bold text-white uppercase",children:t.label||"EXT DRIVE"})]}),u.jsxs("div",{className:"bg-black rounded p-2 mb-2 border border-slate-700",children:[u.jsxs("div",{className:"text-[8px] text-amber-400 font-mono mb-1",children:["page ",d.toString(16).padStart(2,"0").toUpperCase()," | addr"," ",l.toString(16).padStart(4,"0").toUpperCase()," | rd"," ",o.toString(16).padStart(2,"0").toUpperCase()," | wr"," ",c.toString(16).padStart(2,"0").toUpperCase()]}),u.jsxs("div",{className:"text-[8px] text-slate-500 font-mono mb-1",children:["base ",m.toString(16).padStart(4,"0").toUpperCase()]}),u.jsx("pre",{className:"text-[8px] text-slate-300 font-mono whitespace-pre-wrap break-all leading-tight",children:x})]}),u.jsxs("div",{className:"flex justify-between",children:[u.jsxs("div",{className:"flex flex-col gap-1",children:[u.jsx("div",{className:"text-[8px] text-cyan-400 font-bold",children:"ADDR"}),Array.from({length:a},(h,b)=>b).map(h=>u.jsxs("div",{className:"relative h-3 flex items-center",children:[u.jsx(Oe,{type:"target",position:ye.Left,id:`a${h}`,className:"w-2 h-2 bg-cyan-400 -ml-3"}),u.jsxs("span",{className:"text-[8px] text-slate-500 font-mono ml-1",children:["A",h]})]},`a${h}`)),u.jsx("div",{className:"text-[8px] text-blue-400 font-bold mt-2",children:"DATA IN"}),[0,1,2,3,4,5,6,7].map(h=>u.jsxs("div",{className:"relative h-3 flex items-center",children:[u.jsx(Oe,{type:"target",position:ye.Left,id:`d${h}`,className:"w-2 h-2 bg-blue-400 -ml-3"}),u.jsxs("span",{className:"text-[8px] text-slate-500 font-mono ml-1",children:["D",h]})]},`d${h}`)),[["rd","RD","text-yellow-400","bg-yellow-400"],["wr","WR","text-amber-400","bg-amber-400"],["clr","CLR","text-red-400","bg-red-400"]].map(([h,b,g,v])=>u.jsxs("div",{className:"relative h-3 flex items-center mt-1",children:[u.jsx(Oe,{type:"target",position:ye.Left,id:h,className:`w-2 h-2 -ml-3 ${v}`}),u.jsx("span",{className:`text-[8px] font-mono ml-1 font-bold ${g}`,children:b})]},h))]}),u.jsxs("div",{className:"flex flex-col gap-1 items-end",children:[u.jsx("div",{className:"text-[8px] text-green-400 font-bold",children:"DATA OUT"}),[0,1,2,3,4,5,6,7].map(h=>u.jsxs("div",{className:"relative h-3 flex items-center",children:[u.jsxs("span",{className:"text-[8px] text-slate-500 font-mono mr-1",children:["Q",h]}),u.jsx(Oe,{type:"source",position:ye.Right,id:`q${h}`,className:"w-2 h-2 bg-green-400 -mr-3"})]},`q${h}`))]})]})]})},WT=({id:t,data:a})=>{const{messages:i}=Ot(),l=i.software.prompts,o=a.url||"",c=a.body||"",d=a.method||"GET",m=a.pending===1,x=a.avail===1,h=a.lastByte||0,b=a.responseBuffer||[],g=a.responseSize||b.length||0,v=L=>{window.dispatchEvent(new CustomEvent("network-node-config",{detail:{nodeId:t,...L}}))};return u.jsxs("div",{className:"bg-slate-800 border-2 border-sky-600 rounded-md p-2 min-w-[280px] shadow-lg flex flex-col",children:[u.jsxs("div",{className:"flex items-center justify-center gap-2 mb-2 border-b border-slate-700 pb-2",children:[u.jsx(bf,{size:14,className:"text-sky-400"}),u.jsx("span",{className:"text-[10px] font-bold text-white uppercase",children:a.label||"NETWORK"})]}),u.jsxs("div",{className:"bg-slate-900 rounded p-2 mb-2 border border-slate-700",children:[u.jsxs("div",{className:"flex items-center justify-between mb-1",children:[u.jsx("span",{className:"text-[8px] text-sky-400 font-mono font-bold",children:l.networkMethod}),u.jsx("span",{className:`text-[8px] font-mono font-bold ${m?"text-amber-400":x?"text-emerald-400":"text-slate-400"}`,children:m?l.pending:x?l.ready:l.idle})]}),u.jsxs("select",{value:d,onChange:L=>v({method:L.target.value}),onClick:L=>L.stopPropagation(),className:"nodrag w-full bg-black text-sky-300 text-[9px] font-mono px-1 py-1 border border-slate-700 rounded outline-none focus:border-sky-500 mb-2",children:[u.jsx("option",{value:"GET",children:"GET"}),u.jsx("option",{value:"POST",children:"POST"})]}),u.jsx("div",{className:"text-[8px] text-slate-400 font-mono mb-1",children:l.networkUrl}),u.jsx("input",{type:"text",value:o,onChange:L=>v({url:L.target.value}),onClick:L=>L.stopPropagation(),className:"nodrag w-full bg-black text-sky-200 text-[9px] font-mono px-1 py-1 border border-slate-700 rounded outline-none focus:border-sky-500 mb-2",placeholder:"https://example.com"}),u.jsx("div",{className:"text-[8px] text-slate-400 font-mono mb-1",children:l.networkBody}),u.jsx("textarea",{value:c,onChange:L=>v({body:L.target.value}),onClick:L=>L.stopPropagation(),rows:3,className:"nodrag w-full resize-none bg-black text-sky-200 text-[9px] font-mono px-1 py-1 border border-slate-700 rounded outline-none focus:border-sky-500",placeholder:'{"hello":"world"}'})]}),u.jsxs("div",{className:"bg-slate-900 rounded p-1 mb-2 text-center border border-slate-700",children:[u.jsxs("div",{className:"text-[8px] text-slate-400 font-mono",children:[d," | resp ",g,"B | queue ",b.length,"B"]}),u.jsxs("div",{className:"flex justify-center gap-3 mt-1",children:[u.jsxs("span",{className:"text-[8px] text-orange-400 font-mono",children:[l.byte,": 0x",h.toString(16).padStart(2,"0").toUpperCase()]}),u.jsxs("span",{className:"text-[8px] text-cyan-400 font-mono",children:[l.available,": ",x?1:0]}),u.jsxs("span",{className:"text-[8px] text-amber-400 font-mono",children:[l.pendingShort,": ",m?1:0]})]})]}),u.jsxs("div",{className:"flex justify-between gap-4",children:[u.jsxs("div",{className:"flex flex-col gap-1",children:[u.jsx("div",{className:"text-[8px] text-sky-400 font-bold",children:l.control}),[["get","GET","text-sky-400","bg-sky-400"],["post","POST","text-indigo-400","bg-indigo-400"],["rd","RD","text-yellow-400","bg-yellow-400"],["clr","CLR","text-red-400","bg-red-400"]].map(([L,w,N,T])=>u.jsxs("div",{className:"relative h-3 flex items-center",children:[u.jsx(Oe,{type:"target",position:ye.Left,id:L,className:`w-2 h-2 -ml-3 ${T}`}),u.jsx("span",{className:`text-[8px] font-mono ml-1 font-bold ${N}`,children:w})]},L))]}),u.jsxs("div",{className:"flex flex-col gap-1 items-end",children:[u.jsx("div",{className:"text-[8px] text-orange-400 font-bold",children:l.dataOut}),[0,1,2,3,4,5,6,7].map(L=>u.jsxs("div",{className:"relative h-3 flex items-center",children:[u.jsxs("span",{className:"text-[8px] text-slate-500 font-mono mr-1",children:["Q",L]}),u.jsx(Oe,{type:"source",position:ye.Right,id:`q${L}`,className:"w-2 h-2 bg-orange-400 -mr-3"})]},`q${L}`)),u.jsxs("div",{className:"relative h-3 flex items-center mt-1",children:[u.jsx("span",{className:"text-[8px] text-cyan-400 font-mono mr-1 font-bold",children:"AVAIL"}),u.jsx(Oe,{type:"source",position:ye.Right,id:"avail",className:"w-2 h-2 bg-cyan-400 -mr-3"})]}),u.jsxs("div",{className:"relative h-3 flex items-center",children:[u.jsx("span",{className:"text-[8px] text-amber-400 font-mono mr-1 font-bold",children:"PEND"}),u.jsx(Oe,{type:"source",position:ye.Right,id:"pending",className:"w-2 h-2 bg-amber-400 -mr-3"})]})]})]})]})},ib={input:ST,output:NT,gate:TT,transistor:MT,adder8:BT,sram8:PT,bus8:zT,inputNumber:UT,outputNumber:$T,group:IT,clock:HT,register8:JT,alu8:qT,mux8:VT,console:ZT,plotter:GT,keyboard:XT,drive:KT,network:WT},QT=[{id:"inA",type:"input",position:{x:50,y:100},data:{label:"A",value:0}},{id:"inB",type:"input",position:{x:50,y:200},data:{label:"B",value:0}},{id:"inCin",type:"input",position:{x:50,y:300},data:{label:"Cin",value:0}},{id:"xor1",type:"gate",position:{x:250,y:150},data:{type:"XOR",value:0}},{id:"xor2",type:"gate",position:{x:450,y:200},data:{type:"XOR",value:0}},{id:"and1",type:"gate",position:{x:250,y:350},data:{type:"AND",value:0}},{id:"and2",type:"gate",position:{x:450,y:300},data:{type:"AND",value:0}},{id:"or1",type:"gate",position:{x:650,y:325},data:{type:"OR",value:0}},{id:"outSum",type:"output",position:{x:650,y:200},data:{label:"Sum",value:0}},{id:"outCout",type:"output",position:{x:850,y:325},data:{label:"Cout",value:0}}],eM=[{id:"e1",source:"inA",target:"xor1",sourceHandle:"out",targetHandle:"a",animated:!1},{id:"e2",source:"inB",target:"xor1",sourceHandle:"out",targetHandle:"b",animated:!1},{id:"e3",source:"xor1",target:"xor2",sourceHandle:"out",targetHandle:"a",animated:!1},{id:"e4",source:"inCin",target:"xor2",sourceHandle:"out",targetHandle:"b",animated:!1},{id:"e5",source:"xor2",target:"outSum",sourceHandle:"out",targetHandle:"in",animated:!1},{id:"e6",source:"inA",target:"and1",sourceHandle:"out",targetHandle:"a",animated:!1},{id:"e7",source:"inB",target:"and1",sourceHandle:"out",targetHandle:"b",animated:!1},{id:"e8",source:"xor1",target:"and2",sourceHandle:"out",targetHandle:"a",animated:!1},{id:"e9",source:"inCin",target:"and2",sourceHandle:"out",targetHandle:"b",animated:!1},{id:"e10",source:"and1",target:"or1",sourceHandle:"out",targetHandle:"a",animated:!1},{id:"e11",source:"and2",target:"or1",sourceHandle:"out",targetHandle:"b",animated:!1},{id:"e12",source:"or1",target:"outCout",sourceHandle:"out",targetHandle:"in",animated:!1}],tM=[{id:"inD",type:"input",position:{x:50,y:100},data:{label:"Data (D)",value:0}},{id:"inWE",type:"input",position:{x:50,y:250},data:{label:"Write (WE)",value:0}},{id:"not1",type:"gate",position:{x:200,y:150},data:{type:"NOT",value:0}},{id:"and1",type:"gate",position:{x:350,y:80},data:{type:"AND",value:0}},{id:"and2",type:"gate",position:{x:350,y:200},data:{type:"AND",value:0}},{id:"nor1",type:"gate",position:{x:550,y:100},data:{type:"NOR",value:0}},{id:"nor2",type:"gate",position:{x:550,y:250},data:{type:"NOR",value:0}},{id:"outQ",type:"output",position:{x:750,y:100},data:{label:"Q",value:0}}],nM=[{id:"e1",source:"inD",target:"and1",sourceHandle:"out",targetHandle:"a",animated:!1},{id:"e2",source:"inWE",target:"and1",sourceHandle:"out",targetHandle:"b",animated:!1},{id:"e3",source:"inD",target:"not1",sourceHandle:"out",targetHandle:"in",animated:!1},{id:"e4",source:"not1",target:"and2",sourceHandle:"out",targetHandle:"a",animated:!1},{id:"e5",source:"inWE",target:"and2",sourceHandle:"out",targetHandle:"b",animated:!1},{id:"e6",source:"and2",target:"nor1",sourceHandle:"out",targetHandle:"a",animated:!1},{id:"e7",source:"nor2",target:"nor1",sourceHandle:"out",targetHandle:"b",animated:!1},{id:"e8",source:"and1",target:"nor2",sourceHandle:"out",targetHandle:"a",animated:!1},{id:"e9",source:"nor1",target:"nor2",sourceHandle:"out",targetHandle:"b",animated:!1},{id:"e10",source:"nor1",target:"outQ",sourceHandle:"out",targetHandle:"in",animated:!1}],jx={AND:(t,a)=>t&a,OR:(t,a)=>t|a,XOR:(t,a)=>t^a,NAND:(t,a)=>t&a?0:1,NOR:(t,a)=>t|a?0:1,NOT:t=>t?0:1},aM=(t,a,i=0)=>{let l=i;const o=Array(8).fill(0);for(let c=0;c<8;c++){const d=t[c],m=a[c],x=d^m,h=d&m,b=x^l,g=x&l,v=h|g;o[c]=b,l=v}return{sum:o,cout:l}},rb=(t,a)=>{var i,l,o,c,d,m,x,h;if(!t)return 0;if(t.type==="input"||t.type==="gate"||t.type==="clock"||t.type==="transistor")return t.data.value||0;if(t.type==="adder8"){if(a==="cout")return t.data.cout||0;if(a!=null&&a.startsWith("s")){const b=parseInt(a.replace("s",""),10);return((i=t.data.sum)==null?void 0:i[b])||0}}if(t.type==="sram8"||t.type==="console"){if(a!=null&&a.startsWith("q")){const b=parseInt(a.replace("q",""),10);return((l=t.data.q)==null?void 0:l[b])||0}if(t.type==="console"&&a==="avail")return t.data.avail||0}if(t.type==="bus8"&&a!=null&&a.startsWith("out")){const b=parseInt(a.replace("out",""),10);return((o=t.data.val)==null?void 0:o[b])||0}if(t.type==="inputNumber"&&a!=null&&a.startsWith("out")){const b=parseInt(a.replace("out",""),10);return(t.data.value||0)&1<<b?1:0}if(t.type==="group"){const b=t.data.outputs;if(a&&b)return b[a]||0}if((t.type==="register8"||t.type==="drive")&&a!=null&&a.startsWith("q")){const b=parseInt(a.replace("q",""),10);return((c=t.data.q)==null?void 0:c[b])||0}if(t.type==="alu8"){if(a!=null&&a.startsWith("r")){const b=parseInt(a.replace("r",""),10);return((d=t.data.r)==null?void 0:d[b])||0}if(a==="zero")return t.data.zero||0;if(a==="carry")return t.data.carry||0;if(a==="neg")return t.data.negative||0}if(t.type==="mux8"&&a!=null&&a.startsWith("out")){const b=parseInt(a.replace("out",""),10);return((m=t.data.out)==null?void 0:m[b])||0}if(t.type==="keyboard"&&a!=null&&a.startsWith("k")){const b=parseInt(a.replace("k",""),10);return((x=t.data.keys)==null?void 0:x[b])||0}if(t.type==="network"){if(a!=null&&a.startsWith("q")){const b=parseInt(a.replace("q",""),10);return((h=t.data.q)==null?void 0:h[b])||0}if(a==="avail")return t.data.avail||0;if(a==="pending")return t.data.pending||0}return 0},iM=(t,a)=>{const i=a.find(l=>l.id===t.source);return rb(i,t.sourceHandle)};async function lb(t){if(typeof globalThis.fetch!="function")throw new Error("Fetch API unavailable in this environment.");const a=await globalThis.fetch(t.url,{method:t.method,headers:t.method==="POST"?{"Content-Type":"application/json; charset=UTF-8"}:void 0,body:t.method==="POST"?t.body??"":void 0}),i=await a.text(),l=`HTTP ${a.status} ${a.statusText}`.trim();return{text:i,status:a.status,ok:a.ok,statusText:a.statusText,statusLabel:l}}async function rM(t){const{text:a,ok:i,statusLabel:l}=await lb(t);return a.length>0?a:i?"":l}const Bx=(t,a,i)=>{typeof window>"u"||window.dispatchEvent(new CustomEvent("network-node-response",{detail:{nodeId:t,requestSerial:a,text:i}}))},Px=(t,a,i,l,o)=>{rM({method:i,url:l,body:o}).then(c=>{Bx(t,a,c)}).catch(c=>{const d=c instanceof Error?c.message:"Unknown network error";Bx(t,a,`HTTP ERROR: ${d}`)})},lM=(t,a,i,l)=>{const o=l.filter(c=>c.target===t&&c.targetHandle===a);return o.length===0?0:o.some(c=>iM(c,i)===1)?1:0},Cf=(t,a)=>{const i=[...t];let l=!1;const o=(c,d)=>lM(c,d,i,a);return i.forEach((c,d)=>{var m,x,h,b,g,v;if(c.type==="output"){const L=o(c.id,"in");c.data.value!==L&&(i[d]={...c,data:{...c.data,value:L}},l=!0)}else if(c.type==="gate"){const L=c.data.type;let w=0;L==="NOT"?w=jx.NOT(o(c.id,"in")):w=jx[L](o(c.id,"a"),o(c.id,"b")),c.data.value!==w&&(i[d]={...c,data:{...c.data,value:w}},l=!0)}else if(c.type==="transistor"){const L=o(c.id,"in"),w=o(c.id,"gate"),N=c.data.mode==="pmos"?w?0:1:w,T=L&&N?1:0;(c.data.value!==T||c.data.inputValue!==L||c.data.conducting!==N)&&(i[d]={...c,data:{...c.data,value:T,inputValue:L,conducting:N}},l=!0)}else if(c.type==="adder8"){const L=Array(8).fill(0).map((D,E)=>o(c.id,`a${E}`)),w=Array(8).fill(0).map((D,E)=>o(c.id,`b${E}`)),N=o(c.id,"cin"),{sum:T,cout:C}=aM(L,w,N);(T.some((D,E)=>{var _;return D!==((_=c.data.sum)==null?void 0:_[E])})||C!==c.data.cout)&&(i[d]={...c,data:{...c.data,sum:T,cout:C}},l=!0)}else if(c.type==="sram8"){const L=((m=c.data.memory)==null?void 0:m.length)||256,w=L<=256?8:10;let N=0;for(let X=0;X<w;X++)o(c.id,`a${X}`)&&(N|=1<<X);N>=L&&(N=N%L);let T=0;for(let X=0;X<8;X++)o(c.id,`d${X}`)&&(T|=1<<X);const C=o(c.id,"we"),B=c.data.memory?[...c.data.memory]:Array(L).fill(0);let D=!1;C===1&&B[N]!==T&&(B[N]=T,D=!0);const E=B[N],_=Array(8).fill(0).map((X,F)=>E&1<<F?1:0),P=((x=c.data.q)==null?void 0:x.some((X,F)=>X!==_[F]))||!c.data.q,S=c.data.currentAddress!==N;(D||P||S)&&(i[d]={...c,data:{...c.data,memory:B,q:_,currentAddress:N}},l=!0)}else if(c.type==="bus8"){const L=Array(8).fill(0).map((N,T)=>o(c.id,`in${T}`));L.some((N,T)=>{var C;return N!==((C=c.data.val)==null?void 0:C[T])})&&(i[d]={...c,data:{...c.data,val:L}},l=!0)}else if(c.type==="outputNumber"){let L=0;for(let w=0;w<8;w++)o(c.id,`in${w}`)&&(L|=1<<w);c.data.value!==L&&(i[d]={...c,data:{...c.data,value:L}},l=!0)}else if(c.type==="group"){const L=c.data,{circuit:w,inputHandles:N,outputHandles:T}=L;let C=w.nodes.map(S=>({...S,data:{...S.data}}));const B=w.edges,D=new Map;for(const S of N)D.has(S.internalNodeId)||D.set(S.internalNodeId,[]),D.get(S.internalNodeId).push({handleId:S.handleId,internalHandleId:S.internalHandleId});for(const[S,X]of D){const F=C.find($=>$.id===S);if(F){if(F.type==="input"){const $=o(c.id,X[0].handleId);C=C.map(H=>H.id===S?{...H,data:{...H.data,value:$}}:H)}else if(F.type==="inputNumber"){let $=0;for(const H of X){const te=parseInt(H.internalHandleId.replace("out",""));o(c.id,H.handleId)&&($|=1<<te)}C=C.map(H=>H.id===S?{...H,data:{...H.data,value:$}}:H)}}}const E=10;for(let S=0;S<E;S++){const X=C;if(C=Cf(C,B),C===X)break}const _={};for(const S of T){const X=C.find(F=>F.id===S.internalNodeId);if(!X){_[S.handleId]=0;continue}if(X.type==="output")_[S.handleId]=X.data.value||0;else if(X.type==="outputNumber"){const F=X.data.value||0,$=parseInt(S.internalHandleId.replace("in",""));_[S.handleId]=F&1<<$?1:0}}Object.keys(_).some(S=>_[S]!==L.outputs[S])&&(i[d]={...c,data:{...L,outputs:_,circuit:{nodes:C,edges:B}}},l=!0)}else if(c.type==="clock"){const L=c.data.frequency||1,w=Math.max(1,Math.round(20/(2*L)));let N=(c.data.tickCounter||0)+1,T=c.data.value||0;N>=w&&(T=T?0:1,N=0),(N!==c.data.tickCounter||T!==c.data.value)&&(i[d]={...c,data:{...c.data,value:T,tickCounter:N}},l=!0)}else if(c.type==="register8"){const L=o(c.id,"clk"),w=c.data.prevClk||0,N=o(c.id,"rst"),T=o(c.id,"load");let C=c.data.value||0;if(w===0&&L===1){if(N===1)C=0;else if(T===1){C=0;for(let P=0;P<8;P++)o(c.id,`d${P}`)&&(C|=1<<P)}}const B=Array(8).fill(0).map((P,S)=>C&1<<S?1:0),D=((h=c.data.q)==null?void 0:h.some((P,S)=>P!==B[S]))||!c.data.q,E=c.data.value!==C,_=c.data.prevClk!==L;(D||E||_)&&(i[d]={...c,data:{...c.data,value:C,q:B,prevClk:L}},l=!0)}else if(c.type==="mux8"){const L=o(c.id,"sel"),w=L?"b":"a",N=Array(8).fill(0).map((B,D)=>o(c.id,`${w}${D}`));let T=0;for(let B=0;B<8;B++)N[B]&&(T|=1<<B);(((b=c.data.out)==null?void 0:b.some((B,D)=>B!==N[D]))||!c.data.out||c.data.sel!==L||c.data.outVal!==T)&&(i[d]={...c,data:{...c.data,sel:L,outVal:T,out:N}},l=!0)}else if(c.type==="console"){let L=0;for(let H=0;H<8;H++)o(c.id,`d${H}`)&&(L|=1<<H);const w=o(c.id,"wr"),N=c.data.prevWr||0,T=o(c.id,"mode"),C=o(c.id,"clr");let B=c.data.text||"",D=c.data.lastChar||0,E=!1;C===1?B.length>0&&(B="",D=0,E=!0):N===0&&w===1&&(D=L,T===0?B+=String.fromCharCode(L):B+=L.toString(),E=!0);const _=o(c.id,"rd"),P=c.data.prevRd||0;let S=c.data.inputBuffer||[],X=c.data.q||Array(8).fill(0),F=S.length>0?1:0,$=!1;if(P===0&&_===1&&S.length>0){S=[...S];const H=S.shift();X=Array.from({length:8},(te,oe)=>H&1<<oe?1:0),F=S.length>0?1:0,$=!0}(E||$||c.data.prevWr!==w||c.data.prevRd!==_||c.data.avail!==F)&&(i[d]={...c,data:{...c.data,text:B,lastChar:D,prevWr:w,prevRd:_,inputBuffer:S,q:X,avail:F,inputBufferSize:S.length}},l=!0)}else if(c.type==="plotter"){const L=F=>{let $=0;for(let H=0;H<8;H++)o(c.id,`${F}${H}`)&&($|=1<<H);return $&255},w=F=>a.some($=>{var H;return $.target===c.id&&((H=$.targetHandle)==null?void 0:H.startsWith(F))}),N=L("x"),T=L("y"),C=o(c.id,"draw"),B=c.data.prevDraw||0,D=o(c.id,"clr"),E=c.data.currentColor||dn,_=c.data.colorSource!=="cpu",P={r:_&&w("r")?L("r"):E.r,g:_&&w("g")?L("g"):E.g,b:_&&w("b")?L("b"):E.b};let S=c.data.pixels||[],X=!1;if(D===1)S.length>0&&(S=[],X=!0);else if(B===0&&C===1){const F=G0(N,T),$=S.findIndex(te=>G0(te.x,te.y)===F),H={x:N,y:T,...P};if($===-1)S=[...S,H],X=!0;else{const te=S[$],oe=Y0(te.r,te.g,te.b),I=Y0(H.r,H.g,H.b);oe!==I&&(S=[...S],S[$]=H,X=!0)}}(X||c.data.prevDraw!==C||E.r!==P.r||E.g!==P.g||E.b!==P.b)&&(i[d]={...c,data:{...c.data,pixels:S,prevDraw:C,currentColor:P}},l=!0)}else if(c.type==="network"){const L=o(c.id,"get"),w=o(c.id,"post"),N=o(c.id,"rd"),T=o(c.id,"clr"),C=c.data.prevGet||0,B=c.data.prevPost||0,D=c.data.prevRd||0;let E=c.data.q||Array(8).fill(0),_=c.data.avail||0,P=c.data.pending||0,S=c.data.responseBuffer||[],X=c.data.requestSerial||0,F=c.data.responseSize||S.length,$=c.data.lastByte||0;const H=(c.data.url||"").trim(),te=c.data.body||"";let oe=c.data.method||"GET",I=!1;if(T===1?(S.length>0||P===1||_===1||$!==0||F!==0)&&(X+=1,S=[],E=Array(8).fill(0),_=0,P=0,F=0,$=0,I=!0):C===0&&L===1&&H.length>0?(X+=1,S=[],E=Array(8).fill(0),_=0,P=1,F=0,$=0,oe="GET",Px(c.id,X,"GET",H),I=!0):B===0&&w===1&&H.length>0&&(X+=1,S=[],E=Array(8).fill(0),_=0,P=1,F=0,$=0,oe="POST",Px(c.id,X,"POST",H,te),I=!0),D===0&&N===1&&S.length>0){const J=S[0]&255;S=S.slice(1),E=Array.from({length:8},(R,Z)=>J>>Z&1),$=J,_=S.length>0?1:0,I=!0}(I||c.data.prevGet!==L||c.data.prevPost!==w||c.data.prevRd!==N)&&(i[d]={...c,data:{...c.data,method:oe,q:E,avail:_,pending:P,responseBuffer:S,requestSerial:X,responseSize:F,lastByte:$,prevGet:L,prevPost:w,prevRd:N}},l=!0)}else if(c.type==="drive"){const L=((g=c.data.bytes)==null?void 0:g.length)||256,w=Math.max(8,Math.ceil(Math.log2(L)));let N=0;for(let H=0;H<w;H++)o(c.id,`a${H}`)&&(N|=1<<H);N>=L&&(N=N%L);let T=0;for(let H=0;H<8;H++)o(c.id,`d${H}`)&&(T|=1<<H);const C=o(c.id,"rd"),B=o(c.id,"wr"),D=o(c.id,"clr"),E=c.data.prevRd||0,_=c.data.prevWr||0;let P=c.data.bytes?[...c.data.bytes]:Array(L).fill(0),S=c.data.q||Array(8).fill(0),X=c.data.lastRead||0,F=c.data.lastWrite||0,$=!1;D===1?P.some(H=>H!==0)&&(P=Array(L).fill(0),S=Array(8).fill(0),X=0,F=0,$=!0):(_===0&&B===1&&(P[N]!==T&&(P[N]=T,$=!0),F=T),E===0&&C===1&&(X=P[N]||0,S=Array.from({length:8},(H,te)=>X&1<<te?1:0),$=!0)),($||c.data.prevRd!==C||c.data.prevWr!==B||c.data.currentAddress!==N)&&(i[d]={...c,data:{...c.data,bytes:P,q:S,prevRd:C,prevWr:B,currentAddress:N,lastRead:X,lastWrite:F}},l=!0)}else if(c.type==="alu8"){let L=0;for(let S=0;S<8;S++)o(c.id,`a${S}`)&&(L|=1<<S);let w=0;for(let S=0;S<8;S++)o(c.id,`b${S}`)&&(w|=1<<S);let N=0;for(let S=0;S<3;S++)o(c.id,`op${S}`)&&(N|=1<<S);let T=0,C=0,B="ADD";switch(N){case 0:{B="ADD";const S=L+w;T=S&255,C=S>255?1:0;break}case 1:{B="SUB";const S=L-w;T=S&255,C=S<0?1:0;break}case 2:B="AND",T=L&w&255;break;case 3:B="OR",T=(L|w)&255;break;case 4:B="XOR",T=(L^w)&255;break;case 5:B="NOT",T=~L&255;break;case 6:B="SHL",C=L&128?1:0,T=L<<1&255;break;case 7:B="SHR",C=L&1?1:0,T=L>>1&255;break}const D=T===0?1:0,E=T&128?1:0,_=Array(8).fill(0).map((S,X)=>T&1<<X?1:0);(((v=c.data.r)==null?void 0:v.some((S,X)=>S!==_[X]))||!c.data.r||c.data.zero!==D||c.data.carry!==C||c.data.negative!==E||c.data.opName!==B)&&(i[d]={...c,data:{...c.data,a:L,b:w,result:T,r:_,zero:D,carry:C,negative:E,opName:B}},l=!0)}}),l?i:t},sb=(t,a)=>{let i=!1;const l=a.map(o=>{var m;const c=rb(t.find(x=>x.id===o.source),o.sourceHandle)===1,d=c?"#60a5fa":"#475569";return o.animated!==c||((m=o.style)==null?void 0:m.stroke)!==d?(i=!0,{...o,animated:c,style:{...o.style,stroke:d,strokeWidth:c?3:2}}):o});return i?l:a},sM=({type:t,onClose:a,mainNodes:i})=>{const{initNodes:l,initEdges:o,headerIcon:c,headerText:d,footerText:m}=z.useMemo(()=>{if(t==="adder8")return{initNodes:QT,initEdges:eM,headerIcon:"adder",headerText:"Circuit Interne : Full Adder (1-bit)",footerText:"Un additionneur 8-bit est composé de 8 blocs comme celui-ci (Full Adder) chaînés ensemble. La retenue sortante (Cout) de l'un est connectée à la retenue entrante (Cin) du suivant."};if(t==="sram8")return{initNodes:tM,initEdges:nM,headerIcon:"sram",headerText:"Circuit Interne : Cellule SRAM (D-Latch 1-bit)",footerText:"Une mémoire SRAM 256x8 contient 2048 cellules comme celle-ci (D-Latch), organisées en grille. Un décodeur d'adresse active le signal WE (Write Enable) uniquement pour les 8 cellules correspondant à l'adresse sélectionnée."};if(t.startsWith("group:")&&i){const w=t.replace("group:",""),N=i.find(T=>T.id===w&&T.type==="group");if(N){const T=N.data;return{initNodes:T.circuit.nodes,initEdges:T.circuit.edges,headerIcon:"group",headerText:`Circuit Interne : ${T.label}`,footerText:"Ce module personnalisé contient un circuit interne simulé. Les noeuds Input/Output définissent les ports du module."}}}return{initNodes:[],initEdges:[],headerIcon:"group",headerText:"Circuit Interne",footerText:""}},[t,i]),[x,h,b]=U_(l),[g,v,L]=$_(o);return z.useEffect(()=>{const w=(N,T)=>{h(C=>C.map(B=>B.id===N?{...B,data:{...B.data,value:T}}:B))};h(N=>N.map(T=>T.type==="input"||T.type==="inputNumber"?{...T,data:{...T.data,onChange:w}}:T))},[h]),z.useEffect(()=>{const N=setInterval(()=>{h(T=>Cf(T,g)),v(T=>sb(x,T))},50);return()=>clearInterval(N)},[x,g,h,v]),u.jsx("div",{className:"fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-sm flex items-center justify-center p-8",children:u.jsxs("div",{className:"bg-slate-900 w-full h-full max-w-6xl max-h-[800px] rounded-xl border border-slate-700 flex flex-col overflow-hidden shadow-2xl relative",children:[u.jsxs("div",{className:"flex items-center justify-between p-4 border-b border-slate-800 bg-slate-900/50",children:[u.jsxs("h2",{className:"text-xl font-bold text-white flex items-center gap-2",children:[c==="adder"&&u.jsx(oT,{size:20,className:"text-blue-400"}),c==="sram"&&u.jsx(Af,{size:20,className:"text-amber-400"}),c==="group"&&u.jsx(nl,{size:20,className:"text-purple-400"}),d]}),u.jsx("button",{onClick:a,className:"text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800 transition-colors",children:u.jsx(wT,{size:24})})]}),u.jsx("div",{className:"flex-1 relative bg-slate-950",children:u.jsxs(z_,{nodes:x,edges:g,onNodesChange:b,onEdgesChange:L,nodeTypes:ib,fitView:!0,children:[u.jsx(H_,{color:"#334155",gap:16}),u.jsx(q_,{className:"bg-slate-800 border-slate-700 fill-white"})]})}),m&&u.jsx("div",{className:"p-4 bg-slate-800 border-t border-slate-700 text-sm text-slate-300",children:m})]})})};class F0{constructor(){this.lastOpcode=-1,this.lastOperand=0,this.clockBit=0,this.randSeed=172,this.randCounter=0,this.sleepCounter=0,this.httpRequestSerial=0,this.consoleRevision=0,this.plotterRevision=0,this.inputRevision=0,this.networkRevision=0,this.driveContentRevision=0,this.driveStateRevision=0,this.state=X0(),this.consoleOutput=[],this.plotterPixels=new Map,this.plotterColor={...dn},this.consoleInputBuffer=[],this.keyState=[0,0,0,0,0],this.driveData=new Uint8Array(ba),this.drivePage=0,this.driveLastAddr=0,this.driveLastRead=0,this.driveLastWrite=0,this.httpResponseBuffer=[],this.httpPending=!1,this.httpFetch=lb,this.httpLastMethod="GET",this.httpLastUrl="",this.httpLastBody="",this.httpLastStatus="Idle",this.httpCompletedMethod="GET",this.httpCompletedUrl="",this.httpCompletedBody="",this.httpCompletedStatus="",this.httpCompletedResponseText="",this.httpHistory=[],this.httpLastByte=0}reset(){this.state=X0(),this.consoleOutput=[],this.plotterPixels=new Map,this.plotterColor={...dn},this.consoleInputBuffer=[],this.keyState=[0,0,0,0,0],this.drivePage=0,this.driveLastAddr=0,this.driveLastRead=0,this.driveLastWrite=0,this.httpResponseBuffer=[],this.httpPending=!1,this.httpRequestSerial++,this.httpLastMethod="GET",this.httpLastUrl="",this.httpLastBody="",this.httpLastStatus="Idle",this.httpCompletedMethod="GET",this.httpCompletedUrl="",this.httpCompletedBody="",this.httpCompletedStatus="",this.httpCompletedResponseText="",this.httpHistory=[],this.httpLastByte=0,this.lastOpcode=-1,this.lastOperand=0,this.clockBit=0,this.randSeed=172,this.randCounter=0,this.sleepCounter=0,this.consoleRevision=0,this.plotterRevision=0,this.inputRevision=0,this.networkRevision=0,this.driveContentRevision=0,this.driveStateRevision=0}loadProgram(a,i=0){for(let l=0;l<a.length&&i+l<pn;l++)this.state.memory[i+l]=a[l]&255;this.state.pc=i}snapshot(){return{...this.state,flags:{...this.state.flags},memory:new Uint8Array(this.state.memory)}}read(a){return this.state.memory[a&Wn]}write(a,i){this.state.memory[a&Wn]=i&255}push(a){this.write(this.state.sp,a&255),this.state.sp=this.state.sp-1&Wn}pop(){return this.state.sp=this.state.sp+1&Wn,this.read(this.state.sp)}push16(a){this.push(a&255),this.push(a>>8&255)}pop16(){const a=this.pop(),i=this.pop();return a<<8|i}updateFlags(a,i){const l=a&255;this.state.flags.z=l===0,this.state.flags.n=(l&128)!==0,i!==void 0&&(this.state.flags.c=i>255||i<0)}output(a){var i;this.consoleOutput.push(a),this.consoleRevision++,(i=this.onConsoleOutput)==null||i.call(this,a)}setZeroNegativeFlags(a){const i=a&255;this.state.flags.z=i===0,this.state.flags.n=(i&128)!==0}readCString(a){const i=[];let l=a&Wn;for(let o=0;o<pn;o++){const c=this.read(l);if(l=l+1&Wn,c===0)break;i.push(String.fromCharCode(c))}return{value:i.join(""),nextAddr:l}}queueHttpResponse(a){const i=new TextEncoder().encode(a);this.httpResponseBuffer=Array.from(i,l=>l&255),this.networkRevision++}normalizeHttpFetchResult(a){return typeof a=="string"?{text:a,statusLabel:a.startsWith("HTTP ERROR:")?a:a.length>0?"HTTP 200 OK":"HTTP 204 No Content"}:{text:a.text,statusLabel:a.statusLabel}}recordHttpHistory(a){const i=a.id??this.httpRequestSerial;this.httpHistory=[{id:i,method:a.method,url:a.url,requestBody:a.requestBody,status:a.status,responseText:a.responseText},...this.httpHistory].slice(0,24)}startHttpRequest(a,i,l){const o=++this.httpRequestSerial;this.httpLastMethod=a,this.httpLastUrl=i,this.httpLastBody=l??"",this.httpLastStatus="Pending",this.httpLastByte=0,this.httpPending=!0,this.httpResponseBuffer=[],this.networkRevision++,this.httpFetch({method:a,url:i,body:l}).then(c=>{var m;if(o!==this.httpRequestSerial)return;const d=this.normalizeHttpFetchResult(c);this.httpLastStatus=d.statusLabel,this.httpCompletedMethod=a,this.httpCompletedUrl=i,this.httpCompletedBody=l??"",this.httpCompletedStatus=d.statusLabel,this.httpCompletedResponseText=d.text,this.recordHttpHistory({id:o,method:a,url:i,requestBody:l??"",status:d.statusLabel,responseText:d.text}),this.queueHttpResponse(d.text),this.httpPending=!1,this.networkRevision++,(m=this.onExternalStateChange)==null||m.call(this)}).catch(c=>{var x;if(o!==this.httpRequestSerial)return;const m=`HTTP ERROR: ${c instanceof Error?c.message:"Unknown network error"}`;this.httpLastStatus=m,this.httpCompletedMethod=a,this.httpCompletedUrl=i,this.httpCompletedBody=l??"",this.httpCompletedStatus=m,this.httpCompletedResponseText=m,this.recordHttpHistory({id:o,method:a,url:i,requestBody:l??"",status:m,responseText:m}),this.queueHttpResponse(m),this.httpPending=!1,this.networkRevision++,(x=this.onExternalStateChange)==null||x.call(this)})}pushInput(a){this.consoleInputBuffer.push(a&255),this.inputRevision++}getDriveAddress(){return((this.drivePage&Ox-1)<<8|this.state.a&255)&ba-1}clearDrive(){this.driveData.fill(0),this.driveLastAddr=0,this.driveLastRead=0,this.driveLastWrite=0,this.driveContentRevision++,this.driveStateRevision++}loadDriveData(a){this.driveData.fill(0);const i=Math.min(this.driveData.length,a.length??0);for(let l=0;l<i;l++)this.driveData[l]=a[l]&255;this.drivePage=0,this.driveLastAddr=0,this.driveLastRead=0,this.driveLastWrite=0,this.driveContentRevision++,this.driveStateRevision++}exportDriveData(){return new Uint8Array(this.driveData)}step(){if(this.state.halted)return!1;if(this.sleepCounter>0)return this.sleepCounter--,this.state.cycles++,!0;const a=this.read(this.state.pc),i=lr[a];let l=0;if(i&&i.size===3){const d=this.read(this.state.pc+1&Wn);l=this.read(this.state.pc+2&Wn)<<8|d}this.lastOpcode=a,this.lastOperand=l,this.clockBit^=1;const o=i?i.size:1;let c=this.state.pc+o&Wn;switch(a){case U.NOP:break;case U.HLT:return this.state.halted=!0,this.state.pc=c,this.state.cycles++,!1;case U.INC:{const d=this.state.a+1;this.state.a=d&255,this.updateFlags(this.state.a,d);break}case U.DEC:{const d=this.state.a-1;this.state.a=d&255,this.updateFlags(this.state.a,d);break}case U.NOT:this.state.a=~this.state.a&255,this.updateFlags(this.state.a);break;case U.SHL:{this.state.flags.c=(this.state.a&128)!==0,this.state.a=this.state.a<<1&255,this.updateFlags(this.state.a);break}case U.SHR:{this.state.flags.c=(this.state.a&1)!==0,this.state.a=this.state.a>>1&255,this.updateFlags(this.state.a);break}case U.TAB:this.state.b=this.state.a;break;case U.TBA:this.state.a=this.state.b,this.updateFlags(this.state.a);break;case U.ADDB:{const d=this.state.a+this.state.b;this.state.a=d&255,this.updateFlags(this.state.a,d);break}case U.SUBB:{const d=this.state.a-this.state.b;this.state.a=d&255,this.updateFlags(this.state.a,d);break}case U.ANDB:this.state.a=this.state.a&this.state.b,this.updateFlags(this.state.a);break;case U.ORB:this.state.a=this.state.a|this.state.b,this.updateFlags(this.state.a);break;case U.XORB:this.state.a=this.state.a^this.state.b,this.updateFlags(this.state.a);break;case U.CMPB:{const d=this.state.a-this.state.b;this.updateFlags(d&255,d);break}case U.MULB:{const d=this.state.a*this.state.b;this.state.a=d&255,this.updateFlags(this.state.a,d);break}case U.DIVB:this.state.b===0?(this.state.a=0,this.updateFlags(this.state.a)):(this.state.a=Math.floor(this.state.a/this.state.b)&255,this.updateFlags(this.state.a));break;case U.MODB:this.state.b===0?(this.state.a=0,this.updateFlags(this.state.a)):(this.state.a=this.state.a%this.state.b,this.updateFlags(this.state.a));break;case U.COLR:this.plotterColor={...this.plotterColor,r:this.state.a},this.plotterRevision++;break;case U.COLG:this.plotterColor={...this.plotterColor,g:this.state.a},this.plotterRevision++;break;case U.COLB:this.plotterColor={...this.plotterColor,b:this.state.a},this.plotterRevision++;break;case U.HTTPIN:this.httpResponseBuffer.length>0?(this.state.a=this.httpResponseBuffer.shift(),this.httpLastByte=this.state.a,this.setZeroNegativeFlags(this.state.a),this.state.flags.c=!1):this.httpPending?(this.state.a=0,this.httpLastByte=0,this.state.flags.z=!0,this.state.flags.n=!1,this.state.flags.c=!0):(this.state.a=0,this.httpLastByte=0,this.state.flags.z=!0,this.state.flags.n=!1,this.state.flags.c=!1),this.networkRevision++;break;case U.RET:c=this.pop16();break;case U.PUSH:this.push(this.state.a);break;case U.POP:this.state.a=this.pop(),this.updateFlags(this.state.a);break;case U.OUTA:this.output(String.fromCharCode(this.state.a));break;case U.OUTD:this.output(this.state.a.toString());break;case U.DRAW:this.plotterPixels.set(G0(this.state.a,this.state.b),Y0(this.plotterColor.r,this.plotterColor.g,this.plotterColor.b)),this.plotterRevision++;break;case U.CLR:this.plotterPixels=new Map,this.plotterRevision++;break;case U.CLCON:this.consoleOutput=[],this.consoleRevision++;break;case U.DRVRD:this.driveLastAddr=this.getDriveAddress(),this.driveLastRead=this.driveData[this.driveLastAddr],this.state.a=this.driveLastRead,this.updateFlags(this.state.a),this.driveStateRevision++;break;case U.DRVWR:this.driveLastAddr=this.getDriveAddress(),this.driveLastWrite=this.state.b&255,this.driveData[this.driveLastAddr]=this.driveLastWrite,this.driveContentRevision++,this.driveStateRevision++;break;case U.DRVCLR:this.clearDrive();break;case U.DRVPG:this.drivePage=this.state.a&Ox-1,this.driveStateRevision++;break;case U.INA:this.consoleInputBuffer.length>0?(this.state.a=this.consoleInputBuffer.shift(),this.inputRevision++):this.state.a=0,this.updateFlags(this.state.a);break;case U.GETKEY:this.state.a=this.keyState[this.state.a]||0,this.updateFlags(this.state.a);break;case U.RAND:{let d=this.randSeed;const m=d&1;d>>=1,m&&(d^=184),this.randSeed=d,this.randCounter=this.randCounter+109&255,this.state.a=(d^this.randCounter)&255,this.updateFlags(this.state.a);break}case U.SLEEP:this.sleepCounter=this.state.a;break;case U.LDA:this.state.a=l&255,this.updateFlags(this.state.a);break;case U.LDB:this.state.b=l&255;break;case U.ADD:{const d=l&255,m=this.state.a+d;this.state.a=m&255,this.updateFlags(this.state.a,m);break}case U.SUB:{const d=l&255,m=this.state.a-d;this.state.a=m&255,this.updateFlags(this.state.a,m);break}case U.AND:this.state.a=this.state.a&(l&255),this.updateFlags(this.state.a);break;case U.OR:this.state.a=this.state.a|l&255,this.updateFlags(this.state.a);break;case U.XOR:this.state.a=this.state.a^l&255,this.updateFlags(this.state.a);break;case U.CMP:{const d=l&255,m=this.state.a-d;this.updateFlags(m&255,m);break}case U.STA:this.write(l,this.state.a);break;case U.LDM:this.state.a=this.read(l),this.updateFlags(this.state.a);break;case U.STB:this.write(l,this.state.b);break;case U.LBM:this.state.b=this.read(l);break;case U.LDAI:{const d=l+this.state.a&Wn;this.state.a=this.read(d),this.updateFlags(this.state.a);break}case U.STAI:{const d=l+this.state.b&Wn;this.write(d,this.state.a);break}case U.HTTPGET:{const{value:d}=this.readCString(l);this.startHttpRequest("GET",d),this.state.a=1,this.updateFlags(this.state.a),this.state.flags.c=!1;break}case U.HTTPPOST:{const{value:d,nextAddr:m}=this.readCString(l),{value:x}=this.readCString(m);this.startHttpRequest("POST",d,x),this.state.a=1,this.updateFlags(this.state.a),this.state.flags.c=!1;break}case U.JMP:c=l;break;case U.JZ:this.state.flags.z&&(c=l);break;case U.JNZ:this.state.flags.z||(c=l);break;case U.JC:this.state.flags.c&&(c=l);break;case U.JNC:this.state.flags.c||(c=l);break;case U.JN:this.state.flags.n&&(c=l);break;case U.CALL:this.push16(c),c=l;break;case U.OUT:this.output(String.fromCharCode(l&255));break}return this.state.pc=c,this.state.cycles++,!0}run(a=1e4){const i=this.state.cycles;for(;this.state.cycles-i<a&&this.step(););return this.state.cycles-i}async runAsync(a=1e4,i=256){const l=this.state.cycles;let o=0;for(;this.state.cycles-l<a&&this.step();)o++,o>=i&&(o=0,await Promise.resolve());return this.state.cycles-l}getDisassembly(a=0,i=pn){const l=[];let o=a;for(;o<a+i&&o<pn;){const c=this.read(o),d=lr[c];if(!d){l.push({addr:o,bytes:[c],mnemonic:`.db 0x${c.toString(16).padStart(2,"0")}`}),o++;continue}if(d.size===3&&o+2<pn){const m=this.read(o+1),x=this.read(o+2),h=x<<8|m;l.push({addr:o,bytes:[c,m,x],mnemonic:`${d.mnemonic} 0x${h.toString(16).padStart(3,"0")}`}),o+=3}else l.push({addr:o,bytes:[c],mnemonic:d.mnemonic}),o++;if(c===U.HLT)break}return l}}function oM(t,a){const i=t.indexOf(";");let l=i>=0?t.substring(0,i):t;if(l=l.trim(),!l)return{lineNum:a};const o={lineNum:a},c=l.match(/^([a-zA-Z_]\w*)\s*:/);if(c&&(o.label=c[1].toUpperCase(),l=l.substring(c[0].length).trim(),!l))return o;if(l.toLowerCase().startsWith(".db"))return o.isDirective=".db",o.operandStr=l.substring(3).trim(),o;const d=l.split(/\s+/);return d.length>=1&&(o.mnemonic=d[0].toUpperCase(),d.length>=2&&(o.operandStr=d.slice(1).join(" ").trim())),o}function zx(t){if(!t)return null;const a=t.trim();if(/^0x[0-9a-fA-F]+$/i.test(a))return{value:parseInt(a,16)&65535};if(/^0b[01]+$/i.test(a))return{value:parseInt(a.substring(2),2)&65535};if(/^'.'$/.test(a))return{value:a.charCodeAt(1)&255};if(/^-?\d+$/.test(a))return{value:parseInt(a,10)&65535};const i=a.match(/^([a-zA-Z_]\w*)(?:([+-])((?:0x[0-9a-fA-F]+)|(?:\d+)))?$/);if(i){let l=0;if(i[2]&&i[3]){const o=/^0x/i.test(i[3])?parseInt(i[3],16):parseInt(i[3],10);l=i[2]==="-"?-o:o}return{label:i[1].toUpperCase(),offset:l}}return null}function _s(t,a=0,i=pa){const l=t.split(`
`),o=[],c=new Map,d=new Map,m=[];let x=a&65535;for(let b=0;b<l.length;b++){const g=oM(l[b],b+1);if(m.push(g),g.label&&(c.has(g.label)?o.push({line:g.lineNum,message:`Label "${g.label}" déjà défini`}):c.set(g.label,x)),g.isDirective===".db"){if(g.operandStr){const v=g.operandStr.split(",").map(L=>L.trim());x+=v.length}}else if(g.mnemonic){const v=Sc[g.mnemonic];if(v!==void 0){const L=lr[v];x+=L.size}else o.push({line:g.lineNum,message:`Instruction inconnue: "${g.mnemonic}"`})}}if(o.length>0)return{success:!1,bytes:[],errors:o,sourceMap:d,labels:c};const h=[];for(const b of m){const g=a+h.length;if(b.isDirective===".db"&&b.operandStr){const w=b.operandStr.split(",").map(N=>N.trim());for(const N of w){const T=zx(N);if(T===null)o.push({line:b.lineNum,message:`Valeur invalide dans .db: "${N}"`}),h.push(0);else if("label"in T){const C=c.get(T.label);C===void 0?(o.push({line:b.lineNum,message:`Label non défini: "${T.label}"`}),h.push(0)):h.push(C+(T.offset||0)&255)}else h.push(T.value&255)}d.set(g,b.lineNum);continue}if(!b.mnemonic)continue;const v=Sc[b.mnemonic];if(v===void 0)continue;const L=lr[v];if(d.set(g,b.lineNum),h.push(v),L.size===3)if(!b.operandStr)o.push({line:b.lineNum,message:`"${b.mnemonic}" nécessite un opérande`}),h.push(0,0);else{const w=zx(b.operandStr);if(w===null)o.push({line:b.lineNum,message:`Opérande invalide: "${b.operandStr}"`}),h.push(0,0);else if("label"in w){const N=c.get(w.label);if(N===void 0)o.push({line:b.lineNum,message:`Label non défini: "${w.label}"`}),h.push(0,0);else{const T=N+(w.offset||0)&65535;h.push(T&255),h.push(T>>8&255)}}else h.push(w.value&255),h.push(w.value>>8&255)}else b.operandStr&&FT(v)&&o.push({line:b.lineNum,message:`"${b.mnemonic}" ne prend pas d'opérande`})}return(a<0||a+h.length>i)&&o.push({line:0,message:`Programme trop grand : ${a+h.length} octets chargés (max ${i}).`}),{success:o.length===0,bytes:h,errors:o,sourceMap:d,labels:c}}var ve=(t=>(t[t.NUMBER=0]="NUMBER",t[t.CHAR_LITERAL=1]="CHAR_LITERAL",t[t.STRING_LITERAL=2]="STRING_LITERAL",t[t.IDENTIFIER=3]="IDENTIFIER",t[t.CONST=4]="CONST",t[t.INT=5]="INT",t[t.STRING=6]="STRING",t[t.VOID=7]="VOID",t[t.IF=8]="IF",t[t.ELSE=9]="ELSE",t[t.WHILE=10]="WHILE",t[t.FOR=11]="FOR",t[t.RETURN=12]="RETURN",t[t.BREAK=13]="BREAK",t[t.CONTINUE=14]="CONTINUE",t[t.PLUS=15]="PLUS",t[t.MINUS=16]="MINUS",t[t.STAR=17]="STAR",t[t.SLASH=18]="SLASH",t[t.PERCENT=19]="PERCENT",t[t.AMP=20]="AMP",t[t.PIPE=21]="PIPE",t[t.CARET=22]="CARET",t[t.TILDE=23]="TILDE",t[t.LSHIFT=24]="LSHIFT",t[t.RSHIFT=25]="RSHIFT",t[t.EQ=26]="EQ",t[t.NEQ=27]="NEQ",t[t.LT=28]="LT",t[t.GT=29]="GT",t[t.LTE=30]="LTE",t[t.GTE=31]="GTE",t[t.ASSIGN=32]="ASSIGN",t[t.PLUS_ASSIGN=33]="PLUS_ASSIGN",t[t.MINUS_ASSIGN=34]="MINUS_ASSIGN",t[t.AND=35]="AND",t[t.OR=36]="OR",t[t.NOT=37]="NOT",t[t.INC=38]="INC",t[t.DEC=39]="DEC",t[t.LPAREN=40]="LPAREN",t[t.RPAREN=41]="RPAREN",t[t.LBRACE=42]="LBRACE",t[t.RBRACE=43]="RBRACE",t[t.LBRACKET=44]="LBRACKET",t[t.RBRACKET=45]="RBRACKET",t[t.COMMA=46]="COMMA",t[t.SEMICOLON=47]="SEMICOLON",t[t.EOF=48]="EOF",t))(ve||{});const cM={const:4,int:5,string:6,void:7,if:8,else:9,while:10,for:11,return:12,break:13,continue:14};function uM(t){const a=[],i=[];let l=0,o=1,c=1;function d(){return l<t.length?t[l]:"\0"}function m(){return l+1<t.length?t[l+1]:"\0"}function x(){const h=t[l++];return h===`
`?(o++,c=1):c++,h}for(;l<t.length;){const h=o,b=c,g=d();if(/\s/.test(g)){x();continue}if(g==="/"&&m()==="/"){for(;l<t.length&&d()!==`
`;)x();continue}if(g==="/"&&m()==="*"){for(x(),x();l<t.length;){if(d()==="*"&&m()==="/"){x(),x();break}x()}continue}if(g==="#"){for(;l<t.length&&d()!==`
`;)x();continue}if(g==='"'){x();let L="";for(;l<t.length&&d()!=='"';)if(d()==="\\"){x();const w=x();w==="n"?L+=`
`:w==="t"?L+="	":w==="\\"?L+="\\":w==='"'?L+='"':L+=w}else L+=x();d()==='"'&&x(),a.push({type:2,value:L,line:h,col:b});continue}if(g==="'"){x();let L="";if(d()==="\\"){x();const w=x();w==="n"?L=`
`:w==="t"?L="	":w==="\\"?L="\\":w==="'"?L="'":L=w}else L=x();d()==="'"&&x(),a.push({type:1,value:L,line:h,col:b});continue}if(/[0-9]/.test(g)){let L="";if(g==="0"&&(m()==="x"||m()==="X"))for(L+=x(),L+=x();/[0-9a-fA-F]/.test(d());)L+=x();else for(;/[0-9]/.test(d());)L+=x();a.push({type:0,value:L,line:h,col:b});continue}if(/[a-zA-Z_]/.test(g)){let L="";for(;/[a-zA-Z0-9_]/.test(d());)L+=x();const w=cM[L];a.push({type:w!==void 0?w:3,value:L,line:h,col:b});continue}if(g==="+"&&m()==="+"){x(),x(),a.push({type:38,value:"++",line:h,col:b});continue}if(g==="-"&&m()==="-"){x(),x(),a.push({type:39,value:"--",line:h,col:b});continue}if(g==="+"&&m()==="="){x(),x(),a.push({type:33,value:"+=",line:h,col:b});continue}if(g==="-"&&m()==="="){x(),x(),a.push({type:34,value:"-=",line:h,col:b});continue}if(g==="="&&m()==="="){x(),x(),a.push({type:26,value:"==",line:h,col:b});continue}if(g==="!"&&m()==="="){x(),x(),a.push({type:27,value:"!=",line:h,col:b});continue}if(g==="<"&&m()==="="){x(),x(),a.push({type:30,value:"<=",line:h,col:b});continue}if(g===">"&&m()==="="){x(),x(),a.push({type:31,value:">=",line:h,col:b});continue}if(g==="<"&&m()==="<"){x(),x(),a.push({type:24,value:"<<",line:h,col:b});continue}if(g===">"&&m()===">"){x(),x(),a.push({type:25,value:">>",line:h,col:b});continue}if(g==="&"&&m()==="&"){x(),x(),a.push({type:35,value:"&&",line:h,col:b});continue}if(g==="|"&&m()==="|"){x(),x(),a.push({type:36,value:"||",line:h,col:b});continue}const v={"+":15,"-":16,"*":17,"/":18,"%":19,"&":20,"|":21,"^":22,"~":23,"!":37,"<":28,">":29,"=":32,"(":40,")":41,"{":42,"}":43,"[":44,"]":45,",":46,";":47};if(v[g]!==void 0){x(),a.push({type:v[g],value:g,line:h,col:b});continue}i.push({line:h,message:`Caractère inattendu: '${g}'`}),x()}return a.push({type:48,value:"",line:o,col:c}),{tokens:a,errors:i}}function dM(t){const a=[];let i=0;function l(){return t[i]||{type:ve.EOF,value:"",line:0,col:0}}function o(){return t[i++]||{type:ve.EOF,value:"",line:0,col:0}}function c(M){return l().type===M}function d(M){return c(M)?(o(),!0):!1}function m(M,V){if(c(M))return o();const ee=l();return a.push({line:ee.line,message:`${V} (reçu: "${ee.value||ve[ee.type]}")`}),ee}function x(){const M=[],V=[];for(;!c(ve.EOF);){if(l().value==="#"){for(;!c(ve.EOF)&&l().line===l().line;)o();continue}if(c(ve.CONST)||c(ve.INT)||c(ve.STRING)||c(ve.VOID)){const ee=d(ve.CONST),be=o().value;if(!c(ve.IDENTIFIER)){a.push({line:l().line,message:"Nom attendu après le type"}),o();continue}const Le=o();!ee&&be!=="string"&&c(ve.LPAREN)?V.push(L(be,Le)):M.push(...v(Le,be,ee,"';' attendu après déclaration globale"))}else a.push({line:l().line,message:`Déclaration attendue (reçu: "${l().value}")`}),o()}return{kind:"Program",globals:M,functions:V}}function h(){const M=l().line;m(ve.LBRACE,"'{' attendu pour l'initialisation du tableau");const V=[];if(!c(ve.RBRACE))do V.push(P());while(d(ve.COMMA));return m(ve.RBRACE,"'}' attendu après l'initialisation du tableau"),{kind:"ArrayInitializer",elements:V,line:M}}function b(M){return{kind:"ArrayInitializer",line:M.line,elements:[...M.value,"\0"].map(V=>({kind:"NumberLiteral",value:V.charCodeAt(0)&255,line:M.line}))}}function g(M,V,ee){if(V==="string"){let be=null,Le=1;if(d(ve.ASSIGN))if(c(ve.STRING_LITERAL)){const pe=o();be=b(pe),Le=pe.value.length+1}else a.push({line:l().line,message:"Une variable string doit être initialisée avec une chaine littérale"}),P();else a.push({line:M.line,message:"Une variable string doit être initialisée"});return{kind:"VarDecl",name:M.value,initializer:be,arraySize:Le,isConst:ee,line:M.line}}if(d(ve.LBRACKET)){const be=l();let Le=1;c(ve.NUMBER)?(Le=parseInt(o().value,10),Le<=0&&(a.push({line:be.line,message:"La taille du tableau doit être > 0"}),Le=1)):a.push({line:be.line,message:"Taille du tableau attendue (constante entière)"}),m(ve.RBRACKET,"']' attendu après taille du tableau");let pe=null;return d(ve.ASSIGN)?c(ve.LBRACE)?pe=h():c(ve.STRING_LITERAL)?pe=b(o()):(a.push({line:l().line,message:"Initialiseur de tableau attendu: utilisez { ... } ou une chaine littérale"}),P()):ee&&a.push({line:M.line,message:"Une declaration const doit avoir un initialiseur"}),{kind:"VarDecl",name:M.value,initializer:pe,arraySize:Le,isConst:ee,line:M.line}}let xe=null;return d(ve.ASSIGN)?xe=P():ee&&a.push({line:M.line,message:"Une declaration const doit avoir un initialiseur"}),{kind:"VarDecl",name:M.value,initializer:xe,arraySize:null,isConst:ee,line:M.line}}function v(M,V,ee,xe){const be=[g(M,V,ee)];for(;d(ve.COMMA);){const Le=m(ve.IDENTIFIER,"Nom de variable attendu");be.push(g(Le,V,ee))}return m(ve.SEMICOLON,xe),be}function L(M,V){m(ve.LPAREN,"'(' attendu");const ee=[];if(!c(ve.RPAREN))do{m(ve.INT,"'int' attendu pour paramètre");const be=m(ve.IDENTIFIER,"Nom de paramètre attendu");let Le=null;if(d(ve.LBRACKET)){const pe=l();c(ve.NUMBER)?(Le=parseInt(o().value,10),Le<=0&&(a.push({line:pe.line,message:"La taille du tableau doit être > 0"}),Le=1)):(a.push({line:pe.line,message:"Taille du tableau attendue pour le paramètre (constante entière)"}),Le=1),m(ve.RBRACKET,"']' attendu")}ee.push({name:be.value,arraySize:Le,line:be.line})}while(d(ve.COMMA));m(ve.RPAREN,"')' attendu");const xe=w();return{kind:"FunctionDecl",name:V.value,params:ee,returnType:M,body:xe,line:V.line}}function w(){const M=l().line;m(ve.LBRACE,"'{' attendu");const V=[];for(;!c(ve.RBRACE)&&!c(ve.EOF);)V.push(N());return m(ve.RBRACE,"'}' attendu"),{kind:"Block",statements:V,line:M}}function N(){if(c(ve.LBRACE))return w();if(c(ve.CONST)||c(ve.INT)||c(ve.STRING))return T();if(c(ve.IF))return C();if(c(ve.WHILE))return B();if(c(ve.FOR))return D();if(c(ve.RETURN))return E();if(c(ve.BREAK)){const M=o();return m(ve.SEMICOLON,"';' attendu après 'break'"),{kind:"BreakStmt",line:M.line}}if(c(ve.CONTINUE)){const M=o();return m(ve.SEMICOLON,"';' attendu après 'continue'"),{kind:"ContinueStmt",line:M.line}}return _()}function T(){const M=l(),V=d(ve.CONST),xe=o().value,be=m(ve.IDENTIFIER,"Nom de variable attendu"),Le=v(be,xe,V,"';' attendu après déclaration");return Le.length===1?Le[0]:{kind:"VarDeclList",declarations:Le,line:M.line}}function C(){const M=o();m(ve.LPAREN,"'(' attendu après 'if'");const V=P();m(ve.RPAREN,"')' attendu");const ee=N();let xe=null;return d(ve.ELSE)&&(xe=N()),{kind:"IfStmt",condition:V,thenBranch:ee,elseBranch:xe,line:M.line}}function B(){const M=o();m(ve.LPAREN,"'(' attendu après 'while'");const V=P();m(ve.RPAREN,"')' attendu");const ee=N();return{kind:"WhileStmt",condition:V,body:ee,line:M.line}}function D(){const M=o();m(ve.LPAREN,"'(' attendu après 'for'");let V=null;c(ve.CONST)||c(ve.INT)||c(ve.STRING)?V=T():c(ve.SEMICOLON)?o():(V={kind:"ExprStmt",expression:P(),line:l().line},m(ve.SEMICOLON,"';' attendu dans 'for'"));let ee=null;c(ve.SEMICOLON)||(ee=P()),m(ve.SEMICOLON,"';' attendu dans 'for'");let xe=null;c(ve.RPAREN)||(xe=P()),m(ve.RPAREN,"')' attendu");const be=N();return{kind:"ForStmt",init:V,condition:ee,update:xe,body:be,line:M.line}}function E(){const M=o();let V=null;return c(ve.SEMICOLON)||(V=P()),m(ve.SEMICOLON,"';' attendu après 'return'"),{kind:"ReturnStmt",value:V,line:M.line}}function _(){const M=P();return m(ve.SEMICOLON,"';' attendu après expression"),{kind:"ExprStmt",expression:M,line:M.line}}function P(){return S()}function S(){const M=X();if(c(ve.ASSIGN)&&M.kind==="IndexExpr"){o();const V=S();return{kind:"IndexAssignExpr",arrayName:M.arrayName,index:M.index,value:V,line:M.line}}if(c(ve.ASSIGN)&&M.kind==="Identifier"){o();const V=S();return{kind:"AssignExpr",name:M.name,value:V,line:M.line}}if((c(ve.PLUS_ASSIGN)||c(ve.MINUS_ASSIGN))&&M.kind==="Identifier"){const V=o(),ee=S();return{kind:"CompoundAssignExpr",op:V.value,name:M.name,value:ee,line:M.line}}return M}function X(){let M=F();for(;c(ve.OR);){const V=o(),ee=F();M={kind:"BinaryExpr",op:V.value,left:M,right:ee,line:V.line}}return M}function F(){let M=$();for(;c(ve.AND);){const V=o(),ee=$();M={kind:"BinaryExpr",op:V.value,left:M,right:ee,line:V.line}}return M}function $(){let M=H();for(;c(ve.PIPE);){const V=o(),ee=H();M={kind:"BinaryExpr",op:V.value,left:M,right:ee,line:V.line}}return M}function H(){let M=te();for(;c(ve.CARET);){const V=o(),ee=te();M={kind:"BinaryExpr",op:V.value,left:M,right:ee,line:V.line}}return M}function te(){let M=oe();for(;c(ve.AMP);){const V=o(),ee=oe();M={kind:"BinaryExpr",op:V.value,left:M,right:ee,line:V.line}}return M}function oe(){let M=I();for(;c(ve.EQ)||c(ve.NEQ);){const V=o(),ee=I();M={kind:"BinaryExpr",op:V.value,left:M,right:ee,line:V.line}}return M}function I(){let M=J();for(;c(ve.LT)||c(ve.GT)||c(ve.LTE)||c(ve.GTE);){const V=o(),ee=J();M={kind:"BinaryExpr",op:V.value,left:M,right:ee,line:V.line}}return M}function J(){let M=R();for(;c(ve.LSHIFT)||c(ve.RSHIFT);){const V=o(),ee=R();M={kind:"BinaryExpr",op:V.value,left:M,right:ee,line:V.line}}return M}function R(){let M=Z();for(;c(ve.PLUS)||c(ve.MINUS);){const V=o(),ee=Z();M={kind:"BinaryExpr",op:V.value,left:M,right:ee,line:V.line}}return M}function Z(){let M=G();for(;c(ve.STAR)||c(ve.SLASH)||c(ve.PERCENT);){const V=o(),ee=G();M={kind:"BinaryExpr",op:V.value,left:M,right:ee,line:V.line}}return M}function G(){if(c(ve.MINUS)||c(ve.NOT)||c(ve.TILDE)){const M=o(),V=G();return{kind:"UnaryExpr",op:M.value,operand:V,line:M.line}}if(c(ve.INC)||c(ve.DEC)){const M=o(),V=G();return{kind:"UnaryExpr",op:M.value,operand:V,line:M.line}}return K()}function K(){let M=ne();for(;c(ve.INC)||c(ve.DEC);){const V=o();M={kind:"PostfixExpr",op:V.value,operand:M,line:V.line}}return M}function ne(){const M=l();if(c(ve.NUMBER)){o();let V;return M.value.startsWith("0x")||M.value.startsWith("0X")?V=parseInt(M.value,16):V=parseInt(M.value,10),{kind:"NumberLiteral",value:V&255,line:M.line}}if(c(ve.CHAR_LITERAL))return o(),{kind:"CharLiteral",value:M.value.charCodeAt(0)&255,line:M.line};if(c(ve.STRING_LITERAL))return o(),{kind:"StringLiteral",value:M.value,line:M.line};if(c(ve.IDENTIFIER)){if(o(),c(ve.LPAREN)){o();const V=[];if(!c(ve.RPAREN))do V.push(P());while(d(ve.COMMA));return m(ve.RPAREN,"')' attendu après arguments"),{kind:"CallExpr",name:M.value,args:V,line:M.line}}if(c(ve.LBRACKET)){o();const V=P();return m(ve.RBRACKET,"']' attendu après index"),{kind:"IndexExpr",arrayName:M.value,index:V,line:M.line}}return{kind:"Identifier",name:M.value,line:M.line}}if(c(ve.LPAREN)){o();const V=P();return m(ve.RPAREN,"')' attendu"),V}return a.push({line:M.line,message:`Expression attendue (reçu: "${M.value||ve[M.type]}")`}),o(),{kind:"NumberLiteral",value:0,line:M.line}}return{program:x(),errors:a}}const Ni=4120,al=Ni+0,bs=Ni+1,ys=Ni+2,sr=Ni+3,aa=Ni+4,Nc=Ni+5,ia=Ni+6,Tc=Ni+7;function fM(t){const a=t[al]??0;return a===0?{count:0,file:null}:{count:a,file:{dirPage:t[bs]??0,dirOffset:t[ys]??0,type:t[sr]??0,startPage:t[aa]??0,pageCount:t[Nc]??0,sizeBytes:t[ia]??0,entryIndex:t[Tc]??0}}}const lt=4112,Ux=4119,rc=4128,pM=6144;function mM(t){var Gn;const a=[],i=[];let l=0,o=4096,c=rc;const d=new Map,m=new Map,x=new Set,h=new Set,b=new Map,g=new Set,v=new Set,L=new Set,w=[],N=new Map,T=new Map;let C=0;const B=new Set(["putchar","print_num","print","array_len","string_len","console_clear","color","draw","clear","getchar","getchar_nb","getKey","rand","sleep","drive_read","drive_write","drive_clear","drive_set_page","drive_read_at","drive_write_at","boot_argc","boot_arg_page","boot_arg_offset","boot_arg_type","boot_arg_start_page","boot_arg_page_count","boot_arg_size","boot_arg_index","boot_file_read","get","post","gethttpchar"]),D=[];function E(){return`__L${l++}`}function _(y){i.push(y)}function P(y){i.push(`; ${y}`)}function S(y){return"0x"+(y&65535).toString(16).padStart(4,"0")}function X(y){return y>0&&(y&y-1)===0}function F(y){let O=0;for(;y>1;)y>>=1,O++;return O}function $(y,O,q){if(!(q<=0)&&y!==O){if(y<O&&y+q>O){for(let ie=q-1;ie>=0;ie--)_(`  LDM ${S(y+ie)}`),_(`  STA ${S(O+ie)}`);return}for(let ie=0;ie<q;ie++)_(`  LDM ${S(y+ie)}`),_(`  STA ${S(O+ie)}`)}}function H(y){return[...y].map(O=>O.charCodeAt(0)&255)}function te(y){const O=N.get(y);if(O)return O;const q=`__str_${C++}`;return N.set(y,q),w.push({label:q,bytes:[...H(y),0]}),q}function oe(y,O){const q=`${y}\0${O}`,ie=T.get(q);if(ie)return ie;const fe=`__http_post_${C++}`;return T.set(q,fe),w.push({label:fe,bytes:[...H(y),0,...H(O),0]}),fe}function I(y,O){switch(y.kind){case"BinaryExpr":I(y.left,O),I(y.right,O);break;case"UnaryExpr":case"PostfixExpr":I(y.operand,O);break;case"AssignExpr":case"CompoundAssignExpr":I(y.value,O);break;case"IndexExpr":I(y.index,O);break;case"IndexAssignExpr":I(y.index,O),I(y.value,O);break;case"CallExpr":B.has(y.name)||O.add(y.name);for(const q of y.args)I(q,O);break}}function J(y,O){function q(ie){if(ie){if(ie.kind==="ArrayInitializer"){for(const fe of ie.elements)I(fe,O);return}I(ie,O)}}switch(y.kind){case"VarDecl":q(y.initializer);break;case"VarDeclList":for(const ie of y.declarations)q(ie.initializer);break;case"ExprStmt":I(y.expression,O);break;case"ReturnStmt":y.value&&I(y.value,O);break;case"IfStmt":I(y.condition,O),J(y.thenBranch,O),y.elseBranch&&J(y.elseBranch,O);break;case"WhileStmt":I(y.condition,O),J(y.body,O);break;case"ForStmt":y.init&&J(y.init,O),y.condition&&I(y.condition,O),y.update&&I(y.update,O),J(y.body,O);break;case"Block":for(const ie of y.statements)J(ie,O);break}}function R(y){switch(y.kind){case"BinaryExpr":return R(y.left)||R(y.right);case"UnaryExpr":case"PostfixExpr":return R(y.operand);case"AssignExpr":case"CompoundAssignExpr":return R(y.value);case"IndexExpr":return R(y.index);case"IndexAssignExpr":return R(y.index)||R(y.value);case"CallExpr":return B.has(y.name)?y.args.some(R):!0;default:return!1}}function Z(y){const O=new Map,q=new Map,ie=new Map,fe=new Set,Ne=new Set,Je=new Set,bt=[];let Et=0;function $t(Q){let De=0;for(;;){let Ce=!0;for(let Re=0;Re<Q;Re++)if(bt[De+Re]){Ce=!1,De+=Re+1;break}if(Ce)break}for(let Ce=0;Ce<Q;Ce++)bt[De+Ce]=!0;return Et=Math.max(Et,De+Q),De}function ke(Q,De){for(let Ce=0;Ce<De;Ce++)bt[Q+Ce]=!1}function Ke(Q,De,Ce,Re){if(O.has(Q)||q.has(Q)||ie.has(Q))return;const dt=De??1,Ht=$t(dt);De!==null?(ie.set(Q,{baseSlot:Ht,size:De}),Ce&&Ne.add(Q)):(q.set(Q,Ht),Ce&&fe.add(Q)),Re.push({base:Ht,size:dt})}function ut(Q){var De,Ce;if(Q.kind==="Block"){It(Q);return}if(Q.kind==="IfStmt"){ut(Q.thenBranch),Q.elseBranch&&ut(Q.elseBranch);return}if(Q.kind==="WhileStmt"){ut(Q.body);return}if(Q.kind==="ForStmt"){const Re=[];if(((De=Q.init)==null?void 0:De.kind)==="VarDecl")Ke(Q.init.name,Q.init.arraySize,Q.init.isConst,Re);else if(((Ce=Q.init)==null?void 0:Ce.kind)==="VarDeclList")for(const dt of Q.init.declarations)Ke(dt.name,dt.arraySize,dt.isConst,Re);ut(Q.body);for(let dt=Re.length-1;dt>=0;dt--)ke(Re[dt].base,Re[dt].size)}}function It(Q){const De=[];for(const Ce of Q.statements){if(Ce.kind==="VarDecl"){Ke(Ce.name,Ce.arraySize,Ce.isConst,De);continue}if(Ce.kind==="VarDeclList"){for(const Re of Ce.declarations)Ke(Re.name,Re.arraySize,Re.isConst,De);continue}ut(Ce)}for(let Ce=De.length-1;Ce>=0;Ce--)ke(De[Ce].base,De[Ce].size)}for(const Q of y.params)O.has(Q.name)||(Q.arraySize!==null?ie.set(Q.name,{baseSlot:$t(Q.arraySize),size:Q.arraySize}):O.set(Q.name,$t(1)));return J(y.body,Je),It(y.body),{name:y.name,isMain:y.name==="main",recursive:!1,params:y.params,paramSlots:O,localSlots:q,arrays:ie,constScalars:fe,constArrays:Ne,frameSize:Et,frameBase:-1,directCallees:Je}}function G(y,O,q,ie=new Set){const fe=q.get(y);if(!fe)return!1;for(const Ne of fe){if(Ne===O)return!0;if(!ie.has(Ne)&&(ie.add(Ne),G(Ne,O,q,ie)))return!0}return!1}function K(y,O){const q=new Set,ie=fe=>{if(q.has(fe)||!O.has(fe))return;q.add(fe);const Ne=O.get(fe);if(Ne)for(const Je of Ne)ie(Je)};return ie(y),q}function ne(y,O){return`__rt_${y}_buf_${O.toString(16).padStart(4,"0")}`}function j(y,O){const q=O.arrays.get(y);if(q)return q;const ie=m.get(y);return ie||null}for(const y of t.globals){if(d.has(y.name)||m.has(y.name)){a.push({line:y.line,message:`Variable globale "${y.name}" déjà déclarée`});continue}if(y.arraySize!==null){if(o+y.arraySize-1>4111){a.push({line:y.line,message:`Tableau global "${y.name}" trop grand (dépasse la zone globale, max 16 octets)`});continue}m.set(y.name,{baseAddr:o,size:y.arraySize}),y.isConst&&h.add(y.name),o+=y.arraySize}else{if(o>4111){a.push({line:y.line,message:"Trop de variables globales (max 16)"});continue}d.set(y.name,o),y.isConst&&x.add(y.name),o++}}const M=t.functions.map(Z),V=new Map(M.map(y=>[y.name,y.directCallees])),ee=K("main",V),xe=t.functions.filter(y=>ee.has(y.name)),be=M.filter(y=>ee.has(y.name));for(const y of be)y.recursive=G(y.name,y.name,V);const Le=[...be].sort((y,O)=>O.frameSize-y.frameSize);for(const y of Le){let O=rc;for(;;){let q=!1;for(const ie of be){if(ie===y||ie.frameSize===0||ie.frameBase<rc||!(G(y.name,ie.name,V)||G(ie.name,y.name,V)))continue;const fe=ie.frameBase,Ne=ie.frameBase+ie.frameSize,Je=O+y.frameSize;if(O<Ne&&fe<Je){O=Ne,q=!0;break}}if(!q)break}y.frameBase=O,c=Math.max(c,O+y.frameSize)}c>pM&&a.push({line:0,message:"Trop de variables locales (mémoire pleine)"});for(const y of be){const O=[],q=new Map;for(const[Ne,Je]of y.paramSlots)q.set(Ne,y.frameBase+Je);const ie=new Map;for(const[Ne,Je]of y.localSlots)ie.set(Ne,y.frameBase+Je);const fe=new Map;for(const[Ne,Je]of y.arrays)fe.set(Ne,{baseAddr:y.frameBase+Je.baseSlot,size:Je.size});for(const Ne of y.params)Ne.arraySize!==null?O.push({name:Ne.name,arraySize:Ne.arraySize,baseAddr:(Gn=fe.get(Ne.name))==null?void 0:Gn.baseAddr}):O.push({name:Ne.name,arraySize:null,addr:q.get(Ne.name)});b.set(y.name,{name:y.name,isMain:y.isMain,recursive:y.recursive,params:O,paramAddrs:q,localAddrs:ie,frameAddrs:Array.from({length:y.frameSize},(Ne,Je)=>y.frameBase+Je),arrays:fe,constScalars:new Set(y.constScalars),constArrays:new Set(y.constArrays)})}function pe(y,O,q,ie){switch(y.kind){case"BinaryExpr":pe(y.left,O,q,ie),pe(y.right,O,q,ie);break;case"UnaryExpr":case"PostfixExpr":pe(y.operand,O,q,ie);break;case"AssignExpr":case"CompoundAssignExpr":pe(y.value,O,q,ie);break;case"IndexExpr":pe(y.index,O,q,ie);break;case"IndexAssignExpr":pe(y.index,O,q,ie),pe(y.value,O,q,ie);break;case"CallExpr":{for(const fe of y.args)pe(fe,O,q,ie);if(y.args.length>=1&&y.args[0].kind==="Identifier"){const fe=j(y.args[0].name,O);fe&&(y.name==="print"?q.set(fe.baseAddr,(q.get(fe.baseAddr)??0)+1):y.name==="string_len"&&ie.set(fe.baseAddr,(ie.get(fe.baseAddr)??0)+1))}break}}}function Te(y,O,q,ie){switch(y.kind){case"VarDecl":y.initializer&&y.initializer.kind!=="ArrayInitializer"&&pe(y.initializer,O,q,ie);break;case"VarDeclList":for(const fe of y.declarations)fe.initializer&&fe.initializer.kind!=="ArrayInitializer"&&pe(fe.initializer,O,q,ie);break;case"ExprStmt":pe(y.expression,O,q,ie);break;case"ReturnStmt":y.value&&pe(y.value,O,q,ie);break;case"IfStmt":pe(y.condition,O,q,ie),Te(y.thenBranch,O,q,ie),y.elseBranch&&Te(y.elseBranch,O,q,ie);break;case"WhileStmt":pe(y.condition,O,q,ie),Te(y.body,O,q,ie);break;case"ForStmt":y.init&&Te(y.init,O,q,ie),y.condition&&pe(y.condition,O,q,ie),y.update&&pe(y.update,O,q,ie),Te(y.body,O,q,ie);break;case"BreakStmt":case"ContinueStmt":break;case"Block":for(const fe of y.statements)Te(fe,O,q,ie);break}}{const y=new Map,O=new Map;for(const q of xe){const ie=b.get(q.name);ie&&Te(q.body,ie,y,O)}for(const[q,ie]of y)ie>1&&v.add(q);for(const[q,ie]of O)ie>1&&L.add(q)}_("; === Programme compilé depuis C ==="),_("  JMP __main");for(const y of xe)He(y);return Be(),Pe(),t.functions.find(y=>y.name==="main")||a.push({line:1,message:"Fonction 'main' requise"}),{assembly:Ze(i).join(`
`),errors:a,memoryLayout:{globals:o-4096,scratch:8,locals:c-rc,stackSize:2048}};function Ze(y){function O(Ne){const Je=Ne.trim();return!Je||Je.startsWith(";")}function q(Ne){return/^[A-Za-z_]\w*:$/.test(Ne.trim())}function ie(Ne,Je){for(let bt=Je;bt<Ne.length;bt++)if(!O(Ne[bt]))return bt;return-1}let fe=[...y];for(;;){let Ne=!1;const Je=[];for(let bt=0;bt<fe.length;bt++){const Et=fe[bt],$t=Et.trim();if(O(Et)||q(Et)){Je.push(Et);continue}const ke=ie(fe,bt+1),Ke=ke>=0?fe[ke].trim():null,ut=$t.match(/^JMP\s+([A-Za-z_]\w*)$/);if(ut&&Ke===`${ut[1]}:`){Ne=!0;continue}const It=$t.match(/^LDA\s+(\d+)$/);if(It&&ke===bt+1&&Ke==="OUTA"){Je.push(`  OUT ${It[1]}`),bt=ke,Ne=!0;continue}const Q=$t.match(/^LDM\s+(0x[0-9a-f]+)$/i);if(Q&&ke===bt+1&&Ke===`STA ${Q[1]}`){Je.push(Et),bt=ke,Ne=!0;continue}if($t.match(/^LDA\s+(\d+)$/)&&ke===bt+1){const Ce=fe[ke].trim().match(/^STA\s+(0x[0-9a-f]+)$/i),Re=Ce?ie(fe,ke+1):-1,dt=Re>=0?fe[Re].trim():null;if(Ce&&Re===ke+1&&dt===`LDM ${Ce[1]}`){Je.push(Et),Je.push(fe[ke]),bt=Re,Ne=!0;continue}}if(Je.push(Et),/^(JMP\s+[A-Za-z_]\w*|RET|HLT)$/u.test($t)){let Ce=bt+1,Re=!1;for(;Ce<fe.length&&!q(fe[Ce]);)O(fe[Ce])||(Re=!0),Ce++;Re&&(Ne=!0,bt=Ce-1)}}if(!Ne)return Je;fe=Je}}function Me(y){switch(y.kind){case"NumberLiteral":case"CharLiteral":return y.value&255;case"UnaryExpr":{const O=Me(y.operand);if(O===null)return null;switch(y.op){case"-":return-O&255;case"!":return O===0?1:0;case"~":return~O&255;default:return null}}case"BinaryExpr":{const O=Me(y.left),q=Me(y.right);if(O===null||q===null)return null;switch(y.op){case"+":return O+q&255;case"-":return O-q&255;case"*":return O*q&255;case"/":return q===0?null:Math.floor(O/q)&255;case"%":return q===0?null:O%q;case"&":return O&q;case"|":return O|q;case"^":return O^q;case"<<":return O<<q&255;case">>":return O>>q&255;case"==":return O===q?1:0;case"!=":return O!==q?1:0;case"<":return O<q?1:0;case">":return O>q?1:0;case"<=":return O<=q?1:0;case">=":return O>=q?1:0;case"&&":return O!==0&&q!==0?1:0;case"||":return O!==0||q!==0?1:0;default:return null}}default:return null}}function Be(){g.has("shl")&&(_(""),P("--- runtime helper __rt_shl ---"),_("__rt_shl:"),_(`  STA ${S(lt)}`),_("  TBA"),_(`  STA ${S(lt+1)}`),_("__rt_shl_loop:"),_(`  LDM ${S(lt+1)}`),_("  CMP 0"),_("  JZ __rt_shl_end"),_(`  LDM ${S(lt)}`),_("  SHL"),_(`  STA ${S(lt)}`),_(`  LDM ${S(lt+1)}`),_("  DEC"),_(`  STA ${S(lt+1)}`),_("  JMP __rt_shl_loop"),_("__rt_shl_end:"),_(`  LDM ${S(lt)}`),_("  RET")),g.has("shr")&&(_(""),P("--- runtime helper __rt_shr ---"),_("__rt_shr:"),_(`  STA ${S(lt)}`),_("  TBA"),_(`  STA ${S(lt+1)}`),_("__rt_shr_loop:"),_(`  LDM ${S(lt+1)}`),_("  CMP 0"),_("  JZ __rt_shr_end"),_(`  LDM ${S(lt)}`),_("  SHR"),_(`  STA ${S(lt)}`),_(`  LDM ${S(lt+1)}`),_("  DEC"),_(`  STA ${S(lt+1)}`),_("  JMP __rt_shr_loop"),_("__rt_shr_end:"),_(`  LDM ${S(lt)}`),_("  RET"));for(const y of[...v].sort((O,q)=>O-q))_(""),P(`--- runtime helper ${ne("print",y)} ---`),_(`${ne("print",y)}:`),_("  LDA 0"),_(`  STA ${S(lt)}`),_(`${ne("print",y)}_loop:`),_(`  LDM ${S(lt)}`),_(`  LDAI ${S(y)}`),_("  CMP 0"),_(`  JZ ${ne("print",y)}_end`),_("  OUTA"),_(`  LDM ${S(lt)}`),_("  INC"),_(`  STA ${S(lt)}`),_(`  JMP ${ne("print",y)}_loop`),_(`${ne("print",y)}_end:`),_("  RET");for(const y of[...L].sort((O,q)=>O-q))_(""),P(`--- runtime helper ${ne("strlen",y)} ---`),_(`${ne("strlen",y)}:`),_("  LDA 0"),_(`  STA ${S(lt)}`),_(`${ne("strlen",y)}_loop:`),_(`  LDM ${S(lt)}`),_(`  LDAI ${S(y)}`),_("  CMP 0"),_(`  JZ ${ne("strlen",y)}_end`),_(`  LDM ${S(lt)}`),_("  INC"),_(`  STA ${S(lt)}`),_(`  JMP ${ne("strlen",y)}_loop`),_(`${ne("strlen",y)}_end:`),_(`  LDM ${S(lt)}`),_("  RET")}function Pe(){if(w.length!==0){_(""),P("--- constant data ---");for(const y of w){_(`${y.label}:`);for(let O=0;O<y.bytes.length;O+=16)_(`  .db ${y.bytes.slice(O,O+16).join(", ")}`)}}}function He(y){const O=b.get(y.name),q=y.name==="main";if(_(""),P(`--- function ${y.name} ---`),_(`__${y.name}:`),q)for(const ie of t.globals)ie.initializer&&Ct(ie,O);at(y.body,O),_(q?"  HLT":"  RET")}function at(y,O){for(const q of y.statements)St(q,O)}function Xe(y,O,q,ie,fe){q.elements.length>O&&a.push({line:fe,message:"Trop d'elements dans l'initialiseur du tableau"});for(let Ne=0;Ne<O;Ne++)Ne<q.elements.length?me(q.elements[Ne],ie):_("  LDA 0"),_(`  STA ${S(y+Ne)}`)}function Ct(y,O){var q,ie;if(y.initializer){if(y.arraySize!==null){const fe=((q=O.arrays.get(y.name))==null?void 0:q.baseAddr)??((ie=m.get(y.name))==null?void 0:ie.baseAddr);if(fe===void 0){a.push({line:y.line,message:`Tableau non défini: "${y.name}"`});return}y.initializer.kind==="ArrayInitializer"?Xe(fe,y.arraySize,y.initializer,O,y.line):a.push({line:y.line,message:"Un tableau doit être initialisé avec { ... } ou une chaine littérale"});return}if(y.initializer.kind==="ArrayInitializer"){a.push({line:y.line,message:"Une variable scalaire ne peut pas recevoir un initialiseur de tableau"});return}me(y.initializer,O),hn(y.name,O,y.line,!0)}}function nn(y){if(v.has(y)){_(`  CALL ${ne("print",y)}`);return}const O=lt,q=lt+1,ie=E(),fe=E();_("  LDA 0"),_(`  STA ${S(O)}`),_(`${ie}:`),_(`  LDM ${S(O)}`),_(`  LDAI ${S(y)}`),_(`  STA ${S(q)}`),_("  CMP 0"),_(`  JZ ${fe}`),_("  OUTA"),_(`  LDM ${S(O)}`),_("  INC"),_(`  STA ${S(O)}`),_(`  JMP ${ie}`),_(`${fe}:`)}function Pt(y,O){y.initializer&&Ct(y,O)}function St(y,O){switch(y.kind){case"VarDecl":Pt(y,O);break;case"VarDeclList":for(const q of y.declarations)Pt(q,O);break;case"ExprStmt":y.expression.kind==="CallExpr"?zt(y.expression,O,!1):y.expression.kind==="PostfixExpr"?Bn(y.expression,O,!1):me(y.expression,O);break;case"ReturnStmt":y.value&&me(y.value,O),_(O.isMain?"  HLT":"  RET");break;case"IfStmt":we(y,O);break;case"WhileStmt":Ee(y,O);break;case"ForStmt":$e(y,O);break;case"BreakStmt":D.length===0?a.push({line:y.line,message:"'break' en dehors d'une boucle"}):_(`  JMP ${D[D.length-1].breakLabel}`);break;case"ContinueStmt":D.length===0?a.push({line:y.line,message:"'continue' en dehors d'une boucle"}):_(`  JMP ${D[D.length-1].continueLabel}`);break;case"Block":at(y,O);break}}function we(y,O){const q=Me(y.condition);if(q!==null){q!==0?St(y.thenBranch,O):y.elseBranch&&St(y.elseBranch,O);return}const ie=E(),fe=E();Se(y.condition,y.elseBranch?ie:fe,O),St(y.thenBranch,O),y.elseBranch&&(_(`  JMP ${fe}`),_(`${ie}:`),St(y.elseBranch,O)),_(`${fe}:`)}function Ee(y,O){if(Me(y.condition)===0)return;const ie=E(),fe=E();_(`${ie}:`),Se(y.condition,fe,O),D.push({breakLabel:fe,continueLabel:ie}),St(y.body,O),D.pop(),_(`  JMP ${ie}`),_(`${fe}:`)}function $e(y,O){if(y.init&&St(y.init,O),(y.condition?Me(y.condition):null)===0)return;const ie=E(),fe=E(),Ne=E();_(`${ie}:`),y.condition&&Se(y.condition,Ne,O),D.push({breakLabel:Ne,continueLabel:fe}),St(y.body,O),D.pop(),_(`${fe}:`),y.update&&me(y.update,O),_(`  JMP ${ie}`),_(`${Ne}:`)}function me(y,O){switch(y.kind){case"NumberLiteral":_(`  LDA ${y.value}`);break;case"CharLiteral":_(`  LDA ${y.value}`);break;case"StringLiteral":a.push({line:y.line,message:`Une chaine littérale ne peut pas être utilisée comme expression ici; utilisez un caractère comme 'a' pour une seule case, ou print("...") pour afficher du texte`}),_("  LDA 0");break;case"Identifier":Cn(y.name,O,y.line);break;case"AssignExpr":me(y.value,O),hn(y.name,O,y.line);break;case"CompoundAssignExpr":{const q=Me(y.value);Cn(y.name,O,y.line),q!==null?y.op==="+="?_(`  ADD ${q}`):_(`  SUB ${q}`):y.value.kind==="Identifier"?(nt(y.value,O),y.op==="+="?_("  ADDB"):_("  SUBB")):(_(`  STA ${S(lt)}`),me(y.value,O),_(`  STA ${S(lt+1)}`),_(`  LDM ${S(lt)}`),_(`  LBM ${S(lt+1)}`),y.op==="+="?_("  ADDB"):_("  SUBB")),hn(y.name,O,y.line);break}case"BinaryExpr":{const q=Me(y);q!==null?_(`  LDA ${q}`):Zt(y,O)}break;case"UnaryExpr":{const q=Me(y);q!==null?_(`  LDA ${q}`):Ti(y,O)}break;case"PostfixExpr":Bn(y,O);break;case"IndexExpr":{const q=Za(y.arrayName,O,y.line);if(q!==null){const ie=Me(y.index);ie!==null?_(`  LDM ${S(q+ie)}`):(me(y.index,O),_(`  LDAI ${S(q)}`))}break}case"IndexAssignExpr":{const q=Za(y.arrayName,O,y.line);if(q!==null){if(Va(y.arrayName,O)){a.push({line:y.line,message:`Le tableau const "${y.arrayName}" ne peut pas être modifié`});break}const ie=Me(y.index);ie!==null?(me(y.value,O),_(`  STA ${S(q+ie)}`)):y.index.kind==="Identifier"?(me(y.value,O),nt(y.index,O),_(`  STAI ${S(q)}`)):(me(y.value,O),_("  PUSH"),me(y.index,O),_("  TAB"),_("  POP"),_(`  STAI ${S(q)}`))}break}case"CallExpr":zt(y,O);break}}function tt(y,O,q){const ie=Me(y);if(ie!==null){ie!==0&&_(`  JMP ${O}`);return}if(y.kind==="UnaryExpr"&&y.op==="!"){Se(y.operand,O,q);return}if(y.kind==="BinaryExpr"){if(["==","!=","<",">","<=",">="].includes(y.op)){st(y,!0,O,q);return}if(y.op==="&&"){const fe=E();Se(y.left,fe,q),tt(y.right,O,q),_(`${fe}:`);return}if(y.op==="||"){tt(y.left,O,q),tt(y.right,O,q);return}}me(y,q),_("  CMP 0"),_(`  JNZ ${O}`)}function Se(y,O,q){const ie=Me(y);if(ie!==null){ie===0&&_(`  JMP ${O}`);return}if(y.kind==="UnaryExpr"&&y.op==="!"){tt(y.operand,O,q);return}if(y.kind==="BinaryExpr"){if(["==","!=","<",">","<=",">="].includes(y.op)){st(y,!1,O,q);return}if(y.op==="&&"){Se(y.left,O,q),Se(y.right,O,q);return}if(y.op==="||"){const fe=E();tt(y.left,fe,q),Se(y.right,O,q),_(`${fe}:`);return}}me(y,q),_("  CMP 0"),_(`  JZ ${O}`)}function nt(y,O){const q=Me(y);if(q!==null)return _(`  LDB ${q}`),!0;switch(y.kind){case"Identifier":{const ie=O.localAddrs.get(y.name)??O.paramAddrs.get(y.name);if(ie!==void 0)return _(`  LBM ${S(ie)}`),!0;const fe=d.get(y.name);return fe!==void 0?(_(`  LBM ${S(fe)}`),!0):!1}default:return!1}}function st(y,O,q,ie){const fe=Me(y.right);switch(fe!==null?(me(y.left,ie),_(`  CMP ${fe}`)):Me(y.right)!==null||y.right.kind==="Identifier"?(me(y.left,ie),nt(y.right,ie),_("  CMPB")):Me(y.left)!==null||y.left.kind==="Identifier"?(me(y.right,ie),_(`  STA ${S(lt)}`),me(y.left,ie),_(`  LBM ${S(lt)}`),_("  CMPB")):(me(y.left,ie),_("  PUSH"),me(y.right,ie),_("  TAB"),_("  POP"),_("  CMPB")),y.op){case"==":_(O?`  JZ ${q}`:`  JNZ ${q}`);return;case"!=":_(O?`  JNZ ${q}`:`  JZ ${q}`);return;case"<":_(O?`  JC ${q}`:`  JNC ${q}`);return;case">":if(O){const Ne=E();_(`  JZ ${Ne}`),_(`  JC ${Ne}`),_(`  JMP ${q}`),_(`${Ne}:`)}else _(`  JZ ${q}`),_(`  JC ${q}`);return;case"<=":if(O)_(`  JZ ${q}`),_(`  JC ${q}`);else{const Ne=E();_(`  JZ ${Ne}`),_(`  JC ${Ne}`),_(`  JMP ${q}`),_(`${Ne}:`)}return;case">=":_(O?`  JNC ${q}`:`  JC ${q}`);return}}function Zt(y,O){const q=y.op,ie=Me(y.left),fe=Me(y.right);if(["==","!=","<",">","<=",">="].includes(q)){Dn(y,O);return}if(q==="&&"){const Ne=E(),Je=E();me(y.left,O),_("  CMP 0"),_(`  JZ ${Ne}`),me(y.right,O),_("  CMP 0"),_(`  JZ ${Ne}`),_("  LDA 1"),_(`  JMP ${Je}`),_(`${Ne}:`),_("  LDA 0"),_(`${Je}:`);return}if(q==="||"){const Ne=E(),Je=E();me(y.left,O),_("  CMP 0"),_(`  JNZ ${Ne}`),me(y.right,O),_("  CMP 0"),_(`  JNZ ${Ne}`),_("  LDA 0"),_(`  JMP ${Je}`),_(`${Ne}:`),_("  LDA 1"),_(`${Je}:`);return}if(q==="+"&&fe!==null){me(y.left,O),fe!==0&&_(`  ADD ${fe}`);return}if(q==="+"&&ie!==null){me(y.right,O),ie!==0&&_(`  ADD ${ie}`);return}if(q==="-"&&fe!==null){me(y.left,O),fe!==0&&_(`  SUB ${fe}`);return}if((q==="&"||q==="|"||q==="^")&&fe!==null){me(y.left,O),_(q==="&"?`  AND ${fe}`:q==="|"?`  OR ${fe}`:`  XOR ${fe}`);return}if((q==="&"||q==="|"||q==="^")&&ie!==null){me(y.right,O),_(q==="&"?`  AND ${ie}`:q==="|"?`  OR ${ie}`:`  XOR ${ie}`);return}if(q==="*"){if(fe===0||ie===0){_("  LDA 0");return}if(fe===1){me(y.left,O);return}if(ie===1){me(y.right,O);return}if(fe!==null&&X(fe)){me(y.left,O);for(let Ne=0;Ne<F(fe);Ne++)_("  SHL");return}if(ie!==null&&X(ie)){me(y.right,O);for(let Ne=0;Ne<F(ie);Ne++)_("  SHL");return}if(fe!==null){me(y.left,O),_(`  LDB ${fe}`),_("  MULB");return}if(ie!==null){me(y.right,O),_(`  LDB ${ie}`),_("  MULB");return}}if(q==="/"||q==="%"){if(q==="/"&&fe===1){me(y.left,O);return}if(q==="%"&&fe===1){_("  LDA 0");return}if(fe!==null&&X(fe)){if(me(y.left,O),q==="/")for(let Ne=0;Ne<F(fe);Ne++)_("  SHR");else _(`  AND ${fe-1}`);return}if(fe!==null){me(y.left,O),_(`  LDB ${fe}`),_(q==="/"?"  DIVB":"  MODB");return}}if(q==="<<"||q===">>"){if(fe===0){me(y.left,O);return}if(fe!==null&&fe<=4){me(y.left,O);for(let Ne=0;Ne<fe;Ne++)_(q==="<<"?"  SHL":"  SHR");return}me(y.left,O),fe!==null?_(`  LDB ${fe}`):(_("  PUSH"),me(y.right,O),_("  TAB"),_("  POP")),Zn(q==="<<"?"SHL":"SHR");return}switch(Me(y.right)!==null||y.right.kind==="Identifier"?(me(y.left,O),nt(y.right,O)):Me(y.left)!==null||y.left.kind==="Identifier"?(me(y.right,O),_(`  STA ${S(lt)}`),me(y.left,O),_(`  LBM ${S(lt)}`)):(me(y.left,O),_("  PUSH"),me(y.right,O),_("  TAB"),_("  POP")),q){case"+":_("  ADDB");break;case"-":_("  SUBB");break;case"&":_("  ANDB");break;case"|":_("  ORB");break;case"^":_("  XORB");break;case"*":_("  MULB");break;case"/":_("  DIVB");break;case"%":_("  MODB");break}}function Dn(y,O){const q=E(),ie=E();st(y,!0,q,O),_("  LDA 0"),_(`  JMP ${ie}`),_(`${q}:`),_("  LDA 1"),_(`${ie}:`)}function Zn(y){g.add(y==="SHL"?"shl":"shr"),_(`  CALL ${y==="SHL"?"__rt_shl":"__rt_shr"}`)}function Ti(y,O){if(y.op==="++"||y.op==="--"){y.operand.kind==="Identifier"?(Cn(y.operand.name,O,y.line),_(y.op==="++"?"  INC":"  DEC"),hn(y.operand.name,O,y.line)):(a.push({line:y.line,message:`L'opérateur '${y.op}' requiert une variable simple`}),_("  LDA 0"));return}switch(me(y.operand,O),y.op){case"-":_("  TAB"),_("  LDA 0"),_("  SUBB");break;case"!":{const q=E(),ie=E();_("  CMP 0"),_(`  JZ ${q}`),_("  LDA 0"),_(`  JMP ${ie}`),_(`${q}:`),_("  LDA 1"),_(`${ie}:`);break}case"~":_("  NOT");break}}function Bn(y,O,q=!0){y.operand.kind==="Identifier"?(Cn(y.operand.name,O,y.line),q&&_("  PUSH"),_(y.op==="++"?"  INC":"  DEC"),hn(y.operand.name,O,y.line),q&&_("  POP")):(a.push({line:y.line,message:`L'opérateur '${y.op}' requiert une variable simple`}),_("  LDA 0"))}function zt(y,O,q=!0){if(y.name==="putchar"){y.args.length>=1&&(me(y.args[0],O),_("  OUTA"));return}if(y.name==="print_num"){y.args.length>=1&&(me(y.args[0],O),_("  OUTD"));return}if(y.name==="array_len"){if(y.args.length>=1){const ke=y.args[0];if(ke.kind!=="Identifier"){a.push({line:y.line,message:"array_len() attend le nom d'un tableau déclaré"}),_("  LDA 0");return}const Ke=Qt(ke.name,O,ke.line);if(!Ke){_("  LDA 0");return}_(`  LDA ${Ke.size}`)}return}if(y.name==="string_len"){if(y.args.length>=1){const ke=y.args[0];if(ke.kind!=="Identifier"){a.push({line:y.line,message:"string_len() attend le nom d'un tableau déclaré"}),_("  LDA 0");return}const Ke=Qt(ke.name,O,ke.line);if(!Ke){_("  LDA 0");return}if(L.has(Ke.baseAddr)){_(`  CALL ${ne("strlen",Ke.baseAddr)}`);return}const ut=E(),It=E(),Q=lt,De=lt+1;_("  LDA 0"),_(`  STA ${S(Q)}`),_(`${ut}:`),_(`  LDM ${S(Q)}`),_(`  LDAI ${S(Ke.baseAddr)}`),_(`  STA ${S(De)}`),_("  CMP 0"),_(`  JZ ${It}`),_(`  LDM ${S(Q)}`),_("  INC"),_(`  STA ${S(Q)}`),_(`  JMP ${ut}`),_(`${It}:`),_(`  LDM ${S(Q)}`)}return}if(y.name==="print"){if(y.args.length>=1){const ke=y.args[0];if(ke.kind==="StringLiteral")for(const Ke of ke.value)_(`  OUT ${Ke.charCodeAt(0)}`);else if(ke.kind==="Identifier"){const Ke=Qt(ke.name,O,ke.line);if(!Ke)return;nn(Ke.baseAddr)}else a.push({line:y.line,message:"print() attend une chaine littérale ou le nom d'un buffer zero-termine"})}return}if(y.name==="color"){y.args.length>=1&&(me(y.args[0],O),_("  COLR")),y.args.length>=2&&(me(y.args[1],O),_("  COLG")),y.args.length>=3&&(me(y.args[2],O),_("  COLB"));return}if(y.name==="draw"){y.args.length>=2&&(Me(y.args[1])!==null||y.args[1].kind==="Identifier"?(me(y.args[0],O),nt(y.args[1],O)):(me(y.args[0],O),_("  PUSH"),me(y.args[1],O),_("  TAB"),_("  POP")),_("  DRAW"));return}if(y.name==="clear"){_("  CLR");return}if(y.name==="console_clear"){_("  CLCON");return}if(y.name==="getchar"){const ke=E();_(`${ke}:`),_("  INA"),_("  CMP 0"),_(`  JZ ${ke}`);return}if(y.name==="getchar_nb"){_("  INA");return}if(y.name==="getKey"){y.args.length>=1&&(me(y.args[0],O),_("  GETKEY"));return}if(y.name==="rand"){_("  RAND");return}if(y.name==="sleep"){y.args.length>=1&&(me(y.args[0],O),_("  SLEEP"));return}if(y.name==="drive_read"){y.args.length>=1&&(me(y.args[0],O),_("  DRVRD"));return}if(y.name==="drive_write"){y.args.length>=2&&(Me(y.args[1])!==null||y.args[1].kind==="Identifier"?(me(y.args[0],O),nt(y.args[1],O)):(me(y.args[0],O),_("  PUSH"),me(y.args[1],O),_("  TAB"),_("  POP")),_("  DRVWR"),q&&_("  TBA"));return}if(y.name==="drive_clear"){_("  DRVCLR");return}if(y.name==="drive_set_page"){y.args.length>=1&&(me(y.args[0],O),_("  DRVPG"));return}if(y.name==="drive_read_at"){y.args.length>=2&&(me(y.args[0],O),_("  DRVPG"),me(y.args[1],O),_("  DRVRD"));return}if(y.name==="drive_write_at"){y.args.length>=3&&(me(y.args[0],O),_("  DRVPG"),Me(y.args[2])!==null||y.args[2].kind==="Identifier"?(me(y.args[1],O),nt(y.args[2],O)):(me(y.args[1],O),_("  PUSH"),me(y.args[2],O),_("  TAB"),_("  POP")),_("  DRVWR"),q&&_("  TBA"));return}if(y.name==="boot_argc"){_(`  LDM ${S(al)}`);return}if(y.name==="boot_arg_page"){_(`  LDM ${S(bs)}`);return}if(y.name==="boot_arg_offset"){_(`  LDM ${S(ys)}`);return}if(y.name==="boot_arg_type"){_(`  LDM ${S(sr)}`);return}if(y.name==="boot_arg_start_page"){_(`  LDM ${S(aa)}`);return}if(y.name==="boot_arg_page_count"){_(`  LDM ${S(Nc)}`);return}if(y.name==="boot_arg_size"){_(`  LDM ${S(ia)}`);return}if(y.name==="boot_arg_index"){_(`  LDM ${S(Tc)}`);return}if(y.name==="boot_file_read"){y.args.length>=1&&(_(`  LDM ${S(aa)}`),_("  DRVPG"),me(y.args[0],O),_("  DRVRD"));return}if(y.name==="get"){y.args.length>=1&&(y.args[0].kind==="StringLiteral"?_(`  HTTPGET ${te(y.args[0].value)}`):a.push({line:y.line,message:"get() attend une URL sous forme de chaine litterale"}));return}if(y.name==="post"){y.args.length>=2&&(y.args[0].kind==="StringLiteral"&&y.args[1].kind==="StringLiteral"?_(`  HTTPPOST ${oe(y.args[0].value,y.args[1].value)}`):a.push({line:y.line,message:"post() attend une URL et un corps sous forme de chaines litterales"}));return}if(y.name==="gethttpchar"){const ke=E();_(`${ke}:`),_("  HTTPIN"),_(`  JC ${ke}`);return}const ie=b.get(y.name);if(!ie){a.push({line:y.line,message:`Fonction non définie: "${y.name}"`});return}const fe=O.recursive&&O.frameAddrs.length>0,Ne=[],Je=[],bt=new Set,Et=new Array(y.args.length).fill(!1);let $t=!1;for(let ke=y.args.length-1;ke>=0;ke--)Et[ke]=$t,R(y.args[ke])&&($t=!0);if(fe){P(`save ${O.frameAddrs.length} frame slot(s) before recursive call`);for(const ke of O.frameAddrs)_(`  LDM ${S(ke)}`),_("  PUSH")}for(let ke=0;ke<y.args.length;ke++){const Ke=y.args[ke],ut=ie.params[ke];if(!ut){me(Ke,O);continue}if(ut.arraySize!==null){if(Ke.kind!=="Identifier"){a.push({line:Ke.line,message:"Un argument de tableau doit être le nom d'un tableau déclaré"});continue}if(!Ut(Ke.name,O)){a.push({line:Ke.line,message:"Un argument de tableau doit être le nom d'un tableau déclaré"});continue}const It=Qt(Ke.name,O,Ke.line);if(!It||ut.baseAddr===void 0)continue;if(It.size<ut.arraySize){a.push({line:Ke.line,message:`Le tableau "${Ke.name}" est trop petit pour le paramètre "${ut.name}"`});continue}if($(It.baseAddr,ut.baseAddr,ut.arraySize),Je.push({srcBase:ut.baseAddr,destBase:It.baseAddr,size:ut.arraySize}),fe&&O.arrays.has(Ke.name))for(let Q=0;Q<ut.arraySize;Q++)bt.add(It.baseAddr+Q);continue}me(Ke,O),ut.addr!==void 0&&!Et[ke]?_(`  STA ${S(ut.addr)}`):ut.addr!==void 0&&(_("  PUSH"),Ne.push(ut.addr))}for(let ke=Ne.length-1;ke>=0;ke--)_("  POP"),_(`  STA ${S(Ne[ke])}`);_(`  CALL __${y.name}`),(Je.length>0||fe)&&_(`  STA ${S(Ux)}`);for(const ke of Je)$(ke.srcBase,ke.destBase,ke.size);if(fe)for(let ke=O.frameAddrs.length-1;ke>=0;ke--)_("  POP"),bt.has(O.frameAddrs[ke])||_(`  STA ${S(O.frameAddrs[ke])}`);(Je.length>0||fe)&&_(`  LDM ${S(Ux)}`)}function Qt(y,O,q){const ie=j(y,O);return ie||(a.push({line:q,message:`Tableau non défini: "${y}"`}),null)}function Ut(y,O){return O.arrays.has(y)||m.has(y)}function Mi(y,O){return O.constScalars.has(y)||x.has(y)}function Va(y,O){return O.constArrays.has(y)||h.has(y)}function Za(y,O,q){var ie;return((ie=Qt(y,O,q))==null?void 0:ie.baseAddr)??null}function Cn(y,O,q){if(Ut(y,O)){a.push({line:q,message:`"${y}" est un tableau, utilisez ${y}[index]`}),_("  LDA 0");return}const ie=O.localAddrs.get(y)??O.paramAddrs.get(y)??d.get(y);ie!==void 0?_(`  LDM ${S(ie)}`):(a.push({line:q,message:`Variable non définie: "${y}"`}),_("  LDA 0"))}function hn(y,O,q=0,ie=!1){if(Ut(y,O)){a.push({line:q,message:`"${y}" est un tableau, utilisez ${y}[index]`});return}if(!ie&&Mi(y,O)){a.push({line:q,message:`La variable const "${y}" ne peut pas être modifiée`});return}const fe=O.localAddrs.get(y)??O.paramAddrs.get(y)??d.get(y);fe!==void 0&&_(`  STA ${S(fe)}`)}}function hM(t){const a=[],i=new Map,l=[],o=t.split(`
`);for(let c=0;c<o.length;c++){const d=o[c],m=d.trim();if(m.startsWith("#define")){const x=m.match(/^#define\s+([A-Za-z_]\w*)\s+(.+)$/);x?(i.set(x[1],x[2].trim()),l.push("")):(a.push({phase:"preprocess",line:c+1,message:"Directive #define invalide"}),l.push(""))}else if(m.startsWith("#"))l.push("");else{let x=d;for(const[h,b]of i){const g=new RegExp(`\\b${h}\\b`,"g");x=x.replace(g,b)}l.push(x)}}return{processed:l.join(`
`),errors:a}}function ob(t){const a=[],{processed:i,errors:l}=hM(t);a.push(...l);const{tokens:o,errors:c}=uM(i);for(const g of c)a.push({phase:"lexer",line:g.line,message:g.message});if(o.length===0||c.length>0)return{success:!1,assembly:"",errors:a};const{program:d,errors:m}=dM(o);for(const g of m)a.push({phase:"parser",line:g.line,message:g.message});if(m.length>0)return{success:!1,assembly:"",errors:a};const{assembly:x,errors:h,memoryLayout:b}=mM(d);for(const g of h)a.push({phase:"codegen",line:g.line,message:g.message});return h.length>0?{success:!1,assembly:x,errors:a,memoryLayout:b}:{success:!0,assembly:x,errors:[],memoryLayout:b}}const cb=`; Editeur FS ASM
; Fichiers partages avec le bootloader
; Fleches = deplacer le curseur
; /o nom = ouvrir/creer, /n = newline, /d = delete avant curseur
; /s = sauver, @ = quitter
;
; RAM:
; 0x1000 = offset entree directory courante
; 0x1001 = page fichier
; 0x1002 = taille fichier
; 0x1003 = curseur
; 0x1004 = taille ligne saisie
; 0x1005 = offset scan / tmp
; 0x1006 = page scan / tmp
; 0x1007 = dirty
; 0x1008 = prev left
; 0x1009 = prev right
; 0x100A = prev up
; 0x100B = prev down
; 0x100C = free offset
; 0x100D = free page dir
; 0x100E = i
; 0x100F = j
; 0x1010 = new len / limit / next page libre
; 0x1011 = page entree directory courante
; 0x1012 = char courant / tmp
; 0x1013 = taille nom
; 0x1040 = buffer ligne
; 0x1100 = buffer texte

start:
  CALL ensure_drive
  LDA '/'
  STA 0x1040
  LDA 'o'
  STA 0x1041
  LDA ' '
  STA 0x1042
  LDA 'n'
  STA 0x1043
  LDA 'o'
  STA 0x1044
  LDA 't'
  STA 0x1045
  LDA 'e'
  STA 0x1046
  LDA 's'
  STA 0x1047
  LDA 8
  STA 0x1004
  CALL open_from_line
  LDA 0
  STA 0x1004
  LDM 0x1000
  CMP 255
  JNZ editor_ready
  OUT 'D'
  OUT 'I'
  OUT 'S'
  OUT 'K'
  OUT ' '
  OUT 'F'
  OUT 'U'
  OUT 'L'
  OUT 'L'
  OUT 10
  HLT

editor_ready:
  LDA 1
  STA 0x1007

main_loop:
  CALL poll_keys
  INA
  CMP 0
  JZ after_input
  STA 0x1012
  CMP 10
  JZ process_line
  LDM 0x1004
  CMP 47
  JNC after_input
  TAB
  LDM 0x1012
  STAI 0x1040
  LDM 0x1004
  INC
  STA 0x1004
  JMP after_input

process_line:
  LDM 0x1004
  CMP 0
  JZ clear_line
  CMP 1
  JNZ check_slash
  LDA 0
  LDAI 0x1040
  CMP '@'
  JNZ check_slash
  HLT

check_slash:
  LDA 0
  LDAI 0x1040
  CMP '/'
  JNZ do_insert_text
  LDM 0x1004
  CMP 4
  JNC maybe_open
  JMP maybe_short_command

maybe_open:
  LDA 1
  LDAI 0x1040
  CMP 'o'
  JNZ maybe_short_command
  LDA 2
  LDAI 0x1040
  CMP ' '
  JNZ maybe_short_command
  CALL open_from_line
  LDA 1
  STA 0x1007
  JMP clear_line

maybe_short_command:
  LDM 0x1004
  CMP 2
  JNZ do_insert_text
  LDA 1
  LDAI 0x1040
  CMP 's'
  JZ do_save
  CMP 'd'
  JZ do_delete
  CMP 'n'
  JZ do_newline
  JMP do_insert_text

do_save:
  CALL save_file
  LDA 1
  STA 0x1007
  JMP clear_line

do_delete:
  CALL delete_before
  LDA 1
  STA 0x1007
  JMP clear_line

do_newline:
  LDA 10
  STA 0x1040
  LDA 1
  STA 0x1004
  CALL insert_text
  LDA 1
  STA 0x1007
  JMP clear_line

do_insert_text:
  CALL insert_text
  LDA 1
  STA 0x1007

clear_line:
  LDA 0
  STA 0x1004

after_input:
  LDM 0x1007
  CMP 0
  JZ idle
  CALL redraw
  LDA 0
  STA 0x1007

idle:
  LDA 2
  SLEEP
  JMP main_loop

poll_keys:
  LDA 0
  GETKEY
  CMP 0
  JZ left_released
  LDM 0x1008
  CMP 0
  JNZ left_hold
  LDM 0x1003
  CMP 0
  JZ left_hold
  DEC
  STA 0x1003
  LDA 1
  STA 0x1007
left_hold:
  LDA 1
  STA 0x1008
  JMP check_right
left_released:
  LDA 0
  STA 0x1008

check_right:
  LDA 1
  GETKEY
  CMP 0
  JZ right_released
  LDM 0x1009
  CMP 0
  JNZ right_hold
  LDM 0x1003
  LBM 0x1002
  CMPB
  JZ right_hold
  INC
  STA 0x1003
  LDA 1
  STA 0x1007
right_hold:
  LDA 1
  STA 0x1009
  JMP check_up
right_released:
  LDA 0
  STA 0x1009

check_up:
  LDA 2
  GETKEY
  CMP 0
  JZ up_released
  LDM 0x100A
  CMP 0
  JNZ up_hold
  LDM 0x1003
  CMP 0
  JZ up_hold
  LDA 0
  STA 0x1003
  LDA 1
  STA 0x1007
up_hold:
  LDA 1
  STA 0x100A
  JMP check_down
up_released:
  LDA 0
  STA 0x100A

check_down:
  LDA 3
  GETKEY
  CMP 0
  JZ down_released
  LDM 0x100B
  CMP 0
  JNZ down_hold
  LDM 0x1003
  LBM 0x1002
  CMPB
  JZ down_hold
  LDM 0x1002
  STA 0x1003
  LDA 1
  STA 0x1007
down_hold:
  LDA 1
  STA 0x100B
  RET
down_released:
  LDA 0
  STA 0x100B
  RET

insert_text:
  LDM 0x1004
  CMP 0
  JZ insert_done
  LDM 0x1002
  LBM 0x1004
  ADDB
  JC insert_done
  STA 0x1010
  LDM 0x1002
  STA 0x100E

shift_check:
  LDM 0x100E
  LBM 0x1003
  CMPB
  JZ insert_copy
  DEC
  STA 0x100E
  LDM 0x100E
  LDAI 0x1100
  STA 0x1005
  LDM 0x100E
  TAB
  LDM 0x1004
  ADDB
  TAB
  LDM 0x1005
  STAI 0x1100
  JMP shift_check

insert_copy:
  LDA 0
  STA 0x100F

copy_check:
  LDM 0x100F
  LBM 0x1004
  CMPB
  JZ insert_finish
  LDM 0x100F
  LDAI 0x1040
  STA 0x1005
  LDM 0x1003
  TAB
  LDM 0x100F
  ADDB
  TAB
  LDM 0x1005
  STAI 0x1100
  LDM 0x100F
  INC
  STA 0x100F
  JMP copy_check

insert_finish:
  LDM 0x1010
  STA 0x1002
  LDM 0x1003
  LBM 0x1004
  ADDB
  STA 0x1003

insert_done:
  RET

delete_before:
  LDM 0x1003
  CMP 0
  JZ delete_done
  DEC
  STA 0x1003
  STA 0x100E
  LDM 0x1002
  DEC
  STA 0x1010

delete_loop:
  LDM 0x100E
  LBM 0x1010
  CMPB
  JZ delete_shrink
  LDM 0x100E
  INC
  LDAI 0x1100
  STA 0x1005
  LDM 0x100E
  TAB
  LDM 0x1005
  STAI 0x1100
  LDM 0x100E
  INC
  STA 0x100E
  JMP delete_loop

delete_shrink:
  LDM 0x1002
  DEC
  STA 0x1002

delete_done:
  RET

save_file:
  LDM 0x1001
  DRVPG
  LDA 0
  STA 0x100E

save_loop:
  LDM 0x100E
  LBM 0x1002
  CMPB
  JZ save_meta
  LDM 0x100E
  LDAI 0x1100
  STA 0x1005
  LDM 0x1005
  TAB
  LDM 0x100E
  DRVWR
  LDM 0x100E
  INC
  STA 0x100E
  JMP save_loop

save_meta:
  LDM 0x1011
  DRVPG
  LDM 0x1002
  TAB
  LDM 0x1000
  ADD 11
  DRVWR
  RET

load_file:
  LDM 0x1001
  DRVPG
  LDA 0
  STA 0x100E

load_loop:
  LDM 0x100E
  LBM 0x1002
  CMPB
  JZ load_done
  LDM 0x100E
  DRVRD
  STA 0x1005
  LDM 0x100E
  TAB
  LDM 0x1005
  STAI 0x1100
  LDM 0x100E
  INC
  STA 0x100E
  JMP load_loop

load_done:
  LDM 0x1002
  STA 0x1003
  RET

open_from_line:
  LDM 0x1004
  DEC
  DEC
  DEC
  STA 0x1013
  CMP 0
  JZ open_fail
  CMP 9
  JNC open_fail
  LDA 0
  STA 0x100F

validate_name:
  LDM 0x100F
  LBM 0x1013
  CMPB
  JZ open_scan_init
  LDM 0x100F
  TAB
  LDA 3
  ADDB
  LDAI 0x1040
  CMP ' '
  JZ open_fail
  LDM 0x100F
  INC
  STA 0x100F
  JMP validate_name

open_scan_init:
  LDA 255
  STA 0x100C
  LDA 0
  STA 0x100D
  LDA 4
  STA 0x1010
  LDA 16
  STA 0x1005
  LDA 0
  STA 0x1006
  LDA 0
  STA 0x100E

open_scan_loop:
  LDM 0x100E
  CMP 64
  JZ open_scan_done
  LDM 0x1006
  DRVPG
  LDM 0x1005
  DRVRD
  CMP 0
  JZ open_maybe_free
  CALL update_next_page
  CALL match_name
  CMP 1
  JZ open_found
  JMP open_next_slot

open_maybe_free:
  LDM 0x100C
  CMP 255
  JNZ open_next_slot
  LDM 0x1005
  STA 0x100C
  LDM 0x1006
  STA 0x100D
  JMP open_next_slot

open_found:
  LDM 0x1005
  ADD 8
  DRVRD
  CMP 1
  JNZ open_fail
  LDM 0x1005
  STA 0x1000
  LDM 0x1006
  STA 0x1011
  LDM 0x1005
  ADD 9
  DRVRD
  STA 0x1001
  LDM 0x1005
  ADD 11
  DRVRD
  STA 0x1002
  CALL load_file
  LDA 1
  RET

open_next_slot:
  LDM 0x1005
  ADD 12
  STA 0x1005
  JNC open_next_slot_same_page
  LDM 0x1006
  INC
  STA 0x1006
open_next_slot_same_page:
  LDM 0x100E
  INC
  STA 0x100E
  JMP open_scan_loop

open_scan_done:
  LDM 0x100C
  CMP 255
  JZ open_fail
  CALL init_name
  LDM 0x100C
  STA 0x1000
  LDM 0x100D
  STA 0x1011
  LDM 0x100D
  DRVPG
  LDM 0x1010
  STA 0x1001
  LDA 0
  STA 0x1002
  STA 0x1003
  LDA 1
  RET

open_fail:
  LDA 0
  RET

update_next_page:
  LDM 0x1005
  ADD 9
  DRVRD
  STA 0x1012
  LDM 0x1005
  ADD 10
  DRVRD
  TAB
  LDM 0x1012
  ADDB
  LBM 0x1010
  CMPB
  JNC update_store_page
  RET

update_store_page:
  STA 0x1010
  RET

match_name:
  LDA 0
  STA 0x100F

match_loop:
  LDM 0x100F
  CMP 8
  JZ match_yes
  LDM 0x1005
  TAB
  LDM 0x100F
  ADDB
  DRVRD
  STA 0x1012
  LDM 0x100F
  LBM 0x1013
  CMPB
  JNC match_need_zero
  LDM 0x100F
  TAB
  LDA 3
  ADDB
  LDAI 0x1040
  TAB
  LDM 0x1012
  CMPB
  JNZ match_no
  JMP match_next

match_need_zero:
  LDM 0x1012
  CMP 0
  JNZ match_no

match_next:
  LDM 0x100F
  INC
  STA 0x100F
  JMP match_loop

match_yes:
  LDA 1
  RET

match_no:
  LDA 0
  RET

init_name:
  LDM 0x100D
  DRVPG
  LDA 0
  STA 0x100F

init_name_loop:
  LDM 0x100F
  CMP 8
  JZ init_name_meta
  LDM 0x100F
  LBM 0x1013
  CMPB
  JNC init_name_zero
  LDM 0x100F
  TAB
  LDA 3
  ADDB
  LDAI 0x1040
  STA 0x1012
  LDM 0x100C
  TAB
  LDM 0x100F
  ADDB
  STA 0x1006
  LDM 0x1012
  TAB
  LDM 0x1006
  DRVWR
  JMP init_name_next

init_name_zero:
  LDM 0x100C
  TAB
  LDM 0x100F
  ADDB
  STA 0x1006
  LDA 0
  TAB
  LDM 0x1006
  DRVWR

init_name_next:
  LDM 0x100F
  INC
  STA 0x100F
  JMP init_name_loop

init_name_meta:
  LDA 1
  TAB
  LDM 0x100C
  ADD 8
  DRVWR
  LDM 0x1010
  TAB
  LDM 0x100C
  ADD 9
  DRVWR
  LDA 1
  TAB
  LDM 0x100C
  ADD 10
  DRVWR
  LDA 0
  TAB
  LDM 0x100C
  ADD 11
  DRVWR
  RET

print_current_name:
  LDM 0x1000
  CMP 255
  JNZ print_name_start
  OUT '?'
  RET

print_name_start:
  LDM 0x1011
  DRVPG
  LDA 0
  STA 0x100F

print_name_loop:
  LDM 0x100F
  CMP 8
  JZ print_name_done
  LDM 0x1000
  TAB
  LDM 0x100F
  ADDB
  DRVRD
  CMP 0
  JZ print_name_done
  OUTA
  LDM 0x100F
  INC
  STA 0x100F
  JMP print_name_loop

print_name_done:
  RET

ensure_drive:
  LDA 0
  DRVPG
  LDA 0
  DRVRD
  CMP 66
  JZ check_version
  CALL format_drive
  RET

check_version:
  LDA 1
  DRVRD
  CMP 3
  JZ ensure_done
  CALL format_drive

ensure_done:
  RET

format_drive:
  DRVCLR
  LDA 0
  DRVPG
  LDA 66
  TAB
  LDA 0
  DRVWR
  LDA 3
  TAB
  LDA 1
  DRVWR
  RET

redraw:
  CLCON
  OUT '='
  OUT '='
  OUT '='
  OUT ' '
  OUT 'E'
  OUT 'D'
  OUT 'I'
  OUT 'T'
  OUT 'E'
  OUT 'U'
  OUT 'R'
  OUT ' '
  OUT 'F'
  OUT 'S'
  OUT ' '
  OUT 'A'
  OUT 'S'
  OUT 'M'
  OUT ' '
  OUT '='
  OUT '='
  OUT '='
  OUT 10
  CALL print_current_name
  OUT ' '
  OUT '|'
  OUT ' '
  OUT '/'
  OUT 'o'
  OUT ' '
  OUT 'n'
  OUT 'o'
  OUT 'm'
  OUT ' '
  OUT '|'
  OUT ' '
  OUT 'a'
  OUT 'r'
  OUT 'r'
  OUT 'o'
  OUT 'w'
  OUT 's'
  OUT ' '
  OUT 'm'
  OUT 'o'
  OUT 'v'
  OUT 'e'
  OUT ' '
  OUT '|'
  OUT ' '
  OUT '/'
  OUT 'n'
  OUT ' '
  OUT 'n'
  OUT 'l'
  OUT ' '
  OUT '|'
  OUT ' '
  OUT '/'
  OUT 'd'
  OUT ' '
  OUT 'd'
  OUT 'e'
  OUT 'l'
  OUT ' '
  OUT '|'
  OUT ' '
  OUT '/'
  OUT 's'
  OUT ' '
  OUT 's'
  OUT 'a'
  OUT 'v'
  OUT 'e'
  OUT ' '
  OUT '|'
  OUT ' '
  OUT '@'
  OUT ' '
  OUT 'q'
  OUT 'u'
  OUT 'i'
  OUT 't'
  OUT 10
  OUT '['
  LDM 0x1003
  OUTD
  OUT '/'
  LDM 0x1002
  OUTD
  OUT ']'
  OUT 10
  LDA 0
  STA 0x100E

draw_loop:
  LDM 0x100E
  LBM 0x1002
  CMPB
  JZ draw_tail
  LDM 0x100E
  LBM 0x1003
  CMPB
  JNZ draw_char
  OUT '|'

draw_char:
  LDM 0x100E
  LDAI 0x1100
  OUTA
  LDM 0x100E
  INC
  STA 0x100E
  JMP draw_loop

draw_tail:
  LDM 0x1003
  LBM 0x1002
  CMPB
  JNZ draw_done
  OUT '|'

draw_done:
  OUT 10
  RET
`;function D0(t,a="  "){return Array.from(t).map(i=>`${a}OUT ${i.charCodeAt(0)}`).join(`
`)}function ua(t,a="  "){return Array.from(t).map(i=>`${a}LDA ${i.charCodeAt(0)}
${a}CALL draw_char_adv`).join(`
`)}const xM=`; glxnano - editeur plotter compact
; Lancez: run glxnano fichier
; Controles:
; - texte = insertion
; - BACKSPACE = effacer
; - ENTER = nouvelle ligne
; - LEFT/RIGHT = bouger
; - UP/DOWN = ligne precedente / suivante
; - \\ = sauver
; - TAB = zoom
; - & = theme
; - @ = quitter
;
; RAM
; 0x1000 = page LETTERS
; 0x1001 = page DIGITS
; 0x1002 = taille fichier
; 0x1003 = curseur
; 0x1004 = taille insertion
; 0x1005 = temp
; 0x1006 = page entree dir
; 0x1007 = page fichier
; 0x1008 = dirty
; 0x1009 = redraw
; 0x100A = zoom
; 0x100B = theme
; 0x100C = prev left
; 0x100D = prev right
; 0x100E = temp / i
; 0x100F = temp / j
; 0x1010 = draw x / temp
; 0x1011 = draw y
; 0x1012 = char temp
; 0x1013 = glyph offset
; 0x1014 = glyph page
; 0x1015 = debut vue
; 0x1016 = compteur lignes / tmp
; 0x1017 = compteur colonnes / tmp
; 0x1020 = status (0 ready 1 dirty 2 saved)
; 0x1021 = limite colonnes
; 0x1022 = limite lignes
; 0x1023 = pas vertical
; 0x1024 = pas horizontal
; 0x1025 = echelle pixel
; 0x1030 = offset entree dir fixe
; 0x1031 = draw row scratch
; 0x1032 = draw bits scratch
; 0x1033 = draw col scratch
; 0x1034 = scaled base / punct x
; 0x1035 = scaled off / punct y
; 0x1036 = scaled result
; 0x1038 = scaled base temp
; 0x1039 = scaled off temp
; 0x1040 = buffer insertion
; 0x1100 = buffer texte

start:
  CALL ensure_fs
  CALL find_fonts
  LDM 0x1000
  CMP 0
  JZ fail_fonts
  LDM 0x1001
  CMP 0
  JZ fail_fonts
  CALL load_boot_file
  LDA 0
  STA 0x1008
  STA 0x100A
  STA 0x100B
  STA 0x100C
  STA 0x100D
  STA 0x1015
  LDA 2
  STA 0x1020
  LDA 1
  STA 0x1009
  CALL set_metrics
  LDA 0
  STA 0x1003

main_loop:
  CALL poll_keys
  CALL poll_console
  LDM 0x1009
  CMP 0
  JZ editor_idle
  CALL ensure_cursor_visible
  CALL redraw
  LDA 0
  STA 0x1009
editor_idle:
  LDA 2
  SLEEP
  JMP main_loop

fail_no_arg:
  CLCON
${D0("RUN GLXNANO FILE\\n")}
  HLT

fail_bad_arg:
  CLCON
${D0("FILE ARG ONLY\\n")}
  HLT

fail_fonts:
  CLCON
${D0("NEED LETTERS DIGITS\\n")}
  HLT

ensure_fs:
  LDA 0
  DRVPG
  LDA 0
  DRVRD
  CMP 66
  JNZ fail_bad_arg
  LDA 1
  DRVRD
  CMP 3
  JNZ fail_bad_arg
  RET

load_boot_file:
  LDM ${al}
  CMP 0
  JZ fail_no_arg
  LDM ${sr}
  CMP 1
  JNZ fail_bad_arg
  LDM ${ys}
  STA 0x1030
  LDM ${bs}
  STA 0x1006
  LDM ${aa}
  STA 0x1007
  LDM ${ia}
  STA 0x1002
  CALL load_file
  RET

find_fonts:
  LDA 0
  STA 0x1000
  STA 0x1001
  LDA 16
  STA 0x100E
  LDA 0
  STA 0x100F
  STA 0x1016

font_scan_loop:
  LDM 0x1016
  CMP 64
  JZ font_scan_done
  LDM 0x100F
  DRVPG
  LDM 0x100E
  DRVRD
  CMP 0
  JZ font_next
  CALL entry_is_letters
  CMP 1
  JNZ font_check_digits
  LDM 0x100F
  DRVPG
  LDM 0x100E
  ADD 9
  DRVRD
  STA 0x1000
font_check_digits:
  CALL entry_is_digits
  CMP 1
  JNZ font_next
  LDM 0x100F
  DRVPG
  LDM 0x100E
  ADD 9
  DRVRD
  STA 0x1001
font_next:
  CALL next_dir_entry
  JMP font_scan_loop

font_scan_done:
  RET

entry_is_letters:
  LDM 0x100F
  DRVPG
  LDM 0x100E
  DRVRD
  CMP 'L'
  JNZ letters_no
  LDM 0x100E
  ADD 1
  DRVRD
  CMP 'E'
  JNZ letters_no
  LDM 0x100E
  ADD 2
  DRVRD
  CMP 'T'
  JNZ letters_no
  LDM 0x100E
  ADD 3
  DRVRD
  CMP 'T'
  JNZ letters_no
  LDM 0x100E
  ADD 4
  DRVRD
  CMP 'E'
  JNZ letters_no
  LDM 0x100E
  ADD 5
  DRVRD
  CMP 'R'
  JNZ letters_no
  LDM 0x100E
  ADD 6
  DRVRD
  CMP 'S'
  JNZ letters_no
  LDM 0x100E
  ADD 7
  DRVRD
  CMP 0
  JNZ letters_no
  LDM 0x100E
  ADD 8
  DRVRD
  CMP 1
  JNZ letters_no
  LDA 1
  RET
letters_no:
  LDA 0
  RET

entry_is_digits:
  LDM 0x100F
  DRVPG
  LDM 0x100E
  DRVRD
  CMP 'D'
  JNZ digits_no
  LDM 0x100E
  ADD 1
  DRVRD
  CMP 'I'
  JNZ digits_no
  LDM 0x100E
  ADD 2
  DRVRD
  CMP 'G'
  JNZ digits_no
  LDM 0x100E
  ADD 3
  DRVRD
  CMP 'I'
  JNZ digits_no
  LDM 0x100E
  ADD 4
  DRVRD
  CMP 'T'
  JNZ digits_no
  LDM 0x100E
  ADD 5
  DRVRD
  CMP 'S'
  JNZ digits_no
  LDM 0x100E
  ADD 6
  DRVRD
  CMP 0
  JNZ digits_no
  LDM 0x100E
  ADD 8
  DRVRD
  CMP 1
  JNZ digits_no
  LDA 1
  RET
digits_no:
  LDA 0
  RET

next_dir_entry:
  LDM 0x100E
  ADD 12
  STA 0x100E
  JNC next_dir_same_page
  LDM 0x100F
  INC
  STA 0x100F
next_dir_same_page:
  LDM 0x1016
  INC
  STA 0x1016
  RET

set_metrics:
  LDM 0x100A
  CMP 0
  JZ metrics_small
  LDA 28
  STA 0x1021
  LDA 14
  STA 0x1022
  LDA 12
  STA 0x1023
  LDA 8
  STA 0x1024
  LDA 2
  STA 0x1025
  RET
metrics_small:
  LDA 56
  STA 0x1021
  LDA 22
  STA 0x1022
  LDA 8
  STA 0x1023
  LDA 4
  STA 0x1024
  LDA 1
  STA 0x1025
  RET

poll_keys:
  CALL poll_left
  CALL poll_right
  CALL poll_up
  CALL poll_down
  RET

poll_left:
  LDA 0
  GETKEY
  CMP 0
  JZ key_left_released
  LDM 0x100C
  CMP 0
  JNZ key_left_hold
  LDM 0x1003
  CMP 0
  JZ key_left_hold
  DEC
  STA 0x1003
  LDA 1
  STA 0x1009
key_left_hold:
  LDA 1
  STA 0x100C
  RET
key_left_released:
  LDA 0
  STA 0x100C
  RET

poll_right:
  LDA 1
  GETKEY
  CMP 0
  JZ key_right_released
  LDM 0x100D
  CMP 0
  JNZ key_right_hold
  LDM 0x1003
  LBM 0x1002
  CMPB
  JZ key_right_hold
  INC
  STA 0x1003
  LDA 1
  STA 0x1009
key_right_hold:
  LDA 1
  STA 0x100D
  RET
key_right_released:
  LDA 0
  STA 0x100D
  RET

poll_up:
  LDA 2
  GETKEY
  CMP 0
  JZ key_up_released
  LDM 0x1018
  CMP 0
  JNZ key_up_hold
  CALL move_up_line
  LDA 1
  STA 0x1009
key_up_hold:
  LDA 1
  STA 0x1018
  RET
key_up_released:
  LDA 0
  STA 0x1018
  RET

poll_down:
  LDA 3
  GETKEY
  CMP 0
  JZ key_down_released
  LDM 0x1019
  CMP 0
  JNZ key_down_hold
  CALL move_down_line
  LDA 1
  STA 0x1009
key_down_hold:
  LDA 1
  STA 0x1019
  RET
key_down_released:
  LDA 0
  STA 0x1019
  RET

move_up_line:
  LDM 0x1003
  CMP 0
  JZ move_up_done
  STA 0x100E
move_up_seek_curr:
  LDM 0x100E
  CMP 0
  JZ move_up_zero
  DEC
  STA 0x100E
  LDM 0x100E
  LDAI 0x1100
  CMP 10
  JZ move_up_curr_found
  JMP move_up_seek_curr
move_up_zero:
  LDA 0
  STA 0x1003
  RET
move_up_curr_found:
  LDM 0x100E
  STA 0x100E
move_up_seek_prev:
  LDM 0x100E
  CMP 0
  JZ move_up_to_zero
  DEC
  STA 0x100E
  LDM 0x100E
  LDAI 0x1100
  CMP 10
  JZ move_up_prev_found
  JMP move_up_seek_prev
move_up_to_zero:
  LDA 0
  STA 0x1003
  RET
move_up_prev_found:
  LDM 0x100E
  INC
  STA 0x1003
move_up_done:
  RET

move_down_line:
  LDM 0x1003
  STA 0x100E
move_down_loop:
  LDM 0x100E
  LBM 0x1002
  CMPB
  JZ move_down_store
  LDM 0x100E
  LDAI 0x1100
  CMP 10
  JZ move_down_found
  LDM 0x100E
  INC
  STA 0x100E
  JMP move_down_loop
move_down_found:
  LDM 0x100E
  INC
  STA 0x100E
move_down_store:
  LDM 0x100E
  STA 0x1003
  RET

poll_console:
  INA
  CMP 0
  JZ console_done
  STA 0x1012
  CMP '@'
  JZ console_quit
  CMP 92
  JZ console_save
  CMP 9
  JZ console_zoom
  CMP '&'
  JZ console_theme
  CMP 8
  JZ console_backspace
  CMP 127
  JZ console_backspace
  CMP 10
  JZ console_newline
  CMP 32
  JN console_done
  CMP 127
  JNC console_done
  LDM 0x1012
  STA 0x1040
  LDA 1
  STA 0x1004
  CALL insert_text
  CALL mark_dirty
  RET

console_backspace:
  CALL delete_before
  CALL mark_dirty
  RET

console_newline:
  LDA 10
  STA 0x1040
  LDA 1
  STA 0x1004
  CALL insert_text
  CALL mark_dirty
  RET

console_save:
  CALL save_file
  LDA 0
  STA 0x1008
  LDA 2
  STA 0x1020
  LDA 1
  STA 0x1009
  RET

console_zoom:
  LDM 0x100A
  CMP 0
  JZ zoom_big
  LDA 0
  STA 0x100A
  JMP zoom_done
zoom_big:
  LDA 1
  STA 0x100A
zoom_done:
  CALL set_metrics
  LDA 1
  STA 0x1009
  RET

console_theme:
  LDM 0x100B
  INC
  CMP 3
  JNZ theme_store
  LDA 0
theme_store:
  STA 0x100B
  LDA 1
  STA 0x1009
  RET

console_quit:
  HLT

console_done:
  RET

mark_dirty:
  LDA 1
  STA 0x1008
  STA 0x1009
  STA 0x1020
  RET

ensure_cursor_visible:
  LDM 0x1003
  LBM 0x1015
  SUBB
  JN cursor_before_view
cursor_fit_retry:
  LDM 0x1015
  STA 0x100E
  LDA 0
  STA 0x1016
  STA 0x1017
cursor_fit_loop:
  LDM 0x100E
  LBM 0x1003
  CMPB
  JZ cursor_visible
  LDM 0x100E
  LBM 0x1002
  CMPB
  JZ cursor_visible
  LDM 0x100E
  LDAI 0x1100
  CMP 10
  JZ fit_newline
  LDM 0x1017
  INC
  STA 0x1017
  LDM 0x1017
  LBM 0x1021
  CMPB
  JNC fit_wrap
fit_next_char:
  LDM 0x100E
  INC
  STA 0x100E
  JMP cursor_fit_loop
fit_newline:
  CALL fit_advance_row
  LDM 0x100E
  INC
  STA 0x100E
  JMP cursor_fit_loop
fit_wrap:
  CALL fit_advance_row
  JMP cursor_fit_loop
cursor_before_view:
  CALL set_view_to_cursor_line
  JMP cursor_fit_retry
cursor_visible:
  RET

fit_advance_row:
  LDA 0
  STA 0x1017
  LDM 0x1016
  INC
  STA 0x1016
  LDM 0x1016
  LBM 0x1022
  CMPB
  JNC fit_scroll
  RET
fit_scroll:
  CALL scroll_view_one_row
  JMP cursor_fit_retry

set_view_to_cursor_line:
  LDM 0x1003
  STA 0x100E
line_seek_loop:
  LDM 0x100E
  CMP 0
  JZ line_seek_zero
  DEC
  STA 0x100E
  LDM 0x100E
  LDAI 0x1100
  CMP 10
  JZ line_seek_found
  JMP line_seek_loop
line_seek_zero:
  LDA 0
  STA 0x1015
  RET
line_seek_found:
  LDM 0x100E
  INC
  STA 0x1015
  RET

scroll_view_one_row:
  LDM 0x1015
  STA 0x100E
  LDA 0
  STA 0x1017
scroll_row_loop:
  LDM 0x100E
  LBM 0x1002
  CMPB
  JZ scroll_row_store
  LDM 0x100E
  LDAI 0x1100
  CMP 10
  JZ scroll_newline
  LDM 0x1017
  INC
  STA 0x1017
  LDM 0x100E
  INC
  STA 0x100E
  LDM 0x1017
  LBM 0x1021
  CMPB
  JNC scroll_row_store
  JMP scroll_row_loop
scroll_newline:
  LDM 0x100E
  INC
  STA 0x100E
scroll_row_store:
  LDM 0x100E
  STA 0x1015
  RET

insert_text:
  LDM 0x1004
  CMP 0
  JZ insert_done
  LDM 0x1002
  LBM 0x1004
  ADDB
  JC insert_done
  STA 0x1010
  LDM 0x1002
  STA 0x100E

insert_shift_check:
  LDM 0x100E
  LBM 0x1003
  CMPB
  JZ insert_copy
  DEC
  STA 0x100E
  LDM 0x100E
  LDAI 0x1100
  STA 0x1005
  LDM 0x100E
  TAB
  LDM 0x1004
  ADDB
  TAB
  LDM 0x1005
  STAI 0x1100
  JMP insert_shift_check

insert_copy:
  LDA 0
  STA 0x100F

insert_copy_check:
  LDM 0x100F
  LBM 0x1004
  CMPB
  JZ insert_finish
  LDM 0x100F
  LDAI 0x1040
  STA 0x1005
  LDM 0x1003
  TAB
  LDM 0x100F
  ADDB
  TAB
  LDM 0x1005
  STAI 0x1100
  LDM 0x100F
  INC
  STA 0x100F
  JMP insert_copy_check

insert_finish:
  LDM 0x1010
  STA 0x1002
  LDM 0x1003
  LBM 0x1004
  ADDB
  STA 0x1003

insert_done:
  RET

delete_before:
  LDM 0x1003
  CMP 0
  JZ delete_done
  DEC
  STA 0x1003
  STA 0x100E
  LDM 0x1002
  DEC
  STA 0x1010

delete_loop:
  LDM 0x100E
  LBM 0x1010
  CMPB
  JZ delete_shrink
  LDM 0x100E
  INC
  LDAI 0x1100
  STA 0x1005
  LDM 0x100E
  TAB
  LDM 0x1005
  STAI 0x1100
  LDM 0x100E
  INC
  STA 0x100E
  JMP delete_loop

delete_shrink:
  LDM 0x1002
  DEC
  STA 0x1002

delete_done:
  RET

save_file:
  LDM 0x1007
  DRVPG
  LDA 0
  STA 0x100E
save_loop:
  LDM 0x100E
  LBM 0x1002
  CMPB
  JZ save_meta
  LDM 0x100E
  LDAI 0x1100
  STA 0x1005
  LDM 0x1005
  TAB
  LDM 0x100E
  DRVWR
  LDM 0x100E
  INC
  STA 0x100E
  JMP save_loop
save_meta:
  LDM 0x1006
  DRVPG
  LDM 0x1002
  TAB
  LDM 0x1030
  ADD 11
  DRVWR
  RET

load_file:
  LDM 0x1007
  DRVPG
  LDA 0
  STA 0x100E
load_loop:
  LDM 0x100E
  LBM 0x1002
  CMPB
  JZ load_done
  LDM 0x100E
  DRVRD
  STA 0x1005
  LDM 0x100E
  TAB
  LDM 0x1005
  STAI 0x1100
  LDM 0x100E
  INC
  STA 0x100E
  JMP load_loop
load_done:
  RET

redraw:
  CLR
  CALL set_metrics
  CALL draw_text_area
  CALL draw_frame
  CALL set_ui_scale
  CALL draw_title
  CALL draw_file_bar
  CALL draw_status_bar
  CALL draw_help_bar
  CALL set_metrics
  RET

set_ui_scale:
  LDA 4
  STA 0x1024
  LDA 1
  STA 0x1025
  RET

draw_frame:
  CALL apply_frame_color
  LDA 0
  LDB 8
frame_top_loop:
  DRAW
  INC
  JNZ frame_top_loop
  LDA 0
  LDB 24
frame_mid_top:
  DRAW
  INC
  JNZ frame_mid_top
  LDA 0
  LDB 228
frame_mid_bottom:
  DRAW
  INC
  JNZ frame_mid_bottom
  LDA 0
  LDB 244
frame_bottom_loop:
  DRAW
  INC
  JNZ frame_bottom_loop
  LDA 8
  STA 0x100E
frame_left_loop:
  LDA 0
  LBM 0x100E
  DRAW
  LDM 0x100E
  INC
  STA 0x100E
  CMP 245
  JNZ frame_left_loop
  LDA 8
  STA 0x100E
frame_right_loop:
  LDA 255
  LBM 0x100E
  DRAW
  LDM 0x100E
  INC
  STA 0x100E
  CMP 245
  JNZ frame_right_loop
  RET

draw_title:
  CALL apply_title_color
  LDA 10
  STA 0x1010
  LDA 12
  STA 0x1011
${ua("GLXNANO")}
  RET

draw_file_bar:
  CALL apply_text_color
  LDA 10
  STA 0x1010
  LDA 30
  STA 0x1011
${ua("FILE ")}
  CALL draw_current_name
  LDA 32
  CALL draw_char_adv
  LDM 0x100A
  CMP 0
  JZ file_bar_small
${ua("BIG")}
  RET
file_bar_small:
${ua("SMALL")}
  RET

draw_status_bar:
  CALL apply_accent_color
  LDA 10
  STA 0x1010
  LDA 42
  STA 0x1011
${ua("STATE ")}
  LDM 0x1020
  CMP 1
  JZ status_dirty
  CMP 2
  JZ status_saved
${ua("READY")}
  JMP status_theme
status_dirty:
${ua("DIRTY")}
  JMP status_theme
status_saved:
${ua("SAVED")}
status_theme:
  LDA 32
  CALL draw_char_adv
${ua("THEME ")}
  LDM 0x100B
  ADD 48
  CALL draw_char_adv
  RET

draw_text_area:
  CALL apply_text_color
  LDM 0x1015
  STA 0x100E
  LDA 0
  STA 0x1016
  STA 0x1017
  LDA 10
  STA 0x1010
  LDA 58
  STA 0x1011
text_loop:
  LDM 0x1016
  LBM 0x1022
  CMPB
  JNC text_done
  LDM 0x100E
  LBM 0x1003
  CMPB
  JNZ text_check_end
  CALL draw_cursor_block
text_check_end:
  LDM 0x100E
  LBM 0x1002
  CMPB
  JZ text_done
  LDM 0x100E
  LDAI 0x1100
  CMP 10
  JZ text_newline
  LDM 0x1017
  LBM 0x1021
  CMPB
  JNC text_wrap
  LDM 0x100E
  LDAI 0x1100
  CALL draw_char_adv
  LDM 0x1017
  INC
  STA 0x1017
  LDM 0x100E
  INC
  STA 0x100E
  JMP text_loop
text_newline:
  LDM 0x100E
  INC
  STA 0x100E
  CALL advance_text_row
  JMP text_loop
text_wrap:
  CALL advance_text_row
  JMP text_loop
text_done:
  LDM 0x1003
  LBM 0x1002
  CMPB
  JNZ text_ret
  CALL draw_cursor_block
text_ret:
  RET

advance_text_row:
  LDA 10
  STA 0x1010
  LDM 0x1011
  LBM 0x1023
  ADDB
  STA 0x1011
  LDA 0
  STA 0x1017
  LDM 0x1016
  INC
  STA 0x1016
  RET

draw_help_bar:
  CALL set_ui_scale
  CALL apply_frame_color
  LDA 10
  STA 0x1010
  LDA 234
  STA 0x1011
${ua("ARROWS ENTER TAB AMP")}
  RET

draw_current_name:
  LDA 0
  STA 0x100E
name_loop:
  LDM 0x100E
  CMP 8
  JZ name_done
  LDM 0x1006
  DRVPG
  LDM 0x1030
  TAB
  LDM 0x100E
  ADDB
  DRVRD
  CMP 0
  JZ name_done
  CALL draw_char_adv
  LDM 0x100E
  INC
  STA 0x100E
  JMP name_loop
name_done:
  RET

apply_frame_color:
  LDM 0x100B
  CMP 1
  JZ frame_theme_one
  CMP 2
  JZ frame_theme_two
  LDA 30
  COLR
  LDA 210
  COLG
  LDA 255
  COLB
  RET
frame_theme_one:
  LDA 255
  COLR
  LDA 150
  COLG
  LDA 60
  COLB
  RET
frame_theme_two:
  LDA 90
  COLR
  LDA 255
  COLG
  LDA 160
  COLB
  RET

apply_title_color:
  LDM 0x100B
  CMP 1
  JZ title_theme_one
  CMP 2
  JZ title_theme_two
  LDA 180
  COLR
  LDA 255
  COLG
  LDA 255
  COLB
  RET
title_theme_one:
  LDA 255
  COLR
  LDA 230
  COLG
  LDA 120
  COLB
  RET
title_theme_two:
  LDA 220
  COLR
  LDA 255
  COLG
  LDA 200
  COLB
  RET

apply_text_color:
  LDM 0x100B
  CMP 1
  JZ text_theme_one
  CMP 2
  JZ text_theme_two
  LDA 150
  COLR
  LDA 255
  COLG
  LDA 220
  COLB
  RET
text_theme_one:
  LDA 255
  COLR
  LDA 240
  COLG
  LDA 200
  COLB
  RET
text_theme_two:
  LDA 230
  COLR
  LDA 255
  COLG
  LDA 235
  COLB
  RET

apply_accent_color:
  LDM 0x100B
  CMP 1
  JZ accent_theme_one
  CMP 2
  JZ accent_theme_two
  LDA 255
  COLR
  LDA 235
  COLG
  LDA 120
  COLB
  RET
accent_theme_one:
  LDA 255
  COLR
  LDA 120
  COLG
  LDA 220
  COLB
  RET
accent_theme_two:
  LDA 120
  COLR
  LDA 180
  COLG
  LDA 255
  COLB
  RET

draw_cursor_block:
  CALL apply_accent_color
  CALL punct_under
  CALL apply_text_color
  RET

draw_char_adv:
  CALL draw_char
  LDM 0x1010
  LBM 0x1024
  ADDB
  STA 0x1010
  RET

draw_char:
  CALL to_upper
  STA 0x1012
  CMP ' '
  JZ draw_char_ret
  SUB 'A'
  JN draw_char_digit
  CMP 26
  JNC draw_char_digit
  CALL mul5
  STA 0x1013
  LDM 0x1000
  STA 0x1014
  JMP draw_glyph
draw_char_digit:
  LDM 0x1012
  SUB '0'
  JN draw_char_punct
  CMP 10
  JNC draw_char_punct
  CALL mul5
  STA 0x1013
  LDM 0x1001
  STA 0x1014
  JMP draw_glyph

draw_char_punct:
  LDM 0x1012
  CMP '.'
  JZ punct_dot
  CMP ','
  JZ punct_comma
  CMP ':'
  JZ punct_colon
  CMP '!'
  JZ punct_bang
  CMP '?'
  JZ punct_q
  CMP '-'
  JZ punct_dash
  CMP '_'
  JZ punct_under
  CMP '/'
  JZ punct_slash
  CMP '+'
  JZ punct_plus
  CMP '='
  JZ punct_eq
  CMP 39
  JZ punct_tick
  CMP 34
  JZ punct_quote
  CMP '('
  JZ punct_lpar
  CMP ')'
  JZ punct_rpar
  RET

punct_dot:
  LDA 1
  STA 0x1033
  LDA 4
  STA 0x1034
  JMP punct_one
punct_comma:
  LDA 1
  STA 0x1033
  LDA 4
  STA 0x1034
  CALL punct_one
  LDA 0
  STA 0x1033
  LDA 5
  STA 0x1034
  JMP punct_one
punct_colon:
  LDA 1
  STA 0x1033
  LDA 1
  STA 0x1034
  CALL punct_one
  LDA 1
  STA 0x1033
  LDA 4
  STA 0x1034
  JMP punct_one
punct_bang:
  LDA 1
  STA 0x1033
  LDA 0
  STA 0x1034
  CALL punct_one
  LDA 1
  STA 0x1034
  CALL punct_one
  LDA 2
  STA 0x1034
  CALL punct_one
  LDA 1
  STA 0x1033
  LDA 4
  STA 0x1034
  JMP punct_one
punct_q:
  LDA 0
  STA 0x1033
  LDA 0
  STA 0x1034
  CALL punct_hline
  LDA 2
  STA 0x1033
  LDA 1
  STA 0x1034
  CALL punct_one
  LDA 1
  STA 0x1033
  LDA 2
  STA 0x1034
  CALL punct_one
  LDA 1
  STA 0x1033
  LDA 4
  STA 0x1034
  JMP punct_one
punct_dash:
  LDA 0
  STA 0x1033
  LDA 2
  STA 0x1034
  JMP punct_hline
punct_under:
  LDA 0
  STA 0x1033
  LDA 4
  STA 0x1034
  JMP punct_hline
punct_slash:
  RET
punct_plus:
  LDA 1
  STA 0x1033
  LDA 1
  STA 0x1034
  CALL punct_vline3
  LDA 0
  STA 0x1033
  LDA 2
  STA 0x1034
  JMP punct_hline
punct_eq:
  LDA 0
  STA 0x1033
  LDA 1
  STA 0x1034
  CALL punct_hline
  LDA 0
  STA 0x1033
  LDA 3
  STA 0x1034
  JMP punct_hline
punct_tick:
  LDA 1
  STA 0x1033
  LDA 0
  STA 0x1034
  CALL punct_one
  LDA 1
  STA 0x1034
  JMP punct_one
punct_quote:
  LDA 0
  STA 0x1033
  LDA 0
  STA 0x1034
  CALL punct_vline2
  LDA 2
  STA 0x1033
  LDA 0
  STA 0x1034
  JMP punct_vline2
punct_lpar:
  LDA 1
  STA 0x1033
  LDA 0
  STA 0x1034
  CALL punct_one
  LDA 0
  STA 0x1033
  LDA 1
  STA 0x1034
  CALL punct_one
  LDA 0
  STA 0x1033
  LDA 2
  STA 0x1034
  CALL punct_one
  LDA 0
  STA 0x1033
  LDA 3
  STA 0x1034
  CALL punct_one
  LDA 1
  STA 0x1033
  LDA 4
  STA 0x1034
  JMP punct_one
punct_rpar:
  LDA 1
  STA 0x1033
  LDA 0
  STA 0x1034
  CALL punct_one
  LDA 2
  STA 0x1033
  LDA 1
  STA 0x1034
  CALL punct_one
  LDA 2
  STA 0x1033
  LDA 2
  STA 0x1034
  CALL punct_one
  LDA 2
  STA 0x1033
  LDA 3
  STA 0x1034
  CALL punct_one
  LDA 1
  STA 0x1033
  LDA 4
  STA 0x1034
  JMP punct_one

punct_hline:
  CALL punct_one
  LDM 0x1033
  INC
  STA 0x1033
  CALL punct_one
  LDM 0x1033
  INC
  STA 0x1033
  JMP punct_one

punct_vline2:
  CALL punct_one
  LDM 0x1034
  INC
  STA 0x1034
  JMP punct_one

punct_vline3:
  CALL punct_one
  LDM 0x1034
  INC
  STA 0x1034
  CALL punct_one
  LDM 0x1034
  INC
  STA 0x1034

punct_one:
  LDM 0x1010
  LBM 0x1033
  CALL scaled_add
  STA 0x101A
  LDM 0x1011
  LBM 0x1034
  CALL scaled_add
  STA 0x101B
  LDM 0x101B
  TAB
  LDM 0x101A
  CALL plot_scaled_pixel
  RET

draw_glyph:
  LDA 0
  STA 0x1031
glyph_row_loop:
  LDM 0x1031
  CMP 5
  JZ draw_char_ret
  LDM 0x1014
  DRVPG
  LDM 0x1013
  TAB
  LDM 0x1031
  ADDB
  DRVRD
  STA 0x1032
  LDA 0
  STA 0x1033
glyph_col_loop:
  LDM 0x1033
  CMP 3
  JZ glyph_next_row
  LDM 0x1033
  CMP 0
  JZ glyph_bit4
  CMP 1
  JZ glyph_bit2
  LDM 0x1032
  AND 1
  JMP glyph_check
glyph_bit2:
  LDM 0x1032
  AND 2
  JMP glyph_check
glyph_bit4:
  LDM 0x1032
  AND 4
glyph_check:
  CMP 0
  JZ glyph_skip_pixel
  LDM 0x1010
  LBM 0x1033
  CALL scaled_add
  STA 0x101A
  LDM 0x1011
  LBM 0x1031
  CALL scaled_add
  STA 0x101B
  LDM 0x101B
  TAB
  LDM 0x101A
  CALL plot_scaled_pixel
glyph_skip_pixel:
  LDM 0x1033
  INC
  STA 0x1033
  JMP glyph_col_loop
glyph_next_row:
  LDM 0x1031
  INC
  STA 0x1031
  JMP glyph_row_loop

plot_scaled_pixel:
  STA 0x101A
  TBA
  STA 0x101B
  LDM 0x101B
  TAB
  LDM 0x101A
  DRAW
  LDM 0x1025
  CMP 1
  JZ plot_scaled_done
  LDM 0x101B
  TAB
  LDM 0x101A
  INC
  DRAW
  LDM 0x101B
  INC
  TAB
  LDM 0x101A
  DRAW
  LDM 0x101B
  INC
  TAB
  LDM 0x101A
  INC
  DRAW
  RET
plot_scaled_done:
  RET

draw_char_ret:
  RET

mul5:
  STA 0x1033
  SHL
  SHL
  TAB
  LDM 0x1033
  ADDB
  RET

scaled_add:
  STA 0x1038
  TBA
  STA 0x1039
  LDM 0x1038
  TAB
  LDM 0x1039
  ADDB
  STA 0x1036
  LDM 0x1025
  CMP 1
  JZ scaled_add_done
  LDM 0x1036
  TAB
  LDM 0x1039
  ADDB
  STA 0x1036
scaled_add_done:
  LDM 0x1036
  RET

to_upper:
  CMP 'a'
  JN upper_ret
  CMP '{'
  JNC upper_ret
  SUB 32
upper_ret:
  RET
`,ub=`; Super Unix Shell Plotter
; Graphical shell that uses LETTERS and DIGITS from the shared bootloader FS.
; Controls:
; - type commands in the console input field, press Enter
; - UP/DOWN = move selection
; - LEFT = help, RIGHT = preview
; Commands:
; - HELP
; - LS
; - CAT NAME
; - CLS
; - QUIT
;
; RAM
; 0x1000 = letters font page
; 0x1001 = digits font page
; 0x1002 = selected used-entry index
; 0x1003 = total used entries
; 0x1004 = scroll index
; 0x1005 = dirty
; 0x1006 = command length
; 0x1007 = selected dir base
; 0x1008 = selected dir page
; 0x1009 = selected type
; 0x100A = selected data page
; 0x100B = selected page count
; 0x100C = selected size
; 0x100D = temp / loop
; 0x100E = temp / loop
; 0x100F = temp / loop
; 0x1010 = draw x
; 0x1011 = draw y
; 0x1012 = char temp
; 0x1013 = glyph offset
; 0x1014 = glyph page
; 0x1015 = status code
; 0x1016 = view mode (0=preview 1=help)
; 0x1017 = line / display y
; 0x1018 = used count temp
; 0x1019 = prev up
; 0x101A = prev down
; 0x101B = prev left
; 0x101C = prev right
; 0x1040 = command buffer

start:
  CALL ensure_fs
  CALL find_fonts
  LDM 0x1000
  CMP 0
  JZ fail_fonts
  LDM 0x1001
  CMP 0
  JZ fail_fonts
  LDA 0
  STA 0x1002
  STA 0x1004
  STA 0x1006
  STA 0x1015
  STA 0x1016
  STA 0x1019
  STA 0x101A
  STA 0x101B
  STA 0x101C
  CALL recount_entries
  LDA 1
  STA 0x1005

main_loop:
  CALL poll_keys
  CALL poll_console
  LDM 0x1005
  CMP 0
  JZ shell_idle
  CALL redraw
  LDA 0
  STA 0x1005
shell_idle:
  LDA 2
  SLEEP
  JMP main_loop

fail_fs:
  CLCON
  OUT 'N'
  OUT 'E'
  OUT 'E'
  OUT 'D'
  OUT ' '
  OUT 'B'
  OUT 'O'
  OUT 'O'
  OUT 'T'
  OUT ' '
  OUT 'F'
  OUT 'S'
  OUT 10
  HLT

fail_fonts:
  CLCON
  OUT 'N'
  OUT 'E'
  OUT 'E'
  OUT 'D'
  OUT ' '
  OUT 'L'
  OUT 'E'
  OUT 'T'
  OUT 'T'
  OUT 'E'
  OUT 'R'
  OUT 'S'
  OUT ' '
  OUT 'D'
  OUT 'I'
  OUT 'G'
  OUT 'I'
  OUT 'T'
  OUT 'S'
  OUT 10
  HLT

ensure_fs:
  LDA 0
  DRVPG
  LDA 0
  DRVRD
  CMP 66
  JNZ fail_fs
  LDA 1
  DRVRD
  CMP 3
  JNZ fail_fs
  RET

find_fonts:
  LDA 0
  STA 0x1000
  STA 0x1001
  LDA 16
  STA 0x100D
  LDA 0
  STA 0x100E
  STA 0x100F

font_scan_loop:
  LDM 0x100F
  CMP 64
  JZ font_scan_done
  LDM 0x100E
  DRVPG
  LDM 0x100D
  DRVRD
  CMP 0
  JZ font_next
  CALL entry_is_letters
  CMP 1
  JNZ check_digits_font
  LDM 0x100E
  DRVPG
  LDM 0x100D
  ADD 9
  DRVRD
  STA 0x1000
check_digits_font:
  CALL entry_is_digits
  CMP 1
  JNZ font_next
  LDM 0x100E
  DRVPG
  LDM 0x100D
  ADD 9
  DRVRD
  STA 0x1001
font_next:
  CALL next_dir_entry
  JMP font_scan_loop

font_scan_done:
  RET

entry_is_letters:
  LDM 0x100E
  DRVPG
  LDM 0x100D
  DRVRD
  CMP 'L'
  JNZ letters_no
  LDM 0x100D
  ADD 1
  DRVRD
  CMP 'E'
  JNZ letters_no
  LDM 0x100D
  ADD 2
  DRVRD
  CMP 'T'
  JNZ letters_no
  LDM 0x100D
  ADD 3
  DRVRD
  CMP 'T'
  JNZ letters_no
  LDM 0x100D
  ADD 4
  DRVRD
  CMP 'E'
  JNZ letters_no
  LDM 0x100D
  ADD 5
  DRVRD
  CMP 'R'
  JNZ letters_no
  LDM 0x100D
  ADD 6
  DRVRD
  CMP 'S'
  JNZ letters_no
  LDM 0x100D
  ADD 7
  DRVRD
  CMP 0
  JNZ letters_no
  LDM 0x100D
  ADD 8
  DRVRD
  CMP 1
  JNZ letters_no
  LDA 1
  RET
letters_no:
  LDA 0
  RET

entry_is_digits:
  LDM 0x100E
  DRVPG
  LDM 0x100D
  DRVRD
  CMP 'D'
  JNZ digits_no
  LDM 0x100D
  ADD 1
  DRVRD
  CMP 'I'
  JNZ digits_no
  LDM 0x100D
  ADD 2
  DRVRD
  CMP 'G'
  JNZ digits_no
  LDM 0x100D
  ADD 3
  DRVRD
  CMP 'I'
  JNZ digits_no
  LDM 0x100D
  ADD 4
  DRVRD
  CMP 'T'
  JNZ digits_no
  LDM 0x100D
  ADD 5
  DRVRD
  CMP 'S'
  JNZ digits_no
  LDM 0x100D
  ADD 6
  DRVRD
  CMP 0
  JNZ digits_no
  LDM 0x100D
  ADD 8
  DRVRD
  CMP 1
  JNZ digits_no
  LDA 1
  RET
digits_no:
  LDA 0
  RET

next_dir_entry:
  LDM 0x100D
  ADD 12
  STA 0x100D
  JNC next_dir_done
  LDM 0x100E
  INC
  STA 0x100E
next_dir_done:
  LDM 0x100F
  INC
  STA 0x100F
  RET

recount_entries:
  LDA 0
  STA 0x1003
  LDA 16
  STA 0x100D
  LDA 0
  STA 0x100E
  STA 0x100F

recount_loop:
  LDM 0x100F
  CMP 64
  JZ recount_done
  LDM 0x100E
  DRVPG
  LDM 0x100D
  DRVRD
  CMP 0
  JZ recount_next
  LDM 0x1003
  INC
  STA 0x1003
recount_next:
  CALL next_dir_entry
  JMP recount_loop

recount_done:
  LDM 0x1003
  CMP 0
  JNZ recount_non_empty
  LDA 0
  STA 0x1002
  STA 0x1004
  RET

recount_non_empty:
  LDM 0x1003
  TAB
  LDM 0x1002
  CMPB
  JNC clamp_selected
  JMP clamp_scroll

clamp_selected:
  LDM 0x1003
  DEC
  STA 0x1002

clamp_scroll:
  LDM 0x1004
  LBM 0x1002
  CMPB
  JNC fix_scroll_to_selected
  LDM 0x1002
  SUB 12
  JN scroll_ok
  INC
  STA 0x1004
  RET
fix_scroll_to_selected:
  LDM 0x1002
  STA 0x1004
scroll_ok:
  RET

poll_keys:
  CALL poll_up
  CALL poll_down
  CALL poll_left
  CALL poll_right
  RET

poll_up:
  LDA 2
  GETKEY
  CMP 0
  JZ up_released
  LDM 0x1019
  CMP 0
  JNZ up_hold
  LDM 0x1002
  CMP 0
  JZ up_hold
  DEC
  STA 0x1002
  LDM 0x1002
  LBM 0x1004
  CMPB
  JNC up_dirty
  LDM 0x1002
  STA 0x1004
up_dirty:
  LDA 0
  STA 0x1016
  LDA 1
  STA 0x1005
up_hold:
  LDA 1
  STA 0x1019
  RET
up_released:
  LDA 0
  STA 0x1019
  RET

poll_down:
  LDA 3
  GETKEY
  CMP 0
  JZ down_released
  LDM 0x101A
  CMP 0
  JNZ down_hold
  LDM 0x1003
  TAB
  LDM 0x1002
  INC
  CMPB
  JNC down_hold
  LDM 0x1002
  INC
  STA 0x1002
  LDM 0x1002
  LBM 0x1004
  SUBB
  CMP 12
  JN down_dirty
  LDM 0x1004
  INC
  STA 0x1004
down_dirty:
  LDA 0
  STA 0x1016
  LDA 1
  STA 0x1005
down_hold:
  LDA 1
  STA 0x101A
  RET
down_released:
  LDA 0
  STA 0x101A
  RET

poll_left:
  LDA 0
  GETKEY
  CMP 0
  JZ left_released
  LDM 0x101B
  CMP 0
  JNZ left_hold
  LDA 1
  STA 0x1016
  LDA 1
  STA 0x1005
left_hold:
  LDA 1
  STA 0x101B
  RET
left_released:
  LDA 0
  STA 0x101B
  RET

poll_right:
  LDA 1
  GETKEY
  CMP 0
  JZ right_released
  LDM 0x101C
  CMP 0
  JNZ right_hold
  LDA 0
  STA 0x1016
  LDA 1
  STA 0x1005
right_hold:
  LDA 1
  STA 0x101C
  RET
right_released:
  LDA 0
  STA 0x101C
  RET

poll_console:
  INA
  CMP 0
  JZ console_done
  STA 0x1012
  CMP 10
  JZ execute_and_clear
  CMP 8
  JZ console_backspace
  CMP 127
  JZ console_backspace
  LDM 0x1006
  CMP 31
  JNC console_done
  TAB
  LDM 0x1012
  CALL to_upper
  STAI 0x1040
  LDM 0x1006
  INC
  STA 0x1006
  LDA 1
  STA 0x1005
  RET

console_backspace:
  LDM 0x1006
  CMP 0
  JZ console_done
  DEC
  STA 0x1006
  LDA 1
  STA 0x1005
console_done:
  RET

execute_and_clear:
  CALL execute_command
  LDA 0
  STA 0x1006
  LDA 1
  STA 0x1005
  RET

execute_command:
  LDM 0x1006
  CMP 0
  JZ command_ret
  CALL cmd_is_quit
  CMP 1
  JNZ check_help_cmd
  HLT

check_help_cmd:
  CALL cmd_is_help
  CMP 1
  JNZ check_ls_cmd
  LDA 1
  STA 0x1016
  LDA 0
  STA 0x1015
  RET

check_ls_cmd:
  CALL cmd_is_ls
  CMP 1
  JNZ check_cls_cmd
  CALL recount_entries
  LDA 0
  STA 0x1015
  STA 0x1016
  RET

check_cls_cmd:
  CALL cmd_is_cls
  CMP 1
  JNZ check_cat_cmd
  LDA 0
  STA 0x1015
  STA 0x1016
  RET

check_cat_cmd:
  CALL cmd_is_cat
  CMP 1
  JNZ bad_command
  CALL find_entry_from_command
  CMP 1
  JNZ not_found_status
  LDA 0
  STA 0x1015
  STA 0x1016
  RET

bad_command:
  LDA 2
  STA 0x1015
  RET

not_found_status:
  LDA 1
  STA 0x1015
  RET

command_ret:
  RET

cmd_is_help:
  LDM 0x1006
  CMP 4
  JNZ cmd_help_no
  LDA 0
  LDAI 0x1040
  CMP 'H'
  JNZ cmd_help_no
  LDA 1
  LDAI 0x1040
  CMP 'E'
  JNZ cmd_help_no
  LDA 2
  LDAI 0x1040
  CMP 'L'
  JNZ cmd_help_no
  LDA 3
  LDAI 0x1040
  CMP 'P'
  JNZ cmd_help_no
  LDA 1
  RET
cmd_help_no:
  LDA 0
  RET

cmd_is_ls:
  LDM 0x1006
  CMP 2
  JNZ cmd_ls_no
  LDA 0
  LDAI 0x1040
  CMP 'L'
  JNZ cmd_ls_no
  LDA 1
  LDAI 0x1040
  CMP 'S'
  JNZ cmd_ls_no
  LDA 1
  RET
cmd_ls_no:
  LDA 0
  RET

cmd_is_cls:
  LDM 0x1006
  CMP 3
  JNZ cmd_cls_no
  LDA 0
  LDAI 0x1040
  CMP 'C'
  JNZ cmd_cls_no
  LDA 1
  LDAI 0x1040
  CMP 'L'
  JNZ cmd_cls_no
  LDA 2
  LDAI 0x1040
  CMP 'S'
  JNZ cmd_cls_no
  LDA 1
  RET
cmd_cls_no:
  LDA 0
  RET

cmd_is_quit:
  LDM 0x1006
  CMP 4
  JNZ cmd_quit_no
  LDA 0
  LDAI 0x1040
  CMP 'Q'
  JNZ cmd_quit_no
  LDA 1
  LDAI 0x1040
  CMP 'U'
  JNZ cmd_quit_no
  LDA 2
  LDAI 0x1040
  CMP 'I'
  JNZ cmd_quit_no
  LDA 3
  LDAI 0x1040
  CMP 'T'
  JNZ cmd_quit_no
  LDA 1
  RET
cmd_quit_no:
  LDA 0
  RET

cmd_is_cat:
  LDM 0x1006
  CMP 5
  JN cmd_cat_no
  LDA 0
  LDAI 0x1040
  CMP 'C'
  JNZ cmd_cat_no
  LDA 1
  LDAI 0x1040
  CMP 'A'
  JNZ cmd_cat_no
  LDA 2
  LDAI 0x1040
  CMP 'T'
  JNZ cmd_cat_no
  LDA 3
  LDAI 0x1040
  CMP ' '
  JNZ cmd_cat_no
  LDA 1
  RET
cmd_cat_no:
  LDA 0
  RET

find_entry_from_command:
  LDA 16
  STA 0x100D
  LDA 0
  STA 0x100E
  STA 0x100F
  STA 0x1018

find_cmd_loop:
  LDM 0x100F
  CMP 64
  JZ find_cmd_fail
  LDM 0x100E
  DRVPG
  LDM 0x100D
  DRVRD
  CMP 0
  JZ find_cmd_next
  CALL entry_matches_command_name
  CMP 1
  JNZ find_cmd_count
  LDM 0x1018
  STA 0x1002
  CALL adjust_scroll
  LDA 1
  RET
find_cmd_count:
  LDM 0x1018
  INC
  STA 0x1018
find_cmd_next:
  CALL next_dir_entry
  JMP find_cmd_loop

find_cmd_fail:
  LDA 0
  RET

adjust_scroll:
  LDM 0x1002
  LBM 0x1004
  CMPB
  JNC adjust_lower_ok
  LDM 0x1002
  STA 0x1004
adjust_lower_ok:
  LDM 0x1002
  SUB 11
  JN adjust_ret
  LDM 0x1004
  TAB
  LDM 0x1002
  SUB 11
  CMPB
  JNC adjust_store
  RET
adjust_store:
  LDM 0x1002
  SUB 11
  STA 0x1004
adjust_ret:
  RET

entry_matches_command_name:
  LDM 0x1006
  SUB 4
  STA 0x1017
  LDA 0
  STA 0x1013

match_cmd_loop:
  LDM 0x1013
  CMP 8
  JZ match_cmd_yes
  LDM 0x100E
  DRVPG
  LDM 0x100D
  TAB
  LDM 0x1013
  ADDB
  DRVRD
  CALL to_upper
  STA 0x1012
  LDM 0x1013
  LBM 0x1017
  CMPB
  JNC match_cmd_need_zero
  LDM 0x1013
  ADD 4
  LDAI 0x1040
  CALL to_upper
  TAB
  LDM 0x1012
  CMPB
  JNZ match_cmd_no
  JMP match_cmd_next

match_cmd_need_zero:
  LDM 0x1012
  CMP 0
  JNZ match_cmd_no

match_cmd_next:
  LDM 0x1013
  INC
  STA 0x1013
  JMP match_cmd_loop

match_cmd_yes:
  LDA 1
  RET
match_cmd_no:
  LDA 0
  RET

locate_selected_entry:
  LDM 0x1003
  CMP 0
  JNZ locate_start
  LDA 255
  STA 0x1007
  RET

locate_start:
  LDA 16
  STA 0x100D
  LDA 0
  STA 0x100E
  STA 0x100F
  STA 0x1018

locate_loop:
  LDM 0x100F
  CMP 64
  JZ locate_fail
  LDM 0x100E
  DRVPG
  LDM 0x100D
  DRVRD
  CMP 0
  JZ locate_next
  LDM 0x1018
  LBM 0x1002
  CMPB
  JZ locate_found
  LDM 0x1018
  INC
  STA 0x1018
locate_next:
  CALL next_dir_entry
  JMP locate_loop

locate_found:
  LDM 0x100D
  STA 0x1007
  LDM 0x100E
  STA 0x1008
  LDM 0x100E
  DRVPG
  LDM 0x100D
  ADD 8
  DRVRD
  STA 0x1009
  LDM 0x100D
  ADD 9
  DRVRD
  STA 0x100A
  LDM 0x100D
  ADD 10
  DRVRD
  STA 0x100B
  LDM 0x100D
  ADD 11
  DRVRD
  STA 0x100C
  RET

locate_fail:
  LDA 255
  STA 0x1007
  RET

redraw:
  CLR
  CALL draw_frame
  CALL draw_title
  CALL draw_list_panel
  CALL draw_preview_panel
  CALL draw_status_line
  CALL draw_command_line
  RET

draw_frame:
  LDA 20
  COLR
  LDA 140
  COLG
  LDA 210
  COLB
  LDA 0
  LDB 12
frame_top:
  DRAW
  INC
  JNZ frame_top
  LDA 0
  LDB 232
frame_bottom:
  DRAW
  INC
  JNZ frame_bottom
  LDA 112
  LDB 12
frame_mid:
  DRAW
  TBA
  INC
  TAB
  CMP 232
  JNZ frame_mid
  RET

draw_title:
  LDA 40
  COLR
  LDA 220
  COLG
  LDA 255
  COLB
  LDA 4
  STA 0x1010
  LDA 3
  STA 0x1011
  LDA 'S'
  CALL draw_char_adv
  LDA 'U'
  CALL draw_char_adv
  LDA 'P'
  CALL draw_char_adv
  LDA 'E'
  CALL draw_char_adv
  LDA 'R'
  CALL draw_char_adv
  LDA ' '
  CALL draw_char_adv
  LDA 'S'
  CALL draw_char_adv
  LDA 'H'
  CALL draw_char_adv
  LDA 'E'
  CALL draw_char_adv
  LDA 'L'
  CALL draw_char_adv
  LDA 'L'
  CALL draw_char_adv
  RET

draw_list_panel:
  CALL recount_entries
  LDA 50
  COLR
  LDA 230
  COLG
  LDA 120
  COLB
  LDA 4
  STA 0x1010
  LDA 18
  STA 0x1011
  LDA 'F'
  CALL draw_char_adv
  LDA 'I'
  CALL draw_char_adv
  LDA 'L'
  CALL draw_char_adv
  LDA 'E'
  CALL draw_char_adv
  LDA 'S'
  CALL draw_char_adv

  LDA 16
  STA 0x100D
  LDA 0
  STA 0x100E
  STA 0x100F
  STA 0x1018
  LDA 24
  STA 0x1017

draw_list_loop:
  LDM 0x100F
  CMP 64
  JZ draw_list_done
  LDM 0x1017
  CMP 224
  JNC draw_list_done
  LDM 0x100E
  DRVPG
  LDM 0x100D
  DRVRD
  CMP 0
  JZ draw_list_next
  LDM 0x1018
  LBM 0x1004
  CMPB
  JN draw_list_count
  LDM 0x1018
  LBM 0x1004
  SUBB
  CMP 12
  JNC draw_list_count
  CALL draw_one_list_row
  LDM 0x1017
  ADD 8
  STA 0x1017
draw_list_count:
  LDM 0x1018
  INC
  STA 0x1018
draw_list_next:
  CALL next_dir_entry
  JMP draw_list_loop

draw_list_done:
  RET

draw_one_list_row:
  LDM 0x1018
  LBM 0x1002
  CMPB
  JNZ row_normal
  LDA 255
  COLR
  LDA 220
  COLG
  LDA 80
  COLB
  JMP row_color_done
row_normal:
  LDA 80
  COLR
  LDA 220
  COLG
  LDA 120
  COLB
row_color_done:
  LDA 4
  STA 0x1010
  LDM 0x1017
  STA 0x1011
  LDM 0x100E
  DRVPG
  LDM 0x100D
  ADD 8
  DRVRD
  CMP 2
  JNZ row_file
  LDA 'P'
  JMP row_type_draw
row_file:
  LDA 'F'
row_type_draw:
  CALL draw_char_adv
  LDA ' '
  CALL draw_char_adv
  CALL draw_scan_entry_name
  RET

draw_scan_entry_name:
  LDA 0
  STA 0x101D
scan_name_loop:
  LDM 0x101D
  CMP 8
  JZ scan_name_done
  LDM 0x100E
  DRVPG
  LDM 0x100D
  TAB
  LDM 0x101D
  ADDB
  DRVRD
  CMP 0
  JZ scan_name_done
  CALL draw_char_adv
  LDM 0x101D
  INC
  STA 0x101D
  JMP scan_name_loop
scan_name_done:
  RET

draw_preview_panel:
  LDA 70
  COLR
  LDA 180
  COLG
  LDA 255
  COLB
  LDA 120
  STA 0x1010
  LDA 18
  STA 0x1011
  LDA 'V'
  CALL draw_char_adv
  LDA 'I'
  CALL draw_char_adv
  LDA 'E'
  CALL draw_char_adv
  LDA 'W'
  CALL draw_char_adv

  LDM 0x1016
  CMP 1
  JZ draw_help_screen
  CALL locate_selected_entry
  LDM 0x1007
  CMP 255
  JNZ draw_selected_preview
  CALL draw_empty_preview
  RET

draw_help_screen:
  CALL draw_help_panel
  RET

draw_selected_preview:
  LDA 180
  COLR
  LDA 240
  COLG
  LDA 255
  COLB
  LDA 120
  STA 0x1010
  LDA 28
  STA 0x1011
  CALL draw_selected_name
  LDM 0x1009
  CMP 2
  JZ draw_program_preview
  CALL draw_file_preview
  RET

draw_empty_preview:
  LDA 200
  COLR
  LDA 200
  COLG
  LDA 200
  COLB
  LDA 120
  STA 0x1010
  LDA 32
  STA 0x1011
  LDA 'N'
  CALL draw_char_adv
  LDA 'O'
  CALL draw_char_adv
  LDA ' '
  CALL draw_char_adv
  LDA 'F'
  CALL draw_char_adv
  LDA 'I'
  CALL draw_char_adv
  LDA 'L'
  CALL draw_char_adv
  LDA 'E'
  CALL draw_char_adv
  LDA 'S'
  CALL draw_char_adv
  RET

draw_selected_name:
  LDA 0
  STA 0x101E
selected_name_loop:
  LDM 0x101E
  CMP 8
  JZ selected_name_done
  LDM 0x1008
  DRVPG
  LDM 0x1007
  TAB
  LDM 0x101E
  ADDB
  DRVRD
  CMP 0
  JZ selected_name_done
  CALL draw_char_adv
  LDM 0x101E
  INC
  STA 0x101E
  JMP selected_name_loop
selected_name_done:
  RET

draw_program_preview:
  LDA 120
  COLR
  LDA 200
  COLG
  LDA 255
  COLB
  LDA 120
  STA 0x1010
  LDA 44
  STA 0x1011
  LDA 'P'
  CALL draw_char_adv
  LDA 'R'
  CALL draw_char_adv
  LDA 'O'
  CALL draw_char_adv
  LDA 'G'
  CALL draw_char_adv
  LDA 'R'
  CALL draw_char_adv
  LDA 'A'
  CALL draw_char_adv
  LDA 'M'
  CALL draw_char_adv
  LDA ' '
  CALL draw_char_adv
  LDA 'F'
  CALL draw_char_adv
  LDA 'I'
  CALL draw_char_adv
  LDA 'L'
  CALL draw_char_adv
  LDA 'E'
  CALL draw_char_adv

  LDA 120
  STA 0x1010
  LDA 56
  STA 0x1011
  LDA 'B'
  CALL draw_char_adv
  LDA 'O'
  CALL draw_char_adv
  LDA 'O'
  CALL draw_char_adv
  LDA 'T'
  CALL draw_char_adv
  RET

draw_help_panel:
  LDA 180
  COLR
  LDA 230
  COLG
  LDA 255
  COLB
  LDA 120
  STA 0x1010
  LDA 32
  STA 0x1011
  LDA 'U'
  CALL draw_char_adv
  LDA 'P'
  CALL draw_char_adv
  LDA ' '
  CALL draw_char_adv
  LDA 'D'
  CALL draw_char_adv
  LDA 'O'
  CALL draw_char_adv
  LDA 'W'
  CALL draw_char_adv
  LDA 'N'
  CALL draw_char_adv
  LDA ' '
  CALL draw_char_adv
  LDA 'S'
  CALL draw_char_adv
  LDA 'E'
  CALL draw_char_adv
  LDA 'L'
  CALL draw_char_adv
  LDA 'E'
  CALL draw_char_adv
  LDA 'C'
  CALL draw_char_adv
  LDA 'T'
  CALL draw_char_adv

  LDA 120
  STA 0x1010
  LDA 44
  STA 0x1011
  LDA 'L'
  CALL draw_char_adv
  LDA 'E'
  CALL draw_char_adv
  LDA 'F'
  CALL draw_char_adv
  LDA 'T'
  CALL draw_char_adv
  LDA ' '
  CALL draw_char_adv
  LDA 'H'
  CALL draw_char_adv
  LDA 'E'
  CALL draw_char_adv
  LDA 'L'
  CALL draw_char_adv
  LDA 'P'
  CALL draw_char_adv
  LDA ' '
  CALL draw_char_adv
  LDA 'R'
  CALL draw_char_adv
  LDA 'I'
  CALL draw_char_adv
  LDA 'G'
  CALL draw_char_adv
  LDA 'H'
  CALL draw_char_adv
  LDA 'T'
  CALL draw_char_adv
  LDA ' '
  CALL draw_char_adv
  LDA 'V'
  CALL draw_char_adv
  LDA 'I'
  CALL draw_char_adv
  LDA 'E'
  CALL draw_char_adv
  LDA 'W'
  CALL draw_char_adv

  LDA 120
  STA 0x1010
  LDA 56
  STA 0x1011
  LDA 'T'
  CALL draw_char_adv
  LDA 'Y'
  CALL draw_char_adv
  LDA 'P'
  CALL draw_char_adv
  LDA 'E'
  CALL draw_char_adv
  LDA ' '
  CALL draw_char_adv
  LDA 'H'
  CALL draw_char_adv
  LDA 'E'
  CALL draw_char_adv
  LDA 'L'
  CALL draw_char_adv
  LDA 'P'
  CALL draw_char_adv
  LDA ' '
  CALL draw_char_adv
  LDA 'C'
  CALL draw_char_adv
  LDA 'A'
  CALL draw_char_adv
  LDA 'T'
  CALL draw_char_adv
  LDA ' '
  CALL draw_char_adv
  LDA 'N'
  CALL draw_char_adv
  LDA 'A'
  CALL draw_char_adv
  LDA 'M'
  CALL draw_char_adv
  LDA 'E'
  CALL draw_char_adv

  LDA 120
  STA 0x1010
  LDA 68
  STA 0x1011
  LDA 'T'
  CALL draw_char_adv
  LDA 'Y'
  CALL draw_char_adv
  LDA 'P'
  CALL draw_char_adv
  LDA 'E'
  CALL draw_char_adv
  LDA ' '
  CALL draw_char_adv
  LDA 'C'
  CALL draw_char_adv
  LDA 'L'
  CALL draw_char_adv
  LDA 'S'
  CALL draw_char_adv
  LDA ' '
  CALL draw_char_adv
  LDA 'Q'
  CALL draw_char_adv
  LDA 'U'
  CALL draw_char_adv
  LDA 'I'
  CALL draw_char_adv
  LDA 'T'
  CALL draw_char_adv
  RET

draw_file_preview:
  LDA 120
  COLR
  LDA 255
  COLG
  LDA 180
  COLB
  LDA 120
  STA 0x1010
  LDA 40
  STA 0x1011
  LDA 0
  STA 0x1018
  STA 0x1017
  LDM 0x100A
  DRVPG

file_preview_loop:
  LDM 0x1018
  LBM 0x100C
  CMPB
  JZ file_preview_done
  LDM 0x1017
  CMP 24
  JNC file_preview_done
  LDM 0x100A
  DRVPG
  LDM 0x1018
  DRVRD
  STA 0x1012
  CMP 10
  JZ file_newline
  CMP 13
  JZ file_skip_char
  LDM 0x1010
  CMP 248
  JNC file_newline_wrap
  LDM 0x1012
  CALL draw_char_adv
file_skip_char:
  LDM 0x1018
  INC
  STA 0x1018
  JMP file_preview_loop

file_newline_wrap:
  LDM 0x1017
  INC
  STA 0x1017
  LDA 120
  STA 0x1010
  LDM 0x1011
  ADD 7
  STA 0x1011
  JMP file_preview_loop

file_newline:
  LDM 0x1018
  INC
  STA 0x1018
  LDM 0x1017
  INC
  STA 0x1017
  LDA 120
  STA 0x1010
  LDM 0x1011
  ADD 7
  STA 0x1011
  JMP file_preview_loop

file_preview_done:
  RET

draw_status_line:
  LDA 170
  COLR
  LDA 170
  COLG
  LDA 170
  COLB
  LDA 4
  STA 0x1010
  LDA 236
  STA 0x1011
  LDA 'S'
  CALL draw_char_adv
  LDA 'T'
  CALL draw_char_adv
  LDA 'A'
  CALL draw_char_adv
  LDA 'T'
  CALL draw_char_adv
  LDA 'U'
  CALL draw_char_adv
  LDA 'S'
  CALL draw_char_adv
  LDA ' '
  CALL draw_char_adv

  LDM 0x1015
  CMP 1
  JZ status_not_found
  CMP 2
  JZ status_bad
  LDM 0x1016
  CMP 1
  JZ status_help
  LDM 0x1003
  CMP 0
  JZ status_empty
  JMP status_ready

status_ready:
  LDA 'R'
  CALL draw_char_adv
  LDA 'E'
  CALL draw_char_adv
  LDA 'A'
  CALL draw_char_adv
  LDA 'D'
  CALL draw_char_adv
  LDA 'Y'
  CALL draw_char_adv
  RET

status_not_found:
  LDA 'N'
  CALL draw_char_adv
  LDA 'O'
  CALL draw_char_adv
  LDA 'T'
  CALL draw_char_adv
  LDA ' '
  CALL draw_char_adv
  LDA 'F'
  CALL draw_char_adv
  LDA 'O'
  CALL draw_char_adv
  LDA 'U'
  CALL draw_char_adv
  LDA 'N'
  CALL draw_char_adv
  LDA 'D'
  CALL draw_char_adv
  RET

status_bad:
  LDA 'B'
  CALL draw_char_adv
  LDA 'A'
  CALL draw_char_adv
  LDA 'D'
  CALL draw_char_adv
  LDA ' '
  CALL draw_char_adv
  LDA 'C'
  CALL draw_char_adv
  LDA 'O'
  CALL draw_char_adv
  LDA 'M'
  CALL draw_char_adv
  LDA 'M'
  CALL draw_char_adv
  LDA 'A'
  CALL draw_char_adv
  LDA 'N'
  CALL draw_char_adv
  LDA 'D'
  CALL draw_char_adv
  RET

status_help:
  LDA 'H'
  CALL draw_char_adv
  LDA 'E'
  CALL draw_char_adv
  LDA 'L'
  CALL draw_char_adv
  LDA 'P'
  CALL draw_char_adv
  LDA ' '
  CALL draw_char_adv
  LDA 'M'
  CALL draw_char_adv
  LDA 'O'
  CALL draw_char_adv
  LDA 'D'
  CALL draw_char_adv
  LDA 'E'
  CALL draw_char_adv
  RET

status_empty:
  LDA 'E'
  CALL draw_char_adv
  LDA 'M'
  CALL draw_char_adv
  LDA 'P'
  CALL draw_char_adv
  LDA 'T'
  CALL draw_char_adv
  LDA 'Y'
  CALL draw_char_adv
  RET

draw_command_line:
  LDA 255
  COLR
  LDA 255
  COLG
  LDA 120
  COLB
  LDA 4
  STA 0x1010
  LDA 244
  STA 0x1011
  LDA 'C'
  CALL draw_char_adv
  LDA 'M'
  CALL draw_char_adv
  LDA 'D'
  CALL draw_char_adv
  LDA ' '
  CALL draw_char_adv
  CALL draw_command_buffer
  RET

draw_command_buffer:
  LDA 0
  STA 0x1018
cmd_draw_loop:
  LDM 0x1018
  LBM 0x1006
  CMPB
  JZ cmd_draw_done
  LDM 0x1018
  LDAI 0x1040
  CALL draw_char_adv
  LDM 0x1018
  INC
  STA 0x1018
  JMP cmd_draw_loop
cmd_draw_done:
  RET

draw_char_adv:
  CALL draw_char
  LDM 0x1010
  ADD 4
  STA 0x1010
  RET

draw_char:
  CALL to_upper
  STA 0x1012
  CMP ' '
  JZ draw_char_ret
  SUB 'A'
  JN draw_char_digit
  CMP 26
  JNC draw_char_digit
  CALL mul5
  STA 0x1013
  LDM 0x1000
  STA 0x1014
  JMP draw_glyph

draw_char_digit:
  LDM 0x1012
  SUB '0'
  JN draw_char_ret
  CMP 10
  JNC draw_char_ret
  CALL mul5
  STA 0x1013
  LDM 0x1001
  STA 0x1014

draw_glyph:
  LDA 0
  STA 0x100D
glyph_row_loop:
  LDM 0x100D
  CMP 5
  JZ draw_char_ret
  LDM 0x1014
  DRVPG
  LDM 0x1013
  TAB
  LDM 0x100D
  ADDB
  DRVRD
  STA 0x100F
  LDA 0
  STA 0x100E
glyph_col_loop:
  LDM 0x100E
  CMP 3
  JZ glyph_next_row
  LDM 0x100E
  CMP 0
  JZ glyph_bit4
  CMP 1
  JZ glyph_bit2
  LDM 0x100F
  AND 1
  JMP glyph_check
glyph_bit2:
  LDM 0x100F
  AND 2
  JMP glyph_check
glyph_bit4:
  LDM 0x100F
  AND 4
glyph_check:
  CMP 0
  JZ glyph_skip_pixel
  LDM 0x1010
  TAB
  LDM 0x100E
  ADDB
  PUSH
  LDM 0x1011
  TAB
  LDM 0x100D
  ADDB
  TAB
  POP
  DRAW
glyph_skip_pixel:
  LDM 0x100E
  INC
  STA 0x100E
  JMP glyph_col_loop
glyph_next_row:
  LDM 0x100D
  INC
  STA 0x100D
  JMP glyph_row_loop

draw_char_ret:
  RET

mul5:
  STA 0x100D
  SHL
  SHL
  TAB
  LDM 0x100D
  ADDB
  RET

to_upper:
  CMP 'a'
  JN upper_ret
  CMP '{'
  JNC upper_ret
  SUB 32
upper_ret:
  RET
`;function tn(t,a="  "){return t.split("").map(i=>`${a}OUT ${i.charCodeAt(0)}`).join(`
`)}function Ts(t){return`  LDM ${al}
  CMP 0
  JNZ ${t}
${tn(`NO ARG
`)}
  HLT

${t}:`}const gM=`; Petit /bin/hello pour le disque Linux-like
${tn(`hello from /bin/hello
`)}
  HLT`,_M=`; /bin/sysinfo - resume statique du mini systeme
${tn(`NodalLinux 8-bit
CPU: 8-bit unsigned
RAM: 8K  DISK: 8K
Shell: root@sim:/#
`)}
  HLT`,bM=`; /bin/uname - version mini systeme
${tn(`NodalLinux 8-bit 0.3
`)}
  HLT`,yM=`; /bin/pwd - chemin courant symbolique
${tn(`/
`)}
  HLT`,vM=`; /bin/bootcat - affiche le fichier passe par le bootloader
${Ts("have_file")}
  LDM ${aa}
  DRVPG
  LDA 0
  STA 0x1100

read_loop:
  LDM 0x1100
  TAB
  LDM ${ia}
  CMPB
  JZ done
  TBA
  DRVRD
  OUTA
  LDM 0x1100
  INC
  STA 0x1100
  JMP read_loop

done:
  OUT 10
  HLT`,AM=`; /bin/argdump - montre les metadonnees du fichier argument
${Ts("have_file")}
${tn("type ")}
  LDM ${sr}
  CMP 1
  JZ type_file
${tn("program")}
  JMP after_type
type_file:
${tn("file")}
after_type:
${tn(" page ")}
  LDM ${aa}
  OUTD
${tn(" size ")}
  LDM ${ia}
  OUTD
${tn(`b
`)}
  HLT`,LM=`; /bin/wc - compte octets et retours ligne du fichier argument
${Ts("have_file")}
  LDM ${aa}
  DRVPG
  LDA 0
  STA 0x1100
  LDA 0
  STA 0x1101

wc_loop:
  LDM 0x1100
  TAB
  LDM ${ia}
  CMPB
  JZ wc_done
  TBA
  DRVRD
  CMP 10
  JNZ wc_next
  LDM 0x1101
  INC
  STA 0x1101
wc_next:
  LDM 0x1100
  INC
  STA 0x1100
  JMP wc_loop

wc_done:
  LDM ${ia}
  OUTD
${tn("b ")}
  LDM 0x1101
  OUTD
${tn(`l
`)}
  HLT`,wM=`; /bin/head - affiche les 32 premiers octets du fichier argument
${Ts("have_file")}
  LDM ${aa}
  DRVPG
  LDA 0
  STA 0x1100

head_loop:
  LDM 0x1100
  CMP 32
  JZ head_done
  TAB
  LDM ${ia}
  CMPB
  JZ head_done
  TBA
  DRVRD
  OUTA
  LDM 0x1100
  INC
  STA 0x1100
  JMP head_loop

head_done:
  OUT 10
  HLT`,DM=`; /bin/wget - HTTP GET simple depuis une URL stockee dans un fichier
; Utilisation:
;   run wget url
; Le fichier passe en argument doit contenir une URL ASCII.
${Ts("have_file")}
  LDM ${sr}
  CMP 1
  JZ copy_url
${tn(`ARG MUST BE FILE
`)}
  HLT

copy_url:
  LDM ${aa}
  DRVPG
  LDA 0
  STA 0x1100

copy_loop:
  LDM 0x1100
  TAB
  LDM ${ia}
  CMPB
  JZ copy_done
  TBA
  DRVRD
  STA 0x1180
  LDM 0x1100
  TAB
  LDM 0x1180
  STAI 0x1120
  LDM 0x1100
  INC
  STA 0x1100
  JMP copy_loop

copy_done:
  LDM 0x1100
  TAB
  LDA 0
  STAI 0x1120
  CALL find_result
  CMP 1
  JZ start_get
${tn(`NO RESULT FILE
`)}
  HLT

start_get:
  LDA 0
  STA 0x1101
  HTTPGET 0x1120

wait_first:
  HTTPIN
  JC wait_first
  JZ done
  CALL save_byte
  OUTA

read_more:
  HTTPIN
  JC read_more
  JZ done
  CALL save_byte
  OUTA
  JMP read_more

done:
  CALL save_size
  OUT 10
  HLT

save_byte:
  STA 0x1105
  LDM 0x1101
  CMP 255
  JZ save_skip
  LDM 0x1104
  DRVPG
  LDM 0x1105
  TAB
  LDM 0x1101
  DRVWR
  LDM 0x1101
  INC
  STA 0x1101
save_skip:
  LDM 0x1105
  RET

save_size:
  LDM 0x1103
  DRVPG
  LDM 0x1101
  TAB
  LDM 0x1102
  ADD 11
  DRVWR
  RET

find_result:
  LDA 0
  STA 0x1103
  LDA 16
  STA 0x1102
  LDA 0
  STA 0x1106

find_result_loop:
  LDM 0x1106
  CMP 64
  JZ find_result_fail
  LDM 0x1103
  DRVPG
  LDM 0x1102
  DRVRD
  CMP 'r'
  JNZ find_result_next
  LDM 0x1102
  ADD 1
  DRVRD
  CMP 'e'
  JNZ find_result_next
  LDM 0x1102
  ADD 2
  DRVRD
  CMP 's'
  JNZ find_result_next
  LDM 0x1102
  ADD 3
  DRVRD
  CMP 'u'
  JNZ find_result_next
  LDM 0x1102
  ADD 4
  DRVRD
  CMP 'l'
  JNZ find_result_next
  LDM 0x1102
  ADD 5
  DRVRD
  CMP 't'
  JNZ find_result_next
  LDM 0x1102
  ADD 6
  DRVRD
  CMP 0
  JNZ find_result_next
  LDM 0x1102
  ADD 9
  DRVRD
  STA 0x1104
  LDA 1
  RET

find_result_next:
  LDM 0x1102
  ADD 12
  STA 0x1102
  JNC find_result_same_page
  LDM 0x1103
  INC
  STA 0x1103
find_result_same_page:
  LDM 0x1106
  INC
  STA 0x1106
  JMP find_result_loop

find_result_fail:
  LDA 0
  RET`,CM=`#define TYPE_FILE 1
#define DIR_START 16
#define ENTRY_SIZE 12
#define ENTRY_COUNT 64
#define DATA_START_PAGE 4

int read_name(int buf[9]) {
  int len = 0, ch = 0;
  while (1) {
    ch = getchar();
    if (ch == 10) { break; }
    if (len < 8) {
      buf[len] = ch;
      len = len + 1;
    }
  }
  return len;
}

int entry_name_equals(int page, int off, int name[9], int len) {
  int i = 0, want = 0;
  while (i < 8) {
    want = 0;
    if (i < len) {
      want = name[i];
    }
    if (drive_read_at(page, off + i) != want) {
      return 0;
    }
    i = i + 1;
  }
  return 1;
}

int find_entry(int name[9], int len, int out[3]) {
  int page = 0, off = DIR_START, idx = 0;
  while (idx < ENTRY_COUNT) {
    if (drive_read_at(page, off) != 0) {
      if (entry_name_equals(page, off, name, len)) {
        out[0] = page;
        out[1] = off;
        out[2] = drive_read_at(page, off + 9);
        return 1;
      }
    }
    off = off + ENTRY_SIZE;
    if (off < ENTRY_SIZE) {
      page = page + 1;
    }
    idx = idx + 1;
  }
  return 0;
}

int find_free_entry(int out[2]) {
  int page = 0, off = DIR_START, idx = 0;
  while (idx < ENTRY_COUNT) {
    if (drive_read_at(page, off) == 0) {
      out[0] = page;
      out[1] = off;
      return 1;
    }
    off = off + ENTRY_SIZE;
    if (off < ENTRY_SIZE) {
      page = page + 1;
    }
    idx = idx + 1;
  }
  return 0;
}

int page_used(int page) {
  int dir_page = 0, dir_off = DIR_START, idx = 0;
  int start = 0, count = 0;
  while (idx < ENTRY_COUNT) {
    if (drive_read_at(dir_page, dir_off) != 0) {
      start = drive_read_at(dir_page, dir_off + 9);
      count = drive_read_at(dir_page, dir_off + 10);
      if (page >= start) {
        if (page < start + count) {
          return 1;
        }
      }
    }
    dir_off = dir_off + ENTRY_SIZE;
    if (dir_off < ENTRY_SIZE) {
      dir_page = dir_page + 1;
    }
    idx = idx + 1;
  }
  return 0;
}

int find_free_data_page() {
  int page = DATA_START_PAGE;
  while (page != 0) {
    if (!page_used(page)) {
      return page;
    }
    page = page + 1;
  }
  return 0;
}

void write_entry(int dir_page, int dir_off, int name[9], int len, int data_page, int sizev) {
  int i = 0, value = 0;
  while (i < 8) {
    value = 0;
    if (i < len) {
      value = name[i];
    }
    drive_write_at(dir_page, dir_off + i, value);
    i = i + 1;
  }
  drive_write_at(dir_page, dir_off + 8, TYPE_FILE);
  drive_write_at(dir_page, dir_off + 9, data_page);
  drive_write_at(dir_page, dir_off + 10, 1);
  drive_write_at(dir_page, dir_off + 11, sizev);
}

void copy_source_to(int page) {
  int i = 0, ch = 0;
  while (i < boot_arg_size()) {
    ch = boot_file_read(i);
    drive_write_at(page, i, ch);
    i = i + 1;
  }
}

int main() {
  int name[9], existing[3], free_slot[2];
  int len = 0, data_page = 0, dir_page = 0, dir_off = 0;

  if (boot_argc() == 0 || boot_arg_type() != TYPE_FILE) {
    print("usage: run cp file");
    putchar(10);
    return 0;
  }

  print("dest> ");
  len = read_name(name);
  if (len == 0) {
    print("cancel");
    putchar(10);
    return 0;
  }

  if (find_entry(name, len, existing)) {
    dir_page = existing[0];
    dir_off = existing[1];
    data_page = existing[2];
  } else {
    if (!find_free_entry(free_slot)) {
      print("directory full");
      putchar(10);
      return 0;
    }
    data_page = find_free_data_page();
    if (data_page == 0) {
      print("disk full");
      putchar(10);
      return 0;
    }
    dir_page = free_slot[0];
    dir_off = free_slot[1];
  }

  copy_source_to(data_page);
  write_entry(dir_page, dir_off, name, len, data_page, boot_arg_size());
  print("copied");
  putchar(10);
  return 0;
}`,SM=`#define TYPE_FILE 1
#define DIR_START 16
#define ENTRY_SIZE 12
#define ENTRY_COUNT 64
#define DATA_START_PAGE 4

int read_name(int buf[9]) {
  int len = 0, ch = 0;
  while (1) {
    ch = getchar();
    if (ch == 10) { break; }
    if (len < 8) {
      buf[len] = ch;
      len = len + 1;
    }
  }
  return len;
}

int entry_name_equals(int page, int off, int name[9], int len) {
  int i = 0, want = 0;
  while (i < 8) {
    want = 0;
    if (i < len) {
      want = name[i];
    }
    if (drive_read_at(page, off + i) != want) {
      return 0;
    }
    i = i + 1;
  }
  return 1;
}

int find_entry(int name[9], int len, int out[3]) {
  int page = 0, off = DIR_START, idx = 0;
  while (idx < ENTRY_COUNT) {
    if (drive_read_at(page, off) != 0) {
      if (entry_name_equals(page, off, name, len)) {
        out[0] = page;
        out[1] = off;
        out[2] = drive_read_at(page, off + 9);
        return 1;
      }
    }
    off = off + ENTRY_SIZE;
    if (off < ENTRY_SIZE) {
      page = page + 1;
    }
    idx = idx + 1;
  }
  return 0;
}

int find_free_entry(int out[2]) {
  int page = 0, off = DIR_START, idx = 0;
  while (idx < ENTRY_COUNT) {
    if (drive_read_at(page, off) == 0) {
      out[0] = page;
      out[1] = off;
      return 1;
    }
    off = off + ENTRY_SIZE;
    if (off < ENTRY_SIZE) {
      page = page + 1;
    }
    idx = idx + 1;
  }
  return 0;
}

int page_used(int page) {
  int dir_page = 0, dir_off = DIR_START, idx = 0;
  int start = 0, count = 0;
  while (idx < ENTRY_COUNT) {
    if (drive_read_at(dir_page, dir_off) != 0) {
      start = drive_read_at(dir_page, dir_off + 9);
      count = drive_read_at(dir_page, dir_off + 10);
      if (page >= start) {
        if (page < start + count) {
          return 1;
        }
      }
    }
    dir_off = dir_off + ENTRY_SIZE;
    if (dir_off < ENTRY_SIZE) {
      dir_page = dir_page + 1;
    }
    idx = idx + 1;
  }
  return 0;
}

int find_free_data_page() {
  int page = DATA_START_PAGE;
  while (page != 0) {
    if (!page_used(page)) {
      return page;
    }
    page = page + 1;
  }
  return 0;
}

void write_entry(int dir_page, int dir_off, int name[9], int len, int data_page, int sizev) {
  int i = 0, value = 0;
  while (i < 8) {
    value = 0;
    if (i < len) {
      value = name[i];
    }
    drive_write_at(dir_page, dir_off + i, value);
    i = i + 1;
  }
  drive_write_at(dir_page, dir_off + 8, TYPE_FILE);
  drive_write_at(dir_page, dir_off + 9, data_page);
  drive_write_at(dir_page, dir_off + 10, 1);
  drive_write_at(dir_page, dir_off + 11, sizev);
}

void clear_entry(int dir_page, int dir_off) {
  int i = 0;
  while (i < ENTRY_SIZE) {
    drive_write_at(dir_page, dir_off + i, 0);
    i = i + 1;
  }
}

void copy_source_to(int page) {
  int i = 0, ch = 0;
  while (i < boot_arg_size()) {
    ch = boot_file_read(i);
    drive_write_at(page, i, ch);
    i = i + 1;
  }
}

int main() {
  int name[9], existing[3], free_slot[2];
  int len = 0, data_page = 0, dir_page = 0, dir_off = 0;

  if (boot_argc() == 0 || boot_arg_type() != TYPE_FILE) {
    print("usage: run mv file");
    putchar(10);
    return 0;
  }

  print("dest> ");
  len = read_name(name);
  if (len == 0) {
    print("cancel");
    putchar(10);
    return 0;
  }

  if (find_entry(name, len, existing)) {
    dir_page = existing[0];
    dir_off = existing[1];
    data_page = existing[2];
  } else {
    if (!find_free_entry(free_slot)) {
      print("directory full");
      putchar(10);
      return 0;
    }
    data_page = find_free_data_page();
    if (data_page == 0) {
      print("disk full");
      putchar(10);
      return 0;
    }
    dir_page = free_slot[0];
    dir_off = free_slot[1];
  }

  copy_source_to(data_page);
  write_entry(dir_page, dir_off, name, len, data_page, boot_arg_size());

  if (dir_page != boot_arg_page() || dir_off != boot_arg_offset()) {
    clear_entry(boot_arg_page(), boot_arg_offset());
  }

  print("moved");
  putchar(10);
  return 0;
}`,NM=`#define TYPE_FILE 1

int read_pattern(int buf[16]) {
  int len = 0, ch = 0;
  while (1) {
    ch = getchar();
    if (ch == 10) { break; }
    if (len < 15) {
      buf[len] = ch;
      len = len + 1;
    }
  }
  return len;
}

int match_at(int start, int pat[16], int pat_len) {
  int j = 0;
  while (j < pat_len) {
    if (start + j >= boot_arg_size()) {
      return 0;
    }
    if (boot_file_read(start + j) != pat[j]) {
      return 0;
    }
    j = j + 1;
  }
  return 1;
}

int main() {
  int pat[16];
  int pat_len = 0, i = 0, matches = 0;

  if (boot_argc() == 0 || boot_arg_type() != TYPE_FILE) {
    print("usage: run grep file");
    putchar(10);
    return 0;
  }

  print("pat> ");
  pat_len = read_pattern(pat);
  if (pat_len == 0) {
    print("empty pattern");
    putchar(10);
    return 0;
  }

  while (i < boot_arg_size()) {
    if (match_at(i, pat, pat_len)) {
      print("match ");
      print_num(i);
      putchar(10);
      matches = matches + 1;
    }
    i = i + 1;
  }

  if (matches == 0) {
    print("no match");
    putchar(10);
  }

  return 0;
}`,TM=`#define TYPE_FILE 1

int read_key(int buf[16]) {
  int len = 0, ch = 0;
  while (1) {
    ch = getchar();
    if (ch == 10) { break; }
    if (len < 15) {
      buf[len] = ch;
      len = len + 1;
    }
  }
  return len;
}

int main() {
  int key[16];
  int key_len = 0, i = 0, j = 0, c = 0;

  if (boot_argc() == 0 || boot_arg_type() != TYPE_FILE) {
    print("usage: run jsonp file");
    putchar(10);
    return 0;
  }

  print("key> ");
  key_len = read_key(key);
  if (key_len == 0) {
    print("empty key");
    putchar(10);
    return 0;
  }

  i = 0;
  while (i < boot_arg_size()) {
    if (boot_file_read(i) == '"') {
      j = 0;
      while (j < key_len) {
        if (i + 1 + j >= boot_arg_size()) {
          break;
        }
        if (boot_file_read(i + 1 + j) != key[j]) {
          break;
        }
        j = j + 1;
      }

      if (j == key_len) {
        if (i + 1 + j < boot_arg_size()) {
          if (boot_file_read(i + 1 + j) == '"') {
            i = i + key_len + 2;
            while (i < boot_arg_size()) {
              c = boot_file_read(i);
              if (c == ':') {
                i = i + 1;
                break;
              }
              i = i + 1;
            }
            while (i < boot_arg_size() && boot_file_read(i) == ' ') {
              i = i + 1;
            }
            if (i >= boot_arg_size()) { break; }
            c = boot_file_read(i);
            if (c == '"') {
              putchar('"');
              i = i + 1;
              while (i < boot_arg_size()) {
                c = boot_file_read(i);
                if (c == '"') {
                  putchar('"');
                  putchar(10);
                  return 0;
                }
                putchar(c);
                i = i + 1;
              }
              break;
            } else {
              while (i < boot_arg_size()) {
                c = boot_file_read(i);
                if (c == ',' || c == '}' || c == 10) {
                  putchar(10);
                  return 0;
                }
                putchar(c);
                i = i + 1;
              }
              putchar(10);
              return 0;
            }
          }
        }
      }
    }
    i = i + 1;
  }

  print("not found");
  putchar(10);
  return 0;
}`,MM=`; /bin/ascii - mini table ASCII imprimable
  LDA 32
  STA 0x1100
  LDA 0
  STA 0x1101

ascii_loop:
  LDM 0x1100
  OUTA
  OUT 32
  LDM 0x1101
  INC
  STA 0x1101
  CMP 16
  JNZ ascii_next
  LDA 0
  STA 0x1101
  OUT 10
ascii_next:
  LDM 0x1100
  INC
  STA 0x1100
  CMP 127
  JNZ ascii_loop
  OUT 10
  HLT`,EM=`; /bin/upper - lit l'entree console et convertit en majuscules
${tn("upper> ")}

loop:
  INA
  CMP 0
  JZ loop
  CMP 10
  JZ newline
  PUSH
  SUB 97
  JN not_lower
  CMP 26
  JNC not_lower
  POP
  SUB 32
  OUTA
  JMP loop

not_lower:
  POP
  OUTA
  JMP loop

newline:
  OUT 10
${tn("upper> ")}
  JMP loop`,RM=`; /bin/echoio - echo interactif depuis la console
${tn("echo> ")}

loop:
  INA
  CMP 0
  JZ loop
  CMP 10
  JZ newline
  OUTA
  JMP loop

newline:
  OUT 10
${tn("echo> ")}
  JMP loop`,kM=`; /bin/plot - petite demo graphique Linux-like
  CLR

  ; ciel
  LDA 15
  COLR
  LDA 45
  COLG
  LDA 110
  COLB
  LDB 0
sky_row:
  LDA 0
sky_px:
  DRAW
  INC
  JNZ sky_px
  TBA
  INC
  TAB
  CMP 120
  JNZ sky_row

  ; sol
  LDA 10
  COLR
  LDA 70
  COLG
  LDA 25
  COLB
ground_row:
  LDA 0
ground_px:
  DRAW
  INC
  JNZ ground_px
  TBA
  INC
  TAB
  JNZ ground_row

  ; soleil
  LDA 255
  COLR
  LDA 200
  COLG
  LDA 0
  COLB
  LDA 200
  LDB 40
  DRAW
  LDA 201
  DRAW
  LDA 199
  DRAW
  LDA 200
  LDB 39
  DRAW
  LDB 41
  DRAW

  ; maison simple
  LDA 190
  COLR
  LDA 190
  COLG
  LDA 210
  COLB
  LDB 150
wall_row:
  LDA 90
wall_px:
  DRAW
  INC
  CMP 150
  JNZ wall_px
  TBA
  INC
  TAB
  CMP 190
  JNZ wall_row

  LDA 120
  COLR
  LDA 50
  COLG
  LDA 40
  COLB
  LDB 130
  LDA 88
  DRAW
  LDA 89
  DRAW
  LDA 90
roof_row:
  DRAW
  INC
  CMP 150
  JNZ roof_row
  HLT`,OM=[7,5,5,5,7,2,6,2,2,7,7,1,7,4,7,7,1,7,1,7,5,5,7,1,1,7,4,7,1,7,7,4,7,5,7,7,1,1,1,1,7,5,7,5,7,7,5,7,1,7],jM=[2,5,7,5,5,6,5,6,5,6,3,4,4,4,3,6,5,5,5,6,7,4,6,4,7,7,4,6,4,4,3,4,5,5,3,5,5,7,5,5,7,2,2,2,7,1,1,1,5,2,5,5,6,5,5,4,4,4,4,7,5,7,7,5,5,5,7,7,7,5,2,5,5,5,2,6,5,6,4,4,2,5,5,7,3,6,5,6,5,5,3,4,2,1,6,7,2,2,2,2,5,5,5,5,7,5,5,5,5,2,5,5,7,7,5,5,5,2,5,5,5,5,2,2,2,7,1,2,4,7],K0=[{exampleName:"Linux - hello",name:"hello",description:"Petit programme disque qui salue depuis /bin/hello",code:gM},{exampleName:"Linux - sysinfo",name:"sysinfo",description:"Mini equivalent assembleur de uname/neofetch pour le simulateur",code:_M},{exampleName:"Linux - uname",name:"uname",description:"Affiche le nom et la version du mini systeme",code:bM},{exampleName:"Linux - pwd",name:"pwd",description:"Affiche le repertoire symbolique courant",code:yM},{exampleName:"Boot Args - Cat",name:"bootcat",description:"Affiche le fichier passe a 'run bootcat nom' sans rescanner le FS",code:vM},{exampleName:"Linux - argdump",name:"argdump",description:"Affiche type, page et taille du fichier passe par le bootloader",code:AM},{exampleName:"Linux - wc",name:"wc",description:"Compte octets et retours ligne d'un fichier argument",code:LM},{exampleName:"Linux - head",name:"head",description:"Affiche les 32 premiers octets du fichier argument",code:wM},{exampleName:"Linux - wget",name:"wget",description:"HTTP GET simple depuis une URL stockee dans un fichier du disque",code:DM},{exampleName:"Linux - ascii",name:"ascii",description:"Imprime une mini table ASCII",code:MM},{exampleName:"Linux - upper",name:"upper",description:"Echo interactif en majuscules",code:EM},{exampleName:"Linux - echoio",name:"echoio",description:"Echo interactif assembleur depuis la console",code:RM},{exampleName:"Linux - plot",name:"plot",description:"Petite demo graphique livree sur le disque Linux-like",code:kM},{exampleName:"Linux - nano",name:"nano",description:"Editeur texte plein ecran ASM pour les fichiers du disque partage",code:cb},{exampleName:"Linux - glxnano",name:"glxnano",description:"Editeur texte plotter avec touches directes, zoom Tab, themes &, et sauvegarde directe du fichier argument",code:xM},{exampleName:"Linux - glxsh",name:"glxsh",description:"Shell graphique sur le plotter, livre comme programme disque",code:ub},{exampleName:"Linux - cp",name:"cp",description:"Copie un fichier bootloader vers un nom saisi interactivement",code:CM,language:"c"},{exampleName:"Linux - mv",name:"mv",description:"Deplace un fichier bootloader vers un nouveau nom saisi interactivement",code:SM,language:"c"},{exampleName:"Linux - grep",name:"grep",description:"Recherche un motif texte dans un fichier et affiche les lignes correspondantes",code:NM,language:"c"},{exampleName:"Linux - jsonp",name:"jsonp",description:"Extrait une valeur simple par cle depuis un fichier JSON",code:TM,language:"c"}],BM=[{name:"motd",text:`Welcome to NodalLinux 8-bit
Type help, ls, uname, pwd
Try run hello, run sysinfo, run bootcat readme, run wc story
`},{name:"readme",text:`This is a tiny Linux-like environment for the simulator.
Programs live on the external drive and are launched with run NAME.
Use run NAME FILE to pass one resolved file argument.
`},{name:"story",text:`One byte at a time, this little machine dreams of bigger kernels.
But today it boots fast, draws pixels, and still gets the job done.
`},{name:"DIGITS",bytes:OM},{name:"LETTERS",bytes:jM},{name:"result",text:""},{name:"url",text:"https://jsonplaceholder.typicode.com/todos/1"}],$x=4352,PM=6144,db=66,fb=3,tr=64,Ja=8,Sf=12,Nf=16,Yc=ba/mn,Xc=Math.ceil((Nf+tr*Sf)/mn),zM=pa/mn,pb=1,mb=2,W0="root# ",rs=Ja,Tf=Ja+1,ls=Ja+2,Mc=Ja+3;function wi(t,a,i=4152){const l=[...a,"\0"].map(o=>o.charCodeAt(0)&255).join(", ");return`
${t}:
  LDA 0
  STA ${i}
${t}_loop:
  LDM ${i}
  LDAI ${t}_data
  CMP 0
  JZ ${t}_done
  OUTA
  LDM ${i}
  INC
  STA ${i}
  JMP ${t}_loop
${t}_done:
  RET
${t}_data:
  .db ${l}
`}function UM(t){const a=t.trim();if(!a)throw new Error("Entry name cannot be empty.");if(/\s/.test(a))throw new Error("Entry names cannot contain spaces.");if(a.length>Ja)throw new Error(`Entry names are limited to ${Ja} characters.`);return a}function $M(t,a){let i="";for(let l=0;l<Ja;l++){const o=t[a+l]??0;if(o===0)break;i+=String.fromCharCode(o)}return i}function hb(t){return(t[0]??0)===db&&(t[1]??0)===fb}function xb(){const t=new Uint8Array(ba);return t[0]=db,t[1]=fb,t}function gb(t){if(!hb(t))return[];const a=[];for(let i=0;i<tr;i++){const l=Nf+i*Sf,o=$M(t,l),c=t[l+rs]??0,d=t[l+Tf]??0,m=t[l+ls]??0,x=t[l+Mc]??0;if(!o||c===0||d===0||m===0)continue;const h=d*mn,b=Math.min(ba-h,m*mn);a.push({name:o,type:c,startPage:d,pageCount:m,sizeBytes:x,bytes:Uint8Array.from({length:Math.max(0,b)},(g,v)=>t[h+v]??0)})}return a}function IM(t){if(t.length>tr)throw new Error(`Disk directory full (max ${tr} entries).`);const a=xb();let i=Xc;return t.forEach((l,o)=>{const c=Math.max(1,l.pageCount);if(i+c>Yc)throw new Error("Disk is full.");const d=Nf+o*Sf;for(let m=0;m<Ja;m++)a[d+m]=l.name.charCodeAt(m)&255||0;a[d+rs]=l.type&255,a[d+Tf]=i&255,a[d+ls]=c&255,a[d+Mc]=l.sizeBytes&255,a.set(l.bytes.slice(0,c*mn),i*mn),i+=c}),a}function _b(t,a){const i=UM(a.name),l=gb(t).filter(o=>o.name!==i);return IM([...l,{...a,name:i}])}function bb(t,a,i){const l=Uint8Array.from(i),o=Math.ceil(l.length/mn);if(l.length===0)throw new Error("Program is empty.");if(o>zM)throw new Error(`Program is too large for disk boot (${l.length} bytes).`);return _b(t,{name:a,type:mb,startPage:0,pageCount:o,sizeBytes:l.length&255,bytes:l})}function HM(t,a,i){const l=Uint8Array.from(i);if(l.length>255)throw new Error("Text files are limited to 255 bytes on this filesystem.");return _b(t,{name:a,type:pb,startPage:0,pageCount:1,sizeBytes:l.length&255,bytes:l})}const yb=`
start:
  LDA 0
  DRVPG
  CALL msg_boot
main_loop:
  LDA 0
  DRVPG
  CALL msg_prompt
  CALL read_line
  LDA 0
  LDAI 0x1000
  CMP 0
  JZ main_loop
  LDA 0
  LDAI 0x1000
  CMP 'l'
  JNZ check_help
  LDA 1
  LDAI 0x1000
  CMP 's'
  JNZ check_help
  LDA 2
  LDAI 0x1000
  CMP 0
  JZ cmd_ls
check_help:
  LDA 0
  LDAI 0x1000
  CMP 'h'
  JNZ check_run
  LDA 1
  LDAI 0x1000
  CMP 'e'
  JNZ check_run
  LDA 2
  LDAI 0x1000
  CMP 'l'
  JNZ check_run
  LDA 3
  LDAI 0x1000
  CMP 'p'
  JNZ check_run
  LDA 4
  LDAI 0x1000
  CMP 0
  JZ cmd_help
check_run:
  LDA 0
  LDAI 0x1000
  CMP 'r'
  JNZ check_cat
  LDA 1
  LDAI 0x1000
  CMP 'u'
  JNZ cmd_unknown
  LDA 2
  LDAI 0x1000
  CMP 'n'
  JNZ cmd_unknown
  LDA 3
  LDAI 0x1000
  CMP ' '
  JNZ cmd_unknown
  LDA 4
  STA 0x1023
  CALL skip_spaces
  CALL find_entry
  CMP 0
  JZ cmd_not_found
  LDM 0x1026
  CMP 2
  JNZ cmd_not_program
  LDM 0x1024
  STA 0x1034
  LDM 0x1025
  STA 0x1035
  CALL clear_boot_args
  CALL advance_to_next_token
  LDM 0x1023
  TAB
  LDAI 0x1000
  CMP 0
  JZ copy_program
  CALL find_entry
  CMP 0
  JZ cmd_not_found
  CALL store_boot_arg0
  JMP copy_program
check_cat:
  LDA 0
  LDAI 0x1000
  CMP 'c'
  JNZ check_clear
  LDA 1
  LDAI 0x1000
  CMP 'a'
  JNZ check_clear
  LDA 2
  LDAI 0x1000
  CMP 't'
  JNZ check_clear
  LDA 3
  LDAI 0x1000
  CMP ' '
  JNZ check_clear
  LDA 4
  STA 0x1023
  CALL skip_spaces
  CALL find_entry
  CMP 0
  JZ cmd_not_found
  LDM 0x1026
  CMP 1
  JNZ cmd_not_file
  CALL cat_entry
  JMP main_loop
check_clear:
  LDA 0
  LDAI 0x1000
  CMP 'c'
  JNZ check_free
  LDA 1
  LDAI 0x1000
  CMP 'l'
  JNZ check_free
  LDA 2
  LDAI 0x1000
  CMP 'r'
  JZ check_clr_exact
  CMP 'e'
  JNZ check_free
  LDA 3
  LDAI 0x1000
  CMP 'a'
  JNZ check_free
  LDA 4
  LDAI 0x1000
  CMP 'r'
  JNZ check_free
  LDA 5
  LDAI 0x1000
  CMP 0
  JZ do_clear
  JNZ check_free
check_clr_exact:
  LDA 3
  LDAI 0x1000
  CMP 0
  JZ do_clear
  JNZ check_free
do_clear:
  CALL cmd_clr
  JMP main_loop
check_free:
  LDA 0
  LDAI 0x1000
  CMP 'f'
  JNZ cmd_unknown
  LDA 1
  LDAI 0x1000
  CMP 'r'
  JNZ cmd_unknown
  LDA 2
  LDAI 0x1000
  CMP 'e'
  JNZ cmd_unknown
  LDA 3
  LDAI 0x1000
  CMP 'e'
  JNZ cmd_unknown
  LDA 4
  LDAI 0x1000
  CMP 0
  JZ run_free
  JNZ cmd_unknown
run_free:
  CALL cmd_free
  JMP main_loop
cmd_ls:
  CALL list_entries
  JMP main_loop
cmd_help:
  CALL msg_help
  RET
cmd_free:
  CALL count_used_pages
  STA 0x1028
  LDM 0x1028
  TAB
  LDA ${Yc-Xc}
  SUBB
  OUTD
  CALL msg_pages_free
  RET
cmd_clr:
  CLCON
  CLR
  RET
cmd_not_found:
  CALL msg_not_found
  JMP main_loop
cmd_not_program:
  CALL msg_not_program
  JMP main_loop
cmd_not_file:
  CALL msg_not_file
  JMP main_loop
cmd_unknown:
  CALL msg_unknown
  JMP main_loop

${wi("msg_boot",`NodalLinux
`)}
${wi("msg_prompt",W0)}
${wi("msg_help",`ls run cat clear free help
`)}
${wi("msg_pages_free",` pages free
`)}
${wi("msg_not_found",`not found
`)}
${wi("msg_not_program",`not runnable
`)}
${wi("msg_not_file",`not file
`)}
${wi("msg_unknown",`unknown command
try help
`)}

read_line:
  LDA 0
  STA 0x1020
read_wait:
  INA
  CMP 0
  JZ read_wait
  CMP 10
  JZ read_done
  STA 0x1021
  LDM 0x1020
  TAB
  LDM 0x1021
  STAI 0x1000
  LDM 0x1020
  INC
  STA 0x1020
  JMP read_wait
read_done:
  OUT 10
  LDM 0x1020
  TAB
  LDA 0
  STAI 0x1000
  RET

skip_spaces:
skip_spaces_loop:
  LDM 0x1023
  TAB
  LDAI 0x1000
  CMP ' '
  JNZ skip_spaces_done
  LDM 0x1023
  INC
  STA 0x1023
  JMP skip_spaces_loop
skip_spaces_done:
  RET

advance_to_next_token:
  CALL skip_spaces
advance_token_loop:
  LDM 0x1023
  TAB
  LDAI 0x1000
  CMP 0
  JZ advance_token_done
  CMP ' '
  JZ advance_after_space
  LDM 0x1023
  INC
  STA 0x1023
  JMP advance_token_loop
advance_after_space:
  LDM 0x1023
  INC
  STA 0x1023
  CALL skip_spaces
advance_token_done:
  RET

clear_boot_args:
  LDA 0
  STA ${al}
  STA ${bs}
  STA ${ys}
  STA ${sr}
  STA ${aa}
  STA ${Nc}
  STA ${ia}
  STA ${Tc}
  RET

store_boot_arg0:
  LDA 1
  STA ${al}
  LDM 0x1036
  STA ${bs}
  LDM 0x1037
  STA ${ys}
  LDM 0x1026
  STA ${sr}
  LDM 0x1024
  STA ${aa}
  LDM 0x1025
  STA ${Nc}
  LDM 0x1027
  STA ${ia}
  LDM 0x1022
  STA ${Tc}
  RET

dir_seek_entry_base:
  LDA 0
  STA 0x1030
  LDA 16
  STA 0x1031
  LDA 0
  STA 0x1032
dir_seek_loop:
  LDM 0x1032
  TAB
  LDM 0x1022
  CMPB
  JZ dir_seek_done
  LDM 0x1031
  ADD 12
  STA 0x1031
  JNC dir_seek_next
  LDM 0x1030
  INC
  STA 0x1030
dir_seek_next:
  LDM 0x1032
  INC
  STA 0x1032
  JMP dir_seek_loop
dir_seek_done:
  RET

dir_read_field:
  STA 0x1033
  CALL dir_seek_entry_base
  LDM 0x1031
  TAB
  LDM 0x1033
  ADDB
  STA 0x1031
  JNC dir_field_page_ok
  LDM 0x1030
  INC
  STA 0x1030
dir_field_page_ok:
  LDM 0x1030
  DRVPG
  LDM 0x1031
  DRVRD
  RET

list_entries:
  LDA 0
  STA 0x1029
  LDA 0
  STA 0x1022
list_loop:
  LDA 0
  CALL dir_read_field
  CMP 0
  JZ list_next
  LDA 1
  STA 0x1029
  LDA ${rs}
  CALL dir_read_field
  CMP 1
  JZ list_file
  OUT 'p'
  JMP list_name
list_file:
  OUT 'f'
list_name:
  OUT ' '
  CALL print_entry_name
  OUT ' '
  LDA ${rs}
  CALL dir_read_field
  CMP 1
  JZ list_file_size
  LDA ${ls}
  CALL dir_read_field
  OUTD
  OUT 'p'
  OUT 10
  JMP list_next
list_file_size:
  LDA ${Mc}
  CALL dir_read_field
  OUTD
  OUT 'b'
  OUT 10
list_next:
  LDM 0x1022
  INC
  STA 0x1022
  CMP ${tr}
  JNZ list_loop
  LDM 0x1029
  CMP 0
  JNZ list_done
  OUT '('
  OUT 'e'
  OUT 'm'
  OUT 'p'
  OUT 't'
  OUT 'y'
  OUT ')'
  OUT 10
list_done:
  RET

print_entry_name:
  LDA 0
  STA 0x102b
print_name_loop:
  LDM 0x102b
  CMP 8
  JZ print_name_done
  LDM 0x102b
  CALL dir_read_field
  CMP 0
  JZ print_name_done
  OUTA
  LDM 0x102b
  INC
  STA 0x102b
  JMP print_name_loop
print_name_done:
  RET

find_entry:
  LDA 0
  STA 0x1022
find_loop:
  LDA 0
  CALL dir_read_field
  CMP 0
  JZ find_next
  LDA 0
  STA 0x102b
find_cmp_loop:
  LDM 0x102b
  CMP 8
  JZ find_found
  TAB
  LDM 0x1023
  ADDB
  TAB
  LDAI 0x1000
  STA 0x102c
  CMP ' '
  JZ find_cmp_end
  LDM 0x102b
  CALL dir_read_field
  STA 0x102e
  LDM 0x102c
  CMP 0
  JNZ find_cmp_value
  LDM 0x102e
  CMP 0
  JZ find_found
  JMP find_next
find_cmp_end:
  LDM 0x102b
  CALL dir_read_field
  CMP 0
  JZ find_found
  JMP find_next
find_cmp_value:
  TAB
  LDM 0x102e
  CMPB
  JNZ find_next
  LDM 0x102b
  INC
  STA 0x102b
  JMP find_cmp_loop
find_next:
  LDM 0x1022
  INC
  STA 0x1022
  CMP ${tr}
  JNZ find_loop
  LDA 0
  RET
find_found:
  CALL dir_seek_entry_base
  LDM 0x1030
  STA 0x1036
  LDM 0x1031
  STA 0x1037
  LDA ${rs}
  CALL dir_read_field
  STA 0x1026
  LDA ${Tf}
  CALL dir_read_field
  STA 0x1024
  LDA ${ls}
  CALL dir_read_field
  STA 0x1025
  LDA ${Mc}
  CALL dir_read_field
  STA 0x1027
  LDA 1
  RET

cat_entry:
  LDM 0x1024
  DRVPG
  LDA 0
  STA 0x1020
cat_loop:
  LDM 0x1020
  TAB
  LDM 0x1027
  CMPB
  JZ cat_done
  TBA
  DRVRD
  OUTA
  LDM 0x1020
  INC
  STA 0x1020
  JMP cat_loop
cat_done:
  OUT 10
  RET

count_used_pages:
  LDA 0
  STA 0x1028
  LDA 0
  STA 0x1022
count_loop:
  LDA 0
  CALL dir_read_field
  CMP 0
  JZ count_next
  LDM 0x1028
  TAB
  LDA ${ls}
  CALL dir_read_field
  ADDB
  STA 0x1028
count_next:
  LDM 0x1022
  INC
  STA 0x1022
  CMP ${tr}
  JNZ count_loop
  LDM 0x1028
  RET

copy_program:
  LDA 0
  STA 0x102a
copy_page_loop:
  LDM 0x102a
  TAB
  LDM 0x1035
  CMPB
  JZ launch_program
  LDM 0x102a
  TAB
  LDM 0x1034
  ADDB
  DRVPG
  LDA 0
  STA patch_store+1
  LDM 0x102a
  STA patch_store+2
  LDA 0
  STA 0x1020
copy_byte_loop:
  LDM 0x1020
  DRVRD
  STA 0x1021
  LDM 0x1020
  TAB
  LDM 0x1021
patch_store:
  STAI 0x0000
  LDM 0x1020
  INC
  STA 0x1020
  JNZ copy_byte_loop
  LDM 0x102a
  INC
  STA 0x102a
  JMP copy_page_loop

launch_program:
  JMP 0
`;let lc=null,sc=null;function vb(){if(lc)return lc;const t=_s(yb,$x,PM);if(!t.success)throw new Error(`Bootloader assembly failed: ${t.errors.map(a=>a.message).join(" | ")}`);return lc={bytes:t.bytes,startAddr:$x},lc}function JM(t=!1){if(!t&&sc)return Uint8Array.from(sc);let a=xb();for(const i of K0){let l;if(i.language==="c"){const o=ob(i.code);if(!o.success)throw new Error(`Linux disk program "${i.name}" failed to compile: ${o.errors.map(d=>`${d.phase} L${d.line}: ${d.message}`).join(" | ")}`);const c=_s(o.assembly);if(!c.success)throw new Error(`Linux disk program "${i.name}" failed to assemble: ${c.errors.map(d=>`L${d.line}: ${d.message}`).join(" | ")}`);l=c.bytes}else{const o=_s(i.code);if(!o.success)throw new Error(`Linux disk program "${i.name}" failed to assemble: ${o.errors.map(c=>c.message).join(" | ")}`);l=o.bytes}a=bb(a,i.name,l)}for(const i of BM){const l=i.bytes?Uint8Array.from(i.bytes.map(o=>o&255)):Uint8Array.from([...i.text??""].map(o=>o.charCodeAt(0)&255));a=HM(a,i.name,l)}return sc=a,Uint8Array.from(sc)}function oc(t,a={}){const{preserveConsole:i=!0,preservePlotter:l=!1,preserveNetwork:o=!1,maxSteps:c=2e5}=a,d=i?[...t.consoleOutput]:[],m=l?new Map(t.plotterPixels):null,x=l?{...t.plotterColor}:null,h=o?{lastMethod:t.httpLastMethod,lastUrl:t.httpLastUrl,lastBody:t.httpLastBody,lastStatus:t.httpLastStatus,completedMethod:t.httpCompletedMethod,completedUrl:t.httpCompletedUrl,completedBody:t.httpCompletedBody,completedStatus:t.httpCompletedStatus,completedResponseText:t.httpCompletedResponseText,history:[...t.httpHistory],revision:t.networkRevision}:null;i&&d.length>0&&d[d.length-1]!==`
`&&d.push(`
`);const b=vb();t.reset(),i&&(t.consoleOutput=d),l&&m&&x&&(t.plotterPixels=m,t.plotterColor=x),o&&h&&(t.httpLastMethod=h.lastMethod,t.httpLastUrl=h.lastUrl,t.httpLastBody=h.lastBody,t.httpLastStatus=h.lastStatus,t.httpCompletedMethod=h.completedMethod,t.httpCompletedUrl=h.completedUrl,t.httpCompletedBody=h.completedBody,t.httpCompletedStatus=h.completedStatus,t.httpCompletedResponseText=h.completedResponseText,t.httpHistory=h.history,t.networkRevision=h.revision+1),t.loadProgram(b.bytes,b.startAddr);for(let g=0;g<c;g++){if(t.consoleOutput.join("").endsWith(W0))return!0;if(!t.step())return!1}return t.consoleOutput.join("").endsWith(W0)}const Ab=[{name:"Hello World",description:"Affiche 'HELLO' dans la console",code:`; Hello World - Affiche HELLO dans la console
  OUT 'H'
  OUT 'E'
  OUT 'L'
  OUT 'L'
  OUT 'O'
  HLT`},{name:"Compteur 0-9",description:"Compte de 0 à 9 et affiche chaque chiffre",code:`; Compteur de 0 à 9
  LDA 0        ; A = 0
loop:
  ADD 48       ; A += '0' (ASCII)
  OUTA         ; affiche le caractère
  SUB 48       ; retire le décalage ASCII
  INC          ; A++
  CMP 10       ; compare avec 10
  JNZ loop     ; si A != 10, boucler
  HLT`},{name:"Fibonacci",description:"Calcule les nombres de Fibonacci et les stocke en mémoire",code:`; Fibonacci - Stocke les résultats en mémoire à partir de 0x1000
  LDA 0        ; fib(0) = 0
  STA 0x1000   ; MEM[0x1000] = 0
  LDA 1        ; fib(1) = 1
  STA 0x1001   ; MEM[0x1001] = 1

  LDB 0        ; B = fib(n-2) = 0
  LDA 1        ; A = fib(n-1) = 1

fib_loop:
  PUSH          ; sauvegarder fib(n-1)
  ADDB          ; A = fib(n-1) + fib(n-2)
  JC done       ; si carry (overflow), arrêter
  ; Stocker le résultat — on utilise une adresse en mémoire
  STA 0x1010   ; temp: sauver A (nouveau fib)
  POP           ; A = ancien fib(n-1)
  TAB           ; B = ancien fib(n-1) = nouveau fib(n-2)
  LDM 0x1010   ; A = nouveau fib
  OUTD          ; afficher le nombre
  OUT ' '       ; espace
  JMP fib_loop

done:
  HLT`},{name:"Addition",description:"Additionne deux nombres et affiche le résultat",code:`; Addition de deux nombres
  LDA 25       ; A = 25
  LDB 17       ; B = 17 (stocké dans registre B via LDB)
  ; On recharge B comme valeur pour l'addition
  ADD 17       ; A = 25 + 17 = 42
  OUTD         ; affiche 42
  HLT`},{name:"Factorielle",description:"Calcule 5! = 120",code:`; Factorielle de 5
; Résultat: 5! = 120
; MEM[0x1010] = compteur, MEM[0x1011] = résultat
; MEM[0x1012] = additions restantes, MEM[0x1013] = accumulateur
  LDA 1
  STA 0x1011   ; résultat = 1
  LDA 5
  STA 0x1010   ; compteur = 5

mul_loop:
  LDM 0x1010   ; A = compteur
  CMP 1
  JZ done       ; si compteur <= 1, terminé

  ; Multiplier résultat par compteur (additions répétées)
  LDM 0x1010   ; A = compteur
  DEC           ; A = compteur - 1
  STA 0x1012   ; additions restantes = compteur - 1
  LDM 0x1011   ; A = résultat (accumulateur de départ)

add_loop:
  LBM 0x1011   ; B = résultat original
  ADDB          ; A += résultat original
  STA 0x1013   ; sauver accumulateur (STA ne touche pas les flags)
  LDM 0x1012   ; A = restantes
  DEC           ; restantes - 1 (DEC met le flag Z si résultat == 0)
  STA 0x1012   ; restantes-- (STA préserve le flag Z)
  JZ mul_next   ; si restantes == 0, sortir du add_loop
  LDM 0x1013   ; A = accumulateur
  JMP add_loop

mul_next:
  LDM 0x1013   ; A = résultat * compteur
  STA 0x1011   ; sauver nouveau résultat
  LDM 0x1010   ; A = compteur
  DEC
  STA 0x1010   ; compteur--
  JMP mul_loop

done:
  LDM 0x1011   ; A = résultat final
  OUTD          ; affiche 120
  HLT`},{name:"Plotter - Carré",description:"Dessine un carré sur le plotter",code:`; Dessine un carré 50x50 sur le plotter
; Coin supérieur gauche: (20, 20)
; Coin inférieur droit: (70, 70)
  CLR           ; effacer le plotter

  ; --- Lignes horizontales (haut et bas) ---
  LDA 20       ; x = 20
  LDB 20       ; y = 20 (haut)
h_loop:
  DRAW          ; pixel(A, B)
  LDB 70       ; y = 70 (bas)
  DRAW          ; pixel(A, B)
  LDB 20       ; y = 20
  INC           ; x++
  CMP 71       ; x <= 70 ?
  JNZ h_loop

  ; --- Lignes verticales (gauche et droite) ---
  LDA 20       ; x = 20
  LDB 21       ; y = 21 (skip corners)
v_loop:
  DRAW          ; pixel(20, B)
  LDA 70       ; x = 70
  DRAW          ; pixel(70, B)
  LDA 20       ; x = 20
  TBA           ; A = B (y)
  INC           ; y++
  TAB           ; B = y
  CMP 70       ; y < 70 ?
  JNZ v_loop

  HLT`},{name:"Echo (Saisie)",description:"Lit des caractères au clavier et les réaffiche",code:`; Echo - Lit des caracteres et les reaffiche
; Tapez du texte dans le champ de saisie et appuyez sur Entree
  OUT 'T'
  OUT 'a'
  OUT 'p'
  OUT 'e'
  OUT 'z'
  OUT ':'
  OUT ' '

loop:
  INA          ; lire un caractere du buffer
  CMP 0        ; buffer vide ?
  JZ loop      ; oui -> attendre
  CMP 10       ; newline ?
  JZ newline
  OUTA         ; afficher le caractere
  JMP loop

newline:
  OUT 10       ; saut de ligne
  JMP loop`},{name:"Nodal Linux Bootloader",description:"Bootloader assembleur Linux-like du simulateur",code:yb},{name:"Éditeur FS ASM",description:"Editeur texte ASM multi-fichier avec /o nom, fleches, sauvegarde et FS partage",code:cb},{name:"Super Unix Shell Plotter",description:"Shell graphique ASM sur le plotter avec fontes LETTERS/DIGITS du FS partage",code:ub},{name:"Majuscules (Saisie)",description:"Convertit les minuscules en majuscules",code:`; Convertisseur majuscules
; Les lettres minuscules (a-z) deviennent majuscules (A-Z)
  OUT '>'
  OUT ' '

loop:
  INA          ; lire un caractere
  CMP 0
  JZ loop      ; attendre si vide
  CMP 10       ; newline ?
  JZ newline
  ; Verifier si c'est une minuscule (97-122)
  PUSH         ; sauvegarder le char
  SUB 97       ; A = char - 'a'
  JN not_lower ; si negatif, pas minuscule
  CMP 26       ; >= 26 ?
  JNC not_lower
  ; C'est une minuscule: convertir
  POP          ; A = char original
  SUB 32       ; A = majuscule (A-Z = a-z - 32)
  OUTA
  JMP loop

not_lower:
  POP          ; A = char original
  OUTA
  JMP loop

newline:
  OUT 10       ; nouvelle ligne
  OUT '>'
  OUT ' '
  JMP loop`},{name:"Plotter RGB - Paysage",description:"Grand paysage coloré en assembleur avec ciel, soleil, montagnes et sapins",code:`; Paysage RGB plus ambitieux en assembleur
; Bandes de ciel, soleil, nuages, montagnes, reflets et sapins
; Temporaires: 0x1100=x0, 0x1101=x1, 0x1102=y
  CLR

  ; --- Ciel nocturne ---
  LDA 8
  COLR
  LDA 18
  COLG
  LDA 70
  COLB
  LDB 0
sky1_row:
  LDA 0
sky1_px:
  DRAW
  INC
  JNZ sky1_px
  TBA
  INC
  TAB
  CMP 32
  JNZ sky1_row

  ; --- Ciel bleu ---
  LDA 36
  COLR
  LDA 86
  COLG
  LDA 160
  COLB
sky2_row:
  LDA 0
sky2_px:
  DRAW
  INC
  JNZ sky2_px
  TBA
  INC
  TAB
  CMP 72
  JNZ sky2_row

  ; --- Horizon chaud ---
  LDA 255
  COLR
  LDA 132
  COLG
  LDA 82
  COLB
sky3_row:
  LDA 0
sky3_px:
  DRAW
  INC
  JNZ sky3_px
  TBA
  INC
  TAB
  CMP 112
  JNZ sky3_row

  ; --- Lac ---
  LDA 18
  COLR
  LDA 86
  COLG
  LDA 138
  COLB
lake_row:
  LDA 0
lake_px:
  DRAW
  INC
  JNZ lake_px
  TBA
  INC
  TAB
  CMP 192
  JNZ lake_row

  ; --- Prairie / avant-plan ---
  LDA 20
  COLR
  LDA 74
  COLG
  LDA 28
  COLB
meadow_row:
  LDA 0
meadow_px:
  DRAW
  INC
  JNZ meadow_px
  TBA
  INC
  TAB
  JNZ meadow_row

  ; --- Etoiles ---
  LDA 255
  COLR
  LDA 255
  COLG
  LDA 255
  COLB
  LDA 18   ; (18,14)
  LDB 14
  DRAW
  LDA 72   ; (72,10)
  LDB 10
  DRAW
  LDA 136  ; (136,12)
  LDB 12
  DRAW
  LDA 226  ; (226,16)
  LDB 16
  DRAW
  LDA 244  ; (244,26)
  LDB 26
  DRAW

  ; --- Nuages ---
  LDA 228
  COLR
  LDA 228
  COLG
  LDA 228
  COLB
  LDB 40
  LDA 34
cloud1a:
  DRAW
  CMP 62
  JZ cloud1b_go
  INC
  JMP cloud1a
cloud1b_go:
  LDB 44
  LDA 28
cloud1b:
  DRAW
  CMP 64
  JZ cloud1c_go
  INC
  JMP cloud1b
cloud1c_go:
  LDB 48
  LDA 38
cloud1c:
  DRAW
  CMP 70
  JZ cloud2_go
  INC
  JMP cloud1c

cloud2_go:
  LDB 54
  LDA 188
cloud2a:
  DRAW
  CMP 214
  JZ cloud2b_go
  INC
  JMP cloud2a
cloud2b_go:
  LDB 58
  LDA 180
cloud2b:
  DRAW
  CMP 216
  JZ cloud2c_go
  INC
  JMP cloud2b
cloud2c_go:
  LDB 62
  LDA 192
cloud2c:
  DRAW
  CMP 222
  JZ sun_outer_go
  INC
  JMP cloud2c

  ; --- Soleil externe ---
sun_outer_go:
  LDA 255
  COLR
  LDA 150
  COLG
  LDA 60
  COLB
  LDA 28
  STA 0x1102
sun1_row:
  LDM 0x1102
  TAB
  LDA 176
sun1_px:
  DRAW
  CMP 222
  JZ sun1_next
  INC
  JMP sun1_px
sun1_next:
  LDM 0x1102
  INC
  STA 0x1102
  CMP 69
  JNZ sun1_row

  ; --- Soleil moyen ---
  LDA 255
  COLR
  LDA 214
  COLG
  LDA 88
  COLB
  LDA 34
  STA 0x1102
sun2_row:
  LDM 0x1102
  TAB
  LDA 184
sun2_px:
  DRAW
  CMP 214
  JZ sun2_next
  INC
  JMP sun2_px
sun2_next:
  LDM 0x1102
  INC
  STA 0x1102
  CMP 63
  JNZ sun2_row

  ; --- Coeur du soleil ---
  LDA 255
  COLR
  LDA 245
  COLG
  LDA 190
  COLB
  LDA 40
  STA 0x1102
sun3_row:
  LDM 0x1102
  TAB
  LDA 191
sun3_px:
  DRAW
  CMP 207
  JZ sun3_next
  INC
  JMP sun3_px
sun3_next:
  LDM 0x1102
  INC
  STA 0x1102
  CMP 57
  JNZ sun3_row

  ; --- Montagne gauche ---
  LDA 26
  COLR
  LDA 18
  COLG
  LDA 50
  COLB
  LDA 96
  STA 0x1100
  STA 0x1101
  LDA 74
  STA 0x1102
m1_row:
  LDM 0x1100
m1_px:
  LBM 0x1102
  DRAW
  LBM 0x1101
  CMPB
  JZ m1_next
  INC
  JMP m1_px
m1_next:
  LDM 0x1100
  DEC
  STA 0x1100
  LDM 0x1101
  INC
  STA 0x1101
  LDM 0x1102
  INC
  STA 0x1102
  CMP 155
  JNZ m1_row

  ; --- Montagne droite ---
  LDA 44
  COLR
  LDA 24
  COLG
  LDA 68
  COLB
  LDA 188
  STA 0x1100
  STA 0x1101
  LDA 92
  STA 0x1102
m2_row:
  LDM 0x1100
m2_px:
  LBM 0x1102
  DRAW
  LBM 0x1101
  CMPB
  JZ m2_next
  INC
  JMP m2_px
m2_next:
  LDM 0x1100
  DEC
  STA 0x1100
  LDM 0x1101
  INC
  STA 0x1101
  LDM 0x1102
  INC
  STA 0x1102
  CMP 165
  JNZ m2_row

  ; --- Reflets sur le lac ---
  LDA 255
  COLR
  LDA 210
  COLG
  LDA 90
  COLB
  LDB 142
  LDA 184
refl1:
  DRAW
  CMP 208
  JZ refl2_go
  INC
  JMP refl1
refl2_go:
  LDB 150
  LDA 180
refl2:
  DRAW
  CMP 212
  JZ refl3_go
  INC
  JMP refl2
refl3_go:
  LDB 158
  LDA 176
refl3:
  DRAW
  CMP 216
  JZ refl4_go
  INC
  JMP refl3
refl4_go:
  LDA 255
  COLR
  LDA 255
  COLG
  LDA 220
  COLB
  LDB 146
  LDA 192
refl4:
  DRAW
  CMP 200
  JZ refl5_go
  INC
  JMP refl4
refl5_go:
  LDB 154
  LDA 190
refl5:
  DRAW
  CMP 202
  JZ trees_go
  INC
  JMP refl5

  ; --- Sapin gauche ---
trees_go:
  LDA 70
  COLR
  LDA 40
  COLG
  LDA 20
  COLB
  LDA 210
  STA 0x1102
tree1_trunk:
  LDM 0x1102
  TAB
  LDA 22
tree1_trunk_px:
  DRAW
  CMP 24
  JZ tree1_trunk_next
  INC
  JMP tree1_trunk_px
tree1_trunk_next:
  LDM 0x1102
  INC
  STA 0x1102
  CMP 240
  JNZ tree1_trunk

  LDA 10
  COLR
  LDA 70
  COLG
  LDA 25
  COLB
  LDB 198
  LDA 14
tree1_a:
  DRAW
  CMP 32
  JZ tree1_b_go
  INC
  JMP tree1_a
tree1_b_go:
  LDB 192
  LDA 16
tree1_b:
  DRAW
  CMP 30
  JZ tree1_c_go
  INC
  JMP tree1_b
tree1_c_go:
  LDB 186
  LDA 18
tree1_c:
  DRAW
  CMP 28
  JZ tree1_d_go
  INC
  JMP tree1_c
tree1_d_go:
  LDB 180
  LDA 20
tree1_d:
  DRAW
  CMP 26
  JZ tree2_go
  INC
  JMP tree1_d

  ; --- Sapin droit ---
tree2_go:
  LDA 70
  COLR
  LDA 40
  COLG
  LDA 20
  COLB
  LDA 214
  STA 0x1102
tree2_trunk:
  LDM 0x1102
  TAB
  LDA 230
tree2_trunk_px:
  DRAW
  CMP 232
  JZ tree2_trunk_next
  INC
  JMP tree2_trunk_px
tree2_trunk_next:
  LDM 0x1102
  INC
  STA 0x1102
  CMP 244
  JNZ tree2_trunk

  LDA 8
  COLR
  LDA 62
  COLG
  LDA 20
  COLB
  LDB 202
  LDA 222
tree2_a:
  DRAW
  CMP 240
  JZ tree2_b_go
  INC
  JMP tree2_a
tree2_b_go:
  LDB 196
  LDA 224
tree2_b:
  DRAW
  CMP 238
  JZ tree2_c_go
  INC
  JMP tree2_b
tree2_c_go:
  LDB 190
  LDA 226
tree2_c:
  DRAW
  CMP 236
  JZ tree2_d_go
  INC
  JMP tree2_c
tree2_d_go:
  LDB 184
  LDA 228
tree2_d:
  DRAW
  CMP 234
  JZ done_rgb_scene
  INC
  JMP tree2_d

done_rgb_scene:
  HLT`},...K0.map(t=>({name:t.exampleName,description:t.description,code:t.code})).filter(t=>{const a=K0.find(i=>i.exampleName===t.name);return(a==null?void 0:a.language)!=="c"})],Lb=[{name:"Hello World",description:"Affiche Hello World!",code:`// Mon premier programme C
int main() {
  print("Hello World!");
  return 0;
}`},{name:"Compteur",description:"Boucle for de 0 à 9",code:`// Compteur de 0 à 9
int main() {
  int i;
  for (i = 0; i < 10; i++) {
    putchar(48 + i);  // '0' = 48
  }
  return 0;
}`},{name:"Fibonacci",description:"Suite de Fibonacci",code:`// Calcule et affiche la suite de Fibonacci
int main() {
  int a = 0;
  int b = 1;
  int i;
  int temp;

  for (i = 0; i < 10; i++) {
    print_num(a);
    putchar(32);  // espace
    temp = a + b;
    a = b;
    b = temp;
  }
  return 0;
}`},{name:"Factorielle",description:"Fonction récursive fact(n)",code:`// Calcul de factorielle avec récursion
int fact(int n) {
  if (n <= 1) {
    return 1;
  }
  return n * fact(n - 1);
}

int main() {
  print("5! = ");
  print_num(fact(5));
  return 0;
}`},{name:"Calcul",description:"Arithmétique avec variables",code:`// Démonstration d'opérations arithmétiques
#define MAX 20

int main() {
  int x = 10;
  int y = 3;

  print("x = ");
  print_num(x);
  putchar(10);

  print("y = ");
  print_num(y);
  putchar(10);

  print("x+y = ");
  print_num(x + y);
  putchar(10);

  print("x-y = ");
  print_num(x - y);
  putchar(10);

  print("x*y = ");
  print_num(x * y);
  putchar(10);

  print("x/y = ");
  print_num(x / y);
  putchar(10);

  print("x%y = ");
  print_num(x % y);
  putchar(10);

  return 0;
}`},{name:"Plotter",description:"Dessine une diagonale et un cadre",code:`// Dessine sur le plotter
int main() {
  int i;

  clear();
  color(0, 200, 255);

  // Diagonale
  for (i = 0; i < 80; i++) {
    draw(i, i);
  }

  color(255, 180, 0);

  // Cadre
  for (i = 0; i < 100; i++) {
    draw(i, 0);
    draw(i, 99);
    draw(0, i);
    draw(99, i);
  }

  return 0;
}`},{name:"Courbe",description:"Onde parabolique approchant une sinusoïde",code:`// Onde parabolique sur le plotter
// Approxime une sinusoide par des arches de paraboles
// Formule : h = (t/4) * ((127-t)/4) pour chaque demi-onde
// Le produit reste dans [0..240] : pas de depassement 8 bits

int main() {
  int x;
  int y;
  int t;
  int h;

  clear();

  // Courbe parabolique
  for (x = 0; x < 255; x++) {
    // Position dans la demi-onde (0..127)
    t = x & 127;

    // Hauteur parabolique (max 240, rentre dans 8 bits)
    h = (t >> 2) * ((127 - t) >> 2);

    // Alterner arche haute et arche basse
    if (x < 128) {
      y = 128 - (h >> 1);
    } else {
      y = 128 + (h >> 1);
    }

    draw(x, y);
  }

  return 0;
}`},{name:"Echo (Saisie)",description:"Lit et réaffiche les caractères saisis",code:`// Echo - lit et reaffiche les caracteres
// Tapez du texte et appuyez sur Entree
int main() {
  int c;
  print("Tapez: ");

  while (1) {
    c = getchar();
    if (c == 64) {
      putchar(10);
      return 0;
    }
    if (c == 10) {
      putchar(10);
    } else {
      putchar(c);
    }
  }
  return 0;
}`},{name:"Compteur de lettres",description:"Compte les caractères dans une ligne saisie",code:`// Compte les caracteres dans la saisie
// Tapez du texte et appuyez sur Entree

int main() {
  int c;
  int count;

  while (1) {
    count = 0;
    print("> ");

    c = getchar();
    if (c == 64) {
      putchar(10);
      return 0;
    }
    while (c != 10) {
      count += 1;
      putchar(c);
      c = getchar();
      if (c == 64) {
        putchar(10);
        return 0;
      }
    }

    putchar(10);
    print("Longueur: ");
    print_num(count);
    putchar(10);
  }
  return 0;
}`},{name:"Calculatrice",description:"Calculatrice interactive avec 2 decimales",code:`// Calculatrice interactive (8-bit)
// Tapez: nombre op nombre (ex: 2.14+3.24)
// Operateurs: + - * / %
// Nombres entiers ou avec 2 decimales

int last;
int last_frac;
int last_has_frac;
int quit_flag;

int print_2d(int n) {
  putchar(48 + n / 10);
  putchar(48 + n % 10);
  return 0;
}

int read_num() {
  int n;
  int c;
  int frac;
  int digits;
  n = 0;
  frac = 0;
  digits = 0;
  quit_flag = 0;
  last_has_frac = 0;
  c = getchar();
  if (c == 64) {
    last = 64;
    last_frac = 0;
    quit_flag = 1;
    return 0;
  }
  while (c >= 48) {
    if (c > 57) { break; }
    putchar(c);
    n = n * 10 + (c - 48);
    c = getchar();
  }
  if (c == 46) {
    last_has_frac = 1;
    putchar(c);
    c = getchar();
    while (digits < 2) {
      if (c < 48) { break; }
      if (c > 57) { break; }
      putchar(c);
      frac = frac * 10 + (c - 48);
      digits = digits + 1;
      c = getchar();
    }
    if (digits == 1) {
      frac = frac * 10;
    }
    while (c >= 48) {
      if (c > 57) { break; }
      putchar(c);
      c = getchar();
    }
  }
  if (c == 64) {
    quit_flag = 1;
  }
  last = c;
  last_frac = frac;
  return n;
}

int main() {
  int ai;
  int af;
  int bi;
  int bf;
  int a_dec;
  int b_dec;
  int op;
  int neg;
  int show_frac;
  int ri;
  int rf;
  int i;
  int d1;
  int d2;
  int t;
  int tf;
  int tmp;

  while (1) {
    print("> ");
    ai = read_num();
    if (quit_flag) {
      putchar(10);
      return 0;
    }
    af = last_frac;
    a_dec = last_has_frac;
    op = last;
    if (op == 64) {
      putchar(10);
      return 0;
    }
    putchar(op);
    bi = read_num();
    if (quit_flag) {
      putchar(10);
      return 0;
    }
    bf = last_frac;
    b_dec = last_has_frac;
    putchar(10);

    neg = 0;
    ri = 0;
    rf = 0;

    if (op == 43) {
      ri = ai + bi;
      rf = af + bf;
      if (rf >= 100) {
        rf = rf - 100;
        ri = ri + 1;
      }
    }

    if (op == 45) {
      if (ai < bi) {
        neg = 1;
        tmp = ai;
        ai = bi;
        bi = tmp;
        tmp = af;
        af = bf;
        bf = tmp;
      } else {
        if (ai == bi) {
          if (af < bf) {
            neg = 1;
            tmp = ai;
            ai = bi;
            bi = tmp;
            tmp = af;
            af = bf;
            bf = tmp;
          }
        }
      }
      ri = ai;
      rf = af;
      if (rf < bf) {
        rf = rf + 100;
        ri = ri - 1;
      }
      rf = rf - bf;
      ri = ri - bi;
    }

    if (op == 42) {
      i = 0;
      while (i < ai) {
        rf = rf + bf;
        if (rf >= 100) {
          rf = rf - 100;
          ri = ri + 1;
        }
        ri = ri + bi;
        i = i + 1;
      }

      i = 0;
      while (i < bi) {
        rf = rf + af;
        if (rf >= 100) {
          rf = rf - 100;
          ri = ri + 1;
        }
        i = i + 1;
      }

      t = 0;
      tf = 0;
      i = 0;
      while (i < af) {
        tf = tf + bf;
        if (tf >= 100) {
          tf = tf - 100;
          t = t + 1;
        }
        i = i + 1;
      }
      rf = rf + t;
      if (rf >= 100) {
        rf = rf - 100;
        ri = ri + 1;
      }
    }

    if (op == 47) {
      if (bi != 0 || bf != 0) {
        t = ai;
        tf = af;
        while (1) {
          if (t < bi) { break; }
          if (t == bi) {
            if (tf < bf) { break; }
          }
          if (tf < bf) {
            tf = tf + 100;
            t = t - 1;
          }
          tf = tf - bf;
          t = t - bi;
          ri = ri + 1;
        }

        d1 = 0;
        d2 = 0;

        if (t != 0 || tf != 0) {
          ai = 0;
          af = 0;
          i = 0;
          while (i < 10) {
            af = af + tf;
            if (af >= 100) {
              af = af - 100;
              ai = ai + 1;
            }
            ai = ai + t;
            i = i + 1;
          }

          while (1) {
            if (ai < bi) { break; }
            if (ai == bi) {
              if (af < bf) { break; }
            }
            if (af < bf) {
              af = af + 100;
              ai = ai - 1;
            }
            af = af - bf;
            ai = ai - bi;
            d1 = d1 + 1;
          }

          if (ai != 0 || af != 0) {
            t = 0;
            tf = 0;
            i = 0;
            while (i < 10) {
              tf = tf + af;
              if (tf >= 100) {
                tf = tf - 100;
                t = t + 1;
              }
              t = t + ai;
              i = i + 1;
            }

            while (1) {
              if (t < bi) { break; }
              if (t == bi) {
                if (tf < bf) { break; }
              }
              if (tf < bf) {
                tf = tf + 100;
                t = t - 1;
              }
              tf = tf - bf;
              t = t - bi;
              d2 = d2 + 1;
            }
          }
        }

        rf = d1 * 10 + d2;
      }
    }

    if (op == 37) {
      if (bi != 0 || bf != 0) {
        t = ai;
        tf = af;
        while (1) {
          if (t < bi) { break; }
          if (t == bi) {
            if (tf < bf) { break; }
          }
          if (tf < bf) {
            tf = tf + 100;
            t = t - 1;
          }
          tf = tf - bf;
          t = t - bi;
        }
        ri = t;
        rf = tf;
      }
    }

    show_frac = 0;
    if (a_dec || b_dec) {
      show_frac = 1;
    }
    if (rf != 0) {
      show_frac = 1;
    }

    print("= ");
    if (neg) {
      putchar(45);
    }
    print_num(ri);
    if (show_frac) {
      putchar(46);
      print_2d(rf);
    }
    putchar(10);
  }
  return 0;
}`},{name:"Traceur de droite",description:"Trace y=a*x/b+c sur le plotter",code:`// Traceur de droite y=a*x/b+c
// Saisir a, b, c (chiffres 0-9)
// Algorithme DDA : accumule la pente
// sans jamais calculer a*x (overflow)

int main() {
  int a;
  int b;
  int c;
  int x;
  int y;
  int err;

  print("a=");
  a = getchar();
  while (a != 64) {
    if (a >= 48) {
      if (a <= 57) { break; }
    }
    a = getchar();
  }
  if (a == 64) { return 0; }
  a = a - 48;
  putchar(a + 48);
  putchar(10);

  print("b=");
  b = getchar();
  while (b != 64) {
    if (b >= 48) {
      if (b <= 57) { break; }
    }
    b = getchar();
  }
  if (b == 64) { return 0; }
  b = b - 48;
  putchar(b + 48);
  putchar(10);

  if (b == 0) {
    print("Err: b=0");
    return 0;
  }

  print("c=");
  c = getchar();
  while (c != 64) {
    if (c >= 48) {
      if (c <= 57) { break; }
    }
    c = getchar();
  }
  if (c == 64) { return 0; }
  c = c - 48;
  putchar(c + 48);
  putchar(10);

  clear();

  y = c;
  err = 0;
  for (x = 0; x < 255; x++) {
    draw(x, y);
    err = err + a;
    while (err >= b) {
      err = err - b;
      y = y + 1;
    }
  }

  return 0;
}`},{name:"Cercle",description:"Dessine un cercle sur le plotter",code:`// Cercle sur le plotter

int main()
{
    int x;
    int y;
    int ax;
    int ay;
    int sx;
    int sy;
    int d;
    x = 0;
    while (x < 255)
    {
        y = 0;
print_num(x);
putchar(10);
        while (y < 255)
        {
            if (x < 128)
            {
                ax = 128 - x;
            }
            else
            {
                ax = x - 128;
            }
            if (y < 128)
            {
                ay = 128 - y;
            }
            else
            {
                ay = y - 128;
            }
            sx = ax / 16;
            sy = ay / 16;
            d = (sx * sx) + (sy * sy);
            if (d > 12)
            {
                if (d < 20)
                {
                    draw(x, y);
                }
            }
            y = y + 1;
        }
        x = x + 1;
    }
}`},{name:"Clavier",description:"Déplace un curseur avec les flèches du clavier",code:`// Vaisseau triangle + laser projectile
// Fleches = deplacer, Enter = tirer
// Le laser monte chaque frame jusqu'en haut

int main() {
  int x;
  int y;
  int x1;
  int x2;
  int y1;
  int lx;
  int ly;
  int lf;
  int ch;

  x = 127;
  y = 200;
  lf = 0;

  while (1) {
    ch = getchar_nb();
    if (ch == 64) { return 0; }
    clear();

    // Lecture clavier
    if (getKey(0)) {
      if (x > 0) { x = x - 1; }
    }
    if (getKey(1)) {
      if (x < 252) { x = x + 1; }
    }
    if (getKey(2)) {
      if (y > 2) { y = y - 1; }
    }
    if (getKey(3)) {
      if (y < 253) { y = y + 1; }
    }

    // Pre-calcul
    x1 = x + 1; x2 = x + 2; y1 = y + 1;

    // Triangle (pointe en haut)
    draw(x1, y);
    draw(x, y1); draw(x1, y1); draw(x2, y1);

    // Tir: Enter lance un laser
    if (lf == 0) {
      if (getKey(4)) {
        lf = 1;
        lx = x1;
        ly = y - 1;
      }
    }

    // Laser actif: monte et disparait
    if (lf) {
      draw(lx, ly);
      draw(lx, ly + 1);
      if (ly > 0) {
        ly = ly - 1;
      } else {
        lf = 0;
      }
    }
  }
}`},{name:"Horloge",description:"Chronomètre MM:SS qui défile",code:`// Chronometre MM:SS
// Affiche chaque seconde sur une nouvelle ligne

int print_2d(int n) {
  putchar(48 + n / 10);
  putchar(48 + n % 10);
  return 0;
}

int main() {
  int m;
  int s;
  int t;

  m = 0;
  s = 0;

  while (m < 60) {
    print_2d(m);
    putchar(58);
    print_2d(s);
    putchar(10);

    s = s + 1;
    if (s >= 60) {
      s = 0;
      m = m + 1;
    }
  }
  return 0;
}`},{name:"Spirale",description:"Dessine une spirale carrée sur le plotter",code:`// Spirale carree sur le plotter
// 4 bras par tour, longueur croissante

int main() {
  int x;
  int y;
  int s;
  int i;

  clear();
  x = 128;
  y = 128;
  s = 4;

  while (s < 120) {
    for (i = 0; i < s; i++) { draw(x, y); x = x + 1; }
    for (i = 0; i < s; i++) { draw(x, y); y = y + 1; }
    s = s + 4;
    for (i = 0; i < s; i++) { draw(x, y); x = x - 1; }
    for (i = 0; i < s; i++) { draw(x, y); y = y - 1; }
    s = s + 4;
  }
  return 0;
}`},{name:"Tableau de nombres premiers",description:"Trouve et affiche les nombres premiers",code:`// Trouve les nombres premiers jusqu'a 100

int is_prime(int n) {
  int d;
  if (n < 2) { return 0; }
  for (d = 2; d * d <= n; d++) {
    if (n % d == 0) { return 0; }
  }
  return 1;
}

int main() {
  int i;
  int count;
  count = 0;

  print("Nombres premiers:");
  putchar(10);

  for (i = 2; i <= 100; i++) {
    if (is_prime(i)) {
      print_num(i);
      putchar(32);
      count = count + 1;
    }
  }

  putchar(10);
  print("Total: ");
  print_num(count);
  putchar(10);
  return 0;
}`},{name:"Étoiles",description:"Ciel étoilé aléatoire (rand, sleep, break)",code:`// Ciel etoile aleatoire
// Dessine 64 etoiles a des positions aleatoires
// Utilise rand(), sleep() et break

int main() {
  int i;
  int x;
  int y;

  i = 0;
  while (1) {
    if (i >= 64) {
      break;
    }
    x = rand();
    y = rand();

    // Saute les coins (continue)
    if (x < 10) {
      if (y < 10) {
        continue;
      }
    }

    draw(x, y);
    sleep(5);
    i = i + 1;
  }

  print("Stars: ");
  print_num(i);
  return 0;
}`},{name:"Test Mémoire",description:"Teste les zones mémoire: globales, locales, pile",code:`// Test Memoire
// Teste: 16 globales, 488 locales, ~1024 code, pile
// Verifie l'integrite apres appels de fonction
// Attendu: =MEM 2K= g0=42 gf=15 r1=57 r2=5 PASS

// -- 16 globales (zone 0x1000-0x100F) --
int g0; int g1; int g2; int g3;
int g4; int g5; int g6; int g7;
int g8; int g9; int ga; int gb;
int gc; int gd; int ge; int gf;

// -- Fonction testee (utilise la pile) --
int add(int a, int b) {
  return a + b;
}

// -- Remplissage zone locales --
// Chaque fonction reserve 25 slots (1 param + 24 locals)
// 19 fonctions x 25 = 475 slots reserves
int _1(int z){int a;int b;int c;int d;int e;int f;int g;int h;int i;int j;int k;int l;int m;int n;int o;int p;int q;int r;int s;int t;int u;int v;int w;int x;return z;}
int _2(int z){int a;int b;int c;int d;int e;int f;int g;int h;int i;int j;int k;int l;int m;int n;int o;int p;int q;int r;int s;int t;int u;int v;int w;int x;return z;}
int _3(int z){int a;int b;int c;int d;int e;int f;int g;int h;int i;int j;int k;int l;int m;int n;int o;int p;int q;int r;int s;int t;int u;int v;int w;int x;return z;}
int _4(int z){int a;int b;int c;int d;int e;int f;int g;int h;int i;int j;int k;int l;int m;int n;int o;int p;int q;int r;int s;int t;int u;int v;int w;int x;return z;}
int _5(int z){int a;int b;int c;int d;int e;int f;int g;int h;int i;int j;int k;int l;int m;int n;int o;int p;int q;int r;int s;int t;int u;int v;int w;int x;return z;}
int _6(int z){int a;int b;int c;int d;int e;int f;int g;int h;int i;int j;int k;int l;int m;int n;int o;int p;int q;int r;int s;int t;int u;int v;int w;int x;return z;}
int _7(int z){int a;int b;int c;int d;int e;int f;int g;int h;int i;int j;int k;int l;int m;int n;int o;int p;int q;int r;int s;int t;int u;int v;int w;int x;return z;}
int _8(int z){int a;int b;int c;int d;int e;int f;int g;int h;int i;int j;int k;int l;int m;int n;int o;int p;int q;int r;int s;int t;int u;int v;int w;int x;return z;}
int _9(int z){int a;int b;int c;int d;int e;int f;int g;int h;int i;int j;int k;int l;int m;int n;int o;int p;int q;int r;int s;int t;int u;int v;int w;int x;return z;}
int _A(int z){int a;int b;int c;int d;int e;int f;int g;int h;int i;int j;int k;int l;int m;int n;int o;int p;int q;int r;int s;int t;int u;int v;int w;int x;return z;}
int _B(int z){int a;int b;int c;int d;int e;int f;int g;int h;int i;int j;int k;int l;int m;int n;int o;int p;int q;int r;int s;int t;int u;int v;int w;int x;return z;}
int _C(int z){int a;int b;int c;int d;int e;int f;int g;int h;int i;int j;int k;int l;int m;int n;int o;int p;int q;int r;int s;int t;int u;int v;int w;int x;return z;}
int _D(int z){int a;int b;int c;int d;int e;int f;int g;int h;int i;int j;int k;int l;int m;int n;int o;int p;int q;int r;int s;int t;int u;int v;int w;int x;return z;}
int _E(int z){int a;int b;int c;int d;int e;int f;int g;int h;int i;int j;int k;int l;int m;int n;int o;int p;int q;int r;int s;int t;int u;int v;int w;int x;return z;}
int _F(int z){int a;int b;int c;int d;int e;int f;int g;int h;int i;int j;int k;int l;int m;int n;int o;int p;int q;int r;int s;int t;int u;int v;int w;int x;return z;}
int _G(int z){int a;int b;int c;int d;int e;int f;int g;int h;int i;int j;int k;int l;int m;int n;int o;int p;int q;int r;int s;int t;int u;int v;int w;int x;return z;}
int _H(int z){int a;int b;int c;int d;int e;int f;int g;int h;int i;int j;int k;int l;int m;int n;int o;int p;int q;int r;int s;int t;int u;int v;int w;int x;return z;}
int _I(int z){int a;int b;int c;int d;int e;int f;int g;int h;int i;int j;int k;int l;int m;int n;int o;int p;int q;int r;int s;int t;int u;int v;int w;int x;return z;}
int _J(int z){int a;int b;int c;int d;int e;int f;int g;int h;int i;int j;int k;int l;int m;int n;int o;int p;int q;int r;int s;int t;int u;int v;int w;int x;return z;}

int main() {
  // 11 locales dans main (total: 2+475+11=488)
  int r1;
  int r2;
  int ok;
  int v1;
  int v2;
  int v3;
  int v4;
  int v5;
  int v6;
  int v7;
  int v8;

  // Initialise les 16 globales
  g0=42; g1=1; g2=2; g3=3;
  g4=4; g5=5; g6=6; g7=7;
  g8=8; g9=9; ga=10; gb=11;
  gc=12; gd=13; ge=14; gf=15;

  print("=MEM 2K=");
  putchar(10);

  // Utilise les locales
  v1 = g0 + g1;
  v2 = g2 + g3;
  v3 = g4 + g5;
  v4 = g6 + g7;
  v5 = g8 + g9;
  v6 = ga + gb;

  // Appels fonction (pile: save 11 vars + 6 temps)
  r1 = add(g0, gf);
  r2 = add(g2, g3);

  // Affiche
  print("g0=");
  print_num(g0);
  putchar(32);
  print("gf=");
  print_num(gf);
  putchar(10);
  print("r1=");
  print_num(r1);
  putchar(32);
  print("r2=");
  print_num(r2);
  putchar(10);

  // Verification
  ok = 1;
  if (r1 != 57) { ok = 0; }
  if (r2 != 5) { ok = 0; }
  if (g0 != 42) { ok = 0; }
  if (gf != 15) { ok = 0; }
  if (v1 != 43) { ok = 0; }

  if (ok) {
    print("PASS");
  } else {
    print("FAIL");
  }
  putchar(10);

  // Padding pour remplir la zone code
  print("=CODE:1024=DATA:512=PILE:512=OK");
  return 0;
}`},{name:"Tableau (Fonction)",description:"Passe un tableau a des fonctions qui le modifient",code:`// Passage de tableau a une fonction
// Les fonctions recoivent un tableau de taille fixe,
// le lisent et peuvent aussi le modifier.

void fill_pair(int values[2]) {
  values[0] = 12;
  values[1] = 34;
}

int sum_pair(int values[2]) {
  return values[0] + values[1];
}

void bump_second(int values[2]) {
  values[1] = values[1] + 5;
}

int main() {
  int data[2];

  fill_pair(data);
  print("Init: ");
  print_num(data[0]);
  putchar(32);
  print_num(data[1]);
  putchar(10);

  bump_second(data);
  print("Apres: ");
  print_num(data[0]);
  putchar(32);
  print_num(data[1]);
  putchar(10);

  print("Somme: ");
  print_num(sum_pair(data));
  putchar(10);

  return 0;
}`},{name:"Tableau (Tri)",description:"Tri à bulles d'un tableau de 8 éléments",code:`// Tri a bulles (Bubble Sort)
// Remplit un tableau, le trie, puis l'affiche

int main() {
  int t[8];
  int i;
  int j;
  int tmp;

  t[0] = 64;
  t[1] = 25;
  t[2] = 12;
  t[3] = 22;
  t[4] = 11;
  t[5] = 90;
  t[6] = 33;
  t[7] = 44;

  print("Avant: ");
  for (i = 0; i < 8; i++) {
    print_num(t[i]);
    putchar(32);
  }
  putchar(10);

  for (i = 0; i < 7; i++) {
    for (j = 0; j < 7 - i; j++) {
      if (t[j] > t[j + 1]) {
        tmp = t[j];
        t[j] = t[j + 1];
        t[j + 1] = tmp;
      }
    }
  }

  print("Apres: ");
  for (i = 0; i < 8; i++) {
    print_num(t[i]);
    putchar(32);
  }
  putchar(10);

  return 0;
}`},{name:"Pong",description:"Pong 1 joueur contre IA (UP/DOWN)",code:`// Pong - 1 joueur contre ordinateur
// UP/DOWN pour la raquette gauche
// Vitesse: ~2000 instr/tick

int main() {
  int bx; int by;
  int bdx; int bdy;
  int py; int ay;
  int i; int tmp; int ch;

  bx = 128; by = 128;
  bdx = 1; bdy = 1;
  py = 118; ay = 118;

  while (1) {
    ch = getchar_nb();
    if (ch == 64) { return 0; }
    clear();

    // Joueur (vitesse 2)
    if (getKey(2)) { if (py > 1) { py -= 2; } }
    if (getKey(3)) { if (py < 236) { py += 2; } }

    // IA (vitesse 1)
    tmp = ay + 10;
    if (by > tmp) { if (ay < 236) { ay++; } }
    if (by < tmp) { if (ay > 0) { ay--; } }

    // Balle
    if (bdx) { bx++; } else { bx--; }
    if (bdy) { by++; } else { by--; }

    // Murs haut/bas
    if (by < 2) { bdy = 1; }
    if (by > 253) { bdy = 0; }

    // Raquette joueur (x=8)
    if (bx < 10) {
      if (by >= py) {
        tmp = py + 20;
        if (by < tmp) { bdx = 1; bx = 10; }
      }
    }

    // Raquette IA (x=248)
    if (bx > 246) {
      if (by >= ay) {
        tmp = ay + 20;
        if (by < tmp) { bdx = 0; bx = 246; }
      }
    }

    // But: reset balle
    if (bx < 1) { bx = 128; by = 128; bdx = 1; }
    if (bx > 254) { bx = 128; by = 128; bdx = 0; }

    // Raquettes (1x20)
    for (i = 0; i < 20; i++) {
      draw(8, py + i);
      draw(248, ay + i);
    }

    // Balle
    draw(bx, by);

    sleep(255);
  }
  return 0;
}`},{name:"Démo Ultime",description:"Console, clavier, hasard, tableaux, recursion et plotter",code:`// Demo ultime du petit ordinateur
// Utilise: input console, clavier, hasard, sleep, plotter,
// fonctions, recursion, tableaux globaux et locaux, tri, bitwise

int seed;
int mode;
int values[8];
int quit_flag;

int read_digit() {
  int c;
  c = getchar();
  while (c != 64) {
    if (c >= 48) {
      if (c <= 57) { break; }
    }
    c = getchar();
  }
  if (c == 64) {
    quit_flag = 1;
    return 0;
  }
  putchar(c);
  putchar(10);
  return c - 48;
}

int sum_to(int n) {
  if (n <= 0) { return 0; }
  return n + sum_to(n - 1);
}

int absdiff(int a, int b) {
  if (a >= b) { return a - b; }
  return b - a;
}

int read_mode() {
  int m;
  m = 0;
  if (getKey(0)) { m += 1; }
  if (getKey(1)) { m += 2; }
  if (getKey(2)) { m += 4; }
  if (getKey(3)) { m += 8; }
  if (getKey(4)) { m += 16; }
  return m;
}

int fill_data() {
  int i;
  int v;
  i = 0;
  while (i < 8) {
    v = (((seed + (i * 3)) << 2) ^ rand()) % 90;
    if (v < 10) { v += 10; }
    if ((mode & 1) && v > 60) { v -= 7; }
    if ((mode & 2) && v < 40) { v += 9; }
    values[i] = v;
    i++;
  }
  return 0;
}

int sort_data() {
  int i;
  int j;
  int tmp;
  i = 0;
  while (i < 7) {
    j = 0;
    while (j < 7 - i) {
      if (values[j] > values[j + 1]) {
        tmp = values[j];
        values[j] = values[j + 1];
        values[j + 1] = tmp;
      }
      j++;
    }
    i++;
  }
  return 0;
}

int print_values() {
  int i;
  i = 0;
  while (i < 8) {
    print_num(values[i]);
    putchar(32);
    i++;
  }
  putchar(10);
  return 0;
}

int draw_frame() {
  int x;
  int y;
  x = 0;
  while (x < 128) {
    draw(x, 0);
    draw(x, 99);
    x++;
  }
  y = 0;
  while (y < 100) {
    draw(0, y);
    draw(127, y);
    y++;
  }
  return 0;
}

int draw_ship(int x, int y) {
  draw(x, y);
  draw(x + 1, y);
  draw(x + 2, y);
  draw(x + 1, y - 1);
  draw(x + 1, y + 1);
  return 0;
}

int show_scene() {
  int stars[16];
  int frame;
  int i;
  int x;
  int y;
  int shipx;
  int shipy;
  int h;
  int by;
  i = 0;
  while (i < 16) {
    stars[i] = rand();
    i++;
  }

  frame = 0;
  while (frame < 6) {
    clear();
    draw_frame();

    i = 0;
    while (i < 16) {
      if ((stars[i] & 1) == 0) {
        i++;
        continue;
      }
      x = (stars[i] + (frame * 5)) & 127;
      y = ((stars[i] >> 1) + (i * 3)) % 100;
      if (y > 94) {
        i++;
        continue;
      }
      draw(x, y);
      i++;
    }

    i = 0;
    while (i < 8) {
      x = 8 + (i * 14);
      h = values[i] / 3;
      by = 98;
      while (h > 0) {
        draw(x, by);
        draw(x + 1, by);
        by--;
        h--;
      }
      i++;
    }

    shipx = 60 + ((mode & 3) * 8);
    shipy = 50 + ((mode >> 2) & 3) * 6;
    if (getKey(0)) { shipx -= 8; }
    if (getKey(1)) { shipx += 8; }
    if (getKey(2)) { shipy -= 6; }
    if (getKey(3)) { shipy += 6; }
    draw_ship(shipx, shipy);

    if (getKey(4)) {
      draw(shipx + 1, shipy - 4);
      draw(shipx + 1, shipy - 6);
    }

    sleep(3);
    frame++;
  }
  return 0;
}

int main() {
  int local[4];
  int i;
  int total;
  int avg;
  int rem;
  int spread;
  int chk;

  print("=== DEMO ULTIME ===");
  putchar(10);
  print("Entrez un chiffre 0-9: ");
  seed = read_digit();
  if (quit_flag) { return 0; }

  mode = read_mode();
  print("Mode clavier=");
  print_num(mode);
  putchar(10);

  print("Somme recursive=");
  print_num(sum_to(seed));
  putchar(10);

  fill_data();
  print("Brut: ");
  print_values();

  sort_data();
  print("Trie: ");
  print_values();

  total = 0;
  i = 0;
  while (i < 8) {
    total += values[i];
    i++;
  }

  avg = total / 8;
  rem = total % 8;
  spread = absdiff(values[7], values[0]);

  local[0] = avg;
  local[1] = rem;
  local[2] = spread;
  local[3] = (avg ^ spread) & 63;

  print("Moy=");
  print_num(local[0]);
  print(" R=");
  print_num(local[1]);
  print(" Amp=");
  print_num(local[2]);
  putchar(10);

  print("Mix=");
  print_num(local[3]);
  putchar(10);

  show_scene();

  chk = local[0] + local[1] + local[2] + local[3];
  print("Checksum=");
  print_num(chk);
  putchar(10);
  print("FIN");
  return 0;
}`},{name:"Calculatrice Graphique",description:"Mode Y= style TI-83 sur tout le plotter, avec trace et zoom",code:`// Calculatrice graphique style TI-83
// Entrez A, B, C pour Y = A*(X/8)^2 + B*X + C
// LEFT/RIGHT = trace, UP/DOWN = zoom, ENTER = fenetre standard

int a;
int b;
int c;
int zoom;
int cx;
int enter_prev;
int quit_flag;

int read_digit() {
  int ch;
  ch = getchar();
  while (ch != 64) {
    if (ch >= 48) {
      if (ch <= 57) { break; }
    }
    ch = getchar();
  }
  if (ch == 64) {
    quit_flag = 1;
    return 0;
  }
  putchar(ch);
  putchar(10);
  return ch - 48;
}

int eval_y(int sx) {
  int mag;
  int quad;
  int lin;
  int y;

  y = 128 - (c * 4);

  if (sx >= 128) {
    mag = (sx - 128) / zoom;
    lin = (b * mag) / 5;
    y = y - lin;
  } else {
    mag = (128 - sx) / zoom;
    lin = (b * mag) / 5;
    y = y + lin;
  }

  quad = mag / 8;
  quad = quad * quad;
  quad = quad * a;
  y = y - quad;

  return y;
}

int draw_frame() {
  int i;

  i = 0;
  while (i < 255) {
    draw(i, 0);
    draw(i, 255);
    draw(i, 128);
    if ((i & 31) == 0) {
      draw(i, 127);
      draw(i, 129);
      draw(i, 126);
      draw(i, 130);
    }
    i = i + 1;
  }
  draw(255, 0);
  draw(255, 255);
  draw(255, 128);

  i = 0;
  while (i < 255) {
    draw(0, i);
    draw(255, i);
    draw(128, i);
    if ((i & 31) == 0) {
      draw(127, i);
      draw(129, i);
      draw(126, i);
      draw(130, i);
    }
    i = i + 1;
  }
  draw(0, 255);
  draw(255, 255);
  draw(128, 255);

  return 0;
}

int draw_grid() {
  int x;
  int y;

  x = 32;
  while (1) {
    if (x != 128) {
      y = 4;
      while (1) {
        draw(x, y);
        if (y > 246) { break; }
        y = y + 8;
      }
    }
    if (x > 223) { break; }
    x = x + 32;
  }

  y = 32;
  while (1) {
    if (y != 128) {
      x = 4;
      while (1) {
        draw(x, y);
        if (x > 246) { break; }
        x = x + 8;
      }
    }
    if (y > 223) { break; }
    y = y + 32;
  }

  return 0;
}

int plot_curve() {
  int x;
  int y;
  int py;
  int t;

  py = 255;
  x = 0;
  while (x < 255) {
    y = eval_y(x);
    if (y > 0) {
      draw(x, y);
      if (py > 0) {
        if (y > py) {
          t = py;
          while (t < y) {
            draw(x, t);
            t = t + 1;
          }
        } else {
          t = y;
          while (t < py) {
            draw(x, t);
            t = t + 1;
          }
        }
      }
    }
    py = y;
    x = x + 1;
  }
  y = eval_y(255);
  if (y > 0) { draw(255, y); }

  return 0;
}

int draw_cursor() {
  int y;
  int i;

  y = eval_y(cx);
  if (y == 0) { return 0; }

  i = 0;
  while (i < 255) {
    if ((i & 7) == 0) {
      draw(cx, i);
    }
    i = i + 1;
  }
  draw(cx, 255);

  i = 0;
  while (i < 255) {
    if ((i & 7) == 0) {
      draw(i, y);
    }
    i = i + 1;
  }
  draw(255, y);

  draw(cx, y);
  if (cx > 2) { draw(cx - 1, y); draw(cx - 2, y); }
  if (cx < 253) { draw(cx + 1, y); draw(cx + 2, y); }
  if (y > 2) { draw(cx, y - 1); draw(cx, y - 2); }
  if (y < 253) { draw(cx, y + 1); draw(cx, y + 2); }

  return 0;
}

int main() {
  int key;
  int dirty;

  print("=== TI GRAPH ===");
  putchar(10);
  print("Y1 = A*(X/8)^2 + B*X + C");
  putchar(10);
  print("A=");
  a = read_digit();
  if (quit_flag) { return 0; }
  print("B=");
  b = read_digit();
  if (quit_flag) { return 0; }
  print("C=");
  c = read_digit();
  if (quit_flag) { return 0; }
  print("TRACE L/R  ZOOM U/D  ENTER=STD");
  putchar(10);

  zoom = 6;
  cx = 128;
  enter_prev = 0;
  dirty = 1;

  while (1) {
    key = getchar_nb();
    if (key == 64) { return 0; }
    if (dirty) {
      clear();
      draw_grid();
      draw_frame();
      plot_curve();
      draw_cursor();
      dirty = 0;
    }

    if (getKey(0)) {
      if (cx > 1) {
        cx = cx - 1;
        dirty = 1;
      }
    }
    if (getKey(1)) {
      if (cx < 254) {
        cx = cx + 1;
        dirty = 1;
      }
    }
    if (getKey(2)) {
      if (zoom > 4) {
        zoom = zoom - 1;
        dirty = 1;
      }
    }
    if (getKey(3)) {
      if (zoom < 12) {
        zoom = zoom + 1;
        dirty = 1;
      }
    }

    key = getKey(4);
    if (key) {
      if (enter_prev == 0) {
        zoom = 6;
        cx = 128;
        dirty = 1;
      }
      enter_prev = 1;
    } else {
      enter_prev = 0;
    }

    sleep(3);
  }
  return 0;
}`},{name:"Mini Shell",description:"Shell RAM avec variables, fichiers, >, cat, add/max/min/avg",code:`// Mini shell en memoire
// Variables: set a=42, vars, add, max, min, avg
// Fichiers RAM: touch f, hi>f, cat f

int main() {
  int line[32];
  int var_name[4];
  int var_value[4];
  int var_used[4];
  int file_name[4];
  int file_len[4];
  int file_used[4];
  int file_data[64];
  int i;
  int j;
  int ch;
  int lp;
  int gt;
  int slot;
  int free_slot;
  int fname;
  int base;
  int value;
  int found;
  int copied;

  i = 0;
  while (i < 4) {
    var_used[i] = 0;
    file_used[i] = 0;
    file_len[i] = 0;
    i = i + 1;
  }

  print("=== MINI SHELL RAM ===");
  putchar(10);
  print("vars set add max min avg");
  putchar(10);

  while (1) {
    print("$ ");
    lp = 0;
    ch = getchar();
    while (ch != 10) {
      if (ch == 64) {
        putchar(10);
        return 0;
      }
      if (lp < 31) {
        line[lp] = ch;
        lp = lp + 1;
      }
      putchar(ch);
      ch = getchar();
    }
    line[lp] = 0;
    putchar(10);

    if (lp == 0) {
      continue;
    }

    if (line[0] == 'v') {
      if (line[1] == 'a') {
        if (line[2] == 'r') {
          if (line[3] == 's') {
            found = 0;
            i = 0;
            while (i < 4) {
              if (var_used[i]) {
                putchar(var_name[i]);
                putchar('=');
                print_num(var_value[i]);
                putchar(10);
                found = 1;
              }
              i = i + 1;
            }
            if (found == 0) {
              print("(no vars)");
              putchar(10);
            }
            continue;
          }
        }
      }
    }

    slot = 255;
    if (line[0] == 'a') {
      if (line[1] == 'd') { slot = 0; }
      if (line[1] == 'v') { slot = 3; }
    }
    if (line[0] == 'm') {
      if (line[1] == 'a') { slot = 1; }
      if (line[1] == 'i') { slot = 2; }
    }
    if (slot != 255) {
      found = 0;
      value = 0;
      base = 0;
      fname = 0;
      i = 0;
      while (i < 4) {
        if (var_used[i]) {
          if (found == 0) {
            base = var_value[i];
            fname = var_value[i];
          }
          value = value + var_value[i];
          if (var_value[i] > base) { base = var_value[i]; }
          if (var_value[i] < fname) { fname = var_value[i]; }
          found = found + 1;
        }
        i = i + 1;
      }
      if (found == 0) {
        print("(no vars)");
        putchar(10);
        continue;
      }
      if (slot == 0) { copied = value; base = 0; }
      if (slot == 1) { copied = base; base = 0; }
      if (slot == 2) { copied = fname; base = 0; }
      if (slot == 3) {
        copied = value / found;
        base = value % found;
      }
      if (lp > 4) {
        if (line[3] == '>') {
          fname = line[4];
          gt = 255;
          i = 0;
          while (i < 4) {
            if (file_used[i]) {
              if (file_name[i] == fname) {
                gt = i;
              }
            }
            i = i + 1;
          }
          if (gt == 255) {
            print("no file ");
            putchar(fname);
            putchar(10);
            continue;
          }
          j = gt * 16;
          value = copied;
          copied = 0;
          if (value >= 100) {
            file_data[j] = 48 + value / 100;
            value = value % 100;
            file_data[j + 1] = 48 + value / 10;
            file_data[j + 2] = 48 + value % 10;
            copied = 3;
          } else {
            if (value >= 10) {
              file_data[j] = 48 + value / 10;
              file_data[j + 1] = 48 + value % 10;
              copied = 2;
            } else {
              file_data[j] = 48 + value;
              copied = 1;
            }
          }
          if (slot == 3) {
            if (base) {
              file_data[j + copied] = '.';
              copied = copied + 1;
              value = base * 10;
              file_data[j + copied] = 48 + value / found;
              copied = copied + 1;
              fname = (value % found) * 10;
              file_data[j + copied] = 48 + fname / found;
              copied = copied + 1;
            }
          }
          file_len[gt] = copied;
          continue;
        }
      }
      print_num(copied);
      if (slot == 3) {
        if (base) {
          putchar('.');
          value = base * 10;
          putchar(48 + (value / found));
          fname = (value % found) * 10;
          putchar(48 + (fname / found));
        }
      }
      putchar(10);
      continue;
    }

    if (line[0] == 's') {
      if (line[1] == 'e') {
        if (line[2] == 't') {
          if (line[3] == ' ') {
            fname = line[4];
            if (line[5] != '=') {
              print("usage: set a=42");
              putchar(10);
              continue;
            }
            value = 0;
            i = 6;
            while (i < lp) {
              if (line[i] < '0') { break; }
              if (line[i] > '9') { break; }
              value = value * 10 + (line[i] - '0');
              i = i + 1;
            }

            slot = 255;
            free_slot = 255;
            i = 0;
            while (i < 4) {
              if (var_used[i]) {
                if (var_name[i] == fname) {
                  slot = i;
                }
              } else {
                if (free_slot == 255) {
                  free_slot = i;
                }
              }
              i = i + 1;
            }

            if (slot == 255) {
              slot = free_slot;
            }

            if (slot == 255) {
              print("var full");
              putchar(10);
              continue;
            }

            var_used[slot] = 1;
            var_name[slot] = fname;
            var_value[slot] = value;
            putchar(fname);
            putchar('=');
            print_num(value);
            putchar(10);
            continue;
          }
        }
      }
    }

    if (line[0] == 't') {
      if (line[1] == 'o') {
        if (line[2] == 'u') {
          if (line[3] == 'c') {
            if (line[4] == 'h') {
              if (line[5] == ' ') {
                fname = line[6];
                slot = 255;
                free_slot = 255;
                i = 0;
                while (i < 4) {
                  if (file_used[i]) {
                    if (file_name[i] == fname) {
                      slot = i;
                    }
                  } else {
                    if (free_slot == 255) {
                      free_slot = i;
                    }
                  }
                  i = i + 1;
                }
                if (slot != 255) {
                  print("exists ");
                  putchar(fname);
                  putchar(10);
                  continue;
                }
                if (free_slot == 255) {
                  print("file full");
                  putchar(10);
                  continue;
                }
                file_used[free_slot] = 1;
                file_name[free_slot] = fname;
                file_len[free_slot] = 0;
                print("created ");
                putchar(fname);
                putchar(10);
                continue;
              }
            }
          }
        }
      }
    }

    if (line[0] == 'c') {
      if (line[1] == 'a') {
        if (line[2] == 't') {
          if (line[3] == ' ') {
            fname = line[4];
            slot = 255;
            i = 0;
            while (i < 4) {
              if (file_used[i]) {
                if (file_name[i] == fname) {
                  slot = i;
                }
              }
              i = i + 1;
            }
            if (slot == 255) {
              print("no file ");
              putchar(fname);
              putchar(10);
              continue;
            }
            base = slot * 16;
            j = 0;
            while (j < file_len[slot]) {
              putchar(file_data[base + j]);
              j = j + 1;
            }
            putchar(10);
            continue;
          }
        }
      }
    }

    gt = 255;
    i = 0;
    while (i < lp) {
      if (line[i] == '>') {
        gt = i;
        break;
      }
      i = i + 1;
    }

    if (gt != 255) {
      if (gt + 1 >= lp) {
        print("?");
        putchar(10);
        continue;
      }
      fname = line[gt + 1];

      if (gt == 0) {
        print("?");
        putchar(10);
        continue;
      }

      slot = 255;
      i = 0;
      while (i < 4) {
        if (file_used[i]) {
          if (file_name[i] == fname) {
            slot = i;
          }
        }
        i = i + 1;
      }

      if (slot == 255) {
        print("no file ");
        putchar(fname);
        putchar(10);
        continue;
      }

      base = slot * 16;
      if (gt > 16) {
        gt = 16;
      }

      j = 0;
      while (j < gt) {
        file_data[base + j] = line[j];
        j = j + 1;
      }
      file_len[slot] = gt;
      continue;
    }

    print("?");
    putchar(10);
  }
  return 0;
}`},{name:"writeDigits",description:"Ecrit le fichier DIGITS dans le FS partage bootloader",code:`// Writer compatible avec le FS partage bootloader
// Cree un seul fichier: DIGITS
// Contenu:
// digit 0 = octets 0..4
// digit 1 = octets 5..9
// ...
// digit 9 = octets 45..49

#define DIR_START 16
#define ENTRY_SIZE 12
#define ENTRY_COUNT 8
#define FS_MAGIC 66
#define FS_VER 3

void clear_entry(int base) {
  int j;
  j = 0;
  while (j < ENTRY_SIZE) {
    drive_write_at(0, base + j, 0);
    j = j + 1;
  }
}

void format_drive() {
  int i;
  int base;

  drive_clear();
  drive_write_at(0, 0, FS_MAGIC);
  drive_write_at(0, 1, FS_VER);

  base = DIR_START;
  i = 0;
  while (i < ENTRY_COUNT) {
    clear_entry(base);
    base = base + ENTRY_SIZE;
    i = i + 1;
  }
}

void ensure_drive() {
  if (drive_read_at(0, 0) != FS_MAGIC) {
    format_drive();
    return;
  }
  if (drive_read_at(0, 1) != FS_VER) {
    format_drive();
    return;
  }
}

int is_digits_name(int base) {
  if (drive_read_at(0, base + 0) != 'D') { return 0; }
  if (drive_read_at(0, base + 1) != 'I') { return 0; }
  if (drive_read_at(0, base + 2) != 'G') { return 0; }
  if (drive_read_at(0, base + 3) != 'I') { return 0; }
  if (drive_read_at(0, base + 4) != 'T') { return 0; }
  if (drive_read_at(0, base + 5) != 'S') { return 0; }
  if (drive_read_at(0, base + 6) != 0) { return 0; }
  return 1;
}

int find_digits_entry() {
  int i;
  int base;

  base = DIR_START;
  i = 0;
  while (i < ENTRY_COUNT) {
    if (drive_read_at(0, base + 0) != 0) {
      if (is_digits_name(base)) {
        return base;
      }
    }
    base = base + ENTRY_SIZE;
    i = i + 1;
  }
  return 255;
}

int find_free_entry() {
  int i;
  int base;

  base = DIR_START;
  i = 0;
  while (i < ENTRY_COUNT) {
    if (drive_read_at(0, base + 0) == 0) {
      return base;
    }
    base = base + ENTRY_SIZE;
    i = i + 1;
  }
  return 255;
}

int page_used(int page) {
  int i;
  int base;

  base = DIR_START;
  i = 0;
  while (i < ENTRY_COUNT) {
    if (drive_read_at(0, base + 0) != 0) {
      if (drive_read_at(0, base + 9) == page) {
        return 1;
      }
    }
    base = base + ENTRY_SIZE;
    i = i + 1;
  }
  return 0;
}

int find_free_page() {
  int page;

  page = 255;
  while (1) {
    if (page != 0) {
      if (!page_used(page)) {
        return page;
      }
    }
    if (page == 1) { break; }
    page = page - 1;
  }
  return 0;
}

void write_digits_entry(int base, int page) {
  drive_write_at(0, base + 0, 'D');
  drive_write_at(0, base + 1, 'I');
  drive_write_at(0, base + 2, 'G');
  drive_write_at(0, base + 3, 'I');
  drive_write_at(0, base + 4, 'T');
  drive_write_at(0, base + 5, 'S');
  drive_write_at(0, base + 6, 0);
  drive_write_at(0, base + 7, 0);
  drive_write_at(0, base + 8, 1);    // type=file
  drive_write_at(0, base + 9, page); // page de donnees
  drive_write_at(0, base + 10, 1);   // pages utilisees
  drive_write_at(0, base + 11, 50);  // taille en octets
}

void save_digit_row(int page, int digit, int row, int mask) {
  drive_write_at(page, digit * 5 + row, mask);
}

int main() {
  int base;
  int page;

  ensure_drive();

  base = find_digits_entry();
  if (base == 255) {
    base = find_free_entry();
    if (base == 255) {
      print("directory full");
      putchar(10);
      return 0;
    }

    page = find_free_page();
    if (page == 0) {
      print("disk full");
      putchar(10);
      return 0;
    }

    write_digits_entry(base, page);
  } else {
    page = drive_read_at(0, base + 9);
    write_digits_entry(base, page);
  }

  // 0 = 111 / 101 / 101 / 101 / 111
  save_digit_row(page, 0, 0, 7);
  save_digit_row(page, 0, 1, 5);
  save_digit_row(page, 0, 2, 5);
  save_digit_row(page, 0, 3, 5);
  save_digit_row(page, 0, 4, 7);

  // 1 = 010 / 110 / 010 / 010 / 111
  save_digit_row(page, 1, 0, 2);
  save_digit_row(page, 1, 1, 6);
  save_digit_row(page, 1, 2, 2);
  save_digit_row(page, 1, 3, 2);
  save_digit_row(page, 1, 4, 7);

  // 2 = 111 / 001 / 111 / 100 / 111
  save_digit_row(page, 2, 0, 7);
  save_digit_row(page, 2, 1, 1);
  save_digit_row(page, 2, 2, 7);
  save_digit_row(page, 2, 3, 4);
  save_digit_row(page, 2, 4, 7);

  // 3 = 111 / 001 / 111 / 001 / 111
  save_digit_row(page, 3, 0, 7);
  save_digit_row(page, 3, 1, 1);
  save_digit_row(page, 3, 2, 7);
  save_digit_row(page, 3, 3, 1);
  save_digit_row(page, 3, 4, 7);

  // 4 = 101 / 101 / 111 / 001 / 001
  save_digit_row(page, 4, 0, 5);
  save_digit_row(page, 4, 1, 5);
  save_digit_row(page, 4, 2, 7);
  save_digit_row(page, 4, 3, 1);
  save_digit_row(page, 4, 4, 1);

  // 5 = 111 / 100 / 111 / 001 / 111
  save_digit_row(page, 5, 0, 7);
  save_digit_row(page, 5, 1, 4);
  save_digit_row(page, 5, 2, 7);
  save_digit_row(page, 5, 3, 1);
  save_digit_row(page, 5, 4, 7);

  // 6 = 111 / 100 / 111 / 101 / 111
  save_digit_row(page, 6, 0, 7);
  save_digit_row(page, 6, 1, 4);
  save_digit_row(page, 6, 2, 7);
  save_digit_row(page, 6, 3, 5);
  save_digit_row(page, 6, 4, 7);

  // 7 = 111 / 001 / 001 / 001 / 001
  save_digit_row(page, 7, 0, 7);
  save_digit_row(page, 7, 1, 1);
  save_digit_row(page, 7, 2, 1);
  save_digit_row(page, 7, 3, 1);
  save_digit_row(page, 7, 4, 1);

  // 8 = 111 / 101 / 111 / 101 / 111
  save_digit_row(page, 8, 0, 7);
  save_digit_row(page, 8, 1, 5);
  save_digit_row(page, 8, 2, 7);
  save_digit_row(page, 8, 3, 5);
  save_digit_row(page, 8, 4, 7);

  // 9 = 111 / 101 / 111 / 001 / 111
  save_digit_row(page, 9, 0, 7);
  save_digit_row(page, 9, 1, 5);
  save_digit_row(page, 9, 2, 7);
  save_digit_row(page, 9, 3, 1);
  save_digit_row(page, 9, 4, 7);

  print("saved DIGITS");
  putchar(10);
  return 0;
}`},{name:"writeLetters",description:"Ecrit le fichier LETTERS dans le FS partage bootloader",code:`// Writer minimal pour fichier LETTERS
// Compatible avec le FS partage bootloader
// Le disque doit deja etre formate

int i;
int base;
int found;
int free_base;
int page;

int main() {
  drive_set_page(0);

  if (drive_read(0) != 66) {
    print("fmt first");
    putchar(10);
    return 0;
  }
  if (drive_read(1) != 3) {
    print("fmt first");
    putchar(10);
    return 0;
  }

  found = 255;
  free_base = 255;
  page = 0;
  base = 16;
  i = 0;

  while (i < 8) {
    if (drive_read(base) == 0) {
      if (free_base == 255) {
        free_base = base;
        page = 255 - i;
      }
    } else {
      if (drive_read(base + 0) == 'L') {
        if (drive_read(base + 1) == 'E') {
          if (drive_read(base + 2) == 'T') {
            if (drive_read(base + 3) == 'T') {
              if (drive_read(base + 4) == 'E') {
                if (drive_read(base + 5) == 'R') {
                  if (drive_read(base + 6) == 'S') {
                    found = base;
                  }
                }
              }
            }
          }
        }
      }
    }
    base = base + 12;
    i = i + 1;
  }

  if (found != 255) {
    base = found;
    page = drive_read(base + 9);
  } else {
    if (free_base == 255) {
      print("directory full");
      putchar(10);
      return 0;
    }
    base = free_base;
  }

  drive_write(base + 0, 'L');
  drive_write(base + 1, 'E');
  drive_write(base + 2, 'T');
  drive_write(base + 3, 'T');
  drive_write(base + 4, 'E');
  drive_write(base + 5, 'R');
  drive_write(base + 6, 'S');
  drive_write(base + 7, 0);
  drive_write(base + 8, 1);
  drive_write(base + 9, page);
  drive_write(base + 10, 1);
  drive_write(base + 11, 130);

  // A
  drive_write_at(page, 0, 2);
  drive_write_at(page, 1, 5);
  drive_write_at(page, 2, 7);
  drive_write_at(page, 3, 5);
  drive_write_at(page, 4, 5);

  // B
  drive_write_at(page, 5, 6);
  drive_write_at(page, 6, 5);
  drive_write_at(page, 7, 6);
  drive_write_at(page, 8, 5);
  drive_write_at(page, 9, 6);

  // C
  drive_write_at(page, 10, 3);
  drive_write_at(page, 11, 4);
  drive_write_at(page, 12, 4);
  drive_write_at(page, 13, 4);
  drive_write_at(page, 14, 3);

  // D
  drive_write_at(page, 15, 6);
  drive_write_at(page, 16, 5);
  drive_write_at(page, 17, 5);
  drive_write_at(page, 18, 5);
  drive_write_at(page, 19, 6);

  // E
  drive_write_at(page, 20, 7);
  drive_write_at(page, 21, 4);
  drive_write_at(page, 22, 6);
  drive_write_at(page, 23, 4);
  drive_write_at(page, 24, 7);

  // F
  drive_write_at(page, 25, 7);
  drive_write_at(page, 26, 4);
  drive_write_at(page, 27, 6);
  drive_write_at(page, 28, 4);
  drive_write_at(page, 29, 4);

  // G
  drive_write_at(page, 30, 3);
  drive_write_at(page, 31, 4);
  drive_write_at(page, 32, 5);
  drive_write_at(page, 33, 5);
  drive_write_at(page, 34, 3);

  // H
  drive_write_at(page, 35, 5);
  drive_write_at(page, 36, 5);
  drive_write_at(page, 37, 7);
  drive_write_at(page, 38, 5);
  drive_write_at(page, 39, 5);

  // I
  drive_write_at(page, 40, 7);
  drive_write_at(page, 41, 2);
  drive_write_at(page, 42, 2);
  drive_write_at(page, 43, 2);
  drive_write_at(page, 44, 7);

  // J
  drive_write_at(page, 45, 1);
  drive_write_at(page, 46, 1);
  drive_write_at(page, 47, 1);
  drive_write_at(page, 48, 5);
  drive_write_at(page, 49, 2);

  // K
  drive_write_at(page, 50, 5);
  drive_write_at(page, 51, 5);
  drive_write_at(page, 52, 6);
  drive_write_at(page, 53, 5);
  drive_write_at(page, 54, 5);

  // L
  drive_write_at(page, 55, 4);
  drive_write_at(page, 56, 4);
  drive_write_at(page, 57, 4);
  drive_write_at(page, 58, 4);
  drive_write_at(page, 59, 7);

  // M
  drive_write_at(page, 60, 5);
  drive_write_at(page, 61, 7);
  drive_write_at(page, 62, 7);
  drive_write_at(page, 63, 5);
  drive_write_at(page, 64, 5);

  // N
  drive_write_at(page, 65, 5);
  drive_write_at(page, 66, 7);
  drive_write_at(page, 67, 7);
  drive_write_at(page, 68, 7);
  drive_write_at(page, 69, 5);

  // O
  drive_write_at(page, 70, 2);
  drive_write_at(page, 71, 5);
  drive_write_at(page, 72, 5);
  drive_write_at(page, 73, 5);
  drive_write_at(page, 74, 2);

  // P
  drive_write_at(page, 75, 6);
  drive_write_at(page, 76, 5);
  drive_write_at(page, 77, 6);
  drive_write_at(page, 78, 4);
  drive_write_at(page, 79, 4);

  // Q
  drive_write_at(page, 80, 2);
  drive_write_at(page, 81, 5);
  drive_write_at(page, 82, 5);
  drive_write_at(page, 83, 7);
  drive_write_at(page, 84, 3);

  // R
  drive_write_at(page, 85, 6);
  drive_write_at(page, 86, 5);
  drive_write_at(page, 87, 6);
  drive_write_at(page, 88, 5);
  drive_write_at(page, 89, 5);

  // S
  drive_write_at(page, 90, 3);
  drive_write_at(page, 91, 4);
  drive_write_at(page, 92, 2);
  drive_write_at(page, 93, 1);
  drive_write_at(page, 94, 6);

  // T
  drive_write_at(page, 95, 7);
  drive_write_at(page, 96, 2);
  drive_write_at(page, 97, 2);
  drive_write_at(page, 98, 2);
  drive_write_at(page, 99, 2);

  // U
  drive_write_at(page, 100, 5);
  drive_write_at(page, 101, 5);
  drive_write_at(page, 102, 5);
  drive_write_at(page, 103, 5);
  drive_write_at(page, 104, 7);

  // V
  drive_write_at(page, 105, 5);
  drive_write_at(page, 106, 5);
  drive_write_at(page, 107, 5);
  drive_write_at(page, 108, 5);
  drive_write_at(page, 109, 2);

  // W
  drive_write_at(page, 110, 5);
  drive_write_at(page, 111, 5);
  drive_write_at(page, 112, 7);
  drive_write_at(page, 113, 7);
  drive_write_at(page, 114, 5);

  // X
  drive_write_at(page, 115, 5);
  drive_write_at(page, 116, 5);
  drive_write_at(page, 117, 2);
  drive_write_at(page, 118, 5);
  drive_write_at(page, 119, 5);

  // Y
  drive_write_at(page, 120, 5);
  drive_write_at(page, 121, 5);
  drive_write_at(page, 122, 2);
  drive_write_at(page, 123, 2);
  drive_write_at(page, 124, 2);

  // Z
  drive_write_at(page, 125, 7);
  drive_write_at(page, 126, 1);
  drive_write_at(page, 127, 2);
  drive_write_at(page, 128, 4);
  drive_write_at(page, 129, 7);

  print("saved LETTERS");
  putchar(10);
  return 0;
}`},{name:"FS Disque Externe",description:"Petit systeme de fichiers sur le lecteur externe IO",code:`// FS partage avec le bootloader
// Commandes: fmt, ls, touch nom, rm nom, cat nom, free, txt>nom
// Noms de fichiers: 8 caracteres max

int line[12];
int i;
int base;
int name_start;
int name_len;

int read_line() {
  int n;
  int ch;
  n = 0;
  ch = getchar();
  while (ch != 10) {
    if (ch == 64) { return 255; }
    if (n < 11) {
      line[n] = ch;
      n = n + 1;
    }
    putchar(ch);
    ch = getchar();
  }
  line[n] = 0;
  putchar(10);
  return n;
}

int parse_name(int start) {
  int n;
  int ch;
  n = 0;
  while (1) {
    ch = line[start + n];
    if (ch == 0) { break; }
    if (ch == ' ') { break; }
    if (n == 8) { return 255; }
    n = n + 1;
  }
  if (n == 0) { return 255; }
  return n;
}

int print_line_name(int start, int len) {
  i = 0;
  while (i < len) {
    putchar(line[start + i]);
    i = i + 1;
  }
  return 0;
}

int print_entry_name(int base) {
  int j;
  int ch;
  j = 0;
  while (j < 8) {
    ch = drive_read(base + j);
    if (ch == 0) { break; }
    putchar(ch);
    j = j + 1;
  }
  return 0;
}

int write_entry(int base, int page, int size) {
  int j;
  j = 0;
  while (j < 8) {
    if (j < name_len) {
      drive_write(base + j, line[name_start + j]);
    } else {
      drive_write(base + j, 0);
    }
    j = j + 1;
  }
  drive_write(base + 8, 1);
  drive_write(base + 9, page);
  drive_write(base + 10, 1);
  drive_write(base + 11, size);
  return 0;
}

int clear_entry(int base) {
  int j;
  j = 0;
  while (j < 12) {
    drive_write(base + j, 0);
    j = j + 1;
  }
  return 0;
}

int format_drive() {
  drive_clear();
  drive_set_page(0);
  drive_write(0, 66);
  drive_write(1, 3);
  base = 16;
  i = 0;
  while (i < 8) {
    clear_entry(base);
    base = base + 12;
    i = i + 1;
  }
  return 0;
}

int ensure_drive() {
  drive_set_page(0);
  if (drive_read(0) != 66) {
    format_drive();
  }
  drive_set_page(0);
  if (drive_read(1) != 3) {
    format_drive();
  }
  return 0;
}

int main() {
  int n;
  int pos;
  int page;
  int found;
  int free_base;
  int free_page;
  int used;
  int typev;
  ensure_drive();
  print("=== FS DISQUE EXTERNE ===");
  putchar(10);
  print("ls | touch nom | cat nom | free | txt>nom");
  putchar(10);

  while (1) {
    print("# ");
    n = read_line();
    if (n == 255) {
      putchar(10);
      return 0;
    }
    if (n == 0) { continue; }
    drive_set_page(0);

    if (line[0] == 'f') {
      if (line[1] == 'm') {
        if (line[2] == 't') {
          if (line[3] == 0) {
          format_drive();
          print("formatted");
          putchar(10);
          continue;
          }
        }
      }
      if (line[1] == 'r') {
        if (line[2] == 'e') {
          if (line[3] == 'e') {
            if (line[4] == 0) {
            used = 0;
            base = 16;
            i = 0;
            while (i < 8) {
              if (drive_read(base) != 0) {
                used = used + drive_read(base + 10);
              }
              base = base + 12;
              i = i + 1;
            }
            print_num(255 - used);
            putchar('p');
            putchar(10);
            continue;
            }
          }
        }
      }
    }

    if (line[0] == 'l') {
      if (line[1] == 's') {
        if (line[2] == 0) {
        base = 16;
        i = 0;
        while (i < 8) {
          if (drive_read(base) != 0) {
            typev = drive_read(base + 8);
            if (typev == 1) { putchar('f'); } else { putchar('p'); }
            putchar(' ');
            print_entry_name(base);
            putchar(' ');
            if (typev == 1) {
              print_num(drive_read(base + 11));
              putchar('b');
            } else {
              print_num(drive_read(base + 10));
              putchar('p');
            }
            putchar(10);
          }
          base = base + 12;
          i = i + 1;
        }
        continue;
        }
      }
    }

    if (line[0] == 't') {
      if (line[1] == 'o') {
        if (line[2] == 'u') {
          if (line[3] == 'c') {
            if (line[4] == 'h') {
              if (line[5] == ' ') {
                name_start = 6;
                name_len = parse_name(name_start);
                if (name_len == 255) {
                  print("name?");
                  putchar(10);
                  continue;
                }
                found = 255;
                free_base = 255;
                free_page = 0;
                base = 16;
                i = 0;
                while (i < 8) {
                  if (drive_read(base) == 0) {
                    if (free_base == 255) {
                      free_base = base;
                      free_page = 255 - i;
                    }
                  } else {
                    if (drive_read(base) == line[name_start]) { found = base; }
                  }
                  base = base + 12;
                  i = i + 1;
                }
                if (found != 255) {
                  if (drive_read(found + 8) != 1) {
                    print("busy");
                    putchar(10);
                    continue;
                  }
                  write_entry(found, drive_read(found + 9), 0);
                  print("cleared ");
                  print_line_name(name_start, name_len);
                  putchar(10);
                  continue;
                }
                if (free_base == 255) {
                  print("disk full");
                  putchar(10);
                  continue;
                }
                page = free_page;
                write_entry(free_base, page, 0);
                print("created ");
                print_line_name(name_start, name_len);
                putchar(10);
                continue;
              }
            }
          }
        }
      }
    }

    if (line[0] == 'c') {
      if (line[1] == 'a') {
        if (line[2] == 't') {
          if (line[3] == ' ') {
            name_start = 4;
            name_len = parse_name(name_start);
            if (name_len == 255) {
              print("name?");
              putchar(10);
              continue;
            }
            found = 255;
            base = 16;
            i = 0;
            while (i < 8) {
              if (drive_read(base) != 0) {
                if (drive_read(base) == line[name_start]) { found = base; }
              }
              base = base + 12;
              i = i + 1;
            }
            if (found == 255) {
              print("not found");
              putchar(10);
              continue;
            }
            if (drive_read(found + 8) != 1) {
              print("not file");
              putchar(10);
              continue;
            }
            page = drive_read(found + 9);
            used = drive_read(found + 11);
            i = 0;
            while (i < used) {
              putchar(drive_read_at(page, i));
              i = i + 1;
            }
            putchar(10);
            continue;
          }
        }
      }
    }

    pos = 255;
    i = 0;
    while (i < n) {
      if (line[i] == '>') {
        pos = i;
        break;
      }
      i = i + 1;
    }

    if (pos != 255) {
      if (pos + 1 >= n) {
        print("?");
        putchar(10);
        continue;
      }
      name_start = pos + 1;
      name_len = parse_name(name_start);
      if (name_len == 255) {
        print("name?");
        putchar(10);
        continue;
      }
      found = 255;
      free_base = 255;
      free_page = 0;
      base = 16;
      i = 0;
      while (i < 8) {
        if (drive_read(base) == 0) {
          if (free_base == 255) {
            free_base = base;
            free_page = 255 - i;
          }
        } else {
          if (drive_read(base) == line[name_start]) { found = base; }
        }
        base = base + 12;
        i = i + 1;
      }
      if (found == 255) {
        if (free_base == 255) {
          print("disk full");
          putchar(10);
          continue;
        }
        page = free_page;
        found = free_base;
      } else {
        if (drive_read(found + 8) != 1) {
          print("not file");
          putchar(10);
          continue;
        }
        page = drive_read(found + 9);
      }
      i = 0;
      while (i < pos) {
        drive_write_at(page, i, line[i]);
        i = i + 1;
      }
      drive_set_page(0);
      write_entry(found, page, pos);
      print("saved ");
      print_line_name(name_start, name_len);
      putchar(10);
      continue;
    }

    print("?");
    putchar(10);
  }
  return 0;
}`},{name:"Éditeur Texte FS",description:"Mini editeur texte pour les fichiers du disque partage",code:`// Mini editeur texte sur le FS partage avec le bootloader
// Fichier fixe: "notes"
// Tapez du texte pour l'ajouter
// Ligne vide = sauvegarder, /show = afficher, /clear = vider, @ = quitter

int clear_entry(int base) {
  int j;
  j = 0;
  while (j < 12) {
    drive_write(base + j, 0);
    j = j + 1;
  }
  return 0;
}

int format_drive() {
  int base;
  int i;
  drive_clear();
  drive_set_page(0);
  drive_write(0, 66);
  drive_write(1, 3);
  base = 16;
  i = 0;
  while (i < 8) {
    clear_entry(base);
    base = base + 12;
    i = i + 1;
  }
  return 0;
}

int ensure_drive() {
  drive_set_page(0);
  if (drive_read(0) != 66) {
    format_drive();
  }
  drive_set_page(0);
  if (drive_read(1) != 3) {
    format_drive();
  }
  return 0;
}

int is_notes(int base) {
  if (drive_read(base + 0) != 'n') { return 0; }
  if (drive_read(base + 1) != 'o') { return 0; }
  if (drive_read(base + 2) != 't') { return 0; }
  if (drive_read(base + 3) != 'e') { return 0; }
  if (drive_read(base + 4) != 's') { return 0; }
  if (drive_read(base + 5) != 0) { return 0; }
  return 1;
}

int init_notes_entry(int base, int page, int size) {
  drive_write(base + 0, 'n');
  drive_write(base + 1, 'o');
  drive_write(base + 2, 't');
  drive_write(base + 3, 'e');
  drive_write(base + 4, 's');
  drive_write(base + 5, 0);
  drive_write(base + 6, 0);
  drive_write(base + 7, 0);
  drive_write(base + 8, 1);
  drive_write(base + 9, page);
  drive_write(base + 10, 1);
  drive_write(base + 11, size);
  return 0;
}

int find_or_create_notes() {
  int base;
  int i;
  int free_base;
  int free_page;
  free_base = 255;
  free_page = 0;
  base = 16;
  i = 0;
  while (i < 8) {
    if (drive_read(base) == 0) {
      if (free_base == 255) {
        free_base = base;
        free_page = 255 - i;
      }
    } else {
      if (is_notes(base)) {
        return base;
      }
    }
    base = base + 12;
    i = i + 1;
  }
  if (free_base == 255) {
    return 255;
  }
  init_notes_entry(free_base, free_page, 0);
  return free_base;
}

int show_notes(int page, int len) {
  int i;
  if (len == 0) {
    print("(empty)");
    putchar(10);
    return 0;
  }
  i = 0;
  while (i < len) {
    putchar(drive_read_at(page, i));
    i = i + 1;
  }
  if (drive_read_at(page, len - 1) != 10) {
    putchar(10);
  }
  return 0;
}

int main() {
  int line[40];
  int n;
  int ch;
  int base;
  int page;
  int text_len;
  int i;

  ensure_drive();
  base = find_or_create_notes();
  if (base == 255) {
    print("disk full");
    putchar(10);
    return 0;
  }

  page = drive_read(base + 9);
  text_len = drive_read(base + 11);

  print("=== EDITEUR TEXTE FS ===");
  putchar(10);
  print("notes | vide=save | /show | /clear | @ quit");
  putchar(10);
  show_notes(page, text_len);

  while (1) {
    print("notes> ");
    n = 0;
    ch = getchar();
    while (ch != 10) {
      if (ch == 64) {
        putchar(10);
        return 0;
      }
      if (n < 39) {
        line[n] = ch;
        n = n + 1;
      }
      putchar(ch);
      ch = getchar();
    }
    line[n] = 0;
    putchar(10);

    if (n == 0) {
      drive_set_page(0);
      drive_write(base + 11, text_len);
      print("saved notes");
      putchar(10);
      continue;
    }

    if (line[0] == '/') {
      if (line[1] == 's') {
        if (line[2] == 'h') {
          if (line[3] == 'o') {
            if (line[4] == 'w') {
              if (line[5] == 0) {
                show_notes(page, text_len);
                continue;
              }
            }
          }
        }
      }
      if (line[1] == 'c') {
        if (line[2] == 'l') {
          if (line[3] == 'e') {
            if (line[4] == 'a') {
              if (line[5] == 'r') {
                if (line[6] == 0) {
                  text_len = 0;
                  print("buffer cleared");
                  putchar(10);
                  continue;
                }
              }
            }
          }
        }
      }
    }

    i = 0;
    while (i < n) {
      if (text_len == 255) {
        print("full");
        putchar(10);
        i = 255;
        break;
      }
      drive_write_at(page, text_len, line[i]);
      text_len = text_len + 1;
      i = i + 1;
    }
    if (i == 255) { continue; }
    if (text_len < 255) {
      drive_write_at(page, text_len, 10);
      text_len = text_len + 1;
    }
    print("appended");
    putchar(10);
  }
  return 0;
}`},{name:"Éditeur Multi-fichier FS",description:"Editeur texte leger pour ouvrir ou creer plusieurs fichiers",code:`// Editeur multi-fichier avec curseur
// o nom = ouvrir/creer, l = liste, v = vue, s = sauver, c = vider, d = effacer
// Fleches: gauche/droite = curseur, haut = debut, bas = fin
// Toute autre ligne est inseree au curseur, vide = sauver, @ = quitter

int clear_entry(int base) {
  int j;
  j = 0;
  while (j < 12) {
    drive_write(base + j, 0);
    j = j + 1;
  }
  return 0;
}

int format_drive() {
  int base;
  int i;
  drive_clear();
  drive_set_page(0);
  drive_write(0, 66);
  drive_write(1, 3);
  base = 16;
  i = 0;
  while (i < 8) {
    clear_entry(base);
    base = base + 12;
    i = i + 1;
  }
  return 0;
}

int ensure_drive() {
  drive_set_page(0);
  if (drive_read(0) != 66) {
    format_drive();
  }
  drive_set_page(0);
  if (drive_read(1) != 3) {
    format_drive();
  }
  return 0;
}

int print_entry_name(int base) {
  int i;
  int ch;
  i = 0;
  while (i < 8) {
    ch = drive_read(base + i);
    if (ch == 0) { break; }
    putchar(ch);
    i = i + 1;
  }
  return 0;
}

int show_file(int page, int len) {
  int i;
  if (len == 0) {
    print("(empty)");
    putchar(10);
    return 0;
  }
  i = 0;
  while (i < len) {
    putchar(drive_read_at(page, i));
    i = i + 1;
  }
  if (drive_read_at(page, len - 1) != 10) {
    putchar(10);
  }
  return 0;
}

int draw_view(int base, int page, int len, int cursor) {
  int i;

  if (base == 255) {
    print("(o nom pour ouvrir)");
    putchar(10);
    return 0;
  }

  putchar('[');
  print_entry_name(base);
  putchar(']');
  putchar(' ');
  print_num(cursor);
  putchar('/');
  print_num(len);
  putchar(10);

  i = 0;
  while (i < len) {
    if (i == cursor) { putchar('|'); }
    putchar(drive_read_at(page, i));
    i = i + 1;
  }
  if (cursor == len) { putchar('|'); }
  if (len == 0) { putchar('|'); }
  putchar(10);
  return 0;
}

int main() {
  int line[40];
  int n;
  int ch;
  int base;
  int i;
  int j;
  int found;
  int free_base;
  int free_page;
  int start;
  int name_len;
  int match;
  int current_base;
  int current_page;
  int current_len;
  int cursor;
  int left_prev;
  int right_prev;
  int up_prev;
  int down_prev;
  int key;
  int dirty;
  int extra;

  ensure_drive();
  current_base = 255;
  current_page = 0;
  current_len = 0;
  cursor = 0;
  left_prev = 0;
  right_prev = 0;
  up_prev = 0;
  down_prev = 0;
  dirty = 1;

  print("=== EDITEUR CURSEUR FS ===");
  putchar(10);
  print("o nom | l | v | s | c | d | texte");
  putchar(10);

  while (1) {
    ch = getchar_nb();
    if (ch == 64) {
      putchar(10);
      return 0;
    }

    if (ch != 0) {
      if (ch == 10) {
        line[n] = 0;

        if (n == 0) {
          if (current_base == 255) {
            print("open?");
            putchar(10);
          } else {
            drive_set_page(0);
            drive_write(current_base + 11, current_len);
            print("saved ");
            print_entry_name(current_base);
            putchar(10);
          }
          dirty = 1;
          n = 0;
        } else {
          drive_set_page(0);

          if (line[0] == 'l') {
            if (line[1] == 0) {
              base = 16;
              i = 0;
              while (i < 8) {
                if (drive_read(base) != 0) {
                  putchar('f');
                  putchar(' ');
                  print_entry_name(base);
                  putchar(' ');
                  print_num(drive_read(base + 11));
                  putchar('b');
                  putchar(10);
                }
                base = base + 12;
                i = i + 1;
              }
              dirty = 1;
              n = 0;
            }
          }

          if (n != 0) {
            if (line[0] == 'v') {
              if (line[1] == 0) {
                dirty = 1;
                n = 0;
              }
            }
          }

          if (n != 0) {
            if (line[0] == 's') {
              if (line[1] == 0) {
                if (current_base == 255) {
                  print("open?");
                  putchar(10);
                } else {
                  drive_write(current_base + 11, current_len);
                  print("saved ");
                  print_entry_name(current_base);
                  putchar(10);
                }
                dirty = 1;
                n = 0;
              }
            }
          }

          if (n != 0) {
            if (line[0] == 'c') {
              if (line[1] == 0) {
                if (current_base == 255) {
                  print("open?");
                  putchar(10);
                } else {
                  current_len = 0;
                  cursor = 0;
                  print("cleared ");
                  print_entry_name(current_base);
                  putchar(10);
                }
                dirty = 1;
                n = 0;
              }
            }
          }

          if (n != 0) {
            if (line[0] == 'd') {
              if (line[1] == 0) {
                if (current_base == 255) {
                  print("open?");
                  putchar(10);
                } else {
                  if (cursor > 0) {
                    cursor = cursor - 1;
                    i = cursor;
                    while (i + 1 < current_len) {
                      drive_write_at(current_page, i, drive_read_at(current_page, i + 1));
                      i = i + 1;
                    }
                    current_len = current_len - 1;
                    print("deleted");
                    putchar(10);
                  }
                }
                dirty = 1;
                n = 0;
              }
            }
          }

          if (n != 0) {
            if (line[0] == 'o') {
              if (line[1] == ' ') {
                start = 2;
                name_len = 0;
                while (1) {
                  ch = line[start + name_len];
                  if (ch == 0) { break; }
                  if (ch == ' ') { break; }
                  if (name_len == 8) { name_len = 255; break; }
                  name_len = name_len + 1;
                }
                if (name_len == 0 || name_len == 255) {
                  print("name?");
                  putchar(10);
                  dirty = 1;
                  n = 0;
                } else {
                  found = 255;
                  free_base = 255;
                  free_page = 0;
                  base = 16;
                  i = 0;
                  while (i < 8) {
                    if (drive_read(base) == 0) {
                      if (free_base == 255) {
                        free_base = base;
                        free_page = 255 - i;
                      }
                    } else {
                      match = 1;
                      j = 0;
                      while (j < 8) {
                        ch = drive_read(base + j);
                        if (j < name_len) {
                          if (ch != line[start + j]) { match = 0; }
                        } else {
                          if (ch != 0) { match = 0; }
                        }
                        j = j + 1;
                      }
                      if (match == 1) { found = base; }
                    }
                    base = base + 12;
                    i = i + 1;
                  }

                  if (found == 255) {
                    if (free_base == 255) {
                      print("disk full");
                      putchar(10);
                    } else {
                      j = 0;
                      while (j < 8) {
                        if (j < name_len) {
                          drive_write(free_base + j, line[start + j]);
                        } else {
                          drive_write(free_base + j, 0);
                        }
                        j = j + 1;
                      }
                      drive_write(free_base + 8, 1);
                      drive_write(free_base + 9, free_page);
                      drive_write(free_base + 10, 1);
                      drive_write(free_base + 11, 0);
                      current_base = free_base;
                      current_page = free_page;
                      current_len = 0;
                      cursor = 0;
                      print("created ");
                      print_entry_name(current_base);
                      putchar(10);
                    }
                  } else {
                    current_base = found;
                    current_page = drive_read(found + 9);
                    current_len = drive_read(found + 11);
                    cursor = current_len;
                    print("opened ");
                    print_entry_name(current_base);
                    putchar(10);
                  }
                  dirty = 1;
                  n = 0;
                }
              }
            }
          }

          if (n != 0) {
            if (current_base == 255) {
              print("open?");
              putchar(10);
              dirty = 1;
              n = 0;
            } else {
              extra = n + 1;
              if (current_len + extra > 255) {
                print("full");
                putchar(10);
                dirty = 1;
                n = 0;
              } else {
                i = current_len;
                while (i > cursor) {
                  i = i - 1;
                  drive_write_at(current_page, i + extra, drive_read_at(current_page, i));
                }
                i = 0;
                while (i < n) {
                  drive_write_at(current_page, cursor + i, line[i]);
                  i = i + 1;
                }
                drive_write_at(current_page, cursor + n, 10);
                current_len = current_len + extra;
                cursor = cursor + extra;
                print("inserted");
                putchar(10);
                dirty = 1;
                n = 0;
              }
            }
          }
        }
      } else {
        if (n < 39) {
          line[n] = ch;
          n = n + 1;
        }
      }
    }

    key = getKey(0);
    if (key) {
      if (left_prev == 0) {
        if (cursor > 0) {
          cursor = cursor - 1;
          dirty = 1;
        }
      }
    }
    left_prev = key;

    key = getKey(1);
    if (key) {
      if (right_prev == 0) {
        if (cursor < current_len) {
          cursor = cursor + 1;
          dirty = 1;
        }
      }
    }
    right_prev = key;

    key = getKey(2);
    if (key) {
      if (up_prev == 0) {
        if (cursor != 0) {
          cursor = 0;
          dirty = 1;
        }
      }
    }
    up_prev = key;

    key = getKey(3);
    if (key) {
      if (down_prev == 0) {
        if (cursor != current_len) {
          cursor = current_len;
          dirty = 1;
        }
      }
    }
    down_prev = key;

    if (dirty) {
      draw_view(current_base, current_page, current_len, cursor);
      dirty = 0;
    }

    sleep(2);
  }
  return 0;
}`},{name:"Système Solaire 255",description:"Soleil et une planete en orbite circulaire colorés sur 255x255",code:`// Soleil RGB + une planete en orbite circulaire
// @ = quitter

int gx;
int gy;

int anchor(int p) {
  p = p & 31;
  if (p == 0) { gx = 212; gy = 128; return 0; }
  if (p == 1) { gx = 210; gy = 144; return 0; }
  if (p == 2) { gx = 206; gy = 160; return 0; }
  if (p == 3) { gx = 198; gy = 175; return 0; }
  if (p == 4) { gx = 188; gy = 188; return 0; }
  if (p == 5) { gx = 175; gy = 198; return 0; }
  if (p == 6) { gx = 160; gy = 206; return 0; }
  if (p == 7) { gx = 144; gy = 210; return 0; }
  if (p == 8) { gx = 128; gy = 212; return 0; }
  if (p == 9) { gx = 112; gy = 210; return 0; }
  if (p == 10) { gx = 96; gy = 206; return 0; }
  if (p == 11) { gx = 81; gy = 198; return 0; }
  if (p == 12) { gx = 68; gy = 188; return 0; }
  if (p == 13) { gx = 58; gy = 175; return 0; }
  if (p == 14) { gx = 50; gy = 160; return 0; }
  if (p == 15) { gx = 46; gy = 144; return 0; }
  if (p == 16) { gx = 44; gy = 128; return 0; }
  if (p == 17) { gx = 46; gy = 112; return 0; }
  if (p == 18) { gx = 50; gy = 96; return 0; }
  if (p == 19) { gx = 58; gy = 81; return 0; }
  if (p == 20) { gx = 68; gy = 68; return 0; }
  if (p == 21) { gx = 81; gy = 58; return 0; }
  if (p == 22) { gx = 96; gy = 50; return 0; }
  if (p == 23) { gx = 112; gy = 46; return 0; }
  if (p == 24) { gx = 128; gy = 44; return 0; }
  if (p == 25) { gx = 144; gy = 46; return 0; }
  if (p == 26) { gx = 160; gy = 50; return 0; }
  if (p == 27) { gx = 175; gy = 58; return 0; }
  if (p == 28) { gx = 188; gy = 68; return 0; }
  if (p == 29) { gx = 198; gy = 81; return 0; }
  if (p == 30) { gx = 206; gy = 96; return 0; }
  gx = 210;
  gy = 112;
  return 0;
}

int lerp(int a, int b, int s) {
  if (b > a) {
    return a + (((b - a) * s) >> 2);
  }
  return a - (((a - b) * s) >> 2);
}

int place(int p) {
  int x0;
  int y0;
  p = p & 127;
  anchor(p >> 2);
  if ((p & 3) == 0) {
    return 0;
  }
  x0 = gx;
  y0 = gy;
  anchor((p >> 2) + 1);
  gx = lerp(x0, gx, p & 3);
  gy = lerp(y0, gy, p & 3);
  return 0;
}

int orbit() {
  int p;
  color(70, 90, 150);
  p = 0;
  while (p < 128) {
    place(p);
    draw(gx, gy);
    p = p + 1;
  }
  return 0;
}

int planet(int p) {
  int tx;
  int ty;
  place(p);
  color(70, 210, 255);
  draw(gx, gy);
  draw(gx + 1, gy);
  draw(gx - 1, gy);
  draw(gx, gy + 1);
  draw(gx, gy - 1);
  draw(gx + 2, gy);
  draw(gx - 2, gy);
  draw(gx, gy + 2);
  draw(gx, gy - 2);
  draw(gx + 1, gy - 1);
  draw(gx - 1, gy + 1);
  draw(gx + 1, gy + 1);
  draw(gx - 1, gy - 1);
  tx = gx;
  ty = gy;
  color(255, 255, 255);
  place(p - 2);
  draw(gx, gy);
  place(p - 4);
  draw(gx, gy);
  color(30, 180, 90);
  draw(tx + 1, ty - 1);
  draw(tx + 1, ty);
  draw(tx + 1, ty + 1);
  gx = tx;
  gy = ty;
  return 0;
}

int sun() {
  color(255, 220, 80);
  draw(128, 128);
  draw(127, 128); draw(129, 128);
  draw(128, 127); draw(128, 129);
  draw(127, 127); draw(129, 127);
  draw(127, 129); draw(129, 129);
  draw(126, 128); draw(130, 128);
  draw(128, 126); draw(128, 130);
  draw(125, 128); draw(131, 128);
  draw(128, 125); draw(128, 131);
  draw(126, 126); draw(130, 126);
  draw(126, 130); draw(130, 130);
  draw(124, 128); draw(132, 128);
  draw(128, 124); draw(128, 132);
  draw(125, 125); draw(131, 125);
  draw(125, 131); draw(131, 131);
  color(255, 245, 190);
  draw(128, 128);
  draw(127, 128); draw(129, 128);
  draw(128, 127); draw(128, 129);
  return 0;
}

int corona(int t) {
  color(255, 140, 40);
  if ((t & 8) == 0) {
    draw(121, 128); draw(135, 128);
    draw(128, 121); draw(128, 135);
    draw(123, 123); draw(133, 123);
    draw(123, 133); draw(133, 133);
  } else {
    draw(120, 128); draw(136, 128);
    draw(128, 120); draw(128, 136);
    draw(122, 122); draw(134, 122);
    draw(122, 134); draw(134, 134);
  }
  return 0;
}

int main() {
  int t;
  int k;
  int hold;

  print("=== SOLAR 255 ===");
  putchar(10);
  print("sun + orbiting planet");
  putchar(10);
  print("@ quit");
  putchar(10);

  t = 0;
  while (1) {
    k = getchar_nb();
    if (k == 64) {
      putchar(10);
      return 0;
    }

    clear();
    color(180, 180, 220);
    draw(212, 128);
    //orbit();
    sun();
    corona(t);
    planet(t);

    hold = 0;
    while (hold < 10) {
      sleep(255);
      hold = hold + 1;
    }
    t = t + 1;
  }
  return 0;
}`},{name:"Paysage RGB",description:"Grand paysage coloré avec ciel, montagnes, lac et sapins",code:`// Paysage RGB plus complexe
// Ciel en couches, soleil, montagnes, reflets et sapins

int hline(int x0, int x1, int y) {
  int x;
  x = x0;
  while (1) {
    draw(x, y);
    if (x == x1) {
      return 0;
    }
    x = x + 1;
  }
  return 0;
}

int fill_rect(int x0, int y0, int x1, int y1, int r, int g, int b) {
  int y;
  color(r, g, b);
  y = y0;
  while (1) {
    hline(x0, x1, y);
    if (y == y1) {
      return 0;
    }
    y = y + 1;
  }
  return 0;
}

int diamond(int cx, int cy, int radius, int r, int g, int b) {
  int d;
  color(r, g, b);
  d = 0;
  while (1) {
    hline(cx - d, cx + d, cy - d);
    if (d != 0) {
      hline(cx - d, cx + d, cy + d);
    }
    if (d == radius) {
      return 0;
    }
    d = d + 1;
  }
  return 0;
}

int mountain(int cx, int peak_y, int base_y, int r, int g, int b) {
  int y;
  int span;
  color(r, g, b);
  y = peak_y;
  span = 0;
  while (1) {
    hline(cx - span, cx + span, y);
    if (y == base_y) {
      return 0;
    }
    y = y + 1;
    span = span + 1;
  }
  return 0;
}

int pine(int x, int base_y) {
  color(70, 40, 20);
  fill_rect(x, base_y - 12, x + 2, base_y, 70, 40, 20);

  color(10, 70, 25);
  hline(x - 8, x + 10, base_y - 12);
  hline(x - 7, x + 9, base_y - 15);
  hline(x - 6, x + 8, base_y - 18);
  hline(x - 5, x + 7, base_y - 21);
  hline(x - 4, x + 6, base_y - 24);
  hline(x - 3, x + 5, base_y - 27);
  hline(x - 2, x + 4, base_y - 30);
  hline(x - 1, x + 3, base_y - 33);
  hline(x, x + 2, base_y - 36);
  return 0;
}

int reflection() {
  color(255, 210, 90);
  hline(184, 208, 142);
  hline(180, 212, 150);
  hline(176, 216, 158);
  hline(182, 210, 166);
  hline(188, 204, 174);

  color(255, 255, 220);
  hline(192, 200, 146);
  hline(190, 202, 154);
  hline(194, 198, 162);
  return 0;
}

int cloud(int x, int y, int tone) {
  color(tone, tone, tone);
  hline(x - 14, x + 14, y);
  hline(x - 22, x + 10, y + 4);
  hline(x - 10, x + 22, y + 8);
  hline(x - 16, x + 16, y + 12);
  return 0;
}

int ripples() {
  color(84, 172, 220);
  hline(20, 118, 182);
  hline(10, 100, 188);
  hline(140, 250, 194);
  hline(36, 108, 200);
  hline(150, 236, 206);

  color(126, 198, 236);
  hline(48, 128, 180);
  hline(132, 226, 186);
  hline(22, 90, 198);
  hline(168, 240, 210);
  return 0;
}

int stars() {
  color(255, 255, 255);
  draw(18, 14);  draw(40, 22);  draw(72, 10);  draw(104, 18);
  draw(136, 12); draw(154, 28); draw(226, 16); draw(244, 26);
  color(255, 220, 180);
  draw(28, 34);  draw(94, 30);  draw(166, 20); draw(214, 36);
  return 0;
}

int birds() {
  color(32, 20, 24);
  draw(78, 74);  draw(79, 73);  draw(80, 72);  draw(81, 73);  draw(82, 74);
  draw(112, 64); draw(113, 63); draw(114, 62); draw(115, 63); draw(116, 64);
  draw(152, 72); draw(153, 71); draw(154, 70); draw(155, 71); draw(156, 72);
  return 0;
}

int main() {
  clear();

  fill_rect(0, 0, 255, 35, 8, 18, 70);
  fill_rect(0, 36, 255, 78, 36, 86, 160);
  fill_rect(0, 79, 255, 118, 255, 132, 82);
  fill_rect(0, 119, 255, 170, 18, 86, 138);
  fill_rect(0, 171, 255, 214, 14, 66, 110);
  fill_rect(0, 215, 255, 255, 20, 74, 28);

  stars();
  cloud(54, 44, 220);
  cloud(106, 34, 236);
  cloud(236, 58, 205);
  birds();

  diamond(194, 54, 22, 255, 150, 60);
  diamond(194, 54, 16, 255, 214, 88);
  diamond(194, 54, 10, 255, 245, 190);

  mountain(54, 92, 176, 26, 18, 50);
  mountain(126, 62, 176, 48, 26, 76);
  mountain(210, 102, 176, 22, 16, 44);

  color(24, 110, 170);
  hline(0, 255, 171);
  color(32, 130, 190);
  hline(0, 255, 172);
  hline(0, 255, 173);

  reflection();
  ripples();

  pine(18, 230);
  pine(40, 236);
  pine(68, 234);
  pine(216, 232);
  pine(236, 238);

  color(90, 58, 26);
  hline(0, 255, 255);
  hline(0, 255, 254);
  return 0;
}`},{name:"HTTP JSONPlaceholder",description:"GET et POST vers l'API JSONPlaceholder",code:`// Demo reseau avec JSONPlaceholder
// Affiche d'abord un todo en JSON, puis la reponse d'un POST

void print_http_response() {
  int c;
  while ((c = gethttpchar()) != 0) {
    putchar(c);
  }
}

int main() {
  print("GET /todos/1");
  putchar(10);
  get("https://jsonplaceholder.typicode.com/todos/1");
  print_http_response();
  putchar(10);
  putchar(10);

  print("POST /posts");
  putchar(10);
  post(
    "https://jsonplaceholder.typicode.com/posts",
    "{\\"title\\":\\"foo\\",\\"body\\":\\"bar\\",\\"userId\\":1}"
  );
  print_http_response();
  putchar(10);

  return 0;
}`},{name:"Meteo Ales",description:"Open-Meteo en direct avec scene graphique premium",code:`// Meteo temps reel pour Ales via Open-Meteo
// Coordonnees: 44.1249, 4.0808

int temp_abs;
int temp_neg;
int weather_code;
int is_day_now;

int num_started;
int num_value;
int num_sign;
int num_decimal;
int in_string;

void hline(int x1, int x2, int y) {
  int x;
  x = x1;
  while (1) {
    draw(x, y);
    if (x == x2) { return; }
    x = x + 1;
  }
}

void fill_rect(int x1, int y1, int x2, int y2, int r, int g, int b) {
  int y;
  color(r, g, b);
  y = y1;
  while (1) {
    hline(x1, x2, y);
    if (y == y2) { return; }
    y = y + 1;
  }
}

void disc(int cx, int cy, int radius, int r, int g, int b) {
  int dy;
  int dx;
  color(r, g, b);
  dy = 0;
  while (dy <= radius) {
    dx = radius - (dy >> 1);
    hline(cx - dx, cx + dx, cy + dy);
    if (dy != 0) { hline(cx - dx, cx + dx, cy - dy); }
    dy = dy + 1;
  }
}

void cloud(int x, int y, int tone) {
  disc(x, y, 11, tone, tone, tone + 8);
  disc(x + 13, y - 4, 9, tone + 8, tone + 8, tone + 12);
  disc(x + 24, y, 11, tone, tone, tone + 8);
  fill_rect(x - 4, y, x + 28, y + 8, tone - 8, tone - 8, tone);
}

void big_digit(int page, int digit, int x, int y) {
  int row;
  int bits;

  row = 0;
  while (row < 5) {
    bits = drive_read_at(page, digit * 5 + row);
    if (bits & 4) { hline(x, x + 1, y); hline(x, x + 1, y + 1); }
    if (bits & 2) { hline(x + 2, x + 3, y); hline(x + 2, x + 3, y + 1); }
    if (bits & 1) { hline(x + 4, x + 5, y); hline(x + 4, x + 5, y + 1); }
    y = y + 2;
    row = row + 1;
  }
}

void reset_num() {
  num_started = 0;
  num_value = 0;
  num_sign = 0;
  num_decimal = 0;
}

int feed_num(int c) {
  if (!num_started) {
    if (c == 45) { num_started = 1; num_sign = 1; return 0; }
    if (c >= 48 && c <= 57) {
      num_started = 1;
      num_value = c - 48;
    }
    return 0;
  }
  if (c >= 48 && c <= 57) {
    if (num_decimal == 0) {
      num_value = num_value * 10 + (c - 48);
    } else if (num_decimal == 1) {
      if (c >= 53) { num_value = num_value + 1; }
      num_decimal = 2;
    }
    return 0;
  }
  if (c == 46 && num_decimal == 0) {
    num_decimal = 1;
    return 0;
  }
  return 1;
}

void fetch_weather() {
  int c;
  int depth;
  int object_hits;
  int field;
  int started;

  temp_abs = 0;
  temp_neg = 0;
  is_day_now = 1;
  weather_code = 0;
  in_string = 0;
  depth = 0;
  object_hits = 0;
  field = 0;
  started = 0;
  reset_num();

  get("https://api.open-meteo.com/v1/forecast?latitude=44.1249&longitude=4.0808&current=temperature_2m,is_day,weather_code");

  while ((c = gethttpchar()) != 0) {
    if (c == 34) {
      in_string = !in_string;
      continue;
    }
    if (!in_string) {
      if (started) {
        if (feed_num(c)) {
          // Open-Meteo "current" now includes an "interval" field before
          // the requested weather values, so we intentionally skip field 1.
          if (field == 2) {
            temp_abs = num_value;
            temp_neg = num_sign;
          }
          if (field == 3) { is_day_now = num_value; }
          if (field == 4) {
            weather_code = num_value;
            return;
          }
          field = field + 1;
          reset_num();
        }
      }
      if (c == 123) {
        depth = depth + 1;
        if (depth == 2) {
          object_hits = object_hits + 1;
          if (object_hits == 2) {
            started = 1;
            field = 1;
            reset_num();
          }
        }
      }
      if (c == 125) { depth = depth - 1; }
    }
  }
}

void draw_scene() {
  int x;
  int y;
  int level;
  int page;

  clear();

  if (is_day_now) {
    fill_rect(0, 0, 255, 118, 108, 148, 210);
    color(170, 210, 255);
  } else {
    fill_rect(0, 0, 255, 118, 18, 26, 52);
    color(68, 86, 128);
  }

  y = 12;
  while (y < 112) {
    hline(0, 255, y);
    y = y + 20;
  }

  if (is_day_now) {
    disc(204, 44, 20, 255, 220, 96);
    disc(204, 44, 11, 255, 244, 188);
  } else {
    disc(206, 42, 13, 240, 240, 220);
    disc(212, 38, 13, 20, 30, 72);
    color(255, 244, 216);
    draw(28, 18); draw(118, 16); draw(216, 14);
  }

  if (weather_code != 0) {
    cloud(82, 80, 148);
  }

  if ((weather_code >= 51 && weather_code <= 67) || (weather_code >= 80 && weather_code <= 82)) {
    color(126, 190, 255);
    x = 20;
    while (x < 240) {
      draw(x, 94); draw(x + 1, 97); draw(x + 2, 100); draw(x + 4, 106);
      x = x + 16;
    }
  }

  if ((weather_code >= 71 && weather_code <= 77) || weather_code == 85 || weather_code == 86) {
    color(250, 250, 255);
    x = 22;
    while (x < 240) {
      draw(x, 90); draw(x - 1, 90); draw(x + 1, 90); draw(x, 89); draw(x, 91);
      x = x + 18;
    }
  }

  if (is_day_now) {
    fill_rect(0, 118, 255, 255, 28, 68, 38);
    color(34, 92, 54);
  } else {
    fill_rect(0, 118, 255, 255, 8, 20, 18);
    color(16, 34, 28);
  }
  hline(0, 255, 186);
  hline(0, 255, 202);

  fill_rect(18, 40, 28, 182, 232, 236, 242);
  fill_rect(20, 42, 26, 180, 38, 42, 58);
  disc(23, 194, 10, 238, 240, 246);

  level = temp_abs;
  if (level > 34) { level = 34; }
  if (temp_neg) {
    fill_rect(21, 180 - level * 4, 25, 180, 112, 192, 255);
    disc(23, 194, 6, 112, 192, 255);
  } else if (temp_abs > 27) {
    fill_rect(21, 180 - level * 4, 25, 180, 255, 118, 88);
    disc(23, 194, 6, 255, 118, 88);
  } else {
    fill_rect(21, 180 - level * 4, 25, 180, 255, 176, 92);
    disc(23, 194, 6, 255, 176, 92);
  }

  page = 91;
  color(248, 248, 252);
  x = 34;
  y = 170 - level * 4;
  if (temp_neg) {
    hline(x, x + 3, y + 4);
    hline(x, x + 3, y + 5);
    x = x + 6;
  }
  if (temp_abs > 9) {
    big_digit(page, temp_abs / 10, x, y);
    x = x + 8;
  }
  big_digit(page, temp_abs % 10, x, y);
}

int main() {
  putchar(62);
  fetch_weather();
  putchar(84);
  if (temp_neg) { putchar(45); } else { putchar(43); }
  print_num(temp_abs);
  putchar(32);
  print_num(weather_code);
  putchar(10);
  draw_scene();
  return 0;
}`},{name:"Boot Args - Cat",description:"Lit le fichier passe a 'run bootcat nom' via le bloc d'arguments du bootloader",code:`// Utilisation:
//   run bootcat notes
// Le bootloader remplit 0x1018..0x101F et ces built-ins lisent ce bloc.

int main() {
  int i;

  if (boot_argc() == 0) {
    print("NO ARG");
    putchar(10);
    return 0;
  }

  for (i = 0; i < boot_arg_size(); i++) {
    putchar(boot_file_read(i));
  }

  return 0;
}`},{name:"Tableau (Nouvelles Fonctionnalites)",description:"Utilise declarations multiples et tableaux passes aux fonctions",code:`// Demonstration des nouvelles fonctionnalites:
// 1. declarations multiples: int a, b, c;
// 2. parametres de tableau: int values[3]

void sort3(int values[3]) {
  int i, j, tmp;

  for (i = 0; i < 2; i++) {
    for (j = 0; j < 2 - i; j++) {
      if (values[j] > values[j + 1]) {
        tmp = values[j];
        values[j] = values[j + 1];
        values[j + 1] = tmp;
      }
    }
  }
}

int sum3(int values[3]) {
  int i, total;
  total = 0;
  for (i = 0; i < 3; i++) {
    total = total + values[i];
  }
  return total;
}

int main() {
  int a = 42, b = 7, c = 19;
  int data[3];
  int i;

  data[0] = a;
  data[1] = b;
  data[2] = c;

  print("Avant: ");
  for (i = 0; i < 3; i++) {
    print_num(data[i]);
    putchar(32);
  }
  putchar(10);

  sort3(data);

  print("Trie: ");
  for (i = 0; i < 3; i++) {
    print_num(data[i]);
    putchar(32);
  }
  putchar(10);

  print("Somme: ");
  print_num(sum3(data));
  putchar(10);

  return 0;
}`},{name:"Const et String",description:"Montre const, tableaux, strings, longueurs et modification par index",code:`// Donnees constantes globales
const int digits[10] = {48,49,50,51,52,53,54,55,56,57};
const int palette[3] = {0, 128, 255};
const int msg_len = 5;

void patch_text(int text[6]) {
  text[string_len(text) - 1] = 'A';
}

int sum3(int values[3]) {
  return values[0] + values[1] + values[2];
}

int main() {
  string msg = "hello";
  int buf[8] = "hi";
  const int local_mix[3] = {1, 2, 3};
  int i;

  print("Base: ");
  print(msg);
  putchar(32);
  print_num(string_len(msg));
  putchar(47);
  print_num(array_len(msg));
  putchar(10);

  patch_text(msg);
  print("Patch: ");
  print(msg);
  putchar(32);
  print_num(string_len(msg));
  putchar(47);
  print_num(array_len(msg));
  putchar(10);

  buf[2] = '!';
  buf[3] = 0;
  print("Buf: ");
  print(buf);
  putchar(32);
  print_num(string_len(buf));
  putchar(47);
  print_num(array_len(buf));
  putchar(10);

  print("Data: ");
  print_num(palette[1]);
  putchar(32);
  putchar(digits[7]);
  putchar(32);
  print_num(array_len(digits));
  putchar(32);
  print_num(sum3(local_mix));
  putchar(10);

  return 0;
}`}],qM=new Set(Object.keys(Sc));function VM(t){const a=[];let i=t,l=0;const o=i.indexOf(";");let c="";o>=0&&(c=i.substring(o),i=i.substring(0,o));const d=i.match(/^([a-zA-Z_]\w*)\s*:/);d&&(a.push(u.jsx("span",{className:"text-yellow-400 font-bold",children:d[0]},l++)),i=i.substring(d[0].length));const m=i.split(/(\s+)/);let x=!1;for(const h of m)if(h){if(/^\s+$/.test(h)){a.push(u.jsx("span",{children:h},l++));continue}if(!x&&qM.has(h.toUpperCase())){x=!0,a.push(u.jsx("span",{className:"text-cyan-400 font-bold",children:h},l++));continue}if(h.toLowerCase().startsWith(".db")){a.push(u.jsx("span",{className:"text-pink-400 font-bold",children:h},l++));continue}if(/^0x[0-9a-fA-F]+$/.test(h)||/^0b[01]+$/.test(h)||/^-?\d+$/.test(h)){a.push(u.jsx("span",{className:"text-green-400",children:h},l++));continue}if(/^'.'$/.test(h)){a.push(u.jsx("span",{className:"text-amber-300",children:h},l++));continue}if(x&&/^[a-zA-Z_]\w*$/.test(h)){a.push(u.jsx("span",{className:"text-yellow-300",children:h},l++));continue}a.push(u.jsx("span",{className:"text-slate-300",children:h},l++))}return c&&a.push(u.jsx("span",{className:"text-slate-500 italic",children:c},l++)),a}const ZM=new Set(["const","int","string","void","if","else","while","for","return"]),GM=new Set(["putchar","print_num","print","array_len","string_len","console_clear","draw","clear","getchar","getchar_nb","getKey","rand","sleep","drive_read","drive_write","drive_clear","drive_set_page","drive_read_at","drive_write_at","get","post","gethttpchar"]);function YM(t){const a=[];let i=0;const l=/(\/\/.*$|\/\*[\s\S]*?\*\/|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|#\w+|0x[0-9a-fA-F]+|\d+|[a-zA-Z_]\w*|[+\-*/%=!<>&|^~]+|[{}();,[\]]|\s+)/g;let o;for(;(o=l.exec(t))!==null;){const c=o[0];if(/^\s+$/.test(c)){a.push(u.jsx("span",{children:c},i++));continue}if(c.startsWith("//")){a.push(u.jsx("span",{className:"text-slate-500 italic",children:c},i++));continue}if(c.startsWith("/*")){a.push(u.jsx("span",{className:"text-slate-500 italic",children:c},i++));continue}if(c.startsWith("#")){a.push(u.jsx("span",{className:"text-pink-400 font-bold",children:c},i++));continue}if(c.startsWith('"')){a.push(u.jsx("span",{className:"text-amber-300",children:c},i++));continue}if(c.startsWith("'")){a.push(u.jsx("span",{className:"text-amber-300",children:c},i++));continue}if(/^(0x[0-9a-fA-F]+|\d+)$/.test(c)){a.push(u.jsx("span",{className:"text-green-400",children:c},i++));continue}if(ZM.has(c)){a.push(u.jsx("span",{className:"text-purple-400 font-bold",children:c},i++));continue}if(GM.has(c)){a.push(u.jsx("span",{className:"text-cyan-400 font-bold",children:c},i++));continue}if(/^[a-zA-Z_]\w*$/.test(c)){a.push(u.jsx("span",{className:"text-slate-200",children:c},i++));continue}if(/^[+\-*/%=!<>&|^~]+$/.test(c)){a.push(u.jsx("span",{className:"text-sky-300",children:c},i++));continue}if(/^[{}();,[\]]$/.test(c)){a.push(u.jsx("span",{className:"text-slate-400",children:c},i++));continue}a.push(u.jsx("span",{className:"text-slate-300",children:c},i++))}return a}function XM({code:t,onChange:a,errors:i,currentLine:l,onSelectExample:o,language:c}){const{messages:d}=Ot(),m=d.software.editor,x=z.useRef(null),h=z.useRef(null),b=z.useRef(null),g=z.useMemo(()=>t.split(`
`),[t]),v=z.useMemo(()=>new Set(i.map(C=>C.line)),[i]),L=z.useMemo(()=>{const C=new Map;for(const B of i)C.set(B.line,B.message);return C},[i]),w=c==="c"?YM:VM,N=c==="c"?Lb:Ab,T=z.useCallback(()=>{x.current&&h.current&&b.current&&(h.current.scrollTop=x.current.scrollTop,h.current.scrollLeft=x.current.scrollLeft,b.current.scrollTop=x.current.scrollTop)},[]);return z.useEffect(()=>{const C=x.current;if(C)return C.addEventListener("scroll",T),()=>C.removeEventListener("scroll",T)},[T]),u.jsxs("div",{className:"flex flex-col h-full bg-slate-900 border border-slate-700 rounded-md overflow-hidden",children:[u.jsxs("div",{className:"flex items-center gap-2 px-3 py-1.5 bg-slate-800 border-b border-slate-700",children:[u.jsx("span",{className:"text-[11px] font-bold text-slate-300 uppercase tracking-wider mr-2",children:c==="c"?m.titleC:m.titleAsm}),u.jsxs("select",{className:"bg-slate-700 text-slate-300 text-xs rounded px-2 py-1 border border-slate-600 focus:outline-none focus:border-blue-500",onChange:C=>{const B=parseInt(C.target.value);!isNaN(B)&&N[B]&&o(N[B].code)},defaultValue:"",children:[u.jsx("option",{value:"",disabled:!0,children:m.loadExample}),N.map((C,B)=>u.jsxs("option",{value:B,children:[C.name," — ",C.description]},B))]},c)]}),u.jsxs("div",{className:"flex-1 relative flex overflow-hidden",children:[u.jsx("div",{ref:b,className:"w-10 shrink-0 bg-slate-850 border-r border-slate-800 overflow-hidden select-none",style:{backgroundColor:"#1a1f2e"},children:u.jsx("div",{className:"pt-2 px-1",children:g.map((C,B)=>{const D=B+1,E=l===D,_=v.has(D);return u.jsx("div",{className:`text-right font-mono text-[11px] leading-5 pr-1 ${E?"text-green-400 font-bold":_?"text-red-400":"text-slate-600"}`,children:D},B)})})}),u.jsxs("div",{className:"flex-1 relative",children:[u.jsx("div",{ref:h,className:"absolute inset-0 overflow-hidden pointer-events-none p-2","aria-hidden":"true",children:u.jsx("pre",{className:"font-mono text-[12px] leading-5 whitespace-pre m-0 p-0",children:g.map((C,B)=>{const D=B+1,E=l===D,_=v.has(D),P=w(C);return u.jsx("div",{className:`h-5 ${E?"bg-green-500/10 border-l-2 border-green-400 -ml-2 pl-[6px]":_?"bg-red-500/10 border-l-2 border-red-400 -ml-2 pl-[6px]":""}`,title:L.get(D)||void 0,children:P.length>0?P:" "},B)})})}),u.jsx("textarea",{ref:x,value:t,onChange:C=>a(C.target.value),wrap:"off",className:"absolute inset-0 w-full h-full p-2 font-mono text-[12px] leading-5 bg-transparent text-transparent caret-white resize-none outline-none border-0 whitespace-pre overflow-auto selection:bg-blue-500/30",spellCheck:!1,autoComplete:"off",autoCorrect:"off",autoCapitalize:"off"})]})]}),i.length>0&&u.jsx("div",{className:"px-3 py-1.5 bg-red-500/10 border-t border-red-500/30 max-h-20 overflow-y-auto",children:i.map((C,B)=>u.jsxs("div",{className:"text-[11px] text-red-400 font-mono",children:[u.jsxs("span",{className:"text-red-500 font-bold",children:[m.errorLinePrefix,C.line,":"]})," ",C.message]},B))})]})}function cc(t,a=2){return"0x"+t.toString(16).padStart(a,"0").toUpperCase()}function C0({label:t,active:a,color:i}){return u.jsx("span",{className:`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${a?`${i} text-white`:"bg-slate-800 text-slate-600"}`,children:t})}function FM({state:t}){const{messages:a}=Ot(),i=a.software.cpuState;return u.jsxs("div",{className:"bg-slate-900 border border-slate-700 rounded-md p-3",children:[u.jsx("h3",{className:"text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2",children:i.title}),u.jsxs("div",{className:"grid grid-cols-4 gap-3",children:[u.jsxs("div",{className:"bg-slate-800 rounded p-2 text-center",children:[u.jsx("div",{className:"text-[9px] text-slate-500 font-bold uppercase",children:"A"}),u.jsx("div",{className:"text-sm font-mono font-bold text-orange-400",children:cc(t.a)}),u.jsx("div",{className:"text-[10px] font-mono text-slate-400",children:t.a})]}),u.jsxs("div",{className:"bg-slate-800 rounded p-2 text-center",children:[u.jsx("div",{className:"text-[9px] text-slate-500 font-bold uppercase",children:"B"}),u.jsx("div",{className:"text-sm font-mono font-bold text-blue-400",children:cc(t.b)}),u.jsx("div",{className:"text-[10px] font-mono text-slate-400",children:t.b})]}),u.jsxs("div",{className:"bg-slate-800 rounded p-2 text-center",children:[u.jsx("div",{className:"text-[9px] text-slate-500 font-bold uppercase",children:"PC"}),u.jsx("div",{className:"text-sm font-mono font-bold text-green-400",children:cc(t.pc,4)}),u.jsx("div",{className:"text-[10px] font-mono text-slate-400",children:t.pc})]}),u.jsxs("div",{className:"bg-slate-800 rounded p-2 text-center",children:[u.jsx("div",{className:"text-[9px] text-slate-500 font-bold uppercase",children:"SP"}),u.jsx("div",{className:"text-sm font-mono font-bold text-purple-400",children:cc(t.sp,4)}),u.jsxs("div",{className:"text-[10px] font-mono text-slate-400",children:[t.sp,u.jsxs("span",{className:"text-slate-600 ml-1",children:["(",pn-1-t.sp,u.jsx("span",{className:"text-[8px]",children:i.stackSuffix}),")"]})]})]})]}),u.jsxs("div",{className:"flex items-center justify-between mt-2 pt-2 border-t border-slate-800",children:[u.jsxs("div",{className:"flex items-center gap-2",children:[u.jsx("span",{className:"text-[9px] text-slate-500 font-bold uppercase mr-1",children:i.flags}),u.jsx(C0,{label:"Z",active:t.flags.z,color:"bg-yellow-600"}),u.jsx(C0,{label:"C",active:t.flags.c,color:"bg-red-600"}),u.jsx(C0,{label:"N",active:t.flags.n,color:"bg-purple-600"})]}),u.jsxs("div",{className:"text-[10px] text-slate-500 font-mono",children:[u.jsxs("span",{className:"text-slate-600",children:[i.cycles,":"]})," ",u.jsx("span",{className:"text-slate-300",children:t.cycles}),t.halted&&u.jsx("span",{className:"ml-2 text-red-400 font-bold",children:i.halted})]})]})]})}const S0=pn/256;function KM(t){return t<4096?"text-blue-400":t<6144?"text-emerald-400":"text-orange-400"}function WM({memory:t,pc:a,sp:i,highlights:l}){const{messages:o}=Ot(),c=o.software.memoryView,[d,m]=z.useState(0),x=z.useRef(null),[h,b]=z.useState(16),g=d*256;z.useEffect(()=>{const D=x.current;if(!D)return;const E=new ResizeObserver(([_])=>{const P=_.contentRect.width;b(P>=380?16:8)});return E.observe(D),()=>E.disconnect()},[]);const v=256/h,L=z.useMemo(()=>{const D=[];for(let E=0;E<v;E++){const _=g+E*h,P=[];for(let S=0;S<h;S++)P.push(t[_+S]||0);D.push({addr:_,cells:P})}return D},[t,g,h,v]),w=z.useCallback(()=>m(Math.floor(a/256)),[a]),N=z.useCallback(()=>m(Math.floor(i/256)),[i]),T=z.useCallback(()=>m(D=>Math.max(0,D-1)),[]),C=z.useCallback(()=>m(D=>Math.min(S0-1,D+1)),[]),B=z.useCallback(D=>D<4096?c.regionCode:D<6144?c.regionData:c.regionStack,[c.regionCode,c.regionData,c.regionStack]);return u.jsxs("div",{ref:x,className:"bg-slate-900 border border-slate-700 rounded-md overflow-hidden flex flex-col h-full",children:[u.jsxs("div",{className:"flex items-center gap-1 px-2 py-1.5 bg-slate-800 border-b border-slate-700 shrink-0 flex-wrap",children:[u.jsx("span",{className:"text-[11px] font-bold text-slate-300 uppercase tracking-wider mr-1",children:c.title}),u.jsxs("button",{onClick:w,className:"text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-green-500/15 text-green-400 hover:bg-green-500/30 transition-colors flex items-center gap-0.5",title:c.goToPc(`0x${a.toString(16).padStart(4,"0").toUpperCase()}`),children:[u.jsx(tl,{size:9})," PC"]}),u.jsxs("button",{onClick:N,className:"text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-purple-500/15 text-purple-400 hover:bg-purple-500/30 transition-colors flex items-center gap-0.5",title:c.goToSp(`0x${i.toString(16).padStart(4,"0").toUpperCase()}`),children:[u.jsx(K_,{size:9})," SP"]}),u.jsxs("div",{className:"ml-auto flex items-center gap-0.5",children:[u.jsx("button",{onClick:T,disabled:d===0,className:"text-slate-500 hover:text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors",children:u.jsx(gN,{size:14})}),u.jsx("select",{value:d,onChange:D=>m(parseInt(D.target.value)),className:"bg-slate-700 text-slate-300 text-[10px] font-mono rounded px-1.5 py-0.5 border border-slate-600 focus:outline-none focus:border-blue-500",children:Array.from({length:S0},(D,E)=>{const _=E*256;return u.jsxs("option",{value:E,children:["0x",_.toString(16).padStart(4,"0").toUpperCase()," (",B(_),")"]},E)})}),u.jsx("button",{onClick:C,disabled:d===S0-1,className:"text-slate-500 hover:text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors",children:u.jsx(bN,{size:14})}),u.jsx("span",{className:`text-[9px] font-bold ml-1 ${KM(g)}`,children:B(g)})]})]}),u.jsxs("div",{className:"px-2 pt-1 flex font-mono text-[9px] text-slate-600 shrink-0",children:[u.jsx("span",{className:"w-11 shrink-0"}),Array.from({length:h},(D,E)=>u.jsx("span",{className:"flex-1 text-center min-w-0",children:E.toString(16).toUpperCase()},E))]}),u.jsx("div",{className:"flex-1 overflow-y-auto px-2 pb-2 min-h-0",children:L.map(D=>u.jsxs("div",{className:"flex items-center",children:[u.jsx("span",{className:"w-11 shrink-0 font-mono text-[9px] text-slate-600 text-right pr-1",children:D.addr.toString(16).padStart(4,"0").toUpperCase()}),D.cells.map((E,_)=>{const P=D.addr+_,S=P===a,X=P===i,F=l==null?void 0:l.has(P),$=E!==0;return u.jsx("span",{className:`flex-1 text-center font-mono text-[10px] leading-5 rounded-sm min-w-0 ${S?"bg-green-500/30 text-green-300 font-bold":X?"bg-purple-500/25 text-purple-300 font-bold":F?"bg-amber-500/20 text-amber-300":$?"text-slate-300":"text-slate-700"}`,title:c.cellTitle({addrHex:`0x${P.toString(16).padStart(4,"0").toUpperCase()}`,value:E,valueHex:`0x${E.toString(16).padStart(2,"0").toUpperCase()}`,isPc:S,isSp:X}),children:E.toString(16).padStart(2,"0").toUpperCase()},_)})]},D.addr))})]})}function wb({output:t,onClear:a,onInput:i}){const{messages:l}=Ot(),o=l.software.console,c=z.useRef(null),[d,m]=z.useState(""),x=t.join(""),h=z.useRef(x);z.useEffect(()=>{c.current&&h.current!==x&&(c.current.scrollTop=c.current.scrollHeight,h.current=x)},[x]);const b=()=>{d&&i&&(i(d),m(""))};return u.jsxs("div",{className:"flex h-[300px] min-h-[300px] flex-col overflow-hidden rounded-md border border-slate-700 bg-slate-900",children:[u.jsxs("div",{className:"flex items-center justify-between px-3 py-1.5 bg-slate-800 border-b border-slate-700",children:[u.jsxs("div",{className:"flex items-center gap-2",children:[u.jsx(wf,{size:14,className:"text-green-400"}),u.jsx("span",{className:"text-[11px] font-bold text-slate-300 uppercase tracking-wider",children:o.title})]}),u.jsx("button",{onClick:a,className:"text-slate-500 hover:text-red-400 transition-colors",title:o.clear,children:u.jsx(gs,{size:14})})]}),u.jsxs("div",{ref:c,className:"min-h-0 flex-1 overflow-y-auto bg-black p-3 font-mono text-sm leading-relaxed text-green-400 whitespace-pre-wrap break-all",children:[x||u.jsx("span",{className:"text-slate-600 italic",children:o.waiting}),u.jsx("span",{className:"inline-block w-2 h-4 bg-green-400 animate-pulse ml-0.5 align-text-bottom"})]}),i&&u.jsxs("div",{className:"flex items-center gap-1 px-2 py-1.5 bg-slate-900 border-t border-slate-700",children:[u.jsx("span",{className:"text-green-400 text-xs font-mono font-bold",children:">"}),u.jsx("input",{type:"text",value:d,onChange:g=>m(g.target.value),onKeyDown:g=>{g.key==="Enter"&&(g.preventDefault(),b())},className:"flex-1 bg-black text-green-400 text-sm font-mono px-2 py-1 border border-slate-700 rounded outline-none focus:border-green-500",placeholder:o.placeholder})]})]})}const uc=256;function Db({pixels:t,currentColor:a=dn,onClear:i}){const{messages:l}=Ot(),o=l.software.plotter,c=z.useRef(null),[d,m]=z.useState(!1);z.useEffect(()=>{const b=c.current;if(!b)return;const g=b.getContext("2d");if(g&&(g.fillStyle="#000000",g.fillRect(0,0,uc,uc),t.size>0))for(const[v,L]of t.entries()){const{r:w,g:N,b:T}=Df(L),C=v&255,B=v>>8&255;g.fillStyle=`rgb(${w}, ${N}, ${T})`,g.fillRect(C,B,1,1)}},[t,d]),z.useEffect(()=>{if(!d)return;const b=g=>{g.key==="Escape"&&m(!1)};return window.addEventListener("keydown",b),()=>window.removeEventListener("keydown",b)},[d]);const x=u.jsxs("div",{className:"flex items-center justify-between px-3 py-1.5 bg-slate-800 border-b border-slate-700 shrink-0",children:[u.jsxs("div",{className:"flex items-center gap-2",children:[u.jsx(yf,{size:14,className:"text-cyan-400"}),u.jsx("span",{className:"text-[11px] font-bold text-slate-300 uppercase tracking-wider",children:"Plotter"}),t.size>0&&u.jsxs("span",{className:"text-[9px] text-slate-500 font-mono",children:[t.size," ",o.pixels]}),u.jsxs("span",{className:"text-[9px] text-slate-500 font-mono",children:["rgb(",a.r,",",a.g,",",a.b,")"]}),u.jsx("span",{className:"w-2.5 h-2.5 rounded-sm border border-slate-600",style:{backgroundColor:`rgb(${a.r}, ${a.g}, ${a.b})`}})]}),u.jsxs("div",{className:"flex items-center gap-2",children:[u.jsx("button",{onClick:i,className:"text-slate-500 hover:text-red-400 transition-colors",title:o.clear,children:u.jsx(gs,{size:14})}),u.jsx("button",{onClick:()=>m(b=>!b),className:"text-slate-500 hover:text-cyan-400 transition-colors",title:d?o.exitFullscreen:o.fullscreen,children:d?u.jsx(W_,{size:14}):u.jsx(Ns,{size:14})})]})]}),h=u.jsx("canvas",{ref:c,width:uc,height:uc,className:"block h-full w-full",style:{imageRendering:"pixelated"}});return d?u.jsxs(u.Fragment,{children:[u.jsx("div",{className:"flex flex-col h-full bg-slate-900 border border-slate-700 rounded-md overflow-hidden",children:u.jsx("div",{className:"flex items-center justify-center flex-1 bg-black",children:u.jsx("span",{className:"text-[10px] text-slate-600 font-mono",children:o.fullscreenActive})})}),u.jsxs("div",{className:"fixed inset-0 z-50 bg-slate-700 flex flex-col",children:[x,u.jsx("div",{className:"flex flex-1 min-h-0 items-center justify-center bg-slate-950 p-3",children:u.jsx("div",{className:"aspect-square h-full max-w-full",children:h})}),u.jsx("div",{className:"shrink-0 text-center pb-1",children:u.jsx("span",{className:"text-[10px] text-slate-500 font-mono",children:o.escapeToExit})})]})]}):u.jsxs("div",{className:"flex flex-col h-full bg-slate-900 border border-slate-700 rounded-md overflow-hidden",children:[x,u.jsx("div",{className:"flex flex-1 min-h-[80px] min-h-0 items-center justify-center bg-black p-1",children:u.jsx("div",{className:"aspect-square h-full max-w-full",children:h})})]})}function N0({direction:t,initialRatio:a=.5,minRatio:i=.15,maxRatio:l=.85,first:o,second:c,className:d=""}){const[m,x]=z.useState(a),h=z.useRef(null),b=z.useRef(!1),g=t==="horizontal",v=z.useCallback(w=>{w.preventDefault(),b.current=!0,document.body.style.cursor=g?"col-resize":"row-resize",document.body.style.userSelect="none"},[g]);z.useEffect(()=>{const w=T=>{if(!b.current||!h.current)return;const C=h.current.getBoundingClientRect();let B;g?B=(T.clientX-C.left)/C.width:B=(T.clientY-C.top)/C.height,B=Math.max(i,Math.min(l,B)),x(B)},N=()=>{b.current&&(b.current=!1,document.body.style.cursor="",document.body.style.userSelect="")};return window.addEventListener("mousemove",w),window.addEventListener("mouseup",N),()=>{window.removeEventListener("mousemove",w),window.removeEventListener("mouseup",N)}},[g,i,l]);const L=g?{width:`${m*100}%`,height:"100%"}:{height:`${m*100}%`,width:"100%"};return u.jsxs("div",{ref:h,className:`flex ${g?"flex-row":"flex-col"} ${d}`,style:{overflow:"hidden"},children:[u.jsx("div",{className:"overflow-hidden",style:{...L,flexShrink:0},children:o}),u.jsx("div",{onMouseDown:v,className:`shrink-0 flex items-center justify-center group ${g?"w-1.5 cursor-col-resize hover:bg-blue-500/20":"h-1.5 cursor-row-resize hover:bg-blue-500/20"} transition-colors`,children:u.jsx("div",{className:`rounded-full bg-slate-700 group-hover:bg-blue-400 transition-colors ${g?"w-0.5 h-8":"h-0.5 w-8"}`})}),u.jsx("div",{className:"flex-1 overflow-hidden min-w-0 min-h-0",children:c})]})}function ue(t,a=2){return`0x${(t>>>0).toString(16).padStart(a,"0").toUpperCase()}`}function Ec(t){return t<1024?`${t} B`:`${(t/1024).toFixed(1)} KB`}function Rc(t){return t===10?"\\n":t===9?"\\t":t===8?"\\b":t===27?"ESC":t<32||t>126?".":String.fromCharCode(t)}function kc(t,a=48){const i=[],l=Math.min(t.length??0,a);for(let o=0;o<l;o++)i.push(Rc(t[o]??0));return i.join("")}function QM(t,a){const i=t[a]??0,l=lr[i],o=(l==null?void 0:l.size)??1,c=Array.from({length:o},(m,x)=>t[a+x]??0),d=o===3?(t[a+2]??0)<<8|(t[a+1]??0):0;return{addr:a,opcode:i,operand:d,size:o,bytes:c,mnemonic:(l==null?void 0:l.mnemonic)??"DB",description:(l==null?void 0:l.description)??"Unknown instruction",label:l?o===3?`${l.mnemonic} ${ue(d,4)}`:l.mnemonic:`DB ${ue(i)}`}}function e5(t,a){if(t<0)return"No instruction executed yet";const i=lr[t];return i?i.size===3?`${i.mnemonic} ${ue(a,4)}`:i.mnemonic:`DB ${ue(t)}`}function t5(t){const a=gb(t),i=a.reduce((d,m)=>d+m.pageCount,0),l=Math.max(0,Yc-Xc-i),o=i*mn,c=l*mn;return{entries:a,usedPages:i,freePages:l,usedBytes:o,freeBytes:c}}function n5(t){return t===pb?"file":t===mb?"program":`type-${t}`}function a5(t,a,i){const l=a*mn+i;let o="";for(let c=0;c<Ja;c++){const d=t[l+c]??0;if(d===0)break;o+=String.fromCharCode(d)}return o}function Ix(t,a,i){return Array.from({length:i},(l,o)=>({addr:a+o,value:t[a+o]??0}))}function i5(t,a,i){let l=0;for(let o=a;o<i;o++)(t[o]??0)!==0&&l++;return l}function r5(t){return[...t].sort((a,i)=>a.startPage-i.startPage||a.name.localeCompare(i.name))}function ma(t,a){return a.includes(t)}function Hx(t){return t===10?"\\n":t===9?"\\t":t===0?"NUL":t<32||t>126?".":String.fromCharCode(t)}function l5(t,a){const i=t[a+1&8191]??0;return((t[a+2&8191]??0)<<8|i)&8191}function es(t,a=20){return t?t.length>a?`${t.slice(0,a-1)}…`:t:"idle"}function s5(t){for(const[a,i]of Object.entries(U))if(i===t)return a;return"NOP"}function o5(t,a,i,l,o){return t===U.PUSH||t===U.POP||t===U.CALL||t===U.RET?{address:o&8191,label:"STACK"}:t===U.LDAI?{address:a+i&8191,label:"A+IMM"}:t===U.STAI?{address:a+l&8191,label:"B+IMM"}:{address:a&8191,label:"IMM"}}function c5(t,a,i,l){const o=ma(t,[U.ADD,U.SUB,U.AND,U.OR,U.XOR,U.CMP]),c=i&255,d=o?a&255:l&255;let m=c,x=!1,h="PASS";if(ma(t,[U.ADD,U.ADDB,U.INC])){const b=t===U.INC?1:d,g=c+b;m=g&255,x=g>255,h="ADD"}else if(ma(t,[U.SUB,U.SUBB,U.CMP,U.CMPB,U.DEC])){const b=t===U.DEC?1:d,g=c-b;m=g&255,x=g<0,h="SUB"}else ma(t,[U.AND,U.ANDB])?(m=c&d,h="AND"):ma(t,[U.OR,U.ORB])?(m=c|d,h="OR"):ma(t,[U.XOR,U.XORB])?(m=c^d,h="XOR"):t===U.NOT?(m=~c&255,h="NOT"):t===U.SHL?(x=(c&128)!==0,m=c<<1&255,h="SHL"):t===U.SHR?(x=(c&1)!==0,m=c>>1&255,h="SHR"):t===U.TBA?(m=d,h="MOV"):t===U.TAB&&(m=c,h="MOV");return{opName:h,a:c,b:d,result:m,zero:m===0,carry:x,negative:(m&128)!==0,immediate:o}}function u5(t){const a=t.state.memory[t.state.pc]??0,i=l5(t.state.memory,t.state.pc),l=t.clockBit===1,o=t.state.pc&8191,c=t.state.memory[o]??0,d=o5(a,i,t.state.a,t.state.b,t.state.sp),m=ma(a,[U.LDM,U.LBM,U.LDAI,U.POP,U.RET]),x=ma(a,[U.STA,U.STB,U.STAI,U.PUSH,U.CALL]),h=t.consoleOutput.length>0&&t.consoleOutput.join("").charCodeAt(t.consoleOutput.join("").length-1)||0,b=t.consoleOutput.join(""),g=["LEFT","RIGHT","UP","DOWN","ENTER"].filter((v,L)=>t.keyState[L]===1);return{pulseOn:l,instruction:{opcode:a,operand:i,mnemonic:s5(a)},memory:{fetchAddress:o,fetchByte:c,operandAddress:d.address,operandAddressLabel:d.label,operandData:t.state.memory[d.address]??0,fetchActive:!0,readActive:m,writeActive:x,writeValue:a===U.STB?t.state.b:t.state.a},alu:c5(a,i,t.state.a,t.state.b),console:{writeActive:ma(a,[U.OUTA,U.OUTD,U.OUT]),readActive:a===U.INA,latestChar:Hx(h),outputLength:b.length,inputDepth:t.consoleInputBuffer.length,outputPreview:es(b.slice(-20)||""),inputPreview:es(Array.from(t.consoleInputBuffer.slice(0,8),v=>Hx(v)).join(""))},plotter:{drawActive:a===U.DRAW,clearActive:a===U.CLR,colorActive:ma(a,[U.COLR,U.COLG,U.COLB]),pixels:t.plotterPixels.size,colorText:`${t.plotterColor.r}/${t.plotterColor.g}/${t.plotterColor.b}`,x:t.state.a,y:t.state.b,colorR:t.plotterColor.r,colorG:t.plotterColor.g,colorB:t.plotterColor.b},keyboard:{readActive:a===U.GETKEY,activeKeys:g},drive:{readActive:a===U.DRVRD,writeActive:a===U.DRVWR,clearActive:a===U.DRVCLR,page:t.drivePage,address:t.driveLastAddr,lastRead:t.driveLastRead,lastWrite:t.driveLastWrite,dataOut:t.state.b},network:{getActive:a===U.HTTPGET,postActive:a===U.HTTPPOST,readActive:a===U.HTTPIN,requestActive:a===U.HTTPGET||a===U.HTTPPOST,pending:t.networkPending,status:t.networkStatus,lastByte:t.networkLastByte,responseBytes:t.networkResponseBuffer.length,requestAddress:d.address,requestAddressLabel:d.label,urlPreview:es(t.networkUrl||t.networkCompletedUrl||""),bodyPreview:es(t.networkBody||t.networkCompletedBody||"",18),responsePreview:es(t.networkCompletedResponseText||String.fromCharCode(...t.networkResponseBuffer.slice(0,12)),18)}}}const il=320,Mf=144,Ef=28,d5=24,Cb=12,f5=16;function ge(t,a,i,l,o=!1){return{id:t,label:a,value:i,handleType:l,active:o}}function Vn(t,a,i,l){return{id:t,type:"architecture",position:{x:a,y:i},draggable:!1,data:l}}function Sb(t){const a=t.leftPins??[],i=t.rightPins??[],l=Math.max(a.length,i.length,1);return Rf(t)+l*Ef+d5}function p5(t){return t.plotterPreview?220:t.consolePreview?112:0}function Rf(t){const a=p5(t);return Mf+a+(a>0?f5:0)}function Ue(t,a,i,l,o,c,d,m,x){return{id:t,type:"signal",source:a,sourceHandle:i,target:l,targetHandle:o,animated:m,markerEnd:{type:ps.ArrowClosed,width:18,height:18,color:d},data:{label:c,color:d,active:m,pulseOn:x}}}function m5(t,a=36){return t.length>a?`${t.slice(0,a-1)}...`:t}function Ve(t,a,i){return t==="fr"?i:a}function h5(t,a){const i=t.replaceAll("\r",""),l=i.split(`
`),o=(i.endsWith(`
`)?[...l,""]:l).slice(-6).map(c=>m5(c||" "));return{lines:o.length>0?o:[Ve(a,"idle","inactif")]}}function x5(t){return`#${t.toString(16).padStart(6,"0")}`}function g5(t){const l=new Map;for(const[o,c]of t){const d=o&255,m=o>>8&255,x=Math.floor(d*48/256),h=Math.floor(m*48/256),{r:b,g,b:v}=Df(c);l.set(`${x}:${h}`,{x,y:h,color:x5(b<<16|g<<8|v)})}return{width:48,height:48,pixels:Array.from(l.values())}}function _5(t,a="en"){const i=u5(t),l=i.memory.readActive||i.memory.writeActive,o=i.drive.readActive||i.drive.writeActive||i.drive.clearActive,c=i.network.requestActive||i.network.pending||i.network.readActive,d=i.network.pending||i.network.readActive,m=`${ue(i.plotter.colorR)}/${ue(i.plotter.colorG)}/${ue(i.plotter.colorB)}`,x=Ve(a,"slot","slot")+` ${ue(t.state.a)}`,h=[Vn("console",20,40,{title:Ve(a,"Console Terminal","Terminal console"),subtitle:Ve(a,"CPU writes chars and reads queued input","Le CPU écrit des caractères et lit l’entrée en file"),tone:"io",icon:"console",metrics:[{label:"OUTPUT",value:i.console.outputPreview},{label:"INPUT",value:i.console.inputPreview},{label:"LAST BYTE",value:i.console.latestChar},{label:"QUEUE",value:`${i.console.inputDepth} ${Ve(a,"bytes","octets")}`}],consolePreview:h5(t.consoleOutput.join(""),a),leftPins:[ge("write-data","WRITE BYTE",i.console.latestChar,"target",i.console.writeActive),ge("read-req","READ STB",i.console.readActive?"1":"0","target",i.console.readActive)],rightPins:[ge("input-byte","INPUT BYTE",i.console.inputPreview,"source",i.console.readActive)]}),Vn("keyboard",20,420,{title:Ve(a,"Keyboard Matrix","Matrice clavier"),subtitle:Ve(a,"selection index in A, state returns to CPU","index de sélection dans A, état renvoyé au CPU"),tone:"io",icon:"keyboard",metrics:[{label:"ACTIVE",value:i.keyboard.activeKeys.join(", ")||Ve(a,"none","aucune")},{label:"SELECT",value:x},{label:"READ",value:i.keyboard.readActive?Ve(a,"scan","scan"):Ve(a,"idle","inactif")}],leftPins:[ge("select","SELECT",x,"target",i.keyboard.readActive),ge("read","READ STB",i.keyboard.readActive?"1":"0","target",i.keyboard.readActive)],rightPins:[ge("state","KEY STATE",i.keyboard.activeKeys.join(",")||"idle","source",i.keyboard.readActive)]}),Vn("cpu",420,120,{title:Ve(a,"CPU Core","Coeur CPU"),subtitle:`${i.instruction.mnemonic} @ ${ue(t.state.pc,4)} • ${Ve(a,"cycles","cycles")} ${t.state.cycles}`,tone:"cpu",icon:"cpu",metrics:[{label:"A",value:ue(t.state.a)},{label:"B",value:ue(t.state.b)},{label:"PC",value:ue(t.state.pc,4)},{label:"OPERAND",value:ue(i.instruction.operand,4)},{label:"SP",value:ue(t.state.sp,4)},{label:"PULSE",value:i.pulseOn?Ve(a,"HIGH","HAUT"):Ve(a,"LOW","BAS")}],leftPins:[ge("mem-fetch","FETCH BYTE",ue(i.memory.fetchByte),"target",!0),ge("mem-read","MEM DATA",ue(i.memory.operandData),"target",i.memory.readActive),ge("alu-out","ALU RESULT",ue(i.alu.result),"target",!0),ge("alu-flags","FLAGS",`${i.alu.zero?1:0}/${i.alu.carry?1:0}/${i.alu.negative?1:0}`,"target",!0),ge("con-in","CONSOLE IN",i.console.inputPreview,"target",i.console.readActive),ge("key-in","KEY STATE",i.keyboard.activeKeys.join(",")||"idle","target",i.keyboard.readActive),ge("drv-in","DRIVE IN",ue(i.drive.lastRead),"target",i.drive.readActive),ge("net-in","NET IN",i.network.responsePreview,"target",d)],rightPins:[ge("fetch-pc","FETCH PC",ue(i.memory.fetchAddress,4),"source",!0),ge("mem-addr","MEM ADDR",`${i.memory.operandAddressLabel} ${ue(i.memory.operandAddress,4)}`,"source",l),ge("mem-data","MEM WRITE",ue(i.memory.writeValue),"source",i.memory.writeActive),ge("mem-read-req","MEM READ",i.memory.readActive?"1":"0","source",i.memory.readActive),ge("mem-we","MEM WRITE EN",i.memory.writeActive?"1":"0","source",i.memory.writeActive),ge("alu-a","ALU A",ue(i.alu.a),"source",!0),ge("alu-b","ALU B",ue(i.alu.b),"source",!0),ge("alu-op","ALU OP",i.alu.opName,"source",!0),ge("con-out","CONSOLE OUT",i.console.latestChar,"source",i.console.writeActive),ge("con-rd","CONSOLE RD",i.console.readActive?"1":"0","source",i.console.readActive),ge("key-sel","KEY SLOT",x,"source",i.keyboard.readActive),ge("key-rd","KEY READ",i.keyboard.readActive?"1":"0","source",i.keyboard.readActive),ge("plot-x","PLOT X",ue(i.plotter.x),"source",i.plotter.drawActive),ge("plot-y","PLOT Y",ue(i.plotter.y),"source",i.plotter.drawActive),ge("plot-color","PLOT RGB",m,"source",i.plotter.colorActive||i.plotter.drawActive),ge("plot-draw","PLOT DRAW",i.plotter.drawActive?"1":"0","source",i.plotter.drawActive),ge("plot-clear","PLOT CLR",i.plotter.clearActive?"1":"0","source",i.plotter.clearActive),ge("drv-page","DRIVE PAGE",ue(i.drive.page),"source",o),ge("drv-addr","DRIVE ADDR",ue(i.drive.address,4),"source",o),ge("drv-data","DRIVE DATA",ue(i.drive.dataOut),"source",i.drive.writeActive),ge("drv-rd","DRIVE RD",i.drive.readActive?"1":"0","source",i.drive.readActive),ge("drv-wr","DRIVE WR",i.drive.writeActive?"1":"0","source",i.drive.writeActive),ge("drv-clr","DRIVE CLR",i.drive.clearActive?"1":"0","source",i.drive.clearActive),ge("net-addr","HTTP PTR",`${i.network.requestAddressLabel} ${ue(i.network.requestAddress,4)}`,"source",c),ge("net-get","HTTP GET",i.network.getActive?"1":"0","source",i.network.getActive),ge("net-post","HTTP POST",i.network.postActive?"1":"0","source",i.network.postActive),ge("net-rd","HTTP READ",i.network.readActive?"1":"0","source",i.network.readActive)]}),Vn("memory-bus",850,100,{title:Ve(a,"Memory Bus","Bus mémoire"),subtitle:Ve(a,"fetch lane + operand lane + read/write strobes","voie fetch + voie opérande + impulsions lecture/écriture"),tone:"bus",icon:"bus",metrics:[{label:"FETCH @",value:ue(i.memory.fetchAddress,4)},{label:"OPERAND @",value:`${i.memory.operandAddressLabel} ${ue(i.memory.operandAddress,4)}`},{label:"FETCH BYTE",value:ue(i.memory.fetchByte)},{label:"DATA BYTE",value:ue(i.memory.operandData)}],leftPins:[ge("fetch-in","FETCH ADDR",ue(i.memory.fetchAddress,4),"target",!0),ge("addr-in","OPERAND ADDR",ue(i.memory.operandAddress,4),"target",l),ge("data-in","WRITE DATA",ue(i.memory.writeValue),"target",i.memory.writeActive),ge("read-in","READ STB",i.memory.readActive?"1":"0","target",i.memory.readActive),ge("we-in","WRITE STB",i.memory.writeActive?"1":"0","target",i.memory.writeActive),ge("fetch-data-in","FETCH BYTE",ue(i.memory.fetchByte),"target",!0),ge("read-data-in","READ BYTE",ue(i.memory.operandData),"target",i.memory.readActive||i.network.requestActive)],rightPins:[ge("fetch-addr-out","FETCH ADDR",ue(i.memory.fetchAddress,4),"source",!0),ge("addr-out","OPERAND ADDR",ue(i.memory.operandAddress,4),"source",l),ge("data-out","WRITE DATA",ue(i.memory.writeValue),"source",i.memory.writeActive),ge("read-out","READ STB",i.memory.readActive?"1":"0","source",i.memory.readActive||i.network.requestActive),ge("we-out","WRITE STB",i.memory.writeActive?"1":"0","source",i.memory.writeActive),ge("fetch-out","FETCH -> CPU",ue(i.memory.fetchByte),"source",!0),ge("operand-out","DATA -> CPU",ue(i.memory.operandData),"source",i.memory.readActive),ge("cstring-out","RAM -> URL/BODY",`${i.network.requestAddressLabel} ${ue(i.network.requestAddress,4)}`,"source",i.network.requestActive)]}),Vn("memory",1280,100,{title:"SRAM",subtitle:Ve(a,"program bytes, stack, userland strings, and data","octets programme, pile, chaînes userland et données"),tone:"memory",icon:"memory",metrics:[{label:"FETCH BYTE",value:ue(i.memory.fetchByte)},{label:"OPERAND BYTE",value:ue(i.memory.operandData)},{label:"READ",value:i.memory.readActive?Ve(a,"active","actif"):Ve(a,"idle","inactif")},{label:"WRITE",value:i.memory.writeActive?ue(i.memory.writeValue):Ve(a,"idle","inactif")}],leftPins:[ge("fetch-addr","FETCH ADDR",ue(i.memory.fetchAddress,4),"target",!0),ge("addr","OPERAND ADDR",ue(i.memory.operandAddress,4),"target",l),ge("read","READ STB",i.memory.readActive?"1":"0","target",i.memory.readActive||i.network.requestActive),ge("data","WRITE DATA",ue(i.memory.writeValue),"target",i.memory.writeActive),ge("write","WRITE STB",i.memory.writeActive?"1":"0","target",i.memory.writeActive)],rightPins:[ge("fetch","FETCH BYTE",ue(i.memory.fetchByte),"source",!0),ge("operand","READ BYTE",ue(i.memory.operandData),"source",i.memory.readActive||i.network.requestActive)]}),Vn("alu",420,980,{title:Ve(a,"ALU State","État ALU"),subtitle:i.alu.immediate?Ve(a,"immediate operand in B lane","opérande immédiat dans la voie B"):Ve(a,"register-to-register lane","voie registre à registre"),tone:"alu",icon:"alu",metrics:[{label:"OP",value:i.alu.opName},{label:"A",value:ue(i.alu.a)},{label:"B",value:ue(i.alu.b)},{label:"RESULT",value:ue(i.alu.result)},{label:"ZERO/CARRY/NEG",value:`${i.alu.zero?1:0}/${i.alu.carry?1:0}/${i.alu.negative?1:0}`}],leftPins:[ge("a-in","A IN",ue(i.alu.a),"target",!0),ge("b-in","B IN",ue(i.alu.b),"target",!0),ge("op-in","OP IN",i.alu.opName,"target",!0)],rightPins:[ge("result","RESULT",ue(i.alu.result),"source",!0),ge("flags","FLAGS",`${i.alu.zero?1:0}/${i.alu.carry?1:0}/${i.alu.negative?1:0}`,"source",!0)]}),Vn("plotter-stage",850,620,{title:Ve(a,"Plotter Latches","Verrous plotter"),subtitle:Ve(a,"A -> X, B -> Y, RGB registers, draw/clear strobes","A -> X, B -> Y, registres RGB, impulsions draw/clear"),tone:"bus",icon:"bus",metrics:[{label:"X",value:ue(i.plotter.x)},{label:"Y",value:ue(i.plotter.y)},{label:"RGB",value:m},{label:"MODE",value:i.plotter.clearActive?Ve(a,"clear","effacer"):i.plotter.drawActive?Ve(a,"draw","dessin"):i.plotter.colorActive?Ve(a,"color","couleur"):Ve(a,"idle","inactif")}],leftPins:[ge("x-in","X FROM CPU",ue(i.plotter.x),"target",i.plotter.drawActive),ge("y-in","Y FROM CPU",ue(i.plotter.y),"target",i.plotter.drawActive),ge("rgb-in","RGB LATCH",m,"target",i.plotter.colorActive||i.plotter.drawActive),ge("draw-in","DRAW STB",i.plotter.drawActive?"1":"0","target",i.plotter.drawActive),ge("clear-in","CLEAR STB",i.plotter.clearActive?"1":"0","target",i.plotter.clearActive)],rightPins:[ge("x-out","X -> FB",ue(i.plotter.x),"source",i.plotter.drawActive),ge("y-out","Y -> FB",ue(i.plotter.y),"source",i.plotter.drawActive),ge("rgb-out","RGB -> FB",m,"source",i.plotter.colorActive||i.plotter.drawActive),ge("draw-out","DRAW -> FB",i.plotter.drawActive?"1":"0","source",i.plotter.drawActive),ge("clear-out","CLEAR -> FB",i.plotter.clearActive?"1":"0","source",i.plotter.clearActive)]}),Vn("plotter-io",1280,620,{title:Ve(a,"Plotter Framebuffer","Framebuffer plotter"),subtitle:Ve(a,"256x256 RGB pixels driven by x/y/color latches","pixels RGB 256x256 pilotés par les verrous x/y/couleur"),tone:"io",icon:"plotter",metrics:[{label:"PIXELS",value:`${i.plotter.pixels}`},{label:"X/Y",value:`${ue(i.plotter.x)}/${ue(i.plotter.y)}`},{label:"RGB",value:i.plotter.colorText},{label:"STATE",value:i.plotter.clearActive?Ve(a,"clear","effacer"):i.plotter.drawActive?Ve(a,"drawing","dessin"):Ve(a,"idle","inactif")}],plotterPreview:g5(t.plotterPixels),leftPins:[ge("x","X",ue(i.plotter.x),"target",i.plotter.drawActive),ge("y","Y",ue(i.plotter.y),"target",i.plotter.drawActive),ge("rgb","RGB",m,"target",i.plotter.colorActive||i.plotter.drawActive),ge("draw","DRAW",i.plotter.drawActive?"1":"0","target",i.plotter.drawActive),ge("clear","CLEAR",i.plotter.clearActive?"1":"0","target",i.plotter.clearActive)],rightPins:[]}),Vn("drive-stage",850,980,{title:Ve(a,"Drive Controller","Contrôleur disque"),subtitle:Ve(a,"page latch + address mux + B data out","verrou de page + mux d’adresse + sortie données B"),tone:"bus",icon:"bus",metrics:[{label:"PAGE",value:ue(i.drive.page)},{label:"ADDR",value:ue(i.drive.address,4)},{label:"DATA OUT",value:ue(i.drive.dataOut)},{label:"MODE",value:i.drive.clearActive?Ve(a,"clear","effacer"):i.drive.writeActive?Ve(a,"write","écrire"):i.drive.readActive?Ve(a,"read","lire"):Ve(a,"idle","inactif")}],leftPins:[ge("page-in","PAGE FROM CPU",ue(i.drive.page),"target",o),ge("addr-in","ADDR FROM CPU",ue(i.drive.address,4),"target",o),ge("data-in","DATA FROM B",ue(i.drive.dataOut),"target",i.drive.writeActive),ge("rd-in","READ STB",i.drive.readActive?"1":"0","target",i.drive.readActive),ge("wr-in","WRITE STB",i.drive.writeActive?"1":"0","target",i.drive.writeActive),ge("clr-in","CLEAR STB",i.drive.clearActive?"1":"0","target",i.drive.clearActive)],rightPins:[ge("page-out","PAGE -> DRIVE",ue(i.drive.page),"source",o),ge("addr-out","ADDR -> DRIVE",ue(i.drive.address,4),"source",o),ge("data-out","DATA -> DRIVE",ue(i.drive.dataOut),"source",i.drive.writeActive),ge("rd-out","READ -> DRIVE",i.drive.readActive?"1":"0","source",i.drive.readActive),ge("wr-out","WRITE -> DRIVE",i.drive.writeActive?"1":"0","source",i.drive.writeActive),ge("clr-out","CLEAR -> DRIVE",i.drive.clearActive?"1":"0","source",i.drive.clearActive),ge("data-back","DATA -> CPU",ue(i.drive.lastRead),"source",i.drive.readActive)]}),Vn("drive",1280,980,{title:Ve(a,"External Drive","Disque externe"),subtitle:Ve(a,"paged storage device addressed by page:offset","stockage paginé adressé par page:offset"),tone:"io",icon:"drive",metrics:[{label:"PAGE",value:ue(i.drive.page)},{label:"ADDR",value:ue(i.drive.address,4)},{label:"READ BYTE",value:ue(i.drive.lastRead)},{label:"WRITE BYTE",value:ue(i.drive.lastWrite)}],leftPins:[ge("page","PAGE",ue(i.drive.page),"target",o),ge("addr","ADDR",ue(i.drive.address,4),"target",o),ge("data","DATA IN",ue(i.drive.dataOut),"target",i.drive.writeActive),ge("rd","READ",i.drive.readActive?"1":"0","target",i.drive.readActive),ge("wr","WRITE",i.drive.writeActive?"1":"0","target",i.drive.writeActive),ge("clr","CLEAR",i.drive.clearActive?"1":"0","target",i.drive.clearActive)],rightPins:[ge("read-data","READ BYTE",ue(i.drive.lastRead),"source",i.drive.readActive)]}),Vn("network-stage",850,1320,{title:Ve(a,"Network Request Builder","Construction de requête réseau"),subtitle:Ve(a,"operand points into RAM; strings become URL/body; response returns byte stream","l’opérande pointe en RAM ; les chaînes deviennent URL/corps ; la réponse revient en flux d’octets"),tone:"bus",icon:"bus",metrics:[{label:"REQ PTR",value:`${i.network.requestAddressLabel} ${ue(i.network.requestAddress,4)}`},{label:"URL",value:i.network.urlPreview},{label:"BODY",value:i.network.bodyPreview},{label:"RESP",value:i.network.responsePreview}],leftPins:[ge("addr-in","PTR FROM CPU",`${i.network.requestAddressLabel} ${ue(i.network.requestAddress,4)}`,"target",c),ge("ram-in","RAM CSTRING",ue(i.memory.operandData),"target",i.network.requestActive),ge("get-in","GET STB",i.network.getActive?"1":"0","target",i.network.getActive),ge("post-in","POST STB",i.network.postActive?"1":"0","target",i.network.postActive),ge("read-in","READ STB",i.network.readActive?"1":"0","target",i.network.readActive),ge("resp-in","RESP BYTE",ue(i.network.lastByte),"target",d)],rightPins:[ge("url-out","URL -> NET",i.network.urlPreview,"source",i.network.requestActive||i.network.pending),ge("body-out","BODY -> NET",i.network.bodyPreview,"source",i.network.postActive||!!(i.network.bodyPreview&&i.network.pending)),ge("get-out","GET -> NET",i.network.getActive?"1":"0","source",i.network.getActive),ge("post-out","POST -> NET",i.network.postActive?"1":"0","source",i.network.postActive),ge("read-out","READ -> NET",i.network.readActive?"1":"0","source",i.network.readActive),ge("data-out","DATA -> CPU",i.network.responsePreview,"source",d)]}),Vn("network",1280,1320,{title:Ve(a,"Network Device","Périphérique réseau"),subtitle:i.network.status||Ve(a,"idle","inactif"),tone:"io",icon:"network",metrics:[{label:"STATUS",value:i.network.status||Ve(a,"idle","inactif")},{label:"PENDING",value:i.network.pending?Ve(a,"yes","oui"):Ve(a,"no","non")},{label:"URL",value:i.network.urlPreview},{label:"BUFFER",value:`${i.network.responseBytes} ${Ve(a,"bytes","octets")}`}],leftPins:[ge("url","URL",i.network.urlPreview,"target",i.network.requestActive||i.network.pending),ge("body","BODY",i.network.bodyPreview,"target",i.network.postActive||!!(i.network.bodyPreview&&i.network.pending)),ge("get","GET",i.network.getActive?"1":"0","target",i.network.getActive),ge("post","POST",i.network.postActive?"1":"0","target",i.network.postActive),ge("read","READ",i.network.readActive?"1":"0","target",i.network.readActive)],rightPins:[ge("data","RESPONSE BYTE",ue(i.network.lastByte),"source",d)]})],b=[Ue("cpu-fetch-bus","cpu","fetch-pc","memory-bus","fetch-in",`PC ${ue(i.memory.fetchAddress,4)}`,"#f59e0b",!0,i.pulseOn),Ue("cpu-addr-bus","cpu","mem-addr","memory-bus","addr-in",`ADDR ${ue(i.memory.operandAddress,4)}`,"#f59e0b",l,i.pulseOn),Ue("cpu-data-bus","cpu","mem-data","memory-bus","data-in",`WRITE ${ue(i.memory.writeValue)}`,"#f97316",i.memory.writeActive,i.pulseOn),Ue("cpu-readreq-bus","cpu","mem-read-req","memory-bus","read-in","READ","#38bdf8",i.memory.readActive,i.pulseOn),Ue("cpu-we-bus","cpu","mem-we","memory-bus","we-in","WRITE","#fb7185",i.memory.writeActive,i.pulseOn),Ue("bus-mem-fetch-addr","memory-bus","fetch-addr-out","memory","fetch-addr",ue(i.memory.fetchAddress,4),"#fbbf24",!0,i.pulseOn),Ue("bus-mem-addr","memory-bus","addr-out","memory","addr",ue(i.memory.operandAddress,4),"#10b981",l,i.pulseOn),Ue("bus-mem-read","memory-bus","read-out","memory","read","RD","#22d3ee",i.memory.readActive||i.network.requestActive,i.pulseOn),Ue("bus-mem-data","memory-bus","data-out","memory","data",ue(i.memory.writeValue),"#22c55e",i.memory.writeActive,i.pulseOn),Ue("bus-mem-we","memory-bus","we-out","memory","write","WE","#f43f5e",i.memory.writeActive,i.pulseOn),Ue("mem-bus-fetch","memory","fetch","memory-bus","fetch-data-in",ue(i.memory.fetchByte),"#fde047",!0,i.pulseOn),Ue("bus-cpu-fetch","memory-bus","fetch-out","cpu","mem-fetch",ue(i.memory.fetchByte),"#facc15",!0,i.pulseOn),Ue("mem-bus-read","memory","operand","memory-bus","read-data-in",ue(i.memory.operandData),"#22d3ee",i.memory.readActive||i.network.requestActive,i.pulseOn),Ue("bus-cpu-read","memory-bus","operand-out","cpu","mem-read",ue(i.memory.operandData),"#22d3ee",i.memory.readActive,i.pulseOn),Ue("cpu-alu-a","cpu","alu-a","alu","a-in",`A ${ue(i.alu.a)}`,"#a78bfa",!0,i.pulseOn),Ue("cpu-alu-b","cpu","alu-b","alu","b-in",`B ${ue(i.alu.b)}`,"#d946ef",!0,i.pulseOn),Ue("cpu-alu-op","cpu","alu-op","alu","op-in",i.alu.opName,"#f472b6",!0,i.pulseOn),Ue("alu-cpu-result","alu","result","cpu","alu-out",ue(i.alu.result),"#e879f9",!0,i.pulseOn),Ue("alu-cpu-flags","alu","flags","cpu","alu-flags",`${i.alu.zero?1:0}/${i.alu.carry?1:0}/${i.alu.negative?1:0}`,"#c084fc",!0,i.pulseOn),Ue("cpu-console-out","cpu","con-out","console","write-data",i.console.latestChar,"#38bdf8",i.console.writeActive,i.pulseOn),Ue("cpu-console-read","cpu","con-rd","console","read-req","READ","#60a5fa",i.console.readActive,i.pulseOn),Ue("console-cpu-in","console","input-byte","cpu","con-in",i.console.inputPreview,"#93c5fd",i.console.readActive,i.pulseOn),Ue("cpu-key-select","cpu","key-sel","keyboard","select",x,"#22c55e",i.keyboard.readActive,i.pulseOn),Ue("cpu-key-rd","cpu","key-rd","keyboard","read","SCAN","#4ade80",i.keyboard.readActive,i.pulseOn),Ue("keyboard-cpu-state","keyboard","state","cpu","key-in",i.keyboard.activeKeys.join(",")||"idle","#86efac",i.keyboard.readActive,i.pulseOn),Ue("cpu-plot-x","cpu","plot-x","plotter-stage","x-in",`X ${ue(i.plotter.x)}`,"#f59e0b",i.plotter.drawActive,i.pulseOn),Ue("cpu-plot-y","cpu","plot-y","plotter-stage","y-in",`Y ${ue(i.plotter.y)}`,"#fb923c",i.plotter.drawActive,i.pulseOn),Ue("cpu-plot-rgb","cpu","plot-color","plotter-stage","rgb-in",m,"#fb7185",i.plotter.colorActive||i.plotter.drawActive,i.pulseOn),Ue("cpu-plot-draw","cpu","plot-draw","plotter-stage","draw-in","DRAW","#f97316",i.plotter.drawActive,i.pulseOn),Ue("cpu-plot-clear","cpu","plot-clear","plotter-stage","clear-in","CLEAR","#e11d48",i.plotter.clearActive,i.pulseOn),Ue("plotter-stage-x","plotter-stage","x-out","plotter-io","x",ue(i.plotter.x),"#f59e0b",i.plotter.drawActive,i.pulseOn),Ue("plotter-stage-y","plotter-stage","y-out","plotter-io","y",ue(i.plotter.y),"#fb923c",i.plotter.drawActive,i.pulseOn),Ue("plotter-stage-rgb","plotter-stage","rgb-out","plotter-io","rgb",m,"#fb7185",i.plotter.colorActive||i.plotter.drawActive,i.pulseOn),Ue("plotter-stage-draw","plotter-stage","draw-out","plotter-io","draw","DRAW","#f97316",i.plotter.drawActive,i.pulseOn),Ue("plotter-stage-clear","plotter-stage","clear-out","plotter-io","clear","CLEAR","#e11d48",i.plotter.clearActive,i.pulseOn),Ue("cpu-drive-page","cpu","drv-page","drive-stage","page-in",ue(i.drive.page),"#fbbf24",o,i.pulseOn),Ue("cpu-drive-addr","cpu","drv-addr","drive-stage","addr-in",ue(i.drive.address,4),"#f59e0b",o,i.pulseOn),Ue("cpu-drive-data","cpu","drv-data","drive-stage","data-in",ue(i.drive.dataOut),"#f97316",i.drive.writeActive,i.pulseOn),Ue("cpu-drive-rd","cpu","drv-rd","drive-stage","rd-in","READ","#fdba74",i.drive.readActive,i.pulseOn),Ue("cpu-drive-wr","cpu","drv-wr","drive-stage","wr-in","WRITE","#fb923c",i.drive.writeActive,i.pulseOn),Ue("cpu-drive-clr","cpu","drv-clr","drive-stage","clr-in","CLEAR","#ef4444",i.drive.clearActive,i.pulseOn),Ue("drive-stage-page","drive-stage","page-out","drive","page",ue(i.drive.page),"#fbbf24",o,i.pulseOn),Ue("drive-stage-addr","drive-stage","addr-out","drive","addr",ue(i.drive.address,4),"#f59e0b",o,i.pulseOn),Ue("drive-stage-data","drive-stage","data-out","drive","data",ue(i.drive.dataOut),"#f97316",i.drive.writeActive,i.pulseOn),Ue("drive-stage-rd","drive-stage","rd-out","drive","rd","READ","#fdba74",i.drive.readActive,i.pulseOn),Ue("drive-stage-wr","drive-stage","wr-out","drive","wr","WRITE","#fb923c",i.drive.writeActive,i.pulseOn),Ue("drive-stage-clr","drive-stage","clr-out","drive","clr","CLEAR","#ef4444",i.drive.clearActive,i.pulseOn),Ue("drive-stage-back","drive-stage","data-back","cpu","drv-in",ue(i.drive.lastRead),"#fde68a",i.drive.readActive,i.pulseOn),Ue("drive-back-stage","drive","read-data","drive-stage","data-in",ue(i.drive.lastRead),"#fef3c7",i.drive.readActive,i.pulseOn),Ue("cpu-net-addr","cpu","net-addr","network-stage","addr-in",`${i.network.requestAddressLabel} ${ue(i.network.requestAddress,4)}`,"#06b6d4",c,i.pulseOn),Ue("bus-net-cstring","memory-bus","cstring-out","network-stage","ram-in",i.network.urlPreview,"#22d3ee",i.network.requestActive,i.pulseOn),Ue("cpu-net-get","cpu","net-get","network-stage","get-in","GET","#0891b2",i.network.getActive,i.pulseOn),Ue("cpu-net-post","cpu","net-post","network-stage","post-in","POST","#0ea5e9",i.network.postActive,i.pulseOn),Ue("cpu-net-rd","cpu","net-rd","network-stage","read-in","READ","#38bdf8",i.network.readActive,i.pulseOn),Ue("network-stage-url","network-stage","url-out","network","url",i.network.urlPreview,"#06b6d4",i.network.requestActive||i.network.pending,i.pulseOn),Ue("network-stage-body","network-stage","body-out","network","body",i.network.bodyPreview,"#0ea5e9",i.network.postActive||!!(i.network.bodyPreview&&i.network.pending),i.pulseOn),Ue("network-stage-get","network-stage","get-out","network","get","GET","#0891b2",i.network.getActive,i.pulseOn),Ue("network-stage-post","network-stage","post-out","network","post","POST","#0ea5e9",i.network.postActive,i.pulseOn),Ue("network-stage-read","network-stage","read-out","network","read","READ","#38bdf8",i.network.readActive,i.pulseOn),Ue("network-back-stage","network","data","network-stage","resp-in",ue(i.network.lastByte),"#67e8f9",d,i.pulseOn),Ue("network-stage-cpu","network-stage","data-out","cpu","net-in",i.network.responsePreview,"#a5f3fc",d,i.pulseOn)];return{model:i,nodes:h,edges:b}}function Di(t){return t.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;")}function b5(t){switch(t){case"cpu":return{fill:"#0f2740",border:"#22d3ee",accent:"#67e8f9"};case"memory":return{fill:"#112c24",border:"#34d399",accent:"#86efac"};case"bus":return{fill:"#36260d",border:"#f59e0b",accent:"#fcd34d"};case"alu":return{fill:"#32103e",border:"#d946ef",accent:"#f0abfc"};default:return{fill:"#11263d",border:"#38bdf8",accent:"#93c5fd"}}}function y5(t,a){const i=t.data.leftPins??[],l=t.data.rightPins??[],o=i.findIndex(d=>d.id===a);if(o>=0)return{side:"left",index:o};const c=l.findIndex(d=>d.id===a);if(c>=0)return{side:"right",index:c};throw new Error(`Missing handle ${a} on node ${t.id}`)}function Jx(t,a){const i=y5(t,a);return{x:t.position.x+(i.side==="right"?il:0),y:t.position.y+Rf(t.data)+i.index*Ef+Cb}}function v5(t,a){const i=a.x-t.x,l=Math.max(90,Math.abs(i)*.35),o=i>=0?1:-1,c=t.x+l*o,d=a.x-l*o;return`M ${t.x} ${t.y} C ${c} ${t.y} ${d} ${a.y} ${a.x} ${a.y}`}function A5(t,a){const i=t.data.consolePreview;if(!i)return"";const l=t.position.x+16,o=t.position.y+Mf,c=il-32;return`
    <g transform="translate(${l}, ${o})">
      <rect width="${c}" height="112" rx="14" fill="#020617" stroke="#1e293b" />
      <rect x="0" y="0" width="${c}" height="22" rx="14" fill="#0f172a" />
      <circle cx="16" cy="11" r="3" fill="#fb7185" />
      <circle cx="28" cy="11" r="3" fill="#f59e0b" />
      <circle cx="40" cy="11" r="3" fill="#22c55e" />
      <text x="${c-10}" y="15" fill="#64748b" font-size="9" font-family="system-ui" text-anchor="end">${a==="fr"?"aperçu console":"console preview"}</text>
      ${i.lines.map((m,x)=>`
        <text x="12" y="${40+x*12}" fill="#dbeafe" font-size="10" font-family="monospace">${Di(m||" ")}</text>
      `).join("")}
    </g>
  `}function L5(t,a){const i=t.data.plotterPreview;if(!i)return"";const l=196,o=t.position.x+(il-l)/2,c=t.position.y+Mf,d=l/i.width,m=l/i.height;return`
    <g transform="translate(${o}, ${c})">
      <rect width="${l}" height="${l}" rx="18" fill="#020617" stroke="#1e293b" />
      <rect x="8" y="8" width="${l-16}" height="${l-16}" rx="10" fill="#02030a" stroke="#0f172a" />
      <g transform="translate(8, 8)">
        ${i.pixels.map(x=>`
          <rect x="${x.x*d}" y="${x.y*m}" width="${d+.2}" height="${m+.2}" fill="${x.color}" />
        `).join("")}
      </g>
      ${i.pixels.length===0?`<text x="${l/2}" y="${l/2+4}" fill="#64748b" font-size="11" font-family="monospace" text-anchor="middle">${a==="fr"?"AUCUN PIXEL":"NO PIXELS"}</text>`:""}
    </g>
  `}function w5(t){const a=t.reduce((i,l)=>{const o=Sb(l.data);return{maxX:Math.max(i.maxX,l.position.x+il),maxY:Math.max(i.maxY,l.position.y+o)}},{maxX:0,maxY:0});return{width:a.maxX+120,height:a.maxY+120}}function D5(t,a,i="en"){const{width:l,height:o}=w5(t),c=a.map(m=>{var E,_,P,S,X;const x=t.find(F=>F.id===m.source),h=t.find(F=>F.id===m.target);if(!x||!h||!m.sourceHandle||!m.targetHandle)throw new Error(`Edge ${m.id} is not fully connected`);const b=Jx(x,m.sourceHandle),g=Jx(h,m.targetHandle),v=v5(b,g),L=(b.x+g.x)/2,w=(b.y+g.y)/2,N=((E=m.data)==null?void 0:E.color)??"#64748b",T=(_=m.data)!=null&&_.active?m.data.pulseOn?1:.76:.34,C=(P=m.data)!=null&&P.active?4:2,B=Di(((S=m.data)==null?void 0:S.label)??m.id),D=Math.max(72,B.length*6.4+22);return`
      <path d="${v}" fill="none" stroke="${N}" stroke-width="${C+8}" stroke-linecap="round" opacity="${(X=m.data)!=null&&X.active?.12:0}" />
      <path d="${v}" fill="none" stroke="${N}" stroke-width="${C}" stroke-linecap="round" opacity="${T}" />
      <g transform="translate(${L}, ${w})">
        <rect x="${-D/2}" y="-12" width="${D}" height="24" rx="12" fill="#020617" stroke="#334155" />
        <text x="0" y="4" fill="#e2e8f0" font-family="monospace" font-size="10" text-anchor="middle">${B}</text>
      </g>
    `}).join(""),d=t.map(m=>{const{fill:x,border:h,accent:b}=b5(m.data.tone),g=Sb(m.data),v=m.data.leftPins??[],L=m.data.rightPins??[],w=m.data.metrics.map((C,B)=>`
      <g transform="translate(${m.position.x+16+B%2*146}, ${m.position.y+66+Math.floor(B/2)*40})">
        <rect width="130" height="30" rx="10" fill="#020617" stroke="#1e293b" />
        <text x="10" y="12" fill="#64748b" font-size="9" font-family="system-ui">${Di(C.label)}</text>
        <text x="10" y="24" fill="#f8fafc" font-size="11" font-family="monospace">${Di(C.value)}</text>
      </g>
    `).join(""),N=m.data.plotterPreview?L5(m,i):A5(m,i),T=(C,B)=>C.map((D,E)=>{const _=B==="left"?m.position.x+12:m.position.x+166,P=m.position.y+Rf(m.data)+E*Ef,S=D.active?B==="left"?"#083344":"#052e16":"#020617",X=D.active?B==="left"?"#22d3ee":"#4ade80":"#1e293b",F=B==="left"?m.position.x:m.position.x+il,$=B==="left"?"#67e8f9":"#86efac";return`
          <g transform="translate(${_}, ${P})">
            <rect width="142" height="24" rx="8" fill="${S}" stroke="${X}" />
            <text x="8" y="10" fill="#e2e8f0" font-size="9" font-family="system-ui">${Di(D.label)}</text>
            <text x="8" y="20" fill="#cbd5e1" font-size="8" font-family="monospace">${Di(D.value)}</text>
          </g>
          <circle cx="${F}" cy="${P+Cb}" r="5" fill="${$}" stroke="#020617" stroke-width="2" />
        `}).join("");return`
      <g>
        <rect x="${m.position.x}" y="${m.position.y}" width="${il}" height="${g}" rx="24" fill="${x}" stroke="${h}" stroke-width="2" />
        <text x="${m.position.x+16}" y="${m.position.y+26}" fill="${b}" font-size="15" font-family="system-ui" font-weight="700">${Di(m.data.title)}</text>
        <text x="${m.position.x+16}" y="${m.position.y+42}" fill="#94a3b8" font-size="11" font-family="system-ui">${Di(m.data.subtitle)}</text>
        ${w}
        ${N}
        ${T(v,"left")}
        ${T(L,"right")}
      </g>
    `}).join("");return`<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${l}" height="${o}" viewBox="0 0 ${l} ${o}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0f172a" />
      <stop offset="100%" stop-color="#020617" />
    </linearGradient>
  </defs>
  <rect width="${l}" height="${o}" fill="url(#bg)" />
  <g opacity="0.18">
    ${Array.from({length:Math.floor(l/40)},(m,x)=>`<line x1="${x*40}" y1="0" x2="${x*40}" y2="${o}" stroke="#1e293b" stroke-width="1" />`).join("")}
    ${Array.from({length:Math.floor(o/40)},(m,x)=>`<line x1="0" y1="${x*40}" x2="${l}" y2="${x*40}" stroke="#1e293b" stroke-width="1" />`).join("")}
  </g>
  ${c}
  ${d}
</svg>`}const C5=z.memo(function({data:a}){const{locale:i,messages:l}=Ot(),o=l.software.architectureFlow,{model:c,nodes:d,edges:m}=z.useMemo(()=>_5(a,i),[a,i]),x=z.useMemo(()=>D5(d,m,i),[m,i,d]);return u.jsxs("section",{className:"overflow-hidden rounded-[28px] border border-slate-800 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.12),_transparent_22%),linear-gradient(180deg,_rgba(15,23,42,0.98),_rgba(2,6,23,1))] shadow-[0_28px_120px_rgba(2,6,23,0.55)]",children:[u.jsxs("div",{className:"flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 bg-slate-950/70 px-5 py-4",children:[u.jsxs("div",{children:[u.jsxs("div",{className:"flex items-center gap-2 text-slate-100",children:[u.jsx(Zc,{size:16,className:"text-cyan-300"}),u.jsx("h3",{className:"text-sm font-semibold",children:o.title})]}),u.jsx("p",{className:"mt-1 text-xs text-slate-400",children:o.subtitle})]}),u.jsxs("div",{className:"flex flex-wrap items-center gap-2",children:[u.jsxs("span",{className:"rounded-full border border-slate-700 bg-slate-900 px-2.5 py-1 text-[11px] font-medium text-slate-300",children:[o.instruction," ",c.instruction.mnemonic]}),u.jsxs("span",{className:`rounded-full border px-2.5 py-1 text-[11px] font-semibold ${c.pulseOn?"border-cyan-500/40 bg-cyan-500/10 text-cyan-200":"border-slate-700 bg-slate-900 text-slate-400"}`,children:[o.dataPulse," ",c.pulseOn?o.on:o.off]})]})]}),u.jsx("div",{className:"h-[900px] min-h-[720px] w-full overflow-auto bg-[linear-gradient(180deg,_rgba(2,6,23,0.55),_rgba(2,6,23,0.9))] xl:h-[1080px]",children:u.jsx("div",{className:"min-w-max",dangerouslySetInnerHTML:{__html:x}})})]})});function S5({data:t}){const{messages:a}=Ot(),i=a.software.filesystemCard,l=hb(t.driveData),o=t5(t.driveData),c=r5(o.entries),d=Rc(t.driveLastRead),m=Rc(t.driveLastWrite);return u.jsxs("section",{className:"rounded-2xl border border-slate-800 bg-slate-950/90 p-4",children:[u.jsxs("div",{className:"flex flex-wrap items-center justify-between gap-3",children:[u.jsxs("div",{className:"flex items-center gap-2 text-slate-200",children:[u.jsx(Gr,{size:16,className:"text-cyan-300"}),u.jsx("h3",{className:"text-sm font-semibold",children:i.title})]}),u.jsx("span",{className:`rounded-full border px-2.5 py-1 text-[11px] font-medium ${l?"border-cyan-500/40 bg-cyan-500/10 text-cyan-300":"border-slate-700 bg-slate-900 text-slate-400"}`,children:l?i.ready:i.unformatted})]}),u.jsxs("div",{className:"mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4",children:[u.jsxs("div",{className:"rounded-xl border border-slate-800 bg-slate-900/80 p-3",children:[u.jsx("div",{className:"text-[10px] uppercase tracking-[0.2em] text-slate-500",children:i.entries}),u.jsx("div",{className:"mt-2 text-2xl font-semibold text-slate-100",children:c.length})]}),u.jsxs("div",{className:"rounded-xl border border-slate-800 bg-slate-900/80 p-3",children:[u.jsx("div",{className:"text-[10px] uppercase tracking-[0.2em] text-slate-500",children:i.used}),u.jsxs("div",{className:"mt-2 text-lg font-semibold text-cyan-300",children:[o.usedPages,"p / ",Ec(o.usedBytes)]})]}),u.jsxs("div",{className:"rounded-xl border border-slate-800 bg-slate-900/80 p-3",children:[u.jsx("div",{className:"text-[10px] uppercase tracking-[0.2em] text-slate-500",children:i.free}),u.jsxs("div",{className:"mt-2 text-lg font-semibold text-emerald-300",children:[o.freePages,"p / ",Ec(o.freeBytes)]})]}),u.jsxs("div",{className:"rounded-xl border border-slate-800 bg-slate-900/80 p-3",children:[u.jsx("div",{className:"text-[10px] uppercase tracking-[0.2em] text-slate-500",children:i.drivePage}),u.jsx("div",{className:"mt-2 text-lg font-semibold text-slate-100",children:t.drivePage})]})]}),u.jsxs("div",{className:"mt-4 overflow-hidden rounded-xl border border-slate-800 bg-slate-900/70",children:[u.jsxs("div",{className:"grid grid-cols-[minmax(0,1.2fr)_auto_auto_auto_auto] gap-3 border-b border-slate-800 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500",children:[u.jsx("span",{children:i.name}),u.jsx("span",{children:i.type}),u.jsx("span",{children:i.size}),u.jsx("span",{children:i.pages}),u.jsx("span",{children:i.start})]}),u.jsx("div",{className:"max-h-72 overflow-y-auto",children:c.length===0?u.jsx("div",{className:"px-3 py-4 text-sm text-slate-500",children:i.noFiles}):c.map(x=>u.jsxs("div",{className:"grid grid-cols-[minmax(0,1.2fr)_auto_auto_auto_auto] gap-3 border-b border-slate-800/70 px-3 py-2 text-sm last:border-b-0",children:[u.jsxs("div",{className:"min-w-0",children:[u.jsx("div",{className:"truncate font-mono text-slate-100",children:x.name}),u.jsx("div",{className:"truncate text-xs text-slate-500",children:kc(x.bytes,28)||i.binaryOrEmpty})]}),u.jsx("span",{className:"rounded-full border border-slate-700 bg-slate-950 px-2 py-0.5 text-xs text-slate-300",children:n5(x.type)}),u.jsxs("span",{className:"font-mono text-xs text-slate-300",children:[x.sizeBytes," B"]}),u.jsx("span",{className:"font-mono text-xs text-slate-300",children:x.pageCount}),u.jsx("span",{className:"font-mono text-xs text-slate-300",children:x.startPage})]},`${x.name}-${x.startPage}`))})]}),u.jsxs("details",{className:"mt-4 rounded-xl border border-slate-800 bg-slate-900/70 p-3",children:[u.jsxs("summary",{className:"flex cursor-pointer list-none items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400",children:[u.jsx(IN,{size:13,className:"text-slate-500"}),i.info]}),u.jsxs("div",{className:"mt-3 grid gap-2 text-xs text-slate-300",children:[u.jsxs("div",{className:"rounded-lg border border-slate-800 bg-slate-950/70 px-3 py-2",children:[i.directoryPagesReserved,": ",Xc," / ",Yc," · ",i.pageSizeBytes," ",mn," bytes"]}),u.jsxs("div",{className:"grid gap-2 md:grid-cols-3",children:[u.jsxs("div",{className:"rounded-lg border border-slate-800 bg-slate-950/70 px-3 py-2",children:[i.lastAddr," ",ue(t.driveLastAddr,4)]}),u.jsxs("div",{className:"rounded-lg border border-slate-800 bg-slate-950/70 px-3 py-2",children:[i.lastRead," ",ue(t.driveLastRead)," (",d,")"]}),u.jsxs("div",{className:"rounded-lg border border-slate-800 bg-slate-950/70 px-3 py-2",children:[i.lastWrite," ",ue(t.driveLastWrite)," (",m,")"]})]}),c.length>0&&u.jsxs("div",{className:"rounded-lg border border-slate-800 bg-slate-950/70 px-3 py-2",children:[u.jsxs("div",{className:"mb-2 flex items-center gap-2 text-slate-400",children:[u.jsx(nl,{size:13,className:"text-cyan-300"}),i.firstEntryPreview]}),u.jsx("div",{className:"font-mono text-slate-200",children:c[0].name}),u.jsx("div",{className:"mt-1 break-all text-slate-500",children:kc(c[0].bytes,80)})]})]})]})]})}const N5=z.memo(S5,(t,a)=>t.data.driveData===a.data.driveData&&t.data.drivePage===a.data.drivePage&&t.data.driveLastAddr===a.data.driveLastAddr&&t.data.driveLastRead===a.data.driveLastRead&&t.data.driveLastWrite===a.data.driveLastWrite),T5=[[{label:"Esc",keyValue:"Escape",accent:"text-rose-300"},{label:"1",keyValue:"1"},{label:"2",keyValue:"2"},{label:"3",keyValue:"3"},{label:"4",keyValue:"4"},{label:"5",keyValue:"5"},{label:"6",keyValue:"6"},{label:"7",keyValue:"7"},{label:"8",keyValue:"8"},{label:"9",keyValue:"9"},{label:"0",keyValue:"0"},{label:"-",keyValue:"-"},{label:"=",keyValue:"="},{label:"Backspace",keyValue:"Backspace",width:"col-span-2"}],[{label:"Tab",keyValue:"Tab",width:"col-span-2"},{label:"Q",keyValue:"q"},{label:"W",keyValue:"w"},{label:"E",keyValue:"e"},{label:"R",keyValue:"r"},{label:"T",keyValue:"t"},{label:"Y",keyValue:"y"},{label:"U",keyValue:"u"},{label:"I",keyValue:"i"},{label:"O",keyValue:"o"},{label:"P",keyValue:"p"},{label:"[",keyValue:"["},{label:"]",keyValue:"]"},{label:"\\",keyValue:"\\"}],[{label:"A",keyValue:"a",width:"col-span-2"},{label:"S",keyValue:"s"},{label:"D",keyValue:"d"},{label:"F",keyValue:"f"},{label:"G",keyValue:"g"},{label:"H",keyValue:"h"},{label:"J",keyValue:"j"},{label:"K",keyValue:"k"},{label:"L",keyValue:"l"},{label:";",keyValue:";"},{label:"'",keyValue:"'"},{label:"Enter",keyValue:"Enter",width:"col-span-3",accent:"text-emerald-300"}],[{label:"Z",keyValue:"z",width:"col-span-2"},{label:"X",keyValue:"x"},{label:"C",keyValue:"c"},{label:"V",keyValue:"v"},{label:"B",keyValue:"b"},{label:"N",keyValue:"n"},{label:"M",keyValue:"m"},{label:",",keyValue:","},{label:".",keyValue:"."},{label:"/",keyValue:"/"},{label:"Space",keyValue:" ",width:"col-span-4",accent:"text-cyan-300"}]],M5=[{id:"left",value:0},{id:"right",value:1},{id:"up",value:2},{id:"down",value:3},{id:"enter",value:4}];function E5(t,a,i){a(t),window.setTimeout(()=>i(t),0)}function R5({definition:t,onKeyDown:a,onKeyUp:i}){return u.jsx("button",{type:"button",className:`rounded-xl border border-slate-700 bg-slate-900/90 px-2 py-2 text-center text-xs font-semibold text-slate-200 transition hover:border-cyan-500/40 hover:bg-slate-800 active:translate-y-[1px] ${t.width??""} ${t.accent??""}`,onPointerDown:l=>{l.preventDefault(),a(t.keyValue)},onPointerUp:l=>{l.preventDefault(),i(t.keyValue)},onPointerCancel:()=>i(t.keyValue),onPointerLeave:()=>i(t.keyValue),onDoubleClick:()=>E5(t.keyValue,a,i),children:t.label})}function k5({keyState:t,inputBuffer:a,isRunning:i,onKeyDown:l,onKeyUp:o}){const{messages:c}=Ot(),d=c.software.keyboardCard,[m,x]=z.useState(!1),h=z.useMemo(()=>kc(a.slice(-48),48),[a]);return u.jsxs("section",{className:"rounded-2xl border border-slate-800 bg-slate-950/90 p-4",children:[u.jsxs("div",{className:"flex flex-wrap items-center justify-between gap-3",children:[u.jsxs("div",{className:"flex items-center gap-2 text-slate-200",children:[u.jsx(vf,{size:16,className:"text-amber-300"}),u.jsx("h3",{className:"text-sm font-semibold",children:d.title})]}),u.jsx("button",{type:"button",onClick:()=>x(b=>!b),className:"rounded-full border border-slate-700 bg-slate-900 px-2.5 py-1 text-[11px] font-medium text-slate-300 transition hover:border-cyan-500/40 hover:text-cyan-200",children:m?d.collapse:d.expand})]}),u.jsxs("div",{className:"mt-4 grid gap-3 xl:grid-cols-[0.8fr_1.2fr]",children:[u.jsxs("div",{className:"grid gap-3",children:[u.jsxs("div",{tabIndex:0,className:"rounded-xl border border-slate-800 bg-slate-900/80 p-3 outline-none transition focus:border-cyan-500/40 focus:bg-slate-900",onKeyDown:b=>{l(b.key),b.preventDefault()},onKeyUp:b=>{o(b.key),b.preventDefault()},children:[u.jsx("div",{className:"text-[10px] uppercase tracking-[0.2em] text-slate-500",children:d.captureSurface}),u.jsx("p",{className:"mt-2 text-sm text-slate-300",children:d.captureHelp}),u.jsx("p",{className:"mt-2 text-xs text-slate-500",children:i?d.captureRunning:d.capturePaused})]}),u.jsxs("div",{className:"rounded-xl border border-slate-800 bg-slate-900/80 p-3",children:[u.jsxs("div",{className:"flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-slate-500",children:[u.jsx(WN,{size:12,className:"text-cyan-300"}),d.liveKeyLines]}),u.jsx("div",{className:"mt-3 flex flex-wrap gap-2",children:M5.map(b=>u.jsxs("span",{className:`rounded-full border px-2.5 py-1 text-xs font-medium ${t[b.value]?"border-emerald-500/40 bg-emerald-500/10 text-emerald-300":"border-slate-700 bg-slate-950 text-slate-500"}`,children:[d.liveKeys[b.id],": ",t[b.value]?"1":"0"]},b.id))})]}),u.jsxs("div",{className:"rounded-xl border border-slate-800 bg-slate-900/80 p-3",children:[u.jsxs("div",{className:"flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-slate-500",children:[u.jsx(eT,{size:12,className:"text-amber-300"}),d.inputQueue]}),u.jsxs("div",{className:"mt-2 text-sm text-slate-300",children:[a.length," ",d.bytes]}),u.jsx("pre",{className:"mt-2 max-h-24 overflow-auto whitespace-pre-wrap break-all rounded-lg bg-slate-950/70 p-3 font-mono text-xs text-slate-400",children:h||d.empty}),a.length>0&&u.jsx("div",{className:"mt-2 flex flex-wrap gap-1",children:a.slice(-8).map((b,g)=>u.jsx("span",{className:"rounded-md border border-slate-700 bg-slate-950 px-2 py-1 font-mono text-[11px] text-slate-300",children:Rc(b)},`${b}-${g}`))})]})]}),m&&u.jsxs("div",{className:"rounded-xl border border-slate-800 bg-slate-900/80 p-3",children:[u.jsx("div",{className:"mb-3 text-[10px] uppercase tracking-[0.2em] text-slate-500",children:d.clickableKeyboard}),u.jsx("div",{className:"grid gap-2",children:T5.map((b,g)=>u.jsx("div",{className:"grid gap-2",style:{gridTemplateColumns:"repeat(15, minmax(0, 1fr))"},children:b.map(v=>u.jsx(R5,{definition:v,onKeyDown:l,onKeyUp:o},`${v.label}-${v.keyValue}`))},g))})]})]})]})}const O5=z.memo(k5,(t,a)=>t.keyState===a.keyState&&t.inputBuffer===a.inputBuffer&&t.isRunning===a.isRunning&&t.onKeyDown===a.onKeyDown&&t.onKeyUp===a.onKeyUp);function T0({label:t,used:a,max:i,tone:l}){const o=i>0?Math.min(100,a/i*100):0;return u.jsxs("div",{className:"rounded-xl border border-slate-800 bg-slate-950/70 p-3",children:[u.jsxs("div",{className:"flex items-center justify-between gap-3",children:[u.jsx("span",{className:"text-xs font-semibold text-slate-300",children:t}),u.jsxs("span",{className:"font-mono text-xs text-slate-400",children:[a,"/",i]})]}),u.jsx("div",{className:"mt-2 h-2 overflow-hidden rounded-full bg-slate-800",children:u.jsx("div",{className:`h-full rounded-full ${l}`,style:{width:`${o}%`}})})]})}function j5({data:t}){var L;const{messages:a}=Ot(),i=a.software.memoryCard;let l=0;for(let w=pa-1;w>=0;w--)if(t.state.memory[w]!==0){l=w+1;break}const o=i5(t.state.memory,4096,6144),c=t.memLayout?t.memLayout.globals+t.memLayout.scratch+t.memLayout.locals:o,d=((L=t.memLayout)==null?void 0:L.stackSize)??2048,m=Math.max(0,Math.min(d,pn-1-t.state.sp)),x=fM(t.state.memory),h=x.file&&x.count>0?a5(t.driveData,x.file.dirPage,x.file.dirOffset)||i.unknown:null,b=Ix(t.state.memory,Math.max(0,t.state.pc-4),Math.min(12,pn-Math.max(0,t.state.pc-4))),g=Math.min(pn-8,Math.max(0,t.state.sp+1)),v=Ix(t.state.memory,g,8);return u.jsxs("section",{className:"rounded-2xl border border-slate-800 bg-slate-950/90 p-4",children:[u.jsxs("div",{className:"flex flex-wrap items-center justify-between gap-3",children:[u.jsxs("div",{className:"flex items-center gap-2 text-slate-200",children:[u.jsx(Zc,{size:16,className:"text-emerald-300"}),u.jsx("h3",{className:"text-sm font-semibold",children:i.title})]}),u.jsxs("span",{className:"rounded-full border border-slate-700 bg-slate-900 px-2.5 py-1 text-[11px] font-medium text-slate-300",children:[i.ram," ",Ec(pn)]})]}),u.jsxs("div",{className:"mt-4 grid gap-3 md:grid-cols-3",children:[u.jsx(T0,{label:i.codeRegion,used:l,max:pa,tone:"bg-blue-500"}),u.jsx(T0,{label:i.dataRegion,used:c,max:2048,tone:"bg-emerald-500"}),u.jsx(T0,{label:i.stackRegion,used:m,max:d,tone:"bg-fuchsia-500"})]}),u.jsxs("div",{className:"mt-4 grid gap-3 xl:grid-cols-[1.05fr_0.95fr]",children:[u.jsxs("div",{className:"rounded-xl border border-slate-800 bg-slate-900/80 p-3",children:[u.jsxs("div",{className:"flex items-center gap-2 text-slate-200",children:[u.jsx(AT,{size:15,className:"text-cyan-300"}),u.jsx("h4",{className:"text-xs font-semibold uppercase tracking-[0.2em] text-slate-400",children:i.aroundPc})]}),u.jsx("div",{className:"mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4 xl:grid-cols-6",children:b.map(({addr:w,value:N})=>u.jsxs("div",{className:`rounded-lg border px-2.5 py-2 ${w===t.state.pc?"border-emerald-500/30 bg-emerald-500/10":"border-slate-800 bg-slate-950/70"}`,children:[u.jsx("div",{className:"font-mono text-[10px] text-slate-500",children:ue(w,4)}),u.jsx("div",{className:"mt-1 font-mono text-sm text-slate-200",children:ue(N)}),u.jsx("div",{className:"mt-1 font-mono text-[10px] text-slate-500",children:N})]},w))})]}),u.jsxs("div",{className:"rounded-xl border border-slate-800 bg-slate-900/80 p-3",children:[u.jsxs("div",{className:"flex items-center gap-2 text-slate-200",children:[u.jsx(K_,{size:15,className:"text-fuchsia-300"}),u.jsx("h4",{className:"text-xs font-semibold uppercase tracking-[0.2em] text-slate-400",children:i.stackTop})]}),u.jsx("div",{className:"mt-3 grid gap-2",children:v.map(({addr:w,value:N})=>u.jsxs("div",{className:`flex items-center justify-between rounded-lg border px-3 py-2 ${w===t.state.sp+1?"border-fuchsia-500/30 bg-fuchsia-500/10":"border-slate-800 bg-slate-950/70"}`,children:[u.jsx("span",{className:"font-mono text-xs text-slate-400",children:ue(w,4)}),u.jsx("span",{className:"font-mono text-sm text-slate-200",children:ue(N)})]},w))})]})]}),u.jsxs("details",{className:"mt-4 rounded-xl border border-slate-800 bg-slate-900/70 p-3",open:!0,children:[u.jsx("summary",{className:"cursor-pointer list-none text-xs font-semibold uppercase tracking-[0.2em] text-slate-400",children:i.bootArguments}),u.jsxs("div",{className:"mt-3 grid gap-2 text-sm",children:[u.jsxs("div",{className:"flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950/70 px-3 py-2",children:[u.jsx("span",{className:"text-slate-400",children:i.argumentCount}),u.jsx("span",{className:"font-mono text-slate-200",children:x.count})]}),u.jsxs("div",{className:"flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950/70 px-3 py-2",children:[u.jsx("span",{className:"text-slate-400",children:i.resolvedFile}),u.jsx("span",{className:"font-mono text-slate-200",children:h??i.none})]}),x.file&&u.jsxs("div",{className:"grid gap-2 md:grid-cols-2",children:[u.jsx("div",{className:"rounded-lg border border-slate-800 bg-slate-950/70 px-3 py-2 text-xs text-slate-300",children:i.dirInfo({dirPage:x.file.dirPage,dirOffset:x.file.dirOffset,type:x.file.type})}),u.jsx("div",{className:"rounded-lg border border-slate-800 bg-slate-950/70 px-3 py-2 text-xs text-slate-300",children:i.fileInfo({startPage:x.file.startPage,pageCount:x.file.pageCount,sizeBytes:x.file.sizeBytes})})]})]})]})]})}function B5({data:t}){const{messages:a}=Ot(),i=a.software.networkCard,l=kc(t.networkResponseBuffer,120),o=t.networkPending?t.networkMethod:t.networkCompletedUrl?t.networkCompletedMethod:t.networkMethod,c=t.networkPending?t.networkUrl:t.networkCompletedUrl||t.networkUrl,d=t.networkPending?t.networkBody:t.networkCompletedBody||t.networkBody,m=t.networkCompletedResponseText||(t.networkCompletedStatus?i.empty:"");return u.jsxs("section",{className:"rounded-2xl border border-slate-800 bg-slate-950/90 p-4",children:[u.jsxs("div",{className:"flex flex-wrap items-center justify-between gap-3",children:[u.jsxs("div",{className:"flex items-center gap-2 text-slate-200",children:[u.jsx(bf,{size:16,className:"text-sky-300"}),u.jsx("h3",{className:"text-sm font-semibold",children:i.title})]}),u.jsx("span",{className:`rounded-full border px-2.5 py-1 text-[11px] font-medium ${t.networkPending?"border-amber-500/40 bg-amber-500/10 text-amber-300":t.networkCompletedStatus.startsWith("HTTP ERROR")?"border-rose-500/40 bg-rose-500/10 text-rose-300":"border-slate-700 bg-slate-900 text-slate-300"}`,children:t.networkPending?i.pending:t.networkCompletedStatus||t.networkStatus||i.idle})]}),u.jsxs("div",{className:"mt-4 grid gap-3 md:grid-cols-[auto_1fr]",children:[u.jsxs("div",{className:"flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/80 px-3 py-2 text-sm font-semibold text-slate-200",children:[t.networkPending?u.jsx(VN,{size:15,className:"animate-spin text-amber-300"}):u.jsx(uT,{size:15,className:"text-sky-300"}),o]}),u.jsxs("div",{className:"rounded-xl border border-slate-800 bg-slate-900/80 px-3 py-2 text-sm text-slate-300",children:[u.jsx("div",{className:"text-[10px] uppercase tracking-[0.2em] text-slate-500",children:i.url}),u.jsx("div",{className:"mt-1 break-all font-mono",children:c||i.noRequestYet})]})]}),u.jsxs("div",{className:"mt-3 grid gap-3 xl:grid-cols-[1fr_0.9fr]",children:[u.jsxs("div",{className:"rounded-xl border border-slate-800 bg-slate-900/80 p-3",children:[u.jsx("div",{className:"text-[10px] uppercase tracking-[0.2em] text-slate-500",children:i.requestBody}),u.jsx("pre",{className:"mt-2 max-h-40 overflow-auto whitespace-pre-wrap break-all rounded-lg bg-slate-950/70 p-3 font-mono text-xs text-slate-300",children:d||i.empty})]}),u.jsxs("div",{className:"rounded-xl border border-slate-800 bg-slate-900/80 p-3",children:[u.jsx("div",{className:"text-[10px] uppercase tracking-[0.2em] text-slate-500",children:i.responseBuffer}),u.jsxs("div",{className:"mt-2 grid gap-2 text-xs text-slate-300",children:[u.jsxs("div",{className:"rounded-lg border border-slate-800 bg-slate-950/70 px-3 py-2",children:[i.bytesAvailable,": ",u.jsx("span",{className:"font-mono",children:t.networkResponseBuffer.length})]}),u.jsxs("div",{className:"rounded-lg border border-slate-800 bg-slate-950/70 px-3 py-2",children:[i.lastByte,": ",u.jsxs("span",{className:"font-mono",children:[ue(t.networkLastByte)," / ",t.networkLastByte]})]}),u.jsx("pre",{className:"max-h-28 overflow-auto whitespace-pre-wrap break-all rounded-lg border border-slate-800 bg-slate-950/70 p-3 font-mono text-xs text-slate-400",children:l||i.noResponseBytesYet})]})]})]}),u.jsxs("div",{className:"mt-3 grid gap-3 md:grid-cols-[auto_1fr]",children:[u.jsx("div",{className:"rounded-xl border border-slate-800 bg-slate-900/80 px-3 py-2 text-sm font-semibold text-slate-200",children:i.lastStatus}),u.jsx("div",{className:"rounded-xl border border-slate-800 bg-slate-900/80 px-3 py-2 text-sm text-slate-300",children:u.jsx("div",{className:"font-mono",children:t.networkCompletedStatus||t.networkStatus||i.noCompletedRequestYet})})]}),u.jsxs("details",{className:"mt-3 rounded-xl border border-slate-800 bg-slate-900/80 p-3",open:!0,children:[u.jsx("summary",{className:"cursor-pointer list-none text-[10px] uppercase tracking-[0.2em] text-slate-500",children:i.lastCompletedRequest}),u.jsxs("div",{className:"mt-3 grid gap-3",children:[u.jsxs("div",{className:"flex items-center gap-2 text-sm text-slate-200",children:[u.jsx("span",{className:"rounded-full border border-slate-700 bg-slate-950 px-2 py-0.5 font-semibold",children:t.networkCompletedMethod}),u.jsx("span",{className:"break-all font-mono text-xs text-slate-400",children:t.networkCompletedUrl||i.noCompletedRequestYet})]}),u.jsx("pre",{className:"max-h-32 overflow-auto whitespace-pre-wrap break-all rounded-lg bg-slate-950/70 p-3 font-mono text-xs text-slate-300",children:t.networkCompletedBody||i.empty}),u.jsx("div",{className:"text-[10px] uppercase tracking-[0.2em] text-slate-500",children:i.lastCompletedResponseBody}),u.jsx("pre",{className:"max-h-40 overflow-auto whitespace-pre-wrap break-all rounded-lg bg-slate-950/70 p-3 font-mono text-xs text-slate-300",children:m||i.noCompletedResponseYet})]})]}),u.jsxs("details",{className:"mt-3 rounded-xl border border-slate-800 bg-slate-900/80 p-3",open:!0,children:[u.jsx("summary",{className:"cursor-pointer list-none text-[10px] uppercase tracking-[0.2em] text-slate-500",children:i.recentRequests}),u.jsx("div",{className:"mt-3 max-h-96 space-y-3 overflow-auto",children:t.networkHistory.length===0?u.jsx("div",{className:"rounded-lg bg-slate-950/70 px-3 py-3 text-xs text-slate-500",children:i.noCompletedRequestYet}):t.networkHistory.map(x=>u.jsxs("div",{className:"rounded-xl border border-slate-800 bg-slate-950/70 p-3",children:[u.jsxs("div",{className:"flex flex-wrap items-center gap-2",children:[u.jsx("span",{className:"rounded-full border border-slate-700 bg-slate-900 px-2 py-0.5 text-xs font-semibold text-slate-200",children:x.method}),u.jsx("span",{className:`rounded-full border px-2 py-0.5 text-xs font-medium ${x.status.startsWith("HTTP ERROR")?"border-rose-500/40 bg-rose-500/10 text-rose-300":"border-slate-700 bg-slate-900 text-slate-300"}`,children:x.status}),u.jsxs("span",{className:"font-mono text-[11px] text-slate-500",children:["#",x.id]})]}),u.jsx("div",{className:"mt-2 break-all font-mono text-xs text-sky-300",children:x.url||i.noUrl}),u.jsxs("div",{className:"mt-3 grid gap-3 xl:grid-cols-2",children:[u.jsxs("div",{children:[u.jsx("div",{className:"mb-1 text-[10px] uppercase tracking-[0.2em] text-slate-500",children:i.requestBody}),u.jsx("pre",{className:"max-h-28 overflow-auto whitespace-pre-wrap break-all rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300",children:x.requestBody||i.empty})]}),u.jsxs("div",{children:[u.jsx("div",{className:"mb-1 text-[10px] uppercase tracking-[0.2em] text-slate-500",children:i.responseBody}),u.jsx("pre",{className:"max-h-28 overflow-auto whitespace-pre-wrap break-all rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300",children:x.responseText||i.empty})]})]})]},x.id))})]})]})}const P5=z.memo(B5,(t,a)=>t.data.networkMethod===a.data.networkMethod&&t.data.networkUrl===a.data.networkUrl&&t.data.networkBody===a.data.networkBody&&t.data.networkStatus===a.data.networkStatus&&t.data.networkPending===a.data.networkPending&&t.data.networkLastByte===a.data.networkLastByte&&t.data.networkResponseBuffer===a.data.networkResponseBuffer&&t.data.networkCompletedMethod===a.data.networkCompletedMethod&&t.data.networkCompletedUrl===a.data.networkCompletedUrl&&t.data.networkCompletedBody===a.data.networkCompletedBody&&t.data.networkCompletedStatus===a.data.networkCompletedStatus&&t.data.networkCompletedResponseText===a.data.networkCompletedResponseText&&t.data.networkHistory===a.data.networkHistory);function z5(t){switch(t){case"A":return"text-orange-300 border-orange-500/30 bg-orange-500/10";case"B":return"text-sky-300 border-sky-500/30 bg-sky-500/10";case"PC":return"text-emerald-300 border-emerald-500/30 bg-emerald-500/10";case"SP":return"text-fuchsia-300 border-fuchsia-500/30 bg-fuchsia-500/10";default:return"text-slate-200 border-slate-700 bg-slate-900"}}function dc({label:t,value:a,width:i=2}){return u.jsxs("div",{className:`rounded-xl border p-3 ${z5(t)}`,children:[u.jsx("div",{className:"text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-400",children:t}),u.jsx("div",{className:"mt-2 font-mono text-lg font-semibold",children:ue(a,i)}),u.jsx("div",{className:"mt-1 font-mono text-xs text-slate-400",children:a})]})}function M0({label:t,active:a,tone:i}){return u.jsxs("span",{className:`rounded-full border px-2 py-1 font-mono text-[11px] font-semibold ${a?`${i} border-current/30`:"border-slate-700 bg-slate-900 text-slate-500"}`,children:[t,":",a?"1":"0"]})}function U5({data:t}){const{messages:a}=Ot(),i=a.software.statusCard,l=QM(t.state.memory,t.state.pc),o=t.lastOpcode<0?i.noInstructionExecuted:e5(t.lastOpcode,t.lastOperand);return u.jsxs("section",{className:"rounded-2xl border border-slate-800 bg-slate-950/90 p-4 shadow-[0_0_0_1px_rgba(15,23,42,0.4)]",children:[u.jsxs("div",{className:"flex flex-wrap items-center justify-between gap-3",children:[u.jsxs("div",{children:[u.jsxs("div",{className:"flex items-center gap-2 text-slate-200",children:[u.jsx(tl,{size:16,className:"text-cyan-300"}),u.jsx("h3",{className:"text-sm font-semibold",children:i.title})]}),u.jsx("p",{className:"mt-1 text-xs text-slate-400",children:i.subtitle})]}),u.jsxs("div",{className:"flex flex-wrap items-center gap-2",children:[u.jsx("span",{className:`rounded-full border px-2.5 py-1 text-[11px] font-semibold ${t.isRunning?"border-emerald-500/40 bg-emerald-500/10 text-emerald-300":t.state.halted?"border-rose-500/40 bg-rose-500/10 text-rose-300":"border-slate-700 bg-slate-900 text-slate-300"}`,children:t.isRunning?i.running:t.state.halted?i.halted:i.ready}),u.jsx("span",{className:"rounded-full border border-slate-700 bg-slate-900 px-2.5 py-1 text-[11px] font-medium text-slate-300",children:t.useBootloader?i.bootloader:i.rawProgram}),u.jsxs("span",{className:"rounded-full border border-slate-700 bg-slate-900 px-2.5 py-1 text-[11px] font-medium text-slate-300",children:[i.code," ",Ec(t.codeSize)]})]})]}),u.jsxs("div",{className:"mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4",children:[u.jsx(dc,{label:"A",value:t.state.a}),u.jsx(dc,{label:"B",value:t.state.b}),u.jsx(dc,{label:"PC",value:t.state.pc,width:4}),u.jsx(dc,{label:"SP",value:t.state.sp,width:4})]}),u.jsxs("div",{className:"mt-4 grid gap-3 lg:grid-cols-[1.2fr_0.8fr]",children:[u.jsxs("div",{className:"rounded-xl border border-slate-800 bg-slate-900/80 p-3",children:[u.jsxs("div",{className:"flex items-center gap-2 text-slate-200",children:[u.jsx(fN,{size:15,className:"text-sky-300"}),u.jsx("h4",{className:"text-xs font-semibold uppercase tracking-[0.2em] text-slate-400",children:i.instructionBus})]}),u.jsxs("div",{className:"mt-3 grid gap-3 md:grid-cols-2",children:[u.jsxs("div",{className:"rounded-xl border border-slate-800 bg-slate-950/70 p-3",children:[u.jsx("div",{className:"text-[10px] uppercase tracking-[0.2em] text-slate-500",children:i.nextInstruction}),u.jsx("div",{className:"mt-2 font-mono text-sm font-semibold text-cyan-300",children:l.label}),u.jsxs("div",{className:"mt-1 font-mono text-xs text-slate-400",children:["@",ue(l.addr,4)," | ",l.description]}),u.jsx("div",{className:"mt-3 flex flex-wrap gap-1",children:l.bytes.map((c,d)=>u.jsx("span",{className:`rounded-md border px-2 py-1 font-mono text-xs ${d===0?"border-cyan-500/30 bg-cyan-500/10 text-cyan-200":"border-slate-700 bg-slate-900 text-slate-300"}`,children:ue(c)},`${c}-${d}`))})]}),u.jsxs("div",{className:"rounded-xl border border-slate-800 bg-slate-950/70 p-3",children:[u.jsx("div",{className:"text-[10px] uppercase tracking-[0.2em] text-slate-500",children:i.lastExecuted}),u.jsx("div",{className:"mt-2 font-mono text-sm font-semibold text-amber-300",children:o}),u.jsxs("div",{className:"mt-1 font-mono text-xs text-slate-400",children:["opcode ",t.lastOpcode>=0?ue(t.lastOpcode):"--"," | operand"," ",ue(t.lastOperand,4)]}),u.jsxs("div",{className:"mt-3 grid grid-cols-3 gap-2 text-xs text-slate-400",children:[u.jsxs("div",{className:"rounded-lg border border-slate-800 bg-slate-900 px-2 py-1.5",children:[i.clock," ",t.clockBit]}),u.jsxs("div",{className:"rounded-lg border border-slate-800 bg-slate-900 px-2 py-1.5",children:[i.sleep," ",t.sleepCounter]}),u.jsxs("div",{className:"rounded-lg border border-slate-800 bg-slate-900 px-2 py-1.5",children:[i.cycles," ",t.state.cycles]})]})]})]})]}),u.jsxs("div",{className:"rounded-xl border border-slate-800 bg-slate-900/80 p-3",children:[u.jsxs("div",{className:"flex items-center gap-2 text-slate-200",children:[t.isRunning?u.jsx(LN,{size:15,className:"text-emerald-300"}):u.jsx(vN,{size:15,className:"text-slate-400"}),u.jsx("h4",{className:"text-xs font-semibold uppercase tracking-[0.2em] text-slate-400",children:i.executionFlags})]}),u.jsxs("div",{className:"mt-3 flex flex-wrap gap-2",children:[u.jsx(M0,{label:"Z",active:t.state.flags.z,tone:"bg-yellow-500/15 text-yellow-300"}),u.jsx(M0,{label:"C",active:t.state.flags.c,tone:"bg-rose-500/15 text-rose-300"}),u.jsx(M0,{label:"N",active:t.state.flags.n,tone:"bg-fuchsia-500/15 text-fuchsia-300"})]}),u.jsxs("div",{className:"mt-4 grid gap-2 text-xs text-slate-300",children:[u.jsxs("div",{className:"flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950/70 px-3 py-2",children:[u.jsxs("span",{className:"flex items-center gap-2 text-slate-400",children:[u.jsx(uN,{size:13,className:"text-emerald-300"}),i.inputBuffer]}),u.jsxs("span",{className:"font-mono",children:[t.consoleInputBuffer.length," ",i.bytes]})]}),u.jsxs("div",{className:"flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950/70 px-3 py-2",children:[u.jsxs("span",{className:"flex items-center gap-2 text-slate-400",children:[u.jsx(RN,{size:13,className:"text-sky-300"}),i.rngState]}),u.jsxs("span",{className:"font-mono",children:[ue(t.randSeed)," / ",ue(t.randCounter)]})]}),u.jsxs("div",{className:"flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950/70 px-3 py-2",children:[u.jsxs("span",{className:"flex items-center gap-2 text-slate-400",children:[u.jsx(tl,{size:13,className:"text-cyan-300"}),i.memoryLoad]}),u.jsx("span",{className:"font-mono",children:t.assembled?i.loaded:i.empty})]})]})]})]})]})}const $5=z.memo(wb),I5=z.memo(Db);function qx({children:t,fullscreen:a,onToggleFullscreen:i}){const{messages:l}=Ot(),o=l.software.computerPanel;return u.jsxs("div",{className:"flex h-full flex-col overflow-hidden rounded-2xl border border-slate-800 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.14),_transparent_28%),linear-gradient(180deg,_rgba(15,23,42,0.96),_rgba(2,6,23,1))] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]",children:[u.jsxs("div",{className:"flex items-center justify-between gap-3 border-b border-slate-800 bg-slate-950/70 px-4 py-3",children:[u.jsxs("div",{children:[u.jsxs("div",{className:"flex items-center gap-2 text-slate-100",children:[u.jsx(FN,{size:16,className:"text-cyan-300"}),u.jsx("h2",{className:"text-sm font-semibold",children:o.title})]}),u.jsx("p",{className:"mt-1 text-xs text-slate-400",children:o.subtitle})]}),u.jsx("button",{type:"button",onClick:i,className:"rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-slate-300 transition hover:border-cyan-500/40 hover:text-cyan-200",title:a?o.exitFullscreen:o.fullscreen,children:a?u.jsx(W_,{size:16}):u.jsx(Ns,{size:16})})]}),u.jsx("div",{className:"min-h-0 flex-1 overflow-auto p-4",children:t})]})}function H5({data:t,onClearConsole:a,onConsoleInput:i,onClearPlotter:l,onKeyDown:o,onKeyUp:c}){const{messages:d}=Ot(),m=d.software.computerPanel,[x,h]=z.useState(!1);z.useEffect(()=>{if(!x)return;const g=v=>{v.key==="Escape"&&h(!1)};return window.addEventListener("keydown",g),()=>window.removeEventListener("keydown",g)},[x]);const b=u.jsxs("div",{className:"grid gap-4",children:[u.jsx(C5,{data:t}),u.jsxs("div",{className:"grid gap-4 2xl:grid-cols-[1.08fr_0.92fr]",children:[u.jsxs("div",{className:"grid gap-4",children:[u.jsx(U5,{data:t}),u.jsx(j5,{data:t}),u.jsx(N5,{data:t}),u.jsx(P5,{data:t})]}),u.jsxs("div",{className:"grid gap-4",children:[u.jsx("div",{className:"aspect-square w-full overflow-hidden",children:u.jsx(I5,{pixels:t.plotterPixels,currentColor:t.plotterColor,onClear:l})}),u.jsx("div",{className:"overflow-hidden",children:u.jsx($5,{output:t.consoleOutput,onClear:a,onInput:i})}),u.jsx(O5,{keyState:t.keyState,inputBuffer:t.consoleInputBuffer,isRunning:t.isRunning,onKeyDown:o,onKeyUp:c})]})]})]});return x?u.jsxs(u.Fragment,{children:[u.jsx("div",{className:"flex h-full items-center justify-center rounded-2xl border border-slate-800 bg-slate-950/70 text-xs text-slate-500",children:m.fullscreenActive}),u.jsx("div",{className:"fixed inset-0 z-50 bg-slate-950 p-4",children:u.jsx(qx,{fullscreen:!0,onToggleFullscreen:()=>h(!1),children:b})})]}):u.jsx(qx,{fullscreen:!1,onToggleFullscreen:()=>h(!0),children:b})}const J5=z.memo(H5,(t,a)=>t.data===a.data&&t.onClearConsole===a.onClearConsole&&t.onConsoleInput===a.onConsoleInput&&t.onClearPlotter===a.onClearPlotter&&t.onKeyDown===a.onKeyDown&&t.onKeyUp===a.onKeyUp),Nb={ArrowLeft:0,ArrowRight:1,ArrowUp:2,ArrowDown:3,Enter:4},q5={Backspace:8,Tab:9,Escape:27,Delete:127};function V5(t){var i;if(!t)return!1;if(t.isContentEditable)return!0;const a=(i=t.tagName)==null?void 0:i.toUpperCase();return a==="INPUT"||a==="TEXTAREA"||a==="SELECT"}function Vx(t,a){if(V5(a.target))return!1;const i=Nb[a.key];if(i!==void 0)return t.keyState[i]=1,a.key==="Enter"&&t.pushInput(10),!0;if(a.altKey||a.ctrlKey||a.metaKey)return!1;const l=q5[a.key];return l!==void 0?(t.pushInput(l),!0):a.key.length===1?(t.pushInput(a.key.charCodeAt(0)),!0):!1}function Zx(t,a){const i=Nb[a.key];return i===void 0?!1:(t.keyState[i]=0,!0)}function Z5({onHardwareSync:t,onProgramLoaded:a}){const{messages:i}=Ot(),l=i.software,o=z.useRef(new F0),[c,d]=z.useState("asm"),[m,x]=z.useState(Ab[0].code),[h,b]=z.useState(Lb[0].code),[g,v]=z.useState([]),[L,w]=z.useState(!1),[N,T]=z.useState(0),[C,B]=z.useState(null),[D,E]=z.useState(!1),[_,P]=z.useState(X0()),[S,X]=z.useState([]),[F,$]=z.useState(new Map),[H,te]=z.useState(dn),[oe,I]=z.useState([]),[J,R]=z.useState([0,0,0,0,0]),[Z,G]=z.useState(()=>o.current.exportDriveData()),[K,ne]=z.useState({page:0,lastAddr:0,lastRead:0,lastWrite:0}),[j,M]=z.useState({method:"GET",url:"",body:"",status:"Idle",pending:!1,responseBuffer:[],lastByte:0,completedMethod:"GET",completedUrl:"",completedBody:"",completedStatus:"",completedResponseText:"",history:[]}),V=z.useRef(new Map),[ee,xe]=z.useState(!1),[be,Le]=z.useState(10),pe=z.useRef(null),Te=z.useRef(null),[Ze,Me]=z.useState(new Set),[Be,Pe]=z.useState(null),[He,at]=z.useState("computer"),Xe=z.useRef([0,0,0,0,0]),Ct=z.useRef(o.current.consoleRevision),nn=z.useRef(o.current.plotterRevision),Pt=z.useRef(o.current.inputRevision),St=z.useRef(o.current.networkRevision),we=z.useRef(o.current.driveContentRevision),Ee=z.useRef(o.current.driveStateRevision),$e=c==="c"?h:m,me=c==="c"?b:x,tt=L&&c==="asm"&&V.current.get(_.pc)||void 0,Se=z.useCallback(Q=>{if(P(Q.snapshot()),Ct.current!==Q.consoleRevision&&(Ct.current=Q.consoleRevision,X([...Q.consoleOutput])),nn.current!==Q.plotterRevision&&(nn.current=Q.plotterRevision,$(new Map(Q.plotterPixels)),te({...Q.plotterColor})),Pt.current!==Q.inputRevision&&(Pt.current=Q.inputRevision,I([...Q.consoleInputBuffer])),Xe.current.length!==Q.keyState.length||Xe.current.some((De,Ce)=>De!==Q.keyState[Ce])){const De=[...Q.keyState];Xe.current=De,R(De)}we.current!==Q.driveContentRevision&&(we.current=Q.driveContentRevision,G(Q.exportDriveData())),Ee.current!==Q.driveStateRevision&&(Ee.current=Q.driveStateRevision,ne({page:Q.drivePage,lastAddr:Q.driveLastAddr,lastRead:Q.driveLastRead,lastWrite:Q.driveLastWrite})),St.current!==Q.networkRevision&&(St.current=Q.networkRevision,M({method:Q.httpLastMethod,url:Q.httpLastUrl,body:Q.httpLastBody,status:Q.httpLastStatus,pending:Q.httpPending,responseBuffer:[...Q.httpResponseBuffer],lastByte:Q.httpLastByte,completedMethod:Q.httpCompletedMethod,completedUrl:Q.httpCompletedUrl,completedBody:Q.httpCompletedBody,completedStatus:Q.httpCompletedStatus,completedResponseText:Q.httpCompletedResponseText,history:[...Q.httpHistory]})),t==null||t({pc:Q.state.pc,a:Q.state.a,b:Q.state.b,sp:Q.state.sp,memory:new Uint8Array(Q.state.memory),flags:{...Q.state.flags},consoleText:Q.consoleOutput.join(""),plotterPixels:ab(Q.plotterPixels),plotterColor:{...Q.plotterColor},driveData:Q.exportDriveData(),driveLastAddr:Q.driveLastAddr,driveLastRead:Q.driveLastRead,driveLastWrite:Q.driveLastWrite,networkMethod:Q.httpLastMethod,networkUrl:Q.httpLastUrl,networkBody:Q.httpLastBody,networkStatus:Q.httpLastStatus,networkPending:Q.httpPending,networkResponseBuffer:[...Q.httpResponseBuffer],networkLastByte:Q.httpLastByte,networkCompletedMethod:Q.httpCompletedMethod,networkCompletedUrl:Q.httpCompletedUrl,networkCompletedBody:Q.httpCompletedBody,networkCompletedStatus:Q.httpCompletedStatus,networkCompletedResponseText:Q.httpCompletedResponseText,halted:Q.state.halted})},[t]);z.useEffect(()=>{const Q=o.current;return Q.onExternalStateChange=()=>{Se(Q)},()=>{Q.onExternalStateChange&&(Q.onExternalStateChange=void 0)}},[Se]);const nt=z.useCallback(Q=>{Q!==c&&(d(Q),v([]))},[c]),st=z.useCallback((Q=!0)=>{const De=o.current,Ce=vb();let Re=!0;for(let Ht=0;Ht<Ce.bytes.length;Ht++)if(De.state.memory[Ce.startAddr+Ht]!==Ce.bytes[Ht]){Re=!1;break}if(Re)return!0;De.reset(),De.loadProgram(Ce.bytes,Ce.startAddr);const dt=oc(De,{preserveConsole:Q,preserveNetwork:!0});return Se(De),a==null||a(Ce),dt},[a,Se]),Zt=z.useCallback(()=>{const Q=(De,Ce,Re)=>{if(D){st(!1),V.current=new Map,Pe(De),w(!0),v([]),T(De.length),B(Re),Me(new Set);return}const dt=o.current,Ht={bytes:De,startAddr:0};dt.reset(),dt.loadProgram(Ht.bytes,Ht.startAddr),V.current=Ce,Se(dt),Pe(De),w(!0),xe(!1),v([]),T(De.length),B(Re),Me(new Set),a==null||a(Ht)};if(c==="c"){const De=ob(h);if(!De.success){v(De.errors.map(Re=>({line:Re.line,message:`[${Re.phase}] ${Re.message}`}))),w(!1),B(De.memoryLayout||null),Pe(null),De.assembly&&x(De.assembly);return}x(De.assembly);const Ce=_s(De.assembly);if(!Ce.success){v(Ce.errors.map(Re=>({line:Re.line,message:`[asm] ${Re.message}`}))),w(!1),B(De.memoryLayout||null),Pe(null);return}Q(Ce.bytes,Ce.sourceMap,De.memoryLayout||null)}else{const De=_s(m);v(De.errors.map(Ce=>({line:Ce.line,message:Ce.message}))),De.success?Q(De.bytes,De.sourceMap,null):(w(!1),T(De.bytes.length),B(null),Pe(null))}},[h,m,c,st,a,Se,D]),Dn=z.useCallback(()=>{if(!L||D&&!st())return;const Q=o.current,De=new Uint8Array(Q.state.memory);if(Q.step(),Q.state.halted&&D){oc(Q,{preserveConsole:!0,preservePlotter:!0,preserveNetwork:!0}),Se(Q);return}const Ce=new Set;for(let Re=0;Re<pn;Re++)Q.state.memory[Re]!==De[Re]&&Ce.add(Re);Ce.size>0&&(Me(Re=>new Set([...Re,...Ce])),setTimeout(()=>{Me(Re=>{const dt=new Set(Re);for(const Ht of Ce)dt.delete(Ht);return dt})},1e3)),Se(Q),Q.state.halted&&xe(!1)},[L,st,Se,D]),Zn=z.useCallback(()=>{if(L&&!(D&&!st())){if(o.current.state.halted){if(!D||!oc(o.current,{preserveConsole:!0,preservePlotter:!0,preserveNetwork:!0}))return;Se(o.current)}xe(!0)}},[L,st,Se,D]),Ti=z.useCallback(()=>{xe(!1)},[]);z.useEffect(()=>{if(!ee){pe.current!==null&&(clearInterval(pe.current),pe.current=null);return}return pe.current=window.setInterval(()=>{const Q=o.current;for(let De=0;De<be;De++)if(!Q.step()){if(D&&oc(Q,{preserveConsole:!0,preservePlotter:!0,preserveNetwork:!0}))break;xe(!1);break}Se(Q)},50),()=>{pe.current!==null&&(clearInterval(pe.current),pe.current=null)}},[ee,be,Se,D]);const Bn=z.useCallback(()=>{const Q=o.current;Q.reset(),Se(Q),w(!1),xe(!1),v([]),T(0),B(null),Me(new Set)},[Se]),zt=z.useCallback(()=>{const Q=o.current;Q.consoleOutput=[],Q.consoleRevision++,Se(Q)},[Se]);z.useEffect(()=>{if(!ee)return;const Q=o.current,De=Re=>{Vx(Q,{key:Re.key,altKey:Re.altKey,ctrlKey:Re.ctrlKey,metaKey:Re.metaKey,target:Re.target})&&(Se(Q),Re.preventDefault())},Ce=Re=>{Zx(Q,{key:Re.key})&&(Se(Q),Re.preventDefault())};return window.addEventListener("keydown",De),window.addEventListener("keyup",Ce),()=>{window.removeEventListener("keydown",De),window.removeEventListener("keyup",Ce),Q.keyState=[0,0,0,0,0],Se(Q)}},[ee,Se]);const Qt=z.useCallback(Q=>{const De=o.current;for(let Ce=0;Ce<Q.length;Ce++)De.pushInput(Q.charCodeAt(Ce));De.pushInput(10),Se(De)},[Se]),Ut=z.useCallback(Q=>{const De=o.current;Vx(De,{key:Q})&&Se(De)},[Se]),Mi=z.useCallback(Q=>{const De=o.current;Zx(De,{key:Q})&&Se(De)},[Se]),Va=z.useCallback(()=>{o.current.plotterPixels=new Map,o.current.plotterRevision++,Se(o.current)},[Se]),Za=z.useCallback(Q=>{if(me(Q),w(!1),Pe(null),v([]),Me(new Set),!D){xe(!1);const De=o.current;De.reset(),Se(De)}},[me,Se,D]),Cn=z.useCallback(()=>{if(!Be)return;const Q=window.prompt(l.toolbar.compileToDiskPrompt,l.toolbar.compileToDiskDefaultName);if(Q)try{const De=bb(o.current.driveData,Q,Be);o.current.loadDriveData(De),Se(o.current)}catch(De){window.alert(De instanceof Error?De.message:l.toolbar.compileToDiskError)}},[Be,Se,l.toolbar.compileToDiskDefaultName,l.toolbar.compileToDiskError,l.toolbar.compileToDiskPrompt]),hn=z.useCallback(()=>{if(!window.confirm(l.toolbar.installLinuxDiskConfirm))return;const De=o.current;De.loadDriveData(JM(!0)),Se(De)},[Se,l.toolbar.installLinuxDiskConfirm]),Gn=z.useCallback(()=>{const Q=new Blob([o.current.exportDriveData()],{type:"application/octet-stream"}),De=URL.createObjectURL(Q),Ce=document.createElement("a");Ce.href=De,Ce.download="external-drive.bin",document.body.appendChild(Ce),Ce.click(),document.body.removeChild(Ce),URL.revokeObjectURL(De)},[]),y=z.useCallback(()=>{var Q;(Q=Te.current)==null||Q.click()},[]),O=z.useCallback(async Q=>{var dt;const De=(dt=Q.target.files)==null?void 0:dt[0];if(Q.target.value="",!De)return;const Ce=new Uint8Array(await De.arrayBuffer()),Re=o.current;Re.loadDriveData(Ce),Se(Re)},[Se]);let q=0;for(let Q=pa-1;Q>=0;Q--)if(_.memory[Q]!==0){q=Q+1;break}const ie=C?C.globals+C.scratch+C.locals:0,fe=2048,Ne=C?fe-ie:0,Je=(C==null?void 0:C.stackSize)??2048,bt=pn-1,Et=Math.max(0,Math.min(Je,bt-_.sp)),$t=ie+Et,ke=fe+Je,Ke=ke-$t;let ut=0;for(const Q of o.current.driveData)Q!==0&&ut++;const It=z.useMemo(()=>({state:_,consoleOutput:S,consoleInputBuffer:oe,plotterPixels:F,plotterColor:H,keyState:J,driveData:Z,drivePage:K.page,driveLastAddr:K.lastAddr,driveLastRead:K.lastRead,driveLastWrite:K.lastWrite,networkMethod:j.method,networkUrl:j.url,networkBody:j.body,networkStatus:j.status,networkPending:j.pending,networkResponseBuffer:j.responseBuffer,networkLastByte:j.lastByte,networkCompletedMethod:j.completedMethod,networkCompletedUrl:j.completedUrl,networkCompletedBody:j.completedBody,networkCompletedStatus:j.completedStatus,networkCompletedResponseText:j.completedResponseText,networkHistory:j.history,lastOpcode:o.current.lastOpcode,lastOperand:o.current.lastOperand,clockBit:o.current.clockBit,randSeed:o.current.randSeed,randCounter:o.current.randCounter,sleepCounter:o.current.sleepCounter,assembled:L,isRunning:ee,useBootloader:D,memLayout:C,codeSize:N}),[L,N,oe,S,_,Z,K,ee,J,C,j,H,F,D]);return u.jsxs("div",{className:"flex-1 flex flex-col h-full bg-slate-950 overflow-hidden",children:[u.jsxs("div",{className:"flex items-center gap-2 px-4 py-2 bg-slate-900 border-b border-slate-800 shrink-0",children:[u.jsxs("div",{className:"flex rounded-md overflow-hidden border border-slate-700",children:[u.jsx("button",{onClick:()=>nt("asm"),className:`px-3 py-1 text-xs font-bold transition-colors ${c==="asm"?"bg-blue-500/30 text-blue-300 border-r border-blue-500/50":"bg-slate-800 text-slate-500 border-r border-slate-700 hover:bg-slate-700"}`,children:"ASM"}),u.jsx("button",{onClick:()=>nt("c"),className:`px-3 py-1 text-xs font-bold transition-colors ${c==="c"?"bg-purple-500/30 text-purple-300":"bg-slate-800 text-slate-500 hover:bg-slate-700"}`,children:"C"})]}),u.jsx("div",{className:"w-px h-6 bg-slate-700 mx-1"}),u.jsxs("button",{onClick:Zt,className:`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-bold transition-colors border ${c==="c"?"bg-purple-500/20 text-purple-400 border-purple-500/50 hover:bg-purple-500/30":"bg-blue-500/20 text-blue-400 border-blue-500/50 hover:bg-blue-500/30"}`,children:[u.jsx(CT,{size:14})," ",c==="c"?l.toolbar.compile:l.toolbar.assemble]}),u.jsx("div",{className:"w-px h-6 bg-slate-700 mx-1"}),u.jsxs("button",{onClick:Dn,disabled:!L||ee||_.halted&&!D,className:"flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-bold transition-colors bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed",children:[u.jsx(tb,{size:14})," ",l.toolbar.step]}),ee?u.jsxs("button",{onClick:Ti,className:"flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-bold transition-colors bg-red-500/20 text-red-400 border border-red-500/50 hover:bg-red-500/30",children:[u.jsx(Gc,{size:14})," ",l.toolbar.stop]}):u.jsxs("button",{onClick:Zn,disabled:!L||_.halted&&!D,className:"flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-bold transition-colors bg-green-500/20 text-green-400 border border-green-500/50 hover:bg-green-500/30 disabled:opacity-30 disabled:cursor-not-allowed",children:[u.jsx(Lf,{size:14})," ",l.toolbar.run]}),u.jsxs("button",{onClick:Bn,className:"flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-bold transition-colors bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700",children:[u.jsx(Q_,{size:14})," ",l.toolbar.reset]}),u.jsx("div",{className:"w-px h-6 bg-slate-700 mx-1"}),u.jsxs("label",{className:"flex items-center gap-2 px-2 py-1 rounded-md border border-slate-700 bg-slate-900 text-xs text-slate-300",children:[u.jsx("input",{type:"checkbox",checked:D,onChange:Q=>E(Q.target.checked),className:"accent-cyan-500"}),l.toolbar.useBootloader]}),u.jsxs("div",{className:"flex items-center gap-2",children:[u.jsxs("span",{className:"flex items-center gap-1.5 text-[10px] font-mono px-2 py-1 rounded border text-cyan-300 bg-cyan-500/10 border-cyan-500/30",children:[u.jsx(Gr,{size:12}),l.toolbar.disk," ",ut,"/",ba]}),u.jsxs("button",{onClick:y,className:"flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-bold transition-colors bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700",children:[u.jsx(yT,{size:13})," ",l.toolbar.import]}),u.jsxs("button",{onClick:Gn,className:"flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-bold transition-colors bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700",children:[u.jsx(MN,{size:13})," ",l.toolbar.export]}),u.jsxs("button",{onClick:Cn,disabled:!Be,className:"flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-bold transition-colors bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/25 disabled:opacity-30 disabled:cursor-not-allowed",children:[u.jsx(Gr,{size:13})," ",l.toolbar.compileToDisk]}),D&&u.jsxs("button",{onClick:hn,className:"flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-bold transition-colors bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/25",children:[u.jsx(Gr,{size:13})," ",l.toolbar.installLinuxDisk]})]}),u.jsxs("div",{className:"flex items-center gap-2",children:[u.jsx(X_,{size:14,className:"text-slate-500"}),u.jsx("input",{type:"range",min:1,max:1e5,value:be,onChange:Q=>Le(parseInt(Q.target.value)),className:"w-20 accent-blue-500"}),u.jsx("input",{type:"number",min:1,max:1e5,value:be,onChange:Q=>{const De=parseInt(Q.target.value);!isNaN(De)&&De>=1&&De<=1e5&&Le(De)},className:"w-16 text-[10px] text-slate-300 font-mono bg-slate-800 border border-slate-600 rounded px-1.5 py-0.5 text-center focus:outline-none focus:border-blue-500 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"}),u.jsx("span",{className:"text-[10px] text-slate-500 font-mono",children:l.toolbar.instructionsPerTick})]}),u.jsx("input",{ref:Te,type:"file",accept:".bin,.img,.disk,application/octet-stream",onChange:O,className:"hidden"}),u.jsxs("div",{className:"ml-auto flex items-center gap-2",children:[_.halted&&u.jsx("span",{className:"text-xs font-bold text-red-400 bg-red-500/10 px-2 py-0.5 rounded border border-red-500/30",children:l.toolbar.halted}),ee&&u.jsx("span",{className:"text-xs font-bold text-green-400 bg-green-500/10 px-2 py-0.5 rounded border border-green-500/30 animate-pulse",children:l.toolbar.running}),L&&!ee&&!_.halted&&u.jsx("span",{className:"text-xs font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/30",children:l.toolbar.ready}),N>0&&u.jsxs("div",{className:"flex items-center gap-1.5",children:[u.jsxs("span",{className:`text-[10px] font-mono px-1.5 py-0.5 rounded border ${q>pa?"text-red-400 bg-red-500/10 border-red-500/30":q>pa*.8?"text-yellow-400 bg-yellow-500/10 border-yellow-500/30":"text-slate-400 bg-slate-800 border-slate-700"}`,children:[l.toolbar.code," ",q,"/",pa]}),C&&u.jsxs(u.Fragment,{children:[u.jsxs("span",{className:"text-[10px] font-mono text-slate-500",children:[l.toolbar.ram," ",$t,"/",ke]}),u.jsxs("div",{className:"flex h-3 w-28 rounded-sm overflow-hidden border border-slate-700",title:l.toolbar.memoryTooltip({liveCodeUsed:q,codeSize:N,codeMax:pa,globals:C.globals,scratch:C.scratch,locals:C.locals,dataUsed:ie,dataMax:fe,dataFree:Ne,stackUsed:Et,stackMax:Je,spHex:_.sp.toString(16).padStart(4,"0"),totalRamUsed:$t,totalRamMax:ke,totalRamFree:Ke}),children:[u.jsx("div",{className:"relative bg-blue-950/80",style:{width:"50%"},children:u.jsx("div",{className:"absolute inset-y-0 left-0 bg-blue-500",style:{width:`${Math.min(100,q/pa*100)}%`}})}),u.jsx("div",{className:"relative bg-emerald-950/80",style:{width:"25%"},children:u.jsx("div",{className:"absolute inset-y-0 left-0 bg-emerald-500",style:{width:`${Math.min(100,ie/fe*100)}%`}})}),u.jsx("div",{className:"relative bg-orange-950/80",style:{width:"25%"},children:u.jsx("div",{className:"absolute inset-y-0 left-0 bg-orange-500",style:{width:`${Math.min(100,Et/Je*100)}%`}})})]}),u.jsxs("span",{className:`text-[10px] font-mono ${Ke<=0?"text-red-400":Ke<50?"text-yellow-400":"text-slate-500"}`,children:[l.toolbar.stack,":",Et]})]})]})]})]}),u.jsx("div",{className:"flex-1 flex overflow-hidden",children:u.jsx(N0,{direction:"horizontal",initialRatio:.5,minRatio:.25,maxRatio:.75,className:"flex-1 h-full",first:u.jsx("div",{className:"flex flex-col p-2 gap-2 h-full overflow-hidden",children:u.jsx("div",{className:"flex-1 overflow-hidden",children:u.jsx(XM,{code:$e,onChange:me,errors:g,currentLine:tt,onSelectExample:Za,language:c})})}),second:u.jsxs("div",{className:"flex flex-col p-2 gap-2 h-full overflow-hidden",children:[u.jsx("div",{className:"shrink-0 rounded-md border border-slate-800 bg-slate-900/80 p-1.5",children:u.jsxs("div",{className:"flex items-center gap-1",children:[u.jsx("button",{onClick:()=>at("computer"),className:`rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${He==="computer"?"bg-cyan-500/20 text-cyan-300 border border-cyan-500/30":"text-slate-400 hover:bg-slate-800 hover:text-slate-200"}`,children:l.toolbar.computer}),u.jsx("button",{onClick:()=>at("classic"),className:`rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${He==="classic"?"bg-slate-700 text-slate-100 border border-slate-600":"text-slate-400 hover:bg-slate-800 hover:text-slate-200"}`,children:l.toolbar.classic}),u.jsx("span",{className:"ml-auto px-2 text-[10px] font-medium uppercase tracking-[0.18em] text-slate-500",children:l.toolbar.sameLiveCpu})]})}),u.jsx("div",{className:"flex-1 overflow-hidden",children:He==="computer"?u.jsx(J5,{data:It,onClearConsole:zt,onConsoleInput:Qt,onClearPlotter:Va,onKeyDown:Ut,onKeyUp:Mi}):u.jsxs("div",{className:"flex flex-col gap-2 h-full overflow-hidden",children:[u.jsx("div",{className:"shrink-0",children:u.jsx(FM,{state:_})}),u.jsx("div",{className:"flex-1 overflow-hidden",children:u.jsx(N0,{direction:"horizontal",initialRatio:.5,minRatio:.3,maxRatio:.7,className:"h-full",first:u.jsx("div",{className:"h-full overflow-hidden",children:u.jsx(WM,{memory:_.memory,pc:_.pc,sp:_.sp,highlights:Ze})}),second:u.jsx(N0,{direction:"vertical",initialRatio:.5,minRatio:.2,maxRatio:.8,className:"h-full",first:u.jsx("div",{className:"h-full overflow-hidden",children:u.jsx(wb,{output:S,onClear:zt,onInput:Qt})}),second:u.jsx("div",{className:"h-full overflow-hidden",children:u.jsx(Db,{pixels:F,currentColor:H,onClear:Va})})})})})]})})]})})})]})}const pt=(t,a,i,l,o)=>Array.from({length:8},(c,d)=>({id:`${t}${d}`,source:a,target:i,sourceHandle:`${l}${d}`,targetHandle:`${o}${d}`,animated:!1,style:{stroke:"#475569",strokeWidth:2}})),et=(t,a,i,l,o)=>({id:t,source:a,target:i,sourceHandle:l,targetHandle:o,animated:!1,style:{stroke:"#475569",strokeWidth:2}}),G5=[{id:"clk",type:"clock",position:{x:1500,y:-400},data:{label:"CLK",value:0,frequency:2,tickCounter:0}},{id:"pc",type:"register8",position:{x:0,y:0},data:{label:"PC",value:0,q:Array(8).fill(0),prevClk:0}},{id:"pcDisp",type:"outputNumber",position:{x:30,y:-230},data:{label:"PC",value:0}},{id:"pcLoad",type:"input",position:{x:-30,y:310},data:{label:"PC_LOAD",value:1}},{id:"pcInc",type:"adder8",position:{x:-350,y:0},data:{sum:Array(8).fill(0),cout:0}},{id:"pcOne",type:"inputNumber",position:{x:-350,y:400},data:{label:"CONST_1",value:1}},{id:"pcSrcMux",type:"mux8",position:{x:-50,y:420},data:{label:"PC SRC MUX",sel:0,outVal:0,out:Array(8).fill(0)}},{id:"pcJmp",type:"input",position:{x:-200,y:380},data:{label:"PC_JMP",value:0}},{id:"addrMux",type:"mux8",position:{x:550,y:0},data:{label:"ADDR MUX",sel:0,outVal:0,out:Array(8).fill(0)}},{id:"addrSel",type:"input",position:{x:400,y:-50},data:{label:"ADDR_SEL",value:0}},{id:"operand",type:"inputNumber",position:{x:350,y:750},data:{label:"OPERAND",value:0}},{id:"sram",type:"sram8",position:{x:1150,y:0},data:{memory:Array(2048).fill(0),q:Array(8).fill(0),currentAddress:0}},{id:"memWE",type:"input",position:{x:1e3,y:460},data:{label:"MEM_WE",value:0}},{id:"memDisp",type:"outputNumber",position:{x:1180,y:-230},data:{label:"MEM_OUT",value:0}},{id:"ir",type:"register8",position:{x:1750,y:0},data:{label:"IR",value:0,q:Array(8).fill(0),prevClk:0}},{id:"irLoad",type:"input",position:{x:1600,y:310},data:{label:"IR_LOAD",value:1}},{id:"irDisp",type:"outputNumber",position:{x:1780,y:-230},data:{label:"IR",value:0}},{id:"dataMux",type:"mux8",position:{x:1750,y:450},data:{label:"DATA MUX",sel:0,outVal:0,out:Array(8).fill(0)}},{id:"dataSel",type:"input",position:{x:1600,y:410},data:{label:"DATA_SEL",value:0}},{id:"aReg",type:"register8",position:{x:2350,y:0},data:{label:"A (ACC)",value:0,q:Array(8).fill(0),prevClk:0}},{id:"aLoad",type:"input",position:{x:2200,y:310},data:{label:"A_LOAD",value:1}},{id:"aDisp",type:"outputNumber",position:{x:2380,y:-230},data:{label:"A (ACC)",value:0}},{id:"bReg",type:"register8",position:{x:2350,y:600},data:{label:"B",value:0,q:Array(8).fill(0),prevClk:0}},{id:"bLoad",type:"input",position:{x:2200,y:910},data:{label:"B_LOAD",value:0}},{id:"bDisp",type:"outputNumber",position:{x:2380,y:370},data:{label:"B",value:0}},{id:"alu",type:"alu8",position:{x:2950,y:0},data:{a:0,b:0,result:0,r:Array(8).fill(0),zero:0,carry:0,negative:0,opName:"ADD"}},{id:"op0",type:"input",position:{x:2950,y:500},data:{label:"ALU_OP0",value:0}},{id:"op1",type:"input",position:{x:2950,y:590},data:{label:"ALU_OP1",value:0}},{id:"op2",type:"input",position:{x:2950,y:680},data:{label:"ALU_OP2",value:0}},{id:"flagZ",type:"output",position:{x:3350,y:60},data:{label:"ZERO",value:0}},{id:"flagC",type:"output",position:{x:3350,y:180},data:{label:"CARRY",value:0}},{id:"flagN",type:"output",position:{x:3350,y:300},data:{label:"NEG",value:0}},{id:"sp",type:"register8",position:{x:200,y:500},data:{label:"SP",value:255,q:[1,1,1,1,1,1,1,1],prevClk:0}},{id:"spLoad",type:"input",position:{x:50,y:600},data:{label:"SP_LOAD",value:0}},{id:"spDisp",type:"outputNumber",position:{x:200,y:270},data:{label:"SP",value:255}},{id:"aluBMux",type:"mux8",position:{x:2800,y:500},data:{label:"ALU B MUX",sel:0,outVal:0,out:Array(8).fill(0)}},{id:"aluImm",type:"input",position:{x:2650,y:460},data:{label:"ALU_IMM",value:0}},{id:"spOpMux",type:"mux8",position:{x:550,y:430},data:{label:"ADDR B MUX",sel:0,outVal:0,out:Array(8).fill(0)}},{id:"spSel",type:"input",position:{x:400,y:390},data:{label:"SP_SEL",value:0}},{id:"console",type:"console",position:{x:200,y:1300},data:{label:"CONSOLE",text:"",lastChar:0,prevWr:0}},{id:"consoleWr",type:"input",position:{x:50,y:1680},data:{label:"CON_WR",value:0}},{id:"consoleMode",type:"input",position:{x:50,y:1770},data:{label:"CON_MODE",value:0}},{id:"consoleClear",type:"input",position:{x:50,y:1860},data:{label:"CON_CLR",value:0}},{id:"consoleRd",type:"input",position:{x:500,y:1680},data:{label:"CON_RD",value:0}},{id:"plotter",type:"plotter",position:{x:900,y:1300},data:{label:"PLOTTER",pixels:[],prevDraw:0,colorSource:"wires",currentColor:dn}},{id:"plotDraw",type:"input",position:{x:750,y:2100},data:{label:"DRAW",value:0}},{id:"plotClear",type:"input",position:{x:750,y:2190},data:{label:"PLOT_CLR",value:0}},{id:"plotColorR",type:"inputNumber",position:{x:650,y:1300},data:{label:"PLOT_R",value:dn.r}},{id:"plotColorG",type:"inputNumber",position:{x:650,y:1530},data:{label:"PLOT_G",value:dn.g}},{id:"plotColorB",type:"inputNumber",position:{x:650,y:1760},data:{label:"PLOT_B",value:dn.b}},{id:"keyboard",type:"keyboard",position:{x:1400,y:1300},data:{label:"KEYBOARD",keys:[0,0,0,0,0]}},{id:"keyRd",type:"input",position:{x:1650,y:1580},data:{label:"KEY_RD",value:0}},{id:"drive",type:"drive",position:{x:1950,y:1300},data:{label:"EXT DRIVE",bytes:Array(65536).fill(0),q:Array(8).fill(0),currentAddress:0,lastRead:0,lastWrite:0,prevRd:0,prevWr:0}},{id:"driveRd",type:"input",position:{x:2280,y:1790},data:{label:"DRV_RD",value:0}},{id:"driveWr",type:"input",position:{x:1800,y:1790},data:{label:"DRV_WR",value:0}},{id:"driveClear",type:"input",position:{x:1800,y:1880},data:{label:"DRV_CLR",value:0}},{id:"network",type:"network",position:{x:2550,y:1300},data:{label:"NETWORK",method:"GET",url:"https://jsonplaceholder.typicode.com/todos/1",body:'{"title":"foo"}',q:Array(8).fill(0),avail:0,pending:0,responseBuffer:[],requestSerial:0,responseSize:0,lastByte:0,prevGet:0,prevPost:0,prevRd:0}},{id:"netGet",type:"input",position:{x:2400,y:1730},data:{label:"NET_GET",value:0}},{id:"netPost",type:"input",position:{x:2400,y:1820},data:{label:"NET_POST",value:0}},{id:"netRd",type:"input",position:{x:2880,y:1730},data:{label:"NET_RD",value:0}},{id:"netClear",type:"input",position:{x:2400,y:1910},data:{label:"NET_CLR",value:0}},{id:"rst",type:"input",position:{x:1e3,y:550},data:{label:"RST",value:0}}],Y5=[...pt("e-pc-amux-a","pc","addrMux","q","a"),...pt("e-op-spopmux-a","operand","spOpMux","out","a"),...pt("e-sp-spopmux-b","sp","spOpMux","q","b"),...pt("e-spopmux-amux-b","spOpMux","addrMux","out","b"),et("e-spsel","spSel","spOpMux","out","sel"),...pt("e-amux-sram-a","addrMux","sram","out","a"),...pt("e-sram-ir-d","sram","ir","q","d"),et("e-asel","addrSel","addrMux","out","sel"),...pt("e-pc-inc-a","pc","pcInc","q","a"),...pt("e-one-inc-b","pcOne","pcInc","out","b"),...pt("e-inc-pcmux-a","pcInc","pcSrcMux","s","a"),...pt("e-op-pcmux-b","operand","pcSrcMux","out","b"),...pt("e-pcmux-pc-d","pcSrcMux","pc","out","d"),et("e-pcjmp","pcJmp","pcSrcMux","out","sel"),...pt("e-alu-dmux-a","alu","dataMux","r","a"),...pt("e-sram-dmux-b","sram","dataMux","q","b"),...pt("e-dmux-a-d","dataMux","aReg","out","d"),et("e-dsel","dataSel","dataMux","out","sel"),...pt("e-a-alu-a","aReg","alu","q","a"),...pt("e-b-alubmux-a","bReg","aluBMux","q","a"),...pt("e-op-alubmux-b","operand","aluBMux","out","b"),...pt("e-alubmux-alu-b","aluBMux","alu","out","b"),et("e-aluimm","aluImm","aluBMux","out","sel"),et("e-op0","op0","alu","out","op0"),et("e-op1","op1","alu","out","op1"),et("e-op2","op2","alu","out","op2"),...pt("e-a-sram-d","aReg","sram","q","d"),et("e-memwe","memWE","sram","out","we"),...pt("e-sram-b-d","sram","bReg","q","d"),et("e-fz","alu","flagZ","zero","in"),et("e-fc","alu","flagC","carry","in"),et("e-fn","alu","flagN","neg","in"),et("e-clk-pc","clk","pc","out","clk"),et("e-clk-ir","clk","ir","out","clk"),et("e-clk-a","clk","aReg","out","clk"),et("e-clk-b","clk","bReg","out","clk"),et("e-clk-sp","clk","sp","out","clk"),et("e-ld-pc","pcLoad","pc","out","load"),et("e-ld-ir","irLoad","ir","out","load"),et("e-ld-a","aLoad","aReg","out","load"),et("e-ld-b","bLoad","bReg","out","load"),et("e-ld-sp","spLoad","sp","out","load"),et("e-rst-pc","rst","pc","out","rst"),et("e-rst-ir","rst","ir","out","rst"),et("e-rst-a","rst","aReg","out","rst"),et("e-rst-b","rst","bReg","out","rst"),et("e-rst-sp","rst","sp","out","rst"),...pt("e-pc-disp-","pc","pcDisp","q","in"),...pt("e-ir-disp-","ir","irDisp","q","in"),...pt("e-a-disp-","aReg","aDisp","q","in"),...pt("e-b-disp-","bReg","bDisp","q","in"),...pt("e-sp-disp-","sp","spDisp","q","in"),...pt("e-mem-disp-","sram","memDisp","q","in"),...pt("e-a-con-d","aReg","console","q","d"),et("e-con-wr","consoleWr","console","out","wr"),et("e-con-mode","consoleMode","console","out","mode"),et("e-con-clr","consoleClear","console","out","clr"),et("e-con-rd","consoleRd","console","out","rd"),...pt("e-a-plot-x","aReg","plotter","q","x"),...pt("e-b-plot-y","bReg","plotter","q","y"),et("e-plot-draw","plotDraw","plotter","out","draw"),et("e-plot-clr","plotClear","plotter","out","clr"),...pt("e-plot-r-","plotColorR","plotter","out","r"),...pt("e-plot-g-","plotColorG","plotter","out","g"),...pt("e-plot-b-","plotColorB","plotter","out","b"),et("e-key-rd","keyRd","keyboard","out","rd"),...pt("e-a-drive-a","aReg","drive","q","a"),...pt("e-b-drive-d","bReg","drive","q","d"),et("e-drive-rd","driveRd","drive","out","rd"),et("e-drive-wr","driveWr","drive","out","wr"),et("e-drive-clr","driveClear","drive","out","clr"),et("e-net-get","netGet","network","out","get"),et("e-net-post","netPost","network","out","post"),et("e-net-rd","netRd","network","out","rd"),et("e-net-clr","netClear","network","out","clr")],de=(t,a,i,l,o)=>({id:t,source:a,target:i,sourceHandle:l,targetHandle:o,animated:!1,style:{stroke:"#475569",strokeWidth:2}}),Ge=(t,a,i,l,o)=>Array.from({length:8},(c,d)=>({id:`${t}${d}`,source:a,target:i,sourceHandle:`${l}${d}`,targetHandle:`${o}${d}`,animated:!1,style:{stroke:"#475569",strokeWidth:2}})),X5=[{id:"sw_a",type:"input",position:{x:0,y:0},data:{label:"Interrupteur A",value:0}},{id:"sw_b",type:"input",position:{x:0,y:200},data:{label:"Interrupteur B",value:0}},{id:"xor",type:"gate",position:{x:300,y:70},data:{type:"XOR",value:0}},{id:"led",type:"output",position:{x:550,y:85},data:{label:"Lumière",value:0}}],F5=[de("e-swa-xor","sw_a","xor","out","a"),de("e-swb-xor","sw_b","xor","out","b"),de("e-xor-led","xor","led","out","in")],K5=[{id:"bitA",type:"input",position:{x:0,y:50},data:{label:"Bit A",value:0}},{id:"bitB",type:"input",position:{x:0,y:250},data:{label:"Bit B",value:0}},{id:"xor",type:"gate",position:{x:300,y:20},data:{type:"XOR",value:0}},{id:"and",type:"gate",position:{x:300,y:200},data:{type:"AND",value:0}},{id:"somme",type:"output",position:{x:550,y:35},data:{label:"Somme (S)",value:0}},{id:"retenue",type:"output",position:{x:550,y:215},data:{label:"Retenue (C)",value:0}}],W5=[de("e-a-xor","bitA","xor","out","a"),de("e-b-xor","bitB","xor","out","b"),de("e-a-and","bitA","and","out","a"),de("e-b-and","bitB","and","out","b"),de("e-xor-s","xor","somme","out","in"),de("e-and-c","and","retenue","out","in")],Q5=[{id:"set_sw",type:"input",position:{x:0,y:0},data:{label:"SET (mémoriser 1)",value:0}},{id:"rst_sw",type:"input",position:{x:0,y:250},data:{label:"RESET (mémoriser 0)",value:0}},{id:"nor1",type:"gate",position:{x:350,y:220},data:{type:"NOR",value:1}},{id:"nor2",type:"gate",position:{x:350,y:30},data:{type:"NOR",value:0}},{id:"q_led",type:"output",position:{x:620,y:235},data:{label:"Q (valeur mémorisée)",value:0}},{id:"qbar_led",type:"output",position:{x:620,y:45},data:{label:"Q̄ (inverse)",value:0}}],eE=[de("e-rst-nor1","rst_sw","nor1","out","a"),de("e-nor2-nor1","nor2","nor1","out","b"),de("e-set-nor2","set_sw","nor2","out","a"),de("e-nor1-nor2","nor1","nor2","out","b"),de("e-nor1-qled","nor1","q_led","out","in"),de("e-nor2-qbarled","nor2","qbar_led","out","in")],tE=[{id:"numIn",type:"inputNumber",position:{x:0,y:150},data:{label:"Nombre (0-255)",value:42}},...Array.from({length:8},(t,a)=>({id:`led${a}`,type:"output",position:{x:400,y:a*70},data:{label:`Bit ${a}  (= ${1<<a})`,value:0}}))],nE=Array.from({length:8},(t,a)=>de(`e-num-led${a}`,"numIn",`led${a}`,`out${a}`,"in")),aE=[{id:"vcc",type:"input",position:{x:0,y:260},data:{label:"VCC = 1",value:1}},{id:"bufA",type:"input",position:{x:0,y:0},data:{label:"A (buffer)",value:0}},{id:"tBuf",type:"transistor",position:{x:260,y:20},data:{label:"T1",mode:"nmos",value:0,inputValue:0,conducting:0}},{id:"bufOut",type:"output",position:{x:520,y:35},data:{label:"Sortie = A",value:0}},{id:"andA",type:"input",position:{x:0,y:420},data:{label:"A (AND)",value:0}},{id:"andB",type:"input",position:{x:0,y:560},data:{label:"B (AND)",value:0}},{id:"tAnd1",type:"transistor",position:{x:260,y:390},data:{label:"T2",mode:"nmos",value:0,inputValue:0,conducting:0}},{id:"tAnd2",type:"transistor",position:{x:520,y:390},data:{label:"T3",mode:"nmos",value:0,inputValue:0,conducting:0}},{id:"andOut",type:"output",position:{x:780,y:405},data:{label:"A AND B",value:0}},{id:"orA",type:"input",position:{x:980,y:420},data:{label:"A (OR)",value:0}},{id:"orB",type:"input",position:{x:980,y:560},data:{label:"B (OR)",value:0}},{id:"tOr1",type:"transistor",position:{x:1240,y:390},data:{label:"T4",mode:"nmos",value:0,inputValue:0,conducting:0}},{id:"tOr2",type:"transistor",position:{x:1240,y:550},data:{label:"T5",mode:"nmos",value:0,inputValue:0,conducting:0}},{id:"orOut",type:"output",position:{x:1500,y:470},data:{label:"A OR B",value:0}}],iE=[de("e-vcc-buf","vcc","tBuf","out","in"),de("e-bufa-tbuf","bufA","tBuf","out","gate"),de("e-tbuf-out","tBuf","bufOut","out","in"),de("e-vcc-and1","vcc","tAnd1","out","in"),de("e-anda-t1","andA","tAnd1","out","gate"),de("e-tand1-tand2","tAnd1","tAnd2","out","in"),de("e-andb-t2","andB","tAnd2","out","gate"),de("e-tand2-out","tAnd2","andOut","out","in"),de("e-vcc-or1","vcc","tOr1","out","in"),de("e-vcc-or2","vcc","tOr2","out","in"),de("e-ora-t1","orA","tOr1","out","gate"),de("e-orb-t2","orB","tOr2","out","gate"),de("e-tor1-out","tOr1","orOut","out","in"),de("e-tor2-out","tOr2","orOut","out","in")],rE=[{id:"vcc",type:"input",position:{x:0,y:260},data:{label:"VCC = 1",value:1}},{id:"gnd",type:"input",position:{x:0,y:360},data:{label:"GND = 0",value:0}},{id:"nandA",type:"input",position:{x:0,y:0},data:{label:"A (NAND)",value:0}},{id:"nandB",type:"input",position:{x:0,y:120},data:{label:"B (NAND)",value:0}},{id:"nandP1",type:"transistor",position:{x:250,y:-30},data:{label:"P1",mode:"pmos",value:0,inputValue:0,conducting:0}},{id:"nandP2",type:"transistor",position:{x:250,y:110},data:{label:"P2",mode:"pmos",value:0,inputValue:0,conducting:0}},{id:"nandN1",type:"transistor",position:{x:520,y:-30},data:{label:"N1",mode:"nmos",value:0,inputValue:0,conducting:0}},{id:"nandN2",type:"transistor",position:{x:760,y:-30},data:{label:"N2",mode:"nmos",value:0,inputValue:0,conducting:0}},{id:"nandOut",type:"output",position:{x:1020,y:40},data:{label:"NAND",value:0}},{id:"xorA",type:"input",position:{x:0,y:640},data:{label:"A (XOR)",value:0}},{id:"xorB",type:"input",position:{x:0,y:760},data:{label:"B (XOR)",value:0}},{id:"invAP",type:"transistor",position:{x:250,y:560},data:{label:"P3",mode:"pmos",value:0,inputValue:0,conducting:0}},{id:"invAN",type:"transistor",position:{x:250,y:700},data:{label:"N3",mode:"nmos",value:0,inputValue:0,conducting:0}},{id:"notAProbe",type:"output",position:{x:500,y:615},data:{label:"NOT A",value:0}},{id:"invBP",type:"transistor",position:{x:250,y:900},data:{label:"P4",mode:"pmos",value:0,inputValue:0,conducting:0}},{id:"invBN",type:"transistor",position:{x:250,y:1040},data:{label:"N4",mode:"nmos",value:0,inputValue:0,conducting:0}},{id:"notBProbe",type:"output",position:{x:500,y:955},data:{label:"NOT B",value:0}},{id:"xorUp1a",type:"transistor",position:{x:760,y:560},data:{label:"N5",mode:"nmos",value:0,inputValue:0,conducting:0}},{id:"xorUp1b",type:"transistor",position:{x:1e3,y:560},data:{label:"N6",mode:"nmos",value:0,inputValue:0,conducting:0}},{id:"xorUp2a",type:"transistor",position:{x:760,y:740},data:{label:"N7",mode:"nmos",value:0,inputValue:0,conducting:0}},{id:"xorUp2b",type:"transistor",position:{x:1e3,y:740},data:{label:"N8",mode:"nmos",value:0,inputValue:0,conducting:0}},{id:"xorDown1a",type:"transistor",position:{x:760,y:940},data:{label:"N9",mode:"nmos",value:0,inputValue:0,conducting:0}},{id:"xorDown1b",type:"transistor",position:{x:1e3,y:940},data:{label:"N10",mode:"nmos",value:0,inputValue:0,conducting:0}},{id:"xorDown2a",type:"transistor",position:{x:760,y:1120},data:{label:"N11",mode:"nmos",value:0,inputValue:0,conducting:0}},{id:"xorDown2b",type:"transistor",position:{x:1e3,y:1120},data:{label:"N12",mode:"nmos",value:0,inputValue:0,conducting:0}},{id:"xorOut",type:"output",position:{x:1300,y:820},data:{label:"XOR",value:0}}],lE=[de("e-vcc-nand-p1","vcc","nandP1","out","in"),de("e-vcc-nand-p2","vcc","nandP2","out","in"),de("e-nanda-p1","nandA","nandP1","out","gate"),de("e-nandb-p2","nandB","nandP2","out","gate"),de("e-nandp1-out","nandP1","nandOut","out","in"),de("e-nandp2-out","nandP2","nandOut","out","in"),de("e-gnd-nand-n1","gnd","nandN1","out","in"),de("e-nanda-n1","nandA","nandN1","out","gate"),de("e-nandn1-n2","nandN1","nandN2","out","in"),de("e-nandb-n2","nandB","nandN2","out","gate"),de("e-nandn2-out","nandN2","nandOut","out","in"),de("e-vcc-invap","vcc","invAP","out","in"),de("e-gnd-invan","gnd","invAN","out","in"),de("e-xora-invap","xorA","invAP","out","gate"),de("e-xora-invan","xorA","invAN","out","gate"),de("e-invap-nota","invAP","notAProbe","out","in"),de("e-invan-nota","invAN","notAProbe","out","in"),de("e-vcc-invbp","vcc","invBP","out","in"),de("e-gnd-invbn","gnd","invBN","out","in"),de("e-xorb-invbp","xorB","invBP","out","gate"),de("e-xorb-invbn","xorB","invBN","out","gate"),de("e-invbp-notb","invBP","notBProbe","out","in"),de("e-invbn-notb","invBN","notBProbe","out","in"),de("e-vcc-xup1a","vcc","xorUp1a","out","in"),de("e-xora-xup1a","xorA","xorUp1a","out","gate"),de("e-xup1a-xup1b","xorUp1a","xorUp1b","out","in"),de("e-invbp-xup1b","invBP","xorUp1b","out","gate"),de("e-invbn-xup1b","invBN","xorUp1b","out","gate"),de("e-xup1b-xorout","xorUp1b","xorOut","out","in"),de("e-vcc-xup2a","vcc","xorUp2a","out","in"),de("e-invap-xup2a","invAP","xorUp2a","out","gate"),de("e-invan-xup2a","invAN","xorUp2a","out","gate"),de("e-xup2a-xup2b","xorUp2a","xorUp2b","out","in"),de("e-xorb-xup2b","xorB","xorUp2b","out","gate"),de("e-xup2b-xorout","xorUp2b","xorOut","out","in"),de("e-gnd-xdown1a","gnd","xorDown1a","out","in"),de("e-xora-xdown1a","xorA","xorDown1a","out","gate"),de("e-xdown1a-xdown1b","xorDown1a","xorDown1b","out","in"),de("e-xorb-xdown1b","xorB","xorDown1b","out","gate"),de("e-xdown1b-xorout","xorDown1b","xorOut","out","in"),de("e-gnd-xdown2a","gnd","xorDown2a","out","in"),de("e-invap-xdown2a","invAP","xorDown2a","out","gate"),de("e-invan-xdown2a","invAN","xorDown2a","out","gate"),de("e-xdown2a-xdown2b","xorDown2a","xorDown2b","out","in"),de("e-invbp-xdown2b","invBP","xorDown2b","out","gate"),de("e-invbn-xdown2b","invBN","xorDown2b","out","gate"),de("e-xdown2b-xorout","xorDown2b","xorOut","out","in")],sE=[{id:"numA",type:"inputNumber",position:{x:0,y:0},data:{label:"Nombre A",value:0}},{id:"numB",type:"inputNumber",position:{x:0,y:350},data:{label:"Nombre B",value:0}},{id:"add",type:"adder8",position:{x:400,y:80},data:{sum:[0,0,0,0,0,0,0,0],cout:0}},{id:"res",type:"outputNumber",position:{x:750,y:100},data:{label:"Résultat (A+B)",value:0}},{id:"carry",type:"output",position:{x:750,y:350},data:{label:"Retenue (dépassement)",value:0}}],oE=[...Ge("e-a-add-","numA","add","out","a"),...Ge("e-b-add-","numB","add","out","b"),...Ge("e-add-res-","add","res","s","in"),de("e-add-carry","add","carry","cout","in")],cE=[{id:"numA",type:"inputNumber",position:{x:0,y:0},data:{label:"Nombre A",value:5}},{id:"numB",type:"inputNumber",position:{x:0,y:350},data:{label:"Nombre B",value:5}},{id:"alu",type:"alu8",position:{x:450,y:50},data:{a:0,b:0,result:0,r:[0,0,0,0,0,0,0,0],zero:0,carry:0,negative:0,opName:"SUB"}},{id:"op0",type:"input",position:{x:250,y:550},data:{label:"OP0 = 1 (SUB)",value:1}},{id:"op1",type:"input",position:{x:370,y:550},data:{label:"OP1 = 0",value:0}},{id:"op2",type:"input",position:{x:490,y:550},data:{label:"OP2 = 0",value:0}},{id:"diffDisp",type:"outputNumber",position:{x:800,y:50},data:{label:"A − B",value:0}},{id:"equalLed",type:"output",position:{x:800,y:300},data:{label:"Égal ? (flag Zéro)",value:0}},{id:"negLed",type:"output",position:{x:800,y:400},data:{label:"A < B ? (flag Négatif)",value:0}}],uE=[...Ge("e-a-alu-","numA","alu","out","a"),...Ge("e-b-alu-","numB","alu","out","b"),de("e-op0-alu","op0","alu","out","op0"),de("e-op1-alu","op1","alu","out","op1"),de("e-op2-alu","op2","alu","out","op2"),...Ge("e-alu-diff-","alu","diffDisp","r","in"),de("e-alu-eq","alu","equalLed","zero","in"),de("e-alu-neg","alu","negLed","neg","in")],dE=[{id:"numA",type:"inputNumber",position:{x:0,y:0},data:{label:"Nombre A",value:12}},{id:"numB",type:"inputNumber",position:{x:0,y:350},data:{label:"Nombre B",value:7}},{id:"alu",type:"alu8",position:{x:450,y:50},data:{a:0,b:0,result:0,r:[0,0,0,0,0,0,0,0],zero:0,carry:0,negative:0,opName:"ADD"}},{id:"op0",type:"input",position:{x:200,y:550},data:{label:"OP0 (bit 0)",value:0}},{id:"op1",type:"input",position:{x:340,y:550},data:{label:"OP1 (bit 1)",value:0}},{id:"op2",type:"input",position:{x:480,y:550},data:{label:"OP2 (bit 2)",value:0}},{id:"result",type:"outputNumber",position:{x:800,y:50},data:{label:"Résultat",value:0}},{id:"zeroLed",type:"output",position:{x:800,y:280},data:{label:"Flag Zéro",value:0}},{id:"carryLed",type:"output",position:{x:800,y:370},data:{label:"Flag Retenue",value:0}},{id:"negLed",type:"output",position:{x:800,y:460},data:{label:"Flag Négatif",value:0}}],fE=[...Ge("e-a-alu-","numA","alu","out","a"),...Ge("e-b-alu-","numB","alu","out","b"),de("e-op0","op0","alu","out","op0"),de("e-op1","op1","alu","out","op1"),de("e-op2","op2","alu","out","op2"),...Ge("e-alu-res-","alu","result","r","in"),de("e-alu-z","alu","zeroLed","zero","in"),de("e-alu-c","alu","carryLed","carry","in"),de("e-alu-n","alu","negLed","neg","in")],pE=[{id:"srcA",type:"inputNumber",position:{x:0,y:0},data:{label:"Source A",value:42}},{id:"srcB",type:"inputNumber",position:{x:0,y:350},data:{label:"Source B",value:99}},{id:"sel",type:"input",position:{x:250,y:500},data:{label:"Aiguillage (0=A, 1=B)",value:0}},{id:"mux",type:"mux8",position:{x:400,y:80},data:{label:"MUX",sel:0,outVal:0,out:[0,0,0,0,0,0,0,0]}},{id:"out",type:"outputNumber",position:{x:750,y:120},data:{label:"Sortie",value:0}}],mE=[...Ge("e-a-mux-","srcA","mux","out","a"),...Ge("e-b-mux-","srcB","mux","out","b"),de("e-sel-mux","sel","mux","out","sel"),...Ge("e-mux-out-","mux","out","out","in")],hE=[{id:"clk",type:"clock",position:{x:50,y:-100},data:{label:"Horloge",value:0,frequency:1,tickCounter:0}},{id:"load",type:"input",position:{x:50,y:120},data:{label:"Charger = 1",value:1}},{id:"rst",type:"input",position:{x:50,y:230},data:{label:"Reset",value:0}},{id:"reg",type:"register8",position:{x:250,y:30},data:{label:"Accumulateur",value:0,q:[0,0,0,0,0,0,0,0],prevClk:0}},{id:"alu",type:"alu8",position:{x:600,y:0},data:{a:0,b:0,result:0,r:[0,0,0,0,0,0,0,0],zero:0,carry:0,negative:0,opName:"ADD"}},{id:"step",type:"inputNumber",position:{x:400,y:350},data:{label:"Pas (+N)",value:3}},{id:"display",type:"outputNumber",position:{x:950,y:60},data:{label:"Valeur",value:0}}],xE=[de("e-clk-reg","clk","reg","out","clk"),de("e-load-reg","load","reg","out","load"),de("e-rst-reg","rst","reg","out","rst"),...Ge("e-reg-alu-a-","reg","alu","q","a"),...Ge("e-step-alu-b-","step","alu","out","b"),...Ge("e-alu-reg-d-","alu","reg","r","d"),...Ge("e-reg-disp-","reg","display","q","in")],Tb=Array(1024).fill(0);[1,1,2,3,5,8,13,21,34,55,89,144,233].forEach((t,a)=>{Tb[a]=t});const gE=[{id:"clk",type:"clock",position:{x:50,y:-120},data:{label:"Horloge",value:0,frequency:1,tickCounter:0}},{id:"pc",type:"register8",position:{x:250,y:50},data:{label:"Compteur (PC)",value:0,q:[0,0,0,0,0,0,0,0],prevClk:0}},{id:"pcLoad",type:"input",position:{x:50,y:130},data:{label:"Charger = 1",value:1}},{id:"rst",type:"input",position:{x:50,y:230},data:{label:"Reset",value:0}},{id:"pcInc",type:"adder8",position:{x:250,y:380},data:{sum:[0,0,0,0,0,0,0,0],cout:0}},{id:"one",type:"inputNumber",position:{x:-80,y:430},data:{label:"Constante 1",value:1}},{id:"addrDisp",type:"outputNumber",position:{x:550,y:380},data:{label:"Adresse actuelle",value:0}},{id:"sram",type:"sram8",position:{x:600,y:0},data:{memory:[...Tb],q:[0,0,0,0,0,0,0,0],currentAddress:0}},{id:"output",type:"outputNumber",position:{x:950,y:100},data:{label:"Valeur lue",value:0}}],_E=[de("e-clk-pc","clk","pc","out","clk"),de("e-load-pc","pcLoad","pc","out","load"),de("e-rst-pc","rst","pc","out","rst"),...Ge("e-pc-sram-","pc","sram","q","a"),...Ge("e-sram-out-","sram","output","q","in"),...Ge("e-pc-inc-a-","pc","pcInc","q","a"),...Ge("e-one-inc-b-","one","pcInc","out","b"),...Ge("e-inc-pc-d-","pcInc","pc","s","d"),...Ge("e-pc-addr-","pc","addrDisp","q","in")],bE=[{id:"addr",type:"inputNumber",position:{x:0,y:0},data:{label:"Adresse (0-255)",value:0}},{id:"dataIn",type:"inputNumber",position:{x:0,y:300},data:{label:"Donnée à écrire",value:42}},{id:"we",type:"input",position:{x:300,y:480},data:{label:"Écriture (WE)",value:0}},{id:"sram",type:"sram8",position:{x:450,y:0},data:{memory:Array(1024).fill(0),q:[0,0,0,0,0,0,0,0],currentAddress:0}},{id:"readOut",type:"outputNumber",position:{x:800,y:100},data:{label:"Valeur lue",value:0}}],yE=[...Ge("e-addr-sram-","addr","sram","out","a"),...Ge("e-data-sram-","dataIn","sram","out","d"),de("e-we-sram","we","sram","out","we"),...Ge("e-sram-read-","sram","readOut","q","in")],Mb=Array(1024).fill(0);[72,101,108,108,111,32,87,111,114,108,100,33,10].forEach((t,a)=>{Mb[a]=t});const vE=[{id:"clk",type:"clock",position:{x:50,y:-80},data:{label:"Horloge",value:0,frequency:2,tickCounter:0}},{id:"pc",type:"register8",position:{x:250,y:20},data:{label:"Compteur (PC)",value:0,q:[0,0,0,0,0,0,0,0],prevClk:0}},{id:"pcLoad",type:"input",position:{x:50,y:110},data:{label:"Charger = 1",value:1}},{id:"rst",type:"input",position:{x:50,y:220},data:{label:"Reset",value:0}},{id:"pcInc",type:"adder8",position:{x:250,y:320},data:{sum:[0,0,0,0,0,0,0,0],cout:0}},{id:"one",type:"inputNumber",position:{x:0,y:400},data:{label:"Constante 1",value:1}},{id:"sram",type:"sram8",position:{x:600,y:0},data:{memory:[...Mb],q:[0,0,0,0,0,0,0,0],currentAddress:0}},{id:"addrDisp",type:"outputNumber",position:{x:550,y:350},data:{label:"Adresse",value:0}},{id:"charDisp",type:"outputNumber",position:{x:900,y:350},data:{label:"Code ASCII",value:0}},{id:"console",type:"console",position:{x:1e3,y:0},data:{label:"CONSOLE",text:"",lastChar:0,prevWr:0}},{id:"clr",type:"input",position:{x:900,y:450},data:{label:"Effacer écran",value:0}}],AE=[de("e-clk-pc","clk","pc","out","clk"),de("e-load-pc","pcLoad","pc","out","load"),de("e-rst-pc","rst","pc","out","rst"),...Ge("e-pc-inc-a-","pc","pcInc","q","a"),...Ge("e-one-inc-b-","one","pcInc","out","b"),...Ge("e-inc-pc-d-","pcInc","pc","s","d"),...Ge("e-pc-sram-","pc","sram","q","a"),...Ge("e-sram-con-","sram","console","q","d"),de("e-clk-wr","clk","console","out","wr"),de("e-clr-con","clr","console","out","clr"),...Ge("e-pc-addr-","pc","addrDisp","q","in"),...Ge("e-sram-char-","sram","charDisp","q","in")],LE=[{id:"console",type:"console",position:{x:0,y:0},data:{label:"CLAVIER",text:"",lastChar:0,prevWr:0}},{id:"clk",type:"clock",position:{x:350,y:-120},data:{label:"Horloge",value:0,frequency:2,tickCounter:0}},{id:"pc",type:"register8",position:{x:500,y:30},data:{label:"Adresse d'écriture (PC)",value:0,q:[0,0,0,0,0,0,0,0],prevClk:0}},{id:"rst",type:"input",position:{x:350,y:220},data:{label:"Reset",value:0}},{id:"pcInc",type:"adder8",position:{x:500,y:340},data:{sum:[0,0,0,0,0,0,0,0],cout:0}},{id:"one",type:"inputNumber",position:{x:300,y:420},data:{label:"Constante 1",value:1}},{id:"sram",type:"sram8",position:{x:850,y:0},data:{memory:Array(1024).fill(0),q:[0,0,0,0,0,0,0,0],currentAddress:0}},{id:"addrDisp",type:"outputNumber",position:{x:750,y:370},data:{label:"Adresse",value:0}},{id:"charDisp",type:"outputNumber",position:{x:1150,y:370},data:{label:"Dernier char écrit",value:0}},{id:"availLed",type:"output",position:{x:350,y:120},data:{label:"Caractère dispo ?",value:0}}],wE=[de("e-clk-pc","clk","pc","out","clk"),de("e-clk-rd","clk","console","out","rd"),de("e-avail-load","console","pc","avail","load"),de("e-avail-we","console","sram","avail","we"),de("e-avail-led","console","availLed","avail","in"),de("e-rst-pc","rst","pc","out","rst"),...Ge("e-pc-inc-a-","pc","pcInc","q","a"),...Ge("e-one-inc-b-","one","pcInc","out","b"),...Ge("e-inc-pc-d-","pcInc","pc","s","d"),...Ge("e-pc-sram-a-","pc","sram","q","a"),...Ge("e-con-sram-d-","console","sram","q","d"),...Ge("e-pc-addr-","pc","addrDisp","q","in"),...Ge("e-sram-char-","sram","charDisp","q","in")],DE=[{id:"clk",type:"clock",position:{x:50,y:-80},data:{label:"Horloge",value:0,frequency:10,tickCounter:0}},{id:"load",type:"input",position:{x:50,y:110},data:{label:"Charger = 1",value:1}},{id:"rst",type:"input",position:{x:50,y:220},data:{label:"Reset",value:0}},{id:"counter",type:"register8",position:{x:250,y:20},data:{label:"Compteur (X = Y)",value:0,q:[0,0,0,0,0,0,0,0],prevClk:0}},{id:"inc",type:"adder8",position:{x:250,y:320},data:{sum:[0,0,0,0,0,0,0,0],cout:0}},{id:"one",type:"inputNumber",position:{x:0,y:400},data:{label:"Constante 1",value:1}},{id:"disp",type:"outputNumber",position:{x:550,y:350},data:{label:"Position (X = Y)",value:0}},{id:"clr",type:"input",position:{x:550,y:450},data:{label:"Effacer écran",value:0}},{id:"plotter",type:"plotter",position:{x:650,y:0},data:{label:"PLOTTER",pixels:[],prevDraw:0,colorSource:"wires",currentColor:dn}},{id:"red",type:"inputNumber",position:{x:340,y:-10},data:{label:"Rouge",value:dn.r}},{id:"green",type:"inputNumber",position:{x:340,y:170},data:{label:"Vert",value:dn.g}},{id:"blue",type:"inputNumber",position:{x:340,y:350},data:{label:"Bleu",value:dn.b}}],CE=[de("e-clk-ctr","clk","counter","out","clk"),de("e-load-ctr","load","counter","out","load"),de("e-rst-ctr","rst","counter","out","rst"),...Ge("e-ctr-inc-a-","counter","inc","q","a"),...Ge("e-one-inc-b-","one","inc","out","b"),...Ge("e-inc-ctr-d-","inc","counter","s","d"),...Ge("e-ctr-plot-x-","counter","plotter","q","x"),...Ge("e-ctr-plot-y-","counter","plotter","q","y"),de("e-clk-draw","clk","plotter","out","draw"),de("e-clr-plot","clr","plotter","out","clr"),...Ge("e-red-plot-","red","plotter","out","r"),...Ge("e-green-plot-","green","plotter","out","g"),...Ge("e-blue-plot-","blue","plotter","out","b"),...Ge("e-ctr-disp-","counter","disp","q","in")],SE=[{id:"conIn",type:"console",position:{x:0,y:50},data:{label:"CLAVIER",text:"",lastChar:0,prevWr:0,prevRd:0,inputBuffer:[],q:[0,0,0,0,0,0,0,0],avail:0,inputBufferSize:0}},{id:"conOut",type:"console",position:{x:800,y:50},data:{label:"ÉCRAN (majuscules)",text:"",lastChar:0,prevWr:0,prevRd:0,inputBuffer:[],q:[0,0,0,0,0,0,0,0],avail:0,inputBufferSize:0}},{id:"clk",type:"clock",position:{x:300,y:-100},data:{label:"Horloge",value:0,frequency:2,tickCounter:0}},{id:"notClk",type:"gate",position:{x:550,y:-100},data:{type:"NOT",value:0}},{id:"andRd",type:"gate",position:{x:300,y:100},data:{type:"AND",value:0}},{id:"latch",type:"register8",position:{x:380,y:300},data:{label:"Latch (mémorise avail)",value:0,q:[0,0,0,0,0,0,0,0],prevClk:0}},{id:"andWr",type:"gate",position:{x:620,y:200},data:{type:"AND",value:0}},{id:"const0",type:"input",position:{x:620,y:400},data:{label:"Const 0 (bit5 = MAJ)",value:0}},{id:"const1",type:"input",position:{x:200,y:420},data:{label:"Const 1 (load=on)",value:1}},{id:"availLed",type:"output",position:{x:300,y:0},data:{label:"Char dispo ?",value:0}},{id:"charDisp",type:"outputNumber",position:{x:620,y:-10},data:{label:"Char lu (ASCII)",value:0}}],NE=[de("e-clk-andRd-a","clk","andRd","out","a"),de("e-clk-not","clk","notClk","out","in"),de("e-clk-latch","clk","latch","out","clk"),de("e-avail-andRd-b","conIn","andRd","avail","b"),de("e-andRd-rd","andRd","conIn","out","rd"),de("e-avail-latch-d0","conIn","latch","avail","d0"),de("e-const1-latch-load","const1","latch","out","load"),de("e-not-andWr-a","notClk","andWr","out","a"),de("e-latch-andWr-b","latch","andWr","q0","b"),de("e-andWr-wr","andWr","conOut","out","wr"),de("e-q0-d0","conIn","conOut","q0","d0"),de("e-q1-d1","conIn","conOut","q1","d1"),de("e-q2-d2","conIn","conOut","q2","d2"),de("e-q3-d3","conIn","conOut","q3","d3"),de("e-q4-d4","conIn","conOut","q4","d4"),de("e-const0-d5","const0","conOut","out","d5"),de("e-q6-d6","conIn","conOut","q6","d6"),de("e-q7-d7","conIn","conOut","q7","d7"),de("e-const0-mode","const0","conOut","out","mode"),de("e-avail-led","conIn","availLed","avail","in"),...Ge("e-q-disp-","conIn","charDisp","q","in")],Q0=[{id:"__builtin_vaevient",name:"1. Va-et-vient",nodes:X5,edges:F5,builtIn:!0,level:"basics"},{id:"__builtin_transistors",name:"2. Transistors → portes",nodes:aE,edges:iE,builtIn:!0,level:"basics"},{id:"__builtin_transistors_advanced",name:"3. NAND et XOR (transistors)",nodes:rE,edges:lE,builtIn:!0,level:"basics"},{id:"__builtin_binaire",name:"4. Binaire visuel",nodes:tE,edges:nE,builtIn:!0,level:"basics"},{id:"__builtin_halfadder",name:"5. Demi-additionneur",nodes:K5,edges:W5,builtIn:!0,level:"basics"},{id:"__builtin_srlatch",name:"6. Mémoire 1-bit",nodes:Q5,edges:eE,builtIn:!0,level:"basics"},{id:"__builtin_additionneur",name:"7. Additionneur 8 bits",nodes:sE,edges:oE,builtIn:!0,level:"components"},{id:"__builtin_comparateur",name:"8. Comparateur",nodes:cE,edges:uE,builtIn:!0,level:"components"},{id:"__builtin_calculatrice",name:"9. Calculatrice",nodes:dE,edges:fE,builtIn:!0,level:"components"},{id:"__builtin_mux",name:"10. Multiplexeur",nodes:pE,edges:mE,builtIn:!0,level:"components"},{id:"__builtin_accumulateur",name:"11. Accumulateur",nodes:hE,edges:xE,builtIn:!0,level:"systems"},{id:"__builtin_lecture_mem",name:"12. Lecture mémoire",nodes:gE,edges:_E,builtIn:!0,level:"systems"},{id:"__builtin_rw_mem",name:"13. Écriture mémoire",nodes:bE,edges:yE,builtIn:!0,level:"systems"},{id:"__builtin_hello",name:"14. Hello World",nodes:vE,edges:AE,builtIn:!0,level:"systems"},{id:"__builtin_console_to_mem",name:"15. Clavier → Mémoire",nodes:LE,edges:wE,builtIn:!0,level:"systems"},{id:"__builtin_plotter",name:"16. Dessin (Plotter)",nodes:DE,edges:CE,builtIn:!0,level:"systems"},{id:"__builtin_majuscules",name:"17. Majuscules",nodes:SE,edges:NE,builtIn:!0,level:"systems"},{id:"__builtin_cpu8",name:"18. CPU 8-bit (complet)",nodes:G5,edges:Y5,builtIn:!0,level:"computer"},{id:"__builtin_empty",name:"Vide (canvas libre)",nodes:[],edges:[],builtIn:!0,level:"free"}],E0=Q0.find(t=>t.id==="__builtin_vaevient")??Q0[0];function TE(t){const a=t.replace(/\r\n/g,`
`).split(`
`),i=[],l=[];let o=0;const c=()=>{l.length!==0&&(i.push({type:"paragraph",text:l.join(" ").trim()}),l.length=0)};for(;o<a.length;){const m=a[o].trim();if(!m){c(),o+=1;continue}if(m.startsWith("```")){c();const g=m.slice(3).trim(),v=[];for(o+=1;o<a.length&&!a[o].trim().startsWith("```");)v.push(a[o]),o+=1;o<a.length&&(o+=1),i.push({type:"code",language:g,text:v.join(`
`)});continue}if(/^---+$/.test(m)){c(),i.push({type:"hr"}),o+=1;continue}const x=m.match(/^(#{1,3})\s+(.*)$/);if(x){c(),i.push({type:"heading",level:x[1].length,text:x[2].trim()}),o+=1;continue}if(m.match(/^-\s+(.*)$/)){c();const g=[];for(;o<a.length;){const v=a[o].trim().match(/^-\s+(.*)$/);if(!v)break;g.push(v[1].trim()),o+=1}i.push({type:"ul",items:g});continue}if(m.match(/^\d+\.\s+(.*)$/)){c();const g=[];for(;o<a.length;){const v=a[o].trim().match(/^\d+\.\s+(.*)$/);if(!v)break;g.push(v[1].trim()),o+=1}i.push({type:"ol",items:g});continue}l.push(m),o+=1}return c(),i}function Gx(t){const a=/\[.*?\]\(.*?\)|`[^`]+`|\*\*[^*]+\*\*/g,i=[];let l=0,o;for(;(o=a.exec(t))!==null;){o.index>l&&i.push(t.slice(l,o.index));const c=o[0],d=c.match(/^\[(.*?)\]\((.*?)\)$/);d?i.push(u.jsx("a",{href:d[2],target:"_blank",rel:"noreferrer",className:"text-sky-300 underline decoration-sky-500/40 underline-offset-2 hover:text-sky-200",children:d[1]},`${o.index}-${c}`)):c.startsWith("`")?i.push(u.jsx("code",{className:"rounded bg-slate-900/90 px-1.5 py-0.5 text-[0.92em] text-cyan-200",children:c.slice(1,-1)},`${o.index}-${c}`)):i.push(u.jsx("strong",{className:"font-semibold text-white",children:c.slice(2,-2)},`${o.index}-${c}`)),l=o.index+c.length}return l<t.length&&i.push(t.slice(l)),i}function Yx({markdown:t,title:a,subtitle:i}){const{messages:l}=Ot(),o=TE(t);return u.jsxs("div",{className:"flex-1 overflow-hidden bg-slate-950",children:[u.jsxs("div",{className:"border-b border-slate-800 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.22),_transparent_45%),linear-gradient(180deg,rgba(15,23,42,0.98),rgba(2,6,23,0.98))] px-8 py-6",children:[u.jsx("div",{className:"text-xs font-semibold uppercase tracking-[0.28em] text-sky-300/80",children:l.embeddedGuide.builtInGuide}),u.jsx("h1",{className:"mt-2 text-3xl font-black tracking-tight text-white",children:a}),u.jsx("p",{className:"mt-2 max-w-3xl text-sm leading-6 text-slate-300",children:i})]}),u.jsx("div",{className:"h-full overflow-y-auto px-8 py-8",children:u.jsx("article",{className:"mx-auto flex max-w-4xl flex-col gap-4 pb-24",children:o.map((c,d)=>{if(c.type==="heading")return c.level===1?u.jsx("h1",{className:"text-3xl font-black tracking-tight text-white",children:c.text},d):c.level===2?u.jsx("h2",{className:"mt-6 text-xl font-bold tracking-tight text-sky-100",children:c.text},d):u.jsx("h3",{className:"mt-4 text-base font-bold text-slate-100",children:c.text},d);if(c.type==="paragraph")return u.jsx("p",{className:"leading-7 text-slate-300",children:Gx(c.text)},d);if(c.type==="code")return u.jsxs("div",{className:"overflow-x-auto rounded-2xl border border-slate-700 bg-slate-950/90",children:[c.language?u.jsx("div",{className:"border-b border-slate-800 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400",children:c.language}):null,u.jsx("pre",{className:"p-4 text-sm leading-6 text-slate-100",children:u.jsx("code",{children:c.text})})]},d);if(c.type==="hr")return u.jsx("div",{className:"my-2 border-t border-slate-800"},d);const m=c.type==="ol"?"ol":"ul";return u.jsx(m,{className:`space-y-2 pl-6 leading-7 text-slate-300 ${c.type==="ol"?"list-decimal":"list-disc"}`,children:c.items.map((x,h)=>u.jsx("li",{children:Gx(x)},h))},d)})})})]})}const ME=`# Easy User Guide

French copy: \`docs/userguide.fr.md\`

This app is a complete, understandable computer playground.

It lets you explore computing from the bottom to the top:

- from **transistors**
- to **logic gates**
- to an **8-bit computer**
- to **assembly**
- to a small **C language**
- to a bootloader and a tiny **Linux-like userland**

The whole virtual machine is written in **TypeScript**, so you can understand every layer. It behaves like a small 1983-style computer, but with a few modern extras such as an HTTP bridge, a very fast simulator, and built-in visual tools.

---

## Quickstart

The app opens on \`1. Va-et-vient\`, the simplest scene, with the \`Scènes\` panel
already unfolded. From there:

1. Follow the tutorial step by step
2. Walk down the scene list, which is ordered from the simplest circuit to the
   full computer
3. Then go to the CPU/hardware side
4. Then come back to \`Logiciel\`

The scene list is grouped into four tiers plus a sandbox:

- **Level 1 · Basics** — one signal, one gate, one bit (scenes 1 to 6)
- **Level 2 · 8-bit components** — adder, comparator, calculator, MUX (7 to 10)
- **Level 3 · Systems** — clock, memory, console, keyboard, plotter (11 to 17)
- **Level 4 · Full computer** — the complete 8-bit CPU (18)
- **Sandbox** — an empty canvas

The scene you are currently on is highlighted, and shows a one-line description
of what it demonstrates.

### Why this quickstart works well

\`1. Va-et-vient\` is a very small and friendly first scene.

It helps you understand the app in the right order:

- first, how a simple circuit reacts
- then, how signals move through the machine
- then, what bigger hardware blocks are made of
- then, how the software side sits on top of that hardware

So the recommended path is:

1. start with \`Matériel -> Scènes -> 1. Va-et-vient\`
2. follow the tutorial until the behavior feels obvious
3. switch to \`Matériel\` and inspect the CPU-oriented parts
4. return to \`Logiciel\` and run real programs

This gives a much better first experience than jumping directly into the full computer, because you first build intuition on a tiny example, then move up to the CPU, then to programming.

---

## 1. What This App Is

There are really **two apps in one**:

### Hardware side

You build and inspect the machine itself:

- transistors
- gates
- registers
- ALU
- RAM
- clock
- full 8-bit CPU

### Software side

You use that machine like a computer:

- write ASM
- write mini C programs
- run the bootloader
- install the Linux-like userland disk
- use the console, plotter, drive, and network features

---

## 2. Why It Is Special

This is not a black-box emulator.

It is meant to be **understandable**:

- you can see the hardware blocks
- you can inspect RAM, registers, and flags
- you can read the assembler and compiler
- you can follow how a program turns into machine code
- you can see the bootloader and userland disk as real project files

In short: it is a small **virtual machine** with the spirit of an early personal computer, but easier to inspect than real hardware.

It has most of what you would expect from a classic 8-bit machine:

- text console
- keyboard input
- graphics plotter
- persistent drive
- bootloader
- disk programs
- simple C compiler

And it also has a few things a real 1983 home computer usually did not have:

- an **HTTP** bridge
- very fast execution in software
- a modern visual debugger-like UI
- a fully readable TypeScript implementation

---

## 3. First Orientation

When using the app, think of it like this:

- **Hardware / materiel scene**: learn or inspect how the computer is built
- **Software view**: actually program and use the machine

If you are new, the easiest path is:

1. Look at the basic hardware scene for a minute
2. Switch to the software view
3. Run a tiny C program
4. Boot the bootloader
5. Install the Linux disk
6. Try a few userland commands

### Language selector

The interface supports both English and French.

By default it follows the browser language, but you can override it at any time from the header selector:

- \`Auto\` uses the browser language
- \`English\` forces the UI to English
- \`Français\` forces the UI to French

---

## 4. How To Use The Basic Hardware Scene

The hardware scene is the visual, node-based part of the app.

You will see components connected by wires. Those components can be:

- inputs and outputs
- transistors
- logic gates
- registers
- ALU blocks
- clock and control logic
- memory
- CPU/peripheral modules

### What to do there

Start simple:

1. Toggle an input
2. Watch the wire color change
3. Observe the output node

Then move up one level:

1. Open a scene with transistors or gates
2. Change the inputs
3. Verify the truth table behavior

Then look at the default computer scene:

1. Find the CPU, RAM, and I/O blocks
2. Run the clock or step the machine
3. Watch values move through the system

### What the colors mean

- active/high signals light up
- inactive/low signals stay dim
- animated wires show activity

### Best way to learn

Use the hardware scene to answer questions like:

- What is a transistor doing?
- How does an AND gate work?
- What is inside an ALU?
- How do registers store values?
- How does a clock advance the machine?

This is the “from transistor to computer” part of the app.

---

## 5. How To Use The Software View

The software view is where you use the computer as a programmer.

Here you can:

- edit ASM or C code
- assemble/compile it
- run, pause, reset, or step
- inspect registers and memory
- see console output
- draw on the plotter
- use the external drive

The runtime area on the right now has two modes:

- \`Computer\` shows a non-editable live overview of the same running machine used by the software view
- \`Classic\` keeps the older split panels for registers, memory, console, and plotter

The \`Computer\` panel can be fullscreened and is meant to show the whole machine at once without dropping to hardware-scene granularity. It groups together:

- CPU state, registers, flags, bus/state summary, and stack activity
- memory and boot argument state
- console and plotter output
- immediate keyboard input, with a collapsible on-screen keyboard
- the external drive using the bootloader filesystem conventions
- the network controller, including recent completed requests

### Basic workflow

1. Choose \`ASM\` or \`C\`
2. Write or load a program
3. Compile/assemble
4. Run it
5. Inspect the output and state

If something goes wrong, use:

- the console output
- the register view
- the memory view
- the generated test report in \`report/index.html\`

If you want the broadest live view of the running program, switch the runtime area to \`Computer\`. It is especially useful in bootloader mode because the disk, keyboard, console, plotter, and network state are visible together in one place.
That \`Computer\` view also includes the live \`Computer Architecture Flow\`: a whole-machine SVG showing the CPU, ALU, memory bus, console, keyboard, drive, network, and plotter paths with the same renderer used by the automated test snapshots.

---

## 6. How To Write A Mini C Program

The easiest first C program is:

\`\`\`c
int main() {
  print("Hello World!");
  return 0;
}
\`\`\`

### How to run it

1. Open the software view
2. Switch the editor language to \`C\`
3. Paste the program
4. Compile it
5. Run it

### Another tiny example

\`\`\`c
int main() {
  int a, b;
  a = 7;
  b = 5;
  print("Result: ");
  print_num(a + b);
  putchar(10);
  return 0;
}
\`\`\`

### What mini C supports

The language is intentionally small and easy to understand:

- \`int\`
- \`string\`
- \`const\`
- \`if\`, \`else\`, \`while\`, \`for\`
- functions
- arrays
- array parameters
- string literals
- plotter and console built-ins

### Important thing to remember

\`int\` is **8-bit unsigned**, so values are from \`0\` to \`255\`.

That means:

- \`255 + 1\` becomes \`0\`
- \`0 - 1\` becomes \`255\`

This is part of the charm of the machine: it behaves like a real tiny 8-bit system.

---

## 7. How To Use The Bootloader And Linux Disk

The app includes a bootloader and a small Linux-like disk userland.

This is not real Linux, but it feels like a tiny classic machine OS:

- programs live on disk
- the bootloader launches them
- files can be read and written
- a shell prompt lets you explore the disk

### Basic boot flow

1. Open the software view
2. Enable or boot the bootloader
3. Install the Linux disk
4. Wait for the shell prompt

Then try:

\`\`\`text
ls
run hello
run sysinfo
run bootcat readme
run wget url
cat result
\`\`\`

### Useful bundled files and programs

Depending on the current disk image, you will find things like:

- \`readme\`
- \`story\`
- \`url\`
- \`result\`
- \`hello\`
- \`sysinfo\`
- \`wget\`
- \`cp\`
- \`mv\`
- \`grep\`
- \`jsonp\`
- \`glxsh\`
- \`glxnano\`

### \`wget\`

The default \`url\` file points to:

\`\`\`text
https://jsonplaceholder.typicode.com/todos/1
\`\`\`

So this is a nice first demo:

\`\`\`text
run wget url
cat result
\`\`\`

If you keep the software view on the \`Computer\` panel while running \`wget\`, the network card shows:

- the current pending request
- the last completed status
- the last completed URL
- the last completed request body
- the last completed response body
- a recent-request history

That history is kept so short-lived tools are still inspectable even when they return quickly to the bootloader shell.

### \`glxnano\`

\`glxnano\` is the graphical text editor.

Run it like this:

\`\`\`text
run glxnano readme
\`\`\`

Then type directly. The keyboard is immediate while the program runs.

In the \`Computer\` runtime panel, the keyboard card mirrors that behavior with a collapsible input surface, while the plotter and console cards show the editor's live output in the same fullscreenable dashboard.

Typical keys:

- arrows to move
- \`Enter\` for newline
- \`Backspace\` to delete
- \`Tab\` for zoom
- \`&\` for theme
- \`\\\` to save
- \`@\` to quit

---

## 8. A Good First Tour

If you want the shortest useful tour of the whole app:

### Tour A — Understand the machine

1. Open the hardware scene
2. Look at a transistor scene
3. Look at a gate scene
4. Look at the full 8-bit computer scene
5. Step the clock and inspect the state

### Tour B — Use the machine

1. Open the software view
2. Run a tiny C program
3. Draw something on the plotter
4. Boot the bootloader
5. Install the Linux disk
6. Run \`ls\`, \`run hello\`, \`run wget url\`
7. Open \`glxnano\`

This gives you both halves of the project:

- how the computer is built
- how the computer is used

---

## 9. What To Read Next

After this user guide, the deeper docs are:

- \`docs/how-the-hardware-works.md\`
- \`docs/how-the-computer-works.md\`
- \`docs/c-language-guide.md\`
- \`docs/compiler-bugfixes-and-tests.md\`

If you want the quick visual result of the automated tests, open:

- \`report/index.html\`

That report now includes:

- plotter image suites
- computer architecture SVG snapshots
- PNG copies of those architecture snapshots
- full-computer bootloader/Linux architecture runs
- one architecture snapshot for every bundled C example

Project testing rule:

- everything the user can run on the computer must be tested
- every bundled example program must be exercised through multiple workflows when possible
- for Linux-like userland programs, the direct CPU suite and the Computer Architecture Flow suite are expected to cover the same runnable set
- in this project, that is the practical meaning of \`100% test coverage\`

---

## 10. Final Mental Model

This app is:

- a transistor-to-computer teaching tool
- a tiny 8-bit retro-style machine
- a readable TypeScript virtual machine
- a programming playground with ASM, C, bootloader, disk, graphics, and HTTP

If you want one sentence:

**It is a fully understandable 8-bit computer, built in TypeScript, that lets you learn computing from transistors all the way up to a tiny operating-system-like userland.**
`,EE=`# Guide Utilisateur Simple

Cette application est un terrain de jeu informatique complet et compréhensible.

Elle permet d’explorer l’informatique du bas vers le haut :

- des **transistors**
- aux **portes logiques**
- à un **ordinateur 8 bits**
- à l’**assembleur**
- à un petit **langage C**
- jusqu’à un bootloader et un minuscule **userland de type Linux**

Toute la machine virtuelle est écrite en **TypeScript**, donc chaque couche peut être lue et comprise. Elle se comporte comme un petit ordinateur de style 1983, avec quelques extras modernes comme un pont HTTP, un simulateur très rapide et des outils visuels intégrés.

---

## Démarrage Rapide

L’application s’ouvre sur \`1. Va-et-vient\`, la scène la plus simple, avec le
panneau \`Scènes\` déjà déplié. Ensuite :

1. suivre le tutoriel pas à pas
2. descendre la liste des scènes, classée du circuit le plus simple à
   l’ordinateur complet
3. aller ensuite voir la partie CPU / matériel
4. revenir enfin dans \`Logiciel\`

La liste des scènes est regroupée en quatre niveaux, plus un bac à sable :

- **Niveau 1 · Les bases** — un signal, une porte, un bit (scènes 1 à 6)
- **Niveau 2 · Composants 8 bits** — additionneur, comparateur, calculatrice,
  multiplexeur (7 à 10)
- **Niveau 3 · Systèmes** — horloge, mémoire, console, clavier, plotter (11 à 17)
- **Niveau 4 · L’ordinateur complet** — le CPU 8 bits entier (18)
- **Bac à sable** — un canvas vide

La scène en cours est surlignée et affiche en une ligne ce qu’elle démontre.

### Pourquoi ce démarrage rapide est le bon

\`1. Va-et-vient\` est une scène très petite et très pédagogique.

Elle permet de découvrir l’application dans le bon ordre :

- d’abord, comment un circuit simple réagit
- ensuite, comment les signaux circulent
- ensuite, de quoi sont faits les blocs matériels plus gros
- enfin, comment la partie logicielle repose sur ce matériel

Le parcours recommandé est donc :

1. commencer par \`Matériel -> Scènes -> 1. Va-et-vient\`
2. suivre le tutoriel jusqu’à ce que le comportement devienne évident
3. passer à \`Matériel\` pour regarder les éléments orientés CPU
4. revenir à \`Logiciel\` pour lancer de vrais programmes

Cette progression est bien meilleure qu’un saut immédiat dans l’ordinateur complet, parce qu’elle construit d’abord une intuition sur un exemple minuscule, puis monte vers le CPU, puis vers la programmation.

---

## 1. Ce Qu’est Cette Application

Il y a en réalité **deux applications en une**.

### Côté matériel

On construit et inspecte la machine elle-même :

- transistors
- portes logiques
- registres
- ALU
- RAM
- horloge
- CPU 8 bits complet

### Côté logiciel

On utilise cette machine comme un ordinateur :

- écrire de l’ASM
- écrire de petits programmes en C
- lancer le bootloader
- installer le disque userland de type Linux
- utiliser la console, le plotter, le disque et le réseau

---

## 2. Pourquoi C’est Spécial

Ce n’est pas un émulateur boîte noire.

L’objectif est d’être **compréhensible** :

- on peut voir les blocs matériels
- on peut inspecter la RAM, les registres et les flags
- on peut lire l’assembleur et le compilateur
- on peut suivre comment un programme devient du code machine
- on peut voir le bootloader et le disque userland comme de vrais fichiers du projet

En bref : c’est une petite **machine virtuelle** avec l’esprit d’un micro-ordinateur ancien, mais plus facile à inspecter qu’un vrai matériel.

Elle possède l’essentiel de ce qu’on attend d’une machine 8 bits classique :

- console texte
- entrée clavier
- plotter graphique
- disque persistant
- bootloader
- programmes sur disque
- compilateur C simple

Et aussi quelques éléments qu’un vrai micro-ordinateur de 1983 n’avait généralement pas :

- un pont **HTTP**
- une exécution logicielle très rapide
- une interface moderne de type débogueur visuel
- une implémentation TypeScript entièrement lisible

---

## 3. Premier Repère

Quand on utilise l’application, on peut la voir comme ceci :

- **scène Hardware / matériel** : apprendre ou inspecter comment l’ordinateur est construit
- **vue Software / logicielle** : programmer réellement la machine et l’utiliser

Si on débute, le chemin le plus simple est :

1. regarder rapidement la scène matérielle de base
2. passer à la vue logicielle
3. lancer un petit programme en C
4. booter le bootloader
5. installer le disque Linux-like
6. essayer quelques commandes userland

### Sélecteur de langue

L'interface supporte l'anglais et le français.

Par défaut, elle suit la langue du navigateur, mais on peut la forcer à tout moment depuis le sélecteur du header :

- \`Auto\` utilise la langue du navigateur
- \`English\` force l'interface en anglais
- \`Français\` force l'interface en français

---

## 4. Comment Utiliser la Scène Matérielle de Base

La scène matérielle est la partie visuelle et nodale de l’application.

On y voit des composants reliés par des fils. Ces composants peuvent être :

- des entrées et sorties
- des transistors
- des portes logiques
- des registres
- des blocs ALU
- l’horloge et la logique de contrôle
- la mémoire
- des modules CPU/périphériques

### Que faire dans cette vue

Commencer simple :

1. basculer une entrée
2. regarder la couleur du fil changer
3. observer le nœud de sortie

Puis monter d’un niveau :

1. ouvrir une scène avec des transistors ou des portes
2. changer les entrées
3. vérifier le comportement de la table de vérité

Puis regarder la scène ordinateur par défaut :

1. trouver le CPU, la RAM et les blocs d’E/S
2. lancer l’horloge ou avancer pas à pas
3. regarder les valeurs circuler dans le système

### Ce que signifient les couleurs

- les signaux actifs / hauts s’allument
- les signaux inactifs / bas restent atténués
- les fils animés montrent l’activité

### La meilleure manière d’apprendre

Utiliser la scène matérielle pour répondre à des questions comme :

- Que fait un transistor ?
- Comment fonctionne une porte AND ?
- Que contient une ALU ?
- Comment un registre stocke une valeur ?
- Comment l’horloge fait avancer la machine ?

C’est la partie “du transistor à l’ordinateur” de l’application.

---

## 5. Comment Utiliser la Vue Logicielle

La vue logicielle est l’endroit où l’on utilise la machine comme programmeur.

Ici on peut :

- éditer du code ASM ou C
- l’assembler / le compiler
- lancer, mettre en pause, reset ou avancer pas à pas
- inspecter les registres et la mémoire
- voir la sortie console
- dessiner sur le plotter
- utiliser le disque externe

La zone d’exécution à droite a maintenant deux modes :

- \`Computer\` montre une vue live non éditable de la même machine en cours d’exécution utilisée par la vue logicielle
- \`Classic\` garde les anciens panneaux séparés pour registres, mémoire, console et plotter

Le panneau \`Computer\` peut passer en plein écran et sert à voir toute la machine d’un coup sans redescendre au niveau de granularité de la scène hardware. Il regroupe :

- l’état du CPU, les registres, les flags, le résumé des bus/états et l’activité de pile
- l’état mémoire et les arguments du bootloader
- la sortie console et plotter
- l’entrée clavier immédiate, avec un clavier visuel repliable
- le disque externe avec les conventions du système de fichiers du bootloader
- le contrôleur réseau, y compris les dernières requêtes terminées

### Workflow de base

1. choisir \`ASM\` ou \`C\`
2. écrire ou charger un programme
3. compiler / assembler
4. l’exécuter
5. inspecter la sortie et l’état

Si quelque chose ne va pas, utiliser :

- la sortie console
- la vue des registres
- la vue mémoire
- le rapport de test généré dans \`report/index.html\`

Si on veut la vue live la plus large de la machine en cours d’exécution, il faut passer la zone runtime en mode \`Computer\`. C’est particulièrement utile en mode bootloader, car l’état du disque, du clavier, de la console, du plotter et du réseau y est visible ensemble.
Cette vue \`Computer\` contient aussi le \`Computer Architecture Flow\` en direct : un SVG de la machine complète montrant les chemins du CPU, de l’ALU, du bus mémoire, de la console, du clavier, du disque, du réseau et du plotter avec le même renderer que celui utilisé par les snapshots automatisés.

---

## 6. Comment Écrire un Petit Programme en C

Le programme C le plus simple est :

\`\`\`c
int main() {
  print("Hello World!");
  return 0;
}
\`\`\`

### Comment le lancer

1. ouvrir la vue logicielle
2. passer le langage de l’éditeur sur \`C\`
3. coller le programme
4. le compiler
5. l’exécuter

### Un autre tout petit exemple

\`\`\`c
int main() {
  int a, b;
  a = 7;
  b = 5;
  print("Result: ");
  print_num(a + b);
  putchar(10);
  return 0;
}
\`\`\`

### Ce que le mini C supporte

Le langage est volontairement petit et facile à comprendre :

- \`int\`
- \`string\`
- \`const\`
- \`if\`, \`else\`, \`while\`, \`for\`
- fonctions
- tableaux
- paramètres tableau
- chaînes littérales
- built-ins plotter et console

### Point important à retenir

\`int\` est **non signé sur 8 bits**, donc les valeurs vont de \`0\` à \`255\`.

Cela signifie :

- \`255 + 1\` devient \`0\`
- \`0 - 1\` devient \`255\`

Cela fait partie du charme de la machine : elle se comporte comme un vrai petit système 8 bits.

---

## 7. Comment Utiliser le Bootloader et le Disque Linux-like

L’application inclut un bootloader et un petit userland sur disque de type Linux.

Ce n’est pas un vrai Linux, mais cela ressemble à un petit OS de machine classique :

- les programmes vivent sur disque
- le bootloader les lance
- les fichiers peuvent être lus et écrits
- un prompt shell permet d’explorer le disque

### Flux de boot de base

1. ouvrir la vue logicielle
2. activer ou booter le bootloader
3. installer le disque Linux
4. attendre le prompt shell

Puis essayer :

\`\`\`text
ls
run hello
run sysinfo
run bootcat readme
run wget url
cat result
\`\`\`

### Fichiers et programmes utiles fournis

Selon l’image disque courante, on peut y trouver des éléments comme :

- \`readme\`
- \`story\`
- \`url\`
- \`result\`
- \`hello\`
- \`sysinfo\`
- \`wget\`
- \`cp\`
- \`mv\`
- \`grep\`
- \`jsonp\`
- \`glxsh\`
- \`glxnano\`

### \`wget\`

Le fichier \`url\` par défaut pointe vers :

\`\`\`text
https://jsonplaceholder.typicode.com/todos/1
\`\`\`

Donc une bonne première démo est :

\`\`\`text
run wget url
cat result
\`\`\`

Si on garde la vue logicielle sur le panneau \`Computer\` pendant l’exécution de \`wget\`, la carte réseau montre :

- la requête en cours
- le dernier statut terminé
- la dernière URL terminée
- le dernier corps de requête terminé
- le dernier corps de réponse terminé
- un historique récent des requêtes

Cet historique est volontairement court afin que les outils rapides restent inspectables même lorsqu’ils reviennent très vite au shell du bootloader.

### \`glxnano\`

\`glxnano\` est l’éditeur de texte graphique.

On le lance ainsi :

\`\`\`text
run glxnano readme
\`\`\`

Ensuite on tape directement. Le clavier est immédiat pendant l’exécution du programme.

Dans le panneau runtime \`Computer\`, la carte clavier reflète ce comportement avec une surface d’entrée repliable, tandis que les cartes plotter et console montrent la sortie live de l’éditeur dans le même tableau de bord plein écran.

Touches typiques :

- flèches pour se déplacer
- \`Enter\` pour un retour à la ligne
- \`Backspace\` pour effacer
- \`Tab\` pour le zoom
- \`&\` pour le thème
- \`\\\` pour sauvegarder
- \`@\` pour quitter

---

## 8. Une Bonne Première Visite

Si on veut la visite utile la plus courte de toute l’application :

### Visite A — Comprendre la machine

1. ouvrir la scène matérielle
2. regarder une scène de transistor
3. regarder une scène de porte logique
4. regarder la scène complète de l’ordinateur 8 bits
5. avancer l’horloge et inspecter l’état

### Visite B — Utiliser la machine

1. ouvrir la vue logicielle
2. lancer un petit programme en C
3. dessiner quelque chose sur le plotter
4. booter le bootloader
5. installer le disque Linux
6. lancer \`ls\`, \`run hello\`, \`run wget url\`
7. ouvrir \`glxnano\`

Cela donne les deux moitiés du projet :

- comment l’ordinateur est construit
- comment l’ordinateur est utilisé

---

## 9. Que Lire Ensuite

Après ce guide utilisateur, les docs plus profondes sont :

- \`docs/how-the-hardware-works.md\`
- \`docs/how-the-computer-works.md\`
- \`docs/c-language-guide.md\`
- \`docs/compiler-bugfixes-and-tests.md\`

Si on veut voir rapidement le résultat visuel des tests automatisés, il faut ouvrir :

- \`report/index.html\`

Ce rapport contient maintenant :

- les suites d’images plotter
- les snapshots SVG de l’architecture ordinateur
- les copies PNG de ces snapshots d’architecture
- les exécutions complètes bootloader/Linux en architecture
- un snapshot d’architecture pour chaque exemple C fourni

Règle de test du projet :

- tout ce que l’utilisateur peut lancer sur l’ordinateur doit être testé
- chaque programme exemple fourni doit être exercé via plusieurs workflows si possible
- pour les programmes du userland Linux-like, la suite CPU directe et la suite Computer Architecture Flow doivent couvrir le même ensemble exécutable
- dans ce projet, c’est le sens pratique de \`100% test coverage\`

---

## 10. Modèle Mental Final

Cette application est :

- un outil pédagogique “du transistor à l’ordinateur”
- une petite machine rétro 8 bits
- une machine virtuelle TypeScript lisible
- un terrain de jeu de programmation avec ASM, C, bootloader, disque, graphismes et HTTP

Si on veut une seule phrase :

**C’est un ordinateur 8 bits entièrement compréhensible, construit en TypeScript, qui permet d’apprendre l’informatique depuis les transistors jusqu’à un petit userland de type système d’exploitation.**
`;function R0(t,a){const[i,l]=z.useState(()=>{try{const o=localStorage.getItem(t);return o?JSON.parse(o):a}catch{return a}});return z.useEffect(()=>{try{localStorage.setItem(t,JSON.stringify(i))}catch{}},[t,i]),[i,l]}const Eb=()=>({x:Math.random()*200+100,y:Math.random()*200+100}),RE=(t,a,i="en")=>{const l=er(),o=Eb(),c=i==="fr";switch(t){case"input":return{id:l,type:t,position:o,data:{label:`IN_${l.slice(0,4)}`,value:0}};case"output":return{id:l,type:t,position:o,data:{label:`OUT_${l.slice(0,4)}`,value:0}};case"gate":return{id:l,type:t,position:o,data:{type:a,value:0}};case"transistor":return{id:l,type:t,position:o,data:{label:(a||"nmos").toUpperCase(),mode:a==="pmos"?"pmos":"nmos",value:0,inputValue:0,conducting:0}};case"adder8":return{id:l,type:t,position:o,data:{sum:Array(8).fill(0),cout:0}};case"sram8":return{id:l,type:t,position:o,data:{memory:Array(256).fill(0),q:Array(8).fill(0),currentAddress:0}};case"bus8":return{id:l,type:t,position:o,data:{val:Array(8).fill(0)}};case"inputNumber":return{id:l,type:t,position:o,data:{label:"NUM_IN",value:0}};case"outputNumber":return{id:l,type:t,position:o,data:{label:"NUM_OUT",value:0}};case"clock":return{id:l,type:t,position:o,data:{label:"CLK",value:0,frequency:1,tickCounter:0}};case"register8":return{id:l,type:t,position:o,data:{label:"REG",value:0,q:Array(8).fill(0),prevClk:0}};case"alu8":return{id:l,type:t,position:o,data:{a:0,b:0,result:0,r:Array(8).fill(0),zero:0,carry:0,negative:0,opName:"ADD"}};case"mux8":return{id:l,type:t,position:o,data:{label:"MUX",sel:0,outVal:0,out:Array(8).fill(0)}};case"console":return{id:l,type:t,position:o,data:{label:"CONSOLE",text:"",lastChar:0,prevWr:0}};case"plotter":return{id:l,type:t,position:o,data:{label:"PLOTTER",pixels:[],prevDraw:0,colorSource:"wires",currentColor:dn}};case"keyboard":return{id:l,type:t,position:o,data:{label:c?"CLAVIER":"KEYBOARD",keys:[0,0,0,0,0]}};case"drive":return{id:l,type:t,position:o,data:{label:c?"DISQUE EXT":"EXT DRIVE",bytes:Array(ba).fill(0),q:Array(8).fill(0),currentAddress:0,lastRead:0,lastWrite:0,prevRd:0,prevWr:0}};case"network":return{id:l,type:t,position:o,data:{label:c?"RÉSEAU":"NETWORK",method:"GET",url:"",body:"",q:Array(8).fill(0),avail:0,pending:0,responseBuffer:[],requestSerial:0,responseSize:0,lastByte:0,prevGet:0,prevPost:0,prevRd:0}};default:return null}},kE=t=>{const a=new Map,i=h=>(a.has(h)||a.set(h,er()),a.get(h)),l=t.circuit.nodes.map(h=>({...h,id:i(h.id),data:{...h.data}})),o=t.circuit.edges.map(h=>({...h,id:er(),source:i(h.source),target:i(h.target)})),c=t.inputHandles.map((h,b)=>({...h,handleId:`grp_in_${b}`,internalNodeId:i(h.internalNodeId)})),d=t.outputHandles.map((h,b)=>({...h,handleId:`grp_out_${b}`,internalNodeId:i(h.internalNodeId)})),m=er(),x={};for(const h of l)x[h.id]={x:0,y:0};return{id:m,type:"group",position:Eb(),data:{label:t.label,circuit:{nodes:l,edges:o},inputHandles:c,outputHandles:d,outputs:Object.fromEntries(d.map(h=>[h.handleId,0])),ungroupInfo:{nodeOffsets:x,groupPosition:{x:0,y:0},rewiredEdges:[],proxyNodeIds:[],proxyEdgeIds:[]}}}},Xx={stroke:"#475569",strokeWidth:2},OE=(t,a,i,l)=>{const o=t.filter(J=>J.selected);if(o.length<2)return null;const c=new Set(o.map(J=>J.id)),d=[],m=[],x=[];for(const J of a){const R=c.has(J.source),Z=c.has(J.target);R&&Z?d.push(J):!R&&Z?m.push(J):R&&!Z&&x.push(J)}const h=Math.min(...o.map(J=>J.position.x)),b=Math.max(...o.map(J=>J.position.x)),g=Math.min(...o.map(J=>J.position.y)),v=[],L=[],w=[],N=[],T=[],C=[];let B=0;const D=new Map;for(const J of m){const R=`${J.target}::${J.targetHandle||"default"}`;D.has(R)||D.set(R,[]),D.get(R).push(J)}for(const[,J]of D){const R=J[0],Z=`grp_in_${B}`,G=`__proxy_in_${B}`,K=`__proxy_edge_in_${B}`;B++;const ne=o.find(M=>M.id===R.target),j=(ne==null?void 0:ne.data.label)||`${(ne==null?void 0:ne.type)||"?"}.${R.targetHandle||"in"}`;L.push({id:G,type:"input",position:{x:h-200,y:g+B*60},data:{label:j,value:0}}),N.push(G),w.push({id:K,source:G,sourceHandle:"out",target:R.target,targetHandle:R.targetHandle||void 0,animated:!1,style:Xx}),T.push(K),v.push({handleId:Z,type:"target",label:j,internalNodeId:G,internalHandleId:"out"});for(const M of J)C.push({edgeId:M.id,original:{target:M.target,targetHandle:M.targetHandle},newTargetHandle:Z})}const E=[];let _=0;const P=new Map;for(const J of x){const R=`${J.source}::${J.sourceHandle||"default"}`;P.has(R)||P.set(R,[]),P.get(R).push(J)}for(const[,J]of P){const R=J[0],Z=`grp_out_${_}`,G=`__proxy_out_${_}`,K=`__proxy_edge_out_${_}`;_++;const ne=o.find(M=>M.id===R.source),j=(ne==null?void 0:ne.data.label)||`${(ne==null?void 0:ne.type)||"?"}.${R.sourceHandle||"out"}`;L.push({id:G,type:"output",position:{x:b+200,y:g+_*60},data:{label:j,value:0}}),N.push(G),w.push({id:K,source:R.source,sourceHandle:R.sourceHandle||void 0,target:G,targetHandle:"in",animated:!1,style:Xx}),T.push(K),E.push({handleId:Z,type:"source",label:j,internalNodeId:G,internalHandleId:"in"});for(const M of J)C.push({edgeId:M.id,original:{source:M.source,sourceHandle:M.sourceHandle},newSourceHandle:Z})}const S=new Set(m.map(J=>J.target)),X=new Set(x.map(J=>J.source));for(const J of o)if(J.type==="input"&&!S.has(J.id))v.push({handleId:`grp_in_${B++}`,type:"target",label:J.data.label||"IN",internalNodeId:J.id,internalHandleId:"out"});else if(J.type==="inputNumber"&&!S.has(J.id))for(let R=0;R<8;R++)v.push({handleId:`grp_in_${B++}`,type:"target",label:`${J.data.label||"NUM"}[${R}]`,internalNodeId:J.id,internalHandleId:`out${R}`});else if(J.type==="output"&&!X.has(J.id))E.push({handleId:`grp_out_${_++}`,type:"source",label:J.data.label||"OUT",internalNodeId:J.id,internalHandleId:"in"});else if(J.type==="outputNumber"&&!X.has(J.id))for(let R=0;R<8;R++)E.push({handleId:`grp_out_${_++}`,type:"source",label:`${J.data.label||"NUM"}[${R}]`,internalNodeId:J.id,internalHandleId:`in${R}`});const F=o.reduce((J,R)=>J+R.position.x,0)/o.length,$=o.reduce((J,R)=>J+R.position.y,0)/o.length,H={};for(const J of o)H[J.id]={x:J.position.x-F,y:J.position.y-$};const te=[...o.map(J=>({...J,selected:!1,data:{...J.data}})),...L],oe=[...d.map(J=>({...J})),...w];return{groupNode:{id:i,type:"group",position:{x:F,y:$},data:{label:l,circuit:{nodes:te,edges:oe},inputHandles:v,outputHandles:E,outputs:Object.fromEntries(E.map(J=>[J.handleId,0])),ungroupInfo:{nodeOffsets:H,groupPosition:{x:F,y:$},rewiredEdges:C.map(J=>({edgeId:J.edgeId,original:J.original})),proxyNodeIds:N,proxyEdgeIds:T}}},selectedIds:c,edgeRewrites:C}},jE=(t,a,i)=>[...t.filter(l=>!a.has(l.id)),i],BE=(t,a,i,l)=>t.filter(c=>!(a.has(c.source)&&a.has(c.target))).map(c=>{const d=i.find(x=>x.edgeId===c.id);if(!d)return c;const m={...c};return d.newTargetHandle!==void 0&&(m.target=l,m.targetHandle=d.newTargetHandle),d.newSourceHandle!==void 0&&(m.source=l,m.sourceHandle=d.newSourceHandle),m}),PE=t=>{const a=t.data,{circuit:i,ungroupInfo:l}=a,{nodeOffsets:o,proxyNodeIds:c,proxyEdgeIds:d,rewiredEdges:m}=l,x=new Set(c||[]),h=new Set(d||[]),b=i.nodes.filter(v=>!x.has(v.id)).map(v=>{var L,w;return{...v,position:{x:t.position.x+(((L=o[v.id])==null?void 0:L.x)||0),y:t.position.y+(((w=o[v.id])==null?void 0:w.y)||0)},selected:!1}}),g=i.edges.filter(v=>!h.has(v.id));return{restoredNodes:b,restoredEdges:g,rewiredEdges:m}},zE=(t,a,i)=>[...t.filter(l=>l.id!==a),...i],UE=(t,a,i,l)=>[...t.filter(d=>d.source!==a&&d.target!==a).map(d=>{const m=(i||[]).find(x=>x.edgeId===d.id);return m?{...d,...m.original}:d}),...l],Vt=(t,a=8)=>Array.from({length:a},(i,l)=>t&1<<l?1:0),$E=(t,a)=>t.map(i=>{switch(i.id){case"pc":return{...i,data:{...i.data,value:a.pc,q:Vt(a.pc)}};case"ir":return{...i,data:{...i.data,value:a.memory[a.pc]||0,q:Vt(a.memory[a.pc]||0)}};case"aReg":return{...i,data:{...i.data,value:a.a,q:Vt(a.a)}};case"bReg":return{...i,data:{...i.data,value:a.b,q:Vt(a.b)}};case"sp":return{...i,data:{...i.data,value:a.sp,q:Vt(a.sp)}};case"sram":return{...i,data:{...i.data,memory:Array.from(a.memory)}};case"flagZ":return{...i,data:{...i.data,value:a.flags.z?1:0}};case"flagC":return{...i,data:{...i.data,value:a.flags.c?1:0}};case"flagN":return{...i,data:{...i.data,value:a.flags.n?1:0}};case"console":return{...i,data:{...i.data,text:a.consoleText}};case"plotter":return{...i,data:{...i.data,pixels:a.plotterPixels,colorSource:"cpu",currentColor:a.plotterColor}};case"drive":return{...i,data:{...i.data,bytes:Array.from(a.driveData),q:Vt(a.driveLastRead||0),currentAddress:a.driveLastAddr||0,lastRead:a.driveLastRead||0,lastWrite:a.driveLastWrite||0,prevRd:0,prevWr:0}};case"network":return{...i,data:{...i.data,method:a.networkMethod,url:a.networkUrl,body:a.networkBody,q:Vt(a.networkLastByte||0),avail:a.networkResponseBuffer.length>0?1:0,pending:a.networkPending?1:0,responseBuffer:[...a.networkResponseBuffer],responseSize:a.networkResponseBuffer.length,lastByte:a.networkLastByte||0}};default:return i}}),da=(t,a)=>a.includes(t),IE=(t,a)=>{const i=a.state,l=a.lastOpcode,o=da(l,[U.LDA,U.ADD,U.SUB,U.AND,U.OR,U.XOR,U.INC,U.DEC,U.NOT,U.SHL,U.SHR,U.TBA,U.ADDB,U.SUBB,U.ANDB,U.ORB,U.XORB,U.MULB,U.DIVB,U.MODB,U.POP,U.LDM,U.INA,U.GETKEY,U.DRVRD])?1:0,c=l===U.GETKEY?1:0,d=da(l,[U.LDB,U.TAB,U.LBM])?1:0,m=da(l,[U.PUSH,U.POP,U.CALL,U.RET])?1:0,x=da(l,[U.STA,U.STB])?1:0,h=da(l,[U.STA,U.STB,U.LDM,U.LBM])?1:0,b=da(l,[U.LDM,U.LBM])?1:0,g=da(l,[U.OUTA,U.OUTD,U.OUT])?1:0,v=l===U.OUTD?1:0,L=l===U.DRAW?1:0,w=l===U.CLR?1:0,N=l===U.INA?1:0,T=l===U.DRVRD?1:0,C=l===U.DRVWR?1:0,B=l===U.DRVCLR?1:0,D=l===U.HTTPGET?1:0,E=l===U.HTTPPOST?1:0,_=l===U.HTTPIN?1:0;let P=0;(l===U.JMP||l===U.CALL||l===U.JZ&&i.flags.z||l===U.JNZ&&!i.flags.z||l===U.JC&&i.flags.c||l===U.JNC&&!i.flags.c||l===U.JN&&i.flags.n||l===U.RET)&&(P=1);const S=da(l,[U.ADD,U.SUB,U.AND,U.OR,U.XOR,U.CMP])?1:0,X=da(l,[U.PUSH,U.POP,U.CALL,U.RET])?1:0;let F=0;return da(l,[U.SUB,U.SUBB,U.CMP,U.CMPB,U.DEC])?F=1:l===U.AND||l===U.ANDB?F=2:l===U.OR||l===U.ORB?F=3:l===U.XOR||l===U.XORB?F=4:l===U.NOT?F=5:l===U.SHL?F=6:l===U.SHR&&(F=7),t.map($=>{switch($.id){case"pc":return{...$,data:{...$.data,value:i.pc,q:Vt(i.pc)}};case"ir":return{...$,data:{...$.data,value:i.memory[i.pc]||0,q:Vt(i.memory[i.pc]||0)}};case"aReg":return{...$,data:{...$.data,value:i.a,q:Vt(i.a)}};case"bReg":return{...$,data:{...$.data,value:i.b,q:Vt(i.b)}};case"sp":return{...$,data:{...$.data,value:i.sp,q:Vt(i.sp)}};case"sram":return{...$,data:{...$.data,memory:Array.from(i.memory)}};case"flagZ":return{...$,data:{...$.data,value:i.flags.z?1:0}};case"flagC":return{...$,data:{...$.data,value:i.flags.c?1:0}};case"flagN":return{...$,data:{...$.data,value:i.flags.n?1:0}};case"console":return{...$,data:{...$.data,text:a.consoleOutput.join(""),prevWr:g,inputBufferSize:a.consoleInputBuffer.length}};case"plotter":return{...$,data:{...$.data,pixels:ab(a.plotterPixels),colorSource:"cpu",currentColor:a.plotterColor,prevDraw:L}};case"drive":return{...$,data:{...$.data,bytes:Array.from(a.driveData),q:Vt(a.driveLastRead||0),currentAddress:a.driveLastAddr||0,lastRead:a.driveLastRead||0,lastWrite:a.driveLastWrite||0,prevRd:T,prevWr:C}};case"network":return{...$,data:{...$.data,method:a.httpLastMethod,url:a.httpLastUrl,body:a.httpLastBody,q:Vt(a.httpLastByte||0),avail:a.httpResponseBuffer.length>0?1:0,pending:a.httpPending?1:0,responseBuffer:[...a.httpResponseBuffer],responseSize:a.httpResponseBuffer.length,lastByte:a.httpLastByte||0,prevGet:D,prevPost:E,prevRd:_}};case"clk":return{...$,data:{...$.data,value:a.clockBit}};case"pcLoad":return{...$,data:{...$.data,value:1}};case"irLoad":return{...$,data:{...$.data,value:1}};case"aLoad":return{...$,data:{...$.data,value:o}};case"bLoad":return{...$,data:{...$.data,value:d}};case"spLoad":return{...$,data:{...$.data,value:m}};case"addrSel":return{...$,data:{...$.data,value:h}};case"dataSel":return{...$,data:{...$.data,value:b}};case"memWE":return{...$,data:{...$.data,value:x}};case"op0":return{...$,data:{...$.data,value:F>>0&1}};case"op1":return{...$,data:{...$.data,value:F>>1&1}};case"op2":return{...$,data:{...$.data,value:F>>2&1}};case"consoleWr":return{...$,data:{...$.data,value:g}};case"consoleMode":return{...$,data:{...$.data,value:v}};case"consoleClear":return{...$,data:{...$.data,value:0}};case"plotDraw":return{...$,data:{...$.data,value:L}};case"plotClear":return{...$,data:{...$.data,value:w}};case"driveRd":return{...$,data:{...$.data,value:T}};case"driveWr":return{...$,data:{...$.data,value:C}};case"driveClear":return{...$,data:{...$.data,value:B}};case"netGet":return{...$,data:{...$.data,value:D}};case"netPost":return{...$,data:{...$.data,value:E}};case"netRd":return{...$,data:{...$.data,value:_}};case"netClear":return{...$,data:{...$.data,value:0}};case"consoleRd":return{...$,data:{...$.data,value:N}};case"keyboard":return{...$,data:{...$.data,keys:[...a.keyState]}};case"keyRd":return{...$,data:{...$.data,value:c}};case"operand":return{...$,data:{...$.data,value:a.lastOperand&255}};case"rst":return{...$,data:{...$.data,value:0}};case"pcSrcMux":{const H=i.pc&255;return{...$,data:{...$.data,sel:P,outVal:H,out:Vt(H)}}}case"aluBMux":{const H=S?a.lastOperand&255:i.b;return{...$,data:{...$.data,sel:S,outVal:H,out:Vt(H)}}}case"spOpMux":{const H=X?i.sp&255:a.lastOperand&255;return{...$,data:{...$.data,sel:X,outVal:H,out:Vt(H)}}}case"pcJmp":return{...$,data:{...$.data,value:P}};case"aluImm":return{...$,data:{...$.data,value:S}};case"spSel":return{...$,data:{...$.data,value:X}};case"pcDisp":return{...$,data:{...$.data,value:i.pc&255}};case"irDisp":return{...$,data:{...$.data,value:i.memory[i.pc]||0}};case"aDisp":return{...$,data:{...$.data,value:i.a}};case"bDisp":return{...$,data:{...$.data,value:i.b}};case"spDisp":return{...$,data:{...$.data,value:i.sp&255}};case"memDisp":{const H=h?X?i.sp&255:a.lastOperand&255:i.pc&255;return{...$,data:{...$.data,value:i.memory[H]||0}}}case"alu":{const H=i.a,te=S?a.lastOperand&255:i.b;let oe=0,I=0;const J=["ADD","SUB","AND","OR","XOR","NOT","SHL","SHR"];switch(F){case 0:{const R=H+te;oe=R&255,I=R>255?1:0;break}case 1:{const R=H-te;oe=R&255,I=R<0?1:0;break}case 2:oe=H&te&255;break;case 3:oe=(H|te)&255;break;case 4:oe=(H^te)&255;break;case 5:oe=~H&255;break;case 6:I=H&128?1:0,oe=H<<1&255;break;case 7:I=H&1?1:0,oe=H>>1&255;break}return{...$,data:{...$.data,a:H,b:te,result:oe,r:Vt(oe),zero:oe===0?1:0,carry:I,negative:oe&128?1:0,opName:J[F]||"ADD"}}}case"addrMux":{const H=h?X?i.sp&255:a.lastOperand&255:i.pc&255;return{...$,data:{...$.data,sel:h,outVal:H,out:Vt(H)}}}case"dataMux":{const H=h?X?i.sp&255:a.lastOperand&255:i.pc&255,te=b?i.memory[H]||0:i.a;return{...$,data:{...$.data,sel:b,outVal:te,out:Vt(te)}}}case"pcInc":{const H=i.pc+1&255;return{...$,data:{...$.data,sum:Vt(H),cout:0}}}case"pcOne":return{...$,data:{...$.data,value:1}};default:return $}})},HE=t=>t.map(a=>a.type==="plotter"?{...a,data:{...a.data,colorSource:"wires",currentColor:dn}}:a),ga=(t,a,i,l)=>({id:t,type:"input",position:{x:i,y:l},data:{label:a,value:0}}),rl=(t,a,i,l)=>({id:t,type:"output",position:{x:i,y:l},data:{label:a,value:0}}),ha=(t,a,i,l)=>({id:t,type:"gate",position:{x:i,y:l},data:{type:a,value:0}}),_t=(t,a,i,l,o)=>({id:t,source:a,sourceHandle:i,target:l,targetHandle:o,animated:!1,style:{stroke:"#475569",strokeWidth:2}}),Rb=(t,a,i,l,o,c,d)=>({id:t,type:"group",position:{x:i,y:l},data:{label:a,circuit:o,inputHandles:c,outputHandles:d,outputs:Object.fromEntries(d.map(m=>[m.handleId,0])),ungroupInfo:{nodeOffsets:{},groupPosition:{x:0,y:0},rewiredEdges:[],proxyNodeIds:[],proxyEdgeIds:[]}}});function kb(t=""){const a=t,i=[ga(`${a}in_a`,"A",0,0),ga(`${a}in_b`,"B",0,120),ga(`${a}in_cin`,"Cin",0,240),ha(`${a}xor1`,"XOR",200,40),ha(`${a}xor2`,"XOR",420,80),ha(`${a}and1`,"AND",200,200),ha(`${a}and2`,"AND",420,240),ha(`${a}or1`,"OR",620,220),rl(`${a}out_sum`,"Sum",620,80),rl(`${a}out_cout`,"Cout",820,220)],l=[_t(`${a}e1`,`${a}in_a`,"out",`${a}xor1`,"a"),_t(`${a}e2`,`${a}in_b`,"out",`${a}xor1`,"b"),_t(`${a}e3`,`${a}xor1`,"out",`${a}xor2`,"a"),_t(`${a}e4`,`${a}in_cin`,"out",`${a}xor2`,"b"),_t(`${a}e5`,`${a}in_a`,"out",`${a}and1`,"a"),_t(`${a}e6`,`${a}in_b`,"out",`${a}and1`,"b"),_t(`${a}e7`,`${a}xor1`,"out",`${a}and2`,"a"),_t(`${a}e8`,`${a}in_cin`,"out",`${a}and2`,"b"),_t(`${a}e9`,`${a}and1`,"out",`${a}or1`,"a"),_t(`${a}e10`,`${a}and2`,"out",`${a}or1`,"b"),_t(`${a}e11`,`${a}xor2`,"out",`${a}out_sum`,"in"),_t(`${a}e12`,`${a}or1`,"out",`${a}out_cout`,"in")];return{nodes:i,edges:l}}function Ob(t=""){const a=t;return{input:[{handleId:"grp_in_0",type:"target",label:"A",internalNodeId:`${a}in_a`,internalHandleId:"out"},{handleId:"grp_in_1",type:"target",label:"B",internalNodeId:`${a}in_b`,internalHandleId:"out"},{handleId:"grp_in_2",type:"target",label:"Cin",internalNodeId:`${a}in_cin`,internalHandleId:"out"}],output:[{handleId:"grp_out_0",type:"source",label:"Sum",internalNodeId:`${a}out_sum`,internalHandleId:"in"},{handleId:"grp_out_1",type:"source",label:"Cout",internalNodeId:`${a}out_cout`,internalHandleId:"in"}]}}const JE=(()=>{const t=kb(),a=Ob();return{id:"__builtin_full_adder_1bit",label:"Additionneur 1-bit",circuit:t,inputHandles:a.input,outputHandles:a.output}})(),qE=(()=>{const t=[],a=[],i=[],l=[];let o=0,c=0;for(let d=0;d<8;d++)t.push(ga(`in_a${d}`,`A${d}`,0,d*70)),i.push({handleId:`grp_in_${o++}`,type:"target",label:`A${d}`,internalNodeId:`in_a${d}`,internalHandleId:"out"});for(let d=0;d<8;d++)t.push(ga(`in_b${d}`,`B${d}`,0,600+d*70)),i.push({handleId:`grp_in_${o++}`,type:"target",label:`B${d}`,internalNodeId:`in_b${d}`,internalHandleId:"out"});t.push(ga("in_cin","Cin",0,1200)),i.push({handleId:`grp_in_${o++}`,type:"target",label:"Cin",internalNodeId:"in_cin",internalHandleId:"out"});for(let d=0;d<8;d++)t.push(rl(`out_s${d}`,`S${d}`,700,d*70)),l.push({handleId:`grp_out_${c++}`,type:"source",label:`S${d}`,internalNodeId:`out_s${d}`,internalHandleId:"in"});t.push(rl("out_cout","Cout",700,600)),l.push({handleId:`grp_out_${c++}`,type:"source",label:"Cout",internalNodeId:"out_cout",internalHandleId:"in"});for(let d=0;d<8;d++){const m=`fa${d}_`,x=kb(m),h=Ob(m);t.push(Rb(`fa_${d}`,`FA${d}`,350,d*70,x,h.input,h.output)),a.push(_t(`ea${d}`,`in_a${d}`,"out",`fa_${d}`,"grp_in_0")),a.push(_t(`eb${d}`,`in_b${d}`,"out",`fa_${d}`,"grp_in_1")),d===0?a.push(_t("ecin","in_cin","out","fa_0","grp_in_2")):a.push(_t(`ecarry${d}`,`fa_${d-1}`,"grp_out_1",`fa_${d}`,"grp_in_2")),a.push(_t(`es${d}`,`fa_${d}`,"grp_out_0",`out_s${d}`,"in"))}return a.push(_t("ecout","fa_7","grp_out_1","out_cout","in")),{id:"__builtin_full_adder_8bit",label:"Additionneur 8-bit",circuit:{nodes:t,edges:a},inputHandles:i,outputHandles:l}})();function jb(t=""){const a=t,i=[ga(`${a}in_d`,"D",0,0),ga(`${a}in_we`,"WE",0,160),ha(`${a}not1`,"NOT",180,100),ha(`${a}nand1`,"NAND",320,20),ha(`${a}nand2`,"NAND",320,160),ha(`${a}nand3`,"NAND",520,20),ha(`${a}nand4`,"NAND",520,160),rl(`${a}out_q`,"Q",720,20)],l=[_t(`${a}e1`,`${a}in_d`,"out",`${a}nand1`,"a"),_t(`${a}e2`,`${a}in_d`,"out",`${a}not1`,"in"),_t(`${a}e3`,`${a}in_we`,"out",`${a}nand1`,"b"),_t(`${a}e4`,`${a}in_we`,"out",`${a}nand2`,"b"),_t(`${a}e5`,`${a}not1`,"out",`${a}nand2`,"a"),_t(`${a}e6`,`${a}nand1`,"out",`${a}nand3`,"a"),_t(`${a}e7`,`${a}nand2`,"out",`${a}nand4`,"a"),_t(`${a}e8`,`${a}nand4`,"out",`${a}nand3`,"b"),_t(`${a}e9`,`${a}nand3`,"out",`${a}nand4`,"b"),_t(`${a}e10`,`${a}nand3`,"out",`${a}out_q`,"in")];return{nodes:i,edges:l}}function Bb(t=""){const a=t;return{input:[{handleId:"grp_in_0",type:"target",label:"D",internalNodeId:`${a}in_d`,internalHandleId:"out"},{handleId:"grp_in_1",type:"target",label:"WE",internalNodeId:`${a}in_we`,internalHandleId:"out"}],output:[{handleId:"grp_out_0",type:"source",label:"Q",internalNodeId:`${a}out_q`,internalHandleId:"in"}]}}const VE=(()=>{const t=jb(),a=Bb();return{id:"__builtin_memory_1bit",label:"Mémoire 1-bit (D-Latch)",circuit:t,inputHandles:a.input,outputHandles:a.output}})(),ZE=(()=>{const t=[],a=[],i=[],l=[];let o=0,c=0;for(let d=0;d<8;d++)t.push(ga(`in_d${d}`,`D${d}`,0,d*80)),i.push({handleId:`grp_in_${o++}`,type:"target",label:`D${d}`,internalNodeId:`in_d${d}`,internalHandleId:"out"});t.push(ga("in_we","WE",0,680)),i.push({handleId:`grp_in_${o++}`,type:"target",label:"WE",internalNodeId:"in_we",internalHandleId:"out"});for(let d=0;d<8;d++)t.push(rl(`out_q${d}`,`Q${d}`,650,d*80)),l.push({handleId:`grp_out_${c++}`,type:"source",label:`Q${d}`,internalNodeId:`out_q${d}`,internalHandleId:"in"});for(let d=0;d<8;d++){const m=`mem${d}_`,x=jb(m),h=Bb(m);t.push(Rb(`mem_${d}`,`M${d}`,320,d*80,x,h.input,h.output)),a.push(_t(`ed${d}`,`in_d${d}`,"out",`mem_${d}`,"grp_in_0")),a.push(_t(`ewe${d}`,"in_we","out",`mem_${d}`,"grp_in_1")),a.push(_t(`eq${d}`,`mem_${d}`,"grp_out_0",`out_q${d}`,"in"))}return{id:"__builtin_memory_8bit",label:"Mémoire 8-bit",circuit:{nodes:t,edges:a},inputHandles:i,outputHandles:l}})(),GE=[JE,qE,VE,ZE],YE=["basics","components","systems","computer","free"];function XE({scenesOpen:t,allScenes:a,activeSceneId:i,savedModules:l,onToggleScenes:o,onLoadScene:c,onDeleteScene:d,onSaveScene:m,onAddNode:x,onInstantiateModule:h,onDeleteModule:b}){const{messages:g}=Ot(),v=g.hardwareSidebar,L=YE.map(w=>({title:v.sceneLevels[w],scenes:a.filter(N=>N.level===w)})).concat({title:v.mySavedScenes,scenes:a.filter(w=>!w.level)}).filter(w=>w.scenes.length>0);return u.jsxs("div",{className:"w-64 bg-slate-900 border-r border-slate-800 p-4 flex flex-col gap-6 overflow-y-auto z-10",children:[u.jsxs("div",{children:[u.jsxs("button",{onClick:o,className:"w-full flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 hover:text-slate-300 transition-colors",children:[u.jsxs("span",{children:[u.jsx(aT,{size:12,className:"inline mr-1.5 -mt-0.5"}),v.scenes]}),u.jsx(hN,{size:14,className:`transition-transform ${t?"rotate-0":"-rotate-90"}`})]}),t&&u.jsxs("div",{className:"flex flex-col gap-4 mt-2",children:[L.map(w=>u.jsxs("div",{className:"flex flex-col gap-1.5",children:[u.jsx("h4",{className:"text-[10px] font-bold text-slate-600 uppercase tracking-wider px-0.5",children:w.title}),w.scenes.map(N=>{const T=v.sceneDescriptions[N.id],C=N.id===i;return u.jsxs("div",{className:`relative rounded text-sm transition-colors group border ${C?"bg-yellow-500/10 border-yellow-500/70":"bg-slate-800 hover:bg-slate-700 border-yellow-900/50"}`,children:[u.jsxs("button",{onClick:()=>c(N),className:"w-full text-left p-2.5 flex flex-col gap-1.5",title:T??v.loadScene(N.name),children:[u.jsxs("span",{className:"flex items-center gap-2",children:[u.jsx(ON,{size:14,className:`shrink-0 ${C?"text-yellow-300":"text-yellow-400"}`}),u.jsx("span",{className:`font-bold truncate flex-1 ${C?"text-yellow-100":""} ${N.builtIn?"":"pr-5"}`,children:N.name})]}),C&&T&&u.jsx("span",{className:"text-[11px] leading-snug text-slate-400",children:T})]}),!N.builtIn&&u.jsx("button",{onClick:()=>d(N.id),className:"absolute right-2.5 top-2.5 text-slate-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all",title:v.deleteScene,children:u.jsx(gs,{size:14})})]},N.id)})]},w.title)),u.jsxs("button",{onClick:m,className:"bg-slate-800/50 hover:bg-slate-700 border border-dashed border-yellow-900/50 rounded p-2 text-xs flex items-center justify-center gap-1.5 transition-colors text-slate-400 hover:text-yellow-400",children:[u.jsx(eb,{size:12})," ",v.saveScene]})]})]}),u.jsxs("div",{children:[u.jsx("h3",{className:"text-xs font-bold text-slate-500 uppercase tracking-wider mb-3",children:v.simpleIo}),u.jsxs("div",{className:"grid grid-cols-2 gap-2",children:[u.jsxs("button",{onClick:()=>x("input"),className:"bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded p-2 text-sm flex flex-col items-center gap-1 transition-colors",children:[u.jsx(Gc,{size:16,className:"text-blue-400"})," ",v.switch]}),u.jsxs("button",{onClick:()=>x("output"),className:"bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded p-2 text-sm flex flex-col items-center gap-1 transition-colors",children:[u.jsx(DN,{size:16,className:"text-green-400"})," ",v.led]})]})]}),u.jsxs("div",{children:[u.jsx("h3",{className:"text-xs font-bold text-slate-500 uppercase tracking-wider mb-3",children:v.io8Bit}),u.jsxs("div",{className:"grid grid-cols-2 gap-2",children:[u.jsxs("button",{onClick:()=>x("inputNumber"),className:"bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded p-2 text-sm flex flex-col items-center gap-1 transition-colors",children:[u.jsx("span",{className:"font-mono text-blue-400 font-bold text-lg leading-none",children:"123"}),u.jsx("span",{className:"text-[10px]",children:v.numIn})]}),u.jsxs("button",{onClick:()=>x("outputNumber"),className:"bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded p-2 text-sm flex flex-col items-center gap-1 transition-colors",children:[u.jsx("span",{className:"font-mono text-green-400 font-bold text-lg leading-none",children:"123"}),u.jsx("span",{className:"text-[10px]",children:v.numOut})]})]})]}),u.jsxs("div",{children:[u.jsx("h3",{className:"text-xs font-bold text-slate-500 uppercase tracking-wider mb-3",children:v.logicGates}),u.jsxs("div",{className:"grid grid-cols-2 gap-2",children:[["AND","OR","XOR","NAND","NOR","NOT"].map(w=>u.jsx("button",{onClick:()=>x("gate",w),className:"bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded p-2 text-sm font-mono font-bold transition-colors",children:w},w)),u.jsx("button",{onClick:()=>x("transistor","nmos"),className:"bg-slate-800 hover:bg-slate-700 border border-amber-900/50 rounded p-2 text-sm font-mono font-bold transition-colors",title:v.nmosTitle,children:"NMOS"}),u.jsx("button",{onClick:()=>x("transistor","pmos"),className:"bg-slate-800 hover:bg-slate-700 border border-rose-900/50 rounded p-2 text-sm font-mono font-bold transition-colors",title:v.pmosTitle,children:"PMOS"})]})]}),u.jsxs("div",{children:[u.jsx("h3",{className:"text-xs font-bold text-slate-500 uppercase tracking-wider mb-3",children:v.builtInModules}),u.jsxs("div",{className:"flex flex-col gap-2",children:[u.jsxs("button",{onClick:()=>x("adder8"),className:"bg-slate-800 hover:bg-slate-700 border border-blue-900/50 rounded p-3 text-sm flex items-center gap-3 transition-colors",children:[u.jsx(tl,{size:18,className:"text-blue-400"}),u.jsx("span",{className:"font-bold",children:v.adder8})]}),u.jsxs("button",{onClick:()=>x("sram8"),className:"bg-slate-800 hover:bg-slate-700 border border-amber-900/50 rounded p-3 text-sm flex items-center gap-3 transition-colors",children:[u.jsx(Af,{size:18,className:"text-amber-400"}),u.jsx("span",{className:"font-bold",children:v.sram8})]}),u.jsxs("button",{onClick:()=>x("bus8"),className:"bg-slate-800 hover:bg-slate-700 border border-slate-500/50 rounded p-3 text-sm flex items-center gap-3 transition-colors",children:[u.jsx("div",{className:"flex flex-col gap-[2px]",children:[1,2,3].map(w=>u.jsx("div",{className:"w-4 h-[2px] bg-slate-400"},w))}),u.jsx("span",{className:"font-bold",children:v.bus8})]})]})]}),u.jsxs("div",{children:[u.jsx("h3",{className:"text-xs font-bold text-slate-500 uppercase tracking-wider mb-3",children:v.cpuComponents}),u.jsxs("div",{className:"flex flex-col gap-2",children:[u.jsxs("button",{onClick:()=>x("clock"),className:"bg-slate-800 hover:bg-slate-700 border border-green-900/50 rounded p-3 text-sm flex items-center gap-3 transition-colors",children:[u.jsx(Y_,{size:18,className:"text-green-400"}),u.jsx("span",{className:"font-bold",children:v.clock})]}),u.jsxs("button",{onClick:()=>x("register8"),className:"bg-slate-800 hover:bg-slate-700 border border-cyan-900/50 rounded p-3 text-sm flex items-center gap-3 transition-colors",children:[u.jsx(Zc,{size:18,className:"text-cyan-400"}),u.jsx("span",{className:"font-bold",children:v.register8})]}),u.jsxs("button",{onClick:()=>x("alu8"),className:"bg-slate-800 hover:bg-slate-700 border border-orange-900/50 rounded p-3 text-sm flex items-center gap-3 transition-colors",children:[u.jsx(G_,{size:18,className:"text-orange-400"}),u.jsx("span",{className:"font-bold",children:v.alu8})]}),u.jsxs("button",{onClick:()=>x("mux8"),className:"bg-slate-800 hover:bg-slate-700 border border-indigo-900/50 rounded p-3 text-sm flex items-center gap-3 transition-colors",children:[u.jsx(F_,{size:18,className:"text-indigo-400"}),u.jsx("span",{className:"font-bold",children:v.mux8})]}),u.jsxs("button",{onClick:()=>x("console"),className:"bg-slate-800 hover:bg-slate-700 border border-emerald-900/50 rounded p-3 text-sm flex items-center gap-3 transition-colors",children:[u.jsx(wf,{size:18,className:"text-emerald-400"}),u.jsx("span",{className:"font-bold",children:v.console})]}),u.jsxs("button",{onClick:()=>x("plotter"),className:"bg-slate-800 hover:bg-slate-700 border border-cyan-900/50 rounded p-3 text-sm flex items-center gap-3 transition-colors",children:[u.jsx(yf,{size:18,className:"text-cyan-400"}),u.jsx("span",{className:"font-bold",children:v.plotter})]}),u.jsxs("button",{onClick:()=>x("keyboard"),className:"bg-slate-800 hover:bg-slate-700 border border-violet-900/50 rounded p-3 text-sm flex items-center gap-3 transition-colors",children:[u.jsx(vf,{size:18,className:"text-violet-400"}),u.jsx("span",{className:"font-bold",children:v.keyboard})]}),u.jsxs("button",{onClick:()=>x("drive"),className:"bg-slate-800 hover:bg-slate-700 border border-amber-900/50 rounded p-3 text-sm flex items-center gap-3 transition-colors",children:[u.jsx(Gr,{size:18,className:"text-amber-400"}),u.jsx("span",{className:"font-bold",children:v.externalDrive})]}),u.jsxs("button",{onClick:()=>x("network"),className:"bg-slate-800 hover:bg-slate-700 border border-sky-900/50 rounded p-3 text-sm flex items-center gap-3 transition-colors",children:[u.jsx(bf,{size:18,className:"text-sky-400"}),u.jsx("span",{className:"font-bold",children:v.networkController})]})]})]}),u.jsxs("div",{children:[u.jsx("h3",{className:"text-xs font-bold text-slate-500 uppercase tracking-wider mb-3",children:v.logicModules}),u.jsx("div",{className:"flex flex-col gap-2",children:GE.map(w=>u.jsxs("button",{onClick:()=>h(w),className:"bg-slate-800 hover:bg-slate-700 border border-purple-900/50 rounded p-3 text-sm flex items-center gap-3 transition-colors",title:v.addModule(w.label),children:[u.jsx(nl,{size:16,className:"text-purple-400"}),u.jsx("span",{className:"font-bold text-left truncate",children:w.label})]},w.id))})]}),l.length>0&&u.jsxs("div",{children:[u.jsx("h3",{className:"text-xs font-bold text-slate-500 uppercase tracking-wider mb-3",children:v.myModules}),u.jsx("div",{className:"flex flex-col gap-2",children:l.map(w=>u.jsxs("div",{className:"relative bg-slate-800 hover:bg-slate-700 border border-purple-900/50 rounded text-sm transition-colors group",children:[u.jsxs("button",{onClick:()=>h(w),className:"w-full p-3 flex items-center gap-2 text-left",title:v.addModule(w.label),children:[u.jsx(nl,{size:16,className:"text-purple-400 shrink-0"}),u.jsx("span",{className:"font-bold truncate flex-1 pr-5",children:w.label})]}),u.jsx("button",{onClick:()=>b(w.id),className:"absolute right-3 top-1/2 -translate-y-1/2 text-slate-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all",title:v.deleteModule,children:u.jsx(gs,{size:14})})]},w.id))})]}),u.jsx("div",{className:"mt-auto pt-4 border-t border-slate-800",children:u.jsx("p",{className:"text-xs text-slate-500 leading-relaxed",children:v.footer})})]})}function FE({hwCpuLoaded:t,hwCpuRunning:a,hwCpuHalted:i,hwRunSpeed:l,hwClockFreq:o,onStep:c,onRun:d,onStop:m,onReset:x,onRunSpeedChange:h}){const{messages:b}=Ot(),g=b.hardwareCpuControls;return u.jsxs("div",{className:"flex items-center gap-2 px-4 py-2 bg-slate-900 border-b border-slate-800 shrink-0",children:[u.jsx("span",{className:"text-xs font-bold text-slate-500 uppercase tracking-wider mr-2",children:"CPU"}),u.jsxs("button",{onClick:c,disabled:!t||a||i,className:"flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-bold transition-colors bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed",children:[u.jsx(tb,{size:14})," ",g.step]}),a?u.jsxs("button",{onClick:m,className:"flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-bold transition-colors bg-red-500/20 text-red-400 border border-red-500/50 hover:bg-red-500/30",children:[u.jsx(Gc,{size:14})," ",g.stop]}):u.jsxs("button",{onClick:d,disabled:!t||i,className:"flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-bold transition-colors bg-green-500/20 text-green-400 border border-green-500/50 hover:bg-green-500/30 disabled:opacity-30 disabled:cursor-not-allowed",children:[u.jsx(Lf,{size:14})," ",g.run]}),u.jsxs("button",{onClick:x,className:"flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-bold transition-colors bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700",children:[u.jsx(Q_,{size:14})," ",g.reset]}),u.jsx("div",{className:"w-px h-6 bg-slate-700 mx-1"}),u.jsxs("div",{className:"flex items-center gap-2",children:[u.jsx(X_,{size:14,className:"text-slate-500"}),u.jsx("input",{type:"range",min:1,max:1e5,value:l,onChange:v=>h(parseInt(v.target.value)),className:"w-20 accent-blue-500"}),u.jsxs("span",{className:"text-[10px] text-slate-500 font-mono w-20",children:[l," ",g.instructionsPerTick]}),u.jsxs("span",{className:"text-[10px] text-slate-600 font-mono",children:["(",o>=1?`${Math.round(o*l)} ${g.instructionsPerSecond}`:`${(o*l).toFixed(1)} ${g.instructionsPerSecond}`,")"]})]}),u.jsxs("div",{className:"ml-auto flex items-center gap-2",children:[!t&&u.jsx("span",{className:"text-xs text-slate-500",children:g.assembleHint}),i&&u.jsx("span",{className:"text-xs font-bold text-red-400 bg-red-500/10 px-2 py-0.5 rounded border border-red-500/30",children:g.halted}),a&&u.jsx("span",{className:"text-xs font-bold text-green-400 bg-green-500/10 px-2 py-0.5 rounded border border-green-500/30 animate-pulse",children:g.running}),t&&!a&&!i&&u.jsx("span",{className:"text-xs font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/30",children:g.ready})]})]})}const Fx=t=>JSON.parse(JSON.stringify(t.nodes)),Kx=t=>JSON.parse(JSON.stringify(t.edges));function KE(){const t=z.useMemo(()=>OT(),[]),[a,i]=R0("logique_locale","auto"),l=a==="auto"?t:a,o=l==="fr",[c,d,m]=U_(Fx(E0)),[x,h,b]=$_(Kx(E0)),[g,v]=z.useState(!0),[L,w]=z.useState("hardware"),[N,T]=z.useState(null),[C,B]=z.useState(!0),[D,E]=z.useState(E0.id),_=z.useRef(new F0),[P,S]=z.useState(!1),[X,F]=z.useState(!1),[$,H]=z.useState(!1),[te,oe]=z.useState(10),I=z.useRef(null),J=z.useRef(null),R=z.useMemo(()=>{var Ee;const we=c.find($e=>$e.id==="clk");return((Ee=we==null?void 0:we.data)==null?void 0:Ee.frequency)??1},[c]),[Z,G]=R0("logique_saved_modules",[]),[K,ne]=R0("logique_saved_scenes",[]);z.useEffect(()=>{const we=Ee=>T(Ee.detail);return window.addEventListener("inspect-node",we),()=>window.removeEventListener("inspect-node",we)},[]),z.useEffect(()=>{const we=Ee=>{const $e=Ee.detail,me=c.find(st=>st.id===$e&&st.type==="group");if(!me)return;const tt=me.data,Se=prompt(o?"Nom du module à sauvegarder :":"Module name to save:",tt.label)||tt.label,nt=er();G(st=>[...st,{id:nt,label:Se,circuit:{nodes:tt.circuit.nodes.map(Zt=>({...Zt,data:{...Zt.data}})),edges:tt.circuit.edges.map(Zt=>({...Zt}))},inputHandles:tt.inputHandles.map(Zt=>({...Zt})),outputHandles:tt.outputHandles.map(Zt=>({...Zt}))}])};return window.addEventListener("save-module",we),()=>window.removeEventListener("save-module",we)},[o,c,G]),z.useEffect(()=>{const we=Ee=>{const{id:$e,newLabel:me}=Ee.detail;d(tt=>tt.map(Se=>Se.id===$e&&Se.type==="group"?{...Se,data:{...Se.data,label:me}}:Se))};return window.addEventListener("rename-module",we),()=>window.removeEventListener("rename-module",we)},[d]),z.useEffect(()=>{const we=Ee=>{const{text:$e,nodeId:me}=Ee.detail,tt=_.current;for(let Se=0;Se<$e.length;Se++)tt.pushInput($e.charCodeAt(Se));tt.pushInput(10),me&&d(Se=>Se.map(nt=>{if(nt.id===me&&nt.type==="console"){const st=nt.data.inputBuffer||[],Zt=[];for(let Zn=0;Zn<$e.length;Zn++)Zt.push($e.charCodeAt(Zn));Zt.push(10);const Dn=[...st,...Zt];return{...nt,data:{...nt.data,inputBuffer:Dn,inputBufferSize:Dn.length,avail:1}}}return nt}))};return window.addEventListener("console-input",we),()=>window.removeEventListener("console-input",we)},[d]),z.useEffect(()=>{const we=Ee=>{const{id:$e,frequency:me}=Ee.detail;d(tt=>tt.map(Se=>Se.id===$e&&Se.type==="clock"?{...Se,data:{...Se.data,frequency:me}}:Se))};return window.addEventListener("clock-frequency",we),()=>window.removeEventListener("clock-frequency",we)},[d]),z.useEffect(()=>{const we=Ee=>{const{index:$e,value:me}=Ee.detail,tt=_.current;$e>=0&&$e<5&&(tt.keyState[$e]=me),d(Se=>Se.map(nt=>{if(nt.type==="keyboard"){const st=[...nt.data.keys||[0,0,0,0,0]];return st[$e]=me,{...nt,data:{...nt.data,keys:st}}}return nt}))};return window.addEventListener("keyboard-state",we),()=>window.removeEventListener("keyboard-state",we)},[d]),z.useEffect(()=>{const we=Ee=>{const{nodeId:$e,...me}=Ee.detail;d(tt=>tt.map(Se=>Se.id===$e&&Se.type==="network"?{...Se,data:{...Se.data,...me}}:Se))};return window.addEventListener("network-node-config",we),()=>window.removeEventListener("network-node-config",we)},[d]),z.useEffect(()=>{const we=Ee=>{const{nodeId:$e,requestSerial:me,text:tt}=Ee.detail,Se=Array.from(new TextEncoder().encode(tt),nt=>nt&255);d(nt=>nt.map(st=>st.id!==$e||st.type!=="network"||st.data.requestSerial!==me?st:{...st,data:{...st.data,q:Array(8).fill(0),avail:Se.length>0?1:0,pending:0,responseBuffer:Se,responseSize:Se.length,lastByte:0}}))};return window.addEventListener("network-node-response",we),()=>window.removeEventListener("network-node-response",we)},[d]),z.useEffect(()=>{if(!g)return;const Ee=setInterval(()=>{d($e=>Cf($e,x)),h($e=>sb(c,$e))},50);return()=>clearInterval(Ee)},[x,c,g,P,d,h]);const j=z.useCallback(we=>h(Ee=>Gg({...we,animated:!1,style:{stroke:"#475569",strokeWidth:2}},Ee)),[h]),M=z.useCallback((we,Ee)=>{d($e=>$e.map(me=>me.id===we?{...me,data:{...me.data,value:Ee}}:me))},[d]),V=z.useMemo(()=>c.map(we=>we.type==="input"||we.type==="inputNumber"?{...we,data:{...we.data,onChange:M}}:we),[c,M]),ee=z.useCallback(()=>{const we=er(),Ee=`Module_${we.slice(0,4)}`,$e=prompt(o?"Nom du module :":"Module name:",Ee)||Ee,me=OE(c,x,we,$e);me&&(d(tt=>jE(tt,me.selectedIds,me.groupNode)),h(tt=>BE(tt,me.selectedIds,me.edgeRewrites,we)))},[x,o,c,h,d]),xe=z.useCallback(we=>{const Ee=c.find(Se=>Se.id===we&&Se.type==="group");if(!Ee)return;const{restoredNodes:$e,restoredEdges:me,rewiredEdges:tt}=PE(Ee);d(Se=>zE(Se,we,$e)),h(Se=>UE(Se,we,tt,me))},[c,d,h]);z.useEffect(()=>{const we=Ee=>xe(Ee.detail);return window.addEventListener("ungroup-node",we),()=>window.removeEventListener("ungroup-node",we)},[xe]),z.useEffect(()=>{const we=Ee=>{(Ee.ctrlKey||Ee.metaKey)&&Ee.key==="g"&&(Ee.preventDefault(),ee())};return window.addEventListener("keydown",we),()=>window.removeEventListener("keydown",we)},[ee]);const be=z.useCallback(we=>{d(Ee=>[...Ee,kE(we)])},[d]),Le=z.useCallback((we,Ee)=>{const $e=RE(we,Ee,l);$e&&d(me=>[...me,$e])},[l,d]),pe=()=>{d([]),h([]),E(null)},Te=z.useCallback(we=>{d(Fx(we)),h(Kx(we)),E(we.id),_.current=new F0,S(!1),F(!1),H(!1),I.current!==null&&(clearInterval(I.current),I.current=null)},[d,h]),Ze=z.useCallback(()=>{const we=window.prompt(o?"Nom de la scène :":"Scene name:");if(!we||!we.trim())return;const Ee={id:er(),name:we.trim(),nodes:JSON.parse(JSON.stringify(c)),edges:JSON.parse(JSON.stringify(x))};ne($e=>[...$e,Ee]),E(Ee.id)},[x,o,c,ne]),Me=z.useMemo(()=>[...Q0,...K],[K]),Be=z.useCallback(we=>{d(Ee=>$E(Ee,we))},[d]),Pe=z.useCallback(we=>{J.current=we;const Ee=_.current;Ee.loadDriveData(we.driveData),Ee.driveLastAddr=we.driveLastAddr,Ee.driveLastRead=we.driveLastRead&255,Ee.driveLastWrite=we.driveLastWrite&255,L==="hardware"&&Be(we)},[L,Be]);z.useEffect(()=>{L==="hardware"&&J.current&&Be(J.current)},[L,Be]);const He=z.useCallback(()=>{const we=_.current;d(Ee=>IE(Ee,we))},[d]),at=z.useCallback(we=>{const Ee=_.current;Ee.reset(),Ee.loadProgram(we.bytes,we.startAddr),S(!0),F(!1),H(!1),He()},[He]),Xe=z.useCallback(()=>{if(!P||$)return;const we=_.current;we.step(),we.state.halted&&H(!0),He()},[P,$,He]),Ct=z.useCallback(()=>{!P||$||F(!0)},[P,$]),nn=z.useCallback(()=>{F(!1)},[]),Pt=z.useCallback(()=>{_.current.reset(),S(!1),F(!1),H(!1),He(),d(Ee=>HE(Ee))},[d,He]);z.useEffect(()=>{if(!X){I.current!==null&&(clearInterval(I.current),I.current=null);return}const we=Math.max(16,Math.round(1e3/R));return I.current=window.setInterval(()=>{const Ee=_.current;for(let $e=0;$e<te;$e++)if(!Ee.step()){F(!1),H(!0);break}He()},we),()=>{I.current!==null&&(clearInterval(I.current),I.current=null)}},[X,te,R,He]);const St=c.some(we=>we.selected);return u.jsx(jT,{locale:l,children:u.jsxs("div",{className:"h-screen w-full flex flex-col bg-slate-950 text-slate-200 font-sans",children:[u.jsxs("header",{className:"bg-slate-900 border-b border-slate-800 h-14 flex items-center justify-between px-6 shrink-0 z-10",children:[u.jsxs("div",{className:"flex items-center gap-3",children:[u.jsx("div",{className:"w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.5)]",children:u.jsx(tl,{size:20,className:"text-white"})}),u.jsx("h1",{className:"text-lg font-bold tracking-tight text-white",children:o?"Logique & Systèmes":"Logic & Systems"})]}),u.jsxs("div",{className:"flex items-center gap-4",children:[u.jsxs("label",{className:"flex items-center gap-2 rounded-md border border-slate-700 bg-slate-800 px-2.5 py-1.5 text-xs font-bold text-slate-300",children:[u.jsx("span",{className:"text-slate-500",children:o?"Langue":"Language"}),u.jsxs("select",{value:a,onChange:we=>i(we.target.value),className:"bg-transparent text-slate-100 outline-none",children:[u.jsx("option",{value:"auto",className:"bg-slate-800 text-slate-100",children:"Auto"}),u.jsx("option",{value:"en",className:"bg-slate-800 text-slate-100",children:"English"}),u.jsx("option",{value:"fr",className:"bg-slate-800 text-slate-100",children:"Français"})]})]}),St&&u.jsxs("button",{onClick:ee,className:"flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-bold transition-colors bg-purple-500/20 text-purple-400 border border-purple-500/50 hover:bg-purple-500/30",title:o?"Grouper la sélection (Ctrl+G)":"Group selection (Ctrl+G)",children:[u.jsx(nl,{size:16})," ",o?"Grouper":"Group"]}),u.jsx("button",{onClick:()=>v(!g),className:`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-bold transition-colors ${g?"bg-green-500/20 text-green-400 border border-green-500/50":"bg-slate-800 text-slate-400 border border-slate-700"}`,children:g?u.jsxs(u.Fragment,{children:[u.jsx(Lf,{size:16})," ",o?"En cours":"Running"]}):u.jsxs(u.Fragment,{children:[u.jsx(Gc,{size:16})," ",o?"En pause":"Paused"]})}),u.jsx("button",{onClick:pe,className:"text-slate-400 hover:text-red-400 transition-colors",title:o?"Tout effacer":"Clear all",children:u.jsx(gs,{size:18})})]})]}),u.jsxs("div",{className:"bg-slate-900 border-b border-slate-800 flex px-6 shrink-0 z-10",children:[u.jsx("button",{onClick:()=>w("hardware"),className:`px-4 py-2 text-sm font-bold transition-colors border-b-2 ${L==="hardware"?"border-blue-500 text-white":"border-transparent text-slate-500 hover:text-slate-300"}`,children:o?"Matériel":"Hardware"}),u.jsx("button",{onClick:()=>w("software"),className:`px-4 py-2 text-sm font-bold transition-colors border-b-2 ${L==="software"?"border-blue-500 text-white":"border-transparent text-slate-500 hover:text-slate-300"}`,children:o?"Logiciel":"Software"}),u.jsx("button",{onClick:()=>w("userguide-en"),className:`px-4 py-2 text-sm font-bold transition-colors border-b-2 ${L==="userguide-en"?"border-blue-500 text-white":"border-transparent text-slate-500 hover:text-slate-300"}`,children:o?"Guide EN":"EN Guide"}),u.jsx("button",{onClick:()=>w("userguide-fr"),className:`px-4 py-2 text-sm font-bold transition-colors border-b-2 ${L==="userguide-fr"?"border-blue-500 text-white":"border-transparent text-slate-500 hover:text-slate-300"}`,children:o?"Guide FR":"FR Guide"})]}),L==="software"?u.jsx(Z5,{onHardwareSync:Pe,onProgramLoaded:at}):L==="userguide-en"?u.jsx(Yx,{markdown:ME,title:o?"Guide utilisateur (anglais)":"User Guide (English)",subtitle:o?"Inclus directement dans l’application pour que la documentation fasse partie du même build que le simulateur.":"Bundled directly into the application so the guide ships inside the same build as the simulator."}):L==="userguide-fr"?u.jsx(Yx,{markdown:EE,title:o?"Guide utilisateur (français)":"User Guide (French)",subtitle:o?"Inclus directement dans l’application pour que la documentation fasse partie du build, au même titre que le simulateur.":"Bundled directly into the application so the documentation ships inside the same build as the simulator."}):u.jsxs("div",{className:"flex-1 flex relative min-h-0 overflow-hidden",children:[N&&u.jsx(sM,{type:N,onClose:()=>T(null),mainNodes:c}),u.jsx(XE,{scenesOpen:C,allScenes:Me,activeSceneId:D,savedModules:Z,onToggleScenes:()=>B(we=>!we),onLoadScene:Te,onDeleteScene:we=>{ne(Ee=>Ee.filter($e=>$e.id!==we)),E(Ee=>Ee===we?null:Ee)},onSaveScene:Ze,onAddNode:Le,onInstantiateModule:be,onDeleteModule:we=>G(Ee=>Ee.filter($e=>$e.id!==we))}),u.jsxs("div",{className:"flex-1 flex flex-col h-full min-h-0 bg-slate-950",children:[u.jsx(FE,{hwCpuLoaded:P,hwCpuRunning:X,hwCpuHalted:$,hwRunSpeed:te,hwClockFreq:R,onStep:Xe,onRun:Ct,onStop:nn,onReset:Pt,onRunSpeedChange:oe}),u.jsx("div",{className:"flex-1 min-h-0",children:u.jsxs(z_,{nodes:V,edges:x,onNodesChange:m,onEdgesChange:b,onConnect:j,nodeTypes:ib,fitView:!0,className:"bg-slate-950",colorMode:"dark",children:[u.jsx(H_,{color:"#334155",gap:20,size:1}),u.jsx(q_,{className:"bg-slate-800 border-slate-700 fill-slate-300"})]})})]})]})]})})}Kv.createRoot(document.getElementById("root")).render(u.jsx(z.StrictMode,{children:u.jsx(KE,{})}));
