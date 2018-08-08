import React from "react";
import { shallow, mount } from "enzyme";
import StateDecorator from "../src/StateDecorator";
import State from "../src/State";
import Store from "../src/Store";

test("create a state component and pass the store", () => {
  const store = new Store();
  const stateDecorator = mount(
    StateDecorator(store)(() => <p>Child Element</p>)
  );

  expect(stateDecorator.type()).toBe(State);
  expect(stateDecorator.props().store).toBe(store);
});

test("create a state component and pass the state parser function", () => {
  const store = new Store();
  const stateParserFunction = jest.fn();
  const stateDecorator = mount(
    StateDecorator(store, stateParserFunction)(() => <p>Child Element</p>)
  );

  expect(stateDecorator.type()).toBe(State);
  expect(stateDecorator.props().parseState).toBe(stateParserFunction);
});
