import React, { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";

export default function Navigation() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user_name = localStorage.getItem("user_name");
    const token = localStorage.getItem("accessToken");

    if (token && user_name) {
      fetch(`https://api.noroff.dev/api/v1/auction/profiles/${user_name}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (response.status === 401) {
            console.error("Token is invalid or expired.");
            setLoading(false);
            return null;
          }
          return response.json();
        })
        .then((responseData) => {
          if (responseData) {
            setProfile(responseData);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching profile data:", error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  const [showUserInfo, setShowUserInfo] = useState(false);

  const toggleUserInfo = () => {
    setShowUserInfo(!showUserInfo);
  };

  return (
    <>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <Link to="/" className="text-xl btn btn-ghost">
            Your App Name
          </Link>
        </div>
        <div className="flex items-center flex-none gap-2">
          {profile && (
            <>
              <p className="mr-2 text-gray-700">Credits: {profile.credits}</p>
              <div className="dropdown dropdown-end">
                <label
                  tabIndex={0}
                  onClick={toggleUserInfo}
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img
                      alt="User Avatar"
                      src={profile.avatar || "/defaultprofilepic.png"}
                    />
                  </div>
                </label>
                {showUserInfo && (
                  <ul
                    tabIndex={0}
                    className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
                  >
                    <li>
                      <p>Welcome! {profile.name}</p>
                    </li>
                    <li>
                      <Link to="/profile">Profile</Link>
                    </li>
                    <li>
                      <Link to="/" onClick={handleLogout}>
                        Logout
                      </Link>
                    </li>
                  </ul>
                )}
              </div>
            </>
          )}
          <div className="form-control">
            <input
              type="text"
              placeholder="Search"
              className="w-24 input input-bordered md:w-auto"
            />
          </div>
          {!profile && (
            <Link to="/login" className="btn btn-primary">
              Log In
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
