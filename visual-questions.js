(() => {
  const svg = (body) => `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500"><rect width="800" height="500" rx="32" fill="#f7fafc"/>${body}</svg>`)}`;
  const images = {
    speed60: svg('<circle cx="400" cy="250" r="155" fill="white" stroke="#d62828" stroke-width="34"/><text x="400" y="290" text-anchor="middle" font-family="Arial,sans-serif" font-size="150" font-weight="700" fill="#18283a">60</text>'),
    stop: svg('<polygon points="400,65 505,108 550,215 505,322 400,365 295,322 250,215 295,108" fill="#d62828"/><text x="400" y="255" text-anchor="middle" font-family="Arial,sans-serif" font-size="78" font-weight="700" fill="white">STOP</text>'),
    yield: svg('<polygon points="400,65 650,425 150,425" fill="white" stroke="#d62828" stroke-width="35"/><text x="400" y="345" text-anchor="middle" font-family="Arial,sans-serif" font-size="54" font-weight="700" fill="#18283a">YIELD</text>'),
    noEntry: svg('<circle cx="400" cy="250" r="165" fill="#d62828"/><rect x="255" y="210" width="290" height="80" rx="15" fill="white"/>'),
    pedestrian: svg('<rect x="240" y="65" width="320" height="370" rx="18" fill="#1677c8"/><polygon points="400,120 515,350 285,350" fill="white"/><circle cx="400" cy="205" r="25" fill="#18283a"/><path d="M400 235 L365 295 L410 320 L455 285 M410 260 L450 320 M390 285 L350 335" stroke="#18283a" stroke-width="20" fill="none" stroke-linecap="round"/><path d="M300 365 H500 M325 395 H475" stroke="white" stroke-width="18"/>')
  };
  const question = (id, image, answer, ku, bad, ar, fa, tr, en) => ({id, image, visual:true, answer, ku, bad, ar, fa, tr, en});
  window.CURATED_VISUAL_QUESTIONS = [
    question('visual-speed-60', images.speed60, 0,
      {q:'ئەم نیشانەیە چی دەگەیەنێت؟',choices:['زۆرترین خێرایی ٦٠ کیلۆمەتر لە کاتژمێرێکدا','کەمترین خێرایی ٦٠','دووری ٦٠ مەتر']},
      {q:'ئەڤ نیشانە چی مانایە؟',choices:['زۆرترین خێرایی ٦٠ کیلۆمەتر د کاتژمێرێدا','کەمترین خێرایی ٦٠','مەودا ٦٠ مەتر']},
      {q:'ماذا تعني هذه العلامة؟',choices:['الحد الأقصى للسرعة ٦٠ كم/ساعة','الحد الأدنى للسرعة ٦٠','مسافة ٦٠ متراً']},
      {q:'این علامت چه معنایی دارد؟',choices:['حداکثر سرعت ۶۰ کیلومتر در ساعت','حداقل سرعت ۶۰','فاصلهٔ ۶۰ متر']},
      {q:'Bu işaret ne anlama gelir?',choices:['Azami hız saatte 60 km','Asgari hız 60','60 metre mesafe']},
      {q:'What does this sign mean?',choices:['Maximum speed 60 km/h','Minimum speed 60','Distance 60 metres']}),
    question('visual-stop', images.stop, 0,
      {q:'لەبەر ئەم نیشانەیە چی دەکەیت؟',choices:['تەواو دەوەستیت، پاشان بە سەلامەتی بەردەوام دەبیت','تەنها خێرایی کەم دەکەیت','هۆرن دەدەیت و بەردەوام دەبیت']},
      {q:'ل بەردەم ڤێ نیشانێ تو چی دکەی؟',choices:['تەواو راوەستی و پاشی ب سەلامەتی بەردەوام دبی','تەنێ خێرایی کەم دکەی','هۆرن ددی و بەردەوام دبی']},
      {q:'ماذا تفعل عند هذه العلامة؟',choices:['تتوقف تماماً ثم تتابع بأمان','تخفف السرعة فقط','تطلق البوق وتتابع']},
      {q:'در برابر این علامت چه می‌کنید؟',choices:['کاملاً توقف می‌کنید و سپس ایمن ادامه می‌دهید','فقط سرعت را کم می‌کنید','بوق می‌زنید و ادامه می‌دهید']},
      {q:'Bu işarette ne yaparsınız?',choices:['Tam durur, sonra güvenle devam edersiniz','Sadece yavaşlarsınız','Korna çalıp devam edersiniz']},
      {q:'What do you do at this sign?',choices:['Stop completely, then continue when safe','Only slow down','Honk and continue']}),
    question('visual-yield', images.yield, 0,
      {q:'ئەم نیشانەیە چی داوا دەکات؟',choices:['مافی پێشینە بە هاتووچۆی دیکە بدە','لە ڕێگەکەدا بوەستە','خێرایی زیاد بکە']},
      {q:'ئەڤ نیشانە چی دخوازیت؟',choices:['مافێ پێشینێ بدە هاتووچۆیا دی','ل رێکێ راوەستە','خێرایی زێدە بکە']},
      {q:'ماذا تطلب هذه العلامة؟',choices:['أعط الأفضلية لحركة المرور الأخرى','توقف في الطريق','زد السرعة']},
      {q:'این علامت چه می‌خواهد؟',choices:['به ترافیک دیگر حق تقدم بدهید','در راه توقف کنید','سرعت را زیاد کنید']},
      {q:'Bu işaret ne ister?',choices:['Diğer trafiğe yol verin','Yolda durun','Hızı artırın']},
      {q:'What does this sign require?',choices:['Give way to other traffic','Stop in the road','Increase speed']}),
    question('visual-no-entry', images.noEntry, 0,
      {q:'ئەم نیشانەیە چییە؟',choices:['چوونەژوورەوە قەدەغەیە','پارکینگ','ڕێگەی یەک ئاراستەیە']},
      {q:'ئەڤ نیشانە چییە؟',choices:['چوونەژوورەوە قەدەغەیە','پارکینگ','رێیا یەک ئاراستەیە']},
      {q:'ماذا تعني هذه العلامة؟',choices:['ممنوع الدخول','موقف سيارات','طريق باتجاه واحد']},
      {q:'این علامت چه معنایی دارد؟',choices:['ورود ممنوع','پارکینگ','جادهٔ یک‌طرفه']},
      {q:'Bu işaret ne demektir?',choices:['Giriş yasaktır','Otopark','Tek yönlü yol']},
      {q:'What does this sign mean?',choices:['No entry','Parking','One-way road']}),
    question('visual-pedestrian', images.pedestrian, 0,
      {q:'ئەم نیشانەیە چی دەگەیەنێت؟',choices:['شوێنی پەڕینەوەی پیاوەڕێ','ڕێگای دووچەرخە','شوێنی پارککردن']},
      {q:'ئەڤ نیشانە چی مانایە؟',choices:['شوینا پەڕینا پیاوەڕێ','رێیا پاسکیلان','شوینا پارکێ']},
      {q:'ماذا تعني هذه العلامة؟',choices:['ممر المشاة','مسار الدراجات','موقف سيارات']},
      {q:'این علامت چه معنایی دارد؟',choices:['گذرگاه عابر پیاده','مسیر دوچرخه','پارکینگ']},
      {q:'Bu işaret ne demektir?',choices:['Yaya geçidi','Bisiklet yolu','Otopark']},
      {q:'What does this sign mean?',choices:['Pedestrian crossing','Cycle lane','Parking']})
  ];
})();
