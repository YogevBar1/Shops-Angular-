import mongoose , { Document, Schema, model } from "mongoose";
import { CategoryModel } from "./category-model";

// 1. Interface:

export interface IShopModel extends Document{
    name: string;
    categoryId: mongoose.Schema.Types.ObjectId;
    address: string;
}

// 2. Schema
export const ShopSchema = new Schema <IShopModel>({
    name:{
        type: String,
        required: [true,"Missing Shop Name"]
    },
    categoryId:{
        type: mongoose.Schema.Types.ObjectId
    },
    address:{
        type: String,
        required: [true,"Missing address"]
    }
},{
    versionKey: false,      //don`t add ___v to an added document
    toJSON: {virtuals: true},   //return foreign key in json.
    id: false   //Don`t add id on top of_id
});

ShopSchema.virtual("category",{
    ref: CategoryModel, //Foreign Model
    localField: "categoryId",   //Foreign key
    foreignField:"_id", //primaryKey
    justOne: true   //Shop has one category
})

// 3.Model
export const ShopModel = model<IShopModel>("shopModel", ShopSchema,"shops")
