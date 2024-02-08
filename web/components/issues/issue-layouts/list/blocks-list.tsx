import { FC } from "react";
// components
import { IssueBlock } from "components/issues";
// types
import { TGroupedIssues, TIssue, IIssueDisplayProperties, TIssueMap, TUnGroupedIssues } from "@plane/types";
import { EIssueActions } from "../types";

interface Props {
  issueIds: TGroupedIssues | TUnGroupedIssues | any;
  issuesMap: TIssueMap;
  canEditProperties: (projectId: string | undefined) => boolean;
  handleIssues: (issue: TIssue, action: EIssueActions) => Promise<void>;
  quickActions: (issue: TIssue) => React.ReactNode;
  displayProperties: IIssueDisplayProperties | undefined;
}

export const IssueBlocksList: FC<Props> = (props) => {
  const { issueIds, issuesMap, handleIssues, quickActions, displayProperties, canEditProperties } = props;

  return (
    <div className="relative h-full w-full">
      {issueIds && issueIds.length > 0 ? (
        issueIds.map((issueId: string) => {
          if (!issueId) return null;

          return (
            <IssueBlock
              key={issueId}
              issueId={issueId}
              issuesMap={issuesMap}
              handleIssues={handleIssues}
              quickActions={quickActions}
              canEditProperties={canEditProperties}
              displayProperties={displayProperties}
            />
          );
        })
      ) : (
        <div className="bg-neutral-component-surface-light p-3 text-sm text-neutral-text-subtle">No issues</div>
      )}
    </div>
  );
};
