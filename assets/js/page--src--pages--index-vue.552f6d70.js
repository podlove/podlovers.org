(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{"2qjx":function(t,e,s){"use strict";t.exports=function(t,e){var s=Number(e);if(isNaN(s))return"…";if(t.length<=s)return t;var a=t.substr(0,s),i=a.lastIndexOf(" ");return-1===i?"…":a.substr(0,i)+" …"}},iyQ6:function(t,e,s){"use strict";s.r(e);s("ma9I");var a=s("Pvxg"),i=s("YQsy"),n=Object(i.a)(0),o=s("aTUd"),r=(s("DQNa"),s("rePB")),l=s("pkSs"),c=s("2qjx"),u=s.n(c),d=(s("Ffhv"),s("pBQB")),p={components:{PlayButton:s("gCpa").a,Contributor:d.a},props:{episode:{type:Object,default:function(){var t;return t={id:null,title:null,summary:null,contributors:null,publicationDate:null,poster:null,show:null,path:null},Object(r.a)(t,"contributors",[]),Object(r.a)(t,"duration",null),t}}},computed:{summary:function(){return u()(Object(a.a)("",["episode","summary"],this),400)}},methods:{date:function(t){return new Date(t).toLocaleDateString()},toHumanTime:l.d}},m=(s("nUBX"),s("KHd+")),b={components:{PlayerTile:Object(m.a)(p,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"flex"},[a("div",{staticClass:"player-tile-button w-20 h-20 mr-4 relative flex-shrink-0 mt-1"},[t.episode.poster?a("g-image",{staticClass:"rounded w-20 h-20",attrs:{src:s("XX9Q")("./"+t.episode.poster)}}):t._e(),a("div",{staticClass:"absolute flex opacity-0 hover:opacity-100 items-center justify-center w-20 h-20 inset-0"},[a("play-button",{attrs:{color:"rgba(255, 255, 255)",background:"rgba(44, 82, 130)",size:50,id:t.episode.id}})],1)],1),a("div",{staticClass:"flex flex-col"},[a("div",{staticClass:"h-20 mb-2 sm:h-auto sm:mb-0"},[t.episode.title?a("g-link",{staticClass:"leading-tight sm:leading block text-xl mb-1 uppercase",attrs:{to:t.episode.path}},[t._v(t._s(t.episode.title))]):t._e(),a("div",{staticClass:"flex mb-2 items-center"},[t._l(t.episode.contributors,(function(t){return a("contributor",{key:"contributor-"+t.id,staticClass:"mr-1 w-6",attrs:{contributor:t}})})),t.episode.contributors.length>0?a("span",{staticClass:"text-gray-500 mx-1"},[t._v("・")]):t._e(),t.episode.publicationDate?a("span",{staticClass:"block font-light text-gray-500 text-base"},[t._v(t._s(t.date(t.episode.publicationDate)))]):t._e(),t.episode.duration?a("span",{staticClass:"text-gray-500 mx-1"},[t._v("・")]):t._e(),t.episode.duration?a("span",{staticClass:"block font-light text-gray-500"},[t._v(t._s(t.toHumanTime(t.episode.duration)))]):t._e()],2)],1),t.summary?a("div",{directives:[{name:"g-image",rawName:"v-g-image"}],staticClass:"summary font-light -ml-24 sm:ml-0",domProps:{innerHTML:t._s(t.summary)}}):t._e()])])}),[],!1,null,"11005cbc",null).exports,EpisodeHeader:s("1CAM").a},computed:{episodes:function(){return Object(a.a)([],["$page","episodes","edges"],this)},latest:function(){return n(this.episodes)},list:function(){return Object(o.a)(1,this.episodes.length-1,this.episodes)}},metaInfo:function(){return{title:"".concat(this.$static.metadata.show.title," - ").concat(this.$static.metadata.show.subtitle),meta:[{name:"description",content:this.$static.metadata.show.summary}]}}},f=null,h=s("Kw5r"),g=h.a.config.optionMergeStrategies.computed,v={metadata:{show:{title:"Podlovers",subtitle:"Der Podlove Entwickler:innen Podcast",summary:"Podlove ist eine Initiative zur Verbesserung der Open Source Infrastruktur zum Podcasting. Podlove ist gleichzeitig auch ein Netzwerk an Entwickler:innen zur Diskussion von Features und Standardisierung."}}},y=function(t){var e=t.options;e.__staticData?e.__staticData.data=v:(e.__staticData=h.a.observable({data:v}),e.computed=g({$static:function(){return e.__staticData.data}},e.computed))},_=Object(m.a)(b,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("Layout",[s("episode-header",{staticClass:"mb-4",attrs:{id:t.latest.node.id,poster:t.latest.node.poster,duration:t.latest.node.duration,"publication-date":t.latest.node.publicationDate,title:t.latest.node.title,contributors:t.latest.node.contributors,path:t.latest.node.path}}),s("div",{staticClass:"flex justify-center"},[t.list.length>1?s("div",{staticClass:"w-app p-8"},t._l(t.list,(function(e,a){return s("player-tile",{key:e.node.id,staticClass:"py-8 border-gray-400 border-dashed",class:{"pt-0":0===a,"border-b":a<t.list.length-1},attrs:{episode:e.node}})})),1):s("div",{staticClass:"w-app py-32 flex justify-center items-center"},[s("span",{staticClass:"italic font-thin text-xl"},[t._v("\n        here be dragons\n      ")])])])],1)}),[],!1,null,null,null);"function"==typeof f&&f(_),"function"==typeof y&&y(_);e.default=_.exports},nUBX:function(t,e,s){"use strict";var a=s("qZx9");s.n(a).a},qZx9:function(t,e,s){}}]);