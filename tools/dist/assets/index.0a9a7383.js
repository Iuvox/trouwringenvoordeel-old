import{r as m,o as d,c as _,a as h,d as g,b as y,e as v,f as L,w as E,g as O}from"./vendor.69956f05.js";const S=function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function r(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerpolicy&&(o.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?o.credentials="include":t.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(t){if(t.ep)return;t.ep=!0;const o=r(t);fetch(t.href,o)}};S();var w=(e,n)=>{const r=e.__vccOpts||e;for(const[a,t]of n)r[a]=t;return r};const P={};function b(e,n){const r=m("router-view");return d(),_(r)}var k=w(P,[["render",b]]);const x="modulepreload",u={},I="/",i=function(n,r){return!r||r.length===0?n():Promise.all(r.map(a=>{if(a=`${I}${a}`,a in u)return;u[a]=!0;const t=a.endsWith(".css"),o=t?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${a}"]${o}`))return;const s=document.createElement("link");if(s.rel=t?"stylesheet":x,t||(s.as="script",s.crossOrigin=""),s.href=a,document.head.appendChild(s),t)return new Promise((f,p)=>{s.addEventListener("load",f),s.addEventListener("error",p)})})).then(()=>n())},A=h.create({timeout:3e3,baseURL:"/api"}),R=g("main",{state:()=>({auth:{}}),getters:{loggedIn(e){return"token"in e.auth},bearer(e){return`Bearer ${e.auth.token}`}},actions:{login(){return new Promise((e,n)=>{A.post("/auth/login",{name:"Joep",password:"test"}).then(r=>{this.auth=r.data,e(!0)}).catch(r=>{n(!1)})})}}}),l=y({routes:[{name:"Home",path:"/",component:()=>i(()=>import("./HomeView.db025375.js"),["assets/HomeView.db025375.js","assets/HomeView.3590d234.css","assets/vendor.69956f05.js"])},{name:"Referral",path:"/referral",meta:{auth:!0},component:()=>i(()=>import("./ReferralView.c52cd27e.js"),["assets/ReferralView.c52cd27e.js","assets/vendor.69956f05.js"])},{name:"Login",path:"/login",component:()=>i(()=>import("./LoginView.717d4a4b.js"),["assets/LoginView.717d4a4b.js","assets/vendor.69956f05.js"])}],history:v()});l.beforeEach((e,n)=>{const r=R();if("auth"in e.meta&&e.meta.auth===!0&&r.loggedIn===!1)return{name:"Login",query:{redirect_to:e.path}}});const c=L();try{const e=JSON.parse(localStorage.getItem("piniaState"));e!==null&&e.expires>Date.now()&&(c.state.value=e)}catch(e){console.log(e)}E(c.state,e=>{e.expires=Date.now()+1e3*60*60,localStorage.setItem("piniaState",JSON.stringify(e))},{deep:!0});O(k).use(l).use(c).mount("#app");export{w as _,A as a,R as u};