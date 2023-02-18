import { EventType } from "./types/event"


export const api = {
  authorize: (state: string, address: string) =>
    fetch('https://levandrovskiy.ru/api/auth', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ state, address }) }).then((response) => response.json())
  ,
  getAddress: (state: string) =>
    fetch(`https://levandrovskiy.ru/api/auth/${state}`, { method: 'GET', headers: { 'Content-Type': 'application/json' } }).then((response) => response.json()),

  getAllEvents: () => fetch('https://levandrovskiy.ru/api/event', { method: 'GET', headers: { 'Content-Type': 'application/json' } }).then(response => response.json()),
  createEvent: (data: EventType) => fetch('https://levandrovskiy.ru/api/event', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }).then((response) => response.json())
}