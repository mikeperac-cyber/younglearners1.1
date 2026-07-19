var ACTIVITIES = (function(){
  var a=[];
  DATA1.forEach(function(t){t.acts.forEach(function(ac){ac.topic=t.id;ac.topicName=t.title;a.push(ac);});});
  DATA2.forEach(function(t){t.acts.forEach(function(ac){ac.topic=t.id;ac.topicName=t.title;a.push(ac);});});
  if(typeof DATA3!=="undefined") DATA3.forEach(function(t){t.acts.forEach(function(ac){ac.topic=t.id;ac.topicName=t.title;a.push(ac);});});
  if(typeof DATA_TWISTERS!=="undefined") DATA_TWISTERS.forEach(function(t){t.acts.forEach(function(ac){ac.topic=t.id;ac.topicName=t.title;a.push(ac);});});
  if(typeof DATA_CHANTS!=="undefined") DATA_CHANTS.forEach(function(t){t.acts.forEach(function(ac){ac.topic=t.id;ac.topicName=t.title;a.push(ac);});});
  if(typeof DATA_ROLEPLAYS!=="undefined") DATA_ROLEPLAYS.forEach(function(t){t.acts.forEach(function(ac){ac.topic=t.id;ac.topicName=t.title;a.push(ac);});});
  if(typeof DATA_SEASONAL!=="undefined") DATA_SEASONAL.forEach(function(t){t.acts.forEach(function(ac){ac.topic=t.id;ac.topicName=t.title;a.push(ac);});});
  return a;
})();

var TRAPS = {
  article:{name:"Article Omission",tip:"English needs 'a/an/the' before countable nouns. Turkish doesn't have articles."},
  thirdPerson:{name:"Third Person -s",tip:"He/she/it needs an 's' on the verb: 'He eats', not 'He eat'."},
  svo:{name:"SOV vs SVO Word Order",tip:"English is Subject-Verb-Object. Turkish is Subject-Object-Verb."},
  possessive:{name:"Possessive Suffixes",tip:"English puts 'my/your/his/her' before the noun. Turkish adds a suffix."},
  plural:{name:"Plural Marking",tip:"English uses -s/-es for plurals. Watch irregular: foot→feet, tooth→teeth."},
  preposition:{name:"Preposition Errors",tip:"English has separate prepositions (in/on/at). Turkish uses case suffixes."},
  vowel:{name:"Vowel Sounds",tip:"English distinguishes long/short vowels. Turkish has no such distinction."},
  th:{name:"TH Sound",tip:"/θ/ and /ð/ don't exist in Turkish. Put tongue between teeth for 'think' and 'this'."},
  w:{name:"W vs V",tip:"'W' is different from 'V'. Round your lips for 'W' like 'water'. Turkish has no /w/."},
  thereIs:{name:"There is/are",tip:"Use 'There is' (singular) or 'There are' (plural) for existence. Turkish uses 'var'."},
  uncountable:{name:"Count/Uncount Nouns",tip:"Some nouns (milk, water, sugar) don't have plurals. Use 'much' not 'many'."},
  continuous:{name:"Present Continuous",tip:"'I am eating' describes action now. Turkish uses a single present tense (-yor)."},
  doDoes:{name:"Auxiliary Verbs",tip:"English questions use 'do/does'. 'Do you?' not 'You do?' Turkish has no auxiliary."},
  comparison:{name:"Comparatives",tip:"Short adjectives: -er (bigger). Long adjectives: more (more beautiful). Turkish uses 'daha'."},
  adjectiveOrder:{name:"Adjective Order",tip:"English order: opinion-size-age-color-material-noun. Turkish is more flexible."},
  imperative:{name:"Imperatives",tip:"English commands use bare verb: 'Open the book!' Turkish uses infinitive: 'Kitabı aç!'"},
  vowelHarmony:{name:"Vowel Harmony",tip:"Turkish adds extra vowel sounds to English words. 'Book' → 'book-uh'. Keep vowels short."},
  consonantCluster:{name:"Consonant Clusters",tip:"Turkish can't handle 3+ consonants together. 'Strengths' → practice syllable by syllable."},
  questionInversion:{name:"Question Inversion",tip:"English moves the verb before the subject in questions. 'You can swim' → 'Can you swim?'"},
  auxiliaryDeletion:{name:"Missing Auxiliaries",tip:"English needs do/does/did for questions. 'Do you like music?' not 'You like music?'"}
};

