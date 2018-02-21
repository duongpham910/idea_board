class Api::V1::IdeasController < Api::V1::BaseController
  before_action :set_idea, only: :update

  def index
    @ideas = Idea.all
    response_success @ideas
  end

  def create
    @idea = Idea.new idea_params
    if @idea.save
      response_success idea: @idea
    else
      response_fail @idea.errors
    end
  end

  def update
    if @idea.update_attributes idea_params
      response_success idea: @idea
    else
      response_fail @idea.errors
    end
  end

  private
  def idea_params
    params.require(:idea).permit(Idea::ATTRIBUTE_PARAMS)
  end

  def set_idea
    @idea = Idea.find params[:id]
    if @idea.blank?
      response_fail
    end
  end
end
