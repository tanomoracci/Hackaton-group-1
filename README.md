# "Magic Mirror" Boilerplate

## Setup
Clone: `git clone https://github.com/Cloudoki/MagicMirrorHackathon.git`

Install: `cd MagicMirrorHackathon && yarn`

Run: `yarn start`

## Get started
As a starter we've created a very simple `pages/Home` page to welcome you into the project. Feel free to add any pages and components as you please, also feel free to install any modules you see fit.

## Video Stream Component
To have a very basic video stream going, just use the `<RoomViewComponent />`, present in the `/components` folder. The minimum parameters are a room name and a config url.

Example
```
import RoomViewComponent from '../components/RoomViewComponent'

<RoomViewComponent
  roomName={'testingroom'}
  configUrl={'https://api.simplewebrtc.com/config/guest/57b6ffcbb7bb9769d8d56fcb'}
/>
```
With the above you should be able to create an enter your own room called "testingroom". Open up two browser windows, and you'll be able to see yourself in it.

## File structure
Most of the file strucutre is there to support the video component. You should only need to focus on:
- `src/pages`: To create your pages;
- `src/components`: To create any components you need. You can ignore all the other ones that are there already;
- `src/App.js`: If you need to update the Routing.

Besides these files and folders, you can/should ignore everything else.
