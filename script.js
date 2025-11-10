(function(){
  const state = { payees: [] };
  const $ = s => document.querySelector(s);
  const $$ = s => document.querySelectorAll(s);

  const payeeList = $('#payeeList');
  const addBtn = $('#addBtn');
  const newName = $('#newName');
  const newValue = $('#newValue');
  const calcBtn = $('#calc');
  const totalInput = $('#total');
  const results = $('#results');
  const totalDisplay = $('#totalDisplay');
  const sumAmount = $('#sumAmount');
  const sumShare = $('#sumShare');
  const remainingEl = $('#remaining');
  const exportCsv = $('#exportCsv');
  const copyBtn = $('#copy');
  const resetBtn = $('#reset');
  const saveBtn = $('#save');
  const loadBtn = $('#load');
  const modeSel = $('#mode');
  const roundingSel = $('#rounding');
  const currencySel = $('#currency');
  const themeToggle = $('#themeToggle');

  // Theme switch
  const root = document.documentElement;
  const savedTheme = localStorage.getItem('theme') || 'dark';
  root.setAttribute('data-theme', savedTheme);
  themeToggle.checked = savedTheme === 'light';
  themeToggle.addEventListener('change', () => {
    root.setAttribute('data-theme', themeToggle.checked ? 'light' : 'dark');
    localStorage.setItem('theme', themeToggle.checked ? 'light' : 'dark');
  });

  function formatMoney(v){ const decimals = parseInt(roundingSel.value,10); return Number(v).toFixed(decimals); }
  function escapeHtml(s){return String(s).replace(/[&<>"']/g, c=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"}[c]));}

  function renderPayees(){
    payeeList.innerHTML='';
    state.payees.forEach((p, i)=>{
      const el = document.createElement('div'); el.className='payee';
      el.innerHTML = `
        <div>
          <div class="name">${escapeHtml(p.name||'—')}</div>
          <small class="muted">id:${i+1}</small>
        </div>
        <div><input aria-label="value-${i}" data-i="${i}" class="val" type="number" step="0.01" value="${p.value||''}" placeholder="value"></div>
        <div style="font-weight:800">${p.display||''}</div>
        <div class="actions"><button data-i="${i}" class="remove ghost">✕</button></div>
      `;
      payeeList.appendChild(el);
    });
    $$('.remove').forEach(b=>b.addEventListener('click', e=>{
      state.payees.splice(Number(e.currentTarget.dataset.i),1); renderPayees();
    }));
    $$('.val').forEach(inp=>inp.addEventListener('input', e=>{
      const i = Number(e.currentTarget.dataset.i);
      const v = e.currentTarget.value;
      state.payees[i].value = v===''? null : (isNaN(Number(v))? null : Number(v));
    }));
  }

  function recalc(){
    const total = Number(totalInput.value)||0;
    const mode = modeSel.value;
    const rounding = parseInt(roundingSel.value,10);
    let rows = state.payees.map(p=>({name:p.name,value:p.value}));

    if(mode==='equal'){ rows = rows.map(r=>({...r, share:1})); }
    else if(mode==='shares'){ rows = rows.map(r=>({...r, share:Number(r.value)||0})); }
    else{ rows = rows.map(r=>({...r, share:Number(r.value)||0})); }

    const anyDefined = rows.some(r=>r.value!=null && r.value!=='' && !isNaN(r.value));
    if(!anyDefined){ rows = rows.map(r=>({...r, share:1})); }

    let sumShare=0;
    if(mode==='percent'){
      sumShare = rows.reduce((s,r)=>s + (isFinite(r.share)? r.share:0),0);
      if(sumShare===0) rows = rows.map(r=>({...r, share:100/rows.length})), sumShare=100;
    } else{
      sumShare = rows.reduce((s,r)=>s + (isFinite(r.share)? r.share:0),0);
      if(sumShare===0) rows = rows.map(r=>({...r, share:1})), sumShare=rows.length;
    }

    const factor = Math.pow(10,rounding);
    const rawAmounts = rows.map(r=> mode==='percent' ? total*(r.share/100) : total*(r.share/sumShare) );
    const rounded = rawAmounts.map(a=> Math.round(a*factor)/factor );
    const roundedSum = rounded.reduce((s,a)=>s+a,0);
    let diff = Math.round((total-roundedSum)*factor)/factor;
    let inc = Math.round(diff*factor);
    if(inc!==0){
      const remainders = rawAmounts.map((a,i)=>({i, rem:a*factor-Math.floor(a*factor)}));
      remainders.sort((a,b)=>b.rem - a.rem);
      const sign = inc>0?1:-1; inc=Math.abs(inc);
      for(let k=0;k<inc;k++){
        const tgt = remainders[k%remainders.length].i;
        rounded[tgt]=Math.round((rounded[tgt]+sign*(1/factor))*factor)/factor;
      }
    }

    results.innerHTML=''; let sumAmounts=0;
    rows.forEach((r,i)=>{
      const amt = rounded[i]||0; sumAmounts+=amt;
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${escapeHtml(r.name||'—')}</td><td>${(mode==='percent')? (Number(r.share).toFixed(2)+'%'):(Number(r.share))}</td><td>${formatMoney(amt)}</td><td></td>`;
      results.appendChild(tr);
    });

    totalDisplay.textContent = formatMoney(total)+` ${currencySel.value}`;
    sumAmount.textContent = formatMoney(sumAmounts)+` ${currencySel.value}`;
    sumShare.textContent = (mode==='percent') ? (sumShare.toFixed(2)+'%'):sumShare;
    remainingEl.textContent = formatMoney(total-sumAmounts)+` ${currencySel.value}`;
  }

  addBtn.addEventListener('click', ()=>{
    const name = newName.value.trim()||'Unnamed';
    const valRaw = newValue.value.trim();
    const val = valRaw===''?null:(isNaN(Number(valRaw))?null:Number(valRaw));
    state.payees.push({name,value:val,display:''});
    newName.value=''; newValue.value='';
    renderPayees();
  });

  calcBtn.addEventListener('click',()=>{ recalc(); });

  exportCsv.addEventListener('click',()=>{
    const rows = [['Collaborator','Share','Amount']];
    for(const tr of results.querySelectorAll('tr')){
      const tds = [...tr.children].map(td=>td.textContent.trim());
      rows.push(tds.slice(0,3));
    }
    const csv = rows.map(r=>r.join(',')).join('\n');
    const blob = new Blob([csv],{type:'text/csv'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href=url; a.download='royalty_split.csv'; a.click(); URL.revokeObjectURL(url);
  });

  copyBtn.addEventListener('click',()=>{
    const text = [...results.querySelectorAll('tr')].map(tr=>[...tr.children].map(td=>td.textContent.trim()).join('\t')).join('\n');
    navigator.clipboard.writeText(text);
    copyBtn.textContent='Copied!'; setTimeout(()=>copyBtn.textContent='Copy results',1000);
  });

  resetBtn.addEventListener('click',()=>{
    if(!confirm('Clear all data?')) return;
    state.payees=[]; renderPayees(); results.innerHTML='';
    totalInput.value='0'; totalDisplay.textContent='0.00'; sumAmount.textContent='0.00'; sumShare.textContent='—'; remainingEl.textContent='0.00';
  });

  saveBtn.addEventListener('click',()=>{
    localStorage.setItem('royalty-split', JSON.stringify({total: totalInput.value, mode: modeSel.value, rounding: roundingSel.value, currency: currencySel.value, payees: state.payees}));
    alert('Saved locally.');
  });

  loadBtn.addEventListener('click',()=>{
    const data = localStorage.getItem('royalty-split');
    if(!data){ alert('Nothing saved.'); return; }
    const obj = JSON.parse(data);
    totalInput.value = obj.total;
    modeSel.value = obj.mode;
    roundingSel.value = obj.rounding;
    currencySel.value = obj.currency;
    state.payees = obj.payees || [];
    renderPayees();
    recalc();
  });

})();
