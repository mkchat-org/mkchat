export class UploadZone extends HTMLElement {
    #label = "Drop file here";
    #files: File[] = [];

    constructor(label?: string) {
        super();

        if (label) this.#label = label;
    };

    connectedCallback() {
        const index = document.querySelectorAll("upload-zone > input").length + 1;

        this.className = `
            bg-zinc-950 border border-2 border-zinc-800 border-dashed flex items-center
            justify-center transition-colors rounded-sm bg-linear-to-bl from-zinc-900 to-transparent text-zinc-300 font-bold
            hover:from-violet-500/25 hover:border-violet-500
        `;

        const labelEl = document.createElement("label");
        labelEl.className = "w-full p-2 cursor-pointer min-h-16 flex items-center justify-center bg-transparent";
        labelEl.innerText = this.#label;
        labelEl.setAttribute("for", `file-upload-input-${index}`);

        const uploadEl = document.createElement("input");
        uploadEl.className = "hidden absolute top-0 left-0";
        uploadEl.type = "file";
        uploadEl.id = `file-upload-input-${index}`;

        this.appendChild(labelEl);
        this.appendChild(uploadEl);

        uploadEl.addEventListener("change", this.#handleUpload.bind(this));
        this.addEventListener("click", this.#handleClick);
        this.addEventListener("dragover", this.#handleDragOver);
        this.addEventListener("dragleave", this.#handleDragLeave);
        this.addEventListener("drop", this.#handleDrop);
    };

    disconnectedCallback() {
        // uploadEl.removeEventListener("change", this.#handleUpload);
        this.removeEventListener("click", this.#handleClick);
        this.removeEventListener("dragover", this.#handleDragOver);
        this.removeEventListener("dragleave", this.#handleDragLeave);
        this.removeEventListener("drop", this.#handleDrop);
    };

    #handleClick(event: MouseEvent) {
        console.log(event);
    };

    #handleDragOver(event: DragEvent) {
        console.log(event);
        event.preventDefault();

        this.classList.add("border-violet-500");
        this.classList.add("from-violet-500/25");

        this.classList.remove("border-zinc-800");
        this.classList.remove("from-zinc-900");
    };

    #handleDragLeave(event?: DragEvent) {
        this.classList.add("border-zinc-800");
        this.classList.add("from-zinc-900");

        this.classList.remove("border-violet-500");
        this.classList.remove("from-violet-500/25");
    };

    async #handleDrop(event: DragEvent) {
        event.preventDefault();
        this.#handleDragLeave();

        const dataTransfer = event.dataTransfer;
        if (!dataTransfer) return;

        if (dataTransfer.types.includes("text/plain")) {
            const uri = dataTransfer.getData("text/plain");

            console.debug(uri);

            const res = await fetch(uri);
            const data = await res.text();

            console.log(data);

            // in mkchat we should proxy this to ensure data can be captured even when cors is unhappy
        };

        if (dataTransfer.files.length > 0) {
            this.#files.push(...dataTransfer.files);
        };
    };

    #handleUpload(event: Event) {
        const uploadEl = event.target as HTMLInputElement;
        if (!uploadEl || !uploadEl.files) return;

        this.#files.push(...uploadEl.files);
    };
};
