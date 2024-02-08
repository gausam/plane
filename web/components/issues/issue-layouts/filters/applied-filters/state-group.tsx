import { observer } from "mobx-react-lite";

// icons
import { StateGroupIcon } from "@plane/ui";
import { X } from "lucide-react";
import { TStateGroups } from "@plane/types";

type Props = {
  handleRemove: (val: string) => void;
  values: string[];
};

export const AppliedStateGroupFilters: React.FC<Props> = observer((props) => {
  const { handleRemove, values } = props;

  return (
    <>
      {values.map((stateGroup) => (
        <div key={stateGroup} className="flex items-center gap-1 rounded bg-neutral-component-surface-dark p-1 text-xs">
          <StateGroupIcon stateGroup={stateGroup as TStateGroups} height="12px" width="12px" />
          {stateGroup}
          <button
            type="button"
            className="grid place-items-center text-neutral-text-medium hover:text-neutral-text-medium"
            onClick={() => handleRemove(stateGroup)}
          >
            <X size={10} strokeWidth={2} />
          </button>
        </div>
      ))}
    </>
  );
});
