import { useCallback, useState } from "react";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import { Briefcase, Circle, ExternalLink, Plus } from "lucide-react";
// hooks
import { usePlatformOS } from "hooks/use-platform-os";
import { Breadcrumbs, Button, LayersIcon, Tooltip } from "@plane/ui";
import { ProjectAnalyticsModal } from "components/analytics";
import { BreadcrumbLink } from "components/common";
import { DisplayFiltersSelection, FiltersDropdown, FilterSelection, LayoutSelection } from "components/issues";
import { EIssueFilterType, EIssuesStoreType, ISSUE_DISPLAY_FILTERS_BY_LAYOUT } from "constants/issue";
import { EUserProjectRoles } from "constants/project";
import {
  useApplication,
  useEventTracker,
  useLabel,
  useProject,
  useProjectState,
  useUser,
  useMember,
} from "hooks/store";
import { useIssues } from "hooks/store/use-issues";
// components
// ui
// types
import { IIssueDisplayFilterOptions, IIssueDisplayProperties, IIssueFilterOptions, TIssueLayouts } from "@plane/types";
import { ProjectLogo } from "components/project";
// constants
import {
  DP_APPLIED,
  DP_REMOVED,
  E_PROJECT_ISSUES,
  elementFromPath,
  FILTER_APPLIED,
  FILTER_REMOVED,
  FILTER_SEARCHED,
  LAYOUT_CHANGED,
  LP_UPDATED,
} from "constants/event-tracker";
// helper

