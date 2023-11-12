import mongoose from "mongoose";

const lisitingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    regularPrice: {
      type: Number,
      required: true,
    },
    discountPrice: {
      type: Number,
      required: true,
    },
    bathrooms: {
      type: Number,
      requried: true,
    },
    bedrooms: {
      type: Number,
      required: true,
    },
    furnished: {
      type: Boolean,
      requried: true,
    },
    parking: {
      type: Boolean,
      required: true,
    },
    type: {
      type: String,
      requried: true,
    },
    offer: {
      type: Boolean,
      required: true,
    },
    imageUrls: {
      type: Array,
      required: true,
    },
    userRef: {
      type: String,
      requried: true,
    },
  },
  { timestamps: true }
);

const Listing = mongoose.model("Listing", lisitingSchema);

export default Listing;
