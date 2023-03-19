import {makeScene2D} from '@motion-canvas/2d/lib/scenes';
import { sequence, waitFor, waitUntil } from '@motion-canvas/core/lib/flow';
import { createRef, finishScene, Reference } from '@motion-canvas/core/lib/utils';
import { all, delay } from '@motion-canvas/core/lib/flow';
import { Circle, Img, Txt } from '@motion-canvas/2d/lib/components';
import My_Logo from './My_Logo.svg'
import { zoomOutTransition } from '@motion-canvas/core/lib/transitions';
import { BBox, Center, Direction } from "@motion-canvas/core/lib/types";

export default makeScene2D(function* (view) {
  // Create your animations here
  const circle = createRef<Circle>(); 
  const circle2 = createRef<Circle>()
  const circle3 = createRef<Circle>()
  const circle4 = createRef<Circle>()
  const imageRef = createRef<Img>()
  const company_name = createRef<Txt>()
  const company_motto = createRef<Txt>()

  // Variables
  var x = 1050
  var y = 650

  var negative_x = -1050
  var negative_y = -650

  view.fill('#242424')

  view.add(
    <>                           
      <Circle
        ref={circle}
        x = {negative_x}
        y = {negative_y}
        fill = "#e13238"
        width={280}
        height = {280}
      />,
      <Circle
      ref={circle4}
      x = {negative_x}
      y = {y}
      fill = "orange"
      width={280}
      height = {280}
    />,
      <Circle
        ref={circle2}
        x = {x}
        y = {y}
        fill = "blue"
        width={280}
        height = {280}
      />,
    <Circle
        ref={circle3}
        x = {x}
        y = {negative_y}
        fill = "white"
        width={280}
        height = {280}
      />,
      <Img 
        ref = {imageRef}
        src={My_Logo}
        opacity = {0}
        scale= {0.7}
        y = {-180}
       />,
       <Txt
        ref = {company_name}
        text = {'Ric On Tech'}
        opacity = {0}
        y={90}
        fontFamily = {'Source Code Pro'}
        fontSize= {68}
       />,
       <Txt
        ref = {company_motto}
        text = {'Your no 1 visual platform'}
        opacity = {0}
        y={190}
        fontFamily = {'Source Code Pro'}
        fontSize= {34}
       />
    </>
  );

  function circleAnimations(object: Reference<Circle>, starting_point_x: any, starting_point_y: any){
    return[
      object().position.x(starting_point_x, 1).to(0, 1),
      object().position.y(starting_point_y,1).to(0, 1),
    ]
  }

  function* growOut(object: Reference<Circle>){
    yield* all(
      object().size.x(280, 1).to(5000,1),
      object().size.y(280, 1).to(5000,1),
    )
  }

  yield* all(
    ...circleAnimations(circle,negative_x,negative_y),
    ...circleAnimations(circle4,negative_x,y),
    ...circleAnimations(circle2,x,y),
    ...circleAnimations(circle3,x,negative_y),
  )

  yield* sequence(
    0.20,
    growOut(circle),
    growOut(circle4),
    growOut(circle2),
    growOut(circle3),
  )
  
  
  yield* view.fill('white', 0.2);
  yield* all(
    imageRef().opacity(0,1).to(1,1),
    imageRef().scale(0,1).to(0.7,1),
    delay(1,imageRef().absoluteRotation(360,1.5).to(0,1.5)),
    delay(1.2,company_name().opacity(0,1).to(1,1)),
    delay(1.8,company_motto().opacity(0,1).to(1,1))
  );
  // yield* waitUntil('event')
  yield* waitFor(2)
  yield* all(
    imageRef().opacity(1,1).to(0,1),
    imageRef().scale(0.7,1).to(0,1),
    delay(1,imageRef().absoluteRotation(0,1.5).to(360,1.5)),
    delay(1.2,company_name().opacity(1,1).to(0,1)),
    delay(1.8,company_motto().opacity(1,1).to(0,1))
  )
  // yield* zoomOutTransition(
  //   new BBox(-122, -122, 37, 37),
  //   0.2,
  //   )
    // finishScene()
});
