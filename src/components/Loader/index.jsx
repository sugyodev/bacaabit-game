import React from "react"
import video from "../../assets/videos/bbs_anim.gif"
import "./index.css"

export const Loader = () => {
  return (
    <div className="loader-wrap">
      <img src={video} />
    </div>
  )
}
