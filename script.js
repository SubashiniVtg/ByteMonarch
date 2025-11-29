// Function to switch views based on button clicks
function showView(viewId) {
  // Hide all views
  document.querySelectorAll(".view").forEach((view) => {
    view.classList.add("hidden");
  });
  // Show the selected view
  document.getElementById(viewId + "-view").classList.remove("hidden");
}

// ----------------------------------------------------------------------
// ZOOHO CLIQ SDK INTEGRATION
// ----------------------------------------------------------------------

// 1. Initialize the SDK when the window loads
window.onload = function () {
  // Initialize the Cliq App
  ZOHO.CLIQLISTENER.init();

  // 2. Add an action listener for native Cliq events (optional but good practice)
  ZOHO.CLIQLISTENER.onAction(function (data) {
    console.log("Action received from Cliq:", data);
    // You could use this to handle events like: user changes theme,
    // or a native action button in Cliq calls a function here.
  });

  console.log("WorkCoach Widget Initialized and connected to Cliq.");

  // Example of using the SDK to get user info immediately upon load
  getUserInfo();
};

// 3. Example SDK Call: Get the current user's profile information
function getUserInfo() {
  ZOHO.CLIQLISTENER.API.V2.profile
    .get({
      user_id: "me",
    })
    .then(function (response) {
      const user = response.response.user;
      console.log("Logged in user:", user.name);

      // Update the Profile View with the user's Cliq name
      const profileView = document.getElementById("profile-view");
      profileView.innerHTML += `<p>Hello, ${user.name}! Your Cliq ID is ${user.id}.</p>`;
    })
    .catch(function (error) {
      console.error("Failed to fetch user info from Cliq:", error);
    });
}
