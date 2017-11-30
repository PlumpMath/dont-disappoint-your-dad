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
    } else if (this.props.disappointmentLevel < 0) {
      meterLabel = `${DISAPPOINTMENT_PHRASES[0]} x${Math.abs(
        this.props.disappointmentLevel
      ) + 1}`;
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
  'proud',
  'borderline impressed',
  `maybe I'll have grandkids after all`,
  'is this really my kid?',
  'mildly surprised',
  'the usual',
  'why do I even try?',
  'maybe the next kid will be better',
  'I need a beer',
  'did my wife cheat on me?',
  'despair',
  'hollowing despair',
  'abject despair'
];
