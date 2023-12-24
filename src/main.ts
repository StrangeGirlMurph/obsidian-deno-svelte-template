import {
  App,
  Plugin,
  PluginSettingTab,
  Setting,
  WorkspaceLeaf,
} from "obsidian";
import { ExampleView, VIEW_TYPE_EXAMPLE } from "./view.ts";

interface MyPluginSettings {
  favoriteNumber: number;
}

const DEFAULT_SETTINGS: MyPluginSettings = {
  favoriteNumber: 33,
};

export default class MyPlugin extends Plugin {
  settings!: MyPluginSettings;

  async onload() {
    await this.loadSettings();

    this.registerView(VIEW_TYPE_EXAMPLE, (leaf) => new ExampleView(leaf, this.settings.favoriteNumber));

    this.addRibbonIcon("hexagon", "FavoriteNumber", async () => {
      const { workspace } = this.app;

      let leaf: WorkspaceLeaf | null = null;
      const leaves = workspace.getLeavesOfType(VIEW_TYPE_EXAMPLE);

      if (leaves.length > 0) {
        leaf = leaves[0];
      } else {
        leaf = workspace.getRightLeaf(false);
        await leaf.setViewState({ type: VIEW_TYPE_EXAMPLE, active: true });
      }

      workspace.revealLeaf(leaf);
    });

    this.addSettingTab(new SampleSettingTab(this.app, this));
  }

  onunload() {
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }
}

class SampleSettingTab extends PluginSettingTab {
  plugin: MyPlugin;

  constructor(app: App, plugin: MyPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;

    containerEl.empty();

    new Setting(containerEl)
      .setName("Favorite number")
      .setDesc("What is your favorite number?")
      .addText((text) =>
        text
          .setPlaceholder("33 is the best number!")
          .setValue(this.plugin.settings.favoriteNumber.toString())
          .onChange(async (value) => {
            this.plugin.settings.favoriteNumber = parseInt(value || "33");
            await this.plugin.saveSettings();
          })
      );
  }
}
