(this["webpackJsonptwitter-me"]=this["webpackJsonptwitter-me"]||[]).push([[0],{23:function(e,t,n){},29:function(e,t,n){},30:function(e,t,n){},31:function(e,t,n){},32:function(e,t,n){},33:function(e,t,n){"use strict";n.r(t);var c=n(0),r=n(1),o=n.n(r),i=n(16),s=n.n(i),a=(n(23),n(3)),j=n(8),l=n(2);function u(e){var t=e.login,n=Object(l.g)();return Object(c.jsxs)(c.Fragment,{children:[Object(c.jsx)("button",{onClick:function(){t(!0),n.push("/home")},children:"Login"}),Object(c.jsx)("button",{onClick:function(){fetch("/api/sign-in-with-twitter").then((function(e){return e.text()})).then((function(e){window.location=e}))},children:"Sign in with Twitter"})]})}n(29);function h(e){return e.show?Object(c.jsx)(c.Fragment,{children:Object(c.jsx)("div",{onClick:e.close,id:"ModalBackDrop",className:"Modal",children:Object(c.jsxs)("div",{className:"ModalContent",children:[Object(c.jsx)("button",{onClick:e.close,id:"ModalCloseButton",children:"Close"}),e.children]})})}):null}n(30);function b(e){var t=Object(r.useState)(""),n=Object(a.a)(t,2),o=n[0],i=n[1];return Object(c.jsxs)(c.Fragment,{children:[Object(c.jsx)("input",{placeholder:"what's happening?",onChange:function(e){e.preventDefault();var t=e.target.value;i(t)},value:o}),Object(c.jsx)("button",{onClick:function(){fetch("/api/status/update?status=".concat(o)).then((function(t){t.ok&&(e.getTweets(),i(""))})).catch((function(e){alert("There was the following network error ".concat(e)),console.error(e)}))},children:"Tweet"})]})}n(31);function O(e){var t=Object(r.useState)(!1),n=Object(a.a)(t,2),o=n[0],i=n[1];return Object(c.jsxs)(c.Fragment,{children:[Object(c.jsx)(h,{show:o,close:function(e){var t="ModalBackDrop"===e.target.id,n="ModalCloseButton"===e.target.id;(t||n)&&i(!1)},children:Object(c.jsx)(b,{})}),Object(c.jsxs)("ul",{children:[Object(c.jsx)("li",{children:Object(c.jsx)(j.b,{to:"/home",activeClassName:"active",children:"home"})}),Object(c.jsx)("li",{children:Object(c.jsx)(j.b,{to:"/profile",activeClassName:"active",children:"profile"})}),Object(c.jsx)("li",{children:Object(c.jsx)("button",{onClick:function(){i(!0)},children:"Tweet"})}),Object(c.jsx)("li",{children:Object(c.jsx)("button",{onClick:e.logout,children:"Logout"})})]})]})}function d(e){var t=Object(r.useState)([]),n=Object(a.a)(t,2),o=n[0],i=n[1],s=Object(r.useState)([]),j=Object(a.a)(s,2),l=j[0],u=j[1],h=Object(r.useState)(""),b=Object(a.a)(h,2),O=b[0],d=b[1],f=Object(r.useState)(!1),g=Object(a.a)(f,2),x=g[0],p=g[1];return Object(r.useEffect)((function(){fetch("/api/trends").then((function(e){return e.json()})).then((function(e){e.length>0&&i(e[0].trends)})).catch((function(e){return console.error(e)}))}),[]),Object(c.jsxs)(c.Fragment,{children:[Object(c.jsx)("br",{}),Object(c.jsx)("input",{type:"text",placeholder:"search twitter...",onChange:function(e){e.preventDefault();var t=e.target.value;d(t)},value:O}),Object(c.jsx)("button",{onClick:function(){fetch("/api/search?q=".concat(O)).then((function(e){return e.json()})).then((function(e){p(!0),u(e.statuses),d("")})).catch((function(e){return console.log(e)}))},children:"Search"}),Object(c.jsx)("ul",{children:x?l.map((function(e){return Object(c.jsx)("li",{children:e.text},e.id)})):o.map((function(e,t){return Object(c.jsx)("li",{children:e.name},t)}))})]})}function f(e){var t=Object(r.useState)(""),n=Object(a.a)(t,2),o=(n[0],n[1],Object(r.useState)([])),i=Object(a.a)(o,2),s=i[0],j=i[1],l=e.setIsLoggedIn;function u(){fetch("/api/home-timeline").then((function(e){return e.json()})).then((function(e){if(e.errors)return alert(e.errors[0].message),void console.error(e.errors[0].message);e&&j(e)})).catch((function(e){alert("There was the following network error ".concat(e)),console.error(e)}))}return Object(r.useEffect)((function(){u()}),[]),Object(c.jsxs)(c.Fragment,{children:[Object(c.jsx)(O,{logout:function(){return l(!1)}}),Object(c.jsx)("h1",{children:"Home"}),Object(c.jsx)(b,{getTweets:u}),Object(c.jsx)("ul",{children:s.map((function(e){return Object(c.jsx)("li",{children:e.text},e.id)}))}),Object(c.jsx)(d,{})]})}function g(e){var t=e.details,n=e.onEditButtonClick;return t?Object(c.jsxs)(c.Fragment,{children:[Object(c.jsx)("h1",{children:"Profile"}),Object(c.jsx)("img",{src:t.profile_banner_url,alt:"profile-banner"}),Object(c.jsx)("img",{src:t.profile_image_url,alt:"profile-pic"}),Object(c.jsx)("button",{onClick:n,children:"Edit profile"}),Object(c.jsx)("p",{children:Object(c.jsx)("strong",{children:t.name})}),Object(c.jsx)("p",{children:t.screen_name}),Object(c.jsx)("p",{children:t.description}),Object(c.jsx)("p",{children:t.created_at}),Object(c.jsxs)("p",{children:["Following ",t.friends_count]}),Object(c.jsxs)("p",{children:["Followers ",t.followers_count]}),Object(c.jsx)("ul",{})]}):Object(c.jsx)("p",{children:"Loading..."})}function x(e){var t=e.setIsLoggedIn,n=Object(r.useState)(null),o=Object(a.a)(n,2),i=o[0],s=o[1],j=Object(r.useState)(!1),l=Object(a.a)(j,2),u=l[0],b=l[1],f=Object(r.useState)(""),x=Object(a.a)(f,2),p=x[0],m=x[1],w=Object(r.useState)(""),v=Object(a.a)(w,2),k=v[0],C=v[1],S=Object(r.useState)(""),_=Object(a.a)(S,2),F=_[0],I=_[1];return Object(r.useEffect)((function(){fetch("api/profile-details").then((function(e){return e.json()})).then((function(e){m(e.name),C(e.description),I(e.profile_image_url),s(e)})).catch((function(e){alert("There was the following network error ".concat(e)),console.error(e)}))}),[]),Object(c.jsxs)(c.Fragment,{children:[Object(c.jsxs)(h,{show:u,close:function(e){var t="ModalBackDrop"===e.target.id,n="ModalCloseButton"===e.target.id;(t||n)&&b(!1)},children:[Object(c.jsx)("h1",{children:"Edit Profile"}),Object(c.jsxs)("form",{onSubmit:function(e){e.preventDefault(),fetch("/api/profile-update?name=".concat(p,"&description=").concat(k),{method:"POST"}).then((function(e){return e.json()})).then((function(e){e&&(m(e.name),C(e.description),s(e))})).catch((function(e){alert("There was the following network error ".concat(e)),console.error(e)})).finally((function(){return b(!1)}))},children:[Object(c.jsx)("input",{type:"file"}),Object(c.jsx)("br",{}),Object(c.jsx)("img",{src:F}),Object(c.jsx)("br",{}),Object(c.jsx)("input",{onChange:function(e){var t=e.target.value;m(t)},value:p}),Object(c.jsx)("br",{}),Object(c.jsx)("textarea",{rows:"4",cols:"50",onChange:function(e){var t=e.target.value;C(t)},value:k}),Object(c.jsx)("br",{}),Object(c.jsx)("input",{type:"submit",value:"Save"})]})]}),Object(c.jsx)(O,{logout:function(){return t(!1)}}),Object(c.jsx)(g,{details:i,onEditButtonClick:function(){b(!0)}}),Object(c.jsx)(d,{})]})}function p(e){var t=e.children,n=e.isLoggedIn;return Object(c.jsx)(l.b,{render:function(e){var r=e.location;return n?t:Object(c.jsx)(l.a,{to:{pathname:"/",state:{from:r}}})}})}function m(e){var t=e.login,n=Object(l.h)(),o=Object(l.g)(),i=new URLSearchParams(n.search),s=i.get("oauth_token"),a=i.get("oauth_verifier");return Object(r.useEffect)((function(){fetch("/api/access-token?oauth_token=".concat(s,"&oauth_verifier=").concat(a)).then((function(e){return e.json()})).then((function(e){e&&0===Object.keys(e).length&&(alert("Something went wrong. Do not press the reload putting while on this page"),console.error("Response object is empty. This means that the user reloaded the get-credentials page \n        or something went wrong with the signing process"),console.log("response object",e),o.push("/"))})).then((function(){t(!0),o.push("/home")})).catch((function(e){return console.log("Network error: ".concat(e))}))}),[s,a]),Object(c.jsx)("h1",{children:"Loading your profile..."})}n(32);var w=function(){var e=Object(r.useState)((function(){return Boolean(localStorage.getItem("screen_name"))})),t=Object(a.a)(e,2),n=t[0],o=t[1];return Object(c.jsx)(j.a,{children:Object(c.jsxs)(l.d,{children:[Object(c.jsx)(l.b,{exact:!0,path:"/",children:Object(c.jsx)(u,{login:o})}),Object(c.jsx)(l.b,{exact:!0,path:"/get-credentials",children:Object(c.jsx)(m,{login:o})}),Object(c.jsx)(p,{exact:!0,path:"/home",isLoggedIn:n,children:Object(c.jsx)(f,{setIsLoggedIn:o})}),Object(c.jsx)(p,{exact:!0,path:"/profile",isLoggedIn:n,children:Object(c.jsx)(x,{setIsLoggedIn:o})})]})})},v=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,34)).then((function(t){var n=t.getCLS,c=t.getFID,r=t.getFCP,o=t.getLCP,i=t.getTTFB;n(e),c(e),r(e),o(e),i(e)}))};s.a.render(Object(c.jsx)(o.a.StrictMode,{children:Object(c.jsx)(w,{})}),document.getElementById("root")),v()}},[[33,1,2]]]);
//# sourceMappingURL=main.7e24a039.chunk.js.map