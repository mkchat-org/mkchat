export class IconElement extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: "open" });
        this.dataset["icon"] = "";

        const sheet = new CSSStyleSheet();
        sheet.replaceSync(IconElement.styleSheet);
        this.shadowRoot.adoptedStyleSheets.push(sheet);
    };

    connectedCallback() {

    };

    disconnectedCallback() {

    };

    static styleSheet = `
        :host {
            display: inline-block;
            text-align-center;
            vertical-align: middle;
            width: 24px;
            height: 24px;
        }

        svg {
            width: 100%;
            height: 100%;
            display: block;
        }
    `;
};
