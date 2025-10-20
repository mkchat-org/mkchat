import { randomUUIDv7 } from "bun";
import { encode } from "@std/msgpack";
import home from "./web/pages/home/index.html";
import chat from "./web/pages/chat/index.html";

const server = Bun.serve({
    port: 3001,
    fetch(req, server) {
        const { searchParams } = new URL(req.url); // has to be stored/accessed prior to upgrade else will return blank struct

        // const remoteAddress = req.re;
        const uuid = randomUUIDv7();
        const alias = searchParams.has("alias") ? searchParams.get("alias") : uuid; // fallback to the uuid if no alias is provided
        const room = searchParams.has("room") ? searchParams.get("room") : "main";
        // console.log(url.searchParams);

        const success = server.upgrade(req, {
            data: {
                uuid,
                alias,
                room
            }
        });

        if (!success) {
            return new Response("no up :(");
        };

        // Bun automatically returns a 101 Switching Protocols
        // if the upgrade succeeds
        return undefined;
    },
    routes: {
        "/": home,
        "/chat": chat,
        "/icon.png": Bun.file("./web/icon.png")
    },
    websocket: {
        idleTimeout: 32, // (not sure we still need this) otherwise the client will disconnect for seemingly no reason every 2 minutes
        maxPayloadLength: 4096 * 4096,
        // compression: uws.SHARED_COMPRESSOR,
        open(ws) {
            // const params = new URLSearchParams(req.url.slice(req.url.indexOf("?") + 1));
            console.log(ws.data);
            ws.send(encode(`Your user id is ${randomUUIDv7()}`))
            // ws.id = nanoid(16);

            // users.set(ws.id, {
            //     ip: ws.remoteAddress,
            //     disconnect: function () {
            //         ws.end(1, "kicked!");
            //     }
            // });
        },

        // this is called when a message is received
        async message(ws, message) {
            console.log(`Received ${message}`);
            // send back a message
            ws.send(`You said: ${message}`);
            ws.send(encode(`You said: ${message}`));
        },

        drain(ws) {
            console.log(`WebSocket backpressure: ${ws.getBufferedAmount()}`);
            // not handling backpressue because im lazy lmfao
        },

        async close(ws, code, reason) {

        }
    },
});

console.log(`Listening on ${server.hostname}:${server.port}`);
