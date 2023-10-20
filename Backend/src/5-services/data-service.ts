import { CategoryModel, ICategoryModel } from "../3-models/category-model";
import { ResourceNotFoundError } from "../3-models/error-models";
import { IShopModel, ShopModel } from "../3-models/shop-model";

async function getAllCategories(): Promise<ICategoryModel[]> {
    return CategoryModel.find().exec();

}

async function getAllShops(): Promise<IShopModel[]> {
    try {
        // Use populate to retrieve the categoryName from the CategoryModel
        const shops = await ShopModel.find()
            .populate({
                path: "category",
                select: "categoryName", // specify the fields you want to retrieve
            })
            .exec();

        return shops;
    } catch (error) {
        // Handle any errors here
        throw error;
    }
}

function addShop(shop: IShopModel): Promise<IShopModel>{
    shop.validateSync();
    return shop.save();
}

async function deleteShop(_id: string): Promise<void>{
    const deletedShop = await ShopModel.findByIdAndDelete(_id).exec();
    if(!deleteShop) throw new ResourceNotFoundError(_id);
}

export default {
    getAllCategories,
    getAllShops,
    addShop,
    deleteShop
};

