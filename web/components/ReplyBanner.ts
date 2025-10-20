export class ReplyBanner extends HTMLElement {
    #referenceMessageId: BigInt = 0n;

    constructor(initialReferenceMessageId?: BigInt) {
        super();

        this.className = "hidden w-full";
        if (initialReferenceMessageId) this.show(initialReferenceMessageId);
    };

    connectedCallback() {
        this.innerHTML = `
            <div class="left-0 bottom-full bg-zinc-600/25 w-full border border-zinc-600/50 py-1 px-2 w-full flex items-center justify-between">
                <span id="ref-id">Replying to ${this.#referenceMessageId}</span>
                <button id="close-btn" type="button" class="text-rose-500 cursor-pointer text-xl">⨯</button>
            </div>
        `;

        this.querySelector("#close-btn")?.addEventListener("click", () => {
            this.hide();
        });
    };

    disconnectedCallback() {

    };

    show(referenceMessageId: BigInt) {
        this.classList.remove("hidden");
        this.#referenceMessageId = referenceMessageId;
        this.#update();
    };

    hide() {
        this.classList.add("hidden");
        this.#referenceMessageId = 0n;
    };

    #update() {
        this.querySelector<HTMLSpanElement>("#ref-id")!.innerText = `Replying to ${this.#referenceMessageId.toString()}`;
    };

    get referenceMessageId() {
        return this.#referenceMessageId;
    };
};
