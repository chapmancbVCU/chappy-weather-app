export class Card {
    constructor() {
        // console.log(window.location.href);
        if (typeof window === "undefined") {
            this.previous = "";
            this.current = "";
            this.index = 0;
            return;
        }
        const data = this.readStorage();
        if(data) {
            console.log(`Data: ${data.url}`);
            this.previous = data.url;
            this.index = data.index;
        }
        this.current = window.location.href;
        // console.log(`Previous: ${this.previous}`);
    }

    matchesPrevious() {
        return (this.current === this.previous) ? true : false;
    }

    readStorage() {
        const cardData = sessionStorage.getItem('cardData');
        if(cardData) {
            const data = JSON.parse(cardData);
            return data;
        }
        return null;
    }

    updateStorage(newIndex) {
        let url = window.location.href;
        
        const cardData = {
            index: newIndex,
            previous: this.current,
            url: url
        }

        this.previous = cardData.previous;
        this.url = url;
        console.log(`Url: ${url}`);
        console.log(`Current: ${this.current}`)
        sessionStorage.setItem('cardData', JSON.stringify(cardData));
    }
}