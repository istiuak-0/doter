import { attach } from "iocraft";
import { markRaw, reactive, type Component } from "vue";

@attach()
export class OverlayService {
  overlays = reactive<Array<{ id: string; component: Component }>>([]);

  dialog(component: Component) {
    const id = crypto.randomUUID();
        this.overlays.push({ 
      id, 
      component: markRaw(component) 
    });
  }
}
