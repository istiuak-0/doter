import { defineComponent } from "vue";

// ─── Show ────────────────────────────────────────────────────────────────────
// CSS-based (v-show). Keeps element in DOM.
//
// <Show :when="loading"><Spinner /></Show>

export const Show = defineComponent(
  (props, { slots }) => {
    return () => <div v-show={props.when}>{slots.default?.()}</div>;
  },
  { props: ["when"] },
);

// ─── If ──────────────────────────────────────────────────────────────────────
// DOM-based (v-if). Mounts/unmounts.
//
// <If :condition="user"><Profile /></If>

export const If = defineComponent(
  (props, { slots }) => {
    return () =>
      props.condition ? slots.default?.() : (slots.else?.() ?? null);
  },
  { props: ["condition"] },
);

// ─── Switch + Match + Fallback ───────────────────────────────────────────────
// <Switch>
//   <Match :when="user.role === 'admin'"><Admin /></Match>
//   <Match :when="user.role === 'editor'"><Editor /></Match>
//   <Fallback><Viewer /></Fallback>
// </Switch>

export const Match = defineComponent(
  (_, { slots }) =>
    () =>
      slots.default?.(),
  { props: ["when"] },
);

export const Fallback = defineComponent(
  (_, { slots }) =>
    () =>
      slots.default?.(),
);

export const Switch = defineComponent((_, { slots }) => {
  return () => {
    const children = slots.default?.() ?? [];

    const match = children.find(
      (vnode) => vnode.type === Match && Boolean(vnode.props?.when),
    );

    if (match) return match;

    return children.find((vnode) => vnode.type === Fallback) ?? null;
  };
});
