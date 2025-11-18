
// Accessible current page marker
(function() {
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav a').forEach(a => {
    if (a.getAttribute('href') === path) a.setAttribute('aria-current', 'page');
  });
})();

// Input masks (CPF, phone, CEP)
function onlyDigits(v){ return v.replace(/\D/g,''); }
function maskCPF(v){
  v = onlyDigits(v).slice(0,11);
  let out = '';
  if (v.length > 0) out = v.slice(0,3);
  if (v.length > 3) out += '.' + v.slice(3,6);
  if (v.length > 6) out += '.' + v.slice(6,9);
  if (v.length > 9) out += '-' + v.slice(9,11);
  return out;
}
function maskPhone(v){
  v = onlyDigits(v).slice(0,11);
  if (v.length <= 10){
    return v.replace(/(\d{2})(\d{4})(\d{0,4})/, function(_,a,b,c){ return '('+a+') '+b+(c?'-'+c:''); });
  } else {
    // (11) 9XXXX-XXXX
    return v.replace(/(\d{2})(\d{1})(\d{4})(\d{0,4})/, function(_,a,b,c,d){ return '('+a+') '+b+''+c+(d?'-'+d:''); });
  }
}
function maskCEP(v){
  v = onlyDigits(v).slice(0,8);
  return v.replace(/(\d{5})(\d{0,3})/, function(_,a,b){ return a + (b?'-'+b:''); });
}

document.addEventListener('input', function(e){
  const t = e.target;
  if (t.matches('[data-mask="cpf"]')) t.value = maskCPF(t.value);
  if (t.matches('[data-mask="phone"]')) t.value = maskPhone(t.value);
  if (t.matches('[data-mask="cep"]')) t.value = maskCEP(t.value);
});

// Progressive enhancement: form client-side check
document.addEventListener('submit', function(e){
  const form = e.target.closest('form.needs-validate');
  if (!form) return;
  if (!form.checkValidity()){
    e.preventDefault();
    alert('Por favor, corrija os campos destacados antes de enviar.');
  }
}, true);
