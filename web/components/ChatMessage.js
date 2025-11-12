import { ContextMenu } from "./ContextMenu";
import type { ReplyBanner } from "./ReplyBanner";

export type ChatMessageAuthor = {
    id: string;
    nickname: string;
    avatarURL: string;
};

export type ChatMessageDetails = {
    id: BigInt;
    author: ChatMessageAuthor;
    content: {
        text: string,
        attachments?: []
    };
    timestamp: unknown;
    referenceId?: BigInt;
};

export class ChatMessage extends HTMLElement {
    #details: ChatMessageDetails;

    constructor(details: ChatMessageDetails) {
        super();

        this.#details = {
            ...details,
            author: {
                ...details.author,
                nickname: details.author.nickname || details.author.id
            }
        };
    };

    connectedCallback() {
        if (this.#details.referenceId) {
            this.#details.content.text = `Reply to ${this.#details.referenceId} > ${this.#details.content.text}`;
        };

        this.className = "border border-dashed border-transparent hover:bg-zinc-500/10 hover:border-zinc-500/50";
        this.innerHTML = `
            <div class="flex flex-row gap-3 p-2 transition-all">
                <img
                    class="bg-zinc-100 h-10 w-10 rounded-sm cursor-pointer"
                    src="${this.#details.author.avatarURL}"
                    alt="avatar"
                />
                <div class="flex items-start justify-start flex-col">
                    <div class="flex flex-row gap-2">
                        <div class="cursor-pointer decoration-2 decoration-dotted hover:underline">
                            <span class="font-bold">${this.#details.author.nickname}</span>
                        </div>
                        <span class="text-zinc-500">2:17 AM</span>
                    </div>
                    <div class="message-content">${this.#details.content.text}</div>
                </div>
            </div>
        `;

        this.addEventListener("contextmenu", this.#contextMenuListener);
    };

    disconnectedCallback() {
        this.removeEventListener("contextmenu", this.#contextMenuListener);
    };

    #contextMenuListener(event: MouseEvent) {
        if ((event.target as HTMLElement).closest("context-menu")) return;

        event.preventDefault();

        const ctxMenu = new ContextMenu({
            x: event.clientX,
            y: event.clientY
        });

        const ctxButtons = [
            {
                label: "Delete Message",
                handler: (event: MouseEvent) => {
                    console.debug("Delete message event", event);
                    this.remove();
                    console.debug("Deleted message:", this.#details.id);
                }
            },
            {
                label: "Reply",
                handler: (event: MouseEvent) => {
                    console.debug("Reply message event", this.#details.id, event);

                    // const replyMessageEl = new ChatMessage({
                    //     id: generateRandomChatMessageId(),
                    //     author: localAuthor,
                    //     content: {
                    //         text: `Reply to (${this.#details.id}) > ${this.#details.content.text}`,
                    //     },
                    //     timestamp: null
                    // });

                    document.querySelector<ReplyBanner>("reply-banner")!.show(this.#details.id);

                    // pushMessage(replyMessageEl);
                    ctxMenu.remove();
                }
            }
        ]

        for (const ctxButton of ctxButtons) {
            const btn = document.createElement("button");
            btn.className = "cursor-pointer hover:bg-violet-500 hover:text-zinc-950 px-2 py-1 transition-colors text-left";
            btn.innerText = ctxButton.label;
            btn.addEventListener("click", ctxButton.handler);

            ctxMenu.appendChild(btn);
        };

        for (const ctxEl of this.querySelectorAll("context-menu")) {
            ctxEl.remove();
        };

        this.appendChild(ctxMenu);
    };
};
