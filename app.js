const $=s=>document.querySelector(s),j=u=>fetch(u).then(r=>r.json()).catch(()=>({})),pg=document.body.dataset.p;
const u=s=>s?s.replace(/^\/+/,''):'',set=(i,h)=>{const e=$(i);if(e)e.innerHTML=h};
const im=(s,c='')=>s?`<img class="${c}" src="${u(s)}" alt="" loading="lazy">`:`<div class="ph ${c}">Photo</div>`;
(async()=>{
const [s,d,dr,b]=await Promise.all(['settings','departments','doctors','builder'].map(n=>j(`data/${n}.json`)));
const D=d.items||[],R=dr.items||[],c=s.currency||'',nm=(s.name||'Meridian Care Hospital').split(' ');
const L=[['index.html','Home','home'],['departments.html','Departments','dep'],['doctors.html','Doctors','doc'],['contact.html','Book appointment','con']];
$('#h').innerHTML=`<div class="w bar"><a class="logo" href="index.html">${nm[0]}<b>.</b><small>${nm.slice(1).join(' ')}</small></a><button class="mb" onclick="document.querySelector('nav').classList.toggle('open')">Menu</button><nav>${L.map(l=>`<a href="${l[0]}"${pg===l[2]?' class="on"':''}>${l[1]}</a>`).join('')}</nav></div>`;
$('#f').innerHTML=`<div class="w fg"><div><div class="logo">${nm[0]}<b>.</b></div><p style="margin-top:12px;max-width:22em">${s.tagline||''}</p></div><div><h4>Visit</h4><p>${s.address||''}<br>${s.city||''}</p><p style="margin-top:8px">${s.hours||''}</p></div><div><h4>Contact</h4><p><a href="tel:${s.phone}">${s.phone||''}</a><br><a href="mailto:${s.email}">${s.email||''}</a></p></div></div><div class="w cr">&copy; ${new Date().getFullYear()} ${s.name||''}. <a href="built-by.html">Designed by Allan Aminu</a></div>`;
const dc=x=>`<a href="contact.html?d=${encodeURIComponent(x.name)}"><div>${x.image?`<img src="${u(x.image)}" alt="">`:''}<h3 style="display:inline">${x.name}</h3></div><p>${x.description||''}</p><span>Book</span></a>`;
const rc=x=>`<div class="dr">${im(x.photo)}<div class="b"><h3>${x.name}</h3><p class="t">${x.specialty||''}</p><p>${x.bio||''}</p>${x.fee?`<p class="fee">Consultation: ${c}${x.fee}</p>`:''}<a class="lk" href="contact.html?doc=${encodeURIComponent(x.name)}">Request appointment</a></div></div>`;
if(pg==='home'){set('#hl',s.headline||'');set('#st',s.subtext||'');set('#hi',im(s.hero_image,'hi'));set('#dep',D.slice(0,6).map(dc).join(''));set('#doc',R.slice(0,3).map(rc).join(''));const e=$('#em'),n=s.emergency||s.phone||'';e.href='tel:'+n;e.textContent='Emergency: '+n}
if(pg==='dep')set('#dep',D.map(dc).join(''));
if(pg==='doc')set('#doc',R.map(rc).join(''));
if(pg==='con'){const f=$('#fm'),q=new URLSearchParams(location.search);f.dept.innerHTML=D.map(x=>`<option>${x.name}</option>`).join('');
if(q.get('d'))f.dept.value=q.get('d');if(q.get('doc'))f.msg.value='Preferred doctor: '+q.get('doc');
const t=()=>['Appointment request','Name: '+f.nm.value,'Phone: '+f.ph.value,'Department: '+f.dept.value,'Preferred date: '+f.dt.value,'Note: '+f.msg.value].join('\n');
f.onsubmit=e=>{e.preventDefault();location.href=`mailto:${s.email}?subject=${encodeURIComponent('Appointment request')}&body=${encodeURIComponent(t())}`};
$('#wa').onclick=()=>open(`https://wa.me/${s.whatsapp}?text=${encodeURIComponent(t())}`);
set('#ci',`<p><b>Phone</b><a href="tel:${s.phone}">${s.phone||''}</a></p><p><b>Emergency</b>${s.emergency||s.phone||''}</p><p><b>Email</b>${s.email||''}</p><p><b>Address</b>${s.address||''}, ${s.city||''}</p><p><b>Hours</b>${s.hours||''}</p>`)}
if(pg==='by'){set('#bh',b.headline||'');set('#ba',b.about||'');set('#bs',(b.services||[]).map(x=>`<div class="dr"><div class="b"><h3>${x.title}</h3><p>${x.description||''}</p></div></div>`).join(''));set('#bc',`<a class="btn" href="mailto:${b.email}">Email Allan</a><a class="btn o" href="tel:${b.phone}">Call ${b.phone}</a><a class="btn o" href="https://wa.me/${b.whatsapp}">WhatsApp</a>`)}
})();
