import axios from 'axios';

export async function getRooms() {
  const response = await axios.get(`https://cloudoki-magicmirror.firebaseio.com/teams/team-rui/rooms.json`)
  return response;
}

export async function addRoom(data) {
  const response = await axios.post(`https://cloudoki-magicmirror.firebaseio.com/teams/team-rui/rooms.json`, data)
  return response;
}

export async function deleteRoom() {
  const response = await axios.get(`https://cloudoki-magicmirror.firebaseio.com/teams/team-rui.json`)
  return response;
}

export async function getWeather() {
  const response = await axios.get(`http://api.openweathermap.org/data/2.5/onecall?lat=38.722252&lon=-9.139337&exclude=hourly,minutely,daily,alerts&units=metric&appid=cb5b8421741e0395e20819cb82ecb9d1`)
  return response;
}
