exports.id=608,exports.ids=[608],exports.modules={8942:function(e,t,r){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.getKeyIndexes=t.hasFlag=t.exists=t.list=void 0;let a=n(r(8262));t.list=Object.keys(a.default);let i={};function s(e){"string"!=typeof e&&(e=String(e));let t=e.indexOf("->");return -1===t?e.length:t}t.list.forEach(e=>{i[e]=a.default[e].flags.reduce(function(e,t){return e[t]=!0,e},{})}),t.exists=function(e){return!!a.default[e]},t.hasFlag=function(e,t){if(!i[e])throw Error("Unknown command "+e);return!!i[e][t]},t.getKeyIndexes=function(e,t,r){let n=a.default[e];if(!n)throw Error("Unknown command "+e);if(!Array.isArray(t))throw Error("Expect args to be an array");let i=[],o=!!(r&&r.parseExternalKey),l=(e,t)=>{let r=[],n=Number(e[t]);for(let e=0;e<n;e++)r.push(e+t+1);return r},d=(e,t,r)=>{for(let n=t;n<e.length-1;n+=1)if(String(e[n]).toLowerCase()===r.toLowerCase())return n+1;return null};switch(e){case"zunionstore":case"zinterstore":case"zdiffstore":i.push(0,...l(t,1));break;case"eval":case"evalsha":case"eval_ro":case"evalsha_ro":case"fcall":case"fcall_ro":case"blmpop":case"bzmpop":i.push(...l(t,1));break;case"sintercard":case"lmpop":case"zunion":case"zinter":case"zmpop":case"zintercard":case"zdiff":i.push(...l(t,0));break;case"georadius":{i.push(0);let e=d(t,5,"STORE");e&&i.push(e);let r=d(t,5,"STOREDIST");r&&i.push(r);break}case"georadiusbymember":{i.push(0);let e=d(t,4,"STORE");e&&i.push(e);let r=d(t,4,"STOREDIST");r&&i.push(r);break}case"sort":case"sort_ro":i.push(0);for(let e=1;e<t.length-1;e++){let r=t[e];if("string"!=typeof r)continue;let n=r.toUpperCase();"GET"===n?(e+=1,"#"!==(r=t[e])&&(o?i.push([e,s(r)]):i.push(e))):"BY"===n?(e+=1,o?i.push([e,s(t[e])]):i.push(e)):"STORE"===n&&(e+=1,i.push(e))}break;case"migrate":if(""===t[2])for(let e=5;e<t.length-1;e++){let r=t[e];if("string"==typeof r&&"KEYS"===r.toUpperCase()){for(let r=e+1;r<t.length;r++)i.push(r);break}}else i.push(2);break;case"xreadgroup":case"xread":for(let r="xread"===e?0:3;r<t.length-1;r++)if("STREAMS"===String(t[r]).toUpperCase()){for(let e=r+1;e<=r+(t.length-1-r)/2;e++)i.push(e);break}break;default:if(n.step>0){let e=n.keyStart-1,r=n.keyStop>0?n.keyStop:t.length+n.keyStop+1;for(let t=e;t<r;t+=n.step)i.push(t)}}return i}},9670:(e,t,r)=>{"use strict";r.d(t,{x:()=>n});class n{static normalize(e){return Number.isFinite(e)?{type:"fixed",delay:e}:e||void 0}static calculate(e,t,r,a,i){if(e)return(function(e,t){if(e.type in n.builtinStrategies)return n.builtinStrategies[e.type](e.delay);if(t)return t;throw Error(`Unknown backoff strategy ${e.type}.
      If a custom backoff strategy is used, specify it when the queue is created.`)})(e,i)(t,e.type,r,a)}}n.builtinStrategies={fixed:function(e){return function(){return e}},exponential:function(e){return function(t){return Math.round(Math.pow(2,t-1)*e)}}}},9997:(e,t,r)=>{"use strict";r.d(t,{Z:()=>i});var n=r(5315),a=r(5724);class i{constructor({mainFile:e=n.join(process.cwd(),"dist/cjs/classes/main.js"),useWorkerThreads:t,workerForkOptions:r,workerThreadsOptions:a}){this.retained={},this.free={},this.opts={mainFile:e,useWorkerThreads:t,workerForkOptions:r,workerThreadsOptions:a}}async retain(e){let t=this.getFree(e).pop();if(t)return this.retained[t.pid]=t,t;(t=new a.U(this.opts.mainFile,e,{useWorkerThreads:this.opts.useWorkerThreads,workerForkOptions:this.opts.workerForkOptions,workerThreadsOptions:this.opts.workerThreadsOptions})).on("exit",this.remove.bind(this,t));try{if(await t.init(),null!==t.exitCode||null!==t.signalCode)throw Error("Child exited before it could be retained");return this.retained[t.pid]=t,t}catch(e){throw console.error(e),this.release(t),e}}release(e){delete this.retained[e.pid],this.getFree(e.processFile).push(e)}remove(e){delete this.retained[e.pid];let t=this.getFree(e.processFile),r=t.indexOf(e);r>-1&&t.splice(r,1)}async kill(e,t="SIGKILL"){return this.remove(e),e.kill(t,3e4)}async clean(){let e=Object.values(this.retained).concat(this.getAllFree());this.retained={},this.free={},await Promise.all(e.map(e=>this.kill(e,"SIGTERM")))}getFree(e){return this.free[e]=this.free[e]||[]}getAllFree(){return Object.values(this.free).reduce((e,t)=>e.concat(t),[])}}},5724:(e,t,r)=>{"use strict";r.d(t,{U:()=>d});var n=r(1282),a=r(8216),i=r(6162),s=r(3442),o=r(7702);let l={1:"Uncaught Fatal Exception",2:"Unused",3:"Internal JavaScript Parse Error",4:"Internal JavaScript Evaluation Failure",5:"Fatal Error",6:"Non-function Internal Exception Handler",7:"Internal Exception Handler Run-Time Failure",8:"Unused",9:"Invalid Argument",10:"Internal JavaScript Run-Time Failure",12:"Invalid Debug Argument",13:"Unfinished Top-Level Await"};class d extends o.EventEmitter{constructor(e,t,r={useWorkerThreads:!1}){super(),this.mainFile=e,this.processFile=t,this.opts=r,this._exitCode=null,this._signalCode=null,this._killed=!1}get pid(){if(this.childProcess)return this.childProcess.pid;if(this.worker)return Math.abs(this.worker.threadId);throw Error("No child process or worker thread")}get exitCode(){return this._exitCode}get signalCode(){return this._signalCode}get killed(){return this.childProcess?this.childProcess.killed:this._killed}async init(){let e;let t=await u(process.execArgv);this.opts.useWorkerThreads?this.worker=e=new i.Worker(this.mainFile,Object.assign({execArgv:t,stdin:!0,stdout:!0,stderr:!0},this.opts.workerThreadsOptions?this.opts.workerThreadsOptions:{})):this.childProcess=e=(0,n.fork)(this.mainFile,[],Object.assign({execArgv:t,stdio:"pipe"},this.opts.workerForkOptions?this.opts.workerForkOptions:{})),e.on("exit",(t,r)=>{this._exitCode=t,r=void 0===r?null:r,this._signalCode=r,this._killed=!0,this.emit("exit",t,r),e.removeAllListeners(),this.removeAllListeners()}),e.on("error",(...e)=>this.emit("error",...e)),e.on("message",(...e)=>this.emit("message",...e)),e.on("close",(...e)=>this.emit("close",...e)),e.stdout.pipe(process.stdout),e.stderr.pipe(process.stderr),await this.initChild()}async send(e){return new Promise((t,r)=>{this.childProcess?this.childProcess.send(e,e=>{e?r(e):t()}):this.worker?t(this.worker.postMessage(e)):t()})}killProcess(e="SIGKILL"){this.childProcess?this.childProcess.kill(e):this.worker&&this.worker.terminate()}async kill(e="SIGKILL",t){var r;if(this.hasProcessExited())return;let n=(r=this.childProcess||this.worker,new Promise(e=>{r.once("exit",()=>e())}));if(this.killProcess(e),void 0!==t&&(0===t||isFinite(t))){let e=setTimeout(()=>{this.hasProcessExited()||this.killProcess("SIGKILL")},t);await n,clearTimeout(e)}await n}async initChild(){let e=new Promise((e,t)=>{let r=a=>{if(a.cmd===s.d$.InitCompleted)e();else if(a.cmd===s.d$.InitFailed){let e=Error();e.stack=a.err.stack,e.message=a.err.message,t(e)}this.off("message",r),this.off("close",n)},n=(e,a)=>{e>128&&(e-=128);let i=l[e]||`Unknown exit code ${e}`;t(Error(`Error initializing child: ${i} and signal ${a}`)),this.off("message",r),this.off("close",n)};this.on("message",r),this.on("close",n)});await this.send({cmd:s.uv.Init,value:this.processFile}),await e}hasProcessExited(){return!!(null!==this.exitCode||this.signalCode)}}let c=async()=>new Promise(e=>{let t=(0,a.createServer)();t.listen(0,()=>{let{port:r}=t.address();t.close(()=>e(r))})}),u=async e=>{let t=[],r=[];for(let n=0;n<e.length;n++){let a=e[n];if(-1===a.indexOf("--inspect"))t.push(a);else{let e=a.split("=")[0],t=await c();r.push(`${e}=${t}`)}}return t.concat(r)}},1973:(e,t,r)=>{"use strict";r.d(t,{Cn:()=>n,Id:()=>i,Aw:()=>s,_P:()=>a._,rh:()=>o});class n extends Error{constructor(e="bullmq:movedToDelayed"){super(e),this.name=this.constructor.name,Object.setPrototypeOf(this,new.target.prototype)}}var a=r(7266);let i="bullmq:rateLimitExceeded";class s extends Error{constructor(e=i){super(e),this.name=this.constructor.name,Object.setPrototypeOf(this,new.target.prototype)}}class o extends Error{constructor(e="bullmq:movedToWaitingChildren"){super(e),this.name=this.constructor.name,Object.setPrototypeOf(this,new.target.prototype)}}},7266:(e,t,r)=>{"use strict";r.d(t,{_:()=>n});class n extends Error{constructor(e="bullmq:unrecoverable"){super(e),this.name=this.constructor.name,Object.setPrototypeOf(this,new.target.prototype)}}},8829:(e,t,r)=>{"use strict";r.d(t,{W:()=>d});var n=r(2174),a=r(314),i=r(5963),s=r(1381),o=r(3442),l=r(7565);class d extends s.W{constructor(e,t,r){super(e,t,r),this.repeatStrategy=t.settings&&t.settings.repeatStrategy||c}async upsertJobScheduler(e,t,r,a,s,{override:l,producerId:d}){let c;let{every:u,limit:p,pattern:y,offset:h}=t;if(y&&u)throw Error("Both .pattern and .every options are defined for this repeatable job");if(!y&&!u)throw Error("Either .pattern or .every options must be defined for this repeatable job");if(t.immediately&&t.startDate)throw Error("Both .immediately and .startDate options are defined for this repeatable job");t.immediately&&t.every&&console.warn("Using option immediately with every does not affect the job's schedule. Job will run immediately anyway.");let m=t.count?t.count+1:1;if(void 0!==t.limit&&m>t.limit)return;let f=Date.now(),{endDate:b}=t;if(b&&f>new Date(b).getTime())return;let g=s.prevMillis||0;f=g<f?f:g;let{startDate:K,immediately:v}=t,S=(0,n._T)(t,["startDate","immediately"]),E=f;K&&(E=(E=new Date(K).getTime())>f?E:f);let I=h||0;if(u){let e=Math.floor(E/u)*u,t=e+u;g||h?c=t:(c=e,I=(I=E-e)<0?0:I)}else y&&(c=await this.repeatStrategy(f,t,r))<f&&(c=f);if(c)return this.trace(o.MU.PRODUCER,"add",`${this.name}.${r}`,async(n,h)=>{var f,g;let K=s.telemetry;if(h){let e=null===(f=s.telemetry)||void 0===f?void 0:f.omitContext,t=(null===(g=s.telemetry)||void 0===g?void 0:g.metadata)||!e&&h;(t||e)&&(K={metadata:t,omitContext:e})}let v=this.getNextJobOpts(c,e,Object.assign(Object.assign({},s),{repeat:S,telemetry:K}),m,I);if(l){let l=await this.scripts.addJobScheduler(e,c,JSON.stringify(void 0===a?{}:a),i.o.optsAsJSON(s),{name:r,endDate:b?new Date(b).getTime():void 0,tz:t.tz,pattern:y,every:u,limit:p},i.o.optsAsJSON(v),d),h=new this.Job(this,r,a,v,l);return h.id=l,null==n||n.setAttributes({[o.Np.JobSchedulerId]:e,[o.Np.JobId]:h.id}),h}{let t=await this.scripts.updateJobSchedulerNextMillis(e,c,JSON.stringify(void 0===a?{}:a),i.o.optsAsJSON(v),d);if(t){let i=new this.Job(this,r,a,v,t);return i.id=t,null==n||n.setAttributes({[o.Np.JobSchedulerId]:e,[o.Np.JobId]:i.id}),i}}})}getNextJobOpts(e,t,r,n,a){var i;let s=this.getSchedulerNextJobId({jobSchedulerId:t,nextMillis:e}),o=Date.now(),l=e+a-o,d=Object.assign(Object.assign({},r),{jobId:s,delay:l<0?0:l,timestamp:o,prevMillis:e,repeatJobKey:t});return d.repeat=Object.assign(Object.assign({},r.repeat),{count:n,offset:a,endDate:(null===(i=r.repeat)||void 0===i?void 0:i.endDate)?new Date(r.repeat.endDate).getTime():void 0}),d}createNextJob(e,t,r,n,a,i,s,o,l){let d=this.getSchedulerNextJobId({jobSchedulerId:a,nextMillis:r}),c=Date.now(),u=r+n-c,p=Object.assign(Object.assign({},i),{jobId:d,delay:u<0?0:u,timestamp:c,prevMillis:r,repeatJobKey:a});p.repeat=Object.assign(Object.assign({},i.repeat),{count:o});let y=new this.Job(this,t,s,p,d);if(y.addJob(e),l){let t=this.toKey(l);e.hset(t,"nrjid",y.id)}return y}async removeJobScheduler(e){return this.scripts.removeJobScheduler(e)}async getSchedulerData(e,t,r){let n=await e.hgetall(this.toKey("repeat:"+t));return this.transformSchedulerData(t,n,r)}transformSchedulerData(e,t,r){if(t){let n={key:e,name:t.name,next:r};return t.ic&&(n.iterationCount=parseInt(t.ic)),t.limit&&(n.limit=parseInt(t.limit)),t.endDate&&(n.endDate=parseInt(t.endDate)),t.tz&&(n.tz=t.tz),t.pattern&&(n.pattern=t.pattern),t.every&&(n.every=t.every),(t.data||t.opts)&&(n.template=this.getTemplateFromJSON(t.data,t.opts)),n}if(e.includes(":"))return this.keyToData(e,r)}keyToData(e,t){let r=e.split(":"),n=r.slice(4).join(":")||null;return{key:e,name:r[0],id:r[1]||null,endDate:parseInt(r[2])||null,tz:r[3]||null,pattern:n,next:t}}async getScheduler(e){let[t,r]=await this.scripts.getJobScheduler(e);return this.transformSchedulerData(e,t?(0,l.VZ)(t):null,r?parseInt(r):null)}getTemplateFromJSON(e,t){let r={};return e&&(r.data=JSON.parse(e)),t&&(r.opts=i.o.optsFromJSON(t)),r}async getJobSchedulers(e=0,t=-1,r=!1){let n=await this.client,a=this.keys.repeat,i=r?await n.zrange(a,e,t,"WITHSCORES"):await n.zrevrange(a,e,t,"WITHSCORES"),s=[];for(let e=0;e<i.length;e+=2)s.push(this.getSchedulerData(n,i[e],parseInt(i[e+1])));return Promise.all(s)}async getSchedulersCount(){let e=this.keys.repeat;return(await this.client).zcard(e)}getSchedulerNextJobId({nextMillis:e,jobSchedulerId:t}){return`repeat:${t}:${e}`}}let c=(e,t)=>{let{pattern:r}=t,n=new Date(e),i=(0,a.parseExpression)(r,Object.assign(Object.assign({},t),{currentDate:n}));try{if(t.immediately)return new Date().getTime();return i.next().getTime()}catch(e){}}},5963:(e,t,r)=>{"use strict";r.d(t,{o:()=>u});var n=r(2174),a=r(1764),i=r(7565),s=r(9670),o=r(5386),l=r(7266),d=r(3442);let c=(0,a.debuglog)("bull");class u{constructor(e,t,r,a={},o){this.queue=e,this.name=t,this.data=r,this.opts=a,this.id=o,this.progress=0,this.returnvalue=null,this.stacktrace=null,this.delay=0,this.priority=0,this.attemptsStarted=0,this.attemptsMade=0,this.stalledCounter=0;let l=this.opts,{repeatJobKey:d}=l,c=(0,n._T)(l,["repeatJobKey"]);this.opts=Object.assign({attempts:0},c),this.delay=this.opts.delay,this.priority=this.opts.priority||0,this.repeatJobKey=d,this.timestamp=a.timestamp?a.timestamp:Date.now(),this.opts.backoff=s.x.normalize(a.backoff),this.parentKey=(0,i.pV)(a.parent),this.parent=a.parent?{id:a.parent.id,queueKey:a.parent.queue}:void 0,this.debounceId=a.debounce?a.debounce.id:void 0,this.deduplicationId=a.deduplication?a.deduplication.id:this.debounceId,this.toKey=e.toKey.bind(e),this.setScripts(),this.queueQualifiedName=e.qualifiedName}static async create(e,t,r,n){let a=await e.client,i=new this(e,t,r,n,n&&n.jobId);return i.id=await i.addJob(a,{parentKey:i.parentKey,parentDependenciesKey:i.parentKey?`${i.parentKey}:dependencies`:""}),i}static async createBulk(e,t){let r=await e.client,n=t.map(t=>{var r;return new this(e,t.name,t.data,t.opts,null===(r=t.opts)||void 0===r?void 0:r.jobId)}),a=r.pipeline();for(let e of n)e.addJob(a,{parentKey:e.parentKey,parentDependenciesKey:e.parentKey?`${e.parentKey}:dependencies`:""});let i=await a.exec();for(let e=0;e<i.length;++e){let[t,r]=i[e];if(t)throw t;n[e].id=r}return n}static fromJSON(e,t,r){let n=JSON.parse(t.data||"{}"),a=u.optsFromJSON(t.opts),s=new this(e,t.name,n,a,t.id||r);return s.progress=JSON.parse(t.progress||"0"),s.delay=parseInt(t.delay),s.priority=parseInt(t.priority),s.timestamp=parseInt(t.timestamp),t.finishedOn&&(s.finishedOn=parseInt(t.finishedOn)),t.processedOn&&(s.processedOn=parseInt(t.processedOn)),t.rjk&&(s.repeatJobKey=t.rjk),t.deid&&(s.debounceId=t.deid,s.deduplicationId=t.deid),s.failedReason=t.failedReason,s.attemptsStarted=parseInt(t.ats||"0"),s.attemptsMade=parseInt(t.attemptsMade||t.atm||"0"),s.stalledCounter=parseInt(t.stc||"0"),t.defa&&(s.deferredFailure=t.defa),s.stacktrace=function(e){let t=(0,i.Y3)(JSON.parse,JSON,[e]);return t!==i.TJ&&t instanceof Array?t:[]}(t.stacktrace),"string"==typeof t.returnvalue&&(s.returnvalue=p(t.returnvalue)),t.parentKey&&(s.parentKey=t.parentKey),t.parent&&(s.parent=JSON.parse(t.parent)),t.pb&&(s.processedBy=t.pb),t.nrjid&&(s.nextRepeatableJobId=t.nrjid),s}setScripts(){this.scripts=new o.K(this.queue)}static optsFromJSON(e,t=i.Nw){let r=Object.entries(JSON.parse(e||"{}")),n={};for(let e of r){let[r,a]=e;t[r]?n[t[r]]=a:"tm"===r?n.telemetry=Object.assign(Object.assign({},n.telemetry),{metadata:a}):"omc"===r?n.telemetry=Object.assign(Object.assign({},n.telemetry),{omitContext:a}):n[r]=a}return n}static async fromId(e,t){if(t){let r=await e.client,n=await r.hgetall(e.toKey(t));return(0,i.xb)(n)?void 0:this.fromJSON(e,n,t)}}static addJobLog(e,t,r,n){return e.scripts.addLog(t,r,n)}toJSON(){let{queue:e,scripts:t}=this;return(0,n._T)(this,["queue","scripts"])}asJSON(){return(0,i.Yq)({id:this.id,name:this.name,data:JSON.stringify(void 0===this.data?{}:this.data),opts:u.optsAsJSON(this.opts),parent:this.parent?Object.assign({},this.parent):void 0,parentKey:this.parentKey,progress:this.progress,attemptsMade:this.attemptsMade,attemptsStarted:this.attemptsStarted,stalledCounter:this.stalledCounter,finishedOn:this.finishedOn,processedOn:this.processedOn,timestamp:this.timestamp,failedReason:JSON.stringify(this.failedReason),stacktrace:JSON.stringify(this.stacktrace),debounceId:this.debounceId,deduplicationId:this.deduplicationId,repeatJobKey:this.repeatJobKey,returnvalue:JSON.stringify(this.returnvalue),nrjid:this.nextRepeatableJobId})}static optsAsJSON(e={},t=i.fq){let r=Object.entries(e),n={};for(let[e,a]of r)void 0!==a&&(e in t?n[t[e]]=a:"telemetry"===e?(n.tm=a.metadata,n.omc=a.omitContext):n[e]=a);return n}asJSONSandbox(){return Object.assign(Object.assign({},this.asJSON()),{queueName:this.queueName,prefix:this.prefix})}updateData(e){return this.data=e,this.scripts.updateData(this,e)}async updateProgress(e){this.progress=e,await this.scripts.updateProgress(this.id,e),this.queue.emit("progress",this,e)}async log(e){return u.addJobLog(this.queue,this.id,e,this.opts.keepLogs)}async removeChildDependency(){return!!await this.scripts.removeChildDependency(this.id,this.parentKey)&&(this.parent=void 0,this.parentKey=void 0,!0)}async clearLogs(e){let t=await this.queue.client,r=this.toKey(this.id)+":logs";e?await t.ltrim(r,-e,-1):await t.del(r)}async remove({removeChildren:e=!0}={}){await this.queue.waitUntilReady();let t=this.queue;if(await this.scripts.remove(this.id,e))t.emit("removed",this);else throw Error(`Job ${this.id} could not be removed because it is locked by another worker`)}async removeUnprocessedChildren(){let e=this.id;await this.scripts.removeUnprocessedChildren(e)}extendLock(e,t){return this.scripts.extendLock(this.id,e,t)}async moveToCompleted(e,t,r=!0){return this.queue.trace(d.MU.INTERNAL,"complete",this.queue.name,async(n,a)=>{var s,o;null===(o=null===(s=this.opts)||void 0===s?void 0:s.telemetry)||void 0===o||o.omitContext,await this.queue.waitUntilReady(),this.returnvalue=e||void 0;let l=(0,i.Y3)(JSON.stringify,JSON,[e]);if(l===i.TJ)throw i.TJ.value;let d=this.scripts.moveToCompletedArgs(this,l,this.opts.removeOnComplete,t,r),c=await this.scripts.moveToFinished(this.id,d);return this.finishedOn=d[this.scripts.moveToFinishedKeys.length+1],this.attemptsMade+=1,c})}moveToWait(e){return this.scripts.moveJobFromActiveToWait(this.id,e)}async shouldRetryJob(e){if(!(this.attemptsMade+1<this.opts.attempts)||this.discarded||e instanceof l._||"UnrecoverableError"==e.name)return[!1,0];{let t=this.queue.opts,r=await s.x.calculate(this.opts.backoff,this.attemptsMade+1,e,this,t.settings&&t.settings.backoffStrategy);return[-1!=r,-1==r?0:r]}}async moveToFailed(e,t,r=!1){this.failedReason=null==e?void 0:e.message;let[n,a]=await this.shouldRetryJob(e);return this.queue.trace(d.MU.INTERNAL,this.getSpanOperation(n,a),this.queue.name,async(i,s)=>{var o,l;let d,c,u;(null===(l=null===(o=this.opts)||void 0===o?void 0:o.telemetry)||void 0===l?void 0:l.omitContext)||!s||(d=s),this.updateStacktrace(e);let p={failedReason:this.failedReason,stacktrace:JSON.stringify(this.stacktrace),tm:d};if(n)c=a?await this.scripts.moveToDelayed(this.id,Date.now(),a,t,{fieldsToUpdate:p}):await this.scripts.retryJob(this.id,this.opts.lifo,t,{fieldsToUpdate:p});else{let e=this.scripts.moveToFailedArgs(this,this.failedReason,this.opts.removeOnFail,t,r,p);c=await this.scripts.moveToFinished(this.id,e),u=e[this.scripts.moveToFinishedKeys.length+1]}return u&&"number"==typeof u&&(this.finishedOn=u),a&&"number"==typeof a&&(this.delay=a),this.attemptsMade+=1,c})}getSpanOperation(e,t){return e?t?"delay":"retry":"fail"}isCompleted(){return this.isInZSet("completed")}isFailed(){return this.isInZSet("failed")}isDelayed(){return this.isInZSet("delayed")}isWaitingChildren(){return this.isInZSet("waiting-children")}isActive(){return this.isInList("active")}async isWaiting(){return await this.isInList("wait")||await this.isInList("paused")}get queueName(){return this.queue.name}get prefix(){return this.queue.opts.prefix}getState(){return this.scripts.getState(this.id)}async changeDelay(e){await this.scripts.changeDelay(this.id,e),this.delay=e}async changePriority(e){await this.scripts.changePriority(this.id,e.priority,e.lifo),this.priority=e.priority||0}async getChildrenValues(){let e=await this.queue.client,t=await e.hgetall(this.toKey(`${this.id}:processed`));if(t)return(0,i.WE)(t)}async getIgnoredChildrenFailures(){return(await this.queue.client).hgetall(this.toKey(`${this.id}:failed`))}async getFailedChildrenValues(){return(await this.queue.client).hgetall(this.toKey(`${this.id}:failed`))}async getDependencies(e={}){let t=(await this.queue.client).multi();if(e.processed||e.unprocessed||e.ignored){let r,n,a,i,s,o;let l={cursor:0,count:20},d=[];if(e.processed){d.push("processed");let r=Object.assign(Object.assign({},l),e.processed);t.hscan(this.toKey(`${this.id}:processed`),r.cursor,"COUNT",r.count)}if(e.unprocessed){d.push("unprocessed");let r=Object.assign(Object.assign({},l),e.unprocessed);t.sscan(this.toKey(`${this.id}:dependencies`),r.cursor,"COUNT",r.count)}if(e.ignored){d.push("ignored");let r=Object.assign(Object.assign({},l),e.ignored);t.hscan(this.toKey(`${this.id}:failed`),r.cursor,"COUNT",r.count)}let c=await t.exec();return d.forEach((e,t)=>{switch(e){case"processed":{r=c[t][1][0];let e=c[t][1][1],a={};for(let t=0;t<e.length;++t)t%2&&(a[e[t-1]]=JSON.parse(e[t]));n=a;break}case"ignored":{s=c[t][1][0];let e=c[t][1][1],r={};for(let t=0;t<e.length;++t)t%2&&(r[e[t-1]]=e[t]);o=r;break}case"unprocessed":a=c[t][1][0],i=c[t][1][1]}}),Object.assign(Object.assign(Object.assign({},r?{processed:n,nextProcessedCursor:Number(r)}:{}),s?{ignored:o,nextIgnoredCursor:Number(s)}:{}),a?{unprocessed:i,nextUnprocessedCursor:Number(a)}:{})}{t.hgetall(this.toKey(`${this.id}:processed`)),t.smembers(this.toKey(`${this.id}:dependencies`)),t.hgetall(this.toKey(`${this.id}:failed`));let[[e,r],[n,a],[s,o]]=await t.exec();return{processed:(0,i.WE)(r),unprocessed:a,ignored:(0,i.WE)(o)}}}async getDependenciesCount(e={}){let t=[];Object.entries(e).forEach(([e,r])=>{r&&t.push(e)});let r=t.length?t:["processed","unprocessed","ignored","failed"],n=await this.scripts.getDependencyCounts(this.id,r),a={};return n.forEach((e,t)=>{a[`${r[t]}`]=e||0}),a}async waitUntilFinished(e,t){await this.queue.waitUntilReady();let r=this.id;return new Promise(async(n,a)=>{let i;function s(e){c(),n(e.returnvalue)}function o(e){c(),a(Error(e.failedReason||e))}t&&(i=setTimeout(()=>o(`Job wait ${this.name} timed out before finishing, no finish notification arrived after ${t}ms (id=${r})`),t));let l=`completed:${r}`,d=`failed:${r}`;e.on(l,s),e.on(d,o),this.queue.on("closing",o);let c=()=>{clearInterval(i),e.removeListener(l,s),e.removeListener(d,o),this.queue.removeListener("closing",o)};await e.waitUntilReady();let[u,y]=await this.scripts.isFinished(r,!0);0!=u&&(-1==u||2==u?o({failedReason:y}):s({returnvalue:p(y)}))})}async moveToDelayed(e,t){let r=Date.now(),n=e-r,a=n>0?n:0,i=await this.scripts.moveToDelayed(this.id,r,a,t,{skipAttempt:!0});return this.delay=a,i}async moveToWaitingChildren(e,t={}){return await this.scripts.moveToWaitingChildren(this.id,e,t)}async promote(){let e=this.id;await this.scripts.promote(e),this.delay=0}retry(e="failed"){return this.failedReason=null,this.finishedOn=null,this.processedOn=null,this.returnvalue=null,this.scripts.reprocessJob(this,e)}discard(){this.discarded=!0}async isInZSet(e){let t=await this.queue.client;return null!==await t.zscore(this.queue.toKey(e),this.id)}async isInList(e){return this.scripts.isJobInList(this.queue.toKey(e),this.id)}addJob(e,t){let r=this.asJSON();return this.validateOptions(r),this.scripts.addJob(e,r,r.opts,this.id,t)}validateOptions(e){var t;if(this.opts.sizeLimit&&(0,i.iF)(e.data)>this.opts.sizeLimit)throw Error(`The size of job ${this.name} exceeds the limit ${this.opts.sizeLimit} bytes`);if(this.opts.delay&&this.opts.repeat&&!(null===(t=this.opts.repeat)||void 0===t?void 0:t.count))throw Error("Delay and repeat options could not be used together");let r=["removeDependencyOnFailure","failParentOnFailure","continueParentOnFailure","ignoreDependencyOnFailure"].filter(e=>this.opts[e]);if(r.length>1){let e=r.join(", ");throw Error(`The following options cannot be used together: ${e}`)}if(`${parseInt(this.id,10)}`===this.id)throw Error("Custom Ids cannot be integers");if(this.opts.priority){if(Math.trunc(this.opts.priority)!==this.opts.priority)throw Error("Priority should not be float");if(this.opts.priority>2097152)throw Error("Priority should be between 0 and 2097152")}}updateStacktrace(e){this.stacktrace=this.stacktrace||[],(null==e?void 0:e.stack)&&(this.stacktrace.push(e.stack),0===this.opts.stackTraceLimit?this.stacktrace=[]:this.opts.stackTraceLimit&&(this.stacktrace=this.stacktrace.slice(-this.opts.stackTraceLimit)))}}function p(e){let t=(0,i.Y3)(JSON.parse,JSON,[e]);if(t!==i.TJ)return t;c("corrupted returnvalue: "+e,t)}},1381:(e,t,r)=>{"use strict";r.d(t,{W:()=>d});var n=r(7702),a=r(7565),i=r(8221),s=r(5963),o=r(3705),l=r(5386);class d extends n.EventEmitter{constructor(e,t={connection:{}},r=i.Z,n=!1){if(super(),this.name=e,this.opts=t,this.closed=!1,this.hasBlockingConnection=!1,this.hasBlockingConnection=n,this.opts=Object.assign({prefix:"bull"},t),!e)throw Error("Queue name must be provided");if(e.includes(":"))throw Error("Queue name cannot contain :");this.connection=new r(t.connection,{shared:(0,a.Y1)(t.connection),blocking:n,skipVersionCheck:t.skipVersionCheck,skipWaitingForReady:t.skipWaitingForReady}),this.connection.on("error",e=>this.emit("error",e)),this.connection.on("close",()=>{this.closing||this.emit("ioredis:close")});let s=new o.w(t.prefix);this.qualifiedName=s.getQueueQualifiedName(e),this.keys=s.getKeys(e),this.toKey=t=>s.toKey(e,t),this.setScripts()}get client(){return this.connection.client}setScripts(){this.scripts=new l.K(this)}get redisVersion(){return this.connection.redisVersion}get Job(){return s.o}emit(e,...t){try{return super.emit(e,...t)}catch(e){try{return super.emit("error",e)}catch(e){return console.error(e),!1}}}waitUntilReady(){return this.client}base64Name(){return Buffer.from(this.name).toString("base64")}clientName(e=""){let t=this.base64Name();return`${this.opts.prefix}:${t}${e}`}async close(){this.closing||(this.closing=this.connection.close()),await this.closing,this.closed=!0}disconnect(){return this.connection.disconnect()}async checkConnectionError(e,t=a.yf){try{return await e()}catch(e){if((0,a.Zm)(e)&&this.emit("error",e),this.closing||!t)return;await (0,a.gw)(t)}}trace(e,t,r,n,i){return(0,a.g4)(this.opts.telemetry,e,this.name,t,r,n,i)}}},3705:(e,t,r)=>{"use strict";r.d(t,{w:()=>n});class n{constructor(e="bull"){this.prefix=e}getKeys(e){let t={};return["","active","wait","waiting-children","paused","id","delayed","prioritized","stalled-check","completed","failed","stalled","repeat","limiter","meta","events","pc","marker","de"].forEach(r=>{t[r]=this.toKey(e,r)}),t}toKey(e,t){return`${this.getQueueQualifiedName(e)}:${t}`}getQueueQualifiedName(e){return`${this.prefix}:${e}`}}},8221:(e,t,r)=>{"use strict";r.d(t,{Z:()=>ei});var n={};r.r(n),r.d(n,{addDelayedJob:()=>u,addJobScheduler:()=>p,addLog:()=>y,addParentJob:()=>h,addPrioritizedJob:()=>m,addRepeatableJob:()=>f,addStandardJob:()=>b,changeDelay:()=>g,changePriority:()=>K,cleanJobsInSet:()=>v,drain:()=>S,extendLock:()=>E,extendLocks:()=>I,getCounts:()=>k,getCountsPerPriority:()=>w,getDependencyCounts:()=>j,getJobScheduler:()=>x,getRanges:()=>T,getRateLimitTtl:()=>A,getState:()=>D,getStateV2:()=>C,isFinished:()=>O,isJobInList:()=>R,isMaxed:()=>M,moveJobFromActiveToWait:()=>P,moveJobsToWait:()=>N,moveStalledJobsToWait:()=>J,moveToActive:()=>L,moveToDelayed:()=>F,moveToFinished:()=>_,moveToWaitingChildren:()=>V,obliterate:()=>G,paginate:()=>q,pause:()=>Y,promote:()=>B,releaseLock:()=>z,removeChildDependency:()=>W,removeJob:()=>U,removeJobScheduler:()=>Q,removeRepeatable:()=>Z,removeUnprocessedChildren:()=>$,reprocessJob:()=>H,retryJob:()=>X,saveStacktrace:()=>ee,updateData:()=>et,updateJobScheduler:()=>er,updateProgress:()=>en,updateRepeatableJobMillis:()=>ea});var a=r(2174),i=r(7702),s=r(2197),o=r.n(s),l=r(67),d=r(7565),c=r(2036);let u={name:"addDelayedJob",content:`--[[
  Adds a delayed job to the queue by doing the following:
    - Increases the job counter if needed.
    - Creates a new job key with the job data.
    - computes timestamp.
    - adds to delayed zset.
    - Emits a global event 'delayed' if the job is delayed.
    Input:
      KEYS[1] 'marker',
      KEYS[2] 'meta'
      KEYS[3] 'id'
      KEYS[4] 'delayed'
      KEYS[5] 'completed'
      KEYS[6] events stream key
      ARGV[1] msgpacked arguments array
            [1]  key prefix,
            [2]  custom id (use custom instead of one generated automatically)
            [3]  name
            [4]  timestamp
            [5]  parentKey?
          x [6]  waitChildrenKey key.
            [7]  parent dependencies key.
            [8]  parent? {id, queueKey}
            [9]  repeat job key
            [10] deduplication key
      ARGV[2] Json stringified job data
      ARGV[3] msgpacked options
      Output:
        jobId  - OK
        -5     - Missing parent key
]]
local metaKey = KEYS[2]
local idKey = KEYS[3]
local delayedKey = KEYS[4]
local completedKey = KEYS[5]
local eventsKey = KEYS[6]
local jobId
local jobIdKey
local rcall = redis.call
local args = cmsgpack.unpack(ARGV[1])
local data = ARGV[2]
local parentKey = args[5]
local parent = args[8]
local repeatJobKey = args[9]
local deduplicationKey = args[10]
local parentData
-- Includes
--[[
  Adds a delayed job to the queue by doing the following:
    - Creates a new job key with the job data.
    - adds to delayed zset.
    - Emits a global event 'delayed' if the job is delayed.
]]
-- Includes
--[[
  Add delay marker if needed.
]]
-- Includes
--[[
  Function to return the next delayed job timestamp.
]]
local function getNextDelayedTimestamp(delayedKey)
  local result = rcall("ZRANGE", delayedKey, 0, 0, "WITHSCORES")
  if #result then
    local nextTimestamp = tonumber(result[2])
    if nextTimestamp ~= nil then
      return nextTimestamp / 0x1000
    end
  end
end
local function addDelayMarkerIfNeeded(markerKey, delayedKey)
  local nextTimestamp = getNextDelayedTimestamp(delayedKey)
  if nextTimestamp ~= nil then
    -- Replace the score of the marker with the newest known
    -- next timestamp.
    rcall("ZADD", markerKey, nextTimestamp, "1")
  end
end
--[[
  Bake in the job id first 12 bits into the timestamp
  to guarantee correct execution order of delayed jobs
  (up to 4096 jobs per given timestamp or 4096 jobs apart per timestamp)
  WARNING: Jobs that are so far apart that they wrap around will cause FIFO to fail
]]
local function getDelayedScore(delayedKey, timestamp, delay)
  local delayedTimestamp = (delay > 0 and (tonumber(timestamp) + delay)) or tonumber(timestamp)
  local minScore = delayedTimestamp * 0x1000
  local maxScore = (delayedTimestamp + 1 ) * 0x1000 - 1
  local result = rcall("ZREVRANGEBYSCORE", delayedKey, maxScore,
    minScore, "WITHSCORES","LIMIT", 0, 1)
  if #result then
    local currentMaxScore = tonumber(result[2])
    if currentMaxScore ~= nil then
      if currentMaxScore >= maxScore then
        return maxScore, delayedTimestamp
      else
        return currentMaxScore + 1, delayedTimestamp
      end
    end
  end
  return minScore, delayedTimestamp
end
local function addDelayedJob(jobId, delayedKey, eventsKey, timestamp,
  maxEvents, markerKey, delay)
  local score, delayedTimestamp = getDelayedScore(delayedKey, timestamp, tonumber(delay))
  rcall("ZADD", delayedKey, score, jobId)
  rcall("XADD", eventsKey, "MAXLEN", "~", maxEvents, "*", "event", "delayed",
    "jobId", jobId, "delay", delayedTimestamp)
  -- mark that a delayed job is available
  addDelayMarkerIfNeeded(markerKey, delayedKey)
end
--[[
  Function to debounce a job.
]] 
local function deduplicateJob(deduplicationOpts, jobId, deduplicationKey, eventsKey, maxEvents)
  local deduplicationId = deduplicationOpts and deduplicationOpts['id']
  if deduplicationId then
      local ttl = deduplicationOpts['ttl']
      local deduplicationKeyExists
      if ttl then
          deduplicationKeyExists = not rcall('SET', deduplicationKey, jobId, 'PX', ttl, 'NX')
      else
          deduplicationKeyExists = not rcall('SET', deduplicationKey, jobId, 'NX')
      end
      if deduplicationKeyExists then
          local currentDebounceJobId = rcall('GET', deduplicationKey)
          rcall("XADD", eventsKey, "MAXLEN", "~", maxEvents, "*", "event", "debounced", "jobId", currentDebounceJobId,
              "debounceId", deduplicationId)
          rcall("XADD", eventsKey, "MAXLEN", "~", maxEvents, "*", "event", "deduplicated", "jobId",
              currentDebounceJobId, "deduplicationId", deduplicationId, "deduplicatedJobId", jobId)
          return currentDebounceJobId
      end
  end
end
--[[
  Function to get max events value or set by default 10000.
]]
local function getOrSetMaxEvents(metaKey)
  local maxEvents = rcall("HGET", metaKey, "opts.maxLenEvents")
  if not maxEvents then
    maxEvents = 10000
    rcall("HSET", metaKey, "opts.maxLenEvents", maxEvents)
  end
  return maxEvents
end
--[[
  Function to handle the case when job is duplicated.
]]
-- Includes
--[[
    This function is used to update the parent's dependencies if the job
    is already completed and about to be ignored. The parent must get its
    dependencies updated to avoid the parent job being stuck forever in 
    the waiting-children state.
]]
-- Includes
--[[
  Validate and move or add dependencies to parent.
]]
-- Includes
--[[
  Validate and move parent to a wait status (waiting, delayed or prioritized)
  if no pending dependencies.
]]
-- Includes
--[[
  Validate and move parent to a wait status (waiting, delayed or prioritized) if needed.
]]
-- Includes
--[[
  Move parent to a wait status (wait, prioritized or delayed)
]]
-- Includes
--[[
  Function to add job in target list and add marker if needed.
]]
-- Includes
--[[
  Add marker if needed when a job is available.
]]
local function addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
  if not isPausedOrMaxed then
    rcall("ZADD", markerKey, 0, "0")
  end  
end
local function addJobInTargetList(targetKey, markerKey, pushCmd, isPausedOrMaxed, jobId)
  rcall(pushCmd, targetKey, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
--[[
  Function to add job considering priority.
]]
-- Includes
--[[
  Function to get priority score.
]]
local function getPriorityScore(priority, priorityCounterKey)
  local prioCounter = rcall("INCR", priorityCounterKey)
  return priority * 0x100000000 + prioCounter % 0x100000000
end
local function addJobWithPriority(markerKey, prioritizedKey, priority, jobId, priorityCounterKey,
  isPausedOrMaxed)
  local score = getPriorityScore(priority, priorityCounterKey)
  rcall("ZADD", prioritizedKey, score, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
--[[
  Function to check if queue is paused or maxed
  (since an empty list and !EXISTS are not really the same).
]]
local function isQueuePausedOrMaxed(queueMetaKey, activeKey)
  local queueAttributes = rcall("HMGET", queueMetaKey, "paused", "concurrency")
  if queueAttributes[1] then
    return true
  else
    if queueAttributes[2] then
      local activeCount = rcall("LLEN", activeKey)
      return activeCount >= tonumber(queueAttributes[2])
    end
  end
  return false
end
--[[
  Function to check for the meta.paused key to decide if we are paused or not
  (since an empty list and !EXISTS are not really the same).
]]
local function getTargetQueueList(queueMetaKey, activeKey, waitKey, pausedKey)
  local queueAttributes = rcall("HMGET", queueMetaKey, "paused", "concurrency")
  if queueAttributes[1] then
    return pausedKey, true
  else
    if queueAttributes[2] then
      local activeCount = rcall("LLEN", activeKey)
      if activeCount >= tonumber(queueAttributes[2]) then
        return waitKey, true
      else
        return waitKey, false
      end
    end
  end
  return waitKey, false
end
local function moveParentToWait(parentQueueKey, parentKey, parentId, timestamp)
    local parentWaitKey = parentQueueKey .. ":wait"
    local parentPausedKey = parentQueueKey .. ":paused"
    local parentActiveKey = parentQueueKey .. ":active"
    local parentMetaKey = parentQueueKey .. ":meta"
    local parentMarkerKey = parentQueueKey .. ":marker"
    local jobAttributes = rcall("HMGET", parentKey, "priority", "delay")
    local priority = tonumber(jobAttributes[1]) or 0
    local delay = tonumber(jobAttributes[2]) or 0
    -- ignore dependencies if any left
    rcall("HSET", parentKey, "igdp", 1)
    if delay > 0 then
        local delayedTimestamp = tonumber(timestamp) + delay
        local score = delayedTimestamp * 0x1000
        local parentDelayedKey = parentQueueKey .. ":delayed"
        rcall("ZADD", parentDelayedKey, score, parentId)
        rcall("XADD", parentQueueKey .. ":events", "*", "event", "delayed", "jobId", parentId, "delay",
            delayedTimestamp)
        addDelayMarkerIfNeeded(parentMarkerKey, parentDelayedKey)
    else
        if priority == 0 then
            local parentTarget, isParentPausedOrMaxed = getTargetQueueList(parentMetaKey, parentActiveKey,
                parentWaitKey, parentPausedKey)
            addJobInTargetList(parentTarget, parentMarkerKey, "RPUSH", isParentPausedOrMaxed, parentId)
        else
            local isPausedOrMaxed = isQueuePausedOrMaxed(parentMetaKey, parentActiveKey)
            addJobWithPriority(parentMarkerKey, parentQueueKey .. ":prioritized", priority, parentId,
                parentQueueKey .. ":pc", isPausedOrMaxed)
        end
        rcall("XADD", parentQueueKey .. ":events", "*", "event", "waiting", "jobId", parentId, "prev",
            "waiting-children")
    end
end
local function moveParentToWaitIfNeeded(parentQueueKey, parentKey, parentId, timestamp)
  if rcall("EXISTS", parentKey) == 1 then
    local parentWaitingChildrenKey = parentQueueKey .. ":waiting-children"
    if rcall("ZSCORE", parentWaitingChildrenKey, parentId) then    
      rcall("ZREM", parentWaitingChildrenKey, parentId)
      moveParentToWait(parentQueueKey, parentKey, parentId, timestamp)
    end
  end
end
local function moveParentToWaitIfNoPendingDependencies(parentQueueKey, parentDependenciesKey, parentKey,
  parentId, timestamp)
  local doNotHavePendingDependencies = rcall("SCARD", parentDependenciesKey) == 0
  if doNotHavePendingDependencies then
    moveParentToWaitIfNeeded(parentQueueKey, parentKey, parentId, timestamp)
  end
end
local function updateParentDepsIfNeeded(parentKey, parentQueueKey, parentDependenciesKey,
  parentId, jobIdKey, returnvalue, timestamp )
  local processedSet = parentKey .. ":processed"
  rcall("HSET", processedSet, jobIdKey, returnvalue)
  moveParentToWaitIfNoPendingDependencies(parentQueueKey, parentDependenciesKey, parentKey, parentId, timestamp)
end
local function updateExistingJobsParent(parentKey, parent, parentData,
                                        parentDependenciesKey, completedKey,
                                        jobIdKey, jobId, timestamp)
    if parentKey ~= nil then
        if rcall("ZSCORE", completedKey, jobId) then
            local returnvalue = rcall("HGET", jobIdKey, "returnvalue")
            updateParentDepsIfNeeded(parentKey, parent['queueKey'],
                                     parentDependenciesKey, parent['id'],
                                     jobIdKey, returnvalue, timestamp)
        else
            if parentDependenciesKey ~= nil then
                rcall("SADD", parentDependenciesKey, jobIdKey)
            end
        end
        rcall("HMSET", jobIdKey, "parentKey", parentKey, "parent", parentData)
    end
end
local function handleDuplicatedJob(jobKey, jobId, currentParentKey, currentParent,
  parentData, parentDependenciesKey, completedKey, eventsKey, maxEvents, timestamp)
  local existedParentKey = rcall("HGET", jobKey, "parentKey")
  if not existedParentKey or existedParentKey == currentParentKey then
    updateExistingJobsParent(currentParentKey, currentParent, parentData,
      parentDependenciesKey, completedKey, jobKey,
      jobId, timestamp)
  else
    if currentParentKey ~= nil and currentParentKey ~= existedParentKey
      and (rcall("EXISTS", existedParentKey) == 1) then
      return -7
    end
  end
  rcall("XADD", eventsKey, "MAXLEN", "~", maxEvents, "*", "event",
    "duplicated", "jobId", jobId)
  return jobId .. "" -- convert to string
end
--[[
  Function to store a job
]]
local function storeJob(eventsKey, jobIdKey, jobId, name, data, opts, timestamp,
                        parentKey, parentData, repeatJobKey)
    local jsonOpts = cjson.encode(opts)
    local delay = opts['delay'] or 0
    local priority = opts['priority'] or 0
    local debounceId = opts['de'] and opts['de']['id']
    local optionalValues = {}
    if parentKey ~= nil then
        table.insert(optionalValues, "parentKey")
        table.insert(optionalValues, parentKey)
        table.insert(optionalValues, "parent")
        table.insert(optionalValues, parentData)
    end
    if repeatJobKey then
        table.insert(optionalValues, "rjk")
        table.insert(optionalValues, repeatJobKey)
    end
    if debounceId then
        table.insert(optionalValues, "deid")
        table.insert(optionalValues, debounceId)
    end
    rcall("HMSET", jobIdKey, "name", name, "data", data, "opts", jsonOpts,
          "timestamp", timestamp, "delay", delay, "priority", priority,
          unpack(optionalValues))
    rcall("XADD", eventsKey, "*", "event", "added", "jobId", jobId, "name", name)
    return delay, priority
end
if parentKey ~= nil then
    if rcall("EXISTS", parentKey) ~= 1 then return -5 end
    parentData = cjson.encode(parent)
end
local jobCounter = rcall("INCR", idKey)
local maxEvents = getOrSetMaxEvents(metaKey)
local opts = cmsgpack.unpack(ARGV[3])
local parentDependenciesKey = args[7]
local timestamp = args[4]
if args[2] == "" then
    jobId = jobCounter
    jobIdKey = args[1] .. jobId
else
    jobId = args[2]
    jobIdKey = args[1] .. jobId
    if rcall("EXISTS", jobIdKey) == 1 then
        return handleDuplicatedJob(jobIdKey, jobId, parentKey, parent,
            parentData, parentDependenciesKey, completedKey, eventsKey,
            maxEvents, timestamp)
    end
end
local deduplicationJobId = deduplicateJob(opts['de'], jobId, deduplicationKey,
  eventsKey, maxEvents)
if deduplicationJobId then
  return deduplicationJobId
end
local delay, priority = storeJob(eventsKey, jobIdKey, jobId, args[3], ARGV[2],
    opts, timestamp, parentKey, parentData, repeatJobKey)
addDelayedJob(jobId, delayedKey, eventsKey, timestamp, maxEvents, KEYS[1], delay)
-- Check if this job is a child of another job, if so add it to the parents dependencies
if parentDependenciesKey ~= nil then
    rcall("SADD", parentDependenciesKey, jobIdKey)
end
return jobId .. "" -- convert to string
`,keys:6},p={name:"addJobScheduler",content:`--[[
  Adds a job scheduler, i.e. a job factory that creates jobs based on a given schedule (repeat options).
    Input:
      KEYS[1]  'repeat' key
      KEYS[2]  'delayed' key
      KEYS[3]  'wait' key
      KEYS[4]  'paused' key
      KEYS[5]  'meta' key
      KEYS[6]  'prioritized' key
      KEYS[7]  'marker' key
      KEYS[8]  'id' key
      KEYS[9]  'events' key
      KEYS[10] 'pc' priority counter
      KEYS[11] 'active' key
      ARGV[1] next milliseconds
      ARGV[2] msgpacked options
            [1]  name
            [2]  tz?
            [3]  patten?
            [4]  endDate?
            [5]  every?
      ARGV[3] jobs scheduler id
      ARGV[4] Json stringified template data
      ARGV[5] mspacked template opts
      ARGV[6] msgpacked delayed opts
      ARGV[7] timestamp
      ARGV[8] prefix key
      ARGV[9] producer key
      Output:
        repeatableKey  - OK
]]
local rcall = redis.call
local repeatKey = KEYS[1]
local delayedKey = KEYS[2]
local waitKey = KEYS[3]
local pausedKey = KEYS[4]
local metaKey = KEYS[5]
local prioritizedKey = KEYS[6]
local eventsKey = KEYS[9]
local nextMillis = ARGV[1]
local jobSchedulerId = ARGV[3]
local templateOpts = cmsgpack.unpack(ARGV[5])
local prefixKey = ARGV[8]
-- Includes
--[[
  Add delay marker if needed.
]]
-- Includes
--[[
  Adds a delayed job to the queue by doing the following:
    - Creates a new job key with the job data.
    - adds to delayed zset.
    - Emits a global event 'delayed' if the job is delayed.
]]
-- Includes
--[[
  Add delay marker if needed.
]]
-- Includes
--[[
  Function to return the next delayed job timestamp.
]]
local function getNextDelayedTimestamp(delayedKey)
  local result = rcall("ZRANGE", delayedKey, 0, 0, "WITHSCORES")
  if #result then
    local nextTimestamp = tonumber(result[2])
    if nextTimestamp ~= nil then
      return nextTimestamp / 0x1000
    end
  end
end
local function addDelayMarkerIfNeeded(markerKey, delayedKey)
  local nextTimestamp = getNextDelayedTimestamp(delayedKey)
  if nextTimestamp ~= nil then
    -- Replace the score of the marker with the newest known
    -- next timestamp.
    rcall("ZADD", markerKey, nextTimestamp, "1")
  end
end
--[[
  Bake in the job id first 12 bits into the timestamp
  to guarantee correct execution order of delayed jobs
  (up to 4096 jobs per given timestamp or 4096 jobs apart per timestamp)
  WARNING: Jobs that are so far apart that they wrap around will cause FIFO to fail
]]
local function getDelayedScore(delayedKey, timestamp, delay)
  local delayedTimestamp = (delay > 0 and (tonumber(timestamp) + delay)) or tonumber(timestamp)
  local minScore = delayedTimestamp * 0x1000
  local maxScore = (delayedTimestamp + 1 ) * 0x1000 - 1
  local result = rcall("ZREVRANGEBYSCORE", delayedKey, maxScore,
    minScore, "WITHSCORES","LIMIT", 0, 1)
  if #result then
    local currentMaxScore = tonumber(result[2])
    if currentMaxScore ~= nil then
      if currentMaxScore >= maxScore then
        return maxScore, delayedTimestamp
      else
        return currentMaxScore + 1, delayedTimestamp
      end
    end
  end
  return minScore, delayedTimestamp
end
local function addDelayedJob(jobId, delayedKey, eventsKey, timestamp,
  maxEvents, markerKey, delay)
  local score, delayedTimestamp = getDelayedScore(delayedKey, timestamp, tonumber(delay))
  rcall("ZADD", delayedKey, score, jobId)
  rcall("XADD", eventsKey, "MAXLEN", "~", maxEvents, "*", "event", "delayed",
    "jobId", jobId, "delay", delayedTimestamp)
  -- mark that a delayed job is available
  addDelayMarkerIfNeeded(markerKey, delayedKey)
end
--[[
  Function to add job considering priority.
]]
-- Includes
--[[
  Add marker if needed when a job is available.
]]
local function addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
  if not isPausedOrMaxed then
    rcall("ZADD", markerKey, 0, "0")
  end  
end
--[[
  Function to get priority score.
]]
local function getPriorityScore(priority, priorityCounterKey)
  local prioCounter = rcall("INCR", priorityCounterKey)
  return priority * 0x100000000 + prioCounter % 0x100000000
end
local function addJobWithPriority(markerKey, prioritizedKey, priority, jobId, priorityCounterKey,
  isPausedOrMaxed)
  local score = getPriorityScore(priority, priorityCounterKey)
  rcall("ZADD", prioritizedKey, score, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
--[[
  Function to check for the meta.paused key to decide if we are paused or not
  (since an empty list and !EXISTS are not really the same).
]]
local function isQueuePaused(queueMetaKey)
  return rcall("HEXISTS", queueMetaKey, "paused") == 1
end
--[[
  Function to store a job
]]
local function storeJob(eventsKey, jobIdKey, jobId, name, data, opts, timestamp,
                        parentKey, parentData, repeatJobKey)
    local jsonOpts = cjson.encode(opts)
    local delay = opts['delay'] or 0
    local priority = opts['priority'] or 0
    local debounceId = opts['de'] and opts['de']['id']
    local optionalValues = {}
    if parentKey ~= nil then
        table.insert(optionalValues, "parentKey")
        table.insert(optionalValues, parentKey)
        table.insert(optionalValues, "parent")
        table.insert(optionalValues, parentData)
    end
    if repeatJobKey then
        table.insert(optionalValues, "rjk")
        table.insert(optionalValues, repeatJobKey)
    end
    if debounceId then
        table.insert(optionalValues, "deid")
        table.insert(optionalValues, debounceId)
    end
    rcall("HMSET", jobIdKey, "name", name, "data", data, "opts", jsonOpts,
          "timestamp", timestamp, "delay", delay, "priority", priority,
          unpack(optionalValues))
    rcall("XADD", eventsKey, "*", "event", "added", "jobId", jobId, "name", name)
    return delay, priority
end
--[[
  Function to check for the meta.paused key to decide if we are paused or not
  (since an empty list and !EXISTS are not really the same).
]]
local function getTargetQueueList(queueMetaKey, activeKey, waitKey, pausedKey)
  local queueAttributes = rcall("HMGET", queueMetaKey, "paused", "concurrency")
  if queueAttributes[1] then
    return pausedKey, true
  else
    if queueAttributes[2] then
      local activeCount = rcall("LLEN", activeKey)
      if activeCount >= tonumber(queueAttributes[2]) then
        return waitKey, true
      else
        return waitKey, false
      end
    end
  end
  return waitKey, false
end
--[[
  Function to add job in target list and add marker if needed.
]]
-- Includes
local function addJobInTargetList(targetKey, markerKey, pushCmd, isPausedOrMaxed, jobId)
  rcall(pushCmd, targetKey, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
local function addJobFromScheduler(jobKey, jobId, rawOpts, waitKey, pausedKey, activeKey, metaKey, 
  prioritizedKey, priorityCounter, delayedKey, markerKey, eventsKey, name, maxEvents, timestamp,
  data, jobSchedulerId)
  local opts = cmsgpack.unpack(rawOpts)
  local delay, priority = storeJob(eventsKey, jobKey, jobId, name, data,
    opts, timestamp, nil, nil, jobSchedulerId)
  if delay ~= 0 then
    addDelayedJob(jobId, delayedKey, eventsKey, timestamp, maxEvents, markerKey, delay)
  else
    local target, isPausedOrMaxed = getTargetQueueList(metaKey, activeKey, waitKey, pausedKey)
    -- Standard or priority add
    if priority == 0 then
      local pushCmd = opts['lifo'] and 'RPUSH' or 'LPUSH'
      addJobInTargetList(target, markerKey, pushCmd, isPausedOrMaxed, jobId)
    else
      -- Priority add
      addJobWithPriority(markerKey, prioritizedKey, priority, jobId, priorityCounter, isPausedOrMaxed)
    end
    -- Emit waiting event
    rcall("XADD", eventsKey, "MAXLEN", "~", maxEvents,  "*", "event", "waiting", "jobId", jobId)
  end
end
--[[
  Function to get max events value or set by default 10000.
]]
local function getOrSetMaxEvents(metaKey)
  local maxEvents = rcall("HGET", metaKey, "opts.maxLenEvents")
  if not maxEvents then
    maxEvents = 10000
    rcall("HSET", metaKey, "opts.maxLenEvents", maxEvents)
  end
  return maxEvents
end
--[[
  Function to remove job.
]]
-- Includes
--[[
  Function to remove deduplication key if needed
  when a job is being removed.
]]
local function removeDeduplicationKeyIfNeededOnRemoval(prefixKey,
  jobKey, jobId)
  local deduplicationId = rcall("HGET", jobKey, "deid")
  if deduplicationId then
    local deduplicationKey = prefixKey .. "de:" .. deduplicationId
    local currentJobId = rcall('GET', deduplicationKey)
    if currentJobId and currentJobId == jobId then
      return rcall("DEL", deduplicationKey)
    end
  end
end
--[[
  Function to remove job keys.
]]
local function removeJobKeys(jobKey)
  return rcall("DEL", jobKey, jobKey .. ':logs', jobKey .. ':dependencies',
    jobKey .. ':processed', jobKey .. ':failed', jobKey .. ':unsuccessful')
end
--[[
  Check if this job has a parent. If so we will just remove it from
  the parent child list, but if it is the last child we should move the parent to "wait/paused"
  which requires code from "moveToFinished"
]]
-- Includes
--[[
  Functions to destructure job key.
  Just a bit of warning, these functions may be a bit slow and affect performance significantly.
]]
local getJobIdFromKey = function (jobKey)
  return string.match(jobKey, ".*:(.*)")
end
local getJobKeyPrefix = function (jobKey, jobId)
  return string.sub(jobKey, 0, #jobKey - #jobId)
end
local function _moveParentToWait(parentPrefix, parentId, emitEvent)
  local parentTarget, isPausedOrMaxed = getTargetQueueList(parentPrefix .. "meta", parentPrefix .. "active",
    parentPrefix .. "wait", parentPrefix .. "paused")
  addJobInTargetList(parentTarget, parentPrefix .. "marker", "RPUSH", isPausedOrMaxed, parentId)
  if emitEvent then
    local parentEventStream = parentPrefix .. "events"
    rcall("XADD", parentEventStream, "*", "event", "waiting", "jobId", parentId, "prev", "waiting-children")
  end
end
local function removeParentDependencyKey(jobKey, hard, parentKey, baseKey, debounceId)
  if parentKey then
    local parentDependenciesKey = parentKey .. ":dependencies"
    local result = rcall("SREM", parentDependenciesKey, jobKey)
    if result > 0 then
      local pendingDependencies = rcall("SCARD", parentDependenciesKey)
      if pendingDependencies == 0 then
        local parentId = getJobIdFromKey(parentKey)
        local parentPrefix = getJobKeyPrefix(parentKey, parentId)
        local numRemovedElements = rcall("ZREM", parentPrefix .. "waiting-children", parentId)
        if numRemovedElements == 1 then
          if hard then -- remove parent in same queue
            if parentPrefix == baseKey then
              removeParentDependencyKey(parentKey, hard, nil, baseKey, nil)
              removeJobKeys(parentKey)
              if debounceId then
                rcall("DEL", parentPrefix .. "de:" .. debounceId)
              end
            else
              _moveParentToWait(parentPrefix, parentId)
            end
          else
            _moveParentToWait(parentPrefix, parentId, true)
          end
        end
      end
      return true
    end
  else
    local parentAttributes = rcall("HMGET", jobKey, "parentKey", "deid")
    local missedParentKey = parentAttributes[1]
    if( (type(missedParentKey) == "string") and missedParentKey ~= ""
      and (rcall("EXISTS", missedParentKey) == 1)) then
      local parentDependenciesKey = missedParentKey .. ":dependencies"
      local result = rcall("SREM", parentDependenciesKey, jobKey)
      if result > 0 then
        local pendingDependencies = rcall("SCARD", parentDependenciesKey)
        if pendingDependencies == 0 then
          local parentId = getJobIdFromKey(missedParentKey)
          local parentPrefix = getJobKeyPrefix(missedParentKey, parentId)
          local numRemovedElements = rcall("ZREM", parentPrefix .. "waiting-children", parentId)
          if numRemovedElements == 1 then
            if hard then
              if parentPrefix == baseKey then
                removeParentDependencyKey(missedParentKey, hard, nil, baseKey, nil)
                removeJobKeys(missedParentKey)
                if parentAttributes[2] then
                  rcall("DEL", parentPrefix .. "de:" .. parentAttributes[2])
                end
              else
                _moveParentToWait(parentPrefix, parentId)
              end
            else
              _moveParentToWait(parentPrefix, parentId, true)
            end
          end
        end
        return true
      end
    end
  end
  return false
end
local function removeJob(jobId, hard, baseKey, shouldRemoveDeduplicationKey)
  local jobKey = baseKey .. jobId
  removeParentDependencyKey(jobKey, hard, nil, baseKey)
  if shouldRemoveDeduplicationKey then
    removeDeduplicationKeyIfNeededOnRemoval(baseKey, jobKey, jobId)
  end
  removeJobKeys(jobKey)
end
--[[
  Function to store a job scheduler
]]
local function storeJobScheduler(schedulerId, schedulerKey, repeatKey, nextMillis, opts,
  templateData, templateOpts)
  rcall("ZADD", repeatKey, nextMillis, schedulerId)
  local optionalValues = {}
  if opts['tz'] then
    table.insert(optionalValues, "tz")
    table.insert(optionalValues, opts['tz'])
  end
  if opts['limit'] then
    table.insert(optionalValues, "limit")
    table.insert(optionalValues, opts['limit'])
  end
  if opts['pattern'] then
    table.insert(optionalValues, "pattern")
    table.insert(optionalValues, opts['pattern'])
  end
  if opts['endDate'] then
    table.insert(optionalValues, "endDate")
    table.insert(optionalValues, opts['endDate'])
  end
  if opts['every'] then
    table.insert(optionalValues, "every")
    table.insert(optionalValues, opts['every'])
  end
  local jsonTemplateOpts = cjson.encode(templateOpts)
  if jsonTemplateOpts and jsonTemplateOpts ~= '{}' then
    table.insert(optionalValues, "opts")
    table.insert(optionalValues, jsonTemplateOpts)
  end
  if templateData and templateData ~= '{}' then
    table.insert(optionalValues, "data")
    table.insert(optionalValues, templateData)
  end
  rcall("HMSET", schedulerKey, "name", opts['name'], "ic", 1, unpack(optionalValues))
end
-- If we are overriding a repeatable job we must delete the delayed job for
-- the next iteration.
local schedulerKey = repeatKey .. ":" .. jobSchedulerId
local nextDelayedJobKey = schedulerKey .. ":" .. nextMillis
local nextDelayedJobId = "repeat:" .. jobSchedulerId .. ":" .. nextMillis
local maxEvents = getOrSetMaxEvents(metaKey)
local function removeJobFromScheduler(prefixKey, delayedKey, prioritizedKey, waitKey, pausedKey, jobId,
    metaKey, eventsKey)
    if rcall("ZSCORE", delayedKey, jobId) then
        removeJob(nextDelayedJobId, true, prefixKey, true --[[remove debounce key]] )
        rcall("ZREM", delayedKey, jobId)
        return true
    elseif rcall("ZSCORE", prioritizedKey, jobId) then
        removeJob(jobId, true, prefixKey, true --[[remove debounce key]] )
        rcall("ZREM", prioritizedKey, jobId)
        return true
    else
        local pausedOrWaitKey = waitKey
        if isQueuePaused(metaKey) then
            pausedOrWaitKey = pausedKey
        end
        if rcall("LREM", pausedOrWaitKey, 1, jobId) > 0 then
            removeJob(jobId, true, prefixKey, true --[[remove debounce key]] )
            return true
        end
    end
    return false
end
if rcall("EXISTS", nextDelayedJobKey) == 1 then
    if not removeJobFromScheduler(prefixKey, delayedKey, prioritizedKey, waitKey, pausedKey,
        nextDelayedJobId, metaKey, eventsKey) then
        rcall("XADD", eventsKey, "MAXLEN", "~", maxEvents, "*", "event",
            "duplicated", "jobId", nextDelayedJobId)
        return nextDelayedJobId .. "" -- convert to string
    end
end
local prevMillis = rcall("ZSCORE", repeatKey, jobSchedulerId)
if prevMillis then    
    local currentJobId = "repeat:" .. jobSchedulerId .. ":" .. prevMillis
    local currentDelayedJobKey = schedulerKey .. ":" .. prevMillis
    if currentJobId ~= nextDelayedJobId and rcall("EXISTS", currentDelayedJobKey) == 1 then
        removeJobFromScheduler(prefixKey, delayedKey, prioritizedKey, waitKey, pausedKey,
            currentJobId, metaKey, eventsKey)
    end
end
local schedulerOpts = cmsgpack.unpack(ARGV[2])
storeJobScheduler(jobSchedulerId, schedulerKey, repeatKey, nextMillis, schedulerOpts, ARGV[4], templateOpts)
rcall("INCR", KEYS[8])
addJobFromScheduler(nextDelayedJobKey, nextDelayedJobId, ARGV[6], waitKey, pausedKey,
    KEYS[11], metaKey, prioritizedKey, KEYS[10], delayedKey, KEYS[7], eventsKey,
    schedulerOpts['name'], maxEvents, ARGV[7], ARGV[4], jobSchedulerId)
if ARGV[9] ~= "" then
    rcall("HSET", ARGV[9], "nrjid", nextDelayedJobId)
end
return nextDelayedJobId .. "" -- convert to string
`,keys:11},y={name:"addLog",content:`--[[
  Add job log
  Input:
    KEYS[1] job id key
    KEYS[2] job logs key
    ARGV[1] id
    ARGV[2] log
    ARGV[3] keepLogs
  Output:
    -1 - Missing job.
]]
local rcall = redis.call
if rcall("EXISTS", KEYS[1]) == 1 then -- // Make sure job exists
  local logCount = rcall("RPUSH", KEYS[2], ARGV[2])
  if ARGV[3] ~= '' then
    local keepLogs = tonumber(ARGV[3])
    rcall("LTRIM", KEYS[2], -keepLogs, -1)
    return math.min(keepLogs, logCount)
  end
  return logCount
else
  return -1
end
`,keys:2},h={name:"addParentJob",content:`--[[
  Adds a parent job to the queue by doing the following:
    - Increases the job counter if needed.
    - Creates a new job key with the job data.
    - adds the job to the waiting-children zset
    Input:
      KEYS[1] 'meta'
      KEYS[2] 'id'
      KEYS[3] 'completed'
      KEYS[4] events stream key
      ARGV[1] msgpacked arguments array
            [1]  key prefix,
            [2]  custom id (will not generate one automatically)
            [3]  name
            [4]  timestamp
            [5]  parentKey?
            [6]  waitChildrenKey key.
            [7]  parent dependencies key.
            [8]  parent? {id, queueKey}
            [9]  repeat job key
            [10] deduplication key
      ARGV[2] Json stringified job data
      ARGV[3] msgpacked options
      Output:
        jobId  - OK
        -5     - Missing parent key
]]
local metaKey = KEYS[1]
local idKey = KEYS[2]
local completedKey = KEYS[3]
local eventsKey = KEYS[4]
local jobId
local jobIdKey
local rcall = redis.call
local args = cmsgpack.unpack(ARGV[1])
local data = ARGV[2]
local opts = cmsgpack.unpack(ARGV[3])
local parentKey = args[5]
local parent = args[8]
local repeatJobKey = args[9]
local deduplicationKey = args[10]
local parentData
-- Includes
--[[
  Function to debounce a job.
]] 
local function deduplicateJob(deduplicationOpts, jobId, deduplicationKey, eventsKey, maxEvents)
  local deduplicationId = deduplicationOpts and deduplicationOpts['id']
  if deduplicationId then
      local ttl = deduplicationOpts['ttl']
      local deduplicationKeyExists
      if ttl then
          deduplicationKeyExists = not rcall('SET', deduplicationKey, jobId, 'PX', ttl, 'NX')
      else
          deduplicationKeyExists = not rcall('SET', deduplicationKey, jobId, 'NX')
      end
      if deduplicationKeyExists then
          local currentDebounceJobId = rcall('GET', deduplicationKey)
          rcall("XADD", eventsKey, "MAXLEN", "~", maxEvents, "*", "event", "debounced", "jobId", currentDebounceJobId,
              "debounceId", deduplicationId)
          rcall("XADD", eventsKey, "MAXLEN", "~", maxEvents, "*", "event", "deduplicated", "jobId",
              currentDebounceJobId, "deduplicationId", deduplicationId, "deduplicatedJobId", jobId)
          return currentDebounceJobId
      end
  end
end
--[[
  Function to get max events value or set by default 10000.
]]
local function getOrSetMaxEvents(metaKey)
  local maxEvents = rcall("HGET", metaKey, "opts.maxLenEvents")
  if not maxEvents then
    maxEvents = 10000
    rcall("HSET", metaKey, "opts.maxLenEvents", maxEvents)
  end
  return maxEvents
end
--[[
  Function to handle the case when job is duplicated.
]]
-- Includes
--[[
    This function is used to update the parent's dependencies if the job
    is already completed and about to be ignored. The parent must get its
    dependencies updated to avoid the parent job being stuck forever in 
    the waiting-children state.
]]
-- Includes
--[[
  Validate and move or add dependencies to parent.
]]
-- Includes
--[[
  Validate and move parent to a wait status (waiting, delayed or prioritized)
  if no pending dependencies.
]]
-- Includes
--[[
  Validate and move parent to a wait status (waiting, delayed or prioritized) if needed.
]]
-- Includes
--[[
  Move parent to a wait status (wait, prioritized or delayed)
]]
-- Includes
--[[
  Add delay marker if needed.
]]
-- Includes
--[[
  Function to return the next delayed job timestamp.
]]
local function getNextDelayedTimestamp(delayedKey)
  local result = rcall("ZRANGE", delayedKey, 0, 0, "WITHSCORES")
  if #result then
    local nextTimestamp = tonumber(result[2])
    if nextTimestamp ~= nil then
      return nextTimestamp / 0x1000
    end
  end
end
local function addDelayMarkerIfNeeded(markerKey, delayedKey)
  local nextTimestamp = getNextDelayedTimestamp(delayedKey)
  if nextTimestamp ~= nil then
    -- Replace the score of the marker with the newest known
    -- next timestamp.
    rcall("ZADD", markerKey, nextTimestamp, "1")
  end
end
--[[
  Function to add job in target list and add marker if needed.
]]
-- Includes
--[[
  Add marker if needed when a job is available.
]]
local function addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
  if not isPausedOrMaxed then
    rcall("ZADD", markerKey, 0, "0")
  end  
end
local function addJobInTargetList(targetKey, markerKey, pushCmd, isPausedOrMaxed, jobId)
  rcall(pushCmd, targetKey, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
--[[
  Function to add job considering priority.
]]
-- Includes
--[[
  Function to get priority score.
]]
local function getPriorityScore(priority, priorityCounterKey)
  local prioCounter = rcall("INCR", priorityCounterKey)
  return priority * 0x100000000 + prioCounter % 0x100000000
end
local function addJobWithPriority(markerKey, prioritizedKey, priority, jobId, priorityCounterKey,
  isPausedOrMaxed)
  local score = getPriorityScore(priority, priorityCounterKey)
  rcall("ZADD", prioritizedKey, score, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
--[[
  Function to check if queue is paused or maxed
  (since an empty list and !EXISTS are not really the same).
]]
local function isQueuePausedOrMaxed(queueMetaKey, activeKey)
  local queueAttributes = rcall("HMGET", queueMetaKey, "paused", "concurrency")
  if queueAttributes[1] then
    return true
  else
    if queueAttributes[2] then
      local activeCount = rcall("LLEN", activeKey)
      return activeCount >= tonumber(queueAttributes[2])
    end
  end
  return false
end
--[[
  Function to check for the meta.paused key to decide if we are paused or not
  (since an empty list and !EXISTS are not really the same).
]]
local function getTargetQueueList(queueMetaKey, activeKey, waitKey, pausedKey)
  local queueAttributes = rcall("HMGET", queueMetaKey, "paused", "concurrency")
  if queueAttributes[1] then
    return pausedKey, true
  else
    if queueAttributes[2] then
      local activeCount = rcall("LLEN", activeKey)
      if activeCount >= tonumber(queueAttributes[2]) then
        return waitKey, true
      else
        return waitKey, false
      end
    end
  end
  return waitKey, false
end
local function moveParentToWait(parentQueueKey, parentKey, parentId, timestamp)
    local parentWaitKey = parentQueueKey .. ":wait"
    local parentPausedKey = parentQueueKey .. ":paused"
    local parentActiveKey = parentQueueKey .. ":active"
    local parentMetaKey = parentQueueKey .. ":meta"
    local parentMarkerKey = parentQueueKey .. ":marker"
    local jobAttributes = rcall("HMGET", parentKey, "priority", "delay")
    local priority = tonumber(jobAttributes[1]) or 0
    local delay = tonumber(jobAttributes[2]) or 0
    -- ignore dependencies if any left
    rcall("HSET", parentKey, "igdp", 1)
    if delay > 0 then
        local delayedTimestamp = tonumber(timestamp) + delay
        local score = delayedTimestamp * 0x1000
        local parentDelayedKey = parentQueueKey .. ":delayed"
        rcall("ZADD", parentDelayedKey, score, parentId)
        rcall("XADD", parentQueueKey .. ":events", "*", "event", "delayed", "jobId", parentId, "delay",
            delayedTimestamp)
        addDelayMarkerIfNeeded(parentMarkerKey, parentDelayedKey)
    else
        if priority == 0 then
            local parentTarget, isParentPausedOrMaxed = getTargetQueueList(parentMetaKey, parentActiveKey,
                parentWaitKey, parentPausedKey)
            addJobInTargetList(parentTarget, parentMarkerKey, "RPUSH", isParentPausedOrMaxed, parentId)
        else
            local isPausedOrMaxed = isQueuePausedOrMaxed(parentMetaKey, parentActiveKey)
            addJobWithPriority(parentMarkerKey, parentQueueKey .. ":prioritized", priority, parentId,
                parentQueueKey .. ":pc", isPausedOrMaxed)
        end
        rcall("XADD", parentQueueKey .. ":events", "*", "event", "waiting", "jobId", parentId, "prev",
            "waiting-children")
    end
end
local function moveParentToWaitIfNeeded(parentQueueKey, parentKey, parentId, timestamp)
  if rcall("EXISTS", parentKey) == 1 then
    local parentWaitingChildrenKey = parentQueueKey .. ":waiting-children"
    if rcall("ZSCORE", parentWaitingChildrenKey, parentId) then    
      rcall("ZREM", parentWaitingChildrenKey, parentId)
      moveParentToWait(parentQueueKey, parentKey, parentId, timestamp)
    end
  end
end
local function moveParentToWaitIfNoPendingDependencies(parentQueueKey, parentDependenciesKey, parentKey,
  parentId, timestamp)
  local doNotHavePendingDependencies = rcall("SCARD", parentDependenciesKey) == 0
  if doNotHavePendingDependencies then
    moveParentToWaitIfNeeded(parentQueueKey, parentKey, parentId, timestamp)
  end
end
local function updateParentDepsIfNeeded(parentKey, parentQueueKey, parentDependenciesKey,
  parentId, jobIdKey, returnvalue, timestamp )
  local processedSet = parentKey .. ":processed"
  rcall("HSET", processedSet, jobIdKey, returnvalue)
  moveParentToWaitIfNoPendingDependencies(parentQueueKey, parentDependenciesKey, parentKey, parentId, timestamp)
end
local function updateExistingJobsParent(parentKey, parent, parentData,
                                        parentDependenciesKey, completedKey,
                                        jobIdKey, jobId, timestamp)
    if parentKey ~= nil then
        if rcall("ZSCORE", completedKey, jobId) then
            local returnvalue = rcall("HGET", jobIdKey, "returnvalue")
            updateParentDepsIfNeeded(parentKey, parent['queueKey'],
                                     parentDependenciesKey, parent['id'],
                                     jobIdKey, returnvalue, timestamp)
        else
            if parentDependenciesKey ~= nil then
                rcall("SADD", parentDependenciesKey, jobIdKey)
            end
        end
        rcall("HMSET", jobIdKey, "parentKey", parentKey, "parent", parentData)
    end
end
local function handleDuplicatedJob(jobKey, jobId, currentParentKey, currentParent,
  parentData, parentDependenciesKey, completedKey, eventsKey, maxEvents, timestamp)
  local existedParentKey = rcall("HGET", jobKey, "parentKey")
  if not existedParentKey or existedParentKey == currentParentKey then
    updateExistingJobsParent(currentParentKey, currentParent, parentData,
      parentDependenciesKey, completedKey, jobKey,
      jobId, timestamp)
  else
    if currentParentKey ~= nil and currentParentKey ~= existedParentKey
      and (rcall("EXISTS", existedParentKey) == 1) then
      return -7
    end
  end
  rcall("XADD", eventsKey, "MAXLEN", "~", maxEvents, "*", "event",
    "duplicated", "jobId", jobId)
  return jobId .. "" -- convert to string
end
--[[
  Function to store a job
]]
local function storeJob(eventsKey, jobIdKey, jobId, name, data, opts, timestamp,
                        parentKey, parentData, repeatJobKey)
    local jsonOpts = cjson.encode(opts)
    local delay = opts['delay'] or 0
    local priority = opts['priority'] or 0
    local debounceId = opts['de'] and opts['de']['id']
    local optionalValues = {}
    if parentKey ~= nil then
        table.insert(optionalValues, "parentKey")
        table.insert(optionalValues, parentKey)
        table.insert(optionalValues, "parent")
        table.insert(optionalValues, parentData)
    end
    if repeatJobKey then
        table.insert(optionalValues, "rjk")
        table.insert(optionalValues, repeatJobKey)
    end
    if debounceId then
        table.insert(optionalValues, "deid")
        table.insert(optionalValues, debounceId)
    end
    rcall("HMSET", jobIdKey, "name", name, "data", data, "opts", jsonOpts,
          "timestamp", timestamp, "delay", delay, "priority", priority,
          unpack(optionalValues))
    rcall("XADD", eventsKey, "*", "event", "added", "jobId", jobId, "name", name)
    return delay, priority
end
if parentKey ~= nil then
    if rcall("EXISTS", parentKey) ~= 1 then return -5 end
    parentData = cjson.encode(parent)
end
local jobCounter = rcall("INCR", idKey)
local maxEvents = getOrSetMaxEvents(metaKey)
local parentDependenciesKey = args[7]
local timestamp = args[4]
if args[2] == "" then
    jobId = jobCounter
    jobIdKey = args[1] .. jobId
else
    jobId = args[2]
    jobIdKey = args[1] .. jobId
    if rcall("EXISTS", jobIdKey) == 1 then
        return handleDuplicatedJob(jobIdKey, jobId, parentKey, parent,
            parentData, parentDependenciesKey, completedKey, eventsKey,
            maxEvents, timestamp)
    end
end
local deduplicationJobId = deduplicateJob(opts['de'], jobId,
  deduplicationKey, eventsKey, maxEvents)
if deduplicationJobId then
  return deduplicationJobId
end
-- Store the job.
storeJob(eventsKey, jobIdKey, jobId, args[3], ARGV[2], opts, timestamp,
         parentKey, parentData, repeatJobKey)
local waitChildrenKey = args[6]
rcall("ZADD", waitChildrenKey, timestamp, jobId)
rcall("XADD", eventsKey, "MAXLEN", "~", maxEvents, "*", "event",
      "waiting-children", "jobId", jobId)
-- Check if this job is a child of another job, if so add it to the parents dependencies
if parentDependenciesKey ~= nil then
    rcall("SADD", parentDependenciesKey, jobIdKey)
end
return jobId .. "" -- convert to string
`,keys:4},m={name:"addPrioritizedJob",content:`--[[
  Adds a priotitized job to the queue by doing the following:
    - Increases the job counter if needed.
    - Creates a new job key with the job data.
    - Adds the job to the "added" list so that workers gets notified.
    Input:
      KEYS[1] 'marker',
      KEYS[2] 'meta'
      KEYS[3] 'id'
      KEYS[4] 'prioritized'
      KEYS[5] 'completed'
      KEYS[6] 'active'
      KEYS[7] events stream key
      KEYS[8] 'pc' priority counter
      ARGV[1] msgpacked arguments array
            [1]  key prefix,
            [2]  custom id (will not generate one automatically)
            [3]  name
            [4]  timestamp
            [5]  parentKey?
            [6]  waitChildrenKey key.
            [7]  parent dependencies key.
            [8]  parent? {id, queueKey}
            [9]  repeat job key
            [10] deduplication key
      ARGV[2] Json stringified job data
      ARGV[3] msgpacked options
      Output:
        jobId  - OK
        -5     - Missing parent key
]] 
local metaKey = KEYS[2]
local idKey = KEYS[3]
local priorityKey = KEYS[4]
local completedKey = KEYS[5]
local activeKey = KEYS[6]
local eventsKey = KEYS[7]
local priorityCounterKey = KEYS[8]
local jobId
local jobIdKey
local rcall = redis.call
local args = cmsgpack.unpack(ARGV[1])
local data = ARGV[2]
local opts = cmsgpack.unpack(ARGV[3])
local parentKey = args[5]
local parent = args[8]
local repeatJobKey = args[9]
local deduplicationKey = args[10]
local parentData
-- Includes
--[[
  Function to add job considering priority.
]]
-- Includes
--[[
  Add marker if needed when a job is available.
]]
local function addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
  if not isPausedOrMaxed then
    rcall("ZADD", markerKey, 0, "0")
  end  
end
--[[
  Function to get priority score.
]]
local function getPriorityScore(priority, priorityCounterKey)
  local prioCounter = rcall("INCR", priorityCounterKey)
  return priority * 0x100000000 + prioCounter % 0x100000000
end
local function addJobWithPriority(markerKey, prioritizedKey, priority, jobId, priorityCounterKey,
  isPausedOrMaxed)
  local score = getPriorityScore(priority, priorityCounterKey)
  rcall("ZADD", prioritizedKey, score, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
--[[
  Function to debounce a job.
]] 
local function deduplicateJob(deduplicationOpts, jobId, deduplicationKey, eventsKey, maxEvents)
  local deduplicationId = deduplicationOpts and deduplicationOpts['id']
  if deduplicationId then
      local ttl = deduplicationOpts['ttl']
      local deduplicationKeyExists
      if ttl then
          deduplicationKeyExists = not rcall('SET', deduplicationKey, jobId, 'PX', ttl, 'NX')
      else
          deduplicationKeyExists = not rcall('SET', deduplicationKey, jobId, 'NX')
      end
      if deduplicationKeyExists then
          local currentDebounceJobId = rcall('GET', deduplicationKey)
          rcall("XADD", eventsKey, "MAXLEN", "~", maxEvents, "*", "event", "debounced", "jobId", currentDebounceJobId,
              "debounceId", deduplicationId)
          rcall("XADD", eventsKey, "MAXLEN", "~", maxEvents, "*", "event", "deduplicated", "jobId",
              currentDebounceJobId, "deduplicationId", deduplicationId, "deduplicatedJobId", jobId)
          return currentDebounceJobId
      end
  end
end
--[[
  Function to store a job
]]
local function storeJob(eventsKey, jobIdKey, jobId, name, data, opts, timestamp,
                        parentKey, parentData, repeatJobKey)
    local jsonOpts = cjson.encode(opts)
    local delay = opts['delay'] or 0
    local priority = opts['priority'] or 0
    local debounceId = opts['de'] and opts['de']['id']
    local optionalValues = {}
    if parentKey ~= nil then
        table.insert(optionalValues, "parentKey")
        table.insert(optionalValues, parentKey)
        table.insert(optionalValues, "parent")
        table.insert(optionalValues, parentData)
    end
    if repeatJobKey then
        table.insert(optionalValues, "rjk")
        table.insert(optionalValues, repeatJobKey)
    end
    if debounceId then
        table.insert(optionalValues, "deid")
        table.insert(optionalValues, debounceId)
    end
    rcall("HMSET", jobIdKey, "name", name, "data", data, "opts", jsonOpts,
          "timestamp", timestamp, "delay", delay, "priority", priority,
          unpack(optionalValues))
    rcall("XADD", eventsKey, "*", "event", "added", "jobId", jobId, "name", name)
    return delay, priority
end
--[[
  Function to get max events value or set by default 10000.
]]
local function getOrSetMaxEvents(metaKey)
  local maxEvents = rcall("HGET", metaKey, "opts.maxLenEvents")
  if not maxEvents then
    maxEvents = 10000
    rcall("HSET", metaKey, "opts.maxLenEvents", maxEvents)
  end
  return maxEvents
end
--[[
  Function to handle the case when job is duplicated.
]]
-- Includes
--[[
    This function is used to update the parent's dependencies if the job
    is already completed and about to be ignored. The parent must get its
    dependencies updated to avoid the parent job being stuck forever in 
    the waiting-children state.
]]
-- Includes
--[[
  Validate and move or add dependencies to parent.
]]
-- Includes
--[[
  Validate and move parent to a wait status (waiting, delayed or prioritized)
  if no pending dependencies.
]]
-- Includes
--[[
  Validate and move parent to a wait status (waiting, delayed or prioritized) if needed.
]]
-- Includes
--[[
  Move parent to a wait status (wait, prioritized or delayed)
]]
-- Includes
--[[
  Add delay marker if needed.
]]
-- Includes
--[[
  Function to return the next delayed job timestamp.
]]
local function getNextDelayedTimestamp(delayedKey)
  local result = rcall("ZRANGE", delayedKey, 0, 0, "WITHSCORES")
  if #result then
    local nextTimestamp = tonumber(result[2])
    if nextTimestamp ~= nil then
      return nextTimestamp / 0x1000
    end
  end
end
local function addDelayMarkerIfNeeded(markerKey, delayedKey)
  local nextTimestamp = getNextDelayedTimestamp(delayedKey)
  if nextTimestamp ~= nil then
    -- Replace the score of the marker with the newest known
    -- next timestamp.
    rcall("ZADD", markerKey, nextTimestamp, "1")
  end
end
--[[
  Function to add job in target list and add marker if needed.
]]
-- Includes
local function addJobInTargetList(targetKey, markerKey, pushCmd, isPausedOrMaxed, jobId)
  rcall(pushCmd, targetKey, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
--[[
  Function to check if queue is paused or maxed
  (since an empty list and !EXISTS are not really the same).
]]
local function isQueuePausedOrMaxed(queueMetaKey, activeKey)
  local queueAttributes = rcall("HMGET", queueMetaKey, "paused", "concurrency")
  if queueAttributes[1] then
    return true
  else
    if queueAttributes[2] then
      local activeCount = rcall("LLEN", activeKey)
      return activeCount >= tonumber(queueAttributes[2])
    end
  end
  return false
end
--[[
  Function to check for the meta.paused key to decide if we are paused or not
  (since an empty list and !EXISTS are not really the same).
]]
local function getTargetQueueList(queueMetaKey, activeKey, waitKey, pausedKey)
  local queueAttributes = rcall("HMGET", queueMetaKey, "paused", "concurrency")
  if queueAttributes[1] then
    return pausedKey, true
  else
    if queueAttributes[2] then
      local activeCount = rcall("LLEN", activeKey)
      if activeCount >= tonumber(queueAttributes[2]) then
        return waitKey, true
      else
        return waitKey, false
      end
    end
  end
  return waitKey, false
end
local function moveParentToWait(parentQueueKey, parentKey, parentId, timestamp)
    local parentWaitKey = parentQueueKey .. ":wait"
    local parentPausedKey = parentQueueKey .. ":paused"
    local parentActiveKey = parentQueueKey .. ":active"
    local parentMetaKey = parentQueueKey .. ":meta"
    local parentMarkerKey = parentQueueKey .. ":marker"
    local jobAttributes = rcall("HMGET", parentKey, "priority", "delay")
    local priority = tonumber(jobAttributes[1]) or 0
    local delay = tonumber(jobAttributes[2]) or 0
    -- ignore dependencies if any left
    rcall("HSET", parentKey, "igdp", 1)
    if delay > 0 then
        local delayedTimestamp = tonumber(timestamp) + delay
        local score = delayedTimestamp * 0x1000
        local parentDelayedKey = parentQueueKey .. ":delayed"
        rcall("ZADD", parentDelayedKey, score, parentId)
        rcall("XADD", parentQueueKey .. ":events", "*", "event", "delayed", "jobId", parentId, "delay",
            delayedTimestamp)
        addDelayMarkerIfNeeded(parentMarkerKey, parentDelayedKey)
    else
        if priority == 0 then
            local parentTarget, isParentPausedOrMaxed = getTargetQueueList(parentMetaKey, parentActiveKey,
                parentWaitKey, parentPausedKey)
            addJobInTargetList(parentTarget, parentMarkerKey, "RPUSH", isParentPausedOrMaxed, parentId)
        else
            local isPausedOrMaxed = isQueuePausedOrMaxed(parentMetaKey, parentActiveKey)
            addJobWithPriority(parentMarkerKey, parentQueueKey .. ":prioritized", priority, parentId,
                parentQueueKey .. ":pc", isPausedOrMaxed)
        end
        rcall("XADD", parentQueueKey .. ":events", "*", "event", "waiting", "jobId", parentId, "prev",
            "waiting-children")
    end
end
local function moveParentToWaitIfNeeded(parentQueueKey, parentKey, parentId, timestamp)
  if rcall("EXISTS", parentKey) == 1 then
    local parentWaitingChildrenKey = parentQueueKey .. ":waiting-children"
    if rcall("ZSCORE", parentWaitingChildrenKey, parentId) then    
      rcall("ZREM", parentWaitingChildrenKey, parentId)
      moveParentToWait(parentQueueKey, parentKey, parentId, timestamp)
    end
  end
end
local function moveParentToWaitIfNoPendingDependencies(parentQueueKey, parentDependenciesKey, parentKey,
  parentId, timestamp)
  local doNotHavePendingDependencies = rcall("SCARD", parentDependenciesKey) == 0
  if doNotHavePendingDependencies then
    moveParentToWaitIfNeeded(parentQueueKey, parentKey, parentId, timestamp)
  end
end
local function updateParentDepsIfNeeded(parentKey, parentQueueKey, parentDependenciesKey,
  parentId, jobIdKey, returnvalue, timestamp )
  local processedSet = parentKey .. ":processed"
  rcall("HSET", processedSet, jobIdKey, returnvalue)
  moveParentToWaitIfNoPendingDependencies(parentQueueKey, parentDependenciesKey, parentKey, parentId, timestamp)
end
local function updateExistingJobsParent(parentKey, parent, parentData,
                                        parentDependenciesKey, completedKey,
                                        jobIdKey, jobId, timestamp)
    if parentKey ~= nil then
        if rcall("ZSCORE", completedKey, jobId) then
            local returnvalue = rcall("HGET", jobIdKey, "returnvalue")
            updateParentDepsIfNeeded(parentKey, parent['queueKey'],
                                     parentDependenciesKey, parent['id'],
                                     jobIdKey, returnvalue, timestamp)
        else
            if parentDependenciesKey ~= nil then
                rcall("SADD", parentDependenciesKey, jobIdKey)
            end
        end
        rcall("HMSET", jobIdKey, "parentKey", parentKey, "parent", parentData)
    end
end
local function handleDuplicatedJob(jobKey, jobId, currentParentKey, currentParent,
  parentData, parentDependenciesKey, completedKey, eventsKey, maxEvents, timestamp)
  local existedParentKey = rcall("HGET", jobKey, "parentKey")
  if not existedParentKey or existedParentKey == currentParentKey then
    updateExistingJobsParent(currentParentKey, currentParent, parentData,
      parentDependenciesKey, completedKey, jobKey,
      jobId, timestamp)
  else
    if currentParentKey ~= nil and currentParentKey ~= existedParentKey
      and (rcall("EXISTS", existedParentKey) == 1) then
      return -7
    end
  end
  rcall("XADD", eventsKey, "MAXLEN", "~", maxEvents, "*", "event",
    "duplicated", "jobId", jobId)
  return jobId .. "" -- convert to string
end
if parentKey ~= nil then
    if rcall("EXISTS", parentKey) ~= 1 then return -5 end
    parentData = cjson.encode(parent)
end
local jobCounter = rcall("INCR", idKey)
local maxEvents = getOrSetMaxEvents(metaKey)
local parentDependenciesKey = args[7]
local timestamp = args[4]
if args[2] == "" then
    jobId = jobCounter
    jobIdKey = args[1] .. jobId
else
    jobId = args[2]
    jobIdKey = args[1] .. jobId
    if rcall("EXISTS", jobIdKey) == 1 then
        return handleDuplicatedJob(jobIdKey, jobId, parentKey, parent,
            parentData, parentDependenciesKey, completedKey, eventsKey,
            maxEvents, timestamp)
    end
end
local deduplicationJobId = deduplicateJob(opts['de'], jobId,
  deduplicationKey, eventsKey, maxEvents)
if deduplicationJobId then
  return deduplicationJobId
end
-- Store the job.
local delay, priority = storeJob(eventsKey, jobIdKey, jobId, args[3], ARGV[2],
                                 opts, timestamp, parentKey, parentData,
                                 repeatJobKey)
-- Add the job to the prioritized set
local isPausedOrMaxed = isQueuePausedOrMaxed(metaKey, activeKey)
addJobWithPriority( KEYS[1], priorityKey, priority, jobId, priorityCounterKey, isPausedOrMaxed)
-- Emit waiting event
rcall("XADD", eventsKey, "MAXLEN", "~", maxEvents, "*", "event", "waiting",
      "jobId", jobId)
-- Check if this job is a child of another job, if so add it to the parents dependencies
if parentDependenciesKey ~= nil then
    rcall("SADD", parentDependenciesKey, jobIdKey)
end
return jobId .. "" -- convert to string
`,keys:8},f={name:"addRepeatableJob",content:`--[[
  Adds a repeatable job
    Input:
      KEYS[1] 'repeat' key
      KEYS[2] 'delayed' key
      ARGV[1] next milliseconds
      ARGV[2] msgpacked options
            [1]  name
            [2]  tz?
            [3]  patten?
            [4]  endDate?
            [5]  every?
      ARGV[3] legacy custom key TODO: remove this logic in next breaking change
      ARGV[4] custom key
      ARGV[5] prefix key
      Output:
        repeatableKey  - OK
]]
local rcall = redis.call
local repeatKey = KEYS[1]
local delayedKey = KEYS[2]
local nextMillis = ARGV[1]
local legacyCustomKey = ARGV[3]
local customKey = ARGV[4]
local prefixKey = ARGV[5]
-- Includes
--[[
  Function to remove job.
]]
-- Includes
--[[
  Function to remove deduplication key if needed
  when a job is being removed.
]]
local function removeDeduplicationKeyIfNeededOnRemoval(prefixKey,
  jobKey, jobId)
  local deduplicationId = rcall("HGET", jobKey, "deid")
  if deduplicationId then
    local deduplicationKey = prefixKey .. "de:" .. deduplicationId
    local currentJobId = rcall('GET', deduplicationKey)
    if currentJobId and currentJobId == jobId then
      return rcall("DEL", deduplicationKey)
    end
  end
end
--[[
  Function to remove job keys.
]]
local function removeJobKeys(jobKey)
  return rcall("DEL", jobKey, jobKey .. ':logs', jobKey .. ':dependencies',
    jobKey .. ':processed', jobKey .. ':failed', jobKey .. ':unsuccessful')
end
--[[
  Check if this job has a parent. If so we will just remove it from
  the parent child list, but if it is the last child we should move the parent to "wait/paused"
  which requires code from "moveToFinished"
]]
-- Includes
--[[
  Function to add job in target list and add marker if needed.
]]
-- Includes
--[[
  Add marker if needed when a job is available.
]]
local function addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
  if not isPausedOrMaxed then
    rcall("ZADD", markerKey, 0, "0")
  end  
end
local function addJobInTargetList(targetKey, markerKey, pushCmd, isPausedOrMaxed, jobId)
  rcall(pushCmd, targetKey, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
--[[
  Functions to destructure job key.
  Just a bit of warning, these functions may be a bit slow and affect performance significantly.
]]
local getJobIdFromKey = function (jobKey)
  return string.match(jobKey, ".*:(.*)")
end
local getJobKeyPrefix = function (jobKey, jobId)
  return string.sub(jobKey, 0, #jobKey - #jobId)
end
--[[
  Function to check for the meta.paused key to decide if we are paused or not
  (since an empty list and !EXISTS are not really the same).
]]
local function getTargetQueueList(queueMetaKey, activeKey, waitKey, pausedKey)
  local queueAttributes = rcall("HMGET", queueMetaKey, "paused", "concurrency")
  if queueAttributes[1] then
    return pausedKey, true
  else
    if queueAttributes[2] then
      local activeCount = rcall("LLEN", activeKey)
      if activeCount >= tonumber(queueAttributes[2]) then
        return waitKey, true
      else
        return waitKey, false
      end
    end
  end
  return waitKey, false
end
local function _moveParentToWait(parentPrefix, parentId, emitEvent)
  local parentTarget, isPausedOrMaxed = getTargetQueueList(parentPrefix .. "meta", parentPrefix .. "active",
    parentPrefix .. "wait", parentPrefix .. "paused")
  addJobInTargetList(parentTarget, parentPrefix .. "marker", "RPUSH", isPausedOrMaxed, parentId)
  if emitEvent then
    local parentEventStream = parentPrefix .. "events"
    rcall("XADD", parentEventStream, "*", "event", "waiting", "jobId", parentId, "prev", "waiting-children")
  end
end
local function removeParentDependencyKey(jobKey, hard, parentKey, baseKey, debounceId)
  if parentKey then
    local parentDependenciesKey = parentKey .. ":dependencies"
    local result = rcall("SREM", parentDependenciesKey, jobKey)
    if result > 0 then
      local pendingDependencies = rcall("SCARD", parentDependenciesKey)
      if pendingDependencies == 0 then
        local parentId = getJobIdFromKey(parentKey)
        local parentPrefix = getJobKeyPrefix(parentKey, parentId)
        local numRemovedElements = rcall("ZREM", parentPrefix .. "waiting-children", parentId)
        if numRemovedElements == 1 then
          if hard then -- remove parent in same queue
            if parentPrefix == baseKey then
              removeParentDependencyKey(parentKey, hard, nil, baseKey, nil)
              removeJobKeys(parentKey)
              if debounceId then
                rcall("DEL", parentPrefix .. "de:" .. debounceId)
              end
            else
              _moveParentToWait(parentPrefix, parentId)
            end
          else
            _moveParentToWait(parentPrefix, parentId, true)
          end
        end
      end
      return true
    end
  else
    local parentAttributes = rcall("HMGET", jobKey, "parentKey", "deid")
    local missedParentKey = parentAttributes[1]
    if( (type(missedParentKey) == "string") and missedParentKey ~= ""
      and (rcall("EXISTS", missedParentKey) == 1)) then
      local parentDependenciesKey = missedParentKey .. ":dependencies"
      local result = rcall("SREM", parentDependenciesKey, jobKey)
      if result > 0 then
        local pendingDependencies = rcall("SCARD", parentDependenciesKey)
        if pendingDependencies == 0 then
          local parentId = getJobIdFromKey(missedParentKey)
          local parentPrefix = getJobKeyPrefix(missedParentKey, parentId)
          local numRemovedElements = rcall("ZREM", parentPrefix .. "waiting-children", parentId)
          if numRemovedElements == 1 then
            if hard then
              if parentPrefix == baseKey then
                removeParentDependencyKey(missedParentKey, hard, nil, baseKey, nil)
                removeJobKeys(missedParentKey)
                if parentAttributes[2] then
                  rcall("DEL", parentPrefix .. "de:" .. parentAttributes[2])
                end
              else
                _moveParentToWait(parentPrefix, parentId)
              end
            else
              _moveParentToWait(parentPrefix, parentId, true)
            end
          end
        end
        return true
      end
    end
  end
  return false
end
local function removeJob(jobId, hard, baseKey, shouldRemoveDeduplicationKey)
  local jobKey = baseKey .. jobId
  removeParentDependencyKey(jobKey, hard, nil, baseKey)
  if shouldRemoveDeduplicationKey then
    removeDeduplicationKeyIfNeededOnRemoval(baseKey, jobKey, jobId)
  end
  removeJobKeys(jobKey)
end
local function storeRepeatableJob(repeatKey, customKey, nextMillis, rawOpts)
  rcall("ZADD", repeatKey, nextMillis, customKey)
  local opts = cmsgpack.unpack(rawOpts)
  local optionalValues = {}
  if opts['tz'] then
    table.insert(optionalValues, "tz")
    table.insert(optionalValues, opts['tz'])
  end
  if opts['pattern'] then
    table.insert(optionalValues, "pattern")
    table.insert(optionalValues, opts['pattern'])
  end
  if opts['endDate'] then
    table.insert(optionalValues, "endDate")
    table.insert(optionalValues, opts['endDate'])
  end
  if opts['every'] then
    table.insert(optionalValues, "every")
    table.insert(optionalValues, opts['every'])
  end
  rcall("HMSET", repeatKey .. ":" .. customKey, "name", opts['name'],
    unpack(optionalValues))
  return customKey
end
-- If we are overriding a repeatable job we must delete the delayed job for
-- the next iteration.
local prevMillis = rcall("ZSCORE", repeatKey, customKey)
if prevMillis then
  local delayedJobId =  "repeat:" .. customKey .. ":" .. prevMillis
  local nextDelayedJobId =  repeatKey .. ":" .. customKey .. ":" .. nextMillis
  if rcall("ZSCORE", delayedKey, delayedJobId)
   and rcall("EXISTS", nextDelayedJobId) ~= 1 then
    removeJob(delayedJobId, true, prefixKey, true --[[remove debounce key]])
    rcall("ZREM", delayedKey, delayedJobId)
  end
end
-- Keep backwards compatibility with old repeatable jobs (<= 3.0.0)
if rcall("ZSCORE", repeatKey, legacyCustomKey) ~= false then
  return storeRepeatableJob(repeatKey, legacyCustomKey, nextMillis, ARGV[2])
end
return storeRepeatableJob(repeatKey, customKey, nextMillis, ARGV[2])
`,keys:2},b={name:"addStandardJob",content:`--[[
  Adds a job to the queue by doing the following:
    - Increases the job counter if needed.
    - Creates a new job key with the job data.
    - if delayed:
      - computes timestamp.
      - adds to delayed zset.
      - Emits a global event 'delayed' if the job is delayed.
    - if not delayed
      - Adds the jobId to the wait/paused list in one of three ways:
         - LIFO
         - FIFO
         - prioritized.
      - Adds the job to the "added" list so that workers gets notified.
    Input:
      KEYS[1] 'wait',
      KEYS[2] 'paused'
      KEYS[3] 'meta'
      KEYS[4] 'id'
      KEYS[5] 'completed'
      KEYS[6] 'active'
      KEYS[7] events stream key
      KEYS[8] marker key
      ARGV[1] msgpacked arguments array
            [1]  key prefix,
            [2]  custom id (will not generate one automatically)
            [3]  name
            [4]  timestamp
            [5]  parentKey?
            [6]  waitChildrenKey key.
            [7]  parent dependencies key.
            [8]  parent? {id, queueKey}
            [9]  repeat job key
            [10] deduplication key
      ARGV[2] Json stringified job data
      ARGV[3] msgpacked options
      Output:
        jobId  - OK
        -5     - Missing parent key
]]
local eventsKey = KEYS[7]
local jobId
local jobIdKey
local rcall = redis.call
local args = cmsgpack.unpack(ARGV[1])
local data = ARGV[2]
local opts = cmsgpack.unpack(ARGV[3])
local parentKey = args[5]
local parent = args[8]
local repeatJobKey = args[9]
local deduplicationKey = args[10]
local parentData
-- Includes
--[[
  Function to add job in target list and add marker if needed.
]]
-- Includes
--[[
  Add marker if needed when a job is available.
]]
local function addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
  if not isPausedOrMaxed then
    rcall("ZADD", markerKey, 0, "0")
  end  
end
local function addJobInTargetList(targetKey, markerKey, pushCmd, isPausedOrMaxed, jobId)
  rcall(pushCmd, targetKey, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
--[[
  Function to debounce a job.
]] 
local function deduplicateJob(deduplicationOpts, jobId, deduplicationKey, eventsKey, maxEvents)
  local deduplicationId = deduplicationOpts and deduplicationOpts['id']
  if deduplicationId then
      local ttl = deduplicationOpts['ttl']
      local deduplicationKeyExists
      if ttl then
          deduplicationKeyExists = not rcall('SET', deduplicationKey, jobId, 'PX', ttl, 'NX')
      else
          deduplicationKeyExists = not rcall('SET', deduplicationKey, jobId, 'NX')
      end
      if deduplicationKeyExists then
          local currentDebounceJobId = rcall('GET', deduplicationKey)
          rcall("XADD", eventsKey, "MAXLEN", "~", maxEvents, "*", "event", "debounced", "jobId", currentDebounceJobId,
              "debounceId", deduplicationId)
          rcall("XADD", eventsKey, "MAXLEN", "~", maxEvents, "*", "event", "deduplicated", "jobId",
              currentDebounceJobId, "deduplicationId", deduplicationId, "deduplicatedJobId", jobId)
          return currentDebounceJobId
      end
  end
end
--[[
  Function to get max events value or set by default 10000.
]]
local function getOrSetMaxEvents(metaKey)
  local maxEvents = rcall("HGET", metaKey, "opts.maxLenEvents")
  if not maxEvents then
    maxEvents = 10000
    rcall("HSET", metaKey, "opts.maxLenEvents", maxEvents)
  end
  return maxEvents
end
--[[
  Function to check for the meta.paused key to decide if we are paused or not
  (since an empty list and !EXISTS are not really the same).
]]
local function getTargetQueueList(queueMetaKey, activeKey, waitKey, pausedKey)
  local queueAttributes = rcall("HMGET", queueMetaKey, "paused", "concurrency")
  if queueAttributes[1] then
    return pausedKey, true
  else
    if queueAttributes[2] then
      local activeCount = rcall("LLEN", activeKey)
      if activeCount >= tonumber(queueAttributes[2]) then
        return waitKey, true
      else
        return waitKey, false
      end
    end
  end
  return waitKey, false
end
--[[
  Function to handle the case when job is duplicated.
]]
-- Includes
--[[
    This function is used to update the parent's dependencies if the job
    is already completed and about to be ignored. The parent must get its
    dependencies updated to avoid the parent job being stuck forever in 
    the waiting-children state.
]]
-- Includes
--[[
  Validate and move or add dependencies to parent.
]]
-- Includes
--[[
  Validate and move parent to a wait status (waiting, delayed or prioritized)
  if no pending dependencies.
]]
-- Includes
--[[
  Validate and move parent to a wait status (waiting, delayed or prioritized) if needed.
]]
-- Includes
--[[
  Move parent to a wait status (wait, prioritized or delayed)
]]
-- Includes
--[[
  Add delay marker if needed.
]]
-- Includes
--[[
  Function to return the next delayed job timestamp.
]]
local function getNextDelayedTimestamp(delayedKey)
  local result = rcall("ZRANGE", delayedKey, 0, 0, "WITHSCORES")
  if #result then
    local nextTimestamp = tonumber(result[2])
    if nextTimestamp ~= nil then
      return nextTimestamp / 0x1000
    end
  end
end
local function addDelayMarkerIfNeeded(markerKey, delayedKey)
  local nextTimestamp = getNextDelayedTimestamp(delayedKey)
  if nextTimestamp ~= nil then
    -- Replace the score of the marker with the newest known
    -- next timestamp.
    rcall("ZADD", markerKey, nextTimestamp, "1")
  end
end
--[[
  Function to add job considering priority.
]]
-- Includes
--[[
  Function to get priority score.
]]
local function getPriorityScore(priority, priorityCounterKey)
  local prioCounter = rcall("INCR", priorityCounterKey)
  return priority * 0x100000000 + prioCounter % 0x100000000
end
local function addJobWithPriority(markerKey, prioritizedKey, priority, jobId, priorityCounterKey,
  isPausedOrMaxed)
  local score = getPriorityScore(priority, priorityCounterKey)
  rcall("ZADD", prioritizedKey, score, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
--[[
  Function to check if queue is paused or maxed
  (since an empty list and !EXISTS are not really the same).
]]
local function isQueuePausedOrMaxed(queueMetaKey, activeKey)
  local queueAttributes = rcall("HMGET", queueMetaKey, "paused", "concurrency")
  if queueAttributes[1] then
    return true
  else
    if queueAttributes[2] then
      local activeCount = rcall("LLEN", activeKey)
      return activeCount >= tonumber(queueAttributes[2])
    end
  end
  return false
end
local function moveParentToWait(parentQueueKey, parentKey, parentId, timestamp)
    local parentWaitKey = parentQueueKey .. ":wait"
    local parentPausedKey = parentQueueKey .. ":paused"
    local parentActiveKey = parentQueueKey .. ":active"
    local parentMetaKey = parentQueueKey .. ":meta"
    local parentMarkerKey = parentQueueKey .. ":marker"
    local jobAttributes = rcall("HMGET", parentKey, "priority", "delay")
    local priority = tonumber(jobAttributes[1]) or 0
    local delay = tonumber(jobAttributes[2]) or 0
    -- ignore dependencies if any left
    rcall("HSET", parentKey, "igdp", 1)
    if delay > 0 then
        local delayedTimestamp = tonumber(timestamp) + delay
        local score = delayedTimestamp * 0x1000
        local parentDelayedKey = parentQueueKey .. ":delayed"
        rcall("ZADD", parentDelayedKey, score, parentId)
        rcall("XADD", parentQueueKey .. ":events", "*", "event", "delayed", "jobId", parentId, "delay",
            delayedTimestamp)
        addDelayMarkerIfNeeded(parentMarkerKey, parentDelayedKey)
    else
        if priority == 0 then
            local parentTarget, isParentPausedOrMaxed = getTargetQueueList(parentMetaKey, parentActiveKey,
                parentWaitKey, parentPausedKey)
            addJobInTargetList(parentTarget, parentMarkerKey, "RPUSH", isParentPausedOrMaxed, parentId)
        else
            local isPausedOrMaxed = isQueuePausedOrMaxed(parentMetaKey, parentActiveKey)
            addJobWithPriority(parentMarkerKey, parentQueueKey .. ":prioritized", priority, parentId,
                parentQueueKey .. ":pc", isPausedOrMaxed)
        end
        rcall("XADD", parentQueueKey .. ":events", "*", "event", "waiting", "jobId", parentId, "prev",
            "waiting-children")
    end
end
local function moveParentToWaitIfNeeded(parentQueueKey, parentKey, parentId, timestamp)
  if rcall("EXISTS", parentKey) == 1 then
    local parentWaitingChildrenKey = parentQueueKey .. ":waiting-children"
    if rcall("ZSCORE", parentWaitingChildrenKey, parentId) then    
      rcall("ZREM", parentWaitingChildrenKey, parentId)
      moveParentToWait(parentQueueKey, parentKey, parentId, timestamp)
    end
  end
end
local function moveParentToWaitIfNoPendingDependencies(parentQueueKey, parentDependenciesKey, parentKey,
  parentId, timestamp)
  local doNotHavePendingDependencies = rcall("SCARD", parentDependenciesKey) == 0
  if doNotHavePendingDependencies then
    moveParentToWaitIfNeeded(parentQueueKey, parentKey, parentId, timestamp)
  end
end
local function updateParentDepsIfNeeded(parentKey, parentQueueKey, parentDependenciesKey,
  parentId, jobIdKey, returnvalue, timestamp )
  local processedSet = parentKey .. ":processed"
  rcall("HSET", processedSet, jobIdKey, returnvalue)
  moveParentToWaitIfNoPendingDependencies(parentQueueKey, parentDependenciesKey, parentKey, parentId, timestamp)
end
local function updateExistingJobsParent(parentKey, parent, parentData,
                                        parentDependenciesKey, completedKey,
                                        jobIdKey, jobId, timestamp)
    if parentKey ~= nil then
        if rcall("ZSCORE", completedKey, jobId) then
            local returnvalue = rcall("HGET", jobIdKey, "returnvalue")
            updateParentDepsIfNeeded(parentKey, parent['queueKey'],
                                     parentDependenciesKey, parent['id'],
                                     jobIdKey, returnvalue, timestamp)
        else
            if parentDependenciesKey ~= nil then
                rcall("SADD", parentDependenciesKey, jobIdKey)
            end
        end
        rcall("HMSET", jobIdKey, "parentKey", parentKey, "parent", parentData)
    end
end
local function handleDuplicatedJob(jobKey, jobId, currentParentKey, currentParent,
  parentData, parentDependenciesKey, completedKey, eventsKey, maxEvents, timestamp)
  local existedParentKey = rcall("HGET", jobKey, "parentKey")
  if not existedParentKey or existedParentKey == currentParentKey then
    updateExistingJobsParent(currentParentKey, currentParent, parentData,
      parentDependenciesKey, completedKey, jobKey,
      jobId, timestamp)
  else
    if currentParentKey ~= nil and currentParentKey ~= existedParentKey
      and (rcall("EXISTS", existedParentKey) == 1) then
      return -7
    end
  end
  rcall("XADD", eventsKey, "MAXLEN", "~", maxEvents, "*", "event",
    "duplicated", "jobId", jobId)
  return jobId .. "" -- convert to string
end
--[[
  Function to store a job
]]
local function storeJob(eventsKey, jobIdKey, jobId, name, data, opts, timestamp,
                        parentKey, parentData, repeatJobKey)
    local jsonOpts = cjson.encode(opts)
    local delay = opts['delay'] or 0
    local priority = opts['priority'] or 0
    local debounceId = opts['de'] and opts['de']['id']
    local optionalValues = {}
    if parentKey ~= nil then
        table.insert(optionalValues, "parentKey")
        table.insert(optionalValues, parentKey)
        table.insert(optionalValues, "parent")
        table.insert(optionalValues, parentData)
    end
    if repeatJobKey then
        table.insert(optionalValues, "rjk")
        table.insert(optionalValues, repeatJobKey)
    end
    if debounceId then
        table.insert(optionalValues, "deid")
        table.insert(optionalValues, debounceId)
    end
    rcall("HMSET", jobIdKey, "name", name, "data", data, "opts", jsonOpts,
          "timestamp", timestamp, "delay", delay, "priority", priority,
          unpack(optionalValues))
    rcall("XADD", eventsKey, "*", "event", "added", "jobId", jobId, "name", name)
    return delay, priority
end
if parentKey ~= nil then
    if rcall("EXISTS", parentKey) ~= 1 then return -5 end
    parentData = cjson.encode(parent)
end
local jobCounter = rcall("INCR", KEYS[4])
local metaKey = KEYS[3]
local maxEvents = getOrSetMaxEvents(metaKey)
local parentDependenciesKey = args[7]
local timestamp = args[4]
if args[2] == "" then
    jobId = jobCounter
    jobIdKey = args[1] .. jobId
else
    jobId = args[2]
    jobIdKey = args[1] .. jobId
    if rcall("EXISTS", jobIdKey) == 1 then
        return handleDuplicatedJob(jobIdKey, jobId, parentKey, parent,
            parentData, parentDependenciesKey, KEYS[5], eventsKey,
            maxEvents, timestamp)
    end
end
local deduplicationJobId = deduplicateJob(opts['de'], jobId,
  deduplicationKey, eventsKey, maxEvents)
if deduplicationJobId then
  return deduplicationJobId
end
-- Store the job.
storeJob(eventsKey, jobIdKey, jobId, args[3], ARGV[2], opts, timestamp,
         parentKey, parentData, repeatJobKey)
local target, isPausedOrMaxed = getTargetQueueList(metaKey, KEYS[6], KEYS[1], KEYS[2])
-- LIFO or FIFO
local pushCmd = opts['lifo'] and 'RPUSH' or 'LPUSH'
addJobInTargetList(target, KEYS[8], pushCmd, isPausedOrMaxed, jobId)
-- Emit waiting event
rcall("XADD", eventsKey, "MAXLEN", "~", maxEvents, "*", "event", "waiting",
      "jobId", jobId)
-- Check if this job is a child of another job, if so add it to the parents dependencies
if parentDependenciesKey ~= nil then
    rcall("SADD", parentDependenciesKey, jobIdKey)
end
return jobId .. "" -- convert to string
`,keys:8},g={name:"changeDelay",content:`--[[
  Change job delay when it is in delayed set.
  Input:
    KEYS[1] delayed key
    KEYS[2] meta key
    KEYS[3] marker key
    KEYS[4] events stream
    ARGV[1] delay
    ARGV[2] timestamp
    ARGV[3] the id of the job
    ARGV[4] job key
  Output:
    0 - OK
   -1 - Missing job.
   -3 - Job not in delayed set.
  Events:
    - delayed key.
]]
local rcall = redis.call
-- Includes
--[[
  Add delay marker if needed.
]]
-- Includes
--[[
  Function to return the next delayed job timestamp.
]]
local function getNextDelayedTimestamp(delayedKey)
  local result = rcall("ZRANGE", delayedKey, 0, 0, "WITHSCORES")
  if #result then
    local nextTimestamp = tonumber(result[2])
    if nextTimestamp ~= nil then
      return nextTimestamp / 0x1000
    end
  end
end
local function addDelayMarkerIfNeeded(markerKey, delayedKey)
  local nextTimestamp = getNextDelayedTimestamp(delayedKey)
  if nextTimestamp ~= nil then
    -- Replace the score of the marker with the newest known
    -- next timestamp.
    rcall("ZADD", markerKey, nextTimestamp, "1")
  end
end
--[[
  Bake in the job id first 12 bits into the timestamp
  to guarantee correct execution order of delayed jobs
  (up to 4096 jobs per given timestamp or 4096 jobs apart per timestamp)
  WARNING: Jobs that are so far apart that they wrap around will cause FIFO to fail
]]
local function getDelayedScore(delayedKey, timestamp, delay)
  local delayedTimestamp = (delay > 0 and (tonumber(timestamp) + delay)) or tonumber(timestamp)
  local minScore = delayedTimestamp * 0x1000
  local maxScore = (delayedTimestamp + 1 ) * 0x1000 - 1
  local result = rcall("ZREVRANGEBYSCORE", delayedKey, maxScore,
    minScore, "WITHSCORES","LIMIT", 0, 1)
  if #result then
    local currentMaxScore = tonumber(result[2])
    if currentMaxScore ~= nil then
      if currentMaxScore >= maxScore then
        return maxScore, delayedTimestamp
      else
        return currentMaxScore + 1, delayedTimestamp
      end
    end
  end
  return minScore, delayedTimestamp
end
--[[
  Function to get max events value or set by default 10000.
]]
local function getOrSetMaxEvents(metaKey)
  local maxEvents = rcall("HGET", metaKey, "opts.maxLenEvents")
  if not maxEvents then
    maxEvents = 10000
    rcall("HSET", metaKey, "opts.maxLenEvents", maxEvents)
  end
  return maxEvents
end
if rcall("EXISTS", ARGV[4]) == 1 then
  local jobId = ARGV[3]
  local delay = tonumber(ARGV[1])
  local score, delayedTimestamp = getDelayedScore(KEYS[1], ARGV[2], delay)
  local numRemovedElements = rcall("ZREM", KEYS[1], jobId)
  if numRemovedElements < 1 then
    return -3
  end
  rcall("HSET", ARGV[4], "delay", delay)
  rcall("ZADD", KEYS[1], score, jobId)
  local maxEvents = getOrSetMaxEvents(KEYS[2])
  rcall("XADD", KEYS[4], "MAXLEN", "~", maxEvents, "*", "event", "delayed",
    "jobId", jobId, "delay", delayedTimestamp)
  -- mark that a delayed job is available
  addDelayMarkerIfNeeded(KEYS[3], KEYS[1])
  return 0
else
  return -1
end`,keys:4},K={name:"changePriority",content:`--[[
  Change job priority
  Input:
    KEYS[1] 'wait',
    KEYS[2] 'paused'
    KEYS[3] 'meta'
    KEYS[4] 'prioritized'
    KEYS[5] 'active'
    KEYS[6] 'pc' priority counter
    KEYS[7] 'marker'
    ARGV[1] priority value
    ARGV[2] prefix key
    ARGV[3] job id
    ARGV[4] lifo
    Output:
       0  - OK
      -1  - Missing job
]]
local jobId = ARGV[3]
local jobKey = ARGV[2] .. jobId
local priority = tonumber(ARGV[1])
local rcall = redis.call
-- Includes
--[[
  Function to add job in target list and add marker if needed.
]]
-- Includes
--[[
  Add marker if needed when a job is available.
]]
local function addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
  if not isPausedOrMaxed then
    rcall("ZADD", markerKey, 0, "0")
  end  
end
local function addJobInTargetList(targetKey, markerKey, pushCmd, isPausedOrMaxed, jobId)
  rcall(pushCmd, targetKey, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
--[[
  Function to add job considering priority.
]]
-- Includes
--[[
  Function to get priority score.
]]
local function getPriorityScore(priority, priorityCounterKey)
  local prioCounter = rcall("INCR", priorityCounterKey)
  return priority * 0x100000000 + prioCounter % 0x100000000
end
local function addJobWithPriority(markerKey, prioritizedKey, priority, jobId, priorityCounterKey,
  isPausedOrMaxed)
  local score = getPriorityScore(priority, priorityCounterKey)
  rcall("ZADD", prioritizedKey, score, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
--[[
  Function to check for the meta.paused key to decide if we are paused or not
  (since an empty list and !EXISTS are not really the same).
]]
local function getTargetQueueList(queueMetaKey, activeKey, waitKey, pausedKey)
  local queueAttributes = rcall("HMGET", queueMetaKey, "paused", "concurrency")
  if queueAttributes[1] then
    return pausedKey, true
  else
    if queueAttributes[2] then
      local activeCount = rcall("LLEN", activeKey)
      if activeCount >= tonumber(queueAttributes[2]) then
        return waitKey, true
      else
        return waitKey, false
      end
    end
  end
  return waitKey, false
end
--[[
  Function to push back job considering priority in front of same prioritized jobs.
]]
local function pushBackJobWithPriority(prioritizedKey, priority, jobId)
  -- in order to put it at front of same prioritized jobs
  -- we consider prioritized counter as 0
  local score = priority * 0x100000000
  rcall("ZADD", prioritizedKey, score, jobId)
end
local function reAddJobWithNewPriority( prioritizedKey, markerKey, targetKey,
    priorityCounter, lifo, priority, jobId, isPausedOrMaxed)
    if priority == 0 then
        local pushCmd = lifo and 'RPUSH' or 'LPUSH'
        addJobInTargetList(targetKey, markerKey, pushCmd, isPausedOrMaxed, jobId)
    else
        if lifo then
            pushBackJobWithPriority(prioritizedKey, priority, jobId)
        else
            addJobWithPriority(markerKey, prioritizedKey, priority, jobId,
                priorityCounter, isPausedOrMaxed)
        end
    end
end
if rcall("EXISTS", jobKey) == 1 then
    local metaKey = KEYS[3]
    local target, isPausedOrMaxed = getTargetQueueList(metaKey, KEYS[5], KEYS[1], KEYS[2])
    local prioritizedKey = KEYS[4]
    local priorityCounterKey = KEYS[6]
    local markerKey = KEYS[7]
    -- Re-add with the new priority
    if rcall("ZREM", prioritizedKey, jobId) > 0 then
        reAddJobWithNewPriority( prioritizedKey, markerKey, target,
            priorityCounterKey, ARGV[4] == '1', priority, jobId, isPausedOrMaxed)
    elseif rcall("LREM", target, -1, jobId) > 0 then
        reAddJobWithNewPriority( prioritizedKey, markerKey, target,
            priorityCounterKey, ARGV[4] == '1', priority, jobId, isPausedOrMaxed)
    end
    rcall("HSET", jobKey, "priority", priority)
    return 0
else
    return -1
end
`,keys:7},v={name:"cleanJobsInSet",content:`--[[
  Remove jobs from the specific set.
  Input:
    KEYS[1]  set key,
    KEYS[2]  events stream key
    KEYS[3]  repeat key
    ARGV[1]  jobKey prefix
    ARGV[2]  timestamp
    ARGV[3]  limit the number of jobs to be removed. 0 is unlimited
    ARGV[4]  set name, can be any of 'wait', 'active', 'paused', 'delayed', 'completed', or 'failed'
]]
local rcall = redis.call
local repeatKey = KEYS[3]
local rangeStart = 0
local rangeEnd = -1
local limit = tonumber(ARGV[3])
-- If we're only deleting _n_ items, avoid retrieving all items
-- for faster performance
--
-- Start from the tail of the list, since that's where oldest elements
-- are generally added for FIFO lists
if limit > 0 then
  rangeStart = -1 - limit + 1
  rangeEnd = -1
end
-- Includes
--[[
  Function to clean job list.
  Returns jobIds and deleted count number.
]]
-- Includes
--[[
  Function to get the latest saved timestamp.
]]
local function getTimestamp(jobKey, attributes)
  if #attributes == 1 then
    return rcall("HGET", jobKey, attributes[1])
  end
  local jobTs
  for _, ts in ipairs(rcall("HMGET", jobKey, unpack(attributes))) do
    if (ts) then
      jobTs = ts
      break
    end
  end
  return jobTs
end
--[[
  Function to check if the job belongs to a job scheduler and
  current delayed job matches with jobId
]]
local function isJobSchedulerJob(jobId, jobKey, jobSchedulersKey)
  local repeatJobKey = rcall("HGET", jobKey, "rjk")
  if repeatJobKey  then
    local prevMillis = rcall("ZSCORE", jobSchedulersKey, repeatJobKey)
    if prevMillis then
      local currentDelayedJobId = "repeat:" .. repeatJobKey .. ":" .. prevMillis
      return jobId == currentDelayedJobId
    end
  end
  return false
end
--[[
  Function to remove job.
]]
-- Includes
--[[
  Function to remove deduplication key if needed
  when a job is being removed.
]]
local function removeDeduplicationKeyIfNeededOnRemoval(prefixKey,
  jobKey, jobId)
  local deduplicationId = rcall("HGET", jobKey, "deid")
  if deduplicationId then
    local deduplicationKey = prefixKey .. "de:" .. deduplicationId
    local currentJobId = rcall('GET', deduplicationKey)
    if currentJobId and currentJobId == jobId then
      return rcall("DEL", deduplicationKey)
    end
  end
end
--[[
  Function to remove job keys.
]]
local function removeJobKeys(jobKey)
  return rcall("DEL", jobKey, jobKey .. ':logs', jobKey .. ':dependencies',
    jobKey .. ':processed', jobKey .. ':failed', jobKey .. ':unsuccessful')
end
--[[
  Check if this job has a parent. If so we will just remove it from
  the parent child list, but if it is the last child we should move the parent to "wait/paused"
  which requires code from "moveToFinished"
]]
-- Includes
--[[
  Function to add job in target list and add marker if needed.
]]
-- Includes
--[[
  Add marker if needed when a job is available.
]]
local function addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
  if not isPausedOrMaxed then
    rcall("ZADD", markerKey, 0, "0")
  end  
end
local function addJobInTargetList(targetKey, markerKey, pushCmd, isPausedOrMaxed, jobId)
  rcall(pushCmd, targetKey, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
--[[
  Functions to destructure job key.
  Just a bit of warning, these functions may be a bit slow and affect performance significantly.
]]
local getJobIdFromKey = function (jobKey)
  return string.match(jobKey, ".*:(.*)")
end
local getJobKeyPrefix = function (jobKey, jobId)
  return string.sub(jobKey, 0, #jobKey - #jobId)
end
--[[
  Function to check for the meta.paused key to decide if we are paused or not
  (since an empty list and !EXISTS are not really the same).
]]
local function getTargetQueueList(queueMetaKey, activeKey, waitKey, pausedKey)
  local queueAttributes = rcall("HMGET", queueMetaKey, "paused", "concurrency")
  if queueAttributes[1] then
    return pausedKey, true
  else
    if queueAttributes[2] then
      local activeCount = rcall("LLEN", activeKey)
      if activeCount >= tonumber(queueAttributes[2]) then
        return waitKey, true
      else
        return waitKey, false
      end
    end
  end
  return waitKey, false
end
local function _moveParentToWait(parentPrefix, parentId, emitEvent)
  local parentTarget, isPausedOrMaxed = getTargetQueueList(parentPrefix .. "meta", parentPrefix .. "active",
    parentPrefix .. "wait", parentPrefix .. "paused")
  addJobInTargetList(parentTarget, parentPrefix .. "marker", "RPUSH", isPausedOrMaxed, parentId)
  if emitEvent then
    local parentEventStream = parentPrefix .. "events"
    rcall("XADD", parentEventStream, "*", "event", "waiting", "jobId", parentId, "prev", "waiting-children")
  end
end
local function removeParentDependencyKey(jobKey, hard, parentKey, baseKey, debounceId)
  if parentKey then
    local parentDependenciesKey = parentKey .. ":dependencies"
    local result = rcall("SREM", parentDependenciesKey, jobKey)
    if result > 0 then
      local pendingDependencies = rcall("SCARD", parentDependenciesKey)
      if pendingDependencies == 0 then
        local parentId = getJobIdFromKey(parentKey)
        local parentPrefix = getJobKeyPrefix(parentKey, parentId)
        local numRemovedElements = rcall("ZREM", parentPrefix .. "waiting-children", parentId)
        if numRemovedElements == 1 then
          if hard then -- remove parent in same queue
            if parentPrefix == baseKey then
              removeParentDependencyKey(parentKey, hard, nil, baseKey, nil)
              removeJobKeys(parentKey)
              if debounceId then
                rcall("DEL", parentPrefix .. "de:" .. debounceId)
              end
            else
              _moveParentToWait(parentPrefix, parentId)
            end
          else
            _moveParentToWait(parentPrefix, parentId, true)
          end
        end
      end
      return true
    end
  else
    local parentAttributes = rcall("HMGET", jobKey, "parentKey", "deid")
    local missedParentKey = parentAttributes[1]
    if( (type(missedParentKey) == "string") and missedParentKey ~= ""
      and (rcall("EXISTS", missedParentKey) == 1)) then
      local parentDependenciesKey = missedParentKey .. ":dependencies"
      local result = rcall("SREM", parentDependenciesKey, jobKey)
      if result > 0 then
        local pendingDependencies = rcall("SCARD", parentDependenciesKey)
        if pendingDependencies == 0 then
          local parentId = getJobIdFromKey(missedParentKey)
          local parentPrefix = getJobKeyPrefix(missedParentKey, parentId)
          local numRemovedElements = rcall("ZREM", parentPrefix .. "waiting-children", parentId)
          if numRemovedElements == 1 then
            if hard then
              if parentPrefix == baseKey then
                removeParentDependencyKey(missedParentKey, hard, nil, baseKey, nil)
                removeJobKeys(missedParentKey)
                if parentAttributes[2] then
                  rcall("DEL", parentPrefix .. "de:" .. parentAttributes[2])
                end
              else
                _moveParentToWait(parentPrefix, parentId)
              end
            else
              _moveParentToWait(parentPrefix, parentId, true)
            end
          end
        end
        return true
      end
    end
  end
  return false
end
local function removeJob(jobId, hard, baseKey, shouldRemoveDeduplicationKey)
  local jobKey = baseKey .. jobId
  removeParentDependencyKey(jobKey, hard, nil, baseKey)
  if shouldRemoveDeduplicationKey then
    removeDeduplicationKeyIfNeededOnRemoval(baseKey, jobKey, jobId)
  end
  removeJobKeys(jobKey)
end
local function cleanList(listKey, jobKeyPrefix, rangeStart, rangeEnd,
  timestamp, isWaiting, jobSchedulersKey)
  local jobs = rcall("LRANGE", listKey, rangeStart, rangeEnd)
  local deleted = {}
  local deletedCount = 0
  local jobTS
  local deletionMarker = ''
  local jobIdsLen = #jobs
  for i, job in ipairs(jobs) do
    if limit > 0 and deletedCount >= limit then
      break
    end
    local jobKey = jobKeyPrefix .. job
    if (isWaiting or rcall("EXISTS", jobKey .. ":lock") == 0) and
      not isJobSchedulerJob(job, jobKey, jobSchedulersKey) then
      -- Find the right timestamp of the job to compare to maxTimestamp:
      -- * finishedOn says when the job was completed, but it isn't set unless the job has actually completed
      -- * processedOn represents when the job was last attempted, but it doesn't get populated until
      --   the job is first tried
      -- * timestamp is the original job submission time
      -- Fetch all three of these (in that order) and use the first one that is set so that we'll leave jobs
      -- that have been active within the grace period:
      jobTS = getTimestamp(jobKey, {"finishedOn", "processedOn", "timestamp"})
      if (not jobTS or jobTS <= timestamp) then
        -- replace the entry with a deletion marker; the actual deletion will
        -- occur at the end of the script
        rcall("LSET", listKey, rangeEnd - jobIdsLen + i, deletionMarker)
        removeJob(job, true, jobKeyPrefix, true --[[remove debounce key]])
        deletedCount = deletedCount + 1
        table.insert(deleted, job)
      end
    end
  end
  rcall("LREM", listKey, 0, deletionMarker)
  return {deleted, deletedCount}
end
--[[
  Function to clean job set.
  Returns jobIds and deleted count number.
]] 
-- Includes
--[[
  Function to loop in batches.
  Just a bit of warning, some commands as ZREM
  could receive a maximum of 7000 parameters per call.
]]
local function batches(n, batchSize)
  local i = 0
  return function()
    local from = i * batchSize + 1
    i = i + 1
    if (from <= n) then
      local to = math.min(from + batchSize - 1, n)
      return from, to
    end
  end
end
--[[
  We use ZRANGEBYSCORE to make the case where we're deleting a limited number
  of items in a sorted set only run a single iteration. If we simply used
  ZRANGE, we may take a long time traversing through jobs that are within the
  grace period.
]]
local function getJobsInZset(zsetKey, rangeEnd, limit)
  if limit > 0 then
    return rcall("ZRANGEBYSCORE", zsetKey, 0, rangeEnd, "LIMIT", 0, limit)
  else
    return rcall("ZRANGEBYSCORE", zsetKey, 0, rangeEnd)
  end
end
local function cleanSet(
    setKey,
    jobKeyPrefix,
    rangeEnd,
    timestamp,
    limit,
    attributes,
    isFinished,
    jobSchedulersKey)
    local jobs = getJobsInZset(setKey, rangeEnd, limit)
    local deleted = {}
    local deletedCount = 0
    local jobTS
    for i, job in ipairs(jobs) do
        if limit > 0 and deletedCount >= limit then
            break
        end
        local jobKey = jobKeyPrefix .. job
        -- Extract a Job Scheduler Id from jobId ("repeat:job-scheduler-id:millis") 
        -- and check if it is in the scheduled jobs
        if not (jobSchedulersKey and isJobSchedulerJob(job, jobKey, jobSchedulersKey)) then
            if isFinished then
                removeJob(job, true, jobKeyPrefix, true --[[remove debounce key]] )
                deletedCount = deletedCount + 1
                table.insert(deleted, job)
            else
                -- * finishedOn says when the job was completed, but it isn't set unless the job has actually completed
                jobTS = getTimestamp(jobKey, attributes)
                if (not jobTS or jobTS <= timestamp) then
                    removeJob(job, true, jobKeyPrefix, true --[[remove debounce key]] )
                    deletedCount = deletedCount + 1
                    table.insert(deleted, job)
                end
            end
        end
    end
    if (#deleted > 0) then
        for from, to in batches(#deleted, 7000) do
            rcall("ZREM", setKey, unpack(deleted, from, to))
        end
    end
    return {deleted, deletedCount}
end
local result
if ARGV[4] == "active" then
  result = cleanList(KEYS[1], ARGV[1], rangeStart, rangeEnd, ARGV[2], false --[[ hasFinished ]],
                      repeatKey)
elseif ARGV[4] == "delayed" then
  rangeEnd = "+inf"
  result = cleanSet(KEYS[1], ARGV[1], rangeEnd, ARGV[2], limit,
                    {"processedOn", "timestamp"}, false  --[[ hasFinished ]], repeatKey)
elseif ARGV[4] == "prioritized" then
  rangeEnd = "+inf"
  result = cleanSet(KEYS[1], ARGV[1], rangeEnd, ARGV[2], limit,
                    {"timestamp"}, false  --[[ hasFinished ]], repeatKey)
elseif ARGV[4] == "wait" or ARGV[4] == "paused" then
  result = cleanList(KEYS[1], ARGV[1], rangeStart, rangeEnd, ARGV[2], true --[[ hasFinished ]],
                      repeatKey)
else
  rangeEnd = ARGV[2]
  -- No need to pass repeat key as in that moment job won't be related to a job scheduler
  result = cleanSet(KEYS[1], ARGV[1], rangeEnd, ARGV[2], limit,
                    {"finishedOn"}, true  --[[ hasFinished ]])
end
rcall("XADD", KEYS[2], "*", "event", "cleaned", "count", result[2])
return result[1]
`,keys:3},S={name:"drain",content:`--[[
  Drains the queue, removes all jobs that are waiting
  or delayed, but not active, completed or failed
  Input:
    KEYS[1] 'wait',
    KEYS[2] 'paused'
    KEYS[3] 'delayed'
    KEYS[4] 'prioritized'
    KEYS[5] 'jobschedulers' (repeat)
    ARGV[1]  queue key prefix
    ARGV[2]  should clean delayed jobs
]]
local rcall = redis.call
local queueBaseKey = ARGV[1]
--[[
  Functions to remove jobs.
]]
-- Includes
--[[
  Function to filter out jobs to ignore from a table.
]]
local function filterOutJobsToIgnore(jobs, jobsToIgnore)
  local filteredJobs = {}
  for i = 1, #jobs do
    if not jobsToIgnore[jobs[i]] then
      table.insert(filteredJobs, jobs[i])
    end
  end
  return filteredJobs
end
--[[
  Functions to remove jobs.
]]
-- Includes
--[[
  Function to remove job.
]]
-- Includes
--[[
  Function to remove deduplication key if needed
  when a job is being removed.
]]
local function removeDeduplicationKeyIfNeededOnRemoval(prefixKey,
  jobKey, jobId)
  local deduplicationId = rcall("HGET", jobKey, "deid")
  if deduplicationId then
    local deduplicationKey = prefixKey .. "de:" .. deduplicationId
    local currentJobId = rcall('GET', deduplicationKey)
    if currentJobId and currentJobId == jobId then
      return rcall("DEL", deduplicationKey)
    end
  end
end
--[[
  Function to remove job keys.
]]
local function removeJobKeys(jobKey)
  return rcall("DEL", jobKey, jobKey .. ':logs', jobKey .. ':dependencies',
    jobKey .. ':processed', jobKey .. ':failed', jobKey .. ':unsuccessful')
end
--[[
  Check if this job has a parent. If so we will just remove it from
  the parent child list, but if it is the last child we should move the parent to "wait/paused"
  which requires code from "moveToFinished"
]]
-- Includes
--[[
  Function to add job in target list and add marker if needed.
]]
-- Includes
--[[
  Add marker if needed when a job is available.
]]
local function addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
  if not isPausedOrMaxed then
    rcall("ZADD", markerKey, 0, "0")
  end  
end
local function addJobInTargetList(targetKey, markerKey, pushCmd, isPausedOrMaxed, jobId)
  rcall(pushCmd, targetKey, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
--[[
  Functions to destructure job key.
  Just a bit of warning, these functions may be a bit slow and affect performance significantly.
]]
local getJobIdFromKey = function (jobKey)
  return string.match(jobKey, ".*:(.*)")
end
local getJobKeyPrefix = function (jobKey, jobId)
  return string.sub(jobKey, 0, #jobKey - #jobId)
end
--[[
  Function to check for the meta.paused key to decide if we are paused or not
  (since an empty list and !EXISTS are not really the same).
]]
local function getTargetQueueList(queueMetaKey, activeKey, waitKey, pausedKey)
  local queueAttributes = rcall("HMGET", queueMetaKey, "paused", "concurrency")
  if queueAttributes[1] then
    return pausedKey, true
  else
    if queueAttributes[2] then
      local activeCount = rcall("LLEN", activeKey)
      if activeCount >= tonumber(queueAttributes[2]) then
        return waitKey, true
      else
        return waitKey, false
      end
    end
  end
  return waitKey, false
end
local function _moveParentToWait(parentPrefix, parentId, emitEvent)
  local parentTarget, isPausedOrMaxed = getTargetQueueList(parentPrefix .. "meta", parentPrefix .. "active",
    parentPrefix .. "wait", parentPrefix .. "paused")
  addJobInTargetList(parentTarget, parentPrefix .. "marker", "RPUSH", isPausedOrMaxed, parentId)
  if emitEvent then
    local parentEventStream = parentPrefix .. "events"
    rcall("XADD", parentEventStream, "*", "event", "waiting", "jobId", parentId, "prev", "waiting-children")
  end
end
local function removeParentDependencyKey(jobKey, hard, parentKey, baseKey, debounceId)
  if parentKey then
    local parentDependenciesKey = parentKey .. ":dependencies"
    local result = rcall("SREM", parentDependenciesKey, jobKey)
    if result > 0 then
      local pendingDependencies = rcall("SCARD", parentDependenciesKey)
      if pendingDependencies == 0 then
        local parentId = getJobIdFromKey(parentKey)
        local parentPrefix = getJobKeyPrefix(parentKey, parentId)
        local numRemovedElements = rcall("ZREM", parentPrefix .. "waiting-children", parentId)
        if numRemovedElements == 1 then
          if hard then -- remove parent in same queue
            if parentPrefix == baseKey then
              removeParentDependencyKey(parentKey, hard, nil, baseKey, nil)
              removeJobKeys(parentKey)
              if debounceId then
                rcall("DEL", parentPrefix .. "de:" .. debounceId)
              end
            else
              _moveParentToWait(parentPrefix, parentId)
            end
          else
            _moveParentToWait(parentPrefix, parentId, true)
          end
        end
      end
      return true
    end
  else
    local parentAttributes = rcall("HMGET", jobKey, "parentKey", "deid")
    local missedParentKey = parentAttributes[1]
    if( (type(missedParentKey) == "string") and missedParentKey ~= ""
      and (rcall("EXISTS", missedParentKey) == 1)) then
      local parentDependenciesKey = missedParentKey .. ":dependencies"
      local result = rcall("SREM", parentDependenciesKey, jobKey)
      if result > 0 then
        local pendingDependencies = rcall("SCARD", parentDependenciesKey)
        if pendingDependencies == 0 then
          local parentId = getJobIdFromKey(missedParentKey)
          local parentPrefix = getJobKeyPrefix(missedParentKey, parentId)
          local numRemovedElements = rcall("ZREM", parentPrefix .. "waiting-children", parentId)
          if numRemovedElements == 1 then
            if hard then
              if parentPrefix == baseKey then
                removeParentDependencyKey(missedParentKey, hard, nil, baseKey, nil)
                removeJobKeys(missedParentKey)
                if parentAttributes[2] then
                  rcall("DEL", parentPrefix .. "de:" .. parentAttributes[2])
                end
              else
                _moveParentToWait(parentPrefix, parentId)
              end
            else
              _moveParentToWait(parentPrefix, parentId, true)
            end
          end
        end
        return true
      end
    end
  end
  return false
end
local function removeJob(jobId, hard, baseKey, shouldRemoveDeduplicationKey)
  local jobKey = baseKey .. jobId
  removeParentDependencyKey(jobKey, hard, nil, baseKey)
  if shouldRemoveDeduplicationKey then
    removeDeduplicationKeyIfNeededOnRemoval(baseKey, jobKey, jobId)
  end
  removeJobKeys(jobKey)
end
local function removeJobs(keys, hard, baseKey, max)
  for i, key in ipairs(keys) do
    removeJob(key, hard, baseKey, true --[[remove debounce key]])
  end
  return max - #keys
end
local function getListItems(keyName, max)
  return rcall('LRANGE', keyName, 0, max - 1)
end
local function removeListJobs(keyName, hard, baseKey, max, jobsToIgnore)
  local jobs = getListItems(keyName, max)
  if jobsToIgnore then
    jobs = filterOutJobsToIgnore(jobs, jobsToIgnore)
  end
  local count = removeJobs(jobs, hard, baseKey, max)
  rcall("LTRIM", keyName, #jobs, -1)
  return count
end
-- Includes
--[[
  Function to loop in batches.
  Just a bit of warning, some commands as ZREM
  could receive a maximum of 7000 parameters per call.
]]
local function batches(n, batchSize)
  local i = 0
  return function()
    local from = i * batchSize + 1
    i = i + 1
    if (from <= n) then
      local to = math.min(from + batchSize - 1, n)
      return from, to
    end
  end
end
--[[
  Function to get ZSet items.
]]
local function getZSetItems(keyName, max)
  return rcall('ZRANGE', keyName, 0, max - 1)
end
local function removeZSetJobs(keyName, hard, baseKey, max, jobsToIgnore)
  local jobs = getZSetItems(keyName, max)
  if jobsToIgnore then
    jobs = filterOutJobsToIgnore(jobs, jobsToIgnore)
  end
  local count = removeJobs(jobs, hard, baseKey, max)
  if(#jobs > 0) then
    for from, to in batches(#jobs, 7000) do
      rcall("ZREM", keyName, unpack(jobs, from, to))
    end
  end
  return count
end
-- We must not remove delayed jobs if they are associated to a job scheduler.
local scheduledJobs = {}
local jobSchedulers = rcall("ZRANGE", KEYS[5], 0, -1, "WITHSCORES")
-- For every job scheduler, get the current delayed job id.
for i = 1, #jobSchedulers, 2 do
    local jobSchedulerId = jobSchedulers[i]
    local jobSchedulerMillis = jobSchedulers[i + 1]
    local delayedJobId = "repeat:" .. jobSchedulerId .. ":" .. jobSchedulerMillis
    scheduledJobs[delayedJobId] = true
end
removeListJobs(KEYS[1], true, queueBaseKey, 0, scheduledJobs) -- wait
removeListJobs(KEYS[2], true, queueBaseKey, 0, scheduledJobs) -- paused
if ARGV[2] == "1" then
  removeZSetJobs(KEYS[3], true, queueBaseKey, 0, scheduledJobs) -- delayed
end
removeZSetJobs(KEYS[4], true, queueBaseKey, 0, scheduledJobs) -- prioritized
`,keys:5},E={name:"extendLock",content:`--[[
  Extend lock and removes the job from the stalled set.
  Input:
    KEYS[1] 'lock',
    KEYS[2] 'stalled'
    ARGV[1]  token
    ARGV[2]  lock duration in milliseconds
    ARGV[3]  jobid
  Output:
    "1" if lock extented succesfully.
]]
local rcall = redis.call
if rcall("GET", KEYS[1]) == ARGV[1] then
  --   if rcall("SET", KEYS[1], ARGV[1], "PX", ARGV[2], "XX") then
  if rcall("SET", KEYS[1], ARGV[1], "PX", ARGV[2]) then
    rcall("SREM", KEYS[2], ARGV[3])
    return 1
  end
end
return 0
`,keys:2},I={name:"extendLocks",content:`--[[
  Extend locks for multiple jobs and remove them from the stalled set if successful.
  Return the list of job IDs for which the operation failed.
  KEYS[1] = stalledKey
  ARGV[1] = baseKey
  ARGV[2] = tokens
  ARGV[3] = jobIds
  ARGV[4] = lockDuration (ms)
  Output:
    An array of failed job IDs. If empty, all succeeded.
]]
local rcall = redis.call
local stalledKey = KEYS[1]
local baseKey = ARGV[1]
local tokens = cmsgpack.unpack(ARGV[2])
local jobIds = cmsgpack.unpack(ARGV[3])
local lockDuration = ARGV[4]
local jobCount = #jobIds
local failedJobs = {}
for i = 1, jobCount, 1 do
    local lockKey = baseKey .. jobIds[i] .. ':lock'
    local jobId = jobIds[i]
    local token = tokens[i]
    local currentToken = rcall("GET", lockKey)
    if currentToken == token then
        local setResult = rcall("SET", lockKey, token, "PX", lockDuration)
        if setResult then
            rcall("SREM", stalledKey, jobId)
        else
            table.insert(failedJobs, jobId)
        end
    else
        table.insert(failedJobs, jobId)
    end
end
return failedJobs
`,keys:1},k={name:"getCounts",content:`--[[
  Get counts per provided states
    Input:
      KEYS[1]    'prefix'
      ARGV[1...] types
]]
local rcall = redis.call;
local prefix = KEYS[1]
local results = {}
for i = 1, #ARGV do
  local stateKey = prefix .. ARGV[i]
  if ARGV[i] == "wait" or ARGV[i] == "paused" then
    -- Markers in waitlist DEPRECATED in v5: Remove in v6.
    local marker = rcall("LINDEX", stateKey, -1)
    if marker and string.sub(marker, 1, 2) == "0:" then
      local count = rcall("LLEN", stateKey)
      if count > 1 then
        rcall("RPOP", stateKey)
        results[#results+1] = count-1
      else
        results[#results+1] = 0
      end
    else
      results[#results+1] = rcall("LLEN", stateKey)
    end
  elseif ARGV[i] == "active" then
    results[#results+1] = rcall("LLEN", stateKey)
  else
    results[#results+1] = rcall("ZCARD", stateKey)
  end
end
return results
`,keys:1},w={name:"getCountsPerPriority",content:`--[[
  Get counts per provided states
    Input:
      KEYS[1] wait key
      KEYS[2] paused key
      KEYS[3] meta key
      KEYS[4] prioritized key
      ARGV[1...] priorities
]]
local rcall = redis.call
local results = {}
local waitKey = KEYS[1]
local pausedKey = KEYS[2]
local prioritizedKey = KEYS[4]
-- Includes
--[[
  Function to check for the meta.paused key to decide if we are paused or not
  (since an empty list and !EXISTS are not really the same).
]]
local function isQueuePaused(queueMetaKey)
  return rcall("HEXISTS", queueMetaKey, "paused") == 1
end
for i = 1, #ARGV do
  local priority = tonumber(ARGV[i])
  if priority == 0 then
    if isQueuePaused(KEYS[3]) then
      results[#results+1] = rcall("LLEN", pausedKey)
    else
      results[#results+1] = rcall("LLEN", waitKey)
    end
  else
    results[#results+1] = rcall("ZCOUNT", prioritizedKey,
      priority * 0x100000000, (priority + 1)  * 0x100000000 - 1)
  end
end
return results
`,keys:4},j={name:"getDependencyCounts",content:`--[[
  Get counts per child states
    Input:
      KEYS[1]    processed key
      KEYS[2]    unprocessed key
      KEYS[3]    ignored key
      KEYS[4]    failed key
      ARGV[1...] types
]]
local rcall = redis.call;
local processedKey = KEYS[1]
local unprocessedKey = KEYS[2]
local ignoredKey = KEYS[3]
local failedKey = KEYS[4]
local results = {}
for i = 1, #ARGV do
  if ARGV[i] == "processed" then
    results[#results+1] = rcall("HLEN", processedKey)
  elseif ARGV[i] == "unprocessed" then
    results[#results+1] = rcall("SCARD", unprocessedKey)
  elseif ARGV[i] == "ignored" then
    results[#results+1] = rcall("HLEN", ignoredKey)
  else
    results[#results+1] = rcall("ZCARD", failedKey)
  end
end
return results
`,keys:4},x={name:"getJobScheduler",content:`--[[
  Get job scheduler record.
  Input:
    KEYS[1] 'repeat' key
    ARGV[1] id
]]
local rcall = redis.call
local jobSchedulerKey = KEYS[1] .. ":" .. ARGV[1]
local score = rcall("ZSCORE", KEYS[1], ARGV[1])
if score then
  return {rcall("HGETALL", jobSchedulerKey), score} -- get job data
end
return {nil, nil}
`,keys:1},T={name:"getRanges",content:`--[[
  Get job ids per provided states
    Input:
      KEYS[1]    'prefix'
      ARGV[1]    start
      ARGV[2]    end
      ARGV[3]    asc
      ARGV[4...] types
]]
local rcall = redis.call
local prefix = KEYS[1]
local rangeStart = tonumber(ARGV[1])
local rangeEnd = tonumber(ARGV[2])
local asc = ARGV[3]
local results = {}
local function getRangeInList(listKey, asc, rangeStart, rangeEnd, results)
  if asc == "1" then
    local modifiedRangeStart
    local modifiedRangeEnd
    if rangeStart == -1 then
      modifiedRangeStart = 0
    else
      modifiedRangeStart = -(rangeStart + 1)
    end
    if rangeEnd == -1 then
      modifiedRangeEnd = 0
    else
      modifiedRangeEnd = -(rangeEnd + 1)
    end
    results[#results+1] = rcall("LRANGE", listKey,
      modifiedRangeEnd,
      modifiedRangeStart)
  else
    results[#results+1] = rcall("LRANGE", listKey, rangeStart, rangeEnd)
  end
end
for i = 4, #ARGV do
  local stateKey = prefix .. ARGV[i]
  if ARGV[i] == "wait" or ARGV[i] == "paused" then
    -- Markers in waitlist DEPRECATED in v5: Remove in v6.
    local marker = rcall("LINDEX", stateKey, -1)
    if marker and string.sub(marker, 1, 2) == "0:" then
      local count = rcall("LLEN", stateKey)
      if count > 1 then
        rcall("RPOP", stateKey)
        getRangeInList(stateKey, asc, rangeStart, rangeEnd, results)
      else
        results[#results+1] = {}
      end
    else
      getRangeInList(stateKey, asc, rangeStart, rangeEnd, results)
    end
  elseif ARGV[i] == "active" then
    getRangeInList(stateKey, asc, rangeStart, rangeEnd, results)
  else
    if asc == "1" then
      results[#results+1] = rcall("ZRANGE", stateKey, rangeStart, rangeEnd)
    else
      results[#results+1] = rcall("ZREVRANGE", stateKey, rangeStart, rangeEnd)
    end
  end
end
return results
`,keys:1},A={name:"getRateLimitTtl",content:`--[[
  Get rate limit ttl
    Input:
      KEYS[1] 'limiter'
      ARGV[1] maxJobs
]]
local rcall = redis.call
-- Includes
--[[
  Function to get current rate limit ttl.
]]
local function getRateLimitTTL(maxJobs, rateLimiterKey)
  if maxJobs and maxJobs <= tonumber(rcall("GET", rateLimiterKey) or 0) then
    local pttl = rcall("PTTL", rateLimiterKey)
    if pttl == 0 then
      rcall("DEL", rateLimiterKey)
    end
    if pttl > 0 then
      return pttl
    end
  end
  return 0
end
local rateLimiterKey = KEYS[1]
if ARGV[1] ~= "0" then
  return getRateLimitTTL(tonumber(ARGV[1]), rateLimiterKey)
else
  return rcall("PTTL", rateLimiterKey)
end
`,keys:1},D={name:"getState",content:`--[[
  Get a job state
  Input: 
    KEYS[1] 'completed' key,
    KEYS[2] 'failed' key
    KEYS[3] 'delayed' key
    KEYS[4] 'active' key
    KEYS[5] 'wait' key
    KEYS[6] 'paused' key
    KEYS[7] 'waiting-children' key
    KEYS[8] 'prioritized' key
    ARGV[1] job id
  Output:
    'completed'
    'failed'
    'delayed'
    'active'
    'prioritized'
    'waiting'
    'waiting-children'
    'unknown'
]]
local rcall = redis.call
if rcall("ZSCORE", KEYS[1], ARGV[1]) then
  return "completed"
end
if rcall("ZSCORE", KEYS[2], ARGV[1]) then
  return "failed"
end
if rcall("ZSCORE", KEYS[3], ARGV[1]) then
  return "delayed"
end
if rcall("ZSCORE", KEYS[8], ARGV[1]) then
  return "prioritized"
end
-- Includes
--[[
  Functions to check if a item belongs to a list.
]]
local function checkItemInList(list, item)
  for _, v in pairs(list) do
    if v == item then
      return 1
    end
  end
  return nil
end
local active_items = rcall("LRANGE", KEYS[4] , 0, -1)
if checkItemInList(active_items, ARGV[1]) ~= nil then
  return "active"
end
local wait_items = rcall("LRANGE", KEYS[5] , 0, -1)
if checkItemInList(wait_items, ARGV[1]) ~= nil then
  return "waiting"
end
local paused_items = rcall("LRANGE", KEYS[6] , 0, -1)
if checkItemInList(paused_items, ARGV[1]) ~= nil then
  return "waiting"
end
if rcall("ZSCORE", KEYS[7], ARGV[1]) then
  return "waiting-children"
end
return "unknown"
`,keys:8},C={name:"getStateV2",content:`--[[
  Get a job state
  Input: 
    KEYS[1] 'completed' key,
    KEYS[2] 'failed' key
    KEYS[3] 'delayed' key
    KEYS[4] 'active' key
    KEYS[5] 'wait' key
    KEYS[6] 'paused' key
    KEYS[7] 'waiting-children' key
    KEYS[8] 'prioritized' key
    ARGV[1] job id
  Output:
    'completed'
    'failed'
    'delayed'
    'active'
    'waiting'
    'waiting-children'
    'unknown'
]]
local rcall = redis.call
if rcall("ZSCORE", KEYS[1], ARGV[1]) then
  return "completed"
end
if rcall("ZSCORE", KEYS[2], ARGV[1]) then
  return "failed"
end
if rcall("ZSCORE", KEYS[3], ARGV[1]) then
  return "delayed"
end
if rcall("ZSCORE", KEYS[8], ARGV[1]) then
  return "prioritized"
end
if rcall("LPOS", KEYS[4] , ARGV[1]) then
  return "active"
end
if rcall("LPOS", KEYS[5] , ARGV[1]) then
  return "waiting"
end
if rcall("LPOS", KEYS[6] , ARGV[1]) then
  return "waiting"
end
if rcall("ZSCORE", KEYS[7] , ARGV[1]) then
  return "waiting-children"
end
return "unknown"
`,keys:8},O={name:"isFinished",content:`--[[
  Checks if a job is finished (.i.e. is in the completed or failed set)
  Input: 
    KEYS[1] completed key
    KEYS[2] failed key
    KEYS[3] job key
    ARGV[1] job id
    ARGV[2] return value?
  Output:
    0 - Not finished.
    1 - Completed.
    2 - Failed.
   -1 - Missing job. 
]]
local rcall = redis.call
if rcall("EXISTS", KEYS[3]) ~= 1 then
  if ARGV[2] == "1" then
    return {-1,"Missing key for job " .. KEYS[3] .. ". isFinished"}
  end  
  return -1
end
if rcall("ZSCORE", KEYS[1], ARGV[1]) then
  if ARGV[2] == "1" then
    local returnValue = rcall("HGET", KEYS[3], "returnvalue")
    return {1,returnValue}
  end
  return 1
end
if rcall("ZSCORE", KEYS[2], ARGV[1]) then
  if ARGV[2] == "1" then
    local failedReason = rcall("HGET", KEYS[3], "failedReason")
    return {2,failedReason}
  end
  return 2
end
if ARGV[2] == "1" then
  return {0}
end
return 0
`,keys:3},R={name:"isJobInList",content:`--[[
  Checks if job is in a given list.
  Input:
    KEYS[1]
    ARGV[1]
  Output:
    1 if element found in the list.
]]
-- Includes
--[[
  Functions to check if a item belongs to a list.
]]
local function checkItemInList(list, item)
  for _, v in pairs(list) do
    if v == item then
      return 1
    end
  end
  return nil
end
local items = redis.call("LRANGE", KEYS[1] , 0, -1)
return checkItemInList(items, ARGV[1])
`,keys:1},M={name:"isMaxed",content:`--[[
  Checks if queue is maxed.
  Input:
    KEYS[1] meta key
    KEYS[2] active key
  Output:
    1 if element found in the list.
]]
local rcall = redis.call
-- Includes
--[[
  Function to check if queue is maxed or not.
]]
local function isQueueMaxed(queueMetaKey, activeKey)
  local maxConcurrency = rcall("HGET", queueMetaKey, "concurrency")
  if maxConcurrency then
    local activeCount = rcall("LLEN", activeKey)
    if activeCount >= tonumber(maxConcurrency) then
      return true
    end
  end
  return false
end
return isQueueMaxed(KEYS[1], KEYS[2])
`,keys:2},P={name:"moveJobFromActiveToWait",content:`--[[
  Function to move job from active state to wait.
  Input:
    KEYS[1]  active key
    KEYS[2]  wait key
    KEYS[3]  stalled key
    KEYS[4]  paused key
    KEYS[5]  meta key
    KEYS[6]  limiter key
    KEYS[7]  prioritized key
    KEYS[8]  marker key
    KEYS[9] event key
    ARGV[1] job id
    ARGV[2] lock token
    ARGV[3] job id key
]]
local rcall = redis.call
-- Includes
--[[
  Function to add job in target list and add marker if needed.
]]
-- Includes
--[[
  Add marker if needed when a job is available.
]]
local function addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
  if not isPausedOrMaxed then
    rcall("ZADD", markerKey, 0, "0")
  end  
end
local function addJobInTargetList(targetKey, markerKey, pushCmd, isPausedOrMaxed, jobId)
  rcall(pushCmd, targetKey, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
--[[
  Function to push back job considering priority in front of same prioritized jobs.
]]
local function pushBackJobWithPriority(prioritizedKey, priority, jobId)
  -- in order to put it at front of same prioritized jobs
  -- we consider prioritized counter as 0
  local score = priority * 0x100000000
  rcall("ZADD", prioritizedKey, score, jobId)
end
--[[
  Function to get max events value or set by default 10000.
]]
local function getOrSetMaxEvents(metaKey)
  local maxEvents = rcall("HGET", metaKey, "opts.maxLenEvents")
  if not maxEvents then
    maxEvents = 10000
    rcall("HSET", metaKey, "opts.maxLenEvents", maxEvents)
  end
  return maxEvents
end
--[[
  Function to check for the meta.paused key to decide if we are paused or not
  (since an empty list and !EXISTS are not really the same).
]]
local function getTargetQueueList(queueMetaKey, activeKey, waitKey, pausedKey)
  local queueAttributes = rcall("HMGET", queueMetaKey, "paused", "concurrency")
  if queueAttributes[1] then
    return pausedKey, true
  else
    if queueAttributes[2] then
      local activeCount = rcall("LLEN", activeKey)
      if activeCount >= tonumber(queueAttributes[2]) then
        return waitKey, true
      else
        return waitKey, false
      end
    end
  end
  return waitKey, false
end
local function removeLock(jobKey, stalledKey, token, jobId)
  if token ~= "0" then
    local lockKey = jobKey .. ':lock'
    local lockToken = rcall("GET", lockKey)
    if lockToken == token then
      rcall("DEL", lockKey)
      rcall("SREM", stalledKey, jobId)
    else
      if lockToken then
        -- Lock exists but token does not match
        return -6
      else
        -- Lock is missing completely
        return -2
      end
    end
  end
  return 0
end
local jobId = ARGV[1]
local token = ARGV[2]
local jobKey = ARGV[3]
local errorCode = removeLock(jobKey, KEYS[3], token, jobId)
if errorCode < 0 then
  return errorCode
end
local metaKey = KEYS[5]
local removed = rcall("LREM", KEYS[1], 1, jobId)
if removed > 0 then
  local target, isPausedOrMaxed = getTargetQueueList(metaKey, KEYS[1], KEYS[2], KEYS[4])
  local priority = tonumber(rcall("HGET", ARGV[3], "priority")) or 0
  if priority > 0 then
    pushBackJobWithPriority(KEYS[7], priority, jobId)
  else
    addJobInTargetList(target, KEYS[8], "RPUSH", isPausedOrMaxed, jobId)
  end
  local maxEvents = getOrSetMaxEvents(metaKey)
  -- Emit waiting event
  rcall("XADD", KEYS[9], "MAXLEN", "~", maxEvents, "*", "event", "waiting",
    "jobId", jobId)
end
local pttl = rcall("PTTL", KEYS[6])
if pttl > 0 then
  return pttl
else
  return 0
end`,keys:9},N={name:"moveJobsToWait",content:`--[[
  Move completed, failed or delayed jobs to wait.
  Note: Does not support jobs with priorities.
  Input:
    KEYS[1] base key
    KEYS[2] events stream
    KEYS[3] state key (failed, completed, delayed)
    KEYS[4] 'wait'
    KEYS[5] 'paused'
    KEYS[6] 'meta'
    KEYS[7] 'active'
    KEYS[8] 'marker'
    ARGV[1] count
    ARGV[2] timestamp
    ARGV[3] prev state
  Output:
    1  means the operation is not completed
    0  means the operation is completed
]]
local maxCount = tonumber(ARGV[1])
local timestamp = tonumber(ARGV[2])
local rcall = redis.call;
-- Includes
--[[
  Add marker if needed when a job is available.
]]
local function addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
  if not isPausedOrMaxed then
    rcall("ZADD", markerKey, 0, "0")
  end  
end
--[[
  Function to loop in batches.
  Just a bit of warning, some commands as ZREM
  could receive a maximum of 7000 parameters per call.
]]
local function batches(n, batchSize)
  local i = 0
  return function()
    local from = i * batchSize + 1
    i = i + 1
    if (from <= n) then
      local to = math.min(from + batchSize - 1, n)
      return from, to
    end
  end
end
--[[
  Function to get max events value or set by default 10000.
]]
local function getOrSetMaxEvents(metaKey)
  local maxEvents = rcall("HGET", metaKey, "opts.maxLenEvents")
  if not maxEvents then
    maxEvents = 10000
    rcall("HSET", metaKey, "opts.maxLenEvents", maxEvents)
  end
  return maxEvents
end
--[[
  Function to check for the meta.paused key to decide if we are paused or not
  (since an empty list and !EXISTS are not really the same).
]]
local function getTargetQueueList(queueMetaKey, activeKey, waitKey, pausedKey)
  local queueAttributes = rcall("HMGET", queueMetaKey, "paused", "concurrency")
  if queueAttributes[1] then
    return pausedKey, true
  else
    if queueAttributes[2] then
      local activeCount = rcall("LLEN", activeKey)
      if activeCount >= tonumber(queueAttributes[2]) then
        return waitKey, true
      else
        return waitKey, false
      end
    end
  end
  return waitKey, false
end
local metaKey = KEYS[6]
local target, isPausedOrMaxed = getTargetQueueList(metaKey, KEYS[7], KEYS[4], KEYS[5])
local jobs = rcall('ZRANGEBYSCORE', KEYS[3], 0, timestamp, 'LIMIT', 0, maxCount)
if (#jobs > 0) then
    if ARGV[3] == "failed" then
        for i, key in ipairs(jobs) do
            local jobKey = KEYS[1] .. key
            rcall("HDEL", jobKey, "finishedOn", "processedOn", "failedReason")
        end
    elseif ARGV[3] == "completed" then
        for i, key in ipairs(jobs) do
            local jobKey = KEYS[1] .. key
            rcall("HDEL", jobKey, "finishedOn", "processedOn", "returnvalue")
        end
    end
    local maxEvents = getOrSetMaxEvents(metaKey)
    for i, key in ipairs(jobs) do
        -- Emit waiting event
        rcall("XADD", KEYS[2], "MAXLEN", "~", maxEvents, "*", "event",
              "waiting", "jobId", key, "prev", ARGV[3]);
    end
    for from, to in batches(#jobs, 7000) do
        rcall("ZREM", KEYS[3], unpack(jobs, from, to))
        rcall("LPUSH", target, unpack(jobs, from, to))
    end
    addBaseMarkerIfNeeded(KEYS[8], isPausedOrMaxed)
end
maxCount = maxCount - #jobs
if (maxCount <= 0) then return 1 end
return 0
`,keys:8},J={name:"moveStalledJobsToWait",content:`--[[
  Move stalled jobs to wait.
    Input:
      KEYS[1] 'stalled' (SET)
      KEYS[2] 'wait',   (LIST)
      KEYS[3] 'active', (LIST)
      KEYS[4] 'failed', (ZSET)
      KEYS[5] 'stalled-check', (KEY)
      KEYS[6] 'meta', (KEY)
      KEYS[7] 'paused', (LIST)
      KEYS[8] 'marker'
      KEYS[9] 'event stream' (STREAM)
      ARGV[1]  Max stalled job count
      ARGV[2]  queue.toKey('')
      ARGV[3]  timestamp
      ARGV[4]  max check time
    Events:
      'stalled' with stalled job id.
]]
local rcall = redis.call
-- Includes
--[[
  Function to add job in target list and add marker if needed.
]]
-- Includes
--[[
  Add marker if needed when a job is available.
]]
local function addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
  if not isPausedOrMaxed then
    rcall("ZADD", markerKey, 0, "0")
  end  
end
local function addJobInTargetList(targetKey, markerKey, pushCmd, isPausedOrMaxed, jobId)
  rcall(pushCmd, targetKey, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
--[[
  Function to loop in batches.
  Just a bit of warning, some commands as ZREM
  could receive a maximum of 7000 parameters per call.
]]
local function batches(n, batchSize)
  local i = 0
  return function()
    local from = i * batchSize + 1
    i = i + 1
    if (from <= n) then
      local to = math.min(from + batchSize - 1, n)
      return from, to
    end
  end
end
--[[
  Function to check for the meta.paused key to decide if we are paused or not
  (since an empty list and !EXISTS are not really the same).
]]
local function getTargetQueueList(queueMetaKey, activeKey, waitKey, pausedKey)
  local queueAttributes = rcall("HMGET", queueMetaKey, "paused", "concurrency")
  if queueAttributes[1] then
    return pausedKey, true
  else
    if queueAttributes[2] then
      local activeCount = rcall("LLEN", activeKey)
      if activeCount >= tonumber(queueAttributes[2]) then
        return waitKey, true
      else
        return waitKey, false
      end
    end
  end
  return waitKey, false
end
--[[
  Function to recursively move from waitingChildren to failed.
]]
-- Includes
--[[
  Validate and move parent to a wait status (waiting, delayed or prioritized)
  if no pending dependencies.
]]
-- Includes
--[[
  Validate and move parent to a wait status (waiting, delayed or prioritized) if needed.
]]
-- Includes
--[[
  Move parent to a wait status (wait, prioritized or delayed)
]]
-- Includes
--[[
  Add delay marker if needed.
]]
-- Includes
--[[
  Function to return the next delayed job timestamp.
]]
local function getNextDelayedTimestamp(delayedKey)
  local result = rcall("ZRANGE", delayedKey, 0, 0, "WITHSCORES")
  if #result then
    local nextTimestamp = tonumber(result[2])
    if nextTimestamp ~= nil then
      return nextTimestamp / 0x1000
    end
  end
end
local function addDelayMarkerIfNeeded(markerKey, delayedKey)
  local nextTimestamp = getNextDelayedTimestamp(delayedKey)
  if nextTimestamp ~= nil then
    -- Replace the score of the marker with the newest known
    -- next timestamp.
    rcall("ZADD", markerKey, nextTimestamp, "1")
  end
end
--[[
  Function to add job considering priority.
]]
-- Includes
--[[
  Function to get priority score.
]]
local function getPriorityScore(priority, priorityCounterKey)
  local prioCounter = rcall("INCR", priorityCounterKey)
  return priority * 0x100000000 + prioCounter % 0x100000000
end
local function addJobWithPriority(markerKey, prioritizedKey, priority, jobId, priorityCounterKey,
  isPausedOrMaxed)
  local score = getPriorityScore(priority, priorityCounterKey)
  rcall("ZADD", prioritizedKey, score, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
--[[
  Function to check if queue is paused or maxed
  (since an empty list and !EXISTS are not really the same).
]]
local function isQueuePausedOrMaxed(queueMetaKey, activeKey)
  local queueAttributes = rcall("HMGET", queueMetaKey, "paused", "concurrency")
  if queueAttributes[1] then
    return true
  else
    if queueAttributes[2] then
      local activeCount = rcall("LLEN", activeKey)
      return activeCount >= tonumber(queueAttributes[2])
    end
  end
  return false
end
local function moveParentToWait(parentQueueKey, parentKey, parentId, timestamp)
    local parentWaitKey = parentQueueKey .. ":wait"
    local parentPausedKey = parentQueueKey .. ":paused"
    local parentActiveKey = parentQueueKey .. ":active"
    local parentMetaKey = parentQueueKey .. ":meta"
    local parentMarkerKey = parentQueueKey .. ":marker"
    local jobAttributes = rcall("HMGET", parentKey, "priority", "delay")
    local priority = tonumber(jobAttributes[1]) or 0
    local delay = tonumber(jobAttributes[2]) or 0
    -- ignore dependencies if any left
    rcall("HSET", parentKey, "igdp", 1)
    if delay > 0 then
        local delayedTimestamp = tonumber(timestamp) + delay
        local score = delayedTimestamp * 0x1000
        local parentDelayedKey = parentQueueKey .. ":delayed"
        rcall("ZADD", parentDelayedKey, score, parentId)
        rcall("XADD", parentQueueKey .. ":events", "*", "event", "delayed", "jobId", parentId, "delay",
            delayedTimestamp)
        addDelayMarkerIfNeeded(parentMarkerKey, parentDelayedKey)
    else
        if priority == 0 then
            local parentTarget, isParentPausedOrMaxed = getTargetQueueList(parentMetaKey, parentActiveKey,
                parentWaitKey, parentPausedKey)
            addJobInTargetList(parentTarget, parentMarkerKey, "RPUSH", isParentPausedOrMaxed, parentId)
        else
            local isPausedOrMaxed = isQueuePausedOrMaxed(parentMetaKey, parentActiveKey)
            addJobWithPriority(parentMarkerKey, parentQueueKey .. ":prioritized", priority, parentId,
                parentQueueKey .. ":pc", isPausedOrMaxed)
        end
        rcall("XADD", parentQueueKey .. ":events", "*", "event", "waiting", "jobId", parentId, "prev",
            "waiting-children")
    end
end
local function moveParentToWaitIfNeeded(parentQueueKey, parentKey, parentId, timestamp)
  if rcall("EXISTS", parentKey) == 1 then
    local parentWaitingChildrenKey = parentQueueKey .. ":waiting-children"
    if rcall("ZSCORE", parentWaitingChildrenKey, parentId) then    
      rcall("ZREM", parentWaitingChildrenKey, parentId)
      moveParentToWait(parentQueueKey, parentKey, parentId, timestamp)
    end
  end
end
local function moveParentToWaitIfNoPendingDependencies(parentQueueKey, parentDependenciesKey, parentKey,
  parentId, timestamp)
  local doNotHavePendingDependencies = rcall("SCARD", parentDependenciesKey) == 0
  if doNotHavePendingDependencies then
    moveParentToWaitIfNeeded(parentQueueKey, parentKey, parentId, timestamp)
  end
end
--[[
  Functions to remove jobs when removeOnFail option is provided.
]]
-- Includes
--[[
  Function to remove job.
]]
-- Includes
--[[
  Function to remove deduplication key if needed
  when a job is being removed.
]]
local function removeDeduplicationKeyIfNeededOnRemoval(prefixKey,
  jobKey, jobId)
  local deduplicationId = rcall("HGET", jobKey, "deid")
  if deduplicationId then
    local deduplicationKey = prefixKey .. "de:" .. deduplicationId
    local currentJobId = rcall('GET', deduplicationKey)
    if currentJobId and currentJobId == jobId then
      return rcall("DEL", deduplicationKey)
    end
  end
end
--[[
  Function to remove job keys.
]]
local function removeJobKeys(jobKey)
  return rcall("DEL", jobKey, jobKey .. ':logs', jobKey .. ':dependencies',
    jobKey .. ':processed', jobKey .. ':failed', jobKey .. ':unsuccessful')
end
--[[
  Check if this job has a parent. If so we will just remove it from
  the parent child list, but if it is the last child we should move the parent to "wait/paused"
  which requires code from "moveToFinished"
]]
-- Includes
--[[
  Functions to destructure job key.
  Just a bit of warning, these functions may be a bit slow and affect performance significantly.
]]
local getJobIdFromKey = function (jobKey)
  return string.match(jobKey, ".*:(.*)")
end
local getJobKeyPrefix = function (jobKey, jobId)
  return string.sub(jobKey, 0, #jobKey - #jobId)
end
local function _moveParentToWait(parentPrefix, parentId, emitEvent)
  local parentTarget, isPausedOrMaxed = getTargetQueueList(parentPrefix .. "meta", parentPrefix .. "active",
    parentPrefix .. "wait", parentPrefix .. "paused")
  addJobInTargetList(parentTarget, parentPrefix .. "marker", "RPUSH", isPausedOrMaxed, parentId)
  if emitEvent then
    local parentEventStream = parentPrefix .. "events"
    rcall("XADD", parentEventStream, "*", "event", "waiting", "jobId", parentId, "prev", "waiting-children")
  end
end
local function removeParentDependencyKey(jobKey, hard, parentKey, baseKey, debounceId)
  if parentKey then
    local parentDependenciesKey = parentKey .. ":dependencies"
    local result = rcall("SREM", parentDependenciesKey, jobKey)
    if result > 0 then
      local pendingDependencies = rcall("SCARD", parentDependenciesKey)
      if pendingDependencies == 0 then
        local parentId = getJobIdFromKey(parentKey)
        local parentPrefix = getJobKeyPrefix(parentKey, parentId)
        local numRemovedElements = rcall("ZREM", parentPrefix .. "waiting-children", parentId)
        if numRemovedElements == 1 then
          if hard then -- remove parent in same queue
            if parentPrefix == baseKey then
              removeParentDependencyKey(parentKey, hard, nil, baseKey, nil)
              removeJobKeys(parentKey)
              if debounceId then
                rcall("DEL", parentPrefix .. "de:" .. debounceId)
              end
            else
              _moveParentToWait(parentPrefix, parentId)
            end
          else
            _moveParentToWait(parentPrefix, parentId, true)
          end
        end
      end
      return true
    end
  else
    local parentAttributes = rcall("HMGET", jobKey, "parentKey", "deid")
    local missedParentKey = parentAttributes[1]
    if( (type(missedParentKey) == "string") and missedParentKey ~= ""
      and (rcall("EXISTS", missedParentKey) == 1)) then
      local parentDependenciesKey = missedParentKey .. ":dependencies"
      local result = rcall("SREM", parentDependenciesKey, jobKey)
      if result > 0 then
        local pendingDependencies = rcall("SCARD", parentDependenciesKey)
        if pendingDependencies == 0 then
          local parentId = getJobIdFromKey(missedParentKey)
          local parentPrefix = getJobKeyPrefix(missedParentKey, parentId)
          local numRemovedElements = rcall("ZREM", parentPrefix .. "waiting-children", parentId)
          if numRemovedElements == 1 then
            if hard then
              if parentPrefix == baseKey then
                removeParentDependencyKey(missedParentKey, hard, nil, baseKey, nil)
                removeJobKeys(missedParentKey)
                if parentAttributes[2] then
                  rcall("DEL", parentPrefix .. "de:" .. parentAttributes[2])
                end
              else
                _moveParentToWait(parentPrefix, parentId)
              end
            else
              _moveParentToWait(parentPrefix, parentId, true)
            end
          end
        end
        return true
      end
    end
  end
  return false
end
local function removeJob(jobId, hard, baseKey, shouldRemoveDeduplicationKey)
  local jobKey = baseKey .. jobId
  removeParentDependencyKey(jobKey, hard, nil, baseKey)
  if shouldRemoveDeduplicationKey then
    removeDeduplicationKeyIfNeededOnRemoval(baseKey, jobKey, jobId)
  end
  removeJobKeys(jobKey)
end
--[[
  Functions to remove jobs by max age.
]]
-- Includes
local function removeJobsByMaxAge(timestamp, maxAge, targetSet, prefix,
  shouldRemoveDebounceKey)
  local start = timestamp - maxAge * 1000
  local jobIds = rcall("ZREVRANGEBYSCORE", targetSet, start, "-inf")
  for i, jobId in ipairs(jobIds) do
    removeJob(jobId, false, prefix, false --[[remove debounce key]])
  end
  rcall("ZREMRANGEBYSCORE", targetSet, "-inf", start)
end
--[[
  Functions to remove jobs by max count.
]]
-- Includes
local function removeJobsByMaxCount(maxCount, targetSet, prefix)
  local start = maxCount
  local jobIds = rcall("ZREVRANGE", targetSet, start, -1)
  for i, jobId in ipairs(jobIds) do
    removeJob(jobId, false, prefix, false --[[remove debounce key]])
  end
  rcall("ZREMRANGEBYRANK", targetSet, 0, -(maxCount + 1))
end
local function removeJobsOnFail(queueKeyPrefix, failedKey, jobId, opts, timestamp)
  local removeOnFailType = type(opts["removeOnFail"])
  if removeOnFailType == "number" then
    removeJobsByMaxCount(opts["removeOnFail"],
                        failedKey, queueKeyPrefix)
  elseif removeOnFailType == "boolean" then
    if opts["removeOnFail"] then
      removeJob(jobId, false, queueKeyPrefix,
                false --[[remove debounce key]])
      rcall("ZREM", failedKey, jobId)
    end
  elseif removeOnFailType ~= "nil" then
    local maxAge = opts["removeOnFail"]["age"]
    local maxCount = opts["removeOnFail"]["count"]
    if maxAge ~= nil then
      removeJobsByMaxAge(timestamp, maxAge,
                        failedKey, queueKeyPrefix)
    end
    if maxCount ~= nil and maxCount > 0 then
      removeJobsByMaxCount(maxCount, failedKey,
                            queueKeyPrefix)
    end
  end 
end
local moveParentToFailedIfNeeded
local moveChildFromDependenciesIfNeeded
moveParentToFailedIfNeeded = function (parentQueueKey, parentKey, parentId, jobIdKey, timestamp)
  if rcall("EXISTS", parentKey) == 1 then
    local parentWaitingChildrenKey = parentQueueKey .. ":waiting-children"
    local parentDelayedKey = parentQueueKey .. ":delayed"
    local parentPrioritizedKey = parentQueueKey .. ":prioritized"
    local parentWaitingChildrenOrDelayedKey
    local prevState
    if rcall("ZSCORE", parentWaitingChildrenKey, parentId) then
      parentWaitingChildrenOrDelayedKey = parentWaitingChildrenKey
      prevState = "waiting-children"
    elseif rcall("ZSCORE", parentDelayedKey, parentId) then
      parentWaitingChildrenOrDelayedKey = parentDelayedKey
      prevState = "delayed"
      rcall("HSET", parentKey, "delay", 0)
    end
    if parentWaitingChildrenOrDelayedKey then
      rcall("ZREM", parentWaitingChildrenOrDelayedKey, parentId)
      local parentQueuePrefix = parentQueueKey .. ":"
      local parentFailedKey = parentQueueKey .. ":failed"
      local deferredFailure = "child " .. jobIdKey .. " failed"
      rcall("HSET", parentKey, "defa", deferredFailure)
      moveParentToWait(parentQueueKey, parentKey, parentId, timestamp)
    else
      if not rcall("ZSCORE", parentQueueKey .. ":failed", parentId) then
        local deferredFailure = "child " .. jobIdKey .. " failed"
        rcall("HSET", parentKey, "defa", deferredFailure)
      end
    end
  end
end
moveChildFromDependenciesIfNeeded = function (rawParentData, childKey, failedReason, timestamp)
  if rawParentData then
    local parentData = cjson.decode(rawParentData)
    local parentKey = parentData['queueKey'] .. ':' .. parentData['id']
    local parentDependenciesChildrenKey = parentKey .. ":dependencies"
    if parentData['fpof'] then
      if rcall("SREM", parentDependenciesChildrenKey, childKey) == 1 then
        local parentUnsuccesssfulChildrenKey = parentKey .. ":unsuccessful"
        rcall("ZADD", parentUnsuccesssfulChildrenKey, timestamp, childKey)
        moveParentToFailedIfNeeded(
          parentData['queueKey'],
          parentKey,
          parentData['id'],
          childKey,
          timestamp
        )
      end
    elseif parentData['cpof'] then
      if rcall("SREM", parentDependenciesChildrenKey, childKey) == 1 then
        local parentFailedChildrenKey = parentKey .. ":failed"
        rcall("HSET", parentFailedChildrenKey, childKey, failedReason)
        moveParentToWaitIfNeeded(parentData['queueKey'], parentKey, parentData['id'], timestamp)
      end
    elseif parentData['idof'] or parentData['rdof'] then
      if rcall("SREM", parentDependenciesChildrenKey, childKey) == 1 then
        moveParentToWaitIfNoPendingDependencies(parentData['queueKey'], parentDependenciesChildrenKey,
          parentKey, parentData['id'], timestamp)
        if parentData['idof'] then
          local parentFailedChildrenKey = parentKey .. ":failed"
          rcall("HSET", parentFailedChildrenKey, childKey, failedReason)
        end
      end
    end
  end
end
--[[
  Function to remove deduplication key if needed
  when a job is moved to completed or failed states.
]]
local function removeDeduplicationKeyIfNeededOnFinalization(prefixKey,
  deduplicationId, jobId)
  if deduplicationId then
    local deduplicationKey = prefixKey .. "de:" .. deduplicationId
    local pttl = rcall("PTTL", deduplicationKey)
    if pttl == 0 then
      return rcall("DEL", deduplicationKey)
    end
    if pttl == -1 then
      local currentJobId = rcall('GET', deduplicationKey)
      if currentJobId and currentJobId == jobId then
        return rcall("DEL", deduplicationKey)
      end
    end
  end
end
--[[
  Function to trim events, default 10000.
]]
-- Includes
--[[
  Function to get max events value or set by default 10000.
]]
local function getOrSetMaxEvents(metaKey)
  local maxEvents = rcall("HGET", metaKey, "opts.maxLenEvents")
  if not maxEvents then
    maxEvents = 10000
    rcall("HSET", metaKey, "opts.maxLenEvents", maxEvents)
  end
  return maxEvents
end
local function trimEvents(metaKey, eventStreamKey)
  local maxEvents = getOrSetMaxEvents(metaKey)
  if maxEvents then
    rcall("XTRIM", eventStreamKey, "MAXLEN", "~", maxEvents)
  else
    rcall("XTRIM", eventStreamKey, "MAXLEN", "~", 10000)
  end
end
local stalledKey = KEYS[1]
local waitKey = KEYS[2]
local activeKey = KEYS[3]
local failedKey = KEYS[4]
local stalledCheckKey = KEYS[5]
local metaKey = KEYS[6]
local pausedKey = KEYS[7]
local markerKey = KEYS[8]
local eventStreamKey = KEYS[9]
local maxStalledJobCount = tonumber(ARGV[1])
local queueKeyPrefix = ARGV[2]
local timestamp = ARGV[3]
local maxCheckTime = ARGV[4]
if rcall("EXISTS", stalledCheckKey) == 1 then
    return {{}, {}}
end
rcall("SET", stalledCheckKey, timestamp, "PX", maxCheckTime)
-- Trim events before emiting them to avoid trimming events emitted in this script
trimEvents(metaKey, eventStreamKey)
-- Move all stalled jobs to wait
local stalling = rcall('SMEMBERS', stalledKey)
local stalled = {}
local failed = {}
if (#stalling > 0) then
    rcall('DEL', stalledKey)
    -- Remove from active list
    for i, jobId in ipairs(stalling) do
        -- Markers in waitlist DEPRECATED in v5: Remove in v6.
        if string.sub(jobId, 1, 2) == "0:" then
            -- If the jobId is a delay marker ID we just remove it.
            rcall("LREM", activeKey, 1, jobId)
        else
            local jobKey = queueKeyPrefix .. jobId
            -- Check that the lock is also missing, then we can handle this job as really stalled.
            if (rcall("EXISTS", jobKey .. ":lock") == 0) then
                --  Remove from the active queue.
                local removed = rcall("LREM", activeKey, 1, jobId)
                if (removed > 0) then
                    -- If this job has been stalled too many times, such as if it crashes the worker, then fail it.
                    local stalledCount = rcall("HINCRBY", jobKey, "stc", 1)
                    if (stalledCount > maxStalledJobCount) then
                        local jobAttributes = rcall("HMGET", jobKey, "opts", "parent", "deid")
                        local rawOpts = jobAttributes[1]
                        local rawParentData = jobAttributes[2]
                        local opts = cjson.decode(rawOpts)
                        rcall("ZADD", failedKey, timestamp, jobId)
                        removeDeduplicationKeyIfNeededOnFinalization(queueKeyPrefix, jobAttributes[3], jobId)
                        local failedReason = "job stalled more than allowable limit"
                        rcall("HMSET", jobKey, "failedReason", failedReason, "finishedOn", timestamp)
                        rcall("XADD", eventStreamKey, "*", "event", "failed", "jobId", jobId, 'prev', 'active',
                            'failedReason', failedReason)
                        moveChildFromDependenciesIfNeeded(rawParentData, jobKey, failedReason, timestamp)
                        removeJobsOnFail(queueKeyPrefix, failedKey, jobId, opts, timestamp)
                        table.insert(failed, jobId)
                    else
                        local target, isPausedOrMaxed = getTargetQueueList(metaKey, activeKey, waitKey, pausedKey)
                        -- Move the job back to the wait queue, to immediately be picked up by a waiting worker.
                        addJobInTargetList(target, markerKey, "RPUSH", isPausedOrMaxed, jobId)
                        rcall("XADD", eventStreamKey, "*", "event", "waiting", "jobId", jobId, 'prev', 'active')
                        -- Emit the stalled event
                        rcall("XADD", eventStreamKey, "*", "event", "stalled", "jobId", jobId)
                        table.insert(stalled, jobId)
                    end
                end
            end
        end
    end
end
-- Mark potentially stalled jobs
local active = rcall('LRANGE', activeKey, 0, -1)
if (#active > 0) then
    for from, to in batches(#active, 7000) do
        rcall('SADD', stalledKey, unpack(active, from, to))
    end
end
return {failed, stalled}
`,keys:9},L={name:"moveToActive",content:`--[[
  Move next job to be processed to active, lock it and fetch its data. The job
  may be delayed, in that case we need to move it to the delayed set instead.
  This operation guarantees that the worker owns the job during the lock
  expiration time. The worker is responsible of keeping the lock fresh
  so that no other worker picks this job again.
  Input:
    KEYS[1] wait key
    KEYS[2] active key
    KEYS[3] prioritized key
    KEYS[4] stream events key
    KEYS[5] stalled key
    -- Rate limiting
    KEYS[6] rate limiter key
    KEYS[7] delayed key
    -- Delayed jobs
    KEYS[8] paused key
    KEYS[9] meta key
    KEYS[10] pc priority counter
    -- Marker
    KEYS[11] marker key
    -- Arguments
    ARGV[1] key prefix
    ARGV[2] timestamp
    ARGV[3] opts
    opts - token - lock token
    opts - lockDuration
    opts - limiter
    opts - name - worker name
]]
local rcall = redis.call
local waitKey = KEYS[1]
local activeKey = KEYS[2]
local eventStreamKey = KEYS[4]
local rateLimiterKey = KEYS[6]
local delayedKey = KEYS[7]
local opts = cmsgpack.unpack(ARGV[3])
-- Includes
--[[
  Function to return the next delayed job timestamp.
]]
local function getNextDelayedTimestamp(delayedKey)
  local result = rcall("ZRANGE", delayedKey, 0, 0, "WITHSCORES")
  if #result then
    local nextTimestamp = tonumber(result[2])
    if nextTimestamp ~= nil then
      return nextTimestamp / 0x1000
    end
  end
end
--[[
  Function to get current rate limit ttl.
]]
local function getRateLimitTTL(maxJobs, rateLimiterKey)
  if maxJobs and maxJobs <= tonumber(rcall("GET", rateLimiterKey) or 0) then
    local pttl = rcall("PTTL", rateLimiterKey)
    if pttl == 0 then
      rcall("DEL", rateLimiterKey)
    end
    if pttl > 0 then
      return pttl
    end
  end
  return 0
end
--[[
  Function to check for the meta.paused key to decide if we are paused or not
  (since an empty list and !EXISTS are not really the same).
]]
local function getTargetQueueList(queueMetaKey, activeKey, waitKey, pausedKey)
  local queueAttributes = rcall("HMGET", queueMetaKey, "paused", "concurrency")
  if queueAttributes[1] then
    return pausedKey, true
  else
    if queueAttributes[2] then
      local activeCount = rcall("LLEN", activeKey)
      if activeCount >= tonumber(queueAttributes[2]) then
        return waitKey, true
      else
        return waitKey, false
      end
    end
  end
  return waitKey, false
end
--[[
  Function to move job from prioritized state to active.
]]
local function moveJobFromPriorityToActive(priorityKey, activeKey, priorityCounterKey)
  local prioritizedJob = rcall("ZPOPMIN", priorityKey)
  if #prioritizedJob > 0 then
    rcall("LPUSH", activeKey, prioritizedJob[1])
    return prioritizedJob[1]
  else
    rcall("DEL", priorityCounterKey)
  end
end
--[[
  Function to move job from wait state to active.
  Input:
    opts - token - lock token
    opts - lockDuration
    opts - limiter
]]
-- Includes
--[[
  Add marker if needed when a job is available.
]]
local function addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
  if not isPausedOrMaxed then
    rcall("ZADD", markerKey, 0, "0")
  end  
end
local function prepareJobForProcessing(keyPrefix, rateLimiterKey, eventStreamKey,
    jobId, processedOn, maxJobs, markerKey, opts)
  local jobKey = keyPrefix .. jobId
  -- Check if we need to perform rate limiting.
  if maxJobs then
    local jobCounter = tonumber(rcall("INCR", rateLimiterKey))
    if jobCounter == 1 then
      local limiterDuration = opts['limiter'] and opts['limiter']['duration']
      local integerDuration = math.floor(math.abs(limiterDuration))
      rcall("PEXPIRE", rateLimiterKey, integerDuration)
    end
  end
  local lockKey = jobKey .. ':lock'
  -- get a lock
  if opts['token'] ~= "0" then
    rcall("SET", lockKey, opts['token'], "PX", opts['lockDuration'])
  end
  local optionalValues = {}
  if opts['name'] then
    -- Set "processedBy" field to the worker name
    table.insert(optionalValues, "pb")
    table.insert(optionalValues, opts['name'])
  end
  rcall("XADD", eventStreamKey, "*", "event", "active", "jobId", jobId, "prev", "waiting")
  rcall("HMSET", jobKey, "processedOn", processedOn, unpack(optionalValues))
  rcall("HINCRBY", jobKey, "ats", 1)
  addBaseMarkerIfNeeded(markerKey, false)
  return {rcall("HGETALL", jobKey), jobId, 0, 0} -- get job data
end
--[[
  Updates the delay set, by moving delayed jobs that should
  be processed now to "wait".
     Events:
      'waiting'
]]
-- Includes
--[[
  Function to add job in target list and add marker if needed.
]]
-- Includes
local function addJobInTargetList(targetKey, markerKey, pushCmd, isPausedOrMaxed, jobId)
  rcall(pushCmd, targetKey, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
--[[
  Function to add job considering priority.
]]
-- Includes
--[[
  Function to get priority score.
]]
local function getPriorityScore(priority, priorityCounterKey)
  local prioCounter = rcall("INCR", priorityCounterKey)
  return priority * 0x100000000 + prioCounter % 0x100000000
end
local function addJobWithPriority(markerKey, prioritizedKey, priority, jobId, priorityCounterKey,
  isPausedOrMaxed)
  local score = getPriorityScore(priority, priorityCounterKey)
  rcall("ZADD", prioritizedKey, score, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
-- Try to get as much as 1000 jobs at once
local function promoteDelayedJobs(delayedKey, markerKey, targetKey, prioritizedKey,
                                  eventStreamKey, prefix, timestamp, priorityCounterKey, isPaused)
    local jobs = rcall("ZRANGEBYSCORE", delayedKey, 0, (timestamp + 1) * 0x1000 - 1, "LIMIT", 0, 1000)
    if (#jobs > 0) then
        rcall("ZREM", delayedKey, unpack(jobs))
        for _, jobId in ipairs(jobs) do
            local jobKey = prefix .. jobId
            local priority =
                tonumber(rcall("HGET", jobKey, "priority")) or 0
            if priority == 0 then
                -- LIFO or FIFO
                rcall("LPUSH", targetKey, jobId)
            else
                local score = getPriorityScore(priority, priorityCounterKey)
                rcall("ZADD", prioritizedKey, score, jobId)
            end
            -- Emit waiting event
            rcall("XADD", eventStreamKey, "*", "event", "waiting", "jobId",
                  jobId, "prev", "delayed")
            rcall("HSET", jobKey, "delay", 0)
        end
        addBaseMarkerIfNeeded(markerKey, isPaused)
    end
end
local target, isPausedOrMaxed = getTargetQueueList(KEYS[9], activeKey, waitKey, KEYS[8])
-- Check if there are delayed jobs that we can move to wait.
local markerKey = KEYS[11]
promoteDelayedJobs(delayedKey, markerKey, target, KEYS[3], eventStreamKey, ARGV[1],
                   ARGV[2], KEYS[10], isPausedOrMaxed)
local maxJobs = tonumber(opts['limiter'] and opts['limiter']['max'])
local expireTime = getRateLimitTTL(maxJobs, rateLimiterKey)
-- Check if we are rate limited first.
if expireTime > 0 then return {0, 0, expireTime, 0} end
-- paused or maxed queue
if isPausedOrMaxed then return {0, 0, 0, 0} end
-- no job ID, try non-blocking move from wait to active
local jobId = rcall("RPOPLPUSH", waitKey, activeKey)
-- Markers in waitlist DEPRECATED in v5: Will be completely removed in v6.
if jobId and string.sub(jobId, 1, 2) == "0:" then
    rcall("LREM", activeKey, 1, jobId)
    jobId = rcall("RPOPLPUSH", waitKey, activeKey)
end
if jobId then
    return prepareJobForProcessing(ARGV[1], rateLimiterKey, eventStreamKey, jobId, ARGV[2],
                                   maxJobs, markerKey, opts)
else
    jobId = moveJobFromPriorityToActive(KEYS[3], activeKey, KEYS[10])
    if jobId then
        return prepareJobForProcessing(ARGV[1], rateLimiterKey, eventStreamKey, jobId, ARGV[2],
                                       maxJobs, markerKey, opts)
    end
end
-- Return the timestamp for the next delayed job if any.
local nextTimestamp = getNextDelayedTimestamp(delayedKey)
if nextTimestamp ~= nil then return {0, 0, 0, nextTimestamp} end
return {0, 0, 0, 0}
`,keys:11},F={name:"moveToDelayed",content:`--[[
  Moves job from active to delayed set.
  Input:
    KEYS[1] marker key
    KEYS[2] active key
    KEYS[3] prioritized key
    KEYS[4] delayed key
    KEYS[5] job key
    KEYS[6] events stream
    KEYS[7] meta key
    KEYS[8] stalled key
    ARGV[1] key prefix
    ARGV[2] timestamp
    ARGV[3] the id of the job
    ARGV[4] queue token
    ARGV[5] delay value
    ARGV[6] skip attempt
    ARGV[7] optional job fields to update
  Output:
    0 - OK
   -1 - Missing job.
   -3 - Job not in active set.
  Events:
    - delayed key.
]]
local rcall = redis.call
-- Includes
--[[
  Add delay marker if needed.
]]
-- Includes
--[[
  Function to return the next delayed job timestamp.
]]
local function getNextDelayedTimestamp(delayedKey)
  local result = rcall("ZRANGE", delayedKey, 0, 0, "WITHSCORES")
  if #result then
    local nextTimestamp = tonumber(result[2])
    if nextTimestamp ~= nil then
      return nextTimestamp / 0x1000
    end
  end
end
local function addDelayMarkerIfNeeded(markerKey, delayedKey)
  local nextTimestamp = getNextDelayedTimestamp(delayedKey)
  if nextTimestamp ~= nil then
    -- Replace the score of the marker with the newest known
    -- next timestamp.
    rcall("ZADD", markerKey, nextTimestamp, "1")
  end
end
--[[
  Bake in the job id first 12 bits into the timestamp
  to guarantee correct execution order of delayed jobs
  (up to 4096 jobs per given timestamp or 4096 jobs apart per timestamp)
  WARNING: Jobs that are so far apart that they wrap around will cause FIFO to fail
]]
local function getDelayedScore(delayedKey, timestamp, delay)
  local delayedTimestamp = (delay > 0 and (tonumber(timestamp) + delay)) or tonumber(timestamp)
  local minScore = delayedTimestamp * 0x1000
  local maxScore = (delayedTimestamp + 1 ) * 0x1000 - 1
  local result = rcall("ZREVRANGEBYSCORE", delayedKey, maxScore,
    minScore, "WITHSCORES","LIMIT", 0, 1)
  if #result then
    local currentMaxScore = tonumber(result[2])
    if currentMaxScore ~= nil then
      if currentMaxScore >= maxScore then
        return maxScore, delayedTimestamp
      else
        return currentMaxScore + 1, delayedTimestamp
      end
    end
  end
  return minScore, delayedTimestamp
end
--[[
  Function to get max events value or set by default 10000.
]]
local function getOrSetMaxEvents(metaKey)
  local maxEvents = rcall("HGET", metaKey, "opts.maxLenEvents")
  if not maxEvents then
    maxEvents = 10000
    rcall("HSET", metaKey, "opts.maxLenEvents", maxEvents)
  end
  return maxEvents
end
local function removeLock(jobKey, stalledKey, token, jobId)
  if token ~= "0" then
    local lockKey = jobKey .. ':lock'
    local lockToken = rcall("GET", lockKey)
    if lockToken == token then
      rcall("DEL", lockKey)
      rcall("SREM", stalledKey, jobId)
    else
      if lockToken then
        -- Lock exists but token does not match
        return -6
      else
        -- Lock is missing completely
        return -2
      end
    end
  end
  return 0
end
--[[
  Function to update a bunch of fields in a job.
]]
local function updateJobFields(jobKey, msgpackedFields)
  if msgpackedFields and #msgpackedFields > 0 then
    local fieldsToUpdate = cmsgpack.unpack(msgpackedFields)
    if fieldsToUpdate then
      rcall("HMSET", jobKey, unpack(fieldsToUpdate))
    end
  end
end
local jobKey = KEYS[5]
local metaKey = KEYS[7]
local token = ARGV[4] 
if rcall("EXISTS", jobKey) == 1 then
    local errorCode = removeLock(jobKey, KEYS[8], token, ARGV[3])
    if errorCode < 0 then
        return errorCode
    end
    updateJobFields(jobKey, ARGV[7])
    local delayedKey = KEYS[4]
    local jobId = ARGV[3]
    local delay = tonumber(ARGV[5])
    local score, delayedTimestamp = getDelayedScore(delayedKey, ARGV[2], delay)
    local numRemovedElements = rcall("LREM", KEYS[2], -1, jobId)
    if numRemovedElements < 1 then return -3 end
    if ARGV[6] == "0" then
        rcall("HINCRBY", jobKey, "atm", 1)
    end
    rcall("HSET", jobKey, "delay", ARGV[5])
    local maxEvents = getOrSetMaxEvents(metaKey)
    rcall("ZADD", delayedKey, score, jobId)
    rcall("XADD", KEYS[6], "MAXLEN", "~", maxEvents, "*", "event", "delayed",
          "jobId", jobId, "delay", delayedTimestamp)
    -- Check if we need to push a marker job to wake up sleeping workers.
    local markerKey = KEYS[1]
    addDelayMarkerIfNeeded(markerKey, delayedKey)
    return 0
else
    return -1
end
`,keys:8},_={name:"moveToFinished",content:`--[[
  Move job from active to a finished status (completed o failed)
  A job can only be moved to completed if it was active.
  The job must be locked before it can be moved to a finished status,
  and the lock must be released in this script.
    Input:
      KEYS[1] wait key
      KEYS[2] active key
      KEYS[3] prioritized key
      KEYS[4] event stream key
      KEYS[5] stalled key
      -- Rate limiting
      KEYS[6] rate limiter key
      KEYS[7] delayed key
      KEYS[8] paused key
      KEYS[9] meta key
      KEYS[10] pc priority counter
      KEYS[11] completed/failed key
      KEYS[12] jobId key
      KEYS[13] metrics key
      KEYS[14] marker key
      ARGV[1]  jobId
      ARGV[2]  timestamp
      ARGV[3]  msg property returnvalue / failedReason
      ARGV[4]  return value / failed reason
      ARGV[5]  target (completed/failed)
      ARGV[6]  fetch next?
      ARGV[7]  keys prefix
      ARGV[8]  opts
      ARGV[9]  job fields to update
      opts - token - lock token
      opts - keepJobs
      opts - lockDuration - lock duration in milliseconds
      opts - attempts max attempts
      opts - maxMetricsSize
      opts - fpof - fail parent on fail
      opts - cpof - continue parent on fail
      opts - idof - ignore dependency on fail
      opts - rdof - remove dependency on fail
      opts - name - worker name
    Output:
      0 OK
      -1 Missing key.
      -2 Missing lock.
      -3 Job not in active set
      -4 Job has pending dependencies
      -6 Lock is not owned by this client
    Events:
      'completed/failed'
]]
local rcall = redis.call
--- Includes
--[[
  Functions to collect metrics based on a current and previous count of jobs.
  Granualarity is fixed at 1 minute.
]] 
--[[
  Function to loop in batches.
  Just a bit of warning, some commands as ZREM
  could receive a maximum of 7000 parameters per call.
]]
local function batches(n, batchSize)
  local i = 0
  return function()
    local from = i * batchSize + 1
    i = i + 1
    if (from <= n) then
      local to = math.min(from + batchSize - 1, n)
      return from, to
    end
  end
end
local function collectMetrics(metaKey, dataPointsList, maxDataPoints,
                                 timestamp)
    -- Increment current count
    local count = rcall("HINCRBY", metaKey, "count", 1) - 1
    -- Compute how many data points we need to add to the list, N.
    local prevTS = rcall("HGET", metaKey, "prevTS")
    if not prevTS then
        -- If prevTS is nil, set it to the current timestamp
        rcall("HSET", metaKey, "prevTS", timestamp, "prevCount", 0)
        return
    end
    local N = math.min(math.floor(timestamp / 60000) - math.floor(prevTS / 60000), tonumber(maxDataPoints))
    if N > 0 then
        local delta = count - rcall("HGET", metaKey, "prevCount")
        -- If N > 1, add N-1 zeros to the list
        if N > 1 then
            local points = {}
            points[1] = delta
            for i = 2, N do
                points[i] = 0
            end
            for from, to in batches(#points, 7000) do
                rcall("LPUSH", dataPointsList, unpack(points, from, to))
            end
        else
            -- LPUSH delta to the list
            rcall("LPUSH", dataPointsList, delta)
        end
        -- LTRIM to keep list to its max size
        rcall("LTRIM", dataPointsList, 0, maxDataPoints - 1)
        -- update prev count with current count
        rcall("HSET", metaKey, "prevCount", count, "prevTS", timestamp)
    end
end
--[[
  Function to return the next delayed job timestamp.
]]
local function getNextDelayedTimestamp(delayedKey)
  local result = rcall("ZRANGE", delayedKey, 0, 0, "WITHSCORES")
  if #result then
    local nextTimestamp = tonumber(result[2])
    if nextTimestamp ~= nil then
      return nextTimestamp / 0x1000
    end
  end
end
--[[
  Function to get current rate limit ttl.
]]
local function getRateLimitTTL(maxJobs, rateLimiterKey)
  if maxJobs and maxJobs <= tonumber(rcall("GET", rateLimiterKey) or 0) then
    local pttl = rcall("PTTL", rateLimiterKey)
    if pttl == 0 then
      rcall("DEL", rateLimiterKey)
    end
    if pttl > 0 then
      return pttl
    end
  end
  return 0
end
--[[
  Function to check for the meta.paused key to decide if we are paused or not
  (since an empty list and !EXISTS are not really the same).
]]
local function getTargetQueueList(queueMetaKey, activeKey, waitKey, pausedKey)
  local queueAttributes = rcall("HMGET", queueMetaKey, "paused", "concurrency")
  if queueAttributes[1] then
    return pausedKey, true
  else
    if queueAttributes[2] then
      local activeCount = rcall("LLEN", activeKey)
      if activeCount >= tonumber(queueAttributes[2]) then
        return waitKey, true
      else
        return waitKey, false
      end
    end
  end
  return waitKey, false
end
--[[
  Function to move job from prioritized state to active.
]]
local function moveJobFromPriorityToActive(priorityKey, activeKey, priorityCounterKey)
  local prioritizedJob = rcall("ZPOPMIN", priorityKey)
  if #prioritizedJob > 0 then
    rcall("LPUSH", activeKey, prioritizedJob[1])
    return prioritizedJob[1]
  else
    rcall("DEL", priorityCounterKey)
  end
end
--[[
  Function to recursively move from waitingChildren to failed.
]]
-- Includes
--[[
  Validate and move parent to a wait status (waiting, delayed or prioritized)
  if no pending dependencies.
]]
-- Includes
--[[
  Validate and move parent to a wait status (waiting, delayed or prioritized) if needed.
]]
-- Includes
--[[
  Move parent to a wait status (wait, prioritized or delayed)
]]
-- Includes
--[[
  Add delay marker if needed.
]]
-- Includes
local function addDelayMarkerIfNeeded(markerKey, delayedKey)
  local nextTimestamp = getNextDelayedTimestamp(delayedKey)
  if nextTimestamp ~= nil then
    -- Replace the score of the marker with the newest known
    -- next timestamp.
    rcall("ZADD", markerKey, nextTimestamp, "1")
  end
end
--[[
  Function to add job in target list and add marker if needed.
]]
-- Includes
--[[
  Add marker if needed when a job is available.
]]
local function addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
  if not isPausedOrMaxed then
    rcall("ZADD", markerKey, 0, "0")
  end  
end
local function addJobInTargetList(targetKey, markerKey, pushCmd, isPausedOrMaxed, jobId)
  rcall(pushCmd, targetKey, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
--[[
  Function to add job considering priority.
]]
-- Includes
--[[
  Function to get priority score.
]]
local function getPriorityScore(priority, priorityCounterKey)
  local prioCounter = rcall("INCR", priorityCounterKey)
  return priority * 0x100000000 + prioCounter % 0x100000000
end
local function addJobWithPriority(markerKey, prioritizedKey, priority, jobId, priorityCounterKey,
  isPausedOrMaxed)
  local score = getPriorityScore(priority, priorityCounterKey)
  rcall("ZADD", prioritizedKey, score, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
--[[
  Function to check if queue is paused or maxed
  (since an empty list and !EXISTS are not really the same).
]]
local function isQueuePausedOrMaxed(queueMetaKey, activeKey)
  local queueAttributes = rcall("HMGET", queueMetaKey, "paused", "concurrency")
  if queueAttributes[1] then
    return true
  else
    if queueAttributes[2] then
      local activeCount = rcall("LLEN", activeKey)
      return activeCount >= tonumber(queueAttributes[2])
    end
  end
  return false
end
local function moveParentToWait(parentQueueKey, parentKey, parentId, timestamp)
    local parentWaitKey = parentQueueKey .. ":wait"
    local parentPausedKey = parentQueueKey .. ":paused"
    local parentActiveKey = parentQueueKey .. ":active"
    local parentMetaKey = parentQueueKey .. ":meta"
    local parentMarkerKey = parentQueueKey .. ":marker"
    local jobAttributes = rcall("HMGET", parentKey, "priority", "delay")
    local priority = tonumber(jobAttributes[1]) or 0
    local delay = tonumber(jobAttributes[2]) or 0
    -- ignore dependencies if any left
    rcall("HSET", parentKey, "igdp", 1)
    if delay > 0 then
        local delayedTimestamp = tonumber(timestamp) + delay
        local score = delayedTimestamp * 0x1000
        local parentDelayedKey = parentQueueKey .. ":delayed"
        rcall("ZADD", parentDelayedKey, score, parentId)
        rcall("XADD", parentQueueKey .. ":events", "*", "event", "delayed", "jobId", parentId, "delay",
            delayedTimestamp)
        addDelayMarkerIfNeeded(parentMarkerKey, parentDelayedKey)
    else
        if priority == 0 then
            local parentTarget, isParentPausedOrMaxed = getTargetQueueList(parentMetaKey, parentActiveKey,
                parentWaitKey, parentPausedKey)
            addJobInTargetList(parentTarget, parentMarkerKey, "RPUSH", isParentPausedOrMaxed, parentId)
        else
            local isPausedOrMaxed = isQueuePausedOrMaxed(parentMetaKey, parentActiveKey)
            addJobWithPriority(parentMarkerKey, parentQueueKey .. ":prioritized", priority, parentId,
                parentQueueKey .. ":pc", isPausedOrMaxed)
        end
        rcall("XADD", parentQueueKey .. ":events", "*", "event", "waiting", "jobId", parentId, "prev",
            "waiting-children")
    end
end
local function moveParentToWaitIfNeeded(parentQueueKey, parentKey, parentId, timestamp)
  if rcall("EXISTS", parentKey) == 1 then
    local parentWaitingChildrenKey = parentQueueKey .. ":waiting-children"
    if rcall("ZSCORE", parentWaitingChildrenKey, parentId) then    
      rcall("ZREM", parentWaitingChildrenKey, parentId)
      moveParentToWait(parentQueueKey, parentKey, parentId, timestamp)
    end
  end
end
local function moveParentToWaitIfNoPendingDependencies(parentQueueKey, parentDependenciesKey, parentKey,
  parentId, timestamp)
  local doNotHavePendingDependencies = rcall("SCARD", parentDependenciesKey) == 0
  if doNotHavePendingDependencies then
    moveParentToWaitIfNeeded(parentQueueKey, parentKey, parentId, timestamp)
  end
end
--[[
  Functions to remove jobs when removeOnFail option is provided.
]]
-- Includes
--[[
  Function to remove job.
]]
-- Includes
--[[
  Function to remove deduplication key if needed
  when a job is being removed.
]]
local function removeDeduplicationKeyIfNeededOnRemoval(prefixKey,
  jobKey, jobId)
  local deduplicationId = rcall("HGET", jobKey, "deid")
  if deduplicationId then
    local deduplicationKey = prefixKey .. "de:" .. deduplicationId
    local currentJobId = rcall('GET', deduplicationKey)
    if currentJobId and currentJobId == jobId then
      return rcall("DEL", deduplicationKey)
    end
  end
end
--[[
  Function to remove job keys.
]]
local function removeJobKeys(jobKey)
  return rcall("DEL", jobKey, jobKey .. ':logs', jobKey .. ':dependencies',
    jobKey .. ':processed', jobKey .. ':failed', jobKey .. ':unsuccessful')
end
--[[
  Check if this job has a parent. If so we will just remove it from
  the parent child list, but if it is the last child we should move the parent to "wait/paused"
  which requires code from "moveToFinished"
]]
-- Includes
--[[
  Functions to destructure job key.
  Just a bit of warning, these functions may be a bit slow and affect performance significantly.
]]
local getJobIdFromKey = function (jobKey)
  return string.match(jobKey, ".*:(.*)")
end
local getJobKeyPrefix = function (jobKey, jobId)
  return string.sub(jobKey, 0, #jobKey - #jobId)
end
local function _moveParentToWait(parentPrefix, parentId, emitEvent)
  local parentTarget, isPausedOrMaxed = getTargetQueueList(parentPrefix .. "meta", parentPrefix .. "active",
    parentPrefix .. "wait", parentPrefix .. "paused")
  addJobInTargetList(parentTarget, parentPrefix .. "marker", "RPUSH", isPausedOrMaxed, parentId)
  if emitEvent then
    local parentEventStream = parentPrefix .. "events"
    rcall("XADD", parentEventStream, "*", "event", "waiting", "jobId", parentId, "prev", "waiting-children")
  end
end
local function removeParentDependencyKey(jobKey, hard, parentKey, baseKey, debounceId)
  if parentKey then
    local parentDependenciesKey = parentKey .. ":dependencies"
    local result = rcall("SREM", parentDependenciesKey, jobKey)
    if result > 0 then
      local pendingDependencies = rcall("SCARD", parentDependenciesKey)
      if pendingDependencies == 0 then
        local parentId = getJobIdFromKey(parentKey)
        local parentPrefix = getJobKeyPrefix(parentKey, parentId)
        local numRemovedElements = rcall("ZREM", parentPrefix .. "waiting-children", parentId)
        if numRemovedElements == 1 then
          if hard then -- remove parent in same queue
            if parentPrefix == baseKey then
              removeParentDependencyKey(parentKey, hard, nil, baseKey, nil)
              removeJobKeys(parentKey)
              if debounceId then
                rcall("DEL", parentPrefix .. "de:" .. debounceId)
              end
            else
              _moveParentToWait(parentPrefix, parentId)
            end
          else
            _moveParentToWait(parentPrefix, parentId, true)
          end
        end
      end
      return true
    end
  else
    local parentAttributes = rcall("HMGET", jobKey, "parentKey", "deid")
    local missedParentKey = parentAttributes[1]
    if( (type(missedParentKey) == "string") and missedParentKey ~= ""
      and (rcall("EXISTS", missedParentKey) == 1)) then
      local parentDependenciesKey = missedParentKey .. ":dependencies"
      local result = rcall("SREM", parentDependenciesKey, jobKey)
      if result > 0 then
        local pendingDependencies = rcall("SCARD", parentDependenciesKey)
        if pendingDependencies == 0 then
          local parentId = getJobIdFromKey(missedParentKey)
          local parentPrefix = getJobKeyPrefix(missedParentKey, parentId)
          local numRemovedElements = rcall("ZREM", parentPrefix .. "waiting-children", parentId)
          if numRemovedElements == 1 then
            if hard then
              if parentPrefix == baseKey then
                removeParentDependencyKey(missedParentKey, hard, nil, baseKey, nil)
                removeJobKeys(missedParentKey)
                if parentAttributes[2] then
                  rcall("DEL", parentPrefix .. "de:" .. parentAttributes[2])
                end
              else
                _moveParentToWait(parentPrefix, parentId)
              end
            else
              _moveParentToWait(parentPrefix, parentId, true)
            end
          end
        end
        return true
      end
    end
  end
  return false
end
local function removeJob(jobId, hard, baseKey, shouldRemoveDeduplicationKey)
  local jobKey = baseKey .. jobId
  removeParentDependencyKey(jobKey, hard, nil, baseKey)
  if shouldRemoveDeduplicationKey then
    removeDeduplicationKeyIfNeededOnRemoval(baseKey, jobKey, jobId)
  end
  removeJobKeys(jobKey)
end
--[[
  Functions to remove jobs by max age.
]]
-- Includes
local function removeJobsByMaxAge(timestamp, maxAge, targetSet, prefix,
  shouldRemoveDebounceKey)
  local start = timestamp - maxAge * 1000
  local jobIds = rcall("ZREVRANGEBYSCORE", targetSet, start, "-inf")
  for i, jobId in ipairs(jobIds) do
    removeJob(jobId, false, prefix, false --[[remove debounce key]])
  end
  rcall("ZREMRANGEBYSCORE", targetSet, "-inf", start)
end
--[[
  Functions to remove jobs by max count.
]]
-- Includes
local function removeJobsByMaxCount(maxCount, targetSet, prefix)
  local start = maxCount
  local jobIds = rcall("ZREVRANGE", targetSet, start, -1)
  for i, jobId in ipairs(jobIds) do
    removeJob(jobId, false, prefix, false --[[remove debounce key]])
  end
  rcall("ZREMRANGEBYRANK", targetSet, 0, -(maxCount + 1))
end
local function removeJobsOnFail(queueKeyPrefix, failedKey, jobId, opts, timestamp)
  local removeOnFailType = type(opts["removeOnFail"])
  if removeOnFailType == "number" then
    removeJobsByMaxCount(opts["removeOnFail"],
                        failedKey, queueKeyPrefix)
  elseif removeOnFailType == "boolean" then
    if opts["removeOnFail"] then
      removeJob(jobId, false, queueKeyPrefix,
                false --[[remove debounce key]])
      rcall("ZREM", failedKey, jobId)
    end
  elseif removeOnFailType ~= "nil" then
    local maxAge = opts["removeOnFail"]["age"]
    local maxCount = opts["removeOnFail"]["count"]
    if maxAge ~= nil then
      removeJobsByMaxAge(timestamp, maxAge,
                        failedKey, queueKeyPrefix)
    end
    if maxCount ~= nil and maxCount > 0 then
      removeJobsByMaxCount(maxCount, failedKey,
                            queueKeyPrefix)
    end
  end 
end
local moveParentToFailedIfNeeded
local moveChildFromDependenciesIfNeeded
moveParentToFailedIfNeeded = function (parentQueueKey, parentKey, parentId, jobIdKey, timestamp)
  if rcall("EXISTS", parentKey) == 1 then
    local parentWaitingChildrenKey = parentQueueKey .. ":waiting-children"
    local parentDelayedKey = parentQueueKey .. ":delayed"
    local parentPrioritizedKey = parentQueueKey .. ":prioritized"
    local parentWaitingChildrenOrDelayedKey
    local prevState
    if rcall("ZSCORE", parentWaitingChildrenKey, parentId) then
      parentWaitingChildrenOrDelayedKey = parentWaitingChildrenKey
      prevState = "waiting-children"
    elseif rcall("ZSCORE", parentDelayedKey, parentId) then
      parentWaitingChildrenOrDelayedKey = parentDelayedKey
      prevState = "delayed"
      rcall("HSET", parentKey, "delay", 0)
    end
    if parentWaitingChildrenOrDelayedKey then
      rcall("ZREM", parentWaitingChildrenOrDelayedKey, parentId)
      local parentQueuePrefix = parentQueueKey .. ":"
      local parentFailedKey = parentQueueKey .. ":failed"
      local deferredFailure = "child " .. jobIdKey .. " failed"
      rcall("HSET", parentKey, "defa", deferredFailure)
      moveParentToWait(parentQueueKey, parentKey, parentId, timestamp)
    else
      if not rcall("ZSCORE", parentQueueKey .. ":failed", parentId) then
        local deferredFailure = "child " .. jobIdKey .. " failed"
        rcall("HSET", parentKey, "defa", deferredFailure)
      end
    end
  end
end
moveChildFromDependenciesIfNeeded = function (rawParentData, childKey, failedReason, timestamp)
  if rawParentData then
    local parentData = cjson.decode(rawParentData)
    local parentKey = parentData['queueKey'] .. ':' .. parentData['id']
    local parentDependenciesChildrenKey = parentKey .. ":dependencies"
    if parentData['fpof'] then
      if rcall("SREM", parentDependenciesChildrenKey, childKey) == 1 then
        local parentUnsuccesssfulChildrenKey = parentKey .. ":unsuccessful"
        rcall("ZADD", parentUnsuccesssfulChildrenKey, timestamp, childKey)
        moveParentToFailedIfNeeded(
          parentData['queueKey'],
          parentKey,
          parentData['id'],
          childKey,
          timestamp
        )
      end
    elseif parentData['cpof'] then
      if rcall("SREM", parentDependenciesChildrenKey, childKey) == 1 then
        local parentFailedChildrenKey = parentKey .. ":failed"
        rcall("HSET", parentFailedChildrenKey, childKey, failedReason)
        moveParentToWaitIfNeeded(parentData['queueKey'], parentKey, parentData['id'], timestamp)
      end
    elseif parentData['idof'] or parentData['rdof'] then
      if rcall("SREM", parentDependenciesChildrenKey, childKey) == 1 then
        moveParentToWaitIfNoPendingDependencies(parentData['queueKey'], parentDependenciesChildrenKey,
          parentKey, parentData['id'], timestamp)
        if parentData['idof'] then
          local parentFailedChildrenKey = parentKey .. ":failed"
          rcall("HSET", parentFailedChildrenKey, childKey, failedReason)
        end
      end
    end
  end
end
--[[
  Function to move job from wait state to active.
  Input:
    opts - token - lock token
    opts - lockDuration
    opts - limiter
]]
-- Includes
local function prepareJobForProcessing(keyPrefix, rateLimiterKey, eventStreamKey,
    jobId, processedOn, maxJobs, markerKey, opts)
  local jobKey = keyPrefix .. jobId
  -- Check if we need to perform rate limiting.
  if maxJobs then
    local jobCounter = tonumber(rcall("INCR", rateLimiterKey))
    if jobCounter == 1 then
      local limiterDuration = opts['limiter'] and opts['limiter']['duration']
      local integerDuration = math.floor(math.abs(limiterDuration))
      rcall("PEXPIRE", rateLimiterKey, integerDuration)
    end
  end
  local lockKey = jobKey .. ':lock'
  -- get a lock
  if opts['token'] ~= "0" then
    rcall("SET", lockKey, opts['token'], "PX", opts['lockDuration'])
  end
  local optionalValues = {}
  if opts['name'] then
    -- Set "processedBy" field to the worker name
    table.insert(optionalValues, "pb")
    table.insert(optionalValues, opts['name'])
  end
  rcall("XADD", eventStreamKey, "*", "event", "active", "jobId", jobId, "prev", "waiting")
  rcall("HMSET", jobKey, "processedOn", processedOn, unpack(optionalValues))
  rcall("HINCRBY", jobKey, "ats", 1)
  addBaseMarkerIfNeeded(markerKey, false)
  return {rcall("HGETALL", jobKey), jobId, 0, 0} -- get job data
end
--[[
  Updates the delay set, by moving delayed jobs that should
  be processed now to "wait".
     Events:
      'waiting'
]]
-- Includes
-- Try to get as much as 1000 jobs at once
local function promoteDelayedJobs(delayedKey, markerKey, targetKey, prioritizedKey,
                                  eventStreamKey, prefix, timestamp, priorityCounterKey, isPaused)
    local jobs = rcall("ZRANGEBYSCORE", delayedKey, 0, (timestamp + 1) * 0x1000 - 1, "LIMIT", 0, 1000)
    if (#jobs > 0) then
        rcall("ZREM", delayedKey, unpack(jobs))
        for _, jobId in ipairs(jobs) do
            local jobKey = prefix .. jobId
            local priority =
                tonumber(rcall("HGET", jobKey, "priority")) or 0
            if priority == 0 then
                -- LIFO or FIFO
                rcall("LPUSH", targetKey, jobId)
            else
                local score = getPriorityScore(priority, priorityCounterKey)
                rcall("ZADD", prioritizedKey, score, jobId)
            end
            -- Emit waiting event
            rcall("XADD", eventStreamKey, "*", "event", "waiting", "jobId",
                  jobId, "prev", "delayed")
            rcall("HSET", jobKey, "delay", 0)
        end
        addBaseMarkerIfNeeded(markerKey, isPaused)
    end
end
--[[
  Function to remove deduplication key if needed
  when a job is moved to completed or failed states.
]]
local function removeDeduplicationKeyIfNeededOnFinalization(prefixKey,
  deduplicationId, jobId)
  if deduplicationId then
    local deduplicationKey = prefixKey .. "de:" .. deduplicationId
    local pttl = rcall("PTTL", deduplicationKey)
    if pttl == 0 then
      return rcall("DEL", deduplicationKey)
    end
    if pttl == -1 then
      local currentJobId = rcall('GET', deduplicationKey)
      if currentJobId and currentJobId == jobId then
        return rcall("DEL", deduplicationKey)
      end
    end
  end
end
local function removeLock(jobKey, stalledKey, token, jobId)
  if token ~= "0" then
    local lockKey = jobKey .. ':lock'
    local lockToken = rcall("GET", lockKey)
    if lockToken == token then
      rcall("DEL", lockKey)
      rcall("SREM", stalledKey, jobId)
    else
      if lockToken then
        -- Lock exists but token does not match
        return -6
      else
        -- Lock is missing completely
        return -2
      end
    end
  end
  return 0
end
--[[
  Function to trim events, default 10000.
]]
-- Includes
--[[
  Function to get max events value or set by default 10000.
]]
local function getOrSetMaxEvents(metaKey)
  local maxEvents = rcall("HGET", metaKey, "opts.maxLenEvents")
  if not maxEvents then
    maxEvents = 10000
    rcall("HSET", metaKey, "opts.maxLenEvents", maxEvents)
  end
  return maxEvents
end
local function trimEvents(metaKey, eventStreamKey)
  local maxEvents = getOrSetMaxEvents(metaKey)
  if maxEvents then
    rcall("XTRIM", eventStreamKey, "MAXLEN", "~", maxEvents)
  else
    rcall("XTRIM", eventStreamKey, "MAXLEN", "~", 10000)
  end
end
--[[
  Validate and move or add dependencies to parent.
]]
-- Includes
local function updateParentDepsIfNeeded(parentKey, parentQueueKey, parentDependenciesKey,
  parentId, jobIdKey, returnvalue, timestamp )
  local processedSet = parentKey .. ":processed"
  rcall("HSET", processedSet, jobIdKey, returnvalue)
  moveParentToWaitIfNoPendingDependencies(parentQueueKey, parentDependenciesKey, parentKey, parentId, timestamp)
end
--[[
  Function to update a bunch of fields in a job.
]]
local function updateJobFields(jobKey, msgpackedFields)
  if msgpackedFields and #msgpackedFields > 0 then
    local fieldsToUpdate = cmsgpack.unpack(msgpackedFields)
    if fieldsToUpdate then
      rcall("HMSET", jobKey, unpack(fieldsToUpdate))
    end
  end
end
local jobIdKey = KEYS[12]
if rcall("EXISTS", jobIdKey) == 1 then -- Make sure job exists
    -- Make sure it does not have pending dependencies
    -- It must happen before removing lock
    if ARGV[5] == "completed" and
        not rcall("HGET", jobIdKey, "igdp") and -- check if we should ignore this check
        rcall("SCARD", jobIdKey .. ":dependencies") ~= 0 then
        return -4
    end
    local opts = cmsgpack.unpack(ARGV[8])
    local token = opts['token']
    local errorCode = removeLock(jobIdKey, KEYS[5], token, ARGV[1])
    if errorCode < 0 then
        return errorCode
    end
    updateJobFields(jobIdKey, ARGV[9]);
    local attempts = opts['attempts']
    local maxMetricsSize = opts['maxMetricsSize']
    local maxCount = opts['keepJobs']['count']
    local maxAge = opts['keepJobs']['age']
    local jobAttributes = rcall("HMGET", jobIdKey, "parentKey", "parent", "deid")
    local parentKey = jobAttributes[1] or ""
    local parentId = ""
    local parentQueueKey = ""
    if jobAttributes[2] then -- TODO: need to revisit this logic if it's still needed
        local jsonDecodedParent = cjson.decode(jobAttributes[2])
        parentId = jsonDecodedParent['id']
        parentQueueKey = jsonDecodedParent['queueKey']
    end
    local jobId = ARGV[1]
    local timestamp = ARGV[2]
    -- Remove from active list (if not active we shall return error)
    local numRemovedElements = rcall("LREM", KEYS[2], -1, jobId)
    if (numRemovedElements < 1) then
        return -3
    end
    local eventStreamKey = KEYS[4]
    local metaKey = KEYS[9]
    -- Trim events before emiting them to avoid trimming events emitted in this script
    trimEvents(metaKey, eventStreamKey)
    local prefix = ARGV[7]
    removeDeduplicationKeyIfNeededOnFinalization(prefix, jobAttributes[3], jobId)
    -- If job has a parent we need to
    -- 1) remove this job id from parents dependencies
    -- 2) move the job Id to parent "processed" set
    -- 3) push the results into parent "results" list
    -- 4) if parent's dependencies is empty, then move parent to "wait/paused". Note it may be a different queue!.
    if parentId == "" and parentKey ~= "" then
        parentId = getJobIdFromKey(parentKey)
        parentQueueKey = getJobKeyPrefix(parentKey, ":" .. parentId)
    end
    if parentId ~= "" then
        if ARGV[5] == "completed" then
            local dependenciesSet = parentKey .. ":dependencies"
            if rcall("SREM", dependenciesSet, jobIdKey) == 1 then
                updateParentDepsIfNeeded(parentKey, parentQueueKey, dependenciesSet, parentId, jobIdKey, ARGV[4],
                    timestamp)
            end
        else
            moveChildFromDependenciesIfNeeded(jobAttributes[2], jobIdKey, ARGV[4], timestamp)
        end
    end
    local attemptsMade = rcall("HINCRBY", jobIdKey, "atm", 1)
    -- Remove job?
    if maxCount ~= 0 then
        local targetSet = KEYS[11]
        -- Add to complete/failed set
        rcall("ZADD", targetSet, timestamp, jobId)
        rcall("HSET", jobIdKey, ARGV[3], ARGV[4], "finishedOn", timestamp)
        -- "returnvalue" / "failedReason" and "finishedOn"
        if ARGV[5] == "failed" then
            rcall("HDEL", jobIdKey, "defa")
        end
        -- Remove old jobs?
        if maxAge ~= nil then
            removeJobsByMaxAge(timestamp, maxAge, targetSet, prefix)
        end
        if maxCount ~= nil and maxCount > 0 then
            removeJobsByMaxCount(maxCount, targetSet, prefix)
        end
    else
        removeJobKeys(jobIdKey)
        if parentKey ~= "" then
            -- TODO: when a child is removed when finished, result or failure in parent
            -- must not be deleted, those value references should be deleted when the parent
            -- is deleted
            removeParentDependencyKey(jobIdKey, false, parentKey, jobAttributes[3])
        end
    end
    rcall("XADD", eventStreamKey, "*", "event", ARGV[5], "jobId", jobId, ARGV[3], ARGV[4], "prev", "active")
    if ARGV[5] == "failed" then
        if tonumber(attemptsMade) >= tonumber(attempts) then
            rcall("XADD", eventStreamKey, "*", "event", "retries-exhausted", "jobId", jobId, "attemptsMade",
                attemptsMade)
        end
    end
    -- Collect metrics
    if maxMetricsSize ~= "" then
        collectMetrics(KEYS[13], KEYS[13] .. ':data', maxMetricsSize, timestamp)
    end
    -- Try to get next job to avoid an extra roundtrip if the queue is not closing,
    -- and not rate limited.
    if (ARGV[6] == "1") then
        local target, isPausedOrMaxed = getTargetQueueList(metaKey, KEYS[2], KEYS[1], KEYS[8])
        local markerKey = KEYS[14]
        -- Check if there are delayed jobs that can be promoted
        promoteDelayedJobs(KEYS[7], markerKey, target, KEYS[3], eventStreamKey, prefix, timestamp, KEYS[10],
            isPausedOrMaxed)
        local maxJobs = tonumber(opts['limiter'] and opts['limiter']['max'])
        -- Check if we are rate limited first.
        local expireTime = getRateLimitTTL(maxJobs, KEYS[6])
        if expireTime > 0 then
            return {0, 0, expireTime, 0}
        end
        -- paused or maxed queue
        if isPausedOrMaxed then
            return {0, 0, 0, 0}
        end
        jobId = rcall("RPOPLPUSH", KEYS[1], KEYS[2])
        if jobId then
            -- Markers in waitlist DEPRECATED in v5: Remove in v6.
            if string.sub(jobId, 1, 2) == "0:" then
                rcall("LREM", KEYS[2], 1, jobId)
                -- If jobId is special ID 0:delay (delay greater than 0), then there is no job to process
                -- but if ID is 0:0, then there is at least 1 prioritized job to process
                if jobId == "0:0" then
                    jobId = moveJobFromPriorityToActive(KEYS[3], KEYS[2], KEYS[10])
                    return prepareJobForProcessing(prefix, KEYS[6], eventStreamKey, jobId, timestamp, maxJobs,
                        markerKey, opts)
                end
            else
                return prepareJobForProcessing(prefix, KEYS[6], eventStreamKey, jobId, timestamp, maxJobs, markerKey,
                    opts)
            end
        else
            jobId = moveJobFromPriorityToActive(KEYS[3], KEYS[2], KEYS[10])
            if jobId then
                return prepareJobForProcessing(prefix, KEYS[6], eventStreamKey, jobId, timestamp, maxJobs, markerKey,
                    opts)
            end
        end
        -- Return the timestamp for the next delayed job if any.
        local nextTimestamp = getNextDelayedTimestamp(KEYS[7])
        if nextTimestamp ~= nil then
            -- The result is guaranteed to be positive, since the
            -- ZRANGEBYSCORE command would have return a job otherwise.
            return {0, 0, 0, nextTimestamp}
        end
    end
    local waitLen = rcall("LLEN", KEYS[1])
    if waitLen == 0 then
        local activeLen = rcall("LLEN", KEYS[2])
        if activeLen == 0 then
            local prioritizedLen = rcall("ZCARD", KEYS[3])
            if prioritizedLen == 0 then
                rcall("XADD", eventStreamKey, "*", "event", "drained")
            end
        end
    end
    return 0
else
    return -1
end
`,keys:14},V={name:"moveToWaitingChildren",content:`--[[
  Moves job from active to waiting children set.
  Input:
    KEYS[1] active key
    KEYS[2] wait-children key
    KEYS[3] job key
    KEYS[4] job dependencies key
    KEYS[5] job unsuccessful key
    KEYS[6] stalled key
    KEYS[7] failed key
    KEYS[8] events key
    ARGV[1] token
    ARGV[2] child key
    ARGV[3] timestamp
    ARGV[4] jobId
    ARGV[5] prefix
  Output:
    0 - OK
    1 - There are not pending dependencies.
   -1 - Missing job.
   -2 - Missing lock
   -3 - Job not in active set
]]
local rcall = redis.call
local activeKey = KEYS[1]
local waitingChildrenKey = KEYS[2]
local jobKey = KEYS[3]
local jobDependenciesKey = KEYS[4]
local jobUnsuccessfulKey = KEYS[5]
local stalledKey = KEYS[6]
local failedKey = KEYS[7]
local timestamp = ARGV[3]
local jobId = ARGV[4]
--- Includes
--[[
  Function to recursively move from waitingChildren to failed.
]]
-- Includes
--[[
  Validate and move parent to a wait status (waiting, delayed or prioritized)
  if no pending dependencies.
]]
-- Includes
--[[
  Validate and move parent to a wait status (waiting, delayed or prioritized) if needed.
]]
-- Includes
--[[
  Move parent to a wait status (wait, prioritized or delayed)
]]
-- Includes
--[[
  Add delay marker if needed.
]]
-- Includes
--[[
  Function to return the next delayed job timestamp.
]]
local function getNextDelayedTimestamp(delayedKey)
  local result = rcall("ZRANGE", delayedKey, 0, 0, "WITHSCORES")
  if #result then
    local nextTimestamp = tonumber(result[2])
    if nextTimestamp ~= nil then
      return nextTimestamp / 0x1000
    end
  end
end
local function addDelayMarkerIfNeeded(markerKey, delayedKey)
  local nextTimestamp = getNextDelayedTimestamp(delayedKey)
  if nextTimestamp ~= nil then
    -- Replace the score of the marker with the newest known
    -- next timestamp.
    rcall("ZADD", markerKey, nextTimestamp, "1")
  end
end
--[[
  Function to add job in target list and add marker if needed.
]]
-- Includes
--[[
  Add marker if needed when a job is available.
]]
local function addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
  if not isPausedOrMaxed then
    rcall("ZADD", markerKey, 0, "0")
  end  
end
local function addJobInTargetList(targetKey, markerKey, pushCmd, isPausedOrMaxed, jobId)
  rcall(pushCmd, targetKey, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
--[[
  Function to add job considering priority.
]]
-- Includes
--[[
  Function to get priority score.
]]
local function getPriorityScore(priority, priorityCounterKey)
  local prioCounter = rcall("INCR", priorityCounterKey)
  return priority * 0x100000000 + prioCounter % 0x100000000
end
local function addJobWithPriority(markerKey, prioritizedKey, priority, jobId, priorityCounterKey,
  isPausedOrMaxed)
  local score = getPriorityScore(priority, priorityCounterKey)
  rcall("ZADD", prioritizedKey, score, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
--[[
  Function to check if queue is paused or maxed
  (since an empty list and !EXISTS are not really the same).
]]
local function isQueuePausedOrMaxed(queueMetaKey, activeKey)
  local queueAttributes = rcall("HMGET", queueMetaKey, "paused", "concurrency")
  if queueAttributes[1] then
    return true
  else
    if queueAttributes[2] then
      local activeCount = rcall("LLEN", activeKey)
      return activeCount >= tonumber(queueAttributes[2])
    end
  end
  return false
end
--[[
  Function to check for the meta.paused key to decide if we are paused or not
  (since an empty list and !EXISTS are not really the same).
]]
local function getTargetQueueList(queueMetaKey, activeKey, waitKey, pausedKey)
  local queueAttributes = rcall("HMGET", queueMetaKey, "paused", "concurrency")
  if queueAttributes[1] then
    return pausedKey, true
  else
    if queueAttributes[2] then
      local activeCount = rcall("LLEN", activeKey)
      if activeCount >= tonumber(queueAttributes[2]) then
        return waitKey, true
      else
        return waitKey, false
      end
    end
  end
  return waitKey, false
end
local function moveParentToWait(parentQueueKey, parentKey, parentId, timestamp)
    local parentWaitKey = parentQueueKey .. ":wait"
    local parentPausedKey = parentQueueKey .. ":paused"
    local parentActiveKey = parentQueueKey .. ":active"
    local parentMetaKey = parentQueueKey .. ":meta"
    local parentMarkerKey = parentQueueKey .. ":marker"
    local jobAttributes = rcall("HMGET", parentKey, "priority", "delay")
    local priority = tonumber(jobAttributes[1]) or 0
    local delay = tonumber(jobAttributes[2]) or 0
    -- ignore dependencies if any left
    rcall("HSET", parentKey, "igdp", 1)
    if delay > 0 then
        local delayedTimestamp = tonumber(timestamp) + delay
        local score = delayedTimestamp * 0x1000
        local parentDelayedKey = parentQueueKey .. ":delayed"
        rcall("ZADD", parentDelayedKey, score, parentId)
        rcall("XADD", parentQueueKey .. ":events", "*", "event", "delayed", "jobId", parentId, "delay",
            delayedTimestamp)
        addDelayMarkerIfNeeded(parentMarkerKey, parentDelayedKey)
    else
        if priority == 0 then
            local parentTarget, isParentPausedOrMaxed = getTargetQueueList(parentMetaKey, parentActiveKey,
                parentWaitKey, parentPausedKey)
            addJobInTargetList(parentTarget, parentMarkerKey, "RPUSH", isParentPausedOrMaxed, parentId)
        else
            local isPausedOrMaxed = isQueuePausedOrMaxed(parentMetaKey, parentActiveKey)
            addJobWithPriority(parentMarkerKey, parentQueueKey .. ":prioritized", priority, parentId,
                parentQueueKey .. ":pc", isPausedOrMaxed)
        end
        rcall("XADD", parentQueueKey .. ":events", "*", "event", "waiting", "jobId", parentId, "prev",
            "waiting-children")
    end
end
local function moveParentToWaitIfNeeded(parentQueueKey, parentKey, parentId, timestamp)
  if rcall("EXISTS", parentKey) == 1 then
    local parentWaitingChildrenKey = parentQueueKey .. ":waiting-children"
    if rcall("ZSCORE", parentWaitingChildrenKey, parentId) then    
      rcall("ZREM", parentWaitingChildrenKey, parentId)
      moveParentToWait(parentQueueKey, parentKey, parentId, timestamp)
    end
  end
end
local function moveParentToWaitIfNoPendingDependencies(parentQueueKey, parentDependenciesKey, parentKey,
  parentId, timestamp)
  local doNotHavePendingDependencies = rcall("SCARD", parentDependenciesKey) == 0
  if doNotHavePendingDependencies then
    moveParentToWaitIfNeeded(parentQueueKey, parentKey, parentId, timestamp)
  end
end
--[[
  Functions to remove jobs when removeOnFail option is provided.
]]
-- Includes
--[[
  Function to remove job.
]]
-- Includes
--[[
  Function to remove deduplication key if needed
  when a job is being removed.
]]
local function removeDeduplicationKeyIfNeededOnRemoval(prefixKey,
  jobKey, jobId)
  local deduplicationId = rcall("HGET", jobKey, "deid")
  if deduplicationId then
    local deduplicationKey = prefixKey .. "de:" .. deduplicationId
    local currentJobId = rcall('GET', deduplicationKey)
    if currentJobId and currentJobId == jobId then
      return rcall("DEL", deduplicationKey)
    end
  end
end
--[[
  Function to remove job keys.
]]
local function removeJobKeys(jobKey)
  return rcall("DEL", jobKey, jobKey .. ':logs', jobKey .. ':dependencies',
    jobKey .. ':processed', jobKey .. ':failed', jobKey .. ':unsuccessful')
end
--[[
  Check if this job has a parent. If so we will just remove it from
  the parent child list, but if it is the last child we should move the parent to "wait/paused"
  which requires code from "moveToFinished"
]]
-- Includes
--[[
  Functions to destructure job key.
  Just a bit of warning, these functions may be a bit slow and affect performance significantly.
]]
local getJobIdFromKey = function (jobKey)
  return string.match(jobKey, ".*:(.*)")
end
local getJobKeyPrefix = function (jobKey, jobId)
  return string.sub(jobKey, 0, #jobKey - #jobId)
end
local function _moveParentToWait(parentPrefix, parentId, emitEvent)
  local parentTarget, isPausedOrMaxed = getTargetQueueList(parentPrefix .. "meta", parentPrefix .. "active",
    parentPrefix .. "wait", parentPrefix .. "paused")
  addJobInTargetList(parentTarget, parentPrefix .. "marker", "RPUSH", isPausedOrMaxed, parentId)
  if emitEvent then
    local parentEventStream = parentPrefix .. "events"
    rcall("XADD", parentEventStream, "*", "event", "waiting", "jobId", parentId, "prev", "waiting-children")
  end
end
local function removeParentDependencyKey(jobKey, hard, parentKey, baseKey, debounceId)
  if parentKey then
    local parentDependenciesKey = parentKey .. ":dependencies"
    local result = rcall("SREM", parentDependenciesKey, jobKey)
    if result > 0 then
      local pendingDependencies = rcall("SCARD", parentDependenciesKey)
      if pendingDependencies == 0 then
        local parentId = getJobIdFromKey(parentKey)
        local parentPrefix = getJobKeyPrefix(parentKey, parentId)
        local numRemovedElements = rcall("ZREM", parentPrefix .. "waiting-children", parentId)
        if numRemovedElements == 1 then
          if hard then -- remove parent in same queue
            if parentPrefix == baseKey then
              removeParentDependencyKey(parentKey, hard, nil, baseKey, nil)
              removeJobKeys(parentKey)
              if debounceId then
                rcall("DEL", parentPrefix .. "de:" .. debounceId)
              end
            else
              _moveParentToWait(parentPrefix, parentId)
            end
          else
            _moveParentToWait(parentPrefix, parentId, true)
          end
        end
      end
      return true
    end
  else
    local parentAttributes = rcall("HMGET", jobKey, "parentKey", "deid")
    local missedParentKey = parentAttributes[1]
    if( (type(missedParentKey) == "string") and missedParentKey ~= ""
      and (rcall("EXISTS", missedParentKey) == 1)) then
      local parentDependenciesKey = missedParentKey .. ":dependencies"
      local result = rcall("SREM", parentDependenciesKey, jobKey)
      if result > 0 then
        local pendingDependencies = rcall("SCARD", parentDependenciesKey)
        if pendingDependencies == 0 then
          local parentId = getJobIdFromKey(missedParentKey)
          local parentPrefix = getJobKeyPrefix(missedParentKey, parentId)
          local numRemovedElements = rcall("ZREM", parentPrefix .. "waiting-children", parentId)
          if numRemovedElements == 1 then
            if hard then
              if parentPrefix == baseKey then
                removeParentDependencyKey(missedParentKey, hard, nil, baseKey, nil)
                removeJobKeys(missedParentKey)
                if parentAttributes[2] then
                  rcall("DEL", parentPrefix .. "de:" .. parentAttributes[2])
                end
              else
                _moveParentToWait(parentPrefix, parentId)
              end
            else
              _moveParentToWait(parentPrefix, parentId, true)
            end
          end
        end
        return true
      end
    end
  end
  return false
end
local function removeJob(jobId, hard, baseKey, shouldRemoveDeduplicationKey)
  local jobKey = baseKey .. jobId
  removeParentDependencyKey(jobKey, hard, nil, baseKey)
  if shouldRemoveDeduplicationKey then
    removeDeduplicationKeyIfNeededOnRemoval(baseKey, jobKey, jobId)
  end
  removeJobKeys(jobKey)
end
--[[
  Functions to remove jobs by max age.
]]
-- Includes
local function removeJobsByMaxAge(timestamp, maxAge, targetSet, prefix,
  shouldRemoveDebounceKey)
  local start = timestamp - maxAge * 1000
  local jobIds = rcall("ZREVRANGEBYSCORE", targetSet, start, "-inf")
  for i, jobId in ipairs(jobIds) do
    removeJob(jobId, false, prefix, false --[[remove debounce key]])
  end
  rcall("ZREMRANGEBYSCORE", targetSet, "-inf", start)
end
--[[
  Functions to remove jobs by max count.
]]
-- Includes
local function removeJobsByMaxCount(maxCount, targetSet, prefix)
  local start = maxCount
  local jobIds = rcall("ZREVRANGE", targetSet, start, -1)
  for i, jobId in ipairs(jobIds) do
    removeJob(jobId, false, prefix, false --[[remove debounce key]])
  end
  rcall("ZREMRANGEBYRANK", targetSet, 0, -(maxCount + 1))
end
local function removeJobsOnFail(queueKeyPrefix, failedKey, jobId, opts, timestamp)
  local removeOnFailType = type(opts["removeOnFail"])
  if removeOnFailType == "number" then
    removeJobsByMaxCount(opts["removeOnFail"],
                        failedKey, queueKeyPrefix)
  elseif removeOnFailType == "boolean" then
    if opts["removeOnFail"] then
      removeJob(jobId, false, queueKeyPrefix,
                false --[[remove debounce key]])
      rcall("ZREM", failedKey, jobId)
    end
  elseif removeOnFailType ~= "nil" then
    local maxAge = opts["removeOnFail"]["age"]
    local maxCount = opts["removeOnFail"]["count"]
    if maxAge ~= nil then
      removeJobsByMaxAge(timestamp, maxAge,
                        failedKey, queueKeyPrefix)
    end
    if maxCount ~= nil and maxCount > 0 then
      removeJobsByMaxCount(maxCount, failedKey,
                            queueKeyPrefix)
    end
  end 
end
local moveParentToFailedIfNeeded
local moveChildFromDependenciesIfNeeded
moveParentToFailedIfNeeded = function (parentQueueKey, parentKey, parentId, jobIdKey, timestamp)
  if rcall("EXISTS", parentKey) == 1 then
    local parentWaitingChildrenKey = parentQueueKey .. ":waiting-children"
    local parentDelayedKey = parentQueueKey .. ":delayed"
    local parentPrioritizedKey = parentQueueKey .. ":prioritized"
    local parentWaitingChildrenOrDelayedKey
    local prevState
    if rcall("ZSCORE", parentWaitingChildrenKey, parentId) then
      parentWaitingChildrenOrDelayedKey = parentWaitingChildrenKey
      prevState = "waiting-children"
    elseif rcall("ZSCORE", parentDelayedKey, parentId) then
      parentWaitingChildrenOrDelayedKey = parentDelayedKey
      prevState = "delayed"
      rcall("HSET", parentKey, "delay", 0)
    end
    if parentWaitingChildrenOrDelayedKey then
      rcall("ZREM", parentWaitingChildrenOrDelayedKey, parentId)
      local parentQueuePrefix = parentQueueKey .. ":"
      local parentFailedKey = parentQueueKey .. ":failed"
      local deferredFailure = "child " .. jobIdKey .. " failed"
      rcall("HSET", parentKey, "defa", deferredFailure)
      moveParentToWait(parentQueueKey, parentKey, parentId, timestamp)
    else
      if not rcall("ZSCORE", parentQueueKey .. ":failed", parentId) then
        local deferredFailure = "child " .. jobIdKey .. " failed"
        rcall("HSET", parentKey, "defa", deferredFailure)
      end
    end
  end
end
moveChildFromDependenciesIfNeeded = function (rawParentData, childKey, failedReason, timestamp)
  if rawParentData then
    local parentData = cjson.decode(rawParentData)
    local parentKey = parentData['queueKey'] .. ':' .. parentData['id']
    local parentDependenciesChildrenKey = parentKey .. ":dependencies"
    if parentData['fpof'] then
      if rcall("SREM", parentDependenciesChildrenKey, childKey) == 1 then
        local parentUnsuccesssfulChildrenKey = parentKey .. ":unsuccessful"
        rcall("ZADD", parentUnsuccesssfulChildrenKey, timestamp, childKey)
        moveParentToFailedIfNeeded(
          parentData['queueKey'],
          parentKey,
          parentData['id'],
          childKey,
          timestamp
        )
      end
    elseif parentData['cpof'] then
      if rcall("SREM", parentDependenciesChildrenKey, childKey) == 1 then
        local parentFailedChildrenKey = parentKey .. ":failed"
        rcall("HSET", parentFailedChildrenKey, childKey, failedReason)
        moveParentToWaitIfNeeded(parentData['queueKey'], parentKey, parentData['id'], timestamp)
      end
    elseif parentData['idof'] or parentData['rdof'] then
      if rcall("SREM", parentDependenciesChildrenKey, childKey) == 1 then
        moveParentToWaitIfNoPendingDependencies(parentData['queueKey'], parentDependenciesChildrenKey,
          parentKey, parentData['id'], timestamp)
        if parentData['idof'] then
          local parentFailedChildrenKey = parentKey .. ":failed"
          rcall("HSET", parentFailedChildrenKey, childKey, failedReason)
        end
      end
    end
  end
end
--[[
  Function to remove deduplication key if needed
  when a job is moved to completed or failed states.
]]
local function removeDeduplicationKeyIfNeededOnFinalization(prefixKey,
  deduplicationId, jobId)
  if deduplicationId then
    local deduplicationKey = prefixKey .. "de:" .. deduplicationId
    local pttl = rcall("PTTL", deduplicationKey)
    if pttl == 0 then
      return rcall("DEL", deduplicationKey)
    end
    if pttl == -1 then
      local currentJobId = rcall('GET', deduplicationKey)
      if currentJobId and currentJobId == jobId then
        return rcall("DEL", deduplicationKey)
      end
    end
  end
end
local function removeLock(jobKey, stalledKey, token, jobId)
  if token ~= "0" then
    local lockKey = jobKey .. ':lock'
    local lockToken = rcall("GET", lockKey)
    if lockToken == token then
      rcall("DEL", lockKey)
      rcall("SREM", stalledKey, jobId)
    else
      if lockToken then
        -- Lock exists but token does not match
        return -6
      else
        -- Lock is missing completely
        return -2
      end
    end
  end
  return 0
end
local function moveToWaitingChildren(activeKey, waitingChildrenKey, jobId,
    timestamp)
  local score = tonumber(timestamp)
  local numRemovedElements = rcall("LREM", activeKey, -1, jobId)
  if(numRemovedElements < 1) then
    return -3
  end
  rcall("ZADD", waitingChildrenKey, score, jobId)
  return 0
end
if rcall("EXISTS", jobKey) == 1 then
  if rcall("ZCARD", jobUnsuccessfulKey) ~= 0 then
    -- TODO: refactor this logic in an include later
    local jobAttributes = rcall("HMGET", jobKey, "parent", "deid", "opts")
    removeDeduplicationKeyIfNeededOnFinalization(ARGV[5], jobAttributes[2], jobId)
    local failedReason = "children are failed"
    rcall("ZADD", failedKey, timestamp, jobId)
    rcall("HSET", jobKey, "finishedOn", timestamp)
    rcall("XADD", KEYS[8], "*", "event", "failed", "jobId", jobId, "failedReason",
      failedReason, "prev", "active")
    local rawParentData = jobAttributes[1]
    local rawOpts = jobAttributes[3]
    local opts = cjson.decode(rawOpts)
    moveChildFromDependenciesIfNeeded(rawParentData, jobKey, failedReason, timestamp)
    removeJobsOnFail(ARGV[5], failedKey, jobId, opts, timestamp)
    return 0
  else
    if ARGV[2] ~= "" then
      if rcall("SISMEMBER", jobDependenciesKey, ARGV[2]) ~= 0 then
        local errorCode = removeLock(jobKey, stalledKey, ARGV[1], jobId)
        if errorCode < 0 then
          return errorCode
        end
        return moveToWaitingChildren(activeKey, waitingChildrenKey, jobId, timestamp)
      end
      return 1
    else
      if rcall("SCARD", jobDependenciesKey) ~= 0 then 
        local errorCode = removeLock(jobKey, stalledKey, ARGV[1], jobId)
        if errorCode < 0 then
          return errorCode
        end
        return moveToWaitingChildren(activeKey, waitingChildrenKey, jobId, timestamp)
      end
      return 1
    end    
  end
end
return -1
`,keys:8},G={name:"obliterate",content:`--[[
  Completely obliterates a queue and all of its contents
  This command completely destroys a queue including all of its jobs, current or past 
  leaving no trace of its existence. Since this script needs to iterate to find all the job
  keys, consider that this call may be slow for very large queues.
  The queue needs to be "paused" or it will return an error
  If the queue has currently active jobs then the script by default will return error,
  however this behaviour can be overrided using the 'force' option.
  Input:
    KEYS[1] meta
    KEYS[2] base
    ARGV[1] count
    ARGV[2] force
]]
local maxCount = tonumber(ARGV[1])
local baseKey = KEYS[2]
local rcall = redis.call
-- Includes
--[[
  Functions to remove jobs.
]]
-- Includes
--[[
  Function to remove job.
]]
-- Includes
--[[
  Function to remove deduplication key if needed
  when a job is being removed.
]]
local function removeDeduplicationKeyIfNeededOnRemoval(prefixKey,
  jobKey, jobId)
  local deduplicationId = rcall("HGET", jobKey, "deid")
  if deduplicationId then
    local deduplicationKey = prefixKey .. "de:" .. deduplicationId
    local currentJobId = rcall('GET', deduplicationKey)
    if currentJobId and currentJobId == jobId then
      return rcall("DEL", deduplicationKey)
    end
  end
end
--[[
  Function to remove job keys.
]]
local function removeJobKeys(jobKey)
  return rcall("DEL", jobKey, jobKey .. ':logs', jobKey .. ':dependencies',
    jobKey .. ':processed', jobKey .. ':failed', jobKey .. ':unsuccessful')
end
--[[
  Check if this job has a parent. If so we will just remove it from
  the parent child list, but if it is the last child we should move the parent to "wait/paused"
  which requires code from "moveToFinished"
]]
-- Includes
--[[
  Function to add job in target list and add marker if needed.
]]
-- Includes
--[[
  Add marker if needed when a job is available.
]]
local function addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
  if not isPausedOrMaxed then
    rcall("ZADD", markerKey, 0, "0")
  end  
end
local function addJobInTargetList(targetKey, markerKey, pushCmd, isPausedOrMaxed, jobId)
  rcall(pushCmd, targetKey, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
--[[
  Functions to destructure job key.
  Just a bit of warning, these functions may be a bit slow and affect performance significantly.
]]
local getJobIdFromKey = function (jobKey)
  return string.match(jobKey, ".*:(.*)")
end
local getJobKeyPrefix = function (jobKey, jobId)
  return string.sub(jobKey, 0, #jobKey - #jobId)
end
--[[
  Function to check for the meta.paused key to decide if we are paused or not
  (since an empty list and !EXISTS are not really the same).
]]
local function getTargetQueueList(queueMetaKey, activeKey, waitKey, pausedKey)
  local queueAttributes = rcall("HMGET", queueMetaKey, "paused", "concurrency")
  if queueAttributes[1] then
    return pausedKey, true
  else
    if queueAttributes[2] then
      local activeCount = rcall("LLEN", activeKey)
      if activeCount >= tonumber(queueAttributes[2]) then
        return waitKey, true
      else
        return waitKey, false
      end
    end
  end
  return waitKey, false
end
local function _moveParentToWait(parentPrefix, parentId, emitEvent)
  local parentTarget, isPausedOrMaxed = getTargetQueueList(parentPrefix .. "meta", parentPrefix .. "active",
    parentPrefix .. "wait", parentPrefix .. "paused")
  addJobInTargetList(parentTarget, parentPrefix .. "marker", "RPUSH", isPausedOrMaxed, parentId)
  if emitEvent then
    local parentEventStream = parentPrefix .. "events"
    rcall("XADD", parentEventStream, "*", "event", "waiting", "jobId", parentId, "prev", "waiting-children")
  end
end
local function removeParentDependencyKey(jobKey, hard, parentKey, baseKey, debounceId)
  if parentKey then
    local parentDependenciesKey = parentKey .. ":dependencies"
    local result = rcall("SREM", parentDependenciesKey, jobKey)
    if result > 0 then
      local pendingDependencies = rcall("SCARD", parentDependenciesKey)
      if pendingDependencies == 0 then
        local parentId = getJobIdFromKey(parentKey)
        local parentPrefix = getJobKeyPrefix(parentKey, parentId)
        local numRemovedElements = rcall("ZREM", parentPrefix .. "waiting-children", parentId)
        if numRemovedElements == 1 then
          if hard then -- remove parent in same queue
            if parentPrefix == baseKey then
              removeParentDependencyKey(parentKey, hard, nil, baseKey, nil)
              removeJobKeys(parentKey)
              if debounceId then
                rcall("DEL", parentPrefix .. "de:" .. debounceId)
              end
            else
              _moveParentToWait(parentPrefix, parentId)
            end
          else
            _moveParentToWait(parentPrefix, parentId, true)
          end
        end
      end
      return true
    end
  else
    local parentAttributes = rcall("HMGET", jobKey, "parentKey", "deid")
    local missedParentKey = parentAttributes[1]
    if( (type(missedParentKey) == "string") and missedParentKey ~= ""
      and (rcall("EXISTS", missedParentKey) == 1)) then
      local parentDependenciesKey = missedParentKey .. ":dependencies"
      local result = rcall("SREM", parentDependenciesKey, jobKey)
      if result > 0 then
        local pendingDependencies = rcall("SCARD", parentDependenciesKey)
        if pendingDependencies == 0 then
          local parentId = getJobIdFromKey(missedParentKey)
          local parentPrefix = getJobKeyPrefix(missedParentKey, parentId)
          local numRemovedElements = rcall("ZREM", parentPrefix .. "waiting-children", parentId)
          if numRemovedElements == 1 then
            if hard then
              if parentPrefix == baseKey then
                removeParentDependencyKey(missedParentKey, hard, nil, baseKey, nil)
                removeJobKeys(missedParentKey)
                if parentAttributes[2] then
                  rcall("DEL", parentPrefix .. "de:" .. parentAttributes[2])
                end
              else
                _moveParentToWait(parentPrefix, parentId)
              end
            else
              _moveParentToWait(parentPrefix, parentId, true)
            end
          end
        end
        return true
      end
    end
  end
  return false
end
local function removeJob(jobId, hard, baseKey, shouldRemoveDeduplicationKey)
  local jobKey = baseKey .. jobId
  removeParentDependencyKey(jobKey, hard, nil, baseKey)
  if shouldRemoveDeduplicationKey then
    removeDeduplicationKeyIfNeededOnRemoval(baseKey, jobKey, jobId)
  end
  removeJobKeys(jobKey)
end
local function removeJobs(keys, hard, baseKey, max)
  for i, key in ipairs(keys) do
    removeJob(key, hard, baseKey, true --[[remove debounce key]])
  end
  return max - #keys
end
--[[
  Functions to remove jobs.
]]
-- Includes
--[[
  Function to filter out jobs to ignore from a table.
]]
local function filterOutJobsToIgnore(jobs, jobsToIgnore)
  local filteredJobs = {}
  for i = 1, #jobs do
    if not jobsToIgnore[jobs[i]] then
      table.insert(filteredJobs, jobs[i])
    end
  end
  return filteredJobs
end
local function getListItems(keyName, max)
  return rcall('LRANGE', keyName, 0, max - 1)
end
local function removeListJobs(keyName, hard, baseKey, max, jobsToIgnore)
  local jobs = getListItems(keyName, max)
  if jobsToIgnore then
    jobs = filterOutJobsToIgnore(jobs, jobsToIgnore)
  end
  local count = removeJobs(jobs, hard, baseKey, max)
  rcall("LTRIM", keyName, #jobs, -1)
  return count
end
-- Includes
--[[
  Function to loop in batches.
  Just a bit of warning, some commands as ZREM
  could receive a maximum of 7000 parameters per call.
]]
local function batches(n, batchSize)
  local i = 0
  return function()
    local from = i * batchSize + 1
    i = i + 1
    if (from <= n) then
      local to = math.min(from + batchSize - 1, n)
      return from, to
    end
  end
end
--[[
  Function to get ZSet items.
]]
local function getZSetItems(keyName, max)
  return rcall('ZRANGE', keyName, 0, max - 1)
end
local function removeZSetJobs(keyName, hard, baseKey, max, jobsToIgnore)
  local jobs = getZSetItems(keyName, max)
  if jobsToIgnore then
    jobs = filterOutJobsToIgnore(jobs, jobsToIgnore)
  end
  local count = removeJobs(jobs, hard, baseKey, max)
  if(#jobs > 0) then
    for from, to in batches(#jobs, 7000) do
      rcall("ZREM", keyName, unpack(jobs, from, to))
    end
  end
  return count
end
local function removeLockKeys(keys)
  for i, key in ipairs(keys) do
    rcall("DEL", baseKey .. key .. ':lock')
  end
end
-- 1) Check if paused, if not return with error.
if rcall("HEXISTS", KEYS[1], "paused") ~= 1 then
  return -1 -- Error, NotPaused
end
-- 2) Check if there are active jobs, if there are and not "force" return error.
local activeKey = baseKey .. 'active'
local activeJobs = getListItems(activeKey, maxCount)
if (#activeJobs > 0) then
  if(ARGV[2] == "") then 
    return -2 -- Error, ExistActiveJobs
  end
end
removeLockKeys(activeJobs)
maxCount = removeJobs(activeJobs, true, baseKey, maxCount)
rcall("LTRIM", activeKey, #activeJobs, -1)
if(maxCount <= 0) then
  return 1
end
local delayedKey = baseKey .. 'delayed'
maxCount = removeZSetJobs(delayedKey, true, baseKey, maxCount)
if(maxCount <= 0) then
  return 1
end
local repeatKey = baseKey .. 'repeat'
local repeatJobsIds = getZSetItems(repeatKey, maxCount)
for i, key in ipairs(repeatJobsIds) do
  local jobKey = repeatKey .. ":" .. key
  rcall("DEL", jobKey)
end
if(#repeatJobsIds > 0) then
  for from, to in batches(#repeatJobsIds, 7000) do
    rcall("ZREM", repeatKey, unpack(repeatJobsIds, from, to))
  end
end
maxCount = maxCount - #repeatJobsIds
if(maxCount <= 0) then
  return 1
end
local completedKey = baseKey .. 'completed'
maxCount = removeZSetJobs(completedKey, true, baseKey, maxCount)
if(maxCount <= 0) then
  return 1
end
local waitKey = baseKey .. 'paused'
maxCount = removeListJobs(waitKey, true, baseKey, maxCount)
if(maxCount <= 0) then
  return 1
end
local prioritizedKey = baseKey .. 'prioritized'
maxCount = removeZSetJobs(prioritizedKey, true, baseKey, maxCount)
if(maxCount <= 0) then
  return 1
end
local failedKey = baseKey .. 'failed'
maxCount = removeZSetJobs(failedKey, true, baseKey, maxCount)
if(maxCount <= 0) then
  return 1
end
if(maxCount > 0) then
  rcall("DEL",
    baseKey .. 'events',
    baseKey .. 'delay', 
    baseKey .. 'stalled-check',
    baseKey .. 'stalled',
    baseKey .. 'id',
    baseKey .. 'pc',
    baseKey .. 'meta',
    baseKey .. 'metrics:completed',
    baseKey .. 'metrics:completed:data',
    baseKey .. 'metrics:failed',
    baseKey .. 'metrics:failed:data')
  return 0
else
  return 1
end
`,keys:2},q={name:"paginate",content:`--[[
    Paginate a set or hash
    Input:
      KEYS[1] key pointing to the set or hash to be paginated.
      ARGV[1]  page start offset
      ARGV[2]  page end offset (-1 for all the elements)
      ARGV[3]  cursor
      ARGV[4]  offset
      ARGV[5]  max iterations
      ARGV[6]  fetch jobs?
    Output:
      [cursor, offset, items, numItems]
]]
local rcall = redis.call
-- Includes
--[[
  Function to achieve pagination for a set or hash.
  This function simulates pagination in the most efficient way possible
  for a set using sscan or hscan.
  The main limitation is that sets are not order preserving, so the
  pagination is not stable. This means that if the set is modified
  between pages, the same element may appear in different pages.
]] -- Maximum number of elements to be returned by sscan per iteration.
local maxCount = 100
-- Finds the cursor, and returns the first elements available for the requested page.
local function findPage(key, command, pageStart, pageSize, cursor, offset,
                        maxIterations, fetchJobs)
    local items = {}
    local jobs = {}
    local iterations = 0
    repeat
        -- Iterate over the set using sscan/hscan.
        local result = rcall(command, key, cursor, "COUNT", maxCount)
        cursor = result[1]
        local members = result[2]
        local step = 1
        if command == "HSCAN" then
            step = 2
        end
        if #members == 0 then
            -- If the result is empty, we can return the result.
            return cursor, offset, items, jobs
        end
        local chunkStart = offset
        local chunkEnd = offset + #members / step
        local pageEnd = pageStart + pageSize
        if chunkEnd < pageStart then
            -- If the chunk is before the page, we can skip it.
            offset = chunkEnd
        elseif chunkStart > pageEnd then
            -- If the chunk is after the page, we can return the result.
            return cursor, offset, items, jobs
        else
            -- If the chunk is overlapping the page, we need to add the elements to the result.
            for i = 1, #members, step do
                if offset >= pageEnd then
                    return cursor, offset, items, jobs
                end
                if offset >= pageStart then
                    local index = #items + 1
                    if fetchJobs ~= nil then
                        jobs[#jobs+1] = rcall("HGETALL", members[i])
                    end
                    if step == 2 then
                        items[index] = {members[i], members[i + 1]}
                    else
                        items[index] = members[i]
                    end
                end
                offset = offset + 1
            end
        end
        iterations = iterations + 1
    until cursor == "0" or iterations >= maxIterations
    return cursor, offset, items, jobs
end
local key = KEYS[1]
local scanCommand = "SSCAN"
local countCommand = "SCARD"
local type = rcall("TYPE", key)["ok"]
if type == "none" then
    return {0, 0, {}, 0}
elseif type == "hash" then
    scanCommand = "HSCAN"
    countCommand = "HLEN"
elseif type ~= "set" then
    return
        redis.error_reply("Pagination is only supported for sets and hashes.")
end
local numItems = rcall(countCommand, key)
local startOffset = tonumber(ARGV[1])
local endOffset = tonumber(ARGV[2])
if endOffset == -1 then 
  endOffset = numItems
end
local pageSize = (endOffset - startOffset) + 1
local cursor, offset, items, jobs = findPage(key, scanCommand, startOffset,
                                       pageSize, ARGV[3], tonumber(ARGV[4]),
                                       tonumber(ARGV[5]), ARGV[6])
return {cursor, offset, items, numItems, jobs}
`,keys:1},Y={name:"pause",content:`--[[
  Pauses or resumes a queue globably.
  Input:
    KEYS[1] 'wait' or 'paused''
    KEYS[2] 'paused' or 'wait'
    KEYS[3] 'meta'
    KEYS[4] 'prioritized'
    KEYS[5] events stream key
    KEYS[6] 'delayed'
    KEYS|7] 'marker'
    ARGV[1] 'paused' or 'resumed'
  Event:
    publish paused or resumed event.
]]
local rcall = redis.call
-- Includes
--[[
  Add delay marker if needed.
]]
-- Includes
--[[
  Function to return the next delayed job timestamp.
]]
local function getNextDelayedTimestamp(delayedKey)
  local result = rcall("ZRANGE", delayedKey, 0, 0, "WITHSCORES")
  if #result then
    local nextTimestamp = tonumber(result[2])
    if nextTimestamp ~= nil then
      return nextTimestamp / 0x1000
    end
  end
end
local function addDelayMarkerIfNeeded(markerKey, delayedKey)
  local nextTimestamp = getNextDelayedTimestamp(delayedKey)
  if nextTimestamp ~= nil then
    -- Replace the score of the marker with the newest known
    -- next timestamp.
    rcall("ZADD", markerKey, nextTimestamp, "1")
  end
end
local markerKey = KEYS[7]
local hasJobs = rcall("EXISTS", KEYS[1]) == 1
--TODO: check this logic to be reused when changing a delay
if hasJobs then rcall("RENAME", KEYS[1], KEYS[2]) end
if ARGV[1] == "paused" then
    rcall("HSET", KEYS[3], "paused", 1)
    rcall("DEL", markerKey)
else
    rcall("HDEL", KEYS[3], "paused")
    if hasJobs or rcall("ZCARD", KEYS[4]) > 0 then
        -- Add marker if there are waiting or priority jobs
        rcall("ZADD", markerKey, 0, "0")
    else
        addDelayMarkerIfNeeded(markerKey, KEYS[6])
    end
end
rcall("XADD", KEYS[5], "*", "event", ARGV[1]);
`,keys:7},B={name:"promote",content:`--[[
  Promotes a job that is currently "delayed" to the "waiting" state
    Input:
      KEYS[1] 'delayed'
      KEYS[2] 'wait'
      KEYS[3] 'paused'
      KEYS[4] 'meta'
      KEYS[5] 'prioritized'
      KEYS[6] 'active'
      KEYS[7] 'pc' priority counter
      KEYS[8] 'event stream'
      KEYS[9] 'marker'
      ARGV[1]  queue.toKey('')
      ARGV[2]  jobId
    Output:
       0 - OK
      -3 - Job not in delayed zset.
    Events:
      'waiting'
]]
local rcall = redis.call
local jobId = ARGV[2]
-- Includes
--[[
  Function to add job in target list and add marker if needed.
]]
-- Includes
--[[
  Add marker if needed when a job is available.
]]
local function addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
  if not isPausedOrMaxed then
    rcall("ZADD", markerKey, 0, "0")
  end  
end
local function addJobInTargetList(targetKey, markerKey, pushCmd, isPausedOrMaxed, jobId)
  rcall(pushCmd, targetKey, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
--[[
  Function to add job considering priority.
]]
-- Includes
--[[
  Function to get priority score.
]]
local function getPriorityScore(priority, priorityCounterKey)
  local prioCounter = rcall("INCR", priorityCounterKey)
  return priority * 0x100000000 + prioCounter % 0x100000000
end
local function addJobWithPriority(markerKey, prioritizedKey, priority, jobId, priorityCounterKey,
  isPausedOrMaxed)
  local score = getPriorityScore(priority, priorityCounterKey)
  rcall("ZADD", prioritizedKey, score, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
--[[
  Function to check for the meta.paused key to decide if we are paused or not
  (since an empty list and !EXISTS are not really the same).
]]
local function getTargetQueueList(queueMetaKey, activeKey, waitKey, pausedKey)
  local queueAttributes = rcall("HMGET", queueMetaKey, "paused", "concurrency")
  if queueAttributes[1] then
    return pausedKey, true
  else
    if queueAttributes[2] then
      local activeCount = rcall("LLEN", activeKey)
      if activeCount >= tonumber(queueAttributes[2]) then
        return waitKey, true
      else
        return waitKey, false
      end
    end
  end
  return waitKey, false
end
if rcall("ZREM", KEYS[1], jobId) == 1 then
    local jobKey = ARGV[1] .. jobId
    local priority = tonumber(rcall("HGET", jobKey, "priority")) or 0
    local metaKey = KEYS[4]
    local markerKey = KEYS[9]
    -- Remove delayed "marker" from the wait list if there is any.
    -- Since we are adding a job we do not need the marker anymore.
    -- Markers in waitlist DEPRECATED in v5: Remove in v6.
    local target, isPausedOrMaxed = getTargetQueueList(metaKey, KEYS[6], KEYS[2], KEYS[3])
    local marker = rcall("LINDEX", target, 0)
    if marker and string.sub(marker, 1, 2) == "0:" then rcall("LPOP", target) end
    if priority == 0 then
        -- LIFO or FIFO
        addJobInTargetList(target, markerKey, "LPUSH", isPausedOrMaxed, jobId)
    else
        addJobWithPriority(markerKey, KEYS[5], priority, jobId, KEYS[7], isPausedOrMaxed)
    end
    -- Emit waiting event (wait..ing@token)
    rcall("XADD", KEYS[8], "*", "event", "waiting", "jobId", jobId, "prev",
          "delayed");
    rcall("HSET", jobKey, "delay", 0)
    return 0
else
    return -3
end
`,keys:9},z={name:"releaseLock",content:`--[[
  Release lock
    Input:
      KEYS[1] 'lock',
      ARGV[1]  token
      ARGV[2]  lock duration in milliseconds
    Output:
      "OK" if lock extented succesfully.
]]
local rcall = redis.call
if rcall("GET", KEYS[1]) == ARGV[1] then
  return rcall("DEL", KEYS[1])
else
  return 0
end
`,keys:1},W={name:"removeChildDependency",content:`--[[
  Break parent-child dependency by removing
  child reference from parent
  Input:
    KEYS[1] 'key' prefix,
    ARGV[1] job key
    ARGV[2] parent key
    Output:
       0  - OK
       1  - There is not relationship.
      -1  - Missing job key
      -5  - Missing parent key
]]
local rcall = redis.call
local jobKey = ARGV[1]
local parentKey = ARGV[2]
-- Includes
--[[
  Check if this job has a parent. If so we will just remove it from
  the parent child list, but if it is the last child we should move the parent to "wait/paused"
  which requires code from "moveToFinished"
]]
-- Includes
--[[
  Function to add job in target list and add marker if needed.
]]
-- Includes
--[[
  Add marker if needed when a job is available.
]]
local function addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
  if not isPausedOrMaxed then
    rcall("ZADD", markerKey, 0, "0")
  end  
end
local function addJobInTargetList(targetKey, markerKey, pushCmd, isPausedOrMaxed, jobId)
  rcall(pushCmd, targetKey, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
--[[
  Functions to destructure job key.
  Just a bit of warning, these functions may be a bit slow and affect performance significantly.
]]
local getJobIdFromKey = function (jobKey)
  return string.match(jobKey, ".*:(.*)")
end
local getJobKeyPrefix = function (jobKey, jobId)
  return string.sub(jobKey, 0, #jobKey - #jobId)
end
--[[
  Function to check for the meta.paused key to decide if we are paused or not
  (since an empty list and !EXISTS are not really the same).
]]
local function getTargetQueueList(queueMetaKey, activeKey, waitKey, pausedKey)
  local queueAttributes = rcall("HMGET", queueMetaKey, "paused", "concurrency")
  if queueAttributes[1] then
    return pausedKey, true
  else
    if queueAttributes[2] then
      local activeCount = rcall("LLEN", activeKey)
      if activeCount >= tonumber(queueAttributes[2]) then
        return waitKey, true
      else
        return waitKey, false
      end
    end
  end
  return waitKey, false
end
--[[
  Function to remove job keys.
]]
local function removeJobKeys(jobKey)
  return rcall("DEL", jobKey, jobKey .. ':logs', jobKey .. ':dependencies',
    jobKey .. ':processed', jobKey .. ':failed', jobKey .. ':unsuccessful')
end
local function _moveParentToWait(parentPrefix, parentId, emitEvent)
  local parentTarget, isPausedOrMaxed = getTargetQueueList(parentPrefix .. "meta", parentPrefix .. "active",
    parentPrefix .. "wait", parentPrefix .. "paused")
  addJobInTargetList(parentTarget, parentPrefix .. "marker", "RPUSH", isPausedOrMaxed, parentId)
  if emitEvent then
    local parentEventStream = parentPrefix .. "events"
    rcall("XADD", parentEventStream, "*", "event", "waiting", "jobId", parentId, "prev", "waiting-children")
  end
end
local function removeParentDependencyKey(jobKey, hard, parentKey, baseKey, debounceId)
  if parentKey then
    local parentDependenciesKey = parentKey .. ":dependencies"
    local result = rcall("SREM", parentDependenciesKey, jobKey)
    if result > 0 then
      local pendingDependencies = rcall("SCARD", parentDependenciesKey)
      if pendingDependencies == 0 then
        local parentId = getJobIdFromKey(parentKey)
        local parentPrefix = getJobKeyPrefix(parentKey, parentId)
        local numRemovedElements = rcall("ZREM", parentPrefix .. "waiting-children", parentId)
        if numRemovedElements == 1 then
          if hard then -- remove parent in same queue
            if parentPrefix == baseKey then
              removeParentDependencyKey(parentKey, hard, nil, baseKey, nil)
              removeJobKeys(parentKey)
              if debounceId then
                rcall("DEL", parentPrefix .. "de:" .. debounceId)
              end
            else
              _moveParentToWait(parentPrefix, parentId)
            end
          else
            _moveParentToWait(parentPrefix, parentId, true)
          end
        end
      end
      return true
    end
  else
    local parentAttributes = rcall("HMGET", jobKey, "parentKey", "deid")
    local missedParentKey = parentAttributes[1]
    if( (type(missedParentKey) == "string") and missedParentKey ~= ""
      and (rcall("EXISTS", missedParentKey) == 1)) then
      local parentDependenciesKey = missedParentKey .. ":dependencies"
      local result = rcall("SREM", parentDependenciesKey, jobKey)
      if result > 0 then
        local pendingDependencies = rcall("SCARD", parentDependenciesKey)
        if pendingDependencies == 0 then
          local parentId = getJobIdFromKey(missedParentKey)
          local parentPrefix = getJobKeyPrefix(missedParentKey, parentId)
          local numRemovedElements = rcall("ZREM", parentPrefix .. "waiting-children", parentId)
          if numRemovedElements == 1 then
            if hard then
              if parentPrefix == baseKey then
                removeParentDependencyKey(missedParentKey, hard, nil, baseKey, nil)
                removeJobKeys(missedParentKey)
                if parentAttributes[2] then
                  rcall("DEL", parentPrefix .. "de:" .. parentAttributes[2])
                end
              else
                _moveParentToWait(parentPrefix, parentId)
              end
            else
              _moveParentToWait(parentPrefix, parentId, true)
            end
          end
        end
        return true
      end
    end
  end
  return false
end
if rcall("EXISTS", jobKey) ~= 1 then return -1 end
if rcall("EXISTS", parentKey) ~= 1 then return -5 end
if removeParentDependencyKey(jobKey, false, parentKey, KEYS[1], nil) then
  rcall("HDEL", jobKey, "parentKey", "parent")
  return 0
else
  return 1
end`,keys:1},U={name:"removeJob",content:`--[[
    Remove a job from all the statuses it may be in as well as all its data.
    In order to be able to remove a job, it cannot be active.
    Input:
      KEYS[1] jobKey
      KEYS[2] meta key
      KEYS[3] repeat key
      ARGV[1] jobId
      ARGV[2] remove children
      ARGV[3] queue prefix
    Events:
      'removed'
]]
local rcall = redis.call
-- Includes
--[[
  Function to check if the job belongs to a job scheduler and
  current delayed job matches with jobId
]]
local function isJobSchedulerJob(jobId, jobKey, jobSchedulersKey)
  local repeatJobKey = rcall("HGET", jobKey, "rjk")
  if repeatJobKey  then
    local prevMillis = rcall("ZSCORE", jobSchedulersKey, repeatJobKey)
    if prevMillis then
      local currentDelayedJobId = "repeat:" .. repeatJobKey .. ":" .. prevMillis
      return jobId == currentDelayedJobId
    end
  end
  return false
end
--[[
  Function to recursively check if there are no locks
  on the jobs to be removed.
  returns:
    boolean
]]
--[[
  Functions to destructure job key.
  Just a bit of warning, these functions may be a bit slow and affect performance significantly.
]]
local getJobIdFromKey = function (jobKey)
  return string.match(jobKey, ".*:(.*)")
end
local getJobKeyPrefix = function (jobKey, jobId)
  return string.sub(jobKey, 0, #jobKey - #jobId)
end
local function isLocked( prefix, jobId, removeChildren)
  local jobKey = prefix .. jobId;
  -- Check if this job is locked
  local lockKey = jobKey .. ':lock'
  local lock = rcall("GET", lockKey)
  if not lock then
    if removeChildren == "1" then
      local dependencies = rcall("SMEMBERS", jobKey .. ":dependencies")
      if (#dependencies > 0) then
        for i, childJobKey in ipairs(dependencies) do
          -- We need to get the jobId for this job.
          local childJobId = getJobIdFromKey(childJobKey)
          local childJobPrefix = getJobKeyPrefix(childJobKey, childJobId)
          local result = isLocked( childJobPrefix, childJobId, removeChildren )
          if result then
            return true
          end
        end
      end
    end
    return false
  end
  return true
end
--[[
    Remove a job from all the statuses it may be in as well as all its data,
    including its children. Active children can be ignored.
    Events:
      'removed'
]]
local rcall = redis.call
-- Includes
--[[
  Function to get max events value or set by default 10000.
]]
local function getOrSetMaxEvents(metaKey)
  local maxEvents = rcall("HGET", metaKey, "opts.maxLenEvents")
  if not maxEvents then
    maxEvents = 10000
    rcall("HSET", metaKey, "opts.maxLenEvents", maxEvents)
  end
  return maxEvents
end
--[[
  Function to remove deduplication key if needed
  when a job is being removed.
]]
local function removeDeduplicationKeyIfNeededOnRemoval(prefixKey,
  jobKey, jobId)
  local deduplicationId = rcall("HGET", jobKey, "deid")
  if deduplicationId then
    local deduplicationKey = prefixKey .. "de:" .. deduplicationId
    local currentJobId = rcall('GET', deduplicationKey)
    if currentJobId and currentJobId == jobId then
      return rcall("DEL", deduplicationKey)
    end
  end
end
--[[
  Function to remove from any state.
  returns:
    prev state
]]
local function removeJobFromAnyState( prefix, jobId)
  -- We start with the ZSCORE checks, since they have O(1) complexity
  if rcall("ZSCORE", prefix .. "completed", jobId) then
    rcall("ZREM", prefix .. "completed", jobId)
    return "completed"
  elseif rcall("ZSCORE", prefix .. "waiting-children", jobId) then
    rcall("ZREM", prefix .. "waiting-children", jobId)
    return "waiting-children"
  elseif rcall("ZSCORE", prefix .. "delayed", jobId) then
    rcall("ZREM", prefix .. "delayed", jobId)
    return "delayed"
  elseif rcall("ZSCORE", prefix .. "failed", jobId) then
    rcall("ZREM", prefix .. "failed", jobId)
    return "failed"
  elseif rcall("ZSCORE", prefix .. "prioritized", jobId) then
    rcall("ZREM", prefix .. "prioritized", jobId)
    return "prioritized"
  -- We remove only 1 element from the list, since we assume they are not added multiple times
  elseif rcall("LREM", prefix .. "wait", 1, jobId) == 1 then
    return "wait"
  elseif rcall("LREM", prefix .. "paused", 1, jobId) == 1 then
    return "paused"
  elseif rcall("LREM", prefix .. "active", 1, jobId) == 1 then
    return "active"
  end
  return "unknown"
end
--[[
  Function to remove job keys.
]]
local function removeJobKeys(jobKey)
  return rcall("DEL", jobKey, jobKey .. ':logs', jobKey .. ':dependencies',
    jobKey .. ':processed', jobKey .. ':failed', jobKey .. ':unsuccessful')
end
--[[
  Check if this job has a parent. If so we will just remove it from
  the parent child list, but if it is the last child we should move the parent to "wait/paused"
  which requires code from "moveToFinished"
]]
-- Includes
--[[
  Function to add job in target list and add marker if needed.
]]
-- Includes
--[[
  Add marker if needed when a job is available.
]]
local function addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
  if not isPausedOrMaxed then
    rcall("ZADD", markerKey, 0, "0")
  end  
end
local function addJobInTargetList(targetKey, markerKey, pushCmd, isPausedOrMaxed, jobId)
  rcall(pushCmd, targetKey, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
--[[
  Function to check for the meta.paused key to decide if we are paused or not
  (since an empty list and !EXISTS are not really the same).
]]
local function getTargetQueueList(queueMetaKey, activeKey, waitKey, pausedKey)
  local queueAttributes = rcall("HMGET", queueMetaKey, "paused", "concurrency")
  if queueAttributes[1] then
    return pausedKey, true
  else
    if queueAttributes[2] then
      local activeCount = rcall("LLEN", activeKey)
      if activeCount >= tonumber(queueAttributes[2]) then
        return waitKey, true
      else
        return waitKey, false
      end
    end
  end
  return waitKey, false
end
local function _moveParentToWait(parentPrefix, parentId, emitEvent)
  local parentTarget, isPausedOrMaxed = getTargetQueueList(parentPrefix .. "meta", parentPrefix .. "active",
    parentPrefix .. "wait", parentPrefix .. "paused")
  addJobInTargetList(parentTarget, parentPrefix .. "marker", "RPUSH", isPausedOrMaxed, parentId)
  if emitEvent then
    local parentEventStream = parentPrefix .. "events"
    rcall("XADD", parentEventStream, "*", "event", "waiting", "jobId", parentId, "prev", "waiting-children")
  end
end
local function removeParentDependencyKey(jobKey, hard, parentKey, baseKey, debounceId)
  if parentKey then
    local parentDependenciesKey = parentKey .. ":dependencies"
    local result = rcall("SREM", parentDependenciesKey, jobKey)
    if result > 0 then
      local pendingDependencies = rcall("SCARD", parentDependenciesKey)
      if pendingDependencies == 0 then
        local parentId = getJobIdFromKey(parentKey)
        local parentPrefix = getJobKeyPrefix(parentKey, parentId)
        local numRemovedElements = rcall("ZREM", parentPrefix .. "waiting-children", parentId)
        if numRemovedElements == 1 then
          if hard then -- remove parent in same queue
            if parentPrefix == baseKey then
              removeParentDependencyKey(parentKey, hard, nil, baseKey, nil)
              removeJobKeys(parentKey)
              if debounceId then
                rcall("DEL", parentPrefix .. "de:" .. debounceId)
              end
            else
              _moveParentToWait(parentPrefix, parentId)
            end
          else
            _moveParentToWait(parentPrefix, parentId, true)
          end
        end
      end
      return true
    end
  else
    local parentAttributes = rcall("HMGET", jobKey, "parentKey", "deid")
    local missedParentKey = parentAttributes[1]
    if( (type(missedParentKey) == "string") and missedParentKey ~= ""
      and (rcall("EXISTS", missedParentKey) == 1)) then
      local parentDependenciesKey = missedParentKey .. ":dependencies"
      local result = rcall("SREM", parentDependenciesKey, jobKey)
      if result > 0 then
        local pendingDependencies = rcall("SCARD", parentDependenciesKey)
        if pendingDependencies == 0 then
          local parentId = getJobIdFromKey(missedParentKey)
          local parentPrefix = getJobKeyPrefix(missedParentKey, parentId)
          local numRemovedElements = rcall("ZREM", parentPrefix .. "waiting-children", parentId)
          if numRemovedElements == 1 then
            if hard then
              if parentPrefix == baseKey then
                removeParentDependencyKey(missedParentKey, hard, nil, baseKey, nil)
                removeJobKeys(missedParentKey)
                if parentAttributes[2] then
                  rcall("DEL", parentPrefix .. "de:" .. parentAttributes[2])
                end
              else
                _moveParentToWait(parentPrefix, parentId)
              end
            else
              _moveParentToWait(parentPrefix, parentId, true)
            end
          end
        end
        return true
      end
    end
  end
  return false
end
local removeJobChildren
local removeJobWithChildren
removeJobChildren = function(prefix, meta, jobKey, options)
    -- Check if this job has children
    -- If so, we are going to try to remove the children recursively in a depth-first way
    -- because if some job is locked, we must exit with an error.
    if not options.ignoreProcessed then
        local processed = rcall("HGETALL", jobKey .. ":processed")
        if #processed > 0 then
            for i = 1, #processed, 2 do
                local childJobId = getJobIdFromKey(processed[i])
                local childJobPrefix = getJobKeyPrefix(processed[i], childJobId)
                removeJobWithChildren(childJobPrefix, meta, childJobId, jobKey, options)
            end
        end
        local failed = rcall("HGETALL", jobKey .. ":failed")
        if #failed > 0 then
            for i = 1, #failed, 2 do
                local childJobId = getJobIdFromKey(failed[i])
                local childJobPrefix = getJobKeyPrefix(failed[i], childJobId)
                removeJobWithChildren(childJobPrefix, meta, childJobId, jobKey, options)
            end
        end
        local unsuccessful = rcall("ZRANGE", jobKey .. ":unsuccessful", 0, -1)
        if #unsuccessful > 0 then
            for i = 1, #unsuccessful, 1 do
                local childJobId = getJobIdFromKey(unsuccessful[i])
                local childJobPrefix = getJobKeyPrefix(unsuccessful[i], childJobId)
                removeJobWithChildren(childJobPrefix, meta, childJobId, jobKey, options)
            end
        end
    end
    local dependencies = rcall("SMEMBERS", jobKey .. ":dependencies")
    if #dependencies > 0 then
        for i, childJobKey in ipairs(dependencies) do
            local childJobId = getJobIdFromKey(childJobKey)
            local childJobPrefix = getJobKeyPrefix(childJobKey, childJobId)
            removeJobWithChildren(childJobPrefix, meta, childJobId, jobKey, options)
        end
    end
end
removeJobWithChildren = function(prefix, meta, jobId, parentKey, options)
    local jobKey = prefix .. jobId
    if options.ignoreLocked then
        if isLocked(prefix, jobId) then
            return
        end
    end
    -- Check if job is in the failed zset
    local failedSet = prefix .. "failed"
    if not (options.ignoreProcessed and rcall("ZSCORE", failedSet, jobId)) then
        removeParentDependencyKey(jobKey, false, parentKey, nil)
        if options.removeChildren then
            removeJobChildren(prefix, meta, jobKey, options)
        end
        local prev = removeJobFromAnyState(prefix, jobId)
        removeDeduplicationKeyIfNeededOnRemoval(prefix, jobKey, jobId)
        if removeJobKeys(jobKey) > 0 then
            local maxEvents = getOrSetMaxEvents(meta)
            rcall("XADD", prefix .. "events", "MAXLEN", "~", maxEvents, "*", "event", "removed",
                "jobId", jobId, "prev", prev)
        end
    end
end
local jobId = ARGV[1]
local shouldRemoveChildren = ARGV[2]
local prefix = ARGV[3]
local jobKey = KEYS[1]
local meta = KEYS[2]
local repeatKey = KEYS[3]
if isJobSchedulerJob(jobId, jobKey, repeatKey) then
    return -8
end
if not isLocked(prefix, jobId, shouldRemoveChildren) then
    local options = {
        removeChildren = shouldRemoveChildren == "1",
        ignoreProcessed = false,
        ignoreLocked = false
    }
    removeJobWithChildren(prefix, meta, jobId, nil, options)
    return 1
end
return 0
`,keys:3},Q={name:"removeJobScheduler",content:`--[[
  Removes a job scheduler and its next scheduled job.
  Input:
    KEYS[1] job schedulers key
    KEYS[2] delayed jobs key
    KEYS[3] events key
    ARGV[1] job scheduler id
    ARGV[2] prefix key
  Output:
    0 - OK
    1 - Missing repeat job
  Events:
    'removed'
]]
local rcall = redis.call
-- Includes
--[[
  Function to remove job keys.
]]
local function removeJobKeys(jobKey)
  return rcall("DEL", jobKey, jobKey .. ':logs', jobKey .. ':dependencies',
    jobKey .. ':processed', jobKey .. ':failed', jobKey .. ':unsuccessful')
end
local jobSchedulerId = ARGV[1]
local prefix = ARGV[2]
local millis = rcall("ZSCORE", KEYS[1], jobSchedulerId)
if millis then
  -- Delete next programmed job.
  local delayedJobId = "repeat:" .. jobSchedulerId .. ":" .. millis
  if(rcall("ZREM", KEYS[2], delayedJobId) == 1) then
    removeJobKeys(prefix .. delayedJobId)
    rcall("XADD", KEYS[3], "*", "event", "removed", "jobId", delayedJobId, "prev", "delayed")
  end
end
if(rcall("ZREM", KEYS[1], jobSchedulerId) == 1) then
  rcall("DEL", KEYS[1] .. ":" .. jobSchedulerId)
  return 0
end
return 1
`,keys:3},Z={name:"removeRepeatable",content:`--[[
  Removes a repeatable job
  Input:
    KEYS[1] repeat jobs key
    KEYS[2] delayed jobs key
    KEYS[3] events key
    ARGV[1] old repeat job id
    ARGV[2] options concat
    ARGV[3] repeat job key
    ARGV[4] prefix key
  Output:
    0 - OK
    1 - Missing repeat job
  Events:
    'removed'
]]
local rcall = redis.call
local millis = rcall("ZSCORE", KEYS[1], ARGV[2])
-- Includes
--[[
  Function to remove job keys.
]]
local function removeJobKeys(jobKey)
  return rcall("DEL", jobKey, jobKey .. ':logs', jobKey .. ':dependencies',
    jobKey .. ':processed', jobKey .. ':failed', jobKey .. ':unsuccessful')
end
-- legacy removal TODO: remove in next breaking change
if millis then
  -- Delete next programmed job.
  local repeatJobId = ARGV[1] .. millis
  if(rcall("ZREM", KEYS[2], repeatJobId) == 1) then
    removeJobKeys(ARGV[4] .. repeatJobId)
    rcall("XADD", KEYS[3], "*", "event", "removed", "jobId", repeatJobId, "prev", "delayed");
  end
end
if(rcall("ZREM", KEYS[1], ARGV[2]) == 1) then
  return 0
end
-- new removal
millis = rcall("ZSCORE", KEYS[1], ARGV[3])
if millis then
  -- Delete next programmed job.
  local repeatJobId = "repeat:" .. ARGV[3] .. ":" .. millis
  if(rcall("ZREM", KEYS[2], repeatJobId) == 1) then
    removeJobKeys(ARGV[4] .. repeatJobId)
    rcall("XADD", KEYS[3], "*", "event", "removed", "jobId", repeatJobId, "prev", "delayed")
  end
end
if(rcall("ZREM", KEYS[1], ARGV[3]) == 1) then
  rcall("DEL", KEYS[1] .. ":" .. ARGV[3])
  return 0
end
return 1
`,keys:3},$={name:"removeUnprocessedChildren",content:`--[[
    Remove a job from all the statuses it may be in as well as all its data.
    In order to be able to remove a job, it cannot be active.
    Input:
      KEYS[1] jobKey
      KEYS[2] meta key
      ARGV[1] prefix
      ARGV[2] jobId
    Events:
      'removed' for every children removed
]]
-- Includes
--[[
    Remove a job from all the statuses it may be in as well as all its data,
    including its children. Active children can be ignored.
    Events:
      'removed'
]]
local rcall = redis.call
-- Includes
--[[
  Functions to destructure job key.
  Just a bit of warning, these functions may be a bit slow and affect performance significantly.
]]
local getJobIdFromKey = function (jobKey)
  return string.match(jobKey, ".*:(.*)")
end
local getJobKeyPrefix = function (jobKey, jobId)
  return string.sub(jobKey, 0, #jobKey - #jobId)
end
--[[
  Function to get max events value or set by default 10000.
]]
local function getOrSetMaxEvents(metaKey)
  local maxEvents = rcall("HGET", metaKey, "opts.maxLenEvents")
  if not maxEvents then
    maxEvents = 10000
    rcall("HSET", metaKey, "opts.maxLenEvents", maxEvents)
  end
  return maxEvents
end
--[[
  Function to check if the job belongs to a job scheduler and
  current delayed job matches with jobId
]]
local function isJobSchedulerJob(jobId, jobKey, jobSchedulersKey)
  local repeatJobKey = rcall("HGET", jobKey, "rjk")
  if repeatJobKey  then
    local prevMillis = rcall("ZSCORE", jobSchedulersKey, repeatJobKey)
    if prevMillis then
      local currentDelayedJobId = "repeat:" .. repeatJobKey .. ":" .. prevMillis
      return jobId == currentDelayedJobId
    end
  end
  return false
end
--[[
  Function to remove deduplication key if needed
  when a job is being removed.
]]
local function removeDeduplicationKeyIfNeededOnRemoval(prefixKey,
  jobKey, jobId)
  local deduplicationId = rcall("HGET", jobKey, "deid")
  if deduplicationId then
    local deduplicationKey = prefixKey .. "de:" .. deduplicationId
    local currentJobId = rcall('GET', deduplicationKey)
    if currentJobId and currentJobId == jobId then
      return rcall("DEL", deduplicationKey)
    end
  end
end
--[[
  Function to remove from any state.
  returns:
    prev state
]]
local function removeJobFromAnyState( prefix, jobId)
  -- We start with the ZSCORE checks, since they have O(1) complexity
  if rcall("ZSCORE", prefix .. "completed", jobId) then
    rcall("ZREM", prefix .. "completed", jobId)
    return "completed"
  elseif rcall("ZSCORE", prefix .. "waiting-children", jobId) then
    rcall("ZREM", prefix .. "waiting-children", jobId)
    return "waiting-children"
  elseif rcall("ZSCORE", prefix .. "delayed", jobId) then
    rcall("ZREM", prefix .. "delayed", jobId)
    return "delayed"
  elseif rcall("ZSCORE", prefix .. "failed", jobId) then
    rcall("ZREM", prefix .. "failed", jobId)
    return "failed"
  elseif rcall("ZSCORE", prefix .. "prioritized", jobId) then
    rcall("ZREM", prefix .. "prioritized", jobId)
    return "prioritized"
  -- We remove only 1 element from the list, since we assume they are not added multiple times
  elseif rcall("LREM", prefix .. "wait", 1, jobId) == 1 then
    return "wait"
  elseif rcall("LREM", prefix .. "paused", 1, jobId) == 1 then
    return "paused"
  elseif rcall("LREM", prefix .. "active", 1, jobId) == 1 then
    return "active"
  end
  return "unknown"
end
--[[
  Function to remove job keys.
]]
local function removeJobKeys(jobKey)
  return rcall("DEL", jobKey, jobKey .. ':logs', jobKey .. ':dependencies',
    jobKey .. ':processed', jobKey .. ':failed', jobKey .. ':unsuccessful')
end
--[[
  Check if this job has a parent. If so we will just remove it from
  the parent child list, but if it is the last child we should move the parent to "wait/paused"
  which requires code from "moveToFinished"
]]
-- Includes
--[[
  Function to add job in target list and add marker if needed.
]]
-- Includes
--[[
  Add marker if needed when a job is available.
]]
local function addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
  if not isPausedOrMaxed then
    rcall("ZADD", markerKey, 0, "0")
  end  
end
local function addJobInTargetList(targetKey, markerKey, pushCmd, isPausedOrMaxed, jobId)
  rcall(pushCmd, targetKey, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
--[[
  Function to check for the meta.paused key to decide if we are paused or not
  (since an empty list and !EXISTS are not really the same).
]]
local function getTargetQueueList(queueMetaKey, activeKey, waitKey, pausedKey)
  local queueAttributes = rcall("HMGET", queueMetaKey, "paused", "concurrency")
  if queueAttributes[1] then
    return pausedKey, true
  else
    if queueAttributes[2] then
      local activeCount = rcall("LLEN", activeKey)
      if activeCount >= tonumber(queueAttributes[2]) then
        return waitKey, true
      else
        return waitKey, false
      end
    end
  end
  return waitKey, false
end
local function _moveParentToWait(parentPrefix, parentId, emitEvent)
  local parentTarget, isPausedOrMaxed = getTargetQueueList(parentPrefix .. "meta", parentPrefix .. "active",
    parentPrefix .. "wait", parentPrefix .. "paused")
  addJobInTargetList(parentTarget, parentPrefix .. "marker", "RPUSH", isPausedOrMaxed, parentId)
  if emitEvent then
    local parentEventStream = parentPrefix .. "events"
    rcall("XADD", parentEventStream, "*", "event", "waiting", "jobId", parentId, "prev", "waiting-children")
  end
end
local function removeParentDependencyKey(jobKey, hard, parentKey, baseKey, debounceId)
  if parentKey then
    local parentDependenciesKey = parentKey .. ":dependencies"
    local result = rcall("SREM", parentDependenciesKey, jobKey)
    if result > 0 then
      local pendingDependencies = rcall("SCARD", parentDependenciesKey)
      if pendingDependencies == 0 then
        local parentId = getJobIdFromKey(parentKey)
        local parentPrefix = getJobKeyPrefix(parentKey, parentId)
        local numRemovedElements = rcall("ZREM", parentPrefix .. "waiting-children", parentId)
        if numRemovedElements == 1 then
          if hard then -- remove parent in same queue
            if parentPrefix == baseKey then
              removeParentDependencyKey(parentKey, hard, nil, baseKey, nil)
              removeJobKeys(parentKey)
              if debounceId then
                rcall("DEL", parentPrefix .. "de:" .. debounceId)
              end
            else
              _moveParentToWait(parentPrefix, parentId)
            end
          else
            _moveParentToWait(parentPrefix, parentId, true)
          end
        end
      end
      return true
    end
  else
    local parentAttributes = rcall("HMGET", jobKey, "parentKey", "deid")
    local missedParentKey = parentAttributes[1]
    if( (type(missedParentKey) == "string") and missedParentKey ~= ""
      and (rcall("EXISTS", missedParentKey) == 1)) then
      local parentDependenciesKey = missedParentKey .. ":dependencies"
      local result = rcall("SREM", parentDependenciesKey, jobKey)
      if result > 0 then
        local pendingDependencies = rcall("SCARD", parentDependenciesKey)
        if pendingDependencies == 0 then
          local parentId = getJobIdFromKey(missedParentKey)
          local parentPrefix = getJobKeyPrefix(missedParentKey, parentId)
          local numRemovedElements = rcall("ZREM", parentPrefix .. "waiting-children", parentId)
          if numRemovedElements == 1 then
            if hard then
              if parentPrefix == baseKey then
                removeParentDependencyKey(missedParentKey, hard, nil, baseKey, nil)
                removeJobKeys(missedParentKey)
                if parentAttributes[2] then
                  rcall("DEL", parentPrefix .. "de:" .. parentAttributes[2])
                end
              else
                _moveParentToWait(parentPrefix, parentId)
              end
            else
              _moveParentToWait(parentPrefix, parentId, true)
            end
          end
        end
        return true
      end
    end
  end
  return false
end
--[[
  Function to recursively check if there are no locks
  on the jobs to be removed.
  returns:
    boolean
]]
local function isLocked( prefix, jobId, removeChildren)
  local jobKey = prefix .. jobId;
  -- Check if this job is locked
  local lockKey = jobKey .. ':lock'
  local lock = rcall("GET", lockKey)
  if not lock then
    if removeChildren == "1" then
      local dependencies = rcall("SMEMBERS", jobKey .. ":dependencies")
      if (#dependencies > 0) then
        for i, childJobKey in ipairs(dependencies) do
          -- We need to get the jobId for this job.
          local childJobId = getJobIdFromKey(childJobKey)
          local childJobPrefix = getJobKeyPrefix(childJobKey, childJobId)
          local result = isLocked( childJobPrefix, childJobId, removeChildren )
          if result then
            return true
          end
        end
      end
    end
    return false
  end
  return true
end
local removeJobChildren
local removeJobWithChildren
removeJobChildren = function(prefix, meta, jobKey, options)
    -- Check if this job has children
    -- If so, we are going to try to remove the children recursively in a depth-first way
    -- because if some job is locked, we must exit with an error.
    if not options.ignoreProcessed then
        local processed = rcall("HGETALL", jobKey .. ":processed")
        if #processed > 0 then
            for i = 1, #processed, 2 do
                local childJobId = getJobIdFromKey(processed[i])
                local childJobPrefix = getJobKeyPrefix(processed[i], childJobId)
                removeJobWithChildren(childJobPrefix, meta, childJobId, jobKey, options)
            end
        end
        local failed = rcall("HGETALL", jobKey .. ":failed")
        if #failed > 0 then
            for i = 1, #failed, 2 do
                local childJobId = getJobIdFromKey(failed[i])
                local childJobPrefix = getJobKeyPrefix(failed[i], childJobId)
                removeJobWithChildren(childJobPrefix, meta, childJobId, jobKey, options)
            end
        end
        local unsuccessful = rcall("ZRANGE", jobKey .. ":unsuccessful", 0, -1)
        if #unsuccessful > 0 then
            for i = 1, #unsuccessful, 1 do
                local childJobId = getJobIdFromKey(unsuccessful[i])
                local childJobPrefix = getJobKeyPrefix(unsuccessful[i], childJobId)
                removeJobWithChildren(childJobPrefix, meta, childJobId, jobKey, options)
            end
        end
    end
    local dependencies = rcall("SMEMBERS", jobKey .. ":dependencies")
    if #dependencies > 0 then
        for i, childJobKey in ipairs(dependencies) do
            local childJobId = getJobIdFromKey(childJobKey)
            local childJobPrefix = getJobKeyPrefix(childJobKey, childJobId)
            removeJobWithChildren(childJobPrefix, meta, childJobId, jobKey, options)
        end
    end
end
removeJobWithChildren = function(prefix, meta, jobId, parentKey, options)
    local jobKey = prefix .. jobId
    if options.ignoreLocked then
        if isLocked(prefix, jobId) then
            return
        end
    end
    -- Check if job is in the failed zset
    local failedSet = prefix .. "failed"
    if not (options.ignoreProcessed and rcall("ZSCORE", failedSet, jobId)) then
        removeParentDependencyKey(jobKey, false, parentKey, nil)
        if options.removeChildren then
            removeJobChildren(prefix, meta, jobKey, options)
        end
        local prev = removeJobFromAnyState(prefix, jobId)
        removeDeduplicationKeyIfNeededOnRemoval(prefix, jobKey, jobId)
        if removeJobKeys(jobKey) > 0 then
            local maxEvents = getOrSetMaxEvents(meta)
            rcall("XADD", prefix .. "events", "MAXLEN", "~", maxEvents, "*", "event", "removed",
                "jobId", jobId, "prev", prev)
        end
    end
end
local prefix = ARGV[1]
local jobId = ARGV[2]
local jobKey = KEYS[1]
local metaKey = KEYS[2]
local options = {
  removeChildren = "1",
  ignoreProcessed = true,
  ignoreLocked = true
}
removeJobChildren(prefix, metaKey, jobKey, options) 
`,keys:2},H={name:"reprocessJob",content:`--[[
  Attempts to reprocess a job
  Input:
    KEYS[1] job key
    KEYS[2] events stream
    KEYS[3] job state
    KEYS[4] wait key
    KEYS[5] meta
    KEYS[6] paused key
    KEYS[7] active key
    KEYS[8] marker key
    ARGV[1] job.id
    ARGV[2] (job.opts.lifo ? 'R' : 'L') + 'PUSH'
    ARGV[3] propVal - failedReason/returnvalue
    ARGV[4] prev state - failed/completed
  Output:
     1 means the operation was a success
    -1 means the job does not exist
    -3 means the job was not found in the expected set.
]]
local rcall = redis.call;
-- Includes
--[[
  Function to add job in target list and add marker if needed.
]]
-- Includes
--[[
  Add marker if needed when a job is available.
]]
local function addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
  if not isPausedOrMaxed then
    rcall("ZADD", markerKey, 0, "0")
  end  
end
local function addJobInTargetList(targetKey, markerKey, pushCmd, isPausedOrMaxed, jobId)
  rcall(pushCmd, targetKey, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
--[[
  Function to get max events value or set by default 10000.
]]
local function getOrSetMaxEvents(metaKey)
  local maxEvents = rcall("HGET", metaKey, "opts.maxLenEvents")
  if not maxEvents then
    maxEvents = 10000
    rcall("HSET", metaKey, "opts.maxLenEvents", maxEvents)
  end
  return maxEvents
end
--[[
  Function to check for the meta.paused key to decide if we are paused or not
  (since an empty list and !EXISTS are not really the same).
]]
local function getTargetQueueList(queueMetaKey, activeKey, waitKey, pausedKey)
  local queueAttributes = rcall("HMGET", queueMetaKey, "paused", "concurrency")
  if queueAttributes[1] then
    return pausedKey, true
  else
    if queueAttributes[2] then
      local activeCount = rcall("LLEN", activeKey)
      if activeCount >= tonumber(queueAttributes[2]) then
        return waitKey, true
      else
        return waitKey, false
      end
    end
  end
  return waitKey, false
end
if rcall("EXISTS", KEYS[1]) == 1 then
  local jobId = ARGV[1]
  if (rcall("ZREM", KEYS[3], jobId) == 1) then
    rcall("HDEL", KEYS[1], "finishedOn", "processedOn", ARGV[3])
    local target, isPausedOrMaxed = getTargetQueueList(KEYS[5], KEYS[7], KEYS[4], KEYS[6])
    addJobInTargetList(target, KEYS[8], ARGV[2], isPausedOrMaxed, jobId)
    local maxEvents = getOrSetMaxEvents(KEYS[5])
    -- Emit waiting event
    rcall("XADD", KEYS[2], "MAXLEN", "~", maxEvents, "*", "event", "waiting",
      "jobId", jobId, "prev", ARGV[4]);
    return 1
  else
    return -3
  end
else
  return -1
end
`,keys:8},X={name:"retryJob",content:`--[[
  Retries a failed job by moving it back to the wait queue.
    Input:
      KEYS[1]  'active',
      KEYS[2]  'wait'
      KEYS[3]  'paused'
      KEYS[4]  job key
      KEYS[5]  'meta'
      KEYS[6]  events stream
      KEYS[7]  delayed key
      KEYS[8]  prioritized key
      KEYS[9]  'pc' priority counter
      KEYS[10] 'marker'
      KEYS[11] 'stalled'
      ARGV[1]  key prefix
      ARGV[2]  timestamp
      ARGV[3]  pushCmd
      ARGV[4]  jobId
      ARGV[5]  token
      ARGV[6]  optional job fields to update
    Events:
      'waiting'
    Output:
     0  - OK
     -1 - Missing key
     -2 - Missing lock
     -3 - Job not in active set
]]
local rcall = redis.call
-- Includes
--[[
  Function to add job in target list and add marker if needed.
]]
-- Includes
--[[
  Add marker if needed when a job is available.
]]
local function addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
  if not isPausedOrMaxed then
    rcall("ZADD", markerKey, 0, "0")
  end  
end
local function addJobInTargetList(targetKey, markerKey, pushCmd, isPausedOrMaxed, jobId)
  rcall(pushCmd, targetKey, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
--[[
  Function to add job considering priority.
]]
-- Includes
--[[
  Function to get priority score.
]]
local function getPriorityScore(priority, priorityCounterKey)
  local prioCounter = rcall("INCR", priorityCounterKey)
  return priority * 0x100000000 + prioCounter % 0x100000000
end
local function addJobWithPriority(markerKey, prioritizedKey, priority, jobId, priorityCounterKey,
  isPausedOrMaxed)
  local score = getPriorityScore(priority, priorityCounterKey)
  rcall("ZADD", prioritizedKey, score, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
--[[
  Function to get max events value or set by default 10000.
]]
local function getOrSetMaxEvents(metaKey)
  local maxEvents = rcall("HGET", metaKey, "opts.maxLenEvents")
  if not maxEvents then
    maxEvents = 10000
    rcall("HSET", metaKey, "opts.maxLenEvents", maxEvents)
  end
  return maxEvents
end
--[[
  Function to check for the meta.paused key to decide if we are paused or not
  (since an empty list and !EXISTS are not really the same).
]]
local function getTargetQueueList(queueMetaKey, activeKey, waitKey, pausedKey)
  local queueAttributes = rcall("HMGET", queueMetaKey, "paused", "concurrency")
  if queueAttributes[1] then
    return pausedKey, true
  else
    if queueAttributes[2] then
      local activeCount = rcall("LLEN", activeKey)
      if activeCount >= tonumber(queueAttributes[2]) then
        return waitKey, true
      else
        return waitKey, false
      end
    end
  end
  return waitKey, false
end
--[[
  Function to check if queue is paused or maxed
  (since an empty list and !EXISTS are not really the same).
]]
local function isQueuePausedOrMaxed(queueMetaKey, activeKey)
  local queueAttributes = rcall("HMGET", queueMetaKey, "paused", "concurrency")
  if queueAttributes[1] then
    return true
  else
    if queueAttributes[2] then
      local activeCount = rcall("LLEN", activeKey)
      return activeCount >= tonumber(queueAttributes[2])
    end
  end
  return false
end
--[[
  Updates the delay set, by moving delayed jobs that should
  be processed now to "wait".
     Events:
      'waiting'
]]
-- Includes
-- Try to get as much as 1000 jobs at once
local function promoteDelayedJobs(delayedKey, markerKey, targetKey, prioritizedKey,
                                  eventStreamKey, prefix, timestamp, priorityCounterKey, isPaused)
    local jobs = rcall("ZRANGEBYSCORE", delayedKey, 0, (timestamp + 1) * 0x1000 - 1, "LIMIT", 0, 1000)
    if (#jobs > 0) then
        rcall("ZREM", delayedKey, unpack(jobs))
        for _, jobId in ipairs(jobs) do
            local jobKey = prefix .. jobId
            local priority =
                tonumber(rcall("HGET", jobKey, "priority")) or 0
            if priority == 0 then
                -- LIFO or FIFO
                rcall("LPUSH", targetKey, jobId)
            else
                local score = getPriorityScore(priority, priorityCounterKey)
                rcall("ZADD", prioritizedKey, score, jobId)
            end
            -- Emit waiting event
            rcall("XADD", eventStreamKey, "*", "event", "waiting", "jobId",
                  jobId, "prev", "delayed")
            rcall("HSET", jobKey, "delay", 0)
        end
        addBaseMarkerIfNeeded(markerKey, isPaused)
    end
end
local function removeLock(jobKey, stalledKey, token, jobId)
  if token ~= "0" then
    local lockKey = jobKey .. ':lock'
    local lockToken = rcall("GET", lockKey)
    if lockToken == token then
      rcall("DEL", lockKey)
      rcall("SREM", stalledKey, jobId)
    else
      if lockToken then
        -- Lock exists but token does not match
        return -6
      else
        -- Lock is missing completely
        return -2
      end
    end
  end
  return 0
end
--[[
  Function to update a bunch of fields in a job.
]]
local function updateJobFields(jobKey, msgpackedFields)
  if msgpackedFields and #msgpackedFields > 0 then
    local fieldsToUpdate = cmsgpack.unpack(msgpackedFields)
    if fieldsToUpdate then
      rcall("HMSET", jobKey, unpack(fieldsToUpdate))
    end
  end
end
local target, isPausedOrMaxed = getTargetQueueList(KEYS[5], KEYS[1], KEYS[2], KEYS[3])
local markerKey = KEYS[10]
-- Check if there are delayed jobs that we can move to wait.
-- test example: when there are delayed jobs between retries
promoteDelayedJobs(KEYS[7], markerKey, target, KEYS[8], KEYS[6], ARGV[1], ARGV[2], KEYS[9], isPausedOrMaxed)
local jobKey = KEYS[4]
if rcall("EXISTS", jobKey) == 1 then
  local errorCode = removeLock(jobKey, KEYS[11], ARGV[5], ARGV[4]) 
  if errorCode < 0 then
    return errorCode
  end
  updateJobFields(jobKey, ARGV[6])
  local numRemovedElements = rcall("LREM", KEYS[1], -1, ARGV[4])
  if (numRemovedElements < 1) then return -3 end
  local priority = tonumber(rcall("HGET", jobKey, "priority")) or 0
  --need to re-evaluate after removing job from active
  isPausedOrMaxed = isQueuePausedOrMaxed(KEYS[5], KEYS[1])
  -- Standard or priority add
  if priority == 0 then
    addJobInTargetList(target, markerKey, ARGV[3], isPausedOrMaxed, ARGV[4])
  else
    addJobWithPriority(markerKey, KEYS[8], priority, ARGV[4], KEYS[9], isPausedOrMaxed)
  end
  rcall("HINCRBY", jobKey, "atm", 1)
  local maxEvents = getOrSetMaxEvents(KEYS[5])
  -- Emit waiting event
  rcall("XADD", KEYS[6], "MAXLEN", "~", maxEvents, "*", "event", "waiting",
    "jobId", ARGV[4], "prev", "failed")
  return 0
else
  return -1
end
`,keys:11},ee={name:"saveStacktrace",content:`--[[
  Save stacktrace and failedReason.
  Input:
    KEYS[1] job key
    ARGV[1]  stacktrace
    ARGV[2]  failedReason
  Output:
     0 - OK
    -1 - Missing key
]]
local rcall = redis.call
if rcall("EXISTS", KEYS[1]) == 1 then
  rcall("HMSET", KEYS[1], "stacktrace", ARGV[1], "failedReason", ARGV[2])
  return 0
else
  return -1
end
`,keys:1},et={name:"updateData",content:`--[[
  Update job data
  Input:
    KEYS[1] Job id key
    ARGV[1] data
  Output:
    0 - OK
   -1 - Missing job.
]]
local rcall = redis.call
if rcall("EXISTS",KEYS[1]) == 1 then -- // Make sure job exists
  rcall("HSET", KEYS[1], "data", ARGV[1])
  return 0
else
  return -1
end
`,keys:1},er={name:"updateJobScheduler",content:`--[[
  Updates a job scheduler and adds next delayed job
  Input:
    KEYS[1]  'repeat' key
    KEYS[2]  'delayed'
    KEYS[3]  'wait' key
    KEYS[4]  'paused' key
    KEYS[5]  'meta'
    KEYS[6]  'prioritized' key
    KEYS[7]  'marker',
    KEYS[8]  'id'
    KEYS[9]  events stream key
    KEYS[10] 'pc' priority counter
    KEYS[11] producer key
    KEYS[12] 'active' key
    ARGV[1] next milliseconds
    ARGV[2] jobs scheduler id
    ARGV[3] Json stringified delayed data
    ARGV[4] msgpacked delayed opts
    ARGV[5] timestamp
    ARGV[6] prefix key
    ARGV[7] producer id
    Output:
      next delayed job id  - OK
]]
local rcall = redis.call
local repeatKey = KEYS[1]
local delayedKey = KEYS[2]
local waitKey = KEYS[3]
local pausedKey = KEYS[4]
local metaKey = KEYS[5]
local prioritizedKey = KEYS[6]
local nextMillis = ARGV[1]
local jobSchedulerId = ARGV[2]
local timestamp = ARGV[5]
local prefixKey = ARGV[6]
local producerId = ARGV[7]
-- Includes
--[[
  Add delay marker if needed.
]]
-- Includes
--[[
  Adds a delayed job to the queue by doing the following:
    - Creates a new job key with the job data.
    - adds to delayed zset.
    - Emits a global event 'delayed' if the job is delayed.
]]
-- Includes
--[[
  Add delay marker if needed.
]]
-- Includes
--[[
  Function to return the next delayed job timestamp.
]]
local function getNextDelayedTimestamp(delayedKey)
  local result = rcall("ZRANGE", delayedKey, 0, 0, "WITHSCORES")
  if #result then
    local nextTimestamp = tonumber(result[2])
    if nextTimestamp ~= nil then
      return nextTimestamp / 0x1000
    end
  end
end
local function addDelayMarkerIfNeeded(markerKey, delayedKey)
  local nextTimestamp = getNextDelayedTimestamp(delayedKey)
  if nextTimestamp ~= nil then
    -- Replace the score of the marker with the newest known
    -- next timestamp.
    rcall("ZADD", markerKey, nextTimestamp, "1")
  end
end
--[[
  Bake in the job id first 12 bits into the timestamp
  to guarantee correct execution order of delayed jobs
  (up to 4096 jobs per given timestamp or 4096 jobs apart per timestamp)
  WARNING: Jobs that are so far apart that they wrap around will cause FIFO to fail
]]
local function getDelayedScore(delayedKey, timestamp, delay)
  local delayedTimestamp = (delay > 0 and (tonumber(timestamp) + delay)) or tonumber(timestamp)
  local minScore = delayedTimestamp * 0x1000
  local maxScore = (delayedTimestamp + 1 ) * 0x1000 - 1
  local result = rcall("ZREVRANGEBYSCORE", delayedKey, maxScore,
    minScore, "WITHSCORES","LIMIT", 0, 1)
  if #result then
    local currentMaxScore = tonumber(result[2])
    if currentMaxScore ~= nil then
      if currentMaxScore >= maxScore then
        return maxScore, delayedTimestamp
      else
        return currentMaxScore + 1, delayedTimestamp
      end
    end
  end
  return minScore, delayedTimestamp
end
local function addDelayedJob(jobId, delayedKey, eventsKey, timestamp,
  maxEvents, markerKey, delay)
  local score, delayedTimestamp = getDelayedScore(delayedKey, timestamp, tonumber(delay))
  rcall("ZADD", delayedKey, score, jobId)
  rcall("XADD", eventsKey, "MAXLEN", "~", maxEvents, "*", "event", "delayed",
    "jobId", jobId, "delay", delayedTimestamp)
  -- mark that a delayed job is available
  addDelayMarkerIfNeeded(markerKey, delayedKey)
end
--[[
  Function to add job considering priority.
]]
-- Includes
--[[
  Add marker if needed when a job is available.
]]
local function addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
  if not isPausedOrMaxed then
    rcall("ZADD", markerKey, 0, "0")
  end  
end
--[[
  Function to get priority score.
]]
local function getPriorityScore(priority, priorityCounterKey)
  local prioCounter = rcall("INCR", priorityCounterKey)
  return priority * 0x100000000 + prioCounter % 0x100000000
end
local function addJobWithPriority(markerKey, prioritizedKey, priority, jobId, priorityCounterKey,
  isPausedOrMaxed)
  local score = getPriorityScore(priority, priorityCounterKey)
  rcall("ZADD", prioritizedKey, score, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
--[[
  Function to check for the meta.paused key to decide if we are paused or not
  (since an empty list and !EXISTS are not really the same).
]]
local function isQueuePaused(queueMetaKey)
  return rcall("HEXISTS", queueMetaKey, "paused") == 1
end
--[[
  Function to store a job
]]
local function storeJob(eventsKey, jobIdKey, jobId, name, data, opts, timestamp,
                        parentKey, parentData, repeatJobKey)
    local jsonOpts = cjson.encode(opts)
    local delay = opts['delay'] or 0
    local priority = opts['priority'] or 0
    local debounceId = opts['de'] and opts['de']['id']
    local optionalValues = {}
    if parentKey ~= nil then
        table.insert(optionalValues, "parentKey")
        table.insert(optionalValues, parentKey)
        table.insert(optionalValues, "parent")
        table.insert(optionalValues, parentData)
    end
    if repeatJobKey then
        table.insert(optionalValues, "rjk")
        table.insert(optionalValues, repeatJobKey)
    end
    if debounceId then
        table.insert(optionalValues, "deid")
        table.insert(optionalValues, debounceId)
    end
    rcall("HMSET", jobIdKey, "name", name, "data", data, "opts", jsonOpts,
          "timestamp", timestamp, "delay", delay, "priority", priority,
          unpack(optionalValues))
    rcall("XADD", eventsKey, "*", "event", "added", "jobId", jobId, "name", name)
    return delay, priority
end
--[[
  Function to check for the meta.paused key to decide if we are paused or not
  (since an empty list and !EXISTS are not really the same).
]]
local function getTargetQueueList(queueMetaKey, activeKey, waitKey, pausedKey)
  local queueAttributes = rcall("HMGET", queueMetaKey, "paused", "concurrency")
  if queueAttributes[1] then
    return pausedKey, true
  else
    if queueAttributes[2] then
      local activeCount = rcall("LLEN", activeKey)
      if activeCount >= tonumber(queueAttributes[2]) then
        return waitKey, true
      else
        return waitKey, false
      end
    end
  end
  return waitKey, false
end
--[[
  Function to add job in target list and add marker if needed.
]]
-- Includes
local function addJobInTargetList(targetKey, markerKey, pushCmd, isPausedOrMaxed, jobId)
  rcall(pushCmd, targetKey, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
local function addJobFromScheduler(jobKey, jobId, rawOpts, waitKey, pausedKey, activeKey, metaKey, 
  prioritizedKey, priorityCounter, delayedKey, markerKey, eventsKey, name, maxEvents, timestamp,
  data, jobSchedulerId)
  local opts = cmsgpack.unpack(rawOpts)
  local delay, priority = storeJob(eventsKey, jobKey, jobId, name, data,
    opts, timestamp, nil, nil, jobSchedulerId)
  if delay ~= 0 then
    addDelayedJob(jobId, delayedKey, eventsKey, timestamp, maxEvents, markerKey, delay)
  else
    local target, isPausedOrMaxed = getTargetQueueList(metaKey, activeKey, waitKey, pausedKey)
    -- Standard or priority add
    if priority == 0 then
      local pushCmd = opts['lifo'] and 'RPUSH' or 'LPUSH'
      addJobInTargetList(target, markerKey, pushCmd, isPausedOrMaxed, jobId)
    else
      -- Priority add
      addJobWithPriority(markerKey, prioritizedKey, priority, jobId, priorityCounter, isPausedOrMaxed)
    end
    -- Emit waiting event
    rcall("XADD", eventsKey, "MAXLEN", "~", maxEvents,  "*", "event", "waiting", "jobId", jobId)
  end
end
--[[
  Function to get max events value or set by default 10000.
]]
local function getOrSetMaxEvents(metaKey)
  local maxEvents = rcall("HGET", metaKey, "opts.maxLenEvents")
  if not maxEvents then
    maxEvents = 10000
    rcall("HSET", metaKey, "opts.maxLenEvents", maxEvents)
  end
  return maxEvents
end
local schedulerKey = repeatKey .. ":" .. jobSchedulerId
local nextDelayedJobId = "repeat:" .. jobSchedulerId .. ":" .. nextMillis
local nextDelayedJobKey = schedulerKey .. ":" .. nextMillis
-- Validate that scheduler exists.
local prevMillis = rcall("ZSCORE", repeatKey, jobSchedulerId)
if prevMillis then
    local currentDelayedJobId = "repeat:" .. jobSchedulerId .. ":" .. prevMillis
    if producerId == currentDelayedJobId then
        local eventsKey = KEYS[9]
        local maxEvents = getOrSetMaxEvents(metaKey)
        if rcall("EXISTS", nextDelayedJobKey) ~= 1 then
            local schedulerAttributes = rcall("HMGET", schedulerKey, "name", "data")
            rcall("ZADD", repeatKey, nextMillis, jobSchedulerId)
            rcall("HINCRBY", schedulerKey, "ic", 1)
            rcall("INCR", KEYS[8])
            -- TODO: remove this workaround in next breaking change,
            -- all job-schedulers must save job data
            local templateData = schedulerAttributes[2] or ARGV[3]
            if templateData and templateData ~= '{}' then
                rcall("HSET", schedulerKey, "data", templateData)
            end
            addJobFromScheduler(nextDelayedJobKey, nextDelayedJobId, ARGV[4], waitKey, pausedKey, 
                KEYS[12], metaKey, prioritizedKey, KEYS[10], delayedKey, KEYS[7], eventsKey, 
                schedulerAttributes[1], maxEvents, ARGV[5], templateData or '{}', jobSchedulerId)
            -- TODO: remove this workaround in next breaking change
            if KEYS[11] ~= "" then
                rcall("HSET", KEYS[11], "nrjid", nextDelayedJobId)
            end
            return nextDelayedJobId .. "" -- convert to string
        else
            rcall("XADD", eventsKey, "MAXLEN", "~", maxEvents, "*", "event",
                "duplicated", "jobId", nextDelayedJobId)
        end
    end
end
`,keys:12},en={name:"updateProgress",content:`--[[
  Update job progress
  Input:
    KEYS[1] Job id key
    KEYS[2] event stream key
    KEYS[3] meta key
    ARGV[1] id
    ARGV[2] progress
  Output:
     0 - OK
    -1 - Missing job.
  Event:
    progress(jobId, progress)
]]
local rcall = redis.call
-- Includes
--[[
  Function to get max events value or set by default 10000.
]]
local function getOrSetMaxEvents(metaKey)
  local maxEvents = rcall("HGET", metaKey, "opts.maxLenEvents")
  if not maxEvents then
    maxEvents = 10000
    rcall("HSET", metaKey, "opts.maxLenEvents", maxEvents)
  end
  return maxEvents
end
if rcall("EXISTS", KEYS[1]) == 1 then -- // Make sure job exists
    local maxEvents = getOrSetMaxEvents(KEYS[3])
    rcall("HSET", KEYS[1], "progress", ARGV[2])
    rcall("XADD", KEYS[2], "MAXLEN", "~", maxEvents, "*", "event", "progress",
          "jobId", ARGV[1], "data", ARGV[2]);
    return 0
else
    return -1
end
`,keys:3},ea={name:"updateRepeatableJobMillis",content:`--[[
  Adds a repeatable job
    Input:
      KEYS[1] 'repeat' key
      ARGV[1] next milliseconds
      ARGV[2] custom key
      ARGV[3] legacy custom key TODO: remove this logic in next breaking change
      Output:
        repeatableKey  - OK
]]
local rcall = redis.call
local repeatKey = KEYS[1]
local nextMillis = ARGV[1]
local customKey = ARGV[2]
local legacyCustomKey = ARGV[3]
if rcall("ZSCORE", repeatKey, customKey) then
    rcall("ZADD", repeatKey, nextMillis, customKey)
    return customKey
elseif rcall("ZSCORE", repeatKey, legacyCustomKey) ~= false then
    rcall("ZADD", repeatKey, nextMillis, legacyCustomKey)
    return legacyCustomKey
end
return ''
`,keys:1};class ei extends i.EventEmitter{constructor(e,t){if(super(),this.extraOptions=t,this.capabilities={canDoubleTimeout:!1,canBlockFor1Ms:!0},this.status="initializing",this.packageVersion=c.i,this.extraOptions=Object.assign({shared:!1,blocking:!0,skipVersionCheck:!1,skipWaitingForReady:!1},t),(0,d.Y1)(e)){if(this._client=e,this._client.options.keyPrefix)throw Error("BullMQ: ioredis does not support ioredis prefixes, use the prefix option instead.");(0,d.OV)(this._client)?this.opts=this._client.options.redisOptions:this.opts=this._client.options,this.checkBlockingOptions("BullMQ: Your redis options maxRetriesPerRequest must be null.",this.opts,!0)}else this.checkBlockingOptions("BullMQ: WARNING! Your redis options maxRetriesPerRequest must be null and will be overridden by BullMQ.",e),this.opts=Object.assign({port:6379,host:"127.0.0.1",retryStrategy:function(e){return Math.max(Math.min(Math.exp(e),2e4),1e3)}},e),this.extraOptions.blocking&&(this.opts.maxRetriesPerRequest=null);this.skipVersionCheck=(null==t?void 0:t.skipVersionCheck)||!!(this.opts&&this.opts.skipVersionCheck),this.handleClientError=e=>{this.emit("error",e)},this.handleClientClose=()=>{this.emit("close")},this.handleClientReady=()=>{this.emit("ready")},this.initializing=this.init(),this.initializing.catch(e=>this.emit("error",e))}checkBlockingOptions(e,t,r=!1){if(this.extraOptions.blocking&&t&&t.maxRetriesPerRequest){if(r)throw Error(e);console.error(e)}}static async waitUntilReady(e){let t,r,n;if("ready"!==e.status){if("wait"===e.status)return e.connect();if("end"===e.status)throw Error(l.CONNECTION_CLOSED_ERROR_MSG);try{await new Promise((a,i)=>{let s;n=e=>{s=e},t=()=>{a()},r=()=>{"end"!==e.status?i(s||Error(l.CONNECTION_CLOSED_ERROR_MSG)):s?i(s):a()},(0,d.xP)(e,3),e.once("ready",t),e.on("end",r),e.once("error",n)})}finally{e.removeListener("end",r),e.removeListener("error",n),e.removeListener("ready",t),(0,d.LG)(e,3)}}}get client(){return this.initializing}loadCommands(e,t){let r=t||n;for(let t in r){let n=`${r[t].name}:${e}`;this._client[n]||this._client.defineCommand(n,{numberOfKeys:r[t].keys,lua:r[t].content})}}async init(){if(!this._client){let e=this.opts,{url:t}=e,r=(0,a._T)(e,["url"]);this._client=t?new(o())(t,r):new(o())(r)}if((0,d.xP)(this._client,3),this._client.on("error",this.handleClientError),this._client.on("close",this.handleClientClose),this._client.on("ready",this.handleClientReady),this.extraOptions.skipWaitingForReady||await ei.waitUntilReady(this._client),this.loadCommands(this.packageVersion),"end"!==this._client.status){if(this.version=await this.getRedisVersion(),!0!==this.skipVersionCheck&&!this.closing){if((0,d.J3)(this.version,ei.minimumVersion))throw Error(`Redis version needs to be greater or equal than ${ei.minimumVersion} Current: ${this.version}`);(0,d.J3)(this.version,ei.recommendedMinimumVersion)&&console.warn(`It is highly recommended to use a minimum Redis version of ${ei.recommendedMinimumVersion}
             Current: ${this.version}`)}this.capabilities={canDoubleTimeout:!(0,d.J3)(this.version,"6.0.0"),canBlockFor1Ms:!(0,d.J3)(this.version,"7.0.8")},this.status="ready"}return this._client}async disconnect(e=!0){let t=await this.client;if("end"!==t.status){let r,n;if(!e)return t.disconnect();let a=new Promise((e,a)=>{(0,d.xP)(t,2),t.once("end",e),t.once("error",a),r=e,n=a});t.disconnect();try{await a}finally{(0,d.LG)(t,2),t.removeListener("end",r),t.removeListener("error",n)}}}async reconnect(){return(await this.client).connect()}async close(e=!1){if(!this.closing){let t=this.status;this.status="closing",this.closing=!0;try{"ready"===t&&await this.initializing,this.extraOptions.shared||("initializing"==t||e?this._client.disconnect():await this._client.quit(),this._client.status="end")}catch(e){if((0,d.Zm)(e))throw e}finally{this._client.off("error",this.handleClientError),this._client.off("close",this.handleClientClose),this._client.off("ready",this.handleClientReady),(0,d.LG)(this._client,3),this.removeAllListeners(),this.status="closed"}}}async getRedisVersion(){let e;let t=await this._client.info(),r="redis_version:",n="maxmemory_policy:",a=t.split(/\r?\n/);for(let t=0;t<a.length;t++){if(0===a[t].indexOf(n)){let e=a[t].substr(n.length);"noeviction"!==e&&console.warn(`IMPORTANT! Eviction policy is ${e}. It should be "noeviction"`)}0===a[t].indexOf(r)&&(e=a[t].substr(r.length))}return e}get redisVersion(){return this.version}}ei.minimumVersion="5.0.0",ei.recommendedMinimumVersion="6.2.0"},5144:(e,t,r)=>{"use strict";r.d(t,{w:()=>o});var n=r(2174),a=r(314),i=r(4770),s=r(1381);class o extends s.W{constructor(e,t,r){super(e,t,r),this.repeatStrategy=t.settings&&t.settings.repeatStrategy||d,this.repeatKeyHashAlgorithm=t.settings&&t.settings.repeatKeyHashAlgorithm||"md5"}async updateRepeatableJob(e,t,r,{override:a}){var i,s;let o=Object.assign({},r.repeat);null!==(i=o.pattern)&&void 0!==i||(o.pattern=o.cron),delete o.cron;let d=o.count?o.count+1:1;if(void 0!==o.limit&&d>o.limit)return;let c=Date.now(),{endDate:u}=o;if(u&&c>new Date(u).getTime())return;let p=r.prevMillis||0;c=p<c?c:p;let y=await this.repeatStrategy(c,o,e),{every:h,pattern:m}=o,f=!!((h||m)&&o.immediately),b=f&&h?c-y:void 0;if(y){let i;!p&&r.jobId&&(o.jobId=r.jobId);let c=l(e,o),g=null!==(s=r.repeat.key)&&void 0!==s?s:this.hash(c);if(a)i=await this.scripts.addRepeatableJob(g,y,{name:e,endDate:u?new Date(u).getTime():void 0,tz:o.tz,pattern:m,every:h},c);else{let e=await this.client;i=await this.scripts.updateRepeatableJobMillis(e,g,y,c)}let{immediately:K}=o,v=(0,n._T)(o,["immediately"]);return this.createNextJob(e,y,i,Object.assign(Object.assign({},r),{repeat:Object.assign({offset:b},v)}),t,d,f)}}async createNextJob(e,t,r,n,a,i,s){let o=this.getRepeatJobKey(e,t,r,a),l=Date.now(),d=t+(n.repeat.offset?n.repeat.offset:0)-l,c=Object.assign(Object.assign({},n),{jobId:o,delay:d<0||s?0:d,timestamp:l,prevMillis:t,repeatJobKey:r});return c.repeat=Object.assign(Object.assign({},n.repeat),{count:i}),this.Job.create(this,e,a,c)}getRepeatJobKey(e,t,r,n){return r.split(":").length>2?this.getRepeatJobId({name:e,nextMillis:t,namespace:this.hash(r),jobId:null==n?void 0:n.id}):this.getRepeatDelayedJobId({customKey:r,nextMillis:t})}async removeRepeatable(e,t,r){var n;let a=l(e,Object.assign(Object.assign({},t),{jobId:r})),i=null!==(n=t.key)&&void 0!==n?n:this.hash(a),s=this.getRepeatJobId({name:e,nextMillis:"",namespace:this.hash(a),jobId:null!=r?r:t.jobId,key:t.key});return this.scripts.removeRepeatable(s,a,i)}async removeRepeatableByKey(e){let t=this.keyToData(e),r=this.getRepeatJobId({name:t.name,nextMillis:"",namespace:this.hash(e),jobId:t.id});return this.scripts.removeRepeatable(r,"",e)}async getRepeatableData(e,t,r){let n=await e.hgetall(this.toKey("repeat:"+t));return n?{key:t,name:n.name,endDate:parseInt(n.endDate)||null,tz:n.tz||null,pattern:n.pattern||null,every:n.every||null,next:r}:this.keyToData(t,r)}keyToData(e,t){let r=e.split(":"),n=r.slice(4).join(":")||null;return{key:e,name:r[0],id:r[1]||null,endDate:parseInt(r[2])||null,tz:r[3]||null,pattern:n,next:t}}async getRepeatableJobs(e=0,t=-1,r=!1){let n=await this.client,a=this.keys.repeat,i=r?await n.zrange(a,e,t,"WITHSCORES"):await n.zrevrange(a,e,t,"WITHSCORES"),s=[];for(let e=0;e<i.length;e+=2)s.push(this.getRepeatableData(n,i[e],parseInt(i[e+1])));return Promise.all(s)}async getRepeatableCount(){return(await this.client).zcard(this.toKey("repeat"))}hash(e){return(0,i.createHash)(this.repeatKeyHashAlgorithm).update(e).digest("hex")}getRepeatDelayedJobId({nextMillis:e,customKey:t}){return`repeat:${t}:${e}`}getRepeatJobId({name:e,nextMillis:t,namespace:r,jobId:n,key:a}){let i=null!=a?a:this.hash(`${e}${n||""}${r}`);return`repeat:${i}:${t}`}}function l(e,t){let r=t.endDate?new Date(t.endDate).getTime():"",n=t.tz||"",a=t.pattern||String(t.every)||"",i=t.jobId?t.jobId:"";return`${e}:${i}:${r}:${n}:${a}`}let d=(e,t)=>{let r=t.pattern;if(r&&t.every)throw Error("Both .pattern and .every options are defined for this repeatable job");if(t.every)return Math.floor(e/t.every)*t.every+(t.immediately?0:t.every);let n=new Date(t.startDate&&new Date(t.startDate)>new Date(e)?t.startDate:e),i=(0,a.parseExpression)(r,Object.assign(Object.assign({},t),{currentDate:n}));try{if(t.immediately)return new Date().getTime();return i.next().getTime()}catch(e){}}},9735:(e,t,r)=>{"use strict";r.d(t,{Z:()=>a});var n=r(3442);let a=(e,t)=>async function(r,a){let i,s,o;try{let l=new Promise((l,d)=>{(async()=>{try{o=(e,t)=>{d(Error("Unexpected exit code: "+e+" signal: "+t))},(i=await t.retain(e)).on("exit",o),s=async e=>{var t,a;try{switch(e.cmd){case n.d$.Completed:l(e.value);break;case n.d$.Failed:case n.d$.Error:{let t=Error();Object.assign(t,e.value),d(t);break}case n.d$.Progress:await r.updateProgress(e.value);break;case n.d$.Log:await r.log(e.value);break;case n.d$.MoveToDelayed:await r.moveToDelayed(null===(t=e.value)||void 0===t?void 0:t.timestamp,null===(a=e.value)||void 0===a?void 0:a.token);break;case n.d$.Update:await r.updateData(e.value);break;case n.d$.GetChildrenValues:{let t=await r.getChildrenValues();i.send({requestId:e.requestId,cmd:n.uv.GetChildrenValuesResponse,value:t})}}}catch(e){d(e)}},i.on("message",s),i.send({cmd:n.uv.Start,job:r.asJSONSandbox(),token:a})}catch(e){d(e)}})()});return await l,l}finally{i&&(i.off("message",s),i.off("exit",o),null===i.exitCode&&null===i.signalCode&&t.release(i))}}},5386:(e,t,r)=>{"use strict";let n,a,i,s,o,l,d,c,u,p,y,h;r.d(t,{K:()=>e3});try{v=new TextDecoder}catch(e){}var m,f,b,g,K,v,S,E,I,k,w,j,x,T,A,D,C=0;let O=[];var R=O,M=0,P={},N=0,J=0,L=[],F={useRecords:!1,mapsAsObjects:!0};class _{}let V=new _;V.name="MessagePack 0xC1";var G=!1,q=2;try{Function("")}catch(e){q=1/0}class Y{constructor(e){e&&(!1===e.useRecords&&void 0===e.mapsAsObjects&&(e.mapsAsObjects=!0),!e.sequential||!1===e.trusted||(e.trusted=!0,e.structures||!1==e.useRecords||(e.structures=[],e.maxSharedStructures||(e.maxSharedStructures=0))),e.structures?e.structures.sharedLength=e.structures.length:e.getStructures&&((e.structures=[]).uninitialized=!0,e.structures.sharedLength=0),e.int64AsNumber&&(e.int64AsType="number")),Object.assign(this,e)}unpack(e,t){if(S)return eK(()=>(ev(),this?this.unpack(e,t):Y.prototype.unpack.call(F,e,t)));e.buffer||e.constructor!==ArrayBuffer||(e="undefined"!=typeof Buffer?Buffer.from(e):new Uint8Array(e)),"object"==typeof t?(E=t.end||e.length,C=t.start||0):(C=0,E=t>-1?t:e.length),M=0,J=0,k=null,R=O,w=null,S=e;try{x=e.dataView||(e.dataView=new DataView(e.buffer,e.byteOffset,e.byteLength))}catch(t){if(S=null,e instanceof Uint8Array)throw t;throw Error("Source must be a Uint8Array or Buffer but was a "+(e&&"object"==typeof e?e.constructor.name:typeof e))}return this instanceof Y?(P=this,this.structures?I=this.structures:(!I||I.length>0)&&(I=[])):(P=F,(!I||I.length>0)&&(I=[])),B(t)}unpackMultiple(e,t){let r,n=0;try{G=!0;let a=e.length,i=this?this.unpack(e,a):eE.unpack(e,a);if(t){if(!1===t(i,n,C))return;for(;C<a;)if(n=C,!1===t(B(),n,C))return}else{for(r=[i];C<a;)n=C,r.push(B());return r}}catch(e){throw e.lastPosition=n,e.values=r,e}finally{G=!1,ev()}}_mergeStructures(e,t){A&&(e=A.call(this,e)),Object.isFrozen(e=e||[])&&(e=e.map(e=>e.slice(0)));for(let t=0,r=e.length;t<r;t++){let r=e[t];r&&(r.isShared=!0,t>=32&&(r.highByte=t-32>>5))}for(let r in e.sharedLength=e.length,t||[])if(r>=0){let n=e[r],a=t[r];a&&(n&&((e.restoreStructures||(e.restoreStructures=[]))[r]=n),e[r]=a)}return this.structures=e}decode(e,t){return this.unpack(e,t)}}function B(e){try{let t;if(!P.trusted&&!G){let e=I.sharedLength||0;e<I.length&&(I.length=e)}if(P.randomAccessStructure&&S[C]<64&&S[C]>=32&&T?(t=T(S,C,E,P),S=null,!(e&&e.lazy)&&t&&(t=t.toJSON()),C=E):t=W(),w&&(C=w.postBundlePosition,w=null),G&&(I.restoreStructures=null),C==E)I&&I.restoreStructures&&z(),I=null,S=null,j&&(j=null);else if(C>E)throw Error("Unexpected end of MessagePack data");else if(!G){let e;try{e=JSON.stringify(t,(e,t)=>"bigint"==typeof t?`${t}n`:t).slice(0,100)}catch(t){e="(JSON view not available "+t+")"}throw Error("Data read, but end of buffer not reached "+e)}return t}catch(e){throw I&&I.restoreStructures&&z(),ev(),(e instanceof RangeError||e.message.startsWith("Unexpected end of buffer")||C>E)&&(e.incomplete=!0),e}}function z(){for(let e in I.restoreStructures)I[e]=I.restoreStructures[e];I.restoreStructures=null}function W(){let e=S[C++];if(e<160){if(e<128){if(e<64)return e;{let t=I[63&e]||P.getStructures&&$()[63&e];return t?(t.read||(t.read=Q(t,63&e)),t.read()):e}}if(e<144){if(e-=128,P.mapsAsObjects){let t={};for(let r=0;r<e;r++){let e=ep();"__proto__"===e&&(e="__proto_"),t[e]=W()}return t}{let t=new Map;for(let r=0;r<e;r++)t.set(W(),W());return t}}{let t=Array(e-=144);for(let r=0;r<e;r++)t[r]=W();return P.freezeData?Object.freeze(t):t}}if(e<192){let t=e-160;if(J>=C)return k.slice(C-N,(C+=t)-N);if(0==J&&E<140){let e=t<16?eo(t):es(t);if(null!=e)return e}return H(t)}{let t;switch(e){case 192:return null;case 193:if(w){if((t=W())>0)return w[1].slice(w.position1,w.position1+=t);return w[0].slice(w.position0,w.position0-=t)}return V;case 194:return!1;case 195:return!0;case 196:if(void 0===(t=S[C++]))throw Error("Unexpected end of buffer");return ed(t);case 197:return t=x.getUint16(C),C+=2,ed(t);case 198:return t=x.getUint32(C),C+=4,ed(t);case 199:return ec(S[C++]);case 200:return t=x.getUint16(C),C+=2,ec(t);case 201:return t=x.getUint32(C),C+=4,ec(t);case 202:if(t=x.getFloat32(C),P.useFloat32>2){let e=eS[(127&S[C])<<1|S[C+1]>>7];return C+=4,(e*t+(t>0?.5:-.5)>>0)/e}return C+=4,t;case 203:return t=x.getFloat64(C),C+=8,t;case 204:return S[C++];case 205:return t=x.getUint16(C),C+=2,t;case 206:return t=x.getUint32(C),C+=4,t;case 207:return"number"===P.int64AsType?t=4294967296*x.getUint32(C)+x.getUint32(C+4):"string"===P.int64AsType?t=x.getBigUint64(C).toString():"auto"===P.int64AsType?(t=x.getBigUint64(C))<=BigInt(2)<<BigInt(52)&&(t=Number(t)):t=x.getBigUint64(C),C+=8,t;case 208:return x.getInt8(C++);case 209:return t=x.getInt16(C),C+=2,t;case 210:return t=x.getInt32(C),C+=4,t;case 211:return"number"===P.int64AsType?t=4294967296*x.getInt32(C)+x.getUint32(C+4):"string"===P.int64AsType?t=x.getBigInt64(C).toString():"auto"===P.int64AsType?(t=x.getBigInt64(C))>=BigInt(-2)<<BigInt(52)&&t<=BigInt(2)<<BigInt(52)&&(t=Number(t)):t=x.getBigInt64(C),C+=8,t;case 212:if(114==(t=S[C++]))return eh(63&S[C++]);{let e=L[t];if(e){if(e.read)return C++,e.read(W());if(e.noBuffer)return C++,e();return e(S.subarray(C,++C))}throw Error("Unknown extension "+t)}case 213:if(114==(t=S[C]))return C++,eh(63&S[C++],S[C++]);return ec(2);case 214:return ec(4);case 215:return ec(8);case 216:return ec(16);case 217:if(t=S[C++],J>=C)return k.slice(C-N,(C+=t)-N);return X(t);case 218:if(t=x.getUint16(C),C+=2,J>=C)return k.slice(C-N,(C+=t)-N);return ee(t);case 219:if(t=x.getUint32(C),C+=4,J>=C)return k.slice(C-N,(C+=t)-N);return et(t);case 220:return t=x.getUint16(C),C+=2,en(t);case 221:return t=x.getUint32(C),C+=4,en(t);case 222:return t=x.getUint16(C),C+=2,ea(t);case 223:return t=x.getUint32(C),C+=4,ea(t);default:if(e>=224)return e-256;if(void 0===e){let e=Error("Unexpected end of MessagePack data");throw e.incomplete=!0,e}throw Error("Unknown MessagePack token "+e)}}}let U=/^[a-zA-Z_$][a-zA-Z\d_$]*$/;function Q(e,t){function r(){if(r.count++>q){let r=e.read=Function("r","return function(){return "+(P.freezeData?"Object.freeze":"")+"({"+e.map(e=>"__proto__"===e?"__proto_:r()":U.test(e)?e+":r()":"["+JSON.stringify(e)+"]:r()").join(",")+"})}")(W);return 0===e.highByte&&(e.read=Z(t,e.read)),r()}let n={};for(let t=0,r=e.length;t<r;t++){let r=e[t];"__proto__"===r&&(r="__proto_"),n[r]=W()}return P.freezeData?Object.freeze(n):n}return(r.count=0,0===e.highByte)?Z(t,r):r}let Z=(e,t)=>function(){let r=S[C++];if(0===r)return t();let n=e<32?-(e+(r<<5)):e+(r<<5),a=I[n]||$()[n];if(!a)throw Error("Record id is not defined for "+n);return a.read||(a.read=Q(a,e)),a.read()};function $(){let e=eK(()=>(S=null,P.getStructures()));return I=P._mergeStructures(e,I)}var H=er,X=er,ee=er,et=er;function er(e){let t;if(e<16&&(t=eo(e)))return t;if(e>64&&v)return v.decode(S.subarray(C,C+=e));let r=C+e,n=[];for(t="";C<r;){let e=S[C++];if((128&e)==0)n.push(e);else if((224&e)==192){let t=63&S[C++];n.push((31&e)<<6|t)}else if((240&e)==224){let t=63&S[C++],r=63&S[C++];n.push((31&e)<<12|t<<6|r)}else if((248&e)==240){let t=(7&e)<<18|(63&S[C++])<<12|(63&S[C++])<<6|63&S[C++];t>65535&&(t-=65536,n.push(t>>>10&1023|55296),t=56320|1023&t),n.push(t)}else n.push(e);n.length>=4096&&(t+=ei.apply(String,n),n.length=0)}return n.length>0&&(t+=ei.apply(String,n)),t}function en(e){let t=Array(e);for(let r=0;r<e;r++)t[r]=W();return P.freezeData?Object.freeze(t):t}function ea(e){if(P.mapsAsObjects){let t={};for(let r=0;r<e;r++){let e=ep();"__proto__"===e&&(e="__proto_"),t[e]=W()}return t}{let t=new Map;for(let r=0;r<e;r++)t.set(W(),W());return t}}var ei=String.fromCharCode;function es(e){let t=C,r=Array(e);for(let n=0;n<e;n++){let e=S[C++];if((128&e)>0){C=t;return}r[n]=e}return ei.apply(String,r)}function eo(e){if(e<4){if(e<2){if(0===e)return"";{let e=S[C++];if((128&e)>1){C-=1;return}return ei(e)}}{let t=S[C++],r=S[C++];if((128&t)>0||(128&r)>0){C-=2;return}if(e<3)return ei(t,r);let n=S[C++];if((128&n)>0){C-=3;return}return ei(t,r,n)}}{let t=S[C++],r=S[C++],n=S[C++],a=S[C++];if((128&t)>0||(128&r)>0||(128&n)>0||(128&a)>0){C-=4;return}if(e<6){if(4===e)return ei(t,r,n,a);{let e=S[C++];if((128&e)>0){C-=5;return}return ei(t,r,n,a,e)}}if(e<8){let i=S[C++],s=S[C++];if((128&i)>0||(128&s)>0){C-=6;return}if(e<7)return ei(t,r,n,a,i,s);let o=S[C++];if((128&o)>0){C-=7;return}return ei(t,r,n,a,i,s,o)}{let i=S[C++],s=S[C++],o=S[C++],l=S[C++];if((128&i)>0||(128&s)>0||(128&o)>0||(128&l)>0){C-=8;return}if(e<10){if(8===e)return ei(t,r,n,a,i,s,o,l);{let e=S[C++];if((128&e)>0){C-=9;return}return ei(t,r,n,a,i,s,o,l,e)}}if(e<12){let d=S[C++],c=S[C++];if((128&d)>0||(128&c)>0){C-=10;return}if(e<11)return ei(t,r,n,a,i,s,o,l,d,c);let u=S[C++];if((128&u)>0){C-=11;return}return ei(t,r,n,a,i,s,o,l,d,c,u)}{let d=S[C++],c=S[C++],u=S[C++],p=S[C++];if((128&d)>0||(128&c)>0||(128&u)>0||(128&p)>0){C-=12;return}if(e<14){if(12===e)return ei(t,r,n,a,i,s,o,l,d,c,u,p);{let e=S[C++];if((128&e)>0){C-=13;return}return ei(t,r,n,a,i,s,o,l,d,c,u,p,e)}}{let y=S[C++],h=S[C++];if((128&y)>0||(128&h)>0){C-=14;return}if(e<15)return ei(t,r,n,a,i,s,o,l,d,c,u,p,y,h);let m=S[C++];if((128&m)>0){C-=15;return}return ei(t,r,n,a,i,s,o,l,d,c,u,p,y,h,m)}}}}}function el(){let e,t=S[C++];if(t<192)e=t-160;else switch(t){case 217:e=S[C++];break;case 218:e=x.getUint16(C),C+=2;break;case 219:e=x.getUint32(C),C+=4;break;default:throw Error("Expected string")}return er(e)}function ed(e){return P.copyBuffers?Uint8Array.prototype.slice.call(S,C,C+=e):S.subarray(C,C+=e)}function ec(e){let t=S[C++];if(L[t]){let r;return L[t](S.subarray(C,r=C+=e),e=>{C=e;try{return W()}finally{C=r}})}throw Error("Unknown extension type "+t)}var eu=Array(4096);function ep(){let e,t=S[C++];if(!(t>=160)||!(t<192))return C--,ey(W());if(t-=160,J>=C)return k.slice(C-N,(C+=t)-N);if(!(0==J&&E<180))return H(t);let r=(t<<5^(t>1?x.getUint16(C):t>0?S[C]:0))&4095,n=eu[r],a=C,i=C+t-3,s=0;if(n&&n.bytes==t){for(;a<i;){if((e=x.getUint32(a))!=n[s++]){a=1879048192;break}a+=4}for(i+=3;a<i;)if((e=S[a++])!=n[s++]){a=1879048192;break}if(a===i)return C=a,n.string;i-=3,a=C}for(n=[],eu[r]=n,n.bytes=t;a<i;)e=x.getUint32(a),n.push(e),a+=4;for(i+=3;a<i;)e=S[a++],n.push(e);let o=t<16?eo(t):es(t);return null!=o?n.string=o:n.string=H(t)}function ey(e){if("string"==typeof e)return e;if("number"==typeof e||"boolean"==typeof e||"bigint"==typeof e)return e.toString();if(null==e)return e+"";throw Error("Invalid property type for record",typeof e)}let eh=(e,t)=>{let r=W().map(ey),n=e;void 0!==t&&(e=e<32?-((t<<5)+e):(t<<5)+e,r.highByte=t);let a=I[e];return a&&(a.isShared||G)&&((I.restoreStructures||(I.restoreStructures=[]))[e]=a),I[e]=r,r.read=Q(r,n),r.read()};L[0]=()=>{},L[0].noBuffer=!0,L[66]=e=>{let t=e.length,r=BigInt(128&e[0]?e[0]-256:e[0]);for(let n=1;n<t;n++)r<<=BigInt(8),r+=BigInt(e[n]);return r};let em={Error,TypeError,ReferenceError};L[101]=()=>{let e=W();return(em[e[0]]||Error)(e[1],{cause:e[2]})},L[105]=e=>{let t;if(!1===P.structuredClone)throw Error("Structured clone extension is disabled");let r=x.getUint32(C-4);j||(j=new Map);let n=S[C],a={target:t=n>=144&&n<160||220==n||221==n?[]:{}};j.set(r,a);let i=W();return a.used?Object.assign(t,i):(a.target=i,i)},L[112]=e=>{if(!1===P.structuredClone)throw Error("Structured clone extension is disabled");let t=x.getUint32(C-4),r=j.get(t);return r.used=!0,r.target},L[115]=()=>new Set(W());let ef=["Int8","Uint8","Uint8Clamped","Int16","Uint16","Int32","Uint32","Float32","Float64","BigInt64","BigUint64"].map(e=>e+"Array"),eb="object"==typeof globalThis?globalThis:window;L[116]=e=>{let t=e[0],r=ef[t];if(!r){if(16===t){let t=new ArrayBuffer(e.length-1);return new Uint8Array(t).set(e.subarray(1)),t}throw Error("Could not find typed array for code "+t)}return new eb[r](Uint8Array.prototype.slice.call(e,1).buffer)},L[120]=()=>{let e=W();return new RegExp(e[0],e[1])};let eg=[];function eK(e){D&&D();let t=E,r=C,n=M,a=N,i=J,s=k,o=R,l=j,d=w,c=new Uint8Array(S.slice(0,E)),u=I,p=I.slice(0,I.length),y=P,h=G,m=e();return E=t,C=r,M=n,N=a,J=i,k=s,R=o,j=l,w=d,S=c,G=h,(I=u).splice(0,I.length,...p),P=y,x=new DataView(S.buffer,S.byteOffset,S.byteLength),m}function ev(){S=null,j=null,I=null}L[98]=e=>{let t=(e[0]<<24)+(e[1]<<16)+(e[2]<<8)+e[3],r=C;return C+=t-e.length,w=eg,(w=[el(),el()]).position0=0,w.position1=0,w.postBundlePosition=C,C=r,W()},L[255]=e=>new Date(4==e.length?(16777216*e[0]+(e[1]<<16)+(e[2]<<8)+e[3])*1e3:8==e.length?((e[0]<<22)+(e[1]<<14)+(e[2]<<6)+(e[3]>>2))/1e6+((3&e[3])*4294967296+16777216*e[4]+(e[5]<<16)+(e[6]<<8)+e[7])*1e3:12==e.length?((e[0]<<24)+(e[1]<<16)+(e[2]<<8)+e[3])/1e6+((128&e[4]?-281474976710656:0)+1099511627776*e[6]+4294967296*e[7]+16777216*e[8]+(e[9]<<16)+(e[10]<<8)+e[11])*1e3:"invalid");let eS=Array(147);for(let e=0;e<256;e++)eS[e]=+("1e"+Math.floor(45.15-.30103*e));var eE=new Y({useRecords:!1});eE.unpack,eE.unpackMultiple,eE.unpack,new Uint8Array(new Float32Array(1).buffer,0,4);try{n=new TextEncoder}catch(e){}let eI="undefined"!=typeof Buffer,ek=eI?function(e){return Buffer.allocUnsafeSlow(e)}:Uint8Array,ew=eI?Buffer:Uint8Array,ej=eI?4294967296:2144337920,ex=0,eT=null,eA=/[\u0080-\uFFFF]/,eD=Symbol("record-id");class eC extends Y{constructor(e){let t,r,u,p;super(e),this.offset=0;let y=ew.prototype.utf8Write?function(e,t){return s.utf8Write(e,t,s.byteLength-t)}:!!n&&!!n.encodeInto&&function(e,t){return n.encodeInto(e,s.subarray(t)).written},h=this;e||(e={});let m=e&&e.sequential,f=e.structures||e.saveStructures,b=e.maxSharedStructures;if(null==b&&(b=f?32:0),b>8160)throw Error("Maximum maxSharedStructure is 8160");e.structuredClone&&void 0==e.moreTypes&&(this.moreTypes=!0);let g=e.maxOwnStructures;null==g&&(g=f?32:64),this.structures||!1==e.useRecords||(this.structures=[]);let K=b>32||g+b>64,v=b+64,S=b+g+64;if(S>8256)throw Error("Maximum maxSharedStructure + maxOwnStructure is 8192");let E=[],I=0,k=0;this.pack=this.encode=function(e,n){let a;if(s||(l=(s=new ek(8192)).dataView||(s.dataView=new DataView(s.buffer,0,8192)),ex=0),(d=s.length-10)-ex<2048?(l=(s=new ek(s.length)).dataView||(s.dataView=new DataView(s.buffer,0,s.length)),d=s.length-10,ex=0):ex=ex+7&2147483640,t=ex,n&eq&&(ex+=255&n),p=h.structuredClone?new Map:null,h.bundleStrings&&"string"!=typeof e?(eT=[]).size=1/0:eT=null,u=h.structures){u.uninitialized&&(u=h._mergeStructures(h.getStructures()));let e=u.sharedLength||0;if(e>b)throw Error("Shared structures is larger than maximum shared structures, try increasing maxSharedStructures to "+u.sharedLength);if(!u.transitions){u.transitions=Object.create(null);for(let t=0;t<e;t++){let e=u[t];if(!e)continue;let r,n=u.transitions;for(let t=0,a=e.length;t<a;t++){let a=e[t];(r=n[a])||(r=n[a]=Object.create(null)),n=r}n[eD]=t+64}this.lastNamedStructuresLength=e}m||(u.nextId=e+64)}r&&(r=!1);try{h.randomAccessStructure&&e&&e.constructor&&e.constructor===Object?P(e):x(e);let r=eT;if(eT&&eM(t,x,0),p&&p.idsToInsert){let e=p.idsToInsert.sort((e,t)=>e.offset>t.offset?1:-1),n=e.length,a=-1;for(;r&&n>0;){let i=e[--n].offset+t;i<r.stringsPosition+t&&-1===a&&(a=0),i>r.position+t?a>=0&&(a+=6):(a>=0&&(l.setUint32(r.position+t,l.getUint32(r.position+t)+a),a=-1),r=r.previous,n++)}a>=0&&r&&l.setUint32(r.position+t,l.getUint32(r.position+t)+a),(ex+=6*e.length)>d&&O(ex),h.offset=ex;let i=function(e,t){let r;let n=6*t.length,a=e.length-n;for(;r=t.pop();){let t=r.offset,i=r.id;e.copyWithin(t+n,t,a);let s=t+(n-=6);e[s++]=214,e[s++]=105,e[s++]=i>>24,e[s++]=i>>16&255,e[s++]=i>>8&255,e[s++]=255&i,a=t}return e}(s.subarray(t,ex),e);return p=null,i}if(h.offset=ex,n&eV)return s.start=t,s.end=ex,s;return s.subarray(t,ex)}catch(e){throw a=e,e}finally{if(u&&(w(),r&&h.saveStructures)){let r=u.sharedLength||0,i=s.subarray(t,ex),o=eP(u,h);if(!a){if(!1===h.saveStructures(o,o.isCompatible))return h.pack(e,n);return h.lastNamedStructuresLength=r,s.length>1073741824&&(s=null),i}}s.length>1073741824&&(s=null),n&eG&&(ex=t)}};let w=()=>{k<10&&k++;let e=u.sharedLength||0;if(u.length>e&&!m&&(u.length=e),I>1e4)u.transitions=null,k=0,I=0,E.length>0&&(E=[]);else if(E.length>0&&!m){for(let e=0,t=E.length;e<t;e++)E[e][eD]=0;E=[]}},j=e=>{var t=e.length;t<16?s[ex++]=144|t:t<65536?(s[ex++]=220,s[ex++]=t>>8,s[ex++]=255&t):(s[ex++]=221,l.setUint32(ex,t),ex+=4);for(let r=0;r<t;r++)x(e[r])},x=e=>{ex>d&&(s=O(ex));var r,n=typeof e;if("string"===n){let n,a=e.length;if(eT&&a>=4&&a<4096){if((eT.size+=a)>21760){let e,r;let n=(eT[0]?3*eT[0].length+eT[1].length:0)+10;ex+n>d&&(s=O(ex+n)),eT.position?(r=eT,s[ex]=200,ex+=3,s[ex++]=98,e=ex-t,ex+=4,eM(t,x,0),l.setUint16(e+t-3,ex-t-e)):(s[ex++]=214,s[ex++]=98,e=ex-t,ex+=4),(eT=["",""]).previous=r,eT.size=0,eT.position=e}let r=eA.test(e);eT[r?0:1]+=e,s[ex++]=193,x(r?-a:a);return}n=a<32?1:a<256?2:a<65536?3:5;let i=3*a;if(ex+i>d&&(s=O(ex+i)),a<64||!y){let t,i,o,l=ex+n;for(t=0;t<a;t++)(i=e.charCodeAt(t))<128?s[l++]=i:(i<2048?s[l++]=i>>6|192:((64512&i)==55296&&(64512&(o=e.charCodeAt(t+1)))==56320?(i=65536+((1023&i)<<10)+(1023&o),t++,s[l++]=i>>18|240,s[l++]=i>>12&63|128):s[l++]=i>>12|224,s[l++]=i>>6&63|128),s[l++]=63&i|128);r=l-ex-n}else r=y(e,ex+n);r<32?s[ex++]=160|r:r<256?(n<2&&s.copyWithin(ex+2,ex+1,ex+1+r),s[ex++]=217,s[ex++]=r):r<65536?(n<3&&s.copyWithin(ex+3,ex+2,ex+2+r),s[ex++]=218,s[ex++]=r>>8,s[ex++]=255&r):(n<5&&s.copyWithin(ex+5,ex+3,ex+3+r),s[ex++]=219,l.setUint32(ex,r),ex+=4),ex+=r}else if("number"===n){if(e>>>0===e)e<32||e<128&&!1===this.useRecords||e<64&&!this.randomAccessStructure?s[ex++]=e:e<256?(s[ex++]=204,s[ex++]=e):e<65536?(s[ex++]=205,s[ex++]=e>>8,s[ex++]=255&e):(s[ex++]=206,l.setUint32(ex,e),ex+=4);else if(e>>0===e)e>=-32?s[ex++]=256+e:e>=-128?(s[ex++]=208,s[ex++]=e+256):e>=-32768?(s[ex++]=209,l.setInt16(ex,e),ex+=2):(s[ex++]=210,l.setInt32(ex,e),ex+=4);else{let t;if((t=this.useFloat32)>0&&e<4294967296&&e>=-2147483648){let r;if(s[ex++]=202,l.setFloat32(ex,e),t<4||(r=e*eS[(127&s[ex])<<1|s[ex+1]>>7])>>0===r){ex+=4;return}ex--}s[ex++]=203,l.setFloat64(ex,e),ex+=8}}else if("object"===n||"function"===n){if(e){if(p){let r=p.get(e);if(r){if(!r.id){let e=p.idsToInsert||(p.idsToInsert=[]);r.id=e.push(r)}s[ex++]=214,s[ex++]=112,l.setUint32(ex,r.id),ex+=4;return}p.set(e,{offset:ex-t})}let o=e.constructor;if(o===Object)C(e);else if(o===Array)j(e);else if(o===Map){if(this.mapAsEmptyObject)s[ex++]=128;else for(let[t,n]of((r=e.size)<16?s[ex++]=128|r:r<65536?(s[ex++]=222,s[ex++]=r>>8,s[ex++]=255&r):(s[ex++]=223,l.setUint32(ex,r),ex+=4),e))x(t),x(n)}else{for(let t=0,r=a.length;t<r;t++)if(e instanceof i[t]){let r,n=a[t];if(n.write){n.type&&(s[ex++]=212,s[ex++]=n.type,s[ex++]=0);let t=n.write.call(this,e);t===e?Array.isArray(e)?j(e):C(e):x(t);return}let i=s,o=l,c=ex;s=null;try{r=n.pack.call(this,e,e=>(s=i,i=null,(ex+=e)>d&&O(ex),{target:s,targetView:l,position:ex-e}),x)}finally{i&&(s=i,l=o,ex=c,d=s.length-10)}r&&(r.length+ex>d&&O(r.length+ex),ex=function(e,t,r,n){let a=e.length;switch(a){case 1:t[r++]=212;break;case 2:t[r++]=213;break;case 4:t[r++]=214;break;case 8:t[r++]=215;break;case 16:t[r++]=216;break;default:a<256?(t[r++]=199,t[r++]=a):(a<65536?(t[r++]=200,t[r++]=a>>8):(t[r++]=201,t[r++]=a>>24,t[r++]=a>>16&255,t[r++]=a>>8&255),t[r++]=255&a)}return t[r++]=n,t.set(e,r),r+=a}(r,s,ex,n.type));return}if(Array.isArray(e))j(e);else{if(e.toJSON){let t=e.toJSON();if(t!==e)return x(t)}if("function"===n)return x(this.writeFunction&&this.writeFunction(e));C(e)}}}else s[ex++]=192}else if("boolean"===n)s[ex++]=e?195:194;else if("bigint"===n){if(e<BigInt(1)<<BigInt(63)&&e>=-(BigInt(1)<<BigInt(63)))s[ex++]=211,l.setBigInt64(ex,e);else if(e<BigInt(1)<<BigInt(64)&&e>0)s[ex++]=207,l.setBigUint64(ex,e);else if(this.largeBigIntToFloat)s[ex++]=203,l.setFloat64(ex,Number(e));else if(this.largeBigIntToString)return x(e.toString());else if(this.useBigIntExtension&&e<BigInt(2)**BigInt(1023)&&e>-(BigInt(2)**BigInt(1023))){let t;s[ex++]=199,ex++,s[ex++]=66;let r=[];do{let n=e&BigInt(255);t=(n&BigInt(128))===(e<BigInt(0)?BigInt(128):BigInt(0)),r.push(n),e>>=BigInt(8)}while(!((e===BigInt(0)||e===BigInt(-1))&&t));s[ex-2]=r.length;for(let e=r.length;e>0;)s[ex++]=Number(r[--e]);return}else throw RangeError(e+" was too large to fit in MessagePack 64-bit integer format, use useBigIntExtension, or set largeBigIntToFloat to convert to float-64, or set largeBigIntToString to convert to string");ex+=8}else if("undefined"===n)this.encodeUndefinedAsNil?s[ex++]=192:(s[ex++]=212,s[ex++]=0,s[ex++]=0);else throw Error("Unknown type: "+n)},T=this.variableMapSize||this.coercibleKeyAsNumber||this.skipValues?e=>{let t,r;if(this.skipValues)for(let r in t=[],e)("function"!=typeof e.hasOwnProperty||e.hasOwnProperty(r))&&!this.skipValues.includes(e[r])&&t.push(r);else t=Object.keys(e);let n=t.length;if(n<16?s[ex++]=128|n:n<65536?(s[ex++]=222,s[ex++]=n>>8,s[ex++]=255&n):(s[ex++]=223,l.setUint32(ex,n),ex+=4),this.coercibleKeyAsNumber)for(let a=0;a<n;a++){let n=Number(r=t[a]);x(isNaN(n)?r:n),x(e[r])}else for(let a=0;a<n;a++)x(r=t[a]),x(e[r])}:e=>{s[ex++]=222;let r=ex-t;ex+=2;let n=0;for(let t in e)("function"!=typeof e.hasOwnProperty||e.hasOwnProperty(t))&&(x(t),x(e[t]),n++);if(n>65535)throw Error('Object is too large to serialize with fast 16-bit map size, use the "variableMapSize" option to serialize this object');s[r+++t]=n>>8,s[r+t]=255&n},A=!1===this.useRecords?T:e.progressiveRecords&&!K?e=>{let r,n,a=u.transitions||(u.transitions=Object.create(null)),i=ex++-t;for(let s in e)if("function"!=typeof e.hasOwnProperty||e.hasOwnProperty(s)){if(n=a[s])a=n;else{let o=Object.keys(e),l=a;a=u.transitions;let d=0;for(let e=0,t=o.length;e<t;e++){let t=o[e];!(n=a[t])&&(n=a[t]=Object.create(null),d++),a=n}i+t+1==ex?(ex--,R(a,o,d)):M(a,o,i,d),r=!0,a=l[s]}x(e[s])}if(!r){let r=a[eD];r?s[i+t]=r:M(a,Object.keys(e),i,0)}}:e=>{let t,r=u.transitions||(u.transitions=Object.create(null)),n=0;for(let a in e)("function"!=typeof e.hasOwnProperty||e.hasOwnProperty(a))&&(!(t=r[a])&&(t=r[a]=Object.create(null),n++),r=t);let a=r[eD];for(let t in a?a>=96&&K?(s[ex++]=(31&(a-=96))+96,s[ex++]=a>>5):s[ex++]=a:R(r,r.__keys__||Object.keys(e),n),e)("function"!=typeof e.hasOwnProperty||e.hasOwnProperty(t))&&x(e[t])},D="function"==typeof this.useRecords&&this.useRecords,C=D?e=>{D(e)?A(e):T(e)}:A,O=e=>{let r;if(e>16777216){if(e-t>ej)throw Error("Packed buffer would be larger than maximum buffer size");r=Math.min(ej,4096*Math.round(Math.max((e-t)*(e>67108864?1.25:2),4194304)/4096))}else r=(Math.max(e-t<<2,s.length-1)>>12)+1<<12;let n=new ek(r);return l=n.dataView||(n.dataView=new DataView(n.buffer,0,r)),e=Math.min(e,s.length),s.copy?s.copy(n,0,t,e):n.set(s.slice(t,e)),ex-=t,t=0,d=n.length-10,s=n},R=(e,t,n)=>{let a=u.nextId;a||(a=64),a<v&&this.shouldShareStructure&&!this.shouldShareStructure(t)?((a=u.nextOwnId)<S||(a=v),u.nextOwnId=a+1):(a>=S&&(a=v),u.nextId=a+1);let i=t.highByte=a>=96&&K?a-96>>5:-1;e[eD]=a,e.__keys__=t,u[a-64]=t,a<v?(t.isShared=!0,u.sharedLength=a-63,r=!0,i>=0?(s[ex++]=(31&a)+96,s[ex++]=i):s[ex++]=a):(i>=0?(s[ex++]=213,s[ex++]=114,s[ex++]=(31&a)+96,s[ex++]=i):(s[ex++]=212,s[ex++]=114,s[ex++]=a),n&&(I+=k*n),E.length>=g&&(E.shift()[eD]=0),E.push(e),x(t))},M=(e,r,n,a)=>{let i=s,l=ex,c=d,u=t;ex=0,t=0,(s=o)||(o=s=new ek(8192)),d=s.length-10,R(e,r,a),o=s;let p=ex;if(s=i,ex=l,d=c,t=u,p>1){let e=ex+p-1;e>d&&O(e);let r=n+t;s.copyWithin(r+p,r+1,ex),s.set(o.slice(0,p),r),ex=e}else s[n+t]=o[0]},P=e=>{let n=c(e,s,t,ex,u,O,(e,t,n)=>{if(n)return r=!0;ex=t;let a=s;return(x(e),w(),a!==s)?{position:ex,targetView:l,target:s}:ex},this);if(0===n)return C(e);ex=n}}useBuffer(e){(s=e).dataView||(s.dataView=new DataView(s.buffer,s.byteOffset,s.byteLength)),ex=0}set position(e){ex=e}get position(){return ex}clearSharedData(){this.structures&&(this.structures=[]),this.typedStructs&&(this.typedStructs=[])}}function eO(e,t,r,n){let a=e.byteLength;if(a+1<256){var{target:i,position:s}=r(4+a);i[s++]=199,i[s++]=a+1}else if(a+1<65536){var{target:i,position:s}=r(5+a);i[s++]=200,i[s++]=a+1>>8,i[s++]=a+1&255}else{var{target:i,position:s,targetView:o}=r(7+a);i[s++]=201,o.setUint32(s,a+1),s+=4}i[s++]=116,i[s++]=t,e.buffer||(e=new Uint8Array(e)),i.set(new Uint8Array(e.buffer,e.byteOffset,e.byteLength),s)}function eR(e,t){let r=e.byteLength;if(r<256){var n,a,{target:n,position:a}=t(r+2);n[a++]=196,n[a++]=r}else if(r<65536){var{target:n,position:a}=t(r+3);n[a++]=197,n[a++]=r>>8,n[a++]=255&r}else{var{target:n,position:a,targetView:i}=t(r+5);n[a++]=198,i.setUint32(a,r),a+=4}n.set(e,a)}function eM(e,t,r){if(eT.length>0){l.setUint32(eT.position+e,ex+r-eT.position-e),eT.stringsPosition=ex-e;let n=eT;eT=null,t(n[0]),t(n[1])}}function eP(e,t){return e.isCompatible=e=>{let r=!e||(t.lastNamedStructuresLength||0)===e.length;return r||t._mergeStructures(e),r},e}i=[Date,Set,Error,RegExp,ArrayBuffer,Object.getPrototypeOf(Uint8Array.prototype).constructor,_],a=[{pack(e,t,r){let n=e.getTime()/1e3;if((this.useTimestamp32||0===e.getMilliseconds())&&n>=0&&n<4294967296){let{target:e,targetView:r,position:a}=t(6);e[a++]=214,e[a++]=255,r.setUint32(a,n)}else if(n>0&&n<4294967296){let{target:r,targetView:a,position:i}=t(10);r[i++]=215,r[i++]=255,a.setUint32(i,4e6*e.getMilliseconds()+(n/1e3/4294967296>>0)),a.setUint32(i+4,n)}else if(isNaN(n)){if(this.onInvalidDate)return t(0),r(this.onInvalidDate());let{target:e,targetView:n,position:a}=t(3);e[a++]=212,e[a++]=255,e[a++]=255}else{let{target:r,targetView:a,position:i}=t(15);r[i++]=199,r[i++]=12,r[i++]=255,a.setUint32(i,1e6*e.getMilliseconds()),a.setBigInt64(i+4,BigInt(Math.floor(n)))}}},{pack(e,t,r){if(this.setAsEmptyObject)return t(0),r({});let n=Array.from(e),{target:a,position:i}=t(this.moreTypes?3:0);this.moreTypes&&(a[i++]=212,a[i++]=115,a[i++]=0),r(n)}},{pack(e,t,r){let{target:n,position:a}=t(this.moreTypes?3:0);this.moreTypes&&(n[a++]=212,n[a++]=101,n[a++]=0),r([e.name,e.message,e.cause])}},{pack(e,t,r){let{target:n,position:a}=t(this.moreTypes?3:0);this.moreTypes&&(n[a++]=212,n[a++]=120,n[a++]=0),r([e.source,e.flags])}},{pack(e,t){this.moreTypes?eO(e,16,t):eR(eI?Buffer.from(e):new Uint8Array(e),t)}},{pack(e,t){let r=e.constructor;r!==ew&&this.moreTypes?eO(e,ef.indexOf(r.name),t):eR(e,t)}},{pack(e,t){let{target:r,position:n}=t(1);r[n]=193}}];let eN=new eC({useRecords:!1});eN.pack,eN.pack;let{NEVER:eJ,ALWAYS:eL,DECIMAL_ROUND:eF,DECIMAL_FIT:e_}={NEVER:0,ALWAYS:1,DECIMAL_ROUND:3,DECIMAL_FIT:4},eV=512,eG=1024,eq=2048,eY=["num","object","string","ascii"];eY[16]="date";let eB=[!1,!0,!0,!1,!1,!0,!0,!1];try{Function(""),u=!0}catch(e){}let ez="undefined"!=typeof Buffer;try{y=new TextEncoder}catch(e){}let eW=ez?function(e,t,r){return e.utf8Write(t,r,e.byteLength-r)}:!!y&&!!y.encodeInto&&function(e,t,r){return y.encodeInto(t,e.subarray(r)).written};function eU(e,t,r,n){let a;return(a=e.ascii8||e.num8)?(r.setInt8(t,n,!0),p=t+1,a):(a=e.string16||e.object16)?(r.setInt16(t,n,!0),p=t+2,a):(a=e.num32)?(r.setUint32(t,3758096640+n,!0),p=t+4,a):(a=e.num64)?(r.setFloat64(t,NaN,!0),r.setInt8(t,n),p=t+8,a):void(p=t)}function eQ(e,t,r){let n=eY[t]+(r<<3),a=e[n]||(e[n]=Object.create(null));return a.__type=t,a.__size=r,a.__parent=e,a}Symbol("type"),Symbol("parent"),m=function e(t,r,n,a,i,s,o,l){let d,c=l.typedStructs||(l.typedStructs=[]),u=r.dataView,y=(c.lastStringStart||100)+a,h=r.length-10,m=a;a>h&&(u=(r=s(a)).dataView,a-=n,m-=n,y-=n,n=0,h=r.length-10);let f,b=y,g=c.transitions||(c.transitions=Object.create(null)),K=c.nextId||c.length,v=K<15?1:K<240?2:K<61440?3:K<15728640?4:0;if(0===v)return 0;a+=v;let S=[],E=0;for(let e in t){let i=t[e],l=g[e];switch(l||(g[e]=l={key:e,parent:g,enumerationOffset:0,ascii0:null,ascii8:null,num8:null,string16:null,object16:null,num32:null,float64:null,date64:null}),a>h&&(u=(r=s(a)).dataView,a-=n,m-=n,y-=n,b-=n,n=0,h=r.length-10),typeof i){case"number":if(K<200||!l.num64){if(i>>0===i&&i<536870912&&i>-520093696){i<246&&i>=0&&(l.num8&&!(K>200&&l.num32)||i<32&&!l.num32)?(g=l.num8||eQ(l,0,1),r[a++]=i):(g=l.num32||eQ(l,0,4),u.setUint32(a,i,!0),a+=4);break}if(i<4294967296&&i>=-2147483648&&(u.setFloat32(a,i,!0),eB[r[a+3]>>>5])){let e;if((e=i*eS[(127&r[a+3])<<1|r[a+2]>>7])>>0===e){g=l.num32||eQ(l,0,4),a+=4;break}}}g=l.num64||eQ(l,0,8),u.setFloat64(a,i,!0),a+=8;break;case"string":let v,I=i.length;if(f=b-y,(I<<2)+b>h&&(u=(r=s((I<<2)+b)).dataView,a-=n,m-=n,y-=n,b-=n,n=0,h=r.length-10),I>65280+f>>2){S.push(e,i,a-m);break}let k=b;if(I<64){let e,t,n;for(e=0;e<I;e++)(t=i.charCodeAt(e))<128?r[b++]=t:(t<2048?(v=!0,r[b++]=t>>6|192):((64512&t)==55296&&(64512&(n=i.charCodeAt(e+1)))==56320?(v=!0,t=65536+((1023&t)<<10)+(1023&n),e++,r[b++]=t>>18|240,r[b++]=t>>12&63|128):(v=!0,r[b++]=t>>12|224),r[b++]=t>>6&63|128),r[b++]=63&t|128)}else b+=eW(r,i,b),v=b-k>I;if(f<160||f<246&&(l.ascii8||l.string8)){if(v)(g=l.string8)||(c.length>10&&(g=l.ascii8)?(g.__type=2,l.ascii8=null,l.string8=g,o(null,0,!0)):g=eQ(l,2,1));else if(0!==f||d)(g=l.ascii8)||c.length>10&&(g=l.string8)||(g=eQ(l,3,1));else{d=!0,g=l.ascii0||eQ(l,3,0);break}r[a++]=f}else g=l.string16||eQ(l,2,2),u.setUint16(a,f,!0),a+=2;break;case"object":i?i.constructor===Date?(g=l.date64||eQ(l,16,8),u.setFloat64(a,i.getTime(),!0),a+=8):S.push(e,i,E):(l=eU(l,a,u,-10))?(g=l,a=p):S.push(e,i,E);break;case"boolean":g=l.num8||l.ascii8||eQ(l,0,1),r[a++]=i?249:248;break;case"undefined":(l=eU(l,a,u,-9))?(g=l,a=p):S.push(e,i,E);break;default:S.push(e,i,E)}E++}for(let e=0,t=S.length;e<t;){let t,i=S[e++],s=S[e++],l=S[e++],d=g[i];if(d||(g[i]=d={key:i,parent:g,enumerationOffset:l-E,ascii0:null,ascii8:null,num8:null,string16:null,object16:null,num32:null,float64:null}),s){let e;(f=b-y)<65280?(g=d.object16)?e=2:(g=d.object32)?e=4:(g=eQ(d,1,2),e=2):(g=d.object32||eQ(d,1,4),e=4),"object"==typeof(t=o(s,b))?(b=t.position,u=t.targetView,r=t.target,y-=n,a-=n,m-=n,n=0):b=t,2===e?(u.setUint16(a,f,!0),a+=2):(u.setUint32(a,f,!0),a+=4)}else g=d.object16||eQ(d,1,2),u.setInt16(a,null===s?-10:-9,!0),a+=2;E++}let I=g[eD];if(null==I){let e;I=l.typedStructs.length;let t=[],r=g;for(;void 0!==(e=r.__type);){let n=[e,r.__size,(r=r.__parent).key];r.enumerationOffset&&n.push(r.enumerationOffset),t.push(n),r=r.parent}t.reverse(),g[eD]=I,l.typedStructs[I]=t,o(null,0,!0)}switch(v){case 1:if(I>=16)return 0;r[m]=I+32;break;case 2:if(I>=256)return 0;r[m]=56,r[m+1]=I;break;case 3:if(I>=65536)return 0;r[m]=57,u.setUint16(m+1,I,!0);break;case 4:if(I>=16777216)return 0;u.setUint32(m,(I<<8)+58,!0)}if(a<y){if(y===b)return a;r.copyWithin(a,y,b),b+=a-y,c.lastStringStart=a-m}else if(a>y)return y===b?a:(c.lastStringStart=a-m,e(t,r,n,m,i,s,o,l));return b},f=function(e,t){if(t.typedStructs){let r=new Map;r.set("named",e),r.set("typed",t.typedStructs),e=r}let r=t.lastTypedStructuresLength||0;return e.isCompatible=e=>{let n=!0;return e instanceof Map?((e.get("named")||[]).length!==(t.lastNamedStructuresLength||0)&&(n=!1),(e.get("typed")||[]).length!==r&&(n=!1)):(e instanceof Array||Array.isArray(e))&&e.length!==(t.lastNamedStructuresLength||0)&&(n=!1),n||t._mergeStructures(e),n},t.lastTypedStructuresLength=t.typedStructs&&t.typedStructs.length,e},c=m,eP=f;var eZ=Symbol.for("source");function e$(e){switch(e){case 246:return null;case 247:return;case 248:return!1;case 249:return!0}throw Error("Unknown constant")}b=function(e,t,r,n){let a=e[t++]-32;if(a>=24)switch(a){case 24:a=e[t++];break;case 25:a=e[t++]+(e[t++]<<8);break;case 26:a=e[t++]+(e[t++]<<8)+(e[t++]<<16);break;case 27:a=e[t++]+(e[t++]<<8)+(e[t++]<<16)+(e[t++]<<24)}let i=n.typedStructs&&n.typedStructs[a];if(!i){if(e=Uint8Array.prototype.slice.call(e,t,r),r-=t,t=0,!n.getStructures)throw Error(`Reference to shared structure ${a} without getStructures method`);if(n._mergeStructures(n.getStructures()),!n.typedStructs)throw Error("Could not find any shared typed structures");if(n.lastTypedStructuresLength=n.typedStructs.length,!(i=n.typedStructs[a]))throw Error("Could not find typed structure "+a)}var s=i.construct;if(!s){let e;var o=(s=i.construct=function(){}).prototype;let t=[],r=0;for(let a=0,s=i.length;a<s;a++){let s,o;let[l,d,c,u]=i[a];"__proto__"===c&&(c="__proto_");let p={key:c,offset:r};switch(u?t.splice(a+u,0,p):t.push(p),d){case 0:s=()=>0;break;case 1:s=(e,t)=>{let r=e.bytes[t+p.offset];return r>=246?e$(r):r};break;case 2:s=(e,t)=>{let r=e.bytes,n=(r.dataView||(r.dataView=new DataView(r.buffer,r.byteOffset,r.byteLength))).getUint16(t+p.offset,!0);return n>=65280?e$(255&n):n};break;case 4:s=(e,t)=>{let r=e.bytes,n=(r.dataView||(r.dataView=new DataView(r.buffer,r.byteOffset,r.byteLength))).getUint32(t+p.offset,!0);return n>=4294967040?e$(255&n):n}}switch(p.getRef=s,r+=d,l){case 3:e&&!e.next&&(e.next=p),e=p,p.multiGetCount=0,o=function(e){let t=e.bytes,n=e.position,a=r+n,i=s(e,n);if("number"!=typeof i)return i;let o,l=p.next;for(;l&&"number"!=typeof(o=l.getRef(e,n));)o=null,l=l.next;return(null==o&&(o=e.bytesEnd-a),e.srcString)?e.srcString.slice(i,o):function(e,t,r){let n=S;S=e,C=t;try{return er(r)}finally{S=n}}(t,i+a,o-i)};break;case 2:case 1:e&&!e.next&&(e.next=p),e=p,o=function(e){let t=e.position,a=r+t,i=s(e,t);if("number"!=typeof i)return i;let o=e.bytes,d,c=p.next;for(;c&&"number"!=typeof(d=c.getRef(e,t));)d=null,c=c.next;if(null==d&&(d=e.bytesEnd-a),2===l)return o.toString("utf8",i+a,d+a);h=e;try{return n.unpack(o,{start:i+a,end:d+a})}finally{h=null}};break;case 0:switch(d){case 4:o=function(e){let t=e.bytes,r=t.dataView||(t.dataView=new DataView(t.buffer,t.byteOffset,t.byteLength)),n=e.position+p.offset,a=r.getInt32(n,!0);if(a<536870912){if(a>-520093696)return a;if(a>-536870912)return e$(255&a)}let i=r.getFloat32(n,!0),s=eS[(127&t[n+3])<<1|t[n+2]>>7];return(s*i+(i>0?.5:-.5)>>0)/s};break;case 8:o=function(e){let t=e.bytes,r=(t.dataView||(t.dataView=new DataView(t.buffer,t.byteOffset,t.byteLength))).getFloat64(e.position+p.offset,!0);if(isNaN(r)){let r=t[e.position+p.offset];if(r>=246)return e$(r)}return r};break;case 1:o=function(e){let t=e.bytes[e.position+p.offset];return t<246?t:e$(t)}}break;case 16:o=function(e){let t=e.bytes;return new Date((t.dataView||(t.dataView=new DataView(t.buffer,t.byteOffset,t.byteLength))).getFloat64(e.position+p.offset,!0))}}p.get=o}if(u){let e,r=[],a=[],i=0;for(let s of t){if(n.alwaysLazyProperty&&n.alwaysLazyProperty(s.key)){e=!0;continue}Object.defineProperty(o,s.key,{get:function(e){return function(){return e(this[eZ])}}(s.get),enumerable:!0});let t="v"+i++;a.push(t),r.push("["+JSON.stringify(s.key)+"]:"+t+"(s)")}e&&r.push("__proto__:this");let s=Function(...a,"return function(s){return{"+r.join(",")+"}}").apply(null,t.map(e=>e.get));Object.defineProperty(o,"toJSON",{value(e){return s.call(this,this[eZ])}})}else Object.defineProperty(o,"toJSON",{value(e){let r={};for(let e=0,n=t.length;e<n;e++){let n=t[e].key;r[n]=this[n]}return r}})}var l=new s;return l[eZ]={bytes:e,position:t,srcString:"",bytesEnd:r},l},g=function(e){if(!(e instanceof Map))return e;let t=e.get("typed")||[];Object.isFrozen(t)&&(t=t.map(e=>e.slice(0)));let r=e.get("named"),n=Object.create(null);for(let e=0,r=t.length;e<r;e++){let r=t[e],a=n;for(let[e,t,n]of r){let r=a[n];r||(a[n]=r={key:n,parent:a,enumerationOffset:0,ascii0:null,ascii8:null,num8:null,string16:null,object16:null,num32:null,float64:null,date64:null}),a=eQ(r,e,t)}a[eD]=e}return t.transitions=n,this.typedStructs=t,this.lastTypedStructuresLength=t.length,r},K=function(){h&&(h.bytes=Uint8Array.prototype.slice.call(h.bytes,h.position,h.bytesEnd),h.position=0,h.bytesEnd=h.bytes.length)},T=b,A=g,D=K,r(8220);var eH=r(5807);if(!(void 0!==process.env.MSGPACKR_NATIVE_ACCELERATION_DISABLED&&"true"===process.env.MSGPACKR_NATIVE_ACCELERATION_DISABLED.toLowerCase())){let e;try{"function"==typeof require?e=require("msgpackr-extract"):e=(0,eH.createRequire)("file:///Users/figar_jr/project/android-tv-timer/node_modules/msgpackr/node-index.js")("msgpackr-extract"),e&&function(e){function t(t){return function(r){let n=R[M++];if(null==n){if(w)return er(r);let a=S.byteOffset,i=e(C-t+a,E+a,S.buffer);if("string"==typeof i)n=i,R=O;else if(M=1,J=1,void 0===(n=(R=i)[0]))throw Error("Unexpected end of buffer")}let a=n.length;return a<=r?(C+=r,n):(k=n,N=C,J=C+a,C+=r,n.slice(0,r))}}H=t(1),X=t(2),ee=t(3),et=t(5)}(e.extractStrings)}catch(e){}}var eX=r(3442),e0=r(7565),e1=r(2036);let e2=new eC({useRecords:!1,encodeUndefinedAsNil:!0}).pack;class e3{constructor(e){this.queue=e,this.version=e1.i;let t=this.queue.keys;this.moveToFinishedKeys=[t.wait,t.active,t.prioritized,t.events,t.stalled,t.limiter,t.delayed,t.paused,t.meta,t.pc,void 0,void 0,void 0,void 0]}execCommand(e,t,r){return e[`${t}:${this.version}`](r)}async isJobInList(e,t){let r=await this.queue.client;return Number.isInteger((0,e0.J3)(this.queue.redisVersion,"6.0.6")?await this.execCommand(r,"isJobInList",[e,t]):await r.lpos(e,t))}addDelayedJob(e,t,r,n){let a=this.queue.keys,i=[a.marker,a.meta,a.id,a.delayed,a.completed,a.events];return i.push(e2(n),t.data,r),this.execCommand(e,"addDelayedJob",i)}addPrioritizedJob(e,t,r,n){let a=this.queue.keys,i=[a.marker,a.meta,a.id,a.prioritized,a.completed,a.active,a.events,a.pc];return i.push(e2(n),t.data,r),this.execCommand(e,"addPrioritizedJob",i)}addParentJob(e,t,r,n){let a=this.queue.keys,i=[a.meta,a.id,a.completed,a.events];return i.push(e2(n),t.data,r),this.execCommand(e,"addParentJob",i)}addStandardJob(e,t,r,n){let a=this.queue.keys,i=[a.wait,a.paused,a.meta,a.id,a.completed,a.active,a.events,a.marker];return i.push(e2(n),t.data,r),this.execCommand(e,"addStandardJob",i)}async addJob(e,t,r,n,a={}){let i,s;let o=this.queue.keys,l=t.parent?Object.assign(Object.assign({},t.parent),{fpof:r.fpof,rdof:r.rdof,idof:r.idof,cpof:r.cpof}):null,d=[o[""],void 0!==n?n:"",t.name,t.timestamp,t.parentKey||null,a.waitChildrenKey||null,a.parentDependenciesKey||null,l,t.repeatJobKey,t.deduplicationId?`${o.de}:${t.deduplicationId}`:null];if(r.repeat){let e=Object.assign({},r.repeat);e.startDate&&(e.startDate=+new Date(e.startDate)),e.endDate&&(e.endDate=+new Date(e.endDate)),i=e2(Object.assign(Object.assign({},r),{repeat:e}))}else i=e2(r);if((s=a.waitChildrenKey?await this.addParentJob(e,t,i,d):"number"==typeof r.delay&&r.delay>0?await this.addDelayedJob(e,t,i,d):r.priority?await this.addPrioritizedJob(e,t,i,d):await this.addStandardJob(e,t,i,d))<0)throw this.finishedErrors({code:s,parentKey:a.parentKey,command:"addJob"});return s}pauseArgs(e){let t="wait",r="paused";e||(t="paused",r="wait");let n=[t,r,"meta","prioritized"].map(e=>this.queue.toKey(e));return n.push(this.queue.keys.events,this.queue.keys.delayed,this.queue.keys.marker),n.concat([e?"paused":"resumed"])}async pause(e){let t=await this.queue.client,r=this.pauseArgs(e);return this.execCommand(t,"pause",r)}addRepeatableJobArgs(e,t,r,n){let a=this.queue.keys;return[a.repeat,a.delayed].concat([t,e2(r),n,e,a[""]])}async addRepeatableJob(e,t,r,n){let a=await this.queue.client,i=this.addRepeatableJobArgs(e,t,r,n);return this.execCommand(a,"addRepeatableJob",i)}async addJobScheduler(e,t,r,n,a,i,s){let o=await this.queue.client,l=this.queue.keys,d=[l.repeat,l.delayed,l.wait,l.paused,l.meta,l.prioritized,l.marker,l.id,l.events,l.pc,l.active],c=[t,e2(a),e,r,e2(n),e2(i),Date.now(),l[""],s?this.queue.toKey(s):""];return this.execCommand(o,"addJobScheduler",d.concat(c))}async updateRepeatableJobMillis(e,t,r,n){let a=[this.queue.keys.repeat,r,t,n];return this.execCommand(e,"updateRepeatableJobMillis",a)}async updateJobSchedulerNextMillis(e,t,r,n,a){let i=await this.queue.client,s=this.queue.keys,o=[s.repeat,s.delayed,s.wait,s.paused,s.meta,s.prioritized,s.marker,s.id,s.events,s.pc,a?this.queue.toKey(a):"",s.active],l=[t,e,r,e2(n),Date.now(),s[""],a];return this.execCommand(i,"updateJobScheduler",o.concat(l))}removeRepeatableArgs(e,t,r){let n=this.queue.keys;return[n.repeat,n.delayed,n.events].concat([e,this.getRepeatConcatOptions(t,r),r,n[""]])}getRepeatConcatOptions(e,t){return t&&t.split(":").length>2?t:e}async removeRepeatable(e,t,r){let n=await this.queue.client,a=this.removeRepeatableArgs(e,t,r);return this.execCommand(n,"removeRepeatable",a)}async removeJobScheduler(e){let t=await this.queue.client,r=this.queue.keys,n=[r.repeat,r.delayed,r.events],a=[e,r[""]];return this.execCommand(t,"removeJobScheduler",n.concat(a))}removeArgs(e,t){let r=[e,"meta","repeat"].map(e=>this.queue.toKey(e)),n=[e,t?1:0,this.queue.toKey("")];return r.concat(n)}async remove(e,t){let r=await this.queue.client,n=this.removeArgs(e,t),a=await this.execCommand(r,"removeJob",n);if(a<0)throw this.finishedErrors({code:a,jobId:e,command:"removeJob"});return a}async removeUnprocessedChildren(e){let t=await this.queue.client,r=[this.queue.toKey(e),this.queue.keys.meta,this.queue.toKey(""),e];await this.execCommand(t,"removeUnprocessedChildren",r)}async extendLock(e,t,r,n){n=n||await this.queue.client;let a=[this.queue.toKey(e)+":lock",this.queue.keys.stalled,t,r,e];return this.execCommand(n,"extendLock",a)}async extendLocks(e,t,r){let n=await this.queue.client,a=[this.queue.keys.stalled,this.queue.toKey(""),e2(t),e2(e),r];return this.execCommand(n,"extendLocks",a)}async updateData(e,t){let r=await this.queue.client,n=[this.queue.toKey(e.id)],a=JSON.stringify(t),i=await this.execCommand(r,"updateData",n.concat([a]));if(i<0)throw this.finishedErrors({code:i,jobId:e.id,command:"updateData"})}async updateProgress(e,t){let r=await this.queue.client,n=[this.queue.toKey(e),this.queue.keys.events,this.queue.keys.meta],a=JSON.stringify(t),i=await this.execCommand(r,"updateProgress",n.concat([e,a]));if(i<0)throw this.finishedErrors({code:i,jobId:e,command:"updateProgress"})}async addLog(e,t,r){let n=await this.queue.client,a=[this.queue.toKey(e),this.queue.toKey(e)+":logs"],i=await this.execCommand(n,"addLog",a.concat([e,t,r||""]));if(i<0)throw this.finishedErrors({code:i,jobId:e,command:"addLog"});return i}moveToFinishedArgs(e,t,r,n,a,i,s,o=!0,l){var d,c,u,p,y,h,m;let f=this.queue.keys,b=this.queue.opts,g="completed"===a?b.removeOnComplete:b.removeOnFail,K=this.queue.toKey(`metrics:${a}`),v=this.moveToFinishedKeys;v[10]=f[a],v[11]=this.queue.toKey(null!==(d=e.id)&&void 0!==d?d:""),v[12]=K,v[13]=this.queue.keys.marker;let S=this.getKeepJobs(n,g),E=[e.id,s,r,void 0===t?"null":t,a,!o||this.queue.closing?0:1,f[""],e2({token:i,name:b.name,keepJobs:S,limiter:b.limiter,lockDuration:b.lockDuration,attempts:e.opts.attempts,maxMetricsSize:(null===(c=b.metrics)||void 0===c?void 0:c.maxDataPoints)?null===(u=b.metrics)||void 0===u?void 0:u.maxDataPoints:"",fpof:!!(null===(p=e.opts)||void 0===p?void 0:p.failParentOnFailure),cpof:!!(null===(y=e.opts)||void 0===y?void 0:y.continueParentOnFailure),idof:!!(null===(h=e.opts)||void 0===h?void 0:h.ignoreDependencyOnFailure),rdof:!!(null===(m=e.opts)||void 0===m?void 0:m.removeDependencyOnFailure)}),l?e2((0,e0.dq)(l)):void 0];return v.concat(E)}getKeepJobs(e,t){return void 0===e?t||{count:e?0:-1}:"object"==typeof e?e:"number"==typeof e?{count:e}:{count:e?0:-1}}async moveToFinished(e,t){let r=await this.queue.client,n=await this.execCommand(r,"moveToFinished",t);if(n<0)throw this.finishedErrors({code:n,jobId:e,command:"moveToFinished",state:"active"});if(void 0!==n)return e6(n)}drainArgs(e){let t=this.queue.keys;return[t.wait,t.paused,t.delayed,t.prioritized,t.repeat].concat([t[""],e?"1":"0"])}async drain(e){let t=await this.queue.client,r=this.drainArgs(e);return this.execCommand(t,"drain",r)}removeChildDependencyArgs(e,t){return[this.queue.keys[""]].concat([this.queue.toKey(e),t])}async removeChildDependency(e,t){let r=await this.queue.client,n=this.removeChildDependencyArgs(e,t),a=await this.execCommand(r,"removeChildDependency",n);switch(a){case 0:return!0;case 1:return!1;default:throw this.finishedErrors({code:a,jobId:e,parentKey:t,command:"removeChildDependency"})}}getRangesArgs(e,t,r,n){let a=this.queue.keys,i=e.map(e=>"waiting"===e?"wait":e);return[a[""]].concat([t,r,n?"1":"0",...i])}async getRanges(e,t=0,r=1,n=!1){let a=await this.queue.client,i=this.getRangesArgs(e,t,r,n);return await this.execCommand(a,"getRanges",i)}getCountsArgs(e){let t=this.queue.keys,r=e.map(e=>"waiting"===e?"wait":e);return[t[""]].concat([...r])}async getCounts(e){let t=await this.queue.client,r=this.getCountsArgs(e);return await this.execCommand(t,"getCounts",r)}getCountsPerPriorityArgs(e){return[this.queue.keys.wait,this.queue.keys.paused,this.queue.keys.meta,this.queue.keys.prioritized].concat(e)}async getCountsPerPriority(e){let t=await this.queue.client,r=this.getCountsPerPriorityArgs(e);return await this.execCommand(t,"getCountsPerPriority",r)}getDependencyCountsArgs(e,t){return[`${e}:processed`,`${e}:dependencies`,`${e}:failed`,`${e}:unsuccessful`].map(e=>this.queue.toKey(e)).concat(t)}async getDependencyCounts(e,t){let r=await this.queue.client,n=this.getDependencyCountsArgs(e,t);return await this.execCommand(r,"getDependencyCounts",n)}moveToCompletedArgs(e,t,r,n,a=!1){let i=Date.now();return this.moveToFinishedArgs(e,t,"returnvalue",r,"completed",n,i,a)}moveToFailedArgs(e,t,r,n,a=!1,i){let s=Date.now();return this.moveToFinishedArgs(e,t,"failedReason",r,"failed",n,s,a,i)}async isFinished(e,t=!1){let r=await this.queue.client,n=["completed","failed",e].map(e=>this.queue.toKey(e));return this.execCommand(r,"isFinished",n.concat([e,t?"1":""]))}async getState(e){let t=await this.queue.client,r=["completed","failed","delayed","active","wait","paused","waiting-children","prioritized"].map(e=>this.queue.toKey(e));return(0,e0.J3)(this.queue.redisVersion,"6.0.6")?this.execCommand(t,"getState",r.concat([e])):this.execCommand(t,"getStateV2",r.concat([e]))}async changeDelay(e,t){let r=await this.queue.client,n=this.changeDelayArgs(e,t),a=await this.execCommand(r,"changeDelay",n);if(a<0)throw this.finishedErrors({code:a,jobId:e,command:"changeDelay",state:"delayed"})}changeDelayArgs(e,t){let r=Date.now();return[this.queue.keys.delayed,this.queue.keys.meta,this.queue.keys.marker,this.queue.keys.events].concat([t,JSON.stringify(r),e,this.queue.toKey(e)])}async changePriority(e,t=0,r=!1){let n=await this.queue.client,a=this.changePriorityArgs(e,t,r),i=await this.execCommand(n,"changePriority",a);if(i<0)throw this.finishedErrors({code:i,jobId:e,command:"changePriority"})}changePriorityArgs(e,t=0,r=!1){return[this.queue.keys.wait,this.queue.keys.paused,this.queue.keys.meta,this.queue.keys.prioritized,this.queue.keys.active,this.queue.keys.pc,this.queue.keys.marker].concat([t,this.queue.toKey(""),e,r?1:0])}moveToDelayedArgs(e,t,r,n,a={}){let i=this.queue.keys;return[i.marker,i.active,i.prioritized,i.delayed,this.queue.toKey(e),i.events,i.meta,i.stalled].concat([this.queue.keys[""],t,e,r,n,a.skipAttempt?"1":"0",a.fieldsToUpdate?e2((0,e0.dq)(a.fieldsToUpdate)):void 0])}moveToWaitingChildrenArgs(e,t,r){let n=Date.now(),a=(0,e0.pV)(r.child);return["active","waiting-children",e,`${e}:dependencies`,`${e}:unsuccessful`,"stalled","failed","events"].map(e=>this.queue.toKey(e)).concat([t,null!=a?a:"",JSON.stringify(n),e,this.queue.toKey("")])}isMaxedArgs(){let e=this.queue.keys;return[e.meta,e.active]}async isMaxed(){let e=await this.queue.client,t=this.isMaxedArgs();return!!await this.execCommand(e,"isMaxed",t)}async moveToDelayed(e,t,r,n="0",a={}){let i=await this.queue.client,s=this.moveToDelayedArgs(e,t,n,r,a),o=await this.execCommand(i,"moveToDelayed",s);if(o<0)throw this.finishedErrors({code:o,jobId:e,command:"moveToDelayed",state:"active"})}async moveToWaitingChildren(e,t,r={}){let n=await this.queue.client,a=this.moveToWaitingChildrenArgs(e,t,r),i=await this.execCommand(n,"moveToWaitingChildren",a);switch(i){case 0:return!0;case 1:return!1;default:throw this.finishedErrors({code:i,jobId:e,command:"moveToWaitingChildren",state:"active"})}}getRateLimitTtlArgs(e){return[this.queue.keys.limiter].concat([null!=e?e:"0"])}async getRateLimitTtl(e){let t=await this.queue.client,r=this.getRateLimitTtlArgs(e);return this.execCommand(t,"getRateLimitTtl",r)}async cleanJobsInSet(e,t,r=0){let n=await this.queue.client;return this.execCommand(n,"cleanJobsInSet",[this.queue.toKey(e),this.queue.toKey("events"),this.queue.toKey("repeat"),this.queue.toKey(""),t,r,e])}getJobSchedulerArgs(e){return[this.queue.keys.repeat].concat([e])}async getJobScheduler(e){let t=await this.queue.client,r=this.getJobSchedulerArgs(e);return this.execCommand(t,"getJobScheduler",r)}retryJobArgs(e,t,r,n={}){return[this.queue.keys.active,this.queue.keys.wait,this.queue.keys.paused,this.queue.toKey(e),this.queue.keys.meta,this.queue.keys.events,this.queue.keys.delayed,this.queue.keys.prioritized,this.queue.keys.pc,this.queue.keys.marker,this.queue.keys.stalled].concat([this.queue.toKey(""),Date.now(),(t?"R":"L")+"PUSH",e,r,n.fieldsToUpdate?e2((0,e0.dq)(n.fieldsToUpdate)):void 0])}async retryJob(e,t,r="0",n={}){let a=await this.queue.client,i=this.retryJobArgs(e,t,r,n),s=await this.execCommand(a,"retryJob",i);if(s<0)throw this.finishedErrors({code:s,jobId:e,command:"retryJob",state:"active"})}moveJobsToWaitArgs(e,t,r){return[this.queue.toKey(""),this.queue.keys.events,this.queue.toKey(e),this.queue.toKey("wait"),this.queue.toKey("paused"),this.queue.keys.meta,this.queue.keys.active,this.queue.keys.marker].concat([t,r,e])}async retryJobs(e="failed",t=1e3,r=new Date().getTime()){let n=await this.queue.client,a=this.moveJobsToWaitArgs(e,t,r);return this.execCommand(n,"moveJobsToWait",a)}async promoteJobs(e=1e3){let t=await this.queue.client,r=this.moveJobsToWaitArgs("delayed",e,Number.MAX_VALUE);return this.execCommand(t,"moveJobsToWait",r)}async reprocessJob(e,t){let r=await this.queue.client,n=[this.queue.toKey(e.id),this.queue.keys.events,this.queue.toKey(t),this.queue.keys.wait,this.queue.keys.meta,this.queue.keys.paused,this.queue.keys.active,this.queue.keys.marker],a=[e.id,(e.opts.lifo?"R":"L")+"PUSH","failed"===t?"failedReason":"returnvalue",t],i=await this.execCommand(r,"reprocessJob",n.concat(a));if(1!==i)throw this.finishedErrors({code:i,jobId:e.id,command:"reprocessJob",state:t})}async moveToActive(e,t,r){let n=this.queue.opts,a=this.queue.keys,i=[a.wait,a.active,a.prioritized,a.events,a.stalled,a.limiter,a.delayed,a.paused,a.meta,a.pc,a.marker],s=[a[""],Date.now(),e2({token:t,lockDuration:n.lockDuration,limiter:n.limiter,name:r})];return e6(await this.execCommand(e,"moveToActive",i.concat(s)))}async promote(e){let t=await this.queue.client,r=[this.queue.keys.delayed,this.queue.keys.wait,this.queue.keys.paused,this.queue.keys.meta,this.queue.keys.prioritized,this.queue.keys.active,this.queue.keys.pc,this.queue.keys.events,this.queue.keys.marker],n=[this.queue.toKey(""),e],a=await this.execCommand(t,"promote",r.concat(n));if(a<0)throw this.finishedErrors({code:a,jobId:e,command:"promote",state:"delayed"})}moveStalledJobsToWaitArgs(){let e=this.queue.opts;return[this.queue.keys.stalled,this.queue.keys.wait,this.queue.keys.active,this.queue.keys.failed,this.queue.keys["stalled-check"],this.queue.keys.meta,this.queue.keys.paused,this.queue.keys.marker,this.queue.keys.events].concat([e.maxStalledCount,this.queue.toKey(""),Date.now(),e.stalledInterval])}async moveStalledJobsToWait(){let e=await this.queue.client,t=this.moveStalledJobsToWaitArgs();return this.execCommand(e,"moveStalledJobsToWait",t)}async moveJobFromActiveToWait(e,t){let r=await this.queue.client,n=[this.queue.keys.active,this.queue.keys.wait,this.queue.keys.stalled,this.queue.keys.paused,this.queue.keys.meta,this.queue.keys.limiter,this.queue.keys.prioritized,this.queue.keys.marker,this.queue.keys.events],a=[e,t,this.queue.toKey(e)],i=await this.execCommand(r,"moveJobFromActiveToWait",n.concat(a));if(i<0)throw this.finishedErrors({code:i,jobId:e,command:"moveJobFromActiveToWait",state:"active"});return i}async obliterate(e){let t=await this.queue.client,r=[this.queue.keys.meta,this.queue.toKey("")],n=[e.count,e.force?"force":null],a=await this.execCommand(t,"obliterate",r.concat(n));if(a<0)switch(a){case -1:throw Error("Cannot obliterate non-paused queue");case -2:throw Error("Cannot obliterate queue with active jobs")}return a}async paginate(e,t){let r=await this.queue.client,n=[e],a=t.end>=0?t.end-t.start+1:1/0,i="0",s=0,o,l,d,c=[],u=[];do{let e=[t.start+c.length,t.end,i,s,5];t.fetchJobs&&e.push(1),[i,s,o,l,d]=await this.execCommand(r,"paginate",n.concat(e)),c=c.concat(o),d&&d.length&&(u=u.concat(d.map(e0.VZ)))}while("0"!=i&&c.length<a);if(!(c.length&&Array.isArray(c[0])))return{cursor:i,items:c.map(e=>({id:e})),total:l,jobs:u};{let e=[];for(let t=0;t<c.length;t++){let[r,n]=c[t];try{e.push({id:r,v:JSON.parse(n)})}catch(t){e.push({id:r,err:t.message})}}return{cursor:i,items:e,total:l,jobs:u}}}finishedErrors({code:e,jobId:t,parentKey:r,command:n,state:a}){switch(e){case eX.jK.JobNotExist:return Error(`Missing key for job ${t}. ${n}`);case eX.jK.JobLockNotExist:return Error(`Missing lock for job ${t}. ${n}`);case eX.jK.JobNotInState:return Error(`Job ${t} is not in the ${a} state. ${n}`);case eX.jK.JobPendingDependencies:return Error(`Job ${t} has pending dependencies. ${n}`);case eX.jK.ParentJobNotExist:return Error(`Missing key for parent job ${r}. ${n}`);case eX.jK.JobLockMismatch:return Error(`Lock mismatch for job ${t}. Cmd ${n} from ${a}`);case eX.jK.ParentJobCannotBeReplaced:return Error(`The parent job ${r} cannot be replaced. ${n}`);case eX.jK.JobBelongsToJobScheduler:return Error(`Job ${t} belongs to a job scheduler and cannot be removed directly. ${n}`);default:return Error(`Unknown code ${e} error for ${t}. ${n}`)}}}function e6(e){if(e){let t=[null,e[1],e[2],e[3]];return e[0]&&(t[0]=(0,e0.VZ)(e[0])),t}return[]}},2356:(e,t,r)=>{"use strict";r(2048),r(7360),r(5315),r(9576),r(6180),r(7565),r(1381),r(5144),r(9997),r(5963),r(8221),r(9735),r(1973),r(3442),r(8829),e=r.hmd(e)},3442:(e,t,r)=>{"use strict";var n,a,i,s,o,l;r.d(t,{uv:()=>n,jK:()=>a,d$:()=>i,MU:()=>l,Np:()=>o}),function(e){e[e.Init=0]="Init",e[e.Start=1]="Start",e[e.Stop=2]="Stop",e[e.GetChildrenValuesResponse=3]="GetChildrenValuesResponse"}(n||(n={})),function(e){e[e.JobNotExist=-1]="JobNotExist",e[e.JobLockNotExist=-2]="JobLockNotExist",e[e.JobNotInState=-3]="JobNotInState",e[e.JobPendingDependencies=-4]="JobPendingDependencies",e[e.ParentJobNotExist=-5]="ParentJobNotExist",e[e.JobLockMismatch=-6]="JobLockMismatch",e[e.ParentJobCannotBeReplaced=-7]="ParentJobCannotBeReplaced",e[e.JobBelongsToJobScheduler=-8]="JobBelongsToJobScheduler"}(a||(a={})),function(e){e[e.Completed=0]="Completed",e[e.Error=1]="Error",e[e.Failed=2]="Failed",e[e.InitFailed=3]="InitFailed",e[e.InitCompleted=4]="InitCompleted",e[e.Log=5]="Log",e[e.MoveToDelayed=6]="MoveToDelayed",e[e.Progress=7]="Progress",e[e.Update=8]="Update",e[e.GetChildrenValues=9]="GetChildrenValues"}(i||(i={})),function(e){e[e.ONE_MINUTE=1]="ONE_MINUTE",e[e.FIVE_MINUTES=5]="FIVE_MINUTES",e[e.FIFTEEN_MINUTES=15]="FIFTEEN_MINUTES",e[e.THIRTY_MINUTES=30]="THIRTY_MINUTES",e[e.ONE_HOUR=60]="ONE_HOUR",e[e.ONE_WEEK=10080]="ONE_WEEK",e[e.TWO_WEEKS=20160]="TWO_WEEKS",e[e.ONE_MONTH=80640]="ONE_MONTH"}(s||(s={})),function(e){e.QueueName="bullmq.queue.name",e.QueueOperation="bullmq.queue.operation",e.BulkCount="bullmq.job.bulk.count",e.BulkNames="bullmq.job.bulk.names",e.JobName="bullmq.job.name",e.JobId="bullmq.job.id",e.JobKey="bullmq.job.key",e.JobIds="bullmq.job.ids",e.DeduplicationKey="bullmq.job.deduplication.key",e.JobOptions="bullmq.job.options",e.JobProgress="bullmq.job.progress",e.QueueDrainDelay="bullmq.queue.drain.delay",e.QueueGrace="bullmq.queue.grace",e.QueueCleanLimit="bullmq.queue.clean.limit",e.QueueRateLimit="bullmq.queue.rate.limit",e.JobType="bullmq.job.type",e.QueueOptions="bullmq.queue.options",e.QueueEventMaxLength="bullmq.queue.event.max.length",e.WorkerOptions="bullmq.worker.options",e.WorkerName="bullmq.worker.name",e.WorkerId="bullmq.worker.id",e.WorkerRateLimit="bullmq.worker.rate.limit",e.WorkerDoNotWaitActive="bullmq.worker.do.not.wait.active",e.WorkerForceClose="bullmq.worker.force.close",e.WorkerStalledJobs="bullmq.worker.stalled.jobs",e.WorkerFailedJobs="bullmq.worker.failed.jobs",e.WorkerJobsToExtendLocks="bullmq.worker.jobs.to.extend.locks",e.JobFinishedTimestamp="bullmq.job.finished.timestamp",e.JobProcessedTimestamp="bullmq.job.processed.timestamp",e.JobResult="bullmq.job.result",e.JobFailedReason="bullmq.job.failed.reason",e.FlowName="bullmq.flow.name",e.JobSchedulerId="bullmq.job.scheduler.id"}(o||(o={})),function(e){e[e.INTERNAL=0]="INTERNAL",e[e.SERVER=1]="SERVER",e[e.CLIENT=2]="CLIENT",e[e.PRODUCER=3]="PRODUCER",e[e.CONSUMER=4]="CONSUMER"}(l||(l={}))},6608:(e,t,r)=>{"use strict";r.d(t,{ci:()=>h}),r(9670),r(5724),r(9997);var n,a,i=r(3442),s=r(7565);(function(e){e[e.Idle=0]="Idle",e[e.Started=1]="Started",e[e.Terminating=2]="Terminating",e[e.Errored=3]="Errored"})(n||(n={})),r(1973),r(7702);var o=r(9576),l=r(5963);r(3705),r(8221);var d=r(8829),c=r(1381);r(2174);class u extends c.W{getJob(e){return this.Job.fromId(this,e)}commandByType(e,t,r){return e.map(e=>{e="waiting"===e?"wait":e;let n=this.toKey(e);switch(e){case"completed":case"failed":case"delayed":case"prioritized":case"repeat":case"waiting-children":return r(n,t?"zcard":"zrange");case"active":case"wait":case"paused":return r(n,t?"llen":"lrange")}})}sanitizeJobTypes(e){let t="string"==typeof e?[e]:e;if(Array.isArray(t)&&t.length>0){let e=[...t];return -1!==e.indexOf("waiting")&&e.push("paused"),[...new Set(e)]}return["active","completed","delayed","failed","paused","prioritized","waiting","waiting-children"]}async count(){return await this.getJobCountByTypes("waiting","paused","delayed","prioritized","waiting-children")}async getRateLimitTtl(e){return this.scripts.getRateLimitTtl(e)}async getDebounceJobId(e){return(await this.client).get(`${this.keys.de}:${e}`)}async getDeduplicationJobId(e){return(await this.client).get(`${this.keys.de}:${e}`)}async getJobCountByTypes(...e){return Object.values(await this.getJobCounts(...e)).reduce((e,t)=>e+t,0)}async getJobCounts(...e){let t=this.sanitizeJobTypes(e),r=await this.scripts.getCounts(t),n={};return r.forEach((e,r)=>{n[t[r]]=e||0}),n}getJobState(e){return this.scripts.getState(e)}getCompletedCount(){return this.getJobCountByTypes("completed")}getFailedCount(){return this.getJobCountByTypes("failed")}getDelayedCount(){return this.getJobCountByTypes("delayed")}getActiveCount(){return this.getJobCountByTypes("active")}getPrioritizedCount(){return this.getJobCountByTypes("prioritized")}async getCountsPerPriority(e){let t=[...new Set(e)],r=await this.scripts.getCountsPerPriority(t),n={};return r.forEach((e,r)=>{n[`${t[r]}`]=e||0}),n}getWaitingCount(){return this.getJobCountByTypes("waiting")}getWaitingChildrenCount(){return this.getJobCountByTypes("waiting-children")}getWaiting(e=0,t=-1){return this.getJobs(["waiting"],e,t,!0)}getWaitingChildren(e=0,t=-1){return this.getJobs(["waiting-children"],e,t,!0)}getActive(e=0,t=-1){return this.getJobs(["active"],e,t,!0)}getDelayed(e=0,t=-1){return this.getJobs(["delayed"],e,t,!0)}getPrioritized(e=0,t=-1){return this.getJobs(["prioritized"],e,t,!0)}getCompleted(e=0,t=-1){return this.getJobs(["completed"],e,t,!1)}getFailed(e=0,t=-1){return this.getJobs(["failed"],e,t,!1)}async getDependencies(e,t,r,n){let a=this.toKey("processed"==t?`${e}:processed`:`${e}:dependencies`),{items:i,total:s,jobs:o}=await this.scripts.paginate(a,{start:r,end:n,fetchJobs:!0});return{items:i,jobs:o,total:s}}async getRanges(e,t=0,r=1,n=!1){let a=[];this.commandByType(e,!1,(e,t)=>{switch(t){case"lrange":a.push("lrange");break;case"zrange":a.push("zrange")}});let i=await this.scripts.getRanges(e,t,r,n),s=[];return i.forEach((e,t)=>{let r=e||[];s=n&&"lrange"===a[t]?s.concat(r.reverse()):s.concat(r)}),[...new Set(s)]}async getJobs(e,t=0,r=-1,n=!1){let a=this.sanitizeJobTypes(e);return Promise.all((await this.getRanges(a,t,r,n)).map(e=>this.Job.fromId(this,e)))}async getJobLogs(e,t=0,r=-1,n=!0){let a=(await this.client).multi(),i=this.toKey(e+":logs");n?a.lrange(i,t,r):a.lrange(i,-(r+1),-(t+1)),a.llen(i);let s=await a.exec();return n||s[0][1].reverse(),{logs:s[0][1],count:s[1][1]}}async baseGetClients(e){let t=await this.client;try{let r=await t.client("LIST");return this.parseClientList(r,e)}catch(e){if(!s.aV.test(e.message))throw e;return[{name:"GCP does not support client list"}]}}getWorkers(){let e=`${this.clientName()}`,t=`${this.clientName()}:w:`;return this.baseGetClients(r=>r&&(r===e||r.startsWith(t)))}async getWorkersCount(){return(await this.getWorkers()).length}async getQueueEvents(){let e=`${this.clientName()}${s.oh}`;return this.baseGetClients(t=>t===e)}async getMetrics(e,t=0,r=-1){let n=await this.client,a=this.toKey(`metrics:${e}`),i=`${a}:data`,s=n.multi();s.hmget(a,"count","prevTS","prevCount"),s.lrange(i,t,r),s.llen(i);let[o,l,d]=await s.exec(),[c,[u,p,y]]=o,[h,m]=l,[f,b]=d;if(c||h)throw c||h||f;return{meta:{count:parseInt(u||"0",10),prevTS:parseInt(p||"0",10),prevCount:parseInt(y||"0",10)},data:m,count:b}}parseClientList(e,t){let r=e.split(/\r?\n/),n=[];return r.forEach(e=>{let r={};e.split(" ").forEach(function(e){let t=e.indexOf("="),n=e.substring(0,t),a=e.substring(t+1);r[n]=a});let a=r.name;t(a)&&(r.name=this.name,r.rawname=a,n.push(r))}),n}async exportPrometheusMetrics(e){let t=await this.getJobCounts(),r=[];r.push("# HELP bullmq_job_count Number of jobs in the queue by state"),r.push("# TYPE bullmq_job_count gauge");let n=e?Object.keys(e).reduce((t,r)=>`${t}, ${r}="${e[r]}"`,""):"";for(let[e,a]of Object.entries(t))r.push(`bullmq_job_count{queue="${this.name}", state="${e}"${n}} ${a}`);return r.join("\n")}}var p=r(5144),y=r(2036);class h extends u{constructor(e,t,r){var n;super(e,Object.assign({},t),r),this.token=(0,o.Z)(),this.libName="bullmq",this.jobsOpts=null!==(n=null==t?void 0:t.defaultJobOptions)&&void 0!==n?n:{},this.waitUntilReady().then(e=>{if(!this.closing&&!(null==t?void 0:t.skipMetasUpdate))return e.hmset(this.keys.meta,this.metaValues)}).catch(e=>{})}emit(e,...t){return super.emit(e,...t)}off(e,t){return super.off(e,t),this}on(e,t){return super.on(e,t),this}once(e,t){return super.once(e,t),this}get defaultJobOptions(){return Object.assign({},this.jobsOpts)}get metaValues(){var e,t,r,n;return{"opts.maxLenEvents":null!==(n=null===(r=null===(t=null===(e=this.opts)||void 0===e?void 0:e.streams)||void 0===t?void 0:t.events)||void 0===r?void 0:r.maxLen)&&void 0!==n?n:1e4,version:`${this.libName}:${y.i}`}}async getVersion(){let e=await this.client;return await e.hget(this.keys.meta,"version")}get repeat(){return new Promise(async e=>{this._repeat||(this._repeat=new p.w(this.name,Object.assign(Object.assign({},this.opts),{connection:await this.client})),this._repeat.on("error",e=>this.emit.bind(this,e))),e(this._repeat)})}get jobScheduler(){return new Promise(async e=>{this._jobScheduler||(this._jobScheduler=new d.W(this.name,Object.assign(Object.assign({},this.opts),{connection:await this.client})),this._jobScheduler.on("error",e=>this.emit.bind(this,e))),e(this._jobScheduler)})}async getGlobalConcurrency(){let e=await this.client,t=await e.hget(this.keys.meta,"concurrency");return t?Number(t):null}async setGlobalConcurrency(e){return(await this.client).hset(this.keys.meta,"concurrency",e)}async removeGlobalConcurrency(){return(await this.client).hdel(this.keys.meta,"concurrency")}async add(e,t,r){return this.trace(i.MU.PRODUCER,"add",`${this.name}.${e}`,async(n,a)=>{var s;!a||(null===(s=null==r?void 0:r.telemetry)||void 0===s?void 0:s.omitContext)||(r=Object.assign(Object.assign({},r),{telemetry:{metadata:a}}));let o=await this.addJob(e,t,r);return null==n||n.setAttributes({[i.Np.JobName]:e,[i.Np.JobId]:o.id}),o})}async addJob(e,t,r){if(r&&r.repeat){if(r.repeat.endDate&&+new Date(r.repeat.endDate)<Date.now())throw Error("End date must be greater than current timestamp");return(await this.repeat).updateRepeatableJob(e,t,Object.assign(Object.assign({},this.jobsOpts),r),{override:!0})}{let n=null==r?void 0:r.jobId;if("0"==n||(null==n?void 0:n.startsWith("0:")))throw Error("JobId cannot be '0' or start with 0:");let a=await this.Job.create(this,e,t,Object.assign(Object.assign(Object.assign({},this.jobsOpts),r),{jobId:n}));return this.emit("waiting",a),a}}async addBulk(e){return this.trace(i.MU.PRODUCER,"addBulk",this.name,async(t,r)=>(t&&t.setAttributes({[i.Np.BulkNames]:e.map(e=>e.name),[i.Np.BulkCount]:e.length}),await this.Job.createBulk(this,e.map(e=>{var t,n,a,i,s,o;let l=null===(t=e.opts)||void 0===t?void 0:t.telemetry;if(r){let t=null===(a=null===(n=e.opts)||void 0===n?void 0:n.telemetry)||void 0===a?void 0:a.omitContext,o=(null===(s=null===(i=e.opts)||void 0===i?void 0:i.telemetry)||void 0===s?void 0:s.metadata)||!t&&r;(o||t)&&(l={metadata:o,omitContext:t})}return{name:e.name,data:e.data,opts:Object.assign(Object.assign(Object.assign({},this.jobsOpts),e.opts),{jobId:null===(o=e.opts)||void 0===o?void 0:o.jobId,telemetry:l})}}))))}async upsertJobScheduler(e,t,r){var n,a;if(t.endDate&&+new Date(t.endDate)<Date.now())throw Error("End date must be greater than current timestamp");return(await this.jobScheduler).upsertJobScheduler(e,t,null!==(n=null==r?void 0:r.name)&&void 0!==n?n:e,null!==(a=null==r?void 0:r.data)&&void 0!==a?a:{},Object.assign(Object.assign({},this.jobsOpts),null==r?void 0:r.opts),{override:!0})}async pause(){await this.trace(i.MU.INTERNAL,"pause",this.name,async()=>{await this.scripts.pause(!0),this.emit("paused")})}async close(){await this.trace(i.MU.INTERNAL,"close",this.name,async()=>{!this.closing&&this._repeat&&await this._repeat.close(),await super.close()})}async rateLimit(e){await this.trace(i.MU.INTERNAL,"rateLimit",this.name,async t=>{null==t||t.setAttributes({[i.Np.QueueRateLimit]:e}),await this.client.then(t=>t.set(this.keys.limiter,Number.MAX_SAFE_INTEGER,"PX",e))})}async resume(){await this.trace(i.MU.INTERNAL,"resume",this.name,async()=>{await this.scripts.pause(!1),this.emit("resumed")})}async isPaused(){let e=await this.client;return 1===await e.hexists(this.keys.meta,"paused")}isMaxed(){return this.scripts.isMaxed()}async getRepeatableJobs(e,t,r){return(await this.repeat).getRepeatableJobs(e,t,r)}async getJobScheduler(e){return(await this.jobScheduler).getScheduler(e)}async getJobSchedulers(e,t,r){return(await this.jobScheduler).getJobSchedulers(e,t,r)}async getJobSchedulersCount(){return(await this.jobScheduler).getSchedulersCount()}async removeRepeatable(e,t,r){return this.trace(i.MU.INTERNAL,"removeRepeatable",`${this.name}.${e}`,async n=>{null==n||n.setAttributes({[i.Np.JobName]:e,[i.Np.JobId]:r});let a=await this.repeat;return!await a.removeRepeatable(e,t,r)})}async removeJobScheduler(e){let t=await this.jobScheduler;return!await t.removeJobScheduler(e)}async removeDebounceKey(e){return this.trace(i.MU.INTERNAL,"removeDebounceKey",`${this.name}`,async t=>{null==t||t.setAttributes({[i.Np.JobKey]:e});let r=await this.client;return await r.del(`${this.keys.de}:${e}`)})}async removeDeduplicationKey(e){return this.trace(i.MU.INTERNAL,"removeDeduplicationKey",`${this.name}`,async t=>(null==t||t.setAttributes({[i.Np.DeduplicationKey]:e}),(await this.client).del(`${this.keys.de}:${e}`)))}async removeRateLimitKey(){return(await this.client).del(this.keys.limiter)}async removeRepeatableByKey(e){return this.trace(i.MU.INTERNAL,"removeRepeatableByKey",`${this.name}`,async t=>{null==t||t.setAttributes({[i.Np.JobKey]:e});let r=await this.repeat;return!await r.removeRepeatableByKey(e)})}async remove(e,{removeChildren:t=!0}={}){return this.trace(i.MU.INTERNAL,"remove",this.name,async r=>(null==r||r.setAttributes({[i.Np.JobId]:e,[i.Np.JobOptions]:JSON.stringify({removeChildren:t})}),await this.scripts.remove(e,t)))}async updateJobProgress(e,t){await this.trace(i.MU.INTERNAL,"updateJobProgress",this.name,async r=>{null==r||r.setAttributes({[i.Np.JobId]:e,[i.Np.JobProgress]:JSON.stringify(t)}),await this.scripts.updateProgress(e,t)})}async addJobLog(e,t,r){return l.o.addJobLog(this,e,t,r)}async drain(e=!1){await this.trace(i.MU.INTERNAL,"drain",this.name,async t=>{null==t||t.setAttributes({[i.Np.QueueDrainDelay]:e}),await this.scripts.drain(e)})}async clean(e,t,r="completed"){return this.trace(i.MU.INTERNAL,"clean",this.name,async n=>{let a=t||1/0,s=Math.min(1e4,a),o=Date.now()-e,l=0,d=[];for(;l<a;){let e=await this.scripts.cleanJobsInSet(r,o,s);if(this.emit("cleaned",e,r),l+=e.length,d.push(...e),e.length<s)break}return null==n||n.setAttributes({[i.Np.QueueGrace]:e,[i.Np.JobType]:r,[i.Np.QueueCleanLimit]:a,[i.Np.JobIds]:d}),d})}async obliterate(e){await this.trace(i.MU.INTERNAL,"obliterate",this.name,async()=>{await this.pause();let t=0;do t=await this.scripts.obliterate(Object.assign({force:!1,count:1e3},e));while(t)})}async retryJobs(e={}){await this.trace(i.MU.PRODUCER,"retryJobs",this.name,async t=>{null==t||t.setAttributes({[i.Np.QueueOptions]:JSON.stringify(e)});let r=0;do r=await this.scripts.retryJobs(e.state,e.count,e.timestamp);while(r)})}async promoteJobs(e={}){await this.trace(i.MU.INTERNAL,"promoteJobs",this.name,async t=>{null==t||t.setAttributes({[i.Np.QueueOptions]:JSON.stringify(e)});let r=0;do r=await this.scripts.promoteJobs(e.count);while(r)})}async trimEvents(e){return this.trace(i.MU.INTERNAL,"trimEvents",this.name,async t=>{null==t||t.setAttributes({[i.Np.QueueEventMaxLength]:e});let r=await this.client;return await r.xtrim(this.keys.events,"MAXLEN","~",e)})}async removeDeprecatedPriorityKey(){return(await this.client).del(this.toKey("priority"))}}r(9735),r(5386),r(2356),function(e){e.blocking="blocking",e.normal="normal"}(a||(a={}))},7565:(e,t,r)=>{"use strict";r.d(t,{Hh:()=>E,J3:()=>k,LG:()=>g,Nw:()=>h,OV:()=>b,TJ:()=>s,VZ:()=>c,WE:()=>w,Y1:()=>f,Y3:()=>o,Yq:()=>x,Zm:()=>I,aV:()=>v,dq:()=>u,fq:()=>m,g4:()=>T,gw:()=>p,iF:()=>l,oh:()=>j,pV:()=>K,xP:()=>y,xb:()=>d,yf:()=>S}),r(2197);var n=r(67),a=r(799),i=r(3442);let s={value:null};function o(e,t,r){try{return e.apply(t,r)}catch(e){return s.value=e,s}}function l(e){return Buffer.byteLength(e,"utf8")}function d(e){for(let t in e)if(Object.prototype.hasOwnProperty.call(e,t))return!1;return!0}function c(e){let t={};for(let r=0;r<e.length;r+=2)t[e[r]]=e[r+1];return t}function u(e){let t=[];for(let r in e)Object.prototype.hasOwnProperty.call(e,r)&&void 0!==e[r]&&(t[t.length]=r,t[t.length]=e[r]);return t}function p(e,t){return new Promise(r=>{let n;let a=()=>{null==t||t.signal.removeEventListener("abort",a),clearTimeout(n),r()};n=setTimeout(a,e),null==t||t.signal.addEventListener("abort",a)})}function y(e,t){let r=e.getMaxListeners();e.setMaxListeners(r+t)}let h={de:"deduplication",fpof:"failParentOnFailure",cpof:"continueParentOnFailure",idof:"ignoreDependencyOnFailure",kl:"keepLogs",rdof:"removeDependencyOnFailure"},m=Object.assign(Object.assign({},Object.entries(h).reduce((e,[t,r])=>(e[r]=t,e),{})),{debounce:"de"});function f(e){return!!e&&["connect","disconnect","duplicate"].every(t=>"function"==typeof e[t])}function b(e){return f(e)&&e.isCluster}function g(e,t){y(e,-t)}function K(e){if(e)return`${e.queue}:${e.id}`}let v=/ERR unknown command ['`]\s*client\s*['`]/,S=5e3,E=100;function I(e){let t=`${e.message}`;return t!==n.CONNECTION_CLOSED_ERROR_MSG&&!t.includes("ECONNREFUSED")}let k=(e,t)=>{let r=a.valid(a.coerce(e));return a.lt(r,t)},w=e=>{let t={};for(let r of Object.entries(e))t[r[0]]=JSON.parse(r[1]);return t},j=":qe";function x(e){let t={};for(let r in e)void 0!==e[r]&&(t[r]=e[r]);return t}async function T(e,t,r,n,a,s,o){if(!e)return s();{let l;let{tracer:d,contextManager:c}=e,u=c.active();o&&(l=c.fromMetadata(u,o));let p=a?`${n} ${a}`:n,y=d.startSpan(p,{kind:t},l);try{let e,a;return y.setAttributes({[i.Np.QueueName]:r,[i.Np.QueueOperation]:n}),e=t===i.MU.CONSUMER&&l?y.setSpanOnContext(l):y.setSpanOnContext(u),2==s.length&&(a=c.getMetadata(e)),await c.with(e,()=>s(y,a))}catch(e){throw y.recordException(e),e}finally{y.end()}}}},2036:(e,t,r)=>{"use strict";r.d(t,{i:()=>n});let n="5.51.1"},4358:e=>{var t=[0,4129,8258,12387,16516,20645,24774,28903,33032,37161,41290,45419,49548,53677,57806,61935,4657,528,12915,8786,21173,17044,29431,25302,37689,33560,45947,41818,54205,50076,62463,58334,9314,13379,1056,5121,25830,29895,17572,21637,42346,46411,34088,38153,58862,62927,50604,54669,13907,9842,5649,1584,30423,26358,22165,18100,46939,42874,38681,34616,63455,59390,55197,51132,18628,22757,26758,30887,2112,6241,10242,14371,51660,55789,59790,63919,35144,39273,43274,47403,23285,19156,31415,27286,6769,2640,14899,10770,56317,52188,64447,60318,39801,35672,47931,43802,27814,31879,19684,23749,11298,15363,3168,7233,60846,64911,52716,56781,44330,48395,36200,40265,32407,28342,24277,20212,15891,11826,7761,3696,65439,61374,57309,53244,48923,44858,40793,36728,37256,33193,45514,41451,53516,49453,61774,57711,4224,161,12482,8419,20484,16421,28742,24679,33721,37784,41979,46042,49981,54044,58239,62302,689,4752,8947,13010,16949,21012,25207,29270,46570,42443,38312,34185,62830,58703,54572,50445,13538,9411,5280,1153,29798,25671,21540,17413,42971,47098,34713,38840,59231,63358,50973,55100,9939,14066,1681,5808,26199,30326,17941,22068,55628,51565,63758,59695,39368,35305,47498,43435,22596,18533,30726,26663,6336,2273,14466,10403,52093,56156,60223,64286,35833,39896,43963,48026,19061,23124,27191,31254,2801,6864,10931,14994,64814,60687,56684,52557,48554,44427,40424,36297,31782,27655,23652,19525,15522,11395,7392,3265,61215,65342,53085,57212,44955,49082,36825,40952,28183,32310,20053,24180,11923,16050,3793,7920],r=function(e){for(var t,r=0,n=0,a=[],i=e.length;r<i;r++)(t=e.charCodeAt(r))<128?a[n++]=t:(t<2048?a[n++]=t>>6|192:((64512&t)==55296&&r+1<e.length&&(64512&e.charCodeAt(r+1))==56320?(t=65536+((1023&t)<<10)+(1023&e.charCodeAt(++r)),a[n++]=t>>18|240,a[n++]=t>>12&63|128):a[n++]=t>>12|224,a[n++]=t>>6&63|128),a[n++]=63&t|128);return a},n=e.exports=function(e){for(var n,a=0,i=-1,s=0,o=0,l="string"==typeof e?r(e):e,d=l.length;a<d;){if(n=l[a++],-1===i)123===n&&(i=a);else if(125!==n)o=t[(n^o>>8)&255]^o<<8;else if(a-1!==i)return 16383&o;s=t[(n^s>>8)&255]^s<<8}return 16383&s};e.exports.generateMulti=function(e){for(var t=1,r=e.length,a=n(e[0]);t<r;)if(n(e[t++])!==a)return -1;return a}},72:(e,t,r)=>{"use strict";var n=r(2050);function a(e,t){var r={zone:t};if(e?e instanceof a?this._date=e._date:e instanceof Date?this._date=n.DateTime.fromJSDate(e,r):"number"==typeof e?this._date=n.DateTime.fromMillis(e,r):"string"==typeof e&&(this._date=n.DateTime.fromISO(e,r),this._date.isValid||(this._date=n.DateTime.fromRFC2822(e,r)),this._date.isValid||(this._date=n.DateTime.fromSQL(e,r)),this._date.isValid||(this._date=n.DateTime.fromFormat(e,"EEE, d MMM yyyy HH:mm:ss",r))):this._date=n.DateTime.local(),!this._date||!this._date.isValid)throw Error("CronDate: unhandled timestamp: "+JSON.stringify(e));t&&t!==this._date.zoneName&&(this._date=this._date.setZone(t))}a.prototype.addYear=function(){this._date=this._date.plus({years:1})},a.prototype.addMonth=function(){this._date=this._date.plus({months:1}).startOf("month")},a.prototype.addDay=function(){this._date=this._date.plus({days:1}).startOf("day")},a.prototype.addHour=function(){var e=this._date;this._date=this._date.plus({hours:1}).startOf("hour"),this._date<=e&&(this._date=this._date.plus({hours:1}))},a.prototype.addMinute=function(){var e=this._date;this._date=this._date.plus({minutes:1}).startOf("minute"),this._date<e&&(this._date=this._date.plus({hours:1}))},a.prototype.addSecond=function(){var e=this._date;this._date=this._date.plus({seconds:1}).startOf("second"),this._date<e&&(this._date=this._date.plus({hours:1}))},a.prototype.subtractYear=function(){this._date=this._date.minus({years:1})},a.prototype.subtractMonth=function(){this._date=this._date.minus({months:1}).endOf("month").startOf("second")},a.prototype.subtractDay=function(){this._date=this._date.minus({days:1}).endOf("day").startOf("second")},a.prototype.subtractHour=function(){var e=this._date;this._date=this._date.minus({hours:1}).endOf("hour").startOf("second"),this._date>=e&&(this._date=this._date.minus({hours:1}))},a.prototype.subtractMinute=function(){var e=this._date;this._date=this._date.minus({minutes:1}).endOf("minute").startOf("second"),this._date>e&&(this._date=this._date.minus({hours:1}))},a.prototype.subtractSecond=function(){var e=this._date;this._date=this._date.minus({seconds:1}).startOf("second"),this._date>e&&(this._date=this._date.minus({hours:1}))},a.prototype.getDate=function(){return this._date.day},a.prototype.getFullYear=function(){return this._date.year},a.prototype.getDay=function(){var e=this._date.weekday;return 7==e?0:e},a.prototype.getMonth=function(){return this._date.month-1},a.prototype.getHours=function(){return this._date.hour},a.prototype.getMinutes=function(){return this._date.minute},a.prototype.getSeconds=function(){return this._date.second},a.prototype.getMilliseconds=function(){return this._date.millisecond},a.prototype.getTime=function(){return this._date.valueOf()},a.prototype.getUTCDate=function(){return this._getUTC().day},a.prototype.getUTCFullYear=function(){return this._getUTC().year},a.prototype.getUTCDay=function(){var e=this._getUTC().weekday;return 7==e?0:e},a.prototype.getUTCMonth=function(){return this._getUTC().month-1},a.prototype.getUTCHours=function(){return this._getUTC().hour},a.prototype.getUTCMinutes=function(){return this._getUTC().minute},a.prototype.getUTCSeconds=function(){return this._getUTC().second},a.prototype.toISOString=function(){return this._date.toUTC().toISO()},a.prototype.toJSON=function(){return this._date.toJSON()},a.prototype.setDate=function(e){this._date=this._date.set({day:e})},a.prototype.setFullYear=function(e){this._date=this._date.set({year:e})},a.prototype.setDay=function(e){this._date=this._date.set({weekday:e})},a.prototype.setMonth=function(e){this._date=this._date.set({month:e+1})},a.prototype.setHours=function(e){this._date=this._date.set({hour:e})},a.prototype.setMinutes=function(e){this._date=this._date.set({minute:e})},a.prototype.setSeconds=function(e){this._date=this._date.set({second:e})},a.prototype.setMilliseconds=function(e){this._date=this._date.set({millisecond:e})},a.prototype._getUTC=function(){return this._date.toUTC()},a.prototype.toString=function(){return this.toDate().toString()},a.prototype.toDate=function(){return this._date.toJSDate()},a.prototype.isLastDayOfMonth=function(){var e=this._date.plus({days:1}).startOf("day");return this._date.month!==e.month},a.prototype.isLastWeekdayOfMonth=function(){var e=this._date.plus({days:7}).startOf("day");return this._date.month!==e.month},e.exports=a},3354:(e,t,r)=>{"use strict";var n=r(72),a=r(3417);function i(e,t){this._options=t,this._utc=t.utc||!1,this._tz=this._utc?"UTC":t.tz,this._currentDate=new n(t.currentDate,this._tz),this._startDate=t.startDate?new n(t.startDate,this._tz):null,this._endDate=t.endDate?new n(t.endDate,this._tz):null,this._isIterator=t.iterator||!1,this._hasIterated=!1,this._nthDayOfWeek=t.nthDayOfWeek||0,this.fields=i._freezeFields(e)}i.map=["second","minute","hour","dayOfMonth","month","dayOfWeek"],i.predefined={"@yearly":"0 0 1 1 *","@monthly":"0 0 1 * *","@weekly":"0 0 * * 0","@daily":"0 0 * * *","@hourly":"0 * * * *"},i.constraints=[{min:0,max:59,chars:[]},{min:0,max:59,chars:[]},{min:0,max:23,chars:[]},{min:1,max:31,chars:["L"]},{min:1,max:12,chars:[]},{min:0,max:7,chars:["L"]}],i.daysInMonth=[31,29,31,30,31,30,31,31,30,31,30,31],i.aliases={month:{jan:1,feb:2,mar:3,apr:4,may:5,jun:6,jul:7,aug:8,sep:9,oct:10,nov:11,dec:12},dayOfWeek:{sun:0,mon:1,tue:2,wed:3,thu:4,fri:5,sat:6}},i.parseDefaults=["0","*","*","*","*","*"],i.standardValidCharacters=/^[,*\d/-]+$/,i.dayOfWeekValidCharacters=/^[?,*\dL#/-]+$/,i.dayOfMonthValidCharacters=/^[?,*\dL/-]+$/,i.validCharacters={second:i.standardValidCharacters,minute:i.standardValidCharacters,hour:i.standardValidCharacters,dayOfMonth:i.dayOfMonthValidCharacters,month:i.standardValidCharacters,dayOfWeek:i.dayOfWeekValidCharacters},i._isValidConstraintChar=function(e,t){return"string"==typeof t&&e.chars.some(function(e){return t.indexOf(e)>-1})},i._parseField=function(e,t,r){switch(e){case"month":case"dayOfWeek":var n=i.aliases[e];t=t.replace(/[a-z]{3}/gi,function(e){if(void 0!==n[e=e.toLowerCase()])return n[e];throw Error('Validation error, cannot resolve alias "'+e+'"')})}if(!i.validCharacters[e].test(t))throw Error("Invalid characters, got value: "+t);function a(e){var t=e.split("/");if(t.length>2)throw Error("Invalid repeat: "+e);return t.length>1?(t[0]==+t[0]&&(t=[t[0]+"-"+r.max,t[1]]),s(t[0],t[t.length-1])):s(e,1)}function s(t,n){var a=[],i=t.split("-");if(i.length>1){if(i.length<2)return+t;if(!i[0].length){if(!i[1].length)throw Error("Invalid range: "+t);return+t}var s=+i[0],o=+i[1];if(Number.isNaN(s)||Number.isNaN(o)||s<r.min||o>r.max)throw Error("Constraint error, got range "+s+"-"+o+" expected range "+r.min+"-"+r.max);if(s>o)throw Error("Invalid range: "+t);var l=+n;if(Number.isNaN(l)||l<=0)throw Error("Constraint error, cannot repeat at every "+l+" time.");"dayOfWeek"===e&&o%7==0&&a.push(0);for(var d=s;d<=o;d++)!(-1!==a.indexOf(d))&&l>0&&l%n==0?(l=1,a.push(d)):l++;return a}return Number.isNaN(+t)?t:+t}return -1!==t.indexOf("*")?t=t.replace(/\*/g,r.min+"-"+r.max):-1!==t.indexOf("?")&&(t=t.replace(/\?/g,r.min+"-"+r.max)),function(t){var n=[];function s(t){if(t instanceof Array)for(var a=0,s=t.length;a<s;a++){var o=t[a];if(i._isValidConstraintChar(r,o)){n.push(o);continue}if("number"!=typeof o||Number.isNaN(o)||o<r.min||o>r.max)throw Error("Constraint error, got value "+o+" expected range "+r.min+"-"+r.max);n.push(o)}else{if(i._isValidConstraintChar(r,t)){n.push(t);return}var l=+t;if(Number.isNaN(l)||l<r.min||l>r.max)throw Error("Constraint error, got value "+t+" expected range "+r.min+"-"+r.max);"dayOfWeek"===e&&(l%=7),n.push(l)}}var o=t.split(",");if(!o.every(function(e){return e.length>0}))throw Error("Invalid list value format");if(o.length>1)for(var l=0,d=o.length;l<d;l++)s(a(o[l]));else s(a(t));return n.sort(i._sortCompareFn),n}(t)},i._sortCompareFn=function(e,t){var r="number"==typeof e,n="number"==typeof t;return r&&n?e-t:!r&&n?1:r&&!n?-1:e.localeCompare(t)},i._handleMaxDaysInMonth=function(e){if(1===e.month.length){var t=i.daysInMonth[e.month[0]-1];if(e.dayOfMonth[0]>t)throw Error("Invalid explicit day of month definition");return e.dayOfMonth.filter(function(e){return"L"===e||e<=t}).sort(i._sortCompareFn)}},i._freezeFields=function(e){for(var t=0,r=i.map.length;t<r;++t){var n=i.map[t],a=e[n];e[n]=Object.freeze(a)}return Object.freeze(e)},i.prototype._applyTimezoneShift=function(e,t,r){if("Month"===r||"Day"===r){var n=e.getTime();e[t+r](),n===e.getTime()&&(0===e.getMinutes()&&0===e.getSeconds()?e.addHour():59===e.getMinutes()&&59===e.getSeconds()&&e.subtractHour())}else{var a=e.getHours();e[t+r]();var i=e.getHours(),s=i-a;2===s?24!==this.fields.hour.length&&(this._dstStart=i):0===s&&0===e.getMinutes()&&0===e.getSeconds()&&24!==this.fields.hour.length&&(this._dstEnd=i)}},i.prototype._findSchedule=function(e){function t(e,t){for(var r=0,n=t.length;r<n;r++)if(t[r]>=e)return t[r]===e;return t[0]===e}function r(e){return e.length>0&&e.some(function(e){return"string"==typeof e&&e.indexOf("L")>=0})}for(var a=(e=e||!1)?"subtract":"add",s=new n(this._currentDate,this._tz),o=this._startDate,l=this._endDate,d=s.getTime(),c=0;c<1e4;){if(c++,e){if(o&&s.getTime()-o.getTime()<0)throw Error("Out of the timespan range")}else if(l&&l.getTime()-s.getTime()<0)throw Error("Out of the timespan range");var u=t(s.getDate(),this.fields.dayOfMonth);r(this.fields.dayOfMonth)&&(u=u||s.isLastDayOfMonth());var p=t(s.getDay(),this.fields.dayOfWeek);r(this.fields.dayOfWeek)&&(p=p||this.fields.dayOfWeek.some(function(e){if(!r([e]))return!1;var t=Number.parseInt(e[0])%7;if(Number.isNaN(t))throw Error("Invalid last weekday of the month expression: "+e);return s.getDay()===t&&s.isLastWeekdayOfMonth()}));var y=this.fields.dayOfMonth.length>=i.daysInMonth[s.getMonth()],h=this.fields.dayOfWeek.length===i.constraints[5].max-i.constraints[5].min+1,m=s.getHours();if(!u&&(!p||h)||!y&&h&&!u||y&&!h&&!p||this._nthDayOfWeek>0&&!function(e,t){if(t<6){if(8>e.getDate()&&1===t)return!0;var r=e.getDate()%7?1:0;return Math.floor((e.getDate()-e.getDate()%7)/7)+r===t}return!1}(s,this._nthDayOfWeek)){this._applyTimezoneShift(s,a,"Day");continue}if(!t(s.getMonth()+1,this.fields.month)){this._applyTimezoneShift(s,a,"Month");continue}if(t(m,this.fields.hour)){if(this._dstEnd===m&&!e){this._dstEnd=null,this._applyTimezoneShift(s,"add","Hour");continue}}else{if(this._dstStart!==m){this._dstStart=null,this._applyTimezoneShift(s,a,"Hour");continue}if(!t(m-1,this.fields.hour)){s[a+"Hour"]();continue}}if(!t(s.getMinutes(),this.fields.minute)){this._applyTimezoneShift(s,a,"Minute");continue}if(!t(s.getSeconds(),this.fields.second)){this._applyTimezoneShift(s,a,"Second");continue}if(d===s.getTime()){"add"===a||0===s.getMilliseconds()?this._applyTimezoneShift(s,a,"Second"):s.setMilliseconds(0);continue}break}if(c>=1e4)throw Error("Invalid expression, loop limit exceeded");return this._currentDate=new n(s,this._tz),this._hasIterated=!0,s},i.prototype.next=function(){var e=this._findSchedule();return this._isIterator?{value:e,done:!this.hasNext()}:e},i.prototype.prev=function(){var e=this._findSchedule(!0);return this._isIterator?{value:e,done:!this.hasPrev()}:e},i.prototype.hasNext=function(){var e=this._currentDate,t=this._hasIterated;try{return this._findSchedule(),!0}catch(e){return!1}finally{this._currentDate=e,this._hasIterated=t}},i.prototype.hasPrev=function(){var e=this._currentDate,t=this._hasIterated;try{return this._findSchedule(!0),!0}catch(e){return!1}finally{this._currentDate=e,this._hasIterated=t}},i.prototype.iterate=function(e,t){var r=[];if(e>=0)for(var n=0,a=e;n<a;n++)try{var i=this.next();r.push(i),t&&t(i,n)}catch(e){break}else for(var n=0,a=e;n>a;n--)try{var i=this.prev();r.push(i),t&&t(i,n)}catch(e){break}return r},i.prototype.reset=function(e){this._currentDate=new n(e||this._options.currentDate)},i.prototype.stringify=function(e){for(var t=[],r=e?0:1,n=i.map.length;r<n;++r){var s=i.map[r],o=this.fields[s],l=i.constraints[r];"dayOfMonth"===s&&1===this.fields.month.length?l={min:1,max:i.daysInMonth[this.fields.month[0]-1]}:"dayOfWeek"===s&&(l={min:0,max:6},o=7===o[o.length-1]?o.slice(0,-1):o),t.push(a(o,l.min,l.max))}return t.join(" ")},i.parse=function(e,t){var r=this;return"function"==typeof t&&(t={}),function(e,t){t||(t={}),void 0===t.currentDate&&(t.currentDate=new n(void 0,r._tz)),i.predefined[e]&&(e=i.predefined[e]);var a=[],s=(e+"").trim().split(/\s+/);if(s.length>6)throw Error("Invalid cron expression");for(var o=i.map.length-s.length,l=0,d=i.map.length;l<d;++l){var c=i.map[l],u=s[s.length>d?l:l-o];if(l<o||!u)a.push(i._parseField(c,i.parseDefaults[l],i.constraints[l]));else{var p="dayOfWeek"===c?function(e){var r=e.split("#");if(r.length>1){var n=+r[r.length-1];if(/,/.test(e))throw Error("Constraint error, invalid dayOfWeek `#` and `,` special characters are incompatible");if(/\//.test(e))throw Error("Constraint error, invalid dayOfWeek `#` and `/` special characters are incompatible");if(/-/.test(e))throw Error("Constraint error, invalid dayOfWeek `#` and `-` special characters are incompatible");if(r.length>2||Number.isNaN(n)||n<1||n>5)throw Error("Constraint error, invalid dayOfWeek occurrence number (#)");return t.nthDayOfWeek=n,r[0]}return e}(u):u;a.push(i._parseField(c,p,i.constraints[l]))}}for(var y={},l=0,d=i.map.length;l<d;l++)y[i.map[l]]=a[l];var h=i._handleMaxDaysInMonth(y);return y.dayOfMonth=h||y.dayOfMonth,new i(y,t)}(e,t)},i.fieldsToExpression=function(e,t){for(var r={},n=0,a=i.map.length;n<a;++n){var s=i.map[n],o=e[s];!function(e,t,r){if(!t)throw Error("Validation error, Field "+e+" is missing");if(0===t.length)throw Error("Validation error, Field "+e+" contains no values");for(var n=0,a=t.length;n<a;n++){var s=t[n];if(!i._isValidConstraintChar(r,s)&&("number"!=typeof s||Number.isNaN(s)||s<r.min||s>r.max))throw Error("Constraint error, got value "+s+" expected range "+r.min+"-"+r.max)}}(s,o,i.constraints[n]);for(var l=[],d=-1;++d<o.length;)l[d]=o[d];if((o=l.sort(i._sortCompareFn).filter(function(e,t,r){return!t||e!==r[t-1]})).length!==l.length)throw Error("Validation error, Field "+s+" contains duplicate values");r[s]=o}var c=i._handleMaxDaysInMonth(r);return r.dayOfMonth=c||r.dayOfMonth,new i(r,t||{})},e.exports=i},1754:e=>{"use strict";function t(e){return{start:e,count:1}}function r(e,t){e.end=t,e.step=t-e.start,e.count=2}function n(e,r,n){r&&(2===r.count?(e.push(t(r.start)),e.push(t(r.end))):e.push(r)),n&&e.push(n)}e.exports=function(e){for(var a=[],i=void 0,s=0;s<e.length;s++){var o=e[s];"number"!=typeof o?(n(a,i,t(o)),i=void 0):i?1===i.count?r(i,o):i.step===o-i.end?(i.count++,i.end=o):2===i.count?(a.push(t(i.start)),r(i=t(i.end),o)):(n(a,i),i=t(o)):i=t(o)}return n(a,i),a}},3417:(e,t,r)=>{"use strict";var n=r(1754);e.exports=function(e,t,r){var a=n(e);if(1===a.length){var i=a[0],s=i.step;if(1===s&&i.start===t&&i.end===r)return"*";if(1!==s&&i.start===t&&i.end===r-s+1)return"*/"+s}for(var o=[],l=0,d=a.length;l<d;++l){var c=a[l];if(1===c.count){o.push(c.start);continue}var s=c.step;if(1===c.step){o.push(c.start+"-"+c.end);continue}var u=0==c.start?c.count-1:c.count;c.step*u>c.end?o=o.concat(Array.from({length:c.end-c.start+1}).map(function(e,t){var r=c.start+t;return(r-c.start)%c.step==0?r:null}).filter(function(e){return null!=e})):c.end===r-c.step+1?o.push(c.start+"/"+c.step):o.push(c.start+"-"+c.end+"/"+c.step)}return o.join(",")}},314:(e,t,r)=>{"use strict";var n=r(3354);function a(){}a._parseEntry=function(e){var t=e.split(" ");if(6===t.length)return{interval:n.parse(e)};if(t.length>6)return{interval:n.parse(t.slice(0,6).join(" ")),command:t.slice(6,t.length)};throw Error("Invalid entry: "+e)},a.parseExpression=function(e,t){return n.parse(e,t)},a.fieldsToExpression=function(e,t){return n.fieldsToExpression(e,t)},a.parseString=function(e){for(var t=e.split("\n"),r={variables:{},expressions:[],errors:{}},n=0,i=t.length;n<i;n++){var s=t[n],o=null,l=s.trim();if(l.length>0){if(l.match(/^#/))continue;if(o=l.match(/^(.*)=(.*)$/))r.variables[o[1]]=o[2];else{var d=null;try{d=a._parseEntry("0 "+l),r.expressions.push(d.interval)}catch(e){r.errors[l]=e}}}}return r},a.parseFile=function(e,t){r(2048).readFile(e,function(e,r){if(e){t(e);return}return t(null,a.parseString(r.toString()))})},e.exports=a},3050:(e,t,r)=>{t.formatArgs=function(t){if(t[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+t[0]+(this.useColors?"%c ":" ")+"+"+e.exports.humanize(this.diff),!this.useColors)return;let r="color: "+this.color;t.splice(1,0,r,"color: inherit");let n=0,a=0;t[0].replace(/%[a-zA-Z%]/g,e=>{"%%"!==e&&(n++,"%c"===e&&(a=n))}),t.splice(a,0,r)},t.save=function(e){try{e?t.storage.setItem("debug",e):t.storage.removeItem("debug")}catch(e){}},t.load=function(){let e;try{e=t.storage.getItem("debug")}catch(e){}return!e&&"undefined"!=typeof process&&"env"in process&&(e=process.env.DEBUG),e},t.useColors=function(){let e;return"undefined"!=typeof window&&!!window.process&&("renderer"===window.process.type||!!window.process.__nwjs)||!("undefined"!=typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))&&("undefined"!=typeof document&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||"undefined"!=typeof window&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||"undefined"!=typeof navigator&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||"undefined"!=typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/))},t.storage=function(){try{return localStorage}catch(e){}}(),t.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})(),t.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"],t.log=console.debug||console.log||(()=>{}),e.exports=r(783)(t);let{formatters:n}=e.exports;n.j=function(e){try{return JSON.stringify(e)}catch(e){return"[UnexpectedJSONParseError]: "+e.message}}},783:(e,t,r)=>{e.exports=function(e){function t(e){let r,a,i;let s=null;function o(...e){if(!o.enabled)return;let n=Number(new Date),a=n-(r||n);o.diff=a,o.prev=r,o.curr=n,r=n,e[0]=t.coerce(e[0]),"string"!=typeof e[0]&&e.unshift("%O");let i=0;e[0]=e[0].replace(/%([a-zA-Z%])/g,(r,n)=>{if("%%"===r)return"%";i++;let a=t.formatters[n];if("function"==typeof a){let t=e[i];r=a.call(o,t),e.splice(i,1),i--}return r}),t.formatArgs.call(o,e),(o.log||t.log).apply(o,e)}return o.namespace=e,o.useColors=t.useColors(),o.color=t.selectColor(e),o.extend=n,o.destroy=t.destroy,Object.defineProperty(o,"enabled",{enumerable:!0,configurable:!1,get:()=>null!==s?s:(a!==t.namespaces&&(a=t.namespaces,i=t.enabled(e)),i),set:e=>{s=e}}),"function"==typeof t.init&&t.init(o),o}function n(e,r){let n=t(this.namespace+(void 0===r?":":r)+e);return n.log=this.log,n}function a(e,t){let r=0,n=0,a=-1,i=0;for(;r<e.length;)if(n<t.length&&(t[n]===e[r]||"*"===t[n]))"*"===t[n]?(a=n,i=r):r++,n++;else{if(-1===a)return!1;n=a+1,r=++i}for(;n<t.length&&"*"===t[n];)n++;return n===t.length}return t.debug=t,t.default=t,t.coerce=function(e){return e instanceof Error?e.stack||e.message:e},t.disable=function(){let e=[...t.names,...t.skips.map(e=>"-"+e)].join(",");return t.enable(""),e},t.enable=function(e){for(let r of(t.save(e),t.namespaces=e,t.names=[],t.skips=[],("string"==typeof e?e:"").trim().replace(" ",",").split(",").filter(Boolean)))"-"===r[0]?t.skips.push(r.slice(1)):t.names.push(r)},t.enabled=function(e){for(let r of t.skips)if(a(e,r))return!1;for(let r of t.names)if(a(e,r))return!0;return!1},t.humanize=r(3974),t.destroy=function(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")},Object.keys(e).forEach(r=>{t[r]=e[r]}),t.names=[],t.skips=[],t.formatters={},t.selectColor=function(e){let r=0;for(let t=0;t<e.length;t++)r=(r<<5)-r+e.charCodeAt(t)|0;return t.colors[Math.abs(r)%t.colors.length]},t.enable(t.load()),t}},9092:(e,t,r)=>{"undefined"==typeof process||"renderer"===process.type||process.__nwjs?e.exports=r(3050):e.exports=r(2226)},2226:(e,t,r)=>{let n=r(4175),a=r(1764);t.init=function(e){e.inspectOpts={};let r=Object.keys(t.inspectOpts);for(let n=0;n<r.length;n++)e.inspectOpts[r[n]]=t.inspectOpts[r[n]]},t.log=function(...e){return process.stderr.write(a.formatWithOptions(t.inspectOpts,...e)+"\n")},t.formatArgs=function(r){let{namespace:n,useColors:a}=this;if(a){let t=this.color,a="\x1b[3"+(t<8?t:"8;5;"+t),i=`  ${a};1m${n} \u001B[0m`;r[0]=i+r[0].split("\n").join("\n"+i),r.push(a+"m+"+e.exports.humanize(this.diff)+"\x1b[0m")}else r[0]=(t.inspectOpts.hideDate?"":new Date().toISOString()+" ")+n+" "+r[0]},t.save=function(e){e?process.env.DEBUG=e:delete process.env.DEBUG},t.load=function(){return process.env.DEBUG},t.useColors=function(){return"colors"in t.inspectOpts?!!t.inspectOpts.colors:n.isatty(process.stderr.fd)},t.destroy=a.deprecate(()=>{},"Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."),t.colors=[6,2,3,4,5,1];try{let e=r(7057);e&&(e.stderr||e).level>=2&&(t.colors=[20,21,26,27,32,33,38,39,40,41,42,43,44,45,56,57,62,63,68,69,74,75,76,77,78,79,80,81,92,93,98,99,112,113,128,129,134,135,148,149,160,161,162,163,164,165,166,167,168,169,170,171,172,173,178,179,184,185,196,197,198,199,200,201,202,203,204,205,206,207,208,209,214,215,220,221])}catch(e){}t.inspectOpts=Object.keys(process.env).filter(e=>/^debug_/i.test(e)).reduce((e,t)=>{let r=t.substring(6).toLowerCase().replace(/_([a-z])/g,(e,t)=>t.toUpperCase()),n=process.env[t];return n=!!/^(yes|on|true|enabled)$/i.test(n)||!/^(no|off|false|disabled)$/i.test(n)&&("null"===n?null:Number(n)),e[r]=n,e},{}),e.exports=r(783)(t);let{formatters:i}=e.exports;i.o=function(e){return this.inspectOpts.colors=this.useColors,a.inspect(e,this.inspectOpts).split("\n").map(e=>e.trim()).join(" ")},i.O=function(e){return this.inspectOpts.colors=this.useColors,a.inspect(e,this.inspectOpts)}},5561:e=>{"use strict";function t(e,t){var t=t||{};this._capacity=t.capacity,this._head=0,this._tail=0,Array.isArray(e)?this._fromArray(e):(this._capacityMask=3,this._list=[,,,,])}t.prototype.peekAt=function(e){var t=e;if(t===(0|t)){var r=this.size();if(!(t>=r)&&!(t<-r))return t<0&&(t+=r),t=this._head+t&this._capacityMask,this._list[t]}},t.prototype.get=function(e){return this.peekAt(e)},t.prototype.peek=function(){if(this._head!==this._tail)return this._list[this._head]},t.prototype.peekFront=function(){return this.peek()},t.prototype.peekBack=function(){return this.peekAt(-1)},Object.defineProperty(t.prototype,"length",{get:function(){return this.size()}}),t.prototype.size=function(){return this._head===this._tail?0:this._head<this._tail?this._tail-this._head:this._capacityMask+1-(this._head-this._tail)},t.prototype.unshift=function(e){if(0==arguments.length)return this.size();var t=this._list.length;return(this._head=this._head-1+t&this._capacityMask,this._list[this._head]=e,this._tail===this._head&&this._growArray(),this._capacity&&this.size()>this._capacity&&this.pop(),this._head<this._tail)?this._tail-this._head:this._capacityMask+1-(this._head-this._tail)},t.prototype.shift=function(){var e=this._head;if(e!==this._tail){var t=this._list[e];return this._list[e]=void 0,this._head=e+1&this._capacityMask,e<2&&this._tail>1e4&&this._tail<=this._list.length>>>2&&this._shrinkArray(),t}},t.prototype.push=function(e){if(0==arguments.length)return this.size();var t=this._tail;return(this._list[t]=e,this._tail=t+1&this._capacityMask,this._tail===this._head&&this._growArray(),this._capacity&&this.size()>this._capacity&&this.shift(),this._head<this._tail)?this._tail-this._head:this._capacityMask+1-(this._head-this._tail)},t.prototype.pop=function(){var e=this._tail;if(e!==this._head){var t=this._list.length;this._tail=e-1+t&this._capacityMask;var r=this._list[this._tail];return this._list[this._tail]=void 0,this._head<2&&e>1e4&&e<=t>>>2&&this._shrinkArray(),r}},t.prototype.removeOne=function(e){var t,r=e;if(r===(0|r)&&this._head!==this._tail){var n=this.size(),a=this._list.length;if(!(r>=n)&&!(r<-n)){r<0&&(r+=n),r=this._head+r&this._capacityMask;var i=this._list[r];if(e<n/2){for(t=e;t>0;t--)this._list[r]=this._list[r=r-1+a&this._capacityMask];this._list[r]=void 0,this._head=this._head+1+a&this._capacityMask}else{for(t=n-1-e;t>0;t--)this._list[r]=this._list[r=r+1+a&this._capacityMask];this._list[r]=void 0,this._tail=this._tail-1+a&this._capacityMask}return i}}},t.prototype.remove=function(e,t){var r,n,a=e,i=t;if(a===(0|a)&&this._head!==this._tail){var s=this.size(),o=this._list.length;if(!(a>=s)&&!(a<-s)&&!(t<1)){if(a<0&&(a+=s),1===t||!t)return(r=[,])[0]=this.removeOne(a),r;if(0===a&&a+t>=s)return r=this.toArray(),this.clear(),r;for(a+t>s&&(t=s-a),r=Array(t),n=0;n<t;n++)r[n]=this._list[this._head+a+n&this._capacityMask];if(a=this._head+a&this._capacityMask,e+t===s){for(this._tail=this._tail-t+o&this._capacityMask,n=t;n>0;n--)this._list[a=a+1+o&this._capacityMask]=void 0;return r}if(0===e){for(this._head=this._head+t+o&this._capacityMask,n=t-1;n>0;n--)this._list[a=a+1+o&this._capacityMask]=void 0;return r}if(a<s/2){for(this._head=this._head+e+t+o&this._capacityMask,n=e;n>0;n--)this.unshift(this._list[a=a-1+o&this._capacityMask]);for(a=this._head-1+o&this._capacityMask;i>0;)this._list[a=a-1+o&this._capacityMask]=void 0,i--;e<0&&(this._tail=a)}else{for(this._tail=a,a=a+t+o&this._capacityMask,n=s-(t+e);n>0;n--)this.push(this._list[a++]);for(a=this._tail;i>0;)this._list[a=a+1+o&this._capacityMask]=void 0,i--}return this._head<2&&this._tail>1e4&&this._tail<=o>>>2&&this._shrinkArray(),r}}},t.prototype.splice=function(e,t){var r=e;if(r===(0|r)){var n=this.size();if(r<0&&(r+=n),!(r>n)){if(!(arguments.length>2))return this.remove(r,t);var a,i,s,o=arguments.length,l=this._list.length,d=2;if(!n||r<n/2){for(a=0,i=Array(r);a<r;a++)i[a]=this._list[this._head+a&this._capacityMask];for(0===t?(s=[],r>0&&(this._head=this._head+r+l&this._capacityMask)):(s=this.remove(r,t),this._head=this._head+r+l&this._capacityMask);o>d;)this.unshift(arguments[--o]);for(a=r;a>0;a--)this.unshift(i[a-1])}else{var c=(i=Array(n-(r+t))).length;for(a=0;a<c;a++)i[a]=this._list[this._head+r+t+a&this._capacityMask];for(0===t?(s=[],r!=n&&(this._tail=this._head+r+l&this._capacityMask)):(s=this.remove(r,t),this._tail=this._tail-c+l&this._capacityMask);d<o;)this.push(arguments[d++]);for(a=0;a<c;a++)this.push(i[a])}return s}}},t.prototype.clear=function(){this._list=Array(this._list.length),this._head=0,this._tail=0},t.prototype.isEmpty=function(){return this._head===this._tail},t.prototype.toArray=function(){return this._copyArray(!1)},t.prototype._fromArray=function(e){var t=e.length,r=this._nextPowerOf2(t);this._list=Array(r),this._capacityMask=r-1,this._tail=t;for(var n=0;n<t;n++)this._list[n]=e[n]},t.prototype._copyArray=function(e,t){var r,n=this._list,a=n.length,i=this.length;if((t|=i)==i&&this._head<this._tail)return this._list.slice(this._head,this._tail);var s=Array(t),o=0;if(e||this._head>this._tail){for(r=this._head;r<a;r++)s[o++]=n[r];for(r=0;r<this._tail;r++)s[o++]=n[r]}else for(r=this._head;r<this._tail;r++)s[o++]=n[r];return s},t.prototype._growArray=function(){if(0!=this._head){var e=this._copyArray(!0,this._list.length<<1);this._tail=this._list.length,this._head=0,this._list=e}else this._tail=this._list.length,this._list.length<<=1;this._capacityMask=this._capacityMask<<1|1},t.prototype._shrinkArray=function(){this._list.length>>>=1,this._capacityMask>>>=1},t.prototype._nextPowerOf2=function(e){return Math.max(1<<Math.log(e)/Math.log(2)+1,4)},e.exports=t},2616:e=>{"use strict";e.exports=(e,t=process.argv)=>{let r=e.startsWith("-")?"":1===e.length?"-":"--",n=t.indexOf(r+e),a=t.indexOf("--");return -1!==n&&(-1===a||n<a)}},9749:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});let n=r(8942),a=r(4358),i=r(3499),s=r(67);class o{constructor(e,t=[],r={},n){if(this.name=e,this.inTransaction=!1,this.isResolved=!1,this.transformed=!1,this.replyEncoding=r.replyEncoding,this.errorStack=r.errorStack,this.args=t.flat(),this.callback=n,this.initPromise(),r.keyPrefix){let e=r.keyPrefix instanceof Buffer,t=e?r.keyPrefix:null;this._iterateKeys(n=>n instanceof Buffer?(null===t&&(t=Buffer.from(r.keyPrefix)),Buffer.concat([t,n])):e?Buffer.concat([r.keyPrefix,Buffer.from(String(n))]):r.keyPrefix+n)}r.readOnly&&(this.isReadOnly=!0)}static checkFlag(e,t){return!!this.getFlagMap()[e][t]}static setArgumentTransformer(e,t){this._transformer.argument[e]=t}static setReplyTransformer(e,t){this._transformer.reply[e]=t}static getFlagMap(){return this.flagMap||(this.flagMap=Object.keys(o.FLAGS).reduce((e,t)=>(e[t]={},o.FLAGS[t].forEach(r=>{e[t][r]=!0}),e),{})),this.flagMap}getSlot(){if(void 0===this.slot){let e=this.getKeys()[0];this.slot=null==e?null:a(e)}return this.slot}getKeys(){return this._iterateKeys()}toWritable(e){let t;let r="*"+(this.args.length+1)+"\r\n$"+Buffer.byteLength(this.name)+"\r\n"+this.name+"\r\n";if(this.bufferMode){let e=new c;e.push(r);for(let t=0;t<this.args.length;++t){let r=this.args[t];r instanceof Buffer?0===r.length?e.push("$0\r\n\r\n"):(e.push("$"+r.length+"\r\n"),e.push(r),e.push("\r\n")):e.push("$"+Buffer.byteLength(r)+"\r\n"+r+"\r\n")}t=e.toBuffer()}else{t=r;for(let e=0;e<this.args.length;++e){let r=this.args[e];t+="$"+Buffer.byteLength(r)+"\r\n"+r+"\r\n"}}return t}stringifyArguments(){for(let e=0;e<this.args.length;++e){let t=this.args[e];"string"==typeof t||(t instanceof Buffer?this.bufferMode=!0:this.args[e]=(0,s.toArg)(t))}}transformReply(e){this.replyEncoding&&(e=(0,s.convertBufferToString)(e,this.replyEncoding));let t=o._transformer.reply[this.name];return t&&(e=t(e)),e}setTimeout(e){this._commandTimeoutTimer||(this._commandTimeoutTimer=setTimeout(()=>{this.isResolved||this.reject(Error("Command timed out"))},e))}initPromise(){let e=new Promise((e,t)=>{if(!this.transformed){this.transformed=!0;let e=o._transformer.argument[this.name];e&&(this.args=e(this.args)),this.stringifyArguments()}this.resolve=this._convertValue(e),this.errorStack?this.reject=e=>{t((0,s.optimizeErrorStack)(e,this.errorStack.stack,__dirname))}:this.reject=t});this.promise=(0,i.default)(e,this.callback)}_iterateKeys(e=e=>e){if(void 0===this.keys&&(this.keys=[],(0,n.exists)(this.name)))for(let t of(0,n.getKeyIndexes)(this.name,this.args))this.args[t]=e(this.args[t]),this.keys.push(this.args[t]);return this.keys}_convertValue(e){return t=>{try{let r=this._commandTimeoutTimer;r&&(clearTimeout(r),delete this._commandTimeoutTimer),e(this.transformReply(t)),this.isResolved=!0}catch(e){this.reject(e)}return this.promise}}}t.default=o,o.FLAGS={VALID_IN_SUBSCRIBER_MODE:["subscribe","psubscribe","unsubscribe","punsubscribe","ssubscribe","sunsubscribe","ping","quit"],VALID_IN_MONITOR_MODE:["monitor","auth"],ENTER_SUBSCRIBER_MODE:["subscribe","psubscribe","ssubscribe"],EXIT_SUBSCRIBER_MODE:["unsubscribe","punsubscribe","sunsubscribe"],WILL_DISCONNECT:["quit"]},o._transformer={argument:{},reply:{}};let l=function(e){if(1===e.length){if(e[0]instanceof Map)return(0,s.convertMapToArray)(e[0]);if("object"==typeof e[0]&&null!==e[0])return(0,s.convertObjectToArray)(e[0])}return e},d=function(e){if(2===e.length){if(e[1]instanceof Map)return[e[0]].concat((0,s.convertMapToArray)(e[1]));if("object"==typeof e[1]&&null!==e[1])return[e[0]].concat((0,s.convertObjectToArray)(e[1]))}return e};o.setArgumentTransformer("mset",l),o.setArgumentTransformer("msetnx",l),o.setArgumentTransformer("hset",d),o.setArgumentTransformer("hmset",d),o.setReplyTransformer("hgetall",function(e){if(Array.isArray(e)){let t={};for(let r=0;r<e.length;r+=2){let n=e[r],a=e[r+1];n in t?Object.defineProperty(t,n,{value:a,configurable:!0,enumerable:!0,writable:!0}):t[n]=a}return t}return e});class c{constructor(){this.length=0,this.items=[]}push(e){this.length+=Buffer.byteLength(e),this.items.push(e)}toBuffer(){let e=Buffer.allocUnsafe(this.length),t=0;for(let r of this.items){let n=Buffer.byteLength(r);Buffer.isBuffer(r)?r.copy(e,t):e.write(r,t,n),t+=n}return e}}},385:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});let n=r(9749),a=r(67),i=r(7898),s=r(1359),o=(0,a.Debug)("dataHandler");class l{constructor(e,t){this.redis=e;let r=new i({stringNumbers:t.stringNumbers,returnBuffers:!0,returnError:e=>{this.returnError(e)},returnFatalError:e=>{this.returnFatalError(e)},returnReply:e=>{this.returnReply(e)}});e.stream.prependListener("data",e=>{r.execute(e)}),e.stream.resume()}returnFatalError(e){e.message+=". Please report this.",this.redis.recoverFromFatalError(e,e,{offlineQueue:!1})}returnError(e){let t=this.shiftCommand(e);t&&(e.command={name:t.command.name,args:t.command.args},this.redis.handleReconnection(e,t))}returnReply(e){if(this.handleMonitorReply(e)||this.handleSubscriberReply(e))return;let t=this.shiftCommand(e);t&&(n.default.checkFlag("ENTER_SUBSCRIBER_MODE",t.command.name)?(this.redis.condition.subscriber=new s.default,this.redis.condition.subscriber.add(t.command.name,e[1].toString()),c(t.command,e[2])||this.redis.commandQueue.unshift(t)):n.default.checkFlag("EXIT_SUBSCRIBER_MODE",t.command.name)?u(t.command,e[2])||this.redis.commandQueue.unshift(t):t.command.resolve(e))}handleSubscriberReply(e){if(!this.redis.condition.subscriber)return!1;let t=Array.isArray(e)?e[0].toString():null;switch(o('receive reply "%s" in subscriber mode',t),t){case"message":this.redis.listeners("message").length>0&&this.redis.emit("message",e[1].toString(),e[2]?e[2].toString():""),this.redis.emit("messageBuffer",e[1],e[2]);break;case"pmessage":{let t=e[1].toString();this.redis.listeners("pmessage").length>0&&this.redis.emit("pmessage",t,e[2].toString(),e[3].toString()),this.redis.emit("pmessageBuffer",t,e[2],e[3]);break}case"smessage":this.redis.listeners("smessage").length>0&&this.redis.emit("smessage",e[1].toString(),e[2]?e[2].toString():""),this.redis.emit("smessageBuffer",e[1],e[2]);break;case"ssubscribe":case"subscribe":case"psubscribe":{let r=e[1].toString();this.redis.condition.subscriber.add(t,r);let n=this.shiftCommand(e);if(!n)return;c(n.command,e[2])||this.redis.commandQueue.unshift(n);break}case"sunsubscribe":case"unsubscribe":case"punsubscribe":{let r=e[1]?e[1].toString():null;r&&this.redis.condition.subscriber.del(t,r);let n=e[2];0===Number(n)&&(this.redis.condition.subscriber=!1);let a=this.shiftCommand(e);if(!a)return;u(a.command,n)||this.redis.commandQueue.unshift(a);break}default:{let t=this.shiftCommand(e);if(!t)return;t.command.resolve(e)}}return!0}handleMonitorReply(e){if("monitoring"!==this.redis.status)return!1;let t=e.toString();if("OK"===t)return!1;let r=t.indexOf(" "),n=t.slice(0,r),a=t.indexOf('"'),i=t.slice(a+1,-1).split('" "').map(e=>e.replace(/\\"/g,'"')),s=t.slice(r+2,a-2).split(" ");return this.redis.emit("monitor",n,i,s[1],s[0]),!0}shiftCommand(e){let t=this.redis.commandQueue.shift();if(!t){let t=Error("Command queue state error. If you can reproduce this, please report it."+(e instanceof Error?` Last error: ${e.message}`:` Last reply: ${e.toString()}`));return this.redis.emit("error",t),null}return t}}t.default=l;let d=new WeakMap;function c(e,t){let r=d.has(e)?d.get(e):e.args.length;return(r-=1)<=0?(e.resolve(t),d.delete(e),!0):(d.set(e,r),!1)}function u(e,t){let r=d.has(e)?d.get(e):e.args.length;return 0===r?0===Number(t)&&(d.delete(e),e.resolve(t),!0):(r-=1)<=0?(e.resolve(t),!0):(d.set(e,r),!1)}},9770:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});let n=r(4358),a=r(8942),i=r(3499),s=r(1764),o=r(9749),l=r(67),d=r(6789);class c extends d.default{constructor(e){super(),this.redis=e,this.isPipeline=!0,this.replyPending=0,this._queue=[],this._result=[],this._transactions=0,this._shaToScript={},this.isCluster="Cluster"===this.redis.constructor.name||this.redis.isCluster,this.options=e.options,Object.keys(e.scriptsSet).forEach(t=>{let r=e.scriptsSet[t];this._shaToScript[r.sha]=r,this[t]=e[t],this[t+"Buffer"]=e[t+"Buffer"]}),e.addedBuiltinSet.forEach(t=>{this[t]=e[t],this[t+"Buffer"]=e[t+"Buffer"]}),this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t});let t=this;Object.defineProperty(this,"length",{get:function(){return t._queue.length}})}fillResult(e,t){if("exec"===this._queue[t].name&&Array.isArray(e[1])){let r=e[1].length;for(let n=0;n<r;n++){if(e[1][n]instanceof Error)continue;let a=this._queue[t-(r-n)];try{e[1][n]=a.transformReply(e[1][n])}catch(t){e[1][n]=t}}}if(this._result[t]=e,--this.replyPending)return;if(this.isCluster){let e,t=!0;for(let r=0;r<this._result.length;++r){let n=this._result[r][0],i=this._queue[r];if(n){if("exec"===i.name&&"EXECABORT Transaction discarded because of previous errors."===n.message)continue;if(e){if(e.name!==n.name||e.message!==n.message){t=!1;break}}else e={name:n.name,message:n.message}}else if(!i.inTransaction&&!((0,a.exists)(i.name)&&(0,a.hasFlag)(i.name,"readonly"))){t=!1;break}}if(e&&t){let t=this,r=e.message.split(" "),n=this._queue,a=!1;this._queue=[];for(let e=0;e<n.length;++e){if("ASK"===r[0]&&!a&&"asking"!==n[e].name&&(!n[e-1]||"asking"!==n[e-1].name)){let e=new o.default("asking");e.ignore=!0,this.sendCommand(e)}n[e].initPromise(),this.sendCommand(n[e]),a=n[e].inTransaction}let i=!0;void 0===this.leftRedirections&&(this.leftRedirections={});let s=function(){t.exec()},l=this.redis;if(l.handleError(e,this.leftRedirections,{moved:function(e,n){t.preferKey=n,l.slots[r[1]]=[n],l._groupsBySlot[r[1]]=l._groupsIds[l.slots[r[1]].join(";")],l.refreshSlotsCache(),t.exec()},ask:function(e,r){t.preferKey=r,t.exec()},tryagain:s,clusterDown:s,connectionClosed:s,maxRedirections:()=>{i=!1},defaults:()=>{i=!1}}),i)return}}let r=0;for(let e=0;e<this._queue.length-r;++e)this._queue[e+r].ignore&&(r+=1),this._result[e]=this._result[e+r];this.resolve(this._result.slice(0,this._result.length-r))}sendCommand(e){this._transactions>0&&(e.inTransaction=!0);let t=this._queue.length;return e.pipelineIndex=t,e.promise.then(e=>{this.fillResult([null,e],t)}).catch(e=>{this.fillResult([e],t)}),this._queue.push(e),this}addBatch(e){let t,r,n;for(let a=0;a<e.length;++a)r=(t=e[a])[0],n=t.slice(1),this[r].apply(this,n);return this}}t.default=c;let u=c.prototype.multi;c.prototype.multi=function(){return this._transactions+=1,u.apply(this,arguments)};let p=c.prototype.execBuffer;c.prototype.execBuffer=(0,s.deprecate)(function(){return this._transactions>0&&(this._transactions-=1),p.apply(this,arguments)},"Pipeline#execBuffer: Use Pipeline#exec instead"),c.prototype.exec=function(e){let t;if(this.isCluster&&!this.redis.slots.length)return"wait"===this.redis.status&&this.redis.connect().catch(l.noop),e&&!this.nodeifiedPromise&&(this.nodeifiedPromise=!0,(0,i.default)(this.promise,e)),this.redis.delayUntilReady(t=>{if(t){this.reject(t);return}this.exec(e)}),this.promise;if(this._transactions>0)return this._transactions-=1,p.apply(this,arguments);if(this.nodeifiedPromise||(this.nodeifiedPromise=!0,(0,i.default)(this.promise,e)),this._queue.length||this.resolve([]),this.isCluster){let e=[];for(let t=0;t<this._queue.length;t++){let r=this._queue[t].getKeys();if(r.length&&e.push(r[0]),r.length&&0>n.generateMulti(r))return this.reject(Error("All the keys in a pipeline command should belong to the same slot")),this.promise}if(e.length){if((t=function(e,t){let r=n(t[0]),a=e._groupsBySlot[r];for(let r=1;r<t.length;r++)if(e._groupsBySlot[n(t[r])]!==a)return -1;return r}(this.redis,e))<0)return this.reject(Error("All keys in the pipeline should belong to the same slots allocation group")),this.promise}else t=16384*Math.random()|0}let r=this;return function(){let e,n,a=r.replyPending=r._queue.length;r.isCluster&&(e={slot:t,redis:r.redis.connectionPool.nodes.all[r.preferKey]});let i="",s={isPipeline:!0,destination:r.isCluster?e:{redis:r.redis},write(e){"string"!=typeof e?(n||(n=[]),i&&(n.push(Buffer.from(i,"utf8")),i=""),n.push(e)):i+=e,--a||(n?(i&&n.push(Buffer.from(i,"utf8")),s.destination.redis.stream.write(Buffer.concat(n))):s.destination.redis.stream.write(i),a=r._queue.length,i="",n=void 0)}};for(let t=0;t<r._queue.length;++t)r.redis.sendCommand(r._queue[t],s,e);r.promise}(),this.promise}},266:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});let n=r(8942),a=r(7702),i=r(3499),s=r(2742),o=r(9749),l=r(5929),d=r(2280),c=r(4797),u=r(3233),p=r(5842),y=r(8064),h=r(67),m=r(2449),f=r(6789),b=r(1681),g=r(5561),K=(0,h.Debug)("redis");class v extends f.default{constructor(e,t,r){if(super(),this.status="wait",this.isCluster=!1,this.reconnectTimeout=null,this.connectionEpoch=0,this.retryAttempts=0,this.manuallyClosing=!1,this._autoPipelines=new Map,this._runningAutoPipelines=new Set,this.parseOptions(e,t,r),a.EventEmitter.call(this),this.resetCommandQueue(),this.resetOfflineQueue(),this.options.Connector)this.connector=new this.options.Connector(this.options);else if(this.options.sentinels){let e=new d.default(this.options);e.emitter=this,this.connector=e}else this.connector=new l.StandaloneConnector(this.options);this.options.scripts&&Object.entries(this.options.scripts).forEach(([e,t])=>{this.defineCommand(e,t)}),this.options.lazyConnect?this.setStatus("wait"):this.connect().catch(b.noop)}static createClient(...e){return new v(...e)}get autoPipelineQueueSize(){let e=0;for(let t of this._autoPipelines.values())e+=t.length;return e}connect(e){let t=new Promise((e,t)=>{if("connecting"===this.status||"connect"===this.status||"ready"===this.status){t(Error("Redis is already connecting/connected"));return}this.connectionEpoch+=1,this.setStatus("connecting");let{options:r}=this;this.condition={select:r.db,auth:r.username?[r.username,r.password]:r.password,subscriber:!1};let n=this;(0,i.default)(this.connector.connect(function(e,t){n.silentEmit(e,t)}),function(a,i){if(a){n.flushQueue(a),n.silentEmit("error",a),t(a),n.setStatus("end");return}let s=r.tls?"secureConnect":"connect";if("sentinels"in r&&r.sentinels&&!r.enableTLSForSentinelMode&&(s="connect"),n.stream=i,r.noDelay&&i.setNoDelay(!0),"number"==typeof r.keepAlive&&(i.connecting?i.once(s,()=>{i.setKeepAlive(!0,r.keepAlive)}):i.setKeepAlive(!0,r.keepAlive)),i.connecting){if(i.once(s,c.connectHandler(n)),r.connectTimeout){let e=!1;i.setTimeout(r.connectTimeout,function(){if(e)return;i.setTimeout(0),i.destroy();let t=Error("connect ETIMEDOUT");t.errorno="ETIMEDOUT",t.code="ETIMEDOUT",t.syscall="connect",c.errorHandler(n)(t)}),i.once(s,function(){e=!0,i.setTimeout(0)})}}else if(i.destroyed){let e=n.connector.firstError;e&&process.nextTick(()=>{c.errorHandler(n)(e)}),process.nextTick(c.closeHandler(n))}else process.nextTick(c.connectHandler(n));i.destroyed||(i.once("error",c.errorHandler(n)),i.once("close",c.closeHandler(n)));let o=function(){n.removeListener("close",l),e()};var l=function(){n.removeListener("ready",o),t(Error(h.CONNECTION_CLOSED_ERROR_MSG))};n.once("ready",o),n.once("close",l)})});return(0,i.default)(t,e)}disconnect(e=!1){e||(this.manuallyClosing=!0),this.reconnectTimeout&&!e&&(clearTimeout(this.reconnectTimeout),this.reconnectTimeout=null),"wait"===this.status?c.closeHandler(this)():this.connector.disconnect()}end(){this.disconnect()}duplicate(e){return new v({...this.options,...e})}get mode(){var e;return this.options.monitor?"monitor":(null===(e=this.condition)||void 0===e?void 0:e.subscriber)?"subscriber":"normal"}monitor(e){let t=this.duplicate({monitor:!0,lazyConnect:!1});return(0,i.default)(new Promise(function(e,r){t.once("error",r),t.once("monitoring",function(){e(t)})}),e)}sendCommand(e,t){var r,a;if("wait"===this.status&&this.connect().catch(b.noop),"end"===this.status)return e.reject(Error(h.CONNECTION_CLOSED_ERROR_MSG)),e.promise;if((null===(r=this.condition)||void 0===r?void 0:r.subscriber)&&!o.default.checkFlag("VALID_IN_SUBSCRIBER_MODE",e.name))return e.reject(Error("Connection in subscriber mode, only subscriber commands may be used")),e.promise;"number"==typeof this.options.commandTimeout&&e.setTimeout(this.options.commandTimeout);let i="ready"===this.status||!t&&"connect"===this.status&&(0,n.exists)(e.name)&&(0,n.hasFlag)(e.name,"loading");if(this.stream&&this.stream.writable?this.stream._writableState&&this.stream._writableState.ended&&(i=!1):i=!1,i)K.enabled&&K("write command[%s]: %d -> %s(%o)",this._getDescription(),null===(a=this.condition)||void 0===a?void 0:a.select,e.name,e.args),t?"isPipeline"in t&&t.isPipeline?t.write(e.toWritable(t.destination.redis.stream)):t.write(e.toWritable(t)):this.stream.write(e.toWritable(this.stream)),this.commandQueue.push({command:e,stream:t,select:this.condition.select}),o.default.checkFlag("WILL_DISCONNECT",e.name)&&(this.manuallyClosing=!0),void 0!==this.options.socketTimeout&&void 0===this.socketTimeoutTimer&&this.setSocketTimeout();else{if(!this.options.enableOfflineQueue)return e.reject(Error("Stream isn't writeable and enableOfflineQueue options is false")),e.promise;if("quit"===e.name&&0===this.offlineQueue.length)return this.disconnect(),e.resolve(Buffer.from("OK")),e.promise;K.enabled&&K("queue command[%s]: %d -> %s(%o)",this._getDescription(),this.condition.select,e.name,e.args),this.offlineQueue.push({command:e,stream:t,select:this.condition.select})}if("select"===e.name&&(0,h.isInt)(e.args[0])){let t=parseInt(e.args[0],10);this.condition.select!==t&&(this.condition.select=t,this.emit("select",t),K("switch to db [%d]",this.condition.select))}return e.promise}setSocketTimeout(){this.socketTimeoutTimer=setTimeout(()=>{this.stream.destroy(Error(`Socket timeout. Expecting data, but didn't receive any in ${this.options.socketTimeout}ms.`)),this.socketTimeoutTimer=void 0},this.options.socketTimeout),this.stream.once("data",()=>{clearTimeout(this.socketTimeoutTimer),this.socketTimeoutTimer=void 0,0!==this.commandQueue.length&&this.setSocketTimeout()})}scanStream(e){return this.createScanStream("scan",{options:e})}scanBufferStream(e){return this.createScanStream("scanBuffer",{options:e})}sscanStream(e,t){return this.createScanStream("sscan",{key:e,options:t})}sscanBufferStream(e,t){return this.createScanStream("sscanBuffer",{key:e,options:t})}hscanStream(e,t){return this.createScanStream("hscan",{key:e,options:t})}hscanBufferStream(e,t){return this.createScanStream("hscanBuffer",{key:e,options:t})}zscanStream(e,t){return this.createScanStream("zscan",{key:e,options:t})}zscanBufferStream(e,t){return this.createScanStream("zscanBuffer",{key:e,options:t})}silentEmit(e,t){let r;return"error"===e&&(r=t,"end"===this.status||this.manuallyClosing&&r instanceof Error&&(r.message===h.CONNECTION_CLOSED_ERROR_MSG||"connect"===r.syscall||"read"===r.syscall))?void 0:this.listeners(e).length>0?this.emit.apply(this,arguments):(r&&r instanceof Error&&console.error("[ioredis] Unhandled error event:",r.stack),!1)}recoverFromFatalError(e,t,r){this.flushQueue(t,r),this.silentEmit("error",t),this.disconnect(!0)}handleReconnection(e,t){var r;let n=!1;switch(this.options.reconnectOnError&&(n=this.options.reconnectOnError(e)),n){case 1:case!0:"reconnecting"!==this.status&&this.disconnect(!0),t.command.reject(e);break;case 2:"reconnecting"!==this.status&&this.disconnect(!0),(null===(r=this.condition)||void 0===r?void 0:r.select)!==t.select&&"select"!==t.command.name&&this.select(t.select),this.sendCommand(t.command);break;default:t.command.reject(e)}}_getDescription(){let e;return e="path"in this.options&&this.options.path?this.options.path:this.stream&&this.stream.remoteAddress&&this.stream.remotePort?this.stream.remoteAddress+":"+this.stream.remotePort:"host"in this.options&&this.options.host?this.options.host+":"+this.options.port:"",this.options.connectionName&&(e+=` (${this.options.connectionName})`),e}resetCommandQueue(){this.commandQueue=new g}resetOfflineQueue(){this.offlineQueue=new g}parseOptions(...e){let t={},r=!1;for(let n=0;n<e.length;++n){let a=e[n];if(null!=a){if("object"==typeof a)(0,b.defaults)(t,a);else if("string"==typeof a)(0,b.defaults)(t,(0,h.parseURL)(a)),a.startsWith("rediss://")&&(r=!0);else if("number"==typeof a)t.port=a;else throw Error("Invalid argument "+a)}}r&&(0,b.defaults)(t,{tls:!0}),(0,b.defaults)(t,v.defaultOptions),"string"==typeof t.port&&(t.port=parseInt(t.port,10)),"string"==typeof t.db&&(t.db=parseInt(t.db,10)),this.options=(0,h.resolveTLSProfile)(t)}setStatus(e,t){K.enabled&&K("status[%s]: %s -> %s",this._getDescription(),this.status||"[empty]",e),this.status=e,process.nextTick(this.emit.bind(this,e,t))}createScanStream(e,{key:t,options:r={}}){return new p.default({objectMode:!0,key:t,redis:this,command:e,...r})}flushQueue(e,t){let r;if((t=(0,b.defaults)({},t,{offlineQueue:!0,commandQueue:!0})).offlineQueue)for(;r=this.offlineQueue.shift();)r.command.reject(e);if(t.commandQueue&&this.commandQueue.length>0)for(this.stream&&this.stream.removeAllListeners("data");r=this.commandQueue.shift();)r.command.reject(e)}_readyCheck(e){let t=this;this.info(function(r,n){if(r)return r.message&&r.message.includes("NOPERM")?(console.warn(`Skipping the ready check because INFO command fails: "${r.message}". You can disable ready check with "enableReadyCheck". More: https://github.com/luin/ioredis/wiki/Disable-ready-check.`),e(null,{})):e(r);if("string"!=typeof n)return e(null,n);let a={},i=n.split("\r\n");for(let e=0;e<i.length;++e){let[t,...r]=i[e].split(":"),n=r.join(":");n&&(a[t]=n)}if(a.loading&&"0"!==a.loading){let r=1e3*(a.loading_eta_seconds||1),n=t.options.maxLoadingRetryTime&&t.options.maxLoadingRetryTime<r?t.options.maxLoadingRetryTime:r;K("Redis server still loading, trying again in "+n+"ms"),setTimeout(function(){t._readyCheck(e)},n)}else e(null,a)}).catch(b.noop)}}v.Cluster=s.default,v.Command=o.default,v.defaultOptions=u.DEFAULT_REDIS_OPTIONS,(0,m.default)(v,a.EventEmitter),(0,y.addTransactionSupport)(v.prototype),t.default=v},5842:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});let n=r(8220);class a extends n.Readable{constructor(e){super(e),this.opt=e,this._redisCursor="0",this._redisDrained=!1}_read(){if(this._redisDrained){this.push(null);return}let e=[this._redisCursor];this.opt.key&&e.unshift(this.opt.key),this.opt.match&&e.push("MATCH",this.opt.match),this.opt.type&&e.push("TYPE",this.opt.type),this.opt.count&&e.push("COUNT",String(this.opt.count)),this.opt.noValues&&e.push("NOVALUES"),this.opt.redis[this.opt.command](e,(e,t)=>{if(e){this.emit("error",e);return}this._redisCursor=t[0]instanceof Buffer?t[0].toString():t[0],"0"===this._redisCursor&&(this._redisDrained=!0),this.push(t[1])})}close(){this._redisDrained=!0}}t.default=a},2891:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});let n=r(4770),a=r(9749),i=r(3499);class s{constructor(e,t=null,r="",i=!1){this.lua=e,this.numberOfKeys=t,this.keyPrefix=r,this.readOnly=i,this.sha=(0,n.createHash)("sha1").update(e).digest("hex");let s=this.sha,o=new WeakSet;this.Command=class extends a.default{toWritable(t){let r=this.reject;return this.reject=e=>{-1!==e.message.indexOf("NOSCRIPT")&&o.delete(t),r.call(this,e)},o.has(t)?"eval"===this.name&&(this.name="evalsha",this.args[0]=s):(o.add(t),this.name="eval",this.args[0]=e),super.toWritable(t)}}}execute(e,t,r,n){"number"==typeof this.numberOfKeys&&t.unshift(this.numberOfKeys),this.keyPrefix&&(r.keyPrefix=this.keyPrefix),this.readOnly&&(r.readOnly=!0);let a=new this.Command("evalsha",[this.sha,...t],r);return a.promise=a.promise.catch(n=>{if(-1===n.message.indexOf("NOSCRIPT"))throw n;let a=new this.Command("evalsha",[this.sha,...t],r);return(e.isPipeline?e.redis:e).sendCommand(a)}),(0,i.default)(a.promise,n),e.sendCommand(a)}}t.default=s},1359:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});class r{constructor(){this.set={subscribe:{},psubscribe:{},ssubscribe:{}}}add(e,t){this.set[n(e)][t]=!0}del(e,t){delete this.set[n(e)][t]}channels(e){return Object.keys(this.set[n(e)])}isEmpty(){return 0===this.channels("subscribe").length&&0===this.channels("psubscribe").length&&0===this.channels("ssubscribe").length}}function n(e){return"unsubscribe"===e?"subscribe":"punsubscribe"===e?"psubscribe":"sunsubscribe"===e?"ssubscribe":e}t.default=r},996:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.executeWithAutoPipelining=t.getFirstValueInFlattenedArray=t.shouldUseAutoPipelining=t.notAllowedAutoPipelineCommands=t.kCallbacks=t.kExec=void 0;let n=r(1681),a=r(4358),i=r(3499);function s(e){for(let t=0;t<e.length;t++){let r=e[t];if("string"==typeof r)return r;if(Array.isArray(r)||(0,n.isArguments)(r)){if(0===r.length)continue;return r[0]}let a=[r].flat();if(a.length>0)return a[0]}}t.kExec=Symbol("exec"),t.kCallbacks=Symbol("callbacks"),t.notAllowedAutoPipelineCommands=["auth","info","script","quit","cluster","pipeline","multi","subscribe","psubscribe","unsubscribe","unpsubscribe","select"],t.shouldUseAutoPipelining=function(e,r,n){return r&&e.options.enableAutoPipelining&&!e.isPipeline&&!t.notAllowedAutoPipelineCommands.includes(n)&&!e.options.autoPipeliningIgnoredCommands.includes(n)},t.getFirstValueInFlattenedArray=s,t.executeWithAutoPipelining=function e(r,o,l,d,c){if(r.isCluster&&!r.slots.length)return"wait"===r.status&&r.connect().catch(n.noop),(0,i.default)(new Promise(function(t,n){r.delayUntilReady(a=>{if(a){n(a);return}e(r,o,l,d,null).then(t,n)})}),c);let u=r.options.keyPrefix||"",p=r.isCluster?r.slots[a(`${u}${s(d)}`)].join(","):"main";if(!r._autoPipelines.has(p)){let e=r.pipeline();e[t.kExec]=!1,e[t.kCallbacks]=[],r._autoPipelines.set(p,e)}let y=r._autoPipelines.get(p);y[t.kExec]||(y[t.kExec]=!0,setImmediate(function e(r,n){if(r._runningAutoPipelines.has(n)||!r._autoPipelines.has(n))return;r._runningAutoPipelines.add(n);let a=r._autoPipelines.get(n);r._autoPipelines.delete(n);let i=a[t.kCallbacks];a[t.kCallbacks]=null,a.exec(function(t,a){if(r._runningAutoPipelines.delete(n),t)for(let e=0;e<i.length;e++)process.nextTick(i[e],t);else for(let e=0;e<i.length;e++)process.nextTick(i[e],...a[e]);r._autoPipelines.has(n)&&e(r,n)})},r,p));let h=new Promise(function(e,r){y[t.kCallbacks].push(function(t,n){if(t){r(t);return}e(n)}),"call"===o&&d.unshift(l),y[o](...d)});return(0,i.default)(h,c)}},2105:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.DEFAULT_CLUSTER_OPTIONS=void 0;let n=r(665);t.DEFAULT_CLUSTER_OPTIONS={clusterRetryStrategy:e=>Math.min(100+2*e,2e3),enableOfflineQueue:!0,enableReadyCheck:!0,scaleReads:"master",maxRedirections:16,retryDelayOnMoved:0,retryDelayOnFailover:100,retryDelayOnClusterDown:100,retryDelayOnTryAgain:100,slotsRefreshTimeout:1e3,useSRVRecords:!1,resolveSrv:n.resolveSrv,dnsLookup:n.lookup,enableAutoPipelining:!1,autoPipeliningIgnoredCommands:[],shardedSubscribers:!1}},8882:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});let n=r(7285),a=r(67),i=r(266),s=(0,a.Debug)("cluster:subscriber");class o{constructor(e,t,r=!1){this.connectionPool=e,this.emitter=t,this.isSharded=r,this.started=!1,this.subscriber=null,this.slotRange=[],this.onSubscriberEnd=()=>{if(!this.started){s("subscriber has disconnected, but ClusterSubscriber is not started, so not reconnecting.");return}s("subscriber has disconnected, selecting a new one..."),this.selectSubscriber()},this.connectionPool.on("-node",(e,t)=>{this.started&&this.subscriber&&(0,n.getNodeKey)(this.subscriber.options)===t&&(s("subscriber has left, selecting a new one..."),this.selectSubscriber())}),this.connectionPool.on("+node",()=>{this.started&&!this.subscriber&&(s("a new node is discovered and there is no subscriber, selecting a new one..."),this.selectSubscriber())})}getInstance(){return this.subscriber}associateSlotRange(e){return this.isSharded&&(this.slotRange=e),this.slotRange}start(){this.started=!0,this.selectSubscriber(),s("started")}stop(){this.started=!1,this.subscriber&&(this.subscriber.disconnect(),this.subscriber=null)}isStarted(){return this.started}selectSubscriber(){let e=this.lastActiveSubscriber;e&&(e.off("end",this.onSubscriberEnd),e.disconnect()),this.subscriber&&(this.subscriber.off("end",this.onSubscriberEnd),this.subscriber.disconnect());let t=(0,a.sample)(this.connectionPool.getNodes());if(!t){s("selecting subscriber failed since there is no node discovered in the cluster yet"),this.subscriber=null;return}let{options:r}=t;s("selected a subscriber %s:%s",r.host,r.port);let o="subscriber";this.isSharded&&(o="ssubscriber"),this.subscriber=new i.default({port:r.port,host:r.host,username:r.username,password:r.password,enableReadyCheck:!0,connectionName:(0,n.getConnectionName)(o,r.connectionName),lazyConnect:!0,tls:r.tls,retryStrategy:null}),this.subscriber.on("error",a.noop),this.subscriber.once("end",this.onSubscriberEnd);let l={subscribe:[],psubscribe:[],ssubscribe:[]};if(e){let t=e.condition||e.prevCondition;t&&t.subscriber&&(l.subscribe=t.subscriber.channels("subscribe"),l.psubscribe=t.subscriber.channels("psubscribe"),l.ssubscribe=t.subscriber.channels("ssubscribe"))}if(l.subscribe.length||l.psubscribe.length||l.ssubscribe.length){let e=0;for(let t of["subscribe","psubscribe","ssubscribe"]){let r=l[t];r.length&&(e+=1,s("%s %d channels",t,r.length),this.subscriber[t](r).then(()=>{--e||(this.lastActiveSubscriber=this.subscriber)}).catch(()=>{s("failed to %s %d channels",t,r.length)}))}}else this.lastActiveSubscriber=this.subscriber;for(let e of["message","messageBuffer"])this.subscriber.on(e,(t,r)=>{this.emitter.emit(e,t,r)});for(let e of["pmessage","pmessageBuffer"])this.subscriber.on(e,(t,r,n)=>{this.emitter.emit(e,t,r,n)});if(!0==this.isSharded)for(let e of["smessage","smessageBuffer"])this.subscriber.on(e,(t,r)=>{this.emitter.emit(e,t,r)})}}t.default=o},8348:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});let n=r(67),a=r(8882),i=r(2341),s=r(7285),o=r(4358),l=(0,n.Debug)("cluster:subscriberGroup");class d{constructor(e){this.cluster=e,this.shardedSubscribers=new Map,this.clusterSlots=[],this.subscriberToSlotsIndex=new Map,this.channels=new Map,e.on("+node",e=>{this._addSubscriber(e)}),e.on("-node",e=>{this._removeSubscriber(e)}),e.on("refresh",()=>{this._refreshSlots(e)})}getResponsibleSubscriber(e){let t=this.clusterSlots[e][0];return this.shardedSubscribers.get(t)}addChannels(e){let t=o(e[0]);e.forEach(e=>{if(o(e)!=t)return -1});let r=this.channels.get(t);return r?this.channels.set(t,r.concat(e)):this.channels.set(t,e),[...this.channels.values()].flatMap(e=>e).length}removeChannels(e){let t=o(e[0]);e.forEach(e=>{if(o(e)!=t)return -1});let r=this.channels.get(t);if(r){let n=r.filter(t=>!e.includes(t));this.channels.set(t,n)}return[...this.channels.values()].flatMap(e=>e).length}stop(){for(let e of this.shardedSubscribers.values())e.stop()}start(){for(let e of this.shardedSubscribers.values())e.isStarted()||e.start()}_addSubscriber(e){let t=new i.default(e.options);if(t.addMasterNode(e)){let r=new a.default(t,this.cluster,!0),n=(0,s.getNodeKey)(e.options);return this.shardedSubscribers.set(n,r),r.start(),this._resubscribe(),this.cluster.emit("+subscriber"),r}return null}_removeSubscriber(e){let t=(0,s.getNodeKey)(e.options),r=this.shardedSubscribers.get(t);return r&&(r.stop(),this.shardedSubscribers.delete(t),this._resubscribe(),this.cluster.emit("-subscriber")),this.shardedSubscribers}_refreshSlots(e){if(this._slotsAreEqual(e.slots))l("Nothing to refresh because the new cluster map is equal to the previous one.");else{l("Refreshing the slots of the subscriber group."),this.subscriberToSlotsIndex=new Map;for(let t=0;t<e.slots.length;t++){let r=e.slots[t][0];this.subscriberToSlotsIndex.has(r)||this.subscriberToSlotsIndex.set(r,[]),this.subscriberToSlotsIndex.get(r).push(Number(t))}return this._resubscribe(),this.clusterSlots=JSON.parse(JSON.stringify(e.slots)),this.cluster.emit("subscribersReady"),!0}return!1}_resubscribe(){this.shardedSubscribers&&this.shardedSubscribers.forEach((e,t)=>{let r=this.subscriberToSlotsIndex.get(t);r&&(e.associateSlotRange(r),r.forEach(t=>{let r=e.getInstance(),n=this.channels.get(t);n&&n.length>0&&r&&(r.ssubscribe(n),r.on("ready",()=>{r.ssubscribe(n)}))}))})}_slotsAreEqual(e){return void 0!==this.clusterSlots&&JSON.stringify(this.clusterSlots)===JSON.stringify(e)}}t.default=d},2341:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});let n=r(7702),a=r(67),i=r(7285),s=r(266),o=(0,a.Debug)("cluster:connectionPool");class l extends n.EventEmitter{constructor(e){super(),this.redisOptions=e,this.nodes={all:{},master:{},slave:{}},this.specifiedOptions={}}getNodes(e="all"){let t=this.nodes[e];return Object.keys(t).map(e=>t[e])}getInstanceByKey(e){return this.nodes.all[e]}getSampleInstance(e){let t=Object.keys(this.nodes[e]),r=(0,a.sample)(t);return this.nodes[e][r]}addMasterNode(e){let t=(0,i.getNodeKey)(e.options),r=this.createRedisFromOptions(e,e.options.readOnly);return!e.options.readOnly&&(this.nodes.all[t]=r,this.nodes.master[t]=r,!0)}createRedisFromOptions(e,t){return new s.default((0,a.defaults)({retryStrategy:null,enableOfflineQueue:!0,readOnly:t},e,this.redisOptions,{lazyConnect:!0}))}findOrCreate(e,t=!1){let r;let n=(0,i.getNodeKey)(e);return t=!!t,this.specifiedOptions[n]?Object.assign(e,this.specifiedOptions[n]):this.specifiedOptions[n]=e,this.nodes.all[n]?(r=this.nodes.all[n]).options.readOnly!==t&&(r.options.readOnly=t,o("Change role of %s to %s",n,t?"slave":"master"),r[t?"readonly":"readwrite"]().catch(a.noop),t?(delete this.nodes.master[n],this.nodes.slave[n]=r):(delete this.nodes.slave[n],this.nodes.master[n]=r)):(o("Connecting to %s as %s",n,t?"slave":"master"),r=this.createRedisFromOptions(e,t),this.nodes.all[n]=r,this.nodes[t?"slave":"master"][n]=r,r.once("end",()=>{this.removeNode(n),this.emit("-node",r,n),Object.keys(this.nodes.all).length||this.emit("drain")}),this.emit("+node",r,n),r.on("error",function(e){this.emit("nodeError",e,n)})),r}reset(e){o("Reset with %O",e);let t={};e.forEach(e=>{let r=(0,i.getNodeKey)(e);e.readOnly&&t[r]||(t[r]=e)}),Object.keys(this.nodes.all).forEach(e=>{t[e]||(o("Disconnect %s because the node does not hold any slot",e),this.nodes.all[e].disconnect(),this.removeNode(e))}),Object.keys(t).forEach(e=>{let r=t[e];this.findOrCreate(r,r.readOnly)})}removeNode(e){let{nodes:t}=this;t.all[e]&&(o("Remove %s from the pool",e),delete t.all[e]),delete t.master[e],delete t.slave[e]}}t.default=l},7486:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});let n=r(67),a=r(5561),i=(0,n.Debug)("delayqueue");class s{constructor(){this.queues={},this.timeouts={}}push(e,t,r){let n=r.callback||process.nextTick;this.queues[e]||(this.queues[e]=new a),this.queues[e].push(t),this.timeouts[e]||(this.timeouts[e]=setTimeout(()=>{n(()=>{this.timeouts[e]=null,this.execute(e)})},r.timeout))}execute(e){let t=this.queues[e];if(!t)return;let{length:r}=t;if(r)for(i("send %d commands in %s queue",r,e),this.queues[e]=null;t.length>0;)t.shift()()}}t.default=s},2742:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});let n=r(8942),a=r(7702),i=r(3122),s=r(3499),o=r(9749),l=r(7845),d=r(266),c=r(5842),u=r(8064),p=r(67),y=r(2449),h=r(6789),m=r(2105),f=r(8882),b=r(2341),g=r(7486),K=r(7285),v=r(5561),S=r(8348),E=(0,p.Debug)("cluster"),I=new WeakSet;class k extends h.default{constructor(e,t={}){if(super(),this.slots=[],this._groupsIds={},this._groupsBySlot=Array(16384),this.isCluster=!0,this.retryAttempts=0,this.delayQueue=new g.default,this.offlineQueue=new v,this.isRefreshing=!1,this._refreshSlotsCacheCallbacks=[],this._autoPipelines=new Map,this._runningAutoPipelines=new Set,this._readyDelayedCallbacks=[],this.connectionEpoch=0,a.EventEmitter.call(this),this.startupNodes=e,this.options=(0,p.defaults)({},t,m.DEFAULT_CLUSTER_OPTIONS,this.options),!0==this.options.shardedSubscribers&&(this.shardedSubscribers=new S.default(this)),this.options.redisOptions&&this.options.redisOptions.keyPrefix&&!this.options.keyPrefix&&(this.options.keyPrefix=this.options.redisOptions.keyPrefix),"function"!=typeof this.options.scaleReads&&-1===["all","master","slave"].indexOf(this.options.scaleReads))throw Error('Invalid option scaleReads "'+this.options.scaleReads+'". Expected "all", "master", "slave" or a custom function');this.connectionPool=new b.default(this.options.redisOptions),this.connectionPool.on("-node",(e,t)=>{this.emit("-node",e)}),this.connectionPool.on("+node",e=>{this.emit("+node",e)}),this.connectionPool.on("drain",()=>{this.setStatus("close")}),this.connectionPool.on("nodeError",(e,t)=>{this.emit("node error",e,t)}),this.subscriber=new f.default(this.connectionPool,this),this.options.scripts&&Object.entries(this.options.scripts).forEach(([e,t])=>{this.defineCommand(e,t)}),this.options.lazyConnect?this.setStatus("wait"):this.connect().catch(e=>{E("connecting failed: %s",e)})}connect(){return new Promise((e,t)=>{if("connecting"===this.status||"connect"===this.status||"ready"===this.status){t(Error("Redis is already connecting/connected"));return}let r=++this.connectionEpoch;this.setStatus("connecting"),this.resolveStartupNodeHostnames().then(n=>{let a;if(this.connectionEpoch!==r){E("discard connecting after resolving startup nodes because epoch not match: %d != %d",r,this.connectionEpoch),t(new i.RedisError("Connection is discarded because a new connection is made"));return}if("connecting"!==this.status){E("discard connecting after resolving startup nodes because the status changed to %s",this.status),t(new i.RedisError("Connection is aborted"));return}this.connectionPool.reset(n);let s=()=>{this.setStatus("ready"),this.retryAttempts=0,this.executeOfflineCommands(),this.resetNodesRefreshInterval(),e()},o=()=>{this.invokeReadyDelayedCallbacks(void 0),this.removeListener("close",a),this.manuallyClosing=!1,this.setStatus("connect"),this.options.enableReadyCheck?this.readyCheck((e,t)=>{e||t?(E("Ready check failed (%s). Reconnecting...",e||t),"connect"===this.status&&this.disconnect(!0)):s()}):s()};a=()=>{let e=Error("None of startup nodes is available");this.removeListener("refresh",o),this.invokeReadyDelayedCallbacks(e),t(e)},this.once("refresh",o),this.once("close",a),this.once("close",this.handleCloseEvent.bind(this)),this.refreshSlotsCache(e=>{e&&e.message===l.default.defaultMessage&&(d.default.prototype.silentEmit.call(this,"error",e),this.connectionPool.reset([]))}),this.subscriber.start(),this.options.shardedSubscribers&&this.shardedSubscribers.start()}).catch(e=>{this.setStatus("close"),this.handleCloseEvent(e),this.invokeReadyDelayedCallbacks(e),t(e)})})}disconnect(e=!1){let t=this.status;this.setStatus("disconnecting"),e||(this.manuallyClosing=!0),this.reconnectTimeout&&!e&&(clearTimeout(this.reconnectTimeout),this.reconnectTimeout=null,E("Canceled reconnecting attempts")),this.clearNodesRefreshInterval(),this.subscriber.stop(),this.options.shardedSubscribers&&this.shardedSubscribers.stop(),"wait"===t?(this.setStatus("close"),this.handleCloseEvent()):this.connectionPool.reset([])}quit(e){let t=this.status;if(this.setStatus("disconnecting"),this.manuallyClosing=!0,this.reconnectTimeout&&(clearTimeout(this.reconnectTimeout),this.reconnectTimeout=null),this.clearNodesRefreshInterval(),this.subscriber.stop(),this.options.shardedSubscribers&&this.shardedSubscribers.stop(),"wait"===t){let t=(0,s.default)(Promise.resolve("OK"),e);return setImmediate((function(){this.setStatus("close"),this.handleCloseEvent()}).bind(this)),t}return(0,s.default)(Promise.all(this.nodes().map(e=>e.quit().catch(e=>{if(e.message===p.CONNECTION_CLOSED_ERROR_MSG)return"OK";throw e}))).then(()=>"OK"),e)}duplicate(e=[],t={}){return new k(e.length>0?e:this.startupNodes.slice(0),Object.assign({},this.options,t))}nodes(e="all"){if("all"!==e&&"master"!==e&&"slave"!==e)throw Error('Invalid role "'+e+'". Expected "all", "master" or "slave"');return this.connectionPool.getNodes(e)}delayUntilReady(e){this._readyDelayedCallbacks.push(e)}get autoPipelineQueueSize(){let e=0;for(let t of this._autoPipelines.values())e+=t.length;return e}refreshSlotsCache(e){if(e&&this._refreshSlotsCacheCallbacks.push(e),this.isRefreshing)return;this.isRefreshing=!0;let t=this,r=e=>{for(let t of(this.isRefreshing=!1,this._refreshSlotsCacheCallbacks))t(e);this._refreshSlotsCacheCallbacks=[]},n=(0,p.shuffle)(this.connectionPool.getNodes()),a=null;!function e(i){if(i===n.length)return r(new l.default(l.default.defaultMessage,a));let s=n[i],o=`${s.options.host}:${s.options.port}`;E("getting slot cache from %s",o),t.getInfoFromNode(s,function(n){switch(t.status){case"close":case"end":return r(Error("Cluster is disconnected."));case"disconnecting":return r(Error("Cluster is disconnecting."))}n?(t.emit("node error",n,o),a=n,e(i+1)):(t.emit("refresh"),r())})}(0)}sendCommand(e,t,r){if("wait"===this.status&&this.connect().catch(p.noop),"end"===this.status)return e.reject(Error(p.CONNECTION_CLOSED_ERROR_MSG)),e.promise;let a=this.options.scaleReads;"master"===a||e.isReadOnly||(0,n.exists)(e.name)&&(0,n.hasFlag)(e.name,"readonly")||(a="master");let s=r?r.slot:e.getSlot(),l={},d=this;if(!r&&!I.has(e)){I.add(e);let t=e.reject;e.reject=function(r){let n=c.bind(null,!0);d.handleError(r,l,{moved:function(t,r){E("command %s is moved to %s",e.name,r),s=Number(t),d.slots[t]?d.slots[t][0]=r:d.slots[t]=[r],d._groupsBySlot[t]=d._groupsIds[d.slots[t].join(";")],d.connectionPool.findOrCreate(d.natMapper(r)),c(),E("refreshing slot caches... (triggered by MOVED error)"),d.refreshSlotsCache()},ask:function(t,r){E("command %s is required to ask %s:%s",e.name,r);let n=d.natMapper(r);d.connectionPool.findOrCreate(n),c(!1,`${n.host}:${n.port}`)},tryagain:n,clusterDown:n,connectionClosed:n,maxRedirections:function(r){t.call(e,r)},defaults:function(){t.call(e,r)}})}}function c(n,l){let c;if("end"===d.status){e.reject(new i.AbortError("Cluster is ended."));return}if("ready"===d.status||"cluster"===e.name){if(r&&r.redis)c=r.redis;else if(o.default.checkFlag("ENTER_SUBSCRIBER_MODE",e.name)||o.default.checkFlag("EXIT_SUBSCRIBER_MODE",e.name)){if(!0==d.options.shardedSubscribers&&("ssubscribe"==e.name||"sunsubscribe"==e.name)){let t=d.shardedSubscribers.getResponsibleSubscriber(s),r=-1;"ssubscribe"==e.name&&(r=d.shardedSubscribers.addChannels(e.getKeys())),"sunsubscribe"==e.name&&(r=d.shardedSubscribers.removeChannels(e.getKeys())),-1!==r?c=t.getInstance():e.reject(new i.AbortError("Can't add or remove the given channels. Are they in the same slot?"))}else c=d.subscriber.getInstance();if(!c){e.reject(new i.AbortError("No subscriber for the cluster"));return}}else{if(!n){if("number"==typeof s&&d.slots[s]){let t=d.slots[s];if("function"==typeof a){let r=t.map(function(e){return d.connectionPool.getInstanceByKey(e)});Array.isArray(c=a(r,e))&&(c=(0,p.sample)(c)),c||(c=r[0])}else{let e;e="all"===a?(0,p.sample)(t):"slave"===a&&t.length>1?(0,p.sample)(t,1):t[0],c=d.connectionPool.getInstanceByKey(e)}}l&&(c=d.connectionPool.getInstanceByKey(l)).asking()}c||(c=("function"==typeof a?null:d.connectionPool.getSampleInstance(a))||d.connectionPool.getSampleInstance("all"))}r&&!r.redis&&(r.redis=c)}c?c.sendCommand(e,t):d.options.enableOfflineQueue?d.offlineQueue.push({command:e,stream:t,node:r}):e.reject(Error("Cluster isn't ready and enableOfflineQueue options is false"))}return c(),e.promise}sscanStream(e,t){return this.createScanStream("sscan",{key:e,options:t})}sscanBufferStream(e,t){return this.createScanStream("sscanBuffer",{key:e,options:t})}hscanStream(e,t){return this.createScanStream("hscan",{key:e,options:t})}hscanBufferStream(e,t){return this.createScanStream("hscanBuffer",{key:e,options:t})}zscanStream(e,t){return this.createScanStream("zscan",{key:e,options:t})}zscanBufferStream(e,t){return this.createScanStream("zscanBuffer",{key:e,options:t})}handleError(e,t,r){if(void 0===t.value?t.value=this.options.maxRedirections:t.value-=1,t.value<=0){r.maxRedirections(Error("Too many Cluster redirections. Last error: "+e));return}let n=e.message.split(" ");if("MOVED"===n[0]){let e=this.options.retryDelayOnMoved;e&&"number"==typeof e?this.delayQueue.push("moved",r.moved.bind(null,n[1],n[2]),{timeout:e}):r.moved(n[1],n[2])}else"ASK"===n[0]?r.ask(n[1],n[2]):"TRYAGAIN"===n[0]?this.delayQueue.push("tryagain",r.tryagain,{timeout:this.options.retryDelayOnTryAgain}):"CLUSTERDOWN"===n[0]&&this.options.retryDelayOnClusterDown>0?this.delayQueue.push("clusterdown",r.connectionClosed,{timeout:this.options.retryDelayOnClusterDown,callback:this.refreshSlotsCache.bind(this)}):e.message===p.CONNECTION_CLOSED_ERROR_MSG&&this.options.retryDelayOnFailover>0&&"ready"===this.status?this.delayQueue.push("failover",r.connectionClosed,{timeout:this.options.retryDelayOnFailover,callback:this.refreshSlotsCache.bind(this)}):r.defaults()}resetOfflineQueue(){this.offlineQueue=new v}clearNodesRefreshInterval(){this.slotsTimer&&(clearTimeout(this.slotsTimer),this.slotsTimer=null)}resetNodesRefreshInterval(){if(this.slotsTimer||!this.options.slotsRefreshInterval)return;let e=()=>{this.slotsTimer=setTimeout(()=>{E('refreshing slot caches... (triggered by "slotsRefreshInterval" option)'),this.refreshSlotsCache(()=>{e()})},this.options.slotsRefreshInterval)};e()}setStatus(e){E("status: %s -> %s",this.status||"[empty]",e),this.status=e,process.nextTick(()=>{this.emit(e)})}handleCloseEvent(e){let t;e&&E("closed because %s",e),this.manuallyClosing||"function"!=typeof this.options.clusterRetryStrategy||(t=this.options.clusterRetryStrategy.call(this,++this.retryAttempts,e)),"number"==typeof t?(this.setStatus("reconnecting"),this.reconnectTimeout=setTimeout(()=>{this.reconnectTimeout=null,E("Cluster is disconnected. Retrying after %dms",t),this.connect().catch(function(e){E("Got error %s when reconnecting. Ignoring...",e)})},t)):(this.setStatus("end"),this.flushQueue(Error("None of startup nodes is available")))}flushQueue(e){let t;for(;t=this.offlineQueue.shift();)t.command.reject(e)}executeOfflineCommands(){if(this.offlineQueue.length){let e;E("send %d commands in offline queue",this.offlineQueue.length);let t=this.offlineQueue;for(this.resetOfflineQueue();e=t.shift();)this.sendCommand(e.command,e.stream,e.node)}}natMapper(e){let t="string"==typeof e?e:`${e.host}:${e.port}`,r=null;return(this.options.natMap&&"function"==typeof this.options.natMap?r=this.options.natMap(t):this.options.natMap&&"object"==typeof this.options.natMap&&(r=this.options.natMap[t]),r)?(E("NAT mapping %s -> %O",t,r),Object.assign({},r)):"string"==typeof e?(0,K.nodeKeyToRedisOptions)(e):e}getInfoFromNode(e,t){if(!e)return t(Error("Node is disconnected"));let r=e.duplicate({enableOfflineQueue:!0,enableReadyCheck:!1,retryStrategy:null,connectionName:(0,K.getConnectionName)("refresher",this.options.redisOptions&&this.options.redisOptions.connectionName)});r.on("error",p.noop),r.cluster("SLOTS",(0,p.timeout)((e,n)=>{if(r.disconnect(),e)return E("error encountered running CLUSTER.SLOTS: %s",e),t(e);if("disconnecting"===this.status||"close"===this.status||"end"===this.status){E("ignore CLUSTER.SLOTS results (count: %d) since cluster status is %s",n.length,this.status),t();return}let a=[];E("cluster slots result count: %d",n.length);for(let e=0;e<n.length;++e){let t=n[e],r=t[0],i=t[1],s=[];for(let e=2;e<t.length;e++){if(!t[e][0])continue;let r=this.natMapper({host:t[e][0],port:t[e][1]});r.readOnly=2!==e,a.push(r),s.push(r.host+":"+r.port)}E("cluster slots result [%d]: slots %d~%d served by %s",e,r,i,s);for(let e=r;e<=i;e++)this.slots[e]=s}this._groupsIds=Object.create(null);let i=0;for(let e=0;e<16384;e++){let t=(this.slots[e]||[]).join(";");if(!t.length){this._groupsBySlot[e]=void 0;continue}this._groupsIds[t]||(this._groupsIds[t]=++i),this._groupsBySlot[e]=this._groupsIds[t]}this.connectionPool.reset(a),t()},this.options.slotsRefreshTimeout))}invokeReadyDelayedCallbacks(e){for(let t of this._readyDelayedCallbacks)process.nextTick(t,e);this._readyDelayedCallbacks=[]}readyCheck(e){this.cluster("INFO",(t,r)=>{let n;if(t)return e(t);if("string"!=typeof r)return e();let a=r.split("\r\n");for(let e=0;e<a.length;++e){let t=a[e].split(":");if("cluster_state"===t[0]){n=t[1];break}}"fail"===n?(E("cluster state not ok (%s)",n),e(null,n)):e()})}resolveSrv(e){return new Promise((t,r)=>{this.options.resolveSrv(e,(e,n)=>{if(e)return r(e);let a=this,i=(0,K.groupSrvRecords)(n),s=Object.keys(i).sort((e,t)=>parseInt(e)-parseInt(t));!function e(n){if(!s.length)return r(n);let o=i[s[0]],l=(0,K.weightSrvRecords)(o);o.records.length||s.shift(),a.dnsLookup(l.name).then(e=>t({host:e,port:l.port}),e)}()})})}dnsLookup(e){return new Promise((t,r)=>{this.options.dnsLookup(e,(n,a)=>{n?(E("failed to resolve hostname %s to IP: %s",e,n.message),r(n)):(E("resolved hostname %s to IP %s",e,a),t(a))})})}async resolveStartupNodeHostnames(){if(!Array.isArray(this.startupNodes)||0===this.startupNodes.length)throw Error("`startupNodes` should contain at least one node.");let e=(0,K.normalizeNodeOptions)(this.startupNodes),t=(0,K.getUniqueHostnamesFromOptions)(e);if(0===t.length)return e;let r=await Promise.all(t.map((this.options.useSRVRecords?this.resolveSrv:this.dnsLookup).bind(this))),n=(0,p.zipMap)(t,r);return e.map(e=>{let t=n.get(e.host);return t?this.options.useSRVRecords?Object.assign({},e,t):Object.assign({},e,{host:t}):e})}createScanStream(e,{key:t,options:r={}}){return new c.default({objectMode:!0,key:t,redis:this,command:e,...r})}}(0,y.default)(k,a.EventEmitter),(0,u.addTransactionSupport)(k.prototype),t.default=k},7285:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.getConnectionName=t.weightSrvRecords=t.groupSrvRecords=t.getUniqueHostnamesFromOptions=t.normalizeNodeOptions=t.nodeKeyToRedisOptions=t.getNodeKey=void 0;let n=r(67),a=r(8216);t.getNodeKey=function(e){return e.port=e.port||6379,e.host=e.host||"127.0.0.1",e.host+":"+e.port},t.nodeKeyToRedisOptions=function(e){let t=e.lastIndexOf(":");if(-1===t)throw Error(`Invalid node key ${e}`);return{host:e.slice(0,t),port:Number(e.slice(t+1))}},t.normalizeNodeOptions=function(e){return e.map(e=>{let t={};if("object"==typeof e)Object.assign(t,e);else if("string"==typeof e)Object.assign(t,(0,n.parseURL)(e));else if("number"==typeof e)t.port=e;else throw Error("Invalid argument "+e);return"string"==typeof t.port&&(t.port=parseInt(t.port,10)),delete t.db,t.port||(t.port=6379),t.host||(t.host="127.0.0.1"),(0,n.resolveTLSProfile)(t)})},t.getUniqueHostnamesFromOptions=function(e){let t={};return e.forEach(e=>{t[e.host]=!0}),Object.keys(t).filter(e=>!(0,a.isIP)(e))},t.groupSrvRecords=function(e){let t={};for(let r of e)t.hasOwnProperty(r.priority)?(t[r.priority].totalWeight+=r.weight,t[r.priority].records.push(r)):t[r.priority]={totalWeight:r.weight,records:[r]};return t},t.weightSrvRecords=function(e){if(1===e.records.length)return e.totalWeight=0,e.records.shift();let t=Math.floor(Math.random()*(e.totalWeight+e.records.length)),r=0;for(let[n,a]of e.records.entries())if((r+=1+a.weight)>t)return e.totalWeight-=a.weight,e.records.splice(n,1),a},t.getConnectionName=function(e,t){let r=`ioredis-cluster(${e})`;return t?`${r}:${t}`:r}},9846:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});let n=(0,r(67).Debug)("AbstractConnector");class a{constructor(e){this.connecting=!1,this.disconnectTimeout=e}check(e){return!0}disconnect(){if(this.connecting=!1,this.stream){let e=this.stream,t=setTimeout(()=>{n("stream %s:%s still open, destroying it",e.remoteAddress,e.remotePort),e.destroy()},this.disconnectTimeout);e.on("close",()=>clearTimeout(t)),e.end()}}}t.default=a},2793:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.FailoverDetector=void 0;let n=(0,r(67).Debug)("FailoverDetector"),a="+switch-master";class i{constructor(e,t){this.isDisconnected=!1,this.connector=e,this.sentinels=t}cleanup(){for(let e of(this.isDisconnected=!0,this.sentinels))e.client.disconnect()}async subscribe(){n("Starting FailoverDetector");let e=[];for(let t of this.sentinels){let r=t.client.subscribe(a).catch(e=>{n("Failed to subscribe to failover messages on sentinel %s:%s (%s)",t.address.host||"127.0.0.1",t.address.port||26739,e.message)});e.push(r),t.client.on("message",e=>{this.isDisconnected||e!==a||this.disconnect()})}await Promise.all(e)}disconnect(){this.isDisconnected=!0,n("Failover detected, disconnecting"),this.connector.disconnect()}}t.FailoverDetector=i},4787:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});class r{constructor(e){this.cursor=0,this.sentinels=e.slice(0)}next(){let e=this.cursor>=this.sentinels.length;return{done:e,value:e?void 0:this.sentinels[this.cursor++]}}reset(e){e&&this.sentinels.length>1&&1!==this.cursor&&this.sentinels.unshift(...this.sentinels.splice(this.cursor-1)),this.cursor=0}add(e){for(let r=0;r<this.sentinels.length;r++){var t;if(t=this.sentinels[r],(e.host||"127.0.0.1")===(t.host||"127.0.0.1")&&(e.port||26379)===(t.port||26379))return!1}return this.sentinels.push(e),!0}toString(){return`${JSON.stringify(this.sentinels)} @${this.cursor}`}}t.default=r},2280:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.SentinelIterator=void 0;let n=r(8216),a=r(67),i=r(2452),s=r(4787);t.SentinelIterator=s.default;let o=r(9846),l=r(266),d=r(2793),c=(0,a.Debug)("SentinelConnector");class u extends o.default{constructor(e){if(super(e.disconnectTimeout),this.options=e,this.emitter=null,this.failoverDetector=null,!this.options.sentinels.length)throw Error("Requires at least one sentinel to connect to.");if(!this.options.name)throw Error("Requires the name of master.");this.sentinelIterator=new s.default(this.options.sentinels)}check(e){let t=!e.role||this.options.role===e.role;return t||(c("role invalid, expected %s, but got %s",this.options.role,e.role),this.sentinelIterator.next(),this.sentinelIterator.next(),this.sentinelIterator.reset(!0)),t}disconnect(){super.disconnect(),this.failoverDetector&&this.failoverDetector.cleanup()}connect(e){let t;this.connecting=!0,this.retryAttempts=0;let r=async()=>{let s=this.sentinelIterator.next();if(s.done){this.sentinelIterator.reset(!1);let n="function"==typeof this.options.sentinelRetryStrategy?this.options.sentinelRetryStrategy(++this.retryAttempts):null,a="number"!=typeof n?"All sentinels are unreachable and retry is disabled.":`All sentinels are unreachable. Retrying from scratch after ${n}ms.`;t&&(a+=` Last error: ${t.message}`),c(a);let i=Error(a);if("number"==typeof n)return e("error",i),await new Promise(e=>setTimeout(e,n)),r();throw i}let o=null,l=null;try{o=await this.resolve(s.value)}catch(e){l=e}if(!this.connecting)throw Error(a.CONNECTION_CLOSED_ERROR_MSG);let d=s.value.host+":"+s.value.port;if(o)return c("resolved: %s:%s from sentinel %s",o.host,o.port,d),this.options.enableTLSForSentinelMode&&this.options.tls?(Object.assign(o,this.options.tls),this.stream=(0,i.connect)(o),this.stream.once("secureConnect",this.initFailoverDetector.bind(this))):(this.stream=(0,n.createConnection)(o),this.stream.once("connect",this.initFailoverDetector.bind(this))),this.stream.once("error",e=>{this.firstError=e}),this.stream;{let n=l?"failed to connect to sentinel "+d+" because "+l.message:"connected to sentinel "+d+" successfully, but got an invalid reply: "+o;return c(n),e("sentinelError",Error(n)),l&&(t=l),r()}};return r()}async updateSentinels(e){if(!this.options.updateSentinels)return;let t=await e.sentinel("sentinels",this.options.name);Array.isArray(t)&&(t.map(a.packObject).forEach(e=>{if(-1===(e.flags?e.flags.split(","):[]).indexOf("disconnected")&&e.ip&&e.port){let t=this.sentinelNatResolve(p(e));this.sentinelIterator.add(t)&&c("adding sentinel %s:%s",t.host,t.port)}}),c("Updated internal sentinels: %s",this.sentinelIterator))}async resolveMaster(e){let t=await e.sentinel("get-master-addr-by-name",this.options.name);return await this.updateSentinels(e),this.sentinelNatResolve(Array.isArray(t)?{host:t[0],port:Number(t[1])}:null)}async resolveSlave(e){let t=await e.sentinel("slaves",this.options.name);if(!Array.isArray(t))return null;let r=t.map(a.packObject).filter(e=>e.flags&&!e.flags.match(/(disconnected|s_down|o_down)/));return this.sentinelNatResolve(function(e,t){let r;if(0===e.length)return null;if("function"==typeof t)r=t(e);else if(null!==t&&"object"==typeof t){let n=Array.isArray(t)?t:[t];n.sort((e,t)=>(e.prio||(e.prio=1),t.prio||(t.prio=1),e.prio<t.prio)?-1:e.prio>t.prio?1:0);for(let t=0;t<n.length;t++){for(let a=0;a<e.length;a++){let i=e[a];if(i.ip===n[t].ip&&i.port===n[t].port){r=i;break}}if(r)break}}return r||(r=(0,a.sample)(e)),p(r)}(r,this.options.preferredSlaves))}sentinelNatResolve(e){if(!e||!this.options.natMap)return e;let t=`${e.host}:${e.port}`,r=e;return"function"==typeof this.options.natMap?r=this.options.natMap(t)||e:"object"==typeof this.options.natMap&&(r=this.options.natMap[t]||e),r}connectToSentinel(e,t){return new l.default({port:e.port||26379,host:e.host,username:this.options.sentinelUsername||null,password:this.options.sentinelPassword||null,family:e.family||("path"in this.options&&this.options.path?void 0:this.options.family),tls:this.options.sentinelTLS,retryStrategy:null,enableReadyCheck:!1,connectTimeout:this.options.connectTimeout,commandTimeout:this.options.sentinelCommandTimeout,...t})}async resolve(e){let t=this.connectToSentinel(e);t.on("error",y);try{if("slave"===this.options.role)return await this.resolveSlave(t);return await this.resolveMaster(t)}finally{t.disconnect()}}async initFailoverDetector(){var e;if(!this.options.failoverDetector)return;this.sentinelIterator.reset(!0);let t=[];for(;t.length<this.options.sentinelMaxConnections;){let{done:e,value:r}=this.sentinelIterator.next();if(e)break;let n=this.connectToSentinel(r,{lazyConnect:!0,retryStrategy:this.options.sentinelReconnectStrategy});n.on("reconnecting",()=>{var e;null===(e=this.emitter)||void 0===e||e.emit("sentinelReconnecting")}),t.push({address:r,client:n})}this.sentinelIterator.reset(!1),this.failoverDetector&&this.failoverDetector.cleanup(),this.failoverDetector=new d.FailoverDetector(this,t),await this.failoverDetector.subscribe(),null===(e=this.emitter)||void 0===e||e.emit("failoverSubscribed")}}function p(e){return{host:e.ip,port:Number(e.port)}}function y(){}t.default=u},5221:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});let n=r(8216),a=r(2452),i=r(67),s=r(9846);class o extends s.default{constructor(e){super(e.disconnectTimeout),this.options=e}connect(e){let t;let{options:r}=this;return this.connecting=!0,"path"in r&&r.path?t={path:r.path}:(t={},"port"in r&&null!=r.port&&(t.port=r.port),"host"in r&&null!=r.host&&(t.host=r.host),"family"in r&&null!=r.family&&(t.family=r.family)),r.tls&&Object.assign(t,r.tls),new Promise((e,s)=>{process.nextTick(()=>{if(!this.connecting){s(Error(i.CONNECTION_CLOSED_ERROR_MSG));return}try{r.tls?this.stream=(0,a.connect)(t):this.stream=(0,n.createConnection)(t)}catch(e){s(e);return}this.stream.once("error",e=>{this.firstError=e}),e(this.stream)})})}}t.default=o},5929:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.SentinelConnector=t.StandaloneConnector=void 0;let n=r(5221);t.StandaloneConnector=n.default;let a=r(2280);t.SentinelConnector=a.default},891:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});let r=`-----BEGIN CERTIFICATE-----
MIIDTzCCAjegAwIBAgIJAKSVpiDswLcwMA0GCSqGSIb3DQEBBQUAMD4xFjAUBgNV
BAoMDUdhcmFudGlhIERhdGExJDAiBgNVBAMMG1NTTCBDZXJ0aWZpY2F0aW9uIEF1
dGhvcml0eTAeFw0xMzEwMDExMjE0NTVaFw0yMzA5MjkxMjE0NTVaMD4xFjAUBgNV
BAoMDUdhcmFudGlhIERhdGExJDAiBgNVBAMMG1NTTCBDZXJ0aWZpY2F0aW9uIEF1
dGhvcml0eTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBALZqkh/DczWP
JnxnHLQ7QL0T4B4CDKWBKCcisriGbA6ZePWVNo4hfKQC6JrzfR+081NeD6VcWUiz
rmd+jtPhIY4c+WVQYm5PKaN6DT1imYdxQw7aqO5j2KUCEh/cznpLxeSHoTxlR34E
QwF28Wl3eg2vc5ct8LjU3eozWVk3gb7alx9mSA2SgmuX5lEQawl++rSjsBStemY2
BDwOpAMXIrdEyP/cVn8mkvi/BDs5M5G+09j0gfhyCzRWMQ7Hn71u1eolRxwVxgi3
TMn+/vTaFSqxKjgck6zuAYjBRPaHe7qLxHNr1So/Mc9nPy+3wHebFwbIcnUojwbp
4nctkWbjb2cCAwEAAaNQME4wHQYDVR0OBBYEFP1whtcrydmW3ZJeuSoKZIKjze3w
MB8GA1UdIwQYMBaAFP1whtcrydmW3ZJeuSoKZIKjze3wMAwGA1UdEwQFMAMBAf8w
DQYJKoZIhvcNAQEFBQADggEBAG2erXhwRAa7+ZOBs0B6X57Hwyd1R4kfmXcs0rta
lbPpvgULSiB+TCbf3EbhJnHGyvdCY1tvlffLjdA7HJ0PCOn+YYLBA0pTU/dyvrN6
Su8NuS5yubnt9mb13nDGYo1rnt0YRfxN+8DM3fXIVr038A30UlPX2Ou1ExFJT0MZ
uFKY6ZvLdI6/1cbgmguMlAhM+DhKyV6Sr5699LM3zqeI816pZmlREETYkGr91q7k
BpXJu/dtHaGxg1ZGu6w/PCsYGUcECWENYD4VQPd8N32JjOfu6vEgoEAwfPP+3oGp
Z4m3ewACcWOAenqflb+cQYC4PsF7qbXDmRaWrbKntOlZ3n0=
-----END CERTIFICATE-----
-----BEGIN CERTIFICATE-----
MIIGMTCCBBmgAwIBAgICEAAwDQYJKoZIhvcNAQELBQAwajELMAkGA1UEBhMCVVMx
CzAJBgNVBAgMAkNBMQswCQYDVQQHDAJDQTESMBAGA1UECgwJUmVkaXNMYWJzMS0w
KwYDVQQDDCRSZWRpc0xhYnMgUm9vdCBDZXJ0aWZpY2F0ZSBBdXRob3JpdHkwHhcN
MTgwMjI1MTUzNzM3WhcNMjgwMjIzMTUzNzM3WjBfMQswCQYDVQQGEwJVUzELMAkG
A1UECAwCQ0ExEjAQBgNVBAoMCVJlZGlzTGFiczEvMC0GA1UEAwwmUkNQIEludGVy
bWVkaWF0ZSBDZXJ0aWZpY2F0ZSBBdXRob3JpdHkwggIiMA0GCSqGSIb3DQEBAQUA
A4ICDwAwggIKAoICAQDf9dqbxc8Bq7Ctq9rWcxrGNKKHivqLAFpPq02yLPx6fsOv
Tq7GsDChAYBBc4v7Y2Ap9RD5Vs3dIhEANcnolf27QwrG9RMnnvzk8pCvp1o6zSU4
VuOE1W66/O1/7e2rVxyrnTcP7UgK43zNIXu7+tiAqWsO92uSnuMoGPGpeaUm1jym
hjWKtkAwDFSqvHY+XL5qDVBEjeUe+WHkYUg40cAXjusAqgm2hZt29c2wnVrxW25W
P0meNlzHGFdA2AC5z54iRiqj57dTfBTkHoBczQxcyw6hhzxZQ4e5I5zOKjXXEhZN
r0tA3YC14CTabKRus/JmZieyZzRgEy2oti64tmLYTqSlAD78pRL40VNoaSYetXLw
hhNsXCHgWaY6d5bLOc/aIQMAV5oLvZQKvuXAF1IDmhPA+bZbpWipp0zagf1P1H3s
UzsMdn2KM0ejzgotbtNlj5TcrVwpmvE3ktvUAuA+hi3FkVx1US+2Gsp5x4YOzJ7u
P1WPk6ShF0JgnJH2ILdj6kttTWwFzH17keSFICWDfH/+kM+k7Y1v3EXMQXE7y0T9
MjvJskz6d/nv+sQhY04xt64xFMGTnZjlJMzfQNi7zWFLTZnDD0lPowq7l3YiPoTT
t5Xky83lu0KZsZBo0WlWaDG00gLVdtRgVbcuSWxpi5BdLb1kRab66JptWjxwXQID
AQABo4HrMIHoMDoGA1UdHwQzMDEwL6AtoCuGKWh0dHBzOi8vcmwtY2Etc2VydmVy
LnJlZGlzbGFicy5jb20vdjEvY3JsMEYGCCsGAQUFBwEBBDowODA2BggrBgEFBQcw
AYYqaHR0cHM6Ly9ybC1jYS1zZXJ2ZXIucmVkaXNsYWJzLmNvbS92MS9vY3NwMB0G
A1UdDgQWBBQHar5OKvQUpP2qWt6mckzToeCOHDAfBgNVHSMEGDAWgBQi42wH6hM4
L2sujEvLM0/u8lRXTzASBgNVHRMBAf8ECDAGAQH/AgEAMA4GA1UdDwEB/wQEAwIB
hjANBgkqhkiG9w0BAQsFAAOCAgEAirEn/iTsAKyhd+pu2W3Z5NjCko4NPU0EYUbr
AP7+POK2rzjIrJO3nFYQ/LLuC7KCXG+2qwan2SAOGmqWst13Y+WHp44Kae0kaChW
vcYLXXSoGQGC8QuFSNUdaeg3RbMDYFT04dOkqufeWVccoHVxyTSg9eD8LZuHn5jw
7QDLiEECBmIJHk5Eeo2TAZrx4Yx6ufSUX5HeVjlAzqwtAqdt99uCJ/EL8bgpWbe+
XoSpvUv0SEC1I1dCAhCKAvRlIOA6VBcmzg5Am12KzkqTul12/VEFIgzqu0Zy2Jbc
AUPrYVu/+tOGXQaijy7YgwH8P8n3s7ZeUa1VABJHcxrxYduDDJBLZi+MjheUDaZ1
jQRHYevI2tlqeSBqdPKG4zBY5lS0GiAlmuze5oENt0P3XboHoZPHiqcK3VECgTVh
/BkJcuudETSJcZDmQ8YfoKfBzRQNg2sv/hwvUv73Ss51Sco8GEt2lD8uEdib1Q6z
zDT5lXJowSzOD5ZA9OGDjnSRL+2riNtKWKEqvtEG3VBJoBzu9GoxbAc7wIZLxmli
iF5a/Zf5X+UXD3s4TMmy6C4QZJpAA2egsSQCnraWO2ULhh7iXMysSkF/nzVfZn43
iqpaB8++9a37hWq14ZmOv0TJIDz//b2+KC4VFXWQ5W5QC6whsjT+OlG4p5ZYG0jo
616pxqo=
-----END CERTIFICATE-----
-----BEGIN CERTIFICATE-----
MIIFujCCA6KgAwIBAgIJAJ1aTT1lu2ScMA0GCSqGSIb3DQEBCwUAMGoxCzAJBgNV
BAYTAlVTMQswCQYDVQQIDAJDQTELMAkGA1UEBwwCQ0ExEjAQBgNVBAoMCVJlZGlz
TGFiczEtMCsGA1UEAwwkUmVkaXNMYWJzIFJvb3QgQ2VydGlmaWNhdGUgQXV0aG9y
aXR5MB4XDTE4MDIyNTE1MjA0MloXDTM4MDIyMDE1MjA0MlowajELMAkGA1UEBhMC
VVMxCzAJBgNVBAgMAkNBMQswCQYDVQQHDAJDQTESMBAGA1UECgwJUmVkaXNMYWJz
MS0wKwYDVQQDDCRSZWRpc0xhYnMgUm9vdCBDZXJ0aWZpY2F0ZSBBdXRob3JpdHkw
ggIiMA0GCSqGSIb3DQEBAQUAA4ICDwAwggIKAoICAQDLEjXy7YrbN5Waau5cd6g1
G5C2tMmeTpZ0duFAPxNU4oE3RHS5gGiok346fUXuUxbZ6QkuzeN2/2Z+RmRcJhQY
Dm0ZgdG4x59An1TJfnzKKoWj8ISmoHS/TGNBdFzXV7FYNLBuqZouqePI6ReC6Qhl
pp45huV32Q3a6IDrrvx7Wo5ZczEQeFNbCeCOQYNDdTmCyEkHqc2AGo8eoIlSTutT
ULOC7R5gzJVTS0e1hesQ7jmqHjbO+VQS1NAL4/5K6cuTEqUl+XhVhPdLWBXJQ5ag
54qhX4v+ojLzeU1R/Vc6NjMvVtptWY6JihpgplprN0Yh2556ewcXMeturcKgXfGJ
xeYzsjzXerEjrVocX5V8BNrg64NlifzTMKNOOv4fVZszq1SIHR8F9ROrqiOdh8iC
JpUbLpXH9hWCSEO6VRMB2xJoKu3cgl63kF30s77x7wLFMEHiwsQRKxooE1UhgS9K
2sO4TlQ1eWUvFvHSTVDQDlGQ6zu4qjbOpb3Q8bQwoK+ai2alkXVR4Ltxe9QlgYK3
StsnPhruzZGA0wbXdpw0bnM+YdlEm5ffSTpNIfgHeaa7Dtb801FtA71ZlH7A6TaI
SIQuUST9EKmv7xrJyx0W1pGoPOLw5T029aTjnICSLdtV9bLwysrLhIYG5bnPq78B
cS+jZHFGzD7PUVGQD01nOQIDAQABo2MwYTAdBgNVHQ4EFgQUIuNsB+oTOC9rLoxL
yzNP7vJUV08wHwYDVR0jBBgwFoAUIuNsB+oTOC9rLoxLyzNP7vJUV08wDwYDVR0T
AQH/BAUwAwEB/zAOBgNVHQ8BAf8EBAMCAYYwDQYJKoZIhvcNAQELBQADggIBAHfg
z5pMNUAKdMzK1aS1EDdK9yKz4qicILz5czSLj1mC7HKDRy8cVADUxEICis++CsCu
rYOvyCVergHQLREcxPq4rc5Nq1uj6J6649NEeh4WazOOjL4ZfQ1jVznMbGy+fJm3
3Hoelv6jWRG9iqeJZja7/1s6YC6bWymI/OY1e4wUKeNHAo+Vger7MlHV+RuabaX+
hSJ8bJAM59NCM7AgMTQpJCncrcdLeceYniGy5Q/qt2b5mJkQVkIdy4TPGGB+AXDJ
D0q3I/JDRkDUFNFdeW0js7fHdsvCR7O3tJy5zIgEV/o/BCkmJVtuwPYOrw/yOlKj
TY/U7ATAx9VFF6/vYEOMYSmrZlFX+98L6nJtwDqfLB5VTltqZ4H/KBxGE3IRSt9l
FXy40U+LnXzhhW+7VBAvyYX8GEXhHkKU8Gqk1xitrqfBXY74xKgyUSTolFSfFVgj
mcM/X4K45bka+qpkj7Kfv/8D4j6aZekwhN2ly6hhC1SmQ8qjMjpG/mrWOSSHZFmf
ybu9iD2AYHeIOkshIl6xYIa++Q/00/vs46IzAbQyriOi0XxlSMMVtPx0Q3isp+ji
n8Mq9eOuxYOEQ4of8twUkUDd528iwGtEdwf0Q01UyT84S62N8AySl1ZBKXJz6W4F
UhWfa/HQYOAPDdEjNgnVwLI23b8t0TozyCWw7q8h
-----END CERTIFICATE-----

-----BEGIN CERTIFICATE-----
MIIEjzCCA3egAwIBAgIQe55B/ALCKJDZtdNT8kD6hTANBgkqhkiG9w0BAQsFADBM
MSAwHgYDVQQLExdHbG9iYWxTaWduIFJvb3QgQ0EgLSBSMzETMBEGA1UEChMKR2xv
YmFsU2lnbjETMBEGA1UEAxMKR2xvYmFsU2lnbjAeFw0yMjAxMjYxMjAwMDBaFw0y
NTAxMjYwMDAwMDBaMFgxCzAJBgNVBAYTAkJFMRkwFwYDVQQKExBHbG9iYWxTaWdu
IG52LXNhMS4wLAYDVQQDEyVHbG9iYWxTaWduIEF0bGFzIFIzIE9WIFRMUyBDQSAy
MDIyIFEyMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAmGmg1LW9b7Lf
8zDD83yBDTEkt+FOxKJZqF4veWc5KZsQj9HfnUS2e5nj/E+JImlGPsQuoiosLuXD
BVBNAMcUFa11buFMGMeEMwiTmCXoXRrXQmH0qjpOfKgYc5gHG3BsRGaRrf7VR4eg
ofNMG9wUBw4/g/TT7+bQJdA4NfE7Y4d5gEryZiBGB/swaX6Jp/8MF4TgUmOWmalK
dZCKyb4sPGQFRTtElk67F7vU+wdGcrcOx1tDcIB0ncjLPMnaFicagl+daWGsKqTh
counQb6QJtYHa91KvCfKWocMxQ7OIbB5UARLPmC4CJ1/f8YFm35ebfzAeULYdGXu
jE9CLor0OwIDAQABo4IBXzCCAVswDgYDVR0PAQH/BAQDAgGGMB0GA1UdJQQWMBQG
CCsGAQUFBwMBBggrBgEFBQcDAjASBgNVHRMBAf8ECDAGAQH/AgEAMB0GA1UdDgQW
BBSH5Zq7a7B/t95GfJWkDBpA8HHqdjAfBgNVHSMEGDAWgBSP8Et/qC5FJK5NUPpj
move4t0bvDB7BggrBgEFBQcBAQRvMG0wLgYIKwYBBQUHMAGGImh0dHA6Ly9vY3Nw
Mi5nbG9iYWxzaWduLmNvbS9yb290cjMwOwYIKwYBBQUHMAKGL2h0dHA6Ly9zZWN1
cmUuZ2xvYmFsc2lnbi5jb20vY2FjZXJ0L3Jvb3QtcjMuY3J0MDYGA1UdHwQvMC0w
K6ApoCeGJWh0dHA6Ly9jcmwuZ2xvYmFsc2lnbi5jb20vcm9vdC1yMy5jcmwwIQYD
VR0gBBowGDAIBgZngQwBAgIwDAYKKwYBBAGgMgoBAjANBgkqhkiG9w0BAQsFAAOC
AQEAKRic9/f+nmhQU/wz04APZLjgG5OgsuUOyUEZjKVhNGDwxGTvKhyXGGAMW2B/
3bRi+aElpXwoxu3pL6fkElbX3B0BeS5LoDtxkyiVEBMZ8m+sXbocwlPyxrPbX6mY
0rVIvnuUeBH8X0L5IwfpNVvKnBIilTbcebfHyXkPezGwz7E1yhUULjJFm2bt0SdX
y+4X/WeiiYIv+fTVgZZgl+/2MKIsu/qdBJc3f3TvJ8nz+Eax1zgZmww+RSQWeOj3
15Iw6Z5FX+NwzY/Ab+9PosR5UosSeq+9HhtaxZttXG1nVh+avYPGYddWmiMT90J5
ZgKnO/Fx2hBgTxhOTMYaD312kg==
-----END CERTIFICATE-----

-----BEGIN CERTIFICATE-----
MIIDXzCCAkegAwIBAgILBAAAAAABIVhTCKIwDQYJKoZIhvcNAQELBQAwTDEgMB4G
A1UECxMXR2xvYmFsU2lnbiBSb290IENBIC0gUjMxEzARBgNVBAoTCkdsb2JhbFNp
Z24xEzARBgNVBAMTCkdsb2JhbFNpZ24wHhcNMDkwMzE4MTAwMDAwWhcNMjkwMzE4
MTAwMDAwWjBMMSAwHgYDVQQLExdHbG9iYWxTaWduIFJvb3QgQ0EgLSBSMzETMBEG
A1UEChMKR2xvYmFsU2lnbjETMBEGA1UEAxMKR2xvYmFsU2lnbjCCASIwDQYJKoZI
hvcNAQEBBQADggEPADCCAQoCggEBAMwldpB5BngiFvXAg7aEyiie/QV2EcWtiHL8
RgJDx7KKnQRfJMsuS+FggkbhUqsMgUdwbN1k0ev1LKMPgj0MK66X17YUhhB5uzsT
gHeMCOFJ0mpiLx9e+pZo34knlTifBtc+ycsmWQ1z3rDI6SYOgxXG71uL0gRgykmm
KPZpO/bLyCiR5Z2KYVc3rHQU3HTgOu5yLy6c+9C7v/U9AOEGM+iCK65TpjoWc4zd
QQ4gOsC0p6Hpsk+QLjJg6VfLuQSSaGjlOCZgdbKfd/+RFO+uIEn8rUAVSNECMWEZ
XriX7613t2Saer9fwRPvm2L7DWzgVGkWqQPabumDk3F2xmmFghcCAwEAAaNCMEAw
DgYDVR0PAQH/BAQDAgEGMA8GA1UdEwEB/wQFMAMBAf8wHQYDVR0OBBYEFI/wS3+o
LkUkrk1Q+mOai97i3Ru8MA0GCSqGSIb3DQEBCwUAA4IBAQBLQNvAUKr+yAzv95ZU
RUm7lgAJQayzE4aGKAczymvmdLm6AC2upArT9fHxD4q/c2dKg8dEe3jgr25sbwMp
jjM5RcOO5LlXbKr8EpbsU8Yt5CRsuZRj+9xTaGdWPoO4zzUhw8lo/s7awlOqzJCK
6fBdRoyV3XpYKBovHd7NADdBj+1EbddTKJd+82cEHhXXipa0095MJ6RMG3NzdvQX
mcIfeg7jLQitChws/zyrVQ4PkX4268NXSb7hLi18YIvDQVETI53O9zJrlAGomecs
Mx86OyXShkDOOyyGeMlhLxS67ttVb9+E7gUJTb0o2HLO02JQZR7rkpeDMdmztcpH
WD9f
-----END CERTIFICATE-----`;t.default={RedisCloudFixed:{ca:r},RedisCloudFlexible:{ca:r}}},7845:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});let n=r(3122);class a extends n.RedisError{constructor(e,t){super(e),this.lastNodeError=t,Error.captureStackTrace(this,this.constructor)}get name(){return this.constructor.name}}t.default=a,a.defaultMessage="Failed to refresh slots cache."},9975:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});let n=r(3122);class a extends n.AbortError{constructor(e){super(`Reached the max retries per request limit (which is ${e}). Refer to "maxRetriesPerRequest" option for details.`),Error.captureStackTrace(this,this.constructor)}get name(){return this.constructor.name}}t.default=a},9079:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.MaxRetriesPerRequestError=void 0;let n=r(9975);t.MaxRetriesPerRequestError=n.default},2197:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.print=t.ReplyError=t.SentinelIterator=t.SentinelConnector=t.AbstractConnector=t.Pipeline=t.ScanStream=t.Command=t.Cluster=t.Redis=t.default=void 0,t=e.exports=r(266).default;var n=r(266);Object.defineProperty(t,"default",{enumerable:!0,get:function(){return n.default}});var a=r(266);Object.defineProperty(t,"Redis",{enumerable:!0,get:function(){return a.default}});var i=r(2742);Object.defineProperty(t,"Cluster",{enumerable:!0,get:function(){return i.default}});var s=r(9749);Object.defineProperty(t,"Command",{enumerable:!0,get:function(){return s.default}});var o=r(5842);Object.defineProperty(t,"ScanStream",{enumerable:!0,get:function(){return o.default}});var l=r(9770);Object.defineProperty(t,"Pipeline",{enumerable:!0,get:function(){return l.default}});var d=r(9846);Object.defineProperty(t,"AbstractConnector",{enumerable:!0,get:function(){return d.default}});var c=r(2280);Object.defineProperty(t,"SentinelConnector",{enumerable:!0,get:function(){return c.default}}),Object.defineProperty(t,"SentinelIterator",{enumerable:!0,get:function(){return c.SentinelIterator}}),t.ReplyError=r(3122).ReplyError,Object.defineProperty(t,"Promise",{get:()=>(console.warn("ioredis v5 does not support plugging third-party Promise library anymore. Native Promise will be used."),Promise),set(e){console.warn("ioredis v5 does not support plugging third-party Promise library anymore. Native Promise will be used.")}}),t.print=function(e,t){e?console.log("Error: "+e):console.log("Reply: "+t)}},3233:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.DEFAULT_REDIS_OPTIONS=void 0,t.DEFAULT_REDIS_OPTIONS={port:6379,host:"localhost",family:4,connectTimeout:1e4,disconnectTimeout:2e3,retryStrategy:function(e){return Math.min(50*e,2e3)},keepAlive:0,noDelay:!0,connectionName:null,sentinels:null,name:null,role:"master",sentinelRetryStrategy:function(e){return Math.min(10*e,1e3)},sentinelReconnectStrategy:function(){return 6e4},natMap:null,enableTLSForSentinelMode:!1,updateSentinels:!0,failoverDetector:!1,username:null,password:null,db:0,enableOfflineQueue:!0,enableReadyCheck:!0,autoResubscribe:!0,autoResendUnfulfilledCommands:!0,lazyConnect:!1,keyPrefix:"",reconnectOnError:null,readOnly:!1,stringNumbers:!1,maxRetriesPerRequest:20,maxLoadingRetryTime:1e4,enableAutoPipelining:!1,autoPipeliningIgnoredCommands:[],sentinelMaxConnections:10}},4797:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.readyHandler=t.errorHandler=t.closeHandler=t.connectHandler=void 0;let n=r(3122),a=r(9749),i=r(9079),s=r(67),o=r(385),l=(0,s.Debug)("connection");function d(e){let t=new n.AbortError("Command aborted due to connection close");return t.command={name:e.name,args:e.args},t}t.connectHandler=function(e){return function(){e.setStatus("connect"),e.resetCommandQueue();let r=!1,{connectionEpoch:n}=e;e.condition.auth&&e.auth(e.condition.auth,function(t){n===e.connectionEpoch&&t&&(-1!==t.message.indexOf("no password is set")?console.warn("[WARN] Redis server does not require a password, but a password was supplied."):-1!==t.message.indexOf("without any password configured for the default user")?console.warn("[WARN] This Redis server's `default` user does not require a password, but a password was supplied"):-1!==t.message.indexOf("wrong number of arguments for 'auth' command")?console.warn("[ERROR] The server returned \"wrong number of arguments for 'auth' command\". You are probably passing both username and password to Redis version 5 or below. You should only pass the 'password' option for Redis version 5 and under."):(r=!0,e.recoverFromFatalError(t,t)))}),e.condition.select&&e.select(e.condition.select).catch(t=>{e.silentEmit("error",t)}),e.options.enableReadyCheck||t.readyHandler(e)(),new o.default(e,{stringNumbers:e.options.stringNumbers}),e.options.enableReadyCheck&&e._readyCheck(function(a,i){n===e.connectionEpoch&&(a?r||e.recoverFromFatalError(Error("Ready check failed: "+a.message),a):e.connector.check(i)?t.readyHandler(e)():e.disconnect(!0))})}},t.closeHandler=function(e){return function(){let r=e.status;if(e.setStatus("close"),e.commandQueue.length&&function(e){var t;let r=0;for(let n=0;n<e.length;){let a=null===(t=e.peekAt(n))||void 0===t?void 0:t.command,i=a.pipelineIndex;if((void 0===i||0===i)&&(r=0),void 0!==i&&i!==r++){e.remove(n,1),a.reject(d(a));continue}n++}}(e.commandQueue),e.offlineQueue.length&&function(e){var t;for(let r=0;r<e.length;){let n=null===(t=e.peekAt(r))||void 0===t?void 0:t.command;if("multi"===n.name)break;if("exec"===n.name){e.remove(r,1),n.reject(d(n));break}n.inTransaction?(e.remove(r,1),n.reject(d(n))):r++}}(e.offlineQueue),"ready"===r&&(e.prevCondition||(e.prevCondition=e.condition),e.commandQueue.length&&(e.prevCommandQueue=e.commandQueue)),e.manuallyClosing)return e.manuallyClosing=!1,l("skip reconnecting since the connection is manually closed."),t();if("function"!=typeof e.options.retryStrategy)return l("skip reconnecting because `retryStrategy` is not a function"),t();let n=e.options.retryStrategy(++e.retryAttempts);if("number"!=typeof n)return l("skip reconnecting because `retryStrategy` doesn't return a number"),t();l("reconnect in %sms",n),e.setStatus("reconnecting",n),e.reconnectTimeout=setTimeout(function(){e.reconnectTimeout=null,e.connect().catch(s.noop)},n);let{maxRetriesPerRequest:a}=e.options;"number"==typeof a&&(a<0?l("maxRetriesPerRequest is negative, ignoring..."):0==e.retryAttempts%(a+1)&&(l("reach maxRetriesPerRequest limitation, flushing command queue..."),e.flushQueue(new i.MaxRetriesPerRequestError(a))))};function t(){e.setStatus("end"),e.flushQueue(Error(s.CONNECTION_CLOSED_ERROR_MSG))}},t.errorHandler=function(e){return function(t){l("error: %s",t),e.silentEmit("error",t)}},t.readyHandler=function(e){return function(){if(e.setStatus("ready"),e.retryAttempts=0,e.options.monitor){e.call("monitor").then(()=>e.setStatus("monitoring"),t=>e.emit("error",t));let{sendCommand:t}=e;e.sendCommand=function(r){return a.default.checkFlag("VALID_IN_MONITOR_MODE",r.name)?t.call(e,r):(r.reject(Error("Connection is in monitoring mode, can't process commands.")),r.promise)},e.once("close",function(){delete e.sendCommand});return}let t=e.prevCondition?e.prevCondition.select:e.condition.select;if(e.options.connectionName&&(l("set the connection name [%s]",e.options.connectionName),e.client("setname",e.options.connectionName).catch(s.noop)),e.options.readOnly&&(l("set the connection to readonly mode"),e.readonly().catch(s.noop)),e.prevCondition){let r=e.prevCondition;if(e.prevCondition=null,r.subscriber&&e.options.autoResubscribe){e.condition.select!==t&&(l("connect to db [%d]",t),e.select(t));let n=r.subscriber.channels("subscribe");n.length&&(l("subscribe %d channels",n.length),e.subscribe(n));let a=r.subscriber.channels("psubscribe");a.length&&(l("psubscribe %d channels",a.length),e.psubscribe(a));let i=r.subscriber.channels("ssubscribe");i.length&&(l("ssubscribe %d channels",i.length),e.ssubscribe(i))}}if(e.prevCommandQueue){if(e.options.autoResendUnfulfilledCommands)for(l("resend %d unfulfilled commands",e.prevCommandQueue.length);e.prevCommandQueue.length>0;){let t=e.prevCommandQueue.shift();t.select!==e.condition.select&&"select"!==t.command.name&&e.select(t.select),e.sendCommand(t.command,t.stream)}else e.prevCommandQueue=null}if(e.offlineQueue.length){l("send %d commands in offline queue",e.offlineQueue.length);let t=e.offlineQueue;for(e.resetOfflineQueue();t.length>0;){let r=t.shift();r.select!==e.condition.select&&"select"!==r.command.name&&e.select(r.select),e.sendCommand(r.command,r.stream)}}e.condition.select!==t&&(l("connect to db [%d]",t),e.select(t))}}},8064:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.addTransactionSupport=void 0;let n=r(67),a=r(3499),i=r(9770);t.addTransactionSupport=function(e){e.pipeline=function(e){let t=new i.default(this);return Array.isArray(e)&&t.addBatch(e),t};let{multi:t}=e;e.multi=function(e,r){if(void 0!==r||Array.isArray(e)||(r=e,e=null),r&&!1===r.pipeline)return t.call(this);let s=new i.default(this);s.multi(),Array.isArray(e)&&s.addBatch(e);let o=s.exec;s.exec=function(e){if(this.isCluster&&!this.redis.slots.length)return"wait"===this.redis.status&&this.redis.connect().catch(n.noop),(0,a.default)(new Promise((e,t)=>{this.redis.delayUntilReady(r=>{if(r){t(r);return}this.exec(s).then(e,t)})}),e);if(this._transactions>0&&o.call(s),this.nodeifiedPromise)return o.call(s);let t=o.call(s);return(0,a.default)(t.then(function(e){let t=e[e.length-1];if(void 0===t)throw Error("Pipeline cannot be used to send any commands when the `exec()` has been called on it.");if(t[0]){t[0].previousErrors=[];for(let r=0;r<e.length-1;++r)e[r][0]&&t[0].previousErrors.push(e[r][0]);throw t[0]}return(0,n.wrapMultiResult)(t[1])}),e)};let{execBuffer:l}=s;return s.execBuffer=function(e){return this._transactions>0&&l.call(s),s.exec(e)},s};let{exec:r}=e;e.exec=function(e){return(0,a.default)(r.call(this).then(function(e){return Array.isArray(e)&&(e=(0,n.wrapMultiResult)(e)),e}),e)}}},6789:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});let n=r(8942),a=r(996),i=r(9749),s=r(2891);class o{constructor(){this.options={},this.scriptsSet={},this.addedBuiltinSet=new Set}getBuiltinCommands(){return l.slice(0)}createBuiltinCommand(e){return{string:d(null,e,"utf8"),buffer:d(null,e,null)}}addBuiltinCommand(e){this.addedBuiltinSet.add(e),this[e]=d(e,e,"utf8"),this[e+"Buffer"]=d(e+"Buffer",e,null)}defineCommand(e,t){let r=new s.default(t.lua,t.numberOfKeys,this.options.keyPrefix,t.readOnly);this.scriptsSet[e]=r,this[e]=c(e,e,r,"utf8"),this[e+"Buffer"]=c(e+"Buffer",e,r,null)}sendCommand(e,t,r){throw Error('"sendCommand" is not implemented')}}let l=n.list.filter(e=>"monitor"!==e);function d(e,t,r){return void 0===r&&(r=t,t=null),function(...n){let s=t||n.shift(),o=n[n.length-1];"function"==typeof o?n.pop():o=void 0;let l={errorStack:this.options.showFriendlyErrorStack?Error():void 0,keyPrefix:this.options.keyPrefix,replyEncoding:r};return(0,a.shouldUseAutoPipelining)(this,e,s)?(0,a.executeWithAutoPipelining)(this,e,s,n,o):this.sendCommand(new i.default(s,n,l,o))}}function c(e,t,r,n){return function(...i){let s="function"==typeof i[i.length-1]?i.pop():void 0,o={replyEncoding:n};return(this.options.showFriendlyErrorStack&&(o.errorStack=Error()),(0,a.shouldUseAutoPipelining)(this,e,t))?(0,a.executeWithAutoPipelining)(this,e,t,i,s):r.execute(this,i,o,s)}}l.push("sentinel"),l.forEach(function(e){o.prototype[e]=d(e,e,"utf8"),o.prototype[e+"Buffer"]=d(e+"Buffer",e,null)}),o.prototype.call=d("call","utf8"),o.prototype.callBuffer=d("callBuffer",null),o.prototype.send_command=o.prototype.call,t.default=o},2449:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){Object.getOwnPropertyNames(t.prototype).forEach(r=>{Object.defineProperty(e.prototype,r,Object.getOwnPropertyDescriptor(t.prototype,r))})}},1:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.genRedactedString=t.getStringValue=t.MAX_ARGUMENT_LENGTH=void 0;let n=r(9092);function a(e){if(null!==e)switch(typeof e){case"boolean":case"number":return;case"object":if(Buffer.isBuffer(e))return e.toString("hex");if(Array.isArray(e))return e.join(",");try{return JSON.stringify(e)}catch(e){return}case"string":return e}}function i(e,t){let{length:r}=e;return r<=t?e:e.slice(0,t)+' ... <REDACTED full-length="'+r+'">'}t.MAX_ARGUMENT_LENGTH=200,t.getStringValue=a,t.genRedactedString=i,t.default=function(e){let t=(0,n.default)(`ioredis:${e}`);function r(...e){if(t.enabled){for(let t=1;t<e.length;t++){let r=a(e[t]);"string"==typeof r&&r.length>200&&(e[t]=i(r,200))}return t.apply(null,e)}}return Object.defineProperties(r,{namespace:{get:()=>t.namespace},enabled:{get:()=>t.enabled},destroy:{get:()=>t.destroy},log:{get:()=>t.log,set(e){t.log=e}}}),r}},67:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.noop=t.defaults=t.Debug=t.zipMap=t.CONNECTION_CLOSED_ERROR_MSG=t.shuffle=t.sample=t.resolveTLSProfile=t.parseURL=t.optimizeErrorStack=t.toArg=t.convertMapToArray=t.convertObjectToArray=t.timeout=t.packObject=t.isInt=t.wrapMultiResult=t.convertBufferToString=void 0;let n=r(7360),a=r(1681);Object.defineProperty(t,"defaults",{enumerable:!0,get:function(){return a.defaults}}),Object.defineProperty(t,"noop",{enumerable:!0,get:function(){return a.noop}});let i=r(1);t.Debug=i.default;let s=r(891);function o(e){let t=parseFloat(e);return!isNaN(e)&&(0|t)===t}t.convertBufferToString=function e(t,r){if(t instanceof Buffer)return t.toString(r);if(Array.isArray(t)){let n=t.length,a=Array(n);for(let i=0;i<n;++i)a[i]=t[i]instanceof Buffer&&"utf8"===r?t[i].toString():e(t[i],r);return a}return t},t.wrapMultiResult=function(e){if(!e)return null;let t=[],r=e.length;for(let n=0;n<r;++n){let r=e[n];r instanceof Error?t.push([r]):t.push([null,r])}return t},t.isInt=o,t.packObject=function(e){let t={},r=e.length;for(let n=1;n<r;n+=2)t[e[n-1]]=e[n];return t},t.timeout=function(e,t){let r=null,n=function(){r&&(clearTimeout(r),r=null,e.apply(this,arguments))};return r=setTimeout(n,t,Error("timeout")),n},t.convertObjectToArray=function(e){let t=[],r=Object.keys(e);for(let n=0,a=r.length;n<a;n++)t.push(r[n],e[r[n]]);return t},t.convertMapToArray=function(e){let t=[],r=0;return e.forEach(function(e,n){t[r]=n,t[r+1]=e,r+=2}),t},t.toArg=function(e){return null==e?"":String(e)},t.optimizeErrorStack=function(e,t,r){let n;let a=t.split("\n"),i="";for(n=1;n<a.length&&-1!==a[n].indexOf(r);++n);for(let e=n;e<a.length;++e)i+="\n"+a[e];if(e.stack){let t=e.stack.indexOf("\n");e.stack=e.stack.slice(0,t)+i}return e},t.parseURL=function(e){if(o(e))return{port:e};let t=(0,n.parse)(e,!0,!0);t.slashes||"/"===e[0]||(e="//"+e,t=(0,n.parse)(e,!0,!0));let r=t.query||{},i={};if(t.auth){let e=t.auth.indexOf(":");i.username=-1===e?t.auth:t.auth.slice(0,e),i.password=-1===e?"":t.auth.slice(e+1)}if(t.pathname&&("redis:"===t.protocol||"rediss:"===t.protocol?t.pathname.length>1&&(i.db=t.pathname.slice(1)):i.path=t.pathname),t.host&&(i.host=t.hostname),t.port&&(i.port=t.port),"string"==typeof r.family){let e=Number.parseInt(r.family,10);Number.isNaN(e)||(i.family=e)}return(0,a.defaults)(i,r),i},t.resolveTLSProfile=function(e){let t=null==e?void 0:e.tls;"string"==typeof t&&(t={profile:t});let r=s.default[null==t?void 0:t.profile];return r&&(t=Object.assign({},r,t),delete t.profile,e=Object.assign({},e,{tls:t})),e},t.sample=function(e,t=0){let r=e.length;return t>=r?null:e[t+Math.floor(Math.random()*(r-t))]},t.shuffle=function(e){let t=e.length;for(;t>0;){let r=Math.floor(Math.random()*t);t--,[e[t],e[r]]=[e[r],e[t]]}return e},t.CONNECTION_CLOSED_ERROR_MSG="Connection is closed.",t.zipMap=function(e,t){let r=new Map;return e.forEach((e,n)=>{r.set(e,t[n])}),r}},1681:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.isArguments=t.defaults=t.noop=void 0;let n=r(3283);t.defaults=n;let a=r(1325);t.isArguments=a,t.noop=function(){}},3283:e=>{var t=/^(?:0|[1-9]\d*)$/;function r(e,t,r){switch(r.length){case 0:return e.call(t);case 1:return e.call(t,r[0]);case 2:return e.call(t,r[0],r[1]);case 3:return e.call(t,r[0],r[1],r[2])}return e.apply(t,r)}var n=Object.prototype,a=n.hasOwnProperty,i=n.toString,s=n.propertyIsEnumerable,o=Math.max;function l(e,t,r,i){return void 0===e||u(e,n[r])&&!a.call(i,r)?t:e}function d(e,t){return t=o(void 0===t?e.length-1:t,0),function(){for(var n=arguments,a=-1,i=o(n.length-t,0),s=Array(i);++a<i;)s[a]=n[t+a];a=-1;for(var l=Array(t+1);++a<t;)l[a]=n[a];return l[t]=s,r(e,this,l)}}function c(e,r){return!!(r=null==r?9007199254740991:r)&&("number"==typeof e||t.test(e))&&e>-1&&e%1==0&&e<r}function u(e,t){return e===t||e!=e&&t!=t}var p=Array.isArray;function y(e){var t,r;return null!=e&&"number"==typeof(t=e.length)&&t>-1&&t%1==0&&t<=9007199254740991&&!("[object Function]"==(r=h(e)?i.call(e):"")||"[object GeneratorFunction]"==r)}function h(e){var t=typeof e;return!!e&&("object"==t||"function"==t)}var m=function(e){return d(function(t,r){var n=-1,a=r.length,i=a>1?r[a-1]:void 0,s=a>2?r[2]:void 0;for(i=e.length>3&&"function"==typeof i?(a--,i):void 0,s&&function(e,t,r){if(!h(r))return!1;var n=typeof t;return("number"==n?!!(y(r)&&c(t,r.length)):"string"==n&&(t in r))&&u(r[t],e)}(r[0],r[1],s)&&(i=a<3?void 0:i,a=1),t=Object(t);++n<a;){var o=r[n];o&&e(t,o,n,i)}return t})}(function(e,t,r,o){!function(e,t,r,n){r||(r={});for(var i=-1,s=t.length;++i<s;){var o=t[i],l=n?n(r[o],e[o],o,r,e):void 0;!function(e,t,r){var n=e[t];a.call(e,t)&&u(n,r)&&(void 0!==r||t in e)||(e[t]=r)}(r,o,void 0===l?e[o]:l)}}(t,y(t)?function(e,t){var r=p(e)||e&&"object"==typeof e&&y(e)&&a.call(e,"callee")&&(!s.call(e,"callee")||"[object Arguments]"==i.call(e))?function(e,t){for(var r=-1,n=Array(e);++r<e;)n[r]=t(r);return n}(e.length,String):[],n=r.length,o=!!n;for(var l in e)(t||a.call(e,l))&&!(o&&("length"==l||c(l,n)))&&r.push(l);return r}(t,!0):function(e){if(!h(e))return function(e){var t=[];if(null!=e)for(var r in Object(e))t.push(r);return t}(e);var t,r=(t=e&&e.constructor,e===("function"==typeof t&&t.prototype||n)),i=[];for(var s in e)"constructor"==s&&(r||!a.call(e,s))||i.push(s);return i}(t),e,o)}),f=d(function(e){return e.push(void 0,l),r(m,void 0,e)});e.exports=f},1325:e=>{var t=Object.prototype,r=t.hasOwnProperty,n=t.toString,a=t.propertyIsEnumerable;e.exports=function(e){var t,i,s,o,l,d;return!!e&&"object"==typeof e&&null!=(t=e)&&"number"==typeof(i=t.length)&&i>-1&&i%1==0&&i<=9007199254740991&&!("[object Function]"==(l=typeof(o=s=t),d=o&&("object"==l||"function"==l)?n.call(s):"")||"[object GeneratorFunction]"==d)&&r.call(e,"callee")&&(!a.call(e,"callee")||"[object Arguments]"==n.call(e))}},2050:(e,t)=>{"use strict";let r;Object.defineProperty(t,"__esModule",{value:!0});class n extends Error{}class a extends n{constructor(e){super(`Invalid DateTime: ${e.toMessage()}`)}}class i extends n{constructor(e){super(`Invalid Interval: ${e.toMessage()}`)}}class s extends n{constructor(e){super(`Invalid Duration: ${e.toMessage()}`)}}class o extends n{}class l extends n{constructor(e){super(`Invalid unit ${e}`)}}class d extends n{}class c extends n{constructor(){super("Zone is an abstract class")}}let u="numeric",p="short",y="long",h={year:u,month:u,day:u},m={year:u,month:p,day:u},f={year:u,month:p,day:u,weekday:p},b={year:u,month:y,day:u},g={year:u,month:y,day:u,weekday:y},K={hour:u,minute:u},v={hour:u,minute:u,second:u},S={hour:u,minute:u,second:u,timeZoneName:p},E={hour:u,minute:u,second:u,timeZoneName:y},I={hour:u,minute:u,hourCycle:"h23"},k={hour:u,minute:u,second:u,hourCycle:"h23"},w={hour:u,minute:u,second:u,hourCycle:"h23",timeZoneName:p},j={hour:u,minute:u,second:u,hourCycle:"h23",timeZoneName:y},x={year:u,month:u,day:u,hour:u,minute:u},T={year:u,month:u,day:u,hour:u,minute:u,second:u},A={year:u,month:p,day:u,hour:u,minute:u},D={year:u,month:p,day:u,hour:u,minute:u,second:u},C={year:u,month:p,day:u,weekday:p,hour:u,minute:u},O={year:u,month:y,day:u,hour:u,minute:u,timeZoneName:p},R={year:u,month:y,day:u,hour:u,minute:u,second:u,timeZoneName:p},M={year:u,month:y,day:u,weekday:y,hour:u,minute:u,timeZoneName:y},P={year:u,month:y,day:u,weekday:y,hour:u,minute:u,second:u,timeZoneName:y};class N{get type(){throw new c}get name(){throw new c}get ianaName(){return this.name}get isUniversal(){throw new c}offsetName(e,t){throw new c}formatOffset(e,t){throw new c}offset(e){throw new c}equals(e){throw new c}get isValid(){throw new c}}let J=null;class L extends N{static get instance(){return null===J&&(J=new L),J}get type(){return"system"}get name(){return new Intl.DateTimeFormat().resolvedOptions().timeZone}get isUniversal(){return!1}offsetName(e,{format:t,locale:r}){return e3(e,t,r)}formatOffset(e,t){return e8(this.offset(e),t)}offset(e){return-new Date(e).getTimezoneOffset()}equals(e){return"system"===e.type}get isValid(){return!0}}let F=new Map,_={year:0,month:1,day:2,era:3,hour:4,minute:5,second:6},V=new Map;class G extends N{static create(e){let t=V.get(e);return void 0===t&&V.set(e,t=new G(e)),t}static resetCache(){V.clear(),F.clear()}static isValidSpecifier(e){return this.isValidZone(e)}static isValidZone(e){if(!e)return!1;try{return new Intl.DateTimeFormat("en-US",{timeZone:e}).format(),!0}catch(e){return!1}}constructor(e){super(),this.zoneName=e,this.valid=G.isValidZone(e)}get type(){return"iana"}get name(){return this.zoneName}get isUniversal(){return!1}offsetName(e,{format:t,locale:r}){return e3(e,t,r,this.name)}formatOffset(e,t){return e8(this.offset(e),t)}offset(e){var t;let r;if(!this.valid)return NaN;let n=new Date(e);if(isNaN(n))return NaN;let a=(t=this.name,void 0===(r=F.get(t))&&(r=new Intl.DateTimeFormat("en-US",{hour12:!1,timeZone:t,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit",era:"short"}),F.set(t,r)),r),[i,s,o,l,d,c,u]=a.formatToParts?function(e,t){let r=e.formatToParts(t),n=[];for(let e=0;e<r.length;e++){let{type:t,value:a}=r[e],i=_[t];"era"===t?n[i]=a:eN(i)||(n[i]=parseInt(a,10))}return n}(a,n):function(e,t){let r=e.format(t).replace(/\u200E/g,""),[,n,a,i,s,o,l,d]=/(\d+)\/(\d+)\/(\d+) (AD|BC),? (\d+):(\d+):(\d+)/.exec(r);return[i,n,a,s,o,l,d]}(a,n);"BC"===l&&(i=-Math.abs(i)+1);let p=eX({year:i,month:s,day:o,hour:24===d?0:d,minute:c,second:u,millisecond:0}),y=+n,h=y%1e3;return(p-(y-=h>=0?h:1e3+h))/6e4}equals(e){return"iana"===e.type&&e.name===this.name}get isValid(){return this.valid}}let q={},Y=new Map;function B(e,t={}){let r=JSON.stringify([e,t]),n=Y.get(r);return void 0===n&&(n=new Intl.DateTimeFormat(e,t),Y.set(r,n)),n}let z=new Map,W=new Map,U=null,Q=new Map;function Z(e){let t=Q.get(e);return void 0===t&&(t=new Intl.DateTimeFormat(e).resolvedOptions(),Q.set(e,t)),t}let $=new Map;function H(e,t,r,n){let a=e.listingMode();return"error"===a?null:"en"===a?r(t):n(t)}class X{constructor(e,t,r){this.padTo=r.padTo||0,this.floor=r.floor||!1;let{padTo:n,floor:a,...i}=r;if(!t||Object.keys(i).length>0){let t={useGrouping:!1,...r};r.padTo>0&&(t.minimumIntegerDigits=r.padTo),this.inf=function(e,t={}){let r=JSON.stringify([e,t]),n=z.get(r);return void 0===n&&(n=new Intl.NumberFormat(e,t),z.set(r,n)),n}(e,t)}}format(e){if(!this.inf)return eB(this.floor?Math.floor(e):eQ(e,3),this.padTo);{let t=this.floor?Math.floor(e):e;return this.inf.format(t)}}}class ee{constructor(e,t,r){let n;if(this.opts=r,this.originalZone=void 0,this.opts.timeZone)this.dt=e;else if("fixed"===e.zone.type){let t=-(e.offset/60*1),r=t>=0?`Etc/GMT+${t}`:`Etc/GMT${t}`;0!==e.offset&&G.create(r).valid?(n=r,this.dt=e):(n="UTC",this.dt=0===e.offset?e:e.setZone("UTC").plus({minutes:e.offset}),this.originalZone=e.zone)}else"system"===e.zone.type?this.dt=e:"iana"===e.zone.type?(this.dt=e,n=e.zone.name):(n="UTC",this.dt=e.setZone("UTC").plus({minutes:e.offset}),this.originalZone=e.zone);let a={...this.opts};a.timeZone=a.timeZone||n,this.dtf=B(t,a)}format(){return this.originalZone?this.formatToParts().map(({value:e})=>e).join(""):this.dtf.format(this.dt.toJSDate())}formatToParts(){let e=this.dtf.formatToParts(this.dt.toJSDate());return this.originalZone?e.map(e=>{if("timeZoneName"!==e.type)return e;{let t=this.originalZone.offsetName(this.dt.ts,{locale:this.dt.locale,format:this.opts.timeZoneName});return{...e,value:t}}}):e}resolvedOptions(){return this.dtf.resolvedOptions()}}class et{constructor(e,t,r){this.opts={style:"long",...r},!t&&eF()&&(this.rtf=function(e,t={}){let{base:r,...n}=t,a=JSON.stringify([e,n]),i=W.get(a);return void 0===i&&(i=new Intl.RelativeTimeFormat(e,t),W.set(a,i)),i}(e,r))}format(e,t){return this.rtf?this.rtf.format(e,t):function(e,t,r="always",n=!1){let a={years:["year","yr."],quarters:["quarter","qtr."],months:["month","mo."],weeks:["week","wk."],days:["day","day","days"],hours:["hour","hr."],minutes:["minute","min."],seconds:["second","sec."]},i=-1===["hours","minutes","seconds"].indexOf(e);if("auto"===r&&i){let r="days"===e;switch(t){case 1:return r?"tomorrow":`next ${a[e][0]}`;case -1:return r?"yesterday":`last ${a[e][0]}`;case 0:return r?"today":`this ${a[e][0]}`}}let s=Object.is(t,-0)||t<0,o=Math.abs(t),l=1===o,d=a[e],c=n?l?d[1]:d[2]||d[1]:l?a[e][0]:e;return s?`${o} ${c} ago`:`in ${o} ${c}`}(t,e,this.opts.numeric,"long"!==this.opts.style)}formatToParts(e,t){return this.rtf?this.rtf.formatToParts(e,t):[]}}let er={firstDay:1,minimalDays:4,weekend:[6,7]};class en{static fromOpts(e){return en.create(e.locale,e.numberingSystem,e.outputCalendar,e.weekSettings,e.defaultToEN)}static create(e,t,r,n,a=!1){let i=e||eS.defaultLocale,s=i||(a?"en-US":U||(U=new Intl.DateTimeFormat().resolvedOptions().locale));return new en(s,t||eS.defaultNumberingSystem,r||eS.defaultOutputCalendar,eq(n)||eS.defaultWeekSettings,i)}static resetCache(){U=null,Y.clear(),z.clear(),W.clear(),Q.clear(),$.clear()}static fromObject({locale:e,numberingSystem:t,outputCalendar:r,weekSettings:n}={}){return en.create(e,t,r,n)}constructor(e,t,r,n,a){let[i,s,o]=function(e){let t=e.indexOf("-x-");-1!==t&&(e=e.substring(0,t));let r=e.indexOf("-u-");if(-1===r)return[e];{let t,n;try{t=B(e).resolvedOptions(),n=e}catch(i){let a=e.substring(0,r);t=B(a).resolvedOptions(),n=a}let{numberingSystem:a,calendar:i}=t;return[n,a,i]}}(e);this.locale=i,this.numberingSystem=t||s||null,this.outputCalendar=r||o||null,this.weekSettings=n,this.intl=function(e,t,r){return(r||t)&&(e.includes("-u-")||(e+="-u"),r&&(e+=`-ca-${r}`),t&&(e+=`-nu-${t}`)),e}(this.locale,this.numberingSystem,this.outputCalendar),this.weekdaysCache={format:{},standalone:{}},this.monthsCache={format:{},standalone:{}},this.meridiemCache=null,this.eraCache={},this.specifiedLocale=a,this.fastNumbersCached=null}get fastNumbers(){return null==this.fastNumbersCached&&(this.fastNumbersCached=(!this.numberingSystem||"latn"===this.numberingSystem)&&("latn"===this.numberingSystem||!this.locale||this.locale.startsWith("en")||"latn"===Z(this.locale).numberingSystem)),this.fastNumbersCached}listingMode(){let e=this.isEnglish(),t=(null===this.numberingSystem||"latn"===this.numberingSystem)&&(null===this.outputCalendar||"gregory"===this.outputCalendar);return e&&t?"en":"intl"}clone(e){return e&&0!==Object.getOwnPropertyNames(e).length?en.create(e.locale||this.specifiedLocale,e.numberingSystem||this.numberingSystem,e.outputCalendar||this.outputCalendar,eq(e.weekSettings)||this.weekSettings,e.defaultToEN||!1):this}redefaultToEN(e={}){return this.clone({...e,defaultToEN:!0})}redefaultToSystem(e={}){return this.clone({...e,defaultToEN:!1})}months(e,t=!1){return H(this,e,tr,()=>{let r=t?{month:e,day:"numeric"}:{month:e},n=t?"format":"standalone";return this.monthsCache[n][e]||(this.monthsCache[n][e]=function(e){let t=[];for(let r=1;r<=12;r++){let n=rB.utc(2009,r,1);t.push(e(n))}return t}(e=>this.extract(e,r,"month"))),this.monthsCache[n][e]})}weekdays(e,t=!1){return H(this,e,ts,()=>{let r=t?{weekday:e,year:"numeric",month:"long",day:"numeric"}:{weekday:e},n=t?"format":"standalone";return this.weekdaysCache[n][e]||(this.weekdaysCache[n][e]=function(e){let t=[];for(let r=1;r<=7;r++){let n=rB.utc(2016,11,13+r);t.push(e(n))}return t}(e=>this.extract(e,r,"weekday"))),this.weekdaysCache[n][e]})}meridiems(){return H(this,void 0,()=>to,()=>{if(!this.meridiemCache){let e={hour:"numeric",hourCycle:"h12"};this.meridiemCache=[rB.utc(2016,11,13,9),rB.utc(2016,11,13,19)].map(t=>this.extract(t,e,"dayperiod"))}return this.meridiemCache})}eras(e){return H(this,e,tu,()=>{let t={era:e};return this.eraCache[e]||(this.eraCache[e]=[rB.utc(-40,1,1),rB.utc(2017,1,1)].map(e=>this.extract(e,t,"era"))),this.eraCache[e]})}extract(e,t,r){let n=this.dtFormatter(e,t).formatToParts().find(e=>e.type.toLowerCase()===r);return n?n.value:null}numberFormatter(e={}){return new X(this.intl,e.forceSimple||this.fastNumbers,e)}dtFormatter(e,t={}){return new ee(e,this.intl,t)}relFormatter(e={}){return new et(this.intl,this.isEnglish(),e)}listFormatter(e={}){return function(e,t={}){let r=JSON.stringify([e,t]),n=q[r];return n||(n=new Intl.ListFormat(e,t),q[r]=n),n}(this.intl,e)}isEnglish(){return"en"===this.locale||"en-us"===this.locale.toLowerCase()||Z(this.intl).locale.startsWith("en-us")}getWeekSettings(){return this.weekSettings?this.weekSettings:e_()?function(e){let t=$.get(e);if(!t){let r=new Intl.Locale(e);"minimalDays"in(t="getWeekInfo"in r?r.getWeekInfo():r.weekInfo)||(t={...er,...t}),$.set(e,t)}return t}(this.locale):er}getStartOfWeek(){return this.getWeekSettings().firstDay}getMinDaysInFirstWeek(){return this.getWeekSettings().minimalDays}getWeekendDays(){return this.getWeekSettings().weekend}equals(e){return this.locale===e.locale&&this.numberingSystem===e.numberingSystem&&this.outputCalendar===e.outputCalendar}toString(){return`Locale(${this.locale}, ${this.numberingSystem}, ${this.outputCalendar})`}}let ea=null;class ei extends N{static get utcInstance(){return null===ea&&(ea=new ei(0)),ea}static instance(e){return 0===e?ei.utcInstance:new ei(e)}static parseSpecifier(e){if(e){let t=e.match(/^utc(?:([+-]\d{1,2})(?::(\d{2}))?)?$/i);if(t)return new ei(e6(t[1],t[2]))}return null}constructor(e){super(),this.fixed=e}get type(){return"fixed"}get name(){return 0===this.fixed?"UTC":`UTC${e8(this.fixed,"narrow")}`}get ianaName(){return 0===this.fixed?"Etc/UTC":`Etc/GMT${e8(-this.fixed,"narrow")}`}offsetName(){return this.name}formatOffset(e,t){return e8(this.fixed,t)}get isUniversal(){return!0}offset(){return this.fixed}equals(e){return"fixed"===e.type&&e.fixed===this.fixed}get isValid(){return!0}}class es extends N{constructor(e){super(),this.zoneName=e}get type(){return"invalid"}get name(){return this.zoneName}get isUniversal(){return!1}offsetName(){return null}formatOffset(){return""}offset(){return NaN}equals(){return!1}get isValid(){return!1}}function eo(e,t){if(eN(e)||null===e)return t;if(e instanceof N)return e;if("string"==typeof e){let r=e.toLowerCase();return"default"===r?t:"local"===r||"system"===r?L.instance:"utc"===r||"gmt"===r?ei.utcInstance:ei.parseSpecifier(r)||G.create(e)}return eJ(e)?ei.instance(e):"object"==typeof e&&"offset"in e&&"function"==typeof e.offset?e:new es(e)}let el={arab:"[٠-٩]",arabext:"[۰-۹]",bali:"[᭐-᭙]",beng:"[০-৯]",deva:"[०-९]",fullwide:"[０-９]",gujr:"[૦-૯]",hanidec:"[〇|一|二|三|四|五|六|七|八|九]",khmr:"[០-៩]",knda:"[೦-೯]",laoo:"[໐-໙]",limb:"[᥆-᥏]",mlym:"[൦-൯]",mong:"[᠐-᠙]",mymr:"[၀-၉]",orya:"[୦-୯]",tamldec:"[௦-௯]",telu:"[౦-౯]",thai:"[๐-๙]",tibt:"[༠-༩]",latn:"\\d"},ed={arab:[1632,1641],arabext:[1776,1785],bali:[6992,7001],beng:[2534,2543],deva:[2406,2415],fullwide:[65296,65303],gujr:[2790,2799],khmr:[6112,6121],knda:[3302,3311],laoo:[3792,3801],limb:[6470,6479],mlym:[3430,3439],mong:[6160,6169],mymr:[4160,4169],orya:[2918,2927],tamldec:[3046,3055],telu:[3174,3183],thai:[3664,3673],tibt:[3872,3881]},ec=el.hanidec.replace(/[\[|\]]/g,"").split(""),eu=new Map;function ep({numberingSystem:e},t=""){let r=e||"latn",n=eu.get(r);void 0===n&&(n=new Map,eu.set(r,n));let a=n.get(t);return void 0===a&&(a=RegExp(`${el[r]}${t}`),n.set(t,a)),a}let ey=()=>Date.now(),eh="system",em=null,ef=null,eb=null,eg=60,eK,ev=null;class eS{static get now(){return ey}static set now(e){ey=e}static set defaultZone(e){eh=e}static get defaultZone(){return eo(eh,L.instance)}static get defaultLocale(){return em}static set defaultLocale(e){em=e}static get defaultNumberingSystem(){return ef}static set defaultNumberingSystem(e){ef=e}static get defaultOutputCalendar(){return eb}static set defaultOutputCalendar(e){eb=e}static get defaultWeekSettings(){return ev}static set defaultWeekSettings(e){ev=eq(e)}static get twoDigitCutoffYear(){return eg}static set twoDigitCutoffYear(e){eg=e%100}static get throwOnInvalid(){return eK}static set throwOnInvalid(e){eK=e}static resetCaches(){en.resetCache(),G.resetCache(),rB.resetCache(),eu.clear()}}class eE{constructor(e,t){this.reason=e,this.explanation=t}toMessage(){return this.explanation?`${this.reason}: ${this.explanation}`:this.reason}}let eI=[0,31,59,90,120,151,181,212,243,273,304,334],ek=[0,31,60,91,121,152,182,213,244,274,305,335];function ew(e,t){return new eE("unit out of range",`you specified ${t} (of type ${typeof t}) as a ${e}, which is invalid`)}function ej(e,t,r){let n=new Date(Date.UTC(e,t-1,r));e<100&&e>=0&&n.setUTCFullYear(n.getUTCFullYear()-1900);let a=n.getUTCDay();return 0===a?7:a}function ex(e,t){let r=eZ(e)?ek:eI,n=r.findIndex(e=>e<t),a=t-r[n];return{month:n+1,day:a}}function eT(e,t){return(e-t+7)%7+1}function eA(e,t=4,r=1){let{year:n,month:a,day:i}=e,s=i+(eZ(n)?ek:eI)[a-1],o=eT(ej(n,a,i),r),l=Math.floor((s-o+14-t)/7),d;return l<1?l=e1(d=n-1,t,r):l>e1(n,t,r)?(d=n+1,l=1):d=n,{weekYear:d,weekNumber:l,weekday:o,...e9(e)}}function eD(e,t=4,r=1){let{weekYear:n,weekNumber:a,weekday:i}=e,s=eT(ej(n,1,t),r),o=e$(n),l=7*a+i-s-7+t,d;l<1?l+=e$(d=n-1):l>o?(d=n+1,l-=e$(n)):d=n;let{month:c,day:u}=ex(d,l);return{year:d,month:c,day:u,...e9(e)}}function eC(e){let{year:t,month:r,day:n}=e,a=n+(eZ(t)?ek:eI)[r-1];return{year:t,ordinal:a,...e9(e)}}function eO(e){let{year:t,ordinal:r}=e,{month:n,day:a}=ex(t,r);return{year:t,month:n,day:a,...e9(e)}}function eR(e,t){if(!(!eN(e.localWeekday)||!eN(e.localWeekNumber)||!eN(e.localWeekYear)))return{minDaysInFirstWeek:4,startOfWeek:1};if(!eN(e.weekday)||!eN(e.weekNumber)||!eN(e.weekYear))throw new o("Cannot mix locale-based week fields with ISO-based week fields");return eN(e.localWeekday)||(e.weekday=e.localWeekday),eN(e.localWeekNumber)||(e.weekNumber=e.localWeekNumber),eN(e.localWeekYear)||(e.weekYear=e.localWeekYear),delete e.localWeekday,delete e.localWeekNumber,delete e.localWeekYear,{minDaysInFirstWeek:t.getMinDaysInFirstWeek(),startOfWeek:t.getStartOfWeek()}}function eM(e){let t=eL(e.year),r=eY(e.month,1,12),n=eY(e.day,1,eH(e.year,e.month));return t?r?!n&&ew("day",e.day):ew("month",e.month):ew("year",e.year)}function eP(e){let{hour:t,minute:r,second:n,millisecond:a}=e,i=eY(t,0,23)||24===t&&0===r&&0===n&&0===a,s=eY(r,0,59),o=eY(n,0,59),l=eY(a,0,999);return i?s?o?!l&&ew("millisecond",a):ew("second",n):ew("minute",r):ew("hour",t)}function eN(e){return void 0===e}function eJ(e){return"number"==typeof e}function eL(e){return"number"==typeof e&&e%1==0}function eF(){try{return"undefined"!=typeof Intl&&!!Intl.RelativeTimeFormat}catch(e){return!1}}function e_(){try{return"undefined"!=typeof Intl&&!!Intl.Locale&&("weekInfo"in Intl.Locale.prototype||"getWeekInfo"in Intl.Locale.prototype)}catch(e){return!1}}function eV(e,t,r){if(0!==e.length)return e.reduce((e,n)=>{let a=[t(n),n];return e&&r(e[0],a[0])===e[0]?e:a},null)[1]}function eG(e,t){return Object.prototype.hasOwnProperty.call(e,t)}function eq(e){if(null==e)return null;if("object"!=typeof e)throw new d("Week settings must be an object");if(!eY(e.firstDay,1,7)||!eY(e.minimalDays,1,7)||!Array.isArray(e.weekend)||e.weekend.some(e=>!eY(e,1,7)))throw new d("Invalid week settings");return{firstDay:e.firstDay,minimalDays:e.minimalDays,weekend:Array.from(e.weekend)}}function eY(e,t,r){return eL(e)&&e>=t&&e<=r}function eB(e,t=2){return e<0?"-"+(""+-e).padStart(t,"0"):(""+e).padStart(t,"0")}function ez(e){if(!eN(e)&&null!==e&&""!==e)return parseInt(e,10)}function eW(e){if(!eN(e)&&null!==e&&""!==e)return parseFloat(e)}function eU(e){if(!eN(e)&&null!==e&&""!==e)return Math.floor(1e3*parseFloat("0."+e))}function eQ(e,t,r=!1){let n=10**t;return(r?Math.trunc:Math.round)(e*n)/n}function eZ(e){return e%4==0&&(e%100!=0||e%400==0)}function e$(e){return eZ(e)?366:365}function eH(e,t){var r;let n=(r=t-1)-12*Math.floor(r/12)+1;return 2===n?eZ(e+(t-n)/12)?29:28:[31,null,31,30,31,30,31,31,30,31,30,31][n-1]}function eX(e){let t=Date.UTC(e.year,e.month-1,e.day,e.hour,e.minute,e.second,e.millisecond);return e.year<100&&e.year>=0&&(t=new Date(t)).setUTCFullYear(e.year,e.month-1,e.day),+t}function e0(e,t,r){return-eT(ej(e,1,t),r)+t-1}function e1(e,t=4,r=1){let n=e0(e,t,r),a=e0(e+1,t,r);return(e$(e)-n+a)/7}function e2(e){return e>99?e:e>eS.twoDigitCutoffYear?1900+e:2e3+e}function e3(e,t,r,n=null){let a=new Date(e),i={hourCycle:"h23",year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"};n&&(i.timeZone=n);let s={timeZoneName:t,...i},o=new Intl.DateTimeFormat(r,s).formatToParts(a).find(e=>"timezonename"===e.type.toLowerCase());return o?o.value:null}function e6(e,t){let r=parseInt(e,10);Number.isNaN(r)&&(r=0);let n=parseInt(t,10)||0,a=r<0||Object.is(r,-0)?-n:n;return 60*r+a}function e4(e){let t=Number(e);if("boolean"==typeof e||""===e||Number.isNaN(t))throw new d(`Invalid unit value ${e}`);return t}function e5(e,t){let r={};for(let n in e)if(eG(e,n)){let a=e[n];if(null==a)continue;r[t(n)]=e4(a)}return r}function e8(e,t){let r=Math.trunc(Math.abs(e/60)),n=Math.trunc(Math.abs(e%60)),a=e>=0?"+":"-";switch(t){case"short":return`${a}${eB(r,2)}:${eB(n,2)}`;case"narrow":return`${a}${r}${n>0?`:${n}`:""}`;case"techie":return`${a}${eB(r,2)}${eB(n,2)}`;default:throw RangeError(`Value format ${t} is out of range for property format`)}}function e9(e){return["hour","minute","second","millisecond"].reduce((t,r)=>(t[r]=e[r],t),{})}let e7=["January","February","March","April","May","June","July","August","September","October","November","December"],te=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],tt=["J","F","M","A","M","J","J","A","S","O","N","D"];function tr(e){switch(e){case"narrow":return[...tt];case"short":return[...te];case"long":return[...e7];case"numeric":return["1","2","3","4","5","6","7","8","9","10","11","12"];case"2-digit":return["01","02","03","04","05","06","07","08","09","10","11","12"];default:return null}}let tn=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],ta=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],ti=["M","T","W","T","F","S","S"];function ts(e){switch(e){case"narrow":return[...ti];case"short":return[...ta];case"long":return[...tn];case"numeric":return["1","2","3","4","5","6","7"];default:return null}}let to=["AM","PM"],tl=["Before Christ","Anno Domini"],td=["BC","AD"],tc=["B","A"];function tu(e){switch(e){case"narrow":return[...tc];case"short":return[...td];case"long":return[...tl];default:return null}}function tp(e,t){let r="";for(let n of e)n.literal?r+=n.val:r+=t(n.val);return r}let ty={D:h,DD:m,DDD:b,DDDD:g,t:K,tt:v,ttt:S,tttt:E,T:I,TT:k,TTT:w,TTTT:j,f:x,ff:A,fff:O,ffff:M,F:T,FF:D,FFF:R,FFFF:P};class th{static create(e,t={}){return new th(e,t)}static parseFormat(e){let t=null,r="",n=!1,a=[];for(let i=0;i<e.length;i++){let s=e.charAt(i);"'"===s?(r.length>0&&a.push({literal:n||/^\s+$/.test(r),val:r}),t=null,r="",n=!n):n?r+=s:s===t?r+=s:(r.length>0&&a.push({literal:/^\s+$/.test(r),val:r}),r=s,t=s)}return r.length>0&&a.push({literal:n||/^\s+$/.test(r),val:r}),a}static macroTokenToFormatOpts(e){return ty[e]}constructor(e,t){this.opts=t,this.loc=e,this.systemLoc=null}formatWithSystemDefault(e,t){return null===this.systemLoc&&(this.systemLoc=this.loc.redefaultToSystem()),this.systemLoc.dtFormatter(e,{...this.opts,...t}).format()}dtFormatter(e,t={}){return this.loc.dtFormatter(e,{...this.opts,...t})}formatDateTime(e,t){return this.dtFormatter(e,t).format()}formatDateTimeParts(e,t){return this.dtFormatter(e,t).formatToParts()}formatInterval(e,t){return this.dtFormatter(e.start,t).dtf.formatRange(e.start.toJSDate(),e.end.toJSDate())}resolvedOptions(e,t){return this.dtFormatter(e,t).resolvedOptions()}num(e,t=0){if(this.opts.forceSimple)return eB(e,t);let r={...this.opts};return t>0&&(r.padTo=t),this.loc.numberFormatter(r).format(e)}formatDateTimeFromString(e,t){let r="en"===this.loc.listingMode(),n=this.loc.outputCalendar&&"gregory"!==this.loc.outputCalendar,a=(t,r)=>this.loc.extract(e,t,r),i=t=>e.isOffsetFixed&&0===e.offset&&t.allowZ?"Z":e.isValid?e.zone.formatOffset(e.ts,t.format):"",s=()=>r?to[e.hour<12?0:1]:a({hour:"numeric",hourCycle:"h12"},"dayperiod"),o=(t,n)=>r?tr(t)[e.month-1]:a(n?{month:t}:{month:t,day:"numeric"},"month"),l=(t,n)=>r?ts(t)[e.weekday-1]:a(n?{weekday:t}:{weekday:t,month:"long",day:"numeric"},"weekday"),d=t=>{let r=th.macroTokenToFormatOpts(t);return r?this.formatWithSystemDefault(e,r):t},c=t=>r?tu(t)[e.year<0?0:1]:a({era:t},"era");return tp(th.parseFormat(t),t=>{switch(t){case"S":return this.num(e.millisecond);case"u":case"SSS":return this.num(e.millisecond,3);case"s":return this.num(e.second);case"ss":return this.num(e.second,2);case"uu":return this.num(Math.floor(e.millisecond/10),2);case"uuu":return this.num(Math.floor(e.millisecond/100));case"m":return this.num(e.minute);case"mm":return this.num(e.minute,2);case"h":return this.num(e.hour%12==0?12:e.hour%12);case"hh":return this.num(e.hour%12==0?12:e.hour%12,2);case"H":return this.num(e.hour);case"HH":return this.num(e.hour,2);case"Z":return i({format:"narrow",allowZ:this.opts.allowZ});case"ZZ":return i({format:"short",allowZ:this.opts.allowZ});case"ZZZ":return i({format:"techie",allowZ:this.opts.allowZ});case"ZZZZ":return e.zone.offsetName(e.ts,{format:"short",locale:this.loc.locale});case"ZZZZZ":return e.zone.offsetName(e.ts,{format:"long",locale:this.loc.locale});case"z":return e.zoneName;case"a":return s();case"d":return n?a({day:"numeric"},"day"):this.num(e.day);case"dd":return n?a({day:"2-digit"},"day"):this.num(e.day,2);case"c":case"E":return this.num(e.weekday);case"ccc":return l("short",!0);case"cccc":return l("long",!0);case"ccccc":return l("narrow",!0);case"EEE":return l("short",!1);case"EEEE":return l("long",!1);case"EEEEE":return l("narrow",!1);case"L":return n?a({month:"numeric",day:"numeric"},"month"):this.num(e.month);case"LL":return n?a({month:"2-digit",day:"numeric"},"month"):this.num(e.month,2);case"LLL":return o("short",!0);case"LLLL":return o("long",!0);case"LLLLL":return o("narrow",!0);case"M":return n?a({month:"numeric"},"month"):this.num(e.month);case"MM":return n?a({month:"2-digit"},"month"):this.num(e.month,2);case"MMM":return o("short",!1);case"MMMM":return o("long",!1);case"MMMMM":return o("narrow",!1);case"y":return n?a({year:"numeric"},"year"):this.num(e.year);case"yy":return n?a({year:"2-digit"},"year"):this.num(e.year.toString().slice(-2),2);case"yyyy":return n?a({year:"numeric"},"year"):this.num(e.year,4);case"yyyyyy":return n?a({year:"numeric"},"year"):this.num(e.year,6);case"G":return c("short");case"GG":return c("long");case"GGGGG":return c("narrow");case"kk":return this.num(e.weekYear.toString().slice(-2),2);case"kkkk":return this.num(e.weekYear,4);case"W":return this.num(e.weekNumber);case"WW":return this.num(e.weekNumber,2);case"n":return this.num(e.localWeekNumber);case"nn":return this.num(e.localWeekNumber,2);case"ii":return this.num(e.localWeekYear.toString().slice(-2),2);case"iiii":return this.num(e.localWeekYear,4);case"o":return this.num(e.ordinal);case"ooo":return this.num(e.ordinal,3);case"q":return this.num(e.quarter);case"qq":return this.num(e.quarter,2);case"X":return this.num(Math.floor(e.ts/1e3));case"x":return this.num(e.ts);default:return d(t)}})}formatDurationFromString(e,t){let r;let n=e=>{switch(e[0]){case"S":return"millisecond";case"s":return"second";case"m":return"minute";case"h":return"hour";case"d":return"day";case"w":return"week";case"M":return"month";case"y":return"year";default:return null}},a=th.parseFormat(t),i=a.reduce((e,{literal:t,val:r})=>t?e:e.concat(r),[]);return tp(a,(r=e.shiftTo(...i.map(n).filter(e=>e)),e=>{let t=n(e);return t?this.num(r.get(t),e.length):e}))}}let tm=/[A-Za-z_+-]{1,256}(?::?\/[A-Za-z0-9_+-]{1,256}(?:\/[A-Za-z0-9_+-]{1,256})?)?/;function tf(...e){let t=e.reduce((e,t)=>e+t.source,"");return RegExp(`^${t}$`)}function tb(...e){return t=>e.reduce(([e,r,n],a)=>{let[i,s,o]=a(t,n);return[{...e,...i},s||r,o]},[{},null,1]).slice(0,2)}function tg(e,...t){if(null==e)return[null,null];for(let[r,n]of t){let t=r.exec(e);if(t)return n(t)}return[null,null]}function tK(...e){return(t,r)=>{let n;let a={};for(n=0;n<e.length;n++)a[e[n]]=ez(t[r+n]);return[a,null,r+n]}}let tv=/(?:(Z)|([+-]\d\d)(?::?(\d\d))?)/,tS=`(?:${tv.source}?(?:\\[(${tm.source})\\])?)?`,tE=/(\d\d)(?::?(\d\d)(?::?(\d\d)(?:[.,](\d{1,30}))?)?)?/,tI=RegExp(`${tE.source}${tS}`),tk=RegExp(`(?:T${tI.source})?`),tw=tK("weekYear","weekNumber","weekDay"),tj=tK("year","ordinal"),tx=RegExp(`${tE.source} ?(?:${tv.source}|(${tm.source}))?`),tT=RegExp(`(?: ${tx.source})?`);function tA(e,t,r){let n=e[t];return eN(n)?r:ez(n)}function tD(e,t){return[{hours:tA(e,t,0),minutes:tA(e,t+1,0),seconds:tA(e,t+2,0),milliseconds:eU(e[t+3])},null,t+4]}function tC(e,t){let r=!e[t]&&!e[t+1],n=e6(e[t+1],e[t+2]);return[{},r?null:ei.instance(n),t+3]}function tO(e,t){return[{},e[t]?G.create(e[t]):null,t+1]}let tR=RegExp(`^T?${tE.source}$`),tM=/^-?P(?:(?:(-?\d{1,20}(?:\.\d{1,20})?)Y)?(?:(-?\d{1,20}(?:\.\d{1,20})?)M)?(?:(-?\d{1,20}(?:\.\d{1,20})?)W)?(?:(-?\d{1,20}(?:\.\d{1,20})?)D)?(?:T(?:(-?\d{1,20}(?:\.\d{1,20})?)H)?(?:(-?\d{1,20}(?:\.\d{1,20})?)M)?(?:(-?\d{1,20})(?:[.,](-?\d{1,20}))?S)?)?)$/;function tP(e){let[t,r,n,a,i,s,o,l,d]=e,c="-"===t[0],u=l&&"-"===l[0],p=(e,t=!1)=>void 0!==e&&(t||e&&c)?-e:e;return[{years:p(eW(r)),months:p(eW(n)),weeks:p(eW(a)),days:p(eW(i)),hours:p(eW(s)),minutes:p(eW(o)),seconds:p(eW(l),"-0"===l),milliseconds:p(eU(d),u)}]}let tN={GMT:0,EDT:-240,EST:-300,CDT:-300,CST:-360,MDT:-360,MST:-420,PDT:-420,PST:-480};function tJ(e,t,r,n,a,i,s){let o={year:2===t.length?e2(ez(t)):ez(t),month:te.indexOf(r)+1,day:ez(n),hour:ez(a),minute:ez(i)};return s&&(o.second=ez(s)),e&&(o.weekday=e.length>3?tn.indexOf(e)+1:ta.indexOf(e)+1),o}let tL=/^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|(?:([+-]\d\d)(\d\d)))$/;function tF(e){let[,t,r,n,a,i,s,o,l,d,c,u]=e;return[tJ(t,a,n,r,i,s,o),new ei(l?tN[l]:d?0:e6(c,u))]}let t_=/^(Mon|Tue|Wed|Thu|Fri|Sat|Sun), (\d\d) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{4}) (\d\d):(\d\d):(\d\d) GMT$/,tV=/^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday), (\d\d)-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-(\d\d) (\d\d):(\d\d):(\d\d) GMT$/,tG=/^(Mon|Tue|Wed|Thu|Fri|Sat|Sun) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) ( \d|\d\d) (\d\d):(\d\d):(\d\d) (\d{4})$/;function tq(e){let[,t,r,n,a,i,s,o]=e;return[tJ(t,a,n,r,i,s,o),ei.utcInstance]}function tY(e){let[,t,r,n,a,i,s,o]=e;return[tJ(t,o,r,n,a,i,s),ei.utcInstance]}let tB=tf(/([+-]\d{6}|\d{4})(?:-?(\d\d)(?:-?(\d\d))?)?/,tk),tz=tf(/(\d{4})-?W(\d\d)(?:-?(\d))?/,tk),tW=tf(/(\d{4})-?(\d{3})/,tk),tU=tf(tI),tQ=tb(function(e,t){return[{year:tA(e,t),month:tA(e,t+1,1),day:tA(e,t+2,1)},null,t+3]},tD,tC,tO),tZ=tb(tw,tD,tC,tO),t$=tb(tj,tD,tC,tO),tH=tb(tD,tC,tO),tX=tb(tD),t0=tf(/(\d{4})-(\d\d)-(\d\d)/,tT),t1=tf(tx),t2=tb(tD,tC,tO),t3="Invalid Duration",t6={weeks:{days:7,hours:168,minutes:10080,seconds:604800,milliseconds:6048e5},days:{hours:24,minutes:1440,seconds:86400,milliseconds:864e5},hours:{minutes:60,seconds:3600,milliseconds:36e5},minutes:{seconds:60,milliseconds:6e4},seconds:{milliseconds:1e3}},t4={years:{quarters:4,months:12,weeks:52,days:365,hours:8760,minutes:525600,seconds:31536e3,milliseconds:31536e6},quarters:{months:3,weeks:13,days:91,hours:2184,minutes:131040,seconds:7862400,milliseconds:78624e5},months:{weeks:4,days:30,hours:720,minutes:43200,seconds:2592e3,milliseconds:2592e6},...t6},t5={years:{quarters:4,months:12,weeks:52.1775,days:365.2425,hours:8765.82,minutes:525949.2,seconds:31556952,milliseconds:31556952e3},quarters:{months:3,weeks:13.044375,days:91.310625,hours:2191.455,minutes:131487.3,seconds:7889238,milliseconds:7889238e3},months:{weeks:30.436875/7,days:30.436875,hours:730.485,minutes:43829.1,seconds:2629746,milliseconds:2629746e3},...t6},t8=["years","quarters","months","weeks","days","hours","minutes","seconds","milliseconds"],t9=t8.slice(0).reverse();function t7(e,t,r=!1){return new rr({values:r?t.values:{...e.values,...t.values||{}},loc:e.loc.clone(t.loc),conversionAccuracy:t.conversionAccuracy||e.conversionAccuracy,matrix:t.matrix||e.matrix})}function re(e,t){var r;let n=null!=(r=t.milliseconds)?r:0;for(let r of t9.slice(1))t[r]&&(n+=t[r]*e[r].milliseconds);return n}function rt(e,t){let r=0>re(e,t)?-1:1;t8.reduceRight((n,a)=>{if(eN(t[a]))return n;if(n){let i=t[n]*r,s=e[a][n],o=Math.floor(i/s);t[a]+=o*r,t[n]-=o*s*r}return a},null),t8.reduce((r,n)=>{if(eN(t[n]))return r;if(r){let a=t[r]%1;t[r]-=a,t[n]+=a*e[r][n]}return n},null)}class rr{constructor(e){let t="longterm"===e.conversionAccuracy,r=t?t5:t4;e.matrix&&(r=e.matrix),this.values=e.values,this.loc=e.loc||en.create(),this.conversionAccuracy=t?"longterm":"casual",this.invalid=e.invalid||null,this.matrix=r,this.isLuxonDuration=!0}static fromMillis(e,t){return rr.fromObject({milliseconds:e},t)}static fromObject(e,t={}){if(null==e||"object"!=typeof e)throw new d(`Duration.fromObject: argument expected to be an object, got ${null===e?"null":typeof e}`);return new rr({values:e5(e,rr.normalizeUnit),loc:en.fromObject(t),conversionAccuracy:t.conversionAccuracy,matrix:t.matrix})}static fromDurationLike(e){if(eJ(e))return rr.fromMillis(e);if(rr.isDuration(e))return e;if("object"==typeof e)return rr.fromObject(e);throw new d(`Unknown duration argument ${e} of type ${typeof e}`)}static fromISO(e,t){let[r]=tg(e,[tM,tP]);return r?rr.fromObject(r,t):rr.invalid("unparsable",`the input "${e}" can't be parsed as ISO 8601`)}static fromISOTime(e,t){let[r]=tg(e,[tR,tX]);return r?rr.fromObject(r,t):rr.invalid("unparsable",`the input "${e}" can't be parsed as ISO 8601`)}static invalid(e,t=null){if(!e)throw new d("need to specify a reason the Duration is invalid");let r=e instanceof eE?e:new eE(e,t);if(!eS.throwOnInvalid)return new rr({invalid:r});throw new s(r)}static normalizeUnit(e){let t={year:"years",years:"years",quarter:"quarters",quarters:"quarters",month:"months",months:"months",week:"weeks",weeks:"weeks",day:"days",days:"days",hour:"hours",hours:"hours",minute:"minutes",minutes:"minutes",second:"seconds",seconds:"seconds",millisecond:"milliseconds",milliseconds:"milliseconds"}[e?e.toLowerCase():e];if(!t)throw new l(e);return t}static isDuration(e){return e&&e.isLuxonDuration||!1}get locale(){return this.isValid?this.loc.locale:null}get numberingSystem(){return this.isValid?this.loc.numberingSystem:null}toFormat(e,t={}){let r={...t,floor:!1!==t.round&&!1!==t.floor};return this.isValid?th.create(this.loc,r).formatDurationFromString(this,e):t3}toHuman(e={}){if(!this.isValid)return t3;let t=t8.map(t=>{let r=this.values[t];return eN(r)?null:this.loc.numberFormatter({style:"unit",unitDisplay:"long",...e,unit:t.slice(0,-1)}).format(r)}).filter(e=>e);return this.loc.listFormatter({type:"conjunction",style:e.listStyle||"narrow",...e}).format(t)}toObject(){return this.isValid?{...this.values}:{}}toISO(){if(!this.isValid)return null;let e="P";return 0!==this.years&&(e+=this.years+"Y"),(0!==this.months||0!==this.quarters)&&(e+=this.months+3*this.quarters+"M"),0!==this.weeks&&(e+=this.weeks+"W"),0!==this.days&&(e+=this.days+"D"),(0!==this.hours||0!==this.minutes||0!==this.seconds||0!==this.milliseconds)&&(e+="T"),0!==this.hours&&(e+=this.hours+"H"),0!==this.minutes&&(e+=this.minutes+"M"),(0!==this.seconds||0!==this.milliseconds)&&(e+=eQ(this.seconds+this.milliseconds/1e3,3)+"S"),"P"===e&&(e+="T0S"),e}toISOTime(e={}){if(!this.isValid)return null;let t=this.toMillis();return t<0||t>=864e5?null:(e={suppressMilliseconds:!1,suppressSeconds:!1,includePrefix:!1,format:"extended",...e,includeOffset:!1},rB.fromMillis(t,{zone:"UTC"}).toISOTime(e))}toJSON(){return this.toISO()}toString(){return this.toISO()}[Symbol.for("nodejs.util.inspect.custom")](){return this.isValid?`Duration { values: ${JSON.stringify(this.values)} }`:`Duration { Invalid, reason: ${this.invalidReason} }`}toMillis(){return this.isValid?re(this.matrix,this.values):NaN}valueOf(){return this.toMillis()}plus(e){if(!this.isValid)return this;let t=rr.fromDurationLike(e),r={};for(let e of t8)(eG(t.values,e)||eG(this.values,e))&&(r[e]=t.get(e)+this.get(e));return t7(this,{values:r},!0)}minus(e){if(!this.isValid)return this;let t=rr.fromDurationLike(e);return this.plus(t.negate())}mapUnits(e){if(!this.isValid)return this;let t={};for(let r of Object.keys(this.values))t[r]=e4(e(this.values[r],r));return t7(this,{values:t},!0)}get(e){return this[rr.normalizeUnit(e)]}set(e){return this.isValid?t7(this,{values:{...this.values,...e5(e,rr.normalizeUnit)}}):this}reconfigure({locale:e,numberingSystem:t,conversionAccuracy:r,matrix:n}={}){return t7(this,{loc:this.loc.clone({locale:e,numberingSystem:t}),matrix:n,conversionAccuracy:r})}as(e){return this.isValid?this.shiftTo(e).get(e):NaN}normalize(){if(!this.isValid)return this;let e=this.toObject();return rt(this.matrix,e),t7(this,{values:e},!0)}rescale(){return this.isValid?t7(this,{values:function(e){let t={};for(let[r,n]of Object.entries(e))0!==n&&(t[r]=n);return t}(this.normalize().shiftToAll().toObject())},!0):this}shiftTo(...e){let t;if(!this.isValid||0===e.length)return this;e=e.map(e=>rr.normalizeUnit(e));let r={},n={},a=this.toObject();for(let i of t8)if(e.indexOf(i)>=0){t=i;let e=0;for(let t in n)e+=this.matrix[t][i]*n[t],n[t]=0;eJ(a[i])&&(e+=a[i]);let s=Math.trunc(e);r[i]=s,n[i]=(1e3*e-1e3*s)/1e3}else eJ(a[i])&&(n[i]=a[i]);for(let e in n)0!==n[e]&&(r[t]+=e===t?n[e]:n[e]/this.matrix[t][e]);return rt(this.matrix,r),t7(this,{values:r},!0)}shiftToAll(){return this.isValid?this.shiftTo("years","months","weeks","days","hours","minutes","seconds","milliseconds"):this}negate(){if(!this.isValid)return this;let e={};for(let t of Object.keys(this.values))e[t]=0===this.values[t]?0:-this.values[t];return t7(this,{values:e},!0)}get years(){return this.isValid?this.values.years||0:NaN}get quarters(){return this.isValid?this.values.quarters||0:NaN}get months(){return this.isValid?this.values.months||0:NaN}get weeks(){return this.isValid?this.values.weeks||0:NaN}get days(){return this.isValid?this.values.days||0:NaN}get hours(){return this.isValid?this.values.hours||0:NaN}get minutes(){return this.isValid?this.values.minutes||0:NaN}get seconds(){return this.isValid?this.values.seconds||0:NaN}get milliseconds(){return this.isValid?this.values.milliseconds||0:NaN}get isValid(){return null===this.invalid}get invalidReason(){return this.invalid?this.invalid.reason:null}get invalidExplanation(){return this.invalid?this.invalid.explanation:null}equals(e){if(!this.isValid||!e.isValid||!this.loc.equals(e.loc))return!1;for(let n of t8){var t,r;if(t=this.values[n],r=e.values[n],void 0===t||0===t?void 0!==r&&0!==r:t!==r)return!1}return!0}}let rn="Invalid Interval";class ra{constructor(e){this.s=e.start,this.e=e.end,this.invalid=e.invalid||null,this.isLuxonInterval=!0}static invalid(e,t=null){if(!e)throw new d("need to specify a reason the Interval is invalid");let r=e instanceof eE?e:new eE(e,t);if(!eS.throwOnInvalid)return new ra({invalid:r});throw new i(r)}static fromDateTimes(e,t){let r=rz(e),n=rz(t),a=r&&r.isValid?n&&n.isValid?n<r?ra.invalid("end before start",`The end of an interval must be after its start, but you had start=${r.toISO()} and end=${n.toISO()}`):null:ra.invalid("missing or invalid end"):ra.invalid("missing or invalid start");return null==a?new ra({start:r,end:n}):a}static after(e,t){let r=rr.fromDurationLike(t),n=rz(e);return ra.fromDateTimes(n,n.plus(r))}static before(e,t){let r=rr.fromDurationLike(t),n=rz(e);return ra.fromDateTimes(n.minus(r),n)}static fromISO(e,t){let[r,n]=(e||"").split("/",2);if(r&&n){let e,a,i,s;try{a=(e=rB.fromISO(r,t)).isValid}catch(e){a=!1}try{s=(i=rB.fromISO(n,t)).isValid}catch(e){s=!1}if(a&&s)return ra.fromDateTimes(e,i);if(a){let r=rr.fromISO(n,t);if(r.isValid)return ra.after(e,r)}else if(s){let e=rr.fromISO(r,t);if(e.isValid)return ra.before(i,e)}}return ra.invalid("unparsable",`the input "${e}" can't be parsed as ISO 8601`)}static isInterval(e){return e&&e.isLuxonInterval||!1}get start(){return this.isValid?this.s:null}get end(){return this.isValid?this.e:null}get lastDateTime(){return this.isValid&&this.e?this.e.minus(1):null}get isValid(){return null===this.invalidReason}get invalidReason(){return this.invalid?this.invalid.reason:null}get invalidExplanation(){return this.invalid?this.invalid.explanation:null}length(e="milliseconds"){return this.isValid?this.toDuration(e).get(e):NaN}count(e="milliseconds",t){let r;if(!this.isValid)return NaN;let n=this.start.startOf(e,t);return Math.floor((r=(r=null!=t&&t.useLocaleWeeks?this.end.reconfigure({locale:n.locale}):this.end).startOf(e,t)).diff(n,e).get(e))+(r.valueOf()!==this.end.valueOf())}hasSame(e){return!!this.isValid&&(this.isEmpty()||this.e.minus(1).hasSame(this.s,e))}isEmpty(){return this.s.valueOf()===this.e.valueOf()}isAfter(e){return!!this.isValid&&this.s>e}isBefore(e){return!!this.isValid&&this.e<=e}contains(e){return!!this.isValid&&this.s<=e&&this.e>e}set({start:e,end:t}={}){return this.isValid?ra.fromDateTimes(e||this.s,t||this.e):this}splitAt(...e){if(!this.isValid)return[];let t=e.map(rz).filter(e=>this.contains(e)).sort((e,t)=>e.toMillis()-t.toMillis()),r=[],{s:n}=this,a=0;for(;n<this.e;){let e=t[a]||this.e,i=+e>+this.e?this.e:e;r.push(ra.fromDateTimes(n,i)),n=i,a+=1}return r}splitBy(e){let t=rr.fromDurationLike(e);if(!this.isValid||!t.isValid||0===t.as("milliseconds"))return[];let{s:r}=this,n=1,a,i=[];for(;r<this.e;){let e=this.start.plus(t.mapUnits(e=>e*n));a=+e>+this.e?this.e:e,i.push(ra.fromDateTimes(r,a)),r=a,n+=1}return i}divideEqually(e){return this.isValid?this.splitBy(this.length()/e).slice(0,e):[]}overlaps(e){return this.e>e.s&&this.s<e.e}abutsStart(e){return!!this.isValid&&+this.e==+e.s}abutsEnd(e){return!!this.isValid&&+e.e==+this.s}engulfs(e){return!!this.isValid&&this.s<=e.s&&this.e>=e.e}equals(e){return!!this.isValid&&!!e.isValid&&this.s.equals(e.s)&&this.e.equals(e.e)}intersection(e){if(!this.isValid)return this;let t=this.s>e.s?this.s:e.s,r=this.e<e.e?this.e:e.e;return t>=r?null:ra.fromDateTimes(t,r)}union(e){if(!this.isValid)return this;let t=this.s<e.s?this.s:e.s,r=this.e>e.e?this.e:e.e;return ra.fromDateTimes(t,r)}static merge(e){let[t,r]=e.sort((e,t)=>e.s-t.s).reduce(([e,t],r)=>t?t.overlaps(r)||t.abutsStart(r)?[e,t.union(r)]:[e.concat([t]),r]:[e,r],[[],null]);return r&&t.push(r),t}static xor(e){let t=null,r=0,n=[],a=e.map(e=>[{time:e.s,type:"s"},{time:e.e,type:"e"}]);for(let e of Array.prototype.concat(...a).sort((e,t)=>e.time-t.time))1===(r+="s"===e.type?1:-1)?t=e.time:(t&&+t!=+e.time&&n.push(ra.fromDateTimes(t,e.time)),t=null);return ra.merge(n)}difference(...e){return ra.xor([this].concat(e)).map(e=>this.intersection(e)).filter(e=>e&&!e.isEmpty())}toString(){return this.isValid?`[${this.s.toISO()} – ${this.e.toISO()})`:rn}[Symbol.for("nodejs.util.inspect.custom")](){return this.isValid?`Interval { start: ${this.s.toISO()}, end: ${this.e.toISO()} }`:`Interval { Invalid, reason: ${this.invalidReason} }`}toLocaleString(e=h,t={}){return this.isValid?th.create(this.s.loc.clone(t),e).formatInterval(this):rn}toISO(e){return this.isValid?`${this.s.toISO(e)}/${this.e.toISO(e)}`:rn}toISODate(){return this.isValid?`${this.s.toISODate()}/${this.e.toISODate()}`:rn}toISOTime(e){return this.isValid?`${this.s.toISOTime(e)}/${this.e.toISOTime(e)}`:rn}toFormat(e,{separator:t=" – "}={}){return this.isValid?`${this.s.toFormat(e)}${t}${this.e.toFormat(e)}`:rn}toDuration(e,t){return this.isValid?this.e.diff(this.s,e,t):rr.invalid(this.invalidReason)}mapEndpoints(e){return ra.fromDateTimes(e(this.s),e(this.e))}}class ri{static hasDST(e=eS.defaultZone){let t=rB.now().setZone(e).set({month:12});return!e.isUniversal&&t.offset!==t.set({month:6}).offset}static isValidIANAZone(e){return G.isValidZone(e)}static normalizeZone(e){return eo(e,eS.defaultZone)}static getStartOfWeek({locale:e=null,locObj:t=null}={}){return(t||en.create(e)).getStartOfWeek()}static getMinimumDaysInFirstWeek({locale:e=null,locObj:t=null}={}){return(t||en.create(e)).getMinDaysInFirstWeek()}static getWeekendWeekdays({locale:e=null,locObj:t=null}={}){return(t||en.create(e)).getWeekendDays().slice()}static months(e="long",{locale:t=null,numberingSystem:r=null,locObj:n=null,outputCalendar:a="gregory"}={}){return(n||en.create(t,r,a)).months(e)}static monthsFormat(e="long",{locale:t=null,numberingSystem:r=null,locObj:n=null,outputCalendar:a="gregory"}={}){return(n||en.create(t,r,a)).months(e,!0)}static weekdays(e="long",{locale:t=null,numberingSystem:r=null,locObj:n=null}={}){return(n||en.create(t,r,null)).weekdays(e)}static weekdaysFormat(e="long",{locale:t=null,numberingSystem:r=null,locObj:n=null}={}){return(n||en.create(t,r,null)).weekdays(e,!0)}static meridiems({locale:e=null}={}){return en.create(e).meridiems()}static eras(e="short",{locale:t=null}={}){return en.create(t,null,"gregory").eras(e)}static features(){return{relative:eF(),localeWeek:e_()}}}function rs(e,t){let r=e=>e.toUTC(0,{keepLocalTime:!0}).startOf("day").valueOf(),n=r(t)-r(e);return Math.floor(rr.fromMillis(n).as("days"))}function ro(e,t=e=>e){return{regex:e,deser:([e])=>t(function(e){let t=parseInt(e,10);if(!isNaN(t))return t;t="";for(let r=0;r<e.length;r++){let n=e.charCodeAt(r);if(-1!==e[r].search(el.hanidec))t+=ec.indexOf(e[r]);else for(let e in ed){let[r,a]=ed[e];n>=r&&n<=a&&(t+=n-r)}}return parseInt(t,10)}(e))}}let rl=String.fromCharCode(160),rd=`[ ${rl}]`,rc=RegExp(rd,"g");function ru(e){return e.replace(/\./g,"\\.?").replace(rc,rd)}function rp(e){return e.replace(/\./g,"").replace(rc," ").toLowerCase()}function ry(e,t){return null===e?null:{regex:RegExp(e.map(ru).join("|")),deser:([r])=>e.findIndex(e=>rp(r)===rp(e))+t}}function rh(e,t){return{regex:e,deser:([,e,t])=>e6(e,t),groups:t}}function rm(e){return{regex:e,deser:([e])=>e}}let rf={year:{"2-digit":"yy",numeric:"yyyyy"},month:{numeric:"M","2-digit":"MM",short:"MMM",long:"MMMM"},day:{numeric:"d","2-digit":"dd"},weekday:{short:"EEE",long:"EEEE"},dayperiod:"a",dayPeriod:"a",hour12:{numeric:"h","2-digit":"hh"},hour24:{numeric:"H","2-digit":"HH"},minute:{numeric:"m","2-digit":"mm"},second:{numeric:"s","2-digit":"ss"},timeZoneName:{long:"ZZZZZ",short:"ZZZ"}},rb=null;function rg(e,t){return Array.prototype.concat(...e.map(e=>(function(e,t){if(e.literal)return e;let r=rS(th.macroTokenToFormatOpts(e.val),t);return null==r||r.includes(void 0)?e:r})(e,t)))}class rK{constructor(e,t){if(this.locale=e,this.format=t,this.tokens=rg(th.parseFormat(t),e),this.units=this.tokens.map(t=>(function(e,t){let r=ep(t),n=ep(t,"{2}"),a=ep(t,"{3}"),i=ep(t,"{4}"),s=ep(t,"{6}"),o=ep(t,"{1,2}"),l=ep(t,"{1,3}"),d=ep(t,"{1,6}"),c=ep(t,"{1,9}"),u=ep(t,"{2,4}"),p=ep(t,"{4,6}"),y=e=>({regex:RegExp(e.val.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")),deser:([e])=>e,literal:!0}),h=(h=>{if(e.literal)return y(h);switch(h.val){case"G":return ry(t.eras("short"),0);case"GG":return ry(t.eras("long"),0);case"y":return ro(d);case"yy":case"kk":return ro(u,e2);case"yyyy":case"kkkk":return ro(i);case"yyyyy":return ro(p);case"yyyyyy":return ro(s);case"M":case"L":case"d":case"H":case"h":case"m":case"q":case"s":case"W":return ro(o);case"MM":case"LL":case"dd":case"HH":case"hh":case"mm":case"qq":case"ss":case"WW":return ro(n);case"MMM":return ry(t.months("short",!0),1);case"MMMM":return ry(t.months("long",!0),1);case"LLL":return ry(t.months("short",!1),1);case"LLLL":return ry(t.months("long",!1),1);case"o":case"S":return ro(l);case"ooo":case"SSS":return ro(a);case"u":return rm(c);case"uu":return rm(o);case"uuu":case"E":case"c":return ro(r);case"a":return ry(t.meridiems(),0);case"EEE":return ry(t.weekdays("short",!1),1);case"EEEE":return ry(t.weekdays("long",!1),1);case"ccc":return ry(t.weekdays("short",!0),1);case"cccc":return ry(t.weekdays("long",!0),1);case"Z":case"ZZ":return rh(RegExp(`([+-]${o.source})(?::(${n.source}))?`),2);case"ZZZ":return rh(RegExp(`([+-]${o.source})(${n.source})?`),2);case"z":return rm(/[a-z_+-/]{1,256}?/i);case" ":return rm(/[^\S\n\r]/);default:return y(h)}})(e)||{invalidReason:"missing Intl.DateTimeFormat.formatToParts support"};return h.token=e,h})(t,e)),this.disqualifyingUnit=this.units.find(e=>e.invalidReason),!this.disqualifyingUnit){let[e,t]=function(e){let t=e.map(e=>e.regex).reduce((e,t)=>`${e}(${t.source})`,"");return[`^${t}$`,e]}(this.units);this.regex=RegExp(e,"i"),this.handlers=t}}explainFromTokens(e){if(!this.isValid)return{input:e,tokens:this.tokens,invalidReason:this.invalidReason};{let[t,r]=function(e,t,r){let n=e.match(t);if(!n)return[n,{}];{let e={},t=1;for(let a in r)if(eG(r,a)){let i=r[a],s=i.groups?i.groups+1:1;!i.literal&&i.token&&(e[i.token.val[0]]=i.deser(n.slice(t,t+s))),t+=s}return[n,e]}}(e,this.regex,this.handlers),[n,a,i]=r?function(e){let t;let r=e=>{switch(e){case"S":return"millisecond";case"s":return"second";case"m":return"minute";case"h":case"H":return"hour";case"d":return"day";case"o":return"ordinal";case"L":case"M":return"month";case"y":return"year";case"E":case"c":return"weekday";case"W":return"weekNumber";case"k":return"weekYear";case"q":return"quarter";default:return null}},n=null;return eN(e.z)||(n=G.create(e.z)),eN(e.Z)||(n||(n=new ei(e.Z)),t=e.Z),eN(e.q)||(e.M=(e.q-1)*3+1),eN(e.h)||(e.h<12&&1===e.a?e.h+=12:12!==e.h||0!==e.a||(e.h=0)),0===e.G&&e.y&&(e.y=-e.y),eN(e.u)||(e.S=eU(e.u)),[Object.keys(e).reduce((t,n)=>{let a=r(n);return a&&(t[a]=e[n]),t},{}),n,t]}(r):[null,null,void 0];if(eG(r,"a")&&eG(r,"H"))throw new o("Can't include meridiem when specifying 24-hour format");return{input:e,tokens:this.tokens,regex:this.regex,rawMatches:t,matches:r,result:n,zone:a,specificOffset:i}}}get isValid(){return!this.disqualifyingUnit}get invalidReason(){return this.disqualifyingUnit?this.disqualifyingUnit.invalidReason:null}}function rv(e,t,r){return new rK(e,r).explainFromTokens(t)}function rS(e,t){if(!e)return null;let r=th.create(t,e).dtFormatter((rb||(rb=rB.fromMillis(1555555555555)),rb)),n=r.formatToParts(),a=r.resolvedOptions();return n.map(t=>(function(e,t,r){let{type:n,value:a}=e;if("literal"===n){let e=/^\s+$/.test(a);return{literal:!e,val:e?" ":a}}let i=t[n],s=n;"hour"===n&&(s=null!=t.hour12?t.hour12?"hour12":"hour24":null!=t.hourCycle?"h11"===t.hourCycle||"h12"===t.hourCycle?"hour12":"hour24":r.hour12?"hour12":"hour24");let o=rf[s];if("object"==typeof o&&(o=o[i]),o)return{literal:!1,val:o}})(t,e,a))}let rE="Invalid DateTime";function rI(e){return new eE("unsupported zone",`the zone "${e.name}" is not supported`)}function rk(e){return null===e.weekData&&(e.weekData=eA(e.c)),e.weekData}function rw(e){return null===e.localWeekData&&(e.localWeekData=eA(e.c,e.loc.getMinDaysInFirstWeek(),e.loc.getStartOfWeek())),e.localWeekData}function rj(e,t){let r={ts:e.ts,zone:e.zone,c:e.c,o:e.o,loc:e.loc,invalid:e.invalid};return new rB({...r,...t,old:r})}function rx(e,t,r){let n=e-6e4*t,a=r.offset(n);if(t===a)return[n,t];n-=(a-t)*6e4;let i=r.offset(n);return a===i?[n,a]:[e-6e4*Math.min(a,i),Math.max(a,i)]}function rT(e,t){let r=new Date(e+=6e4*t);return{year:r.getUTCFullYear(),month:r.getUTCMonth()+1,day:r.getUTCDate(),hour:r.getUTCHours(),minute:r.getUTCMinutes(),second:r.getUTCSeconds(),millisecond:r.getUTCMilliseconds()}}function rA(e,t){let r=e.o,n=e.c.year+Math.trunc(t.years),a=e.c.month+Math.trunc(t.months)+3*Math.trunc(t.quarters),i={...e.c,year:n,month:a,day:Math.min(e.c.day,eH(n,a))+Math.trunc(t.days)+7*Math.trunc(t.weeks)},s=rr.fromObject({years:t.years-Math.trunc(t.years),quarters:t.quarters-Math.trunc(t.quarters),months:t.months-Math.trunc(t.months),weeks:t.weeks-Math.trunc(t.weeks),days:t.days-Math.trunc(t.days),hours:t.hours,minutes:t.minutes,seconds:t.seconds,milliseconds:t.milliseconds}).as("milliseconds"),[o,l]=rx(eX(i),r,e.zone);return 0!==s&&(o+=s,l=e.zone.offset(o)),{ts:o,o:l}}function rD(e,t,r,n,a,i){let{setZone:s,zone:o}=r;if((!e||0===Object.keys(e).length)&&!t)return rB.invalid(new eE("unparsable",`the input "${a}" can't be parsed as ${n}`));{let n=rB.fromObject(e,{...r,zone:t||o,specificOffset:i});return s?n:n.setZone(o)}}function rC(e,t,r=!0){return e.isValid?th.create(en.create("en-US"),{allowZ:r,forceSimple:!0}).formatDateTimeFromString(e,t):null}function rO(e,t){let r=e.c.year>9999||e.c.year<0,n="";return r&&e.c.year>=0&&(n+="+"),n+=eB(e.c.year,r?6:4),t?n+="-"+eB(e.c.month)+"-"+eB(e.c.day):n+=eB(e.c.month)+eB(e.c.day),n}function rR(e,t,r,n,a,i){let s=eB(e.c.hour);return t?(s+=":"+eB(e.c.minute),0===e.c.millisecond&&0===e.c.second&&r||(s+=":")):s+=eB(e.c.minute),0===e.c.millisecond&&0===e.c.second&&r||(s+=eB(e.c.second),0===e.c.millisecond&&n||(s+="."+eB(e.c.millisecond,3))),a&&(e.isOffsetFixed&&0===e.offset&&!i?s+="Z":e.o<0?s+="-"+eB(Math.trunc(-e.o/60))+":"+eB(Math.trunc(-e.o%60)):s+="+"+eB(Math.trunc(e.o/60))+":"+eB(Math.trunc(e.o%60))),i&&(s+="["+e.zone.ianaName+"]"),s}let rM={month:1,day:1,hour:0,minute:0,second:0,millisecond:0},rP={weekNumber:1,weekday:1,hour:0,minute:0,second:0,millisecond:0},rN={ordinal:1,hour:0,minute:0,second:0,millisecond:0},rJ=["year","month","day","hour","minute","second","millisecond"],rL=["weekYear","weekNumber","weekday","hour","minute","second","millisecond"],rF=["year","ordinal","hour","minute","second","millisecond"];function r_(e){switch(e.toLowerCase()){case"localweekday":case"localweekdays":return"localWeekday";case"localweeknumber":case"localweeknumbers":return"localWeekNumber";case"localweekyear":case"localweekyears":return"localWeekYear";default:return function(e){let t={year:"year",years:"year",month:"month",months:"month",day:"day",days:"day",hour:"hour",hours:"hour",minute:"minute",minutes:"minute",quarter:"quarter",quarters:"quarter",second:"second",seconds:"second",millisecond:"millisecond",milliseconds:"millisecond",weekday:"weekday",weekdays:"weekday",weeknumber:"weekNumber",weeksnumber:"weekNumber",weeknumbers:"weekNumber",weekyear:"weekYear",weekyears:"weekYear",ordinal:"ordinal"}[e.toLowerCase()];if(!t)throw new l(e);return t}(e)}}function rV(e,t){let n,a;let i=eo(t.zone,eS.defaultZone);if(!i.isValid)return rB.invalid(rI(i));let s=en.fromObject(t);if(eN(e.year))n=eS.now();else{for(let t of rJ)eN(e[t])&&(e[t]=rM[t]);let t=eM(e)||eP(e);if(t)return rB.invalid(t);let s=function(e){if(void 0===r&&(r=eS.now()),"iana"!==e.type)return e.offset(r);let t=e.name,n=rY.get(t);return void 0===n&&(n=e.offset(r),rY.set(t,n)),n}(i);[n,a]=rx(eX(e),s,i)}return new rB({ts:n,zone:i,loc:s,o:a})}function rG(e,t,r){let n=!!eN(r.round)||r.round,a=(e,a)=>(e=eQ(e,n||r.calendary?0:2,!0),t.loc.clone(r).relFormatter(r).format(e,a)),i=n=>r.calendary?t.hasSame(e,n)?0:t.startOf(n).diff(e.startOf(n),n).get(n):t.diff(e,n).get(n);if(r.unit)return a(i(r.unit),r.unit);for(let e of r.units){let t=i(e);if(Math.abs(t)>=1)return a(t,e)}return a(e>t?-0:0,r.units[r.units.length-1])}function rq(e){let t={},r;return e.length>0&&"object"==typeof e[e.length-1]?(t=e[e.length-1],r=Array.from(e).slice(0,e.length-1)):r=Array.from(e),[t,r]}let rY=new Map;class rB{constructor(e){let t=e.zone||eS.defaultZone,r=e.invalid||(Number.isNaN(e.ts)?new eE("invalid input"):null)||(t.isValid?null:rI(t));this.ts=eN(e.ts)?eS.now():e.ts;let n=null,a=null;if(!r){if(e.old&&e.old.ts===this.ts&&e.old.zone.equals(t))[n,a]=[e.old.c,e.old.o];else{let i=eJ(e.o)&&!e.old?e.o:t.offset(this.ts);n=(r=Number.isNaN((n=rT(this.ts,i)).year)?new eE("invalid input"):null)?null:n,a=r?null:i}}this._zone=t,this.loc=e.loc||en.create(),this.invalid=r,this.weekData=null,this.localWeekData=null,this.c=n,this.o=a,this.isLuxonDateTime=!0}static now(){return new rB({})}static local(){let[e,t]=rq(arguments),[r,n,a,i,s,o,l]=t;return rV({year:r,month:n,day:a,hour:i,minute:s,second:o,millisecond:l},e)}static utc(){let[e,t]=rq(arguments),[r,n,a,i,s,o,l]=t;return e.zone=ei.utcInstance,rV({year:r,month:n,day:a,hour:i,minute:s,second:o,millisecond:l},e)}static fromJSDate(e,t={}){let r="[object Date]"===Object.prototype.toString.call(e)?e.valueOf():NaN;if(Number.isNaN(r))return rB.invalid("invalid input");let n=eo(t.zone,eS.defaultZone);return n.isValid?new rB({ts:r,zone:n,loc:en.fromObject(t)}):rB.invalid(rI(n))}static fromMillis(e,t={}){if(eJ(e))return e<-864e13||e>864e13?rB.invalid("Timestamp out of range"):new rB({ts:e,zone:eo(t.zone,eS.defaultZone),loc:en.fromObject(t)});throw new d(`fromMillis requires a numerical input, but received a ${typeof e} with value ${e}`)}static fromSeconds(e,t={}){if(eJ(e))return new rB({ts:1e3*e,zone:eo(t.zone,eS.defaultZone),loc:en.fromObject(t)});throw new d("fromSeconds requires a numerical input")}static fromObject(e,t={}){e=e||{};let r=eo(t.zone,eS.defaultZone);if(!r.isValid)return rB.invalid(rI(r));let n=en.fromObject(t),a=e5(e,r_),{minDaysInFirstWeek:i,startOfWeek:s}=eR(a,n),l=eS.now(),d=eN(t.specificOffset)?r.offset(l):t.specificOffset,c=!eN(a.ordinal),u=!eN(a.year),p=!eN(a.month)||!eN(a.day),y=u||p,h=a.weekYear||a.weekNumber;if((y||c)&&h)throw new o("Can't mix weekYear/weekNumber units with year/month/day or ordinals");if(p&&c)throw new o("Can't mix ordinal dates with month/day");let m=h||a.weekday&&!y,f,b,g=rT(l,d);m?(f=rL,b=rP,g=eA(g,i,s)):c?(f=rF,b=rN,g=eC(g)):(f=rJ,b=rM);let K=!1;for(let e of f)eN(a[e])?K?a[e]=b[e]:a[e]=g[e]:K=!0;let v=(m?function(e,t=4,r=1){let n=eL(e.weekYear),a=eY(e.weekNumber,1,e1(e.weekYear,t,r)),i=eY(e.weekday,1,7);return n?a?!i&&ew("weekday",e.weekday):ew("week",e.weekNumber):ew("weekYear",e.weekYear)}(a,i,s):c?function(e){let t=eL(e.year),r=eY(e.ordinal,1,e$(e.year));return t?!r&&ew("ordinal",e.ordinal):ew("year",e.year)}(a):eM(a))||eP(a);if(v)return rB.invalid(v);let[S,E]=rx(eX(m?eD(a,i,s):c?eO(a):a),d,r),I=new rB({ts:S,zone:r,o:E,loc:n});return a.weekday&&y&&e.weekday!==I.weekday?rB.invalid("mismatched weekday",`you can't specify both a weekday of ${a.weekday} and a date of ${I.toISO()}`):I.isValid?I:rB.invalid(I.invalid)}static fromISO(e,t={}){let[r,n]=tg(e,[tB,tQ],[tz,tZ],[tW,t$],[tU,tH]);return rD(r,n,t,"ISO 8601",e)}static fromRFC2822(e,t={}){let[r,n]=tg(e.replace(/\([^()]*\)|[\n\t]/g," ").replace(/(\s\s+)/g," ").trim(),[tL,tF]);return rD(r,n,t,"RFC 2822",e)}static fromHTTP(e,t={}){let[r,n]=tg(e,[t_,tq],[tV,tq],[tG,tY]);return rD(r,n,t,"HTTP",t)}static fromFormat(e,t,r={}){if(eN(e)||eN(t))throw new d("fromFormat requires an input string and a format");let{locale:n=null,numberingSystem:a=null}=r,[i,s,o,l]=function(e,t,r){let{result:n,zone:a,specificOffset:i,invalidReason:s}=rv(e,t,r);return[n,a,i,s]}(en.fromOpts({locale:n,numberingSystem:a,defaultToEN:!0}),e,t);return l?rB.invalid(l):rD(i,s,r,`format ${t}`,e,o)}static fromString(e,t,r={}){return rB.fromFormat(e,t,r)}static fromSQL(e,t={}){let[r,n]=tg(e,[t0,tQ],[t1,t2]);return rD(r,n,t,"SQL",e)}static invalid(e,t=null){if(!e)throw new d("need to specify a reason the DateTime is invalid");let r=e instanceof eE?e:new eE(e,t);if(!eS.throwOnInvalid)return new rB({invalid:r});throw new a(r)}static isDateTime(e){return e&&e.isLuxonDateTime||!1}static parseFormatForOpts(e,t={}){let r=rS(e,en.fromObject(t));return r?r.map(e=>e?e.val:null).join(""):null}static expandFormat(e,t={}){return rg(th.parseFormat(e),en.fromObject(t)).map(e=>e.val).join("")}static resetCache(){r=void 0,rY.clear()}get(e){return this[e]}get isValid(){return null===this.invalid}get invalidReason(){return this.invalid?this.invalid.reason:null}get invalidExplanation(){return this.invalid?this.invalid.explanation:null}get locale(){return this.isValid?this.loc.locale:null}get numberingSystem(){return this.isValid?this.loc.numberingSystem:null}get outputCalendar(){return this.isValid?this.loc.outputCalendar:null}get zone(){return this._zone}get zoneName(){return this.isValid?this.zone.name:null}get year(){return this.isValid?this.c.year:NaN}get quarter(){return this.isValid?Math.ceil(this.c.month/3):NaN}get month(){return this.isValid?this.c.month:NaN}get day(){return this.isValid?this.c.day:NaN}get hour(){return this.isValid?this.c.hour:NaN}get minute(){return this.isValid?this.c.minute:NaN}get second(){return this.isValid?this.c.second:NaN}get millisecond(){return this.isValid?this.c.millisecond:NaN}get weekYear(){return this.isValid?rk(this).weekYear:NaN}get weekNumber(){return this.isValid?rk(this).weekNumber:NaN}get weekday(){return this.isValid?rk(this).weekday:NaN}get isWeekend(){return this.isValid&&this.loc.getWeekendDays().includes(this.weekday)}get localWeekday(){return this.isValid?rw(this).weekday:NaN}get localWeekNumber(){return this.isValid?rw(this).weekNumber:NaN}get localWeekYear(){return this.isValid?rw(this).weekYear:NaN}get ordinal(){return this.isValid?eC(this.c).ordinal:NaN}get monthShort(){return this.isValid?ri.months("short",{locObj:this.loc})[this.month-1]:null}get monthLong(){return this.isValid?ri.months("long",{locObj:this.loc})[this.month-1]:null}get weekdayShort(){return this.isValid?ri.weekdays("short",{locObj:this.loc})[this.weekday-1]:null}get weekdayLong(){return this.isValid?ri.weekdays("long",{locObj:this.loc})[this.weekday-1]:null}get offset(){return this.isValid?+this.o:NaN}get offsetNameShort(){return this.isValid?this.zone.offsetName(this.ts,{format:"short",locale:this.locale}):null}get offsetNameLong(){return this.isValid?this.zone.offsetName(this.ts,{format:"long",locale:this.locale}):null}get isOffsetFixed(){return this.isValid?this.zone.isUniversal:null}get isInDST(){return!this.isOffsetFixed&&(this.offset>this.set({month:1,day:1}).offset||this.offset>this.set({month:5}).offset)}getPossibleOffsets(){if(!this.isValid||this.isOffsetFixed)return[this];let e=eX(this.c),t=this.zone.offset(e-864e5),r=this.zone.offset(e+864e5),n=this.zone.offset(e-6e4*t),a=this.zone.offset(e-6e4*r);if(n===a)return[this];let i=e-6e4*n,s=e-6e4*a,o=rT(i,n),l=rT(s,a);return o.hour===l.hour&&o.minute===l.minute&&o.second===l.second&&o.millisecond===l.millisecond?[rj(this,{ts:i}),rj(this,{ts:s})]:[this]}get isInLeapYear(){return eZ(this.year)}get daysInMonth(){return eH(this.year,this.month)}get daysInYear(){return this.isValid?e$(this.year):NaN}get weeksInWeekYear(){return this.isValid?e1(this.weekYear):NaN}get weeksInLocalWeekYear(){return this.isValid?e1(this.localWeekYear,this.loc.getMinDaysInFirstWeek(),this.loc.getStartOfWeek()):NaN}resolvedLocaleOptions(e={}){let{locale:t,numberingSystem:r,calendar:n}=th.create(this.loc.clone(e),e).resolvedOptions(this);return{locale:t,numberingSystem:r,outputCalendar:n}}toUTC(e=0,t={}){return this.setZone(ei.instance(e),t)}toLocal(){return this.setZone(eS.defaultZone)}setZone(e,{keepLocalTime:t=!1,keepCalendarTime:r=!1}={}){if((e=eo(e,eS.defaultZone)).equals(this.zone))return this;if(!e.isValid)return rB.invalid(rI(e));{let a=this.ts;if(t||r){var n;let t=e.offset(this.ts),r=this.toObject();[a]=(n=e,rx(eX(r),t,n))}return rj(this,{ts:a,zone:e})}}reconfigure({locale:e,numberingSystem:t,outputCalendar:r}={}){return rj(this,{loc:this.loc.clone({locale:e,numberingSystem:t,outputCalendar:r})})}setLocale(e){return this.reconfigure({locale:e})}set(e){var t,r,n;let a;if(!this.isValid)return this;let i=e5(e,r_),{minDaysInFirstWeek:s,startOfWeek:l}=eR(i,this.loc),d=!eN(i.weekYear)||!eN(i.weekNumber)||!eN(i.weekday),c=!eN(i.ordinal),u=!eN(i.year),p=!eN(i.month)||!eN(i.day),y=i.weekYear||i.weekNumber;if((u||p||c)&&y)throw new o("Can't mix weekYear/weekNumber units with year/month/day or ordinals");if(p&&c)throw new o("Can't mix ordinal dates with month/day");d?a=eD({...eA(this.c,s,l),...i},s,l):eN(i.ordinal)?(a={...this.toObject(),...i},eN(i.day)&&(a.day=Math.min(eH(a.year,a.month),a.day))):a=eO({...eC(this.c),...i});let[h,m]=(t=a,r=this.o,n=this.zone,rx(eX(t),r,n));return rj(this,{ts:h,o:m})}plus(e){return this.isValid?rj(this,rA(this,rr.fromDurationLike(e))):this}minus(e){return this.isValid?rj(this,rA(this,rr.fromDurationLike(e).negate())):this}startOf(e,{useLocaleWeeks:t=!1}={}){if(!this.isValid)return this;let r={},n=rr.normalizeUnit(e);switch(n){case"years":r.month=1;case"quarters":case"months":r.day=1;case"weeks":case"days":r.hour=0;case"hours":r.minute=0;case"minutes":r.second=0;case"seconds":r.millisecond=0}if("weeks"===n){if(t){let e=this.loc.getStartOfWeek(),{weekday:t}=this;t<e&&(r.weekNumber=this.weekNumber-1),r.weekday=e}else r.weekday=1}if("quarters"===n){let e=Math.ceil(this.month/3);r.month=(e-1)*3+1}return this.set(r)}endOf(e,t){return this.isValid?this.plus({[e]:1}).startOf(e,t).minus(1):this}toFormat(e,t={}){return this.isValid?th.create(this.loc.redefaultToEN(t)).formatDateTimeFromString(this,e):rE}toLocaleString(e=h,t={}){return this.isValid?th.create(this.loc.clone(t),e).formatDateTime(this):rE}toLocaleParts(e={}){return this.isValid?th.create(this.loc.clone(e),e).formatDateTimeParts(this):[]}toISO({format:e="extended",suppressSeconds:t=!1,suppressMilliseconds:r=!1,includeOffset:n=!0,extendedZone:a=!1}={}){if(!this.isValid)return null;let i="extended"===e;return rO(this,i)+"T"+rR(this,i,t,r,n,a)}toISODate({format:e="extended"}={}){return this.isValid?rO(this,"extended"===e):null}toISOWeekDate(){return rC(this,"kkkk-'W'WW-c")}toISOTime({suppressMilliseconds:e=!1,suppressSeconds:t=!1,includeOffset:r=!0,includePrefix:n=!1,extendedZone:a=!1,format:i="extended"}={}){return this.isValid?(n?"T":"")+rR(this,"extended"===i,t,e,r,a):null}toRFC2822(){return rC(this,"EEE, dd LLL yyyy HH:mm:ss ZZZ",!1)}toHTTP(){return rC(this.toUTC(),"EEE, dd LLL yyyy HH:mm:ss 'GMT'")}toSQLDate(){return this.isValid?rO(this,!0):null}toSQLTime({includeOffset:e=!0,includeZone:t=!1,includeOffsetSpace:r=!0}={}){let n="HH:mm:ss.SSS";return(t||e)&&(r&&(n+=" "),t?n+="z":e&&(n+="ZZ")),rC(this,n,!0)}toSQL(e={}){return this.isValid?`${this.toSQLDate()} ${this.toSQLTime(e)}`:null}toString(){return this.isValid?this.toISO():rE}[Symbol.for("nodejs.util.inspect.custom")](){return this.isValid?`DateTime { ts: ${this.toISO()}, zone: ${this.zone.name}, locale: ${this.locale} }`:`DateTime { Invalid, reason: ${this.invalidReason} }`}valueOf(){return this.toMillis()}toMillis(){return this.isValid?this.ts:NaN}toSeconds(){return this.isValid?this.ts/1e3:NaN}toUnixInteger(){return this.isValid?Math.floor(this.ts/1e3):NaN}toJSON(){return this.toISO()}toBSON(){return this.toJSDate()}toObject(e={}){if(!this.isValid)return{};let t={...this.c};return e.includeConfig&&(t.outputCalendar=this.outputCalendar,t.numberingSystem=this.loc.numberingSystem,t.locale=this.loc.locale),t}toJSDate(){return new Date(this.isValid?this.ts:NaN)}diff(e,t="milliseconds",r={}){if(!this.isValid||!e.isValid)return rr.invalid("created by diffing an invalid DateTime");let n={locale:this.locale,numberingSystem:this.numberingSystem,...r},a=(Array.isArray(t)?t:[t]).map(rr.normalizeUnit),i=e.valueOf()>this.valueOf(),s=function(e,t,r,n){let[a,i,s,o]=function(e,t,r){let n,a;let i={},s=e;for(let[o,l]of[["years",(e,t)=>t.year-e.year],["quarters",(e,t)=>t.quarter-e.quarter+(t.year-e.year)*4],["months",(e,t)=>t.month-e.month+(t.year-e.year)*12],["weeks",(e,t)=>{let r=rs(e,t);return(r-r%7)/7}],["days",rs]])r.indexOf(o)>=0&&(n=o,i[o]=l(e,t),(a=s.plus(i))>t?(i[o]--,(e=s.plus(i))>t&&(a=e,i[o]--,e=s.plus(i))):e=a);return[e,i,a,n]}(e,t,r),l=t-a,d=r.filter(e=>["hours","minutes","seconds","milliseconds"].indexOf(e)>=0);0===d.length&&(s<t&&(s=a.plus({[o]:1})),s!==a&&(i[o]=(i[o]||0)+l/(s-a)));let c=rr.fromObject(i,n);return d.length>0?rr.fromMillis(l,n).shiftTo(...d).plus(c):c}(i?this:e,i?e:this,a,n);return i?s.negate():s}diffNow(e="milliseconds",t={}){return this.diff(rB.now(),e,t)}until(e){return this.isValid?ra.fromDateTimes(this,e):this}hasSame(e,t,r){if(!this.isValid)return!1;let n=e.valueOf(),a=this.setZone(e.zone,{keepLocalTime:!0});return a.startOf(t,r)<=n&&n<=a.endOf(t,r)}equals(e){return this.isValid&&e.isValid&&this.valueOf()===e.valueOf()&&this.zone.equals(e.zone)&&this.loc.equals(e.loc)}toRelative(e={}){if(!this.isValid)return null;let t=e.base||rB.fromObject({},{zone:this.zone}),r=e.padding?this<t?-e.padding:e.padding:0,n=["years","months","days","hours","minutes","seconds"],a=e.unit;return Array.isArray(e.unit)&&(n=e.unit,a=void 0),rG(t,this.plus(r),{...e,numeric:"always",units:n,unit:a})}toRelativeCalendar(e={}){return this.isValid?rG(e.base||rB.fromObject({},{zone:this.zone}),this,{...e,numeric:"auto",units:["years","months","days"],calendary:!0}):null}static min(...e){if(!e.every(rB.isDateTime))throw new d("min requires all arguments be DateTimes");return eV(e,e=>e.valueOf(),Math.min)}static max(...e){if(!e.every(rB.isDateTime))throw new d("max requires all arguments be DateTimes");return eV(e,e=>e.valueOf(),Math.max)}static fromFormatExplain(e,t,r={}){let{locale:n=null,numberingSystem:a=null}=r;return rv(en.fromOpts({locale:n,numberingSystem:a,defaultToEN:!0}),e,t)}static fromStringExplain(e,t,r={}){return rB.fromFormatExplain(e,t,r)}static buildFormatParser(e,t={}){let{locale:r=null,numberingSystem:n=null}=t;return new rK(en.fromOpts({locale:r,numberingSystem:n,defaultToEN:!0}),e)}static fromFormatParser(e,t,r={}){if(eN(e)||eN(t))throw new d("fromFormatParser requires an input string and a format parser");let{locale:n=null,numberingSystem:a=null}=r,i=en.fromOpts({locale:n,numberingSystem:a,defaultToEN:!0});if(!i.equals(t.locale))throw new d(`fromFormatParser called with a locale of ${i}, but the format parser was created for ${t.locale}`);let{result:s,zone:o,specificOffset:l,invalidReason:c}=t.explainFromTokens(e);return c?rB.invalid(c):rD(s,o,r,`format ${t.format}`,e,l)}static get DATE_SHORT(){return h}static get DATE_MED(){return m}static get DATE_MED_WITH_WEEKDAY(){return f}static get DATE_FULL(){return b}static get DATE_HUGE(){return g}static get TIME_SIMPLE(){return K}static get TIME_WITH_SECONDS(){return v}static get TIME_WITH_SHORT_OFFSET(){return S}static get TIME_WITH_LONG_OFFSET(){return E}static get TIME_24_SIMPLE(){return I}static get TIME_24_WITH_SECONDS(){return k}static get TIME_24_WITH_SHORT_OFFSET(){return w}static get TIME_24_WITH_LONG_OFFSET(){return j}static get DATETIME_SHORT(){return x}static get DATETIME_SHORT_WITH_SECONDS(){return T}static get DATETIME_MED(){return A}static get DATETIME_MED_WITH_SECONDS(){return D}static get DATETIME_MED_WITH_WEEKDAY(){return C}static get DATETIME_FULL(){return O}static get DATETIME_FULL_WITH_SECONDS(){return R}static get DATETIME_HUGE(){return M}static get DATETIME_HUGE_WITH_SECONDS(){return P}}function rz(e){if(rB.isDateTime(e))return e;if(e&&e.valueOf&&eJ(e.valueOf()))return rB.fromJSDate(e);if(e&&"object"==typeof e)return rB.fromObject(e);throw new d(`Unknown datetime argument: ${e}, of type ${typeof e}`)}t.DateTime=rB,t.Duration=rr,t.FixedOffsetZone=ei,t.IANAZone=G,t.Info=ri,t.Interval=ra,t.InvalidZone=es,t.Settings=eS,t.SystemZone=L,t.VERSION="3.6.1",t.Zone=N},3974:e=>{function t(e,t,r,n){return Math.round(e/r)+" "+n+(t>=1.5*r?"s":"")}e.exports=function(e,r){r=r||{};var n,a,i=typeof e;if("string"===i&&e.length>0)return function(e){if(!((e=String(e)).length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var r=parseFloat(t[1]);switch((t[2]||"ms").toLowerCase()){case"years":case"year":case"yrs":case"yr":case"y":return 315576e5*r;case"weeks":case"week":case"w":return 6048e5*r;case"days":case"day":case"d":return 864e5*r;case"hours":case"hour":case"hrs":case"hr":case"h":return 36e5*r;case"minutes":case"minute":case"mins":case"min":case"m":return 6e4*r;case"seconds":case"second":case"secs":case"sec":case"s":return 1e3*r;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return r;default:return}}}}(e);if("number"===i&&isFinite(e))return r.long?(n=Math.abs(e))>=864e5?t(e,n,864e5,"day"):n>=36e5?t(e,n,36e5,"hour"):n>=6e4?t(e,n,6e4,"minute"):n>=1e3?t(e,n,1e3,"second"):e+" ms":(a=Math.abs(e))>=864e5?Math.round(e/864e5)+"d":a>=36e5?Math.round(e/36e5)+"h":a>=6e4?Math.round(e/6e4)+"m":a>=1e3?Math.round(e/1e3)+"s":e+"ms";throw Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))}},6180:(e,t,r)=>{let{EventEmitter:n}=r(7702);class AbortSignal{constructor(){this.eventEmitter=new n,this.onabort=null,this.aborted=!1,this.reason=void 0}toString(){return"[object AbortSignal]"}get[Symbol.toStringTag](){return"AbortSignal"}removeEventListener(e,t){this.eventEmitter.removeListener(e,t)}addEventListener(e,t){this.eventEmitter.on(e,t)}dispatchEvent(e){let t={type:e,target:this},r=`on${e}`;"function"==typeof this[r]&&this[r](t),this.eventEmitter.emit(e,t)}throwIfAborted(){if(this.aborted)throw this.reason}static abort(e){let t=new a;return t.abort(),t.signal}static timeout(e){let t=new a;return setTimeout(()=>t.abort(Error("TimeoutError")),e),t.signal}}class a{constructor(){this.signal=new AbortSignal}abort(e){this.signal.aborted||(this.signal.aborted=!0,e?this.signal.reason=e:this.signal.reason=Error("AbortError"),this.signal.dispatchEvent("abort"))}toString(){return"[object AbortController]"}get[Symbol.toStringTag](){return"AbortController"}}e.exports={AbortController:a,AbortSignal}},3122:(e,t,r)=>{"use strict";let n=55>process.version.charCodeAt(1)&&46===process.version.charCodeAt(2)?r(8929):r(3913);e.exports=n},3913:(e,t,r)=>{"use strict";let n=r(7790);class a extends Error{get name(){return this.constructor.name}}class i extends a{constructor(e,t,r){n(t),n.strictEqual(typeof r,"number");let a=Error.stackTraceLimit;Error.stackTraceLimit=2,super(e),Error.stackTraceLimit=a,this.offset=r,this.buffer=t}get name(){return this.constructor.name}}class s extends a{constructor(e){let t=Error.stackTraceLimit;Error.stackTraceLimit=2,super(e),Error.stackTraceLimit=t}get name(){return this.constructor.name}}class o extends a{get name(){return this.constructor.name}}class l extends o{get name(){return this.constructor.name}}e.exports={RedisError:a,ParserError:i,ReplyError:s,AbortError:o,InterruptError:l}},8929:(e,t,r)=>{"use strict";let n=r(7790),a=r(1764);function i(e){Object.defineProperty(this,"message",{value:e||"",configurable:!0,writable:!0}),Error.captureStackTrace(this,this.constructor)}function s(e,t,r){n(t),n.strictEqual(typeof r,"number"),Object.defineProperty(this,"message",{value:e||"",configurable:!0,writable:!0});let a=Error.stackTraceLimit;Error.stackTraceLimit=2,Error.captureStackTrace(this,this.constructor),Error.stackTraceLimit=a,this.offset=r,this.buffer=t}function o(e){Object.defineProperty(this,"message",{value:e||"",configurable:!0,writable:!0});let t=Error.stackTraceLimit;Error.stackTraceLimit=2,Error.captureStackTrace(this,this.constructor),Error.stackTraceLimit=t}function l(e){Object.defineProperty(this,"message",{value:e||"",configurable:!0,writable:!0}),Error.captureStackTrace(this,this.constructor)}function d(e){Object.defineProperty(this,"message",{value:e||"",configurable:!0,writable:!0}),Error.captureStackTrace(this,this.constructor)}a.inherits(i,Error),Object.defineProperty(i.prototype,"name",{value:"RedisError",configurable:!0,writable:!0}),a.inherits(s,i),Object.defineProperty(s.prototype,"name",{value:"ParserError",configurable:!0,writable:!0}),a.inherits(o,i),Object.defineProperty(o.prototype,"name",{value:"ReplyError",configurable:!0,writable:!0}),a.inherits(l,i),Object.defineProperty(l.prototype,"name",{value:"AbortError",configurable:!0,writable:!0}),a.inherits(d,l),Object.defineProperty(d.prototype,"name",{value:"InterruptError",configurable:!0,writable:!0}),e.exports={RedisError:i,ParserError:s,ReplyError:o,AbortError:l,InterruptError:d}},7898:(e,t,r)=>{"use strict";e.exports=r(6213)},6213:(e,t,r)=>{"use strict";let n=r(8893).Buffer,a=new(r(4026)).StringDecoder,i=r(3122),s=i.ReplyError,o=i.ParserError;var l=n.allocUnsafe(32768),d=0,c=null,u=0,p=0;function y(e){let t=e.offset,r=e.buffer,n=r.length-1;for(var a=t;a<n;)if(13===r[a++]){if(e.offset=a+1,!0===e.optionReturnBuffers)return e.buffer.slice(t,a-1);return e.buffer.toString("utf8",t,a-1)}}function h(e){let t=e.buffer.length-1;for(var r=e.offset,n=0;r<t;){let t=e.buffer[r++];if(13===t)return e.offset=r+1,n;n=10*n+(t-48)}}function m(e,t,r){e.arrayCache.push(t),e.arrayPos.push(r)}function f(e){let t=e.arrayCache.pop();var r=e.arrayPos.pop();if(e.arrayCache.length){let n=f(e);if(void 0===n){m(e,t,r);return}t[r++]=n}return b(e,t,r)}function b(e,t,r){let n=e.buffer.length;for(;r<t.length;){let a=e.offset;if(e.offset>=n){m(e,t,r);return}let i=g(e,e.buffer[e.offset++]);if(void 0===i){e.arrayCache.length||e.bufferCache.length||(e.offset=a),m(e,t,r);return}t[r]=i,r++}return t}function g(e,t){switch(t){case 36:return function(e){let t=h(e);if(void 0===t)return;if(t<0)return null;let r=e.offset+t;if(r+2>e.buffer.length){e.bigStrSize=r+2,e.totalChunkSize=e.buffer.length,e.bufferCache.push(e.buffer);return}let n=e.offset;return(e.offset=r+2,!0===e.optionReturnBuffers)?e.buffer.slice(n,r):e.buffer.toString("utf8",n,r)}(e);case 43:return y(e);case 42:return function(e){let t=h(e);return void 0===t?void 0:t<0?null:b(e,Array(t),0)}(e);case 58:return!0===e.optionStringNumbers?function(e){let t=e.buffer.length-1;var r=e.offset,n=0,a="";for(45===e.buffer[r]&&(a+="-",r++);r<t;){var i=e.buffer[r++];if(13===i)return e.offset=r+1,0!==n&&(a+=n),a;n>429496728?(a+=10*n+(i-48),n=0):48===i&&0===n?a+=0:n=10*n+(i-48)}}(e):function(e){let t=e.buffer.length-1;var r=e.offset,n=0,a=1;for(45===e.buffer[r]&&(a=-1,r++);r<t;){let t=e.buffer[r++];if(13===t)return e.offset=r+1,a*n;n=10*n+(t-48)}}(e);case 45:return function(e){var t=y(e);if(void 0!==t)return!0===e.optionReturnBuffers&&(t=t.toString()),new s(t)}(e);default:return function(e,t){let r=new o("Protocol error, got "+JSON.stringify(String.fromCharCode(t))+" as reply type byte",JSON.stringify(e.buffer),e.offset);e.buffer=null,e.returnFatalError(r)}(e,t)}}function K(){if(l.length>51200){if(1===u||p>2*u){let e=Math.floor(l.length/10),t=e<d?d:e;d=0,l=l.slice(t,l.length)}else p++,u--}else clearInterval(c),u=0,p=0,c=null}class v{constructor(e){if(!e)throw TypeError("Options are mandatory.");if("function"!=typeof e.returnError||"function"!=typeof e.returnReply)throw TypeError("The returnReply and returnError options have to be functions.");this.setReturnBuffers(!!e.returnBuffers),this.setStringNumbers(!!e.stringNumbers),this.returnError=e.returnError,this.returnFatalError=e.returnFatalError||e.returnError,this.returnReply=e.returnReply,this.reset()}reset(){this.offset=0,this.buffer=null,this.bigStrSize=0,this.totalChunkSize=0,this.bufferCache=[],this.arrayCache=[],this.arrayPos=[]}setReturnBuffers(e){if("boolean"!=typeof e)throw TypeError("The returnBuffers argument has to be a boolean");this.optionReturnBuffers=e}setStringNumbers(e){if("boolean"!=typeof e)throw TypeError("The stringNumbers argument has to be a boolean");this.optionStringNumbers=e}execute(e){if(null===this.buffer)this.buffer=e,this.offset=0;else if(0===this.bigStrSize){let t=this.buffer.length,r=t-this.offset,a=n.allocUnsafe(r+e.length);if(this.buffer.copy(a,0,this.offset,t),e.copy(a,r,0,e.length),this.buffer=a,this.offset=0,this.arrayCache.length){let e=f(this);if(void 0===e)return;this.returnReply(e)}}else if(this.totalChunkSize+e.length>=this.bigStrSize){this.bufferCache.push(e);var t=this.optionReturnBuffers?function(e){let t=e.bufferCache,r=e.offset,a=e.bigStrSize-r-2;var i=t.length,s=e.bigStrSize-e.totalChunkSize;if(e.offset=s,s<=2){if(2===i)return t[0].slice(r,t[0].length+s-2);i--,s=t[t.length-2].length+s}l.length<a+d&&(d>116391936&&(d=52428800),l=n.allocUnsafe(a*(a>78643200?2:3)+d),d=0,u++,null===c&&(c=setInterval(K,50)));let o=d;t[0].copy(l,o,r,t[0].length),d+=t[0].length-r;for(var p=1;p<i-1;p++)t[p].copy(l,d),d+=t[p].length;return t[p].copy(l,d,0,s-2),d+=s-2,l.slice(o,d)}(this):function(e){let t=e.bufferCache,r=e.offset;var n=t.length,i=e.bigStrSize-e.totalChunkSize;if(e.offset=i,i<=2){if(2===n)return t[0].toString("utf8",r,t[0].length+i-2);n--,i=t[t.length-2].length+i}for(var s=a.write(t[0].slice(r)),o=1;o<n-1;o++)s+=a.write(t[o]);return s+a.end(t[o].slice(0,i-2))}(this);if(this.bigStrSize=0,this.bufferCache=[],this.buffer=e,this.arrayCache.length&&(this.arrayCache[0][this.arrayPos[0]++]=t,void 0===(t=f(this))))return;this.returnReply(t)}else{this.bufferCache.push(e),this.totalChunkSize+=e.length;return}for(;this.offset<this.buffer.length;){let e=this.offset,t=this.buffer[this.offset++],r=g(this,t);if(void 0===r){this.arrayCache.length||this.bufferCache.length||(this.offset=e);return}45===t?this.returnError(r):this.returnReply(r)}this.buffer=null}}e.exports=v},2925:(e,t,r)=>{let n=Symbol("SemVer ANY");class a{static get ANY(){return n}constructor(e,t){if(t=i(t),e instanceof a){if(!!t.loose===e.loose)return e;e=e.value}d("comparator",e=e.trim().split(/\s+/).join(" "),t),this.options=t,this.loose=!!t.loose,this.parse(e),this.semver===n?this.value="":this.value=this.operator+this.semver.version,d("comp",this)}parse(e){let t=this.options.loose?s[o.COMPARATORLOOSE]:s[o.COMPARATOR],r=e.match(t);if(!r)throw TypeError(`Invalid comparator: ${e}`);this.operator=void 0!==r[1]?r[1]:"","="===this.operator&&(this.operator=""),r[2]?this.semver=new c(r[2],this.options.loose):this.semver=n}toString(){return this.value}test(e){if(d("Comparator.test",e,this.options.loose),this.semver===n||e===n)return!0;if("string"==typeof e)try{e=new c(e,this.options)}catch(e){return!1}return l(e,this.operator,this.semver,this.options)}intersects(e,t){if(!(e instanceof a))throw TypeError("a Comparator is required");return""===this.operator?""===this.value||new u(e.value,t).test(this.value):""===e.operator?""===e.value||new u(this.value,t).test(e.semver):!((t=i(t)).includePrerelease&&("<0.0.0-0"===this.value||"<0.0.0-0"===e.value)||!t.includePrerelease&&(this.value.startsWith("<0.0.0")||e.value.startsWith("<0.0.0")))&&!!(this.operator.startsWith(">")&&e.operator.startsWith(">")||this.operator.startsWith("<")&&e.operator.startsWith("<")||this.semver.version===e.semver.version&&this.operator.includes("=")&&e.operator.includes("=")||l(this.semver,"<",e.semver,t)&&this.operator.startsWith(">")&&e.operator.startsWith("<")||l(this.semver,">",e.semver,t)&&this.operator.startsWith("<")&&e.operator.startsWith(">"))}}e.exports=a;let i=r(8949),{safeRe:s,t:o}=r(1520),l=r(3978),d=r(1410),c=r(8871),u=r(8889)},8889:(e,t,r)=>{let n=/\s+/g;class a{constructor(e,t){if(t=s(t),e instanceof a){if(!!t.loose===e.loose&&!!t.includePrerelease===e.includePrerelease)return e;return new a(e.raw,t)}if(e instanceof o)return this.raw=e.value,this.set=[[e]],this.formatted=void 0,this;if(this.options=t,this.loose=!!t.loose,this.includePrerelease=!!t.includePrerelease,this.raw=e.trim().replace(n," "),this.set=this.raw.split("||").map(e=>this.parseRange(e.trim())).filter(e=>e.length),!this.set.length)throw TypeError(`Invalid SemVer Range: ${this.raw}`);if(this.set.length>1){let e=this.set[0];if(this.set=this.set.filter(e=>!b(e[0])),0===this.set.length)this.set=[e];else if(this.set.length>1){for(let e of this.set)if(1===e.length&&g(e[0])){this.set=[e];break}}}this.formatted=void 0}get range(){if(void 0===this.formatted){this.formatted="";for(let e=0;e<this.set.length;e++){e>0&&(this.formatted+="||");let t=this.set[e];for(let e=0;e<t.length;e++)e>0&&(this.formatted+=" "),this.formatted+=t[e].toString().trim()}}return this.formatted}format(){return this.range}toString(){return this.range}parseRange(e){let t=((this.options.includePrerelease&&m)|(this.options.loose&&f))+":"+e,r=i.get(t);if(r)return r;let n=this.options.loose,a=n?c[u.HYPHENRANGELOOSE]:c[u.HYPHENRANGE];l("hyphen replace",e=e.replace(a,D(this.options.includePrerelease))),l("comparator trim",e=e.replace(c[u.COMPARATORTRIM],p)),l("tilde trim",e=e.replace(c[u.TILDETRIM],y)),l("caret trim",e=e.replace(c[u.CARETTRIM],h));let s=e.split(" ").map(e=>v(e,this.options)).join(" ").split(/\s+/).map(e=>A(e,this.options));n&&(s=s.filter(e=>(l("loose invalid filter",e,this.options),!!e.match(c[u.COMPARATORLOOSE])))),l("range list",s);let d=new Map;for(let e of s.map(e=>new o(e,this.options))){if(b(e))return[e];d.set(e.value,e)}d.size>1&&d.has("")&&d.delete("");let g=[...d.values()];return i.set(t,g),g}intersects(e,t){if(!(e instanceof a))throw TypeError("a Range is required");return this.set.some(r=>K(r,t)&&e.set.some(e=>K(e,t)&&r.every(r=>e.every(e=>r.intersects(e,t)))))}test(e){if(!e)return!1;if("string"==typeof e)try{e=new d(e,this.options)}catch(e){return!1}for(let t=0;t<this.set.length;t++)if(C(this.set[t],e,this.options))return!0;return!1}}e.exports=a;let i=new(r(241)),s=r(8949),o=r(2925),l=r(1410),d=r(8871),{safeRe:c,t:u,comparatorTrimReplace:p,tildeTrimReplace:y,caretTrimReplace:h}=r(1520),{FLAG_INCLUDE_PRERELEASE:m,FLAG_LOOSE:f}=r(3651),b=e=>"<0.0.0-0"===e.value,g=e=>""===e.value,K=(e,t)=>{let r=!0,n=e.slice(),a=n.pop();for(;r&&n.length;)r=n.every(e=>a.intersects(e,t)),a=n.pop();return r},v=(e,t)=>(l("comp",e,t),l("caret",e=k(e,t)),l("tildes",e=E(e,t)),l("xrange",e=j(e,t)),l("stars",e=T(e,t)),e),S=e=>!e||"x"===e.toLowerCase()||"*"===e,E=(e,t)=>e.trim().split(/\s+/).map(e=>I(e,t)).join(" "),I=(e,t)=>{let r=t.loose?c[u.TILDELOOSE]:c[u.TILDE];return e.replace(r,(t,r,n,a,i)=>{let s;return l("tilde",e,t,r,n,a,i),S(r)?s="":S(n)?s=`>=${r}.0.0 <${+r+1}.0.0-0`:S(a)?s=`>=${r}.${n}.0 <${r}.${+n+1}.0-0`:i?(l("replaceTilde pr",i),s=`>=${r}.${n}.${a}-${i} <${r}.${+n+1}.0-0`):s=`>=${r}.${n}.${a} <${r}.${+n+1}.0-0`,l("tilde return",s),s})},k=(e,t)=>e.trim().split(/\s+/).map(e=>w(e,t)).join(" "),w=(e,t)=>{l("caret",e,t);let r=t.loose?c[u.CARETLOOSE]:c[u.CARET],n=t.includePrerelease?"-0":"";return e.replace(r,(t,r,a,i,s)=>{let o;return l("caret",e,t,r,a,i,s),S(r)?o="":S(a)?o=`>=${r}.0.0${n} <${+r+1}.0.0-0`:S(i)?o="0"===r?`>=${r}.${a}.0${n} <${r}.${+a+1}.0-0`:`>=${r}.${a}.0${n} <${+r+1}.0.0-0`:s?(l("replaceCaret pr",s),o="0"===r?"0"===a?`>=${r}.${a}.${i}-${s} <${r}.${a}.${+i+1}-0`:`>=${r}.${a}.${i}-${s} <${r}.${+a+1}.0-0`:`>=${r}.${a}.${i}-${s} <${+r+1}.0.0-0`):(l("no pr"),o="0"===r?"0"===a?`>=${r}.${a}.${i}${n} <${r}.${a}.${+i+1}-0`:`>=${r}.${a}.${i}${n} <${r}.${+a+1}.0-0`:`>=${r}.${a}.${i} <${+r+1}.0.0-0`),l("caret return",o),o})},j=(e,t)=>(l("replaceXRanges",e,t),e.split(/\s+/).map(e=>x(e,t)).join(" ")),x=(e,t)=>{e=e.trim();let r=t.loose?c[u.XRANGELOOSE]:c[u.XRANGE];return e.replace(r,(r,n,a,i,s,o)=>{l("xRange",e,r,n,a,i,s,o);let d=S(a),c=d||S(i),u=c||S(s);return"="===n&&u&&(n=""),o=t.includePrerelease?"-0":"",d?r=">"===n||"<"===n?"<0.0.0-0":"*":n&&u?(c&&(i=0),s=0,">"===n?(n=">=",c?(a=+a+1,i=0):i=+i+1,s=0):"<="===n&&(n="<",c?a=+a+1:i=+i+1),"<"===n&&(o="-0"),r=`${n+a}.${i}.${s}${o}`):c?r=`>=${a}.0.0${o} <${+a+1}.0.0-0`:u&&(r=`>=${a}.${i}.0${o} <${a}.${+i+1}.0-0`),l("xRange return",r),r})},T=(e,t)=>(l("replaceStars",e,t),e.trim().replace(c[u.STAR],"")),A=(e,t)=>(l("replaceGTE0",e,t),e.trim().replace(c[t.includePrerelease?u.GTE0PRE:u.GTE0],"")),D=e=>(t,r,n,a,i,s,o,l,d,c,u,p)=>(r=S(n)?"":S(a)?`>=${n}.0.0${e?"-0":""}`:S(i)?`>=${n}.${a}.0${e?"-0":""}`:s?`>=${r}`:`>=${r}${e?"-0":""}`,l=S(d)?"":S(c)?`<${+d+1}.0.0-0`:S(u)?`<${d}.${+c+1}.0-0`:p?`<=${d}.${c}.${u}-${p}`:e?`<${d}.${c}.${+u+1}-0`:`<=${l}`,`${r} ${l}`.trim()),C=(e,t,r)=>{for(let r=0;r<e.length;r++)if(!e[r].test(t))return!1;if(t.prerelease.length&&!r.includePrerelease){for(let r=0;r<e.length;r++)if(l(e[r].semver),e[r].semver!==o.ANY&&e[r].semver.prerelease.length>0){let n=e[r].semver;if(n.major===t.major&&n.minor===t.minor&&n.patch===t.patch)return!0}return!1}return!0}},8871:(e,t,r)=>{let n=r(1410),{MAX_LENGTH:a,MAX_SAFE_INTEGER:i}=r(3651),{safeRe:s,safeSrc:o,t:l}=r(1520),d=r(8949),{compareIdentifiers:c}=r(8178);class u{constructor(e,t){if(t=d(t),e instanceof u){if(!!t.loose===e.loose&&!!t.includePrerelease===e.includePrerelease)return e;e=e.version}else if("string"!=typeof e)throw TypeError(`Invalid version. Must be a string. Got type "${typeof e}".`);if(e.length>a)throw TypeError(`version is longer than ${a} characters`);n("SemVer",e,t),this.options=t,this.loose=!!t.loose,this.includePrerelease=!!t.includePrerelease;let r=e.trim().match(t.loose?s[l.LOOSE]:s[l.FULL]);if(!r)throw TypeError(`Invalid Version: ${e}`);if(this.raw=e,this.major=+r[1],this.minor=+r[2],this.patch=+r[3],this.major>i||this.major<0)throw TypeError("Invalid major version");if(this.minor>i||this.minor<0)throw TypeError("Invalid minor version");if(this.patch>i||this.patch<0)throw TypeError("Invalid patch version");r[4]?this.prerelease=r[4].split(".").map(e=>{if(/^[0-9]+$/.test(e)){let t=+e;if(t>=0&&t<i)return t}return e}):this.prerelease=[],this.build=r[5]?r[5].split("."):[],this.format()}format(){return this.version=`${this.major}.${this.minor}.${this.patch}`,this.prerelease.length&&(this.version+=`-${this.prerelease.join(".")}`),this.version}toString(){return this.version}compare(e){if(n("SemVer.compare",this.version,this.options,e),!(e instanceof u)){if("string"==typeof e&&e===this.version)return 0;e=new u(e,this.options)}return e.version===this.version?0:this.compareMain(e)||this.comparePre(e)}compareMain(e){return e instanceof u||(e=new u(e,this.options)),c(this.major,e.major)||c(this.minor,e.minor)||c(this.patch,e.patch)}comparePre(e){if(e instanceof u||(e=new u(e,this.options)),this.prerelease.length&&!e.prerelease.length)return -1;if(!this.prerelease.length&&e.prerelease.length)return 1;if(!this.prerelease.length&&!e.prerelease.length)return 0;let t=0;do{let r=this.prerelease[t],a=e.prerelease[t];if(n("prerelease compare",t,r,a),void 0===r&&void 0===a)return 0;if(void 0===a)return 1;if(void 0===r)return -1;if(r===a)continue;else return c(r,a)}while(++t)}compareBuild(e){e instanceof u||(e=new u(e,this.options));let t=0;do{let r=this.build[t],a=e.build[t];if(n("build compare",t,r,a),void 0===r&&void 0===a)return 0;if(void 0===a)return 1;if(void 0===r)return -1;if(r===a)continue;else return c(r,a)}while(++t)}inc(e,t,r){if(e.startsWith("pre")){if(!t&&!1===r)throw Error("invalid increment argument: identifier is empty");if(t){let e=RegExp(`^${this.options.loose?o[l.PRERELEASELOOSE]:o[l.PRERELEASE]}$`),r=`-${t}`.match(e);if(!r||r[1]!==t)throw Error(`invalid identifier: ${t}`)}}switch(e){case"premajor":this.prerelease.length=0,this.patch=0,this.minor=0,this.major++,this.inc("pre",t,r);break;case"preminor":this.prerelease.length=0,this.patch=0,this.minor++,this.inc("pre",t,r);break;case"prepatch":this.prerelease.length=0,this.inc("patch",t,r),this.inc("pre",t,r);break;case"prerelease":0===this.prerelease.length&&this.inc("patch",t,r),this.inc("pre",t,r);break;case"release":if(0===this.prerelease.length)throw Error(`version ${this.raw} is not a prerelease`);this.prerelease.length=0;break;case"major":(0!==this.minor||0!==this.patch||0===this.prerelease.length)&&this.major++,this.minor=0,this.patch=0,this.prerelease=[];break;case"minor":(0!==this.patch||0===this.prerelease.length)&&this.minor++,this.patch=0,this.prerelease=[];break;case"patch":0===this.prerelease.length&&this.patch++,this.prerelease=[];break;case"pre":{let e=Number(r)?1:0;if(0===this.prerelease.length)this.prerelease=[e];else{let n=this.prerelease.length;for(;--n>=0;)"number"==typeof this.prerelease[n]&&(this.prerelease[n]++,n=-2);if(-1===n){if(t===this.prerelease.join(".")&&!1===r)throw Error("invalid increment argument: identifier already exists");this.prerelease.push(e)}}if(t){let n=[t,e];!1===r&&(n=[t]),0===c(this.prerelease[0],t)?isNaN(this.prerelease[1])&&(this.prerelease=n):this.prerelease=n}break}default:throw Error(`invalid increment argument: ${e}`)}return this.raw=this.format(),this.build.length&&(this.raw+=`+${this.build.join(".")}`),this}}e.exports=u},2485:(e,t,r)=>{let n=r(8242);e.exports=(e,t)=>{let r=n(e.trim().replace(/^[=v]+/,""),t);return r?r.version:null}},3978:(e,t,r)=>{let n=r(8884),a=r(8305),i=r(8368),s=r(6483),o=r(9673),l=r(4106);e.exports=(e,t,r,d)=>{switch(t){case"===":return"object"==typeof e&&(e=e.version),"object"==typeof r&&(r=r.version),e===r;case"!==":return"object"==typeof e&&(e=e.version),"object"==typeof r&&(r=r.version),e!==r;case"":case"=":case"==":return n(e,r,d);case"!=":return a(e,r,d);case">":return i(e,r,d);case">=":return s(e,r,d);case"<":return o(e,r,d);case"<=":return l(e,r,d);default:throw TypeError(`Invalid operator: ${t}`)}}},9150:(e,t,r)=>{let n=r(8871),a=r(8242),{safeRe:i,t:s}=r(1520);e.exports=(e,t)=>{if(e instanceof n)return e;if("number"==typeof e&&(e=String(e)),"string"!=typeof e)return null;let r=null;if((t=t||{}).rtl){let n;let a=t.includePrerelease?i[s.COERCERTLFULL]:i[s.COERCERTL];for(;(n=a.exec(e))&&(!r||r.index+r[0].length!==e.length);)r&&n.index+n[0].length===r.index+r[0].length||(r=n),a.lastIndex=n.index+n[1].length+n[2].length;a.lastIndex=-1}else r=e.match(t.includePrerelease?i[s.COERCEFULL]:i[s.COERCE]);if(null===r)return null;let o=r[2],l=r[3]||"0",d=r[4]||"0",c=t.includePrerelease&&r[5]?`-${r[5]}`:"",u=t.includePrerelease&&r[6]?`+${r[6]}`:"";return a(`${o}.${l}.${d}${c}${u}`,t)}},4472:(e,t,r)=>{let n=r(8871);e.exports=(e,t,r)=>{let a=new n(e,r),i=new n(t,r);return a.compare(i)||a.compareBuild(i)}},8136:(e,t,r)=>{let n=r(1586);e.exports=(e,t)=>n(e,t,!0)},1586:(e,t,r)=>{let n=r(8871);e.exports=(e,t,r)=>new n(e,r).compare(new n(t,r))},906:(e,t,r)=>{let n=r(8242);e.exports=(e,t)=>{let r=n(e,null,!0),a=n(t,null,!0),i=r.compare(a);if(0===i)return null;let s=i>0,o=s?r:a,l=s?a:r,d=!!o.prerelease.length;if(l.prerelease.length&&!d){if(!l.patch&&!l.minor)return"major";if(0===l.compareMain(o))return l.minor&&!l.patch?"minor":"patch"}let c=d?"pre":"";return r.major!==a.major?c+"major":r.minor!==a.minor?c+"minor":r.patch!==a.patch?c+"patch":"prerelease"}},8884:(e,t,r)=>{let n=r(1586);e.exports=(e,t,r)=>0===n(e,t,r)},8368:(e,t,r)=>{let n=r(1586);e.exports=(e,t,r)=>n(e,t,r)>0},6483:(e,t,r)=>{let n=r(1586);e.exports=(e,t,r)=>n(e,t,r)>=0},254:(e,t,r)=>{let n=r(8871);e.exports=(e,t,r,a,i)=>{"string"==typeof r&&(i=a,a=r,r=void 0);try{return new n(e instanceof n?e.version:e,r).inc(t,a,i).version}catch(e){return null}}},9673:(e,t,r)=>{let n=r(1586);e.exports=(e,t,r)=>0>n(e,t,r)},4106:(e,t,r)=>{let n=r(1586);e.exports=(e,t,r)=>0>=n(e,t,r)},1148:(e,t,r)=>{let n=r(8871);e.exports=(e,t)=>new n(e,t).major},5662:(e,t,r)=>{let n=r(8871);e.exports=(e,t)=>new n(e,t).minor},8305:(e,t,r)=>{let n=r(1586);e.exports=(e,t,r)=>0!==n(e,t,r)},8242:(e,t,r)=>{let n=r(8871);e.exports=(e,t,r=!1)=>{if(e instanceof n)return e;try{return new n(e,t)}catch(e){if(!r)return null;throw e}}},4234:(e,t,r)=>{let n=r(8871);e.exports=(e,t)=>new n(e,t).patch},2606:(e,t,r)=>{let n=r(8242);e.exports=(e,t)=>{let r=n(e,t);return r&&r.prerelease.length?r.prerelease:null}},2490:(e,t,r)=>{let n=r(1586);e.exports=(e,t,r)=>n(t,e,r)},1302:(e,t,r)=>{let n=r(4472);e.exports=(e,t)=>e.sort((e,r)=>n(r,e,t))},4520:(e,t,r)=>{let n=r(8889);e.exports=(e,t,r)=>{try{t=new n(t,r)}catch(e){return!1}return t.test(e)}},3975:(e,t,r)=>{let n=r(4472);e.exports=(e,t)=>e.sort((e,r)=>n(e,r,t))},628:(e,t,r)=>{let n=r(8242);e.exports=(e,t)=>{let r=n(e,t);return r?r.version:null}},799:(e,t,r)=>{let n=r(1520),a=r(3651),i=r(8871),s=r(8178),o=r(8242),l=r(628),d=r(2485),c=r(254),u=r(906),p=r(1148),y=r(5662),h=r(4234),m=r(2606),f=r(1586),b=r(2490),g=r(8136),K=r(4472),v=r(3975),S=r(1302),E=r(8368),I=r(9673),k=r(8884),w=r(8305),j=r(6483),x=r(4106),T=r(3978),A=r(9150),D=r(2925),C=r(8889),O=r(4520),R=r(9835),M=r(1446),P=r(5030),N=r(91),J=r(6269),L=r(5400),F=r(5760),_=r(2884),V=r(3225),G=r(6861),q=r(4550);e.exports={parse:o,valid:l,clean:d,inc:c,diff:u,major:p,minor:y,patch:h,prerelease:m,compare:f,rcompare:b,compareLoose:g,compareBuild:K,sort:v,rsort:S,gt:E,lt:I,eq:k,neq:w,gte:j,lte:x,cmp:T,coerce:A,Comparator:D,Range:C,satisfies:O,toComparators:R,maxSatisfying:M,minSatisfying:P,minVersion:N,validRange:J,outside:L,gtr:F,ltr:_,intersects:V,simplifyRange:G,subset:q,SemVer:i,re:n.re,src:n.src,tokens:n.t,SEMVER_SPEC_VERSION:a.SEMVER_SPEC_VERSION,RELEASE_TYPES:a.RELEASE_TYPES,compareIdentifiers:s.compareIdentifiers,rcompareIdentifiers:s.rcompareIdentifiers}},3651:e=>{let t=Number.MAX_SAFE_INTEGER||9007199254740991;e.exports={MAX_LENGTH:256,MAX_SAFE_COMPONENT_LENGTH:16,MAX_SAFE_BUILD_LENGTH:250,MAX_SAFE_INTEGER:t,RELEASE_TYPES:["major","premajor","minor","preminor","patch","prepatch","prerelease"],SEMVER_SPEC_VERSION:"2.0.0",FLAG_INCLUDE_PRERELEASE:1,FLAG_LOOSE:2}},1410:e=>{let t="object"==typeof process&&process.env&&process.env.NODE_DEBUG&&/\bsemver\b/i.test(process.env.NODE_DEBUG)?(...e)=>console.error("SEMVER",...e):()=>{};e.exports=t},8178:e=>{let t=/^[0-9]+$/,r=(e,r)=>{let n=t.test(e),a=t.test(r);return n&&a&&(e=+e,r=+r),e===r?0:n&&!a?-1:a&&!n?1:e<r?-1:1};e.exports={compareIdentifiers:r,rcompareIdentifiers:(e,t)=>r(t,e)}},241:e=>{class t{constructor(){this.max=1e3,this.map=new Map}get(e){let t=this.map.get(e);if(void 0!==t)return this.map.delete(e),this.map.set(e,t),t}delete(e){return this.map.delete(e)}set(e,t){if(!this.delete(e)&&void 0!==t){if(this.map.size>=this.max){let e=this.map.keys().next().value;this.delete(e)}this.map.set(e,t)}return this}}e.exports=t},8949:e=>{let t=Object.freeze({loose:!0}),r=Object.freeze({});e.exports=e=>e?"object"!=typeof e?t:e:r},1520:(e,t,r)=>{let{MAX_SAFE_COMPONENT_LENGTH:n,MAX_SAFE_BUILD_LENGTH:a,MAX_LENGTH:i}=r(3651),s=r(1410),o=(t=e.exports={}).re=[],l=t.safeRe=[],d=t.src=[],c=t.safeSrc=[],u=t.t={},p=0,y="[a-zA-Z0-9-]",h=[["\\s",1],["\\d",i],[y,a]],m=e=>{for(let[t,r]of h)e=e.split(`${t}*`).join(`${t}{0,${r}}`).split(`${t}+`).join(`${t}{1,${r}}`);return e},f=(e,t,r)=>{let n=m(t),a=p++;s(e,a,t),u[e]=a,d[a]=t,c[a]=n,o[a]=new RegExp(t,r?"g":void 0),l[a]=new RegExp(n,r?"g":void 0)};f("NUMERICIDENTIFIER","0|[1-9]\\d*"),f("NUMERICIDENTIFIERLOOSE","\\d+"),f("NONNUMERICIDENTIFIER",`\\d*[a-zA-Z-]${y}*`),f("MAINVERSION",`(${d[u.NUMERICIDENTIFIER]})\\.(${d[u.NUMERICIDENTIFIER]})\\.(${d[u.NUMERICIDENTIFIER]})`),f("MAINVERSIONLOOSE",`(${d[u.NUMERICIDENTIFIERLOOSE]})\\.(${d[u.NUMERICIDENTIFIERLOOSE]})\\.(${d[u.NUMERICIDENTIFIERLOOSE]})`),f("PRERELEASEIDENTIFIER",`(?:${d[u.NUMERICIDENTIFIER]}|${d[u.NONNUMERICIDENTIFIER]})`),f("PRERELEASEIDENTIFIERLOOSE",`(?:${d[u.NUMERICIDENTIFIERLOOSE]}|${d[u.NONNUMERICIDENTIFIER]})`),f("PRERELEASE",`(?:-(${d[u.PRERELEASEIDENTIFIER]}(?:\\.${d[u.PRERELEASEIDENTIFIER]})*))`),f("PRERELEASELOOSE",`(?:-?(${d[u.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${d[u.PRERELEASEIDENTIFIERLOOSE]})*))`),f("BUILDIDENTIFIER",`${y}+`),f("BUILD",`(?:\\+(${d[u.BUILDIDENTIFIER]}(?:\\.${d[u.BUILDIDENTIFIER]})*))`),f("FULLPLAIN",`v?${d[u.MAINVERSION]}${d[u.PRERELEASE]}?${d[u.BUILD]}?`),f("FULL",`^${d[u.FULLPLAIN]}$`),f("LOOSEPLAIN",`[v=\\s]*${d[u.MAINVERSIONLOOSE]}${d[u.PRERELEASELOOSE]}?${d[u.BUILD]}?`),f("LOOSE",`^${d[u.LOOSEPLAIN]}$`),f("GTLT","((?:<|>)?=?)"),f("XRANGEIDENTIFIERLOOSE",`${d[u.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`),f("XRANGEIDENTIFIER",`${d[u.NUMERICIDENTIFIER]}|x|X|\\*`),f("XRANGEPLAIN",`[v=\\s]*(${d[u.XRANGEIDENTIFIER]})(?:\\.(${d[u.XRANGEIDENTIFIER]})(?:\\.(${d[u.XRANGEIDENTIFIER]})(?:${d[u.PRERELEASE]})?${d[u.BUILD]}?)?)?`),f("XRANGEPLAINLOOSE",`[v=\\s]*(${d[u.XRANGEIDENTIFIERLOOSE]})(?:\\.(${d[u.XRANGEIDENTIFIERLOOSE]})(?:\\.(${d[u.XRANGEIDENTIFIERLOOSE]})(?:${d[u.PRERELEASELOOSE]})?${d[u.BUILD]}?)?)?`),f("XRANGE",`^${d[u.GTLT]}\\s*${d[u.XRANGEPLAIN]}$`),f("XRANGELOOSE",`^${d[u.GTLT]}\\s*${d[u.XRANGEPLAINLOOSE]}$`),f("COERCEPLAIN",`(^|[^\\d])(\\d{1,${n}})(?:\\.(\\d{1,${n}}))?(?:\\.(\\d{1,${n}}))?`),f("COERCE",`${d[u.COERCEPLAIN]}(?:$|[^\\d])`),f("COERCEFULL",d[u.COERCEPLAIN]+`(?:${d[u.PRERELEASE]})?`+`(?:${d[u.BUILD]})?`+"(?:$|[^\\d])"),f("COERCERTL",d[u.COERCE],!0),f("COERCERTLFULL",d[u.COERCEFULL],!0),f("LONETILDE","(?:~>?)"),f("TILDETRIM",`(\\s*)${d[u.LONETILDE]}\\s+`,!0),t.tildeTrimReplace="$1~",f("TILDE",`^${d[u.LONETILDE]}${d[u.XRANGEPLAIN]}$`),f("TILDELOOSE",`^${d[u.LONETILDE]}${d[u.XRANGEPLAINLOOSE]}$`),f("LONECARET","(?:\\^)"),f("CARETTRIM",`(\\s*)${d[u.LONECARET]}\\s+`,!0),t.caretTrimReplace="$1^",f("CARET",`^${d[u.LONECARET]}${d[u.XRANGEPLAIN]}$`),f("CARETLOOSE",`^${d[u.LONECARET]}${d[u.XRANGEPLAINLOOSE]}$`),f("COMPARATORLOOSE",`^${d[u.GTLT]}\\s*(${d[u.LOOSEPLAIN]})$|^$`),f("COMPARATOR",`^${d[u.GTLT]}\\s*(${d[u.FULLPLAIN]})$|^$`),f("COMPARATORTRIM",`(\\s*)${d[u.GTLT]}\\s*(${d[u.LOOSEPLAIN]}|${d[u.XRANGEPLAIN]})`,!0),t.comparatorTrimReplace="$1$2$3",f("HYPHENRANGE",`^\\s*(${d[u.XRANGEPLAIN]})\\s+-\\s+(${d[u.XRANGEPLAIN]})\\s*$`),f("HYPHENRANGELOOSE",`^\\s*(${d[u.XRANGEPLAINLOOSE]})\\s+-\\s+(${d[u.XRANGEPLAINLOOSE]})\\s*$`),f("STAR","(<|>)?=?\\s*\\*"),f("GTE0","^\\s*>=\\s*0\\.0\\.0\\s*$"),f("GTE0PRE","^\\s*>=\\s*0\\.0\\.0-0\\s*$")},5760:(e,t,r)=>{let n=r(5400);e.exports=(e,t,r)=>n(e,t,">",r)},3225:(e,t,r)=>{let n=r(8889);e.exports=(e,t,r)=>(e=new n(e,r),t=new n(t,r),e.intersects(t,r))},2884:(e,t,r)=>{let n=r(5400);e.exports=(e,t,r)=>n(e,t,"<",r)},1446:(e,t,r)=>{let n=r(8871),a=r(8889);e.exports=(e,t,r)=>{let i=null,s=null,o=null;try{o=new a(t,r)}catch(e){return null}return e.forEach(e=>{o.test(e)&&(!i||-1===s.compare(e))&&(s=new n(i=e,r))}),i}},5030:(e,t,r)=>{let n=r(8871),a=r(8889);e.exports=(e,t,r)=>{let i=null,s=null,o=null;try{o=new a(t,r)}catch(e){return null}return e.forEach(e=>{o.test(e)&&(!i||1===s.compare(e))&&(s=new n(i=e,r))}),i}},91:(e,t,r)=>{let n=r(8871),a=r(8889),i=r(8368);e.exports=(e,t)=>{e=new a(e,t);let r=new n("0.0.0");if(e.test(r)||(r=new n("0.0.0-0"),e.test(r)))return r;r=null;for(let t=0;t<e.set.length;++t){let a=e.set[t],s=null;a.forEach(e=>{let t=new n(e.semver.version);switch(e.operator){case">":0===t.prerelease.length?t.patch++:t.prerelease.push(0),t.raw=t.format();case"":case">=":(!s||i(t,s))&&(s=t);break;case"<":case"<=":break;default:throw Error(`Unexpected operation: ${e.operator}`)}}),s&&(!r||i(r,s))&&(r=s)}return r&&e.test(r)?r:null}},5400:(e,t,r)=>{let n=r(8871),a=r(2925),{ANY:i}=a,s=r(8889),o=r(4520),l=r(8368),d=r(9673),c=r(4106),u=r(6483);e.exports=(e,t,r,p)=>{let y,h,m,f,b;switch(e=new n(e,p),t=new s(t,p),r){case">":y=l,h=c,m=d,f=">",b=">=";break;case"<":y=d,h=u,m=l,f="<",b="<=";break;default:throw TypeError('Must provide a hilo val of "<" or ">"')}if(o(e,t,p))return!1;for(let r=0;r<t.set.length;++r){let n=t.set[r],s=null,o=null;if(n.forEach(e=>{e.semver===i&&(e=new a(">=0.0.0")),s=s||e,o=o||e,y(e.semver,s.semver,p)?s=e:m(e.semver,o.semver,p)&&(o=e)}),s.operator===f||s.operator===b||(!o.operator||o.operator===f)&&h(e,o.semver)||o.operator===b&&m(e,o.semver))return!1}return!0}},6861:(e,t,r)=>{let n=r(4520),a=r(1586);e.exports=(e,t,r)=>{let i=[],s=null,o=null,l=e.sort((e,t)=>a(e,t,r));for(let e of l)n(e,t,r)?(o=e,s||(s=e)):(o&&i.push([s,o]),o=null,s=null);s&&i.push([s,null]);let d=[];for(let[e,t]of i)e===t?d.push(e):t||e!==l[0]?t?e===l[0]?d.push(`<=${t}`):d.push(`${e} - ${t}`):d.push(`>=${e}`):d.push("*");let c=d.join(" || "),u="string"==typeof t.raw?t.raw:String(t);return c.length<u.length?c:t}},4550:(e,t,r)=>{let n=r(8889),a=r(2925),{ANY:i}=a,s=r(4520),o=r(1586),l=[new a(">=0.0.0-0")],d=[new a(">=0.0.0")],c=(e,t,r)=>{let n,a,c,y,h,m,f;if(e===t)return!0;if(1===e.length&&e[0].semver===i){if(1===t.length&&t[0].semver===i)return!0;e=r.includePrerelease?l:d}if(1===t.length&&t[0].semver===i){if(r.includePrerelease)return!0;t=d}let b=new Set;for(let t of e)">"===t.operator||">="===t.operator?n=u(n,t,r):"<"===t.operator||"<="===t.operator?a=p(a,t,r):b.add(t.semver);if(b.size>1||n&&a&&((c=o(n.semver,a.semver,r))>0||0===c&&(">="!==n.operator||"<="!==a.operator)))return null;for(let e of b){if(n&&!s(e,String(n),r)||a&&!s(e,String(a),r))return null;for(let n of t)if(!s(e,String(n),r))return!1;return!0}let g=!!a&&!r.includePrerelease&&!!a.semver.prerelease.length&&a.semver,K=!!n&&!r.includePrerelease&&!!n.semver.prerelease.length&&n.semver;for(let e of(g&&1===g.prerelease.length&&"<"===a.operator&&0===g.prerelease[0]&&(g=!1),t)){if(f=f||">"===e.operator||">="===e.operator,m=m||"<"===e.operator||"<="===e.operator,n){if(K&&e.semver.prerelease&&e.semver.prerelease.length&&e.semver.major===K.major&&e.semver.minor===K.minor&&e.semver.patch===K.patch&&(K=!1),">"===e.operator||">="===e.operator){if((y=u(n,e,r))===e&&y!==n)return!1}else if(">="===n.operator&&!s(n.semver,String(e),r))return!1}if(a){if(g&&e.semver.prerelease&&e.semver.prerelease.length&&e.semver.major===g.major&&e.semver.minor===g.minor&&e.semver.patch===g.patch&&(g=!1),"<"===e.operator||"<="===e.operator){if((h=p(a,e,r))===e&&h!==a)return!1}else if("<="===a.operator&&!s(a.semver,String(e),r))return!1}if(!e.operator&&(a||n)&&0!==c)return!1}return(!n||!m||!!a||0===c)&&(!a||!f||!!n||0===c)&&!K&&!g},u=(e,t,r)=>{if(!e)return t;let n=o(e.semver,t.semver,r);return n>0?e:n<0?t:">"===t.operator&&">="===e.operator?t:e},p=(e,t,r)=>{if(!e)return t;let n=o(e.semver,t.semver,r);return n<0?e:n>0?t:"<"===t.operator&&"<="===e.operator?t:e};e.exports=(e,t,r={})=>{if(e===t)return!0;e=new n(e,r),t=new n(t,r);let a=!1;e:for(let n of e.set){for(let e of t.set){let t=c(n,e,r);if(a=a||null!==t,t)continue e}if(a)return!1}return!0}},9835:(e,t,r)=>{let n=r(8889);e.exports=(e,t)=>new n(e,t).set.map(e=>e.map(e=>e.value).join(" ").trim().split(" "))},6269:(e,t,r)=>{let n=r(8889);e.exports=(e,t)=>{try{return new n(e,t).range||"*"}catch(e){return null}}},3499:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});let n=r(1657);function a(e){setTimeout(function(){throw e},0)}t.default=function(e,t,r){return"function"==typeof t&&e.then(e=>{let i;(i=void 0!==r&&Object(r).spread&&Array.isArray(e)?n.tryCatch(t).apply(void 0,[null].concat(e)):void 0===e?n.tryCatch(t)(null):n.tryCatch(t)(null,e))===n.errorObj&&a(i.e)},e=>{if(!e){let t=Error(e+"");Object.assign(t,{cause:e}),e=t}let r=n.tryCatch(t)(e);r===n.errorObj&&a(r.e)}),e}},1657:(e,t)=>{"use strict";let r;function n(e,n){try{let e=r;return r=null,e.apply(this,arguments)}catch(e){return t.errorObj.e=e,t.errorObj}}Object.defineProperty(t,"__esModule",{value:!0}),t.tryCatch=t.errorObj=void 0,t.errorObj={e:{}},t.tryCatch=function(e){return r=e,n}},7057:(e,t,r)=>{"use strict";let n;let a=r(9801),i=r(4175),s=r(2616),{env:o}=process;function l(e){return 0!==e&&{level:e,hasBasic:!0,has256:e>=2,has16m:e>=3}}function d(e,t){if(0===n)return 0;if(s("color=16m")||s("color=full")||s("color=truecolor"))return 3;if(s("color=256"))return 2;if(e&&!t&&void 0===n)return 0;let r=n||0;if("dumb"===o.TERM)return r;if("win32"===process.platform){let e=a.release().split(".");return Number(e[0])>=10&&Number(e[2])>=10586?Number(e[2])>=14931?3:2:1}if("CI"in o)return["TRAVIS","CIRCLECI","APPVEYOR","GITLAB_CI","GITHUB_ACTIONS","BUILDKITE"].some(e=>e in o)||"codeship"===o.CI_NAME?1:r;if("TEAMCITY_VERSION"in o)return/^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(o.TEAMCITY_VERSION)?1:0;if("truecolor"===o.COLORTERM)return 3;if("TERM_PROGRAM"in o){let e=parseInt((o.TERM_PROGRAM_VERSION||"").split(".")[0],10);switch(o.TERM_PROGRAM){case"iTerm.app":return e>=3?3:2;case"Apple_Terminal":return 2}}return/-256(color)?$/i.test(o.TERM)?2:/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(o.TERM)||"COLORTERM"in o?1:r}s("no-color")||s("no-colors")||s("color=false")||s("color=never")?n=0:(s("color")||s("colors")||s("color=true")||s("color=always"))&&(n=1),"FORCE_COLOR"in o&&(n="true"===o.FORCE_COLOR?1:"false"===o.FORCE_COLOR?0:0===o.FORCE_COLOR.length?1:Math.min(parseInt(o.FORCE_COLOR,10),3)),e.exports={supportsColor:function(e){return l(d(e,e&&e.isTTY))},stdout:l(d(!0,i.isatty(1))),stderr:l(d(!0,i.isatty(2)))}},9576:(e,t,r)=>{"use strict";r.d(t,{Z:()=>d});var n=r(4770),a=r.n(n);let i={randomUUID:a().randomUUID},s=new Uint8Array(256),o=s.length,l=[];for(let e=0;e<256;++e)l.push((e+256).toString(16).slice(1));let d=function(e,t,r){if(i.randomUUID&&!t&&!e)return i.randomUUID();let n=(e=e||{}).random||(e.rng||function(){return o>s.length-16&&(a().randomFillSync(s),o=0),s.slice(o,o+=16)})();if(n[6]=15&n[6]|64,n[8]=63&n[8]|128,t){r=r||0;for(let e=0;e<16;++e)t[r+e]=n[e];return t}return function(e,t=0){return l[e[t+0]]+l[e[t+1]]+l[e[t+2]]+l[e[t+3]]+"-"+l[e[t+4]]+l[e[t+5]]+"-"+l[e[t+6]]+l[e[t+7]]+"-"+l[e[t+8]]+l[e[t+9]]+"-"+l[e[t+10]]+l[e[t+11]]+l[e[t+12]]+l[e[t+13]]+l[e[t+14]]+l[e[t+15]]}(n)}},2174:(e,t,r)=>{"use strict";function n(e,t){var r={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&0>t.indexOf(n)&&(r[n]=e[n]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols)for(var a=0,n=Object.getOwnPropertySymbols(e);a<n.length;a++)0>t.indexOf(n[a])&&Object.prototype.propertyIsEnumerable.call(e,n[a])&&(r[n[a]]=e[n[a]]);return r}r.d(t,{_T:()=>n}),Object.create,Object.create,"function"==typeof SuppressedError&&SuppressedError},8262:e=>{"use strict";e.exports=JSON.parse('{"acl":{"arity":-2,"flags":[],"keyStart":0,"keyStop":0,"step":0},"append":{"arity":3,"flags":["write","denyoom","fast"],"keyStart":1,"keyStop":1,"step":1},"asking":{"arity":1,"flags":["fast"],"keyStart":0,"keyStop":0,"step":0},"auth":{"arity":-2,"flags":["noscript","loading","stale","fast","no_auth","allow_busy"],"keyStart":0,"keyStop":0,"step":0},"bgrewriteaof":{"arity":1,"flags":["admin","noscript","no_async_loading"],"keyStart":0,"keyStop":0,"step":0},"bgsave":{"arity":-1,"flags":["admin","noscript","no_async_loading"],"keyStart":0,"keyStop":0,"step":0},"bitcount":{"arity":-2,"flags":["readonly"],"keyStart":1,"keyStop":1,"step":1},"bitfield":{"arity":-2,"flags":["write","denyoom"],"keyStart":1,"keyStop":1,"step":1},"bitfield_ro":{"arity":-2,"flags":["readonly","fast"],"keyStart":1,"keyStop":1,"step":1},"bitop":{"arity":-4,"flags":["write","denyoom"],"keyStart":2,"keyStop":-1,"step":1},"bitpos":{"arity":-3,"flags":["readonly"],"keyStart":1,"keyStop":1,"step":1},"blmove":{"arity":6,"flags":["write","denyoom","noscript","blocking"],"keyStart":1,"keyStop":2,"step":1},"blmpop":{"arity":-5,"flags":["write","blocking","movablekeys"],"keyStart":0,"keyStop":0,"step":0},"blpop":{"arity":-3,"flags":["write","noscript","blocking"],"keyStart":1,"keyStop":-2,"step":1},"brpop":{"arity":-3,"flags":["write","noscript","blocking"],"keyStart":1,"keyStop":-2,"step":1},"brpoplpush":{"arity":4,"flags":["write","denyoom","noscript","blocking"],"keyStart":1,"keyStop":2,"step":1},"bzmpop":{"arity":-5,"flags":["write","blocking","movablekeys"],"keyStart":0,"keyStop":0,"step":0},"bzpopmax":{"arity":-3,"flags":["write","noscript","blocking","fast"],"keyStart":1,"keyStop":-2,"step":1},"bzpopmin":{"arity":-3,"flags":["write","noscript","blocking","fast"],"keyStart":1,"keyStop":-2,"step":1},"client":{"arity":-2,"flags":[],"keyStart":0,"keyStop":0,"step":0},"cluster":{"arity":-2,"flags":[],"keyStart":0,"keyStop":0,"step":0},"command":{"arity":-1,"flags":["loading","stale"],"keyStart":0,"keyStop":0,"step":0},"config":{"arity":-2,"flags":[],"keyStart":0,"keyStop":0,"step":0},"copy":{"arity":-3,"flags":["write","denyoom"],"keyStart":1,"keyStop":2,"step":1},"dbsize":{"arity":1,"flags":["readonly","fast"],"keyStart":0,"keyStop":0,"step":0},"debug":{"arity":-2,"flags":["admin","noscript","loading","stale"],"keyStart":0,"keyStop":0,"step":0},"decr":{"arity":2,"flags":["write","denyoom","fast"],"keyStart":1,"keyStop":1,"step":1},"decrby":{"arity":3,"flags":["write","denyoom","fast"],"keyStart":1,"keyStop":1,"step":1},"del":{"arity":-2,"flags":["write"],"keyStart":1,"keyStop":-1,"step":1},"discard":{"arity":1,"flags":["noscript","loading","stale","fast","allow_busy"],"keyStart":0,"keyStop":0,"step":0},"dump":{"arity":2,"flags":["readonly"],"keyStart":1,"keyStop":1,"step":1},"echo":{"arity":2,"flags":["fast"],"keyStart":0,"keyStop":0,"step":0},"eval":{"arity":-3,"flags":["noscript","stale","skip_monitor","no_mandatory_keys","movablekeys"],"keyStart":0,"keyStop":0,"step":0},"eval_ro":{"arity":-3,"flags":["readonly","noscript","stale","skip_monitor","no_mandatory_keys","movablekeys"],"keyStart":0,"keyStop":0,"step":0},"evalsha":{"arity":-3,"flags":["noscript","stale","skip_monitor","no_mandatory_keys","movablekeys"],"keyStart":0,"keyStop":0,"step":0},"evalsha_ro":{"arity":-3,"flags":["readonly","noscript","stale","skip_monitor","no_mandatory_keys","movablekeys"],"keyStart":0,"keyStop":0,"step":0},"exec":{"arity":1,"flags":["noscript","loading","stale","skip_slowlog"],"keyStart":0,"keyStop":0,"step":0},"exists":{"arity":-2,"flags":["readonly","fast"],"keyStart":1,"keyStop":-1,"step":1},"expire":{"arity":-3,"flags":["write","fast"],"keyStart":1,"keyStop":1,"step":1},"expireat":{"arity":-3,"flags":["write","fast"],"keyStart":1,"keyStop":1,"step":1},"expiretime":{"arity":2,"flags":["readonly","fast"],"keyStart":1,"keyStop":1,"step":1},"failover":{"arity":-1,"flags":["admin","noscript","stale"],"keyStart":0,"keyStop":0,"step":0},"fcall":{"arity":-3,"flags":["noscript","stale","skip_monitor","no_mandatory_keys","movablekeys"],"keyStart":0,"keyStop":0,"step":0},"fcall_ro":{"arity":-3,"flags":["readonly","noscript","stale","skip_monitor","no_mandatory_keys","movablekeys"],"keyStart":0,"keyStop":0,"step":0},"flushall":{"arity":-1,"flags":["write"],"keyStart":0,"keyStop":0,"step":0},"flushdb":{"arity":-1,"flags":["write"],"keyStart":0,"keyStop":0,"step":0},"function":{"arity":-2,"flags":[],"keyStart":0,"keyStop":0,"step":0},"geoadd":{"arity":-5,"flags":["write","denyoom"],"keyStart":1,"keyStop":1,"step":1},"geodist":{"arity":-4,"flags":["readonly"],"keyStart":1,"keyStop":1,"step":1},"geohash":{"arity":-2,"flags":["readonly"],"keyStart":1,"keyStop":1,"step":1},"geopos":{"arity":-2,"flags":["readonly"],"keyStart":1,"keyStop":1,"step":1},"georadius":{"arity":-6,"flags":["write","denyoom","movablekeys"],"keyStart":1,"keyStop":1,"step":1},"georadius_ro":{"arity":-6,"flags":["readonly"],"keyStart":1,"keyStop":1,"step":1},"georadiusbymember":{"arity":-5,"flags":["write","denyoom","movablekeys"],"keyStart":1,"keyStop":1,"step":1},"georadiusbymember_ro":{"arity":-5,"flags":["readonly"],"keyStart":1,"keyStop":1,"step":1},"geosearch":{"arity":-7,"flags":["readonly"],"keyStart":1,"keyStop":1,"step":1},"geosearchstore":{"arity":-8,"flags":["write","denyoom"],"keyStart":1,"keyStop":2,"step":1},"get":{"arity":2,"flags":["readonly","fast"],"keyStart":1,"keyStop":1,"step":1},"getbit":{"arity":3,"flags":["readonly","fast"],"keyStart":1,"keyStop":1,"step":1},"getdel":{"arity":2,"flags":["write","fast"],"keyStart":1,"keyStop":1,"step":1},"getex":{"arity":-2,"flags":["write","fast"],"keyStart":1,"keyStop":1,"step":1},"getrange":{"arity":4,"flags":["readonly"],"keyStart":1,"keyStop":1,"step":1},"getset":{"arity":3,"flags":["write","denyoom","fast"],"keyStart":1,"keyStop":1,"step":1},"hdel":{"arity":-3,"flags":["write","fast"],"keyStart":1,"keyStop":1,"step":1},"hello":{"arity":-1,"flags":["noscript","loading","stale","fast","no_auth","allow_busy"],"keyStart":0,"keyStop":0,"step":0},"hexists":{"arity":3,"flags":["readonly","fast"],"keyStart":1,"keyStop":1,"step":1},"hget":{"arity":3,"flags":["readonly","fast"],"keyStart":1,"keyStop":1,"step":1},"hgetall":{"arity":2,"flags":["readonly"],"keyStart":1,"keyStop":1,"step":1},"hincrby":{"arity":4,"flags":["write","denyoom","fast"],"keyStart":1,"keyStop":1,"step":1},"hincrbyfloat":{"arity":4,"flags":["write","denyoom","fast"],"keyStart":1,"keyStop":1,"step":1},"hkeys":{"arity":2,"flags":["readonly"],"keyStart":1,"keyStop":1,"step":1},"hlen":{"arity":2,"flags":["readonly","fast"],"keyStart":1,"keyStop":1,"step":1},"hmget":{"arity":-3,"flags":["readonly","fast"],"keyStart":1,"keyStop":1,"step":1},"hmset":{"arity":-4,"flags":["write","denyoom","fast"],"keyStart":1,"keyStop":1,"step":1},"hrandfield":{"arity":-2,"flags":["readonly"],"keyStart":1,"keyStop":1,"step":1},"hscan":{"arity":-3,"flags":["readonly"],"keyStart":1,"keyStop":1,"step":1},"hset":{"arity":-4,"flags":["write","denyoom","fast"],"keyStart":1,"keyStop":1,"step":1},"hsetnx":{"arity":4,"flags":["write","denyoom","fast"],"keyStart":1,"keyStop":1,"step":1},"hstrlen":{"arity":3,"flags":["readonly","fast"],"keyStart":1,"keyStop":1,"step":1},"hvals":{"arity":2,"flags":["readonly"],"keyStart":1,"keyStop":1,"step":1},"incr":{"arity":2,"flags":["write","denyoom","fast"],"keyStart":1,"keyStop":1,"step":1},"incrby":{"arity":3,"flags":["write","denyoom","fast"],"keyStart":1,"keyStop":1,"step":1},"incrbyfloat":{"arity":3,"flags":["write","denyoom","fast"],"keyStart":1,"keyStop":1,"step":1},"info":{"arity":-1,"flags":["loading","stale"],"keyStart":0,"keyStop":0,"step":0},"keys":{"arity":2,"flags":["readonly"],"keyStart":0,"keyStop":0,"step":0},"lastsave":{"arity":1,"flags":["loading","stale","fast"],"keyStart":0,"keyStop":0,"step":0},"latency":{"arity":-2,"flags":[],"keyStart":0,"keyStop":0,"step":0},"lcs":{"arity":-3,"flags":["readonly"],"keyStart":1,"keyStop":2,"step":1},"lindex":{"arity":3,"flags":["readonly"],"keyStart":1,"keyStop":1,"step":1},"linsert":{"arity":5,"flags":["write","denyoom"],"keyStart":1,"keyStop":1,"step":1},"llen":{"arity":2,"flags":["readonly","fast"],"keyStart":1,"keyStop":1,"step":1},"lmove":{"arity":5,"flags":["write","denyoom"],"keyStart":1,"keyStop":2,"step":1},"lmpop":{"arity":-4,"flags":["write","movablekeys"],"keyStart":0,"keyStop":0,"step":0},"lolwut":{"arity":-1,"flags":["readonly","fast"],"keyStart":0,"keyStop":0,"step":0},"lpop":{"arity":-2,"flags":["write","fast"],"keyStart":1,"keyStop":1,"step":1},"lpos":{"arity":-3,"flags":["readonly"],"keyStart":1,"keyStop":1,"step":1},"lpush":{"arity":-3,"flags":["write","denyoom","fast"],"keyStart":1,"keyStop":1,"step":1},"lpushx":{"arity":-3,"flags":["write","denyoom","fast"],"keyStart":1,"keyStop":1,"step":1},"lrange":{"arity":4,"flags":["readonly"],"keyStart":1,"keyStop":1,"step":1},"lrem":{"arity":4,"flags":["write"],"keyStart":1,"keyStop":1,"step":1},"lset":{"arity":4,"flags":["write","denyoom"],"keyStart":1,"keyStop":1,"step":1},"ltrim":{"arity":4,"flags":["write"],"keyStart":1,"keyStop":1,"step":1},"memory":{"arity":-2,"flags":[],"keyStart":0,"keyStop":0,"step":0},"mget":{"arity":-2,"flags":["readonly","fast"],"keyStart":1,"keyStop":-1,"step":1},"migrate":{"arity":-6,"flags":["write","movablekeys"],"keyStart":3,"keyStop":3,"step":1},"module":{"arity":-2,"flags":[],"keyStart":0,"keyStop":0,"step":0},"monitor":{"arity":1,"flags":["admin","noscript","loading","stale"],"keyStart":0,"keyStop":0,"step":0},"move":{"arity":3,"flags":["write","fast"],"keyStart":1,"keyStop":1,"step":1},"mset":{"arity":-3,"flags":["write","denyoom"],"keyStart":1,"keyStop":-1,"step":2},"msetnx":{"arity":-3,"flags":["write","denyoom"],"keyStart":1,"keyStop":-1,"step":2},"multi":{"arity":1,"flags":["noscript","loading","stale","fast","allow_busy"],"keyStart":0,"keyStop":0,"step":0},"object":{"arity":-2,"flags":[],"keyStart":0,"keyStop":0,"step":0},"persist":{"arity":2,"flags":["write","fast"],"keyStart":1,"keyStop":1,"step":1},"pexpire":{"arity":-3,"flags":["write","fast"],"keyStart":1,"keyStop":1,"step":1},"pexpireat":{"arity":-3,"flags":["write","fast"],"keyStart":1,"keyStop":1,"step":1},"pexpiretime":{"arity":2,"flags":["readonly","fast"],"keyStart":1,"keyStop":1,"step":1},"pfadd":{"arity":-2,"flags":["write","denyoom","fast"],"keyStart":1,"keyStop":1,"step":1},"pfcount":{"arity":-2,"flags":["readonly"],"keyStart":1,"keyStop":-1,"step":1},"pfdebug":{"arity":3,"flags":["write","denyoom","admin"],"keyStart":2,"keyStop":2,"step":1},"pfmerge":{"arity":-2,"flags":["write","denyoom"],"keyStart":1,"keyStop":-1,"step":1},"pfselftest":{"arity":1,"flags":["admin"],"keyStart":0,"keyStop":0,"step":0},"ping":{"arity":-1,"flags":["fast"],"keyStart":0,"keyStop":0,"step":0},"psetex":{"arity":4,"flags":["write","denyoom"],"keyStart":1,"keyStop":1,"step":1},"psubscribe":{"arity":-2,"flags":["pubsub","noscript","loading","stale"],"keyStart":0,"keyStop":0,"step":0},"psync":{"arity":-3,"flags":["admin","noscript","no_async_loading","no_multi"],"keyStart":0,"keyStop":0,"step":0},"pttl":{"arity":2,"flags":["readonly","fast"],"keyStart":1,"keyStop":1,"step":1},"publish":{"arity":3,"flags":["pubsub","loading","stale","fast"],"keyStart":0,"keyStop":0,"step":0},"pubsub":{"arity":-2,"flags":[],"keyStart":0,"keyStop":0,"step":0},"punsubscribe":{"arity":-1,"flags":["pubsub","noscript","loading","stale"],"keyStart":0,"keyStop":0,"step":0},"quit":{"arity":-1,"flags":["noscript","loading","stale","fast","no_auth","allow_busy"],"keyStart":0,"keyStop":0,"step":0},"randomkey":{"arity":1,"flags":["readonly"],"keyStart":0,"keyStop":0,"step":0},"readonly":{"arity":1,"flags":["loading","stale","fast"],"keyStart":0,"keyStop":0,"step":0},"readwrite":{"arity":1,"flags":["loading","stale","fast"],"keyStart":0,"keyStop":0,"step":0},"rename":{"arity":3,"flags":["write"],"keyStart":1,"keyStop":2,"step":1},"renamenx":{"arity":3,"flags":["write","fast"],"keyStart":1,"keyStop":2,"step":1},"replconf":{"arity":-1,"flags":["admin","noscript","loading","stale","allow_busy"],"keyStart":0,"keyStop":0,"step":0},"replicaof":{"arity":3,"flags":["admin","noscript","stale","no_async_loading"],"keyStart":0,"keyStop":0,"step":0},"reset":{"arity":1,"flags":["noscript","loading","stale","fast","no_auth","allow_busy"],"keyStart":0,"keyStop":0,"step":0},"restore":{"arity":-4,"flags":["write","denyoom"],"keyStart":1,"keyStop":1,"step":1},"restore-asking":{"arity":-4,"flags":["write","denyoom","asking"],"keyStart":1,"keyStop":1,"step":1},"role":{"arity":1,"flags":["noscript","loading","stale","fast"],"keyStart":0,"keyStop":0,"step":0},"rpop":{"arity":-2,"flags":["write","fast"],"keyStart":1,"keyStop":1,"step":1},"rpoplpush":{"arity":3,"flags":["write","denyoom"],"keyStart":1,"keyStop":2,"step":1},"rpush":{"arity":-3,"flags":["write","denyoom","fast"],"keyStart":1,"keyStop":1,"step":1},"rpushx":{"arity":-3,"flags":["write","denyoom","fast"],"keyStart":1,"keyStop":1,"step":1},"sadd":{"arity":-3,"flags":["write","denyoom","fast"],"keyStart":1,"keyStop":1,"step":1},"save":{"arity":1,"flags":["admin","noscript","no_async_loading","no_multi"],"keyStart":0,"keyStop":0,"step":0},"scan":{"arity":-2,"flags":["readonly"],"keyStart":0,"keyStop":0,"step":0},"scard":{"arity":2,"flags":["readonly","fast"],"keyStart":1,"keyStop":1,"step":1},"script":{"arity":-2,"flags":[],"keyStart":0,"keyStop":0,"step":0},"sdiff":{"arity":-2,"flags":["readonly"],"keyStart":1,"keyStop":-1,"step":1},"sdiffstore":{"arity":-3,"flags":["write","denyoom"],"keyStart":1,"keyStop":-1,"step":1},"select":{"arity":2,"flags":["loading","stale","fast"],"keyStart":0,"keyStop":0,"step":0},"set":{"arity":-3,"flags":["write","denyoom"],"keyStart":1,"keyStop":1,"step":1},"setbit":{"arity":4,"flags":["write","denyoom"],"keyStart":1,"keyStop":1,"step":1},"setex":{"arity":4,"flags":["write","denyoom"],"keyStart":1,"keyStop":1,"step":1},"setnx":{"arity":3,"flags":["write","denyoom","fast"],"keyStart":1,"keyStop":1,"step":1},"setrange":{"arity":4,"flags":["write","denyoom"],"keyStart":1,"keyStop":1,"step":1},"shutdown":{"arity":-1,"flags":["admin","noscript","loading","stale","no_multi","allow_busy"],"keyStart":0,"keyStop":0,"step":0},"sinter":{"arity":-2,"flags":["readonly"],"keyStart":1,"keyStop":-1,"step":1},"sintercard":{"arity":-3,"flags":["readonly","movablekeys"],"keyStart":0,"keyStop":0,"step":0},"sinterstore":{"arity":-3,"flags":["write","denyoom"],"keyStart":1,"keyStop":-1,"step":1},"sismember":{"arity":3,"flags":["readonly","fast"],"keyStart":1,"keyStop":1,"step":1},"slaveof":{"arity":3,"flags":["admin","noscript","stale","no_async_loading"],"keyStart":0,"keyStop":0,"step":0},"slowlog":{"arity":-2,"flags":[],"keyStart":0,"keyStop":0,"step":0},"smembers":{"arity":2,"flags":["readonly"],"keyStart":1,"keyStop":1,"step":1},"smismember":{"arity":-3,"flags":["readonly","fast"],"keyStart":1,"keyStop":1,"step":1},"smove":{"arity":4,"flags":["write","fast"],"keyStart":1,"keyStop":2,"step":1},"sort":{"arity":-2,"flags":["write","denyoom","movablekeys"],"keyStart":1,"keyStop":1,"step":1},"sort_ro":{"arity":-2,"flags":["readonly","movablekeys"],"keyStart":1,"keyStop":1,"step":1},"spop":{"arity":-2,"flags":["write","fast"],"keyStart":1,"keyStop":1,"step":1},"spublish":{"arity":3,"flags":["pubsub","loading","stale","fast"],"keyStart":1,"keyStop":1,"step":1},"srandmember":{"arity":-2,"flags":["readonly"],"keyStart":1,"keyStop":1,"step":1},"srem":{"arity":-3,"flags":["write","fast"],"keyStart":1,"keyStop":1,"step":1},"sscan":{"arity":-3,"flags":["readonly"],"keyStart":1,"keyStop":1,"step":1},"ssubscribe":{"arity":-2,"flags":["pubsub","noscript","loading","stale"],"keyStart":1,"keyStop":-1,"step":1},"strlen":{"arity":2,"flags":["readonly","fast"],"keyStart":1,"keyStop":1,"step":1},"subscribe":{"arity":-2,"flags":["pubsub","noscript","loading","stale"],"keyStart":0,"keyStop":0,"step":0},"substr":{"arity":4,"flags":["readonly"],"keyStart":1,"keyStop":1,"step":1},"sunion":{"arity":-2,"flags":["readonly"],"keyStart":1,"keyStop":-1,"step":1},"sunionstore":{"arity":-3,"flags":["write","denyoom"],"keyStart":1,"keyStop":-1,"step":1},"sunsubscribe":{"arity":-1,"flags":["pubsub","noscript","loading","stale"],"keyStart":1,"keyStop":-1,"step":1},"swapdb":{"arity":3,"flags":["write","fast"],"keyStart":0,"keyStop":0,"step":0},"sync":{"arity":1,"flags":["admin","noscript","no_async_loading","no_multi"],"keyStart":0,"keyStop":0,"step":0},"time":{"arity":1,"flags":["loading","stale","fast"],"keyStart":0,"keyStop":0,"step":0},"touch":{"arity":-2,"flags":["readonly","fast"],"keyStart":1,"keyStop":-1,"step":1},"ttl":{"arity":2,"flags":["readonly","fast"],"keyStart":1,"keyStop":1,"step":1},"type":{"arity":2,"flags":["readonly","fast"],"keyStart":1,"keyStop":1,"step":1},"unlink":{"arity":-2,"flags":["write","fast"],"keyStart":1,"keyStop":-1,"step":1},"unsubscribe":{"arity":-1,"flags":["pubsub","noscript","loading","stale"],"keyStart":0,"keyStop":0,"step":0},"unwatch":{"arity":1,"flags":["noscript","loading","stale","fast","allow_busy"],"keyStart":0,"keyStop":0,"step":0},"wait":{"arity":3,"flags":["noscript"],"keyStart":0,"keyStop":0,"step":0},"watch":{"arity":-2,"flags":["noscript","loading","stale","fast","allow_busy"],"keyStart":1,"keyStop":-1,"step":1},"xack":{"arity":-4,"flags":["write","fast"],"keyStart":1,"keyStop":1,"step":1},"xadd":{"arity":-5,"flags":["write","denyoom","fast"],"keyStart":1,"keyStop":1,"step":1},"xautoclaim":{"arity":-6,"flags":["write","fast"],"keyStart":1,"keyStop":1,"step":1},"xclaim":{"arity":-6,"flags":["write","fast"],"keyStart":1,"keyStop":1,"step":1},"xdel":{"arity":-3,"flags":["write","fast"],"keyStart":1,"keyStop":1,"step":1},"xgroup":{"arity":-2,"flags":[],"keyStart":0,"keyStop":0,"step":0},"xinfo":{"arity":-2,"flags":[],"keyStart":0,"keyStop":0,"step":0},"xlen":{"arity":2,"flags":["readonly","fast"],"keyStart":1,"keyStop":1,"step":1},"xpending":{"arity":-3,"flags":["readonly"],"keyStart":1,"keyStop":1,"step":1},"xrange":{"arity":-4,"flags":["readonly"],"keyStart":1,"keyStop":1,"step":1},"xread":{"arity":-4,"flags":["readonly","blocking","movablekeys"],"keyStart":0,"keyStop":0,"step":0},"xreadgroup":{"arity":-7,"flags":["write","blocking","movablekeys"],"keyStart":0,"keyStop":0,"step":0},"xrevrange":{"arity":-4,"flags":["readonly"],"keyStart":1,"keyStop":1,"step":1},"xsetid":{"arity":-3,"flags":["write","denyoom","fast"],"keyStart":1,"keyStop":1,"step":1},"xtrim":{"arity":-4,"flags":["write"],"keyStart":1,"keyStop":1,"step":1},"zadd":{"arity":-4,"flags":["write","denyoom","fast"],"keyStart":1,"keyStop":1,"step":1},"zcard":{"arity":2,"flags":["readonly","fast"],"keyStart":1,"keyStop":1,"step":1},"zcount":{"arity":4,"flags":["readonly","fast"],"keyStart":1,"keyStop":1,"step":1},"zdiff":{"arity":-3,"flags":["readonly","movablekeys"],"keyStart":0,"keyStop":0,"step":0},"zdiffstore":{"arity":-4,"flags":["write","denyoom","movablekeys"],"keyStart":1,"keyStop":1,"step":1},"zincrby":{"arity":4,"flags":["write","denyoom","fast"],"keyStart":1,"keyStop":1,"step":1},"zinter":{"arity":-3,"flags":["readonly","movablekeys"],"keyStart":0,"keyStop":0,"step":0},"zintercard":{"arity":-3,"flags":["readonly","movablekeys"],"keyStart":0,"keyStop":0,"step":0},"zinterstore":{"arity":-4,"flags":["write","denyoom","movablekeys"],"keyStart":1,"keyStop":1,"step":1},"zlexcount":{"arity":4,"flags":["readonly","fast"],"keyStart":1,"keyStop":1,"step":1},"zmpop":{"arity":-4,"flags":["write","movablekeys"],"keyStart":0,"keyStop":0,"step":0},"zmscore":{"arity":-3,"flags":["readonly","fast"],"keyStart":1,"keyStop":1,"step":1},"zpopmax":{"arity":-2,"flags":["write","fast"],"keyStart":1,"keyStop":1,"step":1},"zpopmin":{"arity":-2,"flags":["write","fast"],"keyStart":1,"keyStop":1,"step":1},"zrandmember":{"arity":-2,"flags":["readonly"],"keyStart":1,"keyStop":1,"step":1},"zrange":{"arity":-4,"flags":["readonly"],"keyStart":1,"keyStop":1,"step":1},"zrangebylex":{"arity":-4,"flags":["readonly"],"keyStart":1,"keyStop":1,"step":1},"zrangebyscore":{"arity":-4,"flags":["readonly"],"keyStart":1,"keyStop":1,"step":1},"zrangestore":{"arity":-5,"flags":["write","denyoom"],"keyStart":1,"keyStop":2,"step":1},"zrank":{"arity":3,"flags":["readonly","fast"],"keyStart":1,"keyStop":1,"step":1},"zrem":{"arity":-3,"flags":["write","fast"],"keyStart":1,"keyStop":1,"step":1},"zremrangebylex":{"arity":4,"flags":["write"],"keyStart":1,"keyStop":1,"step":1},"zremrangebyrank":{"arity":4,"flags":["write"],"keyStart":1,"keyStop":1,"step":1},"zremrangebyscore":{"arity":4,"flags":["write"],"keyStart":1,"keyStop":1,"step":1},"zrevrange":{"arity":-4,"flags":["readonly"],"keyStart":1,"keyStop":1,"step":1},"zrevrangebylex":{"arity":-4,"flags":["readonly"],"keyStart":1,"keyStop":1,"step":1},"zrevrangebyscore":{"arity":-4,"flags":["readonly"],"keyStart":1,"keyStop":1,"step":1},"zrevrank":{"arity":3,"flags":["readonly","fast"],"keyStart":1,"keyStop":1,"step":1},"zscan":{"arity":-3,"flags":["readonly"],"keyStart":1,"keyStop":1,"step":1},"zscore":{"arity":3,"flags":["readonly","fast"],"keyStart":1,"keyStop":1,"step":1},"zunion":{"arity":-3,"flags":["readonly","movablekeys"],"keyStart":0,"keyStop":0,"step":0},"zunionstore":{"arity":-4,"flags":["write","denyoom","movablekeys"],"keyStart":1,"keyStop":1,"step":1}}')}};