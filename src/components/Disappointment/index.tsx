import * as React from 'react';
import './Disappointment.css';
import { BallLocation } from 'components/Game';

interface ArmSegment {
  rotation: number;
  speed: number;
  maxSpeed: number;
}
interface DisappointmentProps {
  isArmButtonDown: boolean;
  isForearmButtonDown: boolean;
  ballLocation: BallLocation;
  updateBallPosition: (x: number, y: number) => void;
}
interface DisappointmentState {
  arm: ArmSegment;
  forearm: ArmSegment;
}
export default class Disappointment extends React.Component<
  DisappointmentProps,
  DisappointmentState
> {
  updateInterval: number;

  constructor(props: DisappointmentProps) {
    super(props);
    this.state = {
      arm: { rotation: 0, speed: 0, maxSpeed: 1 },
      forearm: { rotation: 300, speed: 0, maxSpeed: 1 }
    };
  }

  componentDidMount() {
    this.updateInterval = window.setInterval(this.disappointmentLoop, 10);
  }

  componentWillUnmount() {
    if (this.updateInterval) {
      window.clearInterval(this.updateInterval);
    }
  }

  disappointmentLoop = (): void => {
    this.setState(prevState => {
      return {
        arm: this.calculateNextArmState(prevState),
        forearm: this.calculateNextForearmState(prevState)
      };
    });

    if (this.props.ballLocation === BallLocation.WithDisappointment) {
      const nextBallPosition = this.calculateNextBallPosition();
      this.props.updateBallPosition(nextBallPosition.x, nextBallPosition.y);
    }
  };

  render() {
    const armStyle = { transform: `rotate(${this.state.arm.rotation}deg)` };
    const forearmStyle = {
      transform: `rotate(${this.state.forearm.rotation}deg)`
    };
    return (
      <div className="Dis-wrapper">
        <div className="DisArm-main" style={armStyle}>
          <div className="DisArm-forearm" style={forearmStyle} />
        </div>
      </div>
    );
  }

  private calculateNextArmState(prevState: DisappointmentState): ArmSegment {
    const nextState = prevState.arm;

    // decay maxSpeed if button is not down, else increase speed
    if (!this.props.isArmButtonDown) {
      nextState.maxSpeed = clamp(nextState.maxSpeed - DECAY, 0, MAX);
    } else {
      nextState.maxSpeed = MAX;
      nextState.speed += ACCEL;
    }

    // apply 'gravity'
    nextState.speed +=
      nextState.rotation > 90 && nextState.rotation < 270
        ? -1 * GRAVITY
        : GRAVITY;

    // clamp speed to maxSpeed
    nextState.speed = clamp(
      nextState.speed,
      -1 * nextState.maxSpeed,
      nextState.maxSpeed
    );

    // calculate next rotation state based on next speed
    nextState.rotation += nextState.speed * 3;
    nextState.rotation = wrapDeg(nextState.rotation);
    return nextState;
  }

  private calculateNextForearmState(
    prevState: DisappointmentState
  ): ArmSegment {
    const nextState = prevState.forearm;

    // decay maxSpeed if button is not down, else increase speed
    if (!this.props.isForearmButtonDown) {
      if (!this.props.isArmButtonDown) {
        nextState.maxSpeed = clamp(nextState.maxSpeed - DECAY, 0, MAX);
      }
    } else {
      nextState.maxSpeed = MAX;
      nextState.speed += ACCEL + prevState.arm.speed * 0.005;
    }

    // apply 'gravity'
    nextState.speed +=
      nextState.rotation > 0 && nextState.rotation < 180
        ? -1 * GRAVITY
        : GRAVITY;

    // clamp speed to maxSpeed
    nextState.speed = clamp(
      nextState.speed,
      -1 * nextState.maxSpeed,
      nextState.maxSpeed
    );

    // calculate next rotation state based on next speed
    nextState.rotation += nextState.speed * 3;
    nextState.rotation = wrapDeg(nextState.rotation);
    return nextState;
  }

  private calculateNextBallPosition(): { x: number; y: number } {
    const newBallPosition: { x: number; y: number } = { x: 15.5, y: 47.5 };

    // calculate ball position at elbow
    newBallPosition.y += 17 * Math.sin(toRadians(this.state.arm.rotation));
    newBallPosition.x += 9 * Math.cos(toRadians(this.state.arm.rotation));

    // calculate ball position at forearm
    const rotationSum = this.state.forearm.rotation + this.state.arm.rotation;
    newBallPosition.y += 17 * Math.sin(toRadians(rotationSum));
    newBallPosition.x += 9 * Math.cos(toRadians(rotationSum));
    return newBallPosition;
  }
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(value, max));
}

function wrapDeg(deg: number): number {
  if (deg >= 360) {
    return deg - 360;
  } else if (deg < 0) {
    return deg + 360;
  } else {
    return deg;
  }
}

function toRadians(deg: number): number {
  return Math.PI / 180 * deg;
}

const GRAVITY = 0.01;
const ACCEL = 0.015;
const DECAY = 0.0013;
const MAX = 0.6;
