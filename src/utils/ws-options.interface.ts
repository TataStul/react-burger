export interface IWSOptions {
  onMessage: (event: MessageEvent<string>) => void;
  onConnect?: (event: Event) => void;
  onError?: (event: Event) => void;
  onDisconnect?: (event: Event) => void;
}
