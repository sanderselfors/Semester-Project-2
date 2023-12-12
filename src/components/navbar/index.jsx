
import { useState, useEffect } from "react";
import { Link, useNavigate } from "@tanstack/react-router";

export default function Navigation() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showUserInfo, setShowUserInfo] = useState(false);
  const navigate = useNavigate();

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

  useEffect(() => {
    // If the profile state changes, check if the user is logged out and navigate to the login page
    if (!profile) {
      navigate("/login");
    }
  }, [profile, navigate]);

  useEffect(() => {
    const handleNavbarLogin = () => {
      // Fetch user profile information after successful login
      fetchUserProfile();
    };

    // Listen for the custom event when the login occurs
    window.addEventListener("navbar-login", handleNavbarLogin);

    // Listen for the custom event when the avatar is updated
    window.addEventListener("avatar-update", fetchUserProfile);

    // Clean up the event listeners on component unmount
    return () => {
      window.removeEventListener("navbar-login", handleNavbarLogin);
      window.removeEventListener("avatar-update", fetchUserProfile);
    };
  }, []);

  const fetchUserProfile = async () => {
    const user_name = localStorage.getItem("user_name");
    const token = localStorage.getItem("accessToken");

    if (token && user_name) {
      try {
        const response = await fetch(
          `https://api.noroff.dev/api/v1/auction/profiles/${user_name}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setProfile(data);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    // Setting the profile state to null triggers the navigation effect
    setProfile(null);
  };

  const toggleUserInfo = () => {
    setShowUserInfo(!showUserInfo);
  };

  return (
    <>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <Link to="/" className="text-xl btn btn-ghost">
            My App
          </Link>
        </div>
        <div className="flex items-center flex-none gap-2">
          {profile && (
            <>
              <p className="mr-2 text-gray-400">
                Credits: {profile?.credits || 0}
              </p>
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
