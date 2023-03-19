import {makeProject} from '@motion-canvas/core';
import second from './scenes/second?scene';
import ThemeSong from './Audio/ThemeSongBeat.mp3'

import example from './scenes/example?scene';

export default makeProject({
  scenes: [example,second], // These are the scenes to be displayed
  audio: ThemeSong,
  audioOffset: 1.5
});
 // This is the file representing our video