var BADGES = [
  {id:"first",name:"First Steps",desc:"Complete first activity",xp:0,icon:"🌟",check:function(s){return s.doneCount>=1;}},
  {id:"starter",name:"Ready Starter",desc:"Complete all activities in any 1 topic",xp:50,icon:"🚀",check:function(s){for(var i=1;i<=TOTAL_TOPICS;i++){var t=getTopicData(i);if(t&&s.topics[i]&&s.topics[i].done===t.acts.length)return 1;}}},
  {id:"halfway",name:"Halfway Hero",desc:"Complete 100 activities",xp:200,icon:"💪",check:function(s){return s.doneCount>=100;}},
  {id:"completionist",name:"Oracy Master",desc:"Complete all "+TOTAL_ACTIVITIES+" activities",xp:500,icon:"🏆",check:function(s){return s.doneCount>=TOTAL_ACTIVITIES;}},
  {id:"streak3",name:"On Fire!",desc:"3-day streak",xp:100,icon:"🔥",check:function(s){return s.streak>=3;}},
  {id:"streak7",name:"Weekly Warrior",desc:"7-day streak",xp:300,icon:"⚡",check:function(s){return s.streak>=7;}},
  {id:"xp100",name:"Bronze Speaker",desc:"Earn 100 XP",xp:0,icon:"🥉",check:function(s){return s.xp>=100;}},
  {id:"xp500",name:"Silver Speaker",desc:"Earn 500 XP",xp:0,icon:"🥈",check:function(s){return s.xp>=500;}},
  {id:"xp1000",name:"Gold Speaker",desc:"Earn 1000 XP",xp:0,icon:"🥇",check:function(s){return s.xp>=1000;}},
  {id:"alltopics",name:"Topic Explorer",desc:"Start at least 1 activity in every topic",xp:150,icon:"🗺️",check:function(s){var c=0;for(var i=1;i<=TOTAL_TOPICS;i++){if(s.topics[i]&&s.topics[i].started>0)c++;}return c===TOTAL_TOPICS;}}
];

var LEVELS = [0,100,250,500,800,1200,1700,2300,3000,4000,5500];

var TOTAL_TOPICS = 30;
var TOTAL_ACTIVITIES = 275;

function getTopicData(topicId){
  if(topicId>=1&&topicId<=10) return DATA1[topicId-1];
  if(topicId>=11&&topicId<=20) return DATA2[topicId-11];
  if(topicId>=21&&topicId<=24) return DATA3[topicId-21];
  if(topicId===25) return DATA_TWISTERS[0];
  if(topicId===26) return DATA_CHANTS[0];
  if(topicId===27) return DATA_ROLEPLAYS[0];
  if(topicId>=28&&topicId<=30) return DATA_SEASONAL[topicId-28];
  return null;
}

function getState(){
  try{
    var s=JSON.parse(localStorage.getItem("esl_oracy_v3"));
    if(s) return s;
  }catch(e){}
  return defaultState();
}
function defaultState(){
  var s={xp:0,streak:0,lastDate:"",doneCount:0,topics:{},activities:{},badges:{},srs:{},daily:{date:"",id:-1,completed:false}};
  for(var i=1;i<=TOTAL_TOPICS;i++) s.topics[i]={done:0,started:0};
  return s;
}
function saveState(s){try{localStorage.setItem("esl_oracy_v3",JSON.stringify(s));}catch(e){}}

function calcLevel(xp){
  for(var i=LEVELS.length-1;i>=0;i--) if(xp>=LEVELS[i]) return i;
  return 0;
}

function addXP(n){
  var s=getState();
  s.xp+=n;
  var oldLvl=calcLevel(s.xp-n);
  var newLvl=calcLevel(s.xp);
  saveState(s);
  if(newLvl>oldLvl){showToast("Level Up! You are now level "+newLvl+"!","success");confetti();}
  return s.xp;
}

function markComplete(actId,topicId){
  var s=getState();
  if(!s.activities[actId]) s.activities[actId]={done:false,rating:0,attempts:0};
  if(!s.activities[actId].done){
    s.activities[actId].done=true;
    s.activities[actId].attempts++;
    s.doneCount++;
    s.topics[topicId].done++;
    var today=new Date().toDateString();
    if(s.lastDate!==today){
      var yesterday=new Date(Date.now()-86400000).toDateString();
      if(s.lastDate===yesterday) s.streak++; else s.streak=1;
      s.lastDate=today;
    }
    addXP(10);
    checkBadges();
    saveState(s);
    showToast("+10 XP! Activity completed!","success");
    if(s.streak>1) showToast(s.streak+" day streak!","info");
  }
  return s;
}

