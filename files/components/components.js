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
          <a target="_blank" href="https://instagram.com/ssv_het_spook"><span>Instagram</span></a>
          <br>
          <a href="/lidworden/"><span>Wordt lid!</span></a>
        </p>

        <p>
          Socialistische Cultuur:
          <br>
          <a target="_blank" href="https://annieromein.nl"><span>S.S.V.G. Annie Romein</span></a>
          <br>
          <a target="_blank" href="https://janromein.nl"><span>S.S.V.G. Jan Romein</span></a>
          <br>
          <a target="_blank" href="https://instagram.com/sikkelenharp"><span>S.A.B. Sikkel en Harp</span></a>
          <br>
          <a target="_blank" href="https://instagram.com/hetrodewieltje_nijmegen"><span>Het Rode Wieltje</span></a>
        </p>

        <p style="margin: 0px;">
          Onze vrienden:
          <br>
          <a target="_blank" href="https://derodelap.nl"><span>De Rode Lap</span></a>
          <br>
          <a target="_blank" href="https://derodelap.nl"><span>ROOD, Socialistische Jongeren</span></a>
        </p>
          
      </div>
    </footer>
    `;
  }
}

customElements.define('footer-component', Footer);