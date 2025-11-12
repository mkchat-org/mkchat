/**
 * @typedef {object} ContextMenuCoordinates
 * @property {number} x
 * @property {number} y
 */

export class ContextMenu extends HTMLElement {
    /**
     * @type {ContextMenuCoordinates}
     */
    #coordinates;

    /**
     *
     * @param {ContextMenuCoordinates} coordinates
     */
    constructor(coordinates) {
        super();

        // TODO: would probably make more sense to have this in the connectedCallback and ignore the 'this' instead of running at construction
        for (const ctxEl of document.querySelectorAll("context-menu")) {
            ctxEl.remove();
        };

        this.#coordinates = coordinates;
    };

    connectedCallback() {
        this.className = "absolute text-zinc-200 bg-zinc-900/25 border border-zinc-800 p-1 font-sans flex flex-col shadow-xl min-w-64 shadow-zinc-950 divide-y divide-zinc-800 backdrop-blur-lg";

        const pad = 8;

        if (this.#coordinates.x + this.offsetWidth > window.document.documentElement.offsetWidth) {
            this.#coordinates.x = window.document.documentElement.offsetWidth - this.offsetWidth - pad;
        };

        if (this.#coordinates.y + this.offsetHeight > window.document.documentElement.offsetHeight) {
            this.#coordinates.y = window.document.documentElement.offsetHeight - this.offsetHeight - pad;
        };

        Object.assign(this.style, {
            top: `${this.#coordinates.y}px`,
            left: `${this.#coordinates.x}px`,
        });
    };

    disconnectedCallback() {

    };
};
