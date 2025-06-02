import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

// Interfaz para el Pokemon
export interface IPokemon {
  id?: number;
  name?: string;
  types?: { type: { name: string } }[];
  abilities?: { ability: { name: string } }[];
}

// Componente de información del Pokémon
@customElement("my-element")
export class MyElements extends LitElement {
  @property() pokemon: IPokemon = {};
  @property() username = "";

  // API pokeApi
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
