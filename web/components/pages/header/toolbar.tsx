import { cn } from "helpers/common.helper";
import {
  Bold,
  Code2,
  Heading1,
  Heading2,
  Heading3,
  Image,
  Italic,
  List,
  ListOrdered,
  ListTodo,
  LucideIcon,
  Quote,
  Strikethrough,
  Table,
  Underline,
} from "lucide-react";
// editor
import { EditorRefApi } from "@plane/document-editor";
import { EditorMenuItemNames, EditorReadOnlyRefApi } from "@plane/editor-document-core";
// helpers

type Props = {
  editorRef: EditorRefApi | EditorReadOnlyRefApi;
};

type MenuItem = {
  name: EditorMenuItemNames;
  icon: LucideIcon;
};

const BASIC_MARK_ITEMS: MenuItem[] = [
  {
    name: "H1",
    icon: Heading1,
  },
  {
    name: "H2",
    icon: Heading2,
  },
  {
    name: "H3",
    icon: Heading3,
  },
  {
    name: "bold",
    icon: Bold,
  },
  {
    name: "italic",
    icon: Italic,
  },
  {
    name: "underline",
    icon: Underline,
  },
  {
    name: "strike",
    icon: Strikethrough,
  },
];
const LIST_ITEMS: MenuItem[] = [
  {
    name: "bullet-list",
    icon: List,
  },
  {
    name: "ordered-list",
    icon: ListOrdered,
  },
  {
    name: "To-do List",
    icon: ListTodo,
  },
];
const USER_ACTION_ITEMS: MenuItem[] = [
  {
    name: "quote",
    icon: Quote,
  },
  {
    name: "code",
    icon: Code2,
  },
];
const COMPLEX_ITEMS: MenuItem[] = [
  {
    name: "table",
    icon: Table,
  },
  {
    name: "image",
    icon: Image,
  },
];

export const PageToolbar: React.FC<Props> = (props) => {
  const { editorRef } = props;
  // __AUTO_GENERATED_PRINT_VAR_START__
  console.log(
    "PageToolbar editorRef: %s--------------------------------------------------------------------",
    JSON.stringify(editorRef)
  ); // __AUTO_GENERATED_PRINT_VAR_END__

  return (
    <div className="flex flex-wrap items-center divide-x divide-custom-border-200">
      <div className="flex items-center gap-0.5 pr-2">
        {BASIC_MARK_ITEMS.map((item) => (
          <button
            key={item.name}
            type="button"
            onClick={() => editorRef?.executeMenuItemCommand(item.name)}
            className={cn(
              "grid h-7 w-7 place-items-center rounded text-custom-text-300 hover:bg-custom-background-80",
              {
                "bg-custom-background-80 text-custom-text-100": editorRef?.isMenuItemActive(item.name),
              }
            )}
          >
            <item.icon
              className={cn("h-4 w-4", {
                "text-custom-text-100": editorRef?.isMenuItemActive(item.name),
              })}
            />
          </button>
        ))}
      </div>
      <div className="flex items-center gap-0.5 px-2">
        {LIST_ITEMS.map((item) => (
          <button
            key={item.name}
            type="button"
            onClick={() => editorRef?.executeMenuItemCommand(item.name)}
            className={cn(
              "grid h-7 w-7 place-items-center rounded text-custom-text-300 hover:bg-custom-background-80",
              {
                "bg-custom-background-80 text-custom-text-100": editorRef?.isMenuItemActive(item.name),
              }
            )}
          >
            <item.icon
              className={cn("h-4 w-4", {
                "text-custom-text-100": editorRef?.isMenuItemActive(item.name),
              })}
            />
          </button>
        ))}
      </div>
      <div className="flex items-center gap-0.5 px-2">
        {USER_ACTION_ITEMS.map((item) => (
          <button
            key={item.name}
            type="button"
            onClick={() => editorRef?.executeMenuItemCommand(item.name)}
            className={cn(
              "grid h-7 w-7 place-items-center rounded text-custom-text-300 hover:bg-custom-background-80",
              {
                "bg-custom-background-80 text-custom-text-100": editorRef?.isMenuItemActive(item.name),
              }
            )}
          >
            <item.icon
              className={cn("h-4 w-4", {
                "text-custom-text-100": editorRef?.isMenuItemActive(item.name),
              })}
            />
          </button>
        ))}
      </div>
      <div className="flex items-center gap-0.5 pl-2">
        {COMPLEX_ITEMS.map((item) => (
          <button
            key={item.name}
            type="button"
            onClick={() => editorRef?.executeMenuItemCommand(item.name)}
            className={cn(
              "grid h-7 w-7 place-items-center rounded text-custom-text-300 hover:bg-custom-background-80",
              {
                "bg-custom-background-80 text-custom-text-100": editorRef?.isMenuItemActive(item.name),
              }
            )}
          >
            <item.icon
              className={cn("h-4 w-4", {
                "text-custom-text-100": editorRef?.isMenuItemActive(item.name),
              })}
            />
          </button>
        ))}
      </div>
    </div>
  );
};