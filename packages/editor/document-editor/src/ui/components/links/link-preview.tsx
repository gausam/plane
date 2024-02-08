import { Copy, GlobeIcon, Link2Off, PencilIcon } from "lucide-react";
import { LinkViewProps } from "./link-view";

export const LinkPreview = ({
  viewProps,
  switchView,
}: {
  viewProps: LinkViewProps;
  switchView: (view: "LinkPreview" | "LinkEditView" | "LinkInputView") => void;
}) => {
  const { editor, from, to, url } = viewProps;

  const removeLink = () => {
    editor.view.dispatch(editor.state.tr.removeMark(from, to, editor.schema.marks.link));
    viewProps.onActionCompleteHandler({
      title: "Link successfully removed",
      message: "The link was removed from the text.",
      type: "success",
    });
    viewProps.closeLinkView();
  };

  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText(url);
    viewProps.onActionCompleteHandler({
      title: "Link successfully copied",
      message: "The link was copied to the clipboard.",
      type: "success",
    });
    viewProps.closeLinkView();
  };

  return (
    <div className="absolute left-0 top-0 max-w-max">
      <div className="shadow-md items-center rounded p-2 flex gap-3 bg-neutral-component-surface-medium border-neutral-border-subtle border-2 text-neutral-text-medium text-xs">
        <GlobeIcon size={14} className="inline-block" />
        <p>{url.length > 40 ? url.slice(0, 40) + "..." : url}</p>
        <div className="flex gap-2">
          <button onClick={copyLinkToClipboard} className="cursor-pointer">
            <Copy size={14} className="inline-block" />
          </button>
          <button onClick={() => switchView("LinkEditView")} className="cursor-pointer">
            <PencilIcon size={14} className="inline-block" />
          </button>
          <button onClick={removeLink} className="cursor-pointer">
            <Link2Off size={14} className="inline-block" />
          </button>
        </div>
      </div>
    </div>
  );
};
