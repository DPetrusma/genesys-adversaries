"use strict";System.register(["react","./input/text","./input/select","./panel-code","lib/config","../lib/list","../lib/string"],function(_export,_context){"use strict";var React,TextInput,TextArea,AutoComplete,Select,PanelCode,CONFIG,findByProperty,isNumeric,id,_createClass,PanelTalentEdit;function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function")}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}return call&&(typeof call==="object"||typeof call==="function")?call:self}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass)}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass}return{setters:[function(_react){React=_react.default},function(_inputText){TextInput=_inputText.TextInput;TextArea=_inputText.TextArea;AutoComplete=_inputText.AutoComplete},function(_inputSelect){Select=_inputSelect.default},function(_panelCode){PanelCode=_panelCode.default},function(_libConfig){CONFIG=_libConfig},function(_libList){findByProperty=_libList.findByProperty},function(_libString){isNumeric=_libString.isNumeric;id=_libString.id}],execute:function(){_createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();PanelTalentEdit=function(_React$Component){_inherits(PanelTalentEdit,_React$Component);function PanelTalentEdit(props){_classCallCheck(this,PanelTalentEdit);var _this=_possibleConstructorReturn(this,(PanelTalentEdit.__proto__||Object.getPrototypeOf(PanelTalentEdit)).call(this,props));var initialState={selected:"",id:"",name:"",rank:"",description:"",isNew:false};// set form state from initial editing prop, if available
if(_this.props.editing){initialState.id=_this.props.editing.id;initialState.name=_this.props.editing.name;initialState.rank=_this.props.editing.rank;initialState.description=_this.props.editing.description}_this.state=initialState;return _this}_createClass(PanelTalentEdit,[{key:"componentWillUpdate",value:function componentWillUpdate(nextProps,nextState){if(nextProps.editing!==this.props.editing){var newState={id:"",name:"",rank:"",description:""};if(nextProps.editing&&"name"in nextProps.editing){newState.id=nextProps.editing.id;newState.name=nextProps.editing.name;newState.rank=nextProps.editing.rank;newState.description=nextProps.editing.description}this.setState(newState)}}},{key:"setRank",value:function setRank(rank){this.setState({rank:rank})}},{key:"setName",value:function setName(name){this.setState({name:name,isNew:!(!name||!this.state.description)})}},{key:"setDesc",value:function setDesc(desc){this.setState({description:desc,isNew:!(!this.state.name||!desc)})}},{key:"selectItem",value:function selectItem(name){var item=this.props.list.find(findByProperty("name",name));if(item){this.setState({selected:item})}}},{key:"add",value:function add(){var selected=this.state.selected;if(selected&&this.props.handler){var name=selected.name;if(selected.ranked){name+=" "+this.state.rank}this.props.handler(name)}this.setState({selected:"",rank:""})}},{key:"create",value:function create(){var talent={id:this.state.id||CONFIG.ADVERSARY_ID+id(this.state.name),name:this.state.name,description:this.state.description};if(this.state.rank){talent.name+=" "+this.state.rank;talent.ranked=true}if(this.props.handler){this.props.handler(talent)}if(this.props.close){this.props.close()}this.setState({id:"",name:"",description:"",rank:"",isNew:false})}},{key:"canAddSelected",value:function canAddSelected(){// no selected item so can't add
if(!this.state.selected){return false}// a selected item which isn't ranked so can add
if(!this.state.selected.ranked){return true}// can add if rank is filled in and is numeric
return this.state.rank!=""&&isNumeric(this.state.rank)}},{key:"render",value:function render(){var list=this.props.list.map(function(i){return i.name});var selected=this.state.selected?this.state.selected.name:"";var title=(this.props.editing?"Edit":"Create")+" "+this.props.title;var button=(this.props.editing?"Save":"Add New")+" "+this.props.title;var form=React.createElement("div",null,React.createElement("h3",null," ",title),React.createElement(TextInput,{label:"Name",value:this.state.name,handler:this.setName.bind(this),required:true}),React.createElement(TextInput,{label:"Rank",value:this.state.rank,handler:this.setRank.bind(this)}),React.createElement(TextArea,{label:"Description",value:this.state.description,handler:this.setDesc.bind(this),required:true}),React.createElement("button",{className:"btn-full",disabled:!this.state.isNew,onClick:this.create.bind(this)},button),React.createElement(PanelCode,null));return React.createElement("div",null,this.props.editing?form:React.createElement("div",null,React.createElement("h3",null,"Select ",this.props.title),React.createElement(AutoComplete,{label:this.props.title,value:selected,values:list,handler:this.selectItem.bind(this),required:true}),this.state.selected&&this.state.selected.ranked?React.createElement(TextInput,{label:"Rank",value:this.state.rank,handler:this.setRank.bind(this),required:true,numeric:true}):null,React.createElement("button",{className:"btn-full",disabled:!this.canAddSelected(),onClick:this.add.bind(this)},"Add Selected ",this.props.title),React.createElement("div",{className:"divider"},React.createElement("span",null,"OR")),form))}}]);return PanelTalentEdit}(React.Component);_export("default",PanelTalentEdit)}}});