import { ChatClient } from "../../ChatClient";
const ws = new ChatClient("ws://localhost:3001?alias=nick");
const ws2 = new ChatClient("wss://mkchat.net");
import "../../components/icons/Command";
import "../../components/icons/Folder";
import "../../components/icons/PaperPlaneRight";
import "../../components/icons/PuzzlePiece";
import "../../components/icons/Smiley";
import { EmojiPicker } from "../../components/EmojiPicker";

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
