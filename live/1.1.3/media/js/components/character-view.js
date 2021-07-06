"use strict";System.register(["react","remarkable","./panel-info","./panel-skill","./panel-text","./panel-weapons","./panel-talent","./panel-tag","../lib/utils","lib/dispatcher","lib/config"],function(_export,_context){"use strict";var React,Remarkable,PanelInfo,PanelSkill,PanelText,PanelWeapons,PanelTalent,PanelTag,symbolise,getSourceLink,dispatcher,CONFIG,_createClass,CharacterView;function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function")}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}return call&&(typeof call==="object"||typeof call==="function")?call:self}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass)}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass}return{setters:[function(_react){React=_react.default},function(_remarkable){Remarkable=_remarkable.default},function(_panelInfo){PanelInfo=_panelInfo.default},function(_panelSkill){PanelSkill=_panelSkill.default},function(_panelText){PanelText=_panelText.default},function(_panelWeapons){PanelWeapons=_panelWeapons.default},function(_panelTalent){PanelTalent=_panelTalent.default},function(_panelTag){PanelTag=_panelTag.default},function(_libUtils){symbolise=_libUtils.symbolise;getSourceLink=_libUtils.getSourceLink},function(_libDispatcher){dispatcher=_libDispatcher.default},function(_libConfig){CONFIG=_libConfig}],execute:function(){_createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();CharacterView=function(_React$Component){_inherits(CharacterView,_React$Component);function CharacterView(props){_classCallCheck(this,CharacterView);var _this=_possibleConstructorReturn(this,(CharacterView.__proto__||Object.getPrototypeOf(CharacterView)).call(this,props));_this.state={minions:1,currentWounds:0,aliveMinions:1,displayCharacterMenu:false};_this.md=new Remarkable;return _this}_createClass(CharacterView,[{key:"componentWillUpdate",value:function componentWillUpdate(nextProps,nextState){if(nextProps.character!==this.props.character){this.setState({displayCharacterMenu:false})}}},{key:"setMinions",value:function setMinions(minions){if(minions<=1){minions=1;this.setState({currentWounds:0,aliveMinions:0})}else{this.setAliveMinions(minions,this.state.currentWounds)}this.setState({minions:minions})}},{key:"setAliveMinions",value:function setAliveMinions(minions,currentWounds){var character=this.props.character;var aliveMinions=minions;if(currentWounds>0)aliveMinions=minions-Math.floor((currentWounds-1)/character.derived.wounds);this.setState({aliveMinions:aliveMinions})}},{key:"setCurrentWounds",value:function setCurrentWounds(e){e.preventDefault();this.setState({currentWounds:Number(this.refs.currentWounds.value)});this.setAliveMinions(this.state.minions,this.refs.currentWounds.value);this.refs.currentWounds.blur();this.refs.currentWounds.value=""}},{key:"addFavourite",value:function addFavourite(id){var character=this.props.character;if(!character){return}dispatcher.dispatch(CONFIG.FAVOURITE_ADD,character.id);this.setState({displayCharacterMenu:false})}},{key:"removeFavourite",value:function removeFavourite(id){var character=this.props.character;if(!character){return}dispatcher.dispatch(CONFIG.FAVOURITE_REMOVE,character.id);this.toggleCharacterMenu()}},{key:"createAdversary",value:function createAdversary(){dispatcher.dispatch(CONFIG.ADVERSARY_ADD);this.toggleCharacterMenu()}},{key:"copyAdversary",value:function copyAdversary(id){dispatcher.dispatch(CONFIG.ADVERSARY_COPY,this.props.character.id);this.toggleCharacterMenu()}},{key:"deleteAdversary",value:function deleteAdversary(){if(confirm("Are you sure you want to delete this adversary? This action cannot be undone.")){dispatcher.dispatch(CONFIG.ADVERSARY_DELETE,this.props.character.id)}this.toggleCharacterMenu()}},{key:"toggleCharacterMenu",value:function toggleCharacterMenu(){this.setState({displayCharacterMenu:!this.state.displayCharacterMenu})}},{key:"render",value:function render(){var character=this.props.character;if(!character){return null}var characteristics=[];for(var _i in character.characteristics){characteristics.push({"name":_i,"value":character.characteristics[_i]})}var defence="defence"in character.derived?character.derived.defence.join(" | "):"0 | 0";// header icon based on important tags
var icon=null;if(character.tags.indexOf("rebel alliance")!=-1){icon=React.createElement("svg",null,React.createElement("use",{xlinkHref:"#rebel-alliance"}))}else if(character.tags.indexOf("empire")!=-1){icon=React.createElement("svg",null,React.createElement("use",{xlinkHref:"#galactic-empire"}))}else if(character.tags.indexOf("first order")!=-1){icon=React.createElement("svg",null,React.createElement("use",{xlinkHref:"#first-order"}))}// get all of the character's skills and characteristics as a hash
var stats={};for(var i in character.characteristics){stats[i]=character.characteristics[i]}if(character.type!==CONFIG.MINION){for(var i in character.skills){stats[i]=character.skills[i]}}// add force rating
(character.talents||[]).forEach(function(t){if(t&&t.startsWith&&t.startsWith("Force Rating")){stats["Force Rating"]=t.split(" ")[2]}});var source=null;var sourceTag=character.tags.find(function(t){return t.startsWith("source:")});if(character.source&&sourceTag){var url=character.source.length?character.source:character.source.url;var owner=character.source.length?"":character.source.owner+" of";source="<p><em>"+character.name+" stats provided by "+owner+" "+getSourceLink(sourceTag)+".";if(url){source+=" Click to <a href=\""+url+"\" target=\"_blank\">view original stats and descriptions</a>.</em></p>"}}// character menu options and state
var activeMenuState=this.state.displayCharacterMenu?"active":"";// favourite menu item
var favLink=character.favourite?React.createElement("li",{onClick:this.removeFavourite.bind(this)},React.createElement("svg",{className:"star-filled outline"},React.createElement("use",{xlinkHref:"#icon-star-full"}))," Remove Favourite"):React.createElement("li",{onClick:this.addFavourite.bind(this)},React.createElement("svg",null,React.createElement("use",{xlinkHref:"#icon-star-empty"}))," Add Favourite");// edit or copy menu item
var copyLink=character.id.startsWith(CONFIG.ADVERSARY_ID)?[React.createElement("li",{onClick:this.copyAdversary.bind(this)},React.createElement("svg",null,React.createElement("use",{xlinkHref:"#icon-edit"}))," Edit"),React.createElement("li",{onClick:this.deleteAdversary.bind(this)},React.createElement("svg",null,React.createElement("use",{xlinkHref:"#icon-delete"}))," Delete")]:React.createElement("li",{onClick:this.copyAdversary.bind(this)},React.createElement("svg",null,React.createElement("use",{xlinkHref:"#icon-copy"}))," Copy");var favIcon=null;if(character.favourite){favIcon=React.createElement("svg",{className:"star-filled outline"},React.createElement("use",{xlinkHref:"#icon-star-full"}))}return React.createElement("div",{className:!this.props.visible?"hidden":null},React.createElement("h1",{"data-adversary-type":character.type,className:character.devOnly||character.id.startsWith(CONFIG.ADVERSARY_ID)?"dev":""},icon," ",character.name," ",favIcon),React.createElement("h2",{className:"subtitle"},React.createElement("span",{className:character.type.toLowerCase()},character.type),React.createElement("span",{className:"btn "+activeMenuState,onClick:this.toggleCharacterMenu.bind(this)},React.createElement("svg",null,React.createElement("use",{xlinkHref:"#icon-menu"}))),React.createElement("div",{id:"menu-character",className:activeMenuState},React.createElement("ul",null,React.createElement("li",{onClick:this.createAdversary.bind(this)},React.createElement("svg",null,React.createElement("use",{xlinkHref:"#icon-plus"}))," Create New"),copyLink,favLink))),React.createElement(PanelText,{text:character.description}),character.notes?React.createElement("div",{className:"text",dangerouslySetInnerHTML:symbolise(this.md.render("*"+character.notes+"*"))}):null,source?React.createElement("div",{className:"text",dangerouslySetInnerHTML:{__html:source}}):null,React.createElement("div",{className:"column small"},React.createElement("div",{className:"stats",id:"characteristics"},characteristics.map(function(c){return React.createElement("div",{key:c.name},React.createElement("span",null,c.value),React.createElement("h3",null,c.name))})),React.createElement("div",{className:"stats",id:"derived"},React.createElement("div",null,React.createElement("h3",null,"Soak"),React.createElement("span",null,character.derived.soak)),React.createElement("div",null,React.createElement("h3",null,"Wounds ",React.createElement("small",null,"Threshold | Current")),React.createElement("span",null,character.type===CONFIG.MINION?character.derived.wounds*this.state.minions:character.derived.wounds," |"),React.createElement("form",{style:{display:"inline"},onSubmit:this.setCurrentWounds.bind(this)},React.createElement("input",{type:"text",placeholder:this.state.currentWounds,maxLength:"2",ref:"currentWounds"}))),character.type===CONFIG.NEMESIS||character.type===CONFIG.APEX_NEMESIS||character.type===CONFIG.PARAGON_NEMESIS?React.createElement("div",null,React.createElement("h3",null,"Strain ",React.createElement("small",null,"Threshold | Current")),React.createElement("span",null,character.derived.strain," |"),React.createElement("input",{type:"text",defaultValue:"0",maxLength:"2"})):null,React.createElement("div",null,React.createElement("h3",null,"Defence ",React.createElement("small",null,"\xA0 Melee | Ranged")),React.createElement("span",null,defence)))),React.createElement("div",{className:"column large"},React.createElement(PanelSkill,{character:character,skills:this.props.skills,aliveMinions:this.state.aliveMinions,minions:this.state.minions,setMinions:this.setMinions.bind(this)}),React.createElement(PanelWeapons,{title:"Weapons",character:character,skills:this.props.skills,weapons:this.props.weapons,qualities:this.props.qualities,talents:this.props.talents,aliveMinions:this.state.aliveMinions,minions:this.state.minions}),React.createElement(PanelTalent,{title:"Talents",stats:stats,data:character.talents,talents:this.props.talents}),React.createElement(PanelTalent,{title:"Abilities",stats:stats,data:character.abilities,talents:this.props.talents}),React.createElement(PanelInfo,{title:"Gear",text:character.gear}),React.createElement(PanelTag,{title:"Tags",data:character.tags})))}}]);return CharacterView}(React.Component);_export("default",CharacterView)}}});