function checkBadges(){
  var s=getState();
  var unlocked=[];
  BADGES.forEach(function(b){
    if(!s.badges[b.id]&&b.check(s)){
      s.badges[b.id]=true;
      unlocked.push(b);
      addXP(b.xp);
    }
  });
  saveState(s);
  unlocked.forEach(function(b){
    showToast("Badge Unlocked: "+b.name+"!","success");
  });
}

function srsUpdate(actId,quality){
  var s=getState();
  if(!s.srs[actId]) s.srs[actId]={ef:2.5,interval:1,reps:0,next:Date.now()};
  var card=s.srs[actId];
  if(quality<3){
    card.reps=0;
    card.interval=1;
  }else{
    if(card.reps===0) card.interval=1;
    else if(card.reps===1) card.interval=6;
    else card.interval=Math.round(card.interval*card.ef);
    card.reps++;
  }
  card.ef=card.ef+(0.1-(5-quality)*(0.08+(5-quality)*0.02));
  if(card.ef<1.3) card.ef=1.3;
  card.next=Date.now()+card.interval*86400000;
  card.quality=quality;
  saveState(s);
  return card;
}

function srsDue(){
  var s=getState();
  var now=Date.now();
  var due=[];
  ACTIVITIES.forEach(function(a){
    var card=s.srs[a.topic+"-"+a.ti];
    if(card&&card.next<=now) due.push(a);
  });
  return due;
}

// UI
function showView(view){
  document.querySelectorAll(".view").forEach(function(el){el.style.display="none";});
  var el=document.getElementById("view-"+view);
  if(el) el.style.display="block";
}

function renderSidebar(){
  var sb=document.getElementById("sidebar");
  var h='<div class="sidebar-header"><h2>📚 Topics</h2><button onclick="toggleSidebar()" class="btn-icon" aria-label="Close sidebar">✕</button></div>';
  h+='<div class="sidebar-search"><input type="text" id="searchInput" placeholder="Search activities..." oninput="searchActivities(this.value)" aria-label="Search activities"></div>';
  h+='<ul class="topic-list">';
  for(var i=1;i<=TOTAL_TOPICS;i++){
    var topic=getTopicData(i);
    var s=getState();
    var st=s.topics[i]||{done:0,started:0};
    var totalActs=topic?topic.acts.length:0;
    h+='<li><button onclick="loadTopic('+i+')" class="topic-btn">'+(topic?topic.title:"Topic "+i)+' <span class="badge">'+st.done+'/'+totalActs+'</span></button></li>';
  }
  h+='</ul>';
  h+='<div class="sidebar-footer"><button onclick="showView(\'dashboard\');renderDashboard()" class="btn btn-outline w-full">📊 Parent Dashboard</button></div>';
  sb.innerHTML=h;
}

function renderHome(){
  var s=getState();
  var lvl=calcLevel(s.xp);
  var nextXp=LEVELS[Math.min(lvl+1,LEVELS.length-1)];
  var prevXp=LEVELS[lvl];
  var pct=nextXp?Math.min(100,Math.floor((s.xp-prevXp)/(nextXp-prevXp)*100)):100;
  var due=srsDue().length;
  var h='<div class="home-hero"><h1>🎯 ESL Oracy Engine</h1><p class="lead">'+TOTAL_ACTIVITIES+' speaking activities for A1/A2 young learners</p></div>';
  h+='<div class="stats-grid"><div class="stat-card"><div class="stat-value">'+s.xp+'</div><div class="stat-label">Total XP</div></div>';
  h+='<div class="stat-card"><div class="stat-value">'+s.doneCount+'/'+TOTAL_ACTIVITIES+'</div><div class="stat-label">Completed</div></div>';
  h+='<div class="stat-card"><div class="stat-value">🔥 '+s.streak+'</div><div class="stat-label">Day Streak</div></div>';
  h+='<div class="stat-card"><div class="stat-value">'+due+'</div><div class="stat-label">Due for Review</div></div></div>';
  h+='<div class="xp-bar-wrap"><div class="xp-bar"><div class="xp-fill" style="width:'+pct+'%"></div></div><div class="xp-label">Level '+lvl+' · '+s.xp+' / '+nextXp+' XP</div></div>';
  h+='<div class="home-actions"><button onclick="loadTopic(1)" class="btn btn-primary btn-lg">Start Learning 🚀</button>';
  h+='<button onclick="showFlashcards()" class="btn btn-secondary btn-lg">Flashcards 🃏</button>';
  h+='<button onclick="loadDaily()" class="btn btn-outline btn-lg">Daily Challenge ⭐</button></div>';
  h+='<div class="topics-grid">';
  for(var i=1;i<=TOTAL_TOPICS;i++){
    var topic=getTopicData(i);
    var st=s.topics[i]||{done:0,started:0};
    var totalActs=topic?topic.acts.length:0;
    h+='<div class="topic-card" onclick="loadTopic('+i+')"><div class="topic-card-title">'+(topic?topic.title:"Topic "+i)+'</div><div class="topic-card-progress"><div class="progress-bar"><div class="progress-fill" style="width:'+(totalActs?Math.round(st.done/totalActs*100):0)+'%"></div></div><span>'+st.done+'/'+totalActs+'</span></div></div>';
  }
  h+='</div>';
  var el=document.getElementById("view-home");
  if(el) el.innerHTML=h;
}

