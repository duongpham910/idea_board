class Api::V1::BaseController < ApplicationController
  def response_success data = nil
    render json: {
      data: data,
      status: true
    }
  end

  def response_fail data = nil, status_code = 200
    render json: {
      data: data,
      status: false
    }, status: status_code
  end
end
