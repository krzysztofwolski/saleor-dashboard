/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { PermissionGroupCreateInput, PermissionEnum } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: PermissionGroupCreate
// ====================================================

export interface PermissionGroupCreate_permissionGroupCreate_errors {
  __typename: "Error";
  field: string | null;
  message: string | null;
}

export interface PermissionGroupCreate_permissionGroupCreate_group_users_avatar {
  __typename: "Image";
  url: string;
}

export interface PermissionGroupCreate_permissionGroupCreate_group_users {
  __typename: "User";
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
  avatar: PermissionGroupCreate_permissionGroupCreate_group_users_avatar | null;
}

export interface PermissionGroupCreate_permissionGroupCreate_group_permissions {
  __typename: "PermissionDisplay";
  code: PermissionEnum;
  name: string;
}

export interface PermissionGroupCreate_permissionGroupCreate_group {
  __typename: "Group";
  id: string;
  name: string;
  users: (PermissionGroupCreate_permissionGroupCreate_group_users | null)[] | null;
  permissions: (PermissionGroupCreate_permissionGroupCreate_group_permissions | null)[] | null;
}

export interface PermissionGroupCreate_permissionGroupCreate {
  __typename: "PermissionGroupCreate";
  errors: PermissionGroupCreate_permissionGroupCreate_errors[] | null;
  group: PermissionGroupCreate_permissionGroupCreate_group | null;
}

export interface PermissionGroupCreate {
  permissionGroupCreate: PermissionGroupCreate_permissionGroupCreate | null;
}

export interface PermissionGroupCreateVariables {
  input: PermissionGroupCreateInput;
}