class Api::V1::IdeasController < Api::V1::BaseController
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

  private
  def idea_params
    params.require(:idea).permit(Idea::ATTRIBUTE_PARAMS)
  end
end
