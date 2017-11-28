import * as React from 'react';
import './Dad.css';
import { BallLocation } from 'components/Game';
import { DISAPPOINTMENT_PHRASES } from 'components/Meter';

interface DadProps {
  ballPosition: { x: number; y: number };
  ballLocation: BallLocation;
  updateBallPosition: (x: number, y: number) => void;
  updateBallLocation: (newLocation: BallLocation) => void;
  disappointDad: () => void;
  surpriseDad: () => void;
  disappointmentLevel: number;
}
interface DadState {
  dadPosition: React.CSSProperties;
  armRotation: number;
}

export default class Dad extends React.Component<DadProps, DadState> {
  updateInterval: number;

  constructor(props: DadProps) {
    super(props);
    this.state = {
      dadPosition: INITIAL_STYLE,
      armRotation: 90
    };
  }

  componentWillReceiveProps(nextProps: DadProps) {
    if (
      this.props.ballLocation !== BallLocation.OnGround &&
      nextProps.ballLocation === BallLocation.OnGround
    ) {
      if (
        nextProps.ballPosition.x > 67 &&
        nextProps.ballPosition.x < 88 &&
        nextProps.ballPosition.y > 36 &&
        nextProps.ballPosition.y < 65
      ) {
        this.props.surpriseDad();
      } else {
        this.props.disappointDad();
      }

      if (nextProps.disappointmentLevel > DISAPPOINTMENT_PHRASES.length - 2) {
        this.props.updateBallLocation(BallLocation.Abandoned);
        this.setState({
          dadPosition: {
            left: 130 + '%',
            top: -4 + '%',
            transition: 'all 5s'
          }
        });
      } else {
        this.setState({
          dadPosition: {
            left: this.props.ballPosition.x - 8.3 + '%',
            top: this.props.ballPosition.y - 45 + '%'
          }
        });

        window.setTimeout(() => {
          this.props.updateBallLocation(BallLocation.WithDad);
        }, 1250);
      }
    }

    if (
      this.props.ballLocation !== BallLocation.WithDad &&
      nextProps.ballLocation === BallLocation.WithDad
    ) {
      this.setState({ dadPosition: INITIAL_STYLE });
      window.setTimeout(() => {
        this.setState({ armRotation: 135 });
      }, 1100);
      window.setTimeout(() => {
        this.setState({ armRotation: 90 });
        this.props.updateBallPosition(67, 41.5);
        this.props.updateBallLocation(BallLocation.Returning);
      }, 1600);
    }
  }

  render() {
    const ballStyle = {
      display:
        this.props.ballLocation === BallLocation.WithDad ? 'block' : 'none',
      transform: `rotate(${this.state.armRotation - 90}deg)`
    };
    const armStyle = { transform: `rotate(${this.state.armRotation}deg)` };
    return (
      <div className="Dad-wrapper" style={this.state.dadPosition}>
        <div className="Dad-arm" style={armStyle}>
          <div className="Dad-ball" style={ballStyle} />
        </div>
      </div>
    );
  }
}

const INITIAL_STYLE = {
  left: 70 + '%',
  top: 5 + '%'
};
