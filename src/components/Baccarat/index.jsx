import React, { useState, useEffect } from "react"
import $ from "jquery"
import _ from "lodash"
import Wallet from "./wallet"
import RecentBets from "./recentBets"
import Chat from "./chat"
import Player from "./player"
import Banker from "./banker"
import Action from "./action"
import Logo from "../../assets/baccarat-logo.svg"
import { cardOffsets, selectedWager } from "../../constants"
import doller from "../../assets/wallet-dollar-old.png"
import Hidden from "../../assets/cards/hidden.png"
import H12 from "../../assets/cards/h12.png"
import B5 from "../../assets/cards/b5.png"
import CardBack1 from "../../assets/card-back1.png"
import CardBack2 from "../../assets/card-back2.png"

export const Baccarat = () => {
  const [playerBetAmount, setPlayerBetAmount] = useState([])
  const [tieBetAmount, setTieBetAmount] = useState([])
  const [bankerBetAmoount, setBankerBetAmoount] = useState([])
  const [coinType, setCoinType] = useState("one")
  const [coinAmount, setCoinAmount] = useState(1)
  const [betamount, setBetamount] = useState(0)
  const [playeramount, setPlayeramount] = useState(0)
  const [tieamount, setTieamount] = useState(0)
  const [bankeramount, setBankeramount] = useState(0)
  const [playerScore, setPlayerScore] = useState(0)
  const [bankerScore, setBankerScore] = useState(0)
  const [playerFinalScore, setPlayerFinalScore] = useState(0)
  const [bankerFinalScore, setBankerFinalScore] = useState(0)
  const [deck, setDeck] = useState([
    { v: 1, f: "c1" },
    { v: 2, f: "c2" },
    { v: 3, f: "c3" },
    { v: 4, f: "c4" },
    { v: 5, f: "c5" },
    { v: 6, f: "c6" },
    { v: 7, f: "c7" },
    { v: 8, f: "c8" },
    { v: 9, f: "c9" },
    { v: 10, f: "c10" },
    { v: 0, f: "c11" },
    { v: 0, f: "c12" },
    { v: 0, f: "c13" },
    { v: 1, f: "h1" },
    { v: 2, f: "h2" },
    { v: 3, f: "h3" },
    { v: 4, f: "h4" },
    { v: 5, f: "h5" },
    { v: 6, f: "h6" },
    { v: 7, f: "h7" },
    { v: 8, f: "h8" },
    { v: 9, f: "h9" },
    { v: 10, f: "h10" },
    { v: 0, f: "h11" },
    { v: 0, f: "h12" },
    { v: 0, f: "h13" },
    { v: 1, f: "s1" },
    { v: 2, f: "s2" },
    { v: 3, f: "s3" },
    { v: 4, f: "s4" },
    { v: 5, f: "s5" },
    { v: 6, f: "s6" },
    { v: 7, f: "s7" },
    { v: 8, f: "s8" },
    { v: 9, f: "s9" },
    { v: 10, f: "s10" },
    { v: 0, f: "s11" },
    { v: 0, f: "s12" },
    { v: 0, f: "s13" },
    { v: 1, f: "d1" },
    { v: 2, f: "d2" },
    { v: 3, f: "d3" },
    { v: 4, f: "d4" },
    { v: 5, f: "d5" },
    { v: 6, f: "d6" },
    { v: 7, f: "d7" },
    { v: 8, f: "d8" },
    { v: 9, f: "d9" },
    { v: 10, f: "d10" },
    { v: 0, f: "d11" },
    { v: 0, f: "d12" },
    { v: 0, f: "d13" },
  ])
  const [cardOffset, setCardOffset] = useState("")
  const [playerOverAllbalance, setPlayerOverAllbalance] = useState(1000)
  const [dealBtnShow, setDealBtnShow] = useState("block")
  const [clearBtnShow, setClearBtnShow] = useState("hidden")
  const [rebetBtnShow, setRebetBtnShow] = useState("hidden")
  const [goBack, setGoBack] = useState(false)
  const [playerWinner, setPlayerWinner] = useState("")
  const [bankerWinner, setBankerWinner] = useState("")
  const [gameTied, setGameTied] = useState("")
  const [scale, setScale] = useState(1)
  const [translateX, setTranslateX] = useState(0)
  const [translateY, setTranslateY] = useState(0)
  const [player, setPlayer] = useState([])
  const [banker, setBanker] = useState([])
  const [thirdPlayerHand, setThirdPlayerHand] = useState([])
  const [thirdBankerHand, setThirdBankerHand] = useState([])
  const [playerThirCardValue, setPlayerThirCardValue] = useState([])
  const [bankerThirCardValue, setBankerThirCardValue] = useState()
  const handleWindowResize = () => {
    const { innerWidth, innerHeight } = window
    // Set your desired scaling and translation values here
    const scale = Math.min(innerWidth / 1920, innerHeight / 1080)
    const translateX = (innerWidth - 1920 * scale) / 2
    const translateY = (innerHeight - 1080 * scale) / 2

    setScale(scale)
    setTranslateX(translateX)
    setTranslateY(translateY)
  }

  useEffect(() => {
    // Add the resize event listener when the component mounts
    window.addEventListener("resize", handleWindowResize())
    // Trigger the initial scaling and translation
    handleWindowResize()
    return () => {
      window.removeEventListener("resize", handleWindowResize())
    }
  }, [])

  const getPos = (el) => {
    for (
      var lx = 0, ly = 0;
      el !== null;
      lx += el.offsetLeft, ly += el.offsetTop, el = el.offsetParent
    );
    return { x: lx, y: ly }
  }

  const SelectAmount = (type) => {
    var coinValue
    switch (type) {
      case "five":
        coinValue = 5
        break
      case "twenty-five":
        coinValue = 25
        break
      case "hundred":
        coinValue = 100
        break
      case "two-hundred-fifty":
        coinValue = 250
        break
      case "five-hundred":
        coinValue = 500
        break
      case "thousand":
        coinValue = 1000
        break
      default:
        coinValue = 0
        break
    }
    setCoinType(type)
    setCoinAmount(coinValue)
  }

  const selectWager = (wagerType) => {
    if (wagerType === "player-coordinates") {
      var wagerCircleDiv = "playerDivPosition"
    } else if (wagerType === "tie-coordinates") {
      wagerCircleDiv = "tieDivPosition"
    } else if (wagerType === "banker-coordinates") {
      wagerCircleDiv = "bankerDivPosition"
    }
    const itm = document.getElementById(coinType)
    if (!itm) return
    setClearBtnShow("block")
    const coinOffset = getPos(itm)
    const cln = itm?.cloneNode(true) // creating clone
    cln.id = "coin"
    cln.style.position = "absolute"
    cln.style.opacity = 0.8
    cln.style.zIndex = 99999
    cln.style.top = '125%'
    switch (itm?.id) {
      case 'five':
        cln.style.left = '22%'
        break;
      case 'twenty-five':
        cln.style.left = '34%'
        break;
      case 'hundred':
        cln.style.left = '47%'
        break;
      case 'two-hundred-fifty':
        cln.style.left = '59%'
        break;
      case 'five-hundred':
        cln.style.left = '72%'
        break;
      default: break;
    }
    if (wagerType === "tie-coordinates") {
      cln.className = coinType + "-chip tiecurrency currency-btn1 w-12 scale-[0.6] sm:scale-100"
    } else if (wagerType === "player-coordinates") {
      cln.className = coinType + "-chip currency currency-btn2 w-12"
    } else {
      cln.className = coinType + "-chip currency currency-btn3 w-12"
    }

    // var innerDiv = document.getElementById("coins-container")
    var innerDiv = document.getElementById("action-bg")

    innerDiv.insertBefore(cln, innerDiv.firstChild)

    if (wagerType === "tie-coordinates") {
      $(innerDiv.firstChild).animate({
        left: "47%",
        top: "52%",
        position: "absolute",
        zIndex: 99999,
        opacity: 1,
      })
    } else if (wagerType === "player-coordinates") {
      $(innerDiv.firstChild).animate({
        left: "22%",
        top: "44%",
        position: "absolute",
        zIndex: 99999,
        opacity: 1,
      })
    } else {
      $(innerDiv.firstChild).animate({
        left: "72%",
        top: "44%",
        position: "absolute",
        zIndex: 99999,
        opacity: 1,
      })
    }
    // const offsets = getPos(document.getElementById(wagerCircleDiv))

    // animate(offsets, cln) // applying animate functionality

    if (wagerType === "player-coordinates") {
      setPlayeramount(playeramount + coinAmount)
    } else if (wagerType === "tie-coordinates") {
      setTieamount(tieamount + coinAmount)
    } else if (wagerType === "banker-coordinates") {
      setBankeramount(bankeramount + coinAmount)
    }
    var finalbet = parseInt(betamount, 10) + parseInt(coinAmount, 10)
    selectedWager[coinType] = wagerType
    setBetamount(finalbet)
  }

  const showAllCards = (i, thirdCardType = "both") => {
    var divToMove = document.getElementById("firstCard")
    var cardOffset = getPos(divToMove)
    var cln = divToMove?.cloneNode(true) // creating clone
    cln.id = "card-" + i
    cln.style.position = "absolute"
    cln.style.opacity = 0.8
    cln.style.display = "block"
    cln.style.top = "250%"
    var innerDiv = document.getElementById("chip-container")
    innerDiv.insertBefore(cln, innerDiv.firstChild)
    var cardType = ""

    if (thirdCardType === "both") {
      if (i === 0) {
        cln.style.left = "46%"
        cln.style.zIndex = 888
        cardType = "playerfirstCard"
        cln.className = "h-40 w-28 sm:scale-100 scale-[0.65] border-2 border-black rounded-xl"
        $(innerDiv.firstChild).animate({
          left: "12%",
          top: "0%",
          opacity: 1,
        })
      } else if (i === 1) {
        cln.style.right = "46%"
        cln.style.zIndex = 888
        cardType = "bankerfirstCard"
        cln.className = "mr-10 sm:mr-32 h-40 w-28 sm:scale-100 scale-[0.65] border-2 border-black rounded-xl"
        $(innerDiv.firstChild).animate({
          right: "12%",
          top: "0%",
          opacity: 1,
        })
      } else if (i === 2) {
        cln.style.left = "46%"
        cln.style.zIndex = 999
        cln.className = "mt-6 ml-10 sm:ml-32 sm:mt-0 h-40 w-28 sm:scale-100 scale-[0.65] border-2 border-black rounded-xl"
        cardType = "playersecondCard"
        $(innerDiv.firstChild).animate({
          left: "12%",
          top: "0%",
          opacity: 1,
        })
      } else if (i === 3) {
        cln.style.right = "46%"
        cln.style.zIndex = 999
        cln.className = "mt-6 sm:mt-0 h-40 w-28 sm:scale-100 scale-[0.65] border-2 border-black rounded-xl"
        cardType = "bankersecondCard"
        $(innerDiv.firstChild).animate({
          right: "12%",
          top: "0%",
          opacity: 1,
        })
      }
    } else if (thirdCardType === "player") {
      cardType = "playerthirdCard"
    } else if (thirdCardType === "banker") {
      cardType = "bankerthirdCard"
    }

    var offsets = getPos(document.getElementById(cardType))

    // animate(offsets, cln) // applying animate functionality
    cardOffsets.push(offsets)
  }

  const updatePlayerScore = (n) => {
    var playerhand = player
    var bankerhand = banker
    var cardObj
    var playerscrore = playerScore
    var bankerscrore = bankerScore

    if (n === 0) {
      cardObj = playerhand[0]
      playerscrore += cardObj.v
    } else if (n === 1) {
      cardObj = bankerhand[0]
      bankerscrore += cardObj.v
    } else if (n === 2) {
      cardObj = playerhand[1]
      playerscrore += cardObj.v
    } else if (n === 3) {
      cardObj = bankerhand[1]
      bankerscrore += cardObj.v
    }

    setPlayerScore(playerscrore)
    setBankerScore(bankerscrore)
  }

  const getPlayerHands = (n) => {
    var playerhand = player
    var bankerhand = banker
    var cardObj

    if (n === 0) {
      cardObj = playerhand[0]
    } else if (n === 1) {
      cardObj = bankerhand[0]
    } else if (n === 2) {
      cardObj = playerhand[1]
    } else if (n === 3) {
      cardObj = bankerhand[1]
    }
    return cardObj
  }

  //=============Step 1=============
  const shuffleCardsAndSetHands = () => {
    const deck_scope = shuffleDeck(deck)
    var playerhand = []
    var bankerhand = []
    playerhand.push(deck_scope.pop())
    playerhand.push(deck_scope.pop())

    bankerhand.push(deck_scope.pop())
    bankerhand.push(deck_scope.pop())

    setPlayer(playerhand)
    setBanker(bankerhand)
    setCardOffset(cardOffsets)
  }

  useEffect(() => {
    openAllCards()
  }, [player, banker, cardOffset])

  //=============Step 2=============
  const openAllCards = () => {
    console.log(cardOffset)
    var allOffset = cardOffset
    var i = 0
    for (var key in allOffset) {
      if (allOffset.hasOwnProperty(key)) {
        var obj = allOffset[key]
        openOneByOne(i++, obj)
      }
    }
  }

  //=============Step 3=============
  const openOneByOne = (n, obj) => {
    setTimeout(() => {
      var cardObj = getPlayerHands(n) // get player cards
      if (typeof cardObj === "undefined") {
        return false
      }
      // console.log("assets/cards/" + cardObj.f + ".png")
      var cardImage = document.createElement("img")
      cardImage.style.position = "absolute"
      // cardImage.style.left = obj.x + "px"
      // cardImage.style.top = obj.y + "px"
      // cardImage.style.zIndex = 100006

      cardImage.style.top = 0
      cardImage.setAttribute("src", "asset/cards/" + cardObj.f + ".png")
      cardImage.setAttribute("id", "orig-card-" + n)
      // cardImage.setAttribute("height", "144px")
      // cardImage.setAttribute("width", "96px")

      var hiddenImage = document.createElement("img")
      hiddenImage.style.position = "absolute"
      // hiddenImage.style.left = obj.x + "px"
      // hiddenImage.style.top = obj.y + "px"
      // hiddenImage.style.zIndex = 100006

      hiddenImage.style.top = 0
      hiddenImage.setAttribute("src", "asset/cards/hidden.png")
      hiddenImage.setAttribute("id", "hidden-card-" + n)
      // hiddenImage.setAttribute("height", "144px")
      // hiddenImage.setAttribute("width", "96px")
      hiddenImage.addEventListener("click", flipCards(obj, cardImage, n))

      if (n === 0) {
        cardImage.style.left = "12%"
        cardImage.style.zIndex = 888
        cardImage.className = "h-40 w-28 sm:scale-100 scale-[0.65] border-2 border-black rounded-xl"

        hiddenImage.style.left = "12%"
        hiddenImage.style.zIndex = 888
        hiddenImage.className = "h-40 w-28 sm:scale-100 scale-[0.65] border-2 border-black rounded-xl"
      } else if (n === 1) {
        cardImage.style.right = "12%"
        cardImage.style.zIndex = 888
        cardImage.className = "mr-10 sm:mr-32 h-40 w-28 sm:scale-100 scale-[0.65] border-2 border-black rounded-xl"

        hiddenImage.style.right = "12%"
        hiddenImage.style.zIndex = 888
        hiddenImage.className = "mr-10 sm:mr-32 h-40 w-28 sm:scale-100 scale-[0.65] border-2 border-black rounded-xl"
      } else if (n === 2) {
        cardImage.style.left = "12%"
        cardImage.style.zIndex = 999
        cardImage.className = "mt-6 ml-10 sm:ml-32 sm:mt-0 h-40 w-28 sm:scale-100 scale-[0.65] border-2 border-black rounded-xl"

        hiddenImage.style.left = "12%"
        hiddenImage.style.zIndex = 999
        hiddenImage.className = "mt-6 ml-10 sm:ml-32 sm:mt-0 h-40 w-28 sm:scale-100 scale-[0.65] border-2 border-black rounded-xl"
      } else if (n === 3) {
        cardImage.style.right = "12%"
        cardImage.style.zIndex = 999
        cardImage.className = "mt-6 sm:mt-0 h-40 w-28 sm:scale-100 scale-[0.65] border-2 border-black rounded-xl"

        hiddenImage.style.right = "12%"
        hiddenImage.style.zIndex = 999
        hiddenImage.className = "mt-6 sm:mt-0 h-40 w-28 sm:scale-100 scale-[0.65] border-2 border-black rounded-xl"
      }

      var innerDiv = document.getElementById("chip-container")
      innerDiv.appendChild(cardImage)
      innerDiv.appendChild(hiddenImage)
      //innerDiv.insertBefore(newDiv, innerDiv.firstChild);
      var offsets = getPos(document.getElementById("tieDivPosition"))

      // Comment this for stop animation
      // this.animate(offsets,hiddenImage); // applying animate functionality
      // this.animate(offsets,cardImage); // applying animate functionality

      goBackTo(obj, cardImage, n)

      updatePlayerScore(n) // update player score
    }, 800 * n)
  }

  const flipCards = (obj, cardImage, n) => {
    $("#hidden-card-" + n)
      .addClass("hidden-flip-cards")
      .delay(200)
      .queue(function (next) {
        $(this).remove()
        next()
        $("#orig-card-" + n).addClass("orig-flip-cards")
      })
    goBackTo(obj, cardImage, n)
  }

  const goBackTo = (obj, cardImage, n) => {
    setTimeout(() => {
      $("#card-" + n).remove() // remove old cards
      $("#hidden-card-" + n).remove() // remove old cards
      // animate(obj, cardImage)
      if (n === 3) {
        setPlayerFinalScore(handScore(playerScore))
        setBankerFinalScore(handScore(bankerScore)) // updating score

        gameRules()
      }
    }, 500)
  }

  // Game Rules
  const gameRules = () => {
    if (goBack) {
      return false
    }
    setGoBack(true)

    var playerDraw = false
    var playerStand = false
    var playerNaturalStand = false
    var bankerDraw = false
    var bankerStand = false
    var bankerNaturalStand = false
    var bankerCardDisplay = false
    //=====================Player Rules========================
    if (playerFinalScore <= 5 || playerFinalScore === 10) {
      playerDraw = true
    } else if (playerFinalScore <= 6 || playerFinalScore === 7) {
      playerStand = true
    } else if (playerFinalScore <= 8 || playerFinalScore === 9) {
      playerNaturalStand = true
      playerStand = true
    }

    let i = 4
    let playerThirCardValue
    if (playerDraw) {
      const deck_scope = shuffleDeck(deck)
      var playerhand = []
      playerhand.push(deck_scope.pop())
      setThirdPlayerHand(playerhand, () => {
        showAllCards(i, "player")
      })

      var cardObj
      var playerCard = thirdPlayerHand
      cardObj = playerCard[0]
      playerThirCardValue = cardObj.v
    }

    //=====================Banker Rules========================

    if (!playerNaturalStand) {
      var bankerScore = bankerFinalScore

      if (bankerScore >= 0 && bankerScore <= 2) {
        bankerDraw = true
      } else if (bankerScore === 3) {
        if (
          (playerDraw &&
            playerThirCardValue >= 0 &&
            playerThirCardValue <= 7) ||
          (playerDraw && playerThirCardValue === 9)
        ) {
          bankerDraw = true
        } else if (playerDraw && playerThirCardValue === 8) {
          bankerStand = true
        }
      } else if (bankerScore === 4) {
        if (
          playerDraw &&
          playerThirCardValue >= 2 &&
          playerThirCardValue <= 7
        ) {
          bankerDraw = true
        } else if (
          (playerDraw &&
            playerThirCardValue >= 8 &&
            playerThirCardValue >= 10) ||
          (playerDraw && playerThirCardValue <= 1)
        ) {
          bankerStand = true
        }
      } else if (bankerScore === 5) {
        if (
          playerDraw &&
          playerThirCardValue >= 4 &&
          playerThirCardValue <= 7
        ) {
          bankerDraw = true
        } else if (
          (playerDraw &&
            playerThirCardValue >= 0 &&
            playerThirCardValue >= 3) ||
          (playerDraw && playerThirCardValue >= 8 && playerThirCardValue <= 9)
        ) {
          bankerStand = true
        }
      } else if (bankerScore === 6) {
        if (
          playerDraw &&
          playerThirCardValue >= 6 &&
          playerThirCardValue <= 7
        ) {
          bankerDraw = true
        } else if (
          (playerDraw &&
            playerThirCardValue >= 0 &&
            playerThirCardValue <= 5) ||
          (playerDraw && playerThirCardValue >= 8 && playerThirCardValue <= 9)
        ) {
          bankerStand = true
        }
      } else if (bankerScore === 7 && playerStand) {
        bankerDraw = true
      } else if (
        playerStand &&
        playerNaturalStand &&
        bankerScore >= 8 &&
        bankerScore <= 9
      ) {
        bankerDraw = true
      }

      if (bankerDraw) {
        i++
        const deck_scope = shuffleDeck(deck)
        var bankerhand = []
        bankerhand.push(deck_scope.pop())
        setThirdBankerHand(bankerhand)
        showAllCards(i, "banker")
      }
    }
    if (playerDraw) {
      setTimeout(() => {
        openPlayerThirdCard(
          4,
          "player",
          playerDraw,
          bankerDraw,
          bankerCardDisplay
        )
      }, 800)
    }

    if (bankerDraw) {
      setTimeout(() => {
        openBankerThirdCard(
          5,
          "banker",
          playerDraw,
          bankerDraw,
          bankerCardDisplay
        )
      }, 1400)
    }

    if (!playerDraw && !bankerDraw) {
      calculateWinner() // calculating winner
    }
  }

  const calculateWinner = () => {
    setTimeout(() => {
      if (playerFinalScore > bankerFinalScore) {
        setPlayerWinner("winner")
      } else if (playerFinalScore < bankerFinalScore) {
        setBankerWinner("winner")
      } else if (playerFinalScore === bankerFinalScore) {
        setGameTied("winner")
      }
      setRebetBtnShow("block")
    }, 2000)
  }

  const openPlayerThirdCard = (
    i,
    type,
    playerDraw,
    bankerDraw,
    bankerCardDisplay
  ) => {
    const playerCard = thirdPlayerHand

    const n = i

    const cardObj = playerCard[0]
    const playerThirCardValue = cardObj.v
    const dimensions = getPos(document.getElementById("playerthirdCard"))
    bankerCardDisplay = false
    const allOffset = cardOffset
    //console.log(allOffset);
    let gobackOffset

    if (allOffset[4]) {
      gobackOffset = allOffset[4]
    }
    createNewCard(
      n,
      cardObj,
      dimensions,
      playerThirCardValue,
      type,
      playerDraw,
      bankerDraw,
      bankerCardDisplay,
      gobackOffset
    )
    setPlayerThirCardValue(playerThirCardValue)
  }

  const openBankerThirdCard = (
    i,
    type,
    playerDraw,
    bankerDraw,
    bankerCardDisplay
  ) => {
    const bankerCard = thirdBankerHand

    const n = i
    bankerCardDisplay = true
    const cardObj = bankerCard[0]
    const bankerThirCardValue = cardObj.v
    const dimensions = getPos(document.getElementById("bankerthirdCard"))
    const allOffset = cardOffset
    //console.log(allOffset);
    //console.log(allOffset[4]);
    let gobackOffset
    if (allOffset[5]) {
      gobackOffset = allOffset[5]
    } else {
      gobackOffset = allOffset[4]
    }
    createNewCard(
      n,
      cardObj,
      dimensions,
      bankerThirCardValue,
      type,
      playerDraw,
      bankerDraw,
      bankerCardDisplay,
      gobackOffset
    )
    setBankerThirCardValue(bankerThirCardValue)
  }

  const createNewCard = (
    n,
    cardObj,
    dimensions,
    thirdCardScore,
    type,
    playerDraw,
    bankerDraw,
    bankerCardDisplay,
    gobackOffset
  ) => {
    const cardImage = document.createElement("img")
    cardImage.style.position = "absolute"
    cardImage.style.left = dimensions.x + "px"
    cardImage.style.top = dimensions.y + "px"
    cardImage.style.zIndex = 100006
    cardImage.setAttribute("src", "assets/cards/" + cardObj.f + ".png")
    cardImage.setAttribute("id", "orig-card-" + n)
    cardImage.setAttribute("height", "144px")
    cardImage.setAttribute("width", "96px")

    const hiddenImage = document.createElement("img")
    hiddenImage.style.position = "absolute"
    hiddenImage.style.left = dimensions.x + "px"
    hiddenImage.style.top = dimensions.y + "px"
    hiddenImage.style.zIndex = 100006
    hiddenImage.setAttribute("src", "assets/cards/hidden.png")
    hiddenImage.setAttribute("id", "hidden-card-" + n)
    hiddenImage.setAttribute("height", "144px")
    hiddenImage.setAttribute("width", "96px")
    hiddenImage.addEventListener("click", flipCards(dimensions, cardImage, n))

    const innerDiv = document.getElementById("chip-container")
    innerDiv.appendChild(cardImage)
    innerDiv.appendChild(hiddenImage)
    //innerDiv.insertBefore(newDiv, innerDiv.firstChild);
    const offsets = getPos(document.getElementById("tieDivPosition"))

    // Comment this for stop animation
    // this.animate(offsets,hiddenImage); // applying animate functionality
    // this.animate(offsets,cardImage); // applying animate functionality

    if (type === "player") {
      const playerscrore = playerFinalScore
      playerscrore += thirdCardScore
      setPlayerFinalScore(handScore(playerscrore))
    } else {
      const bankerscrore = bankerFinalScore
      bankerscrore += thirdCardScore
      setBankerFinalScore(handScore(bankerscrore))
    }

    if (playerDraw && bankerDraw && bankerCardDisplay) {
      calculateWinner() // calculating winner
    } else if (!playerDraw && bankerDraw && bankerCardDisplay) {
      calculateWinner() // calculating winner
    }
    if (playerDraw && !bankerDraw) {
      calculateWinner() // calculating winner
    }
    goBackTo(gobackOffset, cardImage, n)
  }

  const handScore = (hand) => {
    if (hand >= 10) {
      const one = String(hand).charAt(1)
      return Number(one)
    }

    return hand
  }

  //=============Animate any div=============
  const animate = (offsets, divToAnimate) => {
    $(divToAnimate).animate({
      left: offsets.x + "px",
      top: offsets.y + "px",
      position: "absolute",
      zIndex: 99999,
      opacity: 1,
    })
  }

  const deal = () => {
    setDealBtnShow("hidden")
    setRebetBtnShow("hidden")
    for (let i = 0; i < 4; i++) {
      showAllCards(i)
    }
    setTimeout(() => {
      shuffleCardsAndSetHands()
    }, 600)
  }

  const clearBet = () => {
    const parentElement = document.getElementById("action-bg");
    const elements = parentElement.querySelectorAll("#coin");
    elements.forEach(element => {
      element.remove();
    });
  }

  const reset = () => {
    setPlayerScore(0)
    setBankerScore(0)
    setPlayerFinalScore(0)
    setBankerFinalScore(0)
    setDeck([
      { v: 1, f: "c1" },
      { v: 2, f: "c2" },
      { v: 3, f: "c3" },
      { v: 4, f: "c4" },
      { v: 5, f: "c5" },
      { v: 6, f: "c6" },
      { v: 7, f: "c7" },
      { v: 8, f: "c8" },
      { v: 9, f: "c9" },
      { v: 10, f: "c10" },
      { v: 0, f: "c11" },
      { v: 0, f: "c12" },
      { v: 0, f: "c13" },
      { v: 1, f: "h1" },
      { v: 2, f: "h2" },
      { v: 3, f: "h3" },
      { v: 4, f: "h4" },
      { v: 5, f: "h5" },
      { v: 6, f: "h6" },
      { v: 7, f: "h7" },
      { v: 8, f: "h8" },
      { v: 9, f: "h9" },
      { v: 10, f: "h10" },
      { v: 0, f: "h11" },
      { v: 0, f: "h12" },
      { v: 0, f: "h13" },
      { v: 1, f: "s1" },
      { v: 2, f: "s2" },
      { v: 3, f: "s3" },
      { v: 4, f: "s4" },
      { v: 5, f: "s5" },
      { v: 6, f: "s6" },
      { v: 7, f: "s7" },
      { v: 8, f: "s8" },
      { v: 9, f: "s9" },
      { v: 10, f: "s10" },
      { v: 0, f: "s11" },
      { v: 0, f: "s12" },
      { v: 0, f: "s13" },
      { v: 1, f: "d1" },
      { v: 2, f: "d2" },
      { v: 3, f: "d3" },
      { v: 4, f: "d4" },
      { v: 5, f: "d5" },
      { v: 6, f: "d6" },
      { v: 7, f: "d7" },
      { v: 8, f: "d8" },
      { v: 9, f: "d9" },
      { v: 10, f: "d10" },
      { v: 0, f: "d11" },
      { v: 0, f: "d12" },
      { v: 0, f: "d13" },
    ])
    setCardOffset("")
    setPlayerOverAllbalance(1000)
    setDealBtnShow("block")
    setRebetBtnShow("hidden")
    setGoBack(false)
    setPlayerWinner("")
    setBankerWinner("")
    setGameTied("")
    cardOffsets.length = 0
  }

  const rebet = () => {
    $("#chip-container").html("")
    reset()
    deal()
  }

  const shuffleDeck = (deck) => {
    return _.shuffle(_.shuffle(_.shuffle(_.shuffle(deck))))
  }

  return (
    <div>
      <img src={CardBack1} alt="baccarat" className="absolute w-40 top-0 right-60 hidden xl:block" />
      <img src={CardBack2} alt="baccarat" className="absolute h-20 md:h-32 right-0 top-28 block xl:hidden" />
      <div className="baccarat-view pt-4 xl:pt-8 pb-4 min-h-[calc(100vh-20px)]">
        <div className="baccarat-wrapper">
          <img src={Logo} alt="baccarat" className="absolute w-3/4 md:w-[55%] mt-[370px] md:mt-[300px] xl:mt-60 2xl:mt-36 my-auto" />
          <div className="bg-deposit bg-no-repeat bg-cover scale-[0.7] sm:scale-[0.8] xl:scale-100 items-center w-fit p-3 flex gap-4">
            <button className="bg-redback w-44 h-[67px] bg-cover hover:text-[#ccc]">
              Deposit
            </button>
            <button className="bg-redback w-44 h-[67px] bg-cover hover:text-[#ccc]">
              Withdraw
            </button>
          </div>
          <div className="xl:hidden block -mt-4 sm:mt-0 xl:mt-8 sm:scale-[0.8] xl:scale-100 scale-[0.6]">
            <Wallet />
          </div>
          <div className="flex w-full justify-around gap-4 lg:px-8 scale-95 xl:mt-4 xl:scale-100 scale-[0.8]">
            <Player />
            <Banker />
          </div>
          <div className="w-full md:w-4/5 mt-2 xl:mt-16 px-8 flex justify-around gap-4 relative z-10 h-40 xl:scale-100 sm:scale-[0.8]" id="chip-container">
            {/* <div className="flex sm:gap-4">
              <img
                src={H12}
                className="img-responsive h-40 w-28 sm:scale-100 scale-[0.65] border-2 border-black rounded-xl"
                role="presentation"
                alt="hidden"
              />
              <img
                src={Hidden}
                className="img-responsive mt-6 -ml-16 sm:m-0 h-40 w-28 sm:scale-100 scale-[0.65] border-2 border-black rounded-xl"
                role="presentation"
                alt="hidden"
              />
            </div>
            <div className="flex sm:gap-4">
              <img
                src={B5}
                className="img-responsive h-40 w-28 sm:scale-100 scale-[0.65] border-2 border-black rounded-xl"
                role="presentation"
                alt="hidden"
              />
              <img
                src={Hidden}
                className="img-responsive mt-6 -ml-16 sm:m-0 h-40 w-28 sm:scale-100 scale-[0.65] border-2 border-black rounded-xl"
                role="presentation"
                alt="hidden"
              />
            </div> */}
          </div>
          {/* <div id="chip-container"></div> */}
          <div id="coins-container"></div>
          {/* <RecentBets /> */}
          <div className="baccarat-footer-grid md:overflow-x-clip flex justify-center items-end lg:justify-between mt-24 sm:mt-[60px] md:absolute md:bottom-6">
            <div className="xl:block hidden mt-20 xl:scale-90">
              <Wallet />
              <div className="wallet-grid mt-4">
                <div className="wallet-doller">
                  <img src={doller} alt="" />
                </div>
                <div className="wallet-bet">
                  <h4>BALANCE</h4>
                  <span>{playerOverAllbalance}</span>
                </div>
                <div className="wallet-bet">
                  <h4>TOTAL BET</h4>
                  <span>{betamount}</span>
                </div>
              </div>
            </div>
            <div className="-mt-8 sm:mt-0 xl:max-w-[50%]">
              <Action
                playerFinalScore={playerFinalScore}
                bankerFinalScore={bankerFinalScore}
                selectFive={() => SelectAmount("five")}
                selectTwentyFive={() => SelectAmount("twenty-five")}
                selectHundred={() => SelectAmount("hundred")}
                selectTwoHundredFifty={() => SelectAmount("two-hundred-fifty")}
                selectFiveHundred={() => SelectAmount("five-hundred")}
                selectThousand={() => SelectAmount("thousand")}
                deal={deal}
                rebet={rebet}
                dealBtnShow={dealBtnShow}
                rebetBtnShow={rebetBtnShow}
                clearBet={clearBet}
                clearBtnShow={clearBtnShow}
                playerBetAmount={playerBetAmount}
                tieBetAmount={tieBetAmount}
                bankerBetAmoount={bankerBetAmoount}
                coinType={coinType}
                playerDrop={() => selectWager("player-coordinates")}
                tieDrop={() => selectWager("tie-coordinates")}
                bankerDrop={() => selectWager("banker-coordinates")}
                playerhand={player}
                bankerhand={banker}
                playerWinner={playerWinner}
                bankerWinner={bankerWinner}
                gameTied={gameTied}
              />
              <div className="xl:hidden block flex justify-center">
                <div className="wallet-grid -mt-10 sm:mt-0 sm:scale-100 scale-[0.8]">
                  <div className="wallet-bet">
                    <h4>BALANCE</h4>
                    <span>{playerOverAllbalance}</span>
                  </div>
                  <div className="wallet-bet">
                    <h4>TOTAL BET</h4>
                    <span>{betamount}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:block hidden">
              <Chat />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
