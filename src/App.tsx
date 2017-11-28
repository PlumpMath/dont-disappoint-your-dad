import * as React from 'react';
import Game from './components/Game';
import './App.css';

export default class App extends React.Component<{}, {}> {
  render() {
    return (
      <div className="App-wrapper">
        <div className="App-content-container">
          <div className="App-description-container">
            <h3>About</h3>
            <p>
              Don't Disappoint Your Dad is a throwback to that classic childhood
              memory of trying to play catch with your dad, trying to throw the
              ball back to him with your weak baby nerd arms, and trying to
              ignore the disappointment in his eyes.
            </p>
            <p>
              It was created for Github Game Jam 2017 in React. The full source
              code is available on GitHub.
            </p>
            <a
              href="https://github.com/Shurelia/dont-disappoint-your-dad"
              target="_blank"
            >
              <div className="App-description-link link-github" />
            </a>
          </div>
          <div className="App-game-container">
            <div className="App-title">Don't Disappoint Your Dad</div>
            <Game />
          </div>
          <div className="App-controls-container">
            <h3>Controls</h3>
            <p>
              On desktop, use the A and D keys to try and lift the ball. Use the
              S key to release.
            </p>
            <p>
              On mobile, use the left and right on screen buttons to try and
              lift the ball. Use the center button to release.
            </p>
            <p>
              If that sounds hard, just imagine what it must be like being your
              father.
            </p>
          </div>
        </div>
      </div>
    );
  }
}
