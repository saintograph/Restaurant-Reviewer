# json.extract! review, :id, :rating, :comment, :created_at, :updated_at, :user_id
# json.url review_url(review, format: :json)
# json.merge! review.attributes
json.array! @reviews do |review|
    json.(review, :id, :rating, :comment, :created_at, :updated_at, :user_id)
end