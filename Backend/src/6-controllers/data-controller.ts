import express, { Request, Response, NextFunction } from "express";
import dataService from "../5-services/data-service";
import { ShopModel } from "../3-models/shop-model";
import StatusCode from "../3-models/status-code";

const router = express.Router();

// Get http://localhost4000:api/categories
router.get("/categories", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const categories = await dataService.getAllCategories();
        response.json(categories);
    }
    catch (err: any) {
        next(err);
    }
});

// Get http://localhost4000:api/shops
router.get("/shops", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const shops = await dataService.getAllShops();
        response.json(shops);
    }
    catch (err: any) {
        next(err);
    }
});

// post http://localhost4000:api/shops
router.post("/shops", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const shop = new ShopModel(request.body);
        const addedShop = await dataService.addShop(shop);
        response.status(StatusCode.Created).json(addedShop);
    }
    catch (err: any) {
        next(err);
    }
});

// delete http://localhost4000:api/shops
router.delete("/shops/:_id([a-fA-F0-9]{24})", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const _id = request.params._id;
        await dataService.deleteShop(_id);
        response.sendStatus(StatusCode.NoContent);
    }
    catch (err: any) {
        next(err);
    }
});




export default router;
