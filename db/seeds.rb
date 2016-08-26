# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Restaurant.delete_all
Review.delete_all

Restaurant.create!([
  {id: 1, name: "Feeka", phone: "012 345 6789", website: "feeka.com", address: "19, Jalan Mesui, 50200 Kuala Lumpur Malaysia ", description: "Cafes, Coffee & Tea"},
  {id: 2, name: "Juan Valdez Café", phone: "012 345 6789", website: "juancafe.com", address: "348 Jalan Tun Razak, 50400 Kuala Lumpur, Malaysia", description: "Coffee & Tea, Desserts, Cafes "},
  {id: 3, name: "The Humble Chef", phone: "012 345 6789", website: "humblechef.com", address: "Jalan Medan Setia 2, 50490 Kuala Lumpur, Malaysia ", description: "Italian, Food Trucks "},
  {id: 4, name: "Alexis Bangsar", phone: "012 345 6789", website: "alexis.com", address: "29 Jalan Telawi 3, 59100 Kuala Lumpur, Malaysia", description: "Asian Fusion, Desserts "},
  {id: 5, name: "Tedboy Bakery", phone: "012 345 6789", website: "tedboybakery.com", address: "10, Jalan Telawi 4, 59100 Kuala Lumpur, Malaysia", description: "Bakeries, Patisserie/Cake Shop, Cafes"}
])

# Review.create!([
#   {id: 1, restaurant_id: 1, author: "Bob", rating: 3, review: "I like coming here as i think the environment is cozy and food and coffee is great"},
#   {id: 2, restaurant_id: 1, author: "Rich", rating: 4, review: "If you are lucky to come at a time where it is quieter, it is definitely a very nice place to just sit and chat with friends."},
#   {id: 3, restaurant_id: 2, author: "James", rating: 5, review: "Apart from coffee, they serve cakes, salad, wraps and many more."},
#   {id: 4, restaurant_id: 2, author: "Alison", rating: 5, review: "So, it's not just a café but also a place where you can enjoy good coffee over good food"},
#   {id: 5, restaurant_id: 3, author: "James", rating: 4, review: "Humble chef is pretty famous."},
#   {id: 6, restaurant_id: 4, author: "Kay", rating: 1, review: "The ladies were all given a single rose and a piece of chocolate at the beginning of dinner"},
#   {id: 7, restaurant_id: 5, author: "Jed", rating: 4, review: "While waiting I looked around and noticed the restaurant was modern and very clean."}
# ])