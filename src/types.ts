/**
 * FreeLang v4 StdLib — 공통 Value 타입
 *
 * FreeLang v4 VM과 동일한 Value 구조 (자체 정의 — 외부 의존 없음)
 */

export type Value =
  | { tag: "i32";    val: number }
  | { tag: "f64";    val: number }
  | { tag: "str";    val: string }
  | { tag: "bool";   val: boolean }
  | { tag: "arr";    elements: Value[] }
  | { tag: "struct"; fields: Map<string, Value> }
  | { tag: "ok";     val: Value }
  | { tag: "err";    val: string }
  | { tag: "some";   val: Value }
  | { tag: "none" }
  | { tag: "void" };

// ── 생성 헬퍼 ────────────────────────────────────────────────

export const V = {
  i32:    (n: number):     Value => ({ tag: "i32", val: Math.trunc(n) }),
  f64:    (n: number):     Value => ({ tag: "f64", val: n }),
  str:    (s: string):     Value => ({ tag: "str", val: s }),
  bool:   (b: boolean):    Value => ({ tag: "bool", val: b }),
  arr:    (els: Value[]):  Value => ({ tag: "arr", elements: els }),
  ok:     (v: Value):      Value => ({ tag: "ok", val: v }),
  err:    (msg: string):   Value => ({ tag: "err", val: msg }),
  some:   (v: Value):      Value => ({ tag: "some", val: v }),
  none:   ():              Value => ({ tag: "none" }),
  void_:  ():              Value => ({ tag: "void" }),
  struct: (fields: Record<string, Value> | Map<string, Value>): Value => ({
    tag:    "struct",
    fields: fields instanceof Map ? fields : new Map(Object.entries(fields)),
  }),
};

// ── 타입 단언 헬퍼 ───────────────────────────────────────────

export function assertStr(v: Value, fn: string): string {
  if (v.tag !== "str") throw new TypeError(`${fn}: str 필요 (got ${v.tag})`);
  return (v as Extract<Value, { tag: "str" }>).val;
}
export function assertI32(v: Value, fn: string): number {
  if (v.tag !== "i32") throw new TypeError(`${fn}: i32 필요 (got ${v.tag})`);
  return (v as Extract<Value, { tag: "i32" }>).val;
}
export function assertBool(v: Value, fn: string): boolean {
  if (v.tag !== "bool") throw new TypeError(`${fn}: bool 필요 (got ${v.tag})`);
  return (v as Extract<Value, { tag: "bool" }>).val;
}
export function assertArr(v: Value, fn: string): Value[] {
  if (v.tag !== "arr") throw new TypeError(`${fn}: arr 필요 (got ${v.tag})`);
  return (v as Extract<Value, { tag: "arr" }>).elements;
}
