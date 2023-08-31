import React from "react"
import bankerText from "../../assets/banker-text-old.png"
import hidden from "../../assets/cards/hidden.png"

function Banker() {
  return (
    <div className="banker flex-1">
      <div className="banker-wrapper h-full">
        <div className="player-text cursor-pointer hover:opacity-80 h-full">
          <img src={bankerText} alt="" className="min-h-[46px] h-full" />
        </div>
        {/* <div className="banker-cards" id="bankerHand">
          <div className="player-cards-placeholder">
            <img src={hidden} alt="" />
            <img src={hidden} alt="" />
            <img src={hidden} alt="" />
          </div>
          <div id="bankerfirstCard"></div>
          <div id="bankersecondCard"></div>
          <div id="bankerthirdCard"></div>
        </div> */}
      </div>
    </div>
  )
}

export default Banker
