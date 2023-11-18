import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import ListingItem from "../components/ListingItem";

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  SwiperCore.use([Navigation]);
  console.log(saleListings);
  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch(`/api/listing/get?offer=true&limit=4`);
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchRentListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=rent&limit=4");
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=sale&limit=4");
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOfferListings();
  }, []);
  return (
    <div>
      {/* top */}
      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
        <h1 className="text-3xl lg:text-6xl font-bold text-slate-700">
          Apne Liye Shi <span className="text-slate-500">SmpTTi</span> <br />{" "}
          Dhundhiye Asaani se
        </h1>
        <div className="text-xs sm:text-sm text-gray-400">
          SmpTTi sbse bdhiya online website h sbse sasti property dekhne k liye.
          <br />
          Hmare paas boht si properties h aapko dikhane k liye.
        </div>
        <Link
          to={"/search"}
          className="text-blue-800 hover:underline text-xs sm:text-sm font-bold"
        >
          Chaliye Shuru krrte h...
        </Link>
      </div>

      {/* swiper */}
      <Swiper navigation>
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listing) => (
            <SwiperSlide>
              <div
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  backgroundSize: "cover",
                }}
                className="h-[500px]"
                key={listing._id}
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>

      {/* listing items for offer,rent and sale */}
      <div className="flex flex-col max-w-6xl mx-auto p-3 gap-8 my-10">
        {offerListings && offerListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                {" "}
                Recent Offers{" "}
              </h2>
              <Link
                className="text-blue-800 text-sm hover:underline"
                to={"/search?offer=true"}
              >
                {" "}
                Show More offers{" "}
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {offerListings.map((listing) => (
                <ListingItem key={listing._id} listing={listing} />
              ))}
            </div>
          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div>
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                {" "}
                Filhaal kiraye pe ghr{" "}
              </h2>
              <Link
                className="text-blue-800 text-sm hover:underline"
                to={"/search?type=rent"}
              >
                {" "}
                Orr dikhaiye{" "}
              </Link>
            </div>
            <div className="flex gap-4 flex-wrap">
              {rentListings.map((listing) => (
                <ListingItem key={listing._id} listing={listing} />
              ))}
            </div>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div>
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                {" "}
                Khridne ke liye mkaan{" "}
              </h2>
              <Link
                className="text-blue-800 text-sm hover:underline"
                to={"/search?offer=true"}
              >
                {" "}
                or dikhaiye{" "}
              </Link>
            </div>
            <div className="flex gap-4 flex-wrap">
              {saleListings.map((listing) => (
                <ListingItem key={listing._id} listing={listing} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
