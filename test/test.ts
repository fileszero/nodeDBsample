import * as assert from "assert";   // nodejs組み込みassertを使う

describe("Test of Test", () => {
    describe("one plus one", () => {
        it("should be 2", () => {
            assert.equal(1 + 1 , 2 );
        });
    });
});