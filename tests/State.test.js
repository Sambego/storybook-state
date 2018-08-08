import React from "react";
import { shallow, mount } from "enzyme";
import State from "../src/State";
import Store from "../src/Store";

test("throw an error if there are no children", () => {
  const store = new Store({
    foo: "bar"
  });

  expect(() => shallow(<State store={store} />)).toThrow(
    new Error("Please add at least one child element.")
  );
});

test("pass the store to a child component", () => {
  const store = new Store({
    foo: "bar"
  });

  const stateElement = mount(
    <State store={store}>
      <p>Child element</p>
    </State>
  );

  expect(stateElement.childAt(0).props().foo).toBe("bar");

  store.set({ foo: "baz" });
  stateElement.update();

  expect(stateElement.childAt(0).props().foo).toBe("baz");
});

test("pass the store to multiple child components", () => {
  const store = new Store({
    foo: "bar"
  });

  const stateElement = mount(
    <State store={store}>
      <p key="child1">Child element 1</p>
      <p key="child2">Child element 2</p>
    </State>
  );

  expect(stateElement.childAt(0).props().foo).toBe("bar");
  expect(stateElement.childAt(1).props().foo).toBe("bar");

  store.set({ foo: "baz" });
  stateElement.update();

  expect(stateElement.childAt(0).props().foo).toBe("baz");
  expect(stateElement.childAt(1).props().foo).toBe("baz");
});

test("edit the passed state trough the parseState prop", () => {
  const store = new Store({
    foo: "bar"
  });

  const stateElement = mount(
    <State
      store={store}
      parseState={state => ({ ...state, foo: `test_${state.foo}` })}
    >
      <p>Child element</p>
    </State>
  );

  expect(stateElement.childAt(0).props().foo).toBe("test_bar");

  store.set({ foo: "baz" });
  stateElement.update();

  expect(stateElement.childAt(0).props().foo).toBe("test_baz");
});
