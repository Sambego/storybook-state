declare module '@sambego/storybook-state/Store' {
  export type StateObject = {
    [s: string]: any;
  };
  type Callback = {
    callback: <S>(state: S) => any;
    subscription: string;
  };
  export default class Store<S extends StateObject> {
    state: S;
    callbacks: Callback[];
    constructor (state: S);
    set (newState: Partial<S>): void;
    get<K extends keyof S>(key?: K): S[K];
    subscribe (callback: Callback['callback']): string;
    unSubscribe (subscription: string): void;
  }
}

declare module '@sambego/storybook-state/State' {
  /// <reference types="react" />
  import Store, { StateObject } from '@sambego/storybook-state/Store';
  type RenderFunction<S> = (state: S) => React.ReactNode;
  interface Props<S> {
    children: React.ReactNode | RenderFunction<S>;
    parseState?: (state: S) => S;
    store: Store<S>;
  }
  export default class State<
    S extends StateObject,
    StateStore extends Store<S>
  > extends React.Component<Props<S>> {
    stateStore: StateStore;
    state: S;
    subscription: string;
  }
}

declare module '@sambego/storybook-state/StateDecorator' {
  /// <reference types="react" />
  import Store from '@sambego/storybook-state/Store';
  const StateDecorator: (
    store: Store<any>,
    parseState?: <S>(state: S) => S,
  ) => (storyFn: any) => React.ComponentType | JSX.Element;
  export default StateDecorator;
}

declare module '@sambego/storybook-state' {
  export { default as State } from '@sambego/storybook-state/State';
  export { default as Store } from '@sambego/storybook-state/Store';
  export {
    default as StateDecorator,
  } from '@sambego/storybook-state/StateDecorator';
}
