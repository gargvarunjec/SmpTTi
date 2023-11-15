import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import Contact from "../components/Contact";

export default function Listing() {
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [contact, setContact] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const params = useParams();
  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setLoading(false);
        setListing(data);
        setError(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };

    fetchListing();
  }, [params.listingId]);
  return (
    <main>
      {loading && (
        <p className="font-semibold text-2xl text-center my-7">Loading...</p>
      )}
      {error && (
        <div className="flex flex-col ">
          <p className="text-center my-7 text-red-700 text-2xl">
            {" "}
            Something Went Wrong{" "}
          </p>
          <Link to={"/"} className="hover:underline text-sm text-center">
            {" "}
            Go home{" "}
          </Link>
        </div>
      )}
      {listing && !error && !loading && (
        <div>
          <Swiper navigation>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="h-[550px]"
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="flex flex-col gap-4 max-w-4xl mx-auto p-3 my-7">
            <p className="text-2xl font-semibold">
              {listing.name} - &#8377;{" "}
              {listing.offer
                ? listing.discountPrice.toLocaleString("en-US")
                : listing.regularPrice.toLocaleString("en-US")}
              {listing.type === "rent" && " / month"}
            </p>
            <p className="flex items-center mt-6 gap-2 text-slate-600 text-sm">
              <FaMapMarkerAlt className="text-green-700" />
              {listing.address}
            </p>
            <div className="flex gap-4">
              <p className="bg-red-900 w-full max-w-[200px] text-white text-center rounded-md p-1">
                {listing.type === "rent" ? "For Rent" : "For Sale"}
              </p>
              {listing.offer && (
                <p className="bg-green-900 w-full max-w-[200px] text-white text-center rounded-md p-1">
                  &#8377;{+listing.regularPrice - +listing.discountPrice} OFF
                </p>
              )}
            </div>
            <p className="">
              <span className="font-semibold text-black"> Description - </span>
              {listing.description}
            </p>
            <ul className="flex flex-wrap gap-4 sm:gap-6 items-center text-green-900 text-sm font-semibold">
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaBed className="text-lg" />
                {listing.bedrooms > 1
                  ? `${listing.bedrooms} beds`
                  : `${listing.bedrooms} bed`}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaBath className="text-lg" />
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} baths`
                  : `${listing.bathrooms} bath`}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaParking className="text-lg" />
                {listing.parking ? "Parking Spot" : "No Parking"}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaChair className="text-lg" />
                {listing.furnished ? "Furnished" : "UnFurnished"}
              </li>
            </ul>
            {currentUser && currentUser._id !== listing.userRef && !contact && (
              <button
                onClick={() => setContact(true)}
                className="bg-slate-700 rounded-lg text-white p-3 hover:opacity-95"
              >
                Contact Landlord{" "}
              </button>
            )}
            {contact && <Contact listing={listing} />}
          </div>
        </div>
      )}
    </main>
  );
}
