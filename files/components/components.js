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
    <footer>
      <div class="footer-div">
        <img style="width: 125px; height: 125px;" src="/files/img/spookjes/Spook3keer.png">
        
        <p>
          Contact:
          <br>
          <a target="_blank" href="https://instagram.com/ssv_het_spook">Instagram</a>
          <br>
        </p>

        <p>
          Onze vrienden:
          <br>
          <a target="_blank" href="https://annieromein.nl">S.S.V.G. Annie Romein</a>
          <br>
          <a target="_blank" href="https://janromein.nl">S.S.V.G. Jan Romein</a>
          <br>
          <a target="_blank" href="https://instagram.com/sikkelenharp">S.A.B. Sikkel en Harp</a>
          <br>
          <a target="_blank" href="https://derodelap.nl">De Rode Lap</a>
        </p>

        <p>
          <br>
          <a target="_blank" href="https://instagram.com/hetrodewieltje_nijmegen">Het Rode Wieltje</a>
        </p>

      </div>
    </footer>
    `;
  }
}

customElements.define('footer-component', Footer);