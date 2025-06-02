import { LitElement, html, css } from "lit";
import { customElement, state, property } from "lit/decorators.js";

// Interfaz para el Pokémon
interface IPokemon {
  id?: number;
  name?: string;
  types?: { type: { name: string } }[];
  abilities?: { ability: { name: string } }[];
}

// Componente de información del Pokémon
@customElement("my-element")
class MyElements extends LitElement {
  @property() pokemon: IPokemon = {};
  @property() username = "";

  //API pokeApi
  private userPokemonMap: Record<string, string> = {
    charmeleon: "https://pokeapi.co/api/v2/pokemon/5",
    bulbasaur: "https://pokeapi.co/api/v2/pokemon/bulbasaur",
    squirtle: "https://pokeapi.co/api/v2/pokemon/squirtle",
    pikachu: "https://pokeapi.co/api/v2/pokemon/pikachu",
  };

  async getPokemon() {
    try {
      if (this.username && this.userPokemonMap[this.username]) {
        const response = await fetch(this.userPokemonMap[this.username]);
        const result = await response.json();
        this.pokemon = {
          id: result.id,
          name: result.name,
          types: result.types,
          abilities: result.abilities.slice(0, 2),
        };
      }
    } catch (error) {
      console.error("Error fetching Pokémon data:", error);
    }
  }

  constructor() {
    super();
  }

  updated(changedProperties: Map<string, any>) {
    if (changedProperties.has("username")) {
      this.getPokemon();
    }
  }

  static styles = css`
    .container-pokemon {
      display: flex;
      flex-direction: column;
      align-items: center;
      background: linear-gradient(
        nulldeg,
        rgba(255, 228, 212, 1) 0%,
        rgba(255, 215, 245, 1) 58%,
        rgba(255, 255, 255, 1) 100%
      );
      margin-bottom: 1px;
    }
  `;
  /* por cada inicio tendremos atributos especificos para cada uno en
      pantalla */
  render() {
    return html`
      <div class="container-pokemon">
        ${this.pokemon.name
          ? html`
              <div class="imagenPokemon">
                <img
                  src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${this
                    .pokemon.id}.svg"
                  alt="imagen pokemon"
                />
              </div>
              <p><strong>ID:</strong> ${this.pokemon.id}</p>
              <p><strong>Nombre:</strong> ${this.pokemon.name}</p>
              <p>
                <strong>Clase:</strong> ${this.pokemon.types
                  ?.map((t) => t.type.name)
                  .join(", ")}
              </p>
              <p>
                <strong>Habilidades:</strong> ${this.pokemon.abilities
                  ?.map((a) => a.ability.name)
                  .join(", ")}
              </p>
            `
          : html`<p>Cargando datos...</p>`}
      </div>
    `;
  }
}

// Componente de login con múltiples usuarios
@customElement("login-form")
class LoginForm extends LitElement {
  @state() private username = "";
  @state() private password = "";
  @state() private error = "";
  @state() private isLoggedIn = false;

  //usuarios correctos
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
