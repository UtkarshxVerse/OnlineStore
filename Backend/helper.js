function createUniqueImageName(image){
    const timestamp = Date.now();
    const randomNum = Math.floor(Math.random() * 1000);
    return `${timestamp}_${randomNum}.jpg`;
}

module.exports = {createUniqueImageName};