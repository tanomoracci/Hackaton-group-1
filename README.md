# "Magic Mirror" Boilerplate

## Setup
Clone: `git clone https://github.com/Cloudoki/MagicMirrorHackathon.git`

Install: `cd MagicMirrorHackathon && yarn`

Run: `yarn start`

## Video Stream Component
To have a very basic video stream going, just use the `<RoomViewComponent />`, present in the `/components` folder. The minimum parameters are a room name and a config url.

Example
```
<RoomViewComponent
  roomName={'testingroom'}
  configUrl={'https://api.simplewebrtc.com/config/guest/1ea870b48756b8800d83588d'}
/>
```
With the above you should be able to create an enter your own room called "testingroom"
