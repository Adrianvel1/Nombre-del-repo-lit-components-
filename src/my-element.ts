import { LitElement, html, css } from "lit";
import { customElement, state } from "lit/decorators.js";
import "./pokemon"; // Importando el archivo de Pokémon

@customElement("login-form")
export class LoginForm extends LitElement {
  @state() private username = "";
  @state() private password = "";
  @state() private error = "";
  @state() private isLoggedIn = false;

  // Usuarios correctos
  private users: Record<string, string> = {
    charmeleon: "1234",
    bulbasaur: "5678",
    squirtle: "91011",
    pikachu: "1213",
  };

  static styles = css`
    :host {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      height: 100vh;
      background: linear-gradient(to right, rgb(205, 0, 75), rgb(244, 155, 12));
    }
    .container {
      background: rgba(255, 248, 253, 0.84);
      padding: 4rem;
      border-radius: 30px;
      box-shadow: 0 10px 50px rgba(49, 6, 34, 0.43);
      width: 50%;
      max-width: 300px;
    }
    h2 {
      font-family: "Playwrite HU", cursive;
    }
    input,
    button {
      width: 80%;
      margin-top: 0.5rem;
      padding: 0.75rem;
      margin-bottom: 10px;
    }
    .bienvenida {
      font-family: "Playwrite HU", cursive;
    }
    .error {
      color: red;
      font-size: 1rem;
    }
  `;

  constructor() {
    super();
    const savedUser = localStorage.getItem("username");
    if (savedUser) {
      this.username = savedUser;
      this.isLoggedIn = true;
    }
  }

  private handleInput(e: Event) {
    const target = e.target as HTMLInputElement;
    if (target.name === "username") this.username = target.value;
    if (target.name === "password") this.password = target.value;
  }

  private handleLogin() {
    if (!this.username || !this.password) {
      this.error = "Todos los campos son obligatorios";
      return;
    }

    if (this.users[this.username] === this.password) {
      this.error = "";
      localStorage.setItem("username", this.username);
      this.isLoggedIn = true;
      this.password = "";
    } else {
      this.error = "Usuario o contraseña incorrectos";
    }
  }

  private handleLogout() {
    localStorage.removeItem("username");
    this.username = "";
    this.password = "";
    this.isLoggedIn = false;
  }

  render() {
    return html`
      <div class="container">
        ${this.isLoggedIn
          ? html`
              <p class="bienvenida">¡Bienvenido, ${this.username}!</p>
              <my-element .username=${this.username}></my-element>
              <button @click=${this.handleLogout}>Cerrar sesión</button>
            `
          : html`
              <h2>Inicia Sesión</h2>
              <input
                type="text"
                name="username"
                placeholder="Usuario"
                .value=${this.username}
                @input=${this.handleInput}
              />
              <input
                type="password"
                name="password"
                placeholder="Contraseña"
                .value=${this.password}
                @input=${this.handleInput}
              />
              ${this.error ? html`<div class="error">${this.error}</div>` : ""}
              <button @click=${this.handleLogin}>Acceder</button>
            `}
      </div>
    `;
  }
}