function loadTopic(topicId){
  var data=getTopicData(topicId);
  if(!data){showToast("Topic not found","error");return;}
  showView("topic");
  var s=getState();
  var h='<div class="topic-header"><button onclick="showView(\'home\');renderHome()" class="btn btn-ghost">← Back</button><h2>'+data.title+'</h2></div>';
  h+='<div class="activities-list">';
  data.acts.forEach(function(ac,i){
    var aid=topicId+"-"+ac.ti;
    var done=s.activities[aid]&&s.activities[aid].done;
    h+='<div class="activity-card'+(done?" done":"")+'" onclick="openActivity('+topicId+','+i+')"><div class="act-emoji">'+ac.em+'</div><div class="act-info"><div class="act-title">'+ac.ti+'</div><div class="act-meta">'+ac.tp+' · '+TRAPS[ac.tp].name+'</div></div>'+(done?'<span class="act-check">✅</span>':'<span class="act-check">🔵</span>')+'</div>';
  });
  h+='</div>';
  document.getElementById("view-topic").innerHTML=h;
}

function openActivity(topicId,actIdx){
  var data=getTopicData(topicId);
  var ac=data.acts[actIdx];
  showView("activity");
  var aid=topicId+"-"+ac.ti;
  var s=getState();
  if(!s.activities[aid]){
    s.topics[topicId].started=(s.topics[topicId].started||0)+1;
    saveState(s);
  }
  var done=s.activities[aid]&&s.activities[aid].done;
  var h='<div class="activity-header"><button onclick="loadTopic('+topicId+')" class="btn btn-ghost">← Topic</button><h2>'+ac.ti+'</h2></div>';
  h+='<div class="activity-body"><div class="act-section script-section"><h3>📜 Script</h3><div class="script-content">'+ac.sc+'</div><button onclick="speakText(\''+escapeStr(ac.sc.replace(/<br>/g,". ").replace(/<[^>]+>/g,""))+'\')" class="btn btn-sm">🔊 Listen</button></div>';
  h+='<div class="act-section speak-section"><h3>🎤 Speaking</h3><p>'+ac.sp+'</p><div class="recording-controls"><button id="recBtn" onclick="toggleRecording()" class="btn btn-rec">⏺ Record</button><button onclick="playRecording()" class="btn btn-sm" id="playBtn" disabled>▶ Play</button><span id="recStatus">Ready</span></div></div>';
  h+='<div class="act-section game-section"><h3>🎮 Quick Game</h3><p>'+ac.gm+'</p><div id="gameArea"></div><button onclick="startGame('+topicId+','+actIdx+')" class="btn btn-primary">Start Game</button></div>';
  h+='<div class="act-section trap-section"><h3>⚠️ Turkish Trap</h3><p><strong>'+TRAPS[ac.tp].name+'</strong></p><p>'+ac.tip+'</p></div>';
  h+='<div class="act-section tip-section"><h3>💡 Tip</h3><p>'+TRAPS[ac.tp].tip+'</p></div>';
  h+='<div class="act-actions"><button onclick="markAndContinue('+topicId+',\''+escapeStr(ac.ti)+'\')" class="btn btn-success">✅ Mark Complete (+10 XP)</button>';
  h+='<button onclick="openSRS('+topicId+','+actIdx+')" class="btn btn-outline">🧠 Review (SRS)</button></div></div>';
  document.getElementById("view-activity").innerHTML=h;
  renderGame(topicId,actIdx);
}

function escapeStr(s){return s.replace(/'/g,"\\'").replace(/"/g,"&quot;");}

var recording=false,mediaRecorder=null,audioChunks=[],recordedBlob=null;

