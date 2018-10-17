import React from 'react';

const WatchingOptions= ()=> {
  let optionsarray=[
    {title: `LIVE STREAMS`, text: `Watch the entire tournament live through Steam
    Broadcasting or on Twitch. With complete coverage of the event available on stream,
    you won't have to miss out on any of the action no matter where you are.`,},
    {title: `IN PERSON`, text: `If you purchased a ticket to attend The International, visit the
    ticketing FAQ to learn how to pick up your badge and link it to your Steam account.`},
    {title:`NEWCOMER STREAM`, text: `Have friends new to Dota? The Newcomer Stream is a special
    broadcast enhanced with contextual overlays aimed at easing people into understanding the expansive
    world of Dota during the most exciting event of the competitive year. Available in English and Chinese.`,},
    {title: `IN-GAME`, text: `Watching in the Dota 2 client lets you control your own camera or even see the
    pro-player perspective. Battle Pass owners can also make in-game Battle Predictions for a chance
    at bonus Battle Points.`,},
    {title: `PUBSTOMPS`, text: `We know many fans can't make it to Rogers Arena to see The International
    in person, so we've once again partnered with Barcraft United to help users connect at local Pubstomp
    events around the globe.`,},
    {title: `MULTICAST`, text: `Keep track of all of the action during the Group Stage by tuning into the
     Multicast stream. This stream will highlight the best parts of matches being played simultaneously.
     Watch Multicast via Steam Broadcasting or Twitch. Available in English, Chinese, and Russian.`,},
   ]
  let showoptions= optionsarray.map((item)=> {
    return (
      <div className="Watching-option-box">
        <h3>{item.title}</h3>
        <p>{item.text}</p>
      </div>
    )
  })
  return (
    showoptions
  )
}
export default WatchingOptions
