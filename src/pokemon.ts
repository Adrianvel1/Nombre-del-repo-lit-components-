import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("my-tester")
export class MyTester extends LitElement {
  static styles = css`
    p {
      font-size: 16px;
    }
  `;

  render() {
    return html`<p>Hola, Mundo Testing!</p>`;
  }
}
