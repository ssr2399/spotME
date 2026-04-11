# 🎯 spotME: Smart & Accessible Event Navigation

## 📌 Chosen Vertical
**Accessibility, Safety, and Smart Events**
spotME is designed to make large-scale events (concerts, sports, conferences) safer, more accessible, and easier to navigate, with a specific focus on neurodivergent individuals and crowd-anxiety management.

## 🧠 Approach and Logic
Large events are often overwhelming, and standard static maps fail to account for real-time crowd dynamics. Our approach was to build a highly responsive, localized dashboard that prioritizes **cognitive ease, immediate action, and seamless Google ecosystem integration**. 

The logic of the application is divided into four distinct modules:
1. **Smart Ticket (Google Wallet & Maps):** Replaces static QR codes with dynamic Google Wallet integration and a live Google Maps heatmap.
2. **Event Pulse:** Manages time-to-event calculations locally, integrating live weather and Google Calendar event generation.
3. **Safety Hub:** A quick-action grid for emergencies utilizing native `tel:` URI schemes to instantly open the user's phone dialer, ensuring 100% uptime even in congested networks.
4. **Predictive Navigation:** Uses hardware-accelerated SVG animations to draw paths dynamically based on user selection, avoiding heavy WebGL libraries to save battery.

## ⚙️ How the Solution Works
* **Smart Ticket & Live Heatmap:** Displays the user's section and a live "Heatmap Status" gradient. 
  * *Google Wallet API:* The "Add to Wallet" flow utilizes the Google Wallet API (`GenericClass` and `GenericObject`). The backend uses `pass.update` to push real-time gate changes or seat upgrades directly to the user's device via push notifications.
  * *Google Maps Platform:* The venue map utilizes the Maps Embed API. In production, this scales to use `google.maps.visualization.HeatmapLayer` to overlay live crowd density (translated from sensor x,y coordinates to Lat/Lng) onto a custom indoor floor plan, styled with Cloud-based Maps Styling for high contrast.
* **Event Pulse:** A live countdown timer featuring an Open-Meteo live weather widget and a **Google Calendar Integration** that dynamically generates a save link based on the event's exact timestamps.
* **Safety Hub:** Quick access to Police (100), Medical (108), and a Quiet Room for sensory relief.
* **Predictive Navigation (Navigate for ME):** An interactive map that updates its route instantly based on the user's desired destination, featuring a simulated AI engine that provides contextual advice based on current crowd density.

## 🔮 Assumptions Made
1. **Hardware/Sensor Integration:** We assume the venue is equipped with crowd-monitoring sensors that feed live `density` percentages to our frontend.
2. **Google Cloud Infrastructure:** We assume the production backend is authenticated with a Google Cloud Service Account to push Wallet updates and fetch Maps API data.
3. **Network Connectivity:** While the app is designed to be lightweight, we assume the user has at least a baseline cellular connection to load the initial web application and Maps iframe.
4. **Device Capabilities:** We assume the user is accessing the dashboard via a modern smartphone browser capable of handling standard HTML5 `tel:` links and CSS animations.

## 🚀 How to Run Locally
1. Clone the repository: `git clone <your-repo-url>`
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Open `http://localhost:3000` in your browser.