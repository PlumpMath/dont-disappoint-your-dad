import * as React from 'react';
import './GameComponent.css';
import Disappointment from 'src/components/Disappointment';

export default class GameComponent extends React.Component {
  render() {
    return (
      <div className="Game-wrapper">
        <Disappointment />
        <div>Test</div>
      </div>
    );
  }
}
