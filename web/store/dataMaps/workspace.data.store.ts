import { makeObservable, observable } from "mobx";
import { WorkspaceModel } from "store/workspace.model";
import { DataStore } from ".";
import { IWorkspace } from "@plane/types";
import { set } from "lodash";

export interface IWorkspaceData {
  workspaceMap: Record<string, WorkspaceModel>;

  addWorkspaces: (workspaces: IWorkspace[]) => void;
  deleteWorkspace: (workspaceId: string) => void;
  getWorkspacebyId: (workspaceId: string) => WorkspaceModel | undefined;
}

export class WorkspaceData implements IWorkspaceData {
  workspaceMap: Record<string, WorkspaceModel> = {};

  // data store
  dataStore;

  constructor(_dataStore: DataStore) {
    makeObservable(this, {
      workspaceMap: observable,
    });
    this.dataStore = _dataStore;
  }

  addWorkspaces = (workspaces: IWorkspace[]) => {
    workspaces.forEach((workspace) => {
      set(this.workspaceMap, [workspace.id], new WorkspaceModel(workspace, this.dataStore));
    });
  };

  deleteWorkspace = (workspaceId: string) => {
    delete this.workspaceMap[workspaceId];
  };

  getWorkspacebyId = (workspaceId: string) => this.workspaceMap[workspaceId];
}