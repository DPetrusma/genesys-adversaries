"use strict";System.register(["react","react-dom","lib/data-store","lib/dispatcher","lib/tab","components/character-view","components/character-edit","components/link-list","components/input/filter","components/loader","components/tabs","components/tag-menu","lib/local-store","lib/list","lib/config"],function(_export,_context){"use strict";var React,ReactDOM,DataStore,dispatcher,Tab,CharacterView,CharacterEdit,LinkList,Filter,Loader,Tabs,TagMenu,Store,sortByProperty,findByProperty,unique,CONFIG,_createClass,App;function _toConsumableArray(arr){if(Array.isArray(arr)){for(var i=0,arr2=Array(arr.length);i<arr.length;i++){arr2[i]=arr[i]}return arr2}else{return Array.from(arr)}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function")}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}return call&&(typeof call==="object"||typeof call==="function")?call:self}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass)}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass}return{setters:[function(_react){React=_react.default},function(_reactDom){ReactDOM=_reactDom.default},function(_libDataStore){DataStore=_libDataStore.default},function(_libDispatcher){dispatcher=_libDispatcher.default},function(_libTab){Tab=_libTab.default},function(_componentsCharacterView){CharacterView=_componentsCharacterView.default},function(_componentsCharacterEdit){CharacterEdit=_componentsCharacterEdit.default},function(_componentsLinkList){LinkList=_componentsLinkList.default},function(_componentsInputFilter){Filter=_componentsInputFilter.Filter},function(_componentsLoader){Loader=_componentsLoader.default},function(_componentsTabs){Tabs=_componentsTabs.default},function(_componentsTagMenu){TagMenu=_componentsTagMenu.default},function(_libLocalStore){Store=_libLocalStore},function(_libList){sortByProperty=_libList.sortByProperty;findByProperty=_libList.findByProperty;unique=_libList.unique},function(_libConfig){CONFIG=_libConfig}],execute:function(){_createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();App=function(_React$Component){_inherits(App,_React$Component);function App(props){_classCallCheck(this,App);var _this=_possibleConstructorReturn(this,(App.__proto__||Object.getPrototypeOf(App)).call(this,props));_this.state={selected:[],selectedIndex:0,list:null,filter:"",tags:[],isLoaded:false,menuOpen:false,showAbout:false,editMode:false,editAdversary:null};_this.events={};_this.stores={};_this.loadedTotal=0;["skills","adversaries","weapons","talents","qualities"].forEach(function(key){_this.stores[key]=new DataStore("/"+ENV_VERSION+"/media/data/"+key+".json");_this.stores[key].load(function(){return _this.loadedTotal++})});return _this}_createClass(App,[{key:"componentDidMount",value:function componentDidMount(){var _this2=this;this.events["adversaries"]=this.stores.adversaries.on("change",function(){var adversaries=_this2.stores.adversaries.all();var adversary=null;// load up stored adversaries and either replace them or add them
var stored=Store.local.get(CONFIG.ADVERSARY_STORE)||[];var ids=stored.map(function(a){return a.id});adversaries=adversaries.filter(function(a){return ids.indexOf(a.id)==-1});stored.filter(function(a){return a.id}).forEach(function(a){return adversaries.push(a)});var favourites=Store.local.get(CONFIG.FAVOURITE_STORE)||[];var tags=["minion","rival","nemesis","apex nemesis"];adversaries.forEach(function(a){if(favourites.indexOf(a.id)!=-1){a.favourite=true;a.tags.push(CONFIG.FAVOURITE_TAG);tags.push(CONFIG.FAVOURITE_KEY+a.name)}if(a.tags==null){a.tags=[]}else{var _tags;(_tags=tags).push.apply(_tags,_toConsumableArray(a.tags))}a.tags.push(a.type.toLowerCase());a.tags=unique(a.tags)});tags=unique(tags);if(location.hash.length>0){var id=location.hash.substring(1);adversary=adversaries.find(findByProperty("id",id))}if(!adversary){adversary=adversaries.sort(sortByProperty("name"))[0]}_this2.stores.adversaries.data=adversaries;_this2.setState({list:adversaries,tags:tags});_this2.selectAdversary(adversary);_this2.setLoaded()});this.events["skills"]=this.stores.skills.on("change",function(){var skills=_this2.stores.skills.all();// load up stored skills and either replace them or add them
var stored=Store.local.get(CONFIG.SKILL_STORE)||[];var names=stored.map(function(a){return a.name});skills=skills.filter(function(a){return names.indexOf(a.name)==-1});stored.filter(function(a){return a.name}).forEach(function(a){return skills.push(a)});_this2.stores.skills.data=skills.sort(sortByProperty("name"));_this2.setLoaded()});Object.keys(this.stores).forEach(function(key){if(key!="adversaries"&&key!="skills"){_this2.events[key]=_this2.stores[key].on("change",function(){return _this2.setLoaded()})}});// view object from menu
dispatcher.register(CONFIG.OBJECT_VIEW,function(id){_this2.setState({menuOpen:false});_this2.selectAdversary(_this2.stores.adversaries.findBy("id",id))});// add another object to the view
dispatcher.register(CONFIG.TAB_ADD,function(){var adversary=_this2.state.selected[_this2.state.selectedIndex].character;var selected=_this2.state.selected;selected.push(new Tab(adversary));_this2.setState({selected:selected})});// remove the tab specified by the index
dispatcher.register(CONFIG.TAB_REMOVE,function(index){if(index<0||_this2.state.selected.length<=1){return}var selectedIndex=_this2.state.selectedIndex;var selected=_this2.state.selected;selected.splice(index,1);if(_this2.state.selectedIndex>_this2.state.selected.length-1){--selectedIndex}_this2.setState({selected:selected,selectedIndex:selectedIndex})});var updateTab=function updateTab(property){return function(index,text){if(index<0||index>=_this2.state.selected.length){return}var selected=_this2.state.selected;selected[index][property]=text;_this2.setState({selected:selected})}};// rename a given tab
dispatcher.register(CONFIG.TAB_RENAME,updateTab("tabName"));// change the background colour of a given tab
dispatcher.register(CONFIG.TAB_COLOUR,updateTab("colour"));// change to a new tab
dispatcher.register(CONFIG.TAB_CHANGE,function(index){if(index<0||index>=_this2.state.selected.length){return}_this2.setState({selectedIndex:index})});// filter text from menu
dispatcher.register(CONFIG.MENU_FILTER,function(filter){_this2.filter(filter)});// add and remove favourites
dispatcher.register(CONFIG.FAVOURITE_ADD,function(id){var favourites=Store.local.has(CONFIG.FAVOURITE_STORE)?Store.local.get(CONFIG.FAVOURITE_STORE):[];if(favourites.indexOf(id)==-1){var adversary=_this2.stores.adversaries.findBy("id",id);adversary.favourite=true;adversary.tags.push(CONFIG.FAVOURITE_TAG);var tags=_this2.state.tags;tags.push(CONFIG.FAVOURITE_KEY+adversary.name);favourites.push(id);Store.local.set(CONFIG.FAVOURITE_STORE,favourites);_this2.setState({tags:tags});_this2.selectAdversary(adversary)}});dispatcher.register(CONFIG.FAVOURITE_REMOVE,function(id){var favourites=Store.local.has(CONFIG.FAVOURITE_STORE)?Store.local.get(CONFIG.FAVOURITE_STORE):[];var index=favourites.indexOf(id);if(index!=-1){favourites.splice(index,1);var adversary=_this2.stores.adversaries.findBy("id",id);adversary.favourite=false;adversary.tags.splice(adversary.tags.indexOf(CONFIG.FAVOURITE_TAG),1);var tags=_this2.state.tags;tags.splice(tags.indexOf(CONFIG.FAVOURITE_KEY+adversary.name),1);Store.local.set(CONFIG.FAVOURITE_STORE,favourites);_this2.setState({tags:tags});_this2.selectAdversary(adversary)}});// add, edit, and delete custom adversaries
dispatcher.register(CONFIG.ADVERSARY_ADD,function(){_this2.setState({editMode:true,editAdversary:{}})});dispatcher.register(CONFIG.ADVERSARY_COPY,function(id){// make a clone of the character for editing purposes
var adversary=_this2.stores.adversaries.findBy("id",id);_this2.setState({editMode:true,editAdversary:adversary})});dispatcher.register(CONFIG.ADVERSARY_CANCEL,function(){_this2.setState({editMode:false,editAdversary:null})});dispatcher.register(CONFIG.ADVERSARY_SAVE,function(adversary){var tags=_this2.state.tags;// add a tag to indicate that it's user defined
if(adversary.tags.indexOf(CONFIG.ADVERSARY_TAG)==-1){adversary.tags.push(CONFIG.ADVERSARY_TAG);if(tags.indexOf(CONFIG.ADVERSARY_TAG)==-1){tags.push(CONFIG.ADVERSARY_TAG)}}// add the adversary's type as a tag
var type=adversary.type.toLowerCase();if(adversary.tags.indexOf(type)==-1){adversary.tags.push(type)}// clean up empty arrays
["weapons","talents","abilities"].forEach(function(key){if(key in adversary&&adversary[key].length===0){delete adversary[key]}});// save it to local storage
var stored=Store.local.get(CONFIG.ADVERSARY_STORE)||[];stored=stored.filter(function(d){return d.id!=adversary.id});stored.push(adversary);Store.local.set(CONFIG.ADVERSARY_STORE,stored);// update the data store
var adversaries=_this2.stores.adversaries.all().filter(function(a){return a.id!=adversary.id});adversaries.push(adversary);_this2.stores.adversaries.data=adversaries;_this2.setState({editMode:false,editAdversary:null,tags:tags});_this2.selectAdversary(adversary)});dispatcher.register(CONFIG.ADVERSARY_DELETE,function(id){_this2.stores.adversaries.data=_this2.stores.adversaries.filter(function(f){return f.id!=id});// remove from local store
var stored=Store.local.get(CONFIG.ADVERSARY_STORE)||[];stored=stored.filter(function(d){return d.id!=id});Store.local.set(CONFIG.ADVERSARY_STORE,stored);// remove from filtered navigation list
var list=_this2.state.list.filter(function(f){return f.id!=id});if(list.length===0){// empty list so remove the filter
list=_this2.stores.adversaries.all();// TODO this should be managed in App and passed as a prop to Filter
dispatcher.dispatch(CONFIG.MENU_FILTER,"")}// update tags in case there are no more characters with the ADVERSARY_TAG tag
var tags=unique(_this2.stores.adversaries.map(function(a){return a.tags}).flat());_this2.setState({editMode:false,editAdversary:null,selected:_this2.state.selected,list:list,tags:tags});_this2.selectAdversary(list[0])});// add customm skills
dispatcher.register(CONFIG.SKILL_ADD,function(skill){_this2.stores.skills.data=_this2.stores.skills.filter(function(f){return f.name!=skill.name});_this2.stores.skills.push(skill);// save it to local storage
var stored=Store.local.get(CONFIG.SKILL_STORE)||[];stored=stored.filter(function(d){return d.name!=skill.name});stored.push(skill);Store.local.set(CONFIG.SKILL_STORE,stored)})}},{key:"toggleMenu",value:function toggleMenu(){this.setState({menuOpen:!this.state.menuOpen})}},{key:"setLoaded",value:function setLoaded(){this.setState({isLoaded:this.loadedTotal==Object.keys(this.stores).length})}},{key:"selectAdversary",value:function selectAdversary(adversary){var selected=this.state.selected;selected[this.state.selectedIndex]=new Tab(adversary);this.setState({selected:selected});if(this.state.selected.length>0){location.hash=this.state.selected[this.state.selectedIndex].character.id}}},{key:"toggleAbout",value:function toggleAbout(){this.setState({showAbout:!this.state.showAbout})}},{key:"componentWillUnmount",value:function componentWillUnmount(){var _this3=this;Object.keys(this.stores).forEach(function(key){return _this3.stores[key].off(_this3.events[key])})}},{key:"filter",value:function filter(text){var adversaries=this.stores.adversaries.all();if(text!=""){text=text.toLowerCase();adversaries=adversaries.filter(function(a){return a.name.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().indexOf(text)!=-1||a.tags.find(function(t){return t.toLowerCase()==text})!=undefined})}this.setState({list:adversaries,filter:text});if(adversaries.length==1){this.selectAdversary(adversaries[0])}}},{key:"render",value:function render(){var _this4=this;var x=this.state.list!=null?this.state.list.length:0;var y=this.stores.adversaries!=null?this.stores.adversaries.all().length:0;var overlay=this.state.showAbout?React.createElement("div",{className:"overlay"},React.createElement("div",{className:"panel"},React.createElement("h3",null,"About"),React.createElement("p",null,"Genesys Adversaries is an easily searchable database of adversaries for ",React.createElement("a",{href:"https://www.fantasyflightgames.com/",target:"_blank"},"Fantasy Flight Games\u2019")," Genesys Roleplaying Game."),React.createElement("p",null,"Built by ",React.createElement("a",{href:"http://www.stoogoff.com/",target:"_blank"},"Stoo Goff"),", ",React.createElement("a",{href:"https://twitter.com/nlx3647",target:"_blank"},"nlx3647"),", and ",React.createElement("a",{href:"https://github.com/SkyJed",target:"_blank"},"SkyJedi"),". Some data entry by ",React.createElement("a",{href:"http://www.dylanpetrusma.com",target:"_blank"},"Dipicacyx"),"."),React.createElement("p",null,"This is a fork of Star Wars Adversaries, where most of the work was done. Want to support the future development of ",React.createElement("em",null,"Star Wars: Adversaries"),"?"),React.createElement("div",{id:"donation"},React.createElement("a",{href:"https://paypal.me/weevolve",target:"_blank",className:"btn"},"Donate")),React.createElement("div",{className:"btn pull-right",onClick:this.toggleAbout.bind(this)},React.createElement("svg",null,React.createElement("use",{xlinkHref:"#icon-cross"}))," ",React.createElement("span",null,"Close")))):null;var content=[React.createElement("div",null,this.state.selected.map(function(selected,index){return React.createElement(CharacterView,{key:index,character:selected.character,skills:_this4.stores.skills,weapons:_this4.stores.weapons,talents:_this4.stores.talents,qualities:_this4.stores.qualities,visible:index==_this4.state.selectedIndex})}),React.createElement(Tabs,{tabs:this.state.selected,selectedIndex:this.state.selectedIndex}))];if(this.state.editMode){content.push(React.createElement("div",{className:"overlay"},React.createElement(CharacterEdit,{character:this.state.editAdversary,skills:this.stores.skills,weapons:this.stores.weapons,talents:this.stores.talents,tags:this.state.tags,qualities:this.stores.qualities})))}return React.createElement("div",null,overlay,React.createElement("div",{id:"mobile-menu"},React.createElement("span",{className:"btn",onClick:this.toggleMenu.bind(this)},React.createElement("svg",null,React.createElement("use",{xlinkHref:"#icon-menu"}))),React.createElement("em",null,"Genesys: Adversaries")),React.createElement(TagMenu,{tags:this.state.tags}),React.createElement("div",{id:"navigation",className:(this.state.menuOpen?"menu-open":"menu-closed")+" column small"},React.createElement(Filter,{text:this.state.filter,handler:this.filter.bind(this)}),React.createElement("p",null,React.createElement("small",null,"Showing ",x," of ",y,".")),React.createElement(LinkList,{data:this.state.list,selected:this.state.selected.length>0?this.state.selected[this.state.selectedIndex].character.id:""})),React.createElement("div",{id:"content",className:"column large"},!this.state.isLoaded?React.createElement(Loader,null):content),React.createElement("div",{id:"built-by"},React.createElement("span",{className:"link",onClick:this.toggleAbout.bind(this)},"About")," | ",React.createElement("a",{href:"https://github.com/DPetrusma/genesys-adversaries",target:"_blank"},"Source")))}}]);return App}(React.Component);ReactDOM.render(React.createElement(App,null),document.getElementById("container"))}}});