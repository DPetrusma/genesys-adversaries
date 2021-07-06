"use strict";System.register(["./nanoajax","./collection","./string"],function(_export,_context){"use strict";var ajax,Collection,id,_createClass,DataStore;function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function")}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}return call&&(typeof call==="object"||typeof call==="function")?call:self}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass)}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass}return{setters:[function(_nanoajax){ajax=_nanoajax.default},function(_collection){Collection=_collection.default},function(_string){id=_string.id}],execute:function(){_createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();DataStore=function(_Collection){_inherits(DataStore,_Collection);function DataStore(url){var _ref;_classCallCheck(this,DataStore);for(var _len=arguments.length,args=Array(_len>1?_len-1:0),_key=1;_key<_len;_key++){args[_key-1]=arguments[_key]}var _this=_possibleConstructorReturn(this,(_ref=DataStore.__proto__||Object.getPrototypeOf(DataStore)).call.apply(_ref,[this].concat(args)));_this.url=url;return _this}_createClass(DataStore,[{key:"load",value:function load(callback){var _this2=this;ajax({url:this.url},function(code,response,xhr){var data=JSON.parse(response);// force everything to have an id
data.forEach(function(d){if(!d.id){d.id=id(d.name)}});if(callback){callback(data)}_this2.concat(data)})}}]);return DataStore}(Collection);_export("default",DataStore)}}});