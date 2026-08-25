"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Lang="so"|"ba"|"ar";
type Question={q:string;options:string[];answer:number;tip:string;image?:string};
type ScoreRow={id:number;participant:string;score:number;total:number;language:string;durationSeconds:number;createdAt:string|number};

const copy={
 so:{start:"دەستپێکردنی تاقیکردنەوە",name:"ناوی بەشداربوو",nameHint:"ناوی خۆت بنووسە",timer:"کاتی ماوە",next:"دواتر",finish:"کۆتایی",contact:"دروستکەری بەرنامە",made:"دروستکراوە لەلایەن BAHRAM REKANI",call:"بۆ هەر پرسیارێک پەیوەندی بکە",retry:"دووبارە تاقیکردنەوە",code:"کۆدی بەڕێوەبەر بنووسە",locked:"ئەنجامەکەت تۆمارکرا. بۆ هەوڵی دووەم کۆدی بەڕێوەبەر پێویستە.",scores:"ئەنجامەکانی بەشداربووان",install:"دابەزاندنی بەرنامە",instagram:"ئینستاگرام",snapchat:"سناپچات",welcome:"بەخێربێیت بۆ تاقیکردنەوەی باران",sub:"٢٠ پرسیاری هەڕەمەکی · ٦٠ چرکە بۆ هەر پرسیارێک"},
 ba:{start:"دەستپێکرنا تاقیکرنێ",name:"ناڤێ بەشداربووی",nameHint:"ناڤێ خو بنڤیسە",timer:"دەمێ مای",next:"پاشتر",finish:"دوماهی",contact:"دروستکەرێ بەرنامێ",made:"هاتیە دروستکرن ژ لایێ BAHRAM REKANI",call:"بۆ هەر پرسیارەکێ پەیوەندی بکە",retry:"دووبارە تاقیکرن",code:"کۆدێ بەڕێوەبەری بنڤیسە",locked:"ئەنجاما تە هاتە تۆمارکرن. بۆ جارا دووێ کۆدێ بەڕێوەبەری پێدڤیە.",scores:"ئەنجامێن بەشداربوویان",install:"داگرتنا بەرنامێ",instagram:"ئینستاگرام",snapchat:"سناپچات",welcome:"ب خێر بێی بۆ تاقیکرنا باران",sub:"٢٠ پرسیارێن جودا · ٦٠ چرکە بۆ هەر پرسیارەکێ"},
 ar:{start:"بدء الاختبار",name:"اسم المشارك",nameHint:"اكتب اسمك",timer:"الوقت المتبقي",next:"التالي",finish:"إنهاء",contact:"صانع البرنامج",made:"صنع البرنامج BAHRAM REKANI",call:"لأي سؤال اتصل على",retry:"إعادة الاختبار",code:"أدخل رمز المدير",locked:"تم تسجيل نتيجتك. المحاولة الثانية تحتاج إلى رمز المدير.",scores:"نتائج المشاركين",install:"تثبيت التطبيق",instagram:"إنستغرام",snapchat:"سناب شات",welcome:"أهلاً بك في اختبار باران",sub:"٢٠ سؤالاً عشوائياً · ٦٠ ثانية لكل سؤال"}
};

