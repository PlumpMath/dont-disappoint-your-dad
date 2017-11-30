import * as React from 'react';
import './Rain.css';
import Drop, { DropProps } from './Drop';
import { BallLocation } from 'components/Game';

interface RainProps {
  ballLocation: BallLocation;
}
interface RainState {
  drops: React.ReactElement<DropProps>[];
}
export default class Rain extends React.Component<RainProps, RainState> {
  private dropCount: number = 0;

  constructor(props: RainProps) {
    super(props);
    this.state = { drops: [] };
  }

  componentWillReceiveProps(nextProps: RainProps) {
    if (
      nextProps.ballLocation === BallLocation.Abandoned &&
      this.props.ballLocation !== BallLocation.Abandoned
    ) {
      window.setTimeout(this.newDrop, 7000);
    }
  }

  render() {
    return <div className="Rain-wrapper">{this.state.drops}</div>;
  }

  private newDrop = (): void => {
    const newDrop = this.createDrop(this.dropCount);
    this.setState({ drops: [...this.state.drops, newDrop] });
    this.dropCount++;
    window.setTimeout(() => {
      if (this.dropCount < NUM_DROPS) {
        this.newDrop();
      }
    }, LOOP_DURATION / NUM_DROPS);
  };

  private createDrop = (id: number): React.ReactElement<DropProps> => {
    return <Drop key={id} id={id} />;
  };

  private deleteDrop = (key: number): void => {
    const newDrops = this.state.drops.filter(item => item.props.id !== key);
    this.setState({ drops: newDrops });
  };
}

const NUM_DROPS = 30;
const LOOP_DURATION = 1500;
