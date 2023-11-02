(function(){"use strict";var e={5719:function(e,l,t){var n=t(9242),r=t(3396),a=(t(560),t(7139)),o=t(4870);const u={class:"crypt-decrypt"},c={class:"encrypt"},s={class:"h1"},i=["disabled"],d={class:"h1"},p=(0,r._)("hr",null,null,-1),v={class:"decrypt"},y=["disabled"],f={class:"h1"},b=(0,r._)("hr",null,null,-1);var _={__name:"CryptDecrypt",props:{modelValue:{type:Object,required:!0}},setup(e){let l=(0,o.iH)(""),t=(0,o.iH)(""),_=(0,o.iH)(""),m=(0,o.iH)("");const h=e,w=()=>{const e=l.value,n=e.split(""),r=[];n.forEach((e=>r.push(h.modelValue[e]))),t.value=r.join("")},g=()=>{const e=_.value.split(""),l=[];for(let t=0;t<=e.length;t++)Object.keys(h.modelValue).find((n=>{h.modelValue[n]===e[t]&&l.push(n)}));m.value=l.join("")};return(e,h)=>((0,r.wg)(),(0,r.iD)("div",u,[(0,r._)("div",c,[(0,r._)("div",s,"Original: "+(0,a.zw)((0,o.SU)(l)),1),(0,r.wy)((0,r._)("input",{"onUpdate:modelValue":h[0]||(h[0]=e=>(0,o.dq)(l)?l.value=e:l=e),type:"text",class:"input-pass",placeholder:"easy to remember phrase"},null,512),[[n.nr,(0,o.SU)(l)]]),(0,r._)("button",{onClick:w,class:"btn-crypt",type:"button",disabled:!(0,o.SU)(l)},"Encrypt",8,i),(0,r._)("div",d,"Encrypted: "+(0,a.zw)((0,o.SU)(t)),1)]),p,(0,r._)("div",v,[(0,r.wy)((0,r._)("input",{"onUpdate:modelValue":h[1]||(h[1]=e=>(0,o.dq)(_)?_.value=e:_=e),type:"text",class:"input-pass",placeholder:"secret code"},null,512),[[n.nr,(0,o.SU)(_)]]),(0,r._)("button",{onClick:g,class:"btn-crypt",type:"button",disabled:!(0,o.SU)(_)},"Decrypt",8,y),(0,r._)("div",f,"Decrypted: "+(0,a.zw)((0,o.SU)(m)),1)]),b]))}};const m=_;var h=m,w={__name:"KeyboardToObject",props:{modelValue:{type:Object,required:!0}},emits:["update:modelValue"],setup(e,{emit:l}){const t=e,a=l,u=(0,o.iH)(JSON.stringify(t.modelValue,null,2)),c=(0,o.iH)(t.modelValue);return(0,r.YP)(u,(e=>{try{a("update:modelValue",JSON.parse(e))}catch(l){console.error("Invalid JSON:",l)}})),(0,r.YP)(c,(e=>{u.value=JSON.stringify(e,null,2)}),{deep:!0}),(0,r.YP)((()=>t.modelValue),(e=>{c.value=e}),{deep:!0}),(e,l)=>(0,r.wy)(((0,r.wg)(),(0,r.iD)("textarea",{id:"crypt",cols:"30",name:"crypt-keyboard",rows:"50",class:"encrypt-object","onUpdate:modelValue":l[0]||(l[0]=e=>u.value=e)},null,512)),[[n.nr,u.value]])}},g=t(89);const k=(0,g.Z)(w,[["__scopeId","data-v-0530933c"]]);var O=k;const V={class:"keyboard"},j={class:"keyboard-table"},S=(0,r._)("tr",null,[(0,r._)("td",{colspan:"26"},[(0,r._)("h1",null,"Encrypted Keyboard:")])],-1),U=["onClick"],H={class:"h1"},D={class:"h1"},C=(0,r._)("tr",null,[(0,r._)("td",{colspan:"26"},[(0,r._)("div",{class:"h1"},"Special symbols:")])],-1),x=["onClick"],Y={class:"h1"},K={class:"crypt-sec"};var z={__name:"Keyboard",setup(e){let l=(0,o.iH)(""),t=(0,o.iH)("");const n=(0,o.iH)({0:"♨",1:"✡",2:"✷",3:"✥",4:"▩",5:"♜",6:"♛",7:"△",8:"▤",9:"▣"," ":"%",A:"▦",B:"✪",C:"✢",D:"✱",E:"▪",F:"✧",G:"✹",H:"✺",I:"▧",J:"▬",K:"▨",L:"✤",M:"◩",N:"◬",O:"◪",P:"◭",Q:"✦",R:"✶",S:"✣",T:"✯",U:"▢",V:"♚",W:"✰",X:"□",Y:"❅",Z:"▻",a:"◧",b:"?",c:"▲",d:"◫",e:"♝",f:"◥",g:"♬",h:"♘",i:"♟",j:"♧",k:"♙",l:"◯",m:"❃",n:"◮",o:"✸",p:"&",q:"♣",r:"!",s:"№",t:"✵",u:"♞",v:"@",w:"✽",x:"✠",y:"✴",z:"∐"}),u=(0,o.iH)({1:"┐",2:"└",3:"┴",4:"┌",5:"─",6:"│",7:"┘",8:"├",9:"┤",10:"┬",11:"▒",12:"▓",13:"█",14:"░",15:"▀",16:"▄",17:"■",18:"□",19:"▲",20:"▼",21:"◆",22:"○",23:"●",24:"◐",25:"◑",26:"◒",27:"◓",28:"◔",29:"◕",30:"⌂",31:"★",32:"☆",33:"✪",34:"✽",35:"✦",36:"✯",37:"✰",38:"✶",39:"✷",40:"✵",41:"✹",42:"✺",43:"✸",44:"✻",45:"✠",46:"✡",47:"✢",48:"✣",49:"✤",50:"✥"}),c=(e,l)=>Object.keys(l).find((t=>l[t]===e)),s=(e,n)=>{const r=c(e,n);if(r?l.value=e:t.value=e,""!=l.value&&""!=t.value){const e=c(l.value,n);n[e]=t.value,l.value="",t.value=""}},i=(e,l)=>{const t=[],n=Object.keys(e).length;let r={},a=0;for(const o in e){a++;const u=e[o];r[o]=u,(l.includes(o)||a>=n)&&(t.push({...r}),r={})}return t},d=(0,r.Fl)((()=>i(n.value,[" ","Z"]))),p=(0,r.Fl)((()=>i(u.value,["26"])));return(e,u)=>((0,r.wg)(),(0,r.iD)(r.HY,null,[(0,r._)("div",V,[(0,r._)("table",j,[S,((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(d.value,((e,t)=>((0,r.wg)(),(0,r.iD)("tr",{key:t},[((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(e,((e,t)=>((0,r.wg)(),(0,r.iD)("td",{key:t,onClick:l=>s(e,n.value),class:(0,a.C_)({yellow:(0,o.SU)(l)===e,pink:(0,o.SU)(l)!==e})},[(0,r._)("div",H,(0,a.zw)(t)+":",1),(0,r._)("div",D,(0,a.zw)(e),1)],10,U)))),128))])))),128)),C,((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(p.value,((e,l)=>((0,r.wg)(),(0,r.iD)("tr",{key:l},[((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(e,((e,l)=>((0,r.wg)(),(0,r.iD)("td",{key:l,onClick:l=>s(e,n.value),class:(0,a.C_)({yellow:(0,o.SU)(t)===e,blue:(0,o.SU)(t)!==e})},[(0,r._)("div",Y,(0,a.zw)(e),1)],10,x)))),128))])))),128))])]),(0,r._)("div",K,[(0,r.Wm)(O,{modelValue:n.value,"onUpdate:modelValue":u[0]||(u[0]=e=>n.value=e)},null,8,["modelValue"]),(0,r.Wm)(h,{modelValue:n.value,"onUpdate:modelValue":u[1]||(u[1]=e=>n.value=e)},null,8,["modelValue"])])],64))}};const E=z;var P=E,q={__name:"App",setup(e){return(e,l)=>((0,r.wg)(),(0,r.j4)(P))}};const J=q;var N=J;(0,n.ri)(N).mount("#app")}},l={};function t(n){var r=l[n];if(void 0!==r)return r.exports;var a=l[n]={exports:{}};return e[n].call(a.exports,a,a.exports,t),a.exports}t.m=e,function(){var e=[];t.O=function(l,n,r,a){if(!n){var o=1/0;for(i=0;i<e.length;i++){n=e[i][0],r=e[i][1],a=e[i][2];for(var u=!0,c=0;c<n.length;c++)(!1&a||o>=a)&&Object.keys(t.O).every((function(e){return t.O[e](n[c])}))?n.splice(c--,1):(u=!1,a<o&&(o=a));if(u){e.splice(i--,1);var s=r();void 0!==s&&(l=s)}}return l}a=a||0;for(var i=e.length;i>0&&e[i-1][2]>a;i--)e[i]=e[i-1];e[i]=[n,r,a]}}(),function(){t.n=function(e){var l=e&&e.__esModule?function(){return e["default"]}:function(){return e};return t.d(l,{a:l}),l}}(),function(){t.d=function(e,l){for(var n in l)t.o(l,n)&&!t.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:l[n]})}}(),function(){t.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){t.o=function(e,l){return Object.prototype.hasOwnProperty.call(e,l)}}(),function(){var e={143:0};t.O.j=function(l){return 0===e[l]};var l=function(l,n){var r,a,o=n[0],u=n[1],c=n[2],s=0;if(o.some((function(l){return 0!==e[l]}))){for(r in u)t.o(u,r)&&(t.m[r]=u[r]);if(c)var i=c(t)}for(l&&l(n);s<o.length;s++)a=o[s],t.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return t.O(i)},n=self["webpackChunkpassword_encrypt"]=self["webpackChunkpassword_encrypt"]||[];n.forEach(l.bind(null,0)),n.push=l.bind(null,n.push.bind(n))}();var n=t.O(void 0,[998],(function(){return t(5719)}));n=t.O(n)})();
//# sourceMappingURL=app.1e5cd1fa.js.map