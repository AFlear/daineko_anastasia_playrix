import * as PIXI from 'pixi.js'
import anime from 'animejs/lib/anime.es'
let stairs = []
let actualStairs = []

function iOS() {
  return (
    ['iPad Simulator', 'iPhone Simulator', 'iPod Simulator', 'iPad', 'iPhone', 'iPod'].includes(
      navigator.platform
    ) ||
    // iPad on iOS 13 detection
    (navigator.userAgent.includes('Mac') && 'ontouchend' in document)
  )
}

const images = [
  {
    name: 'variant0',
    url: '/assets/variant0.png',
  },
  {
    name: 'variant1',
    url: '/assets/variant1.png',
  },
  {
    name: 'variant2',
    url: '/assets/variant2.png',
  },
]

const app = new PIXI.Application({
  view: document.getElementById('pixi-canvas'),
  resolution: window.devicePixelRatio || 1,
  autoDensity: true,
  width: window.innerWidth - 20,
  height: window.innerHeight - 20,
})
document.body.appendChild(app.view)
const stage = new PIXI.Container()
const backLayer = new PIXI.Container()
const frontLayer = new PIXI.Container()
const finalLayer = new PIXI.Container()
finalLayer.width = app.screen.width
finalLayer.height = app.screen.height
backLayer.width = app.screen.width
backLayer.height = app.screen.height
frontLayer.width = app.screen.width
frontLayer.height = app.screen.height
stage.addChild(backLayer)
stage.addChild(frontLayer)
stage.addChild(finalLayer)


const background = PIXI.Sprite.from('/assets/room.png')
background.anchor.x = 0
background.anchor.y = 0
background.x = 0
background.y = 0
background.width = app.screen.width
background.height = app.screen.height

backLayer.addChild(background)

const logo = PIXI.Sprite.from('/assets/logo.png')
logo.x = 25
logo.y = 10
logo.width = 298
logo.height = 97
logo.scale.set(0)
anime({
  targets: logo.scale,
  x: 1,
  y: 1,
  delay: 200,
  alpha: 1,
  duration: 800,
  easing: "easeInOutBack",
});

background.addChild(logo)

const btn = PIXI.Sprite.from('/assets/btn.png')
btn.anchor.set(0.5)
btn.x = app.screen.width / 2
btn.y = app.screen.height - 100
btn.interactive = true
btn.scaleXY = 0.95
btn.visible = 0
btn.scale.set(0.95, .95)
btn.on('mousedown', () => {
  window.location.href = iOS
    ? 'https://play.google.com/store/apps/details?id=com.playrix.homescapes'
    : 'https://apps.apple.com/ru/app/homescapes/id1195621598'
})

finalLayer.addChild(btn)

const austin = PIXI.Sprite.from('/assets/austin.png')
austin.x = background.width / 2 - 350
austin.y = 100
austin.width = 87
austin.height = 306
austin.visible = false

background.addChild(austin)
const book = PIXI.Sprite.from('/assets/book_stand.png')
book.anchor.set(1.6, 0)
book.x = background.width / 2
book.y = 0

background.addChild(book)

const globe = PIXI.Sprite.from('/assets/globe.png')
globe.anchor.set(0, 0)
globe.x = 75
globe.y = 100

background.addChild(globe)

const table = PIXI.Sprite.from('/assets/table.png')
table.anchor.set(0, 0)
table.x = 175
table.y = 200

background.addChild(table)

const sofa = PIXI.Sprite.from('/assets/sofa.png')
sofa.anchor.set(0, 0)
sofa.x = 100
sofa.y = 300

background.addChild(sofa)

function createFlowers() {
  const flowers = [
    {
      name: 'flower1',
      x: background.width - 200,
      y: background.height - 151,
      url: '/assets/big-flower.png',
    },
    {
      name: 'flower2',
      x: background.width / 2 + 150,
      y: 200,
      url: '/assets/flower2.png',
    },
    {
      name: 'flower3',
      x: 450,
      y: 50,
      url: '/assets/flower2.png',
    },
  ]
  flowers.map((flower) => {
    const flw = PIXI.Sprite.from(flower.url)
    flw.x = flower.x
    flw.y = flower.y
    flw.anchor.set(0.5)
    if(flower.name === 'flower1') {
      flw.scale.set(1.5)
      frontLayer.addChild(flw)
    }else {
      background.addChild(flw)
    }
  })
}
createFlowers()

const oldStairs = PIXI.Sprite.from('/assets/old_stair.png')
oldStairs.anchor.set(0.25, 0)
oldStairs.x = background.width / 2
oldStairs.y = 50

background.addChild(oldStairs)

const newStairs1 = PIXI.Sprite.from('assets/new_stair_0.png')
newStairs1.anchor.set(0.25, 0)
newStairs1.x = oldStairs.x
newStairs1.y = oldStairs.y
newStairs1.visible = false

background.addChild(newStairs1)

const newStairs2 = PIXI.Sprite.from('assets/new_stair_1.png')
newStairs2.anchor.set(0.25, 0)
newStairs2.x = oldStairs.x
newStairs2.y = oldStairs.y
newStairs2.visible = false

background.addChild(newStairs2)

const newStairs3 = PIXI.Sprite.from('assets/new_stair_2.png')
newStairs3.anchor.set(0.25, 0)
newStairs3.x = oldStairs.x
newStairs3.y = oldStairs.y
newStairs3.visible = false

background.addChild(newStairs3)
actualStairs.push(newStairs1, newStairs2, newStairs3)

const hammer = PIXI.Sprite.from('/assets/hammer.png')
hammer.anchor.set(0, 2.35)
hammer.x = background.width / 2 + 50
hammer.y = background.height / 2
hammer.width = 105
hammer.height = 120
hammer.interactive = true
hammer.visible = 0

