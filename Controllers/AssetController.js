var Router = require('./basecontroller');
const middleware = require("../Middleware");
const RouteStub = require('../Common/routestub');
const Assetservice = require("../Services/Asset.service");
const asyncWrapper = middleware.asyncWrapper;
const syncWrapper = middleware.wrapper;
//var fs = require('fs');

class AssetController extends Router {
    constructor(routePath, app) {
        super(routePath, app);
        this.Service = new Assetservice();
    }

    get services() {
        return [
            // Property Routes
            new RouteStub('GET', '/get-all-Assets', 'getAllAssets'),
            new RouteStub('POST','/add-Asset','addAsset'),
            new RouteStub('POST','/update-Asset','updateAsset'),
            new RouteStub('GET','/get-asset-by-id', 'getAssetByAssetID'),
            new RouteStub('GET','/get-asset-by-transaction-id', 'getAssetByTransactionID'),
            new RouteStub('GET','/get-asset-by-qrid','getAssetByQRID')
        ];
    }

      async getAllAssets(req, res) {
        const data = await asyncWrapper("Failed to Get All Assets", this.Service.getAllAssets);
        console.log(data);
        res.status(data.statusCode).send(data);
    }

    async getAssetByAssetID(req, res) {
        //console.log(req.query.id);
        const data = await asyncWrapper("Failed to Get Asset BY ID", this.Service.getAssetByAssetID,req.query.id);
        console.log(data);
        res.status(data.statusCode).send(data);
    }
    async getAssetByTransactionID(req, res) {
        const data = await asyncWrapper("Failed to Get Asset By Transaction ID", this.Service.getAssetByTransactionID,req.query.id);
        console.log(data);
        res.status(data.statusCode).send(data);
    }
    async getAssetByQRID(req, res) {
        const data = await asyncWrapper("Failed to Get Asset By QR ID", this.Service.getAssetByQRID,req.query.id);
        console.log(data);
        res.status(data.statusCode).send(data);
    }
    async addAsset(req, res) {
        console.log(req.body);
        const data = await asyncWrapper("Failed to Add Asset", this.Service.addAsset,req.body);
        res.status(data.statusCode).send(data);
    }
    async updateAsset(req, res) {
        const data = await asyncWrapper("Failed to Update Asset", this.Service.updateAsset,req.body);
        res.status(data.statusCode).send(data);
    }
    async deleteAsset(req, res) {
        const data = await asyncWrapper("Failed to Delete Asset", this.Service.deleteAsset,req.body);
        res.status(data.statusCode).send(data);
    }

 
}

module.exports = AssetController;