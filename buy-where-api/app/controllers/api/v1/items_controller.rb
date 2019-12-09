class Api::V1::ItemsController < ApplicationController
    def index
        @item = Item.all 
        render json: ItemSerializer.new(@items), include: [:store]
    end

    def show
        @item = Item.find_by(id: params[:id])
        render json: ItemSerializer.new(@item), include: [:store]
    end

    def create
        @item = Item.new(item_params)

        if @item.save
          json_response(@item, :created)
        else
          render json: { message: 'Item was not created.' }
        end
    end 

    def update
        @item = Item.find(params[:id])
        @item.update(item_params)
        render json: ItemSerializer.new(@item), include: [:store]
    end
    
    def destroy
        @item.destroy
        head :no_content
    end

    private

    def item_params 
        params.require(:item).permit(:name, :quantity, :price)
    end
end