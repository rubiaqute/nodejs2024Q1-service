import { Module } from "@nestjs/common";
import { FavouritesController } from "./favourites.controller";

@Module({
    imports: [],
    controllers: [FavouritesController],
})
export class FavouritesModule { }