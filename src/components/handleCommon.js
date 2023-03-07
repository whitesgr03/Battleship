const common = (() => {
    return {
        createGrid() {
            let column = 1;
            let row = 10;

            const container = document.createElement("div");

            container.className = "container";

            for (let i = 1; i <= 100; i++) {
                const div = document.createElement("div");

                div.dataset.x = column;
                div.dataset.y = row;

                column++;

                if (i % 10 === 0) {
                    column = 1;
                    row -= 1;
                }

                container.append(div);
            }

            return container;
        },
        load(resolve) {
            let obj = {};

            for (let key of resolve.keys()) {
                const keys = key.match(/(?<=\.\/).+?(?=_panel|\.png$)/g)[0];
                const url = resolve(key);
                obj[keys] = url;
            }
            return obj;
        },
    };
})();

export { common };
