export class Card {
    constructor() {
        // console.log(window.location.href);
        if (typeof window === "undefined") {
            this.previous = "";
            this.current = "";
            return;
        }
        const data = this.readStorage();
        if(data) {
            console.log(`Data: ${data.url}`);
            this.previous = data.url;
        }
        this.current = window.location.href;
        // console.log(`Previous: ${this.previous}`);
    }


    readStorage() {
        const cardData = sessionStorage.getItem('cardData');
        if(cardData) {
            const data = JSON.parse(cardData);
            return data;
        }
        return null;
    }

    updateStorage(index) {
        let url = window.location.href;
        
        const cardData = {
            url: url,
            previous: this.current
        }

        this.previous = cardData.previous;
        this.url = url;
        console.log(`Url: ${url}`);
        console.log(`Current: ${this.current}`)
        sessionStorage.setItem('cardData', JSON.stringify(cardData));
    }
}