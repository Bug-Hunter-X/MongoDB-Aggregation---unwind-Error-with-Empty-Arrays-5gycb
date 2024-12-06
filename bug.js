```javascript
// Assuming you have a MongoDB collection named 'users'

db.users.aggregate([
  {
    $lookup: {
      from: 'products', // Another collection
      localField: 'productIds', // Array field in 'users'
      foreignField: '_id', 
      as: 'purchasedProducts'
    }
  },
  {
    $unwind: '$purchasedProducts' // This is where the problem might arise if productIds is empty 
  },
  {
    $group: {
      _id: '$userId',
      totalSpent: { $sum: '$purchasedProducts.price' }
    }
  }
])
```