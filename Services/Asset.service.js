// const accountsettingRepository = require('../../DataAccess/accountSetting.repo');
var fs = require('fs');
class AssetService {

    async getAllAssets() {
        return new Promise((resolve, reject) => {
            fs.readFile('./Files/Assets.json', 'utf8', async function readFileCallback(err, data) {
                if (err) {
                    console.log(err);
                    return await { Message: "Failed to add Asset" };
                } else {
                    var Assets = JSON.parse(data);

                    resolve({
                        "Assets": Assets.table
                    });//now it an object
                }
            });
        });

    }


    async getAssetByAssetID(assetID) {
        return new Promise((resolve, reject) => {
            fs.readFile('./Files/Assets.json', 'utf8', async function readFileCallback(err, data) {
                if (err) {
                    console.log(err);
                    return await { Message: "Failed to add Asset" };
                } else {
                    var Assets = JSON.parse(data);

                    resolve({
                        "Assets": Assets.table.filter(async (x) => { if (x.AssetID == assetID) return x; })[0]
                    });//now it an object
                }
            });
        });

    }

    async getAssetByQRID(QRID) {
        return new Promise((resolve, reject) => {
            fs.readFile('./Files/Assets.json', 'utf8', async function readFileCallback(err, data) {
                if (err) {
                    console.log(err);
                    return await { Message: "Failed to add Asset" };
                } else {
                    var Assets = JSON.parse(data);
                    var Asset = Assets.table.filter(x => x.QRID == QRID);
                    resolve({
                        "Asset": Asset
                    });//now it an object
                }
            });
        });

    }

    async getAssetByTransactionID(transactionID) {
        return new Promise((resolve, reject) => {
            fs.readFile('./Files/Assets.json', 'utf8', async function readFileCallback(err, data) {
                if (err) {
                    console.log(err);
                    return await { Message: "Failed to add Asset" };
                } else {
                    var Assets = JSON.parse(data);
                    var Asset = Assets.table.filter(x => x.TransactionID == transactionID);
                    resolve({
                        "Asset": Asset[0]
                    });//now it an object
                }
            });
        });

    }

    async addAsset(Asset) {
        console.log("Add asset: ");
        console.log(Asset);
        return new Promise((resolve, reject) => {
            fs.readFile('./Files/Assets.json', 'utf8', async function readFileCallback(err, data) {
                if (err) {
                    console.log(err);
                    reject({ Message: "Failed to add Asset" });
                } else {
                    var Assets = JSON.parse(data); //now it an object
                    Assets.table.push(Asset); //add some data
                    var json = JSON.stringify(Assets); //convert it back to json
                    fs.writeFile('./Files/Assets.json', json, 'utf8', function readFileCallback(err, data) {
                        if (err) {
                            console.log(err);
                            reject({ Message: "Failed to add Asset" });
                        } else {
                            console.log("Successfully written");
                            resolve({ Message: "Successfully added Asset" });
                        }
                    }); // write it back 
                }
            });
        });

    }

    async updateAsset(Asset) {
        return new Promise((resolve, reject) => {
            fs.readFile('./Files/Assets.json', 'utf8', async function readFileCallback(err, data) {
                if (err) {
                    console.log(err);
                    reject({ Message: "Failed to add Asset" });
                } else {
                    var Assets = JSON.parse(data); //now it an object
                    //Assets.table.push(Asset); //add some data
                    //Assets.filter(x=>x.AssetID == Asset.AssetID);
                    var assetID = Asset.AssetID;
                    if (Assets.table.filter((x) => { if (x.AssetID == assetID) return x }).length >= 1) {
                        Assets.table = Assets.table.filter((x) => { if (x.AssetID != assetID) return x });
                        Assets.table.push(Asset); //add some data
                        var json = JSON.stringify(Assets); //convert it back to json
                        fs.writeFile('./Files/Assets.json', json, 'utf8', function readFileCallback(err, data) {
                            if (err) {
                                console.log(err);
                                reject({ Message: "Failed to add Asset" });
                            } else {
                                console.log("Successfully written");
                                resolve({ Message: "Successfully added Asset" });
                            }
                        }); // write it back 
                    }
                    else{
                        reject({ Message: "Failed to add Asset" });
                    }
                }
            });

        });
    }


    async deleteAsset(id) {
        return await { "id": 1, "name": "Asset1" };
    }


}

module.exports = AssetService;