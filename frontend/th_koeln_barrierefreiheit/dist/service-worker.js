if(!self.define){let e,r={};const s=(s,i)=>(s=new URL(s+".js",i).href,r[s]||new Promise((r=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=r,document.head.appendChild(e)}else e=s,importScripts(s),r()})).then((()=>{let e=r[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(i,n)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(r[o])return;let l={};const t=e=>s(e,o),u={module:{uri:o},exports:l,require:t};r[o]=Promise.all(i.map((e=>u[e]||t(e)))).then((e=>(n(...e),l)))}}define(["./workbox-db5fc017"],(function(e){"use strict";e.setCacheNameDetails({prefix:"th_koeln_barrierefreiheit"}),self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"/REPO_NAME/css/app.b1fc53c1.css",revision:null},{url:"/REPO_NAME/fonts/PT_Sans-Web-Regular.0cd675cc.ttf",revision:null},{url:"/REPO_NAME/fonts/RobotoSlab-Regular.4fff3fba.ttf",revision:null},{url:"/REPO_NAME/img/arrows.372ab4fd.png",revision:null},{url:"/REPO_NAME/img/code.f0c968e5.jpg",revision:null},{url:"/REPO_NAME/index.html",revision:"f2388ee8f35ed764901935e2820bae8e"},{url:"/REPO_NAME/js/app.914b2762.js",revision:null},{url:"/REPO_NAME/js/chunk-vendors.8ad2003f.js",revision:null},{url:"/REPO_NAME/manifest.json",revision:"530b03f804a2677a076224428052c137"},{url:"/REPO_NAME/robots.txt",revision:"b6216d61c03e6ce0c9aea6ca7808f7ca"}],{})}));
//# sourceMappingURL=service-worker.js.map
