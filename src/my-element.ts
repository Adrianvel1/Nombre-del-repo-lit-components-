import { LitElement, html, css } from "lit";
import { customElement, state } from "lit/decorators.js";

@customElement("login-form")
export class LoginForm extends LitElement {
  @state() private username = "";
  @state() private password = "";
  @state() private error = "";
  @state() private isLoggedIn = false;

  static styles = css`
    :host {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background: linear-gradient(to right, rgb(205, 0, 75), rgb(244, 155, 12));
    }
    .container {
      background: rgba(255, 248, 253, 0.84);
      padding: 3rem;
      border-radius: 30px;
      box-shadow: 0 10px 50px rgba(49, 6, 34, 0.43);
      width: 50%;
      max-width: 300px;
    }
    h2 {
      font-family: "Playwrite HU", cursive;
      text-align: center;
      margin-bottom: 2rem;
    }
    input {
      width: 100%;
      padding: 0.75rem;
      margin: 0.5rem 0;
      border: 1px solid #ccc;
      border-radius: 6px;
    }
    button {
      width: 100%;
      padding: 0.85rem;
      background-color: rgb(197, 14, 66);
      color: white;
      border: none;
      border-radius: 16px;
      cursor: pointer;
      margin-top: 1rem;
    }
    .error {
      color: red;
      font-size: 1rem;
      margin-top: 0.4rem;
    }
    .welcome {
      text-align: center;
      font-size: 1.1rem;
      margin-bottom: 1rem;
    }
  `;

  constructor() {
    super();
    const savedUser = localStorage.getItem("username");
    if (savedUser) {
      this.username = savedUser;
      this.isLoggedIn = true;
      console.log(`Usuario recuperado de localStorage: ${savedUser}`);
    }
  }

  private handleInput(e: Event) {
    const target = e.target as HTMLInputElement;
    if (target.name === "username") this.username = target.value;
    if (target.name === "password") this.password = target.value;
  }

  private handleLogin() {
    const validUser = "admin";
    const validPassword = "1234";

    if (!this.username || !this.password) {
      this.error = "Todos los campos son obligatorios";
      return;
    }

    if (this.username === validUser && this.password === validPassword) {
      this.error = "";
      localStorage.setItem("username", this.username);
      this.isLoggedIn = true;
      this.password = "";
      console.log(`Usuario guardado en localStorage: ${this.username}`);
      alert(`Bienvenido ${this.username}!`);
    } else {
      this.error = "Usuario o contraseña incorrectos";
    }
  }

  private handleLogout() {
    localStorage.removeItem("username");
    console.log("Usuario eliminado de localStorage.");
    this.username = "";
    this.password = "";
    this.error = "";
    this.isLoggedIn = false;
  }

  render() {
    return html`
      <div class="container">
        ${this.isLoggedIn
          ? html`
              <div class="welcome">¡Bienvenido, ${this.username}!</div>
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
