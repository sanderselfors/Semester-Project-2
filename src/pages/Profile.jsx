import React, { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newAvatar, setNewAvatar] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const defaultAvatar = "/defaultprofilepic.png";
  const defaultString = "The API does not provide the data";
  const user_name = localStorage.getItem("user_name");
  let token = localStorage.getItem("accessToken");

  useEffect(() => {
    if (!token || !user_name) {
      console.error("Token or user name not found in local storage.");
      setLoading(false);
      return;
    }

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
  }, [token, user_name]);

  const handleAvatarUpdate = async () => {
    setIsLoading(true);

    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(
        `https://api.noroff.dev/api/v1/auction/profiles/${user_name}/media`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ avatar: newAvatar }),
        }
      );

      if (response.ok) {
        window.location.reload();
      } else {
        setError("Error updating avatar");
      }
    } catch (error) {
      setError("Error updating avatar");
    } finally {
      setIsLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6, delay: 0.2 } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="max-w-3xl p-8 mx-auto mt-10 bg-white rounded-lg shadow-md"
    >
      {loading && <p>Loading...</p>}
      {!profile && (
        <div className="text-center">
          <p className="mb-4 text-xl font-semibold">{defaultString}</p>
          {!token && (
            <div>
              <p className="mb-4 text-lg">
                Please log in to view your profile.
              </p>
              <Link to="/login">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 text-white bg-blue-500 rounded focus:outline-none hover:bg-blue-600"
                >
                  Log In
                </motion.button>
              </Link>
            </div>
          )}
        </div>
      )}

      {profile && (
        <>
          <h2 className="mb-4 text-3xl font-bold">
            Welcome, {profile.name}!
          </h2>
          <motion.div
            className="flex flex-col mb-8 md:flex-row md:items-center"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="mr-6">
              <img
                className="w-32 h-32 rounded-full md:w-48 md:h-48"
                src={profile.avatar || defaultAvatar}
                alt="User Avatar"
              />
            </div>
            <div>
              <p className="mb-2 text-gray-600">Email: {profile.email}</p>
              <p className="mb-2 text-gray-600">
                Total Credit: {profile.credits}
              </p>
              <div className="mt-4">
                {/* Avatar update form */}
                <label
                  htmlFor="avatar"
                  className="block mb-2 font-bold text-gray-700"
                >
                  New Avatar URL:
                </label>
                <div className="flex">
                  <input
                    type="text"
                    id="avatar"
                    value={newAvatar}
                    onChange={(e) => setNewAvatar(e.target.value)}
                    className="w-full p-2 border rounded-l focus:outline-none"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAvatarUpdate}
                    disabled={isLoading}
                    className="px-4 py-2 text-white bg-blue-500 rounded-r focus:outline-none hover:bg-blue-600"
                  >
                    {isLoading ? "Updating Avatar..." : "Update Avatar"}
                  </motion.button>
                </div>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 text-sm text-red-500"
                  >
                    {error}
                  </motion.p>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </motion.div>
  );
}

export default Profile;
