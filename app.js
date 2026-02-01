document.addEventListener('DOMContentLoaded', function() {
  // Section animation on scroll
  function animateSectionsOnScroll() {
    var sections = document.querySelectorAll('.section-animated');
    var finishLoad = function() {
      var trigger = window.innerHeight * 0.83;
      sections.forEach(function(section) {
        var rect = section.getBoundingClientRect();
        if (rect.top < trigger) {
          section.classList.add('visible');
        }
      });
    };
    finishLoad();
    window.addEventListener('scroll', finishLoad);
    window.addEventListener('resize', finishLoad);
  }
  animateSectionsOnScroll();

  // MVola copy number
  var copyBtn = document.getElementById('copyBtn');
  var mvolaNumber = document.getElementById('mvolaNumber');
  var copyMessage = document.getElementById('copyMessage');
  if(copyBtn && mvolaNumber){
    copyBtn.addEventListener('click', function() {
      var number = mvolaNumber.textContent;
      navigator.clipboard.writeText(number).then(function() {
        mvolaNumber.classList.add('copied');
        copyMessage.innerText = 'Numéro MVola copié !';
        copyMessage.style.opacity = 1;
        setTimeout(function() {
          mvolaNumber.classList.remove('copied');
          copyMessage.innerText = '';
          copyMessage.style.opacity = 0;
        }, 1550);
      }, function() {
        copyMessage.innerText = 'Erreur: copier manuellement.';
        copyMessage.style.color = '#e75a43';
        setTimeout(function(){
          copyMessage.innerText = '';
          copyMessage.style.color = '#43e97b';
        }, 1200);
      });
    });
    mvolaNumber.addEventListener('click', function() {
      copyBtn.click();
    });
  }

  // Buy button triggers modal info
  var buyBtn = document.getElementById('buyButton');
  if(buyBtn){
    buyBtn.addEventListener('click', function(e){
      e.preventDefault();
      showModalPayment();
    });
  }

  function showModalPayment() {
    // Minimalistic modal
    var modal = document.createElement('div');
    modal.className = 'modal-blur';
    modal.innerHTML = `
      <div class='modal-inner'>
        <span class='modal-close' id='modalCloseBtn' title='Fermer'>&times;</span>
        <div class='modal-header'><img src='https://i.imgur.com/UBdHItN.png' alt='Logo TikTok' class='modal-mvola'/></div>
        <h3 class='modal-title'>Paiement MVola — Ebook Discipline & Motivation</h3>
        <div class='modal-step'>
          <b>1.</b> Paie <b>10 000 Ar</b> au numéro <span class='modal-copy' id='modalCopyNum'>+261 34 43 840 89 <i class='fas fa-copy'></i></span>
        </div>
        <div class='modal-step'>
          <b>2.</b> Envoie une preuve du paiement (capture) :<br>
           <span class='modal-small'><i class='fab fa-whatsapp'></i> WhatsApp : <span class='wa'>+261 34 45 67 890</span></span>
        </div>
        <div class='modal-step'>
          <b>3.</b> Reçois ton ebook en quelques minutes ! 🚀
        </div>
      </div>`;
    document.body.appendChild(modal);
    setTimeout(function(){modal.classList.add('visible')},20);
    var closeBtn = document.getElementById('modalCloseBtn');
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
      if(e.target===modal){closeModal();}
    });
    document.getElementById('modalCopyNum').addEventListener('click', function(){
      navigator.clipboard.writeText('+261 34 43 840 89');
      this.classList.add('copied');
      setTimeout(()=>this.classList.remove('copied'),800);
    });
    function closeModal() {
      modal.classList.remove('visible');
      setTimeout(function(){modal.remove();},220);
    }
  }
});
