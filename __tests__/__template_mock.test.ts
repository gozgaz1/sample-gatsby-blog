// Global setups are executed first.
beforeAll(() => {});
afterAll(() => {});
beforeEach(() => {});
afterEach(() => {});

describe(`When a user does <action A>`, () => {
  // Local setups are executed second.
  beforeAll(() => {});
  afterAll(() => {});
  beforeEach(() => {});
  afterEach(() => {});
  test(`Expect <behavior X>`, () => {});
  test(`Expect <behavior Y>`, () => {});
  test(`Expect <behavior Z>`, () => {});
});

describe(`When a user does <action B>`, () => {
  // Local setups are executed second.
  beforeAll(() => {});
  afterAll(() => {});
  beforeEach(() => {});
  afterEach(() => {});
  test(`Expect <behavior X>`, () => {});
  test(`Expect <behavior Y>`, () => {});
  test(`Expect <behavior Z>`, () => {});
});
