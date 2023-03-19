import { makeScene2D } from "@motion-canvas/2d";
import { createRef, finishScene } from "@motion-canvas/core/lib/utils";
import { all } from "@motion-canvas/core/lib/flow";
import { easeInCubic } from "@motion-canvas/core/lib/tweening";
import { Icon, Layout, Line, Rect, Txt } from "@motion-canvas/2d/lib/components";
import { BBox, Center, Direction } from "@motion-canvas/core/lib/types";
import {fadeTransition, zoomOutTransition, useTransition } from '@motion-canvas/core/lib/transitions'
import { useScene } from "@motion-canvas/core/lib/utils";
import { Vector2 } from "@motion-canvas/core/lib/types";
import { ThreadGenerator } from "@motion-canvas/core/lib/threading";

export default makeScene2D(function*(view) {
  // animation
  yield* view.fill('black'); 

  const text = createRef<Txt>();
  const variable_name = createRef<Txt>();
  const rectangle = createRef<Rect>();
  const arrow = createRef<Line>()

  view.fill('black')

 view.add(
  <>
  <Layout
     layout
     alignItems={'center'}
    
  >
  <Txt
      ref = {variable_name}
      text = "our_variable"
      position={[-480,0]}
      opacity = {1}
      fontFamily = {'Source Code Pro'}
      fontSize= {34}
      fill ={'#e13238'}
    />
    <Line
      position={[-380,0]}
      points={[0,
        Vector2.right.scale(300)
      ]}
      endOffset={30}
      startOffset={40}
      endArrow
      stroke={'white'}
      lineWidth={2}
      arrowSize={12}
    />
    <Rect layout
      ref= {rectangle}
      width={160}
      height={160}
      smoothCorners={false}
      cornerSharpness = {-16}
      shadowColor={'white'}
      lineWidth= {4}
      stroke={'white'}
      padding={12}
    />
    <Txt
      ref = {text}
      text = {`Hello\nWorld`}
      opacity = {1}
      fontFamily = {'Source Code Pro'}
      fontSize= {34}
      fill={'white'}
      x = {()=> {
        var the_x:any = rectangle().position.x;
        var result_x = the_x / 2
        console.log('The key '+result_x)
        return result_x
      }}
      
    />
    <Rect/>
  </Layout>
  </>
 );

//  yield*  slideTransition(Direction.Left)
  // yield* zoomOutTransition(
  //   new BBox(-122, -122, 37, 37),
  //   0.2
  // )

  yield* slideTransition(Direction.Bottom, 0.8)
  
//  yield* all(
//   text().opacity(0,0.15).to(1,0.15),
//  )



}); // End of the makeScene 2d

export function* slideTransition(
  direction: Direction = Direction.Top,
  duration = 0.6,
): ThreadGenerator {
  const size = useScene().getSize();
  const size2 = useScene();
  const position = size.getOriginOffset(direction).scale(2);
  const previousPosition = Vector2.createSignal();
  const currentPosition = Vector2.createSignal(position);

  // set up the transition
  const endTransition = useTransition(
    // modify the context of the current scene
    ctx => ctx.translate(currentPosition.x(), currentPosition.y()),
    // modify the context of the previous scene
    ctx => ctx.translate(previousPosition.x(), previousPosition.y()),
  );

  // perform animations
  yield* all(
    previousPosition(position.scale(-1), duration),
    currentPosition(Vector2.zero, duration),
  );

  // finish the transition
  endTransition();
}
// Transitions
// zoomInTransition - area in BBox - new BBox(x, y, height, width), duration
// zoomOutTransition
// fadeTransition - takes in a duration
// slideTransition
// useTransition for custom transitions