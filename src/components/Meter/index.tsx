import * as React from 'react';
import './Meter.css';

interface MeterProps {
  disappointmentLevel: number;
}
export interface MeterState {}
export default class Meter extends React.Component<MeterProps, MeterState> {
  constructor(props: MeterProps) {
    super(props);
  }

  render() {
    let meterLabel: string;
    if (this.props.disappointmentLevel > DISAPPOINTMENT_PHRASES.length - 1) {
      meterLabel = '. . .';
    } else {
      meterLabel = DISAPPOINTMENT_PHRASES[this.props.disappointmentLevel];
    }
    return (
      <div className="Meter-wrapper">
        <div className="Meter-header">Disappointment Level:</div>
        <div className="Meter-label">{meterLabel}</div>
      </div>
    );
  }
}

export const DISAPPOINTMENT_PHRASES = [
  'stunned',
  'borderline proud',
  `maybe I'll have grandkids after all`,
  'is this really my kid?',
  'kinda surprised',
  'the usual',
  'why do I even try',
  'maybe the second kid will be better',
  'I need a beer',
  'did my wife cheat on me?',
  'despair',
  'hollowing despair',
  'abject despair'
];
