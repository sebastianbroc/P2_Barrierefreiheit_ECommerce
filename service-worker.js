if(!self.define){let e,r={};const i=(i,o)=>(i=new URL(i+".js",o).href,r[i]||new Promise((r=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=r,document.head.appendChild(e)}else e=i,importScripts(i),r()})).then((()=>{let e=r[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(o,n)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(r[t])return;let s={};const l=e=>i(e,t),c={module:{uri:t},exports:s,require:l};r[t]=Promise.all(o.map((e=>c[e]||l(e)))).then((e=>(n(...e),s)))}}define(["./workbox-db5fc017"],(function(e){"use strict";e.setCacheNameDetails({prefix:"th_koeln_barrierefreiheit"}),self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"/P2_Barrierefreiheit_ECommerce/css/app.466c78a5.css",revision:null},{url:"/P2_Barrierefreiheit_ECommerce/fonts/PT_Sans-Web-Regular.0cd675cc.ttf",revision:null},{url:"/P2_Barrierefreiheit_ECommerce/fonts/RobotoSlab-Regular.4fff3fba.ttf",revision:null},{url:"/P2_Barrierefreiheit_ECommerce/img/arrows.372ab4fd.png",revision:null},{url:"/P2_Barrierefreiheit_ECommerce/img/code.f0c968e5.jpg",revision:null},{url:"/P2_Barrierefreiheit_ECommerce/img/components_teaser.4246e95c.jpg",revision:null},{url:"/P2_Barrierefreiheit_ECommerce/img/guideline_teaser.47cac76b.jpg",revision:null},{url:"/P2_Barrierefreiheit_ECommerce/index.html",revision:"a5b67e0cd9855a63659410a523f1ed38"},{url:"/P2_Barrierefreiheit_ECommerce/js/app.711e9a5d.js",revision:null},{url:"/P2_Barrierefreiheit_ECommerce/js/chunk-vendors.b1f8c8ea.js",revision:null},{url:"/P2_Barrierefreiheit_ECommerce/manifest.json",revision:"530b03f804a2677a076224428052c137"},{url:"/P2_Barrierefreiheit_ECommerce/robots.txt",revision:"b6216d61c03e6ce0c9aea6ca7808f7ca"}],{})}));
//# sourceMappingURL=service-worker.js.map
