class Api::V1::StoresController < ApplicationController

    def index
        @stores = Store.all 
        render json: @stores, include: :items, status: 200
    end

    def show
        @store = Store.find_by(id: params[:id])
        render json: @store, include: :items, status: 200
    end

    def create
        @store = Store.create(store_params)
        render json: @store, include: :items, status: 200
    end 

    def update 
        @store = Store.find_by(id: params[:id])
        @store.update(store_params)
        render json: @store, include: :items, status: 200
    end

    def destroy
        @store.destroy
        head :no_content
    end

    private

        def store_params 
            params.require(:store).permit(:name)
        end

end