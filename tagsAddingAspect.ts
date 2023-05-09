import { IConstruct } from "constructs";
import { IAspect } from "cdktf";

type TaggableConstruct = IConstruct & {
    tags?: { [key: string]: string };
    tagsInput?: { [key: string]: string };
};
  
function isTaggableConstruct(x: IConstruct): x is TaggableConstruct {
  return "tags" in x && "tagsInput" in x;
}
  
export class TagsAddingAspect implements IAspect {
    constructor(private tagsToAdd: Record<string, string>) {}
    visit(node: IConstruct) {
      if (isTaggableConstruct(node)) {
        const currentTags = node.tagsInput || {};
        node.tags = { ...this.tagsToAdd, ...currentTags };
      }
    }
}