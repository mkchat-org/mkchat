import { decode } from "@std/msgpack";
const ws = new WebSocket("ws://localhost:3001?alias=nick");

/**
 *
 * @param {Event} event
 */
ws.onopen = event => {
    console.debug(`Websocket open event:`, event);
};

/**
 *
 * @param {Bun.MessageEvent} message
 */
ws.onmessage = async message => {
    if (typeof message.data === "string") {
        console.error("Unable to parse message data of type 'string'");
        return;
    };
    console.debug(`Message data:`, decode(new Uint8Array(await message.data.arrayBuffer())));
};

/**
 *
 * @param {Event} event
 */
ws.onerror = event => {
    console.debug(`Websocket error event:`, event);
};

/**
 *
 * @param {CloseEvent} event
 */
ws.onclose = event => {
    console.debug(`Websocket close event:`, event);
};

window.ws = ws;
