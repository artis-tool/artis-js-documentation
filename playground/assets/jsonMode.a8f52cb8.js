import{e as m,R as P,l as p,a as _}from"./index.cda3c589.js";import{I as y,C as d,F as w,D as S,S as f,c as L}from"./jsonWorker.dcb53f3c.js";import"./editorWorker.6c0d8014.js";var K=2*60*1e3,W=function(){function t(e){var r=this;this._defaults=e,this._worker=null,this._idleCheckInterval=setInterval(function(){return r._checkIfIdle()},30*1e3),this._lastUsedTime=0,this._configChangeListener=this._defaults.onDidChange(function(){return r._stopWorker()})}return t.prototype._stopWorker=function(){this._worker&&(this._worker.dispose(),this._worker=null),this._client=null},t.prototype.dispose=function(){clearInterval(this._idleCheckInterval),this._configChangeListener.dispose(),this._stopWorker()},t.prototype._checkIfIdle=function(){if(!!this._worker){var e=Date.now()-this._lastUsedTime;e>K&&this._stopWorker()}},t.prototype._getClient=function(){return this._lastUsedTime=Date.now(),this._client||(this._worker=m.createWebWorker({moduleId:"vs/language/json/jsonWorker",label:this._defaults.languageId,createData:{languageSettings:this._defaults.diagnosticsOptions,languageId:this._defaults.languageId,enableSchemaRequest:this._defaults.diagnosticsOptions.enableSchemaRequest}}),this._client=this._worker.getProxy()),this._client},t.prototype.getLanguageServiceWorker=function(){for(var e=this,r=[],u=0;u<arguments.length;u++)r[u]=arguments[u];var o;return this._getClient().then(function(i){o=i}).then(function(i){return e._worker.withSyncedResources(r)}).then(function(i){return o})},t}(),j=function(){function t(e,r,u){var o=this;this._languageId=e,this._worker=r,this._disposables=[],this._listener=Object.create(null);var i=function(n){var s=n.getModeId();if(s===o._languageId){var l;o._listener[n.uri.toString()]=n.onDidChangeContent(function(){clearTimeout(l),l=setTimeout(function(){return o._doValidate(n.uri,s)},500)}),o._doValidate(n.uri,s)}},a=function(n){m.setModelMarkers(n,o._languageId,[]);var s=n.uri.toString(),l=o._listener[s];l&&(l.dispose(),delete o._listener[s])};this._disposables.push(m.onDidCreateModel(i)),this._disposables.push(m.onWillDisposeModel(function(n){a(n),o._resetSchema(n.uri)})),this._disposables.push(m.onDidChangeModelLanguage(function(n){a(n.model),i(n.model),o._resetSchema(n.model.uri)})),this._disposables.push(u.onDidChange(function(n){m.getModels().forEach(function(s){s.getModeId()===o._languageId&&(a(s),i(s))})})),this._disposables.push({dispose:function(){m.getModels().forEach(a);for(var n in o._listener)o._listener[n].dispose()}}),m.getModels().forEach(i)}return t.prototype.dispose=function(){this._disposables.forEach(function(e){return e&&e.dispose()}),this._disposables=[]},t.prototype._resetSchema=function(e){this._worker().then(function(r){r.resetSchema(e.toString())})},t.prototype._doValidate=function(e,r){this._worker(e).then(function(u){return u.doValidation(e.toString()).then(function(o){var i=o.map(function(n){return U(e,n)}),a=m.getModel(e);a&&a.getModeId()===r&&m.setModelMarkers(a,r,i)})}).then(void 0,function(u){console.error(u)})},t}();function V(t){switch(t){case S.Error:return _.Error;case S.Warning:return _.Warning;case S.Information:return _.Info;case S.Hint:return _.Hint;default:return _.Info}}function U(t,e){var r=typeof e.code=="number"?String(e.code):e.code;return{severity:V(e.severity),startLineNumber:e.range.start.line+1,startColumn:e.range.start.character+1,endLineNumber:e.range.end.line+1,endColumn:e.range.end.character+1,message:e.message,code:r,source:e.source}}function b(t){if(!!t)return{character:t.column-1,line:t.lineNumber-1}}function D(t){if(!!t)return{start:{line:t.startLineNumber-1,character:t.startColumn-1},end:{line:t.endLineNumber-1,character:t.endColumn-1}}}function v(t){if(!!t)return new P(t.start.line+1,t.start.character+1,t.end.line+1,t.end.character+1)}function H(t){return typeof t.insert<"u"&&typeof t.replace<"u"}function B(t){var e=p.CompletionItemKind;switch(t){case d.Text:return e.Text;case d.Method:return e.Method;case d.Function:return e.Function;case d.Constructor:return e.Constructor;case d.Field:return e.Field;case d.Variable:return e.Variable;case d.Class:return e.Class;case d.Interface:return e.Interface;case d.Module:return e.Module;case d.Property:return e.Property;case d.Unit:return e.Unit;case d.Value:return e.Value;case d.Enum:return e.Enum;case d.Keyword:return e.Keyword;case d.Snippet:return e.Snippet;case d.Color:return e.Color;case d.File:return e.File;case d.Reference:return e.Reference}return e.Property}function C(t){if(!!t)return{range:v(t.range),text:t.newText}}var q=function(){function t(e){this._worker=e}return Object.defineProperty(t.prototype,"triggerCharacters",{get:function(){return[" ",":"]},enumerable:!1,configurable:!0}),t.prototype.provideCompletionItems=function(e,r,u,o){var i=e.uri;return this._worker(i).then(function(a){return a.doComplete(i.toString(),b(r))}).then(function(a){if(!!a){var n=e.getWordUntilPosition(r),s=new P(r.lineNumber,n.startColumn,r.lineNumber,n.endColumn),l=a.items.map(function(c){var h={label:c.label,insertText:c.insertText||c.label,sortText:c.sortText,filterText:c.filterText,documentation:c.documentation,detail:c.detail,range:s,kind:B(c.kind)};return c.textEdit&&(H(c.textEdit)?h.range={insert:v(c.textEdit.insert),replace:v(c.textEdit.replace)}:h.range=v(c.textEdit.range),h.insertText=c.textEdit.newText),c.additionalTextEdits&&(h.additionalTextEdits=c.additionalTextEdits.map(C)),c.insertTextFormat===y.Snippet&&(h.insertTextRules=p.CompletionItemInsertTextRule.InsertAsSnippet),h});return{isIncomplete:a.isIncomplete,suggestions:l}}})},t}();function z(t){return t&&typeof t=="object"&&typeof t.kind=="string"}function I(t){return typeof t=="string"?{value:t}:z(t)?t.kind==="plaintext"?{value:t.value.replace(/[\\`*_{}[\]()#+\-.!]/g,"\\$&")}:{value:t.value}:{value:"```"+t.language+`
`+t.value+"\n```\n"}}function J(t){if(!!t)return Array.isArray(t)?t.map(I):[I(t)]}var Y=function(){function t(e){this._worker=e}return t.prototype.provideHover=function(e,r,u){var o=e.uri;return this._worker(o).then(function(i){return i.doHover(o.toString(),b(r))}).then(function(i){if(!!i)return{range:v(i.range),contents:J(i.contents)}})},t}();function G(t){var e=p.SymbolKind;switch(t){case f.File:return e.Array;case f.Module:return e.Module;case f.Namespace:return e.Namespace;case f.Package:return e.Package;case f.Class:return e.Class;case f.Method:return e.Method;case f.Property:return e.Property;case f.Field:return e.Field;case f.Constructor:return e.Constructor;case f.Enum:return e.Enum;case f.Interface:return e.Interface;case f.Function:return e.Function;case f.Variable:return e.Variable;case f.Constant:return e.Constant;case f.String:return e.String;case f.Number:return e.Number;case f.Boolean:return e.Boolean;case f.Array:return e.Array}return e.Function}var $=function(){function t(e){this._worker=e}return t.prototype.provideDocumentSymbols=function(e,r){var u=e.uri;return this._worker(u).then(function(o){return o.findDocumentSymbols(u.toString())}).then(function(o){if(!!o)return o.map(function(i){return{name:i.name,detail:"",containerName:i.containerName,kind:G(i.kind),range:v(i.location.range),selectionRange:v(i.location.range),tags:[]}})})},t}();function F(t){return{tabSize:t.tabSize,insertSpaces:t.insertSpaces}}var Q=function(){function t(e){this._worker=e}return t.prototype.provideDocumentFormattingEdits=function(e,r,u){var o=e.uri;return this._worker(o).then(function(i){return i.format(o.toString(),null,F(r)).then(function(a){if(!(!a||a.length===0))return a.map(C)})})},t}(),X=function(){function t(e){this._worker=e}return t.prototype.provideDocumentRangeFormattingEdits=function(e,r,u,o){var i=e.uri;return this._worker(i).then(function(a){return a.format(i.toString(),D(r),F(u)).then(function(n){if(!(!n||n.length===0))return n.map(C)})})},t}(),Z=function(){function t(e){this._worker=e}return t.prototype.provideDocumentColors=function(e,r){var u=e.uri;return this._worker(u).then(function(o){return o.findDocumentColors(u.toString())}).then(function(o){if(!!o)return o.map(function(i){return{color:i.color,range:v(i.range)}})})},t.prototype.provideColorPresentations=function(e,r,u){var o=e.uri;return this._worker(o).then(function(i){return i.getColorPresentations(o.toString(),r.color,D(r.range))}).then(function(i){if(!!i)return i.map(function(a){var n={label:a.label};return a.textEdit&&(n.textEdit=C(a.textEdit)),a.additionalTextEdits&&(n.additionalTextEdits=a.additionalTextEdits.map(C)),n})})},t}(),ee=function(){function t(e){this._worker=e}return t.prototype.provideFoldingRanges=function(e,r,u){var o=e.uri;return this._worker(o).then(function(i){return i.getFoldingRanges(o.toString(),r)}).then(function(i){if(!!i)return i.map(function(a){var n={start:a.startLine+1,end:a.endLine+1};return typeof a.kind<"u"&&(n.kind=te(a.kind)),n})})},t}();function te(t){switch(t){case w.Comment:return p.FoldingRangeKind.Comment;case w.Imports:return p.FoldingRangeKind.Imports;case w.Region:return p.FoldingRangeKind.Region}}var re=function(){function t(e){this._worker=e}return t.prototype.provideSelectionRanges=function(e,r,u){var o=e.uri;return this._worker(o).then(function(i){return i.getSelectionRanges(o.toString(),r.map(b))}).then(function(i){if(!!i)return i.map(function(a){for(var n=[];a;)n.push({range:v(a.range)}),a=a.parent;return n})})},t}();function ne(t){return{getInitialState:function(){return new x(null,null,!1,null)},tokenize:function(e,r,u,o){return pe(t,e,r,u)}}}var T="delimiter.bracket.json",M="delimiter.array.json",oe="delimiter.colon.json",ie="delimiter.comma.json",ae="keyword.json",se="keyword.json",ue="string.value.json",ce="number.json",le="string.key.json",de="comment.block.json",fe="comment.line.json",k=function(){function t(e,r){this.parent=e,this.type=r}return t.pop=function(e){return e?e.parent:null},t.push=function(e,r){return new t(e,r)},t.equals=function(e,r){if(!e&&!r)return!0;if(!e||!r)return!1;for(;e&&r;){if(e===r)return!0;if(e.type!==r.type)return!1;e=e.parent,r=r.parent}return!0},t}(),x=function(){function t(e,r,u,o){this._state=e,this.scanError=r,this.lastWasColon=u,this.parents=o}return t.prototype.clone=function(){return new t(this._state,this.scanError,this.lastWasColon,this.parents)},t.prototype.equals=function(e){return e===this?!0:!e||!(e instanceof t)?!1:this.scanError===e.scanError&&this.lastWasColon===e.lastWasColon&&k.equals(this.parents,e.parents)},t.prototype.getStateData=function(){return this._state},t.prototype.setStateData=function(e){this._state=e},t}();function pe(t,e,r,u,o){u===void 0&&(u=0);var i=0,a=!1;switch(r.scanError){case 2:e='"'+e,i=1;break;case 1:e="/*"+e,i=2;break}for(var n=L(e),s=r.lastWasColon,l=r.parents,c={tokens:[],endState:r.clone()};;){var h=u+n.getPosition(),g="",E=n.scan();if(E===17)break;if(h===u+n.getPosition())throw new Error("Scanner did not advance, next 3 characters are: "+e.substr(n.getPosition(),3));switch(a&&(h-=i),a=i>0,E){case 1:l=k.push(l,0),g=T,s=!1;break;case 2:l=k.pop(l),g=T,s=!1;break;case 3:l=k.push(l,1),g=M,s=!1;break;case 4:l=k.pop(l),g=M,s=!1;break;case 6:g=oe,s=!0;break;case 5:g=ie,s=!1;break;case 8:case 9:g=ae,s=!1;break;case 7:g=se,s=!1;break;case 10:var A=l?l.type:0,O=A===1;g=s||O?ue:le,s=!1;break;case 11:g=ce,s=!1;break}if(t)switch(E){case 12:g=fe;break;case 13:g=de;break}c.endState=new x(r.getStateData(),n.getTokenError(),s,l),c.tokens.push({startIndex:h,scopes:g})}return c}function _e(t){var e=[],r=[],u=new W(t);e.push(u);var o=function(){for(var n=[],s=0;s<arguments.length;s++)n[s]=arguments[s];return u.getLanguageServiceWorker.apply(u,n)};function i(){var n=t.languageId,s=t.modeConfiguration;N(r),s.documentFormattingEdits&&r.push(p.registerDocumentFormattingEditProvider(n,new Q(o))),s.documentRangeFormattingEdits&&r.push(p.registerDocumentRangeFormattingEditProvider(n,new X(o))),s.completionItems&&r.push(p.registerCompletionItemProvider(n,new q(o))),s.hovers&&r.push(p.registerHoverProvider(n,new Y(o))),s.documentSymbols&&r.push(p.registerDocumentSymbolProvider(n,new $(o))),s.tokens&&r.push(p.setTokensProvider(n,ne(!0))),s.colors&&r.push(p.registerColorProvider(n,new Z(o))),s.foldingRanges&&r.push(p.registerFoldingRangeProvider(n,new ee(o))),s.diagnostics&&r.push(new j(n,o,t)),s.selectionRanges&&r.push(p.registerSelectionRangeProvider(n,new re(o)))}i(),e.push(p.setLanguageConfiguration(t.languageId,ge));var a=t.modeConfiguration;return t.onDidChange(function(n){n.modeConfiguration!==a&&(a=n.modeConfiguration,i())}),e.push(R(r)),R(e)}function R(t){return{dispose:function(){return N(t)}}}function N(t){for(;t.length;)t.pop().dispose()}var ge={wordPattern:/(-?\d*\.\d\w*)|([^\[\{\]\}\:\"\,\s]+)/g,comments:{lineComment:"//",blockComment:["/*","*/"]},brackets:[["{","}"],["[","]"]],autoClosingPairs:[{open:"{",close:"}",notIn:["string"]},{open:"[",close:"]",notIn:["string"]},{open:'"',close:'"',notIn:["string"]}]};export{_e as setupMode};
