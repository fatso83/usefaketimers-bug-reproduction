import { Readable } from "node:stream";

import { expect } from "chai";
import { before, describe, it } from "mocha";

import sinon from "sinon";

describe("sinon bug reproduction", function () {
  let result;

  before(async function () {
    const clock = sinon.useFakeTimers({ now: 100 });
    const stream = Readable.from(Buffer.from("test"));
    const chunks = [];
    for await (const chunk of stream) {
      chunks.push(chunk);
    }
    result = Buffer.concat(chunks).toString("utf8");
    clock.restore();
  });

  it("should run successfully", function () {
    expect(result).to.equal("test");
  });
});
