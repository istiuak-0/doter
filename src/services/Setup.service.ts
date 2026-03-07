import { attach, obtain } from "iocraft";
import { Nav } from "iocraft/common";
import { ref } from "vue";

@attach()
export class SetupService {
  private nav = obtain(Nav);

  email = ref("");
  password = ref("");
  storageType = ref<"local" | "drive" | "github">("local");
  loading = ref(false);

  handleSubmit() {
    this.loading.value = true;
    setTimeout(() => {
      this.loading.value = false;
      this.nav.push("/main");
    }, 4000);
  }
}
