import React from "react";

export default function Search() {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b-2 sm:border-r-2 md:min-h-screen">
        <form className="flex flex-col gap-8">
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">
              Search Term:{" "}
            </label>
            <input
              type="text"
              id="searchTerm"
              placeholder="Search... "
              className="rounded-lg p-3 w-full border"
            />
          </div>
          <div className="flex gap-2 items-center flex-wrap">
            <label className="font-semibold">Types:</label>
            <div className="flex gap-2">
              <input className="w-5" type="checkbox" id="all" />
              <span>Rent & Sales</span>
            </div>
            <div className="flex gap-2">
              <input className="w-5" type="checkbox" id="rent" />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input className="w-5" type="checkbox" id="sale" />
              <span>Sale</span>
            </div>
            <div className="flex gap-2">
              <input className="w-5" type="checkbox" id="offer" />
              <span>offer</span>
            </div>
          </div>
          <div className="flex gap-2 items-center flex-wrap">
            <label className="font-semibold">Amenities:</label>
            <div className="flex gap-2">
              <input className="w-5" type="checkbox" id="parking" />
              <span>Parking</span>
            </div>
            <div className="flex gap-2">
              <input className="w-5" type="checkbox" id="furnished" />
              <span>Furnished</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <label className="font-semibold">Sort:</label>
            <select className="border p-3 rounded-lg" id="sort_order">
              <option>Latest</option>
              <option>High to low</option>
              <option>Low to High</option>
              <option>Oldest</option>
            </select>
          </div>
          <button className="border bg-slate-700 uppercase rounded-lg text-white hover:opacity-95 p-3">
            Search
          </button>
        </form>
      </div>
      <div className="">
        <h1 className="font-semibold text-3xl border-b p-3 mt-5 text-slate-700">
          Listing Items
        </h1>
      </div>
    </div>
  );
}
