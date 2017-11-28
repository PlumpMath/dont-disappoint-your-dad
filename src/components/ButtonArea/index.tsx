import * as React from 'react';
import './ButtonArea.css';
import { BallLocation } from 'components/Game';

type ButtonEvent = React.TouchEvent<HTMLDivElement> | KeyboardEvent;
interface ButtonAreaProps {
  buttonArmPressHandler: () => void;
  buttonArmReleaseHandler: () => void;
  buttonForearmPressHandler: () => void;
  buttonForearmReleaseHandler: () => void;
  updateBallLocation: (location: BallLocation) => void;
  ballLocation: BallLocation;
  isArmButtonDown: boolean;
  isForearmButtonDown: boolean;
}
interface ButtonAreaState {}
export default class ButtonArea extends React.Component<
  ButtonAreaProps,
  ButtonAreaState
> {
  constructor(props: ButtonAreaProps) {
    super(props);
    this.state = { isArmButtonDown: false, isForearmButtonDown: false };
  }

  componentWillMount(): void {
    document.addEventListener('keydown', this.keyDownHandler);
    document.addEventListener('keyup', this.keyUpHandler);
  }

  componentWillUnmount(): void {
    document.removeEventListener('keydown', this.keyDownHandler);
    document.removeEventListener('keyup', this.keyUpHandler);
  }

  render() {
    const isActive: boolean =
      this.props.ballLocation === BallLocation.WithDisappointment;
    const armButtonStyle = {
      opacity: this.props.isArmButtonDown || !isActive ? 0.4 : 1
    };
    const forearmButtonStyle = {
      opacity: this.props.isForearmButtonDown || !isActive ? 0.4 : 1
    };
    const throwButtonStyle = { opacity: !isActive ? 0.4 : 1 };
    return (
      <div className="ButtonArea-wrapper">
        <div
          className="Button"
          onTouchStart={this.buttonArmPress}
          onTouchEnd={this.buttonArmRelease}
        />
        <div className="Button" onTouchStart={this.buttonThrowPress} />
        <div
          className="Button"
          onTouchStart={this.buttonForearmPress}
          onTouchEnd={this.buttonForearmRelease}
        />
        <div className="ButtonArea-display">
          <div className="Button-display" style={armButtonStyle}>
            Arm [A]
          </div>
          <div className="Button-display" style={throwButtonStyle}>
            Throw [S]
          </div>
          <div className="Button-display" style={forearmButtonStyle}>
            Forearm [D]
          </div>
        </div>
      </div>
    );
  }

  private keyDownHandler = (e: KeyboardEvent): void => {
    switch (e.key) {
      case 'a':
        this.buttonArmPress(e);
        break;
      case 's':
        this.buttonThrowPress(e);
        break;
      case 'd':
        this.buttonForearmPress(e);
        break;
      default:
        return;
    }
  };

  private keyUpHandler = (e: KeyboardEvent): void => {
    switch (e.key) {
      case 'a':
        this.buttonArmRelease(e);
        break;
      case 'd':
        this.buttonForearmRelease(e);
        break;
      default:
        return;
    }
  };

  private buttonArmPress = (e: ButtonEvent): void => {
    if (this.props.ballLocation === BallLocation.WithDisappointment) {
      this.props.buttonArmPressHandler();
    }
  };

  private buttonArmRelease = (e: ButtonEvent): void => {
    if (this.props.ballLocation === BallLocation.WithDisappointment) {
      this.props.buttonArmReleaseHandler();
    }
  };

  private buttonForearmPress = (e: ButtonEvent): void => {
    if (this.props.ballLocation === BallLocation.WithDisappointment) {
      this.props.buttonForearmPressHandler();
    }
  };

  private buttonForearmRelease = (e: ButtonEvent): void => {
    if (this.props.ballLocation === BallLocation.WithDisappointment) {
      this.props.buttonForearmReleaseHandler();
    }
  };

  private buttonThrowPress = (e: ButtonEvent): void => {
    if (this.props.ballLocation === BallLocation.WithDisappointment) {
      this.props.updateBallLocation(BallLocation.InAir);
    }
  };
}
