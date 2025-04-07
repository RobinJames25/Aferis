import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        rating: { type: Number, required: true },
        comment: { type: String, required: true },
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    },
    { timestamps: true }
);

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        brand: { type: String, required: true },
        category: { type: String, required: true },
        price: { type: Number, required: true },
        originalPrice: { type: Number, required: true },
        discountPercentage: { type: Number, required: true },
        description: { type: String, required: true },
        image: { type: String, required: true },
        countInStock: { type: Number, required: true },
        rating: { type: Number, default: 0 },
        numReviews: { type: Number, default: 0 },
        reviews: [reviewSchema],  // Sub-schema for reviews
        sizes: { type: [Number], required: true },
        colors: { type: [String], required: true },
    },
    {
        timestamps: true, // Automatically handle createdAt and updatedAt
    }
);

const Product = mongoose.model('Product', productSchema);

export default Product;
