Dashboard Website is Converted into a Desktop app using Electron.js
Electron.js is used to build Desktop apps, it uses the Chromium Browser 

Working:
Frontend: Built with React (or any web tech). Electron loads it in a Chromium window.
Backend: Node.js APIs run inside Electron, so your app can do filesystem access, networking, etc. (things a normal browser can’t do).

Description:
Annai Ullam Dashboard was for an Old age home, so they dont need to manually enter all the details in Excel.
This desktop app has a VisitorLog feature (like an log entry book where visitors make entry while visiting), Resident list and Donation list both having the basic CRUD operations.
Have pdf option to download the list as pdf (for resident and donations)

Tech Stack:
MERN Stack with Electorn.js 

Challenges:
In development mode, when you run npm start in React, a dev server is started on http://localhost:3000 and Electron is told to load that URL. If you stop the React dev server or block it from opening, Electron will only show a blank page since nothing is being served. In production mode, after running npm run build in React, you don’t need the dev server because Electron can directly load the built static files (index.html, CSS, JS) from the build/ folder. This way, React doesn’t need to run separately and Electron works fine on its own. So, if you stop the React dev server in development, Electron won’t work, but if you build React first and point Electron to the build files, it will work without opening React separately.

Sample Screenshots of Output:
<img width="576" height="267" alt="image" src="https://github.com/user-attachments/assets/84520e0b-dbe9-4820-96e7-4864186d5c6a" />
<img width="1600" height="838" alt="image" src="https://github.com/user-attachments/assets/ca4347a4-1703-4582-8c41-00d890a0221c" />
