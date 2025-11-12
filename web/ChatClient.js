/**
 * @typedef {number} ServerProtocol
 */

/**
 * @typedef {"CHAT_MESSAGE"} SocketMessageType
 */

export class ChatClient {
    /**
     * @type {ServerProtocol}
     */
    #protocol = 0; /* protocol revision of the server,
    0 is equal to the version before the protocol system  */

    /**
     * @type {WebSocket | null}
     */
    #ws = null;

    /**
     *
     * @param {string} url
     */
    constructor(url) {
        if (!this.#ws) {
            this.#ws = new WebSocket(url, ["fake-protocol", "unstable-protocol"]);
        };

        this.#ws.addEventListener("open", this.#handleSocketOpen.bind(this));
        this.#ws.addEventListener("message", this.#handleSocketOpen.bind(this));
    };

    get protocol() {
        return this.#protocol;
    };

    #negotiateProtocol() {
        this.#protocol = 0;
    };

    #coerceMessageSchemaToProtocol() {
        switch (this.#protocol) {
            case 1:
                break;
            case 0:
            default:
                break
        };
    };

    /**
     *
     * @param {SocketMessageType} type
     * @param {Object} data
     */
    sendMessage(type, data) {

    };

    /**
     *
     * @param {string | ArrayBufferLike} data
     */
    sendRawMessage(data) {
        this.#ws.send(data);
    };

    /**
     *
     * @param {Event} event
     */
    #handleSocketOpen(event) {
        console.log(this.#ws, event);
        this.#negotiateProtocol();
        console.log(this.#ws.url, "negotiated!~", this.#ws.protocol);
    };

    /**
     *
     * @param {Bun.MessageEvent} event
     */
    #handleIncomingMessage(event) {
        console.log(event);
        this.#negotiateProtocol();
    };
};
