webpackJsonp([6],{"0xDb":function(e,n,t){"use strict";n.a=function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(e){return("x"===e?16*Math.random()|0:8).toString(16)})},n.b=function(e){return!0};t("7+uW"),t("YaEn"),t("IcnI")},"3lsD":function(e,n){},BBgh:function(e,n,t){"use strict";var r=t("vLgD"),a={baseUri:"/user",login:function(e){return Object(r.a)({url:this.baseUri+"/login",method:"post",data:e})},register:function(e){return Object(r.a)({url:this.baseUri+"/register",method:"post",data:e})},refreshToken:function(){return Object(r.a)({url:this.baseUri+"/access_token/refresh",method:"get"})}};n.a=a},"Du/2":function(e,n,t){"use strict";t.d(n,"a",function(){return r});var r="accessToken"},IcnI:function(e,n,t){"use strict";var r=t("7+uW"),a=t("NYxO"),o=t("//Fk"),u=t.n(o),s=t("Y4FN"),i=t.n(s),c=t("vLgD"),f={baseUri:"/user"};var l=t("Du/2"),p={state:{token:"",name:"",avatar:"",roles:[],permissions:[]},mutations:{SET_TOKEN:function(e,n){e.token=n},SET_EXPIRES_IN:function(e,n){e.expires_in=n},SET_NAME:function(e,n){e.name=n},SET_AVATAR:function(e,n){e.avatar=n},SET_ROLES:function(e,n){e.roles=n},SET_PERMISSIONS:function(e,n){e.permissions=n}},actions:{Login:function(e,n){var t=e.commit;return new u.a(function(e,r){var a;(a=n,Object(c.a)({url:f.baseUri+"/login",method:"post",data:a})).then(function(n){i.a.set(l.a,n.value,6048e5),t("SET_TOKEN",n.value),e()}).catch(function(e){r(e)})})}}},m={token:function(e){return e.user.token},avatar:function(e){return e.user.avatar},name:function(e){return e.user.name},introduction:function(e){return e.user.introduction},roles:function(e){return e.user.roles},permissions:function(e){return e.user.permissions}};r.default.use(a.a);var d=new a.a.Store({modules:{user:p},getters:m});n.a=d},NHnr:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var r=t("7+uW"),a={render:function(){var e=this.$createElement,n=this._self._c||e;return n("transition",{attrs:{name:"fade"}},[n("div",{attrs:{id:"app"}},[n("router-view")],1)])},staticRenderFns:[]};var o=t("VU/8")({name:"App"},a,!1,function(e){t("3lsD")},null,null).exports,u=t("YaEn"),s=t("IcnI"),i=t("Y4FN"),c=t.n(i),f=t("K/Lq"),l=t.n(f),p=t("zL8q"),m=t.n(p),d=(t("zMOa"),t("tvR6"),t("Rk3H")),h=t.n(d),x=t("0xDb"),g=t("x9pK"),v=t.n(g),T={baseUrl:"http://localhost:8000",token:"123456",userSite:"林花落了春红，太匆匆"};r.default.use(l.a),r.default.use(m.a),r.default.config.productionTip=!1,r.default.prototype.global=T,r.default.prototype.$storage=c.a,r.default.prototype.$http=h.a,r.default.prototype.isAuth=x.b,r.default.prototype.PubSub=v.a,new r.default({el:"#app",router:u.a,store:s.a,template:"<App/>",components:{App:o}})},Rk3H:function(e,n){},YaEn:function(e,n,t){"use strict";var r=t("7+uW"),a=t("/ocq");r.default.use(a.a),n.a=new a.a({routes:[{path:"/",name:"index",component:function(){return t.e(0).then(t.bind(null,"4pX6"))}},{path:"/login",name:"login",component:function(){return t.e(2).then(t.bind(null,"wQTO"))}},{path:"/404",name:"404",component:function(){return t.e(3).then(t.bind(null,"7FDS"))}},{path:"/about-us",name:"aboutus",component:function(){return t.e(1).then(t.bind(null,"SEcC"))}},{path:"/chatroom",name:"chatroom",component:function(){return t.e(4).then(t.bind(null,"AOzQ"))}}]})},tvR6:function(e,n){},vLgD:function(e,n,t){"use strict";var r=t("Dd8w"),a=t.n(r),o=t("//Fk"),u=t.n(o),s=t("mtWM"),i=t.n(s),c=t("IcnI"),f=t("Y4FN"),l=t.n(f),p=(t("HSQo"),t("Du/2")),m=t("BBgh"),d=t("YaEn"),h=this,x=i.a.create({baseURL:"http://39.108.128.80:8004/",timeout:0}),g=function(e){if(console.log("进入异常处理"),e.response){var n=e.response.data,t=l.a.get(p.a);e.response.status,401!==e.response.status||n.result&&n.result.isLogin||t&&c.a.dispatch("Logout").then(function(){setTimeout(function(){window.location.reload()},1500)})}return u.a.reject(e)},v=!1;x.interceptors.request.use(function(e){var n=l.a.get(p.a);return n&&(e.headers=a()({},e.headers,{token:v?l.a.get("refreshToken"):n})),e},g);var T=[];x.interceptors.response.use(function(e){if(console.log("响应拦截器",e),!e.config.url.includes("/access_token/refresh")&&401===e.data.code){var n=l.a.get("expireTime");if(new Date(n)-new Date<=0)return d.a.replace({name:"login"}),e.data;if(!v)return v=!0,m.a.refreshToken().then(function(e){if(console.log("token刷新结果：",e),200===e.code){var n=new Date((new Date).getTime()+60*e.data.expireTime*1e3);l.a.set("accessToken",e.data.accessToken),l.a.set("refreshToken",e.data.refreshToken),l.a.set("expireTime",n),t=e.data.accessToken,T.forEach(function(e){e(t)}),T=[]}else l.a.removeItem("accessToken"),l.a.removeItem("refreshToken"),l.a.removeItem("expireTime"),h.$message.error("登录过期");var t}).catch(function(){l.a.removeItem("accessToken"),l.a.removeItem("refreshToken"),l.a.removeItem("expireTime"),h.$message.error("登录过期")}).finally(function(){v=!1}),new u.a(function(n){var t;t=function(t){e.config.headers.token=t,e.config.url=e.config.url.replace(e.config.baseURL,""),n(x(e.config))},T.push(t)})}return e.data},g);n.a=x},zMOa:function(e,n){}},["NHnr"]);
//# sourceMappingURL=app.cfaecb7aa43700051465.js.map