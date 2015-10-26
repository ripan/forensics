require 'rails_helper'

RSpec.describe "Directions", :type => :request do
  describe "GET /directions" do
    it "works! (now write some real specs)" do
      get directions_path
      expect(response.status).to be(200)
    end
  end
end
