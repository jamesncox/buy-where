class Api::V1::ItemsController < ApplicationController
    def index
        @item = Item.all 
        # render json: ItemSerializer.new(@items), include: [:store]
        render json: @items, status: 200
    end

    def show
        @item = Item.find_by(id: params[:id])
        # render json: ItemSerializer.new(@item), include: [:store]
        render json: @item, status: 200

    def create
        @item = Item.create(items_params)

        render json: @item, status: 200
    end 

    def update
        @item = Item.find_by(id: params[:id])
        @item.update(item_params)
        # render json: ItemSerializer.new(@item), include: [:store]
        render json: @item, status: 200
    end
    
    def destroy
        @item.destroy
        head :no_content
    end

    private

    def item_params 
        params.require(:item).permit(:name, :price, :quantity)
    end
end