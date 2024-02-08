import { observer } from "mobx-react-lite";

// icons
import { PriorityIcon } from "@plane/ui";
import { X } from "lucide-react";
// types
import { TIssuePriorities } from "@plane/types";

type Props = {
  handleRemove: (val: string) => void;
  values: string[];
  editable: boolean | undefined;
};

export const AppliedPriorityFilters: React.FC<Props> = observer((props) => {
  const { handleRemove, values, editable } = props;

  return (
    <>
      {values.map((priority) => (
        <div key={priority} className="flex items-center gap-1 rounded bg-neutral-component-surface-dark p-1 text-xs">
          <PriorityIcon priority={priority as TIssuePriorities} className={`h-3 w-3`} />
          {priority}
          {editable && (
            <button
              type="button"
              className="grid place-items-center text-neutral-text-medium hover:text-neutral-text-medium"
              onClick={() => handleRemove(priority)}
            >
              <X size={10} strokeWidth={2} />
            </button>
          )}
        </div>
      ))}
    </>
  );
});
