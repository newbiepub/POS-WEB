
class Helpers {
    static convertCSVToJSON () {

    }

    static convertPriceToNumber (price = 0) {
        if(price.constructor === String) {
            price = price.match(/\d/gi).join('');
        }
        return +price;
    }
}

export default Helpers;
