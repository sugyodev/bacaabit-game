import React from "react"
import playerText from "../../assets/player-text-old.png"
import hidden from "../../assets/cards/hidden.png"

function Player() {
  return (
    <div className="player flex-1">
      <div className="player-wrapper h-full">
        <div className="player-text cursor-pointer hover:opacity-80 h-full">
          <img src={playerText} alt="" className="min-h-[46px] h-full" />
        </div>
        <div className="player-cards">
          <div className="player-cards-placeholder">
            <img src={hidden} alt="" />
            <img src={hidden} alt="" />
            <img src={hidden} alt="" />
          </div>
          <div id="playerfirstCard"></div>
          <div id="playersecondCard"></div>
          <div id="playerthirdCard"></div>
        </div>
      </div>
    </div>
  )
}

export default Player