hammer.on('mousedown', onButtonDown).on('touchstart', onButtonDown)

background.addChild(hammer)

const circleChoose = PIXI.Sprite.from('/assets/choosed.png')

circleChoose.x = background.width / 2
circleChoose.y = 50
circleChoose.visible = false
circleChoose.width = 130
circleChoose.height = 110
background.addChild(circleChoose)

const btnOk = PIXI.Sprite.from('/assets/btn-ok.png')
btnOk.x = background.width / 2 - 225
btnOk.y = 200
btnOk.visible = false
btnOk.interactive = true
btnOk.on('mousedown', onBtnOk)

background.addChild(btnOk)

function onBtnOk() {
  btnOk.visible = false
  stairs.map((stair) => {
    stair.visible = false
  })
  circleChoose.visible = false
  background.alpha = 0.5
  const finalScreen = PIXI.Sprite.from('/assets/final.png')
  finalScreen.anchor.set(0.5)
  finalScreen.x = app.screen.width / 2
  finalScreen.y = app.screen.height / 2
  finalLayer.addChild(finalScreen)
}

function onButtonDown() {
  hammer.visible = false
  for (let i = 0; i < 3; i++) {
    const circleLayout = new PIXI.Container()

    const circleDefault = PIXI.Sprite.from('/assets/circle-default.png')

    circleDefault.x = background.width / 2.5 + i * 150
    circleDefault.y = i + 70 + 10
    circleDefault.width = 140
    circleDefault.height = 120
    circleLayout.type = `variant${i}`

    const stairSprite = PIXI.Sprite.from(images.find((img) => img.name === `variant${i}`).url)
    stairSprite.anchor.set(0, 0.35)
    stairSprite.x = circleDefault.x + 25
    stairSprite.y = circleDefault.y + 25

    circleLayout.interactive = true

    circleLayout.addChild(circleDefault)
    circleLayout.addChild(stairSprite)
    background.addChild(circleLayout)
    circleLayout.on('mousedown', () => changeStairs(i))
    stairs.push(circleLayout)
  }
}
function changeStairs(stairsType) {
  stairs.map((stair) => {
    const currentStair = stair.getChildAt(0)
    currentStair.visible = true
  })
  actualStairs.map((stair) => {
    stair.visible = false
  })

  const activeStair = stairs[stairsType].getChildAt(0)
  circleChoose.x = activeStair.x
  circleChoose.y = activeStair.y
  activeStair.visible = false
  circleChoose.visible = true
  btnOk.visible = true
  btnOk.x = activeStair.x
  oldStairs.visible = false
  actualStairs[stairsType].visible = true
  actualStairs[stairsType].alpha = 0
  anime({
    targets: actualStairs[stairsType],
    y: [actualStairs[stairsType].y - 100, actualStairs[stairsType].y ],
    duration: 500,
    delay: 100,
    alpha: [0 ,1 ],
    easing: "linear",
  })
}


function animationLoop() {
  requestAnimationFrame(animationLoop);
  app.renderer.render(stage);
  window.onresize = resize;
}
setTimeout(() => animationLoop(), 0)

window.onload = () => {
  anime({
    targets: hammer,
    y: [hammer.y - 200, hammer.y ],
    duration: 500,
    delay: 1300,
    visible:1,
    easing: "easeOutBounce",
  })
  anime({
    targets: btn,
    y: [btn.y, btn.y ],
    duration: 500,
    visible:1,
    delay: 800,
    easing: "linear",
  })
  anime({
    targets: austin,
    y: [austin.y - 50, austin.y ],
    duration: 800,
    visible:1,
    delay: 500,
    easing: "easeInSine",
  })

}

anime({
  targets: btn.scale,
  x: 1.2,
  y: 1.2,
  duration: 800,
  loop: true,
  direction: 'alternate',
  complete: function () {
    btn.scale.set(0.5)
  },
  easing: 'linear',
})

function resize() {
  const canvas = app.view;
  let scaleX, scaleY, scale, center;
  scaleX = window.innerWidth / canvas.offsetWidth;
  scaleY = window.innerHeight / canvas.offsetHeight;
  scale = Math.min(scaleX, scaleY);
  canvas.style.transformOrigin = "0 0";
  canvas.style.transform = "scale(" + scale + ")";
  if (canvas.offsetWidth > canvas.offsetHeight) {
    if (canvas.offsetWidth * scale < window.innerWidth) { center = "horizontally" }
    else { center = "vertically" }
  } else {
    if (canvas.offsetHeight * scale < window.innerHeight) { center = "vertically" }
    else { center = "horizontally"; }
  }
  let margin;
  if (center === "horizontally") {
    margin = (window.innerWidth - canvas.offsetWidth * scale) / 2;
    canvas.style .marginTop = 0 + "px";canvas.style .marginBottom = 0 + "px";
    canvas.style .marginLeft = margin + "px";canvas.style .marginRight = margin + "px";
  }
  if (center === "vertically") {
    margin = (window.innerHeight - canvas.offsetHeight * scale) / 2;
    canvas.style .marginTop  = margin + "px";canvas.style .marginBottom = margin + "px";
    canvas.style .marginLeft = 0      + "px";canvas.style .marginRight  = 0      + "px";
  }
  canvas.style.paddingLeft = 0 + "px";canvas.style.paddingRight  = 0 + "px";
  canvas.style.paddingTop  = 0 + "px";canvas.style.paddingBottom = 0 + "px";
  canvas.style.display = "-webkit-inline-box";
  return scale;
}
