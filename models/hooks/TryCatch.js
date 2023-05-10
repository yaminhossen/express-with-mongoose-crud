let check = (instance) => {
    return new Promise((resolve, reject) => {
        try {
            resolve(instance.save());
        } catch (error) {
            reject(error.message)
        }
    })
}

module.exports = async function (instance) {
    let data;
    await check(instance)
        .then(res => {
            data = res;
        })
        .catch(error => {
            console.log(error);
            data = false;
        })
    return data;
}