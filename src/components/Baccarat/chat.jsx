import React from "react"
import user1 from "../../assets/user-1.png"
import user2 from "../../assets/user-2.png"
import user3 from "../../assets/user-3.png"

function Chat() {
  return (
    <div className="chat">
      <div className="chat-wrapper">
        <div className="chat-content">
          <div className="chat-list bg-[#2a0b11]">
            <div className="chat-user">
              <img src={user1} alt="" />
            </div>
            <div className="chat-message">
            @username: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </div>
          </div>
          <div className="chat-list bg-[#090f10]">
            <div className="chat-user">
              <img src={user2} alt="" />
            </div>
            <div className="chat-message">
              <span className="text-[#FF44D6]">@username: </span>
              Lorem ipsum dolor sit amet, consectetur adipiscing
              elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Lorem ipsum dolor sit amet.
            </div>
          </div>
          <div className="chat-list bg-[#090f10]">
            <div className="chat-user">
              <img src={user3} alt="" />
            </div>
            <div className="chat-message">
              <span className="text-[#0BB6FF]">@username: </span>
              Lorem ipsum dolor sit amet, consectetur adipiscing
              elit.
            </div>
          </div>
          <div className="chat-list bg-[#090f10]">
            <div className="chat-user">
              <img src={user3} alt="" />
            </div>
            <div className="chat-message">
              <span className="text-[#FFD43D]">@username: </span>
              Lorem ipsum dolor sit amet, consectetur adipiscing
              elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </div>
          </div>
        </div>
        <div className="chat-input">
          <input type="text" placeholder="Type something here...." />
        </div>
      </div>
    </div>
  )
}

export default Chat
