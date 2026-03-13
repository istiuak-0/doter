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
    this.nav.push("/main");
  }
}
