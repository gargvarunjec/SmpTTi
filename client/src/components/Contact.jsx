import { list } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Contact({ listing }) {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState("");
  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();
        setLandlord(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchLandlord();
  }, [listing.userRef]);
  // console.log(landlord);
  console.log(message);
  return (
    <>
      {landlord && (
        <div className="flex flex-col gap-2">
          <p>
            Contact <span className="font-semibold">{landlord.username} </span>{" "}
            for <span className="font-semibold">{listing.name}</span>
          </p>
          <textarea
            name="message"
            id="message"
            rows="2"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter your message here ..."
            className="w-full rounded-lg border p-3"
          ></textarea>
          <Link
            to={`mailto:${landlord.email}?Subject=Regarding ${listing.name}&body=${message}`}
            className="bg-slate-700 p-3 text-white text-center rounded-lg hover:opacity-95"
          >
            {" "}
            Send Message{" "}
          </Link>
        </div>
      )}
    </>
  );
}
