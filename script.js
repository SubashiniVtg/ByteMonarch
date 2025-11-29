// // Function to switch views based on button clicks
// function showView(viewId) {
//   // Hide all views
//   document.querySelectorAll(".view").forEach((view) => {
//     view.classList.add("hidden");
//   });
//   // Show the selected view
//   document.getElementById(viewId + "-view").classList.remove("hidden");
// }

// // ----------------------------------------------------------------------
// // ZOOHO CLIQ SDK INTEGRATION
// // ----------------------------------------------------------------------

// // 1. Initialize the SDK when the window loads
// window.onload = function () {
//   // Initialize the Cliq App
//   ZOHO.CLIQLISTENER.init();

//   // 2. Add an action listener for native Cliq events (optional but good practice)
//   ZOHO.CLIQLISTENER.onAction(function (data) {
//     console.log("Action received from Cliq:", data);
//     // You could use this to handle events like: user changes theme,
//     // or a native action button in Cliq calls a function here.
//   });

//   console.log("WorkCoach Widget Initialized and connected to Cliq.");

//   // Example of using the SDK to get user info immediately upon load
//   getUserInfo();
// };

// // 3. Example SDK Call: Get the current user's profile information
// function getUserInfo() {
//   ZOHO.CLIQLISTENER.API.V2.profile
//     .get({
//       user_id: "me",
//     })
//     .then(function (response) {
//       const user = response.response.user;
//       console.log("Logged in user:", user.name);

//       // Update the Profile View with the user's Cliq name
//       const profileView = document.getElementById("profile-view");
//       profileView.innerHTML += `<p>Hello, ${user.name}! Your Cliq ID is ${user.id}.</p>`;
//     })
//     .catch(function (error) {
//       console.error("Failed to fetch user info from Cliq:", error);
//     });
// }
// Function to switch views based on button clicks
function showView(viewId) {
  // Hide all views
  document.querySelectorAll(".view").forEach((view) => {
    view.classList.add("hidden");
  });
  // Show the selected view
  document.getElementById(viewId + "-view").classList.remove("hidden");
}

// ---
// ZOHO CLIQ SDK INTEGRATION (Using ZC.SDK)
// ---

// 1. Initialize the SDK immediately after the script loads
// The window.onload is suitable, but ZC.SDK.init() is the correct function.
window.onload = function () {
  initializeCliqSDK();
};

function initializeCliqSDK() {
  // Correct way to initialize the Cliq SDK (using the ZC object)
  ZC.SDK.init()
    .then(function () {
      // SDK is now initialized and ready to use
      console.log("✅ WorkCoach Widget Initialized and connected to Cliq.");

      // Call functions that rely on Cliq after initialization is complete
      getUserInfo();

      // You can also add ZC.SDK.onAction listener here if needed,
      // though it's less common for simple widgets.
      /*
        ZC.SDK.onAction(function (data) {
             console.log("Action received from Cliq:", data);
        });
        */
    })
    .catch(function (error) {
      console.error("❌ Failed to initialize Cliq SDK:", error);
    });
}

// 2. Example SDK Call: Get the current user's profile information
function getUserInfo() {
  // Use ZC.SDK.API for making API calls.
  // The profile endpoint is accessed via ZC.SDK.API.Cliq (or ZC.SDK.API.Cliq.Users.getProfile)
  // For getting 'me', the simpler ZC.SDK.API.User.getCurrentUser() is often preferred.
  ZC.SDK.API.User.getCurrentUser()
    .then(function (response) {
      // The response structure for getCurrentUser is slightly different,
      // returning the user object directly under 'data'.
      const user = response.data;
      console.log("👤 Logged in user:", user.name);

      // Update the Profile View with the user's Cliq name
      const profileView = document.getElementById("profile-view");
      // Find the h2 element and append the user-specific data
      profileView.innerHTML = `
                <h2>My Profile</h2>
                <p>Hello, **${user.name}**! Your Cliq ID is **${user.id}**.</p>
                <p>Weekly Productivity Score, Streaks, Badges...</p>
            `;
    })
    .catch(function (error) {
      console.error("❌ Failed to fetch user info from Cliq:", error);
      const profileView = document.getElementById("profile-view");
      profileView.innerHTML += `<p style="color:red;">Error: Could not retrieve Cliq user data.</p>`;
    });
}
