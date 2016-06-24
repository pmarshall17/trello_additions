class ItemsController < ApplicationController
  before_action :find_board, :find_list
  
  def index
    render json: @lists.item
  end

  def show
  end

  def edit
  end

  def create
    @list = @lists.item.new(list_params)
      if @item.save
        render json: @item
      else
        render json: {errors: @item.errors.full_messages}
      end
  end

  def update
  end
end
