```javascript
db.users.aggregate([
  {
    $match: { productIds: { $ne: [] } } // Add a match stage to filter out empty arrays
  },
  {
    $lookup: {
      from: 'products',
      localField: 'productIds',
      foreignField: '_id',
      as: 'purchasedProducts'
    }
  },
  {
    $unwind: '$purchasedProducts'
  },
  {
    $group: {
      _id: '$userId',
      totalSpent: { $sum: '$purchasedProducts.price' }
    }
  }
])
```