export const ProjectIssuesHeader: React.FC = observer(() => {
  // states
  const [analyticsModal, setAnalyticsModal] = useState(false);
  // router
  const router = useRouter();
  const { workspaceSlug, projectId } = router.query as { workspaceSlug: string; projectId: string };
  // store hooks
  const {
    project: { projectMemberIds },
  } = useMember();
  const {
    issuesFilter: { issueFilters, updateFilters },
  } = useIssues(EIssuesStoreType.PROJECT);
  const {
    commandPalette: { toggleCreateIssueModal },
  } = useApplication();
  const { captureEvent, setTrackElement, captureIssuesFilterEvent, captureIssuesDisplayFilterEvent } =
    useEventTracker();
  const {
    membership: { currentProjectRole },
  } = useUser();
  const { currentProjectDetails } = useProject();
  const { projectStates } = useProjectState();
  const { projectLabels } = useLabel();
  const { isMobile } = usePlatformOS();
  const activeLayout = issueFilters?.displayFilters?.layout;

  const handleFiltersUpdate = useCallback(
    (key: keyof IIssueFilterOptions, value: string | string[]) => {
      if (!workspaceSlug || !projectId) return;
      const newValues = issueFilters?.filters?.[key] ?? [];

      if (Array.isArray(value)) {
        value.forEach((val) => {
          if (!newValues.includes(val)) newValues.push(val);
        });
      } else {
        if (issueFilters?.filters?.[key]?.includes(value)) newValues.splice(newValues.indexOf(value), 1);
        else newValues.push(value);
      }

      updateFilters(workspaceSlug, projectId, EIssueFilterType.FILTERS, { [key]: newValues }).then(() =>
        captureIssuesFilterEvent({
          eventName: (issueFilters?.filters?.[key] ?? []).length > newValues.length ? FILTER_REMOVED : FILTER_APPLIED,
          payload: {
            routePath: router.asPath,
            filters: issueFilters,
            filter_property: value,
            filter_type: key,
          },
        })
      );
    },
    [workspaceSlug, projectId, issueFilters, updateFilters, captureIssuesFilterEvent, router.asPath]
  );

  const handleLayoutChange = useCallback(
    (layout: TIssueLayouts) => {
      if (!workspaceSlug || !projectId) return;
      updateFilters(workspaceSlug, projectId, EIssueFilterType.DISPLAY_FILTERS, { layout: layout }).then(() =>
        captureEvent(LAYOUT_CHANGED, {
          layout: layout,
          ...elementFromPath(router.asPath),
        })
      );
    },
    [workspaceSlug, projectId, updateFilters, captureEvent, router.asPath]
  );

  const handleDisplayFilters = useCallback(
    (updatedDisplayFilter: Partial<IIssueDisplayFilterOptions>) => {
      if (!workspaceSlug || !projectId) return;
      updateFilters(workspaceSlug, projectId, EIssueFilterType.DISPLAY_FILTERS, updatedDisplayFilter).then(() =>
        captureIssuesDisplayFilterEvent({
          eventName: LP_UPDATED,
          payload: {
            property_type: Object.keys(updatedDisplayFilter).join(","),
            property: Object.values(updatedDisplayFilter)?.[0],
            routePath: router.asPath,
            filters: issueFilters,
          },
        })
      );
    },
    [workspaceSlug, projectId, updateFilters, issueFilters, captureIssuesDisplayFilterEvent, router.asPath]
  );

  const handleDisplayProperties = useCallback(
    (property: Partial<IIssueDisplayProperties>) => {
      if (!workspaceSlug || !projectId) return;
      updateFilters(workspaceSlug, projectId, EIssueFilterType.DISPLAY_PROPERTIES, property).then(() => {
        captureIssuesDisplayFilterEvent({
          eventName: Object.values(property)?.[0] === true ? DP_APPLIED : DP_REMOVED,
          payload: {
            display_property: Object.keys(property).join(","),
            routePath: router.asPath,
            filters: issueFilters,
          },
        });
      });
    },
    [workspaceSlug, projectId, updateFilters, issueFilters, captureIssuesDisplayFilterEvent, router.asPath]
  );

  const deployUrl = process.env.NEXT_PUBLIC_DEPLOY_URL;
  const canUserCreateIssue =
    currentProjectRole && [EUserProjectRoles.ADMIN, EUserProjectRoles.MEMBER].includes(currentProjectRole);

  const issueCount = currentProjectDetails
    ? issueFilters?.displayFilters?.sub_issue
      ? currentProjectDetails?.total_issues + currentProjectDetails?.sub_issues
      : currentProjectDetails?.total_issues
    : undefined;

  return (
    <>
      <ProjectAnalyticsModal
        isOpen={analyticsModal}
        onClose={() => setAnalyticsModal(false)}
        projectDetails={currentProjectDetails ?? undefined}
      />
      <div className="relative z-[15] items-center gap-x-2 gap-y-4">
        <div className="flex items-center gap-2 p-4 bg-custom-sidebar-background-100">
          <div className="flex w-full flex-grow items-center gap-2 overflow-ellipsis whitespace-nowrap">
            <div className="flex items-center gap-2.5">
              <Breadcrumbs onBack={() => router.back()}>
                <Breadcrumbs.BreadcrumbItem
                  type="text"
                  link={
                    <BreadcrumbLink
                      href={`/${workspaceSlug}/projects`}
                      label={currentProjectDetails?.name ?? "Project"}
                      icon={
                        currentProjectDetails ? (
                          currentProjectDetails && (
                            <span className="grid place-items-center flex-shrink-0 h-4 w-4">
                              <ProjectLogo logo={currentProjectDetails?.logo_props} className="text-sm" />
                            </span>
                          )
                        ) : (
                          <span className="grid h-7 w-7 flex-shrink-0 place-items-center rounded uppercase">
                            <Briefcase className="h-4 w-4" />
                          </span>
                        )
                      }
                    />
                  }
                />

                <Breadcrumbs.BreadcrumbItem
                  type="text"
                  link={
                    <BreadcrumbLink label="Issues" icon={<LayersIcon className="h-4 w-4 text-custom-text-300" />} />
                  }
                />
              </Breadcrumbs>
              {issueCount && issueCount > 0 ? (
                <Tooltip
                  isMobile={isMobile}
                  tooltipContent={`There are ${issueCount} ${issueCount > 1 ? "issues" : "issue"} in this project`}
                  position="bottom"
                >
                  <span className="cursor-default flex items-center text-center justify-center px-2.5 py-0.5 flex-shrink-0 bg-custom-primary-100/20 text-custom-primary-100 text-xs font-semibold rounded-xl">
                    {issueCount}
                  </span>
                </Tooltip>
              ) : null}
            </div>
            {currentProjectDetails?.is_deployed && deployUrl && (
              <a
                href={`${deployUrl}/${workspaceSlug}/${currentProjectDetails?.id}`}
                className="group flex items-center gap-1.5 rounded bg-custom-primary-100/10 px-2.5 py-1 text-xs font-medium text-custom-primary-100"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Circle className="h-1.5 w-1.5 fill-custom-primary-100" strokeWidth={2} />
                Public
                <ExternalLink className="hidden h-3 w-3 group-hover:block" strokeWidth={2} />
              </a>
            )}
          </div>
          <div className="items-center gap-2 hidden md:flex">
            <LayoutSelection
              layouts={["list", "kanban", "calendar", "spreadsheet", "gantt_chart"]}
              onChange={(layout) => handleLayoutChange(layout)}
              selectedLayout={activeLayout}
            />
            <FiltersDropdown title="Filters" placement="bottom-end">
              <FilterSelection
                filters={issueFilters?.filters ?? {}}
                handleFiltersUpdate={handleFiltersUpdate}
                layoutDisplayFiltersOptions={
                  activeLayout ? ISSUE_DISPLAY_FILTERS_BY_LAYOUT.issues[activeLayout] : undefined
                }
                labels={projectLabels}
                memberIds={projectMemberIds ?? undefined}
                states={projectStates}
                onSearchCapture={() =>
                  captureIssuesFilterEvent({
                    eventName: FILTER_SEARCHED,
                    payload: {
                      routePath: router.asPath,
                      current_filters: issueFilters?.filters,
                      layout: issueFilters?.displayFilters?.layout,
                    },
                  })
                }
              />
            </FiltersDropdown>
            <FiltersDropdown title="Display" placement="bottom-end">
              <DisplayFiltersSelection
                layoutDisplayFiltersOptions={
                  activeLayout ? ISSUE_DISPLAY_FILTERS_BY_LAYOUT.issues[activeLayout] : undefined
                }
                displayFilters={issueFilters?.displayFilters ?? {}}
                handleDisplayFiltersUpdate={handleDisplayFilters}
                displayProperties={issueFilters?.displayProperties ?? {}}
                handleDisplayPropertiesUpdate={handleDisplayProperties}
              />
            </FiltersDropdown>
          </div>

          {canUserCreateIssue && (
            <>
              <Button
                className="hidden md:block"
                onClick={() => setAnalyticsModal(true)}
                variant="neutral-primary"
                size="sm"
              >
                Analytics
              </Button>
              <Button
                onClick={() => {
                  setTrackElement(E_PROJECT_ISSUES);
                  toggleCreateIssueModal(true, EIssuesStoreType.PROJECT);
                }}
                size="sm"
                prependIcon={<Plus />}
              >
                <div className="hidden sm:block">Add</div> Issue
              </Button>
            </>
          )}
        </div>
      </div>
    </>
  );
});
