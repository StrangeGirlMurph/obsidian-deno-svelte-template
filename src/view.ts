import { ItemView, WorkspaceLeaf } from "obsidian";

// @ts-ignore make ts happy
import Component from "./Component.svelte";

export const VIEW_TYPE_EXAMPLE = "example-view";

export class ExampleView extends ItemView {
  component: Component;
  favoriteNumber: number;

  constructor(leaf: WorkspaceLeaf, favoriteNumber: number) {
    super(leaf);
    this.favoriteNumber = favoriteNumber;
  }

  getViewType() {
    return VIEW_TYPE_EXAMPLE;
  }

  getDisplayText() {
    return "Example view";
  }

  async onOpen() {
    this.component = new Component({
      target: this.contentEl,
      props: {
        variable: this.favoriteNumber,
      }
    });
  }

  async onClose() {
    this.component.$destroy();
  }
}