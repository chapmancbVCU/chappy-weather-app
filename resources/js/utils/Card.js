export class Card {
    /**
     * Manages sessionStorage tracking of currently selected card.
     */
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

    /**
     * Gets index that represents currently selected card.
     * 
     * @returns {number} The index for currently selected card.
     */
    getIndex() {
        return this.index;
    }
    
    /**
     * Test to check if current and previously rendered view are the same.
     * 
     * @returns {boolean} True if current and previous views are the same, 
     * otherwise we return false.
     */
    matchesPrevious() {
        return (this.current === this.previous) ? true : false;
    }

    /**
     * Reads cardData from session storage.
     * @returns {object} Data from session storage.
     */
    readStorage() {
        const cardData = sessionStorage.getItem('cardData');
        if(cardData) {
            const data = JSON.parse(cardData);
            return data;
        }
        return null;
    }

    /**
     * Updates cardData in sessionStorage.
     * @param {number} newIndex The index for selected card.
     */
    updateStorage(newIndex) {
        let url = window.location.href;
        
        const cardData = {
            index: newIndex,
            previous: this.current,
            url: url
        }

        this.previous = cardData.previous;
        this.url = url;
        this.index = newIndex;
        console.log(`Url: ${url}`);
        console.log(`Current: ${this.current}`)
        sessionStorage.setItem('cardData', JSON.stringify(cardData));
    }
}