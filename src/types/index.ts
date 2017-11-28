export interface ButtonState {
  armButton: boolean;
  forearmButton: boolean;
  infoButton: boolean;
}
export interface StoreState {
  buttonPressed: ButtonState;
}
