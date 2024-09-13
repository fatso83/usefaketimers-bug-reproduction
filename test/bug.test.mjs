import { Readable } from "node:stream";

import { expect } from "chai";
import { before, describe, it } from "mocha";

import sinon from "sinon";

describe("sinon bug reproduction", function () {
  let result, clock;

  beforeEach(function () {
    clock = sinon.useFakeTimers({ now: 100 });
  });
  afterEach(function () {
    clock.restore();
  });

  async function setup() {
    const stream = Readable.from(Buffer.from("test"));
    const chunks = [];
    for await (const chunk of stream) {
      chunks.push(chunk);
    }
    result = Buffer.concat(chunks).toString("utf8");
  }

  it("should run successfully", async function () {
    const p = setup();
    await clock.runToLastAsync();
    await p;
    expect(result).to.equal("test");
  });
});
