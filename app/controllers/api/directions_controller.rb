class Api::DirectionsController < ApplicationController
  skip_before_filter :verify_authenticity_token
  before_action :set_direction, only: [:show, :update, :destroy]

  # GET /directions
  # GET /directions.json
  def index
    @directions = Direction.all

    render json: @directions
  end

  # GET /directions/1
  # GET /directions/1.json
  def show
    render json: @direction
  end

  # POST /directions
  # POST /directions.json
  def create
    @direction = Direction.new(direction_params)

    if @direction.save
      render json: @direction, status: :created#, location: @direction
    else
      render json: @direction.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /directions/1
  # PATCH/PUT /directions/1.json
  def update
    @direction = Direction.find(params[:id])

    if @direction.update(direction_params)
      head :no_content
    else
      render json: @direction.errors, status: :unprocessable_entity
    end
  end

  # DELETE /directions/1
  # DELETE /directions/1.json
  def destroy
    @direction.destroy

    head :no_content
  end

  def location
    condition = {position_x:params[:x],position_y:params[:y]}
    user = User.where(email:params[:email]).take
    if user.directions.length >= Direction::MAXIMUM_USER_GUESSES
      render json: {error:  "cannot have more than #{Direction::MAXIMUM_USER_GUESSES} guesses", guseeses: user.directions}, status: :unprocessable_entity
    else
      direction = Direction.where({position_x:params[:x],position_y:params[:y]})
      user.directions<<direction
      render json: user.directions
    end
  end

  private

  def set_direction
    @direction = Direction.find(params[:id])
  end

  def direction_params
    #params.require(:direction).permit(:position_x, :position_y)
    params.permit(:position_x, :position_y)
  end
end