function toggleRecording(){
  if(recording){stopRecording();return;}
  if(!navigator.mediaDevices){showToast("Recording not supported","error");return;}
  navigator.mediaDevices.getUserMedia({audio:true}).then(function(stream){
    mediaRecorder=new MediaRecorder(stream);
    audioChunks=[];
    mediaRecorder.ondataavailable=function(e){if(e.data.size>0)audioChunks.push(e.data);};
    mediaRecorder.onstop=function(){
      recordedBlob=new Blob(audioChunks,{type:"audio/webm"});
      document.getElementById("playBtn").disabled=false;
      showToast("Recording saved!","success");
    };
    mediaRecorder.start();
    recording=true;
    document.getElementById("recBtn").textContent="⏹ Stop";
    document.getElementById("recStatus").textContent="Recording...";
  }).catch(function(){showToast("Microphone access denied","error");});
}

function stopRecording(){
  if(mediaRecorder&&mediaRecorder.state!=="inactive"){mediaRecorder.stop();}
  recording=false;
  if(mediaRecorder&&mediaRecorder.stream){
    mediaRecorder.stream.getTracks().forEach(function(t){t.stop();});
  }
  var btn=document.getElementById("recBtn");
  var status=document.getElementById("recStatus");
  if(btn) btn.textContent="⏺ Record";
  if(status) status.textContent="Saved";
}

function playRecording(){
  if(!recordedBlob){showToast("No recording to play","error");return;}
  var url=URL.createObjectURL(recordedBlob);
  var audio=new Audio(url);
  audio.play();
}

function speakText(text){
  if(!window.speechSynthesis){showToast("TTS not supported","error");return;}
  window.speechSynthesis.cancel();
  var u=new SpeechSynthesisUtterance(text);
  u.lang="en-US";
  u.rate=0.9;
  u.pitch=1;
  window.speechSynthesis.speak(u);
}

function markAndContinue(topicId,actTi){
  markComplete(topicId+"-"+actTi,topicId);
  loadTopic(topicId);
}

// Game system
var gameActive=false,gameScore=0,currentTopicId=0,currentActIdx=0;

function renderGame(topicId,actIdx){
  var data=getTopicData(topicId);
  var ac=data.acts[actIdx];
  if(!ac) return;
  var el=document.getElementById("gameArea");
  if(!el) return;
  el.innerHTML='<p style="color:var(--text2);font-size:.85rem">Press Start Game to begin.</p>';
}

function startGame(topicId,actIdx){
  var data=getTopicData(topicId);
  var ac=data.acts[actIdx];
  if(!ac) return;
  currentTopicId=topicId;
  currentActIdx=actIdx;
  var el=document.getElementById("gameArea");
  var gm=ac.gm||"Answer the question!";
  var hasYesNo=/yes|no/i.test(gm);
  var hasNum=/\d+/.test(gm);
  el.innerHTML="<div class='game-active'><p class='game-prompt'>"+gm+"</p><div class='game-input'>";
  if(hasYesNo){
    el.innerHTML+="<button onclick='gameAnswerYes()' class='btn btn-success btn-lg'>YES ✅</button><button onclick='gameAnswerNo()' class='btn btn-danger btn-lg'>NO ❌</button>";
  }else if(hasNum){
    el.innerHTML+="<input type='number' id='gameNumInput' class='game-num-input' placeholder='Enter number...'><button onclick='gameCheckNum()' class='btn btn-primary'>Submit</button>";
  }else{
    el.innerHTML+="<input type='text' id='gameTextInput' class='game-text-input' placeholder='Type your answer...'><button onclick='gameCheckText()' class='btn btn-primary'>Submit</button>";
  }
  el.innerHTML+="</div><div id='gameResult'></div></div>";
  gameActive=true;
}

function gameAnswerYes(){gameResult();}
function gameAnswerNo(){gameResult();}

function gameCheckNum(){gameResult();}

function gameCheckText(){gameResult();}

function gameResult(){
  var el=document.getElementById("gameResult");
  if(!el) return;
  gameScore+=10;
  el.innerHTML='<p style="color:var(--green);font-weight:700">Well done! +10 points</p>';
  addXP(5);
  showToast("+5 XP","success");
  el.innerHTML+='<div style="margin-top:8px"><button onclick="startGame('+currentTopicId+','+currentActIdx+')" class="btn btn-sm btn-outline">Play Again</button></div>';
  gameActive=false;
}

