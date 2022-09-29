import{e as W,R as _,l as s,U as L}from"./index.3bf372e2.js";import{I as M,C as c,F as m,D as h,S as d}from"./htmlWorker.9b674e26.js";import"./editorWorker.6c0d8014.js";var N=2*60*1e3,S=function(){function e(r){var n=this;this._defaults=r,this._worker=null,this._idleCheckInterval=setInterval(function(){return n._checkIfIdle()},30*1e3),this._lastUsedTime=0,this._configChangeListener=this._defaults.onDidChange(function(){return n._stopWorker()})}return e.prototype._stopWorker=function(){this._worker&&(this._worker.dispose(),this._worker=null),this._client=null},e.prototype.dispose=function(){clearInterval(this._idleCheckInterval),this._configChangeListener.dispose(),this._stopWorker()},e.prototype._checkIfIdle=function(){if(!!this._worker){var r=Date.now()-this._lastUsedTime;r>N&&this._stopWorker()}},e.prototype._getClient=function(){return this._lastUsedTime=Date.now(),this._client||(this._worker=W.createWebWorker({moduleId:"vs/language/html/htmlWorker",createData:{languageSettings:this._defaults.options,languageId:this._defaults.languageId},label:this._defaults.languageId}),this._client=this._worker.getProxy()),this._client},e.prototype.getLanguageServiceWorker=function(){for(var r=this,n=[],u=0;u<arguments.length;u++)n[u]=arguments[u];var i;return this._getClient().then(function(t){i=t}).then(function(t){return r._worker.withSyncedResources(n)}).then(function(t){return i})},e}();function f(e){if(!!e)return{character:e.column-1,line:e.lineNumber-1}}function U(e){if(!!e)return{start:f(e.getStartPosition()),end:f(e.getEndPosition())}}function l(e){if(!!e)return new _(e.start.line+1,e.start.character+1,e.end.line+1,e.end.character+1)}function V(e){return typeof e.insert<"u"&&typeof e.replace<"u"}function O(e){var r=s.CompletionItemKind;switch(e){case c.Text:return r.Text;case c.Method:return r.Method;case c.Function:return r.Function;case c.Constructor:return r.Constructor;case c.Field:return r.Field;case c.Variable:return r.Variable;case c.Class:return r.Class;case c.Interface:return r.Interface;case c.Module:return r.Module;case c.Property:return r.Property;case c.Unit:return r.Unit;case c.Value:return r.Value;case c.Enum:return r.Enum;case c.Keyword:return r.Keyword;case c.Snippet:return r.Snippet;case c.Color:return r.Color;case c.File:return r.File;case c.Reference:return r.Reference}return r.Property}function v(e){if(!!e)return{range:l(e.range),text:e.newText}}var R=function(){function e(r){this._worker=r}return Object.defineProperty(e.prototype,"triggerCharacters",{get:function(){return[".",":","<",'"',"=","/"]},enumerable:!1,configurable:!0}),e.prototype.provideCompletionItems=function(r,n,u,i){var t=r.uri;return this._worker(t).then(function(o){return o.doComplete(t.toString(),f(n))}).then(function(o){if(!!o){var a=r.getWordUntilPosition(n),K=new _(n.lineNumber,a.startColumn,n.lineNumber,a.endColumn),H=o.items.map(function(g){var p={label:g.label,insertText:g.insertText||g.label,sortText:g.sortText,filterText:g.filterText,documentation:g.documentation,detail:g.detail,range:K,kind:O(g.kind)};return g.textEdit&&(V(g.textEdit)?p.range={insert:l(g.textEdit.insert),replace:l(g.textEdit.replace)}:p.range=l(g.textEdit.range),p.insertText=g.textEdit.newText),g.additionalTextEdits&&(p.additionalTextEdits=g.additionalTextEdits.map(v)),g.insertTextFormat===M.Snippet&&(p.insertTextRules=s.CompletionItemInsertTextRule.InsertAsSnippet),p});return{isIncomplete:o.isIncomplete,suggestions:H}}})},e}();function j(e){return e&&typeof e=="object"&&typeof e.kind=="string"}function k(e){return typeof e=="string"?{value:e}:j(e)?e.kind==="plaintext"?{value:e.value.replace(/[\\`*_{}[\]()#+\-.!]/g,"\\$&")}:{value:e.value}:{value:"```"+e.language+`
`+e.value+"\n```\n"}}function z(e){if(!!e)return Array.isArray(e)?e.map(k):[k(e)]}var F=function(){function e(r){this._worker=r}return e.prototype.provideHover=function(r,n,u){var i=r.uri;return this._worker(i).then(function(t){return t.doHover(i.toString(),f(n))}).then(function(t){if(!!t)return{range:l(t.range),contents:z(t.contents)}})},e}();function B(e){var r=s.DocumentHighlightKind;switch(e){case h.Read:return r.Read;case h.Write:return r.Write;case h.Text:return r.Text}return r.Text}var I=function(){function e(r){this._worker=r}return e.prototype.provideDocumentHighlights=function(r,n,u){var i=r.uri;return this._worker(i).then(function(t){return t.findDocumentHighlights(i.toString(),f(n))}).then(function(t){if(!!t)return t.map(function(o){return{range:l(o.range),kind:B(o.kind)}})})},e}();function $(e){var r=s.SymbolKind;switch(e){case d.File:return r.Array;case d.Module:return r.Module;case d.Namespace:return r.Namespace;case d.Package:return r.Package;case d.Class:return r.Class;case d.Method:return r.Method;case d.Property:return r.Property;case d.Field:return r.Field;case d.Constructor:return r.Constructor;case d.Enum:return r.Enum;case d.Interface:return r.Interface;case d.Function:return r.Function;case d.Variable:return r.Variable;case d.Constant:return r.Constant;case d.String:return r.String;case d.Number:return r.Number;case d.Boolean:return r.Boolean;case d.Array:return r.Array}return r.Function}var P=function(){function e(r){this._worker=r}return e.prototype.provideDocumentSymbols=function(r,n){var u=r.uri;return this._worker(u).then(function(i){return i.findDocumentSymbols(u.toString())}).then(function(i){if(!!i)return i.map(function(t){return{name:t.name,detail:"",containerName:t.containerName,kind:$(t.kind),tags:[],range:l(t.location.range),selectionRange:l(t.location.range)}})})},e}(),C=function(){function e(r){this._worker=r}return e.prototype.provideLinks=function(r,n){var u=r.uri;return this._worker(u).then(function(i){return i.findDocumentLinks(u.toString())}).then(function(i){if(!!i)return{links:i.map(function(t){return{range:l(t.range),url:t.target}})}})},e}();function D(e){return{tabSize:e.tabSize,insertSpaces:e.insertSpaces}}var x=function(){function e(r){this._worker=r}return e.prototype.provideDocumentFormattingEdits=function(r,n,u){var i=r.uri;return this._worker(i).then(function(t){return t.format(i.toString(),null,D(n)).then(function(o){if(!(!o||o.length===0))return o.map(v)})})},e}(),b=function(){function e(r){this._worker=r}return e.prototype.provideDocumentRangeFormattingEdits=function(r,n,u,i){var t=r.uri;return this._worker(t).then(function(o){return o.format(t.toString(),U(n),D(u)).then(function(a){if(!(!a||a.length===0))return a.map(v)})})},e}(),E=function(){function e(r){this._worker=r}return e.prototype.provideRenameEdits=function(r,n,u,i){var t=r.uri;return this._worker(t).then(function(o){return o.doRename(t.toString(),f(n),u)}).then(function(o){return q(o)})},e}();function q(e){if(!(!e||!e.changes)){var r=[];for(var n in e.changes)for(var u=L.parse(n),i=0,t=e.changes[n];i<t.length;i++){var o=t[i];r.push({resource:u,edit:{range:l(o.range),text:o.newText}})}return{edits:r}}}var y=function(){function e(r){this._worker=r}return e.prototype.provideFoldingRanges=function(r,n,u){var i=r.uri;return this._worker(i).then(function(t){return t.getFoldingRanges(i.toString(),n)}).then(function(t){if(!!t)return t.map(function(o){var a={start:o.startLine+1,end:o.endLine+1};return typeof o.kind<"u"&&(a.kind=G(o.kind)),a})})},e}();function G(e){switch(e){case m.Comment:return s.FoldingRangeKind.Comment;case m.Imports:return s.FoldingRangeKind.Imports;case m.Region:return s.FoldingRangeKind.Region}}var T=function(){function e(r){this._worker=r}return e.prototype.provideSelectionRanges=function(r,n,u){var i=r.uri;return this._worker(i).then(function(t){return t.getSelectionRanges(i.toString(),n.map(f))}).then(function(t){if(!!t)return t.map(function(o){for(var a=[];o;)a.push({range:l(o.range)}),o=o.parent;return a})})},e}();function Y(e){var r=new S(e),n=function(){for(var i=[],t=0;t<arguments.length;t++)i[t]=arguments[t];return r.getLanguageServiceWorker.apply(r,i)},u=e.languageId;s.registerCompletionItemProvider(u,new R(n)),s.registerHoverProvider(u,new F(n)),s.registerDocumentHighlightProvider(u,new I(n)),s.registerLinkProvider(u,new C(n)),s.registerFoldingRangeProvider(u,new y(n)),s.registerDocumentSymbolProvider(u,new P(n)),s.registerSelectionRangeProvider(u,new T(n)),s.registerRenameProvider(u,new E(n)),u==="html"&&(s.registerDocumentFormattingEditProvider(u,new x(n)),s.registerDocumentRangeFormattingEditProvider(u,new b(n)))}function Z(e){var r=[],n=[],u=new S(e);r.push(u);var i=function(){for(var o=[],a=0;a<arguments.length;a++)o[a]=arguments[a];return u.getLanguageServiceWorker.apply(u,o)};function t(){var o=e.languageId,a=e.modeConfiguration;A(n),a.completionItems&&n.push(s.registerCompletionItemProvider(o,new R(i))),a.hovers&&n.push(s.registerHoverProvider(o,new F(i))),a.documentHighlights&&n.push(s.registerDocumentHighlightProvider(o,new I(i))),a.links&&n.push(s.registerLinkProvider(o,new C(i))),a.documentSymbols&&n.push(s.registerDocumentSymbolProvider(o,new P(i))),a.rename&&n.push(s.registerRenameProvider(o,new E(i))),a.foldingRanges&&n.push(s.registerFoldingRangeProvider(o,new y(i))),a.selectionRanges&&n.push(s.registerSelectionRangeProvider(o,new T(i))),a.documentFormattingEdits&&n.push(s.registerDocumentFormattingEditProvider(o,new x(i))),a.documentRangeFormattingEdits&&n.push(s.registerDocumentRangeFormattingEditProvider(o,new b(i)))}return t(),r.push(w(n)),w(r)}function w(e){return{dispose:function(){return A(e)}}}function A(e){for(;e.length;)e.pop().dispose()}export{Z as setupMode,Y as setupMode1};
