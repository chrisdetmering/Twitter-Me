(this["webpackJsonptwitter-me"]=this["webpackJsonptwitter-me"]||[]).push([[0],Array(23).concat([function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},,,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var c=n(0),s=n(1),a=n.n(s),i=n(16),r=n.n(i),o=(n(23),n(2)),l=n(8),j=n(3);n(24),n(25);function h(e){var t=e.classes,n=e.children,s=e.click;return Object(c.jsx)("button",{className:"button ".concat(t),onClick:s,children:n})}var u=n.p+"static/media/TwitterLogoWhite.27cda7bd.png",d=n.p+"static/media/TwitterLogoBlue.f963dcac.png";function b(){return Object(c.jsxs)(c.Fragment,{children:[Object(c.jsx)("img",{src:u,alt:"",className:"twitter-logo-main"}),Object(c.jsxs)("div",{className:"login-container",children:[Object(c.jsx)("div",{className:"twitter-login-image-container",children:Object(c.jsx)("img",{src:"https://abs.twimg.com/sticky/illustrations/lohp_en_1302x955.png",alt:"",className:"twitter-login-image"})}),Object(c.jsx)("div",{className:"twitter-login-welcome",children:Object(c.jsxs)("div",{className:"login",children:[Object(c.jsx)("img",{src:d,alt:"",className:"twitter-logo-small"}),Object(c.jsx)("h1",{className:"twitter-login-header",children:"Happening Now"}),Object(c.jsx)("h4",{children:"Join Twitter Today."}),Object(c.jsx)("p",{className:"sign-up-notice",children:"*You will be taken to the actual Twitter website to make your account. You will then have to navigate back to this site to sign in with Twitter.*"}),Object(c.jsx)(h,{classes:"large dark",click:function(){window.open("https://mobile.twitter.com/i/flow/signup")},children:"Sign Up"}),Object(c.jsx)(h,{classes:"large light",click:function(){fetch("/api/sign-in-with-twitter").then((function(e){return e.text()})).then((function(e){window.location=e}))},children:"Sign in with Twitter"})]})})]})]})}n(26),n(27),n(28);function m(e){e.classes;return e.show?Object(c.jsx)(c.Fragment,{children:Object(c.jsx)("div",{className:"modal",id:"modal-backdrop",onClick:e.close,children:Object(c.jsxs)("div",{className:"modal-content",children:[Object(c.jsx)("span",{className:"material-icons close-button",id:"modal-close-button",onClick:e.close,children:"clear"}),e.children]})})}):null}n(29);function O(e){var t=e.getTweets,n=e.showModal,a=Object(s.useState)(""),i=Object(o.a)(a,2),r=i[0],l=i[1];return Object(c.jsx)(c.Fragment,{children:Object(c.jsxs)("div",{className:"new-tweet-container",children:[Object(c.jsx)("textarea",{className:"new-tweet-input",maxLength:"140",placeholder:"what's happening?",onChange:function(e){e.preventDefault();var t=e.target.value;l(t)},value:r}),Object(c.jsx)("div",{className:"new-tweet-button-container",children:Object(c.jsx)("div",{className:"button-container",children:Object(c.jsx)(h,{classes:"small light",click:function(){fetch("/api/status/update?status=".concat(r)).then((function(e){e.ok&&(t(),l(""))})).catch((function(e){alert("There was the following network error ".concat(e)),console.error(e)})).finally((function(){n&&n(!1)}))},children:"Tweet"})})})]})})}function f(e){var t=e.getTweets,n=Object(s.useState)(!1),a=Object(o.a)(n,2),i=a[0],r=a[1];return Object(c.jsxs)(c.Fragment,{children:[Object(c.jsx)(m,{classes:"medium",show:i,close:function(e){var t="modal-backdrop"===e.target.id,n="modal-close-button"===e.target.id;(t||n)&&r(!1)},children:Object(c.jsx)(O,{getTweets:t,showModal:r})}),Object(c.jsxs)("ul",{className:"nav-bar-items",children:[Object(c.jsx)("li",{className:"nav-bar-item logo-container",children:Object(c.jsx)(l.b,{to:"/home",children:Object(c.jsx)("img",{src:d,className:"logo"})})}),Object(c.jsx)("li",{className:"nav-bar-item",children:Object(c.jsxs)(l.c,{to:"/home",activeClassName:"active",className:"link",children:[Object(c.jsx)("span",{className:"material-icons icon",children:"home"}),Object(c.jsx)("p",{className:"text",children:"Home"})]})}),Object(c.jsx)("li",{className:"nav-bar-item",children:Object(c.jsxs)(l.c,{to:"/profile",activeClassName:"active",className:"link",children:[Object(c.jsx)("span",{className:"material-icons icon",children:"perm_identity"}),Object(c.jsx)("p",{className:"text",children:"Profile"})]})}),Object(c.jsx)("li",{children:Object(c.jsx)(h,{classes:"medium dark",click:function(){r(!0)},children:"Tweet"})}),Object(c.jsx)("li",{children:Object(c.jsx)(h,{classes:"medium light",click:e.logout,children:"Logout"})})]})]})}n(35),n(36);var x=n(45);n(37);function g(e){var t=e.tweet,n=e.search,s=(t.tweet_volume/1e3).toFixed(1);return Object(c.jsx)(c.Fragment,{children:Object(c.jsxs)("li",{className:"trending-tweet",onClick:function(){n(t.name.replace("#",""))},children:[Object(c.jsx)("p",{className:"trending-info",children:"Trending - USA"}),Object(c.jsx)("p",{className:"trending-tweet-text",children:t.name}),Object(c.jsxs)("p",{className:"trending-info",children:[s,"k Tweets"]})]})})}n(38);function p(e){return Object(c.jsx)("div",{className:"loader-container",children:Object(c.jsx)("div",{className:"loader"})})}function w(e){var t=e.tweets,n=e.search,s=e.loading,a=t.map((function(e){return Object(c.jsx)(g,{tweet:e,search:n},Object(x.a)())}));return Object(c.jsxs)("ul",{className:"trending-tweets-list",children:[Object(c.jsx)("li",{className:"trending-top",children:Object(c.jsx)("h3",{children:"What's happening"})}),s?Object(c.jsx)(p,{}):a,!s&&Object(c.jsx)("li",{className:"trending-bottom"})]})}function v(e){var t=Object(s.useState)([]),n=Object(o.a)(t,2),a=n[0],i=n[1],r=Object(s.useState)(""),l=Object(o.a)(r,2),j=l[0],h=l[1],u=Object(s.useState)(!0),d=Object(o.a)(u,2),b=d[0],m=d[1],O=e.setTweets,f=e.setLoading;return Object(s.useEffect)((function(){fetch("/api/trends").then((function(e){return e.json()})).then((function(e){e.length>0&&(i(e),m(!1))})).catch((function(e){return console.error(e)}))}),[]),Object(c.jsx)(c.Fragment,{children:Object(c.jsxs)("div",{className:"search-container",children:[Object(c.jsx)("div",{className:"search-input-container",children:Object(c.jsxs)("form",{className:"search-input-form",onSubmit:function(e){f(!0),e.preventDefault(),fetch("/api/search?q=".concat(j)).then((function(e){return e.json()})).then((function(e){O(e.statuses),f(!1),h("")})).catch((function(e){return console.log(e)}))},children:[Object(c.jsx)("span",{className:"material-icons search-icon",children:"search"}),Object(c.jsx)("input",{type:"text",className:"search-input",placeholder:"Search Twitter",onChange:function(e){e.preventDefault();var t=e.target.value;h(t)},value:j})]})}),Object(c.jsx)(w,{loading:b,tweets:a,search:function(e){f(!0),fetch("/api/search?q=".concat(e)).then((function(e){return e.json()})).then((function(e){O(e.statuses),f(!1),h("")})).catch((function(e){return console.log(e)}))}})]})})}n(39);function N(e){var t=e.tweet,n=Object(s.useState)(""),a=Object(o.a)(n,2),i=a[0],r=a[1],l=t.user,j=t.created_at,h=t.text,u=t.retweet_count,d=t.favorite_count;return Object(s.useEffect)((function(){fetch("/api/users/profile-picture?screen_name=".concat(l.screen_name)).then((function(e){return e.json()})).then((function(e){r(e)})).catch((function(e){return console.error(e)}))}),[]),Object(c.jsxs)("li",{className:"tweet-container",children:[Object(c.jsx)("div",{className:"user-profile-image",children:Object(c.jsx)("img",{src:i,alt:"",className:"profile-image"})}),Object(c.jsxs)("div",{className:"tweet-content",children:[Object(c.jsxs)("p",{className:"user-name",children:[l.name,Object(c.jsxs)("span",{className:"user-user_name",children:["@",l.screen_name," ",function(){var e=new Date(j),t=Math.floor((Date.now()-e.getTime())/36e5);return 0===t?Math.floor((Date.now()-e.getTime())/6e4)+"min":t+"h"}()]})]}),Object(c.jsx)("p",{children:h}),Object(c.jsxs)("div",{className:"tweet-info",children:[Object(c.jsxs)("p",{className:"retweets-container",children:[Object(c.jsx)("span",{className:"material-icons icon retweets",children:"repeat"}),u]}),Object(c.jsxs)("p",{className:"likes-container",children:[Object(c.jsx)("span",{className:"material-icons icon likes",children:"favorite_border"}),d]})]})]})]})}function k(e){var t=e.tweets;return Object(c.jsx)(c.Fragment,{children:Object(c.jsx)("ul",{style:{display:"inline-block",width:"600px",padding:"0"},children:t.map((function(e){return Object(c.jsx)(N,{tweet:e},e.id)}))})})}function T(e){var t=Object(s.useState)([]),n=Object(o.a)(t,2),a=n[0],i=n[1],r=Object(s.useState)(!0),l=Object(o.a)(r,2),j=l[0],h=l[1],u=e.setIsLoggedIn;function d(){h(!0),fetch("/api/home-timeline").then((function(e){return e.json()})).then((function(e){if(e.errors)return alert(e.errors[0].message),void console.error(e.errors[0].message);e&&i(e)})).catch((function(e){alert("There was the following network error ".concat(e)),console.error(e)})).finally((function(){h(!1)}))}return Object(s.useEffect)((function(){d()}),[]),Object(c.jsx)(c.Fragment,{children:Object(c.jsxs)("div",{className:"home-container",children:[Object(c.jsx)("div",{className:"home-side-nav-container",children:Object(c.jsx)(f,{logout:function(){return u(!1)},getTimelineTweets:d})}),Object(c.jsxs)("div",{className:"home-header-container",children:[Object(c.jsx)("h1",{className:"home-header",children:"Home"}),Object(c.jsx)(O,{getTweets:d}),j?Object(c.jsx)(p,{}):Object(c.jsx)(k,{tweets:a})]}),Object(c.jsx)("div",{className:"home-search-container",children:Object(c.jsx)(v,{setTweets:i,setLoading:h})})]})})}n(40),n(41);function S(e){var t,n=e.details,s=e.onEditButtonClick;return n?Object(c.jsx)(c.Fragment,{children:Object(c.jsxs)("div",{className:"details-container",children:[Object(c.jsx)("img",{className:"banner",src:n.profile_banner_url,alt:"profile-banner"}),Object(c.jsx)("img",{className:"profile-picture",src:n.profile_image_url,alt:"profile-pic"}),Object(c.jsx)("div",{className:"edit-button-container",children:Object(c.jsx)(h,{classes:"small light",click:s,children:"Edit profile"})}),Object(c.jsxs)("div",{className:"profile-info-container",children:[Object(c.jsx)("h3",{children:n.name}),Object(c.jsxs)("p",{className:"screen-name",children:["@",n.screen_name]}),Object(c.jsx)("p",{className:"description",children:n.description}),Object(c.jsxs)("p",{children:[Object(c.jsx)("span",{className:"material-icons icon",children:"date_range"})," Joined ",(t=n.created_at,new Date(t).toLocaleDateString())]}),Object(c.jsxs)("div",{className:"count-container",children:[Object(c.jsxs)("p",{children:[Object(c.jsx)("span",{className:"count",children:n.friends_count}),Object(c.jsx)("span",{className:"text",children:"Following"})]}),Object(c.jsxs)("p",{children:[Object(c.jsx)("span",{className:"count",children:n.followers_count}),Object(c.jsx)("span",{className:"text",children:"Followers"})]})]})]})]})}):Object(c.jsx)("p",{children:"Loading..."})}function _(e){var t=e.setIsLoggedIn,n=Object(s.useState)(null),a=Object(o.a)(n,2),i=a[0],r=a[1],l=Object(s.useState)(!1),j=Object(o.a)(l,2),u=j[0],d=j[1],b=Object(s.useState)(""),O=Object(o.a)(b,2),x=O[0],g=O[1],p=Object(s.useState)(""),w=Object(o.a)(p,2),N=w[0],T=w[1],_=Object(s.useState)(""),L=Object(o.a)(_,2),F=(L[0],L[1]),y=Object(s.useState)(null),C=Object(o.a)(y,2),I=(C[0],C[1],Object(s.useState)([])),D=Object(o.a)(I,2),E=D[0],P=D[1];function B(){fetch("api/user-timeline").then((function(e){return e.json()})).then((function(e){P(e)})).catch((function(e){console.error(e)}))}return Object(s.useEffect)((function(){fetch("api/profile-details").then((function(e){return e.json()})).then((function(e){g(e.name),T(e.description),F(e.profile_image_url),r(e)})).catch((function(e){alert("There was the following network error ".concat(e)),console.error(e)}))}),[]),Object(s.useEffect)((function(){B()}),[]),Object(c.jsxs)(c.Fragment,{children:[Object(c.jsxs)(m,{show:u,close:function(e){var t="modal-backdrop"===e.target.id,n="modal-close-button"===e.target.id;(t||n)&&d(!1)},children:[Object(c.jsx)("h1",{children:"Edit Profile"}),Object(c.jsx)("br",{}),Object(c.jsx)("textarea",{className:"edit-name-textarea",maxLength:"50",onChange:function(e){var t=e.target.value;g(t)},value:x}),Object(c.jsx)("br",{}),Object(c.jsx)("textarea",{className:"edit-description-textarea",rows:"4",cols:"50",maxLength:"160",onChange:function(e){var t=e.target.value;T(t)},value:N}),Object(c.jsx)("br",{}),Object(c.jsx)(h,{classes:"small dark",click:function(e){e.preventDefault(),fetch("/api/profile-update?name=".concat(x,"&description=").concat(N),{method:"POST"}).then((function(e){return e.json()})).then((function(e){e&&(g(e.name),T(e.description),r(e))})).catch((function(e){alert("There was the following network error ".concat(e)),console.error(e)})).finally((function(){return d(!1)}))},children:"Save"})]}),Object(c.jsxs)("div",{className:"profile-container",children:[Object(c.jsx)("div",{className:"profile-side-nav-container",children:Object(c.jsx)(f,{logout:function(){return t(!1)},getTweets:B})}),Object(c.jsxs)("div",{className:"profile-details-container",children:[Object(c.jsx)(S,{details:i,onEditButtonClick:function(){d(!0)}}),Object(c.jsx)(k,{tweets:E})]}),Object(c.jsx)("div",{className:"profile-search-container",children:Object(c.jsx)(v,{})})]})]})}function L(e){var t=e.children,n=e.isLoggedIn;return Object(c.jsx)(j.b,{render:function(e){var s=e.location;return n?t:Object(c.jsx)(j.a,{to:{pathname:"/",state:{from:s}}})}})}function F(e){var t=e.login,n=Object(j.h)(),a=Object(j.g)(),i=new URLSearchParams(n.search),r=i.get("oauth_token"),o=i.get("oauth_verifier");return Object(s.useEffect)((function(){fetch("/api/access-token?oauth_token=".concat(r,"&oauth_verifier=").concat(o)).then((function(e){return e.json()})).then((function(e){e&&0===Object.keys(e).length&&(alert("Something went wrong. Do not press the reload putting while on this page"),console.error("Response object is empty. This means that the user reloaded the get-credentials page \n        or something went wrong with the signing process"),console.log("response object",e),a.push("/"))})).then((function(){t(!0),a.push("/home")})).catch((function(e){return console.log("Network error: ".concat(e))}))}),[r,o]),Object(c.jsx)("h1",{children:"Loading your profile..."})}n(42);var y=function(){var e=Object(s.useState)(!0),t=Object(o.a)(e,2),n=t[0],a=t[1];return Object(c.jsx)(l.a,{children:Object(c.jsxs)(j.d,{children:[Object(c.jsx)(j.b,{exact:!0,path:"/",children:Object(c.jsx)(b,{login:a})}),Object(c.jsx)(j.b,{exact:!0,path:"/get-credentials",children:Object(c.jsx)(F,{login:a})}),Object(c.jsx)(L,{exact:!0,path:"/home",isLoggedIn:n,children:Object(c.jsx)(T,{setIsLoggedIn:a})}),Object(c.jsx)(L,{exact:!0,path:"/profile",isLoggedIn:n,children:Object(c.jsx)(_,{setIsLoggedIn:a})})]})})},C=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,46)).then((function(t){var n=t.getCLS,c=t.getFID,s=t.getFCP,a=t.getLCP,i=t.getTTFB;n(e),c(e),s(e),a(e),i(e)}))};r.a.render(Object(c.jsx)(a.a.StrictMode,{children:Object(c.jsx)(y,{})}),document.getElementById("root")),C()}]),[[43,1,2]]]);
//# sourceMappingURL=main.a0f3186c.chunk.js.map