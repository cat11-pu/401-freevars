import assert from "node:assert";
import { chainOf, freeOf, depthOf } from "../closure.js";
import { step, close } from "../closurerun.js";
import { render } from "../app.js";

const base = {
  budget: 1,
  state: { funs: [], caps: [], free_n: 0, ledger: [], applied: [] },
  events: [{ id: 1, kind: "def", name: "f", parent: "", params: ["x"], uses: ["x"] }],
  bad_name_code: "E_BAD_NAME", dup_code: "E_DUP_NAME",
  no_fun_code: "E_NO_FUN", event_error_code: "E_BAD_EVENT"
};

let failed = 0;
function check(name, fn) {
  try { fn(); console.log("ok " + name); } catch (e) { failed += 1; console.log("FAIL " + name + " :: " + e.message); }
}

check("chainOf returns a list", () => {
  assert.ok(Array.isArray(chainOf([["f", "", 1]], "f")));
});

check("freeOf returns a list", () => {
  assert.ok(Array.isArray(freeOf([["x"]], ["x"])));
});

check("depthOf returns a number", () => {
  assert.strictEqual(typeof depthOf([["f", "", 0]]), "number");
});

check("step returns a state", () => {
  assert.strictEqual(typeof step(base).state, "object");
});

check("render counts events", () => {
  assert.strictEqual(typeof render(base).count_events, "number");
});

console.log("5 cases, " + failed + " failed");
process.exit(failed === 0 ? 0 : 1);