function openSRS(topicId,actIdx){
  showView("srs");
  var data=getTopicData(topicId);
  var ac=data.acts[actIdx];
  var aid=topicId+"-"+ac.ti;
  var s=getState();
  var card=s.srs[aid];
  var h='<div class="srs-header"><button onclick="openActivity('+topicId+','+actIdx+')" class="btn btn-ghost">← Back</button><h2>🧠 Spaced Repetition</h2></div>';
  h+='<div class="srs-card"><div class="srs-prompt">'+ac.sc.replace(/<br>/g,"<br>")+'</div><div class="srs-speak">'+ac.sp+'</div></div>';
  h+='<div class="srs-quality"><p>How well did you remember?</p><div class="quality-buttons">';
  h+='<button onclick="srsRate(\''+aid+'\',0,'+topicId+','+actIdx+')" class="btn btn-quality q0">😵 Forgot</button>';
  h+='<button onclick="srsRate(\''+aid+'\',3,'+topicId+','+actIdx+')" class="btn btn-quality q3">🤔 Hard</button>';
  h+='<button onclick="srsRate(\''+aid+'\',4,'+topicId+','+actIdx+')" class="btn btn-quality q4">😊 Good</button>';
  h+='<button onclick="srsRate(\''+aid+'\',5,'+topicId+','+actIdx+')" class="btn btn-quality q5">🎯 Perfect</button></div></div>';
  h+='<div class="srs-stats"><p>Previous: '+(card?"EF "+card.ef.toFixed(1)+" · Interval "+card.interval+"d":"First review")+'</p></div>';
  document.getElementById("view-srs").innerHTML=h;
}

function srsRate(aid,quality,topicId,actIdx){
  srsUpdate(aid,quality);
  showToast("Review saved!","success");
  var due=srsDue().length;
  if(due>0){showToast(due+" activities due for review","info");}
  openActivity(topicId,actIdx);
}

function showFlashcards(){
  initFlashcards();
  showView("flashcards");
  var s=getState();
  var due=srsDue();
  var list=due.length?due:ACTIVITIES;
  var h='<div class="fc-header"><button onclick="showView(\'home\');renderHome()" class="btn btn-ghost">← Back</button><h2>🃏 Flashcards</h2></div>';
  h+='<div class="fc-counter"><span id="fcIdx">1</span>/'+list.length+'</div>';
  if(list.length){
    var ac=list[0];
    h+='<div class="fc-card" id="fcCard" onclick="flipCard()"><div class="fc-front"><div class="fc-emoji">'+ac.em+'</div><div class="fc-title">'+ac.ti+'</div><p class="fc-hint">Tap to reveal</p></div><div class="fc-back"><div class="fc-script">'+ac.sc+'</div><div class="fc-trap"><strong>'+TRAPS[ac.tp].name+'</strong><br>'+ac.tip+'</div></div></div>';
    h+='<div class="fc-controls"><button onclick="prevCard()" class="btn btn-outline">◀ Prev</button><button onclick="nextCard()" class="btn btn-primary">Next ▶</button></div>';
    h+='<div class="fc-quality"><button onclick="fcRate(0)" class="btn btn-quality q0">😵</button><button onclick="fcRate(3)" class="btn btn-quality q3">🤔</button><button onclick="fcRate(4)" class="btn btn-quality q4">😊</button><button onclick="fcRate(5)" class="btn btn-quality q5">🎯</button></div>';
  }else{
    h+="<p>No flashcards to review!</p>";
  }
  document.getElementById("view-flashcards").innerHTML=h;
}

var fcIdx=0,fcList=[],fcFlipped=false;

function initFlashcards(){
  var s=getState();
  var due=srsDue();
  fcList=due.length?due:ACTIVITIES.slice(0);
  fcIdx=0;
  fcFlipped=false;
}
function flipCard(){
  fcFlipped=!fcFlipped;
  var el=document.getElementById("fcCard");
  if(el) el.classList.toggle("fc-flipped",fcFlipped);
}
function nextCard(){
  if(fcIdx<fcList.length-1) fcIdx++;
  else fcIdx=0;
  fcFlipped=false;
  renderFlashcard();
}
function prevCard(){
  if(fcIdx>0) fcIdx--;
  else fcIdx=fcList.length-1;
  fcFlipped=false;
  renderFlashcard();
}
function fcRate(quality){
  if(fcList.length){
    var ac=fcList[fcIdx];
    srsUpdate(ac.topic+"-"+ac.ti,quality);
    showToast("Rated: "+["Forgot","","","Hard","Good","Perfect"][quality],"info");
    nextCard();
  }
}
function renderFlashcard(){
  if(!fcList.length){showToast("No cards","error");return;}
  var ac=fcList[fcIdx];
  var el=document.getElementById("fcCard");
  var idxEl=document.getElementById("fcIdx");
  if(el){
    el.classList.remove("fc-flipped");
    el.innerHTML='<div class="fc-front"><div class="fc-emoji">'+ac.em+'</div><div class="fc-title">'+ac.ti+'</div><p class="fc-hint">Tap to reveal</p></div><div class="fc-back"><div class="fc-script">'+ac.sc+'</div><div class="fc-trap"><strong>'+TRAPS[ac.tp].name+'</strong><br>'+ac.tip+'</div></div>';
  }
  if(idxEl) idxEl.textContent=fcIdx+1;
}

