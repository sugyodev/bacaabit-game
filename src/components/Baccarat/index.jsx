import React, { useState, useEffect } from "react"
import $ from "jquery"
import _ from "lodash"
import Wallet from "./wallet"
import RecentBets from "./recentBets"
import Chat from "./chat"
import Player from "./player"
import Banker from "./banker"
import Action from "./action"
import { cardOffsets, selectedWager } from "../../constants"

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
  const [dealBtnShow, setDealBtnShow] = useState("show")
  const [clearBtnShow, setClearBtnShow] = useState("hide")
  const [rebetBtnShow, setRebetBtnShow] = useState("hide")
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

    console.log(coinType)
    const itm = document.getElementById(coinType)
    setClearBtnShow("show")
    const coinOffset = getPos(itm)
    const cln = itm.cloneNode(true) // creating clone
    cln.id = ""
    cln.style.position = "absolute"
    cln.style.opacity = 0.8
    cln.style.left = coinOffset.x + "px"
    cln.style.top = coinOffset.y + "px"
    cln.style.zIndex = 99999

    if (wagerType === "tie-coordinates") {
      cln.className = coinType + "-chip tiecurrency currency-btn1"
    } else if (wagerType === "player-coordinates") {
      cln.className = coinType + "-chip currency currency-btn2"
    } else {
      cln.className = coinType + "-chip currency currency-btn3"
    }

    var innerDiv = document.getElementById("coins-container")

    innerDiv.insertBefore(cln, innerDiv.firstChild)

    const offsets = getPos(document.getElementById(wagerCircleDiv))

    animate(offsets, cln) // applying animate functionality

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
    var cln = divToMove.cloneNode(true) // creating clone
    cln.id = "card-" + i
    cln.style.position = "absolute"
    cln.style.opacity = 0.8
    cln.style.left = cardOffset.x + "px"
    cln.style.top = cardOffset.y + "px"
    cln.style.zIndex = 99999

    var innerDiv = document.getElementById("chip-container")
    innerDiv.insertBefore(cln, innerDiv.firstChild)
    var cardType = ""

    if (thirdCardType === "both") {
      if (i === 0) {
        cardType = "playerfirstCard"
      } else if (i === 1) {
        cardType = "bankerfirstCard"
      } else if (i === 2) {
        cardType = "playersecondCard"
      } else if (i === 3) {
        cardType = "bankersecondCard"
      }
    } else if (thirdCardType === "player") {
      cardType = "playerthirdCard"
    } else if (thirdCardType === "banker") {
      cardType = "bankerthirdCard"
    }

    var offsets = getPos(document.getElementById(cardType))

    animate(offsets, cln) // applying animate functionality
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
    setCardOffset(cardOffset)
  }

  useEffect(() => {
    openAllCards()
  }, [player, banker, cardOffset])

  //=============Step 2=============
  const openAllCards = () => {
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
      var cardImage = document.createElement("img")
      cardImage.style.position = "absolute"
      cardImage.style.left = obj.x + "px"
      cardImage.style.top = obj.y + "px"
      cardImage.style.zIndex = 100006
      cardImage.setAttribute("src", "assets/cards/" + cardObj.f + ".png")
      cardImage.setAttribute("id", "orig-card-" + n)
      cardImage.setAttribute("height", "144px")
      cardImage.setAttribute("width", "96px")

      var hiddenImage = document.createElement("img")
      hiddenImage.style.position = "absolute"
      hiddenImage.style.left = obj.x + "px"
      hiddenImage.style.top = obj.y + "px"
      hiddenImage.style.zIndex = 100006
      hiddenImage.setAttribute("src", "assets/cards/hidden.png")
      hiddenImage.setAttribute("id", "hidden-card-" + n)
      hiddenImage.setAttribute("height", "144px")
      hiddenImage.setAttribute("width", "96px")
      hiddenImage.addEventListener("click", flipCards(obj, cardImage, n))

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
      animate(obj, cardImage)
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
      setRebetBtnShow("show")
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
    setDealBtnShow("hide")
    setRebetBtnShow("hide")
    for (let i = 0; i < 4; i++) {
      showAllCards(i)
    }
    setTimeout(() => {
      shuffleCardsAndSetHands()
    }, 600)
  }

  const clearBet = () => {
    const innerDiv = document.getElementById("coins-container")
    innerDiv.innerHTML = ""
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
    setDealBtnShow("show")
    setRebetBtnShow("hide")
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
      <div className="baccarat-view">
        <div className="baccarat-wrapper">
          <div id="chip-container"></div>
          <div id="coins-container"></div>
          {/* <RecentBets /> */}
          <div className="baccarat-card-grid">
            <Player />
            <Banker />
          </div>

          <div className="baccarat-footer-grid">
            <Wallet
              totalbet={betamount}
              playerOverAllbalance={playerOverAllbalance}
            />
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
            <Chat />
          </div>
        </div>
      </div>
    </div>
  )
}
