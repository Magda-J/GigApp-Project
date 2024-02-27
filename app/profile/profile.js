"use client";
import { useEffect, useState } from "react";
import EventForm from "../components/EventForm";
import EventCard from "../components/EventCard";
import LogoutButton from "../components/logoutButton";
import Link from "next/link";
import HomeButton from "../components/HomeButton";
import InterestedEvents from "../components/Interested";

const Profile = (props) => {
  const [events, setEvents] = useState([]);
  const [current, setCurrent] = useState(undefined);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [loggedUsername, setLoggedUsername] = useState("");

  const refreshList = () => {
    props.client
      .getEvents()
      .then((response) => {
        setEvents(response.data);
      })
      .catch((err) => {
        console.log("failed to get API request (GET)");
      });
  };

  // Fetch logged username from the server
  // Fetch logged username from the server
  const fetchLoggedUsername = () => {
    props.client
      .getLoggedUsername()
      .then((username) => {
        setLoggedUsername(username); // Directly set the loggedUsername state with the username
      })
      .catch((err) => {
        console.log("Failed to fetch logged username:", err);
      });
  };

  const removeEvents = (id) => {
    props.client.removeEvent(id).then(() => {
      refreshList();
    });
  };

  const updateEvents = (event) => {
    setCurrent(event);
  };

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  useEffect(() => {
    console.log("Update current");
  }, [current]);

  useEffect(() => {
    refreshList();
    fetchLoggedUsername();
    console.log(events);
  }, []);

  return (
    <div
      id="userprofile"
      className="fixed top-0 left-0 w-screen h-full bg-black overflow-y-auto"
    >
      <div className="flex justify-end items-center h-[3%] mb-6">
        <div className="ml-auto mr-4 mt-20">
          <HomeButton />
        </div>
        <div className="mr-4 mt-20 mr-20">
          <LogoutButton setToken={props.setToken} />
        </div>
      </div>
      <p className="text-cyan-400 text-center mt-10">
        Hi! Good to see you back, {loggedUsername}!
      </p>

      <div className="flex flex-col items-center">
        <h3 className="bg-[#13C3B5] p-5 m-2 font-semibold text-white text-xl rounded-md hover:text-white hover:bg-[#534A4A] focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 transition-all duration-300 ease-in-out mt-10">
          <button onClick={toggleFormVisibility}>
            {isFormVisible ? "Hide Event Form" : "Add Event"}
          </button>
        </h3>
        {isFormVisible && (
          <div className="">
            <EventForm
              client={props.client}
              refreshList={refreshList}
              setCurrent={setCurrent}
              currentEvent={current}
            />
          </div>
        )}

        {events.map((current) => (
          <div className="" key={current._id}>
            <EventCard
              removeEvents={(id) => removeEvents(id)}
              keyA={current._id}
              EventName={current.name}
              EventCity={current.city}
              EventDate={current.date}
              EventPrice={current.price}
              EventTime={current.time}
              photo={current.photo}
              EventVenue={current.venue}
              EventCountryCode={current.countrycode}
              EventPostcode={current.postcode}
              EventCurrency={current.currency}
              EventPriceMax={current.price2}
              EventTicketLink={current.ticketlink}
              updateEvents={updateEvents}
            />
          </div>
        ))}

        <div>
          <InterestedEvents events={events} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