// Dashboard
function renderDashboard(){
  showView("dashboard");
  var s=getState();
  var lvl=calcLevel(s.xp);
  var h='<div class="dash-header"><button onclick="showView(\'home\');renderHome()" class="btn btn-ghost">← Home</button><h2>📊 Parent Dashboard</h2></div>';
  h+='<div class="dash-section"><h3>Progress Overview</h3><div class="dash-grid"><div class="dash-stat"><label>Total XP</label><span>'+s.xp+'</span></div>';
  h+='<div class="dash-stat"><label>Level</label><span>'+lvl+'</span></div>';
  h+='<div class="dash-stat"><label>Activities Done</label><span>'+s.doneCount+'/'+TOTAL_ACTIVITIES+'</span></div>';
  h+='<div class="dash-stat"><label>Streak</label><span>'+s.streak+' days</span></div></div></div>';
  h+='<div class="dash-section"><h3>Topic Progress</h3><div class="dash-topics">';
  for(var i=1;i<=TOTAL_TOPICS;i++){
    var topic=getTopicData(i);
    var st=s.topics[i]||{done:0,started:0};
    var totalActs=topic?topic.acts.length:0;
    h+='<div class="dash-topic-row"><span>'+(topic?topic.title:"T"+i)+'</span><div class="dash-bar"><div class="dash-fill" style="width:'+(totalActs?Math.round(st.done/totalActs*100):0)+'%"></div></div><span>'+st.done+'/'+totalActs+'</span></div>';
  }
  h+='</div></div>';
  h+='<div class="dash-section"><h3>Badges ('+Object.keys(s.badges).length+'/'+BADGES.length+')</h3><div class="dash-badges">';
  BADGES.forEach(function(b){
    h+='<div class="badge-card'+(s.badges[b.id]?" unlocked":" locked")+'"><span class="badge-icon">'+(s.badges[b.id]?b.icon:"🔒")+'</span><span class="badge-name">'+b.name+'</span></div>';
  });
  h+='</div></div>';
  h+='<div class="dash-section"><h3>SRS Stats</h3><p>Cards tracked: '+Object.keys(s.srs).length+'</p><p>Due for review: '+srsDue().length+'</p></div>';
  h+='<div class="dash-section"><h3>Export / Reset</h3><button onclick="exportData()" class="btn btn-outline">📥 Export Data</button> ';
  h+='<button onclick="if(confirm(\'Reset all progress?\')){localStorage.removeItem(\'esl_oracy_v3\');location.reload();}" class="btn btn-danger">🗑️ Reset All</button></div>';
  document.getElementById("view-dashboard").innerHTML=h;
}

function exportData(){
  var s=getState();
  var blob=new Blob([JSON.stringify(s,null,2)],{type:"application/json"});
  var a=document.createElement("a");
  a.href=URL.createObjectURL(blob);
  a.download="esl_oracy_backup.json";
  a.click();
  showToast("Data exported!","success");
}

function loadDaily(){
  showView("daily");
  var s=getState();
  var today=new Date().toDateString();
  if(s.daily.date!==today){
    s.daily.date=today;
    s.daily.id=Math.floor(Math.random()*ACTIVITIES.length);
    s.daily.completed=false;
    saveState(s);
  }
  var ac=ACTIVITIES[s.daily.id];
  var h='<div class="daily-header"><button onclick="showView(\'home\');renderHome()" class="btn btn-ghost">← Home</button><h2>⭐ Daily Challenge</h2></div>';
  h+='<div class="daily-card'+(s.daily.completed?" done":"")+'"><div class="daily-emoji">'+ac.em+'</div><h3>'+ac.ti+'</h3><p><strong>Topic:</strong> '+ac.topicName+'</p><div class="daily-script">'+ac.sc+'</div><p class="daily-speak">'+ac.sp+'</p>';
  if(!s.daily.completed){
    h+='<button onclick="completeDaily()" class="btn btn-success btn-lg">⭐ Complete Challenge (+25 XP)</button></div>';
  }else{
    h+='<p class="daily-done">✅ Completed today! Come back tomorrow for a new challenge.</p>';
  }
  h+='<div class="daily-trap"><strong>Focus:</strong> '+TRAPS[ac.tp].name+' — '+ac.tip+'</div>';
  document.getElementById("view-daily").innerHTML=h;
}

function completeDaily(){
  var s=getState();
  if(!s.daily.completed){
    s.daily.completed=true;
    saveState(s);
    addXP(25);
    showToast("+25 XP Daily Challenge Complete!","success");
    confetti();
    loadDaily();
  }
}

