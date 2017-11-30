import * as React from 'react';
import './Drop.css';

export interface DropProps {
  id: number;
}
interface DropState {
  containerStyle: { top: string; left: string; animation: string };
}
export default class Drop extends React.Component<DropProps, DropState> {
  constructor(props: DropProps) {
    super(props);
    this.state = {
      containerStyle: {
        top: this.generateTop() + '%',
        left: this.generateLeft() + '%',
        animation: CONTAINER_ANIMATION
      }
    };
  }

  componentDidMount(): void {
    this.loopClear();
  }

  render() {
    return (
      <div className="Drop-container" style={this.state.containerStyle}>
        <div
          className="Drop-vertical"
          style={{
            animation: this.state.containerStyle.animation
              ? VERTICAL_ANIMATION
              : null
          }}
        />
        <div
          className="Drop-splash left"
          style={{
            animation: this.state.containerStyle.animation
              ? SPLASH_LEFT_ANIMATION
              : null
          }}
        />
        <div
          className="Drop-splash right"
          style={{
            animation: this.state.containerStyle.animation
              ? SPLASH_RIGHT_ANIMATION
              : null
          }}
        />
      </div>
    );
  }

  private loopClear = (): void => {
    window.setTimeout(() => {
      this.setState(() => {
        return {
          containerStyle: {
            top: '-100%',
            animation: null
          }
        };
      });
      this.loopRestart();
    }, 1500);
  };

  private loopRestart = (): void => {
    window.setTimeout(() => {
      if (this.state.containerStyle.animation !== null) {
        this.loopRestart();
        console.log(this.state.containerStyle.animation);
      } else {
        this.setState(() => {
          return {
            containerStyle: {
              top: this.generateTop() + '%',
              left: this.generateLeft() + '%',
              animation: CONTAINER_ANIMATION
            }
          };
        });
        this.loopClear();
      }
    }, 10);
  };

  private generateLeft = (): number => {
    return Math.random() * 100 - 2.5;
  };

  private generateTop = (): number => {
    return Math.random() * 100 - 120;
  };
}

const CONTAINER_ANIMATION = 'drop-container 1s forwards linear';
const VERTICAL_ANIMATION = 'drop-vertical 1.5s forwards';
const SPLASH_LEFT_ANIMATION = 'drop-left 1.5s forwards';
const SPLASH_RIGHT_ANIMATION = 'drop-right 1.5s forwards';
