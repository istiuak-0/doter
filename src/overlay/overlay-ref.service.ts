import { attach } from "iocraft";
import { Handler, OverlayOptions } from "./overly.types";

@attach()
export class OverlayRef {
  id!: string;
  options!: OverlayOptions;
  private closeHandlers = new Set<Handler<unknown>>();

  on(event: "close", handler: Handler<unknown>): void {
    this.closeHandlers.add(handler);
  }

  off(event: "close", handler: Handler<unknown>): void {
    this.closeHandlers.delete(handler);
  }

  close(data?: unknown): void {
    this.closeHandlers.forEach((h) => h(data));
    this.closeHandlers.clear();
  }
}