// Search
function searchActivities(q){
  if(!q||q.length<2){renderHome();return;}
  q=q.toLowerCase();
  var results=[];
  ACTIVITIES.forEach(function(ac){
    if(ac.ti.toLowerCase().indexOf(q)!==-1||(ac.topicName&&ac.topicName.toLowerCase().indexOf(q)!==-1)||ac.sp.toLowerCase().indexOf(q)!==-1){
      results.push(ac);
    }
  });
  var h='<div class="search-header"><button onclick="showView(\'home\');renderHome()" class="btn btn-ghost">← Back</button><h2>Search: "'+q+'"</h2><span>'+results.length+' results</span></div><div class="activities-list">';
  results.forEach(function(ac){
    h+='<div class="activity-card" onclick="loadTopic('+ac.topic+')"><div class="act-emoji">'+ac.em+'</div><div class="act-info"><div class="act-title">'+ac.ti+'</div><div class="act-meta">'+ac.topicName+'</div></div></div>';
  });
  h+='</div>';
  var el=document.getElementById("view-search");
  if(el){el.innerHTML=h;showView("search");}
}

function toggleSidebar(){
  document.getElementById("sidebar").classList.toggle("open");
}

function toggleDark(){
  var isDark=document.documentElement.getAttribute("data-theme")==="dark";
  document.documentElement.setAttribute("data-theme",isDark?"light":"dark");
  localStorage.setItem("esl_oracy_dark",isDark?"":"1");
  var meta=document.querySelector('meta[name="theme-color"]');
  if(meta) meta.content=isDark?"#f8fafc":"#0f172a";
}

// Toast
function showToast(msg,type){
  type=type||"info";
  var container=document.getElementById("toast-container");
  if(!container){
    container=document.createElement("div");
    container.id="toast-container";
    container.style.cssText="position:fixed;bottom:20px;right:20px;z-index:10000;display:flex;flex-direction:column;gap:8px;";
    document.body.appendChild(container);
  }
  var t=document.createElement("div");
  t.className="toast toast-"+type;
  t.textContent=msg;
  t.style.cssText="padding:12px 20px;border-radius:12px;color:#fff;font-weight:600;animation:fadeIn 0.3s;box-shadow:0 4px 12px rgba(0,0,0,0.2);"+(type==="success"?"background:#22c55e;":type==="error"?"background:#ef4444;":"background:#3b82f6;");
  container.appendChild(t);
  setTimeout(function(){t.style.opacity="0";t.style.transition="opacity 0.3s";setTimeout(function(){t.remove();},300);},3000);
}

function confetti(){
  for(var i=0;i<30;i++){
    (function(){
      var c=document.createElement("div");
      c.style.cssText="position:fixed;width:10px;height:10px;border-radius:50%;background:hsl("+Math.random()*360+",100%,50%);left:"+(Math.random()*100)+"vw;top:-10px;animation:confetti-fall "+(1+Math.random()*2)+"s linear forwards;z-index:9999;pointer-events:none;";
      document.body.appendChild(c);
      setTimeout(function(){c.remove();},3000);
    })();
  }
}

// Init
function init(){
  var dark=localStorage.getItem("esl_oracy_dark");
  var useDark=dark==="1"||(!dark&&window.matchMedia("(prefers-color-scheme:dark)").matches);
  document.documentElement.setAttribute("data-theme",useDark?"dark":"light");
  renderSidebar();
  renderHome();
  showView("home");
  initFlashcards();
  var s=getState();
  var today=new Date().toDateString();
  if(s.lastDate){
    var yesterday=new Date(Date.now()-86400000).toDateString();
    if(s.lastDate!==today&&s.lastDate!==yesterday){
      s.streak=0;
      saveState(s);
    }
  }
  document.addEventListener("keydown",function(e){
    if(e.key==="Escape"){showView("home");renderHome();}
    if(e.key==="s"&&e.ctrlKey){
      e.preventDefault();
      var si=document.getElementById("searchInput");
      if(si) si.focus();
    }
    if(e.key==="d"&&e.ctrlKey){e.preventDefault();toggleDark();}
    var fcView=document.getElementById("view-flashcards");
    if(fcView&&fcView.style.display!=="none"){
      if(e.key===" "){e.preventDefault();flipCard();}
      if(e.key==="ArrowRight"){e.preventDefault();nextCard();}
      if(e.key==="ArrowLeft"){e.preventDefault();prevCard();}
    }
  });
}
document.addEventListener("DOMContentLoaded",init);

