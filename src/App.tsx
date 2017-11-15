import * as React from 'react';
import GameComponent from './components/GameComponent';
import './App.css';

export default class App extends React.Component<{}, {}> {
  render() {
    return (
      <div className="App-wrapper">
        <div className="App-title">Don't Disappoint Your Dad</div>
        <div className="App-content-container">
          <div className="App-description-container">
            description is a really long description that may not fit all the
            way adjfnjk dfh kdfjklas dslkfj sdlkfjsa ldkfj aadf fds
          </div>
          <div className="App-game-container">
            <GameComponent />
          </div>
          <div className="App-controls-container">
            description is a really long description that may not fit all the
            way dfasj kdsfj kdjsklfj description is a really long description
            that may not fit all the waydescription is description is a really
            long description that may not fit all the way dfasj kdsfj kdjsklfj
            description is a really long description that may not fit all the
            waydescription is description is a really long description that may
            not fit all the way dfasj kdsfj kdjsklfj description is a really
            long description that may not fit all the waydescription is really
            long description that may not fit all the way dfasj kdsfj kdjsklfj
            description is a really long description that may not fit all the
            waydescription is really long description that may not fit all the
            way dfasj kdsfj kdjsklfj description is a really long description
            that may not fit all the waydescription is
          </div>
        </div>
      </div>
    );
  }
}
