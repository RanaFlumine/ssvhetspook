class Header extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
    <header>
      <div class="navigation">
        <a href="/"><img class="header-img" src="/files/img/spooklogo.png"></a>
        <a href="/" class="header-button">Voorpagina</a>
        <a href="/agenda/" class="header-button">Agenda</a>
        <a href="/lidworden/" class="header-button">Lid worden</a>
      </div>
    </header>
    <hr>
    `;
  }
}

customElements.define('header-component', Header);

class Footer extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
    <hr>
    <footer>
      <div class="footer-div">
        <img style="width: 135px; height: 135px;" src="/files/img/spookjes/Spook3keer.png">
        
        <p>
          Contact:
          <br>
          <a target="_blank" href="https://instagram.com/ssv_het_spook">Instagram</a>
          <br>
          <a target="_blank" href="https://docs.google.com/forms/d/18Nyhe7Ot_-cPcY_eyno97tRpHZxR_JCIqT3CNt-CQZs">Wordt lid!</a>
        </p>

        <p>
          Socialistische Cultuur:
          <br>
          <a target="_blank" href="https://instagram.com/sikkelenharp">S.A.B. Sikkel en Harp</a>
          <br>
          <a target="_blank" href="https://instagram.com/hetrodewieltje_nijmegen">Het Rode Wieltje</a>
        </p>

        <p style="margin: 0px;">
          Onze vrienden:
          <br>
          <a target="_blank" href="https://derodelap.nl">De Rode Lap</a>
          <br>
          <a target="_blank" href="https://roodjongeren.nl">ROOD, Socialistische Jongeren</a>
          <br>
          <a target="_blank" href="https://rsp.nu">Revolutionair Socialistische Partij</a>
        </p>
          
      </div>
    </footer>
    `;
  }
}

customElements.define('footer-component', Footer);