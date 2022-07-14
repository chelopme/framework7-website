(function framework7ComponentLoader(o,e){void 0===e&&(e=!0);var t=o.$,l=o.utils,a=o.getDevice,n=(o.getSupport,o.Class,o.Modal),s=(o.ConstructorMethods,o.ModalMethods),r=l.extend,i=l.iosPreloaderContent,d=l.mdPreloaderContent,c=l.auroraPreloaderContent;class p extends n{constructor(o,e){const l=r({title:o.params.dialog.title,text:void 0,content:"",buttons:[],verticalButtons:!1,onClick:void 0,cssClass:void 0,destroyOnClose:!1,on:{}},e);void 0===l.closeByBackdropClick&&(l.closeByBackdropClick=o.params.dialog.closeByBackdropClick),void 0===l.backdrop&&(l.backdrop=o.params.dialog.backdrop),super(o,l);const n=this,s=a(),i=i,{title:d,text:c,content:p,buttons:u,verticalButtons:g,cssClass:m,backdrop:k}=l;let f,C,y;if(n.params=l,n.params.el)f=t(n.params.el);else{const o=["dialog"];0===u.length&&o.push("dialog-no-buttons"),u.length>0&&o.push(`dialog-buttons-${u.length}`),g&&o.push("dialog-buttons-vertical"),m&&o.push(m);let e="";u.length>0&&(e=$jsx("div",{class:"dialog-buttons"},u.map((o=>$jsx("span",{class:`dialog-button${o.bold?" dialog-button-bold":""}${o.color?` color-${o.color}`:""}${o.cssClass?` ${o.cssClass}`:""}`},o.text)))));const l=$jsx("div",{class:o.join(" ")},$jsx("div",{class:"dialog-inner"},d&&$jsx("div",{class:"dialog-title"},d),c&&$jsx("div",{class:"dialog-text"},c),p),e);f=t(l)}if(f&&f.length>0&&f[0].f7Modal)return f[0].f7Modal;if(0===f.length)return n.destroy();function v(o){const e=t(this).index(),l=u[e];l.onClick&&l.onClick(n,o),n.params.onClick&&n.params.onClick(n,e),!1!==l.close&&n.close()}function b(o){const e=o.keyCode;u.forEach(((t,l)=>{t.keyCodes&&t.keyCodes.indexOf(e)>=0&&(i.activeElement&&i.activeElement.blur(),t.onClick&&t.onClick(n,o),n.params.onClick&&n.params.onClick(n,l),!1!==t.close&&n.close())}))}function h(o){const e=o.target;0===t(e).closest(n.el).length&&n.params.closeByBackdropClick&&n.backdropEl&&n.backdropEl===e&&n.close()}return k&&(C=o.$el.children(".dialog-backdrop"),0===C.length&&(C=t('<div class="dialog-backdrop"></div>'),o.$el.append(C))),u&&u.length>0&&(n.on("open",(()=>{f.find(".dialog-button").each(((o,e)=>{u[e].keyCodes&&(y=!0),t(o).on("click",v)})),!y||s.ios||s.android||s.cordova||s.capacitor||t(i).on("keydown",b)})),n.on("close",(()=>{f.find(".dialog-button").each((o=>{t(o).off("click",v)})),!y||s.ios||s.android||s.cordova||s.capacitor||t(i).off("keydown",b),y=!1}))),r(n,{app:o,$el:f,el:f[0],$backdropEl:C,backdropEl:C&&C[0],type:"dialog",setProgress:(e,t)=>(o.progressbar.set(f.find(".progressbar"),e,t),n),setText(o){let e=f.find(".dialog-text");return 0===e.length&&(e=t('<div class="dialog-text"></div>'),void 0!==d?e.insertAfter(f.find(".dialog-title")):f.find(".dialog-inner").prepend(e)),e.html(o),n.params.text=o,n},setTitle(o){let e=f.find(".dialog-title");return 0===e.length&&(e=t('<div class="dialog-title"></div>'),f.find(".dialog-inner").prepend(e)),e.html(o),n.params.title=o,n}}),n.on("opened",(()=>{n.params.closeByBackdropClick&&o.on("click",h)})),n.on("close",(()=>{n.params.closeByBackdropClick&&o.off("click",h)})),f[0].f7Modal=n,n.params.destroyOnClose&&n.once("closed",(()=>{setTimeout((()=>{n.destroy()}),0)})),n}}var u={name:"dialog",params:{dialog:{title:void 0,buttonOk:"OK",buttonCancel:"Cancel",usernamePlaceholder:"Username",passwordPlaceholder:"Password",preloaderTitle:"Loading... ",progressTitle:"Loading... ",backdrop:!0,closeByBackdropClick:!1,destroyPredefinedDialogs:!0,keyboardActions:!0,autoFocus:!0}},static:{Dialog:p},create(){const o=this;function e(){return o.params.dialog.title||o.name}const t=o.params.dialog.destroyPredefinedDialogs,l=o.params.dialog.keyboardActions,a=o.params.dialog.autoFocus?{on:{opened(o){o.$el.find("input").eq(0).focus()}}}:{};o.dialog=r(s({app:o,constructor:p,defaultSelector:".dialog.modal-in"}),{alert(){for(var a=arguments.length,n=new Array(a),s=0;s<a;s++)n[s]=arguments[s];let[r,i,d]=n;return 2===n.length&&"function"==typeof n[1]&&([r,d,i]=n),new p(o,{title:void 0===i?e():i,text:r,buttons:[{text:o.params.dialog.buttonOk,bold:!0,onClick:d,keyCodes:l?[13,27]:null}],destroyOnClose:t}).open()},prompt(){for(var n=arguments.length,s=new Array(n),r=0;r<n;r++)s[r]=arguments[r];let[i,d,c,u,g]=s;return"function"==typeof s[1]&&([i,c,u,g,d]=s),g=null==g?"":g,new p(o,{title:void 0===d?e():d,text:i,content:`<div class="dialog-input-field input"><input type="text" class="dialog-input" value="${g}"></div>`,buttons:[{text:o.params.dialog.buttonCancel,keyCodes:l?[27]:null,color:"aurora"===o.theme?"gray":null},{text:o.params.dialog.buttonOk,bold:!0,keyCodes:l?[13]:null}],onClick(o,e){const t=o.$el.find(".dialog-input").val();0===e&&u&&u(t),1===e&&c&&c(t)},destroyOnClose:t,...a}).open()},confirm(){for(var a=arguments.length,n=new Array(a),s=0;s<a;s++)n[s]=arguments[s];let[r,i,d,c]=n;return"function"==typeof n[1]&&([r,d,c,i]=n),new p(o,{title:void 0===i?e():i,text:r,buttons:[{text:o.params.dialog.buttonCancel,onClick:c,keyCodes:l?[27]:null,color:"aurora"===o.theme?"gray":null},{text:o.params.dialog.buttonOk,bold:!0,onClick:d,keyCodes:l?[13]:null}],destroyOnClose:t}).open()},login(){for(var n=arguments.length,s=new Array(n),r=0;r<n;r++)s[r]=arguments[r];let[i,d,c,u]=s;return"function"==typeof s[1]&&([i,c,u,d]=s),new p(o,{title:void 0===d?e():d,text:i,content:`\n                <div class="dialog-input-field dialog-input-double input">\n                  <input type="text" name="dialog-username" placeholder="${o.params.dialog.usernamePlaceholder}" class="dialog-input">\n                </div>\n                <div class="dialog-input-field dialog-input-double input">\n                  <input type="password" name="dialog-password" placeholder="${o.params.dialog.passwordPlaceholder}" class="dialog-input">\n                </div>`,buttons:[{text:o.params.dialog.buttonCancel,keyCodes:l?[27]:null,color:"aurora"===o.theme?"gray":null},{text:o.params.dialog.buttonOk,bold:!0,keyCodes:l?[13]:null}],onClick(o,e){const t=o.$el.find('[name="dialog-username"]').val(),l=o.$el.find('[name="dialog-password"]').val();0===e&&u&&u(t,l),1===e&&c&&c(t,l)},destroyOnClose:t,...a}).open()},password(){for(var n=arguments.length,s=new Array(n),r=0;r<n;r++)s[r]=arguments[r];let[i,d,c,u]=s;return"function"==typeof s[1]&&([i,c,u,d]=s),new p(o,{title:void 0===d?e():d,text:i,content:`\n                <div class="dialog-input-field input">\n                  <input type="password" name="dialog-password" placeholder="${o.params.dialog.passwordPlaceholder}" class="dialog-input">\n                </div>`,buttons:[{text:o.params.dialog.buttonCancel,keyCodes:l?[27]:null,color:"aurora"===o.theme?"gray":null},{text:o.params.dialog.buttonOk,bold:!0,keyCodes:l?[13]:null}],onClick(o,e){const t=o.$el.find('[name="dialog-password"]').val();0===e&&u&&u(t),1===e&&c&&c(t)},destroyOnClose:t,...a}).open()},preloader(e,l){const a={iosPreloaderContent:i,mdPreloaderContent:d,auroraPreloaderContent:c}[`${o.theme}PreloaderContent`]||"";return new p(o,{title:null==e?o.params.dialog.preloaderTitle:e,content:`<div class="preloader${l?` color-${l}`:""}">${a}</div>`,cssClass:"dialog-preloader",destroyOnClose:t}).open()},progress(){for(var e=arguments.length,l=new Array(e),a=0;a<e;a++)l[a]=arguments[a];let[n,s,r]=l;2===l.length?"number"==typeof l[0]?[s,r,n]=l:"string"==typeof l[0]&&"string"==typeof l[1]&&([n,r,s]=l):1===l.length&&"number"==typeof l[0]&&([s,n,r]=l);const i=void 0===s,d=new p(o,{title:void 0===n?o.params.dialog.progressTitle:n,cssClass:"dialog-progress",content:`\n                <div class="progressbar${i?"-infinite":""}${r?` color-${r}`:""}">\n                  ${i?"":"<span></span>"}\n                </div>\n              `,destroyOnClose:t});return i||d.setProgress(s),d.open()}})}};if(e){if(o.prototype.modules&&o.prototype.modules[u.name])return;o.use(u),o.instance&&(o.instance.useModuleParams(u,o.instance.params),o.instance.useModule(u))}return u}(Framework7, typeof Framework7AutoInstallComponent === 'undefined' ? undefined : Framework7AutoInstallComponent))
