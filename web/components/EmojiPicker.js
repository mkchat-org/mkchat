/** @typedef {object} Emoji
 * @property {string} name
 * @property {number} unicode_version
 * @property {string} category
 * @property {number} order
 * @property {number} display
 * @property {string} shortname
 * @property {} shortname_alternates
 * @property {} ascii
 * @property {number} humanform
 * @property {number} diversity_base
 * @property {null} diversity
 * @property {} diversity_children
 * @property {} gender
 * @property {} gender_children
 * @property {object} code_points
 * @property {string} code_points.base
 * @property {string} code_points.fully_qualified
 * @property {null} code_points.diversity_parent
 * @property {null} code_points.gender_parent
 * @property {string[]} keywords
 */

export class EmojiPicker extends HTMLElement {
    /**
     * @type {ShadowRoot | null}
     */
    #shadowRoot = null;

    /**
     * @type {Emoji[]}
     */
    static #rawList = [];

    static #stylesheet = (() => {
        const sheet = new CSSStyleSheet();
        sheet.replaceSync(`
            :host {
                position: absolute;
                top: 0;
                left: 0;
            }
        `);
        return sheet;
    })();

    constructor() {
        super();

        this.#shadowRoot = this.attachShadow({ mode: "closed" });
        this.#shadowRoot.adoptedStyleSheets = [EmojiPicker.#stylesheet];
        this.#shadowRoot.innerHTML = `
            <input type="text" placeholder="search" />
        `;
    };

    async connectedCallback() {
        if (EmojiPicker.#rawList.length === 0) EmojiPicker.#rawList = await this.#loadList();
        console.log(EmojiPicker.#rawList);
    };

    disconnectedCallback() {

    };

    /**
     * @returns {Promise<Emoji[]>}
     */
    async #loadList() {
        const res = await fetch("/emoji.json");
        const data = await res.json();
        return data;
    };
};

window.customElements.define("emoji-picker", EmojiPicker);
