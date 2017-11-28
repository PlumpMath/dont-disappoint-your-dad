import * as React from 'react';
import './Ball.css';
import { BallLocation } from 'components/Game';

interface BallProps {
  ballPosition: { x: number; y: number };
  ballLocation: BallLocation;
  updateBallPosition: (x: number, y: number) => void;
  updateBallLocation: (location: BallLocation) => void;
}
interface BallState {
  positionDiff: { x: number; y: number };
  speed: number;
  display: string;
}
export default class Ball extends React.Component<BallProps, BallState> {
  updateInterval: number;

  constructor(props: BallProps) {
    super(props);
    this.state = {
      positionDiff: { x: 0, y: 0 },
      speed: 1,
      display: 'block'
    };
  }

  componentWillReceiveProps(nextProps: BallProps): void {
    if (this.props.ballLocation === BallLocation.WithDisappointment) {
      if (
        this.props.ballPosition.x !== nextProps.ballPosition.x ||
        this.props.ballPosition.y !== nextProps.ballPosition.y
      ) {
        const nextStateX = nextProps.ballPosition.x - this.props.ballPosition.x;
        const nextStateY = nextProps.ballPosition.y - this.props.ballPosition.y;
        this.setState({ positionDiff: { x: nextStateX, y: nextStateY } });
      }
    }

    if (
      this.props.ballLocation === BallLocation.WithDisappointment &&
      nextProps.ballLocation !== BallLocation.WithDisappointment
    ) {
      this.updateInterval = window.setInterval(this.updateLoop, 10);
    }

    if (
      this.props.ballLocation === BallLocation.InAir &&
      nextProps.ballLocation !== BallLocation.InAir
    ) {
      window.clearInterval(this.updateInterval);
      this.setState({ speed: 1, positionDiff: { x: 0, y: 0 } });
    }

    if (
      this.props.ballLocation !== BallLocation.Returning &&
      nextProps.ballLocation === BallLocation.Returning
    ) {
      window.setTimeout(() => {
        this.props.updateBallPosition(15, 81.5);
        this.props.updateBallLocation(BallLocation.WithDisappointment);
      }, 1000);
    }
  }

  render() {
    const ballStyle = {
      transform: `translate(${this.props.ballPosition.x}%, ${
        this.props.ballPosition.y
      }%)`,
      display:
        this.props.ballLocation === BallLocation.WithDad ? 'none' : 'block',
      animation:
        this.props.ballLocation === BallLocation.Returning
          ? 'returning 1s linear forwards'
          : ''
    };
    return (
      <div className="Ball-wrapper" style={ballStyle}>
        <div className="Ball-object" />
      </div>
    );
  }

  private updateLoop = (): void => {
    if (this.state.speed > 0.35) {
      const newPosition = this.props.ballPosition;
      newPosition.x += this.state.positionDiff.x * this.state.speed;
      newPosition.y += this.state.positionDiff.y * this.state.speed + 0.5;
      this.props.updateBallPosition(newPosition.x, newPosition.y);
      this.setState({ speed: this.state.speed - 0.0066 });
    } else if (this.state.speed > 0) {
      const newPosition = this.props.ballPosition;
      newPosition.x += this.state.positionDiff.x * this.state.speed;
      newPosition.y += Math.cos(this.state.speed * 7.85) * this.state.speed;
      this.props.updateBallPosition(newPosition.x, newPosition.y);
      this.setState({ speed: this.state.speed - 0.0066 });
    } else {
      this.props.updateBallLocation(BallLocation.OnGround);
    }
  };
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(value, max));
}
