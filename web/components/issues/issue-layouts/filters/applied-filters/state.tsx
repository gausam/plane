import { observer } from "mobx-react-lite";

// icons
import { StateGroupIcon } from "@plane/ui";
import { X } from "lucide-react";
// types
import { IState } from "@plane/types";

type Props = {
  handleRemove: (val: string) => void;
  states: IState[];
  values: string[];
  editable: boolean | undefined;
};

export const AppliedStateFilters: React.FC<Props> = observer((props) => {
  const { handleRemove, states, values, editable } = props;

  return (
    <>
      {values.map((stateId) => {
        const stateDetails = states?.find((s) => s.id === stateId);

        if (!stateDetails) return null;

        return (
          <div key={stateId} className="flex items-center gap-1 rounded bg-neutral-component-surface-dark p-1 text-xs">
            <StateGroupIcon color={stateDetails.color} stateGroup={stateDetails.group} height="12px" width="12px" />
            {stateDetails.name}
            {editable && (
              <button
                type="button"
                className="grid place-items-center text-neutral-text-medium hover:text-neutral-text-medium"
                onClick={() => handleRemove(stateId)}
              >
                <X size={10} strokeWidth={2} />
              </button>
            )}
          </div>
        );
      })}
    </>
  );
});
