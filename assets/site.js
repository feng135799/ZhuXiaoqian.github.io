(() => {
  'use strict';
  const D = window.GROUP_DATA;
  if (!D) return;
  const one = (selector, root=document) => root.querySelector(selector);
  const all = (selector, root=document) => Array.from(root.querySelectorAll(selector));
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c=>({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'}[c]));
  const setText = (selector, value) => all(selector).forEach(el=>el.textContent=value);
  const arrow = '<span aria-hidden="true">↗</span>';

  setText('[data-site-name]',D.site.name);
  setText('[data-site-en]',D.site.englishName);
  setText('[data-site-institution]',D.site.institution);
  setText('[data-site-contact]',D.site.contact);
  const titlePart = document.body.dataset.title;

  if (document.body.dataset.page === 'home') {
      document.title = '朱小谦课题组｜大气与空间环境预测、海洋信息感知与处理';
  } else if (document.body.dataset.page === 'team') {
      document.title = '朱小谦｜课题组负责人简介与科研成果';
  } else if (titlePart) {
      document.title = `${titlePart} | ${D.site.name}`;
  }

  const toggle = one('.menu-toggle');
  const nav = one('.nav-links');
  if(toggle && nav) {
    const close = ()=>{ nav.classList.remove('is-open'); toggle.setAttribute('aria-expanded','false'); toggle.setAttribute('aria-label','展开导航菜单'); };
    toggle.addEventListener('click',()=>{
      const opened=nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded',String(opened));
      toggle.setAttribute('aria-label',opened?'收起导航菜单':'展开导航菜单');
    });
    all('.nav-links a').forEach(a=>a.addEventListener('click',close));
    document.addEventListener('keydown',e=>{if(e.key==='Escape') close();});
  }

  const domainCard = (d,i)=>`<a class="domain-item" href="research.html#${esc(d.id)}">
    <span class="domain-index">0${i+1} / ${esc(d.enShort || d.en)}</span>
    <span class="domain-content"><strong>${esc(d.label)}</strong><span>${esc(d.summary)}</span>
    </span>
    <span class="domain-arrow" aria-hidden="true">↗</span>
  </a>`;
  const navItems = [
    {number:'01',title:'研究方向',en:'RESEARCH',desc:'了解主要研究领域',href:'research.html',icon:'orbit'},
    {number:'02',title:'课题组简介',en:'PEOPLE',desc:'了解负责人及组内成员',href:'team.html',icon:'users'},
    {number:'03',title:'主要主要科研项目',en:'PROJECTS',desc:'查看相关研究项目',href:'projects.html',icon:'layers'},
    {number:'04',title:'代表性学术论文',en:'SELECTED PUBLICATIONS',desc:'浏览学术发表成果',href:'publications.html',icon:'book'},
    {number:'05',title:'学术资源',en:'RESOURCES',desc:'学术专著与开源代码',href:'resources.html',icon:'grid'}
  ];
  const icons = {
    orbit:'<circle cx="12" cy="12" r="2.5"/><ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(-35 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(35 12 12)"/>',
    layers:'<rect x="3.5" y="5" width="17" height="4" rx="1.5"/><rect x="3.5" y="10" width="17" height="4" rx="1.5"/><rect x="3.5" y="15" width="17" height="4" rx="1.5"/>',
    book:'<path d="M3 4.5h7a3 3 0 0 1 3 3v12a3 3 0 0 0-3-3H3zM21 4.5h-5a3 3 0 0 0-3 3v12a3 3 0 0 1 3-3h5z"/>',
    users:'<circle cx="9" cy="8" r="3"/><path d="M2.5 20v-2c0-2.5 2.5-4 6.5-4s6.5 1.5 6.5 4v2"/><path d="M16 5a3 3 0 0 1 0 6M18 14c2.5.3 3.5 1.8 3.5 4v2"/>',
    grid:'<rect x="3" y="3" width="8" height="8" rx="1.4"/><rect x="13" y="3" width="8" height="8" rx="1.4"/><rect x="3" y="13" width="8" height="8" rx="1.4"/><rect x="13" y="13" width="8" height="8" rx="1.4"/>'
  };
  const iconSvg = (key)=>`<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[key]||icons.orbit}</svg>`;

  if (document.body.dataset.page === 'home') {
    setText('#hero-title',D.site.name);
    setText('#hero-intro',D.site.intro);
    const chips=one('#hero-domains');
    if(chips) chips.innerHTML=D.directions.map((d,i)=>`<a href="research.html#${esc(d.id)}"><span class="domain-chip-num">0${i+1}</span><span class="domain-chip-label">${esc(d.label)}</span><span class="domain-chip-arrow" aria-hidden="true">↗</span></a>`).join('');
    const jump=one('#quick-links');
    if(jump) jump.innerHTML=navItems.map(i=>`<a class="jump-card" href="${i.href}">
        <span class="jump-icon">${iconSvg(i.icon)}</span><span class="jump-en">${i.number} / ${i.en}</span>
        <span class="jump-name">${i.title}</span><span class="jump-arrow" aria-hidden="true">↗</span>
      </a>`).join('');
  }


  // V34 homepage: PI card and authentic latest publication records (not fictional news).
  if(document.body.dataset.page==='home') {
    setText('#v34-pi-name',D.leader?.name||'课题组负责人');
    const portrait=one('#v34-pi-photo');
    if(portrait&&D.leader?.photo){portrait.src=D.leader.photo;portrait.alt=D.leader.photoAlt||D.leader.name;}
    const intro=one('.v34-pi-description');
    if(intro) intro.textContent='长期从事高性能计算、数值天气预报与海洋信息感知研究，主持或参与30余项重大科研任务，获国家科技进步奖等多项科技奖励。';
    const list=one('#v34-latest-news');
    if(list){
      // The homepage follows the curated order supplied by the research group.
      // Each record is resolved by exact paper-title text, not a guessed publication.
      const highlights = [

{
  person: '魏春山同学',
  journal: 'Nature Climate Change',
  title: 'Warming-driven lower-tropospheric stratification intensifies ducting over global oceans'
},
        {person:'廖思远同学',journal:'JASA',title:'A lightweight conditional mean-field network for predicting azimuth-range acoustic transmission loss in dynamic ocean environments'},
        {person:'姜正豪同学',journal:'IEEE Transactions on Geoscience and Remote Sensing',title:'SRNet: Semantic Anchoring and Fine-Grained Refinement Network for Semantic Change Detection in Remote Sensing Images'},
        {person:'丰晟老师',journal:'IEEE Journal of Oceanic Engineering',title:'Graph Embedding With Mel-Spectrograms for Underwater Acoustic Target Recognition'},
        {person:'单雨龙老师',journal:'Environmental Research Letters',title:'Spatiotemporal characteristics and potential drivers of surface air temperature variability in east Antarctica'},
        {person:'胡琪浩老师',journal:'Advanced Science',title:'Revolutionizing Underwater Sensor Performance: Tackling Rayleigh Scattering Challenges by Pseudo Random Noise'}
      ];
      const byTitle=new Map((D.publications||[]).map(pub=>[String(pub.title).trim(),pub]));
      const news=highlights.map(item=>({ ...item,pub:byTitle.get(item.title)})).filter(item=>item.pub);
      list.innerHTML=news.map(item=>{
        const line=`课题组${item.person}在${item.journal}发表论文`;
        return `<a class="v34-news-entry" href="publications.html?search=${encodeURIComponent(item.title)}" title="${esc(item.title)}"><time datetime="${esc(item.pub.year)}">${esc(item.pub.year)}</time><span>${esc(line)}</span><span aria-hidden="true">↗</span></a>`;
      }).join('') || '<p class="v34-news-empty">暂无公开动态</p>';
    }
  }

  if (document.body.dataset.page === 'research') {
    const root=one('#research-domains');
    if(root) root.innerHTML=D.directions.map((d,i)=>`<article class="field-card" id="${esc(d.id)}">
      <div class="field-left"><span class="field-n">0${i+1}</span><span class="field-overline">${esc(d.en)}</span></div>
      <div class="field-main"><h2>${esc(d.title)}</h2><p>${esc(d.details)}</p>
        <a class="research-link" href="publications.html?domain=${encodeURIComponent(d.label)}">查看相关代表性论文 <span aria-hidden="true">↗</span></a>
        ${(D.projects||[]).some(p=>p.category===d.label)?`<a class="research-link" href="projects.html">主要主要科研项目 <span aria-hidden="true">↗</span></a>`:''}
      </div>
    </article>`).join('');
    if (window.location.hash) {
      const targetId=decodeURIComponent(window.location.hash.slice(1));
      const target=document.getElementById(targetId);
      if (target) requestAnimationFrame(()=>target.scrollIntoView({block:'start'}));
    }
  }

  function initFilter(buttonRoot, cardRoot, field) {
    const buttons=all(`${buttonRoot} button[data-filter]`);
    const cards=all(`${cardRoot} [data-${field}]`);
    buttons.forEach(button=>button.addEventListener('click',()=>{
      const selected=button.dataset.filter;
      buttons.forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
      let n=0;
      cards.forEach(card=>{
        const visible=selected==='全部'||card.dataset[field]===selected;
        card.hidden=!visible;
        if(visible) n++;
      });
      const notice=one('#empty-state');
      if(notice) notice.hidden=n!==0;
    }));
  }
  const filters=(values)=>['全部', ...values].map((v,i)=>`<button type="button" data-filter="${esc(v)}" aria-pressed="${i===0?'true':'false'}">${esc(v)}</button>`).join('');

  // V41: projects are a single concise chronological list (no direction grouping).
  if (document.body.dataset.page === 'projects') {
    const root=one('#project-list');
    const available=Array.isArray(D.projects)?D.projects:[];
    const yearOf=p=>{
      const explicit=Number(p.startYear||0);
      if(explicit)return explicit;
      const match=String(p.period||'').match(/\d{4}/);
      return match?Number(match[0]):0;
    };
    const ordered=available.map((project,order)=>({project,order}))
      .sort((a,b)=>yearOf(b.project)-yearOf(a.project)||a.order-b.order);
    if(root){
      if(!ordered.length){
        root.innerHTML='<p class="project-list-pending">项目名单待补充</p>';
      }else{
        const lines=ordered.map(({project:p},i)=>{
          const source=String(p.source||'').trim();
          const period=String(p.period||'').trim();
          // A single public-facing value, e.g. '1200万元' or '千万元级'.
          // Explicitly identify the scope to avoid confusing total project
          // funding with the amount allocated to this research group.
          const funding=String(p.funding||'').trim();
          const fundingScope=String(p.fundingScope||'经费规模').trim();
          const fundingText=funding?`${fundingScope}：${funding}`:'';
          const extra=[source,period,fundingText].filter(Boolean).join('，');
          const url=String(p.url||'').trim();
          const link=/^https:\/\/[^\s]+$/i.test(url)?` <a class="project-ref-link" href="${esc(url)}" target="_blank" rel="noopener noreferrer">查看详情 ↗</a>`:'';
          return `<li class="project-ref-item"><span class="ref-index" aria-hidden="true">[${i+1}]</span><div class="project-ref-text"><span class="project-ref-title">${esc(p.title)}</span>${extra?`<span class="project-ref-meta">，${esc(extra)}</span>`:''}<span>。</span>${link}</div></li>`;
        }).join('');
        root.innerHTML=`<ol class="project-ref-list">${lines}</ol>`;
      }
    }
  }
  if (document.body.dataset.page === 'publications') {
    const root=one('#publication-list');
    const dir=one('#publication-domain-filters');
    const years=one('#publication-year');
    const search=one('#publication-search');
    const total=one('#publication-total');
    const count=one('#publication-count');
    const reset=one('#publication-reset');
    const empty=one('#empty-state');
    const domains=D.directions.map(d=>d.label);
    // Legacy domain strings remain in the data, but only the two main groups are displayed.
    const primaryByDomain=new Map((D.publicationAreas||[]).map(a=>[a.domain,a.primary]));
    const primaryFor=domain=>primaryByDomain.get(domain)||domain;
    const pubs=(D.publications||[]).filter(p=>Number(p.year)>=2012);
    let selectedDomain='全部';

    // V33: bilingual academic citation authorship, curated for each record.
    // Western names use SURNAME + GIVEN-NAME INITIALS; Chinese names remain in Chinese.
    const conciseAuthors=p=>p.authorsDisplay||String(p.authors||'').trim();
    const venueCase={
      'ENVIRONMENTAL RESEARCH LETTERS':'Environmental Research Letters',
      'JOURNAL OF GEOPHYSICAL RESEARCH-ATMOSPHERES':'Journal of Geophysical Research: Atmospheres',
      'GEOPHYSICAL RESEARCH LETTERS':'Geophysical Research Letters'
    };
    const formatVenue=p=>{
      const year=String(p.year||'').trim();
      let raw=String(p.venue||'来源刊物待核对').trim();
      raw=raw.replace(/\s*；\s*/g,', ').replace(/[，]/g,',').replace(/\s*\(\s*\d{4}\s*\)\s*$/,'').replace(/[.]$/,'').trim();
      // The original tables mix comma and colon separators in volume/issue/pages.
      const m=raw.match(/^(.*?),\s*(\d+(?:\(\d+\))?)\s*[,：:]\s*(.+)$/);
      if(!m) return {journal:raw,details:''};
      const journal=venueCase[m[1].trim()]||m[1].trim();
      const volume=m[2].trim();
      let locator=m[3].trim().replace(/[.]$/,'');
      // ApJ source tables store page-count/article-ID as "14/106" and "13/97".
      // The article IDs 106 and 97 match the journal records.
      if(journal==='The Astrophysical Journal' && /^\d+\/\d+$/.test(locator)){
        locator=locator.split('/')[1];
      }
      // Article ID followed by source-listed page range (IEEE GRSL entry).
      if(/^\d{7},\s*\d+[–-]\d+$/.test(locator)) {
        const [article,pages]=locator.split(/,\s*/);
        locator=`${article} (${pages})`;
      }
      return {journal,details:`, ${year}, ${volume}: ${locator}`};
    };
    const linkHTML=link=>`<a href="${esc(link.url)}" target="_blank" rel="noopener noreferrer" aria-label="查看${esc(link.label)}：${esc(link.url)}">${esc(link.label)} <span aria-hidden="true">↗</span></a>`;
    const citation=(p,i)=>{
      const safeLinks=(p.links||[]).filter(l=>/^https:\/\/[^\s]+$/i.test(l.url||''));
      const citationLinks=safeLinks.length?` <span class="ref-links">${safeLinks.map(linkHTML).join('')}</span>`:'';
      const {journal,details}=formatVenue(p);
      const type=p.type==='会议论文'?'[C]':'[J]';
      const author=conciseAuthors(p);
      return `<li class="ref-item"><span class="ref-index" aria-hidden="true">[${i+1}]</span>
        <div class="ref-text" title="完整作者：${esc(p.authors)}"><span class="ref-authors">${esc(author)}</span> <span class="ref-title">${esc(p.title)}</span><span class="ref-type">${type}</span>.
          <span class="ref-venue">${esc(journal)}</span>${details?`<span class="ref-details">${esc(details)}</span>`:`, ${esc(p.year)}`}.
          ${citationLinks}</div></li>`;
    };

    if(dir) dir.innerHTML=filters(domains);
    if(years) years.innerHTML='<option value="">全部年份</option>'+[...new Set(pubs.map(p=>p.year))]
      .sort((a,b)=>Number(b)-Number(a)).map(y=>`<option value="${esc(y)}">${esc(y)} 年</option>`).join('');


    const update=()=>{
      const keyword=(search?.value||'').trim().toLocaleLowerCase();
      const chosenYear=years?.value||'';
      const matches=pubs.filter(p=>(selectedDomain==='全部'||primaryFor(p.domain)===selectedDomain)
        &&(!chosenYear||p.year===chosenYear)
        &&(!keyword||[p.title,p.authors,p.venue,p.domain,primaryFor(p.domain),p.year].join(' ').toLocaleLowerCase().includes(keyword)));
      if(root)root.innerHTML=D.directions.map((d,groupIndex)=>{
        const entries=matches.filter(p=>primaryFor(p.domain)===d.label)
          .sort((a,b)=>Number(b.year)-Number(a.year));
        if(!entries.length)return '';
        return `<section class="bib-domain" id="bibliography-${esc(d.id)}" aria-labelledby="bib-heading-${esc(d.id)}">
          <div class="bib-domain-head"><div class="bib-domain-title"><span class="bib-domain-number">0${groupIndex+1}</span>
            <h3 id="bib-heading-${esc(d.id)}">${esc(d.label)}</h3></div>
          </div>
          <ol class="bib-list">${entries.map((p,i)=>citation(p,i)).join('')}</ol>
        </section>`;
      }).join('');

      if(empty)empty.hidden=matches.length!==0;
    };

    all('#publication-domain-filters button[data-filter]').forEach(btn=>btn.addEventListener('click',()=>{
      selectedDomain=btn.dataset.filter;
      all('#publication-domain-filters button[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b===btn)));
      update();
    }));
    [years,search].forEach(el=>el?.addEventListener(el===search?'input':'change',update));
    if(reset)reset.addEventListener('click',()=>{
      selectedDomain='全部';
      all('#publication-domain-filters button[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.filter==='全部')));
      if(years)years.value='';
      if(search)search.value='';
      update();
    });
    const searchFromUrl=new URLSearchParams(window.location.search).get('search');
    if(search&&searchFromUrl)search.value=searchFromUrl;
    const initialDomain=new URLSearchParams(window.location.search).get('domain');
    const mainDomain=domains.includes(initialDomain)?initialDomain:primaryFor(initialDomain);
    if(domains.includes(mainDomain)){
      all('#publication-domain-filters button[data-filter]').find(b=>b.dataset.filter===mainDomain)?.click();
    } else update();
  }

  if (document.body.dataset.page === 'team') {
    const pi=one('#pi-card');
    if (pi) {
      const bio=[D.leader.desc, D.leader.projects, D.leader.achievements].filter(Boolean);
      const portrait=D.leader.photo
        ? `<figure class="pi-portrait"><img src="${esc(D.leader.photo)}" alt="${esc(D.leader.photoAlt||D.leader.name)}" width="765" height="952" decoding="async" fetchpriority="high"></figure>`
        : `<div class="person-avatar person-avatar-large" aria-hidden="true">${esc(D.leader.initials)}</div>`;
      pi.innerHTML=`${portrait}
        <div class="pi-content"><span class="pi-label">${esc(D.leader.role)}</span><h2>${esc(D.leader.name)}</h2>
          <div class="pi-bio">${bio.map(line=>`<p>${esc(line)}</p>`).join('')}</div></div>`;
    }
    const root=one('#member-grid');
    const filt=one('#member-filters');
    const summary=one('#member-summary');
    const groupOrder=['已毕业成员','在读研究生'];
    const groups=groupOrder.filter(g=>D.members.some(m=>m.group===g));
    // Compact, text-only directory: no surname avatars or redundant biographical details.
    const memberCard=m=>`<div class="person-card">
      <div class="person-heading"><span class="member-name">${esc(m.name)}</span>${m.role?`<span class="person-role">${esc(m.role)}</span>`:''}</div>
    </div>`;
    if(root) root.innerHTML=groups.map((group,i)=>{
      const list=D.members.filter(m=>m.group===group);
      return `<section class="people-group" data-member-category="${esc(group)}" aria-labelledby="people-group-${i}">
          <div class="people-group-heading"><div><span class="people-group-index">${String(i+1).padStart(2,'0')} / MEMBERS</span><h3 id="people-group-${i}">${esc(group)}</h3></div></div>
          <div class="member-grid">${list.map(memberCard).join('')}</div>
        </section>`;
    }).join('');
    if(filt) filt.innerHTML=['全部',...groups].map((group,i)=>{
      return `<button type="button" data-filter="${esc(group)}" aria-pressed="${i===0?'true':'false'}">${esc(group)}</button>`;
    }).join('');

    const sections=all('.people-group',root);
    all('#member-filters button[data-filter]').forEach(button=>button.addEventListener('click',()=>{
      const selected=button.dataset.filter;
      all('#member-filters button[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
      let n=0;
      sections.forEach(section=>{
        const selectedGroup=section.dataset.memberCategory;
        const display=selected==='全部'||selectedGroup===selected;
        section.hidden=!display;
        if(display)n+=D.members.filter(m=>m.group===selectedGroup).length;
      });

      const empty=one('#empty-state');
      if(empty) empty.hidden=n!==0;
    }));
  }
  if (document.body.dataset.page === 'resources') {
    const root=one('#resource-list');
    if(root) root.innerHTML=D.resources.map((r,i)=>{
      const validUrl=/^https:\/\/[^\s]+$/i.test(r.url||'');
      const actions=validUrl
        ? `<a class="resource-action" href="${esc(r.url)}" target="_blank" rel="noopener noreferrer">${esc(r.linkLabel||'查看资源')} ${arrow}</a>`
        : '<span class="resource-pending">链接待补充</span>';
      const tags=(r.tags||[]).map(t=>`<span>${esc(t)}</span>`).join('');
      return `<article class="resource-entry" data-category="${esc(r.category)}">
        <span class="resource-icon">${String(i+1).padStart(2,'0')}</span>
        <div class="resource-body"><div class="resource-meta"><span class="area-tag">${esc(r.category)}</div>
          <h2>${esc(r.title)}</h2><p>${esc(r.desc)}</p>${tags?`<div class="resource-tags">${tags}</div>`:''}
        </div>
        <div class="resource-actions">${actions}</div>
      </article>`;
    }).join('');
  }
})();
