if(!self.define){let e,r={};const i=(i,n)=>(i=new URL(i+".js",n).href,r[i]||new Promise((r=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=r,document.head.appendChild(e)}else e=i,importScripts(i),r()})).then((()=>{let e=r[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,s)=>{const l=e||("document"in self?document.currentScript.src:"")||location.href;if(r[l])return;let o={};const t=e=>i(e,l),u={module:{uri:l},exports:o,require:t};r[l]=Promise.all(n.map((e=>u[e]||t(e)))).then((e=>(s(...e),o)))}}define(["./workbox-db5fc017"],(function(e){"use strict";e.setCacheNameDetails({prefix:"th_koeln_barrierefreiheit"}),self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"/css/app.a6ffbf64.css",revision:null},{url:"/fonts/PT_Sans-Web-Regular.0cd675cc.ttf",revision:null},{url:"/fonts/RobotoSlab-Regular.4fff3fba.ttf",revision:null},{url:"/img/arrows.372ab4fd.png",revision:null},{url:"/img/code.f0c968e5.jpg",revision:null},{url:"/img/components_teaser.4246e95c.jpg",revision:null},{url:"/img/guideline_teaser.47cac76b.jpg",revision:null},{url:"/index.html",revision:"edc86d2679c517692e875fe3013c5255"},{url:"/js/app.4794db73.js",revision:null},{url:"/js/chunk-vendors.c7c55af1.js",revision:null},{url:"/manifest.json",revision:"530b03f804a2677a076224428052c137"},{url:"/robots.txt",revision:"b6216d61c03e6ce0c9aea6ca7808f7ca"}],{})}));
//# sourceMappingURL=service-worker.js.map