const extras:Record<Lang,Question[]>={
 so:[
  {q:"ژمارەی فریاکەوتنی سەیارەی ئەمبولانس چییە؟",options:["١١٥","١٢٢","١٠٤"],answer:0,tip:"ژمارەی فریاکەوتن ١١٥ە."},
  {q:"پێش یارمەتیدانی بریندار، یەکەم کار چییە؟",options:["دڵنیابوون لە سەلامەتی شوێن","جوڵاندنی خێرای بریندار","پێدانی خواردنەوە"],answer:0,tip:"سەلامەتی خۆت و شوێنی ڕووداو یەکەم هەنگاوە."},
  {q:"کاتێک کەسێک هۆشی نییە و هەناسە نادات چی بکەیت؟",options:["CPR دەستپێبکە و فریاکەوتن بانگ بکە","ئاو پێبدە","بە تەنها بەجێیبهێڵە"],answer:0,tip:"فریاکەوتن بانگ بکە و CPR دەستپێبکە."},
  {q:"بۆ وەستاندنی خوێنڕژان چی بکەیت؟",options:["فشاری ڕاستەوخۆ لەسەر برین","برینەکە بشۆرەوە و بەجێیبهێڵە","هیچ مەکە"],answer:0,tip:"بە پارچەی پاک فشاری ڕاستەوخۆ بدە."},
  {q:"ئامێری ئاگرکوژێنەوەی جۆری C بۆ چییە؟",options:["ئامێری ئەلیکترۆنی و کارەبایی","تەنها دار","تەنها ئاگری کاغەز"],answer:0,tip:"جۆری C بۆ ئاگری کارەباییە."},
  {q:"لە دوای ڕووداوی هاتووچۆدا چ بکەیت؟",options:["شوێنەکە پارێزراو بکە و فریاکەوتن بانگ بکە","دەستبەجێ شوێنەکە جێبهێڵە","بریندار بە زۆر بجوڵێنە"],answer:0,tip:"شوێنەکە بپارێزە و یارمەتی پسپۆڕان بانگ بکە."}
 ],
 ba:[
  {q:"ژمارا فریاکەفتنا ئەمبولانسێ چە؟",options:["١١٥","١٢٢","١٠٤"],answer:0,tip:"ژمارا فریاکەفتنێ ١١٥ە."},
  {q:"بەری هاریکاریا برینداری، کارێ یەکەم چە؟",options:["پشتراستبوون ژ سلامەتیا جهی","زوی برینداری بجولینە","ئاڤێ بدە"],answer:0,tip:"سلامەتیا خو و جهێ رویدانێ یا یەکەمە."},
  {q:"ئەگەر کەسەک هشیاری نەبیت و هەناسە نەدەت چی بکەی؟",options:["CPR دەستپێبکە و فریاکەفتنێ بانگ بکە","ئاڤێ بدە","بتنێ بهێلە"],answer:0,tip:"فریاکەفتنێ بانگ بکە و CPR دەستپێبکە."},
  {q:"بۆ راوەستاندنا خوینێ چی بکەی؟",options:["فشارا راستەوخۆ لسەر برینێ","برینێ بشۆ و بهێلە","هیچ نەکە"],answer:0,tip:"ب پارچەیەکا پاقژ فشارێ بدە."},
  {q:"ئامیرێ ئاگركوژێن جۆرێ C بۆ چییە؟",options:["ئامیرێن ئەلیکترۆنی و کارەبایی","بتنێ دار","بتنێ کاغەز"],answer:0,tip:"جۆرێ C بۆ ئاگری کارەباییە."},
  {q:"پشتی رویدانا هاتووچۆیێ چی بکەی؟",options:["جهی بپارێزە و فریاکەفتنێ بانگ بکە","زوی جهی بهێلە","برینداری ب هێز بجولینە"],answer:0,tip:"جهی بپارێزە و هاریکاریا پسپۆڕان بانگ بکە."}
 ],
 ar:[
  {q:"ما رقم إسعاف الطوارئ؟",options:["١١٥","١٢٢","١٠٤"],answer:0,tip:"رقم إسعاف الطوارئ هو ١١٥."},
  {q:"ما أول خطوة قبل مساعدة المصاب؟",options:["التأكد من سلامة مكان الحادث","تحريك المصاب بسرعة","إعطاء المصاب شراباً"],answer:0,tip:"سلامتك وسلامة المكان تأتيان أولاً."},
  {q:"ماذا تفعل لشخص فاقد الوعي ولا يتنفس؟",options:["اتصل بالطوارئ وابدأ الإنعاش القلبي","أعطه الماء","اتركه وحده"],answer:0,tip:"اتصل بالطوارئ وابدأ الإنعاش القلبي الرئوي."},
  {q:"كيف توقف النزيف الخارجي؟",options:["ضغط مباشر بقطعة نظيفة","غسل الجرح وتركه","عدم فعل شيء"],answer:0,tip:"ضع ضغطاً مباشراً على الجرح."},
  {q:"مطفأة الحريق من الفئة C تستخدم لأي حريق؟",options:["الأجهزة الكهربائية والإلكترونية","الخشب فقط","الورق فقط"],answer:0,tip:"الفئة C مخصصة لحرائق الكهرباء."},
  {q:"ماذا تفعل بعد حادث مروري؟",options:["تؤمن المكان وتتصل بالطوارئ","تغادر المكان فوراً","تحرك المصاب بالقوة"],answer:0,tip:"أمّن المكان واطلب المساعدة المختصة."}
 ]
};

function shuffle<T>(items:T[]){const a=[...items];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}

