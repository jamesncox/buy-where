class ItemSerializer
    include FastJsonapi::ObjectSerializer
    attributes :name, :price, :quantity
    belongs_to :store
end