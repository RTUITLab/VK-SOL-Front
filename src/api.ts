import { EventType } from "./types/event"

export type APIEventType = {
  _id: string
  amount: number,
  cover: string,
  date: string,
  description: string,
  minted: number,
  name: string,
  place: string,
  user_id: string,
  white_list: number[]
}

export interface ExchangeRequest {
  users: Array<{
    id: string,
    items: string[]
  }>
}


export const api = {
  authorize: (state: string, address: string) =>
    fetch('https://levandrovskiy.ru/api/auth', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ state, address }) }).then((response) => response.json())
  ,
  getAddress: (state: string) =>
    fetch(`https://levandrovskiy.ru/api/auth/${state}`, { method: 'GET', headers: { 'Content-Type': 'application/json' } }).then((response) => response.json()),

  getAllEvents: () => fetch('https://levandrovskiy.ru/api/event', { method: 'GET', headers: { 'Content-Type': 'application/json' } }).then(response => response.json()),

  getEventsById: (id: string) => fetch(`https://levandrovskiy.ru/api/event?user_id=${id}`, { method: 'GET', headers: { 'Content-Type': 'application/json' } }).then(response => response.json()),

  getEventById: (id: string) => fetch(`https://levandrovskiy.ru/api/event/${id}`, { method: 'GET', headers: { 'Content-Type': 'application/json' } }).then(response => response.json()),

  getAllTickets: () => fetch('https://levandrovskiy.ru/api/ticket', { method: 'GET', headers: { 'Content-Type': 'application/json' } }).then(response => response.json()),

  getTicketsForSell: () => fetch('https://levandrovskiy.ru/api/ticket', { method: 'GET', headers: { 'Content-Type': 'application/json' } }).then(response => response.json()).then((data) => data.filter((i: any) => i.for_sell)),

  createEvent: (data: EventType) => fetch('https://levandrovskiy.ru/api/event', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }).then((response) => response.json()),

  addToWhiteList: (id: string, user_id: string) => fetch(`https://levandrovskiy.ru/api/event/${id}/allow/${user_id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' } }).then((response) => response.json()),

  createExchange: (data: ExchangeRequest) => fetch('https://levandrovskiy.ru/api/exchange', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }).then((response) => response.json())
}