export default function CompetitionApp({questions,ui}:{questions:Record<Lang,Question[]>;ui:Record<Lang,any>}){
 const [lang,setLang]=useState<Lang>("ba"),[screen,setScreen]=useState<"home"|"join"|"quiz"|"result"|"contact"|"gate"|"scoreGate"|"admin">("home"),[participant,setParticipant]=useState(""),[session,setSession]=useState<Question[]>([]),[index,setIndex]=useState(0),[selected,setSelected]=useState<number|null>(null),[score,setScore]=useState(0),[seconds,setSeconds]=useState(60),[code,setCode]=useState(""),[rows,setRows]=useState<ScoreRow[]>([]);
 const startedAt=useRef(0), submitted=useRef(false), t=copy[lang], q=session[index];
 const completed=useMemo(()=>typeof window!=="undefined"&&localStorage.getItem("baran-completed")==="1",[screen]);
 useEffect(()=>{if("serviceWorker" in navigator)navigator.serviceWorker.register("/sw.js")},[]);
 useEffect(()=>{if(screen!=="quiz"||selected!==null)return;const timer=setInterval(()=>setSeconds(s=>s<=1?(clearInterval(timer),0):s-1),1000);return()=>clearInterval(timer)},[screen,index,selected]);
 useEffect(()=>{if(screen==="quiz"&&seconds===0&&selected===null)setSelected(-1)},[seconds,screen,selected]);
 useEffect(()=>{if(screen!=="quiz"||selected===null)return;next()},[screen,index,selected]);
 function askStart(){setScreen(completed?"gate":"join")}
 function unlock(){if(code==="4848454"){localStorage.removeItem("baran-completed");setCode("");setScreen("join")}else setCode("")}
 function begin(){if(!participant.trim())return;const all=[...questions[lang],...extras[lang]];const picked=shuffle(all).slice(0,Math.min(20,all.length));const sessionWithBalancedAnswers=picked.map((item,i)=>{const target=i%3;const current=item.answer;if(current===target)return item;const options=[...item.options];[options[current],options[target]]=[options[target],options[current]];return {...item,options,answer:target}});setSession(sessionWithBalancedAnswers);setIndex(0);setSelected(null);setScore(0);setSeconds(60);submitted.current=false;startedAt.current=Date.now();setScreen("quiz")}
 function choose(i:number){if(selected!==null)return;setSelected(i);if(i===q.answer)setScore(s=>s+5)}
 async function finish(finalScore:number){if(submitted.current)return;submitted.current=true;localStorage.setItem("baran-completed","1");localStorage.setItem("baran-name",participant);const deviceId=localStorage.getItem("baran-device")||crypto.randomUUID();localStorage.setItem("baran-device",deviceId);fetch("/api/scores",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({participant,score:finalScore,total:100,language:lang,durationSeconds:Math.round((Date.now()-startedAt.current)/1000),deviceId})}).catch(()=>{});setScreen("result")}
 function next(){const final=score;if(index===session.length-1)finish(final);else{setIndex(i=>i+1);setSelected(null);setSeconds(60)}}
 async function admin(){if(code!=="4848454"){setCode("");return}const r=await fetch("/api/scores",{headers:{"x-admin-code":code}});if(r.ok){const all:ScoreRow[]=(await r.json()).scores;const today=new Intl.DateTimeFormat("en-CA",{timeZone:"Asia/Baghdad",year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date());const daily=all.filter(row=>new Intl.DateTimeFormat("en-CA",{timeZone:"Asia/Baghdad",year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date(row.createdAt))===today);setRows(daily);setScreen("admin")}setCode("")}
 return <main dir="rtl" className="competition">
  <header><button className="brand" onClick={()=>setScreen("home")}><img src="/baran-rekani-logo.webp" alt="Baran Rekani"/><span>BARAN<small>BAHRAM REKANI</small></span></button><select value={lang} onChange={e=>{setLang(e.target.value as Lang);setScreen("home")}}>{(Object.keys(ui) as Lang[]).map(l=><option key={l} value={l}>{ui[l].name}</option>)}</select></header>
  {screen==="home"&&<section className="coverHero"><div className="coverPanel"><span>BARAN REKANI DRIVING SCHOOL</span><h1>{t.welcome}</h1><p>{t.sub}</p><button className="coverPrimary" onClick={askStart}>{t.start}</button><button className="coverSecondary" onClick={()=>setScreen("contact")}>{t.contact}</button><button className="coverInstall" onClick={()=>{setCode("");setScreen("scoreGate")}}>★ {t.scores}</button><a className="homePhone" href="tel:07508062771">☎ {t.call}: <b dir="ltr">07508062771</b></a></div></section>}
  {screen==="join"&&<section className="centerCard"><img src="/baran-rekani-logo.webp" alt=""/><h2>{t.name}</h2><input autoFocus value={participant} onChange={e=>setParticipant(e.target.value)} placeholder={t.nameHint}/><button className="primary" onClick={begin}>{t.start}</button></section>}
  {screen==="gate"&&<section className="centerCard gate"><div className="lock">●</div><h2>{t.locked}</h2><input inputMode="numeric" type="password" value={code} onChange={e=>setCode(e.target.value)} placeholder={t.code}/><button className="primary" onClick={unlock}>{t.retry}</button><button className="secondary" onClick={()=>setScreen("home")}>{ui[lang].home}</button></section>}
  {screen==="quiz"&&q&&<section className="quiz"><div className="quiztop"><button onClick={()=>setScreen("home")}>×</button><span>{participant}</span><b>{index+1}/{session.length}</b></div><div className="timer"><i style={{width:`${seconds/60*100}%`}}/><b>{seconds}</b><small>{t.timer}</small></div><div className="qcard"><span className="qno">{String(index+1).padStart(2,"0")}</span><h2>{q.q}</h2>{q.image&&<img className="questionImage" src={q.image} alt="Driving question"/>}<div className="options">{q.options.map((o,i)=><button key={i} onClick={()=>choose(i)} className={selected===null?"":i===q.answer?"right":i===selected?"wrong":"dim"}><span>{String.fromCharCode(65+i)}</span>{o}{selected!==null&&i===q.answer&&<b>✓</b>}</button>)}</div>{selected!==null&&<div className={`feedback ${selected===q.answer?"good":"bad"}`}><b>{selected===q.answer?ui[lang].correct:ui[lang].wrong}</b><p>{q.tip}</p></div>}</div><button className="next" disabled={selected===null} onClick={next}>{index===session.length-1?t.finish:t.next} ←</button></section>}
  {screen==="result"&&<section className="result"><div className="trophy">★</div><p>{participant}</p><h2>{score}<small>/100</small></h2><div className="ring" style={{"--score":`${score*3.6}deg`} as React.CSSProperties}><span>{score}%</span></div><p>{score>=85?"✅ "+(lang==="ar"?"ناجح — مبروك!":lang==="so"?"✅ سەرکەوتوو — پیرۆزە!":"✅ سەرکەفتی — پیرۆز بێت!"):(lang==="ar"?"❌ لم تنجح — حاول مرة أخرى":lang==="so"?"❌ نەسەرکەوتوو — دووبارە هەوڵبدە":"❌ نەسەرکەفتی — دووبارە هەوڵ بدە")}</p><button className="primary" onClick={()=>setScreen("gate")}>{t.retry}</button><button className="secondary" onClick={()=>setScreen("home")}>{ui[lang].home}</button></section>}
  {screen==="contact"&&<section className="creator"><img src="/baran-rekani-logo.webp" alt="Baran Rekani"/><h2>{t.made}</h2><a href="https://www.instagram.com/boy.rekani?igsh=ZDYwcTgwdjR5cG0x" target="_blank" rel="noreferrer">◎ {t.instagram}</a><a href="https://www.snapchat.com/add/boy.rekani?share_id=OcbhuCGxSDc&locale=en-GB" target="_blank" rel="noreferrer">◉ {t.snapchat}</a><button className="secondary" onClick={()=>setScreen("home")}>{ui[lang].home}</button></section>}
  {screen==="scoreGate"&&<section className="centerCard gate"><div className="lock">★</div><h2>{t.scores}</h2><input autoFocus inputMode="numeric" type="password" value={code} onChange={e=>setCode(e.target.value)} placeholder={t.code}/><button className="primary" onClick={admin}>{t.scores}</button><button className="secondary" onClick={()=>setScreen("home")}>{ui[lang].home}</button></section>}
  {screen==="admin"&&<section className="admin"><div className="quiztop"><button onClick={()=>setScreen("home")}>×</button><h2>{t.scores}</h2><b>{rows.length}</b></div><div className="scoreTable">{rows.map((r,i)=><div key={r.id}><b>{i+1}</b><span>{r.participant}<small>{r.language}</small></span><strong>{r.score}/{r.total}</strong><time>{r.durationSeconds}s</time></div>)}</div></section>}
  <footer><b>{t.made}</b></footer>
 </main>
}

