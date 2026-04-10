\# 🎯 spotME: Smart \& Accessible Event Navigation



\## 📌 Chosen Vertical

\*\*Accessibility, Safety, and Smart Events\*\*

spotME is designed to make large-scale events (concerts, sports, conferences) safer, more accessible, and easier to navigate, with a specific focus on neurodivergent individuals and crowd-anxiety management.



\## 🧠 Approach and Logic

Large events are often overwhelming, and standard static maps fail to account for real-time crowd dynamics. Our approach was to build a highly responsive, localized dashboard that prioritizes \*\*cognitive ease and immediate action\*\*. 



The logic of the application is divided into four distinct, non-blocking modules:

1\. \*\*State Management:\*\* Crowd density and time calculations are managed locally to ensure zero latency. 

2\. \*\*Dynamic Routing:\*\* Instead of heavy map libraries, we use hardware-accelerated SVG animations (`PredictiveNavigation`) to draw paths dynamically based on user selection.

3\. \*\*Failsafe Design:\*\* We intentionally removed external API dependencies (like live LLM calls) for core safety advice, replacing them with a robust, rule-based engine that guarantees 100% uptime even in congested network environments typical of large stadiums.

4\. \*\*Accessibility First:\*\* The UI is built with high-contrast Tailwind CSS, large touch targets, and comprehensive ARIA labels (`role="region"`, `aria-live="polite"`) for screen reader compatibility.



\## ⚙️ How the Solution Works

The application serves as a unified dashboard with four core features:

\* \*\*Smart Ticket:\*\* Displays the user's section and a live "Crowd Stats" progress bar. The color dynamically shifts (Green -> Yellow -> Red) based on real-time density metrics.

\* \*\*Event Pulse:\*\* A live countdown timer to the next sub-event and the overall event finish time. It includes a \*\*Google Calendar Integration\*\* that dynamically generates a save link based on the event's exact timestamps.

\* \*\*Safety Hub:\*\* A quick-action grid for emergencies. The Police (100) and Medical (108) buttons utilize `tel:` URI schemes to instantly open the user's native phone dialer. It also includes quick access to a Quiet Room for sensory relief.

\* \*\*Predictive Navigation (Navigate for ME):\*\* An interactive map that updates its route instantly based on the user's desired destination (Exit, Restroom, Entrance, Food). It features a simulated AI engine that provides contextual advice based on current crowd density.



\## 🔮 Assumptions Made

To build this prototype, the following assumptions were made:

1\. \*\*Hardware/Sensor Integration:\*\* We assume the venue is equipped with crowd-monitoring sensors (e.g., overhead cameras, Wi-Fi triangulation, or turnstile data) that feed the live `density` percentage to our frontend. In this prototype, density is simulated via a localized React interval.

2\. \*\*Venue Mapping:\*\* We assume the event organizers have provided a coordinate grid of the venue to map the SVG paths for the `PredictiveNavigation` component.

3\. \*\*Network Connectivity:\*\* While the app is designed to be lightweight, we assume the user has at least a baseline cellular or venue Wi-Fi connection to load the initial web application.

4\. \*\*Device Capabilities:\*\* We assume the user is accessing the dashboard via a modern smartphone browser capable of handling standard HTML5 `tel:` links and CSS animations.



\## 🚀 How to Run Locally

1\. Clone the repository: `git clone <your-repo-url>`

2\. Install dependencies: `npm install`

3\. Start the development server: `npm run dev`

4\. Open `http://localhost:3000` in your browser.

