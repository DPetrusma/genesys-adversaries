"use strict";System.register(["react","./input/text","./input/select","lib/utils","lib/dispatcher","lib/config"],function(_export,_context){"use strict";var React,TextInput,Select,characteristics,dispatcher,CONFIG,_createClass,PanelSkillEdit;function _toConsumableArray(arr){if(Array.isArray(arr)){for(var i=0,arr2=Array(arr.length);i<arr.length;i++){arr2[i]=arr[i]}return arr2}else{return Array.from(arr)}}function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true})}else{obj[key]=value}return obj}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function")}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}return call&&(typeof call==="object"||typeof call==="function")?call:self}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass)}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass}return{setters:[function(_react){React=_react.default},function(_inputText){TextInput=_inputText.TextInput},function(_inputSelect){Select=_inputSelect.default},function(_libUtils){characteristics=_libUtils.characteristics},function(_libDispatcher){dispatcher=_libDispatcher.default},function(_libConfig){CONFIG=_libConfig}],execute:function(){_createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();PanelSkillEdit=function(_React$Component){_inherits(PanelSkillEdit,_React$Component);function PanelSkillEdit(props){_classCallCheck(this,PanelSkillEdit);var _this=_possibleConstructorReturn(this,(PanelSkillEdit.__proto__||Object.getPrototypeOf(PanelSkillEdit)).call(this,props));_this.types=["","General","Combat","Knowledge"];_this.state={name:"",characteristic:"",type:""};return _this}_createClass(PanelSkillEdit,[{key:"setValue",value:function setValue(attr){var _this2=this;return function(val){_this2.setState(_defineProperty({},attr,val))}}},{key:"add",value:function add(){dispatcher.dispatch(CONFIG.SKILL_ADD,this.state)}},{key:"canAdd",value:function canAdd(){var _this3=this;var values=["name","characteristic","type"];return values.map(function(c){return _this3.state[c]}).filter(function(f){return f!=""}).length==values.length}},{key:"render",value:function render(){return React.createElement("div",null,React.createElement("h3",null,"New Skill"),React.createElement(TextInput,{label:"Skill Name",value:this.state.name,handler:this.setValue("name").bind(this),required:true}),React.createElement(Select,{label:"Characteristic",value:this.state.characteristic,values:[""].concat(_toConsumableArray(characteristics)),handler:this.setValue("characteristic").bind(this),required:true}),React.createElement(Select,{label:"Type",value:this.state.type,values:this.types,handler:this.setValue("type").bind(this),required:true}),React.createElement("button",{className:"btn-full",disabled:!this.canAdd(),onClick:this.add.bind(this)},"Add Custom Skill"))}}]);return PanelSkillEdit}(React.Component);_export("default",PanelSkillEdit)}}});