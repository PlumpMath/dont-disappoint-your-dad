import * as React from 'react';
import Disappointment from 'components/Disappointment';
import ButtonArea from 'components/ButtonArea';
import Dad from 'components/Dad';
import Ball from 'components/Ball';
import Meter from 'components/Meter';
import './Game.css';

interface GameProps {}
export interface GameState {
  isArmButtonDown: boolean;
  isForearmButtonDown: boolean;
  ballLocation: BallLocation;
  ballPosition: { x: number; y: number };
  disappointmentLevel: number;
}
export default class Game extends React.Component<GameProps, GameState> {
  constructor(props: GameProps) {
    super(props);
    this.state = {
      isArmButtonDown: false,
      isForearmButtonDown: false,
      ballLocation: BallLocation.WithDisappointment,
      ballPosition: { x: 0, y: 0 },
      disappointmentLevel: 5
    };
  }

  buttonArmPressHandler = (): void => {
    this.setState({ isArmButtonDown: true });
  };

  buttonArmReleaseHandler = (): void => {
    this.setState({ isArmButtonDown: false });
  };

  buttonForearmPressHandler = (): void => {
    this.setState({ isForearmButtonDown: true });
  };

  buttonForearmReleaseHandler = (): void => {
    this.setState({ isForearmButtonDown: false });
  };

  updateBallLocation = (location: BallLocation): void => {
    this.setState({ ballLocation: location });

    if (location === BallLocation.InAir) {
      this.setState({
        isArmButtonDown: false,
        isForearmButtonDown: false
      });
    }
  };

  updateBallPosition = (x: number, y: number): void => {
    this.setState({ ballPosition: { x: x, y: y } });
  };

  disappointDad = (): void => {
    this.setState({ disappointmentLevel: this.state.disappointmentLevel + 1 });
  };

  surpriseDad = (): void => {
    this.setState({ disappointmentLevel: this.state.disappointmentLevel - 1 });
  };

  render() {
    return (
      <div className="Game-wrapper">
        <div className="Score-area" />
        <Dad
          ballPosition={this.state.ballPosition}
          ballLocation={this.state.ballLocation}
          updateBallPosition={this.updateBallPosition}
          updateBallLocation={this.updateBallLocation}
          disappointDad={this.disappointDad}
          surpriseDad={this.surpriseDad}
          disappointmentLevel={this.state.disappointmentLevel}
        />
        <Disappointment
          isArmButtonDown={this.state.isArmButtonDown}
          isForearmButtonDown={this.state.isForearmButtonDown}
          ballLocation={this.state.ballLocation}
          updateBallPosition={this.updateBallPosition}
        />
        <Ball
          ballPosition={this.state.ballPosition}
          ballLocation={this.state.ballLocation}
          updateBallPosition={this.updateBallPosition}
          updateBallLocation={this.updateBallLocation}
        />
        <Meter disappointmentLevel={this.state.disappointmentLevel} />
        <ButtonArea
          buttonArmPressHandler={this.buttonArmPressHandler}
          buttonArmReleaseHandler={this.buttonArmReleaseHandler}
          buttonForearmPressHandler={this.buttonForearmPressHandler}
          buttonForearmReleaseHandler={this.buttonForearmReleaseHandler}
          updateBallLocation={this.updateBallLocation}
          isArmButtonDown={this.state.isArmButtonDown}
          isForearmButtonDown={this.state.isForearmButtonDown}
          ballLocation={this.state.ballLocation}
        />
      </div>
    );
  }
}

export enum BallLocation {
  WithDisappointment,
  InAir,
  OnGround,
  WithDad,
  Returning,
  Abandoned
}
