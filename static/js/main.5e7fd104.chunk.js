(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{14:function(e,t,n){},15:function(e,t,n){},16:function(e,t,n){"use strict";n.r(t);var a=n(0),l=n.n(a),r=n(2),o=n.n(r),c=(n(14),n(3)),i=n(4),s=n(6),d=n(5),m=n(7),u=(n(15),function(e){function t(){var e,n;Object(c.a)(this,t);for(var a=arguments.length,l=new Array(a),r=0;r<a;r++)l[r]=arguments[r];return(n=Object(s.a)(this,(e=Object(d.a)(t)).call.apply(e,[this].concat(l)))).state={element_field:[],length_field:[],element_texarea:"",length_textarea:""},n.generateXSD=function(){console.log(n.state.element_field),n.downloadTxtFile()},n.downloadTxtFile=function(){var e=document.createElement("a"),t=new Blob([n.state.element_field],{type:"text/xml"});e.href=URL.createObjectURL(t),e.download="myFile.xsd",document.body.appendChild(e),e.click()},n.onDataInputChange=function(e){n.setState({element_texarea:e.target.value})},n.onGenerateClick=function(){var e=n.state.element_texarea.replace(/^\s*$(?:\r\n?|\n)/gm,"").trim().split("\n");e=e.map(function(e,t){return"f"+(t+1).toString().concat("_",e.replace(/ /g,"_"))}),n.setState({element_field:e},function(){this.generateXSD()})},n}return Object(m.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return l.a.createElement("div",{className:"App"},l.a.createElement("header",null,l.a.createElement("h1",null,"Generate Damn XSD for CNB"),l.a.createElement("button",{className:"success",onClick:this.onGenerateClick},"Generate")),l.a.createElement("div",{className:"fields"},l.a.createElement("div",{className:"fields_area"},l.a.createElement("h2",null,"Copy/Paste field names here:"),l.a.createElement("textarea",{name:"fields",id:"fields_id",cols:"40",rows:"30",onChange:this.onDataInputChange})),l.a.createElement("div",{className:"length_area"},l.a.createElement("h2",null,"Copy/Paste field lenghts here: "),l.a.createElement("textarea",{name:"fields",id:"fields_id",cols:"20",rows:"30"}))))}}]),t}(a.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(l.a.createElement(u,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},8:function(e,t,n){e.exports=n(16)}},[[8,1,2]]]);
//# sourceMappingURL=main.5e7fd104.chunk.js.map